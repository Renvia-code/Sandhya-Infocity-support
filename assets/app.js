/* ==========================================================================
   Sandhya Infocity — Campus Access
   Shared behaviour for index.html and walk.html.

   TO UPDATE GATE STATUS: edit the three gate blocks in index.html
   (the .pill class, the .board-dot / .board-state classes, and the
   data-i18n key on the description). Nothing here needs changing.

   TO RETIRE THE EVENT CARD: it hides itself automatically after
   EVENT_ENDS below. Delete the <a class="event"> block when done.
   ========================================================================== */
(function () {
    'use strict';

    /* Event auto-expiry: the walking-track card disappears after this date. */
    var EVENT_ENDS = '2026-08-12T00:00:00+05:30';

    /* ---------------------------------------------------------------------
       Documents available in the viewer.
       width = natural pixel width of the full-size page images (zoom target).
       --------------------------------------------------------------------- */
    var DOCS = {
        guide: {
            titleKey: 'doc-guide-title',
            pdf: 'docs/SIL-Pedestrian-and-Back-Entrance-Guide.pdf',
            width: 1800,
            pages: [
                'assets/guide/01.webp', 'assets/guide/02.webp', 'assets/guide/03.webp',
                'assets/guide/04.webp', 'assets/guide/05.webp', 'assets/guide/06.webp',
                'assets/guide/07.webp'
            ],
            thumbs: [
                'assets/guide/01-thumb.webp', 'assets/guide/02-thumb.webp', 'assets/guide/03-thumb.webp',
                'assets/guide/04-thumb.webp', 'assets/guide/05-thumb.webp', 'assets/guide/06-thumb.webp',
                'assets/guide/07-thumb.webp'
            ]
        },
        route: {
            titleKey: 'doc-route-title',
            pdf: 'docs/SIL-HCL50-Moon-Walk-Route-Map-Aug2026.pdf',
            width: 1664,
            pages: ['assets/route/route-map.webp'],
            thumbs: []
        }
    };

    /* ---------------------------------------------------------------------
       Strings
       --------------------------------------------------------------------- */
    var STRINGS = {
        en: {
            'skip': 'Skip to content',

            'nav-gates': 'Gates',
            'nav-walk': 'Walking track',
            'nav-guides': 'Guides',
            'nav-contacts': 'Contacts',
            'nav-route': 'Route',
            'nav-safety': 'On the route',
            'nav-help': 'Help',

            'hero-eyebrow': 'Navalur · Chennai',
            'hero-title': 'Campus Access Guide',
            'hero-sub': 'Find the right gate and read the walking guides before you arrive.',
            /* restore this one when the contacts section comes back */
            'hero-sub-with-contacts': 'Find the right gate, read the walking guides and reach the right person.',
            'hero-alt': 'The Sandhya Infocity main gate on Rajiv Gandhi Salai',

            'state-open': 'Open',
            'state-closed': 'Closed',

            'event-eyebrow': 'This week on campus',
            'event-title': 'HCL 50 walking track',
            'event-desc': 'A 2 km walking route runs across the campus during the HCL 50 celebration week. Route map, what to expect on the way, and emergency numbers.',
            'event-when': '5 to 11 August 2026',
            'event-cta': 'Open the route guide',

            'sec-gates-eyebrow': 'Entrances',
            'sec-gates-title': 'Which gate to use',
            'arrive-all': 'All',
            'arrive-car': 'Car',
            'arrive-bike': 'Bike',
            'arrive-ped': 'On foot',
            'arrive-vendors': 'Vendors',

            'status-open': 'Open now',
            'status-openq': 'Open',
            'status-closed': 'Closed',
            'directions': 'Directions',

            'gate-main': 'Main Gate',
            'gate-main-desc': 'The signed entrance on Rajiv Gandhi Salai. Use this unless you have been told otherwise.',
            'gate-main-alt': 'Sandhya Infocity main gate, open',
            'gate-back2': 'Back Entrance 2',
            'gate-back2-desc': 'Lane past the main gate, near Geetham Restaurant.',
            'gate-back2-alt': 'Back Entrance 2, on the lane near Geetham Restaurant',
            'gate-back1': 'Back Entrance 1',
            'gate-back1-desc': 'Closed while the new paver road is laid.',
            'gate-back1-alt': 'Back Entrance 1, closed for paver work',
            'gate-back1-alt2': 'Please use the Main Gate or Back Entrance 2.',

            'sec-guides-eyebrow': 'Documents',
            'sec-guides-title': 'Guides you can view or download',
            'sec-guides-desc': 'Open a guide to read it here, or download the PDF to keep on your phone.',
            'doc-guide-title': 'Pedestrian and Back Entrance Guide',
            'doc-guide-meta': '7 pages · PDF',
            'doc-route-title': 'HCL 50 walking track route map',
            'doc-route-desc': 'The approved 2 km route across the campus, with the blocks, the podium and the substation area marked.',
            'doc-route-meta': '1 page · PDF',
            'view': 'View',
            'download': 'Download PDF',
            'tap-zoom': 'Tap to open',

            'sec-qr-eyebrow': 'Share',
            'sec-qr-title': 'QR codes',
            'sec-qr-desc': 'Point a camera at one of these, or download it to put on a notice board, a standee or anything you print.',
            'qr-campus': 'Campus access guide',
            'qr-walk': 'Walking track',
            'qr-campus-alt': 'QR code for the campus access guide',
            'qr-walk-alt': 'QR code for the walking track page',

            /* --- reserved for the contacts section (disabled 3 Aug 2026) --- */
            'sec-help-eyebrow': 'Contacts',
            'sec-help-title': 'Who to call',
            'sec-help-desc': 'Our team answers in English, Tamil and Hindi. The helpdesk is available around the clock.',
            'role-asst': 'Assistant Manager',
            'role-property': 'Jr. Property Manager',
            'role-facilities': 'Jr. Facilities Manager',
            'role-security': 'Sr. Security Manager',
            'role-helpdesk': '24/7 Helpdesk',
            'call': 'Call',

            'notice-eyebrow': 'A note from Facility Management',
            'notice-p1': 'The Main Gate is open. Back Entrance 1 is closed while we lay the new paver road and will reopen shortly.',
            'notice-p2': 'Please use the Main Gate or Back Entrance 2 in the meantime. Thank you for your patience.',
            'notice-sign': 'Facility Management · Sandhya Infocity',

            'footer-legal': 'A notified Special Economic Zone for IT and ITeS. 33, Rajiv Gandhi Salai (OMR), Navalur, Chennai 600130, Tamil Nadu.',

            /* Walk page */
            'walk-eyebrow': 'HCL 50 celebrations',
            'walk-title': 'The walking track',
            'walk-sub': 'A 2 km route across the Sandhya Infocity campus, agreed with the HCL Global Workspace Solutions team.',
            'walk-back': 'Back to the campus access guide',

            'sec-route-eyebrow': 'The route',
            'sec-route-title': 'Where the track runs',
            'sec-route-desc': 'One loop around the campus, past Block 1, the podium, Block 4, the MLCP and back. Tap the map to zoom in.',
            'fact-distance': 'Distance',
            'fact-distance-v': 'About 2 km',
            'fact-distance-s': 'One full loop',
            'fact-dates': 'Dates',
            'fact-dates-v': '5 to 11 Aug',
            'fact-dates-s': '2026, celebration week',
            'fact-route': 'Route',
            'fact-route-v': 'Campus loop',
            'fact-route-s': 'Marked with rope barricades',

            'sec-safety-eyebrow': 'Before you set off',
            'sec-safety-title': 'On the route',
            'sec-safety-desc': 'The campus keeps working while the walk is on. These few things keep everybody safe.',
            'rule-1': 'Follow the rope line. It marks the approved route from start to finish.',
            'rule-2': 'Do not enter the 110 kV substation area or any electrical yard. Follow the marshals where the route passes them.',
            'rule-3': 'Give way to vehicles. The internal roads stay in use during the walk.',
            'rule-4': 'The Thalambur road back gate stays closed while the walk is on. Enter and leave by the Main Gate.',
            'rule-5': 'Stay off ramps, basements and service yards. They are not part of the route.',
            'rule-6': 'Tell a marshal or the nearest security guard if you see a hazard, a dark stretch or anything unsafe.',

            'sos-eyebrow': 'If something goes wrong',
            'sos-title': 'Emergency numbers',
            'sos-desc': 'Save these before you start. Site security is on the route through the day and can reach first aid.',
            'sos-security': 'Site security',
            'sos-helpdesk': 'Helpdesk 24/7',   /* parked - tile removed 03-Aug-2026 */
            'sos-ambulance': 'Ambulance',
            'sos-emergency': 'All emergencies',
            'route-alt': 'Approved walking track route across the Sandhya Infocity campus',

            /* Viewer */
            'viewer-close': 'Close',
            'viewer-prev': 'Previous page',
            'viewer-next': 'Next page'
        },

        ta: {
            'skip': 'உள்ளடக்கத்திற்குச் செல்க',

            'nav-gates': 'வாயில்கள்',
            'nav-walk': 'நடைப்பயணம்',
            'nav-guides': 'ஆவணங்கள்',
            'nav-contacts': 'தொடர்பு',
            'nav-route': 'வழித்தடம்',
            'nav-safety': 'வழியில்',
            'nav-help': 'உதவி',

            'hero-eyebrow': 'நாவலூர் · சென்னை',
            'hero-title': 'வளாக அணுகல் வழிகாட்டி',
            'hero-sub': 'வருகைக்கு முன் சரியான வாயிலைத் தேர்ந்தெடுத்து, நடைவழி வழிகாட்டிகளைப் படியுங்கள்.',
            'hero-sub-with-contacts': 'சரியான வாயிலைத் தேர்ந்தெடுங்கள், நடைவழி வழிகாட்டிகளைப் படியுங்கள், சரியான நபரைத் தொடர்பு கொள்ளுங்கள்.',
            'hero-alt': 'ராஜீவ் காந்தி சாலையில் உள்ள சந்தியா இன்ஃபோசிட்டி முதன்மை வாயில்',

            'state-open': 'திறந்துள்ளது',
            'state-closed': 'மூடப்பட்டுள்ளது',

            'event-eyebrow': 'இந்த வாரம் வளாகத்தில்',
            'event-title': 'HCL 50 நடைப்பயணப் பாதை',
            'event-desc': 'HCL 50 கொண்டாட்ட வாரத்தில் வளாகம் முழுவதும் 2 கி.மீ நடைவழி அமைக்கப்படுகிறது. வழி வரைபடம், வழியில் கவனிக்க வேண்டியவை, அவசர எண்கள்.',
            'event-when': '5 முதல் 11 ஆகஸ்ட் 2026',
            'event-cta': 'வழிகாட்டியைத் திறக்கவும்',

            'sec-gates-eyebrow': 'நுழைவாயில்கள்',
            'sec-gates-title': 'எந்த வாயிலைப் பயன்படுத்துவது',
            'arrive-all': 'அனைத்தும்',
            'arrive-car': 'கார்',
            'arrive-bike': 'இருசக்கர வாகனம்',
            'arrive-ped': 'நடந்து',
            'arrive-vendors': 'வழங்குநர்கள்',

            'status-open': 'இப்போது திறந்துள்ளது',
            'status-openq': 'திறந்துள்ளது',
            'status-closed': 'மூடப்பட்டுள்ளது',
            'directions': 'வழிகாட்டுதல்',

            'gate-main': 'முதன்மை வாயில்',
            'gate-main-desc': 'ராஜீவ் காந்தி சாலையில் உள்ள பெயர்ப்பலகை கொண்ட நுழைவாயில். வேறு அறிவுறுத்தல் இல்லாதவரை இதைப் பயன்படுத்தவும்.',
            'gate-main-alt': 'சந்தியா இன்ஃபோசிட்டி முதன்மை வாயில், திறந்துள்ளது',
            'gate-back2': 'பின் நுழைவு 2',
            'gate-back2-desc': 'முதன்மை வாயிலைக் கடந்து செல்லும் பாதை, Geetham Restaurant அருகில்.',
            'gate-back2-alt': 'பின் நுழைவு 2, Geetham Restaurant அருகில் உள்ள பாதை',
            'gate-back1': 'பின் நுழைவு 1',
            'gate-back1-desc': 'புதிய பேவர் சாலை அமைக்கப்படுவதால் மூடப்பட்டுள்ளது.',
            'gate-back1-alt': 'பின் நுழைவு 1, பேவர் பணிக்காக மூடப்பட்டுள்ளது',
            'gate-back1-alt2': 'முதன்மை வாயில் அல்லது பின் நுழைவு 2 ஐப் பயன்படுத்தவும்.',

            'sec-guides-eyebrow': 'ஆவணங்கள்',
            'sec-guides-title': 'பார்க்கவும் பதிவிறக்கவும் கூடிய வழிகாட்டிகள்',
            'sec-guides-desc': 'இங்கேயே படிக்க வழிகாட்டியைத் திறக்கவும், அல்லது PDF-ஐ உங்கள் தொலைபேசியில் பதிவிறக்கவும்.',
            'doc-guide-title': 'நடைபயணி மற்றும் பின் நுழைவு வழிகாட்டி',
            'doc-guide-meta': '7 பக்கங்கள் · PDF',
            'doc-route-title': 'HCL 50 நடைப்பயண வழி வரைபடம்',
            'doc-route-desc': 'வளாகம் முழுவதும் அங்கீகரிக்கப்பட்ட 2 கி.மீ வழி; பிளாக்குகள், போடியம் மற்றும் மின்நிலையப் பகுதி குறிக்கப்பட்டுள்ளது.',
            'doc-route-meta': '1 பக்கம் · PDF',
            'view': 'பார்க்க',
            'download': 'பதிவிறக்கு',
            'tap-zoom': 'திறக்கத் தட்டவும்',

            'sec-qr-eyebrow': 'பகிர',
            'sec-qr-title': 'QR குறியீடுகள்',
            'sec-qr-desc': 'கேமராவை இதன் மீது காட்டவும், அல்லது அறிவிப்புப் பலகை மற்றும் அச்சுப் பயன்பாட்டுக்குப் பதிவிறக்கவும்.',
            'qr-campus': 'வளாக அணுகல் வழிகாட்டி',
            'qr-walk': 'நடைப்பயணப் பாதை',
            'qr-campus-alt': 'வளாக அணுகல் வழிகாட்டிக்கான QR குறியீடு',
            'qr-walk-alt': 'நடைப்பயணப் பாதைப் பக்கத்திற்கான QR குறியீடு',

            /* --- reserved for the contacts section (disabled 3 Aug 2026) --- */
            'sec-help-eyebrow': 'தொடர்பு',
            'sec-help-title': 'யாரை அழைப்பது',
            'sec-help-desc': 'எங்கள் குழு ஆங்கிலம், தமிழ் மற்றும் இந்தியில் பதிலளிக்கும். உதவி மையம் இரவு பகல் செயல்படுகிறது.',
            'role-asst': 'உதவி மேலாளர்',
            'role-property': 'இளநிலை சொத்து மேலாளர்',
            'role-facilities': 'இளநிலை வசதி மேலாளர்',
            'role-security': 'மூத்த பாதுகாப்பு மேலாளர்',
            'role-helpdesk': '24/7 உதவி மையம்',
            'call': 'அழை',

            'notice-eyebrow': 'வசதி மேலாண்மையின் குறிப்பு',
            'notice-p1': 'முதன்மை வாயில் திறந்துள்ளது. புதிய பேவர் சாலை அமைக்கும் வரை பின் நுழைவு 1 மூடப்பட்டுள்ளது; விரைவில் மீண்டும் திறக்கப்படும்.',
            'notice-p2': 'அதுவரை முதன்மை வாயில் அல்லது பின் நுழைவு 2 ஐப் பயன்படுத்தவும். உங்கள் பொறுமைக்கு நன்றி.',
            'notice-sign': 'வசதி மேலாண்மை · சந்தியா இன்ஃபோசிட்டி',

            'footer-legal': 'தகவல் தொழில்நுட்பம் மற்றும் ITeS-க்கான அறிவிக்கப்பட்ட சிறப்புப் பொருளாதார மண்டலம். 33, ராஜீவ் காந்தி சாலை (OMR), நாவலூர், சென்னை 600130, தமிழ்நாடு.',

            /* Walk page */
            'walk-eyebrow': 'HCL 50 கொண்டாட்டங்கள்',
            'walk-title': 'நடைப்பயணப் பாதை',
            'walk-sub': 'HCL Global Workspace Solutions குழுவுடன் இணைந்து ஒப்புக்கொள்ளப்பட்ட, சந்தியா இன்ஃபோசிட்டி வளாகத்தில் 2 கி.மீ வழி.',
            'walk-back': 'வளாக அணுகல் வழிகாட்டிக்குத் திரும்பு',

            'sec-route-eyebrow': 'வழித்தடம்',
            'sec-route-title': 'வழித்தடம் எங்கே செல்கிறது',
            'sec-route-desc': 'பிளாக் 1, போடியம், பிளாக் 4, MLCP வழியாக வளாகத்தைச் சுற்றி ஒரு முழு வட்டம். பெரிதாக்க வரைபடத்தைத் தட்டவும்.',
            'fact-distance': 'தூரம்',
            'fact-distance-v': 'சுமார் 2 கி.மீ',
            'fact-distance-s': 'ஒரு முழு வட்டம்',
            'fact-dates': 'தேதிகள்',
            'fact-dates-v': '5 – 11 ஆகஸ்ட்',
            'fact-dates-s': '2026, கொண்டாட்ட வாரம்',
            'fact-route': 'பாதை',
            'fact-route-v': 'வளாக வட்டம்',
            'fact-route-s': 'கயிற்றுத் தடுப்புகளால் குறிக்கப்பட்டது',

            'sec-safety-eyebrow': 'புறப்படும் முன்',
            'sec-safety-title': 'வழியில்',
            'sec-safety-desc': 'நடைப்பயணம் நடக்கும்போதும் வளாகம் வழக்கம்போல் இயங்கும். இந்தச் சில வழிமுறைகள் அனைவரையும் பாதுகாப்பாக வைக்கும்.',
            'rule-1': 'கயிற்று வரிசையைப் பின்பற்றவும். அதுவே தொடக்கம் முதல் முடிவு வரை அங்கீகரிக்கப்பட்ட வழி.',
            'rule-2': '110 kV மின்நிலையப் பகுதிக்குள் அல்லது எந்த மின் முற்றத்திற்குள்ளும் நுழைய வேண்டாம். அந்த இடங்களில் மார்ஷல்களைப் பின்பற்றவும்.',
            'rule-3': 'வாகனங்களுக்கு வழிவிடவும். நடைப்பயணத்தின்போதும் உள் சாலைகள் பயன்பாட்டில் இருக்கும்.',
            'rule-4': 'நடைப்பயணம் நடக்கும்போது Thalambur சாலைப் பின் வாயில் மூடப்பட்டிருக்கும். முதன்மை வாயில் வழியாக வரவும் செல்லவும்.',
            'rule-5': 'சரிவுப் பாதைகள், அடித்தளங்கள், சேவை முற்றங்களைத் தவிர்க்கவும். அவை வழியின் பகுதி அல்ல.',
            'rule-6': 'ஏதேனும் ஆபத்து, இருட்டான பகுதி அல்லது பாதுகாப்பற்ற நிலை தெரிந்தால் மார்ஷலிடம் அல்லது அருகிலுள்ள பாதுகாப்புப் பணியாளரிடம் தெரிவிக்கவும்.',

            'sos-eyebrow': 'ஏதேனும் தவறு நடந்தால்',
            'sos-title': 'அவசர எண்கள்',
            'sos-desc': 'தொடங்கும் முன் இவற்றைச் சேமித்துக் கொள்ளுங்கள். தளப் பாதுகாப்புக் குழு நாள் முழுவதும் வழியில் இருக்கும்; முதலுதவியை அணுக முடியும்.',
            'sos-security': 'தளப் பாதுகாப்பு',
            'sos-helpdesk': 'உதவி மையம் 24/7',   /* parked - tile removed 03-Aug-2026 */
            'sos-ambulance': 'ஆம்புலன்ஸ்',
            'sos-emergency': 'அனைத்து அவசரங்களும்',
            'route-alt': 'சந்தியா இன்ஃபோசிட்டி வளாகத்தில் அங்கீகரிக்கப்பட்ட நடைபாதை வழி',

            /* Viewer */
            'viewer-close': 'மூடு',
            'viewer-prev': 'முந்தைய பக்கம்',
            'viewer-next': 'அடுத்த பக்கம்'
        }
    };

    var $  = function (s, c) { return (c || document).querySelector(s); };
    var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

    /* ---------------------------------------------------------------------
       Analytics
       --------------------------------------------------------------------- */
    function track(action) {
        if (window.goatcounter && window.goatcounter.count) {
            window.goatcounter.count({ path: action, event: true });
        }
    }

    /* ---------------------------------------------------------------------
       Language
       --------------------------------------------------------------------- */
    var currentLang = 'en';

    function t(key) {
        var s = STRINGS[currentLang] || STRINGS.en;
        return s[key] !== undefined ? s[key] : (STRINGS.en[key] || '');
    }

    function setLanguage(lang, persist) {
        if (!STRINGS[lang]) return;
        currentLang = lang;

        $$('[data-i18n]').forEach(function (el) {
            var v = t(el.getAttribute('data-i18n'));
            if (v) el.textContent = v;
        });
        $$('[data-i18n-alt]').forEach(function (el) {
            var v = t(el.getAttribute('data-i18n-alt'));
            if (v) el.setAttribute('alt', v);
        });
        $$('[data-i18n-label]').forEach(function (el) {
            var v = t(el.getAttribute('data-i18n-label'));
            if (v) el.setAttribute('aria-label', v);
        });

        document.documentElement.lang = lang;
        $$('.lang button').forEach(function (b) {
            b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false');
        });

        if (persist) { try { localStorage.setItem('lang', lang); } catch (e) {} }
    }

    function detectLanguage() {
        var list = navigator.languages || [navigator.language || 'en'];
        for (var i = 0; i < list.length; i++) {
            var l = String(list[i]).toLowerCase();
            if (l === 'ta' || l.indexOf('ta-') === 0) return 'ta';
        }
        return 'en';
    }

    (function initLanguage() {
        var saved = null;
        try { saved = localStorage.getItem('lang'); } catch (e) {}
        if (saved && STRINGS[saved]) {
            setLanguage(saved, false);
        } else {
            var d = detectLanguage();
            if (d !== 'en') { setLanguage(d, false); track('lang_auto_' + d); }
        }
    })();

    $$('.lang button').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var l = this.getAttribute('data-lang');
            setLanguage(l, true);
            track('lang_' + l);
        });
    });

    /* ---------------------------------------------------------------------
       Arrive-by filter
       --------------------------------------------------------------------- */
    (function initFilter() {
        var chips = $$('.chip[data-filter]');
        if (!chips.length) return;
        var cards = $$('[data-category]');

        chips.forEach(function (chip) {
            chip.addEventListener('click', function () {
                var f = this.getAttribute('data-filter');
                chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
                this.setAttribute('aria-pressed', 'true');
                cards.forEach(function (card) {
                    var show = f === 'all' ||
                        card.getAttribute('data-category').split(' ').indexOf(f) !== -1;
                    if (show) card.removeAttribute('hidden');
                    else card.setAttribute('hidden', '');
                });
                track('filter_' + f);
            });
        });
    })();

    /* ---------------------------------------------------------------------
       Scroll spy for the jump nav
       --------------------------------------------------------------------- */
    (function initSpy() {
        var links = $$('.jump a[href^="#"]');
        if (!links.length || !('IntersectionObserver' in window)) return;

        var map = {};
        var targets = [];
        links.forEach(function (a) {
            var el = document.getElementById(a.getAttribute('href').slice(1));
            if (el) { map[el.id] = a; targets.push(el); }
        });

        var visible = {};
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
            var active = null;
            for (var i = 0; i < targets.length; i++) {
                if (visible[targets[i].id]) { active = targets[i].id; break; }
            }
            links.forEach(function (a) { a.classList.remove('is-active'); });
            if (active && map[active]) map[active].classList.add('is-active');
        }, { rootMargin: '-64px 0px -55% 0px', threshold: 0 });

        targets.forEach(function (el) { io.observe(el); });
    })();

    /* ---------------------------------------------------------------------
       Event card auto-expiry
       --------------------------------------------------------------------- */
    (function initEvent() {
        var card = $('.event');
        if (!card) return;
        if (new Date() >= new Date(EVENT_ENDS)) card.setAttribute('hidden', '');
    })();

    /* ---------------------------------------------------------------------
       Document viewer
       --------------------------------------------------------------------- */
    (function initViewer() {
        var root = $('#viewer');
        if (!root) return;

        var stage    = $('.viewer-stage', root);
        var img      = $('.viewer-stage img', root);
        var titleEl  = $('.viewer-title', root);
        var countEl  = $('.viewer-count', root);
        var closeBtn = $('.viewer-close', root);
        var prevBtn  = $('.viewer-prev', root);
        var nextBtn  = $('.viewer-next', root);
        var dlLink   = $('.viewer-dl', root);
        var thumbs   = $('.thumbs', root);
        var foot     = $('.viewer-foot', root);

        var doc = null, page = 0, savedScroll = 0;

        /* iOS Safari ignores overflow:hidden on <body>, so the page is pinned
           with position:fixed and the scroll offset restored on close. */
        function lockScroll() {
            savedScroll = window.pageYOffset || document.documentElement.scrollTop || 0;
            document.body.style.top = (-savedScroll) + 'px';
            document.body.classList.add('is-locked');
        }
        function unlockScroll() {
            if (!document.body.classList.contains('is-locked')) return;
            document.body.classList.remove('is-locked');
            document.body.style.top = '';
            window.scrollTo(0, savedScroll);
        }

        function unzoom() {
            stage.classList.remove('is-zoomed');
            stage.scrollTop = 0;
            stage.scrollLeft = 0;
        }

        function clear(node) {
            while (node.firstChild) node.removeChild(node.firstChild);
        }

        function render() {
            img.src = doc.pages[page];
            img.alt = t(doc.titleKey) + ' — ' + (page + 1) + '/' + doc.pages.length;
            countEl.textContent = doc.pages.length > 1 ? (page + 1) + ' / ' + doc.pages.length : '';
            prevBtn.disabled = page === 0;
            nextBtn.disabled = page === doc.pages.length - 1;
            var multi = doc.pages.length > 1;
            prevBtn.hidden = !multi;
            nextBtn.hidden = !multi;
            $$('button', thumbs).forEach(function (b, i) {
                b.setAttribute('aria-current', i === page ? 'true' : 'false');
                if (i === page && b.scrollIntoView) {
                    b.scrollIntoView({ block: 'nearest', inline: 'center' });
                }
            });
            unzoom();
        }

        function buildThumbs() {
            clear(thumbs);
            if (doc.thumbs.length < 2) {
                thumbs.hidden = true;
                foot.hidden = true;
                return;
            }
            thumbs.hidden = false;
            foot.hidden = false;
            doc.thumbs.forEach(function (src, i) {
                var b = document.createElement('button');
                b.type = 'button';
                b.setAttribute('aria-label', 'Page ' + (i + 1));
                var im = document.createElement('img');
                im.src = src;
                im.alt = '';
                im.loading = 'lazy';
                b.appendChild(im);
                b.addEventListener('click', function () { page = i; render(); });
                thumbs.appendChild(b);
            });
        }

        function open(key) {
            doc = DOCS[key];
            if (!doc) return;
            page = 0;
            titleEl.textContent = t(doc.titleKey);
            dlLink.href = doc.pdf;
            dlLink.setAttribute('download', '');
            stage.style.setProperty('--zoomw', doc.width + 'px');
            buildThumbs();
            render();
            lockScroll();
            root.showModal();
            track('view_' + key);
        }

        /* Cleanup is idempotent and is driven from three places on purpose.
           If it never ran, the body would stay position:fixed and the page
           would be stuck unscrollable, so it does not hang off one event. */
        function cleanup() {
            unlockScroll();
            unzoom();
            img.removeAttribute('src');
        }

        function closeViewer() {
            if (root.open) root.close();
            cleanup();
        }

        root.addEventListener('close', cleanup);    // Esc, or any programmatic close
        root.addEventListener('cancel', cleanup);   // Esc, before the close lands

        function go(step) {
            if (!doc) return;
            var n = page + step;
            if (n < 0 || n >= doc.pages.length) return;
            page = n;
            render();
        }

        $$('[data-doc]').forEach(function (el) {
            el.addEventListener('click', function (e) {
                e.preventDefault();
                open(this.getAttribute('data-doc'));
            });
        });

        closeBtn.addEventListener('click', closeViewer);
        prevBtn.addEventListener('click', function () { go(-1); });
        nextBtn.addEventListener('click', function () { go(1); });

        img.addEventListener('click', function () {
            stage.classList.toggle('is-zoomed');
            if (!stage.classList.contains('is-zoomed')) unzoom();
        });

        root.addEventListener('click', function (e) {
            if (e.target === stage || e.target === root) closeViewer();
        });

        /* Esc is handled natively by the dialog; only paging is ours. */
        document.addEventListener('keydown', function (e) {
            if (!root.open) return;
            if (e.key === 'ArrowLeft') go(-1);
            else if (e.key === 'ArrowRight') go(1);
        });

        /* Swipe between pages when not zoomed */
        var sx = 0, sy = 0;
        stage.addEventListener('touchstart', function (e) {
            if (e.touches.length !== 1) return;
            sx = e.touches[0].clientX;
            sy = e.touches[0].clientY;
        }, { passive: true });
        stage.addEventListener('touchend', function (e) {
            if (stage.classList.contains('is-zoomed') || !e.changedTouches.length) return;
            var dx = e.changedTouches[0].clientX - sx;
            var dy = e.changedTouches[0].clientY - sy;
            if (Math.abs(dx) > 48 && Math.abs(dy) < 44) go(dx < 0 ? 1 : -1);
        }, { passive: true });
    })();

    /* ---------------------------------------------------------------------
       Click tracking
       --------------------------------------------------------------------- */
    document.addEventListener('click', function (e) {
        var el = e.target.closest ? e.target.closest('[data-track]') : null;
        if (el) track(el.getAttribute('data-track'));
    });

    /* ?src= reaches the analytics endpoint, so it is treated as untrusted:
       lowercased, stripped to a safe alphabet and length-capped. */
    var rawSrc = new URLSearchParams(window.location.search).get('src') || 'direct';
    var safeSrc = String(rawSrc).toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 24) || 'direct';
    track('visit_' + safeSrc);
})();
