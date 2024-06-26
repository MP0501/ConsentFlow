<?php

use App\Http\Controllers\ConsentController;
use App\Http\Controllers\Pages\CookieScannerController;
use App\Http\Controllers\Pages\DashboardPageController;
use App\Http\Controllers\Pages\DatenschutzerklaerungController;
use App\Http\Controllers\Pages\ImpressumController;
use App\Http\Controllers\Pages\IndexController;
use App\Http\Controllers\Pages\LicenseController;
use App\Http\Controllers\Pages\ManageWebsiteController;
use App\Http\Controllers\Pages\ScriptPageController;
use App\Http\Controllers\Pages\SettingsPageController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\ConsentId;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Gruppierung von Routen, die eine Authentifizierung erfordern
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Startseite
Route::get('/', [IndexController::class, 'index'])->name('index');

// Dashboardroute
Route::get('/dashboard', [DashboardPageController::class, 'index'])->middleware('auth', ConsentId::class)->name('dashboard');

// Einstellungenroute
Route::get('/settings', [SettingsPageController::class, 'index'])->middleware('auth', ConsentId::class)->name('settings');
Route::post('/updateSettings', [SettingsPageController::class, 'updateSettings'])->name('updateSettings');
Route::post('/defaultSettings', [SettingsPageController::class, 'defaultSettings'])->name('defaultSettings');

// Routen für das Verwalten von Websites
Route::get('/manageWebsite', [ManageWebsiteController::class, 'index'])->name('manageWebsite')->middleware('auth');
Route::get('/setConsentId', [ManageWebsiteController::class, 'setConsentId'])->middleware('auth');
Route::delete('/delete_website', [ConsentController::class, 'delete_website'])->name('delete_website');
Route::post('/add_consent', [ConsentController::class, 'add_consent'])->name('add_consent')->middleware('auth');

// Routen für Lizenzverwaltung und Rechnungserstellung
Route::get('/license', [LicenseController::class, 'index'])->middleware('auth', ConsentId::class)->name('license');
Route::post('/updateSettings_license', [LicenseController::class, 'updateSettings_license'])->name('updateSettings_license');
Route::post('/updateAdress', [LicenseController::class, 'updateAdress'])->name('updateAdress');
Route::post('/updatePhoto', [LicenseController::class, 'updatePhoto'])->name('updatePhoto');
Route::post('/generate_invoice', [LicenseController::class, 'generate_invoice'])->name('generate_invoice');

// Routen für den Cookie-Scanner
Route::get('/cookieScanner', [CookieScannerController::class, 'index'])->middleware('auth', ConsentId::class)->name('cookieScanner');
Route::get('/script', [ScriptPageController::class, 'index'])->middleware('auth', ConsentId::class)->name('script');
Route::post('/change_vendor', [CookieScannerController::class, 'change_vendor'])->name('change_vendor');
Route::delete('/delete_vendor', [CookieScannerController::class, 'delete_vendor'])->name('delete_vendor');
Route::post('/addConsentVendor', [CookieScannerController::class, 'addConsentVendor'])->name('addConsentVendor');
Route::post('/startCookieScanner', [CookieScannerController::class, 'startCookieScanner'])->name('startCookieScanner');

// Datenschutzerklärung und Impressum
Route::get('/datenschutzerklärung', [DatenschutzerklaerungController::class, 'index'])->name('datenschutzerklärung');
Route::get('/impressum', [ImpressumController::class, 'index'])->name('impressum');

require __DIR__ . '/auth.php';
