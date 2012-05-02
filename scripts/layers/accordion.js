//>>built
require({cache:{"dijit/layout/AccordionContainer":function(){require({cache:{"url:dijit/layout/templates/AccordionButton.html":'<div data-dojo-attach-event=\'onclick:_onTitleClick\' class=\'dijitAccordionTitle\' role="presentation">\n\t<div data-dojo-attach-point=\'titleNode,focusNode\' data-dojo-attach-event=\'onkeypress:_onTitleKeyPress\'\n\t\t\tclass=\'dijitAccordionTitleFocus\' role="tab" aria-expanded="false"\n\t\t><span class=\'dijitInline dijitAccordionArrow\' role="presentation"></span\n\t\t><span class=\'arrowTextUp\' role="presentation">+</span\n\t\t><span class=\'arrowTextDown\' role="presentation">-</span\n\t\t><img src="${_blankGif}" alt="" class="dijitIcon" data-dojo-attach-point=\'iconNode\' style="vertical-align: middle" role="presentation"/>\n\t\t<span role="presentation" data-dojo-attach-point=\'titleTextNode\' class=\'dijitAccordionText\'></span>\n\t</div>\n</div>\n'}});
define("dijit/layout/AccordionContainer",["require","dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/_base/fx","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/_base/sniff","dojo/topic","../focus","../_base/manager","dojo/ready","../_Widget","../_Container","../_TemplatedMixin","../_CssStateMixin","./StackContainer","./ContentPane","dojo/text!./templates/AccordionButton.html"],function(l,m,
f,g,h,b,i,e,j,k,n,a,c,s,t,u,v,w,o,p,x,q,y,A,z){var p=f("dijit.layout._AccordionButton",[o,x,q],{templateString:z,label:"",_setLabelAttr:{node:"titleTextNode",type:"innerHTML"},title:"",_setTitleAttr:{node:"titleTextNode",type:"attribute",attribute:"title"},iconClassAttr:"",_setIconClassAttr:{node:"iconNode",type:"class"},baseClass:"dijitAccordionTitle",getParent:function(){return this.parent},buildRendering:function(){this.inherited(arguments);var d=this.id.replace(" ","_");i.set(this.titleTextNode,
"id",d+"_title");this.focusNode.setAttribute("aria-labelledby",i.get(this.titleTextNode,"id"));b.setSelectable(this.domNode,!1)},getTitleHeight:function(){return k.getMarginSize(this.domNode).h},_onTitleClick:function(){this.getParent().selectChild(this.contentWidget,!0);u.focus(this.focusNode)},_onTitleKeyPress:function(d){return this.getParent()._onKeyPress(d,this.contentWidget)},_setSelectedAttr:function(d){this._set("selected",d);this.focusNode.setAttribute("aria-expanded",d?"true":"false");this.focusNode.setAttribute("aria-selected",
d?"true":"false");this.focusNode.setAttribute("tabIndex",d?"0":"-1")}}),r=f("dijit.layout._AccordionInnerContainer",[o,q],{baseClass:"dijitAccordionInnerContainer",isLayoutContainer:!0,buildRendering:function(){this.domNode=j.place("<div class='"+this.baseClass+"' role='presentation'>",this.contentWidget.domNode,"after");var d=this.contentWidget,a=c.isString(this.buttonWidget)?c.getObject(this.buttonWidget):this.buttonWidget;this.button=d._buttonWidget=(new a({contentWidget:d,label:d.title,title:d.tooltip,
dir:d.dir,lang:d.lang,textDir:d.textDir,iconClass:d.iconClass,id:d.id+"_button",parent:this.parent})).placeAt(this.domNode);this.containerNode=j.place("<div class='dijitAccordionChildWrapper' style='display:none'>",this.domNode);j.place(this.contentWidget.domNode,this.containerNode)},postCreate:function(){this.inherited(arguments);var d=this.button;this._contentWidgetWatches=[this.contentWidget.watch("title",c.hitch(this,function(a,c,k){d.set("label",k)})),this.contentWidget.watch("tooltip",c.hitch(this,
function(a,c,k){d.set("title",k)})),this.contentWidget.watch("iconClass",c.hitch(this,function(a,c,k){d.set("iconClass",k)}))]},_setSelectedAttr:function(d){this._set("selected",d);this.button.set("selected",d);if(d&&(d=this.contentWidget,d.onSelected))d.onSelected()},startup:function(){this.contentWidget.startup()},destroy:function(){this.button.destroyRecursive();m.forEach(this._contentWidgetWatches||[],function(d){d.unwatch()});delete this.contentWidget._buttonWidget;delete this.contentWidget._wrapperWidget;
this.inherited(arguments)},destroyDescendants:function(d){this.contentWidget.destroyRecursive(d)}}),f=f("dijit.layout.AccordionContainer",y,{duration:v.defaultDuration,buttonWidget:p,baseClass:"dijitAccordionContainer",buildRendering:function(){this.inherited(arguments);this.domNode.style.overflow="hidden";this.domNode.setAttribute("role","tablist")},startup:function(){this._started||(this.inherited(arguments),this.selectedChildWidget&&this.selectedChildWidget._wrapperWidget.set("selected",!0))},
layout:function(){var d=this.selectedChildWidget;if(d){var a=d._wrapperWidget.domNode,c=k.getMarginExtents(a),a=k.getPadBorderExtents(a),b=d._wrapperWidget.containerNode,e=k.getMarginExtents(b),b=k.getPadBorderExtents(b),g=this._contentBox,h=0;m.forEach(this.getChildren(),function(a){a!=d&&(h+=k.getMarginSize(a._wrapperWidget.domNode).h)});this._verticalSpace=g.h-h-c.h-a.h-e.h-b.h-d._buttonWidget.getTitleHeight();this._containerContentBox={h:this._verticalSpace,w:this._contentBox.w-c.w-a.w-e.w-b.w};
d&&d.resize(this._containerContentBox)}},_setupChild:function(d){d._wrapperWidget=r({contentWidget:d,buttonWidget:this.buttonWidget,id:d.id+"_wrapper",dir:d.dir,lang:d.lang,textDir:d.textDir,parent:this});this.inherited(arguments)},addChild:function(d,a){if(this._started){var c=this.containerNode;if(a&&typeof a=="number"){var k=o.prototype.getChildren.call(this);if(k&&k.length>=a)c=k[a-1].domNode,a="after"}j.place(d.domNode,c,a);d._started||d.startup();this._setupChild(d);t.publish(this.id+"-addChild",
d,a);this.layout();this.selectedChildWidget||this.selectChild(d)}else this.inherited(arguments)},removeChild:function(a){a._wrapperWidget&&(j.place(a.domNode,a._wrapperWidget.domNode,"after"),a._wrapperWidget.destroy(),delete a._wrapperWidget);e.remove(a.domNode,"dijitHidden");this.inherited(arguments)},getChildren:function(){return m.map(this.inherited(arguments),function(a){return a.declaredClass=="dijit.layout._AccordionInnerContainer"?a.contentWidget:a},this)},destroy:function(){this._animation&&
this._animation.stop();m.forEach(this.getChildren(),function(a){a._wrapperWidget?a._wrapperWidget.destroy():a.destroyRecursive()});this.inherited(arguments)},_showChild:function(a){a._wrapperWidget.containerNode.style.display="block";return this.inherited(arguments)},_hideChild:function(a){a._wrapperWidget.containerNode.style.display="none";this.inherited(arguments)},_transition:function(a,c,b){s("ie")<8&&(b=!1);this._animation&&(this._animation.stop(!0),delete this._animation);var e=this;if(a){a._wrapperWidget.set("selected",
!0);var g=this._showChild(a);this.doLayout&&a.resize&&a.resize(this._containerContentBox)}c&&(c._wrapperWidget.set("selected",!1),b||this._hideChild(c));if(b){var f=a._wrapperWidget.containerNode,i=c._wrapperWidget.containerNode,b=a._wrapperWidget.containerNode,a=k.getMarginExtents(b),b=k.getPadBorderExtents(b),j=a.h+b.h;i.style.height=e._verticalSpace-j+"px";this._animation=new h.Animation({node:f,duration:this.duration,curve:[1,this._verticalSpace-j-1],onAnimate:function(a){a=Math.floor(a);f.style.height=
a+"px";i.style.height=e._verticalSpace-j-a+"px"},onEnd:function(){delete e._animation;f.style.height="auto";c._wrapperWidget.containerNode.style.display="none";i.style.height="auto";e._hideChild(c)}});this._animation.onStop=this._animation.onEnd;this._animation.play()}return g},_onKeyPress:function(d,c){if(!this.disabled&&!(d.altKey||!c&&!d.ctrlKey)){var b=d.charOrCode;if(c&&(b==a.LEFT_ARROW||b==a.UP_ARROW)||d.ctrlKey&&b==a.PAGE_UP)this._adjacent(!1)._buttonWidget._onTitleClick(),g.stop(d);else if(c&&
(b==a.RIGHT_ARROW||b==a.DOWN_ARROW)||d.ctrlKey&&(b==a.PAGE_DOWN||b==a.TAB))this._adjacent(!0)._buttonWidget._onTitleClick(),g.stop(d)}}});n.isAsync||w(0,function(){l(["dijit/layout/AccordionPane"])});f._InnerContainer=r;f._Button=p;return f})},"dijit/layout/StackContainer":function(){define("dijit/layout/StackContainer",["dojo/_base/array","dojo/cookie","dojo/_base/declare","dojo/dom-class","dojo/_base/kernel","dojo/_base/lang","dojo/ready","dojo/topic","../registry","../_WidgetBase","./_LayoutWidget",
"dojo/i18n!../nls/common"],function(l,m,f,g,h,b,i,e,j,k,n){h.isAsync||i(0,function(){require(["dijit/layout/StackController"])});b.extend(k,{selected:!1,closable:!1,iconClass:"dijitNoIcon",showTitle:!0});return f("dijit.layout.StackContainer",n,{doLayout:!0,persist:!1,baseClass:"dijitStackContainer",buildRendering:function(){this.inherited(arguments);g.add(this.domNode,"dijitLayoutContainer");this.containerNode.setAttribute("role","tabpanel")},postCreate:function(){this.inherited(arguments);this.connect(this.domNode,
"onkeypress",this._onKeyPress)},startup:function(){if(!this._started){var a=this.getChildren();l.forEach(a,this._setupChild,this);this.persist?this.selectedChildWidget=j.byId(m(this.id+"_selectedChild")):l.some(a,function(a){if(a.selected)this.selectedChildWidget=a;return a.selected},this);var c=this.selectedChildWidget;if(!c&&a[0])c=this.selectedChildWidget=a[0],c.selected=!0;e.publish(this.id+"-startup",{children:a,selected:c});this.inherited(arguments)}},resize:function(){if(!this._hasBeenShown){this._hasBeenShown=
!0;var a=this.selectedChildWidget;a&&this._showChild(a)}this.inherited(arguments)},_setupChild:function(a){this.inherited(arguments);g.replace(a.domNode,"dijitHidden","dijitVisible");a.domNode.title=""},addChild:function(a,c){this.inherited(arguments);this._started&&(e.publish(this.id+"-addChild",a,c),this.layout(),this.selectedChildWidget||this.selectChild(a))},removeChild:function(a){this.inherited(arguments);this._started&&e.publish(this.id+"-removeChild",a);if(!this._descendantsBeingDestroyed){if(this.selectedChildWidget===
a&&(this.selectedChildWidget=void 0,this._started)){var c=this.getChildren();c.length&&this.selectChild(c[0])}this._started&&this.layout()}},selectChild:function(a,c){a=j.byId(a);if(this.selectedChildWidget!=a){var b=this._transition(a,this.selectedChildWidget,c);this._set("selectedChildWidget",a);e.publish(this.id+"-selectChild",a);this.persist&&m(this.id+"_selectedChild",this.selectedChildWidget.id)}return b},_transition:function(a,c){c&&this._hideChild(c);var b=this._showChild(a);a.resize&&(this.doLayout?
a.resize(this._containerContentBox||this._contentBox):a.resize());return b},_adjacent:function(a){var c=this.getChildren(),b=l.indexOf(c,this.selectedChildWidget);b+=a?1:c.length-1;return c[b%c.length]},forward:function(){return this.selectChild(this._adjacent(!0),!0)},back:function(){return this.selectChild(this._adjacent(!1),!0)},_onKeyPress:function(a){e.publish(this.id+"-containerKeyPress",{e:a,page:this})},layout:function(){var a=this.selectedChildWidget;a&&a.resize&&(this.doLayout?a.resize(this._containerContentBox||
this._contentBox):a.resize())},_showChild:function(a){var c=this.getChildren();a.isFirstChild=a==c[0];a.isLastChild=a==c[c.length-1];a._set("selected",!0);g.replace(a.domNode,"dijitVisible","dijitHidden");return a._onShow&&a._onShow()||!0},_hideChild:function(a){a._set("selected",!1);g.replace(a.domNode,"dijitHidden","dijitVisible");a.onHide&&a.onHide()},closeChild:function(a){a.onClose(this,a)&&(this.removeChild(a),a.destroyRecursive())},destroyDescendants:function(a){this._descendantsBeingDestroyed=
!0;this.selectedChildWidget=void 0;l.forEach(this.getChildren(),function(c){a||this.removeChild(c);c.destroyRecursive(a)},this);this._descendantsBeingDestroyed=!1}})})},"dojo/cookie":function(){define("dojo/cookie",["./_base/kernel","./regexp"],function(l,m){l.cookie=function(f,g,h){var b=document.cookie,i;if(arguments.length==1)i=(i=b.match(RegExp("(?:^|; )"+m.escapeString(f)+"=([^;]*)")))?decodeURIComponent(i[1]):void 0;else{h=h||{};b=h.expires;if(typeof b=="number"){var e=new Date;e.setTime(e.getTime()+
b*864E5);b=h.expires=e}if(b&&b.toUTCString)h.expires=b.toUTCString();var g=encodeURIComponent(g),b=f+"="+g,j;for(j in h)b+="; "+j,e=h[j],e!==!0&&(b+="="+e);document.cookie=b}return i};l.cookie.isSupported=function(){if(!("cookieEnabled"in navigator))this("__djCookieTest__","CookiesAllowed"),navigator.cookieEnabled=this("__djCookieTest__")=="CookiesAllowed",navigator.cookieEnabled&&this("__djCookieTest__","",{expires:-1});return navigator.cookieEnabled};return l.cookie})},"dojo/regexp":function(){define("dojo/regexp",
["./_base/kernel","./_base/lang"],function(l,m){var f=m.getObject("dojo.regexp",!0);f.escapeString=function(g,f){return g.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(b){if(f&&f.indexOf(b)!=-1)return b;return"\\"+b})};f.buildGroupRE=function(g,h,b){if(!(g instanceof Array))return h(g);for(var i=[],e=0;e<g.length;e++)i.push(h(g[e]));return f.group(i.join("|"),b)};f.group=function(f,h){return"("+(h?"?:":"")+f+")"};return f})},"dijit/layout/_LayoutWidget":function(){define("dijit/layout/_LayoutWidget",
["dojo/_base/lang","../_Widget","../_Container","../_Contained","../Viewport","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style"],function(l,m,f,g,h,b,i,e,j){return b("dijit.layout._LayoutWidget",[m,f,g],{baseClass:"dijitLayoutContainer",isLayoutContainer:!0,buildRendering:function(){this.inherited(arguments);i.add(this.domNode,"dijitContainer")},startup:function(){if(!this._started){this.inherited(arguments);var b=this.getParent&&this.getParent();if(!b||!b.isLayoutContainer)this.resize(),
this._connects.push(h.on("resize",l.hitch(this,"resize")))}},resize:function(b,f){var a=this.domNode;b&&e.setMarginBox(a,b);var c=f||{};l.mixin(c,b||{});if(!("h"in c)||!("w"in c))c=l.mixin(e.getMarginBox(a),c);var g=j.getComputedStyle(a),h=e.getMarginExtents(a,g),i=e.getBorderExtents(a,g),c=this._borderBox={w:c.w-(h.w+i.w),h:c.h-(h.h+i.h)},h=e.getPadExtents(a,g);this._contentBox={l:j.toPixelValue(a,g.paddingLeft),t:j.toPixelValue(a,g.paddingTop),w:c.w-h.w,h:c.h-h.h};this.layout()},layout:function(){},
_setupChild:function(b){i.add(b.domNode,this.baseClass+"-child "+(b.baseClass?this.baseClass+"-"+b.baseClass:""))},addChild:function(b){this.inherited(arguments);this._started&&this._setupChild(b)},removeChild:function(b){i.remove(b.domNode,this.baseClass+"-child"+(b.baseClass?" "+this.baseClass+"-"+b.baseClass:""));this.inherited(arguments)}})})},"url:dijit/layout/templates/AccordionButton.html":'<div data-dojo-attach-event=\'onclick:_onTitleClick\' class=\'dijitAccordionTitle\' role="presentation">\n\t<div data-dojo-attach-point=\'titleNode,focusNode\' data-dojo-attach-event=\'onkeypress:_onTitleKeyPress\'\n\t\t\tclass=\'dijitAccordionTitleFocus\' role="tab" aria-expanded="false"\n\t\t><span class=\'dijitInline dijitAccordionArrow\' role="presentation"></span\n\t\t><span class=\'arrowTextUp\' role="presentation">+</span\n\t\t><span class=\'arrowTextDown\' role="presentation">-</span\n\t\t><img src="${_blankGif}" alt="" class="dijitIcon" data-dojo-attach-point=\'iconNode\' style="vertical-align: middle" role="presentation"/>\n\t\t<span role="presentation" data-dojo-attach-point=\'titleTextNode\' class=\'dijitAccordionText\'></span>\n\t</div>\n</div>\n'}});
define("layers/accordion",[],1);