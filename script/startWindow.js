/*
Start window class.
Distributed under the MIT License.
(c) 2020 Florian Beck
*/

import Window from "./window.js";

export default class StartWindow extends Window {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.timer = -1;
  }

  drawContent() {
    if (this.timer < 0) {
      window.bizzlSound.play();
      this.timer++;
    }

    // text
    textSize(20);
    text(
      "WELCOME TO THE LUNAR LANDER\n\nTRY TO LAND ON THE MOON WITHOUT CRASHING THE ROCKET.\nCONTROL THE ROCKET WITH THE ARROW OR WASD KEYS:\n\nTHRUST",
      0,
      -217
    );
    text("TILT LEFT", -175, -28);
    text("TILT RIGHT", 175, -28);
    text(
      "AVOID TO HIT ANY PLANETS OR BUILDINGS OR YOUR ROCKET WILL EXPLODE.\n\nAND DON'T FORGET TO CHECK THE FUEL LEVEL!",
      0,
      70
    );

    // keys
    stroke("#ffffff");
    strokeWeight(2);
    noFill();
    rectMode(CENTER);
    // button left
    rect(-70, -30, 60, 60, 5);
    // button right
    rect(70, -30, 60, 60, 5);
    // buton up
    rect(0, -100, 60, 60, 5);
    // button down
    rect(0, -30, 60, 60, 5);

    if (this.timer < 50) {
      // left arrow
      line(-60, -30, -80, -30);
      line(-80, -30, -75, -35);
      line(-80, -30, -75, -25);

      // right arrows
      line(60, -30, 80, -30);
      line(80, -30, 75, -25);
      line(80, -30, 75, -35);

      // up arrow
      line(0, -90, 0, -110);
      line(-5, -105, 0, -110);
      line(5, -105, 0, -110);

      // down arrow
      line(0, -20, 0, -40);
      line(-5, -25, 0, -20);
      line(5, -25, 0, -20);
    } else if (this.timer < 100) {
      noStroke();
      fill("#ffffff");
      textFont("Arial");
      text("W", 0, -98);
      text("A", -70, -28);
      text("S", 0, -28);
      text("D", 70, -28);

      textFont("Courier");
    } else {
      this.timer = 0;
    }
    fill("#ffffff");
    this.timer++;
  }
}
