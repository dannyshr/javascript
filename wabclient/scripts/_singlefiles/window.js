
if(typeof Window!=='function'){
/**
 * A Window UI component
 * @param _config - An array containing the configuration options 
 * @return A Window UI component
 */
function Window(_compConfig) {
	//declare component members
	this._extendedConfig = {
		className: "window"
		,closeable: true
		,collapsible: true
		,header: ""
		,modal: false
		,movable: true
		,multiple: false
		,recenterOnWinResize: true
		,resizable: true
		,resizableHandles: "se"
		,resizableMinHeight: 100
		,resizableMinWidth: 118
		,resizableGhost: false
	};
	this._tagName = "div";
	this._compName = "Window";
	this._uibase = new UiBase(this._extendedConfig,_compConfig);
	this._closeButton = null;
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
		if (this._uibase.config.collapsible==true || this._uibase.config.closeable==true) {
			this._renderButtons();
		}
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
		var _windowId = this._uibase.config.id;
		var _renderTo = this._uibase.config.renderTo;
		
		//attach custom events for this component
		this._uibase._centerComponent(_windowId,_renderTo);
		this._reCenterComponent();
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
				containment: 'window'
				,handle: _handleId
				,start: function(event, ui) {
					_onMoveStart(event, ui, _compId);
				}
			});		
		}
	};
	this._onBeforeMove = function(event, ui,_compId) {
		//do something
	};
	this._setResizeble = function() {
		//declare locals
		var _compId = this._uibase.config.id;
		var _bodyId = this.getBodyId();
		var _buttonsSize = 56;
		if (this._uibase.config.collapsible==false || this._uibase.config.closeable==false) {
			_buttonsSize = 28;
		}
		var _headerId = this._uibase.config.id+"_text";
		var _header = this._uibase.config.header;
		var _onResizeStart = this._onBeforeResize;
		var _onResizeComplete = this._onAfterResize;
		var _handles = this._uibase.config.resizableHandles;
		var _minHeight = this._uibase.config.resizableMinHeight;
		var _minWidth = this._uibase.config.resizableMinWidth;
		var _ghost = this._uibase.config.resizableGhost;
		var _collapseFH = null;
		var _btnObj = null;
		var _resizeable = this._uibase.config.resizable;
		if (this._uibase.config.collapsible==true) {
			_collapseFH = this._attachCollapseButtonEvent;
			_btnObj = this._collapseButton;
		}
		
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
				containment: 'document'
				,handles: _handles
				,ghost: _ghost
				,alsoResize: "#"+_bodyId
				,minHeight: _minHeight
				,minWidth: _minWidth
				,start: function(event, ui) {
					_onResizeStart(event, ui,_compId);
				}
				,stop: function(event, ui) {
					_onResizeComplete(event, ui,_compId,_bodyId,_headerId,_header,_buttonsSize,_collapseFH,_btnObj,_resizeable);
				}
			});		
		}
	};
	this._onBeforeResize = function(event, ui,_compId) {
		//do something
	};
	this._onAfterResize = function(event, ui,_compId,_bodyId,_headerId,_header,_buttonsSize,_collapseFH,_btnObj,_resizeable) {
		//declare locals
		var _compWidth = null;
		var _headerCharSize = 6.2;
		var _headerLength = 0;
		var _iconSize = 20;
		var _headerWidth = 0;
		var _headerComp = document.getElementById(_headerId);
		var _headerText = null;
		
		_compWidth = $("#"+_compId).width();
		if (_header!="") {
			_headerLength = _header.length;
		}
		//alert("_compWidth=["+_compWidth+"]\n_headerLength=["+_headerLength+"]\n_buttonsSize=["+_buttonsSize+"]");
		_headerWidth = _compWidth - (_iconSize+_buttonsSize);
		if (_headerWidth<(_headerCharSize*_headerLength)) {
			if (_headerComp!=null) {
				_headerLength = (_headerWidth/_headerCharSize);
				_headerText = _header.substring(0,_headerLength-4);
				_headerComp.innerHTML = _headerText+"...";
				_headerComp.title = _header;
			}
		}
		else {
			if (_headerComp!=null) {
				_headerComp.innerHTML = _header;
				_headerComp.title = "";
			}
		}
		//check if the window is collapsible
		if (_collapseFH!=null && (typeof _collapseFH == "function")) {
			_collapseFH(_btnObj,_compId,_bodyId,_resizeable);
		}
	};
	this.getHeaderId = function() {
		//return the method's value
		return this._uibase.config.id+"_header";
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
		var _buttonsWidth = "56px";
		
		//check if both buttons exist
		if (this._uibase.config.collapsible==false || this._uibase.config.closeable==false) {
			_buttonsWidth = "28px";
		}
		
		//return the method's value
		return _buttonsWidth;
	};
	this._renderButtons = function() {
		//declare locals
		var _windowId = this._uibase.config.id;
		var _modal = this._uibase.config.modal;
		var _bodyId = this.getBodyId();
		var _resizeable = this._uibase.config.resizable;
		var _btnCollapse = null;
		var _btnClose = null;
		
		//get the buttons
		if (this._uibase.config.collapsible==true) {
			_btnCollapse = this.getCollapseButton();
		}
		if (this._uibase.config.closeable==true) {
			_btnClose = this.getCloseButton();
		}
		
		//render a buttons panel
		var _buttonsPanel = new Panel({
			id: _windowId+"_buttonsPanel"
			,cellspacing: 2
			,renderTo: this._getButtonsContainerId()
			,width: this._getButtonsWidth()
			,items: [
			    _btnCollapse
		        ,_btnClose
			]
		});
		_buttonsPanel.render();
		
		//attach the buttons' events
		this._attachCloseButtonEvent(_windowId,_modal);
		this._attachCollapseButtonEvent(this._collapseButton,_windowId,_bodyId,_resizeable);
	};
	this._show = function(_windowId,_modal) {
		//declare locals
		var _effectSpeed = "slow";
		var _modalId = _windowId+"_uiLocker";
		var _display = null;
		
		//get the component's display attribute
		_display = $("#"+_windowId).css("display");
		
		//check if the component is hidden
		if (_display!=null && _display.toLowerCase()=="none") {
			//show the component
			if (_modal==true) {
				$("#"+_modalId).show();
			}
			$("#"+_windowId).fadeIn(_effectSpeed);
		}
	};
	this.show = function() {
		//declare locals
		var _windowId = this._uibase.config.id;
		var _modal = this._uibase.config.modal;
		
		//invoke the overloaded method
		this._show(_windowId,_modal);
	};
	this._hide = function(_windowId,_modal) {
		//declare locals
		var _effectSpeed = "slow";
		var _modalId = _windowId+"_uiLocker";
		var _display = null;
		
		//get the component's display attribute
		_display = $("#"+_windowId).css("display");
		
		//check if the component is hidden
		if (_display==null || _display.toLowerCase()=="block") {
			//hide the component
			if (_modal==true) {
				$("#"+_modalId).hide();
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
	this._attachCloseButtonEvent = function(_windowId,_modal) {
		//declare locals
		var _buttonId = _windowId+"_btnClose";
		var _button = null;
		var _fhClick = this._hide;
		
		//get the button by its id
		_button = document.getElementById(_buttonId);
		
		//check for nulls
		if (_button==null) {
			return;
		}
		
		//re-attach the click event
		_button.onclick = function() {
			_fhClick(_windowId,_modal);
		};
	};
	this.getCollapseButton = function() {
		//declare locals
		var _windowId = this._uibase.config.id;
		
		//check for nulls
		if (this._collapseButton==null) {
			this._collapseButton = new ToolbarButton({
				id: _windowId+"_btnCollapse"
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
	this._attachCollapseButtonEvent = function(_btnObj,_windowId,_bodyId,_resizeable) {
		//declare locals
		var _origCompHeight = $("#"+_windowId).height();
		var _origBodyHeight = $("#"+_bodyId).height();
		var _buttonId = _windowId+"_btnCollapse";
		var _button = null;
		
		//fix the body height if necessary
		if (_origBodyHeight==0) {
			_origBodyHeight = (_origCompHeight-40);
		}
		
		//get the button by its id
		_button = document.getElementById(_buttonId);
		
		//check for nulls
		if (_button==null) {
			return;
		}
		
		//re-attach the click event
		_button.onclick = function() {
			var _currBodyHeight = $("#"+_bodyId).height(); 
			var _currBodyDisplay = $("#"+_bodyId).css('display'); 
			if (_currBodyHeight==0 || _currBodyDisplay=="none") {
				$("#"+_bodyId).animate({
					height: _origBodyHeight+"px"
				}, 1500);
				$("#"+_windowId).animate({
					height: _origCompHeight+"px"
				}, 1500);
				_btnObj.getBaseUi().setIconClass("windowButtonCollapse");
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
				_btnObj.getBaseUi().setIconClass("windowButtonExpand");
				if (_resizeable==true) {
					$("#"+_windowId).resizable("disable"); 
				}
			}
		};
	};
	this._getBodyHeight = function() {
		//declare locals
		var DEFAULT_COMP_HEIGHT = 200;
		var _compHeight = this._uibase._getNumericValue(this._uibase.config.height);
		var _bodyHeight = 0;
		
		//check for a null comp height
		if (_compHeight==0) { 
			//set a default value
			_compHeight = DEFAULT_COMP_HEIGHT;
		}
		
		//set the return value
		_bodyHeight = (_compHeight - 40);
		
		//return the method's value
		return _bodyHeight;
		
	};
	this._generateHtml = function() {
		//declare locals
		var _html = "";
		var _bodyHeight = this._getBodyHeight();
		var _configSytle = null;
		
		//start rendering the html tag
		if (this._uibase.config.modal==true) {
			_html += '<div id="'+this._uibase.config.id+'_uiLocker" class="uiLocker" style="position:absolute;left:0px;top:0px;width:100%;height:100%;">';
			_html += '</div>';
		}
		//overwrite the style attribute
		if (this._uibase.config.style!=null && this._uibase.config.style!="") {
			_configSytle = this._uibase.config.style + "display:none;";
		}
		else {
			_configSytle = "display:none;";
		}
		this._uibase.config.style = _configSytle;
		
		_html += this._uibase._generateHtmlTag(this._tagName,this._compName);
		
		//generate the component's inner html
		//render the header div
		_html += '<div id="'+this.getHeaderId()+'" class="windowHeader">';
		_html += '<table border="0" cellpadding="0" cellspacing="0" style="height:100%;width:100%;">';
		_html += '<tr>';
		_html += '<td class="windowHeaderCol">';
		_html += '<table border="0" cellpadding="0" cellspacing="3" style="height:100%;width:100%;">';
		_html += '<tr>';
		if (this._uibase.config.icon!=null && this._uibase.config.icon!="") {
			_html += '<td class="windowIconCol">';
			_html += '<img src="'+this._uibase.config.icon+'" />';
			_html += '</td>';
		}
		if (this._uibase.config.header!="") {
			_html += '<td>';
			_html += '<div id="'+this._uibase.config.id+'_text" class="windowHeaderText">';
			_html += this._uibase.config.header;
			_html += '</div>';
			_html += '</td>';
		}
		_html += '</tr>';
		_html += '</table>';
		_html += '</td>';
		if (this._uibase.config.collapsible==true || this._uibase.config.closeable==true) {
			_html += '<td style="width:'+this._getButtonsWidth()+';" class="windowButtonsCol">';
			_html += '<div id="'+this._getButtonsContainerId()+'">';
			_html += '</div>';
			_html += '</td>';
		}
		_html += '</tr>';
		_html += '</table>';
		_html += '</div>';
		
		//start rendering the body div
		_html += '<div id="'+this.getBodyId()+'" class="windowBody" style="height:'+_bodyHeight+'px;">';
		
		//render the inner HTML of the component
		if (this._uibase.config.html!="") {
			_html += this._uibase.config.html;
		}
		
		//render the HTML for the child items
		_html += this._uibase._generateItemsHtml(this._uibase.config);
		
		//end rendering the body div
		_html += '</div>';
		
		
		//finish rendering the html tag
		_html += '</'+this._tagName+'>';
		
		//save the html
		this._uibase._compHtml = _html;
		
		//return the method's value
		return _html;
	};
};
};
