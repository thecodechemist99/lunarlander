/*
Lunar Lander Game with arrow/wasd key control and highscore (based on PHP and MySQL database).
Distributed under the MIT license.
(c) 2020 Florian Beck.
*/

import KeyInput from "./keyInput.js";
import Timer from "./timer.js";
import Sprite from "./sprite.js";
import Background from "./background.js";
import Planet from "./planet.js";
import Rocket from "./rocket.js";
import Game from "./game.js";
import StartWindow from "./startWindow.js";

let keys = new KeyInput();
let timer = new Timer(window.fps);
let game = new Game(timer);

// init objects

let world = new Sprite(0, 0);
world.resize(windowWidth, windowHeight);

let background = new Background(0, 0);
world.addChild(background);

let startScreen = new Sprite(0, 0);
startScreen.resize(windowWidth, windowHeight);
world.addChild(startScreen);

let manual = new StartWindow(windowWidth / 2, windowHeight / 2);
startScreen.addChild(manual);

let endScreen = new Sprite(0, 0);
endScreen.resize(windowWidth, windowHeight);
world.addChild(endScreen);

let gameScreen = new Sprite(0, 0);
gameScreen.resize(windowWidth, windowHeight);
world.addChild(gameScreen);

let planets = window.utils.calcRandomObjects(4, 8, 16, 150, ground - 140);

for (let element of planets) {
  let planet = new Planet(element[0], element[1], element[2]);
  gameScreen.addChild(planet);
}

let rocket = new Rocket(windowWidth / 2, 50, keys);
gameScreen.addChild(rocket);
rocket.getFocus();

// draw

// game.mode = game.modes.RUN;

function draw() {
  startScreen.visible = false;
  gameScreen.visible = false;
  endScreen.visible = false;

  switch (game.mode) {
    case game.modes.START:
      startScreen.visible = true;
      break;
    case game.modes.RUN:
      timer.tick();

      keys.keyIsDown(LEFT_ARROW);
      keys.keyIsDown(RIGHT_ARROW);
      keys.keyIsDown(UP_ARROW);
      keys.keyIsDown(87);
      keys.keyIsDown(65);
      keys.keyIsDown(68);

      if (rocket.update()) {
        game.changeMode(game.modes.END);
      }

      gameScreen.visible = true;
      break;
    case game.modes.HIGHSCORE:
      gameScreen.visible = true;
      break;
    case game.modes.END:
      gameScreen.visible = true;
      endScreen.visible = true;
      break;
  }

  background.update(
    timer.getTimeAsString(),
    game.score,
    game.level,
    rocket.fuel,
    round(rocket.y),
    rocket.xSpeed,
    rocket.ySpeed
  );
  world.display();
}
window.draw = draw;

// interactions

function mousePressed() {
  world.mousePressed();

  if (game.mode != game.modes.RUN) {
    game.reset();
    rocket.reset();
  }
}
window.mousePressed = mousePressed;

function mouseClicked() {
  world.mouseClicked();
}
window.mouseClicked = mouseClicked;

function mouseReleased() {
  world.mouseReleased();
}
window.mouseReleased = mouseReleased;

function keyPressed() {
  keys.keyPressed();

  if (game.mode != game.modes.RUN) {
    game.reset();
    rocket.reset();
  }
}
window.keyPressed = keyPressed;

function keyTyped() {
  keys.keyTyped();
}
window.keyTyped = keyTyped;

function keyReleased() {
  keys.keyReleased();
}
window.keyReleased = keyReleased;
