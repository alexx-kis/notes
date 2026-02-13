# Работа с объектом Date

• С помощью объекта Date можно осуществлять различные манипуляции с датами • Объект с датой создаётся так:

```js
new Date();
```

• Запишем объект в переменную

```js
let date = new Date();
```

• Теперь переменная date представляет собой объект, хранящий в себе текущий момент времени (сек, мин, час итд) • Используя этот объект с помощью специальных методов можно получить нужные характеристики времени (например текущий час, день или месяц) • Например, текущие значения можно получить так:

```js
console.log(date.getFullYear()); //не просто getYear, a FullYear
console.log(date.getMonth() + 1); //номер месяца начинается с 0!
console.log(date.getDate()); //не Day, a Date

console.log(date.getHours());
console.log(date.getMinutes());
console.log(date.getSeconds());
```

## Форматирование даты

• Формат даты в виде год-месяц-день

```js
let date = new Date();

let now = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

console.log(now);
```

• чтобы добавить нули к номерам месяца и дня, нужно создать вспомогательную функцию addZero

```js
function addZero(x) {
  if (x >= 0 && x <= 9) {
    return '0' + x;
  } else {
    return x;
  }
}
let date = new Date();
let now = addZero(date.getFullYear()) + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate());

console.log(now); //2023-04-09
```

• вывести текущую дату-время в формате 12:59:59 31.12.2014

```js
let date = new Date();
function addZero(x) {
  if (x >= 0 && x <= 9) {
    return '0' + x;
  } else {
    return x;
  }
}
let now = addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds()) + ' ' + addZero(date.getDate()) + '.' + addZero(date.getMonth() + 1) + '.' + date.getFullYear();

console.log(now);
```

## Изменения формата даты

```js
function addZero(x) {
  if (x >= 0 && x <= 9) {
    return '0' + x;
  } else {
    return x;
  }
}
let date = new Date();
let now = date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate());

let res = now.split('-').join('.');
console.log(res); //2023.04.09
```

## Получение дня недели

• метод getDay возвращает номер текущего дня недели, причём неделя начинается с воскресенья и имеет номер 0

```js
let date = new Date();
console.log(date.getDay());

if (date.getDay() == 0 || date.getDay() == 6) {
  console.log('выходной');
} else {
  console.log('будний');
}
```

• определить, сколько дней осталось до ближайшей субботы (сегодня воскресенье) let date = new Date(); (function getNumberOfDaysUntilSat(date) { let today = date.getDay(); console.log(6 - today); })(date)

## Вывод частей даты словом

```js
let date = new Date();
let day = date.getDay();
let weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
console.log(weekDays[day]); //sun

let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

let date = new Date();
let currentMonth = date.getMonth();

console.log(months[currentMonth]); //apr
```

## Установка времени в объекте Date

• При создании объекта Date() в случае пустых круглых скобок туда попадает текущий момент времени

• Можно передать объекту Date параметры в формате

```js
        new Date(год, месяц, день, часы, минуты, секунды, миллисекунды),
```

в этом случае в переменную date запишется не текущий момент времени, а тот, который указан в параметрах, при этом отсчёт месяцев начинается с нуля • Параметры можно опускать с конца, при этом отсутствующие параметры приравниваются к нулю, а для дней - единице, год и месяц опускать нельзя

```js
let date = new Date(2025, 10, 5, 12, 59, 59);
```

• Возможность задания момента времени можно использовать, чтобы узнать день недели определённой даты

```js
let date = new Date(2025, 10, 5);
let day = date.getDay();
let days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
console.log(days[day]); //wed
```

• узнать, какой был день недели в мой день рождения

```js
let date = new Date(1996, 1, 27);
let day = date.getDay();
let days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
console.log(days[day]); //tue
```

## Получение времени в формате timestamp

• Существует специальный формат timestamp, который показывает количество миллисекунд, прошедшее с 1 января 1970 года по текущий момент времени • Существует специальный метод getTime, с помощью которого можно получить время в формате timestamp • Текущий момент в таком формате:

```js
let date = new Date();
console.log(date.getTime());
```

• для заданного момента времени

```js
let date = new Date(2023, 3, 9, 17, 53, 53);
console.log(date.getTime()); //1681052033000
```

• timestamp, соответствующий дате 1 января 2025 года.

```js
let date = new Date(2025, 0, 25);
console.log(date.getTime()); //1737752400000
```

## Разность между датами в формате timestamp

• формат timestamp предназначен для нахождения разницы между датами • разница в миллисекундах между текущим и заданным моментами времени

```js
let now = new Date();
let date = new Date(2015, 11, 4, 23, 59, 59);

let diff = now.getTime() - date.getTime();
console.log(diff); //231789494596
```

