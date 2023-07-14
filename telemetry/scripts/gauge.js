/**
 * @widget: Gauge
 * @author: Danny Shraga
 * @creationDate: 01/12/2012
 */
Gauge = function(config) {
	//check for required params
	if (!config.id) {alert("Missing id parameter for Gauge!"); return false;} 
	if (!document.getElementById(config.id)) {alert("No element with id: \""+config.id+"\" found!"); return false;} 
    var _heightFactor = 0;
    
    //define the component's ticks
    function ticks() {
    	var _ticks = this;
    	_ticks.count = 10; //Number of tick marks (max is 100).
    	_ticks.start = 10; //Value of the first tick mark.
    	_ticks.end = 100; //Value of the last tick mark.
    	_ticks.color = "#000000"; //Tick mark css color.
    	_ticks.thickness = 18; //Tick mark thickness (in pixels).
    	_ticks.alignment = "left"; //Tick alignment (left, right, or center).
    	_ticks.labelSize = 12; //Tick label size (in pixels).
    	_ticks.labelColor = '#000000'; //Tick label css color.
    }
    
	//configurable parameters
	this.config = {
		id: config.id
		,orientation: (config.orientation) ? config.orientation : "vertical"
		,direction: (config.direction) ? config.direction : "btt"
		,minValue: (config.minValue) ? config.minValue : 0
		,maxValue: (config.maxValue) ? config.maxValue : 100
		,value: (config.value) ? config.value : 0
		,showTicks: (config.showTicks!=null) ? config.showTicks : true
		,ticks: (config.ticks) ? (config.ticks) : new ticks()
		,width: (config.width) ? config.width : 40
		,height: (config.height) ? (config.height+_heightFactor) : (200+_heightFactor)
		,showProgressText: (config.showProgressText!=null) ? config.showProgressText : true
		,showPercent: (config.showPercent!=null) ? config.showPercent : false
		,fontColor: (config.fontColor) ? config.fontColor : "#000000"
		,fontSize: (config.fontSize) ? config.fontSize : 12
		,fillColor: (config.fillColor) ? config.fillColor : "#cccccc"
		,fillImagePath: (config.fillImagePath) ? config.fillImagePath : ""
	};
	this.renderContainer();
	this.renderTicks();
};

Gauge.prototype.getTextContainerId = function() {
	//return the method's value
	return this.config.id + "_TextContainer";
};

Gauge.prototype.reRender = function(config) {
	//check for nulls
	if (config==null || config=="undefined" || config=="") {
		return;
	}
	
	//copy values from the defaultConfig to the configuration object
    for (var option in config) {
        //update the configuration object
    	this.config[option] = config[option];
    }
	this.renderContainer();
	this.renderTicks();
};

