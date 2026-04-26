function openForm(dogId) {
  const formPopup = document.getElementById("myForm");
  formPopup.style.display = "flex";

  if (dogId) {
    document
      .querySelectorAll('.adoption-details input[type="checkbox"]')
      .forEach((checkbox) => {
        checkbox.checked = false;
      });

    const dogCheckbox = document.querySelector(
      'input[type="checkbox"][value="' + dogId + '"]'
    );
    if (dogCheckbox) {
      dogCheckbox.checked = true;
    }
  }
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

document
  .getElementById("adoptionForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedDogs = document.querySelectorAll(
      '.adoption-details input[type="checkbox"]:checked'
    );
    const message = document.getElementById("formMessage");

    if (selectedDogs.length === 0) {
      message.textContent =
        "Please choose at least one dog before submitting your inquiry.";
      return;
    }

    message.textContent = "Thanks! Your adoption inquiry has been recorded.";
    this.reset();

    setTimeout(() => {
      closeForm();
      message.textContent = "";
    }, 1500);
  });

window.addEventListener("click", function (event) {
  const formPopup = document.getElementById("myForm");

  if (event.target === formPopup) {
    closeForm();
  }
});

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeForm();
  }
});
const adoptButtons = document.querySelectorAll(".open-button");

adoptButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const dogId = button.dataset.dog;
    openForm(dogId);
  });
});
const closeButton = document.querySelector(".close-form-button");

closeButton.addEventListener("click", function () {
  closeForm();
});
