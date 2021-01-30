import './form-elements.scss'
import 'Components/input/input'
import 'Components/checkbox-button/checkbox-button'
import 'Components/toggle-button/toggle-button'
import 'Components/radio-button/radio-button'
import 'Components/bullet-list/bullet-list'
import 'Components/rich-checkbox/rich-checkbox'

import Inputmask from 'inputmask'

$(function () {
  Inputmask('99.99.9999').mask('.js-date-field')
})
