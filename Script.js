// LOVETH CREATE — INTERACTIONS

(() => {

  "use strict";

  const menuButton = document.querySelector(".menu-toggle");

  const nav = document.querySelector(".nav");

  const navLinks = document.querySelectorAll(".nav a");

  const progressBar = document.querySelector(".scroll-progress");

  const backToTop = document.querySelector(".back-to-top");

  const year = document.getElementById("year");


  // AUTOMATIC FOOTER YEAR

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // MOBILE NAVIGATION

  if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

      const isOpen =
        menuButton.getAttribute("aria-expanded") === "true";

      menuButton.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Open navigation" : "Close navigation"
      );

      nav.classList.toggle("open", !isOpen);

    });


    // CLOSE MENU WHEN A LINK IS CLICKED

    navLinks.forEach((link) => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        menuButton.setAttribute("aria-expanded", "false");

        menuButton.setAttribute(
          "aria-label",
          "Open navigation"
        );

      });

    });


    // CLOSE MENU WITH ESCAPE KEY

    document.addEventListener("keydown", (event) => {

      if (event.key === "Escape") {

        nav.classList.remove("open");

        menuButton.setAttribute("aria-expanded", "false");

        menuButton.setAttribute(
          "aria-label",
          "Open navigation"
        );

      }

    });

  }


  // SCROLL REVEAL ANIMATIONS

  const revealItems = document.querySelectorAll(".reveal");

  const reduceMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  if ("IntersectionObserver" in window && !reduceMotion) {

    const revealObserver = new IntersectionObserver(

      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);

          }

        });

      },

      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }

    );


    revealItems.forEach((item) => {

      revealObserver.observe(item);

    });

  } else {

    revealItems.forEach((item) => {

      item.classList.add("is-visible");

    });

  }


  // SCROLL PROGRESS AND BACK TO TOP

  let ticking = false;


  const updateScrollUI = () => {

    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      scrollable > 0
        ? (window.scrollY / scrollable) * 100
        : 0;


    if (progressBar) {

      progressBar.style.width = `${progress}%`;

    }


    if (backToTop) {

      backToTop.classList.toggle(
        "visible",
        window.scrollY > 500
      );

    }

    ticking = false;

  };


  window.addEventListener("scroll", () => {

    if (!ticking) {

      window.requestAnimationFrame(updateScrollUI);

      ticking = true;

    }

  }, { passive: true });


  updateScrollUI();


  // ACTIVE NAVIGATION SECTION

  const sections = document.querySelectorAll("main section[id]");


  if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            navLinks.forEach((link) => {

              const active =
                link.getAttribute("href") === `#${entry.target.id}`;

              link.classList.toggle("active", active);

            });

          }

        });

      },

      {
        rootMargin: "-35% 0px -55% 0px"
      }

    );


    sections.forEach((section) => {

      sectionObserver.observe(section);

    });

  }

})();