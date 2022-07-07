// function declerationGreeting(message, object) {
//     message = "pie"
//     duck.img = "cer"
//     console.log("Hello" + message + duck.img)
// }
//
// let word = "Hello"
//
// let duck = {
//     img: "pi",
//     name: "pe"
// }
//
// declerationGreeting(word, duck)
//
// console.log(word)
// console.log(duck)

// function messageAppender(message) {
//     return function (message) {
//         console.log(message + messageAppender())
//     }
// }

// To bind something use person.getName."bind(person)"

let duck = {
    i:"a",
    b:"b"
}

for (const key in duck) {
    if (Object.hasOwnProperty.call(duck, key)) {
        const element = duck[key];
        console.log(key)
    }
}

let array = [1,6,2,7]

for (const number of array) {
    console.log(number)
}

let i = [2,3,66 ,77 ,33, 53]

array.forEach(ele)

