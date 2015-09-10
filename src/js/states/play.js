states['p'] = {
	ts: [
		['welcome to the tutorial!', 3, 200, 130],
		['your goal is to park each trailer in its place...', 4],
		['...without destroying it!', 3],
		['drive your truck and reverse it to attach the trailer', 4, 230, 370, 1],
		['notice the trailer indicator turns green...', 4, w / 2, 480],
		['...once your truck is properly positioned', 4, 0, 0, 2],
		['press [space] to attach the trailer', 3, 0, 0, 3],
		['reverse the trailer to the highlighted parking spot', 4, 580, 180, 4],
		['notice the parking spot turns green...', 4],
		['...once the trailer is properly parked', 4, 0, 0, 5],
		['now press the [space] to detach the trailer', 4, 0, 0, 6]
	],

	init: function(resume) {
		if (resume) {
			camera.restore();
			return;
		}

		// tutorial
		if (!level) {
			this.td = 4;
			this.tus = [].concat(this.ts);
			this.tul = new Label(0, 0, ' ');
			this.tuc = null;
			this.tut = 0;
		}

		this.str = new Steering(w / 2, h - 20);
		this.ui = [this.str];

		var data = levels[level];
		this.n = data['n'];
		this.w = data['w'];
		this.h = data['h'];
		this.b = data['t'][0];
		this.s = data['t'][1];
		this.g = data['t'][2];

		this.p = new Truck(data['p'][0], data['p'][1], deg2rad(data['p'][2]));
		this.str.t = this.p;
		this.m = new Map(this.w, this.h);
		loader.s.p.render(this.m.ctx, this.p.c.x, this.p.c.y, this.p.r);

		this.o = [];
		this.tr = [];
		this.tt = [];

		this.t = this.b ? new Timer(this.b) : null;
		this.tl = this.t ? new Label(w / 2, 30, this.t.txt, 4) : null;
		if (this.tl) this.ui.push(this.tl);

		var i, len;
		var trs = [];

		for (i = 0, len = data['o'].length; i < len; i += 4) {
			var C = types[typeMap[data['o'][i]]];
			if (C) {
				var o = new C(data['o'][i + 1], data['o'][i + 2], deg2rad(data['o'][i + 3]));
				if (C === Trailer) {
					trs.push(o);
				} else {
					this.o.push(o);
					o.draw(this.m.ctx);
					o.dr = true;
				}
			}
		}

		function addTarget(x, y, r, t) {
			this.tt.push(new Target(x, y, r, t));
		}

		for (i = 0, len = data['tr'].length; i < len; i += 3) {
			var t = new Trailer(data['tr'][i], data['tr'][i + 1], deg2rad(data['tr'][i + 2]));
			loader.s.t.render(this.m.ctx, t.c.x, t.c.y, t.r);
			t.ind = new Indicator(this.p, t);
			addTarget.call(this, data['tt'][i], data['tt'][i + 1], deg2rad(data['tt'][i + 2]), t);
			this.tr.push(t);
		}

		this.tr = this.tr.concat(trs);
		this.o = this.o.concat(this.m.walls);

		camera.center(this.w / 2, this.h / 2);
	},

	u: function() {
		if (controls.k['p']) {
			controls.k['p'] = 0;
			return setState('z');
		}

		// tutorial logic
		if (!level) {
			if (this.tut && this.tut > 0) {
				this.tut -= step;
			}

			if (!this.tuc ||
				// timer done and no additional conditions
				(this.tut < 0) && (!this.tuc[4] ||
					// truck close to the trailer
					(this.tuc[4] === 1 && this.p.c.distanceTo(this.tr[0].c) < 180) ||
					// truck can attach the trailer
					(this.tuc[4] === 2 && this.p.cc) ||
					// truck attached the trailer
					(this.tuc[4] === 3 && this.p.trailer) ||
					// trailer close to the target
					(this.tuc[4] === 4 && this.p.trailer && this.p.trailer.c.distanceTo(this.tt[0].c) < 100) ||
					// trailer position is valid
					(this.tuc[4] === 5 && this.tt[0].v)
				)
			) {
				if (this.td) this.td--;
				this.tuc = this.tus.shift();
				this.tul.st(this.tuc[0]);

				if (this.tuc[1]) {
					this.tut = this.tuc[1];
				} else {
					this.tut = null;
				}

				if (this.tuc[2]) {
					this.tul.x = this.tuc[2];
					this.tul.y = this.tuc[3];
				}
			}
		}

		camera.u(this.p.c, this.w, this.h);

		if (this.t) {
			this.t.u();
			this.tl.st(this.t.txt);
		}

		if (level || !this.td) this.p.u();
		this.p.collideObjects(this.o);
		this.p.collideTrailers(this.tr);
		this.p.checkTrailers(this.tr);
		this.str.on = this.p.cc;

		var i, len;

		for (i = 0, len = this.tr.length; i < len; i++) {
			this.tr[i].u();
		}

		for (i = 0, len = this.tt.length; i < len; i++) {
			var tt = this.tt[i];
			if (!tt.e) {
				sound.p('w');
				this.tt.splice(i, 1);
				tt.v = false;
				tt.a = false;
				tt.t.ind = false;
				tt.t.hp = false;
				this.m.a(tt);
				len--;
				i--;
			}
		}

		// win condition
		if (!this.tt.length) {
			var score = this.t ? this.b - this.t.v <= this.g ? 3 : this.b - this.t.v <= this.s ? 2 : 1 : 3;
			if (!scores[level] || scores[level] < score) {
				scores[level] = score;
				localStorage.setItem('ts', scores.join(''));
			}
			return setState('z', true, score);
		}

		// fail conditions
		if (this.t && this.t.v <= 0) {
			return setState('z', false, 'you run out of time :(');
		}

		if (this.p.hp.v <= 0) {
			return setState('z', false, 'you destroyed your truck :(');
		}

		for (i = 0, len = this.tr.length; i < len; i++) {
			if (this.tr[i].hp.v <= 0) {
				return setState('z', false, 'you destroyed the load :(');
			}
		}

		for (i = 0; i < this.ui.length; i++) {
			if (this.ui[i].u) this.ui[i].u();
		}
	},

	render: function() {
		var i, len;

		this.m.render();

		for (i = 0, len = this.tt.length; i < len; i++) {
			this.tt[i].render();
		}

		this.p.render();

		for (i = 0, len = this.tr.length; i < len; i++) {
			this.tr[i].render();
		}

		this.p.hp.render(ctx);

		for (i = 0, len = this.o.length; i < len; i++) {
			if (this.o[i].render) this.o[i].render();
		}

		if (!level) {
			this.tul.render();
		}

		for (i = 0, len = this.ui.length; i < len; i++) {
			this.ui[i].render();
		}
	}
};
