
//declare globals
let _mapComponents = null;
let _mapConfigs = null;

$(document).ready(function() {
	//load the correct resource bundle
	var _lang = getLanguage();
	loadResourceBundle(_lang);
	
	//create a new map
	_mapComponents = new Utils.Map();
	_mapConfigs = new Utils.Map();
	
	//render the ui
	renderHeader();
	renderPageTable();
	renderNewCompDialog();
	setDialogEvents();
	
	//translate the page
	translatePage();
});

function fetchPerfData() {
	var _totalDiskSpace = getDiskSpaceTotal();
	var _computerName = getComputerName();
	var _userName = getUserName();
	var _comps = getNetworkComputers();
	var _msg = "fetchPerfData(): _totalDiskSpace=[" + _totalDiskSpace + "]";
	_msg += "\n_computerName=[" + _computerName + "]";
	_msg += "\n_userName=[" + _userName + "]";
	_msg += "\n_comps=[" + _comps + "]";
	alert(_msg);
}

function getNewComponentDialogId() {
	return "dlgNewGauge";
}

function getComponentProperties() {
	//declare locals
	var _props = [
		{name:"id",type:"string",defaultValue:generateUniqueCompId(),readonly:true,required:true}
		,{name:"gaugeType",type:"list",defaultValue:"justGauge",values:["justGauge","jGaugeDefault","jGaugeTaco"],readonly:false,required:true}
		,{name:"min",type:"int",defaultValue:"0",readonly:false,required:true}
		,{name:"max",type:"int",defaultValue:"100",readonly:false,required:true}
		,{name:"title",type:"string",defaultValue:"Gauge title",readonly:false,required:false}
		,{name:"tooltip",type:"string",defaultValue:"",readonly:false,required:false}
		,{name:"label",type:"string",defaultValue:"",readonly:false,required:false}
		,{name:"showTicks",type:"boolean",defaultValue:"true",readonly:false,required:false}
		,{name:"interval",type:"int",defaultValue:"2",readonly:false,required:true}
		,{name:"threshold",type:"int",defaultValue:"100",readonly:false,required:false}
		,{name:"alertOnThreshold",type:"booleanlist",defaultValue:"false",values:["alertOnThresholdScreen:true","alertOnThresholdEmail:true","alertOnThresholdSMS:true"],readonly:false,required:false}
		,{name:"dataSource",type:"list",defaultValue:"PCPerf",values:["PCPerf"],readonly:false,required:true}
		,{name:"dataSourceUrl",type:"string",defaultValue:"https://ngapps.harel-group.co.il/claims-health/metrics",readonly:false,required:false}
		,{name:"respKeyToMeasure",type:"string",defaultValue:"mem.free",readonly:false,required:false}
	];
	
	//return the method's value
	return _props;
}

function getDataFilterPropertiesPcPerf() {
	//declare locals
	var _props = [
		{name:"measureType",type:"list",defaultValue:"CPU",values:["CPU Usage","Disk space","Available Memory"],readonly:false,required:true}
	];
	
	//return the method's value
	return _props;
}

function getDataSourceElementId() {
	return getNewComponentDialogId()+"dataSource";
}

function getAlertThresholdElementId() {
	return getNewComponentDialogId()+"alertOnThreshold";
}

function getDataSourceUrlElementId() {
	return getNewComponentDialogId()+"dataSourceUrl";
}

function getResponseMeasureKeyElementId() {
	return getNewComponentDialogId()+"respKeyToMeasure";
}

function getDataSourceValue() {
	//declare locals
	var _elemId = getDataSourceElementId();
	var _elemObj = null;
	
	//get elements by their id
	_elemObj = document.getElementById(_elemId);
	
	//check for nulls
	if (_elemObj==null) {
		return;
	}
	
	//return the method's value
	return _elemObj.value;
}

