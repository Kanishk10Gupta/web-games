const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
var theArena = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,4,0,0,0,0,4,0,0,0,0,0,4,1,1,1,1,
				1,1,1,0,0,0,0,4,0,0,0,4,0,0,0,0,0,1,1,1,
				1,1,0,0,0,4,0,0,0,4,0,0,0,4,0,0,4,0,1,1,
				1,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,0,0,0,1,
				1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,
				1,5,2,2,5,1,0,0,0,5,0,0,0,0,5,5,5,0,0,1,
				1,1,1,1,1,1,0,1,0,0,0,5,0,0,0,0,5,0,5,1,
				1,5,3,3,5,1,0,0,5,1,1,0,0,5,0,0,0,0,0,1,
				1,0,0,0,0,1,1,0,0,0,1,5,0,5,0,0,5,0,5,1,
				1,0,0,0,0,1,1,0,5,0,1,0,0,5,0,0,0,0,0,1,
				1,1,0,0,5,5,5,0,1,0,5,0,0,5,0,5,5,0,1,1,
				1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,
				1,1,1,1,5,5,5,1,1,1,0,0,5,0,5,0,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

var slamZone = [1,1,1,1,1,1,1,1,5,1,1,5,1,1,1,1,1,1,1,1,
				1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				1,0,5,1,1,1,1,1,5,0,0,5,1,1,1,1,1,5,0,1,
				1,0,1,4,4,0,0,0,0,0,0,0,0,0,0,4,4,1,0,1,
				1,0,1,4,4,5,0,5,0,5,0,5,0,5,0,4,4,1,0,1,
				1,0,1,4,4,0,0,0,0,0,0,0,0,0,0,4,4,1,0,1,
				1,0,1,4,4,0,5,0,5,0,5,0,5,0,5,4,4,1,0,1,
				1,2,1,4,4,0,0,0,0,0,0,0,0,0,0,4,4,1,2,1,
				1,1,5,1,1,0,1,1,1,1,1,1,1,1,0,1,1,5,1,1,
				1,0,0,0,1,0,1,4,4,4,4,4,4,1,0,1,0,0,0,1,
				5,0,5,0,5,0,1,4,5,3,3,5,4,1,0,5,0,5,0,5,
				1,0,1,0,0,0,1,4,1,0,0,1,4,1,0,0,0,1,0,1,
				1,0,1,1,1,1,1,1,5,0,0,5,1,1,1,1,1,1,0,1,
				1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				1,1,1,1,1,1,1,1,5,1,1,5,1,1,1,1,1,1,1,1];

var oldLevel = [4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,
				4,4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
				4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,
				1,0,0,0,1,1,1,4,4,4,4,1,1,1,1,1,1,0,0,1,
				1,0,0,1,1,0,0,1,4,4,1,1,0,0,0,0,1,0,0,1,
				1,0,0,1,0,0,0,0,1,4,1,0,0,0,0,0,1,0,0,1,
				1,0,0,1,0,0,0,0,0,1,1,0,0,5,0,0,1,0,0,1,
				1,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,
				1,0,0,1,0,0,5,0,0,0,5,0,0,1,0,0,1,0,0,1,
				1,2,2,1,0,0,1,1,0,0,0,0,0,1,0,0,5,0,0,1,
				1,1,1,1,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,1,
				0,3,0,0,0,0,1,4,1,0,0,0,1,1,0,0,0,0,0,1,
				0,3,0,0,0,0,1,4,4,1,1,1,1,1,1,0,0,0,1,1,
				1,1,1,1,1,1,1,4,4,4,4,4,4,4,1,1,1,1,1,4];

var levelList = [oldLevel,theArena,slamZone];
var levelNow = 0;
var TrackGrid = [];

const 	TRACK_ROAD = 0;
const 	TRACK_WALL = 1;
const 	TRACK_PLAYERSTART = 2;
const 	TRACK_GOAL = 3;
const 	TRACK_TREE = 4;
const 	TRACK_FLAG = 5;

function returnTileTypeAtColRow(col,row) {
	if( col >= 0 && col < TRACK_COLS && 
		row >=0 && row < TRACK_ROWS) {
		var trackIndexUnderCoord = rowColToArrayIndex(col,row);
		return (trackGrid[trackIndexUnderCoord]);
	} else {
		return TRACK_WALL;
	}
	
}

function carTrackHandling(whichCar) {
	var carTrackCol = Math.floor(whichCar.x / TRACK_W);
	var carTrackRow = Math.floor(whichCar.y / TRACK_H);
	var trackIndexUnderCar = rowColToArrayIndex(carTrackCol,carTrackRow);
	
	var tileHere = returnTileTypeAtColRow(carTrackCol,carTrackRow);
	
	if(tileHere == TRACK_GOAL) {
		console.log(whichCar.name+" WINS");
		nextLevel();
	} else if(tileHere != TRACK_ROAD) {
		whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
		whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;
		
		whichCar.speed *= -0.5;
	}//end of track found
}//end of carTrackHandling func

function rowColToArrayIndex(col,row) {
	return col + TRACK_COLS*row;
}

function drawTracks() {
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	
	for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
		for(var eachCol=0;eachCol<TRACK_COLS;eachCol++) {
			var tilKindHere = trackGrid[arrayIndex];
			var useImg = trackPics[tilKindHere];
			canvasContext.drawImage(useImg, TRACK_W*eachCol,TRACK_H*eachRow);
			
			drawTileX += TRACK_W;
			arrayIndex++;
		}//end of for each col
		drawTileY += TRACK_H;
		drawTileX = 0;
	}//end of for each row
}//end of drawTracks func