<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class ConsentViewController extends Controller
{
    public function getUserConsentViewsCount() {
        $user = Auth::user(); // Hol dir den angemeldeten Benutzer
    
        if (!$user) {
            return response()->json(['error' => 'Nicht angemeldet'], 401);
        }
    
        // Zähle alle ConsentViews für die Consents des Benutzers
        $count = $user->consents()->withCount('consentViews')->get()->sum('consent_views_count');
    
        return response()->json(['consentViewsCount' => $count]);
    }

    public function showDashboard()
{
    $user = Auth::user();
    $consentViewsCount = $user->consents()->withCount('consentViews')->get()->sum('consent_views_count');
    
    return view('dashboard', compact('consentViewsCount'));
}
}