function showDataFilter(_dataSource) {
	//declare locals
	var _containerId = getDataFilterContainerId();
	var _containerObj = null;
	var _containerChildren = null;
	var _currChildId = null;
	var _showChildId = getDataFilterPrefixId() + "_" + _dataSource;
	
	//check for nulls
	if (_dataSource==null || _dataSource=="") {
		return;
	}
	
	//get elements by their id
	_containerObj = document.getElementById(_containerId);
	
	//check for nulls
	if (_containerObj==null) {
		return;
	}
	
	//get the container's children
	_containerChildren = _containerObj.childNodes;
	
	//loop through the children
	for (var i=0;i<_containerChildren.length;i++) {
		//get the current child's id
		_currChildId = _containerChildren[i].id;
		
		//hide the current child
		hideComponent(_currChildId);
	}
	
	//show only the relevant child
	showComponent(_showChildId);
}

function attachGaugeButtonsEvents(_compId) {
	attachGaugeStartButtonEventOnlick(_compId);
	attachGaugeSettingsButtonEventOnlick(_compId);
}

function attachGaugeSettingsButtonEventOnlick(_gaugeId) {
	//declare locals
	var _elemId = _gaugeId + "_btnSettings";
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
		let _compId = _elemObj.id;
		let _gaugeConfig = _mapConfigs.get(_gaugeId);
		let message = "_gaugeId=[" + _gaugeId + "]\n";
		message += "_buttonId=[" + _compId + "]\n";
		message += "_gaugeConfig=[" + JSON.stringify(_gaugeConfig) + "]";
		//alert(message);

		let dlgId = getNewComponentDialogId();
		let _props = getComponentProperties();
		let _currProp = null;
		let _currPropName = null;
		let _currPropValue = null;
		let dlgElem = document.getElementById(dlgId);
		if (dlgElem!=null && dlgElem!=undefined && dlgElem!="undefined") {
			for (var i=0;i<_props.length;i++) {
				//get the current property
				_currProp = _props[i];
				
				//get the property's name
				_currPropName = _currProp.name;

				//set the html component's value
				document.getElementById(dlgId+_currPropName).value = _gaugeConfig[_currPropName];
			}
			dlgElem.style.display = "block";
		}
	};
}

function attachGaugeStartButtonEventOnlick(_gaugeId) {
	//declare locals
	var _elemId = _gaugeId + "_btnStart";
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
		var _compId = _elemObj.id;
		var _hiddenValue = $("#"+_compId).attr("hiddenvalue");;
		var _newHiddenValue = null;
		var _newValue = null;
		var _newTooltip = null;
		var _prevClass = null;
		var _newClass = null;
		var _methodName = null;
		_methodName = "refreshGaugeWithTelemetryData";
		//_methodName = "loadTelemetryDataFile";
		
		//check the button's value
		switch (_hiddenValue) {
			case "start":
				startAutoRefresh(_gaugeId,_methodName);
				_newHiddenValue = "stop";
				_prevClass = "btnStartGauge";
				_newClass = "btnStopGauge";
				_newTooltip = "gauge.btnStop.tooltip";
				_newValue = "gauge.btnStop.caption";
				break;
			case "stop":
				stopAutoRefresh(_gaugeId);
				_newHiddenValue = "start";
				_prevClass = "btnStopGauge";
				_newClass = "btnStartGauge";
				_newTooltip = "gauge.btnStart.tooltip";
				_newValue = "gauge.btnStart.caption";
				break;
		}
		//update the object's class
		if (!$("#"+_compId).hasClass(_newClass)) {
			$("#"+_compId).addClass(_newClass);
		}
		if ($("#"+_compId).hasClass(_prevClass)) {
			$("#"+_compId).removeClass(_prevClass);
		}
		
		//update the object's value and tooltip
		_elemObj.value = translate(_newValue);
		$("#"+_compId).attr("title",translate(_newTooltip));
		$("#"+_compId).attr("hiddenvalue",_newHiddenValue);
	};
}

function attachDialogEvents() {
	attachDatasourceEventOnchange();
	attachAlertThresholdEventOnclick();
}

