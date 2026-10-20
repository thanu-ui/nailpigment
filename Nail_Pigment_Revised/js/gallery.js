
document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.getElementById("galleryGrid");
  const galleryCount = document.getElementById("galleryCount");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryCards = [...document.querySelectorAll(".gallery-card")];

  const moodChoices = document.getElementById("moodChoices");
  const finishChoices = document.getElementById("finishChoices");
  const findVibeButton = document.getElementById("findVibe");
  const vibeStatus = document.getElementById("vibeStatus");
  const vibeResults = document.getElementById("vibeResults");
  const vibeResultGrid = document.getElementById("vibeResultGrid");
  const bookVibe = document.getElementById("bookVibe");
  const resetVibe = document.getElementById("resetVibe");

  const paletteModal = document.getElementById("paletteModal");
  const paletteTitle = document.getElementById("paletteTitle");
  const paletteDescription = document.getElementById("paletteDescription");
  const paletteSwatches = document.getElementById("paletteSwatches");

  let selectedMood = "";
  let selectedFinish = "";
  let lastFocusedElement = null;

  /* -------------------------
     GALLERY FILTERS
  ------------------------- */

  function applyFilter(filter) {
    let visibleCount = 0;

    galleryCards.forEach((card) => {
      const categories = (card.dataset.category || "").split(/\s+/);
      const matches = filter === "all" || categories.includes(filter);

      card.hidden = !matches;

      if (matches) visibleCount++;
    });

    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === filter;

      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    galleryCount.textContent =
      filter === "all"
        ? `${visibleCount} inspiration looks`
        : `${visibleCount} matching inspiration looks`;
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyFilter(button.dataset.filter);
    });
  });

  applyFilter("all");

  /* -------------------------
     SAVE LOOK
  ------------------------- */

  document.querySelectorAll(".save-look").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".gallery-card");
      const designName = card.dataset.design || "Nail design";
      const isSaved = button.dataset.saved === "true";

      button.dataset.saved = String(!isSaved);
      button.textContent = isSaved ? "Save Look" : "Saved";

      button.setAttribute(
        "aria-label",
        isSaved
          ? `Save ${designName}`
          : `${designName} saved in this page session`
      );
    });
  });

  /* -------------------------
     NAIL VIBE MATCHER
  ------------------------- */

  function setChoice(container, value) {
    container.querySelectorAll(".choice-btn").forEach((button) => {
      const isSelected = button.dataset.value === value;

      button.classList.toggle("selected", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });
  }

  function updateVibeButton() {
    findVibeButton.disabled = !(selectedMood && selectedFinish);

    if (selectedMood && selectedFinish) {
      vibeStatus.textContent = "Your choices are ready. Find your matching looks.";
    } else {
      vibeStatus.textContent = "Choose a mood and a finish to get started.";
    }
  }

  moodChoices.addEventListener("click", (event) => {
    const button = event.target.closest(".choice-btn");
    if (!button) return;

    selectedMood = button.dataset.value;
    setChoice(moodChoices, selectedMood);
    updateVibeButton();
  });

  finishChoices.addEventListener("click", (event) => {
    const button = event.target.closest(".choice-btn");
    if (!button) return;

    selectedFinish = button.dataset.value;
    setChoice(finishChoices, selectedFinish);
    updateVibeButton();
  });

  function findMatchingCards() {
    const exactMatches = galleryCards.filter((card) => {
      const moods = (card.dataset.mood || "").split(/\s+/);
      const finishes = (card.dataset.finish || "").split(/\s+/);

      return moods.includes(selectedMood) && finishes.includes(selectedFinish);
    });

    const moodMatches = galleryCards.filter((card) => {
      const moods = (card.dataset.mood || "").split(/\s+/);
      return moods.includes(selectedMood);
    });

    const finishMatches = galleryCards.filter((card) => {
      const finishes = (card.dataset.finish || "").split(/\s+/);
      return finishes.includes(selectedFinish);
    });

    const result = [...exactMatches];

    [...moodMatches, ...finishMatches, ...galleryCards].forEach((card) => {
      if (!result.includes(card) && result.length < 3) {
        result.push(card);
      }
    });

    return result.slice(0, 3);
  }

  function createVibeResult(card) {
    const result = document.createElement("article");
    result.className = "vibe-result";

    const image = document.createElement("img");
    image.src = card.querySelector("img").src;
    image.alt = card.querySelector("img").alt;
    image.loading = "lazy";

    const copy = document.createElement("div");
    copy.className = "vibe-result-copy";

    const heading = document.createElement("h4");
    heading.textContent = card.dataset.design || "Nail inspiration";

    const details = document.createElement("p");
    details.textContent =
      `${card.dataset.shape || "Shape to confirm"} · ` +
      `${card.dataset.technique || "Technique to confirm"}`;

    copy.append(heading, details);
    result.append(image, copy);

    return result;
  }

  findVibeButton.addEventListener("click", () => {
    if (!selectedMood || !selectedFinish) return;

    const matches = findMatchingCards();

    vibeResultGrid.replaceChildren();

    matches.forEach((card) => {
      vibeResultGrid.appendChild(createVibeResult(card));
    });

    const moodLabel = {
      minimal: "Cozy & Minimalist",
      bold: "Bold & Baddie",
      dreamy: "Soft & Dreamy",
      party: "Party Ready"
    };

    const finishLabel = {
      chrome: "Glassy Chrome",
      matte: "Matte Velvet",
      charms: "3D Charms",
      glaze: "Classic Glaze"
    };

    const selectedVibe =
      `${moodLabel[selectedMood]} · ${finishLabel[selectedFinish]}`;

    bookVibe.href =
      `contact.html?vibe=${encodeURIComponent(selectedVibe)}` +
      `&mood=${encodeURIComponent(moodLabel[selectedMood])}` +
      `&finish=${encodeURIComponent(finishLabel[selectedFinish])}`;

    vibeResults.hidden = false;
    vibeStatus.textContent = `Your selection: ${selectedVibe}`;

    vibeResults.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "nearest"
    });
  });

  resetVibe.addEventListener("click", () => {
    selectedMood = "";
    selectedFinish = "";

    setChoice(moodChoices, "");
    setChoice(finishChoices, "");

    vibeResults.hidden = true;
    vibeResultGrid.replaceChildren();

    updateVibeButton();
  });

  /* -------------------------
     COLOR PALETTE MODAL
  ------------------------- */

  const palettePresets = [
    { color: "#F3D8E2", label: "Sheer milky pink" },
    { color: "#D99AB6", label: "Blush rose accent" },
    { color: "#F8EDF2", label: "Glossy top-coat inspiration" }
  ];

  function buildPalette(description) {
    const lower = description.toLowerCase();

    if (lower.includes("lavender")) {
      return [
        { color: "#E9DDF2", label: "Milky base" },
        { color: "#B7A0D0", label: "Lavender accent" },
        { color: "#F7F1FA", label: "Glossy finish" }
      ];
    }

    if (lower.includes("french")) {
      return [
        { color: "#F3DCE5", label: "Sheer pink base" },
        { color: "#FFFDFB", label: "Soft white tip" },
        { color: "#F5EAF0", label: "Glossy finish" }
      ];
    }

    if (lower.includes("pearl")) {
      return [
        { color: "#F4DDE8", label: "Milky pink base" },
        { color: "#FFFDF8", label: "Pearl-inspired accents" },
        { color: "#E9D3DE", label: "Glossy finish" }
      ];
    }

    if (lower.includes("gold")) {
      return [
        { color: "#E9B6C8", label: "Rose pink base" },
        { color: "#C99A72", label: "Rose-gold-inspired accent" },
        { color: "#F8E8EE", label: "Glossy finish" }
      ];
    }

    if (lower.includes("matte")) {
      return [
        { color: "#EBC9D7", label: "Blush base" },
        { color: "#B56C88", label: "Muted rose accent" },
        { color: "#D8A8B9", label: "Matte finish inspiration" }
      ];
    }

    return palettePresets;
  }

  function openPalette(card) {
    lastFocusedElement = document.activeElement;

    const design = card.dataset.design || "Nail design";
    const description = card.dataset.palette || "Palette to be confirmed.";

    paletteTitle.textContent = design;
    paletteDescription.textContent = description;
    paletteSwatches.replaceChildren();

    buildPalette(description).forEach((swatch) => {
      const row = document.createElement("div");
      row.className = "palette-swatch";

      const color = document.createElement("span");
      color.className = "palette-color";
      color.style.backgroundColor = swatch.color;
      color.setAttribute("aria-hidden", "true");

      const textWrap = document.createElement("div");

      const label = document.createElement("strong");
      label.textContent = swatch.label;

      const hex = document.createElement("small");
      hex.textContent = swatch.color.toUpperCase();

      textWrap.append(label, hex);
      row.append(color, textWrap);
      paletteSwatches.appendChild(row);
    });

    paletteModal.hidden = false;
    document.body.style.overflow = "hidden";

    paletteModal.querySelector(".palette-close").focus();
  }

  function closePalette() {
    paletteModal.hidden = true;
    document.body.style.overflow = "";

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  galleryGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".palette-open");
    if (!button) return;

    const card = button.closest(".gallery-card");
    if (card) openPalette(card);
  });

  paletteModal.querySelectorAll("[data-close-palette]").forEach((button) => {
    button.addEventListener("click", closePalette);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !paletteModal.hidden) {
      closePalette();
    }
  });
});

