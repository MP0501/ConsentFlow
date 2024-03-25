<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Consent;
use App\Models\Consent_view;
use App\ScriptGenerator\ScriptGenerator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Illuminate\Validation\Rule;

use function Laravel\Prompts\error;

class ConsentController extends Controller
{
    public function add_consent(Request $request)
    {

        $url = $request->input('url');
        if ($url === null || $url === '') {
            return redirect()->back()->withErrors(['url' => 'Die Website-URL darf nicht leer sein.'])->withInput();
        }
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

        $user = $request->user();
        $consent = Consent::create([
            'website_url' => $request->input('url'),
            'user_id' => $user->id,
        ]);

        $request->session()->put('ConsentId', $consent->id);

        $this->updateScript($consent);

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

    function updateScript(Consent $consent)
    {
        $consentSetting = $consent->settings()->get();
        $settings = [];
        foreach ($consentSetting as $setting) {
            $settings[$setting->key] = $setting->value;
        }


        $vendors = $consent->vendors()->get();

        $vendorsNew = [];
        foreach ($vendors as $vendor) {
            array_push($vendorsNew, [
                'id' => $vendor->id,
                'iab_id' => $vendor->iab_id,
                'name' => $vendor->name,
                'purposes' => $vendor->purposes()->pluck('id')->toArray(),
                'policyUrl' => $vendor->policy_url,
                'cookieMaxAgeSeconds' => $vendor->cookieMaxAgeSeconds,
            ]);
        }

        $consent_id = $consent->id;
        $sg = new ScriptGenerator($vendorsNew, $settings, $consent_id);
        $sg->generateScript();
        $sg->saveScript($consent_id);

        return redirect('/manageWebsite')->with('success', 'Website erfolgreich hinzugefügt.');
    }
}
