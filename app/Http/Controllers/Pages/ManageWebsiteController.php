<?php

namespace App\Http\Controllers\Pages;

use App\Models\Consent;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ManageWebsiteController extends Controller
{
    public function index()
    {
        $consents = Consent::all(); 
        return view('manageWebsite', ['consents' => $consents]); 
    }
    public function setConsentId(Request $request){
        $consentId=$request->consentId;
        $Consent=Consent::where('id', $consentId)->first();
        if($Consent!=null){
            $userId=$Consent->user->id;
            if($userId==$request->user()->id){
                $request->session()->put('ConsentId',$consentId);
                return redirect('/manageWebsite');
            }else{
                return redirect('/manageWebsite');
            }
        }
    }

}
