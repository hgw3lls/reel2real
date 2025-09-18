// js/main.js

// Expecting FILMS_DATA + buildQuestionsFromFilms (from question.js)
// and Quiz class (from quiz.js)

let quiz = null;

/* ---------------- Setup ---------------- */

function initQuizRun() {
  if (!window.FILMS_DATA || !window.buildQuestionsFromFilms) {
    console.error("FILMS_DATA or buildQuestionsFromFilms is missing. Check question.js setup.");
    alert("Quiz data not loaded. Please check question.js.");
    return;
  }
  const questions = window.buildQuestionsFromFilms(window.FILMS_DATA);
  quiz = new Quiz(questions);
}

/* ---------------- DOM ---------------- */
const startBtn   = document.querySelector(".btn-start");
const nextBtn    = document.querySelector(".next");
const replayBtn  = document.querySelector(".replay-btn");
const quitBtn    = document.querySelector(".quit-btn");
const restartBtn = document.querySelector(".restart-btn"); // optional, if present

const quizBox        = document.querySelector(".quiz-box");
const scoreBox       = document.querySelector(".score-box");
const badgeEl        = document.querySelector(".badge");
const questionTextEl = document.querySelector(".question-text");
const optionListEl   = document.querySelector(".option-list");

const timeTextEl = document.querySelector(".time-text");
const secondEl   = document.querySelector(".second");
const timeLineEl = document.querySelector(".time-line");

// Location figure (image + caption)
const figEl = document.querySelector(".location-figure");
const imgEl = document.querySelector(".location-image");
const capEl = document.querySelector(".location-caption");

// Ticket (score) elements
const ticketIconEl   = document.querySelector(".ticket-icon");
const scoreRankEl    = document.querySelector(".score-rank");
const scoreSummaryEl = document.querySelector(".score-summary");

const correctIcon   = '<div class="icon"><i class="fas fa-check"></i></div>';
const incorrectIcon = '<div class="icon"><i class="fas fa-times"></i></div>';

/* ---------------- Events ---------------- */

if (startBtn) {
  startBtn.addEventListener("click", () => {
    // hide Start while quiz is active
    startBtn.style.display = "none";
    initQuizRun();
    if (!quiz) return;
    quizBox.classList.add("active");
    renderCurrent();
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (!quiz) return;
    clearIntervalSafe();
    if (quiz.length > quiz.questionIndex + 1) {
      quiz.questionIndex++;
      renderCurrent();
    } else {
      // End of quiz -> show ticket
      quizBox.classList.remove("active");
      scoreBox.classList.add("active");
      showScore(quiz.correctAnswers, quiz.length);
    }
  });
}

if (replayBtn) {
  replayBtn.addEventListener("click", () => {
    // Start a fresh randomized set immediately
    scoreBox.classList.remove("active");
    if (startBtn) startBtn.click();
  });
}

if (quitBtn) {
  quitBtn.addEventListener("click", () => {
    window.location.reload();
  });
}

// Optional: Restart button returns to the Start screen
if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    clearIntervalSafe();
    if (quiz) {
      quiz.questionIndex = 0;
      quiz.correctAnswers = 0;
    }
    // Reset UI bits
    if (timeTextEl) timeTextEl.textContent = "Remaining Time";
    if (secondEl)   secondEl.textContent   = "10";
    if (timeLineEl) timeLineEl.style.width = "0%";
    if (optionListEl)   optionListEl.innerHTML   = "";
    if (questionTextEl) questionTextEl.innerHTML = "";

    quizBox.classList.remove("active");
    scoreBox.classList.remove("active");
    if (startBtn) startBtn.style.display = "inline-block";
  });
}

/* ---------------- Render ---------------- */

function renderCurrent() {
  const q = quiz.callQuestion();
  if (!q) return;

  // Reset header timer text
  if (timeTextEl) timeTextEl.textContent = "Remaining Time";

  // Full-width location image with caption
  if (figEl && imgEl && capEl) {
    if (q.meta && q.meta.location && q.meta.location.image) {
      imgEl.src = q.meta.location.image;
      imgEl.alt = q.meta.location.name || "Location image";
      capEl.textContent = q.meta.location.name || "";
      figEl.style.display = "block";
    } else {
      figEl.style.display = "none";
    }
  }

  // Question text
  if (questionTextEl) {
    questionTextEl.innerHTML = `<span>${q.questionText}</span>`;
  }

  // Options (a,b,c,d)
  if (optionListEl) {
    let html = "";
    for (let key of ["a", "b", "c", "d"]) {
      html += `
        <div class="option" data-key="${key}">
          <span><b>${key}</b>: ${q.answers[key]}</span>
        </div>
      `;
    }
    optionListEl.innerHTML = html;

    // bind clicks
    optionListEl.querySelectorAll(".option").forEach(el => {
      el.addEventListener("click", () => optionSelected(el));
    });
  }

  // Counters & timers
  showNumber(quiz.questionIndex + 1, quiz.length);
  startTimer(10);
  startLine();
}

/* ---------------- Option Logic ---------------- */

function optionSelected(optionEl) {
  clearIntervalSafe();

  const q = quiz.callQuestion();
  if (!q) return;

  const pickedKey =
    optionEl.getAttribute("data-key") ||
    optionEl.querySelector("span b")?.textContent;

  if (q.checkAnswer(pickedKey)) {
    optionEl.classList.add("correct");
    optionEl.insertAdjacentHTML("beforeend", correctIcon);
    quiz.correctAnswers++;
  } else {
    optionEl.classList.add("incorrect");
    optionEl.insertAdjacentHTML("beforeend", incorrectIcon);
  }

  revealCorrectAndLock(q);
}

