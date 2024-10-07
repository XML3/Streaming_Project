let akiraPath = "./public/img/Akira_100.mp4";
let pachinkoPath = "./public/img/pachinko_100.mp4";
let fabolousPath = "./public/img/af_100.mp4";
let expansePath = "./public/img/expanse_100.mp4";

let akiraVideo, pachinkoVideo, fabolousVideo, expanseVideo;
let videos;
let outsideVideos;

let margin = 20;
let numOfScreensTall = 4;
let numOfScreensWide = 4;

let counter = 1;

let sketch = (p) => {
  p.setup = () => {
    let canvasWidth;
    let canvasHeight;

    //respnsive by screen size
    if (p.windowWidth < 400) {
      canvasWidth = 300;
      canvasHeight = 200;
      p.numOfScreensWide = 4;
      p.numOfScreensTall = 4;
    } else if (p.windowWidth < 700) {
      canvasWidth = 325;
      canvasHeight = 275;
      p.numOfScreensWide = 4;
      p.numOfScreensTall = 4;
    } else if (p.windowWidth < 1200) {
      canvasWidth = 400;
      canvasHeight = 300;
      p.numOfScreensWide = 4;
      p.numOfScreensTall = 4;
    } else {
      canvasWidth = 1100;
      canvasHeight = 750;
      p.numOfScreensWide = 4;
      p.numOfScreensTall = 4;
    }

    //create canvas
    let canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.parent("p5-container");

    akiraVideo = p.createVideo(akiraPath);
    pachinkoVideo = p.createVideo(pachinkoPath);
    fabolousVideo = p.createVideo(fabolousPath);
    expanseVideo = p.createVideo(expansePath);

    //populate video array
    videos = [akiraVideo, pachinkoVideo, fabolousVideo, expanseVideo];
    //Iterate over videos to loop, mute and hide each one
    for (let i = 0; i < videos.length; i++) {
      let videoArray = videos[i];
      videoArray.volume(0);
      videoArray.loop();
      videoArray.hide();
    }

    //Populate outside video array
    outsideVideos = [akiraVideo, pachinkoVideo, expanseVideo];
  };

  p.draw = () => {
    p.background(0);
    //calculate width and height for each screen inside the grid
    let w = (p.width - margin * (p.numOfScreensWide + 1)) / p.numOfScreensWide;
    let h = (p.height - margin * (p.numOfScreensTall + 1)) / p.numOfScreensTall;

    //create a 4x4 grid of screens with a margin of 20px
    for (let i = 0; i < p.numOfScreensWide; i++) {
      for (let j = 0; j < p.numOfScreensTall; j++) {
        //calculate current x,y position wehre this screen should be drawn
        let x = margin + i * (w + margin);
        let y = margin + j * (h + margin);

        p.fill(255);
        p.rect(x, y, w, h);
        //Fill screen with video according to its i,j position
        if (i === 1 && j === 1) {
          p.image(
            fabolousVideo,
            x,
            y,
            w,
            h,
            0,
            0,
            fabolousVideo.width / 2,
            fabolousVideo.height / 2
          );
        } else if (i === 1 && j === 2) {
          p.image(
            fabolousVideo,
            x,
            y,
            w,
            h,
            0,
            fabolousVideo.height / 2,
            fabolousVideo.width / 2,
            fabolousVideo.height / 2
          );
        } else if (i === 2 && j === 1) {
          p.image(
            fabolousVideo,
            x,
            y,
            w,
            h,
            fabolousVideo.width / 2,
            0,
            fabolousVideo.width / 2,
            fabolousVideo.height / 2
          );
        } else if (i === 2 && j === 2) {
          p.image(
            fabolousVideo,
            x,
            y,
            w,
            h,
            fabolousVideo.width / 2,
            fabolousVideo.height / 2,
            fabolousVideo.width / 2,
            fabolousVideo.height / 2
          );
        } else {
          let selectedIndex = (i + j * counter) % outsideVideos.length;
          let selectedVideo = outsideVideos[selectedIndex];
          p.image(selectedVideo, x, y, w, h);
        }
      }
    }
  };
  // p.noLoop();

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.setup();
  };
};

new p5(sketch);
