//>>built
define("dijit/_MenuBase",["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/lang","dojo/mouse","dojo/on","dojo/window","./popup","./registry","./_Widget","./_KeyNavContainer","./_OnDijitClickMixin","./_TemplatedMixin"],function(i,j,p,k,g,d,h,c,q,e,f,l,m,n,o){return j("dijit._MenuBase",[l,o,m],{parentMenu:null,popupDelay:500,postCreate:function(){var a=this;this._connects.push(c(this.containerNode,c.selector(".dijitMenuItem",h.enter),function(){a.onItemHover(f.byNode(this))}),
c(this.containerNode,c.selector(".dijitMenuItem",h.leave),function(){a.onItemUnhover(f.byNode(this))}),c(this.containerNode,c.selector(".dijitMenuItem",n.a11yclick),function(b){a.onItemClick(f.byNode(this),b);b.stopPropagation();b.preventDefault()}));this.inherited(arguments)},onExecute:function(){},onCancel:function(){},_moveToPopup:function(a){if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled)this.onItemClick(this.focusedChild,a);else(a=this._getTopMenu())&&a._isMenuBar&&
a.focusNext()},_onPopupHover:function(){if(this.currentPopup&&this.currentPopup._pendingClose_timer){var a=this.currentPopup.parentMenu;a.focusedChild&&a.focusedChild._setSelected(!1);a.focusedChild=this.currentPopup.from_item;a.focusedChild._setSelected(!0);this._stopPendingCloseTimer(this.currentPopup)}},onItemHover:function(a){if(this.isActive&&(this.focusChild(a),this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer))this.hover_timer=setTimeout(d.hitch(this,"_openPopup"),this.popupDelay);
this.focusedChild&&this.focusChild(a);this._hoveredChild=a;a._set("hovering",!0)},_onChildBlur:function(a){this._stopPopupTimer();a._setSelected(!1);var b=a.popup;if(b)this._stopPendingCloseTimer(b),b._pendingClose_timer=setTimeout(function(){b._pendingClose_timer=null;if(b.parentMenu)b.parentMenu.currentPopup=null;e.close(b)},this.popupDelay)},onItemUnhover:function(a){this.isActive&&this._stopPopupTimer();if(this._hoveredChild==a)this._hoveredChild=null;a._set("hovering",!1)},_stopPopupTimer:function(){if(this.hover_timer)clearTimeout(this.hover_timer),
this.hover_timer=null},_stopPendingCloseTimer:function(a){if(a._pendingClose_timer)clearTimeout(a._pendingClose_timer),a._pendingClose_timer=null},_stopFocusTimer:function(){if(this._focus_timer)clearTimeout(this._focus_timer),this._focus_timer=null},_getTopMenu:function(){for(var a=this;a.parentMenu;a=a.parentMenu);return a},onItemClick:function(a,b){typeof this.isShowingNow=="undefined"&&this._markActive();this.focusChild(a);if(a.disabled)return!1;a.popup?this._openPopup():(this.onExecute(),a._onClick?
a._onClick(b):a.onClick(b))},_openPopup:function(){this._stopPopupTimer();var a=this.focusedChild;if(a){var b=a.popup;if(!b.isShowingNow){this.currentPopup&&(this._stopPendingCloseTimer(this.currentPopup),e.close(this.currentPopup));b.parentMenu=this;b.from_item=a;var c=this;e.open({parent:this,popup:b,around:a.domNode,orient:this._orient||["after","before"],onCancel:function(){c.focusChild(a);c._cleanUp();a._setSelected(!0);c.focusedChild=a},onExecute:d.hitch(this,"_cleanUp")});this.currentPopup=
b;b.connect(b.domNode,"onmouseenter",d.hitch(c,"_onPopupHover"));if(b.focus)b._focus_timer=setTimeout(d.hitch(b,function(){this._focus_timer=null;this.focus()}),0)}}},_markActive:function(){this.isActive=!0;g.replace(this.domNode,"dijitMenuActive","dijitMenuPassive")},onOpen:function(){this.isShowingNow=!0;this._markActive()},_markInactive:function(){this.isActive=!1;g.replace(this.domNode,"dijitMenuPassive","dijitMenuActive")},onClose:function(){this._stopFocusTimer();this._markInactive();this.isShowingNow=
!1;this.parentMenu=null},_closeChild:function(){this._stopPopupTimer();if(this.currentPopup)i.indexOf(this._focusManager.activeStack,this.id)>=0&&(k.set(this.focusedChild.focusNode,"tabIndex",this.tabIndex),this.focusedChild.focusNode.focus()),e.close(this.currentPopup),this.currentPopup=null;if(this.focusedChild)this.focusedChild._setSelected(!1),this.onItemUnhover(this.focusedChild),this.focusedChild=null},_onItemFocus:function(a){if(this._hoveredChild&&this._hoveredChild!=a)this.onItemUnhover(this._hoveredChild)},
_onBlur:function(){this._cleanUp();this.inherited(arguments)},_cleanUp:function(){this._closeChild();typeof this.isShowingNow=="undefined"&&this._markInactive()}})});