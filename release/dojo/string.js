//>>built
define("dojo/string",["./_base/kernel","./_base/lang"],function(h,f){var d=f.getObject("dojo.string",!0);d.rep=function(a,b){if(b<=0||!a)return"";for(var c=[];;){b&1&&c.push(a);if(!(b>>=1))break;a+=a}return c.join("")};d.pad=function(a,b,c,e){c||(c="0");a=String(a);b=d.rep(c,Math.ceil((b-a.length)/c.length));return e?a+b:b+a};d.substitute=function(a,b,c,e){e=e||h.global;c=c?f.hitch(e,c):function(a){return a};return a.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(a,d,g){a=f.getObject(d,
!1,b);g&&(a=f.getObject(g,!1,e).call(e,a,d));return c(a,d).toString()})};d.trim=String.prototype.trim?f.trim:function(a){for(var a=a.replace(/^\s+/,""),b=a.length-1;b>=0;b--)if(/\S/.test(a.charAt(b))){a=a.substring(0,b+1);break}return a};return d});