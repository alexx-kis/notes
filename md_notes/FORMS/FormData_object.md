# Глобальный объект FormData #

* объекты FormData позволяют легко конструировать наборы пар ключ-значение, представляющие поля формы и их значения, которые в дальнейшем можно отправить на сервер
* FormData использует такой же формат на выходе, как если бы мы отправляли обыкновенную форму с encoding установленным в "multipart/form-data"

## Конструктор ##

* экземпляр объекта создаётся с помощью конструктора

		const formData = new FormData(form);

* form - это HTML элемент, содержащий форму

## Методы ##

* .append() - добавление новое текстовое поле в форму

		formData.append(name, value, filename);

* .delete() - удаление элемент формы

		formData.delete(name);

* .get() - получение значения элемента формы

		formData.get(name);

* .getAll() - получение массива всех значений, связанных в ключом в объекте FormData

		formData.getAll(name);

* .has() - проверка на наличие определённого элемента формы

		formData.has(name);

* .set() - изменение существующего элемента формы

		formData.set(name, value, filename);

* .keys() - возвращает ключи

		formData.keys();

* .entries() - возвращает пары ключ-значение

		formData.entries();

* .values() - возвращает значения

		formData.values();