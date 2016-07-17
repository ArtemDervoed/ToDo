window.onload = function(){
	var memo = new DataStorage();
	var node = document.getElementsByClassName("strips");
	var todos = document.getElementsByClassName("strips--single-data");
	var todosCount = document.getElementById("todos-count");
	var counter = memo.getLengthStorage();
	var clickCounter = 0;
	var inputBox;
	todosCount.innerHTML = "Количество заметок " +  memo.getLengthStorage(); 
	var message = {
		id : "",
		data : "",
		active : true
	}
	var displayMode = 0;
	refresh();
	node[0].ondblclick = function( e ) {
		var target = e.target;
		if (target.className !== 'single-data--todo'){
			return;
		}
		if(target.className == "single-data--todo"){
			target = e.target;
			for(var i = 0; i < todos.length; i++){
				if (todos[i] === target.parentNode){
					var inputBox = document.createElement('input');
					inputBox.type = 'text';
					inputBox.className = 'editing-todo';
					target.appendChild(inputBox);
					var td = prompt("Edit todo");
					if(td !==''){
						memo.setContentItem(i,td);
						target.removeChild(inputBox);
					}
				}
			}
		}
		Draw();
	}
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
		Draw();
		todosCount.innerHTML = "Количество заметок " + memo.getLengthStorage();
		counter = memo.getLengthStorage();
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
	document.getElementsByClassName("todos-count--select-all")[0].onclick = function() {
		if(clickCounter === 0){
			for(var i = 0; i < memo.getLengthStorage(); i++){
				if(memo.getItem(i).active === true){	
					memo.setStatusItem(i);
				} else {
					continue;
				}
			}
			onlyDisable();
			displayMode = 1;
			clickCounter++;
		}else if(clickCounter === 1) {
			for(var i = 0; i < memo.getLengthStorage(); i++){
				if(memo.getItem(i).active === false){	
					memo.setStatusItem(i);
				} else {
					continue;
				}
			}
			displayMode = 2;
			onlyActive();
			clickCounter--;
		}
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
				textBox[0].value = "";
				counter = localStorage.length;
				Draw();
			}
		}
		todosCount.innerHTML = "Количество заметок " + memo.getLengthStorage();
	}
	function Draw(){
		if(displayMode === 0){
			refresh();
		}
		else if(displayMode === 1) {
			onlyDisable();
		}
		else if(displayMode === 2){
			onlyActive();
		}
	}
	function switchStatus(index){
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
	function onlyActive(){
		refresh();
		for( var i = 0; i < memo.getLengthStorage(); i++){
			if(memo.getItem(i).active === false){
				todos[i].style.display = 'none';
			}
		}
	}
	function onlyDisable(){
		refresh();
		for( var i = 0; i < memo.getLengthStorage(); i++){
			if(memo.getItem(i).active === true){
				todos[i].style.display = 'none';
			}
		}
	}
	function refresh(){
		invalidate();
		for(var i = 0;i < memo.getLengthStorage(); i++){
			var li = document.createElement('li');
			li.className = 'strips--single-data';
			var divStatus = document.createElement('div');
			divStatus.className = 'single-data--status';
			var divTodo = document.createElement('div');
			divTodo.className = 'single-data--todo';
			divTodo.innerHTML = memo.getItem(i).data;
			if(memo.getItem(i).active === false){
				divTodo.className+= ' '+'__is-not-active'
			}
			var divDelete = document.createElement('div');
			divDelete.className = 'single-data--del';
			li.appendChild(divStatus);
			li.appendChild(divTodo);
			li.appendChild(divDelete);
			node[0].appendChild(li);
		}
	}
}