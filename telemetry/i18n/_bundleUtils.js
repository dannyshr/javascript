
//declare globals
var __rb = null;

function getDefaultLanguage() {
	//declare locals
	var _defaultLanguage = "en_us";
	
	//return the method's value
	return _defaultLanguage;
}

function getPageUrl() {
	//declare loclas
	var _url = null;
	
	//get the page's url
	_url = window.location.href;
	
	//return the method's value
	return _url;
}

function getQueryStringParams(_url) {
	//declare locals
	var _arrParams = null;
	var _firstDelim = "?";
	var _firstDelimIndex = -1;
	var _paramsDelim = "&";
	var _paramsDelimIndex = -1;
	var _arrParts = null;
	var _paramsPart = null;
	
	//check for nulls
	if (_url==null) {
		return null;
	}
	
	//check for a delimiter
	_firstDelimIndex = _url.indexOf(_firstDelim);
	if (_firstDelimIndex==-1) {
		return null;
	}
	
	//split the string
	_arrParts = _url.split(_firstDelim);
	
	//get the second part (with the params)
	_paramsPart = _arrParts[1];
	
	//check for a delimiter
	_paramsDelimIndex = _paramsPart.indexOf(_paramsDelim);
	if (_paramsDelimIndex==-1) {
		_arrParams = new Array(_paramsPart);
	}
	else {
		_arrParams = _paramsPart.split(_paramsDelim);
	}
	
	//return the method's value
	return _arrParams;
}

function getLanguage() {
	//declare locals
	var _currUrl = null;
	var _arrParams = null;
	var _currParam = null;
	var _paramKeyValueDelim = "=";
	var _paramKeyValueDelimIndex = -1;
	var _currParamName = null;
	var _paramName = "lang";
	var _paramValue = null;
	
	//get the page's url
	_url = getPageUrl();
	
	//get the url's query string params
	_arrParams = getQueryStringParams(_url);
	
	//check for nulls
	if (_arrParams==null || _arrParams.length<1) {
		//set the default language
		_paramValue = getDefaultLanguage();
	}
	else {
		//loop through the params
		for (var i=0;i<_arrParams.length;i++) {
			//get the current param
			_currParam = _arrParams[i];
			
			//get the param's name
			_paramKeyValueDelimIndex = _currParam.indexOf(_paramKeyValueDelim);
			if (_paramKeyValueDelimIndex!=-1) {
				_currParamName = _currParam.substring(0,_paramKeyValueDelimIndex-1);
			}
			
			//check the param's name
			if (_currParamName!=null && _currParamName==_paramName) {
				//get the parameter's value
				_paramValue = _currParam.substring(_paramKeyValueDelimIndex);
				
				//stop the loop
				break;
			}
		}
	
		//check for nulls
		if (_paramValue==null || _paramValue=="") {
			//set the default language
			_paramValue = getDefaultLanguage();
		}
	}
	
	//return the method's value
	return _paramValue;
}

function loadResourceBundleByScript(_lang) {
	//declare locals
	var _scriptElem = null;
	var _scriptElemId = "__rb";
	var _srcPrefix = "i18n/";
	var _srcSuffix = ".js";
	var _scriptSrc = null;
	var _headElem = null;

	//check for nulls
	if (_lang==null || _lang=="") {
		return;
	}
	
	//set the script's source
	_scriptSrc = _srcPrefix + _lang + _srcSuffix;
	
	//get a reference to the <head> tags
	_headElem = document.getElementsByTagName("head");
	
	//check for null
	if (_headElem==null || _headElem.length<1) {
		return;
	}
	
	//get a reference to the first <head> tag
	_headElem = _headElem[0];
	
	//try getting the element by its id
	_scriptElem = document.getElementById(_scriptElemId);
	
	//if it exists remove it
	if (_scriptElem!=null) {
		_headElem.removeChild(_scriptElem);
	}
	
	//create a new <script> element
	_scriptElem = document.createElement("script");
	
	//set the element's attributes
	_scriptElem.setAttribute("id", _scriptElemId);
	_scriptElem.setAttribute("type", "text/javascript");
	_scriptElem.setAttribute("language", "javascript");
	_scriptElem.setAttribute("src", _scriptSrc);
	
	//append the elemnt to the <head> tag
	_headElem.appendChild(_scriptElem);
}

