# ДОБАВИТЬ КОРОТКУЮ КОМАНДУ ДЛЯ GIT

	git config --global alias.coa "!git add -A && git commit -m"

* вместо .coa должно быть сокращение, вызываться будет так:

		git coa '{какой-то текст}'

* вместо git add -A && git commit -m должны быть соответствующие команды (без восклицательного знака)