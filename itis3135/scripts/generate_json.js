document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("generate-json-btn");
  const form = document.getElementById("form");
  const codeBlock = document.getElementById("code-block");
  const outputSection = document.getElementById("html-output");

  // =========================
  // SAME DATA FUNCTION (MATCHES HTML FILE)
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
        src: "images/your-image.jpg",
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
  // GENERATE JSON BUTTON
  // =========================
  btn.addEventListener("click", () => {
    const data = getFormData();

    // Pretty JSON formatting
    const jsonString = JSON.stringify(data, null, 2);

    // =========================
    // DISPLAY OUTPUT
    // =========================
    form.style.display = "none";

    document.querySelector("h2").textContent = "Introduction JSON";

    outputSection.style.display = "block";

    codeBlock.className = "json";
    codeBlock.textContent = jsonString;

    hljs.highlightAll();
  });
});
