# 1. Создать директорию store в директории src

- установить
  `@reduxjs/toolkit` и `react-redux` в dependencies
  `@types/react-redux` в devDependencies

# 2. Внутри создать файлы:

## 1. index.ts

- здесь инициализировать хранилище

```ts
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';

export const store = configureStore({ reducer });
```

## 2. action.ts

- здесь будут описаны действия с помощью функции createAction

```ts
// store/action.ts
import { createAction } from '@reduxjs/toolkit';

// %======================== action ========================% //

export const doSomething = createAction<type>('doSomething');
```

- в createAction передаётся строка, совпадающая с названием действия
- в type передаётся тип того, что будет передаваться в payload при вызове функции dispatch

## 3. reducer.ts

- здесь будут описаны функции, который меняют глобальный state при передача действия в функцию dispatch
- создать объект initialState, описывающий начальное состояние

```ts
// store/reducer.ts
const initialState = {
  property1: value1,
  property2: value2,
  property3: value3,
};
```

- создать reducer с помощью функции createReducer
- в неё передаётся начальное состояние и callback
- callback параметром принимает переменную builder
- с помощью builder описываются cases
- в функцию addCase передаётся действие и callback
- callback принимает state и action (action - необязательный параметр)
- у параметра action два поля - type (строка, которая совпадает с названием и payload)

```ts
export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(action1, (state, action) => {
      state.property1 = action.payload;
    })
    .addCase(action2, (state, action) => {
      state.property2 = action.payload;
    });
});
```

# 3. Описать типы для состояния и функции dispatch

- в файле, где все типы, или в отдельном файле

```ts
export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

- тип State нужен для того, чтобы при изменении состояния типы полей всегда подстраивались под текущее состояние

# 4. в папке с хуками создать файл index.ts

- здесь нужно описать два хука-обёртки для функций useDispatch (нужен для отправки изменений в состояние) и useAppSelector (нужен для получения данных из состояния)

```ts
// hooks/index.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { State, AppDispatch } from '../types';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
```

- чтобы получить данные из состояния, нужно воспользоваться хуком useAppSelector
- ему нужно передать параметром callback функцию, которая принимает `state`
  и возвращает `state.<любое поле объекта-состояния>` (state.property1)

- пример:
```tsx
const selectedCityName = useAppSelector((state) => state.cityName);
```

- чтобы отправить данные в состояние, нужно воспользоваться хуком useAppDispatch()
- создать переменную, в которую будет помещён этот хук

```tsx
const dispatch = useAppDispatch();
```

- теперь в функцию dispatch() можно передавать действия, которые будут отправлены в состояние

- пример:
```tsx
const onNavLinkClick = (location: string) => {
  dispatch(changeCity(location));
  dispatch(fillOfferList());
};
```

- также нужно обернуть всё приложение в тэг `<Provider>` и в пропс `store` передать ему `store` (который был создан в шаге 1)

- для использования в `next` нужно создать обёртку для провайдера, потому что компонент `<layout>` нельзя сделать клиентским

```ts
'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
```

в компоненте `<RootLayout>` обернуть всё, что внутри элемента `<body>` в компонент `<Providers>`

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```