class Cloud extends MovableObject {
    y = 50;
    width = 500;
    height = 250;

    CLOUD_IMAGES = [
        '/img/5_background/layers/4_clouds/1.png',
        '/img/5_background/layers/4_clouds/2.png'
    ];

    constructor() {
        super();
        this.loadImages(this.CLOUD_IMAGES);
        this.x = Math.random() * 4000;
        this.currentImageIndex = Math.floor(Math.random() * this.CLOUD_IMAGES.length);
        this.img = this.imageCache[this.CLOUD_IMAGES[this.currentImageIndex]];
        this.animate();
    }

    animate() {
        this.moveLeft();
    }


    updateClouds() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.CLOUD_IMAGES.length;
        this.img = this.imageCache[this.CLOUD_IMAGES[this.currentImageIndex]];
    }
}