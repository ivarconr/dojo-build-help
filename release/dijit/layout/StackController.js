//>>built
define("dijit/layout/StackController",["dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/_base/sniff","../focus","../registry","../_Widget","../_TemplatedMixin","../_Container","../form/ToggleButton","dojo/i18n!../nls/common"],function(e,f,g,c,h,l,k,i,m,n,o,j){j=f("dijit.layout._StackButton",j,{tabIndex:"-1",closeButton:!1,_aria_attr:"aria-selected",buildRendering:function(){this.inherited(arguments);(this.focusNode||this.domNode).setAttribute("role","tab")},
onClick:function(){k.focus(this.focusNode)},onClickCloseButton:function(a){a.stopPropagation()}});f=f("dijit.layout.StackController",[m,n,o],{baseClass:"dijitStackController",templateString:"<span role='tablist' data-dojo-attach-event='onkeypress'></span>",containerId:"",buttonWidget:j,constructor:function(){this.pane2button={};this.pane2connects={};this.pane2watches={}},postCreate:function(){this.inherited(arguments);this.subscribe(this.containerId+"-startup","onStartup");this.subscribe(this.containerId+
"-addChild","onAddChild");this.subscribe(this.containerId+"-removeChild","onRemoveChild");this.subscribe(this.containerId+"-selectChild","onSelectChild");this.subscribe(this.containerId+"-containerKeyPress","onContainerKeyPress")},onStartup:function(a){e.forEach(a.children,this.onAddChild,this);if(a.selected)this.onSelectChild(a.selected)},destroy:function(){for(var a in this.pane2button)this.onRemoveChild(i.byId(a));this.inherited(arguments)},onAddChild:function(a,b){var d=new (h.isString(this.buttonWidget)?
h.getObject(this.buttonWidget):this.buttonWidget)({id:this.id+"_"+a.id,label:a.title,dir:a.dir,lang:a.lang,textDir:a.textDir,showLabel:a.showTitle,iconClass:a.iconClass,closeButton:a.closable,title:a.tooltip}),c=["label","showLabel","iconClass","closeButton","title"];this.pane2watches[a.id]=e.map(["title","showTitle","iconClass","closable","tooltip"],function(b,e){return a.watch(b,function(a,b,f){d.set(c[e],f)})});this.pane2connects[a.id]=[this.connect(d,"onClick",h.hitch(this,"onButtonClick",a)),
this.connect(d,"onClickCloseButton",h.hitch(this,"onCloseButtonClick",a))];this.addChild(d,b);this.pane2button[a.id]=d;a.controlButton=d;if(!this._currentChild)this.onSelectChild(a);!this.isLeftToRight()&&l("ie")&&this._rectifyRtlTabList&&this._rectifyRtlTabList()},onRemoveChild:function(a){if(this._currentChild===a)this._currentChild=null;e.forEach(this.pane2connects[a.id],h.hitch(this,"disconnect"));delete this.pane2connects[a.id];e.forEach(this.pane2watches[a.id],function(a){a.unwatch()});delete this.pane2watches[a.id];
var b=this.pane2button[a.id];b&&(this.removeChild(b),delete this.pane2button[a.id],b.destroy());delete a.controlButton},onSelectChild:function(a){if(a){if(this._currentChild){var b=this.pane2button[this._currentChild.id];b.set("checked",!1);b.focusNode.setAttribute("tabIndex","-1")}b=this.pane2button[a.id];b.set("checked",!0);this._currentChild=a;b.focusNode.setAttribute("tabIndex","0");i.byId(this.containerId).containerNode.setAttribute("aria-labelledby",b.id)}},onButtonClick:function(a){this._currentChild.id===
a.id&&this.pane2button[a.id].set("checked",!0);i.byId(this.containerId).selectChild(a)},onCloseButtonClick:function(a){i.byId(this.containerId).closeChild(a);this._currentChild&&(a=this.pane2button[this._currentChild.id])&&k.focus(a.focusNode||a.domNode)},adjacent:function(a){if(!this.isLeftToRight()&&(!this.tabPosition||/top|bottom/.test(this.tabPosition)))a=!a;var b=this.getChildren(),c=e.indexOf(b,this.pane2button[this._currentChild.id]);return b[(c+(a?1:b.length-1))%b.length]},onkeypress:function(a){if(!this.disabled&&
!a.altKey){var b=null;if(a.ctrlKey||!a._djpage){switch(a.charOrCode){case c.LEFT_ARROW:case c.UP_ARROW:a._djpage||(b=!1);break;case c.PAGE_UP:a.ctrlKey&&(b=!1);break;case c.RIGHT_ARROW:case c.DOWN_ARROW:a._djpage||(b=!0);break;case c.PAGE_DOWN:a.ctrlKey&&(b=!0);break;case c.HOME:case c.END:var d=this.getChildren();if(d&&d.length)d[a.charOrCode==c.HOME?0:d.length-1].onClick();g.stop(a);break;case c.DELETE:if(this._currentChild.closable)this.onCloseButtonClick(this._currentChild);g.stop(a);break;default:if(a.ctrlKey)if(a.charOrCode===
c.TAB)this.adjacent(!a.shiftKey).onClick(),g.stop(a);else if(a.charOrCode=="w"){if(this._currentChild.closable)this.onCloseButtonClick(this._currentChild);g.stop(a)}}b!==null&&(this.adjacent(b).onClick(),g.stop(a))}}},onContainerKeyPress:function(a){a.e._djpage=a.page;this.onkeypress(a.e)}});f.StackButton=j;return f});