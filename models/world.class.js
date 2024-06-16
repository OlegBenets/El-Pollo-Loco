class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  bossStatus = new BossStatusBar();
  healthStatus = new HealthStatusBar();
  salsaBottleStatus = new BottleStatusBar();
  coinStatus = new CoinStatusBar();
  throwableObjects = []; 

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
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
    }, 200);
  }

  checkThrowObject() {
    if(this.keyboard.D) {
      if (this.character.bottles > 0) {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObjects.push(bottle);
        this.character.throwBottle();
            this.salsaBottleStatus.setPercentage(this.character.bottles);

            this.level.enemies.forEach((enemy) => {
              if(bottle.isColliding(enemy)) {
                enemy.chickenDead();
              }
            });
    } 
   }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if(this.character.isColliding(enemy)) {
        if(!this.character.isAboveGround()) {
          this.character.hit();
          this.healthStatus.setPercentage(this.character.energy)
        } else {
          this.defeatEnemy(enemy);
          }
      }
    });
  }

  defeatEnemy(enemy) {
    if((enemy instanceof Chicken || enemy instanceof SmallChicken) && !enemy.isDead && this.character.isColliding(enemy)) {
      enemy.EnemyDead();
      this.character.jump();
  }
}

  checkBottleCollection() {
    this.level.bottles.forEach((bottle, index) => {
      if(this.character.isColliding(bottle)) {
        if(this.character.bottles < 100) {
          this.character.bottleCollected();
          this.salsaBottleStatus.setPercentage(this.character.bottles);
          this.level.bottles.splice(index, 1);
        }
      }
    })
  }

  checkCoinCollection() {
    this.level.coins.forEach((coin, index) => {
      if(this.character.isColliding(coin)) {
        if(this.character.coins < 100) {
          this.character.coinsCollected();
          this.coinStatus.setPercentage(this.character.coins);
          this.level.coins.splice(index, 1);
        }
      }
    })
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
    mo.drawFrame(this.ctx);

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
