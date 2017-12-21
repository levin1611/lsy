// JavaScript Document
/*
日期：2012.8.8
项目：中材国际项目
功能：首页轮播图
作者：majiangtao
*/
$(document).ready(function(e) {
	autoPlay(0);
	var _smallImg = $('.RAD61_01 .smallImg');
	var _li = _smallImg.find('li');
	var _length = _li.length;
	var _width = _li.width();
	_smallImg.find('ul').css('width',_length*_width);

	var d = 1; //初始化当前循环的位置
	var n = 5; //设置每组的个数
    _smallImg.find('span.prve').click(function(){
			
			if(_length>n)
				{
					if(d>parseInt(_length/n))
						return false;
					_smallImg.find('ul').animate({left:-_width*n*d});
					d++;

				}
			else
				return flase;
	
				
		})
	_smallImg.find('span.next').click(function(){

			if(_length>n)
				{
					if(d<=1)
						return false;
					_smallImg.find('ul').animate({left:-_width*n*(d-2)});
					d--;

				}
			else
				return flase;
				
				
		})
	_li.click(function(){
		clearInterval(int)
		autoPlay(_li.index(this))
		})

	
});
var int;//定义setInterval()返回的 ID 值
var i;
var autoPlay = function(i){
	var _bigImg = $('.bigImg a')
	var _alength = _bigImg.length
	for(var ii=0; ii<_alength;ii++)
	{
		if(i==ii)
			{
				_bigImg.eq(ii).fadeIn()
			}
		else
			{
				_bigImg.eq(ii).fadeOut()
			}
	}
	i++;
	if(i==_alength)
		i=0
	//alert(i)
	int = setTimeout('autoPlay('+i+')',5000)
	
	}
