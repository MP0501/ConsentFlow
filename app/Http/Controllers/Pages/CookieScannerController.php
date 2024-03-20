<?php

namespace App\Http\Controllers\Pages;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class CookieScannerController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $consent_id=session()->get('ConsentId');
        $consents=$user->consents()->where('id',$consent_id)->first();
        $vendors=$consents->vendors()->get();
        return view('cookieScanner', ['vendors' => $vendors]); 
    }

    public function change_vendor(Request $request)
    {

    }

    public function delete_vendor(Request $request)
    {

    }
}
