//@C Danny Shraga 2008

function Combobox(_elementId) {
	//declare attribute names
	var ATT_NAME_STYLE_CLASS_DIV = "styleClassDiv";
	var ATT_NAME_STYLE_CLASS_DIV_DISABLED = "styleClassDivDisabled";
	var ATT_NAME_STYLE_CLASS_DIV_HOVER = "styleClassDivHover";
	var ATT_NAME_STYLE_CLASS_TEXT_BOX = "styleClassTextBox";
	var ATT_NAME_STYLE_CLASS_TEXT_BOX_DISABLED = "styleClassTextBoxDisabled";
	var ATT_NAME_STYLE_CLASS_TEXT_BOX_HOVER = "styleClassTextBoxHover";
	var ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT = "styleClassTextBoxText";
	var ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT_DISABLED = "styleClassTextBoxTextDisabled";
	var ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT_HOVER = "styleClassTextBoxTextHover";
	var ATT_NAME_STYLE_CLASS_BUTTON_OPEN = "styleClassButtonOpen";
	var ATT_NAME_STYLE_CLASS_BUTTON_OPEN_DISABLED = "styleClassButtonOpenDisabled";
	var ATT_NAME_STYLE_CLASS_BUTTON_OPEN_HOVER = "styleClassButtonOpenHover";
	var ATT_NAME_STYLE_CLASS_BUTTON_CLOSE = "styleClassButtonClose";
	var ATT_NAME_STYLE_CLASS_BUTTON_CLOSE_HOVER = "styleClassButtonCloseHover";
	var ATT_NAME_STYLE_CLASS_OPTIONS_OUTER_DIV = "styleClassOptionsOuterDiv";
	var ATT_NAME_STYLE_CLASS_OPTIONS_DIV = "styleClassOptionsDiv";
	var ATT_NAME_STYLE_CLASS_OPTIONS_TABLE = "styleClassOptionsTable";
	var ATT_NAME_STYLE_CLASS_OPTION_ROW_ODD = "styleClassOptionOdd";
	var ATT_NAME_STYLE_CLASS_OPTION_ROW_ODD_HOVER = "styleClassOptionOddHover";
	var ATT_NAME_STYLE_CLASS_OPTION_ROW_TEXT = "styleClassOptionText";
	var ATT_NAME_STYLE_CLASS_OPTION_ROW_TEXT_HOVER = "styleClassOptionTextHover";
	var ATT_NAME_STYLE_CLASS_OPTION_ROW_EVEN = "styleClassOptionEven";
	var ATT_NAME_STYLE_CLASS_OPTION_ROW_EVEN_HOVER = "styleClassOptionEvenHover";
	var ATT_NAME_STYLE_CLASS_OPTION_ROW_SELECTED = "styleClassOptionSelected";
	var ATT_NAME_STYLE_CLASS_OPTION_ROW_SELECTED_TEXT = "styleClassOptionSelectedText";
	var ATT_NAME_DIRECTION = "dir";
	var ATT_NAME_COMBO_MODE = "comboMode";
	var ATT_NAME_SELECTION_MODE = "selectionMode";
	var ATT_NAME_SELECTOR_TYPE = "selectorType";
	var ATT_NAME_SHOW_CLOSE_BUTTON = "showCloseButton";
	//declare default attribute values
	var DEFAULT_STYLE_CLASS_DIV = "comboboxDiv";
	var DEFAULT_STYLE_CLASS_DIV_DISABLED = "comboboxDivDisabled";
	var DEFAULT_STYLE_CLASS_DIV_HOVER = "comboboxDivHover";
	var DEFAULT_STYLE_CLASS_TEXT_BOX = "comboboxTextBox";
	var DEFAULT_STYLE_CLASS_TEXT_BOX_DISABLED = "comboboxTextBoxDisabled";
	var DEFAULT_STYLE_CLASS_TEXT_BOX_HOVER = "comboboxTextBoxHover";
	var DEFAULT_STYLE_CLASS_TEXT_BOX_TEXT = "comboboxTextBoxText";
	var DEFAULT_STYLE_CLASS_TEXT_BOX_TEXT_DISABLED = "comboboxTextBoxTextDisabled";
	var DEFAULT_STYLE_CLASS_TEXT_BOX_TEXT_HOVER = "comboboxTextBoxTextHover";
	var DEFAULT_STYLE_CLASS_BUTTON_OPEN = "comboboxButtonOpen";
	var DEFAULT_STYLE_CLASS_BUTTON_OPEN_DISABLED = "comboboxButtonOpenDisabled";
	var DEFAULT_STYLE_CLASS_BUTTON_OPEN_HOVER = "comboboxButtonOpenHover";
	var DEFAULT_STYLE_CLASS_BUTTON_CLOSE = "comboboxButtonClose";
	var DEFAULT_STYLE_CLASS_BUTTON_CLOSE_HOVER = "comboboxButtonCloseHover";
	var DEFAULT_STYLE_CLASS_OPTIONS_OUTER_DIV = "comboboxOptionsOuterDiv";
	var DEFAULT_STYLE_CLASS_OPTIONS_DIV = "comboboxOptionsDiv";
	var DEFAULT_STYLE_CLASS_OPTIONS_TABLE = "comboboxOptionsTable";
	var DEFAULT_STYLE_CLASS_OPTION_ODD = "comboboxOptionRowOdd";
	var DEFAULT_STYLE_CLASS_OPTION_ODD_HOVER = "comboboxOptionRowOddHover";
	var DEFAULT_STYLE_CLASS_OPTION_TEXT = "comboboxOptionRowText";
	var DEFAULT_STYLE_CLASS_OPTION_TEXT_HOVER = "comboboxOptionRowTextHover";
	var DEFAULT_STYLE_CLASS_OPTION_EVEN = "comboboxOptionRowEven";
	var DEFAULT_STYLE_CLASS_OPTION_EVEN_HOVER = "comboboxOptionRowEvenHover";
	var DEFAULT_STYLE_CLASS_OPTION_ROW_SELECTED = "comboboxOptionRowSelected";
	var DEFAULT_STYLE_CLASS_OPTION_ROW_SELECTED_TEXT = "comboboxOptionRowSelectedText";
	var DEFAULT_DIRECTION = "ltr";
	var DEFAULT_COMBO_MODE = "dropdown";
	var DEFAULT_SELECTION_MODE = "single";
	var DEFAULT_SELECTOR_TYPE = "radio";
	var DEFAULT_SHOW_CLOSE_BUTTON = "false";
	var DEFAULT_IMAGES_LOCATION = "resources/images";
	var DEFAULT_IMAGES_EXT = ".gif";
	var DEFAULT_BLANK_IMAGE = "blank";
	var DEFAULT_HEIGHT = "20px";
	var DEFAULT_WIDTH = "120px";
	var DEFAULT_WIDTH_BUTTON_OPEN = "14px";
	var DIRECTION_RTL = "rtl";
	var COMBO_DIV_SUFFIX = "Div";
	var COMBO_DIV_TABLE_SUFFIX = "DivTable";
	var COMBO_TEXTBOX_SUFFIX = "Textbox";
	var COMBO_BUTTON_OPEN_SUFFIX = "ButtonOpen";
	var COMBO_OUTER_DIV_SUFFIX = "OuterDiv";
	var COMBO_OPTIONS_DIV_SUFFIX = "OptionsDiv";
	var COMBO_OPTIONS_TABLE_SUFFIX = "OptionsTable";
	var OPTION_DIV_SUFFIX = "OptionDiv";
	var OPTION_SELECTOR_SUFFIX = "Sel";
	this.id = _elementId;
	this.obj = (document.getElementById(_elementId) ? document.getElementById(_elementId) : null);
	this.comboDiv = (this.obj==null ? null : document.getElementById(_elementId+COMBO_DIV_SUFFIX));
	this.comboDivTable = (this.obj==null ? null : document.getElementById(_elementId+COMBO_DIV_TABLE_SUFFIX));
	this.comboTextbox = (this.obj==null ? null : document.getElementById(_elementId+COMBO_TEXTBOX_SUFFIX));
	this.comboButtonOpen = (this.obj==null ? null : document.getElementById(_elementId+COMBO_BUTTON_OPEN_SUFFIX));
	this.comboOuterDiv = (this.obj==null ? null : document.getElementById(_elementId+COMBO_OUTER_DIV_SUFFIX));
	this.comboOptionsDiv = (this.obj==null ? null : document.getElementById(_elementId+COMBO_OPTIONS_DIV_SUFFIX));
	this.comboOptionsTable = (this.obj==null ? null : document.getElementById(_elementId+COMBO_OPTIONS_TABLE_SUFFIX));
	this.disabled = (this.obj==null ? false : this.obj.disabled);
	this.selectedIndex = -1;
	this.isShown = (this.comboOuterDiv==null ? false : (this.comboOuterDiv.style.display.toUpperCase()!="NONE"));
	this.mouseover=function() {
		//check for nulls
		if (this.obj==null || this.disabled) {
			return;
		}
		
		//check for a customized object
		if (this.comboDiv==null) {
			return;
		}
		
		//reset style classes for the different object's parts
		this.comboDiv.className = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_DIV_HOVER);
		if (this.comboTextbox!=null) {
			this.comboTextbox.className = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_HOVER);
			this.comboTextbox.className += " " + this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT_HOVER);
		}
		if (this.comboButtonOpen!=null) {
			if (!this.isShown) {
				this.comboButtonOpen.className = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN_HOVER);
			}
			else {
				this.comboButtonOpen.className = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_CLOSE_HOVER);
			}
		}
	};
	this.mouseout=function() {
		//check for nulls
		if (this.obj==null || this.disabled) {
			return;
		}
		
		//check for a customized object
		if (this.comboDiv==null) {
			return;
		}
		
		//reset style classes for the different object's parts
		this.comboDiv.className = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_DIV);
		if (this.comboTextbox!=null) {
			this.comboTextbox.className = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX);
			this.comboTextbox.className += " " + this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT);
		}
		if (this.comboButtonOpen!=null) {
			if (!this.isShown) {
				this.comboButtonOpen.className = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN);
			}
			else {
				this.comboButtonOpen.className = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_CLOSE);
			}
		}
	};
	this.focusTextbox=function() {
		//check for nulls
		if (this.obj==null || this.disabled) {
			return;
		}
		
		//check for a customized object
		if (this.comboTextbox==null) {
			return;
		}
		
		//reset style classes for the different object's parts
		this.comboTextbox.className = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_HOVER);
		this.comboTextbox.className += " " + this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT_HOVER);
	};
	this.blurTextbox=function() {
		//check for nulls
		if (this.obj==null || this.disabled) {
			return;
		}
		
		//check for a customized object
		if (this.comboTextbox==null) {
			return;
		}
		
		//reset style classes for the different object's parts
		this.comboTextbox.className = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX);
		this.comboTextbox.className += " " + this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT);
	};
	this.mouseoverButton=function() {
		//check for nulls
		if (this.obj==null || this.disabled) {
			return;
		}
		
		//check for a customized object
		if (this.comboButtonOpen==null) {
			return;
		}
		
		//reset style classes for the different object's parts
		if (!this.isShown) {
			this.comboButtonOpen.className = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN_HOVER);
		}
		else {
			this.comboButtonOpen.className = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_CLOSE_HOVER);
		}
	};
	this.mouseoutButton=function() {
		//check for nulls
		if (this.obj==null || this.disabled) {
			return;
		}
		
		//check for a customized object
		if (this.comboButtonOpen==null) {
			return;
		}
		
		//reset style classes for the different object's parts
		if (!this.isShown) {
			this.comboButtonOpen.className = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN);
		}
		else {
			this.comboButtonOpen.className = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_CLOSE);
		}
	};
	this.disable=function(_disabled) {
		//check for nulls
		if (this.obj==null || _disabled==null) {
			return;
		}
		
		//set the object's disabled mode
		this.obj.disabled = _disabled;
		this.disabled = _disabled;
		
		//check for a customized object
		if (this.comboDiv==null) {
			return;
		}
		
		//hide the options if needed
		if (_disabled) {
			if (this.comboOuterDiv!=null) {
				this.comboOuterDiv.style.display = "none";
			}
		}
		
		//reset style classes for the different object's parts
		if (_disabled) {
			this.comboDiv.className = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_DIV_DISABLED);
		}
		else {
			this.comboDiv.className = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_DIV);
		}
		if (this.comboTextbox!=null) {
			this.comboTextbox.disabled = _disabled;
			if (_disabled) {
				this.comboTextbox.className = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_DISABLED);
				this.comboTextbox.className += " " + this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT_DISABLED);
			}
			else {
				this.comboTextbox.className = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX);
				this.comboTextbox.className += " " + this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT);
			}
		}
		if (this.comboButtonOpen!=null) {
			this.comboButtonOpen.disabled = _disabled;
			if (_disabled) {
				this.comboButtonOpen.className = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN_DISABLED);
			}
			else {
				this.comboButtonOpen.className = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN);
			}
		}
	};
	this.setTitle=function(_newTitle) {
		//declare locals
		var attName = "title";

		//check for nulls
		if (this.obj==null) {
			return;
		}
		
		//reset style classes for the different object's parts
		if (_newTitle==null || _newTitle=='') {
			this.obj.removeAttribute(attName);
		}
		else {
			this.obj.setAttribute(attName,_newTitle);
		}
		
		//check for a customized object
		if (this.comboDiv==null) {
			return;
		}
		
		//set the title for the customized object
		if (_newTitle==null || _newTitle=='') {
			this.comboTextbox.removeAttribute(attName);
		}
		else {
			this.comboTextbox.setAttribute(attName,_newTitle);
		}
		if (this.comboButtonOpen!=null) {
			if (_newTitle==null || _newTitle=='') {
				this.comboButtonOpen.removeAttribute(attName);
			}
			else {
				this.comboButtonOpen.setAttribute(attName,_newTitle);
			}
		}
	};
	this.customize=function(_customize){
		//declare locals
		var custObj = null;
		var optionsObj = null;
		var textBoxInnerHtml = "";
		var buttonInnerHtml = "";
		var optionsInnerHtml = "";
		var innerHtml = "";
		var optionsObjLeft = 0;
		var optionsObjTop = 0;
		var optionsObjWidth = null;
		var optionsObjHeight = null;
		var tempObj = null;
		
		//check for nulls
		if (this.obj==null || _customize==null) {
			return;
		}
		
		//get a reference to the custom object
		custObj = document.getElementById(this.id+COMBO_DIV_SUFFIX);
		if (custObj==null) {
			//create a new custom object
			custObj = document.createElement("div");
			custObj.id = this.id+COMBO_DIV_SUFFIX;
			custObj.name = this.id+COMBO_DIV_SUFFIX;
			
			//build the object's custom attributes
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_DIV)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_DIV)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_DIV,DEFAULT_STYLE_CLASS_DIV);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_DIV,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_DIV));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_DIV_DISABLED)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_DIV_DISABLED)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_DIV_DISABLED,DEFAULT_STYLE_CLASS_DIV_DISABLED);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_DIV_DISABLED,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_DIV_DISABLED));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_DIV_HOVER)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_DIV_HOVER)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_DIV_HOVER,DEFAULT_STYLE_CLASS_DIV_HOVER);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_DIV_HOVER,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_DIV_HOVER));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX,DEFAULT_STYLE_CLASS_TEXT_BOX);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_DISABLED)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_DISABLED)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_DISABLED,DEFAULT_STYLE_CLASS_TEXT_BOX_DISABLED);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_DISABLED,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_DISABLED));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_HOVER)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_HOVER)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_HOVER,DEFAULT_STYLE_CLASS_TEXT_BOX_HOVER);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_HOVER,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_HOVER));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT,DEFAULT_STYLE_CLASS_TEXT_BOX_TEXT);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT_DISABLED)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT_DISABLED)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT_DISABLED,DEFAULT_STYLE_CLASS_TEXT_BOX_TEXT_DISABLED);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT_DISABLED,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT_DISABLED));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT_HOVER)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT_HOVER)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT_HOVER,DEFAULT_STYLE_CLASS_TEXT_BOX_TEXT_HOVER);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT_HOVER,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT_HOVER));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN,DEFAULT_STYLE_CLASS_BUTTON_OPEN);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN_DISABLED)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN_DISABLED)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN_DISABLED,DEFAULT_STYLE_CLASS_BUTTON_OPEN_DISABLED);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN_DISABLED,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN_DISABLED));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN_HOVER)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN_HOVER)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN_HOVER,DEFAULT_STYLE_CLASS_BUTTON_OPEN_HOVER);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN_HOVER,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN_HOVER));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTIONS_OUTER_DIV)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTIONS_OUTER_DIV)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_OPTIONS_OUTER_DIV,DEFAULT_STYLE_CLASS_OPTIONS_OUTER_DIV);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_OPTIONS_OUTER_DIV,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTIONS_OUTER_DIV));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_CLOSE)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_CLOSE)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_BUTTON_CLOSE,DEFAULT_STYLE_CLASS_BUTTON_CLOSE);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_BUTTON_CLOSE,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_CLOSE));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_CLOSE_HOVER)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_CLOSE_HOVER)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_BUTTON_CLOSE_HOVER,DEFAULT_STYLE_CLASS_BUTTON_CLOSE_HOVER);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_BUTTON_CLOSE_HOVER,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_CLOSE_HOVER));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTIONS_DIV)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTIONS_DIV)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_OPTIONS_DIV,DEFAULT_STYLE_CLASS_OPTIONS_DIV);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_OPTIONS_DIV,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTIONS_DIV));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTIONS_TABLE)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTIONS_TABLE)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_OPTIONS_TABLE,DEFAULT_STYLE_CLASS_OPTIONS_TABLE);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_OPTIONS_TABLE,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTIONS_TABLE));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_ODD)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_ODD)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_ODD,DEFAULT_STYLE_CLASS_OPTION_ODD);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_ODD,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_ODD));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_ODD_HOVER)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_ODD_HOVER)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_ODD_HOVER,DEFAULT_STYLE_CLASS_OPTION_ODD_HOVER);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_ODD_HOVER,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_ODD_HOVER));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_EVEN)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_EVEN)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_EVEN,DEFAULT_STYLE_CLASS_OPTION_EVEN);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_EVEN,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_EVEN));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_EVEN_HOVER)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_EVEN_HOVER)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_EVEN_HOVER,DEFAULT_STYLE_CLASS_OPTION_EVEN_HOVER);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_EVEN_HOVER,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_EVEN_HOVER));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_TEXT)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_TEXT)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_TEXT,DEFAULT_STYLE_CLASS_OPTION_TEXT);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_TEXT,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_TEXT));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_TEXT_HOVER)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_TEXT_HOVER)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_TEXT_HOVER,DEFAULT_STYLE_CLASS_OPTION_TEXT_HOVER);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_TEXT_HOVER,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_TEXT_HOVER));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_SELECTED)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_SELECTED)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_SELECTED,DEFAULT_STYLE_CLASS_OPTION_ROW_SELECTED);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_SELECTED,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_SELECTED));
			}
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_SELECTED_TEXT)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_SELECTED_TEXT)=='') {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_SELECTED_TEXT,DEFAULT_STYLE_CLASS_OPTION_ROW_SELECTED_TEXT);
			}
			else {
				custObj.setAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_SELECTED_TEXT,this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_SELECTED_TEXT));
			}
			if (this.obj.getAttribute(ATT_NAME_DIRECTION)==null || this.obj.getAttribute(ATT_NAME_DIRECTION)=='') {
				custObj.setAttribute(ATT_NAME_DIRECTION,DEFAULT_DIRECTION);
			}
			else {
				custObj.setAttribute(ATT_NAME_DIRECTION,this.obj.getAttribute(ATT_NAME_DIRECTION));
			}
			if (this.obj.getAttribute(ATT_NAME_COMBO_MODE)==null || this.obj.getAttribute(ATT_NAME_COMBO_MODE)=='') {
				custObj.setAttribute(ATT_NAME_COMBO_MODE,DEFAULT_COMBO_MODE);
			}
			else {
				custObj.setAttribute(ATT_NAME_COMBO_MODE,this.obj.getAttribute(ATT_NAME_COMBO_MODE));
			}
			if (this.obj.getAttribute(ATT_NAME_SELECTION_MODE)==null || this.obj.getAttribute(ATT_NAME_SELECTION_MODE)=='') {
				custObj.setAttribute(ATT_NAME_SELECTION_MODE,DEFAULT_SELECTION_MODE);
			}
			else {
				custObj.setAttribute(ATT_NAME_SELECTION_MODE,this.obj.getAttribute(ATT_NAME_SELECTION_MODE));
			}
			if (this.obj.getAttribute(ATT_NAME_SELECTOR_TYPE)==null || this.obj.getAttribute(ATT_NAME_SELECTOR_TYPE)=='') {
				custObj.setAttribute(ATT_NAME_SELECTOR_TYPE,DEFAULT_SELECTOR_TYPE);
			}
			else {
				custObj.setAttribute(ATT_NAME_SELECTOR_TYPE,this.obj.getAttribute(ATT_NAME_SELECTOR_TYPE));
			}
			if (this.obj.getAttribute(ATT_NAME_SHOW_CLOSE_BUTTON)==null || this.obj.getAttribute(ATT_NAME_SHOW_CLOSE_BUTTON)=='') {
				custObj.setAttribute(ATT_NAME_SHOW_CLOSE_BUTTON,DEFAULT_SHOW_CLOSE_BUTTON);
			}
			else {
				custObj.setAttribute(ATT_NAME_SHOW_CLOSE_BUTTON,this.obj.getAttribute(ATT_NAME_SHOW_CLOSE_BUTTON));
			}
		
			//set the object's attributes
			custObj.className = custObj.getAttribute(ATT_NAME_STYLE_CLASS_DIV);
			custObj.style.width = this.getWidth();
			custObj.style.height = this.getHeight();
			//custObj.onmouseover = new Function("toggleComboMouseover('" + this.id + "')");
			//custObj.onmouseout = new Function("toggleComboMouseout('" + this.id + "')");
			
			//render the object's inner HTML
			textBoxInnerHtml = this.renderTextBox(custObj);
			buttonInnerHtml = this.renderButton(custObj);
			
			//build the object's HTML according to its direction
			innerHtml = "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" id=\"" + this.id+COMBO_DIV_TABLE_SUFFIX + "\" name=\"" + this.id+COMBO_DIV_TABLE_SUFFIX + "\" style=\"height:100%;width:" + this.getWidth() + "\" dir=\"" + custObj.getAttribute(ATT_NAME_DIRECTION) + "\" >";
			innerHtml += "<tr>";
			innerHtml += "<td onclick=\"toggleComboDisplay('" + this.id + "');\"  >" + textBoxInnerHtml + "</td>";
			innerHtml += "<td style=\"width:16px;\" onclick=\"toggleComboDisplay('" + this.id + "');\"  >" + buttonInnerHtml + "</td>";
			innerHtml += "</tr>";
			innerHtml += "</table>";
			
			//set the object's inner HTML
			custObj.innerHTML = innerHtml;
		}
		
		//get a reference to the custom object
		optionsObj = document.getElementById(this.id+COMBO_OUTER_DIV_SUFFIX);
		if (optionsObj==null) {
			//render the object's parts
			optionsInnerHtml = this.renderOptions(custObj);
			
			//build the options object
			optionsObj = document.createElement("div");
			optionsObj.id = this.id+COMBO_OUTER_DIV_SUFFIX;
			optionsObj.name = this.id+COMBO_OUTER_DIV_SUFFIX;
			optionsObj.style.display = "none";
			optionsObj.className = custObj.getAttribute(ATT_NAME_STYLE_CLASS_OPTIONS_OUTER_DIV);
			if (this.obj.offsetParent) {
				tempObj = this.obj;
				while (tempObj.offsetParent) {
					optionsObjLeft += tempObj.offsetLeft
					tempObj = tempObj.offsetParent;
				}
			}
			else if (this.obj.x) {
				optionsObjLeft += this.obj.x;
			}
			if (this.obj.offsetParent) {
				tempObj = this.obj;
				while (tempObj.offsetParent) {
					optionsObjTop += tempObj.offsetTop
					tempObj = tempObj.offsetParent;
				}
			}
			else if (this.obj.y) {
				optionsObjTop += this.obj.y;
				alert("this.obj.y: " + this.obj.y);
			}
			optionsObjWidth = custObj.style.width;
			optionsObjHeight = custObj.style.height;
			if (optionsObjHeight.indexOf("px")!=-1) {
				optionsObjHeight = optionsObjHeight.substring(0,optionsObjHeight.indexOf("px"));
				optionsObjHeight = parseInt(optionsObjHeight);
			}
			optionsObj.style.top = optionsObjTop+optionsObjHeight+1;
			optionsObj.style.left = optionsObjLeft;
			optionsObj.style.width = optionsObjWidth;
			
			//set the options' inner HTML
			optionsObj.innerHTML = optionsInnerHtml;
		}
		
		//hide the real object
		if (_customize) {
			this.obj.style.display = "block";
			if (custObj!=null) {
				custObj.style.display = "block";
			}
			//add the customized object to the DOM
			this.obj.parentNode.insertBefore(custObj, this.obj);
			this.obj.parentNode.insertBefore(optionsObj, this.obj);
		}
		else {
			if (custObj!=null) {
				//remove the customized object from the DOM
				try {
					this.obj.parentNode.removeChild(custObj);
				}catch(err) {};
			}
			if (optionsObj!=null) {
				//remove the customized object from the DOM
				try {
					this.obj.parentNode.removeChild(optionsObj);
				}catch(err) {};
			}
			this.obj.style.display = "block";
		}
	};
	this.renderTextBox=function(_custObj) {
		//declare locals
		var innerHtml = "";
		var styleClass = null;
		var styleClassHover = null;
		var styleWidth = null;
		var buttonWidth = DEFAULT_WIDTH_BUTTON_OPEN;
		var comboMode = null;
		
		//check for nulls
		if (this.obj==null || _custObj==null) {
			return null;
		}
		
		//get the object's attributes
		comboMode = _custObj.getAttribute(ATT_NAME_COMBO_MODE);
		if (this.disabled) {
			styleClass = _custObj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_DISABLED);
			styleClass += " " + _custObj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT_DISABLED);
		}
		else {
			styleClass = _custObj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX);
			styleClass += " " + _custObj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT);
		}
		styleClassHover = _custObj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_HOVER);
		styleClassHover += " " + _custObj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_BOX_TEXT_HOVER);
		styleWidth = this.getWidth();
		if (styleWidth.indexOf("px")!=-1) {
			styleWidth = styleWidth.substring(0,styleWidth.indexOf("px"));
			styleWidth = parseInt(styleWidth);
		}
		if (buttonWidth.indexOf("px")!=-1) {
			buttonWidth = buttonWidth.substring(0,buttonWidth.indexOf("px"));
			buttonWidth = parseInt(buttonWidth);
		}
		styleWidth = styleWidth - (buttonWidth*2);
		
		//render the object's part
		innerHtml = "<input type=\"text\" ";
		if (comboMode==DEFAULT_COMBO_MODE) {
			innerHtml += "readonly=\"true\" ";
		}
		innerHtml += "id=\"" + this.id+COMBO_TEXTBOX_SUFFIX + "\" " + 
					"name=\"" + this.id+COMBO_TEXTBOX_SUFFIX + "\" " +
					"class=\"" + styleClass + "\" " + 
					"style=\"width:100%;\" " + 
					"onfocus=\"if (!this.disabled) {this.className='" + styleClassHover + "'};\" " + 
					"onblur=\"this.className='" + styleClass + "';\" " + 
					"onkeydown=\"handleComboKeydown('" + this.id + "',event);\" " + 
					"value=\"" + this.obj.options[this.obj.selectedIndex].text + "\" />";
		
		//return the method's value
		return innerHtml;
	};
	this.renderButton=function(_custObj) {
		//declare locals
		var innerHtml = "";
		var styleClass = null;
		
		//check for nulls
		if (this.obj==null || _custObj==null) {
			return null;
		}
		
		//get the object's attributes
		if (this.disabled) {
			styleClass = _custObj.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN_DISABLED);
		}
		else {
			styleClass = _custObj.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN);
		}
		
		//render the object's part
		innerHtml = "<img " + 
					"id=\"" + this.id+COMBO_BUTTON_OPEN_SUFFIX + "\" " + 
					"name=\"" + this.id+COMBO_BUTTON_OPEN_SUFFIX + "\" " + 
					"src=\"" + DEFAULT_IMAGES_LOCATION + "/" + DEFAULT_BLANK_IMAGE+DEFAULT_IMAGES_EXT + "\" " + 
					"class=\"" + styleClass + "\" />";
		
		//return the method's value
		return innerHtml;
	};
	this.renderOptions=function(_custObj) {
		//declare locals
		var styleClassOptionsDiv = null;
		var styleClassOptionsTable = null;
		var styleClassOptionOdd = null;
		var styleClassOptionOddHover = null;
		var styleClassOptionEven = null;
		var styleClassOptionEvenHover = null;
		var styleClassOptionSelected = null;
		var checkedStyle = "";
		var currDir = null;
		var selectorName = null;
		var selectorId = null;
		var selectionMode = null;
		var selectorStyle = null;
		var selectorType = null;
		var currOption = null;
		var optionsHtml = "";
		var innerHtml = "";
		
		//check for nulls
		if (this.obj==null || _custObj==null) {
			return null;
		}
		
		//get the object's attributes
		styleClassOptionsDiv = _custObj.getAttribute(ATT_NAME_STYLE_CLASS_OPTIONS_DIV);
		styleClassOptionsTable = _custObj.getAttribute(ATT_NAME_STYLE_CLASS_OPTIONS_TABLE);
		styleClassOptionOdd = _custObj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_ODD);
		styleClassOptionOdd += " " + _custObj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_TEXT);
		styleClassOptionOddHover = _custObj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_ODD_HOVER);
		styleClassOptionOddHover += " " + _custObj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_TEXT_HOVER);
		styleClassOptionEven = _custObj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_EVEN);
		styleClassOptionEven += " " + _custObj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_TEXT);
		styleClassOptionEvenHover = _custObj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_EVEN_HOVER);
		styleClassOptionEvenHover += " " + _custObj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_TEXT_HOVER);
		styleClassOptionSelected = _custObj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_SELECTED);
		styleClassOptionSelected += " " + _custObj.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_SELECTED_TEXT);
		currDir = _custObj.getAttribute(ATT_NAME_DIRECTION);
		selectorType = _custObj.getAttribute(ATT_NAME_SELECTOR_TYPE);
		if (selectorType.toUpperCase()=="NONE") {
			selectorType = DEFAULT_SELECTOR_TYPE;
			selectorStyle = "style=\"display:none\"";
		}
		else {
			selectorStyle = "";
		}
		selectionMode = _custObj.getAttribute(ATT_NAME_SELECTION_MODE);
		selectorName = this.id+OPTION_SELECTOR_SUFFIX;
		
		//render the object's part
		innerHtml += "<div id=\"" + this.id+COMBO_OPTIONS_DIV_SUFFIX + "\" name=\"" + this.id+COMBO_OPTIONS_DIV_SUFFIX + "\" class=\"" + styleClassOptionsDiv + "\" dir=\"" + currDir + "\" onkeydown=\"handleComboKeydown('" + this.id + "',event);\" >";
		innerHtml += "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" id=\"" + this.id+COMBO_OPTIONS_TABLE_SUFFIX + "\" name=\"" + this.id+COMBO_OPTIONS_TABLE_SUFFIX + "\" class=\"" + styleClassOptionsTable + "\" dir=\"" + currDir + "\" >";
		
		//loop through the real object's options
		for (var i=0;i<this.obj.options.length;i++) {
			//get the current options
			currOption = this.obj.options[i];
			selectorId = this.id+OPTION_SELECTOR_SUFFIX+i;
			
			//build a row for the current option
			optionsHtml += "<tr ";
			optionsHtml += "><td valign=\"middle\" ><div id=\"" + this.id+OPTION_DIV_SUFFIX+i + "\" name=\"" + this.id+OPTION_DIV_SUFFIX+i + "\" ";
			
			//check if the current option is selected
			if (currOption.selected) {
				checkedStyle = "checked=\"true\"";
				optionsHtml += "class=\"" + styleClassOptionSelected + "\" ";
			}
			else {
				checkedStyle = "";
				//check for an even or odd row
				if ((i % 2)==0) {
					optionsHtml += "class=\"" + styleClassOptionEven + "\" ";
				}
				else {
					optionsHtml += "class=\"" + styleClassOptionOdd + "\" ";
				}
			}
			
			//check for an even or odd row
			if ((i % 2)==0) {
				optionsHtml += "onmouseover=\"if (this.className!='" + styleClassOptionSelected + "') {this.className='" + styleClassOptionEvenHover + "';}\" " + 
							"onmouseout=\"if (this.className!='" + styleClassOptionSelected + "') {this.className='" + styleClassOptionEven + "';}\" ";
			}
			else {
				optionsHtml += "onmouseover=\"if (this.className!='" + styleClassOptionSelected + "') {this.className='" + styleClassOptionOddHover + "';}\" " + 
							"onmouseout=\"if (this.className!='" + styleClassOptionSelected + "') {this.className='" + styleClassOptionOdd + "';}\" ";
			}
			
			//build an onclick event according to the selection mode
			if (selectionMode==DEFAULT_SELECTION_MODE) {
				optionsHtml += "onclick=\"clickSelectorByValue('" + selectorName + "','" + currOption.value + "');\" ";
			}
			else {
				optionsHtml += "onclick=\"document.getElementById('" + selectorId + "').click();\" ";
			}
			optionsHtml += ">";
			
			//build an input selector according to the object's selection mode and selector type
			if (selectionMode==DEFAULT_SELECTION_MODE) {
				optionsHtml += "<input name=\"" + selectorName + "\" " + selectorStyle + " type=\"" + selectorType + "\" value=\"" + currOption.value + "\" onclick=\"selectComboOption('" + this.id + "',this.value);\" " + checkedStyle + " />";
			}
			else {
				optionsHtml += "<input id=\"" + selectorId + "\" name=\"" + selectorId + "\" " + selectorStyle + " type=\"" + selectorType + "\" value=\"" + currOption.value + "\" onclick=\"selectComboOption('" + this.id + "',this.value);\" " + checkedStyle + " />";
			}
			optionsHtml += currOption.value;
			optionsHtml += "</div>";
			optionsHtml += "</td>";
			optionsHtml += "</tr>";
		}
		innerHtml += optionsHtml;
		innerHtml += "</table>";
		innerHtml += "</div>";
		
		//return the method's value
		return innerHtml;
	};
	this.getWidth=function() {
		//declare locasl
		var _width = "";
		
		//check for nulls
		if (this.obj==null) {
			return;
		}
		
		//get the object's attribute
		if (this.obj.style.width==null || this.obj.style.width=='') {
			_width = DEFAULT_WIDTH;
		}
		else {
			_width = this.obj.style.width;
		}
		
		//return the method's value
		return _width;
	};
	this.getHeight=function() {
		//declare locasl
		var _height = "";
		
		//check for nulls
		if (this.obj==null) {
			return;
		}
		
		//get the object's attribute
		if (this.obj.style.height==null || this.obj.style.height=='') {
			_height = DEFAULT_HEIGHT;
		}
		else {
			_height = this.obj.style.height;
		}
		
		//return the method's value
		return _height;
	};
	this.setDirection=function(_newDirection) {
		//declare locals
		var newDir = null;
		
		//check for nulls
		if (this.obj==null || _newDirection==null) {
			return;
		}
		
		//check the new direction
		if (_newDirection.toLowerCase()==DIRECTION_RTL) {
			newDir = DIRECTION_RTL;
		}
		else {
			newDir = DEFAULT_DIRECTION;
		}
		
		//set the object's attribute
		this.obj.setAttribute(ATT_NAME_DIRECTION,newDir);
		
		//check fora custom object
		if (this.comboDiv==null) {
			return;
		}
		
		//set the object's attribute
		this.comboDiv.setAttribute(ATT_NAME_DIRECTION,newDir);
		
		//check for nulls
		if (this.comboDivTable!=null) {
			this.comboDivTable.setAttribute(ATT_NAME_DIRECTION,newDir);
		}
		if (this.comboOptionsDiv!=null) {
			this.comboOptionsDiv.setAttribute(ATT_NAME_DIRECTION,newDir);
		}
		if (this.comboOptionsTable!=null) {
			this.comboOptionsTable.setAttribute(ATT_NAME_DIRECTION,newDir);
		}
	};
	this.toggleOptionsDisplay=function() {
		//check the object's attribute
		if (this.isShown) {
			this.hideOptions();
		}
		else {
			this.showOptions();
		}
	};
	this.showOptions=function() {
		//dclare locals
		var _index = -1;
		
		//set the object's attribute
		this.isShown = true;
		
		//check for nulls
		if (this.obj==null || this.disabled) {
			return;
		}
		
		//check fora custom object
		if (this.comboOuterDiv==null) {
			return;
		}
		
		//check the object's display mode
		if (this.comboOuterDiv.style.display.toUpperCase()=="NONE") {
			this.comboOuterDiv.style.display = "block";
			if (this.comboButtonOpen!=null) {
				this.comboButtonOpen.className = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_CLOSE);
			}
			
			//focus on the selected option, which is always the textbox's value
			_index = this.getOptionIndexByText(this.comboTextbox.value);
			if (_index!=-1) {
				this.focusOptionByIndex(_index);
			}
		}
	};
	this.hideOptions=function() {
		//set the object's attribute
		this.isShown = false;
		
		//check for nulls
		if (this.obj==null || this.disabled) {
			return;
		}
		
		//check for a custom object
		if (this.comboOuterDiv==null) {
			return;
		}
		
		//check the object's display mode
		if (this.comboOuterDiv.style.display.toUpperCase()!="NONE") {
			//unligh all highlighted options
			this.unlightAllOptions();
			//close the options
			this.comboOuterDiv.style.display = "none";
			//reset the button to an open icon
			if (this.comboButtonOpen!=null) {
				this.comboButtonOpen.className = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_BUTTON_OPEN);
			}
			//focus on the text box
			if (this.comboTextbox!=null) {
				this.comboTextbox.focus();
			}
		}
	};
	this.selectOptionByValue=function(_newOptValue) {
		//declare locals
		var prevOptValue = null;
		var prevOptIndex = null;
		var prevOpt = null;
		var newOptIndex = -1;
		var newOpt = null;
		
		//check for nulls
		if (this.obj==null || _newOptValue==null) {
			return;
		}
		
		//get the previously selected option
		prevOptValue = this.obj.value;
		
		//TODO: apply the new option to the real object
		this.obj.value = _newOptValue;
		
		//check for a custom object
		if (this.comboOuterDiv==null) {
			return;
		}
		
		//hide the options
		this.hideOptions();
		
		//get the old option's index and item
		prevOptIndex = this.getOptionIndexByValue(prevOptValue);
		prevOpt = document.getElementById(this.id+OPTION_DIV_SUFFIX+prevOptIndex);
		
		//check for nulls
		if (prevOpt!=null) {
			//unselect the previously selected option
			this.unselectOptionByIndex(prevOptIndex);
		}
		
		//get the new option's index and item
		newOptIndex = this.getOptionIndexByValue(_newOptValue);
		newOpt = document.getElementById(this.id+OPTION_DIV_SUFFIX+newOptIndex);
		
		//check for a null div option
		if (newOpt!=null) {
			//select the newly selected option
			this.selectOptionByIndex(newOptIndex);
		}
		
		//apply the selected option to the text box
		if (this.comboTextbox!=null) {
			this.comboTextbox.value = this.getOptionTextByIndex(newOptIndex);
			this.comboTextbox.focus();
		}
	};
	this.setSelectorType=function(_newType) {
		//declare locals
		var attValue = null;
		var optionsInnerHtml = null;
		
		//check for nulls
		if (this.obj==null || _newType==null) {
			return;
		}
		
		//set the object's attributes
		if (_newType.toUpperCase()==DEFAULT_SELECTOR_TYPE.toUpperCase()) {
			attValue = "radio";
		}
		else if (_newType.toUpperCase()=="CHECKBOX") {
			attValue = "checkbox";
		}
		else {
			attValue = "none";
		}
		this.obj.setAttribute(ATT_NAME_SELECTOR_TYPE,attValue);
		
		//check fora custom object
		if (this.comboDiv==null) {
			return;
		}
		
		//set the custom object's attributes
		this.comboDiv.setAttribute(ATT_NAME_SELECTOR_TYPE,attValue);
		
		//re-render the options div
		optionsInnerHtml = this.renderOptions(this.comboDiv);
		this.comboOuterDiv.innerHTML = optionsInnerHtml;
	};
	this.setSelectionMode=function(_newMode) {
		//declare locals
		var attValue = null;
		var optionsInnerHtml = null;
		var MULTIPLE = "multiple";
		
		//check for nulls
		if (this.obj==null || _newMode==null) {
			return;
		}
		
		//set the object's attributes
		if (_newMode.toUpperCase()!=DEFAULT_SELECTION_MODE.toUpperCase()) {
			attValue = "multiple";
			this.obj.setAttribute(MULTIPLE,"true");
		}
		else {
			attValue = "single";
			this.obj.removeAttribute(MULTIPLE);
		}
		this.obj.setAttribute(ATT_NAME_SELECTION_MODE,attValue);
		
		//check fora custom object
		if (this.comboDiv==null) {
			return;
		}
		
		//set the custom object's attributes
		this.comboDiv.setAttribute(ATT_NAME_SELECTION_MODE,attValue);
		
		//re-render the options div
		optionsInnerHtml = this.renderOptions(this.comboDiv);
		this.comboOuterDiv.innerHTML = optionsInnerHtml;
	};
	this.onkeydown=function(e) {
		//declare locals
		var keyNum = null;
		var keyChar = null;
		var currOptionIndex = -1;
		var comboSize = 0;
		var height = null;
		var optionVal = null;
		var selectorId = null;
		
		//check for nulls
		if (this.obj==null || this.disabled || e==null) {
			return;
		}
		
		//check for a custom object
		if (this.comboDiv==null) {
			return;
		}
		
		//get the size of the combo
		comboSize = this.obj.options.length;
		
		//get the pressed key
		if(window.event) { // IE
			keyNum = e.keyCode;
		}
		else if (e.which) { // Netscape/Firefox/Opera
			keyNum = e.which;
		}
		
		//check for a valid key
		if (keyNum!=null) {
			//get the option index according to the combo's state
			if (!this.isShown) {
				currOptionIndex = this.getOptionIndexByText(this.comboTextbox.value);
			}
			else {
				//get the highlighted option's index
				currOptionIndex = this.getHighlightedOptionIndex();
				
				//check for a valid index
				if (currOptionIndex==-1) {
					//get the selected option's index
					currOptionIndex = this.getSelectedOptionIndex();
				}
			}
			//check for a valid index
			if (currOptionIndex==-1) {
				//reset the index
				currOptionIndex = 0;
			}
			selectorId = this.id+OPTION_SELECTOR_SUFFIX;
			
			//check the pressed key
			keyChar = String.fromCharCode(keyNum);
			//alert("keyNum: "+keyNum+"\n"+"keyChar: "+keyChar+"\n"+"currOptionIndex: "+currOptionIndex);
			if (e.altKey==1 && keyNum==40) { //ALT+DownArrow
				//check if the options are hidden
				if (!this.isShown) {
					//show the options
					this.showOptions();
				}
			}
			else {
				if (keyNum==40) { //DownArrow
					//check if we are at the last index
					if (currOptionIndex<(comboSize-1)) {
						//check if the options are hidden
						if (!this.isShown) {
							//reset the selected value
							clickSelectorByValue(selectorId,this.getOptionValueByIndex(currOptionIndex+1));
						}
						else {
							//check if we are at the last index
							if (currOptionIndex<(comboSize-1)) {
								//unlight the current option
								this.unlightOptionByIndex(currOptionIndex);
								
								//highlight the next option
								this.highlightOptionByIndex(currOptionIndex+1);
							}
						}
					}
				}
				else if (keyNum==38) { //UpArrow
					//check if we are at the first index
					if (currOptionIndex>0) {
						//check if the options are hidden
						if (!this.isShown) {
							//reset the selected value
							clickSelectorByValue(selectorId,this.getOptionValueByIndex(currOptionIndex-1));
						}
						else {
							//check if we are at the first index
							if (currOptionIndex>0) {
								//unlight the current option
								this.unlightOptionByIndex(currOptionIndex);
								
								//highlight the previous option
								this.highlightOptionByIndex(currOptionIndex-1);
							}
						}
					}
				}
				else if (keyNum==13) { //Enter
					//check if the options are displayed
					if (this.isShown) {
						//get the highlighted option's index
						currOptionIndex = this.getHighlightedOptionIndex();
						if (currOptionIndex!=-1) {
							//get the option's value by its index
							optionVal = this.getOptionValueByIndex(currOptionIndex);
							
							//get the option's selector by its value
							if (this.comboDiv.getAttribute(ATT_NAME_SELECTION_MODE)==DEFAULT_SELECTION_MODE) {
								clickSelectorByValue(selectorId,optionVal);
							}
							else {
								selectorId = this.id+OPTION_SELECTOR_SUFFIX+currOptionIndex;
								document.getElementById(selectorId).click();
							}
						}
						else {
							//hide the options
							this.hideOptions();
						}
					}
				}
				else if (keyNum==9) { //Tab
					//check if the options are displayed
					if (this.isShown) {
						//get the highlighted option's index
						currOptionIndex = this.getHighlightedOptionIndex();
						if (currOptionIndex!=-1) {
							//get the option's value by its index
							optionVal = this.getOptionValueByIndex(currOptionIndex);
							
							//get the option's selector by its value
							if (this.comboDiv.getAttribute(ATT_NAME_SELECTION_MODE)==DEFAULT_SELECTION_MODE) {
								clickSelectorByValue(selectorId,optionVal);
							}
							else {
								selectorId = this.id+OPTION_SELECTOR_SUFFIX+currOptionIndex;
								document.getElementById(selectorId).click();
							}
						}
						else {
							//hide the options
							this.hideOptions();
						}
					}
				}
				else if (keyNum==27) { //Esc
					//check if the options are displayed
					if (this.isShown) {
						//hide the options
						this.hideOptions();
					}
				}
				else { //characters
					//check for a character, and filter the dropdown accordingly
					if (keyChar!=null && keyChar!='') {
						//look for an option starting with the current key
					}
				}
			}
		}
	};
	this.unlightAllOptions=function() {
		//declare locals
		var size = null;
		
		//check for nulls
		if (this.obj==null || this.disabled) {
			return;
		}
		
		//get the size of the combo
		size = this.obj.options.length;
		
		//loop through the items
		for (var i=0;i<size;i++) {
			//invoke the unlish method for the current index
			this.unlightOptionByIndex(i);
		}
	};
	this.unlightOptionByIndex=function(_optionIndex) {
		//declare locals
		var currOpt = null;
		var styleClass = null;
		
		//check for nulls
		if (this.obj==null || this.disabled || _optionIndex==null) {
			return;
		}
		
		//get the item according to its index
		currOpt = document.getElementById(this.id+OPTION_DIV_SUFFIX+_optionIndex);

		//check for nulls
		if (currOpt!=null) {
			//check if the current index is selected
			if (!this.obj.options[_optionIndex].selected) {
				//get the styleClass according to the row
				if ((_optionIndex % 2)==0) {
					styleClass = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_EVEN);
				}
				else {
					styleClass = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_ODD);
				}
				styleClass += " " + this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_TEXT);
				
				//apply the objetc's styleClass
				currOpt.className = styleClass;
			}
		}
	};
	this.highlightOptionByIndex=function(_optionIndex) {
		//declare locals
		var currOpt = null;
		var styleClass = null;
		
		//check for nulls
		if (this.obj==null || this.disabled || _optionIndex==null) {
			return;
		}
		
		//get the item according to its index
		currOpt = document.getElementById(this.id+OPTION_DIV_SUFFIX+_optionIndex);

		//check for nulls
		if (currOpt!=null) {
			//check if the current index is selected
			if (!this.obj.options[_optionIndex].selected) {
				//get the styleClass according to the row
				if ((_optionIndex % 2)==0) {
					styleClass = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_EVEN_HOVER);
				}
				else {
					styleClass = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_ODD_HOVER);
				}
				styleClass += " " + this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_TEXT_HOVER);
				
				//apply the objetc's styleClass
				currOpt.className = styleClass;
			}
			
			//focus on the selected option
			this.focusOptionByIndex(_optionIndex);
		}
	};
	this.selectOptionByIndex=function(_optionIndex) {
		//declare locals
		var currOpt = null;
		var styleClass = null;
		
		//check for nulls
		if (this.obj==null || this.disabled || _optionIndex==null) {
			return;
		}
		
		//get the item according to its index
		currOpt = document.getElementById(this.id+OPTION_DIV_SUFFIX+_optionIndex);

		//check for nulls
		if (currOpt!=null) {
			//get the styleClass according to the row
			styleClass = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_SELECTED);
			styleClass += " " + this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_SELECTED_TEXT);
			
			//apply the objetc's styleClass
			currOpt.className = styleClass;
		}
	};
	this.unselectOptionByIndex=function(_optionIndex) {
		//declare locals
		var currOpt = null;
		var styleClass = null;
		
		//check for nulls
		if (this.obj==null || this.disabled || _optionIndex==null) {
			return;
		}
		
		//get the item according to its index
		currOpt = document.getElementById(this.id+OPTION_DIV_SUFFIX+_optionIndex);

		//check for nulls
		if (currOpt!=null) {
			//get the styleClass according to the row
			if ((_optionIndex % 2)==0) {
				styleClass = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_EVEN);
			}
			else {
				styleClass = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_ODD);
			}
			styleClass += " " + this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_TEXT);
			
			//apply the objetc's styleClass
			currOpt.className = styleClass;
		}
	};
	this.focusOptionByIndex=function(_optionIndex) {
		//declare locals
		var height = null;
		var scrollTop = 0;
		var size = 0;
		
		//check for nulls
		if (this.obj==null || this.disabled || _optionIndex==null) {
			return;
		}
		
		//check if a customized object exists
		if (this.comboDiv==null) {
			return;
		}
		
		//check if the options are open
		if (this.isShown) {
			//focus on the options div
			this.comboOptionsDiv.focus();
			
			//check for a valid index
			size = this.obj.options.length;
			if (_optionIndex<0 || _optionIndex>(size-1)) {
				return;
			}
			
			//calculate the height to scroll
			height = this.comboDiv.style.height;
			if (height.indexOf("px")!=-1) {
				height = height.substring(0,height.indexOf("px"));
			}
			scrollTop = (_optionIndex*height)-(height);
			
			//alert("focusOptionByIndex():\n"+"_optionIndex: "+_optionIndex+"\n"+"height: "+height+"\n"+"scrollTop: "+scrollTop);
			//set the scroll bar
			this.comboOptionsDiv.scrollTop = scrollTop;
		}
	};
	this.getHighlightedOptionIndex=function() {
		//declare locals
		var size = null;
		var currOpt = null;
		var styleClass = null;
		var index = -1;
		var i = 0;
		var found = false;
		
		//check for nulls
		if (this.obj==null || this.disabled) {
			return;
		}
		
		//get the size of the combo
		size = this.obj.options.length;
		
		//loop through the items
		for (i=0;i<size;i++) {
			//get the current item
			currOpt = document.getElementById(this.id+OPTION_DIV_SUFFIX+i);
			
			//check for nulls
			if (currOpt!=null) {
				//get the styleClass according to the row
				if ((i % 2)==0) {
					styleClass = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_EVEN_HOVER);
				}
				else {
					styleClass = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_ODD_HOVER);
				}
				styleClass += " " + this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_TEXT_HOVER);
				
				//check the current option's styleClass
				if (currOpt.className==styleClass) {
					found = true;
				}
			}
			
			//check the flag
			if (found) {
				break;
			}
		}
		
		//check the flag
		if (found) {
			index = i;
		}
		
		//return the method's value
		return index;
	};
	this.getSelectedOptionIndex=function() {
		//declare locals
		var size = null;
		var currOpt = null;
		var styleClass = null;
		var index = -1;
		var i = 0;
		var found = false;
		
		//check for nulls
		if (this.obj==null || this.disabled) {
			return;
		}
		
		//get the size of the combo
		size = this.obj.options.length;
		
		//loop through the items
		for (i=0;i<size;i++) {
			//get the current item
			currOpt = document.getElementById(this.id+OPTION_DIV_SUFFIX+i);
			
			//check for nulls
			if (currOpt!=null) {
				//get the styleClass according to the row
				styleClass = this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_SELECTED);
				styleClass += " " + this.comboDiv.getAttribute(ATT_NAME_STYLE_CLASS_OPTION_ROW_SELECTED_TEXT);
				
				//check the current option's styleClass
				if (currOpt.className==styleClass) {
					found = true;
				}
			}
			
			//check the flag
			if (found) {
				break;
			}
		}
		
		//check the flag
		if (found) {
			index = i;
		}
		
		//return the method's value
		return index;
	};
	this.getOptionIndexByText=function(_optionText) {
		//declare locals
		var currOption = null;
		var found = false;
		var index = -1;
		var i = 0;
		
		//check for nulls
		if (this.obj==null || _optionText==null) {
			return -1;
		}
		
		//loop through the combo's options
		for (i=0;i<this.obj.options.length;i++) {
			//get the current option
			currOption = this.obj.options[i];
			
			//check the current option's value
			if (currOption.text!=null && currOption.text.toUpperCase()==_optionText.toUpperCase()) {
				//we found it
				found = true;
				break;
			}
		}
		
		//check for the found flag
		if (found) {
			index = i;
		}
		
		//return the method's value
		return index;
	};
	this.getOptionIndexByValue=function(_optionValue) {
		//declare locals
		var currOption = null;
		var found = false;
		var index = -1;
		var i = 0;
		
		//check for nulls
		if (this.obj==null || _optionValue==null) {
			return -1;
		}
		
		//loop through the combo's options
		for (i=0;i<this.obj.options.length;i++) {
			//get the current option
			currOption = this.obj.options[i];
			
			//check the current option's value
			if (currOption.value!=null && currOption.value.toUpperCase()==_optionValue.toUpperCase()) {
				//we found it
				found = true;
				break;
			}
		}
		
		//check for the found flag
		if (found) {
			index = i;
		}
		
		//return the method's value
		return index;
	};
	this.getOptionValueByIndex=function(_optionIndex) {
		//declare locals
		var size = 0;
		
		//check for nulls
		if (this.obj==null || _optionIndex==null) {
			return null;
		}
		
		//get the combo's size
		size = this.obj.options.length;
		
		//check for a valid index
		if (_optionIndex<0 || _optionIndex>(size-1)) {
			return null;
		}
		
		//return the method's value
		return this.obj.options[_optionIndex].value;
	};
	this.getOptionTextByIndex=function(_optionIndex) {
		//declare locals
		var size = 0;
		
		//check for nulls
		if (this.obj==null || _optionIndex==null) {
			return null;
		}
		
		//get the combo's size
		size = this.obj.options.length;
		
		//check for a valid index
		if (_optionIndex<0 || _optionIndex>(size-1)) {
			return null;
		}
		
		//return the method's value
		return this.obj.options[_optionIndex].text;
	};
};

