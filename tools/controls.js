const panel = FD.create('div', {
	style: {
		backgroundColor: 'rgba(255, 255, 255, .4)',
		borderRadius: '2px',
		fontSize: '0.75em',
		fontFamily: 'sans-serif',
		padding: 8,

		position: 'absolute',
		bottom: 16,
		right: 16,
	},
});

document.body.appendChild(panel);

const Controls = {
	_active: [],

	add: (...controllers) => {
		controllers.forEach((controller) => {
			Controls._active.push(controller);
			panel.appendChild(controller.component);

			if (controller.refresh) {
				Loop.addToEveryFrame(controller.refresh.bind(this, controller.component));
			}
		});
	},

	addDefaultControllers: () => {
		Controls.add(
			Controls.createButton({
				text: 'Start',
				onChange: (e) => {
					if (Loop.isRunning()) {
						Loop.stop();
						e.target.innerText = 'Start';
					} else {
						Loop.start();
						e.target.innerText = 'Stop';
					}
				},
			}),
			Controls.createInfo({
				text: 'No iterations',
				refresh: (component) => {
					component.innerText = `${Loop.getIterations()} iterations`;
				},
			}),
		);
	},

	createButton: ({ text, onChange }) => {
		const component = FD.create('button', {
			innerText: text,
		});

		component.addEventListener('click', onChange);

		return {
			component,
		};
	},

	createInfo: ({ text, refresh }) => {
		const component = FD.create('div', {
			innerText: text,
			style: {
				color: 'white',
				margin: '4px 0',
			},
		});

		return {
			component,
			refresh,
		};
	},

	createInput: ({ type, value, onChange }) => {
		const component = FD.create('input', {
			type,
			value,
		});

		component.addEventListener('change', onChange);

		return {
			component,
		};
	},

	createRange: ({ min, max, text, value, onChange }) => {
		const component = FD.create(
			'div',
			{
				style: {
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'space-between',
				},
			},
			[
				FD.create('label', {
					style: {
						color: 'white',
					},
					innerText: text,
				}),
				FD.create('input', {
					min,
					max,
					type: 'range',
					value,
				}),
			],
		);

		component.addEventListener('change', onChange);

		return {
			component,
		};
	},

	createSelector: ({ options }) => {
		const component = FD.create(
			'selector',
			{},
			options.map((opt) => FD.create('option', { key: opt.key, innerText: opt.value })),
		);
	},
};
