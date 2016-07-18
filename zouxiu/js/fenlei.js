/**
 * Created by Administrator on 2016/7/9.
 */
var _h=$(window).height();
$(".con").css({
    height:_h-144
});
$.ajax({
    url:"http://datainfo.duapp.com/shopdata/getclass.php",
    type:"post",
    async:false,
    dataType:"json",
    success:function(data){
        var tmp,_list;
        for(var key in data){
            tmp=$("#scroller .copy").eq(0).clone().removeClass("hidden").appendTo("#scroller ul");
            _list=data[key][1];
            tmp.find("span").html(_list);
        }
        var myScroll;
        myScroll = new iScroll('wrapper');
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    },
    error:function(){
        alert("error");
    }
});

touch.on("#scroller","tap",".aaa",function(){
    var t;
    $(this).parent().length==0?t=$(this):t=$(this).parent();
    if(t.next().css("display")=="block"){
        t.find("img").css({
            transform:"rotate(0deg)"
        });
    }else{
        t.find("img").css({
            transform:"rotate(90deg)"
        });
    }
    t.next().slideToggle();
});
/*for(var i=0;i<_len;i++){

}*/
