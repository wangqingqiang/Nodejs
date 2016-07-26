/**
 * Created by wqq on 2016/7/26.
 */
function showLoginPage(req,res,next){
    var options = {
        root: './',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    res.sendFile('./Views/login.html',options,(error)=>{
        if(error){
            console.log(error);
            res.render('500');
        }
    })
}

module.exports={
    showLoginPage
}