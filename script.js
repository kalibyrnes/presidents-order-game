// -------------------------
// PRESIDENTS DATA
// -------------------------
const PRESIDENTS = [
  { name: "George Washington", terms: "1789–1797", answers: ["washington"] },
  { name: "John Adams", terms: "1797–1801", answers: ["adams"] },
  { name: "Thomas Jefferson", terms: "1801–1809", answers: ["jefferson"] },
  { name: "James Madison", terms: "1809–1817", answers: ["madison"] },
  { name: "James Monroe", terms: "1817–1825", answers: ["monroe"] },
  { name: "John Quincy Adams", terms: "1825–1829", answers: ["john quincy adams","quincy adams","adams"] },
  { name: "Andrew Jackson", terms: "1829–1837", answers: ["jackson"] },
  { name: "Martin Van Buren", terms: "1837–1841", answers: ["van buren","vanburen"] },
  { name: "William Henry Harrison", terms: "1841", answers: ["harrison"] },
  { name: "John Tyler", terms: "1841–1845", answers: ["tyler"] },
  { name: "James K. Polk", terms: "1845–1849", answers: ["polk"] },
  { name: "Zachary Taylor", terms: "1849–1850", answers: ["taylor"] },
  { name: "Millard Fillmore", terms: "1850–1853", answers: ["fillmore"] },
  { name: "Franklin Pierce", terms: "1853–1857", answers: ["pierce"] },
  { name: "James Buchanan", terms: "1857–1861", answers: ["buchanan"] },
  { name: "Abraham Lincoln", terms: "1861–1865", answers: ["lincoln"] },
  { name: "Andrew Johnson", terms: "1865–1869", answers: ["johnson"] },
  { name: "Ulysses S. Grant", terms: "1869–1877", answers: ["grant"] },
  { name: "Rutherford B. Hayes", terms: "1877–1881", answers: ["hayes"] },
  { name: "James A. Garfield", terms: "1881", answers: ["garfield"] },
  { name: "Chester A. Arthur", terms: "1881–1885", answers: ["arthur"] },
  { name: "Grover Cleveland", terms: "1885–1889", answers: ["cleveland"] },
  { name: "Benjamin Harrison", terms: "1889–1893", answers: ["harrison"] },
  { name: "Grover Cleveland", terms: "1893–1897", answers: ["cleveland"] },
  { name: "William McKinley", terms: "1897–1901", answers: ["mckinley"] },
  { name: "Theodore Roosevelt", terms: "1901–1909", answers: ["roosevelt"] },
  { name: "William Howard Taft", terms: "1909–1913", answers: ["taft"] },
  { name: "Woodrow Wilson", terms: "1913–1921", answers: ["wilson"] },
  { name: "Warren G. Harding", terms: "1921–1923", answers: ["harding"] },
  { name: "Calvin Coolidge", terms: "1923–1929", answers: ["coolidge"] },
  { name: "Herbert Hoover", terms: "1929–1933", answers: ["hoover"] },
  { name: "Franklin D. Roosevelt", terms: "1933–1945", answers: ["roosevelt"] },
  { name: "Harry S. Truman", terms: "1945–1953", answers: ["truman"] },
  { name: "Dwight D. Eisenhower", terms: "1953–1961", answers: ["eisenhower"] },
  { name: "John F. Kennedy", terms: "1961–1963", answers: ["kennedy"] },
  { name: "Lyndon B. Johnson", terms: "1963–1969", answers: ["johnson"] },
  { name: "Richard Nixon", terms: "1969–1974", answers: ["nixon"] },
  { name: "Gerald Ford", terms: "1974–1977", answers: ["ford"] },
  { name: "Jimmy Carter", terms: "1977–1981", answers: ["carter"] },
  { name: "Ronald Reagan", terms: "1981–1989", answers: ["reagan"] },
  { name: "George H. W. Bush", terms: "1989–1993", answers: ["bush"] },
  { name: "Bill Clinton", terms: "1993–2001", answers: ["clinton"] },
  { name: "George W. Bush", terms: "2001–2009", answers: ["bush"] },
  { name: "Barack Obama", terms: "2009–2017", answers: ["obama"] },
  { name: "Donald Trump", terms: "2017–2021", answers: ["trump"] },
  { name: "Joe Biden", terms: "2021–2025", answers: ["biden"] },
  { name: "Donald Trump", terms: "2025–present", answers: ["trump"] }
];

// -------------------------
// ELEMENTS
// -------------------------
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const listContainer = document.getElementById("listContainer");
const timerEl = document.getElementById("timer");
const statusEl = document.getElementById("status");
const effectsEl = document.getElementById("effects");

// -------------------------
// STATE
// -------------------------
let gameStarted = false;
let paused = false;
let timer = null;
let timeLeft = 600; // seconds
let currentIndex = 0;

// -------------------------
// BUTTONS
// -------------------------
startBtn.addEventListener("click", () => {
  if (!gameStarted) {
    startGame();
    startBtn.textContent = "Restart";
    pauseBtn.style.display = "inline-block";
    gameStarted = true;
  } else {
    restartGame();
  }
});

