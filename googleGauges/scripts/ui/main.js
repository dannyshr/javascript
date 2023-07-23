/**
* Grid with local data store
*
* @author Danny Shraga
* @copyright (c) 2010
* @date 10/05/2010
* @version 1.00
*
* @license main.js is licensed under the terms of the Open Source
* LGPL 3.0 license. Commercial use is permitted to the extent that the
* code/component(s) do NOT become part of another Open Source or Commercially
* licensed development library or toolkit without explicit permission.
* 
* License details: http://www.gnu.org/licenses/lgpl.html
*/

Ext.ns("Example");
Ext.BLANK_IMAGE_URL = "images/default/s.gif";

//declare global variables
var dataStore = null;
var grid = null;
var mainWin = null;
var serverOsInfo = null;
var serverHeapInfo = null;
var heapChart = null;

//create an ArrayStore
dataStore = new Ext.data.ArrayStore({
	fields:[
		{name:"name"}
		,{name:"ip"}
		,{name:"protocol"}
		,{name:"port",type:"int"}
		,{name:"context"}
		,{name:"serverType"}
	]
});

//create Drawer components
serverOsInfo = new Ext.ux.plugins.WindowDrawer({
	xtype:"windowdrawer"
	,closeAction:"hide"
	,side:"e"
	,animate: true
	,resizable: false
	,width:300
	,minWidth:300
	,items:[
		new Ext.Panel({
			itemId:"serverInfoOsMainPanel"
			,layout:"border"
			,frame:true
			,title:"No title"
			,bodyStyle:'padding:5px 5px 0'
			,height:200
			,items:[
				new Ext.Panel({
					region:"center"
					,border:false
					,layout:"fit"
					,monitorResize:true
					,height:200
					,html:"<div id=\"osInfo\" style=\"width:100%;height:100%;border:0px solid #000000;\"></div>"
				})
			]
		})			
	]
});
serverHeapInfo = new Ext.ux.plugins.WindowDrawer({
	xtype:"windowdrawer"
	,closeAction:"hide"
	,side:"s"
	,animate:true
	,resizable:false
	,height:350
	,minHeight:350
	,items:[
		new Ext.Panel({
			itemId:"serverInfoHeapMainPanel"
			,layout:"border"
			,frame:true
			,title:"No title"
			,bodyStyle:'padding:5px 5px 0'
			,height:330
			,items:[
				new Ext.Panel({
					region:"center"
					,html:"<div id=\"heapInfo\" style=\"width:100%;height:100%;border:0px solid #000000;\"></div>"
				})
			]
		})			
	]
});

//example grid pre-configured class
Example.Grid = Ext.extend(Ext.grid.GridPanel, {
	initComponent:function() {
		var config = {
			store:dataStore
			,columns:[{
				id:"name"
				,header:"Server Name"
				,width:40
				,sortable:true
				,dataIndex:"name"
				,renderer:this.renderServerName.createDelegate(this)
				},{
				header:"Server IP"
				,width:20
				,sortable:true
				,dataIndex:"ip"
				},{
				header:"Protocol"
				,width:20
				,sortable:true
				,dataIndex:"protocol"
				},{
				header:"Port"
				,width:20
				,sortable:true
				,dataIndex:"port"
				},{
				header:"Context"
				,width:20
				,sortable:true
				,dataIndex:"context"
				},{
				id:"serverType"
				,header:"Server Type"
				,width:20
				,sortable:true
				,dataIndex:"serverType"
				,renderer:this.renderServerType.createDelegate(this)
			}]
			,viewConfig:{forceFit:true}
			,sm: new Ext.grid.RowSelectionModel({
				singleSelect:true
			})
		}; //end of config object

		//apply config
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		
		//call parent
		Example.Grid.superclass.initComponent.apply(this, arguments);
	} //end of function initComponent
	
	,renderServerName:function(val, cell, record) {
		//get data
		var data = record.data;
		var html = "";
		var qtip = getAgentUrl(data);
		
		//build the html
		html += '<div qtip="'+qtip+'">';
		html += '<table border="0" cellpadding="2" cellspacing="0">';
		html += '<tr>';
		html += '<td style="width:30px">';
		html += '<div>';
		html += '<img qtip="'+qtip+'" src="icons/server.png" height="24px" />'
		html += '</div>';
		html += '</td>';
		html += '<td>';
		html += '<div qtip="'+qtip+'">';
		html += data.name;
		html += '</div>';
		html += '</td>';
		html += '</tr>';
		html += '</table>';
		html += '</div>';
		
		//return markup
		return html;
	} //end of function renderLastName
	
	,renderServerType:function(val, cell, record) {
		//get data
		var data = record.data;
		var imgSource = null;
		var html = "";
		
		//build the html
		if (data.serverType=="lenovoThinkCentre") {
			imgSource = "icons/lenovoThinkCentre.jpg";
		}
		else if (data.serverType=="T2000") {
			imgSource = "icons/T2000.jpg";
		}
		else if (data.serverType=="T5120") {
			imgSource = "icons/T5120.jpg";
		}
		else if (data.serverType=="T5220") {
			imgSource = "icons/T5220.jpg";
		}
		else if (data.serverType=="T6320") {
			imgSource = "icons/T6320.jpg";
		}
		else if (data.serverType=="T6340") {
			imgSource = "icons/T6340.jpg";
		}
		html += '<div>';
		html += '<table border="0" cellpadding="2" cellspacing="0">';
		html += '<tr>';
		html += '<td>';
		html += '<img src="'+imgSource+'" />'
		html += '</td>';
		html += '<td>';
		html += data.serverType;
		html += '</td>';
		html += '</tr>';
		html += '</table>';
		html += '</div>';
		
		//return markup
		return html;
	} //end of function renderServerType

});
Ext.reg("examplegrid", Example.Grid);

