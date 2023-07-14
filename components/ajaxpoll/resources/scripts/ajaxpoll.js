
function AjaxPoll() {
	//declare locals
	var _intervalId = null;
	var _intervalIdCountdown = null;
	
	this.start=function(_pollButtonId,_interval,_countdownLabelId) {
		//declare locals
		var strFunc = null;

		//check for nulls
		if (_pollButtonId==null || _interval==null || isNaN(_interval)) {
			return;
		}
		
		//clear the previous intervalId
		this.stop();
		
		//start the countdown interval
		this.startCountdown(_countdownLabelId,_interval/1000);
		
		//start an interval
		strFunc = "performClick('" + _pollButtonId + "')";
		_intervalId = window.setInterval(strFunc,_interval);
	};
	this.stop=function() {
		//check for nulls
		if (_intervalId==null) {
			return;
		}
		
		//clear the countdown intervalId
		this.stopCountdown();
		
		//try to clear the global interval
		try {
			window.clearInterval(_intervalId);
		}
		catch (err) {};
	};
	this.startCountdown=function(_labelId,_startFrom) {
		//declare locals
		var strFunc = null;

		//check for nulls
		if (_labelId==null || _startFrom==null || isNaN(_startFrom)) {
			return;
		}
		
		//clear the previous intervalId
		this.stopCountdown();
		
		//start an interval
		strFunc = "performCountdown('" + _labelId + "'," + _startFrom + ")";
		_intervalIdCountdown = window.setInterval(strFunc,1000);
	};
	this.stopCountdown=function() {
		//check for nulls
		if (_intervalIdCountdown==null) {
			return;
		}
		
		//try to clear the global interval
		try {
			window.clearInterval(_intervalIdCountdown);
		}
		catch (err) {};
	};
	this.startPoll=function(_pollButtonId,_pollIntervalCountdownTdId,_txtPollId,_pollIntervalTdId,_controlButtonId) {
		//dclare locals
		var _pollIntervalCountdownTdObj = null;
		var _txtPollObj = null;
		var _pollIntervalTdObj = null;
		var _controlButtonObj = null;
		var _pollInterval = null;
		var _running = false;
		var _currentState = "";
		
		//check for nulls
		if (_pollButtonId==null || _pollIntervalCountdownTdId==null || _txtPollId==null || _pollIntervalTdId==null || _controlButtonId==null) {
			return;
		}
		
		//get elements by their ids
		_pollIntervalCountdownTdObj = document.getElementById(_pollIntervalCountdownTdId);
		_txtPollObj = document.getElementById(_txtPollId);
		_pollIntervalTdObj = document.getElementById(_pollIntervalTdId);
		_controlButtonObj = document.getElementById(_controlButtonId);
		
		//reset the control button's mode
		if (_controlButtonObj!=null) {
			if (_controlButtonObj.value.toUpperCase()=="Start".toUpperCase()) {
				_controlButtonObj.value = "Pause";
				_running = true;
				_currentState = "Started";
			}
			else if (_controlButtonObj.value.toUpperCase()=="Continue".toUpperCase()) {
				_controlButtonObj.value = "Pause";
				_running = true;
				_currentState = "Continued";
			}
			else if (_controlButtonObj.value.toUpperCase()=="Pause".toUpperCase()) {
				_controlButtonObj.value = "Continue";
				_running = false;
				_currentState = "Paused";
			}
		}
		
		//reset poll display values
		if (_txtPollObj!=null) {
			_txtPollObj.disabled=true;
			_pollInterval = parseInt(_txtPollObj.value);
		}
		if (_pollIntervalTdObj!=null) {
			_pollIntervalTdObj.innerHTML = _pollInterval;
		}
		if (_currentState.toUpperCase()=="Started".toUpperCase()) {
			if (_pollIntervalCountdownTdObj!=null) {
				_pollIntervalCountdownTdObj.innerHTML = _pollInterval;
			}
		}
		else if (_currentState.toUpperCase()=="Continued".toUpperCase()) {
			if (_pollIntervalCountdownTdObj!=null) {
				_pollInterval = parseInt(_pollIntervalCountdownTdObj.innerHTML);
			}
		}

		//check the execution flag
		if (_running) {
			this.start(_pollButtonId,_pollInterval*1000,_pollIntervalCountdownTdId);
		}
		else {
			this.stop();
		}
	};
	this.stopPoll=function(_pollButtonId,_pollIntervalCountdownTdId,_txtPollId,_pollIntervalTdId,_controlButtonId) {
		//dclare locals
		var _pollIntervalCountdownTdObj = null;
		var _txtPollObj = null;
		var _pollIntervalTdObj = null;
		var _controlButtonObj = null;
		var _pollInterval = null;
		
		//check for nulls
		if (_pollButtonId==null || _pollIntervalCountdownTdId==null || _txtPollId==null || _pollIntervalTdId==null || _controlButtonId==null) {
			return;
		}
		
		//get elements by their ids
		_pollIntervalCountdownTdObj = document.getElementById(_pollIntervalCountdownTdId);
		_txtPollObj = document.getElementById(_txtPollId);
		_pollIntervalTdObj = document.getElementById(_pollIntervalTdId);
		_controlButtonObj = document.getElementById(_controlButtonId);
		
		//reset the control button's mode
		if (_controlButtonObj!=null) {
			_controlButtonObj.value = "Start";
		}
		
		//reset poll display values
		if (_txtPollObj!=null) {
			_txtPollObj.disabled=false;
			_pollInterval = parseInt(_txtPollObj.value);
		}
		if (_pollIntervalTdObj!=null) {
			_pollIntervalTdObj.innerHTML = _pollInterval;
		}
		if (_pollIntervalCountdownTdObj!=null) {
			_pollIntervalCountdownTdObj.innerHTML = _pollInterval;
		}
		
		//stop the poll
		this.stop();
	};
};

function performClick(_buttonId) {
	//declare locals
	var buttonObj = null;
	
	//check for nulls
	if (_buttonId==null) {
		return;
	}
	
	//get elements by their ids
	buttonObj = document.getElementById(_buttonId);
	
	//check for nulls
	if (buttonObj==null) {
		return;
	}
	
	//try to click the button
	try {
		buttonObj.click();
	}
	catch (err) {};
};

function performCountdown(_labelId,_startFrom) {
	//declare locals
	var labelObj = null;
	var currValue = null;
	
	//check for nulls
	if (_labelId==null || _startFrom==null || isNaN(_startFrom)) {
		return;
	}
	
	//get elements by their ids
	labelObj = document.getElementById(_labelId);
	
	//check for nulls
	if (labelObj==null) {
		return;
	}
	
	//get the current label's value
	currValue = parseInt(labelObj.innerHTML);
	if (currValue==null || isNaN(currValue) || currValue==0) {
		currValue = _startFrom;
	}

	//reset the label's value
	currValue--;
	labelObj.innerHTML = currValue;
};
