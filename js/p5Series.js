console.log("p5Series.js is loaded");

let video;
let isVolumeOn = true;
let videoPath = "./public/img/expanse_100.mp4";

let sketch = (p) => {
  p.preload = () => {
    video = p.createVideo(videoPath);
  };
  p.setup = () => {
    //create canvas
    let canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.parent("p5-series");

    //Creates a background with a play symbol
    p.background(0);
    p.triangle(215, 110, 275, 140, 215, 170);
    //Hides the original HTML video element
    video.hide();

    //mute video for auto play
    video.volume(0);
    video.play();
    p.clear();
  };

  p.draw = () => {
    p.image(video, 0, 0, canvasWidth, canvasHeight);
  };

  //window size
  canvasWidth = p.windowWidth * 0.8;
  canvasHeight = (canvasWidth * 9) / 16;

  p.resizeCanvas(canvasWidth, canvasHeight);

  p.pressPlayButton = () => {
    //TODO: Play video here:
    video.play();
  };

  p.pressPauseButton = () => {
    //TODO: Pause video here:
    video.pause();
  };

  p.pressToggleVolumeButton = () => {
    if (isVolumeOn) {
      //TODO: Turn volume off here:
      video.volume(0);
    } else {
      //TODO: Turn volume on here:
      video.volume(1);
    }
    isVolumeOn = !isVolumeOn;
  };
};

new p5(sketch);
