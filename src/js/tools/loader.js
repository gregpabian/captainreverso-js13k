function drawParking(ctx, x, y, r, h, color) {
	var w = 60 - 2;
	h -= 2;
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(r);
	ctx.beginPath();
	ctx.moveTo(-w / 2, h / 2);
	ctx.lineTo(-w / 2, -h / 2);
	ctx.lineTo(w / 2, -h / 2);
	ctx.lineTo(w / 2, h / 2);
	ctx.lineWidth = 2;
	ctx.strokeStyle = color || '#357';
	ctx.stroke();
	ctx.restore();
}

var loader = {
	s: {
		'p': {
			render: function(ctx, x, y, r) {
				drawParking(ctx, x, y, r, 100);
			}
		},
		't': {
			render: function(ctx, x, y, r, c) {
				drawParking(ctx, x, y, r, 200, c);
			}
		}
	},

	l: function(done) {
		var that = this,
			spritesheet;

		function render(ctx, x, y, r, s, w, h) {
			s = s || 1;
			w = (w || this.w) * s;
			h = (h || this.h) * s;

			ctx.save();
			ctx.translate(x, y);
			if (r) ctx.rotate(r);
			ctx.drawImage(this.img, 0, 0, this.w, this.h, -w / 2, -h / 2, w, h);
			ctx.restore();
		}

		function makeSprite(name, data) {
			var sprite = that.s[name] = {
				img: makeCanvas(),
				render: render
			};

			var s = scale;

			if (name === 'f') {
				s = 1;
			}

			sprite.img.width = sprite.w = data[2] * s;
			sprite.img.height = sprite.h = data[3] * s;
			sprite.ctx = dis(sprite.img.getContext('2d'));
			sprite.ctx.drawImage(
				spritesheet,
				data[0], data[1],
				data[2], data[3],
				0, 0,
				data[2] * s, data[3] * s
			);
		}

		spritesheet = new Image();
		spritesheet.onload = function() {
			for (var name in sprites) makeSprite(name, sprites[name]);
			done();
		};
		spritesheet.src = 'sprites.png';
	}
};
