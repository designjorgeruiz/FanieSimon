const CONTACT_EMAIL = "faniesimondesign@gmail.com";
const ASSET_VERSION = "20260426d";
const STORAGE_KEY = "fanie-simon-language";
const CATALOG_URL = `./source-database/catalog.json?v=${ASSET_VERSION}`;
const COLLAB_FAMILY_IDS = []; // All collabs render as regular grid cards

const safeStorage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignore storage failures.
    }
  },
};

const translations = {
  en: {
    brandSubtitle: "Art catalogue",
    nav: { available: "Available", collaborations: "Collaborations", records: "Records", archive: "Archive", contact: "Contact" },
    headerCta: "Browse catalog",
    hero: {
      kicker: "Basel · Switzerland",
      title: "Fanie Simon",
      text: "Wood · Ritual · Geometry",
      primary: "Explore the Catalogue",
      secondary: "Meet the Artist",
    },
    about: {
      kicker: "Artist statement",
      title: "Between Basel and Tulum, a practice built on memory, geometry, and warmth.",
      intro:
        "Fanie Simon creates wood reliefs, mixed media sculptures, and custom objects for private collectors and interior spaces. Her practice draws on Mesoamerican mythology, sacred geometry, and the materiality of hand-built surfaces — combining the precision of Swiss craft with the ceremonial warmth of her years in Tulum.",
      storyTitle: "Practice",
      story1:
        "Each work moves between relief, sculpture, and object — readable from across the room and deeply tactile up close. Geometry carries the structure; the hand leaves warmth in every surface.",
      story2:
        "\"My motivation is to put a smile on people's faces when they enter a room where one of my works is hanging.\" — Fanie Simon",
      materialsTitle: "Materials",
      materials1:
        "Wood forms the base of every work. Mirror, glass, silk, dried flowers, epoxy, steel, cassettes, and found elements extend the language — each material chosen for what it adds to the surface and the light.",
      materials2:
        "The balance between precision and softness makes each piece work equally as collectible art and as a calm, refined presence in a living or working interior.",
      factsKicker: "Studio facts",
      quote: "\"Created with passion and love — for the space, for the collector, for the moment a room comes alive.\"",
      facts: {
        materialsLabel: "Primary materials",
        materialsValue: "Wood, mirror, glass, silk, dried flowers, epoxy, steel",
        baseLabel: "Studio",
        baseValue: "Basel, Switzerland",
        approachLabel: "Approach",
        approachValue: "Tactile geometry with ceremonial warmth",
      },
    },
    sections: {
      catalogKicker: "Full catalog",
      catalogTitle: "All works.",
      catalogIntro: "Filter by status, shape, or price. Every piece is one of a kind.",
      contactKicker: "Contact",
      contactTitle: "Request pricing, availability, or a commission brief.",
      contactIntro: "The studio is open to private sales, commissions, and interior collaborations. Reach out directly.",
    },
    filters: {
      all: "All",
      circle: "Circles",
      vertical: "Verticals",
      square: "Squares",
      rectangle: "Rectangles",
      other: "Other",
      statusAll: "All works",
      available: "Available",
      collaboration: "Collaborations",
      sold: "Archive",
      documented: "Records",
      priceAll: "Any price",
      under500: "Under CHF 500",
      range500to1500: "CHF 500–1,500",
      over1500: "Over CHF 1,500",
      uponRequest: "Price on request",
    },
    status: {
      available: "Available",
      collaboration: "Collaboration",
      sold: "Sold",
      documented: "Source record",
      recovered: "Recovered title",
    },
    shapes: {
      circle: "Circle",
      vertical: "Vertical",
      square: "Square",
      rectangle: "Rectangle",
      other: "Other",
    },
    meta: {
      year: "Year",
      materials: "Materials",
      dimensions: "Dimensions",
      price: "Price",
      sourcePage: "Source page",
      inquire: "Inquire",
      details: "Details",
      priceUponRequest: "Price upon request",
      yearNotSpecified: "Year not specified",
      dimensionsNotSpecified: "Dimensions not specified",
    },
    contact: {
      cards: {
        email: "Email",
        phone: "Phone",
        website: "Website",
        studio: "Studio",
        studioValue: "Basel, Switzerland",
      },
      form: {
        name: "Name",
        email: "Email",
        type: "Inquiry type",
        piece: "Piece",
        message: "Message",
        submit: "Open email draft",
        note: "The form opens a pre-filled email so the catalog works without a backend.",
        placeholders: {
          name: "Your name",
          email: "Your email",
          piece: "Artwork title or series",
          message: "Tell the studio what piece, scale, palette, or project context you have in mind.",
        },
        types: {
          pricing: "Pricing / availability",
          commission: "Commission",
          catalog: "Catalog request",
          press: "Exhibition / press",
        },
      },
    },
    manifesto: "\"Created with<br>passion and love\"",
    manifestoByline: "— Fanie Simon, Basel",
    footer: "Art catalogue · Basel, Switzerland · faniesimondesign@gmail.com",
    modal: {
      inquiryTitle: "Request this work",
      commissionTitle: "Request a related commission",
      detailsTitle: "Work details",
      notePrefix: "Note",
      sourcePrefix: "Source",
      close: "Close",
    },
  },
  de: {
    brandSubtitle: "Kunstkatalog",
    nav: { available: "Verfügbar", collaborations: "Kollaborationen", records: "Quellen", archive: "Archiv", contact: "Kontakt" },
    headerCta: "Katalog ansehen",
    hero: {
      kicker: "Basel · Schweiz",
      title: "Fanie Simon",
      text: "Holz · Ritual · Geometrie",
      primary: "Katalog entdecken",
      secondary: "Die Künstlerin",
    },
    about: {
      kicker: "Künstlerisches Statement",
      title: "Zwischen Basel und Tulum — eine Praxis aufgebaut auf Erinnerung, Geometrie und Wärme.",
      intro:
        "Fanie Simon schafft Holzreliefs, Mixed-Media-Skulpturen und individuelle Objekte für private Sammler und Innenräume. Ihre Praxis schöpft aus mesoamerikanischer Mythologie, heiliger Geometrie und der Materialität handgefertigter Oberflächen — sie verbindet die Präzision des Schweizer Handwerks mit der zeremoniellen Wärme ihrer Jahre in Tulum.",
      storyTitle: "Praxis",
      story1:
        "Jede Arbeit bewegt sich zwischen Relief, Skulptur und Objekt — aus der Ferne lesbar und aus der Nähe taktil. Die Geometrie trägt die Struktur; die Hand hinterlässt Wärme in jeder Oberfläche.",
      story2:
        "\"Meine Motivation ist es, den Menschen ein Lächeln ins Gesicht zu zaubern, wenn sie einen Raum betreten, in dem eines meiner Werke hängt.\" — Fanie Simon",
      materialsTitle: "Materialien",
      materials1:
        "Holz bildet die Grundlage jeder Arbeit. Spiegel, Glas, Seide, Trockenblumen, Epoxidharz, Stahl, Kassetten und Fundobjekte erweitern die Sprache — jedes Material gewählt für das, was es zur Oberfläche und zum Licht beiträgt.",
      materials2:
        "Die Balance zwischen Präzision und Weichheit macht jedes Stück sowohl als Sammlerobjekt als auch als ruhige, verfeinerte Präsenz in einem Wohn- oder Arbeitsraum wirksam.",
      factsKicker: "Ateliernotiz",
      quote: "\"Meine Motivation ist es, den Menschen ein Lächeln ins Gesicht zu zaubern, wenn sie einen Raum betreten, in dem eines meiner Werke hängt.\"",
      facts: {
        materialsLabel: "Materialien",
        materialsValue: "Holz, Spiegel, Glas, Seide, Blumen, Epoxidharz, Stahl, Kassetten",
        baseLabel: "Atelier",
        baseValue: "Basel, Schweiz",
        approachLabel: "Ansatz",
        approachValue: "Taktile Geometrie mit warmer Präsenz",
      },
    },
    sections: {
      catalogKicker: "Gesamtkatalog",
      catalogTitle: "Alle Werke.",
      catalogIntro: "Nach Status, Form oder Preis filtern. Jedes Werk ist ein Unikat.",
      contactKicker: "Kontakt",
      contactTitle: "Preis, Verfügbarkeit oder ein Auftragsbriefing anfragen.",
      contactIntro: "Das Atelier ist offen für private Verkäufe, Aufträge und Raumkollaborationen. Sprechen Sie uns direkt an.",
    },
    filters: {
      all: "Alle",
      circle: "Kreise",
      vertical: "Vertikal",
      square: "Quadrate",
      rectangle: "Rechtecke",
      other: "Andere",
      statusAll: "Alle Werke",
      available: "Verfügbar",
      collaboration: "Kollaborationen",
      sold: "Archiv",
      documented: "Quellen",
      priceAll: "Alle Preise",
      under500: "Unter CHF 500",
      range500to1500: "CHF 500–1.500",
      over1500: "Über CHF 1.500",
      uponRequest: "Preis auf Anfrage",
    },
    status: {
      available: "Verfügbar",
      collaboration: "Kollaboration",
      sold: "Verkauft",
      documented: "Quellnachweis",
      recovered: "Rekonstruierter Titel",
    },
    shapes: {
      circle: "Kreis",
      vertical: "Vertikal",
      square: "Quadrat",
      rectangle: "Rechteck",
      other: "Andere",
    },
    meta: {
      year: "Jahr",
      materials: "Materialien",
      dimensions: "Maße",
      price: "Preis",
      sourcePage: "Quellseite",
      inquire: "Anfragen",
      details: "Details",
      priceUponRequest: "Preis auf Anfrage",
      yearNotSpecified: "Jahr nicht angegeben",
      dimensionsNotSpecified: "Maße nicht angegeben",
    },
    contact: {
      cards: {
        email: "E-Mail",
        phone: "Telefon",
        website: "Website",
        studio: "Atelier",
        studioValue: "Basel, Schweiz",
      },
      form: {
        name: "Name",
        email: "E-Mail",
        type: "Anfrage",
        piece: "Werk",
        message: "Nachricht",
        submit: "E-Mail-Entwurf öffnen",
        note: "Das Formular öffnet eine vorausgefüllte E-Mail, damit der Katalog ohne Backend funktioniert.",
        placeholders: {
          name: "Ihr Name",
          email: "Ihre E-Mail",
          piece: "Werktitel oder Serie",
          message: "Beschreiben Sie Werk, Größe, Palette oder Projektkontext.",
        },
        types: {
          pricing: "Preis / Verfügbarkeit",
          commission: "Auftrag",
          catalog: "Kataloganfrage",
          press: "Ausstellung / Presse",
        },
      },
    },
    manifesto: "\"Mit Leidenschaft<br>und Liebe geschaffen\"",
    manifestoByline: "— Fanie Simon, Basel",
    footer: "Digitaler Kunstkatalog · Basel, Schweiz · faniesimondesign@gmail.com",
    modal: {
      inquiryTitle: "Dieses Werk anfragen",
      commissionTitle: "Ähnlichen Auftrag anfragen",
      detailsTitle: "Werkdetails",
      notePrefix: "Notiz",
      sourcePrefix: "Quelle",
      close: "Schließen",
    },
  },
  es: {
    brandSubtitle: "Catálogo de arte",
    nav: { available: "Disponibles", collaborations: "Colaboraciones", records: "Fuentes", archive: "Archivo", contact: "Contacto" },
    headerCta: "Ver catálogo",
    hero: {
      kicker: "Basilea · Suiza",
      title: "Fanie Simon",
      text: "Madera · Ritual · Geometría",
      primary: "Explorar el catálogo",
      secondary: "La artista",
    },
    about: {
      kicker: "Statement artístico",
      title: "Entre Basilea y Tulum, una práctica construida sobre la memoria, la geometría y el calor.",
      intro:
        "Fanie Simon crea relieves en madera, esculturas de técnica mixta y objetos personalizados para coleccionistas privados y espacios de interior. Su práctica se nutre de la mitología mesoamericana, la geometría sagrada y la materialidad de las superficies construidas a mano — combinando la precisión del oficio suizo con el calor ceremonial de sus años en Tulum.",
      storyTitle: "Práctica",
      story1:
        "Cada obra se mueve entre el relieve, la escultura y el objeto — legible desde el otro lado de la sala y profundamente táctil de cerca. La geometría sostiene la estructura; la mano deja calidez en cada superficie.",
      story2:
        "\"Mi motivación es dibujar una sonrisa en el rostro de las personas cuando entran en una habitación donde cuelga una de mis obras.\" — Fanie Simon",
      materialsTitle: "Materiales",
      materials1:
        "La madera es la base de cada obra. Espejo, vidrio, seda, flores secas, epoxi, acero, casetes y elementos encontrados amplían el lenguaje — cada material elegido por lo que aporta a la superficie y a la luz.",
      materials2:
        "El equilibrio entre precisión y suavidad hace que cada pieza funcione tanto como arte coleccionable como una presencia serena y refinada en un interior doméstico o profesional.",
      factsKicker: "Nota de estudio",
      quote: "\"Mi motivación es dibujar una sonrisa en el rostro de las personas cuando entran a un espacio donde cuelga una de mis obras.\"",
      facts: {
        materialsLabel: "Materiales",
        materialsValue: "Madera, espejo, vidrio, seda, flores, epoxi, acero, casetes",
        baseLabel: "Estudio",
        baseValue: "Basilea, Suiza",
        approachLabel: "Enfoque",
        approachValue: "Geometría táctil con calidez ceremonial",
      },
    },
    sections: {
      catalogKicker: "Catálogo completo",
      catalogTitle: "Todas las obras.",
      catalogIntro: "Filtra por estado, forma o precio. Cada pieza es única.",
      contactKicker: "Contacto",
      contactTitle: "Solicita precio, disponibilidad o un brief de comisión.",
      contactIntro: "El estudio está abierto a ventas privadas, encargos y colaboraciones de interior. Contáctenos directamente.",
    },
    filters: {
      all: "Todas",
      circle: "Círculos",
      vertical: "Verticales",
      square: "Cuadrados",
      rectangle: "Rectángulos",
      other: "Otras",
      statusAll: "Todas las obras",
      available: "Disponibles",
      collaboration: "Colaboraciones",
      sold: "Archivo",
      documented: "Registros",
      priceAll: "Cualquier precio",
      under500: "Menos de CHF 500",
      range500to1500: "CHF 500–1.500",
      over1500: "Más de CHF 1.500",
      uponRequest: "Precio a solicitud",
    },
    status: {
      available: "Disponible",
      collaboration: "Colaboración",
      sold: "Vendida",
      documented: "Registro de fuente",
      recovered: "Título recuperado",
    },
    shapes: {
      circle: "Círculo",
      vertical: "Vertical",
      square: "Cuadrado",
      rectangle: "Rectángulo",
      other: "Otra",
    },
    meta: {
      year: "Año",
      materials: "Materiales",
      dimensions: "Dimensiones",
      price: "Precio",
      sourcePage: "Página fuente",
      inquire: "Consultar",
      details: "Detalles",
      priceUponRequest: "Precio a solicitud",
      yearNotSpecified: "Año no especificado",
      dimensionsNotSpecified: "Dimensiones no especificadas",
    },
    contact: {
      cards: {
        email: "Correo",
        phone: "Teléfono",
        website: "Sitio web",
        studio: "Estudio",
        studioValue: "Basilea, Suiza",
      },
      form: {
        name: "Nombre",
        email: "Correo",
        type: "Tipo de consulta",
        piece: "Pieza",
        message: "Mensaje",
        submit: "Abrir borrador de correo",
        note: "El formulario abre un correo prellenado para que el sitio funcione sin backend.",
        placeholders: {
          name: "Tu nombre",
          email: "Tu correo",
          piece: "Título de la obra o serie",
          message: "Cuéntale al estudio qué pieza, escala, paleta o contexto de proyecto tienes en mente.",
        },
        types: {
          pricing: "Precio / disponibilidad",
          commission: "Comisión",
          catalog: "Solicitud de catálogo",
          press: "Exhibición / prensa",
        },
      },
    },
    manifesto: "\"Creada con<br>pasión y amor\"",
    manifestoByline: "— Fanie Simon, Basilea",
    footer: "Catálogo de arte digital · Basilea, Suiza · faniesimondesign@gmail.com",
    modal: {
      inquiryTitle: "Consultar esta obra",
      commissionTitle: "Solicitar una comisión relacionada",
      detailsTitle: "Detalles de la obra",
      notePrefix: "Nota",
      sourcePrefix: "Fuente",
      close: "Cerrar",
    },
  },
};