function revealCorrectAndLock(q) {
  if (!optionListEl) return;
  for (let el of optionListEl.children) {
    const key =
      el.getAttribute("data-key") ||
      el.querySelector("span b")?.textContent;

    if (key === q.correctAnswer) {
      el.classList.add("correct");
      if (!el.querySelector(".icon")) {
        el.insertAdjacentHTML("beforeend", correctIcon);
      }
    }
    el.classList.add("disabled");
  }
}

/* ---------------- UI helpers ---------------- */

function showNumber(questionNumber, allQuestions) {
  if (badgeEl) {
    badgeEl.innerHTML = `<span>${questionNumber} / ${allQuestions}</span>`;
  }
}

function showScore(correctAnswers, allQuestions) {
  const rank    = getRankTitle(correctAnswers, allQuestions);
  const image   = getRankImage(correctAnswers, allQuestions);
  const summary = `You have ${correctAnswers} correct answers out of ${allQuestions}.`;

  // Populate the ticket UI
  if (scoreRankEl)    scoreRankEl.textContent = rank;
  if (scoreSummaryEl) scoreSummaryEl.textContent = summary;

  if (ticketIconEl) {
    ticketIconEl.innerHTML = image
      ? `<img src="${image}" alt="${rank}" onerror="this.style.display='none'">`
      : "";
  }

  // Hide any legacy .score-text if it still exists (avoid duplicate lines)
  const legacy = document.querySelector(".score-text");
  if (legacy) {
    legacy.innerHTML = "";
    legacy.style.display = "none";
  }
}

/* ---------------- Rank mapping ---------------- */

function getRankTitle(score, total) {
  if (score === total) return "Consider yourself a Hollywood Mogul";
  if (score === 9) return "You’re a Director";
  if (score >= 7 && score <= 8) return "You’re a Hollywood Star";
  if (score === 6) return 'You are a "Stand In"';
  if (score >= 4 && score <= 5) return "You’re a Prop Assistant";
  if (score === 3) return "You’re a ticket taker at a local theater";
  return "You make the popcorn at the local theater";
}

function getRankImage(score, total) {
  // Point these to your actual files in /images/
  if (score === total) return "images/mogul.png";
  if (score === 9) return "images/director.png";
  if (score >= 7 && score <= 8) return "images/star.png";
  if (score === 6) return "images/standin.png";
  if (score >= 4 && score <= 5) return "images/props.png";
  if (score === 3) return "images/ticket.png";
  return "images/popcorn.png";
}


/* ---------------- Timer & Timeline ---------------- */

let counter = null;
let counterLine = null;

function clearIntervalSafe() {
  if (counter)     { clearInterval(counter); counter = null; }
  if (counterLine) { clearInterval(counterLine); counterLine = null; }
}

function startTimer(time) {
  clearIntervalSafe(); // reset both; timeline restarts below
  counter = setInterval(tick, 1000);

  function tick() {
    if (secondEl) secondEl.textContent = time;
    time--;

    if (time < 0) {
      if (counter)     { clearInterval(counter); counter = null; }
      if (counterLine) { clearInterval(counterLine); counterLine = null; }
      if (timeTextEl) timeTextEl.textContent = "Time Over";

      const q = quiz?.callQuestion?.();
      if (!q) return;
      revealCorrectAndLock(q);
    }
  }
}

function startLine() {
  if (counterLine) { clearInterval(counterLine); counterLine = null; }
  let lineWidth = 0;
  counterLine = setInterval(() => {
    if (timeLineEl) timeLineEl.style.width = lineWidth + "%";
    lineWidth += 0.181;
    if (lineWidth > 100.1) {
      clearInterval(counterLine);
      counterLine = null;
    }
  }, 20);
}

/* -------------- Convenience Getter -------------- */
if (!Object.getOwnPropertyDescriptor(Quiz.prototype, "length")) {
  Object.defineProperty(Quiz.prototype, "length", {
    get() { return this.questions.length; }
  });
}











if (startOverlay) {
  startOverlay.addEventListener('pointerdown', kickoff, { once: true });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') kickoff();
  }, { once: true });
}

// Tap/click anywhere to start (clean final version)
(function() {
  function findStartButton() {
    // Try common selectors
    let btn = document.querySelector('.start_btn') 
           || document.querySelector('.start-btn')
           || document.querySelector('[data-start="true"]')
           || Array.from(document.querySelectorAll('button, .btn, [role="button"]'))
                .find(el => /start/i.test(el.textContent || ''));
    return btn || null;
  }

  function kickoff() {
    const overlay = document.getElementById('start-overlay');
    if (overlay) overlay.classList.add('hidden');

    // Retry until button is ready
    const start = performance.now();
    function tick() {
      const btn = findStartButton();
      if (btn) {
        Promise.resolve().then(() => btn.click()); // let listeners attach
        return;
      }
      if (performance.now() - start < 2000) {
        requestAnimationFrame(tick);
      } else if (typeof window.startQuiz === 'function') {
        window.startQuiz();
      }
    }
    tick();
  }

  function armOverlay() {
    const overlay = document.getElementById('start-overlay');
    if (!overlay) return;
    const onceKick = () => { kickoff(); window.removeEventListener('keydown', keyKick); };
    const keyKick = (e) => {
      if (e.key === 'Enter' || e.key === ' ') onceKick();
    };
    overlay.addEventListener('click', onceKick, { once: true });
    window.addEventListener('keydown', keyKick, { once: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', armOverlay, { once: true });
  } else {
    armOverlay();
  }
})();
