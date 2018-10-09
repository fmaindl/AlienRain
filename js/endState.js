var EndState = State.extend({


	init: function(game) {
		this._super(game); 

		
		
		//this.score = game.stateVars.score;
		frames = 0;
		this.outrocount = frames;
		this.canvaswidth = game.canvas.ctx.width;
		this.canvasheight = game.canvas.ctx.height;
		
		background_music = new Audio("sound/music3.mp3");
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
		if (frames > this.outrocount + 200 && this.music_playing == false) {
			background_music.play();
			this.music_playing = true;
		}
	},


	render: function(ctx) {


		if (frames > this.outrocount + 100) {
			ctx.clearAll();
			ctx.globalAlpha = 1;          
            ctx.font = "40px Futura, Helvetica, sans-serif";
			ctx.strokeStyle = 'white';
            ctx.lineCap = 'round';
            ctx.lineWidth = 3;
			ctx.strokeText("Game Over", 70, 240);
			ctx.globalAlpha = 0.5;
			ctx.lineWidth = 1;
			ctx.lineCap = 'square';
			ctx.font = "16px Futura, Helvetica, sans-serif";
			ctx.strokeText("press space to start a new game", 60, 280);




			
		} 
		else {
			ctx.save();
			x = (frames - this.outrocount) * 0.01;
			ctx.globalAlpha = x;
			ctx.drawImage(game.background, 0, 0, game.background.width, game.background.height, 0, 0, this.canvaswidth, this.canvasheight);
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, this.canvaswidth, this.canvasheight);
			ctx.restore();
			
	
			
			
			

			

			
		}
	}
});