const materialTranslations = {
  de: {
    "Mixed media with wood": "Mischtechnik mit Holz",
    "Mixed media with wood, mirror, and steel frame": "Mischtechnik mit Holz, Spiegel und Stahlrahmen",
    "Mixed media with wood and steel frame": "Mischtechnik mit Holz und Stahlrahmen",
    "Mixed media with wood, dry flowers, and epoxy": "Mischtechnik mit Holz, Trockenblumen und Epoxidharz",
    "Mixed media with wood and silk fabric": "Mischtechnik mit Holz und Seidenstoff",
    "Mixed media with wood, mirrors, and silk fabric": "Mischtechnik mit Holz, Spiegeln und Seidenstoff",
    "Mixed media with wood and cassettes": "Mischtechnik mit Holz und Kassetten",
    "Mixed media with wood and glass": "Mischtechnik mit Holz und Glas",
    "Mixed media with wood and mirrors": "Mischtechnik mit Holz und Spiegeln",
  },
  es: {
    "Mixed media with wood": "Técnica mixta con madera",
    "Mixed media with wood, mirror, and steel frame": "Técnica mixta con madera, espejo y marco de acero",
    "Mixed media with wood and steel frame": "Técnica mixta con madera y marco de acero",
    "Mixed media with wood, dry flowers, and epoxy": "Técnica mixta con madera, flores secas y epoxi",
    "Mixed media with wood and silk fabric": "Técnica mixta con madera y seda",
    "Mixed media with wood, mirrors, and silk fabric": "Técnica mixta con madera, espejos y seda",
    "Mixed media with wood and cassettes": "Técnica mixta con madera y casetes",
    "Mixed media with wood and glass": "Técnica mixta con madera y vidrio",
    "Mixed media with wood and mirrors": "Técnica mixta con madera y espejos",
  },
};

