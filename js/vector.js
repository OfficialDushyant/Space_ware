/**
    the Vector type
*/
function Vector(x, y) {
    this.x = x;
    this.y = y;

    /**
        Get the length of the vector
    */
    this.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
        Set the length of the vector
    */
    this.setLength = function (val) {
        //If the vector has no current direction - assume 0
        if (this.x === 0 && this.y === 0)
            this.x = val;
        
        //Get the normalized vector
        var currentLength = this.length();
        var normalX = this.x / currentLength;
        var normalY = this.y / currentLength;

        //Multiply the normal by the value provided
        this.x = normalX * val;
        this.y = normalY * val;
    }

    /**
        Add the provided 
    */
    this.add = function( val ){
        this.x += val.x;
        this.y += val.y;
    }
}