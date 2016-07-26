/**
 * Created by wqq on 2016/7/1.
 */
const net = require('net');
var server = net.createServer(serverConnection);
server.listen(8080, (error)=> {
    if (error) {
        console.log('端口8080已经被占');
    }
    else {
        console.log('端口8080分配成功');
    }
})
function serverConnection(socket) {
    console.log('someone is connecting');
    console.log(socket.address().address);

}