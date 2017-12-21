
var ajaxURL=live_site+'/ajax.php';
function setHomePage(){
	var obj=document.body;
    var aUrls=document.URL.split("/");
    var vDomainName="http://"+aUrls[2]+"/";
    try{//IE
        obj.style.behavior="url(#default#homepage)";
        obj.setHomePage(vDomainName);
    }catch(e){//other
        if(window.netscape) {//ff
            try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }
            catch (e) {
                    alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入about:config并回车\n然后将[signed.applets.codebase_principal_support]设置为'true'");
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage',vDomainName);
         }
    }
}
function addFavorite(){
    var vDomainName=document.URL;
    var description=document.title;
    try{//IE<=7
        window.external.AddFavorite(vDomainName,description);
    }catch(e){
		try{//FF
        	window.sidebar.addPanel(description,vDomainName,"");
		}
		catch(e){//IE=8
			alert("您可能使用IE8，请使用Ctrl+D进行添加");
		}
    }
}
function showGift(id){
	
	$.get(live_site+'/ajaxshow.php?gauto_id='+id,function(data){
		
		var txt = $("#hidden_form").html= data;
		$.prompt(txt,{
			submit: getGift,
			buttons: {"我要兑换":1,"关闭":false},
			top:10
		 })
       
        
    })	
}


//积分换礼
//“我要兑换”按钮事件
function showGift(id){//2012-08-22 刘学改
	
	$.get(live_site+'/index.php?com=com_pcenter&method=save&task=change&orderoption='+id,function(data){
		//var txt = $("#hidden_form").html= data;
		if(data=='ok'){
			var url = live_site+'/index.php?com=com_pcenter&method=index&app=intgift&task=view&auto_id='+id;
			location.href=url;
		}else{
			$.prompt(data,{
				buttons: {'确定':false},
				top:200
			 })
		}
 
})	
}


//提交兑换信息
function giftOrder(form){
	var formdata = $("#"+form).serialize();
	var url = live_site+'/index.php?'+formdata;
	$.get(live_site+'/index.php?'+formdata,function(data){
		
		//var txt = $("#hidden_form").html= data;
		$.prompt(data,
				{
			    callback: function(){
			    	location.href='index.php?com=com_pcenter&method=index&app=intrecord';
			    },
			    top:200
				})
	})	
return ;
}



function callback_reload(){
		location.reload();
}

function fCopyToClicp(v){
try{
 window.clipboardData.setData('text',v);
	$.prompt('已复制到剪贴板了，你可以粘贴到QQ/MSN上发送给您的好友',{top:200});
}catch(e){
 	$.prompt('您的浏览器不支持复制到剪贴板，您可以手动选择网址复制',{top:200});
}
} 
//全选
function CheckAll(state){
	var form = document.listform;
	if(state) form.chkall.click();
	for (var i=0;i<form.elements.length;i++){
		var e = form.elements[i];
		if (e.name != 'chkall')
			e.checked = form.chkall.checked;
	}
}
//单条删除
function Form_Del(_id,task){ 
	var theForm = document.listform;
	//theForm.chkall.checked = false;
	//CheckAll();
	var _chkbox = theForm.elements['cid[]'];
	if(!_chkbox.length) {
		_chkbox.checked = true;
	} else {
		_chkbox[_id].checked = true;
	}
	
	$.prompt('确定要删除吗?',{top:200,
		submit:function(v){
			if(!v){
				if(!_chkbox.length) {
					_chkbox.checked = false;
				}else{
					_chkbox[_id].checked = false;
				}
			}else{
				theForm.task.value = task;
				theForm.submit();
			}
		},
		buttons: {"确定":1,"取消":false}
	});
	
}
function msg_del(){
	$.prompt('确定要删除吗？',{top:200,callback:function(v){
		if(v){
			$("#msg_form").submit();
		}
	},
	buttons: {"确定":1,"取消":false}
	})

}
//多条删除
function Form_Remove(task){
	var $check=$('input:checked');
	if(!$check.size()){
		$.prompt('请先选择条目',{top:200,buttons:{"确定":false}});
		return;
	}
	var theForm = document.listform;
	$.prompt('确定要删除吗?',{top:200,
		submit:function(v){
			if(!v)return;
			theForm.task.value = task;
			theForm.submit();
		},
		buttons: {"确定":1,"取消":false}
	});
}  

  
  
