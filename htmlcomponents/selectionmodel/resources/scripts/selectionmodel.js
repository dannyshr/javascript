
			function toggleCheckboxGroup(checkBoxGroupId,checkBoxGroupSize,checked) {
				//declare locals
				var cbObj = null;
				
				//check for nulls
				if ((checkBoxGroupId!=null)&&(checkBoxGroupSize!=null)) {
					//loop through the size of the group
					for (var i=0;i<checkBoxGroupSize;i++) {
						//try to get the current item in the group
						cbObj = document.getElementById(checkBoxGroupId + "[" + i + "]");
						
						//check for nulls
						if (cbObj!=null) {
							//set the check mode
							cbObj.checked = checked;
						} 
					}
				}
			}

			function toggleSingleSelectionModeInCheckboxGroup(checkboxObj,checkBoxGroupId,checkBoxGroupSize) {
				//declare locals
				var cbObj = null;
				var currValue = null;
				
				//check for nulls
				if ((checkboxObj!=null)&&(checkBoxGroupId!=null)&&(checkBoxGroupSize!=null)) {
					//keep the value of the current clicked item
					currValue = checkboxObj.checked;
					
					//uncheck all the group
					toggleCheckboxGroup(checkBoxGroupId,checkBoxGroupSize,false);
					
					//reset the current checkbox's value
					checkboxObj.checked = currValue;
				}
			}

			function getNumberOfCheckedCheckboxesInGroup(checkBoxGroupId,checkBoxGroupSize) {
				//declare locals
				var cbObj = null;
				var counter = 0;
				
				//check for nulls
				if ((checkBoxGroupId!=null)&&(checkBoxGroupSize!=null)) {
					//loop through the size of the group
					for (var i=0;i<checkBoxGroupSize;i++) {
						//try to get the current item in the group
						cbObj = document.getElementById(checkBoxGroupId + "[" + i + "]");
						
						//check for nulls
						if (cbObj!=null) {
							//check if the item is checked
							if (cbObj.checked) {
								//increase the counter
								counter++;
							}
						} 
					}
				}
				
				//return the method's value
				return (counter);
			}

			function toggleButtonsMode(buttonsIds,disabled) {
				//declare locals
				var btnObj = null;
				var arrButtonsIds = null;
				
				//check for nulls
				if (buttonsIds!=null) {
					//split the string by the comma delimiter
					arrButtonsIds = buttonsIds.split(",");
					
					//check for nulls
					if (arrButtonsIds==null) {
						//create a new array
						arrButtonsIds = new Array();
						arrButtonsIds[0] = buttonsIds;
					}
					
					//loop through the size of the array
					for (var i=0;i<arrButtonsIds.length;i++) {
						//get the current button object
						btnObj = document.getElementById(arrButtonsIds[i]);
						
						//check for nulls
						if (btnObj!=null) {
							//toggle the button's mode according to the disabled flag
							btnObj.disabled = disabled;
						}
					}
				}
			}
			
			function toggleButtonsModeByCheckboxAll(checkboxObj,singleSelectionButtonsIds,multipleSelectionButtonsIds) {
				//declare locals
				var disabled = false;
				
				//check for nulls
				if (checkboxObj!=null) {
					//disable the single selection buttons
					toggleButtonsMode(singleSelectionButtonsIds,true);

					//see if the check box is checked
					if (checkboxObj.checked) {
						disabled = false;
					} else {
						disabled = true;
					}
					//toggle the multiple selection buttons according to the checked attribute of the checkbox
					toggleButtonsMode(multipleSelectionButtonsIds,disabled);
				}
			}

			function toggleButtonsModeByCheckboxGroup(checkboxObj,checkBoxGroupId,checkBoxGroupSize,singleSelectionButtonsIds,multipleSelectionButtonsIds) {
				//declare locals
				var numChecked = 0;
				
				//check for nulls
				if ((checkboxObj!=null)&&(checkBoxGroupId!=null)&&(checkBoxGroupSize!=null)) {
					//get the number of checked checkbxes in the group
					numChecked = getNumberOfCheckedCheckboxesInGroup(checkBoxGroupId,checkBoxGroupSize);
					
					//check if the number is zero or less
					if (numChecked<=0) {
						//disable both the single selection buttons, and the multiple selection buttons
						toggleButtonsMode(singleSelectionButtonsIds,true);
						toggleButtonsMode(multipleSelectionButtonsIds,true);
					} else {
						//check if its a single selected check box
						if (numChecked==1) {
							//enable both the single selection buttons, and the multiple selection buttons
							toggleButtonsMode(singleSelectionButtonsIds,false);
							toggleButtonsMode(multipleSelectionButtonsIds,false);
						}
						else {
							//disable the single selection buttons, and enable the multiple selection buttons
							toggleButtonsMode(singleSelectionButtonsIds,true);
							toggleButtonsMode(multipleSelectionButtonsIds,false);
						}
					}
				}
			}

