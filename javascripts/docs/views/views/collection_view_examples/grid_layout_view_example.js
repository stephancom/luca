(function(){var e;e=Docs.register("Docs.views.GridLayoutViewExample"),e["extends"]("Luca.components.GridLayoutView"),e.publicConfiguration({collection:"github_repositories",itemPerRow:4,paginatable:12,itemTemplate:"github_repository"}),e.publicMethods({runExample:function(){return this.getCollection().fetch()}}),e.register()}).call(this);