const state = {
  language: safeStorage.get(STORAGE_KEY) && translations[safeStorage.get(STORAGE_KEY)] ? safeStorage.get(STORAGE_KEY) : "en",
  statusFilter: "all",
  shapeFilter: "all",
  priceFilter: "all",
  catalog: Array.isArray(window.__FANIE_CATALOG_FALLBACK__) ? window.__FANIE_CATALOG_FALLBACK__ : [],
};

const byId = (id) => document.getElementById(id);
const t = () => translations[state.language];
const assetUrl = (path) => `${path}${path.includes("?") ? "&" : "?"}v=${ASSET_VERSION}`;

const getMaterial = (materials) => materialTranslations[state.language]?.[materials] || materials || t().meta.priceUponRequest;
const getYear = (item) => (item.year ? String(item.year) : t().meta.yearNotSpecified);
const getDimensions = (item) => item.dimensions || t().meta.dimensionsNotSpecified;
const getPrice = (item) => item.price ? `CHF ${item.price.toLocaleString()}` : (item.status === "sold" ? t().status.sold : t().meta.priceUponRequest);
const getShape = (item) => t().shapes[item.shape] || item.shape;
const getStatus = (item) => t().status[item.status] || item.status;

const sections = {
  catalogGrid: byId("catalog-grid"),
};
const aboutPortrait = byId("about-portrait");

