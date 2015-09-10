states['c'] = {
	init: function() {
		camera.save();
		this.ui = [
			new Button(w / 2, h - 45, 'close', function() {
				setState('m');
			}, 110),
			new Label(w / 2, 50, 'captain reverso', 10),
			new Label(w / 2, 100, 'and the missing truckers', 4, '0cd'),
			new Label(w / 2, 132, 'js13kGames 2015 entry', 3),
			new Label(w / 2, 240, 'created by', 4),
			new Label(w / 2, 280, 'Greg Pabian', 6),
			new Label(w / 2, 320, 'pixelchinchilla.com', 4),
			new Label(w / 2, 350, 'twitter: gregpabian', 4),
			new Label(w / 2, 380, 'github: gregpabian', 4)
		];

		this.ui[0].f = true;
	},
	u: function() {
		for (var i = 0; i < this.ui.length; i++) {
			if (this.ui[i].u) this.ui[i].u();
		}
	},
	render: function() {
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, w, h);
		addShadow(ctx, w, h);

		for (var i = 0; i < this.ui.length; i++) {
			this.ui[i].render();
		}
	}
};
