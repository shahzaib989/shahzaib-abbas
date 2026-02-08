const drawerOpenbtn = document.querySelector(".open-drawer");
const drawerClosebtn = document.querySelector(".close-drawer");
const drawer = document.querySelector(".drawer--main--banner");


if (drawerOpenbtn && drawerClosebtn && drawer) {

  drawerOpenbtn.addEventListener("click", function () {
    drawerClosebtn.classList.add("show");
    drawerOpenbtn.classList.remove("show");
    drawer.classList.add("active");
  });

  drawerClosebtn.addEventListener("click", function () {
    drawerClosebtn.classList.remove("show");
    drawerOpenbtn.classList.add("show");
    drawer.classList.remove("active");
  });

}