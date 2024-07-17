// ------------ Классы и объекты ------------ //

// класс - это шаблон для создания объектов
// объект, созданный по классу - это экземпляр(объект) этого класса

// у объекта могут быть свойства и методы
// class Car {
//   color;
//   fuel;
//   go() {
//     console.log('going');
//   }
//   stop() {
//     console.log('stopping');
//   }
// }

// методы похожи на обычные функции, только объявляются без ключевого слова function

// чтобы создать объект класса, используется ключевое слово new:

// const myCar = new Car;

// после создания объекта можно обращаться к его свойствам, обращение происходит через точку:
// myCar.color = 'red';
// myCar.fuel = 50;

// при этом можно добавлять новые свойства:
// myCar.mass = 3500;

// чтобы использовать команды объекта (методы), их нужно так же вызвать через точку, добавив круглые скобки

// myCar.go();
// myCar.stop();


// ------------ свойства объектов ------------ //

// свойства позволяют записывать в объект, а затем прочитывать из него некоторые данные
// class User {

// }
// const user = new User;

// user.name = 'john';
// user.surname = 'smith';

// console.log(user.name, user.surname); // john smith


// ------------ несколько объектов одного класса ------------ //

// можно создавать несколько объектов одного класса

// const user1 = new User;
// const user2 = new User;

// user1.name = 'john';
// user2.name = 'eric';

// ------------ методы классов  в ООП ------------ //

// в классах можно делать методы

// class User {
//   show() {
//     return '!';
//   }
// }

// const user = new User;
// console.log(user.show())

// ------------ параметры методов в ООП ------------ //

// методы могут принимать параметры

// class User {
//   show(name, surname) {
//     return name + ' ' + surname;
//   }
// }

// const user = new User;
// console.log(user.show('john', 'smith')); // john smith

// ------------ обращения к свойствам внутри классов ------------ //

// внутри методов класса this будет указывать на объект этого класса:

// class User {
//   show() {
//     console.log(this)
//   }
// }

// это значит, что можно обращаться к свойствам объекта через this:

// class User {
//   show() {
//     console.log(this.name);
//   }
// }

// const user = new User;

// user.name = 'john';
// user.show(); // john


// class Employee {
//   name;
//   salary;
//   showName() {
//     console.log(this.name);
//   }
//   showSalary() {
//     console.log(this.salary);
//   }
// }

// const employee = new Employee;
// employee.name = 'john';
// employee.salary = '1000';

// employee.showName();  // john
// employee.showSalary(); // 1000

// ------------ обращение к методам внутри классов ------------ //

// одни методы можно вызывать внутри других через this:

// class User {
//   show() {
//     return this.capitalize(this.name);
//   }
//   capitalize(str) {
//     return str[0].toUpperCase() + str.slice(1);
//   }
// }


// class Student {
//   capitalize(str) {
//     return str[0].toUpperCase();
//   }
//   showInitials() {
//     return this.capitalize(this.name) + this.capitalize(this.surname);
//   }
// }

// const student = new Student;
// student.name = 'alex';
// student.surname = 'kis';

// console.log(student.showInitials()) // AK

// ------------ объявление свойств внутри классов ------------ //
// в начале класса можно объявлять, какие свойства будут у него:

// class User {
//   name;
//   show() {
//     return this.name;
//   }
// }

// можно сразу же и присвоить в него какое-нибудь значение:

// class User {
//   name = 'john';
//   show() {
//     return this.name;
//   }
// }

// ------------ конструктор в ООП ------------ //

// существует специальный метод, который будет вызываться в момент создания нового объекта класса - constructor

// class User {
//   constructor() {
//     console.log('!')
//   }
// }

// new User; // ! - при создании объекта метод вызывается

// ------------ параметры в конструкторе ------------ //
// в конструктор можно передавать параметры:
// class User {
//   constructor(name, surname) {
//     console.log(name + ' ' + surname)
//   }
// }

// new User('john', 'smith'); // john smith

