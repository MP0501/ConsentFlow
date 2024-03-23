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

    <!-- Color Pickr -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/themes/classic.min.css"/> 
<script src="https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/pickr.min.js"></script>




<script>
    document.addEventListener('DOMContentLoaded', () => {
        @foreach($settings as $key => $value)
            @php
                $isColorValue = preg_match('/^#([0-9a-fA-F]{3}([0-9a-fA-F]{1})?|[0-9a-fA-F]{6}([0-9a-fA-F]{2})?)$/', $value);
            @endphp
    
            @if ($isColorValue)
                const pickr_{{ Str::slug($key, '_') }} = Pickr.create({
                    el: '#{{ $key }}_color_picker',
                    theme: 'classic', 
                    default: '{{ $value }}',
                    components: {
                        preview: true,
                        opacity: true,
                        hue: true,
                
                        interaction: {
                            hex: true,
                            rgba: true,
                            input: true,
                            save: true
                        }
                    }
                }).on('save', (color, instance) => {
                    document.getElementById('{{ $key }}').value = color.toHEXA().toString(0); 
                    instance.hide(); 
                });
            @endif
        @endforeach
    });
    </script>
  


<script>
document.addEventListener('DOMContentLoaded', function() {

function isValidHex(input) {
var value = input.startsWith('#') ? input.slice(1) : input;
// Entferne das # aus dem regulären Ausdruck, da wir es bereits oben behandelt haben
var hexPattern = /^([0-9a-fA-F]{3}([0-9a-fA-F]{1})?|[0-9a-fA-F]{6}([0-9a-fA-F]{2})?)$/;
if (hexPattern.test(value)) {
    return '#' + value.toUpperCase();
}
return false;
}

//Hex input zu color picker
document.querySelectorAll('input[type="text"]').forEach(function(textInput) {
textInput.addEventListener('input', function() {
    var correctedHex = isValidHex(this.value);
    if (correctedHex) {
        var colorPicker = this.closest('td').nextElementSibling.querySelector('input[type="color"]');
        if (colorPicker) {
            colorPicker.value = correctedHex;
            this.value = correctedHex; 
        }
    }
});
});
});







</script>




</head>



 





