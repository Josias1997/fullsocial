<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Story;
use App\Models\User;
use DB;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{

    public function getUser($userId)
    {
        try {
            $user = User::findOrFail($userId);
            return response()->json(['user' =>  $user]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred ' . $e->getMessage()], 500);
        }
    }

    public function followOrUnfollow(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'friend_id' => 'required|exists:users,id',
            'type' => ['required', 'string', Rule::in(['follow', 'unfollow'])]
        ]);

        try {
            $user = User::findOrFail($request->user_id);
            if ($request->type == "follow") {
                $user->following()->attach($request->friend_id);
            } else {
                $user->following()->detach($request->friend_id);
            }

            $message = $request->type == "follow" ?  'followed' : 'unfollowed';

            return response()->json(['message' => 'Successfully ' . $message, 'operation' => $request->type]);
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred ' . $e->getMessage()], 500);
        }
    }

    public function verifyFriendship($userId, $friendId)
    {
        try {
            $user = User::findOrFail($userId);
            $isFriend = $user->following->contains('id', $friendId);
            return response()->json(['isFriend' => $isFriend]);
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred ' . $e->getMessage()], 500);
        }
    }


    public function getUserFollowers($userId, $page = null, $count = null)
    {
        try {
            $followers = [];
            if ($page && $count) {
                $followers = User::findOrFail($userId)->followers
                    ->skip(($page - 1) * $count)
                    ->take($count)
                    ->sortByDesc('created_at')
                    ->values()->all();
            } else {
                $followers = User::findOrFail($userId)->followers
                    ->sortByDesc('created_at')
                    ->values()->all();
            }
            return response()->json(['followers' => $followers]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred ' . $e->getMessage()], 500);
        }
    }

    public function getUserFollowings($userId, $page = null, $count = null)
    {
        try {
            $followings = [];
            if ($page && $count) {
                $followings = User::findOrFail($userId)->following
                    ->skip(($page - 1) * $count)
                    ->take($count)
                    ->sortByDesc('created_at')->values()->all();
            } else {
                $followings = User::findOrFail($userId)->following
                    ->sortByDesc('created_at')->values()->all();
            }
            return response()->json(['followings' => $followings]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred ' . $e->getMessage()], 500);
        }
    }

    public function getUserFeed($userId)
    {
        try {
            $user = User::findOrFail($userId);
            $posts = Post::whereIn('user_id', $user->following->pluck('id'))->with([
                'images',
                'videos',
                'comments',
                'comments.images',
                'comments.videos',
                'comments.replies',
                'comments.user',
                'user',
                'group',
                'interactions'
            ])
                ->orderBy('created_at', 'desc')
                ->get();
            return response()->json(['posts' => $posts]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred ' . $e->getMessage()], 500);
        }
    }

    public function getUserFriendsStories($userId, $page = null, $count = null)
    {
        try {
            $user = User::findOrFail($userId);
            $stories = [];
            if ($page && $count) {
                $stories = Story::whereIn('user_id', $user->following->pluck('id'))->with([
                    'user',
                ])
                    ->offset(($page - 1) * $count)
                    ->limit($page * $count)
                    ->orderBy('created_at', 'desc')
                    ->get();
            } else {
                $stories = Story::whereIn('user_id', $user->following->pluck('id'))->with([
                    'user',
                ])
                    ->orderBy('created_at', 'desc')->get();
            }

            return response()->json(['stories' => $stories]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred ' . $e->getMessage()], 500);
        }
    }

    public function getUserPosts($userId, $page = null, $count = null)
    {
        try {
            $posts = [];
            if ($page && $count) {
                $posts = Post::where('user_id', $userId)
                    ->with([
                        'images',
                        'videos',
                        'comments',
                        'comments.images',
                        'comments.videos',
                        'comments.replies',
                        'comments.user',
                        'user',
                        'group',
                        'interactions'
                    ])
                    ->offset($count)
                    ->limit(($page - 1) * $count)
                    ->orderBy('created_at', 'desc')
                    ->get();
            } else {
                $posts = Post::where('user_id', $userId)
                    ->with([
                        'images',
                        'videos',
                        'comments',
                        'comments.images',
                        'comments.videos',
                        'comments.replies',
                        'comments.user',
                        'user',
                        'group',
                        'interactions'
                    ])
                    ->orderBy('created_at', 'desc')
                    ->get();
            }
            return response()->json(['posts' => $posts]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred ' . $e->getMessage()], 500);
        }
    }


    public function getUserImages($userId, $page = null, $count = null)
    {
        try {
            $images = [];
            if ($page && $count) {
                $images = User::findOrFail($userId)->images
                    ->skip(($page - 1) * $count)
                    ->take($count)
                    ->sortByDesc('created_at')
                    ->values()->all();
            } else {
                $images = User::findOrFail($userId)->images
                    ->sortByDesc('created_at')
                    ->values()->all();
            }
            return response()->json(['images' => $images]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred ' . $e->getMessage()], 500);
        }
    }

    public function updateUserProfileImage(Request $request, $userId)
    {
        $request->validate([
            'profile_image' => 'required|file'
        ]);

        try {
            if ($request->hasFile('profile_image') && $request->file('profile_image')->isValid()) {
                $profile_image = "/storage/" . $request->file('profile_image')->store("/users/$userId/profile_image");
                DB::table('users')->where("id", $userId)->update([
                    'profile_image' => $profile_image
                ]);
                $user = User::findOrFail($userId);
                return response()->json(['user' => $user]);
            }
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred ' . $e->getMessage()], 500);
        }
    }
    public function updateUserCoverImage(Request $request, $userId)
    {
        $request->validate([
            'cover_image' => 'required|file'
        ]);

        try {
            if ($request->hasFile('cover_image') && $request->file('cover_image')->isValid()) {
                $cover_image = "/storage/" . $request->file('cover_image')->store("/users/$userId/cover_image");
                DB::table('users')->where("id", $userId)->update([
                    'cover_image' => $cover_image
                ]);
                $user = User::findOrFail($userId);
                return response()->json(['user' => $user]);
            }
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred ' . $e->getMessage()], 500);
        }
    }
}
