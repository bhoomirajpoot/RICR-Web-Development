function calculateAge() {
    const birthDate = new Date(document.getElementById("birthDate").value);
    const currentDate = new Date(document.getElementById("currentDate").value);
    const result = document.getElementById("result");

    if (!birthDate.getTime() || !currentDate.getTime()) {
        result.innerText = "Please select both dates.";
        return;
    }

    if (birthDate > currentDate) {
        result.innerText = "Birth date cannot be after current date.";
        return;
    }

    let age = currentDate.getFullYear() - birthDate.getFullYear();
    let monthDifference = currentDate.getMonth() - birthDate.getMonth();

    // Adjust age if birthday hasn't occurred yet this year
    if (
        monthDifference < 0 ||
        (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    result.innerText = `Your age is ${age} years.`;
}