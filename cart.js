// cart.js
const CART_KEY = 'pakStoreCart';

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(name, page) {
  const cart = getCart();
  cart.push({ name, page });
  saveCart(cart);
  alert(`${name} added to cart!`);
}

function viewCart() {
  const cart = getCart();
  if (cart.length === 0) {
    alert('Your cart is empty.');
    return;
  }
  let list = 'Items in your cart:\n';
  cart.forEach((item, index) => {
    list += `${index + 1}. ${item.name}\n`;
  });
  alert(list);
}

// Optional: use viewCart() via a button somewhere
