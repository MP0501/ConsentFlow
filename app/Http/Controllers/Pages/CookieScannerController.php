<?php

namespace App\Http\Controllers\Pages;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class CookieScannerController extends Controller
{
    public function index()
    {
        return view('cookieScanner');
    }
}
