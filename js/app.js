/* ==========================================================
   Bunny Lamp Story
   app.js (Part 1)
   ----------------------------------------------------------
   Main Application Controller
========================================================== */

"use strict";

/* ==========================================================
   APP
========================================================== */

const bunnyContainer = document.getElementById("bunny-container");
const moon = document.getElementById("moon");
const body = document.body;
const stars = document.querySelectorAll(".star");

const App = {
  /* ======================================================
       DOM REFERENCES
    ====================================================== */

  elements: {},

  /* ======================================================
       APPLICATION STATE
    ====================================================== */

  state: {
    initialized: false,

    storyStarted: false,

    currentScene: 0,

    typing: false,

    waiting: false,
  },

  /* ======================================================
       CONFIGURATION
    ====================================================== */

  config: {
    loaderDuration: 1800,

    totalStars: 85,

    shootingStarChance: 0.35,
  },

  /* ======================================================
       INITIALIZE
    ====================================================== */

  init() {
    this.cacheDOM();

    this.createStars();

    this.bindEvents();

    this.showLoader();

    console.log("🐰 Bunny Lamp Story Initialized");
  },

  /* ======================================================
       CACHE DOM
    ====================================================== */

  cacheDOM() {
    this.elements.loader = document.getElementById("loader");

    this.elements.app = document.getElementById("app");

    this.elements.sky = document.getElementById("sky");

    this.elements.stars = document.getElementById("stars");

    this.elements.moon = document.getElementById("moon");

    this.elements.stage = document.getElementById("stage");

    this.elements.bunny = document.getElementById("bunny");

    this.elements.dialogue = document.getElementById("dialogue");

    this.elements.speechBubble = document.getElementById("speech-bubble");

    this.elements.speechText = document.getElementById("speech-text");

    this.elements.btnYes = document.getElementById("btn-yes");

    this.elements.btnOfCourse = document.getElementById("btn-of-course");

    this.elements.btnImBack = document.getElementById("btn-im-back");

    this.elements.audio = document.getElementById("ambient-audio");
  },

  /* ======================================================
       EVENTS
    ====================================================== */

  bindEvents() {
    window.addEventListener("load", () => {
      setTimeout(() => {
        this.hideLoader();
      }, this.config.loaderDuration);
    });
  },

  /* ======================================================
       LOADER
    ====================================================== */

  showLoader() {
    if (!this.elements.loader) return;

    this.elements.loader.classList.remove("hidden");
  },

  hideLoader() {
    if (!this.elements.loader) return;

    this.elements.loader.classList.add("hidden");

    setTimeout(() => {
      this.state.initialized = true;

      if (window.Story && Story.startIntro) {
        Story.startIntro();
      }
    }, 800);
  },

  /* ======================================================
       CREATE STARS
    ====================================================== */

  createStars() {
    const container = this.elements.stars;

    if (!container) return;

    const sizes = ["small", "medium", "large"];

    for (let i = 0; i < this.config.totalStars; i++) {
      const star = document.createElement("span");

      const size = sizes[Math.floor(Math.random() * sizes.length)];

      star.className = `star ${size}`;

      star.style.left = `${Math.random() * 100}%`;

      star.style.top = `${Math.random() * 100}%`;

      star.style.opacity = (0.35 + Math.random() * 0.65).toFixed(2);

      star.style.animationDelay = `${(Math.random() * 8).toFixed(2)}s`;

      star.style.animationDuration = `${(3 + Math.random() * 5).toFixed(2)}s`;

      container.appendChild(star);
    }

    this.startShootingStars();
  },

  /* ======================================================
       SHOOTING STARS
    ====================================================== */

  startShootingStars() {
    setInterval(() => {
      if (Math.random() > this.config.shootingStarChance) return;

      this.spawnShootingStar();
    }, 7000);
  },

  spawnShootingStar() {
    const star = document.createElement("div");

    star.className = "shooting-star";

    star.style.top = `${10 + Math.random() * 40}%`;

    star.style.left = `${80 + Math.random() * 20}%`;

    this.elements.sky.appendChild(star);

    setTimeout(() => {
      star.remove();
    }, 5000);
  },

  /* ======================================================
       UTILITIES
    ====================================================== */

  wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  },

  random(min, max) {
    return Math.random() * (max - min) + min;
  },

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  clamp(value, min, max) {
    return Math.min(
      Math.max(value, min),

      max,
    );
  },

  addClass(element, className) {
    if (!element) return;

    element.classList.add(className);
  },

  removeClass(element, className) {
    if (!element) return;

    element.classList.remove(className);
  },

  toggleClass(element, className, enabled) {
    if (!element) return;

    element.classList.toggle(className, enabled);
  },

  /* ======================================================
       SPEECH BUBBLE
    ====================================================== */

  showSpeechBubble() {
    const bubble = this.elements.speechBubble;

    if (!bubble) return;

    bubble.classList.remove("fade-out");
    bubble.classList.add("fade-in");
  },

  hideSpeechBubble() {
    const bubble = this.elements.speechBubble;

    if (!bubble) return;

    bubble.classList.remove("fade-in");
    bubble.classList.add("fade-out");
  },

  async updateSpeech(text, animate = true) {
    const bubble = this.elements.speechBubble;
    const speech = this.elements.speechText;

    if (!bubble || !speech) return;

    if (animate) {
      bubble.classList.remove("fade-in");
      bubble.classList.add("fade-out");

      await this.wait(350);
    }

    speech.innerHTML = text;

    if (animate) {
      bubble.classList.remove("fade-out");
      bubble.classList.add("fade-in");
    }
  },

  clearSpeech() {
    this.elements.speechText.innerHTML = "";
  },

  /* ======================================================
       BUTTONS
    ====================================================== */

  showStartButtons() {
    this.elements.btnYes.classList.remove("hidden");
    this.elements.btnOfCourse.classList.remove("hidden");

    this.elements.btnImBack.classList.add("hidden");
  },

  hideStartButtons() {
    this.elements.btnYes.classList.add("hidden");
    this.elements.btnOfCourse.classList.add("hidden");
  },

  showGiftButton() {
    this.elements.btnImBack.classList.remove("hidden");
  },

  hideGiftButton() {
    this.elements.btnImBack.classList.add("hidden");
  },

  enableButtons() {
    document.querySelectorAll(".choice-button").forEach((button) => {
      button.disabled = false;
    });
  },

  disableButtons() {
    document.querySelectorAll(".choice-button").forEach((button) => {
      button.disabled = true;
    });
  },

  /* ======================================================
       SCENE MANAGEMENT
    ====================================================== */

  setScene(sceneNumber) {
    this.state.currentScene = sceneNumber;
  },

  nextScene() {
    this.state.currentScene++;

    return this.state.currentScene;
  },

  previousScene() {
    if (this.state.currentScene > 0) this.state.currentScene--;

    return this.state.currentScene;
  },

  getCurrentScene() {
    return this.state.currentScene;
  },

  /* ======================================================
       APP TRANSITIONS
    ====================================================== */

  async fadeOut(element) {
    if (!element) return;

    element.classList.remove("scene-show");

    element.classList.add("scene-fade");

    await this.wait(1200);
  },

  async fadeIn(element) {
    if (!element) return;

    element.classList.remove("scene-fade");

    element.classList.add("scene-show");

    await this.wait(1200);
  },

  /* ======================================================
       BUNNY STATES
    ====================================================== */

  bunnySleep() {
    const bunny = this.elements.bunny;

    bunny.classList.remove("awake", "hopping", "wave");

    bunny.classList.add("sleeping");
  },

  bunnyWake() {
    const bunny = this.elements.bunny;

    bunny.classList.remove("sleeping");

    bunny.classList.add("awake");
  },

  bunnyHop() {
    const bunny = this.elements.bunny;

    bunny.classList.remove("hopping");

    void bunny.offsetWidth;

    bunny.classList.add("hopping");
  },

  bunnyWave() {
    const bunny = this.elements.bunny;

    bunny.classList.remove("wave");

    void bunny.offsetWidth;

    bunny.classList.add("wave");
  },

  /* ======================================================
       STORY HELPERS
    ====================================================== */

  async pause(milliseconds) {
    await this.wait(milliseconds);
  },

  async say(text, delay = 2200) {
    await this.updateSpeech(text);

    await this.wait(delay);
  },

  /* ======================================================
       RESET
    ====================================================== */

  reset() {
    this.state.storyStarted = false;

    this.state.currentScene = 0;

    this.state.typing = false;

    this.state.waiting = false;

    this.clearSpeech();

    this.showStartButtons();

    this.hideGiftButton();

    this.bunnySleep();
  },

  /* ======================================================
       STORY FLOW
    ====================================================== */

  async startStory() {
    if (this.state.storyStarted) return;

    this.state.storyStarted = true;

    this.hideStartButtons();

    this.bunnyWake();

    if (
      window.AudioController &&
      typeof AudioController.startAmbient === "function"
    ) {
      AudioController.startAmbient();
    }

    if (window.Story && typeof Story.beginConversation === "function") {
      Story.beginConversation();
    }
  },

  async giftOpened() {
    this.hideGiftButton();

    this.bunnyHop();

    if (window.Story && typeof Story.resumeAfterGift === "function") {
      Story.resumeAfterGift();
    }
  },

  /* ======================================================
       EVENT REGISTRATION
    ====================================================== */

  registerButtonEvents() {
    this.elements.btnYes.addEventListener("click", () => {
      this.startStory();
    });

    this.elements.btnOfCourse.addEventListener("click", () => {
      this.startStory();
    });

    this.elements.btnImBack.addEventListener("click", () => {
      this.giftOpened();
    });
  },

  registerBunnyEvents() {
    this.elements.bunny.addEventListener("mouseenter", () => {
      if (window.Bunny && typeof Bunny.lookHappy === "function") {
        Bunny.lookHappy();
      }
    });

    this.elements.bunny.addEventListener("mouseleave", () => {
      if (window.Bunny && typeof Bunny.idle === "function") {
        Bunny.idle();
      }
    });
  },

  /* ======================================================
       READY STATE
    ====================================================== */

  onReady() {
    this.registerButtonEvents();

    this.registerBunnyEvents();

    this.reset();

    console.log("🌙 UI Ready");
  },

  /* ======================================================
       MODULE CHECK
    ====================================================== */

  verifyModules() {
    console.group("🐰 Bunny Story");

    console.log("Story:", window.Story ? "✓ Loaded" : "✗ Missing");

    console.log("Bunny:", window.Bunny ? "✓ Loaded" : "✗ Missing");

    console.log("Audio:", window.AudioController ? "✓ Loaded" : "✗ Missing");

    console.groupEnd();
  },

  /* ======================================================
       PUBLIC API
    ====================================================== */

  getSpeechElement() {
    return this.elements.speechText;
  },

  getBubbleElement() {
    return this.elements.speechBubble;
  },

  getBunnyElement() {
    return this.elements.bunny;
  },

  getAudioElement() {
    return this.elements.audio;
  },

  /* ======================================================
       STARTUP
    ====================================================== */

  start() {
    this.onReady();

    this.verifyModules();
  },
};

