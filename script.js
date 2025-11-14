// script.js - End-on-wrong version

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

let solved = 0;
let timerInterval = null;
let timeLeft = 600; // seconds
let paused = false;
let gameOver = false;

const list = document.getElementById("list");
const progress = document.getElementById("progress");
const status = document.getElementById("status");
const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");

// render list with inputs; show solved answers only
function renderList() {
  list.innerHTML = "";
  PRESIDENTS.forEach((p, i) => {
    const row = document.createElement("div");
    row.className = "row";

    const num = document.createElement("span");
    num.textContent = `${i+1}.`;
    num.className = "number";

    const terms = document.createElement("span");
    terms.textContent = p.terms;
    terms.className = "terms";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "answerBox";
    input.id = `i${i}`;
    input.disabled = true;

    // if this index is already solved, show the name
    if (i < solved) {
      input.value = PRESIDENTS[i].name;
      input.classList.add("correct");
      input.disabled = true;
    }

    row.appendChild(num);
    row.appendChild(terms);
    row.appendChild(input);
    list.appendChild(row);
  });

  // enable next unsolved input (if game not over)
  if (!gameOver) {
    const next = document.getElementById(`i${solved}`);
    if (next) next.disabled = false, next.focus();
  }
}

// start / restart game
function startGame() {
  // reset state
  solved = 0;
  timeLeft = 600;
  paused = false;
  gameOver = false;

  // UI
  startBtn.textContent = "Pause"; // default becomes pause after start
  status.textContent = "Game started — type the first president";
  progress.textContent = `0 / ${PRESIDENTS.length}`;
  renderList();
  startTimer();
}

// timer management
function startTimer() {
  // clear any existing interval
  if (timerInterval) clearInterval(timerInterval);

  // show initial time
  timerEl.textContent = formatTime(timeLeft);

  timerInterval = setInterval(() => {
    if (paused || gameOver) return;
    timeLeft--;
    timerEl.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame("Time's up!");
    }
  }, 1000);
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// pause / resume toggling
function togglePause() {
  if (gameOver) return;
  paused = !paused;
  const pauseBtn = document.getElementById("pauseBtn");
  pauseBtn.textContent = paused ? "Resume" : "Pause";
  status.textContent = paused ? "Paused" : `Resumed — type President #${solved + 1}`;
}

// end game (called on wrong answer or timer)
function endGame(message) {
  gameOver = true;
  clearInterval(timerInterval);
  // disable all inputs
  document.querySelectorAll(".answerBox").forEach(b => b.disabled = true);
  status.textContent = `${message} — game over. Press Start to try again.`;
  const pauseBtn = document.getElementById("pauseBtn");
  if (pauseBtn) pauseBtn.disabled = true;
}

// when user finishes all correctly
function winGame() {
  clearInterval(timerInterval);
  gameOver = true;
  status.textContent = "You completed all presidents!";
  celebrate();
  const pauseBtn = document.getElementById("pauseBtn");
  if (pauseBtn) pauseBtn.disabled = true;
}

// confetti
function celebrate() {
  const duration = 3000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 8,
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// input handling: Enter submits; first wrong answer ends the game
list.addEventListener("keydown", (e) => {
  if (gameOver || paused) return;
  if (e.key !== "Enter") return;

  const el = e.target;
  if (!el || !el.id || !el.id.startsWith("i")) return;

  const id = parseInt(el.id.substring(1), 10);
  const text = el.value.trim().toLowerCase();

  // safety: if user somehow typed in a future box, ignore
  if (id !== solved) return;

  if (PRESIDENTS[id].answers.includes(text)) {
    // correct
    el.value = PRESIDENTS[id].name;
    el.classList.add("correct");
    el.disabled = true;

    solved++;
    progress.textContent = `${solved} / ${PRESIDENTS.length}`;
    status.textContent = "Correct";

    if (solved === PRESIDENTS.length) {
      winGame();
    } else {
      // enable next one
      const next = document.getElementById(`i${id + 1}`);
      if (next) next.disabled = false, next.focus();
    }
  } else {
    // WRONG -> immediate game over
    el.classList.add("incorrect");
    // show the wrong briefly (optional) then end
    setTimeout(() => {
      endGame("Wrong answer");
    }, 200);
  }
});

// sparkles generator (background)
function createSparkles() {
  setInterval(() => {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.animationDuration = (Math.random() * 3 + 4) + "s";
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 7000);
  }, 250);
}
createSparkles();

// Add Pause button next to Start (only once)
(function addPauseBtn() {
  // if already added, skip
  if (document.getElementById("pauseBtn")) return;
  startBtn.insertAdjacentHTML("afterend", '<button id="pauseBtn" class="btn">Pause</button>');
  const pauseBtn = document.getElementById("pauseBtn");
  pauseBtn.addEventListener("click", togglePause);
})();

// initial render + initial labels (before start)
renderList();
progress.textContent = `0 / ${PRESIDENTS.length}`;
status.textContent = `Press Start to begin. Total Presidents: ${PRESIDENTS.length}`;

// Start button wiring
startBtn.addEventListener("click", () => {
  // if the game is currently running (start button text = "Pause"), treat click as Pause toggle
  const pauseBtn = document.getElementById("pauseBtn");
  // If game is not started or is over, start a new game
  if (gameOver || timerInterval === null || timeLeft === 600 && solved === 0) {
    // reset pause button state
    if (pauseBtn) pauseBtn.disabled = false, pauseBtn.textContent = "Pause";
    startGame();
  } else {
    // if game running, clicking Start will toggle Pause (for UX consistency)
    togglePause();
  }
});
