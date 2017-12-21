(function($){
	$.fn.febgmenu = function(op){

		var fb = $.fn.febgmenu,
			c = fb.c,
			$arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
			over = function(){
				var $$ = $(this), menu = getMenu($$);
				clearTimeout(menu.fbTimer);
				$$.showFbmenuUl().siblings().hideFbmenuUl();

			},
			out = function(){
				var $$ = $(this), menu = getMenu($$), o = fb.op;
				clearTimeout(menu.fbTimer);
				menu.fbTimer=setTimeout(function(){
					if (!o.disableHold){o.retainPath=($.inArray($$[0],o.$path)>-1)};
					$$.hideFbmenuUl();
					if (!o.disableHold&&o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
				},o.delay);	
			},
			clk =function (){
				var $$ =$(this),menu =getMenu($$),o = fb.op;
				if(o.autoSH){
					var $ul =$$.find('>ul');
					if($ul.is(':hidden')){
						$$.showFbmenuUl().siblings().hideFbmenuUl();
					}else{
						$$.hideFbmenuUl();
					}
				}
			}
			getMenu = function($menu){	
				var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
				fb.op = fb.o[$(menu).parent().get(0).serial];
				return menu;
			},
			addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };
			rehref = function ($a){ $a.attr('href','javascript:;')};
			
		return this.each(function() {
			var s = this.serial = fb.o.length;
			var o = $.extend({},fb.defaults,op);
			
			o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
				$(this).addClass(o.hoverClass);
			});
			fb.o[s] = fb.op = o;
			if (o.showType==1){
				$('li:has(ul)',this).click(clk).each(function() {
					var $a = $('>a:first-child',this);
					if (o.autoArrows) addArrow($a);
					if (o.autoRehref) rehref ($a);
				}).filter('.'+o.pathClass).showFbmenuUl();
			}
			else{
				$('li:has(ul)',this)[($.fn.hoverIntent && o.showType==3) ? 'hoverIntent' : 'hover'](over,out).each(function() {
					
			
					
					if (o.autoArrows) addArrow( $('>a:first-child',this) );
				}).not('.'+o.pathClass).hideFbmenuUl();
				
				
			}
			/*var $a = $('a',this);
			$a.each(function(i){
				var $li = $a.eq(i).parents('li');
				$a.eq(i).focus(function(){over.call($li);}).blur(function(){
					var o =fb.op;
					if (o.disableHold){
						if(o.showType==1){
							clk.call($li);
						}
						else{
							out.call($li);
						}
					}
				});
			});*/
			o.onInit.call(this);
			if(o.autoWidth){
				$(this).autoWidth();
			}
		}).each(function() {
			var menuClasses = [c.menuClass];
			if (fb.op.dropShadows  && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
			$(this).children('ul').addClass(menuClasses.join(' '));
		});
	};

	var fb = $.fn.febgmenu;
	fb.o = [];
	fb.op = {};
	fb.IE7fix = function(){
		var o = fb.op;
		if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity!=undefined)
			
		{
		this.toggleClass(fb.c.shadowClass+'-off');
		
		}
		};
	fb.c = {
		menuClass   : 'fb-mn',//menu ul的样式
		anchorClass : 'fb-a',//含有子菜单的A标签的样式
		arrowClass  : 'fb-sub',//含有子菜单箭头的样式
		shadowClass : 'fb-shadow'//使用阴影特效时阴影的样式，IE>=7,FF支持阴影 
	};
	fb.defaults = {
		hoverClass	: 'hcr',//鼠标滑过li样式
		pathClass	: 'cr',//聚焦使用样式
		pathLevels	: 1,
		delay		: 0,//菜单自动回收间隔时间  mouseover方式有效
		animation	: {opacity:'show'},//显示执行动画默认阴影效果
		speed		: 0,//菜单显示速度
		autoArrows	: false,//是否在有下一级子菜单的时候加入箭头
		autoRehref	: false,//是否屏蔽非叶子级菜单的链接
		autoSH  :     false,//是否自动伸缩点击菜单（点击菜单时有效）
		dropShadows : true,//是否使用阴影特效IE>=7,FF支持
		showType  : 2,     //菜单展示方式 1：click点击方式，2：mouseover 方式 3：mouseover延时特效方式，需要hI支持
		disableHold	: true,		// 是否使用聚焦菜单打开后自动收起 mouseover方式有效
		onInit		: function(){}, // callback functions函数
		onBeforeShow: function(){},//菜单每次显示之前执行
		onShow		: function(){},//菜单显示之后执行
		onHide		: function(){},//菜单隐藏之后执行
		autoWidth : false//是否使用自适应宽度
	};
	$.fn.extend({
		hideFbmenuUl : function(){
			var o = fb.op,
				not = (o.retainPath===true) ? o.$path : '';
			o.retainPath = false;
			var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
					.find('>ul').hide().css('visibility','hidden');
			o.onHide.call($ul);
			return this;
		},
		showFbmenuUl : function(){
			var o = fb.op,
				sh = fb.c.shadowClass+'-off',
				$ul = this.addClass(o.hoverClass)
					.find('>ul:hidden').css('visibility','visible');
			   
			fb.IE7fix.call($ul);
			o.onBeforeShow.call($ul);
			$ul.animate(o.animation,o.speed,function(){ fb.IE7fix.call($ul); o.onShow.call($ul); });
			return this;
		},
		autoWidth :function(){
			$ul= this.find('li:has(ul)');
			$ul.each(function(){
				$$=$(this).find('li ul');
				$w=$$.parents('ul').width();
				$$.css('left',$w-3);

				$$.css('top',-10);
			})
		}
	});

})(jQuery);
