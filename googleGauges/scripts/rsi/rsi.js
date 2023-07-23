/** Remote Script Injection Based On Time (AKA rsi-bot).
* An innovative alternative to AJAX. 
* (c) Danny Shraga 2010. All rights reserved.
* @author Danny Shraga 
* @date 30/04/2010 05:58 
* @version 1.0 
**/

if(!this.Utils){this.Utils={};}
(function(){
	if(typeof Utils.isArray!=='function'){
		Utils.isArray=function(_obj) {
			//returns true if it is an array
			if (_obj.constructor.toString().indexOf("Array") == -1) {
				return false;
			}
			return true;
		};
	}

	if(typeof Utils.isEmpty!=='function'){
		Utils.isEmpty=function(_obj) {
			//returns true if it is empty
			if (_obj==null || _obj=="undefined" || _obj=="") {
				return true;
			}
			return false;
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
					if (_currKey.toLowerCase()==_key.toLowerCase()) {
						_index = i;
						break;
					}
				}
				
				//return the method's value
				return _index;
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

if(!this.RSI){this.RSI={};}
(function(){
	//declare a Map of script elements
	var __scriptMap = new Utils.Map();
	var __minSleep = 100;
	var __reuseScript = false;
	if(typeof RSI.getMap!=='function'){
		RSI.getMap=function() {
			return __scriptMap;
		};
	}
	if(typeof RSI.getMinSleep!=='function'){
		RSI.getMinSleep=function() {
			return __minSleep;
		};
	}
	if(typeof RSI.setReuseScript!=='function'){
		RSI.setReuseScript=function(_reuseScript) {
			//check for nulls
			if (Utils.isEmpty(_request)) {
				_reuseScript = false;
			}
			__reuseScript = _reuseScript;
		};
	}
	if(typeof RSI.Request!=='function'){
		RSI.Request=function(_url,_index) {
			this.url = _url;
			this.indexId = _index;
			this.scriptHolderId = "_rsiScriptDiv"+_index;
			this.scriptId = "_rsiScript"+_index;
			this.intervalId = null;
			this.interval = -1;
			this.hasFailed = false;
			this.hasSucceded = false;
			this.onSuccess = null;
			this.onFailure = null;
			this.threadAction = null;
			this.clientStartTime = 0;
			this.clientEndTime = 0;
			this.clientDuration = 0;
			this.serverStartTime = 0;
			this.serverEndTime = 0;
			this.serverDuration = 0;
		};
	}
	if(typeof RSI.create!=='function'){
		RSI.create=function(_request) {
			//invoke the overloaded method
			RSI.__getScriptTag(_request);
		};
	}
	if(typeof RSI.remove!=='function'){
		RSI.remove=function(_url) {
			//stop any thread first
			RSI.stopThread(_url);
			//remove the HTML tag
			RSI.__removeScriptTag(_url);
			//remove the key from the map,
			return RSI.getMap().remove(_url);
		};
	}
	if(typeof RSI.__removeScriptTag!=='function'){
		RSI.__removeScriptTag=function(_url) {
			//declare locals
			var _rsiRequest = RSI.getMap().get(_url);
			//check if the url exists
			if (_rsiRequest==null) {
				return;
			}
			var scriptHolderObj = document.getElementById(_rsiRequest.scriptHolderId);
			if (scriptHolderObj==null) {
				return;
			}
			document.body.removeChild(scriptHolderObj);
		};
	}
	if(typeof RSI.__getScriptTag!=='function'){
		RSI.__getScriptTag=function(_request) {
			//declare local
			var _url = null;
			var _onSuccess = null;
			var _onFailure = null;
			var _rsiRequest = null;
			var _scriptTagHolder = null;
			var _scriptTag = null;
			var _currIndex = 0;
			var _doc = null;
			var _map = RSI.getMap();
			var _createNewScript = false;
			
			//check for nulls
			if (Utils.isEmpty(_request)) {
				return null;
			}
			
			//get the request's parameters
			_url = RSI.__getUrlFromRequest(_request);
			if (Utils.isEmpty(_url)) {
				return null;
			}
			
			//get the request's data
			if (_request.onsuccess) {
				_onSuccess = _request.onsuccess;
			}
			if (_request.onfailure) {
				_onFailure = _request.onfailure;
			}
			
			//cache the document object
			_doc = document;
			
			//check if the map contains the url
			_rsiRequest = _map.get(_url);
			if (_rsiRequest==null) {
				//create a new RSI.Request object
				_lastRsiRequest = _map.getLastValue();
				if (_lastRsiRequest==null) {
					_currIndex = 1;
				}
				else {
					_currIndex = _lastRsiRequest.indexId+1;
				}
				_rsiRequest = new RSI.Request(_url,_currIndex);
			}
			
			//check if the RSI script exists
			_scriptTag = _doc.getElementById(_rsiRequest.scriptId);
			if (_scriptTag==null) {
				//create a new script
				_createNewScript = true;
			}
			else {
				if (__reuseScript) {
					//do not create a script
					_createNewScript = false;
				}
				else {
					RSI.__removeScriptTag(_url);
					//create a new script
					_createNewScript = true;
				}
			}
			
			//create a new script if necessary
			if (_createNewScript) {
				_scriptTagHolder = _doc.createElement("div");
				_scriptTagHolder.id = _rsiRequest.scriptHolderId;
				_scriptTagHolder.setAttribute("style","display:none;");
				_scriptTag = _doc.createElement("script");
				_scriptTag.id = _rsiRequest.scriptId;
				_scriptTag.setAttribute("type","text/javascript");
				
				//append the new script element to the script holder
				_scriptTagHolder.appendChild(_scriptTag);
				
				//write the script holder to the document
				_doc.body.appendChild(_scriptTagHolder);
			}
			
			//update the map
			_rsiRequest.onSuccess = _onSuccess;
			_rsiRequest.onFailure = _onFailure;
			_map.put(_url,_rsiRequest);
			
			//return the method's value
			return _scriptTag;
		};
	}
	if(typeof RSI.__getUrlFromRequest!=='function'){
		RSI.__getUrlFromRequest=function(_request) {
			//declare locals
			var _url = null;
			var _paramsStr = "";
			
			//check for nulls
			if (Utils.isEmpty(_request)) {
				return null;
			}
			
			//get the request's data
			if (_request.url) {
				_url = _request.url;
			}
			
			//check for required parameters
			if (Utils.isEmpty(_url)) {
				return null;
			}
			
			//check for an array of parameters
			_paramsStr = RSI.__getParamsFromRequest(_request);
			
			//add the first query string parameter
			if (!Utils.isEmpty(_paramsStr)) {
				if (_url.indexOf("?")==-1) {
					_url += "?";
				}
				_url += _paramsStr;
			}
			
			//return the method's value
			return _url;
		};
	}
	if(typeof RSI.__getParamsFromRequest!=='function'){
		RSI.__getParamsFromRequest=function(_request) {
			//declare locals
			var _params = null;
			var _paramKeyValueDelimiter = ":";
			var _indexKeyValueDelimiter = -1;
			var _currParam = null;
			var _currParamKey = null;
			var _currParamValue = null;
			var _paramsStr = "";
			
			//check for nulls
			if (Utils.isEmpty(_request)) {
				return null;
			}
			
			//get the request's params
			if (_request.params) {
				_params = _request.params;
			}
			
			//check for an array of parameters
			if (!Utils.isEmpty(_params)) {
				if (!Utils.isArray(_params)) {
					_params = new Array( _params );
				}
				
				//add the params to the url
				for (var i=0;i<_params.length;i++) {
					_currParam = _params[i];
					_indexKeyValueDelimiter = _currParam.indexOf(_paramKeyValueDelimiter);
					if (_indexKeyValueDelimiter>-1) {
						_currParamKey = _currParam.substr(0,_indexKeyValueDelimiter);
						_currParamValue = _currParam.substr(_indexKeyValueDelimiter);;
						_paramsStr += _currParamKey+"="+_currParamValue+"&";
					}
				}
			}
			
			//return the method's value
			return _paramsStr;
			
		};
	}
	if(typeof RSI.doGet!=='function'){
		RSI.doGet=function(_request) {
			//declare locals
			var _url = null;
			var _key = null;
			var _rsiRequest = null;
			var _paramsStr = "";
			var _scriptTag = null;
			var _time = new Date().getTime();
			
			//check for required parameters
			_url = RSI.__getUrlFromRequest(_request);
			if (Utils.isEmpty(_url)) {
				return;
			}
			
			//get a script tag
			_scriptTag = RSI.__getScriptTag(_request);
			
			//check for nulls
			if (_scriptTag==null) {
				return;
			}
			
			//get the request from the map
			_key = _url;
			_rsiRequest = RSI.getMap().get(_key);
			
			//check for nulls
			if (_rsiRequest==null) {
				return;
			}
			
			//get the url's parameters
			_paramsStr = RSI.__getParamsFromRequest(_request);
			
			//add the first query string parameter
			if (_url.indexOf("?")==-1) {
				_url += "?";
			}
			else {
				if (Utils.isEmpty(_paramsStr)) {
					_url += "&";
				}
			}
			
			//build the server url
			_url += RSI.__getCallBack();
			
			//add a timestamp to the script, otherwise the browser caches it, 
			//and will NOT execute it
			_url += "&time="+_time;
			
			//update the map
			_rsiRequest.hasSucceded = false;
			_rsiRequest.hasFailed = false;
			_rsiRequest.clientStartTime = _time;
			RSI.getMap().put(_key,_rsiRequest);
			
			//set the script's server url
			try {
				_scriptTag.setAttribute("src",_url);
			}
			catch(error){}
		};
	}
	if(typeof RSI.isAlive!=='function'){
		RSI.isAlive=function(_url) {
			//get the RSI.Request object
			var _rsiRequest = RSI.getMap().get(_url);
			
			//check for nulls
			if (_rsiRequest==null) {
				return false;
			}
			
			//check for a failure
			if (_rsiRequest.hasSucceded || _rsiRequest.hasFailed) {
				return true;
			}
			return false;
		};
	}
	if(typeof RSI.sleep!=='function'){
		RSI.sleep=function(_duration,_callback) {
			var fixedCallback = _callback.replace(/"\""/g,"\\\"");
			window.setTimeout("RSI.__void('"+fixedCallback+"')",_duration);
		};
	}
	if(typeof RSI.__void!=='function'){
		RSI.__void=function(_callback) {
			eval(_callback);
		};
	}
	if(typeof RSI.__getCallBack!=='function'){
		RSI.__getCallBack=function() {
			return "onsuccess=RSI.__onSuccess&onfailure=RSI.__onFailure";
		};
	}
	if(typeof RSI.__onSuccess!=='function'){
		RSI.__onSuccess=function(_requestUrl,_response) {
			//declare locals
			var _strCallback = RSI.__getCallBack();
			//strip the url from the callback
			var _url = _requestUrl.replace(_strCallback,"");
			//get the RSI.Request object
			var _rsiRequest = RSI.getMap().get(_url);
			//check for nulls
			if (_rsiRequest==null) {
				return;
			}
			
			//update the map
			_rsiRequest.hasSucceded = true;
			_rsiRequest.hasFailed = false;
			_rsiRequest.clientEndTime = new Date().getTime();
			_rsiRequest.clientDuration = Utils.getDuration(_rsiRequest.clientStartTime,_rsiRequest.clientEndTime);
			RSI.getMap().put(_url,_rsiRequest);
			//invoke the onSuccess callback
			var _callback = _rsiRequest.onSuccess;
			if (!Utils.isEmpty(_callback)) {
				//check for a function callback (NOT a string)
				if (typeof _callback!=='function') {
					eval(_callback+"('"+_requestUrl+"','"+_response+"')");
				}
				else {
					//invoke it as a function
					_callback(_requestUrl,_response);
				}
			}
		};
	}
	if(typeof RSI.__onFailure!=='function'){
		RSI.__onFailure=function(_requestUrl,_response) {
			//declare locals
			var _strCallback = RSI.__getCallBack();
			//strip the url from the callback
			var _url = _requestUrl.replace(_strCallback,"");
			//get the RSI.Request object
			var _rsiRequest = RSI.getMap().get(_url);
			//check for nulls
			if (_rsiRequest==null) {
				return;
			}
			//stop the thread
			RSI.stopThread(_url);
			
			//update the map
			_rsiRequest.hasFailed = true;
			_rsiRequest.hasSucceded = false;
			_rsiRequest.clientEndTime = new Date().getTime();
			_rsiRequest.clientDuration = Utils.getDuration(_rsiRequest.clientStartTime,_rsiRequest.clientEndTime);
			RSI.getMap().put(_url,_rsiRequest);
			//invoke the onSuccess callback
			var _callback = _rsiRequest.onFailure;
			if (!Utils.isEmpty(_callback)) {
				//check for a function callback (NOT a string)
				if (typeof _callback!=='function') {
					eval(_callback+"('"+_requestUrl+"','"+_response+"')");
				}
				else {
					//invoke it as a function
					_callback(_requestUrl,_response);
				}
			}
		};
	}
	if(typeof RSI.startThread!=='function'){
		RSI.startThread=function(_request,_threadAction,_sleep,_doBeforeSleep) {
			//declare locals
			var _url = null;
			var _paramsStr = "";
			var _rsiRequest = null;
			var _intervalId = null;
			var _map = RSI.getMap();
			var _time = new Date().getTime();
			
			//check for nulls
			if (Utils.isEmpty(_request) || Utils.isEmpty(_threadAction) || Utils.isEmpty(_sleep)) {
			//if (Utils.isEmpty(_request) || Utils.isEmpty(_sleep)) {
				return;
			}
			
			//set defaults if necessary
			if (Utils.isEmpty(_sleep)) {
				_sleep = 1000;
			}
						
			//check for a valid sleep param
			if (isNaN(_sleep)) {
				alert("RSI.startThread(): _sleep ["+_sleep+"] is not a number...");
				return;
			}
			else if (_sleep<RSI.getMinSleep()) {
				alert("RSI.startThread(): _sleep ["+_sleep+"] must be bigger than "+RSI.getMinSleep()+"...");
				return;
			}
			
			//check for required parameters
			_url = RSI.__getUrlFromRequest(_request);
			if (Utils.isEmpty(_url)) {
				return;
			}
			
			//get the rsi object by its key
			_rsiRequest = _map.get(_url);
			
			//check for nulls
			if (_rsiRequest==null) {
				//create a new request
				RSI.create(_request);
				//get the rsi object by its key
				_rsiRequest = _map.get(_url);
				//check for nulls
				if (_rsiRequest==null) {
					return;
				}
			}
			
			//check if the thread has already started
			if (_rsiRequest.intervalId==null) {
				//set defaults if necessary
				if (Utils.isEmpty(_doBeforeSleep)) {
					_doBeforeSleep = false;
				}
							
				//check the flag
				if (_doBeforeSleep) {
					RSI.doGet(_request);
				}
				
				//update the request in the map
				_rsiRequest.interval = _sleep;
				_rsiRequest.threadAction = _threadAction;
				_intervalId = window.setInterval(_threadAction,_rsiRequest.interval);
				//_intervalId = window.setInterval("RSI.doGet("+_request+")",_rsiRequest.interval);
				_rsiRequest.intervalId = _intervalId;
				_rsiRequest.clientStartTime = _time;
				_map.put(_url,_rsiRequest);
			}
		};
	}
	if(typeof RSI.stopThread!=='function'){
		RSI.stopThread=function(_url) {
			//declare locals
			var _rsiRequest = null;
			var _map = RSI.getMap();
			
			//check for nulls
			if (Utils.isEmpty(_url)) {
				return;
			}
			
			//get the rsi object by its key
			_rsiRequest = _map.get(_url);
			
			//check for nulls
			if (_rsiRequest==null) {
				return;
			}
			
			//check if the thread has started
			if (_rsiRequest.intervalId!=null) {
				try {
					window.clearInterval(_rsiRequest.intervalId);
				}
				catch (error) {}
				//update the map
				_rsiRequest.clientEndTime = new Date().getTime();
				_rsiRequest.clientDuration = Utils.getDuration(_rsiRequest.clientStartTime,_rsiRequest.clientEndTime);
				_rsiRequest.intervalId = null;
				_map.put(_url,_rsiRequest);
			}
		};
	}
	if(typeof RSI.setInterval!=='function'){
		RSI.setInterval=function(_url,_interval) {
			//declare locals
			var _rsiRequest = null;
			var _map = RSI.getMap();
			
			//check for nulls
			if (Utils.isEmpty(_url) || Utils.isEmpty(_interval)) {
				return;
			}
			
			//get the rsi object by its key
			_rsiRequest = _map.get(_url);
			
			//check for nulls
			if (_rsiRequest==null) {
				return;
			}
			
			//update the map
			_rsiRequest.interval = _interval;
			_map.put(_url,_rsiRequest);
		};
	}
}());

function formatDateTime(dateObj,format) {
	//declare locals
	var day,month,year,hours,minutes,seconds,milliseconds = 0;
	var dateDelimiter = "/";
	var dateTimeDelimiter = " ";
	var timeDelimiter = ":";
	var retVal = "";
	var minValue = 10;
	var formatDay = "d";
	var formatDays = "dd";
	var formatMonth = "M";
	var formatMonths = "MM";
	var formatYear = "yyyy";
	var formatHour = "H";
	var formatHours = "HH";
	var formatMinute = "m";
	var formatMinutes = "mm";
	var formatSecond = "S";
	var formatSeconds = "SS";
	var formatMilliseconds = "sss";
	
	//check for nulls
	if (dateObj==null || dateObj=='undefined') {
		return null;
	}
	if (format==null || format=='undefined') {
		format = "dd/MM/yyyy HH:mm:SS:sss";
	}
	
	//parse the date
	day = dateObj.getDate();
	if (day<minValue) {
		if (format.toLowerCase().indexOf(formatDays)>-1) {
			day = "0"+day;
		}
	}
	month = dateObj.getMonth()+1;
	if (month<minValue) {
		if (format.indexOf(formatMonths)>-1) {
			month = "0"+month;
		}
	}
	year = dateObj.getFullYear();
	hours = dateObj.getHours();
	if (hours<minValue) {
		if (format.toLowerCase().indexOf(formatHours.toLowerCase())>-1) {
			hours = "0"+hours;
		}
	}
	minutes = dateObj.getMinutes();
	if (minutes<minValue) {
		if (format.toLowerCase().indexOf(formatMinutes)>-1) {
			minutes = "0"+minutes;
		}
	}
	seconds = dateObj.getSeconds();
	if (seconds<minValue) {
		if (format.indexOf(formatSeconds)>-1) {
			seconds = "0"+seconds;
		}
	}
	milliseconds = dateObj.getMilliseconds();
	
	//format the date
	if ((format.toLowerCase().indexOf(formatDays)>-1) || (format.toLowerCase().indexOf(formatDay)>-1)) {
		retVal += day;
	}
	if ((format.indexOf(formatMonths)>-1) || (format.indexOf(formatMonth)>-1)) {
		retVal += dateDelimiter+month;
	}
	if (format.toLowerCase().indexOf(formatYear)>-1) {
		retVal += dateDelimiter+year;
	}
	if ((format.toLowerCase().indexOf(formatHours.toLowerCase())>-1) || (format.toLowerCase().indexOf(formatHour.toLowerCase())>-1)) {
		retVal += dateTimeDelimiter+hours;
	}
	if ((format.toLowerCase().indexOf(formatMinutes)>-1) || (format.toLowerCase().indexOf(formatMinute)>-1)) {
		retVal += timeDelimiter+minutes;
	}
	if ((format.indexOf(formatSeconds)>-1) || (format.indexOf(formatSecond)>-1)) {
		retVal += timeDelimiter+seconds;
	}
	if (format.toLowerCase().indexOf(formatMilliseconds)>-1) {
		retVal += timeDelimiter+milliseconds;
	}
	
	//return the method's value
	return retVal;
}
