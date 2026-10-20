
document.addEventListener("DOMContentLoaded", () => {
  const widget = document.querySelector("#beforeAfterWidget");

  if (!widget) return;

  const stage = widget.querySelector(".comparison-stage");
  const beforeLayer = widget.querySelector(".comparison-before-layer");
  const beforeImage = beforeLayer?.querySelector("img");
  const divider = widget.querySelector(".comparison-divider");
  const slider = widget.querySelector(".comparison-range");

  if (!stage || !beforeLayer || !beforeImage || !divider || !slider) {
    return;
  }

  function updateSlider() {
    const value = Number(slider.value);
    const width = stage.getBoundingClientRect().width;

    beforeLayer.style.width = `${value}%`;
    divider.style.left = `${value}%`;

    // Keep the before image aligned with the entire comparison frame.
    beforeImage.style.width = `${width}px`;

    slider.setAttribute(
      "aria-valuetext",
      `${value}% of the before image is visible`
    );
  }

  slider.addEventListener("input", updateSlider);

  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(updateSlider);
    observer.observe(stage);
  } else {
    window.addEventListener("resize", updateSlider);
  }

  updateSlider();
});
document.addEventListener("DOMContentLoaded", () => {
  const widget = document.querySelector("#beforeAfterWidget");
  if (!widget) return;

  const stage = widget.querySelector(".comparison-stage");
  const beforeLayer = widget.querySelector(".comparison-before-layer");
  const divider = widget.querySelector(".comparison-divider");
  const range = widget.querySelector(".comparison-range");

  if (!stage || !beforeLayer || !divider || !range) return;

  function updateComparison() {
    const value = Number(range.value);
    const isRTL = document.documentElement.dir === "rtl";

    beforeLayer.style.width = `${value}%`;

    if (isRTL) {
      beforeLayer.style.left = "auto";
      beforeLayer.style.right = "0";
      divider.style.left = "auto";
      divider.style.right = `${value}%`;
      divider.style.transform = "translateX(50%)";
    } else {
      beforeLayer.style.right = "auto";
      beforeLayer.style.left = "0";
      divider.style.right = "auto";
      divider.style.left = `${value}%`;
      divider.style.transform = "translateX(-50%)";
    }
  }

  range.addEventListener("input", updateComparison);

  // Update when the website switches between LTR and RTL.
  const observer = new MutationObserver(updateComparison);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["dir"]
  });

  updateComparison();
});
