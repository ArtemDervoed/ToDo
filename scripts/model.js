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
		return JSON.parse(localStorage.getItem(localStorage.key(id)));
	}
	function setStatusItemData(id){
		var obj = JSON.parse(localStorage.getItem(id));
		if( obj.active === true){
			obj.active = false;
		} else {
			obj.active = true;
		}
			localStorage.setItem(id, JSON.stringify(obj));
	}
	function getLastKeyData(){
		return localStorage.key(localStorage.length - 1);
	}
	function setContentItemData(id, newContent){
		var obj = JSON.parse(localStorage.getItem(id));
		obj.data = newContent;
		localStorage.setItem(id, JSON.stringify(obj));
	}
	function removeData(id){
		localStorage.removeItem(id);
	}
	function getKeyData(id){
		return localStorage.key(id);
	}
	this.getKey = function(id){
		return getKeyData(id);
	}
	this.getLastKey = function(){
		return getLastKeyData();
	}
	this.setContentItem = function(id, newContent){
		setContentItemData(id,newContent);
	}
	this.setStatusItem = function(id){
		setStatusItemData(id);
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
}