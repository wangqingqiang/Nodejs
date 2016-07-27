/**
 * Created by wqq on 2016/7/27.
 */
var settings = require('../settings.js');
var dburl = settings.dburl;

var MongoClient = require('mongodb').MongoClient;

// Connection URL
// Use connect method to connect to the Server
function _connectDB(callback) {
    MongoClient.connect(dburl, function (error, db) {
        callback(error,db);
    })
}

function insertOne(collectionName,options,callback){
    _connectDB(function(error,db){
        if(error){
            callback(error,null);
        }else {
            db.collection(collectionName).insertOne(options,function(error,result){
                callback(error,result);
                db.close();
            })
        }
    })
}

module.exports={
    insertOne
}