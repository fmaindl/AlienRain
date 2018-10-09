
var GameState = State.extend({



    init: function(game) {
        this._super(game);

        this.lives = 3;
        this.canvaswidth = game.canvas.ctx.width;
        this.canvasheight = game.canvas.ctx.height;
 


        background_music = new Audio("sound/music3.mp3");
        background_music.loop = true;
        background_music.play();
        
        boing = new Audio("sound/boing.mp3");
        ping = new Audio("sound/ping.mp3");
        new_level = new Audio("sound/new_level.mp3");
        gameover = new Audio("sound/gameover.mp3");
        breaksound = new Audio("sound/breaksound.mp3");


        this.gameOver = false;
        this.win = false;
        frames = 0;

        this.score = 0;

        this.level = 1;
        

        this.ramplist = [];
        this.mouseMove();
        this.mouseDown();
        this.mouseUp();
        this.generatelevel(this.level);

    },


    mouseMove: function() {
        this.cursorX;
        this.cursorY;
        var self = this;
        document.onmousemove = function(e) {
            self.cursorX = e.clientX - Math.round((window.innerWidth - self.canvaswidth) / 2);
            self.cursorY = e.clientY - Math.round((window.innerHeight - self.canvasheight) / 2);
    
            if (self.cursorX < 0 | self.cursorX > self.canvaswidth | self.cursorY < 0 | self.cursorY > self.canvasheight) {
                self.cursorX = null;
                self.cursorY = null;
            }
            
            
            
        }
    },
    
    
    mouseDown: function() {
        this.startX;
        this.startY;  
        this.mousedown; 
        var self = this;
        
        this.mouseDown = function() {
            //if (positionX...)
    
            this.startX = this.startX - Math.round((window.innerWidth - this.canvaswidth) / 2);
            this.startY = this.startY - Math.round((window.innerHeight - this.canvasheight) / 2);
    
            if (this.startX > 0 && this.startX < this.canvaswidth && this.startY > 0 && this.startY < this.canvasheight) {
                
            }
            else {
                this.startX = null;
                this.startY = null;
            }

        };
    
        document.addEventListener('mousedown', function(event) {
            self.startX = event.clientX;
            self.startY = event.clientY;
            self.mousedown = true;
            self.mouseDown();
    
        });
    },
    
    
    mouseUp: function() {
        this.mousedown;
        
        this.ramp;
        this.endX;
        this.endY;
        var self = this;
        this.mouseUp = function() {
            //if (positionX...)
    
            this.endX = this.endX - Math.round((window.innerWidth - this.canvaswidth) / 2);
            this.endY = this.endY - Math.round((window.innerHeight - this.canvasheight) / 2);
            
    
    
            if (this.endX > 0 && this.endX < this.canvaswidth && this.endY > 0 && this.endY < this.canvasheight) {
                this.distanceX = Math.abs(this.startX - this.endX);
                this.distanceY = Math.abs(this.startY - this.endY);
                this.distanceZ = Math.sqrt(Math.pow(this.distanceX, 2) + Math.pow(this.distanceY, 2));
    
    
    
                if (this.startX > this.endX) {
                    tempX = this.startX;
                    tempY = this.startY;
                    this.startX = this.endX;
                    this.startY = this.endY;
                    this.endX = tempX;
                    this.endY = tempY;
                    
                }
    
                
                if (this.distanceZ < 150) {
    
                    this.ramp = new Ramp(this.startX, this.startY, this.endX, this.endY);
                    this.ramp.distanceX = this.distanceX;
                    this.ramp.distanceY = this.distanceY;
                    this.ramp.distanceZ = this.distanceZ;
                    this.ramp.points = [];
                    
    
                    if (this.startY > this.endY) {
                        this.ramp.orientation = -1;
                        this.ramp.angle = Math.acos(this.ramp.distanceX / this.ramp.distanceZ);
                    }else {
                        this.ramp.orientation = 1;
                        this.ramp.angle = Math.asin(this.ramp.distanceY / this.ramp.distanceZ);
                    }
                    this.ramp.LS = (this.endY - this.startY) / (this.endX - this.startX);
                    this.ramp.DTO = this.startY - (this.ramp.LS * this.startX);
    
                    //create an array for all points where ramp tiles will be drawn
                    if (this.ramp.angle > 1.46) {
                        for (var i = 0, len = this.ramp.distanceY; i < len; i++) {
                            y = this.startY + (i * this.ramp.orientation);
                            x = Math.round((y - this.ramp.DTO) / this.ramp.LS);
                            templist = [];
                            templist.push(x);
                            templist.push(y);
                            this.ramp.points.push(templist);
                            templist.splice[0, 2];
                        }
                    }
                    else {
                        for (var j = 0, len2 = this.ramp.distanceX; j < len2; j++) {
                            x = this.startX + j;
                            y = Math.round(x * this.ramp.LS + this.ramp.DTO);
                            templist = [];
                            templist.push(x);
                            templist.push(y);
                            this.ramp.points.push(templist);
                            templist.splice[0, 2];
                        }
                    }
  
                    if (this.ramplist.length == 3) {
                        this.ramplist[0] = this.ramplist[1];
                        this.ramplist[1] = this.ramplist[2];
                        this.ramplist.splice(2, 1);
                    }
    
                    this.ramplist.push(this.ramp);
                }
            }
    
        };
    
        document.addEventListener('mouseup', function(event) {
            self.endX = event.clientX;
            self.endY = event.clientY;
            self.mousedown = false;
            self.mouseUp();
    
        });
    },
    
        
    
    
    
    
    
    

    generatelevel: function(level) {
        this.blobs = [];
        this.targets = [];
        blob_amount = this.level + 5;
        target_amount = blob_amount;
        blob_count = 0;
        this.levelinit = true;
        this.levelframecount = frames;
        
        

        //else if (level < 30 && level_ongoing == false) {
        if (this.level < 30) {
            for (var i = 0, len = blob_amount; i < len; i++) {
                blob_spawn_x = Math.round(Math.random() * (this.canvaswidth - 60) + 30);
                blob_spawn_y = 24;
                target_spawn_x = Math.round(Math.random() * (this.canvaswidth - 60) + 30);
                target_spawn_y = this.canvasheight - 60;

                speedrandom = Math.round(Math.random());
                if (speedrandom < 0.4) {
                    speed = 2;
                }
                else if (speedrandom >= 0.4 && speedrandom < 0.8) {
                    speed = 3;
                }
                else {
                    speed = 1;
                }
                blob = new Blob(blob_spawn_x, blob_spawn_y, 4, speed);
                this.blobs.push(blob);
                target = new Target(target_spawn_x, target_spawn_y);
                this.targets.push(target);
            }
            //when level over
            level_ongoing = false;
        }
        else {
            this.win = true;
        }


    },

    handleInputs: function(input) {
        if (this.gameOver) {
            background_music.pause();
            this.game.nextState = States.END;
            
            //this.game.stateVars.score = this.score;
            return;
        }
    },


    update: function() {
        frames++;
        
        if (this.lives == 0) {
            this.gameOver = true;
            gameover.play();
        }
        if (frames > this.levelframecount + 120) {
            this.levelinit = false;
        }

        if (frames == this.levelframecount + 40) {
            new_level.play();
            
        }
        
        // set up for now the spawning rate at 1 blob and 1 target every 400 frames
        if ((frames+50) % 400 === 0) {
            var b = this.blobs[blob_count % this.blobs.length];
            var t = this.targets[blob_count % this.blobs.length];
            if (b.OOB == false) {
                b.spawned = true;
                b.update();
                blob_count++;
            }
       
            t.spawned = true;
            

        }

        blob_out_test = blob_amount;
        for (var h = 0; h < this.blobs.length; h++) {
            if (this.blobs[h].OOB == true) {
                blob_out_test--;
            }
          
        }
        
        if (blob_out_test == 0) {
            this.level++;
            for (var i = 0, len = this.targets.length; i < len; i++) {
                this.targets[i].spawned = false;
            }
            this.generatelevel(this.level);
        }

        for (var i = 0, len = this.blobs.length; i < len; i++) {
            if (this.blobs[i]) {
                if (this.blobs[i].OOB == true) {
                    this.blobs[i].spawned = false;
                
                }
                if (this.blobs[i].life_lost == true) {
                        this.lives--;
                        this.blobs[i].life_lost = false;
                
                }
                else if (this.blobs[i].spawned == true) {

                    //check for collisions every 2 frames
                    if (frames > 0) {
                        
                        a = this.blobs[i];
                        for (var j = 0, len2 = this.ramplist.length; j < len2; j++) {
                            if (this.ramplist[j] != undefined | this.ramplist[j] != null) {
                                for (var k = 0, len3 = this.ramplist[j].points.length; k < len3; k++) {
                                    tempx = this.ramplist[j].points[k][0];
                                    tempy = this.ramplist[j].points[k][1];
                                    
                                    if (CollisionCheck(a.x, a.y, 14, 14, tempx, tempy, 14, 14)) {
                                        this.ramplist[j].CC++;
                                    
                                        

                                        if (this.ramplist[j].CC < 3) { 
                                            this.blobs[i].Collisionbool = true;
                                            if (this.blobs[i].y < tempy) {   
                                                boing.play();
                                                this.blobs[i].animation_vector = this.ramplist[j].orientation * ((this.ramplist[j].angle * 180 / Math.PI) + 90 - (150 / Math.log(4 * (this.ramplist[j].angle + 1))));
                                                this.blobs[i].y -= 1;
                                                
                                            }
                                            else if (this.blobs[i].y > tempy) {
                                                boing.play();
                                                this.blobs[i].animation_vector = this.ramplist[j].orientation * -((this.ramplist[j].angle * 180 / Math.PI) + (150 / Math.log(4 * (this.ramplist[j].angle + 1))));
                                                this.blobs[i].y +=1; 
                                            }
                                        }
                                        
                                        else if (this.ramplist[j].CC == 3) {
                                            breaksound.play();
                                            this.ramplist.splice(j, 1);
                                            
                                            
                                        }
                                        break;

                                        
                                        
                                        
                                    }
                                
                                }
                                
                            }
                        }
                        for (m = 0, len5 = this.targets.length; m < len5; m++) {
                            if (CollisionCheck(a.x, a.y, 24, 24, this.targets[m].x, this.targets[m].y, 56, 56) && this.targets[m].spawned && this.blobs[i].spawned) {
                                this.score += 50; 
                                ping.play();
                                //TODO animation visual and audio
                                this.blobs[i].spawned = false;
                                this.blobs[i].OOB = true;
                                this.targets[m].spawned = false;

                                break;

                            }
                        }

                    }
                    this.blobs[i].update();
                }
            }
        }
        for (var l = 0, len4 = this.ramplist.length; l < len4; l++) {
            this.ramplist[l].update();
        }



    },

    render: function(ctx) {
        
        ctx.drawImage(game.background, 0, 0, game.background.width, game.background.height, 0, 0, this.canvaswidth, this.canvasheight);


        for (var i = 0, len = this.blobs.length; i < len; i++) {
            if (this.blobs[i].spawned == true) {
                this.blobs[i].draw(ctx);
            }
        }
        

        for (var j = 0, len2 = this.ramplist.length; j < len2; j++) {
            this.ramplist[j].draw(ctx);

        }
        for (var k = 0, len3 = this.targets.length; k < len3; k++) {
            if (this.targets[k].spawned == true) {
                this.targets[k].draw(ctx);
            }
        }
       
        ctx.strokeText("SCORE", 5, 20);
        ctx.strokeText(this.score, 75, 20);
        ctx.strokeText("LEVEL", 5, 40);
        ctx.strokeText(this.level, 75, 40);
        ctx.strokeText("LIVES", 225, 20);
        
        for (l = 0, len4 = this.lives; l < len4; l++) {
            heart_sprite[0].draw(ctx, 290 + l*18, 18);
        }

        if (this.levelinit == true) {
            
            
            ctx.globalAlpha = 1 - (frames - this.levelframecount) * 0.008;
            
            ctx.font = "40px Futura, Helvetica, sans-serif";
            ctx.shadowColor = "rgba(0,0,0,1)";
            ctx.lineCap = 'round';
            ctx.shadowOffsetX = 3.5;
            ctx.shadowOffsetY = 2;
            ctx.lineWidth = 3;
            ctx.strokeText("LEVEL", 100, 240);
            ctx.strokeText(this.level, 220, 240);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'red';
            ctx.lineCap = 'square';
            ctx.globalAlpha = 1;
            ctx.font = "16px Futura, Helvetica, sans-serif"; 
            ctx.shadowOffsetX = 0; 
            ctx.shadowOffsetY = 0;
            
        }

        if (this.mousedown == true) {
            distanceX = this.startX - this.cursorX;
            distanceY = this.startY - this.cursorY;
            distanceZ = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
                
            if (distanceZ < 150) {
                ctx.globalAlpha = 0.3;
                ctx.lineWidth = 8;
                ctx.lineCap = 'round';
                ctx.strokeStyle = 'green';
            }
            else if (distanceZ > 150) {
                ctx.globalAlpha = 0.3;
                ctx.lineWidth = 8;
                ctx.lineCap = 'round';
                ctx.strokeStyle = 'red';
            }

            ctx.beginPath();
            ctx.moveTo(this.startX, this.startY);
            ctx.lineTo(this.cursorX, this.cursorY);
            ctx.stroke();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'red';
            ctx.lineCap = 'square';
            ctx.globalAlpha = 1;
        }
    
    }
        
});

        
        