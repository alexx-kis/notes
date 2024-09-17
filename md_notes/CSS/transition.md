# CSS переходы (CSS transition)

- CSS – переходы либо CSS – transitions могут применяться ко всем элементам и даже к псевдоэлементам
- Используются для оживления нашей верстки, что в свою очередь приводит к улучшению взаимодействия с пользователем, как правило путем приятной анимированной реакции на его действия
- Например – наведение и нажатие на кнопку
- Также свойства transition можно использовать для построения несложных сценариев анимации
- Фактически, CSS – переходы обеспечивают смену значений других свойств с определенной анимацией и сценарием
  -Всю эту магию можно описать универсальным CSS свойством transition, либо рядом следующих отдельных свойств:

## transition-duration: промежуток времени, в течение которого должен осуществляться переход

- 0s; по умолчанию
- 1s;
- 1000ms;

## transition-property: название CSS-свойств, к которым будет применен эффект перехода.

- Значение свойства может содержать как одно свойство, так и список свойств через запятую
- all; по умолчанию Переход будет применен ко всем свойствам поддерживающим анимацию

## transition-delay: задержка выполнения перехода.

- Позволяет сделать так, чтобы изменение свойства происходило не моментально, а с некоторой задержкой
  - 0s;
  - 1s;
  - 1000ms;

## transition-timing-function: стиль перехода, то есть некий сценарий, по которому будет осуществятся анимация

- ease; Переход начинается медленно, разгоняется быстро и замедляется в конце
- ease-in; Переход начинается медленно, а затем плавно ускоряется в конце
- ease-out; Переход начинается быстро и плавно замедляется в конце
- ease-in-out; Переход медленно начинается и медленно заканчивается
- linear; Переход происходит равномерно на протяжении всего времени, без колебаний в скорости
- steps(int,start/end); Временная функция позволяет разбить анимацию на чёткое количество шагов указанных в int.

Так же можно задать момент выполнения: Start – означает, что при начале анимации нужно сразу применить первое изменение.
End - означало бы, что изменения нужно применять не в начале, а в конце каждого шага

- cubic-bezier(x1,y1,x2,y2); Позволяет вручную установить значения (положительные и отрицательные) для кривой ускорения и создать свою собственную анимацию

## Короткая запись

transition: -property -duration -timing-function -delay;