# Разработка presenter для отрисовки компонентов

- в папке scr создать папку presenter
- в папке presenter создать файл main-presenter.js
- в файл main-presenter.js импортировать функцию render, view-компоненты и необходимые данные:

        import { render } from '../render';
        import ComponentView from '../view/add-point-view';
        import { Data } from '../data';

- создать класс MainPresenter с экспортом по дефолту
- у него должны быть:

  - метод init(), внутри которого будут рендериться компоненты
  - constructor()

            export default class MainPresenter {

              constructor(...)

              init() {
                render(...)
              }

            }

- constructor принимает деструктурированный объект, переменные - контейнеры, куда будет рендериться компонент

        export default class MainPresenter {

          constructor({ mainContainer }) {
            this.mainContainer = mainContainer;
          }

          init() {
            render(new ComponentView(), this.mainContainer);
          }
        }

- чтобы отрисовать один компонент в другой компонент, нужно создать свойство в классе с именем компонента(элемента) (например, list) и присвоить ему экземпляр класса нужного компонента
- затем в init() отрендерить внутренний компонент (при этом у экземпляра нужно вызвать метод getElement(), который возвращает DOM-элемент, в который будет вставка):

        export default class MainPresenter {
          listElement = new ListView();

          constructor(...){
            ...
          }

          init() {
            render(new Item, this.listElement.getElement())
          }
        }

- в конструктор можно передавать несколько контейнеров, в которые будут вставляться компоненты:

        export default class MainPresenter {

          constructor({ tripEventsContainer, filtersContainer }) {
            this.tripEventsContainer = tripEventsContainer;
            this.filtersContainer = filtersContainer;
          }

          init() {
            render(new FiltersView(), this.filtersContainer);
            render(new SortView(), this.tripEventsContainer);
          }
        }

- в файл main.js импортировать класс MainPresenter
- создать переменные-элементы, в которые будут вставляться компоненты
- создать экземпляр презентера
- передать эти переменные, как значения свойств объекта, который передаётся в presenter
- инициализировать презентер

        import MainPresenter from './presenter/main-presenter';

        const tripEventsElement = document.querySelector('.trip-events');
        const filtersElement = document.querySelector('.trip-controls__filters');

        const mainPresenter = new MainPresenter({
          tripEventsContainer: tripEventsElement,
          filtersContainer: filtersElement
        });

        mainPresenter.init();
