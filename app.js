/**
 * Created by wqq on 2016/7/14.
 */
var express=require('express');
var albumRouter=require('./Controllers/albumRouter.js');
var app=express();

app.set('view engine','ejs');
//设置静态服务路由
//注意此处是 /static路由 ，但是目录是 ./Public，一个带 '.'，一个不带
app.use('/static',express.static('./Public'));

app.use('/',albumRouter.showIndex)

app.use(albumRouter.show404);
app.listen(8080,(err)=>{
    console.log(err);
})