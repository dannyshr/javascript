//declare globals
var dlgTest = null;
var _uiLocker = null;

$(document).ready(function() {
	renderMainHeader();
	renderMainFooter();
	renderTestDialog();
	renderSpinner();
	renderTestDialog();
});

function renderMainHeader() {
	//declare locals
	var headerK = new Header({
		id: "headerK"
		,height: "30px"
		,width: "100%"
		,items: [
		    ,new Panel({
		    	align: "left"
		    	,float: "left"
		    	,height: "26px"
		    	,width: "200px"
		    	,items: [
				    new Label({
				    	align: "left"
				    	,float: "left"
				    	,style: "padding-left:5px;"
				    	,text: document.title
						,textStyleClass: "headerLabelText"
						,textStyleClassHover: "headerLabelTextHover"
				    })
				]
		    })
		    ,new Panel({
		    	align: "right"
		    	,float: "right"
		    	,height: "26px"
	    		,id: "headerKButtons"
		    	,width: "360px"
		    	,cellspacing: "3px"
		    	,items: [
		    		new ToolbarButton({
    			    	height: "24px"
    			    	,float: "left"
    			    	,width: "82px"
    			    	,text: "TB Button"
    			    	,tooltip: "click here"
						,icon: "test/images/logout.png"
    			    	,onclick: function() {
    			    		alert("you clicked the TB Button");
    			    	}
    			    })
    			    ,new SplitButton({
    			    	height: 24
    			    	,disabled: false
    			    	,float: "left"
    			    	,optionsAlignment: "bottom"
    			    	,optionsButtonTooltip: "Test SplitButton options"
    			    	,optionsHeight: 135
    			    	,optionsWidth: 100
    			    	,onOptionClickResetDefault: false
    			    	,defaultItem: new SplitButtonOption({
	    			    	height: 24
        			    	,width: 24
        			    	,tooltip: "click Split Option 3"
    						,icon: "test/images/logout_dis.png"
        			    	,onclick: function() {
        			    		alert("you clicked the Split Option 3 button");
        			    	}
			    	    })
    			    	,items: [
    			    	    new SplitButtonOption({
    	    			    	height: 24
	        			    	,width: "100%"
	        			    	,text: "Split Option 1"
	        			    	,tooltip: "click Split Option 1"
	        			    	,onclick: function() {
	        			    		alert("you clicked the Split Option 1 button");
	        			    	}
    			    	    })
    			    	    ,new SplitButtonOption({
    	    			    	height: 24
	        			    	,width: "100%"
	        			    	,text: "Split Option 2"
	        			    	,tooltip: "click Split Option 2"
	    						,icon: "test/images/logout.png"
	        			    	,onclick: function() {
	        			    		alert("you clicked the Split Option 2 button");
	        			    	}
    			    	    })
    			    	    ,new SplitButtonOption({
    			    	    	id: "spltOpt3"
        	    			    ,height: 24
	        			    	,width: "100%"
	        			    	,text: "Split Option 3"
	        			    	,tooltip: "click Split Option 3"
	    						,icon: "test/images/logout_dis.png"
	        			    	,onclick: function() {
	        			    		alert("you clicked the Split Option 3 button");
	        			    	}
    			    	    })
    			    	    ,new SplitButtonOption({
    	    			    	height: 24
	        			    	,width: "100%"
	        			    	,text: "Split Option 4"
	        			    	,tooltip: "click Split Option 4"
	        			    	,onclick: function() {
	        			    		alert("you clicked the Split Option 4 button");
	        			    	}
    			    	    })
    			    	]
    			    })
    			    ,new Panel({
    			    	width: "80px"
    			    	,float: "left"
    			    	,html: renderThemesCombo("lnkTheme","onThemeChanged")
    			    	,align: "left"
    			    })
    			    ,new Button({
    			    	height: "24px"
    			    	,width: "60px"
    			    	,float: "left"
    			    	,align: "center"
    			    	,text: "Logout"
    			    	,tooltip: "click logout"
    			    	,onclick: function() {
    			    		alert("you clicked the Logout button");
    			    	}
    			    })
    			    ,new Button({
    			    	height: "24px"
    			    	,width: "60px"
    			    	,float: "left"
    			    	,align: "center"
    			    	,text: "Login"
    			    	,tooltip: "click login"
    			    	,onclick: function() {
    			    		alert("you clicked the Login button");
    			    	}
    			    })
		    	]
		    })
		]
	});
	headerK.render();
	//$(".button, .buttonHover, .toolbarButton, .toolbarButtonHover").draggable();
	$("#headerKButtons").sortable({
		connectWith: "#footerKButtons"
	});
}