//application main entry point
Ext.onReady(function() {
	Ext.QuickTips.init();
	grid = new Example.Grid({
		region:"center"
		,layout:"fit"
		,listeners:{
			render:function() {
				this.getSelectionModel().on({
					//selectionchange is fired too often for us, so buffer it for 10ms
					selectionchange:{buffer:10, fn:function(sm, selection) {
						//get record from either Cell of Row SelectionModel
						var record = selection && selection.record ? selection.record : null;
						if(!record && sm && sm.getSelected) {
							record = sm.getSelected();
						}
						//check if a record was selected
						toggleServerInfo(sm,record);
					}}
				})
			}
		}
	});
	
	//create viewport with border layout
	mainWin = new Ext.Window({
		layout:"border"
		,closable:false
		,collapsible:false
		,title:"Servers Monitor"
		,height:250
		,width:550
		,minHeight:250
		,minWidth:550
		,tbar: [{
			text:"Load Servers"
			,cls:"x-btn-text-icon" 
			,icon:"icons/reload.png"
			,tooltip:{text:"Click here to reload the data"}
			,handler: function() {
				loadServersJQuery();
			}
		}]
		,items:[
			grid
			,new Ext.Panel({
				region:"south"
				,html:"<div id=\"dataContainer\" style=\"display:none;width:0px;height:0px;border:0px solid transparent;\"></div>"
				,collapsible:false
				,bodyBorder:false
				,border:false
				,height:0
			})
		]
		,plugins: [
			serverOsInfo
			,serverHeapInfo
		]
	});
	mainWin.show();
}); //end of function onReady

function loadServersExtJs() {
	//check for nulls
	if (dataStore==null || dataStore=="undefined") {
		Ext.Msg.show({
		   title:"System Messages"
		   ,msg:"Store is empty."
		   ,buttons:Ext.Msg.OK
		   ,icon:Ext.MessageBox.WARNING
		});
		return;
	}
	Ext.Ajax.request({
		method:"POST"
		,url:"data/serversData.html"
		,success: function(response,opts) {
			serversLoaded(response.responseText,opts);
		}
		,failure: function(response,opts) {
			serversFailedLoading(response,opts);
		}
	});
}

function loadServersJQuery() {
	//check for nulls
	if (dataStore==null || dataStore=="undefined") {
		Ext.Msg.show({
		   title:"System Messages"
		   ,msg:"Store is empty."
		   ,buttons:Ext.Msg.OK
		   ,icon:Ext.MessageBox.WARNING
		});
		return;
	}
	var opts = {
		type:"POST"
		,url:"data/serversData.html"
	}
	$.ajax({
		type:"POST"
		,url:"data/serversData.html"
		,success: function(data) {
			serversLoaded(data,opts);
		}
		,failure: function(data) {
			serversFailedLoading(data,opts);
		}
	});
}

