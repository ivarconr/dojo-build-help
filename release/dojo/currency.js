//>>built
define("dojo/currency",["./_base/lang","./_base/array","./number","./i18n","./i18n!./cldr/nls/currency","./cldr/monetary"],function(f,g,c,h,j,i){var b=f.getObject("dojo.currency",!0);b._mixInDefaults=function(a){a=a||{};a.type="currency";var b=h.getLocalization("dojo.cldr","currency",a.locale)||{},c=a.currency,e=i.getData(c);g.forEach(["displayName","symbol","group","decimal"],function(a){e[a]=b[c+"_"+a]});e.fractional=[!0,!1];return f.mixin(e,a)};b.format=function(a,d){return c.format(a,b._mixInDefaults(d))};
b.regexp=function(a){return c.regexp(b._mixInDefaults(a))};b.parse=function(a,d){return c.parse(a,b._mixInDefaults(d))};return b});