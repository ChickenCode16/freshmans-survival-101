let guidePages = {
  enrollment: "enrollment.html",
  time: "time-management.html",
  syllabus: "syllabus.html",
  budget: "budget.html",
  transportation: "commuting.html"
};

let guideButtons = document.querySelectorAll(".compass-button");
let isNavigating = false;

guideButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (isNavigating) {
      return;
    }

    let page = guidePages[button.dataset.guide];

    if (!page) {
      return;
    }

    isNavigating = true;
    button.classList.add("active");

    turnCompass(button);

    window.setTimeout(function () {
      window.location.href = page;
    }, 650);
  });
});