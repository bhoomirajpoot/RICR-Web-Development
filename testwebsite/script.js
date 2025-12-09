// Course Data
const courses = [
  { title: "Web Development", level: "Beginner", price: "₹1499" },
  { title: "Java Programming", level: "Intermediate", price: "₹1999" },
  { title: "Python Mastery", level: "Advanced", price: "₹2499" }
];

// Display Courses
const courseList = document.getElementById("courseList");
courses.forEach((course) => {
  const card = document.createElement("div");
  card.classList.add("course-card");

  card.innerHTML = `
    <h3>${course.title}</h3>
    <p><strong>Level:</strong> ${course.level}</p>
    <p><strong>Price:</strong> ${course.price}</p>
    <a href="enroll.html?course=${course.title}">Enroll</a>
  `;

  courseList.appendChild(card);
});

// CONTACT FORM VALIDATION
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = document.getElementById("cname").value.trim();
  let email = document.getElementById("cemail").value.trim();
  let message = document.getElementById("cmessage").value.trim();

  if (name === "") {
    alert("Name is required!");
    return;
  }

  if (!email.includes("@")) {
    alert("Enter a valid email!");
    return;
  }

  if (message.length < 10) {
    alert("Message must be at least 10 characters!");
    return;
  }

  alert(`Thank you for contacting us, ${name}!`);
  contactForm.reset();
});