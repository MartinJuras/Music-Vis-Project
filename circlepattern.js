//draw the waveform to the screen
function CirclePattern(){
	//vis name
	this.name = "circlepattern";
    
    this.hasBeenSetup = false;
    
    let circle;
    
    let selectCircle;
    let chosenCircle;
    
    let resolutionSlider;
    let rotationX, rotationY,rotationZ;
    let amplitudeSlider;
    let strokeWeightSlider;
    let colourPicker;
    let r = 200;
    
    let zoomSlider;
    
    let movingRotationButton;
    let movingRotation;
    
    let movingZoomButton;
    let movingZoom;
    let direction;
    
    let rainbowEffectButton;
    let rainbowEffect;
    let hue;
    
    this.slidersActive = false;
    
    let randomXRotation;
    let randomYRotation;
    let randomZRotation;
    
    this.setup = function(){
        
        //Slider Initializing
        strokeWeightSlider = createSlider(1, 15, 2, 1);
        strokeWeightSlider.position(50, height - 300);
        
        resolutionSlider = createSlider(3, 200, 25, 1);
        resolutionSlider.position(50, height - 250);
        
        amplitudeSlider = createSlider(10, 500, 250, 5);
        amplitudeSlider.position(50, height - 200);
        
        rotationX = createSlider(0, 360, 45, .1)
        rotationX.position(50, height - 150);
        
        rotationY = createSlider(0, 360, 45, .1)
        rotationY.position(50, height - 100);
        
        rotationZ = createSlider(0, 360, 45, .1)
        rotationZ.position(50, height - 50);
        
        colourPicker = createColorPicker('#83EEFF');
        colourPicker.position(width - 50 - colourPicker.width, height - 250);
        
        selectCircle = createSelect();
        selectCircle.position(50, height - 350); 
        selectCircle.option('Basic Sphere');
        selectCircle.option('Spiral Sphere');
        selectCircle.option('Bumpy Sphere');
        selectCircle.option('Cool Looking Sphere');
        selectCircle.option('Visual Relaxing Sphere');
        selectCircle.selected('Basic Sphere');
        
        zoomSlider = createSlider(.05, 5, 1, .01);
        zoomSlider.position(width - 50 - zoomSlider.width, height - 200 + zoomSlider.height);
        
        movingRotation = false;
        movingZoom = false;
        rainbowEffect = false;
        
        //Rainbow Colour
        hue = 0;
        
        direction = 1;
        
        //Button Initializing
        rainbowEffectButton = createButton('Rainbow Effect');
        rainbowEffectButton.position(width - 50 - rainbowEffectButton.width - colourPicker.width / 2 - 10, height - 150);
        rainbowEffectButton.mousePressed(this.changeRainbowEffect);
        
        movingZoomButton = createButton('Moving Zoom');
        movingZoomButton.position(width - 50 - movingZoomButton.width - colourPicker.width / 2 - 10, height - 100);
        movingZoomButton.mousePressed(this.changeMovingZoom);
        
        movingRotationButton = createButton('Moving Rotation');
        movingRotationButton.position(width - 50 - movingRotationButton.width - colourPicker.width / 2 - 10, height - 50 - rotationX.height / 2);
        movingRotationButton.mousePressed(this.changeMovingRotation);
        //console.log(movingRotation);
        
        this.hasBeenSetup = true;
        this.slidersActive = true;
    }
    
    this.removeSliders = function(){
        //Removes Sliders when this visualization is not selected
        if(this.slidersActive){
            strokeWeightSlider.remove();
            resolutionSlider.remove();
            amplitudeSlider.remove();
            rotationX.remove();
            rotationY.remove();
            rotationZ.remove();
            colourPicker.remove();
            selectCircle.remove();
            zoomSlider.remove();
            movingRotationButton.remove();
            movingZoomButton.remove();
            rainbowEffectButton.remove();
            
            this.slidersActive = false;
        }
    }
    
    this.changeMovingRotation = function(){
        movingRotation = !movingRotation;
        
        randomXRotation = random();
        randomYRotation = random();
        randomZRotation = random();
    }
    
    this.changeMovingZoom = function(){
        movingZoom = !movingZoom;
    }
    
    this.changeRainbowEffect = function(){
        rainbowEffect = !rainbowEffect;
    }
    
	//draw the wave form to the screen
	this.draw = function(){
        //Clears the canvas from previous frames
        visualsCanvas.clear();
        
        //Uses mouse to move around in 3D space. Doesnt work well with Text
        //orbitControl(0, 0, 2);
        
		push();
		circle = fourier.analyze();
        
        //Sets StrokeWeight to slider value
        strokeWeight(strokeWeightSlider.value());
        
        fill('white');
        textSize(20);
        
        //Text Placement on top of respective sliders
        //Using the *slider*.x and *slider*.y so if I change the position of the sliders I don't need to worry about the text as well
        text('Select Circle: ', selectCircle.x - windowWidth / 2, selectCircle.y - height / 2 - 10);
        
        text('Stroke Weight: ' + strokeWeightSlider.value(), strokeWeightSlider.x - width / 2, strokeWeightSlider.y - height / 2);
        
        text('Resolution: ' + resolutionSlider.value(), resolutionSlider.x - width / 2, resolutionSlider.y - height / 2);
        
        text('Amplitude Divisor: ' + amplitudeSlider.value(), amplitudeSlider.x - width / 2, amplitudeSlider.y - height / 2);
        
        text('X Rotation: ' + rotationX.value(), rotationX.x -  width / 2, rotationX.y - height / 2);
        
        text('Y Rotation: ' + rotationY.value(), rotationY.x -  width / 2, rotationY.y - height / 2);
        
        text('Z Rotation: ' + rotationZ.value(), rotationZ.x -  width / 2, rotationZ.y - height / 2);
        
        colourPicker.position(width - 50 - colourPicker.width, height - 250);
        text('Colour: ', colourPicker.x - width / 2 - 5, colourPicker.y - height / 2 - 10);
        
        zoomSlider.position(width - 50 - zoomSlider.width, height - 200 + zoomSlider.height);
        text('Zoom: ', zoomSlider.x - width / 2 + zoomSlider.width / 4, zoomSlider.y - height / 2 - 10);
        
        //Sets position of buttons to update with window size
        //Set text with the buttons positions
        rainbowEffectButton.position(width - 50 - rainbowEffectButton.width - colourPicker.width / 2 - 10, height - 150);
        text(rainbowEffect, rainbowEffectButton.x - width / 2 + rainbowEffectButton.width + 10, rainbowEffectButton.y - height / 2 + 17);
        
        movingZoomButton.position(width - 50 - movingZoomButton.width - colourPicker.width / 2 - 10, height - 100 - rotationX.height / 4);
        text(movingZoom, movingZoomButton.x - width / 2 + movingZoomButton.width + 10, movingZoomButton.y - height / 2 + 17);
        
        movingRotationButton.position(width - 50 - movingRotationButton.width - colourPicker.width / 2 - 10, height - 50 - rotationX.height / 2);
        text(movingRotation, movingRotationButton.x - width / 2 + movingRotationButton.width + 10, movingRotationButton.y - height / 2 + 17);
        
        //Sets color of circle
        if(rainbowEffect){
            if (hue > 360) {
                hue = 0;
            } 
            hue++;
            colorMode(HSL, 360);
            stroke(hue, 238, 255);
        }
        else{
            stroke(colourPicker.value());
        }
        
        noFill();
        
        if(movingRotation){
            
            
            if(rotationX.value() == 360){
            rotationX.value(0);
            }

            rotationX.value(rotationX.value() + randomXRotation);

            if(rotationY.value() == 360){
                rotationY.value(0);
            }

            rotationY.value(rotationY.value() + randomYRotation);

            if(rotationZ.value() == 360){
                rotationZ.value(0);
            }

            rotationZ.value(rotationZ.value() + randomZRotation);
        }
        
        if(movingZoom){
            
            if(zoomSlider.value() <= .4 || zoomSlider.value() >= 5){
                direction *= -1;
            }
            
            let zoomAmount = direction / 50;
            
            zoomSlider.value(zoomSlider.value() + zoomAmount);
        }
        
        //Rotate the screen in 3D space with our slider values
        rotateX(rotationX.value());
        rotateZ(rotationZ.value());
        rotateY(rotationY.value());
        
        //Set zoom by using the scale function
        scale(zoomSlider.value());
        
        //Draw which sphere depending on selection
        if(selectCircle.value() == 'Basic Sphere'){
            this.basicSphere();
        }
        if(selectCircle.value() == 'Spiral Sphere'){
            this.spiralSphere();
        }
        if(selectCircle.value() == 'Bumpy Sphere'){
            this.bumpySphere();
        }
        if(selectCircle.value() == 'Cool Looking Sphere'){
            this.coolLookingSphere();
        }
        if(selectCircle.value() == 'Visual Relaxing Sphere'){
            this.visualRelaxingSphere();
        }
        
		pop();
        
        colorMode(RGB);
	};
    
    this.basicSphere = function(){
        //Create a sphere with vertex points
        for(let phi = 0; phi < 180; phi += 180/resolutionSlider.value()){
            beginShape();
            for(let theta = 0; theta < 360; theta += 360/resolutionSlider.value()){
                
                //Use the sound to offset the vertices to give cool shapes
                let offset = (circle[int(phi) * 2] / amplitudeSlider.value()) + 1;
                
                let x = r * cos(phi) * offset;
                let y = r * sin(phi) * sin(theta) * offset;
                let z = r * sin(phi) * cos(theta) * offset;

                vertex(x, y, z);
            }
        endShape(CLOSE);
        }
    }
    
    this.spiralSphere = function(){
        //Create a sphere with vertex points
        beginShape();
        for(let theta = 0; theta < 180; theta += 0.1){

            //Use the sound to offset the vertices to give cool shapes
            let offset = (circle[int(theta) * 4] / amplitudeSlider.value()) + 1;

            let x = r * cos(theta) * offset;
            let y = r * sin(theta) * sin(theta * resolutionSlider.value()) * offset;
            let z = r * sin(theta) * cos(theta * resolutionSlider.value()) * offset;

            vertex(x, y, z);
        }
        endShape();
        
    }
    
    this.bumpySphere = function(){
        //Create a sphere with vertex points
        for(let phi = 0; phi < 180; phi += 180/resolutionSlider.value()){
            beginShape(POINTS);
            for(let theta = 0; theta < 360; theta += 360/resolutionSlider.value()){
                
                //Use the sound to offset the vertices to give cool shapes
                let offset = (circle[int(phi) * 2] / amplitudeSlider.value()) + 1;
                
                let x = r * (1 + 0.2 * sin(theta * 6) * sin(phi * 5)) * cos(phi) * offset;
                let y = r * (1 + 0.2 * sin(theta * 6) * sin(phi * 5)) * sin(phi) * sin(theta) * offset;
                let z = r * (1 + 0.2 * sin(theta * 6) * sin(phi * 5)) * sin(phi) * cos(theta) * offset;

                vertex(x, y, z);
            }
        endShape();
        }
    }
    
    this.coolLookingSphere = function(){
        //Create a sphere with vertex points
        for(let phi = 0; phi < 180; phi += 180/resolutionSlider.value()){
            beginShape(POINTS);
            for(let theta = 0; theta < 360; theta += 360/resolutionSlider.value()){
                
                //Use the sound to offset the vertices to give cool shapes
                let offset = (circle[int(phi) * 2] / amplitudeSlider.value()) + 1;
                
                let x = r * (1 + 0.2 * tan(theta * 6) * tan(phi * 5)) * cos(phi) * offset / 2;
                let y = r * (1 + 0.2 * tan(theta * 6) * tan(phi * 5)) * sin(phi) * sin(theta) * offset / 2;
                let z = r * (1 + 0.2 * tan(theta * 6) * tan(phi * 5)) * sin(phi) * cos(theta) * offset / 2;

                vertex(x, y, z);
            }
        endShape();
        }
    }
    
    this.visualRelaxingSphere = function(){
        //Create a sphere with vertex points
        for(let phi = 0; phi < 180; phi += 180/resolutionSlider.value()){
            beginShape(POINTS);
            for(let theta = 0; theta < 360; theta += 360/resolutionSlider.value()){
                
                let wiggly = sin(frameCount * .1) * 10;
                let wobbly = cos(frameCount * .1) * 10;
                if(movingRotation){
                    wiggly = sin(frameCount * .1) * 10;
                    wobbly = cos(frameCount * .1) * 10;
                }
                else{
                    wiggly = 1;
                    wobbly = 1;
                }
                
                //Use the sound to offset the vertices to give cool shapes
                let offset = (circle[int(phi) * 2] / amplitudeSlider.value()) + 1;
                
                let x = r * (1 + 0.2 * sin(theta * 6) * sin(phi * 5)) * cos(phi) * offset * wobbly;
                let y = r * (1 + 0.2 * sin(theta * 6) * sin(phi * 5)) * sin(phi) * sin(theta) * offset * wiggly;
                let z = r * (1 + 0.2 * sin(theta * 6) * sin(phi * 5)) * sin(phi) * cos(theta) * offset * wiggly;
                vertex(x, y, z);
            }
        endShape();
        }
    }
}
