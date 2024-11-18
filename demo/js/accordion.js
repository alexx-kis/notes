// $======================== ACCORDION ========================$ //
const ACCORDION_CLASS = 'accordion';
const ACCORDION_TAB_CLASS = 'accordion__tab';
const ACTIVE_CLASS = '_active';

const initAccordion = (accordion) => {
  /// functions to open and close tabs
  const openTab = (tab) => {
    tab.classList.add(ACTIVE_CLASS);
  };

  const closeTab = (tab) => {
    tab.classList.remove(ACTIVE_CLASS);
  };

  /// open default active tab
  const defaultActiveTab = accordion.querySelector(`.${ACCORDION_TAB_CLASS}.${ACTIVE_CLASS}`);
  if (defaultActiveTab) {
    openTab(defaultActiveTab);
  }

  /// main accordion function
  const tabs = accordion.querySelectorAll(`.${ACCORDION_TAB_CLASS}`);
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const activeTab = accordion.querySelector(`.${ACCORDION_TAB_CLASS}.${ACTIVE_CLASS}`);

      if (tab.classList.contains(ACTIVE_CLASS)) {
        closeTab(tab);
      } else {
        openTab(tab);

        if (activeTab) {
          closeTab(activeTab);
        }
      }
    });
  });
};

/// initialize all accordions on page
const accordions = document.querySelectorAll(`.${ACCORDION_CLASS}`);
if (accordions.length !== 0) {
  accordions.forEach(accordion => {
    initAccordion(accordion);
  });
}

