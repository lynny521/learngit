/**
 * Created by Administrator on 2016/7/8.
 */
var temp=localStorage.getItem("gwc");
if(temp!=null){
    $(".gwc").find("span").html(temp);
}else{
    $(".gwc").find("span").html(0);
}
$.ajax({
    url:"http://datainfo.duapp.com/shopdata/getBanner.php",
    type:"post",
    dataType:"jsonp",
    success:function(data){
        solve(data);
    },
    error:function(){
        alert("error");
    }
});

function solve(dat){
    var tmp="";
    var arr=[],i= 0,arr1=[];
    for(var key in dat){
        tmp=dat[key]["goodsBenUrl"];
        tmp=tmp.replace("[","");
        tmp=tmp.split(",");
        arr[i]=tmp[0];
        arr1[i]=dat[key]["goodsID"];
        i++;
    }
    operate(arr,arr1);
}
function operate(_arr,_arr1){
    var _len=_arr.length;
    var _html="";
    for(var i=0;i<_len;i++){
        _html+="<div class=\"swiper-slide\"><a href=\"details.html?n="+_arr1[i]+"\"><img src="+_arr[i]+"\"></a></div>";
    }
    $(".swiper-wrapper").html(_html);
    var mySwiper = new Swiper('.swiper-container',{
        initialSlide :0,
        pagination: '.swiper-pagination',
        paginationClickable :true,
        autoplay : 1000,
        speed:500,
        autoplayDisableOnInteraction : false,
    });
}

var _h=$(window).height(),tmp;
$(".main").css({
    height:_h-144
});

$.ajax({
    url:"http://datainfo.duapp.com/shopdata/getGoods.php",
    type:"post",
    async:false,
    dataType:"jsonp",
    success:function(data){
        createList(data);
    },
    error:function(){
        alert("error");
    }
});
function createList(dat){
    var tmp,tmp1;
    for(var key in dat){
        tmp1=dat[key]["discount"];
        if(tmp1!=0){
            tmp1=[dat[key]["price"]/dat[key]["discount"]*10];
            tmp1=Number(tmp1).toFixed(2);
        }else{
            tmp1=dat[key]["price"];
        }
        tmp=$(".goods").eq(0).clone().appendTo(".main ul");
        tmp.find("img").attr("src",dat[key][3]);
        tmp.find("a").html(dat[key][2]).attr("href","details.html?n="+dat[key]["goodsID"]);
        tmp.find("p b").html("￥ "+dat[key]["price"]);
        tmp.find("p del").html("￥ "+tmp1);
        tmp.find("p i").html(dat[key]["discount"]+" 折");
        tmp.find("span").attr("id",dat[key]["goodsID"]);
    }
    var myScroll;
    myScroll = new iScroll('wrapper');
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
}
var user=localStorage.getItem("mes")||sessionStorage.getItem("mes");
user=(user==false?[]:JSON.parse(user));
if(user!=null){
    $.ajax({
        url:"http://datainfo.duapp.com/shopdata/getCar.php",
        data:{userID:user.name},
        type:"post",
        dataType:"jsonp",
        success:function(data){
            if(data.length!=0){
                $(".gwc").find("span").html(data.length);
            }
        },
        error:function(){
            alert("没有查询到相关信息");
        }
    });
}
touch.on(".list","tap",".haha",function(){
    var obj={};
    if(user!=null){
        var tmp=localStorage.getItem("gwc")==null?[]:JSON.parse(localStorage.getItem("gwc"));
        $.ajax({
           url:"http://datainfo.duapp.com/shopdata/updatecar.php",
           type:"post",
            data:{
                userID:user.name,
                goodsID:$(this).attr("id"),
                number:1
            },
            success:function(data){
                alert("加入购物车成功！");
                var tmp1=$(".gwc").find("span").html();
                tmp1++;
                $(".gwc").find("span").html(tmp1);
                localStorage.setItem("gwc",tmp1);
            },
            error:function(){
                alert("fail");
            }
        });

         /*tmp.push(obj);
        localStorage.gwc=JSON.stringify(tmp);*/
    }else{
        alert("亲，需要先登录才能使用我们的购物车功能吆！");
    }

    //localStorage.setItem($(this).attr("id"));
});
/*$(".list").delegate(".haha","tap",function(){
    alert(12345);
});*/

/*document.addEventListener("touchstart",function(e){
   var evt = e||window.event;
    _y += evt.touches[0].clientY;
});
document.addEventListener("touchmove",function(e){
    var evt = e||window.event;
    _y1 = evt.touches[0].clientY;
    $(".main").css({
        transform:"translateY("+(_y1-_y)+"px)"
    });
});
document.addEventListener("touchend",function(){
    _y = Math.abs(_y1-_y);
});
/!*$(".main").get(0).addEventListener("touchmove",function(e){
    var evt = e||window.event;
    console.log(evt.touches[0].pageY);
});*!/*/

