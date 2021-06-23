import $ from 'jquery'

const loadHtmlSuccessCallbacks = []

export function onLoadHtmlSuccess(callback) {
  if(!loadHtmlSuccessCallbacks.includes(callback)) {
    loadHtmlSuccessCallbacks.push(callback)
  }
}

function loadIncludes(parent) {
  if(!parent) parent = 'body'
  $(parent).find('[js-include]').each(function(id, el) {
    const url = $(el).attr('js-include')
    $.ajax({
      url,
      success(data) {
        $(el).html(data)
        $(el).removeAttr('js-include')

        loadHtmlSuccessCallbacks.forEach(callback => callback(data))
        loadIncludes(el)
      }
    })
  })
}

loadIncludes()