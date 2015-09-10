states['s'] = {
	init: function() {
		camera.save();

		this.c = [];
		this.a = level;

		function pickLevel(i) {
			return function() {
				level = i;
				setState('p');
			};
		}

		this.n = new Label(w / 2, h - 100, ' ', 4);
		this.ui = [this.n, resetBtn];

		for (var i = 0; i < levels.length; i++) {
			var x = w / 5 + (i - ~~(i / 4) * 4) * (w / 5);
			var y = h / 5 + ~~(i / 4) * (h / 5);
			this.c.push(new Button(x, y, !i ? 't' : i, pickLevel(i), 70, 70, i > 0 ? !!scores[i - 1] : 1, 6));
			this.ui.push(new Score(x, y + 60, scores[i]));
		}

		this.c.push(new Button(w / 2, h - 45, 'back', function() {
			setState('m');
		}, 100));

		this.ui = this.ui.concat(this.c);
	},
	u: function() {
		var len = this.c.length,
			d = 0;

		for (var i = 0; i < len; i++) {
			this.c[i].f = this.a === i;
			if (this.c[i].u) this.c[i].u();
		}

		if (controls.k['d']) {
			controls.k['d'] = 0;
			d = 4;
		}

		if (controls.k['u']) {
			controls.k['u'] = 0;
			d = -4;
		}

		if (controls.k['l']) {
			controls.k['l'] = 0;
			d = -1;
		}

		if (controls.k['r']) {
			controls.k['r'] = 0;
			d = 1;
		}

		this.a += d;

		this.a = this.a < 0 ? 0 : this.a > len - 1 ? len - 1 : this.a;

		while (!this.c[this.a].e) {
			this.a += d > 0 ? 1 : -1;
		}

		this.n.st(this.a === this.c.length - 1 ? ' ' : this.a ? 'level ' + this.a : 'tutorial');
		resetBtn.u();
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
