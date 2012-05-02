//>>built
define("dijit/_editor/plugins/LinkDialog",["require","dojo/_base/declare","dojo/dom-attr","dojo/keys","dojo/_base/lang","dojo/_base/sniff","dojo/_base/query","dojo/string","dojo/_base/window","../../_Widget","../_Plugin","../../form/DropDownButton","../range","../selection"],function(p,k,i,q,f,l,r,m,d,t,j,s,n,e){var h=k("dijit._editor.plugins.LinkDialog",j,{buttonClass:s,useDefaultCommand:!1,urlRegExp:"((https?|ftps?|file)\\://|./|/|)(/[a-zA-Z]{1,1}:/|)(((?:(?:[\\da-zA-Z](?:[-\\da-zA-Z]{0,61}[\\da-zA-Z])?)\\.)*(?:[a-zA-Z](?:[-\\da-zA-Z]{0,80}[\\da-zA-Z])?)\\.?)|(((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])|(0[xX]0*[\\da-fA-F]?[\\da-fA-F]\\.){3}0[xX]0*[\\da-fA-F]?[\\da-fA-F]|(0+[0-3][0-7][0-7]\\.){3}0+[0-3][0-7][0-7]|(0|[1-9]\\d{0,8}|[1-3]\\d{9}|4[01]\\d{8}|42[0-8]\\d{7}|429[0-3]\\d{6}|4294[0-8]\\d{5}|42949[0-5]\\d{4}|429496[0-6]\\d{3}|4294967[01]\\d{2}|42949672[0-8]\\d|429496729[0-5])|0[xX]0*[\\da-fA-F]{1,8}|([\\da-fA-F]{1,4}\\:){7}[\\da-fA-F]{1,4}|([\\da-fA-F]{1,4}\\:){6}((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])))(\\:\\d+)?(/(?:[^?#\\s/]+/)*(?:[^?#\\s/]{0,}(?:\\?[^?#\\s/]*)?(?:#.*)?)?)?",
emailRegExp:"<?(mailto\\:)([!#-'*+\\-\\/-9=?A-Z^-~]+[.])*[!#-'*+\\-\\/-9=?A-Z^-~]+@((?:(?:[\\da-zA-Z](?:[-\\da-zA-Z]{0,61}[\\da-zA-Z])?)\\.)+(?:[a-zA-Z](?:[-\\da-zA-Z]{0,6}[\\da-zA-Z])?)\\.?)|localhost|^[^-][a-zA-Z0-9_-]*>?",htmlTemplate:'<a href="${urlInput}" _djrealurl="${urlInput}" target="${targetSelect}">${textInput}</a>',tag:"a",_hostRxp:/^((([^\[:]+):)?([^@]+)@)?(\[([^\]]+)\]|([^\[:]*))(:([0-9]+))?$/,_userAtRxp:/^([!#-'*+\-\/-9=?A-Z^-~]+[.])*[!#-'*+\-\/-9=?A-Z^-~]+@/i,linkDialogTemplate:"<table><tr><td><label for='${id}_urlInput'>${url}</label></td><td><input data-dojo-type='dijit.form.ValidationTextBox' required='true' id='${id}_urlInput' name='urlInput' data-dojo-props='intermediateChanges:true'/></td></tr><tr><td><label for='${id}_textInput'>${text}</label></td><td><input data-dojo-type='dijit.form.ValidationTextBox' required='true' id='${id}_textInput' name='textInput' data-dojo-props='intermediateChanges:true'/></td></tr><tr><td><label for='${id}_targetSelect'>${target}</label></td><td><select id='${id}_targetSelect' name='targetSelect' data-dojo-type='dijit.form.Select'><option selected='selected' value='_self'>${currentWindow}</option><option value='_blank'>${newWindow}</option><option value='_top'>${topWindow}</option><option value='_parent'>${parentWindow}</option></select></td></tr><tr><td colspan='2'><button data-dojo-type='dijit.form.Button' type='submit' id='${id}_setButton'>${set}</button><button data-dojo-type='dijit.form.Button' type='button' id='${id}_cancelButton'>${buttonCancel}</button></td></tr></table>",
_initButton:function(){this.inherited(arguments);this.button.loadDropDown=f.hitch(this,"_loadDropDown");this._connectTagEvents()},_loadDropDown:function(a){p(["dojo/i18n","../../TooltipDialog","../../registry","../../form/Button","../../form/Select","../../form/ValidationTextBox","dojo/i18n!../../nls/common","dojo/i18n!../nls/LinkDialog"],f.hitch(this,function(b,c,d){var e=this;this.tag=this.command=="insertImage"?"img":"a";var b=f.delegate(b.getLocalization("dijit","common",this.lang),b.getLocalization("dijit._editor",
"LinkDialog",this.lang)),g=this.dropDown=this.button.dropDown=new c({title:b[this.command+"Title"],dir:this.editor.dir,execute:f.hitch(this,"setValue"),onOpen:function(){e._onOpenDialog();c.prototype.onOpen.apply(this,arguments)},onCancel:function(){setTimeout(f.hitch(e,"_onCloseDialog"),0)}});b.urlRegExp=this.urlRegExp;b.id=d.getUniqueId(this.editor.id);this._uniqueId=b.id;this._setContent(g.title+"<div style='border-bottom: 1px black solid;padding-bottom:2pt;margin-bottom:4pt'></div>"+m.substitute(this.linkDialogTemplate,
b));g.startup();this._urlInput=d.byId(this._uniqueId+"_urlInput");this._textInput=d.byId(this._uniqueId+"_textInput");this._setButton=d.byId(this._uniqueId+"_setButton");this.connect(d.byId(this._uniqueId+"_cancelButton"),"onClick",function(){this.dropDown.onCancel()});this._urlInput&&this.connect(this._urlInput,"onChange","_checkAndFixInput");this._textInput&&this.connect(this._textInput,"onChange","_checkAndFixInput");this._urlRegExp=RegExp("^"+this.urlRegExp+"$","i");this._emailRegExp=RegExp("^"+
this.emailRegExp+"$","i");this._urlInput.isValid=f.hitch(this,function(){var a=this._urlInput.get("value");return this._urlRegExp.test(a)||this._emailRegExp.test(a)});this.connect(g.domNode,"onkeypress",function(a){a&&a.charOrCode==q.ENTER&&!a.shiftKey&&!a.metaKey&&!a.ctrlKey&&!a.altKey&&!this._setButton.get("disabled")&&(g.onExecute(),g.execute(g.get("value")))});a()}))},_checkAndFixInput:function(){var a=this,b=this._urlInput.get("value");if(this._delayedCheck)clearTimeout(this._delayedCheck),this._delayedCheck=
null;this._delayedCheck=setTimeout(function(){var c=b,d=!1,e=!1;c&&c.length>1&&(c=f.trim(c),c.indexOf("mailto:")!==0&&(c.indexOf("/")>0?c.indexOf("://")===-1&&c.charAt(0)!=="/"&&c.indexOf("./")!==0&&a._hostRxp.test(c)&&(d=!0):a._userAtRxp.test(c)&&(e=!0)));d&&a._urlInput.set("value","http://"+c);e&&a._urlInput.set("value","mailto:"+c);a._setButton.set("disabled",!a._isValid())},250)},_connectTagEvents:function(){this.editor.onLoadDeferred.addCallback(f.hitch(this,function(){this.connect(this.editor.editNode,
"ondblclick",this._onDblClick)}))},_isValid:function(){return this._urlInput.isValid()&&this._textInput.isValid()},_setContent:function(a){this.dropDown.set({parserScope:"dojo",content:a})},_checkValues:function(a){if(a&&a.urlInput)a.urlInput=a.urlInput.replace(/"/g,"&quot;");return a},setValue:function(a){this._onCloseDialog();if(l("ie")<9){var b=n.getSelection(this.editor.window).getRangeAt(0).endContainer;if(b.nodeType===3)b=b.parentNode;b&&b.nodeName&&b.nodeName.toLowerCase()!==this.tag&&(b=d.withGlobal(this.editor.window,
"getSelectedElement",e,[this.tag]));b&&b.nodeName&&b.nodeName.toLowerCase()===this.tag&&this.editor.queryCommandEnabled("unlink")&&(d.withGlobal(this.editor.window,"selectElementChildren",e,[b]),this.editor.execCommand("unlink"))}a=this._checkValues(a);this.editor.execCommand("inserthtml",m.substitute(this.htmlTemplate,a));r("a",this.editor.document).forEach(function(a){!a.innerHTML&&!i.has(a,"name")&&a.parentNode.removeChild(a)},this)},_onCloseDialog:function(){this.editor.focus()},_getCurrentValues:function(a){var b,
c,f;a&&a.tagName.toLowerCase()===this.tag?(b=a.getAttribute("_djrealurl")||a.getAttribute("href"),f=a.getAttribute("target")||"_self",c=a.textContent||a.innerText,d.withGlobal(this.editor.window,"selectElement",e,[a,!0])):c=d.withGlobal(this.editor.window,e.getSelectedText);return{urlInput:b||"",textInput:c||"",targetSelect:f||""}},_onOpenDialog:function(){var a,b;if(l("ie")){var c=n.getSelection(this.editor.window).getRangeAt(0);a=c.endContainer;if(a.nodeType===3)a=a.parentNode;a&&a.nodeName&&a.nodeName.toLowerCase()!==
this.tag&&(a=d.withGlobal(this.editor.window,"getSelectedElement",e,[this.tag]));if(!a||a.nodeName&&a.nodeName.toLowerCase()!==this.tag)if((b=d.withGlobal(this.editor.window,"getAncestorElement",e,[this.tag]))&&b.nodeName&&b.nodeName.toLowerCase()==this.tag)a=b,d.withGlobal(this.editor.window,"selectElement",e,[a]);else if(c.startContainer===c.endContainer&&(b=c.startContainer.firstChild)&&b.nodeName&&b.nodeName.toLowerCase()==this.tag)a=b,d.withGlobal(this.editor.window,"selectElement",e,[a])}else a=
d.withGlobal(this.editor.window,"getAncestorElement",e,[this.tag]);this.dropDown.reset();this._setButton.set("disabled",!0);this.dropDown.set("value",this._getCurrentValues(a))},_onDblClick:function(a){if(a&&a.target&&(a=a.target,(a.tagName?a.tagName.toLowerCase():"")===this.tag&&i.get(a,"href"))){var b=this.editor;d.withGlobal(b.window,"selectElement",e,[a]);b.onDisplayChanged();b._updateTimer&&(clearTimeout(b._updateTimer),delete b._updateTimer);b.onNormalizedDisplayChanged();var c=this.button;
setTimeout(function(){c.set("disabled",!1);c.loadAndOpenDropDown().then(function(){c.dropDown.focus&&c.dropDown.focus()})},10)}}}),o=k("dijit._editor.plugins.ImgLinkDialog",[h],{linkDialogTemplate:"<table><tr><td><label for='${id}_urlInput'>${url}</label></td><td><input dojoType='dijit.form.ValidationTextBox' regExp='${urlRegExp}' required='true' id='${id}_urlInput' name='urlInput' data-dojo-props='intermediateChanges:true'/></td></tr><tr><td><label for='${id}_textInput'>${text}</label></td><td><input data-dojo-type='dijit.form.ValidationTextBox' required='false' id='${id}_textInput' name='textInput' data-dojo-props='intermediateChanges:true'/></td></tr><tr><td></td><td></td></tr><tr><td colspan='2'><button data-dojo-type='dijit.form.Button' type='submit' id='${id}_setButton'>${set}</button><button data-dojo-type='dijit.form.Button' type='button' id='${id}_cancelButton'>${buttonCancel}</button></td></tr></table>",
htmlTemplate:'<img src="${urlInput}" _djrealurl="${urlInput}" alt="${textInput}" />',tag:"img",_getCurrentValues:function(a){var b,c;a&&a.tagName.toLowerCase()===this.tag?(b=a.getAttribute("_djrealurl")||a.getAttribute("src"),c=a.getAttribute("alt"),d.withGlobal(this.editor.window,"selectElement",e,[a,!0])):c=d.withGlobal(this.editor.window,e.getSelectedText);return{urlInput:b||"",textInput:c||""}},_isValid:function(){return this._urlInput.isValid()},_connectTagEvents:function(){this.inherited(arguments);
this.editor.onLoadDeferred.addCallback(f.hitch(this,function(){this.connect(this.editor.editNode,"onmousedown",this._selectTag)}))},_selectTag:function(a){if(a&&a.target)a=a.target,(a.tagName?a.tagName.toLowerCase():"")===this.tag&&d.withGlobal(this.editor.window,"selectElement",e,[a])},_checkValues:function(a){if(a&&a.urlInput)a.urlInput=a.urlInput.replace(/"/g,"&quot;");if(a&&a.textInput)a.textInput=a.textInput.replace(/"/g,"&quot;");return a},_onDblClick:function(a){if(a&&a.target&&(a=a.target,
(a.tagName?a.tagName.toLowerCase():"")===this.tag&&i.get(a,"src"))){var b=this.editor;d.withGlobal(b.window,"selectElement",e,[a]);b.onDisplayChanged();b._updateTimer&&(clearTimeout(b._updateTimer),delete b._updateTimer);b.onNormalizedDisplayChanged();var c=this.button;setTimeout(function(){c.set("disabled",!1);c.loadAndOpenDropDown().then(function(){c.dropDown.focus&&c.dropDown.focus()})},10)}}});j.registry.createLink=function(){return new h({command:"createLink"})};j.registry.insertImage=function(){return new o({command:"insertImage"})};
h.ImgLinkDialog=o;return h});