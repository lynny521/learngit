/**
 * Created by Administrator on 2016/7/15.
 */
touch.on(".back","tap",function(){
    window.history.go(-1);
});
var _id=window.location.href.split("?n=")[1];
$(".footer a").eq(0).attr("href","details.html?n="+_id);
$.ajax({
    url:"http://datainfo.duapp.com/shopdata/getGoods.php",
    type:"post",
    data:{goodsID:_id},
    dataType:"jsonp",
    success:function(data){
        operateDOM(data);
    },
    error:function(){
        alert("未知错误！")
    }
});
function operateDOM(dat){
    var tmp=null;
    for(var key in dat){
        tmp=dat[key]["goodsBenUrl"].replace("[","").split(",")[0];
        tmp=tmp.substring(1,tmp.length-1);
        $("#scroller img").attr("src",tmp);
        $("#scroller p").eq(0).html(dat[key]["goodsName"]).css("margin","2vh 3vw");
        $("#scroller p").eq(1).html(dat[key]["detail"]);
    }
}