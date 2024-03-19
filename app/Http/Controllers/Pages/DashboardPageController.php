<?php

namespace App\Http\Controllers\Pages;

use App\Models\Consent;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;


class DashboardPageController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        // Versuche zuerst, die consent_id aus der URL zu holen
        $Consent = $request->attributes->get('Consent');
        
        $consentViewsCount = $Consent->consentViews->count();
        return view('dashboard', [
            'first_name' => $user->user_info['vorname'],
            'consentViewsCount' => $consentViewsCount
        ]);
    }
}