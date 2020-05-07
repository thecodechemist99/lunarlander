/* 
Rocket class.
Distributed under the MIT license.
(c) 2020 Florian Beck.
*/

import SteerableObject from "./steerableObject.js";

export default class Rocket extends SteerableObject {
  constructor(x, y, keyInput) {
    super(x, y, keyInput);
    this.xStart = this.x;
    this.yStart = this.y;
    this.fuel = 150;
    this.fuelEx = 0;
    this.crashed = false;
    this.internalTimer = 0;
  }

  keyIsDown(keyCode) {
    if (this.fuel > 0) {
      switch (keyCode) {
        case 65:
        case LEFT_ARROW:
          // tilt left
          this.rotation -= radians(2);
          this.fuel--;
          break;
        case 68:
        case RIGHT_ARROW:
          // tilt right
          this.rotation += radians(2);
          this.fuel--;
          break;
        case 87:
        case UP_ARROW:
          // increase thrust
          this.ySpeed -= 0.2;
          this.fuel--;
          this.fuelEx += 5;

          if (!window.thrustSound.isLooping()) {
            window.thrustSound.loop();
          } else {
            window.thrustSound.fade(1.5, 0.5);
          }
          break;
      }
    }
  }

  keyReleased() {
    if (window.thrustSound.isLooping()) {
      console.log("released!");
      window.thrustSound.fade(0, 1.2);
    }
  }

  update() {
    this.x += this.xSpeed;
    if (this.xSpeed > 0) {
      this.xSpeed -= 0.05;
    } else if (this.xSpeed < 0) {
      this.xSpeed += 0.05;
    }

    this.xSpeed += this.rotation * 0.3;

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

    if (this.checkGroundHit() || this.checkBorderHit()) {
      this.crashed = true;
      return true;
    }
  }

  checkGroundHit() {
    if (this.y + 17 >= window.ground) {
      if (
        this.ySpeed > 2 ||
        this.rotation > radians(10) ||
        this.rotation < radians(-10)
      ) {
        // won = false;
        window.explosionSound.play();
        if (this.ySpeed >= 4) {
          //   this.score -= 200;
        } else {
          //   this.score -= 100;
        }
      } else {
        // won = true;
        if (this.x > windowWidth * 0.3 + 60 && this.x < windowWidth / 2) {
          //   score += 200 + this.fuel;
        } else {
          //   score += 100 + this.fuel;
        }
      }
      this.ySpeed = 0;
      return true;
    }
  }

  checkBorderHit() {
    if (this.x < -10 || this.x > windowWidth + 10) {
      if (!window.beepSound.isPlaying()) {
        window.beepSound.play();
      }
      // finishText = "YOU LOST CONTROL OF THE SPACESHIP";
      return true;
    }
  }

  draw() {
    if (!this.crashed) {
      noStroke();
      fill("#ffffff");
      rectMode(CENTER);
      ellipse(0, 0, 18, 34);
      rect(0, -20, 2, 15);
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
    } else if (this.internalTimer < 10) {
      this.internalTimer++;
      this.drawExplosion(this.internalTimer);
    }
  }

  drawExplosion(s) {
    noStroke();
    fill("#ffffff");
    rectMode(CENTER);
    push();
    scale(s);
    for (let i = 0; i < 360; i += 161) {
      rotate(radians(i));
      rect(0, 0, 60, 50);
    }
    pop();
  }

  reset() {
    console.log("test");
    console.log(this.yStart);
    this.crashed = false;
    this.x = this.xStart;
    this.y = this.yStart;
    this.fuel = 150;
    this.fuelEx = 0;
    this.internalTimer = 0;
  }
}
