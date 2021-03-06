import throttle from 'lodash/throttle';
import q from '../../utilities/js/q';
import qa from '../../utilities/js/qa';
import getPosition from '../../utilities/js/position';

/**
 * @function HWStickyNav
 * @version 0.0.1
 * @desc Sticku navigation with hash navigation
 * @param {object} settings
 */

const HWStickyNav = ({
  selector = '[data-hw-sticky-nav]',
  linkSelector = '.hw-stickynav__link',
  activeItemClass = 'hw-stickynav__link--active',
} = {}) => {
  // Module settings object
  const SETTINGS = {
    navbarHeight: 71, // px
    element: q(selector), // All sticky DOM nodes
  };

  function updateLinks(activeLinkId) {
    const links = qa(linkSelector, SETTINGS.element);

    // Loop through links and set correct class
    links.forEach((link) => {
      if (link.getAttribute('href') === activeLinkId) {
        link.classList.add(activeItemClass);
      } else {
        link.classList.remove(activeItemClass);
      }
    });

    // Store currently active item to settings
    SETTINGS.currentItem = activeLinkId;
  }

  /**
   * @function checkPosition
   * @desc Check the scroll position and add active class to link(s)
   */
  function checkPosition() {
    const offset = window.pageYOffset + SETTINGS.navbarHeight;

    const match = SETTINGS.sections.find((section) => {
      return offset >= section.top && offset <= section.bottom;
    });

    // Check if there is no match (we're not within a section)
    if (!match) {
      return updateLinks();
    }

    // Check if we need to change the currently active item
    if (match.id !== SETTINGS.currentItem) {
      updateLinks(match.id);
    }
  }

  // Find and store section positions
  function findSectionPositions() {
    const links = qa(linkSelector, SETTINGS.element);
    SETTINGS.sections = links.map((link) => {
      const id = link.getAttribute('href');
      const el = q(id);
      const pos = getPosition(el);
      return {
        id,
        top: pos.top,
        bottom: pos.bottom,
      };
    });
  }

  function init() {
    if (!SETTINGS.element) {
      return;
    }

    // Skip if already initialised
    if (SETTINGS.element.getAttribute('data-hw-sticky-nav-initialised') === 'true') { return false; }

    // Mark as initialised
    SETTINGS.element.setAttribute('data-hw-sticky-nav-initialised', true);

    // Find all section positions
    findSectionPositions();

    // Add HW acceleration
    SETTINGS.element.style.willChange = 'top';

    // Attach event listeners
    window.addEventListener('scroll', throttle(checkPosition, 50));
    window.addEventListener('resize', throttle(() => {
      init();
      // findSectionPositions();
    }, 100));

    // Fire initial check (in case user starts halfway down page)
    checkPosition();
  }

  init();
};

HWStickyNav();
