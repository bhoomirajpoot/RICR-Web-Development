function Input(char) {
  if (char === "=") {
    const exp = document.getElementById("display").value;
    document.getElementById("display").value = eval(exp);
  } else if (char === "C") {
    document.getElementById("display").value = "";
  }
  else {
    let exp = document.getElementById("display").value;
    exp = exp + char;
    document.getElementById("display").value = exp;
  }
}