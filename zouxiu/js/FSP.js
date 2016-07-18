/**
 * Created by Administrator on 2016/7/8.
 */
var mySwiper = new Swiper('.swiper-container', {
    paginationClickable :true,
    pagination: '.swiper-pagination',
    effect : 'coverflow',
    onSlideChangeEnd: function (swiper) {
        var _index=swiper.activeIndex;
        if(_index==1){
            $(".page2").find("h1").addClass("bounceInDown");
        }
        if(_index==2){
            $(".page3 img").eq(0).addClass("rubberBand");
        }
    }
});

function addEvent(_obj){
    _obj.addEventListener("webkitAnimationEnd",function(){

    });
}
/*
document.addEventListener("touchmove",function(e){
    var evt=e||window.event;
    alert("ok")
});
*/
