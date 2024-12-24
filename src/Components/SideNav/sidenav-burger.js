// sidenav transition-burger

document.addEventListener("DOMContentLoaded", () => {
  const sidenav = document.querySelector("aside");
  const sidenav_trigger = document.querySelector("[sidenav-trigger]");
  const sidenav_close_button = document.querySelector("[sidenav-close-btn]");

  if (!sidenav || !sidenav_trigger || !sidenav_close_button) {
    console.error("One or more sidenav elements are missing from the DOM.");
    return;
  }

  const sidenav_burger = sidenav_trigger.firstElementChild;
  const top_bread = sidenav_burger?.firstElementChild;
  const bottom_bread = sidenav_burger?.lastElementChild;

  if (!top_bread || !bottom_bread) {
    console.error("Sidenav burger elements are missing from the DOM.");
    return;
  }

  sidenav_trigger.addEventListener("click", function () {
    const isRtlPage = document.body.classList.contains("rtl-page");

    if (sidenav_trigger.getAttribute("aria-expanded") === "false") {
      sidenav_trigger.setAttribute("aria-expanded", "true");
      sidenav.classList.add(isRtlPage ? "translate-x-0" : "translate-x-0");
      sidenav.classList.remove(isRtlPage ? "-translate-x-full" : "translate-x-full");
      sidenav.classList.add("shadow-soft-xl");

      top_bread.classList.add(isRtlPage ? "translate-x-[5px]" : "-translate-x-[5px]");
      bottom_bread.classList.add(isRtlPage ? "translate-x-[5px]" : "-translate-x-[5px]");
    } else {
      sidenav_trigger.setAttribute("aria-expanded", "false");
      sidenav.classList.remove("translate-x-0");
      sidenav.classList.add(isRtlPage ? "-translate-x-full" : "translate-x-full");
      sidenav.classList.remove("shadow-soft-xl");

      top_bread.classList.remove(isRtlPage ? "translate-x-[5px]" : "-translate-x-[5px]");
      bottom_bread.classList.remove(isRtlPage ? "translate-x-[5px]" : "-translate-x-[5px]");
    }
  });

  sidenav_close_button.addEventListener("click", function () {
    sidenav_trigger.click();
  });

  window.addEventListener("click", function (e) {
    if (!sidenav.contains(e.target) && !sidenav_trigger.contains(e.target)) {
      if (sidenav_trigger.getAttribute("aria-expanded") === "true") {
        sidenav_trigger.click();
      }
    }
  });
});
