let currentIndex = 0; // Declare currentIndex globally
let products; // Declare products globally
let totalProducts; // Declare totalProducts globally

// Fetch the JSON data
fetch('product.json')
  .then(response => response.json())
  .then(data => {
    // Get the product carousel element
    const productCarousel = document.getElementById('product-carousel');

    // Loop through the products and create HTML elements for each product
    data.products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');

      const productImage = document.createElement('img');
      productImage.src = product.image;
      productImage.alt = product.name;

      const productName = document.createElement('h2');
      productName.textContent = product.name;

      const productDescription = document.createElement('p');
      productDescription.textContent = product.description;

      const productPrice = document.createElement('span');
      productPrice.classList.add('price');
      productPrice.textContent = `$${product.price.toFixed(2)}`;

      const addToCartButton = document.createElement('button');
      addToCartButton.textContent = 'Add to Cart';

      // Append the elements to the product carousel
      productDiv.appendChild(productImage);
      productDiv.appendChild(productName);
      productDiv.appendChild(productDescription);
      productDiv.appendChild(productPrice);
      productDiv.appendChild(addToCartButton);
      productDiv.style.display = 'none';

      productCarousel.appendChild(productDiv);
    });

    // Set products and totalProducts globally
    products = document.querySelectorAll('.product');
    totalProducts = products.length;

    // Start the carousel after loading products
    startCarousel();
  })
  .catch(error => {
    console.error('Error fetching products:', error);
  });

// Function to start the carousel
function startCarousel() {
  // Show the first product and hide others
  products[currentIndex].style.display = 'block';

  // Function to show the next product in the carousel
  function showNextProduct() {
    products[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % totalProducts;
    products[currentIndex].style.display = 'block';
  }

  // Function to show the previous product in the carousel
  function showPreviousProduct() {
    products[currentIndex].style.display = 'none';
    currentIndex = (currentIndex - 1 + totalProducts) % totalProducts;
    products[currentIndex].style.display = 'block';
  }

  // Set an interval to show the next product every 5 seconds
  setInterval(showNextProduct, 5000);

  // Get the carousel buttons
  const prevSildeBtn = document.getElementById('prev-silde-btn');
  const nextSildeBtn = document.getElementById('next-silde-btn');

  // Event listeners for manual navigation
  prevSildeBtn.addEventListener('click', showPreviousProduct);
  nextSildeBtn.addEventListener('click', showNextProduct);
}
