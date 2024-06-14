class Coins extends MovableObject{

    width = 100;
    height = 100;
    offsetRight = 30;
    offsetLeft = 30;
    offsetTop = 30;
    offsetBottom = 30;
    IMAGES_GROUND = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_GROUND[0]);
        this.loadImages(this.IMAGES_GROUND);
        this.x = 200 + Math.random() * 3100;
        this.y = 100 + Math.random() * (360 - 100);
    }
}