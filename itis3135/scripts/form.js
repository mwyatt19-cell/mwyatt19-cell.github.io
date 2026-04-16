// ===============================
// FORM SETUP
// ===============================
const form = document.getElementById("form");
const output = document.getElementById("output");
const coursesContainer = document.getElementById("courses-container");
const addCourseBtn = document.getElementById("add-course");
const MAX_COURSES = 7;

function addDeleteButton(courseDiv) {
  if (
    !courseDiv.classList.contains("protected-course") &&
    !courseDiv.querySelector(".delete-course")
  ) {
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.classList.add("delete-course");
    deleteBtn.textContent = "Delete";
    courseDiv.appendChild(deleteBtn);
  }
}
document.querySelectorAll(".course").forEach((courseDiv) => {
  addDeleteButton(courseDiv);
});


// ===============================
// COURSES PREPOPULATION DATA
// ===============================
const coursesData = [
  { dept: "ITIS", num: "3135", name: "Front-End Web Application Development", reason: "Assist in my research knowledge." },
  { dept: "ITSC", num: "3146", name: "Intro Oper Syst & Networking", reason: "Required for my major." },
  { dept: "UCOL", num: "3410", name: "Career Development Internship", reason: "Taken to have an internship on my resume and gain professional networking skills." },
  { dept: "LTAM", num: "3360", name: "STUDIES IN HISPANIC FILM", reason: "Taken for my double major, like the teacher." },
  { dept: "ITSC", num: "3790", name: "Honors Research", reason: "Required in Honors Program, also very interesting." }
];

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
  const divider = document.getElementById("divider").value.trim();

  const adjective = document.getElementById("adj").value.trim();
  const animal = document.getElementById("animal").value.trim();

  const statement = document.getElementById("statement").value.trim();
  const personalBG = document.getElementById("personal-bg").value.trim();
  const professionalBG = document.getElementById("professional-bg").value.trim();
  const academicBG = document.getElementById("academic-bg").value.trim();
  const subjectBG = document.getElementById("subject-bg").value.trim();
  const primary = document.getElementById("primary-platform").value.trim();
  const backup = document.getElementById("background-platform").value.trim();

  const funny = document.getElementById("funny").value.trim();
  const extra = document.getElementById("extra").value.trim();

  const quote = document.getElementById("quote").value.trim();
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
      coursesHTML += `<li>${dept} ${num} - ${name}: ${reason}</li>`;
    }
  });

  // ===============================
  // LINKS WITH HYPERLINKS
  // ===============================
  const links = [
    { name: "CLT Web", url: document.getElementById("clt-web").value.trim() },
    { name: "GitHub.io", url: document.getElementById("github-io").value.trim() },
    { name: "GitHub", url: document.getElementById("github").value.trim() },
    { name: "FreeCodeCamp", url: document.getElementById("free-code-camp").value.trim() },
    { name: "LinkedIn", url: document.getElementById("linked-in").value.trim() }
  ];

  const linksHTML = links
    .map((link) => `<a href="${link.url}" target="_blank">${link.name}</a>`)
    .join(" ~ ");

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
  const caption = document.getElementById("caption").value.trim();

  // ===============================
  // OUTPUT
  // ===============================

  output.innerHTML = `
    <p>I understand that what I put here is publicly available on the web and I won’t put anything here I don’t want the public to see - <em>${initials} - ${date}</em></p>

    <h2>${lastName}, ${firstName} ${middleName ? middleName + "." : ""} ${nickname ? '“' + nickname + '”' : ""} ${divider} ${adjective} ${animal}</h2>

    <img src="${finalImage}" alt="${caption}">
    <p style="font-style: italic;">${caption}</p>

    <p>${statement}</p>

    <ul>
      <li>Personal Background: ${personalBG}</li>
      <li>Professional Background: ${professionalBG}</li>
      <li>Academic Background: ${academicBG}</li>
      <li>Background in this Subject: ${subjectBG}</li>
      <li>Primary Work Computer: ${primary}</li>
      <li>Backup Work Computer & Location Plan: ${backup}</li>
    </ul>

    <p>Courses I’m Taking, & Why:</p>
    <ol>
      ${coursesHTML}
    </ol>

    ${funny ? `<p>Funny/Interesting item: ${funny}</p>` : ""}
    ${extra ? `<p>I’d also like to share: ${extra}</p>` : ""}

    <br>
    <p>${quote}</p>
    
    <p>${linksHTML}</p>

    <br>
    <button id="reset-link">Reset Form</button>
  `;

  form.style.display = "none";

  document.getElementById("reset-link").addEventListener("click", () => location.reload());
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

  // Prepopulate from coursesData if within first 5
  let prefill = { dept: "", num: "", name: "", reason: "" };
  if (currentCourses < coursesData.length) {
    prefill = coursesData[currentCourses];
  }

 courseDiv.innerHTML = `
  <input type="text" class="course-dept" placeholder="Department" value="${prefill.dept}" required>
  <input type="text" class="course-num" placeholder="Number" value="${prefill.num}" required>
  <input type="text" class="course-name" placeholder="Course Name" value="${prefill.name}" required>
  <input type="text" class="course-reason" placeholder="Reason" value="${prefill.reason}" required>
`;

addDeleteButton(courseDiv);
coursesContainer.appendChild(courseDiv);

});

// Delete course functionality
coursesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-course")) {
    const courseDiv = e.target.parentElement;

    if (courseDiv.classList.contains("protected-course")) {
      alert("The first course cannot be deleted.");
      return;
    }

    courseDiv.remove();
  }
});
