(function(){var e;e=Docs.register("Docs.Application"),e["extends"]("Luca.Application"),e.configuration({el:"#viewport",fluid:!0,fullscreen:!0,applyWrapper:!1,name:"DocsApp"}),e.configuration({collectionManager:{initialCollections:["framework_documentation"]},router:"Docs.Router",routes:{"":"home#index",docs:"browse_source#index","docs/:component_name":"browse_source#show","get-started":"getting_started#index",examples:"examples_browser#index"}}),e.contains({component:"home"},{component:"browse_source"},{component:"examples_browser"},{name:"getting_started",type:"page",layout:"pages/getting_started",index:_.once(function(){return this.$("pre").addClass("prettyprint"),window.prettyPrint()})}),e.register()}).call(this);