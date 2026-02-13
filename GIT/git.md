# Работа с git и github

- git - система контроля версий. Используя данную технологию в своих проектах, можно сохранять любую версию проекта, также можно перемещаться в любое время между версиями

- github - сервер для хостинга git-репозиториев

### Преимущества:

- Возможность сохранять апдейты
- Быстрый переход между версиями
- Возможность откатиться к любой из этих версий
- Работа в команде
- Параллельная разработка - одновременно несколько разработчиков могут работать над одним проектом

## Установка и первичная настройка

- Сайт git-scm.com

- В терминал вставить строку:

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

- Затем

`brew install git`

- Чтобы удалить:

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
```

- Установить/изменить имя:

```
git config --global user.name {через пробел ввести имя одним словом, если имя из нескольких слов, то в
кавычках}
```

- Проверить имя:

`git config --global user.name`

- Установить/изменить e-mail пользователя:

`git config --global user.email {через пробел ввести email}`

- Проверить email:

`git config --global user.email`

## Создание git-репозитория для проекта

- Можно использовать внешний терминал или встроенный терминал VSCode
- Зайти в VSCode, потянуть вверх статус-бар, там появится терминал (или вкладка Terminal → New terminal)
- Нажать "+" справа, выпадающее меню, выбрать bash
- Нужно установить дефолтный терминал VSCode: ⌘ ⇧ P → Terminal: Select Default Profile, выбрать bash
- Для создания нового репозитория его нужно инициализировать
- Вставить строку: `git init`

- Выведется сообщение о том, что создался пустой git-репозиторий и путь к этому репозиторию:

```
MacBook-Pro:_empty_project Alex$ git init
hint: Using 'master' as the name for the initial branch. This default branch name
hint: is subject to change. To configure the initial branch name to use in all
hint: of your new repositories, which will suppress this warning, call:
hint:
hint: git config --global init.defaultBranch <name>
hint:
hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
hint: 'development'. The just-created branch can be renamed via this command:
hint:
hint: git branch -m <name>
Initialized empty Git repository in /Users/Alex/Documents/FrontEnd/git/_empty_project/.git/
```

- Главную ветку для вновь созданных проектов нужно переименовать на `main`:

`git config --global init.defaultBranch main`

- Текущую ветку переименовать на main:

`git branch -m main`

- Репозиторий хранится в невидимой папке .git (показать/скрыть невидимые элементы {⌘ ⇧ .})

- Команда `git status` показывает, что вообще на данный момент происходит в git репозитории

## Работа с репозиторием

- git использует для работы три области для того, чтобы сохранять разные версии наших файлов

- working directory - рабочая директория/рабочий каталог - эта область, которую мы видим в левой боковой панели VSCode, то есть это все файлы корневой папки проекта (либо в проводнике)

- staging area - сюда попадают все файлы, которые мы только как бы подготавливаем к тому, чтобы сохранить в git-репозитории

- git repository - сюда отправляются все подготовленные файлы

- В working directory файлы попадают при их создании в проводнике или в левой боковой панели VSCode

- Чтобы отправить файл в staging area нужна команда `git add {название файла}`

- Например, создан файл index.html → в терминале ввести `git add index.html`

- Чтобы подготовить все файлы, вместо имён файлов можно просто поставить точку → `git add .`

- После запуска этой команды фалы будут находится в staging area

- Чтобы сохранить текущую версию проекта, нужна команда `git commit`

- commit содержит в себе информацию о версии проекта

- Каждый commit создаёт новую версию проекта

- Чтобы перемещаться между commit'ами, им нужно задавать названия, названия должны быть короткими, но информативными

- Чтобы указать название коммита, нужно написать `git commit -m '{название}'`

```
[main (root-commit) c1e2537] First commit
1 file changed, 15 insertions(+)
create mode 100644 index.html
```

`main` - название ветки, в которой был совершён коммит

`root-commit` - корневой коммит

`c1e2537` - кусочек hash кода, который принадлежит этому коммиту

`First commit` - название коммита

`1 file changed` - изменён 1 файл

`15 insertions` - добавлено 15 строк

- Именно после этой записи файл отправился в git-репозиторий

## Статусы файлов

-Статусы файлов меняются в соответствии с посещением файла какой-либо из трёх областей

`untracked` - статус, который получают файлы в момент, когда только создаётся репозиторий и в него добавляются файлы

- Такой статус получают все файлы, которые находились в корневой папке проекта ещё до создания git-репозитория

- Этот статус показывает, что данные файлы пока гитом не отслеживаются и никогда не отслеживались, то есть git их в репозиторий пока что не записывал, он их не знает

- В боковой панели у них значок U

- Для того, чтобы начать их отслеживать пишется команда git add .

- Параллельно с этим файлы принимают статус staged

`staged` - статус, который получают подготовленные файлы после команды git add .

- В боковой панели у них значок `A`

`unmodified` - статус, который получают файлы после команды git commit -m '{название}', находящиеся уже в git-репозитории

`modified` - статус, который получают файлы, которые уже когда-либо попадали в репозиторий

- Из этого статуса файлы переходят в статус staged после редактирования

## commit и указатель HEAD

- Коммиты - это указатели, которые использует git для разных версий

- Коммит включает в себя следующую информацию:
  - Имя и почта автора коммита
  - Описание коммита (задаётся каждый раз при создании коммита)
  - Информация о родительском коммите (При создании самого первого коммита была запись root-commit - эта запись означает, что у данного коммита нет родительского)
  - Версия проекта (Указатель HEAD - показывает на какой версии мы сейчас находимся)

## Навигация по версиям проекта

- Команда `git log` показывает информацию о сделанных коммитах

- Для того, чтобы перейти на какой-либо коммит, нужно знать его hash код, его можно найти с помощью команды `git log`

- С помощью команды `git checkout` можно вернуться на какой-то из коммитов

После `git checkout` нужно указать первые 6 символов интересующего коммита:

`git checkout c1e2537` Выведется сообщение:

```
You are in 'detached HEAD' state. You can look around, make experimental changes and commit them, and you can discard any commits you make in this state without impacting any branches by switching back to a branch. If you want to create a new branch to retain commits you create, you may do so (now or later) by using -c with the switch command. Example: git switch -c <new-branch-name> Or undo this operation with: git switch - Turn off this advice by setting config variable advice.detachedHead to false HEAD is now at c1e2537 First commit
```

- Если после этого вызвать команду `git status`, то в сообщении будет написано, что указатель HEAD находится на коммите `c1e2537`:

`HEAD detached at c1e2537 nothing to commit, working tree clean`

- Когда указатель HEAD был на последнем коммите, он на самом деле был не на нём, а на ветке main, которая указывала на последний коммит:

- Указатель веток всегда показывает на последний коммит, сделанный в этой ветке

- В момент перемещения на последний коммит работа идёт непосредственно с самим коммитом, поэтому указываются первые символы его hash кода

- Если сделать коммит от первого коммита, а потом переместиться на ветку main, то потом будет невозможно переместиться на этот сделанный коммит

- Чтобы переместиться на последний коммит, нужно использовать либо код последнего коммита, либо название ветки:

`git checkout main`

## Работа с ветками

- Работа с разными ветками предполагает внесение изменений в проект разными людьми или группами людей при этом основная ветка будет сохраняться

- Команда `git branch` показывает, сколько на данный момент существует веток на проекте

`MacBook-Pro:\_empty_project Alex$ git branch`

- main Чтобы создать ветку нужно использовать ту же команду `git branch + название ветки`

`MacBook-Pro:\_empty_project Alex$ git branch branch1`

- main Чтобы перейти на другую ветку используется команда git checkout + название ветки:

`MacBook-Pro:\_empty_project Alex$ git checkout branch1 Switched to branch 'branch1'`

- Чтобы переименовать ветку, нужно находится на этой ветке, используется команда `git branch -m + {новое имя}`

- Чтобы удалить ветку, нельзя находиться на ней, нужно находиться на другой ветке `git branch -d + {название удаляемой ветки}`

- Вернуться на какой-то из предыдущих коммитов и продолжить разработку там можно двумя способами:

### Способ 1

- Вернуться на этот коммит:

`git checkout c1e2537`

- Создать там ветку:

`git branch new-branch`

- Команда `git log` покажет только этот первый коммит, на котором мы находимся:

```
MacBook-Pro:\_empty_project Alex$ git log commit c1e2537f4148f89382be43eb924377e794653bb9 (HEAD, new-branch) Author: alex\_\_kis <fenaethylaamiinloever@gmail.com> Date: Thu May 18 19:30:08 2023 +0300 First commit
```

- Указатели HEAD и new-branch оба находятся на этом коммите (HEAD, new-branch)

- Нужно переместить указатель HEAD на указатель ветки new-branch:

`git checkout new-branch`

- Теперь указатель HEAD находится на ветке new-branch

```
(HEAD -> new-branch): MacBook-Pro:\_empty_project Alex$ git log commit c1e2537f4148f89382be43eb924377e794653bb9 (HEAD -> new-branch) Author: alex\_\_kis <fenaethylaamiinloever@gmail.com> Date: Thu May 18 19:30:08 2023 +0300 First commit
```

- Теперь на этой ветке можно создать какой-то коммит (создадим файл style.css)

`git commit -m 'added style.css'`

```
MacBook-Pro:\_empty_project Alex$ git log commit 61b8ccad6503460d21902b4792ce8d91715f1005 (HEAD -> new-branch) Author: alex\_\_kis <fenaethylaamiinloever@gmail.com> Date: Sat May 20 13:34:14 2023 +0300 added style.css

