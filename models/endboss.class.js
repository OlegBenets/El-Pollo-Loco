class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 55;
   
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    hadFirstContact = false;

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2500;
        this.animate();
    }


    animate() {
        let i = 0;

        setInterval(() => {
            if(i < 8) {
                setInterval(() => {
                    this.moveLeft();
                }, 1000/60);
                this.playAnimation(this.IMAGES_WALKING);
             } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
            i++;

            if(world.character.x > 2000 && !this.hadFirstContact){
                i = 0;
                this.hadFirstContact = true;
            }
        }, 200);
    }
}