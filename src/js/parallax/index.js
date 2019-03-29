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
    far.update()
    mid.update()
    
    requestAnimationFrame(update)
}

requestAnimationFrame(update)
