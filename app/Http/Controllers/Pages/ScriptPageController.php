<?php

namespace App\Http\Controllers\Pages;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ScriptPageController extends Controller
{
    public function index(Request $request)
    {   
        $user = $request->user();
        $user_info=$user->user_info()->first();
        $first_name=$user_info->first_name;
        $photo=$user_info->photo;

        return view('script', ['first_name'=>$first_name,'photo' => $photo,
    ]); 
    }
}
