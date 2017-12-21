// JavaScript Document
$(function(){

	$("#List1 .pic img").hover(function(){$(".bimg img").attr("src",$(this).attr("src"));$(".bimg img").attr("jqimg",$(this).attr("src")); ;$(".bimg a").attr("href",$(this).attr("src"));})
	
	
	
	/*导航*/
	$("#menu > li").hover(function(){
		$(this).addClass("hcr")		
	},function(){
		$(this).removeClass("hcr")		
	})
	
	/*banner按钮*/
	$("#minshow").hover(function(){
		//$(this).hover(function(){$(".btn-left-css,.btn-right-css").show()},function(){$(".btn-left-css,.btn-right-css").hide()})
		$("#btn").stop(true,true).fadeIn()	
	},
	function(){
		$("#btn").stop(true,true).fadeOut()		
	})
	/*产品分类效果*/
	$(".RSP16_02").eq(0).hover(function(){
		$(this).find("ul.menus").eq(0).stop(true,true).show()	
	},
	function(){
		$(this).find("ul.menus").eq(0).stop(true,true).hide()			
	})
	$("#speclist > ul > li").hover(function(){
		$(this).addClass("hover")
		$(this).find("div.dropdown_4columns").stop(true,true).show()	
	},
	function(){
		$(this).removeClass("hover")
		$(this).find("div.dropdown_4columns").stop(true,true).hide()		
	})
	
	/*顶部购物车*/
	$("#shopcarT > div.shopcarts").hover(function(){
		$(this).find("div.shopcart").addClass("shophover")
		$(this).find("div.shopcartlist").stop(true,true).show()
	},
	function(){
		$(this).find("div.shopcart").removeClass("shophover")
		$(this).find("div.shopcartlist").stop(true,true).hide()	
	})
	
	/*易居乐自有卡*/
	$('#minshow .a_bigImg').soChange({
		thumbObj:'#minshow .ul_change_a2 span', 
		//导航为数字形式，选择器指向包含数字的span对象 
		thumbNowClass:'on', 
		//自定义导航对象当前class为on 
		changeTime:4000,
		//自定义切换时间为4000ms 个
		botPrev:'.btn-left-css', // 按钮，上一个 
		botNext:'.btn-right-css' // 按钮，下一个  
	});
	
	/*商品最终顶部悬停*/
	var $hTop = $("#fixedTab").offset().top
	$(window).scroll(function(){
		setTimeout(function(){
			if($(window).scrollTop()>=$hTop)
			{
				$("#fixedTab").addClass("fixedTab")
				$(".RSP21_01").css("padding-top","30px")
			}
			else
			{
				$("#fixedTab").removeClass("fixedTab")
				$(".RSP21_01").css("padding-top","0px")		
			}
		},10)
	})
	$("#fixedTab").find("li").click(function(){
		$("#fixedTab").find("li").removeClass("hover")
		$(this).addClass("hover")	
	})
	/*种猪预定最终顶部悬停*/	
	var $hTop2 = $("#ttitle").offset().top
	$(window).scroll(function(){
		setTimeout(function(){
			if($(window).scrollTop()>=$hTop2)
			{
				$("#ttitle").addClass("fixedTab")
				$("#coninfo").css({marginTop:60})
			}
			else
			{
				$("#ttitle").removeClass("fixedTab")
				$("#coninfo").css({marginTop:10})		
			}
		},10)
	})
	/*种猪预定最终顶部图集切换*/
	$("#ttitle").find("li").click(function(){
		$("#ttitle").find("li").removeClass("hover")	
		$(this).addClass("hover")
	})
	var Album_false = false
	$("#ttitle").find("li.tag").click(function(){
		$(".RSP64_01").eq(0).find("div.coninfo").css("display","none")
		$(".RSP64_01").eq(0).find("div.RST06_01").css("display","block")	
		if(!Album_false)
		{
			var Album = new YAO.YAlbum();
			Album_false = true
		}
	})
	$("#ttitle").find("li:not('.tag')").click(function(){
		$(".RSP64_01").eq(0).find("div.RST06_01").css("display","none")
		$(".RSP64_01").eq(0).find("div.coninfo").css("display","block")
	})
		
	/*种猪预定最终评论链接去除*/
	$(".RRV07_01").eq(0).find("ul.topTit").find("a").removeAttr("href")
	$(".RRV07_01").eq(0).find("ul.topTit").find("li").click(function(){
		$(".RRV07_01").eq(0).find("ul.topTit").find("li").removeClass("hover")
		$(".RRV07_01").eq(0).find("div.scinfo").css({"display":"none"})
		$(this).addClass("hover")
		$(".RRV07_01").eq(0).find("div.scinfo").eq($(".RRV07_01").eq(0).find("ul.topTit").find("li").index($(this)[0])).css({"display":"block"})
	})
	/*顶部会员下拉*/
	$(".RMB02_01 .loginup").find("li").hover(function(){
		$(this).addClass("borderc");
		$("#showList").css("display","block")	
	},function(){
		$(this).removeClass("borderc")
		$("#showList").css({"display":"none"})	
	})
})

/*产品最终图片切换*/
function show_img(img_src){
document.getElementById("img_show").src=img_src;
document.getElementById("iqimg1").href=img_src;
}