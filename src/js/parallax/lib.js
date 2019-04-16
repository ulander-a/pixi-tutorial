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

export class WallSpritesPool {
    constructor() {
        this.createWindows()
        this.createDecorations()
    }

    borrowWindow() {
        return this.windows.shift()
    }

    returnWindow(sprite) {
        return this.windows.push(sprite)
    }

    createWindows() {
        this.windows = []
        this.addWindowSprites(6, 'window_01')
        this.addWindowSprites(6, 'window_02')
        this.shuffle(this.windows)
    }

    addWindowSprites(amount, frameId) {
        for (let i = 0; i < amount; i++) {
            const sprite = PIXI.Sprite.fromFrame(frameId)
            this.windows.push(sprite)
        }
    }

    addDecorationSprites(amount, frameId) {
        for (let i = 0; i < amount; i++) {
            const sprite = PIXI.Sprite.fromFrame(frameId)
            this.decorations.push(sprite)
        }
    }

    borrowDecoration() {
        return this.decorations.shift()
    }

    returnDecoration(sprite) {
        this.decorations.push(sprite)
    }

    shuffle(array) {
        var len = array.length;
        var shuffles = len * 3;
        for (var i = 0; i < shuffles; i++)
        {
          var wallSlice = array.pop();
          var pos = Math.floor(Math.random() * (len-1));
          array.splice(pos, 0, wallSlice);
        }
    }

    createDecorations() {
        this.decorations = []
        this.addDecorationSprites(6, 'decoration_01')
        this.addDecorationSprites(6, 'decoration_02')
        this.addDecorationSprites(6, 'decoration_03')
        this.shuffle(this.decorations)
    }
}