//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
	
	this.menuDisplayed = false;
	
	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function(){
		//???
		//check if the playback button has been clicked
		//if not make the visualisation fullscreen
        
        if(this.playbackButton.hitCheck())
        {
            this.playbackButton.playing != this.playbackButton.playing;
        }
        else
        {
            var fs = fullscreen();
            //fullscreen(!fs);
        }
	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode){
		//console.log(keycode);
		if(keycode == 32){
			this.menuDisplayed = !this.menuDisplayed;
            //console.log(this.menuDisplayed);
		}

		if(keycode > 48 && keycode < 58){
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name); 
		}
	};

	//draws the playback button and potentially the menu
	this.draw = function(){
		push();
        
		//playback button 
		this.playbackButton.draw();
		//only draw the menu if menu displayed is set to true.
		if(this.menuDisplayed){

			textCanvas.text("Select a visualisation:", 50, 50);
			this.menu();
		}	
        else{
            //Clears canvas to remove text AKA not show text
            textCanvas.clear();
        }
		pop();

	};

	this.menu = function(){
		//draw out menu items for each visualisation
		//???
        for(var i = 0; i < vis.visuals.length; i++)
        {
            textCanvas.text(String(i+1) + ": " + vis.visuals[i].name, 50, 100 + i*40);
        }
	};
}


