/**
 * Created by wqq on 2016/7/14.
 */
var albumModel = require('../Models/albumModel.js');

function showAlbumList(req, res) {
    //res.render('albumIndex');
    //albumModel.getAlbums(function(error,albums){
    //    if(error){
    //        console.log(error);
    //        res.status(404);
    //        res.render('404');
    //    }else {
    //        console.log(albums);
    //        res.send(albums.toString());
    //
    //    }
    //})
    var albums = albumModel.getAlbumsSync();
    if (albums.length) {
        res.render('./album/albumIndex', {albums: albums});
    } else {
        res.status(404);
        res.render('404');
    }
}
function showAlbumPhoto(req, res,next) {
    var album = req.params.albumName;
    albumModel.getPhotos(album, function (error, photos) {
        if (error) {
            console.log(error);
            console.log(`没有${album}相册，执行下一个路由`);
            next();
        }
        else {
            res.render('./album/albumPhoto', {album: album, photos: photos});
        }
    })
}
function getPhoto(req,res){
    var pathname='/Upload/Album/'+req.params.albumName+'/'+req.params.id;
    //console.log(pathname);
    //albumModel.getPhoto(pathname,function(error,data){
    //    if(error){
    //        console.log(error);
    //    }else {
    //
    //    }
    //})
    var options = {
        root: './',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    var fileName = pathname;
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        else {
           // console.log('Sent:', fileName);
        }
    });

}
function show404(req, res) {
    res.status(404);
    res.render('404')
}
function showUploadPage(req,res){
    var albums=albumModel.getAlbumsSync();
res.render('./album/upImg',{albums:albums});
}
function uploadImg(req,res){

    albumModel.uploadImg(req,function(error,album){
        if(error){
            res.render('404');
        }else {
            res.redirect(`/${album}`);
        }
    })
}

module.exports = {
    showAlbumList,
    show404,
    showAlbumPhoto,
    getPhoto,
    showUploadPage,
    uploadImg
}