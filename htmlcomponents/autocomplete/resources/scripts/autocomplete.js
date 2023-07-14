
			function setComboDisplay(comboId,show) {
				//declare locals
				var comboObj = document.getElementById(comboId);
				
				//check for nulls
				if (comboObj!=null) {
					//check for a display flag
					if (show) {
						comboObj.style.display="block";
					}
					else {
						if (comboObj.style.display=="block") {
							comboObj.style.display="none";
						}
						else {
							comboObj.style.display="block";
						}
					}
				}
			}
			
			function filterValues(comboInputId,optionsTableId) {
				//declare locals
				var textBox = document.getElementById(comboInputId);
				var optionsTable = document.getElementById(optionsTableId);
				var rows = null;
				var cells = null;
				var nodeValue = null;
				var strSearch = "";
				var pattern = null;
				var index = -1;
				
				//check for nulls
				if (textBox!=null && optionsTable!=null) {
					//get the value of the text box (value to search for)
					strSearch = textBox.value;

					//get the table's rows
					rows = optionsTable.rows;
					
					//check for nulls
					if (rows!=null && rows.length>0) {
						//loop through the array of rows
						for (var i=(rows.length-1);i>=0;i--) {
							//check for an empty search string
							if (strSearch==null || strSearch=="") {
								setRowVisibility(rows[i],true);
							}
							else {
								//get the current row's cells
								cells = rows[i].cells;
								
								//check for nulls
								if (cells!=null && cells.length>0) {
									//get the value of the first cell
									nodeValue = cells[0].firstChild.nodeValue;
									
									//check for nulls
									if (nodeValue!=null && nodeValue!="") {
										//search the string within the node's value
										pattern = new RegExp(strSearch,"i");
										index = nodeValue.search(pattern);
										//check if the node's value starts with the search string
										if (index!=0) {
											//remove the current row
											setRowVisibility(rows[i],false);
										}
										else {
											setRowVisibility(rows[i],true);
										}
									}
								}
							}
						}
					}
				}
			}
			
			function setRowVisibility(row,show) {
				if (show) {
					row.style.display = "";
				}
				else {
					row.style.display = "none";
				}
			}
			
			function setComboValue(comboInputId,valueObj) {
				//declare locals
				var textBox = document.getElementById(comboInputId);
				
				//check for nulls
				if (textBox!=null && valueObj!=null) {
					textBox.value = valueObj.innerHTML;
				}
			}
			
			function handleTextBoxFocus(textBox) {
				//check for nulls
				if (textBox!=null) {
					if (textBox.value.toUpperCase()=="Search...".toUpperCase()) {
						textBox.value = "";
					}
				}
			}
