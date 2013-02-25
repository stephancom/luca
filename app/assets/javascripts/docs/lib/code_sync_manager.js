(function(){var codeManager;codeManager=Luca.register("Docs.CodeSyncManager"),codeManager["extends"]("Luca.SocketManager"),codeManager.publicConfiguration({host:Luca.config.codeSyncHost||"//localhost:9292/faye",namespace:"luca",channel:Luca.config.codeSyncChannel||"/luca-code-sync"}),codeManager.classMethods({setup:function(e){return e==null&&(e={}),this.codeSyncManager=new Luca.CodeSyncManager(e),this.codeSyncManager.trigger("ready")}}),codeManager.privateMethods({initialize:function(e){return this.attributes=e!=null?e:{},this.attributes.host==null&&_.extend(this.attributes,{host:this.host||Luca.config.codeSyncHost}),Luca.SocketManager.prototype.initialize.call(this,this.attributes),this.bindToChannel()},start:function(){return this.trigger("ready")},bindToChannel:function(){var e=this;return this.client!=null?this.client.subscribe(this.channel,function(){return e.onChangesNotification.apply(e,arguments)}):this.on("change:client",function(t,n){return e.client.subscribe(e.channel,function(){return e.onChangesNotification.apply(e,arguments)})})},onChangesNotification:function(e,t){var n,r=this;e==null&&(e={});if(_.isEmpty(e))return;n=_(e).values()[0]||{},n.type==="template"&&(this.processTemplate(n),this.rerunSyncPad(n.type)),n.type==="component_definition"&&(this.processComponentDefinitionChange(n),this.processJavascriptChange(n),_.delay(function(){return r.rerunSyncPad(n.type)},25)),n.type==="javascript"&&this.processJavascriptChange(n);if(n.type==="stylesheet"&&(n!=null?n.path:void 0))return this.processStylesheetChange(n)},rerunSyncPad:function(){var e;if(e=this.get("last_syncpad_javascript_payload"))return this.processJavascriptChange(e)},processTemplate:function(change){var fn;return change==null&&(change={}),fn=function(){return eval(change.contents)},fn.apply(window)},processComponentDefinitionChange:function(e){var t;e==null&&(e={});if(_.isEmpty(e))return;this.components||(this.components=Luca.collections.Components.generate());if(e.class_name!=null){t=this.components.findByClassName(e.class_name);if(t&&e.source_file_contents!=null)return t.set({source_file_contents:e.source_file_contents})}},processJavascriptChange:function(e){var t,n,r;e==null&&(e={});if(e!=null?!e.compiled:!void 0)return;return t=$("body script[data-path='"+e.source+"']"),t.length>1&&t.remove(),((r=e.source)!=null?r.match(/syncpad/):void 0)&&(e!=null?e.compiled:void 0)&&!0&&this.set("last_syncpad_javascript_payload",e),n=this.make("script",{"data-path":e.source,type:"text/javascript"},e.compiled),$("body").append(n)},processStylesheetChange:function(e){var t;e==null&&(e={});if(_.isEmpty(e))return;return((t=e.path)!=null?t.match(/syncpad/):void 0)||Luca.config.codeSyncStylesheetMode==="single"?this.syncStylesheet(e):this.replaceStylesheetAndEverythingAfter(e.path)},replaceStylesheetAndEverythingAfter:function(e){var t,n,r,i,s,o;o=e.replace("./app/assets/stylesheets",Luca.config.assetsUrlPrefix),o=o.replace(".scss",""),r=$("link[href*='"+o+"']"),i=r.parent();if(r.length>0)return s=r.clone(),n=r.nextAll("link"),t=n.clone(),$(r,n).remove(),i.append(s),i.append(t);return},syncStylesheet:function(e){var t,n;t=$("head style[data-file='"+e.path+"']"),t.length>0&&t.remove();if(e.compiled!=null||e.contents!=null)return n=this.make("style",{"data-file":e.path,type:"text/css"},e.compiled||e.contents),$("head").append(n)}}),codeManager.defines({make:Luca.View.prototype.make})}).call(this);