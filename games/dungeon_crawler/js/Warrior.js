const WARRIOR_SPEED = 5;

function warriorClass() {
	this.x = 75;
	this.y = 75;
	this.myWarriorPic;//which pic to use
	this.name = "Untitled Warrior";
	
	this.key = 0;
	
	this.keyHeld_North = false;
	this.keyHeld_South = false;
	this.keyHeld_West = false;
	this.keyHeld_East = false;
	
	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyLeft;
	
	this.setupInput = function(upKey, rightKey, downKey, leftKey) {
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft = leftKey;
	}
	
	this.reset = function(whichImage, warriorName) {
		this.name = warriorName;
		this.myWarriorPic = whichImage;
		
		for(var eachRow=0;eachRow<TILE_ROWS;eachRow++) {
			for(var eachCol=0;eachCol<TILE_COLS;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol,eachRow);
				if(worldGrid[arrayIndex] == TILE_PLAYERSTART) {
					worldGrid[arrayIndex] = TILE_GROUND;
					this.x = eachCol * TILE_W + TILE_W/2;
					this.y = eachRow * TILE_H + TILE_H/2;
					return;
				}//end of player start if
			}//end of col for
		}//end of row for
		console.log("NO PLAYER START FOUND");
	}//end of warriorReset()
	
	this.move = function() {
		if(this.keyHeld_North) {
			this.y -= WARRIOR_SPEED;
		}
		if(this.keyHeld_South) {
			this.y += WARRIOR_SPEED;
		}
		if(this.keyHeld_West) {
			this.x -= WARRIOR_SPEED;
		}
		if(this.keyHeld_East) {
			this.x += WARRIOR_SPEED;
		}
		
		warriorWorldHandling(this);
	}
	
	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myWarriorPic, this.x,this.y, this.ang);
	}
}