const img = document.getElementById("image").src;

console.log(img);

if (img === "http://127.0.0.1:5500/imageeditor/index.html") {
  document.getElementById("image").style.display = "none";
}


function uploadImage() {
  const file = document.getElementById("Upload").files[0];
  const fileURL = URL.createObjectURL(file);

  document.getElementById("image").src = fileURL;
  document.getElementById("image").style.display = "block";
  document.getElementById("uploadLabel").style.display = "none";
}


function changeBrightness(){
    const value =  document.getElementById("Brightness").value;
    document.getElementById("image").style.filter=`brightness(${value*2/100})`
}


function changeContrast(){
    const value =  document.getElementById("Contrast").value;
    document.getElementById("image").style.filter=`contrast(${value*2/100})`
}

function changeGray() {
  const value = document.getElementById("Grayscale").value;
  document.getElementById("image").style.filter = `grayscale(${value/100})`;
}

function changeSepia() {
  const value = document.getElementById("Sepia").value;
  document.getElementById("image").style.filter = `sepia(${value / 100})`;
}
