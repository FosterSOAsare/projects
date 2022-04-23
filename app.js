import detailsPage from "./detailspage.js";
let moon = document.querySelector("header i");
// Setting dark and light mode
if (localStorage.getItem("theme") == null) {
  localStorage.setItem("theme", "light");
} else {
  if (localStorage.getItem("theme") == "dark") {
    moon.classList.add("fa-solid");
    moon.classList.remove("fa-regular");
  }
}

let body = document.querySelector("body");
body.className = localStorage.getItem("theme");

let output = document.querySelector(".output");
const clearExistingCards = () => {
  // Remove all pre-existing cards
  let card = document.querySelectorAll(".card");
  card.forEach((e) => {
    output.removeChild(e);
  });
  let text = document.querySelector(".output .text");
  if (text != undefined) {
    output.removeChild(text);
  }
};
const createCardParagraphs = (card_bottom, paragraph_text, span_text) => {
  let paragraph_p = document.createElement("p");
  paragraph_p.textContent = paragraph_text;
  let paragraph_span = document.createElement("span");
  paragraph_span.textContent = span_text;
  paragraph_p.appendChild(paragraph_span);
  card_bottom.append(paragraph_p);
};
const createCard = (img_src, name, population, region, capital) => {
  let card = document.createElement("div");
  card.classList.add("card");

  let card_top = document.createElement("div");
  card_top.classList.add("card_top");
  let card_image = document.createElement("img");
  card_image.setAttribute("src", img_src);
  card_top.append(card_image);

  let card_bottom = document.createElement("div");
  card_bottom.classList.add("card_bottom");
  let name_h3 = document.createElement("h3");
  name_h3.textContent = name;

  card_bottom.append(name_h3);
  createCardParagraphs(card_bottom, "Population : ", population);
  createCardParagraphs(card_bottom, "Region : ", region);
  createCardParagraphs(card_bottom, "Capital : ", capital);
  card.append(card_top, card_bottom);
  output.append(card);
};
// Fetch data will be assigned to this in the displayDefault function so there will be only one fetch in this page
let responseTxt;

const fetchData = async () => {
  let res = await fetch("https://restcountries.com/v2/all");
  let response = await res.json();
  return response;
};

const displayDefault = async () => {
  clearExistingCards();

  responseTxt = await fetchData();
  for (let i = 0; i < 24; i++) {
    let rand = Math.floor(Math.random() * responseTxt.length);
    let resText = responseTxt[rand];
    createCard(
      resText.flag,
      resText.name,
      resText.population,
      resText.region,
      resText.capital
    );
  }
  detailsPage(responseTxt);
};
displayDefault();

// Search functionality
const createListItems = (li_text) => {
  let search_options_ul = document.querySelector(".search_options ul");
  let listItem = document.createElement("li");
  listItem.textContent = li_text;
  search_options_ul.append(listItem);
};

const displayMatch = (value) => {
  let listItems = document.querySelectorAll(".search_options ul li");
  // Always clear list items before creating new ones
  if (listItems.length != 0) {
    let search_options_ul = document.querySelector(".search_options ul");
    listItems.forEach((e) => {
      search_options_ul.removeChild(e);
    });
  }
  responseTxt.forEach((e) => {
    if (e.name.toLowerCase().startsWith(value.toLowerCase())) {
      createListItems(e.name);
    }
  });
};
const search = async (value) => {
  clearExistingCards();

  //   Finding a match for the value in the input
  let found = false;
  responseTxt.forEach((e, index) => {
    let search_options = document.querySelector(".search_options");
    search_options.style.display = "none";
    if (e.name.toLowerCase().startsWith(value.toLowerCase())) {
      //   Creating card
      createCard(e.flag, e.name, e.population, e.region, e.capital);
      found = true;
    }
  });
  if (!found) {
    clearExistingCards();
    let text = document.createElement("h1");
    text.classList.add("text");
    text.textContent = "No country matches your search";
    output.appendChild(text);
  }
  detailsPage(responseTxt);
};
let search_input = document.querySelector(".search input");
search_input.addEventListener("keyup", (e) => {
  let value = search_input.value;
  let search_options = document.querySelector(".search_options");
  if (value.length === 0) {
    search_options.style.display = "none";
    displayDefault();
  } else if (value.length != 0 && window.screen.width >= 560) {
    search_options.style.display = "block";
  }
  //   Using enter key to display search
  if (e.key === "Enter") {
    search(value);
  } else {
    displayMatch(value);
  }

  searchWithSuggestions();
});

// Using a click on the suggestions to display search
const searchWithSuggestions = () => {
  let listItems = document.querySelectorAll(".search_options ul li");
  let search_input = document.querySelector(".search input");
  if (listItems.length !== 0) {
    listItems.forEach((e) => {
      e.addEventListener("click", () => {
        search(e.textContent);
        search_input.value = e.textContent;
      });
    });
  }
};

// The filter functionality
let filter_options = document.querySelector(".filter_options");
let filter_list_items = document.querySelectorAll(".filter_options ul li");
let filter_div = document.querySelector(".filter");

// Displaying filter list items and toggling arrow
filter_div.addEventListener("click", () => {
  let style = getComputedStyle(filter_options);
  let arrow = document.querySelector(".filter i");
  if (style.display === "none") {
    filter_options.style.display = "block";
    arrow.classList.remove("fa-angle-down");
    arrow.classList.add("fa-angle-up");
  } else {
    filter_options.style.display = "none";
    arrow.classList.remove("fa-angle-up");
    arrow.classList.add("fa-angle-down");
  }
});
const filter = (value) => {
  clearExistingCards();
  responseTxt.forEach((e) => {
    if (e.region === value) {
      createCard(e.flag, e.name, e.population, e.region, e.capital);
    } else if (value === "America" && e.region === "Americas") {
      createCard(e.flag, e.name, e.population, e.region, e.capital);
    }
  });
  detailsPage(responseTxt);
};

if (filter_list_items.length !== 0) {
  filter_list_items.forEach((e) => {
    e.addEventListener("click", () => {
      filter(e.textContent);
    });
  });
}

// // Setting up darkMode
let themeSwitch = () => {
  let theme = document.querySelector("header .right_section");
  let moon = document.querySelector("header i");
  theme.addEventListener("click", () => {
    if (localStorage.getItem("theme") === "light") {
      localStorage.setItem("theme", "dark");
      moon.classList.remove("fa-regular");
      moon.classList.add("fa-solid");
    } else {
      localStorage.setItem("theme", "light");
      moon.classList.add("fa-regular");
      moon.classList.remove("fa-solid");
    }
    body.className = localStorage.getItem("theme");
  });
};
themeSwitch();
