// Nathan Altice
// Created: 5/19/20
// Updated: 5/22/23 (Phaser 3.60)
// Tweens
// Phaser 3 Tween examples demonstrating tweens, chains, callbacks, easing equations, and number counters

// CODE ARMOR
'use strict'

// define game object
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    pixelArt: true,
    width: 800,
    height: 600,
    scene: [ Basics, AllEases, SonicTitle, PlaySonic ]
}

const game = new Phaser.Game(config)

// global
let cursors = null