class RulesScreen extends Phaser.Scene{
    constructor(){
        super("rulesScreen");
        this.my = {sprite: {}};

    }

    preload(){
        this.load.setPath("./assets/");
        this.load.image("Urban_tiles", "tilemap_packed.png");    // tile sheet   
        this.load.tilemapTiledJSON("map", "HotDogMap.json");       // Load JSON of tilemap
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


        this.backText = this.add.text(260, 680, "B = back", {
            fontFamily: "'Source Code Pro'",
            color: "purple",
            strokeThickness: 7,
            stroke: "white",
            fontSize: 25,
            wordWrap: {
                width: 380
            }
        }).setOrigin(.5);

        this.bottlesText = this.add.text(100, 200, "1) Don't get hit by thrown bottles!", {
            fontFamily: "'Source Code Pro'",
            color: "purple",
            strokeThickness: 7,
            stroke: "white",
            fontSize: 25,
            wordWrap: {
                width: 380
            }
        });

        this.peopleText = this.add.text(100, 300, "2) Don't let people go past the truck!", {
            fontFamily: "'Source Code Pro'",
            color: "purple",
            strokeThickness: 7,
            stroke: "white",
            fontSize: 25,
            wordWrap: {
                width: 380
            }
        });
    
        this.feedText = this.add.text(100, 400, "3) Feed EVERYONE!", {
            fontFamily: "'Source Code Pro'",
            color: "purple",
            strokeThickness: 7,
            stroke: "white",
            fontSize: 25,
            wordWrap: {
                width: 380
            }
        });


    }

    update(){
        let keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);


        if(keyB.isDown){
            this.scene.start("titleScreen");
        }


    }
}