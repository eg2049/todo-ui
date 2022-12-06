// определение режима сборки при помощи системной переменной 
// передаваемой через cross-env в скриптах package.json
const isDev = process.env.NODE_ENV === "development";

// подключение path для дальнейшей работы
const path = require("path");

// плагин для очистки ранее собранных файлов, после того как собрались новые
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// плагин для анализа итогового bundle-а
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

// плагин для работы с html
const HTMLWebpackPlugin = require("html-webpack-plugin");

// плагин для работы с .css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// плагин для оптимизации .css
const TerserWebpackPlugin = require("terser-webpack-plugin");

// плагин для оптимизации .css
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

// функция для определения названий собранных файлов в зависимости от режима сборки
const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

// функция для формирования конфига оптимизации
const optimization = () => {

    // формируется конфиг для оптимизации
    const config = {

        splitChunks: {

            // если в нескольких точках входа будет импортироваться одна и та же .js библиотека, 
            // то код этой библиотеки не будет дублироваться в каждом из итоговых файлов, а запишется в отдельном файле, 
            // и из файлов проекта будет происходить обращение к этому файлу
            chunks: "all"
        }
    };

    // если в режиме production, в поле minimizer добавляются плагины с оптимизацией .css
    if (!isDev) {
        config.minimizer = [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    };

    return config;
};

// функция для динамического добавления элементов плагинов в конфиг
const plugins = () => {

    const base = [

        new CleanWebpackPlugin(),

        new HTMLWebpackPlugin(
            {

                // html для сборки
                template: path.join(__dirname, "public", "index.html"),

                // оптимизация .html при сборке в режиме production
                minify: {
                    collapseWhitespace: !isDev
                }
            }
        ),

        // будет создан отдельный .css файл, с названием соответсвующим паттерну
        new MiniCssExtractPlugin(
            {
                filename: "[name].[contenthash].css"
            }
        )
    ];

    if (!isDev && process.env.STATS) {
        base.push(
            new BundleAnalyzerPlugin(
                {
                    analyzerPort: "9876"
                }
            )
        );
    };

    return base;
};

// функция для формирования .css loader-ов
const cssLoaders = extra => {

    // loader-ы
    // важен порядок, при этом, "пропускание" через loader-ы идёт справа налево...
    const loaders = [

        // // добавляет стили описанные в .css в <head> в .html
        // "style-loader",

        // более тонкая настройка loader-а внутри объекта
        {
            // можно использовать loader плагина, он позволит выносить .css в отдельный файл
            loader: MiniCssExtractPlugin.loader,

            // здесь можно передавать опции для loader-а (плагина)
            options: {

                // // Hot Module Reloading - изменения в .css подтянутся без перезагрузки страниц
                // // добавляется только в режиме development
                // // <не работает, по документации кажется что уже не используется...>
                // hmr: isDev,

                // // перезагрузка всех файлов (видимо)
                // // <не работает, по документации кажется что уже не используется...>
                // reloadAll: true
            }
        },

        // позволяет webpack-y понимать импорты .css внутри .js и импортировать .css
        "css-loader"
    ];

    // добавление дополнительного loader-а, если он передаётся аргументом
    if (extra) {
        loaders.push(extra);
    };

    return loaders;
};

// из конфига экспортируется Object, который будет являться объектом конфигурации для webpack
module.exports = () => {

    const host = process.env.HOST ? process.env.HOST : 'localhost';
    const port = process.env.PORT ? process.env.PORT : 3000;
    const wds_socket_port = process.env.WDS_SOCKET_PORT ? process.env.WDS_SOCKET_PORT : 3000;

    return {

        mode: "development",

        entry: {

            // основная точка входа приложения
            main: path.join(__dirname, "src", "index.js")
        },

        output: {

            // название собранного файла
            filename: filename("js"),

            // директория для сохранения собранных файлов
            path: path.join(__dirname, "dist")
        },

        resolve: {

            // расширения которые можно не указывать в импортах
            extensions: [
                ".js", ".jsx"
            ],

            // алиасы которые можно использовать в импортах
            alias: {
                "@config": path.join(__dirname, "config"),
                "@src": path.join(__dirname, "src"),
                "@components": path.join(__dirname, "src", "components"),
                "@pages": path.join(__dirname, "src", "pages"),
                "@router": path.join(__dirname, "src", "router"),
                "@reducers": path.join(__dirname, "src", "reducers"),
                "@API": path.join(__dirname, "src", "API"),
                "@handlers": path.join(__dirname, "src", "handlers"),
                "@utils": path.join(__dirname, "src", "utils"),
                "@styles": path.join(__dirname, "src", "styles")
            }
        },

        devServer: {
            host: host,
            port: port,

            client: {
                webSocketURL: `ws://${host}:${wds_socket_port}/ws`,
            },

            // для того что можно было открывать страницы по прямым ссылкам
            historyApiFallback: true
        },

        // указание с каким содержимым должны сохраняться собранные файлы в зависомости от режима сборки
        // source-map - сохраняется подробная информация
        // nosources-source-map - всё лишнее удаляется
        devtool: isDev ? "source-map" : "nosources-source-map",

        // оптимизация сборки файлов (логика оптимизации вынесена в функцию)
        optimization: optimization(),

        // плагины для сборки файлов (логика формирования вынесена в функцию)
        plugins: plugins(),

        module: {
            rules: [

                // loader для сборки .js & .jsx
                // используется babel-loader
                // при этом рядом лежит заполненный .babelrc
                {
                    test: /\.(js|jsx)$/,

                    // исключая node_modules
                    exclude: /node_modules/,

                    use: {

                        // позволяет webpack-у при сборке компилировать .js код при помощи babel
                        loader: "babel-loader"
                    }
                },

                {
                    test: /\.css$/,

                    rules: [
                        {
                            // test - регулярное выражение, если расширение файла попадает (в процессе импорта) под регулярку
                            // то нужно использовать loader-ы записанные в use 
                            test: /\.css$/,

                            // .css loader-ы по умолчанию
                            use: cssLoaders()
                        }
                    ]
                }
            ]
        }
    };
};