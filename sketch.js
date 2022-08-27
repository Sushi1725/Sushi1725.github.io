/*
Modify modelURL and serialPort to your settings
*/
const modelURL = 'https://teachablemachine.withgoogle.com/models/HE80Nghuk/';
const serialPort = 'COM5';

let classifier;
let serial;
let video;
let flippedVideo;
let label;

function preload() {
    classifier = ml5.imageClassifier(modelURL + 'model.json');
	
	// const filters = [
    // { usbVendorId: 0x2341, usbProductId: 0x0043 },
    // { usbVendorId: 0x2341, usbProductId: 0x0001 }
    // ];
	
	// document.querySelector('button').addEventListener('click', async () => {
    // // Prompt user to select an Arduino Uno device.
    //   const port = await navigator.serial.requestPort({ filters });
    // });
    serial = await navigator.serial.getPorts();
}

function setup() {
    serial.open(serialPort);
    createCanvas(320, 260);
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();
    flippedVideo = ml5.flipImage(video);
    classifyVideo();
}

function draw() {
    background(0);
    image(flippedVideo, 0, 0);
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
}

function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();
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