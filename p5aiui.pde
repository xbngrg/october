int cpx1; // x-coord of control point for curve start
int cpy1; // y-coord of control point for curve start
int cpx2; // x-coord of control point for curve end
int cpy2; // y-coord of control point for curve end

void setup(){
  size(70,70); 
  frameRate(5);
}

void draw(){
  background(200,200,200);   
  strokeWeight(2);
  pushMatrix();

  if (frameCount < 51) {
    int r = round(random(10,64));   // radius of circle
    int m = round(random(3,7));   // number of vertices, i.e. number of rotations around circle
    int d = round(random(50,100));  // curve modifier
    int x1 = 64;  // default starting x-coordinate
    int y1 = 32;  // default starting y-coordinate

    for (int i = 0; i < 50; i++){
      float angle = TWO_PI / m;  // a circle divided by the number of rotations
      int xr = round(cos(angle*(i+1))*32 + 32);  // x-coord of next point along circle
      int yr = round(sin(angle*(i+1))*32 + 32);  // y-coord of next point along circle 


      // This block determines the position of the control points -- WIP
      if (xr >= 32 && yr >= 32){  // bottom-right quadrant
        cpx1 = x1+d;
        cpy1 = y1;
        cpx2 = xr;
        cpy2 = yr+d;
      } else if (xr >= 32 && yr <= 32) {  // top-right quadrant
        cpx1 = x1+d;
        cpy1 = y1-d;
        cpx2 = xr+d;
        cpy2 = yr;
      } else if (xr <= 32 && yr >= 32) {  // bottom-left quadrant
        cpx1 = x1+d;
        cpy1 = y1+d;
        cpx2 = xr-d;
        cpy2 = yr+d;
      } else if (xr <= 32 && yr <= 32) {  // top-left quadrand
        cpx1 = x1+d;
        cpy1 = y1-d;
        cpx2 = xr-d;
        cpy2 = yr-d;
      }
    
      noFill();
      curve(cpx1, cpy1, x1, y1, xr, yr, cpx2, cpy2);

      x1 = xr;  // stores last x-coord
      y1 = yr;  // stores last y-coord
      //saveFrame("data/lobedLeaf_###.png");
    }
  popMatrix(); 
  } 
  
  else if (frameCount > 50) { 
    int width = round(random(15, 60));
    int height = round(random(15, 60));

    for (int i = 0; i < 50; i++) {
        ellipse(35, 35, width, height); //creates oval shapes with semi-random size through width, height parameters
        noFill();
        //saveFrame("data/entireLeaf_###.png");
      }
    popMatrix();
  }

  if (frameCount == 100){
    exit();
  }
}