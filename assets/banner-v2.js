
var drawerOpenbtn= document.querySelector(".open-drawer");
var drawerClosebtn=document.querySelector(".close-drawer");
var drawer=document.querySelector(".drawer--main--banner");

drawerOpenbtn.addEventListener("click", function(){
  drawerClosebtn.classList.add("show")
  drawerOpenbtn.classList.remove("show");
  drawer.classList.add("active");

})

drawerClosebtn.addEventListener("click", function(){
  drawerClosebtn.classList.remove("show");
  drawerOpenbtn.classList.add("show");
  drawer.classList.remove("active");

})

