if(!this.Jul){
	this.Jul={};
}

(function ($) {
    'use strict';
    $.fn.characterCounter = function () {
        return this.each(function (index, item) {
            $(item).keyup(function updateCharCounter() {
                var $me = $(this);
                var maxLength = 0;
                var text = $me.attr('helpertext');
                if ($me.attr('data-length')==null || $me.attr('data-length')=="undefined") {
                    maxLength = parseInt($me.attr('maxlength'), 10);
                }
                else {
                    maxLength = parseInt($me.attr('data-length'), 10);
                }
                var charCount = $me.val().length;
                var $counter = $me.siblings('.character-counter');
                if (text==null || text=="undefined") {
                	text = (maxLength - charCount) + '/' + maxLength;
                }
                else {
                	text = (maxLength - charCount) + '/' + maxLength;
                }
                $counter.text(text);
            });
        });
    };
    
})(jQuery);

(function(){
	if(typeof Jul.getTheme!=='function') {
		Jul.getTheme=function(json) {
			if (!Jul.isString(json.theme)) {
				return "teal";
			}
			else {
				return json.theme;
			}
		};
	}
	
	if(typeof Jul.getPreloaderDisplayType!=='function') {
		Jul.getPreloaderDisplayType=function(json) {
			//declare locals
			var defaultValue = "spinner";
			if (!Jul.isString(json.displayType)) {
				return defaultValue;
			}
			else {
				if (json.displayType.toLowerCase()!="spinner" && json.displayType.toLowerCase()!="linear") {
					return defaultValue;
				}
				else {
					return json.displayType.toLowerCase();
				}
			}
		};
	}
	
	if(typeof Jul.getModalButtonsPosition!=='function') {
		Jul.getModalButtonsPosition=function(json) {
			//declare locals
			var defaultValue = "footer";
			if (!Jul.isString(json.buttons_position)) {
				return defaultValue;
			}
			else {
				if (json.buttons_position.toLowerCase()!="header" && json.buttons_position.toLowerCase()!="footer") {
					return defaultValue;
				}
				else {
					return json.buttons_position.toLowerCase();
				}
			}
		};
	}
	
	if(typeof Jul.gePleasewaitWrapper!=='function') {
		Jul.gePleasewaitWrapper=function() {
			return "_pwwrapper";
		};
	}
	
	if(typeof Jul.setModalHeader!=='function') {
		Jul.setModalHeader=function(modalid,header) {
			var domid = modalid + Jul.getModalHeaderSuffix();
			if (Jul.isInDom(domid)) {
				Jul.getFromDom(domid).innerHTML = header;
			}
		};
	}
	
	if(typeof Jul.getModalHeaderSuffix!=='function') {
		Jul.getModalHeaderSuffix=function() {
			return "_modal_header";
		};
	}
	
	if(typeof Jul.getModalContentSuffix!=='function') {
		Jul.getModalContentSuffix=function() {
			return "_modal_content";
		};
	}
	
	if(typeof Jul.getModelKey!=='function') {
		Jul.getModelKey=function() {
			return "model";
		};
	}
	
	if(typeof Jul.getRefModelAttributeName!=='function') {
		Jul.getRefModelAttributeName=function() {
			return "refmodel";
		};
	}
	
	if(typeof Jul.getComponentKey!=='function') {
		Jul.getComponentKey=function() {
			return "id";
		};
	}
	
	if(typeof Jul.getAttributeKey!=='function') {
		Jul.getAttributeKey=function() {
			return "name";
		};
	}
	
	if(typeof Jul.getHtmlComponentKey!=='function') {
		Jul.getHtmlComponentKey=function() {
			return "tag";
		};
	}
	
	if(typeof Jul.getMaterializeComponentKey!=='function') {
		Jul.getMaterializeComponentKey=function() {
			return "name";
		};
	}
	
	if(typeof Jul.body!=='function') {
		Jul.body=function() {
			return "body";
		};
	}
	
	if(typeof Jul.getSwitchCBPrefix!=='function') {
		Jul.getSwitchCBPrefix=function() {
			return "cb_";
		};
	}
	
	if(typeof Jul.getSwitchValue!=='function') {
		Jul.getSwitchValue=function(domid) {
			//declare locals
			var cbid = null;
			var value = false;
			
			//check for valid values
			if (Jul.isInDom(domid)) {
				return value;
			}
			
			//check for valid values
			cbid = Jul.getSwitchCBPrefix + domid;
			if (!Jul.isInDom(cbid)) {
				return value;
			}
			
			//get the value
			value = Jul.getFromDom(cbid).checked;
			
			return value;
		};
	}
	
	if(typeof Jul.isArray!=='function'){
		Jul.isArray=function(obj) {
			//check for valid values
			if (obj==null || obj==undefined || obj=="undefined" || obj=="") {
				return false;
			}
			
			//check for valid values
			if ((typeof obj == "string") || (typeof obj == "function") || (typeof obj == "number")) {
				return false;
			}
			
			//check for a valid array
			if (obj.length && obj.length>0) {
				return true;
			}
			
			//return the method's value
			return false;
		};
	}
	
	if(typeof Jul.isString!=='function'){
		Jul.isString=function(obj) {
			//declare locals
			var isValid = false;
			
			//check for valid values
			if (obj==null || obj==undefined || obj=="undefined") {
				return false;
			}
			
			isValid = (typeof obj == "string");
			if (isValid===true) {
				if (obj.trim().length<1) {
					return false;
				}
			}
	
			//return the method's value
			return isValid;
		};
	}
	
	if(typeof Jul.isNumeric!=='function'){
		Jul.isNumeric=function(obj) {
			//check for a numeric value
			if (typeof obj == "number") {
				return true;
			}
			
			//check for a numeric value
			if (typeof obj == "string") {
				return !(isNaN(Number(obj)));
			}
			
			//return the method's value
			return false;
		};
	}
	
	if(typeof Jul.isEmpty!=='function'){
		Jul.isEmpty=function(obj) {
			//check for valid values
			if (obj==null || obj==undefined || obj=="undefined") {
				return true;
			}
			
			//check the type of the object
			if (typeof obj == "string") {
				if (obj.trim().length<1) {
					return true;
				}
			}
			if (Jul.isArray(obj)) {
				if (!obj.length || obj.length<1) {
					return true;
				}
			}
			
			//return the method's value
			return false;
		};
	}
	
	if(typeof Jul.isJson!=='function'){
		Jul.isJson=function(json) {
			//declare locals
			var valid = false;
			
			//check for valid values
			if (Jul.isEmpty(json)) {
				return false;
			}
			
			//check for valid values
			if (typeof(json)=="string") {
				try {
					JSON.parse(json);
					valid = true;
				}
				catch(err) {
					valid = false;
				}
			}
			else if (typeof(json)=="object") {
				try {
					JSON.stringify(json);
					valid = true;
				}
				catch(err) {
					valid = false;
				}
			}
			
			//return the method's value
			return valid;
		};
	}

	if(typeof Jul.isTrue!=='function'){
		Jul.isTrue=function(obj) {
			if (!Jul.isEmpty(obj)) {
				if (obj===true || (Jul.isString(obj) && obj.toLowerCase()=="true")) {
					return true;
				}
			}
			
			//return the method's value
			return false;
		};
	}
	
	if(typeof Jul.isInDom!=='function'){
		Jul.isInDom=function(domId) {
			//declare locals
			var domObj = null;
			
			//check for valid values
			if (!Jul.isString(domId)) {
				return false;
			}
			if (domId.toLowerCase()=="body") {
				return true;
			}
			
			//get the element by its id
			domObj = document.getElementById(domId);
			
			//check for valid values
			if (Jul.isEmpty(domObj)) {
				return false;
			}
			
			//return the method's value
			return true;
		};
	}

	if(typeof Jul.getFromDom!=='function'){
		Jul.getFromDom=function(domId) {
			//declare locals
			var domObj = null;
			
			//check for nulls
			if (!Jul.isInDom(domId)) {
				return null;
			}
			if (domId.toLowerCase()=="body") {
				return document.body;
			}
			
			//get elements by id
			domObj = document.getElementById(domId);
			
			//return the method's value
			return domObj;
		};
	}

	if(typeof Jul.getDomValue!=='function'){
		Jul.getDomValue=function(domId) {
			//declare locals
			var domObj = null;
			
			//check for nulls
			if (!Jul.isInDom(domId)) {
				return "";
			}
			
			//get elements by id
			domObj = document.getElementById(domId);
			
			//return the method's value
			return domObj.value;
		};
	}
	
	if(typeof Jul.isJsonArray!=='function'){
		Jul.isJsonArray=function(json,propName) {
			//check for valid values
			if (Jul.isEmpty(json) || Jul.isEmpty(json[propName])
					|| Jul.isEmpty(json[propName].length) || json[propName].length<1) {
				return false;
			}
			
			//return the method's value
			return true;
		};
	}
	
	if(typeof Jul.string2array!=='function'){
		Jul.string2array=function(string,delimiter) {
			//declare locals
			var delimiterIndex = -1;
			var array = [];
			
			//set defaults if necessary
			if (Jul.isEmpty(delimiter)) {
				delimiter = ' ';
			}
			
			if (Jul.isString(string)) {
				delimiterIndex = string.indexOf(delimiter);
				if (delimiterIndex==-1) {
					array = new Array(string);
				}
				else {
					array = string.split(delimiter);
				}
			}
			else if (Jul.isArray(string)) {
				for (var i=0;i<string.length;i++) {
					array.push(string[i]);
				}
			}
			
			//return the method's value
			return array;
		};
	}
	
	if(typeof Jul.array2string!=='function'){
		Jul.array2string=function(array,delimiter) {
			//declare locals
			var string = '';
			var counter = 0;
			
			//check for valid values
			if (!Jul.isArray(array) && !Jul.isString(array)) {
				return String(array);
			}
			if (Jul.isString(array)) {
				return array;
			}
			
			//set defaults if necessary
			if (Jul.isEmpty(delimiter)) {
				delimiter = ' ';
			}
			
			//loop through the items
			for (var i=0;i<array.length;i++) {
				if (counter>0) {
					string += delimiter;
				}
				string += array[i];
				counter++;
			}
			
			//return the method's value
			return string;
		};
	}

	if(typeof Jul.jsonArray2String!=='function'){
		Jul.jsonArray2String=function(json,propName,delimiter) {
			//invoke the overloaded method
			return Jul.array2string(json[propName],delimiter);
		};
	}
	
	if(typeof Jul.indexOfArray!=='function'){
		Jul.indexOfArray=function(item, array) {
			//declare locals
			var index = -1;
			var itemStr = null;
			var currItem = null;
			
			//check for a valid values
			itemStr = item;
			if (Jul.isJson(itemStr)) {
				itemStr = JSON.stringify(itemStr);
			}
			if (!Jul.isString(itemStr)) {
				itemStr = String(itemStr);
			}
			if (!Jul.isArray(array) || array.length<1) {
				return index;
			}
			
			//loop through the items
			for (var i=0;i<array.length;i++) {
				//get the current item
				currItem = array[i];
				
				//check for a string
				if (Jul.isJson(currItem)) {
					currItem = JSON.stringify(currItem);
				}
				if (!Jul.isString(currItem)) {
					currItem = String(currItem);
				}
				if (itemStr.toLowerCase()==currItem.toLowerCase()) {
					index = i;
					break;
				}
			}
			
			//return the method's value
			return index;
		};
	}	
	
	if(typeof Jul.isInArray!=='function'){
		Jul.isInArray=function(item, array) {
			//declare locals
			var index = Jul.indexOfArray(item, array);
			
			//return the method's value
			return (index!=-1);
		};
	}
	
	if(typeof Jul.Map!=='function'){
		Jul.Map=function() {
			if (this.arrKeys==null) {
				this.arrKeys=new Array();
			}
			if (this.arrValues==null) {
				this.arrValues=new Array();
			};
			this.indexOf=function(_key) {
				//declare locals
				var _currKey = null;
				var _index = -1;
				
				//check for nulls
				if (Jul.isEmpty(_key) || 
					this.arrKeys==null || !Jul.isArray(this.arrKeys)) {
					return _index;
				}
				
				//loop through the keys
				for (var i=0;i<this.arrKeys.length;i++) {
					//get the current key
					_currKey = this.arrKeys[i];
					
					//compare it with the given key
					if (typeof _key == "string") {
						if (_currKey.toLowerCase()==_key.toLowerCase()) {
							_index = i;
							break;
						}
					}
					else {
						if (_currKey==_key) {
							_index = i;
							break;
						}
					}
				}
				
				//return the method's value
				return _index;
			};
			this.keyAt=function(_index) {
				//declare locals
				var _retVal = null;
				
				//check for nulls
				if (Jul.isEmpty(_index) || 
					this.arrKeys==null || !Jul.isArray(this.arrKeys) ||
					this.arrValues==null || !Jul.isArray(this.arrValues)) {
					return _retVal;
				}
				
				//check for valid values
				if (_index<0 || _index>this.arrKeys.length) {
					return _retVal;
				}
				
				//set the return value
				_retVal = this.arrKeys[_index];
				
				//return the method's value
				return _retVal;
			};
			this.valueAt=function(_index) {
				//declare locals
				var _retVal = null;
				
				//check for nulls
				if (Jul.isEmpty(_index) || 
					this.arrKeys==null || !Jul.isArray(this.arrKeys) ||
					this.arrValues==null || !Jul.isArray(this.arrValues)) {
					return _retVal;
				}
				
				//check for valid values
				if (_index<0 || _index>this.arrValues.length) {
					return _retVal;
				}
				
				//set the return value
				_retVal = this.arrValues[_index];
				
				//return the method's value
				return _retVal;
			};
			this.get=function(_key) {
				//declare locals
				var _retVal = null;
				var _index = -1;
				
				//check for nulls
				if (Jul.isEmpty(_key) || 
					this.arrKeys==null || !Jul.isArray(this.arrKeys) ||
					this.arrValues==null || !Jul.isArray(this.arrValues)) {
					return _retVal;
				}

				//get the key's index
				_index = this.indexOf(_key);
				
				//set the return value
				if (_index>-1 && _index<this.arrValues.length) {
					_retVal = this.arrValues[_index];
				}
				
				//return the method's value
				return _retVal;
			};
			this.contains=function(_key) {
				//declare locals
				var _index = this.indexOf(_key);
				
				//return the method's value
				return (_index==-1 ? false : true);
			};
			this.put=function(_key,_value) {
				//declare locals
				var _index = -1;
				
				//check for a null key
				if (Jul.isEmpty(_key)) {
					return;
				}
				
				//check if the key exists
				_index = this.indexOf(_key);
				if (_index==-1) {
					//put a new key in the map
					this.arrKeys.push(_key);
					this.arrValues.push(_value);
				}
				else if (_index<this.arrValues.length) {
					//update the key's value
					this.arrValues[_index] = _value;
				}
			};
			this.size=function() {
				//return the map's size
				return this.arrKeys.length;
			};
			this.getLastKey=function() {
				var _length = this.arrKeys.length;
				if (_length==0) {
					return null;
				}
				return this.arrKeys.slice(_length-1)[0];
			};
			this.getLastValue=function() {
				var _length = this.arrValues.length;
				if (_length==0) {
					return null;
				}
				return this.arrValues.slice(_length-1)[0];
			};
			this.remove=function(_key) {
				//declare locals
				var _index = this.indexOf(_key);
				var _value = null;
				
				//check if the key exists
				if (_index==-1) {
					return;
				}
				
				//get the value to be removed
				_value = this.arrValues[_index];
				
				//remove the element from the 2 arrays
				this.arrKeys.splice(_index,1);
				this.arrValues.splice(_index,1);
				
				//return the removed value
				return _value;
			};
		};
	}
	
	if(typeof Jul.ajax!=='function'){
		Jul.ajax=function(config) {
			//declare locals
			var method = null;
			var url = null;
			var data = null;
			var dataType = null;
			var callback = null;
			var callbackParams = null;
			var preloaderid = null;
			
			//check for valid values
			if (Jul.isEmpty(config) || typeof(config)!="object") {
				return;
			}
			
			//get the request's configuration
			method = config.method;
			url = config.url;
			data = config.data;
			dataType = config.dataType;
			callback = config.callback;
			callbackParams = config.callbackParams;
			preloaderid = config.preloaderid;
			
			//set defaults if necessary
			if (Jul.isEmpty(method)) {
				method = "GET";
			}
			if (Jul.isEmpty(dataType)) {
				dataType = "json";
			}
			if (Jul.isInDom(preloaderid)) {
				var elem = Jul.getFromDom(preloaderid);
				var modal = M.Modal.getInstance(elem);
				modal.options.dismissible = false;
				modal.open();
			}
			
			//send an ajax request
			$.ajax({
				type: method
				,url: url
				,data: data
				,dataType: dataType
				,success: function(response) {
					callback(response, callbackParams);
					if (Jul.isInDom(preloaderid)) {
						var elem = Jul.getFromDom(preloaderid);
						var modal = M.Modal.getInstance(elem);
						modal.close();
					}
				}
			});
		};		
	}
	
	if(typeof Jul.ajaxGet!=='function'){
		Jul.ajaxGet=function(config) {
			//check for valid values
			if (Jul.isEmpty(config) || typeof(config)!="object") {
				return;
			}
			
			//set the request's configuration
			config.method = "GET";
			
			//invoke the overloaded method
			Jul.ajax(config);
		};		
	}
	
	if(typeof Jul.ajaxPost!=='function'){
		Jul.ajaxPost=function(config) {
			//check for valid values
			if (Jul.isEmpty(config) || typeof(config)!="object") {
				return;
			}
			
			//set the request's configuration
			config.method = "POST";
			
			//invoke the overloaded method
			Jul.ajax(config);
		};		
	}
	
	if(typeof Jul.toggle!=='function') {
		Jul.toggle=function(domId) {
			//declare locals
			var attName = "class";
			var attValue = "hide";
			
			//check for valid values
			if (!Jul.isInDom(domId)) {
				return;
			}
			
			//toggle the attribute
			if (Jul.hasCss(domId,attName,attValue)) {
				Jul.removeCss(domId,attName,attValue);
			}
			else {
				Jul.setCss(domId,attName,attValue);
			}
		};
	}
	
	if(typeof Jul.toggleAnim!=='function') {
		Jul.toggleAnim=function(domId) {
			//declare locals
			var container = null;
			var attName = "data-toggle";
			var attValue = null;
			var start = 0;
			var end = 0;
			
			//check for valid values
			if (!Jul.isInDom(domId)) {
				return;
			}
			
			//get the dom element
			container = Jul.getFromDom(domId);
			
			//get the dom element's attribute
			attValue = container.getAttribute(attName);
			if (Jul.isEmpty(attValue)) {
				attValue = "false";
			}
			
			//set the dom element's attribute
			if (attValue=="true") {
				start = 0;
				end = -106;
				container.setAttribute(attName,"false");
				//animate
				for (var i=start;i>end;i--) {
					container.setAttribute("style","transform:translateX(" + i + "%);");
				}
			}
			else {
				start = -105;
				end = -1;
				container.setAttribute(attName,"true");
				//animate
				for (var i=start;i<end;i++) {
					container.setAttribute("style","transform:translateX(" + i + "%);");
				}
			}
		};
	}
	
	if(typeof Jul.hasClass!=='function') {
		Jul.hasClass=function(domid,value) {
			//invoke the overloaded method
			Jul.hasCss(domid,"class",value);
		};
	}
	
	if(typeof Jul.hasClassByDom!=='function') {
		Jul.hasClassByDom=function(domnode,value) {
			//invoke the overloaded method
			Jul.hasCssByDom(domnode,"class",value);
		};
	}
	
	if(typeof Jul.removeClass!=='function') {
		Jul.removeClass=function(domid,value) {
			//invoke the overloaded method
			Jul.removeCss(domid,"class",value);
		};
	}
	
	if(typeof Jul.removeClassByDom!=='function') {
		Jul.removeClassByDom=function(domnode,value) {
			//invoke the overloaded method
			Jul.removeCssByDom(domnode,"class",value);
		};
	}
	
	if(typeof Jul.setClass!=='function') {
		Jul.setClass=function(domid,value) {
			//invoke the overloaded method
			Jul.setCss(domid,"class",value);
		};
	}
	
	if(typeof Jul.setClassByDom!=='function') {
		Jul.setClassByDom=function(domnode,value) {
			//invoke the overloaded method
			Jul.setCssByDom(domnode,"class",value);
		};
	}
	
	if(typeof Jul.setCss!=='function') {
		Jul.setCss=function(domid,attName,attValue) {
			//declare locals
			var domnode = null;
			
			//get the DOM node
			domnode = Jul.getFromDom(domid);
			
			//invoke the overloaded method
			Jul.setCssByDom(domnode,attName,attValue);
		};
	}
	
	if(typeof Jul.setCssByDom!=='function') {
		Jul.setCssByDom=function(domnode,attName,attValue) {
			//declare locals
			var strValues = null;
			var arrValues = null;
			var index = -1;
			
			//check for valid values
			if (Jul.isEmpty(domnode) || !Jul.isString(attName) || !Jul.isString(attValue)) {
				return;
			}
			
			//get the DOM element's attribute
			strValues = domnode.getAttribute(attName);
			if (Jul.isEmpty(strValues)) {
				arrValues = [];
			}
			else {
				arrValues = Jul.string2array(strValues);
			}
			
			//get the index of the expected value
			index = Jul.indexOfArray(attValue,arrValues);
			if (index==-1) {
				//add the value to the array
				arrValues.push(attValue)
				
				//update the DOM element's attribute
				strValues = Jul.array2string(arrValues)
				domnode.setAttribute(attName,strValues);
			}
		};
	}
	
	
	if(typeof Jul.removeCss!=='function') {
		Jul.removeCss=function(domid,attName,attValue) {
			//declare locals
			var domnode = null;
			
			//get the DOM node
			domnode = Jul.getFromDom(domid);
			
			//invoke the overloaded method
			Jul.removeCssByDom(domnode,attName,attValue);
		};
	}
	
	if(typeof Jul.removeCssByDom!=='function') {
		Jul.removeCssByDom=function(domnode,attName,attValue) {
			//declare locals
			var strValues = null;
			var arrValues = null;
			var index = -1;
			
			//check for valid values
			if (Jul.isEmpty(domnode) || !Jul.isString(attName) || !Jul.isString(attValue)) {
				return;
			}
			
			//get the DOM element's attribute
			strValues = domnode.getAttribute(attName);
			if (Jul.isEmpty(strValues)) {
				arrValues = [];
			}
			else {
				arrValues = Jul.string2array(strValues);
			}
			
			//get the index of the expected value
			index = Jul.indexOfArray(attValue,arrValues);
			if (index!=-1) {
				//remove the value from the array
				arrValues.splice(index,1);
				
				//update the DOM element's attribute
				strValues = Jul.array2string(arrValues)
				domnode.setAttribute(attName,strValues);
			}
		};
	}
	
	if(typeof Jul.hasCss!=='function') {
		Jul.hasCss=function(domid,attName,attValue) {
			//declare locals
			var domnode = null;
			
			//get the DOM node
			domnode = Jul.getFromDom(domid);
			
			//invoke the overloaded method
			return Jul.hasCssByDom(domnode,attName,attValue);
		};
	}
	
	if(typeof Jul.hasCssByDom!=='function') {
		Jul.hasCssByDom=function(domnode,attName,attValue) {
			//declare locals
			var strValues = null;
			var arrValues = null;
			var index = -1;
			var retVal = false;
			
			//check for valid values
			if (Jul.isEmpty(domnode) || !Jul.isString(attName) || !Jul.isString(attValue)) {
				return retVal;
			}
			
			//get the DOM element's attribute
			strValues = domnode.getAttribute(attName);
			if (Jul.isEmpty(strValues)) {
				return retVal;
			}
			
			//get the index of the expected value
			arrValues = Jul.string2array(strValues);
			index = Jul.indexOfArray(attValue,arrValues);
			if (index!=-1) {
				retVal = true;
			}
			
			//return the method's value
			return retVal;
		};
	}
	
	if(typeof Jul.generateId!=='function') {
		Jul.generateId=function(searchConfig) {
			//declare locals
			var domId = 'div';
			var nodes = null;
			var node = null;
			var attValue = null;
			var counter = 0;
			
			//check for valid values
			if (!Jul.isJson(searchConfig)) {
				return domId;
			}
			if (!Jul.isString(searchConfig.tag)) {
				return domId;
			}
			
			//get the nodes from the dom by the tag
			nodes = document.getElementsByTagName(searchConfig.tag);
			
			//check for valid values
			if (Jul.isEmpty(nodes) || Jul.isEmpty(nodes.length) || nodes.length<1) {
				if (Jul.isString(searchConfig.prefix)) {
					domId = searchConfig.prefix + '1';
				}
				else {
					domId = searchConfig.tag + '1';
				}
				return domId;
			}
			if (!Jul.isString(searchConfig.attributeName) || !Jul.isString(searchConfig.attributeValue)) {
				if (Jul.isString(searchConfig.prefix)) {
					domId = searchConfig.prefix + (nodes.length+1);
				}
				else {
					domId = searchConfig.tag + (nodes.length+1);
				}
				return domId;
			}
			
			//loop through the nodes
			for (var i=0;i<nodes.length;i++) {
				//get the current node
				node = nodes[i];
				
				//check for the attribute
				attValue = node.getAttribute(searchConfig.attributeName);
				if (Jul.isEmpty(attValue)) {
					continue;
				}
				
				//compare the value
				if (!Jul.isString(searchConfig.searchType) || (searchConfig.searchType.toLowerCase()!="contains")) {
					if (attValue.toLowerCase()==searchConfig.attributeValue.toLowerCase()) {
						counter++;
					}
				}
				else {
					if (attValue.toLowerCase().indexOf(searchConfig.attributeValue.toLowerCase())!=-1) {
						counter++;
					}
				} 
			}
			
			//set the return value
			if (!Jul.isString(searchConfig.prefix)) {
				domId = searchConfig.tag + (counter+1);
			}
			else {
				domId = searchConfig.prefix + (counter+1);
			}
			
			//return the method's value
			return domId;
		};
	}
	
	if(typeof Jul.jsonsAreEqual!=='function'){
		Jul.jsonsAreEqual=function(json1,json2) {
			//declare locals
			var equals = true;
			var propval1 = null;
			var propval2 = null;
			
			//get the cmoponent's properties
			for (var prop in json1) {
				if (json1.hasOwnProperty(prop)) {
					//get the property's value
					propval1 = json1[prop];
					propval2 = json2[prop];
					
					//check for valid values
					if (propval1!=propval2) {
						equals = false;
						break;
					}
				}
			}
					
			//return the method's value
			return equals;
		};
	}
	
	if(typeof Jul.getModelCompIndex!=='function'){
		Jul.getModelCompIndex=function(model,comp) {
			//declare locals
			var index = -1;
			var propName = null;
			var item = null;
			var equals = false;
			
			//check for valid values
			if (!Jul.isJson(model)) {
				return index;
			}
			if (!Jul.isJson(comp)) {
				return index;
			}
			
			//get the JSON's array property name
			propName = Jul.getFirstJsonArrayProp(model);
			if (!Jul.isString(propName)) {
				return index;
			}
			
			//loop through the items
			for (var i=0;i<model[propName].length;i++) {
				//get the current item
				item = model[propName][i];
				
				//compare the current item with the given component
				equals = Jul.jsonsAreEqual(item,comp);
				if (equals==true) {
					index = i;
					break;
				}
			}
			
			//return the method's value
			return index;
		};
	}
	
	if(typeof Jul.getRefModelName!=='function'){
		Jul.getRefModelName=function(model,componentId,idPropName,refmodelPropName) {
			//declare locals
			var index = -1;
			var component = null;
			var propName = null;
			var refmodelName = null;
			
			//check for valid values
			if (!Jul.isString(idPropName)) {
				idPropName = Jul.getComponentKey();
			}
			if (!Jul.isString(refmodelPropName)) {
				refmodelPropName = "refmodel";
			}
			
			//get the tem's index
			index = Jul.getComponentIndex(model,componentId,idPropName);
			
			//check for valid values
			if (index==-1) {
				return refmodelName;
			}
			
			//get the JSON's array property name
			propName = Jul.getFirstJsonArrayProp(model);
			if (!Jul.isString(propName)) {
				return refmodelName;
			}
			
			//set the return value
			component = model[propName][index];
			refmodelName = component[refmodelPropName];
			
			//return the method's value
			return refmodelName;
		};
	}
	
	if(typeof Jul.getModelIndex!=='function'){
		Jul.getModelIndex=function(modelname,models,idPropName) {
			//declare locals
			var index = -1;
			var item = null;
			
			//check for valid values
			if (!Jul.isString(modelname)) {
				return index;
			}
			if (!Jul.isJson(models) || Jul.isEmpty(models.length) || models.length<1) {
				return index;
			}
			if (!Jul.isString(idPropName)) {
				idPropName = Jul.getModelKey();
			}
			
			//loop through the items
			for (var i=0;i<models.length;i++) {
				//get the current item
				item = models[i];
				
				//check for valid values
				if (!Jul.isString(item[idPropName])) {
					continue;
				}
				
				//compare the values
				if (item[idPropName].toLowerCase()==modelname.toLowerCase()) {
					index = i;
					break;
				}
			}
			
			//return the method's value
			return index;
		};
	}
	
	if(typeof Jul.getModel!=='function'){
		Jul.getModel=function(modelname,models,idPropName) {
			//declare locals
			var index = -1;
			var model = null;
			
			//check for valid values
			if (!Jul.isString(idPropName)) {
				idPropName = Jul.getModelKey();
			}
			
			//get the item's index
			index = Jul.getModelIndex(modelname,models,idPropName);
			
			//check for valid values
			if (index==-1) {
				return model;
			}
			
			//set the return value
			model = models[index];
			
			//return the method's value
			return model;
		};
	}
	
	if(typeof Jul.removeModel!=='function'){
		Jul.removeModel=function(models,modelid,idPropName) {
			//declare locals
			var index = -1;
			
			//check for valid values
			if (!Jul.isString(idPropName)) {
				idPropName = Jul.getModelKey();
			}
			
			//get the item's index
			index = Jul.getModelIndex(modelid,models,idPropName);
			
			//check for valid values
			if (index==-1) {
				return models;
			}
			
			//remove the item from the array
			models.splice(index,1);
			
			//return the method's value
			return models;
		};
	}
	
	if(typeof Jul.setModel!=='function'){
		Jul.setModel=function(models,newModel,idPropName) {
			//declare locals
			var index = -1;
			
			//check for valid values
			if (!Jul.isString(idPropName)) {
				idPropName = Jul.getModelKey();
			}
			
			//get the item's index
			index = Jul.getModelIndex(newModel[idPropName],models,idPropName);
			
			//check for valid values
			if (index==-1) {
				//add
				models.push(newModel);
			}
			else {
				//update
				models[index] = newModel;
			}
			
			//return the method's value
			return models;
		};
	}
	
	if(typeof Jul.getComponentIndex!=='function'){
		Jul.getComponentIndex=function(model,componentId,idPropName) {
			//declare locals
			var index = -1;
			var propName = null;
			var item = null;
			
			//check for valid values
			if (!Jul.isJson(model)) {
				return index;
			}
			if (!Jul.isString(componentId)) {
				return index;
			}
			if (!Jul.isString(idPropName)) {
				idPropName = Jul.getComponentKey();
			}
			
			//get the JSON's array property name
			propName = Jul.getFirstJsonArrayProp(model);
			if (!Jul.isString(propName)) {
				return index;
			}
			
			//loop through the items
			for (var i=0;i<model[propName].length;i++) {
				//get the current item
				item = model[propName][i];
				
				//check for valid values
				if (!Jul.isString(item[idPropName])) {
					continue;
				}
				
				//compare the values
				if (item[idPropName].toLowerCase()==componentId.toLowerCase()) {
					index = i;
					break;
				}
			}
			
			//return the method's value
			return index;
		};
	}
	
	if(typeof Jul.getComponent!=='function'){
		Jul.getComponent=function(model,componentId,idPropName) {
			//declare locals
			var index = -1;
			var component = null;
			var propName = null;
			
			//check for valid values
			if (!Jul.isString(idPropName)) {
				idPropName = Jul.getComponentKey();
			}
			
			//get the tem's index
			index = Jul.getComponentIndex(model,componentId,idPropName);
			
			//check for valid values
			if (index==-1) {
				return component;
			}
			
			//get the JSON's array property name
			propName = Jul.getFirstJsonArrayProp(model);
			if (!Jul.isString(propName)) {
				return component;
			}
			
			//set the return value
			component = model[propName][index];
			
			//return the method's value
			return component;
		};
	}
	
	if(typeof Jul.removeComp!=='function'){
		Jul.removeComp=function(models,modelname,compid,idPropName) {
			//declare locals
			var model = Jul.getModel(modelname,models);
			
			//invoke the overloaded method
			return Jul.removeComponent(model,compid,idPropName);
		};
	}
	
	if(typeof Jul.removeComponent!=='function'){
		Jul.removeComponent=function(model,compid,idPropName) {
			//declare locals
			var index = -1;
			var propName = null;
			
			//check for valid values
			if (!Jul.isString(idPropName)) {
				idPropName = Jul.getComponentKey();
			}
			
			//get the JSON's array property name
			propName = Jul.getFirstJsonArrayProp(model);
			if (!Jul.isString(propName)) {
				return model;
			}
			
			//get the component's index
			index = Jul.getComponentIndex(model,compid,idPropName);
			
			//check for valid values
			if (index==-1) {
				return model;
			}
			
			//remove the item from the array
			model[propName].splice(index,1);
			
			//return the method's value
			return model;
		};
	}
	
	if(typeof Jul.setComp!=='function'){
		Jul.setComp=function(models,modelname,newComp,idPropName) {
			//declare locals
			var model = Jul.getModel(modelname,models);
			
			//invoke the overloaded method
			return Jul.setComponent(model,newComp,idPropName);
		};
	}
	
	if(typeof Jul.setComponent!=='function'){
		Jul.setComponent=function(model,newComp,idPropName) {
			//declare locals
			var index = -1;
			var propName = null;
			
			//check for valid values
			if (!Jul.isString(idPropName)) {
				idPropName = Jul.getComponentKey();
			}
			
			//get the JSON's array property name
			propName = Jul.getFirstJsonArrayProp(model);
			if (!Jul.isString(propName)) {
				return model;
			}
			
			//get the component's index
			index = Jul.getComponentIndex(model,newComp[idPropName],idPropName);
			
			//check for valid values
			if (index==-1) {
				//add
				model[propName].push(newComp);
			}
			else {
				//update
				model[propName][index] = newComp;
			}
			
			//return the method's value
			return model;
		};
	}
	
	if(typeof Jul.updateModelByComp!=='function'){
		Jul.updateModelByComp=function(model,oldComp,newComp) {
			//declare locals
			var index = -1;
			var propName = null;
			
			//get the JSON's array property name
			propName = Jul.getFirstJsonArrayProp(model);
			if (!Jul.isString(propName)) {
				return model;
			}
			
			//check for valid values
			if (Jul.isJson(oldComp)) {
				//get the component's index
				index = Jul.getModelCompIndex(model,oldComp);
			}
			
			//check for valid values
			if (index==-1) {
				model[propName].push(newComp);
				return model;
			}
			
			//set the return value
			model[propName][index] = newComp;
			
			//return the method's value
			return model;
		};
	}
	
	if(typeof Jul.mergeArrays!=='function'){
		Jul.mergeArrays=function(array,add,exclude) {
			//declare locals
			var data = [];
			var index = -1;
			
			//check for valid values
			if (Jul.isString(array)) {
				array = Jul.string2array(array);
			}
			if (Jul.isString(exclude)) {
				exclude = Jul.string2array(exclude);
			}
			if (Jul.isString(add)) {
				add = Jul.string2array(add);
			}
			
			if (Jul.isArray(array)) {
				data = array;
			}
			else {
				data = [];
			}
			
			//remove the items to exclude
			if (Jul.isArray(exclude)) {
				//loop through the data items
				for (var i=0;i<exclude.length;i++) {
					index = Jul.indexOfArray(exclude[i],data);
					if (index!=-1) {
						data.splice(index,1);
					}
				}
			}
			
			//add the items to add
			if (Jul.isArray(add)) {
				//loop through the data items
				for (var i=0;i<add.length;i++) {
					if (!Jul.isInArray(add[i],data)) {
						data.push(add[i]);
					}
				}
			}
			
			//return the method's value
			return data;
		};
	}
	
	if(typeof Jul.getJson2HtmlMapper!=='function') {
		Jul.getJson2HtmlMapper=function(jsonPropName) {
			//declare locals
			var data = [
				{"json":["data-length","maxlength"],"htmlatt":"maxlength"}
				,{"json":["title","tooltip"],"htmlatt":"data-tooltip"}
				,{"json":["titleposition","tooltipposition"],"htmlatt":"data-position"}
			];
			var jsonArr = null;
			var found = false;
			var htmlAttName = null;
			
			//check for valid values
			if (!Jul.isString(jsonPropName)) {
				return htmlAttName;
			}
			
			//loop through the data
			for (var i=0;i<data.length;i++) {
				//get the current JSON array
				jsonArr = data[i].json;
				
				//loop through the JSON array
				for (var j=0;j<jsonArr.length;j++) {
					//compare the current item with the given one
					if (jsonPropName==jsonArr[j]) {
						found = true;
						break;
					}
				}
				
				//check the found flag
				if (found===true) {
					htmlAttName = data[i].htmlatt;
					break;
				}
			}
			
			//return the method's value
			return htmlAttName;
		};
	}
	
	if(typeof Jul.getPropsToExclude!=='function') {
		Jul.getPropsToExclude=function(add,exclude) {
			//declare locals
			var array = [
				"class"
				,"classes"
				,"events"
				,"helper-text"
				,"helper-text-error"
				,"helper-text-success"
				,"icon"
				,"iconposition"
				,"iconsize"
				,"label"
				,"layout"
				,"options"
				,"renderto"
				,"theme"
				,"type"
				,"validations"
			];
			var props = Jul.mergeArrays(array,add,exclude);
			
			//return the method's value
			return props;
		};
	}
	
	if(typeof Jul.getExtraClassesHtml!=='function') {
		Jul.getExtraClassesHtml=function(config) {
			//declare class members
			var classes = null;
			
			//get the classes as string
			classes = Jul.getExtraClassesArray(config);
			classes = Jul.array2string(classes);
			
			//return the method's value
			return classes;
		};
	}
	
	if(typeof Jul.getExtraClassesArray!=='function'){
		Jul.getExtraClassesArray=function(config) {
			//declare class members
			var arrClasses = [];
			var arrTemp = [];
			var delimiter = " ";
			var value = null;
			var tooltipClass = "tooltipped";
			
			//check for valid values
			if (!Jul.isJson(config)) {
				return arrClasses;
			}
			
			//get the values from the JSON configuration
			value = config.defaultClasses;
			arrTemp = Jul.string2array(value,delimiter)
			arrClasses = Jul.mergeArrays(arrClasses,arrTemp,null);
			
			value = config.classes;
			arrTemp = Jul.string2array(value,delimiter)
			arrClasses = Jul.mergeArrays(arrClasses,arrTemp,null);
			
			value = config.layout;
			arrTemp = Jul.string2array(value,delimiter)
			arrClasses = Jul.mergeArrays(arrClasses,arrTemp,null);
			
			value = config.theme;
			if (Jul.isString(value)) {
				if (!Jul.isInArray(value,arrClasses)) {
					arrClasses.push(value);
				}
			}

			value = config.tooltip;
			if (Jul.isString(value)) {
				if (!Jul.isInArray(tooltipClass,arrClasses)) {
					arrClasses.push(tooltipClass);
				}
			}
			
			value = config.title;
			if (Jul.isString(value)) {
				if (!Jul.isInArray(tooltipClass,arrClasses)) {
					arrClasses.push(tooltipClass);
				}
			}
			
			//return the method's value
			return arrClasses;
		};
	}
	
	if(typeof Jul.attachModelEvents!=='function'){
		Jul.attachModelEvents=function(invoker,models,modelname,idPropName,detach) {
			//declare locals
			var model = null;
			var arrayProp = null;
			var component = null;
			
			//check for valid values
			if (Jul.isEmpty(invoker)) {
				return;
			}
			if (!Jul.isJson(models)) {
				return;
			}
			if (!Jul.isString(modelname)) {
				return;
			}
			if (!Jul.isString(idPropName)) {
				idPropName = Jul.getModelKey();
			}
			
			//get the model by its name
			model = Jul.getModel(modelname,models,idPropName);
			
			//get the model's array property name
			arrayProp = Jul.getFirstJsonArrayProp(model);
			if (!Jul.isString(arrayProp)) {
				return;
			}
			
			//loop through the items
			for (var i=0;i<model[arrayProp].length;i++) {
				//get the current items
				component = model[arrayProp][i];
				
				//attach the item's events
				Jul.attachComponentEvents(component,invoker,detach);
			}
		};
	}
	
	if(typeof Jul.attachComponentEvents!=='function'){
		Jul.attachComponentEvents=function(component,invoker,detach) {
			//declare locals
			var domId = null;
			var domObj = null;
			var eventItem = null;
			var eventName = null;
			var eventHandlerName = null;
			var eventHandler = null;
			var invokerIndex = -1;
			var eventJson = null;
			var eventIndex = -1;
			
			//check for valid values
			if (Jul.isEmpty(invoker)) {
				return;
			}
			if (!Jul.isJson(component)) {
				return;
			}
			if (!Jul.isArray(component.events)) {
				return;
			}
			
			//get the component's id
			domId = component.id;
			
			//check for valid values
			if (!Jul.isInDom(domId)) {
				return;
			}
			
			//get the dom element
			domObj = Jul.getFromDom(domId);
			
			//loop through the items
			for (var i=0;i<component.events.length;i++) {
				//get the current item
				eventItem = component.events[i];
				
				//check for valid values
				if (!Jul.isJson(eventItem)) {
					continue;
				}
				if (!Jul.isString(eventItem.name) || !Jul.isString(eventItem.handler)) {
					continue;
				}
				
				//set the the event name and its handler
				eventName = eventItem.name.toLowerCase();
				if (eventName.indexOf("on")!=-1) {
					eventName = eventName.replace("on","");
				}
				eventHandlerName = eventItem.handler;
				invokerIndex = eventHandlerName.indexOf(".");
				if (invokerIndex!=-1) {
					eventHandlerName = eventHandlerName.substring(invokerIndex);
				}
				
				//define the event handler
				eventHandler = eval('invoker.' + eventHandlerName);
				
				//check the detach flag
				if (Jul.isTrue(detach)) {
					//remove an event listener
					domObj.removeEventListener(eventName);
					
					//remove the event from the map
					eventJson = {"compid":domId,"event":eventName};
					eventIndex = Jul.indexOfJson(eventJson,Jul.eventsMap);
					if (eventIndex!=-1) {
						Jul.eventsMap.splice(eventIndex,1);
					}
				}
				else {
					//add an event handler to the map
					Jul.eventsMap.push({"compid":domId,"event":eventName,"handler":eventHandler});
					domObj.addEventListener(eventName, function(event) {
						//get the event's component
						var compid = event.target.id;
						var eventType = event.type;
						var json = {"compid":compid,"event":eventType};
						var index = -1;
						
						//find the event in the map
						index = Jul.indexOfJson(json,Jul.eventsMap);
						
						//check for valid values
						if (index==-1) {
							return;
						}
						
						//invoke the event handler
						Jul.eventsMap[index].handler(invoker);
					});
				}
			}
		};
	}
	
	if(typeof Jul.indexOfJson!=='function'){
		Jul.indexOfJson=function(json,array) {
			//declare class members
			var index = -1;
			var item = null;
			var propnames = null;
			var itemStr = null;
			var jsonStr = null;
			
			//check for valid values
			if (!Jul.isJson(json) || !Jul.isArray(array)) {
				return index;
			}
			
			//get the array of property names
			propnames = Jul.json2propnames(json);
			jsonStr = JSON.stringify(json);
			
			//loop through the array
			for (var i=0;i<array.length;i++) {
				//get the current item
				item = Jul.json2propvalues(array[i],propnames);
				itemStr = JSON.stringify(item);
				
				//compare the two json objects
				if (jsonStr.toLowerCase()==itemStr.toLowerCase()) {
					index = i;
					break;
				}
			}
			
			//return the method's value
			return index;
		};
	}
	
	if(typeof Jul.json2propnames!=='function'){
		Jul.json2propnames=function(json) {
			//declare class members
			var propnames = null;
			var item = null;
			
			//check for valid values
			if (!Jul.isJson(json)) {
				return propnames;
			}
			
			//loop through the array
			propnames = [];
			for (var prop in json) {
				if (json.hasOwnProperty(prop)) {
					propnames.push(prop);
				}
			}
		
			//return the method's value
			return propnames;
		};
	}
	
	if(typeof Jul.json2propvalues!=='function'){
		Jul.json2propvalues=function(json,propnames) {
			//declare class members
			var propvalues = null;
			var item = null;
			
			//check for valid values
			if (!Jul.isJson(json) || !Jul.isArray(propnames)) {
				return propvalues;
			}
			
			//loop through the array
			propvalues = {};
			for (var i=0;i<propnames.length;i++) {
				item = propnames[i];
				if (json.hasOwnProperty(item)) {
					propvalues[item] = json[item];
				}
			}
		
			//return the method's value
			return propvalues;
		};
	}
	
	if(typeof Jul.json2dom!=='function') {
		Jul.json2dom=function(json) {
			//declare locals
			var arrExclude = ["tag","id","class"];
			var exclude = null;
			var domid = null;
			var tag = null;
			var domNode = null;
			var classes = null;
			var propval = null;
			var attname = null;
			
			//check for valid values
			if (!Jul.isJson(json)) {
				return domNode;
			}
			
			//build the exclude array
			exclude = json.excludeProps;
			if (!Jul.isArray(exclude)) {
				if (Jul.isString(exclude)) {
					exclude = new Array(exclude);
				}
				else {
					exclude = [];
				}
			}
			arrExclude = Jul.mergeArrays(arrExclude,exclude,null);
			
			//get the JSON's configuration values
			domid = json.id;
			tag = json.tag;
			
			//check if the DOM node exists 
			if (Jul.isInDom(domid)) {
				domNode = Jul.getFromDom(domid);
			}
			else {
				//create a unique node
				domNode = document.createElement(tag);
				domNode.setAttribute("id",domid);
			}
			
			//check for a wrapper
			if (!Jul.isTrue(json.hasWrapper)) {
				classes = Jul.getExtraClassesHtml(json);
				if (Jul.isString(classes)) {
					domNode.setAttribute("class",classes);
				}
			}
			
			//get the cmoponent's properties
			for (var prop in json) {
				if (json.hasOwnProperty(prop)) {
					//get the property's value
					propval = json[prop];
					
					//check if the property should be ignored
					if (Jul.isInArray(prop, arrExclude)) {
						continue;
					}
					
					//check for false values
					if (propval===false || (Jul.isString(propval) && propval.toLowerCase()=="false")) {
						continue;
					}
					
					//render the property
					if (propval===true || (Jul.isString(propval) && propval.toLowerCase()=="true")) {
						domNode.setAttribute(prop,prop);
					}
					else if (Jul.isString(propval)) {
						//get the JSON's HTML equivalent
						attname = Jul.getJson2HtmlMapper(prop);
						if (Jul.isString(attname)) {
							domNode.setAttribute(attname,propval);
						}
						else {
							domNode.setAttribute(prop,propval);
						}
					}
				}
			}
			
			//return the method's value
			return domNode;
		};
	}
	
	if(typeof Jul.getOptionsHtml!=='function') {
		Jul.getOptionsHtml=function(options) {
			//declare locals
			var html = '';
			
			//check for valid values
			if (!Jul.isArray(options)) {
				if (Jul.isString(options)) {
					options = new Array(options);
				}
				else {
					return html;
				}
			}
			
			//loop through the items
			for (var i=0;i<options.length;i++) {
				html += Jul.getOptionHtml(options[i]);
			}
			
			//return the method's value
			return html;
		};
	}
	
	if(typeof Jul.getOptionHtml!=='function') {
		Jul.getOptionHtml=function(option) {
			//declare locals
			var html = '';
			
			//check for valid values
			if (!Jul.isJson(option)) {
				if (Jul.isString(option)) {
					option = {"label":option,"value":option};
				}
				else {
					return html;
				}
			}
			
			//build the html
			html += '<option value="' + option.value + '" ';
			if (Jul.isString(option.icon)) {
				html += 'data-icon="' + option.icon + '" class="';
				if (Jul.isEmpty(option.iconposition)) {
					html += 'left';
				}
				else {
					html += option.iconposition;
				}
				html += '" ';
			}
			if (Jul.isTrue(option.disabled)) {
				html += 'disabled ';
			}
			if (Jul.isTrue(option.selected)) {
				html += 'selected ';
			}
			html += '>' + option.label + '</option>';
			
			//return the method's value
			return html;
		};
	}
	
	if(typeof Jul.getListOptionIndex!=='function') {
		Jul.getListOptionIndex=function(listid,option) {
			//declare locals
			var index = -1;
			var node = null;
			var value = null;
			
			//check for valid values
			if (!Jul.isInDom(listid)) {
				return index;
			}
			
			//get the value from the option
			if (Jul.isJson(option)) {
				value = option.value;
			}
			else if (Jul.isString(option)) {
				value = option;
			}
			
			//check for valid values
			if (!Jul.isString(value)) {
				return index;
			}
			
			//get the DOM node
			node = Jul.getFromDom(listid);
			
			//loop through the items
			for (var i=0;i<node.options.length;i++) {
				if (node.options[i].value==value) {
					index = i;
					break;
				}
			}
			
			//return the method's value
			return index;
		};
	}
	
	if(typeof Jul.removeListOption!=='function') {
		Jul.removeListOption=function(listid,option) {
			//declare locals
			var index = -1;
			var node = null;
			var value = null;
			
			//check for valid values
			if (!Jul.isInDom(listid)) {
				return;
			}
			
			//get the value from the option
			if (Jul.isJson(option)) {
				value = option.value;
			}
			else if (Jul.isString(option)) {
				value = option;
			}
			
			//check for valid values
			if (!Jul.isString(value)) {
				return;
			}
			
			//get the item's index
			index = Jul.getListOptionIndex(listid,value);
			if (index==-1) {
				return;
			}
			
			//get the DOM node
			node = Jul.getFromDom(listid);
			
			//remove the option
			node.options.remove(index);
		};
	}
	
	if(typeof Jul.setListOption!=='function') {
		Jul.setListOption=function(listid,option) {
			//declare locals
			var index = -1;
			var value = null;
			var label = null;
			var node = null;
			var domOption = null;
			
			//check for valid values
			if (!Jul.isInDom(listid)) {
				return;
			}
			
			//get the value from the option
			if (Jul.isJson(option)) {
				value = option.value;
				label = option.label;
			}
			else if (Jul.isString(option)) {
				value = option;
			}
			
			//check for valid values
			if (!Jul.isString(value)) {
				return;
			}
			if (!Jul.isString(label)) {
				label = value;
			}
			
			//get the DOM node
			node = Jul.getFromDom(listid);
			
			//get the option's index
			index = Jul.getListOptionIndex(listid,value);
			
			//check for an existing value
			if (index!=-1) {
				//remove the existing option
				node.options.remove(index);
			}
			
			//add the option
			domOption = document.createElement("option");
			domOption.value = value;
			domOption.text = label;
			if (index==-1) {
				node.options.add(domOption);
			}
			else {
				node.options.add(domOption,index);
			}
		};
	}
	
	if(typeof Jul.renderAttributesTable!=='function') {
		Jul.renderAttributesTable=function(models,component,renderto) {
			//declare locals
			var genericAttsModelName = "html4_global_attributes";
			var typeAttsModelName = "materialze_components";
			var compKeyProp = Jul.getMaterializeComponentKey();
			var attItemKey = Jul.getAttributeKey();
			var arrPropName = null;
			var genericAttsModel = null;
			var typeAttsModel = null;
			var typeAttsComp = null;
			var genericAtts = null;
			var typeAtts = null;
			var compAtts = null;
			var currItem = null;
			var currItemName = null;
			var currItemType = null;
			var currItemValues = null;
			var currItemRefmodel = null;
			var container = null;
			var html = '';
			
			//check for valid values
			if (!Jul.isJson(models) || !Jul.isJson(component)) {
				return;
			}
			if (!Jul.isInDom(renderto)) {
				return;
			}
			
			//get the component's name
			if (Jul.isString(component.type)) {
				//get all attributes from the components types model
				typeAttsModel = Jul.getModel(typeAttsModelName,models,Jul.getModelKey());
				typeAttsComp = Jul.getComponent(typeAttsModel,component.type,compKeyProp);
				arrPropName = Jul.getFirstJsonArrayProp(typeAttsComp);
				if (!Jul.isString(arrPropName)) {
					return;
				}
				typeAtts = typeAttsComp[arrPropName];
			}
			
			//get the JSON's array property name
			arrPropName = Jul.getFirstJsonArrayProp(component);
			if (!Jul.isString(arrPropName)) {
				return;
			}
			
			//get the component's attributes
			arrItems = component[arrPropName];
			
			//get generic attributes
			genericAttsModel = Jul.getModel(genericAttsModelName,models,Jul.getModelKey());
			arrPropName = Jul.getFirstJsonArrayProp(genericAttsModel);
			if (!Jul.isString(arrPropName)) {
				return;
			}
			genericAtts = genericAttsModel[arrPropName];
			
			//merge the three arrays
			if (Jul.isArray(typeAtts)) {
				arrItems = Jul.mergeArrays(arrItems,typeAtts,null);
			}
			arrItems = Jul.mergeArrays(arrItems,genericAtts,null);
			
			//render the table's start
			html += '<div class="grid striped col s12">';
			
			//loop through the items
			for (var i=0;i<arrItems.length;i++) {
				//get the current item
				currItem = arrItems[i];
				
				//get the item's name and type
				currItemName = currItem[attItemKey];
				currItemType = currItem.type;
				
				//check for valid values
				if (!Jul.isString(currItemName) || !Jul.isString(currItemType)) {
					continue;
				}
				
				//get the item's values
				currItemType = currItemType.toLowerCase();
				if (currItemType=="list" || currItemType=="mlist") {
					if (Jul.isArray(currItem.values)) {
						currItemValues = currItem.values;
					}
					else if (Jul.isString(currItem.refmodel)) {
						currItemRefmodel = Jul.getModel(currItem.refmodel,models,Jul.getModelKey());
						if (Jul.isJson(currItemRefmodel)) {
							currItemValues = currItemRefmodel.values;
						}
					}
				}
				if (Jul.isString(currItemValues)) {
					currItemValues = new Array(currItemValues);
				}
				
				//render the item as table rows of a label column and a component column
				html += Jul.renderAttributeRow(component,currItemName,currItemType,currItemValues);
			}
			
			//render the table's start
			html += '</div>';
			
			//render the HTML
			container = Jul.getFromDom(renderto);
			container.innerHTML = html;
		};
	}
	
	if(typeof Jul.renderAttributeRow!=='function') {
		Jul.renderAttributeRow=function(uicomp,name,type,values) {
			//declare locals
			var html = '';
			var compConfig = null;
			var defaultLayout = "col s12";
			var options = Jul.values2options(values);
			var idConfig = null;
			var idPrefix = "";
			var attValue = null;
			
			//check for valid values
			if (!Jul.isJson(uicomp) || !Jul.isString(name) || !Jul.isString(type)) {
				return html;
			}
			
			//render the name column
			html += '<div class="grid_row row">';
			
			//render the value column
			html += '<div class="col s12 valign-wrapper">';
			switch (type) {
				case "list":
				case "mlist":
					idPrefix = "cmb_"+name;
					compConfig = {
						"type":"select"
						,"label":name
						,"layout":defaultLayout
						,"options":options
					};
					if (type=="mlist") {
						compConfig.multiple = true;
					}
					break;
				case "boolean":
					idPrefix = "cb_"+name;
					compConfig = {
						"type":"checkbox"
						,"label":name
						,"layout":defaultLayout
					};
					break;
				case "string":
					idPrefix = "txt_"+name;
					compConfig = {
						"type":"text"
						,"label":name
						,"layout":defaultLayout
					};
					break;
				case "number":
					idPrefix = "num_"+name;
					compConfig = {
						"type":"number"
						,"label":name
						,"layout":defaultLayout
					};
					break;
				default:
					idPrefix = "div_"+name;
					compConfig = {
						"type":"container"
						,"label":name
						,"layout":defaultLayout
					};
					break;
			}
			compConfig.id = idPrefix;
			
			//check for an attribute value
			attValue = uicomp[name];
			if (!Jul.isEmpty(attValue)) {
				compConfig.value = attValue;
			}
			
			html += Jul.renderComponent(compConfig);
			html += '</div>';
			html += '</div>';
			
			//return the method's value
			return html;
		};
	}
	
	if(typeof Jul.attributesTable2ui!=='function') {
		Jul.attributesTable2ui=function(models,component) {
			//declare locals
			var genericAttsModelName = "html4_global_attributes";
			var typeAttsModelName = "materialze_components";
			var compKeyProp = Jul.getMaterializeComponentKey();
			var attItemKey = Jul.getAttributeKey();
			var arrPropName = null;
			var genericAttsModel = null;
			var typeAttsModel = null;
			var typeAttsComp = null;
			var genericAtts = null;
			var typeAtts = null;
			var compAtts = null;
			var currItem = null;
			var currItemName = null;
			var currItemType = null;
			var currItemValue = null;
			var containerId = null;
			var domid = null;
			var container = null;
			var domnode = null;
			var parent = null;
			var json = null;
			
			//check for valid values
			if (!Jul.isJson(models) || !Jul.isJson(component)) {
				return json;
			}
			
			//get the component's name
			if (Jul.isString(component.type)) {
				//get all attributes from the components types model
				typeAttsModel = Jul.getModel(typeAttsModelName,models,Jul.getModelKey());
				typeAttsComp = Jul.getComponent(typeAttsModel,component.type,compKeyProp);
				arrPropName = Jul.getFirstJsonArrayProp(typeAttsComp);
				if (!Jul.isString(arrPropName)) {
					return json;
				}
				typeAtts = typeAttsComp[arrPropName];
			}
			
			//get the JSON's array property name
			arrPropName = Jul.getFirstJsonArrayProp(component);
			if (!Jul.isString(arrPropName)) {
				return json;
			}
			
			//get the component's attributes
			arrItems = component[arrPropName];
			
			//get generic attributes
			genericAttsModel = Jul.getModel(genericAttsModelName,models,Jul.getModelKey());
			arrPropName = Jul.getFirstJsonArrayProp(genericAttsModel);
			if (!Jul.isString(arrPropName)) {
				return json;
			}
			genericAtts = genericAttsModel[arrPropName];
			
			//merge the three arrays
			if (Jul.isArray(typeAtts)) {
				arrItems = Jul.mergeArrays(arrItems,typeAtts,null);
			}
			arrItems = Jul.mergeArrays(arrItems,genericAtts,null);
			
			//get the container's id and the DOM id
			containerId = document.getElementById("txt_renderto").value;
			if (!Jul.isString(containerId)) {
				containerId = "body";
			}
			if (!Jul.isInDom(containerId)) {
				return json;
			}
			domid = document.getElementById("txt_id").value;
			
			//build the JSON return value
			json = {};
			if (Jul.isString(component.type)) {
				json.type = component.type;
			}
			else {
				json.type = component.name;
			}
			if (component.name=="list") {
				json.type = "select";
			}
			
			//loop through the items
			for (var i=0;i<arrItems.length;i++) {
				//get the current item
				currItem = arrItems[i];
				
				//get the item's name and type
				currItemName = currItem[attItemKey];
				currItemType = currItem.type;
				
				//check for valid values
				if (!Jul.isString(currItemName) || !Jul.isString(currItemType)) {
					continue;
				}
				
				//get the item's values
				currItemType = currItemType.toLowerCase();
				
				//get the attribute's value
				currItemValue = Jul.getAttributeValue(currItemName,currItemType);
				
				//check for valid values
				json[currItemName] = currItemValue;
			}
			
			//get the container from the DOM
			container = Jul.getFromDom(containerId);
			
			//check if the node already exists on the DOM
			if (Jul.isInDom(domid)) {
				//remove the node
				domnode = Jul.getFromDom(domid);
				parent = domnode.parentNode;
				parent.removeChild(domnode);
			}
			
			//append the node to the DOM
			if (containerId.toLowerCase()=="body") {
				domnode = document.createElement("div");
				domnode.innerHTML = Jul.renderComponent(json);
				container.appendChild(domnode);
			}
			else {
				container.innerHTML += Jul.renderComponent(json);
			}
			
			//return the method's value
			return json;
		};
	}
	
	if(typeof Jul.getAttributeValue!=='function') {
		Jul.getAttributeValue=function(name,type) {
			//declare locals
			var value = null;
			var idPrefix = null;
			
			switch (type) {
				case "list":
				case "mlist":
					idPrefix = "cmb_"+name;
					break;
				case "boolean":
					idPrefix = "cb_"+name;
					break;
				case "string":
					idPrefix = "txt_"+name;
					break;
				case "number":
					idPrefix = "num_"+name;
					break;
				default:
					idPrefix = "div_"+name;
					break;
			}
			
			//get the attribute's value
			if (Jul.isInDom(idPrefix)) {
				if (type=="boolean") {
					value = document.getElementById(idPrefix).checked;
				}
				else if (type=="mlist") {
					value = $("#"+idPrefix).val();
					if (!Jul.isString) {
						value = String(value);
					}
				}
				else {
					value = document.getElementById(idPrefix).value;
				}
			}
			
			//return the method's value
			return value;
		};
	}
	
	if(typeof Jul.values2options!=='function') {
		Jul.values2options=function(values,addEmpty,emptyText) {
			//declare locals
			var options = [];
			
			//check for valid values
			if (!Jul.isArray(values)) {
				return options;
			}
			if (Jul.isEmpty(addEmpty)) {
				addEmpty = true;
			}
			if (Jul.isEmpty(emptyText)) {
				emptyText = "";
			}
			
			//add an empty option
			if (Jul.isTrue(addEmpty)) {
				options.push(
					{"label":emptyText,"value":"","selected":true}
				);
			}
			
			//loop through the items
			for (var i=0;i<values.length;i++) {
				options.push(
					{"label":values[i],"value":values[i]}
				);
			}
			
			//return the method's value
			return options;
		};
	}
	
	if(typeof Jul.EventsPublisher!=='function') {
		Jul.EventsPublisher=function() {
			//declare class members
			var listeners = {};
			
			this.register=function(event, callback) {
			    //check for listeners
			    if (!listeners[event]) {
			    	//create a new array
			    	listeners[event] = [];
			    }
			    
			    //add the event to the array
			    listeners[event].push(callback);
			};
			
			this.unregister=function(event,callback) {
				//declare locals
				var index = -1;
				
				//get the index
				index = this.indexOf(event,callback);
				
				//check for valid values
				if (index==-1) {
					return;
				}
				
				//remove the listener
	        	listeners[event].splice(index, 1);
			};
			
			this.indexOf=function(event,callback) {
				//declare locals
				var index = -1;
				
				//check for valid values
			    if (!listeners[event]) {
			    	return index;
			    }
			    
			    //loop through the items
			    for (var i=0;i<listeners[event].length;i++) {
			    	if (listeners[event][i]===callback) {
			    		index = i;
			    		break;
			    	}
			    }
			    
				//return the method's value
				return index;
			};
			
			this.publish=function(event, data) {
				//check for listeners
			    if (!listeners[event]) {
			    	return;
			    }
			    
			    //publish the event to all listeners
			    for (var i=0;i<listeners[event].length;i++) {
			    	var callback = listeners[event][i];
			    	callback(data);
			    }
			};
			
		};
	}
	
	if(typeof Jul.getEventsManager!=='function') {
		Jul.getEventsManager=function() {
			//return the method's value
			return Jul.eventsManager;
		};
	}
	
	if(typeof Jul.loadModels!=='function') {
		Jul.loadModels=function(config) {
			//declare locals
			var modelsFile = null;
			var preloaderid = null;
			var evnetData = null;
			var request = null;
			
			//check for valid values
			if (Jul.isEmpty(config) || Jul.isEmpty(config.file)) {
				evnetData = {"caller":config.caller,"response":null,"message":"file to load is missing or empty!!"};
				Jul.eventsManager.publish("LoadModelsFailed",evnetData);
				return;
			}
			
			//get the parameters from the JSON configuration
			modelsFile = config.file;
			preloaderid = config.preloaderid;
			
			//create a request
			request = {
					url:modelsFile
					,data:null
					,callback:Jul.afterLoadModels
					,callbackParams:{"file":modelsFile,"caller":config.caller}
					,preloaderid:preloaderid
			};
			
			//send an AJAX request
			Jul.ajaxGet(request);
		};
	}
	
	if(typeof Jul.afterLoadModels!=='function') {
		Jul.afterLoadModels=function(response, callbackParams) {
			//declare locals
			var evnetData = null;

			//publish an event
			evnetData = {"caller":callbackParams.caller,"response":response,"message":"file [" + callbackParams.file + "] was loaded successfully"};
			Jul.eventsManager.publish("LoadModelsSuccess",evnetData);
		};
	}
	
	if(typeof Jul.renderPleasewait!=='function') {
		Jul.renderPleasewait=function(config) {
			//create a component
			Jul.renderComponent(config);
			Jul.removeClass(config.id,config.theme);
		};
	}
	
	if(typeof Jul.getFirstJsonArrayProp!=='function') {
		Jul.getFirstJsonArrayProp=function(json) {
			//declare locals
			var propName = null;
			
			//check for valid values
			if (!Jul.isJson(json)) {
				return propName;
			}
			
			//get the cmoponent's properties
			for (var prop in json) {
				if (json.hasOwnProperty(prop)) {
					//get the property's value
					propval = json[prop];
					
					//check for valid values
					if (Jul.isArray(propval)) {
						propName = prop;
						break;
					}
				}
			}
					
			//return the method's value
			return propName;
		};
	}
	
	if(typeof Jul.renderModelInRows!=='function') {
		Jul.renderModelInRows=function(config) {
			//declare locals
			var methodsInvoker = null;
			var models = null;
			var modelname = null;
			var renderto = null;
			var theme = null;
			var classes = null;
			var container = null;
			var model = null;
			var propName = null;
			var item = null;
			var componentConfig = null;
			var html = '';
			
			//get the parameters from the JSON's configuration
			methodsInvoker = config.methodsInvoker;
			models = config.models;
			modelname = config.modelname;
			renderto = config.renderto;
			theme = config.theme;
			classes = config.classes;
			
			//check for valid values
			if (!Jul.isJson(models)) {
				return;
			}
			if (!Jul.isString(config.modelname)) {
				return;
			}
			if (!Jul.isInDom(config.renderto)) {
				return;
			}
			
			//update the model with list values
			model = Jul.updateModelRefs(config.models,config.modelname);
			propName = Jul.getFirstJsonArrayProp(model);

			//check for valid values
			if (!Jul.isJson(model)) {
				return;
			}
			if (!Jul.isString(propName)) {
				return;
			}
			if (Jul.isString(classes)) {
				classes = new Array(classes);
			}
			if (!Jul.isArray(classes)) {
				classes = "";
			}
			else {
				classes = Jul.array2string(classes);
			}
			
			//loop through the items
			for (var i=0;i<model[propName].length;i++) {
				//get the current item
				item = model[propName][i];
				item.theme = theme;
				html = '';
				
				//build the html
				if (!Jul.isInDom(item.renderto)) {
					container = Jul.getFromDom(renderto);
					html += '<div class="row">';
					html += Jul.renderComponent(item,methodsInvoker);
					html += '</div>';
					container.innerHTML += html;
				}
				else {
					//get the container DOM element
					container = Jul.getFromDom(item.renderto);
					html += Jul.renderComponent(item,methodsInvoker);
					container.innerHTML += html;
				}
			}
			
		};
	}
	
	if(typeof Jul.updateModelRefs!=='function') {
		Jul.updateModelRefs=function(models,modelname) {
			//declare locals
			var modelKey = null;
			var refmodelName = null;
			var componentModel = null;
			var arrayProp = null;
			var currComponent = null;
			var arrComponentsToUpdate = null;
			var listModelName = null;
			var listModel = null;
			var optionsPropName = null;
			var options = null;
			var newComp = null;
			var newModel = null;
			
			//get the parameters from the JSON's configuration
			modelKey = Jul.getModelKey();
			refmodelName = Jul.getRefModelAttributeName();
			
			//get the component to update's model
			componentModel = Jul.getModel(modelname,models,modelKey);
			
			//check for valid values
			if (!Jul.isJson(componentModel)) {
				return componentModel;
			}
			
			//get the model's array property name
			arrayProp = Jul.getFirstJsonArrayProp(componentModel);
			if (!Jul.isString(arrayProp)) {
				return componentModel;
			}
			
			//create a new array
			arrComponentsToUpdate = [];
			
			//loop through the items
			for (var i=0;i<componentModel[arrayProp].length;i++) {
				//get the current item
				currComponent = componentModel[arrayProp][i];
				
				//check for a refmodel attribute
				if (!Jul.isString(currComponent[refmodelName])) {
					continue;
				}
				
				//add the item to the array of components to update
				arrComponentsToUpdate.push(currComponent);
			}
			
			//check for an array of components to update
			if (!Jul.isArray(arrComponentsToUpdate)) {
				return componentModel;
			}
			
			//loop through the items to update
			for (var i=0;i<arrComponentsToUpdate.length;i++) {
				//get the current item
				currComponent = arrComponentsToUpdate[i];
				
				//get the list's model name
				listModelName = currComponent[refmodelName];
				
				//check for valid values
				if (!Jul.isString(listModelName)) {
					continue;
				}
				
				//get the component's ref model
				listModel = Jul.getModel(listModelName,models,modelKey);
				
				//check for valid values
				if (!Jul.isJson(listModel)) {
					continue;
				}
				
				//get the ref model's property name
				optionsPropName = Jul.getFirstJsonArrayProp(listModel);
				if (!Jul.isString(optionsPropName)) {
					continue;
				}
				
				//get the model's options
				options = listModel[optionsPropName];
				
				//check for valid values
				if (!Jul.isArray(options)) {
					continue;
				}
				
				//update the component's options
				newComp = currComponent;
				newComp.options = options;
				
				//update the component's model
				newModel = Jul.updateModelByComp(componentModel,currComponent,newComp);
			}
			
			//return the method's value
			return newModel;
		};
	}
	
	if(typeof Jul.updateTheme!=='function') {
		Jul.updateTheme=function(config) {
			//declare locals
			var domIds = null;
			var oldTheme = null;
			var newTheme = null;
			var oldThemes = null;
			var newThemes = null;
			var spinnerTheme = null;
			var domId = null;
			var attName = "class";
			var nodes = null;
			var node = null;
			
			//get the parameters from the JSON configuration
			domIds = config.nodes;
			oldTheme = config.oldTheme;
			newTheme = config.newTheme;
			
			//check for valid values
			if (!Jul.isString(newTheme)) {
				return;
			}
			if (!Jul.isArray(domIds)) {
				domIds = [];
			}
			
			//get the nodes to update
			if (Jul.isString(oldTheme)) {
				spinnerTheme = 'spinner-' + oldTheme + '-only';
				oldThemes = [];
				oldThemes.push(oldTheme);
				oldThemes.push(spinnerTheme);
				for (var i=0;i<oldThemes.length;i++) {
					nodes = document.getElementsByClassName(oldThemes[i]);
					if (Jul.isArray(nodes)) {
						//loop through the nodes
						for (var j=0;j<nodes.length;j++) {
							//get the current node
							node = nodes[j];
							
							//check for a valid id
							if (!Jul.isEmpty(node.id)) {
								if (!Jul.isInArray(node.id,domIds)) {
									domIds.push(node.id);
								}
							}
						}
					}
				}
			}
			
			//create arrays
			spinnerTheme = 'spinner-' + newTheme + '-only';
			newThemes = [];
			newThemes.push(newTheme);
			newThemes.push(spinnerTheme);

			//loop through the items
			for (var i=0;i<domIds.length;i++) {
				domId = domIds[i];
				//check for valid values
				if (!Jul.isInDom(domId)) {
					continue;
				}
				
				//get the current node
				node = Jul.getFromDom(domId);
				
				for (var j=0;j<newThemes.length;j++) {
					//check for an old value
					if (Jul.isArray(oldThemes)) {
						//remove the old value
						if (Jul.hasCss(domId,attName,oldThemes[j])) {
							Jul.removeCss(domId,attName,oldThemes[j]);
						}
					}
					
					//update the attribute
					Jul.setCss(domId,attName,newThemes[j]);
				}
			}
		};
	}
	
	if(typeof Jul.renderModelByName!=='function') {
		Jul.renderModelByName=function(models,modelname,renderto,theme,eventsHandler) {
			//declare locals
			var model = null;
			var modelkey = Jul.getModelKey();
			
			//check for valid values
			if (!Jul.isJson(models)) {
				return;
			}
			if (!Jul.isString(modelname)) {
				return;
			}
			
			//get the model by its name
			model = Jul.getModel(modelname,models,modelkey);
			model.renderto = renderto;
			model.theme = theme;
			
			//invoke the overloaded method
			Jul.renderModel(models,model,eventsHandler);
		};
	}
	
	if(typeof Jul.renderModel!=='function') {
		Jul.renderModel=function(models,model,eventsHandler) {
			//declare locals
			var modelkey = Jul.getModelKey();
			var arrPropName = null;
			var component = null;
			
			//check for valid values
			if (!Jul.isJson(models) || !Jul.isJson(model)) {
				return;
			}
			
			//get the JSON's first array property
			arrPropName = Jul.getFirstJsonArrayProp(model);
			
			//check for valid values
			if (!Jul.isString(arrPropName)) {
				return;
			}
			
			//update the model's refmodel fields
			model = Jul.updateModelRefs(models,model[modelkey]);
			
			//loop through the items
			for (var i=0;i<model[arrPropName].length;i++) {
				//get the current item
				component = model[arrPropName][i];
				
				//set the item's properties
				if (!Jul.isString(component.renderto)) {
					if (Jul.isString(component.type) && (component.type.toLowerCase()!="modal")) {
						component.renderto = model.renderto;
					}
				}
				if (!Jul.isString(component.theme)) {
					component.theme = model.theme;
				}
				
				//render the item
				Jul.renderComponent(component,eventsHandler);
				Jul.attachComponentEvents(component,eventsHandler);
			}
		};
	}
	
	if(typeof Jul.renderComponent!=='function') {
		Jul.renderComponent=function(component,eventsHandler) {
			//declare locals
			var theme = null;
			var comptype = null;
			var julComp = null;
			
			//get the parameters from the JSON configuration
			theme = component.theme;
			
			//check for a valid values
			if (!Jul.isJson(component)) {
				return;
			}
			
			//get the component's type
			comptype = component.type;
			
			//check for valid values
			if (!Jul.isString(comptype)) {
				return;
			}
			
			//fix the type
			comptype = comptype.toLowerCase();
			component.theme = null;
			
			//render the component according to its type
			switch (comptype) {
				case "checkbox":
				case "radio":
					julComp = new Jul.Checkbox(component);
					//julComp = new Jul.Switch(component);
					break;
				case "email":
				case "hidden":
				case "password":
				case "text":
				case "number":
				case "textarea":
					julComp = new Jul.Text(component);
					break;
				case "button":
					component.theme = theme;
					julComp = new Jul.Button(component);
					break;
				case "select":
					julComp = new Jul.Select(component);
					break;
				case "container":
					julComp = new Jul.Container(component);
					break;
				case "hspacer":
					julComp = new Jul.HSpacer(component);
					break;
				case "preloader":
					component.theme = theme;
					julComp = new Jul.Preloader(component);
					break;
				case "modal":
					component.theme = theme;
					julComp = new Jul.Modal(component,eventsHandler);
					break;
			}
			
			//check for valid values
			if (julComp!=null) {
				//render the component
				Jul.render(julComp);
			}
		};
	}
	
	if(typeof Jul.render!=='function') {
		Jul.render=function(julComp) {
			//declare locals
			var parent = null;
			var node = null;
			
			//check for a valid DOM parent
			if (!Jul.isInDom(julComp.config.renderto)) {
				return;
			}
			
			//check for a valid DOM node
			if (Jul.isInDom(julComp.config.id)) {
				//remove the DOM node
				node = Jul.getFromDom(julComp.config.id);
				parent = node.parentNode;
				parent.removeChild(node);
			}
			
			//get the DOM parent
			parent = Jul.getFromDom(julComp.config.renderto);
			
			//render the DOM node
			node = julComp.getDomNode();
			parent.appendChild(node);
		};
	}
	
	if(typeof Jul.getIconHtml!=='function') {
		Jul.getIconHtml=function(config) {
			//declare class members
			var html = '';
			var classes = "material-icons";
			
			//check for valid values
			if (Jul.isEmpty(config)) {
				return html;
			}
			
			//check for valid values
			if (Jul.isString(config.icon)) {
				html += '<i ';
				if (Jul.isEmpty(config.iconposition)) {
					classes += ' left';
				}
				else {
					classes += ' ' + config.iconposition;
				}
				if (Jul.isEmpty(config.iconsize)) {
					classes += ' small';
				}
				else {
					classes += ' ' + config.iconsize;
				}
				html += 'class="' + classes + '"';
				html += '>';
				html += config.icon;
				html += '</i>';
			}
			
			//return the method's value
			return html;
		};
	}
	
	if(typeof Jul.getIconNode!=='function') {
		Jul.getIconNode=function(config) {
			//declare class members
			var node = null;
			var classes = "material-icons";
			
			//check for valid values
			if (Jul.isEmpty(config)) {
				return node;
			}
			
			//check for valid values
			if (Jul.isString(config.icon)) {
				node = document.createElement("i");
				if (Jul.isEmpty(config.iconposition)) {
					classes += ' left';
				}
				else {
					classes += ' ' + config.iconposition;
				}
				if (Jul.isEmpty(config.iconsize)) {
					classes += ' small';
				}
				else {
					classes += ' ' + config.iconsize;
				}
				node.setAttribute("class",classes);
				node.innerHTML = config.icon;
			}
			
			//return the method's value
			return node;
		};
	}
	
	if(typeof Jul.getLabelNode!=='function') {
		Jul.getLabelNode=function(config) {
			//declare class members
			var node = null;
			
			//check for valid values
			if (Jul.isEmpty(config)) {
				return node;
			}
			
			//check for valid values
			if (Jul.isString(config.label)) {
				node = document.createElement("label");
				node.setAttribute("for",config.id);
				node.innerHTML = config.label;
			}
			
			//return the method's value
			return node;
		};
	}
	
	if(typeof Jul.getHelperTextNode!=='function') {
		Jul.getHelperTextNode=function(config) {
			//declare class members
			var node = null;
			var helperText = "helper-text";
			var helperTextError = "helper-text-error";
			var helperTextSuccess = "helper-text-success";
			var helperTextValue = null;
			var helperTextErrorValue = null;
			var helperTextSuccessValue = null;
			
			//check for valid values
			if (Jul.isEmpty(config)) {
				return node;
			}
			
			//get the values
			helperTextValue = config[helperText];
			helperTextErrorValue = config[helperTextError];
			helperTextSuccessValue = config[helperTextSuccess];
			
			//set default values
			if (!Jul.isString(helperTextValue)) {
				helperTextValue = "";
			}
			if (!Jul.isString(helperTextErrorValue)) {
				helperTextErrorValue = "";
			}
			if (!Jul.isString(helperTextSuccessValue)) {
				helperTextSuccessValue = "";
			}
			
			//check for valid values
			if (Jul.isString(config.label)) {
				node = document.createElement("span");
				node.setAttribute("class",helperText);
				node.setAttribute("data-error",helperTextErrorValue);
				node.setAttribute("data-success",helperTextSuccessValue);
				node.innerHTML = helperTextValue;
			}
			
			//return the method's value
			return node;
		};
	}
	
	if(typeof Jul.getCharCounterNode!=='function') {
		Jul.getCharCounterNode=function(config) {
			//declare class members
			var dataLength = "data-length";
			var dataLengthValue = null;
			var node = null;
			
			//check for valid values
			if (Jul.isEmpty(config)) {
				return node;
			}
			
			//get the values
			dataLengthValue = config[dataLength];
			if (Jul.isEmpty(dataLengthValue)) {
				dataLengthValue = config.maxlength;
			}
			
			//check for valid values
			if (!Jul.isEmpty(dataLengthValue)) {
				node = document.createElement("span");
				node.setAttribute("class","character-counter");
				node.setAttribute("style","float: right; font-size: 12px;");
			}
			
			//return the method's value
			return node;
		};
	}
	
	if(typeof Jul.getOptionNode!=='function') {
		Jul.getOptionNode=function(option) {
			//declare locals
			var domNode = null;
			var iconClass = null;
			
			//check for valid values
			if (!Jul.isJson(option)) {
				if (Jul.isString(option)) {
					option = {"label":option,"value":option};
				}
				else {
					return domNode;
				}
			}
			
			//build the DOM node
			domNode = document.createElement("option");
			domNode.value = option.value;
			domNode.text = option.label;
			if (Jul.isString(option.icon)) {
				domNode.setAttribute("data-icon",option.icon);
				if (Jul.isEmpty(option.iconposition)) {
					iconClass = 'left';
				}
				else {
					iconClass = option.iconposition;
				}
				domNode.setAttribute("class",iconClass);
			}
			if (Jul.isTrue(option.disabled)) {
				domNode.setAttribute("disabled","disabled");
			}
			if (Jul.isTrue(option.selected)) {
				domNode.setAttribute("selected","selected");
			}
			
			//return the method's value
			return domNode;
		};
	}
	
	if(typeof Jul.getInputNode!=='function') {
		Jul.getInputNode=function(config) {
			//declare locals
			var classes = null;
			var wrapperNode = null;
			var domNode = null;
			var iconNode = null;
			var labelNode = null;
			var helperTextNode = null;
			var charCounterNode = null;
			
			//build the wrapper node
			wrapperNode = document.createElement("div");
			classes = Jul.getExtraClassesHtml(config);
			if (Jul.isString(classes)) {
				wrapperNode.setAttribute("class",classes);
			}
			
			//build the icon part
			iconNode = Jul.getIconNode(config);
			if (iconNode!=null) {
				wrapperNode.appendChild(iconNode);
			}
			
			//build the base node part
			domNode = config.domNode;
			if (domNode!=null) {
				wrapperNode.appendChild(domNode);
			}
			
			//build the label part
			labelNode = Jul.getLabelNode(config);
			if (labelNode!=null) {
				wrapperNode.appendChild(labelNode);
			}
			
			//build the helper text part
			helperTextNode = Jul.getHelperTextNode(config);
			if (helperTextNode!=null) {
				wrapperNode.appendChild(helperTextNode);
			}
			
			//build the helper text part
			charCounterNode = Jul.getCharCounterNode(config);
			if (charCounterNode!=null) {
				wrapperNode.appendChild(charCounterNode);
			}
			
			//return the method's value
			return wrapperNode;
		};
	}
	
	if(typeof Jul.initComp!=='function') {
		Jul.initComp=function(config,idConfig,excludeProps) {
			//set configuration values
			config.id = (Jul.isString(config.id) ? config.id : Jul.generateId(idConfig));
			config.renderto = (Jul.isString(config.renderto) ? config.renderto : Jul.body());
			config.excludeProps = Jul.getPropsToExclude(excludeProps);
			config.domNode = Jul.json2dom(config);
			
			//return the method's value
			return config;
		};
	}
		
	/* start Jul.Components */
	if(typeof Jul.HSpacer!=='function') {
		Jul.HSpacer=function(config) {
			//declare class members
			this.config = config;
			this.config.tag = "span";
			this.config.defaultClasses = ["hspacer"];
			this.idConfig = {"tag":this.config.tag,"attributeName":"class","attributeValue":"hspacer","searchType":"contains","prefix":"hspacer"};
			this.excludeProps = [];
			this.config = Jul.initComp(this.config,this.idConfig,this.excludeProps);
			
			//declare class methods
			this.getDomNode=function() {
				//return the method's value
				return this.config.domNode;
			};
		};
	}
	
	if(typeof Jul.Container!=='function') {
		Jul.Container=function(config) {
			//declare class members
			this.config = config;
			this.config.tag = "div";
			this.config.defaultClasses = [];
			this.idConfig = {"tag":this.config.tag,"attributeName":"class","attributeValue":"container","searchType":"contains","prefix":"container"};
			this.config.id = (Jul.isString(this.config.id) ? this.config.id : Jul.generateId(this.idConfig));
			this.excludeProps = [];
			this.config = Jul.initComp(this.config,this.idConfig,this.excludeProps);
			
			//declare class methods
			this.getDomNode=function() {
				//return the method's value
				return this.config.domNode;
			};
		};
	}
	
	if(typeof Jul.Button!=='function'){
		Jul.Button=function(config) {
			//declare class members
			this.config = config;
			this.config.tag = "button";
			this.config.defaultClasses = ["btn","waves-effect","waves-light"];
			this.idConfig = {"tag":this.config.tag,"attributeName":"class","attributeValue":"btn","searchType":"contains","prefix":"button"};
			this.excludeProps = ["value"];
			this.config = Jul.initComp(this.config,this.idConfig,this.excludeProps);
			
			//declare class methods
			this.getDomNode=function() {
				//declare locals
				var iconNode = null;
				var textNode = null;
				
				//build the icon part
				iconNode = Jul.getIconNode(config);
				if (iconNode!=null) {
					this.config.domNode.appendChild(iconNode);
				}
				
				//build the label part
				if (Jul.isString(this.config.label)) {
					textNode = document.createTextNode(this.config.label);
					this.config.domNode.appendChild(textNode);
				}
				
				//return the method's value
				return this.config.domNode;
			};
		};
	}
	
	if(typeof Jul.Text!=='function') {
		Jul.Text=function(config) {
			//declare class members
			this.config = config;
			this.config.hasWrapper = true;
			this.config.tag = "input";
			this.config.defaultClasses = ["input-field"];
			this.idConfig = {"tag":this.config.tag,"attributeName":"type","attributeValue":this.config.type,"prefix":this.config.type};
			this.excludeProps = [];
			this.config = Jul.initComp(this.config,this.idConfig,this.excludeProps);
			
			//declare class methods
			this.getDomNode=function() {
				//return the method's value
				return Jul.getInputNode(this.config);
			};
		};
	}
	
	if(typeof Jul.Textarea!=='function') {
		Jul.Textarea=function(config) {
			//declare class members
			this.config = config;
			this.config.hasWrapper = true;
			this.config.tag = "textarea";
			this.config.defaultClasses = ["input-field","materialize-textarea"];
			this.idConfig = {"tag":this.config.tag};
			this.excludeProps = ["value"];
			this.config = Jul.initComp(this.config,this.idConfig,this.excludeProps);
			
			//declare class methods
			this.getDomNode=function() {
				//set the component's value
				if (Jul.isString(this.config.value)) {
					this.config.domNode.innerHTML = this.config.value;
				}
				
				//return the method's value
				return Jul.getInputNode(this.config);
			};
		};
	}
			
	if(typeof Jul.Select!=='function'){
		Jul.Select=function(config) {
			//declare class members
			this.config = config;
			this.config.hasWrapper = true;
			this.config.tag = "select";
			this.config.defaultClasses = ["input-field"];
			this.idConfig = {"tag":this.config.tag};
			this.excludeProps = [];
			this.config = Jul.initComp(this.config,this.idConfig,this.excludeProps);
			
			//declare class methods
			this.getDomNode=function() {
				//declare locals
				var optionsHtml = '';
				
				//build the options part
				options = this.config.options;
				if (Jul.isArray(options)) {
					for (var i=0;i<options.length;i++) {
						option = options[i];
						optionsHtml += Jul.getOptionHtml(option);
					}
				}
				
				//build the input part
				this.config.domNode.innerHTML = optionsHtml;
				
				//return the method's value
				return Jul.getInputNode(this.config);
			};
		};
	}
	
	if(typeof Jul.Checkbox!=='function'){
		Jul.Checkbox=function(config) {
			//declare class members
			this.config = config;
			this.config.hasWrapper = true;
			this.config.tag = "input";
			this.config.defaultClasses = [];
			this.idConfig = {"tag":this.config.tag,"attributeName":"type","attributeValue":this.config.type,"prefix":this.config.type};
			this.excludeProps = [];
			this.config = Jul.initComp(this.config,this.idConfig,this.excludeProps);
			
			//declare class methods
			this.getDomNode=function() {
				//declare locals
				var html = '';
				var wrapperNode = null;
				var iconNode = null;
				var spanNode = null;
				
				//build the wrapper node
				wrapperNode = document.createElement("label");
				
				//build the icon part
				iconNode = Jul.getIconNode(this.config);
				if (iconNode!=null) {
					wrapperNode.appendChild(iconNode);
				}
				
				//append the input node
				wrapperNode.appendChild(this.config.domNode);
				
				//append a span node
				if (Jul.isString(this.config.label)) {
					spanNode = document.createElement("span");
					spanNode.innerHTML = this.config.label;
					wrapperNode.appendChild(spanNode);
				}
				
				//return the method's value
				return wrapperNode;
			};
		};
	}
	
	if(typeof Jul.Switch!=='function') {
		Jul.Switch=function(config) {
			//declare class members
			this.config = config;
			this.config.tag = "div";
			this.config.defaultClasses = ["switch"];
			this.idConfig = {"tag":this.config.tag,"attributeName":"class","attributeValue":"switch","prefix":"switch"};
			this.excludeProps = [];
			this.config = Jul.initComp(this.config,this.idConfig,this.excludeProps);
			
			//declare class methods
			this.getDomNode=function() {
				//declare locals
				var html = '';
				var offlabel = this.config.offlabel;
				var onlabel = this.config.onlabel;
				
				//set default values
				if (!Jul.isString(offlabel)) {
					offlabel = "Off";
				}
				if (!Jul.isString(onlabel)) {
					onlabel = "On";
				}
				
				//build the HTML
				html += '<label>';
				html += offlabel;
				html += '<input id="' + Jul.getSwitchCBPrefix + this.config.id + '" type="checkbox">';
				html += '<span class="lever"></span>';
				html += onlabel;
				html += '</label>';
				
				//set the node's HTML
				this.config.domNode.innerHTML = html;
				
				//return the method's value
				return this.config.domNode;
			};
		};
	}
	
	if(typeof Jul.Preloader!=='function') {
		Jul.Preloader=function(config) {
			//declare class members
			this.config = config;
			this.config.tag = "div";
			this.config.defaultClasses = ["modal","center-align","pw_modal"];
			this.idConfig = {"tag":this.config.tag,"attributeName":"class","attributeValue":"pw_modal","searchType":"contains","prefix":"pleasewait"};
			this.excludeProps = ["text"];
			this.config = Jul.initComp(this.config,this.idConfig,this.excludeProps);
			
			//declare class methods
			this.getDomNode=function() {
				//declare locals
				var html = '';
				var theme = null;
				var displayType = null;
				
				//check for a valid DOM node
				if (Jul.isInDom(this.config.id)) {
					return this.config.domNode;
				}
				
				//set defaults if necessary
				theme = Jul.getTheme(this.config);
				displayType = Jul.getPreloaderDisplayType(this.config);
				Jul.removeClass(this.config.id,theme);
				
				//build the modal's contents
				html += '<div class="modal-content">';
				if (Jul.isString(this.config.text)) {
					html += '<h5>' + this.config.text + '</h5>';
				}
				if (displayType=="spinner") {
					html += '<div class="preloader-wrapper active center-align">';
					html += '<div id="' + this.config.id + '_spinner" class="spinner-layer spinner-' + theme + '-only">';
					html += '<div class="circle-clipper left">';
					html += '<div class="circle"></div>';
					html += '</div>';
					html += '<div class="gap-patch">';
					html += '<div class="circle"></div>';
					html += '</div>';
					html += '<div class="circle-clipper right">';
					html += '<div class="circle"></div>';
					html += '</div>';
					html += '</div>';
					html += '</div>';
				}
				else if (displayType=="linear") {
					html += '<div class="progress">';
					html += '<div id="' + this.config.id + '_linear" class="indeterminate ' + theme + '"></div>';
					html += '</div>';
				}
				html += '</div>';
				
				//add the HTML to the DOM node
				this.config.domNode.innerHTML = html;
				
				//return the method's value
				return this.config.domNode;
			};
		};
	}
	
	if(typeof Jul.Modal!=='function') {
		Jul.Modal=function(config,eventsHandler) {
			//declare class members
			this.config = config;
			this.eventsHandler = eventsHandler;
			this.buttonsPosition = Jul.getModalButtonsPosition(this.config);
			this.config.tag = "div";
			this.config.defaultClasses = ["modal","modal-fixed-"+this.buttonsPosition,"jul_modal"];
			this.idConfig = {"tag":this.config.tag,"attributeName":"class","attributeValue":"modal","searchType":"contains","prefix":"modal"};
			this.excludeProps = [];
			this.config = Jul.initComp(this.config,this.idConfig,this.excludeProps);
			
			//declare class methods
			this.getDomNode=function() {
				//declare locals
				var html = '';
				var theme = null;
				var domcontentid = null;
				var header = null;
				var buttons = null;
				var buttonsPosition = null;
				var button = null;
				
				//check for a valid DOM node
				if (Jul.isInDom(this.config.id)) {
					return this.config.domNode;
				}
				
				//get the parameters from the JSON configuration
				theme = Jul.getTheme(this.config);
				domcontentid = this.config.id + Jul.getModalContentSuffix();
				header = this.config.header;
				buttons = this.config.buttons;
				buttonsPosition = Jul.getModalButtonsPosition(this.config);

				//fix the modal's buttons array
				buttons = Jul.fixModalButtons(this.config.id,buttons,theme);

				//build the html
				html += '<div id="' + this.config.id + '_header_wrapper" class="modal-header';
				if (buttonsPosition=="footer") {
					html += ' ' + theme;
				}
				html += '">';
				if (buttonsPosition=="header") {
					html += '<div class="row valign-wrapper">';
					html += '<div class="col s7">';
					//add icon
					html += Jul.getIconHtml(this.config);
					html += '<span class="hpsacer"></span>';
					//add header text
					html += '<h4 id="' + this.config.id + Jul.getModalHeaderSuffix() + '">' + header + '</h4>';
					html += '</div>';
					html += '<div class="col s5">';
					html += Jul.renderModalButtons(this.config.id,buttons,theme);
					html += '</div>';
					html += '</div>';
				}
				else {
					//add icon
					html += Jul.getIconHtml(this.config);
					html += '<span class="hpsacer"></span>';
					//add header text
					html += '<h4 id="' + this.config.id + Jul.getModalHeaderSuffix() + '">' + header + '</h4>';
				}
				html += '</div>';
				
				html += '<div id="' + domcontentid + '" class="modal-content">';
				html += '</div>';
				
				if (buttonsPosition=="footer") {
					html += '<div id="' + this.config.id + '_footer" class="modal-footer">';
					html += Jul.renderModalButtons(this.config.id,buttons,theme);
					html += '</div>';
				}
				
				//add the HTML to the DOM node
				this.config.domNode.innerHTML = html;
				
				//attach modal events
				for (var i=0;i<buttons.length;i++) {
					button = buttons[i];
					Jul.attachComponentEvents(button,this.eventsHandler);
				}
				
				//return the method's value
				return this.config.domNode;
			};
		};
	}
	
	if(typeof Jul.fixModalButtons!=='function') {
		Jul.fixModalButtons=function(modalid,buttons,theme) {
			//declare locals
			var button = null;
			
			//check for valid values
			if (Jul.isInDom(modalid) && Jul.isArray(buttons) && Jul.isString(theme)) {
				for (var i=0;i<buttons.length;i++) {
					button = buttons[i];
					if (!Jul.isString(button.id)) {
						button.id = modalid+'_btn_'+i;
					}
					button.type = "button";
					button.theme = theme;
					
					//update the array
					buttons[i] = button;
				}
			}
			
			//return the method's value
			return buttons;
		};
	}
	
	if(typeof Jul.renderModalButtons!=='function') {
		Jul.renderModalButtons=function(modalid,buttons,theme) {
			//declare locals
			var html = '';
			var button = null;
			
			//check for valid values
			if (Jul.isInDom(modalid) && Jul.isArray(buttons) && Jul.isString(theme)) {
				for (var i=0;i<buttons.length;i++) {
					button = buttons[i];
					if (!Jul.isString(button.id)) {
						button.id = modalid+'_btn_'+i;
					}
					button.type = "button";
					button.theme = theme;
					
					//update the array
					buttons[i] = button;
					
					//render the current button
					if (i>0) {
						html += '<span class="hpsacer"></span>';
					}
					html += Jul.renderComponent(button);
				}
			}
			
			//return the method's value
			return html;
		};
	}
	/* end Jul.Components */
	
	if(typeof Jul.init!=='function') {
		Jul.init=function() {
			//declare locals
	    	var elems = null;
	    	var options = null;
	    	var instances = null;
	    	
			//initialize materialize
			//M.AutoInit();
	    	
			//initialize all components
	    	$('input[maxlength],textarea[maxlength]').characterCounter();
	    	elems = document.querySelectorAll('select');
	    	options = {
				"classes":'' 				//Classes to be added to the select wrapper element.
				,"dropdownOptions":{} 		//Pass options object to select dropdown initialization.
	    	};
	    	instances = M.FormSelect.init(elems,options);
	    	
	        elems = document.querySelectorAll('.tooltipped');
	    	options = {
    			"exitDelay":0 				//Delay time before tooltip disappears.
    			,"enterDelay":200 			//Delay time before tooltip appears.
    			,"html":null 				//Can take regular text or HTML strings.
    			,"margin":5 				//Set distance tooltip appears away from its activator excluding transitionMovement.
    			,"inDuration":300 			//Enter transition duration.
    			,"outDuration":250 			//Exit transition duration.
    			,"position":'bottom' 		//Set the direction of the tooltip. 'top', 'right', 'bottom', 'left'.
    			,"transitionMovement":10 	//Amount in px that the tooltip moves during its transition. 
	    	};
	        instances = M.Tooltip.init(elems,options);
	        
	        elems = document.querySelectorAll('.datepicker');
	        options = {
        		"autoClose":false 							//Automatically close picker when date is selected.
        		,"format":'mmm dd, yyyy' 					//The date output format for the input field value.
        		,"parse":null 								//Used to create date object from current input string.
        		,"defaultDate":null 						//The initial date to view when first opened.
        		,"setDefaultDate":false 					//Make the defaultDate the initial selected value.
        		,"disableWeekends":false 					//Prevent selection of any date on the weekend.
        		,"disableDayFn":null 						//Custom function to disable certain days.
        		,"firstDay":0 								//First day of week (0: Sunday, 1: Monday etc).
        		,"minDate":null 							//The earliest date that can be selected.
        		,"maxDate":null 							//The latest date that can be selected.
        		,"yearRange":10 							//Number of years either side, or array of upper/lower range.
        		,"isRTL":false 								//Changes Datepicker to RTL.
        		,"showMonthAfterYear":false 				//Show month after year in Datepicker title.
        		,"showDaysInNextAndPreviousMonths":false 	//Render days of the calendar grid that fall in the next or previous month.
        		,"container":null 							//Specify a DOM element to render the calendar in, by default it will be placed before the input.
        		,"showClearBtn":false 						//Show the clear button in the datepicker.
        		,"i18n": {} 								//See i18n documentation. Internationalization options.
        		,"events":[] 								//An array of string returned by `Date.toDateString()`, indicating there are events in the specified days.
        		,"onSelect":null 							//Callback function when date is selected, first parameter is the newly selected date.
        		,"onOpen":null 								//Callback function when Datepicker is opened.
        		,"onClose":null 							//Callback function when Datepicker is closed.
        		,"onDraw":null 								//Callback function when Datepicker HTML is refreshed.
	        };
	        instances = M.Datepicker.init(elems, options);
	        
	        elems = document.querySelectorAll('.timepicker');
	        options = {
        		"duration":350 			//Duration of the transition from/to the hours/minutes view.
        		,"container":null 		//Specify a selector for a DOM element to render the calendar in, by default it will be placed before the input.
        		,"showClearBtn":false 	//Show the clear button in the Timepicker.
        		,"defaultTime":'now' 	//Default time to set on the timepicker 'now' or '13:14'
        		,"fromNow":0 			//Millisecond offset from the defaultTime.
        		,"i18n":{} 				//See i18n documentation. 	Internationalization options.
        		,"autoClose":false 		//Automatically close picker when minute is selected.
        		,"twelveHour":true 		//Use 12 hour AM/PM clock instead of 24 hour clock.
        		,"vibrate":true 		//Vibrate device when dragging clock hand.
        		,"onOpenStart":null 	//Callback function called before modal is opened.
        		,"onOpenEnd":null 		//Callback function called after modal is opened.
        		,"onCloseStart":null 	//Callback function called before modal is closed.
        		,"onCloseEnd":null 		//Callback function called after modal is closed.
        		,"onSelect":null 		//Callback function when a time is selected, first parameter is the hour and the second is the minute.	        		
	        };
	        instances = M.Timepicker.init(elems, options);
	        
	        elems = document.querySelectorAll('.autocomplete');
	        options = {
        		"data":{} 				//Data object defining autocomplete options with optional icon strings.
        		,"limit":null 			//Limit of results the autocomplete shows.
        		,"onAutocomplete":null 	//Callback for when autocompleted.
        		,"minLength":1 			//Minimum number of characters before autocomplete starts.
        		,"sortFunction":null 	//Sort function that defines the order of the list of autocomplete options.	        		
	        };
	        instances = M.Autocomplete.init(elems, options);
	        
	        elems = document.querySelectorAll('.chips');
	        options = {
        		"data":[] 					//Set the chip data (look at the Chip data object)
        		,"placeholder":'' 			//Set first placeholder when there are no tags.
        		,"secondaryPlaceholder":'' 	//Set second placeholder when adding additional tags.
        		,"autocompleteOptions":{} 	//Set autocomplete options.
        		,"limit":null 				//Set chips limit.
        		,"onChipAdd":null 			//Callback for chip add.
        		,"onChipSelect":null 		//Callback for chip select.
        		,"onChipDelete":null 		//Callback for chip delete.	        		
	        };
	        instances = M.Chips.init(elems, options);
	        
	        elems = document.querySelectorAll('.collapsible');
	        options = {
        		"accordion":true 		//If accordion versus collapsible.
        		,"onOpenStart":null 	//Callback function called before collapsible is opened.
        		,"onOpenEnd":null 		//Callback function called after collapsible is opened.
        		,"onCloseStart":null 	//Callback function called before collapsible is closed.
        		,"onCloseEnd":null 		//Callback function called after collapsible is closed.
        		,"inDuration":300 		//Transition in duration in milliseconds.
        		,"outDuration":300 		//Transition out duration in milliseconds.	        		
	        };
	        instances = M.Collapsible.init(elems, options);
	        
	        elems = document.querySelectorAll('.dropdown-trigger');
	        options = {
        		"alignment":'left' 		//Defines the edge the menu is aligned to.
        		,"autoTrigger":true 	//If true, automatically focus dropdown el for keyboard.
        		,"constrainWidth":true 	//If true, constrainWidth to the size of the dropdown activator.
        		,"container":null 		//Provide an element that will be the bounding container of the dropdown.
        		,"coverTrigger":true 	//If false, the dropdown will show below the trigger.
        		,"closeOnClick":true 	//If true, close dropdown on item click.
        		,"hover":false 			//If true, the dropdown will open on hover.
        		,"inDuration":150 		//The duration of the transition enter in milliseconds.
        		,"outDuration":250 		//The duration of the transition out in milliseconds.
        		,"onOpenStart":null 	//Function called when dropdown starts entering.
        		,"onOpenEnd":null 		//Function called when dropdown finishes entering.
        		,"onCloseStart":null 	//Function called when dropdown starts exiting.
        		,"onCloseEnd":null 		//Function called when dropdown finishes exiting.	        		
	        };
	        instances = M.Dropdown.init(elems, options);
	        
	    	elems = document.querySelectorAll('.modal');
	    	options = { 
				"opacity":0.5 				//Opacity of the modal overlay.
				,"inDuration":250 			//Transition in duration in milliseconds.
				,"outDuration":250 			//Transition out duration in milliseconds.
				,"onOpenStart":null 		//Callback function called before modal is opened.
				,"onOpenEnd":null 			//Callback function called after modal is opened.
				,"onCloseStart":null 		//Callback function called before modal is closed.
				,"onCloseEnd":null 			//Callback function called after modal is closed.
				,"preventScrolling":true 	//Prevent page from scrolling while modal is open.
				,"dismissible":false 		//Allow modal to be dismissed by keyboard or overlay click.
				,"startingTop":'4%' 		//Starting top offset
				,"endingTop":'10%' 			//Ending top offset
	    	};
	    	instances = M.Modal.init(elems,options);	    	
		};
	}
	
	if(!this.Jul.eventsManager){
		this.Jul.eventsManager = new Jul.EventsPublisher();
	}
	if(!this.Jul.eventsMap){
		this.Jul.eventsMap = [];
	}
	
}());
