
if(typeof _Utils!=='function'){
/**
 * A Utils component
 * @return A Utils component
 */
function _Utils() {
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
	this.parseBoolean=function(boolean) {
		//check for a boolean type
		if (typeof boolean=="boolean") {
			return boolean;
		}
		
		//check for nulls
		if (this.isEmpty(boolean)) {
			return false;
		}
		
		//check for a string type
		if (typeof boolean!="string") {
			return false;
		}
		
		//check the value
		if (boolean.toLowerCase()=="true") {
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
};
};

if(typeof Button!=='function'){
/**
 * A Button UI component
 * @param _config - An array containing the configuration options 
 * @return A Button UI component
 */
function Button(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "button"
		,classNameHover: "buttonHover"
		,classNameDisabled: "buttonDisabled"
		,textStyleClass: "buttonText"
		,textStyleClassHover: "buttonTextHover"
		,textStyleClassDisabled: "buttonTextDisabled"
		,type: "button"
	};
	this._tagName = "div";
	this._compName = "Button";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	
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
};
};

if(typeof EditableLabel!=='function'){
/**
 * A EditableLabel UI component
 * @param _config - An array containing the configuration options 
 * @return A EditableLabel UI component
 */
function EditableLabel(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "label"
		,classNameHover: "labelHover"
		,textStyleClass: "labelText"
		,textStyleClassHover: "labelTextHover"
		,textStyleClassDisabled: "labelTextDisabled"
		,editableModeEvent: "onclick"
		,labelModeEvent: "onblur"
	};
	this._tagName = "label";
	this._compName = "EditableLabel";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	this._label = new Label(_compConfig);
	this._textbox = new Textbox({});
	
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
		var _textBoxId = this._textbox.getBaseUi().config.id;
		$("#"+_textBoxId).hide();

		this._attachEditableModeEvent();
		this._attachLabelModeEvent();
	};
	this._attachEditableModeEvent=function() {
		//declare locals
		var _utils = this.getBaseUi().utils;
		var _config = this.getBaseUi().config;
		var _editableModeEvent = _config.editableModeEvent;
		var _comp = null;
		var _labelId = this._label.getBaseUi().config.id;
		var _labelText = this._label.getBaseUi().config.text;
		var _textBoxId = this._textbox.getBaseUi().config.id;
		
		//get elements by their ids
		_comp = document.getElementById(_labelId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//attach the event
		_comp.onclick = function() {
			//set the textbox's value
			document.getElementById(_textBoxId).value = _labelText;
			
			//hide the label and show the textbox
			$("#"+_labelId).hide();
			$("#"+_textBoxId).show();
		};
	};
	this._attachLabelModeEvent=function() {
		//declare locals
		var _utils = this.getBaseUi().utils;
		var _config = this.getBaseUi().config;
		var _labelModeEvent = _config.labelModeEvent;
		var _comp = null;
		var _labelId = this._label.getBaseUi().config.id;
		var _textBoxId = this._textbox.getBaseUi().config.id;
		
		//get elements by their ids
		_comp = document.getElementById(_textBoxId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//attach the event
		_comp.onblur = function() {
			//set the label's value
			document.getElementById(_labelId).innerHTML = _comp.value;
			
			//hide the textbox and show the label
			$("#"+_textBoxId).hide();
			$("#"+_labelId).show();
		};
	};
	this.getHtml = function() {
		//return the method's value
		return this._uibase._compHtml;
	};
	this._generateHtml = function() {
		//declare locals
		var _html = "";
		
		//render the component's html
		//_html = this._uibase._generateHtmlBase(this._tagName,this._compName);
		
		_html += this._label._generateHtml();
		this._textbox.getBaseUi().config.id = this.getBaseUi().config.id+"_tb";
		_html += this._textbox._generateHtml();
		this._uibase._compHtml = _html;
		
		//return the method's value
		return _html;
	};
};
};

if(typeof Footer!=='function'){
/**
 * A Footer UI component
 * @param _config - An array containing the configuration options 
 * @return A Footer UI component
 */
function Footer(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "footer"
		,textStyleClass: "footerText"
		,textStyleClassHover: "footerTextHover"
		,textStyleClassDisabled: "footerTextDisabled"
	};
	this._tagName = "div";
	this._compName = "Footer";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	
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
};
};

if(typeof Header!=='function'){
/**
 * A Header UI component
 * @param _config - An array containing the configuration options 
 * @return A Header UI component
 */
function Header(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "header"
		,textStyleClass: "headerText"
		,textStyleClassHover: "headerTextHover"
		,textStyleClassDisabled: "headerTextDisabled"
	};
	this._tagName = "div";
	this._compName = "Header";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	
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
};
};

if(typeof HorizontalLayout!=='function'){
/**
 * A HorizontalLayout UI component
 * @param _config - An array containing the configuration options 
 * @return A HorizontalLayout UI component
 */
function HorizontalLayout(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "horizontalLayout"
		,classNameHover: "horizontalLayoutHover"
	};
	this._tagName = "div";
	this._compName = "HorizontalLayout";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	
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
	};
	this.getHtml = function() {
		//return the method's value
		return this._uibase._compHtml;
	};
	this._generateItemsHtml=function() {
		//declare locals
		var _config = this._uibase.config;
		var _items = null;
		var _currItem = null;
		var _className = _config.className;
		var _html = "";
		
		//get the items
		_items = _config.items;
		
		//check for items
		if (_items==null || _items.length<1) {
			return "";
		}
		
		//loop through the items
		for (var i=0;i<_items.length;i++) {
			//get the current item
			_currItem = _items[i];
			
			//check for nulls
			if (_currItem==null || _currItem=="undefined") {
				continue;
			}
			
			//set the item's float attrobute
			//_currItem._uibase.config.float = "left";
			
			//render the layout's wrapping html
			_html += '<div class="' + _className + '">';
			
			//render the item's html
			_html += _currItem._generateHtml();
			
			//render the layout's wrapping html
			_html += '</div>';
		}
		
		//return the method's value
		return _html;
	};
	this._generateHtml = function() {
		//declare locals
		var _html = "";
		
		//render the component's html
		_html = this._uibase._generateHtmlBase(this._tagName,this._compName);
		
		//return the method's value
		return _html;
	};
};
};

if(typeof VerticalLayout!=='function'){
/**
 * A VerticalLayout UI component
 * @param _config - An array containing the configuration options 
 * @return A VerticalLayout UI component
 */
function VerticalLayout(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "verticalLayout"
		,classNameHover: "verticalLayoutHover"
	};
	this._tagName = "div";
	this._compName = "VerticalLayout";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	
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
	};
	this.getHtml = function() {
		//return the method's value
		return this._uibase._compHtml;
	};
	this._generateItemsHtml=function() {
		//declare locals
		var _config = this._uibase.config;
		var _items = null;
		var _currItem = null;
		var _className = _config.className;
		var _html = "";
		
		//get the items
		_items = _config.items;
		
		//check for items
		if (_items==null || _items.length<1) {
			return "";
		}
		
		//loop through the items
		for (var i=0;i<_items.length;i++) {
			//get the current item
			_currItem = _items[i];
			
			//check for nulls
			if (_currItem==null || _currItem=="undefined") {
				continue;
			}
			
			//set the item's float attrobute
			//_currItem._uibase.config.float = "none";
			
			//render the layout's wrapping html
			_html += '<div class="' + _className + '">';
			
			//render the item's html
			_html += _currItem._generateHtml();
			
			//render the layout's wrapping html
			_html += '</div>';
		}
		
		//render the layout's wrapping html
		
		//return the method's value
		return _html;
	};
	this._generateHtml = function() {
		//declare locals
		var _html = "";
		
		//render the component's html
		_html = this._uibase._generateHtmlBase(this._tagName,this._compName);
		
		//return the method's value
		return _html;
	};
};
};

if(typeof HSpacer!=='function'){
/**
 * A HSpacer UI component
 * @param _config - An array containing the configuration options 
 * @return A HSpacer UI component
 */
function HSpacer(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "hSpacer"
		,classNameHover: "hSpacerHover"
	};
	this._tagName = "div";
	this._compName = "HSpacer";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	
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
};
};

if(typeof VSpacer!=='function'){
/**
 * A VSpacer UI component
 * @param _config - An array containing the configuration options 
 * @return A VSpacer UI component
 */
function VSpacer(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "vSpacer"
		,classNameHover: "vSpacerHover"
	};
	this._tagName = "div";
	this._compName = "VSpacer";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	
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
};
};

if(typeof HSeparator!=='function'){
/**
 * A HSeparator UI component
 * @param _config - An array containing the configuration options 
 * @return A HSeparator UI component
 */
function HSeparator(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "hSeparator"
		,classNameHover: "hSeparatorHover"
	};
	this._tagName = "div";
	this._compName = "HSeparator";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	
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
};
};

if(typeof Label!=='function'){
/**
 * A Label UI component
 * @param _config - An array containing the configuration options 
 * @return A Label UI component
 */
function Label(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "label"
		,classNameHover: "labelHover"
		,textStyleClass: "labelText"
		,textStyleClassHover: "labelTextHover"
		,textStyleClassDisabled: "labelTextDisabled"
	};
	this._tagName = "label";
	this._compName = "Label";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	
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
};
};

if(typeof Panel!=='function'){
/**
 * A Panel UI component
 * @param _config - An array containing the configuration options 
 * @return A Panel UI component
 */
function Panel(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "panel"
		,classNameHover: "panelHover"
		,textStyleClass: "panelText"
		,textStyleClassHover: "panelTextHover"
		,textStyleClassDisabled: "panelTextDisabled"
	};
	this._tagName = "div";
	this._compName = "Panel";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	
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
};
};

if(typeof Password!=='function'){
/**
 * A Password UI component
 * @param _config - An array containing the configuration options 
 * @return A Password UI component
 */
function Password(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "textbox"
		,classNameHover: "textboxHover"
		,textStyleClass: "textboxText"
		,textStyleClassHover: "textboxTextHover"
		,textStyleClassDisabled: "textboxTextDisabled"
		,type: "password"
	};
	this._tagName = "input";
	this._compName = "Password";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	
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
};
};

