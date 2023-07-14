
function slideContent(containerId) {
	var _contentsHeight = contentObjects[containerId]['contentHeight'];
	var _containerHeight = contentObjects[containerId]['containerHeight'];
	var topPos = contentObjects[containerId]['objRef'].style.top.replace(/[^\-0-9]/g,'');
	topPos = topPos - contentObjects[containerId]['slideSpeed'];
	if((topPos/1 + (_contentsHeight-(_containerHeight-10))/1)<0) {
		//topPos = _containerHeight;
		topPos = 0;
	}
	contentObjects[containerId]['objRef'].style.top = topPos + 'px';
	setTimeout('slideContent("' + containerId + '")',slideTimeBetweenSteps);
	var statusbarObj = document.getElementById('statusBar');
	var message = null;
	message = "topPos is: ["+topPos+"]<br>";
	message += "_contentsHeight: ["+_contentsHeight+"]<br>";
	message += "_containerHeight: ["+_containerHeight+"]<br>";
	message += "slideTimeBetweenSteps: ["+slideTimeBetweenSteps+"]<br>";
	message += "contentObjects[containerId]['slideSpeed']: ["+contentObjects[containerId]['slideSpeed']+"]<br>"
	message += "contentObjects[containerId]['originalSpeed']: ["+contentObjects[containerId]['originalSpeed']+"]"
	if (statusbarObj!=null) {
		//statusbarObj.innerHTML = message;
	}
}

function stopSliding() {
	var containerId = this.id;
	contentObjects[containerId]['slideSpeed'] = 0;	
}

function restartSliding() {
	var containerId = this.id;
	contentObjects[containerId]['slideSpeed'] = contentObjects[containerId]['originalSpeed'];
}

function initSlidingContent(containerId,slideSpeed) {
	scrollingContainer = document.getElementById(containerId);
	scrollingContent = scrollingContainer.getElementsByTagName('DIV')[0];
	
	scrollingContainer.style.position = 'relative';
	scrollingContainer.style.overflow = 'hidden';
	scrollingContent.style.position = 'relative';
	
	scrollingContainer.onmouseover = stopSliding;
	scrollingContainer.onmouseout = restartSliding;
	
	originalslideSpeed = slideSpeed;
	
	scrollingContent.style.top = '0px';
	
	contentObjects[containerId] = new Array();
	contentObjects[containerId]['objRef'] = scrollingContent;
	contentObjects[containerId]['contentHeight'] = scrollingContent.offsetHeight;
	contentObjects[containerId]['containerHeight'] = scrollingContainer.clientHeight;
	contentObjects[containerId]['slideSpeed'] = slideSpeed;
	contentObjects[containerId]['originalSpeed'] = slideSpeed;
	
	slideContent(containerId);
}
