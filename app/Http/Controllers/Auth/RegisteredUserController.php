<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\RegistrationMail;
use App\Models\User;
use App\Models\User_info;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules;
use Illuminate\View\View;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): View
    {
        return view('auth.register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // Validierung der Eingaben
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Neuen User erstellen in User Tabelle
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Informationen für User_info Tabelle vorbereiten
        $userInfo = new User_info([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'company_name' => $request->company_name
        ]);
        
        // Nutzerinformationen in User_info speichern
        $user->user_info()->save($userInfo);
        

        event(new Registered($user));

        try {
        // Benutzer anmelden und Registrierungsmail senden
            Auth::login($user);
            Mail::to($user->email)->send(new RegistrationMail($user));
         } catch (\Exception $e) {
        // Bei Fehler Benutzer löschen und Fehlermeldung anzeigen
            $user->delete();
            return redirect()->back()->withErrors(['email' => 'Diese E-Mail existiert nicht']);
        }
        return redirect(RouteServiceProvider::HOME);
    }
}
