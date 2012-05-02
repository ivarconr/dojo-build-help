//>>built
define("dijit/_base/focus",["dojo/_base/array","dojo/dom","dojo/_base/lang","dojo/topic","dojo/_base/window","../focus",".."],function(j,k,i,h,f,e,g){i.mixin(g,{_curFocus:null,_prevFocus:null,isCollapsed:function(){return g.getBookmark().isCollapsed},getBookmark:function(){var a,b,c=f.doc.selection,d=e.curNode;if(f.global.getSelection){if(c=f.global.getSelection())if(c.isCollapsed){if(a=d?d.tagName:"")if(a=a.toLowerCase(),a=="textarea"||a=="input"&&(!d.type||d.type.toLowerCase()=="text"))return c=
{start:d.selectionStart,end:d.selectionEnd,node:d,pRange:!0},{isCollapsed:c.end<=c.start,mark:c};a={isCollapsed:!0};if(c.rangeCount)a.mark=c.getRangeAt(0).cloneRange()}else b=c.getRangeAt(0),a={isCollapsed:!1,mark:b.cloneRange()}}else if(c){a=d?d.tagName:"";a=a.toLowerCase();if(d&&a&&(a=="button"||a=="textarea"||a=="input"))return c.type&&c.type.toLowerCase()=="none"?{isCollapsed:!0,mark:null}:(b=c.createRange(),{isCollapsed:b.text&&b.text.length?!1:!0,mark:{range:b,pRange:!0}});a={};try{b=c.createRange(),
a.isCollapsed=!(c.type=="Text"?b.htmlText.length:b.length)}catch(g){return a.isCollapsed=!0,a}if(c.type.toUpperCase()=="CONTROL")if(b.length){a.mark=[];c=0;for(d=b.length;c<d;)a.mark.push(b.item(c++))}else a.isCollapsed=!0,a.mark=null;else a.mark=b.getBookmark()}return a},moveToBookmark:function(a){var b=f.doc;if(a=a.mark)if(f.global.getSelection){if((b=f.global.getSelection())&&b.removeAllRanges)a.pRange?(b=a.node,b.selectionStart=a.start,b.selectionEnd=a.end):(b.removeAllRanges(),b.addRange(a))}else if(b.selection&&
a){var c;a.pRange?c=a.range:i.isArray(a)?(c=b.body.createControlRange(),j.forEach(a,function(a){c.addElement(a)})):(c=b.body.createTextRange(),c.moveToBookmark(a));c.select()}},getFocus:function(a,b){var c=!e.curNode||a&&k.isDescendant(e.curNode,a.domNode)?g._prevFocus:e.curNode;return{node:c,bookmark:c&&c==e.curNode&&f.withGlobal(b||f.global,g.getBookmark),openedForWindow:b}},_activeStack:[],registerIframe:function(a){return e.registerIframe(a)},unregisterIframe:function(a){a&&a.remove()},registerWin:function(a,
b){return e.registerWin(a,b)},unregisterWin:function(a){a&&a.remove()}});e.focus=function(a){if(a){var b="node"in a?a.node:a,c=a.bookmark,a=a.openedForWindow,d=c?c.isCollapsed:!1;if(b){var h=b.tagName.toLowerCase()=="iframe"?b.contentWindow:b;if(h&&h.focus)try{h.focus()}catch(i){}e._onFocusNode(b)}if(c&&f.withGlobal(a||f.global,g.isCollapsed)&&!d){a&&a.focus();try{f.withGlobal(a||f.global,g.moveToBookmark,null,[c])}catch(j){}}}};e.watch("curNode",function(a,b,c){g._curFocus=c;g._prevFocus=b;c&&h.publish("focusNode",
c)});e.watch("activeStack",function(a,b,c){g._activeStack=c});e.on("widget-blur",function(a,b){h.publish("widgetBlur",a,b)});e.on("widget-focus",function(a,b){h.publish("widgetFocus",a,b)});return g});