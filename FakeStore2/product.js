async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    const container = document.getElementById("productContainer");

    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <div class="product-image">
          <img src="${item.image}" alt="${item.title}">
        </div>

        <div class="product-details">
          <h5>${item.title.length>50?item.title.slice(0,50)+"...":item.title}</h5>
          <div>⭐ ${item.rating.rate} (${item.rating.count})</div>
          <div class="fw-bold text-success">₹ ${(item.price*83).toFixed(0)}</div>
          <p class="small">${item.description.slice(0,100)}...</p>
          <div>
            <button class="btn btn-outline-primary btn-sm">Add to Cart</button>
            <button class="btn btn-primary btn-sm">Buy Now</button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  } catch(err) {
    console.error(err);
  }
}

getProducts();
