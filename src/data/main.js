import { Frog } from "./frog";
import shuffle from "fisher-yates-shuffle";

const r = getRandomInt(0, 255);
const g = getRandomInt(0, 255);
const b = getRandomInt(0, 255);
let backgroundColor = [r, g, b];

let generationNumber = 1;
let frogs = spawnFrogs();

const initialData = {
  frogs,
  generationNumber,
  backgroundColor,
};

function getBackgroundColor() {
  return backgroundColor;
}

function spawnFrogs() {
  return Array.apply(null, Array(100)).map(() => {
    const r = getRandomInt(0, 255);
    const g = getRandomInt(0, 255);
    const b = getRandomInt(0, 255);
    return new Frog(r, g, b);
  });
}

function createNewGeneration(frogs, background) {
  let nextGeneration = shuffle(
    frogs
      .sort((a, b) => a.fitness - b.fitness)
      .slice(0, parseInt(frogs.length / 2) + 1)
  );
  let children = [];
  nextGeneration.forEach((d, i) => {
    if (i % 2 == 0) return;
    const crosserIndex = i + 1;
    if (crosserIndex >= nextGeneration.length) return;

    const crosser = nextGeneration[crosserIndex];
    children = children.concat(d.cross(crosser));
  });

  children.forEach((d) => d.mutate(background));

  return nextGeneration.concat(children);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getFrogs() {
  return frogs;
}

function frogReducer(
  state = { frogs, generationNumber, backgroundColor },
  action
) {
  switch (action.type) {
    case "generate":
      const nextGen = createNewGeneration(state.frogs);
      return {
        frogs: nextGen,
        generationNumber: state.generationNumber + 1,
        backgroundColor: state.backgroundColor,
      };
    case "newBackground":
      const r = getRandomInt(0, 255);
      const g = getRandomInt(0, 255);
      const b = getRandomInt(0, 255);
      const newBackground = [r, g, b];

      state.frogs.forEach((d) => d.refresh());

      backgroundColor = newBackground;

      return {
        frogs: state.frogs,
        generationNumber: 1,
        backgroundColor: newBackground,
      };
    default:
      throw new Error("Unknown action type");
  }
}

export {
  getRandomInt,
  frogs,
  createNewGeneration,
  backgroundColor,
  generationNumber,
  frogReducer,
  getFrogs,
  getBackgroundColor,
  initialData,
};
