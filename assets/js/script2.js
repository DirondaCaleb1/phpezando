let navBar = document.querySelector("#navbarNavDropdown");

if (navBar !== null) {
  let li = navBar.querySelectorAll("li");
  li.forEach((elt) => {
    let a = elt.querySelectorAll("a");

    for (let i = 0; i < a.length; i++) {
      if (
        window.location.href ===
          "http://localhost/projetsPerso/ezando/register.php" ||
        a[i].href === "http://localhost/projetsPerso/ezando/register.php#"
      ) {
        if (
          a[i].classList.contains("active") &&
          a[i].href !== "http://localhost/projetsPerso/ezando/register.php#"
        ) {
          a[i].classList.remove("active");
        } else {
          if (
            a[i].href === "http://localhost/projetsPerso/ezando/register.php#"
          ) {
            a[i].classList.add("active");
          }
        }
      }
      if (
        window.location.href ===
          "http://localhost/projetsPerso/ezando/login.php" ||
        a[i].href === "http://localhost/projetsPerso/ezando/login.php#"
      ) {
        if (
          a[i].classList.contains("active") &&
          a[i].href !== "http://localhost/projetsPerso/ezando/login.php#"
        ) {
          a[i].classList.remove("active");
        } else {
          if (a[i].href === "http://localhost/projetsPerso/ezando/login.php#") {
            a[i].classList.add("active");
          }
        }
      }

      a[i].addEventListener("click", () => {
        if (a[i].classList.contains("dropdown-toggle") === false) {
          a[i].classList.add("active");
        } else {
        }
      });
    }
  });
}