if(typeof ProgressBar!=='function'){
/**
 * A ProgressBar UI component
 * @param _config - An array containing the configuration options 
 * @return A ProgressBar UI component
 */
function ProgressBar(_compConfig) {
	//declare component members
	this._DEFAULT_SHOW_PERCENTAGE = false;
	this._DEFAULT_USE_BG = false;
	this._DEFAULT_SHOW_SPACER = false;
	this._extendedConfig = {
		className: "progressBar"
		,classNameHover: "progressBarHover"
		,classNameColor: "progressBarColor"
		,classNameBackground: "progressBarBG"
		,textStyleClass: "progressBarText"
		,textStyleClassHover: "progressBarTextHover"
		,textStyleClassDisabled: "progressBarTextDisabled"
		,infoTextStyleClass: "progressBarInfoText"
		,showPercentage: this._DEFAULT_SHOW_PERCENTAGE
		,showSpacer: this._DEFAULT_SHOW_SPACER
		,useBackground: this._DEFAULT_USE_BG
		,currIndex: 0
		,totalItems: 0
		,infoText: ""
	};
	this._tagName = "div";
	this._compName = "ProgressBar";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	
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
		this._renderPBText();
		this._updatePBTextValue();
	};
	this.getHtml = function() {
		//return the method's value
		return this._uibase._compHtml;
	};
	this._getPBTextId=function() {
		//declare locals
		var _config = this._uibase.config;
		var _compId = _config.id;
		var _pbTextCompId = _compId+"_pbText";
		
		//return the method's value
		return _pbTextCompId;
	};
	this._getPBInfoTextId=function() {
		//declare locals
		var _config = this._uibase.config;
		var _compId = _config.id;
		var _pbTextCompId = _compId+"_pbInfoText";
		
		//return the method's value
		return _pbTextCompId;
	};
	this.hide=function() {
		//declare locals
		var _config = this._uibase.config;
		var _compId = _config.id;
		var _childCompId = this._getPBTextId();
		
		//hide the component
		$("#"+_compId).hide();
		$("#"+_childCompId).hide();
	};
	this.show=function() {
		//declare locals
		var _config = this._uibase.config;
		var _compId = _config.id;
		var _childCompId = this._getPBTextId();
		
		//show the component
		$("#"+_compId).show();
		$("#"+_childCompId).show();
	};
	this._renderPBText=function() {
		//declare locals
		var _config = this._uibase.config;
		var _compId = _config.id;
		var _pbTextCompId = this._getPBTextId();
		var _compObj = null;
		var _pbTextComp = null;
		var _compParent = null;
		var _pbHeight = null;
		var _pbWidth = null;
		var _pbLeft = null;
		var _pbTop = null;
		var _textStyleClass = _config.textStyleClass;
		
		//get components by their ids
		_compObj = document.getElementById(_compId);
		
		//check for nulls
		if (_compObj==null) {
			return;
		}
		
		//check for an existing component
		_pbTextComp = document.getElementById(_pbTextCompId);
		if (_pbTextComp==null) {
			//get the component's parent node
			_compParent = _compObj.parentNode;
			
			//create a new component
			_pbTextComp = document.createElement("div");
			_pbTextComp.setAttribute("id",_pbTextCompId);
			
			//add the newly created component to the parent's NodeList
			_compParent.appendChild(_pbTextComp);
			
			//position the new component exactly above the progressbar
			_pbHeight = this._uibase._getNumericValue(_config.height);
			_pbWidth = this._uibase._getNumericValue(_config.width);
			_pbLeft = $("#"+_compId).position().left;
			_pbTop = $("#"+_compId).position().top;
			$("#"+_pbTextCompId).css('height',(_pbHeight-20)+'px');
			$("#"+_pbTextCompId).css('width',_pbWidth+'px');
			$("#"+_pbTextCompId).css('position','absolute');
			$("#"+_pbTextCompId).css('left',_pbLeft);
			$("#"+_pbTextCompId).css('top',_pbTop);
			$("#"+_pbTextCompId).css('z-index','2');
			$("#"+_pbTextCompId).css('background-color','transparent');
		}
		_pbTextComp.className = _textStyleClass;
	};
	this._updatePBTextValue=function() {
		//declare locals
		var _utils = this._uibase.utils;
		var _config = this._uibase.config;
		var _pbTextCompId = this._getPBTextId();
		var _showPercentage = false;
		var _currIndex = 0;
		var _totalItems = 0;
		var _percent = 0;
		var _pbInfoTextCompId = this._getPBInfoTextId();
		var _pbInfoTextCompObj = null;
		
		//get config values
		_showPercentage = _utils.parseBoolean(_config.showPercentage);
		_currIndex = _utils.parseNumber(_config.currIndex);
		_totalItems = _utils.parseNumber(_config.totalItems);
		_pbText = _config.infoText;
		if (_utils.isEmpty(_pbText)) {
			_pbText = "";
		}
		//calculate the percentage
		_percent = this._getPercentage();
		
		//check the percent flag
		if (_showPercentage==true) {
			$("#"+_pbTextCompId).html(_percent+'%');
		}
		else {
			$("#"+_pbTextCompId).html(_currIndex + ' of ' + _totalItems);
		}
		if (_percent>50) {
			$("#"+_pbTextCompId).css("color","#ffffff");
		}
		else {
			$("#"+_pbTextCompId).css("color","#000000");
		}

		//get elements by their ids
		_pbInfoTextCompObj = document.getElementById(_pbInfoTextCompId);
		
		//check for nulls
		if (_pbInfoTextCompObj==null) {
			return;
		}
		
		//update the info
		_pbInfoTextCompObj.value = _pbText;
	};
	this._getPercentage=function() {
		//declare locals
		var _utils = this._uibase.utils;
		var _config = this._uibase.config;
		var _currIndex = 0;
		var _totalItems = 0;
		var _percent = 0;
		
		//get config values
		_currIndex = _utils.parseNumber(_config.currIndex);
		_totalItems = _utils.parseNumber(_config.totalItems);
		
		//calculate the percentage
		_percent = parseInt((_currIndex / _totalItems)*100);
		
		//return the method's value
		return _percent;
	};
	this._generatePBHtml=function() {
		//declare locals
		var _html = "";
		var _utils = this._uibase.utils;
		var _config = this._uibase.config;
		var _compWidth = 0;
		var _showSpacer = false;
		var _useBackground = false;
		var _pbText = null;
		var _colorClassName = _config.classNameColor;
		var _backgroundClassName = _config.classNameBackground;
		var _pbTextClassName = _config.infoTextStyleClass;
		var _percent = 0;
		var _progressWidth = 0;
		var _bgWidth = 5;
		var _spacerWidth = 2;
		var _pbSpacerMax = 0;
		var _remainingWidth = 0;
		var _lastWidth = 0;
		
		//get config values
		_compWidth = _utils.parseNumber(_config.width);
		_showSpacer = _utils.parseBoolean(_config.showSpacer);
		_useBackground = _utils.parseBoolean(_config.useBackground);
		_pbText = _config.infoText;
		if (_utils.isEmpty(_pbText)) {
			_pbText = "";
		}
		_percent = this._getPercentage();
		_progressWidth = (parseInt(_compWidth/100))*_percent;
		_pbSpacerMax = parseInt(_progressWidth/(_bgWidth+_spacerWidth));
		_remainingWidth = _progressWidth-((_bgWidth+_spacerWidth)*_pbSpacerMax);
		
		//render the component
		_html += '<table border="0" cellpadding="0" cellspacing="0" ';
		_html += 'style="width:'+_compWidth+'px;"';
		_html += '>';
		_html += '<tr>';
		if (_showSpacer==false) {
			_html += '<td>';
			_html += '<div style="width:'+_percent+'%;color:transparent;"';
			if (_useBackground==true) {
				_html += ' class="' + _backgroundClassName + '"';
			}
			else {
				_html += ' class="' + _colorClassName + '"';
			}
			_html += '>';
			_html += "|";
			_html += '</div>';
			_html += '</td>';
		}
		else {
			for (var i=0;i<_pbSpacerMax;i++) {
				_html += '<td style="width:'+_bgWidth+'px;">';
				_html += '<div style="width:'+_bgWidth+'px;color:transparent;"';
				if (_useBackground==true) {
					_html += ' class="' + _backgroundClassName + '"';
				}
				else {
					_html += ' class="' + _colorClassName + '"';
				}
				_html += '>';
				_html += "|";
				_html += '</div>';
				_html += '</td>';
				_html += '<td style="width:'+_spacerWidth+'px;">';
				_html += '<div style="width:'+_spacerWidth+'px;color:transparent;">';
				_html += "|";
				_html += '</div>';
				_html += '</td>';
			}
			if (_remainingWidth>0) {
				if (_remainingWidth>=_bgWidth) {
					_lastWidth = _bgWidth;
				}
				else {
					_lastWidth = _remainingWidth;
				}
				_html += '<td style="width:'+_lastWidth+'px;">';
				_html += '<div style="width:'+_lastWidth+'px;color:transparent;"';
				if (_useBackground==true) {
					_html += ' class="' + _backgroundClassName + '"';
				}
				else {
					_html += ' class="' + _colorClassName + '"';
				}
				_html += '>';
				_html += "|";
				_html += '</div>';
				_html += '</td>';
			}
		}
		_html += '</tr>';
		_html += '</table>';
		_html += '<div style="height:5px;"></div>';
		_html += '<input id="' + this._getPBInfoTextId() + '" type="text" readonly="readonly" value="'+_pbText+'" style="width:'+(_compWidth-2)+'px;" class="' + _pbTextClassName + '"/>';
		
		//return the method's value
		return _html;
	};
	this._generateHtml = function() {
		//declare locals
		var _html = "";
		var _htmlInner = "";
		var _config = this._uibase.config;
		//var _roundBordersStyle = "";
		
		//check for nulls
		if (this._uibase.utils.isEmpty(this._tagName) || this._uibase.utils.isEmpty(this._compName)) {
			return "";
		}
		
		//check for a configuration object
		if (this._uibase.utils.isEmpty(_config)) {
			return "";
		}
		
		//render roundBorders
		this._uibase._generateHtmlRoundBordersTop();
		this._uibase._generateHtmlRoundBordersBottom();
		
		//start rendering the html tag
		this._uibase._containerHtmlTag = this._uibase._generateHtmlTag(this._tagName,this._compName);
		_html = this._uibase._containerHtmlTag;
		
		//render the icon and text
		_htmlInner += this._generatePBHtml();
		
		//finish rendering the component
		_html += _htmlInner + '</'+this._tagName+'>';
		
		//save the html
		this._uibase._compHtml = _htmlInner;
		
		//return the method's value
		return _html;
	};
};
};

