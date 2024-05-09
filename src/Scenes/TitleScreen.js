class TitleScreen extends Phaser.Scene{
    constructor(){
        super("titleScreen");
        this.my = {sprite: {}};
        this.backgroundMusic = false;

    }

    preload(){
        this.load.setPath("./assets/");
        this.load.image("Urban_tiles", "tilemap_packed.png");    // tile sheet   
        this.load.tilemapTiledJSON("map", "HotDogMap.json");       // Load JSON of tilemap

        this.load.audio("background_song", "background_song_again.mp3");
        
    }

    create(){
        if(this.backgroundMusic == false){
            this.backgroundSound = this.sound.play("background_song", {
                volume: 0.25,
                loop: true
            });
            this.backgroundMusic = true;
        }

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


        this.startText = this.add.text(260, 300, "Press P to start!", {
            fontFamily: "'Source Code Pro'",
            color: "purple",
            strokeThickness: 10,
            stroke: "white",
            fontSize: 60,
            wordWrap: {
                width: 380
            }
        }).setOrigin(.5);

        this.rulesText = this.add.text(260, 680, "Press V for rules!", {
            fontFamily: "'Source Code Pro'",
            color: "green",
            strokeThickness: 6,
            stroke: "black",
            fontSize: 30,
            wordWrap: {
                width: 380
            }
        }).setOrigin(.5);
    


    }

    update(){
        let keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        let keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);



        if(keyP.isDown){
            this.scene.start("levelOne");

        }
        if(keyV.isDown){
            this.scene.start("rulesScreen");
        }

    }
}