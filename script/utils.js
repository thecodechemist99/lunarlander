/* 
Utility class for lunarlander game.
Distributed under the MIT license.
(c)2020 Florian Beck
*/

export default class LunarlanderUtils {
  constructor() {}

  calcRandomObjects(value_1, value_2, value_3, yMin, yMax) {
    let maxValue;
    let objects = [];
    if (windowWidth <= 800) {
      maxValue = value_1;
    } else if (windowWidth <= 1920) {
      maxValue = value_2;
    } else {
      maxValue = value_3;
    }
    for (let i = 0; i < maxValue; i++) {
      objects.push([
        random(0, windowWidth),
        random(yMin, yMax),
        random(0.5, 1.2),
      ]);
    }
    return objects;
  }
}
