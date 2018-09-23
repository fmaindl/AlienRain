var Ramp = Class.extend({


    radius: 6,
    angle: null,
    distanceX: null,
    distanceY: null,
    distanceZ: null,
    LS: null,
    DTO: null,
    x: null,
    y: null,
    orientation: {
        Positive: 1,
        Negative: -1
    },
    CC: 0,
    points: null,


    init: function(startX, startY, endX, endY) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        width = 8;
        height = 8;




    },

    generatedamage: function(startX, startY, endX, endY) {
        
    },

    update: function() {
 
        this.startX;
        this.startY;
        this.endX;
        this.endY;

       



    },

    draw: function(ctx) {

            for (var i = 0, len = this.points.length; i < len; i++) {
                x = this.points[i][0];
                y = this.points[i][1];
                ramp_sprite[0].draw(ctx, x, y, this.angle * this.orientation);
            }


    }

});