function attachDatasourceEventOnchange() {
	//declare locals
	var _elemId = getDataSourceElementId();
	var _elemObj = null;
	
	//get elements by their id
	_elemObj = document.getElementById(_elemId);
	
	//check for nulls
	if (_elemObj==null) {
		return;
	}
	
	//attach the event
	_elemObj.onchange = function() {
		//get the value
		var _value = _elemObj.value;
		
		//show the correct data filter
		showDataFilter(_value);
	};
}

function attachAlertThresholdEventOnclick() {
	//declare locals
	var _elemId = getAlertThresholdElementId();
	var _elemObj = null;
	
	//get elements by their id
	_elemObj = document.getElementById(_elemId);
	
	//check for nulls
	if (_elemObj==null) {
		return;
	}
	
	//attach the event
	_elemObj.onclick = function() {
		//get the value
		var _checked = _elemObj.checked;
		
		//invoke the correct method
		setAlertThresholdState(_checked);
	};
}

function setAlertThresholdState(_enabled) {
	//declare locals
	var _cbListItemsIdPrefix = getNewComponentDialogId();
	var _arrItemsIds = new Array("alertOnThresholdScreen","alertOnThresholdEmail","alertOnThresholdSMS");
	var _currId = null;
	var _compObj = null;
	
	//loop through the items
	for (var i=0;i<_arrItemsIds.length;i++) {
		//get the current id
		_currId = _cbListItemsIdPrefix + _arrItemsIds[i];
		
		//get the element by its id
		_compObj = document.getElementById(_currId);
		
		//enable or disable the component
		_compObj.disabled = !_enabled;
	}
}

function attachDataFilterEvents() {
	//declare locals
	var _dataSource = getDataSourceValue();
	
	//check for nulls
	if (_dataSource==null || _dataSource=="") {
		return;
	}
	
	//check the data source
	switch (_dataSource) {
		case "PCPerf":
			//attach the corresponding event
			break;
	}
}

function getDataFilterPrefixId() {
	return "dataFilter";
}

function renderDataFilterPcPerf() {
	//declare locals
	var _elemIdPrefix = getDataFilterPrefixId();
	var _elemId = _elemIdPrefix + "_PCPerf";
	var _props = null;
	var _html = "";
	
	//build the start of the html
	_html += '<div id="' + _elemId + '" class="' + _elemIdPrefix + '">';
	_html += '<table border="0" class="dlgNewGaugeFilterTable" cellspacing="0" cellpadding="0">';
	
	//get the properties
	_props = getDataFilterPropertiesPcPerf();
	
	//render rows from properties
	_html += renderRowsFromProperties(_props);
	
	//build the end of the html
	_html += '</table>';
	_html += '</div>';
	
	//return the method's value
	return _html;
}

function renderDataFilters() {
	//declare locals
	var _containerId = getDataFilterContainerId();
	var _containerObj = null;
	var _dataSource = getDataSourceValue();
	var _html = "";
	
	//check for nulls
	if (_dataSource==null || _dataSource=="") {
		return;
	}
	
	//check the data source
	switch (_dataSource) {
		case "PCPerf":
			_html += renderDataFilterPcPerf();
			break;
	}
	
	//get elements by their id
	_containerObj = document.getElementById(_containerId);
	
	//check for nulls
	if (_containerObj==null) {
		return;
	}
	
	//render the html
	_containerObj.innerHTML = _html;
	
	//attach events
	attachDataFilterEvents();
}

function getDataFilterContainerId() {
	return getNewComponentDialogId() + "_DataFilter";
}

