// // START GAME
// document.getElementById("start").onclick = function () {
//   document.getElementById("rolldice1").disabled = false;
//   document.getElementById("restart").disabled = false;
//   document.getElementById("start").disabled = true;
// };

// document.getElementById("restart").onclick = function () {
//   location.reload();
// };

// document.getElementById("rolldice1").onclick = function () {
//   let score = Number(document.getElementById("p1sc").innerText);
//   const dice = Math.floor(Math.random() * 6) + 1;

//   // switch(DF)
//   // {
//   //   case 1:document.getElementById("rolldice1")
//   // }

// //   document.getElementById("rolldice1").src=
// //    (dice == 6) {
// //     document.getElementById("rolldice1").disabled = true;
// //     document.getElementById("rolldice2").disabled = false;
// //   } else {
// //     score += dice;
// //     document.getElementById("p1sc").innerText = score;
// //   }
// // };


// document.getElementById("rolldice2").onclick = function () {
//   let score = Number(document.getElementById("p2sc").innerText);
//   const dice = Math.floor(Math.random() * 6) + 1;

//   if (dice == 6) {
//     document.getElementById("rolldice1").disabled = false;
//     document.getElementById("rolldice2").disabled = true;
//   } else {
//     score += dice;
//     document.getElementById("p2sc").innerText = score;
//   }
// }