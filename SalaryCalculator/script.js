// Currency formatter for Indian Rupees
const formatInr = (value) => {
  return value.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
};

// Salary calculation function (as required)
function calculateGrossSalary(basic) {
  const hra = basic * 0.20;   // 20% HRA
  const da  = basic * 0.10;   // 10% DA
  const gross = basic + hra + da;

  return { basic, hra, da, gross };
}

// Trigger function with UI / spinner
function startCalculation() {
  const calcBtn = document.getElementById("calcBtn");
  const basicInput = document.getElementById("basic");
  const error = document.getElementById("error");
  const status = document.getElementById("status");
  const result = document.getElementById("result");

  // Reset messages
  error.textContent = "";
  status.innerHTML = "";
  result.style.display = "none";

  let basic = parseFloat(basicInput.value);

  // Validation
  if (isNaN(basicInput.value) || basicInput.value === "") {
    error.textContent = "Please enter a number.";
    return;
  }
  if (basic < 0) {
    error.textContent = "Salary cannot be negative.";
    return;
  }

  // Disable button + show spinner for 0.5s
  calcBtn.disabled = true;
  status.innerHTML = `
    <div class="text-primary small d-flex align-items-center">
      <div class="spinner-border me-2"></div> Calculating...
    </div>
  `;

  setTimeout(() => {
    calcBtn.disabled = false;
    status.innerHTML = `
      <div class="alert alert-success py-1 px-2 small">Gross Salary Calculated!</div>
    `;

    // Perform calculation
    const data = calculateGrossSalary(basic);

    // Update UI
    document.getElementById("resBasic").textContent = formatInr(data.basic);
    document.getElementById("resHra").textContent = formatInr(data.hra);
    document.getElementById("resDa").textContent = formatInr(data.da);
    document.getElementById("resGross").textContent = formatInr(data.gross);

    result.style.display = "block";
  }, 500);
}

// Reset function
function resetForm() {
  document.getElementById("basic").value = "";
  document.getElementById("error").textContent = "";
  document.getElementById("status").innerHTML = "";
  document.getElementById("result").style.display = "none";
}
