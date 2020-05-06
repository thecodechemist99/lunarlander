/*
Timer class.
Distributed under the MIT License.
(c) 2020 Florian Beck
*/

export default class Timer {
  constructor(fps) {
    this.fps = fps;
    this.m = 0;
    this.s = 0;
    this.ms = 0;
    this.run = false;
  }

  start() {
    this.run = true;
  }

  tick() {
    if (this.run) {
      timer.ms += 60 / this.fps;

      if (timer.ms >= 60) {
        timer.s++;
        timer.ms = 0;
      }
      if (timer.s >= 60) {
        timer.m++;
        timer.s = 0;
      }
    }
  }

  getTime() {
    return { m: this.m, s: this.s, ms: this.ms };
  }

  reset() {
    this.timer = 0;
  }
}
