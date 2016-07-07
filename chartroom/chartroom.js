/**
 * Created by Administrator on 2016/7/7 0007.
 */
var net = require('net');
var fs = require('fs');
var path = require('path');

var server = net.createServer((socket)=> {
    fs.readFile(path.join(__dirname, './index.html'), (err, data)=> {
        //socket.writeHead(200, {'content-type': 'text/html'})
        socket.write(data);
        //socket.end();
    })
    socket.on('data',(chunk)=>{
        console.log(chunk.toString());
        socket.write('我收到消息了')
    })
    socket.on('error',(err)=>{console.log(err)});
});
server.listen(8080, (err)=> {
    if (err) throw err;
    console.log('服务器已在8080端口成功启动');
})