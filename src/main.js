// Nathan Altice
// Created: 5/19/20
// Updated: 5/19/20
// Tweens
// Phaser 3 Tween demos

// CODE ARMOR
'use strict';

// define game object
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    pixelArt: true,
    width: 800,
    height: 600,
    scene: [ SonicTitle, BasicTween, AllEases ]
}

const game = new Phaser.Game(config);

// global
let cursors = null;