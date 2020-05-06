/* setup for p5.js */

import LunarlanderUtils from "./utils.js";

let sketch = new p5();
window.utils = new LunarlanderUtils();

window.fps = 30;
window.ground = 0.9 * windowHeight;

function preload() {
  window.thrustSound = loadSound("./media/sound/thrust.mp3");
  window.explosionSound = loadSound("./media/sound/explosion.mp3");
  window.beepSound = loadSound("./media/sound/beep.mp3");
  window.bizzlSound = loadSound("./media/sound/bizzl.mp3");
}
window.preload = preload;

function setup() {
  sketch.createCanvas(windowWidth, windowHeight);
  frameRate(window.fps);

  textFont("Courier");

  window.stars = window.utils.calcRandomObjects(30, 60, 90, 0, windowHeight);

  window.explosionSound.setVolume(0.3);
  window.beepSound.setVolume(0.2);
  window.bizzlSound.setVolume(0.2);

  window.whiteOpaque = color("rgba(255, 255, 255, 0.6)");
  window.lightGrey = color(230);
}
window.setup = setup;

function windowResized() {
  sketch.resizeCanvas(windowWidth, windowHeight);
  clear();
  window.stars = utils.calcRandomObjects(30, 60, 90, height);
}
window.addEventListener("resize", windowResized);
