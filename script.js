const PRESIDENTS = [
  ["george washington", "washington"],
  ["john adams", "adams"],
  ["thomas jefferson", "jefferson"],
  ["james madison", "madison"],
  ["james monroe", "monroe"],
  ["john quincy adams", "adams"],
  ["andrew jackson", "jackson"],
  ["martin van buren", "van buren", "vanburen"],
  ["william henry harrison", "harrison"],
  ["john tyler", "tyler"],
  ["james k. polk", "polk"],
  ["zachary taylor", "taylor"],
  ["millard fillmore", "fillmore"],
  ["franklin pierce", "pierce"],
  ["james buchanan", "buchanan"],
  ["abraham lincoln", "lincoln"],
  ["andrew johnson", "johnson"],
  ["ulysses s. grant", "grant"],
  ["rutherford b. hayes", "hayes"],
  ["james a. garfield", "garfield"],
  ["chester a. arthur", "arthur"],
  ["grover cleveland", "cleveland"],
  ["benjamin harrison", "harrison"],
  ["grover cleveland", "cleveland"],
  ["william mckinley", "mckinley"],
  ["theodore roosevelt", "roosevelt"],
  ["william howard taft", "taft"],
  ["woodrow wilson", "wilson"],
  ["warren g. harding", "harding"],
  ["calvin coolidge", "coolidge"],
  ["herbert hoover", "hoover"],
  ["franklin d. roosevelt", "roosevelt"],
  ["harry s. truman", "truman"],
  ["dwight d. eisenhower", "eisenhower"],
  ["john f. kennedy", "kennedy"],
  ["lyndon b. johnson", "johnson"],
  ["richard nixon", "nixon"],
  ["gerald ford", "ford"],
  ["jimmy carter", "carter"],
  ["ronald reagan", "reagan"],
  ["george h. w. bush", "bush"],
  ["bill clinton", "clinton"],
  ["george w. bush", "bush"],
  ["barack obama", "obama"],
  ["donald trump", "trump"],
  ["joe biden", "biden"]
];

let index = 0;

const input = document.getElementById("answerInput");
const status = document.getElementById("status");
const progress = document.getElementById("progress");
const startBtn = document.getElementById("startBtn");

function startGame() {
  index = 0;
  input.disabled = false;
  input.value = "";
  input.focus();
  updateStatus();
  updateProgress();
}

function updateStatus() {
  status.innerText = `Type President #${index + 1}`;
}

function updateProgress() {
  progress.innerText = `Progress: ${index} / ${PRESIDENTS.length}`;
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const answer = input.value.trim().toLowerCase();
    if (PRESIDENTS[index].includes(answer)) {
      index++;
      input.value = "";
      updateProgress();
      if (index === PRESIDENTS.length) {
        status.innerText = "🎉 Finished! You typed all presidents in order!";
        input.disabled = true;
      } else {
        updateStatus();
      }
    } else {
      status.innerText = `❌ Incorrect — try again for #${index + 1}`;
    }
  }
});

startBtn.addEventListener("click", startGame);
