/*

    1. Дан класс Planet.
    Создать наследника от Planet, который будет называться PlanetWithSatellite и будет
    принимать, кроме name, название спутника (satelliteName). Переопределите метод
    getName для PlanetWithSatellite так, чтобы он возвращал ту же самую строчку +
    дополнительный текст 'The satellite is' + satelliteName.

*/

function Planet(name) {
    this.name = name;
    this.getName = function () {
        return 'Planet name is ' + this.name;
    }
}

function PlanetWithSatellite(name, satellite) {
    Planet.call(this, name);
    this.satellite = satellite;

    const parentName = this.getName;
    this.getName = function () {
        return `${parentName.call(this)}. The satellite is ${this.satellite}.`
    }
}

PlanetWithSatellite.prototype = Object.create(Planet.prototype);
PlanetWithSatellite.prototype.constructor = PlanetWithSatellite;

const earth = new PlanetWithSatellite('earth', 'moon');
console.log(earth.getName()); // 'Planet name is earth. The satellite is moon’



/*

    2. Создайте класс “Здание” (пусть у него будет имя, количество этажей, метод
    “получить количество этажей” и метод “установить количество этажей”).

    Создайте наследников этого класса:
    классы “Жилой дом” и “Торговый центр”. Используйте функциональное наследование.

    У жилого дома появится свойство “количество квартир на этаже”, а метод
    “получить количество этажей” должен вернуть объект вида
    {этажи: 5, всегоКвартир: 5 * количествоКвартир}

    У торгового центра появится свойство “количество магазинов на этаже”,
    а метод “получить количество этажей” должен вернуть объект вида
    {этажи: 3, всегоМагазинов: 3 * количествоМагазинов}

    От каждого класса создать экземпляр (дом, торговый центр)

*/

class Building {
    constructor(name, floors) {
        this.name = name;
        this.floors = floors;
    }

    getFloors() {
        return this.floors;
    }

    setFloors(value) {
        this.floors = value;
    }
}

class House extends Building {
    constructor(name, floors, flatsOnFloor) {
        super(...arguments);
        this.flatsOnFloor = flatsOnFloor;
    }

    getFloors() {
        return {floors: super.getFloors(), allFlats: super.getFloors() * this.flatsOnFloor};
    }
}

class Mall extends Building {
    constructor(name, floors, shopsOnFloor) {
        super(...arguments);
        this.shopsOnFloor = shopsOnFloor;
    }

    getFloors() {
        return {floors: super.getFloors(), allShops: super.getFloors() * this.shopsOnFloor};
    }
}

const myHome = new House('Хущевка', 16, 4);
console.log(myHome.getFloors());

const DubaiMall = new Mall('Dubai Mall', 5, 200);
console.log(DubaiMall.getFloors());



/*

    3. Создать класс “Мебель” с базовыми свойствами “имя”, “цена” и методом
    “получить информацию” (метод должен вывести имя и цену). Метод должен быть
    объявлен с помощью прототипов (Func.prototype...).

    Создать два экземпляра класса “Мебель”: экземпляр “ОфиснаяМебель” и “Мебель для дома”.
    Придумайте им по одному свойству, которые будут характерны только для этих
    экземпляров (например, для офисной мебели - наличие компьютерного стола или шредера).
    Метод “получить информацию” должен учитывать и добавленное вами новое свойство.
    Задача на переопределение метода у экземпляров класса.

*/

function Furniture(name, price) {
    this.name = name;
    this.price = price;
}

Furniture.prototype.getInfo = function () {
    return {name: this.name, price: this.price};
}

function officeFurniture(name, price, computerTable) {
    Furniture.call(this, ...arguments);
    this.computerTable = computerTable;
}

officeFurniture.prototype = Object.create(Furniture.prototype);
officeFurniture.prototype.constructor = officeFurniture;

officeFurniture.prototype.getInfo = function () {
    const parentMethod = Furniture.prototype.getInfo;
    const furnitureObject = parentMethod.call(this);
    furnitureObject.computerTable = this.computerTable;
    return furnitureObject;
}



function houseFurniture(name, price, color) {
    Furniture.call(this, ...arguments);
    this.color = color;
}

houseFurniture.prototype = Object.create(Furniture.prototype);
houseFurniture.prototype.constructor = houseFurniture;

houseFurniture.prototype.getInfo = function () {
    const parentMethod = Furniture.prototype.getInfo;
    const furnitureObject = parentMethod.call(this);
    furnitureObject.color = this.color;
    return furnitureObject;
}

const officeTable = new officeFurniture('Table', 100, true);
console.log(officeTable.getInfo());

const homeSofa = new houseFurniture('Sofa', 100, 'red');
console.log(homeSofa.getInfo());



/*

    4. Создать класс “Пользователь” с базовыми свойствами “имя”, “дата регистрации” и
    методом “получить информацию” (метод должен вывести имя и дату регистрации).
    Метод должен быть объявлен с помощью прототипов (Func.prototype...)
    Создать два наследника класса “Пользователь”: класс “Админ” и класс “Гость”.

    У класса “Админ” должно быть дополнительное свойство “суперАдмин” (может быть
    true/false, должно быть скрытым). Свойства определяются в момент вызова конструктора.

    У класса “Гость” должно быть свойство “срокДействия” (validDate, например),
    содержащее дату (например, одну неделю от момента регистрации).

    У классов-наследников метод “получить информацию” должен так же содержать информацию
    о дополнительных свойствах (“суперАдмин” и “срокДействия”)

*/

function User(name, registerDate) {
    this.name = name;
    this.registerDate = registerDate;
}

User.prototype.getInfo = function () {
    return {name: this.name, registerDate: this.registerDate};
}

function Admin(name, registerDate, superAdmin) {
    User.call(this, ...arguments);
    this.superAdmin = superAdmin;
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;
Admin.prototype.getInfo = function () {
    const parentMethod = User.prototype.getInfo;
    const parentObject = parentMethod.call(this);
    parentObject.superAdmin = this.superAdmin;
    return parentObject;
}

function Guest(name, registerDate, validDate) {
    User.call(this, ...arguments);
    this.validDate = validDate;
}

Guest.prototype = Object.create(User.prototype);
Guest.prototype.constructor = Guest;
Guest.prototype.getInfo = function () {
    const parentMethod = User.prototype.getInfo;
    const parentObject = parentMethod.call(this);
    parentObject.validDate = this.validDate;
    return parentObject;
}

const admin = new Admin('Dima', new Date(), true);
console.log(admin.getInfo());

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const guest = new Guest('Max', new Date(), tomorrow);
console.log(guest.getInfo());