function Menu(x, y, items) {
	this.b = [];
	this.x = x;
	this.y = y;
	this.a = 0;

	var k = Object.keys(items);
	var len = k.length;
	var t = this.y - (len * 70 - 20) / 2 + 25;

	for (var i = 0; i < len; i++) {
		this.b.push(new Button(x, t + 70 * i, k[i], items[k[i]]));
	}
}

Menu.prototype = {
	u: function() {
		var len = this.b.length;

		if (controls.k['u']) {
			controls.k['u'] = 0;
			this.a--;
		}

		if (controls.k['d']) {
			controls.k['d'] = 0;
			this.a++;
		}

		this.a = this.a < 0 ? len - 1 : this.a > len - 1 ? 0 : this.a;

		for (var i = 0; i < len; i++) {
			this.b[i].f = i === this.a;
			this.b[i].u();
		}
	},

	render: function() {
		for (var i = 0, len = this.b.length; i < len; this.b[i++].render());
	}
};