• чаще разница нужна не в миллисекундах, а в днях или годах, для этого нужно перевести миллисекунды в нужное значение • чтобы перевести миллисекунды в секунды, нужно миллисекунды поделить на 1000, секунды в минуты - поделить на 60 итд

• разница между датами в минутах:

```js
console.log(diff / (1000 * 60)); //3863160.3566833334
```

• в часах

```js
console.log(diff / 1000 / 60 / 60); //64386.01948055555
```

## Разница между объектами с датой

• Даты, представленные в виде объекта Date, можно вычитать друг из друга, и результат их вычитания будет разница в миллисекундах

```js
let now = new Date();
let date = new Date(2015, 4, 25, 12, 59, 59);
let diff = now - date;
console.log(diff); //разница в миллисекундах
```

• количество миллисекунд между 1 сентября 2000 и 15 февраля 2010

```js
let date1 = new Date(2000, 8, 1);
let date2 = new Date(2010, 1, 15);
let diffms = date2 - date1;
let diffd = (date2 - date1) / 1000 / 60 / 60 / 24;
let diffm = (date2 - date1) / 1000 / 60 / 60 / 24 / 12;
let diffy = (date2 - date1) / 1000 / 60 / 60 / 24 / 365;
console.log(diffms); //298429200000
console.log(diffd); //3454.0416666666665
console.log(diffm); //287.83680555555554
console.log(diffy); //9.463127853881279
```

## Автоматическая корректировка дат

• если была введена некорректная дата (которой не существует), лишние дни прибавятся к следующему месяцу

```js
let date = new Date(2018, 0, 35); //35-ое января 2018
console.log(date); //Sun Feb 04 2018 00:00:00 GMT+0300 (Moscow Standard Time)
```

• можно указывать не только лишние дни, но и месяцы, 12-й месяц скорректируется в январь следующего года • если указать 0-й день, то получится последний день предыдущего месяца

```js
        let date = new Date(2018, 1, 0); указываем нулевой день
        console.log(date); получится 31 января
```

• если указывать отрицательные значения, то будут получаться дни/месяцы/и др в обратную сторону

```js
        let date = new Date(2018, 1, -1); указываем -1 день
        console.log(date); получится 30 января
```

• аналогично работает с часами, минутами и секундами

## Нахождение последнего дня месяца

• последний день месяца - это нулевой день следующего месяца

```js
let date = new Date(2020, 2, 0);
console.log(date.getDate());
```

• Оформить этот способ решения в виде функции, принимающей параметром месяц и год и возвращающая последний день этого месяца

```js
function getLastDay(year, month) {
  let date = new Date(year, month + 1, 0);
  console.log(date.getDate());
}

getLastDay(2020, 1); //29
```

## Определение високосного года

• чтобы определить високосный ли год, нужно узнать, сколько дней в феврале этого года

```js
let date = new Date(2020, 2, 0); //последний день февраля
console.log(date.getDate()); //29

if (date.getDate() == 29) {
  console.log('високосный');
} else {
  console.log('невисокосный');
}
```

• Функция, проверяющая високосный ли год

```js
function isLeap(year) {
  let date = new Date(year, 2, 0);
  if (date.getDate() == 29) {
    console.log('високосный');
  } else {
    console.log('невисокосный');
  }
}

isLeap(2020); //високосный
isLeap(2005); //невисокосный
```

## Проверка корректности даты

• Чтобы осуществить проверку даты на корректность, нужно узнать, проводилась ли автоматическая корректировка

```js
let year = 2025;
let month = 0;
let day = 32;

let date = new Date(year, month, day);

if (date.getFullYear() == year && date.getMonth() == month && date.getDate() == day) {
  console.log('correct');
} else {
  console.log('incorrect');
}
```

• Функция, которая проверяет корректность даты

```js
function checkDate(year, month, day) {
  let date = new Date(year, month, day);
  if (date.getFullYear() == year && date.getMonth() == month && date.getDate() == day) {
    console.log('correct');
  } else {
    console.log('incorrect');
  }
}

checkDate(2025, 0, 31); //correct
checkDate(2025, 0, 32); //incorrect
```

## День текущего года

• Чтобы получить день текущего года нужно создать объект с текущим моментом и объект, в котором год будет получен из текущего момента + необходимая дата

```js
let now = new Date();
let date = new Date(now.getFullYear(), 2, 8);
console.log(date); //Wed Mar 08 2023 00:00:00 GMT+0300 (Moscow Standard Time)
```

• Полученный момент времени можно использовать, чтобы определить день недели

```js
console.log(date.getDay()); //3
```

• Определить, какой день недели будет 31 декабря текущего года

```js
let weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
let now = new Date();
let date = new Date(now.getFullYear(), 11, 31);
console.log(weekDays[date.getDay()]); //sun
```

## День текущего месяца

• объект с датой, содержащий 25-е число текущего месяца текущего года:

