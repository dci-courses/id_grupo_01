// Your JavaScript code will go here
console.log('Hello from JavaScript!');
let video;
let canvas;
let faces=[];
let labels=[];
let faceDetector=new FaceDetector();
let classifier=new ClassifierNN();

function preload(){
  console.log("preload")
  faceDetector= new FaceDetector();
  classifier=new ClassifierNN();
}



function setup() {
  console.log("setup")
  //guardar el canvas en una variable para poner los inputs dentro
  canvas=createCanvas(900, 520).parent("canvas-container")
  video = createCapture(VIDEO)
  video.size(640, 480)
  video.hide()
  
  showInputs()
  faceDetector.startDetection(video,gotFaces)
}



function draw() {
  //image(video, 0, 0)
  //drawBoxes()
  image(video, 0, 0, 640, 480);
  
  for (let i=0; i < faces.length; i++) {
    const box = faces[i].box
    //console.log("box",i,JSON.stringify(box))
    //dibujar rectángulo alrededor de una cara
    noFill()
    stroke(255,0,0)
    strokeWeight(4)
    rect(box.xMin, box.yMin, box.width, box.height)

    //agregarle la label que genera el modelo o ??? si no hay aún
    strokeWeight(2)
    textSize(21)
    textAlign(CENTER)

    let selectedLabel=labels[i]&&labels[i][0].confidence>0.95?labels[i][0].label:"???"
    text(selectedLabel, box.xMin + (box.width / 2), box.yMin + box.height + 20)
    
    classifier.classifyFaces()
  }

  
}



//callback para actualizar las caras detectadas por facemesh
function gotFaces(results) {
  faces = results;
}



//callback para actualizar label generado por el clasificador para una cara específica.
function gotLabels(results,error){
  if (error){
    console.error(error)
    return;
  }
  console.log(JSON.stringify(results));
  //originalmente le habia 
  labels[currentFace]=results
}



//sin uso
function getImage(box){
  return get(box.xMin, box.yMin, box.width, box.height)
}


