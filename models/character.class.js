/**
 * Represents the main character in the game, extending from MovableObject.
 */
class Character extends MovableObject {
  /**
   * @property {number} width - The width of the character.
   * @property {number} height - The height of the character.
   * @property {number} y - The initial y-coordinate of the character.
   * @property {number} speed - The movement speed of the character.
   * @property {number} acceleration - The acceleration of the character.
   * @property {number} lastActivityTime - The timestamp of the last activity.
   * @property {number} offsetRight - The offset from the right edge of the character's hitbox.
   * @property {number} offsetLeft - The offset from the left edge of the character's hitbox.
   * @property {number} offsetTop - The offset from the top edge of the character's hitbox.
   * @property {number} offsetBottom - The offset from the bottom edge of the character's hitbox.
   * @property {World} world - The reference to the game world.
   * @property {string[]} IMAGES_IDLE - Array of image paths for idle animations.
   * @property {string[]} IMAGES_LONG_IDLE - Array of image paths for long idle animations.
   * @property {string[]} IMAGES_WALKING - Array of image paths for walking animations.
   * @property {string[]} IMAGES_JUMPING - Array of image paths for jumping animations.
   * @property {string[]} IMAGES_HURT - Array of image paths for hurt animations.
   * @property {string[]} IMAGES_DEAD - Array of image paths for death animations.
   */
  width = 140;
  height = 280;
  y = 160;
  speed = 10;
  acceleration = 1;
  lastActivityTime = Date.now();
  offsetRight = 30;
  offsetLeft = 20;
  offsetTop = 80;
  offsetBottom = 10;
  world;

  IMAGES_IDLE = [
    './img/2_character_pepe/1_idle/idle/I-1.png',
    './img/2_character_pepe/1_idle/idle/I-2.png',
    './img/2_character_pepe/1_idle/idle/I-3.png',
    './img/2_character_pepe/1_idle/idle/I-4.png',
    './img/2_character_pepe/1_idle/idle/I-5.png',
    './img/2_character_pepe/1_idle/idle/I-6.png',
    './img/2_character_pepe/1_idle/idle/I-7.png',
    './img/2_character_pepe/1_idle/idle/I-8.png',
    './img/2_character_pepe/1_idle/idle/I-9.png',
    './img/2_character_pepe/1_idle/idle/I-10.png',
  ];

  IMAGES_LONG_IDLE = [
    './img/2_character_pepe/1_idle/long_idle/I-11.png',
    './img/2_character_pepe/1_idle/long_idle/I-12.png',
    './img/2_character_pepe/1_idle/long_idle/I-13.png',
    './img/2_character_pepe/1_idle/long_idle/I-14.png',
    './img/2_character_pepe/1_idle/long_idle/I-15.png',
    './img/2_character_pepe/1_idle/long_idle/I-16.png',
    './img/2_character_pepe/1_idle/long_idle/I-17.png',
    './img/2_character_pepe/1_idle/long_idle/I-18.png',
    './img/2_character_pepe/1_idle/long_idle/I-19.png',
    './img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];

  IMAGES_WALKING = [
    './img/2_character_pepe/2_walk/W-21.png',
    './img/2_character_pepe/2_walk/W-22.png',
    './img/2_character_pepe/2_walk/W-23.png',
    './img/2_character_pepe/2_walk/W-24.png',
    './img/2_character_pepe/2_walk/W-25.png',
    './img/2_character_pepe/2_walk/W-26.png',
  ];

  IMAGES_JUMPING = [
    './img/2_character_pepe/3_jump/J-31.png',
    './img/2_character_pepe/3_jump/J-32.png',
    './img/2_character_pepe/3_jump/J-33.png',
    './img/2_character_pepe/3_jump/J-34.png',
    './img/2_character_pepe/3_jump/J-35.png',
    './img/2_character_pepe/3_jump/J-36.png',
    './img/2_character_pepe/3_jump/J-37.png',
    './img/2_character_pepe/3_jump/J-38.png',
    './img/2_character_pepe/3_jump/J-39.png',
  ];

  IMAGES_HURT = [
    './img/2_character_pepe/4_hurt/H-41.png',
    './img/2_character_pepe/4_hurt/H-42.png',
    './img/2_character_pepe/4_hurt/H-43.png',
  ];

  IMAGES_DEAD = [
    './img/2_character_pepe/5_dead/D-51.png',
    './img/2_character_pepe/5_dead/D-52.png',
    './img/2_character_pepe/5_dead/D-53.png',
    './img/2_character_pepe/5_dead/D-54.png',
    './img/2_character_pepe/5_dead/D-55.png',
    './img/2_character_pepe/5_dead/D-56.png',
    './img/2_character_pepe/5_dead/D-57.png',
  ];

  /**
   * Constructs an instance of the Character class.
   * Loads initial walking image, sets up animation frames, and applies gravity.
   */
  constructor() {
    super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
  }

  /**
   * Sets up intervals for character animations and movement based on keyboard input.
   */
  animate() {
    setInterval(() => {
     this.handleMovement();
     this.updateCameraPosition();
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.CharacterDead();
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.isHurt()) {
        this.world.audio.hurt_audio.play();
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.world && this.world.keyboard && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.idleAnimations();
      }
    }, 100);
  }

    /**
   * Handles character movement based on keyboard input.
   */
  handleMovement() {
    this.world.audio.walking_audio.pause();

    if (this.world && this.world.keyboard) {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveCharacterRight();
      }
      if (this.world.keyboard.LEFT && this.x > 120) {
        this.moveCharacterLeft();
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.characterJump();
      }
    }
  }

    /**
   * Updates the camera position based on character movement.
   */
  updateCameraPosition() {
    if (this.world) {
      this.world.camera_x = -this.x + 100;
    }
  }

    /**
   * Moves the character to the right and plays walking audio.
   */
  moveCharacterRight() {
    this.moveRight();
    this.otherDirection = false;
    this.world.audio.walking_audio.play();
    this.lastActivityTime = Date.now();
  }

    /**
   * Moves the character to the left and plays walking audio.
   */
  moveCharacterLeft() {
    this.moveLeft();
    this.otherDirection = true;
    this.world.audio.walking_audio.play();
    this.lastActivityTime = Date.now();
  }

    /**
   * Initiates a jump for the character and plays jumping audio.
   */
  characterJump() {
    this.jump();
    this.world.audio.jumping_audio.play();
    this.lastActivityTime = Date.now();
  }

    /**
   * Handles idle animations based on inactivity time.
   */
  idleAnimations() {
    let idleTime = Date.now() - this.lastActivityTime;
    if (idleTime > 5000 && !this.world.gameOver && !this.world.gameWin) {
      this.world.audio.snoring.play();
      this.playAnimation(this.IMAGES_LONG_IDLE);
    } else {
      this.world.audio.snoring.pause();
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

    /**
   * Handles character death, stops background audio, plays game over audio, and triggers death animation.
   */
  CharacterDead() {
    if (!this.world.gameOver) {
      this.world.audio.background.pause();
      this.world.audio.bossfight_audio.pause();
      this.world.audio.game_lost_audio.play();
      this.playAnimation(this.IMAGES_DEAD);
      world.gameOver = true;
      world.audio.bossChicke_walk_audio.pause();
    }
  }
}
