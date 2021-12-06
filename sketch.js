
let filename = "bedsheetAfter";

let width = 1000;
let height = 500;

let colourPalettes = [['#152A3B', '#0D809C', '#F5C03E', '#D63826', '#EBEBD6'],
 									   ['#0F4155', '#5399A1', '#8CA96B', '#CB5548', '#E7E6F5'],
 									   ['#E8614F', '#F3F2DB', '#79C3A7', '#668065', '#4B3331'],
										 ['#DBE5EC', '#336B87', '#2A3132', '#E94D35', '#EFAC55']];

let currentPalette;

let queueNumber = [0, 1, 2, 3, 4];
let paletteIndex = 2;

let gridsNumber = 10;
let gridSize;
var lat;
var lon;
var weather;
let i=0;


function setup() {
	var cnv = createCanvas(width, height);
	background(25);
	cnv.position(180, 260, 'relative');
	angleMode(DEGREES);
  	noStroke();
	//noLoop();
	if (!navigator.geolocation) {
		alert("navigator.geolocation is not available,showing designs for the default location India");
	  }
	navigator.geolocation.getCurrentPosition(setPos, handleError);
}

function setPos(position) {
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	loadData();
}

function handleError(error) {
	alert("Your location is not available,showing designs for the default location India");
	console.log(error);
	var defaultLocation = {
	  coords: {
		latitude: 20.5937,
		longitude: 78.9629,
	  },
	};
	setPos(defaultLocation);
}

function loadData(){ 
	loadJSON('https://api.openweathermap.org/data/2.5/air_pollution/history?lat=' + lat +'&lon='+ lon +'&start=1606223802&end=1606482999&appid=b4b761acffa89af6a32f12272b0512cd',gotData);
}

function gotData(data){
	weather = data;
}

function draw() {
	if(weather){
    var r = round(random(weather.list[i].components.co));
    var g = round(random(weather.list[i].components.o3));
    var b = round(random(weather.list[i].components.no2));
	  i++;
	gridSize = width / gridsNumber;
	currentPalette = colourPalettes[paletteIndex];
	for (let x = 0; x < width; x += gridSize) {
		for (let y = 0; y < height; y += gridSize) {
			queueNumber = shuffle(queueNumber);
      fill(currentPalette[queueNumber[0]]);
			rect(x, y, gridSize, gridSize);
      fill(r,g,b);
			switch(round(random(10*weather.list[i].components.so2))) {
				  	case 1: triangle(x, y, x + gridSize, y, x, y + gridSize); break;
					case 2: triangle(x, y, x + gridSize, y, x + gridSize, y + gridSize); break;
					case 3: triangle(x + gridSize, y + gridSize, x + gridSize, y, x, y + gridSize); break;
					case 4: triangle(x, y, x, y + gridSize, x + gridSize, y + gridSize); break;
					case 5: arc(x + gridSize/2, y + gridSize/2, gridSize, gridSize, 0, 180); break;
					case 6: arc(x + gridSize/2, y + gridSize/2, gridSize, gridSize, 90, 270); break;
					case 7: arc(x + gridSize/2, y + gridSize/2, gridSize, gridSize, 180, 0); break;
					case 8: arc(x + gridSize/2, y + gridSize/2, gridSize, gridSize, 270, 90); break;
					case 9: ellipse(x + gridSize/2, y + gridSize/2, gridSize, gridSize); break;
			}
		}
	}
	paper();
}
}

function paper() {
  for (let i = 0; i < width; i += 2) {
    for (let j = 0; j < width; j += 2) {
      fill(random(175, 225), 25);
      rect(i, j, 2, 2);
    }
	}
}

function mouseClicked() {
	paletteIndex =  (paletteIndex + 1) % 4;
	redraw();
}

function keyPressed() {
	if (keyIsDown(UP_ARROW) && gridsNumber !== 10) {
		gridsNumber += 1;
		redraw();
	}
	
	if (keyIsDown(DOWN_ARROW) && gridsNumber !== 1) {
		gridsNumber -= 1;
		redraw();
	}
}

 

