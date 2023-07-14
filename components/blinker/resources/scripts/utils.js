
function Utils() {
	//declare global object variables
	
	//declare the object's functions
	this.isValidElement=function(_elemId) {
		//check for nulls
		if (_elemId==null || _elemId=='undefined' || _elemId=='') {
			return false;
		}
		
		return true;
	};
	this.isValidElemObject=function(_elemId) {
		//declare locals
		var _elemObj = null;
		
		//check for nulls
		if (!this.isValidElement(_elemId)) {
			return false;
		}
		
		//get elements by id
		_elemObj = document.getElementById(_elemId);
		
		//check for nulls
		if (_elemObj==null) {
			return false;
		}
		
		return true;
	};
	this.getElemObject=function(_elemId) {
		//declare locals
		var _elemObj = null;
		
		//check for nulls
		if (!this.isValidElemObject(_elemId)) {
			return null;
		}
		
		//get elements by id
		_elemObj = document.getElementById(_elemId);
		
		return _elemObj;
	};
	this.isEmptyString=function(_string) {
		//check for nulls
		if (_string==null || _string=='undefined' 
			|| _string=='' || _string=='null') {
			return true;
		}
		
		return false;
	};
	this.isNull=function(_object) {
		//check for nulls
		if (_object==null || _object=='undefined' || _object=='null') {
			return true;
		}
		
		return false;
	};
};