function setDialogEvents() {
	/*
	var _html = "";
	//render a data filter row
	_html += '<tr>';
	_html += '<td colspan="3">';
	_html += '<div id="' + getDataFilterContainerId() + '" class="dlgNewGaugeDataFilter"></div>';
	_html += '</td>';
	_html += '</tr>';
	*/
	
	//render the data filters
	renderDataFilters();
	
	//attach events
	attachDialogEvents();
	
	//fire default events
	setAlertThresholdState(false);
	showDataFilter(getDataSourceValue());
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
		,{id:"dlgNewCompBtnCreate",atts:["title","value"],keys:["dlgNewGauge.btnCreate.tooltip","dlgNewGauge.btnCreate.caption"]}
		,{id:".dlgNewCompHeaderBtnCloseCol",atts:["class"],keys:["dlgNewGauge.btnCloseCol.class"]}
		,{id:".dlgNewCompBtnCreateCol",atts:["class"],keys:["dlgNewGauge.btnCreateCol.class"]}
		,{id:".dlgNewCompTextboxError",atts:["title"],keys:["attName:errMsgKey"],params:["translate:true;attName:errMsgParam"]}
		,{id:"pageTitle",atts:["innerHTML"],keys:["page.title.telemetry"]}
		,{id:"pageHeaderText",atts:["innerHTML"],keys:["page.header.telemetry"]}
		,{id:"dlgNewGauge",atts:["dir"],keys:["page.dir"]}
		,{id:"dlgNewGaugeLbl_id",atts:["innerHTML"],keys:["dlgNewGauge.label.id"]}
		,{id:"dlgNewGaugeLbl_gaugeType",atts:["innerHTML"],keys:["dlgNewGauge.label.gaugeType"]}
		,{id:"dlgNewGaugeLbl_min",atts:["innerHTML"],keys:["dlgNewGauge.label.min"]}
		,{id:"dlgNewGaugeLbl_max",atts:["innerHTML"],keys:["dlgNewGauge.label.max"]}
		,{id:"dlgNewGaugeLbl_title",atts:["innerHTML"],keys:["dlgNewGauge.label.title"]}
		,{id:"dlgNewGaugeLbl_tooltip",atts:["innerHTML"],keys:["dlgNewGauge.label.tooltip"]}
		,{id:"dlgNewGaugeLbl_label",atts:["innerHTML"],keys:["dlgNewGauge.label.label"]}
		,{id:"dlgNewGaugeLbl_showTicks",atts:["innerHTML"],keys:["dlgNewGauge.label.showTicks"]}
		,{id:"dlgNewGaugeLbl_interval",atts:["innerHTML"],keys:["dlgNewGauge.label.interval"]}
		,{id:"dlgNewGaugeLbl_threshold",atts:["innerHTML"],keys:["dlgNewGauge.label.threshold"]}
		,{id:"dlgNewGaugeLbl_alertOnThreshold",atts:["innerHTML"],keys:["dlgNewGauge.label.alertOnThreshold"]}
		,{id:"dlgNewGaugeLbl_alertOnThresholdScreen",atts:["innerHTML"],keys:["dlgNewGauge.label.alertOnThresholdScreen"]}
		,{id:"dlgNewGaugeLbl_alertOnThresholdEmail",atts:["innerHTML"],keys:["dlgNewGauge.label.alertOnThresholdEmail"]}
		,{id:"dlgNewGaugeLbl_alertOnThresholdSMS",atts:["innerHTML"],keys:["dlgNewGauge.label.alertOnThresholdSMS"]}
		,{id:"dlgNewGaugeLbl_dataSource",atts:["innerHTML"],keys:["dlgNewGauge.label.dataSource"]}
		,{id:"dlgNewGaugeLbl_dataSourceUrl",atts:["innerHTML"],keys:["dlgNewGauge.label.dataSourceUrl"]}
		,{id:"dlgNewGaugeLbl_respKeyToMeasure",atts:["innerHTML"],keys:["dlgNewGauge.label.respKeyToMeasure"]}
		,{id:"dlgNewGaugeLbl_measureType",atts:["innerHTML"],keys:["dlgNewGauge.label.measureType"]}
		,{id:".gaugeContainerBtnClose",atts:["title"],keys:["gauge.btnClose.tooltip"]}
		,{id:".btnStartGauge",atts:["title","value"],keys:["gauge.btnStart.tooltip","gauge.btnStart.caption"]}
		,{id:".btnStopGauge",atts:["title","value"],keys:["gauge.btnStop.tooltip","gauge.btnStop.caption"]}
		,{id:".btnSettingsGauge",atts:["title","value"],keys:["gauge.btnSettings.tooltip","gauge.btnSettings.caption"]}
	];
	
	//return the method's value
	return _components;
}

