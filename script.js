/* =========================================================
   EWOLS TECH
   INTERACTION & MOTION
   ========================================================= */


/* =========================================================
   PREVENT REFRESH SCROLL JUMP
   ========================================================= */

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {

  if (window.scrollY !== 0) {

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });

  }

});


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  /* =======================================================
     JS READY
     ======================================================= */

  document.documentElement.classList.add(
    "js-ready"
  );


  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  const menuButton =
    document.querySelector(".menu-button");

  const navLinks =
    document.querySelector(".nav-links");


  if (menuButton && navLinks) {

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );


    menuButton.addEventListener(
      "click",
      () => {

        const isOpen =
          navLinks.classList.toggle(
            "is-open"
          );

        menuButton.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

      }
    );


    navLinks
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {

            navLinks.classList.remove(
              "is-open"
            );

            menuButton.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      });


    document.addEventListener(
      "click",
      event => {

        if (
          !navLinks.contains(
            event.target
          ) &&
          !menuButton.contains(
            event.target
          )
        ) {

          navLinks.classList.remove(
            "is-open"
          );

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      }
    );

  }


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".services, .approach, .contact, .reveal"
    );


  if (prefersReducedMotion) {

    revealElements.forEach(
      element => {

        element.classList.add(
          "is-visible"
        );

      }
    );

  } else {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "is-visible"
                );

                revealObserver.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold:
            0.12,

          rootMargin:
            "0px 0px -55px 0px"
        }
      );


    revealElements.forEach(
      element => {

        revealObserver.observe(
          element
        );

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
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

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

            block:
              "start"
          });

        }
      );

    });


  /* =======================================================
     HEADER SCROLL STATE
     ======================================================= */

  const header =
    document.querySelector(
      ".site-header"
    );


  if (header) {

    let ticking = false;


    const updateHeader =
      () => {

        if (window.scrollY > 30) {

          header.classList.add(
            "scrolled"
          );

        } else {

          header.classList.remove(
            "scrolled"
          );

        }

        ticking = false;

      };


    window.addEventListener(
      "scroll",
      () => {

        if (!ticking) {

          window.requestAnimationFrame(
            updateHeader
          );

          ticking = true;

        }

      },
      {
        passive: true
      }
    );


    updateHeader();

  }


  /* =======================================================
     HERO IMAGE PARALLAX
     ======================================================= */

  const heroImage =
    document.querySelector(
      ".hero-image"
    );

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


    const updateParallax =
      () => {

        const rect =
          heroImage.getBoundingClientRect();

        const viewportHeight =
          window.innerHeight;

        const center =
          rect.top +
          rect.height / 2;

        const distance =
          center -
          viewportHeight / 2;

        const offset =
          Math.max(
            -8,
            Math.min(
              8,
              distance * -.012
            )
          );


        heroImageElement.style.setProperty(
          "--scroll-y",
          `${offset}px`
        );


        ticking = false;

      };


    const requestParallax =
      () => {

        if (!ticking) {

          window.requestAnimationFrame(
            updateParallax
          );

          ticking = true;

        }

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
     HERO MOUSE MOVEMENT
     ======================================================= */

  if (
    heroImage &&
    !prefersReducedMotion &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    heroImage.addEventListener(
      "pointermove",
      event => {

        const rect =
          heroImage.getBoundingClientRect();

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

        const moveX =
          (x - .5) * 7;

        const moveY =
          (y - .5) * 7;


        heroImage.style.setProperty(
          "--mouse-x",
          `${moveX}px`
        );

        heroImage.style.setProperty(
          "--mouse-y",
          `${moveY}px`
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
     SERVICE CARD TILT
     ======================================================= */

  const cards =
    document.querySelectorAll(
      ".service-card"
    );


  if (
    !prefersReducedMotion &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    cards.forEach(
      card => {

        card.addEventListener(
          "pointermove",
          event => {

            const rect =
              card.getBoundingClientRect();

            const x =
              event.clientX -
              rect.left;

            const y =
              event.clientY -
              rect.top;

            const centerX =
              rect.width / 2;

            const centerY =
              rect.height / 2;

            const rotateX =
              (
                (y - centerY) /
                centerY
              ) * -1.4;

            const rotateY =
              (
                (x - centerX) /
                centerX
              ) * 1.4;


            card.style.transform =
              `
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
    !prefersReducedMotion &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    magneticButtons.forEach(
      button => {

        button.addEventListener(
          "pointermove",
          event => {

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


            button.style.transform =
              `
              translate(
                ${x * .08}px,
                ${y * .08}px
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
    navAnchors.length
  ) {

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

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
                anchor => {

                  anchor.classList.remove(
                    "active"
                  );


                  if (
                    anchor.getAttribute(
                      "href"
                    ) ===
                    `#${id}`
                  ) {

                    anchor.classList.add(
                      "active"
                    );

                  }

                }
              );

            }
          );

        },
        {
          threshold:
            .35
        }
      );


    sections.forEach(
      section => {

        sectionObserver.observe(
          section
        );

      }
    );

  }


  /* =======================================================
     GENERIC REVEAL ELEMENTS
     ======================================================= */

  document
    .querySelectorAll(
      ".reveal"
    )
    .forEach(
      element => {

        if (
          !prefersReducedMotion
        ) {

          element.style.willChange =
            "transform, opacity";

        }

      }
    );


  /* =======================================================
     ESCAPE CLOSES MOBILE MENU
     ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        navLinks &&
        menuButton
      ) {

        navLinks.classList.remove(
          "is-open"
        );

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );


  /* =======================================================
     PAGE READY
     ======================================================= */

  requestAnimationFrame(() => {

    document.body.classList.add(
      "page-ready"
    );

  });

});