Gauge.prototype.renderContainer = function() {
	//declare locals
	var _html = "";
	var containerObj = null;
	var orientation = this.config.orientation;
	var maxItems = 100;
	var itemSize = 0;
	var itemStyle = null;
	var txtId = this.getTextContainerId();
	var txtComp = null;
	var itemChar = "";
	
	//set the container's height and width
	$("#"+this.config.id).css("width",this.config.width);
	$("#"+this.config.id).css("height",this.config.height);

	//check the orientation
	if (orientation=="vertical") {
		//calculate the height of each item
		itemSize = (this.config.height)/maxItems;
		itemSize = this.formatNumber(itemSize,2);
		itemStyle = 'style="vertical-align:top;float:none;width:100%;height:' + itemSize + 'px;text-align:' + this.config.ticks.alignment + ';"';
		itemChar = "|";
		
		//create 100 items
		for (var i=0;i<maxItems;i++) {
			//build the current item
			_html += '<div id="' + this.config.id + '_pbItem' + (i+1) + '" class="' + this.config.id + '_pbItem" ' + itemStyle + '>';
			_html += '<span id="' + this.config.id + '_pbItemLeft' + (i+1) + '" style="height:' + itemSize + 'px;width:33.3%;">';
			_html += '</span>';
			_html += '<span id="' + this.config.id + '_pbItemCenter' + (i+1) + '" style="height:' + itemSize + 'px;width:33.3%;">';
			_html += '<font style="color:transparent;">' + itemChar + '</font>';
			_html += '</span>';
			_html += '<span id="' + this.config.id + '_pbItemRight' + (i+1) + '" style="height:' + itemSize + 'px;width:33.3%;">';
			_html += '</span>';
			_html += '</div>';
		}
	}
	else {
		//calculate the width of each item
		itemSize = (this.config.width-100)/maxItems;
		itemSize = this.formatNumber(itemSize,2);
		itemStyle = 'style="vertical-align:top;float:left;width:' + itemSize + 'px;height:100%;text-align:' + this.config.ticks.alignment + ';"';
		itemChar = "-";
		
		//create 100 items
		for (var i=0;i<maxItems;i++) {
			//build the current item
			_html += '<div id="' + this.config.id + '_pbItem' + (i+1) + '" class="' + this.config.id + '_pbItem" ' + itemStyle + '>';
			_html += '<div id="' + this.config.id + '_pbItemLeft' + (i+1) + '" style="float:none;height:33.3%;width:' + itemSize + 'px;">';
			_html += '</div>';
			_html += '<div id="' + this.config.id + '_pbItemCenter' + (i+1) + '" style="float:none;height:33.3%;width:' + itemSize + 'px;">';
			_html += '<font style="color:transparent;">' + itemChar + '</font>';
			_html += '</div>';
			_html += '<div id="' + this.config.id + '_pbItemRight' + (i+1) + '" style="float:none;height:33.3%;width:' + itemSize + 'px;">';
			_html += '</div>';
			_html += '</div>';
		}
	}	
	
	//render the html
	containerObj = document.getElementById(this.config.id);
	containerObj.innerHTML = _html;
	
	
	//build a text container if necessary
	if (document.getElementById(txtId)==null) {
		txtComp = document.createElement("input");
		txtComp.setAttribute("id", txtId);
		txtComp.setAttribute("type", "text");
		containerObj.parentNode.appendChild(txtComp);
		
		//set the text container's properties
		$("#"+txtId).attr("readonly","readonly");
		$("#"+txtId).css("font-weight","bold");
		$("#"+txtId).css("text-align","center");
		$("#"+txtId).css("border","0px solid transparent");
		$("#"+txtId).css("background-color","transparent");
		$("#"+txtId).css("z-index",1);
		$("#"+this.config.id).css("z-index",0);
	}
	$("#"+txtId).css("color",this.config.fontColor);
	$("#"+txtId).css("font-size",this.config.fontSize+"px");
	$("#"+txtId).attr("value","");
	
	//align the text container correctly
	alignComponent(txtId,this.config.id,"overlay",true);
};

Gauge.prototype.renderTicks = function() {
	//declare locals
	var tickStep = 0;
	var currTickValue = 0;
	
	//check if ticks should be rendered
	if (this.config.showTicks==false) {
		return;
	}
	
	//calculate the step value between each tick
	tickStep = (this.config.maxValue - this.config.minValue) / this.config.ticks.count;
	tickStep = this.formatNumber(tickStep,2);
	
	//set the min tick value
	this.renderTickPerValue(this.config.ticks.start);
	
	//set the max tick value
	this.renderTickPerValue(this.config.ticks.end);
	
	//loop through the tick
	for (var i=1;i<this.config.ticks.count;i++) {
		//get the current tick's value
		currTickValue = (i * tickStep) + this.config.ticks.start;
		
		//render  the current tick
		this.renderTickPerValue(currTickValue);
	}
};

