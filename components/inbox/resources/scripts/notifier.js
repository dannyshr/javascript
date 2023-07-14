
function NotifierDefaults(_notifierId,_flasherId) {
	//check for nulls
	if (_notifierId==null || _notifierId=='') {
		alert("notifier.js NotifierDefaults(): _notifierId is null or empty.");
		return;
	}
	if (document.getElementById(_notifierId)==null) {
		alert("notifier.js NotifierDefaults(): _notifierId ["+_notifierId+"] does NOT exists.");
		return;
	}
	//declare locals
	this.DEFAULT_MAX_MESSAGES = 500;
	this.DEFAULT_SHOW_TOTAL = true;
	this.DEFAULT_SHOW_NEW = true;
	this.DEFAULT_FLASH_ON_INCOMING = true;
	this.DEFAULT_FLASH_INTERVAL = 500;
	this.DEFAULT_SHOW_BUTTON_CLEAR_ALL = true;
	this.DEFAULT_SHOW_BUTTON_CLEAR_SELECTED = true;
	this.DEFAULT_SHOW_BUTTON_MARK_ALL_READ = true;
	this.DEFAULT_SHOW_BUTTON_MARK_SELECTED_READ = true;
	this.DEFAULT_SHOW_BUTTON_MARK_ALL_UNREAD = true;
	this.DEFAULT_SHOW_BUTTON_MARK_SELECTED_UNREAD = true;
	this.ATT_NAME_ISSELECTED = "isselected";
	this.ATT_NAME_ISNEW = "isnew";
	this.messageBoxContentsId = _notifierId+"_messageBoxContents";
	this.newMessagesNumDivId = _notifierId+"_newMessagesNum";
	this.totalMessagesNumDivId = _notifierId+"_totalMessagesNum";
	this.messageBoxActionsMenuButtonId = _notifierId+"_btnActionsMenu";
	this.messageBoxActionsMenuContainerId = _notifierId+"_actionsMenuContainer";
	this.messageBoxOptionsMenuButtonId = _notifierId+"_btnOptionsMenu";
	this.messageBoxOptionsMenuContainerId = _notifierId+"_optionsMenuContainer";
	this.messagesTableId = _notifierId+"_tblMessages";
	this.messageCheckboxSelAllId = _notifierId+"_cbSelAll";
	this.messageTrIdPrefix = _notifierId+"_trMessage";
	this.messageCheckboxIdPrefix = _notifierId+"_cbMessage";
	this.messageStatusIconDivIdPrefix = _notifierId+"_messageStatusIconDiv";
	this.messageStatusIconReadTitle = "Old message";
	this.messageStatusIconUnreadTitle = "New message";
	this.messageStatusIconReadClassName = "messageStatusIconRead";
	this.messageStatusIconUnreadClassName = "messageStatusIconUnread";
	this.messageReadClassName = "messageRowRead";
	this.messageUnreadClassName = "messageRowUnread";
	this.messageSelectedClassName = "messageRowSelected";
	this.messageUnselectedClassName = "messageRowUnselected";
	this.messagesFlasherNewEmptyClassName = "messagesFlasherNewEmpty";
	this.messagesFlasherNewClassName = "messagesFlasherNew";
	if (_flasherId==null || _flasherId=='undefiend' || _flasherId=='') {
		this.flasherExists = false;
		this.messageboxFlasherContainerId = null;
		this.messageboxFlasherId = null;
	}
	else {
		this.flasherExists = true;
		this.messageboxFlasherContainerId = _flasherId;
		this.messageboxFlasherId = _notifierId+"_messageboxFlasher";
	}
};

