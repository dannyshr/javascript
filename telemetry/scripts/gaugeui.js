
//declare globals
var _mapComponents = null;

$(document).ready(function() {
	//load the correct resource bundle
	var _lang = getLanguage();
	loadResourceBundle(_lang);
	
	//create a new map
	_mapComponents = new Utils.Map();
	
	//render the ui
	renderHeader();
	renderPageTable();
	renderNewCompDialog();
	
	//translate the page
	translatePage();
});

function getNewComponentDialogId() {
	return "dlgNewGauge";
}

function getCompIdPrefix() {
	return "gauge";
}

function getCompTitleIdSuffix() {
	return "_Title";
}

function isValidComponent(_compObj) {
	//declare locals
	var _className = null;
	
	//check for nulls
	if (_compObj==null || _compObj=="undefined") {
		return false;
	}
	
	//get the component's class name
	_className = _compObj.className;
	
	//check for nulls
	if (_className==null || _className=="") {
		return false;
	}
	
	if (_className=="gauge") {
		return true;
	}
	
	//return the method's value
	return false;
}

function getComponentProperties() {
	//declare locals
	var _props = [
		{name:"id",type:"string",defaultValue:generateUniqueCompId(),readonly:true,required:true}
		,{name:"orientation",type:"list",defaultValue:"vertical",values:["horizontal","vertical"],readonly:false,required:true}
		,{name:"direction",type:"list",defaultValue:"btt",values:["ltr","rtl","ttb","btt"],readonly:false,required:true}
		,{name:"minValue",type:"int",defaultValue:"0",readonly:false,required:true}
		,{name:"maxValue",type:"int",defaultValue:"100",readonly:false,required:true}
		,{name:"value",type:"int",defaultValue:"0",readonly:false,required:true}
		,{name:"showTicks",type:"boolean",defaultValue:"true",readonly:false,required:true}
		,{name:"ticks_count",type:"int",defaultValue:"10",readonly:false,required:true}
		,{name:"ticks_start",type:"int",defaultValue:"10",readonly:false,required:true}
		,{name:"ticks_end",type:"int",defaultValue:"100",readonly:false,required:true}
		,{name:"ticks_thickness",type:"int",defaultValue:"18",readonly:false,required:true}
		,{name:"ticks_alignment",type:"list",defaultValue:"left",values:["center","left","right"],readonly:false,required:true}
		,{name:"ticks_color",type:"string",defaultValue:"#000000",readonly:false,required:true}
		,{name:"ticks_labelSize",type:"int",defaultValue:"12",readonly:false,required:true}
		,{name:"ticks_labelColor",type:"string",defaultValue:"#000000",readonly:false,required:true}
		,{name:"width",type:"int",defaultValue:"60",readonly:false,required:false}
		,{name:"height",type:"int",defaultValue:"200",readonly:false,required:false}
		,{name:"showProgressText",type:"boolean",defaultValue:"true",readonly:false,required:false}
		,{name:"showPercent",type:"boolean",defaultValue:"false",readonly:false,required:false}
		,{name:"fontColor",type:"string",defaultValue:"#000000",readonly:false,required:false}
		,{name:"fontSize",type:"int",defaultValue:"12",readonly:false,required:false}
		,{name:"fillColor",type:"string",defaultValue:"#327a9e",readonly:false,required:false}
		,{name:"fillImagePath",type:"string",defaultValue:"",readonly:false,required:false}
	];
	
	//return the method's value
	return _props;
}

function gaugeStart(_compId) {
	//declare locals
	var _methodName = "updateGaugeValue";
	
	//invoke the correct method
	startAutoRefresh(_compId,_methodName);
}

function gaugeStop(_compId) {
	//invoke the correct method
	stopAutoRefresh(_compId);
}

function getRandomIntPerGauge(_compId) {
	//declare locals
	var _compConfig = getComponentConfig(_compId);
	var _minVal = 0;
	var _maxVal = 0;
	var _randVal = 0;
	
	//check for nulls
	if (_compConfig==null) {
		return _randVal;
	}
	
	//get the object's min and max values
	_minVal = _compConfig.minValue;
	_maxVal = _compConfig.maxValue;
	
	//get a random value
	_randVal = getRandomInt(_minVal,_maxVal);
	
	//return the method's value
	return _randVal;
}

function updateGaugeValue(_compId) {
	//declare locals
	var _obj = getComponentObject(_compId);
	var _newValue = getRandomIntPerGauge(_compId);
	
	//check for nulls
	if (_obj==null) {
		return;
	}

	//refresh the object's value
	_obj.refresh(_newValue);
}

