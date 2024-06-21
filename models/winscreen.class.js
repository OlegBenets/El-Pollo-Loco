class Winscreen extends DrawableObject {

    IMAGES = [
        'img/9_intro_outro_screens/win/win_1.png',
        'img/9_intro_outro_screens/win/win_2.png',
    ];

    constructor() {
        super().loadImage("./img/9_intro_outro_screens/win/win_1.png");
        this.loadImages(this.IMAGES);
        this.x = 100;
        this.y = 50;
        this.width = 500;
        this.height = 300;
      }
}