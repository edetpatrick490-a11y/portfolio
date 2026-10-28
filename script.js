// =========================================================
// PE PORTFOLIO - UPDATED JAVASCRIPT
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================
  // MOBILE MENU
  // =========================================================

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");

      menuBtn.textContent = isOpen ? "✕" : "☰";
      menuBtn.setAttribute("aria-expanded", isOpen);
    });

    // Close menu when a navigation link is clicked
    const links = navLinks.querySelectorAll("a");

    links.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");

        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // =========================================================
  // DARK / LIGHT MODE
  // =========================================================

  const themeBtn = document.getElementById("themeBtn");

  if (themeBtn) {
    // Check saved theme
    const savedTheme = localStorage.getItem("portfolioTheme");

    if (savedTheme === "light") {
      document.body.classList.add("light-mode");
      themeBtn.textContent = "☀️";
    } else {
      document.body.classList.remove("light-mode");
      themeBtn.textContent = "🌙";
    }

    // Change theme
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");

      const isLightMode = document.body.classList.contains("light-mode");

      if (isLightMode) {
        themeBtn.textContent = "☀️";
        localStorage.setItem("portfolioTheme", "light");
      } else {
        themeBtn.textContent = "🌙";
        localStorage.setItem("portfolioTheme", "dark");
      }
    });
  }

  // =========================================================
  // BACK TO TOP BUTTON
  // =========================================================

  const topBtn = document.getElementById("topBtn");

  if (topBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        topBtn.classList.add("show");
      } else {
        topBtn.classList.remove("show");
      }
    });

    topBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // =========================================================
  // FOOTER YEAR
  // =========================================================

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // =========================================================
  // SMOOTH SCROLLING
  // =========================================================

  const navAnchors = document.querySelectorAll('a[href^="#"]');

  navAnchors.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#" || targetId.length <= 1) {
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // =========================================================
  // CONTACT FORM
  // =========================================================

  // =========================================================
  // CONTACT FORM - FORMSPREE
  // =========================================================

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");
      const status = document.getElementById("contactStatus");
      const submitButton = contactForm.querySelector('button[type="submit"]');

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const message = messageInput ? messageInput.value.trim() : "";

      if (!name || !email || !message) {
        if (status) {
          status.textContent = "Please fill in all fields.";
        }
        return;
      }

      if (!emailInput.checkValidity()) {
        if (status) {
          status.textContent = "Please enter a valid email address.";
        }
        return;
      }

      const endpoint = contactForm.action;

      if (
        !endpoint.startsWith("https://formspree.io/f/") ||
        endpoint.endsWith("/YOUR_FORM_ID")
      ) {
        if (status) {
          status.textContent =
            "Please add your correct Formspree endpoint first.";
        }
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      if (status) {
        status.textContent = "Sending your message...";
      }

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: new FormData(contactForm),
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Message submission failed.");
        }

        if (status) {
          status.textContent =
            "Thank you! Your message has been sent successfully.";
        }

        contactForm.reset();
      } catch (error) {
        if (status) {
          status.textContent =
            "Sorry, your message could not be sent. Please try again.";
        }
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Send Message";
        }
      }
    });
  }

  M;

  E;

  M;
  $;


  // =========================================================
  // PROJECT BUTTONS
  // =========================================================

  const projectLinks = document.querySelectorAll(".project-link");

  projectLinks.forEach((button) => {
    button.addEventListener("click", (event) => {
      const link = button.getAttribute("href");

      // If the link is still "#"
      if (!link || link === "#") {
        event.preventDefault();

        alert(
          "This project link has not been added yet. Replace # with your live project or GitHub URL.",
        );
      }
    });
  });

  // =========================================================
  // SCROLL REVEAL ANIMATION
  // =========================================================

  const revealElements = document.querySelectorAll(
    ".section, .project, .service, .skill, .timeline-item, .testimonial, .stat",
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      },
    );

    revealElements.forEach((element) => {
      element.classList.add("reveal");

      observer.observe(element);
    });
  }

  // =========================================================
  // ACTIVE NAVIGATION
  // =========================================================

  const sections = document.querySelectorAll("section[id]");

  const navigationLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length > 0 && navigationLinks.length > 0) {
    window.addEventListener("scroll", () => {
      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.offsetHeight;

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          currentSection = section.getAttribute("id");
        }
      });

      navigationLinks.forEach((link) => {
        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {
          link.classList.add("active");
        }
      });
    });
  }

  // =========================================================
  // DOWNLOAD CV
  // =========================================================

  const cvButton = document.querySelector('a[href="resume.pdf"]');

  if (cvButton) {
    cvButton.addEventListener("click", () => {
      console.log("CV download started.");
    });
  }

  // =========================================================
  // CONSOLE MESSAGE
  // =========================================================

  console.log("PE Portfolio loaded successfully 🚀");
});
