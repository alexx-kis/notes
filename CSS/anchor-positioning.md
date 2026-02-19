# CSS Anchor Positioning — шпаргалка

## 1️⃣ Что это такое

Anchor Positioning позволяет позиционировать элемент относительно другого элемента, а не только относительно relative родителя.

По сути — нативная альтернатива popper.js / floating-ui.

Работает в современных Chromium (Chrome 125+).

## 2️⃣ Базовая идея

Есть:

🎯 anchor (якорь)

📦 positioned element (например tooltip, dropdown)

🔹 Шаг 1 — объявляем anchor

```css
.button {
  anchor-name: --my-anchor;
}
```

🔹 Шаг 2 — привязываем другой элемент

```css
.tooltip {
  position: absolute;
  position-anchor: --my-anchor;
}
```

3️⃣ Позиционирование через `anchor()`

Функция:

```css
top: anchor(bottom);
left: anchor(left);
```

📖 Формат:

```css
anchor(<anchor-side>)
```

### Возможные значения:

top: верх anchor

bottom: низ anchor

left: левая граница

right: правая граница

center: центр по оси

self-start: старт текущего элемента

self-end: конец текущего элемента

### 🔹 Пример tooltip снизу

```css
.tooltip {
  position: absolute;
  position-anchor: --my-anchor;

  top: anchor(bottom);
  left: anchor(center);
  transform: translateX(-50%);
}
```

## 4️⃣ Альтернатива через position-area

Можно использовать сокращённую форму:

```css
.tooltip {
  position: absolute;
  position-anchor: --my-anchor;
  position-area: bottom center;
}
```

Это то же самое что:

```css
top: anchor(bottom);
left: anchor(center);
```

## 5️⃣ Самое мощное — @position-try

Это fallback система.

Позволяет сказать: Если элемент не помещается — попробуй другую позицию.

🔹 Синтаксис

```css
@position-try --try-top {
  top: anchor(top);
  left: anchor(center);
}

@position-try --try-bottom {
  top: anchor(bottom);
  left: anchor(center);
}
```

### Использование:

```css
.tooltip {
  position: absolute;
  position-anchor: --my-anchor;

  position-try: --try-bottom, --try-top;
}
```

💡 Браузер попробует:

1. bottom

2. если не помещается — top

## 6️⃣ position-try-order

Определяет стратегию перебора:

```css
.tooltip {
  position-try-order: most-height;
}
```

### Возможные значения:

normal: по порядку

most-width: ищет где больше места по ширине

most-height: ищет где больше места по высоте

## 7️⃣ anchor-size()

Можно использовать размеры anchor:

```css
width: anchor-size(width);
height: anchor-size(height);
```

Или:

```css
max-height: calc(anchor-size(height) * 2);
```

## 8️⃣ position-visibility

Позволяет скрывать элемент если он не помещается:

```css
.tooltip {
  position-visibility: anchors-visible;
}
```

### Значения:

always: всегда показывать

anchors-visible: показывать если anchor виден

no-overflow: скрыть если вылезает

## 9️⃣ Важно помнить

⚠️ 1. Нужен position position: absolute | fixed;

⚠️ 2. anchor-name работает только на позиционируемых элементах

Лучше явно ставить:

```css
position: relative;
anchor-name: --anchor;
```

⚠️ 3. Работает только в новых Chromium

Safari и Firefox пока в процессе реализации.

🔥 Полный рабочий пример

```html
<button class="button">Hover me</button>
<div class="tooltip">Tooltip</div>
```

```css
.button {
  position: relative;
  anchor-name: --btn;
}

.tooltip {
  position: absolute;
  position-anchor: --btn;

  padding: 8px 12px;
  background: black;
  color: white;

  position-area: bottom center;

  @position-try --flip {
    position-area: top center;
  }

  position-try: --flip;
}
```

🧠 Когда использовать

- tooltip
- dropdown
- popover
- contextual menu
- floating UI ✔ кастомные select

🆚 В сравнении с Popper.js

Anchor Positioning:

- Нативно
- Меньше кода
- Быстрее

Popper.js:

- JS библиотека
- Гибче
- Поддержка старых браузеров
