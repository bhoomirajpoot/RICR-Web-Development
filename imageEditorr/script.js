function uploadImage() {
  const file = document.getElementById("Upload").files[0];
  const fileURL = URL.createObjectURL(file);

  const img = document.getElementById("image");
  img.src = fileURL;
  img.style.display = "block";

  document.getElementById("uploadLabel").style.display = "none";
}

function updateFilter() {
  const b = document.getElementById("Brightness").value;
  const c = document.getElementById("Contrast").value;
  const g = document.getElementById("Grayscale").value;
  const s = document.getElementById("Sepia").value;
  const sat = document.getElementById("Saturate").value;
  const h = document.getElementById("Hue").value;
  const bl = document.getElementById("Blur").value;
  const inv = document.getElementById("Invert").value;

  document.getElementById("image").style.filter =
    `brightness(${b * 2 / 100}) 
     contrast(${c * 2 / 100})
     grayscale(${g / 100})
     sepia(${s / 100})
     saturate(${sat / 100})
     hue-rotate(${h}deg)
     blur(${bl}px)
     invert(${inv / 100})`;
}


function resetFilters() {
  // Reset all sliders to default
  document.getElementById("Brightness").value = 50;
  document.getElementById("Contrast").value = 50;
  document.getElementById("Grayscale").value = 0;
  document.getElementById("Sepia").value = 0;
  document.getElementById("Saturate").value = 100;
  document.getElementById("Hue").value = 0;
  document.getElementById("Blur").value = 0;
  document.getElementById("Invert").value = 0;

  // Reset the filters on image
  document.getElementById("image").style.filter = "none";
}

function download()
{
  const image=document.getElementById("image");
  
}