function Notifier(_elementId,_flasherId,_options) {
	//check for nulls
	if (_elementId==null || _elementId=='') {
		alert("notifier.js Notifier(): _elementId is null or empty.");
		return;
	}
	if (document.getElementById(_elementId)==null) {
		alert("notifier.js Notifier(): _elementId ["+_elementId+"] does NOT exists.");
		return;
	}
	//declare locals
	var flashIntervalId = null;
	this.defaults = new NotifierDefaults(_elementId,_flasherId);
	this.messagesArray = new Array();
	this.id = _elementId;
	this.options = _options;
	this.messageOnAfterClick = null;
	var msgBoxFlasherContents = "";
	var msgBoxContents = "";
	var displayNone = "style=\"display:none;\"";
	var numActionButtons = 0;
	var actionsMenuContainerContents = null;
	var actionsMenuContainerObj = null;
	var optionsMenuContainerContents = null;
	var optionsMenuContainerObj = null;
	//build the default options for this UI component
	if (this.options==null || this.options=='undefined') {
		//set defaults
		this.options = {
			//provide a default max number of messages to display
			maxMessages: this.defaults.DEFAULT_MAX_MESSAGES,
			//provide a default for showing the total number of messages
			showTotal: this.defaults.DEFAULT_SHOW_TOTAL, 
			//provide a default for showing the number of new messages
			showNew: this.defaults.DEFAULT_SHOW_NEW, 
			//provide a default for flashing the messages icon, for each incoming message
			flashOnIncoming: this.defaults.DEFAULT_FLASH_ON_INCOMING,
			//provide a default for the flashing interval on each incoming message
			flashInterval: this.defaults.DEFAULT_FLASH_INTERVAL,
			//provide a default for showing the 'Clear all' button on the messages box
			showButtonClearAll: this.defaults.DEFAULT_SHOW_BUTTON_CLEAR_ALL,
			//provide a default for showing the 'Clear selected' button on the messages box
			showButtonClearSelected: this.defaults.DEFAULT_SHOW_BUTTON_CLEAR_SELECTED,
			//provide a default for showing the 'Mark all as read' button on the messages box
			showButtonMarkAllRead: this.defaults.DEFAULT_SHOW_BUTTON_MARK_ALL_READ,
			//provide a default for showing the 'Mark selected as read' button on the messages box
			showButtonMarkSelectedRead: this.defaults.DEFAULT_SHOW_BUTTON_MARK_SELECTED_READ,
			//provide a default for showing the 'Mark all as unread' button on the messages box
			showButtonMarkAllUnread: this.defaults.DEFAULT_SHOW_BUTTON_MARK_ALL_UNREAD,
			//provide a default for showing the 'Mark selected as unread' button on the messages box
			showButtonMarkSelectedUnread: this.defaults.DEFAULT_SHOW_BUTTON_MARK_SELECTED_UNREAD
		};
	}
	else {
		if (this.options.maxMessages==null) {
			this.options.maxMessages = this.defaults.DEFAULT_MAX_MESSAGES;
		}
		if (this.options.showTotal==null) {
			this.options.showTotal = this.defaults.DEFAULT_SHOW_TOTAL;
		}
		if (this.options.showNew==null) {
			this.options.showNew = this.defaults.DEFAULT_SHOW_NEW;
		}
		if (this.options.flashOnIncoming==null) {
			this.options.flashOnIncoming = this.defaults.DEFAULT_FLASH_ON_INCOMING;
		}
		if (this.options.flashInterval==null) {
			this.options.flashInterval = this.defaults.DEFAULT_FLASH_INTERVAL;
		}
		if (this.options.showButtonClearAll==null) {
			this.options.showButtonClearAll = this.defaults.DEFAULT_SHOW_BUTTON_CLEAR_ALL;
		}
		if (this.options.showButtonClearSelected==null) {
			this.options.showButtonClearSelected = this.defaults.DEFAULT_SHOW_BUTTON_CLEAR_SELECTED;
		}
		if (this.options.showButtonMarkAllRead==null) {
			this.options.showButtonMarkAllRead = this.defaults.DEFAULT_SHOW_BUTTON_MARK_ALL_READ;
		}
		if (this.options.showButtonMarkSelectedRead==null) {
			this.options.showButtonMarkSelectedRead = this.defaults.DEFAULT_SHOW_BUTTON_MARK_SELECTED_READ;
		}
		if (this.options.showButtonMarkAllUnread==null) {
			this.options.showButtonMarkAllUnread = this.defaults.DEFAULT_SHOW_BUTTON_MARK_ALL_UNREAD;
		}
		if (this.options.showButtonMarkSelectedUnread==null) {
			this.options.showButtonMarkSelectedUnread = this.defaults.DEFAULT_SHOW_BUTTON_MARK_SELECTED_UNREAD;
		}
	}
	
	//build the initial contents of the messages box
	msgBoxContents += "<div>";
	msgBoxContents += "<table class=\"messageBoxHeader\" border=\"0\" cellpadding=\"4\" cellspacing=\"0\">";
	msgBoxContents += "<tr>";
	msgBoxContents += "<td valign=\"top\">";
	msgBoxContents += "<div class=\"messageBoxHeaderTitle\">System Messages";
	if (!this.options.showTotal) {
		msgBoxContents += "</div>";
	}
	else {
		msgBoxContents += "<span id=\""+this.defaults.totalMessagesNumDivId+"_parent\"> - Total (<span id=\""+this.defaults.totalMessagesNumDivId+"\" class=\"totalMessagesNum\" title=\"Total messages\">0</span>)</span>";
		msgBoxContents += "</div>"; 
	}
	msgBoxContents += "</td>";
	msgBoxContents += "<td valign=\"top\">";
	msgBoxContents += "<table align=\"right\" class=\"messageBoxHeaderButtons\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
	msgBoxContents += "<tr>";
	//render the options menu button
	msgBoxContents += "<td>";
	msgBoxContents += "<div id=\""+this.defaults.messageBoxOptionsMenuButtonId+"\" >";
	msgBoxContents += "<div class=\"messageboxButtonMenu\" onmouseover=\"this.className='messageboxButtonMenuHover';\" onmouseout=\"this.className='messageboxButtonMenu';\">";
	msgBoxContents += "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" >";
	msgBoxContents += "<tr>";
	msgBoxContents += "<td>";
	msgBoxContents += "<div class=\"menuButtonTriggerConfigIcon\" title=\"Click here to toggle the config menu on/off\" onclick=\"toggleMenu('"+this.defaults.messageBoxOptionsMenuContainerId+"','"+this.defaults.messageBoxActionsMenuContainerId+"');\" >";
	msgBoxContents += "</div>";
	msgBoxContents += "</td>";
	msgBoxContents += "<td>";
	msgBoxContents += "<div class=\"menuButtonTrigger\" title=\"Click here to toggle the config menu on/off\" onclick=\"toggleMenu('"+this.defaults.messageBoxOptionsMenuContainerId+"','"+this.defaults.messageBoxActionsMenuContainerId+"');\" >";
	msgBoxContents += "v";
	msgBoxContents += "</div>";
	msgBoxContents += "</td>";
	msgBoxContents += "</tr>";
	msgBoxContents += "</table>";
	msgBoxContents += "</div>";
	msgBoxContents += "</div>";
	msgBoxContents += "</td>";
	msgBoxContents += "<td><div class=\"horizontalSpacer\"></div></td>";
	//render the actions menu button
	numActionButtons = getNumDisplayedActionButtons(this.options);
	msgBoxContents += "<td>";
	msgBoxContents += "<div id=\""+this.defaults.messageBoxActionsMenuButtonId+"\" ";
	if (numActionButtons<1) {
		msgBoxContents += displayNone;
	}
	msgBoxContents += ">";
	msgBoxContents += "<div class=\"messageboxButtonMenu\" onmouseover=\"this.className='messageboxButtonMenuHover';\" onmouseout=\"this.className='messageboxButtonMenu';\">";
	msgBoxContents += "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" >";
	msgBoxContents += "<tr>";
	msgBoxContents += "<td>";
	msgBoxContents += "<div class=\"menuButtonTriggerIcon\" title=\"Click here to toggle the menu on/off\" onclick=\"toggleMenu('"+this.defaults.messageBoxActionsMenuContainerId+"','"+this.defaults.messageBoxOptionsMenuContainerId+"');\" >";
	msgBoxContents += "</div>";
	msgBoxContents += "</td>";
	msgBoxContents += "<td>";
	msgBoxContents += "<div class=\"menuButtonTrigger\" title=\"Click here to toggle the menu on/off\" onclick=\"toggleMenu('"+this.defaults.messageBoxActionsMenuContainerId+"','"+this.defaults.messageBoxOptionsMenuContainerId+"');\" >";
	msgBoxContents += "v";
	msgBoxContents += "</div>";
	msgBoxContents += "</td>";
	msgBoxContents += "</tr>";
	msgBoxContents += "</table>";
	msgBoxContents += "</div>";
	msgBoxContents += "</div>";
	msgBoxContents += "</td>";
	msgBoxContents += "<td><div class=\"horizontalSpacer\"></div></td>";
	msgBoxContents += "<td>";
	msgBoxContents += "<div class=\"messageboxButtonClose\" title=\"Close messages box\" onclick=\"hideMessagesBox('"+this.id+"');\">";
	msgBoxContents += "</div>";
	msgBoxContents += "</td>";
	msgBoxContents += "</tr>";
	msgBoxContents += "</table>";
	msgBoxContents += "</td>";
	msgBoxContents += "</tr>";
	msgBoxContents += "</table>";
	
	//render the options menu
	optionsMenuContainerContents = renderOptionsMenu(this.id,this.defaults.messageBoxOptionsMenuContainerId,this.options);
	optionsMenuContainerObj = document.getElementById(this.defaults.messageBoxOptionsMenuContainerId);
	if (optionsMenuContainerObj!=null) {
		optionsMenuContainerObj = $("#"+this.defaults.messageBoxOptionsMenuContainerId);
		optionsMenuContainerObj.html(optionsMenuContainerContents);
	}
	else {
		msgBoxContents += optionsMenuContainerContents;
	}
	
	//render the actions menu
	actionsMenuContainerContents = renderActionsMenu(this.id,this.defaults.messageBoxActionsMenuContainerId,this.options);
	actionsMenuContainerObj = document.getElementById(this.defaults.messageBoxActionsMenuContainerId);
	if (actionsMenuContainerObj!=null) {
		actionsMenuContainerObj = $("#"+this.defaults.messageBoxActionsMenuContainerId);
		actionsMenuContainerObj.html(actionsMenuContainerContents);
	}
	else {
		msgBoxContents += actionsMenuContainerContents;
	}
	
	//render the messagebox's contents
	msgBoxContents += "<div id=\""+this.defaults.messageBoxContentsId+"\" class=\"messageBoxContents\">";
	msgBoxContents += "</div>";
	$('#'+this.id).addClass("messageBox");
	$('#'+this.id).html(msgBoxContents);
	
	//build the initial contents of the flasher
	if (this.defaults.flasherExists) {
		msgBoxFlasherContents += "<table class=\"messageBoxFlasherTable\" border=\"0\">";
		msgBoxFlasherContents += "<tr>";
		msgBoxFlasherContents += "<td>";
		msgBoxFlasherContents += "<div id=\""+this.defaults.messageboxFlasherId+"\" class=\"messageboxFlasherIcon\" title=\"Click here to toggle the messages box\" onclick=\"toggleMessageBox('"+this.id+"');\">";
		msgBoxFlasherContents += "</div>";
		msgBoxFlasherContents += "</td>";
		if (this.options.showNew) {
			msgBoxFlasherContents += "<td class=\"messagesFlasherNewEmpty\"";
			msgBoxFlasherContents += "><span id=\""+this.defaults.newMessagesNumDivId+"_parent\">(";
			msgBoxFlasherContents += "<span id=\""+this.defaults.newMessagesNumDivId+"\" class=\"messagesFlasherNewEmpty\" title=\"Number of new messages\" onclick=\"toggleMessageBox('"+this.id+"');\">";
			msgBoxFlasherContents += "0";
			msgBoxFlasherContents += "</span>";
			msgBoxFlasherContents += ")</span></td>";
		}
		msgBoxFlasherContents += "</tr>";
		msgBoxFlasherContents += "</table>";
		$('#'+this.defaults.messageboxFlasherContainerId).html(msgBoxFlasherContents);
	}
	
	//start declaring the component's functions
	this.appendMessage=function() {
		//declare variables
		var newMessagesCount = null;
		var messageRow = null;
		var messagesRows = null;
		var messagesBody = null;
		
		//check the messages limit
		if (this.messagesArray.length==this.options.maxMessages) {
			//create a new temporary array
			var _tempArray = new Array();
			
			//remove the first message (by taking all messages form the second index)
			for (var i=1;i<this.messagesArray.length;i++) {
				_tempArray.push(this.messagesArray[i]);
			}
			//clearArray(this.messagesArray);
			//copyArray(_tempArray,this.messagesArray);
			_tempArray = null;
		}
		
		//create a random message row
		messageRow = this.createRandomMessageRow();
		this.messagesArray.push(messageRow);
		//alert("current num messages:" + this.messagesArray.length);
		if (!messageBoxIsVisible(this.id)) {
			$('#'+this.id).notificationmsg({animation: 'slide',period: 0});
			$('#'+this.id).notificationmsg('show'); 
		}
		
		//push the message into the messages box
		messagesRows = this.arrayToString(this.messagesArray);
		messagesBody = "<table id=\""+this.defaults.messagesTableId+"\" rules=\"rows\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"border:0px solid black;width:100%;\" >";
		messagesBody += "<thead>";
		messagesBody += "<th class=\"messagesTableColumnHeaderCheckbox\">";
		messagesBody += "<input id=\""+this.defaults.messageCheckboxSelAllId+"\" type=\"checkbox\" onclick=\"toggleMessagesRowsSelection('"+this.id+"',this.checked);\" >";
		messagesBody += "</th>";
		messagesBody += "<th class=\"messagesTableColumnHeaderStatus\"></th>";
		messagesBody += "<th class=\"messagesTableColumnHeader\">Severity</th>";
		messagesBody += "<th class=\"messagesTableColumnHeader\">Message</th>";
		messagesBody += "<th class=\"messagesTableColumnHeader\">Timestamp</th>";
		messagesBody += "</thead>";
		messagesBody += messagesRows;
		messagesBody += "</table>";
		$('#'+this.defaults.messageBoxContentsId).html(messagesBody);
		
		//update the number of messages
		newMessagesCount = getNewMessagesCount(this.id);
		$('#'+this.defaults.newMessagesNumDivId).removeClass(this.defaults.messagesFlasherNewEmptyClassName);
		$('#'+this.defaults.newMessagesNumDivId).addClass(this.defaults.messagesFlasherNewClassName);
		$('#'+this.defaults.newMessagesNumDivId).text(newMessagesCount);
		$('#'+this.defaults.totalMessagesNumDivId).text(this.messagesArray.length);
	};
	this.arrayToString=function(_arrayObject) {
		//declare locals
		var retVal = "";
		
		//check for nulls
		if (_arrayObject==null) {
			return retVal;
		}
		
		//loop through the elements in the array from the last to the first
		for (var i=(_arrayObject.length-1);i>=0;i--) {
			retVal += _arrayObject[i];
		}
		
		//return the method's value
		return retVal;
	};
	this.getCurrentDateTime=function() {
		//declare locals
		var retVal = null;
		var today = new Date();
		var d = today.getDate();
		var mo = today.getMonth()+1;
		var y = today.getFullYear();
		var h = today.getHours();
		var m = today.getMinutes();
		var s = today.getSeconds();
		var dateDelimiter = "/";
		var timeDelimiter = ":";
		
		//build the date time string
		//add a zero in front of numbers<10
		if (d<10) {
			d = "0" + d;
		}
		if (mo<10) {
			mo = "0" + mo;
		}
		if (h<10) {
			h = "0" + h;
		}
		if (m<10) {
			m = "0" + m;
		}
		if (s<10) {
			s = "0" + s;
		}
		
		//write the value	
		retVal=d+dateDelimiter+mo+dateDelimiter+y+" "+h+timeDelimiter+m+timeDelimiter+s;
		
		//return the method's value
		return retVal;
	};
	this.createRandomMessageRow=function() {
		//declare variables
		var timeStamp = null;
		var arrMessageTypes = null;
		var intRand = null;
		var messageTypeIcon = null;
		var msgRow = null;
		var autoRowId = null;
		var rowId = null;
		var checkboxId = null;
		var messageContent = null;
		var messageOnClick = "";
		var statusIconDivId = null;
		var statusIconDivTitle = null;
		
		//initialize variables
		timeStamp = this.getCurrentDateTime();
		arrMessageTypes = new Array("error", "info", "warning");
		intRand = Math.floor(Math.random()*3);
		autoRowId = (this.messagesArray.length+1);
		rowId = this.defaults.messageTrIdPrefix + autoRowId;
		checkboxId = this.defaults.messageCheckboxIdPrefix + autoRowId;
		messageContent = "Check out this message";
		statusIconDivId = this.defaults.messageStatusIconDivIdPrefix + autoRowId;
		statusIconDivTitle = this.defaults.messageStatusIconUnreadTitle;
		
		//build an onclick event handler
		messageOnClick += "onclick=\"readMessageRow('"+this.id+"','"+rowId+"');";
		messageOnClick += "showMessage('"+arrMessageTypes[intRand]+"','"+messageContent+"','"+timeStamp+"');";
		if (this.messageOnAfterClick!=null && this.messageOnAfterClick!='undefined') {
			messageOnClick += this.messageOnAfterClick;
		}
		messageOnClick += "\"";
		
		//build the message row
		messageTypeIcon = "resources/images/"+arrMessageTypes[intRand]+".png";
		msgRow = "<tr id=\""+rowId+"\" class=\""+this.defaults.messageUnselectedClassName+" "+this.defaults.messageUnreadClassName+"\" isselected=\"false\" isnew=\"true\">";
		msgRow += "<td class=\"messagesTableColumnCheckbox\"><input type=\"checkbox\" id=\""+checkboxId+"\" onclick=\"toggleMessageRowSelection('"+this.id+"','"+rowId+"');\"></td>";
		msgRow += "<td class=\"messagesTableColumnStatus\">";
		msgRow += "<div id=\""+statusIconDivId+"\" class=\""+this.defaults.messageStatusIconUnreadClassName+"\" title=\""+statusIconDivTitle+"\"";
		msgRow += messageOnClick;
		msgRow += ">";
		msgRow += "</td>";
		msgRow += "<td class=\"messagesTableColumnSeverity\">";
		msgRow += "<img style=\"cursor:pointer;\" src=\""+messageTypeIcon+"\" title=\""+arrMessageTypes[intRand]+"\"";
		msgRow += messageOnClick;
		msgRow += ">";
		msgRow += "</td>";
		msgRow += "<td class=\"messagesTableColumnMessage\" title=\"Click here to read this message\"><span class=\"messageContentLink\" ";
		msgRow += messageOnClick;
		msgRow += ">"+messageContent+"</span></td>";
		msgRow += "<td class=\"messagesTableColumnTimestamp\" title=\"Click here to read this message\"";
		msgRow += messageOnClick;
		msgRow += ">"+timeStamp+"</td>";
		msgRow += "</tr>";
		
		//return the method's value
		return msgRow;
	};
};

