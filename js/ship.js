// JavaScript Document
function Ship(x,y,orientation, colour){
	var WIDTH =15; var HEIGHT=10;
	var TURN_SPEED = Math.PI*2;
	var ACCELERATION= 240;
	var REFIRE_DELAY = 0.5;
this.x=x;
this.y=y;
this.orientation = orientation;
this.velocity = new Vector(0,0);
_refireDelay =0;
this.colour = colour;
this.turnLeft= function (elepsedTime){
	this.orientation -= TURN_SPEED * elepsedTime;
}
this.turnRight = function (elepsedTime){
	this.orientation += TURN_SPEED * elepsedTime;
}
this.thrust = function ( elapsedTime ) { 
	var xVel = Math.cos(this.orientation) * ACCELERATION; 
	var yVel = Math.sin(this.orientation) * ACCELERATION;
	this.velocity.x += xVel * elapsedTime;
	this.velocity.y += yVel * elapsedTime; 
	}
this.draw = function (ctx){
	ctx.save();
	ctx.fillStyle=colour;
	ctx.translate(this.x, this.y);
	ctx.rotate(this.orientation);
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(-WIDTH,-HEIGHT);
	ctx.lineTo(WIDTH,0);
	ctx.lineTo(-WIDTH,HEIGHT);
	ctx.lineTo(0,0);
	ctx.fill();
	ctx.restore();
}
this.respawn= function()
	{
		this.x=x;
		this.y=y;
		this.orientation=orientation;
		
		this.velocity.x=0;
		this.velocity.y=0;
	}
this.fire = function(){
	//
	if(_refireDelay <= 0){
		_refireDelay = REFIRE_DELAY;
	var projectile = new Projectile(
						this.x,this.y,
						this.orientation,
						this.velocity,
						colour,this);
	return projectile;
	}
	return null;
}
this.update = function(elapsedTime){
	this.x += this.velocity.x * elapsedTime;
	this.y += this.velocity.y * elapsedTime;
	
	_refireDelay -= elapsedTime;
}
}