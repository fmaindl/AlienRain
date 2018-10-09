 var Canvas = Class.extend({

    init: function(width, height) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;




        this.ctx = (function(ctx) {
            ctx.width = ctx.canvas.width;
            ctx.height = ctx.canvas.height;

            ctx.font = "16px Futura, Helvetica, sans-serif";

            ctx.lineWidth = 1;


            ctx.strokeStyle = "red";

            ctx.clearAll = function() {
				this.clearRect(0, 0, this.width, this.height);
			};
            
        
            





            return ctx;
        })(this.canvas.getContext("2d"));

        document.body.appendChild(this.canvas);
        
    },


    animate: function(loop) {
        var render_function = (function() {
                return window.requestAnimationFrame    ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame    ||
                    window.oRequestAnimationFrame      ||
                    window.msRequestAnimationFrame     ||
                    function(callback, element) {
                        window.setTimeout(callback, 1000/60);
                    }

        })();

        var self = this;
        var loopy_loop = function() {
            loop();
            render_function(loopy_loop, self.canvas);
        }
        render_function(loopy_loop, this.canvas);
    }
});