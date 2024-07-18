# Наследование классов в ООП

- один класс может наследовать от другого класса методы и свойства
- это нужно в том случае, когда два класса очень похожи
- например есть класс User и класс Student, у которых есть одинаковые методы и индивидуальные для каждого
- в этом случае удобно, если студент унаследует повторяющиеся методы у родителя

        class User {

        }

        class Student {

        }

- наследование методов и свойств делается с помощью ключевого слова extends:

        class Student extends User {

        }

## Наследование публичных методов

- класс-потомок наследует все публичные методы родителей

        class User {
          setName(name) {
            this.name = name;
          }
          getName() {
            return this.name;
          }
        }

        class Student extends User {

        }

        const student = new Student;
        student.setName('john');
        console.log(student.getName()); //john

## Методы потомка

- класс-потомок может иметь свои методы:

        class Student extends User {
          setYear(year) {
            this.year = year;
          }
          getYear() {
            return this.year;
          }
        }

- в классе-потомке будут доступны как его личные методы, так и унаследованные:

        const student = new Student;

        student.setName('john');
        student.setYear(1);

        console.log(student.getName(), student.getYear());

## Переопределение методов родителя в ООП

- класс-потомок может переопределить метод родителя, создав метод с таким же именем:

        class User {
          setName(name) {
            this.name = name;
          }
          getName() {
            return this.name;
          }
        }

        class Student extends User {
          setName(name) {

          }
        }

- как правило, переопределение методов родителя нужно для того, чтобы изменить или дополнить поведение этого метода:

        class Student extends User {
          setName(name) {
            if (name.length > 0) {
              this.name = name;
            } else {
              throw new Error('invalid name');
            }
          }
        }

        const student = new Student

        student.setName('john')
        student.setName('') // Error

## Вызов переопределённого метода в ООП

- при переопределении метода потомок теряет доступ к этому методу родителя
- однако, получить доступ к нему всё-равно можно с помощью ключевого слова super, которое указывает на родительский класс

        class User {
          setName(name) {
            this.name = name;
          }
          getName() {
            return this.name;
          }
        }

        class Student extends User {
          setName(name) {
            if (name.length > 0) {
              this.name = name;
            } else {
              throw new Error('student name error');
            }
          }
        }

- в переопределённом методе при выполнении условия фактически выполняется код родительского метода - дублирование кода
- можно от него избавиться, если вызвать метод родителя:

        class Student extends User {
          setName(name) {
            if (name.length > 0) {
              super.setName(name); // метод родителя
            } else {
              throw new Error('invalid name');
            }
          }
        }


        class User {
          setAge(age) {
            if (age >= 0) {
              this.age = age;
            } else {
              throw new Error('need age more 0');
            }
          }
        }
        class Employee {
          setAge(age) {
            if (age <= 120) {
              super.setAge(age)
            } else {
              throw new Error('need age less 120');
            }
          }
        }

## Конструктор при наследовании в ООП

- при наследовании можно переопределять конструктор родителя:

        class User {
          constructor(name, surname) {
            this.name = name;
            this.surname = surname;
          }
          getName() {
            return this.name;
          }
          getSurname() {
            return this.surname;
          }
        }

- добавление в классе-потомке параметра:
- в этом случае обязательно нужно первой строкой вызвать конструктор родителя через super

        class Student extends User {
          constructor(name, surname, age) {
            super(name, surname);
            this.age = age;
          }
          getAge() {
            return this.age;
          }
        }

## Приватные методы при наследовании в ООП

- приватные методы не наследуются, это сделано специально, чтобы не нарушать инкапсуляцию

        class User {
          setName(name) {
            this.name = name;
          }
          getName() {
            return this.#capeFirst(this.name);
          }
          #capeFirst(str) {
            return str[0].toUpperCase() + str.slice(1);
          }
        }

        class Student extends User {
          setSurname(surname) {
            this.surname = surname;
          }
          getSurname() {
            return this.#capeFirst(this.surname); // Error
          }
        }

## Приватные свойства при наследовании в ООП

- приватные свойства тоже не наследуются, но потомок может манипулировать ими через публичные методы родителя

        class User {
          #name;
          setName(name) {
            this.#name = name;
          }
          getName() {
            return this.#name;
          }
        }

        class Student extends User {

        }

        const student = new Student;

        student.setName('john');
        console.log(student.getName()) //john

- проблема приватных свойств при наследовании в ООП

- то, что приватные свойства не наследуются, может привести к проблеме
  пусть есть класс-родитель с приватным свойством:

        class User {
          #age;
          setAge(age) {
            this.#age = age;
          }
          getAge() {
            return this.#age;
          }
        }

- пусть в классе-потомке мы решили сделать метод, который будет увеличивать возраст на единицу:

        class Student extends User {
          incAge() {
            this.#age++; // Error
          }
        }

- ошибка исчезнет, если в классе-потомке объявить приватное свойство #age:

        class Student extends User {
          #age;
          incAge() {
            this.#age++; // Error
          }
        }

- проблема в том, что теперь два приватных свойства - одно в родителе и одно в потомке, и они работают полностью независимо
- это значит, что методы родителя будут изменять своё свойство, а методы потомка - свои
- решение - манипулировать приватными свойствами родителя через методы этого родителя:

        class Student extends User {
          incAge() {
            let age = this.getAge();
            age++;
            this.setAge(age);
          }
        }
