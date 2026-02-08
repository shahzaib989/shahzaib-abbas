
var drawerOpenbtn= document.querySelector("open-drawer");
var drawerClosebtn=document.querySelector(".close-drawer");

drawerOpenbtn.addEventListener("click", function(){
  drawerClosebtn.style.display="block";
  drawerOpenbtn.style.display="none";


})

drawerClosebtn.addEventListener("click", function(){
  drawerClosebtn.style.display="none";
  drawerOpenbtn.style.display="block";

})

