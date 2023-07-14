
if(typeof ConfigList!=='function'){
/**
 * A ConfigList UI component
 * @param _config - An array containing the configuration options 
 * @return A ConfigList UI component
 */
function ConfigList(_compConfig) {
	//declare component members
	this._extendedConfig = {
	};
	this._tagName = "div";
	this._compName = "ConfigList";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	this._LISTBOX_SUFFIX = "_lst";
	this._DEFAULT_LIST_SIZE = 15;
	this._DEFAULT_LABEL_VALUE_DELIMITER = "::";
	this._DEFAULT_ATTACH_VALUE_TO_LABEL = true;
	this._DEFAULT_SHOW_EMPTY_VALUES = false;
	this._listUtils = new SelectUtils();
	
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
		
		//declare locals
		var _innerHtml = "";
		var _compId = this._uibase.config.id;
		var _compObj = document.getElementById(_compId);
		var _listBoxId = _compId + this._LISTBOX_SUFFIX;
		var _listSize = this._uibase.config.size;
		
		//check for nulls
		if (_compObj!=null) {
			//set defaults if necessary
			if (this._uibase.utils.isEmpty(_listSize) || isNaN(_listSize)) {
				_listSize = this._DEFAULT_LIST_SIZE;
			}
			
			//generate the component's custom HTML
			_innerHtml += "<select id=\"" + _listBoxId + "\" style=\"width:100%;\" size=\"" + _listSize + "\" >";
			_innerHtml += "</select>";
			
			//render the inner html
			_compObj.innerHTML = _innerHtml;
		}
		
		//populate the list
		this.configToList();
		
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
	this._getLabelValueDelimiter = function() {
		//declare locals
		var _configValue = this._uibase.config.labelValueDelimiter;
		
		//check for nulls
		if (this._uibase.utils.isEmpty(_configValue)) {
			_configValue = this._DEFAULT_LABEL_VALUE_DELIMITER;
		}
		
		//return the metod's value
		return _configValue;
	};
	this._getAttachValueToLabel = function() {
		//declare locals
		var _configValue = this._uibase.config.attachValueToLabel;
		
		//check for nulls
		if (this._uibase.utils.isEmpty(_configValue)) {
			_configValue = this._DEFAULT_ATTACH_VALUE_TO_LABEL;
		}
		
		//return the metod's value
		return _configValue;
	};
	this._getShowEmptyValues = function() {
		//declare locals
		var _configValue = this._uibase.config.showEmptyValues;
		
		//check for nulls
		if (this._uibase.utils.isEmpty(_configValue)) {
			_configValue = this._DEFAULT_SHOW_EMPTY_VALUES;
		}
		
		//return the metod's value
		return _configValue;
	};
	this.updateList = function(_attributeName,_attributeValue) {
		//declare locals
		var _compId = this._uibase.config.id;
		var _listBoxId = _compId + this._LISTBOX_SUFFIX;
		var _optionsDelimiter = this._getLabelValueDelimiter();
		var _attachValueToLabel = this._getAttachValueToLabel();
		var _listBox = null;
		var _optionLabel = null;
		var _optionLabelOld = null;
		var _optionValue = null;
		var _optionIndex = -1;
		var _oldOptionLabel = null;
		var _currOptionLabel = null;
		
		//get components by their ids
		_listBox = document.getElementById(_listBoxId);
		
		//check for nulls
		if (_listBox==null) {
			return;
		}
		if (this._uibase.utils.isEmpty(_attributeName)) {
			return;
		}
		
		//get the selected option's old label
		_optionIndex = this._listUtils.getSelectedIndex(_listBoxId);
		
		//get the components values
		if (_optionIndex!=-1) {
			_optionLabelOld = _listBox.options[_optionIndex].text;
		}
		_optionLabel = _attributeName;
		_optionValue = _attributeValue;
		
		//check the new option label and value
		if (!this._uibase.utils.isEmpty(_optionLabel) && !this._uibase.utils.isEmpty(_optionValue)) {
			if (_attachValueToLabel==true) {
				_optionLabel = _optionLabel + _optionsDelimiter + _optionValue;
				_optionValue = _optionLabel + _optionsDelimiter + _optionValue;
			}
		}
		
		//get the old and current option labels
		if (_optionLabelOld!=null && _optionLabelOld!="" && _optionLabelOld.indexOf(_optionsDelimiter)!=-1) {
			if (_attachValueToLabel==true) {
				_oldOptionLabel = _optionLabelOld.split(_optionsDelimiter)[0];
			}
			else {
				_oldOptionLabel = _optionLabelOld;
			}
		}
		_currOptionLabel = _attributeName;
		
		//check if the label exists
		if (_oldOptionLabel!=null && _oldOptionLabel!="" 
			&& _currOptionLabel!=null && _currOptionLabel!=""
			&& _oldOptionLabel.toLowerCase()==_currOptionLabel.toLowerCase()) {
			//we are in update or remove mode
			//check for an empty new value
			if (_optionValue==null || _optionValue=="") {
				//remove the option
				_optionIndex = this._listUtils.getOptionLabelIndex(_listBoxId,_optionLabelOld);
				this._listUtils.removeOptionIndex(_listBoxId,_optionIndex);
			}
			else {
				//update the option
				this._listUtils.updateOptionByLabel(_listBoxId,_optionLabelOld,_optionValue);
				this._listUtils.updateOptionLabelByValue(_listBoxId,_optionLabel,_optionValue);
			}
		}
		else {
			//we are in add mode
			//check the new option label and value
			if (_optionLabel!=null && _optionLabel!="" && _optionValue!=null && _optionValue!="") {
				this._listUtils.addOption(_listBoxId,_optionLabel,_optionValue);
			}
		}
	};
	this.getSelectedOptionText = function() {
		//declare locals
		var _compId = this._uibase.config.id;
		var _listBoxId = _compId + this._LISTBOX_SUFFIX;
		var _listBoxComp = document.getElementById(_listBoxId);
		var _optionsDelimiter = this._getLabelValueDelimiter();
		var _attachValueToLabel = this._getAttachValueToLabel();
		var _selIndex = -1;
		var _optionValue = null;
		var _optionLabel = null;
		var _arrOptionValues = null;
		
		//check for nulls
		if (_listBoxComp==null) {
			return null;
		}
		
		//get the selected value
		_optionValue = _listBoxComp.value;
		_selIndex = this._listUtils.getSelectedIndex(_listBoxId);
		_optionLabel = _listBoxComp.options[_selIndex].text;
		
		//check for nulls
		if (_optionValue===null || _optionValue=="" || _optionValue.indexOf(_optionsDelimiter)==-1) {
			if (_attachValueToLabel==true) {
				_arrOptionValues = new Array("","");
			}
			else {
				_arrOptionValues = new Array(_optionLabel,_optionValue);
			}
		}
		else {
			//parse the value
			if (_attachValueToLabel==true) {
				_arrOptionValues = _optionValue.split(_optionsDelimiter);
			}
			else {
				_arrOptionValues = new Array(_optionLabel,_optionValue);
			}
		}
		
		//return the method's value
		return _arrOptionValues[0];
	};
	this.getSelectedOptionValue = function() {
		//declare locals
		var _compId = this._uibase.config.id;
		var _listBoxId = _compId + this._LISTBOX_SUFFIX;
		var _listBoxComp = document.getElementById(_listBoxId);
		var _optionsDelimiter = this._getLabelValueDelimiter();
		var _attachValueToLabel = this._getAttachValueToLabel();
		var _optionValue = null;
		var _arrOptionValues = null;
		
		//check for nulls
		if (_listBoxComp==null) {
			return null;
		}
		
		//get the selected value
		_optionValue = _listBoxComp.value;
		
		//check for nulls
		if (_optionValue===null || _optionValue=="" || _optionValue.indexOf(_optionsDelimiter)==-1) {
			if (_attachValueToLabel==true) {
				_arrOptionValues = new Array("","");
			}
			else {
				_arrOptionValues = new Array("",_optionValue);
			}
		}
		else {
			//parse the value
			if (_attachValueToLabel==true) {
				_arrOptionValues = _optionValue.split(_optionsDelimiter);
			}
			else {
				_arrOptionValues = new Array("",_optionValue);
			}
		}
		
		//return the method's value
		return _arrOptionValues[1];
	};
	this.configToList = function() {
		//declare locals
		var _compId = this._uibase.config.id;
		var _options = this._uibase.config.options;
		var _addEmptyOpt = this._uibase.config.addEmptyOption;
		var _listBoxId = _compId + this._LISTBOX_SUFFIX;
		var _optionsDelimiter = this._getLabelValueDelimiter();
		var _attachValueToLabel = this._getAttachValueToLabel();
		var _showEmptyValues = this._getShowEmptyValues();
		var _listBox = null;
		var _optionLabel = null;
		var _optionValue = null;
		
		//get components by their ids
		_listBox = document.getElementById(_listBoxId);
		
		//check for nulls
		if (this._uibase.utils.isEmpty(_options) || _listBox==null) {
			return;
		}
		
		//remove all previous options
		this._listUtils.removeAllOptions(_listBoxId);
		
		//add an empty option is necessary
		if (_addEmptyOpt==true) {
			this._listUtils.addEmptyOption(_listBoxId);
		}
		
		//loop through the configuration options
		for (var opt in _options) {
			//check for an empty attribute name
			if (this._uibase.utils.isEmpty(opt)) {
				continue;
			}
			
			//check for an empty attribute name
			if (this._uibase.utils.isEmpty(_options[opt])) {
				if (_showEmptyValues==true) {
					//do noting
				}
				else {
					continue;
				}
			}
			
			//set the option's label and value
			if (_attachValueToLabel==true) {
				_optionValue = opt + _optionsDelimiter +  _options[opt];
				_optionLabel = _optionValue;
			}
			else {
				_optionLabel = opt;
				_optionValue = _options[opt];
			}
			
			//update the list box
			this._listUtils.addOption(_listBoxId,_optionLabel,_optionValue);
		}
	};
	this.listToConfig = function() {
		//declare locals
		var _compId = this._uibase.config.id;
		var _listBoxId = _compId + this._LISTBOX_SUFFIX;
		var _optionsDelimiter = this._getLabelValueDelimiter();
		var _attachValueToLabel = this._getAttachValueToLabel();
		var _listBox = null;
		var _option = null;
		var _arrOption = null;
		var _optionLabel = null;
		var _optionValue = null;
		var _config  = null;
		
		//get components by their ids
		_listBox = document.getElementById(_listBoxId);
		
		//check for nulls
		if (_listBox==null) {
			return null;
		}
		
		//check for items
		if (!this._listUtils.hasOptions(_listBoxId)) {
			return null;
		}
		
		//create a new config object
		_config = {};
		
		//loop through the options
		for (var i=0;i<_listBox.options.length;i++) {
			//get the current item
			_option = _listBox.options[i].value;
			
			//check for nulls
			if (this._uibase.utils.isEmpty(_option)) {
				continue;
			}
			
			//check for a delimiter
			if (_option.indexOf(_optionsDelimiter)==-1) {
				if (_attachValueToLabel==true) {
					_arrOption = new Array(_option,_option);
				}
				else {
					_arrOption = new Array(_listBox.options[i].text,_option);
				}
			}
			else {
				_arrOption = _option.split(_optionsDelimiter);
			}
			
			//get the label and value
			_optionLabel = _arrOption[0];
			_optionValue = _arrOption[1];
			
			//check for  special value
			if (_optionValue.indexOf("function(")!=-1 || _optionValue.indexOf("function (")!=-1) {
				//fix the value
				_optionValue = this._fixFunctionValue(_optionValue);
			}
			
			//check for nulls
			if (this._uibase.utils.isEmpty(_optionLabel)) {
				continue;
			}
			
			//set the config
			_config[_optionLabel] = _optionValue;
		}
		
		//return the method's value
		return _config;
	};
	this._fixFunctionValue = function(_functionValue) {
		//declare locals
		var _functionHandler = null;
		var _utils = new Utils();
		var _fixedFunctionValue = _functionValue;
		var _msg = "";
		
		//check for nulls
		if (this._uibase.utils.isEmpty(_fixedFunctionValue)) {
			return null;
		}
		
		//check for a valid type
		if (typeof _fixedFunctionValue!="string" && typeof _fixedFunctionValue!="function") {
			return null;
		}
		if (typeof _fixedFunctionValue=="function") {
			return _functionValue;
		}
		
		//remove spaces and keywords
		_fixedFunctionValue = this._uibase.utils.trim(_fixedFunctionValue);
		_fixedFunctionValue = _fixedFunctionValue.substring(_fixedFunctionValue.indexOf("function"));
		if (_fixedFunctionValue.indexOf("{")!=-1) {
			_fixedFunctionValue = _fixedFunctionValue.replace("{","");
		}
		if (_fixedFunctionValue.indexOf("}")!=-1) {
			_fixedFunctionValue = _fixedFunctionValue.replace("}","");
		}
		if (_fixedFunctionValue.indexOf("()")!=-1) {
			_fixedFunctionValue = _fixedFunctionValue.replace("()","");
		}
		if (_fixedFunctionValue.indexOf("function")!=-1) {
			_fixedFunctionValue = _fixedFunctionValue.replace("function","");
		}
		_fixedFunctionValue = this._uibase.utils.trim(_fixedFunctionValue);
		
		//set the return value
		_functionHandler = _fixedFunctionValue;
		
		//show a debug message
		_msg += "_fixFunctionValue():";
		_msg += "\n_functionValue=[" + _functionValue + "]";
		_msg += "\n_fixedFunctionValue=[" + _fixedFunctionValue + "]";
		_msg += "\n_functionHandler=[" + _functionHandler + "]";
		//alert(_msg);
		
		//return the metho's value
		return _functionHandler;
	};
};
};