<body id="page-top">
    <div id="wrapper">
        <x-navbar />
        
      
        <div class="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <nav class="navbar navbar-expand bg-white shadow mb-4 topbar static-top navbar-light">
                    <div class="container-fluid"><button class="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i class="fas fa-bars"></i></button>
                        <h3 class="text-dark mb-0">Einstellungen</h3>
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
                <form method="POST" action="{{route('updateSettings') }}">
                    @csrf 
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
                                            <label>
                                                <div class="card"><img class="card-img-top w-100 d-block fit-cover" style="height: 200px;" src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png">
                                                    <div class="card-body p-4">
                                                        <h4 class="card-title">Design 1</h4>
                                                        <div class="form-check"><input class="form-check-input" type="radio" id="design-1"  name="design_choice" value="1" {{ $settings['design_choice'] == 1 ? 'checked' : '' }}>Auswählen</div>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                        <div class="col">
                                            <label>
                                                <div class="card"><img class="card-img-top w-100 d-block fit-cover" style="height: 200px;" src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png">
                                                    <div class="card-body p-4">
                                                        <h4 class="card-title">Design 2</h4>
                                                        <div class="form-check"> <input class="form-check-input" type="radio" id="design-2" name="design_choice" value="2" {{ $settings['design_choice'] == 2 ? 'checked' : '' }}>Auswählen</div>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                        <div class="col">
                                            <label>
                                                <div class="card"><img class="card-img-top w-100 d-block fit-cover" style="height: 200px;" src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png">
                                                    <div class="card-body p-4">
                                                        <h4 class="card-title">Design 3</h4>
                                                        <div class="form-check"><input class="form-check-input" type="radio" id="design-3" name="design_choice" value="3" {{ $settings['design_choice'] == 3 ? 'checked' : '' }}>Auswählen</div>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 20px;">
                        <div class="col">
                            <div class="card shadow" style="margin-bottom: 20px;">
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
                                                    <td style="width: 154.516px;">Höhe</td>
                                                    <td style="width: 258.641px;">
                                                        <input class="border rounded input_design" type="text" name=banner_max_height id=banner_max_height value="{{ $settings['banner_max_height'] }}">
                                                        @error('banner_max_height')<span class="text-danger">{{ $message }}</span>@enderror
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Breite</td>
                                                    <td style="width: 258.641px;">
                                                        <input class="border rounded input_design" type="text" name=banner_width id=banner_width value="{{ $settings['banner_width'] }}">
                                                        @error('banner_width')<span class="text-danger">{{ $message }}</span>@enderror
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Hintergrundfarbe</td>
                                                    <td style="width: 258.641px;">
                                                        <input  class="border rounded input_design" type="text" id="banner_background" name="banner_background" value="{{ $settings['banner_background'] }}" readonly>
                                                        
                                                    </td>
                                                    <td>
                                                        <div id="banner_background_color_picker"></div>

                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Bannerumrandung</td>
                                                    <td style="width: 258.641px;">
                                                        <input  class="border rounded input_design" type="text" id="banner_border_radius" name="banner_border_radius" value="{{ $settings['banner_border_radius'] }}">
                                                        @error('banner_border_radius')<span class="text-danger">{{ $message }}</span>@enderror
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr></tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="card shadow" style="margin-bottom: 20px;">
                                <div class="card-header py-3">
                                    <p class="text-primary m-0 fw-bold">Überschrift Einstellungen</p>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive table mt-2" id="dataTable-3" role="grid" aria-describedby="dataTable_info">
                                        <table class="table my-0" id="dataTable">
                                            <thead>
                                                <tr></tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style="width: 154.516px;">Überschrift Text</td>
                                                    <td style="width: 258.641px;">
                                                        <input class="border rounded input_design" type="text" name=headline_text id=headline_text value="{{ $settings['headline_text'] }}">
                                                        @error('headline_text')<span class="text-danger">{{ $message }}</span>@enderror
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Überschriftgröße</td>
                                                    <td style="width: 258.641px;">
                                                        <input class="border rounded input_design" type="text" name=headline_size id=headline_size value="{{ $settings['headline_size'] }}">
                                                        @error('headline_size')<span class="text-danger">{{ $message }}</span>@enderror
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Überschriftfarbe</td>
                                                    <td style="width: 258.641px;">
                                                        <input  class="border rounded input_design" type="text" id="headline_color" name="headline_color" value="{{ $settings['headline_color'] }}" readonly>

                                                    </td>
                                                    <td>
                                                        <div id="headline_color_color_picker"></div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr></tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="card shadow">
                                <div class="card-header py-3">
                                    <p class="text-primary m-0 fw-bold">Text Einstellungen</p>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive table mt-2" id="dataTable-4" role="grid" aria-describedby="dataTable_info">
                                        <table class="table my-0" id="dataTable">
                                            <thead>
                                                <tr></tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style="width: 154.516px;">Text</td>
                                                    <td style="width: 258.641px;">
                                                        <input class="border rounded input_design" type="text" name=paragraph_text id=paragraph_text value="{{ $settings['paragraph_text'] }}">
                                                        @error('paragraph_text')<span class="text-danger">{{ $message }}</span>@enderror
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Textgröße</td>
                                                    <td style="width: 258.641px;">
                                                        <input class="border rounded input_design" type="text" name=paragraph_size  id=paragraph_size  value="{{ $settings['paragraph_size'] }}">
                                                        @error('paragraph_size')<span class="text-danger">{{ $message }}</span>@enderror
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Textfarbe</td>
                                                    <td style="width: 258.641px;">
                                                        <input  class="border rounded input_design" type="text" id="paragraph_color" name="paragraph_color" value="{{ $settings['paragraph_color'] }}" readonly>

                                                    </td>
                                                    <td>
                                                        <div id="paragraph_color_color_picker"></div>

                                                    </td>
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
                            <div class="card shadow" style="margin-bottom: 20px;">
                                <div class="card-header py-3">
                                    <p class="text-primary m-0 fw-bold">Akzeptierbutton Einstellungen</p>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive table mt-2" id="dataTable-4" role="grid" aria-describedby="dataTable_info">
                                        <table class="table my-0" id="dataTable">
                                            <thead>
                                                <tr></tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style="width: 154.516px;">Textgröße</td>
                                                    <td style="width: 258.641px;">
                                                        <input class="border rounded input_design" type="text" name=accept_text id=accept_text value="{{ $settings['accept_text'] }}">
                                                        @error('accept_text')<span class="text-danger">{{ $message }}</span>@enderror
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Akzeptierbutton<br> Textfarbe</td>
                                                    <td style="width: 258.641px;">
                                                        <input  class="border rounded input_design" type="text" id="accept_color" name="accept_color" value="{{ $settings['accept_color'] }}" readonly>
                                                        
                                                    </td>
                                                    <td>
                                                        <div id="accept_color_color_picker"></div>

                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Akzeptierbutton<br> Randfarbe</td>
                                                    <td style="width: 258.641px;">
                                                        <input  class="border rounded input_design" type="text" id="accept_border_color" name="accept_border_color" value="{{ $settings['accept_border_color'] }}" readonly>
                                                        
                                                    </td>
                                                    <td>
                                                        <div id="accept_border_color_color_picker"></div>

                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Akzeptierbutton<br> Randstärke</td>
                                                    <td style="width: 258.641px;">
                                                        <input class="border rounded input_design" type="text" name=accept_border_width id=accept_border_width value="{{ $settings['accept_border_width'] }}">
                                                        @error('accept_border_width')<span class="text-danger">{{ $message }}</span>@enderror
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Akzeptierbutton<br> Umrandung</td>
                                                    <td style="width: 258.641px;">
                                                        <input class="border rounded input_design" type="text" name=accept_border_radius id=accept_border_radius value="{{ $settings['accept_border_radius'] }}">
                                                        @error('accept_border_radius')<span class="text-danger">{{ $message }}</span>@enderror
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Akzeptierbutton&nbsp; Hintergrund Farbe</td>
                                                    <td style="width: 258.641px;">
                                                        <input  class="border rounded input_design" type="text" id="accept_background_color" name="accept_background_color" value="{{ $settings['accept_background_color'] }}" readonly>
                                                        
                                                    </td>
                                                    <td>
                                                        <div id="accept_background_color_color_picker"></div>

                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr></tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="card shadow" style="margin-bottom: 20px;">
                                <div class="card-header py-3">
                                    <p class="text-primary m-0 fw-bold">Ablehnbutton Einstellungen</p>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive table mt-2" id="dataTable-5" role="grid" aria-describedby="dataTable_info">
                                        <table class="table my-0" id="dataTable">
                                            <thead>
                                                <tr></tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style="width: 154.516px;">Ablehnbutton Text&nbsp; &nbsp;</td>
                                                    <td style="width: 258.641px;">
                                                        <input class="border rounded input_design" type="text" name=reject_text id=reject_text value="{{ $settings['reject_text'] }}">
                                                        @error('reject_text')<span class="text-danger">{{ $message }}</span>@enderror
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Ablehnbutton<br> Textfarbe</td>
                                                    <td style="width: 258.641px;">
                                                        <input  class="border rounded input_design" type="text" id="reject_color" name="reject_color" value="{{ $settings['reject_color'] }}" readonly>

                                                    </td>
                                                    <td>
                                                        <div id="reject_color_color_picker"></div>

                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Ablehnbutton Randfarbe</td>
                                                    <td style="width: 258.641px;">
                                                        <input  class="border rounded input_design" type="text" id="reject_border_color" name="reject_border_color" value="{{ $settings['reject_border_color'] }}" readonly>

                                                    </td>
                                                    <td>
                                                        <div id="reject_border_color_color_picker"></div>

                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Ablehnbutton<br> Randstärke</td>
                                                    <td style="width: 258.641px;">
                                                        <input class="border rounded input_design" type="text" name=reject_border_width id=reject_border_width value="{{ $settings['reject_border_width'] }}">
                                                        @error('reject_border_width')<span class="text-danger">{{ $message }}</span>@enderror
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Ablehnbutton Umrandung</td>
                                                    <td style="width: 258.641px;">
                                                        <input class="border rounded input_design" type="text" name=reject_border_radius id=reject_border_radius value="{{ $settings['reject_border_radius'] }}">
                                                        @error('reject_border_radius')<span class="text-danger">{{ $message }}</span>@enderror
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Ablehnbutton Hintergrund Farbe</td>
                                                    <td style="width: 258.641px;">
                                                        <input  class="border rounded input_design" type="text" id="reject_background_color" name="reject_background_color" value="{{ $settings['reject_background_color'] }}" readonly>

                                                    </td>
                                                    <td>
                                                        <div id="reject_background_color_color_picker"></div>

                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr></tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="card shadow" style="margin-bottom: 20px;">
                                <div class="card-header py-3">
                                    <p class="text-primary m-0 fw-bold">Einstellbutton Einstellungen</p>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive table mt-2" id="dataTable-6" role="grid" aria-describedby="dataTable_info">
                                        <table class="table my-0" id="dataTable">
                                            <thead>
                                                <tr></tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style="width: 154.516px;">Einstellbutton Text&nbsp; &nbsp;</td>
                                                    <td style="width: 258.641px;">
                                                        <input class="border rounded input_design" type="text" name=settings_text id=settings_text value="{{ $settings['settings_text'] }}">
                                                        @error('settings_text')<span class="text-danger">{{ $message }}</span>@enderror
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Einstellbutton<br> Textfarbe</td>
                                                    <td style="width: 258.641px;">
                                                        <input  class="border rounded input_design" type="text" id="settings_color" name="settings_color" value="{{ $settings['settings_color'] }}" readonly>

                                                    </td>
                                                    <td>
                                                        <div id="settings_color_color_picker"></div>

                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Einstellbutton Randfarbe</td>
                                                    <td style="width: 258.641px;">
                                                        <input  class="border rounded input_design" type="text" id="settings_border_color" name="settings_border_color" value="{{ $settings['settings_border_color'] }}" readonly>

                                                    </td>
                                                    <td>
                                                        <div id="settings_border_color_color_picker"></div>

                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Einstellbutton<br> Randstärke</td>
                                                    <td style="width: 258.641px;">
                                                        <input class="border rounded input_design" type="text" name=settings_border_width id=settings_border_width value="{{ $settings['settings_border_width'] }}">
                                                        @error('settings_border_width')<span class="text-danger">{{ $message }}</span>@enderror
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Einstellbutton Umrandung</td>
                                                    <td style="width: 258.641px;">
                                                        <input class="border rounded input_design" type="text" name=settings_border_radius id=settings_border_radius value="{{ $settings['settings_border_radius'] }}">
                                                        @error('settings_border_radius')<span class="text-danger">{{ $message }}</span>@enderror
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Einstellbutton Hintergrund Farbe</td>
                                                    <td style="width: 258.641px;">
                                                        <input  class="border rounded input_design" type="text" id="settings_background_color" name="settings_background_color" value="{{ $settings['settings_background_color'] }}" readonly>

                                                    </td>
                                                    <td>
                                                        <div id="settings_background_color_color_picker"></div>

                                                    </td>
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
                            <div class="card shadow" style="margin-bottom: 20px;">
                                <div class="card-header py-3">
                                    <p class="text-primary m-0 fw-bold">Link Einstellungen</p>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive table mt-2" id="dataTable-7" role="grid" aria-describedby="dataTable_info">
                                        <table class="table my-0" id="dataTable">
                                            <thead>
                                                <tr></tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style="width: 154.516px;">Link Farbe</td>
                                                    <td style="width: 258.641px;">
                                                        <input  class="border rounded input_design" type="text" id="link_color" name="link_color" value="{{ $settings['link_color'] }}" readonly>

                                                    </td>
                                                    <td>
                                                        <div id="link_color_color_picker"></div>

                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 154.516px;">Lint Textgröße</td>
                                                    <td style="width: 258.641px;">
                                                        <input class="border rounded input_design" type="text" name=link_font_size id=link_font_size value="{{ $settings['link_font_size'] }}">
                                                        @error('link_font_size')<span class="text-danger">{{ $message }}</span>@enderror
                                                    </td>
                                                    <td></td>
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
                        <div class="col" style="text-align: left;"><button class="btn btn-primary" type="submit" style="width: 187px;">Speichern</button></div>
                    </div>
                </div>
            </form>
            </div>
            <x-footer />
        </div><a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a>

  
    </div>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="assets/js/bs-init.js"></script>
    <script src="assets/js/theme.js"></script>
</body>

</html>