document.addEventListener("DOMContentLoaded", function () {

  var allBtnsPopup = document.querySelectorAll(".popup__btn-main");
  var popupMain = document.querySelector("#popup--info");
  var closeBtn = document.querySelector(".popupClosebtn");
  var docbodym= document.querySelector("body");
  var contentPopup=document.querySelector(".popupcontent");

  function openPopup() {
    if (popupMain) {
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

  async function renderPrd(handle) {
    
    //fetching product
   if (!handle) return;
   try {
    const res = await fetch (`/products/${handle}.js`);
    const product = await res.json();
    
    var currentProduct=product;
    console.log(currentProduct);
   }
   catch (err){
    console.error("Product Fetch Failed", err)
   }



  }

  // Add click on open buttons
  allBtnsPopup.forEach(function (btn) {

    btn.addEventListener("click", function (e) {

      var productOpened = e.currentTarget;
      var handleprd = productOpened.getAttribute("data-handle");

      renderPrd(handleprd);
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
