function calculateTip() {
    let bill = parseFloat(document.getElementById("billAmount").value);
    let service = parseFloat(document.getElementById("serviceQuality").value);
    let people = parseInt(document.getElementById("people").value);

    if (bill <= 0 || isNaN(bill)) {
        document.getElementById("result").innerHTML = "Enter valid bill amount!";
        return;
    }

    if (people <= 0 || isNaN(people)) {
        document.getElementById("result").innerHTML = "Enter number of people!";
        return;
    }

    let tip = bill * service;
    let totalBill = bill + tip;
    let perPerson = totalBill / people;

    document.getElementById("result").innerHTML =
        `Total Tip: ₹${tip.toFixed(2)}<br>
         Total Bill: ₹${totalBill.toFixed(2)}<br>
         Each Person Pays: <b>₹${perPerson.toFixed(2)}</b>`;
}