function loadResourceBundle(_lang) {
	//declare locals
	var _currBundle = null;
	var _currBundleLang = null;
	var _currBundleKeys = null;

	//check for nulls
	if (_lang==null || _lang=="") {
		return;
	}
	
	//check for nulls
	if (__resourceBundle==null || __resourceBundle=="undefined") {
		return;
	}
	
	//loop through the bundle's languages
	for (var i=0;i<__resourceBundle.length;i++) {
		//get the current resource bundle
		_currBundle = __resourceBundle[i];
		
		//get the component's lang, and keys
		_currBundleLang = _currBundle.lang;
		_currBundleKeys = _currBundle.keys;
		
		//check for nulls
		if (_currBundleLang==null || _currBundleLang=="undefined") {
			continue;
		}
		
		//compare it with the requested language
		if (_lang==_currBundleLang) {
			//set the current resource bundle
			__rb = _currBundleKeys[0];
			//break the loop
			break;
		}
	}
}

function switchLang(_langsElemId) {
	//declare locals
	var _langsElem = null;
	var _newLang = null;
	
	//check for nulls
	if (_langsElemId==null || _langsElemId=="") {
		return;
	}
	
	//get elements by their ids
	_langsElem = document.getElementById(_langsElemId);
	
	//check for nulls 
	if (_langsElem==null) {
		return;
	}
	
	//get the new language
	_newLang = _langsElem.value;
	
	//load the new resource bundle
	loadResourceBundle(_newLang);
}

function getCompToTranslateKeyValue(_compId,_key) {
	//declare locals
	var _keyValue = null;
	var _transKey = "translate:true";
	var _attNameKey = "attName:";
	var _attNameKeyIndex = -1;
	var _attName = null;
	var _compObj = null;
	var _translateKeyValue = false;
	
	//check for nulls
	if (_compId==null || _key==null) {
		return null;
	}
	
	//check if the key should be translated
	if (_key.indexOf(_transKey)!=-1) {
		_translateKeyValue = true;
	}
	
	//check if the key contains an attribute name key
	_attNameKeyIndex = _key.indexOf(_attNameKey);
	if (_attNameKeyIndex==-1) {
		//return the key without parsing it
		_keyValue = _key;
	}
	else {
		//parse the attribute name from the key
		_attName = _key.substring(_attNameKeyIndex+_attNameKey.length);
		
		//get the attribute's value
		if (isCssSelector(_compId)) {
			//check for nulls
			if ($(_compId)==null) {
				return null;
			}
			
			//get the key's value
			_keyValue = $(_compId).attr(_attName.toLowerCase());
		}
		else {
			//get the component by its id
			_compObj = document.getElementById(_compId);
			
			//check for nulls
			if (_compObj==null) {
				return null;
			}
			
			//get the key's value
			_keyValue = _compObj.getAttribute(_attName.toLowerCase());
		}
	}
	
	//check if the value should be translated
	if (_translateKeyValue) {
		_keyValue = translate(_keyValue);
	}
	
	//return the method's value
	return _keyValue;
}

function isCssSelector(_compId) {
	//declare locals
	var compIdFirstChar = null;
	
	//check for nulls
	if (_compId==null) {
		return false;
	}
	
	//check if the id is a css selector
	compIdFirstChar = _compId.substring(0,1);
	if (compIdFirstChar=="." || compIdFirstChar=="#") {
		return true;
	}
	
	//return the method's value
	return false;
}

