<?php

namespace App\Http\Controllers;

use App\Models\User_info;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Auth;

class UserInfoController extends Controller
{
    public function showProfile()
    {
        $user = auth()->user();
        $photo = $user->user_info->photo ?? null; 
        error_log($photo);
        return view('components.navbar-top', ['photo' => $photo]); 
    }
}