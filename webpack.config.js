var template = require('html-webpack-plugin');
var uglifyjs = require('uglifyjs-webpack-plugin');

// var html = new template({
//     filename: `index/page.html`,
//     template: path.resolve(dirVars.pagesDir, `./index/html.js`),
//     //chunks: ['index', 'commons'],
//     hash: true, // 为静态资源生成hash值
//     minify: true,
//     xhtml: true,
// });

// var plugins = [];
// plugins.push(new uglifyjs)

module.exports = {
    //devtool: 'eval-source-map',

    entry:{
        'index':__dirname + "/src/index.js",
        // 'static/js/global.min':__dirname + "/src/global.js"
    },

    output: {
        path: __dirname + "/dist",
        filename: "[name].js",
        publicPath:'./'
    },

    devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        compress:true,
        host:'0.0.0.0'
    },

    module: {
        rules: [{//加载nunjucks模版
            test: /\.njk$/,
            loader: './plugin/compile-nunjucks-loader'
        }]
    },

    plugins: [new template({
        filename: 'index.html',
        template: './views/index.njk',
    }),new template({
        filename: 'about.html',
        template: './views/about.njk',
    })],
}