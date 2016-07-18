/**
 * Created by Administrator on 2016/7/17.
 */
touch.on(".back","tap",function(){
    window.history.go(-1);
});
var user=localStorage.getItem("mes")||sessionStorage.getItem("mes");
user=(user==false)?[]:JSON.parse(user);
if(user!=null){
    console.log(user.name);
    chaxun(operate);
}else{
    alert("请先登录");
}
function chaxun(_fun){
    $.ajax({
        url:"http://datainfo.duapp.com/shopdata/getCar.php",
        data:{userID:user.name},
        type:"post",
        dataType:"jsonp",
        success:function(data){
            if(data.length!=0){
                $(".cate1").removeClass("hidden");
                $(".cate").addClass("hidden");
                $(".gwc").find("span").html(data.length);
                _fun(data);
            }else{
                $(".cate").removeClass("hidden");
                $(".cate1").addClass("hidden");
                $(".num span").html(0);
                $(".num b").html("0.00");
            }
        },
        error:function(){
            alert("没有查询到相关信息");
        }
    });
}

function operate(dat){
    $(".gwc").find("span").html(dat.length);
    $(".num").find("span").html(dat.length);

}