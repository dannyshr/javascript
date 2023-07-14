
if(typeof Utils!=='function'){
/**
 * A Utils component
 * @return A Utils component
 */
function Utils() {
	this.getElement=function(_elementId) {
		//declare locals
		var _elemObj = null;
		
		//check for nulls
		if (this.isEmpty(_elementId)) {
			return null;
		}
		
		//get elements by id
		_elemObj = document.getElementById(_elementId);
		
		//return the method's value
		return _elemObj;
	};
	this.isArray=function(_obj) {
		//check for a boolean type
		if (typeof _obj=="boolean") {
			return false;
		}
		
		//check for nulls
		if (_obj==null || _obj=="undefined") {
			return false;
		}

		//returns true if it is an array
		if (_obj.constructor.toString().toLowerCase().indexOf("array") == -1) {
			return false;
		}
		return true;
	};
	this.isBoolean=function(_obj) {
		//returns true if it is a boolean
		if (typeof _obj=="boolean") {
			return true;
		}
		return false;
	};
	this.isElement=function(_elementId) {
		//declare locals
		var _elemObj = null;
		
		//get elements by id
		_elemObj = this.getElement(_elementId);
		
		//check for nulls
		if (this.isEmpty(_elemObj)) {
			return false;
		}
		
		//return the method's value
		return true;
	};
	this.trim=function(_string) {
		//declare locals
		var _retVal = null;
		var _findPattern = /^\s+|\s+$/g;
		var _replacePattern = "";
		
		//sert the return value
		_retVal = _string;
		
		//check for a String type
		if (typeof _string=="string") {
			//check for an empty string
			if (this.isEmpty(_string)) {
				return _retVal;
			}
			
			//remove leading and tailing spaces
			_retVal = _retVal.replace(_findPattern,_replacePattern);
		}
		
		//return the method's value
		return _retVal;
	};
	this.isEmpty=function(_obj) {
		//declare locals
		var _empty = false;
		
		//check for a boolen value
		if (this.isBoolean(_obj)) {
			return false;
		}
		
		//check for nulls
		if (_obj==null || _obj=="undefined") {
			return true;
		}

		//check the type of the object
		if (typeof _obj == "string") {
			if (_obj=="" || _obj=="null") {
				return true;
			}
		}
		
		//check for an array
		if (this.isArray(_obj)) {
			//check the length
			if (_obj.length<1) {
				return true;
			}
			
			//loop through the array
			for (var i=0;i<_obj.length;i++) {
				//invoke the method recursively
				_empty = this.isEmpty(_obj[i]);
				if (_empty==false) {
					break;
				}
			}
			
			//check for an empty input
			if (_empty==true) {
				return true;
			}
			
			//return the method's value
			return false;
		}
		
		//loop through a string's characters
		if (typeof _obj == "string") {
			if (_obj.length) {
				for (var i=0;i<_obj.length;i++) {
					if (_obj[i]!=" ") {
						_empty = false;
						break;
					}
				}
			}
		}
		
		//check for an empty input
		if (_empty==true) {
			return true;
		}
		
		//return the method's value
		return false;
	};
	this.isInArray = function(_item,_array) {
		//declare locals
		var _retVal = false;
		var _currItem = null;
		
		//check for an _item
		if (this.isEmpty(_item)) {
			return false;
		}
		
        //check for an array type
		if (!this.isArray(_array)) {
			return false;
		}
        
		//loop through the array
		for (var i=0;i<_array.length;i++) {
			//get the current item
			_currItem = _array[i];
			
			//check for nulls
			if (this.isEmpty(_currItem)) {
				continue;
			}
			
			//check the item's type
	        if (typeof _item=="string") {
				//compare the items
				if (_currItem.toLowerCase()==_item.toLowerCase()) {
					_retVal = true;
					break;
				}
	        }
	        else {
				//compare the items
				if (_currItem==_item) {
					_retVal = true;
					break;
				}
	        }
		}
		
		//return the method's value
		return _retVal;
	};
	this.parseBoolean=function(booleanVal) {
		//check for a boolean type
		if (typeof booleanVal=="boolean") {
			return booleanVal;
		}
		
		//check for nulls
		if (this.isEmpty(booleanVal)) {
			return false;
		}
		
		//check for a string type
		if (typeof booleanVal!="string") {
			return false;
		}
		
		//check the value
		if (booleanVal.toLowerCase()=="true") {
			return true;
		}
		
		//return the method's value
		return false;
	};
	this.parseNumber=function(number) {
		//declare locals
		var _retVal = 0;
		var _indexSuffix = -1;
		
		//check for a numeric type
		if (typeof number=="number") {
			return number;
		}
		
		//check for a non-string type
		if (typeof number!="string") {
			return _retVal;
		}
		
		//assume the type is string
		
		//check for nulls
		if (this.isEmpty(number)) {
			return _retVal;
		}
		
		//check for a numeric string
		if (!isNaN(number)) {
			//check for a floating point
			if (number.indexOf(".")!=-1) {
				_retVal = parseFloat(number);
			}
			else {
				_retVal = parseInt(number);
			}
			
			//return the method's value
			return _retVal;
		}
		
		//check for a valid suffix
		if (number.toLowerCase().indexOf("em")==-1 && number.toLowerCase().indexOf("ex")==-1
			&& number.toLowerCase().indexOf("px")==-1 && number.toLowerCase().indexOf("in")==-1
			&& number.toLowerCase().indexOf("cm")==-1 && number.toLowerCase().indexOf("mm")==-1
			&& number.toLowerCase().indexOf("pt")==-1 && number.toLowerCase().indexOf("pc")==-1
			&& number.indexOf("%")==-1) {
			return _retVal;
		}
		
		//get the number's suffix
		_indexSuffix = number.toLowerCase().indexOf("px");
		if (_indexSuffix==-1) {
			_indexSuffix = number.toLowerCase().indexOf("em");
			if (_indexSuffix==-1) {
				_indexSuffix = number.toLowerCase().indexOf("ex");
				if (_indexSuffix==-1) {
					_indexSuffix = number.toLowerCase().indexOf("in");
					if (_indexSuffix==-1) {
						_indexSuffix = number.toLowerCase().indexOf("cm");
						if (_indexSuffix==-1) {
							_indexSuffix = number.toLowerCase().indexOf("mm");
							if (_indexSuffix==-1) {
								_indexSuffix = number.toLowerCase().indexOf("pt");
								if (_indexSuffix==-1) {
									_indexSuffix = number.toLowerCase().indexOf("pc");
									if (_indexSuffix==-1) {
										_indexSuffix = number.indexOf("%");
									}		
								}		
							}		
						}		
					}		
				}		
			}		
		}		
		
		//parse the number from its suffix
		if (_indexSuffix!=-1) {
			_retVal = number.substring(0,_indexSuffix);
		}
		
		//return the method's value
		return _retVal;
	};
	this.addLeadingZeros=function(_number,_numberLength) {
		//declare locals
		var _strNumber = String(_number);
		var _missingZeros = 0;
		
		//set defaults if necessary
		if (_numberLength==null || _numberLength=="undefined" || _numberLength=="" || _numberLength<=0) {
			_numberLength = 2;
		}
		
		//get the number of missing zeros
		_missingZeros = (_numberLength - _strNumber.length);
		
		//ceck the number of missing zeros
		if (_missingZeros < 1) {
			return _strNumber;
		}
		
		//loop through the number of missing zeros
		for (var i=0;i<_missingZeros;i++) {
			//add a leading zero
			_strNumber = "0" + _strNumber;
		}
		
		//return the method's value
		return _strNumber;
	};
};
};

