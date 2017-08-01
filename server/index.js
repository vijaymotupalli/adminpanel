import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackconfig from '../webpack.config.dev';

let app = express()

const compiler = webpack(webpackconfig)
app.use(webpackMiddleware(compiler,{
    hot:true,
    publicPath:webpackconfig.output.publicPath,
    noInfo:true
}));
app.use(webpackHotMiddleware(compiler));

require('./../routes/routes.js')(app);

app.get('/*' ,(req,res)=>{

    res.sendFile(path.join(__dirname,'./index.html'));
})

app.listen(7000,()=>console.log("server running at 7000"));