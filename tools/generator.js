const Generator = {
	getColor: () => {
		return `rgb(${Generator.getInt(256)}, ${Generator.getInt(256)},${Generator.getInt(256)})`;
	},

	getColorWithOpacity: (opacity) => {
		return `rgba(${Generator.getInt(256)}, ${Generator.getInt(256)},${Generator.getInt(256)},${(
			opacity / 256
		).toFixed(3)})`;
	},

	getInt: (max, min = 0) => {
		return Math.trunc(Math.random() * (max + 1 - min)) + min;
	},

	createColorGenerator: () => {},
};