commit c1e2537f4148f89382be43eb924377e794653bb9 Author: alex\_\_kis <fenaethylaamiinloever@gmail.com> Date: Thu May 18 19:30:08 2023 +0300 First commit
```

- Теперь указатель HEAD находится на новом, последнем коммите:

`commit 61b8ccad6503460d21902b4792ce8d91715f1005 (HEAD -> new-branch)`

### способ 2

- При переходе обратно на ветку main созданный коммит `61b8cc` будет не видно при вызове команды `git log`

- Перейдём на второй коммит `8f5633`, создадим там ветку second-branch и перейдём на неё:

`git checkout -b second-branch 8f5633`

```
MacBook-Pro:\_empty_project Alex$ git log commit 8f5633744dea342c25e2ca04baf805623e9afe9b (HEAD -> second-branch) Author: alex\_\_kis <fenaethylaamiinloever@gmail.com> Date: Thu May 18 19:57:11 2023 +0300 added js and css

commit c1e2537f4148f89382be43eb924377e794653bb9 Author: alex\_\_kis <fenaethylaamiinloever@gmail.com> Date: Thu May 18 19:30:08 2023 +0300 First commit
```

- Пусть есть такая ситуация, что на основной ветке `main` ведётся основная разработка, затем на одном из коммитов создаётся новая ветка new, на которой ведётся разработка какой-то фичи:

- В момент, когда становится понятно, что новая фича готова и её можно добавлять на основной сайт, чтобы её видели все пользователи, нужно перенести изменения на ветке new на ветку `main`

- Для слияния двух веток нужно находиться на главной ветке и использовать команду:

`git merge + {название доп. ветки}`

- Чтобы задать названия для коммита-слияния

`git merge -m 'название' new`

- В результате создастся новый коммит слияния веток:

- Теперь можно удалить ветку new
