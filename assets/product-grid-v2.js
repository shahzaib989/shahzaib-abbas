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
   console.log(product)
   let variantHtml="";

   product.options.forEach((option, index) => {
    
    variantHtml +=`
    
    <div class="option-name">${option.name}</div>
    <div class="option__main--wrapper">
    </div>
    `


   });

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
      <div class="popup__variants--main">
      </div>
      <div class="add__to--cartbtn">
        <button type="button" class="add-to-cartbutton" data-var="${product.variants[0].id}">
        Add to cart

         <svg width="36" height="12" viewBox="0 0 36 12" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M0.75 4.77295L9.20657e-08 4.77295L-9.20657e-08 6.27295L0.75 6.27295L0.75 4.77295ZM34.9798 6.05328C35.2727 5.76039 35.2727 5.28551 34.9798 4.99262L30.2068 0.21965C29.9139 -0.0732432 29.4391 -0.0732433 29.1462 0.21965C28.8533 0.512544 28.8533 0.987417 29.1462 1.28031L33.3888 5.52295L29.1462 9.76559C28.8533 10.0585 28.8533 10.5334 29.1462 10.8263C29.4391 11.1191 29.9139 11.1191 30.2068 10.8263L34.9798 6.05328ZM0.75 6.27295L34.4495 6.27295L34.4495 4.77295L0.75 4.77295L0.75 6.27295Z" fill="white"/>
         </svg>

        </button>
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
