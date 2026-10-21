const buttons = document.querySelectorAll(".button-tertiary");
const image = document.querySelector("#main-image");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const newImage = button.dataset.image;

    if (image) {
      image.src = newImage;
    }

    buttons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
  });
});


const tabs = document.querySelectorAll(".tab-button1");

tabs.forEach((tab) => {
  const button = tab.querySelector(".button-tertiary");

  if (button) {
    button.addEventListener("click", () => {

      tabs.forEach((item) => {
        if (item !== tab) {
          item.classList.remove("open");
        }
      });

      tab.classList.toggle("open");
    });
  }
});


// Navigazione mobile
const navigationButton = document.querySelector(".navigation-toggle");
const navigationLabel = document.querySelector(".navigation-label");
const navigationPanel = document.querySelector(".navigation-panel");

if (navigationButton && navigationLabel && navigationPanel) {

  const desktopMedia = window.matchMedia("(min-width: 1000px)");

  const supportsNavigation =
    "popover" in HTMLElement.prototype &&
    CSS.supports("top", "anchor(bottom)") &&
    CSS.supports("width", "anchor-size(width)");


  function updateNavigationLabel() {

    const text = navigationPanel.matches(":popover-open")
      ? "Chiudi menu"
      : "Apri menu";

    navigationButton.setAttribute("aria-label", text);
    navigationLabel.textContent = text;

  }


  function updateNavigationLayout() {

    if (desktopMedia.matches) {

      navigationButton.removeAttribute("popovertarget");
      navigationPanel.removeAttribute("popover");
      navigationButton.hidden = true;

    } else {

      navigationPanel.setAttribute("popover", "auto");
      navigationButton.setAttribute(
        "popovertarget",
        navigationPanel.id
      );
      navigationButton.hidden = false;

    }

    updateNavigationLabel();

  }


  if (supportsNavigation) {

    navigationPanel.addEventListener(
      "toggle",
      updateNavigationLabel
    );

    updateNavigationLayout();

  } else {

    navigationButton.removeAttribute("popovertarget");
    navigationPanel.removeAttribute("popover");
    navigationButton.hidden = true;

  }


  navigationPanel.addEventListener("click", function (event) {

    const link = event.target.closest('a[href^="#"]');

    if (
      !link ||
      event.defaultPrevented ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }


    const target = document.getElementById(
      link.hash.slice(1)
    );

    if (!target) return;


    if (
      supportsNavigation &&
      navigationPanel.matches(":popover-open")
    ) {
      navigationPanel.hidePopover();
    }

  });


  const skipLink = document.querySelector(".skip-link");

  if (skipLink) {

    skipLink.addEventListener("click", function () {

      const top = document.querySelector("#top");

      if (top) {
        top.focus();
      }

    });

  }


  desktopMedia.addEventListener("change", function () {

    if (!supportsNavigation) return;


    const focused = document.activeElement;

    const focusInNavigation =
      navigationPanel.contains(focused);

    const focusOnButton =
      focused === navigationButton;


    updateNavigationLayout();


    if (desktopMedia.matches && focusInNavigation) {

      focused.focus();

    } else if (
      desktopMedia.matches &&
      focusOnButton
    ) {

      const firstLink = navigationPanel.querySelector("a");

      if (firstLink) {
        firstLink.focus();
      }

    } else if (
      !desktopMedia.matches &&
      focusInNavigation
    ) {

      navigationButton.focus();

    }

  });

}
const navigationPanel = document.querySelector(".navigation-panel");
const navigationToggle = document.querySelector(".navigation-toggle");

if (navigationPanel && navigationToggle) {
  navigationToggle.addEventListener("click", () => {
    if (navigationPanel.matches(":popover-open")) {
      navigationPanel.hidePopover();
    }
  });
}