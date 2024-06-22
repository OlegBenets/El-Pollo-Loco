/**
 * Represents the game world where gameplay and rendering occur.
 */
class World {
    /**
   * @property {Character} character - The main character of the game.
   * @property {Audio} audio - The audio manager for the game.
   * @property {Level} level - The current level of the game.
   * @property {HTMLCanvasElement} canvas - The canvas element for rendering.
   * @property {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   * @property {Keyboard} keyboard - The keyboard input manager.
   * @property {number} camera_x - The x-coordinate of the camera for scrolling.
   * @property {BossStatusBar} bossStatus - The status bar for the boss's health.
   * @property {HealthStatusBar} healthStatus - The status bar for the character's health.
   * @property {StatusBar} salsaBottleStatus - The status bar for salsa bottle count.
   * @property {CoinStatusBar} coinStatus - The status bar for coin count.
   * @property {Winscreen} winscreen - The screen displayed upon winning the game.
   * @property {Losescreen} losescreen - The screen displayed upon losing the game.
   * @property {ThrowableObject[]} throwableObjects - Array of throwable objects in the world.
   * @property {number} lastThrowTIme - Timestamp of the last bottle throw.
   * @property {number} gameInterval - Interval ID for the game loop.
   * @property {number} animationFrame - ID for the animation frame request.
   * @property {boolean} gameOver - Flag indicating if the game is over.
   * @property {boolean} gameWin - Flag indicating if the game is won.
   */
  character = new Character();
  audio;
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  bossStatus = new BossStatusBar();
  healthStatus = new HealthStatusBar();
  salsaBottleStatus = new BottleStatusBar();
  coinStatus = new CoinStatusBar();
  winscreen = new Winscreen();
  losescreen = new Losescreen();
  throwableObjects = [];
  lastThrowTIme = 0;
  gameInterval;
  animationFrame;

