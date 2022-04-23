let email = document.querySelector("#email");
let submit = document.querySelector("#submit");
let err = document.querySelector(".err");
let errMessage = document.createTextNode("");

const checkEmail = () => {
  return /^[a-zA-Z][a-zA-Z0-9_.-]+[a-zA-Z]@.+\..+/.test(email.value);
};
const appendChild = (errorText) => {
  err.appendChild(errMessage);
  if (errMessage) {
    err.removeChild(errMessage);
    errMessage = document.createTextNode(errorText);
    err.appendChild(errMessage);
    err.style.opacity = "1";
    err.style.color = "red";
  }
  setTimeout(() => {
    err.style.opacity = "0";
  }, 1000);
};

const submitBtnClicked = () => {
  let ree = checkEmail();
  if (!email.value) {
    appendChild('*"Whoops! It looks like you forgot to add your email"*');
  } else if (!ree) {
    appendChild('*"Please provide a valid email address"*');
    email.value = "";
  } else {
    appendChild('*"Success"*');
    err.style.color = "green";
  }
};

submit.addEventListener("click", submitBtnClicked);
email.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    submitBtnClicked();
  }
});
