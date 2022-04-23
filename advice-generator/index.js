let adviceId = document.querySelector(".number p");
let adviceText = document.querySelector(".content p");
let next = document.querySelector(".illustration");

let grabAdvice = () => {
  let request = new XMLHttpRequest();
  request.addEventListener("readystatechange", () => {
    adviceId.textContent = "";
    adviceText.textContent = "";
    if (request.readyState == 4 && request.status == 200) {
      setTimeout(() => {
        let advice = JSON.parse(request.responseText);
        adviceId.textContent = advice.slip.id;
        adviceText.textContent = advice.slip.advice;
      }, 1000);
    }
  });
  request.open("GET", "https://api.adviceslip.com/advice");
  request.send();
};
window.onload = grabAdvice();
next.addEventListener("click", grabAdvice);
