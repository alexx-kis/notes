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
