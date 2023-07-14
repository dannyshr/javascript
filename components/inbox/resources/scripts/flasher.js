
/**
* Toggles a given element's display on and off by setting its display 
* attribute to "block" and "none" correspondingly, for a given time 
* interval (in milliseconds).
* @objId The id of the element to turn its display on and off.
* @flashInterval The interval in milliseconds between showing and hiding the object.
* @intervalId The intervalId returned by the "window.setInterval" method. 
* 		This is required in order to clear the interval.
*/				
function toggleFlash(objId,flashInterval,intervalId) {
	//declare locals
	var objElem = null;
	var _isFlashing = false;
	var attName = "isFlashing";
	var defaultFlashInterval = 500;
	
	//check for nulls
	if (objId==null || objId=="") {
		return;
	}
	
	//set defaults if necessary
	if (flashInterval==null || flashInterval=="") {
		flashInterval = defaultFlashInterval;
	}
	
	//get elements by their ids
	objElem = document.getElementById(objId);
	
	//check for nulls
	if (objElem==null) {
		return;
	}
	
	//get the flashing attribute
	_isFlashing = isFlashing(objId);
	
	//check the flag
	if (_isFlashing) {
		//stop the flash
		if (intervalId!=null) {
			window.clearInterval(intervalId);
		}
		objElem.setAttribute(attName,"false");
		objElem.style.visibility = "visible";
	}
	else {
		//start the flash
		objElem.setAttribute(attName,"true");
		return window.setInterval("toggleDisplay('"+objId+"')",flashInterval);
	}
}

/**
* Check the value of an "isFlashing" attribute of a given HTML element.
* @objId The id of the element for which to check the attribute.
* @return The value of the "isFlashing" attribute as a boolean.
*/				
function isFlashing(objId) {
	//declare locals
	var objElem = null;
	var _isFlashing = false;
	var attName = "isFlashing";
	
	//check for nulls
	if (objId==null || objId=="") {
		return false;
	}
	
	//get elements by their ids
	objElem = document.getElementById(objId);
	
	//check for nulls
	if (objElem==null) {
		return false;
	}
	
	//get the flashing attribute
	_isFlashing = objElem.getAttribute(attName);
	
	//set defaults if necessary
	if (_isFlashing==null) {
		_isFlashing = "false";
	}
	
	//return the method's value
	return ((_isFlashing.toLowerCase()=="true") ? true : false);
}

/**
* Toggles a given element's display on and off by setting its display 
* attribute to "block" and "none" correspondingly
* @objId The id of the element to turn its display on and off.
*/				
function toggleDisplay(objId) {
	//declare locals
	var objElem = null;
	var currDisplay = null;
	
	//check for nulls
	if (objId==null || objId=="") {
		return;
	}
	
	//get elements by their ids
	objElem = document.getElementById(objId);
	
	//check for nulls
	if (objElem==null) {
		return;
	}
	
	//get the object's current display
	currDisplay = objElem.style.visibility;
	
	//set defaults if necessary
	if (currDisplay==null || currDisplay=="") {
		currDisplay = "hidden";
	}
	
	//reset the display mode
	if (currDisplay.toLowerCase()=="hidden") {
		currDisplay = "visible";
	}
	else {
		currDisplay = "hidden";
	}
	objElem.style.visibility = currDisplay
}

/**
* Resets the position of an element on the screen, by setting its left and top attributes.
* @objId The id of the HTML element.
* @newLeft The new value of the left position.
* @newTop The new value of the top position.
*/				
function resetPosition(objId,newLeft,newTop) {
	//declare locals
	var elem = null;
	
	//check for nulls
	if (objId==null || objId=="" 
		|| newLeft==null || newLeft=="" 
		|| newTop==null || newTop=="") {
		return;
	}
	
	//get elements by their id's
	elem = document.getElementById(objId);
	
	//check for nulls
	if (elem==null) {
		return;
	}
	
	//fix the values if necessary
	if (newLeft.indexOf("px")==-1) {
		newLeft += "px";
	}
	if (newTop.indexOf("px")==-1) {
		newTop += "px";
	}
	
	//set the object's new position
	elem.style.left = newLeft;
	elem.style.top = newTop;
}
