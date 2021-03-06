paginationControl = Luca.register   "Luca.components.PaginationControl"

paginationControl.extends           "Luca.View"

paginationControl.defines
  template: "components/pagination"

  stateful: true

  stateChangeEvents:
    "numberOfPages" : "onPageCountChange"

  autoBindEventHandlers: true

  events:
    "click a[data-page-number]" : "selectPage"
    "click a.next"              : "nextPage"
    "click a.prev"              : "previousPage"

  onPageCountChange: ()->
    @updateWithPageCount( @get('numberOfPages') )

  limit: ()->
    parseInt (@get('limit') || @collection?.length)

  page: ()->
    parseInt (@get('page') || 1)

  nextPage: ()->
    return unless @nextEnabled()
    @set('page', @page() + 1 )

  previousPage: ()->
    return unless @previousEnabled()
    @set('page', @page() - 1 )

  selectPage: (e)->
    me = my = @$( e.target )
    me = my = my.closest('a.page') unless me.is('a.page')

    my.siblings().removeClass('is-selected')
    me.addClass('is-selected')

    @setPage( my.data('page-number') )

  setPage: (page=1,options={})->
    @set('page', page, options)

  setLimit: (limit=1,options={})->
    @set('limit', limit, options)

  pageButtonContainer: ()->
    @$ '.group'

  previousEnabled: ()->
    @page() > 1

  nextEnabled: ()->
    @page() < @totalPages()

  previousButton: ()->
    @$ 'a.page.prev'

  nextButton: ()->
    @$ 'a.page.next'

  pageButtons: ()->
    @$ 'a[data-page-number]', @pageButtonContainer()

  updateWithPageCount: (@pageCount, models=[])->
    modelCount = models.length

    @pageButtonContainer().empty()

    _( @pageCount ).times (index)=>
      page = index + 1
      button = @make("a","data-page-number":page, class:"page", page )
      @pageButtonContainer().append(button)

    @toggleNavigationButtons()
    @selectActivePageButton()

    @

  toggleNavigationButtons: ()->
    @$('a.next, a.prev').addClass('disabled')
    @nextButton().removeClass('disabled') if @nextEnabled()
    @previousButton().removeClass('disabled') if @previousEnabled()

  selectActivePageButton: ()->
    @activePageButton().addClass('is-selected')

  activePageButton: ()->
    @pageButtons().filter("[data-page-number='#{ @page() }']")

  totalPages: ()->
    @pageCount

  totalItems: ()->
    parseInt @collection?.length || 0

  itemsPerPage: (value, options={})->
    @set("limit", value, options) if value?
    parseInt @get("limit")
