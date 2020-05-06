/*
Planet class.
Distributed under the MIT License.
(c)2020 Florian Beck.
*/

import InteractiveObject from "./interactiveObject.js";

export default class Planet extends InteractiveObject {
  constructor(x, y, scale = 1) {
    super(x, y);
    this.scale = scale;
  }
  draw() {
    // lower half
    noStroke();
    fill("#ffffff");
    arc(0, 0, 60, 60, radians(-25), radians(200));

    // rings
    push();
    rotate(radians(-20));
    noFill();
    stroke(window.lightGrey);
    strokeWeight(7);
    ellipse(0, 0, 80, 30);
    pop();

    // upper half
    noStroke();
    fill("#ffffff");
    arc(0, 0, 60, 60, radians(-205), radians(-15));
  }
}
