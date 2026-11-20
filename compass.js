// Element ids and classes needed:
// compassRose
// .compass-button

let compassRose = document.getElementById("compassRose");
let compassRotation = 0;

// This block smoothly turns the rose after a compass button is selected.
function turnCompass(button) {
  let direction = Number(button.dataset.angle);

  // Add a full turn so selecting a direction gives a visible spin.
  compassRotation = compassRotation + 360 + direction;
  compassRose.style.transform = "rotate(" + compassRotation + "deg)";
}

// This block resets the rose if the visitor returns with the Back button.
window.addEventListener("pageshow", function () {
  compassRotation = 0;
  compassRose.style.transition = "none";
  compassRose.style.transform = "rotate(0deg)";

  window.setTimeout(function () {
    compassRose.style.transition =
      "transform 650ms cubic-bezier(0.2, 0.75, 0.25, 1)";
  }, 50);
});