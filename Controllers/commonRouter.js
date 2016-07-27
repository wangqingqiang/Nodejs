/**
 * Created by wqq on 2016/7/26.
 */
var formidable = require('formidable');
var dbModel = require('../Models/dbModel.js');

function showLoginPage(req, res, next) {
    var options = {
        root: './',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    res.sendFile('./Views/login.html', options, (error)=> {
        if (error) {
            console.log(error);
            res.render('500');
        }
    })
}

function doRegister(req, res, next) {
    console.log(req.session.name);
    var form = formidable.IncomingForm();
    form.parse(req, function (error, fields, files) {
        if (error) {
            res.redirect('/500error');
        } else {
            var options = {
                'name': fields.name,
                'password': fields.password
            };
            dbModel.insertOne('user', options, function (error, result) {
                    if (error) {
                        console.log(error);
                        res.redirect('/500error');
                    } else {
                        console.log('插入数据成功');
                        //console.log(result);
                        req.session.name = fields.name;
                        res.json({'result': 'success'});
                    }
                }
            )
        }
    })
}

module.exports = {
    showLoginPage,
    doRegister
}