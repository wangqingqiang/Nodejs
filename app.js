/**
 * Created by wqq on 2016/7/14.
 */
var express=require('express');
var albumRouter=require('./Controllers/albumRouter.js');
var app=express();

app.set('views','./Views');
app.set('view engine','ejs');
//设置静态服务路由
//注意此处是 /static路由 ，但是目录是 ./Public，一个带 '.'，一个不带
app.use('/static',express.static('./Public'));

// 路由前面都是没有'.'的，否则匹配不上，
//注意此处不是app.use，app.use不是精确匹配，它可以匹配到书写的路由后面的子路由，
// 例如app.use(/admin,callback)可以匹配到 /admin/adminlist/adminid等
app.get('/',albumRouter.showIndex);
//设置相册详情页路由
app.get('/favicon.ico',function(req,res){});
app.get('/:album',albumRouter.showAlbum)
app.get('/upload/album/:albumName/:id',albumRouter.showPhoto);
app.use(albumRouter.show404);

app.listen(process.env.PORT || 5050)