function serversLoaded(response,opts) {
	//declare locals
	var containerId = "dataContainer";
	var dataDivId = "data";
	var container = null;
	var dataDiv = null;
	var rawData = null;
	var data = null;
	
	//initialize objects
	container = Ext.getDom(containerId);
	if (container==null || container=="undefined") {
		showError("container with id: "+containerId+" is null.");
		return;
	}
	container.innerHTML = response;
	dataDiv = Ext.getDom(dataDivId);
	if (dataDiv==null || dataDiv=="undefined") {
		showError("dataDiv with id: "+dataDivId+" is null.");
		return;
	}
	rawData = dataDiv.innerHTML;
	
	//check for nulls
	if (rawData==null || rawData=="undefined" || rawData=="") {
		showError("rawData is null.");
		return;
	}
	
	//load the data
	data = eval(" ("+rawData+") ");
	dataStore.loadData(data);
}

function serversFailedLoading(response,opts) {
	Ext.Msg.show({
	   title:"System Messages"
	   ,msg:"Error while trying to load servers from: "+opts.url+".<br/>Response is: "+response.responseText+"<br/>Status is: "+response.status
	   ,buttons:Ext.Msg.OK
	   ,icon:Ext.MessageBox.WARNING
	});
}

function showError(_errorMessage) {
	Ext.Msg.show({
	   title:"System Messages"
	   ,msg:_errorMessage
	   ,buttons:Ext.Msg.OK
	   ,icon:Ext.MessageBox.ERROR
	});
}

function toggleServerInfo(selectionModel,record) {
	//declare locals
	var server = null;
	var panelOs = null;
	var panelHeap = null;
	
	//check for a selected server record
	if (!selectionModel.hasSelection()) {
		mainWin.drawers.e.hide();
		mainWin.drawers.s.hide();
	}
	else {
		server = record.data;
		panelOs = mainWin.drawers.e.getComponent("serverInfoOsMainPanel");
		panelHeap = mainWin.drawers.s.getComponent("serverInfoHeapMainPanel");
		panelOs.setTitle(server.name+": "+server.ip+" - OS info");
		panelHeap.setTitle(server.name+": "+server.ip+" - Heap Info");
		getOsInfo(server);
		getHeapInfo(server);
		mainWin.drawers.e.show();
		mainWin.drawers.s.show();
	}
}

function getAgentUrl(server) {
	//declare locals
	var agentUrl = null;
	var agentPath = "agents";
	
	//check for nulls
	if (Utils.isEmpty(server)) {
		return;
	}
	
	//build the url from the server
	agentUrl = server.protocol+"://"+server.ip+":"+server.port+"/"+server.context+"/"+agentPath;
	
	//return the method's value
	return agentUrl;
}

function getOsInfo(server) {
	//declare locals
	var agentName = "/os.jsp?action=getOs";
	var agentUrl = null;
	var panelId = "osInfo";
	
	//check for nulls
	if (Utils.isEmpty(server)) {
		return;
	}
	
	//build the agent's url
	agentUrl = getAgentUrl(server)+agentName;
	showPleaseWait(panelId,true);
	getInfoByUrl(agentUrl,panelId);
}

function getHeapInfo(server) {
	//declare locals
	var agentName = "/heapAgent.jsp?action=getHeap";
	var agentUrl = null;
	var panelId = "heapInfo";
	
	//check for nulls
	if (Utils.isEmpty(server)) {
		return;
	}
	
	//build the agent's url
	agentUrl = getAgentUrl(server)+agentName;
	showPleaseWait(panelId,true);
	startHeapMonitor(agentUrl,panelId);
	//render the chart
	var title = "Heap size for server "+server.name+":"+server.ip;
	renderHeapChart(panelId,title);
}

function getHeapInfoAction(url,panelId) {
	//create a new Request object
	var requestObj = {
		url:url
		//,onsuccess: "onSuccess"
		,onsuccess: function(requestUrl,response) {
			onSuccess(requestUrl,response,panelId);
		}
		,onfailure: function(requestUrl,response) {
			onFailure(requestUrl,response,panelId);
		}
	};
	RSI.doGet(requestObj);
}

function startHeapMonitor(url,panelId) {
	var interval = 1000;
	var requestObj = {
		url:url
		//,onsuccess: "onSuccess"
		,onsuccess: function(requestUrl,response) {
			onSuccess(requestUrl,response,panelId);
		}
		,onfailure: function(requestUrl,response) {
			onFailure(requestUrl,response,panelId);
		}
	};
	RSI.startThread(requestObj,"getHeapInfoAction('"+url+"','"+panelId+"')",interval);
}

