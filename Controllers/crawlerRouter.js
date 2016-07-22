/**
 * Created by wqq on 2016/7/22.
 */
var crawlerModel = require('../Models/crawlerModel.js');

function showCrawlerPage(req, res) {
    res.status(200);
    res.render('./crawler/crawler',{'citys':crawlerModel.citys});
}

module.exports = {
    showCrawlerPage
}