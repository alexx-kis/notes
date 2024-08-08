# Метрики окна браузера

## Размеры окна

- Размеры окна, не включающие в себя полосу прокрутки:

        let w = document.documentElement.clientWidth;
        let h = document.documentElement.clientHeight;

* Размеры окна вместе с полосой прокрутки:

        let w = window.innerWidth;
        let h = window.innerHeight;

* Разница между этими типами свойств даёт размер полосы прокрутки:

        let w1 = document.documentElement.clientWidth;
        let w2 = window.innerWidth;
        console.log(w2-w1);

## Размеры окна с учётом полосы прокрутки

- Удобного способа, работающего во всех браузерах, нет, но есть работающие решения:

        let scrollHeight = Math.max(
          document.body.scrollHeight, document.documentElement.scrollHeight,
          document.body.offsetHeight, document.documentElement.offsetHeight,
          document.body.clientHeight, document.documentElement.clientHeight,
        )
        console.log(scrollHeight);

        let scrollWidth = Math.max(
          document.body.scrollWidth, document.documentElement.scrollWidth,
          document.body.offsetWidth, document.documentElement.offsetWidth,
          document.body.clientWidth, document.documentElement.clientWidth,
        )
        console.log(scrollWidth);

## Получение и изменение прокрутки окна

- Свойства window.pageXOffset и window.pageYOffset содержат то, насколько прокручено окно (только для чтения)

- Свойства document.documentElement.scrolllTop и document.documentElement.scrollLeft содержат то, насколько прокручено окно

- Эти свойства можно менять, прокручивая окно в произвольную позицию:

          document.documentElement.scrollTop = 200;

## Прокрутка окна в положение

- Метод .scrollTo прокручивает окно в заданное положение, первым параметром принимает положение по горизонтали, вторым - по вертикали:

        window.scrollTo(100, 200);

- Метод имеет альтернативный синтаксис, в котором параметром передаётся объект

- В ключе top этого объекта указывается положение по горизонтали, в ключе left - по вертикали, в ключе behavior - тип прокрутки (может быть 'auto' или 'smooth'):

        document.documentElement.scrollTo({
          top: 100,
          left: 100,
          behavior: 'smooth'
        });

## Прокрутка окна к элементу

- Метод .scrollIntoView прокручивает окно к заданному элементу

- Метод применяется к элементу, к которому следует прокрутить окно

- Параметром регулируется, где должен оказаться элемент - вверху окна (true) или внизу (false):

        elem.scrollIntoView(true);

- Можно также передать параметром объект с настройкой прокрутки:

        elem.scrollIntoView({
          behavior: 'smooth',
        });

- Объект с настройками имеет также настройки выравнивания страницы по отношению к элементу. Настройка block задает вертикальное выравнивание, а настройка inline - горизонтальное. Они могут принимать следующие значения: 'start', 'center', 'end', 'nearest'.

        elem.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'end',
        });

## Событие прокрутки

- С помощью события scroll можно поймать момент, когда пользователь прокручивает окно:

        window.addEventListener('scroll', function () {
          console.log(window.pageYOffset); //Текущая прокрутка от верха страницы
        });
