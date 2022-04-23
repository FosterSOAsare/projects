let menu = document.querySelector("#menu");
let menuBtn = document.querySelector(".menu_btn");
let body = document.querySelector("body");
let site = document.querySelector("#site");

let style = getComputedStyle(menu);
let bodyStyle = getComputedStyle(body);
let width = bodyStyle.width;
width = parseInt(width);
menuBtn.addEventListener("click", () => {
  if (style.display == "none") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
});

if (style.display == "block") {
  if (width >= 1440) {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}
window.addEventListener("scroll", () => {
  if (window.scrollY > 350) {
    site.style.backgroundColor = "#65CAFF";
  } else {
    site.style.backgroundColor = "transparent";
  }
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 550) {
    if (menu.style.display == "block") {
      menu.style.display = "none";
    }
  } else {
    if (menu.style.display == "block") {
      menu.style.display = "block";
    }
  }
});
