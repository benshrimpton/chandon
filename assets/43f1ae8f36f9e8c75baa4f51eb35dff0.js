
(function($){var _PLUGIN_='mmenu',_VERSION_='4.2.5';if($[_PLUGIN_])
{return;}
var glbl={$wndw:null,$html:null,$body:null,$page:null,$blck:null,$allMenus:null};var _c={},_d={},_e={},_serialnr=0,_strollTop=0;$[_PLUGIN_]=function($menu,opts,conf)
{glbl.$allMenus=glbl.$allMenus.add($menu);this.$menu=$menu;this.opts=opts
this.conf=conf;this.serialnr=_serialnr++;this._init();return this;};$[_PLUGIN_].prototype={open:function()
{var that=this;this._openSetup();setTimeout(function()
{that._openFinish();},50);return'open';},_openSetup:function()
{_strollTop=glbl.$wndw.scrollTop();this.$menu.addClass(_c.current);glbl.$allMenus.not(this.$menu).trigger(_e.close);glbl.$page.data(_d.style,glbl.$page.attr('style')||'');glbl.$wndw.trigger(_e.resize,[true]);if(this.opts.modal)
{glbl.$html.addClass(_c.modal);}
if(this.opts.moveBackground)
{glbl.$html.addClass(_c.background);}
if(this.opts.position!='left')
{glbl.$html.addClass(_c.mm(this.opts.position));}
if(this.opts.zposition!='back')
{glbl.$html.addClass(_c.mm(this.opts.zposition));}
if(this.opts.classes)
{glbl.$html.addClass(this.opts.classes);}
glbl.$html.addClass(_c.opened);this.$menu.addClass(_c.opened);},_openFinish:function()
{var that=this;transitionend(glbl.$page,function()
{that.$menu.trigger(_e.opened);},this.conf.transitionDuration);glbl.$html.addClass(_c.opening);this.$menu.trigger(_e.opening);},close:function()
{var that=this;transitionend(glbl.$page,function()
{that.$menu.removeClass(_c.current).removeClass(_c.opened);glbl.$html.removeClass(_c.opened).removeClass(_c.modal).removeClass(_c.background).removeClass(_c.mm(that.opts.position)).removeClass(_c.mm(that.opts.zposition));if(that.opts.classes)
{glbl.$html.removeClass(that.opts.classes);}
glbl.$page.attr('style',glbl.$page.data(_d.style));that.$menu.trigger(_e.closed);},this.conf.transitionDuration);glbl.$html.removeClass(_c.opening);this.$menu.trigger(_e.closing);return'close';},_init:function()
{this.opts=extendOptions(this.opts,this.conf,this.$menu);this.direction=(this.opts.slidingSubmenus)?'horizontal':'vertical';this._initPage(glbl.$page);this._initMenu();this._initBlocker();this._initPanles();this._initLinks();this._initOpenClose();this._bindCustomEvents();if($[_PLUGIN_].addons)
{for(var a=0;a<$[_PLUGIN_].addons.length;a++)
{if(typeof this['_addon_'+$[_PLUGIN_].addons[a]]=='function')
{this['_addon_'+$[_PLUGIN_].addons[a]]();}}}},_bindCustomEvents:function()
{var that=this;this.$menu.off(_e.open+' '+_e.close+' '+_e.setPage+' '+_e.update).on(_e.open+' '+_e.close+' '+_e.setPage+' '+_e.update,function(e)
{e.stopPropagation();});this.$menu.on(_e.open,function(e)
{if($(this).hasClass(_c.current))
{e.stopImmediatePropagation();return false;}
return that.open();}).on(_e.close,function(e)
{if(!$(this).hasClass(_c.current))
{e.stopImmediatePropagation();return false;}
return that.close();}).on(_e.setPage,function(e,$p)
{that._initPage($p);that._initOpenClose();});var $panels=this.$menu.find(this.opts.isMenu&&this.direction!='horizontal'?'ul, ol':'.'+_c.panel);$panels.off(_e.toggle+' '+_e.open+' '+_e.close).on(_e.toggle+' '+_e.open+' '+_e.close,function(e)
{e.stopPropagation();});if(this.direction=='horizontal')
{$panels.on(_e.open,function(e)
{return openSubmenuHorizontal($(this),that.$menu);});}
else
{$panels.on(_e.toggle,function(e)
{var $t=$(this);return $t.triggerHandler($t.parent().hasClass(_c.opened)?_e.close:_e.open);}).on(_e.open,function(e)
{$(this).parent().addClass(_c.opened);return'open';}).on(_e.close,function(e)
{$(this).parent().removeClass(_c.opened);return'close';});}},_initBlocker:function()
{var that=this;if(!glbl.$blck)
{glbl.$blck=$('<div id="'+_c.blocker+'" />').appendTo(glbl.$body);}
glbl.$blck.off(_e.touchstart).on(_e.touchstart,function(e)
{e.preventDefault();e.stopPropagation();glbl.$blck.trigger(_e.mousedown);}).on(_e.mousedown,function(e)
{e.preventDefault();if(!glbl.$html.hasClass(_c.modal))
{that.$menu.trigger(_e.close);}});},_initPage:function($p)
{if(!$p)
{$p=$(this.conf.pageSelector,glbl.$body);if($p.length>1)
{$[_PLUGIN_].debug('Multiple nodes found for the page-node, all nodes are wrapped in one <'+this.conf.pageNodetype+'>.');$p=$p.wrapAll('<'+this.conf.pageNodetype+' />').parent();}}
$p.addClass(_c.page);glbl.$page=$p;},_initMenu:function()
{var that=this;if(this.conf.clone)
{this.$menu=this.$menu.clone(true);this.$menu.add(this.$menu.find('*')).filter('[id]').each(function()
{$(this).attr('id',_c.mm($(this).attr('id')));});}
this.$menu.contents().each(function()
{if($(this)[0].nodeType==3)
{$(this).remove();}});this.$menu[this.conf.menuInjectMethod+'To'](this.conf.menuWrapperSelector).addClass(_c.menu);this.$menu.addClass(_c.mm(this.direction));if(this.opts.classes)
{this.$menu.addClass(this.opts.classes);}
if(this.opts.isMenu)
{this.$menu.addClass(_c.ismenu);}
if(this.opts.position!='left')
{this.$menu.addClass(_c.mm(this.opts.position));}
if(this.opts.zposition!='back')
{this.$menu.addClass(_c.mm(this.opts.zposition));}},_initPanles:function()
{var that=this;this.__refactorClass($('.'+this.conf.listClass,this.$menu),'list');if(this.opts.isMenu)
{$('ul, ol',this.$menu).not('.mm-nolist').addClass(_c.list);}
var $lis=$('.'+_c.list+' > li',this.$menu);this.__refactorClass($lis.filter('.'+this.conf.selectedClass),'selected');this.__refactorClass($lis.filter('.'+this.conf.labelClass),'label');this.__refactorClass($lis.filter('.'+this.conf.spacerClass),'spacer');$lis.off(_e.setSelected).on(_e.setSelected,function(e,selected)
{e.stopPropagation();$lis.removeClass(_c.selected);if(typeof selected!='boolean')
{selected=true;}
if(selected)
{$(this).addClass(_c.selected);}});this.__refactorClass($('.'+this.conf.panelClass,this.$menu),'panel');this.$menu.children().filter(this.conf.panelNodetype).add(this.$menu.find('.'+_c.list).children().children().filter(this.conf.panelNodetype)).addClass(_c.panel);var $panels=$('.'+_c.panel,this.$menu);$panels.each(function(i)
{var $t=$(this),id=$t.attr('id')||_c.mm('m'+that.serialnr+'-p'+i);$t.attr('id',id);});$panels.find('.'+_c.panel).each(function(i)
{var $t=$(this),$u=$t.is('ul, ol')?$t:$t.find('ul ,ol').first(),$l=$t.parent(),$a=$l.find('> a, > span'),$p=$l.closest('.'+_c.panel);$t.data(_d.parent,$l);if($l.parent().is('.'+_c.list))
{var $btn=$('<a class="'+_c.subopen+'" href="#'+$t.attr('id')+'" />').insertBefore($a);if(!$a.is('a'))
{$btn.addClass(_c.fullsubopen);}
if(that.direction=='horizontal')
{$u.prepend('<li class="'+_c.subtitle+'"><a class="'+_c.subclose+'" href="#'+$p.attr('id')+'">'+$a.text()+'</a></li>');}}});var evt=this.direction=='horizontal'?_e.open:_e.toggle;$panels.each(function(i)
{var $opening=$(this),id=$opening.attr('id');$('a[href="#'+id+'"]',that.$menu).off(_e.click).on(_e.click,function(e)
{e.preventDefault();$opening.trigger(evt);});});if(this.direction=='horizontal')
{var $selected=$('.'+_c.list+' > li.'+_c.selected,this.$menu);$selected.parents('li').removeClass(_c.selected).end().add($selected.parents('li')).each(function()
{var $t=$(this),$u=$t.find('> .'+_c.panel);if($u.length)
{$t.parents('.'+_c.panel).addClass(_c.subopened);$u.addClass(_c.opened);}}).closest('.'+_c.panel).addClass(_c.opened).parents('.'+_c.panel).addClass(_c.subopened);}
else
{var $selected=$('li.'+_c.selected,this.$menu);$selected.parents('li').removeClass(_c.selected).end().add($selected.parents('li')).addClass(_c.opened);}
var $current=$panels.filter('.'+_c.opened);if(!$current.length)
{$current=$panels.first();}
$current.addClass(_c.opened).last().addClass(_c.current);if(this.direction=='horizontal')
{$panels.find('.'+_c.panel).appendTo(this.$menu);}},_initLinks:function()
{var that=this;$('.'+_c.list+' > li > a',this.$menu).not('.'+_c.subopen).not('.'+_c.subclose).not('[rel="external"]').not('[target="_blank"]').off(_e.click).on(_e.click,function(e)
{var $t=$(this),href=$t.attr('href');if(that.__valueOrFn(that.opts.onClick.setSelected,$t))
{$t.parent().trigger(_e.setSelected);}
var preventDefault=that.__valueOrFn(that.opts.onClick.preventDefault,$t,href.slice(0,1)=='#');if(preventDefault)
{e.preventDefault();}
if(that.__valueOrFn(that.opts.onClick.blockUI,$t,!preventDefault))
{glbl.$html.addClass(_c.blocking);}
if(that.__valueOrFn(that.opts.onClick.close,$t,preventDefault))
{that.$menu.triggerHandler(_e.close);}});},_initOpenClose:function()
{var that=this;var id=this.$menu.attr('id');if(id&&id.length)
{if(this.conf.clone)
{id=_c.umm(id);}
$('a[href="#'+id+'"]').off(_e.click).on(_e.click,function(e)
{e.preventDefault();that.$menu.trigger(_e.open);});}
var id=glbl.$page.attr('id');if(id&&id.length)
{$('a[href="#'+id+'"]').on(_e.click,function(e)
{e.preventDefault();that.$menu.trigger(_e.close);});}},__valueOrFn:function(o,$e,d)
{if(typeof o=='function')
{return o.call($e[0]);}
if(typeof o=='undefined'&&typeof d!='undefined')
{return d;}
return o;},__refactorClass:function($e,c)
{$e.removeClass(this.conf[c+'Class']).addClass(_c[c]);}};$.fn[_PLUGIN_]=function(opts,conf)
{if(!glbl.$wndw)
{_initPlugin();}
opts=extendOptions(opts,conf);conf=extendConfiguration(conf);return this.each(function()
{var $menu=$(this);if($menu.data(_PLUGIN_))
{return;}
$menu.data(_PLUGIN_,new $[_PLUGIN_]($menu,opts,conf));});};$[_PLUGIN_].version=_VERSION_;$[_PLUGIN_].defaults={position:'left',zposition:'back',moveBackground:true,slidingSubmenus:true,modal:false,classes:'',onClick:{setSelected:true}};$[_PLUGIN_].configuration={panelClass:'Panel',listClass:'List',selectedClass:'Selected',labelClass:'Label',spacerClass:'Spacer',pageNodetype:'div',panelNodetype:'ul, ol, div',pageSelector:null,menuWrapperSelector:'body',menuInjectMethod:'prepend',transitionDuration:400};(function(){var wd=window.document,ua=window.navigator.userAgent,ds=document.createElement('div').style;var _touch='ontouchstart'in wd,_overflowscrolling='WebkitOverflowScrolling'in wd.documentElement.style,_oldAndroidBrowser=(function(){if(ua.indexOf('Android')>=0)
{return 2.4>parseFloat(ua.slice(ua.indexOf('Android')+8));}
return false;})();$[_PLUGIN_].support={touch:_touch,oldAndroidBrowser:_oldAndroidBrowser,overflowscrolling:(function(){if(!_touch)
{return true;}
if(_overflowscrolling)
{return true;}
if(_oldAndroidBrowser)
{return false;}
return true;})()};})();$[_PLUGIN_].debug=function(msg){};$[_PLUGIN_].deprecated=function(depr,repl)
{if(typeof console!='undefined'&&typeof console.warn!='undefined')
{console.warn('MMENU: '+depr+' is deprecated, use '+repl+' instead.');}};function extendOptions(o,c,$m)
{if($m)
{if(typeof o!='object')
{o={};}
if(typeof o.isMenu!='boolean')
{var $c=$m.children();o.isMenu=($c.length==1&&$c.is(c.panelNodetype));}
return o;}
o=$.extend(true,{},$[_PLUGIN_].defaults,o);if(o.position=='top'||o.position=='bottom')
{if(o.zposition=='back'||o.zposition=='next')
{$[_PLUGIN_].deprecated('Using position "'+o.position+'" in combination with zposition "'+o.zposition+'"','zposition "front"');o.zposition='front';}}
return o;}
function extendConfiguration(c)
{c=$.extend(true,{},$[_PLUGIN_].configuration,c)
if(typeof c.pageSelector!='string')
{c.pageSelector='> '+c.pageNodetype;}
if(c.menuInjectMethod!='append')
{c.menuInjectMethod='prepend';}
return c;}
function _initPlugin()
{glbl.$wndw=$(window);glbl.$html=$('html');glbl.$body=$('body');glbl.$allMenus=$();$.each([_c,_d,_e],function(i,o)
{o.add=function(c)
{c=c.split(' ');for(var d in c)
{o[c[d]]=o.mm(c[d]);}};});_c.mm=function(c){return'mm-'+c;};_c.add('menu ismenu panel list subtitle selected label spacer current highest hidden page blocker modal background opened opening subopened subopen fullsubopen subclose');_c.umm=function(c)
{if(c.slice(0,3)=='mm-')
{c=c.slice(3);}
return c;};_d.mm=function(d){return'mm-'+d;};_d.add('parent style');_e.mm=function(e){return e+'.mm';};_e.add('toggle open opening opened close closing closed update setPage setSelected transitionend webkitTransitionEnd mousedown touchstart mouseup touchend scroll touchmove click keydown keyup resize');glbl.$wndw.on(_e.keydown,function(e)
{if(glbl.$html.hasClass(_c.opened))
{if(e.keyCode==9)
{e.preventDefault();return false;}}});var _h=0;glbl.$wndw.on(_e.resize,function(e,force)
{if(force||glbl.$html.hasClass(_c.opened))
{var nh=glbl.$wndw.height();if(force||nh!=_h)
{_h=nh;glbl.$page.css('minHeight',nh);}}});$[_PLUGIN_]._c=_c;$[_PLUGIN_]._d=_d;$[_PLUGIN_]._e=_e;$[_PLUGIN_].glbl=glbl;}
function openSubmenuHorizontal($opening,$m)
{if($opening.hasClass(_c.current))
{return false;}
var $panels=$('.'+_c.panel,$m),$current=$panels.filter('.'+_c.current);$panels.removeClass(_c.highest).removeClass(_c.current).not($opening).not($current).addClass(_c.hidden);if($opening.hasClass(_c.opened))
{$current.addClass(_c.highest).removeClass(_c.opened).removeClass(_c.subopened);}
else
{$opening.addClass(_c.highest);$current.addClass(_c.subopened);}
$opening.removeClass(_c.hidden).removeClass(_c.subopened).addClass(_c.current).addClass(_c.opened);return'open';}
function transitionend($e,fn,duration)
{var _ended=false,_fn=function()
{if(!_ended)
{fn.call($e[0]);}
_ended=true;};$e.one(_e.transitionend,_fn);$e.one(_e.webkitTransitionEnd,_fn);setTimeout(_fn,duration*1.1);}})(jQuery);jQuery.easing['jswing']=jQuery.easing['swing'];jQuery.extend(jQuery.easing,{def:'easeOutQuad',swing:function(x,t,b,c,d){return jQuery.easing[jQuery.easing.def](x,t,b,c,d);},easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b;},easeOutQuad:function(x,t,b,c,d){return-c*(t/=d)*(t-2)+b;},easeInOutQuad:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*((--t)*(t-2)-1)+b;},easeInCubic:function(x,t,b,c,d){return c*(t/=d)*t*t+b;},easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},easeInOutCubic:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},easeInQuart:function(x,t,b,c,d){return c*(t/=d)*t*t*t+b;},easeOutQuart:function(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;},easeInOutQuart:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b;},easeInQuint:function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b;},easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},easeInOutQuint:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},easeInSine:function(x,t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b;},easeOutSine:function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},easeInOutSine:function(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b;},easeInExpo:function(x,t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b;},easeOutExpo:function(x,t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;},easeInOutExpo:function(x,t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b;},easeInCirc:function(x,t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b;},easeOutCirc:function(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},easeInOutCirc:function(x,t,b,c,d){if((t/=d/2)<1)return-c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},easeInElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},easeOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;},easeInOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},easeInBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b;},easeOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},easeInOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},easeInBounce:function(x,t,b,c,d){return c-jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b;},easeOutBounce:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;}},easeInOutBounce:function(x,t,b,c,d){if(t<d/2)return jQuery.easing.easeInBounce(x,t*2,0,c,d)*.5+b;return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d)*.5+c*.5+b;}});!function(a){var b="waitForImages";a.waitForImages={hasImageProperties:["backgroundImage","listStyleImage","borderImage","borderCornerImage","cursor"]},a.expr[":"].uncached=function(b){if(!a(b).is('img[src!=""]'))return!1;var c=new Image;return c.src=b.src,!c.complete},a.fn.waitForImages=function(c,d,e){var f=0,g=0;if(a.isPlainObject(arguments[0])&&(e=arguments[0].waitForAll,d=arguments[0].each,c=arguments[0].finished),c=c||a.noop,d=d||a.noop,e=!!e,!a.isFunction(c)||!a.isFunction(d))throw new TypeError("An invalid callback was supplied.");return this.each(function(){var h=a(this),i=[],j=a.waitForImages.hasImageProperties||[],k=/url\(\s*(['"]?)(.*?)\1\s*\)/g;e?h.find("*").addBack().each(function(){var b=a(this);b.is("img:uncached")&&i.push({src:b.attr("src"),element:b[0]}),a.each(j,function(a,c){var d,e=b.css(c);if(!e)return!0;for(;d=k.exec(e);)i.push({src:d[2],element:b[0]})})}):h.find("img:uncached").each(function(){i.push({src:this.src,element:this})}),f=i.length,g=0,0===f&&c.call(h[0]),a.each(i,function(e,i){var j=new Image;a(j).on("load."+b+" error."+b,function(a){return g++,d.call(i.element,g,f,"load"==a.type),g==f?(c.call(h[0]),!1):void 0}),j.src=i.src})})}}(jQuery);(function($){"use strict";$.fn.fitVids=function(options){var settings={customSelector:null,ignore:null,};if(!document.getElementById('fit-vids-style')){var head=document.head||document.getElementsByTagName('head')[0];var css='.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';var div=document.createElement('div');div.innerHTML='<p>x</p><style id="fit-vids-style">'+css+'</style>';head.appendChild(div.childNodes[1]);}
if(options){$.extend(settings,options);}
return this.each(function(){var selectors=["iframe[src*='player.vimeo.com']","iframe[src*='youtube.com']","iframe[src*='youtube-nocookie.com']","iframe[src*='kickstarter.com'][src*='video.html']","object","embed"];if(settings.customSelector){selectors.push(settings.customSelector);}
var ignoreList='.fitvidsignore';if(settings.ignore){ignoreList=ignoreList+', '+settings.ignore;}
var $allVideos=$(this).find(selectors.join(','));$allVideos=$allVideos.not("object object");$allVideos=$allVideos.not(ignoreList);$allVideos.each(function(){var $this=$(this);if($this.parents(ignoreList).length>0){return;}
if(this.tagName.toLowerCase()==='embed'&&$this.parent('object').length||$this.parent('.fluid-width-video-wrapper').length){return;}
if((!$this.css('height')&&!$this.css('width'))&&(isNaN($this.attr('height'))||isNaN($this.attr('width'))))
{$this.attr('height',9);$this.attr('width',16);}
var height=(this.tagName.toLowerCase()==='object'||($this.attr('height')&&!isNaN(parseInt($this.attr('height'),10))))?parseInt($this.attr('height'),10):$this.height(),width=!isNaN(parseInt($this.attr('width'),10))?parseInt($this.attr('width'),10):$this.width(),aspectRatio=height/width;if(!$this.attr('id')){var videoID='fitvid'+Math.floor(Math.random()*999999);$this.attr('id',videoID);}
$this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top',(aspectRatio*100)+"%");$this.removeAttr('height').removeAttr('width');});});};})(window.jQuery||window.Zepto);$('.video-wrapper').fitVids();$('.menu a[href*=#]:not([href=#])').click(function(e){if(location.pathname.replace(/^\//,'')==this.pathname.replace(/^\//,'')&&location.hostname==this.hostname){var target=$(this.hash);target=target.length?target:$('[name='+this.hash.slice(1)+']');if(target.length){$('html,body').stop().animate({scrollTop:target.offset().top},500,'easeInOutCubic',function(){$('.menu').removeClass('open');});return false;}}});$('.menu-toggle-button').click(function(){$('.menu').toggleClass('open');});function resizeFirstSection(){var winheight=$(window).height();var winWidth=$(window).width();var firstSection=$('.inner');firstSection.css({'min-width':winWidth+'px','height':winheight+'px'});}
$(window).on('resize',function(){resizeFirstSection();});$(document).ready(function(){resizeFirstSection();$.waitForImages.hasImgProperties=['backgroundImage']
$('#intro').waitForImages(function(){$(this).addClass('loaded');},$.noop,true);});