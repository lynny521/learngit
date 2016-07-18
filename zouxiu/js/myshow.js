/**
 * Created by Administrator on 2016/7/9.
 */
var _h=$(window).height();
$(".myshow").css({
    height:_h-94
});
var mes=localStorage.getItem("mes")||sessionStorage.getItem("mes");
mes=(mes==false?[]:JSON.parse(mes));
if(mes!=null){
    $(".mes p").eq(0).find("b").html(mes.name);
    $(".mes p:last-of-type").addClass("hidden");
}else{
    $(".mes p:last-of-type").removeClass("hidden");
}
touch.on(".back","tap",function(){
   window.history.go(-1);
});
touch.on("#login","tap",function(){
    localStorage.setItem("flag",0);
    window.location.href="login.html";
});
touch.on("#register","tap",function(){
    localStorage.setItem("flag",1);
    window.location.href="login.html";
});