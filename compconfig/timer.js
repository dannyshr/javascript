
if(typeof Timer!=='function'){
/**
 * A Timer UI component
 * @param _config - An array containing the configuration options 
 * @return A Timer UI component
 */
function Timer(_compConfig) {
	//declare component members
	this._extendedConfig = {
	};
	this._tagName = "div";
	this._compName = "Timer";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	this._DEFAULT_INTERVAL = 10;
	this._compIntervalId = null;
	this._totalMilliseconds = 0;
	this._timeout = 0;
	this._countDir = null;
	this._timeInSeconds = 0;
	
	//declare component methods
	this.getBaseUi = function() {
		//return the method's value
		return this._uibase;
	};
	this.render = function() {
		//generate the component's HTML
		this._generateHtml();
		
		//render the component
		this._uibase._renderHtml(this._tagName,this._compName);
		this._render();
	};
	this._render = function() {
		//render the component's children
		this._uibase._renderChildItems();
		
		//attach custom component events
		this._attachEvents();
	};
	this.reRender = function(_configOpts) {
		//update the configuration object
		this._uibase._updateConfig(_configOpts);
		
		//re-render the component
		this.render();
	};
	this._attachEvents = function() {
		//invoke the generic method
		this._uibase._attachBaseEvents();
		
		//attach custom events
		this._attachCustomEvents();
		
		//render child items
		this._uibase._attachChildItemsEvents();
	};
	this._attachCustomEvents = function() {
		//attach custom events for this component
		this._uibase._attachMouseOverEvents();
	};
	this.getHtml = function() {
		//return the method's value
		return this._uibase._compHtml;
	};
	this._generateHtml = function() {
		//declare locals
		var _html = "";
		
		//render the component's html
		_html = this._uibase._generateHtmlBase(this._tagName,this._compName);
		
		//return the method's value
		return _html;
	};
	this._getInterval = function() {
		//declare locals
		var _attributeName = "speed";
		var _retInterval = null;
		var _speed = this._uibase.config.speed;
		var _intervalBySpeed = this._uibase._getIntervalBySpeed(_attributeName);
		var _interval = this._uibase.config.interval;
		
		//check for empty values
		if (this._uibase.utils.isEmpty(_speed) && this._uibase.utils.isEmpty(_interval)) {
			_retInterval = this._DEFAULT_INTERVAL;
		}
		else {
			if (this._uibase.utils.isEmpty(_interval)) {
				_retInterval = _intervalBySpeed;
			}
			else if (isNaN(_interval)) {
				_retInterval = _intervalBySpeed;
			}
			else {
				_retInterval = _interval;
			}
		}
		
		//return the method's value
		return _retInterval;
	};
	this._getCountDir = function() {
		//declare locals
		var _countDir = this._uibase.config.countDir;
		var _DEFAULT_VALUE = "down";
		
		//set defaults if necessary
		if (this._uibase.utils.isEmpty(_countDir)) {
			_countDir = _DEFAULT_VALUE;
		}
		if (typeof _countDir!="string") {
			_countDir = _DEFAULT_VALUE;
		}
		
		//check the value
		switch (_countDir.toLowerCase()) {
			case "countdown":
			case "count down":
			case "down":
				_countDir = "down";
				break;
			case "countup":
			case "count up":
			case "up":
				_countDir = "up";
				break;
			default:
				_countDir = _DEFAULT_VALUE;
				break;
		}
		
		//return the method's value
		return _countDir;
	};
	this._getTimerFormat = function() {
		//dclare locals
		var _showYears = this._uibase.config.showYears;
		var _showMonths = this._uibase.config.showMonths;
		var _showDays = this._uibase.config.showDays;
		var _showHours = this._uibase.config.showHours;
		var _showMinutes = this._uibase.config.showMinutes;
		var _showSeconds = this._uibase.config.showSeconds;
		var _showMillis = this._uibase.config.showMillis;
		var _timerFormat = "";
		
		//set defaults if necessary
		if (this._uibase.utils.isEmpty(this._uibase.config.showMinutes)) {
			_showMinutes = true;
		}
		if (this._uibase.utils.isEmpty(this._uibase.config._showSeconds)) {
			_showSeconds = true;
		}
		
		//build the timer format
		if (this._uibase.utils.parseBoolean(_showYears)) {
			_timerFormat += "YYYY ";
		}
		if (this._uibase.utils.parseBoolean(_showMonths)) {
			_timerFormat += "MM ";
		}
		if (this._uibase.utils.parseBoolean(_showDays)) {
			_timerFormat += "DD ";
		}
		if (this._uibase.utils.parseBoolean(_showHours)) {
			_timerFormat += "HH:";
		}
		if (this._uibase.utils.parseBoolean(_showMinutes)) {
			_timerFormat += "mm:";
		}
		if (this._uibase.utils.parseBoolean(_showSeconds)) {
			_timerFormat += "ss:";
		}
		if (this._uibase.utils.parseBoolean(_showMillis)) {
			_timerFormat += "SSS:";
		}
		
		//return the method's value
		return _timerFormat;
	};
	this.start = function() {
		//declare locals
		var _compId = this._uibase.config.id;
		var _comp = null;
		var _interval = this._getInterval();
		var _countDir = this._getCountDir();
		var _timerFormat = this._getTimerFormat();
		var _configTimeInSeconds = this._uibase.config.timeInSeconds;
		
		//check for nulls
		if (this._uibase.utils.isEmpty(_compId)) {
			return;
		}
		if (this._uibase.utils.isEmpty(_configTimeInSeconds)) {
			return;
		}
		if (isNaN(_configTimeInSeconds)) {
			return;
		}
		
		//get the component by its id
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//updaet the component's values
		if (typeof _configTimeInSeconds=="string") {
			_configTimeInSeconds = parseInt(_configTimeInSeconds);
		}
		this._timeout = _interval;
		this._countDir = _countDir;
		this._timeInSeconds = _configTimeInSeconds;
		if (_countDir=="down") {
			this._totalMilliseconds = (_configTimeInSeconds*1000);
		}
		else if (_countDir=="up") {
			this._totalMilliseconds = 0;
		}
		
		//update the component's attributes
		_comp.setAttribute("timeout",this._timeout);
		_comp.setAttribute("countDir",this._countDir);
		_comp.setAttribute("timeInSeconds",this._timeInSeconds);
		_comp.setAttribute("totalMilliseconds",this._totalMilliseconds);
		
		//stop any prevoius action
		this.stop();
		
		//start the current component's action
		var _fhEvent = this._uibase.config.ontimeup;
		if (this._uibase.utils.isEmpty(_fhEvent)) {
			_fhEvent = null;
		}
		var _method = "__tick('" + _compId + "','" + _timerFormat + "','" + _fhEvent + "')";
		this._compIntervalId = window.setInterval(_method,_interval);
		
		//update the component with the interval id
		_comp.setAttribute("intervalId",this._compIntervalId);
	};
	this.stop = function() {
		//clear the interval
		if (this._compIntervalId!=null) {
			window.clearInterval(this._compIntervalId);
		}
	};	
};
};