function toggleMessageRowSelection(_messageboxId,_rowId) {
	//declare locals
	var attName = null;
	var selectedCssName = null;
	var unselectedCssName = null;
	var rowObj = null;
	
	//check for nulls
	if (_messageboxId==null || _messageboxId=='' || _rowId==null || _rowId=='') {
		return;
	}
	
	//initialize variables
	var defaults = new NotifierDefaults(_messageboxId);
	attName = defaults.ATT_NAME_ISSELECTED;
	selectedCssName = defaults.messageSelectedClassName;
	unselectedCssName = defaults.messageUnselectedClassName;
	
	//get the element's reference
	rowObj = $("#"+_rowId);

	//check for nulls
	if (rowObj==null) {
		return;
	}
	
	//check the row's selection
	if (isSelectedMessageRow(_messageboxId,_rowId)) {
		//change the row's selection
		rowObj.removeClass(selectedCssName);
		rowObj.addClass(unselectedCssName);
		rowObj.attr(attName.toLowerCase(),"false");
	}
	else {
		rowObj.removeClass(unselectedCssName);
		rowObj.addClass(selectedCssName);
		rowObj.attr(attName.toLowerCase(),"true");
	}
}

function messageBoxIsVisible(_messageBoxId) {
	//declare locals
	var messagesBoxObj = null;
	var display = null;

	//check for nulls
	if (_messageBoxId==null) {
		return false;
	}
	
	//initialize variables
	messagesBoxObj = $('#'+_messageBoxId);
	
	//check for nulls
	if (messagesBoxObj==null) {
		return false;
	}
	
	//check the message box's visibility
	display = messagesBoxObj.css("display");
	if (display!=null && display.toLowerCase()=='block') {
		return true;
	}
	
	//return the method's value
	return false;
}

function toggleMessageBox(_messageBoxId) {
	//check for nulls
	if (_messageBoxId==null) {
		return;
	}
	
	//toggle the message box's visibility
	$('#'+_messageBoxId).notificationmsg({animation: 'slide',period: 0});
	if (messageBoxIsVisible(_messageBoxId)) {
		$('#'+_messageBoxId).notificationmsg('hide'); 
	}
	else {
		$('#'+_messageBoxId).notificationmsg('show'); 
	}
}

function hideMessagesBox(_messageBoxId) {
	//check for nulls
	if (_messageBoxId==null || _messageBoxId=='') {
		return;
	}
	$('#'+_messageBoxId).notificationmsg('hide');
}

function toggleMessagesRowsSelection(_messageboxId,_selected) {
	//declare locals
	var defaults = null;
	var _tableId = null;
	
	//check for nulls
	if (_messageboxId==null || _messageboxId=='' || _selected==null) {
		return;
	}
	
	//initialize variables
	defaults = new NotifierDefaults(_messageboxId);
	_tableId = defaults.messagesTableId;
	
	//check the selected value
	if (_selected) {
		selectAllMessagesRows(_messageboxId);
	}
	else {
		unselectAllMessagesRows(_messageboxId);
	}
}

function selectAllMessagesRows(_messageboxId) {
	//declare locals
	var defaults = null;
	var _tableId = null;
	var _tableObj = null;
	
	//check for nulls
	if (_messageboxId==null || _messageboxId=='') {
		return;
	}
	
	//initialize variables
	defaults = new NotifierDefaults(_messageboxId);
	_tableId = defaults.messagesTableId;
	
	//get the element's reference
	_tableObj = document.getElementById(_tableId);
	
	//check for nulls
	if (_tableObj==null) {
		return;
	}
	
	//loop through the table's rows
	for (var i=0;i<_tableObj.rows.length;i++) {
		//reset the row's selection
		selectMessageRow(_messageboxId,_tableObj.rows[i].id);
	}
}

function unselectAllMessagesRows(_messageboxId) {
	//declare locals
	var defaults = null;
	var _tableId = null;
	var _tableObj = null;
	
	//check for nulls
	if (_messageboxId==null || _messageboxId=='') {
		return;
	}
	
	//initialize variables
	defaults = new NotifierDefaults(_messageboxId);
	_tableId = defaults.messagesTableId;
	
	//get the element's reference
	_tableObj = document.getElementById(_tableId);
	
	//check for nulls
	if (_tableObj==null) {
		return;
	}
	
	//loop through the table's rows
	for (var i=0;i<_tableObj.rows.length;i++) {
		//reset the row's selection
		unselectMessageRow(_messageboxId,_tableObj.rows[i].id);
	}
}

function selectMessageRow(_messageboxId,_rowId) {
	//declare locals
	var attName = null;
	var selectedCssName = null;
	var unselectedCssName = null;
	var rowIdPrefix = null;
	var cbIdPrefix = null;
	var rowObj = null;
	var rowIndex = -1;
	var cbId = null;
	var cbObj = null;
	
	//check for nulls
	if (_messageboxId==null || _messageboxId=='' || _rowId==null || _rowId=='') {
		return;
	}
	
	//initialize variables
	var defaults = new NotifierDefaults(_messageboxId);
	attName = defaults.ATT_NAME_ISSELECTED;
	selectedCssName = defaults.messageSelectedClassName;
	unselectedCssName = defaults.messageUnselectedClassName;
	rowIdPrefix = defaults.messageTrIdPrefix;
	cbIdPrefix = defaults.messageCheckboxIdPrefix;
	
	//get the row's index
	rowIndex = _rowId.substr(rowIdPrefix.length);
	cbId = cbIdPrefix+rowIndex;
	
	//get the element's reference
	rowObj = $("#"+_rowId);
	cbObj = document.getElementById(cbId);
	
	//check for nulls
	if (rowObj==null) {
		return;
	}
	
	//reset the row's selection
	rowObj.removeClass(unselectedCssName);
	rowObj.addClass(selectedCssName);
	rowObj.attr(attName.toLowerCase(),"true");
	
	//check for nulls
	if (cbObj!=null) {
		cbObj.checked = true;
	}
}

