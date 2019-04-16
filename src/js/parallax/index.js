import 'pixi.js'
import wallSprite from '../../images/wall.png'
import wallJSON from '../../json/wall.json'
import { Scroller, WallSpritesPool } from './lib.js'

class Main {
    constructor() {
        this.stage = new PIXI.Container()
        this.renderer = PIXI.autoDetectRenderer(
            512,
            384,
            { view: document.getElementById('game-canvas') }
        )
        this.scrollSpeed = 1
        // this.loadSpriteSheet()
    }

    update() {
        this.scroller.moveViewportXBy(this.scrollSpeed)
        this.renderer.render(this.stage)
        requestAnimationFrame(this.update.bind(this))
    }

    loadSpriteSheet() {
        const data = wallJSON
        PIXI.loader
            .add(wallSprite, data)
            .load((loader, resources) => {
                const sheet = new PIXI.Spritesheet(resources[wallSprite].texture.baseTexture, data)
                sheet.parse(() => {
                    this.spriteSheetLoaded()
                })
            })
    }

    spriteSheetLoaded() {
        this.scroller = new Scroller(this.stage)
        requestAnimationFrame(this.update.bind(this))

        this.pool = new WallSpritesPool()
        this.wallSlices = []
        this.generateTestWallSpan()
    }

    generateTestWallSpan() {
        const lookupTable = [
            this.pool.borrowFrontEdge,  // 1st slice
            this.pool.borrowWindow,     // 2nd slice
            this.pool.borrowDecoration, // 3rd slice
            this.pool.borrowWindow,     // 4th slice
            this.pool.borrowDecoration, // 5th slice
            this.pool.borrowWindow,     // 6th slice
            this.pool.borrowBackEdge    // 7th slice
        ]
        lookupTable.forEach((func, i) => {
            const sprite = func.call(this.pool)
            sprite.position.x = 32 + (i * 64)
            sprite.position.y = 128
            this.wallSlices.push(sprite)
            this.stage.addChild(sprite)
        })
    }

}

function init() {
    document.body.innerHTML = '<canvas id="game-canvas" />'
    const main = new Main()
    main.loadSpriteSheet()
}

init()