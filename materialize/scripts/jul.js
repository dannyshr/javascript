
if(!this.Jul) {
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
			if (!Jul.isString(json.buttonsPosition)) {
				return defaultValue;
			}
			else {
				if (json.buttonsPosition.toLowerCase()!="header" && json.buttonsPosition.toLowerCase()!="footer") {
					return defaultValue;
				}
				else {
					return json.buttonsPosition.toLowerCase();
				}
			}
		};
	}
	
	if(typeof Jul.getCollapsibleDirection!=='function') {
		Jul.getCollapsibleDirection=function(json) {
			//declare locals
			var defaultValue = "right2left";
			var value = null;
			
			//check for valid values
			if (!Jul.isString(json.collapseDirection)) {
				value = defaultValue;
			}
			else {
				switch (json.collapseDirection.toLowerCase()) {
					case "left2right":
					case "right2left":
					case "bottom2top":
					case "top2bottom":
						value = json.collapseDirection.toLowerCase();
						break;
					default:
						value = defaultValue;
						break;
				}
			}
			
			//return the method's value
			return value;
		};
	}
	
	if(typeof Jul.getDefalutCollapseDuration!=='function') {
		Jul.getDefalutCollapseDuration=function() {
			return "2";
		};
	}
	
	if(typeof Jul.getModelNameComponentsTypes!=='function') {
		Jul.getModelNameComponentsTypes=function() {
			return "materialize_components";
		};
	}
	
	if(typeof Jul.getModelNameHtml4Atts!=='function') {
		Jul.getModelNameHtml4Atts=function() {
			return "html4_global_attributes";
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
	
	if(typeof Jul.getModalButtonsSuffix!=='function') {
		Jul.getModalButtonsSuffix=function() {
			return "_buttons";
		};
	}
	
	if(typeof Jul.getWrapperSuffix!=='function') {
		Jul.getWrapperSuffix=function() {
			return "_wrapper";
		};
	}
	
	if(typeof Jul.getIconSuffix!=='function') {
		Jul.getIconSuffix=function() {
			return "_icon";
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
	
	if(typeof Jul.bodyTag!=='function') {
		Jul.bodyTag=function() {
			return "body";
		};
	}
	
	if(typeof Jul.getIconMainClassName!=='function') {
		Jul.getIconMainClassName=function() {
			return "material-icons";
		};
	}
	
	if(typeof Jul.getSwitchCBPrefix!=='function') {
		Jul.getSwitchCBPrefix=function() {
			return "cb_";
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
	
	if(typeof Jul.getSwitchLabel!=='function') {
		Jul.getSwitchLabel=function(attName,on) {
			//declare locals
			var arrAttsNames = [
				"checked"
				,"disabled"
				,"multiple"
				,"on"
				,"readonly"
				,"selected"
				,"show"
				,"true"
			];
			var arrAttsNamesOff = [
				"unchecked"
				,"disabled"
				,"single"
				,"off"
				,"readonly"
				,"unselected"
				,"hide"
				,"false"
			];
			var arrAttsNamesOn = [
				"checked"
				,"ensabled"
				,"multiple"
				,"on"
				,"editabled"
				,"selected"
				,"show"
				,"true"
			];
			var value = null;
			var index = -1;
			
			//check for valid values
			if (!Jul.isString(string)) {
				if (Jul.isTrue(on)) {
					return "on";
				}
				else {
					return "off"
				}
			}
			
			//get the item's index in the array
			index = Jul.indexOfArray(string, arrAttsNames);
			
			//check for valid values
			if (index==-1) {
				if (Jul.isTrue(on)) {
					return "on";
				}
				else {
					return "off"
				}
			}
			else {
				if (Jul.isTrue(on)) {
					value = arrAttsNamesOn[index];
				}
				else {
					value = arrAttsNamesOff[index];
				}
			}
			
			//return the method's value
			return value;
		};
	}
	
	if(typeof Jul.getPropsToExclude!=='function') {
		Jul.getPropsToExclude=function(exclude,include) {
			//declare locals
			var array = [
				"buttonsPosition"
				,"class"
				,"classes"
				,"collapseDirection"
				,"contentClasses"
				,"contentLayout"
				,"contentStyle"
				,"defaultClasses"
				,"events"
				,"excludeClasses"
				,"excludeProps"
				,"haswrapper"
				,"header"
				,"headerClasses"
				,"headerLayout"
				,"helper-text"
				,"helper-text-error"
				,"helper-text-success"
				,"icon"
				,"iconposition"
				,"iconsize"
				,"id"
				,"includeProps"
				,"label"
				,"layout"
				,"oldid"
				,"options"
				,"renderto"
				,"shadow"
				,"showCollapse"
				,"tag"
				,"theme"
				,"type"
				,"validations"
			];
			var props = Jul.mergeArrays(array,exclude,include);
			
			//return the method's value
			return props;
		};
	}
	
	if(typeof Jul.getJson2HtmlMapper!=='function') {
		Jul.getJson2HtmlMapper=function(jsonPropName) {
			//declare locals
			var array = [
				{"json":["data-length","maxlength"],"htmlatt":"maxlength"}
				,{"json":["title","tooltip"],"htmlatt":"data-tooltip"}
				,{"json":["titleposition","tooltipposition"],"htmlatt":"data-position"}
			];
			var attNameKey = "json";
			var attNameToReturn = "htmlatt";
			var mapItem = null;
			
			//invoke the generic method
			mapItem = Jul.getJsonMapperValue(array,attNameKey,jsonPropName,attNameToReturn);
			
			//return the method's value
			return mapItem;
		};
	}
	
	if(typeof Jul.getCompTypeMapper!=='function') {
		Jul.getCompTypeMapper=function(materialzeType) {
			//declare locals
			var array = [
				{"materialzeType":["button"],"compType":"button"}
				,{"materialzeType":["checkbox"],"compType":"checkbox"}
				,{"materialzeType":["collapsible"],"compType":"collapsible"}
				,{"materialzeType":["container"],"compType":"container"}
				,{"materialzeType":["hspacer"],"compType":"hspacer"}
				,{"materialzeType":["input"],"compType":"input"}
				,{"materialzeType":["color","date ","datetime-local","email","hidden","number","password","range","search","tel","text","time"],"compType":"input"}
				,{"materialzeType":["list"],"compType":"list"}
				,{"materialzeType":["radio"],"compType":"radio"}
				,{"materialzeType":["range"],"compType":"range"}
				,{"materialzeType":["switch"],"compType":"switch"}
				,{"materialzeType":["textarea"],"compType":"textarea"}
				,{"materialzeType":["textnode"],"compType":"textnode"}
			];
			var attNameKey = "materialzeType";
			var attNameToReturn = "compType";
			var mapItem = null;
			
			//invoke the generic method
			mapItem = Jul.getJsonMapperValue(array,attNameKey,materialzeType,attNameToReturn);
			
			//return the method's value
			return mapItem;
		};
	}
	
	if(typeof Jul.getJulTypeMapper!=='function') {
		Jul.getJulTypeMapper=function(json,eventsHandler) {
			//declare locals
			var comptype = null;
			var theme = null;
			var julComp = null;
			
			//check for valid values
			if (!Jul.isJson(json)) {
				return julComp;
			}
			
			//get JSON parameters
			comptype = json.type;
			theme = json.theme;
			
			//check for valid values
			if (!Jul.isString(comptype)) {
				return julComp;
			}
			
			//set values
			comptype = comptype.toLowerCase();
			json.theme = null;
			
			//check the component's type
			switch(comptype) {
				case "button":
					json.theme = theme;
					julComp = new Jul.Button(json);
					break;
				case "checkbox":
				case "radio":
					julComp = new Jul.Checkbox(json);
					break;
				case "collapsible":
					json.theme = theme;
					julComp = new Jul.Collapsible(json);
					break;
				case "container":
					julComp = new Jul.Container(json);
					break;
				case "hspacer":
					julComp = new Jul.HSpacer(json);
					break;
				case "icon":
					julComp = new Jul.Icon(json);
					break;
				case "color":
				case "date":
				case "datetime-local":
				case "email":
				case "hidden":
				case "number":
				case "password":
				case "range":
				case "search":
				case "tel":
				case "text":
				case "time":
					julComp = new Jul.Text(json);
					break;
				case "modal":
					json.theme = theme;
					julComp = new Jul.Modal(json,eventsHandler);
					break;
				case "preloader":
					json.theme = theme;
					julComp = new Jul.Preloader(json);
					break;
				case "range":
					julComp = new Jul.Range(json);
					break;
				case "select":
					julComp = new Jul.Select(json);
					break;
				case "switch":
					julComp = new Jul.Switch(json);
					break;
				case "textarea":
					julComp = new Jul.Textarea(json);
					break;
				case "textnode":
					julComp = new Jul.Textnode(json);
					break;
				default:
					julComp = new Jul.Container(json);
					break;
			}
			
			//return the method's value
			return julComp;
		};
	}
	
	if(typeof Jul.getComponentConfigMapper!=='function') {
		Jul.getComponentConfigMapper=function(name,config) {
			//declare locals
			var array = [
				{"name":["button"],"hasWrapper":false,"tag":"button","defaultClasses":["btn","waves-effect","waves-light"],"idConfig":{"tag":"","attributeName":"class","attributeValue":"btn","searchType":"contains","prefix":"button"},"excludeProps":["value"],"includeProps":[],"excludeClasses":[],"includeClasses":[config.size]}
				,{"name":["checkbox"],"hasWrapper":true,"tag":"input","defaultClasses":["input-field"],"idConfig":{"tag":"","attributeName":"type","attributeValue":config.type,"prefix":config.type},"excludeProps":[],"includeProps":["type"],"excludeClasses":[],"includeClasses":[]}
				,{"name":["collapsible"],"hasWrapper":false,"tag":"div","defaultClasses":["collapsible_panel row"],"idConfig":{"tag":"","attributeName":"id","attributeValue":"collapsible","searchType":"contains","prefix":"collapsible"},"excludeProps":[],"includeProps":[],"excludeClasses":[config.theme],"includeClasses":[]}
				,{"name":["container"],"hasWrapper":false,"tag":"div","defaultClasses":["_container"],"idConfig":{"tag":"","attributeName":"id","attributeValue":"container","searchType":"contains","prefix":"container"},"excludeProps":[],"includeProps":[],"excludeClasses":[],"includeClasses":[]}
				,{"name":["hspacer"],"hasWrapper":false,"tag":"span","defaultClasses":["hspacer"],"idConfig":{"tag":"","attributeName":"class","attributeValue":"hspacer","searchType":"contains","prefix":"hspacer"},"excludeProps":[],"includeProps":[],"excludeClasses":[],"includeClasses":[]}
				,{"name":["icon"],"hasWrapper":false,"tag":"i","defaultClasses":[Jul.getIconMainClassName()],"idConfig":{"tag":"","attributeName":"class","attributeValue":Jul.getIconMainClassName(),"searchType":"contains","prefix":"icon"},"excludeProps":[],"includeProps":[],"excludeClasses":[],"includeClasses":[]}
				,{"name":["modal"],"hasWrapper":false,"tag":"div","defaultClasses":["modal","modal-fixed-"+Jul.getModalButtonsPosition(config),"jul_modal"],"idConfig":{"tag":"","attributeName":"class","attributeValue":"modal","searchType":"contains","prefix":"modal"},"excludeProps":["buttonsPosition"],"includeProps":[],"excludeClasses":[config.theme],"includeClasses":[]}
				,{"name":["preloader"],"hasWrapper":false,"tag":"div","defaultClasses":["modal","center-align","pw_modal"],"idConfig":{"tag":"","attributeName":"class","attributeValue":"pw_modal","searchType":"contains","prefix":"pleasewait"},"excludeProps":["text"],"includeProps":[],"excludeClasses":[config.theme],"includeClasses":[]}
				,{"name":["range"],"hasWrapper":true,"tag":"input","defaultClasses":["range-field"],"idConfig":{"tag":"","attributeName":"type","attributeValue":"range","prefix":"range"},"excludeProps":[],"includeProps":["type"],"excludeClasses":[config.theme],"includeClasses":[]}
				,{"name":["select"],"hasWrapper":true,"tag":"select","defaultClasses":["input-field"],"idConfig":{"tag":""},"excludeProps":[],"includeProps":[],"excludeClasses":[],"includeClasses":[]}
				,{"name":["switch"],"hasWrapper":false,"tag":"div","defaultClasses":["switch"],"idConfig":{"tag":"","attributeName":"class","attributeValue":"switch","prefix":"switch"},"excludeProps":[],"includeProps":["type"],"excludeClasses":[config.theme],"includeClasses":[]}
				,{"name":["text"],"hasWrapper":true,"tag":"input","defaultClasses":["input-field"],"idConfig":{"tag":"","attributeName":"type","attributeValue":config.type,"prefix":config.type},"excludeProps":[],"includeProps":["type"],"excludeClasses":[],"includeClasses":[]}
				,{"name":["textarea"],"hasWrapper":true,"tag":"textarea","defaultClasses":["input-field","materialize-textarea"],"idConfig":{"tag":""},"excludeProps":["value"],"includeProps":[],"excludeClasses":[],"includeClasses":[]}
				,{"name":["textnode"],"hasWrapper":false,"tag":"div","defaultClasses":[],"idConfig":{"tag":"","attributeName":"id","attributeValue":"textnode","searchType":"contains","prefix":"textnode"},"excludeProps":[],"includeProps":[],"excludeClasses":[],"includeClasses":[]}
			];
			var attNameKey = "name";
			var mapItem = null;
			
			//invoke the generic method
			mapItem = Jul.getJsonMapperValue(array,attNameKey,name);
			
			//check for valid values
			if (Jul.isJson(mapItem)) {
				config.hasWrapper = mapItem.hasWrapper;
				config.tag = mapItem.tag;
				mapItem.idConfig.tag = config.tag;
				config.defaultClasses = mapItem.defaultClasses;
				config.excludeProps = mapItem.excludeProps;
				config.includeProps = mapItem.includeProps;
				config.excludeClasses = mapItem.excludeClasses;
				config.includeClasses = mapItem.includeClasses;
				config.id = (Jul.isString(config.id) ? config.id : Jul.generateId(mapItem.idConfig));
				config.renderto = (Jul.isString(config.renderto) ? config.renderto : Jul.bodyTag());
			}
			
			//return the method's value
			return config;
		};
	}
	
	if(typeof Jul.getJsonMapperValue!=='function') {
		Jul.getJsonMapperValue=function(array,attNameKey,findValue,attNameToReturn) {
			//declare locals
			var arrItemValues = null;
			var found = false;
			var mapperValue = null;
			
			//check for valid values
			if (!Jul.isArray(array) || !Jul.isString(attNameKey)) {
				return mapperValue;
			}
			
			//loop through the data
			for (var i=0;i<array.length;i++) {
				//get the current item's array
				arrItemValues = array[i][attNameKey];
				
				//check for valid values
				if (!Jul.isArray(arrItemValues) && !Jul.isString(arrItemValues)) {
					continue;
				}
				if (Jul.isString(arrItemValues)) {
					arrItemValues = new Array(arrItemValues);
				}
				
				//check if the item is in the array
				if (Jul.isInArray(findValue,arrItemValues)) {
					if (Jul.isString(attNameToReturn)) {
						mapperValue = array[i][attNameToReturn];
					}
					else {
						mapperValue = array[i];
					}
					break;
				}
			}
			
			//return the method's value
			return mapperValue;
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
				valid = true;
				/*
				try {
					JSON.stringify(json);
					valid = true;
				}
				catch(err) {
					valid = false;
				}
				*/
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
			if (domId.toLowerCase()==Jul.bodyTag()) {
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
			if (domId.toLowerCase()==Jul.bodyTag()) {
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

	if(typeof Jul.setDomValue!=='function'){
		Jul.setDomValue=function(domId,value) {
			//declare locals
			var domObj = null;
			
			//check for nulls
			if (!Jul.isInDom(domId)) {
				return;
			}
			
			//get elements by id
			domObj = document.getElementById(domId);
			
			//set the value
			domObj.value = value;
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
		Jul.indexOfArray=function(item, array, contains) {
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
			if (Jul.isTrue(contains)) {
				contains = true;
			}
			else {
				contains = false;
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
				if (contains==true) {
					if (itemStr.toLowerCase().indexOf(currItem.toLowerCase())!=-1) {
						index = i;
						break;
					}
				}
				else {
					if (itemStr.toLowerCase()==currItem.toLowerCase()) {
						index = i;
						break;
					}
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
			var elem = null;
			
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
				Jul.openModal(preloaderid);
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
						Jul.closeModal(preloaderid);
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
	
	if(typeof Jul.slide!=='function') {
		Jul.slide=function(domId,direction,duration) {
			//declare locals
	    	var attNameIsOpen = "isopen";
	    	var domObj = null;
	        var isopen = null;
	        var initialPos = "0%";
	        
	        //check for valid values
	        if (!Jul.isInDom(domId)) {
	        	return;
	        }
	        
	        //set defaults if necessary
	        if (!Jul.isString(direction)) {
	        	direction = "left";
	        }
	        if (!Jul.isNumeric(duration)) {
	        	duration = "2";
	        }
        	if (typeof duration !== 'string') {
        		duration = String(duration);
        	}
        	duration += "s";
        	
        	//get a reference to the DOM node
        	domObj = Jul.getFromDom(domId);
        	
        	//get the DOM node's attributes
        	isopen = domObj.getAttribute(attNameIsOpen);
	        
	        if (isopen==="true") {
	        	domObj.setAttribute("style",direction+":" + initialPos);
	        	domObj.setAttribute("style","transition-duration:"+duration+";"+direction+":-105% !important");
	        	domObj.setAttribute(attNameIsOpen,"false");
	        }
	        else {
	        	domObj.setAttribute("style",direction+":-105%");
	        	domObj.setAttribute("style","transition-duration:"+duration+";"+direction+":"+initialPos+" !important");
	        	domObj.setAttribute(attNameIsOpen,"true");
	        }
        	domObj.setAttribute("data-slide-dir",direction);
		};
	}
	
	if(typeof Jul.collapse!=='function') {
		Jul.collapse=function(domId,direction,duration,button) {
			//declare locals
	    	var attNameIsCollapsed = "iscollapsed";
	    	var nodeId = domId;
	    	var domObj = null;
	    	var headerNode = null;
	        var iscollapsed = null;
	        var origTop = null;
	        var origLeft = null;
	        var origHeight = null;
	        var origWidth = null;
	        var targetTop = null;
	        var targetLeft = null;
	        var targetHeight = 0;
	        var targetWidth = 0;
	        var json = null;
	        var index = -1;
	        var buttonRotationDegrees = 0;
	        
	        //check for valid values
	        if (!Jul.isInDom(nodeId)) {
	        	return;
	        }
	        
	        //set defaults if necessary
	        if (!Jul.isString(direction)) {
	        	direction = "right2left";
	        }
	        if (!Jul.isNumeric(duration)) {
	        	duration = "2";
	        }
        	if (typeof duration !== 'string') {
        		duration = String(duration);
        	}
        	duration += "s";
        	
        	//check the direction
        	if (direction==="right2left") {
        		nodeId += "_content";
        	}
        	
        	//get a reference to the DOM node
        	domObj = Jul.getFromDom(nodeId);
        	
        	//get the DOM node's attributes
        	iscollapsed = domObj.getAttribute(attNameIsCollapsed);
        	origTop = domObj.offsetTop;
	        if (origTop<0) {
	        	origTop = 0;
	        }
	        origLeft = domObj.offsetLeft;
	        if (origLeft<0) {
	        	origLeft = 0;
	        }
	        origHeight = domObj.clientHeight;
	        origWidth = domObj.clientWidth;
	        
        	if (direction!=="right2left") {
    	        headerNode = Jul.getFromDom(domId+"_header");
    	        if (!Jul.isEmpty(headerNode)) {
    		        targetHeight = headerNode.clientHeight;
    	        }
        	}
	        
	        //build a JSON key and find its index in the map
    		json = {"compid":nodeId,"dir":direction};
			index = Jul.indexOfJson(json,Jul.collapseMap);
    		
	        //set values according to the direction
	        switch (direction) {
	        	case "right2left":
					if (index==-1) {
						Jul.collapseMap.push({"compid":nodeId,"dir":direction,"origHeight":origHeight,"origWidth":origWidth});
					}
					else {
						origWidth = Jul.collapseMap[index].origWidth;
					}
					targetLeft = origLeft;
					targetTop = origTop;
					targetHeight = origHeight;
					break;
	        	case "left2right":
					if (index==-1) {
						Jul.collapseMap.push({"compid":nodeId,"dir":direction,"origLeft":origLeft,"origHeight":origHeight,"origWidth":origWidth});
					}
					else {
						origWidth = Jul.collapseMap[index].origWidth;
						origLeft = Jul.collapseMap[index].origLeft;
					}
					targetLeft = (origLeft + origWidth);
					targetTop = origTop;
					targetHeight = origHeight;
	            	break;
	        	case "bottom2top":
					if (index==-1) {
						Jul.collapseMap.push({"compid":nodeId,"dir":direction,"origHeight":origHeight,"origWidth":origWidth});
					}
					else {
						origHeight = Jul.collapseMap[index].origHeight;
					}
					targetLeft = origLeft;
					targetTop = origTop;
					targetWidth = origWidth;
	            	break;
	        	case "top2bottom":
					if (index==-1) {
						Jul.collapseMap.push({"compid":nodeId,"dir":direction,"origTop":origTop,"origHeight":origHeight,"origWidth":origWidth});
					}
					else {
						origHeight = Jul.collapseMap[index].origHeight;
						origTop = Jul.collapseMap[index].origTop;
					}
					targetTop = (origTop + origHeight); 
					targetLeft = origLeft;
					targetWidth = origWidth;
	            	break;
	        }
	        
	        //set the button's rotation
	        if (!Jul.isEmpty(button)) {
	        	if (Jul.isTrue(iscollapsed)) {
    	        	buttonRotationDegrees = 0;
	        	}
	        	else {
    	        	buttonRotationDegrees = 180;
	        	}
	        }
	        
	      	//check the collapse state
	        if (Jul.isTrue(iscollapsed)) {
        		domObj.setAttribute("style","position:absolute;transition-duration:"+duration+";height:"+origHeight+"px;width:"+origWidth+"px;top:"+origTop+"px;left:"+origLeft+"px !important");
	        	domObj.setAttribute(attNameIsCollapsed,"false");
	        }
	        else {
        		domObj.setAttribute("style","position:absolute;transition-duration:"+duration+";height:"+targetHeight+"px;width:"+targetWidth+"px;top:"+targetTop+"px;left:"+targetLeft+"px !important");
	        	domObj.setAttribute(attNameIsCollapsed,"true");
	        }
	        if (!Jul.isEmpty(button)) {
				button.style.transform="rotate(" + buttonRotationDegrees + "deg)";
	        }
		};
	}
	
	if(typeof Jul.rotate!=='function') {
		Jul.rotate=function(domId,degrees,duration) {
			//declare locals
			var domObj = null;
			var intervalId = null;
			var index = 0;
        	
        	//check for valid values
        	if (!Jul.isInDom(domId)) {
        		return;
        	}
        	
        	//set defaults if necessary
	        if (!Jul.isNumeric(degrees)) {
	        	degrees = "90";
	        }
        	if (typeof degrees !== 'string') {
        		degrees = String(degrees);
        	}
        	degrees = parseInt(degrees);
	        if (!Jul.isNumeric(duration)) {
	        	duration = "2";
	        }
        	if (typeof duration !== 'string') {
        		duration = String(duration);
        	}
        	duration = parseFloat(duration,3);
        	duration = duration * 1000;
        	
        	//set the duration
        	duration = parseInt(duration / degrees);
        	
        	//get a reference to the DOM node
        	domObj = Jul.getFromDom(domId);
        	
        	//clear any previous intervals
			clearInterval(intervalId);
			
			//declare the method
			var _rotate=function() {
				index = index + 1;
				domObj.style.transform="rotate(" + index + "deg)";
				domObj.style.webkitTransform="rotate(" + index + "deg)";
				domObj.style.OTransform="rotate(" + index + "deg)";
				domObj.style.MozTransform="rotate(" + index + "deg)";
				if (index==degrees || index==360) {
					clearInterval(intervalId);
					if (index==360) {
						index=0;
					}
				}
			};
			
			//invoke the method
			intervalId = setInterval("_rotate()",duration);
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
				Jul.setAttribute(domId,attName,attValue);
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
			Jul.setAttribute(domid,"class",value);
		};
	}
	
	if(typeof Jul.setClassByDom!=='function') {
		Jul.setClassByDom=function(domnode,value) {
			//invoke the overloaded method
			Jul.setAttributeByDom(domnode,"class",value);
		};
	}
	
	if(typeof Jul.setAttribute!=='function') {
		Jul.setAttribute=function(domid,attName,attValue) {
			//declare locals
			var domnode = null;
			
			//get the DOM node
			domnode = Jul.getFromDom(domid);
			
			//invoke the overloaded method
			Jul.setAttributeByDom(domnode,attName,attValue);
		};
	}
	
	if(typeof Jul.setAttributeByDom!=='function') {
		Jul.setAttributeByDom=function(domnode,attName,attValue) {
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
				arrValues.push(attValue);
				
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
			if (Jul.isString(newComp.oldid)) {
				index = Jul.getComponentIndex(model,newComp.oldid,idPropName);
				newComp.oldid = null;
			}
			else {
				index = Jul.getComponentIndex(model,newComp[idPropName],idPropName);
			}
			
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
			
			//add the items to add
			if (Jul.isArray(add)) {
				//loop through the data items
				for (var i=0;i<add.length;i++) {
					if (!Jul.isInArray(add[i],data)) {
						data.push(add[i]);
					}
				}
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
			
			//return the method's value
			return data;
		};
	}
	
	if(typeof Jul.getExtraClassesHtml!=='function') {
		Jul.getExtraClassesHtml=function(config,includeClasses,excludeClasses) {
			//declare class members
			var classes = null;
			
			//get the classes as string
			classes = Jul.getExtraClassesArray(config);
			classes = Jul.mergeArrays(classes,includeClasses,excludeClasses);
			classes = Jul.array2string(classes);
			
			//return the method's value
			return classes;
		};
	}
	
	if(typeof Jul.getExtraClassesArray!=='function') {
		Jul.getExtraClassesArray=function(config,arrExtraClassesAtts,ignoreBaseClasses) {
			//declare class members
			var tooltipClass = "tooltipped";
			var arrClassesAtts = [
				{"name":"defaultClasses","type":"array"}
				,{"name":"classes","type":"array"}
				,{"name":"layout","type":"array"}
				,{"name":"theme","type":"string"}
				,{"name":"shadow","type":"string"}
				,{"name":"tooltip","type":"string","defaultValue":tooltipClass}
				,{"name":"title","type":"string","defaultValue":tooltipClass}
			];
			var item = null;
			var arrClasses = [];
			var arrTemp = [];
			var delimiter = " ";
			var value = null;
			
			//check for valid values
			if (!Jul.isJson(config)) {
				return arrClasses;
			}
			if (Jul.isArray(arrExtraClassesAtts)) {
				if (Jul.isTrue(ignoreBaseClasses)) {
					arrClassesAtts = arrExtraClassesAtts;
				}
				else {
					//merge the JSON arrays
					arrClassesAtts = Jul.mergeArrays(arrClassesAtts,arrExtraClassesAtts,null);
				}
			}
			
			//loop through the merged array
			for (var i=0;i<arrClassesAtts.length;i++) {
				//get the current item
				item = arrClassesAtts[i];
				
				//set the item's type if necessary
				if (!Jul.isString(item.type)) {
					item.type = "string";
				}
				else {
					item.type = item.type.toLowerCase();
					if (item.type!=="array" && item.type!=="string") {
						item.type = "string";
					}
				}
				
				//check the item's type
				if (item.type==="array") {
					value = config[item.name];
					arrTemp = Jul.string2array(value,delimiter)
					arrClasses = Jul.mergeArrays(arrClasses,arrTemp,null);
				}
				else if (item.type==="string") {
					value = config[item.name];
					if (Jul.isString(value)) {
						if (Jul.isString(item.defaultValue)) {
							value = item.defaultValue;
						}
						if (!Jul.isInArray(value,arrClasses)) {
							arrClasses.push(value);
						}
					}
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
			var iconNode = null;
			
			//check for valid values
			if (!Jul.isJson(component) || Jul.isEmpty(invoker) || !Jul.isArray(component.events)) {
				return domObj;
			}
			
			//check if the DOM node exists
			domId = component.id;
			if (!Jul.isInDom(domId)) {
				return domObj;
			}
			
			//get the DOM node
			domObj = Jul.getFromDom(domId);
			
			//attach the events to the DOM node
			domObj = Jul.attachDomNodeEvents(domObj,component.events,invoker,detach);
			
			//attach the events to the DOM node's icon
			iconNode = Jul.getIconNodeFromButtonNode(domObj);
			if (!Jul.isEmpty(iconNode)) {
				Jul.attachDomNodeEvents(iconNode,component.events,invoker,detach);
			}
			
			//return the method's value
			return domObj;
		};
	}
	
	if(typeof Jul.attachDomNodeEvents!=='function'){
		Jul.attachDomNodeEvents=function(domNode,events,invoker,detach) {
			//declare locals
			var domId = null;
			var eventItem = null;
			var eventName = null;
			var eventHandlerName = null;
			var eventHandler = null;
			var invokerIndex = -1;
			var eventJson = null;
			var eventIndex = -1;
			
			//check for valid values
			if (Jul.isEmpty(domNode) || !Jul.isArray(events) || Jul.isEmpty(invoker)) {
				return domNode;
			}
			
			//get the node's id
			domId = domNode.id;
			
			//loop through the items
			for (var i=0;i<events.length;i++) {
				//get the current item
				eventItem = events[i];
				
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
					domNode.removeEventListener(eventName);
					
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
					domNode.addEventListener(eventName, function(event) {
						//get the event's component
						event.cancelBubble = true;
						var compid = event.target.id;
						var eventType = event.type;
						var json = {"compid":compid,"event":eventType};
						var index = -1;
						
						//find the event in the map
						index = Jul.indexOfJson(json,Jul.eventsMap);
						
						//check for valid values
						if (index==-1) {
							return domNode;
						}
						
						//invoke the event handler
						Jul.eventsMap[index].handler(invoker,event);
					});
				}
			}
			
			//return the method's value
			return domNode;
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
				html += 'disabled="disabled" ';
			}
			if (Jul.isTrue(option.selected)) {
				html += 'selected="selected" ';
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
		Jul.renderAttributesTable=function(models,component,mode,renderto,modalid,theme) {
			//declare locals
			var genericAttsModelName = Jul.getModelNameHtml4Atts();
			var typeAttsModelName = Jul.getModelNameComponentsTypes();
			var compKeyProp = Jul.getMaterializeComponentKey();
			var attItemKey = Jul.getAttributeKey();
			var arrPropName = null;
			var genericAttsModel = null;
			var typeAttsModel = null;
			var typeAttsComp = null;
			var genericAtts = null;
			var typeAtts = null;
			var compAtts = null;
			var compKey = null;
			var currItem = null;
			var currItemName = null;
			var currItemType = null;
			var currItemValues = null;
			var currItemRefmodel = null;
			var container = null;
			var wrapperDiv = null;
			var domNode = null;
			var parent = null;
			
			//check for valid values
			if (!Jul.isJson(models) || !Jul.isJson(component)) {
				return;
			}
			if (!Jul.isInDom(modalid) || !Jul.isInDom(renderto)) {
				return;
			}
			if (!Jul.isString(mode)) {
				return;
			}
			
			//get the component's name
			if (mode=="create") {
				compKey = component.name;
			}
			else if (mode=="update") {
				//create mode
				compKey = Jul.getCompTypeMapper(component.type);
			}
			
			//check for valid values
			if (!Jul.isString(compKey)) {
				return;
			}
			
			//get all attributes from the components types model
			typeAttsModel = Jul.getModel(typeAttsModelName,models,Jul.getModelKey());
			typeAttsComp = Jul.getComponent(typeAttsModel,compKey,compKeyProp);
			arrPropName = Jul.getFirstJsonArrayProp(typeAttsComp);
			if (!Jul.isString(arrPropName)) {
				return;
			}
			typeAtts = typeAttsComp[arrPropName];
			
			//get generic attributes
			genericAttsModel = Jul.getModel(genericAttsModelName,models,Jul.getModelKey());
			arrPropName = Jul.getFirstJsonArrayProp(genericAttsModel);
			if (!Jul.isString(arrPropName)) {
				return;
			}
			genericAtts = genericAttsModel[arrPropName];
			
			//get the component's attributes
			compAtts = [];
			
			//merge the three arrays
			if (Jul.isArray(typeAtts)) {
				compAtts = Jul.mergeArrays(compAtts,typeAtts,null);
			}
			compAtts = Jul.mergeArrays(compAtts,genericAtts,null);
			
			//sort the attributes array
			compAtts = Jul.sortJsonArray(compAtts,attItemKey);
			
			//remove the theme from the modal
			Jul.removeClass(modalid,theme);

			//render the table as a DOM node
			wrapperDiv = renderto + "_grid";
			
			//check if the DOM node exists
			if (Jul.isInDom(wrapperDiv)) {
				//remove it from the DOM
				domNode = Jul.getFromDom(wrapperDiv);
				parent = domNode.parentNode;
				parent.removeChild(domNode);
			}
			domNode = document.createElement("div");
			domNode.setAttribute("id",wrapperDiv);
			domNode.setAttribute("class","grid striped col s12");
			
			//loop through the items
			for (var i=0;i<compAtts.length;i++) {
				//get the current item
				currItem = compAtts[i];
				
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
				domNode.appendChild(Jul.renderAttributeRow(component,i,currItemName,currItemType,currItemValues,wrapperDiv,theme));
			}
			
			//render the DOM node
			container = Jul.getFromDom(renderto);
			container.appendChild(domNode);
		};
	}
	
	if(typeof Jul.renderAttributeRow!=='function') {
		Jul.renderAttributeRow=function(uicomp,index,name,type,values,renderto,theme) {
			//declare locals
			var domNode = null;
			var wrapperDiv = null;
			var compConfig = null;
			var defaultLayout = "col s12";
			var options = Jul.values2options(values);
			var idConfig = null;
			var attValue = null;
			var julComp = null;
			var compNode = null;
			
			//check for valid values
			if (!Jul.isJson(uicomp) || !Jul.isString(name) || !Jul.isString(type)) {
				return domNode; 
			}
			
			//render row container
			wrapperDiv = renderto + "_row_"+index;
			domNode = document.createElement("div");
			domNode.setAttribute("id",wrapperDiv);
			domNode.setAttribute("class","row grid_row");
			
			//check the component's type
			switch (type) {
				case "list":
				case "mlist":
					compConfig = {
						"type":"select"
						,"id":"cmb_"+name
						,"options":options
					};
					if (type=="mlist") {
						compConfig.multiple = true;
					}
					break;
				case "boolean":
					compConfig = {
						"type":"checkbox"
						,"id":"cb_"+name
						,"theme":theme
					};
					break;
				case "boolean2":
					compConfig = {
						"type":"switch"
						,"id":"switch_"+name
						,"theme":theme
						,"labeloff":Jul.getSwitchLabel(name,false)
						,"labelon":Jul.getSwitchLabel(name,true)
					};
					break;
				case "string":
					compConfig = {
						"type":"text"
						,"id":"txt_"+name
					};
					break;
				case "number":
					compConfig = {
						"type":"number"
						,"id":"num_"+name
					};
					break;
				default:
					compConfig = {
						"type":"container"
						,"id":"div_"+name
					};
					break;
			}
			
			//set default attributes
			compConfig.label = name;
			compConfig.layout = defaultLayout;
			compConfig.renderto = wrapperDiv;
			
			//check for an attribute value
			attValue = uicomp[name];
			if (!Jul.isEmpty(attValue)) {
				if (type==="boolean") {
					compConfig.checked = attValue;
				}
				else {
					compConfig.value = attValue;
				}
			}
			
			//get the correct component
			julComp = Jul.getJulTypeMapper(compConfig);
			
			//render the component into the row
			domNode.appendChild(julComp.getDomNode());
			
			//return the row node
			return domNode; 
		};
	}
	
	if(typeof Jul.attributesTable2ui!=='function') {
		Jul.attributesTable2ui=function(models,model,component,mode) {
			//declare locals
			var genericAttsModelName = Jul.getModelNameHtml4Atts();
			var typeAttsModelName = Jul.getModelNameComponentsTypes();
			var compKeyProp = Jul.getMaterializeComponentKey();
			var attItemKey = Jul.getAttributeKey();
			var arrPropName = null;
			var genericAttsModel = null;
			var typeAttsModel = null;
			var typeAttsComp = null;
			var genericAtts = null;
			var typeAtts = null;
			var compKey = null;
			var compAtts = null;
			var currItem = null;
			var currItemName = null;
			var currItemType = null;
			var currItemValue = null;
			var containerId = null;
			var olddomid = null;
			var domid = null;
			var container = null;
			var domnode = null;
			var parent = null;
			var json = null;
			
			//check for valid values
			if (!Jul.isJson(models) || !Jul.isJson(model) || !Jul.isJson(component)) {
				return json;
			}
			if (!Jul.isString(mode)) {
				return;
			}
			
			//get the component's name
			if (mode=="create") {
				compKey = component.name;
			}
			else if (mode=="update") {
				//update mode
				compKey = Jul.getCompTypeMapper(component.type);
			}
			
			//check for valid values
			if (!Jul.isString(compKey)) {
				return;
			}
			
			//get all attributes from the components types model
			typeAttsModel = Jul.getModel(typeAttsModelName,models,Jul.getModelKey());
			typeAttsComp = Jul.getComponent(typeAttsModel,compKey,compKeyProp);
			arrPropName = Jul.getFirstJsonArrayProp(typeAttsComp);
			if (!Jul.isString(arrPropName)) {
				return json;
			}
			typeAtts = typeAttsComp[arrPropName];
			
			//get generic attributes
			genericAttsModel = Jul.getModel(genericAttsModelName,models,Jul.getModelKey());
			arrPropName = Jul.getFirstJsonArrayProp(genericAttsModel);
			if (!Jul.isString(arrPropName)) {
				return json;
			}
			genericAtts = genericAttsModel[arrPropName];
			
			//get the component's attributes
			compAtts = [];
			
			//merge the three arrays
			if (Jul.isArray(typeAtts)) {
				compAtts = Jul.mergeArrays(compAtts,typeAtts,null);
			}
			compAtts = Jul.mergeArrays(compAtts,genericAtts,null);
			
			//get the container's id and the DOM id
			containerId = document.getElementById("txt_renderto").value;
			if (!Jul.isString(containerId)) {
				containerId = Jul.bodyTag();
			}
			if (!Jul.isInDom(containerId)) {
				return json;
			}
			olddomid = component.id;
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
			json.id = domid;
			json.oldid = olddomid;
			json.modelname = component.modelname;
			
			//loop through the items
			for (var i=0;i<compAtts.length;i++) {
				//get the current item
				currItem = compAtts[i];
				
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
			
			//set the container
			json.renderto = containerId;
			
			//append the node to the DOM
			Jul.renderComponent(json);
			
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
				case "boolean2":
					idPrefix = "switch_"+name;
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
					{"label":emptyText,"value":""}
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
					Jul.setAttribute(domId,attName,newThemes[j]);
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
			var domNode = null;
			
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
					if (Jul.isString(component.type) && (component.type.toLowerCase()=="modal")) {
						component.renderto = Jul.bodyTag();
					}
					else {
						component.renderto = model.renderto;
					}
				}
				if (!Jul.isString(component.theme)) {
					component.theme = model.theme;
				}
				
				//set the model name into the component
				component.modelname = model[modelkey];
				
				//render the item
				Jul.renderComponent(component,eventsHandler);
			}
		};
	}
	
	if(typeof Jul.renderComponent!=='function') {
		Jul.renderComponent=function(json,eventsHandler) {
			//declare locals
			var julComp = null;
			var domNode = null;
			
			//check for a valid values
			if (!Jul.isJson(json)) {
				return domNode;
			}
			
			//get the component
			julComp = Jul.getJulTypeMapper(json,eventsHandler);
			
			//check for valid values
			if (julComp!=null) {
				//render the component
				domNode = Jul.render(julComp);
				
				//attach the component's events
				Jul.attachComponentEvents(json,eventsHandler);
				
				//attach special events
				if (json.type==="modal") {
					var buttons = julComp.getButtons();
					var button = null;
					if (Jul.isArray(buttons)) {
						for (var i=0;i<buttons.length;i++) {
							//attach events to the madal's buttons
							button = buttons[i];
							Jul.attachComponentEvents(button,eventsHandler);
						}						
					}
				}
			}
			
			//return the method's value
			return domNode;
		};
	}
	
	if(typeof Jul.render!=='function') {
		Jul.render=function(julComp) {
			//declare locals
			var parentid = null;
			var parent = null;
			var node = null;
			var oldNode = null;
			
			//check for a valid DOM parent
			if (!Jul.isInDom(julComp.config.renderto)) {
				return node;
			}
			
			//handle an old existing DOM node case
			if (Jul.isString(julComp.config.oldid) && Jul.isString(julComp.config.id) && julComp.config.id!=julComp.config.oldid) {
				if (Jul.isInDom(julComp.config.oldid)) {
					parentid = Jul.getParentId(julComp.config.oldid);
					//check if the node should be removed from its current parent
					if (parentid!=julComp.config.renderto) {
						//remove the old node from the DOM
						node = Jul.getFromDom(julComp.config.oldid);
						parent = node.parentNode;
						oldNode = parent.removeChild(node);
						//get the new DOM parent
						parent = Jul.getFromDom(julComp.config.renderto);
						//render the old node to the new parent
						parent.appendChild(oldNode);
					}
					else {
						//change the DOM node's id
						node = Jul.getFromDom(julComp.config.oldid);
						node.id = julComp.config.id;
					}
				}
			}
			
			//handle an existing DOM node case
			if (Jul.isInDom(julComp.config.id)) {
				parentid = Jul.getParentId(julComp.config.id);
				//check if the node should be removed from its current parent
				if (parentid!=julComp.config.renderto) {
					//remove the old node from the DOM
					node = Jul.getFromDom(julComp.config.id);
					parent = node.parentNode; 
					oldNode = parent.removeChild(node);
					//get the new DOM parent
					parent = Jul.getFromDom(julComp.config.renderto);
					//render the old node to the new parent
					parent.appendChild(oldNode);
				}
			}

			//get the new DOM parent
			parent = Jul.getFromDom(julComp.config.renderto);
			
			//get the DOM node
			node = julComp.getDomNode();
			
			//append it to the parent
			parent.appendChild(node);
			
			//return the method's value
			return node;
		};
	}
	
	if(typeof Jul.getParentId!=='function') {
		Jul.getParentId=function(domid) {
			//declare locals
			var node = null;
			var parent = null;
			var parentid = null;
			
			//check if there is an old node
			if (!Jul.isInDom(domid)) {
				return parentid;
			}
			
			//get the node and its parent from the DOM
			node = Jul.getFromDom(domid);
			parent = node.parentNode;
			
			//get the parent node's id
			parentid = parent.id;
			if (!Jul.isString(parentid)) {
				parentid = parent.nodeName;
				parentid = parentid.toLowerCase();
			}
			
			//return the method's value
			return parentid;
		};
	}
	
	if(typeof Jul.getComponentChildrenIds!=='function') {
		Jul.getComponentChildrenIds=function(models,modelname,findAttValue) {
			//declare locals
			var comps = null;
			var compsIds = null;
			
			//invoke the overloaded method
			comps = Jul.getComponentChildren(models,modelname,findAttValue);
			
			//check for valid values
			if (!Jul.isArray(comps)) {
				return compsIds;
			}
			
			compsIds = [];
			
			//loop through the items
			for (var i=0;i<comps.length;i++) {
				//update the current item
				compsIds.push(comps[i].id);
			}
			
			//return the method's value
			return compsIds;
		};
	}
	
	if(typeof Jul.removeComponentChildren!=='function') {
		Jul.removeComponentChildren=function(models,modelname,findAttValue) {
			//declare locals
			var idPropName = Jul.getComponentKey();
			var compsIds = null;
			
			//invoke the overloaded method
			compsIds = Jul.getComponentChildrenIds(models,modelname,findAttValue);
			
			//check for valid values
			if (!Jul.isArray(compsIds)) {
				return;
			}
			
			//loop through the items
			for (var i=0;i<compsIds.length;i++) {
				//remove the current item
				Jul.removeComp(models,modelname,compsIds[i],idPropName);
			}
		};
	}
	
	if(typeof Jul.getComponentChildren!=='function') {
		Jul.getComponentChildren=function(models,modelname,findAttValue) {
			//declare locals
			var findAttName = "renderto";
			var model = null;
			var comps = null;
			
			//get the model by its name
			model = Jul.getModel(modelname,models,Jul.getModelKey());
			
			//invoke the overloaded method
			comps = Jul.findComponentsByValue(model,findAttName,findAttValue);
			
			//return the method's value
			return comps;
		};
	}
	
	if(typeof Jul.updateModelComponents!=='function') {
		Jul.updateModelComponents=function(models,modelname,findAttName,findAttValue,newAttValue) {
			//declare locals
			var model = null;
			
			//get the model by its name
			model = Jul.getModel(modelname,models,Jul.getModelKey());
			
			//invoke the overloaded method
			Jul.updateComponents(model,findAttName,findAttValue,newAttValue);
		};
	}
	
	if(typeof Jul.updateComponents!=='function') {
		Jul.updateComponents=function(model,findAttName,findAttValue,newAttValue) {
			//declare locals
			var comps = null;
			
			//check for valid values
			if (!Jul.isJson(model) || !Jul.isString(findAttName)) {
				return;
			}
			
			//find the components which meet the criteria
			comps = Jul.findComponentsByValue(model,findAttName,findAttValue);
			
			//check for valid values
			if (!Jul.isArray(comps)) {
				return;
			}
			
			//loop through the items
			for (var i=0;i<comps.length;i++) {
				//update the current item
				comps[i][findAttName] = newAttValue;
			}
		};
	}
	
	if(typeof Jul.findComponentsByName!=='function') {
		Jul.findComponentsByName=function(model,attName) {
			//declare locals
			var comps = null;
			var arrayProp = null;
			var currComp = null;
			var found = false;
			
			//check for valid values
			if (!Jul.isJson(model) || !Jul.isString(attName)) {
				return comps;
			}
			
			//get the model's array property name
			arrayProp = Jul.getFirstJsonArrayProp(model);
			if (!Jul.isString(arrayProp)) {
				return comps;
			}
			
			//create an array for the return value
			comps = [];
			
			//loop through the items
			for (var i=0;i<model[arrayProp].length;i++) {
				//get the current item
				currComp = model[arrayProp][i];
				
				//loop through the component's attributes
				found = false;
				for (var prop in currComp) {
					if (prop==attName) {
						found = true;
						break;
					}
				}
				
				//check the flag
				if (found==true) {
					//add the current item to the array
					comps.push(currComp);
				}
			}
			
			//return the method's value
			return comps;
		};
	}
	
	if(typeof Jul.findComponentsByValue!=='function') {
		Jul.findComponentsByValue=function(model,attName,attValue) {
			//declare locals
			var comps = null;
			var arrayProp = null;
			var currComp = null;
			var currValue = null;
			
			//check for valid values
			if (!Jul.isJson(model) || !Jul.isString(attName)) {
				return comps;
			}
			
			//get the model's array property name
			arrayProp = Jul.getFirstJsonArrayProp(model);
			if (!Jul.isString(arrayProp)) {
				return comps;
			}
			
			//create an array for the return value
			comps = [];
			
			//loop through the items
			for (var i=0;i<model[arrayProp].length;i++) {
				//get the current item
				currComp = model[arrayProp][i];
				
				//look for the attribute
				if (Jul.isEmpty(currComp[attName])) {
					continue;
				}
				
				//compare the attribute values
				currValue = currComp[attName];
				if ((typeof currValue === typeof attValue) && (currValue==attValue)) {
					//add the current item to the array
					comps.push(currComp);
				}
			}
			
			//return the method's value
			return comps;
		};
	}
	
	if(typeof Jul.sortJsonArray!=='function') {
		Jul.sortJsonArray=function(jsonArray,sortBy) {
			//declare locals
			var sorted = jsonArray;
			var arrValues = null;
			var item = null;
			var index = -1;
			
			//check for valid values
			if (!Jul.isJson(sorted)) {
				return sorted;
			}
			if (!Jul.isString(sortBy)) {
				return sorted;
			}
			
			//loop through the JSON array
			arrValues = [];
			for (var i=0;i<jsonArray.length;i++) {
				//get the current item
				item = jsonArray[i];
				
				for (var prop in item) {
					//check if its the sort by attribute
					if (prop==sortBy) {
						//add the JSON's attribute value to the array
						arrValues.push(item[prop]);
						break;
					}
				}
			}
			
			//sort the array
			arrValues = arrValues.sort();
			sorted = [];
			
			//loop through the array
			for (var i=0;i<arrValues.length;i++) {
				//get the sorted item's index in the JSON array
				item = {};
				item[sortBy] = arrValues[i];
				index = Jul.indexOfJson(item,jsonArray);
				
				//check for a valid index
				if (index==-1) {
					continue;
				}
				
				//add the JSON item to the returned sorted JSON array
				sorted.push(jsonArray[index]);
			}
			
			
			//return the method's value
			return sorted;
		};
	}
	
	if(typeof Jul.openModal!=='function') {
		Jul.openModal=function(modalid) {
			//declare locals
			var modal = null;
			
			//check for valid values
			if (!Jul.isInDom(modalid)) {
				return;
			}
			
			//get the modal
			modal = M.Modal.getInstance(Jul.getFromDom(modalid));
			
			//open the modal
			modal.open();
		};
	}
	
	if(typeof Jul.closeModal!=='function') {
		Jul.closeModal=function(modalid) {
			//declare locals
			var modal = null;
			
			//check for valid values
			if (!Jul.isInDom(modalid)) {
				return;
			}
			
			//get the modal
			modal = M.Modal.getInstance(Jul.getFromDom(modalid));
			
			//close the modal
			modal.close();
		};
	}	
	
	if(typeof Jul.getIconHtml!=='function') {
		Jul.getIconHtml=function(config) {
			//declare class members
			var classes = Jul.getIconMainClassName();
			var html = '';
			var nodeId = null;
			
			//check for valid values
			if (Jul.isEmpty(config)) {
				return html;
			}
			if (!Jul.isString(config.icon)) {
				return html;
			}
			
			//set the node's id
			nodeId = config.id+Jul.getIconSuffix();
			
			//build the HTML
			html += '<i ';
			html += 'id="' + nodeId + '" ';
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
			
			//return the method's value
			return html;
		};
	}
	
	if(typeof Jul.getIconNode!=='function') {
		Jul.getIconNode=function(config) {
			//declare class members
			var classes = Jul.getIconMainClassName();
			var node = null;
			var nodeId = null;
			
			//check for valid values
			if (Jul.isEmpty(config)) {
				return node;
			}
			if (!Jul.isString(config.icon)) {
				return node;
			}
			
			//set the node's id
			nodeId = config.id+Jul.getIconSuffix();
			if (Jul.isInDom(nodeId)) {
				node = Jul.getFromDom(nodeId);
			}
			else {
				node = document.createElement("i");
				node.setAttribute("id",nodeId);
			}
			
			//get the node from the DOM
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
			
			//return the method's value
			return node;
		};
	}
	
	if(typeof Jul.getIconNodeFromButtonNode!=='function') {
		Jul.getIconNodeFromButtonNode=function(buttonNode) {
			//declare class members
			var node = null;
			var buttonId = null;
			var currChild = null;
			var classes = Jul.getIconMainClassName();
			
			//check for valid values
			if (Jul.isEmpty(buttonNode)) {
				return node;
			}
			buttonId = buttonNode.id;
			if (!Jul.isInDom(buttonId)) {
				return node;
			}
			
			//check for child nodes
			if (!buttonNode.hasChildNodes()) {
				return node;
			}
			
			//loop through the children
			for (var i=0;i<buttonNode.childNodes.length;i++) {
				currChild = buttonNode.childNodes[i];
				
				//check for a valid node
				if (currChild.nodeType==1) {
					if (Jul.hasCssByDom(currChild,"class",classes)) {
						node = currChild;
						break;
					}
				}
			}
			
			//return the method's value
			return node;
		};
	}
	
	if(typeof Jul.getLabelNode!=='function') {
		Jul.getLabelNode=function(config) {
			//declare class members
			var NODE_SUFFIX = "_label";
			var node = null;
			var nodeId = null;
			
			//check for valid values
			if (Jul.isEmpty(config)) {
				return node;
			}
			if (!Jul.isString(config.label)) {
				return node;
			}
			
			//get the node from the DOM
			nodeId = config.id + NODE_SUFFIX;
			if (Jul.isInDom(nodeId)) {
				node = Jul.getFromDom(nodeId);
			}
			else {
				node = document.createElement("label");
				node.setAttribute("id",nodeId);
			}
			
			//set the node's attributes
			node.setAttribute("for",config.id);
			node.innerHTML = config.label;
			
			//return the method's value
			return node;
		};
	}
	
	if(typeof Jul.getHelperTextNode!=='function') {
		Jul.getHelperTextNode=function(config) {
			//declare class members
			var NODE_SUFFIX = "_helper";
			var node = null;
			var nodeId = null;
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
			if (!Jul.isString(config[helperText])) {
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
			
			//get the node from the DOM
			nodeId = config.id + NODE_SUFFIX;
			if (Jul.isInDom(nodeId)) {
				node = Jul.getFromDom(nodeId);
			}
			else {
				node = document.createElement("span");
				node.setAttribute("id",nodeId);
			}
			
			//set the node's attributes
			node.setAttribute("class",helperText);
			node.setAttribute("data-error",helperTextErrorValue);
			node.setAttribute("data-success",helperTextSuccessValue);
			node.innerHTML = helperTextValue;
			
			//return the method's value
			return node;
		};
	}
	
	if(typeof Jul.getCharCounterNode!=='function') {
		Jul.getCharCounterNode=function(config) {
			//declare class members
			var NODE_SUFFIX = "_counter";
			var dataLength = "data-length";
			var dataLengthValue = null;
			var node = null;
			var nodeId = null;
			
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
			if (Jul.isEmpty(dataLengthValue)) {
				return node;
			}
			
			//get the node from the DOM
			nodeId = config.id + NODE_SUFFIX;
			if (Jul.isInDom(nodeId)) {
				node = Jul.getFromDom(nodeId);
			}
			else {
				node = document.createElement("span");
				node.setAttribute("id",nodeId);
			}
			
			//set the node's attributes
			node.setAttribute("class","character-counter");
			node.setAttribute("style","float: right; font-size: 12px;");
			
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
		Jul.getInputNode=function(config,baseDomNode) {
			//declare locals
			var nodeId = null;
			var classes = null;
			var wrapperNode = null;
			var iconNode = null;
			var labelNode = null;
			var helperTextNode = null;
			var charCounterNode = null;
			
			//get the node from the DOM
			nodeId = config.id + Jul.getWrapperSuffix();
			if (Jul.isInDom(nodeId)) {
				wrapperNode = Jul.getFromDom(nodeId);
			}
			else {
				wrapperNode = document.createElement("span");
				wrapperNode.setAttribute("id",nodeId);
			}
			
			//set the wrapper node's class
			classes = Jul.getExtraClassesHtml(config,config.includeClasses,config.excludeClasses);
			if (Jul.isString(classes)) {
				wrapperNode.setAttribute("class",classes);
			}
			
			//build the icon part
			iconNode = Jul.getIconNode(config);
			if (iconNode!=null) {
				if (!Jul.isInDom(iconNode.id)) {
					wrapperNode.appendChild(iconNode);
				}
			}
			
			//build the base node part
			if (baseDomNode!=null) {
				if (!Jul.isInDom(baseDomNode.id)) {
					wrapperNode.appendChild(baseDomNode);
				}
			}
			
			//build the label part
			labelNode = Jul.getLabelNode(config);
			if (labelNode!=null) {
				if (!Jul.isInDom(labelNode.id)) {
					wrapperNode.appendChild(labelNode);
				}
			}
			
			//build the helper text part
			helperTextNode = Jul.getHelperTextNode(config);
			if (helperTextNode!=null) {
				if (!Jul.isInDom(helperTextNode.id)) {
					wrapperNode.appendChild(helperTextNode);
				}
			}
			
			//build the helper text part
			charCounterNode = Jul.getCharCounterNode(config);
			if (charCounterNode!=null) {
				if (!Jul.isInDom(charCounterNode.id)) {
					wrapperNode.appendChild(charCounterNode);
				}
			}
			
			//return the method's value
			return wrapperNode;
		};
	}
	
	if(typeof Jul.json2dom!=='function') {
		Jul.json2dom=function(json,excludeProps) {
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
			exclude = excludeProps;
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
				classes = Jul.getExtraClassesHtml(json,json.includeClasses,json.excludeClasses);
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
	
	if(typeof Jul.getBaseDomNode!=='function') {
		Jul.getBaseDomNode=function(config) {
			//declare locals
			var arrExcludePrpos = null;
			var baseDomNode = null;
			
			//set the return value
			arrExcludePrpos = Jul.getPropsToExclude(config.excludeProps,config.includeProps);
			baseDomNode = Jul.json2dom(config,arrExcludePrpos);
			
			//return the method's value
			return baseDomNode;
		};
	}
	
	if(typeof Jul.mergeConfig!=='function') {
		Jul.mergeConfig=function(config,newConfig) {
			//loop through the configuration's properties
			for (var prop in newConfig) {
				if (newConfig.hasOwnProperty(prop)) {
					//save the new property's value
					config[prop] = newConfig[prop];
				}
			}
			
			//return the method's value
			return config;
		};
	}
	
	/* start Jul.Components */
	if(typeof Jul.HSpacer!=='function') {
		Jul.HSpacer=function(config) {
			//declare class members
			this.config = Jul.getComponentConfigMapper("HSpacer",config);
			
			//declare class methods
			this.getConfig=function() {
				return this.config;
			};
			this.setConfig=function(newConfig) {
				this.config = Jul.mergeConfig(this.config,newConfig);
			};
			this.getDomNode=function() {
				//declare locals
				var baseDomNode = null;
				
				//get the base DOM node
				baseDomNode = Jul.getBaseDomNode(this.config);
				
				//return the method's value
				return baseDomNode;
			};
		};
	}
	
	if(typeof Jul.Container!=='function') {
		Jul.Container=function(config) {
			//declare class members
			this.config = Jul.getComponentConfigMapper("Container",config);
			
			//declare class methods
			this.getConfig=function() {
				return this.config;
			};
			this.setConfig=function(newConfig) {
				this.config = Jul.mergeConfig(this.config,newConfig);
			};
			this.getDomNode=function() {
				//declare locals
				var baseDomNode = null;
				
				//get the base DOM node
				baseDomNode = Jul.getBaseDomNode(this.config);
				
				//return the method's value
				return baseDomNode;
			};
		};
	}
	
	if(typeof Jul.Icon!=='function') {
		Jul.Icon=function(config) {
			//declare class members
			this.config = Jul.getComponentConfigMapper("Icon",config);
			
			//declare class methods
			this.getConfig=function() {
				return this.config;
			};
			this.setConfig=function(newConfig) {
				this.config = Jul.mergeConfig(this.config,newConfig);
			};
			this.getDomNode=function() {
				//declare locals
				var baseDomNode = null;
				
				//get the base DOM node
				baseDomNode = Jul.getBaseDomNode(this.config);
				
				//set the component's value
				if (Jul.isString(this.config.icon)) {
					baseDomNode.innerHTML = this.config.icon;
				}
				
				//return the method's value
				return baseDomNode;
			};
		};
	}
	
	if(typeof Jul.Button!=='function'){
		Jul.Button=function(config) {
			//declare class members
			this.config = Jul.getComponentConfigMapper("Button",config);
			
			//declare class methods
			this.getConfig=function() {
				return this.config;
			};
			this.setConfig=function(newConfig) {
				this.config = Jul.mergeConfig(this.config,newConfig);
			};
			this.getDomNode=function() {
				//declare locals
				var iconNode = null;
				var textNode = null;
				var baseDomNode = null;
				
				//get the base DOM node
				baseDomNode = Jul.getBaseDomNode(this.config);
				
				//build the icon part
				iconNode = Jul.getIconNode(this.config);
				if (iconNode!=null) {
					if (!Jul.isInDom(iconNode.id)) {
						baseDomNode.appendChild(iconNode);
					}
				}
				
				//build the label part
				if (Jul.isString(this.config.label)) {
					if (Jul.isInDom(this.config.id)) {
						//get the text node
						textNode = baseDomNode.lastChild; 
						//remove it
						baseDomNode.removeChild(textNode);
					}
					//append the text node
					textNode = document.createTextNode(this.config.label);
					baseDomNode.appendChild(textNode);
				}
				
				//return the method's value
				return baseDomNode;
			};
		};
	}
	
	if(typeof Jul.Text!=='function') {
		Jul.Text=function(config) {
			//declare class members
			this.config = Jul.getComponentConfigMapper("Text",config);
			
			//declare class methods
			this.getConfig=function() {
				return this.config;
			};
			this.setConfig=function(newConfig) {
				this.config = Jul.mergeConfig(this.config,newConfig);
			};
			this.getDomNode=function() {
				//declare locals
				var baseDomNode = null;
				
				//get the base DOM node
				baseDomNode = Jul.getBaseDomNode(this.config);
				
				//return the method's value
				return Jul.getInputNode(this.config,baseDomNode);
			};
		};
	}
	
	if(typeof Jul.Textarea!=='function') {
		Jul.Textarea=function(config) {
			//declare class members
			this.config = Jul.getComponentConfigMapper("Textarea",config);
			
			//declare class methods
			this.getConfig=function() {
				return this.config;
			};
			this.setConfig=function(newConfig) {
				this.config = Jul.mergeConfig(this.config,newConfig);
			};
			this.getDomNode=function() {
				//declare locals
				var baseDomNode = null;
				
				//get the base DOM node
				baseDomNode = Jul.getBaseDomNode(this.config);
				
				//set the component's value
				if (Jul.isString(this.config.value)) {
					baseDomNode.innerHTML = this.config.value;
				}
				
				//return the method's value
				return Jul.getInputNode(this.config,baseDomNode);
			};
		};
	}
			
	if(typeof Jul.Select!=='function'){
		Jul.Select=function(config) {
			//declare class members
			this.config = Jul.getComponentConfigMapper("Select",config);
			
			//declare class methods
			this.getConfig=function() {
				return this.config;
			};
			this.setConfig=function(newConfig) {
				this.config = Jul.mergeConfig(this.config,newConfig);
			};
			this.getDomNode=function() {
				//declare locals
				var optionsHtml = '';
				var baseDomNode = null;
				var arrValues = null;
				
				//get the base DOM node
				baseDomNode = Jul.getBaseDomNode(this.config);
				
				//turn the selected values into an array
				if (this.config.multiple===true) {
					arrValues = this.config.value;
				}
				else {
					arrValues = Jul.string2array(this.config.value);
				}
				
				//build the options part
				options = this.config.options;
				if (Jul.isArray(options)) {
					for (var i=0;i<options.length;i++) {
						option = options[i];
						if (Jul.isInArray(option.value,arrValues)) {
							option.selected = true;
						}
						optionsHtml += Jul.getOptionHtml(option);
					}
				}
				
				//build the input part
				baseDomNode.innerHTML = optionsHtml;
				
				//return the method's value
				return Jul.getInputNode(this.config,baseDomNode);
			};
		};
	}
	
	if(typeof Jul.Checkbox!=='function'){
		Jul.Checkbox=function(config) {
			//declare class members
			this.config = Jul.getComponentConfigMapper("Checkbox",config);
			
			//declare class methods
			this.getConfig=function() {
				return this.config;
			};
			this.setConfig=function(newConfig) {
				this.config = Jul.mergeConfig(this.config,newConfig);
			};
			this.getDomNode=function() {
				//declare locals
				var html = '';
				var baseDomNode = null;
				var wrapperNode = null;
				var labelNode = null;
				var iconNode = null;
				var spanNode = null;
				var wrapperNodeId = null;
				var labelNodeId = null;
				var spanNodeId = null;
				
				//get the base DOM node
				baseDomNode = Jul.getBaseDomNode(this.config);
				
				//get the wrapper node from the DOM
				wrapperNodeId = this.config.id + Jul.getWrapperSuffix();
				if (Jul.isInDom(wrapperNodeId)) {
					wrapperNode = Jul.getFromDom(wrapperNodeId);
				}
				else {
					wrapperNode = document.createElement("div");
					wrapperNode.setAttribute("id",wrapperNodeId);
				}
				
				//set the wrapper node's class
				wrapperNode.setAttribute("class",Jul.array2string(this.config.defaultClasses));
				
				//get the label node from the DOM
				labelNodeId = this.config.id + "_label";
				if (Jul.isInDom(labelNodeId)) {
					labelNode = Jul.getFromDom(labelNodeId);
				}
				else {
					labelNode = document.createElement("label");
					labelNode.setAttribute("id",labelNodeId);
				}
				
				//append the icon node to the label node
				iconNode = Jul.getIconNode(this.config);
				if (iconNode!=null) {
					if (!Jul.isInDom(iconNode.id)) {
						labelNode.appendChild(iconNode);
					}
				}
				
				//append the input node to the label node
				if (!Jul.isInDom(baseDomNode.id)) {
					labelNode.appendChild(baseDomNode);
				}
				
				//get the span node from the DOM
				spanNodeId = this.config.id + "_span";
				if (Jul.isInDom(spanNodeId)) {
					spanNode = Jul.getFromDom(spanNodeId);
				}
				else {
					spanNode = document.createElement("span");
					spanNode.setAttribute("id",spanNodeId);
				}
				if (Jul.isString(this.config.label)) {
					spanNode.innerHTML = this.config.label;
				}

				//append the span node to the label node
				if (!Jul.isInDom(spanNode.id)) {
					labelNode.appendChild(spanNode);
				}
				
				//append the label node to the wrapper node
				if (!Jul.isInDom(labelNode.id)) {
					wrapperNode.appendChild(labelNode);
				}
				
				//return the method's value
				return wrapperNode;
			};
		};
	}
	
	if(typeof Jul.Range!=='function') {
		Jul.Range=function(config) {
			//declare class members
			this.config = Jul.getComponentConfigMapper("Range",config);
			
			//declare class methods
			this.getConfig=function() {
				return this.config;
			};
			this.setConfig=function(newConfig) {
				this.config = Jul.mergeConfig(this.config,newConfig);
			};
			this.getDomNode=function() {
				//declare locals
				var baseDomNode = null;
				var wrapperNode = null;
				var wrapperNodeId = null;
				
				//get the base DOM node
				baseDomNode = Jul.getBaseDomNode(this.config);
				
				//get the wrapper node from the DOM
				wrapperNodeId = this.config.id + Jul.getWrapperSuffix();
				if (Jul.isInDom(wrapperNodeId)) {
					wrapperNode = Jul.getFromDom(wrapperNodeId);
				}
				else {
					wrapperNode = document.createElement("div");
					wrapperNode.setAttribute("id",wrapperNodeId);
				}
				
				//set the node's class
				wrapperNode.setAttribute("class",Jul.array2string(this.config.defaultClasses));
				
				//append the base node to the wrapper node
				if (!Jul.isInDom(baseDomNode.id)) {
					wrapperNode.appendChild(baseDomNode);
				}
				
				//return the method's value
				return wrapperNode;
			};
		};
	}
		
	if(typeof Jul.Switch!=='function') {
		Jul.Switch=function(config) {
			//declare class members
			this.config = Jul.getComponentConfigMapper("Switch",config);
			
			//declare class methods
			this.getConfig=function() {
				return this.config;
			};
			this.setConfig=function(newConfig) {
				this.config = Jul.mergeConfig(this.config,newConfig);
			};
			this.getDomNode=function() {
				//declare locals
				var html = '';
				var baseDomNode = null;
				var offlabel = this.config.offlabel;
				var onlabel = this.config.onlabel;
				
				//get the base DOM node
				baseDomNode = Jul.getBaseDomNode(this.config);
				
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
				html += '<input id="' + Jul.getSwitchCBPrefix() + this.config.id + '" type="checkbox"/>';
				html += '<span id="' + this.config.id + '_lever" class="lever ' + this.config.theme + '"></span>';
				html += onlabel;
				html += '</label>';
				
				//set the node's HTML
				baseDomNode.innerHTML = html;
				
				//return the method's value
				return baseDomNode;
			};
		};
	}
	
	if(typeof Jul.Collapsible!=='function') {
		Jul.Collapsible=function(config) {
			//declare class members
			this.config = Jul.getComponentConfigMapper("Collapsible",config);
			
			//declare class methods
			this.getConfig=function() {
				return this.config;
			};
			this.setConfig=function(newConfig) {
				this.config = Jul.mergeConfig(this.config,newConfig);
			};
			this.getDomNode=function() {
				//declare locals
				var baseDomNodeId = null;
				var baseDomNode = null;
				var headerNodeId = null;
				var headerTextNodeId = null;
				var contentNodeId = null;
				var buttonId = null;
				var buttonIcon = null;
				var collapseDir = null;
				var headerNode = null;
				var headerTextNode = null;
				var contentNode = null;
				var iconNode = null;
				var textNode = null;
				var buttonNode = null;
				var collapseDuration = null;
				var arrExtraHeaderClassesAtts = [
					{"name":"headerClasses","type":"array"}
					,{"name":"headerLayout","type":"array"}
					,{"name":"theme","type":"string"}
				];
				var arrExtraContentClassesAtts = [
					{"name":"contentClasses","type":"array"}
					,{"name":"contentLayout","type":"array"}
				];
				var arrClasses = [];
				var classesValue = null;
				
				//get the base DOM node
				baseDomNode = Jul.getBaseDomNode(this.config);
				baseDomNodeId = this.config.id;
				
				//get the collapseDir
				collapseDir = Jul.getCollapsibleDirection(this.config);
				baseDomNode.setAttribute("data-collapse-dir",collapseDir);
				collapseDuration = Jul.getDefalutCollapseDuration();
				
				//set child nodes ids
				headerNodeId = this.config.id + "_header";
				headerTextNodeId = this.config.id + "_headerText";
				contentNodeId = this.config.id + "_content";
				buttonId = this.config.id + "_btnCollapse";
				
				//get child nodes
				if (Jul.isInDom(headerNodeId)) {
					headerNode = Jul.getFromDom(headerNodeId);
				}
				else {
					headerNode = document.createElement("div");
					headerNode.setAttribute("id",headerNodeId);
				}
				if (Jul.isInDom(contentNodeId)) {
					contentNode = Jul.getFromDom(contentNodeId);
				}
				else {
					contentNode = document.createElement("div");
					contentNode.setAttribute("id",contentNodeId);
				}
				
				//set the classes for the child nodes
				arrClasses = Jul.getExtraClassesArray(config,arrExtraHeaderClassesAtts,true);
				classesValue = Jul.array2string(arrClasses);
				if (Jul.isString(classesValue)) {
					headerNode.setAttribute("class",classesValue);
				}
				arrClasses = Jul.getExtraClassesArray(config,arrExtraContentClassesAtts,true);
				classesValue = Jul.array2string(arrClasses);
				if (Jul.isString(classesValue)) {
					contentNode.setAttribute("class",classesValue);
				}
				
				//get the collapse button icon
				switch (collapseDir) {
					case "left2right":
						buttonIcon = "chevron_right";
						break;
					case "right2left":
						buttonIcon = "chevron_left";
						break;
					case "bottom2top":
						buttonIcon = "expand_less";
						break;
					case "top2bottom":
						buttonIcon = "expand_more";
						break;
				}
				
				//append a button node to the header node
				if (Jul.isTrue(this.config.showCollapse)) {
					if (!Jul.isInDom(buttonId)) {
						//append the button node
						buttonNode = document.createElement("i");
						buttonNode.setAttribute("id",buttonId);
						buttonNode.setAttribute("class",Jul.getIconMainClassName()+' small icon_button');
						buttonNode.addEventListener("click", function(event) {
							var dir = baseDomNode.getAttribute("data-collapse-dir");
							Jul.collapse(baseDomNodeId,dir,collapseDuration,event.target);
						});
						headerNode.appendChild(buttonNode);
					}
					else {
						buttonNode = Jul.getFromDom(buttonId);
					}
					buttonNode.innerHTML = buttonIcon;
				}
				else {
					if (Jul.isInDom(buttonId)) {
						Jul.setAttribute(buttonId,"class","hide");
					}
				}
				
				//append the icon node to the header node
				iconNode = Jul.getIconNode(this.config);
				if (iconNode!=null) {
					if (!Jul.isInDom(iconNode.id)) {
						headerNode.appendChild(iconNode);
					}
				}
				
				//append a text node to the header node
				if (Jul.isString(this.config.header)) {
					if (Jul.isInDom(headerTextNodeId)) {
						headerTextNode = Jul.getFromDom(headerTextNodeId);
					}
					else {
						headerTextNode = document.createElement("span");
						headerTextNode.setAttribute("id",headerTextNodeId);
						headerTextNode.setAttribute("class","collapsibleHeaderText");
					}
					headerTextNode.innerHTML = this.config.header;
					headerNode.appendChild(headerTextNode);
				}
				else {
					if (Jul.isInDom(headerTextNodeId)) {
						Jul.setAttribute(headerTextNodeId,"class","hide");
					}
				}
				
				//check the collapseDir
				if (collapseDir=="left2right" || collapseDir=="right2left") {
					//set the child node's attributes
					Jul.setAttributeByDom(headerNode,"class","col s3 collapsibleHeaderCol");
					Jul.setAttributeByDom(contentNode,"class","col s9 collapsibleContentCol");
					
					if (collapseDir=="left2right") {
						baseDomNode.appendChild(contentNode);
						baseDomNode.appendChild(headerNode);
					}
					else if (collapseDir=="right2left") {
						baseDomNode.appendChild(headerNode);
						baseDomNode.appendChild(contentNode);
					}
				}
				else if (collapseDir=="bottom2top" || collapseDir=="top2bottom") {
					//set the child node's attributes
					Jul.setAttributeByDom(headerNode,"class","collapsibleHeaderRow row");
					Jul.setAttributeByDom(contentNode,"class","collapsibleContentRow row");
					baseDomNode.appendChild(headerNode);
					baseDomNode.appendChild(contentNode);
				}
				
				//return the method's value
				return baseDomNode;
			};
		};
	}
	
	if(typeof Jul.Textnode!=='function') {
		Jul.Textnode=function(config) {
			//declare class members
			this.config = Jul.getComponentConfigMapper("Textnode",config);
			
			//declare class methods
			this.getConfig=function() {
				return this.config;
			};
			this.setConfig=function(newConfig) {
				this.config = Jul.mergeConfig(this.config,newConfig);
			};
			this.getDomNode=function() {
				//declare locals
				var baseDomNode = null;
				var iconNode = null;
				var textNode = null;
				
				//get the base DOM node
				baseDomNode = Jul.getBaseDomNode(this.config);
				
				//append the icon node to the label node
				iconNode = Jul.getIconNode(this.config);
				if (iconNode!=null) {
					if (!Jul.isInDom(iconNode.id)) {
						baseDomNode.appendChild(iconNode);
					}
				}
				
				//build the label part
				if (Jul.isString(this.config.text)) {
					if (Jul.isInDom(this.config.id)) {
						//get the text node
						textNode = baseDomNode.lastChild; 
						//remove it
						baseDomNode.removeChild(textNode);
					}
					//append the text node
					textNode = document.createTextNode(this.config.text);
					baseDomNode.appendChild(textNode);
				}
				
				//return the method's value
				return baseDomNode;
			};
		};
	}
	
	if(typeof Jul.Preloader!=='function') {
		Jul.Preloader=function(config) {
			//declare class members
			this.config = Jul.getComponentConfigMapper("Preloader",config);
			
			//declare class methods
			this.getConfig=function() {
				return this.config;
			};
			this.setConfig=function(newConfig) {
				this.config = Jul.mergeConfig(this.config,newConfig);
			};
			this.getDomNode=function() {
				//declare locals
				var html = '';
				var baseDomNode = null;
				var theme = null;
				var displayType = null;
				
				//get the base DOM node
				baseDomNode = Jul.getBaseDomNode(this.config);
				
				//set defaults if necessary
				theme = Jul.getTheme(this.config);
				displayType = Jul.getPreloaderDisplayType(this.config);
				
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
				baseDomNode.innerHTML = html;
				
				//return the method's value
				return baseDomNode;
			};
		};
	}
	
	if(typeof Jul.Modal!=='function') {
		Jul.Modal=function(config,eventsHandler) {
			//declare class members
			this.config = Jul.getComponentConfigMapper("Modal",config);
			this.eventsHandler = eventsHandler;
			this.buttons = null;
			
			//declare class methods
			this.getConfig=function() {
				return this.config;
			};
			this.setConfig=function(newConfig) {
				this.config = Jul.mergeConfig(this.config,newConfig);
			};
			this.getButtons=function() {
				//declare locals
				var modalid = this.config.id;
				var theme = Jul.getTheme(this.config);
				var buttonsContainerId = this.config.id + Jul.getModalButtonsSuffix();
				
				//check for existing items
				if (!Jul.isEmpty(this.buttons)) {
					return this.buttons;
				}
				
				this.buttons = [];
				
				//loop through the items
				for (var i=0;i<this.config.buttons.length;i++) {
					button = this.config.buttons[i];
					if (!Jul.isString(button.id)) {
						button.id = modalid+'_btn_'+i;
					}
					button.type = "button";
					button.theme = theme;
					button.renderto = buttonsContainerId;
					
					//add the item to the array
					this.buttons.push(button);
				}
				
				//return the method's value
				return this.buttons;
			};
			this.getDomNode=function() {
				//declare locals
				var html = '';
				var baseDomNode = null;
				var theme = null;
				var header = null;
				var buttons = null;
				var button = null;
				var buttonsPosition = null;
				var modalHeaderId = null;
				var modalHeaderNode = null;
				var modalHeaderClasses = null;
				var modalContentId = null;
				var modalContentNode = null;
				var buttonsContainerId = null;
				var buttonsContainerNode = null;
				var buttonsNodes = null;
				
				//get the base DOM node
				baseDomNode = Jul.getBaseDomNode(this.config);
				
				//get the parameters from the JSON configuration
				theme = Jul.getTheme(this.config);
				header = this.config.header;
				buttons = this.getButtons();
				buttonsPosition = Jul.getModalButtonsPosition(this.config);
				modalHeaderId = this.config.id + '_header_wrapper';
				modalContentId = this.config.id + Jul.getModalContentSuffix();
				buttonsContainerId = this.config.id + Jul.getModalButtonsSuffix();
				
				//create relevant DOM nodes
				if (Jul.isInDom(modalHeaderId)) {
					modalHeaderNode = Jul.getFromDom(modalHeaderId);
				}
				else {
					modalHeaderNode = document.createElement("div");
					modalHeaderNode.setAttribute("id",modalHeaderId);
				}
				if (Jul.isInDom(modalContentId)) {
					modalContentNode = Jul.getFromDom(modalContentId);
				}
				else {
					modalContentNode = document.createElement("div");
					modalContentNode.setAttribute("id",modalContentId);
				}
				modalContentNode.setAttribute("class","modal_content");
				if (Jul.isInDom(buttonsContainerId)) {
					buttonsContainerNode = Jul.getFromDom(buttonsContainerId);
				}
				else {
					buttonsContainerNode = document.createElement("div");
					buttonsContainerNode.setAttribute("id",buttonsContainerId);
				}
				buttonsContainerNode.setAttribute("class","col s5");

				//build the HTML
				modalHeaderClasses = "modal-header valign-wrapper";
				if (buttonsPosition=="footer") {
					modalHeaderClasses += ' ' + theme;
				}
				modalHeaderNode.setAttribute("class",modalHeaderClasses);
				
				//build the header row
				if (buttonsPosition=="header") {
					html += '<div class="col s7">';
					
					//add icon
					html += Jul.getIconHtml(this.config);
					html += '<span class="hspacer"></span>';
					
					//add header text
					html += '<h4 id="' + this.config.id + Jul.getModalHeaderSuffix() + '">' + header + '</h4>';
					html += '</div>';
					modalHeaderNode.innerHTML = html;
					if (!Jul.isInDom(buttonsContainerId)) {
						modalHeaderNode.appendChild(buttonsContainerNode);
					}
				}
				else {
					//add icon
					html += Jul.getIconHtml(this.config);
					html += '<span class="hspacer"></span>';
					//add header text
					html += '<h4 id="' + this.config.id + Jul.getModalHeaderSuffix() + '">' + header + '</h4>';
					modalHeaderNode.innerHTML = html;
				}
				
				if (buttonsPosition=="footer") {
					buttonsContainerNode.setAttribute("class","modal-footer");
				}
				
				//get the buttons' DOM nodes
				if (!Jul.isInDom(buttonsContainerId)) {
					buttonsNodes = Jul.getButtonsDomNodes(buttons);
					//render the buttons to their container
					buttonsContainerNode = Jul.renderModalButtons(buttonsContainerNode,buttonsNodes);
				}
				
				//append the child nodes to the main node
				if (!Jul.isInDom(modalHeaderId)) {
					baseDomNode.appendChild(modalHeaderNode);
				}
				if (!Jul.isInDom(modalContentId)) {
					baseDomNode.appendChild(modalContentNode);
				}
				if (!Jul.isInDom(buttonsContainerId)) {
					baseDomNode.appendChild(buttonsContainerNode);
				}
				
				//return the method's value
				return baseDomNode;
			};
		};
	}
	
	if(typeof Jul.getButtonsDomNodes!=='function') {
		Jul.getButtonsDomNodes=function(buttons) {
			//declare locals
			var button = null;
			var buttonComp = null;
			var domNode = null;
			var nodes = null;
			
			//check for valid values
			if (Jul.isArray(buttons)) {
				nodes = [];
				
				//loop through the items
				for (var i=0;i<buttons.length;i++) {
					//get the current item
					button = buttons[i];
					
					//create a new component
					buttonComp = new Jul.Button(button);
					
					//get the component's node
					domNode = buttonComp.getDomNode();
					
					//add the node to the array
					nodes.push(domNode);
				}				
			}
			
			//return the method's value
			return nodes;
		};
	}
	
	if(typeof Jul.renderModalButtons!=='function') {
		Jul.renderModalButtons=function(buttonsContainer,buttonsNodes) {
			//declare locals
			var spacerNode = null;
			var buttonNode = null;
			
			//check for a valid DOM node
			if (Jul.isEmpty(buttonsContainer)) {
				return buttonsContainer;
			}
			if (!Jul.isArray(buttonsNodes)) {
				return buttonsContainer;
			}
			
			//loop through the items
			for (var i=0;i<buttonsNodes.length;i++) {
				//get the current item
				buttonNode = buttonsNodes[i];
				
				//render the current button
				if (i>0) {
					spacerNode = document.createElement("span");
					spacerNode.setAttribute("class","hspacer");
					buttonsContainer.appendChild(spacerNode);
				}
				
				//add the current item to the container
				buttonsContainer.appendChild(buttonNode);
			}
			
			//return the method's value
			return buttonsContainer;
		};
	}
	/* end Jul.Components */
	
	if(typeof Jul.init!=='function') {
		Jul.init=function() {
			//declare locals
	    	var elems = null;
	    	var options = null;
	    	var instances = null;
	    	
			//initialize all components
	    	M.AutoInit();
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
	    	
	        elems = document.querySelectorAll('.toast');
	    	options = {
    			"displayLength":2000 		//Length in ms the Toast stays before dismissal.
    			,"inDuration":300 			//Transition in duration in milliseconds.
    			,"outDuration":375 			//Transition out duration in milliseconds.
    			,"classes":'' 				//Classes to be added to the toast element.
    			,"completeCallback":null 	//Callback function called when toast is dismissed.
    			,"activationPercent":0.8 	//The percentage of the toast's width it takes for a drag to dismiss a Toast.
	    	};
	        instances = M.Toast.getInstance(elems,options);
	        
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
	    	
	    	//update all prefilled text fields
	    	M.updateTextFields();
		};
	}
	
	if(!this.Jul.eventsManager){
		this.Jul.eventsManager = new Jul.EventsPublisher();
	}
	if(!this.Jul.eventsMap){
		this.Jul.eventsMap = [];
	}
	if(!this.Jul.collapseMap){
		this.Jul.collapseMap = [];
	}
}());