function unselectMessageRow(_messageboxId,_rowId) {
	//declare locals
	var attName = null;
	var selectedCssName = null;
	var unselectedCssName = null;
	var rowIdPrefix = null;
	var cbIdPrefix = null;
	var rowObj = null;
	var rowIndex = -1;
	var cbId = null;
	var cbObj = null;
	
	//check for nulls
	if (_messageboxId==null || _messageboxId=='' || _rowId==null || _rowId=='') {
		return;
	}
	
	//initialize variables
	var defaults = new NotifierDefaults(_messageboxId);
	attName = defaults.ATT_NAME_ISSELECTED;
	selectedCssName = defaults.messageSelectedClassName;
	unselectedCssName = defaults.messageUnselectedClassName;
	rowIdPrefix = defaults.messageTrIdPrefix;
	cbIdPrefix = defaults.messageCheckboxIdPrefix;
	
	//get the row's index
	rowIndex = _rowId.substr(rowIdPrefix.length);
	cbId = cbIdPrefix+rowIndex;
	
	//get the element's reference
	rowObj = $("#"+_rowId);
	cbObj = document.getElementById(cbId);
	
	//check for nulls
	if (rowObj==null) {
		return;
	}
	
	//reset the row's selection
	rowObj.removeClass(selectedCssName);
	rowObj.addClass(unselectedCssName);
	rowObj.attr(attName.toLowerCase(),"false");
	
	//check for nulls
	if (cbObj!=null) {
		cbObj.checked = false;
	}
}

function isSelectedMessageRow(_messageboxId,_rowId) {
	//declare locals
	var defaults = null;
	var attName = null;
	var isSelected = "false";
	var rowObj = null;
	
	//check for nulls
	if (_messageboxId==null || _messageboxId=='' || _rowId==null || _rowId=='') {
		return false;
	}
	
	//initialize variables
	defaults = new NotifierDefaults(_messageboxId);
	attName = defaults.ATT_NAME_ISSELECTED;
	
	//get the element's reference
	rowObj = document.getElementById(_rowId);
	
	//check for nulls
	if (rowObj==null) {
		return false;
	}
	
	//get the row's selection
	isSelected = rowObj.getAttribute(attName.toLowerCase());
	
	//check the row's selection
	if (isSelected.toLowerCase()=="true") {
		//return the method's value
		return true;
	}
	else {
		return false;
	}
}

function getSelectedMessagesCount(_messageboxId) {
	//declare locals
	var defaults = null;
	var _tableId = null;
	var _tableObj = null;
	var _rows = null;
	var currRowId = null;
	var selMessagesCount = 0;
	
	//check for nulls
	if (_messageboxId==null || _messageboxId=='') {
		return selMessagesCount;
	}
	
	//initialize variables
	var defaults = new NotifierDefaults(_messageboxId);
	_tableId = defaults.messagesTableId;
	
	//get the object's reference
	_tableObj = document.getElementById(_tableId);
	
	//check for nulls
	if (_tableObj==null) {
		return selMessagesCount;
	}
	
	//get the rows
	_rows = _tableObj.rows;
	
	//loop through the rows start from the 2nd row, since the first one is the header
	for (var i=0;i<_rows.length;i++) {
		currRowId = _rows[i].id;
		
		//check if the current row is new or not
		if (isSelectedMessageRow(_messageboxId,currRowId)) {
			selMessagesCount += 1;
		}
	}
	
	//return the method's value
	return selMessagesCount;
}

function isNewMessageRow(_messageboxId,_rowId) {
	//declare locals
	var defaults = null;
	var attName = null;
	var isNew = "false";
	var rowObj = null;
	
	//check for nulls
	if (_rowId==null || _rowId=='') {
		return false;
	}
	
	//initialize variables
	defaults = new NotifierDefaults(_messageboxId);
	attName = defaults.ATT_NAME_ISNEW;
	
	//get the element's reference
	rowObj = document.getElementById(_rowId);
	
	//check for nulls
	if (rowObj==null) {
		return false;
	}
	
	//get the row's selection
	isNew = rowObj.getAttribute(attName.toLowerCase());
	
	//check the row's selection
	if (isNew.toLowerCase()=="true") {
		//return the method's value
		return true;
	}
	else {
		return false;
	}
}

function getNewMessagesCount(_messageboxId) {
	//declare locals
	var defaults = null;
	var _tableId = null;
	var _tableObj = null;
	var _rows = null;
	var currRowId = null;
	var newMessagesCount = 0;
	
	//check for nulls
	if (_messageboxId==null || _messageboxId=='') {
		return newMessagesCount;
	}
	
	//initialize variables
	var defaults = new NotifierDefaults(_messageboxId);
	_tableId = defaults.messagesTableId;
	
	//get the object's reference
	_tableObj = document.getElementById(_tableId);
	
	//check for nulls
	if (_tableObj==null) {
		return newMessagesCount;
	}
	
	//get the rows
	_rows = _tableObj.rows;
	
	//loop through the rows start from the 2nd row, since the first one is the header
	for (var i=0;i<_rows.length;i++) {
		currRowId = _rows[i].id;
		
		//check if the current row is new or not
		if (isNewMessageRow(_messageboxId,currRowId)) {
			newMessagesCount += 1;
		}
	}
	
	//return the method's value
	return newMessagesCount;
}

function readSelectedMessagesRows(_messageboxId) {
	//declare locals
	var _tableId = null;
	var _tableObj = null;
	var currRowId = null;
	var newMessagesNumObjId = null;
	var numNewEmptyCss = null;
	var numNewCss = null;
	var numNew = 0;
	var numSelected = 0;
	
	//check for nulls
	if (_messageboxId==null || _messageboxId=='') {
		return;
	}
	
	//check for selected message rows
	numSelected = getSelectedMessagesCount(_messageboxId);
	if (numSelected<=0) {
		alert("Please selecte the messages to read.");
		return;
	}
	
	//initialize variables
	var defaults = new NotifierDefaults(_messageboxId);
	_tableId = defaults.messagesTableId;
	newMessagesNumObjId = defaults.newMessagesNumDivId;
	numNewEmptyCss = defaults.messagesFlasherNewEmptyClassName;
	numNewCss = defaults.messagesFlasherNewClassName;
	
	//get the object's reference
	_tableObj = document.getElementById(_tableId);
	
	//check for nulls
	if (_tableObj==null) {
		return;
	}
	
	//loop through the table's rows
	for (var i=0;i<_tableObj.rows.length;i++) {
		//get the current row's id
		currRowId = _tableObj.rows[i].id;
		//check if the current row is selected
		if (isSelectedMessageRow(_messageboxId,currRowId)) {
			//read the current message row
			readMessageRow(_messageboxId,currRowId,false);
		}
	}
	
	//update the new count's css and value
	numNew = getNewMessagesCount(_messageboxId);
	if (numNew==0) {
		$('#'+newMessagesNumObjId).removeClass(numNewCss);
		$('#'+newMessagesNumObjId).addClass(numNewEmptyCss);
	}
	$('#'+newMessagesNumObjId).text(numNew);
}

function unreadSelectedMessagesRows(_messageboxId) {
	//declare locals
	var _tableId = null;
	var _tableObj = null;
	var currRowId = null;
	var newMessagesNumObjId = null;
	var numNewEmptyCss = null;
	var numNewCss = null;
	var numNew = 0;
	var numSelected = 0;
	
	//check for nulls
	if (_messageboxId==null || _messageboxId=='') {
		return;
	}
	
	//check for selected message rows
	numSelected = getSelectedMessagesCount(_messageboxId);
	if (numSelected<=0) {
		alert("Please selecte the messages to unread.");
		return;
	}
	
	//initialize variables
	var defaults = new NotifierDefaults(_messageboxId);
	_tableId = defaults.messagesTableId;
	newMessagesNumObjId = defaults.newMessagesNumDivId;
	numNewEmptyCss = defaults.messagesFlasherNewEmptyClassName;
	numNewCss = defaults.messagesFlasherNewClassName;
	
	//get the object's reference
	_tableObj = document.getElementById(_tableId);
	
	//check for nulls
	if (_tableObj==null) {
		return;
	}
	
	//loop through the table's rows
	for (var i=0;i<_tableObj.rows.length;i++) {
		//get the current row's id
		currRowId = _tableObj.rows[i].id;
		//check if the current row is selected
		if (isSelectedMessageRow(_messageboxId,currRowId)) {
			//unread the current message row
			unreadMessageRow(_messageboxId,currRowId,false);
		}
	}
	
	//update the new count's css and value
	numNew = getNewMessagesCount(_messageboxId);
	if (numNew>0) {
		$('#'+newMessagesNumObjId).removeClass(numNewEmptyCss);
		$('#'+newMessagesNumObjId).addClass(numNewCss);
	}
	$('#'+newMessagesNumObjId).text(numNew);
}