function getCompIdPrefix() {
	return "gauge";
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
	
	if (_className=="jgauge" || _className=="justgauge") {
		return true;
	}
	
	//return the method's value
	return false;
}

function getGaugeContainerIdPrefix() {
	return "gadgetContainer";
}

function getGaugeTitleIdSuffix() {
	return "_Title";
}

function renderGaugeContainer(_containerParentId,_compId,_gaugeClass,_newElemNum) {
	//declare locals
	var _containerObj = null;
	var _containerId = getGaugeContainerIdPrefix() + _newElemNum;
	var _html = "";
	var _btnStartTooltip = translate("gauge.btnStart.tooltip");
	var _btnStartValue = translate("gauge.btnStart.caption");
	var _btnSettingsTooltip = translate("gauge.btnSettings.tooltip");
	var _btnSettingsValue = translate("gauge.btnSettings.caption");
	
	//check for nulls
	if (_containerParentId==null || _compId==null || _gaugeClass==null) {
		return;
	}
	//get elements by their id
	_containerObj = document.getElementById(_containerParentId);
	
	//check for nulls
	if (_containerObj==null) {
		return;
	}
	
	//build the html
	_html += '<div id="' + _containerId + '" class="gaugeContainerDiv">';
	_html += '<table border="0" class="gaugeContainerTable" cellspacing="0" cellpadding="0">';
	
	//render a header row
	_html += '<tr class="gaugeContainerHeaderRow">';
	_html += '<td class="gaugeContainerTitleCol">';
	_html += '<div id="' + _compId + getGaugeTitleIdSuffix() + '" class="gaugeContainerTitleCol">';
	_html += '</div>';
	_html += '</td>';
	_html += '<td class="gaugeContainerBtnCloseCol">';
	_html += '<img src="images/buttonClose.png" class="gaugeContainerBtnClose" title="' + translate("gauge.btnClose.tooltip") + '" onclick="removeComponent(\'' + _compId + '\',\'' + _containerParentId + '\',\'' + _containerId + '\');" />';
	_html += '</td>';
	_html += '</tr>';

	//render a gauge row
	_html += '<tr class="gaugeContainerGaugeRow">';
	_html += '<td colspan="2" class="gaugeContainerGaugeCol">';
	_html += '<div id="' + _compId + '" class="' + _gaugeClass + '"></div>';
	_html += '</td>';
	_html += '</tr>';
	
	//render a buttons row
	_html += '<tr class="gaugeContainerFooterRow">';
	_html += '<td colspan="2">';
	_html += '<input id="' + _compId + '_btnStart" class="btnStartGauge" type="button" hiddenValue="start" title="' + _btnStartTooltip + '" value="' + _btnStartValue + '" />';
	_html += '<input id="' + _compId + '_btnSettings" class="btnSettingsGauge" type="button" title="' + _btnSettingsTooltip + '" value="' + _btnSettingsValue + '" />';
	_html += '</td>';
	_html += '</tr>';
	_html += '</table>';
	_html += '</div>';
	
	//render the html
	_containerObj.innerHTML = _html;
	
	//attach events
	attachGaugeButtonsEvents(_compId);
}

function updateGaugeTitle(_titleElemId,_title) {
	updateComponentInnerHtml(_titleElemId,_title);
}

function updateGaugeTooltip(_compId,_tooltip) {
	//declare locals
	var _divElemObj = null;
	
	//check for nulls
	if (_compId==null || _tooltip==null || _tooltip=="") {
		return;
	}
	
	//get elements by id
	_divElemObj = document.getElementById(_compId);
	
	//check for nulls
	if (_divElemObj==null) {
		return;
	}
	
	//update the tooltip
	$("#"+_compId).attr("title",_tooltip);
}

