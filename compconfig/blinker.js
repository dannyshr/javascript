
if(typeof Blinker!=='function'){
/**
 * A Blinker UI component
 * @param _config - An array containing the configuration options 
 * @return A Blinker UI component
 */
function Blinker(_compConfig) {
	//declare component members
	this._extendedConfig = {
	};
	this._tagName = "div";
	this._compName = "Blinker";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	this._compIntervalId = null;
	
	//declare component methods
	this.getBaseUi = function() {
		//return the method's value
		return this._uibase;
	};
	this.render = function() {
		//do nothing
	};
	this._render = function() {
		//do nothing
	};
	this.reRender = function(_configOpts) {
		//update the configuration object
		this._uibase._updateConfig(_configOpts);
		
		//stop the component
		this.stop();
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
		var _interval = this._uibase._getIntervalBySpeed(_attributeName);
		
		//return the method's value
		return _interval;
	};
	this.start = function() {
		//declare locals
		var _compId = this._uibase.config.renderTo;
		var _comp = null;
		var _intervalBySpeed = this._getInterval();
		var _interval = this._uibase.config.interval;
		
		//check for nulls
		if (this._uibase.utils.isEmpty(_compId)) {
			return;
		}
		
		//get the component by its id
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//stop any prevoius action
		this.stop();
		
		//check for a valid interval
		if (this._uibase.utils.isEmpty(_interval)) {
			_interval = _intervalBySpeed;
		}
		else if (isNaN(_interval)) {
			_interval = _intervalBySpeed;
		}
		
		//start the current component's action
		this._compIntervalId = window.setInterval("__blink('" + _compId + "')",_interval);
	};
	this.stop = function() {
		//clear the interval
		if (this._compIntervalId!=null) {
			window.clearInterval(this._compIntervalId);
		}
		
		//declare locals
		var _compId = this._uibase.config.renderTo;
		var _comp = null;
		
		//check for nulls
		if (this._uibase.utils.isEmpty(_compId)) {
			return;
		}
		
		//get the component by its id
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//set the component's display
		_comp.style.visibility = "visible";
	};	
};
};

function __blink(_elemId) {
	//declare locals
	var _comp = document.getElementById(_elemId);
	var _display = null;
	
	//check for nulls
	if (_comp==null) {
		return;
	}
	
	//get the element's display
	_display = _comp.style.visibility;
	
	//check for nulls
	if (_display==null || _display=="") {
		_display = "visible";
	}
	
	//check the display
	if (_display.toLowerCase()=="hidden") {
		_display = "visible";
	}
	else {
		_display = "hidden";
	}
	
	//set the component's display
	_comp.style.visibility = _display;
}