function __invokeEventOntimeup(_fhEvent) {
	//declare locals
	var _eventHandlerType = null;
	
	//check for nulls
	if (_fhEvent==null || _fhEvent=="undefined" || _fhEvent=="") {
		return;
	}
	
	//get the event's type and handler
	_eventHandlerType = typeof(_fhEvent);
	
	//invoke the event handler according to its type
	if (_eventHandlerType=="function") {
		_fhEvent();
	}
	else if (_eventHandlerType=="string") {
		eval(_fhEvent);
	}
}

function __stopAfterTimeup(_intervalId) {
	//clear the interval
	if (_intervalId!=null) {
		window.clearInterval(_intervalId);
	}
}

function __tick(_elemId,_timerFormat,_fhEvent) {
	//declare locals
	var _comp = null;
	var _timeout = null;
	var _countDir = null;
	var _timeInSeconds = null;
	var _totalMilliseconds = null;
	var _totalMillis = 0;
	var _intervalId = null;
	
	//get the component by its id
	_comp = document.getElementById(_elemId);
	
	//check for nulls
	if (_comp==null) {
		return;
	}
	
	//get the component's attributes
	_timeout = parseInt(_comp.getAttribute("timeout"));
	_countDir = _comp.getAttribute("countDir");
	_timeInSeconds = parseInt(_comp.getAttribute("timeInSeconds"));
	_totalMilliseconds = parseInt(_comp.getAttribute("totalMilliseconds"));
	_intervalId = _comp.getAttribute("intervalId");
	if (_intervalId!=null && _intervalId!="") {
		_intervalId = parseInt(_intervalId);
	}
	
	//check the count direction
	if (_countDir=="down") {
		//check for a timeout
		if (_totalMilliseconds <= 0) {
			//stop the timer
			__stopAfterTimeup(_intervalId);
			
			//invoke the ontimeup event
			__invokeEventOntimeup(_fhEvent);
			return;
		}
		
		//update the total time left
		_totalMilliseconds -= _timeout;
		_comp.setAttribute("totalMilliseconds",_totalMilliseconds)
	}
	else if (_countDir=="up") {
		//check for a timeout
		if (_totalMilliseconds >= (_timeInSeconds*1000)) {
			//stop the timer
			__stopAfterTimeup(_intervalId);
			
			//invoke the ontimeup event
			__invokeEventOntimeup(_fhEvent);
			return;
		}
		
		//update the total time left
		_totalMilliseconds += _timeout;
		_comp.setAttribute("totalMilliseconds",_totalMilliseconds)
	}
	
	//update the time
	__updateTime(_elemId,_totalMilliseconds,_timerFormat);
}

