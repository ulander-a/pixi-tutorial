import 'pixi.js'
import ballSrc from '../images/ball.png'

export const createPixiApp = () => {

  //Create a Pixi Application
  let app = new PIXI.Application({
    width: 256,         // default: 800
    height: 256,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1       // default: 1
  });

  //Add the canvas that Pixi automatically created for you to the HTML document
  document.body.appendChild(app.view);

  PIXI.loader
    .add(ballSrc)
    .load(setup);


  let ball

  function setup() {
    ball = new PIXI.Sprite(PIXI.loader.resources[ballSrc].texture);

    // ball.position.set(96, 96)
    // ball.scale.set(0.5, 0.5)
    
    app.stage.addChild(ball)

    app.ticker.add(delta => gameLoop(delta))
  }

  const gameLoop = delta => {
    if (ball.x > 256) {
      ball.x = 0
    } else ball.x += 1
  }
}