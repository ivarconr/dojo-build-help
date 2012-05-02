//>>built
define("dijit/_editor/selection",["dojo/dom","dojo/_base/lang","dojo/_base/sniff","dojo/_base/window",".."],function(j,i,g,c,h){i.getObject("_editor.selection",!0,h);i.mixin(h._editor.selection,{getType:function(){if(g("ie")<9)return c.doc.selection.type.toLowerCase();else{var a="text",b;try{b=c.global.getSelection()}catch(e){}b&&b.rangeCount==1&&(b=b.getRangeAt(0),b.startContainer==b.endContainer&&b.endOffset-b.startOffset==1&&b.startContainer.nodeType!=3&&(a="control"));return a}},getSelectedText:function(){if(g("ie")<
9){if(h._editor.selection.getType()=="control")return null;return c.doc.selection.createRange().text}else{var a=c.global.getSelection();if(a)return a.toString()}return""},getSelectedHtml:function(){if(g("ie")<9){if(h._editor.selection.getType()=="control")return null;return c.doc.selection.createRange().htmlText}else{var a=c.global.getSelection();if(a&&a.rangeCount){var b,e="";for(b=0;b<a.rangeCount;b++){var d=a.getRangeAt(b).cloneContents(),f=c.doc.createElement("div");f.appendChild(d);e+=f.innerHTML}return e}return null}},
getSelectedElement:function(){if(h._editor.selection.getType()=="control")if(g("ie")<9){var a=c.doc.selection.createRange();if(a&&a.item)return c.doc.selection.createRange().item(0)}else return a=c.global.getSelection(),a.anchorNode.childNodes[a.anchorOffset];return null},getParentElement:function(){if(h._editor.selection.getType()=="control"){var a=this.getSelectedElement();if(a)return a.parentNode}else if(g("ie")<9)return a=c.doc.selection.createRange(),a.collapse(!0),a.parentElement();else if(a=
c.global.getSelection()){for(a=a.anchorNode;a&&a.nodeType!=1;)a=a.parentNode;return a}return null},hasAncestorElement:function(){return this.getAncestorElement.apply(this,arguments)!=null},getAncestorElement:function(){return this.getParentOfType(this.getSelectedElement()||this.getParentElement(),arguments)},isTag:function(a,b){if(a&&a.tagName)for(var c=a.tagName.toLowerCase(),d=0;d<b.length;d++){var f=String(b[d]).toLowerCase();if(c==f)return f}return""},getParentOfType:function(a,b){for(;a;){if(this.isTag(a,
b).length)return a;a=a.parentNode}return null},collapse:function(a){if(window.getSelection){var b=c.global.getSelection();b.removeAllRanges?a?b.collapseToStart():b.collapseToEnd():b.collapse(a)}else g("ie")&&(b=c.doc.selection.createRange(),b.collapse(a),b.select())},remove:function(){var a=c.doc.selection;g("ie")<9?a.type.toLowerCase()!="none"&&a.clear():(a=c.global.getSelection(),a.deleteFromDocument());return a},selectElementChildren:function(a,b){var e=c.global,d=c.doc,a=j.byId(a);if(d.selection&&
g("ie")<9&&c.body().createTextRange){if(d=a.ownerDocument.body.createTextRange(),d.moveToElementText(a),!b)try{d.select()}catch(f){}}else e.getSelection&&(e=c.global.getSelection(),g("opera")?(d=e.rangeCount?e.getRangeAt(0):d.createRange(),d.setStart(a,0),d.setEnd(a,a.nodeType==3?a.length:a.childNodes.length),e.addRange(d)):e.selectAllChildren(a))},selectElement:function(a,b){var e,d=c.doc,f=c.global,a=j.byId(a);if(g("ie")<9&&c.body().createTextRange)try{var h=a.tagName?a.tagName.toLowerCase():"";
e=h==="img"||h==="table"?c.body().createControlRange():c.body().createRange();e.addElement(a);b||e.select()}catch(i){this.selectElementChildren(a,b)}else f.getSelection&&(f=f.getSelection(),e=d.createRange(),f.removeAllRanges&&(g("opera")&&f.getRangeAt(0)&&(e=f.getRangeAt(0)),e.selectNode(a),f.removeAllRanges(),f.addRange(e)))},inSelection:function(a){if(a){var b,e=c.doc,d;if(c.global.getSelection){var f=c.global.getSelection();f&&f.rangeCount>0&&(d=f.getRangeAt(0));if(d&&d.compareBoundaryPoints&&
e.createRange)try{if(b=e.createRange(),b.setStart(a,0),d.compareBoundaryPoints(d.START_TO_END,b)===1)return!0}catch(g){}}else if(e.selection){d=e.selection.createRange();try{(b=a.ownerDocument.body.createControlRange())&&b.addElement(a)}catch(h){try{b=a.ownerDocument.body.createTextRange(),b.moveToElementText(a)}catch(i){}}if(d&&b&&d.compareEndPoints("EndToStart",b)===1)return!0}}return!1}});return h._editor.selection});