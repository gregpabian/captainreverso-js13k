function Button(x, y, t, cb, w, h, e, s) {
	this.x = x;
	this.y = y;
	this.cb = cb;
	this.w = w || 250;
	this.h = h || 50;
	this.a = 0; // active
	this.la = 1; // last active
	this.f = false;
	this.e = e === undefined ? 1 : e;
	this.txt = new Label(x, y, t, s || 4, this.e ? 0 : '999');
}

Button.prototype = {
	u: function() {
		if (this.e) {
			this.a = this.cb && this._hasPoint(controls.mx, controls.my);

			if ((this.a || this.f) && !this.la) sound.p('c');
			if ((this.a && controls.mb) || (this.f && controls.k['a'])) {
				controls.mb = 0;
				controls.k['a'] = 0;
				this.cb();
			}

			this.la = this.a || this.f;
		}
	},

	_hasPoint: function(x, y) {
		return !(x < (this.x - this.w / 2) || x > (this.x + this.w / 2) || y < (this.y - this.h / 2) || y > (this.y + this.h / 2));
	},

	render: function() {
		ctxfg.beginPath();
		ctxfg.fillStyle = 'rgba(0,0,0, ' + (this.e ? (this.a || this.f) ? 0.6 : 0.3 : 0.1) + ')';
		ctxfg.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
		this.txt.render();
	}
};
