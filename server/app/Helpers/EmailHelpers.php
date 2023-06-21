<?php

namespace App\Helpers;

use App\Jobs\SendEmail;
use App\Mail\EmailValidationMail;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class EmailHelpers
{
    public static function sendVerificationEmailInQueue($email, $first_name): void
    {
        $code = mt_rand(env("VALIDATION_CODE_MIN"), env('VALIDATION_CODE_MAX'));
        DB::table('email_verification_codes')->insert([
            'email' => $email,
            'code' => $code,
            'created_at' => Carbon::now()
        ]);
        $details = ['first_name' => $first_name, 'code' => $code];
        SendEmail::dispatch(new EmailValidationMail($details), $email);
    }
}