function getComponentsToTranslate() {
	//declare locals
	var _components = [
		{id:"mainHeader",atts:["dir"],keys:["page.dir"]}
		,{id:".headerTextCol",atts:["class"],keys:["page.header.class"]}
		,{id:"cmbLangs",atts:["title"],keys:["cmbLangs.tooltip"]}
		,{id:"opt_en_us",atts:["innerHTML"],keys:["languages.option.en_us"]}
		,{id:"opt_es",atts:["innerHTML"],keys:["languages.option.es"]}
		,{id:"opt_he",atts:["innerHTML"],keys:["languages.option.he"]}
		,{id:"imagePlus",atts:["title"],keys:["imagePlus.tooltip"]}
		,{id:"dlgNewCompTableHeader",atts:["innerHTML"],keys:["dlgNewGauge.header.text"]}		
		,{id:".dlgNewCompLabelCol",atts:["class"],keys:["dlgNewGauge.class.labelCol"]}
		,{id:"dlgNewCompBtnClose",atts:["title","value"],keys:["dlgNewGauge.btnClose.tooltip","dlgNewGauge.btnClose.caption"]}
		,{id:"dlgNewCompBtnCreate",atts:["title","value"],keys:["dlgNewGauge.btnCreate.tooltip","dlgNewPB.btnCreate.caption"]}
		,{id:".dlgNewCompHeaderBtnCloseCol",atts:["class"],keys:["dlgNewGauge.btnCloseCol.class"]}
		,{id:".dlgNewCompBtnCreateCol",atts:["class"],keys:["dlgNewGauge.btnCreateCol.class"]}
		,{id:".dlgNewCompTextboxError",atts:["title"],keys:["attName:errMsgKey"],params:["translate:true;attName:errMsgParam"]}
		,{id:"pageTitle",atts:["innerHTML"],keys:["page.title.gauge"]}
		,{id:"pageHeaderText",atts:["innerHTML"],keys:["page.header.gauge"]}
		,{id:"dlgNewGauge",atts:["dir"],keys:["page.dir"]}
		,{id:".compContainerBtnClose",atts:["title"],keys:["gauge.btnClose.tooltip"]}
		,{id:".btnStartComp",atts:["title","value"],keys:["gauge.btnStart.tooltip","gauge.btnStart.caption"]}
		,{id:".btnStopComp",atts:["title","value"],keys:["gauge.btnStop.tooltip","gauge.btnStop.caption"]}
	];
	
	//return the method's value
	return _components;
}

function updateComponentTitle(_titleElemId,_title) {
	updateComponentInnerHtml(_titleElemId,_title);
}

function createNewComponent() {
	//declare locals
	var _newElemNum = 0;
	var _containerCellId = null;
	var _isValid = false;
	var _compClass = "gauge";
	var _compObj = null;
	var _titleElemId = null;
	var _config = {
		id: generateUniqueCompId()
		,orientation: document.getElementById(getNewComponentDialogId() + "orientation").value
		,direction: document.getElementById(getNewComponentDialogId() + "direction").value
		,minValue: parseInt(document.getElementById(getNewComponentDialogId() + "minValue").value)
		,maxValue: parseInt(document.getElementById(getNewComponentDialogId() + "maxValue").value)
		,value: parseInt(document.getElementById(getNewComponentDialogId() + "value").value)
		,showTicks: document.getElementById(getNewComponentDialogId() + "showTicks").checked
		,width: parseInt(document.getElementById(getNewComponentDialogId() + "width").value)
		,height: parseInt(document.getElementById(getNewComponentDialogId() + "height").value)
		,showProgressText: document.getElementById(getNewComponentDialogId() + "showProgressText").checked
		,showPercent: document.getElementById(getNewComponentDialogId() + "showPercent").checked
		,fontColor: document.getElementById(getNewComponentDialogId() + "fontColor").value
		,fontSize: parseInt(document.getElementById(getNewComponentDialogId() + "fontSize").value)
		,fillColor: document.getElementById(getNewComponentDialogId() + "fillColor").value
		,fillImagePath: document.getElementById(getNewComponentDialogId() + "fillImagePath").value
	};
	//configure the component's ticks
	_config.ticks = {};
	_config.ticks.count = parseInt(document.getElementById(getNewComponentDialogId() + "ticks_count").value);
	_config.ticks.start = parseInt(document.getElementById(getNewComponentDialogId() + "ticks_start").value);
	_config.ticks.end = parseInt(document.getElementById(getNewComponentDialogId() + "ticks_end").value);
	_config.ticks.thickness = parseInt(document.getElementById(getNewComponentDialogId() + "ticks_thickness").value);
	_config.ticks.alignment = document.getElementById(getNewComponentDialogId() + "ticks_alignment").value;
	_config.ticks.labelSize = parseInt(document.getElementById(getNewComponentDialogId() + "ticks_labelSize").value);
	_config.ticks.color = document.getElementById(getNewComponentDialogId() + "ticks_color").value;
	_config.ticks.labelColor = document.getElementById(getNewComponentDialogId() + "ticks_labelColor").value;
	
	//validate the form
	_isValid = validateNewCompForm();
	if (!_isValid) {
		return;
	}
	
	//get the new component's number
	_newElemNum = getNextCompNumber();
	
	//get the id of the container cell
	_containerCellId = getCompContainerCellId(_newElemNum);
	
	//render the component's container
	renderComponentContainer(_containerCellId, _config.id, _compClass,_newElemNum);
	
	//update the container's title
	_titleElemId = (getCompContainerIdPrefix() + _newElemNum) + getCompTitleIdSuffix();
	updateComponentTitle(_titleElemId,_config.id);
	
	//create a new component
	_compObj = new Gauge(_config);
	//_compObj.reRender(_config);
	
	//add the component to the map
	_mapComponents.put(_config.id, _compObj);
	
	//close the dialog
	hideNewComponentDialog();
}

