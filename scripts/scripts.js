window.onload = function(){
	//localStorage.clear();
	var counter= localStorage.length;
	var memo = new DataStorage();
	var node = document.getElementsByClassName("strips");
	var todos = document.getElementsByClassName("strips--single-data");
	var message = {
		id : "",
		data : "",
		active : true
	}
	var displayMode;
	refresh(memo);
	node[0].onclick = function( e ) {
		var target = event.target;
		if (target.className != 'single-data--del'){
			return;
		} 
		target = target.parentNode;
		console.log(target);
		for(var i = 0; i < todos.length; i++){
			if (todos[i]===target){
				memo.remove(i);
			}
		}
		if(displayMode === 0){
	    	refresh(memo);
	    }
	    else if(displayMode === 1){
	    	onlyDisable(memo);
	    }
	    else if(displayMode === 2){
	    	onlyActive(memo);
	    }
		counter = localStorage.length;
	};
	document.getElementsByClassName("only-enable")[0].onclick = function(){
		onlyActive(memo);
		displayMode = 2;
	};
	document.getElementsByClassName("only-disable")[0].onclick = function(){
		onlyDisable(memo);
		displayMode = 1;
	};
	document.getElementsByClassName("all")[0].onclick = function(){
		refresh(memo);
		displayMode = 0;
	};
	document.onkeydown = function checkKeycode(event){
	    if(!event){
	    	var event = window.event;
	    }
	    else if(event.which==13) {
	    	var textBox = document.getElementsByClassName("input-box--input");
	    	if(textBox[0].value!=="") {
	    		message.data = textBox[0].value;
	    		message.id = counter; 
	    		memo.add(counter, message);
	    		console.log(localStorage);
	    		textBox[0].value = "";
	    		counter = localStorage.length;
	    		if(displayMode === 0){
	    			refresh(memo);
	    		}
	    		else if(displayMode=== 1) {
	    			onlyDisable(memo);
	    		}
	    		else if(displayMode === 2){
	    			onlyActive(memo);
	    		}
	    	}
		}
	}
}
function switchStatus(index,memo){
	memo.setStatusItem(index);
	var singleStrip = document.getElementsByClassName('strips--single-data');	
	if(memo.getItem(index).active===false){
		singleStrip[index].classList.add("__is-not-active");
	} else if(memo.getItem(index).active===true){
		singleStrip[index].classList.remove("__is-not-active");
	}
}
function invalidate(){
	node = document.getElementsByClassName('strips');
	childs = document.getElementsByClassName('strips--single-data');
	while(childs.length !== 0){
		node[0].removeChild(childs[0])
	}	
}
function onlyActive(memo){
	invalidate();
	for( var i = 0; i < memo.getLengthStorage(); i++){
		var strip = document.createElement('li');
		if(memo.getItem(i).active===true){
			strip.className ='strips--single-data';		 
			strip.innerHTML = memo.getItem(i).data;
			var del = document.createElement('div');
			del.className ='single-data--del';
			del.innerHTML ="";
			strip.appendChild(del);
			var status = document.createElement('div');
			status.className ='single-data--status';
			status.innerHTML ="";
			strip.appendChild(status);
			node[0].insertBefore(strip,node.firstChild);
		}
	}
}
function onlyDisable(memo){
	invalidate();
	for( var i = 0; i < memo.getLengthStorage(); i++){
		var strip = document.createElement('li');
		if(memo.getItem(i).active===false){
			strip.className ='strips--single-data __is-not-active';		 
			strip.innerHTML = memo.getItem(i).data;
			var del = document.createElement('div');
			del.className ='single-data--del';
			del.innerHTML ="";
			strip.appendChild(del);
			var status = document.createElement('div');
			status.className ='single-data--status';
			status.innerHTML ="";
			strip.appendChild(status);
			node[0].insertBefore(strip,node.firstChild);
		}
	}
}
function refresh(memo){
	invalidate();
	for( var i = 0; i < memo.getLengthStorage(); i++){
		var strip = document.createElement('li');
		if(memo.getItem(i).active===false){
			strip.className ='strips--single-data __is-not-active';		 
		} else {
			strip.className ='strips--single-data';
		}
		strip.innerHTML = memo.getItem(i).data;
		var listStrips = document.getElementsByClassName('strips');
		var del = document.createElement('div');
		del.className ='single-data--del';
		del.innerHTML ="";
		strip.appendChild(del);
		var status = document.createElement('div');
		status.className ='single-data--status';
		status.innerHTML ="";
		strip.appendChild(status);
		listStrips[0].insertBefore(strip,listStrips.firstChild);
	}
}