function translateComponents(components) {
	//declare local variables
	var currComp = null;
	var compId = null;
	var _isCssSelector = null;
	var compAtts = null;
	var compKeys = null;
	var compParams = null;
	var keyParams = null;
	var compObj = null;
	var currAtt = null;
	var currKey = null;
	var currParam = null;
	var currValue = null;
	
	//check for nulls
	if (components==null) {
		return;
	}
	
	//loop through the ids
	for (var i=0;i<components.length;i++) {
		//get the current component to translate
		currComp = components[i];
		
		//get the component's id, and attributes, and keys
		compId = currComp.id;
		compAtts = currComp.atts;
		compKeys = currComp.keys;
		compParams = currComp.params;
		
		//check if the id is a css selector
		if (compId==null) {
			continue;
		}
		
		//check for valid array lengths
		if ((compAtts==null || compAtts.length<1) || (compKeys==null || compKeys.length<1)) {
			continue;
		}
		if (compAtts.length!=compKeys.length) {
			continue;
		}
		
		//check if the id is a css selector
		_isCssSelector = isCssSelector(compId);
		if (_isCssSelector) {
			//check for nulls
			if ($(compId)==null) {
				continue;
			}
		}
		else {
			//get the component by its id
			compObj = document.getElementById(compId);
			
			//check for nulls
			if (compObj==null) {
				continue;
			}
		}
		
		//loop through the component's attributes
		for (var k=0;k<compAtts.length;k++) {
			//get the current attribute's name, and key to translate
			currAtt = compAtts[k];
			currKey = compKeys[k];
			
			//resolve the key's value if necessary
			currKey = getCompToTranslateKeyValue(compId,currKey);
			
			//check for an existing parameter
			if (compParams!=null && compParams.length>k) {
				currParam = compParams[k];
			}
			else {
				currParam = null;
			}
			if (currParam==null) {
				keyParams = null;
			}
			else {
				//resolve the param's value if necessary
				currParam = getCompToTranslateKeyValue(compId,currParam);
				keyParams = new Array(currParam);
			}
			
			//translate the attribute's key
			currValue = translate(currKey,keyParams);
			//alert("translateComponents(): compId=["+compId+"]\ncurrAtt=["+currAtt+"]\ncurrKey=["+currKey+"]\ncurrValue=["+currValue+"]");
			
			//check if the id is a css selector
			if (_isCssSelector) {
				//update the component's attribute
				if (currAtt.toLowerCase()=="class") {
					if ($(compId).hasClass(currValue+"R")) {
						$(compId).removeClass(currValue+"R");
					}
					if (!$(compId).hasClass(currValue)) {
						$(compId).addClass(currValue);
					}
				}
				else if (currAtt.toLowerCase()=="innerhtml") {
					$(compId).html(currValue);
				}
				else {
					$(compId).attr(currAtt.toLowerCase(),currValue);
				}
			}
			else {
				//update the component's attribute
				if (currAtt.toLowerCase()=="class") {
					currAtt = "className";
				}
				if (currAtt.toLowerCase()=="innerhtml") {
					compObj.innerHTML = currValue;
				}
				else {
					compObj.setAttribute(currAtt.toLowerCase(),currValue);
				}
			}
		}	
	}
}

function translate(string,params) {
	//declare locals
	var translated = null;
	var currParam = null;
	var findPatternStart = "{";
	var findPatternEnd = "}";
	var findPattern = null;
	
	//check for a resourceBundle array variable
	if (typeof(__rb)!='undefined' && __rb!=null && __rb[string]) {
		//translate the string
		translated = __rb[string];
		
		//check for params
		if (params==null || params=="undefined") {
			return translated;  
		}
		
		//check for an array type
		if (params.length>0) {
			//loop through the parameters
			for (var i=0;i<params.length;i++) {
				//get the current param
				currParam = params[i];
				
				//replace the pattern in the translated string
				findPattern = findPatternStart+i+findPatternEnd;
				if (translated.indexOf(findPattern)>-1) {
					translated = translated.replace(findPattern,currParam);
				}
			}
		}
		
		//return the string's translation
		return translated;  
	}
	
	//return the string with a note that it is NOT translated
	return "!!!"+string+"!!!";  
}

