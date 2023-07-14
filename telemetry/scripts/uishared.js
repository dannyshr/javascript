
function renderHeader() {
	//declare locals
	var _containerId = "mainHeader";	
	var _containerObj = null;
	var _html = "";
	
	//get elements by their ids
	_containerObj = document.getElementById(_containerId);
	
	//check for nulls
	if (_containerObj==null) {
		return;
	}
	
	//build the html
	_html += '<table border="0" class="headerContainer" cellspacing="0" cellpadding="0">';
	_html += '<tr>';
	_html += '<td class="langsCol">';
	_html += '<select id="cmbLangs" size="1" value="en_us" title="" onchange="changeLanguage();" >';
	_html += '<option id="opt_en_us" value="en_us"></option>';
	_html += '<option id="opt_es" value="es"></option>';
	_html += '<option id="opt_he" value="he"></option>';
	_html += '</select>';
	_html += '</td>';
	_html += '<td class="btnNewCol">';
	_html += '<img id="imagePlus" src="images/plus.png" class="button" title="" onclick="showNewComponentDialog();" />';
	_html += '</td>';
	_html += '<td class="headerTextCol">';
	_html += '<span id="pageHeaderText" class="headerText"></span>';
	_html += '</td>';
	_html += '</tr>';
	_html += '</table>';
	
	//render the html
	_containerObj.innerHTML = _html;
}

function renderPageTable() {
	//declare locals
	var _containerId = "dataContainer";	
	var _containerObj = null;
	var _html = "";
	var _numRows = getNumRows();
	var _numCols = getNumColsPerRow();
	var _rowIdPrefix = getPageTableRowIdPrefix();
	var _colIdPrefix = getPageTableCellIdPrefix();
	
	//get elements by their ids
	_containerObj = document.getElementById(_containerId);
	
	//check for nulls
	if (_containerObj==null) {
		return;
	}
	
	//build the html
	_html += '<table border="0" class="dataContainerTable" cellspacing="0" cellpadding="0">';
	
	//loop through the rows
	for (var i=0;i<_numRows;i++) {
		//render a row
		_html += '<tr>';
		
		//loop through the cols
		for (var j=0;j<_numCols;j++) {
			//render a row
			_html += '<td id="' + (_rowIdPrefix+(i+1)+_colIdPrefix+(j+1)) + '">';
			_html += '</td>';
		}
		_html += '</tr>';
	}
	_html += '</table>';
	
	//render the html
	_containerObj.innerHTML = _html;
}

function renderNewCompDialog() {
	//declare locals
	var _containerId = getNewComponentDialogId();	
	var _props = null;
	var _html = "";
	
	//get elements by their ids
	_containerObj = document.getElementById(_containerId);
	
	//check for nulls
	if (_containerObj==null) {
		return;
	}
	
	//build the html
	_html += '<table border="0" rules="all" class="dlgNewCompTable" cellspacing="0" cellpadding="0">';
	
	//render a header row
	_html += '<tr class="dlgNewCompHeaderRow">';
	_html += '<td class="dlgNewCompHeaderTextCol" colspan="2">';
	_html += '<span id="dlgNewCompTableHeader" class="dlgNewCompHeaderRowText"></span>';
	_html += '</td>';
	_html += '<td class="dlgNewCompHeaderBtnCloseCol">';
	_html += '<img id="dlgNewCompBtnClose" type="button" class="dlgNewCompBtnClose" src="images/buttonClose.png" title="" onclick="hideNewComponentDialog();"/>';
	_html += '</td>';
	_html += '</tr>';
	
	//get the properties
	_props = getComponentProperties();
	
	//render rows from properties
	_html += renderRowsFromProperties(_props);
	
	//render a footer button row
	_html += '<tr>';
	_html += '<td colspan="3" class="dlgNewCompBtnCreateCol">';
	_html += '<input id="dlgNewCompBtnCreate" type="button" class="button" title="" value="" onclick="createNewComponent();" />';
	_html += '</td>';
	_html += '</tr>';
	_html += '</table>';
	
	//render the html
	_containerObj.innerHTML = _html;
	
	//center the dialog
	centerComponent(_containerId);
}

function getNumRows() {
	return 3;
}

function getNumColsPerRow() {
	return 3;
}

function getPageTableRowIdPrefix() {
	return "row";
}

function getPageTableCellIdPrefix() {
	return "col";
}

