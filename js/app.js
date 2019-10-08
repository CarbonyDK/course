let string = 'some test string';


//TASK 1
let firstLetter = string[0].toUpperCase();
let secondLetter = string[string.length - 1].toUpperCase();
console.log(`First and last big letters: ${firstLetter} ${secondLetter}`);
console.log('First and last big letters: ' + firstLetter + ' ' + secondLetter);

//TASK 2
console.log(`The word "string" started from index: ${string.indexOf('string')}`);

//TASK 3
console.log(`The second "space" has index: ${string.lastIndexOf(' ')}`);
// -- or --
let secondSpaceIndex = string.indexOf(' ', string.indexOf(' ') + 1);
console.log(`The second "space" has index: ${secondSpaceIndex}`);

//TASK 4
let slicedString = string.slice(5, 9);
console.log(`Sliced string: ${slicedString}`);

//TASK 5
const roundedPI = Math.PI.toFixed(2);
console.log(`Rounded PI: ${roundedPI}`);

//TASK 6
console.log(`Max value: ${Math.max(15, 11, 16, 12, 51, 12, 13, 51)}`);
console.log(`Min value: ${Math.min(15, 11, 16, 12, 51, 12, 13, 51)}`);

//TASK 7
let randomRoundedNumber = Math.random().toFixed(2);
console.log(`Random rounded number: ${randomRoundedNumber}`);

//TASK 8
let xLimit = 6;
console.log(`Random value from 0 to ${xLimit}: ${Math.round(Math.random() * xLimit)}`);

//TASK 9
let result = (0.6 * 10  + 0.7 * 10) / 10;
// -- or --
result = Number((0.6 + 0.7).toFixed(2));
console.log(`0.6 + 0.7 = ${result}`);

//TASK 10
const phone = {
    product: 'iPhone'
};

phone.price = 1000;
phone.currency = 'dollar';

phone.details = {
  model: 'XR',
  color: 'red'
};

console.log(phone);
