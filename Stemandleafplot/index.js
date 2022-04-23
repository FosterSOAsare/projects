let input = document.querySelector(".values");
let submit = document.querySelector(".submit");
let stem = document.querySelector(".stem");
let leaf = document.querySelector(".leaf");
let table = document.querySelector(".table");
let errorText = document.querySelector(".err");
let value = "";

input.addEventListener("keyup", (e) => {
  let str = "0123456789 ";
  if (/^[0-9 ]+$/.test(input.value)) {
    input.style.border = "2px solid transparent";
    submit.removeAttribute("disabled");
    errorText.style.display = "none";
  } else {
    input.style.border = "2px solid red";
    submit.setAttribute("disabled", "");
    errorText.style.display = "block";
  }
});

input.addEventListener("focus", () => {
  table.style.display = "none";
  input.value = "";
});

submit.addEventListener("click", () => {
  if (input.value.length >= 1) {
    createTable();
    table.style.display = "flex";
  } else {
    errorText.style.display = "block";
  }
});

function createHeadings() {
  let stem_h3 = document.createElement("h3");
  let leaf_h3 = document.createElement("h3");
  stem_h3.textContent = "Stem";
  leaf_h3.textContent = "Leaf";
  stem.appendChild(stem_h3);
  leaf.appendChild(leaf_h3);
}
function addZeros(arr, arr2) {
  //   Adding zero infront of numbers less than 10
  arr.forEach((e) => {
    if (e.length === 1) {
      arr2.push((e = "0" + e));
    } else {
      arr2.push(e);
    }
  });
}
function createColumn(e, part, column_class) {
  let column = document.createElement("div");
  column.textContent = e;
  column.classList.add(column_class);
  part.appendChild(column);
}
function createStem() {
  let arr = input.value.split(" ");
  let arr2 = [];
  addZeros(arr, arr2);
  //   Finding the stems
  let stems = [arr2[0].substring(0, arr2[0].length - 1)];
  arr2.forEach((e) => {
    if (!stems.includes(e.substring(0, e.length - 1))) {
      stems.push(e.substring(0, e.length - 1));
    } else if (e.substring(0, e.length - 1) == " ") {
      stems = stems;
    }
  });
  stems = [...new Set(stems)].sort((a, b) => a - b);
  //   Removes multiple whitespaces after a number from the stems
  let filterStem = [];
  stems.forEach((e) => {
    if (e != "") {
      filterStem.push(e);
    }
  });
  filterStem.forEach((e) => {
    createColumn(e, stem, "stem_col");
  });
}

function createLeaf() {
  let stems = [];
  let arr2 = [];
  let stem_cols = document.querySelectorAll(".stem_col");
  let arr = input.value.split(" ");
  addZeros(arr, arr2);
  stem_cols.forEach((e, index) => {
    stems.push(e.textContent);
    createColumn("", leaf, "leaf_col");
  });

  arr2.forEach((e) => {
    console.log(e);
    if (stems.includes(e.substring(0, e.length - 1))) {
      let index = stems.indexOf(e.substring(0, e.length - 1));
      let leaf_cols = document.querySelectorAll(".leaf_col");

      if (leaf_cols[index].textContent == "") {
        leaf_cols[index].textContent += `${e.substring(e.length - 1)}`;
      } else {
        leaf_cols[index].textContent += ` , ${e.substring(e.length - 1)}`;
      }
    }
  });
}

function createTable() {
  leaf.textContent = "";
  stem.textContent = "";
  createHeadings();
  createStem();
  createLeaf();
}
