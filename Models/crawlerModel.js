/**
 * Created by wqq on 2016/7/22.
 */
var http = require('http');
var querystring = require('querystring');

function getJobs(yx,city,pageIndex,positionName,callback){
    var positionResult='';

    var postData = querystring.stringify({
        'first': false,
        'pn': pageIndex,
        'kd': positionName
    })
    var options = {
        protocol: 'http:',
        hostname: 'www.lagou.com',
        port:80,
        path: `/jobs/positionAjax.json?px=default&yx=${yx}&city=${city}&needAddtionalResult=false`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length,
        }
    }
    var req = http.request(options, (res) => {
        //console.log(`STATUS: ${res.statusCode}`);
        //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            positionResult += chunk;
        });
        res.on('end', () => {
            callback(null,positionResult);
        })
    });
    req.on('error', (error) => {
        callback(error,null);
    });
    req.write(postData);
    req.end();
}
citys=['北京','上海','广州','深圳','杭州','天津','成都','西安','南京','苏州'];
module.exports={
    getJobs,
    citys
}
