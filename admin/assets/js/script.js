const type = document.querySelector("#type");

const labelType = document.querySelector("#labeltype");

type.addEventListener("focus", () => {
  labelType.classList.add("hidden");
  console.log(labelType.classList.value);
});

type.addEventListener("blur", () => {
  labelType.classList.remove("hidden");
});