pauseBtn.addEventListener("click", () => {
  if (!paused) {
    clearInterval(timer);
    pauseBtn.textContent = "Resume";
    paused = true;
    disableInputs();
  } else {
    startTimer();
    pauseBtn.textContent = "Pause";
    paused = false;
    enableInputs();
  }
});

// -------------------------
// GAME FUNCTIONS
// -------------------------
function startGame() {
  listContainer.innerHTML = "";
  currentIndex = 0;
  timeLeft = 600;
  statusEl.textContent = `Score: 0 / ${PRESIDENTS.length}`;
  pauseBtn.style.display = "inline-block";
  createList();
  enableInputs();
  startTimer();
}

function restartGame() {
  clearInterval(timer);
  startGame();
}

// -------------------------
// CREATE PRESIDENT LIST
// -------------------------
function createList() {
  PRESIDENTS.forEach((p, idx) => {
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `
      <div>${idx + 1}</div>
      <div>${p.terms}</div>
      <input type="text" class="answerBox" data-index="${idx}" placeholder="Name">
    `;
    listContainer.appendChild(row);
  });

  const inputs = document.querySelectorAll(".answerBox");

  inputs.forEach(input => {
    input.addEventListener("input", e => {
      const idx = parseInt(e.target.dataset.index, 10);
      const val = e.target.value.trim().toLowerCase();

      // auto-complete if exact match to any allowed answer
      if (PRESIDENTS[idx].answers.includes(val)) {
        e.target.value = PRESIDENTS[idx].name; // auto-correct to full name
        e.target.classList.add("correct");
        e.target.disabled = true;

        currentIndex++;
        statusEl.textContent = `Score: ${currentIndex} / ${PRESIDENTS.length}`;

        const nextInput = document.querySelector(`.answerBox[data-index='${idx + 1}']`);
        if (nextInput) nextInput.focus();

        if (currentIndex === PRESIDENTS.length) winGame();
      } else {
        e.target.classList.remove("correct");
      }
    });

    // only treat a wrong answer when the user presses Enter
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        const idx = parseInt(e.target.dataset.index, 10);
        const val = e.target.value.trim().toLowerCase();

        if (!PRESIDENTS[idx].answers.includes(val)) {
          // mark red, then end game and show popup
          e.target.classList.add("incorrect");
          endGameWithReveal(idx);
        }
      }
    });
  });
}

// -------------------------
// TIMER
// -------------------------
function startTimer() {
  // ensure no duplicate intervals
  if (timer) clearInterval(timer);
  timerEl.textContent = formatTime(timeLeft);
  timer = setInterval(() => {
    if (!paused) {
      timeLeft--;
      timerEl.textContent = formatTime(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(timer);
        endGameWithReveal(); // no index to reveal
      }
    }
  }, 1000);
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// -------------------------
// END GAME WITH REVEAL + POPUP
// -------------------------
function endGameWithReveal(wrongIdx) {
  // stop timer and disable inputs
  clearInterval(timer);
  disableInputs();
  paused = false;

  // hide pause button and reset start button text to "Start" for next run
  pauseBtn.style.display = "none";
  startBtn.textContent = "Start";
  gameStarted = false;

  // compute score + percentage + time left
  const score = currentIndex;
  const total = PRESIDENTS.length;
  const pct = Math.round((score / total) * 100);
  const timeStr = formatTime(timeLeft);

  // show popup with details (use built-in alert)
  // You can replace with a custom modal later; this is simple & robust.
  alert(`Game over!\nScore: ${score} / ${total}\nTime left: ${timeStr}\nPercentage: ${pct}%`);

  // If a wrong index was provided, replace that input with the correct full name
  if (typeof wrongIdx === "number") {
    const wrongInput = document.querySelector(`.answerBox[data-index='${wrongIdx}']`);
    if (wrongInput) {
      // replace wrong value with the correct president name and style as correct
      wrongInput.value = PRESIDENTS[wrongIdx].name;
      wrongInput.classList.remove("incorrect");
      wrongInput.classList.add("correct");
      wrongInput.disabled = true;
    }
  }

  // reset timer display to 10:00 for the next attempt
  timeLeft = 600;
  timerEl.textContent = formatTime(timeLeft);
}

// -------------------------
// END / WIN
// -------------------------
function winGame() {
  clearInterval(timer);
  disableInputs();
  pauseBtn.style.display = "none";
  startBtn.textContent = "Start";
  gameStarted = false;
  statusEl.textContent = `You Won! All Correct — Time Left: ${formatTime(timeLeft)}`;
  createConfetti();
}

// -------------------------
function disableInputs() {
  document.querySelectorAll(".answerBox").forEach(input => input.disabled = true);
}

function enableInputs() {
  document.querySelectorAll(".answerBox").forEach(input => {
    if (!input.classList.contains("correct")) input.disabled = false;
  });
}

// -------------------------
// CONFETTI EFFECT
// -------------------------
function createConfetti() {
  for (let i = 0; i < 100; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.backgroundColor = `hsl(${Math.random() * 360}, 80%, 70%)`;
    effectsEl.appendChild(c);
    setTimeout(() => c.remove(), 3000);
  }
}
