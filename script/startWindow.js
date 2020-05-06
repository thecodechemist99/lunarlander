/*
Start window class.
Distributed under the MIT License.
(c) 2020 Florian Beck
*/

import Window from "./window.js";

export default class StartWindow extends Window {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  drawContent() {}
}

if (count === -1) {
  bizzlSound.play();
}

// text
textAlign(CENTER, CENTER);
textSize(20);
text(
  "WELCOME TO THE LUNAR LANDER\n\nTRY TO LAND ON THE MOON WITHOUT CRASHING THE ROCKET.\nCONTROL THE ROCKET WITH THE ARROW OR WASD KEYS:\n\nTHRUST",
  x,
  y - 217
);
text("TILT LEFT", x - 175, y - 28);
text("TILT RIGHT", x + 175, y - 28);
text(
  "AVOID TO HIT ANY PLANETS OR BUILDINGS OR YOUR ROCKET WILL EXPLODE.\n\nAND DON'T FORGET TO CHECK THE FUEL LEVEL!",
  x,
  y + 70
);

// keys
stroke(white);
strokeWeight(2);
noFill();
rectMode(CENTER);
// button left
rect(x - 70, y - 30, 60, 60, 5);
// button right
rect(x + 70, y - 30, 60, 60, 5);
// buton up
rect(x, y - 100, 60, 60, 5);
// button down
rect(x, y - 30, 60, 60, 5);

if (count < 50) {
  // left arrow
  line(x - 60, y - 30, x - 80, y - 30);
  line(x - 80, y - 30, x - 75, y - 35);
  line(x - 80, y - 30, x - 75, y - 25);

  // right arrows
  line(x + 60, y - 30, x + 80, y - 30);
  line(x + 80, y - 30, x + 75, y - 25);
  line(x + 80, y - 30, x + 75, y - 35);

  // up arrow
  line(x, y - 90, x, y - 110);
  line(x - 5, y - 105, x, y - 110);
  line(x + 5, y - 105, x, y - 110);

  // down arrow
  line(x, y - 20, x, y - 40);
  line(x - 5, y - 25, x, y - 20);
  line(x + 5, y - 25, x, y - 20);
} else if (count < 100) {
  noStroke();
  fill(white);
  textFont("Arial");
  text("W", x, y - 98);
  text("A", x - 70, y - 28);
  text("S", x, y - 28);
  text("D", x + 70, y - 28);

  textFont("Courier");
} else {
  count = 0;
}
fill(white);
count++;
