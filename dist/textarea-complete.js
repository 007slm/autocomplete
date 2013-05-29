define("arale/autocomplete/1.2.1/textarea-complete",["$","gallery/selection/0.9.0/selection","./autocomplete","arale/overlay/1.1.0/overlay","arale/position/1.0.0/position","arale/iframe-shim/1.0.1/iframe-shim","arale/widget/1.1.0/widget","arale/base/1.1.0/base","arale/class/1.0.0/class","arale/events/1.1.0/events","arale/templatable/0.9.0/templatable","gallery/handlebars/1.0.1/handlebars","./data-source","./filter","./autocomplete.tpl"],function(t,e,i){var s=t("$"),a=t("gallery/selection/0.9.0/selection"),r=t("./autocomplete"),n=r.extend({attrs:{cursor:!1},setup:function(){n.superclass.setup.call(this),this.sel=a(this.get("trigger"));var t=this.get("inputFilter"),e=this;this.set("inputFilter",function(i){var s=i.substring(0,e.sel.cursor()[1]);return t.call(e,s)}),this.get("cursor")&&(this.mirror=l.init(this.get("trigger")),this.dataSource.before("getData",function(){e.mirror.setContent(e.get("inputValue"),e.queryValue,e.sel.cursor())}))},_keyUp:function(t){this.get("visible")&&(t.preventDefault(),this.get("data").length&&this._step(-1))},_keyDown:function(t){this.get("visible")&&(t.preventDefault(),this.get("data").length&&this._step(1))},_keyEnter:function(t){this.get("visible")&&(this.currentItem?(t.preventDefault(),t.stopImmediatePropagation(),this.selectItem()):this.hide())},show:function(){var t=this.get("cursor");if(t){if(s.isArray(t))var e=t;else var e=[0,0];var i=this.mirror.getFlagRect(),a=this.get("align");a.baseXY=[i.left+e[0],i.bottom+e[1]],a.selfXY=[0,0],this.set("align",a)}n.superclass.show.call(this)},selectItem:function(){this.hide();var t=this.currentItem,e=this.get("selectedIndex"),i=this.get("data")[e];if(t){var s=t.attr("data-value"),a=this.sel.cursor()[1],r=a-this.queryValue.length;this.sel.cursor(r,a).text("").append(s,"right");var n=this.get("trigger").val();this.set("inputValue",n),this.mirror&&this.mirror.setContent(n,"",this.sel.cursor()),this.trigger("itemSelect",i),this._clear()}}}),l={mirror:null,css:["overflowY","height","width","paddingTop","paddingLeft","paddingRight","paddingBottom","marginTop","marginLeft","marginRight","marginBottom","fontFamily","borderStyle","borderWidth","wordWrap","fontSize","lineHeight","overflowX"],init:function(t){t=s(t);var e={position:"absolute",left:-9999,top:0,zIndex:-2e4,"white-space":"pre-wrap"};return s.each(this.css,function(i,s){return e[s]=t.css(s)}),this.mirror=s("<div><span></span></div>").css(e).insertAfter(t),this},setContent:function(t,e,i){var s=e?i[1]-e.length:i[1],a=i[1],r=["<span>",t.substring(0,s),"</span>",'<span id="flag">',e||"","</span>","<span>",t.substring(a),"</span>"].join("");return this.mirror.html(r),this},getFlagRect:function(){var t,e,i;return i=this.mirror.find("span#flag"),t=i.position(),e={left:t.left,right:i.width()+t.left,top:t.top,bottom:i.height()+t.top}}};i.exports=n}),define("arale/autocomplete/1.2.1/autocomplete",["$","arale/overlay/1.1.0/overlay","arale/position/1.0.0/position","arale/iframe-shim/1.0.1/iframe-shim","arale/widget/1.1.0/widget","arale/base/1.1.0/base","arale/class/1.0.0/class","arale/events/1.1.0/events","arale/templatable/0.9.0/templatable","gallery/handlebars/1.0.1/handlebars","arale/autocomplete/1.2.1/data-source","arale/autocomplete/1.2.1/filter"],function(t,e,i){function s(t){return"[object String]"===Object.prototype.toString.call(t)}function a(t,e){if(!t)return e;if(n.isFunction(t))return t.call(this,e);if(s(t)){for(var i=t.split("."),a=e;i.length;){var r=i.shift();if(!a[r])break;a=a[r]}return a}return e}function r(t,e){var i=this.highlightIndex,s=0,a=e||this.matchKey||"",r="";if(n.isArray(i)){for(var l=0,o=i.length;o>l;l++){var h,c,d=i[l];if(n.isArray(d)?(h=d[0],c=d[1]-d[0]):(h=d,c=1),h>s&&(r+=a.substring(s,h)),a.length>h&&(r+='<span class="'+t+'-item-hl">'+a.substr(h,c)+"</span>"),s=h+c,s>=a.length)break}return a.length>s&&(r+=a.substring(s,a.length)),new u.SafeString(r)}return a}var n=t("$"),l=t("arale/overlay/1.1.0/overlay"),o=t("arale/templatable/0.9.0/templatable"),u=t("gallery/handlebars/1.0.1/handlebars"),h=t("arale/autocomplete/1.2.1/data-source"),c=t("arale/autocomplete/1.2.1/filter"),d=t("arale/autocomplete/1.2.1/autocomplete.tpl"),f={UP:38,DOWN:40,LEFT:37,RIGHT:39,ENTER:13,ESC:27,BACKSPACE:8},g=l.extend({Implements:o,attrs:{trigger:{value:null,getter:function(t){return n(t)}},classPrefix:"ui-autocomplete",align:{baseXY:[0,"100%"]},template:d,submitOnEnter:!0,dataSource:[],locator:"data",filter:void 0,inputFilter:function(t){return t},disabled:!1,selectFirst:!1,delay:100,selectedIndex:void 0,inputValue:null,data:null},events:{"mousedown [data-role=item]":function(t){var e=this.items.index(t.currentTarget);this.set("selectedIndex",e),this.selectItem(),this._firstMousedown=!0},mousedown:function(){this._secondMousedown=!0},"mouseenter [data-role=item]":function(t){var e=this.get("classPrefix")+"-item-hover";this.currentItem&&this.currentItem.removeClass(e),n(t.currentTarget).addClass(e)},"mouseleave [data-role=item]":function(t){var e=this.get("classPrefix")+"-item-hover";n(t.currentTarget).removeClass(e)}},templateHelpers:{highlightItem:r},parseElement:function(){this.set("model",{classPrefix:this.get("classPrefix"),items:[]}),g.superclass.parseElement.call(this)},setup:function(){var t=this.get("trigger"),e=this;g.superclass.setup.call(this),this.dataSource=new h({source:this.get("dataSource")}).on("data",this._filterData,this),this._initFilter(),this._blurHide([t]),this._tweakAlignDefaultValue(),t.attr("autocomplete","off"),this.delegateEvents(t,"blur.autocomplete",n.proxy(this._blurEvent,this)),this.delegateEvents(t,"keydown.autocomplete",n.proxy(this._keydownEvent,this)),this.delegateEvents(t,"keyup.autocomplete",function(){clearTimeout(e._timeout),e._timeout=setTimeout(function(){e._timeout=null,e._keyupEvent.call(e)},e.get("delay"))})},destroy:function(){this._clear(),this.element.remove(),g.superclass.destroy.call(this)},hide:function(){this._timeout&&clearTimeout(this._timeout),this.dataSource.abort(),g.superclass.hide.call(this)},selectItem:function(){this.hide();var t=this.currentItem,e=this.get("selectedIndex"),i=this.get("data")[e];if(t){var s=t.attr("data-value");this.get("trigger").val(s),this.set("inputValue",s),this.trigger("itemSelect",i),this._clear()}},setInputValue:function(t){if(this.get("inputValue")!==t){this._start=!0,this.set("inputValue",t);var e=this.get("trigger");e.val()!==t&&e.val(t)}},_onRenderInputValue:function(t){if(this._start&&t){var e=this.queryValue;this.queryValue=this.get("inputFilter").call(this,t),this.queryValue&&this.queryValue!==e&&(this.dataSource.abort(),this.dataSource.getData(this.queryValue))}else this.queryValue="";""!==t&&this.queryValue||(this.set("data",[]),this.hide()),delete this._start},_filterData:function(t){var e=this.get("filter"),i=this.get("locator");t=a(i,t),t=e.func.call(this,t,this.queryValue,e.options),this.set("data",t)},_onRenderData:function(t){this._clear();var e=this.get("model");e.items=t,this.set("model",e),this.renderPartial("[data-role=items]"),this.items=this.$("[data-role=items]").children(),this.currentItem=null,this.get("selectFirst")&&this.set("selectedIndex",0),n.trim(this.$("[data-role=items]").text())?this.show():this.hide()},_onRenderSelectedIndex:function(t){if(-1!==t){var e=this.get("classPrefix")+"-item-hover";this.currentItem&&this.currentItem.removeClass(e),this.currentItem=this.items.eq(t).addClass(e),this.trigger("indexChange",t,this.lastIndex),this.lastIndex=t}},_initFilter:function(){var t=this.get("filter");t=void 0===t?"url"===this.dataSource.get("type")?null:{name:"startsWith",func:c.startsWith,options:{key:"value"}}:n.isPlainObject(t)?c[t.name]?{name:t.name,func:c[t.name],options:t.options}:null:n.isFunction(t)?{func:t}:c[t]?{name:t,func:c[t]}:null,t||(t={name:"default",func:c["default"]}),this.set("filter",t)},_blurEvent:function(){n.browser.msie||(this._secondMousedown?this._firstMousedown&&(this.get("trigger").focus(),this.hide()):this.hide(),delete this._firstMousedown,delete this._secondMousedown)},_keyupEvent:function(){if(!this.get("disabled")&&this._keyupStart){delete this._keyupStart;var t=this.get("trigger").val();this.setInputValue(t)}},_keydownEvent:function(t){if(!this.get("disabled"))switch(delete this._keyupStart,t.which){case f.ESC:this.hide();break;case f.UP:this._keyUp(t);break;case f.DOWN:this._keyDown(t);break;case f.LEFT:case f.RIGHT:break;case f.ENTER:this._keyEnter(t);break;default:this._keyupStart=!0}},_keyUp:function(t){if(t.preventDefault(),this.get("data").length){if(!this.get("visible"))return this.show(),void 0;this._step(-1)}},_keyDown:function(t){if(t.preventDefault(),this.get("data").length){if(!this.get("visible"))return this.show(),void 0;this._step(1)}},_keyEnter:function(t){this.get("visible")&&(this.selectItem(),this.get("submitOnEnter")||t.preventDefault())},_step:function(t){var e=this.get("selectedIndex");-1===t?e>0?this.set("selectedIndex",e-1):this.set("selectedIndex",this.items.length-1):1===t&&(this.items.length-1>e?this.set("selectedIndex",e+1):this.set("selectedIndex",0))},_clear:function(){this.$("[data-role=items]").empty(),this.set("selectedIndex",-1),delete this.items,delete this.lastIndex,delete this.currentItem},_tweakAlignDefaultValue:function(){var t=this.get("align");t.baseElement=this.get("trigger"),this.set("align",t)}});i.exports=g}),define("arale/autocomplete/1.2.1/data-source",["arale/base/1.1.0/base","arale/class/1.0.0/class","arale/events/1.1.0/events","$"],function(t,e,i){function s(t){return"[object String]"===Object.prototype.toString.call(t)}function a(t){return t.replace(/^([a-z])/,function(t,e){return e.toUpperCase()})}var r=t("arale/base/1.1.0/base"),n=t("$"),l=r.extend({attrs:{source:null,type:"array"},initialize:function(t){l.superclass.initialize.call(this,t),this.id=0,this.callbacks=[];var e=this.get("source");if(s(e))this.set("type","url");else if(n.isArray(e))this.set("type","array");else if(n.isPlainObject(e))this.set("type","object");else{if(!n.isFunction(e))throw Error("Source Type Error");this.set("type","function")}},getData:function(t){return this["_get"+a(this.get("type")||"")+"Data"](t)},abort:function(){this.callbacks=[]},_done:function(t){this.trigger("data",t)},_getUrlData:function(t){var e,i=this,s={query:t?encodeURIComponent(t):"",timestamp:(new Date).getTime()},a=this.get("source").replace(/{{(.*?)}}/g,function(t,e){return s[e]}),r="callback_"+this.id++;this.callbacks.push(r),e=/^(https?:\/\/)/.test(a)?{dataType:"jsonp"}:{dataType:"json"},n.ajax(a,e).success(function(t){n.inArray(r,i.callbacks)>-1&&(delete i.callbacks[r],i._done(t))}).error(function(){n.inArray(r,i.callbacks)>-1&&(delete i.callbacks[r],i._done({}))})},_getArrayData:function(){var t=this.get("source");return this._done(t),t},_getObjectData:function(){var t=this.get("source");return this._done(t),t},_getFunctionData:function(t){function e(t){i._done(t)}var i=this,s=this.get("source"),a=s.call(this,t,e);a&&this._done(a)}});i.exports=l}),define("arale/autocomplete/1.2.1/filter",["$"],function(t,e,i){function s(t,e){if(n.isPlainObject(t)){var i=e&&e.key||"value";return t[i]||""}return t}function a(t,e){for(var i=[],s=t.split(""),a=0,r=e.split(""),n=0,l=s.length;l>n;n++){var o=s[n];if(o==r[a]){if(a===r.length-1){i.push([n-r.length+1,n+1]),a=0;continue}a++}else a=0}return i}function r(t){return(t||"").replace(o,"\\$1")}var n=t("$"),l={"default":function(t,e,i){var a=[];return n.each(t,function(t,e){var r={},l=s(e,i);n.isPlainObject(e)&&(r=n.extend({},e)),r.matchKey=l,a.push(r)}),a},startsWith:function(t,e,i){var a=[],l=e.length,o=RegExp("^"+r(e));return l?(n.each(t,function(t,e){var r={},u=s(e,i);n.isPlainObject(e)&&(r=n.extend({},e)),o.test(u)&&(r.matchKey=u,l>0&&(r.highlightIndex=[[0,l]]),a.push(r))}),a):[]},stringMatch:function(t,e,i){e=e||"";var r=[],l=e.length;return l?(n.each(t,function(t,l){var o={},u=s(l,i);n.isPlainObject(l)&&(o=n.extend({},l)),u.indexOf(e)>-1&&(o.matchKey=u,o.highlightIndex=a(u,e),r.push(o))}),r):[]}};i.exports=l;var o=/(\[|\[|\]|\^|\$|\||\(|\)|\{|\}|\+|\*|\?)/g}),define("arale/autocomplete/1.2.1/autocomplete.tpl",[],'<div class="{{classPrefix}}">\n    <ul class="{{classPrefix}}-ctn" data-role="items">\n        {{#each items}}\n            <li data-role="item" class="{{../classPrefix}}-item" data-value="{{matchKey}}">{{highlightItem ../classPrefix matchKey}}</li>\n        {{/each}}\n    </ul>\n</div>\n');
