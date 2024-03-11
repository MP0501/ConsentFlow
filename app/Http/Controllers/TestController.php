<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index($wahr){
        return view('index',['test_wert'=>$wahr]);
    }
}
