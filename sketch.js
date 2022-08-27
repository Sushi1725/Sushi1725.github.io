/*
Modify modelURL and serialPort to your settings
*/
const modelURL = 'https://teachablemachine.withgoogle.com/models/HE80Nghuk/';
const serialPort = 'COM6';

let classifier;
let serial;
let video;
let label;
let cameraBorder;
let videoSize;

function preload() {
    classifier = ml5.imageClassifier(modelURL + 'model.json');
    serial = new p5.SerialPort();
}

function setup() {
    serial.open(serialPort);
    createCanvas(420, 420);
    video = createCapture(VIDEO);
    cameraBorder = loadImage('camera_border.png');
    videoSize = 260;
    video.size(320, 240);
    poppinsBold = loadFont('Poppins-Bold.ttf');
    video.hide();
    // flippedVideo = ml5.flipImage(video);
    classifyVideo();
}

function draw() {

    background(0, 0, 0);
    noStroke();
        textAlign(CENTER, CENTER);
        textFont(poppinsBold);
        textSize(14);
        text("enable webcam access", width / 2, height / 1.6);
        text("and refresh page to use", width / 2, height / 1.5);
    image(video, width / 2 - videoSize / 2, height / 1.6 - videoSize / 2, videoSize, videoSize, 150, 0, videoSize * 1.5, videoSize * 1.5);
    image(cameraBorder, width / 2 - videoSize / 2 - 3, height / 1.6 - videoSize / 2 - 3, videoSize + 6, videoSize + 6);

    rectMode(CORNER);
    classifyVideo();

//     background('#E8F0FE');
//     image(video, 0, 0);
//     fill(0, 0, 0);
//     textSize(16);
//     textAlign(CENTER);
//     text(label, width / 2, height - 4);
}

function classifyVideo() {
    classifier.classify(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    label = String(results[0].label);
    console.log(label);
    serial.write(label);
    classifyVideo();
}