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
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [ BasicTween ]
}

const game = new Phaser.Game(config);

// some globals
const centerX = game.config.width / 2;
const centerY = game.config.height / 2;
const w = game.config.width;
const h = game.config.height;

let cursors = null;