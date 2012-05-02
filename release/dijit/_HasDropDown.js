//>>built
define("dijit/_HasDropDown",["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/keys","dojo/_base/lang","dojo/touch","dojo/_base/window","dojo/window","./registry","./focus","./popup","./_FocusMixin"],function(r,s,g,t,m,i,j,n,o,k,h,p,u,v,w,q,l,x){return r("dijit._HasDropDown",x,{_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:!0,forceWidth:!1,
maxHeight:0,dropDownPosition:["below","above"],_stopClickEvents:!0,_onDropDownMouseDown:function(a){if(!this.disabled&&!this.readOnly)a.preventDefault(),this._docHandler=this.connect(u.doc,p.release,"_onDropDownMouseUp"),this.toggleDropDown()},_onDropDownMouseUp:function(a){a&&this._docHandler&&this.disconnect(this._docHandler);var c=this.dropDown,f=!1;if(a&&this._opened){var b=j.position(this._buttonNode,!0);if(!(a.pageX>=b.x&&a.pageX<=b.x+b.w)||!(a.pageY>=b.y&&a.pageY<=b.y+b.h)){for(b=a.target;b&&
!f;)i.contains(b,"dijitPopup")?f=!0:b=b.parentNode;if(f){b=a.target;if(c.onItemClick){for(var d;b&&!(d=w.byNode(b));)b=b.parentNode;if(d&&d.onClick&&d.getParent)d.getParent().onItemClick(d,a)}return}}}this._opened?c.focus&&c.autoFocus!==!1&&window.setTimeout(h.hitch(c,"focus"),1):setTimeout(h.hitch(this,"focus"),0);if(o("ios"))this._justGotMouseUp=!0,setTimeout(h.hitch(this,function(){this._justGotMouseUp=!1}),0)},_onDropDownClick:function(a){o("ios")&&!this._justGotMouseUp&&(this._onDropDownMouseDown(a),
this._onDropDownMouseUp(a));this._stopClickEvents&&g.stop(a)},buildRendering:function(){this.inherited(arguments);this._buttonNode=this._buttonNode||this.focusNode||this.domNode;this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;var a={after:this.isLeftToRight()?"Right":"Left",before:this.isLeftToRight()?"Left":"Right",above:"Up",below:"Down",left:"Left",right:"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";i.add(this._arrowWrapperNode||this._buttonNode,
"dijit"+a+"ArrowButton")},postCreate:function(){this.inherited(arguments);this.connect(this._buttonNode,p.press,"_onDropDownMouseDown");this.connect(this._buttonNode,"onclick","_onDropDownClick");this.connect(this.focusNode,"onkeypress","_onKey");this.connect(this.focusNode,"onkeyup","_onKeyUp")},destroy:function(){this.dropDown&&(this.dropDown._destroyed||this.dropDown.destroyRecursive(),delete this.dropDown);this.inherited(arguments)},_onKey:function(a){if(!this.disabled&&!this.readOnly){var c=
this.dropDown,f=a.target;if(c&&this._opened&&c.handleKey&&c.handleKey(a)===!1)g.stop(a);else if(c&&this._opened&&a.charOrCode==k.ESCAPE)this.closeDropDown(),g.stop(a);else if(!this._opened&&(a.charOrCode==k.DOWN_ARROW||(a.charOrCode==k.ENTER||a.charOrCode==" ")&&((f.tagName||"").toLowerCase()!=="input"||f.type&&f.type.toLowerCase()!=="text")))this._toggleOnKeyUp=!0,g.stop(a)}},_onKeyUp:function(){if(this._toggleOnKeyUp){delete this._toggleOnKeyUp;this.toggleDropDown();var a=this.dropDown;a&&a.focus&&
setTimeout(h.hitch(a,"focus"),1)}},_onBlur:function(){this.closeDropDown(q.curNode&&this.dropDown&&t.isDescendant(q.curNode,this.dropDown.domNode));this.inherited(arguments)},isLoaded:function(){return!0},loadDropDown:function(a){a()},loadAndOpenDropDown:function(){var a=new s,c=h.hitch(this,function(){this.openDropDown();a.resolve(this.dropDown)});this.isLoaded()?c():this.loadDropDown(c);return a},toggleDropDown:function(){!this.disabled&&!this.readOnly&&(this._opened?this.closeDropDown():this.loadAndOpenDropDown())},
openDropDown:function(){var a=this.dropDown,c=a.domNode,f=this._aroundNode||this.domNode,b=this;if(!this._preparedNode){this._preparedNode=!0;if(c.style.width)this._explicitDDWidth=!0;if(c.style.height)this._explicitDDHeight=!0}if(this.maxHeight||this.forceWidth||this.autoWidth){var d={display:"",visibility:"hidden"};if(!this._explicitDDWidth)d.width="";if(!this._explicitDDHeight)d.height="";n.set(c,d);d=this.maxHeight;if(d==-1)var d=v.getBox(),e=j.position(f,!1),d=Math.floor(Math.max(e.y,d.h-(e.y+
e.h)));l.moveOffScreen(a);a.startup&&!a._started&&a.startup();var e=j.getMarginSize(c),g=d&&e.h>d;n.set(c,{overflowX:"hidden",overflowY:g?"auto":"hidden"});g?(e.h=d,"w"in e&&(e.w+=16)):delete e.h;this.forceWidth?e.w=f.offsetWidth:this.autoWidth?e.w=Math.max(e.w,f.offsetWidth):delete e.w;h.isFunction(a.resize)?a.resize(e):j.setMarginBox(c,e)}a=l.open({parent:this,popup:a,around:f,orient:this.dropDownPosition,onExecute:function(){b.closeDropDown(!0)},onCancel:function(){b.closeDropDown(!0)},onClose:function(){m.set(b._popupStateNode,
"popupActive",!1);i.remove(b._popupStateNode,"dijitHasDropDownOpen");b._set("_opened",!1)}});m.set(this._popupStateNode,"popupActive","true");i.add(this._popupStateNode,"dijitHasDropDownOpen");this._set("_opened",!0);return a},closeDropDown:function(a){if(this._opened)a&&this.focus(),l.close(this.dropDown),this._opened=!1}})});