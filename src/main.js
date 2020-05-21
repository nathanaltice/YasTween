// Nathan Altice
// Created: 5/19/20
// Updated: 5/21/20
// Tweens
// Phaser 3 Tween examples demonstrating tweens, timelines, callbacks, easing equations, and number counters

// CODE ARMOR
'use strict';

// define game object
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    pixelArt: true,
    width: 800,
    height: 600,
    scene: [ Basics, Counter, AllEases, SonicTitle ]
}

const game = new Phaser.Game(config);

// global
let cursors = null;