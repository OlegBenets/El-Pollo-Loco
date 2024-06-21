class AudioManager {
    constructor() {
        this.throw_audio = new Audio('./audio/throw.mp3');
        this.splash_audio = new Audio('./audio/bottle-splash.mp3');
        this.jumping_audio = new Audio ('./audio/jump3.mp3');
        this.jumping_audio.volume = 0.5;
        this.chicken_dead_audio = new Audio('./audio/chicken-dead.mp3');
        this.bossChicken_dead_audio = new Audio('./audio/chicken-dead.mp3');
        this.coin_audio = new Audio('./audio/coin-collect.mp3');
        this.game_win_audio = new Audio('./audio/game-win.mp3');
        this.walking_audio = new Audio('./audio/walking2.mp3');
        this.hurt_audio = new Audio ('./audio/player-hurt.mp3');
        this.game_lost_audio = new Audio('./audio/game-over.mp3');
        this.bossfight_audio = new Audio('./audio/boss-fight.mp3');
        this.bossChicke_walk_audio = new Audio('./audio/chicken.mp3');
        this.background = new Audio('./audio/background.mp3');
    }
}