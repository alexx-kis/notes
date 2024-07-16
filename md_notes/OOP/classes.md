# Классы и объекты

- класс - это шаблон для создания объектов
- объект, созданный по классу - это экземпляр(объект) этого класса

- у объекта могут быть свойства и методы:

        class Car {
          color;
          fuel;
          go() {
            console.log('going');
          }
          stop() {
            console.log('stopping');
          }
        }

- методы похожи на обычные функции, только объявляются без ключевого слова function

- чтобы создать объект класса, используется ключевое слово new:

        const myCar = new Car;

- после создания объекта можно обращаться к его свойствам, обращение происходит через точку:

        myCar.color = 'red';
        myCar.fuel = 50;

- при этом можно добавлять новые свойства:

        myCar.mass = 3500;

- чтобы использовать команды объекта (методы), их нужно так же вызвать через точку, добавив круглые скобки

        myCar.go();
        myCar.stop();

## свойства объектов

- свойства позволяют записывать в объект, а затем прочитывать из него некоторые данные

        class User {

        }
        const user = new User;

        user.name = 'john';
        user.surname = 'smith';

        console.log(user.name, user.surname); // john smith

## несколько объектов одного класса

- можно создавать несколько объектов одного класса

        const user1 = new User;
        const user2 = new User;

        user1.name = 'john';
        user2.name = 'eric';

## методы классов в ООП

- в классах можно делать методы

        class User {
        show() {
          return '!';
        }
        }

        const user = new User;
        console.log(user.show())

## параметры методов в ООП

- методы могут принимать параметры

        class User {
          show(name, surname) {
            return name + ' ' + surname;
          }
        }

        const user = new User;
        console.log(user.show('john', 'smith')); // john smith

## обращения к свойствам внутри классов

- внутри методов класса this будет указывать на объект этого класса:

        class User {
          show() {
            console.log(this)
          }
        }

- это значит, что можно обращаться к свойствам объекта через this:

        class User {
          show() {
            console.log(this.name);
          }
        }

        const user = new User;

        user.name = 'john';
        user.show(); // john

        class Employee {
          name;
          salary;
          showName() {
            console.log(this.name);
          }
          showSalary() {
            console.log(this.salary);
          }
        }

        const employee = new Employee;
        employee.name = 'john';
        employee.salary = '1000';

        employee.showName(); // john
        employee.showSalary(); // 1000

## обращение к методам внутри классов

- одни методы можно вызывать внутри других через this:

        class User {
          show() {
            return this.capitalize(this.name);
          }
          capitalize(str) {
            return str[0].toUpperCase() + str.slice(1);
          }
        }

        class Student {
          capitalize(str) {
            return str[0].toUpperCase();
          }
          showInitials() {
            return this.capitalize(this.name) + this.capitalize(this.surname);
          }
        }

        const student = new Student;
        student.name = 'alex';
        student.surname = 'kis';

        console.log(student.showInitials()) // AK

## объявление свойств внутри классов

- в начале класса можно объявлять, какие свойства будут у него:

        class User {
          name;
          show() {
            return this.name;
          }
        }

- можно сразу же и присвоить в него какое-нибудь значение:

        class User {
          name = 'john';
          show() {
            return this.name;
          }
        }

## конструктор в ООП

- существует специальный метод, который будет вызываться в момент создания нового объекта класса - constructor

        class User {
          constructor() {
            console.log('!')
          }
        }

        new User; // ! - при создании объекта метод вызывается

## параметры в конструкторе

- в конструктор можно передавать параметры:

        class User {
          constructor(name, surname) {
            console.log(name + ' ' + surname)
          }
        }

        new User('john', 'smith'); // john smith

## свойства через параметры конструктора

- переменные, переданные через параметры конструктора, можно записать в свойства объекта:

        class User {
          constructor(name, surname) {
            this.name = name;
            this.surname = surname;
          }
        }

* таким образом переданные значения станут доступны во всех методах класса

        class User {
          constructor(name, surname) {
            this.name = name;
            this.surname = surname;
          }
          show() {
            return this.name + ' ' + this.surname;
          }
        }

        const user = new User('john', 'smith');

        console.log(user.show()); // john smith

## приватные свойства

- свойства объекта, которые можно прочитывать и записывать извне, называются публичными
- приватные свойства доступны только внутри класса
- имена приватных свойств начинаются с символа #
- такие свойства нужно обязательно объявить в начале класса

        class User {
          #name;
          constructor(name) {
            this.#name = name;
          }
          show() {
            return this.#name;
          }
        }

        const user = new User('john');

* попытка обратиться напрямую к приватному свойству приведёт к ошибке:

        console.log(user.#name) // SyntaxError

* вызов метода позволяет прочитать приватное свойство:

        console.log(user.show()) // john

        class Employee {
          #name;
          #salary;
          #age;
          constructor(name, salary, age) {
            this.#name = name;
            this.#salary = salary;
            this.#age = age;
          }
          show() {
            console.log(`${this.#name} ${this.#salary} ${this.#age}`);
          }
        }

        const employee = new Employee('john', '1000', '29');
        employee.show();

## приватные методы

- обычно приватными делают вспомогательные методы, чтобы они случайно не могли быть вызваны извне класса

        class User {
          #name;
          constructor(name) {
            this.#name = name;
          }
          show() {
            return this.#capitalize(this.#name);
          }
          #capitalize(str) {
            return str[0].toUpperCase() + str.slice(1);
          }
        }

        const user = new User('john');
        console.log(user.show()); // John
