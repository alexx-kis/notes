## Разработка view компонента

- в папке src создать файл render.js с кодом:

        // перечисление позиций для вставки методом insertAdjacentElement
        const RenderPosition = {
          BEFOREBEGIN: 'beforebegin',
          AFTERBEGIN: 'afterbegin',
          BEFOREEND: 'beforeend',
          AFTEREND: 'afterend',
        };

        // функция для создания DOM-элемента
        function createElement(template) {
          const newElement = document.createElement('div');
          newElement.innerHTML = template;

          return newElement.firstElementChild;
        }
          
        // функция для вставки компонента в контейнер
        function render(component, container, place = RenderPosition.BEFOREEND) {
          container.insertAdjacentElement(place, component.getElement());
        }

        export {RenderPosition, createElement, render};

- в папке src создать папку view
- в папке view создать файл component-view.js (имя может быть любое, но заканчиваться на view)
- в файле компонента создать класс, который экспортируется по дефолту (то есть из этого файла экспортируется только он):

        export default class EditPointView {

        }

- у этого класса должно быть три метода:
  1. getTemplate() - возвращает разметку (шаблон) компонента
  2. getElement() - возвращает DOM-элемент, созданный из разметки
  3. removeElement() - удаляет DOM-элемент

            export default class ComponentView {
              getTemplate() {
                return createComponentTemplate();
              }

              getElement() {
                if (!this.element) {
                  this.element = createElement(this.getTemplate());
                }
                return this.element;
              }

              removeElement() {
                this.element = null;
              }
            }

- перед классом компонента создать функцию createComponentTemplate(), которая возвращает HTML-разметку компонента:

          const createEventTypeItemTemplate = (eventTypeItem) => /*html*/`
            <div class="component-class">component content</div>
          `;

- в эту функцию в разметку компонента можно вставлять вызовы других функций, которые возвращают разметки других компонентов:

        const createEventTypeItemTemplate = (eventTypeItem) => /*html*/`
            <div class="component-class">
              ${createAnotherComponentTemplate()}
            </div>
          `;

- в эти функции можно передавать различные данные параметрами, например:

        const createItemTemplate = (item) => /*html*/`
          <div class="item-class">
            ${item}
          </div>
        `;

        const createEventTypeListTemplate = () => /*html*/`
          <div class="list-class">
              ${ITEMS.map((item) => createEventTypeItemTemplate(item)).join('')}
          </div>
        `;

- такая функция вернёт столько элементов, сколько содержится в массиве ITEMS