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
                            <div class="row justify-content-center">
                                <div class="col">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h4 class="text-dark mb-2">{{ __('Passwort vergessen?') }}</h4>
                                            <p class="mb-4">{{ __('Kein Problem. Gib einfach deine E-Mail-Adresse ein und wir senden dir einen Link zum Zurücksetzen des Passworts, mit dem du ein neues Passwort wählen kannst.') }}</p>
                                        </div>
                                        <!-- Session Status -->
                                        <x-auth-session-status class="mb-4" :status="session('status')" />
                                        <form method="POST" action="{{ route('password.email') }}" class="user">
                                            @csrf
                                            <!-- Email Address -->
                                            <div class="mb-3">
                                                <x-text-input id="email" class="border rounded form-control form-control-user" type="email" name="email" :value="old('email')" required autofocus placeholder="{{ __('Deine E-Mail-Adresse') }}" />
                                                <x-input-error :messages="$errors->get('email')" class="mt-2" />
                                            </div>
                                            <button class="btn btn-primary d-block btn-user w-100" type="submit">{{ __('Passwort zurücksetzen') }}</button>
                                        </form>
                                        <div class="text-center">
                                            <hr>
                                            <a class="small" href="{{ route('register') }}">{{ __('Du hast noch keinen Account? Registrieren!') }}</a>
                                        </div>
                                        <div class="text-center">
                                            <a class="small" href="{{ route('login') }}">{{ __('Du hast bereits einen Account? Login!') }}</a>
                                        </div>
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