const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
    return {
        entry: {
            main: './src/index.js',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js'
        },
        devServer: {
            static: {
                directory: path.resolve(__dirname, 'dist'),
            },
            port: 3000,
            open: true,
            hot: true,
            compress: true,
            historyApiFallback: true,
        },
        optimization: {
            minimizer: [
                new CssMinimizerPlugin(),
            ],
            minimize: true
        },
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    include: path.resolve(__dirname, 'src'),
                    use: [
                        'style-loader',
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                esModule: false,
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        'postcss-loader', 'sass-loader'],
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new MiniCssExtractPlugin()
        ],
        mode: 'development'
    }
}