```js
let now = new Date();
let date = new Date(now.getFullYear(), now.getMonth(), 25);

console.log(date); //Tue Apr 25 2023 00:00:00 GMT+0300 (Moscow Standard Time)
```

## День следующего или предыдущего года

• объект с датой, содержащий 21 января следующего года. Для этого прибавим к текущему году единицу:

```js
let now = new Date();
let date = new Date(now.getFullYear() + 1, 0, 21);
console.log(date); //Sun Jan 21 2024 00:00:00 GMT+0300 (Moscow Standard Time)
```

## День следующего или предыдущего месяца

• День недели первого числа предыдущего месяца

```js
let now = new Date();
let date = new Date(now.getFullYear(), now.getMonth() - 1, 1);
let weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
console.log(weekDays[date.getDay()]);
```

• если текущий месяц январь, то можно всё равно вычесть единицу, это просто будет последний месяц предыдущего года

• определить, какой был день недели месяц назад в такой же день месяца, как сегодня

```js
let now = new Date();
let date = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
let weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
console.log(weekDays[date.getDay()]); //fri
```

## Разность моментов

• Сколько дней между 1 января 2023 и 10 сентября 2023

```js
let date1 = new Date(2023, 0, 1);
let date2 = new Date(2023, 8, 10);
let diff = (date2 - date1) / 1000 / 60 / 60 / 24;
console.log(diff); //252
```

## Момент времени дня

• Объект с датой, содержащий полдень сегодняшнего дня

```js
let now = new Date();
let date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
console.log(date); //Mon Apr 10 2023 12:00:00 GMT+0300 (Moscow Standard Time)
```

• Сколько часов прошло между вчерашним полднем и текущим моментом времени

```js
let now = new Date();
let yesterdayNoon = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 12);
let diff = +((now - yesterdayNoon) / 1000 / 60 / 60).toFixed(2);
console.log(diff);
```

## Начало дня

```js
        let now = new Date();
        let startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        •	нули с конца можно опустить, но год, месяц и день нельзя, так как будет браться текущее значение, а день станет 1
```

• Определить, сколько часов прошло от начала дня до текущего момента

```js
let now = new Date();
let startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
let diff = (now - startOfToday) / 1000 / 60 / 60;
console.log(diff);
```

## Конец дня

```js
let now = new Date();
let date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 24);
```

или

```js
let date2 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
```

• Определить, сколько часов осталось до конца дня

```js
let now = new Date();
let endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 24);
let diff = (endOfToday - now) / 1000 / 60 / 60;
console.log(diff);
```

## Циклическая проверка

• Все первые числа месяцев текущего года, которые являются воскресеньем:

```js
let now = new Date();
let year = now.getFullYear();

for (let month = 0; month <= 11; month++) {
  let date = new Date(year, month, 1);
  if (date.getDay() == 0) {
    console.log(year, month, '1');
  }
} //2023 0 '1'; 2023 9 '1'
```

• Определить, сколько раз 1 января с 2000 года до текущего попадало на выходной день

```js
let now = new Date();
let num = 0;
for (let year = 2000; year <= now.getFullYear(); year++) {
  let date = new Date(year, 0, 1);
  if (date.getDay() == 0 || date.getDay() == 6) {
    num++;
  }
}
console.log(num);
```

## Строковые сравнения дат

• Пусть есть две даты в следующем текстовом формате

```js
let date1 = '2020-12-01';
let date2 = '2019-12-01';
```

• В таком случае можно выполнить сравнение этих дат и узнать, какая из них больше

```js
console.log(date1 > date2); //true
```

• Разделители в датах не имеют значения, главное, чтобы они были одинаковыми у обеих дат • Обязательно даты должны быть в формате год-месяц-день

• Сравнить даты и вывести большую из них

```js
let date1 = '2020-11-31';
let date2 = '2020-12-01';
if (date1 > date2) {
  console.log(date1);
} else {
  console.log(date2);
}
```

• Необязательно дата должна иметь номер года, она может состоять из месяца и дня

```js
let date1 = '12-01';
let date2 = '11-01';

console.log(date1 > date2);
```

• Сравнить даты и вывести большую из них

```js
let date1 = '09-21';
let date2 = '09-23';
if (date1 > date2) {
  console.log(date1);
} else {
  console.log(date2);
}
```

## Попадание даты в промежуток

• Определить, в какой промежуток попадает дата

```js
let date = '08-20';
if (date >= '01-01' && date <= '03-08') {
  console.log('first');
} else if (date >= '03-09' && date <= '06-17') {
  console.log('second');
} else if (date >= '06-18' && date <= '12-31') {
  console.log('third');
}
```

## Сравнение объектов с датами

• Можно сравнивать не только строки, но и объекты с датами

```js
let date1 = new Date(2020, 1, 1);
let date2 = new Date(2019, 1, 1);
console.log(date1 > date2); //true
```
