class BasicTween extends Phaser.Scene {
    constructor() {
        super('basictweenScene');
    }

    preload() {
        // load assets
        this.load.path = './assets/';
        this.load.atlas('fruitandveg', 'img/fruitandveg.png', 'img/fruitandveg.json');
    }

    create() {
        // do camera stuff
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        this.cameras.main.setBackgroundColor(0x444444);

        // add sprites
        this.tomato = this.add.sprite(centerX, centerY, 'fruitandveg', 'tomato').setScale(3);

        // add tween
        let basicTween = this.tweens.add({
            targets: this.tomato,
            alpha: { from: 0, to: 1 },
            ease: 'Linear',
            duration: 3000,
            repeat: 0,
            yoyo: false
        });

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('S');
        this.reload = this.input.keyboard.addKey('R');

        // update instruction text
        document.getElementById('info').innerHTML = '<strong>BasicTween.js:</strong> [...]';
    }

    update() {
        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart();
        }
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start("alleasesScene");
        }
    }
}