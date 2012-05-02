//>>built
define("dijit/_KeyNavContainer",["dojo/_base/kernel","./_Container","./_FocusMixin","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/event","dojo/dom-attr","dojo/_base/lang"],function(h,i,j,f,g,k,l,e,c){return k("dijit._KeyNavContainer",[j,i],{tabIndex:"0",connectKeyNavHandlers:function(a,b){var d=this._keyNavCodes={},m=c.hitch(this,"focusPrev"),e=c.hitch(this,"focusNext");f.forEach(a,function(a){d[a]=m});f.forEach(b,function(a){d[a]=e});d[g.HOME]=c.hitch(this,"focusFirstChild");d[g.END]=
c.hitch(this,"focusLastChild");this.connect(this.domNode,"onkeypress","_onContainerKeypress");this.connect(this.domNode,"onfocus","_onContainerFocus")},startupKeyNavChildren:function(){h.deprecated("startupKeyNavChildren() call no longer needed","","2.0")},startup:function(){this.inherited(arguments);f.forEach(this.getChildren(),c.hitch(this,"_startupChild"))},addChild:function(a){this.inherited(arguments);this._startupChild(a)},focus:function(){this.focusFirstChild()},focusFirstChild:function(){this.focusChild(this._getFirstFocusableChild())},
focusLastChild:function(){this.focusChild(this._getLastFocusableChild())},focusNext:function(){this.focusChild(this._getNextFocusableChild(this.focusedChild,1))},focusPrev:function(){this.focusChild(this._getNextFocusableChild(this.focusedChild,-1),!0)},focusChild:function(a,b){a&&(this.focusedChild&&a!==this.focusedChild&&this._onChildBlur(this.focusedChild),a.set("tabIndex",this.tabIndex),a.focus(b?"end":"start"),this._set("focusedChild",a))},_startupChild:function(a){a.set("tabIndex","-1");this.connect(a,
"_onFocus",function(){a.set("tabIndex",this.tabIndex)});this.connect(a,"_onBlur",function(){a.set("tabIndex","-1")})},_onContainerFocus:function(a){a.target!==this.domNode||this.focusedChild||(this.focusFirstChild(),e.set(this.domNode,"tabIndex","-1"))},_onBlur:function(){this.tabIndex&&e.set(this.domNode,"tabIndex",this.tabIndex);this.focusedChild=null;this.inherited(arguments)},_onContainerKeypress:function(a){if(!a.ctrlKey&&!a.altKey){var b=this._keyNavCodes[a.charOrCode];b&&(b(),l.stop(a))}},
_onChildBlur:function(){},_getFirstFocusableChild:function(){return this._getNextFocusableChild(null,1)},_getLastFocusableChild:function(){return this._getNextFocusableChild(null,-1)},_getNextFocusableChild:function(a,b){a&&(a=this._getSiblingOfChild(a,b));for(var d=this.getChildren(),c=0;c<d.length;c++){a||(a=d[b>0?0:d.length-1]);if(a.isFocusable())return a;a=this._getSiblingOfChild(a,b)}return null}})});