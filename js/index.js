(function(e,t){if(typeof define==="function"&&define.amd){define(["jquery"],t)}else{t(e.jQuery)}})(this,function(e){"use strict";function b(e,t){return typeof e===t}function w(e,t){return!!~(""+e).indexOf(t)}function E(e,t){for(var n in e){var r=e[n];if(!w(r,"-")&&l[r]!==undefined){return t=="pfx"?r:true}}return false}function S(e,t,n){for(var r in e){var i=t[e[r]];if(i!==undefined){if(n===false)return e[r];if(b(i,"function")){return i.bind(n||t)}return i}}return false}function x(e,t,n){var r=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+h.join(r+" ")+r).split(" ");if(b(t,"string")||b(t,"undefined")){return E(i,t)}else{i=(e+" "+p.join(r+" ")+r).split(" ");return S(i,t,n)}}var t,n={image:null,imageAttribute:"image",holderClass:"imageHolder",imgClass:"img-holder-img",container:e("body"),windowObject:e(window),speed:.2,coverRatio:.75,holderMinHeight:200,holderMaxHeight:null,extraHeight:0,mediaWidth:1600,mediaHeight:900,parallax:true,touch:false},r="imageScroll",i="plugin_"+r,s=function(e,t){return function(){return e.apply(t,arguments)}},o={},u=document.documentElement,a="imageScrollModernizr",f=document.createElement(a),l=f.style,c="Webkit Moz O ms",h=c.split(" "),p=c.toLowerCase().split(" "),d={},v=0,m="",g,y=function(e,t,n,r){var i,s,o,f,l=document.createElement("div"),c=document.body,h=c||document.createElement("body");if(parseInt(n,10)){while(n--){o=document.createElement("div");o.id=r?r[n]:a+(n+1);l.appendChild(o)}}i=["&#173;",'<style id="s',a,'">',e,"</style>"].join("");l.id=a;(c?l:h).innerHTML+=i;h.appendChild(l);if(!c){h.style.background="";h.style.overflow="hidden";f=u.style.overflow;u.style.overflow="hidden";u.appendChild(h)}s=t(l,e);if(!c){h.parentNode.removeChild(h);u.style.overflow=f}else{l.parentNode.removeChild(l)}return!!s};d["csstransforms"]=function(){return!!x("transform")};d["csstransforms3d"]=function(){var e=!!x("perspective");if(e&&"webkitPerspective"in u.style){y("@media (transform-3d),(-webkit-transform-3d){#imageScrollModernizr{left:9px;position:absolute;height:3px;}}",function(t,n){e=t.offsetLeft===9&&t.offsetHeight===3})}return e};o.prefixed=function(e,t,n){if(!t){return x(e,"pfx")}else{return x(e,t,n)}};window.requestAnimationFrame=o.prefixed("requestAnimationFrame",window)||function(e,t){var n=(new Date).getTime();var r=Math.max(0,16-(n-v));var i=window.setTimeout(function(){e(n+r)},r);v=n+r;return i};if(d["csstransforms3d"]()){m="csstransforms3d"}else if(d["csstransforms"]()){m="csstransforms"}if(m!==""){g=o.prefixed("transform")}t=function(t,i){this.$imageHolder=e(t);this.settings=e.extend({},n,i);this.image=this.$imageHolder.data(this.settings.imageAttribute)||this.settings.image;this.mediaWidth=this.$imageHolder.data("width")||this.settings.mediaWidth;this.mediaHeight=this.$imageHolder.data("height")||this.settings.mediaHeight;this.coverRatio=this.$imageHolder.data("cover-ratio")||this.settings.coverRatio;this.holderMinHeight=this.$imageHolder.data("min-height")||this.settings.holderMinHeight;this.holderMaxHeight=this.$imageHolder.data("max-height")||this.settings.holderMaxHeight;this.extraHeight=this.$imageHolder.data("extra-height")||this.settings.extraHeight;this.ticking=false;this.refresh=s(this.refresh,this);this._onScroll=s(this._onScroll,this);this._defaults=n;this._name=r;this.init()};e.extend(t.prototype,{constructor:t,init:function(){if(this.image){this.$scrollingElement=e("<img/>",{src:this.image}).addClass(this.settings.imgClass)}else{throw new Error("You need to provide either a data-img attr or an image option")}if(this.settings.touch===true){this.$scrollingElement.css({maxWidth:"100%"}).prependTo(this.$imageHolder)}else if(this.settings.parallax===true){this.$scrollerHolder=e("<div/>",{html:this.$imageHolder.html()}).css({top:0,visibility:"hidden",position:"fixed",overflow:"hidden"}).addClass(this.settings.holderClass).prependTo(this.settings.container);this.$imageHolder.css("visibility","hidden").empty();this.$scrollingElement.css({position:"absolute",visibility:"hidden",maxWidth:"none"}).prependTo(this.$scrollerHolder)}else{this.$scrollerHolder=this.$imageHolder.css({overflow:"hidden"});this.$scrollingElement.css({position:"relative",overflow:"hidden"}).prependTo(this.$imageHolder)}if(this.settings.touch===false){this._bindEvents();this.refresh()}},_adjustImgHolderHeights:function(){var e=this.settings.windowObject.height(),t=this.settings.windowObject.width()-this.settings.container.offset().left,n=this.coverRatio*e,r,i,s,o,u,a,f,l,c;n=this.holderMaxHeight===null||this.holderMaxHeight>n?Math.floor(n):this.holderMaxHeight;n=this.holderMinHeight<n?Math.floor(n):this.holderMinHeight;n+=this.extraHeight;l=Math.floor(e-(e-n)*this.settings.speed);a=Math.round(this.mediaWidth*(l/this.mediaHeight));if(a>=t){f=l}else{a=t;f=Math.round(this.mediaHeight*(a/this.mediaWidth))}c=l-n;u=e+n;o=e*2*(1-this.settings.speed)-c;r=-(c/2+(f-l)/2);i=Math.round((a-t)*-.5);s=r-o/2;this.$scrollingElement.css({height:f,width:a});this.$imageHolder.height(n);this.$scrollerHolder.css({height:n,width:a});this.scrollingState={winHeight:e,fromY:s,imgTopPos:r,imgLeftPos:i,imgHolderHeight:n,imgScrollingDistance:o,travelDistance:u,holderDistanceFromTop:this.$imageHolder.offset().top-this.settings.windowObject.scrollTop()}},_bindEvents:function(){this.settings.windowObject.on("resize",this.refresh);if(this.settings.parallax===true){this.settings.windowObject.on("scroll",this._onScroll)}},_unBindEvents:function(){this.settings.windowObject.off("resize",this.refresh);if(this.settings.parallax===true){this.settings.windowObject.off("scroll",this._onScroll)}},_onScroll:function(){this.scrollingState.holderDistanceFromTop=this.$imageHolder.offset().top-this.settings.windowObject.scrollTop();this._requestTick()},_requestTick:function(){var e=this;if(!this.ticking){this.ticking=true;requestAnimationFrame(function(){e._updatePositions()})}},_updatePositions:function(){if(this.scrollingState.holderDistanceFromTop<=this.scrollingState.winHeight&&this.scrollingState.holderDistanceFromTop>=-this.scrollingState.imgHolderHeight){var e=this.scrollingState.holderDistanceFromTop+this.scrollingState.imgHolderHeight,t=e/this.scrollingState.travelDistance,n=Math.round(this.scrollingState.fromY+this.scrollingState.imgScrollingDistance*(1-t)),r=this.settings.container.offset().left;this.$scrollerHolder.css(this._getCSSObject({transform:g,left:r,x:Math.ceil(this.scrollingState.imgLeftPos)+(m===""&&r>0?r:0),y:Math.round(this.scrollingState.holderDistanceFromTop),visibility:"visible"}));this.$scrollingElement.css(this._getCSSObject({transform:g,x:0,y:n,visibility:"visible"}))}else{this.$scrollerHolder.css({visibility:"hidden"});this.$scrollingElement.css({visibility:"hidden"})}this.ticking=false},_updateFallbackPositions:function(){this.$scrollerHolder.css({width:"100%"});this.$scrollingElement.css({top:this.scrollingState.imgTopPos,left:this.scrollingState.imgLeftPos})},_getCSSObject:function(e){if(m==="csstransforms3d"){e.transform="translate3d("+e.x+"px, "+e.y+"px, 0)"}else if(m==="csstransforms"){e.transform="translate("+e.x+"px, "+e.y+"px)"}else{e.top=e.y;e.left=e.x}return e},enable:function(){if(this.settings.touch===false){this._bindEvents();this.refresh()}},disable:function(){if(this.settings.touch===false){this._unBindEvents()}},refresh:function(){if(this.settings.touch===false){this._adjustImgHolderHeights();if(this.settings.parallax===true){this._requestTick()}else{this._updateFallbackPositions()}}},destroy:function(){if(this.settings.touch===false){this._unBindEvents()}if(this.settings.touch===true){this.$imageHolder.removeAttr("style");this.$scrollingElement.remove()}else if(this.settings.parallax===true){this.$scrollerHolder.find("."+this.settings.imgClass).remove();this.$imageHolder.css({visibility:"visible",height:"auto"}).html(this.$scrollerHolder.html());this.$scrollerHolder.remove()}else{this.$imageHolder.css({overflow:"auto"}).removeAttr("style");this.$scrollingElement.remove()}this.$imageHolder.removeData()}});e.fn[r]=function(n){if(n===undefined||typeof n==="object"){return this.each(function(){if(!e.data(this,i)){e.data(this,i,new t(this,n))}})}else if(typeof n==="string"&&n[0]!=="_"&&n!=="init"){return this.each(function(){var r=e.data(this,i);if(r instanceof t&&typeof r[n]==="function"){r[n].apply(r,Array.prototype.slice.call(arguments,1))}})}};e.fn[r].defaults=t.defaults=n;e.fn[r].Plugin=t;return t})
jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});



var co = 24

$("a.page-scroll").bind("click",function(e){
  var t=$(this);
  $("html, body").stop().animate({
    scrollTop:($(t.attr("href")).offset().top - co)
  },1500,"easeInOutExpo");
  e.preventDefault()
})



$("#intro .image").imageScroll();



var container = $(".splash-container");
var range = 200;
$(window).on("scroll", function () {
    var st = $(this).scrollTop();
    container.each(function () {
        var offset = $(this).offset().top;
        var height = $(this).outerHeight();
        offset = offset + height / 2;
        $(this).css({ "opacity": 1 - (st - offset + range) / range });
    });
});


function initialize() {
  var mapOptions = {
    center: { lat: 47.236577, lng: -93.531686},
    zoom: 15
  };
  var map = new google.maps.Map(document.querySelector(".map"),
      mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);

