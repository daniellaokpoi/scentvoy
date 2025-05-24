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
    appendAlert('Nice, you liked this Fragrance!', 'success')
  })
}else {
  appendAlert('Nice, you unliked this Fragrance!', 'success')
}