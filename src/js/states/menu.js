var loaded = false;

states['m'] = {
	init: function() {
		camera.save();
		if (!loaded) {
			this.l = loader.s['l'];
			this.ln = new Label(w / 2, h / 2 + 90, 'pixel chinchilla', 4);
			this.ls = new Label(w / 2, h / 2 + 114, 'presents', 2);
			this.lt = 0;
		}

		var items = {};

		items['start'] = function() {
			setState('st');
		};

		items['credits'] = function() {
			setState('c');
		};

		this.ui = [
			new Label(w / 2, 50, 'captain reverso', 10),
			new Label(w / 2, 100, 'and the missing truckers', 4, '0cd'),
			new Menu(w / 2, h / 2, items),
			soundBtn,
			centerBtn,
			new Label(160, h - 30, 'controls: wasd/arrows - space - esc', 2)
		];
	},
	u: function() {
		if (loaded) {
			for (var i = 0; i < this.ui.length; i++) {
				if (this.ui[i].u) this.ui[i].u();
			}
			return;
		}

		this.lt += step;

		if (this.lt > 1 && !this.s) {
			sound.p('w');
			this.s = 1;
		}

		if (this.lt > 3) {
			loaded = 1;
		}
	},
	render: function() {
		if (loaded) {
			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, w, h);
			addShadow(ctx, w, h);

			for (var i = 0; i < this.ui.length; i++) {
				this.ui[i].render();
			}
			return;
		}

		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, w, h);

		this.l.render(ctx, w / 2, h / 2, 0, 2);
		this.ln.render(ctx);
		if (this.lt > 1) this.ls.render(ctx);
	}
};
