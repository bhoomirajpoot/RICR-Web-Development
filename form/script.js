function Submit() {
  const nm = document.getElementById("fullname").ariaValueMax.trim();
  const em = document.getElementById("email").ariaValueMax.trim();
  const ph = document.getElementById("contact").ariaValueMax.trim();
  const db = document.getElementById("dob").ariaValueMax.trim();

  //validation if(data is invalid)
  //alert()

  // if(/^[A-Za-z ]$/.test(nm)){
  //   console.log("true Input");
    
  // }
  // else{
  //   console.log("false input");
    
  // }
//validaton start
  if(!/^[A-Za-z]+&/.test(nm)){
    alert("Wrong Name");
    return;
  }
  if(!/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(co.in)&/.test(em))
  {
    alert("Wrong Email");
    return;
  }
//   if(!/^[A-z]+&/.test(nm)){
//     alert("Wrong Name");
// return;
//   }

if(!/^[6-9]\d(9)&/.test(pn)){
  alert("Wrong Number");
  return;
}

const currentdate=new Date();
console.log(currentdate);






  const data = {
    FullName: nm,
    Email: em,
    Phone: ph,
    DOB: db,

  };
  console.log(data);

}