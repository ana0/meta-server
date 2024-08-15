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
  console.log(msg);
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
  const startingText = `${msg ? msg  : ''}                                                                                                                        ${generateName(seed)}`;
  console.log(x1, y1, x2, y2, x3, y3, first, second, third, fourth, startingText);
  //return buildSvg(x1, y1, x2, y2, first, second, third, fourth, startingText);
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
  console.log(x1, y1, x2, y2, x3, y3, 1, 1, 1, 1);
  //return buildSvg(x1, y1, x2, y2, first, second, third, fourth, startingText);
  return buildDeathSvg(id, x1, y1, x2, y2, x3, y3, 1, colour, 1, 1, tokenId);
}

export const buildMemoriesSvg = (id, x1, y1, x2, y2, x3, y3, colour1, colour2, colour3, colour4, startingText) => {
  const svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
  <svg
     viewBox="0 0 210 210"
     version="1.1"
     id="svg1"
     xmlns="http://www.w3.org/2000/svg"
     xmlns:svg="http://www.w3.org/2000/svg">
    <defs>
      <path
         style="fill:none;fill-rule:evenodd;stroke:none;"
         id="${id}-path2"
         d="m 105.07232,132.80821 c 0.77227,1.31086 -1.386,1.68774 -2.17874,1.28356 -2.14825,-1.09528 -1.75986,-4.10924 -0.38838,-5.64103 2.45326,-2.74001 6.79611,-2.01247 9.10333,0.50679 3.38594,3.69712 2.28277,9.52311 -1.40197,12.56563 -4.91118,4.05518 -12.264849,2.56122 -16.02792,-2.29715 -4.73544,-6.11376 -2.844022,-15.01372 3.192322,-19.49021 7.310818,-5.42163 17.766648,-3.12936 22.952508,4.0875 6.11136,8.50481 3.41629,20.52209 -4.98267,26.4148 -9.69694,6.80337 -23.279229,3.70428 -29.877103,-5.87785 -7.496924,-10.88783 -3.993025,-26.03754 6.773026,-33.3394 12.077887,-8.19157 28.796717,-4.2823 36.801687,7.66821 8.88704,13.26732 4.57199,31.55654 -8.56338,40.26398 -14.45632,9.58311 -34.316864,4.86198 -43.726276,-9.45855 -10.279646,-15.64498 -5.152211,-37.07759 10.353731,-47.18858 16.833355,-10.976559 39.838615,-5.442635 50.650875,11.24891 11.67377,18.02153 5.73321,42.59991 -12.14409,54.11316 -19.20953,12.37124 -45.361407,6.02393 -57.575459,-13.03926 -13.068892,-20.39738 -6.314744,-48.12308 13.934436,-61.037751 21.585123,-13.766721 50.884913,-6.60565 64.500053,14.829611 14.46469,22.77277 6.89663,53.64687 -15.72479,67.96235 -23.96033,15.16278 -56.408926,7.18768 -71.424642,-16.61997 -15.860979,-25.14782 -7.47878,-59.17108 17.51514,-74.886935 26.335252,-16.559265 61.933322,-7.76993 78.349232,18.410315 17.25763,27.52262 8.06113,64.69563 -19.30549,81.81153 C 107.1678,203.05393 68.419751,193.45022 50.603925,164.8972 31.949367,134.99996 41.960308,94.676778 71.69977,76.161082 c 31.08449,-19.353105 72.9829,-8.934909 92.19841,21.991022 20.05171,32.271706 9.22623,75.745416 -22.88619,95.660706 -33.45891,20.75034 -78.507984,9.51757 -99.123008,-23.78137 C 20.439967,135.38537 32.08005,88.760863 66.565532,67.446139 102.39874,45.298414 150.59874,57.345825 172.61313,93.017866 195.45959,130.0382 183.00484,179.81373 146.14623,202.52776 107.93879,226.07299 56.587678,213.21088 33.174039,175.16568 8.9300058,135.77115 22.199484,82.844422 61.431294,58.731196 102.01289,33.788344 156.51528,47.4652 181.32807,87.883627 206.96976,129.65228 192.88552,185.73037 151.28046,211.2427 108.32476,237.58325 50.670956,223.09161 24.459096,180.29992 -2.5803359,136.15718 12.318709,76.927622 56.297055,50.016253 101.62681,22.277927 162.43215,37.584383 190.04301,82.749389 218.48025,129.26616 202.76638,191.6473 156.4147,219.95764"
         transform="translate(-3.3247734,-25.149235)" />
      <radialGradient id="${id}-Gradient" cx="0.5" cy="0.5" r="0.5" fx="${x1}" fy="${y1}">
        <stop offset="0%" stop-color="${colour1}" />
        <stop offset=".5" stop-color="${colour2 ? colour2 : colour1}" stop-opacity="100">
          <animate attributeName="offset" values=".4;.7;.4" dur="5s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stop-color="white" stop-opacity="0"/>
      </radialGradient>
      ${colour3 ? `<radialGradient id="${id}-Gradient2" cx="0.5" cy="0.5" r="0.5" fx="${x2}" fy="${y2}">
      <stop offset="0%" stop-color="${colour3}" />
      <stop offset="70%" stop-color="white" stop-opacity="0"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>` : ""}
    ${colour4 ? `<radialGradient id="${id}-Gradient3" cx="0.5" cy="0.5" r="0.5" fx="${x3}" fy="${y3}">
      <stop offset="0%" stop-color="${colour4}" />
      <stop offset="60%" stop-color="white" stop-opacity="0"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>` : ""}
    </defs>
      <rect x="0" y="0" rx="15" ry="15" width="210" height="210" fill="url(#${id}-Gradient)" stroke="none" />
      ${colour3 ? `<rect x="0" y="0" rx="15" ry="15" width="210" height="210" fill="url(#${id}-Gradient2)" stroke="none" />` : ""}
      ${colour4 ? `<rect x="0" y="0" rx="15" ry="15" width="210" height="210" fill="url(#${id}-Gradient3)" stroke="none" />` : ""}
      <text font-family="monospace" letter-spacing="1" font-size="6" fill="#1d1f20">
      <textPath id="text" xml:space="preserve" href="#${id}-path2">${startingText}</textPath>
      </text>  
  </svg>
  `
  return svg;
}

export const buildDeathSvg = (id, x1, y1, x2, y2, x3, y3, colour1, colour2, colour3, colour4, startingText) => {
  const svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg viewBox="0 0 210 210"`
  +` version="1.1" id="svg1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">`
  + `<defs>
      <radialGradient id="${id}-Gradient" cx="0.5" cy="0.5" r="0.5" fx="${x1}" fy="${y1}">
        <stop offset="0%" stop-color="${colour1}" />
        <stop offset=".5" stop-color="${colour2}" stop-opacity="100">
          <animate attributeName="offset" values=".5;.6;.5" dur="5s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stop-color="white" stop-opacity="0"/>
      </radialGradient>
      ${colour3 ? `<radialGradient id="${id}-Gradient2" cx="0.5" cy="0.5" r="0.5" fx="${x2}" fy="${y2}">
      <stop offset="0%" stop-color="${colour3}" />
      <stop offset="70%" stop-color="white" stop-opacity="0"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>` : ""}
    </defs>
      <rect x="0" y="0" rx="15" ry="15" width="210" height="210" fill="url(#${id}-Gradient)" stroke="none" />
      ${colour3 ? `<rect x="0" y="0" rx="15" ry="15" width="210" height="210" fill="url(#${id}-Gradient2)" stroke="none" />` : ""}
      ${colour4 ? `<rect x="0" y="0" rx="15" ry="15" width="210" height="210" fill="url(#${id}-Gradient3)" stroke="none" />` : ""}
      
      <text font-family="monospace" letter-spacing="1" font-size="6" fill="white" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">Lifeform #${startingText}</text>  
  </svg>
  `
  return svg;
}