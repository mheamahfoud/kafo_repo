<?php

namespace App\Http\Responses;

class Response {
    /**
     * @param array $content
     * @return \Illuminate\Http\JsonResponse
     */
    public static function respondSuccess($content = null){
        return response()->json([
            'success' => true,
            'data' => $content,
            'error_description' => '',
            'status_code' => 200
        ]);
    }
    public static function respondError($message, $code = 1){
        return response()->json([
            'success' => false,
            'data' => null,
            'error_description' => $message,
            'status_code' => 403
        ]);
    }
    public static function respondErrorAuthorize($message, $code = 1){
        return response()->json([
            'success' => false,
            'data' => null,
            'error_description' => $message,
            'status_code' => 401
        ]);
    }

    public static function respondErrorUnAuthorize($message, $code = 1){
        return response()->json([
            'success' => false,
            'data' => null,
            'error_description' => $message,
            'status_code' => 403
        ]);
    }

    public static function respondErrorValidation($message, $code = 1){
        return response()->json([
            'success' => false,
            'data' => null,
            'error_description' => $message,
            'status_code' => 400
        ]);
    }

    public static function respondErrorVerificationCode($message, $code = 1){
        return response()->json([
            'success' => false,
            'data' => null,
            'error_description' => $message,
            'status_code' => 405
        ]);
    }

   
    public static function respondOut($message){
        return response()->json([
            'success' => false,
            'data' => null,
            'error_description' => $message,
            'status_code' => -1
        ], 401);
    }
}