function Form_Submit(formid){
	$('#'+formid).submit();
	
}
function get_password(){
	var content_user=$('#content_user').val();
    var content_mobile=$("#phone").val();
    var Vcodes=$("#Vcodes").val();
     if(content_user!='' && content_mobile!='' && Vcodes!=''){
    	$('#frm_getpass').submit();
      }else{
    	  $.prompt("请填写完整信息以确保您账户的安全",{top:200,
  			
  			buttons: {"确定":true}
  		});
      }    
          
}
function send_randNum(){
	//判断必须输入用户名及手机号
	var content_user=$('#content_user').val();
    var content_mobile=$("#phone").val();
	if(content_user!="" && content_mobile!=""){
		var params="com=com_passport&method=fail&task=getRandNum&content_user="+content_user+"&content_mobile="+content_mobile;
		$.ajax({
			url: live_site+"/index.php?ajax=1",
			data:params,
			success: function(data){
				$.prompt(data,{top:200,
					
					buttons: {"确定":true}
				});
			}
			
		});
	}else{
		$.prompt("请输入用户名和手机号",{top:200,
			
			buttons: {"确定":true}
		});
	}
	
}



function Form_Reset(formid){
	$('#'+formid).get(0).reset();
}
function reviewForm(){
	var info=$("#review_body").val();
	var login_name = $("#login_name").val();
	var user=$("#IDS").val();
	var pwd=$("#PWDS").val();
	var re = / |<br>|<br \/>/g;
	if(Trim(info.replace(re,"")).length < 1){
		$.prompt("内容不能为空！",{top:200});
		return false;
	}
	if(login_name==''){
		if(Trim(user.replace(re,"")).length < 1){
			$.prompt("用户名不能为空，请输入！",{top:200});
			return false;
		}
		if(Trim(pwd.replace(re,"")).length < 1){
			$.prompt("密码不能为空，请输入！",{top:200});
			return false;
		}
	}
	var params=$("#frm_review").serializeArray();
	$.ajax({
		   type: "post",
		   url: live_site+"/index.php?ajax=1",
		   data:params,
		   dataType:'json',
		   success: function(data){
			  switch(data[0]){
				   case '1'://提交后页面刷新
					 $.prompt(data[1],{top:200,callback:function(){
						 if(data[2])
							window.location=data[2];
						 else 
							location.reload();
					 }
					 }); 
					 break;
				   case '-1'://错误刷新验证码
					 $.prompt(data[1],{top:200,callback:function(){
					
						$("#imgcode").attr("src",live_site+'/img.php?'+Math.random());
					 }
					
					 });
					 break;
				   case '-2':
						 $.prompt(data[1],{top:200,callback:function(){
							$("#imgcode").attr("src",live_site+'/img.php?'+Math.random());
						 }
						
						 });
						 break;				 
				   default:
					 $.prompt('服务器正忙，稍后请重试',{top:200});

			   }
		   }
		});
}
function Trim(str){ 
    return str.replace("/(^\s*)|(\s*$)/g","");
}

