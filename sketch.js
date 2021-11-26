let canvas;
let colors = {'background': (22,22,29), 'drawing': (255),}
let label; 
let readArea = [10, 10, 512, 512];

function setup(){
  canvas = createCanvas(windowWidth,windowHeight);
  background(colors.background);
  area();
  let options = {
    inputs: [70, 70, 4],
    task: "imageClassification",
    debug: "true",
  }
  shapeClassifier = ml5.neuralNetwork(options);
  const modelDetails = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin'
  }
  shapeClassifier.load(modelDetails, modelLoaded);
}
function area(){
  noFill();
  strokeWeight(1);
  stroke(colors.drawing);
  rect(readArea[0], readArea[1], readArea[2], readArea[3]);
  strokeWeight(10);
  point(10, 10);
}
function modelLoaded(){
  console.log(">>> MODEL LOADED <<<")
}


function classify(){
  let img = canvas.get(readArea[0], readArea[1], readArea[2], readArea[3]);
  img.resize(70,70);
  let result = shapeClassifier.classify( {image: img} , handleResult);
  clearCanvas();
}


function handleResult(error,result){
  if (error){
    console.error(error);
    return;
  } else {
    console.log(result);
    return tree(result);
  }
}

function tree(result) {
  let confidence = result[0].confidence;
  let label = result[0].label;  
  let angle;
  if (label === 'lobed'){
    angle = QUARTER_PI - random(0.1, 0.2) * QUARTER_PI;
  } else if (label === 'entire') {
    angle = QUARTER_PI - random(0.5, 0.6) * QUARTER_PI;
  } 
  let len = 300 * confidence;
  
  translate(width/1.5, height);
  return branch(angle, len), nameTree(label);
}

let leaf;
let mask;
function branch(angle, len) {
  leaf.resize(60, 60);
  blendMode(LIGHTEST);
  strokeWeight(3);
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 30) {
    push();
    rotate(angle);
    branch(angle, len * 0.67);
    pop();

    push();
    rotate(-angle);
    branch(angle, len * 0.67);
    pop();

    push();
    image(leaf, 0, 0);
    rotate(angle * 3);
    image(leaf, 0, 0);
    pop();
  }
  translate(-width/1.5, -height+len);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(colors.background);
}


let drawing = {
  current:[],
  store:[],
}
function clearCanvas() {
  leaf = canvas.get(readArea[0], readArea[1], readArea[2], readArea[3]);
  clear();
  background(colors.background);
  area();
}


function drawSketches(array) { 
  beginShape();
  strokeWeight(10); 
  stroke(colors.drawing);

  for (let i = 0; i < array.length; i++) { 
    let x = array[i][0];
    let y = array[i][1];
    vertex(x, y);
  }
  endShape(); 
}

function nameTree() {
  genus = {
        "lobed": ["Acacia", "Ailanthus", "Bombax", "Brahea", "Castanea", "Celtis", "Dacrydium", "Dicksonia", 
    "Elaeagnus", "Euonymus", "Fagus", "Ficus", "Ginko", "Grevillea", "Harpullia", "Howea", "Ilex", "Jacaranda", 
    "Juglans", "Kalopanax", "Kigelia", "Lagerstroemia", "Licaria", "Magnolia", "Mimosa", "Nectandra", "Nyssa", 
    "Olea", "Paulownia", "Phoenix", "Raphia", "Rhododendron", "Sassafras", "Streblus", "Terminalia", 
    "Tsuga", "Ulmus", "Vachellia", "Viburnum", "Wollemia", "Yucca", "Zelkova"], 
        "entire": ["Agathis", "Archontophoenix", "Brosimum", "Buxus", "Calocedrus", "Cinnamomum", "Dalbergia", 
    "Diospyros", "Elaeis", "Euphorbia", "Firmiana", "Fraxinus", "Gleditsia", "Gymnanthes", "Hibiscus", "Hymenaea", 
    "Illicium", "Inga", "Jubaea", "Juniperus", "Khaya", "Kokia", "Laburnum", "Lithocarpus", "Melia", "Morus", 
    "Nerium", "Nothofagus", "Ostrya", "Persea", "Populus", "Quercus", "Rhus", "Robinia", "Schinus", "Spondias", 
    "Taxodium", "Thespesia", "Vitex", "Xylosma", "Zanthoxylum"]
    };
  species = ["abbreviata", "acellerata", "alnoides", "balsamea", "borealis", "brownii", "calantha", "centralis", 
    "chamaeleon", "decidua", "depressa", "difformis", "elata", "erioloba", "excelsa", "falcata", "filicifolia", 
    "fulva", "gentlei", "gilesiana", "glaucescens", "hamiltoniana", "hemignosta", "holosericea", "inaequilatera", 
    "insignis", "ixodes", "jacquemontii", "jennerae", "juncifolia", "karroo", "kelloggiana", "kybeanensis", 
    "lamprocarpa", "lanuginophylla", "leichhardtii", "macnuttiana", "macradenia", "myrtifolia", "neovernicosa", 
    "nilotica", "notabilis", "obliquinervia", "oliveri", "oxycedrus", "papulosa", "pennatula", "petraea", 
    "quinquenervia", "quintanilhae", "quornensis", "ramulosa", "rehmanniana", "retusa", "sakalava", "semperflorens", 
    "shuttleworthii", "taylori", "tonkinensis", "translucens", "umbellata", "uncinata", "urophylla", "varia", 
    "victoriae", "villaregalis", "weberbaueri", "wetarensis", "willardiana", "xanthina", "xerophila", "xiphophylla", 
    "yirrkallensis", "yorkrakinensis", "yunnanensis", "zapatensis", "zatrichota", "zygia"];
  }
  