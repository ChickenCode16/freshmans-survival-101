let guideViews = document.querySelectorAll(".guide-view");

function showGuideView() {
  let selectedId = window.location.hash.slice(1);
  let selectedView = Array.from(guideViews).find(function (view) {
    return view.id === selectedId;
  }) || guideViews[0];

  guideViews.forEach(function (view) {
    view.hidden = view !== selectedView;
  });
}

if (guideViews.length > 0) {
  window.addEventListener("hashchange", showGuideView);
  showGuideView();
}