var isjob;
$(document).ready(function(){	
if($.formValidator && !isjob){
	$.formValidator.initConfig({autotip:true,onerror:function(){return false;}});

	//$(".jqzoom").jqzoom({title : false,zoomWidth: 300,zoomHeight: 300});
	$("#ID").formValidator({onshow:"必填",onfocus:"6-20个由数字、26个英文字母或者下划线组成",oncorrect:"恭喜您,该用户名可以注册"}).inputValidator({min:6,max:20,onerror:"用户名长度有误"}).regexValidator({regexp:"\\w+$",onerror:"格式不正确"})
	    .ajaxValidator({
	    type : "get",
		url : ajaxURL+"?act=register",
		datatype : "json",
		success : function(data){	
            if( data == "0" )
			{
                return true;
			}
            else
			{
                return false;
			}
		},
		error: function(){alert("服务器没有返回数据，可能服务器忙，请重试");},
		onerror : "该用户名已经被使用，请更换",
		onwait : "正在对用户名进行合法性校验，请稍候..."
	});
	
	$("#PWDB").formValidator({onshow:"必填",onfocus:"请输入您的原始密码",oncorrect:"谢谢"}).inputValidator({min:6,max:32,onerror:"原始密码不能为空"});
	$("#PWD").formValidator({onshow:"必填",onfocus:"密码6-32个字符",oncorrect:"密码合法"}).inputValidator({min:6,max:32,onerror:"密码不正确,请确认"});
	$("#PWD2").formValidator({onshow:"必填",onfocus:"再次输入一遍您的密码",oncorrect:"密码一致"}).inputValidator({min:1,onerror:"重复密码不能为空,请确认"}).compareValidator({desid:"PWD",operateor:"=",onerror:"两次密码不一致,请确认"});
	
	$("#EMAIL").formValidator({onshow:"必填",onfocus:"邮箱6-100个字符",oncorrect:"谢谢"}).inputValidator({min:6,max:100,onerror:"你输入的邮箱长度非法,请确认"}).regexValidator({regexp:"^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$",onerror:"你输入的邮箱格式不正确"})
	  .ajaxValidator({
	    type : "get",
		url : ajaxURL+"?act=register",
		datatype : "json",
		success : function(data){	
           if( data == "0" )
			{
                return true;
			}
            else
			{
                return false;
			}
		},
		error: function(){alert("服务器没有返回数据，可能服务器忙，请重试");},
		onerror : "该邮箱名已经被使用，请更换",
		onwait : "正在对邮箱名进行合法性校验，请稍候..."
	})[$("#EMAIL").val()?'defaultPassed':'toString']();
		
	$("#content_mobile").formValidator({onshow:"必填",onfocus:"请填写联系的手机号",oncorrect:"谢谢"}).inputValidator({min:11,max:11,onerror:"请输入正确的手机号码,以13,15,17,18开头"}).regexValidator({regexp:"mobile",datatype:"enum",onerror:"你输入的手机号码格式不正确"});		
	/*$("#recommend").formValidator({onshow:"必填",onfocus:"昵称10个汉字或20个字母数字以内",oncorrect:"谢谢"}).inputValidator({min:1,max:20,onerror:"你输入的推荐人不存在,请确认"})
	    .ajaxValidator({
	    type : "get",
		url : "ajax.php?act=recommend",
		datatype : "json",
		success : function(data){	
		//alert(data);
            if( data == "0" )
			{
                return false;
			}
            else
			{
                return true;
			}
		},
		error: function(){alert("服务器没有返回数据，可能服务器忙，请重试");},
		onerror : "该推荐人不存在，请确认",
		onwait : "正在校验，请稍候..."
	});*/
	//消息判断开始
	$("#member_name").formValidator({onshow:"请输入收件人账号,账号之间用半角逗号间隔",onfocus:"请输入收件人账号,账号之间用半角逗号间隔"}).inputValidator({min:1,onerror:"收件人不能为空,请输入或点击右侧选择"});
	$("#msg_title").formValidator({onshow:"请输入标题",onfocus:"请输入标题"}).inputValidator({min:1,max:25,onerror:"请输入标题,不多于25个字"});
    $("#msg_text").formValidator({onshow:"请输入内容",onfocus:"请输入内容"}).inputValidator({min:1,max:250,onerror:"请输入内容,不多于250个字"});
	//消息判断结束	
	//会员基本信息开始
	$("#truename").formValidator({onshow:"必填",onfocus:"请输入您的真实姓名",oncorrect:"谢谢"}).inputValidator({min:1,onerror:"请输入您的真实姓名"});
	$("#birthday").formValidator({empty:true,onshow:"选填",onfocus:"请输入出生日期",oncorrect:"谢谢",onempty:"您真的不想留下出生日期？"}).inputValidator({min:1});
	$("#degree").formValidator({empty:true,onshow:"选填",onfocus:"请输入教育状况",oncorrect:"谢谢",onempty:"您真的不想留下教育状况？"}).inputValidator({min:1});
	$("#marriage").formValidator({empty:true,onshow:"选填",onfocus:"请输入情感状况",oncorrect:"谢谢",onempty:"谢谢"}).inputValidator({min:1});
	$("#work").formValidator({empty:true,onshow:"选填",onfocus:"请输入职业",oncorrect:"谢谢",onempty:"您真的不想留下职业？"}).inputValidator({min:1}).regexValidator({regexp:"\\w+$",onerror:"格式不正确"});
	$("#hometown").formValidator({empty:true,onshow:"选填",onfocus:"请输入家乡",oncorrect:"谢谢",onempty:"您真的不想留下家乡？"}).inputValidator({min:1}).regexValidator({regexp:"\\w+$",onerror:"格式不正确"});	
	$("#address").formValidator({onshow:"必填",onfocus:"请输入您的联系地址",oncorrect:"谢谢"}).inputValidator({min:1,onerror:"请输入您的联系地址"});
	$("#post").formValidator({onshow:"必填",onfocus:"请输入邮政编码",oncorrect:"谢谢"}).inputValidator({min:1}).regexValidator({regexp:"zipcode",datatype:"enum",onerror:"邮政编码格式不正确"});
	$("#tel").formValidator({empty:true,onshow:"选填",onfocus:"请输入联系电话，例如010-58858566",oncorrect:"谢谢",onempty:"您真的不想留下联系电话？"}).inputValidator({min:1,onerror:"电话不能为空"}).regexValidator({regexp:"tel",datatype:"enum",onerror:"电话号码格式不正确"});
	$("#phone").formValidator({onshow:"必填",onfocus:"请输入正确的手机号码,以13,15,17,18开头",oncorrect:"谢谢"}).inputValidator({min:11,max:11,onerror:"手机号码有误"}).regexValidator({regexp:"mobile",datatype:"enum",onerror:"手机号码格式不正确"});
	
	$("#mobile").formValidator({onshow:"必填",onfocus:"请输入正确的手机号码,以13,15,17,18开头",oncorrect:"谢谢"}).inputValidator({min:11,max:11,onerror:"手机号码有误"}).regexValidator({regexp:"mobile",datatype:"enum",onerror:"手机号码格式不正确"});
	
	$("#qq").formValidator({empty:true,onshow:"选填",onfocus:"请输入QQ号码",oncorrect:"谢谢",onempty:"您真的不想留下QQ号码？"}).inputValidator({min:1}).regexValidator({regexp:"qq",datatype:"enum",onerror:"QQ号码不正确"});
	$("#msn").formValidator({empty:true,onshow:"选填",onfocus:"请输入MSN",oncorrect:"谢谢",onempty:"您真的不想留下MSN？"}).inputValidator({min:1}).regexValidator({regexp:"email",datatype:"enum",onerror:"MSN不正确"});
	$("#Vcodes").formValidator({onshow:"必填",onfocus:"请输入验证码",oncorrect:""}).inputValidator({min:1,onerror:"验证码不能为空"});
	//会员基本信息结束
	//$("#Vcode").formValidator({onshow:"必填",onfocus:"请输入验证码",oncorrect:""}).inputValidator({min:1,onerror:"验证码不能为空"});
	//收货地址开始
	$("#addr_name").formValidator({onshow:"必填",onfocus:"请输入您的收货人姓名",oncorrect:"谢谢"}).inputValidator({min:1,onerror:"请输入您的收货人姓名"});
	$("#content_addr").formValidator({onshow:"必填",onfocus:"请输入您的收货地址",oncorrect:"谢谢"}).inputValidator({min:1,onerror:"请输入您的收货地址"});
	$("#content_tel").formValidator({empty:true,onshow:"选填",onfocus:"请输入联系电话，例如010-58858566",oncorrect:"谢谢",onempty:"您真的不想留下联系电话？"}).inputValidator({min:1,onerror:"电话不能为空"}).regexValidator({regexp:"tel",datatype:"enum",onerror:"电话号码格式不正确"});
	//$("#content_mobile").formValidator({empty:true,onshow:"选填",onfocus:"请输入联系手机，例如15801012587",oncorrect:"谢谢",onempty:"您真的不想留下联系电话？"}).inputValidator({min:1,onerror:"手机不能为空"}).regexValidator({regexp:"mobile",datatype:"enum",onerror:"手机号码格式不正确"});
	$("#content_email").formValidator({onshow:"必填",onfocus:"邮箱6-100个字符",oncorrect:"谢谢"}).inputValidator({min:6,max:100,onerror:"你输入的邮箱长度非法,请确认"}).regexValidator({regexp:"^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$",onerror:"你输入的邮箱格式不正确"})
	$("#content_post").formValidator({onshow:"必填",onfocus:"请输入邮政编码",oncorrect:"谢谢"}).inputValidator({min:1}).regexValidator({regexp:"zipcode",datatype:"enum",onerror:"邮政编码格式不正确"});
	$("#content_mobiles").formValidator({onshow:"必填",onfocus:"请填写联系的手机号",oncorrect:"输入正确 "}).inputValidator({min:11,max:11,onerror:"请输入正确的手机号码,以13,15,17,18开头"}).regexValidator({regexp:"mobile",datatype:"enum",onerror:"你输入的手机号码格式不正确"});	
	//收货地址结束
		
	//充值开始
	//$("#fillmoney").formValidator({onshow:"请填写充值金额",onfocus:"请填写充值金额",oncorrect:"填写正确"}).inputValidator({min:1,onerror:"请填写充值金额"}).regexValidator({regexp:"intege1",datatype:"enum",onerror:"您输入的金额有误"});
	$("#fillmoney").formValidator({onshow:"请填写充值金额（1-10000之间）",onfocus:"只能输入1-10000之间的数字",oncorrect:"输入正确"}).inputValidator({min:1,max:10000,type:"value",onerrormin:"请输入正确的充值金额（1-10000之间）",onerror:"请输入正确的充值金额（1-10000之间）"}).regexValidator({regexp:"intege1",datatype:"enum",onerror:"您输入的金额有误"});
	
	//充值结束
	
	$("#money_num").formValidator({onshow:"请输入要兑换的金额(请输入整数)",onfocus:"请输入要兑换的金额(请输入整数)",oncorrect:"输入正确"}).inputValidator({min:1,max:10000,type:"value",onerrormin:"请输入正确的兑换金额（1-10000之间）",onerror:"请输入正确的充值金额（1-10000之间）"}).regexValidator({regexp:"intege1",datatype:"enum",onerror:"您输入的金额有误"});
	$("#content_spacedesc").formValidator({empty:true,onshow:"选填",onfocus:"请填写空间描述",oncorrect:"谢谢",onempty:"您真的不要填写空间描述吗？"}).inputValidator({min:1});	
	
	//评论验证
	
	$("#review_body").formValidator({onshow:"必填",onfocus:"请输入评论内容",oncorrect:"谢谢"}).inputValidator({min:1,max:1000,onerror:"请输入评论内容"});
	
	
	$("#Vcode").formValidator({onshow:"必填",onfocus:"请输入验证码",oncorrect:""}).inputValidator({min:1,onerror:"验证码不能为空"});
	}
	//会员中心菜单
	if($(".MB03 ul > li.cr").size()>0){
		$(".MB03 ul > li.cr > ul").show();
	}else{
		$(".MB03 ul > li:first > ul").show();
	}
	$(".MB03  ul > li > a").click(function(){
		$(this).parent().find('ul').slideToggle("fast");
	});
	$('.tabs11').each(function(i){	
		var $$=$(this);
		var $info=$('.infos11:eq('+i+')');		
		$$.find('> ul > li').each(function(j){
			$(this).click(function(){				
				$(this).parent().find('.hover').removeClass('hover').addClass('sliding');
				$(this).removeClass('sliding').addClass('hover');
				$info.children().hide();
				$info.children().eq(j).show();
			})			
		})
		$$.find('.hover').eq(0).click();
	
	})
})
//重新加载验证码
function ReloadCode(){
	$("#codeimg").attr("src",live_site+'/img.php?'+Math.random());
}
//重新加载页面
function ReloadPage(url){
	if(url)
		window.location=url;
	else
		location.reload();
}

