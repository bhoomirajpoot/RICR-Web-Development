let box = document.getElementById("second");

document.getElementById("bgColor").addEventListener("input", function () 
{
  box.style.backgroundColor = this.value;
});
document.getElementById("textColor").addEventListener("input", function () 
{
  box.style.color = this.value;
});
document.getElementById("borderColor").addEventListener("input", function () 
{
  box.style.borderColor = this.value;
});