function readAllMessagesRows(_messageboxId) {
	//declare locals
	var _tableId = null;
	var _tableObj = null;
	var newMessagesNumObjId = null;
	var numNewEmptyCss = null;
	var numNewCss = null;
	
	//check for nulls
	if (_messageboxId==null || _messageboxId=='') {
		return;
	}
	
	//initialize variables
	var defaults = new NotifierDefaults(_messageboxId);
	_tableId = defaults.messagesTableId;
	newMessagesNumObjId = defaults.newMessagesNumDivId;
	numNewEmptyCss = defaults.messagesFlasherNewEmptyClassName;
	numNewCss = defaults.messagesFlasherNewClassName;
	
	//get the object's reference
	_tableObj = document.getElementById(_tableId);
	
	//check for nulls
	if (_tableObj==null) {
		return;
	}
	
	//loop through the table's rows
	for (var i=0;i<_tableObj.rows.length;i++) {
		//read the current message row
		readMessageRow(_messageboxId,_tableObj.rows[i].id,false);
	}
	
	//update the new count's css and value
	$('#'+newMessagesNumObjId).removeClass(numNewCss);
	$('#'+newMessagesNumObjId).addClass(numNewEmptyCss);
	$('#'+newMessagesNumObjId).text(0);
}

function unreadAllMessagesRows(_messageboxId) {
	//declare locals
	var _tableId = null;
	var _tableObj = null;
	var newMessagesNumObjId = null;
	var numNewEmptyCss = null;
	var numNewCss = null;
	
	//check for nulls
	if (_messageboxId==null || _messageboxId=='') {
		return;
	}
	
	//initialize variables
	var defaults = new NotifierDefaults(_messageboxId);
	_tableId = defaults.messagesTableId;
	newMessagesNumObjId = defaults.newMessagesNumDivId;
	numNewEmptyCss = defaults.messagesFlasherNewEmptyClassName;
	numNewCss = defaults.messagesFlasherNewClassName;
	
	//get the object's reference
	_tableObj = document.getElementById(_tableId);
	
	//check for nulls
	if (_tableObj==null) {
		return;
	}
	
	//loop through the table's rows
	for (var i=0;i<_tableObj.rows.length;i++) {
		//unread the current message row
		unreadMessageRow(_messageboxId,_tableObj.rows[i].id,false);
	}
	
	//update the new count's css and value
	$('#'+newMessagesNumObjId).removeClass(numNewEmptyCss);
	$('#'+newMessagesNumObjId).addClass(numNewCss);
	$('#'+newMessagesNumObjId).text(_tableObj.rows.length);
}

function readMessageRow(_messageboxId,_rowId,_updateNewCount) {
	//declare locals
	var defaults = null;
	var attName = null;
	var readCssName = null;
	var unreadCssName = null;
	var rowObj = null;
	var newMessagesNumObjId = null;
	var numNew = 0;
	var numNewEmptyCss = null;
	var numNewCss = null;
	var statusIconDivId = null;
	var statusIconDivObj = null;
	var statusReadCss = null;
	var statusUnreadCss = null;
	var rowIdPrefix = null;
	var rowIndex = -1;
	var tooltip = null;
	
	//check for nulls
	if (_messageboxId==null || _messageboxId=='' || _rowId==null || _rowId=='') {
		return;
	}
	
	//set defaults
	if (_updateNewCount==null || _updateNewCount=='') {
		_updateNewCount = true;
	}
	
	//initialize variables
	defaults = new NotifierDefaults(_messageboxId);
	attName = defaults.ATT_NAME_ISNEW;
	readCssName = defaults.messageReadClassName;
	unreadCssName = defaults.messageUnreadClassName;
	newMessagesNumObjId = defaults.newMessagesNumDivId;
	numNewEmptyCss = defaults.messagesFlasherNewEmptyClassName;
	numNewCss = defaults.messagesFlasherNewClassName;
	statusReadCss = defaults.messageStatusIconReadClassName;
	statusUnreadCss = defaults.messageStatusIconUnreadClassName;
	rowIdPrefix = defaults.messageTrIdPrefix;
	tooltip = defaults.messageStatusIconReadTitle;
	
	//get the row's index
	rowIndex = _rowId.substr(rowIdPrefix.length);
	statusIconDivId = defaults.messageStatusIconDivIdPrefix+rowIndex;
	
	//get the element's reference
	rowObj = $("#"+_rowId);
	
	//check for nulls
	if (rowObj==null) {
		return;
	}
	
	//reset the message row's state
	rowObj.removeClass(unreadCssName);
	rowObj.addClass(readCssName);
	rowObj.attr(attName.toLowerCase(),"false");
	
	//update the message's status icon
	statusIconDivObj = $("#"+statusIconDivId);
	
	//check for nulls
	if (statusIconDivObj!=null) {
		statusIconDivObj.attr("title".toLowerCase(),tooltip);
		statusIconDivObj.removeClass(statusUnreadCss);
		statusIconDivObj.addClass(statusReadCss);
	}
	
	//check if the new count should be updated
	if (_updateNewCount) {
		//get the total number of new messages
		numNew = getNewMessagesCount(_messageboxId);
		if (numNew==0) {
			//update the object's css
			$('#'+newMessagesNumObjId).removeClass(numNewCss);
			$('#'+newMessagesNumObjId).addClass(numNewEmptyCss);
		}
		
		//update the object's value
		$('#'+newMessagesNumObjId).text(numNew);
	}
}

function unreadMessageRow(_messageboxId,_rowId,_updateNewCount) {
	//declare locals
	var defaults = null;
	var attName = null;
	var readCssName = null;
	var unreadCssName = null;
	var rowObj = null;
	var newMessagesNumObjId = null;
	var numNew = 0;
	var numNewEmptyCss = null;
	var numNewCss = null;
	var statusIconDivId = null;
	var statusIconDivObj = null;
	var statusReadCss = null;
	var statusUnreadCss = null;
	var rowIdPrefix = null;
	var rowIndex = -1;
	var tooltip = null;
	
	//check for nulls
	if (_messageboxId==null || _messageboxId=='' || _rowId==null || _rowId=='') {
		return;
	}
	
	//set defaults
	if (_updateNewCount==null || _updateNewCount=='') {
		_updateNewCount = true;
	}
	
	//initialize variables
	defaults = new NotifierDefaults(_messageboxId);
	attName = defaults.ATT_NAME_ISNEW;
	readCssName = defaults.messageReadClassName;
	unreadCssName = defaults.messageUnreadClassName;
	newMessagesNumObjId = defaults.newMessagesNumDivId;
	numNewEmptyCss = defaults.messagesFlasherNewEmptyClassName;
	numNewCss = defaults.messagesFlasherNewClassName;
	statusReadCss = defaults.messageStatusIconReadClassName;
	statusUnreadCss = defaults.messageStatusIconUnreadClassName;
	rowIdPrefix = defaults.messageTrIdPrefix;
	tooltip = defaults.messageStatusIconUnreadTitle;
	
	//get the row's index
	rowIndex = _rowId.substr(rowIdPrefix.length);
	statusIconDivId = defaults.messageStatusIconDivIdPrefix+rowIndex;
	
	//get the element's reference
	rowObj = $("#"+_rowId);
	
	//check for nulls
	if (rowObj==null) {
		return;
	}
	
	//reset the message row's state
	rowObj.removeClass(readCssName);
	rowObj.addClass(unreadCssName);
	rowObj.attr(attName.toLowerCase(),"true");
	
	//update the message's status icon
	statusIconDivObj = $("#"+statusIconDivId);
	
	//check for nulls
	if (statusIconDivObj!=null) {
		statusIconDivObj.attr("title".toLowerCase(),tooltip);
		statusIconDivObj.removeClass(statusReadCss);
		statusIconDivObj.addClass(statusUnreadCss);
	}
	
	//check if the new count should be updated
	if (_updateNewCount) {
		//get the total number of new messages
		numNew = getNewMessagesCount(_messageboxId);
		if (numNew>0) {
			//update the object's css
			$('#'+newMessagesNumObjId).removeClass(numNewEmptyCss);
			$('#'+newMessagesNumObjId).addClass(numNewCss);
		}
		
		//update the object's value
		$('#'+newMessagesNumObjId).text(numNew);
	}
}

function getMessageRowIndex(_tableId,_rowId) {
	//declare locals
	var _tableObj = null;
	var _rowObj = null;
	var index = -1;
	var _rows = null;
	var currRowId = null;
	
	//check for nulls
	if (_tableId==null || _tableId=='' || _rowId==null || _rowId=='') {
		return index;
	}
	
	//get the table object
	_tableObj = document.getElementById(_tableId);
	_rowObj = document.getElementById(_rowId);
	
	//check for nulls
	if (_tableObj==null || _rowObj==null) {
		return index;
	}
	
	//loop through the table's rows
	_rows = _tableObj.rows;
	for (var i=0;i<_rows.length;i++) {
		//get the current row's id
		currRowId = _rows[i].id;
		
		//check if it is the specified rowId
		if (_rowId==currRowId) {
			index = i;
			break;
		}
	}
	
	//return the method's value
	return index;
}

