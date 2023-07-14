//@C Danny Shraga 2008

function changeTheme(linkId,newTheme) {
	//declare locals
	var linkObj = null;
	
	//check for nulls
	if (linkId==null || newTheme==null) {
		return;
	}
	
	//get elements by their ids
	linkObj = document.getElementById(linkId);
	
	//check for nulls
	if (linkObj==null) {
		return;
	}
	
	//set the new theme
	linkObj.href = newTheme;
}

function showClickedButton(buttonId) {
	//check for nulls
	if (buttonId==null) {
		return;
	}
	
	//show a message
	alert(buttonId+' was clicked...');
}

function confirmClickedButton(buttonId) {
	//declare locals
	var retVal = false;
	
	//check for nulls
	if (buttonId==null) {
		return false;
	}
	
	//show a message
	retVal = confirm("Are you sure you want to click " + buttonId + " ?");
	
	//return the method's value
	return retVal;
}

function showClickedCheckbox(cbId) {
	//declare locals
	var cbObj = null;
	var checked = null;
	
	//check for nulls
	if (cbId==null) {
		return;
	}
	
	//get elements by their ids
	cbObj = document.getElementById(cbId);
	
	//check for nulls
	if (cbObj==null) {
		return;
	}
	
	//get the value of the element
	checked = cbObj.checked;
	
	//set the new theme
	if (checked) {
		//alert(cbId+' was checked...');
	} 
	else {
		//alert(cbId+' was unchecked');
	}
}

function confirmClickedCheckbox(checkboxId) {
	//declare locals
	var retVal = false;
	var cbObj = null;
	
	//check for nulls
	if (checkboxId==null) {
		return false;
	}
	
	//get elements by their ids
	cbObj = document.getElementById(checkboxId);
	
	//check for nulls
	if (cbObj==null) {
		return false;
	}
	
	//show a message
	if (cbObj.checked) {
		//retVal = confirm("Are you sure you want to check " + checkboxId + " ?");
	}
	else {
		//retVal = confirm("Are you sure you want to uncheck " + checkboxId + " ?");
	}
	retVal = true;
	
	//return the method's value
	return retVal;
}

function resetCheckboxes(formId) {
	//declare locals
	var formObj = null;
	var currItem = null;
	var objType = null;
	var itemId = null;
	var attName = "customType";
	var attValue = "";
	
	//check for nulls
	if (formId==null) {
		return;
	}
	
	//get elements by their ids
	formObj = document.getElementById(formId);
	
	//check for nulls
	if (formObj==null) {
		return;
	}

	//loop through the form's elements
	for (var i=0;i<formObj.elements.length;i++) {
		//get the current form element
		//alert("resetCheckboxes(): inside loop...");
		currItem = formObj.elements[i];
		
		//check for a special checkbox attribute
		attValue = currItem.getAttribute(attName);
		if (attValue!=null && attValue.toUpperCase()=="CHECKBOX") {
			//check for the correct type
			objType = currItem.getAttribute("type");
			if (objType!=null && objType.toUpperCase()=="CHECKBOX") {
				//get the current item's id
				itemId = currItem.id;
				if (itemId!=null && itemId!='') {
					//alert("resetCheckboxes(): about to reset item: "+itemId);
					//enable the checkbox
					currItem.disabled = false;
					//invoke the method to reset the current item
					customizeCheckbox(itemId,false);	
				}
			}
		}
	}
}

