function toggleCollapse(trigger) {
    const collapse = trigger.nextElementSibling;
  
    if (!collapse) {
      console.error("Collapse element not found for trigger:", trigger);
      return;
    }
  
    const collapseHeight = collapse.scrollHeight;
  
    if (trigger.getAttribute("aria-expanded") === "true") {
      closeCollapse(trigger, collapse, collapseHeight);
    } else {
      openCollapse(trigger, collapse, collapseHeight);
    }
  }
  
  function closeAllCollapses() {
    collapseTriggers.forEach((trigger) => {
      if (trigger.getAttribute("aria-expanded") === "true") {
        toggleCollapse(trigger);
      }
    });
  }
  
  const collapseTriggers = document.querySelectorAll("[collapse_trigger]");
  
  if (collapseTriggers.length === 0) {
    console.warn("No collapse triggers found in the DOM.");
  }
  
  function openCollapse(trigger, collapse, height) {
    trigger.classList.remove("after:text-slate-800/50");
    trigger.classList.add("after:rotate-180", "after:text-slate-800");
  
    if (!trigger.hasAttribute("active_primary")) {
      trigger.classList.add("dark:after:text-white");
      trigger.classList.remove("dark:after:text-white/50");
    }
  
    collapse.classList.remove("max-h-0");
    collapse.style.maxHeight = height + "px";
  
    if (trigger.getAttribute("collapse_trigger") === "secondary") {
      const collapseParent = trigger.closest("div");
      if (collapseParent) {
        const parentHeight = collapseParent.scrollHeight + height;
        collapseParent.style.maxHeight = parentHeight + "px";
      } else {
        console.error("Parent collapse element not found for trigger:", trigger);
      }
    }
  
    trigger.setAttribute("aria-expanded", "true");
  }
  
  function closeCollapse(trigger, collapse, height) {
    trigger.classList.remove("after:rotate-180", "after:text-slate-800");
    trigger.classList.add("after:text-slate-800/50");
  
    if (!trigger.hasAttribute("active_primary")) {
      trigger.classList.add("dark:after:text-white/50");
      trigger.classList.remove("dark:after:text-white");
    }
  
    collapse.removeAttribute("style");
    collapse.classList.add("max-h-0");
  
    if (trigger.getAttribute("collapse_trigger") === "secondary") {
      const collapseParent = trigger.closest("div");
      if (collapseParent) {
        const parentHeight = collapseParent.scrollHeight - height;
        collapseParent.style.maxHeight = Math.max(parentHeight, 0) + "px";
      } else {
        console.error("Parent collapse element not found for trigger:", trigger);
      }
    }
  
    trigger.setAttribute("aria-expanded", "false");
  }
  
  collapseTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      toggleCollapse(trigger);
    });
  });
  
  closeAllCollapses();
  
  // The rest of the code for setting up active pages
  
  document.addEventListener("DOMContentLoaded", () => {
    const pageNameParts = window.location.pathname.split("/").filter(Boolean);
  
    if (pageNameParts.length > 0) {
      const currentPage = pageNameParts.pop();
      const parentPage = pageNameParts.pop() || "";
      const rootPage = pageNameParts.pop() || "";
      const rootFolder = pageNameParts.pop() || "";
  
      let aHref;
  
      if (rootFolder === "pages") {
        aHref = `../../../pages/${rootPage}/${parentPage}/${currentPage}`;
      } else if (pageNameParts.includes("pages")) {
        aHref = `../../pages/${rootPage}/${parentPage}`;
      } else {
        aHref = "./pages/dashboards/default.html";
      }
  
      const activePage = document.querySelector(`a[href="${aHref}"]`);
  
      if (activePage) {
        activePage.setAttribute("active_page", "");
        const activeSecondary = activePage.closest("div")?.previousElementSibling;
  
        if (activeSecondary) {
          const activePrimary = activeSecondary.closest("div")?.previousElementSibling;
  
          if (activePrimary) {
            activePrimary.setAttribute("active_primary", "");
            activePrimary.nextElementSibling.style.maxHeight =
              activePrimary.nextElementSibling.scrollHeight +
              (activeSecondary.nextElementSibling?.scrollHeight || 0) +
              "px";
            activeSecondary.nextElementSibling.style.maxHeight =
              activeSecondary.nextElementSibling.scrollHeight + "px";
          }
        }
      } else {
        console.warn("Active page link not found for href:", aHref);
      }
    }
  });
  