$(document).ready(function(){
   if($.formValidator){
	$.formValidator.initConfig({autotip:true,onerror:function(msg){alert(msg);}});
	$("#guest_name").formValidator({onshow:"必填",onfocus:"请输入联系人",oncorrect:"输入正确"}).inputValidator({min:1,max:100,onerror:"请输入联系人"});
	//$("#guest_tel").formValidator({onshow:"必填",onfocus:"请输入联系电话，例如010-67312300",oncorrect:"谢谢"}).inputValidator({min:1,onerror:"电话不能为空"}).regexValidator({regexp:"tel",datatype:"enum",onerror:"电话号码格式不正确"});
	$("#guest_tel").formValidator({onshow:"必填",onfocus:"请输入联系电话,手机以13、15、18开头，电话如010-25684568",oncorrect:"输入正确"}).inputValidator({min:1,onerror:"电话不能为空"}).regexValidator({regexp:"phonetzzy",datatype:"enum",onerror:"电话格式不正确"});
	
	$("#guest_addr").formValidator({onshow:"必填",onfocus:"请输入联系地址",oncorrect:"输入正确"}).inputValidator({min:1,max:1000,onerror:"请输入联系地址"});
	$("#guest_email").formValidator({onshow:"必填",onfocus:"请输入正确的邮箱",oncorrect:"恭喜您,该邮箱可以注册"}).inputValidator({min:6,max:100,onerror:"邮箱格式有误"}).regexValidator({regexp:"^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$",onerror:"邮箱格式有误"});
	$("#guest_title").formValidator({onshow:"必填",onfocus:"请输入留言主题",oncorrect:"输入正确"}).inputValidator({min:1,max:1000,onerror:"请输入留言主题"});
	$("#guest_body").formValidator({onshow:"必填",onfocus:"请输入留言内容",oncorrect:"输入正确"}).inputValidator({min:1,max:1000,onerror:"请输入留言内容"});
	$("#Vcode").formValidator({onshow:"必填",onfocus:"请输入验证码",oncorrect:"谢谢"}).inputValidator({min:1,onerror:"验证码不能为空"});
   }
  })