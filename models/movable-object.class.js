class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  energy = 100;
  bottles = 0;
  lastHit = 0;

  applyGravity() {
    this.applyGravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 60);
  }

  isAboveGround() {
    if(this instanceof ThrowableObject) {
      return true;
    } else {
    return this.y < 160;
    }
  }


  isColliding(mo) {
    return this.x + this.width - this.offsetRight > mo.x + mo.offsetLeft &&
           this.y + this.height - this.offsetBottom > mo.y + mo.offsetTop &&
           this.x + this.offsetLeft < mo.x + mo.width - mo.offsetRight && 
           this.y + this.offsetTop < mo.y + mo.height - mo.offsetBottom;
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 500;
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // let i = 7 % 6; => 1, Rest 1
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }

  bottleCollected() {
    this.bottles += 0;
    if(this.bottles > 100) {
      this.bottles = 100;
    }
    console.log(`Flasche gesammelt. Gesamtflaschen: ${this.bottles}`);
  }

  throwBottle() {
    this.bottles -= 20;
    if(this.bottles < 0) {
      this.bottles = 0;
    }
    console.log(`Flasche geworfen. Verbleibende Flaschen: ${this.bottles}`);
  }
}
