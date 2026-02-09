document.addEventListener("DOMContentLoaded", function(){
   var allBtnsPopup=document.querySelectorAll(".popup__btn-main");
   var mainBody=document.querySelector("body");







   allBtnsPopup.forEach(function(btn){
    btn.addEventListener("click", function(e){
    var productOpened=e.currentTarget;
    var handleprd=productOpened.getAttribute("data-handle");
     console.log(handleprd);
     console.log("clicked");
     console.log(body);
   })
   })
   
})