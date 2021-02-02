import './form-elements.scss'
import 'Components/input/input'
import 'Components/checkbox-button/checkbox-button'
import 'Components/toggle-button/toggle-button'
import 'Components/radio-button/radio-button'
import 'Components/like-button/like-button.scss'
import 'Components/bullet-list/bullet-list'
import 'Components/rich-checkbox/rich-checkbox'
import 'Components/expandable-list/expandable-list.scss'
import 'Components/advantages-list/advantages-list.scss'
import Inputmask from 'inputmask'
import ExpandableList from 'Components/expandable-list/expandable-list'
import LikeButton from 'Components/like-button/like-button'

$(function () {
  Inputmask('99.99.9999').mask('.js-date-field')
  
  const expandableList = new ExpandableList($('.expandable-list'))
  const likeButton = new LikeButton($('.js-like-button'))
})
