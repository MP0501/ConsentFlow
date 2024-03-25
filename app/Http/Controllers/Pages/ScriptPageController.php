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

        $vendors = json_decode('
        [
            {
                "id": 1, aus daten bank
                "iab_id": 755, null wenn leer
                "name": "Google Advertising Products", name
                "purposes": [1,3,4], purpoises
                "policyUrl": "https://policies.google.com/privacy",
                "cookieMaxAgeSeconds": 34190000, 
        },
        {
            "id": 1, aus daten bank
            "iab_id": 755, null wenn leer
            "name": "Google Advertising Products", name
            "purposes": [1,3,4], purpoises
            "policyUrl": "https://policies.google.com/privacy",
            "cookieMaxAgeSeconds": 34190000, 
        },
        {
                "id": 3,
                "iab_id": null,
                "name": "Fynn Cookie",
                "purposes": [1,5,6],
                "legIntPurposes": [2,7,8,9,10],
                "flexiblePurposes": [2,7,8,9,10],
                "specialPurposes": [1,2],
                "features": [1,2,3],
                "specialFeatures": [1],
                "policyUrl": "",
                "cookieMaxAgeSeconds": 34300800,
                "usesCookies": true,
                "cookieRefresh": true,
                "usesNonCookieAccess": false
        }
        ]
        ');     
            $consent_id=session()->get('ConsentId');

                $settings=array('imprint'=>'www.google.de');
                $sg = new ScriptGenerator($vendors, $settings, $consent_id);
                $sg->generateScript();
                $sg->getScript();
                print_r($sg->getScript());


        
        

        return view('script', ['first_name'=>$first_name,'photo' => $photo,
    ]); 
    }
}
