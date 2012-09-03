currency = {
    EURtoRUB: 40.7098,
    JPYtoRUB: 0.4134,
    RUBtoRUB: 1
}

/**
 * Создает экземпляр Машины
 * @this {Car}
 * @param {string} manufacturer Производитель
 * @param {string} model Модель
 * @param {number} year Год производство
 */
function Car(manufacturer, model, year) {
    this.manufacturer = manufacturer;
    this.model = model;
    this.year = year || new Date().getFullYear();
    this.price = 0;
    this.currency = 'RUB';
}

Car.prototype = {
    /**
     * Информация о машине
     * @return {String}
     */
    getInfo: function() {
        return [this.manufacturer, this.model, this.year].join(' ');
    },

    /**
     * Более детальная информация о машине
     * @return {String}
     */
    getDetailedInfo: function() {
        return ['Производитель: ' + this.manufacturer, 'Модель: ' + this.model, 'Год: ' + this.year].join('. ');
    },

    /**
     * Устанавливает цену на автомобиль
     * @param {Number} price
     */
    setPrice: function(price){
        this.price = price.substring(1) || 0;
        var currency = !!price.match(/[¥€]/ig) ? price.match(/[¥€]/ig)[0] : '';
        switch (currency) {
            case '€':
                this.currency = 'EUR';
                break;
            case '¥':
                this.currency = 'JPY';
                break;
            default:
                this.currency = 'RUB';
        }
        return this.price;
    },

    /**
     * Возвращает цену в рублях
     * @return {Number}
     */
    getPriceRUB: function(){
        return this.price * currency[this.currency + 'toRUB'];
    },

    /**
     * Возвращает страну по производителю
     * @return {String}
     */
    getCountry: function() {
        switch (this.manufacturer.toLowerCase()) {
            case 'bmw':
            case 'audi':
                return 'Germany';
            case 'toyota':
                return 'Japan';
        }
    },

    toString: function() {
        return this.getInfo();
    }
};

var bmw = new Car("BMW", "X5", 2010),
    audi = new Car("Audi", "Q5", 2012),
    toyota = new Car("Toyota", "Camry");

console.log('Car: ' + bmw); // Car: BMW X5 2010
console.log(bmw.getInfo()); // BMW X5 2010
console.log(bmw.getDetailedInfo()); // Производитель: BMW. Модель: X5. Год: 2010


/**
 * Создает экземпляр Автосалона
 * @this {CarDealer}
 * @param {string} name Название автосалона
 */
function CarDealer(name) {
    this.name = name;
    this.cars = [];
}

CarDealer.prototype = {
    /**
     * Добавляет машину в автосалон
     * @param {Car} одна или несколько машин
     */
    add: function(){
        var args = arguments;
        // пробегаемся по всем параметрам, переданным в функцию
        for (var i = 0, l = args.length; i<l; i++) {
            var valid = true;
            // проверим нет ли в массиве уже такого значения
            for (var j = 0, k = this.cars.length; j < k; j++) {
                if (j in this.cars && this.cars[j] === args[i]) {
                    valid = false;
                }
            }
            // если нет, проверим машина ли это
            if (valid && args[i] instanceof Car) {
                this.cars.push(args[i]);
            }
        }
        return this;
    },

    /**
     * Поиск машины по идентификатору
     * @param {String} id Идентификатор машины
     * @return {Car}
     */
    findCar: function(id){
        var cars = this.cars;
        for (var i = 0, l = cars.length; i<l; i++) {
            if (cars[i].getInfo() == id) {
                return cars[i];
            }
        }
        return false;
    },

    /**
     * Установить цену на машину
     * @param {string} car идентификатор машины
     * @param {string} price стоимость
     */
    setPrice: function(car, price){
        var car = this.findCar(car);
        if (car) {
            car.setPrice(price);
        }
        return this;
    },

    /**
     * Выводит список машин в автосалоне
     * @return {String}
     */
    list: function(){
        var result = [], cars = this.cars;
        for (var i = 0, l = cars.length; i<l; i++) {
            result.push(cars[i].getInfo() + ' (цена: ' + Math.floor(cars[i].getPriceRUB()) + ' руб.)');
        }
        return result.join(', ');
    },

    /**
     * Выводит список машин по стране
     * @param  {String} country
     * @return {String}
     */
    listByCountry: function(country){
        var result = [], cars = this.cars;
        for (var i = 0, l = cars.length; i<l; i++) {
            if (cars[i].getCountry() == country) {
                result.push(cars[i].getInfo());
            }
        }
        return result.join(', ');
    }
};

var yandex = new CarDealer('Яндекс.Авто');

yandex
    .add(toyota)
    .add(bmw, audi);

// идентификатор машины составляется следующим образом "производитель модель год"
// стоимость машины может быть задана в двух валютах: йена и евро.
yandex
    .setPrice('BMW X5 2010', '€2000')
    .setPrice('Audi Q5 2012', '€3000')
    .setPrice('Toyota Camry 2012', '¥3000');

console.log(yandex.list()); //BMW X5 2010, Audi Q5 2012, Toyota Camry 2012
console.log(yandex.listByCountry('Germany')); //BMW X5 2010, Audi Q5 2012

// @TODO: бонус! выводить список машин с ценой в рублях.