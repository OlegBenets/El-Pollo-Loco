/**
 * Represents the end boss character in the game, extending from MovableObject.
 */
class Endboss extends MovableObject {
    /**
   * @property {number} height - The height of the end boss character.
   * @property {number} width - The width of the end boss character.
   * @property {number} y - The initial y-coordinate of the end boss character.
   * @property {number} offsetRight - The offset from the right edge of the hitbox.
   * @property {number} offsetLeft - The offset from the left edge of the hitbox.
   * @property {number} offsetTop - The offset from the top edge of the hitbox.
   * @property {number} offsetBottom - The offset from the bottom edge of the hitbox.
   * @property {string[]} IMAGES_ALERT - Array of image paths for alert animations.
   * @property {string[]} IMAGES_WALKING - Array of image paths for walking animations.
   * @property {string[]} IMAGES_ATTACK - Array of image paths for attack animations.
   * @property {string[]} IMAGES_HURT - Array of image paths for hurt animations.
   * @property {string[]} IMAGES_DEAD - Array of image paths for death animations.
   * @property {boolean} hadFirstContact - Flag indicating if the boss had first contact with the player.
   * @property {boolean} bossDead - Flag indicating if the boss is dead.
   * @property {boolean} isHurt - Flag indicating if the boss is currently hurt.
   * @property {boolean} isAttacking - Flag indicating if the boss is currently attacking.
   * @property {boolean} invulnerable - Flag indicating if the boss is invulnerable.
   */

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
    './img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

  IMAGES_WALKING = [
    './img/4_enemie_boss_chicken/1_walk/G1.png',
    './img/4_enemie_boss_chicken/1_walk/G2.png',
    './img/4_enemie_boss_chicken/1_walk/G3.png',
    './img/4_enemie_boss_chicken/1_walk/G4.png',
  ];

  IMAGES_ATTACK = [
    './img/4_enemie_boss_chicken/3_attack/G13.png',
    './img/4_enemie_boss_chicken/3_attack/G14.png',
    './img/4_enemie_boss_chicken/3_attack/G15.png',
    './img/4_enemie_boss_chicken/3_attack/G16.png',
    './img/4_enemie_boss_chicken/3_attack/G17.png',
    './img/4_enemie_boss_chicken/3_attack/G18.png',
    './img/4_enemie_boss_chicken/3_attack/G19.png',
    './img/4_enemie_boss_chicken/3_attack/G20.png',
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
  isHurt = false;
  isAttacking = false;
  invulnerable = false;

    /**
   * Constructs an instance of the Endboss class.
   * Loads initial alert image, and starts animation based on player interaction.
   */
  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 3800;
    this.speed = 4;
    this.animate();
  }

    /**
   * Initiates the main animation loop for the end boss character.
   * Controls animation based on game state and player interaction.
   */
  animate() {
    this.animationInterval = setInterval(() => {
      if (world && world.character) {
        if (world.character.x > 3300 && !this.hadFirstContact) {
          this.endbossWalking();
        } else if (this.bossDead) {
          this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt) {
          this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAttacking) {
          this.playAnimation(this.IMAGES_ATTACK);
        } else if (!this.hadFirstContact) {
          this.playAnimation(this.IMAGES_ALERT);
        } else {
          this.fasterWalk();
        }
      }
    }, 150);
  }

    /**
   * Handles the start of the end boss walking animation and game audio changes.
   */
  endbossWalking() {
    this.hadFirstContact = true;
    world.audio.bossfight_audio.play();
    world.audio.background.pause();
    this.startWalking();
  }

  /**
   * Starts the walking animation and movement of the end boss character.
   * Sets intervals for movement and animation.
   */
  startWalking() {
    if (this.walkingInterval) clearInterval(this.walkingInterval);
    this.walkingInterval = setInterval(() => {
      if (!this.isHurt && !this.bossDead && !this.isAttacking) {
        this.moveLeft();
      }
    }, 1000 / 60);

    if (this.walkingAnimationInterval)
      clearInterval(this.walkingAnimationInterval);
    this.walkingAnimationInterval = setInterval(() => {
      if (!this.isHurt && !this.bossDead && !this.isAttacking) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }

    /**
   * Initiates the hurt animation for the end boss character.
   * Plays appropriate audio and schedules recovery or death.
   */
  hurtAnimation() {
    this.isHurt = true;
    world.audio.bossChicke_walk_audio.play();
    setTimeout(() => {
      this.isHurt = false;
      if (!this.bossDead) {
        this.startWalking();
      } else {
        this.die();
      }
    }, 1000);
  }

    /**
   * Initiates the death animation and cleanup for the end boss character.
   * Plays death audio and removes the boss from the game after animation completion.
   */
  die() {
    this.bossDead = true;
    world.audio.bossChicken_dead_audio.play();
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      let index = world.level.enemies.indexOf(this);
      if (index > -1) {
        world.level.enemies.splice(index, 1);
        world.gameWin = true;
        world.audio.bossChicken_dead_audio.pause();
        world.audio.bossChicke_walk_audio.pause();
      }
    }, 1000);
  }

    /**
   * Initiates the attack animation and controls for the end boss character.
   * Manages intervals for attack animation and resets to walking after attack.
   */
  chickenBossAttack() {
    this.isAttacking = true;
    this.attackInterval = setInterval(() => {
      if (!this.bossDead && !this.isHurt) {
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

    /**
   * Handles the interaction when the end boss character is hit.
   * Initiates hurt animation, checks for death, and sets invulnerability period.
   */
  hitEndBoss() {
    if (!this.bossDead && !this.isHurt) {
      this.hadFirstContact = true;
      this.hurtAnimation();
      if (this.isDead()) {
        this.die();
      }
      this.invulnerable = true;
      setTimeout(() => {
        this.invulnerable = false;
      }, 1500);
    }
  }

    /**
   * Adjusts the walking speed of the end boss character based on remaining energy.
   * Increases speed as energy decreases to add challenge to the game.
   */
  fasterWalk() {
    if (this.energy < 80 && this.speed !== 7) {
      this.speed = 7;
    } else if (this.energy < 60 && this.speed !== 10) {
      this.speed = 10;
    }
  }
}
