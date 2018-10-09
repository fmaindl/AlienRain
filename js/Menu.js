
var MenuState = State.extend({



    init: function(game) {
        this._super(game);
        frames = 0;
		this.framecount = frames;
        this.canvaswidth = game.canvas.ctx.width;
        this.canvasheight = game.canvas.ctx.height;
        this.fadein = true;
        this.frame = 0;
        background_music = new Audio("sound/music4.mp3");
        background_music.loop = true;
        this.music_playing = false;
        
    },
    
    
    handleInputs: function(input) {
        if (input.isPressed("spacebar")) {
            background_music.pause();
            this.game.nextState = States.GAME;
        }
    },
    

    update: function() {
        frames++;
 

        if (frames % 100 && this.fadein == true) {
            this.fadein = false;
        }
        else if (frames % 100 && this.fadein == false) {
            this.fadein = true;
        }
        if (frames == 200) {
            frames = 0;
        }
        if (frames > 80 && this.music_playing == false) {
            background_music.play();
            this.music_playing = true;
        }
    },

    render: function(ctx) {
        ctx.globalAlpha = 1;   
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.canvaswidth, this.canvasheight);
        

        if (frames > this.framecount + 100 | this.initialized == true) {
			ctx.globalAlpha = 0.5;
			ctx.lineWidth = 1;
			ctx.lineCap = 'square';
			ctx.font = "16px Futura, Helvetica, sans-serif";
            ctx.strokeText("press space to start a new game", 60, 280);
            this.initialized = true;

	
		} 
		
         
        

        if (this.fadein == true) {
            x = (frames - this.framecount) * 0.01;
        }
		else if (this.fadein == false) {
            x = 1 - (frames - this.framecount) * 0.01;
        }

        ctx.globalAlpha = x;
        ctx.font = "60px Futura, Helvetica, sans-serif";
		ctx.strokeStyle = 'white';
        ctx.lineCap = 'round';
        ctx.lineWidth = 3;
        ctx.strokeText("ALIEN RAIN", 10, 240);
        

 


        
		


        

        
    },
});