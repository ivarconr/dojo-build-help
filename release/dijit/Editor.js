//>>built
define("dijit/Editor",["dojo/_base/array","dojo/_base/declare","dojo/_base/Deferred","dojo/i18n","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/_base/sniff","dojo/string","dojo/topic","dojo/_base/window","./_base/focus","./_Container","./Toolbar","./ToolbarSeparator","./layout/_LayoutWidget","./form/ToggleButton","./_editor/_Plugin","./_editor/plugins/EnterKeyHandling","./_editor/html","./_editor/range","./_editor/RichText",
".","dojo/i18n!./_editor/nls/commands"],function(i,o,w,x,y,r,s,p,t,d,g,h,z,A,n,u,H,B,C,D,E,k,F,v,f,G,q){function e(a){return new k({command:a.name})}function l(a){return new k({buttonClass:E,command:a.name})}o=o("dijit.Editor",G,{plugins:null,extraPlugins:null,constructor:function(){if(!g.isArray(this.plugins))this.plugins=["undo","redo","|","cut","copy","paste","|","bold","italic","underline","strikethrough","|","insertOrderedList","insertUnorderedList","indent","outdent","|","justifyLeft","justifyRight",
"justifyCenter","justifyFull",F];this._plugins=[];this._editInterval=this.editActionInterval*1E3;h("ie")&&(this.events.push("onBeforeDeactivate"),this.events.push("onBeforeActivate"))},postMixInProperties:function(){this.setValueDeferred=new w;this.inherited(arguments)},postCreate:function(){this._steps=this._steps.slice(0);this._undoedSteps=this._undoedSteps.slice(0);if(g.isArray(this.extraPlugins))this.plugins=this.plugins.concat(this.extraPlugins);this.inherited(arguments);this.commands=x.getLocalization("dijit._editor",
"commands",this.lang);if(!this.toolbar)this.toolbar=new B({dir:this.dir,lang:this.lang}),this.header.appendChild(this.toolbar.domNode);i.forEach(this.plugins,this.addPlugin,this);this.setValueDeferred.callback(!0);r.add(this.iframe.parentNode,"dijitEditorIFrameContainer");r.add(this.iframe,"dijitEditorIFrame");y.set(this.iframe,"allowTransparency",!0);h("webkit")&&p.set(this.domNode,"KhtmlUserSelect","none");this.toolbar.startup();this.onNormalizedDisplayChanged()},destroy:function(){i.forEach(this._plugins,
function(a){a&&a.destroy&&a.destroy()});this._plugins=[];this.toolbar.destroyRecursive();delete this.toolbar;this.inherited(arguments)},addPlugin:function(a,b){var c=g.isString(a)?{name:a}:g.isFunction(a)?{ctor:a}:a;if(!c.setEditor){var m={args:c,plugin:null,editor:this};if(c.name)k.registry[c.name]?m.plugin=k.registry[c.name](c):A.publish(q._scopeName+".Editor.getPlugin",m);if(!m.plugin){var d=c.ctor||g.getObject(c.name);if(d)m.plugin=new d(c)}if(!m.plugin)throw Error(this.id+": cannot find plugin",
a);a=m.plugin}arguments.length>1?this._plugins[b]=a:this._plugins.push(a);a.setEditor(this);g.isFunction(a.setToolbar)&&a.setToolbar(this.toolbar)},resize:function(a){a&&D.prototype.resize.apply(this,arguments)},layout:function(){this.editingArea.style.height=this._contentBox.h-(this.getHeaderHeight()+this.getFooterHeight()+s.getPadBorderExtents(this.iframe.parentNode).h+s.getMarginExtents(this.iframe.parentNode).h)+"px";if(this.iframe)this.iframe.style.height="100%";this._layoutMode=!0},_onIEMouseDown:function(a){var b,
c=this.document.body,d=c.clientWidth,e=c.clientHeight,f=c.clientLeft,h=c.offsetWidth,i=c.offsetHeight,k=c.offsetLeft;/^rtl$/i.test(c.dir||"")?d<h&&a.x>d&&a.x<h&&(b=!0):a.x<f&&a.x>k&&(b=!0);b||e<i&&a.y>e&&a.y<i&&(b=!0);b||(delete this._cursorToStart,delete this._savedSelection,a.target.tagName=="BODY"&&setTimeout(g.hitch(this,"placeCursorAtEnd"),0),this.inherited(arguments))},onBeforeActivate:function(){this._restoreSelection()},onBeforeDeactivate:function(a){this.customUndo&&this.endEditing(!0);a.target.tagName!=
"BODY"&&this._saveSelection()},customUndo:!0,editActionInterval:3,beginEditing:function(a){if(!this._inEditing)this._inEditing=!0,this._beginEditing(a);if(this.editActionInterval>0)this._editTimer&&clearTimeout(this._editTimer),this._editTimer=setTimeout(g.hitch(this,this.endEditing),this._editInterval)},_steps:[],_undoedSteps:[],execCommand:function(a){if(this.customUndo&&(a=="undo"||a=="redo"))return this[a]();else{this.customUndo&&(this.endEditing(),this._beginEditing());var b=this.inherited(arguments);
this.customUndo&&this._endEditing();return b}},_pasteImpl:function(){return this._clipboardCommand("paste")},_cutImpl:function(){return this._clipboardCommand("cut")},_copyImpl:function(){return this._clipboardCommand("copy")},_clipboardCommand:function(a){var b;try{if(b=this.document.execCommand(a,!1,null),h("webkit")&&!b)throw{code:1011};}catch(c){if(c.code==1011||c.code==9&&h("opera"))b=z.substitute,alert(b(this.commands.systemShortcut,[this.commands[a],b(this.commands[h("mac")?"appleKey":"ctrlKey"],
[{cut:"X",copy:"C",paste:"V"}[a]])]));b=!1}return b},queryCommandEnabled:function(a){return this.customUndo&&(a=="undo"||a=="redo")?a=="undo"?this._steps.length>1:this._undoedSteps.length>0:this.inherited(arguments)},_moveToBookmark:function(a){var b=a.mark,c=a.mark,a=a.isCollapsed,d,e,j;if(c)if(h("ie")<9)if(g.isArray(c))b=[],i.forEach(c,function(a){b.push(f.getNode(a,this.editNode))},this),n.withGlobal(this.window,"moveToBookmark",q,[{mark:b,isCollapsed:a}]);else{if(c.startContainer&&c.endContainer&&
(j=f.getSelection(this.window))&&j.removeAllRanges)j.removeAllRanges(),a=f.create(this.window),d=f.getNode(c.startContainer,this.editNode),e=f.getNode(c.endContainer,this.editNode),d&&e&&(a.setStart(d,c.startOffset),a.setEnd(e,c.endOffset),j.addRange(a))}else if((j=f.getSelection(this.window))&&j.removeAllRanges)j.removeAllRanges(),a=f.create(this.window),d=f.getNode(c.startContainer,this.editNode),e=f.getNode(c.endContainer,this.editNode),d&&e&&(a.setStart(d,c.startOffset),a.setEnd(e,c.endOffset),
j.addRange(a))},_changeToStep:function(a,b){this.setValue(b.text);var c=b.bookmark;c&&this._moveToBookmark(c)},undo:function(){var a=!1;if(!this._undoRedoActive){this._undoRedoActive=!0;this.endEditing(!0);var b=this._steps.pop();b&&this._steps.length>0&&(this.focus(),this._changeToStep(b,this._steps[this._steps.length-1]),this._undoedSteps.push(b),this.onDisplayChanged(),delete this._undoRedoActive,a=!0);delete this._undoRedoActive}return a},redo:function(){var a=!1;if(!this._undoRedoActive){this._undoRedoActive=
!0;this.endEditing(!0);var b=this._undoedSteps.pop();b&&this._steps.length>0&&(this.focus(),this._changeToStep(this._steps[this._steps.length-1],b),this._steps.push(b),this.onDisplayChanged(),a=!0);delete this._undoRedoActive}return a},endEditing:function(a){this._editTimer&&clearTimeout(this._editTimer);if(this._inEditing)this._endEditing(a),this._inEditing=!1},_getBookmark:function(){var a=n.withGlobal(this.window,u.getBookmark),b=[];if(a&&a.mark){var c=a.mark;if(h("ie")<9){var d=f.getSelection(this.window);
if(g.isArray(c))i.forEach(a.mark,function(a){b.push(f.getIndex(a,this.editNode).o)},this),a.mark=b;else if(d){var e;d.rangeCount&&(e=d.getRangeAt(0));a.mark=e?e.cloneRange():n.withGlobal(this.window,u.getBookmark)}}try{if(a.mark&&a.mark.startContainer)b=f.getIndex(a.mark.startContainer,this.editNode).o,a.mark={startContainer:b,startOffset:a.mark.startOffset,endContainer:a.mark.endContainer===a.mark.startContainer?b:f.getIndex(a.mark.endContainer,this.editNode).o,endOffset:a.mark.endOffset}}catch(j){a.mark=
null}}return a},_beginEditing:function(){this._steps.length===0&&this._steps.push({text:v.getChildrenHtml(this.editNode),bookmark:this._getBookmark()})},_endEditing:function(){var a=v.getChildrenHtml(this.editNode);this._undoedSteps=[];this._steps.push({text:a,bookmark:this._getBookmark()})},onKeyDown:function(a){!h("ie")&&!this.iframe&&a.keyCode==d.TAB&&!this.tabIndent&&this._saveSelection();if(this.customUndo){var b=a.keyCode;if(a.ctrlKey&&!a.altKey)if(b==90||b==122){t.stop(a);this.undo();return}else if(b==
89||b==121){t.stop(a);this.redo();return}this.inherited(arguments);switch(b){case d.ENTER:case d.BACKSPACE:case d.DELETE:this.beginEditing();break;case 88:case 86:if(a.ctrlKey&&!a.altKey&&!a.metaKey){this.endEditing();a.keyCode==88?this.beginEditing("cut"):this.beginEditing("paste");setTimeout(g.hitch(this,this.endEditing),1);break}default:if(!a.ctrlKey&&!a.altKey&&!a.metaKey&&(a.keyCode<d.F1||a.keyCode>d.F15)){this.beginEditing();break}case d.ALT:this.endEditing();break;case d.UP_ARROW:case d.DOWN_ARROW:case d.LEFT_ARROW:case d.RIGHT_ARROW:case d.HOME:case d.END:case d.PAGE_UP:case d.PAGE_DOWN:this.endEditing(!0);
case d.CTRL:case d.SHIFT:case d.TAB:}}else this.inherited(arguments)},_onBlur:function(){this.inherited(arguments);this.endEditing(!0)},_saveSelection:function(){try{this._savedSelection=this._getBookmark()}catch(a){}},_restoreSelection:function(){this._savedSelection&&(delete this._cursorToStart,n.withGlobal(this.window,"isCollapsed",q)&&this._moveToBookmark(this._savedSelection),delete this._savedSelection)},onClick:function(){this.endEditing(!0);this.inherited(arguments)},replaceValue:function(a){this.customUndo?
this.isClosed?this.setValue(a):(this.beginEditing(),a||(a="&#160;"),this.setValue(a),this.endEditing()):this.inherited(arguments)},_setDisabledAttr:function(a){this.setValueDeferred.then(g.hitch(this,function(){!this.disabled&&a||!this._buttonEnabledPlugins&&a?i.forEach(this._plugins,function(a){a.set("disabled",!0)}):this.disabled&&!a&&i.forEach(this._plugins,function(a){a.set("disabled",!1)})}));this.inherited(arguments)},_setStateClass:function(){try{this.inherited(arguments),this.document&&this.document.body&&
p.set(this.document.body,"color",p.get(this.iframe,"color"))}catch(a){}}});g.mixin(k.registry,{undo:e,redo:e,cut:e,copy:e,paste:e,insertOrderedList:e,insertUnorderedList:e,indent:e,outdent:e,justifyCenter:e,justifyFull:e,justifyLeft:e,justifyRight:e,"delete":e,selectAll:e,removeFormat:e,unlink:e,insertHorizontalRule:e,bold:l,italic:l,underline:l,strikethrough:l,subscript:l,superscript:l,"|":function(){return new k({button:new C,setEditor:function(a){this.editor=a}})}});return o});