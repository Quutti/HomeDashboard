const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NoErrorsPlugin = webpack.NoErrorsPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

/** @todo Allow also production mode */
const isProductionMode = false;

const filenames = {
    dev: 'assets/js/[name].bundle.js',
    prod: 'assets/js/[name].[hash].js'
}

const extractCSS = {
    component: new ExtractTextPlugin('assets/css/component.bundle.css'),
    global: new ExtractTextPlugin('assets/css/global.bundle.css')
}

module.exports = function getWebpackConfigs() {

    var config = {};

    config.resolve = {
        extensions: ['.ts', '.tsx', ".js", ".jsx"],
        alias: {
            "@shared": path.resolve(__dirname, "..", "shared")
        }
    }

    config.entry = {
        app: './src/app/main.tsx'
    }

    config.output = {
        path: path.resolve(__dirname, 'dist'),

        publicPath: isProductionMode
            ? '/'
            : 'http://localhost:8082/',

        filename: isProductionMode
            ? filenames.prod
            : filenames.dev,

        chunkFilename: isProductionMode
            ? filenames.prod
            : filenames.dev,
    }

    config.module = {
        rules: [{
            test: /\.(ts|tsx)$/,
            loader: "awesome-typescript-loader",
            exclude: /node_modules/
        }, {
            test: /\.global\.css$/,
            use: extractCSS.global.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            module: true,
                            localIdentName: '[local]'
                        }
                    },
                    'postcss-loader'
                ]
            })
        }, {
            test: /^(.(?!.*(\.global\.css)$))*\.css$/,
            use: extractCSS.component.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            module: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    },
                    'postcss-loader'
                ]
            })
        }, {
            test: /\.(png|jpg|jpeg|gif|json|svg|woff|woff2|ttf|eot)$/,
            loader: 'file-loader'
        }, {
            test: /\.html$/,
            loader: 'raw-loader'
        }]
    }

    config.plugins = [
        new CopyWebpackPlugin([
            { from: "src/public/images/**/*.*", to: "assets/img/[name].[ext]" },

            { from: 'node_modules/bootstrap/dist/css/bootstrap.min.css', to: 'assets/css/[name].[ext]' },
            { from: 'node_modules/font-awesome/css/font-awesome.min.css', to: 'assets/css/[name].[ext]' },
            { from: 'node_modules/font-awesome/fonts/*.*', to: 'assets/fonts/[name].[ext]' }
        ]),

        // Generate template out of existing HTML and inject
        // script and style files to it
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            inject: 'body'
        }),

        extractCSS.component,
        extractCSS.global
    ];

    if (isProductionMode) {
        config.plugins.push(
            new NoErrorsPlugin(),
            new UglifyJsPlugin(),
            new CopyWebpackPlugin([{
                from: __dirname + '/src/public'
            }])
        );
    }

    config.devServer = {
        contentBase: './src/public',
        stats: 'minimal',
        port: 8082
    }

    return config;

}();