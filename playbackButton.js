//displays and handles clicks on the playback button.
function PlaybackButton(){
	
	this.x = 20;
	this.y = 20;
	this.width = 20;
	this.height = 20;

	//flag to determine whether to play or pause after button click and
	//to determine which icon to draw
	this.playing = false;

	this.draw = function(){
		if(this.playing){
			playbuttonCanvas.rect(this.x, this.y, this.width/2 - 2, this.height);
			playbuttonCanvas.rect(this.x + (this.width/2 + 2), this.y, this.width/2 - 2, this.height);
		}
		else{	
			playbuttonCanvas.triangle(this.x, this.y, this.x + this.width, this.y + this.height/2, this.x, this.y+this.height);

		}
	};

	//checks for clicks on the button, starts or pauses playabck.
	//@returns true if clicked false otherwise.
	this.hitCheck = function(){
		if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
            if(!micInput)
            {
                if (sound.isPlaying()) {
                    sound.pause();
                } else {
                    sound.loop();
                }
                this.playing = !this.playing;
            }
            else{
                //If the microphone is off start it and set it to our fourier variable
                if(!mic.enabled){
                    mic.start();
                    fourier.setInput(mic);
                }
                else{
                    mic.stop();
                    mic.enabled = false;
                }
                this.playing = !this.playing;
            }
            //Clears playbuttonCanvas for the new play button shape
            playbuttonCanvas.clear();
  			return true;
		}
			return false;
	};

}