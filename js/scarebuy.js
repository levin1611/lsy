/*抢购JS*
 * @autor:zx
 * 
 */
function scareLang(k){
	var s= new Array();
	s[1]='剩余<span>%d</span>天<span>%h</span>小时<span>%i</span>分';
	s[2]='剩余<span>%d</span>天<span>%h</span>小时<span>%i</span>分';
	//<span>%s</span>
	s[3]='该商品已经结束抢购';
	return s[k];
}



function scareInit(o,i){
	var t=o.html();
	
	if(!t)return;
	//初始化时间
	var a=t.split('-');
	var s=parseInt(a[0]);//开始的时间，已经开始为0
	var e=parseInt(a[1]);//结束的时间
	if(s!=0){
		e=-s;
	}
	doScare=function(){
		if(e>0){
			e=e-1;
		}
		else if(e<0){
			e=e+1;
		}
		else{
			if(s==0){
				clearInterval(eval('scareTimer'+i));//已结束
				o.html(scareLang(3)).show();
			}else{
				e=parseInt(a[1])-s;//开始
				s =0;
			}
		}
		o.startScare(e);
	}
	eval('doScare'+i+'=doScare');
	scareTimer=setInterval('doScare'+i+'()',1000);
	eval('scareTimer'+i+'=scareTimer');
}

$.fn.startScare=function(s){
	if(s<0){
		$(this).html(doScareRxp(Math.abs(s),scareLang(1))).show().startCall();
	}else if(s>0){
		$(this).html(doScareRxp(s,scareLang(2))).show().startedCall();
	}
}

function doScareRxp(s,o){
	var a=new Object();
	//如果需要增加年月的在此增加
	a['d'] = Math.floor(s/(60 * 60 * 24));//天
	a['h'] = Math.floor(s / (60*60)) - a['d'] * 24;//小时
	a['i'] = Math.floor(s / 60) - (a['d'] * 24 *60) - (a['h'] * 60)//分钟
	a['s'] = Math.floor(s - (a['d'] * 24 *60*60) - (a['h'] * 60 * 60) - (a['i']*60));//秒
	$.each(a,function(k,v){
		o=o.replace('%'+k,v);
	});
	return o;
}

$.fn.startCall=function (){//未开始回调
	$(this).closest('.cell').find('.bun1').hide();
	$(this).closest('.gwtxt').find('.sh1').hide().next().find('img').hide();
}
$.fn.startedCall=function (){//已开始回调
	$(this).closest('.cell').find('.bun1').show();
	$(this).closest('.gwtxt').find('.sh1').show().next().find('img').show();
}
$.fn.endedCall=function (){//已结束回调
	$(this).closest('.cell').find('.bun1').hide();
	$(this).closest('.gwtxt').find('.sh1').hide().next().find('img').hide();
}
///调用
$('.time_state_2').each(function(i){
	scareInit($(this),i);
});