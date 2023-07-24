
Ext.namespace('Ext.nit');
Ext.nit.themes = [
	["../resources/themes/black/black.css","<img src=\"../resources/icons/palette.png\">","Black","A Black theme","#000000"],
	["../resources/themes/blue/blue.css","<img src=\"../resources/icons/palette.png\">","Blue","A Blue theme","#0000ff"],
	["../resources/themes/green/green.css","<img src=\"../resources/icons/palette.png\">","Green","A Green theme","#00ff00"],
	["../resources/themes/red/red.css","<img src=\"../resources/icons/palette.png\">","Red","A Red theme","#ff0000"]
];
var themesStore = new Ext.data.ArrayStore({
	idIndex:0
    ,fields: ["href","themeIcon","themeName","themeTooltip","color"]
    ,data : Ext.nit.themes
});
var serversStore = new Ext.data.ArrayStore({
	idIndex:"name"
    ,fields: ["name","protocol","host","port","context","icon"]
});
var cmbUrls = new Ext.form.ComboBox({
	id:"cmbUrls"
    ,tpl: '<tpl for=".">'
        +'<div ext:qtip="{protocol}://{host}:{port}/{context}" class="x-combo-list-item">'
        +'<img src="{icon}">&nbsp;&nbsp;{name}'
        +'</div>'
        +'</tpl>'
    ,store: serversStore
    ,displayField: "name"
    ,typeAhead: true
    ,enableKeyEvents:true
    ,mode: "local"
    ,triggerAction: "all"
    ,emptyText:"Select a url..."
    ,selectOnFocus:true
    ,region:"center"
});
var btnConnect = new Ext.Button({
	region:"east"
	,text: "Connect"
	,tooltip: {text:"Select a URL from the list, and click here to connect to it"}
	,icon:"../resources/icons/connect.png"
	,cls:"x-btn-text-icon"
	,handler: function() {
		loadUrl(null);
	}
});
//press enter keyboard
cmbUrls.on("keypress", function(textField,e) { //setup an onkeypress event handler
	//alert("e.getKey():"+e.getKey());
	if(e.getKey()==e.ENTER && this.getValue().length>0) { //listen for the ENTER key
		//click the connect button
		var url = textField.getValue();
		var nonSpace = false;
		if (url==null || url=="undefined" || url=="") {
			return;
		}
		if (url.length) {
			for (var i=0;i<url.length;i++) {
				if (url[i]!=" ") {
					nonSpace = true;
					break;
				}
			}
		}
		if (nonSpace) {
			loadUrl(url);
		}
	}
});

Ext.onReady(function(){
	Ext.QuickTips.init();
	var nitUI = null;
	nitUI = new Ext.Viewport({
        layout: "border"
        ,items: [
	        //create instance immediately
	        new Ext.Panel({
	            region: "north"
	            ,layout: "border"
	            ,height: 50 // give north and south regions a height
	            ,tbar: [{
	            	xtype:"label"
	            	,text:"Welcome user"
	            } 
	            ,"->"
                ,new Ext.form.ComboBox({
                	id:"cmbThemes"
                    ,tpl: '<tpl for=".">'
	                    +'<div ext:qtip="{themeTooltip}" class="x-combo-list-item" style="background-color:{color};">'
	                    +'{themeIcon} {themeName}'
	                    +'</div>'
	                    +'</tpl>'
			        ,store: themesStore
			        ,displayField: "themeName"
			        ,typeAhead: true
			        ,mode: "local"
			        ,triggerAction: "all"
			        ,emptyText:"Select a theme..."
			        ,selectOnFocus:true
			        ,region:"center"
			    })
	            ,new Ext.Button({
	            	text:"Log out"
	            	,icon:"../resources/icons/logout.png"
	            	,cls:"x-btn-text-icon"
    				,tooltip: {text:"Click here to logout"}
    				,handler: function() {
						logOut();
					}
	            })]
	            ,items: [
	                cmbUrls
	                ,btnConnect
	            ]
	        })
	        //in this instance the TabPanel is not wrapped by another panel
	        //since no title is needed, this Panel is added directly
	        //as a Container
	        ,new Ext.TabPanel({
	        	id:"tabsPanel"
	            ,region: "center" // a center region is ALWAYS required for border layout
	            ,enableTabScroll:true
	            ,deferredRender: false
	            ,activeTab: 0	// first tab initially active
	            ,items: [
	            ]
	        })
	        ,new Ext.Panel({
	            region: "south"
	            ,html:""
	            ,height: 0
	            ,tbar: [{
		        	id:"statusbarStatus"
		        	,xtype:"label"
		            ,text: "Ready"
	            }
	            ,"->"
	            ,{
	            	id:"statusbarInbox"
	            	,tooltip: {text:"Inbox"}
	            	,icon:"../resources/icons/inbox.png"
	            	,cls:"x-btn-text-icon"
    				,handler: function() {
	            		displayServerMessage("Hi there","Error");
	            	}
	            }
	            ,"-"
	            ,{
	            	id:"statusbarClock"
	            	,xtype:"label"
	            	,text: ""
	            }]
	        })
        ]
    });
	getServers();
});