function deleteMessageRow(_messageboxId,_rowId,_updateNewCount) {
	//declare locals
	var _tableId = null;
	var _tableObj = null;
	var defaults = null;
	var rowObj = null;
	var newMessagesNumObjId = null;
	var numNew = 0;
	var numNewEmptyCss = null;
	var numNewCss = null;
	var rowIndex = -1;
	
	//check for nulls
	if (_messageboxId==null || _messageboxId=='' || _rowId==null || _rowId=='') {
		return;
	}
	
	//set defaults
	if (_updateNewCount==null || _updateNewCount=='') {
		_updateNewCount = true;
	}
	
	//initialize variables
	defaults = new NotifierDefaults(_messageboxId);
	_tableId = defaults.messagesTableId;
	newMessagesNumObjId = defaults.newMessagesNumDivId;
	numNewEmptyCss = defaults.messagesFlasherNewEmptyClassName;
	numNewCss = defaults.messagesFlasherNewClassName;
	
	//get the table's object reference
	_tableObj = document.getElementById(_tableId);
	
	//check for nulls
	if (_tableObj==null) {
		return;
	}
	
	//get the message's rowIndex according to its row id
	rowIndex = getMessageRowIndex(_tableId,_rowId);
	
	//check for a valid row index
	if (rowIndex==-1) {
		alert("The selected row index is invalid...");
		return;
	}
	
	//delete the current row message
	_tableObj.deleteRow(rowIndex);
	
	//check if the new count should be updated
	if (_updateNewCount) {
		//get the total number of new messages
		numNew = getNewMessagesCount(_messageboxId);
		if (numNew==0) {
			//update the object's css
			$('#'+newMessagesNumObjId).removeClass(numNewCss);
			$('#'+newMessagesNumObjId).addClass(numNewEmptyCss);
		}
		
		//update the object's value
		$('#'+newMessagesNumObjId).text(numNew);
	}
}

function deleteAllMessagesRows(_messageboxId) {
	//declare locals
	var _tableId = null;
	var _tableObj = null;
	var defaults = null;
	var numRows = 0;
	var newMessagesNumObjId = null;
	var totalMessagesNumObjId = null;
	var numNewEmptyCss = null;
	var numNewCss = null;
	
	//check for nulls
	if (_messageboxId==null || _messageboxId=='') {
		return;
	}
	
	//initialize variables
	defaults = new NotifierDefaults(_messageboxId);
	_tableId = defaults.messagesTableId;
	newMessagesNumObjId = defaults.newMessagesNumDivId;
	numNewEmptyCss = defaults.messagesFlasherNewEmptyClassName;
	numNewCss = defaults.messagesFlasherNewClassName;
	totalMessagesNumObjId = defaults.totalMessagesNumDivId;
	
	//get the table's object reference
	_tableObj = document.getElementById(_tableId);
	
	//check for nulls
	if (_tableObj==null) {
		return;
	}
	
	//check for existing messages to delete
	numRows = _tableObj.rows.length;
	if (numRows<1) {
		alert("There are no messages to delete.");
	}
	
	//loop through the table's rows in reverse order
	numRows = _tableObj.rows.length;
	for (var i=(numRows-1);i>=0;i--) {
		//delete the current row message
		_tableObj.deleteRow(i);
	}
	
	//update the object's css
	$('#'+newMessagesNumObjId).removeClass(numNewCss);
	$('#'+newMessagesNumObjId).addClass(numNewEmptyCss);
	
	//update the object's value
	$('#'+newMessagesNumObjId).text(0);
	$('#'+totalMessagesNumObjId).text(0);
}

function deleteSelectedMessagesRows(_messageboxId) {
	//declare locals
	var _tableId = null;
	var _tableObj = null;
	var defaults = null;
	var numRows = 0;
	var currRowId = null;
	var newMessagesNumObjId = null;
	var numNewEmptyCss = null;
	var numNewCss = null;
	var numNew = 0;
	var numSelected = 0;
	var totalMessagesNumObjId = null;
	
	//check for nulls
	if (_messageboxId==null || _messageboxId=='') {
		return;
	}
	
	//initialize variables
	defaults = new NotifierDefaults(_messageboxId);
	_tableId = defaults.messagesTableId;
	newMessagesNumObjId = defaults.newMessagesNumDivId;
	numNewEmptyCss = defaults.messagesFlasherNewEmptyClassName;
	numNewCss = defaults.messagesFlasherNewClassName;
	totalMessagesNumObjId = defaults.totalMessagesNumDivId;
	
	//get the table's object reference
	_tableObj = document.getElementById(_tableId);
	
	//check for nulls
	if (_tableObj==null) {
		return;
	}
	
	//check for existing messages to delete
	numRows = _tableObj.rows.length;
	if (numRows<1) {
		alert("There are no messages to delete.");
	}
	
	//check for selected message rows
	numSelected = getSelectedMessagesCount(_messageboxId);
	if (numSelected<=0) {
		alert("Please selecte the messages to delete.");
		return;
	}
	
	//loop through the table's rows in reverse order
	numRows = _tableObj.rows.length;
	for (var i=(numRows-1);i>=0;i--) {
		//get the current row's id
		currRowId = _tableObj.rows[i].id;
		//check if the current row is selected
		if (isSelectedMessageRow(_messageboxId,currRowId)) {
			//delete the current row message
			deleteMessageRow(_messageboxId,currRowId,false);
		}
	}
	
	//recount the current number of rows
	numRows = _tableObj.rows.length;
	
	//get the total number of new messages
	numNew = getNewMessagesCount(_messageboxId);
	if (numNew==0) {
		//update the object's css
		$('#'+newMessagesNumObjId).removeClass(numNewCss);
		$('#'+newMessagesNumObjId).addClass(numNewEmptyCss);
	}
	
	//update the object's value
	$('#'+newMessagesNumObjId).text(numNew);
	$('#'+totalMessagesNumObjId).text(numRows);
}

function reRenderActionsMenu(_messageBoxId,_menuContainerId,_newOptionLabel,_newOptionValue,_options) {
	//declare locals
	var actionsMenu = "";
	var _menuContainerObj = null;
	
	//check for nulls
	if (_messageBoxId==null || _messageBoxId=='' || _menuContainerId==null || 
		_menuContainerId=='' || _newOptionLabel==null || _newOptionLabel=='' || 
		_newOptionValue==null || _newOptionValue=='' || _options==null) {
		return actionsMenu;
	}
	
	//get objects by their reference
	_menuContainerObj = document.getElementById(_menuContainerId);
	
	if (_menuContainerObj==null) {
		return;
	}
	
	//update the options
	if (_newOptionLabel.toLowerCase()=="showButtonClearAll".toLowerCase()) {
		_options.showButtonClearAll = _newOptionValue;
	}
	else if (_newOptionLabel.toLowerCase()=="showButtonClearSelected".toLowerCase()) {
		_options.showButtonClearSelected = _newOptionValue;
	}
	else if (_newOptionLabel.toLowerCase()=="showButtonMarkAllRead".toLowerCase()) {
		_options.showButtonMarkAllRead = _newOptionValue;
	}
	else if (_newOptionLabel.toLowerCase()=="showButtonMarkSelectedRead".toLowerCase()) {
		_options.showButtonMarkSelectedRead = _newOptionValue;
	}
	else if (_newOptionLabel.toLowerCase()=="showButtonMarkAllUnread".toLowerCase()) {
		_options.showButtonMarkAllUnread = _newOptionValue;
	}
	else if (_newOptionLabel.toLowerCase()=="showButtonMarkSelectedUnread".toLowerCase()) {
		_options.showButtonMarkSelectedUnread = _newOptionValue;
	}
	
	//re-render the menu
	actionsMenu = renderActionsMenu(_messageBoxId,_menuContainerId,_options);
	_menuContainerObj = $("#"+_menuContainerId);
	_menuContainerObj.html(actionsMenu);
}

