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
    buildproduct(product);
    openPopup();
   }
   catch (err){
    console.error("Product Fetch Failed", err)
   }



  }


  //building product in popup 

function buildproduct(product){
  const popupHtml=`
    <div class="popup__inner--main">
      <div class="product--top--data">
        <div class="product__image--main">
          <img src="${product.featured_image}" alt="product-img-popup">
        </div>
        <div class="product--info">
          <div class="product__title--main">
            ${product.title}
          </div>
           <div class="product-price--main">
            $${(product.variants[0].price / 100). toFixed(2)}
          </div>
          <div class="product__description--main">
            ${product.description}
          </div>
        </div>
      </div>
    </div>
  `;
   
  contentPopup.innerHTML = popupHtml;


}





  // Add click on open buttons
  allBtnsPopup.forEach(function (btn) {

    btn.addEventListener("click", function (e) {

      var productOpened = e.currentTarget;
      var handleprd = productOpened.getAttribute("data-handle");

      renderPrd(handleprd);
     

    });

   
   

  });


//closebtn
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      closePopup();
    });
  }




});
