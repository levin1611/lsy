// JavaScript Document
function scrollTop(obj,scroller,step)
{	
	this.timer = null;
	this.size = 0;
	this.obj = obj;
	this.step = step;
	this.scroller = scroller;
	var bijiao = this.scroller.find("div.core").length*this.step;
	if(arguments[3]){
		this.btnl = arguments[3]["btnl"];
		this.btnr = arguments[3]["btnr"];
	}
	else
	{
		this.btnl = this.btnr = $("#ddd");
	}
	if(bijiao>=obj.width()){
		var item = this.scroller.html();
		this.scroller.append(item);
		this.num = this.scroller.find("div.core").length;
		this.scroller.css("width",this.num*this.step);
		this.oStop = this.scroller;
		this.dir = -1;
		this.init();
	}	
}
scrollTop.prototype.init = function(){
	var _this = this;
	this.btnl.click(function(){
		if(!_this.scroller.is(":animated")){
			clearTimeout(_this.timer);
			_this.timer = null;
			_this.dir = -1;
			_this.setPos();
			_this.scrollfun();
		}
	})
	this.btnr.click(function(){
		if(!_this.scroller.is(":animated")){
			clearTimeout(_this.timer);
			_this.timer = null;
			_this.dir = 1;
			_this.setPos();
			_this.scrollfun();
		}
	})
	this.oStop.each(function(){
		$(this).hover(function(){
			_this.stopScroll();
		},
		function(){
			_this.callback();
		})	
	})
	this.callback();
}
scrollTop.prototype.setPos = function(){
	if(Math.abs(this.scroller.position().left)>=this.step*this.num/2 && this.dir == -1)
	{
		this.scroller.css("left",0);
	}
	else if(this.scroller.position().left>=0 && this.dir == 1){
		this.scroller.css("left",-this.step*this.num/2);
	}
}
scrollTop.prototype.callback = function(){
	var _this = this;
	clearTimeout(this.timer);
	this.timer = null;
	this.setPos();
	this.timer = setTimeout(function(){_this.scrollfun()},3000);
}
scrollTop.prototype.scrollfun = function(){
	var _this = this;
    this.scroller.stop().animate({left:this.step*this.dir+this.scroller.position().left},500,function(){_this.callback()});
} 
scrollTop.prototype.stopScroll = function(){
	var _this = this;
	clearTimeout(this.timer);
	this.timer = null;
}


new scrollTop($("#proScroll > div.RST36_11"),$("#proScroll > div.RST36_11 > .ST36"),250,{"btnl":$("#slBtn"),"btnr":$("#srBtn")});

