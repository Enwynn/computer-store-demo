
const api = "https://noroff-komputer-store-api.herokuapp.com/computers"
let result = []
let loanBool = false;
let currentLaptop = 0;

    const workBalance = document.getElementById("pay");
    const bankBalance = document.getElementById("balance");
    const loanBalance = document.getElementById("loan")
    const laptops = document.getElementById("laptops");
    const laptopDescription = document.getElementById("description");
    const getLoanButton = document.getElementById("get-loan");
    const bankButton = document.getElementById("bank");
    const workButton = document.getElementById("work");
    const repayLoanButton = document.getElementById("repay-loan")
    const buyButton = document.getElementById("buy-now")


init();

function init() {
    bankBalance.innerText = "0";
    workBalance.innerText = "0";
    loanBalance.innerText = "0";
}

fetch(api)
    .then(r => r.json())
    .then(data => result = data)
    .then(result => addLaptops(result))



const addLaptops = (result) => {
    result.forEach(x => addLaptop(x));
    laptopDescription.innerText = result[0].specs
    currentLaptop = result[0].price
    console.log(currentLaptop)
}

const addLaptop = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptops.appendChild(laptopElement);
}

const handleLaptopDropDown = e => {
    const selectedLaptop = result[e.target.selectedIndex];
    currentLaptop = result[e.target.selectedIndex];
    laptopDescription.innerText = selectedLaptop.specs;
}

const handleLoanEvent = e => {
    const balance = bankBalance.innerText;
    const maxLoan = balance * 2;

    let amount = prompt("Please enter the amount to loan:")
    if (amount > maxLoan) {
        alert("Loan is not granted.")
    }
    else {
        repayLoanButton.hidden = false;
        loanBool = true;
        bankBalance.innerText = parseInt(bankBalance.innerText) + parseInt(amount)
        loanBalance.innerText = parseInt(loanBalance.innerText) + parseInt(amount)
        alert("Loan granted")
    }
}

const handleWorkEvent = e => {

    const price1 = parseInt(workBalance.innerText);
    workBalance.innerText = price1 + 100;
}

const handleBankEvent = e => {
    let amountToBank = parseInt(bankBalance.innerText) + parseInt(workBalance.innerText);
    let amountToLoan = 0;

    if (repayLoanButton.hidden === false) {
        amountToLoan = parseInt(workBalance.innerText) * 0.10
        loanBalance.innerText = parseInt(loanBalance.innerText) - amountToLoan
        if (loanBalance.innerText == 0) {
            repayLoanButton.hidden = true
        }
    }

    workBalance.innerText = 0;
    bankBalance.innerText = parseInt(amountToBank) - parseInt(amountToLoan);

}

const repayLoanEvent = e => {
    loanBalance.innerText = parseInt(loanBalance.innerText) - parseInt(workBalance.innerText);

    if (loanBalance.innerText < 0 ) {
       console.log(Math.abs(loanBalance.innerText));
        workBalance.innerText = Math.abs(loanBalance.innerText);
        loanBalance.innerText = 0;
        repayLoanButton.hidden = true
    }
    if (loanBalance.innerText == 0) {
        repayLoanButton.hidden = true
    }
}

const buyNowButton = e => {
    let currentBalance = bankBalance.innerText;

    if (currentBalance >= currentLaptop) {
        bankBalance.innerText = parseInt(bankBalance.innerText) - currentLaptop;
        alert("You are the owner of the laptop!")
    }
    else {
        alert("Not sufficient funds.")
    }
}

laptops.addEventListener("change", handleLaptopDropDown)

getLoanButton.addEventListener("click", handleLoanEvent )

workButton.addEventListener("click", handleWorkEvent )

bankButton.addEventListener("click", handleBankEvent )

repayLoanButton.addEventListener("click", repayLoanEvent)

buyButton.addEventListener("click", buyNowButton)
// Eventlisteners












