// ===============================
// FORM SETUP
// ===============================
const form = document.getElementById("form");
const output = document.getElementById("output");

// Prevent default submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  handleSubmit();
});

// ===============================
// CLEAR BUTTON (restore defaults/placeholders + courses)
// ===============================
const clearBtn = document.getElementById("clear-btn");

clearBtn.addEventListener("click", function () {
  // Reset input and textarea fields
  const fields = document.querySelectorAll("form input, form textarea");
  fields.forEach((field) => {
    if (["button", "submit", "reset", "file"].includes(field.type)) return;
    if (field.dataset.default) {
      field.value = field.dataset.default;
    } else {
      field.value = "";
    }
  });

  // Reset courses container to only the initial course input
  const initialCourse = coursesContainer.querySelector("input[data-default]");
  coursesContainer.innerHTML = "";
  if (initialCourse) {
    // Clone initial course to reset
    const clonedCourse = initialCourse.cloneNode(true);
    clonedCourse.value = clonedCourse.dataset.default; // restore default
    coursesContainer.appendChild(clonedCourse);
  }
});

// ===============================
// ADD / REMOVE COURSES
// ===============================
const coursesContainer = document.getElementById("courses-container");
const addCourseBtn = document.getElementById("add-course");

addCourseBtn.addEventListener("click", function () {
  const courseDiv = document.createElement("div");

  courseDiv.innerHTML = `
    <input type="text" placeholder="Enter course and reason" required>
    <button type="button" class="delete-course">Delete</button>
  `;

  coursesContainer.appendChild(courseDiv);
});

coursesContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-course")) {
    e.target.parentElement.remove();
  }
});

// ===============================
// HANDLE SUBMIT
// ===============================
function handleSubmit() {
  const firstName = document.getElementById("first-name").value.trim();
  const middleName = document.getElementById("middle-name").value.trim();
  const nickname = document.getElementById("nickname").value.trim();
  const lastName = document.getElementById("last-name").value.trim();

  const initials = document.getElementById("acknowledgement").value.trim();
  const date = document.getElementById("ack-date").value.trim();

  const adjective = document.getElementById("adj").value.trim();
  const animal = document.getElementById("animal").value.trim();
  const divider = document.getElementById("divider").value.trim();

  const caption = document.getElementById("caption").value.trim();
  const statement = document.getElementById("statement").value.trim();

  const personalBG = document.getElementById("personal-bg").value.trim();
  const professionalBG = document
    .getElementById("professional-bg")
    .value.trim();
  const academicBG = document.getElementById("academic-bg").value.trim();
  const subjectBG = document.getElementById("subject-bg").value.trim();

  const primary = document.getElementById("primary-platform").value.trim();
  const backup = document.getElementById("background-platform").value.trim();

  const funny = document.getElementById("funny").value.trim();
  const extra = document.getElementById("extra").value.trim();

  const quote = document.getElementById("quote").value.trim();
  const author = document.getElementById("quote-author").value.trim();

  const links = [
    document.getElementById("clt-web").value.trim(),
    document.getElementById("github-io").value.trim(),
    document.getElementById("github").value.trim(),
    document.getElementById("free-code-camp").value.trim(),
    document.getElementById("linked-in").value.trim(),
  ];

  const courseInputs = coursesContainer.querySelectorAll("input");
  let coursesHTML = "";
  courseInputs.forEach((course) => {
    if (course.value.trim() !== "")
      coursesHTML += `<li>${course.value.trim()}</li>`;
  });

  const imageInput = document.getElementById("image");
  let imageURL = "";
  if (imageInput.files.length > 0) {
    imageURL = URL.createObjectURL(imageInput.files[0]);
  }

  output.innerHTML = `
    <p>I understand that what I put here is publicly available on the web and I won’t put anything here I don’t want the public to see - ${initials} - ${date}</p>

    <h1>${firstName} ${middleName ? middleName + "." : ""} “${nickname}” ${lastName} ${divider} ${adjective} ${animal}</h1>

    ${imageURL ? `<img src="${imageURL}" alt="${caption}">` : ""}
    <p>${caption}</p>

    <p>${statement}</p>

    <p><strong>Personal Background:</strong> ${personalBG}</p>
    <p><strong>Professional Background:</strong> ${professionalBG}</p>
    <p><strong>Academic Background:</strong> ${academicBG}</p>
    <p><strong>Background in this Subject:</strong> ${subjectBG}</p>
    <p><strong>Primary Work Computer:</strong> ${primary}</p>
    <p><strong>Backup Work Computer & Location Plan:</strong> ${backup}</p>

    <p><strong>Courses I’m Taking, & Why:</strong></p>
    <ul>${coursesHTML}</ul>

    ${funny ? `<p><strong>Funny/Interesting item:</strong> ${funny}</p>` : ""}
    ${extra ? `<p><strong>I’d also like to share:</strong> ${extra}</p>` : ""}

    <p>“${quote}”</p>
    <p>- ${author}</p>

    <p>${links.join(" | ")}</p>

    <br>
    <button id="reset-link">Reset Form</button>
  `;

  form.style.display = "none";

  document.getElementById("reset-link").addEventListener("click", function () {
    location.reload();
  });
}
