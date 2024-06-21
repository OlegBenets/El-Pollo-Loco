class World {
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

  initializeBackgroundAudio() {
    if(this.audio && this.audio.background) {
      this.audio.background.play();
    }
}

  setWorld() {
    this.character.world = this;
  }


  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkBottleCollection();
      this.checkCoinCollection();
      this.checkThrowObject();
      this.bottleCollisionWithEnemy();
    }, 1000 / 60);
  }


  checkThrowObject() {
    if(this.keyboard.D && Date.now() - this.lastThrowTIme >= 500) {
      if (this.character.bottles > 0) {
        this.audio.throw_audio.play();
        this.audio.throw_audio.volume = 0.1;
        this.throwBottleAndUpdateStatus();
    }
   }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if(this.character.isColliding(enemy)) {
        if(!this.character.isAboveGround()) {
          if(enemy instanceof Endboss && !enemy.isAttacking) {
            enemy.chickenBossAttack();
          } else if(!this.character.isHurt()) {
            this.character.hit();
            this.healthStatus.setPercentage(this.character.energy);
          }
        } else {
          this.defeatEnemy(enemy);
          }
      }
    });
  }

  bottleCollisionWithEnemy() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) =>  {
        if(bottle.isColliding(enemy)) {
          if(enemy instanceof Chicken || enemy instanceof SmallChicken) {
            enemy.EnemyDead();
            this.audio.splash_audio.play();
            this.audio.chicken_dead_audio.play();
          } else if (enemy instanceof Endboss) {
            if(!enemy.invulnerable) {
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
          bottle.splashAnimation();
          bottle.removeBottle();
        }
      });
      });
    }

  defeatEnemy(enemy) {
    if((enemy instanceof Chicken || enemy instanceof SmallChicken) && !enemy.isDead && this.character.isAboveEnemyTop(enemy)) {
      enemy.EnemyDead();
      this.audio.chicken_dead_audio.play();
      this.character.jump();
      this.audio.jumping_audio.play();
  }
}


  checkBottleCollection() {
    this.level.bottles.forEach((bottle, index) => {
      if(this.character.isColliding(bottle)) {
        if(this.character.bottles < 100) {
          this.characterCollectedBottle(index);
        }
      }
    })
  }

  checkCoinCollection() {
    this.level.coins.forEach((coin, index) => {
      if(this.character.isColliding(coin)) {
        if(this.character.coins < 100) {
          this.characterCollectedCoin(index);
        }
      }
    })
  }

  throwBottleAndUpdateStatus() {
    let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
    this.throwableObjects.push(bottle);
    this.character.throwBottle();
    this.salsaBottleStatus.setPercentage(this.character.bottles);
    this.lastThrowTIme = Date.now();
  }

  characterCollectedBottle(index) {
    this.character.bottleCollected();
    this.salsaBottleStatus.setPercentage(this.character.bottles);
    this.level.bottles.splice(index, 1);
  }

  characterCollectedCoin(index) {
    this.character.coinsCollected();
    this.audio.coin_audio.play();
    this.coinStatus.setPercentage(this.character.coins);
    this.level.coins.splice(index, 1);
  }

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

    if (this.gameOver) {
        this.addToMap(this.losescreen);
        document.getElementById('back-to-menu').classList.remove('d-none');
        return;
    } else if (this.gameWin) {
      this.addToMap(this.winscreen);
      document.getElementById('back-to-menu').classList.remove('d-none');
      return;
    }
    // draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

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


  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }


  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
