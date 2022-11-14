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

// функция для определения названий собранных файлов в зависимости от режима сборки
const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

// функция для формирования конфига оптимизации
const optimization = () => {

    const config = {

        splitChunks: {
            chunks: "all"
        }
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

        optimization: optimization(),

        plugins: plugins(),

        module: {
            rules: [

                // loader для сборки .js & .jsx
                // используется babel-loader
                // при этом рядом лежит заполненный .babelrc
                {
                    test: /\.(js|jsx)$/,

                    exclude: /node_modules/,

                    use: {
                        loader: "babel-loader"
                    }
                }
            ]
        }
    }
}