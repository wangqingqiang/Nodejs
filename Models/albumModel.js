/**
 * Created by Administrator on 2016/7/14 0014.
 */
var fs = require('fs');
var path=require('path');

function getAlbums(callback) {
    var albumsPath = './Upload/Album';
    var albums = [];
    fs.readdir(albumsPath, function (error, files) {
        if (error) {
            callback(error, null);
        } else {
            files.forEach(function (file, index, files) {
                fs.stat(`${albumsPath}/${file}`, (error, stats)=> {
                    if (error) {
                        console.log(error);
                        callback(error, null);
                    } else {
                        if (stats.isDirectory()) {
                            albums.push(file);
                        }
                    }
                    if (index === files.length - 1) {
                        callback(null, albums);
                    }
                })

            });
        }
    })
}
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
function getPhoto(pathname,callback){
    var file=fs.readFile(pathname,(error,data)=>{
        if(error) {
            callback(error, null);
        }else {
            callback(null,data);
        }
    })
}
module.exports = {
    getAlbums,
    getAlbumsSync,
    getPhotos,
    getPhoto
}