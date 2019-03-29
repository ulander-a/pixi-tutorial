import App from './js/app'

const index = () => {
  let element = document.createElement('div')

  element.innerHTML = '<h1>PIXI</h1>'

  return element
}

const element = index()
document.body.appendChild(element)

const app = new App