function selectProduct(productName) {
  document.getElementById("productName").value = productName;
  alert("You selected: " + productName);

  document.getElementById("checkout").scrollIntoView({ behavior: "smooth" });
}

const checkoutForm = document.getElementById("checkoutForm");
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;

  alert(`Thank you for shopping, ${name}!`);
  checkoutForm.reset();
});

const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("cname").value;

  alert(`Thank you for contacting us, ${name}!`);
  contactForm.reset();
});
