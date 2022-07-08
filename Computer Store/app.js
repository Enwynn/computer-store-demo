
const api = "https://noroff-komputer-store-api.herokuapp.com/computers"
let result = []

    const price = document.getElementById("pay");
    const balance = document.getElementById("balance");
    const laptops = document.getElementById("laptops");
    const laptopDescription = document.getElementById("description");
    const getLoan = document.getElementById("get-loan");
    const bank = document.getElementById("bank");
    const work = document.getElementById("work");

init();

function init() {
    balance.innerText = "0";
    price.innerText = "0";
}

fetch(api)
    .then(r => r.json())
    .then(data => result = data)
    .then(result => addLaptops(result))
    console.log(result)


const addLaptops = (result) => {
    result.forEach(x => addLaptop(x));
    laptopDescription.innerText = result[0].specs
}

const addLaptop = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptops.appendChild(laptopElement);
}

const handleLaptopDropDown = e => {
    const selectedLaptop = result[e.target.selectedIndex];
    laptopDescription.innerText = selectedLaptop.specs;
}

const handleLoanEvent = e => {


}

const handleWorkEvent = e => {
    const price1 = parseInt(price.innerText);
    price.innerText = price1 + 100;
}

const handleBankEvent = e => {
    const balance1 = parseInt(balance.innerText) + parseInt(price.innerText);
    price.innerText = 0;
    balance.innerText = balance1;
}

laptops.addEventListener("change", handleLaptopDropDown)

getLoan.addEventListener("click", handleLoanEvent )

work.addEventListener("click", handleWorkEvent )

bank.addEventListener("click", handleBankEvent )

// Eventlisteners