Gauge.prototype.renderTickPerValue = function(_tickValue) {
	//declare locals
	var dir = this.config.direction;
	var currLeftItemId = "";
	var currRightItemId = "";
	var currCenterItemId = "";
	var currTickPercent = 0;
	var currTickLeftObj = null;
	var currTickCenterObj = null;
	var currTickRightObj = null;
	var tickHtml = "";
	var tickLabelHtmlPrefix = "";
	var tickLabelHtmlSuffix = "";
	var tickLabelHtml = "";
	var tickThickness = this.config.ticks.thickness;
	
	//check for nulls
	if (_tickValue!=0 && (_tickValue==null || _tickValue=="undefined" || _tickValue=="")) {
		return;
	}
	
	//render each tick's html
	tickHtml = '<font style="font-size:' + tickThickness + 'px;color:' + this.config.ticks.color + ';">-</font>';
	tickLabelHtmlPrefix = '<font style="font-size:' + this.config.ticks.labelSize + 'px;color:' + this.config.ticks.labelColor + ';">';
	tickLabelHtmlSuffix = '</font>';
	tickLabelHtml = tickLabelHtmlPrefix+_tickValue+tickLabelHtmlSuffix;
	//tickLabelHtml = "";
	
	//get the current tick's percentage
	currTickPercent = this.getPercentByValue(_tickValue);
	currTickPercent = this.formatNumber(currTickPercent,0);
	
	//fix the value according to the direction
	if (dir=="rtl" || dir=="btt") {
		currTickPercent = (100 - currTickPercent);
	}
	
	//fix the value if necessary
	if (currTickPercent<=0) {
		currTickPercent = 1;
	}
	currTickPercent = (currTickPercent - 5);
	
	//get the tick's html element
	currLeftItemId = this.config.id + '_pbItemLeft' + (currTickPercent);
	currTickLeftObj = document.getElementById(currLeftItemId);
	currCenterItemId = this.config.id + '_pbItemCenter' + (currTickPercent);
	currTickCenterObj = document.getElementById(currCenterItemId);
	currRightItemId = this.config.id + '_pbItemRight' + (currTickPercent);
	currTickRightObj = document.getElementById(currRightItemId);
	
	//check for nulls, and render the tick
	if (currTickLeftObj!=null) {
		//$("#"+currLeftItemId).css("text-align","left");
		if (this.config.ticks.alignment=="left" || this.config.ticks.alignment=="center") {
			$("#"+currLeftItemId).html(tickHtml);
		}
	}
	if (currTickCenterObj!=null) {
		$("#"+currCenterItemId).html(tickLabelHtml);
	}
	if (currTickRightObj!=null) {
		//$("#"+currRightItemId).css("text-align","right");
		if (this.config.ticks.alignment=="right" || this.config.ticks.alignment=="center") {
			$("#"+currRightItemId).html(tickHtml);
		}
	}
};

Gauge.prototype.getValue = function() {
	return this.config.value;
};

Gauge.prototype.formatNumber = function(_number,_numDigitsAfterFloatingPoint) {
	//declare locals
	var numStr = "";
	var numRetVal = 0;
	var DEFAUL_DIGITS_AFTER_FLOATING_POINT = 2;
	var numDigits = 0;
	var fpDelim = ".";
	var fpIndex = -1;
	var num = "";
	var fp = "";
	var fpLegth = 0;
	
	//check for nulls
	if (_number==null || _number=="undefined" || _number=="") {
		return numRetVal;
	}
	
	//set defaults if necessary
	numDigits = _numDigitsAfterFloatingPoint;
	if (numDigits!=0 && (numDigits==null || numDigits=="undefined")) {
		numDigits = DEFAUL_DIGITS_AFTER_FLOATING_POINT;
	}
	
	//convert the number into a string
	numStr = new String(_number);
	numRetVal = _number;
	
	//get the index of the floating point
	fpIndex = numStr.indexOf(fpDelim);
	
	//check for a valid index
	if (fpIndex==-1) {
		return numRetVal;
	}
	
	//parse the integer part from the number string
	num = numStr.substring(0,fpIndex);
	fpLegth = numStr.length - fpIndex;
	
	//check for a valid number of digits
	if (numDigits<=0) {
		numRetVal = parseInt(num);
		return numRetVal;
	}
	if (numDigits>fpLegth) {
		return numRetVal;
	}
	
	//parse the floating point part from the number string
	fp = numStr.substring(fpIndex+1,fpIndex+numDigits);
	
	//set the return value
	numStr = num + fpDelim + fp;
	numRetVal = parseFloat(numStr);
	
	//return the method's value
	return numRetVal;
};