var timeIntervalId = null;
var MESSAGES_HEADER = "NIT - System Messages";
startTime();

function getServers() {
	Ext.Ajax.request({
		url: "../agents/servers.jsp"
		,params: {
			"action":"getServers" 
			,"datatype":"json"
			,"onfailure":"serversFailedLoad"
		}
		,success: function(response,opts) {
			serversLoaded(response,opts);
		}
		,failure: function(response,opts) {
			serversFailedLoad(response,opts);
		}
	});
}

function serversLoaded(response,opts) {
	//declare locals
	var data = null;
	var rawData = null;
	var message = null;
	var servers = null;
	var serverObj = null;
	var serverData = null;
	var serversData = [];
	
	//parse the response
	data = response.responseText;
	rawData = eval(" ("+data+") ");
	//rawData = JSON.parse(data);
	//check for messages
	if (rawData.messages) {
		message = eval(" ("+rawData.messages[0]+") ");
		if (rawData.servers) {
			servers = rawData.servers;
		}
		if (servers==null) {
			displayServerMessage(message.messageBody,message.severity);
		}
		else {
			displayServerMessage(message.messageBody+" ("+servers.length+")",message.severity);
			//create an array from the servers JSON object
			for (var i=0;i<servers.length;i++) {
				serverObj = eval(" ("+servers[i]+") ");
				serverData = [];
				serverData.push(serverObj.name);
				serverData.push(serverObj.protocol);
				serverData.push(serverObj.host);
				serverData.push(serverObj.port);
				serverData.push(serverObj.context);
				serverData.push("../resources/icons/"+serverObj.icon);
				serversData.push(serverData);
			}
			serversStore.loadData(serversData);
		}
	}
}

function serversFailedLoad(response,opts) {
	//declare locals
	var data = null;
	var rawData = null;
	var message = null;
	
	//parse the response
	data = response.responseText;
	rawData = eval(" ("+data+") ");
	
	//check for messages
	if (rawData.messages) {
		message = eval(" ("+rawData.messages[0]+") ");
		displayServerMessage(message.messageBody,message.severity);
	}
}

function severityToImage(severity) {
	//declare locals
	var src = null;
	var img = null;
	
	//check for nulls
	if (severity==null || severity=="undefined" || severity=="") {
		return "";
	}
	
	//render the return value
	if (severity.toLowerCase()=="info") {
		src = "../resources/icons/info.png";
	}
	else if (severity.toLowerCase()=="warning") {
		src = "../resources/icons/warning.png";
	}
	else if (severity.toLowerCase()=="error") {
		src = "../resources/icons/error.png";
	}
	img = "<img src=\""+src+"\"/>";
	
	//return the method's value
	return img;
}

function displayServerMessage(_message,_severity) {
	//declare locals
	var img = severityToImage(_severity);
	new Ext.ux.plugins.MessageWindow({
		title:MESSAGES_HEADER
		,iconCls:"iconInbox"
		,autoDestroy: true//default = true
	    ,autoHeight: true
		,autoHide: true//default = true
	    ,bodyStyle:"text-align:left"
	    ,closable: true
	    ,help: false//no help tool
		,html:"<table border=\"0\"><tr><td>"+img+"</td><td style=\"width:5px;\"></td><td style=\"vertical-align:middle;\"><label class=\"x-window-mc\" style=\"border:none;\">"+_message+"</label></td></tr></table>"
	    ,hideFx: {
	        delay: 5000
	        //,duration: 0.25,
	        ,mode:"standard"//null,'standard','custom',or default ghost
	        ,useProxy: false //default is false to hide window instead
	    }
	    ,showFx: {
	        duration: 0.25 //defaults to 1 second
	        ,mode:"standard"//null,'standard','custom',or default ghost
	        ,useProxy: false //default is false to hide window instead
	    }
	    ,width: 250 //optional (can also set minWidth which = 200 by default)
	}).show(Ext.getDoc());
}

