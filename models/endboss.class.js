class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 55;
    offsetRight = 10;
    offsetLeft = 15;
    offsetTop = 70;
    offsetBottom = 15;
    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    hadFirstContact = false;
    bossDead = false;

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3800;
        this.speed = 1.25;
        this.animate();
    }


    animate() {
            this.animationInterval = setInterval(() => {
                 if (world && world.character && world.character.x > 3400 && !this.hadFirstContact) {
                    this.hadFirstContact = true;
                    clearInterval(this.animationInterval);
                    this.startWalking();
                } else {
                    this.playAnimation(this.IMAGES_ALERT);
                }
            }, 200);
         }

    startWalking() {
        this.walkingInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);

        this.movementInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    hurtAnimation() {
        this.hurtInverval = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT);
        }, 100);
    }

    hitEndBoss() {
        if(!this.bossDead) {
            clearInterval(this.animationInterval);
            clearInterval(this.walkingInterval);
            clearInterval(this.movementInterval);
            this.hurtAnimation();
            setTimeout(() => {
                clearInterval(this.hurtInverval);
                if(this.isDead()) {
                    this.playAnimation(this.IMAGES_DEAD);
                }
                    this.startWalking();
            }, 1500)
        }
    }

}