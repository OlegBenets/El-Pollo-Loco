/**
 * Represents a drawable object with basic properties and drawing functionality.
 */
class DrawableObject {
    /**
   * @property {number} height - The height of the drawable object.
   * @property {number} width - The width of the drawable object.
   * @property {number} x - The x-coordinate of the drawable object.
   * @property {number} y - The y-coordinate of the drawable object.
   * @property {HTMLImageElement} img - The image object associated with the drawable object.
   * @property {Object.<string, HTMLImageElement>} imageCache - Cache for storing loaded images.
   * @property {number} currentImage - Index of the current image being displayed.
   */

  height = 150;
  width = 100;
  x = 120;
  y = 280;
  img;
  imageCache = {};
  currentImage = 0;

    /**
   * Loads an image from the specified path and assigns it to the img property.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementById('image') <img id='image' src>
    this.img.src = path;
  }

   /**
   * Draws the drawable object onto the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

   /**
   * Preloads images from an array of paths into the imageCache.
   * @param {string[]} arr - Array of paths to the image files.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  // /**
  //  * Draws a frame around the drawable object.
  //  * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
  //  */
  // drawFrame(ctx) {
  //   if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss || this instanceof Coins || this instanceof SalsaBottle || this instanceof ThrowableObject) {
  //     ctx.beginPath();
  //     ctx.lineWidth = '5';
  //     ctx.strokeStyle = 'blue';
  //     ctx.rect(this.x, this.y, this.width, this.height);
  //     ctx.stroke();
  //   }

  //   if (this.offsetTop !== undefined) {
  //     ctx.beginPath();
  //     ctx.lineWidth = '5';
  //     ctx.strokeStyle = 'red';
  //     ctx.rect(this.x + this.offsetLeft, this.y + this.offsetTop, this.width - this.offsetLeft - this.offsetRight, this.height - this.offsetTop - this.offsetBottom);
  //     ctx.stroke();
  //   }
  // }
}
