const Generator = {
  getColor: () => {
    return `rgb(${Generator.getInt(256)}, ${Generator.getInt(
      256
    )},${Generator.getInt(256)})`;
  },

  getInt: (max, min = 0) => {
    return Math.floor(Math.random() * max) + min;
  },

  createColorGenerator: () => {},
};
