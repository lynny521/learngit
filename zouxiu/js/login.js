/**
 * Created by Administrator on 2016/7/14.
 */
var tmp=localStorage.getItem("flag");
if(tmp!=null&&tmp==1){
	$(".register").parent().find("h1").html("注册");
	$(".register").html("登录");
	$(".main2").addClass("hidden");
    $(".main1").removeClass("hidden");
}
touch.on('.flag', 'tap', function(ev){
	var flag=0;
    if($(this).hasClass("register")){
    	flag=1;
 		$(this).addClass("login").removeClass("register");
    	$(this).html("登录");
    	$(this).parent().find("h1").html("注册");
    	$(".main2").addClass("hidden");
    	$(".main1").removeClass("hidden");
    }else{
    	flag=0;
    	$(this).addClass("register").removeClass("login");
	    $(this).html("注册");
	    $(this).parent().find("h1").html("登录");
	    $(".main1").addClass("hidden");
    	$(".main2").removeClass("hidden");
    } 
    localStorage.setItem("flag",flag);
});

function register(){
	var acc="",_psd1="",_psd2,obj;
	var reg=/^[a-zA-z][a-zA-Z0-9_]{2,9}$/g;
	var reg1=/^(?=.*?[a-zA-Z])(?=.*?[0-6])[!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~A-Za-z0-9]{6,16}$/;
	$("#account").blur(function(){
		acc = $(this).val();
		if(acc==""){
			$(".main1 span:first").html("用户名不能为空");
		}else if(!reg.test(acc)){
			$(".main1 span:first").html("请输入2~9位以字母开头的数字或字符串");
		}else{
			$(".main1 span:first").html("");
		}
	});
	$("#psd1").blur(function(){
		_psd1=$(this).val();
		if(_psd1==""){
			$(".main1 span").eq(1).html("密码不能为空");
		}else if(!reg1.test(_psd1)){
			$(".main1 span").eq(1).html("请输入6~16位以字母开头的数字或字符串");
		}else{
			$(".main1 span").eq(1).html("");
		}
	});
	$("#psd2").blur(function(){
		_psd2=$(this).val();
		if(_psd2==""){
			$(".main1 span").eq(2).html("密码不能为空");
		}else if(_psd1!=_psd2){
			$(".main1 span").eq(2).html("两次密码不一致，请重新输入");
		}else if(acc!=""&&_psd1!=""&&_psd2!=""){
			$(".main1 span").eq(2).html("");
            touch.on("#btn1","tap",function(){
                $.ajax({
                    url:"http://datainfo.duapp.com/shopdata/userinfo.php",
                    type:"post",
                    data:{status:"register",userID:acc,password:_psd1},
                    success:function(data){
                        if(data==1){
                            $(".main1 span").eq(3).html("恭喜您，注册成功");
                            obj={};
                            obj.name=acc;
                            obj.psd=_psd1;
                            localStorage.mes=JSON.stringify(obj);
                            location.href="index.html";
                        }else if(data==0){
                            $(".main1 span").eq(3).html("您注册的用户名已被其他用户使用");
                        }
                    },
                    error:function(){
                        alert("error")
                    }
                });
            });
		}
	});
}
register();


function login(){
    var name="",psd="",obj;
    $("#name").blur(function(){
        name=$("#name").val();
        if(name==""){
            $(".main2 span:first").html("用户名不能为空");
        }else{
            $(".main2 span:first").html("");
        }
    });
    $("#psd").blur(function(){
        psd=$("#psd").val();
        if(psd==""){
            $(".main2 span").eq(1).html("密码不能为空");
        }else if(psd!=""&&name!=""){
            $(".main2 span").eq(1).html("");
            touch.on("#btn","tap",function(){
                $.ajax({
                    url:"http://datainfo.duapp.com/shopdata/userinfo.php",
                    type:"post",
                    data:{status:"login",userID:name,password:psd},
                    success:function(data){
                        obj={};
                        obj.name=name;
                        obj.psd=psd;
                        if($("#ok").is(":checked")){
                            localStorage.mes=JSON.stringify(obj);
                        }else{
                            sessionStorage.mes=JSON.stringify(obj);
                        }
                        location.href="index.html";
                    },
                    error:function(){
                        alert("error")
                    }
                });
            });
        }
    });
}
login();