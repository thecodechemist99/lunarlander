/* 
Sketch file for lunarlander game.
Distributed under the MIT license.
(c)2020 Florian Beck
*/

import Sprite from "./sprite.js";
import Planet from "./planet.js";
import Background from "./background.js";

// init objects

let world = new Sprite(0, 0);
world.resize(width, height);

let background = new Background(0, 0);
world.addChild(background);

let planets = window.utils.calcRandomObjects(4, 8, 16, 150, windowHeight - 140);

for (let element of planets) {
  let planet = new Planet(element[0], element[1], element[2]);
  world.addChild(planet);
}

// draw

function draw() {
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
