<?php

namespace App\Http\Controllers\Pages;

use App\Models\Consent_vendors;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Http;

class CookieScannerController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $user_info = $user->user_info()->first();
        $photo = $user_info->photo;

        $first_name = $user_info->first_name;
        $consent_id = session()->get('ConsentId');
        $consents = $user->consents()->where('id', $consent_id)->first();
        $vendors = $consents->vendors()->get();

        $purposeMapping = [
            1 => "Information speichern/abrufen",
            2 => "Begrenzte Daten für Werbung",
            3 => "Profile für personalisierte Werbung erstellen",
            4 => "Profile für Werbung verwenden",
            5 => "Profile zur Personalisierung von Inhalten erstellen",
            6 => "Personalisierte Inhalte auswählen",
            7 => "Werbungsleistung messen",
            8 => "Inhaltsleistung messen",
            9 => "Publikum verstehen durch Datenanalyse",
            10 => "Dienste entwickeln und verbessern",
            11 => "Begrenzte Daten zur Inhaltsauswahl verwenden",
        ];


        $vendorsWithPurposes = [];
        foreach ($vendors as $vendor) {
            $purposes = $vendor->purposes()->pluck('purpose_id')->toArray();

            $purposeNames = [];

            foreach ($purposes as $purposeId) {
                if (isset($purposeMapping[$purposeId])) {
                    $purposeNames[] = $purposeMapping[$purposeId];
                }
            }
            $vendorsWithPurposes[] = [
                'id' => $vendor->id,
                'name' => $vendor->name,
                'script_to_implement' => $vendor->script_to_implement,
                'policyURL' => $vendor->policy_url,
                'purposes' => $purposeNames,
                'purposes_id' => $purposes,
                'iab_id' => $vendor->iab_id,
                'cookieMaxAgeSeconds' => $vendor->cookieMaxAgeSeconds,
            ];
        }

        return view('cookieScanner', [
            'vendorsWithPurposes' => $vendorsWithPurposes,
            'vendors' => $vendors,
            'first_name' => $first_name,
            'photo' => $photo,
        ]);
    }

    public function change_vendor(Request $request)
    {
        $policy_url = $request->input('policy_url');
        $script_to_implement = $request->input('script_to_implement');
        $name = $request->input('name');
        $vendor_id = $request->input('vendor_id_hidden');
        $iab_id = $request->input('iab_id');
        $cookieMaxAgeSeconds = $request->input('cookieMaxAgeSeconds');

        $user = $request->user();
        $consent_id = session()->get('ConsentId');
        $consents = $user->consents()->where('id', $consent_id)->first();
        $vendor = $consents->vendors()->where('id', $vendor_id)->first();

        $vendor->update([
            'policy_url' => $policy_url,
            'script_to_implement' => $script_to_implement,
            'name' => $name,
            'iab_id' => $iab_id ,
            'cookieMaxAgeSeconds' => $$cookieMaxAgeSeconds,
        ]);

        $new_purposes = [];
        foreach ($request->all() as $key => $value) {
            if (strpos($key, 'vendor_purpose_') === 0) {
                $new_purposes[] = $value;
            }
        }
        $purposes = $vendor->purposes()->get();
        foreach ($purposes as $index => $purpose) {
            $purpose->update([
                'purpose_id' => $new_purposes[$index]
            ]);
        }

        return redirect()->route('cookieScanner');
    }

    public function delete_vendor(Request $request)
    {
        $vendor_id = $request->input('vendor_id');

        $user = $request->user();
        $consent_id = session()->get('ConsentId');
        $consents = $user->consents()->where('id', $consent_id)->first();
        $vendor = $consents->vendors()->where('id', $vendor_id)->first();

        $vendor->delete();
        return redirect()->route('cookieScanner');
    }




    public function addConsentVendor(Request $request)
    {
        $validatedData = $request->validate([
            'vendor_name' => 'required',
            'purpose' => 'required',
            'vendor_script' => 'required',
            'policy_url' => 'required',
            'vendor_id' => 'nullable',
        ]);

        $consentId = session()->get('ConsentId');
        $user = $request->user();
        $consent = $user->consents()->where('id', $consentId)->first();

        if ($consent) {
            $consentVendor = $consent->vendors()->create([
                'name' => $validatedData['vendor_name'],
                'script_to_implement' => $validatedData['vendor_script'],
                'policy_url' => $validatedData['policy_url'],
                'iab_id' => $validatedData['vendor_id'],
            ]);

            $consentVendor->purposes()->create([
                'purpose_id' => $validatedData['purpose'],
                'is_legitimate' => False,
                'consent_vendor_id' => $consentVendor->id,
            ]);

            return redirect()->back()->with('success', 'Consent Vendor erfolgreich gespeichert.');
        } else {
            return redirect()->back()->with('error', 'Fehler beim Speichern des Consent Vendors.');
        }
    }
    public function startCookieScanner(Request $request)
    {
        $user = $request->user();
        $consent_id = session()->get('ConsentId');
        $consent = $user->consents()->where('id', $consent_id)->first();

        $ch = curl_init();

        $options = array(
            CURLOPT_URL => 'http://cookiescanner.consentflow.de:3000/get-cookies?url=' . $consent->website_url,
            CURLOPT_HTTPHEADER => array(
                'accept: application/json'
            ),
            CURLOPT_RETURNTRANSFER => true
        );
        curl_setopt_array($ch, $options);

        $response = curl_exec($ch);

        if (curl_getinfo($ch, CURLINFO_HTTP_CODE) == 200) {
            $cookies = json_decode($response, true);

            foreach ($cookies["cookies"] as $c) {
                $name = array_key_exists("name", $c) ? $c["name"] : "";
                $urls = array_key_exists("urls", $c) ? $c["urls"] : "";
                if (count($urls) > 0) {
                    $policy_url = $urls[0]["privacy"];
                }
                $iab_id = array_key_exists("id", $c) ? $c["id"] : null;
                $cookieMaxAgeSeconds = array_key_exists("cookieMaxAgeSeconds", $c) ? $c["cookieMaxAgeSeconds"] : null;

                $purposes = array_key_exists("purposes", $c) ?  $c["purposes"] : array();

                $already_added = $consent->vendors()->get();

                $isInDb = false;

                if (count($already_added) > 0) {
                    foreach ($already_added as $c_iab) {
                        if (isset($c_iab->iab_id) && !$c_iab->iab_id == null) {
                            if ($c_iab->iab_id == $iab_id) {
                                $isInDb = true;
                            }
                        }
                    }
                }

                if (!$isInDb) {
                    $consentVendor = $consent->vendors()->create([
                        'name' => $name,
                        'script_to_implement' => "",
                        'policy_url' => $policy_url,
                        'iab_id' => $iab_id,
                        'cookieMaxAgeSeconds' => $cookieMaxAgeSeconds
                    ]);

                    foreach ($purposes as $p) {
                        $consentVendor->purposes()->create([
                            'purpose_id' => $p,
                            'is_legitimate' => False,
                            'consent_vendor_id' => $consentVendor->id,
                        ]);
                    }
                }
            }
        }

        curl_close($ch);

        return redirect()->back()->with('success', 'Consent Vendor erfolgreich gescannt.');
    }
}
