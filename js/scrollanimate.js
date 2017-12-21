// JavaScript Document

function scrollTop(obj,scroller,step)
{	
	this.timer = null
	this.size = 0
	this.step = step		
	this.obj = obj
	this.scroller = scroller
	this.num = 	Math.ceil(this.obj.find("div.core").length)
	this.oStop = this.obj.find("div.core")
	this.str = ""
}
scrollTop.prototype.init = function(){
	var _this = this
	for(var i = 0;i<this.num;i++)
	{
		this.str +="<li></li>" 
	}	
	$("#list ul").html('<li id="pre"></li>'+this.str+'<li id="next"></li>')
	this.aLi = $("#list > ul >li")
	this.aLi.eq(1).addClass("active")
	for(var i = 0;i<this.aLi.length;i++)
	{
		if(i == 0||i == this.aLi.length - 1)
		{
			continue
		}
		this.aLi.eq(i).mouseover(function(){
			clearTimeout(_this.timer)
			_this.timerr = null
			_this.aLi.removeClass("active")
			$(this).addClass("active")
			_this.size = _this.aLi.index($(this)[0]) - 1
			_this.scroller.stop().animate({top:-_this.size*_this.step},300,_this.callback())
		})
	}
	this.oStop.each(function(){
		$(this).hover(function(){
			_this.stopScroll()
		},
		function(){
			_this.callback()
		})	
	})
	this.callback()
}
scrollTop.prototype.callback = function(){
	var _this = this
	this.timer = setTimeout(function(){_this.scrollfun()},3000)
}
scrollTop.prototype.scrollfun = function(){
	var _this = this
	this.timer = null
	this.size++
	if(this.size>=this.num)
	{
		this.size = 0
	}
	this.aLi.removeClass("active")
	this.aLi.eq(this.size+1).addClass("active")
	console.log("123")
	this.scroller.stop().animate({top:-this.size*this.step},300,"easeInOutQuad",this.callback())
	
} 
scrollTop.prototype.stopScroll = function(){
	var _this = this
	clearTimeout(this.timer)
	this.timer = null
}
