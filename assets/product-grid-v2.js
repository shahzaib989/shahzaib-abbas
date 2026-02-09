document.addEventListener("DOMContentLoaded", function () {

  var allBtnsPopup = document.querySelectorAll(".popup__btn-main");
  var popupMain = document.querySelector("#popup--info");
  var closeBtn = document.querySelector(".popupClosebtn");


  function openPopup() {
    if (popupMain) {
      popupMain.classList.add("active");
    }
  }

  function closePopup() {
    if (popupMain) {
      popupMain.classList.remove("active");
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
