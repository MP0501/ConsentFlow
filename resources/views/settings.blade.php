<!DOCTYPE html>
<html data-bs-theme="light" lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Table - ConsentFlow</title>
    <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&amp;display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins&amp;display=swap">
    <link rel="stylesheet" href="/assets/fonts/fontawesome-all.min.css">
    <link rel="stylesheet" href="/assets/css/bs-theme-overrides.css">
    <link rel="stylesheet" href="/assets/css/Banner-Heading-Image-images.css">
    <link rel="stylesheet" href="/assets/css/nav_bar.css">
    <link rel="stylesheet" href="/assets/css/Pricing-Duo-badges.css">
    <link rel="stylesheet" href="/assets/css/Pricing-Duo-icons.css">
</head>

<body id="page-top">
    
    
    <div id="wrapper">
        <x-navbar />
        <form method="POST" action="{{ route('updateDesign') }}">
            @csrf 
            <input class="form-check-input" type="radio" id="formCheck-1"  name="designChoice" value="1"><label class="form-check-label" for="formCheck-1">Auswählen</label>
            <input class="form-check-input" type="radio" id="formCheck-2" name="designChoice" value="2"><label class="form-check-label" for="formCheck-2">Auswählen</label>
            <input class="form-check-input" type="radio" id="formCheck-3" name="designChoice" value="3"><label class="form-check-label" for="formCheck-3">Auswählen</label>

            <button type="submit" class="btn btn-primary">Speichern</button>

        </form>
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
                    <div class="row" style="margin-bottom: 20px;">
                        <div class="col">
                            <div class="card shadow">
                                <div class="card-header py-3">
                                    <p class="text-primary m-0 fw-bold">Design Einstellungen</p>
                                </div>
                                <div class="card-body">
                                    <div class="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                                        <div class="col">
                                            <div class="card"><img class="card-img-top w-100 d-block fit-cover" style="height: 200px;" src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png">
                                                <div class="card-body p-4">
                                                    <h4 class="card-title">Design 1</h4>
                                                    <div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-1"><label class="form-check-label" for="formCheck-1">Auswählen</label></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="card"><img class="card-img-top w-100 d-block fit-cover" style="height: 200px;" src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png">
                                                <div class="card-body p-4">
                                                    <h4 class="card-title">Design 2</h4>
                                                    <div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-3"><label class="form-check-label" for="formCheck-3">Auswählen</label></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="card"><img class="card-img-top w-100 d-block fit-cover" style="height: 200px;" src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png">
                                                <div class="card-body p-4">
                                                    <h4 class="card-title">Design 3</h4>
                                                    <div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-2"><label class="form-check-label" for="formCheck-2">Auswählen</label></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 20px;">
                        <div class="col">
                            <div class="card shadow">
                                <div class="card-header py-3">
                                    <p class="text-primary m-0 fw-bold">Allgemeine Design Einstellungen</p>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive table mt-2" id="dataTable-1" role="grid" aria-describedby="dataTable_info">
                                        <table class="table my-0" id="dataTable">
                                            <thead>
                                                <tr></tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style="width: 154.516px;">Akzent Farbe</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td><input type="color"></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Hintergrundfarbe</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td><input type="color"></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Überschrift Farbe</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td><input type="color"></td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr></tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 20px;">
                        <div class="col">
                            <div class="card shadow">
                                <div class="card-header py-3">
                                    <p class="text-primary m-0 fw-bold">Detaileinstellungen</p>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive table mt-2" id="dataTable-2" role="grid" aria-describedby="dataTable_info">
                                        <table class="table my-0" id="dataTable">
                                            <thead>
                                                <tr></tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style="width: 154.516px;">Hintergrundfarbe</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td><input type="color"></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Überschrift Farbe</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td><input type="color"></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Button 1 Farbe</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td><input type="color"></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Button 1 Textfarbe</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td><input type="color"></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Button 1 Text</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Button 1 Abrundung</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Button 1 Randstärke</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td><input type="color"></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Button 1 Randfarbe</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td><input type="color"></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Button 2 Farbe</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td><input type="color"></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Button 2 Textfarbe</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td><input type="color"></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Button 2 Text</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Button 2 Abrundung</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Button 2 Randstärke</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td><input type="color"></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Button 2 Randfarbe</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td><input type="color"></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Button 3 Farbe</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td><input type="color"></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Button 3 Textfarbe</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td><input type="color"></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Button 3 Text</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Button 3 Abrundung</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Button 3 Randstärke</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td><input type="color"></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Button 3 Randfarbe</td>
                                                    <td style="width: 258.641px;"><input class="border rounded" type="text" style="border-width: 2px!important;width: 240px;">
                                                        <div class="input-group"></div>
                                                    </td>
                                                    <td><input type="color"></td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr></tr>
                                            </tfoot>
                                        </table>
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