<?php

namespace App\Http\Controllers\Pages;

use App\Models\Consent;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;



class DashboardPageController extends Controller
{

    public function index(Request $request)
    {
        // Einwilligungsinformationen abrufen und für die Anzeige vorbereiten
        $user = $request->user();
        $consent_id = session()->get('ConsentId');
        $Consent = $user->consents()->where('id', $consent_id)->first();
        $all_count = $Consent->consentViews()->count();
        $accept_count = $Consent->consentViews()->where('accept_value', 1)->count();
        $reject_count = $Consent->consentViews()->where('accept_value', 0)->count();
        $setting_count = $Consent->consentViews()->where('accept_value', 2)->count();

        // Benutzerinformationen für die Anzeige vorbereiten
        $user_info = $user->user_info()->first();
        $first_name = $user_info->first_name;
        $photo = $user_info->photo;


        // Monatliche Einwilligungen vorbereiten
        $monthlyConsents = [];
        $consentViews = $Consent->consentViews();
        $eightMonthsAgo = Carbon::now()->subMonths(8)->startOfMonth();
        $today = Carbon::now()->endOfMonth();
        foreach (range(1, 12) as $month) {
            $monthlyConsents[$month] = $Consent->consentViews()
                ->whereBetween('created_at', [$eightMonthsAgo, $today])
                ->whereMonth('created_at', $month)
                ->count() * 0.01;
        }


        return view('dashboard', [
            'first_name' => $user->user_info['vorname'],
            'all_count' => $all_count,
            'accept_count' => $accept_count,
            'reject_count' => $reject_count,
            'setting_count' => $setting_count,
            'photo' => $photo,
            'first_name' => $first_name,
            'monthlyConsents' => $monthlyConsents
        ]);
    }
}
