function  DataStorage(){
	function addData(index,data){
		localStorage.setItem(index.toString(), JSON.stringify(data));
	}
	function getFullStorageData(){
		return localStorage;
	}
	function getLengthStorageData(){
		return localStorage.length;
	}
	function getItemData(id){
		var obj;
		for(var i in localStorage){
			obj = JSON.parse(localStorage.getItem(i));
			if(obj.id === id){
				return JSON.parse(localStorage.getItem(i.toString()));
			}
		}
	}
	function updateData(){
		var obj;
		var index = 0;
		for(var i in localStorage){
			obj = JSON.parse(localStorage.getItem(i));
			obj.id  = index;
			localStorage.setItem(i, JSON.stringify(obj));
			index++;
			console.log(localStorage.getItem(i));		
		}
		console.log("-----------------------------------------");	
	}
	function removeData(id){
		var obj;
		for(var i in localStorage){
			obj = JSON.parse(localStorage.getItem(i));
			if(obj.id === id){
				localStorage.removeItem(i)
			}
		}
		updateData();
	}
	function editData(key, value){
		localStorage[key.toString()] = value;
	}
	this.getItem = function(id){
		return getItemData(id);
	}
	this.updateItems = function(key){
		return updateData();
	}
	this.getLengthStorage = function(){
		return getLengthStorageData();
	}
	this.getFullStorage = function(){
		return getFullStorageData();
	}
	this.add = function(index,data){
		addData(index,data);
	};
	this.remove = function(index){
		removeData(index);
	};
	this.edit = function(key,value){
		editData(key,value);
	};
}