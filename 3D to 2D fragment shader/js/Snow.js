var snow = {
	info : {
		top : 0,
		left : 0,
		zIndex : 500,
		number : 70
	},
	down : function(){
		// Scene Size
		var win_Width = window.innerWidth;
		var win_Height = window.innerHeight;
		// Add scene
		var oCanvas = document.createElement('canvas');
		oCanvas.style.position = 'fixed';
		oCanvas.style.pointerEvents = 'none';
		oCanvas.style.top = snow.info.top + 'px';
		oCanvas.style.left = snow.info.left + 'px';
		oCanvas.style.zIndex = snow.info.zIndex;
		oCanvas.width = win_Width;
		oCanvas.height = win_Height;
		document.body.appendChild(oCanvas);
		// Add snow
		// Reference: https://github.com/coolfishstudio/cfs.snow.js/blob/master/CFS.Snow.js
		var arrSnow = [];
		for(var i = 0; i < snow.info.number; i++){
			arrSnow.push({
				x : Math.random() * win_Width,  // X-axis of snow
				y : Math.random() * win_Height, // Y-axis of snow
				r : Math.random() * 4 + 1,      // radius of snow
				n : Math.random() * 70
			});
		}
		var gd = oCanvas.getContext('2d'); // draw elements
		var speed = 0;
		// Handling Animation Effects
		setInterval(function(){
			gd.clearRect(0, 0, win_Width, win_Height);
			gd.fillStyle = 'rgba(255, 255, 255, 0.6)';
			gd.shadowBlur = 5;
			gd.shadowColor = 'rgba(255, 255, 255, 0.9)';
			gd.beginPath();
			// Draw snow
			for(var i = 0; i < 70; i++){
				var _snowObj = arrSnow[i];
				gd.moveTo(_snowObj.x, _snowObj.y);
				gd.arc(_snowObj.x, _snowObj.y, _snowObj.r, 0, Math.PI * 2, 0);
			}
			gd.fill();
			speed += 0.01;
			//  Treatment of snow fall
			for(var i = 0; i < 70; i++){
				var _snowObj = arrSnow[i];
				_snowObj.y += Math.cos(speed + _snowObj.n) + _snowObj.r / 2;
				_snowObj.x += Math.sin(speed) * 2;
				if(_snowObj.x > win_Width + 5 || _snowObj.x < -5 || _snowObj.y > win_Height){
					arrSnow[i] = i % 3 > 0 ? {x : Math.random() * win_Width, y : -10, r : _snowObj.r, n : _snowObj.n} : Math.sin(speed) > 0 ? {x : -5, y : Math.random() * win_Height, r : _snowObj.r, n : _snowObj.n} : {x : win_Width + 5, y : Math.random() * win_Height, r : _snowObj.r, n : _snowObj.n};
				}
			}
		},15);
	}
};
snow.down();