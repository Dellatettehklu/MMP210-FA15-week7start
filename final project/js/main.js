var mic;
var mysound;
var playbutton;
var stopbutton;
var r;
var r2;
var r3;
var r4;
var songPlaying;



//function preload(){
// mysound = loadSound('Smooth.mp3');


//}

function setup() {
    createCanvas(1000, 800);
    frameRate(30);

    r = new spiral(300);
    r2 = new spiral(-100);
    r3 = new spiral(-150);
    r4 = new spiral(-50);

    songPlaying = false;


    loadJSON('js/data/sample.json', jsonLoaded);

    mic = new p5.AudioIn();
    mic.start();
}

function soundLoaded() {
    console.log('soundLoaded');
    showButton();
//    console.log(mysound.duration,'mysound.duration');
//    mysound.addCue(mysound.duration, songOver);
    if (songPlaying) {
        mysound.play();
    }

}

function jsonLoaded(data) {
    sounds = data.soundFiles;
    cursound = 0;     
    mysound = loadSound(sounds[cursound], soundLoaded);

}

function checkSound() {
//console.log('songOver');
//    cursound += 1;
//    console.log('cursound',cursound);
//    mysound.clearCues();
//    mysound = loadSound(sounds[cursound], soundLoaded);

   console.log('songPlaying', songPlaying);
    if (songPlaying) {
         console.log('isPlaying', mysound.isPlaying());
         if (mysound.isPlaying()) {
              //        mysound();
   
           } else {
               console.log('in false');
               cursound += 1;
               console.log(cursound);
               if(cursound >sounds.length){
                   cursound =0;
               }
              mysound = loadSound(sounds[cursound], soundLoaded);
               songPlaying = false;
         }
       }
}

function showButton() {


    // play button
    playbutton = createButton('Play');
    playbutton.position(55, 55);
    playbutton.mousePressed(playsound);

    // stop button
    stopbutton = createButton('Stop');
    stopbutton.position(105, 55);
    stopbutton.mousePressed(stopsound);
}

function draw() {
    background(255, 0, 255);
    r.draw();
    r.move();

    r2.draw();
    r2.move();

    r3.draw();
    r3.move();

     r4.draw();
    r4.move();
    checkSound();

    micLevel = mic.getLevel();
}

function spiral(xpos) {
    this.xpos = width / 2;
    this.xpos = 0;
    this.ypos = height / 2;
    this.x = xpos;
    this.y = 0;
    this.xspeed = 1;
    this.spinspeed = 0.1;



    this.move = function () {
        //xpos = xpos + xspeed + y;
        this.x = this.x + this.xspeed + this.y;
        if (this.x > width - 200) {
            this.x = -150;
        }
        if (this.x < -150) {
            this.x = width - 200;
            //this.spinAmount = 0.1;
        }

    }

    this.draw = function () {
        push();
        translate(this.x, this.y);
        this.spinspeed += 0.0001;
        noStroke();
        fill(185, 244, 255);
        translate(width / 2, height / 2);
        for (var i = 0; i < 300; i++) {
            rotate(this.spinspeed);
            ellipse(i, 0, 10, 10);
        }


        noStroke();
        fill(255, 211, 242);
        for (var i = 0; i < 300; i++) {
            rotate(this.spinspeed);
            ellipse(i, 0, 10, 10);
        }


        noStroke();
        fill(252, 252, 191);
        for (var i = 0; i < 300; i++) {
            rotate(this.spinspeed);
            ellipse(i, 0, 10, 10);
        }
        pop();
    }
}


function playsound() {
    if (mysound.isPlaying() == false) {
        mysound.play();
        songPlaying = true;
    }
}

function stopsound() {
    if (mysound.isPlaying() == true) {
        mysound.pause();
        songPlaying = false;
    }
}