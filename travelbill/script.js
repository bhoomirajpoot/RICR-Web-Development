document.getElementById("calcBtn").addEventListener("click", function () {
  const kmInput = document.getElementById("kmInput").value.trim();
  const errorMsg = document.getElementById("errorMsg");
  const resultCard = document.getElementById("resultCard");
  const breakdownList = document.getElementById("breakdownList");
  const totalAmtSpan = document.getElementById("totalAmt");

  breakdownList.innerHTML = "";
  errorMsg.classList.add("d-none");
  resultCard.classList.add("d-none");

  // Validation
  if (kmInput === "" || isNaN(kmInput) || Number(kmInput) < 0) {
    errorMsg.classList.remove("d-none");
    errorMsg.textContent = "Please enter a non-negative number of kilometres.";
    return;
  }

  let km = parseFloat(kmInput);
  let total = 0;
  let breakdown = [];

  // Slab Logic
  let firstSlabKm = Math.min(km, 10);
  if (firstSlabKm > 0) {
    let amount = firstSlabKm * 11;
    breakdown.push(`${firstSlabKm} km × Rs.11 = Rs.${amount.toLocaleString()}`);
    total += amount;
  }

  if (km > 10) {
    let remaining = km - 10;
    let amount = remaining * 10;
    breakdown.push(`${remaining} km × Rs.10 = Rs.${amount.toLocaleString()}`);
    total += amount;
  }

  // Output Total
  totalAmtSpan.textContent = total.toLocaleString();

  // Breakdown UI
  breakdown.forEach(b => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = b;
    breakdownList.appendChild(li);
  });

  resultCard.classList.remove("d-none");
});
