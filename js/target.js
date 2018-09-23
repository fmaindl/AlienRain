var Target = Class.extend({


    spawned: false,
    Collisionbool: false,
    



    init: function(x, y) {
        this.x = x;
        this.y = y;
        



    },

    update: function() {
        

    },

    draw: function(ctx) {

        target_sprite[0].draw(ctx, this.x, this.y);

    }

});