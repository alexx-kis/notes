# Свойства grid-контейнера

## Grid Layout

 - модуль, использующийся для разделения страницы на колонки и строки, а в получившейся сетке размещать различные элементы

- Сетка grid представляет собой набор пересекающихся вертикальных и горизонтальных линий, делящих пространство grid-контейнера на области сетки, в которые могут быть помещены элементы

- Контейнер-сетка бывает двух видов: обычный display: grid (генерирует grid-контейнер уровня блока) и встроенный display: inline-grid (генерирует grid-контейнер уровня строки)

## Определение явной сетки

- Количество строк / колонок определяется с помощью свойств grid-template-rows и grid-template-columns

- fr - единица длины, которая позволяет создавать гибкие дорожки
- Не является единицей измерения в обычном её понимании, поэтому не может быть представлена или объединена с другими типами единиц в выражениях calc()
- Общий размер фиксированных строк или колонок вычитается из доступного пространства grid-контейнера
- Оставшееся пространство делится между строками и столбцами с гибкими размерами пропорционально их коэффициенту

        .grid{
          display: grid;
          grid-template-rows: 1fr 1fr;
          grid-template-columns: 1fr 1fr 1fr;
        }

или

        .grid{
          display: grid;
          grid-template: 1fr 1fr / 1fr 1fr 1fr;
        }

- Размеры в % вычисляются от ширины или высоты grid-контейнера

        .grid{
          display: grid;
          grid-template-rows: 80% 120%;
          grid-template-columns: 20% 30% 20%;
        }
или

        .grid{
          display: grid;
          grid-template: 80% 120% / 20% 30% 20%;
        }

- Функция minmax(min,max) определяет диапазон размеров, больше или равный min и меньше или равный max
- Если max < min, то max игнорируется, а minmax(min,max) обрабатывается как min
- Значения в fr можно устанавливать только как максимальное

        .grid{
          display: grid;
          grid-template-rows: minmax(100px,110%) minmax(50px,1fr);
          grid-template-columns: minmax(200px,300px) minmax(100px,200px) minmax(250px,150px);
        }
или

        .grid{
          display: grid;
          grid-template: minmax(100px,110%) minmax(50px,1fr) / minmax(200px,300px) minmax(100px,200px) minmax(250px,150px);
        }


- Значение auto ориентируется на содержимое элементов сетки одной дорожки
- Как минимум, рассматривается как минимальный размер элемента сетки, как определено min-width или min-height
- Как максимум, обрабатывается так же, как и max-content
- Может растягиваться за счёт свойств align-content и justify-content

        .grid{
          display: grid;
          grid-template-rows: auto 1fr;
          grid-template-columns: auto 1fr auto;
        }

или

        .grid{
          display: grid;
          grid-template: auto 1fr / auto 1fr auto;
        }

- Нотация repeat() представляет повторяющийся фрагмент списка дорожек, что позволяет записать в более компактной форме большое количество одинаковых по размерам колонок или строк

        .grid{
          display: grid;
          grid-template-rows: repeat(2,1fr);
          grid-template-columns: repeat(3,1fr);
        }

или

        .grid{
          display: grid;
          grid-template: repeat(2,1fr) / repeat(3,1fr);
        }

- Используя значение auto-fill, всегда получится хотя бы один столбец, даже если он по какой-то причине не помещается в grid-контейнер

        .grid{
          display: grid;
          grid-template-columns: repeat(auto-fill,minmax(150px, 1fr));
        }

или

        .grid{
          display: grid;
          grid-template: auto / repeat(auto-fill,minmax(150px, 1fr));
        }


- Если использовать auto-fit, то дорожки, которые не содержат элементы сетки, будут сброшены.

        .grid{
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(150px, 1fr));
        }

или

      .grid{
        display: grid;
        grid-template: auto / repeat(auto-fit,minmax(150px, 1fr));
      }


