# Селекторы

## Группировка селекторов

- Если нужно задать одно свойство к нескольким тегам, то они перечисляются через запятую:

        h2, h3, p{
              color: red;
        }

        .class1, .class2{
              color: red;
        }

## Селектор потомков

- Позволяет выбирать теги по их родителю, для этого нужно указать селектор родителя и через пробел селектор потомка:

        ul li {
          color: red;
        }

        .class tag {
              color: red;
        }

        .parent-class .child-class{
              color: red;
        }

        .block h2.header{
              color: red;
        }

- Селектор потомков может состоять из любого количества селекторов

## Дочерний селектор

- Чтобы выбрать непосредственного потомка селектора, нужно написать знак > :

        p > i {
            color: red:
        }

## Выбор элемента по нескольким классам

- Если есть элемент с двумя классами, то чтобы к нему обратиться, не затронув элементы, которые содержать каждый из этих классов по-отдельности, то классы перечисляются через точку без пробела:

        <p class="eee">
          абзац
        </p>
        <p class="zzz">
          абзац
        </p>
        <p class="eee zzz">
          абзац
        </p>

        .eee.zzz{
            color: blue;
        }

## Соседний селектор

- Чтобы обратиться к тэгу, который находится непосредственно после (не внутри) какого-то тэга, то используется знак “+”

        <h2>text</h2>
        <p>
          paragraph
        </p>

        h2 + p {
            color: red;
        }

## Родственный селектор

- Родственный селектор ~ позволяет выбрать все элементы, находящиеся после заданного элемента внутри одного родителя

        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li id="elem">5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
        </ul>

        #elem ~ li {
              color: red;
        }

## Универсальный селектор

- Универсальный селектор \* позволяет выбирать все элементы

        * {
          color: red;
        }

        div * {
          color: red;
        }

        div > * {
          color: red;
        }