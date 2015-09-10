function Label(x, y, text, scl, col) {
	this.x = x;
	this.y = y;
	this.s = scl || scale;
	this.spr = loader.s['f'];
	this.col = col;
	this.c = makeCanvas();
	this.st(text);
}

var chars = 'abcdefghijklmnopqrstuvwxyz1234567890!?".,\'$()-:;=[]/';

Label.prototype = {
	st: function(text, col) {
		col = col || this.col;
		this.txt = String(text).toLowerCase().split('');
		this.clr = h2r(col || 'fff');
		this.c.width = this.txt.length * 4 - 1;
		this.c.height = this.spr.h;

		var ctx = this.c.getContext('2d');
		var i, len;

		ctx.clearRect(0, 0, this.c.width, this.c.height);

		for (i = 0, len = this.txt.length; i < len; i++) {
			var j = chars.indexOf(this.txt[i]);
			if (j > -1) ctx.drawImage(this.spr.img, j * 3, 0, 3, this.spr.h, i * 4, 0, 3, this.spr.h);
		}

		var imageData = ctx.getImageData(0, 0, this.c.width, this.spr.h);
		var data = imageData.data;

		for (i = 0, len = data.length; i < len; i += 4) {
			data[i] = this.clr.r;
			data[i + 1] = this.clr.g;
			data[i + 2] = this.clr.b;
		}

		ctx.putImageData(imageData, 0, 0);

		this.w = this.c.width * this.s;
		this.h = this.spr.h * this.s;
	},

	render: function() {
		ctxfg.drawImage(this.c, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
	}
};
