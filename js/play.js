class Play {



    create() {
        this.player = this.physics.add.sprite(250, 170, 'player');

        this.player.body.gravity.y = 500;

        this.arrow = this.input.keyboard.createCursorKeys();
        this.createWorld();
        this.cola = this.physics.add.sprite(60, 130, 'cola');
        this.scoreLabel = this.add.text(30, 25, 'score:0',
            { font: '18px Arial', fill: '#fff' })
        this.score = 0;


        this.slimes = this.physics.add.group();
        this.guns = this.physics.add.group();

        this.time.addEvent({
            delay: 2000,
            callback: () => this.addSlime(),
            loop: true,

        });


    }

    update() {
 
        this.physics.collide(this.player, this.walls);
        this.physics.collide(this.guns, this.walls);
        //       this.physics.collide(this.guns, this.slimes);

        this.physics.overlap(this.guns, this.slimes, this.slimeDie);




        this.physics.collide(this.slimes, this.walls);

        this.movePlayer();
        if (this.player.y > 340 || this.player.y < 0) {
            this.playerDie();
        }

        if (this.physics.overlap(this.player, this.cola)) {
            this.takeCola();
        }

        if (this.physics.overlap(this.player, this.slimes)) {
            this.playerDie();
        }
        if (this.physics.overlap(this.guns, this.slimes)) {
            this.slimes
        }

    }

    addSlime() {
        let slimeSpeed = -10000 / (this.score + 50 - 16.6) + 300;
        let slime = this.slimes.create(250, 20, 'slime');

        slime.body.gravity.y = 500;
        slime.body.velocity.x = Phaser.Math.RND.pick([slimeSpeed + 20, -(slimeSpeed) - 20]);
        slime.body.bounce.x = 1;

        this.time.addEvent({
            delay: 40000,
            callback: () => slime.destroy(),
        })
    }

    addGun() {
        let gunPos = this.player.body.position;
        // TODO: x pos +-75 je nach player fACE

        let gun = this.guns.create(gunPos.x, gunPos.y, 'gun');

        gun.body.gravity.y = 100;


        

        gun.flipX = this.player.flipX;
        if(this.player.flipX == true){
            gun.body.velocity.x = -600;
        }
        else if(this.player.flipX == false){
            gun.body.velocity.x = 600;
        }
        gun.body.bounce.x = 1;
         this.time.addEvent({
            delay: 1000,
            callback: () => gun.destroy(),
        })
    }

    updateColaPosition() {
        let xpos = Math.random();
        let positions = [
            { x: 30 + xpos * 440, y: 60 },
            { x: 30 + xpos * 440, y: 60 },
            { x: 30 + xpos * 440, y: 140 },
            { x: 30 + xpos * 440, y: 140 },
            { x: 30 + xpos * 440, y: 300 },
            { x: 30 + xpos * 440, y: 300 },
        ]

        positions = positions.filter(cola => cola.x !== this.cola.x);
        let newPosition = Phaser.Math.RND.pick(positions);
        this.cola.setPosition(newPosition.x, newPosition.y);
    }

    takeCola() {

        this.score += 5;
        this.scoreLabel.setText('score: ' + this.score);
        this.updateColaPosition();

    }


    movePlayer() {

        if (this.arrow.left.isDown) {
           
            this.player.body.velocity.x = -200;
            this.player.flipX = true;

        }
        else if (this.arrow.right.isDown) {
            
            this.player.body.velocity.x = 200;
            this.player.flipX = false;

        }
        else {
            this.player.body.velocity.x = 0;

        }
        if (this.arrow.down.isDown) {

            this.addGun();

        }


        if (this.arrow.up.isDown && this.player.body.onFloor()) {
            this.player.body.velocity.y = -320;
        }
    }


    createWorld() {
        this.walls = this.physics.add.staticGroup();
        this.walls.create(10, 170, 'wallV');
        this.walls.create(490, 170, 'wallV');


        this.walls.create(10, 50, 'wallH');
        this.walls.create(450, 10, 'wallH');
        this.walls.create(50, 330, 'wallH');
        this.walls.create(450, 330, 'wallH');

        this.walls.create(0, 170, 'wallH');
        this.walls.create(500, 170, 'wallH');
        this.walls.create(250, 90, 'wallH');
        this.walls.create(250, 250, 'wallH');

    }
    playerDie() {
        this.scene.start('menu', { score: this.score });
    }

    // let slime = ....
    // this.slimeDie(slime);

    slimeDie(gun, slime) {

        slime.destroy();
        gun.destroy();
        // ... inclrease sore

    }
}