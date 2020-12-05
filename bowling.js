/*
Write a Ruby or Javascript script that calculates and prints ten pin bowling scores.
It should receive a comma-separated line of numbers representing the number of pins knocked down per bowl and return the current score. The sequence of numbers will always be valid but may be incomplete (ie, the sequence may be part-way through a game). Information on how to calculate scores in bowling can be found at http://en.wikipedia.org/wiki/Ten-pin_bowling#Scoring and http://bowling.about.com/od/rulesofthegame/a/bowlingscoring.htm.
The input numbers will be between 0 and 10. They may or may not result in a complete game. The code should print the current score.

Examples
10,10,10,10,10,10,10,10,10,10,10,10 => 300
1,2,3,4,5,5 => 20
9,1,10,8,0,2 => 48
10,0,0,9,1,0,0,8,2,0,0,7,3,0,0,6,4,0,0 => 50

Please provide the code via Github or Bitbucket or equivalent.

*/



// save arg to array (array of shots' pin)
var shot = process.argv[2].split(",").map(Number);


var currentFrame = 1; // current frame index
var currentShot = 1; // current shot index 
var lastShot = shot.length; // last shot = array size

var totalScore = 0; // final score
var frameScore = 0; // score of one frame

// return ERROR if any pin is not numeric or negative
if (shot.some(isNaN) || shot.some(v => v < 0)){
	console.log ("ERROR with invalid pin value found in input");
	return;
}


// loop shots until the last shot or when 10 frames are completed (ignore any shot/frames after 10th frame)
while ((currentShot <= lastShot) && (currentFrame <= 10)){ 
	
	// current frame score calculation (strike case)
	if (shot[currentShot-1] == 10) {	
		
		if (currentShot == lastShot) { // last shot case, frame score = this shot's pin
			frameScore = shot[currentShot-1];
			currentFrame += 1; // advance to next frame
			currentShot += 1; // advance to next shot to end process
		} 
		else if (currentShot == lastShot-1) { // 2nd last shot case, this shot's pin + next shot's pin 
			frameScore = shot[currentShot-1] + shot[currentShot];
			currentFrame += 1; // advance to next frame
			currentShot += 1; // strike case, next frame starts with next shot
		}
		else { // normal frame
			frameScore = shot[currentShot-1] + shot[currentShot] + shot[currentShot+1]; // frame score = this shot's pin + next shot's pin + next next shot's pin
			currentFrame += 1; // advance to next frame
			currentShot += 1; // strike case, next frame starts with next shot
		}


	}

	// current frame score calculation (spare case)
	else if ((shot[currentShot-1] + shot[currentShot]) == 10){
		var nextShot = currentShot + 1;
		var shotSum = shot[currentShot-1] + shot[currentShot];
		
		if (currentShot == lastShot) { // last shot case, frame score = this shot's pin
			frameScore = shot[currentShot-1];
			currentFrame += 1; // advance to next frame
			currentShot += 1; // advance to next shot to end process
		} 

		else if (currentShot == lastShot-1) { // 2nd last shot case, this shot's pin + next shot's pin (for no next next shot)
			frameScore = shot[currentShot-1] + shot[currentShot];
			currentFrame += 1; // advance to next frame
			currentShot += 2; // strike case, next frame starts with next shot
		}

		else { // normal case
			frameScore = shot[currentShot-1] + shot[currentShot] + shot[currentShot+1]; // spare case score = pin of this shot + next shot + next next shot
			currentFrame += 1; // advance to next frame
			currentShot += 2; // spare or open case, next frame starts with next next shot
		}

	}

	// current frame score calculation (open case)
	else {
		var nextShot = currentShot + 1;
		var shotSum = shot[currentShot-1] + shot[currentShot];
		
		if (currentShot == lastShot) { // last shot case, frame score = this shot's pin
			frameScore = shot[currentShot-1];
			currentFrame += 1; // advance to next frame
			currentShot += 1; // advance to next shot to end process
		} 

		else if ((shot[currentShot-1] + shot[currentShot]) > 10) { // error if this shot's pin + next shot's pin > 10 
			console.log("ERROR at frame " + currentFrame + ": sum of pins for shot " + currentShot + " and shot " + nextShot + " is " + shotSum + " which is > 10");
			return;
		} 

		else { // normal case
			frameScore = shot[currentShot-1] + shot[currentShot]; // open case score = pin of current frame only
			currentFrame += 1; // advance to next frame
			currentShot += 2; // open case, next frame starts with next next shot
		}
	}

	totalScore += frameScore; // add frame score to total

	

}


// Print current score calculated
console.log("Current score: " + totalScore);




