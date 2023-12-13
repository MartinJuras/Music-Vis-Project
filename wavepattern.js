//draw the waveform to the screen
function WavePattern(){
	//vis name
	this.name = "wavepattern";

	//draw the wave form to the screen
	this.draw = function(){
        visualsCanvas.clear();
		push();
		visualsCanvas.noFill();
		visualsCanvas.stroke(255, 0, 0);
		visualsCanvas.strokeWeight(2);

		visualsCanvas.beginShape();
		//calculate the waveform from the fft.
		var wave = fourier.waveform();
		for (var i = 0; i < wave.length; i++){
			//for each element of the waveform map it to screen 
			//coordinates and make a new vertex at the point.
			var x = map(i, 0, wave.length, 0, width);
			var y = map(wave[i] * 2, -1, 1, 0, height);

			visualsCanvas.vertex(x, y);
		}

		visualsCanvas.endShape();
		pop();
	};
}
