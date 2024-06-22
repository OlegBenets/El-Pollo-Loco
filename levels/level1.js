/**
 * Represents Level 1 of the game.
 * @param {Array<MovableObject>} enemies - Array of enemy objects present in the level.
 * @param {Array<Cloud>} clouds - Array of cloud objects in the background.
 * @param {Array<BackgroundObject>} backgroundObjects - Array of background objects.
 * @param {Array<SalsaBottle>} salsaBottles - Array of salsa bottle collectible objects.
 * @param {Array<Coins>} coins - Array of coin collectible objects.
 */
const level1 = new Level(
    [
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new Chicken(), 
      new Chicken(), 
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Endboss()
    ],
    [
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
    ],
    [
        new BackgroundObject('./img/5_background/layers/air.png', -719),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -719),
        new BackgroundObject('./img/5_background/layers/air.png', 0),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('./img/5_background/layers/air.png', 719),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719),
        new BackgroundObject('./img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 2),
        new BackgroundObject('./img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 3),
        new BackgroundObject('./img/5_background/layers/air.png', 719 * 4),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 4),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 4),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 4),
        new BackgroundObject('./img/5_background/layers/air.png', 719 * 5),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 5),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 5),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 5),
      ],
      [
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
      ],
      [
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
      ],
);