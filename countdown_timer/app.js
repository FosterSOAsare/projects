let days = document.querySelector(".days h1");
let hours = document.querySelector(".hours h1");
let minutes = document.querySelector(".minutes h1");
let secondss = document.querySelector(".seconds h1");

let doubleNumber = (number) => {
  number = parseInt(number);
  if (number < 10) {
    return "0" + number;
  } else {
    return number;
  }
};
let timer = () => {
  let currentTime = new Date();
  let endTime = new Date("22 Dec 2022");
  let timeLeft = endTime - currentTime;
  let seconds = Math.floor(timeLeft / 1000);
  let day = Math.floor(seconds / 3600 / 24);
  let hour = Math.floor(seconds / 3600) % 60;
  let minute = Math.floor(seconds / 60) % 60;
  let second = Math.floor(seconds) % 60;
  days.textContent = doubleNumber(day);
  hours.textContent = doubleNumber(hour);
  minutes.textContent = doubleNumber(minute);
  secondss.textContent = doubleNumber(second);
};
timer();
setInterval(timer, 1000);
