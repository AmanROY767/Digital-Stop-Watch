var hr = 0;
var min = 0;
var sec = 0;
var count = 0;
var timer = false;


function start() {
  timer = true;
  localStorage.setItem("isRunning", "true");
  stopwatch();
}


function stop() {
  timer = false;
  localStorage.setItem("isRunning", "false");
  saveTime();
}


function reset() {
  timer = false;
  hr = 0;
  min = 0;
  sec = 0;
  count = 0;
  updateDisplay();
  localStorage.removeItem("stopwatch_hr");
  localStorage.removeItem("stopwatch_min");
  localStorage.removeItem("stopwatch_sec");
  localStorage.removeItem("stopwatch_count");
  localStorage.setItem("isRunning", "false");
}


function toggleMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");

  const toggleBtn = document.getElementById("toggleMode");
  if (body.classList.contains("dark-mode")) {
    toggleBtn.innerText = "Light Mode";
  } else {
    toggleBtn.innerText = "Dark Mode";
  }

if (body.classList.contains("dark-mode")) {

  localStorage.setItem("theme", "dark");
} else {

  localStorage.setItem("theme", "light");
}
}


function stopwatch() {
  if (timer) {
    count = count+1;

    if (count == 100) {
      sec = sec + 1;
      count = 0;
    }
    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    updateDisplay();
    saveTime();
    setTimeout(stopwatch, 10);
  }
}


function updateDisplay() {
    var hrString = hr;
    var minString = min;
    var secString = sec;
    var countString = count;

    if(hr < 10){
      hrString = "0" + hrString;
    }
    if(min < 10){
      minString = "0" + minString;
    }
    if(sec < 10){
      secString = "0" + secString;
    }
    if(count < 10){
      countString = "0" + countString;
    }

  document.getElementById("hr").innerHTML = hrString;
  document.getElementById("min").innerHTML = minString;
  document.getElementById("sec").innerHTML = secString;
  document.getElementById("count").innerHTML = countString;
}


function saveTime() {
  localStorage.setItem("stopwatch_hr", hr);
  localStorage.setItem("stopwatch_min", min);
  localStorage.setItem("stopwatch_sec", sec);
  localStorage.setItem("stopwatch_count", count);
}


window.onload = function () {

  if (localStorage.getItem("stopwatch_hr") !== null) {
    hr = parseInt(localStorage.getItem("stopwatch_hr"));
    min = parseInt(localStorage.getItem("stopwatch_min"));
    sec = parseInt(localStorage.getItem("stopwatch_sec"));
    count = parseInt(localStorage.getItem("stopwatch_count"));
    updateDisplay();
  }


  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    document.getElementById("toggleMode").innerText = "Light Mode";
  } else {
    document.body.classList.add("light-mode");
    document.getElementById("toggleMode").innerText = "Dark Mode";
  }

  // Do NOT auto-start stopwatch — just show last saved time
  timer = false;
  localStorage.setItem("isRunning", "false");
};


document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key.toLowerCase() === "s") {
    event.preventDefault();
    start();
  } else if (event.ctrlKey && event.key.toLowerCase() === "p") {
    event.preventDefault();
    stop();
  } else if (event.ctrlKey && event.key.toLowerCase() === "r") {
    event.preventDefault();
    reset();
  } else if (event.ctrlKey && event.key.toLowerCase() === "d") {
    event.preventDefault();
    toggleMode();
  }
});
