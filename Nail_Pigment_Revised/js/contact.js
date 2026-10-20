
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  const dateInput = document.getElementById("bookingDate");
  const photoInput = document.getElementById("inspirationPhoto");
  const fileMessage = document.getElementById("fileMessage");
  const formMessage = document.getElementById("formMessage");
  const messageInput = document.getElementById("bookingMessage");

  const designInput = document.getElementById("bookingDesign");
  const vibeInput = document.getElementById("bookingVibe");
  const moodInput = document.getElementById("bookingMood");
  const finishInput = document.getElementById("bookingFinish");

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  /* -------------------------
     DATE: BLOCK PAST DATES
  ------------------------- */

  function getLocalDateString() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  dateInput.min = getLocalDateString();

  dateInput.addEventListener("change", () => {
    if (dateInput.value && dateInput.value < getLocalDateString()) {
      dateInput.setCustomValidity("Please choose today or a future date.");
    } else {
      dateInput.setCustomValidity("");
    }

    dateInput.reportValidity();
  });

  /* -------------------------
     GALLERY / VIBE PREFILL
  ------------------------- */

  const params = new URLSearchParams(window.location.search);

  const requestedDesign = params.get("design") || "";
  const requestedVibe = params.get("vibe") || "";
  const requestedMood = params.get("mood") || "";
  const requestedFinish = params.get("finish") || "";
  const requestedService = params.get("service") || "";

  designInput.value = requestedDesign;
  vibeInput.value = requestedVibe;
  moodInput.value = requestedMood;
  finishInput.value = requestedFinish;

  /*
   * Map general Gallery service labels to the closest
   * available booking-form option. Do not invent a price.
   */

  const serviceAliases = {
    "manicure": "Classic Refresh Mani",
    "gel extensions": "Soft Gel Extensions (Gel-X)",
    "custom nail art": "Classic Refresh Mani",
    "bridal nails": "Classic Refresh Mani",
    "nail care": "Classic Refresh Mani",
    "removal / repair enquiry": "Removal / Maintenance Only"
  };

  if (requestedService) {
    const serviceSelect = document.getElementById("bookingService");
    const options = [...serviceSelect.options];

    const exactOption = options.find(
      (option) =>
        option.value.toLowerCase() === requestedService.toLowerCase() ||
        option.textContent.trim().toLowerCase() === requestedService.toLowerCase()
    );

    const alias = serviceAliases[requestedService.toLowerCase()];

    const mappedOption = options.find(
      (option) =>
        option.value.toLowerCase() === (alias || "").toLowerCase()
    );

    if (exactOption) {
      serviceSelect.value = exactOption.value;
    } else if (mappedOption) {
      serviceSelect.value = mappedOption.value;

      /*
       * Keep the original requested service visible in the notes
       * because a general label may not exactly match the menu.
       */
      addNote(
        `Original Gallery service request: ${requestedService}. ` +
        "Please confirm the suitable service with the studio."
      );
    } else {
      addNote(`Requested service: ${requestedService}`);
    }
  }

  if (requestedDesign) {
    addNote(`Design inspiration: ${requestedDesign}`);
  }

  if (requestedVibe) {
    addNote(`Preferred nail vibe: ${requestedVibe}`);
  }

  if (requestedMood) {
    addNote(`Mood: ${requestedMood}`);
  }

  if (requestedFinish) {
    addNote(`Preferred finish: ${requestedFinish}`);
  }

  function addNote(note) {
    const current = messageInput.value.trim();

    if (current.includes(note)) return;

    messageInput.value = current
      ? `${current}\n${note}`
      : note;
  }

  /* -------------------------
     PHOTO VALIDATION
  ------------------------- */

  photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];

    fileMessage.textContent = "";
    fileMessage.className = "field-hint";

    if (!file) {
      fileMessage.textContent =
        "No photo selected. Adding an inspiration image is optional.";
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    if (!allowedTypes.includes(file.type)) {
      photoInput.value = "";

      fileMessage.textContent =
        "Unsupported file. Please choose a JPG, PNG or WebP image.";

      fileMessage.classList.add("error");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      photoInput.value = "";

      fileMessage.textContent =
        "This image exceeds 5 MB. Choose a smaller file.";

      fileMessage.classList.add("error");
      return;
    }

    fileMessage.textContent =
      `Selected: ${file.name} · ${(file.size / (1024 * 1024)).toFixed(2)} MB. ` +
      "This demo does not upload it.";

    fileMessage.classList.add("success");
  });

  /* -------------------------
     FORM VALIDATION
  ------------------------- */

  form.addEventListener("input", () => {
    if (formMessage.textContent) {
      formMessage.textContent = "";
      formMessage.className = "form-message";
    }
  });

  form.addEventListener("change", () => {
    if (formMessage.textContent) {
      formMessage.textContent = "";
      formMessage.className = "form-message";
    }
  });

  /* -------------------------
     DEMO FORM SUBMISSION
  ------------------------- */

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    formMessage.textContent = "";
    formMessage.className = "form-message";

    if (!form.checkValidity()) {
      form.reportValidity();

      formMessage.textContent =
        "Please complete all required fields and check your selections.";

      formMessage.classList.add("error");
      return;
    }

    if (dateInput.value < getLocalDateString()) {
      dateInput.setCustomValidity("Please choose today or a future date.");
      dateInput.reportValidity();

      formMessage.textContent =
        "Your preferred date must be today or a future date.";

      formMessage.classList.add("error");
      return;
    }

    dateInput.setCustomValidity("");

    /*
     * Front-end demonstration only.
     * No personal details or photo are sent to a server.
     */

    formMessage.textContent =
      "Your form passed the local checks. This is only a demo: " +
      "no appointment request was sent. Connect a secure booking service " +
      "to receive and confirm real requests.";

    formMessage.classList.add("success");
  });
});
