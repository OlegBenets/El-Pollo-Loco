class ThrowableObject extends MovableObject {

    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.isBroken = false;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.throwAnimation();

        this.throwInterval = setInterval(() => {
            if (this.y <= 160 && this.speedY > 0 && !this.isBroken) { // Ensure it's falling down
                this.y = 160;
                this.speedY = 0;
                this.isBroken = true;
                this.splashAnimation();
                clearInterval(this.throwInterval);
            } else if (!this.isBroken) {
                this.x += 10;
            }
            console.log(this.y);
        }, 30);
    }

    throwAnimation() {
        this.throwAnimationInterval = setInterval(() => {
            if (!this.isBroken) {
                this.playAnimation(this.IMAGES_THROW);
            } else {
                clearInterval(this.throwAnimationInterval);
            }
        }, 100);
    }

    splashAnimation() {
        this.isBroken = true;
        this.splashAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        }, 100);
    }
}