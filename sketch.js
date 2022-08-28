/*
Modify modelURL and serialPort to your settings
*/
let modelURL = 'https://teachablemachine.withgoogle.com/models/Ay9VyKKtX/';
let serialPort = 'COM6';
let lastSerialPort;

let classifier;
let serial;
let video;
let label;
let cameraBorder;
let videoSize;
// let variable;
// let inp;
let modelInput;
let bgColor = '#e8f0fe';
var loadModel;
var click2;
let isModelLoaded;
let labels = [];

function preload() {
    classifier = ml5.imageClassifier(modelURL + 'model.json');
    serial = new p5.SerialPort();
}

function setup() {
    // serial.open(serialPort);
    createCanvas(window.innerWidth, window.innerHeight);
    video = createCapture(VIDEO);
    cameraBorder = loadImage('camera_border.png');
    videoSize = 330;
    video.size(320, 240);
    poppinsBold = loadFont('Poppins-Bold.ttf');
    poppinsRegular = loadFont('Poppins-Regular.ttf');
    group = loadImage('Group 61.png');
    video.hide();
    // flippedVideo = ml5.flipImage(video);
    // classifyVideo();

  // let variable;
  // let inp = createInput('COM');
  // inp.position(0, 0);
  // inp.size(100);
  // inp.input(myInputEvent);

    modelInput = createInput();
    modelInput.input(myInputEvent);
      // modelInput.style('position', 'absolute');
      // modelInput.style('z-index', 10);
    modelInput.position(20, 20);
    modelInput.style('height', '35px');
    modelInput.style('width', '267px');
    modelInput.style('border-width', '0px');
    modelInput.style('border-radius', '4px 4px 0px 0px');
    modelInput.style('border-bottom', '2px solid #1967d2');
    modelInput.style('font', 'poppinsRegular');
    modelInput.style('font-size', '16px');
    modelInput.style('padding-left', '5px');
    modelInput.style('color', '#000000');
    modelInput.attribute('placeholder', "Paste model link here");

        loadModel = new button();
        loadModel.resize(160, 40);
        loadModel.style.fontFamily = poppinsRegular;
        loadModel.reposition(300,21);
        loadModel.style.border = 1;
        loadModel.style.background = '#e8f0fe';
        loadModel.content = 'LOAD MODEL';
        loadModel.style.fontSize = 18;
        loadModel.hoverStyle.background = '#2277FF';
        loadModel.style.color = '#2277FF';
  // loadModel.onClick = function(){
  //   console.log("I have been pressed!");
  // }
    loadModel.onClick = () => {
    // try {
    
      // modelInput.input(myInputEvent);
        console.log(modelURL + 'metadata.json');
        classifier = ml5.imageClassifier(modelURL + 'model.json');
        classifyVideo()

      // httpGet(modelURL + 'metadata.json', 'json', false, (response) => {
//         if (response.labels.length <= 2) {
//           alert("Train a model with at least three classes: one for each type of object you want to sort, and one for the empty sorter");
//         } else {
//           labels = response.labels;
//           isModelLoaded = true;
//           classifyVideo();
//         }

//       }, (error) => alert("invalid TM2 url"));
//     } catch (e) {
//       loadModel.text = 'INVALID URL';
//     }
//     if (labels.length > 1) {
//       loadModel.text = 'MODEL LOADED';
//       setTimeout(() => {
//         loadModel.text = 'REFRESH MODEL'
//       }, 3000);
    }
  // }

        serialPort = createSelect();
        serialPort.position(20, 70);
        serialPort.option('Select a COM port');
        serialPort.disable('Select a COM port');
        serialPort.option('COM1');
        serialPort.option('COM2');
        serialPort.option('COM3');
        serialPort.option('COM4');
        serialPort.option('COM5');
        serialPort.option('COM6');
        serialPort.option('COM7');
        serialPort.option('COM8');
        serialPort.option('COM9');
        serialPort.selected('Select a COM port');
        serialPort.style('height', '35px');
        serialPort.style('width', '275px');
        serialPort.style('border-width', '0px');
        serialPort.style('border-radius', '4px 4px 0px 0px');
        serialPort.style('border-bottom', '2px solid #1967d2');
        serialPort.style('font', 'poppinsRegular');
        serialPort.style('font-size', '16px');
        serialPort.style('padding-left', '5px');
        serialPort.style('color', '#000000');
      // serialPort.attribute('placeholder', "Paste model link here");
        lastSerialPort = serialPort.value();
        serialPort.changed(mySelectEvent);
}

function mySelectEvent() {
  // let item = serialPort.value();
  // console.log('It is a ' + item + '!');
    console.log(lastSerialPort + ' is now closed')
    lastSerialPort = serialPort.value();
    serial.close(lastSerialPort);

    setTimeout(() => {
        console.log(serialPort.value() + ' is now opened');
        serial.open(serialPort.value());
    }, 500);
}


function myInputEvent() {
    modelURL = this.value();
}

// function myInputEvent() {
//   variable = inp
//   console.log(variable);
// }

function draw() {
    background('#E8F0FE');
    // background(0, 0, 0);
    noStroke();
    textAlign(CENTER, CENTER);
    textFont(poppinsBold);
    textSize(14);
    fill('#164FC8');
    text("enable webcam access", width / 2, height / 2);
    text("and refresh page to use", width / 2, height / 1.9);
    image(video, width / 2 - videoSize / 2, height / 2 - videoSize / 2, videoSize, videoSize, 150, 0, videoSize * 1.5, videoSize * 1.5);
    image(cameraBorder, width / 2 - videoSize / 2 - 3, height / 2 - videoSize / 2 - 3, videoSize + 6, videoSize + 6);

    rectMode(CORNER);

    classifyVideo();

//     background('#E8F0FE');
//     image(video, 0, 0);
//     fill(0, 0, 0);
//     textSize(16);
//     textAlign(CENTER);
//     text(label, width / 2, height - 4);
    loadModel.draw();
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
    // classifyVideo();
}