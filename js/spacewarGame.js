// JavaScript Document
function SpacewarGame(canvas){
	var _ctx = canvas.getContext('2d');
	var _ships = [ new Ship(50,50,Math.PI/2,'rgb(150,150,0)'),
		new Ship(canvas.width-50,canvas.height-50,-Math.PI/2,'rgb(0,150,150)')
	];
	var _projectiles = [];
	var _gravityWell=new GravityWell(canvas.width / 2, canvas.height / 2);
	var _keys = new Array(256);
	var _this = this;
	
	
	this.handelKeyDown = function (e) {
	    console.log(e.keyCode);
	    _keys[e.keyCode] = true;
	}

	this.handelKeyUp = function (e) {
	    console.log(e.keyCode);
	    _keys[e.keyCode] = false;
	}

	this.processInput = function(elapsedTime)
	{
		if (_keys['A'.charCodeAt(0)])
			_ships[0].turnLeft(elapsedTime);
		if (_keys['D'.charCodeAt(0)])
			_ships[0].turnRight(elapsedTime);
		if (_keys['W'.charCodeAt(0)])
			_ships[0].thrust(elapsedTime);
			
		if(_keys[13])
			var proj = _ships[1].fire();
			
			
		if(_keys[37])
			_ships[1].turnLeft(elapsedTime);
		if(_keys[39])
			_ships[1].turnRight(elapsedTime);
		if(_keys[38])
			_ships[1].thrust(elapsedTime);
			
		if(_keys[32])
			var proj = _ships[0].fire();
			
			if(proj != null)
			_projectiles.push(proj);
	}
	
	this.update = function(){
		var elapsedTime  = 1/60;
		
		_this.processInput(elapsedTime);
		_this.updateGameObjects(elapsedTime);
		_this.applyGravity(elapsedTime);
		_this.checkCollisions();
		_this.draw();
	}
	this.applyGravity = function(elapsedTime){
	   var gravityObjects = _ships.concat(_projectiles);
		
		for(var i in gravityObjects)
		{
			var obj=gravityObjects[i];
			
			var distX=_gravityWell.x-obj.x;
			var distY=_gravityWell.y-obj.y;
			
			var distance=Math.sqrt(distX*distX + distY*distY);
			
			if(distance > 0)
			{
			var gravityForce=_gravityWell.strength / (distance*distance * 1/8);
			
			gravityForce = Math.min(gravityForce,100);
			
			var normalX=distX / distance;
			var normalY=distY / distance;
			
			var force = new Vector( 
			normalX * gravityForce, normalY * gravityForce);
			
			obj.velocity.add(force);
	        }
	    }
	}
	this.updateGameObjects = function (elapsedTime){
		for (var i in _ships){
			_ships[i].update(elapsedTime);
			//Keep sheep on screen
		if(_ships[i].x>canvas.width)
			_ships[i].x = 0;
		if(_ships[i].x<0)
			_ships[i].x = canvas.width;
		if(_ships[i].y > canvas.height)
			_ships[i].y=0;
		if(_ships[i].y<0)
			_ships[i].y=canvas.height;
		}
		for(var i in _projectiles){
			_projectiles[i].update(elapsedTime);
		}
		
		_gravityWell.update(elapsedTime);
	}
	
	this.checkCollisions=function()
	{
	var HIT_DISTANCE=10;
	for(var shipIndex in _ships)
	{
		var ship=_ships[shipIndex];
		
		for (var i in _projectiles)
		{
			var proj=_projectiles[i];
			
			if(proj.owner!=ship)
			{
				var distX=ship.x-proj.x;
				var distY=ship.y-proj.y;
				
				var distance=Math.sqrt(distX*distX+distY*distY);
				
				if(distance<=HIT_DISTANCE)
				{
					_projectiles.splice(i,1);
					--i;
					
					ship.respawn();
				}
				
			}
		}
	}
		
		
	}
		
	this.draw = function(){
		_ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		for (var i in _ships)
		{
			_ships[i].draw(_ctx);	
		}
		
		for(var i in _projectiles){
			_projectiles[i].draw(_ctx);
		}

		_gravityWell.draw(_ctx);
	}
}