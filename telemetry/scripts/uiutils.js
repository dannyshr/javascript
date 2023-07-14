
function alignComponent(_compId,_alignTo,_alignment,_alignLeft,_adjustTop) {
	//declare locals
	var _compObj = null;
	var _alignToComp = null;
	var _alignToTop = 0;
	var _alignToLeft = 0;
	var _alignToHeight = 0;
	var _alignToWidth = 0;
	var _compTop = 0;
	var _compLeft = 0;
	var _compHeight = 0;
	var _compWidth = 0;
	var _newTop = 0;
	var _newLeft = 0;
	var _winHeight = 0;
	var _winWidth = 0;
	var _debugMessage = null;
	var _adjustToTop = _adjustTop;
	
	//check for nulls
	if (_compId==null 
		|| _alignTo==null 
		|| _alignment==null) {
		return;
	}
	
	//check for valid components
	_compObj = document.getElementById(_compId);
	_alignToComp = document.getElementById(_alignTo);
	if (_compObj==null || _alignToComp==null) {
		return;
	}
	
	//set defaults if necessary
	if (_adjustToTop==null || _adjustToTop=="undefined" || _adjustToTop=="") {
		_adjustToTop = false;
	}
	else if (_adjustToTop==true) {
		_adjustToTop = true;
	}
	
	//init variables
	_winHeight = $(window).height();
	_winWidth = $(window).width();
	_alignToHeight = $("#"+_alignTo).height();
	_alignToWidth = $("#"+_alignTo).width();
	_alignToTop = $("#"+_alignTo).position().top;
	_alignToLeft = $("#"+_alignTo).position().left;
	_compHeight = $("#"+_compId).height();
	_compWidth = $("#"+_compId).width();
	_compTop = $("#"+_compId).position().top;
	_compLeft = $("#"+_compId).position().left;
	
	//render a debug message
	_debugMessage = "_alignComponent():";
	_debugMessage += "\n_alignTo=["+_alignTo+"]";
	_debugMessage += "\n_alignment=["+_alignment+"]";
	_debugMessage += "\n_lignToHeight=["+_alignToHeight+"]";
	_debugMessage += "\n_alignToWidth=["+_alignToWidth+"]";
	_debugMessage += "\n_alignToTop=["+_alignToTop+"]";
	_debugMessage += "\n_alignToLeft=["+_alignToLeft+"]";
	_debugMessage += "\n_compHeight=["+_compHeight+"]";
	_debugMessage += "\n_compWidth=["+_compWidth+"]";
	_debugMessage += "\n_compTop=["+_compTop+"]";
	_debugMessage += "\n_compLeft=["+_compLeft+"]";
	//alert(_debugMessage);
	
	//check the alignment
	switch (_alignment.toLowerCase()) {
		case "top":
			_newTop = _alignToTop - _compHeight;
			_newLeft = _alignToLeft;
			break;
		case "bottom":
			_newTop = _alignToTop + _alignToHeight;
			_newLeft = _alignToLeft;
			break;
		case "left":
			_newTop = _alignToTop;
			_newLeft = _alignToLeft - _compWidth;
			break;
		case "right":
			_newTop = _alignToTop;
			_newLeft = _alignToLeft + _alignToWidth;
			break;
		case "overlay":
			_newTop = _alignToTop;
			_newLeft = _alignToLeft;
			_compHeight = _alignToHeight;
			_compWidth = _alignToWidth;
			$("#"+_compId).css('height',_compHeight+"px");
			$("#"+_compId).css('width',_compWidth+"px");
			//fix the top if necessary
			var _parent = _compObj.parentNode;
			if (_parent.nodeName.toUpperCase()=="TD") {
				if (_adjustToTop==true) {
					_newTop += 9;
				}
			}
			break;
	}

	//fix values if necessary
	if (_newLeft < 0) {
		_newLeft = 0;
	}
	if ((_newLeft+_compWidth) > _winWidth) {
		_newLeft = _winWidth - _compWidth;
	}
	if (_newTop < 0) {
		_newTop = 0;
	}
	if ((_newTop+_compHeight) > _winHeight) {
		_newTop = _winHeight - _compHeight;
	}
	
	//set the component's position
	$("#"+_compId).css('top',_newTop);
	if (_alignLeft==true) {
		$("#"+_compId).css('left',_newLeft);
	}
	$("#"+_compId).css('position',"absolute");
};

function centerComponent(_compId) {
	//declare locals
	var winHeight = $(window).height();
	var winWidth = $(window).width();
	var compHeight = $("#"+_compId).height();
	var compWidth = $("#"+_compId).width();
	var compLeft = (winWidth-compWidth)/2;
	var compTop = (winHeight-compHeight)/2;
	$("#"+_compId).css('position','absolute');
	$("#"+_compId).css('left',compLeft+'px');
	$("#"+_compId).css('top',compTop+'px');
}

function isComponentHidden(_compId) {
	//declare locals
	var _display = null;
	var _retVal = false;
	
	//get the attribute's value
	_display = $("#"+_compId).css("display");
	
	//check the value
	if (_display!=null && _display.toLowerCase()=="hidden") {
		_retVal = true;
	}
	
	//return the method's value
	return _retVal;
}

function showComponent(_compId) {
	$("#"+_compId).show("fadeIn");
}

function hideComponent(_compId) {
	$("#"+_compId).hide("fadeOut");
}

function startMonitor(_methodName,_methodParam,_interval) {
	//declare locals
	var DEFAULT_INTERVAL = 500;
	var interval = _interval;
	var method = null;
	var intId = null;
	
	//set defaults if necessary
	if (interval==null) {
		interval = DEFAULT_INTERVAL;
	}
	
	//build the method variable
	method = _methodName+"(";
	if (_methodParam!=null && _methodParam!="undefined" && _methodParam!="") {
		method += "'" + _methodParam + "'";
	}
	method += ")";
	
	//create a new interval
	intId = window.setInterval(method,interval);
	
	//return the method's value
	return intId;
}

function stopMonitor(_intervalId) {
	//check for nulls
	if (_intervalId!=null) {
		//clear the interval
		window.clearInterval(_intervalId);
	}
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getHttpRequest() {
	//check the browser's type
	if ( window.XMLHttpRequest ) {
		//Gecko
		return new XMLHttpRequest();
	}
	else if ( window.ActiveXObject ) { 
		//IE
		return new ActiveXObject("MsXml2.XmlHttp");
	}
}

function loadFile(_fileUrl, _onsuccess, _onsuccessParam) {
	//declare locals
	var _request = null;
	
	//check for nulls
	if (_fileUrl==null || _fileUrl=="") {
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
						_onsuccess(_contents,_onsuccessParam);
					}
					else if ((typeof _onsuccess)=="string"){
						eval(_onsuccess+"("+_contents+","+_onsuccessParam+")");
					}
				}
			}
			else {
				alert('XML request error: ' + _request.statusText + ' (' + _request.status + ')');
			}
		}
	};
	
	//send the request
	_request.open('GET', _fileUrl, true);
	try {
		_request.send(null);
	}
	catch(err) {
		//do something
	}
}

