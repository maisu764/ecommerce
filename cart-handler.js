// cart-handler.js

// Helpers for localStorage
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item or increment quantity
function addToCart(product) {
  let cart = getCart();
  const idx = cart.findIndex(item => item.name === product.name);
  if (idx > -1) {
    cart[idx].quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
  alert(`${product.name} added to your cart.`);
}

// Remove item completely
function removeItem(productName) {
  let cart = getCart();
  cart = cart.filter(item => item.name !== productName);
  saveCart(cart);
  displayCartItems();
}

// Clear all items
function clearCart() {
  localStorage.removeItem('cart');
  displayCartItems();
}

// Display all items in cart
function displayCartItems() {
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cart = getCart();

  cartItemsDiv.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    cartTotal.textContent = '';
    return;
  }

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div>
        <span class="cart-item-name">${item.name} (×${item.quantity})</span>
        <span class="cart-item-price">PKR ${itemTotal.toLocaleString()}</span>
      </div>
      <button class="cart-remove" onclick="removeItem('${item.name}')">Remove</button>
    `;
    cartItemsDiv.appendChild(div);
  });

  cartTotal.textContent = `Total: PKR ${total.toLocaleString()}`;
}

// Initialize display
window.onload = displayCartItems;
