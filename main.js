// Basic Cart Logic
document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      const name = button.getAttribute('data-name');
      const price = parseFloat(button.getAttribute('data-price'));

      addToCart({ id, name, price });
    });
  });

  // B2B / B2C Toggle Logic
  initModeToggle();
});

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('frozenFruitCart')) || [];

  // Check if item already exists
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('frozenFruitCart', JSON.stringify(cart));

  alert(`${product.name} added to cart!`);
  console.log('Cart updated:', cart);
}

function initModeToggle() {
  const btnIndividual = document.getElementById('btn-individual');
  const btnBusiness = document.getElementById('btn-business');
  const viewIndividual = document.getElementById('view-individual');
  const viewBusiness = document.getElementById('view-business');

  if (!btnIndividual || !btnBusiness || !viewIndividual || !viewBusiness) {
    console.warn('Mode toggle elements not found');
    return;
  }

  btnIndividual.addEventListener('click', () => setMode('individual'));
  btnBusiness.addEventListener('click', () => setMode('business'));

  function setMode(mode) {
    if (mode === 'business') {
      // Activate Business Mode
      document.body.classList.add('business-mode');

      // Update Buttons
      btnBusiness.classList.add('active');
      btnIndividual.classList.remove('active');

      // Switch Views
      viewIndividual.classList.add('hidden');
      viewBusiness.classList.remove('hidden');

    } else {
      // Activate Individual Mode
      document.body.classList.remove('business-mode');

      // Update Buttons
      btnIndividual.classList.add('active');
      btnBusiness.classList.remove('active');

      // Switch Views
      viewBusiness.classList.add('hidden');
      viewIndividual.classList.remove('hidden');
    }
  }
}
