let allowanceInput = document.getElementById("allowanceInput");
let daysInput = document.getElementById("daysInput");
let dailySpendingInput = document.getElementById("dailySpendingInput");
let setBudgetButton = document.getElementById("setBudgetButton");
let dailyBudget = document.getElementById("dailyBudget");
let estimatedSavings = document.getElementById("estimatedSavings");
let savingsMessage = document.getElementById("savingsMessage");
let budgetError = document.getElementById("budgetError");
let budget = { allowance: 0, days: 1, dailySpending: null };

try {
  let savedBudget = localStorage.getItem("freshmanBudget");
  if (savedBudget) {
    let loadedBudget = JSON.parse(savedBudget);
    if (Number.isFinite(Number(loadedBudget.allowance))) {
      budget.allowance = Number(loadedBudget.allowance);
    }
    if (Number.isFinite(Number(loadedBudget.days)) && Number(loadedBudget.days) >= 1) {
      budget.days = Number(loadedBudget.days);
    }
    if (loadedBudget.dailySpending !== null &&
        Number.isFinite(Number(loadedBudget.dailySpending)) &&
        Number(loadedBudget.dailySpending) >= 0) {
      budget.dailySpending = Number(loadedBudget.dailySpending);
    }
  }
} catch (error) {
  budget = { allowance: 0, days: 1, dailySpending: null };
}

allowanceInput.value = budget.allowance || "";
daysInput.value = budget.allowance ? budget.days : "";
dailySpendingInput.value = budget.dailySpending === null ? "" : budget.dailySpending;
saveBudget();

function saveBudget() {
  try {
    localStorage.setItem("freshmanBudget", JSON.stringify(budget));
  } catch (error) {
    
  }
}

function peso(amount) {
  return "₱" + amount.toFixed(2);
}

function updateDailyBudget() {
  let dailyAllowance = budget.allowance / budget.days;
  dailyBudget.textContent = peso(dailyAllowance);

  if (budget.dailySpending === null) {
    estimatedSavings.textContent = "—";
    savingsMessage.textContent = "Enter expected daily spending to estimate your savings.";
    return;
  }

  let savings = dailyAllowance - budget.dailySpending;
  if (savings < 0) {
    estimatedSavings.textContent = peso(0);
    savingsMessage.textContent = "Spending is " + peso(Math.abs(savings)) + " over your daily allowance.";
    return;
  }

  estimatedSavings.textContent = peso(savings);
  savingsMessage.textContent = "";
}

setBudgetButton.addEventListener("click", function () {
  let allowanceText = allowanceInput.value.trim();
  let daysText = daysInput.value.trim();
  let dailySpendingText = dailySpendingInput.value.trim();
  let allowance = Number(allowanceText);
  let days = Number(daysText);
  let dailySpending = Number(dailySpendingText);

  if (allowanceText === "" || !Number.isFinite(allowance) || allowance < 0) {
    budgetError.textContent = "Enter a valid allowance.";
    return;
  }

  if (daysText === "" || !Number.isFinite(days) || days < 1) {
    budgetError.textContent = "Enter at least one day.";
    return;
  }

  if (dailySpendingText !== "" &&
      (!Number.isFinite(dailySpending) || dailySpending < 0)) {
    budgetError.textContent = "Enter a valid daily spending estimate.";
    return;
  }

  budget.allowance = allowance;
  budget.days = days;
  budget.dailySpending = dailySpendingText === "" ? null : dailySpending;
  budgetError.textContent = "";
  saveBudget();
  updateDailyBudget();
});

updateDailyBudget();