function getCompContainerIdPrefix() {
	return "progressbarContainer";
}

function renderComponentContainer(_containerParentId,_compId,_compClass,_newElemNum) {
	//declare locals
	var _containerObj = null;
	var _containerId = getCompContainerIdPrefix() + _newElemNum;
	var _html = "";
	var _btnCloseTooltip = translate("gauge.btnClose.tooltip");
	var _btnStartTooltip = translate("gauge.btnStart.tooltip");
	var _btnStartValue = translate("gauge.btnStart.caption");
	var _btnStopTooltip = translate("gauge.btnStop.tooltip");
	var _btnStopValue = translate("gauge.btnStop.caption");
	
	//check for nulls
	if (_containerParentId==null || _compId==null || _compClass==null) {
		return;
	}
	//get elements by their id
	_containerObj = document.getElementById(_containerParentId);
	
	//check for nulls
	if (_containerObj==null) {
		return;
	}
	
	//build the html
	_html += '<div id="' + _containerId + '" class="compContainerDiv">';
	_html += '<table border="0" class="compContainerTable" cellspacing="3" cellpadding="3">';
	
	//render a header row
	_html += '<tr class="compContainerHeaderRow">';
	_html += '<td class="compContainerTitleCol">';
	_html += '<div id="' + _containerId + getCompTitleIdSuffix() + '" class="compContainerTitleCol">';
	_html += '</div>';
	_html += '</td>';
	_html += '<td class="compContainerBtnCloseCol">';
	_html += '<img src="images/buttonClose.png" class="compContainerBtnClose" title="' + _btnCloseTooltip + '" onclick="removeComponent(\'' + _compId + '\',\'' + _containerParentId + '\',\'' + _containerId + '\');" />';
	_html += '</td>';
	_html += '</tr>';

	//render a component row
	_html += '<tr class="compContainerCompRow">';
	_html += '<td colspan="2" class="compContainerCompCol">';
	_html += '<div id="' + _compId + '" class="' + _compClass + '"></div>';
	_html += '</td>';
	_html += '</tr>';
	
	//render a buttons row
	_html += '<tr class="compContainerFooterRow">';
	_html += '<td colspan="2">';
	_html += '<input id="' + _compId + '_btnStart" class="btnStartComp" type="button" title="' + _btnStartTooltip + '" value="' + _btnStartValue + '" />';
	_html += '<input id="' + _compId + '_btnStop" class="btnStopComp" disabled="disabled" type="button" title="' + _btnStopTooltip + '" value="' + _btnStopValue + '" />';
	_html += '</td>';
	_html += '</tr>';
	_html += '</table>';
	_html += '</div>';
	
	//render the html
	_containerObj.innerHTML = _html;
	
	//attach events
	attachPBButtonsEvents(_compId);
}

function attachPBButtonsEvents(_compId) {
	//attach the events
	attachPBStartButtonEventOnclick(_compId);
	attachPBStopButtonEventOnclick(_compId);
}

function attachPBStartButtonEventOnclick(_compId) {
	//declare locals
	var _elemId = _compId + "_btnStart";
	var _elemObj = null;
	
	//get elements by their id
	_elemObj = document.getElementById(_elemId);
	
	//check for nulls
	if (_elemObj==null) {
		return;
	}
	
	//attach the event
	_elemObj.onclick = function() {
		//declare locals
		var functionHanlder = gaugeStart;
		var _stopId = _compId + "_btnStop";
		var _startId = _compId + "_btnStart";
		
		//invoke the function handler
		functionHanlder(_compId);
		
		//enable the other button
		document.getElementById(_stopId).disabled = false;
		document.getElementById(_startId).disabled = true;
	};
}

function attachPBStopButtonEventOnclick(_compId) {
	//declare locals
	var _elemId = _compId + "_btnStop";
	var _elemObj = null;
	
	//get elements by their id
	_elemObj = document.getElementById(_elemId);
	
	//check for nulls
	if (_elemObj==null) {
		return;
	}
	
	//attach the event
	_elemObj.onclick = function() {
		//declare locals
		var functionHanlder = gaugeStop;
		var _stopId = _compId + "_btnStop";
		var _startId = _compId + "_btnStart";
		
		//invoke the function handler
		functionHanlder(_compId);
		
		//enable the other button
		document.getElementById(_startId).disabled = false;
		document.getElementById(_stopId).disabled = true;
	};
}

