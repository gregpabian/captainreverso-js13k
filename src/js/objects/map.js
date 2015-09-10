function Map(w, h) {
	this.c = makeCanvas();
	this.c.width = w;
	this.c.height = h;
	this.ctx = this.c.getContext('2d');
	this.ctx.fillStyle = '#024';
	this.ctx.fillRect(0, 0, w, h);

	var id = this.ctx.getImageData(0, 0, w, h),
		data = id.data,
		len, i;

	for (i = 0, len = data.length; i < len; i += 4) {
		var r = Math.random() < 0.5 ? -5 : 5;
		data[i] = (data[i]) + r;
		data[i + 1] = (data[i + 1]) + r;
		data[i + 2] = (data[i + 2]) + r;
	}

	this.ctx.putImageData(id, 0, 0);
	addShadow(this.ctx, w, h);

	this.walls = [
		new Wall(-10, h / 2, 0, 20, h + 40),
		new Wall(w / 2, -10, 0, w, 20),
		new Wall(w / 2, h + 10, 0, w, 20),
		new Wall(w + 10, h / 2, 0, 20, h + 40)
	];
}

Map.prototype = {
	a: function(obj) {
		obj.render(this.ctx);
	},

	render: function() {
		ctx.drawImage(this.c, 0, 0);
	}
};
