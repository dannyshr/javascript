
function Gauge(config) {
	//declare globals
	this.defaultOptions = {
		width: 500
		,height: 300
		,greenFrom:0
		,greenTo: 60
		,yellowFrom:60
		,yellowTo: 80
		,redFrom: 80
		,redTo: 100
		,majorTicks: ["0","10","20","30","40","50","60","70","80","90","100"]
		,minorTicks: 5
	};
	this.gauge = null;
	this.config = config;
	this.containerId = (this.config.containerId ? this.config.containerId : null);
	this.url = (this.config.url ? this.config.url : null);
	this.label = (this.config.label ? this.config.label : null);
	this.refreshInterval = (this.config.refreshInterval ? this.config.refreshInterval : null);
	this.dataMethod = (this.config.dataMethod ? this.config.dataMethod : null);
	this.onsuccess = (this.config.onsuccess ? this.config.onsuccess : null);
	this.onfailure = (this.config.onfailure ? this.config.onfailure : null);
	this.options = (this.config.options ? this.config.options : this.defaultOptions);
	this.drawGauge=function() {
		var _gauge = this.getGauge();
		_gauge.draw(this.getGaugeData(),this.getOptions());
	};
	this.getGauge=function() {
		//check for nulls
		if (this.gauge==null || this.gauge=="undefined" || this.gauge=="") {
			this.gauge = new google.visualization.Gauge(document.getElementById(this.containerId));
		}
		
		//return the method's value
		return this.gauge;
	};
	this.getGaugeData=function(dataValue) {
		//declare locals
		var data = null;
		
		//set defaults if necessary
		if (dataValue==null || dataValue=="undefined" || dataValue=="") {
			dataValue = 0;
		}
		
		//create a new data object
		data = new google.visualization.DataTable();
		data.addColumn("string", "Label");
		data.addColumn("number", "Value");
		data.addRows(1);
		data.setValue(0,0,this.label);
		data.setValue(0,1,dataValue);
		
		//return the method's value
		return data;
	};
	this.getOptions=function() {
		//return the method's value
		return this.options;
	};
	this.setOptions=function(_options) {
		//set the member's value
		this.options = _options;
	};
	this.setContainer=function(_containerId) {
		//set the member's value
		this.containerId = _containerId;
	};
	this.setUrl=function(_url) {
		//set the member's value
		this.url = _url;
	};
	this.setLabel=function(_label) {
		//set the member's value
		this.label = _label;
	};
	this.setInterval=function(_refreshInterval) {
		//set the member's value
		this.refreshInterval = _refreshInterval;
	};
	this.setDataMethod=function(_dataMethod) {
		//set the member's value
		this.dataMethod = _dataMethod;
	};
	this.getRequest=function() {
		//build a request
		var requestObj = {
			url: this.url
			,onsuccess: this.onsuccess
			,onfailure: this.onfailure
		};
		
		//return the method's value
		return requestObj;
	};
	this.start=function() {
		//declare locals
		var _requestObj = this.getRequest();
		var threadConfig = {
			request: _requestObj
			,threadAction: this.dataMethod
			,interval: this.refreshInterval
		};
		RSI.startThread(threadConfig);
	};
	this.stop=function() {
		//declare locals
		var _requestObj = this.getRequest();
		RSI.stopThread(_requestObj.url);
	};
	this.getJson=function(response) {
		//declare locals
		var json = null;
		let min = 1;
		let max = 100;
		let _randNum = Math.floor(Math.random() * (max - min + 1)) + min;
		
		//fix the response
		json = {"data": _randNum};

		//return the method's value
		return json;
	};
	this.onFailure=function(request,response) {
		//declare locals
		var json = null;
		
		//stop all threads
		this.stop();
		
		//get the json response
		json = this.getJson(response);
		
		//show a failure message
		alert(json.messages[0].severity+": "+json.messages[0].messageBody);
	};
	this.onSuccess=function(request,response) {
		//declare locals
		var json = null;
		var _opts = null;
		var _gauge = null;
		var _data = null;
		
		//get the json response
		json = this.getJson(response);
		
		//get the gauge's parts
		_opts = this.getOptions();
		_gauge = this.getGauge();

		if (json.hasOwnProperty("data")) {
			_data = this.getGaugeData(parseInt(json.data));
		}
		else {
			_data = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
		}

		//re-render the gauge
		_gauge.draw(_data,_opts);
	};
};