function renderActionsMenu(_messageBoxId,_menuContainerId,_options) {
	//declare locals
	var actionsMenu = "";
	var displayNone = "style=\"display:none;\"";
	var _menuContainerObj = null;
	var numButtons = 6;
	var rowHeight = 20;
	var cssName = "menuContainerActions";
	var styleHeight = null;
	
	//check for nulls
	if (_messageBoxId==null || _messageBoxId=='' || _menuContainerId==null || _menuContainerId=='' || _options==null) {
		return actionsMenu;
	}
	
	//get objects by their reference
	_menuContainerObj = document.getElementById(_menuContainerId);
	
	//set the number of buttons to display
	numButtons = getNumDisplayedActionButtons(_options);
	if (numButtons<6) {
		cssName = "menuContainerActionsDynamic";
		if (numButtons>0) {
			styleHeight = (numButtons * rowHeight) + "px";
		}
	}
	
	//check for nulls
	if (_menuContainerObj==null) {
		actionsMenu += "<div id=\""+_menuContainerId+"\" class=\""+cssName+"\" ";
		if ((numButtons<6) && (numButtons>0)) {
			actionsMenu += "style=\"height:"+styleHeight+"\"";
		}		
		actionsMenu += ">";
	}
	
	//build the menu's contents
	actionsMenu += "<table class=\"menuContainerTable\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" >";
	//the markAllRead button
	actionsMenu += "<tr ";
	if (!_options.showButtonMarkAllRead) {
		actionsMenu += displayNone;
	}
	actionsMenu += " class=\"menuItem\" onmouseover=\"this.className='menuItemHover';\" onmouseout=\"this.className='menuItem';\" >";
	actionsMenu += "<td class=\"menuItemHorizontalSpacer\">";
	actionsMenu += "</td>";
	actionsMenu += "<td>";
	actionsMenu += "<div class=\"messageboxButtonMarkAllRead\" title=\"Mark all as read\" onclick=\"readAllMessagesRows('"+_messageBoxId+"');\">";
	actionsMenu += "</div>";
	actionsMenu += "</td>";
	actionsMenu += "<td>";
	actionsMenu += "<span class=\"menuButtonItemText\" onclick=\"readAllMessagesRows('"+_messageBoxId+"');\">";
	actionsMenu += "Mark all as read";
	actionsMenu += "</span>";
	actionsMenu += "</td>";
	actionsMenu += "</tr>";
	//the markAllUnread button
	actionsMenu += "<tr ";
	if (!_options.showButtonMarkAllUnread) {
		actionsMenu += displayNone;
	}
	actionsMenu += " class=\"menuItem\" onmouseover=\"this.className='menuItemHover';\" onmouseout=\"this.className='menuItem';\" >";
	actionsMenu += "<td class=\"menuItemHorizontalSpacer\">";
	actionsMenu += "</td>";
	actionsMenu += "<td>";
	actionsMenu += "<div class=\"messageboxButtonMarkAllUnread\" title=\"Mark all as unread\" onclick=\"unreadAllMessagesRows('"+_messageBoxId+"');\">";
	actionsMenu += "</div>";
	actionsMenu += "</td>";
	actionsMenu += "<td>";
	actionsMenu += "<span class=\"menuButtonItemText\" onclick=\"unreadAllMessagesRows('"+_messageBoxId+"');\">";
	actionsMenu += "Mark all as unread";
	actionsMenu += "</span>";
	actionsMenu += "</td>";
	actionsMenu += "</tr>";
	//the markSelectedRead button
	actionsMenu += "<tr ";
	if (!_options.showButtonMarkSelectedRead) {
		actionsMenu += displayNone;
	}
	actionsMenu += " class=\"menuItem\" onmouseover=\"this.className='menuItemHover';\" onmouseout=\"this.className='menuItem';\" >";
	actionsMenu += "<td class=\"menuItemHorizontalSpacer\">";
	actionsMenu += "</td>";
	actionsMenu += "<td>";
	actionsMenu += "<div class=\"messageboxButtonMarkSelectedRead\" title=\"Mark selected as read\" onclick=\"readSelectedMessagesRows('"+_messageBoxId+"');\">";
	actionsMenu += "</div>";
	actionsMenu += "</td>";
	actionsMenu += "<td>";
	actionsMenu += "<span class=\"menuButtonItemText\" onclick=\"readSelectedMessagesRows('"+_messageBoxId+"');\">";
	actionsMenu += "Mark selected as read";
	actionsMenu += "</span>";
	actionsMenu += "</td>";
	actionsMenu += "</tr>";
	//the markSelectedUnread button
	actionsMenu += "<tr ";
	if (!_options.showButtonMarkSelectedUnread) {
		actionsMenu += displayNone;
	}
	actionsMenu += " class=\"menuItem\" onmouseover=\"this.className='menuItemHover';\" onmouseout=\"this.className='menuItem';\" >";
	actionsMenu += "<td class=\"menuItemHorizontalSpacer\">";
	actionsMenu += "</td>";
	actionsMenu += "<td>";
	actionsMenu += "<div class=\"messageboxButtonMarkSelectedUnread\" title=\"Mark selected as unread\" onclick=\"unreadSelectedMessagesRows('"+_messageBoxId+"');\">";
	actionsMenu += "</div>";
	actionsMenu += "</td>";
	actionsMenu += "<td>";
	actionsMenu += "<span class=\"menuButtonItemText\" onclick=\"unreadSelectedMessagesRows('"+_messageBoxId+"');\">";
	actionsMenu += "Mark selected as unread";
	actionsMenu += "</span>";
	actionsMenu += "</td>";
	actionsMenu += "</tr>";
	//the clearAll button
	actionsMenu += "<tr ";
	if (!_options.showButtonClearAll) {
		actionsMenu += displayNone;
	}
	actionsMenu += " class=\"menuItem\" onmouseover=\"this.className='menuItemHover';\" onmouseout=\"this.className='menuItem';\" >";
	actionsMenu += "<td class=\"menuItemHorizontalSpacer\">";
	actionsMenu += "</td>";
	actionsMenu += "<td>";
	actionsMenu += "<div class=\"messageboxButtonClearAll\" title=\"Clear all messages\" onclick=\"deleteAllMessagesRows('"+_messageBoxId+"');\">";
	actionsMenu += "</div>";
	actionsMenu += "</td>";
	actionsMenu += "<td>";
	actionsMenu += "<span class=\"menuButtonItemText\" onclick=\"deleteAllMessagesRows('"+_messageBoxId+"');\">";
	actionsMenu += "Clear all messages";
	actionsMenu += "</span>";
	actionsMenu += "</td>";
	actionsMenu += "</tr>";
	//the clearSelected button
	actionsMenu += "<tr ";
	if (!_options.showButtonClearSelected) {
		actionsMenu += displayNone;
	}
	actionsMenu += " class=\"menuItem\" onmouseover=\"this.className='menuItemHover';\" onmouseout=\"this.className='menuItem';\" >";
	actionsMenu += "<td class=\"menuItemHorizontalSpacer\">";
	actionsMenu += "</td>";
	actionsMenu += "<td>";
	actionsMenu += "<div class=\"messageboxButtonClearSelected\" title=\"Clear selected messages\" onclick=\"deleteSelectedMessagesRows('"+_messageBoxId+"');\">";
	actionsMenu += "</div>";
	actionsMenu += "</td>";
	actionsMenu += "<td>";
	actionsMenu += "<span class=\"menuButtonItemText\" onclick=\"deleteSelectedMessagesRows('"+_messageBoxId+"');\">";
	actionsMenu += "Clear selected messages";
	actionsMenu += "</span>";
	actionsMenu += "</td>";
	actionsMenu += "</tr>";
	actionsMenu += "</table>";
	
	//check for nulls
	if (_menuContainerObj==null) {
		actionsMenu += "</div>";
	}
	
	//return the method's value
	return actionsMenu;
}

