let contentContainer = document.querySelector(".content-container");
function getData(callback) {
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      let response = JSON.parse(xhr.responseText);
      callback(response, undefined);
    } else if (xhr.readyState === 4) {
      callback(undefined, "An error occurred");
    }
  });
  xhr.open("GET", " ./data.json", true);
  xhr.send();
}
var dead = "weekly";
// Event Listeners
let colors = [
  "hsl(15, 100%, 70%)",
  "hsl(195, 74%, 62%)",
  " hsl(348, 100%, 68%)",
  " hsl(145, 58%, 55%)",
  "hsl(264, 64%, 52%)",
  "hsl(43, 84%, 65%)",
];
let i = 0;

// TOGGle

let toggle = document.querySelectorAll(".toggle");
toggle.forEach((e) => {
  e.addEventListener("click", () => {
    let i = 0;
    toggle.forEach((p) => {
      p.style.color = "black";
    });
    dead = e.innerText.toLowerCase();
    e.style.color = "white";
    contentContainer.innerHTML = "";
    getData((data, error) => {
      if (data) {
        data.forEach((e) => {
          let content = document.createElement("div");
          content.classList.add("content");
          let top = document.createElement("div");
          top.classList.add("content-top");
          top.style.backgroundColor = colors[i];
          let topImage = document.createElement("img");
          topImage.classList.add("content-top-image");
          topImage.src = e.img;
          top.appendChild(topImage);
          content.appendChild(top);

          let bottom = document.createElement("div");
          bottom.classList.add("content-bottom");
          let bottomInfo = document.createElement("div");
          bottomInfo.classList.add("bottom-info");
          let bottomInfoText = document.createElement("p");
          bottomInfoText.textContent = e.title;
          bottomInfo.appendChild(bottomInfoText);
          let bottomInfoImg = document.createElement("img");
          bottomInfoImg.classList.add("info-image");
          bottomInfoImg.src = "./images/icon-ellipsis.svg";
          bottomInfo.appendChild(bottomInfoImg);
          bottom.appendChild(bottomInfo);

          let bottomDetails = document.createElement("div");
          bottomDetails.classList.add("bottom-details");
          let bottomDetailsText = document.createElement("p");
          bottomDetailsText.textContent =
            eval("e.timeframes." + dead + ".current") + "hrs";
          bottomDetailsText.classList.add("bottom-text");
          bottomDetails.appendChild(bottomDetailsText);

          let bottomDetailsPrevious = document.createElement("p");
          bottomDetailsPrevious.classList.add("text-previous");
          if (dead != "daily") {
            bottomDetailsPrevious.textContent =
              "Last " +
              dead.substring(0, dead.length - 2) +
              " - " +
              eval("e.timeframes." + dead + ".previous") +
              "hrs";
          } else {
            bottomDetailsPrevious.textContent =
              "Yesterday - " +
              eval("e.timeframes." + dead + ".previous") +
              "hrs";
          }

          bottomDetails.appendChild(bottomDetailsPrevious);
          bottom.appendChild(bottomDetails);
          content.appendChild(bottom);
          contentContainer.appendChild(content);
          i++;
        });
      } else if (error) {
        console.log("An error occurred");
      }
    });
  });
});

getData((data, error) => {
  if (data) {
    data.forEach((e) => {
      toggle[1].style.color = "white";
      let content = document.createElement("div");
      content.classList.add("content");
      let top = document.createElement("div");
      top.classList.add("content-top");
      top.style.backgroundColor = colors[i];
      let topImage = document.createElement("img");
      topImage.classList.add("content-top-image");
      topImage.src = e.img;
      top.appendChild(topImage);
      content.appendChild(top);

      let bottom = document.createElement("div");
      bottom.classList.add("content-bottom");
      let bottomInfo = document.createElement("div");
      bottomInfo.classList.add("bottom-info");
      let bottomInfoText = document.createElement("p");
      bottomInfoText.textContent = e.title;
      bottomInfo.appendChild(bottomInfoText);
      let bottomInfoImg = document.createElement("img");
      bottomInfoImg.classList.add("info-image");
      bottomInfoImg.src = "./images/icon-ellipsis.svg";
      bottomInfo.appendChild(bottomInfoImg);
      bottom.appendChild(bottomInfo);

      let bottomDetails = document.createElement("div");
      bottomDetails.classList.add("bottom-details");
      let bottomDetailsText = document.createElement("p");
      bottomDetailsText.textContent =
        eval("e.timeframes." + dead + ".current") + "hrs";
      bottomDetailsText.classList.add("bottom-text");
      bottomDetails.appendChild(bottomDetailsText);

      let bottomDetailsPrevious = document.createElement("p");
      bottomDetailsPrevious.classList.add("text-previous");
      bottomDetailsPrevious.textContent =
        "Last week - " + eval("e.timeframes." + dead + ".previous") + "hrs";

      bottomDetails.appendChild(bottomDetailsPrevious);
      bottom.appendChild(bottomDetails);
      content.appendChild(bottom);
      contentContainer.appendChild(content);
      i++;
    });
  } else if (error) {
    console.log("An error occurred");
  }
});
