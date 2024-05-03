//alert("87");
//sidebar variable
let sideBarNav = document.querySelector("#sidenav-collapse-main");

if (sideBarNav !== null) {
  let li = sideBarNav.querySelectorAll("li");

  li.forEach((elt) => {
    let a = elt.querySelectorAll("a");

    for (let i = 0; i < a.length; i++) {
      if (
        window.location.href ===
          "http://localhost/projetsPerso/ezando/admin/orders.php" ||
        a[i].href === "http://localhost/projetsPerso/ezando/admin/orders.php#"
      ) {
        if (
          a[i].classList.contains("active") &&
          a[i].href !== "http://localhost/projetsPerso/ezando/admin/orders.php#"
        ) {
          a[i].classList.remove("active");
          a[i].classList.remove("bg-gradient-primary");
          //a[i].classList.remove("bg-gradient-primary");
        } else {
          if (
            a[i].href ===
            "http://localhost/projetsPerso/ezando/admin/orders.php#"
          ) {
            a[i].classList.add("active");
            a[i].classList.add("bg-gradient-primary");
          }
        }
      }

      a[i].addEventListener("click", () => {
        a[i].classList.add("active");
        a[i].classList.add("bg-gradient-primary");
      });
    }
  });
}
