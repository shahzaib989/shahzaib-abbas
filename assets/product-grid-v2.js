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


    //building product in popup 

 function buildProduct(product) {

    let variantHtml = "";

    product.options.forEach((option, index) => {
      const optionName = option.name.toLowerCase();

      // Color → radios
      if (optionName === "color" || optionName === "colour") {
        const radios = option.values.map(value => `
          <label class="color-option">
            <input type="radio" name="option-${index}" value="${value}">
            <span class="swatch">${value}</span>
          </label>
        `).join("");

        variantHtml += `
          <div class="option-group color-group" data-index="${index}">
            <div class="option-name">${option.name}</div>
            <div class="option__main--wrapper">
              ${radios}
            </div>
          </div>
        `;
      }
      // Other options → custom select
      else {
        const optionsList = option.values.map(value => `
          <li data-value="${value}">${value}</li>
        `).join("");

        variantHtml += `
          <div class="option-group select-group" data-index="${index}">
            <div class="option-name">${option.name}</div>
            <div class="option__main--wrapper custom-select">
              <div class="select-trigger">Select ${option.name}</div>
              <ul class="select-options">
                ${optionsList}
              </ul>
              <input type="hidden" name="option-${index}">
            </div>
          </div>
        `;
      }
    });

    // Build popup HTML
    const firstVariant = product.variants.find(v => v.available) || product.variants[0];

    const popupHtml = `
      <div class="popup__inner--main">
        <button class="close-popup">✕</button>
        <div class="product--top--data">
          <div class="product__image--main">
            <img src="${product.featured_image}" alt="product-img-popup">
          </div>
          <div class="product--info">
            <div class="product__title--main">${product.title}</div>
            <div class="product-price--main">$${(firstVariant.price / 100).toFixed(2)}</div>
            <div class="product__description--main">${product.description}</div>
          </div>
        </div>
        <div class="popup__variants--main">
          ${variantHtml}
        </div>
        <div class="add__to--cartbtn">
          <button type="button" class="add-to-cartbutton" data-var="${firstVariant.id}">
            Add to cart
          </button>
        </div>
      </div>
    `;

    contentPopup.innerHTML = popupHtml;

    // Initialize option events
    initVariantEvents(product);
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






   function initVariantEvents(product) {
    const popup = contentPopup;
    const addBtn = popup.querySelector(".add-to-cartbutton");
    const priceBox = popup.querySelector(".product-price--main");
    const image = popup.querySelector(".product__image--main img");

    // Color radios
    popup.querySelectorAll(".color-option input").forEach(radio => {
      radio.addEventListener("change", updateVariant);
    });

    // Custom selects
    popup.querySelectorAll(".custom-select").forEach(select => {
      const trigger = select.querySelector(".select-trigger");
      const options = select.querySelectorAll("li");
      const hiddenInput = select.querySelector("input[type='hidden']");

      // Open/close dropdown
      trigger.addEventListener("click", () => select.classList.toggle("open"));

      // Select option
      options.forEach(li => {
        li.addEventListener("click", () => {
          hiddenInput.value = li.dataset.value;
          trigger.textContent = li.dataset.value;
          select.classList.remove("open");
          updateVariant();
        });
      });
    });

    // Add to Cart click
    addBtn.addEventListener("click", async () => {
      const variantId = addBtn.dataset.var;
      if (!variantId) return;

      try {
        await fetch("/cart/add.js", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: variantId, quantity: 1 })
        });
        alert("Added to cart!");
        closePopup();
      } catch (err) {
        console.error("Add to cart failed:", err);
      }
    });

    //update-variant
    
    function updateVariant() {
      const selected = [];

      popup.querySelectorAll(".option-group").forEach((group, index) => {
        const radio = group.querySelector("input[type='radio']:checked");
        if (radio) { selected[index] = radio.value; return; }
        const hidden = group.querySelector("input[type='hidden']");
        if (hidden && hidden.value) { selected[index] = hidden.value; return; }
        selected[index] = null;
      });

      const variant = product.variants.find(v =>
        selected.every((opt, i) => !opt || v[`option${i + 1}`] === opt)
      );

      if (!variant) return;

      // Update Add to Cart button
      addBtn.dataset.var = variant.id;

      // Update price
      priceBox.textContent = `$${(variant.price / 100).toFixed(2)}`;

      // Update image if available
      if (variant.featured_image) {
        image.src = variant.featured_image.src || variant.featured_image;
      }
    }
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
