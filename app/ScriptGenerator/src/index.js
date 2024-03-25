import{CmpApi}from"@iabtcf/cmpapi";
import{TCModel,TCString,GVL,Segment}from"@iabtcf/core";
const cmpstub = require('@iabtcf/stub');

//Aktivieren der cmpstub Function (window__tcapi())
cmpstub();

//Erstellen des aktuellen Unix Dates
function getUnixDate(){
    return new Date().getTime();
}

//Cookie speichern
function setCookieValue(key, val){
    const d = new Date();
    d.setTime(d.getTime() + (30*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    val.path = "/"
    val.expires = expires
    val.createDate = getUnixDate();
    document.cookie = key + "=" +JSON.stringify(val);
}

//Cookie Wert abrufen
function getCookieValue(kea){
    let name = kea + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return JSON.parse(c.substring(name.length, c.length));
      }
    }
    return null;
}

/*
    CookieBlocker:
    Entfernet alle Tracker und Links zu externen Websites
    (aktuell deaktiviert)
*/
let CookieBlocker = () => {

    //Ist die Url die des Hosts
    function isSameSite(url){
        const site = window.location.origin;
        if (url.startsWith('/') || url.startsWith('./')) {
          return true;
        } else if (url.startsWith('http://') || url.startsWith('https://')) {
          return new URL(url).origin === site; 
        } else {
          return false;
        }
    }

    //Wurde dem Cookie zugestimmt
    function isAllowed(element){
        if(element != null){
            if(element.hasAttribute("cookie_status")){
                return element.getAttribute("cookie_status") == "true";
            }
        }
        return false;
    }

    //Block External Images
    let images = document.querySelectorAll("img")
    Array.from(images).forEach( e => {
        if (!isSameSite(e.src) && !isAllowed(e)){
            e.removeAttribute("src")
        }
    })

    //Block External Scripts
    let scripts = document.querySelectorAll("script")
    Array.from(scripts).forEach( e => {
        if (!isSameSite(e.src) && !isAllowed(e)){
            e.removeAttribute("src")
        }
    })

    //Block External Links
    let links = document.querySelectorAll("link")
    Array.from(links).forEach( e => {
        if (!isSameSite(e.href) && !isAllowed(e)){
            e.parentNode.removeChild(e)
        }
    })

    //Block Iframes
    let iframes = document.querySelectorAll("iframe")
    Array.from(iframes).forEach( e => {
        if (!isSameSite(e.src) && !isAllowed(e)){
            e.removeAttribute("src")
        }
    })

    //Block Embeds
    let embeds = document.querySelectorAll("embed")
    Array.from(embeds).forEach( e => {
        if (!isSameSite(e.src) && !isAllowed(e)){
            e.removeAttribute("src")
        }
    })

    //Block External Links
    let Elinks = document.querySelectorAll("a")
    Array.from(Elinks).forEach( e => {
        if (!isSameSite(e.href) && !isAllowed(e)){
            e.removeAttribute("href")
        }
    })
}