const bunny = document.getElementById("bunny");

const storyBox = document.getElementById("story-box");

const storyText = document.getElementById("story-text");

let currentPage = 0;

let writing = false;

bunny.addEventListener("click", () => {
  if (writing) return;

  //   moveBunnyToCorner();

  startStory();
});

function startStory() {
  const hint = document.getElementById("tapHint");

  hint.style.transition = "opacity 0.8s ease";
  hint.style.opacity = "0";

  setTimeout(() => {
    hint.style.display = "none";
  }, 800);

  storyBox.classList.add("show");

  bunny.classList.add("story-mode");

  moon.classList.add("story-moon");

  body.classList.add("story-night");

  stars.forEach((s) => s.classList.add("magic"));

  startParticles();

  moveBunnyToCorner();

  showPage();
}

function moveBunnyToCorner() {
  bunnyContainer.style.transition =
    "left 3.8s cubic-bezier(.22,.61,.36,1), top 3.8s cubic-bezier(.22,.61,.36,1)";

  bunnyContainer.style.left = "88%";
  bunnyContainer.style.top = "82%";
  bunnyContainer.style.transform = "translate(-50%, -50%)";

  bunny.style.transition = "transform 3.8s ease";

  bunny.style.transform = "rotate(5deg) scale(.95)";

  setTimeout(() => {
    bunny.style.transform = "rotate(0deg) scale(1)";
  }, 3800);
}

