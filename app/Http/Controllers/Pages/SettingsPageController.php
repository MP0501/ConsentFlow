<?php

namespace App\Http\Controllers\Pages;

use App\Models\Consent;
use App\Models\Consent_settings;
use App\Models\User;
use App\ScriptGenerator\ScriptGenerator;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;


class SettingsPageController extends Controller
{
    protected $defaultValues = [
        'design_choice' => '1',
        'banner_width' => '500',
        'banner_max_height' => '800',
        'banner_background' => '#ffffff',
        'banner_border_radius' => '20',
        'headline_text' => 'Wir nutzen Cookies',
        'headline_size' => '25',
        'headline_color' => '#000000',
        'paragraph_text' => 'Wir verwenden Cookies auf unserer Website, um Ihnen das bestmögliche Nutzererlebnis zu bieten. Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden und uns helfen zu verstehen, wie Sie unsere Website nutzen, damit wir Ihr Erlebnis bei zukünftigen Besuchen verbessern können.        ',
        'paragraph_size' => '14',
        'paragraph_color' => '#1f1f1f',
        'accept_text' => 'Alle Akzeptieren',
        'accept_color' => '#ffffff',
        'accept_border_color' => '#0f53c8',
        'accept_border_width' => '2',
        'accept_border_radius' => '20',
        'accept_background_color' => '#0f53c8',
        'reject_text' => 'Ablehnen',
        'reject_color' => '#0f53c8',
        'reject_border_color' => '#0f53c8',
        'reject_border_width' => '2',
        'reject_border_radius' => '20',
        'reject_background_color' => '#fff',
        'settings_text' => 'Einstellungen',
        'settings_color' => '#0f53c8',
        'settings_border_color' => '#0f53c8',
        'settings_border_width' => '2',
        'settings_border_radius' => '20',
        'settings_background_color' => '#fff',
        'link_color' => '#000000',
        'link_font_size' => '14',
        'imprint' => "https://deine.url/impressum",
        'privacy_url' => "https://deine.url/datenschutzerklärung",
        'save_settings' => "Speichern",
        'setting_icon' => "https://brawltown.net/img/BT-Logo.webp",
        'icon' => "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Universität_Würzburg_Logo.svg/200px-Universität_Würzburg_Logo.svg.png",
    ];
    


    public function index(Request $request)
    {
        $user = $request->user();
        $user_info=$user->user_info()->first();
        $first_name=$user_info->first_name;
        $photo=$user_info->photo;

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
            'settings' => $settings,
            'first_name'=>$first_name,
            'photo' => $photo,
        ]); 
    }



    public function updateSettings(Request $request)
    {

        $request->validate([
            'design_choice' => 'required|integer|between:1,3', 
            'banner_max_height' => 'required|numeric|min:100|max:3000',
            'banner_width' => 'required|numeric|min:100|max:3000', 
            'banner_border_radius' => 'required|numeric|min:0|max:50', 
            'headline_text' => 'required|string|max:100', 
            'headline_size' => 'required|numeric|min:10|max:50', 
            'paragraph_text' => 'required|string|max:1000', 
            'paragraph_size' => 'required|numeric|min:8|max:24', 
            'accept_text' => 'required|string|max:20',
            'accept_border_width' => 'required|numeric|min:1|max:5', 
            'accept_border_radius' => 'required|numeric|min:0|max:50',
            'reject_text' => 'required|string|max:20',
            'reject_border_width' => 'required|numeric|min:1|max:5',
            'reject_border_radius' => 'required|numeric|min:0|max:50', 
            'settings_text' => 'required|string|max:20', 
            'settings_border_width' => 'required|numeric|min:1|max:5', 
            'settings_border_radius' => 'required|numeric|min:0|max:50', 
            'link_font_size' => 'required|numeric|min:4|max:24', 
            'imprint' => ['required', 'url'],
            'privacy_url' => 'required|url',
            'save_settings' => 'required|string|max:50', 
            'setting_icon' => 'required|url', 
            'icon' => 'required|url'
        ]);


        



        $consentId = session()->get('ConsentId');
        $user = $request->user();
        $consent=$user->consents()->where('id', $consentId)->first();

        $keys = array_keys($this->defaultValues);

        foreach ($keys as $key) {
            $value = $request->input($key);

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

       #Skript generieren
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
       $consent_id=$consent->id;
       $sg = new ScriptGenerator($vendorsNew, $settings, $consent_id);
       $sg->generateScript();
       $sg->saveScript($consent_id);
        
        

        return back()->with('success', 'Designeinstellung erfolgreich gespeichert.');
    }

    public function defaultSettings(Request $request)
    {
        $consentId = session()->get('ConsentId');
        $user = $request->user();
        $consent=$user->consents()->where('id', $consentId)->first();
        $consent_setting=$consent->settings();
        $consent_setting->delete();
        return back()->with('success', 'Einstellungen wurden erfolgreich zurückgesetzt.');
    }
    
}
