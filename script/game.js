/*
Class for turn based game structure.
Distributed under the MIT License.
(c) 2020 Florian Beck
*/

export default class Game {
  constructor(timer) {
    this.timer = timer;
    this.level = 0;
    this.score = 0;
    this.modes = {
      START: 0,
      RUN: 1,
      HIGHSCORE: 2,
      END: 3,
    };
    this.mode = this.modes.START;
    this.finished = true;
  }

  changeMode(mode) {
    this.mode = mode;
  }

  reset() {
    this.timer.reset();
    this.finished = false;
    this.mode = this.modes.RUN;
  }
}
