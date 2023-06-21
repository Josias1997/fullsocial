<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(['message' => $validator->errors()->first()], 422));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'content' => 'required_without_all:images,videos|string',
            'images' => 'nullable|array',
            'videos' => 'nullable|array',
            'images.*' => 'nullable|file',
            'videos.*' => 'nullable|file',
            'user_id' => 'required|numeric|exists:users,id',
            'group_id' => 'nullable|numeric|exists:groups,id'
        ];
    }
}
