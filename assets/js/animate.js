console.log(85);
let categoryCard = document.querySelectorAll("#card");
let img = document.querySelectorAll("img");

//Animate Item Category
if (categoryCard.length !== 0) {
  img.forEach((elt) => {
    ///let a = elt.querySelector("a");
    elt.addEventListener("focus", () => {
      elt.classList.add("active");
    });
  });
} else {
  console.log("zero");
}
