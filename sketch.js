//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;

let soundInput;
let soundFile;

let textCanvas;
let playbuttonCanvas;
let visualsCanvas;
let fileChooseCanvas;

let micInputButton;
var micInput;

let roboto;

let volumeSlider;

let previousWidth;
let previousHeight;

function preload(){
	//sound = loadSound('assets/stomper_reggae_bit.mp3');
    
    //Load a font from assets to use in WEBGL
    roboto = loadFont('assets/Roboto-Regular.ttf');
    
    // Create an Audio input
    mic = new p5.AudioIn();
}

function setup(){
    createCanvas(windowWidth, windowHeight, WEBGL);
    angleMode(DEGREES);
    
    //Create a canvas for 2D text while using WEBGL 3D graphics
    textCanvas = createGraphics(width / 2, height / 2);
    
    playbuttonCanvas = createGraphics(width / 10, height / 10);
    
    visualsCanvas = createGraphics(width, height);
    
    fileChooseCanvas = createGraphics(width / 10, height / 10);
    
    //Set the font to selected font (Roboto)
    textCanvas.textFont(roboto);
    textFont(roboto);
    
    controls = new ControlsAndInput();

    //instantiate the fft object
    fourier = new p5.FFT();

    //create a new visualisation container and add visualisations
    vis = new Visualisations();
    vis.add(new Spectrum());
    vis.add(new WavePattern());
    vis.add(new Needles());
    vis.add(new CirclePattern());
    
    //Create a button to choose a sound file
    soundInput = createFileInput(handleFile);
    soundInput.position(50, 100);
    
    volumeSlider = createSlider(0, 100, 20, 1);
    
    micInput = false;
    
    micInputButton = createButton('Microphone Input');
    micInputButton.mousePressed(changeMicInput);
    
    previousWidth = windowWidth;
    previousHeight = windowHeight;
}

function draw(){
    
    visualsCanvas.width = windowWidth;
    visualsCanvas.height = windowHeight;
        
    if(sound != null){
        clear();
        background(0);

        //No Background for the text canvas so its transparent
        //Set color to text of canvas to white
        textCanvas.fill('white');

        //Set size of text
        textCanvas.textSize(34);

        //Sliders need to be initialized in the circle pattern setup function
        if(vis.selectedVisual.name == "circlepattern"){
            if(!vis.selectedVisual.hasBeenSetup){
                vis.selectedVisual.setup();
            }
        }
        else{
            //Removes sliders and text leftover from circlepattern
            vis.visuals[vis.visuals.length - 1].removeSliders();
            vis.visuals[vis.visuals.length - 1].hasBeenSetup = false;
        }

        //draw the selected visualisation
        vis.selectedVisual.draw();
        
        //Draw the canvas' over the "root" canvas as an image
        image(visualsCanvas, -width / 2, -height / 2);
        image(textCanvas, -width / 2, -height / 2);
        image(playbuttonCanvas, -width / 2, -height / 2);
        
        volumeSlider.position(width - 50 - volumeSlider.width, 50 - (volumeSlider.height / 2));
        
        fill('white');
        textSize(20);
        
        text('Volume: ' + volumeSlider.value() + '%',volumeSlider.position().x - width / 2, volumeSlider.position().y - height / 2 - volumeSlider.height / 2);
        
        //Microphone Button and text position
        micInputButton.position(width - 105 - micInputButton.width, 100 - micInputButton.height / 2);
        text(micInput, micInputButton.x - width / 2 + micInputButton.width + 10, micInputButton.y - height / 2 + 17);
        
        //draw the controls on top.
        controls.draw();
        
        if(!micInput){
            sound.setVolume(volumeSlider.value() / 100);
        }
        
    }
    else{
        //Before visualization choose the audio
        background(255);
        fill('black');
        textSize(20);
        text('Choose your audio: ', (-width / 2) + soundInput.position().x,(-height / 2) + soundInput.position().y - 30);
    }
}

function changeMicInput()
{
    //Stop soundFile music and switch to microphone
    if(!micInput){
        if(sound.isPlaying()){
            sound.pause();
            mic.stop();
            mic.enabled = false;
        }
        //Weird interaction where mic wont work unless I loop sound first
        else{
            sound.loop();
            sound.pause();
        }
    }
    else{
        mic.stop();

        fourier.setInput(sound);
    }
    
    playbuttonCanvas.clear();
    controls.playbackButton.playing = false;
    micInput = !micInput;
}

//Function that is run when selecting a file
function handleFile(file) {
    if (file.type === 'audio') {
        //Loads the selected audio file to the sound variable
        sound = loadSound(file);
        soundFile = file;
        //console.log(file.name);
        
        //Removes the file select button
        soundInput.remove();
    }
    else{
        sound = null;
    }
}

function mouseClicked(){
	controls.mousePressed();
}

function keyPressed(){
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
    
    //An okay fix for the streched resolution of the Canvas after the windowResize
    //It's a p5js bug that causes this and this is a semi-fix I found
    visualsCanvas.scale(previousWidth / visualsCanvas.width, previousHeight / visualsCanvas.height ,1);

    previousWidth = visualsCanvas.width;
    previousHeight = visualsCanvas.height;
}
