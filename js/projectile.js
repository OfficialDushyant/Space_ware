// JavaScript Document
function Projectile(x,y,dir,val,colour,owner){
	var FIRING_SPEED = 300;
	var START_LIFE=1.5;
	
	this.x=x;
	this.y=y;
	this.owner = owner;
	this.life= START_LIFE;
	this.velocity = new Vector(val.x, val.y);
	
	this.velocity.x += Math.cos(dir) * FIRING_SPEED;
	this.velocity.y += Math.sin(dir) * FIRING_SPEED;
	
	this.update = function (elapsedTime){
		this.x += this.velocity.x * elapsedTime;
		this.y += this.velocity.y * elapsedTime;
		this.life -= elapsedTime;
	}
	this.draw = function(ctx){
		ctx.save();
		ctx.fillStyle = colour;
		ctx.translate(this.x, this.y);
		ctx.beginPath();
		ctx.arc(0,0,5,0,Math.PI*2);
		ctx.fill();
		ctx.restore();
	}
	
}