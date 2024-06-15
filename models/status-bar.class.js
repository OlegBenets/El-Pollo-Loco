class StatusBar extends DrawableObject {


    IMAGES = [];
    percentage = 100;

    constructor(images, x, y, width, height, initialPercentage = 100) {
        super();
        this.IMAGES = images;
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.setPercentage(initialPercentage);
    }

setPercentage(percentage) {
    this.percentage = percentage;
    let newIndex = this.resolveImageIndex();
    let path = this.IMAGES[newIndex];
    this.img = this.imageCache[path];
}

    resolveImageIndex() {
        if(this.percentage >= 80 && this.percentage <= 100) {
            return 5;
        } else if (this.percentage >= 60 && this.percentage < 80) {
            return 4;
        } else if (this.percentage >= 40 && this.percentage < 60) {
            return 3;
        } else if (this.percentage >= 20 && this.percentage < 40) {
            return 2;
        } else if (this.percentage > 0 && this.percentage < 20) {
            return 1;
        } else {
            return 0;
        }
    }
}