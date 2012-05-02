//>>built
require({cache:{"dijit/form/DropDownButton":function(){require({cache:{"url:dijit/form/templates/DropDownButton.html":'<span class="dijit dijitReset dijitInline"\n\t><span class=\'dijitReset dijitInline dijitButtonNode\'\n\t\tdata-dojo-attach-event="ondijitclick:_onClick" data-dojo-attach-point="_buttonNode"\n\t\t><span class="dijitReset dijitStretch dijitButtonContents"\n\t\t\tdata-dojo-attach-point="focusNode,titleNode,_arrowWrapperNode"\n\t\t\trole="button" aria-haspopup="true" aria-labelledby="${id}_label"\n\t\t\t><span class="dijitReset dijitInline dijitIcon"\n\t\t\t\tdata-dojo-attach-point="iconNode"\n\t\t\t></span\n\t\t\t><span class="dijitReset dijitInline dijitButtonText"\n\t\t\t\tdata-dojo-attach-point="containerNode,_popupStateNode"\n\t\t\t\tid="${id}_label"\n\t\t\t></span\n\t\t\t><span class="dijitReset dijitInline dijitArrowButtonInner"></span\n\t\t\t><span class="dijitReset dijitInline dijitArrowButtonChar">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type="${type}" value="${value}" class="dijitOffScreen" tabIndex="-1"\n\t\tdata-dojo-attach-point="valueNode"\n/></span>\n'}});
define("dijit/form/DropDownButton",["dojo/_base/declare","dojo/_base/lang","dojo/query","../registry","../popup","./Button","../_Container","../_HasDropDown","dojo/text!./templates/DropDownButton.html"],function(g,j,e,a,k,l,d,n,p){return g("dijit.form.DropDownButton",[l,d,n],{baseClass:"dijitDropDownButton",templateString:p,_fillContent:function(){if(this.srcNodeRef){var f=e("*",this.srcNodeRef);this.inherited(arguments,[f[0]]);this.dropDownContainer=this.srcNodeRef}},startup:function(){if(!this._started){if(!this.dropDown&&
this.dropDownContainer){var f=e("[widgetId]",this.dropDownContainer)[0];this.dropDown=a.byNode(f);delete this.dropDownContainer}this.dropDown&&k.hide(this.dropDown);this.inherited(arguments)}},isLoaded:function(){var f=this.dropDown;return!!f&&(!f.href||f.isLoaded)},loadDropDown:function(f){var d=this.dropDown,k=d.on("load",j.hitch(this,function(){k.remove();f()}));d.refresh()},isFocusable:function(){return this.inherited(arguments)&&!this._mouseDown}})})},"dijit/popup":function(){define("dijit/popup",
["dojo/_base/array","dojo/aspect","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window","./place","./BackgroundIframe","."],function(g,j,e,a,k,l,d,n,p,f,o,c,s,q,t,i,r,v){a=a(null,{_stack:[],_beginZIndex:1E3,_idGen:1,_createWrapper:function(b){var h=b._popupWrapper,m=b.domNode;if(!h)h=d.create("div",{"class":"dijitPopup",style:{display:"none"},
role:"presentation"},t.body()),h.appendChild(m),m=m.style,m.display="",m.visibility="",m.position="",m.top="0px",b._popupWrapper=h,j.after(b,"destroy",function(){d.destroy(h);delete b._popupWrapper});return h},moveOffScreen:function(b){b=this._createWrapper(b);p.set(b,{visibility:"hidden",top:"-9999px",display:""})},hide:function(b){b=this._createWrapper(b);p.set(b,"display","none")},getTopPopup:function(){for(var b=this._stack,h=b.length-1;h>0&&b[h].parent===b[h-1].widget;h--);return b[h]},open:function(b){for(var h=
this._stack,m=b.popup,d=b.orient||["below","below-alt","above","above-alt"],u=b.parent?b.parent.isLeftToRight():n.isBodyLtr(),a=b.around,j=b.around&&b.around.id?b.around.id+"_dropdown":"popup_"+this._idGen++;h.length&&(!b.parent||!k.isDescendant(b.parent.domNode,h[h.length-1].widget.domNode));)this.close(h[h.length-1].widget);var g=this._createWrapper(m);l.set(g,{id:j,style:{zIndex:this._beginZIndex+h.length},"class":"dijitPopup "+(m.baseClass||m["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:b.parent?
b.parent.id:""});if((q("ie")||q("mozilla"))&&!m.bgIframe)m.bgIframe=new r(g);d=a?i.around(g,a,d,u,m.orient?c.hitch(m,"orient"):null):i.at(g,b,d=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],b.padding);g.style.display="";g.style.visibility="visible";m.domNode.style.visibility="visible";u=[];u.push(s(g,e._keypress,c.hitch(this,function(h){if(h.charOrCode==o.ESCAPE&&b.onCancel)f.stop(h),b.onCancel();else if(h.charOrCode===o.TAB&&(f.stop(h),(h=this.getTopPopup())&&h.onCancel))h.onCancel()})));m.onCancel&&
b.onCancel&&u.push(m.on("cancel",b.onCancel));u.push(m.on(m.onExecute?"execute":"change",c.hitch(this,function(){var b=this.getTopPopup();if(b&&b.onExecute)b.onExecute()})));h.push({widget:m,parent:b.parent,onExecute:b.onExecute,onCancel:b.onCancel,onClose:b.onClose,handlers:u});if(m.onOpen)m.onOpen(d);return d},close:function(b){for(var h=this._stack;b&&g.some(h,function(h){return h.widget==b})||!b&&h.length;){var m=h.pop(),i=m.widget,d=m.onClose;if(i.onClose)i.onClose();for(var f;f=m.handlers.pop();)f.remove();
i&&i.domNode&&this.hide(i);d&&d()}}});return v.popup=new a})},"dijit/_Container":function(){define("dijit/_Container",["dojo/_base/array","dojo/_base/declare","dojo/dom-construct","./registry"],function(g,j,e,a){return j("dijit._Container",null,{buildRendering:function(){this.inherited(arguments);if(!this.containerNode)this.containerNode=this.domNode},addChild:function(k,a){var d=this.containerNode;if(a&&typeof a=="number"){var g=this.getChildren();if(g&&g.length>=a)d=g[a-1].domNode,a="after"}e.place(k.domNode,
d,a);this._started&&!k._started&&k.startup()},removeChild:function(a){typeof a=="number"&&(a=this.getChildren()[a]);if(a)(a=a.domNode)&&a.parentNode&&a.parentNode.removeChild(a)},hasChildren:function(){return this.getChildren().length>0},_getSiblingOfChild:function(e,g){var d=e.domNode,j=g>0?"nextSibling":"previousSibling";do d=d[j];while(d&&(d.nodeType!=1||!a.byNode(d)));return d&&a.byNode(d)},getIndexOfChild:function(a){return g.indexOf(this.getChildren(),a)}})})},"dijit/_HasDropDown":function(){define("dijit/_HasDropDown",
["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/keys","dojo/_base/lang","dojo/touch","dojo/_base/window","dojo/window","./registry","./focus","./popup","./_FocusMixin"],function(g,j,e,a,k,l,d,n,p,f,o,c,s,q,t,i,r,v){return g("dijit._HasDropDown",v,{_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:!0,forceWidth:!1,maxHeight:0,dropDownPosition:["below",
"above"],_stopClickEvents:!0,_onDropDownMouseDown:function(b){if(!this.disabled&&!this.readOnly)b.preventDefault(),this._docHandler=this.connect(s.doc,c.release,"_onDropDownMouseUp"),this.toggleDropDown()},_onDropDownMouseUp:function(b){b&&this._docHandler&&this.disconnect(this._docHandler);var h=this.dropDown,i=!1;if(b&&this._opened){var a=d.position(this._buttonNode,!0);if(!(b.pageX>=a.x&&b.pageX<=a.x+a.w)||!(b.pageY>=a.y&&b.pageY<=a.y+a.h)){for(a=b.target;a&&!i;)l.contains(a,"dijitPopup")?i=!0:
a=a.parentNode;if(i){a=b.target;if(h.onItemClick){for(var f;a&&!(f=t.byNode(a));)a=a.parentNode;if(f&&f.onClick&&f.getParent)f.getParent().onItemClick(f,b)}return}}}this._opened?h.focus&&h.autoFocus!==!1&&window.setTimeout(o.hitch(h,"focus"),1):setTimeout(o.hitch(this,"focus"),0);if(p("ios"))this._justGotMouseUp=!0,setTimeout(o.hitch(this,function(){this._justGotMouseUp=!1}),0)},_onDropDownClick:function(b){p("ios")&&!this._justGotMouseUp&&(this._onDropDownMouseDown(b),this._onDropDownMouseUp(b));
this._stopClickEvents&&e.stop(b)},buildRendering:function(){this.inherited(arguments);this._buttonNode=this._buttonNode||this.focusNode||this.domNode;this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;var b={after:this.isLeftToRight()?"Right":"Left",before:this.isLeftToRight()?"Left":"Right",above:"Up",below:"Down",left:"Left",right:"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";l.add(this._arrowWrapperNode||this._buttonNode,"dijit"+b+"ArrowButton")},
postCreate:function(){this.inherited(arguments);this.connect(this._buttonNode,c.press,"_onDropDownMouseDown");this.connect(this._buttonNode,"onclick","_onDropDownClick");this.connect(this.focusNode,"onkeypress","_onKey");this.connect(this.focusNode,"onkeyup","_onKeyUp")},destroy:function(){this.dropDown&&(this.dropDown._destroyed||this.dropDown.destroyRecursive(),delete this.dropDown);this.inherited(arguments)},_onKey:function(b){if(!this.disabled&&!this.readOnly){var a=this.dropDown,i=b.target;if(a&&
this._opened&&a.handleKey&&a.handleKey(b)===!1)e.stop(b);else if(a&&this._opened&&b.charOrCode==f.ESCAPE)this.closeDropDown(),e.stop(b);else if(!this._opened&&(b.charOrCode==f.DOWN_ARROW||(b.charOrCode==f.ENTER||b.charOrCode==" ")&&((i.tagName||"").toLowerCase()!=="input"||i.type&&i.type.toLowerCase()!=="text")))this._toggleOnKeyUp=!0,e.stop(b)}},_onKeyUp:function(){if(this._toggleOnKeyUp){delete this._toggleOnKeyUp;this.toggleDropDown();var b=this.dropDown;b&&b.focus&&setTimeout(o.hitch(b,"focus"),
1)}},_onBlur:function(){this.closeDropDown(i.curNode&&this.dropDown&&a.isDescendant(i.curNode,this.dropDown.domNode));this.inherited(arguments)},isLoaded:function(){return!0},loadDropDown:function(b){b()},loadAndOpenDropDown:function(){var b=new j,a=o.hitch(this,function(){this.openDropDown();b.resolve(this.dropDown)});this.isLoaded()?a():this.loadDropDown(a);return b},toggleDropDown:function(){!this.disabled&&!this.readOnly&&(this._opened?this.closeDropDown():this.loadAndOpenDropDown())},openDropDown:function(){var b=
this.dropDown,a=b.domNode,i=this._aroundNode||this.domNode,f=this;if(!this._preparedNode){this._preparedNode=!0;if(a.style.width)this._explicitDDWidth=!0;if(a.style.height)this._explicitDDHeight=!0}if(this.maxHeight||this.forceWidth||this.autoWidth){var e={display:"",visibility:"hidden"};if(!this._explicitDDWidth)e.width="";if(!this._explicitDDHeight)e.height="";n.set(a,e);e=this.maxHeight;if(e==-1)var e=q.getBox(),c=d.position(i,!1),e=Math.floor(Math.max(c.y,e.h-(c.y+c.h)));r.moveOffScreen(b);b.startup&&
!b._started&&b.startup();var c=d.getMarginSize(a),g=e&&c.h>e;n.set(a,{overflowX:"hidden",overflowY:g?"auto":"hidden"});g?(c.h=e,"w"in c&&(c.w+=16)):delete c.h;this.forceWidth?c.w=i.offsetWidth:this.autoWidth?c.w=Math.max(c.w,i.offsetWidth):delete c.w;o.isFunction(b.resize)?b.resize(c):d.setMarginBox(a,c)}b=r.open({parent:this,popup:b,around:i,orient:this.dropDownPosition,onExecute:function(){f.closeDropDown(!0)},onCancel:function(){f.closeDropDown(!0)},onClose:function(){k.set(f._popupStateNode,"popupActive",
!1);l.remove(f._popupStateNode,"dijitHasDropDownOpen");f._set("_opened",!1)}});k.set(this._popupStateNode,"popupActive","true");l.add(this._popupStateNode,"dijitHasDropDownOpen");this._set("_opened",!0);return b},closeDropDown:function(b){if(this._opened)b&&this.focus(),r.close(this.dropDown),this._opened=!1}})})},"url:dijit/form/templates/DropDownButton.html":'<span class="dijit dijitReset dijitInline"\n\t><span class=\'dijitReset dijitInline dijitButtonNode\'\n\t\tdata-dojo-attach-event="ondijitclick:_onClick" data-dojo-attach-point="_buttonNode"\n\t\t><span class="dijitReset dijitStretch dijitButtonContents"\n\t\t\tdata-dojo-attach-point="focusNode,titleNode,_arrowWrapperNode"\n\t\t\trole="button" aria-haspopup="true" aria-labelledby="${id}_label"\n\t\t\t><span class="dijitReset dijitInline dijitIcon"\n\t\t\t\tdata-dojo-attach-point="iconNode"\n\t\t\t></span\n\t\t\t><span class="dijitReset dijitInline dijitButtonText"\n\t\t\t\tdata-dojo-attach-point="containerNode,_popupStateNode"\n\t\t\t\tid="${id}_label"\n\t\t\t></span\n\t\t\t><span class="dijitReset dijitInline dijitArrowButtonInner"></span\n\t\t\t><span class="dijitReset dijitInline dijitArrowButtonChar">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type="${type}" value="${value}" class="dijitOffScreen" tabIndex="-1"\n\t\tdata-dojo-attach-point="valueNode"\n/></span>\n',
"dijit/Menu":function(){define("dijit/Menu",["require","dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window","dojo/window","./popup","./DropDownMenu","dojo/ready"],function(g,j,e,a,k,l,d,n,p,f,o,c,s,q,t,i,r,v){p.isAsync||v(0,function(){g(["dijit/MenuItem","dijit/PopupMenuItem","dijit/CheckedMenuItem","dijit/MenuSeparator"])});return e("dijit.Menu",
r,{constructor:function(){this._bindings=[]},targetNodeIds:[],contextMenuForWindow:!1,leftClickToOpen:!1,refocus:!0,postCreate:function(){this.contextMenuForWindow?this.bindDomNode(q.body()):j.forEach(this.targetNodeIds,this.bindDomNode,this);this.inherited(arguments)},_iframeContentWindow:function(b){return t.get(this._iframeContentDocument(b))||this._iframeContentDocument(b).__parent__||b.name&&q.doc.frames[b.name]||null},_iframeContentDocument:function(b){return b.contentDocument||b.contentWindow&&
b.contentWindow.document||b.name&&q.doc.frames[b.name]&&q.doc.frames[b.name].document||null},bindDomNode:function(b){var b=k.byId(b),i;if(b.tagName.toLowerCase()=="iframe"){var d=b,e=this._iframeContentWindow(d);i=q.withGlobal(e,q.body)}else i=b==q.body()?q.doc.documentElement:b;var g={node:b,iframe:d};l.set(b,"_dijitMenu"+this.id,this._bindings.push(g));var r=o.hitch(this,function(b){return[c(b,this.leftClickToOpen?"click":"contextmenu",o.hitch(this,function(b){a.stop(b);this._scheduleOpen(b.target,
d,{x:b.pageX,y:b.pageY})})),c(b,"keydown",o.hitch(this,function(b){b.shiftKey&&b.keyCode==f.F10&&(a.stop(b),this._scheduleOpen(b.target,d))}))]});g.connects=i?r(i):[];if(d)g.onloadHandler=o.hitch(this,function(){var b=this._iframeContentWindow(d);i=q.withGlobal(b,q.body);g.connects=r(i)}),d.addEventListener?d.addEventListener("load",g.onloadHandler,!1):d.attachEvent("onload",g.onloadHandler)},unBindDomNode:function(b){var a;try{a=k.byId(b)}catch(i){return}b="_dijitMenu"+this.id;if(a&&l.has(a,b)){for(var f=
l.get(a,b)-1,d=this._bindings[f],c;c=d.connects.pop();)c.remove();(c=d.iframe)&&(c.removeEventListener?c.removeEventListener("load",d.onloadHandler,!1):c.detachEvent("onload",d.onloadHandler));l.remove(a,b);delete this._bindings[f]}},_scheduleOpen:function(b,a,i){if(!this._openTimer)this._openTimer=setTimeout(o.hitch(this,function(){delete this._openTimer;this._openMyself({target:b,iframe:a,coords:i})}),1)},_openMyself:function(b){function a(){j.refocus&&l&&l.focus();i.close(j)}var f=b.target,c=b.iframe;
if(b=b.coords){if(c){var f=d.position(c,!0),e=this._iframeContentWindow(c),e=q.withGlobal(e,"docScroll",d),g=n.getComputedStyle(c),r=n.toPixelValue,o=(s("ie")&&s("quirks")?0:r(c,g.paddingLeft))+(s("ie")&&s("quirks")?r(c,g.borderLeftWidth):0),c=(s("ie")&&s("quirks")?0:r(c,g.paddingTop))+(s("ie")&&s("quirks")?r(c,g.borderTopWidth):0);b.x+=f.x+o-e.x;b.y+=f.y+c-e.y}}else b=d.position(f,!0),b.x+=10,b.y+=10;var j=this,c=this._focusManager.get("prevNode"),f=this._focusManager.get("curNode"),l=!f||k.isDescendant(f,
this.domNode)?c:f;i.open({popup:this,x:b.x,y:b.y,onExecute:a,onCancel:a,orient:this.isLeftToRight()?"L":"R"});this.focus();this._onBlur=function(){this.inherited("_onBlur",arguments);i.close(this)}},uninitialize:function(){j.forEach(this._bindings,function(b){b&&this.unBindDomNode(b.node)},this);this.inherited(arguments)}})})},"dijit/DropDownMenu":function(){require({cache:{"url:dijit/templates/Menu.html":'<table class="dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable" role="menu" tabIndex="${tabIndex}"\n\t   data-dojo-attach-event="onkeypress:_onKeyPress" cellspacing="0">\n\t<tbody class="dijitReset" data-dojo-attach-point="containerNode"></tbody>\n</table>\n'}});
define("dijit/DropDownMenu",["dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/text!./templates/Menu.html","./_OnDijitClickMixin","./_MenuBase"],function(g,j,e,a,k,l){return g("dijit.DropDownMenu",[l,k],{templateString:a,baseClass:"dijitMenu",postCreate:function(){this.inherited(arguments);var a=this.isLeftToRight();this._openSubMenuKey=a?e.RIGHT_ARROW:e.LEFT_ARROW;this._closeSubMenuKey=a?e.LEFT_ARROW:e.RIGHT_ARROW;this.connectKeyNavHandlers([e.UP_ARROW],[e.DOWN_ARROW])},_onKeyPress:function(a){if(!a.ctrlKey&&
!a.altKey)switch(a.charOrCode){case this._openSubMenuKey:this._moveToPopup(a);j.stop(a);break;case this._closeSubMenuKey:if(this.parentMenu)if(this.parentMenu._isMenuBar)this.parentMenu.focusPrev();else this.onCancel(!1);else j.stop(a)}}})})},"url:dijit/templates/Menu.html":'<table class="dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable" role="menu" tabIndex="${tabIndex}"\n\t   data-dojo-attach-event="onkeypress:_onKeyPress" cellspacing="0">\n\t<tbody class="dijitReset" data-dojo-attach-point="containerNode"></tbody>\n</table>\n',
"dijit/_MenuBase":function(){define("dijit/_MenuBase",["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/lang","dojo/mouse","dojo/on","dojo/window","./popup","./registry","./_Widget","./_KeyNavContainer","./_OnDijitClickMixin","./_TemplatedMixin"],function(g,j,e,a,k,l,d,n,p,f,o,c,s,q,t){return j("dijit._MenuBase",[c,t,s],{parentMenu:null,popupDelay:500,postCreate:function(){var a=this;this._connects.push(n(this.containerNode,n.selector(".dijitMenuItem",
d.enter),function(){a.onItemHover(o.byNode(this))}),n(this.containerNode,n.selector(".dijitMenuItem",d.leave),function(){a.onItemUnhover(o.byNode(this))}),n(this.containerNode,n.selector(".dijitMenuItem",q.a11yclick),function(f){a.onItemClick(o.byNode(this),f);f.stopPropagation();f.preventDefault()}));this.inherited(arguments)},onExecute:function(){},onCancel:function(){},_moveToPopup:function(a){if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled)this.onItemClick(this.focusedChild,
a);else(a=this._getTopMenu())&&a._isMenuBar&&a.focusNext()},_onPopupHover:function(){if(this.currentPopup&&this.currentPopup._pendingClose_timer){var a=this.currentPopup.parentMenu;a.focusedChild&&a.focusedChild._setSelected(!1);a.focusedChild=this.currentPopup.from_item;a.focusedChild._setSelected(!0);this._stopPendingCloseTimer(this.currentPopup)}},onItemHover:function(a){if(this.isActive&&(this.focusChild(a),this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer))this.hover_timer=
setTimeout(l.hitch(this,"_openPopup"),this.popupDelay);this.focusedChild&&this.focusChild(a);this._hoveredChild=a;a._set("hovering",!0)},_onChildBlur:function(a){this._stopPopupTimer();a._setSelected(!1);var c=a.popup;if(c)this._stopPendingCloseTimer(c),c._pendingClose_timer=setTimeout(function(){c._pendingClose_timer=null;if(c.parentMenu)c.parentMenu.currentPopup=null;f.close(c)},this.popupDelay)},onItemUnhover:function(a){this.isActive&&this._stopPopupTimer();if(this._hoveredChild==a)this._hoveredChild=
null;a._set("hovering",!1)},_stopPopupTimer:function(){if(this.hover_timer)clearTimeout(this.hover_timer),this.hover_timer=null},_stopPendingCloseTimer:function(a){if(a._pendingClose_timer)clearTimeout(a._pendingClose_timer),a._pendingClose_timer=null},_stopFocusTimer:function(){if(this._focus_timer)clearTimeout(this._focus_timer),this._focus_timer=null},_getTopMenu:function(){for(var a=this;a.parentMenu;a=a.parentMenu);return a},onItemClick:function(a,f){typeof this.isShowingNow=="undefined"&&this._markActive();
this.focusChild(a);if(a.disabled)return!1;a.popup?this._openPopup():(this.onExecute(),a._onClick?a._onClick(f):a.onClick(f))},_openPopup:function(){this._stopPopupTimer();var a=this.focusedChild;if(a){var c=a.popup;if(!c.isShowingNow){this.currentPopup&&(this._stopPendingCloseTimer(this.currentPopup),f.close(this.currentPopup));c.parentMenu=this;c.from_item=a;var d=this;f.open({parent:this,popup:c,around:a.domNode,orient:this._orient||["after","before"],onCancel:function(){d.focusChild(a);d._cleanUp();
a._setSelected(!0);d.focusedChild=a},onExecute:l.hitch(this,"_cleanUp")});this.currentPopup=c;c.connect(c.domNode,"onmouseenter",l.hitch(d,"_onPopupHover"));if(c.focus)c._focus_timer=setTimeout(l.hitch(c,function(){this._focus_timer=null;this.focus()}),0)}}},_markActive:function(){this.isActive=!0;k.replace(this.domNode,"dijitMenuActive","dijitMenuPassive")},onOpen:function(){this.isShowingNow=!0;this._markActive()},_markInactive:function(){this.isActive=!1;k.replace(this.domNode,"dijitMenuPassive",
"dijitMenuActive")},onClose:function(){this._stopFocusTimer();this._markInactive();this.isShowingNow=!1;this.parentMenu=null},_closeChild:function(){this._stopPopupTimer();if(this.currentPopup)g.indexOf(this._focusManager.activeStack,this.id)>=0&&(a.set(this.focusedChild.focusNode,"tabIndex",this.tabIndex),this.focusedChild.focusNode.focus()),f.close(this.currentPopup),this.currentPopup=null;if(this.focusedChild)this.focusedChild._setSelected(!1),this.onItemUnhover(this.focusedChild),this.focusedChild=
null},_onItemFocus:function(a){if(this._hoveredChild&&this._hoveredChild!=a)this.onItemUnhover(this._hoveredChild)},_onBlur:function(){this._cleanUp();this.inherited(arguments)},_cleanUp:function(){this._closeChild();typeof this.isShowingNow=="undefined"&&this._markInactive()}})})},"dijit/_KeyNavContainer":function(){define("dijit/_KeyNavContainer",["dojo/_base/kernel","./_Container","./_FocusMixin","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/event","dojo/dom-attr","dojo/_base/lang"],
function(g,j,e,a,k,l,d,n,p){return l("dijit._KeyNavContainer",[e,j],{tabIndex:"0",connectKeyNavHandlers:function(f,d){var c=this._keyNavCodes={},e=p.hitch(this,"focusPrev"),g=p.hitch(this,"focusNext");a.forEach(f,function(a){c[a]=e});a.forEach(d,function(a){c[a]=g});c[k.HOME]=p.hitch(this,"focusFirstChild");c[k.END]=p.hitch(this,"focusLastChild");this.connect(this.domNode,"onkeypress","_onContainerKeypress");this.connect(this.domNode,"onfocus","_onContainerFocus")},startupKeyNavChildren:function(){g.deprecated("startupKeyNavChildren() call no longer needed",
"","2.0")},startup:function(){this.inherited(arguments);a.forEach(this.getChildren(),p.hitch(this,"_startupChild"))},addChild:function(a){this.inherited(arguments);this._startupChild(a)},focus:function(){this.focusFirstChild()},focusFirstChild:function(){this.focusChild(this._getFirstFocusableChild())},focusLastChild:function(){this.focusChild(this._getLastFocusableChild())},focusNext:function(){this.focusChild(this._getNextFocusableChild(this.focusedChild,1))},focusPrev:function(){this.focusChild(this._getNextFocusableChild(this.focusedChild,
-1),!0)},focusChild:function(a,d){a&&(this.focusedChild&&a!==this.focusedChild&&this._onChildBlur(this.focusedChild),a.set("tabIndex",this.tabIndex),a.focus(d?"end":"start"),this._set("focusedChild",a))},_startupChild:function(a){a.set("tabIndex","-1");this.connect(a,"_onFocus",function(){a.set("tabIndex",this.tabIndex)});this.connect(a,"_onBlur",function(){a.set("tabIndex","-1")})},_onContainerFocus:function(a){a.target!==this.domNode||this.focusedChild||(this.focusFirstChild(),n.set(this.domNode,
"tabIndex","-1"))},_onBlur:function(){this.tabIndex&&n.set(this.domNode,"tabIndex",this.tabIndex);this.focusedChild=null;this.inherited(arguments)},_onContainerKeypress:function(a){if(!a.ctrlKey&&!a.altKey){var e=this._keyNavCodes[a.charOrCode];e&&(e(),d.stop(a))}},_onChildBlur:function(){},_getFirstFocusableChild:function(){return this._getNextFocusableChild(null,1)},_getLastFocusableChild:function(){return this._getNextFocusableChild(null,-1)},_getNextFocusableChild:function(a,d){a&&(a=this._getSiblingOfChild(a,
d));for(var c=this.getChildren(),e=0;e<c.length;e++){a||(a=c[d>0?0:c.length-1]);if(a.isFocusable())return a;a=this._getSiblingOfChild(a,d)}return null}})})},"dijit/MenuItem":function(){require({cache:{"url:dijit/templates/MenuItem.html":'<tr class="dijitReset dijitMenuItem" data-dojo-attach-point="focusNode" role="menuitem" tabIndex="-1">\n\t<td class="dijitReset dijitMenuItemIconCell" role="presentation">\n\t\t<img src="${_blankGif}" alt="" class="dijitIcon dijitMenuItemIcon" data-dojo-attach-point="iconNode"/>\n\t</td>\n\t<td class="dijitReset dijitMenuItemLabel" colspan="2" data-dojo-attach-point="containerNode"></td>\n\t<td class="dijitReset dijitMenuItemAccelKey" style="display: none" data-dojo-attach-point="accelKeyNode"></td>\n\t<td class="dijitReset dijitMenuArrowCell" role="presentation">\n\t\t<div data-dojo-attach-point="arrowWrapper" style="visibility: hidden">\n\t\t\t<img src="${_blankGif}" alt="" class="dijitMenuExpand"/>\n\t\t\t<span class="dijitMenuExpandA11y">+</span>\n\t\t</div>\n\t</td>\n</tr>\n'}});
define("dijit/MenuItem",["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/kernel","dojo/_base/sniff","./_Widget","./_TemplatedMixin","./_Contained","./_CssStateMixin","dojo/text!./templates/MenuItem.html"],function(g,j,e,a,k,l,d,n,p,f,o){return g("dijit.MenuItem",[d,n,p,f],{templateString:o,baseClass:"dijitMenuItem",label:"",_setLabelAttr:{node:"containerNode",type:"innerHTML"},iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},accelKey:"",disabled:!1,
_fillContent:function(a){a&&!("label"in this.params)&&this.set("label",a.innerHTML)},buildRendering:function(){this.inherited(arguments);var a=this.id+"_text";e.set(this.containerNode,"id",a);this.accelKeyNode&&(e.set(this.accelKeyNode,"id",this.id+"_accel"),a+=" "+this.id+"_accel");this.domNode.setAttribute("aria-labelledby",a);j.setSelectable(this.domNode,!1)},onClick:function(){},focus:function(){try{l("ie")==8&&this.containerNode.focus(),this.focusNode.focus()}catch(a){}},_onFocus:function(){this._setSelected(!0);
this.getParent()._onItemFocus(this);this.inherited(arguments)},_setSelected:function(c){a.toggle(this.domNode,"dijitMenuItemSelected",c)},setLabel:function(a){k.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");this.set("label",a)},setDisabled:function(a){k.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");this.set("disabled",a)},_setDisabledAttr:function(a){this.focusNode.setAttribute("aria-disabled",a?
"true":"false");this._set("disabled",a)},_setAccelKeyAttr:function(a){this.accelKeyNode.style.display=a?"":"none";this.accelKeyNode.innerHTML=a;e.set(this.containerNode,"colSpan",a?"1":"2");this._set("accelKey",a)}})})},"dijit/_Contained":function(){define("dijit/_Contained",["dojo/_base/declare","./registry"],function(g,j){return g("dijit._Contained",null,{_getSibling:function(e){var a=this.domNode;do a=a[e+"Sibling"];while(a&&a.nodeType!=1);return a&&j.byNode(a)},getPreviousSibling:function(){return this._getSibling("previous")},
getNextSibling:function(){return this._getSibling("next")},getIndexInParent:function(){var e=this.getParent();if(!e||!e.getIndexOfChild)return-1;return e.getIndexOfChild(this)}})})},"url:dijit/templates/MenuItem.html":'<tr class="dijitReset dijitMenuItem" data-dojo-attach-point="focusNode" role="menuitem" tabIndex="-1">\n\t<td class="dijitReset dijitMenuItemIconCell" role="presentation">\n\t\t<img src="${_blankGif}" alt="" class="dijitIcon dijitMenuItemIcon" data-dojo-attach-point="iconNode"/>\n\t</td>\n\t<td class="dijitReset dijitMenuItemLabel" colspan="2" data-dojo-attach-point="containerNode"></td>\n\t<td class="dijitReset dijitMenuItemAccelKey" style="display: none" data-dojo-attach-point="accelKeyNode"></td>\n\t<td class="dijitReset dijitMenuArrowCell" role="presentation">\n\t\t<div data-dojo-attach-point="arrowWrapper" style="visibility: hidden">\n\t\t\t<img src="${_blankGif}" alt="" class="dijitMenuExpand"/>\n\t\t\t<span class="dijitMenuExpandA11y">+</span>\n\t\t</div>\n\t</td>\n</tr>\n',
"dijit/MenuSeparator":function(){require({cache:{"url:dijit/templates/MenuSeparator.html":'<tr class="dijitMenuSeparator">\n\t<td class="dijitMenuSeparatorIconCell">\n\t\t<div class="dijitMenuSeparatorTop"></div>\n\t\t<div class="dijitMenuSeparatorBottom"></div>\n\t</td>\n\t<td colspan="3" class="dijitMenuSeparatorLabelCell">\n\t\t<div class="dijitMenuSeparatorTop dijitMenuSeparatorLabel"></div>\n\t\t<div class="dijitMenuSeparatorBottom"></div>\n\t</td>\n</tr>'}});define("dijit/MenuSeparator",["dojo/_base/declare",
"dojo/dom","./_WidgetBase","./_TemplatedMixin","./_Contained","dojo/text!./templates/MenuSeparator.html"],function(g,j,e,a,k,l){return g("dijit.MenuSeparator",[e,a,k],{templateString:l,buildRendering:function(){this.inherited(arguments);j.setSelectable(this.domNode,!1)},isFocusable:function(){return!1}})})},"url:dijit/templates/MenuSeparator.html":'<tr class="dijitMenuSeparator">\n\t<td class="dijitMenuSeparatorIconCell">\n\t\t<div class="dijitMenuSeparatorTop"></div>\n\t\t<div class="dijitMenuSeparatorBottom"></div>\n\t</td>\n\t<td colspan="3" class="dijitMenuSeparatorLabelCell">\n\t\t<div class="dijitMenuSeparatorTop dijitMenuSeparatorLabel"></div>\n\t\t<div class="dijitMenuSeparatorBottom"></div>\n\t</td>\n</tr>',
"dijit/PopupMenuItem":function(){define("dijit/PopupMenuItem",["dojo/_base/declare","dojo/dom-style","dojo/query","dojo/_base/window","./registry","./MenuItem","./hccss"],function(g,j,e,a,k,l){return g("dijit.PopupMenuItem",l,{_fillContent:function(){if(this.srcNodeRef){var a=e("*",this.srcNodeRef);this.inherited(arguments,[a[0]]);this.dropDownContainer=this.srcNodeRef}},startup:function(){if(!this._started){this.inherited(arguments);if(!this.popup){var d=e("[widgetId]",this.dropDownContainer)[0];
this.popup=k.byNode(d)}a.body().appendChild(this.popup.domNode);this.popup.startup();this.popup.domNode.style.display="none";this.arrowWrapper&&j.set(this.arrowWrapper,"visibility","");this.focusNode.setAttribute("aria-haspopup","true")}},destroyDescendants:function(a){this.popup&&(this.popup._destroyed||this.popup.destroyRecursive(a),delete this.popup);this.inherited(arguments)}})})},"dijit/Toolbar":function(){define("dijit/Toolbar",["require","dojo/_base/declare","dojo/_base/kernel","dojo/keys",
"dojo/ready","./_Widget","./_KeyNavContainer","./_TemplatedMixin"],function(g,j,e,a,k,l,d,n){e.isAsync||k(0,function(){g(["dijit/ToolbarSeparator"])});return j("dijit.Toolbar",[l,n,d],{templateString:'<div class="dijit" role="toolbar" tabIndex="${tabIndex}" data-dojo-attach-point="containerNode"></div>',baseClass:"dijitToolbar",postCreate:function(){this.inherited(arguments);this.connectKeyNavHandlers(this.isLeftToRight()?[a.LEFT_ARROW]:[a.RIGHT_ARROW],this.isLeftToRight()?[a.RIGHT_ARROW]:[a.LEFT_ARROW])}})})}}});
define("layers/menu",[],1);