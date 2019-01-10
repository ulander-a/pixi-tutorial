import './style/style.css'

function component() {
  let element = document.createElement('div')

  element.innerHTML = 'Hello webpack'
  element.classList.add('hello')

  return element
}

let element = component()
document.body.appendChild(element)

// if (module.hot) {
//   module.hot.accept('./print.js', (module) => {
//     console.log('Accepting the updated printMe module!')
//     document.body.removeChild(element)
//     element = component
//     document.body.appendChild(element)
//   })
// }