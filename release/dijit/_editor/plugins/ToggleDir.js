//>>built
define("dijit/_editor/plugins/ToggleDir",["dojo/_base/declare","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","../_Plugin","../../form/ToggleButton"],function(d,e,f,g,b,h){f.experimental("dijit._editor.plugins.ToggleDir");var c=d("dijit._editor.plugins.ToggleDir",b,{useDefaultCommand:!1,command:"toggleDir",buttonClass:h,_initButton:function(){this.inherited(arguments);this.editor.onLoadDeferred.addCallback(g.hitch(this,function(){var a=this.editor.editorObject.contentWindow.document.documentElement,
a=a.getElementsByTagName("body")[0];this.button.set("checked",e.getComputedStyle(a).direction!="ltr");this.connect(this.button,"onChange","_setRtl")}))},updateState:function(){this.button.set("disabled",this.get("disabled"))},_setRtl:function(a){var b="ltr";a&&(b="rtl");a=this.editor.editorObject.contentWindow.document.documentElement;a=a.getElementsByTagName("body")[0];a.dir=b}});b.registry.toggleDir=function(){return new c({command:"toggleDir"})};return c});