// Small, dependency-free easter eggs.
// Everything here is progressive enhancement — the résumé works fine without it.

(function () {
  "use strict";

  /* 1. Styled console greeting for the curious who open DevTools. */
  console.log(
    "%cHey there, fellow dev! 👋",
    "color:#ff9a00;font-size:18px;font-weight:700;"
  );
  console.log(
    "%cThanks for digging through the source. Try the Konami code on the page… ↑↑↓↓←→←→ B A",
    "color:#5c5c62;font-size:13px;"
  );
  console.log("%cWho is John Galt? 🏭", "color:#8a8f98;font-style:italic;");

  /* 2. Konami code → "Rearden Metal mode" (persisted in localStorage). */
  var KONAMI = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  var progress = 0;
  var banner = document.querySelector(".egg-banner");

  function enableReardenMode(showBanner) {
    document.body.classList.add("rearden-mode");
    try {
      localStorage.setItem("reardenMode", "1");
    } catch (e) {
      /* localStorage may be unavailable (private mode) — ignore. */
    }
    if (showBanner && banner) {
      banner.hidden = false;
      setTimeout(function () {
        banner.hidden = true;
      }, 4000);
    }
  }

  // Restore the mode on reload if it was unlocked before.
  try {
    if (localStorage.getItem("reardenMode") === "1") {
      document.body.classList.add("rearden-mode");
    }
  } catch (e) {
    /* ignore */
  }

  document.addEventListener("keydown", function (event) {
    var expected = KONAMI[progress];
    if (event.key.toLowerCase() === expected.toLowerCase()) {
      progress += 1;
      if (progress === KONAMI.length) {
        progress = 0;
        enableReardenMode(true);
      }
    } else {
      // Reset, but allow the wrong key to start a fresh sequence.
      progress = event.key === KONAMI[0] ? 1 : 0;
    }
  });

  /* 3. Click the avatar 5× for a little wobble. */
  var avatar = document.querySelector(".contact-info__avatar");
  if (avatar) {
    var clicks = 0;
    avatar.addEventListener("click", function () {
      clicks += 1;
      if (clicks >= 5) {
        clicks = 0;
        avatar.classList.add("contact-info__avatar--wobble");
      }
    });
    avatar.addEventListener("animationend", function () {
      avatar.classList.remove("contact-info__avatar--wobble");
    });
  }
})();
