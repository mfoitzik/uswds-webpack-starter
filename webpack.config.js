const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
      index1: './src/js/index1.js',
      index2: './src/js/index2.js',
      index3: './src/js/index3.js',
      docpage: './src/js/docpage.js'
    },
    // Path and filename of your result bundle.
    // Webpack will bundle all JavaScript into this file
    plugins: [
      
        new MiniCssExtractPlugin({
          filename: "css/[name].css"
        }),
        new HtmlWebpackPlugin({
          chunks: ['index1'],
          filename: "index1.html",
            template: "src/index1.html"
        }),
        new HtmlWebpackPlugin({
          chunks: ['index2'],
          filename: "index2.html",
          template: "src/index2.html"
        }),
        new HtmlWebpackPlugin({
          chunks: ['index3'],
          filename: "index3.html",
          template: "src/index3.html"
        }),
        new HtmlWebpackPlugin({
          chunks: ['docpage'],
          filename: "docpage.html",
          template: "src/docpage.html"
        }),
        new HtmlWebpackPlugin({
          chunks: ['docpage'],
          filename: "landingpage.html",
          template: "src/landingpage.html"
        }),
        new HtmlWebpackPlugin({
          chunks: ['docpage'],
          filename: "QuasarFrameworkTreeConfigurator.html",
          template: "src/QuasarFrameworkTreeConfigurator.html"
        }),
        new CopyPlugin([
            { from: 'src/images', to: 'images' },
            { from: 'src/statics', to: 'statics' },
            { from: 'node_modules/uswds/dist/img', to: 'img' },
            { from: 'node_modules/uswds/dist/fonts', to: 'fonts' }
        ]),
        new CleanWebpackPlugin()
      
      ],
      devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        writeToDisk:true,
        historyApiFallback: {
          index: 'index1.html',
        },
        port: 9000
      },
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
            // Apply rule for .sass, .scss or .css files
            test: /\.(sa|sc|c)ss$/,

            // Set loaders to transform files.
            // Loaders are applying from right to left(!)
            // The first loader will be applied after others
            use: 
            [
                {
                    // After all CSS loaders we use plugin to do his work.
                    // It gets all transformed CSS and extracts it into separate
                    // single bundled file
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    // This loader resolves url() and @imports inside CSS
                    loader: "css-loader",options: { url: false, sourceMap: true }
                },
                {
                    // Then we apply postCSS fixes like autoprefixer and minifying
                    loader: "postcss-loader",
                    options: {
                      sourceMap: true
                    }
                },
                {
                    // First we transform SASS to standard CSS
                    loader: "sass-loader",
                    options: {
                        implementation: require("node-sass"),
                        sassOptions: {
                          sourceMap: true,
                          includePaths: [
                            //join(dirname(module.filename), 'node_modules'),
                            //join(dirname(module.filename), 'node_modules/uswds/dist/scss')
                            path.resolve(__dirname, 'node_modules'),
                            path.resolve(__dirname, 'node_modules/uswds/dist/scss'),
                            path.resolve(__dirname, 'node_modules/uswds/dist/fonts')
                          ]
                        }
                        
                    }
                }
            ]
          }
      ]
    }
      
  };