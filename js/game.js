class Main {

    preload() {
        this.load.image('player', 'assets/player.png');

    }


    create() {
        this.player = this.physics.add.sprite(250, 170, 'player');

    }

    update() {

        this.player.angle++;
    }
}


let game = new Phaser.Game({
    width:500,
    height:340,
    backgroundColor:'#3498db',
    physics:{ default: 'arcade' },
    parent: 'game'
    });
    game.scene.add('main',Main);
    game.scene.start('main');
    