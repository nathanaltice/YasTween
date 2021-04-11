class SonicTitle extends Phaser.Scene {
    constructor() {
        super('sonictitleScene');
    }

    create() {
        // resize game 
        game.scale.resize(800, 600);
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;

        // add instruction text
        let instructText = this.add.bitmapText(centerX, centerY, 'gem_font', 'Click to go fast', 16).setOrigin(0.5);

        // generate textures from graphics primitives: .generateTexture(key [, width] [, height])
        // blue rectangle
        let gfx = this.make.graphics().fillStyle(0x0000ff).fillRect(0, 0, w, h);
        gfx.generateTexture('bluerect', w, h);
        // red rectangle
        gfx = this.make.graphics().fillStyle(0xff0000).fillRect(0, 0, w/3, h);
        gfx.generateTexture('redrect', w/3, h);
        // yellow rectangle
        gfx = this.make.graphics().fillStyle(0xffff00).fillRect(0, 0, w, h/4);
        gfx.generateTexture('yellowrect', w, h/4);
        // now clean up after ourselves
        gfx.destroy();

        // add graphics textures as images (so we can tween them)
        let blueRect = this.add.image(0, -h, 'bluerect').setOrigin(0);
        let yellowRect = this.add.image(w, h/4*3, 'yellowrect').setOrigin(0);
        let redRect = this.add.image(0-w/3, 0, 'redrect').setOrigin(0);

        // add text
        let topText = this.add.bitmapText(w*2, h/4, 'gem_font', 'MAGIC TITLE CARD', 64).setOrigin(1, 0);
        let middleText = this.add.bitmapText(0, h/4 + 64, 'gem_font', 'TEST 1', 64).setOrigin(1, 0);
        let bottomText = this.add.text(w*2, h-128, 'SANIC DA SHREKHOG', {
            fontFamily: 'Futura',
            fontSize: '24px',
            color: '#000000'
        }).setOrigin(1, 0);

        // add tweens
        let blueTween = this.tweens.add({
            targets: blueRect,
            y: 0,
            ease: 'Linear',
            duration: 250,
            repeat: 0,
            yoyo: true,
            hold: 1800,
            onYoyo: function() {
                // launch next scene
                this.scene.launch('basicsScene');
                this.scene.moveDown('basicsScene');
            },
            onYoyoScope: this,  // maintain scene context
            paused: true
        });

        let yellowTween = this.tweens.add({
            delay: 125,
            targets: yellowRect,
            x: 0,
            ease: 'Linear',
            duration: 250,
            repeat: 0,
            yoyo: true,
            hold: 1650,
            paused: true
        });

        let bottomTextTween = this.tweens.add({
            delay: 125,
            targets: bottomText,
            x: w-32,
            ease: 'Linear',
            duration: 250,
            repeat: 0,
            yoyo: true,
            hold: 1650,
            paused: true
        });

        let redTween = this.tweens.add({
            delay: 250,
            targets: redRect,
            x: 0,
            ease: 'Linear',
            duration: 125,
            repeat: 0,
            yoyo: true,
            hold: 1500,
            paused: true
        });

        let topTextTween = this.tweens.add({
            delay: 375,
            targets: topText,
            x: w - 64,
            ease: 'Linear',
            duration: 250,
            repeat: 0,
            yoyo: true,
            hold: 2500,
            paused: true,
            onComplete: function() {
                this.scene.stop('sonictitleScene');
            },
            onCompleteScope: this   // maintain scene context
        });

        let middleTextTween = this.tweens.add({
            delay: 375,
            targets: middleText,
            x: w - 64,
            ease: 'Linear',
            duration: 250,
            repeat: 0,
            yoyo: true,
            hold: 2500,
            paused: true
        });

        // add mouse input listener to start animation
        this.input.on('pointerdown', () => {
            // kill instruct text
            instructText.destroy();
            // start all tweens
            blueTween.play();
            yellowTween.play();
            bottomTextTween.play();
            redTween.play();
            topTextTween.play();
            middleTextTween.play();
            // remove listener to prevent click spamming animation
            this.input.off('pointerdown');
        });

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('S');
        this.reload = this.input.keyboard.addKey('R');

        // update instruction text
        document.getElementById('info').innerHTML = '<strong>SonicTitle.js:</strong> See above, chief 👆';
    }

    update() {
        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart();
        }
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            //this.scene.start("");
        }
    }
}