const languageSwitch = byId("language-switch");
const statusFilters = byId("status-filters");
const shapeFilters = byId("shape-filters");
const priceFilters = byId("price-filters");
const catalogCount = byId("catalog-count");
const inquiryForm = byId("inquiry-form");
const modal = byId("artwork-modal");
const modalContent = byId("modal-content");
let lastFocusedElement = null;

const STATUS_PRIORITY = { available: 0, documented: 1, collaboration: 2, sold: 3 };
const sortCatalog = (list) => [...list].sort((a, b) => {
  const pa = STATUS_PRIORITY[a.status] ?? 4;
  const pb = STATUS_PRIORITY[b.status] ?? 4;
  if (pa !== pb) return pa - pb;
  return (a.page || 999) - (b.page || 999) || a.title.localeCompare(b.title);
});

const filteredCatalog = () => {
  let items = [...state.catalog];

  if (state.statusFilter === "available") items = items.filter((i) => i.status === "available");
  else if (state.statusFilter === "collaboration") items = items.filter((i) => i.status === "collaboration");
  else if (state.statusFilter === "sold") items = items.filter((i) => i.status === "sold");
  else if (state.statusFilter === "documented") items = items.filter((i) => i.status === "documented" || i.sourceState === "recovered");

  if (state.shapeFilter !== "all") items = items.filter((i) => i.shape === state.shapeFilter);

  if (state.priceFilter === "under500") items = items.filter((i) => i.price && i.price < 500);
  else if (state.priceFilter === "500to1500") items = items.filter((i) => i.price && i.price >= 500 && i.price <= 1500);
  else if (state.priceFilter === "over1500") items = items.filter((i) => i.price && i.price > 1500);
  else if (state.priceFilter === "upon-request") items = items.filter((i) => !i.price && i.status !== "sold");

  return sortCatalog(items);
};