async function showPage() {
  if (currentPage >= story.length) {
    storyFinished();
    return;
  }

  sceneReaction(currentPage);

  storyText.innerHTML = story[currentPage];

  // 👇 Add these two lines
  bunny.style.transform = "scale(1.04)";
  bunny.style.transition = "transform 0.8s ease";

  storyBox.classList.remove("hide");
  storyBox.classList.add("show");

  await sleep(4200);

  // 👇 Add these two lines
  bunny.style.transform = "scale(1)";
  bunny.style.transition = "transform 0.8s ease";

  storyBox.classList.remove("show");
  storyBox.classList.add("hide");

  await sleep(900);

  currentPage++;

  showPage();
}

const bunnyPositions = [
  { x: 50, y: 72 },

  { x: 25, y: 65 },

  { x: 72, y: 55 },

  { x: 48, y: 42 },

  { x: 20, y: 50 },

  { x: 78, y: 65 },

  { x: 52, y: 72 },
];

let bunnyIndex = 0;

async function storyFinished() {
  storyText.innerHTML = "";

  bunnyContainer.style.transition = "left 2.8s ease, top 2.8s ease";

  bunnyContainer.style.left = "50%";
  bunnyContainer.style.top = "50%";
  bunnyContainer.style.transform = "translate(-50%, -50%)";

  bunnyContainer.classList.remove("bunny-spin");
  bunnyContainer.classList.remove("bunny-hop");

  await sleep(2500);

  await finalMessage(`One last thing...`);

  await finalMessage(
    `This little light isn't here to make your room brighter...`,
  );

  await finalMessage(`It's here to remind you...`);

  await finalMessage(
    `A month ago...

this was simply

an apartment.`,
  );

  await finalMessage(
    `Tonight...

it finally feels

like home.`,
  );

  bunnyGlow();

  await finalMessage(
    `Homes aren't found...

They're built...

one brave day...

one solved problem...

one peaceful night...

at a time.`,
  );

  await sleep(1000);

  finalScene();
}

