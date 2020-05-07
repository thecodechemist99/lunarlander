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
    this.cs = 0;
  }

  tick() {
    this.cs += floor(100 / this.fps);

    if (this.cs >= 100) {
      this.s++;
      this.cs = 0;
    }
    if (this.s >= 60) {
      this.m++;
      this.s = 0;
    }
  }

  getTime() {
    return { m: this.m, s: this.s, cs: this.cs };
  }

  getTimeAsString() {
    let time = this.m.toString();
    if (this.s < 10) {
      time += ":0" + this.s;
    } else {
      time += ":" + this.s;
    }
    if (this.cs < 10) {
      time += ":0" + this.cs;
    } else {
      time += ":" + this.cs;
    }
    return time;
  }

  reset() {
    this.m = 0;
    this.s = 0;
    this.cs = 0;
  }
}
