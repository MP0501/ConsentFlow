<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Consent; 
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Illuminate\Validation\Rule;

class ConsentController extends Controller
{
    public function add_consent(Request $request)
    {
        $url = $request->input('url');
        if (!preg_match('~^(?:f|ht)tps?://~i', $url)) {
            $url = "http://" . $url;
        }
    
        $request->merge(['url' => $url]);
        //Sollen wir dns check machen)
        $request->validate([
            'url' => [
                'required',
                'url', // Standard URL-Validierung
                function ($attribute, $value, $fail) {
                    // DNS-Überprüfung
                    if (!URL::isValidUrl($value) || !checkdnsrr(parse_url($value, PHP_URL_HOST))) {
                        $fail('Die eingegebene URL ist ungültig.');
                    }
                },
            ],
        ]);
        
        $user=$request->user();
        $consent = Consent::create([
            'website_url' => $request->input('url'),
            'user_id' => $user->id,
        ]);

        //Demowerte eintragen
        $demoValues = [
            // General Design Settings
            ['key' => 'accent_color', 'value' => '#0056b3'], 
            ['key' => 'background_color', 'value' => '#e7f1ff'], 
            ['key' => 'heading_color', 'value' => '#003580'],
            
            // Detail Settings
            ['key' => 'details_background_color', 'value' => '#ffffff'], 
            ['key' => 'details_heading_color', 'value' => '#003580'], 
        
            // Button 1 Styles
            ['key' => 'button_1_color', 'value' => '#007bff'], 
            ['key' => 'button_1_text_color', 'value' => '#ffffff'], 
            ['key' => 'button_1_text', 'value' => 'Button Text'], 
            ['key' => 'button_1_border_radius', 'value' => '4px'], 
            ['key' => 'button_1_border_thickness', 'value' => '1px'], 
            ['key' => 'button_1_border_color', 'value' => '#0056b3'], 
        
            // Button 2 Styles
            ['key' => 'button_2_color', 'value' => '#6c757d'],
            ['key' => 'button_2_text_color', 'value' => '#ffffff'],
            ['key' => 'button_2_text', 'value' => 'Mehr erfahren'],
            ['key' => 'button_2_border_radius', 'value' => '4px'],
            ['key' => 'button_2_border_thickness', 'value' => '1px'],
            ['key' => 'button_2_border_color', 'value' => '#5a6268'],
        
            // Button 3 Styles
            ['key' => 'button_3_color', 'value' => '#28a745'],
            ['key' => 'button_3_text_color', 'value' => '#ffffff'],
            ['key' => 'button_3_text', 'value' => 'Was hierhin schreiben?'],
            ['key' => 'button_3_border_radius', 'value' => '4px'],
            ['key' => 'button_3_border_thickness', 'value' => '1px'],
            ['key' => 'button_3_border_color', 'value' => '#218838'],
        ];
        

        foreach ($demoValues as $demoValue) {
            $consent->settings()->create([
                'key' => $demoValue['key'],
                'value' => $demoValue['value'],
                'consent_id' => $consent->id
            ]);
        }


    
        return redirect('/manageWebsite')->with('success', 'Website erfolgreich hinzugefügt!');
    }



    public function delete_website(Request $request)
{
    $consentId = $request->input('consentId'); 
    $consent = Consent::findOrFail($consentId);

    $consent->delete();

    // Überprüfen, ob es die letzte Consent des Benutzers war
    $userConsentsCount = Consent::where('user_id', $consent->user_id)->count();
    if ($userConsentsCount === 0) {
        $request->session()->forget('ConsentId');
    }

    return redirect('/manageWebsite')->with('success', 'Website erfolgreich gelöscht.');
}



    
}