- Свойство grid-template-areas определяет именованные области сетки, которые не связаны с каким-либо конкретным элементом сетки, но на которые можно ссылаться из свойств размещения сетки
- Синтаксис свойства обеспечивает визуализацию структуры сетки, облегчая понимание общего макета grid-контейнера
- Свойство не наследуется

        .grid{
          display: grid;
          grid-template-columns: 150px 1fr;
          grid-template-areas: 'header header' 'sidebar content' 'block-1 block-2' 'footer footer';
        }

или

        .grid{
          display: grid;
          grid-template: auto / 150px 1fr;
          grid-template-areas: 'header header' 'sidebar content' 'block-1 block-2' 'footer footer';
        }

        .grid__item{
          background-color: #5e5373;
          border: 1px dashed #ece89d;
          padding: 10px;
          color: #fff;
          font-size: 20px;
          font-weight: 700;
        }
        .grid__item:nth-child(1){
          grid-area: header;
        }
        .grid__item:nth-child(2){
          grid-area: sidebar;
        }
        .grid__item:nth-child(3){
          grid-area: content;
        }
        .grid__item:nth-child(4){
          grid-area: block-1;
        }
        .grid__item:nth-child(5){
          grid-area: block-2;
        }
        .grid__item:nth-child(6){
          grid-area: footer;
        }

## Определение неявной сетки

- Если элемент сетки расположен в строке или столбце, размер которых не определён явно grid-template-rows или grid-template-columns, создаются неявные дорожки сетки для его хранения
- Это может произойти в случае, если строка или столбец оказались за пределами установленных размеров сетки
- Элементы сетки, которые не размещены явно, автоматически помещаются в незанятое пространство в grid-контейнере с помощью алгоритма автоматического размещения
- Свойство grid-auto-flow управляет автоматическим размещением элементов сетки без явного положения
- После заполнения явной сетки (или если явной сетки нет) автоматическое размещение также приведёт к генерации неявных дорожек сетки
- Свойство не наследуется

#### grid-auto-columns + grid-auto-flow

- По умолчанию эти автоматически добавляемые дорожки имеют минимальный необходимый размер
- Свойства grid-auto-rows и grid-auto-columns позволяют контролировать размер неявных дорожек сетки
- Если дано несколько размеров дорожек, шаблон повторяется по мере необходимости, чтобы найти размер неявных дорожек
- Первая неявная дорожка сетки после явной сетки получает первый заданный размер и так далее
- Свойства не наследуются

.grid{
  display: grid;
  grid-template: 1fr / repeat(3,200px);
  grid-auto-columns: 50px;
  grid-auto-flow:column;
}

#### grid-auto-rows

        .grid{
          display: grid;
          grid-template: 1fr / repeat(3,200px);
          grid-auto-rows: 100px;
        }

#### grid-auto-flow   row

- Алгоритм автоматического размещения размещает элементы, заполняя каждую строку по очереди слева-направо (для LTR-языков), добавляя новые строки по мере необходимости
- Значение по умолчанию

        .grid{
          display: grid;
          grid-template: 1fr / repeat(3,200px);
          grid-auto-flow: row;
        }

#### grid-auto-flow   column

- Алгоритм размещает элементы, заполняя каждый столбец по очереди сверху-вниз, добавляя новые столбцы по мере необходимости

        .grid{
          background-color: #eee;
          display: grid;
          grid-template: 1fr 1fr / repeat(3,200px);
          grid-auto-flow: column;
        }

#### grid-auto-flow   dense

- Алгоритм "плотной" укладки элементов
- При необходимости может менять порядок следования элементов, заполняя пустые места более крупными элементами

        .grid{
          display: grid;
          grid-template: 1fr 1fr / repeat(3,200px);
          grid-auto-flow: dense;
        }


## Выравнивание содержимого вдоль горизонтальной оси

        justify-items:  stretch;
                        start;
                        end;
                        center;

## Выравнивание содержимого вдоль вертикальной оси

        align-items:  stretch;
                      start;
                      end;
                      center;

## Выравнивание сетки вдоль горизонтальной оси

        justify-content:  start;
                          end;
                          center;
                          stretch;
                          space-around;
                          space-evenly;

## Выравнивание сетки вдоль вертикальной оси

        align-content:	start:
                        end;
                        center;
                        stretch;
                        space-around;
                        space-between;
                        space-evenly;