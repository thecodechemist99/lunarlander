/*
Window class.
Distributed under the MIT License.
(c) 2020 Florian Beck
*/

import Sprite from "./sprite.js";

export default class Window extends Sprite {
  constructor(x, y, width, height, text) {
    super(x, y);
    this.width = width;
    this.height = height;
    this.text = text;
  }

  draw() {
    stroke("#ffffff");
    strokeWeight(2);
    fill("#000000");
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);

    fill("#ffffff");
    noStroke();
    textAlign(CENTER, CENTER);

    this.drawContent();
  }

  drawContent() {
    textSize(20);
    text(this.text, this.x, this.y);
  }
}
