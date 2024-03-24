<!DOCTYPE html>
<html data-bs-theme="light" lang="en">

<head>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'%3E%3Cpath d='M476 480H324a36 36 0 0 1 -36-36V96h-96v156a36 36 0 0 1 -36 36H16a16 16 0 0 1 -16-16v-32a16 16 0 0 1 16-16h112V68a36 36 0 0 1 36-36h152a36 36 0 0 1 36 36v348h96V260a36 36 0 0 1 36-36h140a16 16 0 0 1 16 16v32a16 16 0 0 1 -16 16H512v156a36 36 0 0 1 -36 36z'/%3E%3C/svg%3E">

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
                    <form method="POST" action="{{ route('addConsentVendor') }}">
                        @csrf
                        <tr>
                            <td style="width: 154.516px;">Vendor Name</td>
                            <td style="width: 258.641px;">
                                <input class="border rounded" type="text" name="vendor_name" style="border-width: 2px!important;width: 240px;" required />
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 154.516px;">Zweck</td>
                            <td style="width: 258.641px;">
                                <select class="form-control border rounded" name="purpose" style="width: 240px;" required>
                                    <option value="" selected>Bitte auswählen</option>
                                    <option value="1">Information speichern/abrufen</option>
                                    <option value="2">Begrenzte Daten für Werbung</option>
                                    <option value="3">Profile für personalisierte Werbung erstellen</option>
                                    <option value="4">Profile für Werbung verwenden</option>
                                    <option value="5">Profile zur Personalisierung von Inhalten erstellen</option>
                                    <option value="6">Personalisierte Inhalte auswählen</option>
                                    <option value="7">Werbungsleistung messen</option>
                                    <option value="8">Inhaltsleistung messen</option>
                                    <option value="9">Publikum verstehen durch Datenanalyse</option>
                                    <option value="10">Dienste entwickeln und verbessern</option>
                                    <option value="11">Begrenzte Daten zur Inhaltsauswahl verwenden</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 154.516px;">Vendor Skript</td>
                            <td style="width: 258.641px;">
                                <input class="border rounded" type="text" name="vendor_script" style="border-width: 2px!important;width: 240px;" required />
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 154.516px;">PolicyUrl</td>
                            <td style="width: 258.641px;">
                                <input class="border rounded" type="text" name="policy_url" style="border-width: 2px!important;width: 240px;" required />
                            </td>
                        </tr>
            
                    
                </tbody>
                <tfoot>
                    <tr></tr>
                </tfoot>
            </table>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Schließen</button>
          <button type="submit" class="btn btn-primary">Änderungen speichern</button></form>
        </div>
      </div>
    </div>
  </div>


  <script>
    function openEditModal(vendorId, vendorName, vendorPurpose, script_to_implement, vendorPolicyURL, id) {
        document.getElementById('vendor_id').value = vendorId;
        document.getElementById('vendor_name').value = vendorName;
        
         var purposeContainer = document.getElementById('purpose_container');
        purposeContainer.innerHTML = '';

        vendorPurpose.forEach(function(purpose, index) {

            // Erstelle ein neues select-Element
            var selectElement = document.createElement('select');
            selectElement.classList.add('form-control', 'border', 'rounded');
            selectElement.name = 'purpose';
            selectElement.required = true;
            selectElement.id = 'vendor_purpose_' + (index + 1);
            selectElement.name = 'vendor_purpose_' + (index + 1);

             // Füge das Label für den Zweck hinzu
            var purposeLabel = document.createElement('label');
            var purposeLabelText = 'Zweck ' + (index + 1)
            purposeLabel.textContent = purposeLabelText;
            purposeLabel.setAttribute('for', 'vendor_purpose_' + (index + 1));
            purposeContainer.appendChild(purposeLabel);

            // Erstelle die Optionen für das select-Element
            var options = [
                { value: '', text: 'Bitte auswählen' },
                { value: '1', text: 'Information speichern/abrufen' },
                { value: '2', text: 'Begrenzte Daten für Werbung' },
                { value: '3', text: 'Profile für personalisierte Werbung erstellen' },
                { value: '4', text: 'Profile für Werbung verwenden' },
                { value: '5', text: 'Profile zur Personalisierung von Inhalten erstellen' },
                { value: '6', text: 'Personalisierte Inhalte auswählen' },
                { value: '7', text: 'Werbungsleistung messen' },
                { value: '8', text: 'Inhaltsleistung messen' },
                { value: '9', text: 'Publikum verstehen durch Datenanalyse' },
                { value: '10', text: 'Dienste entwickeln und verbessern' },
                { value: '11', text: 'Begrenzte Daten zur Inhaltsauswahl verwenden' }
            ];

            // Füge die Optionen zum select-Element hinzu
            options.forEach(function(option) {
                var optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.text;
                selectElement.appendChild(optionElement);
            });


        

            // Füge das select-Element zum Container hinzu
            purposeContainer.appendChild(selectElement);

            selectElement.value = String(purpose);

        });
        document.getElementById('vendor_id_hidden').value = id;
        document.getElementById('script_to_implement').value = script_to_implement;
        document.getElementById('vendor_policyURL').value = vendorPolicyURL;
        $('#cookieEditModal').modal('show');
    }
