class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 55;
  offsetRight = 10;
  offsetLeft = 15;
  offsetTop = 70;
  offsetBottom = 15;
  bossfight_audio = new Audio('./audio/boss-fight.mp3');
  bossChicke_walk_audio = new Audio('./audio/chicken.mp3');

  IMAGES_ALERT = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALKING = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "./img/4_enemie_boss_chicken/3_attack/G13.png",
    "./img/4_enemie_boss_chicken/3_attack/G14.png",
    "./img/4_enemie_boss_chicken/3_attack/G15.png",
    "./img/4_enemie_boss_chicken/3_attack/G16.png",
    "./img/4_enemie_boss_chicken/3_attack/G17.png",
    "./img/4_enemie_boss_chicken/3_attack/G18.png",
    "./img/4_enemie_boss_chicken/3_attack/G19.png",
    "./img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  hadFirstContact = false;
  bossDead = false;
  isHurt = false;
  isAttacking = false;
  invulnerable = false;


  
  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 3800;
    this.speed = 3;
    this.animate();
  }

  animate() {
    this.animationInterval = setInterval(() => {
      if (world && world.character) {
        if (world.character.x > 3300 && !this.hadFirstContact) {
          this.hadFirstContact = true;
          this.bossfight_audio.play();
          this.startWalking();
        } else if (this.bossDead) {
          this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt) {
          this.playAnimation(this.IMAGES_HURT);
        } else if(this.isAttacking) {
          this.playAnimation(this.IMAGES_ATTACK);
        } else if (!this.hadFirstContact) {
          this.playAnimation(this.IMAGES_ALERT);
        } else {
          this.fasterWalk();
        }
      }
    }, 150);
  }

  startWalking() {
  
    if (this.walkingInterval) clearInterval(this.walkingInterval);
    this.walkingInterval = setInterval(() => {
      if (!this.isHurt && !this.bossDead && !this.isAttacking) {
        this.moveLeft();
      }
    }, 1000 / 60);
   
    if(this.walkingAnimationInterval) clearInterval(this.walkingAnimationInterval);
    this.walkingAnimationInterval = setInterval(() => {
      if (!this.isHurt && !this.bossDead && !this.isAttacking) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }

  hurtAnimation() {
    this.bossChicke_walk_audio.play();
    this.isHurt = true;

    setTimeout(() => {
      this.isHurt = false;
      if (!this.bossDead) {
        this.startWalking();
      } else {
        this.die();
      }
    }, 1000);
  }

  die() {
    this.bossDead = true;
    this.playAnimation(this.IMAGES_DEAD);
      setTimeout(() => {
        let index = world.level.enemies.indexOf(this);
        if (index >- 1) {
            world.level.enemies.splice(index, 1);
        }
      }, 1000)
  }

  chickenBossAttack() {
    this.isAttacking = true;
    
    this.attackInterval =  setInterval(() => {
        if(!this.bossDead && !this.isHurt) {
            this.playAnimation(this.IMAGES_ATTACK);
        }
    }, 150);

    setTimeout(() => {
      this.isAttacking = false;
      clearInterval(this.attackInterval);
      if (!this.bossDead && !this.isHurt) {
        this.startWalking();
      }
    }, 1500);
  }

  hitEndBoss() {
    if (!this.bossDead && !this.isHurt) {
      this.hadFirstContact = true;
      this.hurtAnimation();
      if (this.isDead()) {
        this.die();
      }

      this.invulnerable = true;
      setTimeout (() => {
        this.invulnerable = false;
      }, 1500);
    }
  }

  fasterWalk() {
    if(this.energy < 80 && this.speed !== 6) {
      this.speed = 6;
    } else if (this.energy < 60 && this.speed !== 8) {
      this.speed = 8;
    }
  }
}
