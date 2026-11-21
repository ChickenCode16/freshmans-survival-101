document.querySelectorAll(".dropdown").forEach(function (dropdown) {
  const button = dropdown.querySelector(".dropdown-button");

  if (!button) {
    return;
  }

  function setOpen(open) {
    dropdown.classList.toggle("open", open);
    button.setAttribute("aria-expanded", String(open));
  }

  button.addEventListener("click", function () {
    setOpen(button.getAttribute("aria-expanded") !== "true");
  });

  dropdown.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setOpen(false);
      button.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (!dropdown.contains(event.target)) {
      setOpen(false);
    }
  });
});