function getInfoByUrl(url,panelId,_afterSleep) {
	//declare locals
	var requestObj = null;
	var sleepTime = 2000;
	var panelObj = null;
	
	//check for nulls
	if (Utils.isEmpty(url)) {
		return;
	}
	
	//check for an afterSleep param
	if (Utils.isEmpty(_afterSleep)) {
		//create a new Request object
		requestObj = {
			url:url
			//,onsuccess: "onSuccess"
			,onsuccess: function(requestUrl,response) {
				onSuccess(requestUrl,response,panelId);
			}
			,onfailure: function(requestUrl,response) {
				onFailure(requestUrl,response,panelId);
			}
		};
		RSI.doGet(requestObj);
		RSI.sleep(sleepTime,'getInfoByUrl("'+url+'","'+panelId+'","_afterSleep")');
	}
	else {
		//check if the request is still alive
		if (!RSI.isAlive(url)) {
			panelObj = Ext.getDom(panelId);
			if (panelObj==null || panelObj=="undefined") {
				return;
			}
			panelObj.innerHTML = "Failed to get response for url: ["+url+"]";
		}
	}
}

function onSuccess(requestUrl,response,panelId) {
	//declare locals
	var panelObj = null;
	var jsonObj = null;
	
	//parse the response into a JSON object
	jsonObj = eval(" ("+response+") ");
	
	//render the response in its panel
	panelObj = Ext.getDom(panelId);
	if (panelObj==null || panelObj=="undefined") {
		return;
	}
	updateHeapChart(jsonObj);
	//panelObj.innerHTML = response;
}

function onFailure(requestUrl,response,panelId) {
	//declare locals
	var panelObj = null;
	
	//render the response in its panel
	panelObj = Ext.getDom(panelId);
	if (panelObj==null || panelObj=="undefined") {
		return;
	}
	panelObj.innerHTML = "A failure occured while trying to fetch ["+requestUrl+"]:<br/>"+response;
}

function showPleaseWait(panelId,show) {
	//declare locals
	var panelObj = null;
	
	//render the response in its panel
	panelObj = Ext.getDom(panelId);
	if (panelObj==null || panelObj=="undefined") {
		return;
	}
	if (show) {
		panelObj.innerHTML = "<img src=\"icons/loading.gif\" />";
	}
	else {
		panelObj.innerHTML = "";
	}
}

function renderHeapChart(containerId,title) {
	heapChart = new Highcharts.Chart({
		chart: {
			renderTo:containerId
			,defaultSeriesType:"spline"
			,margin: [50, 150, 60, 80]
		}
		,title: {
			text:title
			,style: {
				margin:"10px 100px 0 0" // center it
			}
		}
		,xAxis: {
			title: {
				text:"Time"
			}
			,type:"datetime"
			,tickPixelInterval: 200
		}
		,yAxis: {
			title: {
				text:"Heap (KB)"
			}
			,plotLines: [{
				value: 0
				,width: 1
				,color: "#808080"
			}]
		}
		,tooltip: {
			formatter: function() {
					return "<b>"+ this.series.name +"</b><br/>"+
					Highcharts.dateFormat("%d/%m/%Y %H:%M:%S", this.x) +"<br/>"+ 
					Highcharts.numberFormat(this.y);
			}
		}
		,legend: {
			layout:"vertical"
			,style: {
				left:"auto"
				,bottom:"auto"
				,right:"10px"
				,top:"100px"
			}
		}
		,series: [{
			name:"Heap Size"
			,data: (function() {
				// generate an array of random data
				var data = [];
				var time = (new Date()).getTime();
				var i = 0;
				for (i = -5; i <= 0; i++) {
					data.push({
						x: time + i * 1000
						,y: (Math.random()*12000)
					});
				}
				return data;
			})()
		}]
	});
}

function updateHeapChart(jsonData) {
	//declare locals
	var time = jsonData.heap.time;//this is nanotime
	var serverDuration = jsonData.heap.duration+" (nanoseconds)";
	var maxMem = jsonData.heap.max;
	var freeMem = jsonData.heap.free;
	freeMem = (freeMem/1000);
	//var timestamp = new Date(time/1000000).getTime();
	var timestamp = new Date().getTime();
	heapChart.series[0].addPoint([timestamp,freeMem], true, true);
	
}

