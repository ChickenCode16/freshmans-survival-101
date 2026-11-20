let gradingScale = document.getElementById("gradingScale");
let scaleHint = document.getElementById("scaleHint");
let calculateGpaButton = document.getElementById("calculateGpa");
let gpaResult = document.getElementById("gpaResult");
let gpaError = document.getElementById("gpaError");
let courseGrades = document.querySelectorAll(".course-grade");
let courseUnits = document.querySelectorAll(".course-units");

function updateGradeLimits() {
  let usesGpaScale = gradingScale.value === "gpa";

  courseGrades.forEach(function (input) {
    input.min = usesGpaScale ? "0" : "1";
    input.max = usesGpaScale ? "4" : "5";
  });

  scaleHint.textContent = usesGpaScale
    ? "Enter grades from 0.00 to 4.00; higher grades indicate stronger performance."
    : "Enter grades from 1.00 to 5.00; lower grades indicate stronger performance.";
  gpaResult.textContent = "";
  gpaError.textContent = "";
}

gradingScale.addEventListener("change", updateGradeLimits);

calculateGpaButton.addEventListener("click", function () {
  let minimumGrade = gradingScale.value === "gpa" ? 0 : 1;
  let maximumGrade = gradingScale.value === "gpa" ? 4 : 5;
  let weightedTotal = 0;
  let totalUnits = 0;
  let hasInvalidRow = false;

  for (let i = 0; i < courseGrades.length; i = i + 1) {
    let gradeText = courseGrades[i].value.trim();
    let unitsText = courseUnits[i].value.trim();

    if (gradeText === "" && unitsText === "") {
      continue;
    }

    let grade = Number(gradeText);
    let units = Number(unitsText);

    if (gradeText === "" || unitsText === "" ||
        !Number.isFinite(grade) || !Number.isFinite(units) ||
        grade < minimumGrade || grade > maximumGrade || units <= 0) {
      hasInvalidRow = true;
      continue;
    }

    weightedTotal = weightedTotal + grade * units;
    totalUnits = totalUnits + units;
  }

  if (hasInvalidRow) {
    gpaResult.textContent = "";
    gpaError.textContent = "Complete each started course row with a valid grade and positive units.";
    return;
  }

  if (totalUnits === 0) {
    gpaResult.textContent = "";
    gpaError.textContent = "Enter at least one course grade and its units.";
    return;
  }

  gpaError.textContent = "";
  let resultName = gradingScale.value === "gpa" ? "Estimated GPA" : "Estimated GWA";
  gpaResult.textContent = resultName + ": " + (weightedTotal / totalUnits).toFixed(2);
});

updateGradeLimits();
