function Spectrum(){
	this.name = "spectrum";

	this.draw = function(){
        visualsCanvas.clear();
		push();
		var spectrum = fourier.analyze();
		visualsCanvas.noStroke();
		visualsCanvas.fill(0,255,0)
		for (var i = 0; i< spectrum.length; i++){
            
            var y = map(i, 0, spectrum.length, 0, height);
		    var x = map(spectrum[i], 0, 255, 0, 1000);
            
            var fillColorRed = spectrum[i];
            var fillColorGreen = 255 - map(fillColorRed, 255, 0, 255, 0);
            
            visualsCanvas.fill(fillColorRed, fillColorGreen, 0);
            
		    visualsCanvas.rect(0, y, x, height / spectrum.length);
  		}
		pop();
	};
}
