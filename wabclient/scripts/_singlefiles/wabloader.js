
if(typeof WabClient!=='function'){
/**
 * A WabClient component
 * @param _config - An array containing the configuration options 
 * @return A WabClient component
 */
function WabClient() {
	//declare component members
	this._lib = [
        "_uibase"
	    ,"button"
	    ,"footer"
	    ,"header"
	    ,"label"
	    ,"panel"
	];
	
	//declare component methods
	this._isLoaded = function() {
		//declare locals
		var _loaded = true;
		var _scriptTag = "script";
		var _arrScriptTags = null;
		var _currLibItem = null;
		var _currLibItemFound = false;
		var _currScriptTag = null;
		var _currScriptSrc = null;
		
		//get all script tags
		_arrScriptTags = document.getElementsByTagName(_scriptTag);
		
		//check for nulls
		if (_arrScriptTags==null || _arrScriptTags.length<1) {
			alert("wab.js._isLoaded(): No script tags found!!");
			return false;
		}
		
		//loop through the library items
		for (var i=0;i<this._lib.length;i++) {
			//get the current item
			_currLibItem = this._lib[i];
			
			//reset the found flag
			_currLibItemFound = false;
			
			//loop through the tags
			for (var j=0;j<_arrScriptTags.length;j++) {
				//get the current tag
				_currScriptTag = _arrScriptTags[j];
				
				//get the current tag's src attribute value
				_currScriptSrc = _currScriptTag.src;
				
				//check for nulls
				if (_currScriptSrc==null || _currScriptSrc=="undefined" || _currScriptSrc=="") {
					continue;
				}
				
				//check if the src attribute contains the current library item
				if (_currScriptSrc.indexOf(_currLibItem)!=-1) {
					_currLibItemFound = true;
					break;
				}
			}
			
			//check the found flag
			if (_currLibItemFound==false) {
				_loaded = false;
				break;
			}
			
		}		
		
		//return the method's value
		return _loaded;
	};
	this._getScriptsPath = function() {
		//declare locals
		var _path = null;
		var _scriptTag = "script";
		var _arrScriptTags = null;
		var _currScriptTag = null;
		var _currScriptSrc = null;
		var _indexPath = null;
		
		//get all script tags
		_arrScriptTags = document.getElementsByTagName(_scriptTag);
		
		//check for nulls
		if (_arrScriptTags==null || _arrScriptTags.length<1) {
			alert("wab.js._getScriptsPath(): No script tags found!!");
			return false;
		}
		
		//loop through the tags
		for (var i=0;i<_arrScriptTags.length;i++) {
			//get the current tag
			_currScriptTag = _arrScriptTags[i];
			
			//get the current tag's src attribute value
			_currScriptSrc = _currScriptTag.src;
			
			//check for nulls
			if (_currScriptSrc==null || _currScriptSrc=="undefined" || _currScriptSrc=="") {
				continue;
			}
			
			//check if the src attribute contains the current library item
			_indexPath = _currScriptSrc.indexOf("wab.js");
			if (_indexPath!=-1) {
				//get the script's path
				_path = _currScriptSrc.substring(0,_indexPath);
				break;
			}
		}
		
		//return the method's value
		return _path;
	};
	this._init = function() {
		//declare locals
		var _loaded = false;
		var _scriptTag = "script";
		var _arrScriptTags = null;
		var _currLibItem = null;
		var _parent = null;
		var _scriptComp = null;
		var _scriptSrcPath = null;
		
		//check if the library is loaded
		_loaded = this._isLoaded();
		if (_loaded==true) {
			return;
		}
		
		//get all script tags
		_arrScriptTags = document.getElementsByTagName(_scriptTag);
		
		//check for nulls
		if (_arrScriptTags==null || _arrScriptTags.length<1) {
			alert("wab.js._init(): No script tags found!!");
			return;
		}
		
		//get the first script's parent node (the <head> tag)
		_parent = _arrScriptTags[0].parentNode;
		
		//check for nulls
		if (_parent==null || _parent=="undefined") {
			alert("wab.js._init(): _parent is empty or null!!");
			return;
		}
		
		//get the scripts source path
		_scriptSrcPath = this._getScriptsPath();
		 
		//loop through the library items
		for (var i=0;i<this._lib.length;i++) {
			//get the current item
			_currLibItem = this._lib[i];
			
			//create a new script tag
			_scriptComp = document.createElement(_scriptTag);
			_scriptComp.setAttribute("type","text/javascript");
			_scriptComp.setAttribute("src",_scriptSrcPath+_currLibItem+".js");
			
			//add the newly created script to the parent's NodeList
			_parent.appendChild(_scriptComp);
		}
	};
};
};
//initialize the component
var __uiClient = new WabClient();
__uiClient._init();
