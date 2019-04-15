import 'pixi.js'
import bgFar from '../../images/bg-far.png'
import bgMid from '../../images/bg-mid.png'

export function Far() {
    const texture = PIXI.Texture.fromImage(bgFar)
    PIXI.extras.TilingSprite.call(this, texture, 512, 256)
    this.position.set(0, 0)
    this.tilePosition.set(0, 0)
    this.viewportX = 0
    this.DELTA_X = 0.128

    this.setViewportX = (newViewportX) => {
        const distanceTravelled = newViewportX - this.viewportX
        this.viewportX = newViewportX
        this.tilePosition.x -= (distanceTravelled * this.DELTA_X)
    }
}

Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype)

export function Mid() {
    const texture = PIXI.Texture.fromImage(bgMid)
    PIXI.extras.TilingSprite.call(this, texture, 512, 256)
    this.position.set(0, 128)
    this.tilePosition.set(0, 0)
    this.viewportX = 0
    this.DELTA_X = 0.64

    this.setViewportX = (newViewportX) => {
        const distanceTravelled = newViewportX - this.viewportX
        this.viewportX = newViewportX
        this.tilePosition.x -= (distanceTravelled * this.DELTA_X)
    }
}

Mid.prototype = Object.create(PIXI.extras.TilingSprite.prototype)

export class Scroller {
    constructor(stage) {
        this.far = new Far()
        stage.addChild(this.far)

        this.mid = new Mid()
        stage.addChild(this.mid)

        this.viewportX = 0
    }

    getViewportX() {
        return this.viewportX
    }

    setViewportX(viewportX) {
        this.viewportX = viewportX
        this.far.setViewportX(viewportX)
        this.mid.setViewportX(viewportX)
    }

    moveViewportXBy(units) {
        const newViewportX = this.viewportX + units
        this.setViewportX(newViewportX)
    }
}
