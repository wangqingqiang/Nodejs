/**
 * Created by Administrator on 2016/7/14 0014.
 */
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var sd = require('silly-datetime');

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
function getPhotos(album, callback) {
    var albumPath = `./Upload/Album/${album}`;
    var photos = [];
    // var test=fs.readdirSync(albumPath);
    //console.log(test);
    fs.readdir(albumPath, (error, files)=> {
        if (error) {
            callback(error, null);
        } else {
            (function isFile(i) {
                if (i === files.length) {
                    callback(null, photos);
                    return;
                }
                var file = files[i];
                fs.stat(albumPath + '/' + file, (error, stats)=> {
                    if (error) {
                        //不能因为一个文件有问题就不展示所有图片
                        console.log(error);
                    } else {
                        var extname = path.extname(file).toLowerCase();
                        var extSupport = ['.jpg', '.png', '.jpeg', '.gif', '.bmp', '.ico']
                        //判断是否是图片格式
                        if (stats.isFile() && (extSupport.indexOf(extname) > -1)) {
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
function getPhoto(pathname, callback) {
    var file = fs.readFile(pathname, (error, data)=> {
        if (error) {
            callback(error, null);
        } else {
            callback(null, data);
        }
    })
}

function uploadImg(req, callback) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "./Upload/.temp";
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;//文件最大值，单位B，即使上传的文件大于此值，下面form.parse方法也不会报错，只是不会上传文件

    //__type=0位系统内部错误，1为图片超过限制错误
    fs.stat(form.uploadDir, (error, stats)=> {
        if (error) {
            fs.mkdir(form.uploadDir, (error)=> {
                if (error) {
                    error.__type = 0;
                    callback(error, null);
                }
                else {
                    form.parse(req, function (err, fields, files) {
                        if (err) {
                            err.__type = 0;
                            callback(error, null);

                        }
                        else {
                            var album = fields.album;
                            var img = files.img;
                            if (parseInt(img.size) > form.maxFieldsSize) {
                                fs.unlink('./' + img.path, (error)=> {
                                    if (error) {
                                        error.__type = 0;
                                    }
                                    else {
                                        error = new Error(`图片尺寸超过${form.maxFieldsSize}B`);
                                        error.__type = 1;
                                    }
                                    callback(error, null);

                                })
                            }
                            else {
                                fs.rename('./' + img.path, `./Upload/Album/${album}/${createTimeStamp() + img.name}`, (error)=> {
                                    if (error) {
                                        error.__type = 0;
                                        callback(error, null);
                                    }
                                    else {
                                        callback(null, album);
                                    }
                                })
                            }
                        }
                    });
                }
            })
        }
        else {
            form.parse(req, function (err, fields, files) {
                if (err) {
                    err.__type = 0;
                    callback(error, null);

                }
                else {
                    var album = fields.album;
                    var img = files.img;
                    if (parseInt(img.size) > form.maxFieldsSize) {
                        fs.unlink('./' + img.path, (error)=> {
                            if (error) {
                                error.__type = 0;
                            }
                            else {
                                error = new Error(`图片尺寸超过${form.maxFieldsSize}B`);
                                error.__type = 1;
                            }
                            callback(error, null);

                        })
                    }
                    else {
                        fs.rename('./' + img.path, `./Upload/Album/${album}/${createTimeStamp() + img.name}`, (error)=> {
                            if (error) {
                                error.__type = 0;
                                callback(error, null);
                            }
                            else {
                                callback(null, album);
                            }
                        })
                    }
                }
            });
        }
    })
}
function createTimeStamp() {
    //生成由 年月日时分秒+“0——f”内任意6位构成的随机数，前面14位，后面6位，共20位随机数
    var date = new Date();
    var timestamp = sd.format(date, 'YYYYMMDDHHmmss');
    var random = '0123456789abcdef';
    var length = random.length;
    for (var i = 0; i < 6; i++) {
        timestamp += random[Math.floor(Math.random() * length)];
    }
    return timestamp;
}
module.exports = {
    getAlbumsSync,
    getPhotos,
    getPhoto,
    uploadImg
}