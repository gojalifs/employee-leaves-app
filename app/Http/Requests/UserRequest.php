<?php

namespace App\Http\Requests;

use App\Enums\RoleEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = Auth::user();
        if (Auth::user()->positions_id == 11 || $user->hasRole([RoleEnum::HR])) {
            return true;
        }

        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name'     => 'required',
            'email'         => 'required|email',
            'department'    => 'required|numeric|exists:departments,id',
            'position'      => 'required|numeric|exists:positions,id',
            'address'       => 'required',
        ];
    }
}
