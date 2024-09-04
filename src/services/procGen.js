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

export const colours = [
  { colour: [0.08235, 0.219607, 0.92549, 1.0], hex: "#1535ea", name: "blue" },
  { colour: [0.764705, 0.85098, 0.42745, 1.0], hex: "#c1d86b", name: "green" },
  { colour: [0.49803, 0.85098, 0.94509, 1.0], hex: "#7cd8ef", name: "lightblue" },
  { colour: [0.75686, 0.55294, 0.83529, 1.0], hex: "#c08cd4", name: "lilac" },
  { colour: [0.08235, 0.94117, 0.53333, 1.0], hex: "#14ef89", name: "mint" },
  { colour: [0.95294, 0.55294, 0.63921, 1.0], hex: "#f28ca2", name: "pink" },
  { colour: [0.49803, 0.160784, 0.83137, 1.0], hex: "#7b28d3", name: "purple" },
  { colour: [0.92549, 0.18823, 0.28627, 1.0], hex: "#ea2f48", name: "red" },
  { colour: [1.0, 0.87058, 0.41568, 1.0], hex: "#ffdc68", name: "yellow" },
  { colour: [1.0, 0.62745, 0.274509, 1.0], hex: "#ff9e44", name: "orange" },
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

export const chooseColour = (seed, beginSlice, endSlice) => {
  const max = parseInt("ffffffffff", 16);
  return colours[
    Math.round(
      scale(
        normalize(parseInt(seed.slice(beginSlice, endSlice), 16), max, 0),
        colours.length - 1,
        0
      )
    )
  ];
};

export const generateMemoriesSVG = (seed, interactions, msg) => {
  const max = parseInt("ffffffffff", 16);
  const id = seed.slice(2, 12);
  const x1 = scale(normalize(parseInt(seed.slice(2, 12), 16), max, 0), 0.7, 0.3);
  const y1 = scale(normalize(parseInt(seed.slice(10, 20), 16), max, 0), 0.7, 0.3);
  const x2 = scale(normalize(parseInt(seed.slice(20, 30), 16), max, 0), 0.7, 0.3);
  const y2 = scale(normalize(parseInt(seed.slice(22, 32), 16), max, 0), 0.7, 0.3);
  const x3 = scale(normalize(parseInt(seed.slice(5, 15), 16), max, 0), 0.7, 0.3);
  const y3 = scale(normalize(parseInt(seed.slice(7, 17), 16), max, 0), 0.7, 0.3);
  const first = chooseColour(seed, 16, 26).hex;
  let s = 2; 
  let second;
  if (interactions > 0) {
    second = chooseColour(seed, s, s+10).hex;
    while (second === first) {
      s += 1;
      second = chooseColour(seed, s, s+10).hex;
    }
  }
  let third;
  if (interactions > 2) {
    let t = 3;  
    third = chooseColour(seed, t, t+10).hex;
    while (third === first || third === second) {
      t += 1;
      third = chooseColour(seed, t, t+10).hex;
    }
  }
  let fourth;
  if (interactions > 2) {
    let f = 4;  
    fourth = chooseColour(seed, f, f+10).hex;
    while (fourth === first || fourth === second || fourth === third) {
      f += 1;
      fourth = chooseColour(seed, f, f+10).hex;
    }
  }
  const startingText = `${msg ? msg  : ''}`;
  return buildMemoriesSvg(id, x1, y1, x2, y2, x3, y3, first, second, third, fourth, startingText);
}

export const generateDeathSVG = (seed, tokenId) => {
  const max = parseInt("ffffffffff", 16);
  const id = seed.slice(2, 12);
  const x1 = scale(normalize(parseInt(seed.slice(2, 12), 16), max, 0), 0.7, 0.3);
  const y1 = scale(normalize(parseInt(seed.slice(10, 20), 16), max, 0), 0.7, 0.3);
  const x2 = scale(normalize(parseInt(seed.slice(20, 30), 16), max, 0), 0.7, 0.3);
  const y2 = scale(normalize(parseInt(seed.slice(22, 32), 16), max, 0), 0.7, 0.3);
  const x3 = scale(normalize(parseInt(seed.slice(5, 15), 16), max, 0), 0.7, 0.3);
  const y3 = scale(normalize(parseInt(seed.slice(7, 17), 16), max, 0), 0.7, 0.3);
  const colour = chooseColour(seed, 16, 26).hex;
  return buildDeathSvg(id, x1, y1, x2, y2, x3, y3, colour, tokenId);
}

export const buildMemoriesSvg = (id, x1, y1, x2, y2, x3, y3, colour1, colour2, colour3, colour4, startingText) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 210"><defs>`
      + `<path id="${id}p" d="M105.072 132.808c.773 1.311-1.386 1.688-2.178 1.284-2.149-1.096-1.76`
      + `-4.11-.389-5.641 2.453-2.74 6.796-2.013 9.104.507 3.385 3.697 2.282 9.523-1.402 12.565-4.912`
      +` 4.055-12.265 2.561-16.028-2.297-4.736-6.114-2.844-15.014 3.192-19.49 7.31-5.422 17.767-3.13 `
      + `22.952 4.087 6.112 8.505 3.417 20.522-4.982 26.415-9.697 6.803-23.28 3.704-29.877-5.878-7.497`
      + `-10.888-3.993-26.037 6.773-33.34 12.078-8.19 28.796-4.281 36.801 7.67 8.887 13.266 4.572 31.55`
      + `6-8.563 40.263-14.456 9.583-34.317 4.862-43.726-9.459-10.28-15.644-5.152-37.077 10.353-47.188 `
      + `16.834-10.977 39.84-5.443 50.651 11.249 11.674 18.021 5.734 42.6-12.144 54.113-19.21 12.371-45`
      + `.361 6.024-57.575-13.04-13.07-20.397-6.315-48.122 13.934-61.037 21.585-13.767 50.885-6.606 64.`
      + `5 14.83 14.465 22.772 6.897 53.646-15.724 67.962-23.96 15.163-56.41 7.188-71.425-16.62-15.861-`
      + `25.148-7.479-59.171 17.515-74.887 26.335-16.56 61.933-7.77 78.35 18.41 17.257 27.523 8.06 64.6`
      + `96-19.306 81.812-28.71 17.956-67.458 8.352-85.274-20.2C31.949 135 41.96 94.676 71.7 76.16c31.0`
      + `84-19.353 72.983-8.935 92.198 21.991 20.052 32.272 9.226 75.746-22.886 95.66-33.459 20.751-78.`
      + `508 9.518-99.123-23.78C20.44 135.384 32.08 88.76 66.566 67.445c35.833-22.148 84.033-10.1 106.0`
      + `47 25.572 22.847 37.02 10.392 86.796-26.467 109.51-38.207 23.545-89.558 10.683-112.972-27.362C`
      + `8.93 135.77 22.199 82.844 61.431 58.73c40.582-24.943 95.084-11.266 119.897 29.153 25.642 41.76`
      + `8 11.558 97.846-30.048 123.359-42.955 26.34-100.609 11.849-126.82-30.943C-2.58 136.157 12.318 `
      + `76.928 56.296 50.016c45.33-27.738 106.135-12.432 133.746 32.733 28.437 46.517 12.723 108.898-3`
      + `3.628 137.209" style="fill:none;fill-rule:evenodd;stroke:none" transform="translate(-3.325 -25`
      + `.15)"/><radialGradient id="${id}g" cx=".5" cy=".5" r=".5" fx="${x1}" fy="${y1}">`
      + `<stop offset="0%" stop-color="${colour1}"/><stop offset=".5" stop-color="${colour2 ? colour2 : colour1}"`
      + ` stop-opacity="100"><animate attributeName="offset" dur="5s" repeatCount="indefinite" `
      + `values=".4;.7;.4"/></stop><stop offset="100%" stop-color="#fff" stop-opacity="0"/>`
      + `</radialGradient>${colour3 ? `<radialGradient id="${id}g2" cx=".5" cy=".5" r=".5" fx="${x2}" fy="${y2}"><stop offset="0%" stop-color="${colour3}"/><stop offset="70%" stop-color="#fff" stop-opacity="0"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient>` : ""}`
      + `${colour4 ? `<radialGradient id="${id}g3" cx=".5" cy=".5" r=".5" fx="${x3}" fy="${y3}"><stop offset="0%" stop-color="${colour4}"/><stop offset="60%" stop-color="#fff" stop-opacity="0"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient>` : ""}`
      + `</defs><rect width="210" height="210" fill="url(#${id}g)" rx="15" ry="15"/>`
      + `${colour3 ? `<rect width="210" height="210" fill="url(#${id}g2)" rx="15" ry="15"/>` : ""}`
      + `${colour4 ? `<rect width="210" height="210" fill="url(#${id}g3)" rx="15" ry="15"/>` : ""}`
      + `<text fill="#1d1f20" font-family="monospace" font-size="6" letter-spacing="1"><textPath xml:space="preserve" href="#${id}p">${startingText}</textPath></text></svg>`
  return svg;
}

