var PROD = process.argv.indexOf('-p') >= 0;

module.exports = {
    entry: {
        'app': __dirname + '/lib/index.js'
    },
    output: {
        libraryTarget: 'umd',
        library: 'app',
        path: __dirname + '/dist',
        filename: PROD ? '[name].min.js' : '[name].js'
    }
};

/*
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
 
module.exports = {
    //插件项
    plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        app : './lib/index.js'
    },
    //入口文件输出配置
    output: {
        path: 'dist/lib',
        filename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            // { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    //其它解决方案配置
    resolve: {
        root: 'E:/github/flux-example/src', //绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
};
*/