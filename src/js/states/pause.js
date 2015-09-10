states['z'] = {
	init: function(success, reason) {
		camera.save();
		var items = {};
		var title;
		var o = 0;

		this.ui = [];

		if (success === true) {
			o = 30;
			items['continue'] = function() {
				level++;
				if (level === levels.length) {
					setState('st', true);
				} else {
					setState('p');
				}
			};
			title = 'level complete';
			this.ui.push(
				new Label(w / 2, 120, 'your score:', 4),
				new Score(w / 2, 160, reason)
			);
		} else if (success === false) {
			sound.p('f');
			title = 'level failed';
			this.ui.push(
				new Label(w / 2, 120, reason, 4)
			);
		} else {
			title = 'paused';
			items['resume'] = function() {
				setState('p', true);
			};
		}

		items['restart'] = function() {
			setState('p');
		};

		items['change level'] = function() {
			setState('s');
		};

		items['main menu'] = function() {
			setState('m');
		};

		this.m = new Menu(w / 2, h / 2 + o, items);
		this.ui.push(new Label(w / 2, 50, title, 10), this.m, soundBtn, centerBtn);
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
