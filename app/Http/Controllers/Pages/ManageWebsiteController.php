<?php

namespace App\Http\Controllers\Pages;

use App\Models\Consent;
use App\ScriptGenerator\ScriptGenerator;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ManageWebsiteController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $user_info=$user->user_info()->first();
        $first_name=$user_info->first_name;
        $photo=$user_info->photo;

        $consents=$user->consents()->get();
        return view('manageWebsite', ['consents' => $consents,
        'first_name'=>$first_name,'photo' => $photo,
    ]); 
    }
    public function setConsentId(Request $request){
        $consentId=$request->consentId;
        $Consent=Consent::where('id', $consentId)->first();
        if($Consent!=null){
            $userId=$Consent->user->id;
            if($userId==$request->user()->id){
                $request->session()->put('ConsentId',$consentId);
                $consentId = session()->get('ConsentId');


                #Skript generieren
                $user = $request->user();
                $consent=$user->consents()->where('id', $consentId)->first();
                $consentSetting = $consent->settings()->get();
                $settings = [];
                foreach ($consentSetting as $setting) {
                    $settings[$setting->key] = $setting->value;
                }
        
        
                $vendors=$consent->vendors()->get();
                
                $vendorsNew = [];
                foreach ($vendors as $vendor) {
                    array_push($vendorsNew,[
                        'id' => $vendor->id,
                        'iab_id' => $vendor->iab_id,
                        'name' => $vendor->name,
                        'purposes' => $vendor->purposes()->pluck('id')->toArray(),
                        'policyUrl' => $vendor->policy_url,
                        'cookieMaxAgeSeconds' => $vendor->cookieMaxAgeSeconds,
                    ]);
                }
        
                $sg = new ScriptGenerator($vendorsNew, $settings);
                $sg->generateScript();
                $sg->getScript();
                return redirect('/manageWebsite');
            }else{
                return redirect('/manageWebsite');
            }
        }

    
    }

}
