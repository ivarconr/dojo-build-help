//>>built
define("dojo/dnd/Selector",["../_base/array","../_base/connect","../_base/declare","../_base/event","../_base/kernel","../dom","../dom-construct","../mouse","../_base/NodeList","./common","./Container"],function(j,b,k,i,l,g,m,n,o,f,p){var h=k("dojo.dnd.Selector",p,{constructor:function(d,a){a||(a={});this.singular=a.singular;this.autoSync=a.autoSync;this.selection={};this.anchor=null;this.simpleSelection=!1;this.events.push(b.connect(this.node,"onmousedown",this,"onMouseDown"),b.connect(this.node,
"onmouseup",this,"onMouseUp"))},singular:!1,getSelectedNodes:function(){var d=new o,a=f._empty,c;for(c in this.selection)c in a||d.push(g.byId(c));return d},selectNone:function(){return this._removeSelection()._removeAnchor()},selectAll:function(){this.forInItems(function(d,a){this._addItemClass(g.byId(a),"Selected");this.selection[a]=1},this);return this._removeAnchor()},deleteSelectedNodes:function(){var d=f._empty,a;for(a in this.selection)if(!(a in d)){var c=g.byId(a);this.delItem(a);m.destroy(c)}this.anchor=
null;this.selection={};return this},forInSelectedItems:function(d,a){var a=a||l.global,c=this.selection,e=f._empty,b;for(b in c)b in e||d.call(a,this.getItem(b),b,this)},sync:function(){h.superclass.sync.call(this);if(this.anchor&&!this.getItem(this.anchor.id))this.anchor=null;var d=[],a=f._empty,c;for(c in this.selection)c in a||this.getItem(c)||d.push(c);j.forEach(d,function(a){delete this.selection[a]},this);return this},insertNodes:function(d,a,c,b){var f=this._normalizedCreator;this._normalizedCreator=
function(a,c){var b=f.call(this,a,c);d?(this.anchor?this.anchor!=b.node&&(this._removeItemClass(b.node,"Anchor"),this._addItemClass(b.node,"Selected")):(this.anchor=b.node,this._removeItemClass(b.node,"Selected"),this._addItemClass(this.anchor,"Anchor")),this.selection[b.node.id]=1):(this._removeItemClass(b.node,"Selected"),this._removeItemClass(b.node,"Anchor"));return b};h.superclass.insertNodes.call(this,a,c,b);this._normalizedCreator=f;return this},destroy:function(){h.superclass.destroy.call(this);
this.selection=this.anchor=null},onMouseDown:function(d){this.autoSync&&this.sync();if(this.current)if(!this.singular&&!b.isCopyKey(d)&&!d.shiftKey&&this.current.id in this.selection)this.simpleSelection=!0,n.isLeft(d)&&i.stop(d);else{if(!this.singular&&d.shiftKey){b.isCopyKey(d)||this._removeSelection();var a=this.getAllNodes();if(a.length){if(!this.anchor)this.anchor=a[0],this._addItemClass(this.anchor,"Anchor");this.selection[this.anchor.id]=1;if(this.anchor!=this.current){for(var c=0,e;c<a.length;++c)if(e=
a[c],e==this.anchor||e==this.current)break;for(++c;c<a.length;++c){e=a[c];if(e==this.anchor||e==this.current)break;this._addItemClass(e,"Selected");this.selection[e.id]=1}this._addItemClass(this.current,"Selected");this.selection[this.current.id]=1}}}else if(this.singular)this.anchor==this.current?b.isCopyKey(d)&&this.selectNone():(this.selectNone(),this.anchor=this.current,this._addItemClass(this.anchor,"Anchor"),this.selection[this.current.id]=1);else if(b.isCopyKey(d))this.anchor==this.current?
(delete this.selection[this.anchor.id],this._removeAnchor()):this.current.id in this.selection?(this._removeItemClass(this.current,"Selected"),delete this.selection[this.current.id]):(this.anchor&&(this._removeItemClass(this.anchor,"Anchor"),this._addItemClass(this.anchor,"Selected")),this.anchor=this.current,this._addItemClass(this.current,"Anchor"),this.selection[this.current.id]=1);else if(!(this.current.id in this.selection))this.selectNone(),this.anchor=this.current,this._addItemClass(this.current,
"Anchor"),this.selection[this.current.id]=1;i.stop(d)}},onMouseUp:function(){if(this.simpleSelection&&(this.simpleSelection=!1,this.selectNone(),this.current))this.anchor=this.current,this._addItemClass(this.anchor,"Anchor"),this.selection[this.current.id]=1},onMouseMove:function(){this.simpleSelection=!1},onOverEvent:function(){this.onmousemoveEvent=b.connect(this.node,"onmousemove",this,"onMouseMove")},onOutEvent:function(){b.disconnect(this.onmousemoveEvent);delete this.onmousemoveEvent},_removeSelection:function(){var b=
f._empty,a;for(a in this.selection)if(!(a in b)){var c=g.byId(a);c&&this._removeItemClass(c,"Selected")}this.selection={};return this},_removeAnchor:function(){if(this.anchor)this._removeItemClass(this.anchor,"Anchor"),this.anchor=null;return this}});return h});