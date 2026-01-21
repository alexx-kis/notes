# 1. Создать схему валидации

```ts
import { z } from 'zod';

export const formSchema = z.object({
  fieldName: z.string().min(1, обязательное поле).max(120),
});
```
после `z` используются разные методы валидации

### тип поля

`.string()` - поле ожидает строку
`.number()` - поле ожидает число, итд


### количество символов

- `.min()` - минимальное количество символов в поле, принимает 2 параметра:
  1) минимальное количество символов (number)
  2) текст ошибки, если валидация падает (string)

например:
`.min(1, обязательное поле)`

- `.max()` - аналогично

⚠️ Важный нюанс:
`.min(1)` не убирает пробелы, то есть строка " " (три пробела) формально длиной 3 — и пройдёт

Чтобы такое не проходило, добавляют:

`z.string().trim().min(1, 'Обязательное поле')`

- `.trim()` - срезает пробелы по краям, и " " превращается в ''

- `.length(n, '...')` — строго ровно n символов

### обязательность

`.optional()` — поле может быть не заполнено (undefined)

`.nullable()` — поле может быть null

`.nullish()` — может быть и null, и undefined

Примеры:

`z.string().optional()`   // может не прийти вообще
`z.string().nullable()`   // может прийти null
`z.string().nullish()`    // оба варианта


### форматы

- `.email('...')` — email

- `.url('...')` — ссылка

- `.uuid('...')` — UUID

- `.datetime('...')` — дата-время (ISO-строка)

Примеры:

z.string().email('Некорректный email')
z.string().url('Некорректная ссылка')

### плюшки

- `.startsWith('a'), .endsWith('z')` — строка начинается/заканчивается так-то

### Регулярки и кастомные правила

- `.regex(/.../, '...')` — проверка по регулярному выражению

- `.refine(fn, '...')` — кастомная логика “как хочешь”

Пример телефон/телега/почта (как у тебя):

`z.string().refine((v) => isEmail(v) || isPhone(v) || isTelegram(v), 'Введите норм контакт')`

### для других типов данных

#### Числа
`z.number().min(0).max(100).int().positive()`

#### Булево
`z.boolean()`

#### Массив
`z.array(z.string()).min(1, 'Нужен хотя бы один элемент')`

#### Объект
```
z.object({
  name: z.string(),
  age: z.number().int(),
})
```


# 2. В компоненте определить тип состояния формы

```ts
type FormState = {
  fieldA: string;
  fieldB: string;
};

const initialFormState: FormState = {
  fieldA: '',
  fieldB: '',
};
```

# 3. Добавить состояние ошибок

Ошибки = объект с теми же ключами, что и форма

```ts
type FormErrors = Partial<Record<keyof FormState, string>>;

const [errors, setErrors] = useState<FormErrors>({});
```

Ментальная модель:

errors.fieldA → ошибка поля fieldA

пусто → поле валидно

# 4. Создать универсальный валидатор одного поля

```ts
export const validateFormElement = (
  field: string,
  value: string,
  schema: z.ZodObject<Record<string, z.ZodTypeAny>>,
) => {
  const fieldSchema = schema.shape[field as keyof typeof schema.shape];
  const result = fieldSchema.safeParse(value);
  return result.success ? '' : result.error.errors[0].message;
};
```

# 5. Валидация при вводе

Алгоритм ВСЕГДА одинаковый:

```ts
const handleFieldChange = (field: string, value: string) => {
  setFormState((prev) => ({ ...prev, [field]: value }));

  const error = validateField(field, value, formSchema);
  setErrors((prev) => ({ ...prev, [field]: error }));
};
```

# 6. Валидация при submit (обязательный шаг)

Это главная защита, даже если есть onChange.

```ts
const handleSubmit = (e: FormEvent) => {
  e.preventDefault();

  const result = formSchema.safeParse(formState);

  if (!result.success) {
    const fieldErrors: FormErrors = {};

    result.error.errors.forEach((err) => {
      const field = err.path[0] as keyof FormState;
      fieldErrors[field] = err.message;
    });

    setErrors(fieldErrors);
    return; // ⛔ СТОП
  }

  setErrors({});
  // ✅ дальше: dispatch / fetch / api
};
```

# 7. Подключи ошибки к UI

Каждое поле должно:

  1) знать, что оно невалидно
  2) уметь показать текст ошибки

```tsx
<FormElement
  value={formState.fieldA}
  errorText={errors.fieldA ?? ''}
  className={clsx({ '_invalid': errors.fieldA })}
/>
```

# 8. (Опционально) Блокируй кнопку

UX-улучшение, не логика:

```tsx
const isSubmitDisabled =
  !!errors.fieldA ||
  !!errors.fieldB ||
  formState.fieldA.trim() === '';
```

Никогда не полагайся ТОЛЬКО на disabled
Submit-валидация всё равно нужна

## Мини-шаблон

// 1. schema
`export const schema = z.object({});`

// 2. form state
`const [formState, setFormState] = useState(initialState);`

// 3. errors
`const [errors, setErrors] = useState({});`

// 4. change
`const handleChange = (field, value) => {};`

// 5. submit
`const handleSubmit = (e) => {};`