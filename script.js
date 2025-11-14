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
  { name: "Barack Obama", terms: "2009–2017", answers: ["obama"] }
  { name: "Donald Trump", terms: "2017–2021", answers: ["trump"] }
  { name: "Joe Biden", terms: "2021–2025", answers: ["biden"] },
  { name: "Donald Trump", terms: "2025–present", answers: ["trump"] }
];

let timerInterval;
let solved = 0;

const list = document.getElementById("list");
const progress = document.getElementById("progress");
const status = document.getElementById("status");
const timer = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");

function renderList() {
  list.innerHTML = "";
  PRESIDENTS.forEach((p, i) => {
    list.innerHTML += `
      <div class="row">
        <span class="number">${i + 1}.</span>
        <span class="terms">${p.terms}</span>
        <input id="i${i}" class="answerBox" type="text" disabled />
      </div>`;
  });
}

function startTimer() {
  let time = 600;
  timerInterval = setInterval(() => {
    time--;
    const m = Math.floor(time / 60);
    const s = time % 60;
    timer.innerText = `${m}:${s.toString().padStart(2,"0")}`;
    if(time === 0) {
      clearInterval(timerInterval);
      status.innerText = "⏳ Time’s up!";
      document.querySelectorAll(".answerBox").forEach(b => b.disabled = true);
    }
  }, 1000);
}

function celebrate() {
  const duration = 3000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 8,
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      }
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

function startGame() {
  solved = 0;
  renderList();
  status.innerText = "Game started — type President #1";
  progress.innerText = `0 / ${PRESIDENTS.length}`;