if(typeof Spinner!=='function'){
/**
 * A Spinner UI component
 * @param _config - An array containing the configuration options 
 * @return A Spinner UI component
 */
function Spinner(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "spinner"
		,classNameDisabled: "spinnerDisabled"
		,textStyleClass: "spinnerText"
		,textStyleClassDisabled: "spinnerTextDisabled"
		,spinnerTextBoxClass: "spinnerTextBox"
		,spinnerTextBoxClassDisabled: "spinnerTextBoxDisabled"
		,upStyleClass: "spinnerButtonUp"
		,upStyleClassHover: "spinnerButtonUpHover"
		,upStyleClassDisabled: "spinnerButtonUpDisabled"
		,downStyleClass: "spinnerButtonDown"
		,downStyleClassHover: "spinnerButtonDownHover"
		,downStyleClassDisabled: "spinnerButtonDownDisabled"
		,spinnerButtonUpTooltip: "Click here to increase the value"
		,spinnerButtonDownTooltip: "Click here to decrease the value"
		,startValue: 1
		,maxValue: 10
		,minValue: 1
		,interval: 1
		,origWidth: 0
		,origHeight: 0
		,cycle: true
		,onclickDown: null
		,onclickUp: null
	};
	this._tagName = "div";
	this._compName = "Spinner";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	this._spinnerTextBox = null;
	this._spinnerButtonUp = null;
	this._spinnerButtonDown = null;
	this._DEFAULT_MIN_VALUE = 1;
	this._DEFAULT_MAX_VALUE = 10;
	this._DEFAULT_START_VALUE = 1;
	this._DEFAULT_INTERVAL = 1;
	this._DEFAULT_BUTTON_WIDTH = 12;
	this._DEFAULT_BUTTON_HEIGHT = 8;
	this._DEFAULT_WIDTH = 15;
	this._DEFAULT_HEIGHT = 20;
	this._DEFAULT_WIDTH_SPACE = 8;
	this._DEFAULT_HEIGHT_SPACE = 4;
	
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
		this._renderCompItems();
		
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
	};
	this.getHtml = function() {
		//return the method's value
		return this._uibase._compHtml;
	};
	this._renderCompItems=function() {
		//declare locals
		var _panel = null;
		this._spinnerTextBox = this.getSpinnerTextBox();
		this._spinnerButtonUp = this.getSpinnerButtonUp();
		this._spinnerButtonDown = this.getSpinnerButtonDown();
		var _width = this.getBaseUi().config.origWidth;
		var _height = this.getBaseUi().config.height;
		_height = this.getBaseUi()._getNumericValue(_height);
		
		_panel = new Panel({
			width: (_width+this._DEFAULT_BUTTON_WIDTH+this._DEFAULT_WIDTH_SPACE)
			//,roundBorders: "all"
			,height: _height
			,renderTo: this.getBaseUi().config.id
			,items: [
			    new Panel({
					float: "left"
					,items: [
					    this._spinnerTextBox
					]
			    })
			    ,new Panel({
					float: "right"
			    	,items: [
					    this._spinnerButtonUp
					    ,this._spinnerButtonDown
			    	]
			    })
			]
		});
		_panel.render();
		
		//attach events
		this._attachButtonDownClick();
		this._attachButtonUpClick();
	};
	this.getSpinnerTextBox=function() {
		//declare locals
		var _value = this.getBaseUi().config.startValue;
		var _disabled = this.getBaseUi().config.disabled;
		var _width = this.getBaseUi().config.origWidth;
		var _className = this.getBaseUi().config.spinnerTextBoxClass;
		var _classNameDisabled = this.getBaseUi().config.spinnerTextBoxClassDisabled;
		var _classNameText = this.getBaseUi().config.textStyleClass;
		var _classNameTextDisabled = this.getBaseUi().config.textStyleClassDisabled;
		var _maxValue = this.getBaseUi().config.maxValue;
		var _height = this.getBaseUi().config.origHeight;
		_height = this.getBaseUi()._getNumericValue(_height);
		
		//check for nulls
		if (this.getBaseUi().utils.isEmpty(_value)) {
			_value = this._DEFAULT_START_VALUE;
		}
		if (this.getBaseUi().utils.isEmpty(_maxValue)) {
			_maxValue = this._DEFAULT_MAX_VALUE;
		}
		_maxValue = String(_maxValue);
		
		if (_disabled==true) {
			_className = _classNameDisabled;
		}
		
		//check for nulls
		if (this._spinnerTextBox==null) {
			this._spinnerTextBox = new Textbox({
				className: _className
				,classNameDisabled: _classNameDisabled
				,textStyleClass: _classNameText
				,textStyleClassDisabled: _classNameTextDisabled
				,width: _width
				,height: (_height-2)
				,value: _value
				//,disabled: _disabled
				,readonly: _disabled
				,maxlength: _maxValue.length
			});
		}
		
		//return the method's value
		return this._spinnerTextBox;
	};
	this.getSpinnerButtonUp=function() {
		//declare locals
		var _disabled = this.getBaseUi().config.disabled;
		var _className = this.getBaseUi().config.upStyleClass;
		var _classNameHover = this.getBaseUi().config.upStyleClassHover;
		var _classNameDisabled = this.getBaseUi().config.upStyleClassDisabled;
		var _tooltip = this.getBaseUi().config.spinnerButtonUpTooltip;
		
		//check for nulls
		if (this._spinnerButtonUp==null) {
			this._spinnerButtonUp = new Button({
				iconClass: _className
				,iconClassHover: _classNameHover
				,iconClassDisabled: _classNameDisabled
				,height: this._DEFAULT_BUTTON_HEIGHT
				,width: this._DEFAULT_BUTTON_WIDTH
				,disabled: _disabled
				,tooltip: _tooltip
				//,className: _className
				//,classNameHover: _classNameHover
				//,classNameDisabled: _classNameDisabled
			});
		}
		
		//return the method's value
		return this._spinnerButtonUp;
	};
	this.getSpinnerButtonDown=function() {
		//declare locals
		var _disabled = this.getBaseUi().config.disabled;
		var _className = this.getBaseUi().config.downStyleClass;
		var _classNameHover = this.getBaseUi().config.downStyleClassHover;
		var _classNameDisabled = this.getBaseUi().config.downStyleClassDisabled;
		var _tooltip = this.getBaseUi().config.spinnerButtonDownTooltip;
		
		//check for nulls
		if (this._spinnerButtonDown==null) {
			this._spinnerButtonDown = new Button({
				iconClass: _className
				,iconClassHover: _classNameHover
				,iconClassDisabled: _classNameDisabled
				,height: this._DEFAULT_BUTTON_HEIGHT
				,width: this._DEFAULT_BUTTON_WIDTH
				,disabled: _disabled
				,tooltip: _tooltip
				//,className: _className
				//,classNameHover: _classNameHover
				//,classNameDisabled: _classNameDisabled
			});
		}
		
		//return the method's value
		return this._spinnerButtonDown;
	};
	this._attachButtonDownClick=function() {
		//declare locals
		var _uibase = this.getBaseUi();
		var _buttonId = null;
		var _buttonComp = null;
		var _buttonDownComp = null;
		var _buttonUpComp = null;
		var _startValue = null;
		var _minValue = null;
		var _maxValue = null;
		var _interval = null;
		var _textBoxId = null;
		var _textBoxComp = null;
		var _currValue = null;
		var _cycle = null;
		var _tooltip = null;
		var _onclickDown = null;
		
		//get the components' attributes
		_buttonId = this._spinnerButtonDown.getBaseUi().config.id;
		_textBoxId = this._spinnerTextBox.getBaseUi().config.id;
		_startValue = this.getBaseUi().config.startValue;
		_minValue = this.getBaseUi().config.minValue;
		_maxValue = this.getBaseUi().config.maxValue;
		_interval = this.getBaseUi().config.interval;
		_cycle = this.getBaseUi().config.cycle;
		_onclickDown = this.getBaseUi().config.onclickDown;
		
		//get components by their ids
		_buttonComp = document.getElementById(_buttonId);
		_textBoxComp = document.getElementById(_textBoxId);
		
		//check for nulls
		if (_buttonComp==null || _textBoxComp==null) {
			return;
		}
		_buttonDownComp = this._spinnerButtonDown;
		_buttonUpComp = this._spinnerButtonUp;
		_tooltip = this.getBaseUi().config.spinnerButtonUpTooltip;
		
		//set defaults if necessary
		if (this.getBaseUi().utils.isEmpty(_startValue)) {
			_startValue = this._DEFAULT_START_VALUE;
		}
		if (this.getBaseUi().utils.isEmpty(_minValue)) {
			_minValue = this._DEFAULT_MIN_VALUE;
		}
		if (this.getBaseUi().utils.isEmpty(_maxValue)) {
			_maxValue = this._DEFAULT_MAX_VALUE;
		}
		if (this.getBaseUi().utils.isEmpty(_interval)) {
			_interval = this._DEFAULT_INTERVAL;
		}
		
		//attach the event
		_buttonComp.onclick = function() {
			//check if the component is disabled
			if (_uibase.isDisabled(_buttonId)) {
				return;
			}
			if (_buttonUpComp.getBaseUi().config.disabled==true) {
				_buttonUpComp.reRender({
					disabled:false
					,tooltip: _tooltip
				});
			}
			
			//get the current value
			_currValue = _textBoxComp.value;
			
			//check for a valid number
			if (isNaN(_currValue)) {
				_currValue = _startValue;
			}
			else {
				_currValue = parseInt(_currValue);
			}
			
			//increase the value
			_currValue -= _interval;
			
			//check the value
			if ((_currValue-_interval)<_minValue) {
				if (_cycle==false) {
					_buttonDownComp.reRender({
						disabled:true
						,tooltip: ""
					});
				}
			}
			if (_currValue<_minValue) {
				if (_cycle==true) {
					_currValue = _maxValue;
				}
				else {
					_currValue += _interval;
				}
			}
			_textBoxComp.value = _currValue;
			
			//check for a function handler
			if (_uibase.utils.isEmpty(_onclickDown)) {
				return;
			}
			
			if (typeof _onclickDown=="function") {
				_onclickDown();
			}
			else if (typeof _onclickDown=="string") {
				eval(_onclickDown);
			}
		};
	};
	this._attachButtonUpClick=function() {
		//declare locals
		var _uibase = this.getBaseUi();
		var _buttonId = null;
		var _buttonComp = null;
		var _buttonDownComp = null;
		var _buttonUpComp = null;
		var _startValue = null;
		var _minValue = null;
		var _maxValue = null;
		var _interval = null;
		var _textBoxId = null;
		var _textBoxComp = null;
		var _currValue = null;
		var _cycle = null;
		var _tooltip = null;
		var _onclickUp = null;
		
		//get the components' attributes
		_buttonId = this._spinnerButtonUp.getBaseUi().config.id;
		_textBoxId = this._spinnerTextBox.getBaseUi().config.id;
		_startValue = this.getBaseUi().config.startValue;
		_minValue = this.getBaseUi().config.minValue;
		_maxValue = this.getBaseUi().config.maxValue;
		_interval = this.getBaseUi().config.interval;
		_cycle = this.getBaseUi().config.cycle;
		_onclickUp = this.getBaseUi().config.onclickUp;
		
		//get components by their ids
		_buttonComp = document.getElementById(_buttonId);
		_textBoxComp = document.getElementById(_textBoxId);
		
		//check for nulls
		if (_buttonComp==null || _textBoxComp==null) {
			return;
		}
		_buttonDownComp = this._spinnerButtonDown;
		_buttonUpComp = this._spinnerButtonUp;
		_tooltip = this.getBaseUi().config.spinnerButtonDownTooltip;
		
		//set defaults if necessary
		if (this.getBaseUi().utils.isEmpty(_startValue)) {
			_startValue = this._DEFAULT_START_VALUE;
		}
		if (this.getBaseUi().utils.isEmpty(_minValue)) {
			_minValue = this._DEFAULT_MIN_VALUE;
		}
		if (this.getBaseUi().utils.isEmpty(_maxValue)) {
			_maxValue = this._DEFAULT_MAX_VALUE;
		}
		if (this.getBaseUi().utils.isEmpty(_interval)) {
			_interval = this._DEFAULT_INTERVAL;
		}
		
		//attach the event
		_buttonComp.onclick = function() {
			//check if the component is disabled
			if (_uibase.isDisabled(_buttonId)) {
				return;
			}
			if (_buttonDownComp.getBaseUi().config.disabled==true) {
				_buttonDownComp.reRender({
					disabled:false
					,tooltip: _tooltip
				});
			}
			
			//get the current value
			_currValue = _textBoxComp.value;
			
			//check for a valid number
			if (isNaN(_currValue)) {
				_currValue = _startValue;
			}
			else {
				_currValue = parseInt(_currValue);
			}
			
			//increase the value
			_currValue += _interval;
			
			//check the value
			if ((_currValue+_interval)>_maxValue) {
				if (_cycle==false) {
					_buttonUpComp.reRender({
						disabled:true
						,tooltip: ""
					});
				}
			}
			if (_currValue>_maxValue) {
				if (_cycle==true) {
					_currValue = _minValue;
				}
				else {
					_currValue -= _interval;
				}
			}
			_textBoxComp.value = _currValue;
			
			//check for a function handler
			if (_uibase.utils.isEmpty(_onclickUp)) {
				return;
			}
			
			if (typeof _onclickUp=="function") {
				_onclickUp();
			}
			else if (typeof _onclickUp=="string") {
				eval(_onclickUp);
			}
		};
	};
	this._generateHtml = function() {
		//declare locals
		var _html = "";
		var _htmlInner = "";
		var _config = this.getBaseUi().config;
		
		//check for a configuration object
		if (this.getBaseUi().utils.isEmpty(_config)) {
			return "";
		}
		
		//get the component's size
		var _width = this.getBaseUi().config.width;
		var _height = this.getBaseUi().config.height;
		
		//set defaults if necessary
		if (this.getBaseUi().utils.isEmpty(_width)) {
			_width = this._DEFAULT_WIDTH;
		}
		if (this.getBaseUi().utils.isEmpty(_height)) {
			_height = this._DEFAULT_HEIGHT;
		}
		
		//fix the component's size
		_width = this.getBaseUi()._getNumericValue(_width);
		_height = this.getBaseUi()._getNumericValue(_height);
		_config.origWidth = _width;
		_config.origHeight = _height;
		_config.width = _width+this._DEFAULT_BUTTON_WIDTH+this._DEFAULT_WIDTH_SPACE;
		_config.height = _height+this._DEFAULT_HEIGHT_SPACE;
		
		//start rendering the html tag
		this.getBaseUi()._containerHtmlTag = this.getBaseUi()._generateHtmlTag(this._tagName,this._compName);
		_html = this.getBaseUi()._containerHtmlTag;
		
		//finish rendering the component
		_html += _htmlInner + '</'+this._tagName+'>';
		
		//save the html
		this.getBaseUi()._compHtml = _htmlInner;
		
		//return the method's value
		return _html;
	};
};
};

