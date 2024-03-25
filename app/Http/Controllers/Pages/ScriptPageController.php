<?php

namespace App\Http\Controllers\Pages;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\ScriptGenerator\ScriptGenerator; 

class ScriptPageController extends Controller
{
    public function index(Request $request)
    {   
        $user = $request->user();
        $user_info=$user->user_info()->first();
        $first_name=$user_info->first_name;
        $photo=$user_info->photo;

        
        $consent_id=session()->get('ConsentId');
        error_log($consent_id);
        $consent_id=$user->consents()->where('id', $consent_id)->first()->id;
        $scriptTag = '<script src="https://static.consentflow.de/consents/' . $consent_id . '"></script>';

        
        

        return view('script', ['first_name'=>$first_name,'photo' => $photo,'scriptTag'=>$scriptTag
    ]); 
    }
}
