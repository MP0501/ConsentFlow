<?php

namespace App\Http\Controllers\Pages;

use App\Models\Consent;
use App\Models\Consent_settings;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class SettingsPageController extends Controller
{
    protected $defaultValues = [
        'design_choice' => '1',
        'banner_width' => '100',
        'banner_max_height' => '200',
        'banner_background' => '#ffffff',
        'banner_border_radius' => '5',
        'headline_text' => 'Headline',
        'headline_size' => '24',
        'headline_color' => '#2D1D1D',
        'paragraph_text' => 'Paragraph',
        'paragraph_size' => '16',
        'paragraph_color' => '#333333',
        'accept_text' => 'Accept',
        'accept_color' => '#ffffff',
        'accept_border_color' => '#4CAF50',
        'accept_border_width' => '1',
        'accept_border_radius' => '5',
        'accept_background_color' => '#4CAF50',
        'reject_text' => 'Reject',
        'reject_color' => '#ffffff',
        'reject_border_color' => '#f44336',
        'reject_border_width' => '1',
        'reject_border_radius' => '5',
        'reject_background_color' => '#f44336',
        'settings_text' => 'Settings',
        'settings_color' => '#ffffff',
        'settings_border_color' => '#007bff',
        'settings_border_width' => '1',
        'settings_border_radius' => '5',
        'settings_background_color' => '#007bff',
        'link_color' => '#007bff',
        'link_font_size' => '14',
    ];
    


    public function index(Request $request)
    {
        $user = $request->user();
        $consent_id=session()->get('ConsentId');
        $consent=$user->consents()->where('id', $consent_id)->first();
        

        


        $consentSetting=$consent->settings()->get();
        $keys = array_keys($this->defaultValues);
        $settings=[];
        foreach ($keys as $key) {
            $settingCurrent = $consentSetting->where('key', $key)->first();
            if ($settingCurrent) {
                $settingCurrent = $settingCurrent->value;
            } else {
                $settingCurrent = $this->defaultValues[$key];
            }
            $settings[$key] = $settingCurrent;
        }
        
        return view('settings', [
            'settings' => $settings
        ]); 
    }

    public function updateSettings(Request $request)
    {
        $consentId = session()->get('ConsentId');
        $user = $request->user();
        $consent=$user->consents()->where('id', $consentId)->first();

        $keys = array_keys($this->defaultValues);
        foreach ($keys as $key) {
            $value = $request->input($key);
            error_log($request->input('design_choice'));

            if ($value != $this->defaultValues[$key]) {
                // Aktualisierung der Einstellung
                $consentSetting = $consent->settings()->updateOrCreate(
                    ['key' => $key],
                    ['value' => $value]
                );
            }
            else{
                $consent->settings()->where('key', $key)->delete();
            }
        }
        
        // Weiterleitung 
        return back()->with('success', 'Designeinstellung erfolgreich gespeichert.');
    }
    
}
