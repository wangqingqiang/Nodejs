/**
 * Created by wqq on 2016/7/22.
 */
var crawlerModel = require('../Models/crawlerModel.js');
var formidable=require('formidable');

function showCrawlerPage(req, res) {
    res.status(200);
    res.render('./crawler/crawler',{'citys':crawlerModel.citys,'salary':crawlerModel.salary});
}
function getJobList(req,res){
    var form=formidable.IncomingForm();
    form.parse(req,function(error,fields,files){
        if(error){
            res.render('500');
        }else{
            crawlerModel.getJobs(fields.yx,fields.city,fields.pageIndex,fields.positionName,(error,data)=>{
                if(error){
                    res.render('500');
                }else{
                    res.json(data);
                }
            })
        }
    })
}

module.exports = {
    showCrawlerPage,
    getJobList
}