function renderMainFooter() {
	//declare locals
	var footerK = new Footer({
		id: "footerK"
		,height: "30px"
		,width: "100%"
		,items: [
		    new Panel({
		    	align: "center"
		    	,float: "left"
		    	,width: "93%"
		    	,items: [
	    	        new Label({
	    	        	text: "Copyright @2011 by Danny Shraga"
						,textStyleClass: "headerLabelText"
						,textStyleClassHover: "headerLabelTextHover"
	    	        })
		    	]
		    })
		    ,new Panel({
		    	id: "footerKButtons"
		    	,float: "right"
		    	,height: "30px"
		    	,width: "6%"
		    	,style: "border:1px solid #ff0000;"
		    	,tooltip: "drag component here"
		    })
		]
	});
	footerK.render();
	$("#footerKButtons").sortable();
}

function renderTestDialog() {
	//declare locals
	var _icon = "";
	var _sbItems = [];
	var _roundBorders = "none";
	
	if (document.getElementById("cbDlgIcon").checked) {
		_icon = "test/images/logout.png";
	}
	if (document.getElementById("cbDlgSB").checked) {
		_sbItems = [
		    new Panel({
		    	align: "center"
		    	,float: "left"
		    	,width: "86%"
		    	,items: [
	    	        new Label({
	    	        	text: "Copyright @2011 by Danny Shraga"
						,textStyleClass: "headerLabelText"
						,textStyleClassHover: "headerLabelTextHover"
	    	        })
		    	]
		    })
		    ,new HSeparator({
		    	float: "left"
		    })
		    ,new Panel({
		    	id: "dlgFooterButtons"
		    	,float: "right"
		    	,height: "28px"
		    	,width: "10%"
		    	,icon: "test/images/logout.png"
		    	,tooltip: "click me"
		    })
		];
	}
	if (document.getElementById("cbDlgRoundBorders").checked) {
		_roundBorders = document.getElementById("txtDlgRoundBorders").value;
	}
	
	var _config = {
		height: 200
		,width: 250
		,header: document.getElementById("txtDlgHeader").value
		,icon: _icon
		,closeable: document.getElementById("cbDlgCloseable").checked
		,collapsible: document.getElementById("cbDlgCollapsible").checked
		,maximizeable: document.getElementById("cbDlgMaximizeable").checked
		,movable: document.getElementById("cbDlgMovable").checked
		,modal: document.getElementById("cbDlgModal").checked
		,resizable: document.getElementById("cbDlgResizable").checked
		,recenterOnWinResize: document.getElementById("cbDlgRecenterOnWinResize").checked
		,resizableHandles: document.getElementById("txtResizableHanldes").value
		,roundBorders: _roundBorders
		,statusbarItems: _sbItems
		,items: [
		    new Panel({
		    	id: "loginPanel"
		    	,height: "98%"
		    	,width: "98%"
		    	,items: [
		    	    new Panel({
		    	    	height: "8px"
		    	    	,width: "100%"
		    	    })
		    	    ,new Panel({
		    	    	cellspacing: 3
		    	    	,id: "userRow"
		    	    	,height: "30px"
		    	    	,width: "100%"
		    	    	,items: [
    	    	    	    new Label({
    	    	    	    	align: "left"
    	    	    	    	,float: "left"
    	    	    	    	,text: "User: "
    	    	    	    })
    	    	    	    ,new Textbox({
    	    	    	    	id: "txtUser"
    	    	    	    	,align: "left"
    	    	    	    	,float: "right"
    	    	    	    	,maxlength: 10
    	    	    	    	,defaultText: "User Name"
    	    	    	    	,value: ""
    	    	    	    })
		    	    	]
		    	    })
		    	    ,new Panel({
		    	    	height: "8px"
		    	    	,width: "100%"
		    	    })
		    	    ,new Panel({
		    	    	cellspacing: 3
		    	    	,id: "passwordRow"
		    	    	,height: "30px"
		    	    	,width: "100%"
		    	    	,items: [
    	    	    	    new Label({
    	    	    	    	align: "left"
    	    	    	    	,float: "left"
    	    	    	    	,text: "Password: "
    	    	    	    })
    	    	    	    ,new Password({
    	    	    	    	id: "txtPass"
    	    	    	    	,align: "left"
    	    	    	    	,float: "right"
    	    	    	    	,maxlength: 10
    	    	    	    	,value: ""
    	    	    	    })
		    	    	]
		    	    })
		    	    ,new Panel({
		    	    	height: "8px"
		    	    	,width: "100%"
		    	    })
		    	    ,new Panel({
		    	    	id: "buttonsRow"
		    	    	,height: "30px"
		    	    	,width: "100%"
		    	    	,items: [
		    	    	    new Panel({
		    	    	    	cellspacing: 3
		    	    	    	,items: [
		    	    	    	    new Button({
		    	    	    	    	align: "left"
		    	    	    	    	,float: "left"
	    	        			    	,height: "24px"
    	            			    	,width: "60px"
	            			    		,text: "Login"
    	            			    	,tooltip: "Click here to login"
    	            			    	,onclick: function() {
    	            			    		alert("you clicked the Logout button");
    	            			    	}
		    	    	    	    })
		    	    	    	    ,new Button({
		    	    	    	    	align: "left"
		    	    	    	    	,float: "left"
	    	        			    	,height: "24px"
    	            			    	,width: "60px"
	            			    		,text: "Clear"
    	            			    	,tooltip: "Click here to clear the details"
    	            			    	,onclick: function() {
    	            			    		clearLoginForm();
    	            			    	}
		    	    	    	    })
		    	    	    	]
		    	    	    })
		    	    	]
		    	    })
		    	]
		    })
		]
	};
	if (dlgTest==null) {
		dlgTest = new DialogWindow(_config);
		dlgTest.render();
	}
	else {
		dlgTest.reRender(_config);
	}
}