/* =========================================
   GALLERY FULL-SCREEN IMAGE PREVIEW
========================================= */

(() => {
  const lightbox = document.getElementById("galleryLightbox");
  const previewImage = document.getElementById("galleryLightboxImage");
  const caption = document.getElementById("galleryLightboxCaption");
  const closeButton = document.getElementById("galleryLightboxClose");
  const previousButton = document.getElementById("galleryLightboxPrev");
  const nextButton = document.getElementById("galleryLightboxNext");
  const galleryGrid = document.getElementById("galleryGrid");

  if (
    !lightbox ||
    !previewImage ||
    !caption ||
    !closeButton ||
    !previousButton ||
    !nextButton ||
    !galleryGrid
  ) return;

  let currentIndex = 0;
  let visibleCards = [];
  let previouslyFocused = null;

  function refreshImages() {
    visibleCards = Array.from(
      galleryGrid.querySelectorAll(".gallery-card")
    ).filter(card => !card.hidden);
  }

  function showImage(index) {
    refreshImages();

    if (!visibleCards.length) return;

    currentIndex = (index + visibleCards.length) % visibleCards.length;

    const card = visibleCards[currentIndex];
    const image = card.querySelector("img");
    const title = card.dataset.design ||
      card.querySelector("h3")?.textContent.trim() ||
      image?.alt ||
      "Nail art inspiration";

    if (!image) return;

    previewImage.src = image.currentSrc || image.src;
    previewImage.alt = image.alt || title;
    caption.textContent = title;

    previousButton.hidden = visibleCards.length < 2;
    nextButton.hidden = visibleCards.length < 2;
  }

  function openLightbox(card) {
    refreshImages();

    const index = visibleCards.indexOf(card);
    if (index < 0) return;

    previouslyFocused = document.activeElement;
    showImage(index);

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    previewImage.removeAttribute("src");

    if (previouslyFocused && previouslyFocused.isConnected) {
      previouslyFocused.focus();
    }
  }

  galleryGrid.addEventListener("click", event => {
    // Don't open the preview when clicking buttons or booking links.
    if (event.target.closest(".gallery-card-actions")) return;

    const card = event.target.closest(".gallery-card");
    if (!card || !card.querySelector("img")) return;

    openLightbox(card);
  });

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
  });

  previousButton.addEventListener("click", () => {
    showImage(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    showImage(currentIndex + 1);
  });

  document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("is-open")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showImage(currentIndex - 1);
    if (event.key === "ArrowRight") showImage(currentIndex + 1);
  });

})();
