'use strict';

class Utils {
	constructor() {
	}
	
	isArray(obj) {
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
	}

	isString(obj) {
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
	}

	isNumeric(obj) {
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
	}

	isEmpty(obj) {
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
		if (this.isArray(obj)) {
			if (!obj.length || obj.length<1) {
				return true;
			}
		}
		
		//return the method's value
		return false;
	}

	isJson(json) {
		//declare locals
		var valid = false;
		
		//check for valid values
		if (this.isEmpty(json)) {
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
	}

	isTrue(obj) {
		if (!this.isEmpty(obj)) {
			if (obj===true || (this.isString(obj) && obj.toLowerCase()=="true")) {
				return true;
			}
		}
		
		//return the method's value
		return false;
	}

	isInDom(domId) {
		//declare locals
		var domObj = null;
		
		//check for valid values
		if (!this.isString(domId)) {
			return false;
		}
		if (domId.toLowerCase()=="body") {
			return true;
		}
		
		//get the element by its id
		domObj = document.getElementById(domId);
		
		//check for valid values
		if (this.isEmpty(domObj)) {
			return false;
		}
		
		//return the method's value
		return true;
	}

	getFromDom(domId) {
		//declare locals
		var domObj = null;
		
		//check for nulls
		if (!this.isInDom(domId)) {
			return null;
		}
		if (domId.toLowerCase()=="body") {
			return document.body;
		}
		
		//get elements by id
		domObj = document.getElementById(domId);
		
		//return the method's value
		return domObj;
	}

	getDomValue(domId) {
		//declare locals
		var domObj = null;
		
		//check for nulls
		if (!this.isInDom(domId)) {
			return "";
		}
		
		//get elements by id
		domObj = document.getElementById(domId);
		
		//return the method's value
		return domObj.value;
	}

	string2array(string,delimiter) {
		//declare locals
		var delimiterIndex = -1;
		var array = [];
		
		//set defaults if necessary
		if (this.isEmpty(delimiter)) {
			delimiter = ' ';
		}
		
		if (this.isString(string)) {
			delimiterIndex = string.indexOf(delimiter);
			if (delimiterIndex==-1) {
				array = new Array(string);
			}
			else {
				array = string.split(delimiter);
			}
		}
		else if (this.isArray(string)) {
			for (var i=0;i<string.length;i++) {
				array.push(string[i]);
			}
		}
		
		//return the method's value
		return array;
	}

	array2string(array,delimiter) {
		//declare locals
		var string = '';
		var counter = 0;
		
		//check for valid values
		if (!this.isArray(array) && !this.isString(array)) {
			return String(array);
		}
		if (this.isString(array)) {
			return array;
		}
		
		//set defaults if necessary
		if (this.isEmpty(delimiter)) {
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
	}
	
	isJsonArray(json,propName) {
		//check for valid values
		if (this.isEmpty(json) || this.isEmpty(json[propName])
				|| this.isEmpty(json[propName].length) || json[propName].length<1) {
			return false;
		}
		
		//return the method's value
		return true;
	}
	
	indexOfArray(item, array) {
		//declare locals
		var index = -1;
		var itemStr = null;
		var currItem = null;
		
		//check for a valid values
		itemStr = item;
		if (this.isJson(itemStr)) {
			itemStr = JSON.stringify(itemStr);
		}
		if (!this.isString(itemStr)) {
			itemStr = String(itemStr);
		}
		if (!this.isArray(array) || array.length<1) {
			return index;
		}
		
		//loop through the items
		for (var i=0;i<array.length;i++) {
			//get the current item
			currItem = array[i];
			
			//check for a string
			if (this.isJson(currItem)) {
				currItem = JSON.stringify(currItem);
			}
			if (!this.isString(currItem)) {
				currItem = String(currItem);
			}
			if (itemStr.toLowerCase()==currItem.toLowerCase()) {
				index = i;
				break;
			}
		}
		
		//return the method's value
		return index;
	}

	isInArray(item, array) {
		//declare locals
		var index = this.indexOfArray(item, array);
		
		//return the method's value
		return (index!=-1);
	}

	hasClass(domid,value) {
		//invoke the overloaded method
		return this.hasCss(domid,"class",value);
	}

	hasClassByDom(domnode,value) {
		//invoke the overloaded method
		return this.hasCssByDom(domnode,"class",value);
	}

	removeClass(domid,value) {
		//invoke the overloaded method
		this.removeCss(domid,"class",value);
	}

	removeClassByDom(domnode,value) {
		//invoke the overloaded method
		this.removeCssByDom(domnode,"class",value);
	}

	setClass(domid,value) {
		//invoke the overloaded method
		this.setCss(domid,"class",value);
	}

	setClassByDom(domnode,value) {
		//invoke the overloaded method
		this.setCssByDom(domnode,"class",value);
	}

	setCss(domid,attName,attValue) {
		//declare locals
		var domnode = null;
		
		//get the DOM node
		domnode = this.getFromDom(domid);
		
		//invoke the overloaded method
		this.setCssByDom(domnode,attName,attValue);
	}

	setCssByDom(domnode,attName,attValue) {
		//declare locals
		var strValues = null;
		var arrValues = null;
		var index = -1;
		
		//check for valid values
		if (typeof(domnode)!=='Element' || !this.isString(attName) || !this.isString(attValue)) {
			return;
		}
		
		//get the DOM element's attribute
		strValues = domnode.getAttribute(attName);
		if (this.isEmpty(strValues)) {
			arrValues = [];
		}
		else {
			arrValues = this.string2array(strValues);
		}
		
		//get the index of the expected value
		index = this.indexOfArray(attValue,arrValues);
		if (index==-1) {
			//add the value to the array
			arrValues.push(attValue)
			
			//update the DOM element's attribute
			strValues = this.array2string(arrValues)
			domnode.setAttribute(attName,strValues);
		}
	}
	
	removeCss(domid,attName,attValue) {
		//declare locals
		var domnode = null;
		
		//get the DOM node
		domnode = this.getFromDom(domid);
		
		//invoke the overloaded method
		this.removeCssByDom(domnode,attName,attValue);
	}

	removeCssByDom(domnode,attName,attValue) {
		//declare locals
		var strValues = null;
		var arrValues = null;
		var index = -1;
		
		//check for valid values
		if (typeof(domnode)!=='Element' || !this.isString(attName) || !this.isString(attValue)) {
			return;
		}
		
		//get the DOM element's attribute
		strValues = domnode.getAttribute(attName);
		if (this.isEmpty(strValues)) {
			arrValues = [];
		}
		else {
			arrValues = this.string2array(strValues);
		}
		
		//get the index of the expected value
		index = this.indexOfArray(attValue,arrValues);
		if (index!=-1) {
			//remove the value from the array
			arrValues.splice(index,1);
			
			//update the DOM element's attribute
			strValues = this.array2string(arrValues)
			domnode.setAttribute(attName,strValues);
		}
	}

	hasCss(domid,attName,attValue) {
		//declare locals
		var domnode = null;
		
		//get the DOM node
		domnode = this.getFromDom(domid);
		
		//invoke the overloaded method
		return this.hasCssByDom(domnode,attName,attValue);
	}

	hasCssByDom(domnode,attName,attValue) {
		//declare locals
		var strValues = null;
		var arrValues = null;
		var index = -1;
		var retVal = false;
		
		//check for valid values
		if (typeof(domnode)!=='Element' || !this.isString(attName) || !this.isString(attValue)) {
			return retVal;
		}
		
		//get the DOM element's attribute
		strValues = domnode.getAttribute(attName);
		if (this.isEmpty(strValues)) {
			return retVal;
		}
		
		//get the index of the expected value
		arrValues = this.string2array(strValues);
		index = this.indexOfArray(attValue,arrValues);
		if (index!=-1) {
			retVal = true;
		}
		
		//return the method's value
		return retVal;
	}

	mergeArrays(array,add,exclude) {
		//declare locals
		var data = [];
		var index = -1;
		
		//check for valid values
		if (this.isString(array)) {
			array = this.string2array(array);
		}
		if (this.isString(exclude)) {
			exclude = this.string2array(exclude);
		}
		if (this.isString(add)) {
			add = this.string2array(add);
		}
		
		if (this.isArray(array)) {
			data = array;
		}
		else {
			data = [];
		}
		
		//remove the items to exclude
		if (this.isArray(exclude)) {
			//loop through the data items
			for (var i=0;i<exclude.length;i++) {
				index = this.indexOfArray(exclude[i],data);
				if (index!=-1) {
					data.splice(index,1);
				}
			}
		}
		
		//add the items to add
		if (this.isArray(add)) {
			//loop through the data items
			for (var i=0;i<add.length;i++) {
				if (!this.isInArray(add[i],data)) {
					data.push(add[i]);
				}
			}
		}
		
		//return the method's value
		return data;
	}

	indexOfJson(json,array) {
		//declare class members
		var index = -1;
		var item = null;
		var propnames = null;
		var itemStr = null;
		var jsonStr = null;
		
		//check for valid values
		if (!this.isJson(json) || !this.isArray(array)) {
			return index;
		}
		
		//get the array of property names
		propnames = this.json2propnames(json);
		
		//check for valid values
		if (!this.isArray(propnames)) {
			return index;
		}
		
		//turn the JSON into a string
		jsonStr = JSON.stringify(json);
		
		//loop through the array
		for (var i=0;i<array.length;i++) {
			//get the current item
			item = this.json2propvalues(array[i],propnames);
			
			//check for valid values
			if (!this.isJson(propnames)) {
				continue;
			}
			
			itemStr = JSON.stringify(item);
			
			//compare the two JSON objects
			if (jsonStr.toLowerCase()==itemStr.toLowerCase()) {
				index = i;
				break;
			}
		}
		
		//return the method's value
		return index;
	}

	json2propnames(json) {
		//declare class members
		var propnames = null;
		var item = null;
		
		//check for valid values
		if (!this.isJson(json)) {
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
	}

	json2propvalues(json,propnames) {
		//declare class members
		var propvalues = null;
		var item = null;
		
		//check for valid values
		if (!this.isJson(json) || !this.isArray(propnames)) {
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
	}

	loadFile(file) {
		return "I have a " + this.carname;
	}
}

class ModelUtils {
	constructor(models) {
		this.utils = new Utils();
		this.models = models;
	}
	
	getModelKey() {
		return "model";
	}

	getRefModelAttributeName() {
		return "refmodel";
	}

	getComponentKey() {
		return "id";
	}

	getAttributeKey() {
		return "name";
	}

	getHtmlComponentKey() {
		return "tag";
	}

	getModelIndex(modelname,models,idPropName) {
		//declare locals
		var index = -1;
		var item = null;
		
		//check for valid values
		if (!this.utils.this.isString(modelname)) {
			return index;
		}
		if (!this.isJson(models) || this.isEmpty(models.length) || models.length<1) {
			return index;
		}
		if (!this.isString(idPropName)) {
			idPropName = getModelKey();
		}
		
		//loop through the items
		for (var i=0;i<models.length;i++) {
			//get the current item
			item = models[i];
			
			//check for valid values
			if (!this.isString(item[idPropName])) {
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
	}

	getModel(modelname,models,idPropName) {
		//declare locals
		var index = -1;
		var model = null;
		
		//check for valid values
		if (!this.isString(idPropName)) {
			idPropName = getModelKey();
		}
		
		//get the item's index
		index = getModelIndex(modelname,models,idPropName);
		
		//check for valid values
		if (index==-1) {
			return model;
		}
		
		//set the return value
		model = models[index];
		
		//return the method's value
		return model;
	}

	removeModel(models,modelid,idPropName) {
		//declare locals
		var index = -1;
		
		//check for valid values
		if (!this.isString(idPropName)) {
			idPropName = getModelKey();
		}
		
		//get the item's index
		index = getModelIndex(modelid,models,idPropName);
		
		//check for valid values
		if (index==-1) {
			return models;
		}
		
		//remove the item from the array
		models.splice(index,1);
		
		//return the method's value
		return models;
	}

	setModel(models,newModel,idPropName) {
		//declare locals
		var index = -1;
		
		//check for valid values
		if (!this.isString(idPropName)) {
			idPropName = getModelKey();
		}
		
		//get the item's index
		index = getModelIndex(newModel[idPropName],models,idPropName);
		
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
	}

	getComponentIndex(model,componentId,idPropName) {
		//declare locals
		var index = -1;
		var propName = null;
		var item = null;
		
		//check for valid values
		if (!this.isJson(model)) {
			return index;
		}
		if (!this.isString(componentId)) {
			return index;
		}
		if (!this.isString(idPropName)) {
			idPropName = getComponentKey();
		}
		
		//get the JSON's array property name
		propName = getFirstJsonArrayProp(model);
		if (!this.isString(propName)) {
			return index;
		}
		
		//loop through the items
		for (var i=0;i<model[propName].length;i++) {
			//get the current item
			item = model[propName][i];
			
			//check for valid values
			if (!this.isString(item[idPropName])) {
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
	}

	getComponent(model,componentId,idPropName) {
		//declare locals
		var index = -1;
		var component = null;
		var propName = null;
		
		//check for valid values
		if (!this.isString(idPropName)) {
			idPropName = getComponentKey();
		}
		
		//get the tem's index
		index = getComponentIndex(model,componentId,idPropName);
		
		//check for valid values
		if (index==-1) {
			return component;
		}
		
		//get the JSON's array property name
		propName = getFirstJsonArrayProp(model);
		if (!this.isString(propName)) {
			return component;
		}
		
		//set the return value
		component = model[propName][index];
		
		//return the method's value
		return component;
	}

	removeComp(models,modelname,compid,idPropName) {
		//declare locals
		var model = getModel(modelname,models);
		
		//invoke the overloaded method
		return removeComponent(model,compid,idPropName);
	}

	removeComponent(model,compid,idPropName) {
		//declare locals
		var index = -1;
		var propName = null;
		
		//check for valid values
		if (!this.isString(idPropName)) {
			idPropName = getComponentKey();
		}
		
		//get the JSON's array property name
		propName = getFirstJsonArrayProp(model);
		if (!this.isString(propName)) {
			return model;
		}
		
		//get the component's index
		index = getComponentIndex(model,compid,idPropName);
		
		//check for valid values
		if (index==-1) {
			return model;
		}
		
		//remove the item from the array
		model[propName].splice(index,1);
		
		//return the method's value
		return model;
	}

	setComp(models,modelname,newComp,idPropName) {
		//declare locals
		var model = getModel(modelname,models);
		
		//invoke the overloaded method
		return setComponent(model,newComp,idPropName);
	}

	setComponent(model,newComp,idPropName) {
		//declare locals
		var index = -1;
		var propName = null;
		
		//check for valid values
		if (!this.isString(idPropName)) {
			idPropName = getComponentKey();
		}
		
		//get the JSON's array property name
		propName = getFirstJsonArrayProp(model);
		if (!this.isString(propName)) {
			return model;
		}
		
		//get the component's index
		index = getComponentIndex(model,newComp[idPropName],idPropName);
		
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
	}

}

class Jul {
	constructor() {
		this.models = [];
	}
	
	getTheme(json) {
		if (!this.isString(json.theme)) {
			return "teal";
		}
		else {
			return json.theme;
		}
	}
	
	getPreloaderDisplayType(json) {
		//declare locals
		var defaultValue = "spinner";
		if (!this.isString(json.displayType)) {
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
	}
	
	getModalButtonsPosition(json) {
		//declare locals
		var defaultValue = "footer";
		if (!this.isString(json.buttons_position)) {
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
	}
	
	getModalHeaderSuffix() {
		return "_modal_header";
	}
	
	setModalHeader(modalid,header) {
		var domid = modalid + getModalHeaderSuffix();
		if (this.isInDom(domid)) {
			getFromDom(domid).innerHTML = header;
		}
	}

	getModalContentSuffix() {
		return "_modal_content";
	}
	getMaterializeComponentKey() {
		return "name";
	}

	body() {
		return "body";
	}

	getSwitchCBPrefix() {
		return "cb_";
	}

	getSwitchValue(domid) {
		//declare locals
		var cbid = null;
		var value = false;
		
		//check for valid values
		if (this.isInDom(domid)) {
			return value;
		}
		
		//check for valid values
		cbid = getSwitchCBPrefix + domid;
		if (!this.isInDom(cbid)) {
			return value;
		}
		
		//get the value
		value = getFromDom(cbid).checked;
		
		return value;
	}
	
}