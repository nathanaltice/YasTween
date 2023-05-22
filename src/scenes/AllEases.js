// Note: This Scene is a cleaner, commented, and more complete adaptation of the "Ease Equations" example from the Phaser 3 examples page: https://phaser.io/examples/v3/view/tweens/ease-equations

class AllEases extends Phaser.Scene {
    constructor() {
        super('alleasesScene')
    }

    preload() {
        // load assets
        this.load.path = './assets/'
        this.load.image('5x5', 'img/5x5_white.png')
    }

    create() {
        // resize game to fit vertical aspect ratio 
        game.scale.resize(600, 800)

        // define all 32 Phaser 3 easing equations
        let eases = [
            'Linear',           // or 'Power0'
            'Quad.easeOut',     // or 'Power1' / 'Quad'
            'Cubic.easeOut',    // or 'Power2' / 'Cubic'
            'Quart.easeOut',    // or 'Power3' / 'Quart'
            'Quint.easeOut',    // or 'Power4' / 'Quint'
            'Sine.easeOut',     // or 'Sine'
            'Expo.easeOut',     // or 'Expo'
            'Circ.easeOut',     // or 'Circ'
            'Back.easeOut',     // or 'Back'
            'Bounce.easeOut',   // or 'Bounce'
            'Elastic.easeOut',  // or 'Elastic'
            'Stepped',          // default `steps` number = 1
            'Quad.easeIn',
            'Cubic.easeIn',
            'Quart.easeIn',
            'Quint.easeIn',
            'Sine.easeIn',
            'Expo.easeIn',
            'Circ.easeIn',
            'Back.easeIn',
            'Bounce.easeIn',
            'Elastic.easeIn',
            'Quad.easeInOut',
            'Cubic.easeInOut',
            'Quart.easeInOut',
            'Quint.easeInOut',
            'Sine.easeInOut',
            'Expo.easeInOut',
            'Circ.easeInOut',
            'Back.easeInOut',
            'Bounce.easeInOut',
            'Elastic.easeInOut'
        ]

        // create `marker` group to show tween starting points
        let markers = this.add.group({ 
            key: '5x5', 
            repeat: eases.length - 1, 
            setXY: { 
                x: 136, 
                y: 24, 
                stepY: 24 
            }, 
            setAlpha: { 
                value: 0.3 
            } 
        })
        // create `images` group (the images we'll actually tween)
        let images = this.add.group({ 
            key: '5x5', 
            repeat: eases.length - 1, 
            setXY: { 
                x: 136, 
                y: 24, 
                stepY: 24 
            }
        })
        // create text labels for each tween type
        let x = 24
        let y = 24
        for(let i = 0; i < eases.length; i++) {
            this.add.bitmapText(x, y, 'gem_font', eases[i], 10).setOrigin(0, 0.5)
            y += 24
        } 
        // iterate through each child in the group and add tween
        images.children.iterate( child => {
            this.tweens.add({
                targets: child,
                x: this.cameras.main.width - 64,
                ease: eases.shift(),
                duration: 3000,
                delay: 1000,
                repeat: -1,
                repeatDelay: 1000,
                hold: 1000
            })
        })

        // add mouse input listener to pause all tweens
        this.input.on('pointerdown', () => {
            this.tweens.pauseAll()
            console.log(this.tweens)
        })

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('S')
        this.reload = this.input.keyboard.addKey('R')

        // update instruction text
        document.getElementById('info').innerHTML = '<strong>AllEases.js</strong><br>Mouse: Click to pause all tweens<br>S: Next scene<br>R: Restart scene'
    }
    update() {
        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart()
        }
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start("sonictitleScene")
        }
    }
}