# CSS 3D-transformation

## perspective-origin: center; по умолчанию

    perspective: …px;

- Сам объект нужно заключить ещё в один блок. Свойства perspective и perspective-origin нужно задавать родителю, в котором находится объект, а самому объекту нужно задать одно из следующих свойств
- Также можно указать свойство perspective и самому объекту

        transform: perspective(…px) rotate(30deg);

## translate3d

- Определяет перемещение по осям X, Y, Z

        transform: translate3d(…px, …px, …px);

## scale3d

- Трёхмерное масштабирование по осям X, Y, Z

        transform: scale3d( , , )

## rotate3d

- Вращает элемент относительно трёх осей

        transform: rotate3d( , , , …deg);

## matrix3d

- Задаёт трёхмерное преобразование как однородную матрицу размером 4х4 с 16 значениями в столбцах

        см. шпаргалку

## Множественные трансформации 3D:

    			transform: translate3d(…px, …px, …px) rotate3d( , , , …deg) ….;

## transform-style:

- Задаёт стиль трансформации. Это свойство нужно задавать родителю объекта, который трансформируется

        flat;		по умолчанию

  preserve3d; объект как бы проходит сквозь родителя

## backface-visibility: Определяет, будет ли видна пользователю обратная сторона элемента

    		visible;
    		hidden;
