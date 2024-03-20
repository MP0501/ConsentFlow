<nav class="navbar align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 navbar-dark">
    <div class="container-fluid d-flex flex-column p-0">
        <a class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
            <div class="sidebar-brand-icon rotate-n-15"><i class="fas fa-wave-square"></i></div>
            <div class="sidebar-brand-text mx-3"><span>ConsentFlow</span></div>
        </a>
        <hr class="sidebar-divider my-0">
        <ul class="navbar-nav text-light" id="accordionSidebar-1">
            <li class="nav-item">
                <a class="nav-link {{ request()->is('dashboard') ? 'active' : '' }}" href="{{ url('/dashboard') }}">
                    <i class="fas fa-tachometer-alt"></i><span>Dashboard</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link {{ request()->is('cookieScanner') ? 'active' : '' }}" href="{{ url('/cookieScanner') }}">
                    <i class="fas fa-cookie"></i><span>Cookie Scanner</span>
                </a>
            </li>
            <li class="nav-item"><a class="nav-link {{ request()->is('settings') ? 'active' : '' }}" href="settings"><i class="fas fa-cog"></i><span>Einstellungen</span></a>
                <a class="nav-link {{ request()->is('manageWebsite') ? 'active' : '' }}" href="manageWebsite"><i class="fas fa-sitemap"></i><span>Websites verwalten</span>
                </a>
                <a class="nav-link {{ request()->is('script') ? 'active' : '' }}" href="script"><i class="fas fa-file-code"></i><span>Skript erstellen</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link {{ request()->is('license') ? 'active' : '' }}" href="license"><i class="fas fa-user"></i><span>Lizenz</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                    <i class="far fa-user-circle"></i><span>Ausloggen</span>
                </a>
            </li>
                    
        </ul>
        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            @csrf
        </form>
        
        
    </div>
</nav>
