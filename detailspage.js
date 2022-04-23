export default function detailsPage(data) {
  let cards = document.querySelectorAll(".card");
  let details = document.querySelector(".details");
  let home = document.querySelector(".home");

  cards.forEach((e) => {
    e.addEventListener("click", () => {
      details.style.display = "block";
      home.style.display = "none";
      let name = e.querySelector(".card_bottom h3");
      createDetailsPage(name.textContent, data);
    });
  });
}

const createBorders = (value) => {
  let border = document.createElement("div");

  border.textContent = value;
  let borders = document.querySelector(".borders");
  borders.append(border);
};

const clearBorders = () => {
  let existingBorders = document.querySelectorAll(".borders div");
  if (existingBorders.length > 0) {
    let borders = document.querySelector(".borders");
    existingBorders.forEach((e) => {
      borders.removeChild(e);
    });
  }
};
var createDetailsPage = (country, data) => {
  let flag_container = document.querySelector(
    ".details .bottom_section .left_section"
  );
  let name_h3 = document.querySelector(
    ".details .bottom_section .right_section h3"
  );
  // .info can be found at .details .bottom_section .right_section
  let native_name_span = document.querySelector(".info div .native_name span");
  let population_span = document.querySelector(".info div .population span");
  let region_span = document.querySelector(".info div .region span");
  let sub_region_span = document.querySelector(".info div .sub_region span");
  let capital_span = document.querySelector(".info div .capital span");

  let domain_span = document.querySelector(".info div .domain span");
  let currencies_span = document.querySelector(".info div .currencies span");
  let languages_span = document.querySelector(".info div .languages span");
  data.forEach((e) => {
    if (e.name === country) {
      // Create flag
      let flagExist = flag_container.querySelector("img");
      if (flagExist !== null) {
        flag_container.removeChild(flagExist);
      }
      let flag = document.createElement("img");
      flag.src = e.flag;
      flag_container.append(flag);

      // create info
      name_h3.textContent = e.name;
      native_name_span.textContent = e.nativeName;
      population_span.textContent = e.population;
      region_span.textContent = e.region;
      sub_region_span.textContent = e.subregion;
      capital_span.textContent = e.capital;
      domain_span.textContent = e.topLevelDomain[0];

      // Currencies
      //  Clear Currencies first
      currencies_span.textContent = "";
      e.currencies.forEach((t) => {
        currencies_span.textContent += " " + t.name;
      });
      // Languages
      // Clear Languages first
      languages_span.textContent = "";
      e.languages.forEach((t, i) => {
        if (i >= 1) {
          languages_span.textContent += ", " + t.name;
        } else {
          languages_span.textContent += " " + t.name;
        }
      });

      // Border countries.
      clearBorders();
      if (e.borders != undefined) {
        let borders_div = document.querySelector(".borders");

        borders_div.style.gridTemplateColumns = "1fr 1fr";
        e.borders.forEach((t, index) => {
          if (e.borders.length < 1) {
          } else {
            // Using shortCodes to get country name

            data.forEach((data) => {
              if (data.alpha3Code === t) {
                if (data.name.length > 15) {
                  data.name = data.name.substring(0, 15) + "...";
                }
                createBorders(data.name);
              }
            });
          }
        });
      } else {
        let borders_div = document.querySelector(".borders");
        let borders_border_div = document.querySelector(".borders div");
        createBorders("No border countries");
        borders_div.style.gridTemplateColumns = "1fr";
      }
    }
  });
  borderDetails(data);
};

// The back functionality
let back = document.querySelector(".back");
back.addEventListener("click", () => {
  let details = document.querySelector(".details");
  let home = document.querySelector(".home");

  details.style.display = "none";
  home.style.display = "block";
});

// Click border country to display details
const borderDetails = (data) => {
  let borderCountries = document.querySelectorAll(".borders div");
  borderCountries.forEach((e) => {
    if (borderCountries[0].textContent !== "No border countries") {
      e.addEventListener("click", () => {
        createDetailsPage(e.textContent, data);
      });
    }
  });
};