function getCurrentTime() {
	//declare locals
	var time = new Date();
	var dtPattern = "dd/MM/yyyy HH:mm:SS";
	var timeStr = formatDateTime(time,dtPattern);
	var clockLabel = Ext.getCmp("statusbarClock");
	if (clockLabel!=null && clockLabel!="undefined") {
		clockLabel.setText(timeStr);
	}
}

function startTime() {
	timeIntervalId = window.setInterval("getCurrentTime()",1000);
}

function stopTime() {
	window.clearInterval(timeIntervalId);
}

function logOut() {
	Ext.Msg.show({
		title:MESSAGES_HEADER
		,msg: "Are you sure you want to logout ?"
		,buttons: Ext.Msg.YESNO
		,icon: Ext.MessageBox.QUESTION
		,fn: function(btn) {
			if (btn=="yes") {
				Ext.Msg.show({
					title:MESSAGES_HEADER
					,msg: "logging out..."
					,buttons: Ext.Msg.CANCEL
					,icon: Ext.MessageBox.INFO
				});
			}
		}
	});
}

function loadUrl(url) {
	//declare locals
	var comp = Ext.getCmp("cmbUrls");
	var tabsPanel = null;
	var newTab = null;
	
	//check for nulls
	if (url==null || url=="undefined" || url=="") {
		url = comp.value;
	}
	if (url==null || url=="undefined" || url=="") {
		Ext.Msg.show({
			title:MESSAGES_HEADER
			,msg: "you must select a url first..."
			,buttons: Ext.Msg.OK
			,icon: Ext.MessageBox.WARNING
		});
	}
	else {
		Ext.getCmp("statusbarStatus").setText("Loading...");
		tabsPanel = Ext.getCmp("tabsPanel");
		//check if the url is from the combo or not
		if (isUrlInDataStore(url)) {
			url = getFixedAgentUrl(url);
			//show the server's agents list tab
			newTab = tabsPanel.add({
				title:url
				,closable: true
				,iconCls:"tabIconServer"
				,autoScroll: true
				,html:"<iframe src=\""+url+"\" frameborder=\"0\" scrolling=\"auto\" style=\"width:100%;height:100%;border:0px solid transparent;\"></iframe>"
				,bodyStyle:"font-family:sans-serif;font-size:12px;padding:5px"
			});
		}
		else {
			url = getFixedUrl(url);
			newTab = tabsPanel.add({
				title:url
				,closable: true
				,iconCls:"tabIconWeb"
				,autoScroll: true
				,html:"<iframe src=\""+url+"\" frameborder=\"0\" scrolling=\"auto\" style=\"width:100%;height:100%;border:0px solid transparent;\"></iframe>"
				,bodyStyle:"font-family:sans-serif;font-size:12px;padding:5px"
			});
		}
		tabsPanel.setActiveTab(newTab);
		Ext.getCmp("statusbarStatus").setText("Ready");
	}
}

function isUrlInDataStore(url) {
	//declare locals
	var retVal = false;
	
	//check for nulls
	if (url==null || url=="undefined" || url=="") {
		return false;
	}
	
	//check if the url is from the combo or not
	serversStore.each(function(record) {
		if (url==record.data.name) {
			retVal = true;
		}
	});
	
	//return the method's value
	return retVal;
}

function getFixedAgentUrl(url) {
	//declare locals
	var fixedUrl = null;
	
	//check for nulls
	if (url==null || url=="undefined" || url=="") {
		return null;
	}
	
	//loop through the servers
	serversStore.each(function(record) {
		if (url==record.data.name) {
			fixedUrl = record.data.protocol+"://"+record.data.host+":"+record.data.port+"/"+record.data.context;
		}
	});
	
	//return the method's value
	return fixedUrl;
}

function getFixedUrl(url) {
	//declare locals
	var fixedUrl = null;
	var http = "http://";
	var www = "www.";
	var httpwww = http+www;
	
	//check for nulls
	if (url==null || url=="undefined" || url=="") {
		return null;
	}
	
	//fix the url
	if (url.toLowerCase().indexOf(http)==-1) {
		//http does NOT exist
		fixedUrl = http+url;
	}
	else {
		//only add www. after the http and before the url
		//first clean the http string
		fixedUrl = url;
		//fixedUrl = url.substr(http.length);
		//fixedUrl = httpwww+fixedUrl;
	}
	
	//return the method's value
	return fixedUrl;
}
