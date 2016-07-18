/**
 * Created by Administrator on 2016/7/14 0014.
 */
var fs = require('fs');
var path=require('path');
var formidable=require('formidable');

//同步方式获取相册列表
function getAlbumsSync() {
    var albumsPath = './Upload/Album';
    var albums = [];
    var files = fs.readdirSync(albumsPath);
    if (!files) {
       console.log(files);

    }
    else(files)
    {
        files.forEach(function (file, index, files) {
            var stats = fs.statSync(`${albumsPath}/${file}`);
            if (!stats) {
                console.log(stats);
            } else {
                if (stats.isDirectory()) {
                    albums.push(file);
                }
            }
        });
    }
    return albums;
}

//获取某一相册下的图片列表，支持格式：['.jpg','.png','.jpeg','.gif','.bmp','.ico']
function getPhotos(album,callback){
    var albumPath = `./Upload/Album/${album}`;
    var photos=[];
   // var test=fs.readdirSync(albumPath);
    //console.log(test);
    fs.readdir(albumPath,(error,files)=>{
        if(error){
            callback(error,null);
        }else {
            (function isFile(i){
                if(i===files.length){
                    callback(null,photos);
                    return;
                }
                var file=files[i];
                fs.stat(albumPath+'/'+file,(error,stats)=>{
                    if(error){
                        //不能因为一个文件有问题就不展示所有图片
                        console.log(error);
                    }else {
                        var extname=path.extname(file).toLowerCase();
                        var extSupport=['.jpg','.png','.jpeg','.gif','.bmp','.ico']
                        //判断是否是图片格式
                        if(stats.isFile()&&(extSupport.indexOf(extname)>-1)){
                            photos.push(file);
                        }
                    }
                    isFile(++i);
                })
            })(0)
        }
    })
}

//获取某个图片请求，发现有sendFile弃用此方法
function getPhoto(pathname,callback){
    var file=fs.readFile(pathname,(error,data)=>{
        if(error) {
            callback(error, null);
        }else {
            callback(null,data);
        }
    })
}

function uploadImg(req,callback) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "./Upload/.temp";
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;

    fs.stat(form.uploadDir, (error, stats)=> {
        if (error) {
            fs.mkdir(form.uploadDir, (error)=> {
                if (error) {
                    console.log('创建.temp文件夹失败');
                    console.log(error);
                    callback(error, null);
                }
                else {
                    form.parse(req, function (err, fields, files) {
                        if(err){
                            console.log(err);
                            console.log('parse错误1');
                        }
                        var album = fields.album;
                        var img = files.img;
                        callback(null, album);
                    });
                }
            })
        }
        else {
            form.parse(req, function (err, fields, files) {
                console.log(err);
                console.log('parse错误2');
                var album = fields.album;
                var img = files.img;
                callback(null, album);
            });
        }
    })
}
module.exports = {
    getAlbumsSync,
    getPhotos,
    getPhoto,
    uploadImg
}