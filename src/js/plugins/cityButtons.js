import $ from 'jquery';
import { onLoadHtmlSuccess } from '../core/includes';

const duration = 600;

function filterByCity(city) {
  $('[js-city]').each(function (id, el) {
    const isTarget = $(this).attr('js-city') === city || city === null
    if (isTarget) {
      $(this).parent().removeClass('d-none')
      $(this).fadeIn(duration)
    } else {
      $(this).fadeOut(duration, () => {
        $(this).parent().addClass('d-none')
      })
    }
  })
}

$.fn.cityButtons = function () {
  const cities = new Set
  $('[js-city]').each(function (id, el) {
    cities.add($(el).attr('js-city'))
  })
  
  const btns = Array.from(cities).map(city => {
    const btn = $('<button>').addClass(['btn', 'btn-info']).html(city)
    btn.click(e => filterByCity(city))
    return btn;
  })
  
  const btnAll = $('<button>').addClass(['btn', 'btn-info', 'active']).html('Todas')
  btnAll.click(e => filterByCity(null))
  btns.push(btnAll)
  
  const btnGroup = $('<div>').addClass(['btn-group'])
  btnGroup.append(btns)
  
  $(this).html(btnGroup)
  return this
}

onLoadHtmlSuccess(function() {
  $('[js-city-buttons]').cityButtons()
})