function setWindowDispplay() {
	if (dlgTest==null) {
		return;
	}
	if (dlgTest.isHidden()) {
		dlgTest.show();
	}
	else {
		dlgTest.hide();
	}
}

function renderSpinner() {
	var _spinner = null;
	
	_spinner = new Spinner({
		width: 15
		,height: 20
		,minValue: 1
		,maxValue: 10
		,interval: 2
		,cycle: false
		,disabled: false
		,style: "position:absolute;top:100px;left:100px;"
		,onclickUp: function() {
			//alert("up clicked...");
		}
		,onclickDown: function() {
			//alert("down clicked...");
		}
	});
	
	_spinner.render();
}

function clearLoginForm() {
	//declare locals
	var arrCompsIds = new Array(
		"txtUser"
		,"txtPass"
	);
	var currComp = null;
	
	//loop through the ids
	for (var i=0;i<arrCompsIds.length;i++) {
		//get the current component
		currComp = document.getElementById(arrCompsIds[i]);
		
		//check for nulls
		if (currComp==null) {
			continue;
		}
		
		//clear the component's value
		currComp.value = "";
	}
}

function renderUiLocker() {
	var _opacity = document.getElementById("txtDlgOpacity").value; 
	var _style = "background-color: "+document.getElementById("txtDlgBackgroundColor").value+";";
	//_style += "height:150px;width:250px;position:absolute;top:200px;left:0px;";
	var _alignTo = "uiLockerSample";
	var _config = {
		opacity: _opacity
		,align: "overlay"
		,alignTo: _alignTo
		,style: _style
	};
	if (_uiLocker==null) {
		_uiLocker = new UiLocker(_config);
		_uiLocker.render();
	}
	else {
		_uiLocker.reRender(_config);
	}
	_uiLocker.show();
}

function hideUiLocker() {
	if (_uiLocker==null) {
		return;
	}
	_uiLocker.hide();
}

function renderTestTabs() {
	//declare locals
	var _icon = "test/images/logout.png";
	
	var _tabPanel = new TabPanel({
		id: "testTabsPanel"
		,width: 400
		,height: 350
		,items: [
		    new Tab({
		    	icon: _icon
		    	,text: "Tab 1"
		    	,html: "Thi is the first tab's contents"
		    })
		    ,new Tab({
		    	icon: _icon
		    	,text: "Tab 2"
		    	,html: "Thi is the second tab's contents"
		    })
	    ]
	});
	_tabPanel.render();
}

function renderThemesCombo(_forLinkId,_onThemeChanged) {
	//declare locals
	var arrThemes = new Array(
		"black"
		,"blue"
		,"green"
		,"orange"
		,"red"
	);
	var themesPath = "../../../wabclient/css/themes/";
	var html = "";
	
	//render the html
	html += '<select id="cmbThemes" size="1" onchange="changeTheme(this.value,\''+_forLinkId+'\',\''+_onThemeChanged+'\');">';
	//loop through the avaiable themes
	for (var i=0;i<arrThemes.length;i++) {
		html += '<option value="'+themesPath+arrThemes[i]+'/wab.css">';
		html += arrThemes[i];
		html += '</option>';
	}
	html += '</select>';
	
	//return the method's value
	return html;
}

function changeTheme(_newValue,_forLinkId,_onThemeChanged) {
	//get the lable by its value
	var linkComp = document.getElementById(_forLinkId);
	linkComp.href=_newValue;
	if (typeof _onThemeChanged=="function") {
		_onThemeChanged(_newValue);
	}
	else if (typeof _onThemeChanged=="string") {
		eval(_onThemeChanged+"('"+_newValue+"')");
	}
}

function onThemeChanged(_newTheme) {
	//alert("inside onThemeChanged("+_newTheme+")");
}
