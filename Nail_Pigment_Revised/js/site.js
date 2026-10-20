
/* =========================================================
   NAIL PIGMENT — SHARED SITE JAVASCRIPT
   File: js/site.js
   Updated: Transparent rose-pink logo for light and dark mode
   ========================================================= */

(() => {
  "use strict";

  /* ---------------------------------------------------------
     1. SVG ICONS
  --------------------------------------------------------- */

  const icon = (name) => ({
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',

    moon: '<path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"/><path d="M17 3v4m-2-2h4M21 9v3m-1.5-1.5h3"/>',

    rtl: '<path d="M3 7h17l-4-4m4 4-4 4M21 17H4l4 4m-4-4 4-4"/>',

    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',

    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',

    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',

    whatsapp: '<path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z"/><path d="M9 8.5c.5 2 2 3.5 4.5 4.5l1.2-1.2 2 1c-.2 1.4-1.2 2.2-2.6 2.1-3.8-.6-6.7-3.6-7.2-7.2C6.8 6.3 8 5.5 9 6l1 2Z"/>',

    x: '<path d="M4 4l16 16M20 4 4 20"/>',

    youtube: '<rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="m10 9 5 3-5 3Z"/>',

    phone: '<path d="M5 3h4l2 5-3 2a15 15 0 0 0 6 6l2-3 5 2v4c0 1-1 2-2 2C10 20 4 14 3 5c0-1 1-2 2-2Z"/>',

    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',

    pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',

    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',

    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',

    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>'
  }[name] || "");

  const svg = (name, cls = "icon-svg") =>
    `<svg class="${cls}" viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round">${icon(name)}</svg>`;

  /* ---------------------------------------------------------
     2. SHARED LOGO CONFIGURATION
     Same original logo in light and dark modes
  --------------------------------------------------------- */

  const LOGO_PATH = "images/logo/nail-pigment-logo.png";

  const updateBrandLogos = () => {
    document.querySelectorAll(".brand-logo").forEach((img) => {
      img.src = LOGO_PATH;
      img.alt = "Nail Pigment logo";
    });
  };

  /* ---------------------------------------------------------
     3. NAVIGATION
  --------------------------------------------------------- */

  const nav = [
    ["About Us", "about.html", "about"],
    ["Services", "services.html", "services"],
    ["Gallery", "gallery.html", "gallery"],
    ["Offers", "offers.html", "offers"],
    ["Contact", "contact.html", "contact"]
  ];

  const page = document.body.dataset.page || "home";

  const header = `
    <header class="site-header">
      <div class="header-inner">

        <a class="brand" href="index.html"
           aria-label="Nail Pigment home">
           

          <img class="brand-logo"
               src="${LOGO_PATH}"
               alt="Nail Pigment logo">

          <span class="brand-name">
            <span>Nail</span> <b>Pigment</b>
            <small class="brand-tagline">
              Where Beauty Meets Your Fingertips.
            </small>
          </span>
        </a>

        <nav class="main-nav" id="mainNav"
             aria-label="Main navigation">

          <div class="nav-dropdown">

            <button
              class="nav-drop-toggle ${
                page === "home" || page === "premium"
                  ? "current"
                  : ""
              }"
              type="button"
              aria-expanded="false"
              ${
                page === "home" || page === "premium"
                  ? 'aria-current="page"'
                  : ""
              }>
              Home
              ${svg("arrow", "nav-chevron")}
            </button>

            <div class="dropdown-menu">
              <a href="index.html"
                 class="${page === "home" ? "current" : ""}"
                 ${page === "home" ? 'aria-current="page"' : ""}>
                Home Classic
              </a>

              <a href="home-premium.html"
                 class="${page === "premium" ? "current" : ""}"
                 ${page === "premium" ? 'aria-current="page"' : ""}>
                Home Premium
              </a>
            </div>
          </div>

          ${nav.map(([label, url, key]) => `
            <a href="${url}"
               class="${page === key ? "current" : ""}"
               ${page === key ? 'aria-current="page"' : ""}>
              ${label}
            </a>
          `).join("")}

          <a class="btn btn-primary mobile-book" href="contact.html">
            ${svg("calendar")}
            <span>Book Appointment</span>
          </a>

        </nav>

        <div class="header-actions">

          <button
            class="icon-btn theme-control"
            id="themeToggle"
            type="button"
            aria-label="Switch to dark mode"
            title="Switch to dark mode">
            ${svg("sun")}
          </button>

          <button
            class="icon-btn"
            id="rtlToggle"
            type="button"
            aria-label="Toggle RTL layout"
            title="Toggle RTL layout">
            ${svg("rtl")}
          </button>

          <a class="btn btn-primary header-book"
             href="contact.html">
            ${svg("calendar")}
            <span>Book Appointment</span>
          </a>

          <button
            class="icon-btn menu-toggle"
            id="menuToggle"
            type="button"
            aria-label="Open menu"
            aria-expanded="false"
            aria-controls="mainNav">
            ${svg("menu")}
          </button>

        </div>
      </div>
    </header>
  `;

  /* ---------------------------------------------------------
     4. FOOTER
  --------------------------------------------------------- */

  const footer = `
    <footer class="site-footer">

      <div class="footer-top">

        <div class="footer-brand">

          <a class="brand footer-logo" href="index.html">
            <img class="brand-logo"
                 src="${LOGO_PATH}"
                 alt="Nail Pigment logo">

            <span class="brand-name">
              <span>Nail</span> <b>Pigment</b>
              <small class="brand-tagline">
                Where Beauty Meets Your Fingertips.
              </small>
            </span>
          </a>

          <p>
            Elevating self-expression through beautiful nails.
            Discover thoughtful nail care, artistic designs,
            and a relaxing beauty experience made just for you.
          </p>

          <div class="socials">
            <a href="#" aria-label="Instagram">${svg("instagram")}</a>
            <a href="#" aria-label="WhatsApp">${svg("whatsapp")}</a>
            <a href="#" aria-label="X / Twitter">${svg("x")}</a>
            <a href="#" aria-label="YouTube">${svg("youtube")}</a>
          </div>

        </div>

        <div class="footer-col">
          <h3>Quick Links</h3>
          <a href="index.html">Home Classic</a>
          <a href="home-premium.html">Home Premium</a>
          <a href="about.html">About Us</a>
          <a href="services.html">Services</a>
          <a href="gallery.html">Gallery</a>
          <a href="offers.html">Offers</a>
          <a href="contact.html">Contact</a>
        </div>

        <div class="footer-col">
          <h3>Our Services</h3>
          <a href="services.html">Manicure</a>
          <a href="services.html">Gel Extensions</a>
          <a href="services.html">Nail Art Designs</a>
          <a href="services.html">Nail Care</a>
          <a href="services.html">Custom Designs</a>
          <a href="services.html">Press on nails</a>


        </div>

        <div class="footer-col contact-col">
          <h3>Contact Us</h3>
          <p><span>${svg("phone")}</span>+91 XXXXXXXXXX</p>
          <p><span>${svg("mail")}</span>nailpigment@gmail.com</p>
          <p><span>${svg("pin")}</span>Hyderabad, Telengana, India </p>
          <p><span>${svg("clock")}</span>Monday – Saturday: 10:00 AM – 8:00 PM
Sunday: By appointment
</p>
        </div>

        <div class="footer-col newsletter">
          <h3>Newsletter</h3>
          <p>Get the latest nail trends, offers and beauty tips.</p>

          <form class="newsletter-form" id="newsletterForm">
            <label class="sr-only" for="newsletterEmail">
              Email address
            </label>

            <input
              id="newsletterEmail"
              type="email"
              placeholder="Enter your email"
              required>

            <button type="submit" aria-label="Subscribe">
              ${svg("send")}
            </button>
          </form>

          <p class="newsletter-feedback"
             id="newsletterFeedback"
             aria-live="polite"></p>
        </div>

      </div>

      <div class="footer-bottom">
        <span>
          © <span id="year"></span>
          Nail Pigment. All rights reserved.
        </span>

        <span>
          <a href="contact.html#policies">Privacy Policy</a>
          <a href="contact.html#policies">Terms &amp; Conditions</a>
          <a href="contact.html#policies">Cookie Policy</a>
        </span>
      </div>

    </footer>
  `;

  /* ---------------------------------------------------------
     5. INSERT SHARED HEADER AND FOOTER
  --------------------------------------------------------- */

  const headerContainer = document.getElementById("site-header");
  const footerContainer = document.getElementById("site-footer");

  if (headerContainer) {
    headerContainer.innerHTML = header;
  }

  if (footerContainer) {
    footerContainer.innerHTML = footer;
  }

  /* ---------------------------------------------------------
     6. LIGHT / DARK MODE
     Same transparent logo for both themes
  --------------------------------------------------------- */

  const html = document.documentElement;

  try {
    const savedTheme = localStorage.getItem("np-theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      html.dataset.theme = savedTheme;
    }
  } catch (error) {
    // Theme switching still works if storage is unavailable.
  }

  function applyTheme() {
    const isDark = html.dataset.theme === "dark";

    document.body.dataset.theme = isDark ? "dark" : "light";

    const themeButton = document.getElementById("themeToggle");

    if (themeButton) {
      themeButton.innerHTML = isDark ? svg("moon") : svg("sun");

      const label = isDark
        ? "Switch to light mode"
        : "Switch to dark mode";

      themeButton.setAttribute("aria-label", label);
      themeButton.setAttribute("title", label);
    }

    // Keep theme-specific decorative artwork working.
    document.querySelectorAll("[data-theme-art]").forEach((img) => {
      img.src = isDark
        ? "images/brand-art-dark.png"
        : "images/brand-art-light.png";
    });

    // Always use the new transparent pink logo.
    updateBrandLogos();
  }

  applyTheme();

  const themeToggle = document.getElementById("themeToggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      html.dataset.theme =
        html.dataset.theme === "dark" ? "light" : "dark";

      try {
        localStorage.setItem("np-theme", html.dataset.theme);
      } catch (error) {
        // The current page can still change themes.
      }

      applyTheme();
    });
  }

  /* ---------------------------------------------------------
     7. RTL / LTR TOGGLE
  --------------------------------------------------------- */

  const rtlToggle = document.getElementById("rtlToggle");

  try {
    const savedDirection = localStorage.getItem("np-dir");

    if (savedDirection === "rtl" || savedDirection === "ltr") {
      html.dir = savedDirection;
    }
  } catch (error) {
    // Ignore unavailable storage.
  }

  if (rtlToggle) {
    rtlToggle.addEventListener("click", () => {
      html.dir = html.dir === "rtl" ? "ltr" : "rtl";

      try {
        localStorage.setItem("np-dir", html.dir);
      } catch (error) {
        // Direction switching still works on this page.
      }
    });
  }

  /* ---------------------------------------------------------
     8. MOBILE MENU AND HOME DROPDOWN
  --------------------------------------------------------- */

  const navEl = document.getElementById("mainNav");
  const menuButton = document.getElementById("menuToggle");
  const dropdownButton = document.querySelector(".nav-drop-toggle");

  if (navEl && menuButton) {
    menuButton.addEventListener("click", () => {
      const isOpen = navEl.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );
      menuButton.innerHTML = svg(isOpen ? "x" : "menu");
    });
  }

  if (dropdownButton) {
    dropdownButton.addEventListener("click", () => {
      const parent = dropdownButton.closest(".nav-dropdown");

      if (!parent) return;

      const isOpen = parent.classList.toggle("open");

      dropdownButton.setAttribute("aria-expanded", String(isOpen));
    });
  }

  if (navEl) {
    navEl.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navEl.classList.remove("open");

        if (menuButton) {
          menuButton.setAttribute("aria-expanded", "false");
          menuButton.setAttribute("aria-label", "Open menu");
          menuButton.innerHTML = svg("menu");
        }
      });
    });
  }

  /* ---------------------------------------------------------
     9. FOOTER YEAR AND NEWSLETTER
  --------------------------------------------------------- */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const newsletterForm = document.getElementById("newsletterForm");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const feedback = document.getElementById("newsletterFeedback");

      if (feedback) {
        feedback.textContent =
          "Thanks — newsletter signup needs a mailing-list connection.";
      }

      newsletterForm.reset();
    });
  }

  /* ---------------------------------------------------------
     10. GALLERY CATEGORY FILTERS
  --------------------------------------------------------- */

  const galleryGrid = document.getElementById("galleryGrid");

  if (galleryGrid) {
    const filterButtons = [
      ...document.querySelectorAll("[data-filter]")
    ];

    const galleryCards = [
      ...galleryGrid.querySelectorAll("[data-category]")
    ];

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((item) => {
          const isActive = item === button;

          item.classList.toggle("active", isActive);
          item.setAttribute("aria-pressed", String(isActive));
        });

        galleryCards.forEach((card) => {
          const categories = (card.dataset.category || "").split(" ");

          card.hidden =
            filter !== "all" && !categories.includes(filter);
        });
      });
    });
  }

  /* ---------------------------------------------------------
     11. BOOKING FORM PREFILL AND VALIDATION
  --------------------------------------------------------- */

  const bookingForm = document.getElementById("bookingForm");

  if (bookingForm) {
    const params = new URLSearchParams(window.location.search);

    const serviceField = document.getElementById("bookingService");
    const messageField = document.getElementById("bookingMessage");
    const dateField = document.getElementById("bookingDate");

    // Prefill the requested service.
    if (serviceField && params.has("service")) {
      const requested = (params.get("service") || "").replace(/\+/g, " ");

      const matchingOption = [...serviceField.options].find((option) => {
        return (
          option.text.trim().toLowerCase() === requested.trim().toLowerCase() ||
          option.value.trim().toLowerCase() === requested.trim().toLowerCase()
        );
      });

      if (matchingOption) {
        serviceField.value = matchingOption.value;
      }
    }

    // Prefill gallery inspiration.
    if (messageField && params.has("design")) {
      messageField.value =
        `Design inspiration: ${(params.get("design") || "").replace(/\+/g, " ")}`;
    }

    // Prefill an offer code.
    if (messageField && params.has("offer")) {
      const offerCode = params.get("offer");

      messageField.value = messageField.value
        ? `${messageField.value}\nOffer code: ${offerCode}`
        : `Offer code: ${offerCode}`;
    }

    // Prefill a custom nail look.
    if (messageField && params.has("shape")) {
      const shape = params.get("shape");
      const finish = params.get("finish");
      const color = params.get("color");

      messageField.value +=
        `\nCustom nail look: shape ${shape || "not specified"}, ` +
        `finish ${finish || "not specified"}, ` +
        `color ${color || "not specified"}.`;
    }

    // Prevent selecting a date in the past.
    if (dateField) {
      const today = new Date();

      const localDate = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
      ].join("-");

      dateField.min = localDate;
    }

    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const message = document.getElementById("formMessage");

      if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        return;
      }

      if (message) {
        message.className = "form-message success";

        message.textContent =
          "Your request is valid in this demo. No booking was sent or saved; connect a booking service to receive real appointments.";
      }

      bookingForm.reset();

      if (serviceField) {
        serviceField.value = "";
      }
    });
  }

  /* ---------------------------------------------------------
     12. OFFERS PAGE — COPY PROMO CODE
  --------------------------------------------------------- */

  const copyButtons = document.querySelectorAll(".copy-code-btn");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const code = button.dataset.code;

      if (!code) return;

      const originalText = button.textContent;

      try {
        await navigator.clipboard.writeText(code);
        button.textContent = "Copied!";
      } catch (error) {
        // Fallback for browsers that block the Clipboard API.
        const temporaryInput = document.createElement("textarea");

        temporaryInput.value = code;
        temporaryInput.setAttribute("readonly", "");
        temporaryInput.style.position = "absolute";
        temporaryInput.style.left = "-9999px";

        document.body.appendChild(temporaryInput);
        temporaryInput.select();

        let copied = false;

        try {
          copied = document.execCommand("copy");
        } catch (copyError) {
          copied = false;
        }

        temporaryInput.remove();

        button.textContent = copied ? "Copied!" : code;
      }

      window.setTimeout(() => {
        button.textContent = originalText;
      }, 1800);
    });
  });

})();
/* =========================================================
   NAIL PIGMENT — INTERACTIVE FEATURES
   1. Home Classic nail-care quiz
   2. Home Premium nail customizer
   3. Booking selected nail look
   ========================================================= */