function toggleComboMouseover(objectId) {
	//declare locals
	var obj = null;
	
	//check for nulls
	if (objectId==null) {
		return;
	}
	
	//create a new object instance
	obj = new Combobox(objectId);
	
	//invoke the object's method
	obj.mouseover();
}

function toggleComboMouseout(objectId) {
	//declare locals
	var obj = null;
	
	//check for nulls
	if (objectId==null) {
		return;
	}
	
	//create a new object instance
	obj = new Combobox(objectId);
	
	//invoke the object's method
	obj.mouseout();
}

function clickCombo(objectId) {
	//declare locals
	var obj = null;
	
	//check for nulls
	if (objectId==null) {
		return;
	}
	
	//create a new object instance
	obj = new Combobox(objectId);

	//invoke the object's method
	//obj.click();
}

function disableCombo(objectId,disabled) {
	//declare locals
	var obj = null;
	
	//check for nulls
	if (objectId==null || disabled==null) {
		return;
	}
	
	//create a new object instance
	obj = new Combobox(objectId);
	
	//invoke the object's method
	obj.disable(disabled);
}

function setComboTitle(objectId,newTitle) {
	//declare locals
	var obj = null;
	
	//check for nulls
	if (objectId==null) {
		return;
	}
	
	//create a new object instance
	obj = new Combobox(objectId);
	
	//invoke the object's method
	obj.setTitle(newTitle);
}