function renderRowsFromProperties(_props) {
	//declare locals
	var _currProp = null;
	var _currPropName = null;
	var _currPropType = null;
	var _currPropDefaultValue = null;
	var _currPropReadOnly = null;
	var _currPropChecked = null;
	var _currPropValues = null;
	var _html = "";
	var _readonly = "";
	var _htmlCompIdPrefix = getNewComponentDialogId();
	var _htmlCompId = "";
	var _htmlComp = "";
	var _classTextbox = "dlgNewCompTextbox";
	var _classCombobox = "dlgNewCompCombobox";
	var _classCheckbox = "dlgNewCompCheckbox";
	var _classCheckboxList = "dlgNewCompCheckboxList";
	var _classLabelCol = "dlgNewCompLabelCol";
	var _classValueCol = "dlgNewCompValueCol";
	
	//check for nulls
	if (_props==null || _props.length<1) {
		return _html;
	}
	
	//loop through the props
	for (var i=0;i<_props.length;i++) {
		//reset some value
		_htmlCompId = "";
		_htmlComp = "";
		_readonly = "";
		
		//get the current property
		_currProp = _props[i];
		
		//get the property's name, type, and other attributes
		_currPropName = _currProp.name;
		_currPropType = _currProp.type;
		_currPropDefaultValue = _currProp.defaultValue;
		_currPropReadOnly = _currProp.readonly;
		
		//check the readonly
		if (_currPropReadOnly==true) {
			_readonly = 'readonly="readonly"';
		}
		
		//render the row
		_html += '<tr>';
		
		//get the html component's id
		_htmlCompId = _htmlCompIdPrefix + _currPropName;
		
		//check the type
		switch (_currPropType) {
			case "int":
				_currPropDefaultValue = parseInt(_currPropDefaultValue);
				_htmlComp = '<input id="' + _htmlCompId + '" type="text" class="' + _classTextbox + '" value="' + _currPropDefaultValue + '" ' + _readonly + '/>';
				break;
			case "password":
				_htmlComp = '<input id="' + _htmlCompId + '" type="password" class="' + _classTextbox + '" value="' + _currPropDefaultValue + '" ' + _readonly + '/>';
				break;
			case "string":
				_htmlComp = '<input id="' + _htmlCompId + '" type="text" class="' + _classTextbox + '" value="' + _currPropDefaultValue + '" ' + _readonly + '/>';
				break;
			case "boolean":
				if (_currPropDefaultValue.toLowerCase()=="true") {
					_currPropChecked = 'checked="checked"';
					_currPropDefaultValue = "true";
				}
				else {
					_currPropChecked = "";
					_currPropDefaultValue = "false";
				}
				_htmlComp = '<input id="' + _htmlCompId + '" type="checkbox" class="' + _classCheckbox + '" ' + _currPropChecked + ' value="' + _currPropDefaultValue + '"' + _readonly + '/>';
				break;
			case "booleanlist":
				_htmlComp = renderBooleanListRow(_currProp,_classCheckboxList);
				break;
			case "list":
				_currPropValues = _currProp.values;
				_htmlComp += '<select id="' + _htmlCompId + '" size="1" class="' + _classCombobox + '" value="' + _currPropDefaultValue + '" ' + _readonly + '/>';
				//loop through the values
				for (var j=0;j<_currPropValues.length;j++) {
					//render an option
					_htmlComp += '<option value="' + _currPropValues[j] + '"';
					if (_currPropValues[j]==_currPropDefaultValue) {
						_htmlComp += ' selected="selected"';
					}
					_htmlComp += '>';
					_htmlComp += _currPropValues[j];
					_htmlComp += '</option>';
				}
				_htmlComp += '</select>';
				break;
		}
		
		//render a label column		
		_html += '<td class="' + _classLabelCol + '">';
		_html += '<label id="' + _htmlCompIdPrefix + 'Lbl_' + _currPropName + '" for="' + _htmlCompId + '">' + _currPropName + '</label>';
		_html += '</td>';
		_html += '<td class="' + _classValueCol + '" colspan="2">';
		_html += _htmlComp;
		_html += '</td>';
		_html += '</tr>';
	}
	
	//return the method's value
	return _html;
}

