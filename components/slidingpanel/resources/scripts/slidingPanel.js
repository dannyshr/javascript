//Copyright - Danny Shraga 2009

function SlidingPanel(_componentId) {
	//declare locals
	var ATT_NAME_COMPWIDTH = "compWidth";
	var ATT_NAME_STATE = "state";
	var ATT_NAME_POSITION = "position";
	var ATT_NAME_HANDLER_RELATIVE_POSITION = "handlerRelativePosition";
	var ATT_NAME_CLOSE_EFFECT = "closeEffect";
	var ATT_NAME_OPEN_EFFECT = "openEffect";
	var ATT_NAME_MAIN_CONTAINER_ID = "panelMainContainerId";
	var ATT_NAME_CONTENTS_CONTAINER_TD_ID = "panelContentsContainerTdId";
	var ATT_NAME_CONTENTS_CONTAINER_ID = "panelContentsContainerId";
	var ATT_NAME_HANDLER_CONTAINER_TD_ID = "panelHandlerContainerTdId";
	var ATT_NAME_HANDLER_CONTAINER_ID = "panelHandlerContainerId";
	var ATT_NAME_HANDLER_ID = "panelHandlerId";
	var ATT_NAME_HANDLER_CONTAINER_ALIGNMENT = "handlerContainerAlignment";
	var ATT_NAME_HANDLER_IMAGE_COLLAPSED = "handlerImageCollapsed";
	var ATT_NAME_HANDLER_IMAGE_EXPANDED = "handlerImageExpanded";
	var ATT_NAME_LINKBUTTON_STYLECLASS = "linkButtonStyleClass";
	var ATT_NAME_IMAGEBUTTON_STYLECLASS = "imageButtonStyleClass";
	var ATT_NAME_IMAGEBUTTON_STYLECLASS_HOVER = "imageButtonStyleClassHover";
	var ATT_NAME_NAVBUTTONPREV_STYLECLASS = "navButtonPrevStyleClass";
	var ATT_NAME_NAVBUTTONNEXT_STYLECLASS = "navButtonnextStyleClass";
	var ATT_NAME_ALIGN = "align";
	var ATT_NAME_VALIGN = "valign";
	var ATT_NAME_SOURCE = "src";
	var ALIGNMENT_BOTTOM = "bottom";
	var ALIGNMENT_MIDDLE = "middle";
	var ALIGNMENT_TOP = "top";
	var ALIGNMENT_LEFT = "left";
	var ALIGNMENT_CENTER = "center";
	var ALIGNMENT_RIGHT = "right";
	var POSITION_TOPLEFT = "topleft";
	var POSITION_TOPCENTER = "topcenter";
	var POSITION_TOPRIGHT = "topright";
	var POSITION_MIDDLELEFT = "middleleft";
	var POSITION_MIDDLECENTER = "middlecenter";
	var POSITION_MIDDLERIGHT = "middleright";
	var POSITION_BOTTOMLEFT = "bottomleft";
	var POSITION_BOTTOMCENTER = "bottomcenter";
	var POSITION_BOTTOMRIGHT = "bottomright";
	var STATE_CLOSED = "closed";
	var STATE_COLLAPSED = "collapsed";
	var STATE_EXPANDED = "expanded";
	var RELATIVE_POSITION_BOTTOM = "bottom";
	var RELATIVE_POSITION_TOP = "top";
	var RELATIVE_POSITION_LEFT = "left";
	var RELATIVE_POSITION_RIGHT = "right";
	var EFFECT_HIDE = "hide";
	var EFFECT_SHOW = "show";
	var EFFECT_SLIDE = "slide";
	var compRef = this;
	this.id = _componentId;
	this.initPanel=function() {
		//declare locals
		var comp = null;
		
		//get elements by their ids
		comp = this.getJQueryComponentById(this.id);
		
		//check for nulls
		if (comp==null) {
			return;
		}
		
		//attach event handlers
		this.attachEvents();
		
		//set the component's current handler position
		this.resetPanelHandlerPosition(comp.attr(ATT_NAME_HANDLER_RELATIVE_POSITION));
		
		//set the component's current state
		this.resetPanelState(comp.attr(ATT_NAME_STATE));
		
		//set the component's current position
		this.resetPanelPosition(comp.attr(ATT_NAME_POSITION));
		
		//set the container's current alignment
		this.resetPanelHandlerAlignment(comp.attr(ATT_NAME_HANDLER_CONTAINER_ALIGNMENT));
	};
	this.resetPanelState=function(_newValue) {
		//declare locals
		var comp = null;
		var compBody = null;
		
		//set defaults if necessary
		if (_newValue==null) {
			_newValue = STATE_COLLAPSED;
		}
		
		//get elements by their ids
		comp = this.getJQueryComponentById(this.id);
		compBody = this.getJQueryComponentById(comp.attr(ATT_NAME_CONTENTS_CONTAINER_ID));
		
		//set the component's new attribute value
		comp.attr(ATT_NAME_STATE,_newValue);
		
		//check the new value
		switch (_newValue.toLowerCase()) {
			case STATE_CLOSED:
				comp.hide(1000);
				break;
			case STATE_COLLAPSED:
				//set the handler's current source image, according to the state
				this.resetHandlerImage(_newValue);
				compBody.hide(1000);
				comp.show(1000);
				break;
			case STATE_EXPANDED:
				//set the handler's current source image, according to the state
				this.resetHandlerImage(_newValue);
				compBody.show(1000);
				comp.show(1000);
				break;
		}
	};
	this.resetPanelPosition=function(_newValue) {
		//declare locals
		var comp = null;
		var currState = null;
		var newLeft = null;
		var newTop = null;
		
		//set defaults if necessary
		if (_newValue==null) {
			_newValue = "topcenter";
		}
		
		//get elements by their ids
		comp = this.getJQueryComponentById(this.id);
		
		//check for nulls
		if (comp==null) {
			return;
		}
		
		//set the component's new attribute value
		currState = comp.attr(ATT_NAME_STATE);
		comp.attr(ATT_NAME_POSITION,_newValue);
		
		//get the component's new top and left
		newLeft = this.getLeft(currState);
		newTop = this.getTop(currState);
		
		//alert("screen.availWidth:"+screen.availWidth+"\nscreen.availHeight:"+screen.availHeight+"\nnewLeft:"+newLeft+"\nnewTop:"+newTop);
		comp.animate({"left":newLeft+"px","top":newTop+"px"},1500);
	};
	this.resetPanelHandlerPosition=function(_newValue) {
		//declare locals
		var comp = null;
		var mainTable = null;
		var handlerId = null;
		var contentsId = null;
		var handlerTd = null;
		var contentsTd = null;
		var newInnerHtml = null;
		var handlerAlignment = null;
		var handlerVAlignment = null;
		
		//set defaults if necessary
		if (_newValue==null) {
			_newValue = RELATIVE_POSITION_BOTTOM;
		}
		
		//get elements by their ids
		comp = this.getJQueryComponentById(this.id);
		mainTable = this.getJQueryComponentById(comp.attr(ATT_NAME_MAIN_CONTAINER_ID));
		handlerId = comp.attr(ATT_NAME_HANDLER_CONTAINER_TD_ID);
		contentsId = comp.attr(ATT_NAME_CONTENTS_CONTAINER_TD_ID);
		handlerTd = this.getJQueryComponentById(handlerId);
		contentsTd = this.getJQueryComponentById(contentsId);
		handlerAlignment = comp.attr(ATT_NAME_HANDLER_CONTAINER_ALIGNMENT).toLowerCase();
		handlerVAlignment = null;
		if ((handlerAlignment==ALIGNMENT_BOTTOM) || 
			(handlerAlignment==ALIGNMENT_MIDDLE) || 
			(handlerAlignment==ALIGNMENT_TOP)) {
			handlerVAlignment = handlerAlignment;
			handlerAlignment = ALIGNMENT_CENTER;
		}
		else {
				handlerVAlignment = ALIGNMENT_MIDDLE;
		}
		
		//check the new value
		switch (_newValue.toLowerCase()) {
			case RELATIVE_POSITION_BOTTOM:
				newInnerHtml = "<tr>";
				newInnerHtml += "<td id=\"" + contentsId + "\">" + contentsTd.html() + "</td>";
				newInnerHtml += "</tr>";
				newInnerHtml += "<tr>";
				newInnerHtml += "<td id=\"" + handlerId + "\"" + ATT_NAME_ALIGN + "=\"" + handlerAlignment + "\"" + ATT_NAME_VALIGN + "=\"" + handlerVAlignment + "\">" + handlerTd.html() + "</td>";
				newInnerHtml += "</tr>";
				break;
			case RELATIVE_POSITION_TOP:
				newInnerHtml = "<tr>";
				newInnerHtml += "<td id=\"" + handlerId + "\"" + ATT_NAME_ALIGN + "=\"" + handlerAlignment + "\"" + ATT_NAME_VALIGN + "=\"" + handlerVAlignment + "\">" + handlerTd.html() + "</td>";
				newInnerHtml += "</tr>";
				newInnerHtml += "<tr>";
				newInnerHtml += "<td id=\"" + contentsId + "\">" + contentsTd.html() + "</td>";
				newInnerHtml += "</tr>";
				break;
			case RELATIVE_POSITION_LEFT:
				newInnerHtml = "<tr>";
				newInnerHtml += "<td id=\"" + handlerId + "\"" + ATT_NAME_ALIGN + "=\"" + handlerAlignment + "\"" + ATT_NAME_VALIGN + "=\"" + handlerVAlignment + "\">" + handlerTd.html() + "</td>";
				newInnerHtml += "<td id=\"" + contentsId + "\">" + contentsTd.html() + "</td>";
				newInnerHtml += "</tr>";
				break;
			case RELATIVE_POSITION_RIGHT:
				newInnerHtml = "<tr>";
				newInnerHtml += "<td id=\"" + contentsId + "\">" + contentsTd.html() + "</td>";
				newInnerHtml += "<td id=\"" + handlerId + "\"" + ATT_NAME_ALIGN + "=\"" + handlerAlignment + "\"" + ATT_NAME_VALIGN + "=\"" + handlerVAlignment + "\">" + handlerTd.html() + "</td>";
				newInnerHtml += "</tr>";
				break;
		}
		
		//re-initialize the component
		mainTable.html(newInnerHtml);
		comp.attr(ATT_NAME_HANDLER_RELATIVE_POSITION,_newValue);
		
		//re-attach event handlers
		this.attachEvents();
	};
	this.resetPanelHandlerAlignment=function(_newValue) {
		//declare locals
		var comp = null;
		var compHandlerContainerTd = null;
		
		//set defaults if necessary
		if (_newValue==null) {
			_newValue = "center";
		}
		
		//get elements by their ids
		comp = this.getJQueryComponentById(this.id);
		compHandlerContainerTd = this.getJQueryComponentById(comp.attr(ATT_NAME_HANDLER_CONTAINER_TD_ID));
		
		//check for nulls
		if (comp==null) {
			return;
		}
		
		//set the component's attribute's new value
		comp.attr(ATT_NAME_HANDLER_CONTAINER_ALIGNMENT,_newValue);
		
		//check for nulls
		if (compHandlerContainerTd==null) {
			return;
		}
		
		//set the componentHandlerContainer's attribute's new value
		switch (_newValue.toLowerCase()) {
			case ALIGNMENT_BOTTOM:
			case ALIGNMENT_MIDDLE:
			case ALIGNMENT_TOP:
				compHandlerContainerTd.attr(ATT_NAME_VALIGN,_newValue);
				break;
			case ALIGNMENT_LEFT:
			case ALIGNMENT_CENTER:
			case ALIGNMENT_RIGHT:
				compHandlerContainerTd.attr(ATT_NAME_ALIGN,_newValue);
				break;
		}
	};
	this.resetHandlerImage=function(_newState) {
		//declare locals
		var comp = null;
		var handlerId = null;
		var compHandler = null;
		var handlerImageCollapsed = null;
		var handlerImageExpanded = null;
		
		//set defaults if necessary
		if (_newState==null) {
			_newState = STATE_COLLAPSED;
		}
		
		//get elements by their ids
		comp = this.getJQueryComponentById(this.id);
		
		//check for nulls
		if (comp==null) {
			return;
		}
		
		//get the component's handler
		handlerId = comp.attr(ATT_NAME_HANDLER_ID);
		handlerImageCollapsed = comp.attr(ATT_NAME_HANDLER_IMAGE_COLLAPSED);
		handlerImageExpanded = comp.attr(ATT_NAME_HANDLER_IMAGE_EXPANDED);
		compHandler = this.getJQueryComponentById(handlerId);
		
		//check the _newState
		switch (_newState.toLowerCase()) {
			case STATE_CLOSED:
				//do nothing
				break;
			case STATE_COLLAPSED:
				compHandler.attr(ATT_NAME_SOURCE,handlerImageCollapsed);
				break;
			case STATE_EXPANDED:
				compHandler.attr(ATT_NAME_SOURCE,handlerImageExpanded);
				break;
		}
	};
	this.togglePanel=function() {
		//declare locals
		var comp = null;
		var compBody = null;
		var currState = null;
		var currPosition = null;
		var handlerRelativePosition = null;
		var effectOpen = null;
		var effectClose = null;
		var newState = null;
		var expand = false;
		var newLeft = null;
		var newTop = null;

		//get elements by their ids
		comp = this.getJQueryComponentById(this.id);
		compBody = this.getJQueryComponentById(comp.attr(ATT_NAME_CONTENTS_CONTAINER_ID));
		
		//get the component's attributes
		currState = comp.attr(ATT_NAME_STATE).toLowerCase();
		currPosition = comp.attr(ATT_NAME_POSITION).toLowerCase();
		handlerRelativePosition = comp.attr(ATT_NAME_HANDLER_RELATIVE_POSITION).toLowerCase();
		effectOpen = comp.attr(ATT_NAME_OPEN_EFFECT).toLowerCase();
		effectClose = comp.attr(ATT_NAME_CLOSE_EFFECT).toLowerCase();
		
		//check the component's state
		if (currState==STATE_EXPANDED) {
			newState = STATE_COLLAPSED;
			expand = false;
		}
		else if (currState==STATE_COLLAPSED) {
			newState = STATE_EXPANDED;
			expand = true;
		}
		
		//reset the handler's image according to the new state
		this.resetHandlerImage(newState);
		
		//get the component's new top and left
		newLeft = this.getLeft(newState);
		newTop = this.getTop(newState);

		//check the open or close effect
		if (expand) {
			switch (effectOpen) {
				case EFFECT_SHOW:
					//check the component handler's relative position
					switch (handlerRelativePosition) {
						case RELATIVE_POSITION_BOTTOM:
							comp.animate({"left":newLeft+"px","top":newTop+"px"},1000);
							compBody.show(1000);
							break;
						case RELATIVE_POSITION_TOP:
							comp.animate({"left":newLeft+"px","top":newTop+"px"},1000);
							compBody.show(1000);
							break;
						case RELATIVE_POSITION_LEFT:
							comp.animate({"left":newLeft+"px","top":newTop+"px"},1000);
							compBody.show(1000);
							break;
						case RELATIVE_POSITION_RIGHT:
							comp.animate({"left":newLeft+"px","top":newTop+"px"},1000);
							compBody.show(1000);
							break;
					}
					break;
				case EFFECT_SLIDE:
					//check the component handler's relative position
					switch (handlerRelativePosition) {
						case RELATIVE_POSITION_BOTTOM:
							compBody.slideDown(1000);
							comp.animate({"left":newLeft+"px","top":newTop+"px"},1000);
							break;
						case RELATIVE_POSITION_TOP:
							compBody.slideUp(1000);
							comp.animate({"left":newLeft+"px","top":newTop+"px"},1000);
							break;
						case RELATIVE_POSITION_LEFT:
							//compBody.slideDown(1000);
							//comp.animate({"left":newLeft+"px","top":newTop+"px"},1000);
							this.slideRight(2000);
							break;
						case RELATIVE_POSITION_RIGHT:
							compBody.slideDown(1000);
							comp.animate({"left":newLeft+"px","top":newTop+"px"},1000);
							break;
					}
					break;
			}
		}
		else {
			switch (effectClose) {
				case EFFECT_HIDE:
					//check the component handler's relative position
					switch (handlerRelativePosition) {
						case RELATIVE_POSITION_BOTTOM:
							compBody.hide(1000);
							comp.animate({"left":newLeft+"px","top":newTop+"px"},1000);
							break;
						case RELATIVE_POSITION_TOP:
							compBody.hide(1000);
							comp.animate({"left":newLeft+"px","top":newTop+"px"},1000);
							break;
						case RELATIVE_POSITION_LEFT:
							compBody.hide(1000);
							comp.animate({"left":newLeft+"px","top":newTop+"px"},1000);
							break;
						case RELATIVE_POSITION_RIGHT:
							compBody.hide(1000);
							comp.animate({"left":newLeft+"px","top":newTop+"px"},1000);
							break;
					}
					break;
				case EFFECT_SLIDE:
					//check the component handler's relative position
					switch (handlerRelativePosition) {
						case RELATIVE_POSITION_BOTTOM:
							compBody.slideUp(1000);
							comp.animate({"left":newLeft+"px","top":newTop+"px"},1000);
							break;
						case RELATIVE_POSITION_TOP:
							compBody.slideDown(1000);
							comp.animate({"left":newLeft+"px","top":newTop+"px"},1000);
							break;
						case RELATIVE_POSITION_LEFT:
							//compBody.slideUp(1000);
							//comp.animate({"left":newLeft+"px","top":newTop+"px"},1000);
							this.slideLeft(2000);
							break;
						case RELATIVE_POSITION_RIGHT:
							compBody.slideUp(1000);
							comp.animate({"left":newLeft+"px","top":newTop+"px"},1000);
							break;
					}
					break;
			}
		}
		
		//reset the component's new state
		comp.attr(ATT_NAME_STATE,newState);
	};
	this.getLeft=function(_currState) {
		//declare locals
		var comp = null;
		var compBody = null;
		var compHandler = null;
		var currPosition = null;
		var currHandlerPosition = null;
		var compBodyWidth = null;
		var compHandlerWidth = null;
		var totalWidth = null;
		var borderWidth = 2;
		var newValue = 0;
		
		//get elements by their ids
		comp = this.getJQueryComponentById(this.id);

		//check for nulls
		if (comp==null) {
			return newValue;
		}
		
		//get the component's attributes
		compBody = this.getJQueryComponentById(comp.attr(ATT_NAME_CONTENTS_CONTAINER_ID));
		compHandler = this.getJQueryComponentById(comp.attr(ATT_NAME_HANDLER_CONTAINER_ID));
		currPosition = comp.attr(ATT_NAME_POSITION).toLowerCase();
		currHandlerPosition = comp.attr(ATT_NAME_HANDLER_RELATIVE_POSITION).toLowerCase();
		//compBodyWidth = parseInt(compBody.css("width").replace("px",""));
		compBodyWidth = compBody.width();
		compBodyWidth += borderWidth;
		//compHandlerWidth = parseInt(compHandler.css("width").replace("px",""));
		compHandlerWidth = compHandler.width();
		compHandlerWidth += borderWidth;
		totalWidth = screen.availWidth;
		
		//check the component's position
		switch (currPosition) {
			case POSITION_TOPLEFT:
			case POSITION_MIDDLELEFT:
			case POSITION_BOTTOMLEFT:
				newValue = 0;
				break;
			case POSITION_TOPCENTER:
			case POSITION_MIDDLECENTER:
			case POSITION_BOTTOMCENTER:
				if (currHandlerPosition==RELATIVE_POSITION_BOTTOM || currHandlerPosition==RELATIVE_POSITION_TOP) {
					if (_currState==STATE_EXPANDED) {
						newValue = ((totalWidth/2)-(compBodyWidth/2));
					}
					else if (_currState==STATE_COLLAPSED) {
						newValue = ((totalWidth/2)-(compHandlerWidth/2));
					}
				}
				else {
					newValue = ((totalWidth/2)-((compBodyWidth+compHandlerWidth)/2));
				}
				break;
			case POSITION_TOPRIGHT:
			case POSITION_MIDDLERIGHT:
			case POSITION_BOTTOMRIGHT:
				if (currHandlerPosition==RELATIVE_POSITION_BOTTOM || currHandlerPosition==RELATIVE_POSITION_TOP) {
					if (_currState==STATE_EXPANDED) {
						newValue = (totalWidth-compBodyWidth);
					}
					else if (_currState==STATE_COLLAPSED) {
						newValue = (totalWidth-compHandlerWidth);
					}
				}
				else {
					if (_currState==STATE_EXPANDED) {
						newValue = (totalWidth-(compBodyWidth+compHandlerWidth));
					}
					else if (_currState==STATE_COLLAPSED) {
						newValue = (totalWidth-compHandlerWidth);
					}
				}
				break;
		}
		
		//return the method's value
		//alert("currPosition:"+currPosition+"\ncurrHandlerPosition:"+currHandlerPosition+"\ntotalWidth:"+totalWidth+"\ncompBodyWidth:"+compBodyWidth+"\ncompHandlerWidth:"+compHandlerWidth+"\nnewLeft:"+newValue);
		return newValue;
	};
	this.getTop=function(_currState) {
		//declare locals
		var comp = null;
		var compBody = null;
		var compHandler = null;
		var currPosition = null;
		var currHandlerPosition = null;
		var compBodyHeight = null;
		var compHandlerHeight = null;
		var totalHeight = null;
		var borderHeight = 2;
		var newValue = 0;
		
		//get elements by their ids
		comp = this.getJQueryComponentById(this.id);

		//check for nulls
		if (comp==null) {
			return newValue;
		}
		
		//get the component's attributes
		compBody = this.getJQueryComponentById(comp.attr(ATT_NAME_CONTENTS_CONTAINER_ID));
		compHandler = this.getJQueryComponentById(comp.attr(ATT_NAME_HANDLER_CONTAINER_ID));
		currPosition = comp.attr(ATT_NAME_POSITION).toLowerCase();
		currHandlerPosition = comp.attr(ATT_NAME_HANDLER_RELATIVE_POSITION).toLowerCase();
		//compBodyHeight = parseInt(compBody.css("height").replace("px",""));
		compBodyHeight = compBody.height();
		compBodyHeight += borderHeight;
		//compHandlerHeight = parseInt(compHandler.css("height").replace("px",""));
		compHandlerHeight = compHandler.height();
		compHandlerHeight += borderHeight;
		totalHeight = screen.availHeight;
		
		//check the component's position
		switch (currPosition) {
			case POSITION_TOPLEFT:
			case POSITION_TOPCENTER:
			case POSITION_TOPRIGHT:
				newValue = 0;
				break;
			case POSITION_MIDDLELEFT:
			case POSITION_MIDDLECENTER:
			case POSITION_MIDDLERIGHT:
				if (currHandlerPosition==RELATIVE_POSITION_BOTTOM || currHandlerPosition==RELATIVE_POSITION_TOP) {
					if (_currState==STATE_EXPANDED) {
						newValue = ((totalHeight/2)-compBodyHeight-compHandlerHeight);
					}
					else if (_currState==STATE_COLLAPSED) {
						newValue = ((totalHeight/2)-compHandlerHeight);
					}
				}
				else {
					newValue = ((totalHeight/2)-compBodyHeight);
				}
				break;
			case POSITION_BOTTOMLEFT:
			case POSITION_BOTTOMCENTER:
			case POSITION_BOTTOMRIGHT:
				if (currHandlerPosition==RELATIVE_POSITION_BOTTOM || currHandlerPosition==RELATIVE_POSITION_TOP) {
					if (_currState==STATE_EXPANDED) {
						newValue = totalHeight-((compBodyHeight*2)+compHandlerHeight+5);
					}
					else if (_currState==STATE_COLLAPSED) {
						newValue = totalHeight-(compBodyHeight+compHandlerHeight+6);
					}
				}
				else {
					if (_currState==STATE_EXPANDED) {
						newValue = totalHeight-((compBodyHeight*2)+5);
					}
					else if (_currState==STATE_COLLAPSED) {
						newValue = totalHeight-(compBodyHeight+compHandlerHeight+6);
					}
				}
				break;
		}
		
		//return the method's value
		//alert("currPosition:"+currPosition+"\ncurrHandlerPosition:"+currHandlerPosition+"\ntotalHeight:"+totalHeight+"\ncompBodyHeight:"+compBodyHeight+"\ncompHandlerHeight:"+compHandlerHeight+"\nnewTop:"+newValue);
		return newValue;
	};
	this.resetPanelEffectClose=function(_newValue) {
		//declare locals
		var comp = null;
		
		//set defaults if necessary
		if (_newValue==null) {
			_newValue = EFFECT_HIDE;
		}
		
		//get elements by their ids
		comp = this.getJQueryComponentById(this.id);
		
		//set the component's new attribute value
		comp.attr(ATT_NAME_CLOSE_EFFECT,_newValue);
	};
	this.resetPanelEffectOpen=function(_newValue) {
		//declare locals
		var comp = null;
		
		//set defaults if necessary
		if (_newValue==null) {
			_newValue = EFFECT_SHOW;
		}
		
		//get elements by their ids
		comp = this.getJQueryComponentById(this.id);
		
		//set the component's new attribute value
		comp.attr(ATT_NAME_OPEN_EFFECT,_newValue);
	};
	this.attachEvents=function() {
		//declare locals
		var compMain = null;
		
		//get elements by their ids
		compMain = this.getJQueryComponentById(this.id);
		
		//check for nulls
		if (compMain==null) {
			return;
		}
		
		//attach event handlers
		this.getJQueryComponentById(compMain.attr(ATT_NAME_HANDLER_ID)).click(function() {
			compRef.togglePanel();
		});
		
		$("a."+compMain.attr(ATT_NAME_LINKBUTTON_STYLECLASS)).click(function() {
			//declare locals
			var portlet = $(this).attr("portlet");
			var comp = $("#"+portlet);
			
			//check for nulls
			if (comp!=null) {
				//alert("about to toggle portlet:"+portlet);
				if (comp.attr(ATT_NAME_STATE).toLowerCase()=="closed") {
					comp.attr(ATT_NAME_STATE,STATE_EXPANDED);
					comp.show(1000);
				}
				else {
					comp.attr(ATT_NAME_STATE,STATE_CLOSED);
					comp.hide(1000);
				}
			}
		});
		
		$("img."+compMain.attr(ATT_NAME_IMAGEBUTTON_STYLECLASS)).mouseover(function() {
			//declare locals
			var button = $(this);
			var styleClass = null;
			
			//check for nulls
			if (button!=null) {
				styleClass = compMain.attr(ATT_NAME_IMAGEBUTTON_STYLECLASS_HOVER);
				button[0].className = styleClass;
			}
		});
		
		$("img."+compMain.attr(ATT_NAME_IMAGEBUTTON_STYLECLASS)).mouseout(function() {
			//declare locals
			var button = $(this);
			var styleClass = null;
			
			//check for nulls
			if (button!=null) {
				styleClass = compMain.attr(ATT_NAME_IMAGEBUTTON_STYLECLASS);
				button[0].className = styleClass;
			}
		});
		
		$("img."+compMain.attr(ATT_NAME_NAVBUTTONNEXT_STYLECLASS)).click(function() {
			//declare locals
			var compId = "menu1_slidingMenu";
			var comp = $("#"+compId)[0];
			var imgWidth = 40;
			
			//check for nulls
			if (comp!=null) {
				comp.scrollLeft += imgWidth;
			}
		});
		
		$("img."+compMain.attr(ATT_NAME_NAVBUTTONPREV_STYLECLASS)).click(function() {
			//declare locals
			var compId = "menu1_slidingMenu";
			var comp = $("#"+compId)[0];
			var imgWidth = 40;
			
			//check for nulls
			if (comp!=null) {
				comp.scrollLeft -= imgWidth;
			}
		});
	};
	this.getWidth=function(_currState) {
		//declare locals
		var comp = null;
		var compBody = null;
		var compHandler = null;
		var compBodyWidth = null;
		var compHandlerWidth = null;
		var borderWidth = 2;
		var value = 0;
		
		//get elements by their ids
		comp = this.getJQueryComponentById(this.id);

		//check for nulls
		if (comp==null) {
			return value;
		}
		
		//get the component's attributes
		compBody = this.getJQueryComponentById(comp.attr(ATT_NAME_CONTENTS_CONTAINER_ID));
		compHandler = this.getJQueryComponentById(comp.attr(ATT_NAME_HANDLER_CONTAINER_ID));
		compBodyWidth = parseInt(compBody.css("width").replace("px",""));
		compBodyWidth += borderWidth;
		compHandlerWidth = parseInt(compHandler.css("width").replace("px",""));
		compHandlerWidth += borderWidth;
		
		//check the component's state
		switch (_currState) {
			case STATE_COLLAPSED:
				value = compHandlerWidth;
				break;
			case STATE_EXPANDED:
				value = compBodyWidth;
				break;
		}
		
		//return the method's value
		return value;
	};
	this.slideLeft=function(_duration) {
		//declare locals
		var comp = null;
		var currState = null;
		var compBody = null;
		var compBody2 = null;
		var compBodyWidth = null;
		var timeMinSlice = 100;
		var times = 1;
		var decreasingAmount = 1;
		
		//get elements by their ids
		comp = this.getJQueryComponentById(this.id);

		//check for nulls
		if (comp==null) {
			return value;
		}
		
		//get the component's attributes
		currState = comp.attr(ATT_NAME_STATE).toLowerCase();
		compBody = this.getJQueryComponentById(comp.attr(ATT_NAME_CONTENTS_CONTAINER_TD_ID));
		compBody2 = this.getJQueryComponentById(comp.attr(ATT_NAME_CONTENTS_CONTAINER_ID));
		compBodyWidth = this.getWidth(currState);
		if (compBodyWidth==0) {
			//exit point
			return;
		}
		
		//write the width to the component, before reseting it
		comp.attr(ATT_NAME_COMPWIDTH,compBodyWidth);
		
		//decrease the component's width
		times = (_duration / timeMinSlice);
		decreasingAmount = (compBodyWidth / times);
		/*
		for (var i=0;i<times;i++) {
			compBodyWidth -= decreasingAmount;
			if (compBodyWidth<0) {
				compBodyWidth = 0;
			}
			compBody.css("width",compBodyWidth);
		}
		*/
		compBody.animate({"width":0},_duration);
		compBody.css("display","none");
	};
	this.slideRight=function(_duration) {
		//declare locals
		var comp = null;
		var currState = null;
		var compBody = null;
		var compBodyWidth = 0;
		var compRealWidth = null;
		var timeMinSlice = 100;
		var times = 1;
		var increasingAmount = 1;
		
		//get elements by their ids
		comp = this.getJQueryComponentById(this.id);

		//check for nulls
		if (comp==null) {
			return value;
		}
		
		//get the component's attributes
		currState = comp.attr(ATT_NAME_STATE).toLowerCase();
		//compBody = this.getJQueryComponentById(comp.attr(ATT_NAME_CONTENTS_CONTAINER_ID));
		compBody = this.getJQueryComponentById(comp.attr(ATT_NAME_CONTENTS_CONTAINER_TD_ID));
		compRealWidth = comp.attr(ATT_NAME_COMPWIDTH);
		
		//increase the component's width
		times = (_duration / timeMinSlice);
		increasingAmount = (compRealWidth / times);
		/*
		for (var i=0;i<times;i++) {
			compBodyWidth += increasingAmount;
			if (compBodyWidth>compRealWidth) {
				compBodyWidth = compRealWidth;
			}
			compBody.css("width",compBodyWidth);
		}
		*/
		compBody.animate({"width":compRealWidth},_duration);
		//compBody.css("display","block");
	};
	this.getJQueryComponentById=function(_compId) {
		//check for nulls
		if (_compId==null || _compId=='') {
			return null;
		}
		
		//fix the component's id for JSF id's
		return ($('#'+_compId));
	};
};
