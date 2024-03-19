<?php

namespace App\Http\Controllers\Pages;

use App\Models\Consent;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class SettingsPageController extends Controller
{
    public function index(Request $request)
    {
        return view('settings'); 
    }
    
}
