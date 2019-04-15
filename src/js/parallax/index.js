import 'pixi.js'
import wallSprite from '../../images/wall.png'
// import wallJSON from '../../json/wall.json'
import { Scroller } from './lib.js'

class Main {
    constructor() {
        this.stage = new PIXI.Container()
        this.renderer = PIXI.autoDetectRenderer(
            512,
            384,
            { view: document.getElementById('game-canvas') }
        )
        this.scrollSpeed = 1
        this.loadSpriteSheet()
    }

    update() {
        this.scroller.moveViewportXBy(this.scrollSpeed)
        this.renderer.render(this.stage)
        requestAnimationFrame(this.update.bind(this))
    }

    loadSpriteSheet() {
        const data = require('../../json/wall.json')
        PIXI.loader
        .add(wallSprite, data)
        .load((loader, resources) => {
            console.log(resources[wallSprite])
            const sheet = new PIXI.Spritesheet(resources[wallSprite].texture.baseTexture, data)
            sheet.parse(() => { console.log('we gucci') })
        })
    }

    spriteSheetLoaded() {
        this.scroller = new Scroller(this.stage)
        requestAnimationFrame(this.update.bind(this))
        // const slice1 = PIXI.Sprite.fromFrame('edge_01')
    }
}

function init() {
    document.body.innerHTML = '<canvas id="game-canvas" />'
    const main = new Main()
}

init()