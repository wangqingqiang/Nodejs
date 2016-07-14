/**
 * Created by wqq on 2016/7/14.
 */
function showIndex(req,res){
    res.render('albumIndex');
}
function show404(req,res){
    res.render('404')
}

module.exports={
    showIndex,
    show404
}