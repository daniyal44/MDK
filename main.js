'use strict';

// ----------------------------------------------------
// Core Elements & Toggle Functions
// ----------------------------------------------------
const elemToggleFunc = function(elem) { elem.classList.toggle('active'); }

// ----------------------------------------------------
// Header Sticky, Go-Top & Scroll Progress Bar
// ----------------------------------------------------
const header = document.querySelector('[data-header]');
const goTopBtn = document.querySelector('[data-go-top]');
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', function() {
    // Header & Go Top Button
    if (window.scrollY >= 20) {
        header.classList.add('active');
        goTopBtn.classList.add('active');
    } else {
        header.classList.remove('active');
        goTopBtn.classList.remove('active');
    }

    // Scroll Progress
    const windowScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (windowScroll / height) * 100 : 0;
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});

// ----------------------------------------------------
// Mobile Navigation Menu Toggle
// ----------------------------------------------------
const navToggleBtn = document.querySelector('[data-nav-toggle-btn]');
const navbar = document.querySelector('[data-navbar]');

if (navToggleBtn && navbar) {
    navToggleBtn.addEventListener('click', function() { 
        elemToggleFunc(navToggleBtn);
        elemToggleFunc(navbar);
        elemToggleFunc(document.body);
    });

    // Close menu on nav link clicks (important for mobile UX)
    const navLinks = document.querySelectorAll('.navbar-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggleBtn.classList.remove('active');
            navbar.classList.remove('active');
            document.body.classList.remove('active');
        });
    });
}

// ----------------------------------------------------
// Skills & Tools Category Toggling
// ----------------------------------------------------
const toggleBtnBox = document.querySelector('[data-toggle-box]');
const toggleBtns = document.querySelectorAll('[data-toggle-btn]');
const skillsBox = document.querySelector('[data-skills-box]');

if (toggleBtnBox && skillsBox && toggleBtns.length > 0) {
    for (let i = 0; i < toggleBtns.length; i++) {
        toggleBtns[i].addEventListener('click', function() {
            elemToggleFunc(toggleBtnBox);
            for (let j = 0; j < toggleBtns.length; j++) {
                toggleBtns[j].classList.toggle('active');
            }
            elemToggleFunc(skillsBox);
        });
    }
}

// ----------------------------------------------------
// Dark / Light Theme Toggle & Local Storage
// ----------------------------------------------------
const themeToggleBtn = document.querySelector('[data-theme-btn]');

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function() {
        elemToggleFunc(themeToggleBtn);

        if (themeToggleBtn.classList.contains('active')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
        } else {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark-theme');
        }
    });
}

// Apply Stored Theme on Load
if (localStorage.getItem('theme') === 'light-theme') {
    if (themeToggleBtn) themeToggleBtn.classList.add('active');
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
} else {
    if (themeToggleBtn) themeToggleBtn.classList.remove('active');
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
}

