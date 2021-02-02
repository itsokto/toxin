export default class ExpandableList {
  constructor(element) {
    this.$element = element
    this.init()
  }

  init() {
    function toggleClass() {
      $(this).toggleClass('expandable-list_active')
    }

    this.$element.on('click', toggleClass)
  }
}
