document.addEventListener("DOMContentLoaded", function(){
   var allBtnsPopup=document.querySelectorAll(".popup__btn-main");
   var mainBody=document.querySelector("body");
   var popupMain=document.querySelector("#popup--info")
   var closebtn=document.querySelector("")
  console.log(allBtnsPopup)
function openPopup(){
  popupMain.classList.add("active");   
}

function closePopup(){
  popupMain.classList.remove("active");   
}


//adding eventlisteners to buttons
   allBtnsPopup.forEach(function(btn){
    btn.addEventListener("click", function(e){
        console.log("thisis")
    var productOpened=e.currentTarget;
    var handleprd=productOpened.getAttribute("data-handle");
     openPopup();
     })
   })
   





})