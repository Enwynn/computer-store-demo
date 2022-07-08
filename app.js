 const drinksElement = document.getElementById("drinks");
const priceElement = document.getElementById("price")
const addElement = document.getElementById("add");
const cartElement = document.getElementById("cart");
const quantityElement = document.getElementById("quantity")
const payButtonElement = document.getElementById("pay")
const totalDueElement = document.getElementById("totalDue")


// Blank arrays are collection

let drinks = []
let cart = []
let totalDue = 0.0

// Fetch jason api to drinks
fetch("https://noroff-accelerate-drinks.herokuapp.com/drinks")
    .then(response => response.json())
    .then(data => drinks = data)
    .then(drinks => addDrinksToMenu(drinks))

const addDrinksToMenu = (drinks) => {
    drinks.forEach(x => addDrinkToMenu(x))
    priceElement.innerText = drinks[0].price;
}

const addDrinkToMenu = (drink) => {
    const drinkElement = document.createElement("option");
    drinkElement.value = drink.id;
    drinkElement.appendChild(document.createTextNode(drink.description));
    drinksElement.appendChild(drinkElement);
}

const handleDrinkMenuChange = e => {
    const selectedDrink = drinks[e.target.selectedIndex];
    priceElement.innerText = selectedDrink.price;
}
const handleAddDrink = () => {
    const selectedDrink = drinks[drinksElement.selectedIndex];
    const quantity = parseInt(quantityElement.value);
    const cartItem = document.createElement("li");
    const lineTotal = quantity * selectedDrink.price;

    cartItem.innerText = `${selectedDrink.description} ${selectedDrink.price} ${quantity} ${lineTotal.toFixed(2)}`
    cartElement.appendChild(cartItem);

    totalDue += lineTotal;
    totalDueElement.innerHTML = `Total Due: ${totalDue.toFixed(2)}`

}

const handlePay = () => {
    const totalPaid = prompt("Please enter the amount of money you wish to pay: ")
    const change = parseFloat(totalPaid) - totalDue;
    alert(`Total change due: ${change.toFixed(2)} ` );
}
// Eventlistener when something is for example clicked.

drinksElement.addEventListener("change", handleDrinkMenuChange);

addElement.addEventListener("click", handleAddDrink);

payButtonElement.addEventListener("click", handlePay);