if(typeof SplitButton!=='function'){
/**
 * A SplitButton UI component
 * @param _config - An array containing the configuration options 
 * @return A SplitButton UI component
 */
function SplitButton(_compConfig) {
	//declare component members
	this._extendedConfig = {
		autoAddVSeparators: true
		,className: "splitButton"
		,classNameHover: "splitButtonHover"
		,defaultItem: null
		,defaultItemId: ""
		,iconClass: "splitButtonIcon"
		,iconClassDisabled: "splitButtonIconDisabled"
		,onOptionClickClose: true
		,onOptionClickResetDefault: true
		,optionsAlignment: "bottom"
		,optionsButtonTooltip: ""
		,optionsHeight: ""
		,optionsWidth: ""
		,textStyleClass: "splitButtonText"
		,textStyleClassHover: "splitButtonTextHover"
		,textStyleClassDisabled: "splitButtonTextDisabled"
	};
	this._tagName = "div";
	this._compName = "SplitButton";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	this._defaultButton = null;
	this._collapseButton = null;
	this._DEFAULT_COLLAPSE_BUTTON_WIDTH = 20;
	this._DEFAULT_BUTTONS_SPACER = 6;
	this._DEFAULT_OPTIONS_HEIGHT = 150;
	this._DEFAULT_OPTIONS_WIDTH = 200;
	
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
		this._renderButtons();
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
		//declare locals
		var _onOptionClickedClose = this._uibase.config.onOptionClickClose;
		
		//invoke the generic method
		this._uibase._attachBaseEvents();
		
		//attach custom events
		this._attachCustomEvents();
		
		//render child items
		this._uibase._attachChildItemsEvents();
		if (_onOptionClickedClose==true) {
			this._attachOnOptionsClickClose();
		}
	};
	this._attachCustomEvents = function() {
		//declare locals
		var _DEFAULT_ALIGNMENT = "bottom";
		var _compId = this.getOptionsId();
		var _alignTo = this._uibase.config.id;
		var _alignment = this._uibase.config.optionsAlignment;
		var _defaultButtonWidth = null;
		
		//set defaults if necessary
		if (!this._uibase._isValidPosition(_alignment)) {
			_alignment = _DEFAULT_ALIGNMENT;
		}
		
		//fix the component's width
		_defaultButtonWidth = $("#"+this._defaultButton._uibase.config.id).width();
		$("#"+this._uibase.config.id).css("width",(_defaultButtonWidth+this._DEFAULT_COLLAPSE_BUTTON_WIDTH+this._DEFAULT_BUTTONS_SPACER));
		
		//attach custom events for this component
		this._uibase._alignComponent(_compId,_alignTo,_alignment,false);
		
		
	};
	this._attachOnOptionsClickClose = function() {
		//declare locals
		var _config = this._uibase.config;
		var _items = null;
		var _currItem = null;
		
		//check for nulls
		if (_config==null || _config=="undefined") {
			return;
		}
		
		//get the component's items
		_items = _config.items;
		
		//check for items
		if (_items==null || _items.length<1) {
			return;
		}
		
		//loop through the items
		for (var i=0;i<_items.length;i++) {
			//get the current item
			_currItem = _items[i];
			
			//attach a custom click event for the current item
			this._attachOnOptionClickClose(_currItem);
		}
	};
	this._attachOnOptionClickClose = function(_currItem) {
		//declare locals
		var _optionsId = this.getOptionsId();
		var _defaultButton = this.getDefaultButton();
		var _config = _currItem._uibase.config;
		var _onOptionClickedResetDefault = this._uibase.config.onOptionClickResetDefault;
		var _compId = null;
		var _comp = null;
		var _isDisabled = null;
		var _fhCompClick = null;
		var _fhCustomClick = null;
		
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
		_isDisabled = _config.disabled;
		_fhCompClick = _config.onclick;
		
		//set custom event handlers
		_fhCustomClick = this._splitbuttonOptionClicked;
		
		//attache the events
		_comp.onclick= function() {
			//check if the component is disabled
			if (_isDisabled==true) {
				return;
			}
			
			//invoke the component's function handler
			if (_fhCompClick!=null && _fhCompClick!="undefined") {
				if (typeof _fhCompClick=="function") {
					_fhCompClick();
				}
				else if (typeof _fhCompClick=="string") {
					eval(_fhCompClick);
				}
			}
			
			//invoke the custom function handler
			_fhCustomClick(_optionsId,_onOptionClickedResetDefault,_currItem,_defaultButton);
		};
	};
	this._splitbuttonOptionClicked = function(_optionsId,_onOptionClickedResetDefault,_itemClicked,_defaultButton) {
		//declare locals
		var _itemConfig = null;
		var _newDefaultConfig = null;
		
		//check the reset default flag
		if (_onOptionClickedResetDefault==true) {
			//create a new config object
			_newDefaultConfig = {};
			
			//get the item's config
			_itemConfig = _itemClicked._uibase.config;
			
			//rerender the defulat button
			_newDefaultConfig.icon = _itemConfig.icon;
			_newDefaultConfig.onclick = _itemConfig.onclick;
			_newDefaultConfig.text = _itemConfig.text;
			_newDefaultConfig.tooltip = _itemConfig.tooltip;
			_defaultButton.reRender(_newDefaultConfig);
		}
		
		//hide the options
		$("#"+_optionsId).hide();
	};
	this.getHtml = function() {
		//return the method's value
		return this._uibase._compHtml;
	};
	this._generateHtml = function() {
		//declare locals
		var _html = "";
		var _htmlInner = "";
		var _items = this._uibase.config.items;
		var _autoAddVSeparators = this._uibase.config.autoAddVSeparators;
		var _currItem = null;
		var _currVSepItem = null;
		var _optionsHeight = 0;
		var _optionsWidth = 0;
		var _parentConfig = this._uibase.config;
		
		//render roundBorders
		this._uibase._generateHtmlRoundBordersTop();
		this._uibase._generateHtmlRoundBordersBottom();
		
		//start rendering the html tag
		this._uibase._containerHtmlTag = this._uibase._generateHtmlTag(this._tagName,this._compName);
		_html = this._uibase._containerHtmlTag;
		
		//render the component's buttons
		_htmlInner += '<div id="'+this._uibase.config.id+'_buttons">';
		_htmlInner += '</div>';
		
		//calculate the component's options height, and width
		if (_items!=null && _items.length>0) {
			_optionsHeight = this._uibase._getNumericValue(this._uibase.config.optionsHeight);
			if (_optionsHeight==0) {
				_optionsHeight = this._DEFAULT_OPTIONS_HEIGHT;
			}
			_optionsWidth = this._uibase._getNumericValue(this._uibase.config.optionsWidth);
			if (_optionsWidth==0) {
				_optionsWidth = this._DEFAULT_OPTIONS_WIDTH;
			}
			
			//render the inner HTML of the component
			_htmlInner += '<div id="'+this.getOptionsId()+'" class="splitButtonOptions" style="display:none;width:'+_optionsWidth+'px">';
			
			//check for a separators flag
			if (_autoAddVSeparators==true) {
				//loop through the items
				for (var i=0;i<_items.length;i++) {
					//get the current item
					_currItem = _items[i];
					
					//check for nulls
					if (_currItem==null) {
						continue;
					}
					
					//check the current index
					if (i>0) {
						//auto add a VSeparator
						_currVSepItem = new VSeparator();
						_currVSepItem._uibase.config.id = this._uibase.config.id+_currVSepItem._compName+i;
						_htmlInner += _currVSepItem._generateHtml();
					}
					
					//set the component's id
					if (this._uibase.utils.isEmpty(_currItem._uibase.config.id)) {
						//generate an auto id
						_currItem._uibase.config.id = this._uibase.config.id+_currItem._compName+i;
					}
					
					//render the current item
					_htmlInner += _currItem._generateHtml();
				}
			}
			else {
				_htmlInner += this._uibase._generateBaseItemsHtml(_parentConfig);
			}
			//finish rendering the child items
			_htmlInner += '</div>';
		}
		
		//finish rendering the component
		_html += _htmlInner + '</'+this._tagName+'>';
		
		//save the html
		this._uibase._compHtml = _htmlInner;
		
		//return the method's value
		return _html;
	};
	this._renderButtons = function() {
		//declare locals
		var _compId = this._uibase.config.id;
		var _bodyId = this.getOptionsId();
		var _btnCollapse = null;
		var _btnDefault = null;
		var _btnHeight = null;
		var _disabled = this._uibase.config.disabled;
		
		//get the buttons
		_btnDefault = this.getDefaultButton();
		_btnCollapse = this.getCollapseButton();
		_btnHeight = this._uibase._getSizeValue(_btnCollapse._uibase.config.height);
		
		//render a buttons panel
		var _buttonsPanel = new Panel({
			id: _compId+"_buttonsPanel"
			//,width: "100%"
			,height: this._uibase.config.height
			,cellspacing: 1
			,renderTo: _compId+"_buttons"
			,items: [
		        _btnDefault
		        ,new HSeparator({
		        	height: _btnHeight
		        	,float: "left"
		        })
		        ,_btnCollapse
			]
		});
		_buttonsPanel.render();
		
		//attach the buttons' events
		this._attachDefaultButtonEvent(this._defaultButton,_compId);
		this._attachCollapseButtonEvent(this._collapseButton,_compId,_bodyId);
		
		//set the buttons' disabled mode
		if (_disabled==true) {
			this._defaultButton.getBaseUi().disable();
			this._collapseButton.getBaseUi().disable();
		}
	};
	this.getOptionsId = function() {
		//return the method's value
		return this._uibase.config.id+"_options";
	};
	this.getCollapseButton = function() {
		//declare locals
		var _DEFAULT_ALIGNMENT = "bottom";
		var _compId = this._uibase.config.id;
		var _tooltip = this._uibase.config.optionsButtonTooltip;
		var _alignment = this._uibase.config.optionsAlignment;
		var _iconClass = "splitButtonIconArrowDown";
		var _buttonWidth = this._DEFAULT_COLLAPSE_BUTTON_WIDTH;
		var _disabled = this._uibase.config.disabled;
		
		//set defaults if necessary
		if (!this._uibase._isValidPosition(_alignment)) {
			_alignment = _DEFAULT_ALIGNMENT;
		}
		if (_alignment.toLowerCase()=="top") {
			_iconClass = "splitButtonIconArrowUp";
		}
		
		//check for nulls
		if (this._collapseButton==null) {
			//create a new button
			this._collapseButton = new ToolbarButton({
				id: _compId+"_btnCollapse"
				,className: "toolbarButtonNoBorder"
				,classNameHover: "toolbarButtonNoBorderHover"
				,classNameDisabled: "toolbarButtonNoBorderDisabled"
				,disabled: _disabled
	        	,float: "left"
				,iconClass: _iconClass
				,iconClassDisabled: _iconClass
				,tooltip: _tooltip
				,height: this._uibase.config.height
				,width: _buttonWidth
			});
		}
		
		//return the method's value
		return this._collapseButton;
	};
	this._getDefaultItem = function() {
		//declare locals
		var _buttonObj = null;
		var _config = this._uibase.config;
		var _currItem = null;
		var _currItemId = null;
		var _defaultItemId = null;
		
		//check for a defaultItem attribute
		if (!this._uibase._isEmptyConfig("defaultItem")) {
			_buttonObj = _config.defaultItem;
		}
		
		//check for nulls
		if (_buttonObj==null) {
			//check for a defaultItemId attribute
			if (!this._uibase._isEmptyConfig("defaultItemId")) {
				//get the id of the defaultItem
				_defaultItemId = _config.defaultItemId;
				
				//check for child items
				if (this._uibase._hasItems()) {
					//loop through the items
					for (var i=0;i<_config.items.length;i++) {
						//get the current items
						_currItem = _config.items[i];
						
						//check for nulls
						if (_currItem==null) {
							continue;
						}
						
						//get the item's id
						_currItemId = _currItem._uibase.config.id;
						
						//check for nulls
						if (_currItemId==null || _currItemId=="") {
							continue;
						}
						
						//compare the ids
						if (_defaultItemId.toLowerCase()==_currItemId.toLowerCase()) {
							_buttonObj = _currItem;
							break;
						}
					}
				}
			}
		}
		
		//return the method's value
		return _buttonObj;
	};
	this.getDefaultButton = function() {
		//declare locals
		var _config = this._uibase.config;
		var _compId = _config.id;
		var _buttonObj = null;
		var _iconClass = this._uibase.config.iconClass;
		var _iconClassDisabled = this._uibase.config.iconClassDsiabled;
		var _disabled = this._uibase.config.disabled;
		
		//check for nulls
		if (this._defaultButton==null) {
			//get the defaultItem
			_buttonObj = this._getDefaultItem();
			
			//check for nulls
			if (_buttonObj==null) {
				alert("SplitButton.getDefaultButton(): defaultItem, and defaultItemId are empty or null!!");
			}
			else {
				//create a new button
				this._defaultButton = new ToolbarButton({
					id: _compId+"_btnDefault"
					,className: "toolbarButtonNoBorder"
					,classNameHover: "toolbarButtonNoBorderHover"
					,classNameDisabled: "toolbarButtonNoBorderDisabled"
					,disabled: _disabled
		        	,float: "left"
					,icon: _buttonObj._uibase.config.icon
					,iconClass: _iconClass
					,iconClassDisabled: _iconClassDisabled
					,onclick: _buttonObj._uibase.config.onclick
					,text: _buttonObj._uibase.config.text
					,tooltip: _buttonObj._uibase.config.tooltip
					,height: _buttonObj._uibase.config.height
					,width: _buttonObj._uibase.config.width
				});
			}
		}
		
		//return the method's value
		return this._defaultButton;
	};
	this._attachDefaultButtonEvent = function(_btnObj,_compId) {
		//declare locals
		var _buttonId = _compId+"_btnDefault";
		var _button = null;
		var _fhClick = _btnObj._uibase.config.onclick;
		
		//get the button by its id
		_button = document.getElementById(_buttonId);
		
		//check for nulls
		if (_button==null) {
			return;
		}
		
		//re-attach the click event
		_button.onclick = function() {
			//check if the button is disabled
			if (_button.disabled==true) {
				return;
			}
			
			_fhClick();
		};
	};
	this._attachCollapseButtonEvent = function(_btnObj,_compId,_bodyId) {
		//declare locals
		var _buttonId = _compId+"_btnCollapse";
		var _button = null;
		var _origBodyHeight = $("#"+_bodyId).height();
		
		//get the button by its id
		_button = document.getElementById(_buttonId);
		
		//check for nulls
		if (_button==null) {
			return;
		}
		
		//re-attach the click event
		_button.onclick = function() {
			//check if the button is disabled
			if (_button.disabled==true) {
				return;
			}
			
			//show/hide the options inside the body
			var _currBodyHeight = $("#"+_bodyId).height(); 
			var _currBodyDisplay = $("#"+_bodyId).css('display'); 
			if (_currBodyHeight==0 || _currBodyDisplay=="none") {
				$("#"+_bodyId).css('height',"0px"); 
				$("#"+_bodyId).animate({
					height: _origBodyHeight+"px"
				}, 1000);
			}
			else {
				$("#"+_bodyId).animate({
					height: "0px"
				}, 1000, function() {
					$("#"+_bodyId).hide();
				});
			}
		};
	};
};
};

if(typeof SplitButtonOption!=='function'){
/**
 * A SplitButtonOption UI component
 * @param _config - An array containing the configuration options 
 * @return A SplitButtonOption UI component
 */
function SplitButtonOption(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "splitButtonOption"
		,classNameHover: "splitButtonOptionHover"
		,textStyleClass: "splitButtonOptionText"
		,textStyleClassHover: "splitButtonOptionTextHover"
		,textStyleClassDisabled: "splitButtonOptionTextDisabled"
	};
	this._tagName = "div";
	this._compName = "SplitButtonOption";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	
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
};
};

if(typeof Tab!=='function'){
/**
 * A Tab UI component
 * @param _config - An array containing the configuration options 
 * @return A Tab UI component
 */
function Tab(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "tab"
		,closeable: true
	};
	this._tagName = "div";
	this._compName = "Tab";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	this._tabCloseButton = null;
	this._tabIndex = -1;
	
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
		this._attachTabClickEvent();
	};
	this._attachTabClickEvent = function() {
		//declare locals
		var _buttonId = this._getTabButtonId();
		var _buttonObj = null;
		var _bodyCompId = this._getTabBodyId();
		
		//get items by their ids
		_buttonObj = document.getElementById(_buttonId);
		
		//check for nulls
		if (_buttonObj==null) {
			return;
		}
		
		//attach an onclick event
		_buttonObj.onclick = function() {
			$("#"+_bodyCompId).show();
		};
	};
	this.getHtml = function() {
		//return the method's value
		return this._uibase._compHtml;
	};
	this._getTabCloseButton = function() {
		//return the method's value
		return (this._uibase.config.id + "tabsButtons");
	};
	this._getTabButtonId = function() {
		//return the method's value
		return (this._uibase.config.id + "tabButton");
	};
	this._getTabBodyId = function() {
		//return the method's value
		return (this._uibase.config.id + "tabBody");
	};
	this._generateHtmlTabButton = function(_containerId,_index) {
		//declare locals
		var _html = "";
		var _id = this._uibase.config.id;
		var _icon = this._uibase.config.icon;
		var _text = this._uibase.config.text;
		
		//generate an auto id if necessary
		if (_id==null || _id=="undefined" || _id=="") {
			this._uibase.config.id = _containerId+_index;
		}
		this._tabIndex = _index;
		
		//render the tab's button
		_html += '<div id="'+this._getTabButtonId()+'" class="tabButton">';
		
		//check for an icon
		if (_icon!=null && _icon!="undefined" && _icon!="") {
			_html += '<div class="tabButtonIcon">';
			_html += '<img src="'+_icon+'"/>';
			_html += '</div>';
		}
		
		//check for a text
		if (_icon!=null && _icon!="undefined" && _icon!="") {
			_html += '<div class="tabButtonText">';
			_html += _text;
			_html += '</div>';
		}
		
		_html += '</div>';
		
		//return the method's value
		return _html;
	};	
	this._generateHtml = function() {
		//declare locals
		var _html = "";
		var _config = this._uibase.config;
		
		//check for nulls
		if (this._tagName==null || this._tagName=="undefined" 
			|| this._compName==null || this._compName=="undefined") {
			return "";
		}
		
		//check for a configuration object
		if (_config==null || _config=="undefined") {
			return "";
		}
		
		//start rendering the html tag
		_html = this._uibase._generateHtmlTag(this._tagName,this._compName);
		
		//render the inner HTML of the component
		if (this._uibase.config.html!=null && this._uibase.config.html!="") {
			_html += this._uibase.config.html;
		}
		
		//render the HTML for the child items
		_html += this._uibase._generateBaseItemsHtml(_config);
		
		//finish rendering the component
		_html += '</'+this._tagName+'>';
		
		//save the html
		this._uibase._compHtml = _html;
		
		//return the method's value
		return _html;
	};
};
};