function __updateTime(_elemId,_totalMillis,_timerFormat) {
	//declare locals
	var _comp = document.getElementById(_elemId);
	var _utils = new Utils();
	var _years = null;
	var _months = null;
	var _days = null;
	var _hours = null;
	var _minutes = null;
	var _seconds = null;
	var _milliseconds = null;
	var _showYears = false;
	var _showMonths = false;
	var _showDays = false;
	var _showHours = false;
	var _showMinutes = false;
	var _showSeconds = false;
	var _showMillis = false;
	var _numberLength = 2;
	var _dateDelimiter = " ";
	var _timeDelimiter = ":";
	var _timeStr = "";
	
	//check for nulls
	if (_comp==null || _timerFormat==null || _timerFormat=="") {
		return;
	}
	
	//turn strings into numbers
	_totalMillis = parseInt(_totalMillis);
	_showYears = ((_timerFormat.indexOf("yyyy")!=-1) || (_timerFormat.indexOf("YYYY")!=-1));
	_showMonths = (_timerFormat.indexOf("MM")!=-1);
	_showDays = ((_timerFormat.indexOf("dd")!=-1) || (_timerFormat.indexOf("DD")!=-1));;
	_showHours = ((_timerFormat.indexOf("hh")!=-1) || (_timerFormat.indexOf("HH")!=-1));;
	_showMinutes = (_timerFormat.indexOf("mm")!=-1);
	_showSeconds = (_timerFormat.indexOf("ss")!=-1);
	_showMillis = (_timerFormat.indexOf("SSS")!=-1);
	
	//calculate each time part
	_seconds = Math.round(_totalMillis/1000);
	_milliseconds = (((_seconds+1)*1000) - _totalMillis);
	_milliseconds = (_milliseconds % 1000);
	if (_milliseconds<0) {
		_milliseconds = Math.abs(_milliseconds);
	}
	_years = Math.floor(_seconds / 31536000);
	_seconds -= _years * 31536000;
	_months = Math.floor(_seconds / 2592000);
	_seconds -= _months * 2592000;
	_days = Math.floor(_seconds / 86400);
	_seconds -= _days * 86400;
	_hours = Math.floor(_seconds / 3600);
	_seconds -= _hours * (3600);
	_minutes = Math.floor(_seconds / 60);
	_seconds -= _minutes * (60);
	
	//build the time string
	if (_showYears) {
		_timeStr += _utils.addLeadingZeros(_years,_numberLength);
		_timeStr += _dateDelimiter;
	}
	if (_showMonths) {
		_timeStr += _utils.addLeadingZeros(_months,_numberLength);
		_timeStr += _dateDelimiter;
	}
	if (_showDays) {
		_timeStr += _utils.addLeadingZeros(_days,_numberLength);
		_timeStr += _dateDelimiter;
	}
	if (_showHours) {
		_timeStr += _utils.addLeadingZeros(_hours,_numberLength);
		_timeStr += _timeDelimiter;
	}
	if (_showMinutes) {
		_timeStr += _utils.addLeadingZeros(_minutes,_numberLength);
		_timeStr += _timeDelimiter;
	}
	if (_showSeconds) {
		_timeStr += _utils.addLeadingZeros(_seconds,_numberLength);
	}
	if (_showMillis) {
		_numberLength = 3;
		_timeStr += _timeDelimiter;
		_timeStr += _utils.addLeadingZeros(_milliseconds,_numberLength);
	}
	
	//render the updated time string
	_comp.innerHTML = _timeStr;
}