// ----------------------------------------------------
// Dynamic Client-side Translation System (i18n)
// ----------------------------------------------------
const translations = {
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_skills: "Skills",
        nav_portfolio: "Portfolio",
        nav_location: "Location",
        nav_contact: "Contact",
        hero_subtitle: "Creative Web Developer & Product Designer",
        hero_title: "Designing & Building Creative Products",
        hero_btn: "Contact me",
        stats_exp: "Years of Experience",
        stats_projects: "Completed Projects",
        stats_clients: "Happy Clients",
        about_subtitle: "About me",
        about_title: "Need a Product? Get in Touch!",
        about_text: "Hi, I'm Muhammad Daniyal. I'm a developer passionate in creating clean web applications with intuitive functionalities. I enjoy the process of turning ideas into reality using creative solutions. I'm always curious about learning new skills, tools and concepts. In addition to working on various solo full stack projects, I have worked with complex teams, which involves daily stand-ups and communications, source control and project management.",
        about_btn_work: "View Works",
        about_btn_cv: "Download CV",
        about_btn_app: "Download APP",
        skills_subtitle: "My Skills",
        skills_title: "What my Programming Skills Include?",
        skills_text: "I develop simple, intuitive and responsive user interfaces that help users get things done with less effort and time using state-of-the-art technologies.",
        skills_tab: "Skills",
        tools_tab: "Tools",
        works_subtitle: "My Works",
        works_title: "See my works which will amaze you!",
        works_text: "We develop the best quality websites that serve you in the long term. Well-documented, clean, easy and elegant interfaces help any non-technical clients.",
        works_load_more: "Load More Works",
        location_subtitle: "Visit Us & Explore",
        location_title: "Directions & Nearby Area Amenities",
        location_text: "Plan your visit effortlessly with interactive turn-by-turn directions, or explore surrounding cafes, transit spots, banks, and parking hubs near our studio in Green Town, Lahore.",
        directions_badge: "Interactive Route Planner",
        directions_heading: "Get Directions",
        directions_subheading: "Enter your starting location or click GPS to calculate route to our Lahore studio.",
        gps_btn: "GPS",
        mode_driving: "Drive",
        mode_walking: "Walk",
        mode_transit: "Transit",
        directions_calc_btn: "Calculate Directions",
        route_dist: "Distance",
        route_time: "Est. Time",
        nav_app_open: "Launch in GPS App:",
        cat_all: "All",
        cat_food: "Dining",
        cat_transit: "Transit",
        cat_bank: "Banks",
        cat_parking: "Parking",
        contact_subtitle: "Contact",
        contact_title: "Have you any project? Drop a message!",
        contact_text: "Get in touch and let me know if I can help! Fill out the form and I'll be in touch as soon as possible.",
        contact_lbl_name: "Name",
        contact_lbl_email: "Email",
        contact_lbl_phone: "Phone",
        contact_lbl_address: "Your Address (Instant Autocomplete)",
        contact_lbl_msg: "Message",
        contact_btn_send: "Send Message",
        footer_text: "All rights reserved"
    },
    es: {
        nav_home: "Inicio",
        nav_about: "Sobre Mí",
        nav_skills: "Habilidades",
        nav_portfolio: "Portafolio",
        nav_location: "Ubicación",
        nav_contact: "Contacto",
        hero_subtitle: "Desarrollador Web Creativo y Diseñador de Productos",
        hero_title: "Diseño y Construcción de Productos Creativos",
        hero_btn: "Contáctame",
        stats_exp: "Años de Experiencia",
        stats_projects: "Proyectos Completados",
        stats_clients: "Clientes Felices",
        about_subtitle: "Sobre mí",
        about_title: "¿Necesitas un producto? ¡Ponte en contacto!",
        about_text: "Hola, soy Muhammad Daniyal. Soy un desarrollador apasionado por crear aplicaciones web limpias con funcionalidades intuitivas. Disfruto el proceso de convertir ideas en realidad mediante soluciones creativas. Siempre tengo curiosidad por aprender nuevas habilidades, herramientas y conceptos. Además de trabajar en varios proyectos independientes de desarrollo completo (full-stack), he colaborado con equipos complejos en reuniones diarias, control de versiones y gestión de proyectos.",
        about_btn_work: "Ver Trabajos",
        about_btn_cv: "Descargar CV",
        about_btn_app: "Descargar Aplicación",
        skills_subtitle: "Mis Habilidades",
        skills_title: "¿Qué incluyen mis habilidades de programación?",
        skills_text: "Desarrollo interfaces de usuario simples, intuitivas y adaptables que ayudan a los usuarios a realizar tareas con menos esfuerzo y tiempo utilizando tecnologías de vanguardia.",
        skills_tab: "Habilidades",
        tools_tab: "Herramientas",
        works_subtitle: "Mis Trabajos",
        works_title: "¡Mira mis trabajos que te sorprenderán!",
        works_text: "Desarrollamos sitios web de la mejor calidad que le sirven a largo plazo. Una interfaz bien documentada, limpia, fácil y elegante ayuda a cualquier cliente no técnico.",
        works_load_more: "Cargar Más Trabajos",
        location_subtitle: "Visítanos y Explora",
        location_title: "Direcciones y Servicios Cercanos",
        location_text: "Planifica tu visita con direcciones interactivas paso a paso o explora cafeterías, transporte y bancos cercanos a nuestro estudio en Green Town, Lahore.",
        directions_badge: "Planificador de Rutas Interactivo",
        directions_heading: "Obtener Direcciones",
        directions_subheading: "Ingresa tu ubicación inicial o usa el GPS para calcular la ruta hacia nuestro estudio.",
        gps_btn: "GPS",
        mode_driving: "Auto",
        mode_walking: "Caminando",
        mode_transit: "Tránsito",
        directions_calc_btn: "Calcular Ruta",
        route_dist: "Distancia",
        route_time: "Tiempo Est.",
        nav_app_open: "Abrir en App de Mapas:",
        cat_all: "Todos",
        cat_food: "Restaurantes",
        cat_transit: "Tránsito",
        cat_bank: "Bancos",
        cat_parking: "Estacionamiento",
        contact_subtitle: "Contacto",
        contact_title: "¿Tienes algún proyecto? ¡Escríbeme un mensaje!",
        contact_text: "¡Ponte en contacto y dime cómo puedo ayudarte! Completa el formulario y me comunicaré contigo lo antes posible.",
        contact_lbl_name: "Nombre",
        contact_lbl_email: "Correo electrónico",
        contact_lbl_phone: "Teléfono",
        contact_lbl_address: "Tu Dirección (Autocompletar al instante)",
        contact_lbl_msg: "Mensaje",
        contact_btn_send: "Enviar Mensaje",
        footer_text: "Todos los derechos reservados"
    },
    ur: {
        nav_home: "ہوم",
        nav_about: "میرے بارے میں",
        nav_skills: "مہارتیں",
        nav_portfolio: "پورٹ فولیو",
        nav_location: "مقام",
        nav_contact: "رابطہ",
        hero_subtitle: "کری ایٹو ویب ڈیولپر اور پروڈکٹ ڈیزائنر",
        hero_title: "جدید اور معیار کی ویب مصنوعات کی تشکیل",
        hero_btn: "مجھ سے رابطہ کریں",
        stats_exp: "سال کا تجربہ",
        stats_projects: "مکمل شدہ پروجیکٹس",
        stats_clients: "مطمئن کلائنٹس",
        about_subtitle: "میرے بارے میں",
        about_title: "کیا آپ کو ویب ایپلیکیشن کی ضرورت ہے؟",
        about_text: "سلام، میں محمد دانیال ہوں۔ میں 12 سال سے بھی زائد عرصے سے فل اسٹیک ویب اور موبائل مصنوعات بنانے میں مہارت رکھتا ہوں۔",
        about_btn_work: "کام دیکھیں",
        about_btn_cv: "سی وی ڈاؤن لوڈ کریں",
        about_btn_app: "ایپ ڈاؤن لوڈ کریں",
        skills_subtitle: "میری مہارتیں",
        skills_title: "میری پروگرامنگ مہارتوں میں کیا شامل ہے؟",
        skills_text: "میں جدید ترین ٹیکنالوجی کا استعمال کرتے ہوئے بہترین اور تیز رفتار ویب سائٹس اور ایپس بناتا ہوں۔",
        skills_tab: "مہارتیں",
        tools_tab: "ٹولز",
        works_subtitle: "میرا کام",
        works_title: "میرے پروجیکٹس دیکھیں",
        works_text: "ہم اعلیٰ ترین معیار کی ویب سائٹس تیار کرتے ہیں جو طویل عرصے تک آپ کی خدمت کرتی ہیں۔",
        works_load_more: "مزید پروجیکٹس دیکھیں",
        location_subtitle: "ہمارے اسٹوڈیو کا دورہ کریں",
        location_title: "راستہ اور قریبی مقامات",
        location_text: "گرین ٹاؤن، لاہور میں ہمارے اسٹوڈیو تک کا راستہ تلاش کریں یا قریبی سہولیات دیکھیں۔",
        directions_badge: "انٹرایکٹو روٹ پلانر",
        directions_heading: "راستہ معلوم کریں",
        directions_subheading: "اپنا مقام درج کریں یا GPS بٹن پر کلک کریں۔",
        gps_btn: "جی پی ایس",
        mode_driving: "ڈرائیو",
        mode_walking: "پیدل",
        mode_transit: "بس/ٹرانسپورٹ",
        directions_calc_btn: "راستہ حساب کریں",
        route_dist: "فاصلہ",
        route_time: "تخمینی وقت",
        nav_app_open: "نقشہ ایپ میں کھولیں:",
        cat_all: "تمام",
        cat_food: "کھانا و کیفے",
        cat_transit: "ٹرانسپورٹ",
        cat_bank: "بینک و اے ٹی ایم",
        cat_parking: "پارکنگ",
        contact_subtitle: "رابطہ کریں",
        contact_title: "کوئی پروجیکٹ ہے؟ پیغام بھیجیں!",
        contact_text: "رابطہ کریں اور مجھے بتائیں کہ میں آپ کی کیا مدد کر سکتا ہوں۔",
        contact_lbl_name: "نام",
        contact_lbl_email: "ای میل",
        contact_lbl_phone: "فون نمبر",
        contact_lbl_address: "آپ کا پتہ",
        contact_lbl_msg: "پیغام",
        contact_btn_send: "پیغام بھیجیں",
        footer_text: "جملہ حقوق محفوظ ہیں"
    }
};

