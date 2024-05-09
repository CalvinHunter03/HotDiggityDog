class LevelOne extends Phaser.Scene {
    constructor() {
        super("levelOne");
        this.my = {sprite: {}};

        this.startX = 240;
        this.startY = 635;
        this.truck_direction = true;

        this.my.sprite.bullet = [];
        this.maxBullets = 5;
        this.bulletCooldown = 5;
        this.bulletCooldownCounter = 0;

        this.my.sprite.enemyType1 = [];
        this.maxEnemy1 = 10;
        this.enemy1Cooldown = 30;
        this.enemy1CooldownInitial = 30;
        this.enemy1Startx = 100;

        this.my.sprite.enemyType2 = [];
        this.maxEnemy2 = 10;
        this.enemy2Cooldown = 30;
        this.enemy2CooldownInitial = 30;
        this.enemy2Startx = 445;

        this.my.sprite.bottleBullet = [];
        this.bottleBulletCooldown = 40;
        this.bottleMax = 2;

        this.health = 3;
        this.gameBool = false;
        this.gameStarted = false;

        this.score = 0;
        this.wave = 1;
        this.waveQuestion = 25;
        
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.image("Urban_tiles", "tilemap_packed.png");    // tile sheet   
        this.load.tilemapTiledJSON("map", "HotDogMap.json");       // Load JSON of tilemap
        
        this.load.image("hotdog_truck", "hotdog_truck.png"); //hot dog truck
        this.load.image("hotdog", "hotdog.png"); // hot dog itself
        this.load.image("soda_bottle" ,"sodaBottle.png"); //soda bottle (projectile thrown at player)
        this.load.image("construction_worker", "construction_worker.png");
        this.load.image("tourist", "tourist.png");

        this.load.audio("chomp_noise", "chomp_noise(hotdog hitting person).mp3");
        this.load.audio("cling_noise", "cling_noise(bottle hitting truck).mp3");
        this.load.audio("game_over", "Game_Over.mp3");
    }

    create() {


        console.log(this.game.config.score + "goodbye");

        this.map = this.add.tilemap("map", 16, 16, 20, 30);

        this.tileset = this.map.addTilesetImage("RPG_Urban_City(1)", "Urban_tiles");

        this.sidewalk_road = this.map.createLayer("Sidewalk_road", this.tileset, 0, 0);
        this.grass_water = this.map.createLayer("Grass_water", this.tileset, 0, 0);
        this.grass_water_details = this.map.createLayer("Grass_water_details", this.tileset, 0,0);
        this.left_building = this.map.createLayer("Left_building", this.tileset, 0,0);
        this.detailing = this.map.createLayer("Detailing", this.tileset, 0,0);

        this.sidewalk_road.setScale(1.5);
        this.grass_water.setScale(1.5);
        this.grass_water_details.setScale(1.5);
        this.left_building.setScale(1.5);
        this.detailing.setScale(1.5);

        document.getElementById('description').innerHTML = '<h2>Controls</h2>'
        document.getElementById('description').innerHTML += '<p>A = left, D = right, Space = hotdog</p>'

        //Above is TILED stuff

        let my = this.my;

        my.sprite.hotdog_truck = this.add.sprite(this.startX, this.startY, "hotdog_truck");
        my.sprite.hotdog_truck.setScale(2);
        
        for(let i = 0; i< this.maxBullets; i++){
            my.sprite.bullet.push(this.add.sprite(-100,-100, "hotdog"));
            my.sprite.bullet[i].visible = false;
            my.sprite.bullet[i].setScale(.8)
        }
    

        this.bulletSpeed = 5;
        this.playerSpeed = 5;

        this.touristSpeed = 3;
        this.constructSpeed = 3.69;
        this.bottleSpeed = 2;

        this.healthText = this.add.text(220, 0, "Health: 3", { //health points
            fontFamily: "'Source Code Pro'",
            color: "red",
            strokeThickness: 5,
            stroke: "white",
            fontSize: 20
        });

        this.scoreText = this.add.text(220, 20, "Money: 0", { //money
            fontFamily: "'Source Code Pro'",
            color: "black",
            strokeThickness: 5,
            stroke: "white",
            fontSize: 20
        });

        this.waveText = this.add.text(220, 40, "Wave: 1", {
            fontFamily: "'Source Code Pro'",
            color: "yellow",
            strokeThickness: 5,
            stroke: "black",
            fontSize: 20
        });

        this.chompSound = this.sound.add("chomp_noise", {
            volume: .25
        });

        this.clingSound = this.sound.add("cling_noise", {
            volume: 0.25
        });

        this.gameOverSound = this.sound.add("game_over", {
            volume: .25
        });
        
    }


    update() {
        let my = this.my;


        this.scoreText.setText("Money: " + this.score);
        this.healthText.setText("Health: " + this.health);
        this.waveText.setText("Wave: " + this.wave);

        if(this.health <= 0){
            my.sprite.bullet = [];
            this.gameOverSound.play();
            this.scene.start("deathScreen");
            
            
        }

        if(this.score >= this.waveQuestion){
            my.sprite.bullet = [];
            this.waveQuestion *= 2.2;
            this.scene.start("waveScreen");
        }

        
        

            let keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
            let keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
            let space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
            this.bulletCooldownCounter--;

            this.enemy1Cooldown--;
            this.enemy2Cooldown--;

            this.bottleBulletCooldown--;

           

            if(keyA.isDown){ //left
                if(this.truck_direction == true){
                    my.sprite.hotdog_truck.flipX = true;
                    this.truck_direction = false;

                }
                if(my.sprite.hotdog_truck.x + 50 > (my.sprite.hotdog_truck.displayWidth/2)){
                    my.sprite.hotdog_truck.x -= this.playerSpeed;
                }

                if(my.sprite.enemyType1.length < this.maxEnemy1){
                    if(this.enemy1Cooldown < 0){
                        my.sprite.enemyType1.push(this.add.sprite(this.enemy1Startx, 0, "tourist"));
                        this.enemy1Cooldown = this.enemy1CooldownInitial;
                    }
                }
            }

            

            for(let enemy1 of my.sprite.enemyType1){
                enemy1.setScale(1.5);



                if(enemy1.visible){
                    if(enemy1.y < 75){
                        enemy1.y += this.touristSpeed;
                    }
                    else if(enemy1.y == 75 && enemy1.x < 206){
                        enemy1.x += this.touristSpeed;
                    }
                    else if(enemy1.y >= 75 && enemy1.x >= 206 && enemy1.y < 200){
                        enemy1.y += this.touristSpeed;
                    }
                    else if(enemy1.y >= 190 && enemy1.x <= 210 && enemy1.x >100 && enemy1.y < 300){
                        enemy1.x -= this.touristSpeed;
                    }
                    else if(enemy1.y >= 190 && enemy1.x <= 100 && enemy1.y < 320){
                        enemy1.y += this.touristSpeed;
                    }
                    else if(enemy1.y >= 318 && enemy1.x <= 206 && enemy1.y < 400){
                        enemy1.x += this.touristSpeed;
                    }
                    else if(enemy1.y < 440 && enemy1.x >= 206){
                        enemy1.y += this.touristSpeed;
                    }
                    else if(enemy1.y >= 430 && enemy1.x >100 && enemy1.y < 500){
                        enemy1.x -= this.touristSpeed;
                    }
                    else if(enemy1.y > 430 && enemy1.x <= 100 && enemy1.y < 600){
                        enemy1.y += this.touristSpeed;
                    }
                    else if(enemy1.y >= 590 && enemy1.x <= 206){
                        enemy1.x += this.touristSpeed;
                    }
                    else if(enemy1.y < 700 && enemy1.y >= 600 && enemy1.x <= 345){
                        enemy1.y += this.touristSpeed;
                    }
                    else{
                        enemy1.x = -100;
                        enemy1.visible = false;
                        this.health--;
                    }
                }
                
            }

            if(keyD.isDown){ //right
                if(this.truck_direction != true){
                    my.sprite.hotdog_truck.flipX = false;
                    this.truck_direction = true;
                }
                if(my.sprite.hotdog_truck.x -50 < (game.config.width - (my.sprite.hotdog_truck.displayWidth/2))){
                    my.sprite.hotdog_truck.x += this.playerSpeed;
                }

                if(my.sprite.enemyType2.length < this.maxEnemy2){
                    if(this.enemy2Cooldown < 0){
                        my.sprite.enemyType2.push(this.add.sprite(this.enemy2Startx, 0, "construction_worker"));
                        this.enemy2Cooldown = this.enemy2CooldownInitial;
                    }
                }
            }

            for(let enemy2 of my.sprite.enemyType2){
                enemy2.setScale(1.5);

                if(enemy2.visible){

                    if(my.sprite.bottleBullet.length < this.bottleMax && this.bottleBulletCooldown < 0){
                        my.sprite.bottleBullet.push(this.add.sprite(enemy2.x, enemy2.y, "soda_bottle"));
                        this.bottleBulletCooldown = 100;
                    }


                    if(enemy2.y < 55){
                        enemy2.y += this.constructSpeed;
                    }
                    else if(enemy2.y >= 55 && enemy2.x > 345 && enemy2.y < 70){
                        enemy2.x -= this.constructSpeed;
                    }
                    else if(enemy2.y < 200 && enemy2.y > 50 && enemy2.x <360){
                        enemy2.y += this.constructSpeed;
                    }
                    else if(enemy2.y >= 200 && enemy2.x < 445 && enemy2.y < 210){
                        enemy2.x += this.constructSpeed;
                    }
                    else if(enemy2.y < 370 && enemy2.x >= 445){
                        enemy2.y += this.constructSpeed;
                    }
                    else if(enemy2.y >= 370 && enemy2.x > 345 && enemy2.y < 400){
                        enemy2.x -= this.constructSpeed;
                    }
                    else if(enemy2.y < 510 && enemy2.x <= 345){
                        enemy2.y += this.constructSpeed;
                    }
                    else if(enemy2.y >= 510 && enemy2.x < 445 && enemy2.y < 560){
                        enemy2.x += this.constructSpeed;
                    }
                    else if(enemy2.y < 601 && enemy2.x >= 445){
                        enemy2.y+= this.constructSpeed;
                    }
                    else if(enemy2.y >= 600 && enemy2.x > 345){
                        enemy2.x -= this.constructSpeed;
                    }
                    else if(enemy2.y < 700 && enemy2.y >= 600 && enemy2.x <= 345){
                        enemy2.y += this.constructSpeed
                    }
                    else{
                        enemy2.x = -100;
                        enemy2.visible = false;
                        this.health--;
                    }
                }

            }

            for(let bottleBullet of my.sprite.bottleBullet){
                bottleBullet.setScale(1.2);
                bottleBullet.y += this.bottleSpeed;
                if(bottleBullet.y > 720){
                    bottleBullet.visible = false;
                }
            }
            
            if(space.isDown){ //bullets
                if(this.bulletCooldownCounter < 0){

                    for (let bullet of my.sprite.bullet){
                        if(!bullet.visible){
                            bullet.x = my.sprite.hotdog_truck.x;
                            bullet.y = my.sprite.hotdog_truck.y - (bullet.displayHeight / 2);
                            bullet.visible = true;
                            this.bulletCooldownCounter = this.bulletCooldown;
                            //console.log("Balls");
                            break;
                        }
                    }
                }
            }

            for(let bullet of my.sprite.bullet){
                if(bullet.visible){
                    bullet.y -= this.bulletSpeed;
                }

                if(bullet.y < -25){
                    bullet.visible = false;
                }

                for(let enemy1 of my.sprite.enemyType1){
                    if(this.collides(bullet, enemy1)){
                        bullet.x = -100;
                        bullet.visible = false;
                        enemy1.x = -100;
                        enemy1.visible = false;
                        this.score++;
                        this.chompSound.play();
                        
                    }
                }

                for(let enemy2 of my.sprite.enemyType2){
                    if(this.collides(bullet, enemy2)){
                        bullet.x = -100;
                        bullet.visible = false;
                        enemy2.x = -100;
                        enemy2.visible = false;
                        this.score++;
                        this.chompSound.play();
                        

                    }
                }
            }

            
            

            for(let bottleBullet of my.sprite.bottleBullet){ // if bottle hits truck
                if(this.collides(my.sprite.hotdog_truck, bottleBullet)){
                    bottleBullet.x = -100;
                    bottleBullet.visible = false;
                    my.sprite.hotdog_truck.visible = false;
                    my.sprite.hotdog_truck.visible = true;
                    this.health--;
                    this.clingSound.play();
                }
            }
            
            if(my.sprite.enemyType1.length == 0){
                my.sprite.enemyType1.push(this.add.sprite(this.enemy1Startx, 0, "tourist"));
                this.enemy1Cooldown = this.enemy1CooldownInitial - 10;
            }

            if(my.sprite.enemyType2.length == 0){
                my.sprite.enemyType2.push(this.add.sprite(this.enemy2Startx, 0, "construction_worker"));
                this.enemy2Cooldown = this.enemy2CooldownInitial - 10;
            }

            

            
            
            my.sprite.enemyType1 = my.sprite.enemyType1.filter((enemy1) => enemy1.visible);
            my.sprite.enemyType2 = my.sprite.enemyType2.filter((enemy2) => enemy2.visible);
            my.sprite.bottleBullet = my.sprite.bottleBullet.filter((bottleBullet) => bottleBullet.visible);
            
        
       
    }   
    

    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }



    
}