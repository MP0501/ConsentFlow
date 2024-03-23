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

<!-- Pop up Cookie manuell erstellen -->
<div class="modal fade" id="cookieCreate" tabindex="-1" aria-labelledby="cookieCreate" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="cookieCreate">Cookie erstellen</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <table id="dataTable" class="table my-0">
                <thead>
                    <tr></tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="width: 154.516px;">Cookie url</td>
                        <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;" />
                            <div class="input-group"></div>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style="width: 154.516px;">Cookie Test</td>
                        <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;" />
                            <div class="input-group"></div>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style="width: 154.516px;">Weitere Einstellungen</td>
                        <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;" />
                            <div class="input-group"></div>
                        </td>
                        <td></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr></tr>
                </tfoot>
            </table>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Schließen</button>
          <button type="button" class="btn btn-primary">Änderungen speichern</button>
        </div>
      </div>
    </div>
  </div>


<!-- Pop up Cookie bearbeiten -->
<div class="modal fade" id="cookieEditModal" tabindex="-1" aria-labelledby="cookieEditModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="cookieEditModalLabel">Cookie bearbeiten</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <table id="dataTable" class="table my-0">
                <thead>
                    <tr></tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="width: 154.516px;">Cookie url</td>
                        <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;" />
                            <div class="input-group"></div>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style="width: 154.516px;">Cookie Test</td>
                        <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;" />
                            <div class="input-group"></div>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style="width: 154.516px;">Weitere Einstellungen</td>
                        <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;" />
                            <div class="input-group"></div>
                        </td>
                        <td></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr></tr>
                </tfoot>
            </table>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Schließen</button>
          <button type="button" class="btn btn-primary">Änderungen speichern</button>
        </div>
      </div>
    </div>
  </div>

  
  <!-- Cookie Scanner-->
  <div class="modal fade" id="cookieScannerModal" tabindex="-1" aria-labelledby="cookieScannerModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="cookieEditModalLabel">Cookie Scanner</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            Cookie Scanner gestartet.
            Sollen wir dann hier eine tabelle einabuen mit allen cookies??? und dann auf einfügen oder abrechen? 
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
                        <h3 class="text-dark mb-0">Cookie Scanner</h3>
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
                        <div class="col-md-6 col-xl-3 mb-4">
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="text-primary fw-bold m-0">Cookie Scanner</h6>
                                </div>
                                <div class="card-body">
                                    <p>Der Cookie Scanner findet automatisiert alle Cookies die auf deiner Website verwendet werden.</p><button class="btn btn-primary" type="button" data-toggle="modal" data-target="#cookieScannerModal" >Scanner starten</button>
                                    <div class="card text-white bg-primary border-0"></div>
                                </div>
                            </div>
                            <div class="card shadow border-start-primary py-2">
                                <div class="card-header py-3">
                                    <h6 class="text-primary fw-bold m-0">Cookie manuell hinzufügen</h6>
                                </div>
                                <div class="card-body">
                                    <p>Falls ein Cookie nicht automatisiert gefunden wurde, kannst du ihn hier hinzufügen.</p><button class="btn btn-primary" type="button" data-toggle="modal" data-target="#cookieCreate">Cookie hinzufügen</button>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card shadow">
                                <div class="card-header py-3">
                                    <p class="text-primary m-0 fw-bold">Alle Cookies</p>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6 text-nowrap">
                                            <div id="dataTable_length" class="dataTables_length" aria-controls="dataTable"><label class="form-label">Zeige&nbsp;<select class="d-inline-block form-select form-select-sm">
                                                        <option value="10" selected="">10</option>
                                                        <option value="25">25</option>
                                                        <option value="50">50</option>
                                                        <option value="100">100</option>
                                                    </select>&nbsp;</label></div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="text-md-end dataTables_filter" id="dataTable_filter"><label class="form-label"><input type="search" class="form-control form-control-sm" aria-controls="dataTable" placeholder="Cookie Suchen"></label></div>
                                        </div>
                                    </div>
                                    <div class="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                                        <table class="table my-0" id="dataTable">
                                            <thead>
                                                <tr>
                                                    <th>Cookie Name</th>
                                                    <th>Kategorie</th>
                                                    <th>???</th>
                                                    <th>???</th>
                                                    <th>Cookie bearbeiten</th>
                                                    <th>Cookie entfernen</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                @foreach ($vendors as $vendor)
                                                <tr>
                                                    <td>{{ $vendor->name }}</td>
                                                    <td>
                                                        <button type="button" name="edit_cookie" id="edit_cookie" class="btn btn-primary" data-toggle="modal" data-target="#cookieEditModal">
                                                            Bearbeiten
                                                          </button>
                                                          
                                                    </td>
                                                    <td>
                                                        <form action="{{ route('delete_vendor') }}" method="POST" onsubmit="return confirm('Sind Sie sicher?');">
                                                            @csrf
                                                            @method('DELETE')
                                                            <input type="hidden" name="consentId" value="{{ $vendor->id }}">
                                                            <button class="btn btn-danger" type="submit">Entfernen</button>
                                                        </form>
                                                    </td>
                                                </tr>
                                                @endforeach
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td><strong>Cookie Name</strong></td>
                                                    <td><strong>Kategorie</strong></td>
                                                    <td><strong>???</strong></td>
                                                    <td><strong>???</strong></td>
                                                    <td><strong>Cookie bearbeiten</strong></td>
                                                    <td><strong>Cookie entfernen</strong></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6 align-self-center">
                                            <p id="dataTable_info" class="dataTables_info" role="status" aria-live="polite">Zeige 1 bis 10 von 5</p>
                                        </div>
                                        <div class="col-md-6">
                                            <nav class="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                                                <ul class="pagination">
                                                    <li class="page-item disabled"><a class="page-link" aria-label="Previous" href="#"><span aria-hidden="true">«</span></a></li>
                                                    <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                    <li class="page-item"><a class="page-link" aria-label="Next" href="#"><span aria-hidden="true">»</span></a></li>
                                                </ul>
                                            </nav>
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