(() => {
  "use strict";

  /* =======================================================
     1. HOME CLASSIC — NAIL CARE QUIZ
     ======================================================= */

  const quizForm = document.getElementById("nail-care-form");

  if (quizForm) {
    const questions = [
      ...quizForm.querySelectorAll(".care-question")
    ];

    const nextButton = document.getElementById("care-quiz-next");
    const backButton = document.getElementById("care-quiz-back");
    const stepLabel = document.getElementById("care-quiz-step-label");
    const progressFill = document.getElementById("care-progress-fill");
    const errorMessage = document.getElementById("care-quiz-error");
    const resultPanel = document.getElementById("care-quiz-result");
    const resultTitle = document.getElementById("care-result-title");
    const resultDescription = document.getElementById(
      "care-result-description"
    );
    const restartButton = document.getElementById("care-quiz-restart");

    let currentStep = 0;

    const recommendations = {
      brittle: {
        title: "A gentle nail-care consultation",
        description:
          "Consider a natural manicure with careful shaping and moisturizing cuticle care. Ask a nail professional whether a strengthening overlay is suitable for your nails."
      },
      healthy: {
        title: "Your signature color manicure",
        description:
          "Explore a classic manicure or gel polish. Discuss preparation, professional removal and aftercare with your nail professional."
      },
      dry: {
        title: "A nourishing spa manicure",
        description:
          "A manicure with gentle exfoliation, hand massage and moisturizer may suit your preference for extra care. Cuticle oil can help soften dry cuticles."
      },
      longwear: {
        title: "Glossy gel manicure",
        description:
          "Gel polish offers a glossy finish cured under a suitable lamp. Follow professional application and removal advice, and avoid peeling off the polish."
      },
      natural: {
        title: "Classic natural manicure",
        description:
          "Choose gentle shaping, cuticle care and a natural finish. This is a lovely option if you prefer a simple, understated look."
      },
      salon: {
        title: "A polished salon finish",
        description:
          "A color manicure or gel finish can give your nails a polished look. Choose a shade and finish that suit your style."
      },
      spa: {
        title: "A relaxing spa manicure",
        description:
          "Consider a relaxing manicure with hand exfoliation, massage and moisturizing care for a pampering experience."
      }
    };

    function renderQuestion() {
      questions.forEach((question, index) => {
        question.hidden = index !== currentStep;
      });

      if (stepLabel) {
        stepLabel.textContent =
          `Question ${currentStep + 1} of ${questions.length}`;
      }

      if (progressFill) {
        progressFill.style.width =
          `${((currentStep + 1) / questions.length) * 100}%`;
      }

      if (backButton) {
        backButton.hidden = currentStep === 0;
      }

      if (nextButton) {
        nextButton.textContent =
          currentStep === questions.length - 1
            ? "Show my recommendation ↗"
            : "Next question ↗";
      }

      if (errorMessage) {
        errorMessage.hidden = true;
      }
    }

    function getAnswers() {
      return [
        ...quizForm.querySelectorAll('input[type="radio"]:checked')
      ].map((input) => input.value);
    }

    function showRecommendation() {
      const answers = getAnswers();

      // Use the checked answer values from the existing quiz.
      let recommendationKey = answers[0] || "natural";

      if (answers.includes("brittle")) {
        recommendationKey = "brittle";
      } else if (answers.includes("dry")) {
        recommendationKey = "dry";
      } else if (answers.includes("longwear")) {
        recommendationKey = "longwear";
      } else if (answers.includes("spa")) {
        recommendationKey = "spa";
      } else if (answers.includes("salon")) {
        recommendationKey = "salon";
      } else if (answers.includes("healthy")) {
        recommendationKey = "healthy";
      } else if (answers.includes("natural")) {
        recommendationKey = "natural";
      }

      const recommendation =
        recommendations[recommendationKey] || recommendations.natural;

      if (resultTitle) {
        resultTitle.textContent = recommendation.title;
      }

      if (resultDescription) {
        resultDescription.textContent = recommendation.description;
      }

      quizForm.hidden = true;

      if (resultPanel) {
        resultPanel.hidden = false;
      }
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        const currentQuestion = questions[currentStep];

        if (!currentQuestion) return;

        const hasAnswer = currentQuestion.querySelector(
          'input[type="radio"]:checked'
        );

        if (!hasAnswer) {
          if (errorMessage) {
            errorMessage.hidden = false;
            errorMessage.textContent =
              "Please choose an option before continuing.";
          }
          return;
        }

        if (currentStep < questions.length - 1) {
          currentStep += 1;
          renderQuestion();
        } else {
          showRecommendation();
        }
      });
    }

    if (backButton) {
      backButton.addEventListener("click", () => {
        if (currentStep > 0) {
          currentStep -= 1;
          renderQuestion();
        }
      });
    }

    if (restartButton) {
      restartButton.addEventListener("click", () => {
        currentStep = 0;
        quizForm.reset();
        quizForm.hidden = false;

        if (resultPanel) {
          resultPanel.hidden = true;
        }

        renderQuestion();
      });
    }

    renderQuestion();
  }


  /* =======================================================
     2. HOME PREMIUM — NAIL CUSTOMIZER
     ======================================================= */

  const hand = document.getElementById("customHand");

  if (hand) {
    const shapeSelect = document.getElementById("nailShape");
    const finishSelect = document.getElementById("nailFinish");
    const status = document.getElementById("builderStatus");
    const shapeLabel = document.getElementById("builderShapeLabel");
    const applyAllButton = document.getElementById("applyAllNails");
    const resetButton = document.getElementById("resetNails");
    const bookButton = document.getElementById("bookCustomLook");

    const nailTargets = [
      ...hand.querySelectorAll(".nail-target")
    ];

    const swatches = [
      ...document.querySelectorAll(".shade-swatch")
    ];

    const fingerButtons = [
      ...document.querySelectorAll("[data-select-finger]")
    ];

    const defaultColor = "#E75480";
    const defaultShape = "almond";
    const defaultFinish = "gloss";

    let selectedColor = defaultColor;
    let selectedFinger = "thumb";

    const fingerColors = {};

    nailTargets.forEach((nail) => {
      if (nail.dataset.finger) {
        fingerColors[nail.dataset.finger] = defaultColor;
      }
    });

    function updateStatus(message) {
      if (status) {
        status.textContent = message;
      }
    }

    function getNailColorTarget(nail) {
      // Supports SVG paths, polygons and other SVG nail shapes.
      if (nail.matches("path, polygon")) {
        return nail;
      }

      return nail.querySelector("path, polygon, ellipse");
    }

    function applyFingerColor(finger, color) {
      const nail = nailTargets.find(
        (item) => item.dataset.finger === finger
      );

      if (!nail) return;

      fingerColors[finger] = color;

      const target = getNailColorTarget(nail);

      if (target) {
        target.style.fill = color;
        target.setAttribute("fill", color);
      } else {
        nail.style.fill = color;
        nail.setAttribute("fill", color);
      }

      nail.dataset.color = color;
    }

    function setSelectedFinger(finger) {
      selectedFinger = finger;

      fingerButtons.forEach((button) => {
        const active = button.dataset.selectFinger === finger;

        button.classList.toggle("selected", active);
        button.setAttribute("aria-pressed", String(active));
      });

      nailTargets.forEach((nail) => {
        const active = nail.dataset.finger === finger;

        nail.classList.toggle("selected", active);
        nail.setAttribute("aria-pressed", String(active));
      });

      selectedColor = fingerColors[finger] || defaultColor;

      swatches.forEach((swatch) => {
        const active =
          swatch.dataset.color?.toLowerCase() ===
          selectedColor.toLowerCase();

        swatch.classList.toggle("selected", active);
        swatch.setAttribute("aria-pressed", String(active));
      });
    }

  
function applyShape(shape) {
  const shapePaths = {
    almond: [
      "M169 183 Q174 160 190 166 Q202 171 198 190 L188 218 Q176 224 167 214Z",
      "M211 129 Q215 103 230 108 Q244 112 240 133 L232 162 Q219 168 209 157Z",
      "M247 84 Q251 59 267 64 Q281 69 277 89 L269 120 Q255 126 245 114Z",
      "M290 105 Q295 82 310 88 Q324 94 319 114 L310 142 Q297 147 287 136Z",
      "M329 169 Q336 146 350 154 Q363 162 356 182 L347 205 Q335 210 326 199Z"
    ],
    oval: [
      "M169 183 Q169 163 184 163 Q199 163 198 183 L194 213 Q184 221 174 213Z",
      "M211 129 Q211 108 225 108 Q240 108 240 129 L237 158 Q226 166 215 158Z",
      "M247 84 Q247 64 262 64 Q278 64 278 84 L275 115 Q262 123 250 115Z",
      "M290 105 Q290 85 305 85 Q320 85 320 105 L316 135 Q304 143 293 135Z",
      "M329 169 Q329 150 343 150 Q358 150 357 169 L353 198 Q342 206 332 198Z"
    ],
    square: [
      "M169 183 L169 166 Q183 160 198 166 L198 213 L174 213Z",
      "M211 129 L211 111 Q225 105 240 111 L240 158 L215 158Z",
      "M247 84 L247 66 Q262 60 278 66 L278 115 L250 115Z",
      "M290 105 L290 87 Q305 81 320 87 L320 135 L293 135Z",
      "M329 169 L329 152 Q343 146 357 152 L357 198 L332 198Z"
    ],
    squoval: [
      "M169 183 Q169 165 178 164 L189 164 Q198 165 198 183 L194 212 Q184 219 174 212Z",
      "M211 129 Q211 110 220 109 L231 109 Q240 110 240 129 L237 157 Q226 164 215 157Z",
      "M247 84 Q247 65 256 65 L269 65 Q278 66 278 84 L275 114 Q262 121 250 114Z",
      "M290 105 Q290 86 299 86 L311 86 Q320 87 320 105 L316 134 Q304 141 293 134Z",
      "M329 169 Q329 151 338 151 L349 151 Q357 152 357 169 L353 197 Q342 204 332 197Z"
    ],
    coffin: [
      "M173 169 L194 169 L201 188 L187 216 L170 211 L164 190Z",
      "M215 111 L235 111 L243 130 L231 160 L214 156 L207 133Z",
      "M251 67 L273 67 L280 86 L268 118 L250 113 L243 91Z",
      "M294 89 L316 89 L323 108 L309 139 L293 134 L286 112Z",
      "M333 153 L353 153 L361 172 L347 202 L332 197 L325 179Z"
    ],
    stiletto: [
      "M181 158 Q192 160 199 185 L188 218 L167 214 L163 190Z",
      "M224 101 Q235 104 241 128 L232 162 L210 157 L207 133Z",
      "M262 55 Q273 59 279 83 L269 120 L246 114 L243 90Z",
      "M305 80 Q316 83 321 105 L310 142 L288 136 L286 112Z",
      "M344 144 Q355 148 359 169 L347 205 L327 199 L325 178Z"
    ]
  };

  const paths = shapePaths[shape];
  if (!paths) return;

  const nails = [...hand.querySelectorAll(".nail-target")];

  nails.forEach((nail, index) => {
    const base = nail.querySelector(".nail-base");
    const gloss = nail.querySelector(".nail-gloss");

    if (base && paths[index]) {
      base.setAttribute("d", paths[index]);
    }

    if (gloss && paths[index]) {
      gloss.setAttribute("d", paths[index]);
    }
  });

  hand.dataset.shape = shape;

  hand.classList.remove(
    "shape-almond",
    "shape-oval",
    "shape-square",
    "shape-squoval",
    "shape-coffin",
    "shape-stiletto",
    "shape-round"
  );

  hand.classList.add(`shape-${shape}`);

  if (shapeLabel) {
    const selectedOption = shapeSelect?.selectedOptions?.[0];
    shapeLabel.textContent =
      selectedOption?.textContent?.trim() || shape;
  }
}

    function applyFinish(finish) {
      hand.dataset.finish = finish;

      hand.classList.remove(
        "finish-gloss",
        "finish-matte",
        "finish-chrome",
        "finish-glitter",
        "finish-french"
      );

      hand.classList.add(`finish-${finish}`);
    }

    // Select a nail directly on the SVG.
    nailTargets.forEach((nail) => {
      nail.addEventListener("click", () => {
        const finger = nail.dataset.finger;

        if (!finger) return;

        setSelectedFinger(finger);
        updateStatus(
          `${finger.charAt(0).toUpperCase() + finger.slice(1)} selected. Choose a polish shade.`
        );
      });

      if (!nail.hasAttribute("tabindex")) {
        nail.setAttribute("tabindex", "0");
      }

      if (!nail.hasAttribute("role")) {
        nail.setAttribute("role", "button");
      }

      nail.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          nail.click();
        }
      });
    });

    // Select a finger using the finger buttons.
    fingerButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const finger = button.dataset.selectFinger;

        if (!finger) return;

        setSelectedFinger(finger);
        updateStatus(
          `${finger.charAt(0).toUpperCase() + finger.slice(1)} selected.`
        );
      });
    });

    // Select a polish shade.
    swatches.forEach((swatch) => {
      swatch.addEventListener("click", () => {
        const color = swatch.dataset.color;

        if (!color) return;

        selectedColor = color;
        applyFingerColor(selectedFinger, color);

        swatches.forEach((item) => {
          const active = item === swatch;

          item.classList.toggle("selected", active);
          item.setAttribute("aria-pressed", String(active));
        });

        updateStatus(
          `${swatch.getAttribute("aria-label") || color} applied to ${selectedFinger}.`
        );
      });
    });

    // Change the nail shape.
    if (shapeSelect) {
      shapeSelect.addEventListener("change", () => {
        applyShape(shapeSelect.value);
        updateStatus(`Nail shape changed to ${shapeSelect.value}.`);
      });
    }

    // Change the nail finish.
    if (finishSelect) {
      finishSelect.addEventListener("change", () => {
        applyFinish(finishSelect.value);
        updateStatus(`Nail finish changed to ${finishSelect.value}.`);
      });
    }

    // Apply the currently selected color to every nail.
    if (applyAllButton) {
      applyAllButton.addEventListener("click", () => {
        nailTargets.forEach((nail) => {
          const finger = nail.dataset.finger;

          if (finger) {
            applyFingerColor(finger, selectedColor);
          }
        });

        swatches.forEach((swatch) => {
          const active =
            swatch.dataset.color?.toLowerCase() ===
            selectedColor.toLowerCase();

          swatch.classList.toggle("selected", active);
          swatch.setAttribute("aria-pressed", String(active));
        });

        updateStatus("Selected polish shade applied to all nails.");
      });
    }

    // Reset the design to its defaults.
    if (resetButton) {
      resetButton.addEventListener("click", () => {
        selectedColor = defaultColor;

        nailTargets.forEach((nail) => {
          const finger = nail.dataset.finger;

          if (finger) {
            applyFingerColor(finger, defaultColor);
          }
        });

        if (shapeSelect) {
          shapeSelect.value = defaultShape;
        }

        if (finishSelect) {
          finishSelect.value = defaultFinish;
        }

        applyShape(defaultShape);
        applyFinish(defaultFinish);
        setSelectedFinger("thumb");

        updateStatus(
          "Design reset to rose-pink almond gloss."
        );
      });
    }

    // Carry the custom look to the booking form.
    function getBookingUrl() {
      const params = new URLSearchParams();

      params.set("service", "Custom Nail Design");
      params.set("shape", shapeSelect?.value || defaultShape);
      params.set("finish", finishSelect?.value || defaultFinish);
      params.set("color", selectedColor);

      return `contact.html?${params.toString()}`;
    }

    if (bookButton) {
      bookButton.href = getBookingUrl();

      bookButton.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = getBookingUrl();
      });
    }

    // Initial setup.
    nailTargets.forEach((nail) => {
      const finger = nail.dataset.finger;

      if (finger) {
        applyFingerColor(finger, defaultColor);
      }
    });

    if (shapeSelect) {
      applyShape(shapeSelect.value || defaultShape);
    }

    if (finishSelect) {
      applyFinish(finishSelect.value || defaultFinish);
    }

    setSelectedFinger("thumb");
  }


  /* =======================================================
     3. CONTACT PAGE — CUSTOM LOOK BOOKING DETAILS
     ======================================================= */

  const bookingForm = document.getElementById("bookingForm");

  if (bookingForm) {
    const params = new URLSearchParams(window.location.search);
    const serviceField = document.getElementById("bookingService");
    const messageField = document.getElementById("bookingMessage");

    if (serviceField && params.has("service")) {
      const requestedService = params.get("service") || "";

      const matchingOption = [
        ...serviceField.options
      ].find((option) => {
        return (
          option.value.toLowerCase() === requestedService.toLowerCase() ||
          option.textContent.trim().toLowerCase() ===
            requestedService.toLowerCase()
        );
      });

      if (matchingOption) {
        serviceField.value = matchingOption.value;
      }
    }

    const shape = params.get("shape");
    const finish = params.get("finish");
    const color = params.get("color");

    if (messageField && (shape || finish || color)) {
      const bookingDetails = [
        "Custom nail look:",
        `Shape: ${shape || "Not specified"}`,
        `Finish: ${finish || "Not specified"}`,
        `Polish color: ${color || "Not specified"}`
      ].join("\n");

      // Avoid adding duplicate details if the page is refreshed.
      if (!messageField.value.includes("Custom nail look:")) {
        messageField.value = messageField.value.trim()
          ? `${messageField.value.trim()}\n\n${bookingDetails}`
          : bookingDetails;
      }
    }
  }
})();
/* =====================================================
   NAIL PIGMENT — SINGLE FINGER / SINGLE NAIL CUSTOMIZER
===================================================== */
(() => {
  "use strict";

  function initOneNailStudio() {
    const root = document.querySelector("#np-one-studio");
    if (!root || root.dataset.oneInitialized === "true") return;
    root.dataset.oneInitialized = "true";

    const $ = selector => root.querySelector(selector);
    const $$ = selector => [...root.querySelectorAll(selector)];
    const svgNS = "http://www.w3.org/2000/svg";

    const nail = $("#np-one-nail");
    const artPath = $("#np-one-art-path");
    const artShapes = $("#np-one-art-shapes");
    const shine = $("#np-one-shine");
    const topcoat = $("#np-one-topcoat");

    const defaults = {
      shape: "almond",
      length: "medium",
      color: "#E75480",
      art: "plain",
      topping: "none",
      finish: "glossy",
      background: "#FBEAF0"
    };

    let state = { ...defaults };
    let savedDesigns = [];

    const palette = [
      ["#E75480", "Rose Pink"],
      ["#F4A7BB", "Baby Pink"],
      ["#D91E48", "Cherry Red"],
      ["#851B42", "Burgundy"],
      ["#C9A6E8", "Lilac"],
      ["#477BD1", "Blue"],
      ["#388C65", "Green"],
      ["#EAC6B7", "Nude"],
      ["#D4A64A", "Gold"],
      ["#252127", "Black"],
      ["#FFFFFF", "White"],
      ["#F28A46", "Orange"]
    ];

    const presets = {
      rose: {
        shape: "almond", length: "medium", color: "#E75480",
        art: "floral", topping: "heart", finish: "glossy"
      },
      french: {
        shape: "squoval", length: "medium", color: "#F4A7BB",
        art: "french", topping: "none", finish: "glossy"
      },
      berry: {
        shape: "coffin", length: "long", color: "#D91E48",
        art: "glitter", topping: "star", finish: "glitter"
      },
      lilac: {
        shape: "oval", length: "medium", color: "#C9A6E8",
        art: "floral", topping: "pearl", finish: "glossy"
      },
      glam: {
        shape: "almond", length: "long", color: "#851B42",
        art: "stars", topping: "gold", finish: "chrome"
      },
      minimal: {
        shape: "oval", length: "short", color: "#EAC6B7",
        art: "plain", topping: "none", finish: "matte"
      }
    };

    const pretty = value =>
      value.split("-").map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(" ");

    function notify(message) {
      $("#np-one-status").textContent = message;
    }

    function colorName(hex) {
      return palette.find(([color]) =>
        color.toLowerCase() === hex.toLowerCase()
      )?.[1] || "Custom Color";
    }

    function setAttributes(element, attributes) {
      Object.entries(attributes).forEach(([name, value]) => {
        element.setAttribute(name, value);
      });
    }

    function makeSvg(tag, attributes = {}) {
      const element = document.createElementNS(svgNS, tag);
      setAttributes(element, attributes);
      return element;
    }

  function nailPath(shape, length) {
  const height = {
    short: 58,
    medium: 76,
    long: 95,
    "extra-long": 120
  }[length] || 48;

  // Wider nail: was 23
  const width = 29;

  // The nail extends upward from the fingertip.
  // A small curved edge at y = 0 defines the free edge.
  const paths = {
    almond: `
      M ${-width} 0
      Q ${-width - 2} ${-height * 0.55} 0 ${-height}
      Q ${width + 2} ${-height * 0.55} ${width} 0
      Q 0 4 ${-width} 0 Z
    `,

    oval: `
      M ${-width} 0
      Q ${-width - 4} ${-height * 0.7} 0 ${-height}
      Q ${width + 4} ${-height * 0.7} ${width} 0
      Q 0 4 ${-width} 0 Z
    `,

    square: `
      M ${-width} 0
      L ${-width} ${-height + 6}
      Q ${-width} ${-height} ${-width + 6} ${-height}
      L ${width - 6} ${-height}
      Q ${width} ${-height} ${width} ${-height + 6}
      L ${width} 0
      Q 0 4 ${-width} 0 Z
    `,

    squoval: `
      M ${-width} 0
      L ${-width} ${-height + 9}
      Q ${-width} ${-height} ${-width + 9} ${-height}
      L ${width - 9} ${-height}
      Q ${width} ${-height} ${width} ${-height + 9}
      L ${width} 0
      Q 0 4 ${-width} 0 Z
    `,

    coffin: `
      M ${-width} 0
      L ${-width} ${-height + 13}
      L ${-width + 7} ${-height}
      L ${width - 7} ${-height}
      L ${width} ${-height + 13}
      L ${width} 0
      Q 0 4 ${-width} 0 Z
    `,

    stiletto: `
      M ${-width} 0
      Q ${-width - 2} ${-height * 0.35} 0 ${-height}
      Q ${width + 2} ${-height * 0.35} ${width} 0
      Q 0 4 ${-width} 0 Z
    `
  };

  return paths[shape] || paths.almond;
}

    function drawArt() {
      artPath.setAttribute("d", "");
      artPath.setAttribute("stroke", "#FFFFFF");
      artPath.setAttribute("stroke-width", "2.5");
      artPath.setAttribute("fill", "none");
      artShapes.replaceChildren();

      const add = (tag, attrs) => {
        const element = makeSvg(tag, attrs);
        artShapes.appendChild(element);
        return element;
      };

      switch (state.art) {
        case "french":
          artPath.setAttribute("d", "M -22 -8 Q 0 1 22 -8");
          artPath.setAttribute("stroke", "#FFFFFF");
          artPath.setAttribute("stroke-width", "5");
          break;

        case "glitter":
          [[-13,-12],[-5,-21],[8,-12],[12,-29],[0,-35],[-9,-37]]
            .forEach(([x,y], index) => {
              add("path", {
                d: `M ${x-2} ${y} L ${x+2} ${y} M ${x} ${y-2} L ${x} ${y+2}`,
                stroke: index % 2 ? "#FFFFFF" : "#F4D16B",
                "stroke-width": "1.8",
                "stroke-linecap": "round"
              });
            });
          break;

        case "floral":
          add("text", {
            x: 0, y: -13, "text-anchor": "middle",
            "font-size": "25", fill: "#FFFFFF"
          }).textContent = "✿";
          break;

        case "heart":
          add("text", {
            x: 0, y: -13, "text-anchor": "middle",
            "font-size": "24", fill: "#FFFFFF"
          }).textContent = "♥";
          break;

        case "stars":
          add("text", {
            x: 0, y: -13, "text-anchor": "middle",
            "font-size": "25", fill: "#F4D16B"
          }).textContent = "✦";
          break;

        case "dots":
          [[-12,-12],[-3,-20],[9,-12],[0,-31],[12,-34]]
            .forEach(([x,y]) =>
              add("circle", {
                cx: x, cy: y, r: 2,
                fill: "#FFFFFF"
              })
            );
          break;

        case "stripes":
          artPath.setAttribute(
            "d",
            "M -13 -12 L 13 -24 M -14 -27 L 14 -39 M -8 -42 L 8 -47"
          );
          break;

        case "marble":
          artPath.setAttribute(
            "d",
            "M -10 -8 Q 7 -16 -7 -25 T 9 -43"
          );
          artPath.setAttribute("stroke", "#FFFFFF");
          artPath.setAttribute("stroke-width", "2");
          break;

        case "ombre":
          add("path", {
            d: nailPath(state.shape, state.length),
            fill: "url(#np-one-ombre)",
            opacity: ".8"
          });
          break;
      }

      if (state.finish === "glitter") {
        [[-13,-15],[9,-23],[0,-37],[-5,-30],[13,-39]]
          .forEach(([x,y]) =>
            add("circle", {
              cx: x, cy: y, r: 1.5,
              fill: "#F4D16B"
            })
          );
      }
    }

    function drawTopping() {
      const topping = {
        none: "",
        heart: "♥",
        star: "✦",
        gem: "◆",
        pearl: "●",
        gold: "✧"
      }[state.topping] || "";

      const fill = ["gold", "star", "gem"].includes(state.topping)
        ? "#F4D16B"
        : "#FFFFFF";

      const element = makeSvg("text", {
        x: 0,
        y: -Math.max(13, ({
          short: 11, medium: 16, long: 21, "extra-long": 25
        })[state.length]),
        "text-anchor": "middle",
        "font-size": state.topping === "gem" ? 15 : 19,
        fill,
        stroke: state.topping === "pearl" ? "#E6C4D1" : "none",
        "stroke-width": ".6"
      });

      element.textContent = topping;
      artShapes.appendChild(element);
    }

    function renderNail() {
      const path = nailPath(state.shape, state.length);

      nail.setAttribute("d", path);
      topcoat.setAttribute("d", path);

      if (state.finish === "chrome") {
        nail.setAttribute("fill", "url(#np-one-chrome)");
        nail.setAttribute("stroke", "#D4A64A");
      } else {
        nail.setAttribute("fill", state.color);
        nail.setAttribute("stroke", "#C97B97");
      }

      if (state.finish === "matte") {
        shine.setAttribute("opacity", ".1");
      } else {
        shine.setAttribute("opacity", ".8");
      }

      if (state.finish === "chrome") {
        shine.setAttribute("opacity", "1");
      }

      shine.setAttribute("d",
        `M -11 -8 Q -16 ${-Math.min(
          ({short:17,medium:25,long:32,"extra-long":39})[state.length],
          ({short:24,medium:34,long:43,"extra-long":53})[state.length]
        )} -8 ${-Math.min(
          ({short:26,medium:37,long:47,"extra-long":56})[state.length],
          ({short:30,medium:43,long:53,"extra-long":65})[state.length]
        )}`
      );

      topcoat.setAttribute("opacity", state.finish === "glitter" ? ".12" : "0");

      drawArt();
      drawTopping();
    }

    function syncControls() {
      $$("[data-one-shape]").forEach(button =>
        button.classList.toggle("active", button.dataset.oneShape === state.shape)
      );

      $$("[data-one-length]").forEach(button =>
        button.classList.toggle("active", button.dataset.oneLength === state.length)
      );

      $$("[data-one-color]").forEach(button =>
        button.classList.toggle(
          "active",
          button.dataset.oneColor.toLowerCase() === state.color.toLowerCase()
        )
      );

      $$("[data-one-art]").forEach(button =>
        button.classList.toggle("active", button.dataset.oneArt === state.art)
      );

      $$("[data-one-topping]").forEach(button =>
        button.classList.toggle("active", button.dataset.oneTopping === state.topping)
      );

      $$("[data-one-finish]").forEach(button =>
        button.classList.toggle("active", button.dataset.oneFinish === state.finish)
      );

      $$("[data-one-bg]").forEach(button =>
        button.classList.toggle("active", button.dataset.oneBg === state.background)
      );

      $("#np-one-picker").value = state.color;
      $("#np-one-color-dot").style.background = state.color;
      $("#np-one-color-name").textContent = colorName(state.color);
      $("#np-one-hex").textContent = state.color.toUpperCase();

      $("#np-one-summary-swatch").style.background = state.color;
      $("#np-one-summary-swatch").textContent =
        ({none:"♡",heart:"♥",star:"✦",gem:"◆",pearl:"●",gold:"✧"})[state.topping];

      $("#np-one-summary-title").textContent =
        `${pretty(state.shape)} · ${pretty(state.length)}`;

      $("#np-one-summary-details").textContent =
        `${colorName(state.color)} · ${pretty(state.art)} · ${pretty(state.finish)}`;

      $("#np-one-summary-hex").textContent = state.color.toUpperCase();
      $("#np-one-canvas").style.background = state.background;
    }

    function render() {
      renderNail();
      syncControls();
    }

    function update(property, value) {
      state[property] = value;
      render();
      notify(`${pretty(property)} updated.`);
    }

    // Shape, length, color, art, toppings and finish.
    $$("[data-one-shape]").forEach(button =>
      button.addEventListener("click", () => update("shape", button.dataset.oneShape))
    );

    $$("[data-one-length]").forEach(button =>
      button.addEventListener("click", () => update("length", button.dataset.oneLength))
    );

    $$("[data-one-color]").forEach(button =>
      button.addEventListener("click", () => update("color", button.dataset.oneColor.toUpperCase()))
    );

    $("#np-one-picker").addEventListener("input", event =>
      update("color", event.target.value.toUpperCase())
    );

    $$("[data-one-art]").forEach(button =>
      button.addEventListener("click", () => update("art", button.dataset.oneArt))
    );

    $$("[data-one-topping]").forEach(button =>
      button.addEventListener("click", () => update("topping", button.dataset.oneTopping))
    );

    $$("[data-one-finish]").forEach(button =>
      button.addEventListener("click", () => update("finish", button.dataset.oneFinish))
    );

    $$("[data-one-bg]").forEach(button =>
      button.addEventListener("click", () => update("background", button.dataset.oneBg))
    );

    // Editor tabs.
    $$("[data-one-tab]").forEach(button => {
      button.addEventListener("click", () => {
        $$("[data-one-tab]").forEach(tab =>
          tab.classList.toggle("active", tab === button)
        );

        $$(".np-one-panel").forEach(panel =>
          panel.classList.toggle("active", panel.dataset.onePanel === button.dataset.oneTab)
        );
      });
    });

    // Inspiration / My Designs / Saved tabs.
    $$("[data-one-side]").forEach(button => {
      button.addEventListener("click", () => {
        $$("[data-one-side]").forEach(tab =>
          tab.classList.toggle("active", tab === button)
        );

        $$(".np-one-side-panel").forEach(panel =>
          panel.classList.toggle(
            "active",
            panel.dataset.oneSidePanel === button.dataset.oneSide
          )
        );
      });
    });

    // Reset all properties.
    $("[data-one-reset]").addEventListener("click", () => {
      state = { ...defaults };
      render();
      notify("Nail design reset.");
    });

    // Inspiration presets update the one nail only.
    $$("[data-one-preset]").forEach(button => {
      button.addEventListener("click", () => {
        const preset = presets[button.dataset.onePreset];
        if (!preset) return;

        state = {
          ...state,
          ...preset
        };

        render();
        notify(`${button.textContent.trim()} applied to your nail.`);
      });
    });

    // Save / load / delete designs in this page session.
    function renderSavedDesigns() {
      const targets = [
        $("#np-one-designs-list"),
        $("#np-one-saved-list")
      ];

      targets.forEach(list => {
        list.replaceChildren();

        if (!savedDesigns.length) {
          const empty = document.createElement("p");
          empty.className = "np-one-muted";
          empty.textContent = "No saved designs yet.";
          list.appendChild(empty);
          return;
        }

        savedDesigns.forEach((saved, index) => {
          const row = document.createElement("div");
          row.className = "np-one-saved-row";

          const swatch = document.createElement("span");
          swatch.style.cssText =
            `flex:0 0 18px;width:18px;height:18px;border-radius:50%;background:${saved.design.color}`;

          const name = document.createElement("span");
          name.textContent = saved.name;

          const load = document.createElement("button");
          load.type = "button";
          load.textContent = "Load";
          load.addEventListener("click", () => {
            state = { ...saved.design };
            render();
            notify("Saved design loaded.");
          });

          const remove = document.createElement("button");
          remove.type = "button";
          remove.textContent = "×";
          remove.setAttribute("aria-label", "Delete saved design");
          remove.addEventListener("click", () => {
            savedDesigns.splice(index, 1);
            renderSavedDesigns();
            notify("Saved design removed.");
          });

          row.append(swatch, name, load, remove);
          list.appendChild(row);
        });
      });
    }

    $$("[data-one-save]").forEach(button => {
      button.addEventListener("click", () => {
        savedDesigns.push({
          name: `Custom Look ${savedDesigns.length + 1}`,
          design: { ...state }
        });

        renderSavedDesigns();
        notify("Design saved for this session.");
      });
    });

    // Copy design details.
    $("[data-one-copy]").addEventListener("click", async () => {
      const details = [
        "NAIL PIGMENT — CUSTOM NAIL",
        `Shape: ${state.shape}`,
        `Length: ${state.length}`,
        `Color: ${state.color}`,
        `Nail art: ${state.art}`,
        `Topping: ${state.topping}`,
        `Finish: ${state.finish}`
      ].join("\n");

      try {
        if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
        await navigator.clipboard.writeText(details);
        notify("Design details copied.");
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = details;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        root.appendChild(textarea);
        textarea.select();

        try {
          const copied = document.execCommand("copy");
          notify(copied ? "Design details copied." : "Copy unavailable. Use Export design instead.");
        } catch {
          notify("Copy unavailable. Use Export design instead.");
        }

        textarea.remove();
      }
    });

    function exportText() {
      return [
        "NAIL PIGMENT — CUSTOM NAIL DESIGN",
        `Shape: ${state.shape}`,
        `Length: ${state.length}`,
        `Color: ${state.color}`,
        `Art: ${state.art}`,
        `Topping: ${state.topping}`,
        `Finish: ${state.finish}`,
        `Background: ${state.background}`
      ].join("\n");
    }

    function download(filename, contents, type) {
      const url = URL.createObjectURL(new Blob([contents], { type }));
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    $("[data-one-export]").addEventListener("click", () => {
      download(
        "nail-pigment-design.txt",
        exportText(),
        "text/plain;charset=utf-8"
      );
      notify("Design details exported.");
    });

    $("[data-one-download]").addEventListener("click", () => {
      const copy = $("#np-one-svg").cloneNode(true);
      copy.setAttribute("xmlns", svgNS);

      const svgText = new XMLSerializer().serializeToString(copy);

      download(
        "nail-pigment-design.svg",
        svgText,
        "image/svg+xml;charset=utf-8"
      );

      notify("SVG design downloaded.");
    });

    // Appointment enquiry.
    $("[data-one-book]").addEventListener("click", () => {
      const params = new URLSearchParams({
        service: "Custom Nail Design",
        shape: state.shape,
        length: state.length,
        color: state.color,
        art: state.art,
        topping: state.topping,
        finish: state.finish
      });

      window.location.href = `contact.html?${params.toString()}`;
    });

    render();
    renderSavedDesigns();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initOneNailStudio, { once: true });
  } else {
    initOneNailStudio();
  }
})();
