//>>built
define("dojo/topic",["./Evented"],function(b){var a=new b;return{publish:function(){return a.emit.apply(a,arguments)},subscribe:function(){return a.on.apply(a,arguments)}}});