if(typeof TabPanel!=='function'){
/**
 * A TabPanel UI component
 * @param _config - An array containing the configuration options 
 * @return A TabPanel UI component
 */
function TabPanel(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "tabPanel"
		,selectedIndex: 0
	};
	this._tagName = "div";
	this._compName = "TabPanel";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	
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
		//declare locals
		var _panelId = this._uibase.config.id;
		var _renderTo = this._uibase.config.renderTo;
		
		//attach custom events for this component
		this._uibase._attachMouseOverEvents();
		
		//attach custom events for this component
		this._uibase._centerComponent(_panelId,_renderTo);
		this._hideTabs();
	};
	this._hideTabs = function() {
		//declare locals
		var _config = this._uibase.config;
		var _items = null;
		var _currItem = null;
		var _currItemId = null;
		
		//check for a configuration object
		if (_config==null || _config=="undefined") {
			return "";
		}
		
		//get the items
		_items = _config.items;
		
		//check for items
		if (_items==null || _items.length<1) {
			return;
		}
		
		//loop through the items
		for (var i=0;i<_items.length;i++) {
			//get the current item
			_currItem = _items[i];
			
			//get the current item's id
			_currItemId = _currItem._uibase.config.id;
			
			//check the index
			if (i>0) {
				//hide the current item
				$("#"+_currItemId).hide();
			}
		}
	};
	this.getHtml = function() {
		//return the method's value
		return this._uibase._compHtml;
	};
	this._getTabsButtonsId = function() {
		//return the method's value
		return (this._uibase.config.id + "tabsButtons");
	};
	this._getTabsBodiesId = function() {
		//return the method's value
		return (this._uibase.config.id + "tabsBodies");
	};
	this._generateHtml = function() {
		//declare locals
		var _html = "";
		var _config = this._uibase.config;
		var _items = null;
		var _currItem = null;
		var _tabsButtonsContainerId = null;
		var _compHeight = null;
		var _compWidth = null;
		
		//check for nulls
		if (this._tagName==null || this._tagName=="undefined" 
			|| this._compName==null || this._compName=="undefined") {
			return "";
		}
		
		//check for a configuration object
		if (_config==null || _config=="undefined") {
			return "";
		}
		
		//get the component's height and width
		_compHeight = this._uibase._getSizeValue(this._uibase.config.height);
		_compWidth = this._uibase._getSizeValue(this._uibase.config.width);
		if (_compHeight==null) {
			_compHeight = "200px";
		}
		if (_compWidth==null) {
			_compWidth = "300px";
		}
		
		//get the container's id
		_tabsButtonsContainerId = this._getTabsButtonsId();
		
		//start rendering the html tag
		_html = this._uibase._generateHtmlTag(this._tagName,this._compName);
		
		//get the items
		_items = _config.items;
		
		//check for items
		if (_items!=null && _items.length>0) {
			//generate the Tab items' headers 
			_html += '<div id="'+_tabsButtonsContainerId+'" class="tabsButtons">';
			//loop through the items
			for (var i=0;i<_items.length;i++) {
				//get the current item
				_currItem = _items[i];
				
				//render the current Tab's header
				_html += _currItem._generateHtmlTabButton(_tabsButtonsContainerId,i);
			}
			_html += '</div>';
			_html += '<div style="height:2px;width:2px;display:block;">';
			_html += '</div>';
			
			//generate the Tab items' bodies 
			_html += '<div id="'+this._getTabsBodiesId()+'" class="tabsBodies" style="height:'+_compHeight+';width:'+_compWidth+';">';
			//render the HTML for the child items
			_html += this._uibase._generateBaseItemsHtml(_config);
			_html += '</div>';
		}
		
		//finish rendering the component
		_html += '</'+this._tagName+'>';
		
		//save the html
		this._uibase._compHtml = _html;
		
		//return the method's value
		return _html;
	};
};
};

if(typeof Textbox!=='function'){
/**
 * A Textbox UI component
 * @param _config - An array containing the configuration options 
 * @return A Textbox UI component
 */
function Textbox(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "textbox"
		,classNameHover: "textboxHover"
		,textStyleClass: "textboxText"
		,textStyleClassHover: "textboxTextHover"
		,textStyleClassDisabled: "textboxTextDisabled"
		,textStyleClassDefault: "textboxTextDefault"
		,type: "text"
	};
	this._tagName = "input";
	this._compName = "Textbox";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	
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
		var _defaultText = this.getBaseUi().config.defaultText;
		var _compId = this.getBaseUi().config.id;
		var _comp = null;
		var _classNameDefault = this.getBaseUi().config.textStyleClassDefault;
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//check for a default text
		if (!this.getBaseUi().utils.isEmpty(_defaultText)) {
			_comp.value = _defaultText;
			if (!$("#"+_compId).hasClass(_classNameDefault)) {
				$("#"+_compId).addClass(_classNameDefault);
			}
		}
		
		//attach custom events
		this._attachTextboxOnFocusEvent();
		this._attachTextboxOnBlurEvent();
	};
	this._attachTextboxOnFocusEvent=function() {
		//declare locals
		var _utils = this.getBaseUi().utils;
		var _compId =  this.getBaseUi().config.id;
		var _defaultText = this.getBaseUi().config.defaultText;
		var _classNameText = this.getBaseUi().config.textStyleClass;
		var _classNameDefault = this.getBaseUi().config.textStyleClassDefault;
		var _comp = null;
		var _currValue = null;
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//attach the event
		_comp.onfocus = function() {
			//get the current value
			_currValue = _comp.value;
			
			//check for a default text
			if (!_utils.isEmpty(_defaultText)) {
				//compare the text
				if (_currValue==_defaultText) {
					//clean the value
					_comp.value = "";
				}
			}
			
			//reset the text's className
			if ($("#"+_compId).hasClass(_classNameDefault)) {
				$("#"+_compId).removeClass(_classNameDefault);
			}
			if (!$("#"+_compId).hasClass(_classNameText)) {
				$("#"+_compId).addClass(_classNameText);
			}
		};
	};
	this._attachTextboxOnBlurEvent=function() {
		//declare locals
		var _utils = this.getBaseUi().utils;
		var _compId =  this.getBaseUi().config.id;
		var _defaultText = this.getBaseUi().config.defaultText;
		var _classNameText = this.getBaseUi().config.textStyleClass;
		var _classNameDefault = this.getBaseUi().config.textStyleClassDefault;
		var _comp = null;
		var _currValue = null;
		
		//get elements by their ids
		_comp = document.getElementById(_compId);
		
		//check for nulls
		if (_comp==null) {
			return;
		}
		
		//attach the event
		_comp.onblur = function() {
			//get the current value
			_currValue = _comp.value;
			
			//check for a default text
			if (!_utils.isEmpty(_defaultText)) {
				//check for an empty current value
				if (_utils.isEmpty(_currValue)) {
					_comp.value = _defaultText;
					
					//reset the text's className
					if ($("#"+_compId).hasClass(_classNameText)) {
						$("#"+_compId).removeClass(_classNameText);
					}
					if (!$("#"+_compId).hasClass(_classNameDefault)) {
						$("#"+_compId).addClass(_classNameDefault);
					}
				}
			}
		};
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
};
};

