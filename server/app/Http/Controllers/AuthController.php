<?php

namespace App\Http\Controllers;

use App\Helpers\EmailHelpers;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Jobs\SendEmail;
use App\Mail\EmailValidationMail;
use App\Mail\PasswordResetMail;
use App\Mail\WelcomeMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use PHPUnit\Exception;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $credentials['active'] = 1;
        if (Auth::attempt($credentials)) {
            $token = Auth::user()->createToken($credentials['email']);
            return response()->json(['user' => Auth::user(), 'token' => $token->plainTextToken]);
        } else {
            return response()->json(['message' => 'Authentication failed: Your Credentials do not match any active user credentials in our database'], 400);
        }
    }

    public function register(RegisterRequest $request)
    {
        $userData = $request->validated();
        $userData['password'] = Hash::make($userData['password']);
        try {
            DB::table('users')->insert(
                array_merge(
                    $userData,
                    [
                        "created_at" => Carbon::now(),
                        "updated_at" => Carbon::now()
                    ]
                )
            );
            EmailHelpers::sendVerificationEmailInQueue($userData['email'], $userData['first_name']);
            return response()->json(['message' => 'Verification email was sent successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    public function verifyCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'code' => 'required|numeric|min_digits:6|max_digits:6'
        ]);

        $queryData = DB::table('email_verification_codes')
            ->where('code', $request->code)
            ->where('email', $request->email);
        if ($queryData->exists()) {
            $code = $queryData->first();
            DB::table('users')->where('email', $code->email)->update([
                'email_verified_at' => Carbon::now(),
                'active' => true
            ]);
            DB::table('email_verification_codes')->where('email', $code->email)->delete();
            $user = User::where('email', $code->email)->first();
            SendEmail::dispatch(new WelcomeMail(['first_name' => $user->first_name]), $user->email);
            return response()->json(['message' => 'Email verified successfully']);
        } else {
            return response()->json(['message' => 'Invalid code: The code maybe expired or was already used']);
        }
    }

    public function sendVerificationCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email'
        ]);
        try {
            $queryData = DB::table('email_verification_codes')
                ->where('email', $request->email);
            $user = DB::table('user')->where('email', $request->email)->first();
            if (!$queryData->exists()) {
                EmailHelpers::sendVerificationEmailInQueue($user->email, $user->first_name);
            } else {
                $details = ['first_name' => $user->first_name, 'code' => mt_rand(env("VALIDATION_CODE_MIN"), env('VALIDATION_CODE_MAX'))];
                SendEmail::dispatch(new EmailValidationMail($details), $request->email);
            }
            return response()->json(['message' => 'Verification email was sent successfully']);
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|exists:users,email'
        ]);
        try {
            $token = md5($request->email);
            $user = User::where('email', $request->email)->first();
            DB::table('password_reset_tokens')->insert([
                'email' => $request->email,
                'token' => $token,
                'created_at' => Carbon::now()
            ]);
            $details = ['first_name' => $user->first_name, 'token' => $token];
            SendEmail::dispatch($user->email, new PasswordResetMail($details));
            return response()->json(['message' => 'Password reset email will sent shortly']);
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred ' . $e->getMessage()], 500);
        }
    }
    public function resetPassword(Request $request, $token)
    {
        $request->validate([
            'new_password' => 'required|min:6|confirmed'
        ]);
        $queryData = DB::table('password_reset_tokens')->where('token', $token);
        if ($queryData->exists()) {
            $passwordResetToken = $queryData->first();
            $user = DB::table('users')->where('email', $passwordResetToken->email)->first();
            if (!Hash::check($request->new_password, $user->password)) {
                DB::table('users')->where('email', $passwordResetToken->email)->update([
                    'password' => Hash::make($request->new_password)
                ]);
                DB::table('password_reset_tokens')->where('token', $token)->delete();
                return response()->json(['message' => 'Password reset successfully']);
            } else {
                return response()->json(['message' => 'This is your current password'], 400);
            }
        }
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'User logged out successfully']);
    }
}
