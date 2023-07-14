
function Blinker(_elementId,_blinkInterval) {
	//declare global object variables
	var DEFAULT_INTERVAL = 500;
	this._intervalId = null;
	this._elemValue = null;
	this._interval = _blinkInterval;
	this._elemId = _elementId;
	this._isBlinking = false;
	
	//declare the object's functions
	this.blink=function() {
		//declare locals
		var _elemObj = null;
		
		//check for valid values
		if (!Utils.isElement(this._elemId)) {
			this._intervalId = null;
		}
		
		//check for an already blinking object
		if (!this._isBlinking) {
			//set defaults if necessary
			if (this._interval==null || this._interval=='undefined') {
				this._interval = DEFAULT_INTERVAL;
			}
			
			//get elemnts by their ids
			_elemObj = Utils.getElement(this._elemId);
			
			//check for nulls
			if (_elemObj==null) {
				this._intervalId = null;
			}
			
			//get the object's value
			this._elemValue = _elemObj.value;
			this._isBlinking = true;
			this._intervalId = window.setInterval("blinkElementValue('"+this._elemId+"','"+this._elemValue+"')",this._interval);
		}
	};
	this.stopBlinking=function() {
		//declare locals
		var _elemObj = null;
		
		//check for an already blinking object
		if (this._isBlinking) {
			//check for valid values
			if (!Utils.isElement(this._elemId)) {
				return;
			}
			
			//stop the blinking
			if (this._intervalId!=null && this._intervalId!='undefined') {
				window.clearInterval(this._intervalId);
			}
			this._isBlinking = false;

			//get elemnts by their ids
			_elemObj = Utils.getElement(this._elemId);
			
			//check for nulls
			if (_elemObj==null) {
				return;
			}
			
			//recover the object's value
			_elemObj.value = this._elemValue;
		}
	};
};

function blinkElementValue(_elemId,_value) {
	//declare locals
	var _elemObj = null;
	var _val = null;
	
	//check for valid values
	if (!Utils.isElement(_elemId)) {
		return;
	}
	
	//get elements by their ids
	_elemObj = Utils.getElement(_elemId);
	
	//check for nulls
	if (_elemObj==null) {
		return;
	}
	
	//get the object's value
	_val = _elemObj.value;
	
	//check the current value
	if (_val=="") {
		_elemObj.value = _value;
	}
	else {
		_elemObj.value = "";
	}
}
