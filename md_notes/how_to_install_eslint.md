# Установка ESLint

- установить плагин ESLint (если его нет) в VSCode

- установить eslint через терминал:

        npm install eslint --save-dev --save-exact

или (лучше)

        npm install --save-dev eslint @eslint/js

- появится директория с пакетами node_modules, её нужно записать в .gitignore

- cформируется файл package-lock.json, который помогает «запомнить» точные версии зависимостей, чтобы в будущем устанавливать именно их. Данный файл формируется сразу после установки первой зависимости. Если в проекте уже установлены какие-либо зависимости, то файл package-lock.json просто обновится. Файл package-lock.json нужно коммитить в репозиторий.

- В файле package.json появится новая секция devDependencies (или обновится). туда запишется информация об установленном пакете: его название и версия. Файл package.json также нужно коммитить в репозиторий.

- инициализировать eslint:

        npm init @eslint/config@latest

- ответить на вопросы в терминале

- появится файл .eslintrc.js - файл с настройками eslint

- в файл package.json после devDependencies через запятую добавить блок скриптов:

        "scripts": {
                "lint": "eslint js/"
        }

- теперь в терминале можно запускать команду npm run lint которая будет проверять код на ошибки и писать отчёт в терминале || можно использовать вкладку PROBLEMS где плагин будет информировать об ошибках

- вставить правила в файл .eslintrc.js

        "rules": {
                "no-console": "warn",
                "no-unused-vars": "warn"
        }

- создать файл .eslintignore в написать туда названия папок/файлов, которые не нужно проверять, например, vendor

## Настройка

- в файле eslint.config.mjs:

        import globals from "globals";
        import pluginJs from "@eslint/js";


        export default [
          {
            languageOptions:
            {
              globals:    // здесь можно указывать глобальные переменные из библиотек
              {
                ...globals.browser,
                "Splide": "readonly",
                "mixitup": "readonly",
                "gsap": "readonly",
                "ScrollTrigger": "readonly",
                "$": "readonly",
              }
            },
            "rules": {    // здесь можно указывать правила
              "no-console": "warn",
              "no-unused-vars": "warn",
              "prefer-arrow-callback": "warn"
            }
          },
          pluginJs.configs.recommended,
        ];
