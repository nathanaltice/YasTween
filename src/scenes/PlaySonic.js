class PlaySonic extends Phaser.Scene {
    constructor() {
        super('playSonicscene')
    }

    preload() {
        this.load.image('sonic-screen', './assets/img/sonic-screenshot.png')
    }

    create() {
        // place background image
        this.add.image(0, 0, 'sonic-screen').setOrigin(0)

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('S')
        this.reload = this.input.keyboard.addKey('R')

        // update instruction text
        document.getElementById('info').innerHTML = '<strong>SonicTitle.js:</strong> S: Next scene | R: Repeat title card animation'
    }

    update() {
        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.start("sonictitleScene")
        }
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start("basicsScene")
        }
    }
}