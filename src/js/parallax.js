import 'pixi.js'
import bgFar from '../images/bg-far.png'
import bgMid from '../images/bg-mid.png'


let app = new PIXI.Application({
    width: 512,
    height: 384,
    antialias: true,
    transparent: false,
    resolution: 1
})

document.body.appendChild(app.view)

const farTexture = PIXI.Texture.fromImage(bgFar)
const far = new PIXI.extras.TilingSprite(farTexture, 512, 256)
far.position.set(0, 0)
far.tilePosition.set(0, 0)
app.stage.addChild(far)

const midTexture = PIXI.Texture.fromImage(bgMid)
const mid = new PIXI.extras.TilingSprite(midTexture, 512, 256)
mid.position.set(0, 128)
mid.tilePosition.set(0, 0)
app.stage.addChild(mid)

const update = () => {
    far.tilePosition.x -= 0.128
    mid.tilePosition.x -= 0.64

    requestAnimationFrame(update)
}
requestAnimationFrame(update)