function customizeCombo(objectId,customize) {
	//declare locals
	var obj = null;
	
	//check for nulls
	if (objectId==null || customize==null) {
		return;
	}
	
	//create a new object instance
	obj = new Combobox(objectId);
	
	//invoke the object's method
	obj.customize(customize);
}

function resetComboDirection(objectId,newPosition) {
	//declare locals
	var obj = null;
	
	//check for nulls
	if (objectId==null || newPosition==null) {
		return;
	}
	
	//create a new object instance
	obj = new Combobox(objectId);
	
	//invoke the object's method
	obj.setDirection(newPosition);
}

function resetComboSelectorType(objectId,newType) {
	//declare locals
	var obj = null;
	
	//check for nulls
	if (objectId==null || newType==null) {
		return;
	}
	
	//create a new object instance
	obj = new Combobox(objectId);
	
	//invoke the object's method
	obj.setSelectorType(newType);
}

function resetComboSelectionMode(objectId,newMode) {
	//declare locals
	var obj = null;
	
	//check for nulls
	if (objectId==null || newMode==null) {
		return;
	}
	
	//create a new object instance
	obj = new Combobox(objectId);
	
	//invoke the object's method
	obj.setSelectionMode(newMode);
}

function toggleComboDisplay(objectId) {
	//declare locals
	var obj = null;
	
	//check for nulls
	if (objectId==null) {
		return;
	}
	
	//create a new object instance
	obj = new Combobox(objectId);
	
	//invoke the object's method
	obj.toggleOptionsDisplay();
}

