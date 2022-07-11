const api = "https://noroff-komputer-store-api.herokuapp.com/computers"
let result = []
let currentLaptop = 0;

const workBalance = document.getElementById("pay");
const bankBalance = document.getElementById("balance");
const loanBalance = document.getElementById("loan")
const laptops = document.getElementById("laptops");
const laptopTitle = document.getElementById("description");
const getLoanButton = document.getElementById("get-loan");
const bankButton = document.getElementById("bank");
const workButton = document.getElementById("work");
const repayLoanButton = document.getElementById("repay-loan")
const buyButton = document.getElementById("buy-now")
const laptopImage = document.getElementById("laptop-image");
const laptopPrice = document.getElementById("price-tag");
const loanDiv = document.getElementById("loan-div");
const laptopDesc = document.getElementById("lap-text")


// Initialize some values

init();

function init() {
    bankBalance.innerText = "0";
    workBalance.innerText = "0";
    loanBalance.innerText = "0";
}

// Get the data from the API

fetch(api)
    .then(r => r.json())
    .then(data => result = data)
    .then(result => addLaptops(result))

// Formats the starter laptops data to be used in the dropdown

function descFormater(result) {
    let desc = result[0].specs.toString()
    return desc.split(",").map(function (item) {
        return "* " + item + "\n"
    })
}

const addLaptops = (result) => {
    result.forEach(x => addLaptop(x));
    let desc = descFormater(result);
    laptopTitle.innerText = desc.join("")
    laptopImage.src = "https://noroff-komputer-store-api.herokuapp.com/" + result[0].image;
    currentLaptop = result[0].price
    laptopPrice.innerText = result[0].price + " kr";
    laptopDesc.innerText = result[0].description
}


const addLaptop = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptops.appendChild(laptopElement);
}

// Handles the dropdown

const handleLaptopDropDown = e => {
    const selectedLaptop = result[e.target.selectedIndex];
    currentLaptop = result[e.target.selectedIndex];
    laptopTitle.innerText = selectedLaptop.specs.toString().split(",").map(function (item) {
        return "* " + item + "\n"
    }).join("")
    currentLaptop = selectedLaptop.price;
    laptopImage.src = "https://noroff-komputer-store-api.herokuapp.com/" + selectedLaptop.image;
     laptopPrice.innerText = selectedLaptop.price + " kr";
     laptopDesc.innerText = selectedLaptop.description
}

/*
 Handles the loan button. Loan button is hidden if the user has no loan,
 If the input is not numeric the loan is not granted,
 If the user has no funds the loan is not granted,
 Also if the users funds is over 2 * funds or less than 0 then the loan is not granted.
*/

const handleLoanEvent = () => {
    const balance = bankBalance.innerText;
    const maxLoan = balance * 2;

    let amount = prompt("Please enter the amount to loan:")
    if (amount > maxLoan || isNaN(parseInt(amount))
        || parseInt(loanBalance.innerText) > 0 || amount < 0) {
        alert("Loan is not granted.")
    }
    else {
        repayLoanButton.hidden = false;
        bankBalance.innerText = parseInt(bankBalance.innerText) + parseInt(amount)
        loanBalance.innerText = parseInt(loanBalance.innerText) + parseInt(amount)
        loanDiv.hidden = false;
        alert("Loan granted")
    }
}

const handleWorkEvent = () => {
    workBalance.innerText = parseInt(workBalance.innerText) + 100;
}

// Handles the bankbutton. 10 % of the work balance is going to the loan if the user has a loan.

const handleBankEvent = () => {
    let amountToBank = parseInt(bankBalance.innerText) + parseInt(workBalance.innerText);
    let amountToLoan = 0;

    if (repayLoanButton.hidden === false) {
        amountToLoan = parseInt(workBalance.innerText) * 0.10
        loanBalance.innerText = parseInt(loanBalance.innerText) - amountToLoan
        console.log(loanBalance.innerText)
        if (loanBalance.innerText == 0) {
            repayLoanButton.hidden = true
            loanDiv.hidden = true
        }
        if (loanBalance.innerText < 0) {
            bankBalance.innerText = parseInt(amountToBank) - parseInt(Math.abs(loanBalance.innerText));
            loanBalance.innerText = 0;
            repayLoanButton.hidden = true
            loanDiv.hidden = true
            return
        }
    }
console.log("dont")
    workBalance.innerText = 0;
    bankBalance.innerText = parseInt(amountToBank) - parseInt(amountToLoan);

}

// Handles the repay button. Excess money is going to the bank.

const repayLoanEvent = () => {
    loanBalance.innerText = parseInt(loanBalance.innerText) - parseInt(workBalance.innerText);
    workBalance.innerText = 0;

    if (loanBalance.innerText < 0 ) {
        bankBalance.innerText = parseInt(bankBalance.innerText) + Math.abs(loanBalance.innerText);
        loanBalance.innerText = 0;
        repayLoanButton.hidden = true
        loanDiv.hidden = true
    }
    if (loanBalance.innerText == 0) {
        repayLoanButton.hidden = true
        loanDiv.hidden = true

    }
}

// Handles the buybutton.

const buyNowButton = () => {
    let currentBalance = bankBalance.innerText;

    if (currentBalance >= currentLaptop) {
        bankBalance.innerText = parseInt(bankBalance.innerText) - currentLaptop;

        alert("You are the owner of the laptop!")
    }
    else {
        alert("insufficient funds")
    }
}

// Event listeners

laptops.addEventListener("change", handleLaptopDropDown)

getLoanButton.addEventListener("click", handleLoanEvent )

workButton.addEventListener("click", handleWorkEvent )

bankButton.addEventListener("click", handleBankEvent )

repayLoanButton.addEventListener("click", repayLoanEvent)

buyButton.addEventListener("click", buyNowButton)













