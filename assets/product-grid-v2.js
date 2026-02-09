document.addEventListener("DOMContentLoaded", function () {

  const allBtnsPopup = document.querySelectorAll(".popup__btn-main");
  const popupMain = document.querySelector("#popup--info");
  const closeBtn = document.querySelector(".popupClosebtn");
  const docBody = document.querySelector("body");
  const contentPopup = document.querySelector(".popupcontent");
  const Freeprdid = document.querySelector("#popup--info").getAttribute("data-var-free");

  let currentProduct = null;

  // Open / Close Popup
  function openPopup() {
    if (popupMain) {
      popupMain.classList.add("active");
      docBody.style.overflow = "hidden";
    }
  }

  function closePopup() {
    if (popupMain) {
      popupMain.classList.remove("active");
      docBody.style.overflow = "unset";
      contentPopup.innerHTML = "";
    }
  }

  // Build Product Popup
  function buildProduct(product) {
    currentProduct = product;

    let variantHtml = "";

    product.options.forEach((option, index) => {
      const optionName = option.name.toLowerCase();

      // Color → radios
      if (optionName === "color" || optionName === "colour") {
        const radios = option.values.map((value, i) => `
          <input type="radio" id="option-${index}-${value}" name="option-${index}" value="${value}" style="display:none;" ${i === 0 ? "checked" : ""}>
          <label class="color-option" for="option-${index}-${value}">
            <div class="color--field" style="background:${value};"></div>
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
        const optionsList = option.values.map((value, i) => `
          <li data-value="${value}" ${i === 0 ? "class='selected'" : ""}>${value}</li>
        `).join("");

        variantHtml += `
          <div class="option-group select-group" data-index="${index}">
            <div class="option-name">${option.name}</div>
            <div class="option__main--wrapper custom-select">
              <div class="main__dropdown">
                <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.06055 1.06067L7.06055 7.06067L13.0605 1.06067" stroke="black" stroke-width="1.5" stroke-linecap="square"/>
                </svg>
              </div>
              <div class="select-trigger">${option.values[0]}</div>
              <ul class="select-options">
                ${optionsList}
              </ul>
              <input type="hidden" name="option-${index}" value="${option.values[0]}">
            </div>
          </div>
        `;
      }
    });

    const firstVariant = product.variants.find(v => v.available) || product.variants[0];

    const popupHtml = `
      <div class="popup__inner--main">
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
          <div class="add-to-cartcontent"
            Add to cart

          <svg width="36" height="12" viewBox="0 0 36 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.75 4.77295L9.20657e-08 4.77295L-9.20657e-08 6.27295L0.75 6.27295L0.75 4.77295ZM34.9798 6.05328C35.2727 5.76039 35.2727 5.28551 34.9798 4.99262L30.2068 0.21965C29.9139 -0.0732432 29.4391 -0.0732433 29.1462 0.21965C28.8533 0.512544 28.8533 0.987417 29.1462 1.28031L33.3888 5.52295L29.1462 9.76559C28.8533 10.0585 28.8533 10.5334 29.1462 10.8263C29.4391 11.1191 29.9139 11.1191 30.2068 10.8263L34.9798 6.05328ZM0.75 6.27295L34.4495 6.27295L34.4495 4.77295L0.75 4.77295L0.75 6.27295Z" fill="white"/>
          </svg>
          </div>

            <span class="btn-loader" style="display:none;"></span>
          </button>
        </div>
      </div>
    `;

    contentPopup.innerHTML = popupHtml;

    initVariantEvents(product);
    openPopup();
  }

  // Fetch Product by Handle
  async function renderPrd(handle, button) {
    if (!handle) return;

    const btnLoader = button.querySelector(".btn-loader");
     const btnLoadersvg = button.querySelector("svg");
    btnLoader.style.display = "inline-block"; 
    btnLoadersvg.style.display="none";
    button.disabled = true;

    try {
      const res = await fetch(`/products/${handle}.js`);
      const product = await res.json();
      buildProduct(product);
    } catch (err) {
      console.error("Product fetch failed", err);
    } finally {
      btnLoader.style.display = "none"; // hide loader
      button.disabled = false;
      btnLoadersvg.style.display="block";
    }
  }

  // Variant Selection & Add to Cart
  function initVariantEvents(product) {
    const popup = contentPopup;
    const addBtn = popup.querySelector(".add-to-cartbutton");
    const addBtnLoader = addBtn.querySelector(".btn-loader");
    const priceBox = popup.querySelector(".product-price--main");
    const image = popup.querySelector(".product__image--main img");

    // Color options
    popup.querySelectorAll(".color-option input").forEach(radio => {
      radio.addEventListener("change", () => {
        popup.querySelectorAll(".color-option").forEach(label => {
          label.querySelector(".color--field").style.background = label.querySelector("input").checked ? "black" : label.querySelector("input").value;
          label.querySelector(".swatch").style.color = label.querySelector("input").checked ? "white" : "black";
        });
        updateVariant();
      });

      if (radio.checked) radio.dispatchEvent(new Event("change"));
    });

    // Custom selects
    popup.querySelectorAll(".custom-select").forEach(select => {
      const trigger = select.querySelector(".select-trigger");
      const options = select.querySelectorAll("li");
      const hiddenInput = select.querySelector("input[type='hidden']");

      trigger.addEventListener("click", () => select.classList.toggle("open"));

      options.forEach(li => {
        li.addEventListener("click", () => {
          hiddenInput.value = li.dataset.value;
          trigger.textContent = li.dataset.value;

          options.forEach(o => o.classList.remove("selected"));
          li.classList.add("selected");

          select.classList.remove("open");
          updateVariant();
        });
      });
    });

    // Add to Cart click
    addBtn.addEventListener("click", async () => {
      addBtnLoader.style.display = "inline-block"; // show loader
      addBtn.disabled = true;

      const variantId = addBtn.dataset.var;
      if (!variantId) {
        addBtnLoader.style.display = "none";
        addBtn.disabled = false;
        return;
      }

      try {
        await fetch("/cart/add.js", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: variantId, quantity: 1 })
        });

        // Check if Black + Medium → add free product
        const selectedOptions = [];
        popup.querySelectorAll(".option-group").forEach(group => {
          const radio = group.querySelector("input[type='radio']:checked");
          if (radio) selectedOptions.push(radio.value);
          else {
            const hidden = group.querySelector("input[type='hidden']");
            if (hidden && hidden.value) selectedOptions.push(hidden.value);
          }
        });

        if (selectedOptions.includes("Black") && selectedOptions.includes("M") && Freeprdid) {
          await fetch("/cart/add.js", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: Freeprdid, quantity: 1 })
          });
        }

        alert("Added to cart!");
        closePopup();
      } catch (err) {
        console.error("Add to cart failed:", err);
      } finally {
        addBtnLoader.style.display = "none";
        addBtn.disabled = false;
      }
    });

    // Update variant function
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

      addBtn.dataset.var = variant.id;
      priceBox.textContent = `$${(variant.price / 100).toFixed(2)}`;
      if (variant.featured_image) image.src = variant.featured_image.src || variant.featured_image;
    }
  }

  // Attach click events to buttons
  allBtnsPopup.forEach(btn => {
    btn.addEventListener("click", function () {
      const handleprd = btn.getAttribute("data-handle");
      renderPrd(handleprd, btn);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closePopup);
  }

});
