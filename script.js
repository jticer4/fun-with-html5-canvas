const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = .8 * window.innerWidth;
canvas.height = .70 * window.innerHeight;
// set the color of the paintbrush
ctx.strokeStyle = '#BADA55';
// set the lines to be round where they join
ctx.lineJoin = 'round';
// set the line to be round at the end
ctx.lineCap = 'round';
//set the line width
ctx.lineWidth = 80;
//will allow the painting functionality only when the mouse is clicked down
let isDrawing = false;
//sets the starting point of the line
let lastX = 0;
//sets the ending point of the line
let lastY = 0;
//set the hue color
let hue = 0;
//sets the value based on weather the line is increasing in size or not
let direction = true;

function draw(e) {
	if(!isDrawing) return; //stops the function from running when they are not moused down
	console.log(e);
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	ctx.beginPath();
	// start from
	ctx.moveTo(lastX, lastY);
	// go to
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();
	//set the starting point to the location of the mouse click
	[lastX, lastY] = [e.offsetX, e.offsetY];
	hue++;
	if(hue >= 360) {
		hue = 0;
	}
	//if the line is getting too big or is too small flip it's direction so that it goes in the opposite direction
	if(ctx.lineWidth >= 240 || ctx.lineWidth <= 1) {
		direction = !direction;
	}
	//if direction is true then increase the size of the line, otherwise decrease it
	if(direction) {
		ctx.lineWidth++;
	} else {
		ctx.lineWidth--;
	}
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
	isDrawing = true;
	//set the starting point to the location of the mouse click
	[lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
//if you leave the canvas it will stop you from drawing immediately upon return
canvas.addEventListener('mouseout', () => isDrawing = false);