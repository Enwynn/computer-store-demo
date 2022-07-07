// function customFilter(array, filterLogic) {
//
//     let result = []
//     for (const number of array) {
//
//         let conditionResult = filterLogic(number)
//
//         if (conditionResult == true) {
//             result.push(number)
//         }
//     }
//     return result
//
// }
//
// console.log(customFilter([2, 5, 3, 6],
//     function (number) {
//         return number > 4;
//     }));

function getStuff() {
    return new Promise(function(resolve, reject){
        let success = true;
        if (success == true) {
            resolve("It works!😂")
        }
        else {
            reject("Something went wrong 🤦‍")
        }
    })
}

getStuff().then(function (data){
    console.log(data)

}).catch(function (error){
    console.log(error)
})

