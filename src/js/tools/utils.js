function deg2rad(deg) {
	return deg * Math.PI / 180;
}

function rad2deg(rad) {
	return rad * 180 / Math.PI;
}

var DEG_90 = deg2rad(90);
var TWO_PI = Math.PI * 2;

function inherit(target, source) {
	target.prototype = Object.create(source.prototype, {
		constructor: {
			value: target,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});
}

function extend(target, source) {
	var keys = Object.keys(source);
	var i = keys.length;
	while (i--) target[keys[i]] = source[keys[i]];

	return target;
}

function makeCanvas() {
	return document.createElement('canvas');
}

function bind(event, callback, target) {
	(target || window).addEventListener(event, callback);
}

function h2r(hex) {
	function dec(h) {
		return parseInt(h + '' + h, 16);
	}

	return {
		r: dec(hex[0]),
		g: dec(hex[1]),
		b: dec(hex[2])
	};
}

function isOnLeft(a, b, c) {
	return ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)) > 0;
}

function dis(ctx) {
	['mozI', 'webkitI', 'msI', 'i'].forEach(function(name) {
		ctx[name + 'mageSmoothingEnabled'] = false;
	});

	return ctx;
}

var time = window.performance && window.performance.now ? function() {
	return window.performance.now();
} : function() {
	return +new Date();
};

var colors = ['055', '050', '005', '000'];

function colorize(ctx, w, h) {
	var id = ctx.getImageData(0, 0, w, h);
	var data = id.data;
	var c = colors.shift();
	colors.push(c);
	var col = h2r(c);

	for (var i = 0, len = data.length; i < len; i += 4) {
		if (data[i] === data[i + 1] && data[i] === data[i + 2]) {
			data[i] += col.r;
			data[i + 1] += col.g;
			data[i + 2] += col.b;
		}
	}

	ctx.putImageData(id, 0, 0);
}

function addShadow(ctx, w, h) {
	ctx.shadowBlur = 200;
	ctx.shadowColor = '#000';
	ctx.lineWidth = 50;
	ctx.strokeRect(-25, -25, w + 75, h + 75);
	ctx.shadowBlur = 0;
	ctx.lineWidth = 2;
}

function intersect(a, b, c, d) {
	var px = b.x - a.x;
	var py = b.y - a.y;
	var qx = d.x - c.x;
	var qy = d.y - c.y;
	var det = -qx * py + px * qy;
	var s = (-py * (a.x - c.x) + px * (a.y - c.y)) / det;
	var t = (qx * (a.y - c.y) - qy * (a.x - c.x)) / det;

	if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
		return {
			x: a.x + (t * px),
			y: a.y + (t * py)
		};
	}

	return null;
}

function normalizeAngle(angle) {
	return angle - TWO_PI * Math.floor((angle + Math.PI) / TWO_PI);
}
