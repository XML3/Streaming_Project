let x = 50;
let y = 50;

let sketchTV = (p) => {
  p.setup = () => {
    let canvasWidth;
    let canvasHeight;
    // let canvas = p.createCanvas(120, 80);
    // canvas.parent("p5-staticTV");

    //responsive
    if (p.windowWidth < 400) {
      canvasWidth = 70;
      canvasHeight = 50;
    } else if (p.windowWidth < 700) {
      canvasWidth = 85;
      canvasHeight = 60;
    } else if (p.windowWidth < 1200) {
      canvasWidth = 110;
      canvasHeight = 75;
    } else {
      canvasWidth = 120;
      canvasHeight = 80;
    }

    let canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.parent("p5-staticTV");

    p.pixelDensity(1);
  };
  p.draw = () => {
    p.push();

    p.loadPixels();
    //Perlin Noise (TV white noise)
    for (let x = 0; x < p.width; x++) {
      for (let y = 0; y < p.height; y++) {
        let index = (x + y * p.width) * 4;
        let r = p.random(255);
        p.pixels[index] = r;
        p.pixels[index + 1] = r;
        p.pixels[index + 2] = r;
        p.pixels[index + 3] = 255;
      }
    }
    p.updatePixels();
    p.fill("#ff055f");
    p.textSize(48);
    p.text("TV", 30, 60);
    p.describe(
      "The word 'TV' written inside a white noise background rectangle"
    );
    p.pop();
  };
  p.noLoop();

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.setup();
  };
};

new p5(sketchTV);
