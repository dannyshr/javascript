
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
		,iconClass: "buttonIcon"
		,iconClassDisabled: "buttonIconDisabled"
		,textStyleClass: "toolbarButtonText"
		,textStyleClassHover: "toolbarButtonTextHover"
		,textStyleClassDisabled: "toolbarButtonTextDisabled"
		,type: "button"
	};
	this._tagName = "button";
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
		this._uibase._renderHtml();
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
