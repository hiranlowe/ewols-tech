/* =========================================================
   EWOLS TECH
   INTERACTION, NAVIGATION & LEAD FORM
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  document.documentElement.classList.add("js-ready");


  /* =======================================================
     YEAR
     ======================================================= */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  const menuButton = document.querySelector(".menu-button");
  const navLinks = document.querySelector(".nav-links");

  const closeMenu = () => {
    if (!menuButton || !navLinks) return;

    navLinks.classList.remove("is-open");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Open navigation"
    );
  };


  if (menuButton && navLinks) {

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Open navigation"
    );


    menuButton.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

        const isOpen =
          navLinks.classList.toggle(
            "is-open"
          );

        menuButton.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

        menuButton.setAttribute(
          "aria-label",
          isOpen
            ? "Close navigation"
            : "Open navigation"
        );

      }
    );


    navLinks
      .querySelectorAll("a")
      .forEach(
        (link) => {

          link.addEventListener(
            "click",
            closeMenu
          );

        }
      );


    document.addEventListener(
      "click",
      (event) => {

        if (
          navLinks.classList.contains(
            "is-open"
          ) &&
          !navLinks.contains(
            event.target
          ) &&
          !menuButton.contains(
            event.target
          )
        ) {

          closeMenu();

        }

      }
    );


    document.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Escape"
        ) {

          closeMenu();

        }

      }
    );

  }


  /* =======================================================
     SMOOTH ANCHOR SCROLL
     ======================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(
      (link) => {

        link.addEventListener(
          "click",
          (event) => {

            const targetId =
              link.getAttribute(
                "href"
              );

            if (
              !targetId ||
              targetId === "#"
            ) {
              return;
            }

            const target =
              document.querySelector(
                targetId
              );

            if (!target) {
              return;
            }

            event.preventDefault();

            target.scrollIntoView({
              behavior:
                prefersReducedMotion
                  ? "auto"
                  : "smooth",

              block: "start"
            });

            closeMenu();

          }
        );

      }
    );


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".services, .approach, .contact, .reveal"
    );


  if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
  ) {

    revealElements.forEach(
      (element) => {

        element.classList.add(
          "is-visible"
        );

      }
    );

  } else {

    const revealObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }

              entry.target.classList.add(
                "is-visible"
              );

              revealObserver.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold: 0.08,

          rootMargin:
            "0px 0px -35px 0px"
        }
      );


    revealElements.forEach(
      (element) => {

        revealObserver.observe(
          element
        );

      }
    );

  }


  /* =======================================================
     ACTIVE NAV SECTION
     ======================================================= */

  const sections =
    document.querySelectorAll(
      "section[id]"
    );

  const navAnchors =
    document.querySelectorAll(
      '.nav-links a[href^="#"]'
    );


  if (
    sections.length &&
    navAnchors.length &&
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }

              const id =
                entry.target.getAttribute(
                  "id"
                );


              navAnchors.forEach(
                (anchor) => {

                  anchor.classList.toggle(
                    "active",

                    anchor.getAttribute(
                      "href"
                    ) === `#${id}`
                  );

                }
              );

            }
          );

        },
        {
          threshold: 0.25,

          rootMargin:
            "-20% 0px -55% 0px"
        }
      );


    sections.forEach(
      (section) => {

        sectionObserver.observe(
          section
        );

      }
    );

  }


  /* =======================================================
     HERO IMAGE MOUSE MOVEMENT
     ======================================================= */

  const heroImage =
    document.querySelector(
      ".hero-image"
    );


  if (
    heroImage &&
    !prefersReducedMotion &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    heroImage.addEventListener(
      "pointermove",
      (event) => {

        const rect =
          heroImage.getBoundingClientRect();

        if (
          !rect.width ||
          !rect.height
        ) {
          return;
        }

        const x =
          (
            event.clientX -
            rect.left
          ) /
          rect.width;

        const y =
          (
            event.clientY -
            rect.top
          ) /
          rect.height;


        heroImage.style.setProperty(
          "--mouse-x",
          `${(x - 0.5) * 7}px`
        );

        heroImage.style.setProperty(
          "--mouse-y",
          `${(y - 0.5) * 7}px`
        );

      }
    );


    heroImage.addEventListener(
      "pointerleave",
      () => {

        heroImage.style.setProperty(
          "--mouse-x",
          "0px"
        );

        heroImage.style.setProperty(
          "--mouse-y",
          "0px"
        );

      }
    );

  }


  /* =======================================================
     HERO IMAGE SCROLL PARALLAX
     ======================================================= */

  const heroImageElement =
    heroImage?.querySelector(
      "img"
    );


  if (
    heroImage &&
    heroImageElement &&
    !prefersReducedMotion &&
    window.innerWidth > 800
  ) {

    let ticking = false;


    const updateParallax = () => {

      const rect =
        heroImage.getBoundingClientRect();

      const center =
        rect.top +
        rect.height / 2;

      const distance =
        center -
        window.innerHeight / 2;

      const offset =
        Math.max(
          -8,
          Math.min(
            8,
            distance * -0.012
          )
        );


      heroImageElement.style.setProperty(
        "--scroll-y",
        `${offset}px`
      );

      ticking = false;

    };


    const requestParallax = () => {

      if (ticking) {
        return;
      }

      window.requestAnimationFrame(
        updateParallax
      );

      ticking = true;

    };


    window.addEventListener(
      "scroll",
      requestParallax,
      {
        passive: true
      }
    );


    window.addEventListener(
      "resize",
      requestParallax
    );


    updateParallax();

  }


  /* =======================================================
     SERVICE CARD TILT
     ======================================================= */

  const cards =
    document.querySelectorAll(
      ".service-card"
    );


  if (
    cards.length &&
    !prefersReducedMotion &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    cards.forEach(
      (card) => {

        card.addEventListener(
          "pointermove",
          (event) => {

            const rect =
              card.getBoundingClientRect();

            const x =
              event.clientX -
              rect.left;

            const y =
              event.clientY -
              rect.top;

            const rotateX =
              (
                (y - rect.height / 2) /
                (rect.height / 2)
              ) * -1.4;

            const rotateY =
              (
                (x - rect.width / 2) /
                (rect.width / 2)
              ) * 1.4;


            card.style.transform = `
              translateY(-8px)
              scale(1.008)
              perspective(900px)
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
            `;

          }
        );


        card.addEventListener(
          "pointerleave",
          () => {

            card.style.transform =
              "";

          }
        );

      }
    );

  }


  /* =======================================================
     MAGNETIC BUTTONS
     ======================================================= */

  const magneticButtons =
    document.querySelectorAll(
      ".primary-button, .nav-cta"
    );


  if (
    magneticButtons.length &&
    !prefersReducedMotion &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    magneticButtons.forEach(
      (button) => {

        button.addEventListener(
          "pointermove",
          (event) => {

            if (
              button.disabled
            ) {
              return;
            }

            const rect =
              button.getBoundingClientRect();

            const x =
              event.clientX -
              (
                rect.left +
                rect.width / 2
              );

            const y =
              event.clientY -
              (
                rect.top +
                rect.height / 2
              );


            button.style.transform = `
              translate(
                ${x * 0.08}px,
                ${y * 0.08}px
              )
            `;

          }
        );


        button.addEventListener(
          "pointerleave",
          () => {

            button.style.transform =
              "";

          }
        );

      }
    );

  }


  /* =======================================================
     CONTACT FORM — FORMSPREE
     ======================================================= */

  const leadForm =
    document.querySelector(
      ".lead-form"
    );


  if (leadForm) {

    const endpoint =
      leadForm.getAttribute(
        "action"
      ) ||
      "https://formspree.io/f/mnpnnooe";


    const submitButton =
      leadForm.querySelector(
        'button[type="submit"]'
      );


    const successMessage =
      leadForm.querySelector(
        ".form-success"
      );


    const errorMessage =
      leadForm.querySelector(
        ".form-error"
      );


    const honeypot =
      leadForm.querySelector(
        'input[name="_gotcha"]'
      );


    const showStatus =
      (
        type,
        message
      ) => {

        if (successMessage) {

          successMessage.classList.toggle(
            "is-visible",
            type === "success"
          );

        }


        if (errorMessage) {

          errorMessage.classList.toggle(
            "is-visible",
            type === "error"
          );


          if (
            type === "error" &&
            message
          ) {

            errorMessage.textContent =
              message;

          }

        }

      };


    leadForm.addEventListener(
      "submit",
      async (event) => {

        event.preventDefault();


        showStatus(null);


        /* Honeypot spam protection */

        if (
          honeypot &&
          honeypot.value.trim() !== ""
        ) {

          return;

        }


        /* Browser validation */

        if (
          !leadForm.checkValidity()
        ) {

          leadForm.reportValidity();

          return;

        }


        const originalButtonHTML =
          submitButton?.innerHTML;


        if (submitButton) {

          submitButton.disabled =
            true;

          submitButton.setAttribute(
            "aria-busy",
            "true"
          );

          submitButton.innerHTML = `
            <span>Sending…</span>
            <span
              class="cta-arrow"
              aria-hidden="true"
            ></span>
          `;

        }


        try {

          const response =
            await fetch(
              endpoint,
              {
                method: "POST",

                body:
                  new FormData(
                    leadForm
                  ),

                headers: {
                  Accept:
                    "application/json"
                }
              }
            );


          let data = null;


          try {

            data =
              await response.json();

          } catch (_) {

            data = null;

          }


          if (
            !response.ok
          ) {

            const serverMessage =
              data?.errors
                ?.map(
                  (error) =>
                    error.message
                )
                ?.join(" ");


            throw new Error(
              serverMessage ||
              "We couldn't send your message. Please email hello@ewols.com."
            );

          }


          /* Successful submission */

          leadForm.reset();


          showStatus(
            "success"
          );


          if (submitButton) {

            submitButton.innerHTML = `
              <span>Message sent</span>
              <span
                class="cta-arrow"
                aria-hidden="true"
              ></span>
            `;

          }


          if (successMessage) {

            successMessage.scrollIntoView({
              behavior:
                prefersReducedMotion
                  ? "auto"
                  : "smooth",

              block: "nearest"
            });

          }


        } catch (error) {

          console.error(
            "Ewols Tech lead form:",
            error
          );


          showStatus(
            "error",
            error.message ||
            "Something went wrong. Please email hello@ewols.com."
          );


          if (submitButton) {

            submitButton.disabled =
              false;

            submitButton.removeAttribute(
              "aria-busy"
            );


            if (
              originalButtonHTML
            ) {

              submitButton.innerHTML =
                originalButtonHTML;

            }

          }


          return;

        }


        if (submitButton) {

          submitButton.removeAttribute(
            "aria-busy"
          );

        }

      }
    );

  }


  /* =======================================================
     PAGE READY
     ======================================================= */

  requestAnimationFrame(
    () => {

      document.body.classList.add(
        "page-ready"
      );

    }
  );

});