function startParticles() {
  setInterval(() => {
    const p = document.createElement("div");

    p.className = "story-particle";

    const rect = bunny.getBoundingClientRect();

    p.style.left = rect.left + rect.width / 2 + "px";

    p.style.top = rect.top + rect.height / 2 + "px";

    document.body.appendChild(p);

    setTimeout(() => {
      p.remove();
    }, 3000);
  }, 220);
}

function sceneReaction(index) {
  if (index == 3 || index == 4 || index == 5) {
    body.style.filter = "brightness(.88)";
  } else {
    body.style.filter = "brightness(1)";
  }

  if (index == 8) {
    createHeart();
  }

  if (index == 18) {
    shootingStars();
  }
}

function createHeart() {
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      const h = document.createElement("div");

      h.className = "heart";

      h.innerHTML = "🤍";

      const rect = bunny.getBoundingClientRect();

      h.style.left = rect.left + Math.random() * 150 + "px";

      h.style.top = rect.top + 80 + "px";

      document.body.appendChild(h);

      setTimeout(() => {
        h.remove();
      }, 4000);
    }, i * 180);
  }
}

function shootingStars() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const s = document.createElement("div");

      s.className = "shooting-star";

      s.style.left = window.innerWidth + 100 + "px";

      s.style.top = Math.random() * 200 + "px";

      document.body.appendChild(s);

      setTimeout(() => {
        s.remove();
      }, 5000);
    }, i * 1300);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function finalMessage(text) {
  storyText.innerHTML = "";

  await typeText(text);

  await sleep(2200);
}

function bunnyGlow() {
  bunny.style.transition = "2s";

  bunny.style.transform = "scale(1.12)";

  bunny.style.filter = `
drop-shadow(0 0 25px rgba(255,240,180,.8))
drop-shadow(0 0 60px rgba(255,240,180,.6))
drop-shadow(0 0 90px rgba(255,240,180,.3))
`;
}

async function finalScene() {
  storyBox.style.opacity = "0";

  await sleep(1200);

  createFinalCard();
}

function createFinalCard() {
  const card = document.createElement("div");

  card.id = "ending-card";

  card.innerHTML = `

        <div class="ending-content">

            <h1>🐰</h1>

            <h2>Welcome Home.</h2>

            <p>

            Not to a flat.

            <br><br>

            But to your home.

            </p>

            <br>

            <div class="gift-message">

            May this tiny bunny quietly light your room,

            your nights,

            and remind you

            how far you've already come.

            </div>

            <br><br>

            <button id="giftBtn">

            🎁 Open Your Gift

            </button>

        </div>

    `;

  document.body.appendChild(card);

  document.getElementById("giftBtn").addEventListener("click", giftReveal);
}

async function giftReveal() {
  const btn = document.getElementById("giftBtn");

  btn.remove();

  const text = document.createElement("div");

  text.className = "gift-letter";

  text.innerHTML = `

A tiny bunny...

for someone

who quietly proved

that even difficult beginnings

can have beautiful endings.

🤍

`;

  document.querySelector(".ending-content").appendChild(text);

  createConfetti();
}

function createConfetti() {
  for (let i = 0; i < 150; i++) {
    const c = document.createElement("div");

    c.className = "confetti";

    c.style.left = Math.random() * 100 + "vw";

    c.style.animationDelay = Math.random() * 2 + "s";

    c.style.background = `hsl(${Math.random() * 50 + 30},100%,75%)`;

    document.body.appendChild(c);

    setTimeout(() => {
      c.remove();
    }, 7000);
  }
}

/* ==========================================================
   START APPLICATION
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  bunnyContainer.style.left = "50%";
  bunnyContainer.style.top = "50%";
  bunnyContainer.style.transform = "translate(-50%, -50%)";
  App.init();
});
