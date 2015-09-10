states['st'] = {
	intro: [
		[0, 'breaking news!!!'],
		[2, 'a mysterious disappearence of all truckers...'],
		[5, '...paralyzed the transport!'],
		[7, 'total chaos reigned over the city!'],
		[10, 'will someone stop this madness???'],
		[13, 'that\'s something for captain reverso!', 1],
		[16, 'time to move, i\'ve got a city to save!', 1],
		[19, ' ', 1]
	],
	outro: [
		[0, '...in other news:'],
		[2, 'missing truckers we\'re all found...'],
		[5, '...locked down in an abandoned trailer'],
		[8, 'the transport situation is now back to normal'],
		[11, 'thanks to a mysterious hero...'],
		[14, '...we can all sleep peacefully again!'],
		[17, 'damn right you can!', 1],
		[21, ' ', 1]
	],
	exit: function() {
		setState(this.d ? 'c' : 's');
	},
	init: function(done) {
		camera.save();
		this.d = done;

		this.trl = new Label(220, 90, ' ', 2);
		this.tvl = new Label(w - 200, 190, ' ', 2);

		this.ui = [
			new Button(w / 2, h - 45, 'skip', this.exit.bind(this), 100),
			this.trl,
			this.tvl
		];

		this.l = this.d ? this.outro : this.intro;
		this.t = 0;

		this.c = loader.s['r'];
		this.tv = loader.s['tv'];

		this.ui[0].f = true;
	},
	u: function() {
		this.t += step;

		var i, t;

		for (i = 0; i < this.l.length; i++) {
			if (this.t >= this.l[i][0]) {
				t = this.l[i];
			}
		}

		if (t) {
			this.trl.st(t[2] ? t[1] : ' ');
			this.tvl.st(t[2] ? ' ' : t[1]);
		}

		if (this.t > this.l[this.l.length - 1][0] || controls.k['p']) {
			controls.k['p'] = 0;
			return this.exit();
		}

		for (i = 0; i < this.ui.length; i++) {
			if (this.ui[i].u) this.ui[i].u();
		}
	},
	render: function() {
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, w, h);

		ctx.fillStyle = '#543';
		ctx.fillRect(0, h / 2, w, h / 2);

		ctx.fillStyle = '#987';
		ctx.fillRect(0, h / 2, w, 20);

		ctx.drawImage(this.c.img, 50, h / 2 - this.c.h * 2, this.c.w * 3, this.c.h * 3);
		ctx.drawImage(this.tv.img, w - 200, h / 2 - this.tv.h * 1.5, this.tv.w * 3, this.tv.h * 3);

		addShadow(ctx, w, h);

		for (var i = 0; i < this.ui.length; i++) {
			this.ui[i].render();
		}
	}
};