function createNewComponent() {
	//declare locals
	var _htmlCompIdPrefix = getNewComponentDialogId();
	var _props = null;
	var _currProp = null;
	var _currPropName = null;
	var _currPropType = null;
	var _currPropValue = null;
	var _htmlCompId = null;
	var _gaugeType = null;
	var _gaugeConfig = null;
	var _gaugeObj = null;
	var _gaugeTicksCount = 10;
	var _gaugeClass = null;
	var _newElemNum = 0;
	var _containerCellId = null;
	var _titleElemId = null;
	var _isValid = false;
	
	//validate the form
	_isValid = validateNewCompForm();
	if (!_isValid) {
		return;
	}
	
	//get the properties
	_props = getComponentProperties();
	
	//initialize a config object
	_gaugeConfig = {};
	
	//loop through the props
	for (var i=0;i<_props.length;i++) {
		//get the current property
		_currProp = _props[i];
		
		//get the property's name, and type
		_currPropName = _currProp.name;
		_currPropType = _currProp.type;
		
		//get the html component's id
		_htmlCompId = _htmlCompIdPrefix + _currPropName;
		
		//get the html component's value
		_currPropValue = document.getElementById(_htmlCompId).value;
		
		//set the value's type
		switch (_currPropType) {
			case "int":
				_currPropValue = parseInt(_currPropValue);
				break;
			case "boolean":
				if (document.getElementById(_htmlCompId).checked==true) {
					_currPropValue = true;
				}
				else {
					_currPropValue = false;
				}
				break;
		}
		
		//set the config with the property
		_gaugeConfig[_currPropName] = _currPropValue;
		
		//handle special properties
		if (_currPropName=="gaugeType") {
			_gaugeType = _currPropValue;
		}
		else if (_currPropName=="showTicks" && _currPropValue==false) {
			_gaugeTicksCount = 0;
		}
	}
	
	//get the gauge's class name
	if (_gaugeType=="jGaugeDefault" || _gaugeType=="jGaugeTaco") {
		_gaugeClass = "jgauge";
	}
	else if (_gaugeType=="justGauge") {
		_gaugeClass = "justgauge";
	}

	//check if the component already exists
	if (_mapComponents.contains(_gaugeConfig.id)) {
		_gaugeObj = _mapComponents.get(_gaugeConfig.id);
	}
	else {
		//get the new gauge's number
		_newElemNum = getNextCompNumber();
		
		//get the id of the container cell
		_containerCellId = getCompContainerCellId(_newElemNum);
		
		//render the gauge's container
		renderGaugeContainer(_containerCellId, _gaugeConfig.id, _gaugeClass,_newElemNum);
	}

	//set the gauge's title
	if (_gaugeType=="jGaugeDefault" || _gaugeType=="jGaugeTaco" || _gaugeType=="justGauge") {
		_titleElemId = _gaugeConfig.id + getGaugeTitleIdSuffix();
		updateGaugeTitle(_titleElemId,_gaugeConfig.title);
	}
	
	//set the gauge's tooltip
	updateGaugeTooltip(_gaugeConfig.id,_gaugeConfig.tooltip);
	
	//create a new gauge
	if (_gaugeType=="jGaugeDefault") {
		var _size = null;
		//_size = "small";
		if (_mapComponents.contains(_gaugeConfig.id)) {
			_gaugeObj = _mapComponents.get(_gaugeConfig.id);
		}
		else {
			_gaugeObj = new jGauge(_size);
		}
		_gaugeObj.id = _gaugeConfig.id;
		_gaugeObj.label.suffix = " " + _gaugeConfig.label;
		//_gaugeObj.ticks.color = 'rgba(0,0,0,1)';
		_gaugeObj.ticks.labelColor = '#000000';
		_gaugeObj.ticks.start = _gaugeConfig.min;
		_gaugeObj.ticks.end = _gaugeConfig.max;
		if (_gaugeTicksCount==0) {
			_gaugeObj.ticks.count = _gaugeTicksCount;
		}
		_gaugeObj.showAlerts = true;
		_gaugeObj.config = _gaugeConfig;
		_gaugeObj.init();
	}
	else if (_gaugeType=="jGaugeTaco") {
		if (_mapComponents.contains(_gaugeConfig.id)) {
			_gaugeObj = _mapComponents.get(_gaugeConfig.id);
		}
		else {
			_gaugeObj = new jGauge();
		}
		_gaugeObj.id = _gaugeConfig.id;
		_gaugeObj.autoPrefix = autoPrefix.si; // Use SI prefixing (i.e. 1k = 1000).
		_gaugeObj.imagePath = 'images/jgauge_face_taco.png';
		_gaugeObj.segmentStart = -225;
		_gaugeObj.segmentEnd = 45;
		_gaugeObj.width = 250;
		_gaugeObj.height = 170;
		_gaugeObj.needle.imagePath = 'images/jgauge_needle_taco.png';
		_gaugeObj.needle.xOffset = 0;
		_gaugeObj.needle.yOffset = 0;
		_gaugeObj.label.yOffset = 55;
		_gaugeObj.label.color = '#ffffff';
		_gaugeObj.label.precision = 0; // 0 decimals (whole numbers).
		_gaugeObj.label.suffix = " " + _gaugeConfig.label;
		_gaugeObj.ticks.labelRadius = 45;
		_gaugeObj.ticks.labelColor = '#0ce';
		_gaugeObj.ticks.start = _gaugeConfig.min;
		_gaugeObj.ticks.end = _gaugeConfig.max;
		if (_gaugeTicksCount==0) {
			_gaugeObj.ticks.count = _gaugeTicksCount;
		}
		_gaugeObj.ticks.color = 'rgba(0, 0, 0, 0)';
		_gaugeObj.range.color = 'rgba(0, 0, 0, 0)';
		_gaugeObj.showAlerts = true;
		_gaugeObj.config = _gaugeConfig;
		_gaugeObj.init();
	}
	else if (_gaugeType=="justGauge") {
		if (_mapComponents.contains(_gaugeConfig.id)) {
			_gaugeObj = _mapComponents.get(_gaugeConfig.id);
		}
		else {
			_gaugeConfig["title"] = "";
			_gaugeConfig["showMinMax"] = _gaugeConfig["showTicks"];
			_gaugeConfig["shadowOpacity"] = 1;
			_gaugeConfig["shadowSize"] = 0;
			_gaugeConfig["shadowVerticalOffset"] = 12;
			_gaugeConfig["value"] = 0;
			_gaugeObj = new JustGage(_gaugeConfig);
		}
	}
	
	//add the gauge to the map
	_mapConfigs.put(_gaugeConfig.id, _gaugeConfig);
	_mapComponents.put(_gaugeConfig.id, _gaugeObj);
	
	//close the dialog
	hideNewComponentDialog();
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
	_minVal = _compConfig.min;
	_maxVal = _compConfig.max;
	
	//get a random value
	_randVal = getRandomInt(_minVal,_maxVal);
	
	//return the method's value
	return _randVal;
}

