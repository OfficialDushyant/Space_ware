function GravityWell(x,y)
{
	this.strength=2000;
	this.x=x;
	this.y=y;
	
	this.update = function (elapsedTime)
	{
	}
	
	this.draw=function(ctx)
	{
		ctx.save();
	
	    ctx.fillStyle= "rgba(0,0,0,0.5)";
		ctx.translate(x,y);
		ctx.beginPath();
		ctx.arc(0,0,25,0,Math.PI*2);
		ctx.fill();
		
		ctx.restore();
	}
}
	