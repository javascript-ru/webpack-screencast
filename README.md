# Скринкаст по Webpack

На примере этого проекта рассказываем:

* Базовые параметры конфига:
  - entry, output, mode
* Source maps: виды, использование нужной
* `webpack-dev-server` - автопересборка, HMR
* Длинное кеширование (Expires: max), `AssetsManifestPlugin`
* Копирование статических файлов: `CopyWebpackPlugin`
* Генерация HTML c `HtmlWebpackPlugin`.
* Уведомления `WebpackNotifierPlugin`.
* Очистка перед сборкой: `CleanWebpackPlugin`
* Передача параметров в JS: `DefinePlugin`
* Оптимизация сборки: статистика, `IgnorePlugin` (на примере `moment.js`)
* Динамический импорт `import(./${page})`, "магические" комментарии
* Алиасы (короткий путь до `lib` и `utils`)
* CSS: `postcss-loader` (nested styles), `css-loader`, `style-loader`, `file-loader`/`url-loader`
* Шаблоны с `pug-loader`
* Babel для использования последних фич JS: `babel-loader`.
* `MiniCssExtractPlugin`.
* Несколько точек входа, автовыделение общего chunk (ветка [entries](https://github.com/javascript-ru/webpack-example/tree/entries))

**Какие-то темы упустили? Вопросы/предложения – просим [new issue](https://github.com/javascript-ru/webpack-screencast/issues/new)**

## Установка и запуск

Сначала клонировать и поставить модули:
```bash
git clone https://github.com/javascript-ru/webpack-screencast
cd webpack-screencast
npm install
```

Запустить:
```bash
npm run dev
```

Теперь можно идти на <http://localhost:8000>, запущено одностраничное приложение с динамическим роутингом, шаблонами, js/css-модулями и т.п (см выше). По дизайну позже причешем.

Также есть команды:

* `npm run serve` - только сервер (отдача файлов) из директории `dist`, без сборки;
* `npm run build` - production-сборка в директорию `dist` (без сервера, можно в другом окне параллельно `npm run serve`);
* `npm run watch` = `npm run dev` + авторестарт при изменении конфига webpack;
* `npm run lint` - проверка кода ESLint.

