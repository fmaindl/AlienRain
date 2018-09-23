
var GameState = State.extend({



    init: function(game) {
        this._super(game);

        this.lives = 3;
        this.canvaswidth = game.canvas.ctx.width;
        this.canvasheight = game.canvas.ctx.height;



        document.querySelector('button').addEventListener('click', function() {
            background_music = new Audio("sound/music2.mp3");
            background_music.loop = true;
            background_music.play();
        });
        boing = new Audio("sound/boing.mp3");





        this.gameOver = false;
        this.win = false;
        frames = 0;

        this.score = 0;

        level = 1;
        this.level = level;

        this.ramplist = [];
        this.mouseMove();
        this.mouseDown();
        this.mouseUp();
        this.generatelevel(level);
        




        


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
        blob_amount = level + 5;
        target_amount = blob_amount;
        blob_count = 0;

        //else if (level < 30 && level_ongoing == false) {
        if (level < 30) {
            for (var i = 0, len = blob_amount; i < len; i++) {
                blob_spawn_x = Math.round(Math.random() * (this.canvaswidth - 60) + 30);
                blob_spawn_y = 24;
                target_spawn_x = Math.round(Math.random() * (this.canvaswidth - 60) + 30);
                target_spawn_y = this.canvasheight - 60;

                blob = new Blob(blob_spawn_x, blob_spawn_y, 4, 2);
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

    update: function() {
        frames++;
       
        // set up for now the spawning rate at 1 blob and 1 target every 400 frames
        if ((frames+50) % 400 === 0) {
            var b = this.blobs[blob_count % this.blobs.length];
            var t = this.targets[blob_count % this.blobs.length];
            b.spawned = true;
            b.update();
            t.spawned = true;
            blob_count++;

        }

        blob_out_test = blob_amount;
        for (var h = 0; h < this.blobs.length; h++) {
            if (this.blobs[h].OOB == true) {
                blob_out_test--;
            }
            if (this.blobs[h].hit_target == true) {
                blob_out_test--;
            }
        }
        
        if (blob_out_test == 0) {
            level++;
            this.generatelevel(level);
        }

        for (var i = 0, len = this.blobs.length; i < len; i++) {
            if (this.blobs[i]) {
                if (this.blobs[i].OOB == true) {
                    this.blobs[i].spawned = false;
                    this.targets[i].spawned = false;
                }
                if (this.blobs[i].life_lost == true) {
                        this.lives--;
                        this.blobs[i].life_lost = false;
                
                }
                else if (this.blobs[i].spawned == true) {

                    //check for collisions every 4 frames
                    if (frames % 4 === 0) {
                        
                        a = this.blobs[i];
                        for (var j = 0, len2 = this.ramplist.length; j < len2; j++) {
                            if (this.ramplist[j] != undefined | this.ramplist[j] != null) {
                                for (var k = 0, len3 = this.ramplist[j].points.length; k < len3; k++) {
                                    tempx = this.ramplist[j].points[k][0];
                                    tempy = this.ramplist[j].points[k][1];
                                    
                                    if (CollisionCheck(a.x, a.y, 14, 14, tempx, tempy, 14, 14)) {
                                        this.ramplist[j].CC++;
                                    
                                        boing.play();

                                        if (this.ramplist[j].CC < 3) { 
                                            this.blobs[i].Collisionbool = true;
                                            if (this.blobs[i].y < tempy) {   
                                                this.blobs[i].animation_vector = this.ramplist[j].orientation * ((this.ramplist[j].angle * 180 / Math.PI) + 90 - (150 / Math.log(4 * (this.ramplist[j].angle + 1))));
                                                
                                            }
                                            else if (this.blobs[i].y > tempy) { 
                                                this.blobs[i].animation_vector = this.ramplist[j].orientation * -((this.ramplist[j].angle * 180 / Math.PI) + (150 / Math.log(4 * (this.ramplist[j].angle + 1))));
                                            }
                                        }
                                        
                                        else if (this.ramplist[j].CC == 3) {
                                            this.ramplist.splice(j, 1);
                                            
                                            
                                        }
                                        break;

                                        
                                        
                                        
                                    }
                                
                                }
                                
                            }
                        }
                        for (m = 0, len5 = this.targets.length; m < len5; m++) {
                            if (CollisionCheck(a.x, a.y, 14, 14, this.targets[m].x, this.targets[m].y, 30, 30) && this.targets[m].spawned) {
                                this.score += 50; 
                                //TODO animation visual and audio
                                this.blobs[i].hit_target = true;
                                this.blobs[i].spawned = false;
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
        ctx.strokeText(level, 75, 40);
        ctx.strokeText("LIVES", 225, 20);
        
        for (l = 0, len4 = this.lives; l < len4; l++) {
            heart_sprite[0].draw(ctx, 290 + l*18, 18);
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
