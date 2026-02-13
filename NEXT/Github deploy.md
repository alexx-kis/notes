# Deploy Next.js app to GitHub

- в файле конфигурации next.config.ts указать следующие настройки:

```ts
import { basePath } from '@/constants/const';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // создание директории экспорта
  basePath: basePath, // базовый путь для ресурсов
  reactStrictMode: true,
  images: {
    unoptimized: true, // отмена оптимизации изображений по дефолту
  },
};

export default nextConfig;
```

- базовый путь - это путь, по которому будут искаться изображения и прочее
- для проекта, развёрнутого на github этот путь должен быть равен названию проекта
  `https://<userName>.github.io/<basePath>/`

- этот базовый путь нужно добавить везде, где используются изображения, например:

```ts
`${basePath}/img/works/cloud-budget.png`,

//
style={{ backgroundImage: `url(${basePath}/img/bg/hero-bg.jpg)`}}
```

- так как в режиме разработки нет этого пути ('/'), то можно этот пусть задавать динамически в зависимости от среды запуска проекта:
```ts
export const basePath = process.env.NODE_ENV === 'production'
  ? '/portfolio-next' // название проекта
  : '';
```

- фоновые изображения для стилей не получится задавать динамически, потому что стили - это статические файлы
- поэтому фоновые изображения задавать через inline стили


- на github перейти в настройки проекта -> Pages
- выбрать `GitHub Actions` в разделе `Build and deployment` вместо стандартного `Deploy from a branch`

- потом перейти во вкладку `Actions` и посмотреть чё как там