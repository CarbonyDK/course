/*

    1. На основе массива **map** и массива **users** собрать
    новый массив объектов где в каждом объекте будут только
    те свойства которые перечислены в массиве **map**.

    На выходе мы должны получить массив вида:

    [ { _id: ..., name: ..., isActive: ..., balance: ... }, ... ];

*/

const map = ["_id", "name", "isActive", "balance"];
const users = [
    {
        "_id": "5d220b10e8265cc978e2586b",
        "isActive": true,
        "balance": 2853.33,
        "age": 20,
        "name": "Buckner Osborne",
        "gender": "male",
        "company": "EMPIRICA",
        "email": "bucknerosborne@empirica.com",
        "phone": "+1 (850) 411-2997",
        "registered": "2018-08-13T04:28:45 -03:00"
    },
    {
        "_id": "5d220b10144ef972f6c2b332",
        "isActive": true,
        "balance": 1464.63,
        "age": 38,
        "name": "Rosalie Smith",
        "gender": "female",
        "company": "KATAKANA",
        "email": "rosaliesmith@katakana.com",
        "phone": "+1 (943) 463-2496",
        "registered": "2016-12-09T05:15:34 -02:00"
    },
    {
        "_id": "5d220b1083a0494655cdecf6",
        "isActive": false,
        "balance": 2823.39,
        "age": 40,
        "name": "Estrada Davenport",
        "gender": "male",
        "company": "EBIDCO",
        "email": "estradadavenport@ebidco.com",
        "phone": "+1 (890) 461-2088",
        "registered": "2016-03-04T03:36:38 -02:00"
    }
];

const newUsers = users.map(
    (element) => map.reduce(
        (accumulator, value) => {
            accumulator[value] = element[value];
            return accumulator;
        }, {}
    )
);

console.log(newUsers);



/*

    2. Дан массив объектов, где каждый объект содержит информацию о букве
    и месте её положения в строке {буква: “a”, позиция_в_предложении: 1}:

    [{char:"a",index:12}, {char:"w",index:8}, {char:"Y",index:10}, {char:"p",index:3}, {char:"p",index:2},
    {char:"N",index:6}, {char:" ",index:5}, {char:"y",index:4}, {char:"r",index:13}, {char:"H",index:0},
    {char:"e",index:11}, {char:"a",index:1}, {char:" ",index:9}, {char:"!",index:14}, {char:"e",index:7}]

    Напишите функцию, которая из элементов массива соберет и вернёт строку,
    основываясь на index каждой буквы. Например:

    // [{char:"H",index:0}, {char:"i",index: 1}, {char:"!",index:2}] → "Hi!"

*/

const letterCodes = [{char:"a",index:12}, {char:"w",index:8}, {char:"Y",index:10}, {char:"p",index:3}, {char:"p",index:2},
                    {char:"N",index:6}, {char:" ",index:5}, {char:"y",index:4}, {char:"r",index:13}, {char:"H",index:0},
                    {char:"e",index:11}, {char:"a",index:1}, {char:" ",index:9}, {char:"!",index:14}, {char:"e",index:7}];

const stringFromCodes = letterCodes.sort((a, b) => a.index - b.index);

console.log(stringFromCodes); //Happy New Year!



/*

    3. Организовать функцию getInfo, которая принимает объект вида:

    { name: ..., info: { employees: [...], partners: [ … ] } }

    и выводит в консоль имя (если имени нет, показывать ‘Unknown’)
    и первые две компании из массива partners:

    // getInfo(organisation); → Name: Google Partners: Microsoft Facebook

*/

const organisation = {
    name: 'Google',
    info: {
        employees: ['Vlad', 'Olga'],
        partners: ['Microsoft', 'Facebook', 'Xing']
    }
};

function getInfo({name = `Unknown`, info: {partners}}) {
    console.log(`Name: ${name} \nPartners: ${ partners.slice(0, 2).join(' ') }`);
}

getInfo(organisation);



/*

    4. Дан объект.
    Сделать так что-бы при получении или изменении свойства name
    в свойствах lastGet и lastUpdate сохранялась дата последнего
    получения или последнего обновления соответсвенно.

*/

const person = {
    _name: 'Denis',
    age: 30,
    lastGet: '',
    lastUpdate: ''
};

Object.defineProperty(person, 'name', {
   get: function () {
       this.lastGet = new Date();
       return this._name;
   },
   set: function (value) {
       this.lastUpdate = new Date();
       this._name = value;
   }
});

console.log(person.name);



/*

    5. Дан объект.
    Сделать геттер который будет возвращать brand и model в виде
    строки "Apple iPhone 7" а также сделать сеттер в который будет
    передаваться строка например "Samsung S8 Gold" и в объекте в
    поле brand будет записано "Samsung" а в поле model будет записано "S8 Gold"

*/

const product = {
    brand: 'Apple',
    model: 'iPhone 7',
    price: '$300',
    get phoneName() {
        return `${this.brand} ${this.model}`;
    },
    set phoneName(value) {
        value = value.split(' ');
        this.brand = value.splice(0, 1).join();
        this.model = value.join(' ');
    }
};

product.phoneName = 'Samsung Galaxy S8';
console.log(product.brand, product.model);