<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePostRequest;
use App\Models\Image;
use App\Models\Post;
use App\Models\Video;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $posts = Post::all();
            return response()->json(['posts' => $posts]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred ' . $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreatePostRequest $request)
    {
        try {
            $request->validated();
            $post = Post::create([
                'content' => $request->content,
                'user_id' => $request->user_id,
                'group_id' => $request->group_id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
            $postId = $post->id;
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $image_path = "/storage/" . $image->store("posts/$postId/images");
                    $post->images()->save(new Image([
                        "path" => $image_path,
                        'user_id' => $request->user_id,
                        "parent_id" => $postId,
                        "parent_type" => Post::class,
                        "created_at" => Carbon::now(),
                        "updated_at" => Carbon::now()
                    ]));
                }
            }
            if ($request->hasFile('videos')) {
                foreach ($request->file('videos') as $key => $video) {
                    $video_path = "/storage/" . $video->store("posts/$postId/videos");
                    $video_thumbnail = "";
                    if ($request->hasFile('thumbnails')) {
                        $video_thumbnail = $request->file('thumbnails')[$key]->store("posts/$postId/videos/thumbnails");
                    }
                    $post->videos()->save(new Video([
                        "path" => $video_path,
                        'user_id' => $request->user_id,
                        "thumbnail" => $video_thumbnail,
                        "parent_id" => $postId,
                        "parent_type" => Post::class,
                        "created_at" => Carbon::now(),
                        "updated_at" => Carbon::now()
                    ]));
                }
            }
            response()->json(['message' => 'Post created successfully']);
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