function renderBooleanListRow(_prop,_className) {
	//declare locals
	var _currPropName = null;
	var _currPropDefaultValue = null;
	var _currPropReadOnly = null;
	var _currPropChecked = null;
	var _currPropValues = null;
	var _html = "";
	var _readonly = "";
	var _htmlCompIdPrefix = getNewComponentDialogId();
	var _htmlCompId = "";
	var _htmlCompIdInner = "";
	var _keyValueDelimiter = ":";
	var _arrKeyVal = null;
	var _lblIdSuffix = null;
	var _lblId = null;
	var _translate = false;
	
	//check for nulls
	if (_prop==null) {
		return _html;
	}
	
	//get the property's name, type, and other attributes
	_currPropName = _prop.name;
	_currPropType = _prop.type;
	_currPropDefaultValue = _prop.defaultValue;
	_currPropReadOnly = _prop.readonly;
	_currPropValues = _prop.values;
	
	//check for required values
	if (_currPropName==null || _currPropValues==null || _currPropValues.length<1) {
		return _html;
	}
	
	//set the component's attributes
	_htmlCompId = _htmlCompIdPrefix + _currPropName;
	if (_currPropReadOnly==true) {
		_readonly = 'readonly="readonly"';
	}
	if (_currPropDefaultValue.toLowerCase()=="true") {
		_currPropChecked = 'checked="checked"';
		_currPropDefaultValue = "true";
	}
	else {
		_currPropChecked = "";
		_currPropDefaultValue = "false";
	}
	
	//render the html
	_html += '<table border="0" cellpadding="0" cellspacing="0">';
	_html += '<tr>';
	_html += '<td class="topAlignedCol">';
	_html += '<input id="' + _htmlCompId + '" type="checkbox" class="' + _className + '" ' + _currPropChecked + ' value="' + _currPropDefaultValue + '"' + _readonly + '/>';
	_html += '</td>';
	_html += '<td id="' + _htmlCompIdPrefix + '_cbList" class="' + _htmlCompIdPrefix + '_cbList">';
	_html += '<table border="0" cellpadding="0" cellspacing="0">';
	//loop through the values
	for (var i=0;i<_currPropValues.length;i++) {
		//parse the value
		_arrKeyVal = _currPropValues[i].split(_keyValueDelimiter);
		
		//check for valid values
		if (_arrKeyVal==null || _arrKeyVal.length<1) {
			continue;
		}
		_lblIdSuffix = _arrKeyVal[0];
		
		//check for a translate flag
		if (_arrKeyVal.length>1) {
			_translate = _arrKeyVal[1];
			if (_translate!=null && _translate=="true") {
				_translate = true;
			}
			else {
				_translate = false;
			}
		}
		
		//get the inner component's id
		_htmlCompIdInner = _htmlCompIdPrefix + _lblIdSuffix;
		if (_translate) {
			_lblId = _htmlCompIdPrefix + 'Lbl_' +  _lblIdSuffix;
		}
		else {
			_lblId = 'lbl_' + _htmlCompIdPrefix + _lblIdSuffix;
		}
		
		//render a row
		_html += '<tr>';
		_html += '<td class="dlgNewCompLabelCol">';
		_html += '<label id="' + _lblId + '" for="' + _htmlCompIdInner + '">';
		if (!_translate) {
			_html += _lblIdSuffix;
		}
		_html += '</label>';
		_html += '</td>';
		_html += '<td>';
		_html += '<input id="' + _htmlCompIdInner + '" type="checkbox" class="' + _className + '" ' + _currPropChecked + ' value="' + _currPropDefaultValue + '"' + _readonly + '/>';
		_html += '</td>';
		_html += '</tr>';
	}
	_html += '</table>';
	_html += '</td>';
	_html += '</tr>';
	_html += '</table>';
	
	//return the method's value
	return _html;
}

function recenterNewCompDialog() {
	//declare locals
	var _containerId = getNewComponentDialogId();	
	
	//center the dialog
	try {
		centerComponent(_containerId);
	}
	catch(ex) {}
}

function getNextCompNumber() {
	//declare locals
	var _idPrefix = getCompIdPrefix();
	var _tagName = "div";
	var _arrElements = null;
	var _currElemId = null;
	var _compNumber = 0;
	var _compNumberLast = 0;
	var _nextElemNum = 0;
	
	//get elements by tag name
	_arrElements = document.getElementsByTagName(_tagName);
	
	//check for nulls
	if (_arrElements==null || _arrElements.length<1) {
		return null;
	}
	
	//loop through the elements
	for (var i=0;i<_arrElements.length;i++) {
		//get the current element's id
		_currElemId = _arrElements[i].id;
		
		//check for nulls
		if (_currElemId==null) {
			continue;
		}
		
		//check for a valid class name
		if (isValidComponent(_arrElements[i])) {
			//compare it with the prefix
			if (_currElemId.indexOf(_idPrefix)>-1) {
				//get the current component's number
				_compNumber = parseInt(_currElemId.substring(_currElemId.indexOf(_idPrefix)+_idPrefix.length));
				if ((_compNumber-_compNumberLast)==1) {
					_compNumberLast = _compNumber;
				}
				else {
					break;
				}
			}
		}
	}
	
	//get the new id
	_nextElemNum = (++_compNumberLast);
	
	//return the method's value
	return _nextElemNum;
}

