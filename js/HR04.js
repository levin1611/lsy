var isjob=true;
$(function() {
	 if($.formValidator){
	$.formValidator.initConfig({autotip:false,alertmessage:true,onerror:function(msg){alert(msg)}});
	$("#content_birthday").formValidator({defaultvalue:"1900-01-01"}).inputValidator({min:'1900-01-01',type:"value",onerror:$("#content_birthday").attr('title')}).regexValidator({regexp:"^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$",onerror:$("#content_birthday").attr('title')});
	$("#content_record").formValidator().inputValidator({min:1,onerror:$("#content_record").attr('title')});
	$("#content_mobile").formValidator().regexValidator({regexp:"^(13|15|18)[0-9]{9}$",onerror:$("#content_mobile").attr('title')});
	$("#content_addr").formValidator().inputValidator({min:1,onerror:$("#content_addr").attr('title')});
	$("#content_name").formValidator().inputValidator({min:1,onerror:$("#content_name").attr('title')});
	$("#content_email").formValidator().regexValidator({regexp:"^([\\w-.]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([\\w-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$",onerror:$("#content_email").attr('title')});
	$("#Vcode").formValidator().inputValidator({min:1,onerror:$("#Vcode").attr('title')});
	
	 }
	 });