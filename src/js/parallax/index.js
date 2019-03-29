import 'pixi.js'
import { Scroller } from './lib.js'

function init() {
    let app = new PIXI.Application({
        width: 512,
        height: 384,
        antialias: true,
        transparent: false,
        resolution: 1
    })

    document.body.appendChild(app.view)

    const scroller = new Scroller(app.stage)

    const update = () => {
        scroller.update()
        requestAnimationFrame(update)
    }

    requestAnimationFrame(update)
}


init()