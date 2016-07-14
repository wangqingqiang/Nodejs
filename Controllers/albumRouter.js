/**
 * Created by wqq on 2016/7/14.
 */
var albumModel = require('../Models/albumModel.js');

function showIndex(req, res) {
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
        res.render('albumIndex', {albums: albums});
    } else {
        res.status(404);
        res.render('404');
    }
}
function showAlbum(req, res) {
    var album = req.params.album;
    albumModel.getPhotos(album, function (error, photos) {
        if (error) {
            console.log(error);
        }
        else {
            res.render('albumPhoto', {album: album, photos: photos});
        }
    })
}
function showPhoto(req,res){
    var pathname='/upload/album/'+req.params.albumName+'/'+req.params.id;
    console.log(pathname);
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
            console.log('Sent:', fileName);
        }
    });

}
function show404(req, res) {
    res.status(404);
    res.render('404')
}

module.exports = {
    showIndex,
    show404,
    showAlbum,
    showPhoto
}