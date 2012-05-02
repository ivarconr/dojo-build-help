//>>built
define("dijit/form/_AutoCompleterMixin",["dojo/_base/connect","dojo/data/util/filter","dojo/_base/declare","dojo/_base/Deferred","dojo/dom-attr","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/query","dojo/regexp","dojo/_base/sniff","dojo/string","dojo/_base/window","./DataList","../registry","./_TextBoxMixin"],function(u,j,k,l,m,g,e,h,n,o,p,q,r,s,t,i){return k("dijit.form._AutoCompleterMixin",null,{item:null,pageSize:Infinity,store:null,fetchProperties:{},query:{},autoComplete:!0,highlightMatch:"first",
searchDelay:100,searchAttr:"name",labelAttr:"",labelType:"text",queryExpr:"${0}*",ignoreCase:!0,maxHeight:-1,_stopClickEvents:!1,_getCaretPos:function(a){var b=0;if(typeof a.selectionStart=="number")b=a.selectionStart;else if(p("ie")){var c=r.doc.selection.createRange().duplicate(),a=a.createTextRange();c.move("character",0);a.move("character",0);try{a.setEndPoint("EndToEnd",c),b=String(a.text).replace(/\r/g,"").length}catch(d){}}return b},_setCaretPos:function(a,b){b=parseInt(b);i.selectInputText(a,
b,b)},_setDisabledAttr:function(a){this.inherited(arguments);this.domNode.setAttribute("aria-disabled",a?"true":"false")},_abortQuery:function(){if(this.searchTimer)clearTimeout(this.searchTimer),this.searchTimer=null;if(this._fetchHandle){if(this._fetchHandle.cancel)this._cancelingQuery=!0,this._fetchHandle.cancel(),this._cancelingQuery=!1;this._fetchHandle=null}},_onInput:function(a){this.inherited(arguments);a.charOrCode==229&&this._onKey(a)},_onKey:function(a){var b=a.charOrCode;if(!a.altKey&&
!((a.ctrlKey||a.metaKey)&&b!="x"&&b!="v"||b==e.SHIFT)){var c=!1,d=this.dropDown,f=null;this._prev_key_backspace=!1;this._abortQuery();this.inherited(arguments);this._opened&&(f=d.getHighlightedOption());switch(b){case e.PAGE_DOWN:case e.DOWN_ARROW:case e.PAGE_UP:case e.UP_ARROW:this._opened&&this._announceOption(f);g.stop(a);break;case e.ENTER:if(f)if(f==d.nextButton){this._nextSearch(1);g.stop(a);break}else{if(f==d.previousButton){this._nextSearch(-1);g.stop(a);break}}else this._setBlurValue(),this._setCaretPos(this.focusNode,
this.focusNode.value.length);(this._opened||this._fetchHandle)&&g.stop(a);case e.TAB:b=this.get("displayedValue");if(d&&(b==d._messages.previousMessage||b==d._messages.nextMessage))break;f&&this._selectOption(f);case e.ESCAPE:if(this._opened)this._lastQuery=null,this.closeDropDown();break;case " ":f?(g.stop(a),this._selectOption(f),this.closeDropDown()):c=!0;break;case e.DELETE:case e.BACKSPACE:c=this._prev_key_backspace=!0;break;default:c=typeof b=="string"||b==229}if(c)this.item=void 0,this.searchTimer=
setTimeout(h.hitch(this,"_startSearchFromInput"),1)}},_autoCompleteText:function(a){var b=this.focusNode;i.selectInputText(b,b.value.length);var c=this.ignoreCase?"toLowerCase":"substr";if(a[c](0).indexOf(this.focusNode.value[c](0))==0){if(c=this.autoComplete?this._getCaretPos(b):b.value.length,c+1>b.value.length)b.value=a,i.selectInputText(b,c)}else b.value=a,i.selectInputText(b)},_openResultList:function(a,b,c){this._fetchHandle=null;if(!this.disabled&&!(this.readOnly||b[this.searchAttr]!==this._lastQuery)){var d=
this.dropDown.getHighlightedOption();this.dropDown.clearResultList();!a.length&&c.start==0?this.closeDropDown():(a=this.dropDown.createOptions(a,c,h.hitch(this,"_getMenuLabelFromItem")),this._showResultList(),c.direction?(1==c.direction?this.dropDown.highlightFirstOption():-1==c.direction&&this.dropDown.highlightLastOption(),d&&this._announceOption(this.dropDown.getHighlightedOption())):this.autoComplete&&!this._prev_key_backspace&&!/^[*]+$/.test(b[this.searchAttr].toString())&&this._announceOption(a[1]))}},
_showResultList:function(){this.closeDropDown(!0);this.openDropDown();this.domNode.setAttribute("aria-expanded","true")},loadDropDown:function(){this._startSearchAll()},isLoaded:function(){return!1},closeDropDown:function(){this._abortQuery();this._opened&&(this.inherited(arguments),this.domNode.setAttribute("aria-expanded","false"),this.focusNode.removeAttribute("aria-activedescendant"))},_setBlurValue:function(){var a=this.get("displayedValue"),b=this.dropDown;b&&(a==b._messages.previousMessage||
a==b._messages.nextMessage)?this._setValueAttr(this._lastValueReported,!0):typeof this.item=="undefined"?(this.item=null,this.set("displayedValue",a)):(this.value!=this._lastValueReported&&this._handleOnChange(this.value,!0),this._refreshState())},_setItemAttr:function(a,b,c){var d="";a&&(c||(c=this.store._oldAPI?this.store.getValue(a,this.searchAttr):a[this.searchAttr]),d=this._getValueField()!=this.searchAttr?this.store.getIdentity(a):c);this.set("value",d,b,c,a)},_announceOption:function(a){if(a){var b;
a==this.dropDown.nextButton||a==this.dropDown.previousButton?(b=a.innerHTML,this.item=void 0,this.value=""):(b=(this.store._oldAPI?this.store.getValue(a.item,this.searchAttr):a.item[this.searchAttr]).toString(),this.set("item",a.item,!1,b));this.focusNode.value=this.focusNode.value.substring(0,this._lastInput.length);this.focusNode.setAttribute("aria-activedescendant",m.get(a,"id"));this._autoCompleteText(b)}},_selectOption:function(a){this.closeDropDown();a&&this._announceOption(a);this._setCaretPos(this.focusNode,
this.focusNode.value.length);this._handleOnChange(this.value,!0)},_startSearchAll:function(){this._startSearch("")},_startSearchFromInput:function(){this._startSearch(this.focusNode.value.replace(/([\\\*\?])/g,"\\$1"))},_getQueryString:function(a){return q.substitute(this.queryExpr,[a])},_startSearch:function(a){if(!this.dropDown){var b=this.id+"_popup";this.dropDown=new (h.isString(this.dropDownClass)?h.getObject(this.dropDownClass,!1):this.dropDownClass)({onChange:h.hitch(this,this._selectOption),
id:b,dir:this.dir,textDir:this.textDir});this.focusNode.removeAttribute("aria-activedescendant");this.textbox.setAttribute("aria-owns",b)}this._lastInput=a;var c=h.clone(this.query),d={start:0,count:this.pageSize,queryOptions:{ignoreCase:this.ignoreCase,deep:!0}};h.mixin(d,this.fetchProperties);var f=this._getQueryString(a);this.store._oldAPI?a=f:(a=j.patternToRegExp(f,this.ignoreCase),a.toString=function(){return f});this._lastQuery=c[this.searchAttr]=a;var e=this,g=function(){var a=e._fetchHandle=
e.store.query(c,d);l.when(a,function(b){e._fetchHandle=null;b.total=a.total;e._openResultList(b,c,d)},function(){e._fetchHandle=null;e._cancelingQuery||e.closeDropDown()})};this.searchTimer=setTimeout(h.hitch(this,function(a,b){this.searchTimer=null;g();this._nextSearch=this.dropDown.onPage=function(a){d.start+=d.count*a;d.direction=a;g();b.focus()}},c,this),this.searchDelay)},_getValueField:function(){return this.searchAttr},constructor:function(){this.query={};this.fetchProperties={}},postMixInProperties:function(){if(!this.store){var a=
this.srcNodeRef,b=this.list;this.store=b?t.byId(b):new s({},a);if(!("value"in this.params)&&(a=this.item=this.store.fetchSelectedItem()))b=this._getValueField(),this.value=this.store._oldAPI?this.store.getValue(a,b):a[b]}this.inherited(arguments)},postCreate:function(){var a=n('label[for="'+this.id+'"]');if(a.length)a[0].id=this.id+"_label",this.domNode.setAttribute("aria-labelledby",a[0].id);this.inherited(arguments)},_getMenuLabelFromItem:function(a){var a=this.labelFunc(a,this.store),b=this.labelType;
this.highlightMatch!="none"&&this.labelType=="text"&&this._lastInput&&(a=this.doHighlight(a,this._lastInput),b="html");return{html:b=="html",label:a}},doHighlight:function(a,b){var c=(this.ignoreCase?"i":"")+(this.highlightMatch=="all"?"g":""),d=this.queryExpr.indexOf("${0}"),b=o.escapeString(b);return this._escapeHtml(a.replace(RegExp((d==0?"^":"")+"("+b+")"+(d==this.queryExpr.length-4?"$":""),c),"\uffff$1\uffff")).replace(/\uFFFF([^\uFFFF]+)\uFFFF/g,'<span class="dijitComboBoxHighlightMatch">$1</span>')},
_escapeHtml:function(a){return a=String(a).replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;")},reset:function(){this.item=null;this.inherited(arguments)},labelFunc:function(a,b){return(b._oldAPI?b.getValue(a,this.labelAttr||this.searchAttr):a[this.labelAttr||this.searchAttr]).toString()},_setValueAttr:function(a,b,c,d){this._set("item",d||null);a||(a="");this.inherited(arguments)},_setTextDirAttr:function(a){this.inherited(arguments);this.dropDown&&this.dropDown._set("textDir",
a)}})});