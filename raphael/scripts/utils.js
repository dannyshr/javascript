
if(!this.Utils){this.Utils={};}
(function(){
	if(typeof Utils.isBoolean!=='function'){
		Utils.isBoolean=function(object) {
			//returns true if it is a boolean
			if (typeof object=="boolean") {
				return true;
			}
			
			//returns true if it is a boolean string
			if (typeof object == "string") {
				if (object=="true" || object=="false") {
					return true;
				}
			}
			
			//returns true if it is a boolean number
			if (typeof object=="number") {
				if (object==0 || object==1) {
					return true;
				}
			}
			
			//return the method's value
			return false;
		};
	}
	
	if(typeof Utils.isArray!=='function'){
		Utils.isArray=function(object) {
			//check for a boolean type
			if (typeof object=="boolean") {
				return false;
			}
			
			//check for nulls
			if (object==null || object=="undefined" || object=="") {
				return false;
			}

			//returns true if it is an array
			if (object.constructor.toString().toLowerCase().indexOf("array") == -1) {
				return false;
			}
			
			//return the method's value
			return true;
		};
	}

	if(typeof Utils.isEmpty!=='function'){
		Utils.isEmpty=function(object) {
			//declare locals
			var _empty = false;

			//check for a boolen value
			if (this.isBoolean(object)) {
				return false;
			}

			//check for nulls
			if (object==null || object=="undefined") {
				return true;
			}

			//check the type of the object
			if (typeof object == "string") {
				if (object=="" || object=="null") {
					return true;
				}
			}

			//check for an array
			if (this.isArray(object)) {
				//check the length
				if (object.length<1) {
					return true;
				}
				
				//loop through the array
				for (var i=0;i<object.length;i++) {
					//invoke the method recursively
					_empty = this.isEmpty(object[i]);
					if (_empty==false) {
						break;
					}
				}
				
				//check for an empty input
				if (_empty==true) {
					return true;
				}
				
				//return the method's value
				return false;
			}

			//loop through a string's characters
			if (typeof object == "string") {
				if (object.length) {
					for (var i=0;i<object.length;i++) {
						if (object[i]!=" ") {
							_empty = false;
							break;
						}
					}
				}
			}

			//check for an empty input
			if (_empty==true) {
				return true;
			}

			//return the method's value
			return false;
		};
	}
	
	if(typeof Utils.trim!=='function'){
		Utils.trim=function(string) {
			//declare locals
			var _retVal = null;
			var _findPattern = /^\s+|\s+$/g;
			var _replacePattern = "";
			
			//sert the return value
			_retVal = string;
			
			//check for a String type
			if (typeof string=="string") {
				//check for an empty string
				if (this.isEmpty(string)) {
					return _retVal;
				}
				
				//remove leading and tailing spaces
				_retVal = _retVal.replace(_findPattern,_replacePattern);
			}
			
			//return the method's value
			return _retVal;
		};
	}
	
	if(typeof Utils.isInArray!=='function'){
		Utils.isInArray = function(item,array) {
			//declare locals
			var _retVal = false;
			var _currItem = null;
			
			//check for an item
			if (this.isEmpty(item)) {
				return false;
			}
			
			//check for an array type
			if (!this.isArray(array)) {
				return false;
			}
			
			//loop through the array
			for (var i=0;i<array.length;i++) {
				//get the current item
				_currItem = array[i];
				
				//check for nulls
				if (this.isEmpty(_currItem)) {
					continue;
				}
				
				//check the item's type
				if (typeof item=="string") {
					//compare the items
					if (_currItem.toLowerCase()==item.toLowerCase()) {
						_retVal = true;
						break;
					}
				}
				else {
					//compare the items
					if (_currItem==item) {
						_retVal = true;
						break;
					}
				}
			}
			
			//return the method's value
			return _retVal;
		};
	}
	
	if(typeof Utils.parseBoolean!=='function'){
		Utils.parseBoolean=function(booleanValue) {
			//check for a boolean type
			if (typeof booleanValue=="boolean") {
				return booleanValue;
			}
			
			//check for nulls
			if (this.isEmpty(booleanValue)) {
				return false;
			}
			
			//check for a string type
			if (typeof booleanValue!="string") {
				return false;
			}
			
			//check the value
			if (booleanValue.toLowerCase()=="true") {
				return true;
			}
			
			//return the method's value
			return false;
		};
	}
	
	if(typeof Utils.parseNumber!=='function'){
		Utils.parseNumber=function(number) {
			//declare locals
			var _retVal = 0;
			var _indexSuffix = -1;
			
			//check for a numeric type
			if (typeof number=="number") {
				return number;
			}
			
			//check for a non-string type
			if (typeof number!="string") {
				return _retVal;
			}
			
			//assume the type is string
			
			//check for nulls
			if (this.isEmpty(number)) {
				return _retVal;
			}
			
			//check for a numeric string
			if (!isNaN(number)) {
				//check for a floating point
				if (number.indexOf(".")!=-1) {
					_retVal = parseFloat(number);
				}
				else {
					_retVal = parseInt(number);
				}
				
				//return the method's value
				return _retVal;
			}
			
			//check for a valid suffix
			if (number.toLowerCase().indexOf("em")==-1 && number.toLowerCase().indexOf("ex")==-1
				&& number.toLowerCase().indexOf("px")==-1 && number.toLowerCase().indexOf("in")==-1
				&& number.toLowerCase().indexOf("cm")==-1 && number.toLowerCase().indexOf("mm")==-1
				&& number.toLowerCase().indexOf("pt")==-1 && number.toLowerCase().indexOf("pc")==-1
				&& number.indexOf("%")==-1) {
				return _retVal;
			}
			
			//get the number's suffix
			_indexSuffix = number.toLowerCase().indexOf("px");
			if (_indexSuffix==-1) {
				_indexSuffix = number.toLowerCase().indexOf("em");
				if (_indexSuffix==-1) {
					_indexSuffix = number.toLowerCase().indexOf("ex");
					if (_indexSuffix==-1) {
						_indexSuffix = number.toLowerCase().indexOf("in");
						if (_indexSuffix==-1) {
							_indexSuffix = number.toLowerCase().indexOf("cm");
							if (_indexSuffix==-1) {
								_indexSuffix = number.toLowerCase().indexOf("mm");
								if (_indexSuffix==-1) {
									_indexSuffix = number.toLowerCase().indexOf("pt");
									if (_indexSuffix==-1) {
										_indexSuffix = number.toLowerCase().indexOf("pc");
										if (_indexSuffix==-1) {
											_indexSuffix = number.indexOf("%");
										}		
									}		
								}		
							}		
						}		
					}		
				}		
			}		
			
			//parse the number from its suffix
			if (_indexSuffix!=-1) {
				_retVal = number.substring(0,_indexSuffix);
			}
			_retVal = parseInt(_retVal);
			
			//return the method's value
			return _retVal;
		};
	}
	
	if(typeof Utils.generateId!=='function'){
		Utils.generateId = function(tagName,identifier) {
			//declare locals
			var nodes = null;
			var idPrefix = identifier;
			var returnValue = "";
			var currId = null;
			var idType = "id";
			var counter = 0;
			
			//get elements by their tag name
			nodes = document.getElementsByTagName(tagName);
			
			//check for an identifier
			if (this.isEmpty(idPrefix)) {
				idPrefix = tagName;
			}
			
			//check for nulls
			if (nodes==null) {
				returnValue = idPrefix + "1";
			}
			else if (nodes.length<1) {
				returnValue = idPrefix + "1";
			}
			else {
				//check for an identifier
				if (!this.isEmpty(identifier)) {
					//parse the id from the identifier
					idPrefix = identifier;
					if (idPrefix.indexOf(".")==0) {
						idPrefix = idPrefix.substring(1);
						idType = "class";
					}
					else if (idPrefix.indexOf("#")==0) {
						idPrefix = idPrefix.substring(1);
					}
					
					//loop through the nodes
					for (var i=0;i<nodes.length;i++) {
						//get the current id
						if (idType=="id") {
							currId = nodes[i].id;
						}
						else if (idType=="class") {
							currId = nodes[i].className;
						}
						
						//compre the current node's id
						if (currId==idPrefix) {
							//increment the counter
							counter++;
						}
					}
				}
				returnValue = idPrefix + (counter + 1);
			}
			
			//return the method's value
			return returnValue;
		};
	}
	
	if(typeof Utils.elementExists!=='function'){
		Utils.elementExists = function(id) {
			//declare locals
			var elementObj = null;
			
			//get the element by its id
			elementObj = document.getElementById(id);
			
			//check for nulls
			if (elementObj==null) {
				//do nothing
				return false;
			}
			
			//return the method's value
			return true;
		};
	}
	
	if(typeof Utils.createElement!=='function'){
		Utils.createElement = function(tagName,id,parentTagId) {
			//declare locals
			var elementObj = null;
			var bodyObj = null;
			var _parentTagId = parentTagId;
			var parentTagNodes = null;
			var parentTagObj = null;
			
			//check for nulls
			if (this.isEmpty(tagName)) {
				return null;
			}
			if (this.isEmpty(id)) {
				return null;
			}
			if (this.isEmpty(_parentTagId)) {
				_parentTagId = "body";
			}
			
			//check if the element exists
			elementObj = document.getElementById(id);
			if (elementObj!=null) {
				//clean any previous children
				$('#' + id).children().remove();
				return elementObj;
			}
			
			//get a reference to the parent element
			if (_parentTagId=="body") {
				parentTagObj = document.getElementsByTagName(_parentTagId)[0];
			}
			else {
				parentTagObj = document.getElementById(_parentTagId);
			}
			
			//check for nulls
			if (parentTagObj==null) {
				return null;
			}
			
			//create a new element
			elementObj = document.createElement(tagName);
			elementObj.setAttribute("id",id);
			
			//append the element to the parent tag
			parentTagObj.appendChild(elementObj);
			
			//return the method's value
			return elementObj;
		};
	}
	
	if(typeof Utils.formatNumber!=='function'){
		Utils.formatNumber = function(number,precision) {
			return Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision);
		};
	}
	
	if(typeof Utils.parseFileName!=='function'){
		Utils.parseFileName = function(filePath) {
			//declare locals
			var PATH_DELIMITER = "/";
			var PATH_DELIMITER2 = "\\";
			var pathIndex = -1;
			var pathIndex2 = -1;
			var retVal = "";
			
			//check for nulls
			if (this.isEmpty(filePath)) {
				return null;
			}
			
			//check for a delimiter
			pathIndex = filePath.lastIndexOf(PATH_DELIMITER);
			if (pathIndex==-1) {
				pathIndex2 = filePath.lastIndexOf(PATH_DELIMITER2);
				if (pathIndex2==-1) {
					return filePath;
				}
			}
			
			//parse the file name from the path
			if (pathIndex!=-1) {
				retVal = filePath.substring(pathIndex);
			}
			if (pathIndex2!=-1) {
				retVal = filePath.substring(pathIndex2+1);
			}
			
			//return the method's value
			return retVal;
		};
	}
	
	if(typeof Utils.stringToArray!=='function'){
		Utils.stringToArray = function(string,itemsDdelimiter) {
			//declare locals
			var DEFAULT_DELIMITER = ",";
			var dataDelimiter = itemsDdelimiter;
			var delimiterIndex = -1;
			var dataArray = null;
			
			//check for nulls
			if (this.isEmpty(string)) {
				return null;
			}
			
			//check for the correct type
			if (typeof string != "string") {
				return null;
			}
			
			//check if the string is long enough
			if (string.length<1) {
				return null;
			}
			
			//set defaults if necessary
			if (utils.isEmpty(dataDelimiter)) {
				dataDelimiter = DEFAULT_DELIMITER;
			}
			
			//get the delimiter's index
			delimiterIndex = string.indexOf(dataDelimiter);
			
			//check for a delimiter
			if (delimiterIndex==-1) {
				dataArray = new Array(string);
			}
			else {
				//split the string into an array
				dataArray = string.split(dataDelimiter);
			}
			
			//return the method's value
			return dataArray;
		};
	}
	
	if(typeof Utils.stringToKeyValueArray!=='function'){
		Utils.stringToKeyValueArray = function(string,itemsDdelimiter) {
			//declare locals
			var DEFAULT_DELIMITER = ":";
			var dataDelimiter = itemsDdelimiter;
			var dataArray = null;
			
			//set defaults if necessary
			if (this.isEmpty(dataDelimiter)) {
				dataDelimiter = DEFAULT_DELIMITER;
			}
			
			//parse the string into a key value array
			dataArray = this.stringToArray(string,dataDelimiter);
			
			//return the method's value
			return dataArray;
		};
	}
	
	if(typeof Utils.loadFile!=='function'){
		Utils.loadFile = function(fileName,onloadSuccess) {
			//declare locals
			var methodName = "loadDataFile(): ";
			
			//check for nulls
			if (this.isEmpty(fileName)) {
				return;
			}
			
			$.ajax(fileName,{
				type:'GET'
				,success: function(data,status,response) {
					//declare locals
					var responseText = null;
					
					//get the response
					responseText = response.responseText;
					
					//check for nulls
					if (responseText!=null) {
						//invoke the onsuccess method
						if ((typeof onloadSuccess)=="function") {
							onloadSuccess(responseText);
						}
						else {
							eval(onloadSuccess+"("+responseText+")");
						}
					}
				}
				,failure: function(data) {
					alert(methodName + "Failed to load file [" + fileName + "]");
				}
				,error: function(request, type, errorThrown) {
					//declare locals
					var responseText = request.responseText;
					var msg = null;
					
					//check for nulls
					if (responseText=="undefined" || responseText==null || responseText=="") {
						msg = methodName + "Error while trying to load file [" + fileName + "]";
						msg += "\nrequest.status=" + request.status  + "\nerrorThrown=" + errorThrown;
						alert(msg);
						return;
					}
					
					//invoke the onsuccess method
					if ((typeof onloadSuccess)=="function") {
						onloadSuccess(responseText);
					}
					else {
						eval(onloadSuccess+"("+responseText+")");
					}
				}					
			});
		};
	}
	
	if(typeof Utils.getCompWidth!=='function'){
		Utils.getCompWidth = function(compId) {
			//declare locals
			var compObj = null;
			var returnValue = 0;
			
			//get elements by the ir ids
			compObj = document.getElementById(compId);
			
			//check for nulls
			if (compObj==null) {
				return returnValue;
			}
			
			//set the return value
			returnValue = parseInt(compObj.getAttribute("width"));
			
			//return the method's value
			return returnValue;
		};
	}
	
	if(typeof Utils.getCompHeight!=='function'){
		Utils.getCompHeight = function(compId) {
			//declare locals
			var compObj = null;
			var returnValue = 0;
			
			//get elements by the ir ids
			compObj = document.getElementById(compId);
			
			//check for nulls
			if (compObj==null) {
				return returnValue;
			}
			
			//set the return value
			returnValue = parseInt(compObj.getAttribute("height"));
			
			//return the method's value
			return returnValue;
		};
	}
	
	if(typeof Utils.resizeComponentHeight!=='function'){
		Utils.resizeComponentHeight = function(componentId,topDelta,borders) {
			//declare locals
			var winHeight = 0;
			var _topDelta = topDelta;
			var _borders = borders;
			var compHeight = 0;
			
			//check for nulls
			if (this.isEmpty(componentId)) {
				return;
			}
			
			//check if the component exists
			if (document.getElementById(componentId)==null) {
				return;
			}
			
			//set defaults if necessary
			if (this.isEmpty(_topDelta)) {
				_topDelta = 0;
			}
			if (this.isEmpty(_borders)) {
				_borders = 2;
			}
			
			//get the window's height
			winHeight = $(window).height();
			
			//calculate the component's new height
			compHeight = winHeight - (_topDelta + _borders);
			
			//set the component's height
			$("#" + componentId).css("height",compHeight+"px");
		};
	}
	
	if(typeof Utils.resizeComponentWidth!=='function'){
		Utils.resizeComponentWidth = function(componentId,leftDelta,borders) {
			//declare locals
			var winWidth = 0;
			var _leftDelta = leftDelta;
			var _borders = borders;
			var compWidth = 0;
			
			//check for nulls
			if (this.isEmpty(componentId)) {
				return;
			}
			
			//check if the component exists
			if (document.getElementById(componentId)==null) {
				return;
			}
			
			//set defaults if necessary
			if (this.isEmpty(_leftDelta)) {
				_leftDelta = 0;
			}
			if (this.isEmpty(_borders)) {
				_borders = 2;
			}
			
			//get the window's width
			winWidth = $(window).width();
			
			//calculate the component's new width
			compWidth = winWidth - (_leftDelta + _borders);
			
			//set the component's width
			$("#" + componentId).css("width",compWidth+"px");
		};
	}
	
	if(typeof Utils.resizeComponent!=='function'){
		Utils.resizeComponent = function(componentId,topDelta,leftDelta,borders) {
			//declare locals
			var _topDelta = topDelta;
			var _leftDelta = leftDelta;
			var _borders = borders;
			
			//set defaults if necessary
			if (this.isEmpty(_topDelta)) {
				_topDelta = 0;
			}
			if (this.isEmpty(_leftDelta)) {
				_leftDelta = 0;
			}
			if (this.isEmpty(_borders)) {
				_borders = 2;
			}
			
			//invoke the correct methods
			this.resizeComponentHeight(componentId,_topDelta,_borders);
			this.resizeComponentWidth(componentId,_leftDelta,_borders);
		};
	}
	
}());
