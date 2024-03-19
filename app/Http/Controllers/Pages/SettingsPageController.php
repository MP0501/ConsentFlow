<?php

namespace App\Http\Controllers\Pages;

use App\Models\Consent;
use App\Models\Consent_settings;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class SettingsPageController extends Controller
{
    public function index(Request $request)
    {
        return view('settings'); 
    }

    public function updateDesign(Request $request)
    {
        $designChoice = $request->input('designChoice');
        $consentId = session()->get('ConsentId');
        $user = $request->user();
        $consent=$user->consents()->where('id', $consentId)->first();
        error_log($consent);
        $consentSetting = $consent->settings()->where('key', 'design_choice')->first();
        error_log($consentSetting);
        if ($consentSetting) {
            // Update vorhandene Einstellung
            $consentSetting->value = $designChoice;
        } else {
            // Erstelle eine neue Einstellung, falls nicht vorhanden
            error_log($designChoice);
            $consentSetting = new \App\Models\Consent_settings([
                'key' => 'design_choice',
                'value' => $designChoice,
                'consent_id' => $consent->id, 
            ]);
        }
        $consent->settings()->save($consentSetting);
        // Weiterleitung 
        return back()->with('success', 'Designeinstellung erfolgreich gespeichert.');
    }
    
}