// ------------ свойства через параметры конструктора ------------ //
// переменные, переданные через параметры конструктора, можно записать в свойства объекта:

// class User {
//   constructor(name, surname) {
//     this.name = name;
//     this.surname = surname;
//   }
// }

// таким образом переданные значения станут доступны во всех методах класса

// class User {
//   constructor(name, surname) {
//     this.name = name;
//     this.surname = surname;
//   }
//   show() {
//     return this.name + ' ' + this.surname;
//   }
// }

// const user = new User('john', 'smith');

// console.log(user.show()); // john smith

// ------------ приватные свойства ------------ //
// свойства объекта, которые можно прочитывать и записывать извне, называются публичными
// приватные свойства доступны только внутри класса
// имена приватных свойств начинаются с символа #
// такие свойства нужно обязательно объявить в начале класса

// class User {
//   #name;
//   constructor(name) {
//     this.#name = name;
//   }
//   show() {
//     return this.#name;
//   }
// }

// const user = new User('john');

// попытка обратиться напрямую к приватному свойству приведёт к ошибке:
// console.log(user.#name) // SyntaxError

// вызов метода позволяет прочитать приватное свойство:
// console.log(user.show()) // john

// class Employee {
//   #name;
//   #salary;
//   #age;
//   constructor(name, salary, age) {
//     this.#name = name;
//     this.#salary = salary;
//     this.#age = age;
//   }
//   show() {
//     console.log(`${this.#name} ${this.#salary} ${this.#age}`);
//   }
// }

// const employee = new Employee('john', '1000', '29');
// employee.show();

// ------------ приватные методы ------------ //
// обычно приватными делают вспомогательные методы, чтобы они случайно не могли быть вызваны извне класса

// class User {
//   #name;
//   constructor(name) {
//     this.#name = name;
//   }
//   show() {
//     return this.#capitalize(this.#name);
//   }
//   #capitalize(str) {
//     return str[0].toUpperCase() + str.slice(1);
//   }
// }

// const user = new User('john');
// console.log(user.show()); // John



// Геттеры свойств в ООП

// пусть есть класс с приватными свойствами:

// class User {
//   #name;
//   #surname;

//   constructor(name, surname) {
//     this.#name = name;
//     this.#surname = surname;
//   }
// }

// эти свойства задаются один раз при создании объекта, но их невозможно прочитать, так как они приватные, и нет соответствующих методов для этого

// можно сделать свои методы, позволяющие прочитать эти свойства - геттеры - должны начинаться со слова get, а затем должно идти название читаемого свойства:

// class User {
//   #name;
//   #surname;

//   constructor(name, surname) {
//     this.#name = name;
//     this.#surname = surname;
//   }

//   getName() {
//     return this.#name;
//   }

//   getSurname() {
//     return this.#surname;
//   }
// }

// const user = new User('john', 'smith');

// console.log(user.getName()) //john
// console.log(user.getSurname()) //smith



// Сеттеры свойств в ООП

// для записи приватных свойств делают методы, которые называют сеттеры
// их имена следует называть со слова set

// class User {
//   #name;
//   #surname;

//   setName(name) {
//     this.#name = name;
//   }
//   setSurname(surname) {
//     this.#surname = surname;
//   }
// }

// const user = new User;

// user.setName('john');
// user.setSurname('smith');



// Преимущества сеттеров и геттеров

// перед обращением к свойству можно выполнять некоторые проверки
// например, можно проверить, что новое значение не является пустой строкой:

// class User {
//   #name;

//   setName(name) {
//     if (name.length > 0) {
//       this.#name = name;
//     } else {
//       throw new Error('name is empty');
//     }
//   }

//   getName() {
//     return this.#name;
//   }
// }

// const user = new User;
// user.setName('john');
// console.log(user.getName()); //john

// user.setName('') //Error: name is empty



// Цепочки методов в ООП

// можно сделать так, чтобы методы можно было вызывать друг за другом цепочкой
// для этого каждый такой метод должен возвращать this

// class User {
//   #name;
//   #surname;