if(typeof SelectUtils!=='function'){
/**
 * A SelectUtils component
 * @return A SelectUtils component
 */
function SelectUtils() {
	//declare members
	this.utils = new Utils(); 
	
	//declare methods
	this.getSelectComp = function(selectId) {
		//declare locals
		var _comp = null;
		
		//check for nulls
		if (this.utils.isEmpty(selectId)) {
			return null;
		}
		
		//get elements by their ids
		_comp = document.getElementById(selectId);
		
		//check for nulls
		if (_comp==null) {
			return null;
		}
		
		//check the element's type
		if (_comp.type) {
			if (_comp.type.toLowerCase().indexOf("select")==-1) {
				return null;
			}
		}
		else {
			return null;
		}
		
		//return the method's value
		return _comp;
	};
	this.getOptionLabelIndex = function(selectId,optionLabel) {
		//declare locals
		var _index = -1;
		var _comp = null;
		var _size = 0;
		var _currOpt = null;
		
		//check for nulls
		if (this.utils.isEmpty(selectId) || this.utils.isEmpty(optionLabel)) {
			return _index;
		}
		
		//get elements by their ids
		_comp = this.getSelectComp(selectId);
		
		//check for nulls
		if (_comp==null) {
			return _index;
		}
		
		//get the number of options
		_size = _comp.length;
		
		//loop through the options
		for (var i=0;i<_size;i++) {
			//get the current option
			_currOpt = _comp.options[i];
			
			//compare the labels
			if (_currOpt.text.toLowerCase()==optionLabel.toLowerCase()) {
				_index = i;
				break;
			}
		}
		
		//return the method's value
		return _index;
	};
	this.getOptionValueIndex = function(selectId,optionValue) {
		//declare locals
		var _index = -1;
		var _comp = null;
		var _size = 0;
		var _currOpt = null;
		
		//check for nulls
		if (this.utils.isEmpty(selectId) || this.utils.isEmpty(optionValue)) {
			return _index;
		}
		
		//get elements by their ids
		_comp = this.getSelectComp(selectId);
		
		//check for nulls
		if (_comp==null) {
			return _index;
		}
		
		//get the number of options
		_size = _comp.length;
		
		//loop through the options
		for (var i=0;i<_size;i++) {
			//get the current option
			_currOpt = _comp.options[i];
			
			//compare the labels
			if (_currOpt.value.toLowerCase()==optionValue.toLowerCase()) {
				_index = i;
				break;
			}
		}
		
		//return the method's value
		return _index;
	};
	this.getOptionByLabel = function(selectId,optionLabel) {
		//declare locals
		var _opt = null;
		var _comp = null;
		var _index = -1;
		
		//get the label's index
		_index = this.getOptionLabelIndex(selectId,optionLabel);
		
		//check for a valid index
		if (_index==-1) {
			return null;
		}
		
		//get elements by their ids
		_comp = this.getSelectComp(selectId);
		
		//return the method's value
		return _comp.options[_index];
	};
	this.getOptionByValue = function(selectId,optionValue) {
		//declare locals
		var _opt = null;
		var _comp = null;
		var _index = -1;
		
		//get the label's index
		_index = this.getOptionValueIndex(selectId,optionValue);
		
		//check for a valid index
		if (_index==-1) {
			return null;
		}
		
		//get elements by their ids
		_comp = this.getSelectComp(selectId);
		
		//return the method's value
		return _comp.options[_index];
	};
	this.optionLabelExists = function(selectId,optionLabel) {
		//declare locals
		var _index = -1;
		
		//get the label's index
		_index = this.getOptionLabelIndex(selectId,optionLabel);
		
		//check for a valid index
		if (_index==-1) {
			return false;
		}
		
		//return the method's value
		return true;
	};
	this.optionValueExists = function(selectId,optionValue) {
		//declare locals
		var _index = -1;
		
		//get the label's index
		_index = this.getOptionValueIndex(selectId,optionValue);
		
		//check for a valid index
		if (_index==-1) {
			return false;
		}
		
		//return the method's value
		return true;
	};
	this.addEmptyOption = function(selectId) {
		//declare locals
		var _comp = null;
		var _option = null;
		
		//check for nulls
		//get the component by its id
		_comp = this.getSelectComp(selectId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//render an <option> tag
		_option = document.createElement("option");
		_option.text = "";
		_option.value = "";
		
		//add the option to the list
		try {
			// for IE earlier than version 8
			_comp.add(_option,_comp.options[null]);
		}
		catch (e) {
			_comp.add(_option,null);
		}
	};
	this.addOption = function(selectId,optionLabel,optionValue) {
		//declare locals
		var _comp = null;
		var _option = null;
		
		//check for nulls
		if (this.utils.isEmpty(optionLabel) || this.utils.isEmpty(optionValue)) {
			return;
		}
		
		//get the component by its id
		_comp = this.getSelectComp(selectId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//render an <option> tag
		_option = document.createElement("option");
		_option.text = optionLabel;
		_option.value = optionValue;
		
		//add the option to the list
		try {
			// for IE earlier than version 8
			_comp.add(_option,_comp.options[null]);
		}
		catch (e) {
			_comp.add(_option,null);
		}
	};
	this.updateOptionByLabel = function(selectId,optionLabel,optionValue) {
		//declare locals
		var _comp = null;
		var _index = null;
		
		//get the label's index
		_index = this.getOptionLabelIndex(selectId, optionLabel);
		
		//check for a valid index
		if (_index==-1) {
			return;
		}
		
		//get the component by its id
		_comp = this.getSelectComp(selectId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//set the option's value
		_comp.options[_index].value = optionValue;
	};
	this.updateOptionLabelByValue = function(selectId,optionLabel,optionValue) {
		//declare locals
		var _comp = null;
		var _index = null;
		
		//get the label's index
		_index = this.getOptionValueIndex(selectId, optionValue);
		
		//check for a valid index
		if (_index==-1) {
			return;
		}
		
		//get the component by its id
		_comp = this.getSelectComp(selectId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//set the option's text
		_comp.options[_index].text = optionLabel;
	};
	this.isSelected = function(selectId) {
		//declare locals
		var _index = -1;
		
		//get the component's selected index
		_index = this.getSelectedIndex(selectId);
		
		//check for a valid index
		if (_index==-1) {
			return false;
		}
		
		//return the method's value
		return true;
	};
	this.hasOptions = function(selectId) {
		//declare locals
		var _comp = null;
		var _size = 0;
		
		//get the component by its id
		_comp = this.getSelectComp(selectId);
		
		//check for nulls
		if (_comp==null) {
			return false;
		}
		
		//get the options' size
		_size = _comp.length;
		
		//return the method's value
		return ((_size>0) ? true : false);
	};
	this.getSelectedIndex = function(selectId) {
		//declare locals
		var _comp = null;
		var _index = -1;
		
		//get the component by its id
		_comp = this.getSelectComp(selectId);
		
		//check for nulls
		if (_comp==null) {
			return _index;
		}
		
		//get the selected index
		_index = _comp.selectedIndex;
		
		//return the method's value
		return _index;
	};
	this.removeOption = function(selectId) {
		//declare locals
		var _comp = null;
		var _index = -1;
		
		//get the component by its id
		_comp = this.getSelectComp(selectId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the selected index
		_index = _comp.selectedIndex;
		
		//invoke the overloaded method
		this.removeOptionIndex(selectId,_index);
	};
	this.removeOptionIndex = function(selectId,index) {
		//declare locals
		var _comp = null;
		
		//get the component by its id
		_comp = this.getSelectComp(selectId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//check for a valid index
		if (index<0 || index>=_comp.length) {
			return;
		}
		
		//remove the option
		_comp.remove(index);
	};
	this.removeAllOptions = function(selectId) {
		//declare locals
		var _comp = null;
		var _size = 0;
		
		//get the component by its id
		_comp = this.getSelectComp(selectId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the size of the options
		_size = _comp.length;
		
		//check for a valid size
		if (_size<1) {
			return;
		}
		
		//loop through the items
		for (i=(_size-1);i>=0;i--) {
			//remove the item in the current index
			_comp.remove(i);
		}
	};
};
};

if(typeof HashMap!=='function'){
/**
 * A HashMap component
 * @return A HashMap component
 */
function HashMap() {
	if (this.arrKeys==null) {
		this.arrKeys=new Array();
	}
	if (this.arrValues==null) {
		this.arrValues=new Array();
	};
	this.utils = new Utils(); 
	this.indexOf=function(_key) {
		//declare locals
		var _currKey = null;
		var _index = -1;
		
		//check for nulls
		if (this.utils.isEmpty(_key) || 
			this.arrKeys==null || !this.utils.isArray(this.arrKeys)) {
			return _index;
		}
		
		//loop through the keys
		for (var i=0;i<this.arrKeys.length;i++) {
			//get the current key
			_currKey = this.arrKeys[i];
			
			//compare it with the given key
			if (typeof _key == "string") {
				if (_currKey.toLowerCase()==_key.toLowerCase()) {
					_index = i;
					break;
				}
			}
			else {
				if (_currKey==_key) {
					_index = i;
					break;
				}
			}
		}
		
		//return the method's value
		return _index;
	};
	this.keyAt=function(_index) {
		//declare locals
		var _retVal = null;
		
		//check for nulls
		if (this.utils.isEmpty(_index) || 
			this.arrKeys==null || !this.utils.isArray(this.arrKeys) ||
			this.arrValues==null || !this.utils.isArray(this.arrValues)) {
			return _retVal;
		}
		
		//check for valid values
		if (_index<0 || _index>this.arrKeys.length) {
			return _retVal;
		}
		
		//set the return value
		_retVal = this.arrKeys[_index];
		
		//return the method's value
		return _retVal;
	};
	this.valueAt=function(_index) {
		//declare locals
		var _retVal = null;
		
		//check for nulls
		if (this.utils.isEmpty(_index) || 
			this.arrKeys==null || !this.utils.isArray(this.arrKeys) ||
			this.arrValues==null || !this.utils.isArray(this.arrValues)) {
			return _retVal;
		}
		
		//check for valid values
		if (_index<0 || _index>this.arrValues.length) {
			return _retVal;
		}
		
		//set the return value
		_retVal = this.arrValues[_index];
		
		//return the method's value
		return _retVal;
	};
	this.get=function(_key) {
		//declare locals
		var _retVal = null;
		var _index = -1;
		
		//check for nulls
		if (this.utils.isEmpty(_key) || 
			this.arrKeys==null || !this.utils.isArray(this.arrKeys) ||
			this.arrValues==null || !this.utils.isArray(this.arrValues)) {
			return _retVal;
		}

		//get the key's index
		_index = this.indexOf(_key);
		
		//set the return value
		if (_index>-1 && _index<this.arrValues.length) {
			_retVal = this.arrValues[_index];
		}
		
		//return the method's value
		return _retVal;
	};
	this.contains=function(_key) {
		//declare locals
		var _index = this.indexOf(_key);
		
		//return the method's value
		return (_index==-1 ? false : true);
	};
	this.put=function(_key,_value) {
		//declare locals
		var _index = -1;
		
		//check for a null key
		if (this.utils.isEmpty(_key)) {
			return;
		}
		
		//check if the key exists
		_index = this.indexOf(_key);
		if (_index==-1) {
			//put a new key in the map
			this.arrKeys.push(_key);
			this.arrValues.push(_value);
		}
		else if (_index<this.arrValues.length) {
			//update the key's value
			this.arrValues[_index] = _value;
		}
	};
	this.size=function() {
		//return the map's size
		return this.arrKeys.length;
	};
	this.getLastKey=function() {
		var _length = this.arrKeys.length;
		if (_length==0) {
			return null;
		}
		return this.arrKeys.slice(_length-1)[0];
	};
	this.getLastValue=function() {
		var _length = this.arrValues.length;
		if (_length==0) {
			return null;
		}
		return this.arrValues.slice(_length-1)[0];
	};
	this.remove=function(_key) {
		//declare locals
		var _index = this.indexOf(_key);
		var _value = null;
		
		//check if the key exists
		if (_index==-1) {
			return;
		}
		
		//get the value to be removed
		_value = this.arrValues[_index];
		
		//remove the element from the 2 arrays
		this.arrKeys.splice(_index,1);
		this.arrValues.splice(_index,1);
		
		//return the removed value
		return _value;
	};
};
};

if(typeof UiBase!=='function') {
/**
 * A UiBase UI component
 * @param _extendedConfig - An array containing the extended configuration options for this component.
 * @param _compConfig - An array containing the configuration options for this component.
 * @return A UiBase UI component
 */
function UiBase(_extendedConfig,_compConfig) {
	//declare component members
	this.utils = new Utils(); 
	this._extConfig = _extendedConfig; 
	this._userConfig = _compConfig; 
	this.config = {}; 
	this._containerHtmlTag = null;
	this._compHtml = null;
	this._initialized = false;
	this._isAutoId = false;
	this._DEFAULT_SIZE_UNITS = "px";
	
	//declare component methods
	this._initBase = function() {
		//check if the component was already initialize once
		if (this._initialized==true) {
			return;
		}
		
		//set the component's configuration
		this._setConfig();
		
		//reset the component's init flag
		this._initialized = true;
	};
	this._alignComponent = function(_compId,_alignTo,_alignment,_alignLeft) {
		//declare locals
		var _compObj = null;
		var _alignToComp = null;
		var _alignToTop = 0;
		var _alignToLeft = 0;
		var _alignToHeight = 0;
		var _alignToWidth = 0;
		var _compTop = 0;
		var _compLeft = 0;
		var _compHeight = 0;
		var _compWidth = 0;
		var _newTop = 0;
		var _newLeft = 0;
		var _winHeight = 0;
		var _winWidth = 0;
		var _debugMessage = null;
		
		//check for nulls
		if (this.utils.isEmpty(_compId) 
			|| this.utils.isEmpty(_alignTo) 
			|| this.utils.isEmpty(_alignment)) {
			return;
		}
		
		//check for valid components
		_compObj = document.getElementById(_compId);
		_alignToComp = document.getElementById(_alignTo);
		if (_compObj==null || _alignToComp==null) {
			return;
		}
		
		//init variables
		_winHeight = $(window).height();
		_winWidth = $(window).width();
		_alignToHeight = $("#"+_alignTo).height();
		_alignToWidth = $("#"+_alignTo).width();
		_alignToTop = $("#"+_alignTo).position().top;
		_alignToLeft = $("#"+_alignTo).position().left;
		_compHeight = $("#"+_compId).height();
		_compWidth = $("#"+_compId).width();
		_compTop = $("#"+_compId).position().top;
		_compLeft = $("#"+_compId).position().left;
		
		//render a debug message
		_debugMessage = "_alignComponent():";
		_debugMessage += "\n_alignTo=["+_alignTo+"]";
		_debugMessage += "\n_alignment=["+_alignment+"]";
		_debugMessage += "\n_lignToHeight=["+_alignToHeight+"]";
		_debugMessage += "\n_alignToWidth=["+_alignToWidth+"]";
		_debugMessage += "\n_alignToTop=["+_alignToTop+"]";
		_debugMessage += "\n_alignToLeft=["+_alignToLeft+"]";
		_debugMessage += "\n_compHeight=["+_compHeight+"]";
		_debugMessage += "\n_compWidth=["+_compWidth+"]";
		_debugMessage += "\n_compTop=["+_compTop+"]";
		_debugMessage += "\n_compLeft=["+_compLeft+"]";
		//alert(_debugMessage);
		
		//check the alignment
		switch (_alignment.toLowerCase()) {
			case "top":
				_newTop = _alignToTop - _compHeight;
				_newLeft = _alignToLeft;
				break;
			case "bottom":
				_newTop = _alignToTop + _alignToHeight;
				_newLeft = _alignToLeft;
				break;
			case "left":
				_newTop = _alignToTop;
				_newLeft = _alignToLeft - _compWidth;
				break;
			case "right":
				_newTop = _alignToTop;
				_newLeft = _alignToLeft + _alignToWidth;
				break;
			case "overlay":
				_newTop = _alignToTop;
				_newLeft = _alignToLeft;
				_compHeight = _alignToHeight;
				_compWidth = _alignToWidth;
				$("#"+_compId).css('height',_compHeight+"px");
				$("#"+_compId).css('width',_compWidth+"px");
				break;
		}

		//fix values if necessary
		if (_newLeft < 0) {
			_newLeft = 0;
		}
		if ((_newLeft+_compWidth) > _winWidth) {
			_newLeft = _winWidth - _compWidth;
		}
		if (_newTop < 0) {
			_newTop = 0;
		}
		if ((_newTop+_compHeight) > _winHeight) {
			_newTop = _winHeight - _compHeight;
		}
		
		//set the component's position
		$("#"+_compId).css('top',_newTop);
		if (_alignLeft==true) {
			$("#"+_compId).css('left',_newLeft);
		}
		$("#"+_compId).css('position',"absolute");
	};
	this._attachBaseEvents = function() {
		//attach the component's events
		this._attachEvent_onblur();
		this._attachEvent_onchange();
		this._attachEvent_onclick();
		this._attachEvent_ondblclick();
		this._attachEvent_onerror();
		this._attachEvent_onfocus();
		this._attachEvent_onkeydown();
		this._attachEvent_onkeypress();
		this._attachEvent_onkeyup();
		this._attachEvent_onload();
		this._attachEvent_onmousedown();
		this._attachEvent_onmousemove();
		this._attachEvent_onmouseout();
		this._attachEvent_onmouseover();
		this._attachEvent_onmouseup();
		this._attachEvent_onreset();
		this._attachEvent_onresize();
		this._attachEvent_onselect();
		this._attachEvent_onsubmit();
		this._attachEvent_onunload();
	};
	this._attachChildItemsEvents = function() {
		//declare locals
		var _config = this.config;
		var _items = null;
		var _currItem = null;
		
		//check for a null configuration
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//check for child items
		_items = this.config.items;
		if (_items==null || _items.length<1) {
			return;
		}
		
		//loop through the child items
		for (var i=0;i<_items.length;i++) {
			//get the current child item
			_currItem = _items[i];
			
			//check for nulls
			if (_currItem==null) {
				continue;
			}
			
			//open a try block
			try {
				//attach the current cvhild item's events
				_currItem._attachEvents();
			}
			catch(err){}
		}
	};
	this._attachEvent_onblur = function() {
		//declare locals
		var _config = this.config;
		var _fhEvent = null;
		var _eventHandlerType = null;
		var _compId = null;
		var _comp = null;
		var _isDisabled = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onblur;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (this.utils.isEmpty(_fhEvent)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (this.utils.isEmpty(_compId)) {
			return;
		}
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the disabled attribute value
		_isDisabled = _config.disabled;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_isDisabled)) {
			_isDisabled = false;
		}
		
		//attache the events
		_comp.onblur = function() {
			//check if the component is disabled
			if (_isDisabled==true) {
				return;
			}
	        //check the type of the event handler
	        if (_eventHandlerType=="function") {
	        	_fhEvent();
	        }
	        else if (_eventHandlerType=="string") {
	        	eval(_fhEvent);
	        }
		};
	};
	this._attachEvent_onchange = function() {
		//declare locals
		var _config = this.config;
		var _fhEvent = null;
		var _eventHandlerType = null;
		var _compId = null;
		var _comp = null;
		var _isDisabled = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onchange;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (this.utils.isEmpty(_fhEvent)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (this.utils.isEmpty(_compId)) {
			return;
		}
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the disabled attribute value
		_isDisabled = _config.disabled;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_isDisabled)) {
			_isDisabled = false;
		}
		
		//attache the events
		_comp.onchange = function() {
			//check if the component is disabled
			if (_isDisabled==true) {
				return;
			}
	        //check the type of the event handler
	        if (_eventHandlerType=="function") {
	        	_fhEvent();
	        }
	        else if (_eventHandlerType=="string") {
	        	eval(_fhEvent);
	        }
		};
	};
	this._attachEvent_onclick = function() {
		//declare locals
		var _config = this.config;
		var _fhEvent = null;
		var _eventHandlerType = null;
		var _compId = null;
		var _comp = null;
		var _isDisabled = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onclick;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (this.utils.isEmpty(_fhEvent)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (this.utils.isEmpty(_compId)) {
			return;
		}
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the disabled attribute value
		_isDisabled = _config.disabled;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_isDisabled)) {
			_isDisabled = false;
		}
		
		//attache the events
		_comp.onclick = function() {
			//check if the component is disabled
			if (_comp.disabled==true) {
				return;
			}
	        //check the type of the event handler
	        if (_eventHandlerType=="function") {
	        	_fhEvent();
	        }
	        else if (_eventHandlerType=="string") {
	        	eval(_fhEvent);
	        }
		};
	};
	this._attachEvent_ondblclick = function() {
		//declare locals
		var _config = this.config;
		var _fhEvent = null;
		var _eventHandlerType = null;
		var _compId = null;
		var _comp = null;
		var _isDisabled = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.ondblclick;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (this.utils.isEmpty(_fhEvent)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (this.utils.isEmpty(_compId)) {
			return;
		}
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the disabled attribute value
		_isDisabled = _config.disabled;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_isDisabled)) {
			_isDisabled = false;
		}
		
		//attache the events
		_comp.ondblclick = function() {
			//check if the component is disabled
			if (_isDisabled==true) {
				return;
			}
	        //check the type of the event handler
	        if (_eventHandlerType=="function") {
	        	_fhEvent();
	        }
	        else if (_eventHandlerType=="string") {
	        	eval(_fhEvent);
	        }
		};
	};
	this._attachEvent_onerror = function() {
		//declare locals
		var _config = this.config;
		var _fhEvent = null;
		var _eventHandlerType = null;
		var _compId = null;
		var _comp = null;
		var _isDisabled = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onerror;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (this.utils.isEmpty(_fhEvent)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (this.utils.isEmpty(_compId)) {
			return;
		}
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the disabled attribute value
		_isDisabled = _config.disabled;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_isDisabled)) {
			_isDisabled = false;
		}
		
		//attache the events
		_comp.onerror = function() {
			//check if the component is disabled
			if (_isDisabled==true) {
				return;
			}
	        //check the type of the event handler
	        if (_eventHandlerType=="function") {
	        	_fhEvent();
	        }
	        else if (_eventHandlerType=="string") {
	        	eval(_fhEvent);
	        }
		};
	};
	this._attachEvent_onfocus = function() {
		//declare locals
		var _config = this.config;
		var _fhEvent = null;
		var _eventHandlerType = null;
		var _compId = null;
		var _comp = null;
		var _isDisabled = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onfocus;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (this.utils.isEmpty(_fhEvent)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (this.utils.isEmpty(_compId)) {
			return;
		}
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the disabled attribute value
		_isDisabled = _config.disabled;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_isDisabled)) {
			_isDisabled = false;
		}
		
		//attache the events
		_comp.onfocus = function() {
			//check if the component is disabled
			if (_isDisabled==true) {
				return;
			}
	        //check the type of the event handler
	        if (_eventHandlerType=="function") {
	        	_fhEvent();
	        }
	        else if (_eventHandlerType=="string") {
	        	eval(_fhEvent);
	        }
		};
	};
	this._attachEvent_onkeydown = function() {
		//declare locals
		var _config = this.config;
		var _fhEvent = null;
		var _eventHandlerType = null;
		var _compId = null;
		var _comp = null;
		var _isDisabled = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onkeydown;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (this.utils.isEmpty(_fhEvent)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (this.utils.isEmpty(_compId)) {
			return;
		}
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the disabled attribute value
		_isDisabled = _config.disabled;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_isDisabled)) {
			_isDisabled = false;
		}
		
		//attache the events
		_comp.onkeydown = function() {
			//check if the component is disabled
			if (_isDisabled==true) {
				return;
			}
	        //check the type of the event handler
	        if (_eventHandlerType=="function") {
	        	_fhEvent();
	        }
	        else if (_eventHandlerType=="string") {
	        	eval(_fhEvent);
	        }
		};
	};
	this._attachEvent_onkeypress = function() {
		//declare locals
		var _config = this.config;
		var _fhEvent = null;
		var _eventHandlerType = null;
		var _compId = null;
		var _comp = null;
		var _isDisabled = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onkeypress;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (this.utils.isEmpty(_fhEvent)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (this.utils.isEmpty(_compId)) {
			return;
		}
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the disabled attribute value
		_isDisabled = _config.disabled;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_isDisabled)) {
			_isDisabled = false;
		}
		
		//attache the events
		_comp.onkeypress = function() {
			//check if the component is disabled
			if (_isDisabled==true) {
				return;
			}
	        //check the type of the event handler
	        if (_eventHandlerType=="function") {
	        	_fhEvent();
	        }
	        else if (_eventHandlerType=="string") {
	        	eval(_fhEvent);
	        }
		};
	};
	this._attachEvent_onkeyup = function() {
		//declare locals
		var _config = this.config;
		var _fhEvent = null;
		var _eventHandlerType = null;
		var _compId = null;
		var _comp = null;
		var _isDisabled = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onkeyup;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (this.utils.isEmpty(_fhEvent)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (this.utils.isEmpty(_compId)) {
			return;
		}
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the disabled attribute value
		_isDisabled = _config.disabled;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_isDisabled)) {
			_isDisabled = false;
		}
		
		//attache the events
		_comp.onkeyup = function() {
			//check if the component is disabled
			if (_isDisabled==true) {
				return;
			}
	        //check the type of the event handler
	        if (_eventHandlerType=="function") {
	        	_fhEvent();
	        }
	        else if (_eventHandlerType=="string") {
	        	eval(_fhEvent);
	        }
		};
	};
	this._attachEvent_onload = function() {
		//declare locals
		var _config = this.config;
		var _fhEvent = null;
		var _eventHandlerType = null;
		var _compId = null;
		var _comp = null;
		var _isDisabled = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onload;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (this.utils.isEmpty(_fhEvent)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (this.utils.isEmpty(_compId)) {
			return;
		}
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the disabled attribute value
		_isDisabled = _config.disabled;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_isDisabled)) {
			_isDisabled = false;
		}
		
		//attache the events
		_comp.onload = function() {
			//check if the component is disabled
			if (_isDisabled==true) {
				return;
			}
	        //check the type of the event handler
	        if (_eventHandlerType=="function") {
	        	_fhEvent();
	        }
	        else if (_eventHandlerType=="string") {
	        	eval(_fhEvent);
	        }
		};
	};
	this._attachEvent_onmousedown = function() {
		//declare locals
		var _config = this.config;
		var _fhEvent = null;
		var _eventHandlerType = null;
		var _compId = null;
		var _comp = null;
		var _isDisabled = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onmousedown;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (this.utils.isEmpty(_fhEvent)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (this.utils.isEmpty(_compId)) {
			return;
		}
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the disabled attribute value
		_isDisabled = _config.disabled;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_isDisabled)) {
			_isDisabled = false;
		}
		
		//attache the events
		_comp.onmousedown = function() {
			//check if the component is disabled
			if (_isDisabled==true) {
				return;
			}
	        //check the type of the event handler
	        if (_eventHandlerType=="function") {
	        	_fhEvent();
	        }
	        else if (_eventHandlerType=="string") {
	        	eval(_fhEvent);
	        }
		};
	};
	this._attachEvent_onmousemove = function() {
		//declare locals
		var _config = this.config;
		var _fhEvent = null;
		var _eventHandlerType = null;
		var _compId = null;
		var _comp = null;
		var _isDisabled = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onmousemove;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (this.utils.isEmpty(_fhEvent)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (this.utils.isEmpty(_compId)) {
			return;
		}
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the disabled attribute value
		_isDisabled = _config.disabled;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_isDisabled)) {
			_isDisabled = false;
		}
		
		//attache the events
		_comp.onmousemove = function() {
			//check if the component is disabled
			if (_isDisabled==true) {
				return;
			}
	        //check the type of the event handler
	        if (_eventHandlerType=="function") {
	        	_fhEvent();
	        }
	        else if (_eventHandlerType=="string") {
	        	eval(_fhEvent);
	        }
		};
	};
	this._attachEvent_onmouseout = function() {
		//declare locals
		var _config = this.config;
		var _fhEvent = null;
		var _eventHandlerType = null;
		var _compId = null;
		var _comp = null;
		var _isDisabled = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onmouseout;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (this.utils.isEmpty(_fhEvent)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (this.utils.isEmpty(_compId)) {
			return;
		}
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the disabled attribute value
		_isDisabled = _config.disabled;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_isDisabled)) {
			_isDisabled = false;
		}
		
		//attache the events
		_comp.onmouseout = function() {
			//check if the component is disabled
			if (_isDisabled==true) {
				return;
			}
	        //check the type of the event handler
	        if (_eventHandlerType=="function") {
	        	_fhEvent();
	        }
	        else if (_eventHandlerType=="string") {
	        	eval(_fhEvent);
	        }
		};
	};
	this._attachEvent_onmouseover = function() {
		//declare locals
		var _config = this.config;
		var _fhEvent = null;
		var _eventHandlerType = null;
		var _compId = null;
		var _comp = null;
		var _isDisabled = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onmouseover;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (this.utils.isEmpty(_fhEvent)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (this.utils.isEmpty(_compId)) {
			return;
		}
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the disabled attribute value
		_isDisabled = _config.disabled;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_isDisabled)) {
			_isDisabled = false;
		}
		
		//attache the events
		_comp.onmouseover = function() {
			//check if the component is disabled
			if (_isDisabled==true) {
				return;
			}
	        //check the type of the event handler
	        if (_eventHandlerType=="function") {
	        	_fhEvent();
	        }
	        else if (_eventHandlerType=="string") {
	        	eval(_fhEvent);
	        }
		};
	};
	this._attachEvent_onmouseup = function() {
		//declare locals
		var _config = this.config;
		var _fhEvent = null;
		var _eventHandlerType = null;
		var _compId = null;
		var _comp = null;
		var _isDisabled = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onmouseup;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (this.utils.isEmpty(_fhEvent)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (this.utils.isEmpty(_compId)) {
			return;
		}
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the disabled attribute value
		_isDisabled = _config.disabled;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_isDisabled)) {
			_isDisabled = false;
		}
		
		//attache the events
		_comp.onmouseup = function() {
			//check if the component is disabled
			if (_isDisabled==true) {
				return;
			}
	        //check the type of the event handler
	        if (_eventHandlerType=="function") {
	        	_fhEvent();
	        }
	        else if (_eventHandlerType=="string") {
	        	eval(_fhEvent);
	        }
		};
	};
	this._attachEvent_onreset = function() {
		//declare locals
		var _config = this.config;
		var _fhEvent = null;
		var _eventHandlerType = null;
		var _compId = null;
		var _comp = null;
		var _isDisabled = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onreset;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (this.utils.isEmpty(_fhEvent)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (this.utils.isEmpty(_compId)) {
			return;
		}
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the disabled attribute value
		_isDisabled = _config.disabled;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_isDisabled)) {
			_isDisabled = false;
		}
		
		//attache the events
		_comp.onreset = function() {
			//check if the component is disabled
			if (_isDisabled==true) {
				return;
			}
	        //check the type of the event handler
	        if (_eventHandlerType=="function") {
	        	_fhEvent();
	        }
	        else if (_eventHandlerType=="string") {
	        	eval(_fhEvent);
	        }
		};
	};
	this._attachEvent_onresize = function() {
		//declare locals
		var _config = this.config;
		var _fhEvent = null;
		var _eventHandlerType = null;
		var _compId = null;
		var _comp = null;
		var _isDisabled = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onresize;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (this.utils.isEmpty(_fhEvent)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (this.utils.isEmpty(_compId)) {
			return;
		}
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the disabled attribute value
		_isDisabled = _config.disabled;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_isDisabled)) {
			_isDisabled = false;
		}
		
		//attache the events
		_comp.onresize = function() {
			//check if the component is disabled
			if (_isDisabled==true) {
				return;
			}
	        //check the type of the event handler
	        if (_eventHandlerType=="function") {
	        	_fhEvent();
	        }
	        else if (_eventHandlerType=="string") {
	        	eval(_fhEvent);
	        }
		};
	};
	this._attachEvent_onselect = function() {
		//declare locals
		var _config = this.config;
		var _fhEvent = null;
		var _eventHandlerType = null;
		var _compId = null;
		var _comp = null;
		var _isDisabled = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onselect;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (this.utils.isEmpty(_fhEvent)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (this.utils.isEmpty(_compId)) {
			return;
		}
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the disabled attribute value
		_isDisabled = _config.disabled;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_isDisabled)) {
			_isDisabled = false;
		}
		
		//attache the events
		_comp.onselect = function() {
			//check if the component is disabled
			if (_isDisabled==true) {
				return;
			}
	        //check the type of the event handler
	        if (_eventHandlerType=="function") {
	        	_fhEvent();
	        }
	        else if (_eventHandlerType=="string") {
	        	eval(_fhEvent);
	        }
		};
	};
	this._attachEvent_onsubmit = function() {
		//declare locals
		var _config = this.config;
		var _fhEvent = null;
		var _eventHandlerType = null;
		var _compId = null;
		var _comp = null;
		var _isDisabled = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onsubmit;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (this.utils.isEmpty(_fhEvent)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (this.utils.isEmpty(_compId)) {
			return;
		}
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the disabled attribute value
		_isDisabled = _config.disabled;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_isDisabled)) {
			_isDisabled = false;
		}
		
		//attache the events
		_comp.onsubmit = function() {
			//check if the component is disabled
			if (_isDisabled==true) {
				return;
			}
	        //check the type of the event handler
	        if (_eventHandlerType=="function") {
	        	_fhEvent();
	        }
	        else if (_eventHandlerType=="string") {
	        	eval(_fhEvent);
	        }
		};
	};
	this._attachEvent_onunload = function() {
		//declare locals
		var _config = this.config;
		var _fhEvent = null;
		var _eventHandlerType = null;
		var _compId = null;
		var _comp = null;
		var _isDisabled = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onunload;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (this.utils.isEmpty(_fhEvent)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (this.utils.isEmpty(_compId)) {
			return;
		}
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the disabled attribute value
		_isDisabled = _config.disabled;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_isDisabled)) {
			_isDisabled = false;
		}
		
		//attache the events
		_comp.onunload = function() {
			//check if the component is disabled
			if (_isDisabled==true) {
				return;
			}
	        //check the type of the event handler
	        if (_eventHandlerType=="function") {
	        	_fhEvent();
	        }
	        else if (_eventHandlerType=="string") {
	        	eval(_fhEvent);
	        }
		};
	};
	this._attachMouseOverEvents = function() {
		//declare locals
		var _uibase = this;
		var _config = this.config;
		var _compId = null;
		var _comp = null;
		var _icon = null;
		var _iconHover = null;
		var _hasText = false;
		var _isDisabled = null;
		var _fhOverComp = null;
		var _fhOutComp = null;
		var _fhOverCustom = null;
		var _fhOutCustom = null;
		var _classNameHover = null;
		var _textStyleClassHover = null;
		
		//check for nulls
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//get the component's properties
		_icon = _config.icon;
		_iconHover = _config.iconHover;
		_hasText = (_config.text=="" ? false : true);
		_classNameHover = _config.classNameHover;
		_textStyleClassHover = _config.textStyleClassHover;
		_isDisabled = _config.disabled;
		_fhOverComp = _config.onmouseover;
		_fhOutComp = _config.onmouseout;
		
		//set custom event handlers
		_fhOverCustom = this._compMouseOver;
		_fhOutCustom = this._compMouseOut;
		
		//attache the events
		_comp.onmouseover = function() {
			//check if the component is disabled
			if (_uibase.isDisabled(_compId)) {
				return;
			}
			
			//invoke the custom function handler first
			_fhOverCustom(_compId,_iconHover,_hasText,_classNameHover,_textStyleClassHover);
			
			//invoke the component's function handler
			if (_fhOverComp!=null && _fhOverComp!="undefined") {
				if (typeof _fhOverComp=="function") {
					_fhOverComp();
				}
				else if (typeof _fhOverComp=="string") {
					eval(_fhOverComp);
				}
			}
		};			
		_comp.onmouseout = function() {
			//check if the component is disabled
			if (_uibase.isDisabled(_compId)) {
				return;
			}
			
			//invoke the custom function handler first
			_fhOutCustom(_compId,_icon,_hasText,_classNameHover,_textStyleClassHover);
			
			//invoke the component's function handler
			if (_fhOutComp!=null && _fhOutComp!="undefined") {
				if (typeof _fhOutComp=="function") {
					_fhOutComp();
				}
				else if (typeof _fhOutComp=="string") {
					eval(_fhOutComp);
				}
			}
		};			
	};
	this._centerComponent = function(_compId,_renderTo) {
		//declare locals
		var _compObj = null;
		var _winHeight = null;
		var _winWidth = null;
		var _compHeight = null;
		var _compWidth = null;
		var _compLeft = null;
		var _compTop = null;
		
		//check for nulls
		if (this.utils.isEmpty(_compId)) {
			return;
		}
		
		//check for a valid component
		_compObj = document.getElementById(_compId);
		if (_compObj==null) {
			return;
		}
		
		//initialize values
		_winHeight = $(window).height();
		_winWidth = $(window).width();
		_compHeight = $("#"+_compId).height();
		_compWidth = $("#"+_compId).width();
		_compLeft = (_winWidth-_compWidth)/2;
		_compTop = (_winHeight-_compHeight)/2;
		
		//check for a renderTo attribute
		if (!this.utils.isEmpty(_renderTo)) {
			//check for a valid component
			_compObj = document.getElementById(_renderTo);
			if (_compObj!=null) {
				_compId = _renderTo;
			}
		}
		
		//center the component
		$("#"+_compId).css('position','absolute');
		$("#"+_compId).css('left',_compLeft+'px');
		$("#"+_compId).css('top',_compTop+'px');
	};
	this._compMouseOut = function(_compId,_icon,_hasText,_styleClassComp,_styleClassText) {
		//declare locals
		var _imgComp = null;
		var _textComp = null;
		var _utils = new Utils();
		
		//check for nulls
		if (_utils.isEmpty(_compId)) {
			return;
		}
		
		//add a new component style only if necessary
		if (!_utils.isEmpty(_styleClassComp)) {
			if ($("#"+_compId).hasClass(_styleClassComp)) {
				$("#"+_compId).removeClass(_styleClassComp);
			}
		}
		
		//set a new icon source if necessary
		if (!_utils.isEmpty(_icon)) {
			_imgComp = document.getElementById(_compId+"_icon");
			if (_imgComp!=null && _imgComp.src!=_icon) {
				_imgComp.src=_icon;
			}
		}
		
		//set the text's style if necessary
		if (_hasText==true) {
			_textComp = document.getElementById(_compId+"_text");
			if (_textComp!=null) {
				if (!_utils.isEmpty(_styleClassComp)) {
					if ($("#"+_compId+"_text").hasClass(_styleClassText)) {
						$("#"+_compId+"_text").removeClass(_styleClassText);
					}
				}
			}
		}
	};
	this._compMouseOver = function(_compId,_iconHover,_hasText,_styleClassComp,_styleClassText) {
		//declare locals
		var _imgComp = null;
		var _textComp = null;
		var _utils = new Utils();
		
		//check for nulls
		if (_utils.isEmpty(_compId)) {
			return;
		}
		
		//add a new component style only if necessary
		if (!_utils.isEmpty(_styleClassComp)) {
			if (!$("#"+_compId).hasClass(_styleClassComp)) {
				$("#"+_compId).addClass(_styleClassComp);
			}
		}
		
		//set a new icon source if necessary
		if (!_utils.isEmpty(_iconHover)) {
			_imgComp = document.getElementById(_compId+"_icon");
			if (_imgComp!=null && _imgComp.src!=_iconHover) {
				_imgComp.src=_iconHover;
			}
		}
		
		//set the text's style if necessary
		if (_hasText==true) {
			_textComp = document.getElementById(_compId+"_text");
			if (_textComp!=null) {
				if (!_utils.isEmpty(_styleClassComp)) {
					if (!$("#"+_compId+"_text").hasClass(_styleClassText)) {
						$("#"+_compId+"_text").addClass(_styleClassText);
					}
				}
			}
		}
	};
	this._generateAutoId = function(_tagName,_compName) {
		//declare locals
		var _config = this.config;
		
		//check for nulls
		if (this.utils.isEmpty(_tagName) || this.utils.isEmpty(_compName)) {
			return "";
		}
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return "";
		}
		
		//set the component's id
		if (this.utils.isEmpty(_config.id)) {
			//generate an auto id
			this.config.id = _compName+(document.getElementsByName(_tagName).length+1);
			this._isAutoId = true;
		}
		
		//return the method's value
		return this.config.id;
	};
	this._generateHtmlBase = function(_tagName,_compName) {
		//declare locals
		var _html = "";
		var _htmlInner = "";
		var _config = this.config;
		//var _roundBordersStyle = "";
		
		//check for nulls
		if (this.utils.isEmpty(_tagName) || this.utils.isEmpty(_compName)) {
			return "";
		}
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return "";
		}
		
		//render roundBorders
		this._generateHtmlRoundBordersTop();
		this._generateHtmlRoundBordersBottom();
		
		//start rendering the html tag
		this._containerHtmlTag = this._generateHtmlTag(_tagName,_compName);
		_html = this._containerHtmlTag;
		
		//render the icon and text
		_htmlInner += this._generateHtmlIconText();
		
		//render the inner HTML of the component
		if (!this._isEmptyConfig("html")) {
			_htmlInner += _config.html;
		}
		
		//render the HTML for the child items
		_htmlInner += this._generateBaseItemsHtml(_config);
		
		//finish rendering the component
		_html += _htmlInner + '</'+_tagName+'>';
		
		//save the html
		this._compHtml = _htmlInner;
		
		//return the method's value
		return _html;
	};
	this._generateHtmlIconText = function() {
		//declare locals
		var _DEFAULT_ICON_POSITION = "left";
		var _config = this.config;
		var _html = "";
		var _iconPosition = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return "";
		}
		
		//get the iconPosition attribute
		_iconPosition = _config.iconPosition;
		
		//set defaults if necesaary
		if (!this._isValidPosition(_iconPosition)) {
			_iconPosition = _DEFAULT_ICON_POSITION;
		}
		
		//render the inner HTML of the component
		if (this.utils.isEmpty(_config.icon) && this.utils.isEmpty(_config.iconClass) && this.utils.isEmpty(_config.text)) {
			return "";
		}
	
		if (this.utils.isEmpty(_config.icon) && this.utils.isEmpty(_config.iconClass)) {
			//check for a text
			if (!this.utils.isEmpty(_config.text)) {
				_html += this._renderTextCell();
			}
		}
		else {
			//check for a text
			if (!this.utils.isEmpty(_config.text)) {
				_html += '<table align="center" class="iconTextTable" cellspacing="0" cellpadding="0">';
				switch (_iconPosition.toLowerCase()) {
					case "top":
						_html += "<tr>";
						_html += "<td class=\"iconCell\">";
						_html += this._renderIconCell();
						_html += "</td>";
						_html += "</tr>";
						_html += "<tr>";
						_html += "<td class=\"textCell\">";
						_html += this._renderTextCell();
						_html += "</td>";
						_html += "</tr>";
						break;
					case "bottom":
						_html += "<tr>";
						_html += "<td class=\"textCell\">";
						_html += this._renderTextCell();
						_html += "</td>";
						_html += "</tr>";
						_html += "<tr>";
						_html += "<td class=\"iconCell\">";
						_html += this._renderIconCell();
						_html += "</td>";
						_html += "</tr>";
						break;
					case "left":
						_html += "<tr>";
						_html += "<td class=\"iconCell\">";
						_html += this._renderIconCell();
						_html += "</td>";
						_html += "<td class=\"textCell\">";
						_html += this._renderTextCell();
						_html += "</td>";
						_html += "</tr>";
						break;
					case "right":
						_html += "<tr>";
						_html += "<td class=\"textCell\">";
						_html += this._renderTextCell();
						_html += "</td>";
						_html += "<td class=\"iconCell\">";
						_html += this._renderIconCell();
						_html += "</td>";
						_html += "</tr>";
						break;
				}
				_html += '</table>';
			}
			else {
				_html += this._renderIconCell();
			}
		}
		
		//return the method's value
		return _html;
	};
	this._generateHtmlTagRoundBordersByIndex = function(_index,_left,_right) {
		//declare locals
		var _html = "";
		
		//check for a left and right borders
		if (_left==true && _right==true) {
			_html += '<span class="roundBorder" style="margin-left:'+_index+'px;margin-right:'+_index+'px;"></span>';
		}
		else if (_left==true) {
			_html += '<span class="roundBorder" style="margin-left:'+_index+'px;margin-right:0px;"></span>';
		}
		else if (_right==true) {
			_html += '<span class="roundBorder" style="margin-left:0px;margin-right:'+_index+'px;"></span>';
		}
		
		//return the method's value
		return _html;
	};
	this._generateHtmlTagRoundBorders = function(_top,_left,_right) {
		//declare locals
		var _style = this.config.style;
		var _TOP_LEFT_BORDER = "border-top-left-radius:3px;";
		var _TOP_RIGHT_BORDER = "border-top-right-radius:3px;";
		var _BOTTOM_LEFT_BORDER = "border-bottom-left-radius:3px;";
		var _BOTTOM_RIGHT_BORDER = "border-bottom-right-radius:3px;";
		var _minMargin = 0;
		var _maxMargin = 5;
		var _currIndex = -1;
		var _html = "";
		
		//check for a _top border
		if (_top==true) {
			//loop through the margins
			for (var i=_maxMargin;i>_minMargin;--i) {
				if (i==4) {
					continue;
				}
				//generate the current index's html
				_currIndex = i;
				_html += this._generateHtmlTagRoundBordersByIndex(_currIndex,_left,_right);
			}
		}
		else {
			for (var i=(_minMargin+1);i<(_maxMargin+1);i++) {
				if (i==4) {
					continue;
				}
				//generate the current index's html
				_currIndex = i;
				_html += this._generateHtmlTagRoundBordersByIndex(_currIndex,_left,_right);
			}
		}
		
		//check for a null style
		if (this.utils.isEmpty(_style)) {
			_style = " ";
		}
		
		//check for a top border
		if (_top==true) {
			//check for a left border
			if (_left==true) {
				if (_style.toLowerCase().indexOf(_TOP_LEFT_BORDER)==-1) {
					_style += _TOP_LEFT_BORDER;
				}
			}
			else {
				if (_style.toLowerCase().indexOf(_TOP_LEFT_BORDER)!=-1) {
					_style.replace(_TOP_LEFT_BORDER,"");
				}
			}
			//check for a right border
			if (_right==true) {
				if (_style.toLowerCase().indexOf(_TOP_RIGHT_BORDER)==-1) {
					_style += _TOP_RIGHT_BORDER;
				}
			}
			else {
				if (_style.toLowerCase().indexOf(_TOP_RIGHT_BORDER)!=-1) {
					_style.replace(_TOP_RIGHT_BORDER,"");
				}
			}
		}
		else {
			//check for a left border
			if (_left==true) {
				if (_style.toLowerCase().indexOf(_BOTTOM_LEFT_BORDER)==-1) {
					_style += _BOTTOM_LEFT_BORDER;
				}
			}
			else {
				if (_style.toLowerCase().indexOf(_BOTTOM_LEFT_BORDER)!=-1) {
					_style.replace(_BOTTOM_LEFT_BORDER,"");
				}
			}
			//check for a right border
			if (_right==true) {
				if (_style.toLowerCase().indexOf(_BOTTOM_RIGHT_BORDER)==-1) {
					_style += _BOTTOM_RIGHT_BORDER;
				}
			}
			else {
				if (_style.toLowerCase().indexOf(_BOTTOM_RIGHT_BORDER)!=-1) {
					_style.replace(_BOTTOM_RIGHT_BORDER,"");
				}
			}
		}
		
		//update the style
		this.config.style = _style;
		_html = "";
		
		//return the method's value
		return _html;
	};
	this._hasBorder = function(_borders,_border) {
		//declare locals
		var _currItem = null;
		var _retVal = false;
		
		//check for null
		if (!this.utils.isArray(_borders) || _borders.length<1 || this.utils.isEmpty(_border)) {
			return false;
		}
		
		//loop through the array
		for (var i=0;i<_borders.length;i++) {
			//get the current item
			_currItem = _borders[i];
			
			//check for a top left border
			if (_currItem.toLowerCase()=="all" || _currItem.toLowerCase()==_border.toLowerCase()) {
				_retVal = true;
				break;
			}
		}
		
		//return the method's value
		return _retVal;
	};
	this._generateHtmlRoundBordersTop = function() {
		//declare locals
		var _component = this;
		var _borders = null;
		var _borderLeft = false;
		var _borderRight = false;
		var _hasTop = false;
		var _hasLeft = false;
		var _hasRight = false;
		var _top = true;
		var _html = "";
		
		//get the component's round borders array
		_borders = this._getComponentRoundBordersArray(_component);
		
		//check for nulls
		if (this.utils.isEmpty(_borders)) {
			return "";
		}
		
		//get the top left, and top right borders if they exist
		_borderLeft = this._hasBorder(_borders,"tl");
		_borderRight = this._hasBorder(_borders,"tr");
		_hasTop = this._hasBorder(_borders,"top");
		_hasLeft = this._hasBorder(_borders,"left");
		_hasRight = this._hasBorder(_borders,"right");
		if (_hasLeft==true) {
			_borderLeft = true;
		}
		if (_hasRight==true) {
			_borderRight = true;
		}
		if (_hasTop==true) {
			_borderRight = true;
			_borderLeft = true;
		}
		
		//generate the html
		_html = this._generateHtmlTagRoundBorders(_top,_borderLeft,_borderRight);
		
		//return the method's value
		return _html;
	};
	this._generateHtmlRoundBordersBottom = function() {
		//declare locals
		var _component = this;
		var _borders = null;
		var _borderLeft = false;
		var _borderRight = false;
		var _hasBottom = false;
		var _hasLeft = false;
		var _hasRight = false;
		var _top = false;
		var _html = "";
		
		//get the component's round borders array
		_borders = this._getComponentRoundBordersArray(_component);
		
		//check for nulls
		if (this.utils.isEmpty(_borders)) {
			return "";
		}
		
		//get the top left, and top right borders if they exist
		_borderLeft = this._hasBorder(_borders,"bl");
		_borderRight = this._hasBorder(_borders,"br");
		_hasBottom = this._hasBorder(_borders,"bottom");
		_hasLeft = this._hasBorder(_borders,"left");
		_hasRight = this._hasBorder(_borders,"right");
		if (_hasLeft==true) {
			_borderLeft = true;
		}
		if (_hasRight==true) {
			_borderRight = true;
		}
		if (_hasBottom==true) {
			_borderRight = true;
			_borderLeft = true;
		}
		
		//generate the html
		_html = this._generateHtmlTagRoundBorders(_top,_borderLeft,_borderRight);
		
		//return the method's value
		return _html;
	};
	this._generateHtmlTag = function(_tagName,_compName) {
		//declare locals
		var _html = "";
		var _config = this.config;
		var _style = this._getStyle();
		var _optName = null;
		var _optNameDisabled = null;
		var _optValue = null;
		var _optValueDisabled = null;
		var _optType = null;
		var _html4Attributes = null;
		var _renderAttribute = false;
		
		//check for nulls
		if (this.utils.isEmpty(_tagName) || this.utils.isEmpty(_compName)) {
			return "";
		}
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return "";
		}
		
		//get an array of HTML attributes
		_html4Attributes = this._getHtml4Attributes();
		
		//render the start tag
		_html += '<'+_tagName;
		
		//loop through the config options
	    for (var option in _config) {
	    	//check for an empty option
			if (this.utils.isEmpty(option)) {
				continue;
			}

			//check for invalid options
	        if (option.toLowerCase()=="align" 
	        	|| option.toLowerCase()=="float" 
	        	|| option.toLowerCase()=="height" 
        		|| option.toLowerCase()=="html" 
		        || option.toLowerCase()=="id" 
		        || option.toLowerCase()=="items" 
		        || option.toLowerCase()=="opacity" 
	        	|| option.toLowerCase()=="renderTo" 
		        || option.toLowerCase()=="style" 
		        || option.toLowerCase()=="width" ) {
	        	continue;
	        }
	        
	        //get the option's name, value, and type
	        _optName = option;
	        _optValue = _config[option];
	        _optType = typeof (_optValue);
	        
			//check for invalid options
			if (this.utils.isEmpty(_optValue) 
				|| _optValue==false 
				|| _optValue<=0 
				|| _optType=="function") {
				continue;
			}
	        
	        //set the render flag
	        _renderAttribute = false;
	        
	        //fix option name if necessary
	        if (_optName.toLowerCase()=="classname") {
	        	_optName = "class";
	        	if (_config.disabled==true) {
	        		_optNameDisabled = "classNameDisabled";
	        		_optValueDisabled = _config[_optNameDisabled];
	    	        if (!this.utils.isEmpty(_optValueDisabled)) {
	    	        	_optValue = _optValueDisabled;
	    	        }
	        	}
	        }
	        else if (_optName.toLowerCase()=="forid") {
	        	_optName = "for";
	        }
	        else if (_optName.toLowerCase()=="tooltip") {
	        	_optName = "title";
	        }
	        
	        //check the type of the config option
	        if (_optType=="boolean") {
	        	_optValue = _optName;
	        }
	        
	        //check if the attribute should be rendered
	        _renderAttribute = this._isInArray(_optName, _html4Attributes);
	        if (_renderAttribute==true) {
	        	//render the current configuration attribute
				if (_optValue!=null && _optValue!="undefined") {
					_html += ' '+_optName+'="'+_optValue+'"';
				}
	        }
	    }
		if (!this.utils.isEmpty(_style)) {
			_html += ' style="'+_style+'"';
		}
		
		//set the component's id
		if (this.utils.isEmpty(_config.id)) {
			//generate an auto id
			this._generateAutoId(_tagName, _compName);
		}
		
		//render the id attribute
		_html += ' id="'+this.config.id+'"';
		_html += ' name="'+this.config.id+'"';
		_html += '>';
		
		//return the method's value
		return _html;
	};
	this._generateBaseItemsHtml = function(_parentConfig) {
		//declare locals
		var _html = "";
		var _parentId = null;
		var _items = null;
		var _currItem = null;
		var _currItemFloat = null;
		var _parentSpacing = null;
		var _parentLayoutName = null;
		var _parentLayout = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_parentConfig)) {
			return "";
		}
		
		//check for child items
		_items = _parentConfig.items;
		if (_items==null || _items.length<1) {
			return "";
		}
		
		//get the parent id
		_parentId = _parentConfig.id;
		
		//get tyhe parent's config options
		_parentLayoutName = _parentConfig.layout;
		
		//check for an empty layout
		if (!this.utils.isEmpty(_parentLayoutName)) {
			//get the correct LayoutManager
			_parentLayout = this._getLayoutManager(_parentLayoutName);
			
			//add the items to the layout manager
			_parentLayout._uibase.config.items = _items;
			
			//render the items
			_html += _parentLayout._generateItemsHtml();
		}
		else {
			//loop through the child items
			for (var i=0;i<_items.length;i++) {
				//get the current child item
				_currItem = _items[i];
				
				//check for nulls
				if (_currItem==null) {
					continue;
				}
				
				//set the component's id
				if (this.utils.isEmpty(_currItem._uibase.config.id)) {
					if (!this.utils.isEmpty(_parentId)) {
						//generate an auto id
						_currItem._uibase.config.id = _parentId+_currItem._compName+i;
					}
				}
				
				//generate a seperator if necessary
				if (i>0) {
					_currItemFloat = this._getComponentFloat(_currItem._uibase.config.float);
					if (_currItemFloat.toLowerCase()=="left" || _currItemFloat.toLowerCase()=="right") {
						//add a horizontal spacer
						_parentSpacing = this._getComponentCellspacing(_parentConfig.cellspacing);
						_html += '<div style="float:left;height:1px;width:'+_parentSpacing+'px;"></div>';
					}
				}
				
				//generate the current item's html
				_html += _currItem._generateHtml();
			}
		}
		
		//return the method's value
		return _html;
	};
	this._getLayoutManager=function(_layout) {
		//declare locals
		var _layoutManager = null;
		
		//check for nulls
		if (this.utils.isEmpty(_layout) || (typeof _layout!="string")) {
			return null;
		}
		
		//check the layout
		switch (_layout.toLowerCase()) {
			case "horizontal":
				_layoutManager = new HorizontalLayout({});
				break;
			case "vertical":
				_layoutManager = new VerticalLayout({});
				break;
		}
		
		//return the method's value
		return _layoutManager;
	};
	this._getBaseDefaultConfig = function() {
		//declare locals
		var _dc = {
			accessKey: ""
			,accept: ""
			,action: ""
			,align: ""
			,alignTo: ""
			,alt: ""
			,border: null
			,cellpadding: null
			,cellspacing: null
			,checked: false
			,className: ""
			,classNameHover: ""
			,classNameDisabled: ""
			,cols: null
			,coords: ""
			,dir: null
			,disabled: false
			,enctype: ""
			,float: null
			,forId: ""
			,height: null
			,href: ""
			,html: ""
			,icon: ""
			,iconClass: ""
			,iconClassHover: ""
			,iconClassDisabled: ""
			,iconDisabled: ""
			,iconHover: ""
			,iconPosition: "left"
			,id: ""
			,items: []
			,label: ""
			,layout: ""
			,maxlength: null
			,method: ""
			,multiple: false
			,readonly: false
			,region: ""
			,renderTo: ""
			,roundBorders: null
			,rows: null
			,rules: ""
			,selected: false
			,shape: ""
			,size: null
			,src: ""
			,style: ""
			,tabindex: null
			,target: ""
			,text: ""
			,textStyleClass: ""
			,textStyleClassHover: ""
			,textStyleClassDisabled: ""
			,type: ""
			,tooltip: ""
			,value: ""
			,width: null
			,onblur: null
			,onchange: null
			,onclick: null
			,ondblclick: null
			,onerror: null
			,onfocus: null
			,onkeydown: null
			,onkeypress: null
			,onkeyup: null
			,onload: null
			,onmousedown: null
			,onmousemove: null
			,onmouseout: null
			,onmouseover: null
			,onmouseup: null
			,onreset: null
			,onresize: null
			,onselect: null
			,onsubmit: null
			,onunload: null
		};
		
		//return the method's value
		return _dc;
	};
	this._getComponentAlignment = function(_value) {
		//declare locals
		var _compValue = null;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_value)) {
			_compValue = "left";
			return _compValue;
		}
		
		//check the align
		switch (_value.toLowerCase()) {
			case "left":
			case "west":
				_compValue = "left";
				break;
			case "right":
			case "east":
				_compValue = "right";
				break;
			case "center":
			case "middle":
				_compValue = "center";
				break;
			case "overlay":
				_compValue = "overlay";
				break;
		}
		
		//set defaults if necessary
		if (_compValue==null) {
			_compValue = "left";
		}
		
		//return the method's value
		return _compValue;
	};
	this._getComponentCellspacing = function(_value) {
		//declare locals
		var _compValue = null;
		
		//get the numeric value 
		_compValue = this._getNumericValue(_value);
		
		//return the method's value
		return _compValue;
	};
	this._getComponentFloat = function(_value) {
		//declare locals
		var _compValue = null;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_value)) {
			_compValue = "none";
			return _compValue;
		}
		
		//check the align
		switch (_value.toLowerCase()) {
			case "left":
				_compValue = "left";
				break;
			case "right":
				_compValue = "right";
				break;
			case "none":
				_compValue = "none";
				break;
		}
		
		//set defaults if necessary
		if (_compValue==null) {
			_compValue = "none";
		}
		
		//return the method's value
		return _compValue;
	};
	this._getComponentOpacity = function(_value) {
		//declare locals
		var _compValue = null;
		var _intValue = null;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_value)) {
			return null;
		}
		
		//check for a floating point
		if (typeof _value=="string") {
			if (!isNaN(_value)) {
				_intValue = parseFloat(_value);
			}
		}
		else if (typeof _value=="number") {
			_intValue = _value;
		}
		else {
			_compValue = null;
		}
		
		//check for a numeric type
		if (_intValue!=null) {
			//check for valid values
			if (_intValue<0 || _intValue>100) {
				_compValue = null;
			}
			else {
				if (_intValue>1) {
					_intValue = parseFloat(_intValue/100);
				}
				_compValue = String(_intValue);
			}
		}
		
		//return the method's value
		return _compValue;
	};
	this._getComponentRoundBordersArray = function(_component) {
		//declare locals
		var _compConfig = null;
		var _configValue = null;
		var _configValueDelimiter = ",";
		var _arrValues = null;
		var _compValues = new Array();
		
		//check for nulls
		if (this.utils.isEmpty(_component)) {
			return null;
		}
		
		//get the component's configuration
		_compConfig = _component.config;
		
		//check for nulls
		if (this.utils.isEmpty(_compConfig)) {
			return null;
		}
		
		//get the configuration option
		_configValue = _compConfig.roundBorders;
		
		//check for nulls
		if (this.utils.isEmpty(_configValue)) {
			return null;
		}
		
		//check for an array or string types
		if (typeof _configValue!="string" && !this.utils.isArray(_configValue)) {
			return null;
		}
		
		//check for a string
		if (typeof _configValue=="string") {
			//check for a delimiter
			if (_configValue.indexOf(_configValueDelimiter)==-1) {
				_arrValues = new Array (_configValue);
			}
			else {
				_arrValues = _configValue.split(_configValueDelimiter);
			}
		}
		else {
			_arrValues = _configValue;
		}
		
		//loop through the array
		for (var i=0;i<_arrValues.length;i++) {
			//get the current item's value
			_compValues.push(this._getComponentRoundBorder(_arrValues[i]));
		}
		
		//return the method's value
		return _compValues;
	};
	this._getComponentRoundBorder = function(_value) {
		//declare locals
		var _compValue = null;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_value)) {
			_compValue = "none";
			return _compValue;
		}
		
		//check the align
		switch (_value.toLowerCase()) {
			case "all":
				_compValue = "all";
				break;
			case "topleft":
			case "top-left":
			case "tl":
			case "t-l":
			case "northwest":
			case "north-west":
			case "nw":
			case "n-w":
				_compValue = "tl";
				break;
			case "topright":
			case "top-right":
			case "tr":
			case "t-r":
			case "northeast":
			case "north-east":
			case "ne":
			case "n-e":
				_compValue = "tr";
				break;
			case "bottomleft":
			case "bottom-left":
			case "bl":
			case "b-l":
			case "southwest":
			case "south-west":
			case "sw":
			case "s-w":
				_compValue = "bl";
				break;
			case "bottomright":
			case "bottom-right":
			case "br":
			case "b-r":
			case "southeast":
			case "south-east":
			case "se":
			case "s-e":
				_compValue = "br";
				break;
			case "top":
				_compValue = "top";
				break;
			case "bottom":
				_compValue = "bottom";
				break;
			case "left":
				_compValue = "left";
				break;
			case "right":
				_compValue = "right";
				break;
		}
		
		//set defaults if necessary
		if (_compValue==null) {
			_compValue = "none";
		}
		
		//return the method's value
		return _compValue;
	};
	this._getHtml4Attributes = function() {
		//declare locals
		var _array = null;
		
		//create an array of attributes
		_array = new Array(
			"accessKey"
			,"accept"
			,"action"
			,"alt"
			,"border"
			,"cellpadding"
			,"cellspacing"
			,"checked"
			,"class"
			,"cols"
			,"coords"
			,"dir"
			,"disabled"
			,"enctype"
			,"for"
			,"href"
			,"id"
			,"label"
			,"maxlength"
			,"method"
			,"multiple"
			,"readonly"
			,"rows"
			,"rules"
			,"selected"
			,"shape"
			,"size"
			,"src"
			,"style"
			,"tabindex"
			,"target"
			,"type"
			,"title"
			,"value"
		);
		
		//return the method's value
		return _array;
	};
	this._getNumericValue = function(_value) {
		//declare locals
		var _retNum = this.utils.parseNumber(_value);
		
		//return the method's value
		return _retNum;
	};
	this._getSizeValue = function(_sizeValue) {
		//declare locals
		var _numSize = this.utils.parseNumber(_sizeValue);
		var _strSize = null;
		
		//check for nulls
		if (_numSize==0) {
			return null;
		}
		
		//set the return value
		_strSize = _sizeValue;
		
		//check for a numeric value
		if (!isNaN(_strSize)) {
			_strSize = String(_strSize);
		}
		
		//check for a valid size suffix
		if (_strSize.toLowerCase().indexOf("em")==-1 && _strSize.toLowerCase().indexOf("ex")==-1
			&& _strSize.toLowerCase().indexOf("px")==-1 && _strSize.toLowerCase().indexOf("in")==-1
			&& _strSize.toLowerCase().indexOf("cm")==-1 && _strSize.toLowerCase().indexOf("mm")==-1
			&& _strSize.toLowerCase().indexOf("pt")==-1 && _strSize.toLowerCase().indexOf("pc")==-1
			&& _strSize.indexOf("%")==-1) {
			_strSize += this._DEFAULT_SIZE_UNITS;
		}
		
		//return the method's value
		return _strSize;
	};
	this._getStyle = function() {
		//declare locals
		var _config = this.config;
		var _strAlign = null;
		var _strFloat = null;
		var _strHeight = null;
		var _strOpacity = null;
		var _intOpacity = null;
		var _strWidth = null;
		var _style = "";
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return "";
		}
		
		//check the width, and height's prefix
		if (!this.utils.isEmpty(_config.align)) {
			_strAlign = this._getComponentAlignment(_config.align);
		}
		if (!this.utils.isEmpty(_config.float)) {
			_strFloat = this._getComponentFloat(_config.float);
		}
		_strOpacity = this._getComponentOpacity(_config.opacity);
		if (!this.utils.isEmpty(_config.height)) {
			_strHeight = this._getSizeValue(_config.height);
		}
		if (!this.utils.isEmpty(_config.width)) {
			_strWidth = this._getSizeValue(_config.width);
		}
		
		//check for nulls
		if (!this.utils.isEmpty(_strAlign)) {
			if (_strAlign.toLowerCase()!="overlay") {
				_style += 'text-align:'+_strAlign+';';
			}
		}
		if (!this.utils.isEmpty(_strFloat)) {
			_style += 'float:'+_strFloat+';';
		}
		if (!this.utils.isEmpty(_strHeight)) {
			_style += 'height:'+_strHeight+';';
		}
		if (!this.utils.isEmpty(_strOpacity)) {
			_style += 'opacity:'+_strOpacity+';';
			_intOpacity = (parseFloat(_strOpacity))*100;
			_style += 'filter:Alpha(opacity='+_intOpacity+');';
		}
		if (!this.utils.isEmpty(_strWidth)) {
			_style += 'width:'+_strWidth+';';
		}
		if (!this.utils.isEmpty(_config.style)) {
			_style += _config.style;
		}
		
		//return the method's value
		return _style;
	};
	this._hasItems = function() {
		//declare locals
		var _retVal = false;
		var _config = this.config;
		var _items = null;
		
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return false;
		}
		
		//check for items
		_items = _config.items;
		_retVal = (_items==null || _items.length<1) ? false : true;
		
		//return the method's value
		return _retVal; 
	};
	this._isEmptyConfig = function(_configOptionName) {
		//declare locals
		var _config = this.config;
        var _configOptValue = null;
        
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return true;
		}
		
		//check for nulls
		if (this.utils.isEmpty(_configOptionName)) {
			return true;
		}
		
    	//get the current option's value
		_configOptValue = _config[_configOptionName];
    	
		//return the method's value
		return this.utils.isEmpty(_configOptValue);
	};
	this._isEmptyValue = function(_value) {
		//return the method's value
		return this.utils.isEmpty(_value);
	};
	this._isInArray = function(_item,_array) {
		//return the method's value
		return this.utils.isInArray(_item, _array);
	};
	this._isValidPosition = function(_position) {
		//declare locals
		var _retVal = true;
		
		//check for nulls
		if (this.utils.isEmpty(_position)) {
			return false;
		}
		
		//check for valid values
		if (_position.toLowerCase()!="left" 
			&& _position.toLowerCase()!="right" 
			&& _position.toLowerCase()!="top" 
			&& _position.toLowerCase()!="bottom" ) {
			return false;
		}
		
		//return the method's value
		return _retVal;
	};
	this._renderChildItems = function() {
		//declare locals
		var _config = this.config;
		var _items = null;
		var _currItem = null;
        
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//check for child items
		_items = _config.items;
		if (_items==null || _items.length<1) {
			return;
		}
	
		//loop through the child items
		for (var i=0;i<_items.length;i++) {
			//get the current child item
			_currItem = _items[i];
			
			//check for nulls
			if (_currItem==null) {
				continue;
			}
			
			//open a try block
			try {
				//invoke the current child item's render method
				_currItem._render();
			}
			catch(err){}
		}
	};
	this._renderHtml = function(_tagName,_compName) {
		//declare locals
		var _config = this.config;
		var _renderTo = null;
		var _compTag = null;
		var _fullHtml = null;
        
		//check for a configuration object
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//check for a valid id
		if (this.utils.isEmpty(_config.id)) {
			//generate an auto id
			this._generateAutoId(_tagName,_compName);			
		}
		
		//render the component into its container
		if (!this.utils.isEmpty(_config.renderTo)) {
			//get the container component
			_renderTo = document.getElementById(_config.renderTo);
			
			//add the tag's html to the component's html
			_fullHtml = this._containerHtmlTag;
			_fullHtml += this._compHtml;
			_fullHtml += '</'+_tagName+'>';
			this._compHtml = _fullHtml;
		}
		else {
			//check if the component already exists
			if (document.getElementById(_config.id)==null) {
				//create a new tag for the component
				_compTag = document.createElement(_tagName);
				_compTag.setAttribute("id",_config.id);
				_renderTo = document.getElementsByTagName("body")[0];
				_renderTo.appendChild(_compTag);
			}
			
			//update the component's tag attributes
			this._updateComponentAttributes();
			
			//get the container component
			_renderTo = document.getElementById(_config.id);
		}
		
		//check for nulls
		if (_renderTo!=null) {
			//render the html into the component
			_renderTo.innerHTML = this._compHtml;
		}
	};
	this._renderIconCell = function() {
		//declare locals
		var _html = "";
		var _iconClass = null;
		var _imgSrc = null;
		
		//check for nulls
		if (this._isEmptyConfig("icon") && this._isEmptyConfig("iconClass")) {
			return "";
		}
		
		//get the icon's className
		_iconClass = this.config.iconClass;
		
		//check if the component is disabled
		if (this.config.disabled==true) {
			//update the icon's className
			if (!this._isEmptyConfig("iconClassDisabled")) {
				_iconClass = this.config.iconClassDisabled;
			}
		}
		
		//start rendering the cell
		_html += '<div id="'+this.getIconId()+'_cl"';
		if (!this.utils.isEmpty(_iconClass)) {
			_html += 'class="'+_iconClass+'"';
		}
		_html += '>';
		
		//check for an icon
		if (!this._isEmptyConfig("icon")) {
			//check if the component is disabled
			if (this.config.disabled==true) {
				if (!this._isEmptyConfig("iconDisabled")) {
					_imgSrc = this.config.iconDisabled;
				}
				else {
					_imgSrc = this.config.icon;
				}
			}
			else {
				_imgSrc = this.config.icon;
			}
			
			//render the cell
			_html += '<img id="'+this.getIconId()+'" src="'+_imgSrc+'" />';
		}
		
		//end rendering the cell
		_html += '</div>';
		
		//return the method's value
		return _html;
	};
	this._renderTextCell = function() {
		//declare locals
		var _html = "";
		var _styleClass = null;
		
		//get the text's className
		_styleClass = this.config.textStyleClass;
		
		//check if the component is disabled
		if (this.config.disabled==true) {
			//update the text's className
			if (!this._isEmptyConfig("textStyleClassDisabled")) {
				_styleClass = this.config.textStyleClassDisabled;
			}
		}
		
		//render the cell
		_html += '<span id="'+this.getTextId()+'"';
		if (!this.utils.isEmpty(_styleClass)) {
			_html += 'class="'+_styleClass+'"';
		}
		_html += '>';
		_html += this.config.text;
		_html += '</span>';
		
		//return the method's value
		return _html;
	};
	this._setConfig = function() {
		//declare locals
		var _defaultConfig = this._getBaseDefaultConfig();
		var _extConfig = this._extConfig;
		var _userConfig = this._userConfig;
		var _dcValue = null;
		var _extValue = null;
		var _ucValue = null;
		
	    //check for an extendedConfig object
	    if (_defaultConfig!=null && _defaultConfig!="undefined") {
			//copy values from the defaultConfig to the configuration object
		    for (var dcOption in _defaultConfig) {
		    	//get the current option's value
		    	_dcValue = _defaultConfig[dcOption];
		    	
		    	//check for nulls
				if (this.utils.isEmpty(_dcValue)) {
		        	continue;
		        }
		        
		        //update the configuration object
		    	this.config[dcOption] = _dcValue;
		    }
	    }
	    
	    //check for an extendedConfig object
	    if (_extConfig!=null && _extConfig!="undefined") {
			//copy values from the extendedConfig to the configuration object 
		    for (var extOption in _extConfig) {
		    	//get the current option's value
		    	_extValue = _extConfig[extOption];
		    	
		    	//check for nulls
				if (this.utils.isEmpty(_extValue)) {
		        	continue;
		        }
		        
		        //update the configuration object
		    	this.config[extOption] = _extValue;
		    }
	    }
	    
	    //check for a userConfig object
	    if (_userConfig!=null && _userConfig!="undefined") {
			//copy values from the userConfig to the configuration object 
		    for (var userOption in _userConfig) {
		    	//get the current option's value
		    	_ucValue = _userConfig[userOption];
		    	
		    	//check for nulls
				if (this.utils.isEmpty(_ucValue)) {
		        	continue;
		        }
		        
		        //check if the current option exists in the configuration object
		        if (this.config[userOption]==null || this.config[userOption]=="undefined") {
		        	//update the configuration object
		        	this.config[userOption] = _ucValue;
		        }
		        else {
		        	//compare the values' types
		        	if (typeof (this.config[userOption]) == typeof (_ucValue)) {
			        	//update the configuration object
			        	this.config[userOption] = _ucValue;
		        	}
		        	else {
			        	//update the configuration object with the default value
			        	this.config[userOption] = _defaultConfig[userOption];
		        	}
		        }
		    }
	    }
	};
	this._updateComponentAttributes = function() {
		//declare locals
		var _config = this.config;
		var _compId = null;
		var _compObj = null;
		var _htmlAttributes = null;
		var _currHtmlAttribute = null;
		var _configOptName = null;
		var _configOptValue = null;
		var _compStyleClass = null;
		var _compStyleClassDisabled = null;
		var _currAttributeValue = null;
		
		//check for nulls
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//get the component by its id
		_compObj = document.getElementById(_compId);
		
		//check for nulls
		if (_compObj==null) {
			return;
		}
		
		//get the html attributes
		_htmlAttributes = this._getHtml4Attributes();
					
		//loop through the attributes
		for (var i=0;i<_htmlAttributes.length;i++) {
			//get the current attribute
			_currHtmlAttribute = _htmlAttributes[i];
			_configOptName = _currHtmlAttribute;
			
			//fix the attribute's name if necessary
			if (_currHtmlAttribute.toLowerCase()=="class") {
				_configOptName = "className";
				_compStyleClass = _config[_configOptName];
				if (_config.disabled==true) {
					_configOptName = "classNameDisabled";
					_compStyleClassDisabled = _config[_configOptName];
					if (!this.utils.isEmpty(_compStyleClassDisabled)) {
						_compStyleClass = _compStyleClassDisabled;
					}
				}
				continue;
			}
			if (_currHtmlAttribute.toLowerCase()=="for") {
				_configOptName = "forId";
			}
			if (_currHtmlAttribute.toLowerCase()=="title") {
				_configOptName = "tooltip";
			}
			
			//get the attribuute's configuration value
			_configOptValue = _config[_configOptName];
			if (_currHtmlAttribute.toLowerCase()=="style") {
				_configOptValue = this._getStyle();
			}
			
			//get the current attribute's value
			_currAttributeValue = $("#"+_compId).attr(_currHtmlAttribute);
			
			//check for nulls
			if (typeof _configOptValue == "boolean") {
				if (_configOptValue==false) {
					if (this.utils.isEmpty(_currAttributeValue)) {
						continue;
					}
					$("#"+_compId).removeAttr(_currHtmlAttribute);
					continue;
				}
				else {
					_configOptValue = _currHtmlAttribute;
				}
			}
			if (this.utils.isEmpty(_configOptValue)) {
				if (this.utils.isEmpty(_currAttributeValue)) {
					continue;
				}
				else {
					$("#"+_compId).removeAttr(_currHtmlAttribute);
					continue;					
				}
			}
			
			//open a try block
			try {
				//set the attribute's value
				$("#"+_compId).attr(_currHtmlAttribute,_configOptValue);
			}
			catch(err) {
				var _message = "UiBase._updateComponentAttributes():\n";
				_message += "An error occured, while trying to set attribute ["+_currHtmlAttribute+"]";
				_message += "with value ["+_configOptValue+"] for component["+_compId+"]:\n"+err.message;
				alert(_message);
			}
		}
		
		//some browsers allow setting style class, only through the className attribute
		if (_compStyleClass!=null && _compStyleClass!="undefined") {
			_compObj.className = _compStyleClass;
		}
	};
	this._updateConfig = function(_configOpts) {
		//check for nulls
		if (_configOpts!=null && _configOpts!="undefined") {
			//loop through the configuration options
			for (var opt in _configOpts) {
				//update the configuration option
				this.config[opt] = _configOpts[opt];
			}
		}
	};
	this._validateItems = function(_parentComp,_validTypes) {
		//declare locals
		var _parentConfig = null;
		var _parentCompName = null;
		var _items = null;
		var _currItem = null;
		var _currItemName = null;
		var _isValidItem = false;
		
		//check for nulls
		if (this.utils.isEmpty(_parentComp) || this.utils.isEmpty(_validTypes)) {
        	return;
        }
		
        //check for an array type
		if (!this.utils.isArray(_validTypes)) {
			return;
		}
        
		//open a try block
		try {
			//get the parent component's configuration object
			_parentConfig = _parentComp.getBaseUi().config;
			_parentCompName = _parentComp._compName;
		}
		catch(err) {}
		
		//check for a configuration object
		if (_parentConfig==null || _parentConfig=="undefined") {
			return;
		}
        
		//get the items
		_items = _parentConfig.items;
		
		//check for items
		if (_items==null || _items.length<1) {
			return;
		}
		
		//loop through the items
		for (var i=0;i<_items.length;i++) {
			//get the current item
			_currItem = _items[i];
			
			//check for nulls
			if (_currItem==null || _currItem=="undefined") {
				continue;
			}
			
			//open a try block
			try {
				//get the item's name
				_currItemName = _currItem._compName;
				
				//check if the item belongs to one of the valid types
				_isValidItem = this._isInArray(_currItemName, _validTypes);
				
				//check the valid flag
				if (_isValidItem==false) {
					alert("UiBase._validateItems(): Component ["+_parentCompName+"] can NOT have items of type ["+_currItemName+"]!!");
					break;
				}
			}
			catch(err) {}
		}
	};
	this._disable = function(_disabled) {
		//declare locals
		var _config = this.config;
		var _compId = null;
		var _compObj = null;
		
		//check for nulls
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check if the component exists
		_compObj = this.utils.getElement(_compId);
		
		//check for nulls
		if (_compObj==null) {
			//set only the component's configuration option
			this.config.disabled = _disabled;
		}
		else {
			_compObj.disabled = _disabled;
		}
	};
	this.isDisabled = function(compId) {
		//declare locals
		var _attName = "disabled";
		var _attValue = null;
		
		//check for nulls
		if (this.utils.isEmpty(compId)) {
			return;
		}
		
		//get the attribute's value
		_attValue = $("#"+compId).attr(_attName);
		
		//check for nulls
		if (this.utils.isEmpty(_attValue)) {
			return false;
		}
		
		//check for a boolean
		if (_attValue==true) {
			return true;
		}
		
		//check for a string type
		if (typeof _attValue!="string") {
			return false;
		}
		
		//check the value
		if (_attValue.toLowerCase()=="true" || _attValue.toLowerCase()==_attName) {
			return true;
		}
		
		//return the method's value
		return false;
	};
	this.disable = function() {
		//invoke the overloaded method
		this._disable(true);
	};
	this.enable = function() {
		//invoke the overloaded method
		this._disable(false);
	};
	this.getIconClass = function() {
		//declare locals
		var _config = this.config;
		
		//check for nulls
		if (this.utils.isEmpty(_config)) {
			return "";
		}
		
		//return the method's value
		return _config.iconClass;
	};
	this.getIconId = function() {
		//declare locals
		var _config = this.config;
		var _compIdSuffix = "_icon";
		
		//check for nulls
		if (this.utils.isEmpty(_config)) {
			return _compIdSuffix;
		}
		
		//check for an empty id
		if (this.utils.isEmpty(_config.id)) {
			return _compIdSuffix;
		}
		
		//return the method's value
		return _config.id+_compIdSuffix;
	};
	this.getTextId = function() {
		//declare locals
		var _config = this.config;
		var _compIdSuffix = "_text";
		
		//check for nulls
		if (this.utils.isEmpty(_config)) {
			return _compIdSuffix;
		}
		
		//check for an empty id
		if (this.utils.isEmpty(_config.id)) {
			return _compIdSuffix;
		}
		
		//return the method's value
		return _config.id+_compIdSuffix;
	};
	this.setIcon = function(_icon) {
		//declare locals
		var _compId = null;
		var _comp = null;
		
		//get the component's id
		_compId = this.getIconId();
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//set the component's new icon
		_comp.src = _icon;
	};
	this.setIconClass = function(_iconClassName) {
		//declare locals
		var _config = this.config;
		var _compId = null;
		var _comp = null;
		var _prevClassName = null;
		
		//check for nulls
		if (this.utils.isEmpty(_config)) {
			return;
		}
		
		//get the component's id
		_compId = this.getIconId()+"_cl";
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//set the icon class
		this.config.iconClass = _iconClassName;
		
		//get the component's previous className
		_prevClassName=_comp.className;
		
		//add the new className only if necessary
		if (!$("#"+_compId).hasClass(_iconClassName)) {
			$("#"+_compId).addClass(_iconClassName);
		}
		
		//remove the old className
		$("#"+_compId).removeClass(_prevClassName);
	};
	this.setText = function(_text) {
		//declare locals
		var _compId = null;
		var _comp = null;
		
		//get the component's id
		_compId = this.getTextId();
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//set the component's new value
		$("#"+_compId).html(_text);
	};
	this._getMovementDirection = function(_attributeName) {
		//declare locals
		var _DEFAULT_VALUE = "ltr";
		var _compValue = null;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_attributeName)) {
			_compValue = _DEFAULT_VALUE;
			return _compValue;
		}
		
		//get the attribute's value
		_compValue = this.config[_attributeName];
		if (this.utils.isEmpty(_compValue)) {
			_compValue = _DEFAULT_VALUE;
			return _compValue;
		}
		
		//check the align
		switch (_compValue.toLowerCase()) {
			case "left to right":
			case "left-to-right":
			case "lefttoright":
			case "l.t.r":
			case "ltr":
				_compValue = "ltr";
				break;
			case "right to left":
			case "right-to-left":
			case "righttoright":
			case "r.t.l":
			case "rtl":
				_compValue = "rtl";
				break;
			case "top to bottom":
			case "top-to-bottom":
			case "toptobottom":
			case "t.t.b":
			case "ttb":
				_compValue = "ttb";
				break;
			case "bottom to top":
			case "bottom-to-top":
			case "bottomtotop":
			case "b.t.t":
			case "btt":
				_compValue = "btt";
				break;
			default:
				_compValue = _DEFAULT_VALUE;
				break;
		}
		
		//return the method's value
		return _compValue;
	};
	this._getIntervalBySpeed = function(_attributeName) {
		//declare locals
		var _DEFAULT_VALUE = 1000;
		var _compValue = null;
		
		//set defaults if necessary
		if (this.utils.isEmpty(_attributeName)) {
			_compValue = _DEFAULT_VALUE;
			return _compValue;
		}
		
		//get the attribute's value
		_compValue = this.config[_attributeName];
		if (this.utils.isEmpty(_compValue)) {
			_compValue = _DEFAULT_VALUE;
			return _compValue;
		}
		
		
		//check the align
		switch (_compValue.toLowerCase()) {
			case "very slow":
			case "veryslow":
				_compValue = 1500;
				break;
			case "slow":
				_compValue = 1200;
				break;
			case "normal":
			case "regular":
				_compValue = 1000;
				break;
			case "fast":
				_compValue = 500;
				break;
			case "very fast":
			case "veryfast":
				_compValue = 200;
				break;
			case "super fast":
			case "superfast":
			case "super":
				_compValue = 50;
				break;
			default:
				_compValue = _DEFAULT_VALUE;
				break;
		}
		
		//return the method's value
		return _compValue;
	};
	
	//initialize the component
	this._initBase();
};
};