const langSelect = document.getElementById('lang');

const translatePage = function(lang) {
    const i18nElements = document.querySelectorAll('[data-i18n]');
    i18nElements.forEach(elem => {
        const key = elem.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            elem.innerHTML = translations[lang][key];
        }
    });
};

if (langSelect) {
    langSelect.addEventListener('change', function(e) {
        const selectedLang = e.target.value;
        translatePage(selectedLang);
        localStorage.setItem('lang', selectedLang);
    });

    // Load initial language from Local Storage or Query Parameter
    const urlParams = new URLSearchParams(window.location.search);
    const queryLang = urlParams.get('lang');
    const storedLang = localStorage.getItem('lang');
    
    let defaultLang = 'en';
    if (translations[queryLang]) {
        defaultLang = queryLang;
    } else if (translations[storedLang]) {
        defaultLang = storedLang;
    }

    langSelect.value = defaultLang;
    translatePage(defaultLang);
}

// ----------------------------------------------------
// Scroll-Triggered Reveal Animations Engine
// ----------------------------------------------------
const revealElements = document.querySelectorAll('[data-reveal]');

const revealOnScroll = function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // Animate only once
        }
    });
};

// Optimize for search bots which don't support scroll triggering (ensure all content is visible)
const isSearchBot = /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex/i.test(navigator.userAgent);

