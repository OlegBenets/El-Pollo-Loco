class ThrowableObject extends MovableObject {
    
    IMAGES_ROTATE = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y) {
        super().loadImage('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.isBroken = false;
        this.throw();
    }

    throw() {
        this.speedY = 25;
        this.applyGravity();
        this.rotateBottle();
        this.reachedGround();
    }

    rotateBottle() {
        this.rotationInterval = setInterval(() => {
                this.isBroken = false;
                this.playAnimation(this.IMAGES_ROTATE);
                this.x += 25;
        }, 30);
    }

    splashAnimation() {
        this.isBroken = true;
        clearInterval(this.throwInterval);
        clearInterval(this.applyGravityInterval);
        this.splashInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
        }, 50);
    }

    reachedGround() {
        this.throwInterval = setInterval(() => {
            if (this.y >= 360) {
                this.y = 370;
                this.speedY = 0;
                clearInterval(this.rotationInterval);
                this.splashAnimation();
            } 
        }, 30);

    }
}