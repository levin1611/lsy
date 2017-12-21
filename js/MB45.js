$(document).ready(function(){
   if($.formValidator){
	$.formValidator.initConfig({autotip:true,onerror:function(msg){alert(msg);}});
	$("#casher").formValidator({onshow:"请输入提现人姓名",onfocus:"请输入提现人姓名",oncorrect:"输入正确"}).inputValidator({min:1,max:10,onerror:"请输入提现人姓名"});
	$("#cashmobile").formValidator({onshow:"请输入正确的手机号码",onfocus:"请输入正确的手机号码,以13,15,18开头",oncorrect:"输入正确"}).inputValidator({min:11,max:11,onerror:"手机号码有误"}).regexValidator({regexp:"mobile",datatype:"enum",onerror:"手机号码格式不正确"});
	$("#cashtype").formValidator({onshow:"请选择提现方式",onfocus:"请选择提现方式",oncorrect:"输入正确"}).inputValidator({min:1,onerror:"请选择提现方式"});
	$("#cashcard").formValidator({onshow:"请输入银行卡号",onfocus:"请输入银行卡号",oncorrect:"输入正确"}).inputValidator({min:1,max:20,onerror:"请输入正确的银行卡号"}).regexValidator({regexp:"num",datatype:"enum",onerror:"请输入正确的银行卡号"});
	$("#cashmoney").formValidator({onshow:"请选择提现金额",onfocus:"请选择提现金额",oncorrect:"输入正确"}).inputValidator({min:1,onerror:"请输入正确的提现金额"});
	$("#qureycard").formValidator({onshow:"请再输入银行卡号",onfocus:"请再输入银行卡号",oncorrect:"输入正确"}).inputValidator({min:1,max:20,onerror:"请再输入一次银行卡号"}).compareValidator({desid:"cashcard",operateor:"=",onerror:"两次卡号输入不一致"});
	$("#cashdesc").formValidator({empty:true,onshow:"请输入提现备注",onfocus:"请输入提现备注",oncorrect:"输入正确",onempty:"您真的不想留下提现备注？"}).inputValidator({min:1});
	
	$("#Vcode").formValidator({onshow:"必填",onfocus:"请输入验证码",oncorrect:"谢谢"}).inputValidator({min:1,onerror:"验证码不能为空"});
	$("#cashmoney").change(blurMoney);
   }
  })

var ifvar;
function blurMoney(){//验证提现金额
	if($("#cashmoney").val()!=''){
		$.ajax({
		    type : "get",
			url : ajaxURL+"?act=checkmoney&cashmoney="+$("#cashmoney").val(),
			//datatype : "json",
			success : function(data){
	            if( data < 0 ){
	            	$("#cashmoneyTip").html("您账户中没有足够的金额");
	            	//$("#cashmoneyTip").css("display","block");
					$("#cashmoneyTip").removeClass("onCorrect");
	            	$("#cashmoneyTip").addClass("onError");
	            	ifvar=false;
	               return false;
				}else{
					//$("#cashmoneyTip").css("display","none");
					$("#cashmoneyTip").removeClass("onError");
					ifvar=true;
	               return true;
				}
			}
		})
		
	}
	
	
}
