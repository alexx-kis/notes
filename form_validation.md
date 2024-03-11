# Валидация
Валидация - это проверка на корректность данных, введённых пользователем
* под корректностью понимается соответствие данных требованиям валидации
* корректные данные не обязательно должны быть правильными

# Валидаци формы
* атрибуты формы:
	- method - это способ отправки формы
		значения: post, get и другие
	- action  .здесь значение - это адрес сервера, куда нужно отпрвить данные
	- autocomplete="on/off" (автозаполнение формы)

* у каждого input обязательно должен быть заполнен атрибут name, по которым серверу будет проще обрабатывать дынные	
* атрибуты input:
	- required (обязательное поле)
	- minlength="{number}" (минимальная длина данных ввода)
	- maxlength="{number}" (максимальная длина данных ввода)


# PristineJS - очень простая библиотека, используемая для валидации форм
<a href="https://pristine.js.org/"></a>

* в модуле, который обеспечивает функциональность формы, создать новую валидацию:
		<!-- // user-form.js: -->
		const form = document.querySelector('.form');
		const pristine = new Pristine(form, {
			// настройки
		});

* на <u>форму</u> добавить обработчик события submit

		form.addEventListener('submit', (evt) => {
			evt.preventDefault();

			const isValid = prostine.validate();

			if (isValid) {
				console.log('можно отправлять');
			} else {
				console.log('форма не валидна');
			}
		})

* в функцию Pristine можно передать настройки