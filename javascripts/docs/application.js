(function(){var e;e=Docs.register("Docs.Application"),e["extends"]("Luca.Application"),e.configuration({version:1,el:"#viewport",fluid:!0,fullscreen:!0,applyWrapper:!1,name:"DocsApp"}),e.configuration({collectionManager:{initialCollections:["luca_documentation","docs_documentation"]},router:"Docs.Router",routes:{"":"home#index",docs:"browse_source#index","docs/:component_name":"browse_source#show","get-started":"getting_started#index",examples:"examples_browser#index","examples/:example_name/:section":"examples_browser#show","examples/:example_name":"examples_browser#show",component_editor:"component_editor#index"},stateChangeEvents:{page:"onPageChange"}}),e.privateMethods({mainNavElement:function(){return this._mainNavEl||(this._mainNavEl=$("#main-nav ul.nav"))},onPageChange:_.debounce(function(e,t){return $("li",this.mainNavElement()).removeClass("active"),$("li[data-page='"+t+"']",this.mainNavElement()).addClass("active")},10)}),e.contains({component:"home"},{component:"browse_source"},{component:"examples_browser"},{component:"component_editor"},{name:"getting_started",type:"page",layout:"pages/getting_started",index:_.once(function(){return this.$("pre").addClass("prettyprint"),window.prettyPrint()})}),e.register()}).call(this);