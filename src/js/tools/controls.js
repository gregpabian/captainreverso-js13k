var controls = {
	k: {
		'u': 0,
		'd': 0,
		'l': 0,
		'r': 0,
		'a': 0,
		'p': 0
	},
	m: {
		37: 'l', // left
		38: 'u', // up
		39: 'r', // right
		40: 'd', // down
		65: 'l', // a
		68: 'r', // d
		83: 'd', // s
		87: 'u', // w
		32: 'a', // space
		27: 'p', // esc
		13: 'a' // enter
	},
	mx: 0,
	my: 0,
	mb: 0
};

bind('keydown', function(event) {
	var key = controls.m[event.keyCode];
	if (key) controls.k[key] = 1;
});

bind('keyup', function(event) {
	var key = controls.m[event.keyCode];
	if (key) controls.k[key] = 0;
});

bind('mousemove', function(event) {
	controls.mx = event.offsetX === undefined ? event.layerX : event.offsetX;
	controls.my = event.offsetY === undefined ? event.layerY : event.offsetY;
}, cfg);

bind('mousedown', function() {
	controls.mb = 1;
});

bind('mouseup', function() {
	controls.mb = 0;
});

bind('blur', function() {
	for (var n in controls.k) controls.k[n] = 0;
	if (state === 'p') setState('z');
});
