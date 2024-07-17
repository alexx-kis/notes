# Модальное окно с помощью тега \<dialog>

- модальное окно автоматически по центру window
- внутри создать inner
- у самого тега dialog есть padding, их нужно отключить в файле reset.scss
- указать отступы между window и dialog
  max-height: calc(100% - 20px);
  где 20px - это отступы
- по умолчанию окно скрыто (display: none;)
  html:

      	<dialog class="modal">
      		<div class="modal__inner">
      			<div class="content">
      				content text
      			</div>
      		</div>
      		<button class="close-btn">
      			close
      		</button>
      	</dialog>

- в обработчике клика на кнопку, открывающую модальное окно, нужно указать функцию showModal()
- в обработчике клика на кнопку, закрывающую модальное окно, нужно указать функцию close()
- окно закрывается по нажатию на ESC, для этого не нужно писать дополнительно скрипт

js:

      const button = document.querySelector('.button');
      const modal = document.querySelector('.modal');
      const closeBtn = modal.querySelector('.close-btn');

      button.addEventListener('click', () => {
      	modal.showModal();
      });

      closeBtn.addEventListener('click', () => {
      	modal.close();
      });

## Стилизация

### стилизация overlay

- как таковой overlay отсутствует, чтобы его стилизовать нужно использовать псевдоэлемент:

		.modal {
			&::backdrop {
				backdrop-filter: blur(2px);
			}
		}

- чтобы сделать закрытие модального окна по клику на overlay, нужно сделать закрытие по клику на само модальное окно и отключить этот эффект на его inner (сравнить с e.target)

- чтобы окно появлялось и исчезало плавно, нужно перезадать стили для всего:

					.modal {
						position: fixed;
						inset-block-start: 0;
						inset-block-end: 0;
						max-width: calc(100% - 6px - 20px);
						max-height: calc(100% - 6px - 20px);
						user-select: text;
						overflow: auto;
						display: block;
						box-shadow: 0 0 0 100vmax #00000038;
						opacity: 0;
						visibility: hidden;
						transition: all 300ms;

						&[open] {
							visibility: visible;
							opacity: 1;
						}
					}