function customizeCheckboxes(formId) {
	//declare locals
	var formObj = null;
	var currItem = null;
	var objType = null;
	var itemId = null;
	var attName = "customType";
	var attValue = null;
	var itemIdSuffix = "Cust";
	
	//check for nulls
	if (formId==null) {
		return;
	}
	
	//get elements by their ids
	formObj = document.getElementById(formId);
	
	//check for nulls
	if (formObj==null) {
		return;
	}

	//loop through the form's elements
	for (var i=0;i<formObj.elements.length;i++) {
		//get the current form element
		currItem = formObj.elements[i];
		itemId = currItem.id;
		attValue = currItem.getAttribute(attName);
		
		//check for the correct type
		objType = currItem.getAttribute("type");
		if (objType!=null && objType.toUpperCase()=="CHECKBOX") {
			//check for a valid id
			if (itemId!=null && itemId.indexOf(itemIdSuffix)!=-1) {
				//click the current checkbox
				if (!currItem.checked) {
					currItem.checked = true;
				}
			}
			else if (attValue!=null && attValue.toUpperCase()=="CHECKBOX") {
				customizeCheckbox(itemId,true);
			}
		}
	}
}

function skinCheckboxes(formId) {
	//declare locals
	var formObj = null;
	var currItem = null;
	var objType = null;
	var itemId = null;
	var itemIdSuffix = "Skin";
	
	//check for nulls
	if (formId==null) {
		return;
	}
	
	//get elements by their ids
	formObj = document.getElementById(formId);
	
	//check for nulls
	if (formObj==null) {
		return;
	}

	//loop through the form's elements
	for (var i=0;i<formObj.elements.length;i++) {
		//get the current form element
		currItem = formObj.elements[i];
		itemId = currItem.id;
		
		//check for the correct type
		objType = currItem.getAttribute("type");
		if (objType!=null && objType.toUpperCase()=="CHECKBOX") {
			//check for a valid id
			if (itemId!=null && itemId.indexOf(itemIdSuffix)!=-1) {
				//click the current checkbox
				currItem.click();
			}
		}
	}
}

function customizeCombos(formId) {
	//declare locals
	var formObj = null;
	var currItem = null;
	var objType = null;
	var itemId = null;
	var attName = "customType";
	var attValue = null;
	var itemIdSuffix = "Cust";
	
	//check for nulls
	if (formId==null) {
		return;
	}
	
	//get elements by their ids
	formObj = document.getElementById(formId);
	
	//check for nulls
	if (formObj==null) {
		return;
	}

	//loop through the form's elements
	for (var i=0;i<formObj.elements.length;i++) {
		//get the current form element
		currItem = formObj.elements[i];
		itemId = currItem.id;
		attValue = currItem.getAttribute(attName);
		
		//check for the correct type
		objType = currItem.getAttribute("type");
		if (objType!=null && objType.toUpperCase()=="CHECKBOX") {
			//check for a valid id
			if (itemId!=null && itemId.indexOf(itemIdSuffix)!=-1) {
				//click the current checkbox
				if (!currItem.checked) {
					currItem.checked = true;
				}
			}
		}
		else if (objType!=null && objType.toUpperCase()=="SELECT") {
			if (attValue!=null && attValue.toUpperCase()=="COMBOBOX") {
				customizeCombo(itemId,true);
			}
		}
	}
}

function resetCombos(formId) {
	//declare locals
	var formObj = null;
	var currItem = null;
	var objType = null;
	var itemId = null;
	var attName = "customType";
	var attValue = null;
	
	//check for nulls
	if (formId==null) {
		return;
	}
	
	//get elements by their ids
	formObj = document.getElementById(formId);
	
	//check for nulls
	if (formObj==null) {
		return;
	}

	//loop through the form's elements
	for (var i=0;i<formObj.elements.length;i++) {
		//get the current form element
		currItem = formObj.elements[i];
		itemId = currItem.id;
		attValue = currItem.getAttribute(attName);
		
		//check for the correct type
		objType = currItem.getAttribute("type");
		if (objType!=null && objType.toUpperCase()=="SELECT") {
			if (attValue!=null && attValue.toUpperCase()=="COMBOBOX") {
				customizeCombo(itemId,false);
			}
		}
	}
}

