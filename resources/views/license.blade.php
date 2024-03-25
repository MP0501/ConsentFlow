<!DOCTYPE html>
<html data-bs-theme="light" lang="en">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Lizenz - ConsentFlow</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&amp;display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins&amp;display=swap">
    <link rel="stylesheet" href="assets/fonts/fontawesome-all.min.css">
    <link rel="stylesheet" href="assets/css/bs-theme-overrides.css">
    <link rel="stylesheet" href="assets/css/Banner-Heading-Image-images.css">
    <link rel="stylesheet" href="assets/css/nav_bar.css">
    <link rel="stylesheet" href="assets/css/Pricing-Duo-badges.css">
    <link rel="stylesheet" href="assets/css/Pricing-Duo-icons.css">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'%3E%3Cpath d='M476 480H324a36 36 0 0 1 -36-36V96h-96v156a36 36 0 0 1 -36 36H16a16 16 0 0 1 -16-16v-32a16 16 0 0 1 16-16h112V68a36 36 0 0 1 36-36h152a36 36 0 0 1 36 36v348h96V260a36 36 0 0 1 36-36h140a16 16 0 0 1 16 16v32a16 16 0 0 1 -16 16H512v156a36 36 0 0 1 -36 36z'/%3E%3C/svg%3E">
    <!-- jQuery  -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</head>




<body id="page-top">

 <!-- Kündigen Popup-->
 <div class="modal fade" id="kuendigen" tabindex="-1" aria-labelledby="kuendigenLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="kuendigenLabel">Kündigung nicht möglich</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            Diese Seite ist eine Demoversion und daher ist die Funktion zur Kündigung nicht verfügbar.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Ok</button>
        </div>
      </div>
    </div>
  </div>




    <div id="wrapper">
        <x-navbar />
        <div class="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <nav class="navbar navbar-expand bg-white shadow mb-4 topbar static-top navbar-light">
                    <div class="container-fluid"><button class="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i class="fas fa-bars"></i></button>
                        <h3 class="text-dark mb-0">Lizenz</h3>
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
                                <div class="nav-item dropdown no-arrow"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><span class="d-none d-lg-inline me-2 text-gray-600 small">{{$first_name}}</span>
                                    <img class="border rounded-circle img-profile" src={{ asset($photo ? 'storage/' . $photo : 'assets/img/default_profil_new.webp') }}></a>
                                    <div class="dropdown-menu shadow dropdown-menu-end animated--grow-in"><a class="dropdown-item" href="profile.html"><i class="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Profil</a>
   
                                        <div class="dropdown-divider"></div>
<form method="POST" action="{{ route('logout') }}">
    @csrf
    <button type="submit" class="dropdown-item">
        <i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Ausloggen
    </button>
