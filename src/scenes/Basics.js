class Basics extends Phaser.Scene {
    constructor() {
        super('basicsScene');
    }

    preload() {
        // load assets
        this.load.path = './assets/';
        this.load.atlas('fruitandveg', 'img/fruitandveg.png', 'img/fruitandveg.json');
        this.load.bitmapFont('gem_font', 'font/gem.png', 'font/gem.xml');
    }

    create() {
        // do camera stuff
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;
        this.cameras.main.setBackgroundColor(0x11dc00);

        // add sprites
        let tomato = this.add.sprite(centerX, centerY, 'fruitandveg', 'tomato');
        let verygoodpear = this.add.sprite(64, 64, 'fruitandveg', 'pear');

        // add text
        this.instructionText = this.add.bitmapText(centerX, centerY, 'gem_font', '', 24).setOrigin(0.5);

        // add tween
        let basicTween = this.tweens.add({
            targets: tomato,
            alpha: { from: 0, to: 1 },
            scale: { from: 0.1, to: 18 },
            angle: { from: 0, to: 360 },
            ease: 'Sine.easeInOut',
            duration: 2000,
            repeat: 1,
            yoyo: true,
            hold: 1000,
            onComplete: function() {
                this.instructionText.text = 'Click to tween that Very Good Pear©';
            },
            onCompleteScope: this
        });

        // create timeline
        let pearTimeline = this.tweens.timeline({
            targets: verygoodpear,
            ease: 'Bounce.easeOut',
            loop: 1,    
            paused: true,
            tweens: [{
                x: w - 64,
                duration: 3000
            },
            {
                y: h - 64,
                duration: 1000,
                ease: 'Sine.easeOut'    // note that this will supersede the timeline ease above
            },
            {
                x: 64,
                duration: 1500
            },
            {
                y: 64,
                duration: 1000
            }],
            onStart: function() {
                this.instructionText.text = 'The pear departs on its tween...';
            },
            onStartScope: this,     // maintain scene scope
            onLoop: function() {
                this.instructionText.text = 'The pear loops, undaunted...'
            },
            onLoopScope: this,
            onComplete: function() {
                pearTimeline.paused = true;
                this.instructionText.text = 'The pear completes its tween...for now?';
            },
            onCompleteScope: this
        });

        // add mouse input listener to start timeline
        this.input.on('pointerdown', () => {
            if(!pearTimeline.isPlaying()) {
                pearTimeline.play();
            }
        });

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('S');
        this.reload = this.input.keyboard.addKey('R');

        // update instruction text
        document.getElementById('info').innerHTML = '<strong>Basics.js:</strong> S advances to next scene, R restarts the current scene';
    }

    update() {
        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart();
        }
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start("counterScene");
        }
    }
}