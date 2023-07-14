
if(typeof Marquee!=='function'){
/**
 * A Marquee UI component
 * @param _config - An array containing the configuration options 
 * @return A Marquee UI component
 */
function Marquee(_compConfig) {
	//declare component members
	this._extendedConfig = {
	};
	this._tagName = "div";
	this._compName = "Marquee";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	this._DEFAULT_DIST = 20;
	this._compIntervalId = null;
	
	//declare component methods
	this.getBaseUi = function() {
		//return the method's value
		return this._uibase;
	};
	this._updateStyle = function() {
		//update the config's tyle with a default style
		var _configStyle = this._uibase.config.style;
		if (_configStyle==null || _configStyle=="") {
			_configStyle = "";
		}
		_configStyle += ";overflow:scroll;position:relative;";
		this._uibase.config.style = _configStyle;
	};
	this.render = function() {
		//generate the component's HTML
		this._updateStyle();
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
		this._updateStyle();
		
		//stop the component
		this.stop();
		
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
		
		//this._uibase._compHtml = _html;
		
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
		var _compId = this._uibase.config.id;
		var _comp = null;
		var _intervalBySpeed = this._getInterval();
		var _interval = this._uibase.config.interval;
		var _attributeName = "movementDir";
		var _dir = this._uibase._getMovementDirection(_attributeName);
		var _dist = this._uibase.config.distance;
		var _contentsCompId = null;
		var _contentsHeight = 0;
		var _contentsWidth = 0;
		var _html = "";
		
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
		
		//set defaults if necessary
		if (this._uibase.utils.isEmpty(_dist)) {
			_dist = _DEFAULT_DIST;
		}
		else if (isNaN(_dist)) {
			_dist = _DEFAULT_DIST;
		}
		else {
			if (typeof _dist=="string") {
				_dist = parseInt(_dist);
			}
		}
		
		//stop any prevoius action
		this.stop();
		
		//render the component's contents
		_contentsCompId = _compId + "_cont";
		_html += "<span id=\"" + _contentsCompId + "\" style=\"";
		if (_dir=="ltr" || _dir=="rtl") {
			_html += "white-space:nowrap;";
		}
		_html += "position:relative;\">";
		_html += this._uibase.config.content;
		_html += "</span>";
		_comp.innerHTML = _html;
		
		//calculate height and width of the contents
		_contentsHeight = _comp.scrollHeight;
		_contentsWidth = _comp.scrollWidth;
		
		//check for a valid interval
		if (this._uibase.utils.isEmpty(_interval)) {
			_interval = _intervalBySpeed;
		}
		else if (isNaN(_interval)) {
			_interval = _intervalBySpeed;
		}
		
		//start the current component's action
		this._compIntervalId = window.setInterval("__scroll('" + _compId + "','" + _contentsCompId + "','" + _dir + "','" + _dist + "','" + _contentsHeight + "','" + _contentsWidth + "')",_interval);
	};
	this.stop = function() {
		//clear the interval
		if (this._compIntervalId!=null) {
			window.clearInterval(this._compIntervalId);
		}
	};	
};
};

function __scroll(_containerId,_contentsId,_dir,_dist,_contentsHeight,_contentsWidth) {
	//declare locals
	var _containerComp = document.getElementById(_containerId);
	var _contentsComp = document.getElementById(_contentsId);
	var _containerHeight = 0;
	var _containerWidth = 0;
	var _contentsLeft = 0;
	var _contentsTop = 0;
	var _debugMsg = "";
	var _topLeftMargin = 10;
	
	//check for nulls
	if (_containerComp==null || _contentsComp==null) {
		return;
	}
	
	//fix values
	_dist = parseInt(_dist);
	
	//get the height and width of the container and of its contents
	_containerHeight = _containerComp.style.height.replace(/[^\-0-9]/g,'');
	_containerWidth = _containerComp.style.width.replace(/[^\-0-9]/g,'');
	_contentsLeft = _contentsComp.style.left.replace(/[^\-0-9]/g,'');
	_contentsTop = _contentsComp.style.top.replace(/[^\-0-9]/g,'');
	
	//fix values
	if (typeof _containerHeight=="string") {
		_containerHeight = parseInt(_containerHeight);
	}
	if (typeof _containerWidth=="string") {
		_containerWidth = parseInt(_containerWidth);
	}
	if (typeof _contentsHeight=="string") {
		_contentsHeight = parseInt(_contentsHeight);
	}
	if (typeof _contentsWidth=="string") {
		_contentsWidth = parseInt(_contentsWidth);
	}
	if (_contentsLeft==null || _contentsLeft=="") {
		_contentsLeft = 0;
	}
	if (_contentsTop==null || _contentsTop=="") {
		_contentsTop = 0;
	}
	if (typeof _contentsLeft=="string") {
		_contentsLeft = parseInt(_contentsLeft);
	}
	if (typeof _contentsTop=="string") {
		_contentsTop = parseInt(_contentsTop);
	}
	
	//set defaults if necessary
	if (_contentsLeft==0 && _dir=="rtl") {
		_contentsLeft = _contentsWidth;
	}
	if (_contentsTop==0 && _dir=="btt") {
		_contentsTop = _contentsHeight;
	}
	
	//build a debug message
	_debugMsg += "_dir=[" + _dir + "]";
	_debugMsg += " _dist=[" + _dist + "]";
	_debugMsg += " _containerHeight=[" + _containerHeight + "]";
	_debugMsg += " _containerWidth=[" + _containerWidth + "]";
	_debugMsg += " _contentsHeight=[" + _contentsHeight + "]";
	_debugMsg += " _contentsWidth=[" + _contentsWidth + "]";
	_debugMsg += " _contentsLeft=[" + _contentsLeft + "]";
	_debugMsg += " _contentsTop=[" + _contentsTop + "]";
	//_contentsComp.innerHTML = _debugMsg;
	
	//check the dir
	switch (_dir) {
		case "ltr":
			_contentsLeft += _dist;
			if ((_contentsLeft + _dist) >= _containerWidth) {
				_contentsLeft = 0;
			}
			_contentsComp.style.left = _contentsLeft + "px";
			break;
		case "rtl":
			_contentsLeft -= _dist;
			if (Math.abs(_contentsLeft) >= _containerWidth) {
				_contentsLeft = _containerWidth - _topLeftMargin;
			}
			_contentsComp.style.left = _contentsLeft + "px";
			break;
		case "ttb":
			_contentsTop += _dist;
			if ((_contentsTop + _dist) >= _containerHeight) {
				_contentsTop = 0;
			}
			_contentsComp.style.top = _contentsTop + "px";
			break;
		case "btt":
			_contentsTop -= _dist;
			if (Math.abs(_contentsTop) >= _containerHeight) {
				_contentsTop = _containerHeight - _topLeftMargin;
			}
			_contentsComp.style.top = _contentsTop + "px";
			break;
	}
}
