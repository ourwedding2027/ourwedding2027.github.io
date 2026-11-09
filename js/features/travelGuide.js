function setDisclosure(button, content, isOpen, openLabel, closedLabel) {
  button.setAttribute("aria-expanded", String(isOpen));
  button.textContent = isOpen ? openLabel : closedLabel;
  if (isOpen) {
    content.hidden = false;
    requestAnimationFrame(() => content.classList.add("is-open"));
  } else {
    content.classList.remove("is-open");
    window.setTimeout(() => {
      if (button.getAttribute("aria-expanded") === "false") content.hidden = true;
    }, 360);
  }
}

export function initTravelGuide(t) {
  const map = document.querySelector(".travel-map");
  if (map) {
    const hideMissingMap = () => {
      map.hidden = true;
    };
    map.addEventListener("error", hideMissingMap, { once: true });
    if (map.complete && map.naturalWidth === 0) hideMissingMap();
  }

  const toggle = document.querySelector(".travel-toggle");
  const guide = document.getElementById("travel-guide-details");
  if (!toggle || !guide) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setDisclosure(
      toggle,
      guide,
      !isOpen,
      t("travel.close_guide"),
      t("travel.explore")
    );
  });

  const backButton = document.querySelector(".travel-guide-back");
  if (backButton) {
    backButton.addEventListener("click", () => {
      setDisclosure(
        toggle,
        guide,
        false,
        t("travel.close_guide"),
        t("travel.explore")
      );
      toggle.focus();
    });
  }

}