</form>                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div class="container-fluid">
                    <div class="row mb-3">
                        <div class="col-lg-4">
                            <div class="card mb-3">
    
                                <form action="{{ route('updatePhoto') }}" method="POST" enctype="multipart/form-data">
                                    <div class="card-body text-center shadow">
                                        <img class="rounded-circle mb-3 mt-4" src="{{ asset($photo ? 'storage/' . $photo : 'assets/img/default_profil_new.webp') }}" width="160" height="160">
                                        <div class="mb-3">
                                            <input type="file" name="photo" id="photo">
                                            @error('photo')
                <div class="text-danger">{{ $message }}</div>
            @enderror
                                        </div>
                                        <div class="mb-3">
                                            <button class="btn btn-primary btn-sm" type="submit">Foto ändern</button>
                                        </div>
                                    </div>
                                    @csrf
                                </form>
                                
                            </div>
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="text-primary fw-bold m-0">Aktuelle Lizenz</h6>
                                </div>
                                <div class="card-body">
                                    <div class="card text-white bg-primary border-0">
                                        <div class="card-body p-4">
                                            <div class="d-flex justify-content-between">
                                                <div>
                                                    <h3 class="fw-bold text-white mb-0">Consent Pro</h3>
                                                    <p>Pro Klick</p>
                                                    <h4 class="display-6 fw-bold text-white">0,01€</h4>
                                                </div>
                                                <div><span class="badge rounded-pill bg-primary text-uppercase bg-white-300">All in One</span></div>
                                            </div>
                                            <div>
                                                <ul class="list-unstyled">
                                                    <li class="d-flex mb-2"><span class="bs-icon-xs bs-icon-rounded bs-icon-semi-white bs-icon me-2 xs"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-check-lg">
                                                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022"></path>
                                                            </svg></span><span>Zahle nur soviel wie dein Consent Banner aufgerufen wird</span></li>
                                                    <li class="d-flex mb-2"><span class="bs-icon-xs bs-icon-rounded bs-icon-semi-white bs-icon me-2 xs"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-check-lg">
                                                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022"></path>
                                                            </svg></span><span>Nur 1€ Mindestkosten</span></li>
                                                    <li class="d-flex mb-2"><span class="bs-icon-xs bs-icon-rounded bs-icon-semi-white bs-icon me-2 xs"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-check-lg">
                                                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022"></path>
                                                            </svg></span><span>Alle Funktionen enthalten</span></li>
                                                    <li class="d-flex mb-2"><span class="bs-icon-xs bs-icon-rounded bs-icon-semi-white bs-icon me-2 xs"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-check-lg">
                                                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022"></path>
                                                            </svg></span><span>DGSVO und TCF 2.2 Konform</span></li>
                                                </ul>
                                            </div>
                                            <a class="btn btn-primary d-block w-100 bg-white-300" role="button" data-toggle="modal" data-target="#kuendigen">
                                                Kündigen
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <div class="row mb-3 d-none">
                                <div class="col">
                                    <div class="card text-white bg-primary shadow">
                                        <div class="card-body">
                                            <div class="row mb-2">
                                                <div class="col">
                                                    <p class="m-0">Peformance</p>
                                                    <p class="m-0"><strong>65.2%</strong></p>
                                                </div>
                                                <div class="col-auto"><i class="fas fa-rocket fa-2x"></i></div>
                                            </div>
                                            <p class="text-white-50 small m-0"><i class="fas fa-arrow-up"></i>&nbsp;5% since last month</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card text-white bg-success shadow">
                                        <div class="card-body">
                                            <div class="row mb-2">
                                                <div class="col">
                                                    <p class="m-0">Peformance</p>
                                                    <p class="m-0"><strong>65.2%</strong></p>
                                                </div>
                                                <div class="col-auto"><i class="fas fa-rocket fa-2x"></i></div>
                                            </div>
                                            <p class="text-white-50 small m-0"><i class="fas fa-arrow-up"></i>&nbsp;5% since last month</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="card shadow mb-3">
                                        <div class="card-header py-3">
                                            <p class="text-primary m-0 fw-bold">Einstellungen</p>
                                        </div>
                                        <div class="card-body">
                                            <form action="{{ route('updateSettings_license') }}" method="POST">
                                                @csrf
                                                <div class="row">
                                                    <div class="col">
                                                        <div class="mb-3"><label class="form-label" for="username"><strong>Unternehmensname</strong></label><input class="form-control" type="text" id="username" value={{$company_name}} name="Unternehmensname"></div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="mb-3"><label class="form-label" for="email"><strong>E-Mail Adresse</strong></label><input class="form-control" type="email" id="email" value={{$email}} name="email" readonly></div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <div class="mb-3"><label class="form-label" for="first_name"><strong>Vorname</strong></label><input class="form-control" type="text" id="first_name" value={{$first_name}} name="first_name"></div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="mb-3"><label class="form-label" for="last_name"><strong>Nachname</strong></label><input class="form-control" type="text" id="last_name" value={{$last_name}} name="last_name"></div>
                                                    </div>
                                                </div>
                                                <div class="mb-3"><button class="btn btn-primary btn-sm" type="submit">Einstellungen speichern</button></div>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="card shadow">
                                        <div class="card-header py-3">
                                            <p class="text-primary m-0 fw-bold">Kontakt Einstellungen</p>
                                        </div>
                                        <div class="card-body">
                                            <form action="{{route('updateAdress')}}" method="POST">
                                                <div class="mb-3"><label class="form-label" for="address"><strong>Adresse</strong></label><input class="form-control" type="text" id="address" placeholder="Adresse" value="{{$address ?? 'Adresse' }}" name="address"></div>
                                                <div class="row">
                                                    <div class="col">
                                                        <div class="mb-3"><label class="form-label" for="city"><strong>Stadt</strong></label><input class="form-control" type="text" id="city" placeholder="Stadt" value="{{$city ?? 'Stadt' }}" name="city"></div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="mb-3"><label class="form-label" for="country"><strong>Land</strong></label><input class="form-control" type="text" id="country" placeholder="Deutschland" value="{{$country ?? 'Deutschland' }}" name="country"></div>
                                                    </div>
                                                </div>
                                                
                                                <div class="mb-3"><button class="btn btn-primary btn-sm" type="submit">Einstellungen speichern</button></div>
                                                @csrf

                                            </form>
                                        
                                            
                                        </div>
                                    </div>
                                    <div class="card shadow" style="margin-top: 20px;">
                                        <div class="card-header py-3">
                                            <p class="text-primary m-0 fw-bold">Rechnungen</p>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                
                                                <div class="col">
                                                    <div class="mb-3"></div>
                                                    @if (session('error'))
                                                    <div class="alert alert-danger">
                                                        {{ session('error') }}
                                                    </div>
                                                @endif
                                                    <form action="{{ route('generate_invoice') }}" method="POST">
                                                        @csrf
                                                        <input type="hidden" name="consent_id" value="{{ $all_count }}">
                                                        <button class="btn btn-primary btn-sm" type="submit">Rechnung erstellen</button>
                                                    </form>
                                                    
                                                </div>
                                                <div class="col">
                                                    <div class="mb-3"></div>
                                                    <p><span style="color: var(--tw-prose-body);">Die Rechnungen werden einmal im Monat jeweils zum 1. des Monats erstellt und per E-Mail versandt. Zum Testen haben wir einen Button zum Erstellen der Rechnungen eingerichtet.</span></p>
                                                </div>
                                            </div>
                                        </div>
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