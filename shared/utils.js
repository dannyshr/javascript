
if(!this.Utils){this.Utils={};}
(function(){
	if(typeof Utils.isArray!=='function'){
		Utils.isArray=function(_obj) {
			//returns true if it is an array
			if (_obj.constructor.toString().toLowerCase().indexOf("array") == -1) {
				return false;
			}
			return true;
		};
	}

	if(typeof Utils.isElement!=='function'){
		Utils.isElement=function(_elemId) {
			//declare locals
			var _elemObj = null;
			
			//check for nulls
			if (Utils.isEmpty(_elemId)) {
				return false;
			}
			
			//get elements by id
			_elemObj = document.getElementById(_elemId);
			
			//check for nulls
			if (_elemObj==null) {
				return false;
			}
			
			//return the method's value
			return true;
		};
	}

	if(typeof Utils.getElement!=='function'){
		Utils.getElement=function(_elemId) {
			//declare locals
			var _elemObj = null;
			
			//check for nulls
			if (!Utils.isElement(_elemId)) {
				return null;
			}
			
			//get elements by id
			_elemObj = document.getElementById(_elemId);
			
			//return the method's value
			return _elemObj;
		};
	}
	
	if(typeof Utils.isEmpty!=='function'){
		Utils.isEmpty=function(_obj) {
			//declare locals
			var empty = false;
			
			//returns true if it is empty
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
			if (Utils.isArray(_obj)) {
				//loop through the array
				for (var i=0;i<_obj.length;i++) {
					//invoke the method recursively
					empty = Utils.isEmpty(_obj[i]);
					if (!empty) {
						break;
					}
				}
				
				//check for an empty input
				if (empty) {
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
							empty = false;
							break;
						}
					}
				}
			}
			
			//check for an empty input
			if (empty) {
				return true;
			}
			
			//return the method's value
			return false;
		};
	}
	
	if(typeof Utils.getLocale!=='function'){
		Utils.getLocale=function() {
			//check for a navigator object
			if ( navigator ) {
				if ( navigator.language ) {
			        return navigator.language;
			    }
			    else if ( navigator.browserLanguage ) {
			        return navigator.browserLanguage;
			    }
			    else if ( navigator.systemLanguage ) {
			        return navigator.systemLanguage;
			    }
			    else if ( navigator.userLanguage ) {
			        return navigator.userLanguage;
			    }
			}
			
			//return the method's value
			return null;
		};
	}
	
	if(typeof Utils.formatNow!=='function'){
		Utils.formatNow=function(_dateFormat) {
			//declare locals
			var _DEFAULT_FORMAT = "dd/MM/yyyy HH:mm:ss";
			var _date = new Date();
			
			//set defaults if necessary
			if (Utils.isEmpty(_dateFormat)) {
				_dateFormat = _DEFAULT_FORMAT;
			}
			
			//invoke the overloaded method
			Utils.formatDateTime(_date,_dateFormat);
		};
	}
	
	if(typeof Utils.formatDate!=='function'){
		Utils.formatDate=function(_date,_dateFormat) {
			//declare locals
			var _DEFAULT_FORMAT = "dd/MM/yyyy";
			
			//set defaults if necessary
			if (Utils.isEmpty(_dateFormat)) {
				_dateFormat = _DEFAULT_FORMAT;
			}
			
			//invoke the overloaded method
			Utils.formatDateTime(_date,_dateFormat);
		};
	}
	
	if(typeof Utils.formatTime!=='function'){
		Utils.formatTime=function(_time,_timeFormat) {
			//declare locals
			var _DEFAULT_FORMAT = "HH:mm:ss";
			
			//set defaults if necessary
			if (Utils.isEmpty(_timeFormat)) {
				_timeFormat = _DEFAULT_FORMAT;
			}
			
			//invoke the overloaded method
			Utils.formatDateTime(_time,_timeFormat);
		};
	}
	
	if(typeof Utils.formatDateTime!=='function'){
		Utils.formatDateTime=function(_date,_dateFormat) {
			//declare locals
			var _DEFAULT_FORMAT = "dd/MM/yyyy HH:mm:ss";
			var _dateObj = null;
			var _arrDays = new Array(
				"Sunday"
				,"monday"
				,"Thursday"
				,"Wednesday"
				,"Tuesday"
				,"Friday"
				,"Saturday"
			);
			var _arrMonths = new Array(
				"January"
				,"Fabruary"
				,"March"
				,"April"
				,"May"
				,"June"
				,"July"
				,"August"
				,"September"
				,"October"
				,"November"
				,"December"
			);
			var _arrDateParts = null;
			var _currPartName = null;
			var _currPartCS = false;
			var _arrPartPatterns = null;
			var _currPartPattern = null;
			var _currPartPatternName = null;
			var _currPartPatternValueType = null;
			var _currPartPatternValue = null;
			var _currPartPatternIndex = -1;
			var _currPatternRegExp = null;
			var _patternFound = false;
			var _hhValue = null;
			var _hhPrefix = "";
			var _hValue = null;
			var _hhSuffix = "###";
			var _hhSuffixAM = " AM";
			var _hhSuffixPM = " PM";
			var _realSuffix = _hhSuffixAM;
			var _hasHHSuffix = false;
			var foundPatternNextChar = null;
			var _formattedDate = "";
			
			//check for nulls
			if (Utils.isEmpty(_date)) {
				return null;
			}
			
			//check for valid values
			if (typeof _date == "object") {
				_dateObj = _date;
			}
			else if ((typeof _date == "number") || (typeof _date == "string")) {
				_dateObj = new Date(_date);
			}
			else {
				return null;
			}
			
			//set defaults if necessary
			if (Utils.isEmpty(_dateFormat)) {
				_dateFormat = _DEFAULT_FORMAT;
			}

			//calculate complicated values
			_hhValue = _dateObj.getHours();
			if (_hhValue>12) {
				_hhValue -= 12;
				if (String(_hhValue).length<2) {
					_hhPrefix = "0";
				}
				_hhValue = _hhPrefix + String(_hhValue);
				_realSuffix = _hhSuffixPM;
			}
			else {
				if (String(_hhValue).length<2) {
					_hhPrefix = "0";
				}
				_hhValue = _hhPrefix + String(_hhValue);
				_realSuffix = _hhSuffixAM;
			}
			_hValue = _dateObj.getHours();
			_hValue = (_hValue>12) ? (String(_hValue-12)) : (String(_hValue));
			
			//populate the array of possible date parts
			//structure: [datePart,isCaseSensitive,partPatterns[patternName,patternValueType,patternValue]]
			//IMPORTANT: integer types are always first
			_arrDateParts = [
 				["hour",true,[
				               ["HH","int",_dateObj.getHours()]
				               ,["H","int",_dateObj.getHours()]
				               ,["hh","string",_hhValue]
				               ,["h","string",_hValue]
				              ]]
				,["minute",true,[
				                 ["mm","int",_dateObj.getMinutes()]
				                 ,["m","int",_dateObj.getMinutes()]
				                ]]
				,["second",true,[
				                 ["ss","int",_dateObj.getSeconds()]
				                 ,["s","int",_dateObj.getSeconds()]
				                ]]
				,["milisecond",true,[
				                     ["SSS","int",_dateObj.getMilliseconds()]
				                     ,["SS","int",_dateObj.getMilliseconds()]
				                     ,["S","int",_dateObj.getMilliseconds()]
				                    ]]
				,["timesuffix",false,[
				                     ["a","string",_hhSuffix]
				                    ]]
				,["year",false,[
				                ["yyyy","int",_dateObj.getFullYear()]
				                ,["yyy","int",_dateObj.getFullYear()]
				                ,["yy","string",String(_dateObj.getFullYear()).substring(2)]
				                ,["y","string",String(_dateObj.getFullYear()).substring(2)]
				               ]]
				,["day",false,[
				              ["dd","int",_dateObj.getDate()]
				              ,["d","int",_dateObj.getDate()]
				              ,["eeee","string",_arrDays[_dateObj.getDay()]]
				              //,["eee","string",_arrDays[_dateObj.getDay()].substring(0,"eee".length)]
				              //,["ee","string",_arrDays[_dateObj.getDay()].substring(0,"ee".length)]
				              //,["e","string",_arrDays[_dateObj.getDay()]]
				             ]]
				,["month",true,[
				                ["MM","int",_dateObj.getMonth()+1]
				                ,["M","int",_dateObj.getMonth()+1]
				                ,["MMMM","string",_arrMonths[_dateObj.getMonth()]]
				                //,["MMM","string",_arrMonths[_dateObj.getMonth()].substring(0,"MMM".length)]
				               ]]
			];
			
			//set the format
			_formattedDate = _dateFormat;
			
			//loop through the date's part
			for (var i=0;i<_arrDateParts.length;i++) {
				//get the current date part's details: name, case-sensitivity, array of partPatterns
				_currPartName = _arrDateParts[i][0];
				_currPartCS = _arrDateParts[i][1];
				_arrPartPatterns = _arrDateParts[i][2];
				
				//reset the found flag
				_patternFound = false;
				
				//loop through the diffent part's patterns
				for (var j=0;j<_arrPartPatterns.length;j++) {
					//get the current date part pattern's details: pattern, valueType, value
					_currPartPattern = _arrPartPatterns[j];
					_currPartPatternName = _currPartPattern[0];
					_currPartPatternValueType = _currPartPattern[1];
					_currPartPatternValue = _currPartPattern[2];
					
					//check the part's case sensitivity
					if (_currPartCS) {
						_currPartPatternIndex = _formattedDate.indexOf(_currPartPatternName);
					}
					else {
						_currPartPatternIndex = _formattedDate.toLowerCase().indexOf(_currPartPatternName);
					}
					
					//check if the part was found
					if (_currPartPatternIndex==-1) {
						continue;
					}
					
					//check if the found pattern can exceed one character
					if ((_currPartPatternIndex+_currPartPatternName.length+1)>_formattedDate.length) {
						//set the found flag
						_patternFound = true;
					}
					else {
						//check if the found pattern has the same length as the searched pattern
						var _startInd = _currPartPatternIndex+_currPartPatternName.length;
						var _endInd = _startInd+1;
						foundPatternNextChar = _formattedDate.substring(_startInd,_endInd);
						if (foundPatternNextChar==_currPartPatternName.charAt(0)) {
							continue;
						}
						
						//set the found flag
						_patternFound = true;
					}
					
					//check if the pattenr was found
					if (_patternFound) {
						//create a RegularExpression
						if (_currPartCS) {
							_currPatternRegExp = new RegExp(_currPartPatternName);
						}
						else {
							_currPatternRegExp = new RegExp(_currPartPatternName,"i");
						}
						
						//check the pattern's value type
						if (_currPartPatternValueType=="int") {
							_currPartPatternValue = String(_currPartPatternValue);
							if ( _currPartPatternValue.length<_currPartPatternName.length) {
								_currPartPatternValue = "0" + _currPartPatternValue;
							}
						}
						
						//replace the pattern with its value
						_formattedDate = _formattedDate.replace(_currPatternRegExp,_currPartPatternValue);
					}
				}
			}
			
			//fix problematic formatted values
			_formattedDate = _formattedDate.replace(_hhSuffix,_realSuffix);
			_formattedDate = _formattedDate.replace("mo","Mo");
			
			//return the method's value
			return _formattedDate;
		};
	}

	if(typeof Utils.getDuration!=='function'){
		Utils.getDuration=function(_startTime,_endTime) {
			//declare locals
			var _duration = 0;
			
			//check for nulls
			if (Utils.isEmpty(_startTime)) {
				return 0;
			}
			
			//set defaults if necessary
			if (Utils.isEmpty(_endTime)) {
				_endTime = new Date().getTime();
			}
			
			//calculate the duration
			return _endTime-_startTime;
		};
	}
	
	if(typeof Utils.Map!=='function'){
		Utils.Map=function() {
			if (this.arrKeys==null) {
				this.arrKeys=new Array();
			}
			if (this.arrValues==null) {
				this.arrValues=new Array();
			};
			this.indexOf=function(_key) {
				//declare locals
				var _currKey = null;
				var _index = -1;
				
				//check for nulls
				if (Utils.isEmpty(_key) || 
					this.arrKeys==null || !Utils.isArray(this.arrKeys)) {
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
				if (Utils.isEmpty(_index) || 
					this.arrKeys==null || !Utils.isArray(this.arrKeys) ||
					this.arrValues==null || !Utils.isArray(this.arrValues)) {
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
				if (Utils.isEmpty(_index) || 
					this.arrKeys==null || !Utils.isArray(this.arrKeys) ||
					this.arrValues==null || !Utils.isArray(this.arrValues)) {
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
				if (Utils.isEmpty(_key) || 
					this.arrKeys==null || !Utils.isArray(this.arrKeys) ||
					this.arrValues==null || !Utils.isArray(this.arrValues)) {
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
				if (Utils.isEmpty(_key)) {
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
	}
	
}());
