let guideViews = document.querySelectorAll(".guide-view");
let guideCompass = document.getElementById("guideCompass");
let guideLayout = guideCompass ? guideCompass.parentElement : null;

function showGuideView() {
  let selectedId = window.location.hash.slice(1);
  let selectedView = Array.from(guideViews).find(function (view) {
    return view.id === selectedId;
  }) || guideViews[0];

  guideViews.forEach(function (view) {
    view.hidden = view !== selectedView;
  });

  if (guideCompass && guideLayout) {
    let direction = selectedView.dataset.compassDirection || "";
    guideCompass.hidden = direction === "";
    guideCompass.dataset.direction = direction;
    guideLayout.classList.toggle("has-compass", direction !== "");
  }
}

if (guideViews.length > 0) {
  window.addEventListener("hashchange", showGuideView);
  window.addEventListener("pageshow", showGuideView);
  showGuideView();
}
