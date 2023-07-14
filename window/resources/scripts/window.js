//@C Danny Shraga 2009

function Window(_compId) {
	var ATTR_MOVEABLE = "moveable";
	var ATTR_MOVEABLE_CONTAINER = "moveableContainer";
	var ATTR_MOVEABLE_HELPER = "moveableHelper";
	var ATTR_GROUP_SELECTOR = "groupSelector";
	var ATTR_STATE = "state";
	var ATTR_STYLE_CLASS = "styleClass";
	var ATTR_STYLE_CLASS_HOVER = "styleClassHover";
	var STATE_COLLAPSED = "collapsed";
	var STATE_EXPANDED = "expanded";
	var STATE_MAXIMIZED = "maximized";
	this.compId = _compId;
	this._compObj = $("#"+_compId);
	this.getJqueryComp=function() {
		return this._compObj;
	};
	this.initWindow=function() {
		//invoke all necessary methods to initialize the window
		this.attachEvents(this.compId);
	};
	this.resetMoveable=function() {
		//declare locals
		var _compId = this.compId;
		var comp = null;
		var groupSelector = null;
		var moveable = false;
		var handler = null;
		var movingHandleSelector = ".window-header-handle";
		var container = null;
		var useHelper = null;
		var opts = null;
		
		//get elements by their ids
		comp = getJQueryComponentById(_compId);
		
		//check for nulls
		if (comp==null) {
			return;
		}
		
		//get the component's attribute
		moveable = (comp.attr(ATTR_MOVEABLE).toLowerCase()=="true") ? true : false;
		handler = comp.find(movingHandleSelector);
		container = comp.attr(ATTR_MOVEABLE_CONTAINER).toLowerCase();
		useHelper = (comp.attr(ATTR_MOVEABLE_HELPER).toLowerCase()=="true") ? true : false;
		groupSelector = comp.attr(ATTR_GROUP_SELECTOR);
		
		if (container=="none") {
			if (useHelper) {
				opts = { handle: movingHandleSelector,stack: { group: groupSelector, min: 50 }, opacity: 0.7, helper: "original" };
			}
			else {
				opts = { handle: movingHandleSelector,stack: { group: groupSelector, min: 50 } };
			}
		}
		else {
			if (useHelper) {
				opts = { handle: movingHandleSelector,stack: { group: groupSelector, min: 50 }, opacity: 0.7, helper: "original", containment: container };
			}
			else {
				opts = { handle: movingHandleSelector,stack: { group: groupSelector, min: 50 }, containment: container };
			}
		}
		
		//set the component's moving ability
		if (moveable) {
			comp.draggable("destroy");
			comp.draggable(opts);
			comp.draggable("enable");
			//change the handle's css 
			handler.css("cursor","move");
		}
		else {
			comp.draggable("destroy");
			//change the handle's css 
			handler.css("cursor","default");
		}
	};
	this.resetResizeable=function() {
		//declare locals
		var comp = null;
		var resizeable = false;
		var handler = null;
		var handlerDis = null;
		var movingHandleClass = "window-header-handle";
		var movingHandleClassDis = movingHandleClass+"-disabled";
		var _compId = this.compId;
		
		//get elements by their ids
		comp = getJQueryComponentById(_compId);
		
		//check for nulls
		if (comp==null) {
			return;
		}
		
		//get the component's attribute
		resizeable = (comp.attr("resizeable").toLowerCase()=="true") ? true : false;
		handler = comp.find("."+movingHandleClass);
		handlerDis = comp.find("."+movingHandleClassDis);
		
		//set the component's moving ability
		if (resizeable) {
			comp.draggable({ handle: handlerDis });
			comp.draggable("enable");
			//change the handle's css 
			handlerDis[0].className = movingHandleClass;
		}
		else {
			comp.draggable("disable");
			//change the handle's css 
			handler[0].className = movingHandleClassDis;
		}
	};
	this.attachEvents=function() {
		//declare locals
		var mainComp = null;
		var mainCompWidth = null;
		var mainCompHeight = null;
		var mainCompId = this.compId;
		
		//get elements by their ids
		mainComp = getJQueryComponentById(mainCompId);
		
		//check for nulls
		if (mainComp==null) {
			return;
		}
		
		//get the component's attributes
		mainCompWidth = mainComp.innerWidth();
		mainCompHeight = mainComp.innerHeight();
		//alert("mainCompWidth:"+mainCompWidth+"\nmainCompHeight:"+mainCompHeight);
		
		$(".window-header-button-min").click(function() {
			var button = $(this);
			var comp=button.parents(".window");
			var content=comp.find(".window-content");
			var compId = null;
			//var forWinId = $(this).attr("forWin");
			//var content=$(this).parents(".window").find(".window-content");
			var currState = null;

			//check for nulls
			if (comp==null || content==null) {
				return;
			}
			compId = comp.attr("id");
			var minWin = $(".minimized-window[forWin='"+compId+"']");
			var titleComp = comp.find(".window-header-title");
			var title = titleComp[0].innerHTML;
			
			//get the component's attributes
			currState = comp.attr(ATTR_STATE).toLowerCase();
			
			//check the component's current state
			if (currState==STATE_COLLAPSED) {
				comp.attr(ATTR_STATE,STATE_EXPANDED);
				content.slideDown(1000);
				//content.show(1000);
				//set minimized window disaply
				if (minWin!=null) {
					minWin.css("display","none");
					minWin[0].innerHTML = "";
				}
			}
			else {
				comp.attr(ATTR_STATE,STATE_COLLAPSED);
				content.slideUp(1000);
				//content.hide(1000);
				//set minimized window disaply
				if (minWin!=null) {
					minWin.css("display","inline");
					minWin[0].innerHTML = title;
				}
			}
			
			return false;
		});
		
		$(".window-header-button-min").mouseover(function() {
			//declare lcoals
			var button=$(this);
			var styleClassHover = null;
			
			//get the component's attributes
			styleClassHover = button.attr(ATTR_STYLE_CLASS_HOVER);
			button[0].className = styleClassHover;
		});
		
		$(".window-header-button-min").mouseout(function() {
			//declare lcoals
			var button=$(this);
			var styleClass = null;
			
			//get the component's attributes
			styleClass = button.attr(ATTR_STYLE_CLASS);
			button[0].className = styleClass;
		});
		
		$(".window-header-button-max").click(function() {
			//declare locals
			var comp=mainComp;
			var content=$(this).parents(".window").find(".window-content");
			var compNewLeft = 0 + "px";
			var compNewTop = 0 + "px";
			var compNewWidth = screen.availWidth;
			var compNewHeight = screen.availHeight;
			var currState = comp.attr(ATTR_STATE).toLowerCase();
			var newState = null;
			if (currState==STATE_MAXIMIZED) {
				newState = STATE_EXPANDED;
				compNewWidth = mainCompWidth + "px";
				compNewHeight = mainCompHeight + "px";
				compNewLeft = (screen.availWidth/2) - (mainCompWidth/2) + "px";
				compNewTop = (screen.availHeight/2) - (mainCompHeight/2) + "px";
				comp.attr(ATTR_STATE,newState);
				comp.animate({"left":compNewLeft,"top":compNewTop,"width":compNewWidth,"height":compNewHeight},1000);
				//show all other windows
				var win = $(".window");
				win.show();
			}
			else {
				newState = STATE_MAXIMIZED;
				comp.attr(ATTR_STATE,newState);
				comp.animate({"left":compNewLeft,"top":compNewTop,"width":compNewWidth,"height":compNewHeight},1000);
				//hide all other windows
				var win = $(".window");
				win.hide();
			}
			//alert("currState:"+currState+"\nnewState:"+newState+"\ncompNewWidth:"+compNewWidth+"\ncompNewHeight:"+compNewHeight+"\ncompNewLeft:"+compNewLeft+"\ncompNewTop:"+compNewTop);
			//this.removeHeight(mainCompId);
			
		});
		
		$(".window-header-button-max").mouseover(function() {
			//declare lcoals
			var button=$(this);
			var styleClassHover = null;
			
			//get the component's attributes
			styleClassHover = button.attr(ATTR_STYLE_CLASS_HOVER);
			button[0].className = styleClassHover;
		});
		
		$(".window-header-button-max").mouseout(function() {
			//declare lcoals
			var button=$(this);
			var styleClass = null;
			
			//get the component's attributes
			styleClass = button.attr(ATTR_STYLE_CLASS);
			button[0].className = styleClass;
		});
		
		$(".window-header-button-close").click(function() {
			//declare lcoals
			var comp=getJQueryComponentById(_compId);
			
			//check for nulls
			if (comp==null) {
				return;
			}
			
			//hide the component
			comp.hide(1000);
		});
		
		$(".window-header-button-close").mouseover(function() {
			//declare lcoals
			var button=$(this);
			var styleClassHover = null;
			
			//get the component's attributes
			styleClassHover = button.attr(ATTR_STYLE_CLASS_HOVER);
			button[0].className = styleClassHover;
		});
		
		$(".window-header-button-close").mouseout(function() {
			//declare lcoals
			var button=$(this);
			var styleClass = null;
			
			//get the component's attributes
			styleClass = button.attr(ATTR_STYLE_CLASS);
			button[0].className = styleClass;
		});
		
	};
	this.removeHeight=function(_compId) {
		//declare locals
		var comp = null;
		var currStyle = null;
		var currHeight = null;
		var fixedStyle = null;
		
		//get elements by their ids
		comp = getJQueryComponentById(_compId);
		
		//check for nulls
		if (comp==null) {
			return;
		}
		
		//remove the height css attribute (which was added 
		//automatically by the jquery animation
		currStyle = comp.attr("style");
		currHeight = comp.css("height");
		if (currStyle==null || currHeight==null) {
			return;
		}
		fixedStyle = currStyle.replace("height: "+currHeight,"");
		comp.attr("style",fixedStyle);
	};
};

function getJQueryComponentById(_id) {
	return $("#"+_id);
};
