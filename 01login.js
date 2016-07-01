/**
 * Created by wqq on 2016/7/1.
 */
var hello = 'Hello,Please input your name\n';
var user = {'admin': '12345', 'user1': '123123'};
var isInputUserName = true;
var userName;

process.stdout.write(hello);
process.stdin.on('data', function (input) {
    //process.stdout.write(user); user不是stdout输出流类型，所以这样输出会报错，user.toString()
    //stdin输入为一个流(二进制数组），结果为object,toString()变成字符串
    //同时输入的时候我们按的回车键也会被输入进去，所以要trim()
    //console.log(input instanceof Object,typeof input );   true ,'object'
    //利用反引号``，tab键上面那个，${}实现占位符
    input = input.toString().trim();
    if (isInputUserName) {
        if (Object.keys(user).indexOf(input) == -1) {
            process.stdout.write(`Sorry,your name is wrong:${input},please input again!\n`);
            isInputUserName = true;
        }
        else {
            isInputUserName = false;
            userName=input;
            process.stdout.write('Please input your password'+'\n');

        }
    }
    else {
        var password=user[userName];
        if(input===password){
            process.stdout.write(`Hello ${userName},Welcome to our system!\n`);
        }
        else{
            process.stdout.write('password is wrong,please input again'+'\n');
        }
    }
})
