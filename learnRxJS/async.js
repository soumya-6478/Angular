
// function myDisplay(xyz){
//     console.log(xyz)
// }

// function myCalculator(num1, num2, myCallback) {
//     let sum = num1 + num2;
//     myCallback(sum);
//   }

//   myCalculator(5)



// setTimeout( function() {
//     myFunction('i love you')
// }, 3000)

// function myFunction(value){
//     console.log(value)
// }




setInterval(myFunction, 1000);

function myFunction(){
    let d = new Date();
    x= d.getHours() + ":" +
    d.getMinutes() + ":" +
    d.getSeconds();
    console.log(x)
}