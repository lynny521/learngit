/**
 * Created by Administrator on 2016/7/15.
 */
touch.on(".back","tap",function(){
    window.history.go(-1);
});
var _id=window.location.href.split("?n=")[1];
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
function operateDOM(obj){
    for(var key in obj){
        $(".footer a").eq(1).attr("href","xiangqing.html?n="+_id);
        var discount=obj[key]["discount"];
        $(".content img").attr("src",obj[key]["goodsListImg"]);
        $(".content h2 b").html("￥ "+obj[key]["price"]);
        $(".content h2").append(obj[key]["goodsName"]);
        $(".content aside").find("em").html(discount+" 折");
        if(discount==0){
            discount=obj[key]["price"];
        }else{
            discount=Number(obj[key]["price"]/discount*10).toFixed(2);
        }
        $(".content aside del").html("￥ "+discount);
        $(".content aside b").html(obj[key]["buynumber"]);
    }
}