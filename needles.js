//constructor function to draw a
function Needles() {
	//name of the visualisation
	this.name = "needles";

	//how large is the arc of the needle plot.
	var minAngle = 18;
	var maxAngle = 180 - 18;

	this.plotsAcross = 2;
	this.plotsDown = 2;

	//frquencies used by the energyfunction to retrieve a value
	//for each plot.
	this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];
    
	//resize the plots sizes when the screen is resized.
	this.onResize = function() {
		this.pad = visualsCanvas.width / 20;
		this.plotWidth = (visualsCanvas.width - this.pad) / this.plotsAcross;
		this.plotHeight = (visualsCanvas.height - this.pad) / this.plotsDown;
		this.dialRadius = (this.plotWidth - this.pad) / 2 - 5;
	};
	//call onResize to set initial values when the object is created
	this.onResize();

	// draw the plots to the screen
	this.draw = function() {
        
        visualsCanvas.clear();
        
		//create an array amplitude values from the fft.
		var spectrum = fourier.analyze();
		//iterator for selecting frequency bin.
		var currentBin = 0;
		push();
        
		//nested for loop to place plots in 2*2 grid.
		for (var i = 0; i < this.plotsDown; i++) {
			for (var j = 0; j < this.plotsAcross; j++) {

				//calculate the size of the plots
				var x = 40 + j * (visualsCanvas.width)/2;
				var y = 40 + i * (visualsCanvas.height)/2;
				var w = (visualsCanvas.width - 160)/2;
				var h = (visualsCanvas.height - 160)/2;
                
                //console.log(w, h);
                
		        visualsCanvas.fill('#f0f2d2');
                
				//draw a rectangle at that location and size
				visualsCanvas.rect(x, y, w, h);

				//add on the ticks
                var centreX = x + w/2;
                var bottomY = y + h;
                var freqLabel = this.frequencyBins[currentBin];
                
				this.ticks(centreX, bottomY, freqLabel);

				var energy = fourier.getEnergy(this.frequencyBins[currentBin]);

				//add the needle
				this.needle(energy, centreX, bottomY)

				currentBin++;
			}
		}

		pop();
	};

	/*
	 *draws a needle to an individual plot
	 *@param energy: The energy for the current frequency
	 *@param centreX: central x coordinate of the plot rectangle
	 *@param bottomY: The bottom y coordinate of the plot rectangle
	 */
	this.needle = function(energy, centreX, bottomY) {
		push();
		visualsCanvas.stroke('#333333');
		//translate so 0 is at the bottom of the needle
		//translate(centreX, bottomY);
		//map the energy to the angle for the plot
		theta = map(energy, 0, 255, minAngle, maxAngle);
		//calculate x and y coorindates from angle for the length of needle
		var x = centreX - this.dialRadius * cos(theta);
		var y = bottomY - this.dialRadius * sin(theta);
		//draw the needle
		visualsCanvas.line(centreX, bottomY, x, y);
		pop();
	};

	/*
	 *draw the graph ticks on an indivisual plot
	 *@param centreX: central x coordinate of the plot rectangle
	 *@param bottomY: The bottom y coordinate of the plot rectangle
	 *@param freqLabel: Label denoting the frequency of the plot
	 */
	this.ticks = function(centreX, bottomY, freqLabel) {
		// 8 ticks from pi to 2pi
		var nextTickAngle = minAngle;
		push();
		visualsCanvas.stroke('#333333');
		visualsCanvas.fill(51, 51, 51);
        //translate doesn't work well with createGraphics so I removed it
		//translate(centreX, bottomY);
		//draw the semi circle for the botttom of the needle
		visualsCanvas.arc(centreX, bottomY, 20, 20, PI, 2 * PI);
		visualsCanvas.textAlign(CENTER);
		visualsCanvas.textSize(12);
		visualsCanvas.text(freqLabel, centreX, bottomY -(this.plotHeight / 2));
        

		for (var i = 0; i < 9; i++) {
			//for each tick work out the start and end coordinates of
			//based on its angle from the needle's origin.
			var x = centreX + this.dialRadius * cos(nextTickAngle);
			var x1 = centreX + (this.dialRadius - 5) * cos(nextTickAngle);

			var y = bottomY - (this.dialRadius) * sin(nextTickAngle);
			var y1 = bottomY - (this.dialRadius - 5) * sin(nextTickAngle);
            
			visualsCanvas.line(x, y, x1, y1);
			nextTickAngle += 180 / 10;
		}
		pop();
	};

}