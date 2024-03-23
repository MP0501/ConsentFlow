<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ImpressumController extends Controller
{
    public function index(Request $request){
        return view('impressum' ); 
    }
}