//修改头像
function show_headcut_window(){
	var txt = '<iframe src="'+live_site+'/headcut" frameborder="0" scrolling="no" marginwidth="0"  width="100%" height="370px" allowtransparency="true"></iframe>';
	$.prompt(txt,{
		callback: headcut_callback,
		buttons: { "确定":1,"取消":2 }//为空则没有按钮
	});
}
function headcut_callback(v,m,f){
	if(v==1){
		$.ajax({
			 type : "get",
				url :live_site+"/headcut/head.php",
				datatype : "json",
				success : function(data){
			var msg= eval('('+data+')');
			    switch(msg[0]){
				case '1' :
					$("#pic").attr("src",live_site+"/file/upload/"+msg[1]);
				break;
				default:$.prompt('服务器正忙，稍后请重试',{top:200});
			   }	
	    },
	   error: function(){
			$.prompt('服务器没有返回数据，可能服务器忙，请重试');
	   }
	  }); 				
	}
}
//消息开始
function Form_Msg(formid,val){//发送或保存到草稿箱
	if(val){
		document.getElementById('msg_dra').value=val;
	}else{
		document.getElementById('msg_dra').value=0;
	}
	Form_Ajax(formid,1);
}
function Form_Ajax(formid,ajax){//ajax 添加,修改操作
	if(ajax){
		var params=$("#"+formid).serializeArray();
		$.ajax({
		   type: "POST",
		   url: "index.php?ajax="+ajax,
		   datatype:"json",
		   data:params,
		   beforeSend:function(){
			  $.prompt("<img src='"+live_site+"/images/wait.gif'/>　 正在处理中，请稍等...",{
					top:10,
					buttons: {}
			  });
		   },
		   success: function(data){
			  var data= eval('('+data+')');
               json_callback(data);
		   },
		   complete:function(msg){
			   $.prompt.close();
		   }
		});
	}else{
		$('#'+formid).submit();
	}
}
function json_callback(json_str){
	var data=json_str;
	if(typeof(data)=='string')
		data= eval('('+data+')');
	if(data[0]=="jquery_impromptu"){
		if(data["buttons"]==null){
			data["buttons"]={"确定":true};
		}
			
		if(data["callback"]!=null){
			data["callback"]=eval(data["callback"]);
		}else{
			data["callback"]=function(){}
		}
		if(data["submit"]!=null){
			data["submit"]=eval(data["submit"]);
		}else{
			data["submit"]=function(){};
		}
		$.prompt(data["text"],{top:200,buttons:data["buttons"],callback:data["callback"],submit:data["submit"] }); 
	}else if(data[0]=="jquery_score"){
			eval(downLoadBook(data['auto_id'],data['score']));
	}
	else if(data[0]=="alert"){
		alert(data["html"]);
	}else if(data[0]=="html"){
		alert(data["html"]);
	}else if(data[0]=="eval"){
		eval(data['code']);
		eval(data["param"]);
	}else if(data[0]=="tips"){
		window.location.href=data['mess'];
	}else if(!isNaN(Number(data[0]))){
	   switch(data[0]){
		   case '1'://提交后页面刷新
			 $.prompt(data[1],{top:200,buttons:{"确定":false},callback:function(){ReloadPage(data[2]);}}); 
			 break;
		   case '-1'://错误刷新验证码
			 $.prompt(data[1],{top:200,buttons:{"确定":false},callback:ReloadCode});
			 break;
		   case '-2'://权限不足
			 $.prompt(data[1],{top:200,buttons:{"确定":false}});
			 break;
		   case '2'://提交后不刷新页面
				 $.prompt(data[1],{top:200,buttons:{"确定":false}});
				 if([data[2]]==1){
				 $("#grade").hide();
				 $("#descore,#fullbg").show();
				 $("#fullb,#showscore").hide();
				 }
			break;
		   case '3'://提交后不刷新页面
				 $.prompt(data[1],{top:200,buttons:{"确定":false}});
				 if([data[2]]==1){
					 	$("#grade").hide();
					 	$("#descore,#fullbg").show();
						 //$("#fullbg,#showscore,#dialog,#fullb").hide();
					 	 $("#fullb,#showscore").hide();
				 }
			break;
		   default:
			 $.prompt('服务器正忙，稍后请重试',{top:200,buttons:{"确定":false}});

	   }	
	}else{
		$.prompt('服务器正忙，稍后请重试',{top:200,buttons:{"确定":true}});
	}
}
function getFriend(isall){//添加收件人
	var $$ = $(':input[name=cid\[\]]');
	if(isall){
		if($('#chkall').get(0).checked==false){
			$$.attr('checked',false);
		}else{
			$$.attr('checked',true);
		}
	}
	var ids='';
	var vals='';
	$$.each(function(){
		if($(this).get(0).checked==true){
			vals+=$(this).attr('ids')+',';
			ids+=$(this).val()+','
		}
	})
	$('#memberf_id').val(ids);
	$('#member_name').val(vals);
}
//消息结束
//充值 开始
function Form_Fill(formid){
	wait_pay();
	$("#"+formid).submit();
}
function wait_pay(){
 	$.prompt("请在完成付款后进行操作",{
		callback: function(){
				location.reload();
			},
		buttons: { "完成付款":1,"付款遇到问题":2},
		top:200
	});
 }