function updateGaugeValue(_compId,_newValue) {
	//declare locals
	var _compObj = getComponentObject(_compId);
	var _compConfig = getComponentConfig(_compId);
	var _gaugeType = null;
	
	//check for nulls
	if (isNaN(_newValue)) {
		return;
	}
	
	//check for nulls
	if (_compConfig==null) {
		return;
	}
	
	//get the gauge's type
	_gaugeType = _compConfig["gaugeType"];
	
	//check the gauge's type
	switch (_gaugeType) {
		case "jGaugeDefault":
		case "jGaugeTaco":
			_compObj.setValue(_newValue);
			break;
		case "justGauge":
			_compObj.refresh(_newValue);
			break;
	}
}

function loadTelemetryDataFile(_compId) {
	//declare locals
	var _fileUrl = "pcperf.js";
	var _onsuccess = telemetryDataFileLoaded;
	
	//load the data file
	loadFile(_fileUrl, _onsuccess, _compId);
}

function telemetryDataFileLoaded(_fileContents,_compId) {
	//declare locals
	var _telemetryData = eval(_fileContents);
	var _size = _telemetryData.length;
	var _item = null;
	var _msg = "";
	var _methodName = "telemetryDataFileLoaded(): ";
	
	//loop through the data
	for (var i=0;i<_size;i++) {
		//get the current item
		_item = _telemetryData[i];
		
		//get the item's data
		_msg += "\ncomputerName: [" + _item.computerName + "]";
		_msg += "\ncpu: [" + _item.cpu + "]";
		_msg += "\ntotalMemory: [" + _item.totalMemory + "]";
		_msg += "\nmemoryUsage: [" + _item.memoryUsage + "]";
		
		//show the data
		alert(_methodName + _msg);
		//update the gauge
		updateGaugeValue(_compId, parseInt(_item.cpu));
	}
}

