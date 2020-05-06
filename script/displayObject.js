/*
Sprites class.
Distributed under the MIT license.
(c)2020 Florian Beck, based upon work by Garrit Schaap.
*/

import EventDispatcher from "./eventDispatcher.js";

export default class DisplayObject extends EventDispatcher {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.scale = 1;
    this.rotation = 0;
    this.visible = true;
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
  }

  update() {}

  draw() {}

  display() {
    if (this.visible) {
      push();
      translate(this.x, this.y);
      rotate(this.rotation);
      scale(this.scale);

      this.draw();

      pop();
    }
  }
}
