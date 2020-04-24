
function body (restaurant) {
  var title = document.createElement('h4')
  title.setAttribute('class', 'card-title')
  title.innerText = restaurant.title

  var summary = document.createElement('p')
  summary.setAttribute('class', 'card-text')
  summary.innerText = restaurant.summary

  var details = document.createElement('p')
  details.setAttribute('class', 'card-text')
  restaurant.body.forEach(function (line) {
    var l
    if (line.break) {
      l = document.createElement('br')
    } else {
      l = document.createElement('div')
      if (line.bold) {
        boldedText = document.createElement('strong')
        boldedText.innerText = line.text
        l.appendChild(boldedText)
      } else {
        l.innerText = line.text
      }
    }
    details.appendChild(l)
  })

  var bodyDiv = document.createElement('div')
  bodyDiv.setAttribute('class', 'card-body')
  bodyDiv.appendChild(title)
  bodyDiv.appendChild(summary)
  bodyDiv.appendChild(details)

  return bodyDiv
}

function ava (avatar) {
  var img = document.createElement('img')
  img.setAttribute('class', 'img-fluid')
  img.setAttribute('src', avatar)
  img.setAttribute('alt', 'Avatar')

  var d = document.createElement('div')
  d.setAttribute('class', 'card-custom-avatar')
  d.appendChild(img)
  return d
}

function img (image) {
  var imageDiv = document.createElement('div')
  imageDiv.setAttribute('class', 'card-custom-img')
  imageDiv.setAttribute(
    'style',
    'background-image: url(' + image + ');'
  )
  return imageDiv
}


var grid = document.querySelector('.grid')

oboe('outlets/index.json')
  .node('restaurants', function () {
    $(document.getElementById('loading')).hide()
  })
  .node('restaurants.*', function (restaurant) {
    var cardDiv = document.createElement('div')
    cardDiv.setAttribute(
      'class', 
      restaurant.categories.join(' ') +
      ' card card-custom bg-white border-white border-0'
    )
    cardDiv.appendChild(img(restaurant.image))
    cardDiv.appendChild(ava(restaurant.avatar))
    cardDiv.appendChild(body(restaurant))

    var card = document.createElement('a')
    card.setAttribute('href', restaurant.href)
    card.appendChild(cardDiv)
    
    grid.appendChild(card)
  })
  .done(() => {
    initIsotope()
  })