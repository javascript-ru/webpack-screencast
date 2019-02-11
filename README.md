# Пример проекта для скринкаста по Webpack

## Установка и запуск

Сначала клонировать и поставить модули:
```bash
git clone https://github.com/javascript-ru/webpack-example
cd webpack-example
npm install
```

Основные команды:

* `npm run dev` - dev-сборка: автопересборка и сервер на <http://localhost:8000/>;
* `npm run serve` - только сервер (отдача файлов) из директории `dist`;
* `npm run build` - production-сборка в директорию `dist` (можно в другом окне параллельно serve);

Вспомогательные команды:

* `npm run watch` = `npm run dev` + авторестарт при изменении конфига webpack;
* `npm run lint` - проверка кода ESLint.

## Возможности

На примере этого проекта рассказываем:

* Базовые параметры конфига:
  - entry, output, mode
* Source maps: виды, использование нужной
* `webpack-dev-server` - автопересборка, HMR (TODO)
* Длинное кеширование (Expires: max), `AssetsManifestPlugin`
* Копирование статических файлов: `CopyWebpackPlugin`
* Генерация HTML c `HtmlWebpackPlugin`.
* Уведомления `WebpackNotifierPlugin`.
* Очистка перед сборкой: `CleanWebpackPlugin`
* Передача параметров в JS: `DefinePlugin`
* Оптимизация сборки: статистика, `IgnorePlugin` (на примере `moment.js`)
* Динамический импорт `import(./${page})`, магические комменты
* Алиасы (о чем тут, зачем алиас для Lib TODO?)
* CSS: `postcss-loader` (nested styles), `css-loader`, `style-loader`, `file-loader`/`url-loader`
* Шаблоны с `pug-loader`
* Babel для использования последних фич JS: `babel-loader`.
* `MiniCssExtractPlugin`.
* Несколько точек входа, автовыделение общего chunk (TODO)