</script>



<!-- Pop up Cookie bearbeiten -->
<div class="modal fade" id="cookieEditModal" tabindex="-1" aria-labelledby="cookieEditModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="cookieEditModalLabel">Vendor bearbeiten</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form action="{{ route('change_vendor') }}" method="POST">
                    @csrf
                    <input type="hidden" name="vendor_id" id="vendor_id">
                    <div class="form-group">
                        <label for="vendor_name">Vendor Name</label>
                        <input type="text" class="form-control" id="vendor_name" name="name" required>
                        <input type="hidden" class="form-control" id="vendor_id_hidden" name="vendor_id_hidden" required>
                    </div>
                    <div class="form-group">
                        <div id="purpose_container"></div>
                    </div>
                    <div class="form-group">
                        <label for="script_to_implement">Script to implement</label>
                        <input type="text" class="form-control" id="script_to_implement" name="script_to_implement" required>
                    </div>
                    <div class="form-group">
                        <label for="vendor_policyURL">policyURL</label>
                        <input type="text" class="form-control" id="vendor_policyURL" name="policy_url" required>
                    </div>
                    
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Schließen</button>
                <button type="submit" class="btn btn-primary">Änderungen speichern</button>
                </form>
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
                                    
                                        
                                    </div>
                                    <div class="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                                        <table class="table my-0" id="dataTable">
                                            <thead>
                                                <tr>
                                                    <th>Vendor Name</th>
                                                    <th>Zweck</th>
                                                    <th>policyURL</th>
                                                    <th>Cookie bearbeiten</th>
                                                    <th>Cookie entfernen</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                @foreach ($vendorsWithPurposes as $vendor)
                                                <tr>
                                                    <td>{{ $vendor['name'] }}</td>
                                                    <td>
                                                        @foreach ($vendor['purposes'] as $index => $purpose)
                                                            {{ $purpose }}
                                                            @if ($index < count($vendor['purposes']) - 1),
                                                            @endif
                                                        @endforeach
                                                    </td>
                                                    <td>{{ $vendor['policyURL'] }}</td>
                                                    <td>
                                                        <button type="button" name="edit_cookie" id="edit_cookie" class="btn btn-primary" data-toggle="modal" data-target="#cookieEditModal" data-vendor-id="{{ $vendor['id'] }}" onclick="openEditModal('{{ $vendor['id'] }}', '{{ $vendor['name'] }}', {{ json_encode($vendor['purposes_id']) }},'{{$vendor['script_to_implement']}}' ,'{{ $vendor['policyURL'] }}','{{ $vendor['id'] }}')">
                                                            Bearbeiten
                                                        </button>
                                                        
                                                 
                                                          
                                                    </td>
                                                    <td>
                                                        <form action="{{ route('delete_vendor') }}" method="POST" onsubmit="return confirm('Sind Sie sicher?');">
                                                            @csrf
                                                            @method('DELETE')
                                                            <input type="hidden" name="vendor_id" value="{{ $vendor['id'] }}">
                                                            <button class="btn btn-danger" type="submit">Entfernen</button>
                                                        </form>                                                        
                                                    </td>
                                                </tr>
                                                @endforeach
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>Vendor Name</th>
                                                    <th>Zweck</th>
                                                    <th>policyURL</th>
                                                    <th>Cookie bearbeiten</th>
                                                    <th>Cookie entfernen</th>
                                                </tr>
                                            </tfoot>
                                        </table>
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