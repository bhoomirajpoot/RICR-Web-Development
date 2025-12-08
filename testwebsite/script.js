// Course Data
const courses = [
{ title: "Web Development", level: "Beginner", price: "₹499" },
{ title: "Python Programming", level: "Intermediate", price: "₹599" },
{ title: "Java Full Course", level: "Beginner", price: "₹699" }
];


// Display Courses
const container = document.getElementById("courseContainer");
courses.forEach(c => {
const card = document.createElement("div");
card.className = "course-card";


card.innerHTML = `
<h3>${c.title}</h3>
<p>Level: ${c.level}</p>
<p>Price: ${c.price}</p>
<a href="enroll.html?course=${c.title}">Enroll</a>
`;


container.appendChild(card);
});


// Contact Form Validation
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", function(e) {
e.preventDefault();


let name = document.getElementById("cname").value.trim();
let email = document.getElementById("cemail").value.trim();
let msg = document.getElementById("cmsg").value.trim();


if (!email.includes("@")) {
alert("Invalid Email!");
return;
}
if (msg.length < 10) {
alert("Message must be at least 10 characters!");
return;
}


alert(`Thank you for contacting us, ${name}!`);
contactForm.reset();
});