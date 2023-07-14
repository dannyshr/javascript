
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
