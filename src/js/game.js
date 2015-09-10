cm.width = cfg.width = w;
cm.height = cfg.height = h;
var ctx = dis(cm.getContext('2d'));
var ctxfg = dis(cfg.getContext('2d'));
var dt = 0;

wrap.style.cssText = 'width:' + w + 'px;height:' + h + 'px;margin:-' + (h / 2) + 'px 0 0 -' + (w / 2) + 'px;';

var types = {
	'bs': BuildingSmall,
	'bb': BuildingBig,
	'tl': Trailer,
	'w': Wall
};

function setState(name, o1, o2) {
	state = name;
	states[state].init(o1, o2);
	sound.cancelAll();
}

function loop() {
	var now = time();

	dt += Math.min(1, (now - last) / 1000);

	last = now;

	while (dt > step) {
		dt -= step;
		states[state].u();
	}

	ctxfg.clearRect(0, 0, w, h);

	ctx.save();
	ctx.translate(Math.round(camera.x) + camera.sx, Math.round(camera.y) + camera.sy);
	states[state].render();
	ctx.restore();

	requestAnimationFrame(loop);
}

function init() {
	last = time();
	camera = new Camera(w, h);
	var s = localStorage.getItem('ts');
	var e = Array.apply(null, Array(levels.length)).map(Number.prototype.valueOf, 0);
	scores = s ? s.split('').map(Number) : [].concat(e);

	gradient = ctx.createLinearGradient(0, 0, 0, h);
	gradient.addColorStop(0, '#024');
	gradient.addColorStop(1, '#078');

	soundBtn = new Button(w - 70, h - 40, 'sound:' + (sound.m ? 'off' : 'on'), function() {
		sound.mute(sound.m ? 0 : 1);
		soundBtn.txt.st('sound:' + (sound.m ? 'off' : 'on'));
	}, 100, 40, 1, 2);

	resetBtn = new Button(w - 70, h - 40, 'reset', function() {
		scores = [].concat(e);
		localStorage.setItem('ts', scores.join(''));
		setState('s');
	}, 100, 40, 1, 2);

	centerBtn = new Button(w - 200, h - 40, 'auto center:' + (autoCenter ? 'on' : 'off'), function() {
		autoCenter = autoCenter ? 0 : 1;
		localStorage.setItem('tc', autoCenter);
		centerBtn.txt.st('auto center:' + (autoCenter ? 'on' : 'off'));
	}, 140, 40, 1, 2);

	setState('m');
	loop();
}

loader.l(init);
