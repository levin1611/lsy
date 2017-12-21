

function changegroup(i){
	$(".ST38 .Scell_"+i).hover(
	function(){ $(this).find(".Scnt").fadeIn();
	$(this).css("zIndex","500")},
	
	function(){$(this).find(".Scnt").fadeOut();
	$(this).css("zIndex","1")})
	
	$(".RST39_01 .ST39 .pic .chinamap").click(function(){ $(".RST39_02").css("display","block")})
	$(".RST39_01 .ST39 .pic .chinamap").click(function(){ $(".chinazz").css("display","block")})
	
	}


$(document).ready(function(e) {

for(var i=1;i<11;i++)
changegroup(i);
	
	
	autoSidle(0);
    $('.tabPoint ul li').click(function(){
			var di=1
			clearTimeout(tt);
			$(this).addClass('carousel-button-selected').siblings().removeClass('carousel-button-selected');
			$('.tabPoint ul li').each(function(index, element) {
				if($(this).hasClass('carousel-button-selected'))
					return false;
					else
					di++
            });
			autoSidle(di-1);

		});
	var mun = $('.tabPoint ul li').length-1;
	var size = parseInt(mun/5);
	var remainder = mun%5;

	$('.leftBtn').click(function(){
			var M;
			$('.tabPoint ul li').each(function(index, element) {
			if($(this).hasClass('carousel-button-selected'))
				return false;
			else
				M++
			});
			clearTimeout(tt);
			if(M==0)
			{
				$('.tabPoint ul').find('li').eq($('.tabPoint ul li').length-1).addClass('carousel-button-selected').siblings().removeClass('carousel-button-selected');
				autoSidle($('.tabPoint ul li').length-1);
			} else {
					$('.tabPoint ul').find('li').eq(M-1).addClass('carousel-button-selected').siblings().removeClass('carousel-button-selected');
					autoSidle(M-1);
				}

						
			
			
			
		});
			
		$('.rightBtn').click(function(){
			var M=0;
			$('.tabPoint ul li').each(function(index, element) {
			if($(this).hasClass('carousel-button-selected'))
				return false;
			else
				M++
			});
			clearTimeout(tt);
			if(M==$('.tabPoint ul li').length)
			{
				$('.tabPoint ul').find('li').eq(M-1).addClass('carousel-button-selected').siblings().removeClass('carousel-button-selected');
				autoSidle(M-1);
			}else {
						$('.tabPoint ul').find('li').eq(M+1).addClass('carousel-button-selected').siblings().removeClass('carousel-button-selected');
						autoSidle(M+1);
				}

			
		})
	
});

		var k;
		var tt;
		function autoSidle(k){
			
//				if(k==$('.tabPoint ul li').length){
//					k=0;
//					$('.tabPoint ul').animate({left:0});
//					$('.tabPoint ul').find('li').eq(0).addClass('carousel-button-selected').siblings().removeClass('carousel-button-selected');
//					bigDiv(0);
//				
//				}else{
			if(k==$('.tabPoint ul li').length){
				k=0;
			}
			for(var i=k;i<$('.tabPoint ul li').length;i++){
			$('.tabPoint ul li').eq(i).addClass('carousel-button-selected').siblings().removeClass('carousel-button-selected');
			bigDiv(i);
			k++;
			break;
			}
//				}
			

			tt = setTimeout('autoSidle('+k+')',5000)
			}
			
			function bigDiv(index){
				$('.bannercss .a_bigImg').css('display','none')
			
			
				for(var i=0;i<$('.bannercss .a_bigImg').length;i++)
				{
					
					if(i==index)
					{
						$('.bannercss .a_bigImg').eq(i).fadeIn(1000)
					//	$('.bannercss .a_bigImg').eq(i).find('.news_info').animate({right:0},1000)
					}
						
					else
					{
						$('.bannercss .a_bigImg').eq(i).fadeOut(2000)
					//	$('.bannercss .a_bigImg').eq(i).find('.news_info').animate({right:-210})
					}
						
						
				}
				
				}






$(function() {
	$(".space .s_l .TA02 ul li:last").css("background","none");
	$(".space_min .s_l .TA02 ul li:last").css("background","none");
	
	$('.TA02').each(function(i){		
		var $$=$(this);
		var $info=$('.infos:eq('+i+')');		
		$$.find('> ul > li').each(function(j){
			$(this).mouseover(function(){				
				$(this).parent().find('.hover').removeClass('hover').addClass('green');
				$(this).removeClass('green').addClass('hover');
				$info.children().hide();
				$info.children().eq(j).show();
			})			
		})
		$$.find('.hover').eq(0).mouseover();
	})
	$('.tab01').each(function(i){		
		var $$=$(this);
		var $info=$('.infos2:eq('+i+')');		
		$$.find('> ul > li').each(function(j){
			$(this).mouseover(function(){				
				$(this).parent().find('.hover').removeClass('hover').addClass('green');
				$(this).removeClass('green').addClass('hover');
				$info.children().hide();
				$info.children().eq(j).show();
			})			
		})
		$$.find('.hover').eq(0).mouseover();
	})
	$('.TA01').each(function(i){		
		var $$=$(this);
		var $info=$('.ingreen:eq('+i+')');	
		$$.find('.Tag').each(function(j){
			$(this).mouseover(function(){
				$(this).parent().find('.hovers').removeClass('hovers');
				$(this).addClass('hovers');
				if($(this).attr('id')=="TG101"){
					$(this).parent().removeClass('TagUnSelect').addClass('TagSelect');
				}else{
					$(this).parent().removeClass('TagSelect').addClass('TagUnSelect');
				}
				$info.children().hide();
				$info.children().eq(j).show();
			})			
		})
	})
});