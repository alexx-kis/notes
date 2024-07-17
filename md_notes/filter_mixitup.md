# Создание фильтра mixitup #

HTML:
  * Создать блок с кнопками тэгом списка ul.блок__filter
  * Внутри создать элементы li.блок__filter-item
  * Внутри каждого элемента li.блок__filter-item создать кнопку button.блок__filter-button
  * У каждой кнопки должен быть атрибут type=“button” и атрибут data-filter=“.блок__list-item_название”
  * значение атрибута data-filter (название класса с модификатором) должно начинаться с точки!!!
  * У кнопки ALL (если такая есть) атрибут data-filter=“all”
  * У изначально нажатой кнопки должен быть ещё класс-модификатор .блок__filter-btn--active - ему нужно задать свойства, соответствующие активному(нажатому) состоянию кнопки
  * Создать список карточек (или других элементов) ul.блок__list
  * Внутри блока создать карточки тэгом li
  * У каждой карточки должны быть классы:
    - .mix 
    - .блок__list-item 
    - и модификатор .блок__list-item_название
    - ещё должен быть атрибут data-order=“num”, где num - номер карточки

  * В папку js скопировать файл mixitup.min.js

  * В скриптах подключить библиотеку mixitup (https://www.kunkalabs.com/mixitup/):
        
        <script src="js/mixitup.min.js"></script>
        

CSS:
  * в CSS у грида должно быть количество рядов 1fr auto (!!!) - чтобы блок уменьшался по высоте, если выбраны не все элементы


JS:

    const mixer = mixitup(".section__grid-list", {
      // параметры миксера
    });

https://codepen.io/alexx-kis/pen/dyrVmoe


* параметры миксера:
https://www.kunkalabs.com/mixitup/docs/configuration-object/