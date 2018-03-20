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

var plugins = [];
plugins.push(new uglifyjs)

module.exports = {
    //devtool: 'eval-source-map',

    entry:{
        'index':__dirname + "/src/index.js",
        'cases':__dirname + "/src/cases.js",
        'static/js/global.min':__dirname + "/src/global.js"
    },

    output: {
        path: __dirname + "/dist",
        filename: "[name].js",
        publicPath:'./'
    },

    devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        compress:true,
        inline: true//实时刷新
    },

    module: {
        rules: [{//加载nunjucks模版
            test: /\.njk$/,
            loader: 'compile-nunjucks-loader'
        }]
    },

    plugins: [new template({
        filename: 'index.html',
        template: './views/index.njk',
        chunks:['index']
    }),new template({
        filename: 'cases.html',
        template: './views/cases.njk',
        chunks:[]
    }),new uglifyjs()],
}