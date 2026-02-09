document.addEventListener("DOMContentLoaded", function () {

  var allBtnsPopup = document.querySelectorAll(".popup__btn-main");
  var popupMain = document.querySelector("#popup--info");
  var closeBtn = document.querySelector(".popupClosebtn");
  var docbodym= document.querySelector("body");


  function openPopup() {
    if (popupMain) {
      console.log(docbodym)
      popupMain.classList.add("active");
      docbodym.style.overflow="hidden";
    }
  }

  function closePopup() {
    if (popupMain) {
      popupMain.classList.remove("active");
       docbodym.style.overflow="unset";
    }
  }


  // Add click on open buttons
  allBtnsPopup.forEach(function (btn) {

    btn.addEventListener("click", function (e) {

      var productOpened = e.currentTarget;
      var handleprd = productOpened.getAttribute("data-handle");

      console.log("Handle:", handleprd);

      openPopup();

    });

   
   
    //closebtn
    closeBtn.addEventListener("click", function(){
      closePopup();
    })

  });



  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      closePopup();
    });
  }

});
