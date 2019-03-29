import 'pixi.js'
import bgFar from '../../images/bg-far.png'
import bgMid from '../../images/bg-mid.png'

export function Far() {
    const texture = PIXI.Texture.fromImage(bgFar)
    PIXI.extras.TilingSprite.call(this, texture, 512, 256)
    this.position.set(0, 0)
    this.tilePosition.set(0, 0)
    this.update = () => {
        this.tilePosition.x -= 0.128
    }
}

Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype)

export function Mid() {
    const texture = PIXI.Texture.fromImage(bgMid)
    PIXI.extras.TilingSprite.call(this, texture, 512, 256)
    this.position.set(0, 128)
    this.tilePosition.set(0, 0)
    this.update = () => {
        this.tilePosition.x -= 0.64
    }
}

Mid.prototype = Object.create(PIXI.extras.TilingSprite.prototype)

export class Scroller {
    constructor(stage) {
        this.far = new Far()
        stage.addChild(this.far)

        this.mid = new Mid()
        stage.addChild(this.mid)
    }

    update() {
        this.far.update()
        this.mid.update()
    }
}