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
        <x-navbar />

        <div class="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <nav class="navbar navbar-expand bg-white shadow mb-4 topbar static-top navbar-light">
                    <div class="container-fluid"><button class="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i class="fas fa-bars"></i></button>
                        <h3 class="text-dark mb-0">Login</h3>
                        <ul class="navbar-nav flex-nowrap ms-auto">
                            <li class="nav-item dropdown d-sm-none no-arrow"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><i class="fas fa-search"></i></a>
                                <div class="dropdown-menu dropdown-menu-end p-3 animated--grow-in" aria-labelledby="searchDropdown">
                                    <form class="me-auto navbar-search w-100">
                                        <div class="input-group"><input class="bg-light form-control border-0 small" type="text" placeholder="Search for ...">
                                            <div class="input-group-append"><button class="btn btn-primary py-0" type="button"><i class="fas fa-search"></i></button></div>
                                        </div>
                                    </form>
                                </div>
                            </li>
                            <div class="d-none d-sm-block topbar-divider"></div>
                            <li class="nav-item dropdown no-arrow">
                                <div class="nav-item dropdown no-arrow"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><span class="d-none d-lg-inline me-2 text-gray-600 small">Moritz</span><img class="border rounded-circle img-profile" src="assets/img/avatars/Screenshot%202024-02-15%20140714.png"></a>
                                    <div class="dropdown-menu shadow dropdown-menu-end animated--grow-in"><a class="dropdown-item" href="lizenz.html"><i class="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Profil</a>
                                        <div class="dropdown-divider"></div><a class="dropdown-item" href="#"><i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Ausloggen</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div class="container-fluid">
                    <div class="card shadow-lg o-hidden border-0 my-5">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-5 d-none d-lg-flex">
                                    <div class="flex-grow-1 bg-register-image" style="background: url(&quot;assets/img/dogs/1ad9ef78-e44b-4701-bcf1-fab6f7674aed.webp&quot;);"></div>
                                </div>
                                <div class="col-lg-7">
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
                                                <x-primary-button class="btn btn-primary d-block btn-user w-100">
                                                    {{ __('Register') }}
                                                </x-primary-button>
                                        

                            

                                                <hr>


                                        
                                                <!-- Social Media Registration -->
                                                <a class="btn btn-primary d-block btn-google btn-user w-100 mb-2" role="button">
                                                    <i class="fab fa-google"></i>&nbsp; Mit Google registrieren
                                                </a>
                                                <a class="btn btn-primary d-block btn-facebook btn-user w-100" role="button">
                                                    <i class="fab fa-facebook-f"></i>&nbsp; Mit Facebook registrieren
                                                </a>
                                            </form>
                                       

                                        


                                        <div class="text-center"><a class="small" href="forgot-passwort.html">Passwort vergessen?</a></div>
                                        <div class="text-center"><a class="small" href="login.html">Du hast bereits einen Account? Login!</a></div>
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