//充值 结束
//地区选择
function areaSelect(cate,size){
	if(cate!=""){
		$('#content_area').val(cate);//隐藏域id
		$.getJSON(ajaxURL+"?act=areaSelect&auto_code="+cate+"&size="+size+"&callback=?",			
			function(data){
				 if(data){
					$('#cateArea').html(data[0]);
				 }
			}
		);
	}else{
		$('#content_area').val('');
	}
}
function delFriend(id){
	$.prompt('确定要删除该好友吗?',{top:200,
	submit:function(v){
		if(!v)return;
		$.get(ajaxURL+'?act=delfriend&friend_id='+id,function(data){
		switch(data){
			case '1' :$.prompt('删除成功',{top:200,callback:function(){
				location.reload();
			}});
			break;
			default:$.prompt('未知错误',{top:200});
		}
		});
	},
	buttons: {"确定":1,"取消":false}
	});
}
//删除消息
function delmessage(id){
	$.prompt('确定要删除该好友吗?',{top:200,
	submit:function(v){
		if(!v)return;
		$.get('ajax.php?act=delfriend&friend_id='+id,function(data){
		switch(data){
			case '1' :$.prompt('删除成功',{top:200,callback:function(){
				location.reload();
			}});
			break;
			default:$.prompt('未知错误',{top:200});
		}
		});
	},
	buttons: {"确定":1,"取消":false}
	});
}

