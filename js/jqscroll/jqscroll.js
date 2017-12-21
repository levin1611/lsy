function slider(w,h,i){
	this.move = w;
	this.list = $('.slide_box:eq('+i+') .pic li');
	this.len = this.list.length;
	this.num = $('.num_list:eq('+i+') li');
	this.pic = $('.slide_box:eq('+i+') .pic');
	this.current = 0;
	this.time;
}
slider.prototype = {
	init:function(){
		var that = this;
		this.time = setInterval(function(){that.autoplay();},3000);
		this.num.each(function(i){
			$(this).find('a').click(function(e){
				clearInterval(that.time);
				that.pic.animate({"left":-that.move*i+"px"},500);
				if(that.current != i){
					$(that.num[that.current]).find('a').removeClass('on');
					$(that.num[i]).find('a').addClass('on');
				}
				that.current = i;
				e.preventDefault();
				that.time = setInterval(function(){that.autoplay();},3000);
			});
		});
		
	},
	
	autoplay:function(){
		var that = this;
		if(that.current < this.len-1){
			$(that.num[that.current]).find('a').removeClass('on');
			$(that.num[that.current+1]).find('a').addClass('on');
			that.current ++ ;
			that.pic.animate({"left":-that.move*that.current+"px"},500);
			
			
		}else{
			$(that.num[that.current]).find('a').removeClass('on');
			that.current = 0;
			$(that.num[that.current]).find('a').addClass('on');
			that.pic.animate({"left":-that.move*that.current+"px"},500);
			
			
		}
		
	}
}
$(function(){
	for(var i=0;i<$('.slide_box').size();i++){
		new slider($('.slide_box:eq('+i+')').width(),$('.slide_box:eq('+i+')').height(),i).init();
	}
})