const renderLanguageSwitch = () => {
  languageSwitch.querySelectorAll("[data-lang]").forEach((button) => {
    const active = button.dataset.lang === state.language;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
};

const bindStaticCopy = () => {
  document.documentElement.lang = state.language;
  const copy = t();

  byId("brand-subtitle").textContent = copy.brandSubtitle;
  byId("nav-available").textContent = copy.nav.available;
  byId("nav-collaborations").textContent = copy.nav.collaborations;
  byId("nav-records").textContent = copy.nav.records;
  byId("nav-archive").textContent = copy.nav.archive;
  byId("nav-contact").textContent = copy.nav.contact;
  byId("header-cta").textContent = copy.headerCta;

  byId("hero-kicker").textContent = copy.hero.kicker;
  byId("hero-title").textContent = copy.hero.title;
  byId("hero-text").textContent = copy.hero.text;
  byId("hero-primary-cta").textContent = copy.hero.primary;
  byId("hero-secondary-cta").textContent = copy.hero.secondary;

  byId("about-kicker").textContent = copy.about.kicker;
  byId("about-title").textContent = copy.about.title;
  byId("about-intro").textContent = copy.about.intro;
  byId("about-story-title").textContent = copy.about.storyTitle;
  byId("about-story-1").textContent = copy.about.story1;
  byId("about-story-2").textContent = copy.about.story2;
  byId("about-materials-title").textContent = copy.about.materialsTitle;
  byId("about-materials-1").textContent = copy.about.materials1;
  byId("about-materials-2").textContent = copy.about.materials2;
  byId("facts-kicker").textContent = copy.about.factsKicker;
  byId("facts-quote").textContent = copy.about.quote;
  byId("facts-materials-label").textContent = copy.about.facts.materialsLabel;
  byId("facts-materials-value").textContent = copy.about.facts.materialsValue;
  byId("facts-base-label").textContent = copy.about.facts.baseLabel;
  byId("facts-base-value").textContent = copy.about.facts.baseValue;
  byId("facts-approach-label").textContent = copy.about.facts.approachLabel;
  byId("facts-approach-value").textContent = copy.about.facts.approachValue;
  if (aboutPortrait) {
    aboutPortrait.src = assetUrl("./source-database/images/fanie-simon-portrait.png");
    aboutPortrait.alt = "Fanie Simon portrait";
  }

  byId("catalog-kicker").textContent = copy.sections.catalogKicker;
  byId("catalog-title").textContent = copy.sections.catalogTitle;
  byId("catalog-intro").textContent = copy.sections.catalogIntro;
  byId("contact-kicker").textContent = copy.sections.contactKicker;
  byId("contact-title").textContent = copy.sections.contactTitle;
  byId("contact-intro").textContent = copy.sections.contactIntro;

  byId("contact-email-label").textContent = copy.contact.cards.email;
  byId("contact-phone-label").textContent = copy.contact.cards.phone;
  byId("contact-website-label").textContent = copy.contact.cards.website;
  byId("contact-studio-label").textContent = copy.contact.cards.studio;
  byId("contact-studio-value").textContent = copy.contact.cards.studioValue;

  byId("form-name-label").textContent = copy.contact.form.name;
  byId("form-email-label").textContent = copy.contact.form.email;
  byId("form-type-label").textContent = copy.contact.form.type;
  byId("form-piece-label").textContent = copy.contact.form.piece;
  byId("form-message-label").textContent = copy.contact.form.message;
  byId("form-submit").textContent = copy.contact.form.submit;
  byId("form-note").textContent = copy.contact.form.note;
  byId("form-name").placeholder = copy.contact.form.placeholders.name;
  byId("form-email").placeholder = copy.contact.form.placeholders.email;
  byId("form-piece").placeholder = copy.contact.form.placeholders.piece;
  byId("form-message").placeholder = copy.contact.form.placeholders.message;
  byId("form-type").innerHTML = `
    <option value="pricing">${copy.contact.form.types.pricing}</option>
    <option value="commission">${copy.contact.form.types.commission}</option>
    <option value="catalog">${copy.contact.form.types.catalog}</option>
    <option value="press">${copy.contact.form.types.press}</option>
  `;

  byId("manifesto-quote").innerHTML = copy.manifesto;
  byId("manifesto-byline").textContent = copy.manifestoByline;
  byId("footer-text").textContent = copy.footer;
};

const renderChips = (container, buttons, activeKey, filterAttr) => {
  container.innerHTML = buttons
    .map(([key, label]) => `<button class="filter-chip ${activeKey === key ? "is-active" : ""}" type="button" ${filterAttr}="${key}">${label}</button>`)
    .join("");
};

const renderStatusFilters = () => {
  const f = t().filters;
  renderChips(statusFilters, [
    ["all", f.statusAll],
    ["available", f.available],
    ["collaboration", f.collaboration],
    ["sold", f.sold],
    ["documented", f.documented],
  ], state.statusFilter, "data-status-filter");
};

const renderShapeFilters = () => {
  const f = t().filters;
  renderChips(shapeFilters, [
    ["all", f.all],
    ["circle", f.circle],
    ["vertical", f.vertical],
    ["square", f.square],
    ["rectangle", f.rectangle],
    ["other", f.other],
  ], state.shapeFilter, "data-shape-filter");
};

const renderPriceFilters = () => {
  const f = t().filters;
  renderChips(priceFilters, [
    ["all", f.priceAll],
    ["under500", f.under500],
    ["500to1500", f.range500to1500],
    ["over1500", f.over1500],
    ["upon-request", f.uponRequest],
  ], state.priceFilter, "data-price-filter");
};

const renderCatalogCount = () => {
  const list = filteredCatalog();
  const n = list.length;
  const word = state.language === "de" ? (n === 1 ? "Werk" : "Werke") : state.language === "es" ? (n === 1 ? "obra" : "obras") : (n === 1 ? "work" : "works");
  catalogCount.textContent = `${n} ${word}`;
};

const cardMarkup = (item) => {
  const image = item.imagePng ? `./${item.imagePng}` : (item.sourceImage || item.image || "");
  const note = item.note ? item.note : "";
  const status = getStatus(item);
  const sourceBadge = item.sourceState === "recovered" ? `<span class="source-pill">${t().status.recovered}</span>` : "";
  const title = item.title;

  return `
    <button class="catalog-card catalog-card--${item.shape}" type="button" data-artwork-id="${item.id}">
      <span class="catalog-card__stage">
        <span class="catalog-card__mat">
          ${
            image
              ? `<img src="${assetUrl(image)}" alt="${title} by Fanie Simon" loading="lazy" />`
              : `<span class="artwork-placeholder"><strong>${title}</strong></span>`
          }
        </span>
      </span>
      <span class="catalog-card__body">
        <span class="catalog-card__flags">
          <span class="status-pill status-pill--${item.status}">${status}</span>
          ${sourceBadge}
        </span>
        <strong class="catalog-card__title">${title}</strong>
        <span class="catalog-card__meta">${getYear(item)} · ${getMaterial(item.materials)}</span>
        <span class="catalog-card__meta">${getShape(item)} · ${getDimensions(item)}</span>
        <span class="catalog-card__footer">
          <span>${note || t().meta.details}</span>
          <strong>${getPrice(item)}</strong>
        </span>
      </span>
    </button>
  `;
};

const renderGrid = (grid, list) => {
  grid.innerHTML = list.map(cardMarkup).join("");
};

const renderAll = () => {
  bindStaticCopy();
  renderLanguageSwitch();
  renderStatusFilters();
  renderShapeFilters();
  renderPriceFilters();
  renderCatalogCount();
  renderGrid(sections.catalogGrid, filteredCatalog());
};

const buildInquiryHref = (item) => {
  const title =
    item.status === "sold"
      ? t().modal.commissionTitle
      : item.status === "documented"
        ? t().modal.detailsTitle
        : t().modal.inquiryTitle;

  const body = [
    "Hello Fanie Simon,",
    "",
    `I am interested in "${item.title}".`,
    `${t().meta.year}: ${getYear(item)}`,
    `${t().meta.materials}: ${getMaterial(item.materials)}`,
    `${t().meta.dimensions}: ${getDimensions(item)}`,
    `${t().meta.price}: ${getPrice(item)}`,
    "",
    item.status === "documented"
      ? "Please confirm the title, availability, and any missing catalogue details."
      : "Please share availability, pricing, and shipping details.",
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${title}: ${item.title}`)}&body=${encodeURIComponent(body)}`;
};

const openModal = (itemId) => {
  const item = state.catalog.find((record) => record.id === itemId);
  if (!item) return;

  lastFocusedElement = document.activeElement;
  const image = item.imagePng ? `./${item.imagePng}` : (item.sourceImage || item.image || "");

  modalContent.innerHTML = `
    <button class="modal__close" type="button" aria-label="${t().modal.close}" data-close-modal>&times;</button>
    <div class="modal__layout">
      <div class="modal__media">
        ${
          image
            ? `<div class="modal__stage"><img src="${assetUrl(image)}" alt="${item.title} by Fanie Simon" /></div>`
            : `<div class="modal__stage artwork-placeholder"><strong>${item.title}</strong></div>`
        }
      </div>
      <div class="modal__body">
        <div class="modal__flags">
          <span class="status-pill status-pill--${item.status}">${getStatus(item)}</span>
          ${item.sourceState === "recovered" ? `<span class="source-pill">${t().status.recovered}</span>` : ""}
        </div>
        <h2 class="modal__title" id="modal-title">${item.title}</h2>
        <p class="modal__note">${item.note || getMaterial(item.materials)}</p>
        <dl class="modal__meta">
          <div>
            <dt>${t().meta.year}</dt>
            <dd>${getYear(item)}</dd>
          </div>
          <div>
            <dt>${t().meta.materials}</dt>
            <dd>${getMaterial(item.materials)}</dd>
          </div>
          <div>
            <dt>${t().meta.dimensions}</dt>
            <dd>${getDimensions(item)}</dd>
          </div>
          <div>
            <dt>${t().meta.price}</dt>
            <dd>${getPrice(item)}</dd>
          </div>
          ${item.page ? `<div><dt>${t().meta.sourcePage}</dt><dd>${item.page}</dd></div>` : ""}
        </dl>
        <div class="modal__actions">
          <a class="button button--primary" href="${buildInquiryHref(item)}">
            ${item.status === "sold" ? t().modal.commissionTitle : item.status === "documented" ? t().modal.detailsTitle : t().modal.inquiryTitle}
          </a>
        </div>
      </div>
    </div>
  `;

  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => modal.querySelector("[data-close-modal]")?.focus());
};

const closeModal = () => {
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  modalContent.innerHTML = "";
  if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
};

const setupForm = () => {
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(inquiryForm);
    const subject = `Fanie Simon inquiry: ${formData.get("type") || ""}`;
    const body = [
      `Name: ${formData.get("name") || ""}`,
      `Email: ${formData.get("email") || ""}`,
      `Inquiry type: ${formData.get("type") || ""}`,
      `Piece: ${formData.get("piece") || ""}`,
      "",
      `${formData.get("message") || ""}`,
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
};

const setLanguage = (language) => {
  if (!translations[language]) return;
  state.language = language;
  safeStorage.set(STORAGE_KEY, language);
  renderAll();
};

const setStatusFilter = (status) => {
  state.statusFilter = status;
  renderStatusFilters();
  renderCatalogCount();
  renderGrid(sections.catalogGrid, filteredCatalog());
};

const setShapeFilter = (shape) => {
  state.shapeFilter = shape;
  renderShapeFilters();
  renderCatalogCount();
  renderGrid(sections.catalogGrid, filteredCatalog());
};

const setPriceFilter = (price) => {
  state.priceFilter = price;
  renderPriceFilters();
  renderCatalogCount();
  renderGrid(sections.catalogGrid, filteredCatalog());
};

const loadCatalog = async () => {
  try {
    const response = await fetch(CATALOG_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("Catalog data unavailable");
    const data = await response.json();
    return Array.isArray(data) && data.length ? data : state.catalog;
  } catch {
    return state.catalog;
  }
};

const initialize = async () => {
  try {
    renderAll();
    setupForm();
    state.catalog = await loadCatalog();
    renderAll();
    requestAnimationFrame(() => {
      if (typeof window.__afterRender === "function") window.__afterRender();
    });
  } catch (error) {
    console.error(error);
    byId("catalog-grid").innerHTML = `<p class="section-intro">Catalog data could not be loaded.</p>`;
  }
};

/* ── Mobile nav toggle ────────────────────────────────────────────── */
const navToggle = byId("nav-toggle");
const mobileNav = byId("mobile-nav");

const openMobileNav = () => {
  mobileNav.classList.add("is-open");
  mobileNav.setAttribute("aria-hidden", "false");
  navToggle.setAttribute("aria-expanded", "true");
  navToggle.classList.add("is-open");
  document.body.style.overflow = "hidden";
};

const closeMobileNav = () => {
  mobileNav.classList.remove("is-open");
  mobileNav.setAttribute("aria-hidden", "true");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.classList.remove("is-open");
  document.body.style.overflow = "";
};

navToggle.addEventListener("click", () => {
  mobileNav.classList.contains("is-open") ? closeMobileNav() : openMobileNav();
});

// Close when a nav link is clicked
mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});

document.addEventListener("click", (event) => {
  const langButton = event.target.closest("[data-lang]");
  if (langButton) {
    setLanguage(langButton.dataset.lang);
    if (mobileNav.classList.contains("is-open")) closeMobileNav();
    return;
  }

  const statusBtn = event.target.closest("[data-status-filter]");
  if (statusBtn) {
    setStatusFilter(statusBtn.dataset.statusFilter);
    return;
  }

  const shapeBtn = event.target.closest("[data-shape-filter]");
  if (shapeBtn) {
    setShapeFilter(shapeBtn.dataset.shapeFilter);
    return;
  }

  const priceBtn = event.target.closest("[data-price-filter]");
  if (priceBtn) {
    setPriceFilter(priceBtn.dataset.priceFilter);
    return;
  }

  const opener = event.target.closest("[data-artwork-id]");
  if (opener) {
    openModal(opener.dataset.artworkId);
    return;
  }

  if (event.target.closest("[data-close-modal]")) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
    closeModal();
  }
});

initialize();

/* ── Scroll reveal (IntersectionObserver) ─────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
);

const observeReveals = () => {
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
};

/* Re-observe after catalog renders (grids are injected dynamically) */
const originalRenderAll = renderAll;
const patchedRenderAll = () => {
  originalRenderAll();
  requestAnimationFrame(observeReveals);
};

/* ── Hero video parallax ──────────────────────────────────────────── */
const heroVideoWrap = document.querySelector(".hero-full__video-wrap");
const PARALLAX_FACTOR = parseFloat(heroVideoWrap?.dataset?.parallax ?? "0.35");

let ticking = false;
const onScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      if (heroVideoWrap) {
        const y = window.scrollY * PARALLAX_FACTOR;
        heroVideoWrap.style.transform = `translateY(${y}px)`;
      }
      ticking = false;
    });
    ticking = true;
  }
};
window.addEventListener("scroll", onScroll, { passive: true });


/* ── Initial reveal pass ─────────────────────────────────────────── */
observeReveals();

/* Stagger catalog card reveals when they enter view */
const cardGridObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const cards = entry.target.querySelectorAll(".catalog-card, .collab-family-piece");
      cards.forEach((card, i) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(28px)";
        card.style.transition = `opacity 0.55s ${i * 0.055}s cubic-bezier(0.16,1,0.3,1), transform 0.55s ${i * 0.055}s cubic-bezier(0.16,1,0.3,1)`;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          });
        });
      });
      cardGridObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.06 }
);

const observeCardGrids = () => {
  document.querySelectorAll(".catalog-grid, .collaboration-spread").forEach((grid) => {
    cardGridObserver.observe(grid);
  });
};

/* Hook into the existing renderAll so grids are observed after render */
const _renderAll = renderAll;
window.__afterRender = observeCardGrids;
observeCardGrids();