Gauge.prototype.getPercentByValue = function(_value) {
	//declare locals
	var currPercent = 0;
	
	//check for nulls
	if (_value!=0 && _value==null) {
		return currPercent;
	}
	
	//calculate the percentage
	currPercent = (_value / this.config.maxValue) * 100;
	
	//format the number
	currPercent = this.formatNumber(currPercent,0);
	
	//return the method's value
	return currPercent;
};

Gauge.prototype.getPercent = function() {
	//declare locals
	var currPercent = 0;
	
	//calculate the percentage
	currPercent = (this.config.value / this.config.maxValue) * 100;
	
	//format the number
	currPercent = this.formatNumber(currPercent,0);
	
	//return the method's value
	return currPercent;
};

//refresh the progress bar
Gauge.prototype.refresh = function(newValue) {
	//fix values if necessary
	if (newValue > this.config.maxValue) {
		newValue = this.config.maxValue;
	}
	if (newValue < this.config.minValue) {
		newValue = this.config.minValue;
	}
	
	//set the new value
	this.config.value = newValue;
	var currPercent = this.getPercent();
	if (this.config.showPercent==true) {
		newValue = currPercent + " %";
	}
	
	//update the text container
	var txtId = this.getTextContainerId();
	if (this.config.showProgressText==true || this.config.showPercent==true) {
		$("#"+txtId).attr("value",newValue);
	}
	
	//redraw the component
	this.render();
};

//render the progress bar's progress
Gauge.prototype.render = function() {
	//get the progress bar's attributes
	var currPercent = this.getPercent();
	var dir = this.config.direction;
	var start = 0;
	var end = 100;
	var containerObj = null;
	var containerChildren = null;
	var currChildID = null;
	var backgroundImage = this.config.fillImagePath;
	var blankColor = "#ffffff";
	var blankBgImage = "";
	
	//check the direction
	if (dir=="rtl" || dir=="btt") {
		start = 100;
		end = 100 - currPercent;
	}
	else {
		start = 0;
		end = currPercent;
	}
	
	//get the container
	containerObj = document.getElementById(this.config.id);
	
	//check for nulls
	if (containerObj==null) {
		return;
	}
	
	//clear previous data
	$("." + this.config.id + "_pbItem").css("background-color",blankColor);
	$("." + this.config.id + "_pbItem").css("background-image",blankBgImage);
	
	//check for a valid value
	if (currPercent==0) {
		return;
	}
	
	//get the container's children
	containerChildren = containerObj.childNodes;
	
	//check the component's direction
	if (dir=="rtl" || dir=="btt") {
		//loop through the container's child items
		for (var i=(start-1);i>=end;i--) {
			//get the current child's id
			currChildID = containerChildren[i].id;
			
			//update the progress
			if (backgroundImage==null || backgroundImage=="") {
				$("#"+currChildID).css("background-color",this.config.fillColor);
			}
			else {
				$("#"+currChildID).css("background-image","url('"+backgroundImage+"')");
				//$("#"+currChildID).css("background-attachment","fixed");
				//$("#"+currChildID).css("background-position","48% 0%");
			}
		}
	}
	else {
		for (var i=start;i<end;i++) {
			//get the current child's id
			currChildID = containerChildren[i].id;
			
			//update the progress
			if (backgroundImage==null || backgroundImage=="") {
				$("#"+currChildID).css("background-color",this.config.fillColor);
			}
			else {
				$("#"+currChildID).css("background-image","url('"+backgroundImage+"')");
				//$("#"+currChildID).css("background-attachment","fixed");
				//$("#"+currChildID).css("background-position","0% 48%");
			}
		}
	}
};

