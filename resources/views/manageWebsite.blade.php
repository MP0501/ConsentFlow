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

    <!-- jQuery  -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

</head>

<body id="page-top">




    <!-- Modal Popup-->
<div class="modal fade" id="cookieEditModal" tabindex="-1" aria-labelledby="cookieEditModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="cookieEditModalLabel">Website hinzufügen</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            Bitte wähle die Website aus, auf der dein Consent-Banner angezeigt werden soll. 
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Ok</button>
        </div>
      </div>
    </div>
  </div>

  @if(empty($consents->toArray()))
  <script>
        $('#cookieEditModal').modal('show');
  </script>
  @endif

  
  







    <div id="wrapper">
        <x-navbar />

        <div class="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <nav class="navbar navbar-expand bg-white shadow mb-4 topbar static-top navbar-light">
                    <div class="container-fluid"><button class="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i class="fas fa-bars"></i></button>
                        <h3 class="text-dark mb-0">Websites verwalten</h3>
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
                                        <div class="dropdown-divider"></div><a class="dropdown-item" href="#"><i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Ausloggen</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 col-xl-3 col-xxl-4 mb-4" style="width: 492px;">
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="text-primary fw-bold m-0">Website hinzufügen</h6>
                                </div>
                                <div class="card-body">
                                    <p>Beginne mit ConsentFlow, indem du die URL deiner Website einträgst. Ohne eine registrierte Website kannst du die Funktionen unserer Consent Management Plattform nicht nutzen.</p>
                                    <form action="{{ route('add_consent') }}" method="POST">
                                        @csrf
                                        
                                    <input class="border rounded form-control-user" type="website" id="exampleInputEmail-1" aria-describedby="emailHelp" placeholder="Website URL" name="url" style="margin-bottom: 16px;/*border-color: black!important;*/padding-left: 8px;width: 100%;">
                                    @if ($errors->any())
                                        <div class="alert alert-danger">
                                            <ul>
                                                @foreach ($errors->all() as $error)
                                                    <li>{{ $error }}</li>
                                                @endforeach
                                            </ul>
                                        </div>
                                    @endif
                                    <div class="card text-white bg-primary border-0"></div><button class="btn btn-primary" type="submit">Website hinzufügen</button>
                                    </form>
                                    

                                </div>
                            </div>
                        </div>

        
                        
                        <div class="col">
                            <div class="card shadow">
                                <div class="card-header py-3">
                                    <p class="text-primary m-0 fw-bold">Alle Websites</p>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                                        <table class="table my-0" id="dataTable">
                                            <thead>
                                                <tr>
                                                    <th style="width: 364.203px;">Website URL</th>
                                                    <th>Website auswählen</th>
                                                    <th>Website entfernen</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                @foreach ($consents as $consent)
                                                <tr>
                                                    <td>{{ $consent->website_url }}</td>
                                                    <td>
                                                        <!-- Implementiere die Logik oder den Button für das Auswählen der Website hier -->
                                                        <form id="selectForm_{{ $consent->id }}" action="/setConsentId" method="GET">
                                                            @csrf
                                                            <input type="hidden" name="consentId" value="{{ $consent->id }}">
                                                            <button type="submit" class="btn {{ session('ConsentId') == $consent->id ? 'btn-success' : 'btn-primary' }}">
                                                                {{ session('ConsentId') == $consent->id ? 'Ausgewählt' : 'Auswählen' }}
                                                            </button>
                                                        </form>
                                                    </td>
                                                    <td>
                                                        <form action="{{ route('delete_website') }}" method="POST" onsubmit="return confirm('Sind Sie sicher?');">
                                                            @csrf
                                                            @method('DELETE')
                                                            <input type="hidden" name="consentId" value="{{ $consent->id }}">
                                                            <button class="btn btn-danger" type="submit">Entfernen</button>
                                                        </form>
                                                    </td>
                                                </tr>
                                                @endforeach
                                            </tbody>
                                            <tfoot>
                                                <tr></tr>
                                            </tfoot>
                                        </table>
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