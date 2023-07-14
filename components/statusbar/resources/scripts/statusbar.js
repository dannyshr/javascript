
if(typeof Statusbar!=='function'){
/**
 * A Statusbar UI component
 * @return A Statusbar UI component
 */
function Statusbar(_container,_config) {
	//check for nulls, and valid values
	if (_container==null || _container=="undefined" || _container=='') {
		alert("statusbar.js Statusbar(): _container is null or empty.");
		return;
	}
	if (document.getElementById(_container)==null) {
		alert("statusbar.js Statusbar(): _container ["+_container+"] does NOT exists.");
		return;
	}
	if ((document.getElementById(_container).tagName.toLowerCase()!="div") 
		&& (document.getElementById(_container).tagName.toLowerCase()!="span")) {
		alert("statusbar.js Statusbar(): _container ["+_container+"] must be either a <div>, or a <span>.");
		return;
	}
	//declare class members and defaults
	this.container = _container; 
	this._userConfig = _config; 
	this.compid = "statusbar_"+this.container; 
	this.config = {}; 
	this.CSS_ID = "_statusbarcss";
	this.CSS_FILE = "statusbar.css";
	this.DEFAULT_THEMES_PATH = "resources/themes/";
	this.DEFAULT_THEME = "black";
	this.DEFAULT_DIR = "rtl";
	this.DEFAULT_ALIGNMENT = "bottom";
	this.DEFAULT_ALIGN_TO = this.container;
	this.DEFAULT_WIDTH = "";
	this.DEFAULT_HEIGHT = "40";
	this.DEFAULT_SHOW_CONFIG = false;
	this.DIV_ID_CONFIG = this.container+"_sbConfigDiv";
	this.BUTTON_ID_CONFIG_CONFIG = this.container+"_sbButtonConfigConfig";
	this.BUTTON_ID_CONFIG_SAVE = this.container+"_sbkButtonConfigSave";
	this._initialized = false;
	this._children = new Utils.Map();
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
	this.addComponent = function(_component,_setBorder) {
		//check for nulls
		if (_component==null || _component=="undefined" || _component=="" || (typeof _component != "string")) {
			return;
		}
		
		//set defaults if necessary
		if (_setBorder==null || _setBorder=="undefined") {
			_setBorder = false;
		}
		
		//push the component into the array of children
		this._children.put(_component,_setBorder);
		
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
		//render the component
		__uiComp._renderComponent();
		
		//attach events
		__uiComp._attachEvents();
		
		//refresh the component
		__uiComp._refreshComp();
	};
	this._getDefaultConfig = function() {
		//declare locals
		var dc = {
			themesPath: this.DEFAULT_THEMES_PATH
			,dir: this.DEFAULT_DIR
			,theme: this.DEFAULT_THEME
			,alignTo: this.DEFAULT_ALIGN_TO
			,showConfig: this.DEFAULT_SHOW_CONFIG
			,alignment: this.DEFAULT_ALIGNMENT
			,height: this.DEFAULT_HEIGHT
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
			//TODO: set additional configuration options here
		};
		
		//return the method's value
		return dce;
	};
	this._getConfigOptions = function() {
		//declare locals
		var dcOpts = [
			["dir","Direction","nbCmdDir","select","string",["ltr;Left To Right","rtl;Right To Left"]]
			,["alignment","Alignment","lblAlign","label","string"]
			,["alignTo","Align To","lblAlignTo","label","string"]
			,["height","Height","txtHeight","textbox","int"]
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
		        if (typeof dc[option] == typeof _config[option]) {
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
		        if (typeof dce[option] == typeof _config[option]) {
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
			_html += "<td class=\"sbConfigColumn\">";
			_html += "<img id=\""+_buttonId+"\" title=\"Settings\" src=\""+_imageSource+"\" class=\"sbConfigButton\"/>";
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
			_html += "<div id=\""+_configDivId+"\" class=\"sbConfigDiv\">";
			_html += "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
			_html += "<tr>";
			_html += "<td class=\"sbConfigHeaderRow\">";
			_html += "<div class=\"sbConfigHeader\">";
			_html += "Settings";
			_html += "</div>";
			_html += "</td>";
			_html += "</tr>";
			_html += "<tr>";
			_html += "<td>";
			_html += "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
			_html += "<tr>";
			_html += "<td class=\"sbConfigOptionsOptionColumnHeader\">";
			_html += "Option";
			_html += "</td>";
			_html += "<td class=\"sbConfigOptionsValueColumnHeader\">";
			_html += "Value";
			_html += "</td>";
			_html += "</tr>";
			_html += "<tr>";
			_html += "<td colspan=\"2\">";
			_html += "<div class=\"sbConfigBodyDiv\">";
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
			_html += "<td class=\"sbConfigFooterRow\">";
			_html += "<div class=\"sbConfigFooter\">";
			_html += "<img id=\""+_buttonId+"\" title=\"Save\" class=\"sbConfigButton\" src=\""+_imageSource+"\"/>";
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
		_compId = this.container+_compArr[2];
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
		_html += "<tr class=\"sbConfigRow\">";
		_html += "<td class=\"sbConfigOptionsOptionColumn\">";
		if (_compType=="checkbox") {
			_html += "<label class=\"sbConfigFieldLabel\" for=\""+_compId+"\">";
			_html += _compLabel;
			_html += "</label>";
		}
		else {
			_html += _compLabel;
		}
		_html += "</td>";
		_html += "<td>";
		_html += "<div class=\"sbConfigOptionsHSpace\">";
		_html += "</div>";
		_html += "</td>";
		_html += "<td class=\"sbConfigOptionsValueColumn\">";
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
				_html += "<label id=\""+_compId+"\" class=\"sbConfigFieldLabel\">";
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
		var _styleError = "sbConfigFieldError";
		
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
			_compId = this.container+_compArr[2];
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
			_compId = this.container+_compArr[2];
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
		var _hoverClass = "sbConfigButtonHover";
		
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
		var _animate = false;
		
		//check the configuration option
		if (this.config.showConfig==true) {
			//get elements by their ids
			_button = document.getElementById(_buttonId);
			
			//calculate position
			_buttonTop = $("#"+_buttonId).offset().top;
			_buttonLeft = $("#"+_buttonId).offset().left;
			_buttonHeight = $("#"+_buttonId).height();
			_buttonWidth = $("#"+_buttonId).outerWidth();
			_configWidth = $("#"+_configDivId).width();
			_configHeight = $("#"+_configDivId).height();
			_docHeight = $(document).height();
			_configTop = _buttonTop+_buttonHeight+_verticalSpace;
			_configLeft = _buttonLeft - _configWidth;
			if ((parseInt(_configLeft))<0) {
				_configLeft = _buttonLeft;
			}
			if ((_configTop+_configHeight)>_docHeight) {
				_animate = true;
				_configTop = _buttonTop-_configHeight-_verticalSpace;
			}
			else {
				_animate = false;
			}
			$("#"+_configDivId).css('top',_configTop);
			$("#"+_configDivId).css('left',_configLeft);
			
			//attache the events
			_button.onclick = function() {
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
					if (_animate) {
						$("#"+_configDivId).css('top',_buttonTop);
						$("#"+_configDivId).height(0);
						$("#"+_configDivId).animate({
							top: _configTop
							,height: _configHeight
						},"slow");
					}
					else {
						$("#"+_configDivId).slideDown('slow');
					}
				}
				else {
					if (_animate) {
						$("#"+_configDivId).hide();
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
	this._alignComponent = function() {
		//declare locals
		var align = this.DEFAULT_ALIGNMENT;
		var alignToId = this.config.alignTo;
		var alignToComp = null;
		var compBorderWidth = 2;
		var compBottomSpace = 1;
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
		
		//check for nulls
		if (alignToId==null || alignToId=="undefind" || alignToId=="" || (typeof alignToId != "string")) {
			alert("statusbar.js._alignComponent(): alignToId=["+alignToId+"] is invalid.");
			return;
		}
		
		//check for a valid alignToId component
		if (alignToId.toLowerCase()=="document" || alignToId.toLowerCase()=="window") {
			_newTop = 0;
			_newLeft = 0;
			compWidth = "99%";
			if (document.all) {
				compWidth = "100%";
			}
			$("#"+this.compid).css('bottom',_newTop);
			$("#"+this.compid).css('left',_newLeft);
			$("#"+this.compid).width(compWidth);
			$("#"+this.compid).css('position',"absolute");
			return;
		}
		else {
			alignToComp = document.getElementById(alignToId);
			if (alignToComp==null || alignToComp=="undefined") {
				alert("Clock(): alignTo ["+alignToId+"] is an invalid component.");
				return;
			}
		}
		
		//check if the alignTo is different than the container
		if (alignToId==this.container) {
			return;
		}
		
		//init variables
		alignToHeight = $("#"+alignToId).height();
		alignToWidth = $("#"+alignToId).width();
		alignToTop = $("#"+alignToId).position().top;
		alignToLeft = $("#"+alignToId).position().left;
		compWidth = $("#"+alignToId).innerWidth()-(compBorderWidth*2);
		if (document.all) {
			compWidth = $("#"+alignToId).innerWidth();
		}
		//compHeight = $("#"+this.compid).height();
		compHeight = this.config.height;
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
			case "bottom":
				_newTop = ((alignToTop + alignToHeight)-compHeight)-(compBorderWidth+compBottomSpace);
				if (document.all) {
					_newTop = ((alignToTop + alignToHeight)-compHeight)+compBorderWidth;
				}
				_newLeft = alignToLeft+1;
				break;
		}
		
		//set the component's position
		$("#"+this.compid).css('top',_newTop);
		$("#"+this.compid).css('left',_newLeft);
		$("#"+this.compid).width(compWidth);
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
		var _height = "";
		var _compStyle = "";
		var _currComp = null;
		var _currCompBorder = null;
		var _docElem = null;
		var _borderStyle = null;
		
		//render the component's css
		this._renderCss();
		
		//check for a width, and height
		if (this.config.width==null || this.config.width=="undefined" || this.config.width=="") {
			//do nothing
		}
		else {
			_width = "width:"+this.config.width+"px;";
		}
		if (this.config.height==null || this.config.height=="undefined" || this.config.height=="") {
			//do nothing
		}
		else {
			_height = "height:"+this.config.height+"px;";
		}
		if (_height!="" || _width!="") {
			_compStyle = " style=\""+_height+_width+"\"";
		}
		
		//start rendering the component
		_html += "<div id=\""+this.compid+"\" dir=\""+this.config.dir+"\""+_compStyle+" class=\"sbComponent\">";
		_html += "<table id=\""+this.compid+"_table\" class=\"sbTable\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
		_html += "<tr id=\""+this.compid+"_row\" >";
		
		//render the component's parts
		if (this._children.size()>0) {
			for (var i=0;i<this._children.size();i++) {
				//get the current component, and its border setting
				_currComp = this._children.keyAt(i);
				_currCompBorder = this._children.valueAt(i);
				
				//set the border style
				if (_currCompBorder==true) {
					if (this.config.dir=="rtl") {
						_borderStyle = "sbBorderedColumnLeft";
					}
					else {
						_borderStyle = "sbBorderedColumnRight";
					}
				}
				else {
					_borderStyle = "sbNonBorderedColumn";
				}
				
				//check the component's type
				if (_currComp==null || _currComp=="undefined") {
					continue;
				}
				if (typeof _currComp == "string") {
					//add a horizontal space column
					if (i>0) {
						_html += "<td>";
						_html += "<div class=\"sbHSpace\"></div>";
						_html += "</td>";
					}
					//check for an element
					_docElem = document.getElementById(_currComp);
					if (_docElem==null) {
						_html += "<td>" + _currComp + "</td>";
					}
					else {
						//_html += "<td class=\""+_borderStyle+"\">";
						_html += "<td>";
						if (_docElem.tagName) {
							_html += "<"+_docElem.tagName;
							if (_docElem.id) {
								_html += " id=\""+_docElem.id+"\"";
							}
							if (_docElem.className) {
								_html += " class=\""+_docElem.className+" "+_borderStyle+"\"";
							}
							else {
								_html += " class=\""+_borderStyle+"\"";
							}
							if (_docElem.dir) {
								_html += " dir=\""+_docElem.dir+"\"";
							}
							_html += ">";
						}
						_html += _docElem.innerHTML;
						if (_docElem.tagName) {
							_html += "</"+_docElem.tagName+">";
						}
						_html += "</td>";
						
						//remove the component from the dom tree
						$("#"+_currComp).remove();						
					}
				}
			}
		}
		//TODO: render other component parts here
		
		//render the configuration settings button
		_html += this._renderConfigButton();
		
		//finish rendering the component
		_html += "</tr>";
		_html += "</table>";
		_html += "</div>";
		_html += this._renderConfigDiv();
		$("#"+this.container).html(_html);
		
		//align the component
		this._alignComponent();
	};
	this._attachEvents = function() {
		this._attachConfigEvents();
		//TODO: invoke additional _attachEvents functions here
	};
	this._refreshComp = function() {
	};
	//define a global component instance
	var __uiComp = this;
	__uiComp._init();
};
};
