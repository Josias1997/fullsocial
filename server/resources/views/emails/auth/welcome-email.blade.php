@extends('emails.auth.base')

@section('introduction')
HELLO {{ $details['first_name'] }} !
@endsection

@section('title', 'WELCOME TO OUR FAMILY')

@section('content')
<p style="font-size: 14px; line-height: 160%;"><span style="font-size: 22px; line-height: 35.2px;">Hi
        {{ $details['first_name'] }}, </span></p>
<p style="font-size: 14px; line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">Your received this
        email because you registered a new account with us.</span></p>
@endsection

@section('link')
<a target="_blank" class="v-button"
    style="box-sizing: border-box;display: inline-block;font-family:'Cabin',sans-serif;text-decoration: none;text-align: center;color: #FFFFFF; background-color: #1e00ff; border-radius: 4px;  width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; font-size: 14px;">
    <span style="display:block;padding:14px 44px 13px;line-height:120%;"><span
            style="font-size: 16px; line-height: 19.2px;"><strong><span
                    style="line-height: 19.2px; font-size: 16px;">LOGIN AND START INTERACTING WITH GREAT
                    PEOPLE</span></strong></span></span>
</a>
@endsection