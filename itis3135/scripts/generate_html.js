document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("generate-html-btn");
  const form = document.getElementById("form");
  const codeBlock = document.getElementById("code-block");
  const outputSection = document.getElementById("html-output");

  // =========================
  // SHARED DATA FUNCTION
  // =========================
  function getFormData() {
    let courses = [];

    document.querySelectorAll(".course").forEach((course) => {
      courses.push({
        dept: course.querySelector(".course-dept").value,
        num: course.querySelector(".course-num").value,
        name: course.querySelector(".course-name").value,
        reason: course.querySelector(".course-reason").value
      });
    });

    return {
      name: {
        first: document.getElementById("first-name").value,
        middle: document.getElementById("middle-name").value,
        last: document.getElementById("last-name").value,
        nickname: document.getElementById("nickname").value
      },

      acknowledgement: {
        initials: document.getElementById("acknowledgement").value,
        date: document.getElementById("ack-date").value,
        divider: document.getElementById("divider").value
      },

      mascot: {
        adjective: document.getElementById("adj").value,
        animal: document.getElementById("animal").value
      },

      image: {
        src: "images/your-image.jpg", // placeholder (browser security limitation)
        caption: document.getElementById("caption").value
      },

      statement: document.getElementById("statement").value,

      background: {
        personal: document.getElementById("personal-bg").value,
        professional: document.getElementById("professional-bg").value,
        academic: document.getElementById("academic-bg").value,
        subject: document.getElementById("subject-bg").value,
        primaryPlatform: document.getElementById("primary-platform").value,
        backupPlatform: document.getElementById("background-platform").value
      },

      courses: courses,

      quote: document.getElementById("quote").value,

      links: {
        clt: document.getElementById("clt-web").value,
        githubio: document.getElementById("github-io").value,
        github: document.getElementById("github").value,
        freeCodeCamp: document.getElementById("free-code-camp").value,
        linkedin: document.getElementById("linked-in").value
      },

      extras: {
        funny: document.getElementById("funny").value,
        extra: document.getElementById("extra").value
      }
    };
  }

  // =========================
  // BUTTON CLICK
  // =========================
  btn.addEventListener("click", () => {
    const data = getFormData();

    // =========================
    // BUILD HTML
    // =========================
    const fullName = `${data.name.first} ${data.name.middle ? data.name.middle + " " : ""}${data.name.last}`;
    const mascot = `${data.mascot.adjective} ${data.mascot.animal}`;

    let courseHTML = "<ul>";
    data.courses.forEach((c) => {
      courseHTML += `<li><strong>${c.dept} ${c.num} - ${c.name}:</strong> ${c.reason}</li>`;
    });
    courseHTML += "</ul>";

    const htmlString = `
<section>
  <h2>${fullName} ${data.acknowledgement.divider} ${mascot}</h2>

  <figure>
    <img src="${data.image.src}" alt="${mascot}">
    <figcaption>${data.image.caption}</figcaption>
  </figure>

  <ul>
    <li><strong>Personal Background:</strong> ${data.background.personal}</li>
    <li><strong>Professional Background:</strong> ${data.background.professional}</li>
    <li><strong>Academic Background:</strong> ${data.background.academic}</li>
    <li><strong>Background in this Subject:</strong> ${data.background.subject}</li>
    <li><strong>Primary Platform:</strong> ${data.background.primaryPlatform}</li>
    <li><strong>Backup Platform:</strong> ${data.background.backupPlatform}</li>
  </ul>

  <h3>Courses</h3>
  ${courseHTML}

  <p><strong>Quote:</strong> ${data.quote}</p>

  <h3>Links</h3>
  <ul>
    <li><a href="${data.links.clt}">CLT Web</a></li>
    <li><a href="${data.links.githubio}">GitHub.io</a></li>
    <li><a href="${data.links.github}">GitHub</a></li>
    <li><a href="${data.links.freeCodeCamp}">FreeCodeCamp</a></li>
    <li><a href="${data.links.linkedin}">LinkedIn</a></li>
  </ul>
</section>
`;

    // =========================
    // DISPLAY OUTPUT
    // =========================
    form.style.display = "none";
    document.querySelector("h2").textContent = "Introduction HTML";

    outputSection.style.display = "block";
    codeBlock.className = "html";
    codeBlock.textContent = htmlString;

    hljs.highlightAll();
  });
});
