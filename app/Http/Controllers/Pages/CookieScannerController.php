<?php

namespace App\Http\Controllers\Pages;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class CookieScannerController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $user_info=$user->user_info()->first();
        $photo=$user_info->photo;

        $first_name=$user_info->first_name;
        $consent_id=session()->get('ConsentId');
        $consents=$user->consents()->where('id',$consent_id)->first();
        $vendors=$consents->vendors()->get();
        return view('cookieScanner', ['vendors' => $vendors,
        'first_name'=>$first_name,'photo' => $photo,
    
    ]); 
    }

    public function change_vendor(Request $request)
    {

    }

    public function delete_vendor(Request $request)
    {

    }
}
