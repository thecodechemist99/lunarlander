/*
Interactive objects class.
Distributed under the MIT License.
(c)2020 Florian Beck, based upon Work by Garrit Schaap.
*/

import DisplayObject from "./displayObject.js";

export default class InteractiveObject extends DisplayObject {
  constructor(x, y, width, height) {
    super(x, y);
    this.width = width;
    this.height = height;
    this.parent = undefined;
    this.enabled = true;
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  hitTest(x, y) {
    let p = this.parent;
    let dx = 0;
    let dy = 0;

    while (p != undefined) {
      dx += p.x;
      dy += p.y;
      p = p.parent;
    }

    return (
      x > this.x + dx &&
      x < this.x + dx + this.width &&
      y > this.y + dy &&
      y < this.y + dy + this.height
    );
  }

  pressed() {}

  clicked() {}

  released() {}

  mousePressed() {
    if (this.enabled && this.hitTest(mouseX, mouseY)) {
      this.pressed();
    }
  }

  mouseClicked() {
    if (this.enabled && this.hitTest(mouseX, mouseY)) {
      this.clicked();
    }
  }

  mouseReleased() {
    if (this.enabled && this.hitTest(mouseX, mouseY)) {
      this.released();
    }
  }

  mouseHovered() {
    if (this.enabled && this.hitTest(mouseX, mouseY)) {
      return true;
    } else {
      return false;
    }
  }
}
