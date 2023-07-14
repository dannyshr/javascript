
if(typeof SplitButton!=='function'){
/**
 * A SplitButton UI component
 * @param _config - An array containing the configuration options 
 * @return A SplitButton UI component
 */
function SplitButton(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "splitButton"
		,classNameHover: "splitButtonHover"
		,defaultItem: null
		,defaultItemId: ""
		,optionsButtonTooltip: "Click here to open this button's options"
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
	
	//declare component methods
	this.getBaseUi = function() {
		//return the method's value
		return this._uibase;
	};
	this.render = function() {
		//generate the component's HTML
		this._generateHtml();
		
		//render the component
		this._uibase._renderHtml();
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
		//invoke the generic method
		this._uibase._attachBaseEvents();
		
		//attach custom events
		this._attachCustomEvents();
		
		//render child items
		this._uibase._attachChildItemsEvents();
	};
	this._attachCustomEvents = function() {
		//declare locals
		var _compId = this.getOptionsId();
		var _alignTo = this._uibase.config.id;
		var _alignment = "bottom";
		
		//attach custom events for this component
		this._uibase._alignComponent(_compId,_alignTo,_alignment);
	};
	this.getHtml = function() {
		//return the method's value
		return this._uibase._compHtml;
	};
	this._generateHtml = function() {
		//declare locals
		var _html = "";
		var _items = this._uibase.config.items;
		var _optionHeight = 20;
		var _optionsHeight = 0;
		var _optionsWidth = 0;
		var _containerConfig = null;
		
		//start rendering the html tag
		_html = this._uibase._generateHtmlTag(this._tagName,this._compName);
		
		//render the component's buttons
		_html += '<div id="'+this._uibase.config.id+'_buttons" style="width:100%;">';
		_html += '</div>';
		
		//calculate the component's options height, and width
		if (_items!=null && _items.length>0) {
			if (this._uibase.config.optionsHeight==null) {
				_optionsHeight = (_optionHeight*_items.length);
			}
			else {
				_optionsHeight = this._uibase.config.optionsHeight;
			}
			_optionsHeight = this._uibase._getSizeValue(_optionsHeight);
			if (this._uibase.config.optionsWidth==null) {
				_optionsWidth = this._uibase.config.width;
			}
			else {
				_optionsWidth = this._uibase.config.optionsWidth;
			}
			_optionsWidth = this._uibase._getSizeValue(_optionsWidth);
		}
		
		//create a _containerConfig array
		_containerConfig = {
			id: this._uibase.config.id
			,align: this._uibase.config.align
			,cellspacing: this._uibase.config.cellspacing
			,style: "padding-top:5px;"
			,width: _optionsWidth
		};
		
		//render the inner HTML of the component
		_html += '<div id="'+this.getOptionsId()+'" class="splitButtonOptions" style="display:none;width:'+_optionsWidth+';height:'+_optionsHeight+'px;">';
		_html += this._uibase._generateItemsHtml(_containerConfig,true);
		//finish rendering the child items
		_html += '</div>';
		
		//finish rendering the component
		_html += '</'+this._tagName+'>';
		
		//save the html
		this._uibase._compHtml = _html;
		
		//return the method's value
		return _html;
	};
	this._renderButtons = function() {
		//declare locals
		var _compId = this._uibase.config.id;
		var _bodyId = this.getOptionsId();
		var _btnCollapse = null;
		var _btnDefault = null;
		
		//get the buttons
		_btnDefault = this.getDefaultButton();
		_btnCollapse = this.getCollapseButton();
		
		//render a buttons panel
		var _buttonsPanel = new Panel({
			id: _compId+"_buttonsPanel"
			,width: "100%"
			,height: this._uibase.config.height
			,cellspacing: 1
			,renderTo: _compId+"_buttons"
			,items: [
		        _btnDefault
		        ,_btnCollapse
			]
		});
		_buttonsPanel.render();
		
		//attach the buttons' events
		this._attachDefaultButtonEvent(this._defaultButton,_compId);
		this._attachCollapseButtonEvent(this._collapseButton,_compId,_bodyId);
	};
	this.getOptionsId = function() {
		//return the method's value
		return this._uibase.config.id+"_options";
	};
	this.getCollapseButton = function() {
		//declare locals
		var _compId = this._uibase.config.id;
		var _tooltip = this._uibase.config.optionsButtonTooltip;
		
		//check for nulls
		if (this._collapseButton==null) {
			//create a new button
			this._collapseButton = new ToolbarButton({
				id: _compId+"_btnCollapse"
				,iconClass: "splitButtonIconArrow"
				,tooltip: _tooltip
				,height: this._uibase.config.height
				,width: 24
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
		var _buttonWidth = $("#"+_compId).width()-24;
		var _buttonObj = null;
		
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
					,icon: _buttonObj._uibase.config.icon
					,onclick: _buttonObj._uibase.config.onclick
					,text: _buttonObj._uibase.config.text
					,tooltip: _buttonObj._uibase.config.tooltip
					,height: _buttonObj._uibase.config.height
					,width: _buttonWidth
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
