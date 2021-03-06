import q from '../../../shared/utilities/js/q';

/**
 * @function HWNavbar
 * @version 0.0.1
 * @desc Toggle classes for navbar
 * @param {object} settings
 */

const HWNavbar = ({
  navbarSelector = '.hw-navbar',
  menuButtonSelector = '[data-hw-toggle-menu]',
  searchButtonSelector = '[data-hw-toggle-search]',
  overlaySelector = '[data-hw-navbar-overlay]',
  hamburgerIcon = '[data-hw-menu-icon]',
  activeClass = 'hw-navbar--active',
  showSearchClass = 'hw-navbar--searching',
  activeHamburgerClass = 'hw-hamburger--active',
} = {}) => {

  // Module settings object
  const SETTINGS = {
    navbar: q(navbarSelector), // All navbar DOM nodes
    menuButton: q(menuButtonSelector),
    searchButton: q(searchButtonSelector),
    overlay: q(overlaySelector),
    hamburgerIcon: q(hamburgerIcon),
  };

  /**
   * @function toggleMenu
   * @desc Add class to menu button navigation
   */

  function toggleMenu() {
    if (SETTINGS.navbar.classList.contains(activeClass)) {
      SETTINGS.navbar.classList.remove(activeClass);
      SETTINGS.hamburgerIcon.classList.remove(activeHamburgerClass);
      return;
    }

    SETTINGS.navbar.classList.add(activeClass);
    SETTINGS.hamburgerIcon.classList.add(activeHamburgerClass);
  }

  function toggleSearch() {
    if (SETTINGS.navbar.classList.contains(showSearchClass)) {
      SETTINGS.navbar.classList.remove(showSearchClass);
      return;
    }

    SETTINGS.navbar.classList.add(showSearchClass);
  }

  function init() {
    if (!SETTINGS.navbar) {
      return;
    }

    // Skip if already initialised
    if (SETTINGS.menuButton) {
      if (SETTINGS.menuButton.getAttribute('data-hw-menu-initialised') === 'true') { return; }

      // Mark as initialised
      SETTINGS.menuButton.setAttribute('data-hw-menu-initialised', true);

      // Attach event listeners
      SETTINGS.menuButton.addEventListener('click', toggleMenu);
    }

    // Optional search button
    if (SETTINGS.searchButton) {
      SETTINGS.searchButton.addEventListener('click', toggleSearch);
      SETTINGS.overlay.addEventListener('click', toggleSearch);
    }
  }

  init();
};

HWNavbar();
