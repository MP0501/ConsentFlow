<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class UserInformations extends Controller
{
    public function boot()
    {
        View::composer('*', function ($view) {
            if (Auth::check()) {
                $view->with('username', Auth::user()->name);
            }
        });
    }
}