export const buildDeathSvg = (id, x1, y1, x2, y2, x3, y3, colour3, tokenId) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 210"><defs>`
  + `<radialGradient id="${id}g" cx="0.5" cy="0.5" r="0.5" fx="${x1}" fy="${y1}"><stop offset="0%" stop-color="1"/><stop offset=".5" stop-color="1" stop-opacity="100"><animate attributeName="offset" dur="5s" repeatCount="indefinite" values=".5;.6;.5"/></stop><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient>`
  + `<radialGradient id="${id}g2" cx="0.5" cy="0.5" r="0.5" fx="${x2}" fy="${y2}"><stop offset="0%" stop-color="${colour3}"/><stop offset="70%" stop-color="#fff" stop-opacity="0"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient>`
  + `<radialGradient id="${id}g3" cx="0.5" cy="0.5" r="0.5" fx="${x3}" fy="${y3}"><stop offset="0%" stop-color="1"/><stop offset="60%" stop-color="#fff" stop-opacity="0"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient>`
  + `</defs><rect width="210" height="210" fill="url(#${id}g)" rx="15" ry="15"/>`
  + `<rect width="210" height="210" fill="url(#${id}g2)" rx="15" ry="15"/>`
  + `<rect width="210" height="210" fill="url(#${id}g3)" rx="15" ry="15"/>`
  + `<text x="50%" y="50%" fill="#fff" dominant-baseline="middle" font-family="monospace" font-size="6" letter-spacing="1" text-anchor="middle">Lifeform #${tokenId}</text></svg>`
  return svg;
}