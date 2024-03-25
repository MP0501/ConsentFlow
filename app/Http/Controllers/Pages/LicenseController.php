<?php

namespace App\Http\Controllers\Pages;

use App\Mail\RechnungsMail;
use App\Mail\RegistrationMail;
use Barryvdh\DomPDF\PDF;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

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

        $user = $request->user();
        $consent_id=session()->get('ConsentId');
        $Consent = $user->consents()->where('id',$consent_id)->first();
        $all_count = $Consent->consentViews()->count();

        return view('license', [
            'email' => $email,
            'first_name' => $first_name,
            'last_name' => $last_name,
            'company_name' => $company_name,
            'address' => $address,
            'city' => $city,
            'country' => $country,
            'photo' => $photo,
            'all_count'=>$all_count
             ]);
    }

    public function generate_invoice(Request $request)
    {  
        $user = $request->user();
        $user_info=$user->user_info()->first();
        if (is_null($user_info->address) || is_null($user_info->city) || is_null($user_info->country)) {
            return redirect('/license')->with('error', 'Bitte fülle deine Adressdaten aus, bevor du eine Rechnung generierst.');
        }
        $oneMonthAgo = Carbon::now()->subMonth();
        $currentDate = Carbon::now();
        $invoicePeriod = $oneMonthAgo->format('d.m.Y') . ' - ' . $currentDate->format('d.m.Y');


        $consent_id=session()->get('ConsentId');
        error_log($currentDate );
        $Consent = $user->consents()->where('id',$consent_id)->first();
        $consent_views=$Consent->consentViews()->whereDate('created_at', '>=', $oneMonthAgo);
        $all_count=$consent_views->count();
        
        
        $unit_price=0.01;
        $total_price=$all_count*$unit_price;
        $net_amount= $total_price;
        $tax_amount=$total_price*0.19;
        $gross_amount=$net_amount+$tax_amount;
        $is_basic_amount=False;
        $basic_amount=0.84;
        if($gross_amount<1){
            $is_basic_amount=True;
            $net_amount= $basic_amount;
            $tax_amount=$net_amount*0.19;
            $gross_amount=$net_amount+$tax_amount;
        }
    $data = [
        'invoicePeriod'=>$invoicePeriod,
        'is_basic_amount'=>$is_basic_amount,
        'basic_amount'=>$basic_amount,
        'unit_price' =>$unit_price,
        'total_price'=>$total_price,
        'net_amount'=> $net_amount,
        'tax_amount'=>$tax_amount,
        'gross_amount'=>$gross_amount,
        'invoice_number' => mt_rand(100000, 999999),
        'first_name' => $user->user_info()->first()->first_name,
        'last_name' => $user->user_info()->first()->last_name,
        'company_name' => $user->user_info()->first()->company_name,
        'address' => $user->user_info()->first()->address,
        'city' => $user->user_info()->first()->city,
        'country' => $user->user_info()->first()->country,
        'email' => $user->email,
        'consent_count' => $all_count,
    ];

    $pdf = app('dompdf.wrapper');
    $pdf->loadView('invoices.rechnung', $data);


    $pdfPath = 'invoices/' . uniqid() . '.pdf';
    Storage::disk('local')->put($pdfPath, $pdf->output());

    Mail::send(['html' => 'emails.rechnung'], ['first_name' => $user->user_info()->first()->first_name], function($message) use ($user, $pdfPath) {
        $message->to($user->email)
                ->subject('Deine ConsentFlow Rechnung')
                ->attach(storage_path('app/' . $pdfPath), [
                    'as' => 'rechnung.pdf',
                    'mime' => 'application/pdf',
                ]);
    });

    // PDF herunterladen
    return $pdf->download('invoices.rechnung.pdf');
    }


    public function updateSettings_license(Request $request)
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
