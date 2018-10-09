function Sprite(img, x, y, w, h) {
        this.img = img;
	this.x = x;
	this.y = y;
	this.w = w;
        this.h = h;

};

Sprite.prototype.draw = function(ctx, x, y, angle) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        //ctx.drawImage(this.img, this.x, this.y, this.w, this.h, x, y, this.w, this.h);
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h, this.w / -2, this.h / -2, this.w, this.h);
        ctx.restore();
        
};





function InitBlob(img) {

        blob_animation = [
            new Sprite(img, 20, 42, 24, 24),
            new Sprite(img, 84, 42, 24, 24),
            new Sprite(img, 148, 42, 24, 24),
            new Sprite(img, 212, 42, 24, 24)
        ]
        

};


function InitRamp(img) {

        ramp_sprite = [
            new Sprite(img, 0, 0, 8, 8)
        ]
};

function InitTarget(img) {

        target_sprite = [
            new Sprite(img, 0, 0, 68, 68)
        ]
};

function InitHeart (img) {
        heart_sprite = [
                new Sprite(img, 0, 0, 24, 24)
        ]
};