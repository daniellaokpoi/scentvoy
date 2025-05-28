// cart.js – front-end cart logic for ScentVoy
document.addEventListener("DOMContentLoaded", () => {

  const cartContainer = document.getElementById("cartContainer");
  const grandTotalEl  = document.getElementById("grandTotal");

  /* ---------- Helpers ---------- */
  const money = n => `₦${Number(n).toLocaleString(undefined, {minimumFractionDigits:2})}`;

  function loadCart()      { return JSON.parse(localStorage.getItem("cart") || "[]"); }
  function saveCart(list)  { localStorage.setItem("cart", JSON.stringify(list)); }

  /* ---------- Render ---------- */
  function render() {
    const cart = loadCart();
    cartContainer.innerHTML = "";

    /* Empty-cart UI */
    if (cart.length === 0) {
      cartContainer.innerHTML =
        `<div class="text-center py-5">
           <p class="fs-4">Your cart is empty.</p>
           <a href="index.html" class="btn btn-outline-dark mt-2">Continue Shopping</a>
         </div>`;
      grandTotalEl.textContent = "Total: ₦0.00";
      return;
    }

    /* Build item cards */
    let grandTotal = 0;

    cart.forEach((item, idx) => {
      const subtotal = item.price * item.qty;
      grandTotal    += subtotal;

      const card = document.createElement("div");
      card.className = "card cart-card mb-3";
      card.innerHTML = `
        <div class="card-body d-flex align-items-center justify-content-between flex-wrap">
          <div class="d-flex align-items-center gap-3 mb-3 mb-md-0">
            <img src="${item.img}" alt="${item.name}" class="cart-img">
            <div>
              <h5 class="mb-1">${item.name}</h5>
              <p class="mb-0 fw-semibold">${money(item.price)}</p>
            </div>
          </div>

          <div class="d-flex align-items-center gap-2">
            <input type="number" min="1" value="${item.qty}" data-idx="${idx}"
                   class="form-control qty-input text-center"/>
            <span class="fw-semibold d-none d-md-inline">= ${money(subtotal)}</span>
            <button class="btn btn-outline-danger btn-sm" data-remove="${idx}">Remove</button>
          </div>
        </div>
      `;
      cartContainer.appendChild(card);
    });

    grandTotalEl.textContent = `Total: ${money(grandTotal)}`;
  }

  /* ---------- Event Delegation ---------- */
  cartContainer.addEventListener("input", e => {
    if (e.target.matches(".qty-input")) {
      const idx  = e.target.dataset.idx;
      let cart   = loadCart();
      const qty  = Math.max(1, Number(e.target.value));
      cart[idx].qty = qty;
      saveCart(cart);
      render();
    }
  });

  cartContainer.addEventListener("click", e => {
    if (e.target.dataset.remove !== undefined) {
      const idx = e.target.dataset.remove;
      let cart  = loadCart();
      cart.splice(idx, 1);
      saveCart(cart);
      render();
    }
  });

  /* ---------- Initial render ---------- */
  render();
});
