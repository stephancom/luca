(function(){Luca.initialize("Docs",{baseParams:!1,modelBootstrap:!1,codeSyncChannel:"/luca-code-sync",codeSyncHost:"//localhost:9292/faye",codeSyncStylesheetMode:"single"})}).call(this),function(){var codeManager;codeManager=Luca.register("Docs.CodeSyncManager"),codeManager["extends"]("Luca.SocketManager"),codeManager.publicConfiguration({host:Luca.config.codeSyncHost||"//localhost:9292/faye",namespace:"luca",channel:Luca.config.codeSyncChannel||"/luca-code-sync"}),codeManager.classMethods({setup:function(e){return e==null&&(e={}),this.codeSyncManager=new Luca.CodeSyncManager(e),this.codeSyncManager.trigger("ready")}}),codeManager.privateMethods({initialize:function(e){return this.attributes=e!=null?e:{},this.attributes.host==null&&_.extend(this.attributes,{host:this.host||Luca.config.codeSyncHost}),Luca.SocketManager.prototype.initialize.call(this,this.attributes),this.bindToChannel()},start:function(){return this.trigger("ready")},bindToChannel:function(){var e=this;return this.client!=null?this.client.subscribe(this.channel,function(){return e.onChangesNotification.apply(e,arguments)}):this.on("change:client",function(t,n){return e.client.subscribe(e.channel,function(){return e.onChangesNotification.apply(e,arguments)})})},onChangesNotification:function(e,t){var n,r=this;e==null&&(e={});if(_.isEmpty(e))return;n=_(e).values()[0]||{},n.type==="template"&&(this.processTemplate(n),this.rerunSyncPad(n.type)),n.type==="component_definition"&&(this.processComponentDefinitionChange(n),this.processJavascriptChange(n),_.delay(function(){return r.rerunSyncPad(n.type)},25)),n.type==="javascript"&&this.processJavascriptChange(n);if(n.type==="stylesheet"&&(n!=null?n.path:void 0))return this.processStylesheetChange(n)},rerunSyncPad:function(){var e;if(e=this.get("last_syncpad_javascript_payload"))return this.processJavascriptChange(e)},processTemplate:function(change){var fn;return change==null&&(change={}),fn=function(){return eval(change.contents)},fn.apply(window)},processComponentDefinitionChange:function(e){var t;e==null&&(e={});if(_.isEmpty(e))return;this.components||(this.components=Luca.collections.Components.generate());if(e.class_name!=null){t=this.components.findByClassName(e.class_name);if(t&&e.source_file_contents!=null)return t.set({source_file_contents:e.source_file_contents})}},processJavascriptChange:function(e){var t,n,r;e==null&&(e={});if(e!=null?!e.compiled:!void 0)return;return t=$("body script[data-path='"+e.source+"']"),t.length>1&&t.remove(),((r=e.source)!=null?r.match(/syncpad/):void 0)&&(e!=null?e.compiled:void 0)&&!0&&this.set("last_syncpad_javascript_payload",e),n=this.make("script",{"data-path":e.source,type:"text/javascript"},e.compiled),$("body").append(n)},processStylesheetChange:function(e){var t;e==null&&(e={});if(_.isEmpty(e))return;return((t=e.path)!=null?t.match(/syncpad/):void 0)||Luca.config.codeSyncStylesheetMode==="single"?this.syncStylesheet(e):this.replaceStylesheetAndEverythingAfter(e.path)},replaceStylesheetAndEverythingAfter:function(e){var t,n,r,i,s,o;o=e.replace("./app/assets/stylesheets",Luca.config.assetsUrlPrefix),o=o.replace(".scss",""),r=$("link[href*='"+o+"']"),i=r.parent();if(r.length>0)return s=r.clone(),n=r.nextAll("link"),t=n.clone(),$(r,n).remove(),i.append(s),i.append(t);return},syncStylesheet:function(e){var t,n;t=$("head style[data-file='"+e.path+"']"),t.length>0&&t.remove();if(e.compiled!=null||e.contents!=null)return n=this.make("style",{"data-file":e.path,type:"text/css"},e.compiled||e.contents),$("head").append(n)}}),codeManager.defines({make:Luca.View.prototype.make})}.call(this),function(){var e;e=Docs.register("Docs.Router"),e["extends"]("Luca.Router"),e.defines()}.call(this),function(){}.call(this),function(){this.JST||(this.JST={}),this.JST["docs/templates/component_documentation"]=function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments)};with(obj||{})__p.push('<div class="component-documentation-wrapper">\n  <div class="header-documentation"></div>\n  <div class="public properties">\n    <h4>Public Configuration</h4>\n    <table class="table table-condensed table-striped">\n      <thead>\n        <th width="15%">Property</th>\n        <th width="15%">Defaults</th>\n        <th width="70%">Documentation</th>\n      </thead>\n      <tbody>\n      </tbody>\n    </table>    \n  </div>\n  <div class="public methods">\n    <h4>Public Methods</h4>\n    <table class="table table-condensed table-striped">\n      <thead>\n        <th width="15%">Method</th>\n        <th width="15%">Args</th>\n        <th width="70%">Documentation</th>\n      </thead>\n      <tbody>\n      </tbody>\n    </table>\n  </div>  \n\n  <div class="private properties">\n    <h4>Private Configuration</h4>\n    <table class="table table-condensed table-striped">\n      <thead>\n        <th width="15%">Property</th>\n        <th width="15%">Defaults</th>\n        <th width="70%">Documentation</th>\n      </thead>\n      <tbody>\n      </tbody>\n    </table>    \n  </div>\n  <div class="private methods">\n    <h4>Private Methods</h4>\n    <table class="table table-condensed table-striped">\n      <thead>\n        <th width="15%">Method</th>\n        <th width="15%">Args</th>\n        <th width="70%">Documentation</th>\n      </thead>\n      <tbody>\n      </tbody>\n    </table>\n  </div>  \n\n  <h4 class="source">Source</h4>\n  <pre class="source pre-scrollable prettyprint"></pre>\n</div>\n');return __p.join("")}}.call(this),function(){this.JST||(this.JST={}),this.JST["docs/templates/component_editor/navigation"]=function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments)};with(obj||{})__p.push('<ul class="nav nav-pills inline">\n  <li>\n    <a class="link">Component Editor</a>\n  </li>\n  <li>\n    <a class="link">Stylesheets</a>\n  </li>\n  <li>\n    <a class="link">Setup</a>\n  </li>\n</ul>\n');return __p.join("")}}.call(this),function(){this.JST||(this.JST={}),this.JST["docs/templates/examples_browser/overview"]=function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments)};with(obj||{})__p.push('<h3>Luca Component Examples</h3>\n<p>Here is a collection of components developed using the Luca framework.  They make use of the Github API as their data source, and show off some of the neat things you can do with the components you develop.</p>\n<p>For each example, you can see the component in action as it is used, view the source code for the component, and see the documentation that gets generated from your component definition files.</p>\n<p>The first example is the <a href="#examples/api_browser">API Browser</a> which is a simple component that allows you to view the formatted JSON output from an API endpoint that you enter. Use the tabs to the left to browse through the examples.</p>\n');return __p.join("")}}.call(this),function(){this.JST||(this.JST={}),this.JST["docs/templates/examples_browser/selector"]=function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments)};with(obj||{})__p.push('<ul class="panel-selector nav nav-pills">\n  <li class="active component">\n    <a class="link" data-index=0 data-navigate-to="#examples/',example_name,'/component">Component</a>\n  </li>\n  <li class="source">\n    <a class="link" data-index=1 data-navigate-to="#examples/',example_name,'/source">Source</a>\n  </li>\n  <li class="documentation">\n    <a class="link" data-index=2 data-navigate-to="#examples/',example_name,'/documentation">Documentation</a>\n  </li>\n</ul>\n');return __p.join("")}}.call(this),function(){this.JST||(this.JST={}),this.JST["docs/templates/github_repository"]=function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments)};with(obj||{})__p.push('<div class="github-repository">\n  <i class="icon icon-github" />\n  <span class="name">',model.get("name"),"</span>\n</div>\n");return __p.join("")}}.call(this),function(){this.JST||(this.JST={}),this.JST["docs/templates/layouts/main"]=function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments)};with(obj||{})__p.push('<div class="row-fluid">\n  <div class="span3" data-region="left"></div>\n  <div class="span9" data-region="right"></div>\n</div>\n');return __p.join("")}}.call(this),function(){this.JST||(this.JST={}),this.JST["docs/templates/left_navigation"]=function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments)};with(obj||{})__p.push('<ul class="nav nav-pills stacked">\n  <li>\n    <a href="#">What</a>\n  </li>\n</ul>\n');return __p.join("")}}.call(this),function(){this.JST||(this.JST={}),this.JST["docs/templates/pages/getting_started"]=function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments)};with(obj||{})__p.push('<h2>1.) Include the libraries</h2>\n<h4>Download the files and serve them yourself:</h4>\n<a href="//datapimp.github.com/luca/downloads/luca-latest.zip">Zip (96k)</a>\n<p>The depencies file includes underscore 1.4.4, backbone 0.9.9, jquery 1.9, underscore.string, and backbone-query.  You will need to bring your own bootstrap.</p>\n\n<h4>Include the files from the CDN</h4>\n\n<pre><code>&lt;html&gt;\n  &lt;head&gt;\n    ...\n    &lt;link rel="stylesheet" href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/css/bootstrap-combined.min.css" /&gt;\n    &lt;link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css" /&gt;\n    &lt;link rel="stylesheet" href="//datapimp.github.com/luca/vendor/assets/stylesheets/luca-ui.css" /&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    ...\n    &lt;script type="text/javascript" src="//datapimp.github.com/luca/vendor/assets/javascripts/luca-dependencies.min.js"&gt;&lt;/script&gt;\n    &lt;script type="text/javascript" src="//datapimp.github.com/luca/vendor/assets/javascripts/luca.min.js"&gt;&lt;/script&gt;\n  &lt;/body&gt;\n&lt;/html&gt;\n</code></pre>\n\n<h4>Use the Ruby gem in your Rails app</h4>\n\n<pre><code># Gemfile.lock\ngem \'luca\'\ngem \'bootstrap-rails\'\n</code></pre>\n\n<p>Including the luca gem makes everything available via the asset pipeline. </p>\n\n<pre><code># application.coffee\n#= require luca-dependencies.min\n#= require luca.min\n</code></pre>\n\n<p>We depend on the bootstrap css externally.</p>\n\n<pre><code>/*\n *= require twitter/bootstrap\n *= require luca-ui.css\n */\n</code></pre>\n\n<h2>2.) Generate your application</h2>\n\n<p>The luca gem ships with a rails generator to generate an application skeleton.  You can run it:\n    rails g luca:application sample    </p>\n\n<p>Doing this will generate an application skeleton for you:</p>\n\n<pre><code>- app/assets/javascripts/sample\n  - collections\n  - lib\n    - collection_manager.coffee\n    - router.coffee\n  - models\n  - views\n  - application.coffee\n  - config.coffee\n  - index.coffee\n</code></pre>\n\n<h2>3.) Start developing</h2>\n\n<p>The style we use to develop Luca applications is to develop all of our components and views as encpasulated modules.  We start with the smallest units, and then build them up into components using containers, and then build them into pages which are controlled by the main Application. </p>\n<ul class="nav">\n  <li>\n    <a href="#samples">View some examples</a>\n  </li>\n  <li>\n    <a href="#tutorials">Follow some tutorials</a>\n  </li>\n  <li>\n    <a href="#docs">Read the auto-generated documentation</a>\n  </li>\n</ul>\n</ul>\n');return __p.join("")}}.call(this),function(){this.JST||(this.JST={}),this.JST["docs/templates/pages/home"]=function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments)};with(obj||{})__p.push('<div class="hero-unit">\n  <h1>Luca</h1>\n  <p>A framework and tools for building well architected client side applications.</p>\n  <p>Based on <a href="http://backbonejs.org">Backbone.js</a> and <a href="http://twitter.github.com/bootstrap">Twitter Bootstrap</a>.</p>\n  <a class="btn btn-large btn-primary" href="//datapimp.gitub.com/luca/downloads/luca-latest.zip">Download</a>\n\n  <ul class="links">\n    <li>\n      <i class="icon icon-github" />\n      <a href="https://github.com/datapimp/luca">Github Project</a>\n    </li>\n    <li>\n      <a href="#examples">Examples</a>\n    </li>\n    <li>\n      <a href="#contribute">Contribute</a>\n    </li>\n    <li>\n      Version ',Luca.VERSION,'\n    </li>\n  </ul>\n\n</div>\n\n<div id="features" class="row-fluid">\n  <div class="span4">\n    <h3><i class="icon icon-coffee" /> Coffeescript, player.</h3>\n    <p>\n      Luca allows you to write most of your app in Coffeescript.  Most of the structural markup is taken care of for you, and Bootstrap handles a lot of CSS styling for you already. We find that this allows us to develop apps and focus primarily on their functionality and interaction first.  \n    </p>\n\n    <p>This also makes it very easy to render your app on the client and on the server.</p> \n  </div>\n  <div class="span4">\n    <h3><i class="icon icon-sitemap" /> Component Driven Design</h3>\n    <p>Luca encourages you to design your app as a library of components: re-usable, well encapsulated interface elements with their own concerns.  Luca provides ways of joining components together to form more complex pieces which get integrated into the pages of your application.</p> \n    <p>As your app grows to a certain level, you will find that you have built up a large library of patterns and tools that you can begin to develop new features very quickly without having to solve the same design problems over and over.</p>\n  </div>\n  <div class="span4">\n    <h3><i class="icon icon-wrench" /> Developer Tools</h3>\n    <p>Luca comes with a variety of tools that make developing large browser applications much easier. </p>\n    <ul class="nav">\n      <li><a href="#">Code Sync</a></li>\n      <li><a href="#">Generated Documentation</a></li>\n      <li><a href="#">In browser prototype</a></li>\n    </ul> \n  </div>\n</div>\n\n<div>\n  A labor of love by <a href="http://twitter.com/soederpop">@soederpop</a> for my son and my comrades at <a href="https://benchprep.com">@benchprep</a>. MIT Licensed.\n</div>\n\n<div>\n  <a href="https://github.com/datapimp/luca/issues">Issues</a>\n  <a href="https://github.com/datapimp/luca/blob/master/CHANGELOG">Changelog</a>\n</div>\n');return __p.join("")}}.call(this),function(){var e,t=[].slice;e=Docs.register("Docs.models.Component"),e["extends"]("Luca.Model"),e.configuration({defaults:{class_name:void 0,superClass:void 0,asset_id:void 0,source_file_contents:"",defined_in_file:""}}),e.defines({idAttribute:"class_name",contentsWithoutHeader:function(){var e,t,n;return n=this.get("starts_on_line")||0,e=this.get("source_file_contents").split("\n"),t=e.length,n>0&&(n-=1),e.slice(n,t).join("\n")},documentation:function(){var e;return e=_(this.toJSON()).pick("header_documentation","class_name","defined_in_file"),_.extend(e,this.metaData(),{componentGroup:this.componentGroup(),componentType:this.componentType(),componentTypeAlias:this.componentTypeAlias(),details:{publicMethods:this.methodDocumentationFor("publicMethods"),privateMethods:this.methodDocumentationFor("privateMethods"),privateProperties:this.propertyDocumentationFor("privateProperties","privateConfiguration"),publicProperties:this.propertyDocumentationFor("publicProperties","publicConfiguration")}})},methodDocumentationFor:function(){var e,n,r,i,s,o,u,a;r=1<=arguments.length?t.call(arguments,0):[],e=_.extend({},this.get("defines_methods")),s={};for(o=0,u=r.length;o<u;o++)n=r[o],(i=(a=this.metaData())!=null?typeof a[n]=="function"?a[n]():void 0:void 0)&&_.extend(s,_(i).reduce(function(t,n){return t[n]=e[n],t},{}));return s},propertyDocumentationFor:function(){var e,n,r,i,s,o,u,a;r=1<=arguments.length?t.call(arguments,0):[],e=_.extend({},this.get("defines_properties")),s={};for(o=0,u=r.length;o<u;o++)n=r[o],(i=(a=this.metaData())!=null?typeof a[n]=="function"?a[n]():void 0:void 0)&&_.extend(s,_(i).reduce(function(t,n){return t[n]=e[n],t},{}));return s},url:function(){return"/project/components/"+Luca.namespace+"/"+this.classNameId()},metaData:function(){var e;return(e=Luca.util.resolve(this.get("class_name")))!=null?e.prototype.componentMetaData():void 0},classNameId:function(){return this.get("class_name").replace(/\./g,"__")},componentGroup:function(){var e;return e=this.get("class_name").split("."),e.slice(0,2).join(".")},componentType:function(){var e,t,n,r;r="view",n=this.get("class_name").split(".");switch(t=n[1]){case"collections":"collection";break;case"models":"model";break;case"views":"view"}if(t!=null)return;if(e=Luca.util.resolve(this.get("class_name"))){if(Luca.isViewPrototype(e.prototype))return"view";if(Luca.isCollectionPrototype(e.prototype))return"collection";if(Luca.isModelProtoype(e.prototype))return"model"}return"view"},componentTypeAlias:function(){var e,t;return t=this.get("class_name").split("."),e=t.pop(),_.str.underscored(e)}})}.call(this),function(){var e;e=Docs.register("Docs.models.GithubRepository"),e["extends"]("Luca.Model"),e.register()}.call(this),function(){}.call(this),function(){var e;e=Docs.register("Docs.collections.DocsDocumentation"),e["extends"]("Luca.Collection"),e.defines({model:Docs.models.Component,appNamespace:"Docs",getSource:function(){return Luca.util.resolve(""+this.appNamespace+".documentation")},fetch:function(){var e,t,n;return n=_(this.getSource()).sortBy("class_name"),e={},n=function(){var r,i,s;s=[];for(r=0,i=n.length;r<i;r++){t=n[r];if(!!e[t.class_name])continue;e[t.class_name]=!0,s.push(t)}return s}(),this.reset(n)}})}.call(this),function(){var e;e=Docs.register("Docs.collections.GithubRepositories"),e["extends"]("Luca.Collection"),e.defines({model:Docs.models.GithubRepository,url:function(){return"https://api.github.com/users/datapimp/repos"}})}.call(this),function(){var e;e=Docs.register("Docs.collections.LucaDocumentation"),e["extends"]("Luca.Collection"),e.defines({model:Docs.models.Component,appNamespace:"Luca",getSource:function(){return Luca.util.resolve(""+this.appNamespace+".documentation")},fetch:function(){var e,t,n;return n=_(this.getSource()).sortBy("class_name"),e={},n=function(){var r,i,s;s=[];for(r=0,i=n.length;r<i;r++){t=n[r];if(!!e[t.class_name])continue;e[t.class_name]=!0,s.push(t)}return s}(),this.reset(n)}})}.call(this),function(){var e;e=Docs.register("Docs.collections.PublicGists"),e["extends"]("Luca.Collection"),e.defines({fetch:Backbone.Collection.prototype.fetch})}.call(this),function(){}.call(this),function(){var e;e=Luca.register("Docs.views.CodeEditor"),e["extends"]("Luca.View"),e.publicMethods({getValue:function(){},getCompiledValue:function(){}}),e.publicConfiguration({theme:"twilight",indentUnit:2,smartIndent:!0,mode:"coffeescript",keyMap:"default",lineWrapping:!1,lineNumbers:!0}),e.privateConfiguration({changeThrottle:250,bindMethods:["onEditorChange"],codeMirrorOptions:{},codeMirrorConfigKeys:["theme","indentUnit","smartIndent","mode","keyMap","lineWrapping"]}),e.privateMethods({onEditorChange:function(){},afterRender:function(){var e,t,n,r;return this.$el.append("<div class'editor-toolbar'>"+this.name+"</div>"),this.$el.append("<div class'editor-el' />"),e=(r=_(this)).pick.apply(r,this.codeMirrorConfigKeys),t=_(this.codeMirrorOptions).defaults(e),n=this.$("div").eq(1)[0],this.codeMirror=window.CodeMirror(n,t),this.codeMirror.on("change",_.debounce(this.onEditorChange,this.changeThrottle))}}),e.register()}.call(this),function(){}.call(this),function(){var e;e=Docs.register("Docs.views.ComponentDocumentation"),e["extends"]("Luca.View"),e.privateConfiguration({bodyTemplate:"component_documentation",displaySource:!1,displayHeader:!1}),e.publicMethods({loadComponent:function(e){var t,n,r,i;this.component=e,this.reset(),i=["private","public"];for(n=0,r=i.length;n<r;n++)t=i[n],this.renderMethodGroup(t),this.renderPropertyGroup(t);return this.$(".source").hide(),this.displayHeader===!0&&(this.$(".header-documentation").show(),this.$(".header-documentation").html(this.component.get("header_documentation"))),this.displaySource===!0&&(this.$(".source").show(),this.$("pre.source").html(this.component.contentsWithoutHeader())),this.$("pre").addClass("prettyprint")}}),e.privateMethods({reset:function(){return this.$(".table tbody").empty(),this.$(".properties,.methods").hide(),this.$(".header-documentation").hide()},renderMethodGroup:function(e){var t,n,r,i,s,o,u,a,f,l;e==null&&(e="public"),o=(u=this.component)!=null?(a=u.documentation())!=null?a.details[""+e+"Methods"]:void 0:void 0;if(_.isEmpty(o))return;s=(f=Luca.util.resolve(this.component.get("class_name")))!=null?f.prototype:void 0,r=this.$(".methods."+e).show().find(".table tbody"),l=[];for(i in o){n=o[i];if(!_.isFunction(s[i]))continue;n||(n={}),t=_(n.arguments).reduce(function(e,t){return e+=""+t.argument,t.value!=null&&(e+="= "+(t.value||"undefined")),e+="<br/>"},""),l.push(r.append("<tr><td>"+i+"</td><td>"+t+"</td><td>"+(n.documentation||"")+"</td></tr>"))}return l},renderPropertyGroup:function(e){var t,n,r,i,s,o,u,a,f;e==null&&(e="public"),s=(o=this.component)!=null?(u=o.documentation())!=null?u.details[""+e+"Properties"]:void 0:void 0;if(_.isEmpty(s))return;i=(a=Luca.util.resolve(this.component.get("class_name")))!=null?a.prototype:void 0,n=this.$(".properties."+e).show().find(".table tbody"),f=[];for(r in s){t=s[r];if(!!_.isFunction(i[r]))continue;t||(t={}),f.push(n.append("<tr><td>"+r+"</td><td>"+(t["default"]||"")+"</td><td>"+(t.documentation||"")+"</td></tr>"))}return f}}),e.register()}.call(this),function(){var e;e=Docs.register("Docs.components.ApiBrowser"),e["extends"]("Luca.Container"),e.configuration({componentEvents:{"* button:click":"loadUrl"}}),e.contains({type:"container",rowFluid:!0,className:"url-selector",components:[{type:"text_field",name:"endpoint_url",label:"Enter a URL",span:9},{type:"button_field",input_value:"Browse",span:3}]},{tagName:"pre",className:"prettyprint pre-scrollable",role:"output",afterInitialize:function(){return this.$el.html("Loading...")}}),e.privateMethods({runExample:function(){return this.findComponentByName("endpoint_url",!0).setValue("https://api.github.com/users/datapimp/gists"),this.loadUrl()},loadUrl:function(){var e,t=this;return e=this.findComponentByName("endpoint_url",!0).getValue(),$.get(e,function(e,n,r){return t.getOutput().$html(r.responseText),window.prettyPrint()})}}),e.register()}.call(this),function(){var e;e=Docs.register("Docs.views.GridLayoutViewExample"),e["extends"]("Luca.components.GridLayoutView"),e.publicConfiguration({collection:"github_repositories",itemPerRow:4,paginatable:12,itemTemplate:"github_repository"}),e.publicMethods({runExample:function(){return this.getCollection().fetch()}}),e.register()}.call(this),function(){var e;e=Docs.register("Docs.views.TableViewExample"),e["extends"]("Luca.components.ScrollableTable"),e.publicConfiguration({paginatable:100,maxHeight:300,collection:"github_repositories",columns:[{reader:"name",renderer:function(e,t){return"<a href="+t.get("html_url")+">"+e+"</a>"}},{reader:"description"},{reader:"language"},{reader:"watchers"}]}),e.publicMethods({runExample:function(){return this.getCollection().fetch()}}),e.register()}.call(this),function(){var e;e=Docs.register("Docs.views.BasicFormView"),e["extends"]("Luca.components.FormView"),e.privateConfiguration({defaults:{type:"text"}}),e.publicConfiguration({components:[{label:"Text Field One"},{type:"select",label:"Select Field One",collection:{data:[["Alpha","Alpha"],["Bravo","Bravo"],["Charlie","Charlie"],["Delta","Delta"]]}},{type:"checkbox_field",label:"Checkbox Field"}]}),e.register()}.call(this),function(){var e;e=Docs.register("Docs.views.ComplexLayoutForm"),e["extends"]("Luca.components.FormView"),e.privateConfiguration({rowFluid:!0,componentEvents:{"group_selector on:change":"selectGroup"}}),e.privateMethods({selectGroup:function(){var e,t;return e=this.getGroupSelector().getValue(),t=this.getGroupDisplaySelector(),t.activate(e)}}),e.contains({type:"container",span:6,components:[{type:"text",label:"Field One"},{type:"text",label:"Field Two"},{type:"text",label:"Field Three"}]},{type:"container",span:6,components:[{label:"Select a Group",type:"select",role:"group_selector",includeBlank:!1,valueType:"string",collection:{data:[["alpha","Alpha Group"],["bravo","Bravo Group"],["charlie","Charlie Group"]]}},{type:"card",role:"group_display_selector",components:[{name:"alpha",defaults:{type:"text"},components:[{type:"view",tagName:"h4",bodyTemplate:function(){return"Group One"}},{label:"Alpha"},{label:"Bravo"},{label:"Charlie"}]},{name:"bravo",defaults:{type:"checkbox_field"},components:[{type:"view",tagName:"h4",bodyTemplate:function(){return"Group Two"}},{label:"One"},{label:"Two"}]},{name:"charlie",defaults:{type:"button_field"},components:[{type:"view",tagName:"h4",bodyTemplate:function(){return"Group Three"}},{input_value:"Button One",icon_class:"chevron-up"},{input_value:"Button Two",icon_class:"pencil"}]}]}]})}.call(this),function(){var e;e=Docs.register("Docs.views.TopNavigation"),e["extends"]("Luca.components.NavBar"),e.defines({brand:"Luca.js",inverse:!0,orientation:"top"})}.call(this),function(){var e;e=Docs.register("Docs.views.ComponentDetails"),e["extends"]("Luca.Container"),e.configuration({rowFluid:!0}),e.contains({role:"documentation",span:5,loadComponent:function(e){return this.$el.empty(),this.$el.append("<h2>"+e.get("class_name")+"</h2>"),this.$el.append("<div class='header-documentation'>"+e.get("header_documentation")+"</div>")}},{type:"component_documentation",role:"details",displaySource:!0,span:7}),e.defines({afterRender:function(){return this.getDetails().$el.hide(),this.getDocumentation().$el.hide()},load:function(e){return this.getDetails().$el.show(),this.getDocumentation().$el.show(),this.getDetails().loadComponent(e),this.getDocumentation().loadComponent(e),this.prettyPrint()},prettyPrint:function(){return this.$("pre").addClass("prettyprint"),typeof window.prettyPrint=="function"?window.prettyPrint():void 0}})}.call(this),function(){var e;e=Docs.register("Docs.views.ComponentList"),e["extends"]("Luca.components.ScrollableTable"),e.defines({paginatable:!1,maxHeight:200,collection:"luca_documentation",columns:[{reader:"class_name",width:"20%",renderer:function(e){return"<a class='link'>"+e+"</a>"}},{reader:"class_name",header:"Extends From",width:"20%",renderer:function(e){var t,n,r;if(t=Luca.util.resolve(e))return n=(r=t.prototype.componentMetaData())!=null?r.meta["super class name"]:void 0,"<a class='link'>"+n+"</a>"}},{reader:"type_alias",header:"Shortcut",width:"10%"},{reader:"defined_in_file",header:"<i class='icon icon-github'/> Github",renderer:function(e){var t;return t=e.split("javascripts/luca/")[1],"<a href='https://github.com/datapimp/luca/blob/master/app/assets/javascripts/luca/"+t+"'>"+t+"</a>"}}]})}.call(this),function(){var e;e=Docs.register("Docs.views.BrowseSource"),e["extends"]("Luca.Container"),e.configuration({autoBindEventHandlers:!0,events:{"click .docs-component-list a.link":"selectComponent"}}),e.contains({component:"component_list"},{component:"component_details"}),e.privateMethods({index:function(){return this.selectComponent(this.getComponentList().getCollection().at(0))},show:function(e){var t;return t=this.getComponentList().getCollection().detect(function(t){return t.get("class_name")===e}),t==null?this.index():this.selectComponent(t)},selectComponent:function(e){var t,n,r,i,s,o;return i=this.getComponentList(),n=this.getComponentDetails(),Luca.isBackboneModel(e)?(s=e,r=i.getCollection().indexOf(s),o=i.$("tr[data-index='"+r+"']")):(t=this.$(e.target),o=t.parents("tr").eq(0),r=o.data("index"),s=i.getCollection().at(r)),i.$("tr").removeClass("info"),o.addClass("info"),n.load(s)}})}.call(this),function(){var e;e=Docs.register("Docs.views.ComponentEditor"),e["extends"]("Luca.Container"),e.privateConfiguration({rowFluid:!0}),e.contains({span:4,name:"templates",type:"code_editor"},{span:4,name:"styles",type:"code_editor"},{span:4,name:"coffeescripts",type:"code_editor"}),e.defines({index:function(){return 1}})}.call(this),function(){var e;e=Docs.register("Docs.views.ExampleDocs"),e["extends"]("Docs.views.ComponentDocumentation"),e.defines({collection:"docs_documentation",displayHeader:!0,beforeRender:function(){var e,t=this;e=this.collection.detect(function(e){return e.get("type_alias")===t.example});if(e!=null)return this.loadComponent(e)}})}.call(this),function(){var e;e=Docs.register("Docs.views.ExampleSource"),e["extends"]("Luca.View"),e.defines({tagName:"pre",className:"prettyprint pre-scrollable",collection:"docs_documentation",beforeRender:function(){var e,t=this;return e=this.collection.detect(function(e){return e.get("type_alias")===t.example}),this.$el.html(e.get("source_file_contents")),window.prettyPrint()}})}.call(this),function(){var e;e=Docs.register("Docs.views.ExamplesBrowser"),e["extends"]("Luca.containers.TabView"),e.contains({title:"API Browser",type:"api_browser",name:"api_browser"},{title:"Basic FormView",type:"basic_form_view",name:"basic_form_view"},{title:"Complex Layout FormView",type:"complex_layout_form",name:"complex_layout_form"},{title:"Scrollable Table",type:"table_view_example",name:"table_view_example"},{title:"Grid Layout CollectionView",type:"grid_layout_view_example",name:"grid_layout_view_example"}),e.privateConfiguration({activeCard:0,tab_position:"left",defaults:{activation:function(){return Docs().router.navigate("#examples/"+this.name+"/component",!1)}}}),e.privateMethods({afterSelect:_.debounce(function(){var e,t;if(e=this.activeComponent())return typeof e.findComponentByName=="function"?(t=e.findComponentByName("component"))!=null?typeof t.runExample=="function"?t.runExample():void 0:void 0:void 0},10),wrapExampleComponents:function(){var e;return e=[],e=_(this.components).map(function(e,t){return{title:e.title,name:e.name,autoBindEventHandlers:!0,events:{"click a.link[data-navigate-to]":"selectPanel"},selectPanel:function(e){var n,r;return n=this.$(e.target),r=n.data("navigate-to"),t=n.data("index"),this.$(".panel-selector li").removeClass("active"),n.parent("li").addClass("active"),this.getViewSelector().activate(t),Docs().router.navigate(r,!1)},components:[{type:"card",role:"view_selector",afterInitialize:function(){return this.$el.append("<h3>"+e.title+" Example</h3>")},components:[{type:e.type,name:"component",activation:function(){return typeof this.runExample=="function"?this.runExample():void 0}},{type:"example_source",example:e.name,name:"source"},{type:"example_docs",example:e.name,name:"documentation"}]},{bodyTemplate:"examples_browser/selector",bodyTemplateVars:function(){return{example_name:e.name}}}]}}),this.components=e,this.components.unshift({title:"Overview",bodyTemplate:"examples_browser/overview"})},afterInitialize:function(){return this.wrapExampleComponents()}}),e.publicMethods({show:function(e,t){return e==null&&(e=0),t==null&&(t="component"),this.activate(e,!1,function(){return this.getViewSelector().activate(t),this.$("li").removeClass("active"),this.$("li."+t).addClass("active")})},index:function(){return this.show()}}),e.register()}.call(this),function(){var e;e=Docs.register("Docs.views.Home"),e["extends"]("Luca.components.Page"),e.configuration({template:"pages/home"}),e.defines({index:function(){return this.trigger("index")}}),e.register()}.call(this),function(){}.call(this),function(){var e;e=Docs.register("Docs.Application"),e["extends"]("Luca.Application"),e.configuration({version:1,el:"#viewport",fluid:!0,fullscreen:!0,applyWrapper:!1,name:"DocsApp"}),e.configuration({collectionManager:{initialCollections:["luca_documentation","docs_documentation"]},router:"Docs.Router",routes:{"":"home#index",docs:"browse_source#index","docs/:component_name":"browse_source#show","get-started":"getting_started#index",examples:"examples_browser#index","examples/:example_name/:section":"examples_browser#show","examples/:example_name":"examples_browser#show",component_editor:"component_editor#index"},stateChangeEvents:{page:"onPageChange"}}),e.privateMethods({mainNavElement:function(){return this._mainNavEl||(this._mainNavEl=$("#main-nav ul.nav"))},afterRender:function(){var e;(e=Luca.Application.prototype.afterRender)!=null&&e.apply(this,arguments);if(window.location.host.match(/localhost/))return this.codeSync=new Docs.CodeSyncManager({},{host:"//localhost:9295/faye",channel:"/luca-code-sync"}),this.codeSync.trigger("ready")},_onPageChange:_.debounce(function(e,t){return $("li",this.mainNavElement()).removeClass("active"),$("li[data-page='"+t+"']",this.mainNavElement()).addClass("active")},10)}),e.contains({component:"home"},{component:"browse_source"},{component:"examples_browser"},{component:"component_editor"},{name:"getting_started",type:"page",layout:"pages/getting_started",index:_.once(function(){return this.$("pre").addClass("prettyprint"),window.prettyPrint()})}),e.register()}.call(this),function(
){Docs.onReady(function(){var e;return e=new Docs.Application,e.boot()})}.call(this);