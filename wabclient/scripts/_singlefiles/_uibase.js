
if(typeof UiBase!=='function') {
/**
 * A UiBase UI component
 * @param _extendedConfig - An array containing the extended configuration options for this component.
 * @param _compConfig - An array containing the configuration options for this component.
 * @return A UiBase UI component
 */
function UiBase(_extendedConfig,_compConfig) {
	//declare component members
	this._extConfig = _extendedConfig; 
	this._userConfig = _compConfig; 
	this.config = {}; 
	this._compHtml = null;
	this._initialized = false;
	this._isAutoId = false;
	
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
	this._alignComponent = function(_compId,_alignTo,_alignment) {
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
		if (_compId==null || _compId=="undefined" 
			|| _alignTo==null || _alignTo=="undefined" 
			|| _alignment==null || _alignment=="undefined" 
			) {
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
		$("#"+_compId).css('left',_newLeft);
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
		var _items = null;
		var _currItem = null;
		
		//check for a null configuration
		if (this.config==null || this.config=="undefined") {
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
		if (_config==null || _config=="undefined") {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onblur;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (_fhEvent==null || _fhEvent=="undefined") {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (_compId==null || _compId=="undefined") {
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
		if (this._isEmptyValue(_isDisabled)) {
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
		if (_config==null || _config=="undefined") {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onchange;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (_fhEvent==null || _fhEvent=="undefined") {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (_compId==null || _compId=="undefined") {
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
		if (this._isEmptyValue(_isDisabled)) {
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
		if (_config==null || _config=="undefined") {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onclick;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (_fhEvent==null || _fhEvent=="undefined") {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (_compId==null || _compId=="undefined") {
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
		if (this._isEmptyValue(_isDisabled)) {
			_isDisabled = false;
		}
		
		//attache the events
		_comp.onclick = function() {
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
	this._attachEvent_ondblclick = function() {
		//declare locals
		var _config = this.config;
		var _fhEvent = null;
		var _eventHandlerType = null;
		var _compId = null;
		var _comp = null;
		var _isDisabled = null;
		
		//check for a configuration object
		if (_config==null || _config=="undefined") {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.ondblclick;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (_fhEvent==null || _fhEvent=="undefined") {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (_compId==null || _compId=="undefined") {
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
		if (this._isEmptyValue(_isDisabled)) {
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
		if (_config==null || _config=="undefined") {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onerror;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (_fhEvent==null || _fhEvent=="undefined") {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (_compId==null || _compId=="undefined") {
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
		if (this._isEmptyValue(_isDisabled)) {
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
		if (_config==null || _config=="undefined") {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onfocus;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (_fhEvent==null || _fhEvent=="undefined") {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (_compId==null || _compId=="undefined") {
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
		if (this._isEmptyValue(_isDisabled)) {
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
		if (_config==null || _config=="undefined") {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onkeydown;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (_fhEvent==null || _fhEvent=="undefined") {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (_compId==null || _compId=="undefined") {
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
		if (this._isEmptyValue(_isDisabled)) {
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
		if (_config==null || _config=="undefined") {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onkeypress;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (_fhEvent==null || _fhEvent=="undefined") {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (_compId==null || _compId=="undefined") {
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
		if (this._isEmptyValue(_isDisabled)) {
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
		if (_config==null || _config=="undefined") {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onkeyup;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (_fhEvent==null || _fhEvent=="undefined") {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (_compId==null || _compId=="undefined") {
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
		if (this._isEmptyValue(_isDisabled)) {
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
		if (_config==null || _config=="undefined") {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onload;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (_fhEvent==null || _fhEvent=="undefined") {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (_compId==null || _compId=="undefined") {
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
		if (this._isEmptyValue(_isDisabled)) {
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
		if (_config==null || _config=="undefined") {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onmousedown;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (_fhEvent==null || _fhEvent=="undefined") {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (_compId==null || _compId=="undefined") {
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
		if (this._isEmptyValue(_isDisabled)) {
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
		if (_config==null || _config=="undefined") {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onmousemove;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (_fhEvent==null || _fhEvent=="undefined") {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (_compId==null || _compId=="undefined") {
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
		if (this._isEmptyValue(_isDisabled)) {
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
		if (_config==null || _config=="undefined") {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onmouseout;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (_fhEvent==null || _fhEvent=="undefined") {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (_compId==null || _compId=="undefined") {
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
		if (this._isEmptyValue(_isDisabled)) {
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
		if (_config==null || _config=="undefined") {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onmouseover;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (_fhEvent==null || _fhEvent=="undefined") {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (_compId==null || _compId=="undefined") {
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
		if (this._isEmptyValue(_isDisabled)) {
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
		if (_config==null || _config=="undefined") {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onmouseup;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (_fhEvent==null || _fhEvent=="undefined") {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (_compId==null || _compId=="undefined") {
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
		if (this._isEmptyValue(_isDisabled)) {
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
		if (_config==null || _config=="undefined") {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onreset;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (_fhEvent==null || _fhEvent=="undefined") {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (_compId==null || _compId=="undefined") {
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
		if (this._isEmptyValue(_isDisabled)) {
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
		if (_config==null || _config=="undefined") {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onresize;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (_fhEvent==null || _fhEvent=="undefined") {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (_compId==null || _compId=="undefined") {
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
		if (this._isEmptyValue(_isDisabled)) {
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
		if (_config==null || _config=="undefined") {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onselect;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (_fhEvent==null || _fhEvent=="undefined") {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (_compId==null || _compId=="undefined") {
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
		if (this._isEmptyValue(_isDisabled)) {
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
		if (_config==null || _config=="undefined") {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onsubmit;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (_fhEvent==null || _fhEvent=="undefined") {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (_compId==null || _compId=="undefined") {
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
		if (this._isEmptyValue(_isDisabled)) {
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
		if (_config==null || _config=="undefined") {
			return;
		}
		
		//get the event's type and handler
		_fhEvent = _config.onunload;
		_eventHandlerType = typeof(_fhEvent);
		
		//check for an event handler
		if (_fhEvent==null || _fhEvent=="undefined") {
			return;
		}
		
		//get the component's id
		_compId = _config.id;
		
		//check for nulls
		if (_compId==null || _compId=="undefined") {
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
		if (this._isEmptyValue(_isDisabled)) {
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
		if (_config==null || _config=="undefined") {
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
			if (_isDisabled==true) {
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
			if (_isDisabled==true) {
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
		if (_compId==null || _compId=="undefined") {
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
		if (_renderTo==null || _renderTo=="undefined" || _renderTo=="") {
			//do nothing
		}
		else {
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
		
		//add a new component style only if necessary
		if ($("#"+_compId).hasClass(_styleClassComp)) {
			$("#"+_compId).removeClass(_styleClassComp);
		}
		
		//set a new icon source if necessary
		if (_icon!="") {
			_imgComp = document.getElementById(_compId+"_icon");
			if (_imgComp!=null && _imgComp.src!=_icon) {
				_imgComp.src=_icon;
			}
		}
		
		//set the text's style if necessary
		if (_hasText==true) {
			_textComp = document.getElementById(_compId+"_text");
			if (_textComp!=null) {
				if ($("#"+_compId+"_text").hasClass(_styleClassText)) {
					$("#"+_compId+"_text").removeClass(_styleClassText);
				}
			}
		}
	};
	this._compMouseOver = function(_compId,_iconHover,_hasText,_styleClassComp,_styleClassText) {
		//declare locals
		var _imgComp = null;
		var _textComp = null;
		
		//add a new component style only if necessary
		if (!$("#"+_compId).hasClass(_styleClassComp)) {
			$("#"+_compId).addClass(_styleClassComp);
		}
		
		//set a new icon source if necessary
		if (_iconHover!="") {
			_imgComp = document.getElementById(_compId+"_icon");
			if (_imgComp!=null && _imgComp.src!=_iconHover) {
				_imgComp.src=_iconHover;
			}
		}
		
		//set the text's style if necessary
		if (_hasText==true) {
			_textComp = document.getElementById(_compId+"_text");
			if (_textComp!=null) {
				if (!$("#"+_compId+"_text").hasClass(_styleClassText)) {
					$("#"+_compId+"_text").addClass(_styleClassText);
				}
			}
		}
	};
	this._generateHtmlBase = function(_tagName,_compName) {
		//declare locals
		var _html = "";
		var _config = this.config;
		
		//check for nulls
		if (_tagName==null || _tagName=="undefined" 
			|| _compName==null || _compName=="undefined") {
			return "";
		}
		
		//check for a configuration object
		if (_config==null || _config=="undefined") {
			return "";
		}
		
		//start rendering the html tag
		_html = this._generateHtmlTag(_tagName,_compName);
		
		//render the icon and text
		_html += this._generateHtmlIconText();
		
		//render the inner HTML of the component
		if (this.config.html!=null && this.config.html!="") {
			_html += this.config.html;
		}
		
		//render the HTML for the child items
		_html += this._generateItemsHtml(this.config);
		
		//finish rendering the component
		_html += '</'+_tagName+'>';
		
		//save the html
		this._compHtml = _html;
		
		//return the method's value
		return _html;
	};
	this._generateHtmlIconText = function() {
		//declare locals
		var _html = "";
		
		//render the inner HTML of the component
		if (this.config.icon=="" && this.config.iconClass=="") {
			//check for a text
			if (this.config.text!="") {
				_html += this._renderTextCell();
			}
		}
		else {
			//check for a text
			if (this.config.text!="") {
				_html += '<table>';
				switch (this.config.iconPosition.toLowerCase()) {
					case "top":
						_html += "<tr>";
						_html += "<td>";
						_html += this._renderIconCell();
						_html += "</td>";
						_html += "</tr>";
						_html += "<tr>";
						_html += "<td>";
						_html += this._renderTextCell();
						_html += "</td>";
						_html += "</tr>";
						break;
					case "bottom":
						_html += "<tr>";
						_html += "<td>";
						_html += this._renderTextCell();
						_html += "</td>";
						_html += "</tr>";
						_html += "<tr>";
						_html += "<td>";
						_html += this._renderIconCell();
						_html += "</td>";
						_html += "</tr>";
						break;
					case "left":
						_html += "<tr>";
						_html += "<td>";
						_html += this._renderIconCell();
						_html += "</td>";
						_html += "<td>";
						_html += this._renderTextCell();
						_html += "</td>";
						_html += "</tr>";
						break;
					case "right":
						_html += "<tr>";
						_html += "<td>";
						_html += this._renderTextCell();
						_html += "</td>";
						_html += "<td>";
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
	this._generateHtmlTag = function(_tagName,_compName) {
		//declare locals
		var _html = "";
		var _config = this.config;
		var _style = this._getStyle();
		var _optName = null;
		var _optValue = null;
		var _optType = null;
		
		//check for nulls
		if (_tagName==null || _tagName=="undefined" 
			|| _compName==null || _compName=="undefined") {
			return "";
		}
		
		//check for a configuration object
		if (_config==null || _config=="undefined") {
			return "";
		}
		
		//render the start tag
		_html += '<'+_tagName;
		
		//loop through the config options
	    for (var option in _config) {
	    	//check for nulls
	        if (option==null 
		        || option=="" 
		        || option=="null" 
	        	|| option.toLowerCase()=="height" 
        		|| option.toLowerCase()=="html" 
		        || option.toLowerCase()=="id" 
		        || option.toLowerCase()=="items" 
		        || option.toLowerCase()=="width" 
	        	|| _config[option]==null 
	        	|| _config[option]=="undefined"  
        		|| _config[option]==""
            	|| _config[option]=="null"
	        	|| _config[option]<=0
	        	|| _config[option]==false 
	        	|| typeof (_config[option])=="function") {
	        	continue;
	        }
	        
	        //get the option's name, value, and type
	        _optName = option;
	        _optValue = _config[option];
	        _optType = typeof (_optValue);
	        
	        //fix option name if necessary
	        if (_optName.toLowerCase()=="classname") {
	        	_optName = "class";
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
	        
	        //render the current configuration attribute
	        _html += ' '+_optName+'="'+_optValue+'"';
	    }
		if (_style!=null && _style!="null" && _style!="") {
			_html += ' style="'+_style+'"';
		}
		
		//set the component's id
		if (_config.id==null || _config.id=="undefined" || _config.id=="" || _config.id=="null") {
			//generate an auto id
			this.config.id = _compName+(document.getElementsByName(_tagName).length+1);
			this._isAutoId = true;
		}
		
		//render the id attribute
		_html += ' id="'+this.config.id+'"';
		_html += ' name="'+this.config.id+'"';
		_html += '>';
		
		//return the method's value
		return _html;
	};
	this._generateItemsHtml = function(_containerConfig,_rows,_itemConfig) {
		//declare locals
		var _config = this.config;
		var _items = null;
		var _currItem = null;
		var _currItemWidth = null;
		var _html = "";
		var _containerAlignment = null;
		var _containerCellSpacing = null;
		var _containerWidth = null;
		var _itemAlignment = null;
		var _itemHeight = null;
		var _itemWidth = null;
		var _itemClass = null;
		var _itemStyle = "";
		
		//check for a configuration object
		if (_config==null || _config=="undefined") {
			return "";
		}
		
		//check for nulls
		if (_containerConfig==null || _containerConfig=="undefined") { 
			return "";
		}
		
		//set defaults if necessary
		if (_rows==null || _rows=="undefined") {
			_rows = false;
		}
		
		//check for child items
		_items = _config.items;
		if (_items==null || _items.length<1) {
			return "";
		}
		
		//get the parent's alignment
		//if (_containerConfig.align==null || _containerConfig.align=="undefined")
		_containerAlignment = this._getComponentAlignment(_containerConfig.align);
		
		//calculate the cellspacing
		_containerCellSpacing = _containerConfig.cellspacing;
		if (_containerCellSpacing==null || _containerCellSpacing=="undefined" 
			|| _containerCellSpacing=="" || _containerCellSpacing=="0") {
			_containerCellSpacing = 0;
		}
		
		//calculate the parent's width
		//if (_containerConfig.width==null || )
		_containerWidth = this._getSizeValue(_containerConfig.width);
		
		//start rendering the html
		_html += '<table cellpadding="0" cellspacing="'+_containerCellSpacing+'" align="'+_containerAlignment+'" style="width:'+_containerWidth+';';
		if (_containerConfig.style!=null && _containerConfig.style!="") {
			_html += _containerConfig.style;
		}
		_html += '">';
		if (_rows==false) {
			_html += '<tr>';
		}
		
		//loop through the child items
		for (var i=0;i<_items.length;i++) {
			//get the current child item
			_currItem = _items[i];
			
			//check for nulls
			if (_currItem==null) {
				continue;
			}
			
			//set the component's id
			if (_currItem._uibase.config.id==null || _currItem._uibase.config.id=="undefined" 
				|| _currItem._uibase.config.id=="" || _currItem._uibase.config.id=="null") {
				//generate an auto id
				_currItem._uibase.config.id = _containerConfig.id+_currItem._compName+i;
			}
			
			//get the current item's attributes
			_itemAlignment = this._getComponentAlignment(_currItem._uibase.config.align);
			
			//get the current item's class name
			if (_itemConfig!=null && _itemConfig!="undefined") {
				if (_itemConfig.height!=null && _itemConfig.height!="undefined") {
					_itemHeight = _itemConfig.height;
				}
				if (_itemConfig.width!=null && _itemConfig.width!="undefined") {
					_itemWidth = _itemConfig.width;
				}
				if (_itemConfig.className!=null && _itemConfig.className!="undefined") {
					_itemClass = _itemConfig.className;
				}
				if (_itemHeight!=null && _itemHeight!="" && _itemHeight>0) {
					_itemHeight = this._getSizeValue(_itemHeight);
					_itemStyle += 'height:'+_itemHeight+';';
				}
				if (_itemWidth!=null && _itemWidth!="" && _itemWidth>0) {
					_itemWidth = this._getSizeValue(_itemWidth);
					_itemStyle += 'width:'+_itemWidth+';';
				}
			}
			
			//render the current child item
			if (_rows==true) {
				_html += '<tr';
				if (_itemStyle!=null && _itemStyle!="") {
					_html += ' style="'+_itemStyle+'"';
				}
				if (_itemClass!=null && _itemClass!="") {
					_html += ' class="'+_itemClass+'"';
				}
				_html += '>';
			}
			_html += '<td style="text-align:'+_itemAlignment+';vertical-align:middle;';
			if (_itemStyle!=null && _itemStyle!="") {
				_html += _itemStyle;
			}
			_currItemWidth = _currItem.getBaseUi().config.width;
			if (!this._isEmptyValue(_currItemWidth)) {
				_currItemWidth = this._getSizeValue(_currItemWidth);
				_currItem.getBaseUi().config.width = "100%";
				_html += 'width:'+_currItemWidth+';';
			}
			_html += '"';
			if (_itemClass!=null && _itemClass!="") {
				_html += ' class="'+_itemClass+'"';
			}
			_html += '>';
			_html += _currItem._generateHtml();
			_html += '</td>';
			if (_rows==true) {
				_html += '</tr>';
			}
		}
		if (_rows==false) {
			_html += '</tr>';
		}
		_html += '</table>';
		
		//return the method's value
		return _html;
	};	
	this._getBaseDefaultConfig = function() {
		//declare locals
		var _dc = {
			accessKey: ""
			,accept: ""
			,action: ""
			,align: ""
			,alt: ""
			,border: null
			,cellpadding: null
			,cellspacing: null
			,checked: false
			,className: ""
			,classNameHover: ""
			,cols: null
			,coords: ""
			,dir: "ltr"
			,disabled: false
			,enctype: ""
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
			,maxlength: null
			,method: ""
			,multiple: false
			,readonly: false
			,renderTo: ""
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
	this._getComponentAlignment = function(_align) {
		//declare locals
		var _compAlign = null;
		
		//set defaults if necessary
		if (_align==null || _align=="" || _align=="null") {
			_align = "left";
			_compAlign = "left";
		}
		
		//check the align
		switch (_align.toLowerCase()) {
			case "left":
			case "west":
				_compAlign = "left";
				break;
			case "right":
			case "east":
				_compAlign = "right";
				break;
			case "center":
			case "middle":
				_compAlign = "center";
				break;
		}
		
		//set defaults if necessary
		if (_compAlign==null) {
			_compAlign = "left";
		}
		
		//return the method's value
		return _compAlign;
	};
	this._getNumericValue = function(_value) {
		//declare locals
		var _retNum = 0;
		var _indexSuffix = -1;
		var _numValue = null;
		
		//check for nulls
		if (_value==null || _value=="undefined" || _value=="" || _value=="null") {
			return 0;
		}
		
		//check the value's type
		if (typeof _value == "number") {
			return _value;
		}
		else if (typeof _value == "string") {
			//check for a number
			if (isNaN(_value)) {
				//check for a "%", or a "px" suffix
				_indexSuffix = _value.indexOf("%");
				if (_indexSuffix==-1) {
					_indexSuffix = _value.indexOf("px");
					if (_indexSuffix==-1) {
						return 0;
					}
					else {
						_numValue = _value.substring(0,_indexSuffix);
					}
				}
				else {
					_numValue = _value.substring(0,_indexSuffix);
				}
			}
			else {
				_numValue = _value;
			}
			
			//check for a numeric string
			if (_numValue==null) {
				return 0;
			}
			
			//parse the numeric string into a number
			if (_numValue.indexOf(".")==-1) {
				_retNum = parseInt(_numValue);
			}
			else {
				_retNum = parseFloat(_numValue);
			}
		}
		else {
			return 0;
		}
		
		//return the method's value
		return _retNum;
	};
	this._getSizeValue = function(_sizeValue) {
		//declare locals
		var _strSize = null;
		
		//check the width, and height's prefix
		_strSize = _sizeValue;
		
		//check for nulls
		if (_strSize!=null && _strSize!="null") {
			if (!isNaN(_strSize)) {
				_strSize = String(_strSize);
			}
			if (_strSize.toLowerCase().indexOf("auto")==-1 && _strSize.indexOf("px")==-1 && _strSize.indexOf("%")==-1) {
				_strSize = _strSize+"px";
			}
			if (_strSize.toLowerCase()=="auto") {
				_strSize = "";
			}
		}
		
		//return the method's value
		return _strSize;
	};
	this._getStyle = function() {
		//declare locals
		var _config = this.config;
		var _strWidth = null;
		var _strHeight = null;
		var _style = "";
		
		//check for a configuration object
		if (_config==null || _config=="undefined") {
			return "";
		}
		
		//check the width, and height's prefix
		_strWidth = this._getSizeValue(_config.width);
		_strHeight = this._getSizeValue(_config.height);
		
		//check for nulls
		if (_strWidth!=null && _strWidth!="null" && _strWidth!="") {
			_style += 'width:'+_strWidth+';';
		}
		if (_strHeight!=null && _strHeight!="null" && _strHeight!="") {
			_style += 'height:'+_strHeight+';';
		}
		if (_config.style!=null && _config.style!="null" && _config.style!="") {
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
		if (_config==null || _config=="undefined") {
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
		var _retVal = false;
		var _config = this.config;
        var _currOptName = null;
        var _currOptValue = null;
        
		//check for a configuration object
		if (_config==null || _config=="undefined") {
			return true;
		}
		
		//check for nulls
		if (_configOptionName==null || _configOptionName=="undefined" || _configOptionName=="" || _configOptionName=="null") {
			return true;
		}
		
		//loop through the config options
	    for (var option in _config) {
	    	//check for nulls
	    	if (option==null) {
	    		continue;
	    	}
	    	
	    	//get the current option's name
	    	_currOptName = option;
	    	
	    	//check if this is the requested option
	    	if (_currOptName.toLowerCase()==_configOptionName.toLowerCase()) {
		    	//get the current option's value
		    	_currOptValue = _config[option];
		    	
	    		//get the return value
	    		_retVal = this._isEmptyValue(_currOptValue);
	    		break;
	    	}
	    }
		
		//return the method's value
		return _retVal;
	};
	this._isEmptyValue = function(_value) {
		//declare locals
		var _retVal = false;
		
		//check for a boolean type
        if (typeof _value=="boolean") {
        	return false;
        }
		
		//check for a boolean type
        if (typeof _value=="number") {
    		//check for nulls
    		if (_value<0) {
    			return true;
    		}
    		else {
    			return false;
    		}
        }
        
		//check for nulls
		if (_value==null || _value=="undefined" || _value=="" || _value=="null") {
			return true;
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
		if (_config==null || _config=="undefined") {
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
	this._renderHtml = function() {
		//declare locals
		var _config = this.config;
		var _renderTo = null;
		var _wrapperId = null;
		var _wrapper = null;
        
		//check for a configuration object
		if (_config==null || _config=="undefined") {
			return;
		}
		
		//check for a valid id
		if (_config.id==null || _config.id=="undefined" || _config.id=="" || _config.id=="null") {
			alert("UiBase._renderHtml(): Can not render HTML, since there is no _config.id attribute!!");
			return;
		}
		
		//set the wrapper's id
		_wrapperId = _config.id+"_wrapper";
		
		//render the component into its container
		if (_config.renderTo!="") {
			//get the container component
			_renderTo = document.getElementById(_config.renderTo);
			
			//check for nulls
			if (_renderTo!=null) {
				_renderTo.innerHTML = this._compHtml;
			}
		}
		else {
			//render the component into the <body> tag
			if (document.getElementById(_wrapperId)==null) {
				_wrapper = document.createElement("div");
				_wrapper.setAttribute("id",_wrapperId);
				_renderTo = document.getElementsByTagName("body")[0];
				_renderTo.appendChild(_wrapper);
			}
			_renderTo = document.getElementById(_wrapperId);
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
		_html += '<div id="'+this.getIconId()+'_cl" class="'+_iconClass+'" >';
		
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
		_html += '<span id="'+this.getTextId()+'" class="'+_styleClass+'">';
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
		
		//copy values from the defaultConfig to the configuration object 
	    for (var dcOption in _defaultConfig) {
	    	//get the current option's value
	    	_dcValue = _defaultConfig[dcOption];
	    	
	    	//check for nulls
	        if (_dcValue==null || _dcValue=="undefined") {
	        	continue;
	        }
	        
	        //update the configuration object
	    	this.config[dcOption] = _dcValue;
	    }
	    
	    //check for an extendedConfig object
	    if (_extConfig!=null && _extConfig!="undefined") {
			//copy values from the extendedConfig to the configuration object 
		    for (var extOption in _extConfig) {
		    	//get the current option's value
		    	_extValue = _extConfig[extOption];
		    	
		    	//check for nulls
		        if (_extValue==null || _extValue=="undefined" || _extValue=="") {
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
		        if (_ucValue==null || _ucValue=="undefined" || _ucValue=="") {
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
	this.getIconId = function() {
		//declare locals
		var _config = this.config;
		var _compIdSuffix = "_icon";
		
		//check for nulls
		if (_config==null || _config=="undefined") {
			return _compIdSuffix;
		}
		
		//check for an empty id
		if (_config.id==null || _config.id==null=="undefined" || _config.id==null || _config.id=="") {
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
		if (_config==null || _config=="undefined") {
			return _compIdSuffix;
		}
		
		//check for an empty id
		if (_config.id==null || _config.id==null=="undefined" || _config.id==null || _config.id=="") {
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
		var _compId = null;
		var _comp = null;
		var _prevClassName = null;
		
		//get the component's id
		_compId = this.getIconId()+"_cl";
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
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
	//initialize the component
	this._initBase();
};
};
