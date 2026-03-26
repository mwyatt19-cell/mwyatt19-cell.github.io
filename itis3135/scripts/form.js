// ===============================
// FORM SETUP
// ===============================
const form = document.getElementById("form");
const output = document.getElementById("output");
const coursesContainer = document.getElementById("courses-container");
const addCourseBtn = document.getElementById("add-course");
const MAX_COURSES = 7;

// ===============================
// HANDLE SUBMIT FUNCTION
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

  // ===============================
  // COURSES
  // ===============================
  const courseBlocks = coursesContainer.querySelectorAll(".course");
  let coursesHTML = "";

  courseBlocks.forEach((course) => {
    const dept = course.querySelector(".course-dept").value.trim();
    const num = course.querySelector(".course-num").value.trim();
    const name = course.querySelector(".course-name").value.trim();
    const reason = course.querySelector(".course-reason").value.trim();

    if (dept && num && name && reason) {
      coursesHTML += `
      <li>
        <strong>${dept} ${num} - ${name}</strong>: ${reason}
      </li>
      `;
    }
  });

  // ===============================
  // LINKS
  // ===============================
  const links = [
    document.getElementById("clt-web").value.trim(),
    document.getElementById("github-io").value.trim(),
    document.getElementById("github").value.trim(),
    document.getElementById("free-code-camp").value.trim(),
    document.getElementById("linked-in").value.trim(),
  ];

  // ===============================
  // IMAGE
  // ===============================
  const imageInput = document.getElementById("image");
  let imageURL = "";
  if (imageInput.files.length > 0) {
    imageURL = URL.createObjectURL(imageInput.files[0]);
  }

  const defaultImage = "https://mwyatt19-cell.github.io/photo_hockey.png";
  const finalImage = imageURL || defaultImage;

  // ===============================
  // OUTPUT
  // ===============================
  output.innerHTML = `
    <p>I understand that what I put here is publicly available on the web and I won’t put anything here I don’t want the public to see - ${initials} - ${date}</p>

    <h1>${firstName} ${middleName ? middleName + "." : ""} “${nickname}” ${lastName} ${divider} ${adjective} ${animal}</h1>

    <img src="${finalImage}" alt="${caption}">

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

  document
    .getElementById("reset-link")
    .addEventListener("click", () => location.reload());
}

// ===============================
// FORM SUBMIT EVENT
// ===============================
form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmit();
});

// ===============================
// CLEAR BUTTON
// ===============================
const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", () => {
  const fields = document.querySelectorAll("form input, form textarea");
  fields.forEach((field) => {
    if (["button", "submit", "reset", "file"].includes(field.type)) return;
    field.value = field.dataset.default || "";
  });

  // Reset courses to only initial
  const initialCourse = coursesContainer.querySelector(".course");
  coursesContainer.innerHTML = "";
  if (initialCourse) {
    const cloned = initialCourse.cloneNode(true);
    cloned.querySelectorAll("input").forEach((input) => {
      input.value = input.dataset.default || "";
    });
    coursesContainer.appendChild(cloned);
  }
});

// ===============================
// ADD / REMOVE COURSES
// ===============================
addCourseBtn.addEventListener("click", () => {
  const currentCourses = coursesContainer.querySelectorAll(".course").length;
  if (currentCourses >= MAX_COURSES) {
    alert("You can only add up to 7 courses.");
    return;
  }

  const courseDiv = document.createElement("div");
  courseDiv.classList.add("course");

  courseDiv.innerHTML = `
    <input type="text" class="course-dept" placeholder="Department" required>
    <input type="text" class="course-num" placeholder="Number" required>
    <input type="text" class="course-name" placeholder="Course Name" required>
    <input type="text" class="course-reason" placeholder="Reason" required>
    <button type="button" class="delete-course">Delete</button>
  `;

  coursesContainer.appendChild(courseDiv);
});

// Delete course functionality
coursesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-course")) {
    const currentCourses = coursesContainer.querySelectorAll(".course").length;
    if (currentCourses <= 1) {
      alert("You must have at least 1 course.");
      return;
    }
    e.target.parentElement.remove();
  }
});
