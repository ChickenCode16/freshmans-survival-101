let compassRose = document.getElementById("compassRose");
let compassRotation = 0;

function turnCompass(button) {
  let direction = Number(button.dataset.angle);

  compassRotation = compassRotation + 360 + direction;
  compassRose.style.transform = "rotate(" + compassRotation + "deg)";
}

window.addEventListener("pageshow", function () {
  compassRotation = 0;
  compassRose.style.transition = "none";
  compassRose.style.transform = "rotate(0deg)";

  window.setTimeout(function () {
    compassRose.style.transition =
      "transform 650ms cubic-bezier(0.2, 0.75, 0.25, 1)";
  }, 50);
});