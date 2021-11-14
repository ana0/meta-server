import { names } from "../static/names.json";

const images = [
  "https://isthisa.computer/api/static/images/blue.jpg",
  "https://isthisa.computer/api/static/images/green.jpg",
  "https://isthisa.computer/api/static/images/lightblue.jpg",
  "https://isthisa.computer/api/static/images/lilac.jpg",
  "https://isthisa.computer/api/static/images/mint.jpg",
  "https://isthisa.computer/api/static/images/pink.jpg",
  "https://isthisa.computer/api/static/images/purple.jpg",
  "https://isthisa.computer/api/static/images/red.jpg",
  "https://isthisa.computer/api/static/images/yellow.jpg",
  "https://isthisa.computer/api/static/images/orange.jpg",
];

const normalize = (val, max, min) => {
  return (val - min) / (max - min);
};

const scale = (val, max, min) => {
  return ((max - min) * (val - 0)) / (1 - 0) + min;
};

export const generateName = (seed) => {
  const max = parseInt("ffffffffff", 16);
  const garden =
    names.noun[
      Math.round(
        scale(
          normalize(parseInt(seed.slice(2, 12), 16), max, 0),
          names.noun.length - 1,
          0
        )
      )
    ];
  const patient =
    names.adjective[
      Math.round(
        scale(
          normalize(parseInt(seed.slice(12, 22), 16), max, 0),
          names.adjective.length - 1,
          0
        )
      )
    ];
  const labour =
    names.noun2[
      Math.round(
        scale(
          normalize(parseInt(seed.slice(22, 32), 16), max, 0),
          names.noun2.length - 1,
          0
        )
      )
    ];
  const attention =
    names.noun2[
      Math.round(
        scale(
          normalize(parseInt(seed.slice(32, 42), 16), max, 0),
          names.noun2.length - 1,
          0
        )
      )
    ];
  return `A ${garden} requires ${patient} ${labour} and ${attention}`;
};

export const chooseImage = (seed) => {
  const max = parseInt("ffffffffff", 16);
  return images[
    Math.round(
      scale(
        normalize(parseInt(seed.slice(16, 26), 16), max, 0),
        images.length - 1,
        0
      )
    )
  ];
};
