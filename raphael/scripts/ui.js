//declare globals

function dataToString(dataObj) {
	//declare locals
	var dataString = "";
	
	//loop through the items in the array
	for (var item in dataObj) {
		//render th item as a string
		dataString += item + ":"  + dataObj[item] + "<br/>";
	}
	
	//return the method's value
	return dataString;
}

function stringToJson(data) {
	//declare locals
	var JSON_START = "{";
	var JSON_END = "}";
	var ARRAY_START = "[";
	var ARRAY_END = "]";
	var dataObj = null;
	var firstChar = null;
	var lastChar = null;
	var fixedData = null;
	var arrData = null;
	var currItem = null;
	var arrKeyValue = null;
	var currKey = null;
	var currValue = null;
	
	//check for nulls
	if (Utils.isEmpty(data)) {
		return null;
	}
	
	//check for the correct type
	if (typeof data != "string") {
		return null;
	}
	
	//check if the string is long enough
	if (data.length<2) {
		return null;
	}
	
	//get the first and last chars
	firstChar = data.substring(0,1);
	lastChar = data.substring(data.length-1);
	
	//check for valid first and last chars
	if ((firstChar!=JSON_START || lastChar!=JSON_END) && (firstChar!=ARRAY_START || lastChar!=ARRAY_END)) {
		arrData = Utils.stringToArray(data);
	}
	else {
		//parse the string
		fixedData = data.substring(1,data.length-1);
		arrData = Utils.stringToArray(fixedData);
	}
	
	//create a new object
	dataObj = {};
	
	//check for nulls
	if (arrData==null) {
		return null;
	}
	
	//loop throug the items
	for (var i=0;i<arrData.length;i++) {
		//get the current item
		currItem = arrData[i];
		
		//parse the item to a key value array
		arrKeyValue = Utils.stringToKeyValueArray(currItem);
		
		//get the key and the value
		currKey = arrKeyValue[0];
		currValue = arrKeyValue[1];
		
		//check for nulls
		if (Utils.isEmpty(currValue)) {
			currValue = null;
		}
		else {
			//trim the value, and clean any apostrophies, or quotes
			currValue = Utils.trim(currValue);
			currValue = currValue.replace(/'/g,"");
			currValue = currValue.replace(/"/g,"");
			
			//get the first and last chars
			firstChar = currValue.substring(0,1);
			lastChar = currValue.substring(data.length-1);
			
			//check for valid first and last chars
			if ((firstChar==JSON_START && lastChar==JSON_END) || (firstChar==ARRAY_START && lastChar==ARRAY_END)) {
				currValue = stringToJson(currValue);
			}
		}
		
		//push the key to the returned object
		dataObj[currKey] = currValue;
	}
	
	//return the method's value
	return dataObj;
}
