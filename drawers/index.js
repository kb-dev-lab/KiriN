class BasicDrawer {
	getControls() {
		return [];
	}

	draw(i) {
		throw new Error('No draw() implemented');
	}

	init() {
		throw new Error('No init() implemented');
	}
}

const Drawers = [];
