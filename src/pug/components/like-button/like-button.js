export default class LikeButton {
  constructor(element) {
    this.$element = element

    this.init()
  }

  init() {
    function toggleLike() {
      let likes = parseInt($(this).find('.js-like-button__likes').text(), 10)

      if (!$(this).hasClass('like-button_active')) {
        $(this).find('.js-like-button__like').text('favorite')
        likes += 1
        $(this).find('.js-like-button__likes').text(likes)
      } else {
        $(this).find('.js-like-button__like').text('favorite_border')
        likes -= 1
        $(this).find('.js-like-button__likes').text(likes)
      }
      $(this).toggleClass('like-button_active')
    }

    this.$element.on('click', toggleLike)
  }
}