function generateUniqueCompId() {
	//declare locals
	var _idPrefix = getCompIdPrefix();
	var _newElemNum = getNextCompNumber();
	var _newElemId = null;
	
	//create a unique id
	_newElemId = _idPrefix + _newElemNum;
	
	//return the method's value
	return _newElemId;
}

function showNewComponentDialog() {
	//declare locals
	var _dlgId = getNewComponentDialogId();
	var _htmlCompId = null;
	var _newElemNum = 0;
	var _maxElems = 0;
	var _errMsgKey = "dlgNewComponent.message.maxLimit";
	var _params = new Array();
	
	//get the number of the next element
	_newElemNum = getNextCompNumber();
	
	//get the max number of allowed elements
	_maxElems = (getNumRows() * getNumColsPerRow());
	
	//check the limit
	if (_newElemNum > _maxElems) {
		_params.push(_maxElems);
		alert(translate(_errMsgKey,_params));
		return;
	}
	
	//get the html component's id
	_htmlCompId = _dlgId + "id";
	
	//set the id
	document.getElementById(_htmlCompId).value = generateUniqueCompId();
	
	//show the dialog
	showComponent(_dlgId);
}

function hideNewComponentDialog() {
	//declare locals
	var _dlgI = getNewComponentDialogId();
	hideComponent(_dlgI);
}

function getCompContainerCellId(_compNum) {
	//declare locals
	var _containerId = null;
	var _numRows = getNumRows();
	var _numCols = getNumColsPerRow();
	var _rowIdPrefix = getPageTableRowIdPrefix();
	var _colIdPrefix = getPageTableCellIdPrefix();
	var _rowNum = 0;
	var _colNum = 0;
	
	//get the row and col numbers
	if (_compNum<=_numCols) {
		_rowNum = 1;
	}
	else {
		if ((_compNum % _numRows)==0) {
			_rowNum = Math.floor(_compNum / _numRows);
		}
		else {
			_rowNum = (Math.floor(_compNum / _numRows) + 1);
		}
	}
	_colNum = (_compNum % _numRows);
	if (_colNum==0) {
		if (_compNum > _numCols) {
			_colNum = _numCols;
		}
		else {
			_colNum = _compNum;
		}
	}
	
	//set the container id
	_containerId = _rowIdPrefix + _rowNum + _colIdPrefix + _colNum;
	
	//return the method's value
	return _containerId;
}

function removeComponent(_compId, _containerId, _elemToRemoveId) {
	//declare locals
	var _containerObj = null;
	var _elemToRemoveObj = null;
	
	//check for nulls
	if (_compId==null || _containerId==null || _elemToRemoveId==null) {
		return;
	}
	//get elements by their id
	_containerObj = document.getElementById(_containerId);
	_elemToRemoveObj = document.getElementById(_elemToRemoveId);
	
	//check for nulls
	if (_containerObj==null || _elemToRemoveObj==null) {
		return;
	}
	
	//remove the child element
	_containerObj.removeChild(_elemToRemoveObj);
	
	//remove the gauge from the map
	_mapComponents.remove(_compId);
}

function getComponentObject(_compId) {
	//declare locals
	var _compObj = null;
	
	//check for nulls
	if (_compId==null) {
		return _compObj;
	}
	
	//check if the object exists in the map
	if (_mapComponents.contains(_compId)) {
		//get the object from the map
		_compObj = _mapComponents.get(_compId);
	}
	
	//return the method's value
	return _compObj;
}

function getComponentConfig(_compId) {
	//declare locals
	var _compObj = getComponentObject(_compId);
	var _compConfig = null;
	
	//check for nulls
	if (_compObj==null) {
		return _compConfig;
	}
	
	//get the object's config params
	_compConfig = _compObj.config;
	
	//return the method's value
	return _compConfig;
}

