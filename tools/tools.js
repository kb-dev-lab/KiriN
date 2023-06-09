const Tools = {
	getColorMean: (value, color1, color2) => {
		return new Color64(
			Tools.getMean(value, color1.r, color2.r),
			Tools.getMean(value, color1.g, color2.g),
			Tools.getMean(value, color1.b, color2.b),
			Tools.getMean(value, color1.a, color2.a),
		);
	},

	getMean: (percentage, a, b) =>
		Math.round((percentage / 100) * b + ((100 - percentage) / 100) * a),
};
