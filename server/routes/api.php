<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::controller('App\Http\Controllers\AuthController')->group(function () {
        Route::get('/logout', 'logout');
    });
    Route::controller(PostController::class)->group(function () {
        $id = "{postId}";
        Route::post("/posts/edit/{$id}", 'edit');
        Route::delete("/posts/delete/{$id}", 'delete');
        Route::post('/posts/store', 'store');
    });
    Route::controller(UserController::class)->group(function () {
        $id = "{userId}";
        Route::get("/users/$id", 'getUser');
        Route::get("/user/feed/$id", 'getUserFeed');
        Route::get("/user/posts/$id/{page?}/{count?}", 'getUserPosts');
        Route::get("/user/images/$id/{page?}/{count?}", 'getUserImages');
        Route::get("/user/followers/$id/{page?}/{count?}", 'getUserFollowers');
        Route::get("/user/followings/$id/{page?}/{count?}", 'getUserFollowings');
        Route::post("/user/update/cover-image/{$id}", 'updateUserCoverImage');
        Route::post("/user/update/profile-image/{$id}", 'updateUserProfileImage');
        Route::post("/users/follow", 'followOrUnfollow');
        Route::get("/users/verify-friendship/$id/{friendId}", 'verifyFriendship');
        Route::get("/users/$id/friends/stories", 'getUserFriendsStories');
    });
    Route::controller(SearchController::class)->group(function () {
        Route::get('/search/users/{userId}/{query}/{page}', 'findUsersByQuery');
    });
});

Route::controller('App\Http\Controllers\AuthController')->group(function () {
    Route::post('/login', 'login')->name('login');
    Route::post('/register', 'register')->name('register');
    Route::post('/send-verification-code', 'sendVerificationCode');
    Route::post('/verify-code', 'verifyCode')->name('verify-email');
    Route::post('/forgot-password', 'forgotPassword');
    Route::post('/reset-password/{token}', 'resetPassword')->name('reset-password');
});
