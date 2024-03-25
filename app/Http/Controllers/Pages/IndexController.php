<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use App\Models\Consent_view;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index(Request $request){
        // Einwilligungsinformationen abrufen
        $consentViews = Consent_view::all();

        // Statistiken vorbereiten
        $all_count = $consentViews->count();
        $accept_count = $consentViews->where('accept_value',1)->count();
        $reject_count = $consentViews->where('accept_value',0)->count();
        $setting_count = $consentViews->where('accept_value',2)->count();
        
        return view('index', [
            'all_count' => $all_count,
            'accept_count' => $accept_count,
            'reject_count' => $reject_count,
            'setting_count' => $setting_count
        ]);
    }
}
