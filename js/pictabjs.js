// JavaScript Document

/*$(document).ready(function(e) {
	autoSidle(0);
    $('.carousel-button span').click(function(){
			var di=1
			clearTimeout(tt);
			$(this).parent('.carousel-button').addClass('carousel-button-selected').siblings().removeClass('carousel-button-selected');
			$('.tabPoint ul li').each(function(index, element) {
				if($(this).hasClass('carousel-button-selected'))
					return false;
					else
					di++
            });
			autoSidle(di-1);

		});
	var mun = $('.tabPoint ul li').length;
	var size = parseInt(mun/8);
	var remainder = mun%8;
	var N=1
	var i=1
	$('.goLeft span').click(function(){
			var M=1;
			$('.tabPoint ul li').each(function(index, element) {
			if($(this).hasClass('carousel-button-selected'))
				return false;
			else
				M++
			});
			clearTimeout(tt);
			if(parseInt(M/8)==size || parseInt(M/8)==(size-1))
			{
				if(remainder!=0)
				{
					$('.tabPoint ul').animate({left:-8*25*size});
					$('.tabPoint ul').find('li').eq(8*size).addClass('carousel-button-selected').siblings().removeClass('carousel-button-selected');
					autoSidle(8*size);
				}else{
						$('.tabPoint ul').animate({left:-8*25*parseInt(M/8)});
						$('.tabPoint ul').find('li').eq(8*parseInt(M/8)).addClass('carousel-button-selected').siblings().removeClass('carousel-button-selected');
						autoSidle(8*parseInt(M/8));
					}
				
			}
			else{
					$('.tabPoint ul').animate({left:-8*25*(parseInt(M/8)+1)});
					$('.tabPoint ul').find('li').eq(8*(parseInt(M/8)+1)).addClass('carousel-button-selected').siblings().removeClass('carousel-button-selected');
					autoSidle(8*(parseInt(M/8)+1));
				}
			
		});
			var T=1;
			
		$('.goRight span').click(function(){
			var M=1;
			$('.tabPoint ul li').each(function(index, element) {
			if($(this).hasClass('carousel-button-selected'))
				return false;
			else
				M++
			});
			clearTimeout(tt);
			if(parseInt(M/8)==0)
			{
				$('.tabPoint ul').animate({left:0});
				$('.tabPoint ul').find('li').eq(0).addClass('carousel-button-selected').siblings().removeClass('carousel-button-selected');
				autoSidle(0);
			}
			else{
					$('.tabPoint ul').animate({left:-8*25*(parseInt(M/8)-1)});
					$('.tabPoint ul').find('li').eq(8*(parseInt(M/8)-1)).addClass('carousel-button-selected').siblings().removeClass('carousel-button-selected');
					autoSidle(8*(parseInt(M/8)-1));
				}
			

			
		})
	
});

		var k;
		var tt;
		function autoSidle(k){
			if(k==$('.tabPoint ul li').length)
			{
				k=0;
				$('.tabPoint ul').animate({left:0});
				$('.tabPoint ul').find('li').eq(0).addClass('carousel-button-selected').siblings().removeClass('carousel-button-selected');
				bigDiv(0);
			}
			
			for(var i=k;i<$('.tabPoint ul li').length;i++)
			{
				if(k%8==0)
				{
					
					if($('.tabPoint ul li').length%8==0)
						$('.tabPoint ul').animate({left:-k*25});
					else if(k==parseInt($('.tabPoint ul li').length/8)*8)
						$('.tabPoint ul').animate({left:-(parseInt($('.tabPoint ul li').length/8)-1)*25*8-($('.tabPoint ul li').length%8)*25});
						else
							$('.tabPoint ul').animate({left:-k*25});
				}
				//$('.goLeft span').trigger('click');
				//alert($('.tabPoint ul li').length)
				$('.tabPoint ul li').eq(i).addClass('carousel-button-selected').siblings().removeClass('carousel-button-selected');
				bigDiv(i);
				k++;
				break;
				
			}
			tt = setTimeout('autoSidle('+k+')',5000)
			}
			
			function bigDiv(index){
				$('.bigDiv .cell').css('display','none')
				//$('.bigDiv .cell').eq(index).addClass('cellShow').siblings().removeClass('cellShow');
				for(var i=0;i<$('.bigDiv .cell').length;i++)
				{
					if(i==index)
						$('.bigDiv .cell').eq(i).fadeIn()
					else
						$('.bigDiv .cell').eq(i).fadeOut()
						
				}
				
				}

*/

$(document).ready(function(e) {
	autoSidle(0);
    $('.carousel-button span').click(function(){
			var di=1
			clearTimeout(tt);
			$(this).parent('.carousel-button').addClass('carousel-button-selected').siblings().removeClass('carousel-button-selected');
			$('.tabPoint ul li').each(function(index, element) {
				if($(this).hasClass('carousel-button-selected'))
					return false;
					else
					di++
            });
			autoSidle(di-1);

		});
	var mun = $('.tabPoint ul li').length;
	var size = parseInt(mun/5);
	var remainder = mun%5;

	$('.goLeft span').click(function(){
			var M=0;
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
			
		$('.goRight span').click(function(){
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
			
					if(k==$('.tabPoint ul li').length)
				{
					k=0;
					$('.tabPoint ul').animate({left:0});
					$('.tabPoint ul').find('li').eq(0).addClass('carousel-button-selected').siblings().removeClass('carousel-button-selected');
					bigDiv(0);
				}else{
				for(var i=k;i<$('.tabPoint ul li').length;i++)
			{
				$('.tabPoint ul li').eq(i).addClass('carousel-button-selected').siblings().removeClass('carousel-button-selected');
				bigDiv(i);
				k++;
				break;
				
			}
				}
			

			tt = setTimeout('autoSidle('+k+')',5000)
			}
			
			function bigDiv(index){
				$('.bigDiv .cell').css('display','none')
				
				for(var i=0;i<$('.bigDiv .cell').length;i++)
				{
					
					if(i==index)
					{
						$('.bigDiv .cell').eq(i).fadeIn(2000)
						$('.bigDiv .cell').eq(i).find('.news_info').animate({right:0},1000)
					}
						
					else
					{
						$('.bigDiv .cell').eq(i).fadeOut(2000)
						$('.bigDiv .cell').eq(i).find('.news_info').animate({right:-210})
					}
						
						
				}
				
				}

