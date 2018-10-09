

var States = {
    NO_CHANGE:0,
    MENU: 1,
    GAME: 2,
    SHOP: 3,
    END: 4
}



var Game = Class.extend({

    init: function() {
        //create our game canvas
        width = window.innerWidth;
        height = window.innerHeight;
        if (width > height) {
            width = 350;
            height = 512;
        }
        //this.sizeratio = height / width;


        this.background = new Image();
        this.background.src = "asset/background.jpg";


        this.canvas = new Canvas(width, height);

    

        this.input = new InputHandeler({
			left:     37,
			up:       38,
			right:    39,
			down:     40,
			spacebar: 32,
			enter:    13
		});


        this.currentState = null;
        this.nextState = States.MENU;

        //load images/sprites
        var blob_image = new Image();
        blob_image.src = "asset/blob.png";
        blob_image.onload = InitBlob(blob_image);

        this.ramp_image = new Image();
        this.ramp_image.src = "asset/rampedited.png";
        this.ramp_image.onload = InitRamp(this.ramp_image);

        this.target_image = new Image();
        this.target_image.src = "asset/target.png";
        this.target_image.onload = InitTarget(this.target_image);

        this.heart_image = new Image();
        this.heart_image.src = "asset/heart.png";
        this.heart_image.onload = InitHeart(this.heart_image);






    },

    run: function(){
        var self = this;
        this.canvas.animate(function() {
            if (self.nextState !== States.NO_CHANGE){
                switch(self.nextState){
                    case States.GAME:
                    self.currentState = new GameState(self);
                    break;
                    case States.MENU:
                    self.currentState = new MenuState(self);
                    break;
                    case States.SHOP:
                    self.currentState = new State(self);
                    break;
                    case States.END:
                    self.currentState = new EndState(self);
                    break;
                }
                self.nextState = States.NO_CHANGE
            }

            self.currentState.handleInputs(self.input);
            self.currentState.update();
            self.currentState.render(self.canvas.ctx);

        });
    }
});