function startAutoRefresh(_compId,_methodName) {
	//declare locals
	var _compConfig = getComponentConfig(_compId);
	var _interval = 1000;
	var _intId = null;
	
	//check for nulls
	if (_compConfig==null || _methodName==null) {
		return;
	}
	
	//invoke the monitor method, and get an interval id
	_intId = startMonitor(_methodName,_compId,_interval);
	
	//save the interval into the object's config
	_compConfig["intervalId"] = _intId;
}

function stopAutoRefresh(_compId) {
	//declare locals
	var _compConfig = getComponentConfig(_compId);
	var _intId = null;
	
	//check for nulls
	if (_compConfig==null) {
		return;
	}
	
	//get the interval from the object's config
	_intId = _compConfig["intervalId"];
	
	//stop the monitor
	stopMonitor(_intId);
}

function validateNewCompForm() {
	//declare locals
	var _htmlCompIdPrefix = getNewComponentDialogId();
	var _props = null;
	var _currProp = null;
	var _currPropName = null;
	var _currPropType = null;
	var _currPropValue = null;
	var _currPropRequired = null;
	var _htmlCompId = null;
	var _isValid = true;
	var _attNameErrMsgKey = "errMsgKey";
	var _attNameErrMsgParam = "errMsgParam";
	var _errClass = "dlgNewCompTextboxError";
	var _errMsgKeyReq = "form.fieldErr.required.tooltip";
	var _errMsgKeyNumeric = "form.fieldErr.numeric.tooltip";
	var _errMsgParam = "";
	var _params = new Array();
	
	//get the properties
	_props = getComponentProperties();
	
	//loop through the props
	for (var i=0;i<_props.length;i++) {
		//get the current property
		_currProp = _props[i];
		
		//get the property's name, and type
		_currPropName = _currProp.name;
		_currPropType = _currProp.type;
		_currPropRequired = _currProp.required;
		
		//get the html component's id
		_htmlCompId = _htmlCompIdPrefix + _currPropName;
		
		//get the html component's value
		_currPropValue = document.getElementById(_htmlCompId).value;
		
		//remove any previous error class
		if ($("#"+_htmlCompId).hasClass(_errClass)) {
			$("#"+_htmlCompId).removeClass(_errClass);
		}
		$("#"+_htmlCompId).attr(_attNameErrMsgKey,"");
		$("#"+_htmlCompId).attr(_attNameErrMsgParam,"");
		$("#"+_htmlCompId).attr("title","");
		
		//set the parameter for an error message
		_errMsgParam = "dlgNewGauge.label."+_currPropName;
		
		//check if the property is required
		if (_currPropRequired && (_currPropValue==null || _currPropValue=="")) {
			if (!$("#"+_htmlCompId).hasClass(_errClass)) {
				$("#"+_htmlCompId).addClass(_errClass);
			}
			_params.push(translate(_errMsgParam));
			$("#"+_htmlCompId).attr(_attNameErrMsgKey,_errMsgKeyReq);
			$("#"+_htmlCompId).attr(_attNameErrMsgParam,_errMsgParam);
			$("#"+_htmlCompId).attr("title",translate(_errMsgKeyReq,_params));
			_isValid = false;
		}
		else {
			//set the value's type
			switch (_currPropType) {
				case "int":
					//check for a non-numeric value
					if (isNaN(_currPropValue)) {
						if (!$("#"+_htmlCompId).hasClass(_errClass)) {
							$("#"+_htmlCompId).addClass(_errClass);
						}
						_params.push(translate(_errMsgParam));
						$("#"+_htmlCompId).attr(_attNameErrMsgKey,_errMsgKeyNumeric);
						$("#"+_htmlCompId).attr(_attNameErrMsgParam,_errMsgParam);
						$("#"+_htmlCompId).attr("title",translate(_errMsgKeyNumeric,_params));
						_isValid = false;
					}
					break;
			}
		}
		
		//check the valid flag
		if (!_isValid) {
			break;
		}
	}
	
	//return the method's value
	return _isValid;
}

function changeLanguage() {
	var _langElemeId = "cmbLangs";
	switchLang(_langElemeId);
	translatePage();
}

function translatePage() {
	var _comps = getComponentsToTranslate();
	translateComponents(_comps);
}

function updateComponentInnerHtml(_compId,_html) {
	//declare locals
	var _compObj = null;
	
	//check for nulls
	if (_compId==null || _html==null || _html=="") {
		return;
	}
	
	//get elements by id
	_compObj = document.getElementById(_compId);
	
	//check for nulls
	if (_compObj==null) {
		return;
	}
	
	//update the title
	_compObj.innerHTML = _html;
}
