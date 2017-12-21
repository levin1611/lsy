function oldareaSelect(cate,size){//礼品地址选择
	if(cate!=""){
		$('#content_area').val(cate);
		$.getJSON(ajaxURL+"?act=oldareaSelect&auto_code="+cate+"&size="+size+"&callback=?",			
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
function cancel_order(order_id){

	 $.prompt("订单取消后不可恢复,确认执行此操作?",{
			callback: function(v,m,f){
				if(v==1){
					 $.ajax({
						   type: "get",
						   url: live_site+"/ajax.php",
						   data: 'act=cancelOrder&order_id='+order_id,
						   success: function(msg){
						 		$.prompt(msg,{
										callback: function(){
												location.reload();
										},
										top:250
									}
								);
						   }
					});  	
				}
			},
			buttons: { "取消订单":1,"不取消":2},
			top:250
	});
 }
function changeDefault(id,task){
	$.ajax({
		   type: "post",
		   url: "index.php?ajax=1&com=com_pcenter&method=save&task="+task+"&proid="+id,
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
				   default:
				   	 $.prompt('服务器正忙，稍后请重试',{top:200});

			   }
		   }
		});
}


function Form_Comfired(formid,ajax){
	var cart_id=$("#card_number").val();
	var cart_pass=$("#card_pwd").val();
	if(cart_id !="" && cart_pass !=""){
		Form_Ajax(formid,ajax);
	}else{
		 $.prompt('请输入正确的卡号和密码!',{top:200});
		 return false;
	}
}

function checkpro(obj){
	var pronum=$("#product_num").val();
	var $check=$('input:checked');
	//alert($check);
	if($check.size()>pronum){
		$.prompt('您只能选择'+pronum+'件商品！',{top:200,buttons:{"确定":false}});
		obj.checked=false;
	}
}

function submitpro(obj){
	var pronum=$("#product_num").val();
	var $check=$('input:checked');
	if($check.size()<pronum || $check.size()>pronum){
		$.prompt('您需要选择'+pronum+'件商品！',{top:200,buttons:{"确定":false}});
		obj.checked=false;
	}else{
		Form_Submit(obj);
	}
	
}
function Form_Exchange(){
	var $check=$('input:checked');
	if(!$check.size()){
		$.prompt('请选择您要兑换的商品',{top:200,buttons:{"确定":false}});
		return;
	}
}
/*var theForm = document.listform;
	$.prompt('确定要删除吗?',{top:200,
		submit:function(v){
			if(!v)return;
			theForm.submit();
		},
		buttons: {"确定":1,"取消":false}
	});*/

function change_basket(obj,com,id){
	if($(obj).attr("comparenum")!=$(obj).val()){
		$(obj).attr("comparenum",$(obj).val());
	$.ajax({
	   type: "POST",
	   url: live_site+"/ajax.php?act=changebasket",
	   datatype:"json",
	   data:"num="+$(obj).val()+"&id="+id+"&com="+com,
	   success: function(msg){
		json_callback(msg);
	}
	});
	}
}
//购物车更改购买产品数量
function reduceNum(com,id){	
	
	if(parseInt($("#c_num"+id).val()) < 1){
		$("#c_num"+id).val('0');
		return;
	} 
	var num = parseInt($("#c_num"+id).val())-1;
	if(num<=0){
		alert("数量最小为1");
		location.reload();
		return false;
	}
/*	var price = $(".price"+id).text();
	var totalpay = changeTwoDecimal_f(price*num);
	
	$(".totalpay"+id).text(totalpay);	
	$("#c_num"+id).val(num);*/

	$.ajax({
		   type: "POST",
		   url: live_site+"/ajax.php?act=changebasket",
		   datatype:"json",
		   data:"num="+num+"&id="+id+"&com="+com,
		   success: function(msg){
			   json_callback(msg);
		   }
		});
//	$.post('ajax.php?act=changebasket',{num:num,id:id,com:'com_shopProduct'})	
}

function addNum(com,id){
	var num = parseInt($("#c_num"+id).val())+1;
/*	var price = $(".price"+id).text();
	var totalpay = changeTwoDecimal_f(price*num);
	
	$(".totalpay"+id).text(totalpay);
	$("#c_num"+id).val(num);*/
	$.ajax({
		   type: "POST",
		   url: live_site+"/ajax.php?act=changebasket",
		   datatype:"json",
		   data:"num="+num+"&id="+id+"&com="+com,
		   success: function(msg){
			   json_callback(msg);
		   }
	});
}
//-----------------END--------------

//产品最终页，更改购买价数量
function reduceProNum(){	
	if(parseInt($("#J_Amount").val()) < 2){
		$("#J_Amount").val('1');
		return;
	} 
	var num = parseInt($("#J_Amount").val())-1;
	$("#J_Amount").val(num);
}
function addProNum(){
	var num = parseInt($("#J_Amount").val())+1;
	$("#J_Amount").val(num);
}
//--------------end----------------

//检验报告下载
function reportDown(){
	$(function(){
		var txt = '请输入您的检验报告密码:&nbsp;&nbsp;&nbsp; <input type="password" id="myname" value="" />';	
		function mysubmitfunc(v,m,f){	
			var val = $('#myname').val();
			if(v){
			  $.ajax({
		  		   type: "POST",
		  		   url:live_site+"/index.php",
		  		   datatype:"json",
		  		   data:encodeURI("com=com_shop&method=save&task=report&code="+val),
		  		   success: function(msg){
//		  			   alert(msg);
		  			   json_callback(msg);
		  		   }
		  		});	
			}
		}
		$.prompt(txt,{
			top:200,
			submit: mysubmitfunc,
			buttons: { 确认:true,取消:false }
		});
	});		
}

//新窗口打开链接，不被拦截
function openUrl(url){
    var f=document.createElement("form");
    f.setAttribute("action" , url );
    f.setAttribute("method" , 'get' );
    f.setAttribute("target" , '_blank' );
    document.body.appendChild(f)
    f.submit();
 }
function updateCart(){//更新购物车
	$.ajax({
		   type: "POST",
		   url: live_site+"/index.php",
		   datatype:"json",
		   data:"com=com_shop&method=save&task=updatecart",
		   beforeSend:function(){
			 $.prompt("<img src='"+live_site+"/images/success.jpg'/>",{
					top:200,
					buttons: {"继续购物":'','去购物车结算':live_site+"/index.php?com=com_shopcart&method=index"},
					submit:redirectLocation
			  });
			 setTimeout(function ()

                     {

				 $.prompt.close();

                     }, 3000);
	   		},
		   success: function(msg){
			   json_callback(msg);
			  
		   }
	});
	
}

function changeCart(param){//改变购物车
	var data=param;
	if(typeof(data)=='string')
		data= eval('('+data+')');
	$(".shopcarts .shopcart span a em").html(data.my_cart.totalsnums);
	var str='';
	for(var i=0;i<data.my_cart.data.length;i++){
		
			str+='<div class="core';
			if(i==0)
			  str+=' NoBg"';
			else
			  str+='"';
			str+='>';
			str+='<div class="pic">';
			str+='<a href="'+data.my_cart.data[i].view_link+'" target="_blank"><img src="'+data.my_cart.data[i].c_simg+'"  alt="'+data.my_cart.data[i].c_pname+'" /></a></div>';
		str+='<div class="title"><h1><a href="'+data.my_cart.data[i].view_link+'" target="_blank">'+data.my_cart.data[i].c_pname+'</a></h1></div>';
		str+='<div class="option"><span class="price"><em>￥'+data.my_cart.data[i].c_ppay+'</em>×'+data.my_cart.data[i].c_num+'</span><a href="'+data.my_cart.data[i].del_link+'"></a></div><div class="clear"></div></div>';
	}
	str+='<div class="goshopcart"><div>共<em>'+data.my_cart.totalsnums+'</em>件商品</div><div>合计<strong>'+data.my_cart.totalspay+'</strong>元</div><a class="subtn" href="'+data.my_cart.order_link+'">去购物车结算</a></div>';
	$(".shopcarts .s_list").html(str);
	show_order();
}

function show_order(){
	$(".shopcartlist").show();
}

function hide_order(){
	$(".shopcartlist").hide();
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

function redirectLocation(v){
	if(v)
		window.location=v;
}
//清除收货地址
function clearDef(){
	$("input[name='address']:checked").removeAttr("checked");
}
function countTextBody(){
	$("#textCount").html(140-getLength($("#textbody").val()));
	
}
var getLength = (function() {
    var trim = function(h) {
    try {
         return h.replace(/^\s+|\s+$/g, "");
    } catch (j) {
        return h;
    }
    };
    var byteLength = function(b) {
    if (typeof b == "undefined") {
        return 0;
    }
    var a = b.match(/[^\x00-\x80]/g);
    return (b.length + (!a ? 0 : a.length));
    };


    return function(q, g) {
    g = g || {};
    g.max = g.max || 140;
    g.min = g.min || 41;
    g.surl = g.surl || 20;
    var p = trim(q).length;
    if (p > 0) {
        var j = g.min, s = g.max, b = g.surl, n = q;
        var r = q.match(/(http|https):\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z\$\.\+\!\_\*\(\)\/\,\:;@&=\?~#%]*)*/gi)
        || [];
        var h = 0;
        for ( var m = 0, p = r.length; m < p; m++) {
            var o = byteLength(r[m]);
            if (/^(http:\/\/t.cn)/.test(r[m])) {
                continue;
            } else {
                if (/^(http:\/\/)+(weibo.com|weibo.cn)/.test(r[m])) {
                     h += o <= j ? o : (o <= s ? b : (o - s + b));
               } else {
                    h += o <= s ? b : (o - s + b);
              }
      }
      n = n.replace(r[m], "");
      }
     return Math.ceil((h + byteLength(n)) / 2);
     } else {
        return 0;
     }
     };
})();
function return_nums(vars){		//商品库存有误返回数量 vars数组解析 0=com值,1=商品ID,2=数量,3=单个商品总价,4=购物车总价,5=商品单价价格
	try{
		if(typeof(vars)=='string') vars= eval('('+vars+')');
		if(vars['totalpay']!=null || vars['totalpay']!=""){			//处理商品总价 购物车总价
			$("#pay"+vars['com']+vars['c_pid']).html(vars['propay']);
			$("#totalpay").html(vars['totalpay']);
			}
			if(vars['c_ppay']!="") $("#price"+vars['com']+vars['c_pid']).html(vars['c_ppay']); //普通商品大于20 变成团购价
			$("input[name='nums["+vars['com']+"]["+vars['c_pid']+"]']").val(vars['c_num']);  //返回数量
			if(vars['c_num']==0) $("#tr"+vars['com']+vars['c_pid']).remove();			//删除html
			if(vars['com']=="com_shopGroup"){								//修改组合商品数量
				var groupNums=vars['groupNums'].split(",");
				$(".nums"+vars['c_pid']).each(function(i,n){
					$(n).html(groupNums[i]*vars['c_num']);	
				});
				if(vars['c_num']==0){	
					$(".trgroup"+vars['c_pid']).each(function(i,n){
						$(n).remove();	
					});
				}
			}
	}catch(e){
		alert("请求出错");
		location.reload();
	}

}
function shippingChange(id,type){
	$.get(ajaxURL+'?act=payment&payway='+id+'&type='+type,function(data){
		if(data){
			$("#payment").html(data);
		}
	});
}
function invoiceType(val){
	if(val>0){
		document.getElementById('invoiceType').style.display='';
	}else{
		document.getElementById('invoiceType').style.display='none';
	}
}
function Order_Submit(formid,ajax){//订单ajax提交 
		jump_url();
		if(ajax){
			var params=$("#"+formid).serializeArray();
			$.ajax({
			   type: "POST",
			   url: "index.php?ajax="+ajax,
			   datatype:"json",
			   data:params,
			   success: function(msg){
				json_callback(msg);
			}
			})
		}		

}
function jump_url(){
	$.prompt("<img src='images/loading.gif'/>&nbsp;&nbsp;&nbsp; 正在跳转，请等待...",{
			top:200,
			buttons: {}
	});
	//20秒超时提示
	setTimeout("jump_false()",20000);
}

function jump_false(){
	$.prompt.close();
	$.prompt("服务器没有响应",{
			top:200
	});
}

function basket_submit(formid,url){
	if(url!=null || url!=""){
		$("#"+formid+" input[name='redirect']").val(url);
	}else{
		$("#"+formid+" input[name='redirect']").val("");
	}
	Form_Submit(formid);
}

function checkNum(pid,color,size,obj){
	if(color == ''){
		color = $("#color").val();
		$("#size").val(size);
		$(obj).parents(".size").find("li[class='p_sizeborder']").removeClass("p_sizeborder").addClass("p_size");
		$(obj).parent("li").addClass("p_sizeborder").removeClass("p_size");
		var size_title = $(obj).attr('title');
		$("#size_title").text(size_title);
	}
	if(size == ''){
		size = $("#size").val();
		$("#color").val(color);
		$(obj).parents(".color").find("li[class='p_colorborder']").removeClass("p_colorborder").addClass("p_color");
		$(obj).parent("li").addClass("p_colorborder").removeClass("p_color");
		var color_title = $(obj).attr('title');
		$("#color_title").text(color_title);
	}
	$.get('index.php?com=com_shopproNum&method=save&task=checkNum&pid='+pid+'&color_code='+color+'&size='+size+'&ajax=1',function(data){
		var data=eval('('+data+')');
		$(".buy").html(data[0]);
	});	
}
//添加收藏

function addCollect(proid){
	$.ajax({
		   type: "POST",
		   url: live_site+"/index.php",
		   datatype:"json",
		   data:"com=com_pcenter&method=save&task=adfav&proid="+proid,
		   success: function(msg){
			json_callback(msg);
		}
	});	
}
//添加喜欢
function addlike(proid){
	if(proid){
		$.get('index.php?com=com_pcenter&method=save&task=addlike&proid='+proid,function(data){
			if(data==0){
				alert("您已经喜欢该商品了！");
			}else if(data==1){
				location.reload();
			}else{
				alert(data);
			}
		});	
	}
}
//余额支付js
function accountPay(o,u,p,c,t){//接收显示支付余额的参数与总金额的
	var $o=$(o);
	var $u=$('#'+u);
	var $p=$('#'+p);
	var $c=parseFloat(c);
	var $t=parseFloat(t);
	
	if(!$o.is(':checked')){
		$u.html(0);
		$p.html($t);
		return;
	}
	if($c<=0)return;//没有余额
	else{
		if($t>$c){//总价大于余额
			$u.html($c);
			$p.html(changeTwoDecimal_f($t-$c));
		}else{//余额可以完全支付
			$u.html($t);
			$p.html(0);
		}
	}
}
function showpros(o){
	var span=$(o).find('span');
	span.html(span.html()=='[展开套装]'?'[收起套装]':'[展开套装]');

	$(o).parents('tbody').next().toggle();
	return false;
}
//产品分类联动
function proctgSelect(cate,size,css){
	if(cate!=""){
		$('#content_proctg').val(cate);
		$.getJSON(ajaxURL+"?act=proctgSelect&auto_code="+cate+"&size="+size+"&css="+css+"&callback=?",			
		function(data){
			 if(data){
				$('#cateProduct').html(data[0]);
				if(css!='')
					$("."+css).sSelect();
			 }
		});
	}else{
		$('#content_proctg').val('');
	}
}