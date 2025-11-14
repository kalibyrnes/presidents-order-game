// Presidents in chronological order (1..47) — verify with public sources.
// Source: Wikipedia + WhiteHouse timeline. :contentReference[oaicite:2]{index=2}
const PRESIDENTS = [
  "George Washington",
  "John Adams",
  "Thomas Jefferson",
  "James Madison",
  "James Monroe",
  "John Quincy Adams",
  "Andrew Jackson",
  "Martin Van Buren",
  "William Henry Harrison",
  "John Tyler",
  "James K. Polk",
  "Zachary Taylor",
  "Millard Fillmore",
  "Franklin Pierce",
  "James Buchanan",
  "Abraham Lincoln",
  "Andrew Johnson",
  "Ulysses S. Grant",
  "Rutherford B. Hayes",
  "James A. Garfield",
  "Chester A. Arthur",
  "Grover Cleveland",
  "Benjamin Harrison",
  "Grover Cleveland",
  "William McKinley",
  "Theodore Roosevelt",
  "William Howard Taft",
  "Woodrow Wilson",
  "Warren G. Harding",
  "Calvin Coolidge",
  "Herbert Hoover",
  "Franklin D. Roosevelt",
  "Harry S. Truman",
  "Dwight D. Eisenhower",
  "John F. Kennedy",
  "Lyndon B. Johnson",
  "Richard Nixon",
  "Gerald Ford",
  "Jimmy Carter",
  "Ronald Reagan",
  "George H. W. Bush",
  "Bill Clinton",
  "George W. Bush",
  "Barack Obama",
  "Donald J. Trump",
  "Joe Biden",
  "Donald J. Trump" // if game goes to 47th; adjust if future changes occur
];

let shuffled = [];
let nextIndex = 0; // index of the next correct president in PRESIDENTS
const board = document.getElementById('board');
const status = document.getElementById('status');
const progress = document.getElementById('progress');
const startBtn = document.getElementById('startBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const revealBtn = document.getElementById('revealBtn');

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderBoard(list) {
  board.innerHTML = '';
  list.forEach((name, i) => {
    const d = document.createElement('div');
    d.className = 'card';
    d.tabIndex = 0;
    d.dataset.name = name;
    d.dataset.index = i;
    d.innerText = name;
    d.addEventListener('click', onPick);
    d.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') onPick.call(d, e);
    });
    board.appendChild(d);
  });
}

function startGame() {
  nextIndex = 0;
  shuffled = shuffleArray(PRESIDENTS);
  renderBoard(shuffled);
  status.innerText = `Game started — pick #1: ${PRESIDENTS[0]}`;
  progress.innerText = `Progress: 0 / ${PRESIDENTS.length}`;
}

function onPick(e) {
  const card = (this instanceof Element) ? this : e.currentTarget;
  if (card.classList.contains('disabled')) return;
  const picked = card.dataset.name;
  const correctName = PRESIDENTS[nextIndex];

  if (picked === correctName) {
    card.classList.add('correct', 'disabled');
    card.setAttribute('aria-disabled', 'true');
    nextIndex++;
    progress.innerText = `Progress: ${nextIndex} / ${PRESIDENTS.length}`;
    if (nextIndex === PRESIDENTS.length) {
      status.innerText = `Perfect! You placed all ${PRESIDENTS.length} presidents in order.`;
    } else {
      status.innerText = `Good — now pick #${nextIndex+1}: ${PRESIDENTS[nextIndex]}`;
    }
  } else {
    // mark wrong briefly
    card.classList.add('wrong');
    status.innerText = `Wrong — you picked ${picked}. Try again for #${nextIndex+1}: ${PRESIDENTS[nextIndex]}`;
    setTimeout(() => card.classList.remove('wrong'), 800);
  }
}

function shuffleBoard() {
  shuffled = shuffleArray(shuffled);
  renderBoard(shuffled);
  status.innerText = `Shuffled. Continue picking #${nextIndex+1}: ${PRESIDENTS[nextIndex]}`;
}

function revealAnswer() {
  board.innerHTML = '';
  PRESIDENTS.forEach((name, idx) => {
    const d = document.createElement('div');
    d.className = 'card correct disabled';
    d.innerText = `${idx+1}. ${name}`;
    board.appendChild(d);
  });
  status.innerText = 'Revealed: full chronological order.';
  progress.innerText = `Revealed ${PRESIDENTS.length} names.`;
}

startBtn.addEventListener('click', startGame);
shuffleBtn.addEventListener('click', shuffleBoard);
revealBtn.addEventListener('click', revealAnswer);

// initialize (show a shuffled board but disabled until start)
shuffled = shuffleArray(PRESIDENTS);
renderBoard(shuffled);
