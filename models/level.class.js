/**
 * Represents a game level with various objects.
 */
class Level {
      /**
   * @property {DrawableObject[]} enemies - Array of enemy objects in the level.
   * @property {Cloud[]} clouds - Array of cloud objects in the level.
   * @property {DrawableObject[]} backgroundObjects - Array of background objects in the level.
   * @property {DrawableObject[]} bottles - Array of bottle objects in the level.
   * @property {Coins[]} coins - Array of coin objects in the level.
   * @property {number} level_end_x - The x-coordinate where the level ends horizontally.
   */
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  coins;
  level_end_x = 3500;

    /**
   * @param {DrawableObject[]} enemies - Array of enemy objects to populate the level with.
   * @param {Cloud[]} clouds - Array of cloud objects to populate the level with.
   * @param {DrawableObject[]} backgroundObjects - Array of background objects to populate the level with.
   * @param {DrawableObject[]} bottles - Array of bottle objects to populate the level with.
   * @param {Coins[]} coins - Array of coin objects to populate the level with.
   */
  constructor(enemies, clouds, backgroundObjects, bottles, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
    this.coins = coins;
  }
}
