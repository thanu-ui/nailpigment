/* ==========================================
   NAIL PIGMENT — OFFERS PAGE
   External JavaScript only
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  initPromoCodeCopy();
});

/* COPY PROMO CODE */

function initPromoCodeCopy() {
  const copyButtons = document.querySelectorAll(".copy-code-btn");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const code = button.dataset.code;
      const originalText = button.textContent;

      if (!code) return;

      try {
        await navigator.clipboard.writeText(code);
        button.textContent = "Copied!";
      } catch (error) {
        button.textContent = code;
      }

      window.setTimeout(() => {
        button.textContent = originalText;
      }, 1800);
    });
  });
}