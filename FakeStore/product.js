fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => {
    const productRow = document.getElementById("productRow");

    data.forEach(item => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-4";

      col.innerHTML = `
        <div class="card shadow p-3">
          <div class="image-box">
            <img src="${item.image}" class="product-img" alt="${item.title}">
          </div>

          <h6 class="mt-2">
            ${item.title.length > 40 ? item.title.slice(0,40)+"..." : item.title}
          </h6>

          <div>⭐ ${item.rating.rate} (${item.rating.count})</div>

          <div class="fw-bold text-success">
            ₹ ${(item.price * 83).toFixed(0)}
          </div>

          <p class="small">
            ${item.description.slice(0,70)}...
          </p>

          <div class="d-flex justify-content-between">
            <button class="btn btn-outline-primary btn-sm">Add to Cart</button>
            <button class="btn btn-primary btn-sm">Buy Now</button>
          </div>
        </div>
      `;

      productRow.appendChild(col);
    });
  })
  .catch(err => console.log(err));