//   setName(name) {
//     this.#name = name;
//     return this;
//   }
//   setSurname(surname) {
//     this.#surname = surname;
//     return this;
//   }

//   getName() {
//     return this.#name;
//   }
//   getSurname() {
//     return this.#surname;
//   }
// }

// const user = new User;
// user.setName('john').setSurname('smith');

// console.log(user.getName(), user.getSurname()); //john smith



// Сравнение объектов

// две переменные будут считаться равными, если они содержат ссылку на один и тот же объект

// class User {
//   constructor(name) {
//     this.name = name;
//   }
// }

// const user1 = new User('user1');
// const user2 = new User('user2');

// console.log(user1 === user1) //true
// console.log(user1 === user2) // false


// Оператор instanceof

// позволяет проверить, принадлежит ли объект определённому классу

// class User {

// }

// const user = new User;

// console.log(user instanceof User) //true



// Класс, как набор методов

// иногда классы используют для группировки методов схожей тематики
// в этом случае как правило создаётся только один объект этого класса и его методы используются много раз в различных ситуациях

// class ArrHelper {
//   getSum(arr) {
//     // сумма элементов
//     let result = 0;
//     for (let elem of arr) {
//       result += elem;
//     }
//     return result;
//   }
//   getAverage(arr) {
//     // среднее арифметическое
//     if (arr.length > 0) {
//       const sum = this.getSum(arr);
//       return sum / arr.length;
//     } else {
//       return 0;
//     }
//   }
// }

// const arrHelper = new ArrHelper;

// const array1 = [1, 2, 3, 4, 5];
// const array2 = [6, 7, 8, 9, 10];

// console.log(arrHelper.getSum(array1)); //15
// console.log(arrHelper.getAverage(array2)); //8



// class Validator {
//   isEmail(string) {
//     if ((/@.+\./).test(string)) {
//       return true;
//     } return false;
//   }
//   isNumber(string) {
//     if ((/^\d+$/).test(string)) {
//       return true;
//     } return false;
//   }
// }
// const validator = new Validator;

// console.log(validator.isEmail('alex@mail.ru'));
// console.log(validator.isNumber('2342341'));



// Объекты внутри классов

// в классах можно использовать объекты других классов

// class City {
//   constructor(name) {
//     this.name = name;
//   }
// }

// class User {
//   constructor(name, surname, city) {
//     this.name = name;
//     this.surname = surname;
//     this.city = city;
//   }
// }

// const city = new City('SPb');
// const user = new User('alex', 'kis', city);

// console.log(user.name) //alex
// console.log(user.city) // City{name: 'SPb'}
// console.log(user.city.name) //SPb



// Массивы объектов в ООП

// объекты классов можно хранить в массиве и выполнять с ними различные операции, как с элементами массива

// class User {
//   #name;
//   constructor(name) {
//     this.#name = name;
//   }
//   getName() {
//     return this.#name;
//   }
// }

// const users = [
//   new User('john'),
//   new User('eric'),
//   new User('kyle')
// ];

// for (let user of users) {
//   console.log(user) 
// }



// Манипуляция объектами в классах

// классы параметрами методов могут принимать объекты других классов и манипулировать этими объектами

// class User {
//   #name;
//   constructor(name) {
//     this.#name = name;
//   }
//   getName() {
//     return this.#name;
//   }
// }

// class UsersCollection {
//   #users;
//   constructor() {
//     this.#users = [];
//   }
//   add(user) {
//     this.#users.push(user);
//   }
//   show() {
//     this.#users.forEach(user => {
//       console.log(user.getName());
//     });
//   }
// }

// const usersCollection = new UsersCollection;

// usersCollection.add(new User('john'))
// usersCollection.add(new User('eric'))
// usersCollection.add(new User('kyle'))

// usersCollection.show(); // john eric kyle



// Встроенные классы

// в JS много встроенных классов, например Date

// const date = new Date;

// console.log(date)



// Встроенные классы DOM

// DOM элементы также представляют собой объекты встроенных классов

// {/* <p>text</p> */ }

