class SalsaBottle extends MovableObject{

    width = 60;
    height = 60;
    y = 370;
    offsetRight = 10;
    offsetLeft = 15;
    offsetTop = 10;
    offsetBottom = 5;
    IMAGES_GROUND = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_GROUND[0]);
        this.loadImages(this.IMAGES_GROUND);
        this.x = 200 + Math.random() * 3100;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_GROUND);
        }, 500)
    }
}