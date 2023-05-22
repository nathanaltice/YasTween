class Counter extends Phaser.Scene {
    constructor() {
        super('counterScene')
    }

    create() {
        // do camera stuff
        const centerX = this.cameras.main.centerX
        const centerY = this.cameras.main.centerY
        const w = this.cameras.main.width
        const h = this.cameras.main.height

        // add number counter tweens
        this.linearcounter = this.tweens.addCounter({
            from: 100,
            to: 200,
            duration: 10000,
            ease: 'Linear'
        })

        this.easedcounter = this.tweens.addCounter({
            from: 100,
            to: 200,
            duration: 10000,
            ease: 'Sine.easeInOut'
        })

        // add text
        this.lcStatus = this.add.bitmapText(centerX, centerY - 32, 'gem_font', '', 64).setOrigin(0.5)
        this.ecStatus = this.add.bitmapText(centerX, centerY + 32, 'gem_font', '', 64).setOrigin(0.5)

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('S')
        this.reload = this.input.keyboard.addKey('R')

        // update instruction text
        document.getElementById('info').innerHTML = '<strong>Counter.js</strong><br>S: Next scene<br>R: Restart  current scene'
    }

    update() {
        // update counter text (use JS .toFixed method to chop decimal points)
        this.lcStatus.text = 'Linear:' + this.linearcounter.getValue().toFixed(2)
        this.ecStatus.text = 'Eased: ' + this.easedcounter.getValue().toFixed(2)

        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart()
        }
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start("alleasesScene")
        }
    }
}