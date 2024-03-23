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
                                            <h4 class="text-dark mb-4">Willkommen zurück!</h4>
                                        </div>
                                        

<!-- Session Status -->
<x-auth-session-status class="mb-4" :status="session('status')" />
<form method="POST" action="{{ route('login') }}" class="user">
    @csrf
    <!-- Email Address -->
    <div class="mb-3">
        <x-text-input id="email" class="border rounded form-control form-control-user w-75 mx-auto" type="email" name="email" :value="old('email')" required autofocus autocomplete="username" placeholder="E-Mail Adresse" />
        <x-input-error :messages="$errors->get('email')" class="mt-2" />
    </div>
    <!-- Password -->
    <div class="mb-3">
        <x-text-input id="password" class="border rounded form-control form-control-user w-75 mx-auto" type="password" name="password" required autocomplete="current-password" placeholder="Password" />
        <x-input-error :messages="$errors->get('password')" class="mt-2" />
    </div>
    <!-- Remember Me -->
    <div class="mb-3 w-75 mx-auto">
        <div class="custom-control custom-checkbox small">
            <div class="form-check">
                <input id="remember_me" type="checkbox" class="form-check-input custom-control-input" name="remember">
                <label class="form-check-label custom-control-label" for="remember_me">{{ __('Eingeloggt bleiben') }}</label>
            </div>
        </div>
    </div>
    <!-- Submit Button -->
    <button class="btn btn-primary d-block btn-user w-75 mx-auto" type="submit">{{ __('Login') }}</button>
    <hr>
    <!-- Forgot Password Link -->
    @if (Route::has('password.request'))
        <div class="text-center">
            <a class="small" href="{{ route('password.request') }}">
                {{ __('Passwort vergessen?') }}
            </a>
        </div>
    @endif
</form>

                                        
<div class="text-center"><a class="small" href="register">Du hast noch keinen Account? Registrieren!</a></div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<footer class="bg-white sticky-footer">
<div class="container my-auto">
<div class="text-center my-auto copyright"><span>Copyright © ConsentFlow 2024 | Impressum | Datenschutzerklärung</span></div>
</div>
</footer>
</div><a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a>
</div>
<script src="assets/bootstrap/js/bootstrap.min.js"></script>
<script src="assets/js/bs-init.js"></script>
<script src="assets/js/theme.js"></script>
</body>

</html>