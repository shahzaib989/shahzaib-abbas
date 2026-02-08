
var drawerOpenbtn= document.querySelector(".open-drawer");
var drawerClosebtn=document.querySelector(".close-drawer");
var drawer=document.querySelector(".drawer--main--banner");
drawerOpenbtn.addEventListener("click", function(){
  drawerClosebtn.style.display="block";
  drawerOpenbtn.style.display="none";
  drawer.classList.add("active");

})

drawerClosebtn.addEventListener("click", function(){
  drawerClosebtn.style.display="none";
  drawerOpenbtn.style.display="block";
  drawer.classList.remove("active");

})

