<!DOCTYPE html>
<html data-bs-theme="light" lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Table - ConsentFlow</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&amp;display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins&amp;display=swap">
    <link rel="stylesheet" href="assets/fonts/fontawesome-all.min.css">
    <link rel="stylesheet" href="assets/css/bs-theme-overrides.css">
    <link rel="stylesheet" href="assets/css/Banner-Heading-Image-images.css">
    <link rel="stylesheet" href="assets/css/nav_bar.css">
    <link rel="stylesheet" href="assets/css/Pricing-Duo-badges.css">
    <link rel="stylesheet" href="assets/css/Pricing-Duo-icons.css">
</head>

<body id="page-top">
    <div id="wrapper">
        <x-navbar-top-login />
        <div class="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <x-navbar-login />
                <div class="container-fluid">
                    <div class="card shadow-lg o-hidden border-0 my-5">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h4 class="text-dark mb-4">Jetzt Account erstellen!</h4>
                                        </div>
                                        




                                            <form method="POST" action="{{ route('register') }}" class="user">
                                                @csrf
                                        
                                                <!-- Name Fields -->
                                                <div class="row mb-3">
                                                    <!-- First Name -->
                                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                                        <x-input-label for="first_name" :value="__('Vorname')" class="form-label" />
                                                        <x-text-input id="first_name" class="border rounded form-control form-control-user"
                                                                      type="text" name="first_name" :value="old('first_name')" required autofocus />
                                                        <x-input-error :messages="$errors->get('first_name')" class="mt-2" />
                                                    </div>


                                                    <!-- Last Name -->
                                                    <div class="col-sm-6">
                                                        <x-input-label for="last_name" :value="__('Nachname')" class="form-label" />
                                                        <x-text-input id="last_name" class="border rounded form-control form-control-user"
                                                                      type="text" name="last_name" :value="old('last_name')" required />
                                                        <x-input-error :messages="$errors->get('last_name')" class="mt-2" />
                                                    </div>
                                                </div>

                                                <div class="mb-3">
                                                    <x-input-label for="company_name" :value="__('Unternehmensname')" class="form-label" />
                                                    <x-text-input id="company_name" class="border rounded form-control form-control-user"
                                                                type="text" name="company_name" :value="old('company_name')" required />
                                                    <x-input-error :messages="$errors->get('company_name')" class="mt-2" />
                                                </div>
                                                
                                                <!-- Username -->
                                                <div class="mb-3">
                                                    <x-input-label for="name" :value="__('Nutzername')" class="form-label" />
                                                    <x-text-input id="name" class="border rounded form-control form-control-user"
                                                                type="text" name="name" :value="old('name')" required />
                                                    <x-input-error :messages="$errors->get('name')" class="mt-2" />
                                                </div>
                                        
                                                <!-- Email Address -->
                                                <div class="mb-3">
                                                    <x-input-label for="email" :value="__('Email')" class="form-label" />
                                                    <x-text-input id="email" class="border rounded form-control form-control-user"
                                                                  type="email" name="email" :value="old('email')" required />
                                                    <x-input-error :messages="$errors->get('email')" class="mt-2" />
                                                </div>
                                        
                                                <!-- Password -->
                                                <div class="row mb-3">
                                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                                        <x-input-label for="password" :value="__('Password')" class="form-label" />
                                                        <x-text-input id="password" class="border rounded form-control form-control-user"
                                                                      type="password" name="password" required autocomplete="new-password" />
                                                        <x-input-error :messages="$errors->get('password')" class="mt-2" />
                                                    </div>

                                    

                                                    <!-- Confirm Password -->
                                                    <div class="col-sm-6">
                                                        <x-input-label for="password_confirmation" :value="__('Confirm Password')" class="form-label" />
                                                        <x-text-input id="password_confirmation" class="border rounded form-control form-control-user"
                                                                      type="password" name="password_confirmation" required autocomplete="new-password" />
                                                        <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
                                                    </div>
                                                </div>

                                        
                                                <!-- Submit Button -->
                                                <button class="btn btn-primary d-block btn-user w-75 mx-auto" type="submit">{{ __('Registrieren') }}</button>

                                               
                                                @if (Route::has('password.request'))
                                                <div class="text-center">
                                                    <a class="small" href="{{ route('password.request') }}">
                                                        {{ __('Passwort vergessen?') }}
                                                    </a>
                                                </div>
                                            @endif
                                        
                                            </form>
                                       
                                            <div class="text-center"><a class="small" href="login">Du hast bereits einen Account? Login!</a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <x-footer />
            </div><a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a>
        </div>
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script src="assets/js/bs-init.js"></script>
        <script src="assets/js/theme.js"></script>
    </body>
    
    </html>