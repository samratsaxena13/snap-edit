//----------------------------------------Variables----------------------------------------

var cam = "";
var font = "";
var colorName = "";
var caption = "";
var pic = "";
var strokeSize = 0;
var allowance = false;
var camAllowance = true;

var canvasWidth = 400;
var canvasHeight = 350;
var canvasX = 480;
var canvasY = 150;

//----------------------------------------Setup----------------------------------------

if(screen.width <= 500){
    canvasX = 150;
    canvasWidth = 200;
    canvasHeight = 200;
    setTimeout(function(){
        document.getElementById("heading").style.marginBottom = "250px";
    },100)
}

function preload() {
    font = loadFont("marker.ttf");
}

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.position(canvasX, 150);
    cam = createCapture(VIDEO);
    cam.hide();
    if(screen.width <= 500){
        textSize(30);
    } else {
        textSize(50);
    }
    textFont(font);
}

//----------------------------------------Functions----------------------------------------

function draw() {
    if (camAllowance == true){
        image(cam, 0, 0, canvasWidth, canvasHeight);
    }
    if (mouseIsPressed == true && allowance == true){
        stroke(colorName);
        strokeWeight(strokeSize);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}

function snap() {
    document.getElementById("snapshot-button").style.left = "650px";
    document.getElementById("snapshot-button").innerHTML = "3..";
    document.getElementById("snapshot-button").style.backgroundColor = "lime";
    document.getElementById("snapshot-button").style.color = "black";
    setTimeout(function(){
        document.getElementById("snapshot-button").innerHTML = "2..";
        document.getElementById("snapshot-button").style.backgroundColor = "yellow";
        setTimeout(function(){
            document.getElementById("snapshot-button").innerHTML = "1..";
            document.getElementById("snapshot-button").style.backgroundColor = "red";
            setTimeout(function(){
                pic = cam.get();
                clear();
                background(pic);
                document.getElementById("snapshot-button").style.display = "none";
                setTimeout(function(){
                    if(screen.width <= 500){
                        canvasResizeHeight = canvasHeight + 70
                    } else {
                        canvasResizeHeight = canvasHeight + 100
                    }
                    resizeCanvas(canvasWidth, canvasResizeHeight);
                    fill("#FFD8A5");
                    noStroke();
                    if(screen.width <= 500){
                        rect(0, 201, 200, 70);
                    } else {
                        rect(0, 351, 400, 100);
                    }
                    fill("black");
                    if(screen.width <= 500){
                        document.getElementById("stroke-div-small").style.visibility = "visible";
                        document.getElementById("caption-div-small").style.visibility = "visible";
                        document.getElementById("btn-small").style.visibility = "visible";
                    } else {
                        document.getElementById("stroke-div").style.visibility = "visible";
                        document.getElementById("caption-div").style.visibility = "visible";
                    }
                    camAllowance = false;
                    strokeSize = 5;
                    allowance = true;
                    if(screen.width <= 500){
                        colorName = document.getElementById("ci-small").value;
                        document.getElementById("thickness-hr").style.border = strokeSize + "px " + colorName + " solid";
                    } else {
                        colorName = document.getElementById("color-input").value;
                    }
                }, 500);
            }, 1000);
        }, 1000);
    }, 1000);
}

function changeColor(){
    if(screen.width <= 500){
        colorName = document.getElementById("ci-small").value;
        document.getElementById("thickness-hr").style.border = strokeSize + "px " + colorName + " solid";
    } else {
        colorName = document.getElementById("color-input").value;
    }
}

function clearDrawing() {
    image(pic, 0, 0, 400, 350);
    fill("#FFD8A5");
    noStroke();
    rect(0, 351, 400, 100);
    text(caption, 30, 415);
    fill("black");
    stroke(colorName);
}

function cdSmall() {
    image(pic, 0, 0, 200, 200);
    fill("#FFD8A5");
    noStroke();
    rect(0, 201, 200, 70);
    fill("black");
    text(caption, 10, 240);
    stroke(colorName);
}

function chngStrokeSize() {
    if (strokeSize == 2){
        strokeSize = 5;
        document.getElementById("stroke-button").innerHTML = "Medium";
    } else if (strokeSize == 5){
        strokeSize = 10;
        document.getElementById("stroke-button").innerHTML = "Thick";
    } else if (strokeSize == 10){
        strokeSize = 2;
        document.getElementById("stroke-button").innerHTML = "Thin";
    }
}

function cssSmall() {
    if (strokeSize == 2){
        strokeSize = 5;
    } else if (strokeSize == 5){
        strokeSize = 10;
    } else if (strokeSize == 10){
        strokeSize = 2;
    }
    document.getElementById("thickness-hr").style.border = strokeSize + "px " + colorName + " solid";
}

function addCaption() {
    captionInput = document.getElementById("caption-input").value;
    caption = captionInput.slice(0,15);
    document.getElementById("caption-input").value = caption;
    fill("#FFD8A5");
    noStroke();
    rect(0, 351, 400, 100);
    fill("black");
    text(caption, 30, 415);
    stroke(colorName);
}

function acSmall() {
    captionInput = document.getElementById("cai-small").value;
    caption = captionInput.slice(0,12);
    document.getElementById("cai-small").value = caption;
    fill("#FFD8A5");
    noStroke();
    rect(0, 201, 200, 70);
    fill("black");
    text(caption, 10, 240);
    stroke(colorName);
}

function saveImage() {
    date = new Date();
    yearNum = date.getFullYear();
    monthNum = date.getMonth() + 1;
    dateNum = date.getDate();
    hourNum = date.getHours();
    minuteNum = date.getMinutes();
    secondNum = date.getSeconds();
    if(yearNum < 10){
        yearNum = "0" + yearNum;
    }
    if(monthNum < 10){
        monthNum = "0" + monthNum;
    }
    if(dateNum < 10){
        dateNum = "0" + dateNum;
    }
    if(hourNum < 10){
        hourNum = "0" + hourNum;
    }
    if(minuteNum < 10){
        minuteNum = "0" + minuteNum;
    }
    if(secondNum < 10){
        secondNum = "0" + secondNum;
    }
    fileSample = yearNum + "-" + monthNum + "-" + dateNum;
    time = hourNum + "" + minuteNum + "" + secondNum;
    console.log(time);
    fileName = "SE_" + fileSample.slice(0, 4) + fileSample.slice(5, 7) + fileSample.slice(8, 10) + "_" + time;
    console.log(fileName);
    save(fileName);
}