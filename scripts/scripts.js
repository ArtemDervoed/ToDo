window.onload = function(){
	localStorage.clear();
	var counter= 0;
	var memo = new DataStorage();
	var node = document.getElementsByClassName("strips");
	var message = {
		id : "",
		data : "",
		active : true
}
		document.getElementsByClassName("strips")[0].onclick = function( e ) {
		var target = e ? e.target : event.srcElement;
			while ( target != this && target.nodeName.toLowerCase() != "li"  ) {
				target = target.parentNode;
			}
			if ( target == this ) { 
				return; 
			}
			var index = 0;
			while ( (target = target.previousSibling) ) {
				if ( target.nodeType === 1 ) {
					index++;
				}
	        }
			counter--;
			memo.remove(index);
			refresh(memo);
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
	    		counter++;
	    		refresh(memo);
	    	}
		}
	}
}
function refresh(memo){
	var node = document.getElementsByClassName('strips');
	childs = document.getElementsByClassName('strips--single-data');
	while(childs.length !== 0){
		node[0].removeChild(childs[0])
	}
	for( var i = 0; i < memo.getLengthStorage(); i++){
		var strip = document.createElement('li');
		strip.className ='strips--single-data';
		strip.innerHTML = memo.getItem(i).data;
		var listStrips = document.getElementsByClassName('strips');
		listStrips[0].insertBefore(strip,listStrips.firstChild);
	}
}
