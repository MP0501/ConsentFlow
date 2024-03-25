<?php

namespace App\Http\Middleware;

use App\Models\Consent;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ConsentId
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Überprüfen, ob eine ConsentId schon in die Session gespeichert wurde
        if ($request->session()->has('ConsentId')) {
            $ConsentId = $request->session()->get('ConsentId');
            $Consent = Consent::where('id', $ConsentId)->first();
            if ($Consent == null) {
                return redirect('/manageWebsite');
            }
        } else {
            // Falls noch keine ConsentId gesetzt wurde leite immer wieder zur /manageWebsite zurück
            $user = $request->user();
            $Consent = $user->consents()->first();
            if ($Consent == null) {
                return redirect('/manageWebsite');
            }
            // ConsentId in die Sitzung setzen
            $request->session()->put('ConsentId', $Consent->id);
        }

        $request->attributes->add(['Consent' => $Consent]);
        return $next($request);
    }
}
