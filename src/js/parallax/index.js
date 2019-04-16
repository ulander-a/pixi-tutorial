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
        this.borrowWallSprites(9)
    }

    borrowWallSprites(num) {
        for (let i = 0; i < num; i++) {
            if (i % 2 == 0) {
                var sprite = this.pool.borrowWindow()
            } else {
                var sprite = this.pool.borrowDecoration()
            }
            sprite.position.x = -32 + (i * 64)
            sprite.position.y = 128
            
            this.wallSlices.push(sprite)
            this.stage.addChild(sprite)
        }
    }

    returnWallSprites() {
        for (let i = 0; i < this.wallSlices.length; i++) {
            const sprite = this.wallSlices[i]
            this.stage.removeChild(sprite)

            if (i % 2 == 0) {
                this.pool.returnWindow(sprite)
            } else {
                this.pool.returnDecoration(sprite)
            }
        }

        this.wallSlices = []
    }
}

function init() {
    document.body.innerHTML = '<canvas id="game-canvas" />'
    const main = new Main()
    main.loadSpriteSheet()
}

init()