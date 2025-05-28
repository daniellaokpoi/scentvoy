let shopLink = document.getElementById('shop-nav');
let shopItems = document.getElementById('shop-drop');


shopLink.addEventListener('mouseover', function(){
  if (shopLink == shopItems){
    shopItems.style.display = 'block';
  }else {
    shopItems.style.display = 'none';
    
  }
})

// Add to Wishlist
let wishBtn = document.querySelectorAll('.wishlist');
let wishIcon = document.getElementById('wishlist-icon');

wishBtn.forEach((wishButton) => {
  wishButton.addEventListener('click', () => {
    if (wishIcon.style.color === 'red'){
      wishIcon.style.color = 'black';
    }else {
      wishIcon.style.color = 'red';
    }
  })
});


// controll for the the aleart
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    appendAlert('This perfume has been added to your wishlist', 'success')
  })
}else {
  appendAlert('This perfume has been removed from your wishlist', 'success')
}

// dashboard functions
function removeItem(button) {
  const card = button.closest('.col-md-4');
  if (card) {
    card.remove();
  }
}

 // Smooth-scroll placeholder
 function scrollToSection(id){ alert("This would scroll to section: "+id); }

 // Show modal with offer text
 document.querySelectorAll('.offer').forEach(el=>{
   el.addEventListener('click',()=>{
     document.getElementById('modalOfferText').textContent = el.textContent.trim();
     new bootstrap.Modal(document.getElementById('offerModal')).show();
   });
 });

//  sign in to dashboard
 document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  // Get input values
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Simple validation
  if (email === "" || password === "") {
    alert("Please fill in both email and password.");
  } else {
    // Redirect to dashboard.html
    window.location.href = "dashboard.html";
  }
});

// Bootstrap 'was-validated' styling helper
function setValidationState(form, ok){
  form.classList.remove('was-validated');
  if(!ok) form.classList.add('was-validated');
}

// registration to dashboard
document.addEventListener('DOMContentLoaded', () => {

  const form   = document.getElementById('registerForm');
  const pass   = document.getElementById('regPass');
  const pass2  = document.getElementById('regPassConfirm');
  const terms  = document.getElementById('regTerms');

  form.addEventListener('submit', e => {
    e.preventDefault();                       // stay on page for validation
    let ok = form.checkValidity();            // HTML-built-in checks

    if (pass.value.trim() !== pass2.value.trim()) {
      ok = false;
      alert('Passwords do not match.');
    }
    if (!terms.checked) {
      ok = false;
      alert('You must accept the Terms & Privacy Policy.');
    }

    if (ok) {
      console.log('✅ form valid – redirecting to dashboard.html');
      window.location.href = 'dashboard.html'; // ← redirect
    } else {
      console.log('❌ form NOT valid');
      form.classList.add('was-validated');     // Bootstrap invalid styling
    }
  });

});

// Wishlist page
function removeItem(button) {
  const item = button.closest('.wishlist-item');
  item.remove();
}

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.wishlist-btn');

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const perfume = {
        id: this.dataset.id,
        name: this.dataset.name,
        price: this.dataset.price,
        img: this.dataset.img
      };

      let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

      if (!wishlist.find(item => item.id === perfume.id)) {
        wishlist.push(perfume);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert(`${perfume.name} added to wishlist!`);
      } else {
        alert(`${perfume.name} is already in your wishlist.`);
      }
    });
  });
});

