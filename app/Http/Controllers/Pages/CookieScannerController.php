<?php

namespace App\Http\Controllers\Pages;

use App\Models\Consent_vendors;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class CookieScannerController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $user_info=$user->user_info()->first();
        $photo=$user_info->photo;

        $first_name=$user_info->first_name;
        $consent_id=session()->get('ConsentId');
        $consents=$user->consents()->where('id',$consent_id)->first();
        $vendors=$consents->vendors()->get();

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

    }

    public function delete_vendor(Request $request)
    {
        $vendorId = $request->input('vendor_id');

        Consent_vendors::destroy($vendorId);
        return redirect()->route('cookieScanner');
    }




    public function addConsentVendor(Request $request)
{
    $validatedData = $request->validate([
        'vendor_name' => 'required',
        'purpose' => 'required',
        'vendor_script' => 'required',
        'policy_url' => 'required',
    ]);

    $consentId = session()->get('ConsentId');
    $user = $request->user();
    $consent = $user->consents()->where('id', $consentId)->first();

    if ($consent) {
        $consentVendor = $consent->vendors()->create([
            'name' => $validatedData['vendor_name'],
            'script_to_implement' => $validatedData['vendor_script'],
            'policy_url' => $validatedData['policy_url'],
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
}
