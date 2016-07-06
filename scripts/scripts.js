window.onload = function(){
	var memo = new DataStorage();
	var node = document.getElementsByClassName("strips");
	var todos = document.getElementsByClassName("strips--single-data");
	var todosCount = document.getElementById("todos-count");
	var counter = memo.getLengthStorage();
	todosCount.innerHTML = "Количество заметок " +  memo.getLengthStorage(); 
	var message = {
		id : "",
		data : "",
		active : true
	}
	var displayMode = 0;
	refresh(memo);
	node[0].onclick = function( e ) {
		var target = e.target;
		if (target.className !== 'single-data--del' && target.className !== 'single-data--status'){
			return;
		}
		if(target.className == "single-data--del"){
			target = target.parentNode;
			for(var i = 0; i < todos.length; i++){
				if (todos[i]===target){
					memo.remove(i);
				}
			}
		}
		if(target.className == "single-data--status"){
			target = target.parentNode;
			for(var i = 0; i < todos.length; i++){
				if (todos[i] === target){
					memo.setStatusItem(i);
				}
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
	    todosCount.innerHTML = "Количество заметок " + memo.getLengthStorage();
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
	    else if(event.which == 13) {
	    	var textBox = document.getElementsByClassName("input-box--input");
	    	if(textBox[0].value !== "") {
	    		message.data = textBox[0].value;
	    		message.id = counter; 
	    		memo.add(counter, message);
	    		console.log(localStorage);
	    		textBox[0].value = "";
	    		counter = localStorage.length;
	    		if(displayMode === 0){
	    			refresh(memo);
	    		}
	    		else if(displayMode === 1) {
	    			onlyDisable(memo);
	    		}
	    		else if(displayMode === 2){
	    			onlyActive(memo);
	    		}
	    	}
		}
		todosCount.innerHTML = "Количество заметок " + memo.getLengthStorage();
	}
	function switchStatus(index,memo){
		memo.setStatusItem(index);	
		if(memo.getItem(index).active === false){
			todos[index].classList.add("__is-not-active");
		} else if(memo.getItem(index).active === true){
			todos[index].classList.remove("__is-not-active");
		}
	}
	function invalidate(){
		while(todos.length !== 0){
			node[0].removeChild(todos[0])
		}	
	}
	function onlyActive(memo){
		invalidate();
		for( var i = 0; i < memo.getLengthStorage(); i++){
			var strip = document.createElement('li');
			if(memo.getItem(i).active === true){
				strip.className ='strips--single-data';		 
				strip.innerHTML = memo.getItem(i).data;
				var del = document.createElement('div');
				del.className = 'single-data--del';
				del.innerHTML = "";
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
				del.className = 'single-data--del';
				del.innerHTML = "";
				strip.appendChild(del);
				var status = document.createElement('div');
				status.className = 'single-data--status';
				status.innerHTML = "";
				strip.appendChild(status);
				node[0].insertBefore(strip,node.firstChild);
			}
		}
	}
	function refresh(memo){
		invalidate();
		for( var i = 0; i < memo.getLengthStorage(); i++){
			var strip = document.createElement('li');
			if(memo.getItem(i).active === false){
				strip.className = 'strips--single-data __is-not-active';		 
			} else {
				strip.className = 'strips--single-data';
			}
			strip.innerHTML = memo.getItem(i).data;
			var del = document.createElement('div');
			del.className ='single-data--del';
			del.innerHTML ="";
			strip.appendChild(del);
			var status = document.createElement('div');
			status.className = 'single-data--status';
			status.innerHTML = "";
			strip.appendChild(status);
			node[0].insertBefore(strip,node.firstChild);
		}
	}
}