    /**
   * Constructs a World object.
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
   * @param {Keyboard} keyboard - The keyboard input manager.
   * @param {Audio} audio - The audio manager for the game.
   */
  constructor(canvas, keyboard, audio) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.audio = audio;
    this.gameOver = false;
    this.gameWin = false;
    this.draw();
    this.setWorld();
    this.run();
    this.initializeBackgroundAudio();
  }

    /**
   * Initializes the background audio if available.
   */
  initializeBackgroundAudio() {
    if (this.audio && this.audio.background) {
      this.audio.background.play();
    }
  }

    /**
   * Sets the current world reference for the character.
   */
  setWorld() {
    this.character.world = this;
  }

    /**
   * Starts the game loop.
   */
  run() {
    this.gameInterval = setInterval(() => {
      if (this.gameOver || this.gameWin) {
        this.stopGame();
      } else {
        this.checkCollisions();
        this.checkBottleCollection();
        this.checkCoinCollection();
        this.checkThrowObject();
        this.bottleCollisionWithEnemy();
      }
    }, 1000 / 60);
  }

    /**
   * Stops the game loop and displays the appropriate screen (win/lose).
   */
  stopGame() {
    clearInterval(this.gameInterval);
    cancelAnimationFrame(this.animationFrame);
    this.keyboard = null;
    if (this.gameOver) {
      this.addToMap(this.losescreen);
    } else if (this.gameWin) {
      this.addToMap(this.winscreen);
    }
    document.getElementById("back-to-menu").classList.remove("d-none");
  }

    /**
   * Checks if the character throws a bottle based on keyboard input.
   */
  checkThrowObject() {
    if (this.keyboard.D && Date.now() - this.lastThrowTIme >= 500) {
      if (this.character.bottles > 0) {
        this.audio.throw_audio.play();
        this.audio.throw_audio.volume = 0.1;
        this.throwBottleAndUpdateStatus();
      }
    }
  }

    /**
   * Checks collisions between the character and enemies.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (!this.character.isColliding(enemy)) {
        return;
      }
      if (this.character.isAboveGround()) {
        this.defeatEnemy(enemy);
      } else if (enemy instanceof Endboss && !enemy.isAttacking) {
        enemy.chickenBossAttack();
      } else if (!this.character.isHurt()) {
        this.character.hit();
        this.healthStatus.setPercentage(this.character.energy);
      }
    });
  }

    /**
   * Checks collisions between throwable bottles and enemies.
   */
  bottleCollisionWithEnemy() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (!bottle.isColliding(enemy)) return;
        if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
          this.handleChickenCollision(enemy);
        } else if (enemy instanceof Endboss) {
          this.handleEndbossCollision(enemy);
        }
        bottle.splashAnimation();
        bottle.removeBottle();
      });
    });
  }

    /**
   * Handles collision between throwable bottle and chicken enemy.
   * @param {Chicken | SmallChicken} enemy - The chicken enemy object.
   */
  handleChickenCollision(enemy) {
    enemy.EnemyDead();
    this.audio.splash_audio.play();
    this.audio.chicken_dead_audio.play();
  }

    /**
   * Handles collision between throwable bottle and end boss enemy.
   * @param {Endboss} enemy - The end boss enemy object.
   */
  handleEndbossCollision(enemy) {
    if (!enemy.invulnerable) {
      enemy.hitEndBoss();
      enemy.hitChickenBoss();
      this.audio.splash_audio.play();
    }
    if (enemy.bossDead) {
      this.audio.bossfight_audio.pause();
      this.audio.game_win_audio.play();
    }
    this.bossStatus.setPercentage(enemy.energy);
  }

    /**
   * Defeats a ground-level chicken enemy.
   * @param {Chicken | SmallChicken} enemy - The chicken enemy object.
   */
  defeatEnemy(enemy) {
    if ((enemy instanceof Chicken || enemy instanceof SmallChicken) && !enemy.isDead && this.character.isAboveEnemyTop(enemy)) {
      enemy.EnemyDead();
      this.audio.chicken_dead_audio.play();
      this.character.jump();
      this.audio.jumping_audio.play();
    }
  }

   /**
   * Checks collision between character and bottles in the level.
   */
  checkBottleCollection() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        if (this.character.bottles < 100) {
          this.characterCollectedBottle(index);
        }
      }
    });
  }

    /**
   * Checks collision between character and coins in the level.
   */
  checkCoinCollection() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        if (this.character.coins < 100) {
          this.characterCollectedCoin(index);
        }
      }
    });
  }

    /**
   * Throws a bottle from the character's position and updates related statuses.
   */
  throwBottleAndUpdateStatus() {
    let bottle = new ThrowableObject(
      this.character.x + 100,
      this.character.y + 100
    );
    this.throwableObjects.push(bottle);
    this.character.throwBottle();
    this.salsaBottleStatus.setPercentage(this.character.bottles);
    this.lastThrowTIme = Date.now();
  }

    /**
   * Handles character collecting a bottle from the level.
   * @param {number} index - The index of the collected bottle in the level.
   */
  characterCollectedBottle(index) {
    this.character.bottleCollected();
    this.salsaBottleStatus.setPercentage(this.character.bottles);
    this.level.bottles.splice(index, 1);
  }

    /**
   * Handles character collecting a coin from the level.
   * @param {number} index - The index of the collected coin in the level.
   */

  characterCollectedCoin(index) {
    this.character.coinsCollected();
    this.audio.coin_audio.play();
    this.coinStatus.setPercentage(this.character.coins);
    this.level.coins.splice(index, 1);
  }

    /**
   * Renders all objects in the game world.
   */
  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);

    this.ctx.translate(-this.camera_x, 0);
    //--------Space for fixed objects----------//
    this.addToMap(this.bossStatus);
    this.addToMap(this.healthStatus);
    this.addToMap(this.coinStatus);
    this.addToMap(this.salsaBottleStatus);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);

    if (this.gameOver || this.gameWin) {
      this.stopGame();
      return;
    }
    // draw() wird immer wieder aufgerufen
    this.animationFrame = requestAnimationFrame(() => this.draw());
  }

   /**
   * Adds multiple objects to be rendered to the game world.
   * @param {object[]} objects - An array of objects to be rendered.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

    /**
   * Renders a single object to the canvas.
   * @param {object} mo - The object to be rendered.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

    /**
   * Flips the image horizontally for objects that face the opposite direction.
   * @param {object} mo - The object whose image needs to be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

    /**
   * Restores the canvas context after flipping an image.
   * @param {object} mo - The object whose image was flipped.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
