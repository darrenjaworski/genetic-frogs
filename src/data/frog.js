import { v4 as uuidv4 } from "uuid";
import { getRandomInt, getBackgroundColor } from "./main";
import rgbHex from "rgb-hex";
import hexRgb from "hex-rgb";
import cd from "color-difference";
import averageColour from "average-colour";

export class Frog {
  red = 0;
  green = 0;
  blue = 0;
  color = undefined;
  uuid = uuidv4();

  constructor(red, green, blue) {
    this.red = this.validateColor(red);
    this.green = this.validateColor(green);
    this.blue = this.validateColor(blue);
    this.color = `rgb(${this.red}, ${this.green}, ${this.blue})`;
    this.hex = rgbHex(`${this.color}`);
    let backgroundColor = getBackgroundColor();
    this.fitness = cd.compare(this.hex, rgbHex(...[...backgroundColor]));
  }

  refresh() {
    this.color = `rgb(${this.red}, ${this.green}, ${this.blue})`;
    this.hex = rgbHex(`${this.color}`);

    let backgroundColor = getBackgroundColor();
    this.fitness = cd.compare(this.hex, rgbHex(...[...backgroundColor]));
  }

  mutate() {
    if (Math.random() > 0.9) {
      const index = getRandomInt(0, 2);
      if (index == 0) {
        this.red = getRandomInt(0, 255);
      } else if (index == 1) {
        this.green = getRandomInt(0, 255);
      } else {
        this.blue = getRandomInt(0, 255);
      }

      this.refresh();
    }
    // when you mutate
    // randomly adjust the hue 10% of the time
  }

  cross(frog) {
    const average = averageColour([`#${this.hex}`, `#${frog.hex}`]);
    const averageRgb = hexRgb(average);
    // create some difference for the offspring
    // adjust the hue

    const first = new Frog(averageRgb.red, averageRgb.green, averageRgb.blue);
    const second = new Frog(averageRgb.red, averageRgb.green, averageRgb.blue);
    return [first, second];
  }

  validateColor(colorValue) {
    const testValue = Number(colorValue);

    if (Number.isInteger(testValue) && testValue >= 0 && testValue <= 255) {
      return testValue;
    } else {
      throw Error(`${colorValue} is not valid for ${this.uuid}`);
    }
  }
}