function renderOptionsMenu(_messageBoxId,_menuContainerId,_options) {
	//declare locals
	var defaults = null;
	var actionsMenuContainerId = null;
	var optionsMenu = "";
	var displayNone = "style=\"display:none;\"";
	var _menuContainerObj = null;
	var messagesNumInterval = 50;
	var messagesNumMin = 50;
	var messagesNumMax = 500;
	
	//check for nulls
	if (_messageBoxId==null || _messageBoxId=='' || _menuContainerId==null || _menuContainerId=='' || _options==null) {
		return optionsMenu;
	}
	
	//initialize variables
	defaults = new NotifierDefaults(_messageBoxId);
	actionsMenuContainerId = defaults.messageBoxActionsMenuContainerId;

	//get objects by their reference
	_menuContainerObj = document.getElementById(_menuContainerId);
	
	//check for nulls
	if (_menuContainerObj==null) {
		optionsMenu += "<div id=\""+_menuContainerId+"\" class=\"menuContainerOptions\" >";
	}
	
	//build the menu's contents
	optionsMenu += "<table class=\"menuContainerTable\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" >";
	//the max messages combo
	optionsMenu += "<tr class=\"menuItem\" onmouseover=\"this.className='menuItemHover';\" onmouseout=\"this.className='menuItem';\" >";
	optionsMenu += "<td class=\"menuItemHorizontalSpacer\"></td>";
	optionsMenu += "<td>";
	optionsMenu += "<span class=\"menuButtonItemText\">";
	optionsMenu += "Maximum messages";
	optionsMenu += "</span>";
	optionsMenu += "</td>";
	optionsMenu += "<td class=\"menuItemHorizontalSpacer\"></td>";
	optionsMenu += "<td>";
	optionsMenu += "<select size=\"1\" value=\""+_options.maxMessages+"\" onchange=\"alert('new maxMessages value: '+this.value);\">";
	for (var i=messagesNumMin;i<=messagesNumMax;(i += messagesNumInterval)) {
		optionsMenu += "<option value=\""+i+"\">"+i+"</option>";
	}
	optionsMenu += "</select>";
	optionsMenu += "</td>";
	optionsMenu += "</tr>";
	//the showButtonMarkAllRead checkbox
	optionsMenu += "<tr class=\"menuItem\" onmouseover=\"this.className='menuItemHover';\" onmouseout=\"this.className='menuItem';\" >";
	optionsMenu += "<td class=\"menuItemHorizontalSpacer\"></td>";
	optionsMenu += "<td colspan=\"3\">";
	optionsMenu += "<input id=\"cbShowButtonMarkAllRead\" type=\"checkbox\" value=\""+_options.showButtonMarkAllRead+"\" checked=\""+_options.showButtonMarkAllRead+"\" onclick=\"reRenderActionsMenu('"+_messageBoxId+"','"+actionsMenuContainerId+"','showButtonMarkAllRead',this.checked,"+_options+");\">";
	optionsMenu += "<span class=\"menuItemHorizontalSpacer\"></span>";
	optionsMenu += "<label for=\"cbShowButtonMarkAllRead\" class=\"menuButtonItemText\" >";
	optionsMenu += "Show button MarkAllRead";
	optionsMenu += "</label>";
	optionsMenu += "</td>";
	optionsMenu += "</tr>";
	//the showButtonMarkAllUnread checkbox
	optionsMenu += "<tr class=\"menuItem\" onmouseover=\"this.className='menuItemHover';\" onmouseout=\"this.className='menuItem';\" >";
	optionsMenu += "<td class=\"menuItemHorizontalSpacer\"></td>";
	optionsMenu += "<td colspan=\"3\">";
	optionsMenu += "<input id=\"cbShowButtonMarkAllUnread\" type=\"checkbox\" value=\""+_options.showButtonMarkAllUnread+"\" checked=\""+_options.showButtonMarkAllUnread+"\" onclick=\"reRenderActionsMenu('"+_messageBoxId+"','"+actionsMenuContainerId+"','showButtonMarkAllUnread'this.checked,"+_options+");\">";
	optionsMenu += "<span class=\"menuItemHorizontalSpacer\"></span>";
	optionsMenu += "<label for=\"cbShowButtonMarkAllUnread\" class=\"menuButtonItemText\" >";
	optionsMenu += "Show button MarkAllUnread";
	optionsMenu += "</label>";
	optionsMenu += "</td>";
	optionsMenu += "</tr>";
	//the showButtonMarkSelectedRead checkbox
	optionsMenu += "<tr class=\"menuItem\" onmouseover=\"this.className='menuItemHover';\" onmouseout=\"this.className='menuItem';\" >";
	optionsMenu += "<td class=\"menuItemHorizontalSpacer\"></td>";
	optionsMenu += "<td colspan=\"3\">";
	optionsMenu += "<input id=\"cbShowButtonMarkSelectedRead\" type=\"checkbox\" value=\""+_options.showButtonMarkSelectedRead+"\" checked=\""+_options.showButtonMarkSelectedRead+"\" onclick=\"alert('showButtonMarkSelectedRead: '+this.checked);\">";
	optionsMenu += "<span class=\"menuItemHorizontalSpacer\"></span>";
	optionsMenu += "<label for=\"cbShowButtonMarkSelectedRead\" class=\"menuButtonItemText\" >";
	optionsMenu += "Show button MarkSelectedRead";
	optionsMenu += "</label>";
	optionsMenu += "</td>";
	optionsMenu += "</tr>";
	//the showButtonMarkSelectedUnread checkbox
	optionsMenu += "<tr class=\"menuItem\" onmouseover=\"this.className='menuItemHover';\" onmouseout=\"this.className='menuItem';\" >";
	optionsMenu += "<td class=\"menuItemHorizontalSpacer\"></td>";
	optionsMenu += "<td colspan=\"3\">";
	optionsMenu += "<input id=\"cbShowButtonMarkSelectedUnread\" type=\"checkbox\" value=\""+_options.showButtonMarkSelectedUnread+"\" checked=\""+_options.showButtonMarkSelectedUnread+"\" onclick=\"alert('showButtonMarkSelectedUnread: '+this.checked);\">";
	optionsMenu += "<span class=\"menuItemHorizontalSpacer\"></span>";
	optionsMenu += "<label for=\"cbShowButtonMarkSelectedUnread\" class=\"menuButtonItemText\" >";
	optionsMenu += "Show button MarkSelectedUnread";
	optionsMenu += "</label>";
	optionsMenu += "</td>";
	optionsMenu += "</tr>";
	//the showButtonClearAll checkbox
	optionsMenu += "<tr class=\"menuItem\" onmouseover=\"this.className='menuItemHover';\" onmouseout=\"this.className='menuItem';\" >";
	optionsMenu += "<td class=\"menuItemHorizontalSpacer\"></td>";
	optionsMenu += "<td colspan=\"3\">";
	optionsMenu += "<input id=\"cbShowButtonClearAll\" type=\"checkbox\" value=\""+_options.showButtonClearAll+"\" checked=\""+_options.showButtonClearAll+"\" onclick=\"alert('showButtonClearAll: '+this.checked);\">";
	optionsMenu += "<span class=\"menuItemHorizontalSpacer\"></span>";
	optionsMenu += "<label for=\"cbShowButtonClearAll\" class=\"menuButtonItemText\" >";
	optionsMenu += "Show button ClearAll";
	optionsMenu += "</label>";
	optionsMenu += "</td>";
	optionsMenu += "</tr>";
	//the showButtonClearSelected checkbox
	optionsMenu += "<tr class=\"menuItem\" onmouseover=\"this.className='menuItemHover';\" onmouseout=\"this.className='menuItem';\" >";
	optionsMenu += "<td class=\"menuItemHorizontalSpacer\"></td>";
	optionsMenu += "<td colspan=\"3\">";
	optionsMenu += "<input id=\"cbShowButtonClearSelected\" type=\"checkbox\" value=\""+_options.showButtonClearSelected+"\" checked=\""+_options.showButtonClearSelected+"\" onclick=\"alert('showButtonClearSelected: '+this.checked);\">";
	optionsMenu += "<span class=\"menuItemHorizontalSpacer\"></span>";
	optionsMenu += "<label for=\"cbShowButtonClearSelected\" class=\"menuButtonItemText\" >";
	optionsMenu += "Show button ClearSelected";
	optionsMenu += "</label>";
	optionsMenu += "</td>";
	optionsMenu += "</tr>";
	//the showTotal checkbox
	optionsMenu += "<tr class=\"menuItem\" onmouseover=\"this.className='menuItemHover';\" onmouseout=\"this.className='menuItem';\" >";
	optionsMenu += "<td class=\"menuItemHorizontalSpacer\"></td>";
	optionsMenu += "<td colspan=\"3\">";
	optionsMenu += "<input id=\"cbShowTotal\" type=\"checkbox\" value=\""+_options.showTotal+"\" checked=\""+_options.showTotal+"\" onclick=\"toggleTotalItemsDisplay('"+_messageBoxId+"',this.checked);\">";
	optionsMenu += "<span class=\"menuItemHorizontalSpacer\"></span>";
	optionsMenu += "<label for=\"cbShowTotal\" class=\"menuButtonItemText\" >";
	optionsMenu += "Show Total";
	optionsMenu += "</label>";
	optionsMenu += "</td>";
	optionsMenu += "</tr>";
	//the showNew checkbox
	optionsMenu += "<tr class=\"menuItem\" onmouseover=\"this.className='menuItemHover';\" onmouseout=\"this.className='menuItem';\" >";
	optionsMenu += "<td class=\"menuItemHorizontalSpacer\"></td>";
	optionsMenu += "<td colspan=\"3\">";
	optionsMenu += "<input id=\"cbShowNew\" type=\"checkbox\" value=\""+_options.showNew+"\" checked=\""+_options.showNew+"\" onclick=\"toggleNewItemsDisplay('"+_messageBoxId+"',this.checked);\">";
	optionsMenu += "<span class=\"menuItemHorizontalSpacer\"></span>";
	optionsMenu += "<label for=\"cbShowNew\" class=\"menuButtonItemText\" >";
	optionsMenu += "Show New";
	optionsMenu += "</label>";
	optionsMenu += "</td>";
	optionsMenu += "</tr>";

	//flashOnIncoming
	//flashInterval

	optionsMenu += "</table>";
	
	//check for nulls
	if (_menuContainerObj==null) {
		optionsMenu += "</div>";
	}
	
	//return the method's value
	return optionsMenu;
}

function getNumDisplayedActionButtons(_options) {
	//declare locals
	var numButtons = 6;
	
	//check for nulls
	if (_options==null) {
		return 0;
	}
	
	//set the number of buttons to display
	if (!_options.showButtonMarkAllRead) {
		numButtons -= 1;
	}
	if (!_options.showButtonMarkAllUnread) {
		numButtons -= 1;
	}
	if (!_options.showButtonMarkSelectedRead) {
		numButtons -= 1;
	}
	if (!_options.showButtonMarkSelectedUnread) {
		numButtons -= 1;
	}
	if (!_options.showButtonClearAll) {
		numButtons -= 1;
	}
	if (!_options.showButtonClearSelected) {
		numButtons -= 1;
	}
	if (numButtons<0) {
		numButtons = 0;
	}
	
	//return the method's value
	return numButtons;
}

function toggleMenu(_menuContainerId,_menuToHide) {
	//declare locals
	var _menuObj = null;
	var display = null;
	
	//check for nulls
	if (_menuContainerId==null || _menuContainerId=='') {
		return;
	}
	
	//get elements by their ids
	_menuObj = $("#"+_menuContainerId);
	
	//check for nulls
	if (_menuObj==null) {
		return;
	}
	
	//check for menu to hide
	if (_menuToHide!=null && _menuToHide!='') {
		//hide the menu
		$("#"+_menuToHide).slideUp();
	}
	
	//get the object's current display
	display = _menuObj.css("display");
	
	//set defaults if needed
	if (display==null || display=='') {
		display = "none";
	}
	
	//set the display according to the current display
	if (display.toLowerCase()=="none") {
		//_menuObj.show('slow');
		_menuObj.slideDown('slow');
	}
	else {
		//_menuObj.hide('slow');
		_menuObj.slideUp('slow');
	}
}

function toggleNewItemsDisplay(_messageboxId,_show) {
	//declare locals
	var defaults = null;
	var tragetObjId = null;
	var newDisplay = null;
	
	//check for nulls
	if (_messageboxId==null || _messageboxId=='') {
		return;
	}
	
	//initialize variables
	defaults = new NotifierDefaults(_messageboxId);
	tragetObjId = defaults.newMessagesNumDivId;

	//set teh new display
	if (_show) {
		newDisplay = "block";
	}
	else {
		newDisplay = "none";
	}
	
	//get the object's reference
	$("#"+tragetObjId+"_parent").css("display",newDisplay);
}

function toggleTotalItemsDisplay(_messageboxId,_show) {
	//declare locals
	var defaults = null;
	var tragetObjId = null;
	var newDisplay = null;
	
	//check for nulls
	if (_messageboxId==null || _messageboxId=='') {
		return;
	}
	
	//initialize variables
	defaults = new NotifierDefaults(_messageboxId);
	tragetObjId = defaults.totalMessagesNumDivId;

	//set teh new display
	if (_show) {
		newDisplay = "inline";
	}
	else {
		newDisplay = "none";
	}
	
	//get the object's reference
	$("#"+tragetObjId+"_parent").css("display",newDisplay);
}

