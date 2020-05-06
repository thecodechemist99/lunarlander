/* 
Rocket class.
Distributed under the MIT license.
(c) 2020 Florian Beck.
*/

import SteerableObject from "./steerableObject.js";

export default class Rocket extends SteerableObject {
  constructor(x, y, keyInput) {
    super(x, y, keyInput);
    this.fuel = 150;
    this.fuelEx = 0;
  }

  keyIsDown(keyCode) {
    if (this.fuel > 0) {
      switch (keyCode) {
        case LEFT_ARROW:
          // tilt left
          this.rotation -= radians(2);
          this.fuel--;
          break;
        case RIGHT_ARROW:
          // tilt right
          this.rotation += radians(2);
          this.fuel--;
          break;
        case UP_ARROW:
          // increase thrust
          this.ySpeed -= 0.2;
          this.fuel--;
          this.fuelEx += 5;

          if (!thrustSound.isLooping()) {
            thrustSound.loop();
          } else {
            thrustSound.fade(1.5, 0.5);
          }
          break;
      }
    }
  }

  move() {
    this.x += this.xSpeed;
    if (this.xSpeed > 0) {
      this.xSpeed -= 0.05;
    } else if (this.xSpeed < 0) {
      this.xSpeed += 0.05;
    }

    this.xSpeed += this.rotation * 0.005;

    this.y += this.ySpeed;
    this.ySpeed += 0.1;

    if (this.fuelEx > 0) {
      this.fuelEx -= 3;
    }

    if (this.fuel > 0) {
      window.thrustSound.fade(1.5, 0.5);
    } else {
      window.thrustSound.fade(0, 0.4);
    }
  }

  draw() {
    noStroke();
    fill("#ffffff");
    rectMode(CENTER);
    ellipse(0, 0, 18, 34);
    rect(0, 0 - 20, 2, 15);
    quad(-9, 2, 9, 2, 15, 11, -15, 11);
    fill("#000000");
    ellipse(0, -5, 8, 12);

    // fuel exhaustion
    fill(window.whiteOpaque);
    if (this.fuelEx) {
      triangle(-5, 20, 5, 20, 0, 20 + this.fuelEx);
      triangle(-5, 20, 5, 20, 0, 20 + this.fuelEx * 0.6);
      triangle(-5, 20, 5, 20, 0, 20 + this.fuelEx * 0.2);
    }
  }
}
