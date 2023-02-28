const words = "In Xanadu did Kubla Khan A stately pleasure-dome decree: Where Alph, the sacred river,ran Through caverns measureless to man Down to a sunless sea.So twice five miles of fertile ground With walls and towers were girdled round;And here were gardens bright with sinuous rills Where blossom'd many an incense-bearing tree; And here were forests ancient as the hills, Enfolding sunny spots of greenery".split("");

const colorSchemes = [
	["#50ffdd","#8cc8fa","#5aff90","#b5838d", "#6d6875"],
	["#D6BE75", "#e43d00", "#e96211", "#2e466a"],
	["#ffa404", "#cdbb7f", "#2e2a1f","#d4d700","#dddf00","#eeef20"],
	["#FFFFFF","#c9ab62","#a47f4d","#dfa91f","#ed9c4e","#efea5a","#f1c453","#f29e4c"].reverse()
]; 


let myFont;
function preload() {
  myFont = loadFont('BASKVILL.TTF');
}

function setup() {
	
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');
	textSize(290);
	textAlign(CENTER, CENTER);
	textFont(myFont);
	noiseSeed(floor(random(10e6)));
	noStroke();
  
	 
	const minSize = 40
	const maxSize = minSize + 10
	const noiseScale = 9e-11;

	const n = 5;
	for (let i = 0; i < 10000; i++) { //noprotect
		let size;
		if(i > 6000){
			size = random(minSize, maxSize);
		}else{
		  size = map((i/6000)**0.8, 0, 1, 200, minSize);
		}
		textSize(size);

		let x = random(width);
		let y = random(height);
		
		if(floor(x/width*n*2)%2 == 0){
			fill(lerpColorScheme(curlNoise(x*noiseScale, (y+0)*noiseScale , 0 ), colorSchemes[1]));
		}else{
			fill(lerpColorScheme(curlNoise(x*noiseScale, (y+ 0)*noiseScale , 0 ), colorSchemes[3]));
		}
	
		const a = 0;
		text(random(words), x+random(-a, a), y+random(-a, a));
	}
}

function lerpColorScheme(n, colors) {
	let i = n * (colors.length) % (colors.length);
	let color1 = color(colors[floor(i)])
	let color2 = color(colors[(floor(i) + 1) % colors.length])
	return lerpColor(color1, color2, i % 1)
}

function curlNoise(x, y, z) {
	const eps = 0.0000001;
	let n1, n2, a, b;
	x = x / eps;
	y = y / eps;
	n1 = noise(x, y + eps, z);
	n2 = noise(x, y - eps, z);
	a = (n1 - n2) / (2 * eps);

	n1 = noise(x + eps, y, z);
	n2 = noise(x - eps, y, z);

	b = (n1 - n2) / (2 * eps);

	let angle = createVector(a, -b).heading();
	if(angle < 0) angle += TAU;
	return angle/TAU;
	
}
function mousePressed() {
	setup();
}