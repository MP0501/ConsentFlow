<?php

namespace App\Http\Controllers\Pages;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ScriptPageController extends Controller
{
    public function index()
    {
        return view('script');
    }
}
