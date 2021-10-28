status = "";
object=[];

function preload(){

}

function setup(){
    canvas=createCanvas(400, 300);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video, 0, 0, 500, 300);
    if (status != ""){
        coco.detect(video, gr);
        for (i=0; i<object.length; i++) {
            percent=floor(object[i].confidence * 100);
            fill("#BE6DFD");
            text(object[i].label+" "+percent+"%", object[i].x, object[i].y);
            noFill();
            stroke("#BE6DFD");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if (object[i].label == input){
                coco.detect(gr);
                document.getElementById("name").innerHTML=input+" Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(input+" Found");
                synth.speak(utterThis);
            } else {
                document.getElementById("name").innerHTML=input+" Not Found";
            }
        }
    }
}

function ml(){
    console.log("Model loaded");
    status=true;
}

function start(){
    coco=ml5.objectDetector('cocossd', ml);
    //Pls don't say this is wrong :(
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    input=document.getElementById("Object").value;
}

function gr(error, result){
    if (error) {
        console.error(error);
    } else {
        console.log(result)
        object = result;
    }
}