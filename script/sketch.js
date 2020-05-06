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

let keys = new KeyInput();
let timer = new Timer(window.fps);
let game = new Game(timer);

// init objects

let world = new Sprite(0, 0);
world.resize(width, height);

let background = new Background(0, 0, timer);
world.addChild(background);

let planets = window.utils.calcRandomObjects(4, 8, 16, 150, windowHeight - 140);

for (let element of planets) {
  let planet = new Planet(element[0], element[1], element[2]);
  world.addChild(planet);
}

let rocket = new Rocket(windowWidth / 2, 50, keys);
world.addChild(rocket);
rocket.getFocus();

// draw

function draw() {
  timer.tick();

  keys.keyIsDown(LEFT_ARROW);
  keys.keyIsDown(RIGHT_ARROW);
  keys.keyIsDown(UP_ARROW);

  rocket.move();
  world.display();
}
window.draw = draw;

// interactions

function mousePressed() {
  world.mousePressed();
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
}
window.keyPressed = keyPressed;

function keyTyped() {
  keys.keyTyped();
}
window.keyTyped = keyTyped;
