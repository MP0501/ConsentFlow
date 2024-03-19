<?php

namespace App\Http\Controllers\Pages;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class LicenseController extends Controller
{
    public function index(Request $request)
    {   
        $user = $request->user();
        $user_info=$user->user_info()->first();
        $email=$user->email;
        $first_name=$user_info->first_name;
        $last_name=$user_info->last_name;
        $company_name=$user_info->company_name;
        $address=$user_info->address;
        $city=$user_info->city;
        $country=$user_info->country;
        $photo=$user_info->photo;
        error_log($photo);
        return view('license', [
            'email' => $email,
            'first_name' => $first_name,
            'last_name' => $last_name,
            'company_name' => $company_name,
            'address' => $address,
            'city' => $city,
            'country' => $country,
            'photo' => $photo,
             ]);
    }


    public function updateSettings(Request $request)
    {
        $user = $request->user();
        $userInfo = $user->user_info()->first();
    
        if ($userInfo) {
            $userInfo->update([
                'company_name' => $request->input('Unternehmensname'),
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
            ]);
        }
    
        return redirect('/license')->with('success', 'Einstellungen erfolgreich aktualisiert!');
    }

    public function updateAdress(Request $request)
    {
        $user = $request->user();
        $userInfo = $user->user_info()->first();
        if ($userInfo) {
            $userInfo->update([
                'address' => $request->input('address'),
                'city' => $request->input('city'),
                'country' => $request->input('country'),
            ]);
        }
    
        return redirect('/license')->with('success', 'Einstellungen erfolgreich aktualisiert!');
    }

    public function updatePhoto(Request $request)
{
    $user = $request->user();
    $userInfo = $user->user_info()->first();

    $request->validate([
        'photo' => 'required|image|mimes:jpeg,png|max:2048', // Maximale Dateigröße von 2 MB
    ]);

    if ($request->hasFile('photo')) {
        $photo = $request->file('photo');

        if ($photo->isValid()) {
            // Speichere das Bild im Speicher
            $photoPath = $photo->store('photos', 'public');
            if ($userInfo) {
                $userInfo->update([
                    'photo' => $photoPath,
                ]);
            }

            return redirect('/license')->with('success', 'Foto erfolgreich aktualisiert!');
        } else {
            return redirect()->back()->with('error', 'Das hochgeladene Bild ist ungültig.');
        }
    }

    return redirect()->back()->with('error', 'Es wurde kein Bild hochgeladen.');
}



}
