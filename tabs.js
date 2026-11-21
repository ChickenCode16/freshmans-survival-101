document.querySelectorAll('[role="tablist"]').forEach(function (tabList) {
  const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));

  if (tabs.length === 0) {
    return;
  }

  const panels = tabs.map(function (tab) {
    return document.getElementById(tab.getAttribute("aria-controls"));
  });

  function activateTab(tab, moveFocus) {
    tabs.forEach(function (currentTab) {
      const selected = currentTab === tab;
      currentTab.setAttribute("aria-selected", String(selected));
      currentTab.tabIndex = selected ? 0 : -1;
    });

    panels.forEach(function (panel, index) {
      panel.hidden = tabs[index] !== tab;
    });

    if (moveFocus) {
      tab.focus();
    }
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      activateTab(tab, false);
    });

    tab.addEventListener("keydown", function (event) {
      let nextIndex = index;

      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      activateTab(tabs[nextIndex], true);
    });
  });

  activateTab(tabs.find(function (tab) {
    return tab.getAttribute("aria-selected") === "true";
  }) || tabs[0], false);
});