if (isSearchBot) {
    revealElements.forEach(elem => elem.classList.add('revealed'));
} else {
    const revealObserver = new IntersectionObserver(revealOnScroll, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// ----------------------------------------------------
// Interactive Leaflet Map & Amenity Discovery Engine
// ----------------------------------------------------
const STUDIO_COORDS = [31.4335, 74.3056]; // Green Town, Lahore

const nearbyAmenities = [
    {
        id: 1,
        name: "Gourmet Bakers & Cafe",
        category: "food",
        lat: 31.4350,
        lng: 74.3070,
        desc: "Popular bakery, fresh coffee & quick snacks",
        dist: "0.2 km"
    },
    {
        id: 2,
        name: "Green Town Metro Bus Terminal",
        category: "transit",
        lat: 31.4320,
        lng: 74.3030,
        desc: "Main speedo bus stop connecting to Canal Road & Kalma Chowk",
        dist: "0.3 km"
    },
    {
        id: 3,
        name: "Meezan Bank & 24/7 ATM",
        category: "bank",
        lat: 31.4362,
        lng: 74.3082,
        desc: "Islamic banking & secure contactless ATM",
        dist: "0.4 km"
    },
    {
        id: 4,
        name: "Green Town Public Parking Lot",
        category: "service",
        lat: 31.4312,
        lng: 74.3045,
        desc: "Spacious & guarded parking area for visitors",
        dist: "0.3 km"
    },
    {
        id: 5,
        name: "Subway & Fast Food Hub",
        category: "food",
        lat: 31.4375,
        lng: 74.3100,
        desc: "Fresh sandwiches, dining area & takeaway",
        dist: "0.6 km"
    },
    {
        id: 6,
        name: "HBL Branch & Digital Banking",
        category: "bank",
        lat: 31.4300,
        lng: 74.3015,
        desc: "Full service Habib Bank branch",
        dist: "0.5 km"
    }
];

let map = null;
let markersGroup = null;
let routePolyline = null;
let userMarker = null;

const initMapAndAmenities = function() {
    const mapContainer = document.getElementById('interactiveMap');
    if (!mapContainer || typeof L === 'undefined') return;

    map = L.map('interactiveMap').setView(STUDIO_COORDS, 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Studio Custom Marker
    const studioIcon = L.divIcon({
        className: 'custom-studio-marker',
        html: '<div style="background:#06b6d4; color:#fff; padding:6px 12px; border-radius:20px; font-weight:bold; font-size:12px; box-shadow:0 0 15px rgba(6,182,212,0.6); display:flex; align-items:center; gap:4px;"><i class="ri-briefcase-4-fill"></i> MDK Studio</div>',
        iconSize: [110, 30],
        iconAnchor: [55, 15]
    });

    L.marker(STUDIO_COORDS, { icon: studioIcon })
        .addTo(map)
        .bindPopup('<strong>Muhammad Daniyal Studio</strong><br>House No. 490, Block 5, Green Town, Lahore')
        .openPopup();

    markersGroup = L.layerGroup().addTo(map);

    renderAmenityCards('all');
    renderAmenityMarkers('all');

    // Tab switching listener
    const tabs = document.querySelectorAll('.amenity-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const category = this.getAttribute('data-category');
            renderAmenityCards(category);
            renderAmenityMarkers(category);
        });
    });
};

