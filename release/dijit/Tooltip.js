//>>built
require({cache:{"url:dijit/templates/Tooltip.html":'<div class="dijitTooltip dijitTooltipLeft" id="dojoTooltip"\n\t><div class="dijitTooltipContainer dijitTooltipContents" data-dojo-attach-point="containerNode" role=\'alert\'></div\n\t><div class="dijitTooltipConnector" data-dojo-attach-point="connectorNode"></div\n></div>\n'}});
define("dijit/Tooltip",["dojo/_base/array","dojo/_base/declare","dojo/_base/fx","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/_base/sniff","dojo/_base/window","./_base/manager","./place","./_Widget","./_TemplatedMixin","./BackgroundIframe","dojo/text!./templates/Tooltip.html","."],function(c,k,l,m,r,n,s,e,o,t,u,v,p,w,x,y,h){var q=k("dijit._MasterTooltip",[p,w],{duration:u.defaultDuration,templateString:y,postCreate:function(){t.body().appendChild(this.domNode);
this.bgIframe=new x(this.domNode);this.fadeIn=l.fadeIn({node:this.domNode,duration:this.duration,onEnd:e.hitch(this,"_onShow")});this.fadeOut=l.fadeOut({node:this.domNode,duration:this.duration,onEnd:e.hitch(this,"_onHide")})},show:function(a,d,j,f,c){if(!this.aroundNode||!(this.aroundNode===d&&this.containerNode.innerHTML==a))if(this.fadeOut.status()=="playing")this._onDeck=arguments;else{this.containerNode.innerHTML=a;this.set("textDir",c);this.containerNode.align=f?"right":"left";var g=v.around(this.domNode,
d,j&&j.length?j:b.defaultPosition,!f,e.hitch(this,"orient")),i=g.aroundNodePos;if(g.corner.charAt(0)=="M"&&g.aroundCorner.charAt(0)=="M")this.connectorNode.style.top=i.y+(i.h-this.connectorNode.offsetHeight>>1)-g.y+"px",this.connectorNode.style.left="";else if(g.corner.charAt(1)=="M"&&g.aroundCorner.charAt(1)=="M")this.connectorNode.style.left=i.x+(i.w-this.connectorNode.offsetWidth>>1)-g.x+"px";s.set(this.domNode,"opacity",0);this.fadeIn.play();this.isShowingNow=!0;this.aroundNode=d}},orient:function(a,
d,b,f,c){this.connectorNode.style.top="";var g=f.h,f=f.w;d.charAt(1)!=b.charAt(1)?f-=this.connectorNode.offsetWidth:g-=this.connectorNode.offsetHeight;a.className="dijitTooltip "+{"MR-ML":"dijitTooltipRight","ML-MR":"dijitTooltipLeft","TM-BM":"dijitTooltipAbove","BM-TM":"dijitTooltipBelow","BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight",
"BL-BR":"dijitTooltipLeft"}[d+"-"+b];this.domNode.style.width="auto";var e=n.getContentBox(this.domNode);this.domNode.style.width=Math.min(Math.max(f,1),e.w)+"px";b.charAt(0)=="B"&&d.charAt(0)=="B"?(a=n.getMarginBox(a),d=this.connectorNode.offsetHeight,a.h>g?(this.connectorNode.style.top=g-(c.h+d>>1)+"px",this.connectorNode.style.bottom=""):(this.connectorNode.style.bottom=Math.min(Math.max(c.h/2-d/2,0),a.h-d)+"px",this.connectorNode.style.top="")):(this.connectorNode.style.top="",this.connectorNode.style.bottom=
"");return Math.max(0,e.w-f)},_onShow:function(){if(o("ie"))this.domNode.style.filter=""},hide:function(a){if(this._onDeck&&this._onDeck[1]==a)this._onDeck=null;else if(this.aroundNode===a)this.fadeIn.stop(),this.isShowingNow=!1,this.aroundNode=null,this.fadeOut.play()},_onHide:function(){this.domNode.style.cssText="";this.containerNode.innerHTML="";if(this._onDeck)this.show.apply(this,this._onDeck),this._onDeck=null},_setAutoTextDir:function(a){this.applyTextDir(a,o("ie")?a.outerText:a.textContent);
c.forEach(a.children,function(a){this._setAutoTextDir(a)},this)},_setTextDirAttr:function(a){this._set("textDir",typeof a!="undefined"?a:"");a=="auto"?this._setAutoTextDir(this.containerNode):this.containerNode.dir=this.textDir}});h.showTooltip=function(a,d,c,f,e){if(!b._masterTT)h._masterTT=b._masterTT=new q;return b._masterTT.show(a,d,c,f,e)};h.hideTooltip=function(a){return b._masterTT&&b._masterTT.hide(a)};var b=k("dijit.Tooltip",p,{label:"",showDelay:400,connectId:[],position:[],_setConnectIdAttr:function(a){c.forEach(this._connections||
[],function(a){c.forEach(a,e.hitch(this,"disconnect"))},this);this._connectIds=c.filter(e.isArrayLike(a)?a:a?[a]:[],function(a){return m.byId(a)});this._connections=c.map(this._connectIds,function(a){a=m.byId(a);return[this.connect(a,"onmouseenter","_onHover"),this.connect(a,"onmouseleave","_onUnHover"),this.connect(a,"onfocus","_onHover"),this.connect(a,"onblur","_onUnHover")]},this);this._set("connectId",a)},addTarget:function(a){a=a.id||a;c.indexOf(this._connectIds,a)==-1&&this.set("connectId",
this._connectIds.concat(a))},removeTarget:function(a){a=c.indexOf(this._connectIds,a.id||a);a>=0&&(this._connectIds.splice(a,1),this.set("connectId",this._connectIds))},buildRendering:function(){this.inherited(arguments);r.add(this.domNode,"dijitTooltipData")},startup:function(){this.inherited(arguments);var a=this.connectId;c.forEach(e.isArrayLike(a)?a:[a],this.addTarget,this)},_onHover:function(a){if(!this._showTimer){var b=a.target;this._showTimer=setTimeout(e.hitch(this,function(){this.open(b)}),
this.showDelay)}},_onUnHover:function(){this._focus||(this._showTimer&&(clearTimeout(this._showTimer),delete this._showTimer),this.close())},open:function(a){this._showTimer&&(clearTimeout(this._showTimer),delete this._showTimer);b.show(this.label||this.domNode.innerHTML,a,this.position,!this.isLeftToRight(),this.textDir);this._connectNode=a;this.onShow(a,this.position)},close:function(){this._connectNode&&(b.hide(this._connectNode),delete this._connectNode,this.onHide());this._showTimer&&(clearTimeout(this._showTimer),
delete this._showTimer)},onShow:function(){},onHide:function(){},uninitialize:function(){this.close();this.inherited(arguments)}});b._MasterTooltip=q;b.show=h.showTooltip;b.hide=h.hideTooltip;b.defaultPosition=["after","before"];return b});