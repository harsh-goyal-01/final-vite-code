System.register(["./vendor-legacy-b600d4c8.js"],(function(e,n){"use strict";var a,t,o,r,i,d;return{setters:[function(e){a=e.R,t=e.j,o=e.r,r=e.F,i=e.a,d=e.I}],execute:function(){var l,s=e("_",(function(e,n,a){return e()})),u=e("l",(function(e){var n=a.lazy(e);return n.preload=e,n})),c=u((function(){return s((function(){return n.import("./Dates-legacy-1d80aef7.js")}),void 0)})),g=u((function(){return s((function(){return n.import("./Chatbox-legacy-01826e71.js")}),void 0)})),f=function(){return t("div",null,t(o.Suspense,{fallback:t("div",null,t(r,{id:"loading",defaultMessage:"loading..."}))},t(c,null)),t(o.Suspense,{fallback:t("div",null,t(r,{id:"loading",defaultMessage:"loading..."}))},t(g,null)))},m={sendButton:"Send",heading:"Chat App",loading:"loading...",US:"Date (in US format):",UK:"Date (in UK format):",Spanish:"Date (in Spanish format):",useridUS:"User_id In US format:",arialabel:"Send Your Message","src.components.Form.placeholder":"Enter Your Message"},p={sendButton:"Enviar",heading:"Aplicación de chat",loading:"cargando...",US:"Fecha (en formato estadounidense):",UK:"Fecha (en formato del Reino Unido):",Spanish:"Fecha (en formato español):",useridUS:"User_id En formato de EE. UU.:","src.components.Form.placeholder":"Ingrese su mensaje",arialabel:"Envía tu mensaje"},S=navigator.language;l="en-US"===S?m:p;var U=document.getElementById("root"),v=function(){i.render(t(d,{locale:S,messages:l},t(f,null)),U)};"loading"!==document.readyState?v():document.addEventListener("DOMContentLoaded",v)}}}));