if(typeof ThumbnailsView!=='function'){
/**
 * A Textbox UI component
 * @param _config - An array containing the configuration options 
 * @return A Textbox UI component
 */
function ThumbnailsView(_compConfig) {
	//declare component members
	this._DEFAULT_ITEM_HEIGHT = 150;
	this._DEFAULT_ITEM_WIDTH = 100;
	this._DEFAULT_ITEMS_PER_ROW = 5;
	this._DEFAULT_WIDTH = "100%";
	this._DEFAULT_HEIGHT = "100%";
	this._DEFAULT_SPACE_HORIZONTAL = 10;
	this._DEFAULT_SPACE_VERTICAL = 10;
	this._DEFAULT_TOOLBAR_HEIGHT = "30px";
	this._DEFAULT_SHOW_THUMBS_TOOLBAR = true;
	this._DEFAULT_ALLOW_EDIT = false;
	this._extendedConfig = {
		className: "thumbnailsView"
		,itemHeight: this._DEFAULT_ITEM_HEIGHT
		,itemWidth: this._DEFAULT_ITEM_WIDTH
		,data: null
		,dataConfigNames: ""
		,dataImageConfigName: ""
		,horizontalSpace: this._DEFAULT_SPACE_HORIZONTAL
		,verticalSpace: this._DEFAULT_SPACE_VERTICAL
		,itemsPerRow: this._DEFAULT_ITEMS_PER_ROW
		,showToolbar: this._DEFAULT_SHOW_THUMBS_TOOLBAR
		,showTooltip: true
		,tooltipAlignment: "right"
		,allowEdit: this._DEFAULT_ALLOW_EDIT
	};
	this._tagName = "div";
	this._compName = "ThumbnailsView";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	this._arrEditableLabels = new Array();
	
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
		var _config = this.getBaseUi().config;
		
		//generate and render the EditableLabels for this component
		this._generateThumbnailTooltipEditableLabels();
		//this._renderTooltipEditableLabels();
		
		//check if the toolbar exists
		if (_config.showToolbar==true) {
			this._attachThumbnailChangeEvent();
		}
		if (this._showTooltip()==true) {
			this._attachThumbnailsClickEvent();
			this._renderTooltipCloseButton();
			this._attachToolipCloseButtonEvent();
		}
	};
	this.getHtml = function() {
		//return the method's value
		return this._uibase._compHtml;
	};
	this._renderTooltipCloseButton=function() {
		//declare locals
		var _config = this.getBaseUi().config;
		var _compId = _config.id;
		var _renderTo = _compId + "_TooltipClose";
		var _button = null;
		
		//create a new button
		_button = new Button({
			id: _compId + "_TooltipCloseBtn"
			,iconClass: "tooltipCloseButton"
			,renderTo: _renderTo
		});
		
		//render the button
		_button.render();
	};
	this._attachToolipCloseButtonEvent=function() {
		//declare locals
		var _config = this.getBaseUi().config;
		var _compId = _config.id;
		var _buttonId = _compId + "_TooltipCloseBtn";
		var _buttonComp = null;
		var _tooltipId = _compId + "_TooltipContainer";
		
		//get elements by their ids
		_buttonComp = document.getElementById(_buttonId);
		
		//check for nulls
		if (_buttonComp==null) {
			return;
		}
		
		//attach the event
		_buttonComp.onclick=function() {
			//hide the tooltip
			$("#"+_tooltipId).hide();
		};
	};
	this._attachThumbnailsClickEvent=function() {
		//declare locals
		var _config = this.getBaseUi().config;
		var _compId = _config.id;
		var _dataSize = _config.data.length;
		var _currItemId = null;
		
		//loop through the data
		for (var i=0;i<_dataSize;i++) {
			//get the current item's id
			_currItemId = _compId + '_Thumb' + i;
			
			//attach the event
			this._attachThumbnailClickEvent(_currItemId,i);
		}
	};
	this._attachThumbnailClickEvent=function(_compId,_index) {
		//declare locals
		var _mainComp = this;
		var _baseUi = this.getBaseUi();
		var _config = _baseUi.config;
		var _compObj = null;
		var _data = _config.data;
		var _dataItem = _data[_index];
		var _tooltipContId = _config.id + "_TooltipContainer";
		var _tooltipAlignment = _baseUi._getComponentAlignment(_config.tooltipAlignment);
		
		//get elements by their ids
		_compObj = document.getElementById(_compId);
		
		//check for nulls
		if (_compObj==null) {
			return;
		}
		
		//attach the event
		_compObj.onclick=function() {
			//populate a tooltip with the data item's data
			_mainComp._populateTooltip(_dataItem);
			
			//set the tooltip's position
			_baseUi._alignComponent(_tooltipContId, _compId, _tooltipAlignment, true);
			
			//show the tooltip
			$("#"+_tooltipContId).show();
		};
	};
	this._attachThumbnailChangeEvent=function() {
		//declare locals
		var _config = this.getBaseUi().config;
		var _compId = _config.id + "_cmbThumbs";
		var _compObj = null;
		var _compValue = null;
		var _thumbContainerClassName =  _config.id + "_ThumbCont";
		var _thumbClassName =  _config.id + "_Thumb";
		var _valuesDelim = ",";
		var _arrValues = null;
		var _heightValue = null;
		var _widthValue = null;
		
		//get elements by their ids
		_compObj = document.getElementById(_compId);
		
		//check for nulls
		if (_compObj==null) {
			return;
		}
		
		//attach the event
		_compObj.onchange=function() {
			//get the component's value
			_compValue = _compObj.value;
			
			//check for a delimiter
			if (_compValue.indexOf(_valuesDelim)==-1) {
				return;
			}
			
			//split the values into an array
			_arrValues = _compValue.split(_valuesDelim);
			
			//check for a valid array
			if (_arrValues==null || _arrValues.length<2) {
				return;
			}
			
			//get the values
			_heightValue = parseInt(_arrValues[0]);
			_widthValue = parseInt(_arrValues[1]);
			
			//set the new size
			$("."+_thumbContainerClassName).css("height",_heightValue+"px");
			$("."+_thumbContainerClassName).css("width",_widthValue+"px");
			$("."+_thumbClassName).css("height",_heightValue+"px");
			$("."+_thumbClassName).css("width",_widthValue+"px");
		};
	};
	this._generateThumbnailsToolbarHtml = function() {
		//declare locals
		var _config = this.getBaseUi().config;
		var _compId = _config.id;
		var _compWidth = this.getBaseUi()._getSizeValue(_config.width);
		var _html = "";
		
		//render the html
		_html += '<div id="' + _compId + '_Toolbar" style="width:' + _compWidth + ';height:' + this._DEFAULT_TOOLBAR_HEIGHT + ';" >';
		_html += '<table border="0" cellpadding="0" cellspacing="0" style="width:100%;">';
		_html += '<tr>';
		_html += '<td style="width:100px;"><div class="thumbnailsToolbarText">Thumbail Size</div></td>';
		_html += '<td class="horizontalSpacer"><div class="horizontalSpacer"></div></td>';
		_html += '<td>';
		_html += '<select id="' + _compId + '_cmbThumbs" size="1">';
		_html += '<option value="150,100" selected="selected">150x100</option>';
		_html += '<option value="200,150">200x150</option>';
		_html += '<option value="250,200">250x200</option>';
		_html += '<option value="300,250">300x250</option>';
		_html += '</select>';
		_html += '</td>';
		_html += '</tr>';
		_html += '</table>';
		_html += '</div>';
		
		//return the method's value
		return _html;
	};
	this._populateTooltip=function(_dataItem) {
		//declare locals
		var _utils = this.getBaseUi().utils;
		var _config = this.getBaseUi().config;
		var _compId = _config.id;
		var _tooltipId = _config.id + "_Tooltip";
		var _dataConfigNames = _config.dataConfigNames;
		var _imageConfig = _config.dataImageConfigName;
		var _dataConfigNamesDelimiter = ",";
		var _arrDataConfigNames = null;
		var _currDataConfigName = null;
		var _currDataConfigValue = null;
		var _allowEdit = null;
		var _labelContainerId = null;
		var _labelComp = null;
		var _html = "";
		
		//check for nulls
		if (_utils.isEmpty(_dataItem)) {
			return;
		}
		
		//parse the data config names into an array
		if (_dataConfigNames.indexOf(_dataConfigNamesDelimiter)==-1) {
			_arrDataConfigNames = new Array(_dataConfigNames);
		}
		else {
			_arrDataConfigNames = _dataConfigNames.split(_dataConfigNamesDelimiter);
		}
		
		//get the edit flag
		_allowEdit = _utils.parseBoolean(_config.allowEdit);
		
		//start rendering the html
		_html += '<table border="0" cellpadding="0" cellspacing="0" style="width:100%;">';
		
		//loop through the item's options
		for (var j=0;j<_arrDataConfigNames.length;j++) {
			//get the current config option's name
			_currDataConfigName = _arrDataConfigNames[j];
			
			//get the current config option's value
			_currDataConfigValue = _dataItem[_currDataConfigName];
			
			//skip certain attributes
			if (_utils.isEmpty(_currDataConfigValue) 
				|| _currDataConfigName.toLowerCase()==_imageConfig.toLowerCase()) {
				continue;
			}
			
			//trim the value
			_currDataConfigValue = _utils.trim(_currDataConfigValue);
			
			_html += '<tr>';
			_html += '<td style="vertical-align:top;">' + _currDataConfigName + ':</td>';
			_html += '<td><div class="horizontalSpacer"></div></td>';
			if (_allowEdit==true) {
				_labelContainerId = _compId + '_elContainer' + j;
				_labelComp = this._arrEditableLabels[j];
				_labelComp.getBaseUi().config.renderTo = _labelContainerId; 
				_labelComp.getBaseUi().config.text = _currDataConfigValue; 
				
				_html += '<td id="' + _labelContainerId + '">';
				//_html += _labelComp.getHtml();
				_html += '<input type="text" size="20" value="'+_currDataConfigValue+'"/>';
				_html += '</td>';
			}
			else {
				_html += '<td>';
				_html += _currDataConfigValue;
				_html += '</td>';
			}
			_html += '</tr>';
		}
		
		//finish rendering the html
		if (_allowEdit==true) {
			_html += '<tr>';
			_html += '<td>';
			_html += '<input id="' + _compId + '_btnSave" type="button" value="Save" title="Click here to save the data"/>';
			_html += '</td>';
			_html += '</tr>';
		}
		_html += '</table>';
		
		//render the html into the tooltip
		$("#"+_tooltipId).html(_html);
	};
	this._generateThumbnailTooltipHtml=function() {
		//declare locals
		var _config = this.getBaseUi().config;
		var _compId = _config.id;
		var _closeButtonId = _compId + "_TooltipClose";
		var _tooltipContId = _compId + "_TooltipContainer";
		var _tooltipId = _compId + "_Tooltip";
		var _tooltipContClass = "thumbnailsViewTooltipContainer";
		var _tooltipClass = "thumbnailsViewTooltip";
		var _html = "";
		
		//render the html
		_html += '<div id="' + _tooltipContId + '" class="' + _tooltipContClass + '">';
		_html += '<table border="0" cellpadding="0" cellspacing="0" style="width:100%;">';
		_html += '<tr>';
		_html += '<td style="width:100%;">';
		_html += '</td>';
		_html += '<td id="' + _closeButtonId + '" style="width:20px;height:20px;">';
		_html += '</td>';
		_html += '</tr>';
		_html += '</table>';
		_html += '<div id="' + _tooltipId + '" class="' + _tooltipClass + '">';
		_html += '</div>';
		_html += '</div>';
		
		//return the method's value
		return _html;
	};
	this._generateThumbnailTooltipEditableLabels=function() {
		//declare locals
		var _config = this.getBaseUi().config;
		var _compId = _config.id;
		var _dataConfigNames = _config.dataConfigNames;
		var _dataConfigNamesDelimiter = ",";
		var _arrDataConfigNames = null;
		var _labelComp = null;
		
		//parse the data config names into an array
		if (_dataConfigNames.indexOf(_dataConfigNamesDelimiter)==-1) {
			_arrDataConfigNames = new Array(_dataConfigNames);
		}
		else {
			_arrDataConfigNames = _dataConfigNames.split(_dataConfigNamesDelimiter);
		}
		
		//loop through the item's options
		for (var j=0;j<_arrDataConfigNames.length;j++) {
			//generate a new EditableLabel component
			_labelComp = new EditableLabel({id: _compId+"_el"+j});
			
			//add it to the array of labels
			this._arrEditableLabels.push(_labelComp);
		}
	};
	this._renderTooltipEditableLabels=function() {
		//declare locals
		var _arrComps = this._arrEditableLabels;
		var _labelComp = null;
		
		//loop through the item's options
		for (var j=0;j<_arrComps.length;j++) {
			//get the current item
			_labelComp = _arrComps[j];
			
			//render it
			_labelComp.render();
		}
	};
	this._generateDataHtml = function() {
		//declare locals
		var _utils = this.getBaseUi().utils;
		var _config = this.getBaseUi().config;
		var _compId = _config.id;
		var _sampleItems = 4;
		var _itemsPerRow = null;
		var _newRow = false;
		var _data = _config.data;
		var _dataItem = null;
		var _dataConfigNames = _config.dataConfigNames;
		var _imageConfig = _config.dataImageConfigName;
		var _currItem = null;
		var _dataConfigNamesDelimiter = ",";
		var _arrDataConfigNames = null;
		var _currDataConfigName = null;
		var _currDataConfigValue = null;
		var _itemHeight = null;
		var _itemWidth = null;
		var _horizontalSpace = null;
		var _verticalSpace = null;
		var _compHeight = this.getBaseUi()._getSizeValue(_config.height);
		var _compWidth = this.getBaseUi()._getSizeValue(_config.width);
		var _html = "";
		
		//get the item's size
		_itemsPerRow = _utils.parseNumber(_config.itemsPerRow);
		_itemHeight = this.getBaseUi()._getSizeValue(_config.itemHeight);
		_itemWidth = this.getBaseUi()._getSizeValue(_config.itemWidth);
		_horizontalSpace = this.getBaseUi()._getSizeValue(_config.horizontalSpace);
		_verticalSpace = this.getBaseUi()._getSizeValue(_config.verticalSpace);
		
		//set defaults if necessary
		if (_utils.isEmpty(_itemsPerRow)) {
			_itemsPerRow = this._DEFAULT_ITEMS_PER_ROW;
		}
		if (_utils.isEmpty(_itemHeight)) {
			_itemHeight = this.getBaseUi()._getSizeValue(this._DEFAULT_ITEM_HEIGHT);
		}
		if (_utils.isEmpty(_itemWidth)) {
			_itemWidth = this.getBaseUi()._getSizeValue(this._DEFAULT_ITEM_WIDTH);
		}
		if (_utils.isEmpty(_horizontalSpace)) {
			_horizontalSpace = this.getBaseUi()._getSizeValue(this._DEFAULT_SPACE_HORIZONTAL);
		}
		if (_utils.isEmpty(_verticalSpace)) {
			_verticalSpace = this.getBaseUi()._getSizeValue(this._DEFAULT_SPACE_VERTICAL);
		}
		if (_utils.isEmpty(_imageConfig) || (typeof _imageConfig!="string")) {
			_imageConfig = "image";
		}
		if (_utils.isEmpty(_dataConfigNames) || (typeof _dataConfigNames!="string")) {
			//create a sample empty data view
			_dataConfigNames = "id,info2,info3,info4";
		}
		
		//parse the data config names into an array
		if (_dataConfigNames.indexOf(_dataConfigNamesDelimiter)==-1) {
			_arrDataConfigNames = new Array(_dataConfigNames);
		}
		else {
			_arrDataConfigNames = _dataConfigNames.split(_dataConfigNamesDelimiter);
		}
		
		if (_data==null || _data.length<1) {
			//create a sample empty data view
			_data = [];
			
			//loop through the sample items
			for (var i=0;i<_sampleItems;i++) {
				//create a new data items
				_dataItem = {
					id: (_compId + '_Item_' + i)
					,info1: null
					,info2: null
					,info3: null
					,info4: null
				};
				
				//loop through the item's options
				for (var j=0;j<_arrDataConfigNames.length;j++) {
					//get the current config option's name
					_currDataConfigName = _arrDataConfigNames[j];
					
					//get the current config option's value
					if (_currDataConfigName.toLowerCase()=="id") {
						continue;
					}
					_dataItem[_currDataConfigName] = "";
				}
				
				//add the new item to the array of data
				_data.push(_dataItem);
			}
		}
		
		//start rendering the html
		_html += '<div style="height:' + _compHeight + ';width:' + _compWidth + ';">';
		_html += '<table border="0" cellspacing="0" cellpadding="0">';
		
		//loop through the data
		for (var i=0;i<_data.length;i++) {
			//get the current item
			_currItem = _data[i];
			
			//check for nulls
			if (_utils.isEmpty(_currItem)) {
				continue;
			}
			
			//check for a new row
			if ((i%_itemsPerRow)==0) {
				_newRow = true;
			}
			else {
				_newRow = false;
			}
			if (_newRow==true) {
				_html += '<tr>';
			}
			
			//render the current item
//			_html += '<div id="' + (_compId + '_ThumbCont' + i) + '" class="' + _compId + '_ThumbCont" style="float:left;width:' + _itemWidth + ';height:' + _itemHeight + ';" >';
			_html += '<td>';
			_html += '<img id="' + (_compId + '_Thumb' + i) + '" class="' + _compId + '_Thumb" src="' + _currItem[_imageConfig] + '" style="width:' + _itemWidth + ';height:' + _itemHeight + ';" />';
			_html += '</td>';
			//create a horizontal spacer row
			_html += '<td>';
			_html += '<div style="height:' + _itemHeight + ';width:' + _horizontalSpace + ';">';
			_html += '</div>';
//			_html += '</div>';
//			_html += '<div style="float:left;width:' + _horizontalSpace + ';height:' + _itemHeight + ';">';
//			_html += '</div>';
			
			//check for a new row
			if (((i+1)%_itemsPerRow)==0) {
				_html += '</tr>';
				//create a vertical spacer row
				_html += '<tr>';
				_html += '<td>';
				_html += '<div style="width:100%;height:' + _verticalSpace + ';">';
				_html += '</div>';
				_html += '</td>';
				_html += '</tr>';
			}
		}
		
		//end rendering the html
		_html += '</table>';
		_html += '</div>';
		
		//return the method's value
		return _html;
	};
	this._showTooltip=function() {
		//declare locals
		var _showTooltip = this.getBaseUi().config.showTooltip;
		
		//return the method's value
		return _showTooltip;
	};
	this._generateHtml = function() {
		//declare locals
		var _html = "";
		var _htmlInner = "";
		var _config = this.getBaseUi().config;
		var _utils = this.getBaseUi().utils;
		var _height = null;
		var _width = null;
		
		//check for a configuration object
		if (this.getBaseUi().utils.isEmpty(_config)) {
			return "";
		}
		
		//set defaults if necessary
		_height = this.getBaseUi()._getSizeValue(_config.height);
		_width = this.getBaseUi()._getSizeValue(_config.width);
		if (_utils.isEmpty(_height)) {
			this.getBaseUi().config.height = this._DEFAULT_HEIGHT;
		}
		if (_utils.isEmpty(_width)) {
			this.getBaseUi().config.width = this._DEFAULT_WIDTH;
		}
		
		//start rendering the html tag
		this.getBaseUi()._containerHtmlTag = this.getBaseUi()._generateHtmlTag(this._tagName,this._compName);
		_html = this.getBaseUi()._containerHtmlTag;
		
		//render the item's data
		if (_config.showToolbar==true) {
			_htmlInner += this._generateThumbnailsToolbarHtml();
		}
		_htmlInner += this._generateDataHtml();
		if (this._showTooltip()==true) {
			_htmlInner += this._generateThumbnailTooltipHtml();
		}
		
		//finish rendering the component
		_html += _htmlInner + '</'+this._tagName+'>';
		
		//save the html
		this.getBaseUi()._compHtml = _htmlInner;
		
		//return the method's value
		return _html;
	};
};
};

if(typeof Toolbar!=='function'){
/**
 * A Toolbar UI component
 * @param _config - An array containing the configuration options 
 * @return A Toolbar UI component
 */
function Toolbar(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "toolbar"
		,classNameHover: "toolbarHover"
		,layout: "horizontal"
	};
	this._tagName = "div";
	this._compName = "Toolbar";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	
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
};
};

if(typeof ToolbarButton!=='function'){
/**
 * A ToolbarButton UI component
 * @param _config - An array containing the configuration options 
 * @return A ToolbarButton UI component
 */
function ToolbarButton(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "toolbarButton"
		,classNameHover: "toolbarButtonHover"
		,textStyleClass: "toolbarButtonText"
		,textStyleClassHover: "toolbarButtonTextHover"
		,textStyleClassDisabled: "toolbarButtonTextDisabled"
		,type: "button"
	};
	this._tagName = "div";
	this._compName = "ToolbarButton";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	
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
	this.utils = new _Utils(); 
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
		var _utils = new _Utils();
		
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
		var _utils = new _Utils();
		
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
	        	_html += ' '+_optName+'="'+_optValue+'"';
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
			,dir: "ltr"
			,disabled: false
			,enctype: ""
			,float: "none"
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
		_strAlign = this._getComponentAlignment(_config.align);
		_strFloat = this._getComponentFloat(_config.float);
		_strHeight = this._getSizeValue(_config.height);
		_strOpacity = this._getComponentOpacity(_config.opacity);
		_strWidth = this._getSizeValue(_config.width);
		
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
		_compObj.className = _compStyleClass;
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
	//initialize the component
	this._initBase();
};
};

