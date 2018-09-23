var Blob = Class.extend({


    animation: [0, 1, 2, 3],
    collision_animation: [4, 5, 6, 7],
    frame: 0,
    spawned: false,
    angle: 0,
    Collisionbool: false,
    OOB: false,
    collision_animation_frame: 0,
    animation_vector: 180,
    radian: null,
    hit_target: false,
    life_lost: false,



    init: function(x, y, size, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        width = Math.round(24*size);
        height = Math.round(24*size);
        this.speed = speed;



    },

    update: function() {
        //animation of the blob
        this.frame %= this.animation.length;

        if (this.Collisionbool == true) {
            
            radian = this.animation_vector * Math.PI / 180;

            
            if (this.collision_animation_frame == 25) {
                this.Collisionbool = false;
                this.collision_animation_frame = 0;
            }
            else if (this.animation_vector > 170 | this.animation_vector < -170) {
                this.y += 0.5;
                this.collision_animation_frame++;
            }
            else if (this.animation_vector > -5 && this.animation_vector < 5) {
                if (frames % this.speed === 0) {
                    this.y -= 0.5;
                    this.collision_animation_frame++;
                }
            }
            else {
                if (frames % this.speed === 0 && this.animation_vector > 0 && this.animation_vector < 90) {
                    this.x += 0.70;
                    this.y -= (0.70 / Math.tan(radian));
                    if (0.70 / Math.tan(radian) < 0.20) {
                        this.y -= 0.2;
                    }
                    this.animation_vector *= 1.03;
                    this.collision_animation_frame++;  

                }
                else if (frames % this.speed === 0 && this.animation_vector < 0 && this.animation_vector > -90) {
                    this.x -= 0.70;
                    this.y += (0.70 / Math.tan(radian));
                    if (0.70 / Math.tan(radian) < 0.20) {
                        this.y -= 0.2;
                    }
                    this.animation_vector *= 1.03;
                    this.collision_animation_frame++;
                }
                else if (frames % this.speed === 0 && this.animation_vector > 0 && this.animation_vector > 90) {
                    this.x += 0.7;
                    this.y += (0.7 / Math.tan(radian - Math.PI / 4));
                    if (0.70 / Math.tan(radian - Math.PI / 4) < 0.20) {
                        this.y -= 0.2;
                    }
                    this.animation_vector *= 1.03;
                    this.collision_animation_frame++;
                    
                }
                else if (frames % this.speed === 0 && this.animation_vector < 0 && this.animation_vector < -90) {
                    this.x -= 0.7;
                    this.y -= (0.7 * Math.tan(radian - Math.PI / 4));
                    if (0.70 / Math.tan(radian - Math.PI / 4) < 0.20) {
                        this.y -= 0.2;
                    }
                    this.animation_vector *= 1.03;
                    this.collision_animation_frame++;
                }
            }
        }


        // if the blob collides with something, have a specific function updating the
        //if (Collision) {

        //}
         //If not collision, updates the position of the blob (goes down 1 pixel)
        //if (frames % this.speed === 0 & !Collision) {
        else if (frames % this.speed === 0 && this.spawned === true) {
            this.y += 1;
        }

        // keep within bounds
		if (this.x > game.canvas.ctx.width) {
			this.OOB = true;
		} else if (this.x < 0) {
			this.OOB = true;
		}
		if (this.y > game.canvas.ctx.height) {
            this.OOB = true;
            this.life_lost = true;
		}else if (this.y < 0) {
			this.OOB = true;
        }


    },

    draw: function(ctx) {

        blob_animation[this.frame].draw(ctx, this.x, this.y, this.angle);

        if (frames % 4 === 0) {
            this.frame++;


        }

    }

});