
if(typeof Clock!=='function'){
/**
 * A Clock UI component
 * @return A Clock UI component
 */
function Clock(_config) {
	//declare class members and defaults
	var _compPrefix = "clock";
	var _compId = null;
	var _prefixIndex = -1;
	var _currIndex = 0;
	var _comps = document.getElementsByTagName("div");
	if (_comps!=null && _comps.length>0) {
		for (var i=0;i<_comps.length;i++) {
			if (_comps[i].id) {
				_compId = _comps[i].id;
				_prefixIndex = _compId.indexOf(_compPrefix); 
				if (_prefixIndex!=-1) {
					_currIndex = _compId.substring(_prefixIndex+1);
					if (!isNaN(_currIndex)) {
						_currIndex = parseInt(_currIndex);
					}
				}
			} 
		}
	}
	this.compid = _compPrefix+(_currIndex+1); 
	//declare class members and defaults
	this._userConfig = _config; 
	this.config = {}; 
	this.CSS_ID = "_clockcss";
	this.CSS_FILE = "clock.css";
	this.DEFAULT_THEMES_PATH = "resources/themes/";
	this.DEFAULT_THEME = "black";
	this.DEFAULT_DIR = "ltr";
	this.DEFAULT_RENDER_TO = this.compid;
	this.DEFAULT_ALIGNMENT = "bottom";
	this.DEFAULT_ALIGN_TO = this.compid;
	this.DEFAULT_WIDTH = "";
	this.DEFAULT_SHOW_CONFIG = false;
	this.DIV_ID_CONFIG = this.compid+"_clockConfigDiv";
	this.BUTTON_ID_CONFIG_CONFIG = this.compid+"_clockButtonConfigConfig";
	this.BUTTON_ID_CONFIG_SAVE = this.compid+"_clockButtonConfigSave";
	this._initialized = false;
	this.DIV_ID_DATE = this.compid+"_clockDate";
	this.DIV_ID_TIME_DIV = this.compid+"_clockTimeDiv";
	this.DIV_ID_TIME = this.compid+"_clockTime";
	this.DEFAULT_CLOCK_FORMAT = "HH:mm:ss";
	this.DEFAULT_TOOLTIP_FORMAT = "E, MMMM dd, yyyy";
	this.DEFAULT_SHOW_TOOLTIP = true;
	this.DEFAULT_SHOW_BLINKER = false;
	this.DEFAULT_SERVER_TIME_URL = "";
	this.DEFAULT_SERVER_TIME_INTERVAL = 1000;
	this.intervalsMap = new Utils.Map();
	this.isTicking = false;
	this.isBlinking = false;
	this.reRender = function(_configOpts) {
		//check for nulls
		if (_configOpts!=null && _configOpts!="undefined") {
			//loop through the configuration options
			for (var opt in _configOpts) {
				//set the config option
				this.config[opt] = _configOpts[opt];
			}
		}
		
		//re-render the component
		this._rerenderComp();
	};
	this._init = function() {
		//check if the component was already initialize once
		if (this._initialized) {
			return;
		}
		
		//check for nulls
		if (this._userConfig!=null && this._userConfig!="undefined") {
			//set the component's configuration
			this._setConfig(this._userConfig);
			if (this._userConfig.labels!=null && this._userConfig.labels!="undefined") {
				this._setLabels(this._userConfig.labels);
			}
			
			//re-render the component
			this._rerenderComp();
			
			//reset the init flag
			this._initialized = true;
		}
	};
	this._rerenderComp = function() {
		//stop the clock
		if (__uiComp._isClockTicking()) {
			__uiComp._stopClock();
		}
		if (__uiComp._isClockBlinking()) {
			__uiComp._stopBlinker();
		}
		
		//render the component
		__uiComp._renderComponent();
		
		//attach events
		__uiComp._attachEvents();
		
		//refresh the component
		__uiComp._refreshComp();
		
		//restart the blinker if necessary
		if (__uiComp.config.format.indexOf(":")!=-1) {
			if (this.DEFAULT_SHOW_BLINKER) {
				__uiComp._startBlinker();
			}
		}
		
		//restart the clock
		__uiComp._startClock();
	};
	this._getDefaultConfig = function() {
		//declare locals
		var dc = {
			id: this.compid
			,themesPath: this.DEFAULT_THEMES_PATH
			,dir: this.DEFAULT_DIR
			,theme: this.DEFAULT_THEME
			,renderTo: this.DEFAULT_RENDER_TO
			,alignment: this.DEFAULT_ALIGNMENT
			,alignTo: this.DEFAULT_ALIGN_TO
			,width: this.DEFAULT_WIDTH
			,showConfig: this.DEFAULT_SHOW_CONFIG
			,labels: this._getDefaultLabels()
		};
		
		//return the method's value
		return dc;
	};
	this._getDefaultLabels = function() {
		//declare locals
		var dl = {
		};
		
		//return the method's value
		return dl;
	};
	this._getDefaultConfigExtended = function() {
		//declare locals
		var dce = {
			format: this.DEFAULT_CLOCK_FORMAT
			,showTooltip: this.DEFAULT_SHOW_TOOLTIP
			,tooltipFormat: this.DEFAULT_TOOLTIP_FORMAT
			,serverTimeUrl: this.DEFAULT_SERVER_TIME_URL
			,serverTimeInterval: this.DEFAULT_SERVER_TIME_INTERVAL
			//TODO: set additional configuration options here
		};
		
		//return the method's value
		return dce;
	};
	this._getConfigOptions = function() {
		//declare locals
		var dcOpts = [
		    ["id","Id","lblId","label","string"]
		 	,["renderTo","Render To","txtRenderTo","textbox","string"]
			,["dir","Direction","nbCmdDir","select","string",["ltr;Left To Right","rtl;Right To Left"]]
			,["alignment","Alignment","nbCmbAlign","select","string",["top;Top","bottom;Bottom","left;Left","right;Right"]]
			,["alignTo","Align To","lblAlignTo","label","string"]
			,["format","Format","txtFormat","textbox","string"]
			,["showTooltip","Show Tooltip","cbShowTooltip","checkbox","boolean"]
			,["tooltipFormat","Tooltip Format","txtTooltipFormat","textbox","string"]
			,["serverTimeInterval","Clock Interval","txtSTimeInterval","textbox","int"]
			//,["showBlinker","Show Blinker","cbShowBlinker","checkbox","boolean"]
			//,["serverTimeUrl","Server Time Url","txtSTimeUrl","textbox","string"]
		];
		
		//return the method's value
		return dcOpts;
	};
	this._setLabels = function(_labels) {
		//declare locals
		var dl = this._getDefaultLabels();
		
		//check for nulls
		if (_labels!=null && _labels!="undefined") {
		    for (var option in dl) {
		        if (dl[option] == "undefined") {
		        	continue;
		        }
		        if (typeof dl[option] == typeof _labels[option]) {
		        	this.config.labels[option] = _labels[option];
		        }
		        else {
		        	this.config.labels[option] = dl[option];
		        }
		    }
		}
	};
	this._setConfig = function(_config) {
		//declare locals
		var dc = this._getDefaultConfig();
		var dce = this._getDefaultConfigExtended();
		
		//check for nulls
		if (_config!=null && _config!="undefined") {
		    for (var option in dc) {
		        if (dc[option] == "undefined") {
		        	continue;
		        }
		        if (dc[option]==null) {
		        	this.config[option] = _config[option];
		        }
		        else if (typeof dc[option] == typeof _config[option]) {
		        	this.config[option] = _config[option];
		        }
		        else {
		        	this.config[option] = dc[option];
		        }
		    }
		    for (var option in dce) {
		        if (dce[option] == "undefined") {
		        	continue;
		        }
		        if (dce[option]==null) {
		        	this.config[option] = _config[option];
		        }
		        else if (typeof dce[option] == typeof _config[option]) {
		        	this.config[option] = _config[option];
		        }
		        else {
		        	this.config[option] = dce[option];
		        }
		    }
		}
	};
	this._renderConfigButton = function() {
		//declare locals
		var _html = "";
		var _imagesPath = this._getImagesPath();
		var _imageSource = _imagesPath + "config.png";
		var _configDivId = this.DIV_ID_CONFIG;
		var _buttonId = this.BUTTON_ID_CONFIG_CONFIG;
		
		//check the configuration option
		if (this.config.showConfig==true) {
			_html += "<td class=\"clockConfigColumn\">";
			_html += "<img id=\""+_buttonId+"\" title=\"Settings\" src=\""+_imageSource+"\" class=\"clockConfigButton\"/>";
			_html += "</td>";
		}
		
		//return the method's value
		return _html;
	};
	this._renderConfigDiv = function() {
		//declare locals
		var _html = "";
		var _imagesPath = this._getImagesPath();
		var _imageSource = _imagesPath + "save.png";
		var _configDivId = this.DIV_ID_CONFIG;
		var _buttonId = this.BUTTON_ID_CONFIG_SAVE;
		var _arrOpts = this._getConfigOptions();
		
		//check the configuration option
		if (this.config.showConfig==true) {
			_html += "<div id=\""+_configDivId+"\" class=\"clockConfigDiv\">";
			_html += "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
			_html += "<tr>";
			_html += "<td class=\"clockConfigHeaderRow\">";
			_html += "<div class=\"clockConfigHeader\">";
			_html += "Settings";
			_html += "</div>";
			_html += "</td>";
			_html += "</tr>";
			_html += "<tr>";
			_html += "<td>";
			_html += "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
			_html += "<tr>";
			_html += "<td class=\"clockConfigOptionsOptionColumnHeader\">";
			_html += "Option";
			_html += "</td>";
			_html += "<td class=\"clockConfigOptionsValueColumnHeader\">";
			_html += "Value";
			_html += "</td>";
			_html += "</tr>";
			_html += "<tr>";
			_html += "<td colspan=\"2\">";
			_html += "<div class=\"clockConfigBodyDiv\">";
			_html += "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
			//loop through the options array
			for (var i=0;i<_arrOpts.length;i++) {
				_html += this._renderConfigComponent(_arrOpts[i]);
			}
			_html += "</table>";
			_html += "</div>";
			_html += "</table>";
			_html += "</td>";
			_html += "</tr>";
			_html += "<tr>";
			_html += "<td class=\"clockConfigFooterRow\">";
			_html += "<div class=\"clockConfigFooter\">";
			_html += "<img id=\""+_buttonId+"\" title=\"Save\" class=\"clockConfigButton\" src=\""+_imageSource+"\"/>";
			_html += "</div>";
			_html += "</td>";
			_html += "</tr>";
			_html += "</table>";
			_html += "</div>";
		}
		
		//return the method's value
		return _html;
	};
	this._renderConfigComponent = function(_compArr) {
		//declare locals
		var _html = "";
		var _compOpt = null;
		var _compLabel = null;
		var _compId = null;
		var _compType = null;
		var _compValueType = null;
		var _compValue = null;
		var _compValues = null;
		var _arrOptKeyVal = null;
		var _optLabel = null;
		var _optValue = null;
		
		//check for a valid input
		if (_compArr.constructor.toString().indexOf("Array") == -1) {
			return _html;
		}
		if (_compArr.length < 5) {
			return _html;
		}
		
		//get the array's items
		_compOpt = _compArr[0];
		_compLabel = _compArr[1];
		_compId = this.compid+_compArr[2];
		_compType = _compArr[3];
		_compValueType = _compArr[4];
		if (_compArr.length > 5) {
			_compValues = _compArr[5];
		}
		
		//get the component's value
		if (_compType.toLowerCase()=="labelbox") {
			_compValue = this.config.labels[_compOpt];
		}
		else {
			_compValue = this.config[_compOpt];
		}

		//render the component
		_html += "<tr class=\"clockConfigRow\">";
		_html += "<td class=\"clockConfigOptionsOptionColumn\">";
		if (_compType=="checkbox") {
			_html += "<label class=\"clockConfigFieldLabel\" for=\""+_compId+"\">";
			_html += _compLabel;
			_html += "</label>";
		}
		else {
			_html += _compLabel;
		}
		_html += "</td>";
		_html += "<td>";
		_html += "<div class=\"clockConfigOptionsHSpace\">";
		_html += "</div>";
		_html += "</td>";
		_html += "<td class=\"clockConfigOptionsValueColumn\">";
		//check the component's type
		switch (_compType) {
			case "select":
				_html += "<select id=\""+_compId+"\" size=\"1\">";
				for (var i=0;i<_compValues.length;i++) {
					//get the current option's value and label
					_arrOptKeyVal = _compValues[i].split(";");
					if (_arrOptKeyVal==null || _arrOptKeyVal.length<2) {
						continue;
					}
					_optValue = _arrOptKeyVal[0];
					_optLabel = _arrOptKeyVal[1];
					
					//render the current option
					_html += "<option value=\""+_optValue+"\"";
					if (_optValue==_compValue) {
						_html += " selected=\"selected\"";
					}
					_html += ">";
					_html += _optLabel;
					_html += "</option>";
				}
				_html += "</select>";
				break;
			case "checkbox":
				_html += "<input id=\""+_compId+"\" type=\""+_compType+"\"";
				if (_compValue) {
					_html += " checked=\"checked\"";
				}
				_html += " value=\""+_compValue+"\"/>";
				break;
			case "label":
				_html += "<label id=\""+_compId+"\" class=\"clockConfigFieldLabel\">";
				_html += _compValue;
				_html += "</label>";
				break;
			case "labelbox":
			case "textbox":
				if (typeof _compValue == "string") {
					if (_compValue.indexOf('"')!=-1) {
						_compValue = _compValue.replace(/"/g,"&quot;");
						_compValue = _compValue.replace(/</g,"&lt;");
						_compValue = _compValue.replace(/>/g,"&gt;");
					}
				}
				_html += "<input id=\""+_compId+"\" type=\""+_compType+"\"";
				_html += " value=\""+_compValue+"\"";
				_html += " size=\"10\"/>";
				break;
		}
		_html += "</td>";
		_html += "</tr>";
		
		//return the method's value
		return _html;
	};
	this._isValidRefreshConfig = function() {
		//declare locals
		var _confOpts = this._getConfigOptions();
		var _compArr = null;
		var _compObj = null;
		var _compOpt = null;
		var _compLabel = null;
		var _compId = null;
		var _compValueType = null;
		var _compValue = null;
		var _isValid = true;
		var _styleError = "clockConfigFieldError";
		
		//loop through the config options
		for (var i=0;i<_confOpts.length;i++) {
			//get the current item
			_compArr = _confOpts[i];
			
			//check for a valid input
			if (_compArr.constructor.toString().indexOf("Array") == -1) {
				return false;
			}
			if (_compArr.length < 5) {
				return false;
			}
			
			//get the array's items
			_compOpt = _compArr[0];
			_compLabel = _compArr[1];
			_compId = this.compid+_compArr[2];
			_compValueType = _compArr[4];
			
			//get the component by its id
			_compObj = document.getElementById(_compId);
			
			//check for nulls
			if (_compObj==null || _compObj=="undefined") {
				return false;
			}
			
			//get the component's value
			_compValue = _compObj.value;
			
			//check the value's type
			switch (_compValueType.toLowerCase()) {
				case "int":
					if (isNaN(_compValue)) {
						if (!$("#"+_compId).hasClass(_styleError)) {
							$("#"+_compId).addClass(_styleError);
						}
						_isValid = false;
						alert(_compLabel + " must contain a valid integer");
					}
					else {
						if ($("#"+_compId).hasClass(_styleError)) {
							$("#"+_compId).removeClass(_styleError);
						}
					}
					break;
			}
			
			//check for the valid flag
			if (!_isValid) {
				break;
			}
		}
		
		//return the method's value
		return _isValid;
	};
	this._refreshConfig = function() {
		//declare locals
		var _confOpts = this._getConfigOptions();
		var _compArr = null;
		var _compObj = null;
		var _compOpt = null;
		var _compId = null;
		var _compValueType = null;
		var _compValue = null;
		var _rerender = true;
		var _compType = null;
		
		//loop through the config options
		for (var i=0;i<_confOpts.length;i++) {
			//get the current item
			_compArr = _confOpts[i];
			
			//check for a valid input
			if (_compArr.constructor.toString().indexOf("Array") == -1) {
				return;
			}
			if (_compArr.length < 5) {
				return;
			}
			
			//get the array's items
			_compOpt = _compArr[0];
			_compId = this.compid+_compArr[2];
			_compType = _compArr[3];
			_compValueType = _compArr[4];
			
			//get the component by its id
			_compObj = document.getElementById(_compId);
			
			//check for nulls
			if (_compObj==null || _compObj=="undefined") {
				return;
			}
			
			//get the component's value
			_compValue = _compObj.value;
			
			//check the value's type
			switch (_compValueType.toLowerCase()) {
				case "boolean":
					_compValue = _compObj.checked;
					break;
				case "int":
					if (isNaN(_compValue)) {
						_compValue = 0;
					}
					else {
						_compValue = parseInt(_compValue);
					}
					break;
			}
			
			//check the rerender flag
			if (!_rerender) {
				break;
			}
			
			//set the correct config option
			if (_compType.toLowerCase()=="label") {
				this.config.labels[_compOpt] = _compValue;
			}
			else {
				this.config[_compOpt] = _compValue;
			}
		}
	};
	this._configSaved = function() {
		//declare locals
		var _configDivId = __uiComp.DIV_ID_CONFIG;
		var _isValid = false;
		
		//check for a valid configuration
		_isValid = __uiComp._isValidRefreshConfig();
		
		//check the valid flag
		if (_isValid) {
			//hide the config div
			$("#"+_configDivId).slideUp('slow');
			
			//refresh the configuration
			__uiComp._refreshConfig();
			
			//re-render the component
			__uiComp._rerenderComp();
		}
	};
	this._attachConfigMouseEvent = function(_compId) {
		var _comp = null;
		var _hoverClass = "clockConfigButtonHover";
		
		//check the configuration option
		if (this.config.showConfig==true) {
			//get elements by their ids
			_comp = document.getElementById(_compId);
			
			//check for nulls
			if (_comp==null || _comp=="undefined") {
				return;
			}
			
			//attache the events
			_comp.onmouseover = function() {
				//invoke the function handler
				if (!$("#"+_compId).hasClass(_hoverClass)) {
					$("#"+_compId).addClass(_hoverClass);
				}
			};			
			_comp.onmouseout = function() {
				//invoke the function handler
				if ($("#"+_compId).hasClass(_hoverClass)) {
					$("#"+_compId).removeClass(_hoverClass);
				}
			};			
		}
	};
	this._attachConfigClickEvent = function() {
		//declare locals
		var _buttonId = this.BUTTON_ID_CONFIG_CONFIG;
		var _configDivId = this.DIV_ID_CONFIG;
		var _button = null;
		var _buttonTop = 0;
		var _buttonLeft = 0;
		var _buttonHeight = 0;
		var _buttonWidth = 0;
		var _configWidth = 0;
		var _configHeight = 0;
		var _docHeight = 0;
		var _configTop = 0;
		var _configLeft = 0;
		var _verticalSpace = 10;
		var _horizontalSpace = 10;
		
		//check the configuration option
		if (this.config.showConfig==true) {
			//get elements by their ids
			_button = document.getElementById(_buttonId);
						
			//attache the events
			_button.onclick = function() {
				//calculate position
				_buttonTop = $("#"+_buttonId).offset().top;
				_buttonLeft = $("#"+_buttonId).offset().left;
				_buttonHeight = $("#"+_buttonId).height();
				_buttonWidth = $("#"+_buttonId).outerWidth();
				_configWidth = $("#"+_configDivId).width();
				_configHeight = $("#"+_configDivId).height();
				_docHeight = $(document).height();
				_configTop = _buttonTop+_buttonHeight+_verticalSpace;
				if (document.all) {
					if (__uiComp.config.dir=="ltr") {
						_configLeft = _buttonLeft-_configWidth;
					}
					else {
						_configLeft = _buttonLeft;
					}
				}
				else {
					if (__uiComp.config.dir=="ltr") {
						_configLeft = _buttonLeft-_configWidth;;
						if (_configLeft<0) {
							_configLeft = _buttonLeft;
						}
					}
					else {
						_configLeft = _buttonLeft;
					}
				}
				$("#"+_configDivId).css('top',_configTop);
				$("#"+_configDivId).css('left',_configLeft);
				
				//handle event
				var msg = "_buttonLeft=["+_buttonLeft+"]";
				msg += "\n_buttonTop=["+_buttonTop+"]";
				msg += "\n_buttonHeight=["+_buttonHeight+"]";
				msg += "\n_buttonWidth=["+_buttonWidth+"]";
				msg += "\n_configLeft=["+_configLeft+"]";
				msg += "\n_configWidth=["+_configWidth+"]";
				msg += "\n_configTop=["+_configTop+"]";
				msg += "\n_configHeight=["+_configHeight+"]";
				msg += "\n_docHeight=["+_docHeight+"]";
				//alert(msg);
				if ($("#"+_configDivId).css("display")=="none") {
					if ((_configTop+_configHeight)>_docHeight) {
						$("#"+_configDivId).slideUp('slow');
					}
					else {
						$("#"+_configDivId).slideDown('slow');
					}
				}
				else {
					if ((_configTop+_configHeight)>_docHeight) {
						$("#"+_configDivId).slideDown('slow');
					}
					else {
						$("#"+_configDivId).slideUp('slow');
					}
				}
			};			
		}
	};
	this._attachConfigSaveClickEvent = function() {
		var _buttonId = this.BUTTON_ID_CONFIG_SAVE;
		var _button = null;
		var _fh = null;
		
		//check the configuration option
		if (this.config.showConfig==true) {
			//get elements by their ids
			_button = document.getElementById(_buttonId);
			
			//set the function handler
			_fh = this._configSaved;
			
			//attache the events
			_button.onclick = function() {
				//invoke the function handler
				_fh();
			};
		}
	};
	this._attachConfigEvents = function() {
		//declare locals
		var _arrIds = null;
		
		//check the configuration option
		if (this.config.showConfig==true) {
			//create a new array
			_arrIds = new Array(
				this.BUTTON_ID_CONFIG_CONFIG
				,this.BUTTON_ID_CONFIG_SAVE
			);
			
			//attache events in a loop
			for (var i=0;i<_arrIds.length;i++) {
				this._attachConfigMouseEvent(_arrIds[i]);
			}
			this._attachConfigClickEvent();
			this._attachConfigSaveClickEvent();
		}
	};
	this._attachClockMouseEvent = function() {
		var _compId = this.DIV_ID_TIME_DIV;
		var _comp = null;
		var _divId = this.DIV_ID_DATE;
		var _fhMouseOver = null;
		var _fhMouseOut = null;
		
		//check the configuration option
		if (this.config.showTooltip==true) {
			//get elements by their ids
			_comp = document.getElementById(_compId);
			
			//check for nulls
			if (_comp==null || _comp=="undefined") {
				return;
			}
			
			//set the correct function handlers
			_fhMouseOver = this._clockMouseOver;
			_fhMouseOut = this._clockMouseOut;
			
			//attache the events
			_comp.onmouseover = function() {
				//invoke the function handler
				_fhMouseOver(__uiComp);
			};			
			_comp.onmouseout = function() {
				//invoke the function handler
				_fhMouseOut(_divId);
			};			
		}
	};
	this._clockMouseOver = function(_compObj) {
		//declare locals
		var _now = new Date();
		var _compId = null;
		var _tooltipId = null;
		var _dateFormat = null;
		var _tooltipComp = null;
		var _currDate = null;
		var tooltipHeight = 0;
		var tooltipWidth = 0;
		var tooltipLeft = 0;
		var tooltipTop = 0;
		var clockLeft = 0;
		var clockTop = 0;
		
		//check for nulls
		if (_compObj==null || _compObj=="undefined" || (typeof _compObj!="object")) {
			return;
		}
		
		//initialize variables
		_compId = _compObj.compid;
		_tooltipId = _compObj.DIV_ID_DATE;
		_dateFormat = _compObj.config.tooltipFormat;
		
		//get elements by their ids
		_tooltipComp = document.getElementById(_tooltipId);
		
		//check for a valid component
		if (_tooltipComp==null || _tooltipComp=="undefined" || _tooltipComp=="") {
			return;
		}
		
		//get the component's inner html
		_currDate = Utils.formatDateTime(_now,_dateFormat);
		$("#"+_tooltipId).html(_currDate);
		
		//caclculate the tooltip's width based on its format
		if (_currDate.length>10) {
			tooltipWidth = (_currDate.length * 6.5);
			$("#"+_tooltipId).width(tooltipWidth);
		}
		
		//calculate the component's position
		clockLeft = $("#"+_compId).position().left; 
		clockTop = $("#"+_compId).position().top;
		tooltipHeight = $("#"+_tooltipId).height();
		tooltipTop = clockTop - tooltipHeight - 5;
		tooltipWidth = $("#"+_tooltipId).width();
		tooltipLeft = clockLeft - (tooltipWidth/1.7);
		if (tooltipLeft<0) {
			tooltipLeft = clockLeft; 
		}
		
		//show the component
		$("#"+_tooltipId).css("left",tooltipLeft);
		$("#"+_tooltipId).css("top",tooltipTop);
		$("#"+_tooltipId).show();
	};
	this._clockMouseOut = function(_compId) {
		//declare locals
		var _tooltipComp = null;
		
		//check for nulls
		if (_compId==null || _compId=="undefined" 
			|| (typeof _compId != "string") || _compId=="") {
			return;
		}
		
		//get elements by their ids
		_tooltipComp = document.getElementById(_compId);
		
		//check for a valid component
		if (_tooltipComp==null || _tooltipComp=="undefined" || _tooltipComp=="") {
			return;
		}
		
		//show the component
		$("#"+_compId).hide();
	};
	this._alignComponent = function() {
		//declare locals
		var align = this.config.alignment;
		var alignToId = this.config.alignTo;
		var alignToComp = null;
		var alignToTop = 0;
		var alignToLeft = 0;
		var alignToHeight = 0;
		var alignToWidth = 0;
		var compTop = 0;
		var compLeft = 0;
		var compHeight = 0;
		var compWidth = 0;
		var _newTop = 0;
		var _newLeft = 0;
		
		//check if the alignTo is different than the container
		if (alignToId==null || alignToId=="" || alignToId==this.compid) {
			return;
		}
		
		//check for a valid alignToId component
		alignToComp = document.getElementById(alignToId);
		if (alignToComp==null || alignToComp=="undefined") {
			alert("Clock(): alignTo ["+alignToId+"] is an invalid component.");
			return;
		}
		
		//init variables
		alignToHeight = $("#"+alignToId).height();
		alignToWidth = $("#"+alignToId).width();
		alignToTop = $("#"+alignToId).position().top;
		alignToLeft = $("#"+alignToId).position().left;
		compHeight = $("#"+this.compid).height();
		compHeight = 34;
		compWidth = $("#"+this.compid).width();
		compTop = $("#"+this.compid).position().top;
		compLeft = $("#"+this.compid).position().left;
		var msg = "alignToHeight=["+alignToHeight+"]";
		msg += "\nalignToWidth=["+alignToWidth+"]";
		msg += "\nalignToTop=["+alignToTop+"]";
		msg += "\nalignToLeft=["+alignToLeft+"]";
		msg += "\ncompHeight=["+compHeight+"]";
		msg += "\ncompWidth=["+compWidth+"]";
		msg += "\ncompTop=["+compTop+"]";
		msg += "\ncompLeft=["+compLeft+"]";
		msg += "\nalign=["+align+"]";
		//alert(msg);
		
		//check the alignment
		switch (align.toLowerCase()) {
			case "top":
				_newTop = alignToTop - compHeight;
				_newLeft = alignToLeft;
				break;
			case "bottom":
				_newTop = alignToTop + alignToHeight;
				_newLeft = alignToLeft;
				break;
			case "left":
				_newTop = alignToTop;
				_newLeft = alignToLeft - compWidth;
				break;
			case "right":
				_newTop = alignToTop;
				_newLeft = alignToLeft + alignToWidth;
				break;
		}
		
		//set the component's position
		$("#"+this.compid).css('top',_newTop);
		$("#"+this.compid).css('left',_newLeft);
		$("#"+this.compid).css('position',"absolute");
	};
	this._getImagesPath = function() {
		//declare locals
		var _imagesPath = null;
		
		//set the return value
		_imagesPath = this._getThemesPath()+"_shared/images/";
		
		//return the method's value
		return _imagesPath;
	};
	this._getThemesPath = function() {
		//declare locals
		var _themesPath = null;
		
		//set the return value
		_themesPath = this.config.themesPath;
		
		//return the method's value
		return _themesPath;
	};
	this._getCssHref = function(_theme) {
		//declare locals
		var cssHref = null;
		
		//check for nulls
		if (_theme==null || _theme=="undefined" || _theme=="") {
			return;
		}
		
		//set the return value
		cssHref = this._getThemesPath()+_theme+"/"+this.CSS_FILE;
		
		//return the method's value
		return cssHref;
	};
	this._renderCss = function() {
		//declare locals
		var _linkComp = null;
		var _linkTag = "link";
		var _scriptTag = "script";
		var _arrScripts = null;
		var _parent = null;
		var _newHref = null;
		var _currHref = null;
		var _currTheme = null;
		
		//get the current theme
		_newHref = this._getCssHref(this.config.theme);
		
		//render the component's css link
		_linkComp = document.getElementById(this.CSS_ID);
		if (_linkComp==null) {
			//get all script tags
			_arrScripts = document.getElementsByTagName(_scriptTag);
			
			//check for nulls
			if (_arrScripts==null || _arrScripts.length==0) {
				return;
			}
			
			//get the first script's parent node (the <head> tag)
			_parent = _arrScripts[0].parentNode;
			
			_linkComp = document.createElement(_linkTag);
			_linkComp.setAttribute("id",this.CSS_ID);
			_linkComp.setAttribute("rel","stylesheet");
			_linkComp.setAttribute("type","text/css");
			
			//add the newly created link to the NodeList
			_parent.appendChild(_linkComp);
		}
		
		//reset the theme
		_currHref = _linkComp.href;
		if (_currHref==null || _currHref=="undefined" || _currHref!=_newHref) {
			_linkComp.href = _newHref;
		}
	};
	this._renderComponent = function() {
		//declare locals
		var _html = "";
		var _width = "";
		var _renderToId = this.config.renderTo;
		var _renderToComp = null;
		var _elem = null;
		
		//render the component's css
		this._renderCss();
		
		//render the component
		if (_renderToId==null || _renderToId=="") {
			_renderToId = this.compid;
		}
		_renderToComp = document.getElementById(_renderToId);
		if (_renderToComp==null) {
			_elem = document.createElement("div");
			_elem.setAttribute("id", this.compid);
			_elem.setAttribute("dir", this.config.dir);
			_elem.className = "clockComponent";
			if (this.config.width!="") {
				_elem.style.width = this.config.width;
			}
			document.getElementsByTagName("body")[0].appendChild(_elem);
		}
		
		//start rendering the component
		//_html += "<div id=\""+this.compid+"\" dir=\""+this.config.dir+"\""+_width+" class=\"clockComponent\">";
		_html += "<table class=\"clockTable\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
		_html += "<tr>";
		
		//render the component's parts
		_html += this._renderTime();
		
		//TODO: render other component parts here
		
		//render the configuration settings button
		_html += this._renderConfigButton();
		
		//finish rendering the component
		_html += "</tr>";
		_html += "</table>";
		//_html += "</div>";
		_html += this._renderConfigDiv();
		_html += this._renderDate();
		
		//render the component
		_renderToComp = document.getElementById(_renderToId);
		if (_renderToComp==null) {
			alert("clock.js._renderComponent(): _renderToId["+_renderToId+"] does NOT exist.");
			return;
		}
		_renderToComp.innerHTML = _html;
		
		//align the component
		this._alignComponent();
	};
	this._attachEvents = function() {
		this._attachClockMouseEvent();
		this._attachConfigEvents();
		//TODO: invoke additional _attachEvents functions here
	};
	this._refreshComp = function() {
	};
	this._startClock = function() {
		//declare locals
		var _methodName = "__refreshTime";
		var _monitorId = 1;
		var _intId = null;
		var _interval = this.config.serverTimeInterval;
		var _url = this.config.serverTimeUrl;
		var _compId = this.DIV_ID_TIME;
		var _format = this.config.format;
		
		//check for a server url
		if (!Utils.isEmpty(_url)) {
			_methodName = "__refreshTimeServer";
		}
		
		//create a new interval
		_intId = window.setInterval(_methodName+"(\'"+_compId+"\','"+_format+"','"+_url+"')",_interval);
		
		//update the map of intervals
		this.intervalsMap.put(_monitorId, _intId);
		
		//update the flag
		this.isTicking = true;
	};
	this._stopClock = function() {
		//declare locals
		var _monitorId = 1;
		var _intId = null;
		
		//get the interval from the map, by its key
		_intId = this.intervalsMap.get(_monitorId);
		
		//check for nulls
		if (_intId!=null) {
			//clear the interval
			window.clearInterval(_intId);
			
			//update the flag
			this.isTicking = false;
		}
	};
	this._isClockTicking = function() {
		//return the method's value
		return this.isTicking;
	};
	this._isClockBlinking = function() {
		//return the method's value
		return this.isBlinking;
	};
	this._startBlinker = function() {
		//declare locals
		var _methodName = "__blink";
		var _monitorId = 2;
		var _intId = null;
		var _interval = 1000;
		var _compId = this.DIV_ID_TIME+"_blinker";
		
		//create a new interval
		_intId = window.setInterval(_methodName+"(\'"+_compId+"\')",_interval);
		
		//update the map of intervals
		this.intervalsMap.put(_monitorId, _intId);
		
		//update the flag
		this.isBlinking = true;
	};
	this._stopBlinker = function() {
		//declare locals
		var _monitorId = 2;
		var _intId = null;
		
		//get the interval from the map, by its key
		_intId = this.intervalsMap.get(_monitorId);
		
		//check for nulls
		if (_intId!=null) {
			//clear the interval
			window.clearInterval(_intId);
			
			//update the flag
			this.isBlinking = false;
		}
	};
	this._renderDate = function() {
		//declare locals
		var _now = new Date();
		var _divId = null;
		var _dateFormat = null;
		var _currTime = "";
		var _html = "";
		
		//check the configuration option
		if (this.config.showTooltip==false) {
			return _html;
		}
		
		//start rendering the component
		_html += "<div id=\""+this.DIV_ID_DATE+"\" class=\"clockDateTooltip\">";
		
		//finish rendering the component
		_html += "</div>";
		
		//return the method's value
		return _html;
	};
	this._renderTime = function() {
		//declare locals
		var _now = new Date();
		var _divId = null;
		var _dateFormat = null;
		var _currTime = "";
		var _html = "";
		
		//start rendering the component
		_html += "<td class=\"clockTimeColumn\">";
		_html += "<table class=\"clockTable\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
		_html += "<tr>";
		
		//render the component itself
		_html += "<td>";
		_html += "<div id=\""+this.DIV_ID_TIME_DIV+"\" class=\"clockTimeDiv\">";
		_html += "<span id=\""+this.DIV_ID_TIME+"\" class=\"clockFont\">";
		_currTime = Utils.formatDateTime(_now,this.config.format);
		_html += _currTime;
		_html += "</span>";
		_html += "</div>";
		_html += "</td>";
		
		//finish rendering the component
		_html += "</tr>";
		_html += "</table>";
		_html += "</td>";
		
		//return the method's value
		return _html;
	};
	this.addReminder = function(_reminderDateTime) {
		//add the reminder to the reminders map
	};
	//define a global component instance
	var __uiComp = this;
	__uiComp._init();
};
};

function __refreshTimeView(_compId,_format,_time) {
	//declare locals
	var _blinkerId = null;
	var _html = null;
	
	//check for nulls
	if ((_compId==null || _compId=="undefined" || _compId=="") 
		|| (_format==null || _format=="undefined" || _format=="")
		|| (_time==null || _time=="undefined" || _time=="")) {
		return;
	}
	
	//set the blinker's id
	_blinkerId = _compId+"_blinker";
	
	//check for a blinker
	if (_time.indexOf(":")!=-1) {
		_html = "<span id=\""+_blinkerId+"\" style=\"visibility:visible;\">:</span>";
		_time = _time.replace(":",_html);
	}
	
	//refresh the component's html
	$("#"+_compId).html(_time);
}

function __refreshTime(_compId,_format,_url) {
	//declare locals
	var _now = new Date();
	var _currTime = "";
	
	//get the current formatted time
	_currTime = Utils.formatDateTime(_now,_format);

	//refresh the view
	__refreshTimeView(_compId,_format,_currTime);
}

function __refreshTimeServer(_compId,_format,_url) {
	//send an ajax request
	__sendAjaxRequest(_compId,_format,_url);
}

function __sendAjaxRequest(_compId,_format,_url) {
	//send an ajax request
	$.ajax({
		type:'POST'
		,url:_url
		,data: {
			"format": _format
		}
		,success: function(_response) {
			__serverTimeSuccess(_compId,_format,_response);
		}
		,failure: function(_response) {
			__serverTimeFailure(_response,_url);
		}
	});
}

function __serverTimeFailure(_response,_url) {
	//declare locals
	var message = null;
	
	//display a message
	message = 'An error occured while trying to fetch server time from url ['+_url+'].\nResponse is: '+_response.responseText+'.\nStatus is: '+_response.status;
	alert(message);
}

function __serverTimeSuccess(_compId,_format,_response) {
	//refresh the view
	__refreshTimeView(_compId,_format,_response);
}

function __blink(_blinkerId) {
	//declare locals
	var _blinkerComp = null;
	var _currVisibility = "hidden";
	var _newVisibility = null;
	
	//check for nulls
	if (_blinkerId==null || _blinkerId=="undefined" || _blinkerId=="") {
		return;
	}
	
	//get the blinking component
	_blinkerComp = document.getElementById(_blinkerId);
	
	//check for nulls
	if (_blinkerComp==null) {
		return;
	}
	
	//get the component's current visibility
	_currVisibility = _blinkerComp.style.visibility;
	
	//check the visibility
	if (_currVisibility.toLowerCase() == "visible") {
		_newVisibility = "hidden";
	}
	else {
		_newVisibility = "visible";
	}
	
	//set the component's new visibility
	_blinkerComp.style.visibility = _newVisibility;
}
