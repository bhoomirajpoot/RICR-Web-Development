function On() {
  document.getElementById("bulb").style.backgroundColor = "Yellow";
}
function Off() {
  document.getElementById("bulb").style.backgroundColor = "white";
}
function b1() {
  document.getElementById("bulb").style.backgroundColor = "red";
}
function b2() {
  document.getElementById("bulb").style.backgroundColor = "green";
}
function b3() {
  document.getElementById("bulb").style.backgroundColor = "blue";
}
const userColor = document.getElementById("color");

userColor.addEventListener("change", () => changeBulbcolor(userColor.value));

function changeBulbcolor(color) {
  document.getElementById("bulb").style.backgroundColor = color;
}



function SB_control() {
  const btn = document.getElementById("SB_btn")
  if (btn.innerText === "On") {

    document.getElementById("SB_btn").innerText = "Off";
    document.getElementById("smartBulb").classList.add("On");
  }
  else {
    document.getElementById("SB_btn").innerText = "On";
    document.getElementById("smartBulb").classList.remove("On");
  }
}