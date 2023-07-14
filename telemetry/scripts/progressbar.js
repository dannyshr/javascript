/**
 * @widget: ProgressBar
 * @author: Danny Shraga
 * @creationDate: 27/11/2012
 */
ProgressBar = function(config) {
	//check for required params
	if (!config.id) {alert("Missing id parameter for ProgressBar!"); return false;} 
	if (!document.getElementById(config.id)) {alert("No element with id: \""+config.id+"\" found!"); return false;} 
	  
	//configurable parameters
	this.config = {
		id: config.id
		,orientation: (config.orientation) ? config.orientation : "horizontal"
		,direction: (config.direction) ? config.direction : "ltr"
		,totalItems: (config.totalItems) ? config.totalItems : 100
		,value: (config.value) ? config.value : 0
		,width: (config.width) ? config.width : 200
		,height: (config.height) ? config.height : 20
		,showProgressText: (config.showProgressText) ? config.showProgressText : false
		,showPercent: (config.showPercent) ? config.showPercent : true
		,itemPrefix: (config.itemPrefix) ? config.itemPrefix : ""
		,itemSuffix: (config.itemSuffix) ? config.itemSuffix : ""
		,totalItemsPrefix: (config.totalItemsPrefix) ? config.totalItemsPrefix : " of "
		,totalItemsSuffix: (config.totalItemsSuffix) ? config.totalItemsSuffix : ""
		,fontColor: (config.fontColor) ? config.fontColor : "#000000"
		,fontSize: (config.fontSize) ? config.fontSize : 12
		,fillColor: (config.fillColor) ? config.fillColor : "#cccccc"
		,fillImagePath: (config.fillImagePath) ? config.fillImagePath : ""
	};
	this.renderContainer();
};

ProgressBar.prototype.getTextContainerId = function() {
	//return the method's value
	return this.config.id + "_TextContainer";
};

ProgressBar.prototype.reRender = function(config) {
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
};

ProgressBar.prototype.renderContainer = function() {
	//declare locals
	var _html = "";
	var containerObj = null;
	var orientation = this.config.orientation;
	var maxItems = 100;
	var itemSize = 0;
	var itemStyle = null;
	var txtId = this.getTextContainerId();
	var txtComp = null;
	
	//set the container's height and width
	$("#"+this.config.id).css("width",this.config.width);
	$("#"+this.config.id).css("height",this.config.height);

	//check the orientation
	if (orientation=="vertical") {
		//calculate the height of each item
		itemSize = this.config.height/100;
		itemSize = this.formatNumber(itemSize,2);
		itemStyle = 'style="float:none;width:100%;height:' + itemSize + 'px;"';
	}
	else {
		//calculate the width of each item
		itemSize = this.config.width/100;
		itemSize = this.formatNumber(itemSize,2);
		itemStyle = 'style="float:left;height:100%;width:' + itemSize + 'px;"';
	}	
		
	//create 100 items
	for (var i=0;i<maxItems;i++) {
		//build the current item
		_html += '<div id="' + this.config.id + '_pbItem' + (i+1) + '" ' + itemStyle + '>';
		_html += '<font style="color:transparent;">|</font>';
		_html += '</div>';
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
	alignComponent(txtId,this.config.id,"overlay",true,true);
};

ProgressBar.prototype.getValue = function() {
	return this.config.value;
};

ProgressBar.prototype.formatNumber = function(_number,_numDigitsAfterFloatingPoint) {
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
	if (numDigits==null || numDigits=="undefined") {
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

ProgressBar.prototype.getPercent = function() {
	//declare locals
	var currPercent = 0;
	
	//calculate the percentage
	currPercent = (this.config.value / this.config.totalItems) * 100;
	
	//format the number
	currPercent = this.formatNumber(currPercent,0);
	
	//return the method's value
	return currPercent;
};

//refresh the progress bar
ProgressBar.prototype.refresh = function(newValue) {
	//fix values if necessary
	if (newValue > this.config.totalItems) {
		newValue = this.config.totalItems;
	}
	if (newValue < 0) {
		newValue = 0;
	}
	
	//set the new value
	this.config.value = newValue;
	var currPercent = this.getPercent();
	if (this.config.showPercent==true) {
		newValue = currPercent + " %";
	}
	else {
		newValue = this.config.itemPrefix + newValue + this.config.itemSuffix + 
					this.config.totalItemsPrefix + this.config.totalItems + 
					this.config.totalItemsSuffix;
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
ProgressBar.prototype.render = function() {
	//get the progress bar's attributes
	var currPercent = this.getPercent();
	var dir = this.config.direction;
	var start = 0;
	var end = 100;
	var containerObj = null;
	var containerChildren = null;
	var currChildID = null;
	var backgroundImage = this.config.fillImagePath;
	
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

