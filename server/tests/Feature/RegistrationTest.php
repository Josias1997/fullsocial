<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use WithFaker;
    /**
     * A basic feature test example.
     */
    public function test_user_registration(): void
    {
        $response = $this->postJson('/api/register', [
            "email" => $this->faker()->email(),
            "first_name" => $this->faker()->firstName(),
            "last_name" => $this->faker()->lastName(),
            "password" => "test1234",
            "password_confirmation" => "test1234",
            "phone_number" => $this->faker()->phoneNumber(),
            "gender" => "male",
            "birth_date" => "10/11/1999"
        ]);

        $response->dd();
    }
}
