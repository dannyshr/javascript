//@C Danny Shraga 2008

/**
* Creates a new splitter object
* @param _containerId The container's id.
* @param _containerWidth The container's width.
* @param _containerHeight The container's height.
* @param _splitterId The split bar's id.
* @param _isHorizontal A flag indicating if the split bar is horizontal (true), or vertical (false).
* @param _isResizeable A flag indicating if the split bar can be resized true), or NOT (false).
* @param _panel1Id The id of the first panel (North if horizontal, or West if vertical).
* @param _panel2Id The id of the second panel (South if horizontal, or East if vertical).
* @param _panel1MinSize The minimum size of the first panel (North if horizontal, or West if vertical).
* @param _panel2MinSize The minimum size of the second panel (South if horizontal, or East if vertical).
* @param _initialPosition The initial position of the split bar.
*/
function Splitter(_containerId,_containerWidth,_containerHeight,_splitterId,_isHorizontal,_isResizeable,_panel1Id,_panel2Id,_panel1MinSize,_panel2MinSize,_initialPosition) {
	//declare attribute names
	var ATT_NAME_STYLE_CLASS_PANEL = "styleClassPanel";
	var ATT_NAME_STYLE_CLASS_VSPLITTER = "styleClassVSplitter";
	var ATT_NAME_STYLE_CLASS_HSPLITTER = "styleClassHSplitter";
	//declare default attribute values
	var DEFAULT_STYLE_CLASS_PANEL = "panel";
	var DEFAULT_STYLE_CLASS_VSPLITTER = "vsplitter";
	var DEFAULT_STYLE_CLASS_HSPLITTER = "hsplitter";
	var DEFAULT_RESIZEABLE = true;
	var SPLITTER_TYPE_VERTICAL = 1;
	var SPLITTER_TYPE_HORIZONTAL = 2;
	var DEFAULT_SPLITTER_TYPE = SPLITTER_TYPE_VERTICAL;
	
	//declare object members
	var containerObj = null;
	var splitterObj = null;
	var panel1Obj = null;
	var panel2Obj = null;
	var splitterType = null;
	var initialPosition = null;
	var panel1MinSize = null;
	var panel2MinSize = null;
	var containerWidth = null;
	var containerHeight = null;
	var splitterBorderWidth = 2;
	
	//declare method for dragging
	function splitterOnDrag(element,dx,dy) {
		var bp;
		if (_isHorizontal) {
			bp = barPos + dx;
			if (bp < barLim1 || bp > splW - barLim2) { return; }
			xWidth(panel1Obj, xWidth(panel1Obj) + dx);
			xLeft(splitterObj, xLeft(splitterObj) + dx);
			xWidth(panel2Obj, xWidth(panel2Obj) - dx);
			xLeft(panel2Obj, xLeft(panel2Obj) + dx);
			barPos = bp;
		}
		else {
			bp = barPos + dy;
			if (bp < barLim1 || bp > splH - barLim2) { return; }
			xHeight(panel1Obj, xHeight(panel1Obj) + dy);
			xTop(splitterObj, xTop(splitterObj) + dy);
			xHeight(panel2Obj, xHeight(panel2Obj) - dy);
			xTop(panel2Obj, xTop(panel2Obj) + dy);
			barPos = bp;
		}
			if (oSplChild1) { oSplChild1.paint(xWidth(panel1Obj), xHeight(panel1Obj)); }
			if (oSplChild2) { oSplChild2.paint(xWidth(panel2Obj), xHeight(panel2Obj)); }
	}
	
	//initialize object members
	containerObj = (document.getElementById(_containerId) ? document.getElementById(_containerId) : null);
	splitterObj = (document.getElementById(_splitterId) ? document.getElementById(_splitterId) : null);
	panel1Obj = (document.getElementById(_panel1Id) ? document.getElementById(_panel1Id) : null);
	panel2Obj = (document.getElementById(_panel2Id) ? document.getElementById(_panel2Id) : null);
	splitterType = _splitterType;
	initialPosition = _initialPosition;
	panel1MinSize = _panel1MinSize;
	panel2MinSize = _panel2MinSize;
	containerWidth = _containerWidth;
	containerHeight = _containerHeight;
	
	//set properties values
	if (panel1Obj!=null) {
		panel1Obj.style.zIndex = 2;
	}
	if (panel2Obj!=null) {
		panel2Obj.style.zIndex = 2;
	}
	if (splitterObj!=null) {
		splitterObj.style.zIndex = 1;
	}
	this.paint(containerWidth, containerHeight);
	if (_isResizeable) {
		xEnableDrag(splitterObj, null, splitterOnDrag, null);
	}
	containerObj.style.visibility = 'visible';
	
	//declare object methods
	/**
	* Repaints the container, its panels, and the split bar
	* @param _newWidth The container's new width
	* @param _newHeight The container's new height
	* @param _newSplitterPosition Optional. The split bar's new position
	* @param _newPanel1MinSize Optional. The first panel new size
	* @param _newPanel2MinSize Optional. The second panel new size
	*/
	this.paint=function(_newWidth,_newHeight,_newSplitterPosition,_newPanel1MinSize,_newPanel2MinSize) {
		if (_newWidth == 0) { return; }
		var w1, h1, w2, h2;
		containerWidth = _newWidth;
		containerHeight = _newHeight;
		initialPosition = _newSplitterPosition || initialPosition;
		panel1MinSize = _newPanel1MinSize || panel1MinSize;
		panel2MinSize = _newPanel2MinSize || panel2MinSize;
		xMoveTo(containerObj, 0, 0);
		xResizeTo(containerObj, _newWidth, _newHeight);
		if (_isHorizontal) {
			w1 = initialPosition;
			h1 = _newHeight - 2 * splitterBorderWidth;
			w2 = _newWidth - w1 - xWidth(splitterObj) - 2 * splitterBorderWidth;
			h2 = h1;
			xMoveTo(panel1Obj, 0, 0);
			xResizeTo(panel1Obj, w1, h1);
			xMoveTo(splitterObj, w1, 0);
			xResizeTo(splitterObj, xWidth(splitterObj), h1);
			xMoveTo(panel2Obj, w1 + xWidth(splitterObj), 0);
			xResizeTo(panel2Obj, w2, h2);
		}
		else {
			w1 = _newWidth - 2 * splitterBorderWidth;;
			h1 = initialPosition;
			w2 = w1;
			h2 = _newHeight - h1 - xWidth(splitterObj) - 2 * splitterBorderWidth;
			xMoveTo(panel1Obj, 0, 0);
			xResizeTo(panel1Obj, w1, h1);
			xMoveTo(splitterObj, 0, h1);
			xResizeTo(splitterObj, w1, xWidth(splitterObj));
			xMoveTo(panel2Obj, 0, h1 + xWidth(splitterObj));
			xResizeTo(panel2Obj, w2, h2);
		}
	};
};