/*
    ConsentFlow
    Diese Function ist für sämtliche Consent Funktion zuständig.
    Sie implentiert die tcfapi, die Funktionalität des Zustimmens und fügt das Consent auf der Website ein
*/
let ConsentFlow = () => {

    let generateDate = "insert_date";
    let consentId = "insert_consent_id"
    let vendors = "insert_vendors"

    let vendorsAllowed = []
    let iabVendorsAllowed = []

    let purposes = {}

    let purposesAllowed = []

    //GVL enthält alle Vendors, die von IAB registriert wurden
    GVL.baseUrl  = "https://static.consentflow.de/"
    let gvl_obj = new GVL();
    let cloed_gvl = gvl_obj.clone();

    //TCModel erstellt den TCString
    let tcModel = new TCModel(gvl_obj);
    tcModel.cmpId = 99;
    tcModel.cmpVersion = 2;
    tcModel.consentScreen = 1;
    tcModel.isServiceSpecific = true;
    tcModel.UseNonStandardStacks = 0;

    //CmpApi implementiert die __tcapi
    const tcfCmpApi = new CmpApi(tcModel.cmpId, tcModel.cmpVersion, tcModel.isServiceSpecific);

    //Wurde GVL geladen wird diese Funktion ausgeführt
    tcModel.gvl.readyPromise.then(() => {    
        let allVendors = tcModel.gvl.getJson().vendors;
        let allePurposes = tcModel.gvl.getJson().purposes;
        purposes = allePurposes

        if(!vendors) vendors = []

        //Legt die Vendors in GVL auf die von uns im Admin Panel definierten fest
        gvl_obj.narrowVendorsTo(getAllVendorsIds())
        
        if(!consentStatus()){
             showBanner();
        }else{
            //Wurde das Consent bereits in der Vergangenheit ausgeführt werden die Einstellungen geladen
            tcfCmpApi.update(getTcString(),false)
            loadPreferences();
            addScripts();
            insertSettingIcon();
        }
    });

    //Erstellen eines TC Strings
    function createTcString(){
        if(tcModel){
            return TCString.encode(tcModel)
        }
    }

    //Erstellt das Cookie Consent und fügt es auf der Website ein
    function showBanner(){
        tcfCmpApi.update("", true);

        let body = document.getElementsByTagName("body")

        let consentText = ''+
           ' <div class="cst_container">'+
                '<div class="cst_banner">'+
                    '<div class="cst_main_container">'+
                        '<div class="cst_head">'+
                           '<img src="%icon%" class="cst_image">'+
                            '<h4 class="cst_headline">%headline%</h4>'+
                        '</div>'+
                        '<div class="cst_body">'+
                            '<p class="cst_text">%info_text%</p>' +                               
                            '<div class="cst_button_wrap">'+
                                '<a class="cst_accept">%accept%</a>'+
                                '<a class="cst_reject">%reject%</a>'+
                                '<a id="cst_settings" class="cst_settings">%settings%</a>'+
                            '</div>'+
                            '<div class="cst_button_wrap">'+
                                '<a class="cst_link">Mehr Infos</a>'+
                                '<a class="cst_link" href="%imprint%">Impressum</a>'+
                                '<a class="cst_link" href="%privacy%">Datenschutz</a>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="cst_settings_container">'+
                        '<div class="cst_head">'+
                            '<h4 class="cst_headline">%settings_headline%</h4>'+
                        '</div>'+
                        '<div class="cst_body">'+
                            '<div class="cst_scroll">%purposes%'+
                                //Purposes
                                '<div class="cst_reason_container">'+
                                    '<div class="cst_reason_info">'+
                                        '<h5 class="cst_reason_h">Erforderlich</h5>'+
                                        '<p class="cst_reason_p">The technical storage or access is strictly necessary for the legitimate purpose of enabling the use of a specific service explicitly requested by the subscriber or user, or for the sole purpose of carrying out the transmission of a communication over an electronic communications network.</p>'+
                                    '</div>'+
                                '</div>'+
                                '<a class="cst_link" id="cst_vendor_settings">%vendor_settings%</a>'+
                            '</div>'+
                            '<div class="cst_button_wrap">'+
                                '<a class="cst_accept">%accept%</a>'+
                                '<a class="cst_reject">%reject%</a>'+
                                '<a id="cst_settings" class="cst_settings cst_save_settings">%save_settings%</a>'+
                            '</div>'+
                            '<div class="cst_button_wrap">'+
                                '<a class="cst_link">Mehr Infos</a>'+
                                '<a class="cst_link" href="%imprint%">Impressum</a>'+
                                '<a class="cst_link" href="%privacy%">Datenschutz</a>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="cst_vendors_container">'+
                        '<div class="cst_head">'+
                            '<h4 class="cst_headline">%vendor_headline%</h4>'+
                        '</div>'+
                        '<div class="cst_body">'+
                            '<div class="cst_scroll">%vendors%'+
                            //Vendors
                                '<a class="cst_link" id="cst_reason_settings">%purpose_settings%</a>'+
                            '</div>'+
                            '<div class="cst_button_wrap">'+
                                '<a class="cst_accept">%accept%</a>'+
                                '<a class="cst_reject">%reject%</a>'+
                                '<a id="cst_settings" class="cst_settings cst_save_settings">%save_settings%</a>'+
                            '</div>'+
                            '<div class="cst_button_wrap">'+
                                '<a class="cst_link">Mehr Infos</a>'+
                                '<a class="cst_link" href="%imprint%">Impressum</a>'+
                                '<a class="cst_link" href="%privacy%">Datenschutz</a>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';

        let purposeText = "";

        for (const [key, value] of Object.entries(purposes)) {
            purposeText = purposeText + '<div class="cst_reason_container">'+
                '<div class="cst_reason_info">'+
                    '<h5 class="cst_reason_h">'+value.name+'</h5>'+
                    '<p class="cst_reason_p">'+value.description+'</p>'+
                '</div>'+
                '<div class="cst_reason_consent_container">'+
                    '<label class="cst_reason_consent_switch">'+
                        '<input type="checkbox" class="cst_reason_consent_checkbox" value_id="'+value.id+' purpose">'+
                        '<span class="cst_reason_consent_slider"></span>'+
                    '</label>'+
                '</div>'+
            '</div>';
        }

        consentText = consentText.replace("%purposes%", purposeText);

        let vendorsText = "";

        if(vendors){
            for (const value of vendors) {
                vendorsText = vendorsText +
                    '<div class="cst_reason_container">'+
                        '<div class="cst_reason_info">'+
                            '<h5 class="cst_reason_h">'+value.name+'</h5>'+
                            '<p class="cst_reason_p"><b>Privacy Policy:</b> '+value.policyUrl+'<p>'+
                            '<p class="cst_reason_p"><b>Ablaufdatum:</b> '+Math.round(value.cookieMaxAgeSeconds / (60*60*24))+'d<p>'+
                            '<p class="cst_reason_p"><b>Zwecke:</b> '+getPurposenames(value.purposes)+'<p>'+
                        '</div>'+
                        '<div class="cst_reason_consent_container">'+
                            '<label class="cst_reason_consent_switch">'+
                                '<input type="checkbox" class="cst_reason_consent_checkbox" value_id="'+value.id+' vendor">'+
                                '<span class="cst_reason_consent_slider"></span>'+
                            '</label>'+
                        '</div>'+
                    '</div>';
            }
        }

        consentText = consentText.replace("%vendors%", vendorsText);

        if(body.length >= 1){
            insertCssClasses();
            body[0].innerHTML = consentText + body[0].innerHTML;
            addEventListeners();
        }
    }

    //Erstellen der CSS Klassen und anschließend einfügen der CSS Klassen im Website head
    function insertCssClasses(){
        let cssText = `
        :root {
            --cst_banner_width: %banner_width%px;
            --cst_banner_background: %banner_background%;
            --cst_banner_overlap_color: rgb(0, 0, 0, 0.2);
            --cst_banner_border_radius: %banner_border_radius%px;
            --cst_banner_border_color: transparent;
            --cst_banner_border_width:  0px;
            --cst_banner_border_sytle:  solid;
            --cst_banner_position_left: %postion_left%;
            --cst_banner_position_top: %postion_top%;
            --cst_headline_size: %headline_size%px;
            --cst_headline_color: %headline_color%;
            --cst_headline2_size: %paragraph_size%px;
            --cst_headline2_color: %paragraph_color%;
            --cst_paragraph_size: %paragraph_size%px;
            --cst_paragraph_color: %paragraph_color%;
            --cst_accept_button_backround_color: %accept_background_color%;
            --cst_accept_button_border_color: %accept_border_color%;
            --cst_accept_button_color: %accept_color%;
            --cst_accept_button_font_size: 18px;
            --cst_accept_button_font_weight: bold;
            --cst_accept_button_width: 25%;
            --cst_accept_border_radius: %accept_border_radius%px;
            --cst_accept_border_width: %accept_border_width%px;
            --cst_reject_button_backround_color: %reject_background_color%;
            --cst_reject_button_border_color: %reject_border_color%;
            --cst_reject_button_color: %reject_color%;
            --cst_reject_button_font_size: 18px;
            --cst_reject_button_font_weight: normal;
            --cst_reject_button_width: 25%;
            --cst_reject_border_radius: %reject_border_radius%px;
            --cst_reject_border_width: %reject_border_width%px;
            --cst_settings_button_backround_color: %settings_background_color%;
            --cst_settings_button_border_color: %settings_border_color%;
            --cst_settings_button_color:  %settings_color%;
            --cst_settings_button_font_size: 18px;
            --cst_setttings_button_font_weight: normal;
            --cst_settings_button_width: 25%;
            --cst_settings_border_radius: %settings_border_radius%px;
            --cst_settings_border_width: %settings_border_width%px;
            --cst_link_color: %link_color%;
            --cst_link_font_size: %link_font_size%px;
            --cst_link_decoration: underline;
        }
        
        .cst_container{
            margin: 0;
            padding: 0;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            position: fixed;
            background-color: var(--cst_banner_overlap_color);
            z-index: 999;
        }

        .cst_cookie_settings_container{
            
        }
        
        .cst_cookie_settings_container .cst_cookie_settings{
            position: absolute;
            width: 50px;
            height: 50px;
            max-width: 10%;
            border-radius: 100px;
            background-color: var(--cst_accept_button_backround_color);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            left: 3%;
            bottom: 50px;
        }
        
        .cst_cookie_settings_container .cst_cookie_settings svg{
            height: 50%;
            color: var(--cst_accept_button_color);
        }
        
        .cst_container .cst_banner{
            background-color: var(--cst_banner_background);
            border-radius: var(--cst_banner_border_radius);
            max-height: 90%;
            overflow: scroll;
            padding: 35px;
            max-width: 90%;
            width: var(--cst_banner_width);
            position: fixed;
            left: var(--cst_banner_position_left);
            top: var(--cst_banner_position_top);
            transform: translateX(-50%) translateY(-50%);
            display: block;
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        .cst_banner::-webkit-scrollbar {
            display: none;
          }
        
        .cst_container .cst_banner .cst_main_container{
            display: block;
        }
        
        .cst_container .cst_banner .cst_settings_container{
            display: none;
        }
        
        .cst_container .cst_banner .cst_vendors_container{
            display: none;
        }
        
        .cst_container .cst_banner .cst_head{
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .cst_container .cst_banner .cst_head .cst_image{
            max-width: 20%;
        }
        
        .cst_container .cst_banner .cst_head .cst_headline{
            font-weight: bold;
            font-size: var(--cst_headline_size);
            margin: 0px;
            margin-top: 10px;
            color: var(--cst_headline_color);
        }
        
        .cst_container .cst_banner .cst_body {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .cst_container .cst_banner .cst_body .cst_text{
            font-weight: normal;
            font-size: var(--cst_paragraph_size);
            margin: 10px;
            color: var(--cst_paragraph_color);
        }
        
        .cst_container .cst_banner .cst_body .cst_button_wrap{
            display: flex;
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
            width: 100%;
            cursor: pointer;
        }
        
        .cst_container .cst_banner .cst_body .cst_button_wrap .cst_reject{
            min-width: var(--cst_reject_button_width);
            padding: 10px;
            text-align: center;
            margin: 5px;
            background-color: var(--cst_reject_button_backround_color);
            color: var(--cst_reject_button_color);
            font-weight: normal;
            font-size: var(--cst_reject_button_font_size);
            border-radius: var(--cst_reject_border_radius);
            border-color: var(--cst_reject_button_border_color);
            border-width: var(--cst_reject_border_width);
            border-style: solid;
            cursor: pointer;
            text-decoration: none;
        }
        
        .cst_container .cst_banner .cst_body .cst_button_wrap .cst_settings{
            min-width: var(--cst_setting_button_width);
            padding: 10px;
            text-align: center;
            margin: 5px;
            background-color: var(--cst_settings_button_backround_color);
            color: var(--cst_settings_button_color);
            font-weight: normal;
            font-size: var(--cst_settings_button_font_size);
            border-radius: var(--cst_settings_border_radius);
            border-color: var(--cst_settings_button_border_color);
            border-width: var(--cst_settings_border_width);
            border-style: solid;
            text-decoration: none;
            cursor: pointer;
        }
        
        .cst_container .cst_banner .cst_body .cst_button_wrap .cst_accept{
            min-width: var(--cst_accept_button_width);
            padding: 10px;
            text-align: center;
            margin: 5px;
            background-color: var(--cst_accept_button_backround_color);
            color: var(--cst_accept_button_color);
            font-weight: normal;
            font-size: var(--cst_accept_button_font_size);
            border-radius: var(--cst_accept_border_radius);
            border-color: var(--cst_accept_button_border_color);
            border-width: var(--cst_accept_border_width);
            border-style: solid;
            text-decoration: none;
            cursor: pointer;
        }
        
        .cst_container .cst_banner .cst_body .cst_button_wrap .cst_link{
            text-decoration: underline;
            margin: 5px;
            font-size: 16px;
        }
        
        .cst_container .cst_banner .cst_body .cst_scroll{
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 400px;
            max-height: 60%;
            overflow: scroll;
            padding-bottom: 20px;
        }
        
        .cst_container .cst_banner .cst_body .cst_reason_h{
            font-weight: bold;
            font-size: var(--cst_headline2_size);
            margin: 5px;
            color: var(--cst_headline2_color);
        }
        
        .cst_container .cst_banner .cst_body .cst_reason_p{
            font-weight: normal;
            font-size: var(--cst_paragraph_size);
            margin: 5px;
            color: var(--cst_paragraph_color);
        }
        
        .cst_container .cst_banner .cst_body .cst_reason_table{
            margin: 5px;
            width:90%;
            padding: 10px
        }
        
        .cst_container .cst_banner .cst_body .cst_reason_table td, th, tr, table{
            border-width: 1px;
            border-color: rgb(0, 0, 0, 0.5);
            border-style: solid;
            border-collapse: collapse;
            margin: 0;
        }
        
        .cst_container .cst_banner .cst_body .cst_reason_table th{
            padding: 4px;
            text-align: start;
            font-size: 16px;
            font-weight: bold;
            color: rgb(0, 0, 0);
            background-color: rgb(0, 0, 0, 0.1);
        }
        
        .cst_container .cst_banner .cst_body .cst_reason_table td{
            padding: 4px;
            text-align: start;
            font-size: 14px;
            font-weight: normal;
            color: rgb(0, 0, 0);
        }
        
        .cst_container .cst_banner .cst_body .cst_link{
            text-decoration: var(--cst_link_decoration);
            margin: 5px;
            font-size: var(--cst_link_font_size);
            color: var(--cst_link_color);
        }
        
        .cst_reason_consent_switch {
            margin: 5px;
            position: relative;
            display: inline-block;
            width: 45px;
            height: 26px;
          }
          
         .cst_reason_consent_checkbox {
            opacity: 0;
            width: 0;
            height: 0;
          }
          
          .cst_reason_consent_slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: .4s;
            transition: .4s;
          }
          
          .cst_reason_consent_slider:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            left: 4px;
            bottom: 3px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
          }
          
          .cst_reason_consent_checkbox:checked + .cst_reason_consent_slider {
            background-color: #2196F3;
          }
          
          .cst_reason_consent_checkbox:focus + .cst_reason_consent_slider {
            box-shadow: 0 0 1px #2196F3;
          }
          
          .cst_reason_consent_checkbox:checked + .cst_reason_consent_slider:before {
            -webkit-transform: translateX(17px);
            -ms-transform: translateX(17px);
            transform: translateX(17px);
          }        
        `

        let style = document.createElement('style');
        style.textContent = cssText
        style.name = "ConsentFlowStyles"
        let head = document.head || document.getElementsByTagName('head')[0];
        head.appendChild(style);
    }

    //Fügt am Bottom der Website ein Icon ein, mit welchem die Zustimmung erneut aufgerufen werden kann
    function insertSettingIcon(){
        const consentText = document.createElement('div');
        consentText.classList.add('cst_cookie_settings_container');
        consentText.innerHTML = `
            <a class="cst_cookie_settings">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shield-fill-check" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793z"/>
                </svg>
            </a>`;

        const body = document.querySelector('body');

        if (body) {
            body.insertBefore(consentText, body.firstChild);
            insertCssClasses();
             const openConsentSettings = document.querySelector('.cst_cookie_settings');
            if (openConsentSettings) {
                openConsentSettings.addEventListener('click', showBanner);
            }
        }
    }

    //Nach der Zustimmung wird der Banner entfernt
    function hideBanner(){
        let cookiebanners = document.getElementsByClassName("cst_container")
        Array.from(cookiebanners).forEach( e => e.remove());
        insertSettingIcon();

    }

    //Für das Consent werden alle Purposes benötigt. Übergeben wird ein Array mit den Ids der Purposes und zurückgegeben wird ein String welcher alle Namen der Purposes enthält
    function getPurposenames(inputPurpose){
        let purposeString = "";
        inputPurpose.forEach(p => {
            for (const [key, value] of Object.entries(purposes)) {
                if(p == value.id){
                    purposeString = purposeString + value.name+ "; ";
                }
            }
        })

        return purposeString;
    }

    //Gibt alle Ids der Vendors zurück
    function getAllVendorsIds(){
        let iabvendorids = vendors.filter((item) => item.iab_id !== null).map((item) => parseInt(item.iab_id));
        if(iabvendorids==null) iabvendorids = []
        return iabvendorids
    }

    //Allen Cookies zustimmen
    function acceptAll(){
        for (const [key, value] of Object.entries(purposes)) {
            if(!purposesAllowed.includes(value.id)){
                purposesAllowed.push(value.id)
            }
        }
        
        vendorsAllowed = []
        vendors.forEach(function(v) {
            vendorsAllowed.push(v.id);
        });

        tcModel.vendorConsents.set(getAllVendorsIds());        
        tcModel.purposeConsents.set(purposesAllowed);

        let newTcString = createTcString()
        tcfCmpApi.update(newTcString, false)

        setCookieValue('cf_tcf_string', newTcString)
        setCookieValue("cst_consent", {allowedPurposes: purposesAllowed, allowedVendors: vendorsAllowed})

        addScripts();
        hideBanner();
        insertSettingIcon();
        send_analytics(1)
    }

    //Alle Cookies ablehnen
    function rejectAll(){
        purposesAllowed = []
        vendorsAllowed = []

        tcModel.vendorConsents.empty();        
        tcModel.purposeConsents.empty();

        let newTcString = createTcString()
        tcfCmpApi.update(newTcString, false)

        setCookieValue('cf_tcf_string', newTcString)
        setCookieValue("cst_consent", {allowedPurposes: purposesAllowed, allowedVendors: vendorsAllowed})
        
        addScripts();
        hideBanner();
        insertSettingIcon();
        send_analytics(0)
    }

    //Wird der Switch einer Präferenz betätigt wird diese Funktion getriggert
    function togglePreference(value_type, value_number){
        if(value_type.toLowerCase() == "vendor"){
            if(!vendorsAllowed.includes(parseInt(value_number))){
                vendorsAllowed.push(parseInt(value_number))
            }
        }else if(value_type.toLowerCase() == "purpose"){
            if(!purposesAllowed.includes(parseInt(value_number))){
                purposesAllowed.push(parseInt(value_number))
            }
        }
    }


    //Speichert die Präferenzen des Users
    function saveSettings(){
        let iabvendorids = vendors.filter((item) => item.iab_id !== null && vendorsAllowed.includes(item.iab_id)).map((item) => item.iab_id);

        tcModel.vendorConsents.set(iabvendorids);        
        tcModel.purposeConsents.set(purposesAllowed);

        let newTcString = createTcString()
        tcfCmpApi.update(newTcString, false)

        setCookieValue('cf_tcf_string', newTcString)
        setCookieValue("cst_consent", {allowedPurposes: purposesAllowed, allowedVendors: vendorsAllowed})
        
        addScripts();
        hideBanner();
        send_analytics(3)
    }

    //Wurde das Cookie bereits ausgeführt
    function consentStatus(){
        let consent_string = getCookieValue("cst_consent");

        if(!consent_string || !consent_string.createDate){
            return false;
        }
        if(consent_string.createDate > generateDate){
            return true;
        }
    }

    //Läd bereits gespeicherte Präferenzen aus dem Consent Cookie und läd diese
    function loadPreferences(){
        let consent_string = getCookieValue("cst_consent");

        if(consent_string.allowedPurposes){
            purposesAllowed = consent_string.allowedPurposes
        }

        if(consent_string.allowedVendors){
            vendorsAllowed = consent_string.allowedVendors

            let iabs_allowed = []
            vendorsAllowed.forEach( v => {
                let vendor_obj = vendors.filter(ven => ven.id != null && ven.id === v )
                if(vendor_obj != null && vendor_obj[0] != null && vendor_obj[0].iab_id) iabs_allowed.push(parseInt(vendor_obj[0].iab_id))
            })

            tcModel.vendorConsents.set(iabs_allowed);        
            tcModel.purposeConsents.set(purposesAllowed);

            let newTcString = createTcString()
            tcfCmpApi.update(newTcString, false)
        }
    }

    //Gibt den im Cookie stehenden TC String zurück
    function getTcString(){
        let tcfstring = getCookieValue("cf_tcf_string");

        if(tcfstring) return tcfstring;

        showBanner();
        return ""
    }

    //Fügt alle Scripts der Cookies hinzu
    function addScripts() {
        vendorsAllowed.forEach(id => {
            const vendor_obj = vendors.find(v => v.id == id);
    
            if (vendor_obj && vendor_obj.script) {
                console.log(vendor_obj.script)
                const scriptElement = document.createElement('script');
                scriptElement.textContent = vendor_obj.script;
                document.head.appendChild(scriptElement);
            }
        });
    }
    
    //Schickt Analyse Daten an das Admin Panel
    let analyticsURL = "https://consentflow.de/api/consents_api"
    function send_analytics(status){
        fetch(analyticsURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({consent_id: consentId, accept_value: status})
        }).then((res)=>{

        })
    }

    function addEventListeners(){
        //Initalisierung der Alle Akzeptieren Buttons
        let acceptAllButtons = document.getElementsByClassName("cst_accept");
        Array.from(acceptAllButtons).forEach(e => {
            e.addEventListener("click", () => {
                acceptAll()
            })
        })

        //Initalisierung der Ablehnen Buttons
        let rejectAllButtons = document.getElementsByClassName("cst_reject");
        Array.from(rejectAllButtons).forEach(e => {
            e.addEventListener("click", () => {
                rejectAll()
            })
        })

        //Initalisierung der Speichern Buttons
        let saveSettingsAllButtons = document.getElementsByClassName("cst_save_settings");
        Array.from(saveSettingsAllButtons).forEach(e => {
            e.addEventListener("click", () => {
                saveSettings();
            })
        })

        //Settings Button deaktiviert die Main Page und Zeigt die Zwecke Page
        let settingsButton = document.getElementById("cst_settings");
        settingsButton.addEventListener("click", () => {
            let mainContainer = document.getElementsByClassName("cst_main_container");
            Array.from(mainContainer).forEach(e => {
                e.style.display = "none"
            })
            let settingsContainer = document.getElementsByClassName("cst_settings_container");
            Array.from(settingsContainer).forEach(e => {
                e.style.display = "block"
            })
        })

        //Anbieter verwalten Button deaktiviert die Zwecke Page und Zeigt die Vendors Page
        let vendorSettingsButton = document.getElementById("cst_vendor_settings");
        vendorSettingsButton.addEventListener("click", () => {
            let settingsContainer = document.getElementsByClassName("cst_settings_container");
            Array.from(settingsContainer).forEach(e => {
                e.style.display = "none"
            })
            let vendorContainer = document.getElementsByClassName("cst_vendors_container");
            Array.from(vendorContainer).forEach(e => {
                e.style.display = "block"
            })
        })

        //Zwecke verwalten Button deaktiviert die Vendors Page und Zeigt die Zwecke Page
        let reasonSettingsButton = document.getElementById("cst_reason_settings");
        reasonSettingsButton.addEventListener("click", () => {
            let vendorContainer = document.getElementsByClassName("cst_vendors_container");
            Array.from(vendorContainer).forEach(e => {
                e.style.display = "none"
            })
            let settingsContainer = document.getElementsByClassName("cst_settings_container");
            Array.from(settingsContainer).forEach(e => {
                e.style.display = "block"
            })
        })

        let openConsentSettings = document.getElementsByClassName("cst_cookie_settings")
        Array.from(openConsentSettings).forEach(e => {
            e.addEventListener("click", () => {
                showBanner();
            })
        })
        
        let consentCheckBoxInput = document.getElementsByClassName("cst_reason_consent_checkbox");
        Array.from(consentCheckBoxInput).forEach(e => {
            e.addEventListener("input", (i) => {
                let value_id = i.target.getAttribute("value_id");
                if(value_id){
                    let value_type = value_id.split(" ")[1];
                    let value_number = value_id.split(" ")[0];

                    togglePreference(value_type, value_number);
                }
            })
        })
    }
}

document.addEventListener('readystatechange', event => {  
    if (event.target.readyState === "interactive") {
        //let blocker = CookieBlocker();
    }   
    //Wurde die Website geladen wird das Consent eingefügt
    if (event.target.readyState === "complete") {
        let consent = ConsentFlow();
    }
});