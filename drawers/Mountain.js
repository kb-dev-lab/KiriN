class Mountain extends BasicDrawer {
	getControls() {
		return [
			Controls.createRange({
				min: 2,
				max: 6,
				text: 'Step',
				value: 3,
				onChange: (e) => {
					this._nextStep = Math.pow(2, parseInt(e.target.value, 10));
				},
			}),
		];
	}

	init() {
		const size = System.getWindowSize();
		const nbPoints = Generator.getInt(16, 8);
		const nbMountains = Generator.getInt(20, 12);
		const maxDiffX = Generator.getInt(size.width / nbPoints);

		this._mountains = [];
		this._points = [];

		for (let i = 0; i < nbMountains; i++) {
			const currentSegmentX = (i * size.width) / nbMountains;
			const nextX = ((i + 1) * size.width) / nbMountains;

			const subDivision = Generator.getInt(2, 0);
			const subSegmentWidth = size.width / nbMountains / subDivision;
			let prevX = currentSegmentX;

			for (let j = 0; j < subDivision; j++) {
				const xValue = prevX + Generator.getInt(subSegmentWidth, subSegmentWidth / 6);

				this._mountains.push(
					CartesianPoint(xValue, Generator.getInt(size.height + 100, size.height - 100)),
				);

				prevX += subSegmentWidth;
			}
		}

		this._step = 4;
		this._nextStep = 4;

		Drawer.background('#BBEEBB');
	}

	draw() {
		if (this._step !== this._nextStep) {
			this._step = this._nextStep;
		}

		const size = System.getWindowSize();
		const prevX = this._x;
		const prevY = this._y;

		Drawer.setStroke('#11331110');

		this._mountains.forEach((mountain) => {
			mountain.x += Generator.getInt(this._step / 2, -this._step / 2);
			mountain.y += Generator.getInt(this._step - 1, -this._step);
		});

		Drawer.addSmoothLine(this._mountains, 8);
	}
}

Drawers.push(Mountain);
