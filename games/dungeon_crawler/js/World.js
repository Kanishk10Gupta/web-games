const TILE_W = 50;
const TILE_H = 50;
const TILE_GAP = 2;
const TILE_COLS = 16;
const TILE_ROWS = 12;
var theArena = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				1,0,0,0,0,0,1,0,0,0,4,0,1,1,1,1,
				1,0,5,0,5,0,1,0,2,0,1,0,1,5,5,1,
				1,0,0,0,0,0,1,0,0,0,1,4,1,4,1,1,
				1,1,1,4,1,1,1,0,5,0,1,0,0,0,1,1,
				1,0,0,0,0,0,0,0,0,0,1,0,5,0,1,1,
				1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,
				1,0,1,1,1,1,1,1,1,1,1,0,5,0,1,1,
				1,0,1,0,1,0,1,0,0,0,1,0,0,0,1,1,
				1,0,4,0,4,0,4,0,3,0,1,1,1,1,1,1,
				1,0,1,0,1,0,1,0,0,0,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

var levelList = [theArena];
var levelNow = 0;
var worldGrid = [];

const 	TILE_GROUND = 0;
const 	TILE_WALL = 1;
const 	TILE_PLAYERSTART = 2;
const 	TILE_GOAL = 3;
const 	TILE_DOOR = 4;
const 	TILE_KEY = 5;

function returnTileTypeAtColRow(col,row) {
	if( col >= 0 && col < TILE_COLS && 
		row >=0 && row < TILE_ROWS) {
		var worldIndexUnderCoord = rowColToArrayIndex(col,row);
		return (worldGrid[worldIndexUnderCoord]);
	} else {
		return TILE_WALL;
	}
	
}

function warriorWorldHandling(whichWarrior) {
	var warriorWorldCol = Math.floor(whichWarrior.x / TILE_W);
	var warriorWorldRow = Math.floor(whichWarrior.y / TILE_H);
	
	var currentTile = rowColToArrayIndex(warriorWorldCol,warriorWorldRow);
	
	var tileHere = returnTileTypeAtColRow(warriorWorldCol,warriorWorldRow);
	
	switch(tileHere) {
		case TILE_GOAL:
			console.log(whichWarrior.name+" WINS");
			nextLevel();
			break;
		case TILE_WALL:
			if(whichWarrior.keyHeld_North) {
				whichWarrior.y += WARRIOR_SPEED;
			}
			if(whichWarrior.keyHeld_South) {
				whichWarrior.y -= WARRIOR_SPEED;
			}
			if(whichWarrior.keyHeld_East) {
				whichWarrior.x -= WARRIOR_SPEED;
			}
			if(whichWarrior.keyHeld_West) {
				whichWarrior.x += WARRIOR_SPEED;
			}
			break;
		case TILE_DOOR:
			if(whichWarrior.key > 0){
				whichWarrior.key--;
				worldGrid[currentTile] = TILE_GROUND;
			}
			if(whichWarrior.keyHeld_North) {
				whichWarrior.y += WARRIOR_SPEED;
			}
			if(whichWarrior.keyHeld_South) {
				whichWarrior.y -= WARRIOR_SPEED;
			}
			if(whichWarrior.keyHeld_East) {
				whichWarrior.x -= WARRIOR_SPEED;
			}
			if(whichWarrior.keyHeld_West) {
				whichWarrior.x += WARRIOR_SPEED;
			}
			break;
		case TILE_KEY:
			whichWarrior.key++;
			worldGrid[currentTile] = TILE_GROUND;
			break;
		case TILE_GROUND:
	}//end of world found
}//end of warriorWorldHandling func

function rowColToArrayIndex(col,row) {
	return col + TILE_COLS*row;
}

function tileHasTransparency(checkTile) {
	return (checkTile == TILE_DOOR ||checkTile == TILE_GOAL ||checkTile == TILE_KEY)
}

function drawWorlds() {
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	
	for(var eachRow=0;eachRow<TILE_ROWS;eachRow++) {
		
		drawTileX = 0;
		
		for(var eachCol=0;eachCol<TILE_COLS;eachCol++) {
			var tileKindHere = worldGrid[arrayIndex];
			var useImg = tilePics[tileKindHere];
			
			if(tileHasTransparency(tileKindHere)) {
				canvasContext.drawImage(tilePics[TILE_GROUND], drawTileX,drawTileY);
			}
			canvasContext.drawImage(useImg, drawTileX,drawTileY);
			
			drawTileX += TILE_W;
			arrayIndex++;
		}//end of for each col
		drawTileY += TILE_H;
	}//end of for each row
}//end of drawWorlds func