function refreshGaugeWithTelemetryData(_compId) {
	//declare locals
	let _newValue = "";
	let urlElemId = getDataSourceUrlElementId();
	let urlElemVal = document.getElementById(urlElemId).value;
	let respKeyId = getResponseMeasureKeyElementId();
	let respKeyVal = document.getElementById(respKeyId).value;

	//check for valid values
	if (Utils.isEmpty(urlElemVal) || Utils.isEmpty(respKeyVal)) {
		_newValue = getRandomIntPerGauge(_compId);
		//update the gauge
		updateGaugeValue(_compId, _newValue);
	}
	else {
		//send an ajax request to the url, and get the response
		sendAjax(urlElemVal, telemetry_Onsuccess, _compId);
	}
}

function telemetry_Onsuccess(response, _compId) {
	let jsonResp = JSON.parse(response);
	let respKeyId = getResponseMeasureKeyElementId();
	let respKeyVal = document.getElementById(respKeyId).value;
	let footerElem = document.getElementById("footer");
	footerElem.innerHTML = "respKeyVal=[" + respKeyVal + "]\n" + response;
	_newValue = jsonResp[respKeyVal];
	_newValue = parseInt(_newValue) / 1000;
	//update the gauge
	updateGaugeValue(_compId, _newValue);
}

function sendAjax(_url, _onsuccess, _onsuccessParam) {
	//declare locals
	var _request = null;
	
	//check for nulls
	if (_url==null || _url=="") {
		//do nothing
		return null;
	}
	
	//get an HTTP Request object
	_request = getHttpRequest();
	
	//check the request's state
	_request.OnReadyStateChange = function() {
		if (_request.readyState == 4) {
			if (_request.status == 200 || _request.status == 304) {
				//declare locals
				var _contents = _request.responseText;
				
				//check for an _onsuccess parameter
				if (_onsuccess!=null && _onsuccess!="undefined") {
					//invoke the onsuccess method
					if ((typeof _onsuccess)=="function") {
						_onsuccess(_contents, _onsuccessParam);
					}
					else if ((typeof _onsuccess)=="string"){
						eval(_onsuccess+"("+_contents+", '"+_onsuccessParam+"')");
					}
				}
			}
			else {
				alert('XML request error: ' + _request.statusText + ' (' + _request.status + ')');
			}
		}
	};
	
	//send the request
	_request.open('GET', _url, true);
	_request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	_request.setRequestHeader("Host", "ngapps.harel-group.co.il");
	_request.setRequestHeader("Origin", "ngapps.harel-group.co.il");
	_request.setRequestHeader("Referer", "https://ngapps.harel-group.co.il");
	
	try {
		_request.send(null);
	}
	catch(err) {
		//alert("An error occurred while trying to send ajax request to: [" + _url + "]");
	}
}