// const paragraph = document.querySelector('p');

// console.dir(paragraph);

// можно определить, к какому классу принадлежит p
// для этого в списке свойств нужно найти свойство [[Prototype]] // HTMLParagraphElement



// Наследование классов в ООП

// один класс может наследовать от другого класса методы и свойства
// это нужно в том случае, когда два класса очень похожи
// например есть класс User и класс Student, у которых есть одинаковые методы и индивидуальные для каждого
// в этом случае удобно, если студент унаследует повторяющиеся методы у родителя

// class User {

// }

// class Student {

// }

// наследование методов и свойств делается с помощью ключевого слова extends:

// class Student extends User {

// }


// Наследование публичных методов

// класс-потомок наследует все публичные методы родителей

// class User {
//   setName(name) {
//     this.name = name;
//   }
//   getName() {
//     return this.name;
//   }
// }

// class Student extends User {

// }

// const student = new Student;
// student.setName('john');
// console.log(student.getName()); //john


// Методы потомка

// класс-потомок может иметь свои методы:

// class Student extends User {
//   setYear(year) {
//     this.year = year;
//   }
//   getYear() {
//     return this.year;
//   }
// }

// в классе-потомке будут доступны как его личные методы, так и унаследованные:

// const student = new Student;

// student.setName('john');
// student.setYear(1);

// console.log(student.getName(), student.getYear());



// Переопределение методов родителя в ООП

// класс-потомок может переопределить метод родителя, создав метод с таким же именем:

// class User {
//   setName(name) {
//     this.name = name;
//   }
//   getName() {
//     return this.name;
//   }
// }

// class Student extends User {
//   setName(name) {

//   }
// }

// как правило, переопределение методов родителя нужно для того, чтобы изменить или дополнить поведение этого метода:

// class Student extends User {
//   setName(name) {
//     if (name.length > 0) {
//       this.name = name;
//     } else {
//       throw new Error('invalid name');
//     }
//   }
// }

// const student = new Student

// student.setName('john')
// student.setName('') // Error



// Вызов переопределённого метода в ООП

// при переопределении метода потомок теряет доступ к этому методу родителя
// однако, получить доступ к нему всё-равно можно с помощью ключевого слова super, которое указывает на родительский класс

// class User {
//   setName(name) {
//     this.name = name;
//   }
//   getName() {
//     return this.name;
//   }
// }

// class Student extends User {
//   setName(name) {
//     if (name.length > 0) {
//       this.name = name;
//     } else {
//       throw new Error('student name error');
//     }
//   }
// }

// в переопределённом методе при выполнении условия фактически выполняется код родительского метода - дублирование кода
// можно от него избавиться, если вызвать метод родителя:

// class Student extends User {
//   setName(name) {
//     if (name.length > 0) {
//       super.setName(name); // метод родителя
//     } else {
//       throw new Error('invalid name');
//     }
//   }
// }


// class User {
//   setAge(age) {
//     if (age >= 0) {
//       this.age = age;
//     } else {
//       throw new Error('need age more 0');
//     }
//   }
// }
// class Employee {
//   setAge(age) {
//     if (age <= 120) {
//       super.setAge(age)
//     } else {
//       throw new Error('need age less 120');
//     }
//   }
// }



// Конструктор при наследовании в ООП

// при наследовании можно переопределять конструктор родителя:

// class User {
//   constructor(name, surname) {
//     this.name = name;
//     this.surname = surname;
//   }
//   getName() {
//     return this.name;
//   }
//   getSurname() {
//     return this.surname;
//   }
// }

// добавление в классе-потомке параметра
// в этом случае обязательно нужно первой строкой вызвать конструктор родителя через super

// class Student extends User {
//   constructor(name, surname, age) {
//     super(name, surname);
//     this.age = age;
//   }
//   getAge() {
//     return this.age;
//   }
// }

// $======================== Приватные методы при наследовании в ООП в JavaScript ========================$ //
// $======================== Приватные методы при наследовании в ООП в JavaScript ========================$ //
