import 'pixi.js'
import { Far, Mid } from './lib.js'

let app = new PIXI.Application({
    width: 512,
    height: 384,
    antialias: true,
    transparent: false,
    resolution: 1
})

document.body.appendChild(app.view)

const far = new Far()
app.stage.addChild(far)

const mid = new Mid()
app.stage.addChild(mid)

const update = () => {
    far.tilePosition.x -= 0.128
    mid.tilePosition.x -= 0.64

    requestAnimationFrame(update)
}

requestAnimationFrame(update)
