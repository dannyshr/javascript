
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
	return "dlgNewProgressbar";
}

function getCompIdPrefix() {
	return "pb";
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
	
	if (_className=="progressbar") {
		return true;
	}
	
	//return the method's value
	return false;
}

function getComponentProperties() {
	//declare locals
	var _props = [
		{name:"id",type:"string",defaultValue:generateUniqueCompId(),readonly:true,required:true}
		,{name:"orientation",type:"list",defaultValue:"horizontal",values:["horizontal","vertical"],readonly:false,required:true}
		,{name:"direction",type:"list",defaultValue:"ltr",values:["ltr","rtl","ttb","btt"],readonly:false,required:true}
		,{name:"totalItems",type:"int",defaultValue:"100",readonly:false,required:true}
		,{name:"value",type:"int",defaultValue:"0",readonly:false,required:true}
		,{name:"width",type:"int",defaultValue:"200",readonly:false,required:false}
		,{name:"height",type:"int",defaultValue:"20",readonly:false,required:false}
		,{name:"showProgressText",type:"boolean",defaultValue:"false",readonly:false,required:false}
		,{name:"showPercent",type:"boolean",defaultValue:"true",readonly:false,required:false}
		,{name:"itemPrefix",type:"string",defaultValue:"",readonly:false,required:false}
		,{name:"itemSuffix",type:"string",defaultValue:"",readonly:false,required:false}
		,{name:"totalItemsPrefix",type:"string",defaultValue:" of ",readonly:false,required:false}
		,{name:"totalItemsSuffix",type:"string",defaultValue:"",readonly:false,required:false}
		,{name:"fontColor",type:"string",defaultValue:"#000000",readonly:false,required:false}
		,{name:"fontSize",type:"int",defaultValue:"12",readonly:false,required:false}
		,{name:"fillColor",type:"string",defaultValue:"#cccccc",readonly:false,required:false}
		,{name:"fillImagePath",type:"string",defaultValue:"images/backgrounds/background_black_h.gif",readonly:false,required:false}
	];
	
	//return the method's value
	return _props;
}

function progressbarStart(_compId) {
	//declare locals
	var _methodName = "updateProgressbarValue";
	
	//invoke the correct method
	startAutoRefresh(_compId,_methodName);
}

function progressbarStop(_compId) {
	//invoke the correct method
	stopAutoRefresh(_compId);
}

function updateProgressbarValue(_pbId) {
	//declare locals
	var _obj = getComponentObject(_pbId);
	var _currVal = null;
	
	//check for nulls
	if (_obj==null) {
		return;
	}
	
	//get the object's current value
	_currVal = _obj.config.value;
	
	//check if it needs stopping
	if (_currVal>=_obj.config.totalItems) {
		progressbarStop(_pbId);
	}
	else {
		//refresh the object's value
		_currVal++;
		_obj.refresh(_currVal);
	}
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
		,{id:"dlgNewCompTableHeader",atts:["innerHTML"],keys:["dlgNewPB.header.text"]}		
		,{id:".dlgNewCompLabelCol",atts:["class"],keys:["dlgNewGauge.class.labelCol"]}
		,{id:"dlgNewCompBtnClose",atts:["title","value"],keys:["dlgNewGauge.btnClose.tooltip","dlgNewGauge.btnClose.caption"]}
		,{id:"dlgNewCompBtnCreate",atts:["title","value"],keys:["dlgNewPB.btnCreate.tooltip","dlgNewPB.btnCreate.caption"]}
		,{id:".dlgNewCompHeaderBtnCloseCol",atts:["class"],keys:["dlgNewGauge.btnCloseCol.class"]}
		,{id:".dlgNewCompBtnCreateCol",atts:["class"],keys:["dlgNewGauge.btnCreateCol.class"]}
		,{id:".dlgNewCompTextboxError",atts:["title"],keys:["attName:errMsgKey"],params:["translate:true;attName:errMsgParam"]}
		,{id:"pageTitle",atts:["innerHTML"],keys:["page.title.progressbar"]}
		,{id:"pageHeaderText",atts:["innerHTML"],keys:["page.header.progressbar"]}
		,{id:"dlgNewProgressbar",atts:["dir"],keys:["page.dir"]}
		,{id:".compContainerBtnClose",atts:["title"],keys:["pb.btnClose.tooltip"]}
		,{id:".btnStartComp",atts:["title","value"],keys:["pb.btnStart.tooltip","pb.btnStart.caption"]}
		,{id:".btnStopComp",atts:["title","value"],keys:["pb.btnStop.tooltip","pb.btnStop.caption"]}
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
	var _compClass = "progressbar";
	var _compObj = null;
	var _titleElemId = null;
	var _config = {
		id: generateUniqueCompId()
		,orientation: document.getElementById(getNewComponentDialogId() + "orientation").value
		,direction: document.getElementById(getNewComponentDialogId() + "direction").value
		,totalItems: parseInt(document.getElementById(getNewComponentDialogId() + "totalItems").value)
		,value: parseInt(document.getElementById(getNewComponentDialogId() + "value").value)
		,width: parseInt(document.getElementById(getNewComponentDialogId() + "width").value)
		,height: parseInt(document.getElementById(getNewComponentDialogId() + "height").value)
		,showProgressText: document.getElementById(getNewComponentDialogId() + "showProgressText").checked
		,showPercent: document.getElementById(getNewComponentDialogId() + "showPercent").checked
		,itemPrefix: document.getElementById(getNewComponentDialogId() + "itemPrefix").value
		,itemSuffix: document.getElementById(getNewComponentDialogId() + "itemSuffix").value
		,totalItemsPrefix: document.getElementById(getNewComponentDialogId() + "totalItemsPrefix").value
		,totalItemsSuffix: document.getElementById(getNewComponentDialogId() + "totalItemsSuffix").value
		,fontColor: document.getElementById(getNewComponentDialogId() + "fontColor").value
		,fontSize: parseInt(document.getElementById(getNewComponentDialogId() + "fontSize").value)
		,fillColor: document.getElementById(getNewComponentDialogId() + "fillColor").value
		,fillImagePath: document.getElementById(getNewComponentDialogId() + "fillImagePath").value
	};
	
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
	_compObj = new ProgressBar(_config);
	_compObj.render();
	
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
	var _btnCloseTooltip = translate("pb.btnClose.tooltip");
	var _btnStartTooltip = translate("pb.btnStart.tooltip");
	var _btnStartValue = translate("pb.btnStart.caption");
	var _btnStopTooltip = translate("pb.btnStop.tooltip");
	var _btnStopValue = translate("pb.btnStop.caption");
	
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
		var functionHanlder = progressbarStart;
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
		var functionHanlder = progressbarStop;
		var _stopId = _compId + "_btnStop";
		var _startId = _compId + "_btnStart";
		
		//invoke the function handler
		functionHanlder(_compId);
		
		//enable the other button
		document.getElementById(_startId).disabled = false;
		document.getElementById(_stopId).disabled = true;
	};
}

