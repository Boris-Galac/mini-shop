let allTotal = 0;
function addToCart(element) {
  let mainEl = element.closest('.item');
  let quantity = Number(mainEl.querySelector('input').value);
  let price = mainEl.querySelector('.item-price').innerText;
  let product = mainEl.querySelector('.item-description > h2').innerText;
  let cartList = document.querySelector('.cart-list');
  let total = document.querySelector('.total');
  price = Number(price.slice(1));
  if (quantity) {
    let sum = price * quantity;
    //// single product
    let item = document.createElement('li');
    item.classList.add('single-item');
    item.innerHTML = `
    <h3 class="product">${product}</h3>
    <div class="inner-item-box">
       <p>$${price} x ${quantity} = $<span class="sum">${sum}</span></p>
       <button onclick="removeItem(this)" class="del-btn"><i class="fa-solid fa-trash-can"></i></button>
    </div>
    `;
    cartList.append(item);
    //// add to cart btn
    element.innerText = 'Added';
    element.disabled = true;
    element.style = `
      color: gray;
      border: teal;
      border: 2px solid #555;
      box-shadow: none;
      cursor: not-allowed;
    `;
    total.innerText = `$${(allTotal += sum)}`;
  } else {
    alert('odaberi količinu');
  }
}

function removeItem(element) {
  let total = document.querySelector('.total');
  let mainEl = element.closest('.single-item');
  let price = Number(mainEl.querySelector('.sum').innerText);
  mainEl.classList.add('deleted-item');
  mainEl.addEventListener('transitionend', () => {
    mainEl.remove();
  });
  total.innerText = `$${(allTotal -= price)}`;
  //// vratiti proizvod na reset Add to cart
  let productName = mainEl.querySelector('.product').innerText;
  let products = document.querySelectorAll('.item');
  products.forEach((product) => {
    if (product.querySelector('h2').innerText === productName) {
      let addToCart = product.querySelector('.item-count-btn');
      addToCart.innerText = 'Add to cart';
      addToCart.disabled = false;
      addToCart.style = `
        background: rgb(33, 36, 33);
        color: #fff;
        border-radius: 4px;
        border: 2px solid rgb(30, 167, 30);
        transition: all .1s ease-in-out;
      `;
      product.querySelector('.item-num').value = '0';
    }
  });
}