if(typeof UiLocker!=='function'){
/**
 * A UiLocker UI component
 * @param _config - An array containing the configuration options 
 * @return A UiLocker UI component
 */
function UiLocker(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "uiLocker"
		,classNameHover: "uiLockerHover"
	};
	this._tagName = "div";
	this._compName = "UiLocker";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	
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
	this.show = function() {
		//declare locals
		var _compId = this._uibase.config.id;
		
		//show the component
		$("#"+_compId).show();
	};
	this.hide = function() {
		//declare locals
		var _compId = this._uibase.config.id;
		
		//show the component
		$("#"+_compId).hide();
	};
	this._render = function() {
		//render the component's children
		this._uibase._renderChildItems();
		
		//align the UiLocker
		if (!this._uibase.utils.isEmpty(this._uibase.config.alignTo)) {
			var _compId = this._uibase.config.id;
			var _alignTo = this._uibase.config.alignTo;
			var _alignment = this._uibase.config.align;
			this._uibase._alignComponent(_compId, _alignTo, _alignment, true);
		}
		
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
};
};

if(typeof VSeparator!=='function'){
/**
 * A VSeparator UI component
 * @param _config - An array containing the configuration options 
 * @return A VSeparator UI component
 */
function VSeparator(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "vSeparator"
		,classNameHover: "vSeparatorHover"
	};
	this._tagName = "div";
	this._compName = "VSeparator";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	
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
};
};

