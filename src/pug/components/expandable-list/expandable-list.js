export default class ExpandableList {
  constructor(element) {
    this.element = element
    this.init()
  }

  init() {
    this.element.each(function () {
      const title = $(this).find('.js-expandable-list__title-container')
      const dropdownMenu = $(this).find('.js-expandable-list__dropdown')

      function toggleClass() {
        $(title).toggleClass('expandable-list__title-container_active')
        $(dropdownMenu).toggleClass('expandable-list__dropdown_active')
      }

      title.on('click', toggleClass)
    })
  }
}
