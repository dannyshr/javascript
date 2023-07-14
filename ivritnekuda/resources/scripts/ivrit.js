
function winResizeHandler() {
	//declare locals
	var cw = null;
	var ch = null;
	var mainPanelId = "mainApp";
	var contentsPanelId = "contents";
	var statusPanelId = "statusBar";
	var contentsPanelObj = null;
	var mainPanelObj = null;
	var statusPanelObj = null;
	var objWidth = null;
	var objHeight = null;
	var minWidth = 300;
	var sideBarsWidth = 230;
	var scrollBarSize = 30;
	var message = 20;
	
	//check for nulls
	if (mainPanelId==null || contentsPanelId==null) {
		return;
	}
	
	//get elements by thier ids
	mainPanelObj = document.getElementById(mainPanelId);
	contentsPanelObj = document.getElementById(contentsPanelId);
	statusPanelObj = document.getElementById(statusPanelId);

	//check for nulls
	if (mainPanelObj==null || contentsPanelObj==null) {
		return;
	}
	
	//get the window's width
	cw = xClientWidth();
	ch = xClientHeight();
	
	//reset the main contents width accordingly
	objWidth = cw-sideBarsWidth-scrollBarSize;
	objHeight = ch-scrollBarSize;
	if (objWidth<minWidth) {
		objWidth=minWidth;
	}
	message = "cw is: ["+cw+"] ch: ["+ch+"] objWidth: ["+objWidth+"] objHeight: ["+objHeight+"]";
	contentsPanelObj.style.width = objWidth + 'px';
	mainPanelObj.style.height = objHeight + 'px';
	if (statusPanelObj!=null) {
		//statusPanelObj.innerHTML = message;
	}
}

function switchContentsOnLoad() {
	pgShow('contents1');
	//xIterate('menuItem', 1, null, function(e){e.onclick = navOnClick;});
}

function switchContents(newContentId) {
	//declare locals
	var contentsObj = null;
	var contentsStr = "contents1,contents2,contents3,contents4,,contents5";
	var delimiter = ",";
	var contentsArr = null;
	var currId = null;
	var currObj = null;
	
	//check for nulls
	if (newContentId==null) {
		return;
	}
	
	//get elements by their ids
	contentsObj = document.getElementById(newContentId);
	
	//check for nulls
	if (contentsObj==null) {
		return;
	}
	
	//split the contents string into an array
	contentsArr = contentsStr.split(delimiter);
	
	//check for nulls
	if (contentsArr!=null) {
		//loop through the array
		for (var i=0;i<contentsArr.length;i++) {
			//get the current object id
			currId = contentsArr[i];
			
			//check for nulls
			if (currId!=null) {
				//get the element by its id
				currObj = document.getElementById(currId);
				
				//check for nulls
				if (currObj!=null) {
					//set the current object's display
					currObj.style.display = "none";
				}
			}
		}
	}
	
	//set the new content's display
	contentsObj.style.display = "block";
}