$(function(){
	 //$('#search_key').focus();
	 jQuery('#search_key').attr('name',jQuery('#slt1').val());
	 document.body.onkeydown=function(event){
	 event=event||window.event;
	 if(event.keyCode==13){
		 if(document.activeElement.id=="search_key"){
		 if($("#search_key").val()){
			 jQuery('#search_form').submit();
		 }else{
			 alert('请输入关键字');
			 return false;  
		 }
	 
	 }
	 }
	 
	 };
	});
function change_search(){
	jQuery('#search_key').attr('name',jQuery('#slt1').val());
	
}

 //控制字体大小
$(document).ready(function(){
	$("#newContent").addClass("fontsize16");
	$("#fontBig").click(function(){//18px
		$("#fontSmall").removeClass("minfont1").addClass("minfont");
		$("#fontBig").removeClass("maxfont").addClass("maxfont1");
		$("#newContent").removeClass().addClass("fontsize18");
	});
	$("#fontSmall").click(function(){//14px
		$("#fontSmall").removeClass("minfont").addClass("minfont1");
		$("#fontBig").removeClass("maxfont1").addClass("maxfont");
		$("#newContent").removeClass().addClass("fontsize16");
	});
});
function LoadPrintJsCallBack(){
   if(typeof forSPrint == "object" && forSPrint.Print){
	   forSPrint.Print();
   }
} 
//打印
function LoadPrintJs(){

	var jsFile = tplpath+"js/print.js"; //打印主js文件url
	 jsFile += "?t="+ (new Date()).getTime();
	 var js = document.createElement("script");
	 js.setAttribute("src",jsFile);
	 js.setAttribute("type","text\/javascript");
	 js.setAttribute( "id", "sinaPrintJsUrl");
	 //for ie

	 js.onreadystatechange = function(){
	 if(js.readyState=="loaded"){
	 	LoadPrintJsCallBack();
	 }
};
js.onload = LoadPrintJsCallBack;
 	document.body.insertBefore(js,null); // null for ff
}

function LoadPrintJsCallBack(){
   if(typeof forSPrint == "object" && forSPrint.Print){
	   forSPrint.Print();
   }
}


		 


