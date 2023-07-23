
Ext.ns("Emb");
Ext.BLANK_IMAGE_URL = "resources/ext-3.2.1/images/default/s.gif";

//declare global variables
var dataStore = null;
var grid = null;
var mainWin = null;

//create an ArrayStore
dataStore = new Ext.data.ArrayStore({
	fields:[
		{name:"index"}
		,{name:"filename"}
		,{name:"filetype"}
		,{name:"filesize"}
	]
});

Emb.Grid = Ext.extend(Ext.grid.GridPanel, {
	initComponent:function() {
		var config = {
			store:dataStore
			,columns:[{
				header:"#"
				,width:5
				,sortable:true
				,dataIndex:"index"
				}
				,{
				header:"File Name"
				,width:80
				,sortable:true
				,dataIndex:"filename"
				}
				,{
				header:"File Type"
				,width:10
				,sortable:true
				,dataIndex:"filetype"
				,renderer:this.renderFileType.createDelegate(this)
				}
				,{
				header:"File Size"
				,width:10
				,sortable:true
				,dataIndex:"filesize"
				,renderer:this.renderFileSize.createDelegate(this)
				}
			]
			,viewConfig:{forceFit:true}
			,sm: new Ext.grid.RowSelectionModel({
				singleSelect:true
			})
		}; //end of config object

		//apply config
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		
		//call parent
		Emb.Grid.superclass.initComponent.apply(this, arguments);
	} //end of function initComponent
	
	,renderFileType:function(val, cell, record) {
		//get data
		var data = record.data;
		var html = "";
		var qtip = data.filetype;
		var _urlPath = "file:///c:/danny/mediaBrowser/resources/icons/filestypes/"
		var imgUrl = _urlPath+data.filetype+".png";
		var imgPath = urlToPath(imgUrl);
		var imgSource = "resources/icons/filestypes/"+data.filetype+".png";
		
		//build the html
		html += '<div qtip="'+qtip+'">';
		html += '<table border="0" cellpadding="2" cellspacing="0">';
		html += '<tr>';
		//check if an icon exists for this file type
		if (fileExists(imgPath)) {
			html += '<td style="width:30px">';
			html += '<div>';
			html += '<img qtip="'+qtip+'" src="'+imgSource+'" height="24px" />'
			html += '</div>';
			html += '</td>';
		}
		html += '<td>';
		html += '<div qtip="'+qtip+'">';
		html += data.filetype;
		html += '</div>';
		html += '</td>';
		html += '</tr>';
		html += '</table>';
		html += '</div>';
		
		//return markup
		return html;
	} //end of function renderFileType
	,renderFileSize:function(val, cell, record) {
		//get data
		var data = record.data;
		var html = "";
		var size = parseFloat(data.filesize);
		var dataSize = null;
		var dataSizeType = null;
		var num = null;
		
		//fix the size string
		if (size>1000000) {
			dataSize = parseFloat((size/1000000));
			dataSizeType = " MB";
		}
		else if (size>1000) {
			dataSize = parseFloat((size/1000));
			dataSizeType = " KB";
		}
		else {
			dataSize = size;
			dataSizeType = " bytes";
		}
		num = new Number(dataSize);
		dataSize = num.toPrecision(4) + dataSizeType;
		
		//build the html
		html += '<div>';
		html += dataSize;
		html += '</div>';
		
		//return markup
		return html;
	}//end of function renderFileSize

});
Ext.reg("embgrid", Emb.Grid);

//application main entry point
Ext.onReady(function() {
	Ext.QuickTips.init();
	grid = new Emb.Grid({
		region:"center"
		,split: false
		,collapsible:false
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
						//get the selected record's data
						getFileInfo(sm,record);
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
		,title:"ספרים"
		,height:550
		,width:650
		,minHeight:200
		,minWidth:350
		,renderTo: "extContainer"
		,x: 100
		,y: 200
		,items:[
			grid
		]
		,tbar: [{
			text:"Load Files"
			,cls:"x-btn-text-icon" 
			,icon:"resources/icons/reload.png"
			,tooltip:{text:"Click here to reload the data"}
			,handler: function() {
				loadVideoFiles();
			}
		}]
	});
	mainWin.show();
	
}); //end of function onReady

function filesFailedLoading(response,opts) {
	Ext.Msg.show({
	   title:"System Messages"
	   ,msg:"Error while trying to load files from: "+opts.url+".<br/>Response is: "+response.responseText+"<br/>Status is: "+response.status
	   ,buttons:Ext.Msg.OK
	   ,icon:Ext.MessageBox.WARNING
	});
}

function getFileInfo(selectionModel,record) {
	//declare locals
	var file = null;
	var fileType = null;
	var fileName = null;
	var publisher = null;
	var year = null;
	var title = null;
	var isbnPrefix = "_(ISBN_";
	var isbnSuffix = ")";
	var isbnPrefixIndex = -1;
	var isbnSuffixIndex = -1;
	var isbn = null;
	
	//check for a selected server record
	if (!selectionModel.hasSelection()) {
		//do nothing
	}
	else {
		file = record.data.filename;
		fileType = file.substring(file.lastIndexOf(".")+1);
		fileName = file.substring(0,file.lastIndexOf("."));
		switch (fileType.toLowerCase()) {
			case "chm":
			case "pdf":
				//ebooks
				isbnPrefixIndex = fileName.indexOf(isbnPrefix);
				if (isbnPrefixIndex>-1) {
					isbn = fileName.substring((isbnPrefixIndex+isbnPrefix.length));
					isbnSuffixIndex = fileName.indexOf(isbnSuffix);
					if (isbnSuffixIndex>-1) {
						isbn = isbn.substring(0,(isbn.length-1));
					}
				}
				document.getElementById("cmbTypes").selectedIndex = 1;
				document.getElementById("search").value = isbn;
				document.getElementById("btnSearch").click();
				//alert("this is the selected ebook: "+isbn)
				break;
			case "avi":
			case "mov":
			case "mp4":
			case "mpeg":
			case "mpg":
				//video
				break;
		}
		//synch the covers view with the selected record
	}
}
