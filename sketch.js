// GLOBALS
let shapeClassifier;  // ml5.neuralnetwork()
let canvas;  // createCanvas()
const labels = ["square","circle","triangle"]  
let current_label = labels[0]; // defaults drawing label to square
let drawing = [];  // stores the current drawing i.e. shape being drawn



function setup(){
  // canvas = createCanvas(windowWidth, windowHeight);
  canvas = createCanvas(128,128);

  background(255);
  console.log("RUNNING..."); 

  let options = {
    inputs: [128,128,4],
    task: "imageClassification",
    debug: "true"
  };

  shapeClassifier = ml5.neuralNetwork(options);
}


function finishedTraining(){  // callback for shapeClassifier.train()
  console.log(">>> TRAINING FINISHED! <<<")
}

function mousePressed() {

  if (keyIsDown(SHIFT) === false){  // allows the drawing of a straight line
    drawing = [];  // if SHIFT is not being held, start a new drawing
  }
}

function changeLabel(){  // cycles through labels (see global labels)
  let i = 0;
  if (i < labels.length - 1){
    i++;
    current_label = labels[i];
  } else {
    i = 0;
    current_label = labels[i];
  };
}

function keyPressed() {

  if (key === "c"){  // clears the canvas
    drawing = [];
    clear();
    background(255);
    // bug: Drawing straight lines only works when holding shift and dragging

  } else if (key === "a"){  // adds the canvas i.e. the drawn shape to the NN's data
    img = canvas.get();
    shapeClassifier.addData({image: img}, {label: current_label});

  } else if (key === "l"){  // goes to the next label
    changeLabel();
    console.log(">>> LABEL:", current_label, "<<<");

  } else if (key === "t"){  // begins training
    shapeClassifier.train({ epochs: 50 }, finishedTraining);
  }
}

function mouseReleased(){ 

}

function mouseDragged(){  // responsible for interaction with the canvas

  if (mouseIsPressed){  // drawing controls
    
    drawing.push([mouseX,mouseY]);  // pushing every x/y coordinate of the pressed mouse

    noFill();
    beginShape();
    for (let i = 0; i < drawing.length; i++){  // for every x/y coordinate recorded...
      let x = drawing[i][0];  // ...define x...
      let y = drawing[i][1];  // ...define y...
      vertex(x,y);  // ...and draw a vertex at that position.
    }
  }
  endShape();  // closes the shape once the mouse is released.
}

function draw(){

}
