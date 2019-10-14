/*

    1. Дан объект **car**.
    Написать условие если поле **lastService** больше 5 месяцев
    (*из строки нужно достать число*) то нужно вывести в консоль
    сообщение 'Need Repair' и свойство **needRepair** в объекте
    **car** изменить на **true**; иначе изменить на **false**.

*/

let car = {
    name: 'Lexus',
    age: 10,
    lastService: '1 month',
    create: 2008,
    needRepair: false
};

function checkCarService(car) {
    if (parseInt(car.lastService) > 5) {
        console.log('Need Repair');
        return true;
    } else {
        return false;
    }
}

car.needRepair = checkCarService(car);



/*

    2. Дан следующий код.
    Написать условие **если цена товара больше или равна
    минимальной цене и меньше или равна максимальной цене**
    то вывести в консоль название этого товара, иначе
    вывести в консоль что товар не найден.

*/

let product = {
    name: 'Яблоко',
    price: '10$'
};

let min = 10; // минимальная цена
let max = 20; // максимальная цена

function findProduct(item) {
    if (parseFloat(item.price) >= min && parseFloat(item.price) <= max) {
        console.log(item.name);
    } else {
        console.log('Товар не найден.');
    }
}

findProduct(product);



/*

    3. На основе строки
    Cделать новую строку, где каждое слово начинается
    с большой буквы, а пробелы удалены. Использовать цикл **for.**

*/

let str = 'JavaScript is a pretty good language';

let str2;

function makeNewStr(str) {
    let arrStr = str.split(' ');
    for (let i = 0; i < arrStr.length; i++) {
        arrStr[i] = arrStr[i][0].toUpperCase() + arrStr[i].slice(1);
    }
    return arrStr.join('');
}

str2 = makeNewStr(str);
console.log(str2);



/*

    4. Создать функцию, которая принимает массив, а возвращает
    новый массив с дублированными элементами входного массива:

    *doubleArray([1,2,3]) // [1,2,3,1,2,3]*

*/

function doubleArray(arr) {
    let newArr = [];

    for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i]);
    }

    for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i]);
    }

    return newArr;
}

console.log(doubleArray([1,2,3]));



/*

    5. Создать функцию, которая принимает произвольное (любое)
    число массивов и удаляет из каждого массива первый элемент,
    а возвращает массив из оставшихся значений:

    *changeCollection([1,2,3], [‘a’, ’b’, ‘c’]) → [ [2,3], [‘b’, ‘c’] ],*
    *changeCollection([1,2,3]) → [ [2,3] ]* и т.д*.*

*/

function changeCollection() {
    let result = [];

    for (let i = 0; i < arguments.length; i++) {
        arguments[i].shift();
        result.push(arguments[i]);
    }

    return result;
}

console.log(changeCollection([1,2,3], ['a', 'b', 'c']));



/*

    6. Дан массив пользователей.
    Создать функцию которая принимает массив пользователей,
    поле которое по которому хочу фильтровать, значение на
    которое хочу фильтровать. Возвращать новый массив с
    пользователями соответсвующие указанным параметрам.
    Пример результата:

    funcGetUsers(users, "gender", "male"); // [ {name: “Denis”, age: “29”, gender: “male”} , {name: “Ivan”, age: “20”, gender: “male”} ]

*/

const users = [
    {
        "_id": "5d1c3860aa841704d3245513",
        "isActive": false,
        "balance": 2764.35,
        "age": 33,
        "name": "Allie Blair",
        "gender": "female",
        "company": "PHOTOBIN",
        "email": "allieblair@photobin.com",
        "phone": "+1 (951) 566-2987",
        "registered": "2018-11-30T02:29:00 -02:00"
    },
    {
        "_id": "5d1c386095ffb689687f2db9",
        "isActive": false,
        "balance": 3276.25,
        "age": 22,
        "name": "Yesenia Leblanc",
        "gender": "female",
        "company": "SKINSERVE",
        "email": "yesenialeblanc@skinserve.com",
        "phone": "+1 (947) 446-2840",
        "registered": "2015-10-31T01:10:31 -02:00"
    },
    {
        "_id": "5d1c3860e73ff2a338722e81",
        "isActive": true,
        "balance": 1868.65,
        "age": 38,
        "name": "Mamie Kramer",
        "gender": "female",
        "company": "EARBANG",
        "email": "mamiekramer@earbang.com",
        "phone": "+1 (885) 564-3305",
        "registered": "2014-06-03T09:36:40 -03:00"
    },
    {
        "_id": "5d1c386000e4f2fc62be1b1e",
        "isActive": true,
        "balance": 1003.15,
        "age": 32,
        "name": "Crawford Bryant",
        "gender": "male",
        "company": "DIGIRANG",
        "email": "crawfordbryant@digirang.com",
        "phone": "+1 (889) 408-2141",
        "registered": "2015-01-15T05:20:21 -02:00"
    },
    {
        "_id": "5d1c386008ff236a315d638b",
        "isActive": false,
        "balance": 3045.41,
        "age": 36,
        "name": "Helene Holland",
        "gender": "female",
        "company": "HYDROCOM",
        "email": "heleneholland@hydrocom.com",
        "phone": "+1 (937) 554-2040",
        "registered": "2014-09-15T08:22:59 -03:00"
    },
    {
        "_id": "5d1c3860b4c27c4d5fdb6c1f",
        "isActive": true,
        "balance": 1693.51,
        "age": 23,
        "name": "Hernandez Osborn",
        "gender": "male",
        "company": "TERRASYS",
        "email": "hernandezosborn@terrasys.com",
        "phone": "+1 (965) 595-3942",
        "registered": "2016-08-06T12:19:01 -03:00"
    }
];

function funcGetUsers(usersArr, key, value) {
    let result = [];

    for (let element of usersArr) {
        if (element[key] === value) {
            result.push({
                name: element.name,
                age: element.age,
                [key]: value
            });
        }
    }

    return result;
}

console.log(funcGetUsers(users, 'gender', 'male'));



/*

    7. Проверить как изменится объект obj и найти объяснение.

    ОБЪЯСНЕНИЕ:

    Мы передаем ссылку на объект obj в аргументе x функции, затем через ссылку добавляем поле b в объект obj.
    Действием x = null мы переопределяем саму переменную-аргумент функции, и теперь она содержит не ссылку на
    объект, а значение null. Сам объект obj остался нетронутым.

*/

const obj = {};

(function(x) {
    x.b = 1;
    x = null;
})(obj);

console.log(obj);



/*

    8. Создать объект, у которого будет цена товара и его скидка,
    а также два метода: для получения цены и для расчета цены с учетом скидки.

*/

const price = {
    price: 10,
    discount: '15%',
    getPrice() {
        return this.price;
    },
    getPriceWithDiscount() {
        return (100 - parseFloat(this.discount)) * this.price / 100;
    }
};

console.log(price.getPrice()); // 10
console.log(price.getPriceWithDiscount()); // 8.5



/*

    9. Даны объект и функция.
    Не изменяя функцию или объект, получить результат функции
    *getSquare* для объекта sizes

*/

let sizes = { width: 5, height: 10 },
    getSquare = function () { return this.width * this.height };

console.log(getSquare.call(sizes));