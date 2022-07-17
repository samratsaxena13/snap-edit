var cam = "";
var font = "";
var allowance = false;
var camAllowance = true;
var caption = "";
var colorName = "";
var strokeSize = 0;

function preload() {
    font = loadFont("marker.ttf");
}

function setup() {
    canvas = createCanvas(400, 350);
    canvas.position(480, 150);
    cam = createCapture(VIDEO);
    cam.hide();
    textSize(60);
    textFont(font);
}

function draw() {
    if (camAllowance == true){
        image(cam, 0, 0, 400, 350);
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
                    resizeCanvas(400, 450);
                    fill("#FFD8A5");
                    noStroke();
                    rect(0, 351, 400, 100);
                    fill("black");
                    document.getElementById("stroke-div").style.visibility = "visible";
                    document.getElementById("caption-div").style.visibility = "visible";
                    camAllowance = false;
                    allowance = true;
                    colorName = document.getElementById("color-input").value;
                    strokeSize = 5;  
                }, 500);
            }, 1000);
        }, 1000);
    }, 1000);
}

function clearDrawing() {
    image(pic, 0, 0, 400, 350);
    fill("#FFD8A5");
    noStroke();
    rect(0, 351, 400, 100);
    fill("black");
    if (caption != ""){
        text(caption, 40, 415);
    }
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

function addCaption() {
    caption = document.getElementById("caption-input").value;
    fill("#FFD8A5");
    noStroke();
    rect(0, 351, 400, 100);
    fill("black");
    text(caption, 40, 415);
    stroke(colorName);
}

function clearCaption() {
    fill("#FFD8A5");
    noStroke();
    rect(0, 351, 400, 100);
    fill("black");
    stroke(colorName);
    document.getElementById("caption-input").value = "";
}

function saveImage() {
    date = new Date();
    yearNum = date.getFullYear();
    monthNum = date.getMonth() + 1;
    if(monthNum < 10){
        monthNum = "0" + monthNum;
    }
    dayNum = date.getDate();
    fileSample = yearNum + "-" + monthNum + "-" + dayNum;
    fileName = fileSample.slice(0, 4) + fileSample.slice(5, 7) + fileSample.slice(8, 10);
    console.log(fileName);
    save(fileName);
}