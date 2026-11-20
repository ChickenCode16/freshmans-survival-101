// Element ids and classes needed:
// calculateGrade
// gradeResult
// gradeError
// .grade-score
// .grade-weight

let calculateButton = document.getElementById("calculateGrade");
let result = document.getElementById("gradeResult");
let errorMessage = document.getElementById("gradeError");

// This block checks entries and calculates the weighted average.
calculateButton.addEventListener("click", function () {
  let scores = document.querySelectorAll(".grade-score");
  let weights = document.querySelectorAll(".grade-weight");
  let total = 0;
  let weightTotal = 0;
  let rowsUsed = 0;
  let invalid = false;

  for (let i = 0; i < scores.length; i = i + 1) {
    let scoreText = scores[i].value.trim();
    let weightText = weights[i].value.trim();

    if (scoreText === "" && weightText === "") {
      continue;
    }

    let score = Number(scoreText);
    let weight = Number(weightText);

    if (scoreText === "" || weightText === "" ||
        !Number.isFinite(score) || !Number.isFinite(weight) ||
        score < 0 || score > 100 || weight <= 0 || weight > 100) {
      invalid = true;
      continue;
    }

    total = total + score * weight;
    weightTotal = weightTotal + weight;
    rowsUsed = rowsUsed + 1;
  }

  if (invalid) {
    result.textContent = "";
    errorMessage.textContent = "Complete each row with a valid score and weight.";
    return;
  }

  if (rowsUsed === 0) {
    result.textContent = "";
    errorMessage.textContent = "Enter at least one score and weight.";
    return;
  }

  errorMessage.textContent = "";
  result.textContent = "Weighted Result: " + (total / weightTotal).toFixed(2);
});