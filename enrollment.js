// Element ids and classes needed:
// documentChecklist
// doneCounter
// allDoneMessage
// .document-card
// .document-toggle

// Edit this array to change the checklist.
let documents = [
  "Birth Certificate (PSA)",
  "Report Card (Form 138)",
  "Good Moral Certificate",
  "2x2 ID Pictures",
  "Medical Certificate",
  "Valid Identification",
  "Application or Admission Form"
];

let checklist = document.getElementById("documentChecklist");
let counter = document.getElementById("doneCounter");
let allDoneMessage = document.getElementById("allDoneMessage");

// This block lets visitors expand or collapse document details.
document.querySelectorAll(".document-card").forEach(function (card) {
  let button = card.querySelector(".document-toggle");

  button.addEventListener("click", function () {
    let expanded = card.classList.toggle("expanded");
    button.setAttribute("aria-expanded", String(expanded));
  });
});

// This block updates the number of checked documents.
function updateCounter() {
  let boxes = checklist.querySelectorAll("input");
  let done = 0;

  boxes.forEach(function (box) {
    if (box.checked) {
      done = done + 1;
    }
  });

  counter.textContent = "DONE: " + done + " OF " + documents.length;
  allDoneMessage.textContent = done === documents.length ? "ALL DONE" : "";
}

// This block builds the checklist from the documents array.
documents.forEach(function (documentName) {
  let label = document.createElement("label");
  let checkbox = document.createElement("input");
  let text = document.createElement("span");

  checkbox.type = "checkbox";
  text.textContent = documentName;
  label.appendChild(checkbox);
  label.appendChild(text);
  checklist.appendChild(label);

  checkbox.addEventListener("change", updateCounter);
});

updateCounter();