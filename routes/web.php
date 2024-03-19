<?php

use App\Http\Controllers\ConsentController;
use App\Http\Controllers\ConsentViewController;
use App\Http\Controllers\Pages\CookieScannerController;
use App\Http\Controllers\Pages\DashboardPageController;
use App\Http\Controllers\Pages\LicenseController;
use App\Http\Controllers\Pages\ManageWebsiteController;
use App\Http\Controllers\Pages\SettingsPageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserInfoController;
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

Route::get('/', function () {
    return view('welcome');
});



Route::get('/user/first-name', [UserInfoController::class, 'getFirstName'])->middleware('auth');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/dashboard', [DashboardPageController::class, 'index'])->middleware('auth',ConsentId::class)->name('dashboard');
Route::get('/settings', [SettingsPageController::class, 'index'])->middleware('auth',ConsentId::class)->name('settings');
Route::get('/manageWebsite', [ManageWebsiteController::class, 'index'])->name('manageWebsite')->middleware('auth');
Route::get('/license', [LicenseController::class, 'index'])->middleware('auth',ConsentId::class)->name('license');
Route::get('/cookieScanner', [CookieScannerController::class, 'index'])->middleware('auth',ConsentId::class)->name('cookieScanner');


Route::get('/setConsentId', [ManageWebsiteController::class,'setConsentId'])->middleware('auth');
Route::get('/test', [UserInfoController::class, 'boot'])->middleware('auth');


Route::delete('/delete_website', [ConsentController::class, 'delete_website'])->name('delete_website');
Route::post('/add_consent', [ConsentController::class, 'add_consent'])->name('add_consent')->middleware('auth');

Route::post('/updateSettings', [LicenseController::class, 'updateSettings'])->name('updateSettings');
Route::post('/updateAdress', [LicenseController::class, 'updateAdress'])->name('updateAdress');
Route::post('/updatePhoto', [LicenseController::class, 'updatePhoto'])->name('updatePhoto');

Route::post('/updateDesign', [SettingsPageController::class, 'updateDesign'])->name('updateDesign');



require __DIR__.'/auth.php';
