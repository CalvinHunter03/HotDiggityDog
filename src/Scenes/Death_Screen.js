class DeathScreen extends Phaser.Scene{
    constructor(){
        super("deathScreen");
        
    }

    preload(){
        this.load.setPath("./assets/");
        this.load.image("Urban_tiles", "tilemap_packed.png");    // tile sheet   
        this.load.tilemapTiledJSON("map", "HotDogMap.json");  
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

        this.playAgainText = this.add.text(260, 350, "Press R to play again!", {
            fontFamily: "'Source Code Pro'",
            color: "blue",
            strokeThickness: 10,
            stroke: "white",
            fontSize: 60,
            wordWrap: {
                width: 380
            }
        }).setOrigin(.5);

        this.moneyEarnedText = this.add.text(260, 150, "You earned: ", {
            fontFamily: "'Source Code Pro'",
            color: "green",
            strokeThickness: 7,
            stroke: "white",
            fontSize: 30
           
        }).setOrigin(.5);

        this.gameOverText = this.add.text(260, 50, "GAME OVER!", {
            fontFamily: "'Source Code Pro'",
            color: "red",
            strokeThickness: 8,
            stroke: "black",
            fontSize: 40
           
        }).setOrigin(.5);

        this.titleScreenText = this.add.text(230, 680, "T = Title Screen", {
            fontFamily: "'Source Code Pro'",
            color: "purple",
            strokeThickness: 7,
            stroke: "black",
            fontSize: 25,
            wordWrap: {
                width: 380
            }
        }).setOrigin(.5);

        this.moneyEarnedText.setText("You earned: $" + this.scene.get("levelOne").score);

        


    }

    update(){

        let keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        let keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

        if(keyR.isDown){

            //this.scene.restart("levelOne");
            this.scene.get("levelOne").health = 3;
            this.scene.get("levelOne").score = 0;
            this.scene.get("levelOne").wave = 1;
            this.scene.start("levelOne");
        }

        if(keyT.isDown){
            this.scene.get("levelOne").health = 3;
            this.scene.get("levelOne").score = 0;
            this.scene.get("levelOne").wave = 1;

            this.scene.start("titleScreen");
        }

    }
}