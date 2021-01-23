jQuery(function () {
  const $burgers = $('.js-header__menu')

  function hideShowMenu() {
    $(this).toggleClass('fa-bars fa-times')
  }

  $burgers.each(function (i) {
    $(this).on('click', hideShowMenu)
  })
})