const renderAmenityMarkers = function(category) {
    if (!markersGroup) return;
    markersGroup.clearLayers();

    const filtered = category === 'all' ? nearbyAmenities : nearbyAmenities.filter(a => a.category === category);

    filtered.forEach(item => {
        let iconHtml = '<i class="ri-map-pin-line"></i>';
        if (item.category === 'food') iconHtml = '<i class="ri-restaurant-line"></i>';
        else if (item.category === 'transit') iconHtml = '<i class="ri-bus-line"></i>';
        else if (item.category === 'bank') iconHtml = '<i class="ri-bank-line"></i>';
        else if (item.category === 'service') iconHtml = '<i class="ri-parking-line"></i>';

        const markerIcon = L.divIcon({
            className: 'custom-amenity-marker',
            html: `<div style="background:#1b1e2b; color:#06b6d4; border:2px solid #06b6d4; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px rgba(0,0,0,0.5);">${iconHtml}</div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        });

        const m = L.marker([item.lat, item.lng], { icon: markerIcon })
            .bindPopup(`<strong>${item.name}</strong><br>${item.desc}<br><small style="color:#06b6d4;">${item.dist} from studio</small>`);
        
        markersGroup.addLayer(m);
    });
};

const renderAmenityCards = function(category) {
    const cardsContainer = document.getElementById('amenityCardsList');
    if (!cardsContainer) return;

    const filtered = category === 'all' ? nearbyAmenities : nearbyAmenities.filter(a => a.category === category);

    cardsContainer.innerHTML = filtered.map(item => {
        const badgeLabel = item.category.toUpperCase();
        return `
            <div class="amenity-card-item" data-id="${item.id}" onclick="highlightAmenity(${item.lat}, ${item.lng}, '${item.name.replace(/'/g, "\\'")}')">
                <div class="amenity-card-header">
                    <span class="amenity-card-title">${item.name}</span>
                    <span class="amenity-badge">${badgeLabel}</span>
                </div>
                <p class="amenity-card-desc">${item.desc}</p>
                <div class="amenity-card-dist">
                    <i class="ri-footprint-line"></i> ${item.dist} away
                </div>
            </div>
        `;
    }).join('');
};

window.highlightAmenity = function(lat, lng, name) {
    if (!map) return;
    map.flyTo([lat, lng], 17, { duration: 1.2 });
    markersGroup.eachLayer(marker => {
        if (marker.getLatLng().lat === lat && marker.getLatLng().lng === lng) {
            marker.openPopup();
        }
    });
};

// ----------------------------------------------------
// Interactive Route & Turn-by-Turn Directions Engine
// ----------------------------------------------------
let currentTravelMode = 'driving';

const initDirectionsPlanner = function() {
    const modeBtns = document.querySelectorAll('.mode-btn');
    modeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            modeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentTravelMode = this.getAttribute('data-mode');
        });
    });

    const gpsBtn = document.getElementById('useGpsBtn');
    if (gpsBtn) {
        gpsBtn.addEventListener('click', function() {
            if (!navigator.geolocation) {
                alert("Geolocation is not supported by your browser");
                return;
            }
            gpsBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Finding...';
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                document.getElementById('originAddress').value = `${lat.toFixed(4)}, ${lng.toFixed(4)} (Current Location)`;
                gpsBtn.innerHTML = '<i class="ri-checkbox-circle-line"></i> Found';
                calculateRouteFromCoords(lat, lng);
            }, () => {
                alert("Unable to fetch your location. Please type your starting area manually.");
                gpsBtn.innerHTML = '<i class="ri-crosshair-2-line"></i> GPS';
            });
        });
    }

    const calcBtn = document.getElementById('calcRouteBtn');
    if (calcBtn) {
        calcBtn.addEventListener('click', function() {
            const originInput = document.getElementById('originAddress').value.trim();
            if (!originInput) {
                alert("Please enter a starting location or city name.");
                return;
            }
            geocodeAndCalculateRoute(originInput);
        });
    }
};

const calculateDistance = function(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
};

const geocodeAndCalculateRoute = function(query) {
    const calcBtn = document.getElementById('calcRouteBtn');
    calcBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Searching Route...';

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`)
        .then(res => res.json())
        .then(data => {
            calcBtn.innerHTML = '<i class="ri-navigation-line"></i> Calculate Directions';
            if (data && data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                calculateRouteFromCoords(lat, lon);
            } else {
                calculateRouteFromCoords(31.5204, 74.3587); // Default Gulberg / Lahore center
            }
        })
        .catch(() => {
            calcBtn.innerHTML = '<i class="ri-navigation-line"></i> Calculate Directions';
            calculateRouteFromCoords(31.5204, 74.3587);
        });
};

const calculateRouteFromCoords = function(userLat, userLng) {
    const distKm = calculateDistance(userLat, userLng, STUDIO_COORDS[0], STUDIO_COORDS[1]);
    const formattedDist = distKm < 1 ? `${Math.round(distKm * 1000)} meters` : `${distKm.toFixed(1)} km`;
    
    let speed = 40; // driving speed km/h
    if (currentTravelMode === 'walking') speed = 4.5;
    else if (currentTravelMode === 'transit') speed = 25;

    const estMinutes = Math.max(2, Math.round((distKm / speed) * 60));

    const resultsBox = document.getElementById('routeResults');
    document.getElementById('routeDist').textContent = formattedDist;
    document.getElementById('routeTime').textContent = `${estMinutes} min`;

    const stepsContainer = document.getElementById('routeSteps');
    stepsContainer.innerHTML = `
        <div class="step-item"><i class="ri-map-pin-user-fill"></i> <span>Depart from origin towards Green Town Main Blvd.</span></div>
        <div class="step-item"><i class="ri-corner-up-right-double-fill"></i> <span>Follow Main Boulevard Green Town for ${Math.max(0.5, (distKm*0.6).toFixed(1))} km.</span></div>
        <div class="step-item"><i class="ri-direction-fill"></i> <span>Turn into Sector D2, Block 5 street.</span></div>
        <div class="step-item"><i class="ri-flag-2-fill"></i> <span>Arrive at House No. 490, MDK Studio on your left.</span></div>
    `;

    resultsBox.classList.remove('hidden');

    // Update Map Route Visuals
    if (map) {
        if (routePolyline) map.removeLayer(routePolyline);
        if (userMarker) map.removeLayer(userMarker);

        const userIcon = L.divIcon({
            className: 'custom-user-marker',
            html: '<div style="background:#ef4444; color:#fff; padding:4px 8px; border-radius:12px; font-weight:bold; font-size:11px;">Start</div>',
            iconSize: [40, 20]
        });

        userMarker = L.marker([userLat, userLng], { icon: userIcon }).addTo(map);

        routePolyline = L.polyline([[userLat, userLng], STUDIO_COORDS], {
            color: '#06b6d4',
            weight: 5,
            opacity: 0.8,
            dashArray: '8, 8'
        }).addTo(map);

        map.fitBounds(routePolyline.getBounds(), { padding: [40, 40] });
    }
};

// ----------------------------------------------------
// Real-time Address Autocomplete Widget (Nominatim OSM)
// ----------------------------------------------------
const initAddressAutocomplete = function() {
    const addressInput = document.getElementById('addressInput');
    const dropdown = document.getElementById('addressDropdown');
    if (!addressInput || !dropdown) return;

    let debounceTimer = null;

    addressInput.addEventListener('input', function() {
        const query = this.value.trim();
        clearTimeout(debounceTimer);

        if (query.length < 3) {
            dropdown.classList.add('hidden');
            return;
        }

        debounceTimer = setTimeout(() => {
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`)
                .then(res => res.json())
                .then(items => {
                    if (!items || items.length === 0) {
                        dropdown.classList.add('hidden');
                        return;
                    }

                    dropdown.innerHTML = items.map(item => `
                        <div class="autocomplete-item" onclick="selectAutocompleteAddress('${item.display_name.replace(/'/g, "\\'")}')">
                            <i class="ri-map-pin-line"></i>
                            <span>${item.display_name}</span>
                        </div>
                    `).join('');

                    dropdown.classList.remove('hidden');
                })
                .catch(() => {
                    dropdown.classList.add('hidden');
                });
        }, 300);
    });

    document.addEventListener('click', function(e) {
        if (!addressInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
};

window.selectAutocompleteAddress = function(fullAddress) {
    const addressInput = document.getElementById('addressInput');
    const dropdown = document.getElementById('addressDropdown');
    if (addressInput) {
        addressInput.value = fullAddress;
    }
    if (dropdown) {
        dropdown.classList.add('hidden');
    }
};

// Active Navigation Link Highlighting for Multi-Page App
const updateActiveNavLink = function() {
    const rawPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentPath = (rawPath === '' || rawPath === '/') ? 'index.html' : rawPath;
    const allNavLinks = document.querySelectorAll('.navbar-link');
    allNavLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

// ----------------------------------------------------
// Word-Level SEO, AEO, GEO & Microdata Enforcer
// ----------------------------------------------------
const initWordLevelSEO = function() {
    const keywords = ["Zyphuel", "zphuel", "ItxMDK", "itxmtk", "MuhammadDaniel", "itsmdk", "itx dk", "itxM", "itcM", "Poke nexus", "Muhammad Daniyal", "Dashacart", "Hittop", "Scale verse", "Ladoni"];
    
    // Enrich buttons and interactive links with accessibility & SEO attributes
    document.querySelectorAll('a, button, input, .project-card, .skills-card, .contact-social-link').forEach(el => {
        if (!el.getAttribute('title')) {
            const text = el.innerText || el.getAttribute('aria-label') || '';
            el.setAttribute('title', `${text ? text.trim() + ' - ' : ''}Muhammad Daniyal (ItxMDK / Zyphuel) | Scale verse`);
        }
        if (!el.getAttribute('data-seo-brand')) {
            el.setAttribute('data-seo-brand', 'Zyphuel-ItxMDK');
        }
    });

    // Ensure all images have fallback alt attributes referencing target brands
    document.querySelectorAll('img').forEach(img => {
        if (!img.getAttribute('alt') || img.getAttribute('alt').trim() === '') {
            img.setAttribute('alt', `Muhammad Daniyal (ItxMDK / Zyphuel / Scale verse) Project Portfolio`);
        }
    });
};

// ----------------------------------------------------
// Initialize All Modules on DOM Content Loaded
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNavLink();
    initMapAndAmenities();
    initDirectionsPlanner();
    initAddressAutocomplete();
    initWordLevelSEO();
});