function selectComboOption(objectId,newOption) {
	//declare locals
	var obj = null;
	
	//check for nulls
	if (objectId==null || newOption==null) {
		return;
	}
	
	//create a new object instance
	obj = new Combobox(objectId);
	
	//invoke the object's method
	obj.selectOptionByValue(newOption);
}

function clickSelectorByValue(objectName,value) {
	//declare locals
	var arrObj = null;
	var obj = null;
	var found = false;
	
	//check for nulls
	if (objectName==null || value==null) {
		return;
	}
	
	//get elements by their ids
	arrObj = document.getElementsByTagName("input");
	
	//check for nulls
	if (arrObj==null) {
		return;
	}
	
	//check for an array of objects
	if (arrObj.length>1) {
		//loop through the array for the first time to uncheck all objects, incase it is a checkbox
		for (var i=0;i<arrObj.length;i++) {
			//get a reference to the current object
			obj = arrObj[i];
			
			//check for a radio button, or a checkbox
			if (obj.type!=null && obj.type.toUpperCase()=="CHECKBOX") {
				//check the object's name
				if (obj.name!=null && obj.name.toUpperCase()==objectName.toUpperCase()) {
					//uncheck the current object
					obj.checked = false;
				}
			}
		}
		
		//loop through the array
		for (var i=0;i<arrObj.length;i++) {
			//get a reference to the current object
			obj = arrObj[i];
			
			//check for a radio button, or a checkbox
			if (obj.type!=null && (obj.type.toUpperCase()=="RADIO" || obj.type.toUpperCase()=="CHECKBOX")) {
				//check the object's name
				if (obj.name!=null && obj.name.toUpperCase()==objectName.toUpperCase()) {
					//check the object's value
					if (obj.value!=null && obj.value==value) {
						//set the found flag
						found = true;
						
						//check the current object, incase its a checkbox which was unchecked in the first loop
						if (obj.type.toUpperCase()=="CHECKBOX") {
							obj.checked = !obj.checked ;
							if (obj.checked) {
								obj.click();
							}
						}
						else {
							obj.click();
						}
					}
				}
			}
			
			//break the loop
			if (found) {
				break;
			}
		}
	}
}

function handleComboKeydown(objectId,e) {
	//declare locals
	var obj = null;
	
	//check for nulls
	if (objectId==null || e==null) {
		return;
	}
	
	//create a new object instance
	obj = new Combobox(objectId);
	
	//invoke the object's method
	obj.onkeydown(e);
}