function buildCombosOptions(_combosIds,maxLength,_groupSize) {
	//declare locals
	var arrCcombosIds = null;
	var idsDelimiter = ",";
	var comboObj = null;
	
	//check for nulls
	if (_combosIds==null || maxLength==null || _groupSize==null) {
		return;
	}
	
	//split the ids by the default delimiter
	if (_combosIds.indexOf(idsDelimiter)==-1) {
		arrCcombosIds = new Array(_combosIds);
	}
	else {
		arrCcombosIds = _combosIds.split(idsDelimiter);
	}
	
	//check for nulls
	if (arrCcombosIds==null) {
		return;
	}
	
	//loop through the array and rebuild each combo separatley
	for (var i=0;i<arrCcombosIds.length;i++) {
		//invoke the correct method
		buildComboOptions(arrCcombosIds[i],maxLength,_groupSize);
	}
}

function buildComboOptions(comboId,maxLength,groupSize) {
	//declare locals
	var comboObj = null;
	var optionObj = null;
	var optionGroupObj = null;
	var styleClass = "";
	var styleClassGroup = "comboboxOptionGroup";
	var j = 0;
	
	//check for nulls
	if (comboId==null || maxLength==null || groupSize==null) {
		return;
	}
	
	//get elements by their ids
	comboObj = document.getElementById(comboId);
	
	//check for nulls
	if (comboObj==null) {
		return;
	}
	
	//clear any previous options
	clearOptions(comboId);
	
	//loop through the options
	for (var i=0;i<maxLength;i++) {
		//create a new option
		optionObj = document.createElement("option");
		
		//set the styleClass
		if ((i % 2)==0) {
			styleClass = "comboboxOptionRowEven";
		}
		else {
			styleClass = "comboboxOptionRowOdd";
			//optionObj.disabled = true;
		}
		
		if ((i % groupSize)==0) {
			optionGroupObj = document.createElement("optgroup");
			optionGroupObj.label="Group "+(i+1)+" - "+((j+1)*groupSize);
			optionGroupObj.className = styleClassGroup;
			j++;
		}
		
		//set the option's label and value
		optionObj.value = "option" + (i+1);
		optionObj.innerHTML = "Option " + (i+1)+"<input type=\"checkbox\" name=\"cbOpt"+comboId+"\" >";
		optionObj.className = styleClass;
		
		//add the option to the drop down
		optionGroupObj.appendChild(optionObj); // standards compliant
		if ((i % groupSize)==0) {
			comboObj.appendChild(optionGroupObj);
		}
	}
	
	//select an option
	comboObj.selectedIndex = 0;
}

function clearOptions(comboId) {
	//delare locals
	var comboObj = null;
	var nodes = null;
	var node = null;
	var size = 0;
	
	//check for nulls
	if (comboId==null) {
		return;
	}
	
	//get elements by their ids
	comboObj = document.getElementById(comboId);
	
	//check for nulls
	if (comboObj==null) {
		return;
	}
	
	//get the object's child nodes
	nodes = comboObj.childNodes;
	
	//loop through the combo's nodes
	size = nodes.length;
	for (var i=(size-1);i>=0;i--) {
		//get the current node
		node = nodes[i];
		
		//remove it from the combo
		comboObj.removeChild(node);
	}
}

function changeOptionHandler(comboId) {
	//delare locals
	var comboObj = null;
	var optionObj = null;
	var styleClass = null;
	
	//check for nulls
	if (comboId==null) {
		return;
	}
	
	//get elements by their ids
	comboObj = document.getElementById(comboId);
	
	//check for nulls
	if (comboObj==null) {
		return;
	}
	//alert("Option ["+comboObj.value+"] was selected for "+comboId);
	//loop through the combo's options
	for (var i=(comboObj.options.length-1);i>=0;i--) {
		//get the current options
		optionObj = comboObj.options[i];
		
		//check if the option is selected
		if (optionObj.selected) {
			styleClass = "comboboxOptionRowSelected";
		}
		else {
			if ((i % 2)==0) {
				styleClass = "comboboxOptionRowEven";
			}
			else {
				styleClass = "comboboxOptionRowOdd";
			}
		}
		//optionObj.className = styleClass;
	}
}
