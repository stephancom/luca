view = Docs.register      "Docs.views.ComponentDocumentation"
view.extends              "Luca.View"

view.privateConfiguration
  bodyTemplate: "component_documentation"

  # If set to true, we will render the source code
  # for the component in addition to all of the information
  # about the methods and properties
  displaySource: false

  # If set to true, we will render the header documentation
  # that is contained in the component
  displayHeader: false

view.publicMethods
  # Loads a component definition from the documentation objects that
  # are generated by the Luca gem's Luca::LucaApplication#export tool.
  # These objects are the result of parsing component definition files
  # and determining the public and private properties and methods, and 
  # the documentation that is rendered from their comments.
  loadComponent: (@component)->
    @reset()

    for section in ["private", "public"]
      @renderMethodGroup(section) 
      @renderPropertyGroup(section) 

    @$('.source').hide()

    if @displayHeader is true
      @$('.header-documentation').show()
      @$('.header-documentation').html( @component.get("header_documentation") )

    if @displaySource is true
      @$('.source').show()
      @$('pre.source').html( @component.contentsWithoutHeader() )      

    @$('pre').addClass('prettyprint')

view.privateMethods
  reset: ()->
    @$('.table tbody').empty()
    @$('.properties,.methods').hide()
    @$('.header-documentation').hide()

  renderMethodGroup: (group="public")->
    source = @component?.documentation()?.details["#{ group }Methods"]
    return if _.isEmpty(source)
    prototype = Luca.util.resolve(@component.get("class_name"))?.prototype  
    list = @$(".methods.#{ group }").show().find('.table tbody')

    for method, details of source when _.isFunction(prototype[method])
      details ||= {}
      arg_details = _( details.arguments ).reduce (memo,pair)->
        memo += "#{ pair.argument }"
        memo += "= #{ pair.value || 'undefined' }" if pair.value?
        memo += "<br/>"
      , ""
      list.append "<tr><td>#{ method }</td><td>#{ arg_details }</td><td>#{ details.documentation || "" }</td></tr>"

  renderPropertyGroup: (group="public")->
    source = @component?.documentation()?.details["#{ group }Properties"]
    return if _.isEmpty(source)
    prototype = Luca.util.resolve(@component.get("class_name"))?.prototype
    list = @$(".properties.#{ group }").show().find('.table tbody')

    for method, details of source when not _.isFunction(prototype[method])
      details ||= {}
      list.append "<tr><td>#{ method }</td><td>#{ details.default || "" }</td><td>#{ details.documentation || "" }</td></tr>"

view.register()
