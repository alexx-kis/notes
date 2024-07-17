# Перебирающие методы

## МЕТОД map

• Предназначен для преобразования массива

• Метод map принимает параметром функцию коллбэк, а затем возвращает изменённый массив

      let arr = [1, 2, 3, 4, 5];

      let result = arr.map(() => {

      });

• Если в коллбэке указать 1-й параметр (с любым именем), то в него автоматически будут попадать значения элементов массива

      let arr = [1, 2, 3, 4, 5];

      let result = arr.map((elem) => {
        console.log(elem);
      });

• Преобразованный массив запишется в переменную result

• В этом массиве будет такое же количество элементов, как и в исходном, но значения будут другими

• Для каждого элемента вместо исходного значения будет стоять то значение, которое вернул для него вызов коллбэка

      let arr = [1, 2, 3, 4, 5];

      let result = arr.map((elem) => {
        return elem \*\* 2;
      });

      console.log(result); // [1, 4, 9, 16, 25]

• Функция-коллбэк может также принимать 2-й параметр — ключ элемента массива

      let arr = [1, 2, 3, 4, 5];

      let result = arr.map(function(elem, index) {
        return elem \* index;
      });

или с помощью стрелочной функции

      let result = arr.map((elem, index) => elem \* index);

• Перебор многомерных массивов

      let arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

      let result = arr.map(function(elem) {
        return elem.map(function(num) {
          return num \*\* 2;
        })
      });

## МЕТОД forEach

• Работает так же, как и метод map, только не возвращает изменённый массив, а просто вызывает функцию-коллбэк для каждого элемента массива

      let arr = ['a', 'b', 'c', 'd', 'e'];

      arr.forEach(function(elem) {
        document.write(elem + '< br >')
      });

во второй параметр попадают ключи элементов

      arr.forEach(function(elem, index) {
        document.write(index + '. ' + elem + '< br >')
      });

## МЕТОД filter

• Позволяет отфильтровать элементы массива

• Параметром получает функцию-коллбэк, которая выполнится для каждого элемента массива

• Результатом filter возвращает новый массив, в который войдут только те элементы, для которых коллбэк вернёт true

      let arr = [1, 2, 3, 4, 5, 6];

      let result = arr.filter(function(elem){
        if (elem % 2 == 0){
          return true;
        } else {
          return false;
        }
      });

      console.log(result);

или

      let result2 = arr.filter(function(elem){
        return elem % 2 == 0;
      });

      console.log(result2);

или

      let result3 = arr.filter(elem => elem % 2 == 0);

      console.log(result3);

• Подсчёт количества чётных элементов

      let arr = [1, 2, 3, 4, 5, 6];

      let filtered = arr.filter(elem => elem % 2 == 0);
      console.log(filtered.length);

## МЕТОД every

• Проверяет элементы массива и возвращает true, если для всех элементов массива коллбэк вернул true, в противном случае метод возвращает false

      let arr = [2, 4, 6, 8];

      let result = arr.every(function (elem) {
        return elem % 2 == 0;
      });

      console.log(result);

## Метод some

• Проверяет элементы массива и возвращает true, если хотя бы для одного элемента коллбэк вернул true, в противном случае метод возвращает false

• проверка, что в массиве есть хотя бы одно чётное число:

      let arr = [1, 3, 5, 4, 7];

      let res = arr.some(function(elem) {
        return elem % 2 == 0;
      })

      console.log(res); // true
