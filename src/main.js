// Calvin Hunter
// Created: 4/14/2024
// Phaser: 3.70.0
//
// Hot Diggity Dog
//
// 
// 
// 
// 

//

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 480,         // 10 tiles, each 16 pixels, scaled 4x
    height: 720,
    scene: [TitleScreen, LevelOne, DeathScreen, WaveScreen, RulesScreen]
    
}

const game = new Phaser.Game(config);
