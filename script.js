let shopLink = document.getElementById('shop-nav');
let shopItems = document.getElementById('shop-drop');


shopLink.addEventListener('mouseover', function(){
  if (shopLink == shopItems){
    shopItems.style.display = 'block';
  }else {
    shopItems.style.display = 'none';
    
  }
})