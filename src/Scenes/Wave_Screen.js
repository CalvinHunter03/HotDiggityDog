class WaveScreen extends Phaser.Scene{
    constructor(){
        super("waveScreen");
        this.my = {sprite: {}};

    }

    preload(){
        this.load.setPath("./assets/");
        this.load.image("Urban_tiles", "tilemap_packed.png");    // tile sheet   
        this.load.tilemapTiledJSON("map", "HotDogMap.json");   
            // Load JSON of tilemap
    }

    create(){

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

        
        
        this.waveCompleteText = this.add.text(260, 200, "Wave 1 complete!", {
            fontFamily: "'Source Code Pro'",
            color: "green",
            strokeThickness: 10,
            stroke: "white",
            fontSize: 55,
            wordWrap: {
                width: 380
            }
        }).setOrigin(.5);


        this.continueText = this.add.text(260, 500, "Do you want to continue? \"Y\" \"N\" ", {
            fontFamily: "'Source Code Pro'",
            color: "purple",
            strokeThickness: 10,
            stroke: "white",
            fontSize: 60,
            wordWrap: {
                width: 380
            }
        }).setOrigin(.5);

        
        this.waveCompleteText.setText("Wave " + this.scene.get("levelOne").wave + " comeplete!");
    


    }

    update(){
        let keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
        let keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);


        if(keyY.isDown){
            this.scene.get("levelOne").wave += 1;
            this.scene.start("levelOne");
        }
        if(keyN.isDown){
            this.scene.start("deathScreen")
        }

    }
}