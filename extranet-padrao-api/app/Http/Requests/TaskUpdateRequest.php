<?php
namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class TaskUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [];
    }

    public function failedValidation(Validator $validator)
    {
       throw new HttpResponseException(response()->json([
           'success'   => false,
           'message'   => 'Errors found',
           'data'      => $validator->errors()
       ]));
    }
}