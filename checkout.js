const orderSummary = document.getElementById("orderSummary");
    const orderTotal   = document.getElementById("orderTotal");
    const checkoutForm = document.getElementById("checkoutForm");
    const thankYou     = document.getElementById("thankYouMessage");

    const money = n => `₦${Number(n).toLocaleString(undefined, {minimumFractionDigits:2})}`;

    function loadCart() {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    }

    function renderCart() {
      const cart = loadCart();
      if (!cart.length) {
        orderSummary.innerHTML = `<p>Your cart is empty.</p>`;
        return;
      }

      let subtotal = 0;
      orderSummary.innerHTML = "";

      cart.forEach(item => {
        const row = document.createElement("div");
        row.className = "d-flex align-items-center justify-content-between mb-3";
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;

        row.innerHTML = `
          <div class="d-flex align-items-center gap-3">
            <img src="${item.img}" class="cart-img" />
            <div>
              <strong>${item.name}</strong><br/>
              Qty: ${item.qty}
            </div>
          </div>
          <div>${money(itemTotal)}</div>
        `;

        orderSummary.appendChild(row);
      });

      const grandTotal = subtotal + 2000; // ₦2,000 shipping
      orderTotal.textContent = money(grandTotal);
    }

    checkoutForm.addEventListener("submit", e => {
      e.preventDefault();

      // Simulate "order success"
      localStorage.removeItem("cart");
      checkoutForm.style.display = "none";
      thankYou.style.display = "block";
    });

    renderCart();