if(typeof DialogWindow!=='function'){
/**
 * A DialogWindow UI component
 * @param _config - An array containing the configuration options 
 * @return A DialogWindow UI component
 */
function DialogWindow(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "window"
		,closeable: true
		,collapsible: true
		,header: ""
		,maximizeable: true
		,modal: false
		,movable: true
		,multiple: false
		,recenterOnWinResize: true
		,resizable: true
		,resizableHandles: "se"
		,resizableMinHeight: 100
		,resizableMinWidth: 118
		,resizableGhost: false
		,statusbarItems: []
	};
	this._tagName = "div";
	this._compName = "DialogWindow";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	this._closeButton = null;
	this._collapseButton = null;
	this._maximizeButton = null;
	this._DEFAULT_ICON_WIDTH = 20;
	this._DEFAULT_HSPACER_WIDTH = 5;
	this._DEFAULT_WINDOW_HEIGHT = 200;
	this._DEFAULT_WINDOW_WIDTH = 300;
	this._DEFAULT_HEADER_HEIGHT = 30;
	this._DEFAULT_HEADER_VSPACER = 10;
	this._DEFAULT_FOOTER_HEIGHT = 30;
	this._DEFAULT_FOOTER_VSPACER = 0;
	
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
		//declare locals
		var _windowId = this._uibase.config.id;
		var _renderTo = this._uibase.config.renderTo;
		
		//center the component
		this._uibase._centerComponent(_windowId,_renderTo);
		this._reCenterComponent();
		
		//render the component's children
		if (this._uibase.config.collapsible==true || this._uibase.config.closeable==true) {
			this._renderButtons();
		}
		this._uibase._renderChildItems();
		
		//render a status bar if necessary
		this._renderStatusbar();
		
		//render a UiLocker if necessary
		this._renderUiLocker();
		
		//attach custom component events
		this._attachEvents();
	};
	this._renderStatusbar = function() {
		//declare locals
		var _currSbItem = null;
		
		//check for a status bar
		if (!this._hasStatusbar()) {
			return;
		}
		
		//loop through the items
		for (var i=0;i<this._uibase.config.statusbarItems.length;i++) {
			//get the current item
			_currSbItem = this._uibase.config.statusbarItems[i];
			
			//render the current item
			_currSbItem._render();
		}
	};
	this._renderUiLocker = function() {
		var _uiLocker = null;
		var _uiLockerId = this._getUiLockerId();
		var _compObj = null;
		
		//check the modal configuration option
		if (this._uibase.config.modal==true) {
			//check for an existing uiLocker
			_compObj = document.getElementById(_uiLockerId);
			if (_compObj!=null) {
				return;
			}
			
			//create a new UiLocker
			_uiLocker = new UiLocker({
				id: _uiLockerId
				,height: "100%"
				,opacity: "0.5"
				,width: "100%"
			});
			
			//render the component
			_uiLocker.render();
		}
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
		this._setHeaderTextWidth(this);
		this._setMoveable();
		this._setResizeble();
	};
	this.getHtml = function() {
		//return the method's value
		return this._uibase._compHtml;
	};
	this._reCenterComponent = function() {
		//declare locals
		var _windowId = this._uibase.config.id;
		var _renderTo = this._uibase.config.renderTo;
		var _winOnResizeFH = null;
		var _centerFH = this._uibase._centerComponent;
		
		//check for an existing window's onresize event handler
		if (typeof window.onresize == "function") {
			//get a referecne to the window's onresize event handler
			_winOnResizeFH = window.onresize;
		}
		
		//attache an onresize event
		window.onresize = function(_event) {
			//invoke the original event handler, if it exists
			if (_winOnResizeFH!=null && (typeof _winOnResizeFH == "function")) {
				_winOnResizeFH(_event);
			}
			
			//check if the current component should be re-centered
			var _attRecenter = $("#"+_windowId).attr("recenterOnWinResize");
			if (_attRecenter!=null && (_attRecenter.toLowerCase()=="true" || _attRecenter.toLowerCase()=="recenteronwinresize")) {
				//re-center the current component on the window
				_centerFH(_windowId,_renderTo);
			}
		};
	};
	this._setMoveable = function() {
		//declare locals
		var _compId = this._uibase.config.id;
		var _handleId = ".windowHeader";
		var _onMoveStart = this._onBeforeMove;
		
		//set the component's attribute
		if (this._uibase.config.movable==true) {
			$("#"+_compId).draggable({ 
				disabled: false
				,containment: 'window'
				,handle: _handleId
				,stack: ".window"
				,start: function(event, ui) {
					_onMoveStart(event, ui, _compId);
				}
			});		
		}
		/*
		else {
			$("#"+_compId).draggable({
				disabled: true
			}); 
		}
		*/
	};
	this._onBeforeMove = function(event, ui,_compId) {
		//do something
	};
	this._setResizeble = function() {
		//declare locals
		var _windowComp = this;
		var _compId = _windowComp._uibase.config.id;
		var _bodyId = _windowComp.getBodyId();
		var _onResizeStart = _windowComp._onBeforeResize;
		var _onResizeComplete = _windowComp._onAfterResize;
		var _handles = _windowComp._uibase.config.resizableHandles;
		var _minHeight = _windowComp._uibase._getNumericValue(_windowComp._uibase.config.resizableMinHeight);
		var _minWidth = _windowComp._uibase._getNumericValue(_windowComp._uibase.config.resizableMinWidth);
		var _ghost = _windowComp._uibase.config.resizableGhost;
		var _resizeable = _windowComp._uibase.config.resizable;
		
		//fix min values if necessary
		if (_minHeight<100) {
			_minHeight = 100;
		}
		if (_minWidth<118) {
			_minWidth = 118;
		}
		
		
		//set the component's attribute
		if (_resizeable==true) {
			$("#"+_compId).resizable({
				disabled: false
				,containment: 'document'
				,handles: _handles
				,ghost: _ghost
				,alsoResize: "#"+_bodyId
				,minHeight: _minHeight
				,minWidth: _minWidth
				,start: function(event, ui) {
					_onResizeStart(event, ui,_compId);
				}
				,stop: function(event, ui) {
					_onResizeComplete(event, ui,_windowComp);
				}
			});		
		}
		/*
		else {
			$("#"+_compId).resizable({
				disabled: true
			}); 
		}
		*/
	};
	this._onBeforeResize = function(event, ui,_compId) {
		//do something
	};
	this._onAfterResize = function(event, ui,_windowComp) {
		//declare locals
		var _btnCollapse = null;
		var _windowId = null;
		var _bodyId = null;
		var _resizeable = null;
		
		//check for nulls
		if (_windowComp==null || _windowComp=="undefined") {
			return;
		}
		
		//initialize variables
		_btnCollapse = _windowComp._collapseButton;
		_windowId = _windowComp._uibase.config.id;
		_bodyId = _windowComp.getBodyId();
		_resizeable = _windowComp._uibase.config.resizable;
		
		//reset the header's text
		this._setHeaderTextWidth(_windowComp);
		
		//re-attach the collapse button
		_windowComp._attachCollapseButtonEvent(_btnCollapse,_windowId,_bodyId,_resizeable);
	};
	this.getFooterId = function() {
		//return the method's value
		return this._uibase.config.id+"_footer";
	};
	this.getHeaderId = function() {
		//return the method's value
		return this._uibase.config.id+"_header";
	};
	this.getHeaderIconId = function() {
		//return the method's value
		return this.getHeaderId()+"_icon";
	};
	this.getHeaderTextId = function() {
		//return the method's value
		return this.getHeaderId()+"_text";
	};
	this.getBodyId = function() {
		//return the method's value
		return this._uibase.config.id+"_body";
	};
	this._getButtonsContainerId = function() {
		//return the method's value
		return this._uibase.config.id+"_headerButtons";
	};
	this._getButtonsWidth = function() {
		//declare locals
		var _compWidth = 0;
		var _buttonWidth = 26;
		
		//check if both buttons exist
		if (this._uibase.config.collapsible==true) {
			_compWidth += _buttonWidth;
		} 
		if (this._uibase.config.closeable==true) {
			_compWidth += _buttonWidth;
		}
		if (this._uibase.config.maximizeable==true) {
			_compWidth += _buttonWidth;
		}
		if (this._uibase.config.collapsible==true || this._uibase.config.closeable==true) {
			_compWidth += this._DEFAULT_HSPACER_WIDTH;
		}
		
		//return the method's value
		return _compWidth;
	};
	this._getIconWidth = function() {
		//declare locals
		var _compWidth = 0;
		
		//check if an icon exist
		if (!this._uibase._isEmptyConfig("icon")) {
			_compWidth = this._DEFAULT_ICON_WIDTH;
			_compWidth += this._DEFAULT_HSPACER_WIDTH;
		}
		
		//return the method's value
		return _compWidth;
	};
	this._setHeaderTextWidth = function(_windowComp) {
		//declare locals
		var _DEFAULT_CHAR_SIZE = 6.2;
		var _iconWidth = _windowComp._getIconWidth();
		var _buttonsPanelWidth = _windowComp._getButtonsWidth();
		var _compWidth = 0;
		var _headerTextId = null;
		var _headerTextComp = null;
		var _headerTextFull = null;
		var _headerText = null;
		var _headerTextWidth = null;
		var _headerTextLength = null;
		
		//check for nulls
		if (_windowComp==null || _windowComp=="undefined") {
			return;
		}
		
		//initialize variables
		_compWidth = $("#"+_windowComp._uibase.config.id).width();
		_headerTextId = _windowComp.getHeaderTextId();
		
		//check for a header text
		if (!_windowComp._uibase._isEmptyConfig("header")) {
			_headerTextComp = document.getElementById(_headerTextId);
			
			//check for nulls
			if (_headerTextComp==null) {
				return;
			}
			
			//fix the header's width
			_headerTextWidth = _compWidth - (_buttonsPanelWidth+_iconWidth+7);
			$("#"+_headerTextId).css("width",_headerTextWidth+"px");
			
			//fix the header's text
			_headerTextFull = _windowComp._uibase.config.header;
			_headerTextLength = _headerTextFull.length;
			
			if (_headerTextWidth<(_DEFAULT_CHAR_SIZE*_headerTextLength)) {
				_headerTextLength = Math.round(_headerTextWidth/_DEFAULT_CHAR_SIZE);
				_headerText = _headerTextFull.substring(0,_headerTextLength-4);
				_headerTextComp.innerHTML = _headerText+"...";
				_headerTextComp.title = _headerTextFull;
			}
			else {
				_headerTextComp.innerHTML = _headerTextFull;
				_headerTextComp.title = "";
			}
		}
	};
	this._renderButtons = function() {
		//declare locals
		var _btnClose = null;
		var _btnCollapse = null;
		var _btnMaximize = null;
		var _windowId = this._uibase.config.id;
		var _modal = this._uibase.config.modal;
		
		//get the buttons
		if (this._uibase.config.collapsible==true) {
			_btnCollapse = this.getCollapseButton();
		}
		if (this._uibase.config.closeable==true) {
			_btnClose = this.getCloseButton();
		}
		if (this._uibase.config.maximizeable==true) {
			_btnMaximize = this.getMaximizeButton();
		}
		
		//render a buttons panel
		var _buttonsPanel = new Panel({
			id: _windowId+"_buttonsPanel"
			,cellspacing: 1
			,float: "left"
			,renderTo: this._getButtonsContainerId()
			,width: this._getButtonsWidth()
			,height: "26px"
			,items: [
			    _btnCollapse
		        ,_btnMaximize
		        ,_btnClose
			]
		});
		_buttonsPanel.render();
		
		//attach the buttons' events
		if (this._uibase.config.closeable==true) {
			this._attachCloseButtonEvent(_windowId,_modal);
		}
		if (this._uibase.config.collapsible==true) {
			this._attachCollapseButtonEvent();
		}
		if (this._uibase.config.maximizeable==true) {
			this._attachMaximizeButtonEvent(_windowId, _btnMaximize);
		}
	};
	this._getUiLockerId = function() {
		//declare locals
		var _compId = "singletonUiLocker";
		
		//return the method's value
		return _compId;
	};
	this._hasStatusbar = function() {
		//declare locals
		var retVal = false;
		
		//check for status bar items
		if (this._uibase.config.statusbarItems!=null && this._uibase.config.statusbarItems.length>0) {
			retVal = true;
		}
		
		//return the method's value
		return retVal;
	};
	this._maximize = function(_windowId,_maxBtnObj,_collapseBtnObj,_origHeight,_origWidth,_origLeft,_origTop) {
		//declare locals
		var _currButtonIconClass = null;
		
		//get the button's current iconClass
		_currButtonIconClass = _maxBtnObj.getBaseUi().getIconClass();
		if (_currButtonIconClass.toLowerCase()=="windowbuttonmaximize") {
			//maximize the window
			$("#"+_windowId).css("height","100%");
			$("#"+_windowId).css("width","100%");
			$("#"+_windowId).css("position","absolute");
			$("#"+_windowId).css("left","0px");
			$("#"+_windowId).css("top","0px");
			
			//replace the icon to the restore icon
			_maxBtnObj.getBaseUi().setIconClass("windowButtonRestore");
			
			//disable the collapse button
			if (_collapseBtnObj!=null) {
				_collapseBtnObj.getBaseUi().disable();
			}
		}
		else if (_currButtonIconClass.toLowerCase()=="windowbuttonrestore") {
			//restore the window
			$("#"+_windowId).css("height",_origHeight+"px");
			$("#"+_windowId).css("width",_origWidth+"px");
			$("#"+_windowId).css("position","absolute");
			$("#"+_windowId).css("left",_origLeft);
			$("#"+_windowId).css("top",_origTop);
			
			//replace the icon to the maximize icon
			_maxBtnObj.getBaseUi().setIconClass("windowButtonMaximize");
			
			//enable the collapse button
			if (_collapseBtnObj!=null) {
				_collapseBtnObj.getBaseUi().enable();
			}
		}
	};
	this._show = function(_windowId,_modal,_uiLockerId) {
		//declare locals
		var _effectSpeed = "slow";
		var _display = null;
		
		//get the component's display attribute
		_display = $("#"+_windowId).css("display");
		
		//check if the component is hidden
		if (_display!=null && _display.toLowerCase()=="none") {
			//show the component
			if (_modal==true) {
				$("#"+_uiLockerId).show();
			}
			$("#"+_windowId).fadeIn(_effectSpeed);
		}
	};
	this.collapse = function() {
		//declare locals
		var _windowComp = this;
		
		//invoke the overloaded method
		this._collapse(_windowComp);
	};
	this.maximize = function() {
		//declare locals
		var _windowId = this._uibase.config.id;
		var _btnMaximize = this._maximizeButton;
		var _btnCollapse = this._collapseButton;
		var _origHeight = $("#"+_windowId).height();
		var _origWidth = $("#"+_windowId).width();
		var _origLeft = $("#"+_windowId).position().left;
		var _origTop = $("#"+_windowId).position().top;
		
		//invoke the overloaded method
		this._maximize(_windowId, _btnMaximize, _btnCollapse, _origHeight, _origWidth, _origLeft, _origTop);
	};
	this.show = function() {
		//declare locals
		var _windowId = this._uibase.config.id;
		var _modal = this._uibase.config.modal;
		var _uiLockerId = this._getUiLockerId();
		
		//invoke the overloaded method
		this._show(_windowId,_modal,_uiLockerId);
	};
	this._hide = function(_windowId,_modal,_uiLockerId) {
		//declare locals
		var _effectSpeed = "slow";
		var _display = null;
		
		//get the component's display attribute
		_display = $("#"+_windowId).css("display");
		
		//check if the component is hidden
		if (_display==null || _display.toLowerCase()=="block") {
			//hide the component
			if (_modal==true) {
				$("#"+_uiLockerId).hide();
			}
			$("#"+_windowId).fadeOut(_effectSpeed);
		}
	};
	this.hide = function() {
		//declare locals
		var _windowId = this._uibase.config.id;
		var _modal = this._uibase.config.modal;
		
		//invoke the overloaded method
		this._hide(_windowId,_modal);
	};
	this.isHidden = function() {
		//declare locals
		var _windowId = this._uibase.config.id;
		var _display = null;
		
		//get the component's display attribute
		_display = $("#"+_windowId).css("display");
		
		//check if the component is hidden
		if (_display!=null && _display.toLowerCase()=="none") {
			return true;
		}
		
		//return the method's value
		return false;
	};
	this.getCloseButton = function() {
		//declare locals
		var _windowId = this._uibase.config.id;
		
		//check for nulls
		if (this._closeButton==null) {
			this._closeButton = new ToolbarButton({
				id: _windowId+"_btnClose"
				,float: "left"
				,iconClass: "windowButtonClose"
				,tooltip: "Click here to close this window"
				,height: "24px"
				,width: "24px"
			});
		}
		
		//return the method's value
		return this._closeButton;
	};
	this.setCloseButton = function(closeButton) {
		//set the member
		this._closeButton = closeButton;
	};
	this.getMaximizeButton = function() {
		//declare locals
		var _windowId = this._uibase.config.id;
		
		//check for nulls
		if (this._maximizeButton==null) {
			this._maximizeButton = new ToolbarButton({
				id: _windowId+"_btnMaximize"
				,float: "left"
				,iconClass: "windowButtonMaximize"
				,tooltip: "Click here to maximize this window"
				,height: "24px"
				,width: "24px"
			});
		}
		
		//return the method's value
		return this._maximizeButton;
	};
	this.setMaximizeButton = function(maximizeButton) {
		//set the member
		this._maximizeButton = maximizeButton;
	};
	this.getCollapseButton = function() {
		//declare locals
		var _windowId = this._uibase.config.id;
		
		//check for nulls
		if (this._collapseButton==null) {
			this._collapseButton = new ToolbarButton({
				id: _windowId+"_btnCollapse"
				,float: "left"
				,iconClass: "windowButtonCollapse"
				,tooltip: "Click here to collapse/expand this window"
				,height: "24px"
				,width: "24px"
			});
		}
		
		//return the method's value
		return this._collapseButton;
	};
	this.setCollapseButton = function(collapseButton) {
		//set the member
		this._collapseButton = collapseButton;
	};
	this._attachCloseButtonEvent = function(_windowId,_modal) {
		//declare locals
		var _buttonId = _windowId+"_btnClose";
		var _button = null;
		var _uiLockerId = this._getUiLockerId();
		var _fhClick = this._hide;
		
		//get the button by its id
		_button = document.getElementById(_buttonId);
		
		//check for nulls
		if (_button==null) {
			return;
		}
		
		//re-attach the click event
		_button.onclick = function() {
			_fhClick(_windowId,_modal,_uiLockerId);
		};
	};
	this._attachMaximizeButtonEvent = function(_windowId,_maxBtnObj) {
		//declare locals
		var _buttonId = _windowId+"_btnMaximize";
		var _origCompHeight = $("#"+_windowId).height();
		var _origCompWidth = $("#"+_windowId).width();
		var _origCompLeft = $("#"+_windowId).position().left;
		var _origCompTop = $("#"+_windowId).position().top;
		var _button = null;
		var _fhClick = this._maximize;
		var _btnCollapse = this._collapseButton;
		
		//get the button by its id
		_button = document.getElementById(_buttonId);
		
		//check for nulls
		if (_button==null) {
			return;
		}
		
		//re-attach the click event
		_button.onclick = function() {
			//invoke the event handler
			_fhClick(_windowId,_maxBtnObj,_btnCollapse,_origCompHeight,_origCompWidth,_origCompLeft,_origCompTop);
		};
	};
	this._attachCollapseButtonEvent = function() {
		//declare locals
		var _windowComp = this;
		var _fhClick = this._collapse;
		var _buttonId = this._uibase.config.id+"_btnCollapse";
		var _button = null;
		
		//get the button by its id
		_button = document.getElementById(_buttonId);
		
		//check for nulls
		if (_button==null) {
			return;
		}
		
		//re-attach the click event
		_button.onclick = function() {
			//check if the button is disabled
			if (_button.disabled==true) {
				return;
			}
			
			//invoke the event handler
			_fhClick(_windowComp);
		};
	};
	this._collapse = function(_windowComp) {
		//declare locals
		var _windowId = _windowComp.getBaseUi().config.id;
		var _bodyId = _windowComp.getBodyId();
		var _footerId = _windowComp.getFooterId();
		var _origCompHeight =  _windowComp.getBaseUi()._getNumericValue(_windowComp.getBaseUi().config.height);
		var _origBodyHeight = _windowComp._getBodyHeight();
		var _currBodyHeight = $("#"+_bodyId).height(); 
		var _currBodyDisplay = $("#"+_bodyId).css('display'); 
		var _btnObj = _windowComp.getCollapseButton();
		var _resizeable = _windowComp.getBaseUi().config.resizable;
		
		//check the current height and display
		if (_currBodyHeight==0 || _currBodyDisplay=="none") {
			$("#"+_bodyId).animate({
				height: _origBodyHeight+"px"
			}, 1500);
			$("#"+_windowId).animate({
				height: _origCompHeight+"px"
			}, 1500);
			_btnObj.getBaseUi().setIconClass("windowButtonCollapse");
			//show the footer
			$("#"+_footerId).show();
			if (_resizeable==true) {
				$("#"+_windowId).resizable("enable"); 
			}
		}
		else {
			$("#"+_windowId).animate({
				height: "30px"
			}, 1500);
			$("#"+_bodyId).animate({
				height: "0px"
			}, 1500);
			//hide the footer
			$("#"+_footerId).hide();
			_btnObj.getBaseUi().setIconClass("windowButtonExpand");
			if (_resizeable==true) {
				$("#"+_windowId).resizable("disable"); 
			}
		}
	};
	this._getBodyHeight = function() {
		//declare locals
		var _compHeight = this._uibase._getNumericValue(this._uibase.config.height);
		var _bodyHeight = 0;
		
		//check for a null comp height
		if (_compHeight==0) { 
			//set a default value
			_compHeight = this._DEFAULT_WINDOW_HEIGHT;
		}
		
		//check for a status bar
		if (this._hasStatusbar()) {
			//set the return value
			_bodyHeight = (_compHeight - (this._DEFAULT_HEADER_HEIGHT+this._DEFAULT_HEADER_VSPACER+this._DEFAULT_FOOTER_HEIGHT+this._DEFAULT_FOOTER_VSPACER));
		}
		else {
			//set the return value
			_bodyHeight = (_compHeight - (this._DEFAULT_HEADER_HEIGHT+this._DEFAULT_HEADER_VSPACER));
		}
		
		//return the method's value
		return _bodyHeight;
		
	};
	this._generateHtml = function() {
		//declare locals
		var _html = "";
		var _htmlInner = "";
		var _bodyHeight = this._getBodyHeight();
		var _configSytle = null;
		var _currSbItem = null;
		var _parentConfig = this._uibase.config;
		
		//overwrite the style attribute
		if (!this._uibase._isEmptyConfig("style")) {
			_configSytle = this._uibase.config.style + "display:none;";
		}
		else {
			_configSytle = "display:none;";
		}
		this._uibase.config.style = _configSytle;
		
		//render roundBorders
		this._uibase._generateHtmlRoundBordersTop();
		this._uibase._generateHtmlRoundBordersBottom();
		
		//start rendering the html tag
		this._uibase._containerHtmlTag = this._uibase._generateHtmlTag(this._tagName,this._compName);
		_html = this._uibase._containerHtmlTag;
		
		//generate the component's inner html
		//render the header div
		_htmlInner += '<div id="'+this.getHeaderId()+'" class="windowHeader">';
		if (!this._uibase._isEmptyConfig("icon")) {
			_htmlInner += '<div id="'+this.getHeaderIconId()+'" class="windowHeaderIconCol">';
			_htmlInner += '<img id="'+this.getHeaderIconId()+'_img" src="'+this._uibase.config.icon+'" />';
			_htmlInner += '</div>';
			_htmlInner += '<div style="float:left;" class="horizontalSpacer"></div>';
		}
		if (!this._uibase._isEmptyConfig("header")) {
			_htmlInner += '<div id="'+this.getHeaderTextId()+'" class="windowHeaderText windowHeaderTextCol">';
			_htmlInner += this._uibase.config.header;
			_htmlInner += '</div>';
			_htmlInner += '<div style="float:left;" class="horizontalSpacer"></div>';
		}
		if (this._uibase.config.collapsible==true || this._uibase.config.closeable==true) {
			_htmlInner += '<div id="'+this._getButtonsContainerId()+'" style="width:'+this._getButtonsWidth()+'px;" class="windowHeaderButtonsCol">';
			_htmlInner += '</div>';
		}
		_htmlInner += '</div>';
		
		//start rendering the body div
		_htmlInner += '<div id="'+this.getBodyId()+'" class="windowBody" style="height:'+_bodyHeight+'px;">';
		
		//render the inner HTML of the component
		if (!this._uibase._isEmptyConfig("html")) {
			_htmlInner += this._uibase.config.html;
		}
		
		//render the HTML for the child items
		_htmlInner += this._uibase._generateBaseItemsHtml(_parentConfig);
		
		//end rendering the body div
		_htmlInner += '</div>';
		
		//check for a status bar
		if (this._hasStatusbar()) {
			//start rendering the status bar
			_htmlInner += '<div id="'+this.getFooterId()+'" class="windowFooter">';
			
			//loop thrrough the items
			for (var i=0;i<this._uibase.config.statusbarItems.length;i++) {
				//get the current item
				_currSbItem = this._uibase.config.statusbarItems[i];
				
				//generate its html
				_htmlInner += _currSbItem._generateHtml();
			}
			
			//finish rendering the status bar
			_htmlInner += '</div>';
		}
		
		//finish rendering the html tag
		_html += _htmlInner + '</'+this._tagName+'>';
		
		//save the html
		this._uibase._compHtml = _htmlInner;
		
		//return the method's value
		return _html;
	};
};
};
