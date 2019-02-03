var warriorPic = document.createElement("img");
var otherWarriorPic = document.createElement("img");
var tilePics = [];

var picsToLoad = 0; //set automatically by imageList in loadImages()

function countImagesAndLaunch() {
	picsToLoad--;
	//console.log(picsToLoad);
	if(picsToLoad == 0) {
		startGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countImagesAndLaunch();
	imgVar.src = "/games/dungeon_crawler/images/"+fileName;
}

function loadImageForWorldCode(worldCode, fileName) {
	tilePics[worldCode] = document.createElement("img");
	beginLoadingImage(tilePics[worldCode],fileName);
}

function loadImages() {
	var imageList = [
		{varName: warriorPic, theFile: "warrior.png"},
		
		{tileType: TILE_GROUND, theFile: "world_ground.png"},
		{tileType: TILE_WALL, theFile: "world_wall.png"},
		{tileType: TILE_GOAL, theFile: "world_goal.png"},
		{tileType: TILE_DOOR, theFile: "world_door.png"},
		{tileType: TILE_KEY, theFile: "world_key.png"}
	];
	
	picsToLoad = imageList.length;
	
	for(var i=0;i<imageList.length;i++) {
		if(imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} else {
			loadImageForWorldCode( imageList[i].tileType, imageList[i].theFile)
		}
	}
}