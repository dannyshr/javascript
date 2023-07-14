
if(typeof Navbar!=='function'){
/**
 * A Navbar UI component
 * @param _container The id of the container element
 * @param _config - An array containing the configuration options, with the 
 * 			following keys:
 * scriptPath: the path to the scripts directory. Default is: 'resources/scripts'.
 * ,dir: the direction of this UI component. Can be one of: 'ltr' or 'rtl'. 
 * 			Default is 'ltr'.
 * ,theme: the theme to use for the component. Can be one of: 'black', 'blue'
 * 			, 'green', 'orange', or 'red'. Default is 'black'.
 * ,showRecordInfo: A boolean flag indicating if a record info panel should be 
 * 			displayed in the component's panel. Default is true.
 * ,showPageInfo: A boolean flag indicating if a page info panel should be 
 * 			displayed within the component's panel. Default is true.
 * ,showNavButtons: A boolean flag indicating if a navigation buttons panel 
 * 			should be displayed within the component's panel. Default is true.
 * ,showPagesCombo: A boolean flag indicating if a 'dropdown' should be 
 * 			displayed in the component's current page info. Default is false.
 * ,showPagesCombo: A boolean flag indicating if a 'dropdown' should be 
 * 			displayed in the component's page size panel. Default is true.
 * ,pageSizeMin: The number from which to start when creating a page size 
 * 			dropdown component.  
 * ,pageSizeMax: The number in which to end when creating a page size 
 * 			dropdown component.  
 * ,pageSizeInterval: The number for intervals between each value in the page 
 * 			size dropdown component.  
 * ,showThemes: A boolean flag indicating if a theme selection drop down 
 * 			should be displayed in the component's toolbar or not. 
 * 			Default is false.
 * @return A Navbar UI component
 */
function Navbar(_config) {
	//declare class members and defaults
	var _compPrefix = "navbar";
	var _compId = null;
	var _prefixIndex = -1;
	var _currIndex = 0;
	var _comps = document.getElementsByTagName("div");
	if (_comps!=null && _comps.length>0) {
		for (var i=0;i<_comps.length;i++) {
			if (_comps[i].id) {
				_compId = _comps[i].id;
				_prefixIndex = _compId.indexOf(_compPrefix); 
				if (_prefixIndex!=-1) {
					_currIndex = _compId.substring(_prefixIndex+1);
					if (!isNaN(_currIndex)) {
						_currIndex = parseInt(_currIndex);
					}
				}
			} 
		}
	}
	this.compid = _compPrefix+(_currIndex+1); 
	this._userConfig = _config; 
	this.compid = "nb_"+this.compid; 
	this.config = {}; 
	this.CSS_ID = "_nbcss";
	this.CSS_FILE = "navbar.css";
	this.DEFAULT_THEMES_PATH = "resources/themes/";
	this.DEFAULT_THEME = "black";
	this.DEFAULT_DIR = "ltr";
	this.DEFAULT_RENDER_TO = null;
	this.DEFAULT_ALIGNMENT = "bottom";
	this.DEFAULT_ALIGN_TO = null;
	this.DEFAULT_WIDTH = "700";
	this.DEFAULT_TOTAL_RECORDS = 0;
	this.DEFAULT_TOTAL_PAGES = 0;
	this.DEFAULT_PAGE_NUMBER = 0;
	this.DEFAULT_PAGE_SIZE = 20;
	this.DEFAULT_SHOW_CONFIG = false;
	this.DEFAULT_SHOW_PAGES_COMBO = false;
	this.DEFAULT_SHOW_NAV_BUTTONS = true;
	this.DEFAULT_SHOW_PAGE_INFO = true;
	this.DEFAULT_SHOW_PAGE_SIZE = true;
	this.DEFAULT_SHOW_RECORD_INFO = true;
	this.DEFAULT_PAGE_SIZE_MIN = 5;
	this.DEFAULT_PAGE_SIZE_MAX = 50;
	this.DEFAULT_PAGE_SIZE_INTERVAL = 5;
	this.DEFAULT_LABEL_RECORDSINFO_PREFIX = "Total Records [";
	this.DEFAULT_LABEL_RECORDSINFO_SUFFIX = "]";
	this.DEFAULT_TOOLTIP_NAVBUTTON_FIRST = "First";
	this.DEFAULT_TOOLTIP_NAVBUTTON_PREVIOUS = "Previous";
	this.DEFAULT_TOOLTIP_NAVBUTTON_NEXT = "Next";
	this.DEFAULT_TOOLTIP_NAVBUTTON_LAST = "Last";
	this.DEFAULT_LABEL_PAGEINFO_PREFIX = "Page ";
	this.DEFAULT_LABEL_PAGEINFO_SUFFIX = "";
	this.DEFAULT_LABEL_PAGEINFO_OF = " of ";
	this.DEFAULT_LABEL_PAGESIZE_PREFIX = "Page Size: ";
	this.DEFAULT_LABEL_PAGESIZE_SUFFIX = "";
	this.DIV_ID_PAGENUMBER = this.compid+"_nbNavbarPageNumber";
	this.DIV_ID_TOTALPAGES = this.compid+"_nbNavbarTotalPages";
	this.DIV_ID_TOTALRECORDS = this.compid+"_nbNavbarTotalRecords";
	this.DIV_ID_CONFIG = this.compid+"_nbNavbarConfigDiv";
	this.BUTTON_ID_FIRST = this.compid+"_nbNavbarButtonFirst";
	this.BUTTON_ID_PREVIOUS = this.compid+"_nbNavbarButtonPrevious";
	this.BUTTON_ID_NEXT = this.compid+"_nbNavbarButtonNext";
	this.BUTTON_ID_LAST = this.compid+"_nbNavbarButtonLast";
	this.BUTTON_ID_CONFIG_CONFIG = this.compid+"_nbNavbarButtonConfigConfig";
	this.BUTTON_ID_CONFIG_SAVE = this.compid+"_nbNavbarButtonConfigSave";
	this.COMBO_ID_PAGESIZE = this.compid+"_nbNavbarCmbPageSize";
	this.COMBO_ID_PAGENUM = this.compid+"_nbNavbarCmbPageNum";
	this.totalPages = this.DEFAULT_TOTAL_PAGES;
	this._initialized = false;
	this.reRender = function(_configOpts) {
		//check for nulls
		if (_configOpts!=null && _configOpts!="undefined") {
			//loop through the configuration options
			for (var opt in _configOpts) {
				//set the config option
				this.config[opt] = _configOpts[opt];
			}
		}
		
		//re-render the component
		this._rerenderComp();
	};
	this._init = function() {
		//check if the component was already initialize once
		if (this._initialized) {
			return;
		}
		
		//check for nulls
		if (this._userConfig!=null && this._userConfig!="undefined") {
			//set the component's configuration
			this._setConfig(this._userConfig);
			if (this._userConfig.labels!=null && this._userConfig.labels!="undefined") {
				this._setLabels(this._userConfig.labels);
			}
			
			//re-render the component
			this._rerenderComp();
			
			//reset the init flag
			this._initialized = true;
		}
	};
	this._configSaved = function() {
		//declare locals
		var _configDivId = __uiComp.DIV_ID_CONFIG;
		var _isValid = false;
		
		//check for a valid configuration
		_isValid = __uiComp._isValidRefreshConfig();
		
		//check the valid flag
		if (_isValid) {
			//hide the config div
			$("#"+_configDivId).slideUp('slow');
			
			//refresh the configuration
			__uiComp._refreshConfig();
			
			//re-render the component
			__uiComp._rerenderComp();
		}
	};
	this._rerenderComp = function() {
		//render the component
		__uiComp._renderComponent();
		
		//attach events
		__uiComp._attachEvents();
		
		//refresh the component
		__uiComp._refreshComp();
	};
	this._refreshComp = function() {
		//declare locals
		var _numPages = 0;
		var _modPages = 0;
		
		//check for nulls
		if ( this.config.totalRecords==null || this.config.totalRecords=="undefined") {
			alert("Navbar._refreshComp(): Parameter { totalRecords } is empty or null.");
			return;
		}
		if ( this.config.pageNumber==null || this.config.pageNumber=="undefined") {
			alert("Navbar._refreshComp(): Parameter { pageNumber } is empty or null.");
			return;
		}
		if ( this.config.pageSize==null || this.config.pageSize=="undefined") {
			alert("Navbar._refreshComp(): Parameter { pageSize } is empty or null.");
			return;
		}
		
		//check for invalid values
		if (isNaN(this.config.totalRecords)) {
			alert("Navbar._refreshComp(): Parameter { totalRecords } is NOT a valid number.");
			return;
		}
		if (isNaN(this.config.pageNumber)) {
			alert("Navbar._refreshComp(): Parameter { pageNumber } is NOT a valid number.");
			return;
		}
		if (isNaN(this.config.pageSize)) {
			alert("Navbar._refreshComp(): Parameter { pageSize } is NOT a valid number.");
			return;
		}
		
		//reset membesr values
		this.config.totalRecords = parseInt(this.config.totalRecords);
		this.config.pageNumber = parseInt(this.config.pageNumber);
		this.config.pageSize = parseInt(this.config.pageSize);
		
		//check for invalid values
		if (this.config.totalRecords<=0 || this.config.pageSize<=0) {
			this.config.totalRecords = 0;
			this.totalPages = 1;
			this.config.pageNumber = 1;
		}
		else {
			if (this.config.totalRecords<this.config.pageSize) {
				this.config.totalRecords = 0;
				this.totalPages = 1;
				this.config.pageNumber = 1;
			}
			else {
				//calculate the total pages
				_numPages = Math.floor(this.config.totalRecords / this.config.pageSize);
				_modPages = (this.config.totalRecords % this.config.pageSize);
				if (_modPages!=0) {
					_numPages += 1;
				}
				this.totalPages = _numPages;
				
				//check for an invalid config.pageNumber
				if (this.config.pageNumber > this.totalPages) {
					alert("Page number ["+this.config.pageNumber+"] can NOT be greater than total pages ["+this.totalPages+"]");
					this.config.pageNumber = this.totalPages;
				}
			}
		}
		
		//check for nulls
		if (this.config==null || this.config=="undefined") {
			return;
		}
		
		//update the total pages, and the current page
		if (this.config.showRecordInfo==true) {
			$("#"+this.DIV_ID_TOTALRECORDS).html(this.config.totalRecords);
		}
		if (this.config.showPageInfo==true) {
			$("#"+this.DIV_ID_TOTALPAGES).html(this.totalPages);
			if (this.config.showPagesCombo==false) {
				//re-render the component's inner HTML
				$("#"+this.DIV_ID_PAGENUMBER).html(this.config.pageNumber);
			}
			else {
				this._reRenderPagesCombo();
			}
		}
		if (this.config.showPageSize==true) {
			document.getElementById(this.COMBO_ID_PAGESIZE).value = this.config.pageSize;
		}
		if (this.config.showNavButtons==true) {
			this._resetNavButtonsMode();
			this._attachClickEventNavButtonsAll();
		}
	};
	this._getButtonsArray = function() {
		//declare locals
		var _arrButtons = new Array(
			"first"
			,"previous"
			,"next"
			,"last"
		);
		
		//return the method's value
		return _arrButtons;
	};
	this._getDefaultLabels = function() {
		//declare locals
		var defaultLabels = {
			recordInfoPrefix: this.DEFAULT_LABEL_RECORDSINFO_PREFIX
			,recordInfoSuffix: this.DEFAULT_LABEL_RECORDSINFO_SUFFIX
			,navButtonTooltipFirst: this.DEFAULT_TOOLTIP_NAVBUTTON_FIRST
			,navButtonTooltipPrevious: this.DEFAULT_TOOLTIP_NAVBUTTON_PREVIOUS
			,navButtonTooltipNext: this.DEFAULT_TOOLTIP_NAVBUTTON_NEXT
			,navButtonTooltipLast: this.DEFAULT_TOOLTIP_NAVBUTTON_LAST
			,pageInfoPrefix: this.DEFAULT_LABEL_PAGEINFO_PREFIX
			,pageInfoSuffix: this.DEFAULT_LABEL_PAGEINFO_SUFFIX
			,pageInfoOf: this.DEFAULT_LABEL_PAGEINFO_OF
			,pageSizePrefix: this.DEFAULT_LABEL_PAGESIZE_PREFIX
			,pageSizeSuffix: this.DEFAULT_LABEL_PAGESIZE_SUFFIX
		};
		
		//return the method's value
		return defaultLabels;
	};
	this._getDefaultConfig = function() {
		//declare locals
		var defaultConfig = {
			id: this.compid
			,themesPath: this.DEFAULT_THEMES_PATH
			,dir: this.DEFAULT_DIR
			,theme: this.DEFAULT_THEME
			,renderTo: this.DEFAULT_RENDER_TO
			,alignment: this.DEFAULT_ALIGNMENT
			,alignTo: this.DEFAULT_ALIGN_TO
			,width: this.DEFAULT_WIDTH
			,showPagesCombo: this.DEFAULT_SHOW_PAGES_COMBO
			,showNavButtons: this.DEFAULT_SHOW_NAV_BUTTONS
			,showPageInfo: this.DEFAULT_SHOW_PAGE_INFO
			,showPageSize: this.DEFAULT_SHOW_PAGE_SIZE
			,showRecordInfo: this.DEFAULT_SHOW_RECORD_INFO
			,pageSizeMin: this.DEFAULT_PAGE_SIZE_MIN
			,pageSizeMax: this.DEFAULT_PAGE_SIZE_MAX
			,pageSizeInterval: this.DEFAULT_PAGE_SIZE_INTERVAL
			,labels: this._getDefaultLabels()
			,showConfig: this.DEFAULT_SHOW_CONFIG
			,totalRecords: this.DEFAULT_TOTAL_RECORDS
			,pageNumber: this.DEFAULT_PAGE_NUMBER
			,pageSize: this.DEFAULT_PAGE_SIZE
			,onPageNumChanged: function(_newpagenum) {
				var _newOpts = {
					totalRecords: __uiComp.config.totalRecords
					,pageNumber: _newpagenum
					,pageSize: __uiComp.config.pageSize
				};
				__uiComp.reRender(_newOpts);
				//alert("Navbar.onPageNumChanged(): _newpagenum=["+_newpagenum+"]");
			}
			,onPageSizeChanged: function(_newpagesize) {
				var _newOpts = {
					totalRecords: __uiComp.config.totalRecords
					,pageNumber: __uiComp.config.pageNumber
					,pageSize: _newpagesize
				};
				__uiComp.reRender(_newOpts);
				//alert("Navbar.onPageSizeChanged(): _newpagesize=["+_newpagesize+"]");
			}
		};
		
		//return the method's value
		return defaultConfig;
	};
	this._getConfigOptions = function() {
		//declare locals
		var dcOpts = [
  		    ["id","Id","lblId","label","string"]
 		 	,["renderTo","Render To","txtRenderTo","textbox","string"]
			,["dir","Direction","nbCmdDir","select","string",["ltr;Left To Right","rtl;Right To Left"]]
			,["alignment","Alignment","nbCmbAlign","select","string",["top;Top","bottom;Bottom","left;Left","right;Right"]]
			,["width","Width","nbTxtWidth","textbox","int"]
			,["alignTo","Align To","lblAlignTo","label","string"]
			,["showPagesCombo","Show Pages Combo","nbCbShowPagesCombo","checkbox","boolean"]
			,["showNavButtons","Show Nav Buttons","nbCbShowNavButtons","checkbox","boolean"]
			,["showPageInfo","Show Page Info","nbCbShowPageInfo","checkbox","boolean"]
			,["showPageSize","Show Page Size","nbCbShowPageSize","checkbox","boolean"]
			,["showRecordInfo","Show Record Info","nbCbShowRecordInfo","checkbox","boolean"]
			,["pageSizeMin","Page Size Min","nbTxtPageSizeMin","textbox","int"]
			,["pageSizeMax","Page Size Max","nbTxtPageSizeMax","textbox","int"]
			,["pageSizeInterval","Page Size Interval","nbTxtPageSizeInterval","textbox","int"]
			,["recordInfoPrefix","Record Info Prefix","nbTxtLabelRecordInfoPrefix","labelbox","string"]
			,["recordInfoSuffix","Record Info Suffix","nbTxtLabelRecordInfoSuffix","labelbox","string"]
			,["navButtonTooltipFirst","Button Tooltip First","nbTxtLabelButtonTooltipFirst","labelbox","string"]
			,["navButtonTooltipPrevious","Button Tooltip Previous","nbTxtLabelButtonTooltipPrevious","labelbox","string"]
			,["navButtonTooltipNext","Button Tooltip Next","nbTxtLabelButtonTooltipNext","labelbox","string"]
			,["navButtonTooltipLast","Button Tooltip Last","nbTxtLabelButtonTooltipLast","labelbox","string"]
			,["pageInfoPrefix","Page Info Prefix","nbTxtLabelPageInfoPrefix","labelbox","string"]
			,["pageInfoSuffix","Page Info Suffix","nbTxtLabelPageInfoSuffix","labelbox","string"]
			,["pageInfoOf","Page Info Of","nbTxtLabelPageInfoOf","labelbox","string"]
			,["pageSizePrefix","Page Size Prefix","nbTxtLabelPageSizePrefix","labelbox","string"]
			,["pageSizeSuffix","Page Size Suffix","nbTxtLabelPageSizeSuffix","labelbox","string"]
		];
		
		//return the method's value
		return dcOpts;
	};
	this._setLabels = function(_labels) {
		//declare locals
		var dl = this._getDefaultLabels();
		
		//check for nulls
		if (_labels!=null && _labels!="undefined") {
		    for (var option in dl) {
		        if (dl[option] == "undefined") {
		        	continue;
		        }
		        if (typeof dl[option] == typeof _labels[option]) {
		        	this.config.labels[option] = _labels[option];
		        }
		        else {
		        	this.config.labels[option] = dl[option];
		        }
		    }
		}
	};
	this._setConfig = function(_config) {
		//declare locals
		var dc = this._getDefaultConfig();
		
		//check for nulls
		if (_config!=null && _config!="undefined") {
		    for (var option in dc) {
		        if (dc[option] == "undefined") {
		        	continue;
		        }
		        if (dc[option]==null) {
		        	this.config[option] = _config[option];
		        }
		        else if (typeof dc[option] == typeof _config[option]) {
		        	this.config[option] = _config[option];
		        }
		        else {
		        	this.config[option] = dc[option];
		        }
		    }
		}
	};
	this._getImagesPath = function() {
		//declare locals
		var _imagesPath = null;
		
		//set the return value
		_imagesPath = this._getThemesPath()+"shared/images/";
		
		//return the method's value
		return _imagesPath;
	};
	this._getThemesPath = function() {
		//declare locals
		var _themesPath = null;
		
		//set the return value
		_themesPath = this.config.themesPath;
		
		//return the method's value
		return _themesPath;
	};
	this._getCssHref = function(_theme) {
		//declare locals
		var cssHref = null;
		
		//check for nulls
		if (_theme==null || _theme=="undefined" || _theme=="") {
			return;
		}
		
		//set the return value
		cssHref = this._getThemesPath()+_theme+"/"+this.CSS_FILE;
		
		//return the method's value
		return cssHref;
	};
	this._renderCssLink = function(_themeName) {
		//declare locals
		var _linkComp = null;
		var _linkTag = "link";
		var _scriptTag = "script";
		var _arrScripts = null;
		var _parent = null;
		var _newHref = null;
		var _currHref = null;
		
		//get the current link's href
		_newHref = this._getCssHref(_themeName);
		
		//render the component's css link
		_linkComp = document.getElementById(this.CSS_ID+"_"+_themeName);
		if (_linkComp==null) {
			//get all script tags
			_arrScripts = document.getElementsByTagName(_scriptTag);
			
			//check for nulls
			if (_arrScripts==null || _arrScripts.length==0) {
				return;
			}
			
			//get the first script's parent node (the <head> tag)
			_parent = _arrScripts[0].parentNode;
			
			_linkComp = document.createElement(_linkTag);
			_linkComp.setAttribute("id",this.CSS_ID+"_"+_themeName);
			_linkComp.setAttribute("rel","stylesheet");
			_linkComp.setAttribute("type","text/css");
			
			//add the newly created link to the NodeList
			_parent.appendChild(_linkComp);
		}
		
		//reset the link's href attribute
		_currHref = _linkComp.href;
		if (_currHref==null || _currHref=="undefined" || _currHref!=_newHref) {
			_linkComp.href = _newHref;
		}
	};
	this._renderCss = function() {
		//declare locals
		var _linkComp = null;
		var _linkTag = "link";
		var _scriptTag = "script";
		var _arrScripts = null;
		var _parent = null;
		var _newHref = null;
		var _currHref = null;
		var _arrThemes = new Array(
			"black"
			,"blue"
			,"green"
			,"orange"
			,"red"
		);
		var _currTheme = null;
		
		//loop through the themes array
		for (var i=0;i<_arrThemes.length;i++) {
			//get the current theme
			_currTheme = _arrThemes[i];
			
			//render a css link for the current theme
			//this._renderCssLink(_currTheme);
		}
		
		//get the current theme
		_newHref = this._getCssHref(this.config.theme);
		
		//render the component's css link
		_linkComp = document.getElementById(this.CSS_ID);
		if (_linkComp==null) {
			//get all script tags
			_arrScripts = document.getElementsByTagName(_scriptTag);
			
			//check for nulls
			if (_arrScripts==null || _arrScripts.length==0) {
				return;
			}
			
			//get the first script's parent node (the <head> tag)
			_parent = _arrScripts[0].parentNode;
			
			_linkComp = document.createElement(_linkTag);
			_linkComp.setAttribute("id",this.CSS_ID);
			_linkComp.setAttribute("rel","stylesheet");
			_linkComp.setAttribute("type","text/css");
			
			//add the newly created link to the NodeList
			_parent.appendChild(_linkComp);
		}
		
		//reset the theme
		_currHref = _linkComp.href;
		if (_currHref==null || _currHref=="undefined" || _currHref!=_newHref) {
			_linkComp.href = _newHref;
		}
	};
	this._renderRecordInfo = function() {
		//declare locals
		var _html = "";
		
		//check the configuration option
		if (this.config.showRecordInfo==true) {
			//render the component's inner HTML
			_html += "<td class=\"nbNavbarRecordInfoColumn\">";
			_html += "<div class=\"nbNavbarRecordInfoLabel\">";
			_html += this.config.labels.recordInfoPrefix;
			_html += "<span dir=\"ltr\" id=\""+this.DIV_ID_TOTALRECORDS+"\" class=\"nbNavbarTotalRecords\">"+this.config.totalRecords+"</span>";
			_html += this.config.labels.recordInfoSuffix;
			_html += "</div>";
			_html += "</td>";
		}
		
		//return the method's value
		return _html;
	};
	this._renderNavButtons = function() {
		//declare locals
		var _html = "";
		var _imagesPath = this._getImagesPath();
		var _imagesExt = ".png";
		var _arrButtons = null;
		
		//check the configuration option
		if (this.config.showNavButtons==true) {
			//get the buttons array
			_arrButtons = this._getButtonsArray();
			
			//render the component's inner HTML
			_html += "<td class=\"nbNavbarButtonsColumn\">";
			_html += "<div>";
			_html += "<table dir=\"ltr\" class=\"nbNavbarTable\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
			_html += "<tr>";
			_html += "<td class=\"nbNavbarButtonColumn\">";
			_html += "<img id=\""+this.BUTTON_ID_FIRST+"\"";
			_html += " class=\"nbNavbarButton\"";
			_html += " src=\""+_imagesPath+_arrButtons[0]+_imagesExt+"\"";
			_html += " title=\"" + this.config.labels.navButtonTooltipFirst + "\"";
			_html += "/>";
			_html += "</td>";
			_html += "<td class=\"nbNavbarButtonColumn\">";
			_html += "<img id=\""+this.BUTTON_ID_PREVIOUS+"\"";
			_html += " class=\"nbNavbarButton\"";
			_html += " src=\""+_imagesPath+_arrButtons[1]+_imagesExt+"\"";
			_html += " title=\"" + this.config.labels.navButtonTooltipPrevious + "\"";
			_html += "/>";
			_html += "</td>";
			_html += "<td class=\"nbNavbarButtonColumn\">";
			_html += "<img id=\""+this.BUTTON_ID_NEXT+"\"";
			_html += " class=\"nbNavbarButton\"";
			_html += " src=\""+_imagesPath+_arrButtons[2]+_imagesExt+"\"";
			_html += " title=\"" + this.config.labels.navButtonTooltipNext + "\"";
			_html += "/>";
			_html += "</td>";
			_html += "<td class=\"nbNavbarButtonColumn\">";
			_html += "<img id=\""+this.BUTTON_ID_LAST+"\"";
			_html += " class=\"nbNavbarButton\"";
			_html += " src=\""+_imagesPath+_arrButtons[3]+_imagesExt+"\"";
			_html += " title=\"" + this.config.labels.navButtonTooltipLast + "\"";
			_html += "/>";
			_html += "</td>";
			_html += "</tr>";
			_html += "</table>";
			_html += "</div>";
			_html += "</td>";
		}
		
		//return the method's value
		return _html;
	};
	this._reRenderPagesCombo = function() {
		//check the configuration option
		if (this.config.showPagesCombo==true) {
			//re-render the component's inner HTML
			$("#"+this.DIV_ID_PAGENUMBER).html(this._renderPagesCombo());
			//re-attach the event handler
			this._attachEventPageNumChanged();
		}
	};
	this._renderPagesCombo = function() {
		//declare locals
		var _html = "";
		
		//check the configuration option
		if (this.config.showPagesCombo==true) {
			//render the component's inner HTML
			_html += "<select id=\""+this.COMBO_ID_PAGENUM+"\" size=\"1\">";
			for (var i=0;i<this.totalPages;i++) {
				_html += "<option value=\""+(i+1)+"\"";
				if (this.config.pageNumber==(i+1)) {
					_html += " selected=\"selected\"";
				}
				_html += ">"+(i+1)+"</option>";
			}
			_html += "</select>";
		}
		
		//return the method's value
		return _html;
	};
	this._renderPageInfo = function() {
		//declare locals
		var _html = "";
		
		//check the configuration option
		if (this.config.showPageInfo==true) {
			//render the component's inner HTML
			_html += "<td class=\"nbNavbarPageinfoColumn\">";
			_html += "<div>";
			_html += "<table class=\"nbNavbarTable\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
			_html += "<tr>";
			_html += "<td class=\"nbNavbarPageInfoPageLabelColumn\">";
			_html += "<div class=\"nbNavbarPageInfoLabel\">";
			_html += this.config.labels.pageInfoPrefix;
			_html += "</div>";
			_html += "</td>";
			_html += "<td class=\"nbNavbarPageInfoPageNumberColumn\">";
			_html += "<div dir=\"ltr\" id=\""+this.DIV_ID_PAGENUMBER+"\" class=\"nbNavbarPageInfoPageNumber\">";
			_html += this._renderPagesCombo();
			_html += "</div>";
			_html += "</td>";
			_html += "<td class=\"nbNavbarPageInfoOfLabelColumn\">";
			_html += "<div class=\"nbNavbarPageInfoLabel\">";
			_html += this.config.labels.pageInfoSuffix;
			_html += this.config.labels.pageInfoOf;
			_html += "</div>";
			_html += "</td>";
			_html += "<td class=\"nbNavbarPageInfoTotalColumn\">";
			_html += "<div dir=\"ltr\" id=\""+this.DIV_ID_TOTALPAGES+"\" class=\"nbNavbarPageInfoTotalPages\">";
			_html += "</div>";
			_html += "</td>";
			_html += "</tr>";
			_html += "</table>";
			_html += "</div>";
			_html += "</td>";
		}
		
		//return the method's value
		return _html;
	};
	this._renderPageSize = function() {
		//declare locals
		var _html = "";
		
		//check the configuration option
		if (this.config.showPageSize==true) {
			//render the component's inner HTML
			_html += "<td class=\"nbNavbarPagesizeColumn\">";
			_html += "<div>";
			_html += "<table class=\"nbNavbarTable\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
			_html += "<tr>";
			_html += "<td class=\"nbNavbarPageSizeLabelColumn\">";
			_html += "<div class=\"nbNavbarPageSizeLabel\">";
			_html += this.config.labels.pageSizePrefix;
			_html += "</div>";
			_html += "</td>";
			_html += "<td class=\"nbNavbarPageSizeComboColumn\">";
			_html += "<div class=\"nbNavbarPageSizeCombo\">";
			_html += "<select id=\""+this.COMBO_ID_PAGESIZE+"\" size=\"1\">";
			for (var i=this.config.pageSizeMin;i<this.config.pageSizeMax;(i += this.config.pageSizeInterval)) {
				_html += "<option value=\""+i+"\"";
				if (this.config.pageSize==i) {
					_html += " selected=\"selected\"";
				}
				_html += ">"+i+"</option>";
			}
			_html += "</select>";
			_html += this.config.labels.pageSizeSuffix;
			_html += "</div>";
			_html += "</td>";
			_html += "</tr>";
			_html += "</table>";
			_html += "</div>";
			_html += "</td>";
		}
		
		//return the method's value
		return _html;
	};
	this._renderConfigButton = function() {
		//declare locals
		var _html = "";
		var _imagesPath = this._getImagesPath();
		var _imageSource = _imagesPath + "config.png";
		var _configDivId = this.DIV_ID_CONFIG;
		var _buttonId = this.BUTTON_ID_CONFIG_CONFIG;
		
		//check the configuration option
		if (this.config.showConfig==true) {
			_html += "<td class=\"nbNavbarConfigColumn\">";
			_html += "<img id=\""+_buttonId+"\" title=\"Settings\" src=\""+_imageSource+"\" class=\"nbNavbarConfigButton\"/>";
			_html += "</td>";
		}
		
		//return the method's value
		return _html;
	};
	this._renderConfigDiv = function() {
		//declare locals
		var _html = "";
		var _imagesPath = this._getImagesPath();
		var _imageSource = _imagesPath + "save.png";
		var _configDivId = this.DIV_ID_CONFIG;
		var _buttonId = this.BUTTON_ID_CONFIG_SAVE;
		var _arrOpts = this._getConfigOptions();
		
		//check the configuration option
		if (this.config.showConfig==true) {
			_html += "<div id=\""+_configDivId+"\" class=\"nbNavbarConfigDiv\">";
			_html += "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
			_html += "<tr>";
			_html += "<td class=\"nbNavbarConfigHeaderRow\">";
			_html += "<div class=\"nbNavbarConfigHeader\">";
			_html += "Settings";
			_html += "</div>";
			_html += "</td>";
			_html += "</tr>";
			_html += "<tr>";
			_html += "<td>";
			_html += "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
			_html += "<tr>";
			_html += "<td class=\"nbNavbarConfigOptionsOptionColumnHeader\">";
			_html += "Option";
			_html += "</td>";
			_html += "<td class=\"nbNavbarConfigOptionsValueColumnHeader\">";
			_html += "Value";
			_html += "</td>";
			_html += "</tr>";
			_html += "<tr>";
			_html += "<td colspan=\"2\">";
			_html += "<div class=\"nbNavbarConfigBodyDiv\">";
			_html += "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
			//loop through the options array
			for (var i=0;i<_arrOpts.length;i++) {
				_html += this._renderConfigComponent(_arrOpts[i]);
			}
			_html += "</table>";
			_html += "</div>";
			_html += "</table>";
			_html += "</td>";
			_html += "</tr>";
			_html += "<tr>";
			_html += "<td class=\"nbNavbarConfigFooterRow\">";
			_html += "<div class=\"nbNavbarConfigFooter\">";
			_html += "<img id=\""+_buttonId+"\" title=\"Save\" class=\"nbNavbarConfigButton\" src=\""+_imageSource+"\"/>";
			_html += "</div>";
			_html += "</td>";
			_html += "</tr>";
			_html += "</table>";
			_html += "</div>";
		}
		
		//return the method's value
		return _html;
	};
	this._renderConfigComponent = function(_compArr) {
		//declare locals
		var _html = "";
		var _compOpt = null;
		var _compLabel = null;
		var _compId = null;
		var _compType = null;
		var _compValueType = null;
		var _compValue = null;
		var _compValues = null;
		var _arrOptKeyVal = null;
		var _optLabel = null;
		var _optValue = null;
		
		//check for a valid input
		if (_compArr.constructor.toString().indexOf("Array") == -1) {
			return _html;
		}
		if (_compArr.length < 5) {
			return _html;
		}
		
		//get the array's items
		_compOpt = _compArr[0];
		_compLabel = _compArr[1];
		_compId = this.compid+_compArr[2];
		_compType = _compArr[3];
		_compValueType = _compArr[4];
		if (_compArr.length > 5) {
			_compValues = _compArr[5];
		}
		
		//get the component's value
		if (_compType.toLowerCase()=="labelbox") {
			_compValue = this.config.labels[_compOpt];
		}
		else {
			_compValue = this.config[_compOpt];
		}

		//render the component
		_html += "<tr class=\"nbNavbarConfigRow\">";
		_html += "<td class=\"nbNavbarConfigOptionsOptionColumn\">";
		if (_compType=="checkbox") {
			_html += "<label class=\"nbNavbarConfigFieldLabel\" for=\""+_compId+"\">";
			_html += _compLabel;
			_html += "</label>";
		}
		else {
			_html += _compLabel;
		}
		_html += "</td>";
		_html += "<td>";
		_html += "<div class=\"nbNavbarConfigOptionsHSpace\">";
		_html += "</div>";
		_html += "</td>";
		_html += "<td class=\"nbNavbarConfigOptionsValueColumn\">";
		//check the component's type
		switch (_compType) {
			case "select":
				_html += "<select id=\""+_compId+"\" size=\"1\">";
				for (var i=0;i<_compValues.length;i++) {
					//get the current option's value and label
					_arrOptKeyVal = _compValues[i].split(";");
					if (_arrOptKeyVal==null || _arrOptKeyVal.length<2) {
						continue;
					}
					_optValue = _arrOptKeyVal[0];
					_optLabel = _arrOptKeyVal[1];
					
					//render the current option
					_html += "<option value=\""+_optValue+"\"";
					if (_optValue==_compValue) {
						_html += " selected=\"selected\"";
					}
					_html += ">";
					_html += _optLabel;
					_html += "</option>";
				}
				_html += "</select>";
				break;
			case "checkbox":
				_html += "<input id=\""+_compId+"\" type=\""+_compType+"\"";
				if (_compValue) {
					_html += " checked=\"checked\"";
				}
				_html += " value=\""+_compValue+"\"/>";
				break;
			case "label":
				_html += "<label id=\""+_compId+"\" class=\"nbNavbarConfigFieldLabel\">";
				_html += _compValue;
				_html += "</label>";
				break;
			case "labelbox":
			case "textbox":
				if (typeof _compValue == "string") {
					if (_compValue.indexOf('"')!=-1) {
						_compValue = _compValue.replace(/"/g,"&quot;");
						_compValue = _compValue.replace(/</g,"&lt;");
						_compValue = _compValue.replace(/>/g,"&gt;");
					}
				}
				_html += "<input id=\""+_compId+"\" type=\""+_compType+"\"";
				_html += " value=\""+_compValue+"\"";
				_html += " size=\"10\"/>";
				break;
		}
		_html += "</td>";
		_html += "</tr>";
		
		//return the method's value
		return _html;
	};
	this._isValidRefreshConfig = function() {
		//declare locals
		var _confOpts = this._getConfigOptions();
		var _compArr = null;
		var _compObj = null;
		var _compOpt = null;
		var _compLabel = null;
		var _compId = null;
		var _compValueType = null;
		var _compValue = null;
		var _isValid = true;
		var _styleError = "nbNavbarConfigFieldError";
		
		//loop through the config options
		for (var i=0;i<_confOpts.length;i++) {
			//get the current item
			_compArr = _confOpts[i];
			
			//check for a valid input
			if (_compArr.constructor.toString().indexOf("Array") == -1) {
				return false;
			}
			if (_compArr.length < 5) {
				return false;
			}
			
			//get the array's items
			_compOpt = _compArr[0];
			_compLabel = _compArr[1];
			_compId = this.compid+_compArr[2];
			_compValueType = _compArr[4];
			
			//get the component by its id
			_compObj = document.getElementById(_compId);
			
			//check for nulls
			if (_compObj==null || _compObj=="undefined") {
				return false;
			}
			
			//get the component's value
			_compValue = _compObj.value;
			
			//check the value's type
			switch (_compValueType.toLowerCase()) {
				case "int":
					if (isNaN(_compValue)) {
						if (!$("#"+_compId).hasClass(_styleError)) {
							$("#"+_compId).addClass(_styleError);
						}
						_isValid = false;
						alert(_compLabel + " must contain a valid integer");
					}
					else {
						if ($("#"+_compId).hasClass(_styleError)) {
							$("#"+_compId).removeClass(_styleError);
						}
					}
					break;
			}
			
			//check for the valid flag
			if (!_isValid) {
				break;
			}
		}
		
		//return the method's value
		return _isValid;
	};
	this._refreshConfig = function() {
		//declare locals
		var _confOpts = this._getConfigOptions();
		var _compArr = null;
		var _compObj = null;
		var _compOpt = null;
		var _compId = null;
		var _compValueType = null;
		var _compValue = null;
		var _rerender = true;
		var _compType = null;
		
		//loop through the config options
		for (var i=0;i<_confOpts.length;i++) {
			//get the current item
			_compArr = _confOpts[i];
			
			//check for a valid input
			if (_compArr.constructor.toString().indexOf("Array") == -1) {
				return;
			}
			if (_compArr.length < 5) {
				return;
			}
			
			//get the array's items
			_compOpt = _compArr[0];
			_compId = this.compid+_compArr[2];
			_compType = _compArr[3];
			_compValueType = _compArr[4];
			
			//get the component by its id
			_compObj = document.getElementById(_compId);
			
			//check for nulls
			if (_compObj==null || _compObj=="undefined") {
				return;
			}
			
			//get the component's value
			_compValue = _compObj.value;
			
			//check the value's type
			switch (_compValueType.toLowerCase()) {
				case "boolean":
					_compValue = _compObj.checked;
					break;
				case "int":
					if (isNaN(_compValue)) {
						_compValue = 0;
					}
					else {
						_compValue = parseInt(_compValue);
					}
					break;
			}
			
			//check the rerender flag
			if (!_rerender) {
				break;
			}
			
			//set the correct config option
			if (_compType.toLowerCase()=="label") {
				this.config.labels[_compOpt] = _compValue;
			}
			else {
				this.config[_compOpt] = _compValue;
			}
		}
	};
	this._resetNavButtonMode = function(_buttonId,_buttonKey,_disabled) {
		//declare locals
		var _comp = null;
		var _styleClass = "nbNavbarButton";
		var _styleClassDisabled = _styleClass+"Disabled";
		var _styleClassHover = "nbNavbarButtonHover";
		var _imagesPath = this._getImagesPath();
		var _imageExt = ".png";
		var _image = _imagesPath + _buttonKey + _imageExt;
		var _imageDisabled = _imagesPath + _buttonKey + "_disabled" + _imageExt;
		var _currSrc = null;
		var _newSrc = null;
		
		//check the configuration option
		if (this.config.showNavButtons==true) {
			//get components by their ids
			_comp = document.getElementById(_buttonId);
			
			//get the component's current source
			_currSrc = _comp.src;
			
			//set the new source according to the disabled flag
			if (_disabled) {
				_newSrc = _imageDisabled;
			}
			else {
				_newSrc = _image;
			}
			
			//check if the source has changed
			if (_currSrc!=_newSrc) {
				_comp.src = _newSrc;
			}
			
			//check the disabled flag
			if (_disabled) {
				if (!$("#"+_buttonId).hasClass(_styleClassDisabled)) {
					$("#"+_buttonId).addClass(_styleClassDisabled);
				}
				if ($("#"+_buttonId).hasClass(_styleClassHover)) {
					$("#"+_buttonId).removeClass(_styleClassHover);
				}
			}
			else {
				if ($("#"+_buttonId).hasClass(_styleClassDisabled)) {
					$("#"+_buttonId).removeClass(_styleClassDisabled);
				}
			}
		}
	};
	this._resetNavButtonsMode = function() {
		//declare locals
		var _arrButtons = new Array(
			this.BUTTON_ID_FIRST
			,this.BUTTON_ID_PREVIOUS
			,this.BUTTON_ID_NEXT
			,this.BUTTON_ID_LAST
		);
		var _arrKeys = this._getButtonsArray();
		var _arrDisabled = new Array();
		
		//check the configuration option
		if (this.config.showNavButtons==true) {
			//check the current page
			if (this.config.pageNumber<=1) {
				_arrDisabled.push(true);
				_arrDisabled.push(true);
				if (this.totalPages<=1) {
					_arrDisabled.push(true);
					_arrDisabled.push(true);
				}
				else {
					_arrDisabled.push(false);
					_arrDisabled.push(false);
				}
			}
			else {
				if (this.config.pageNumber>=this.totalPages) {
					_arrDisabled.push(false);
					_arrDisabled.push(false);
					_arrDisabled.push(true);
					_arrDisabled.push(true);
				}
				else {
					_arrDisabled.push(false);
					_arrDisabled.push(false);
					_arrDisabled.push(false);
					_arrDisabled.push(false);
				}
			}
			
			//loop through the buttons
			for (var i=0;i<_arrButtons.length;i++) {
				this._resetNavButtonMode(_arrButtons[i],_arrKeys[i],_arrDisabled[i]);
			}
		}
	};
	this._navButtonIsDisabled = function(_buttonId) {
		//declare locals
		var _styleClass = "nbNavbarButtonDisabled";
		
		//check if the component has the disabled style class
		if ($("#"+_buttonId).hasClass(_styleClass)) {
			return true;
		}
		
		//return the method's value
		return false;
	};
	this._navButtonMouseOver = function(_buttonId) {
		//declare locals
		var _styleClass = "nbNavbarButtonHover";
		
		//add the new style only if necessary
		if (!$("#"+_buttonId).hasClass(_styleClass)) {
			$("#"+_buttonId).addClass(_styleClass);
		}
	};
	this._navButtonMouseOut = function(_buttonId) {
		//declare locals
		var _styleClass = "nbNavbarButtonHover";
		
		//add the new style only if necessary
		if ($("#"+_buttonId).hasClass(_styleClass)) {
			$("#"+_buttonId).removeClass(_styleClass);
		}
	};
	this._attachEventPageSizeChanged = function() {
		//declare locals
		var _comp = null;
		var _compValue = null;
		var _fh = null;
		
		//check the configuration option
		if (this.config.showPageSize==true) {
			//get elements by their ids
			_comp = document.getElementById(this.COMBO_ID_PAGESIZE);
			
			//get the function handler
			_fh = this.config.onPageSizeChanged;
			
			//attache the event
			_comp.onchange = function() {
				//get the component's new value
				_compValue = _comp.value;
				
				//invoke the function handler
				if (typeof _fh == "function") {
					_fh(_compValue);
				}
			};			
		}
	};
	this._attachEventPageNumChanged = function() {
		//declare locals
		var _comp = null;
		var _compValue = null;
		var _fh = null;
		
		//check the configuration option
		if (this.config.showPageInfo==true && this.config.showPagesCombo==true) {
			//get elements by their ids
			_comp = document.getElementById(this.COMBO_ID_PAGENUM);
			
			//get the function handler
			_fh = this.config.onPageNumChanged;
			
			//attache the event
			_comp.onchange = function() {
				//get the component's new value
				_compValue = _comp.value;
				
				//invoke the function handler
				if (typeof _fh == "function") {
					_fh(_compValue);
				}
			};			
		}
	};
	this._attachMouseEventsNavButtons = function(_compId) {
		var _comp = null;
		var _fhIsDisabled = null;
		var _fhOver = null;
		var _fhOut = null;
		
		//check the configuration option
		if (this.config.showNavButtons==true) {
			//get elements by their ids
			_comp = document.getElementById(_compId);
			
			//get the function handler
			_fhIsDisabled = this._navButtonIsDisabled;
			_fhOver = this._navButtonMouseOver;
			_fhOut = this._navButtonMouseOut;
		
			//attache the events
			_comp.onmouseover = function() {
				//invoke the function handler
				if (_fhIsDisabled(_compId)) {
					return;
				}
				_fhOver(_compId);
			};			
			_comp.onmouseout = function() {
				//invoke the function handler
				_fhOut(_compId);
			};			
		}
	};
	this._attachMouseEventsNavButtonsAll = function() {
		//declare locals
		var _arrIds = new Array(
			this.BUTTON_ID_FIRST
			,this.BUTTON_ID_PREVIOUS
			,this.BUTTON_ID_NEXT
			,this.BUTTON_ID_LAST
		);
		var _compId = null;
		
		//check the configuration option
		if (this.config.showNavButtons==true) {
			//loop through the array
			for (var i=0;i<_arrIds.length;i++) {
				//get elements by their ids
				_compId = _arrIds[i];
				
				//attache the events
				this._attachMouseEventsNavButtons(_compId);
			}
		}
	};
	this._attachClickEventNavButtons = function(_compId,_compValue) {
		var _comp = null;
		var _fhIsDisabled = null;
		var _fhClick = null;
		
		//check the configuration option
		if (this.config.showNavButtons==true) {
			//get elements by their ids
			_comp = document.getElementById(_compId);
			
			//get the function handler
			_fhIsDisabled = this._navButtonIsDisabled;
			_fhClick = this.config.onPageNumChanged;
		
			//attache the events
			_comp.onclick = function() {
				//invoke the function handler
				if (_fhIsDisabled(_compId)) {
					return;
				}
				_fhClick(_compValue);
			};			
		}
	};
	this._attachClickEventNavButtonsAll = function() {
		//declare locals
		var _arrIds = new Array(
			this.BUTTON_ID_FIRST
			,this.BUTTON_ID_PREVIOUS
			,this.BUTTON_ID_NEXT
			,this.BUTTON_ID_LAST
		);
		var _arrValues = new Array();
		var _compId = null;
		var _compValue = null;
		var _nextPage = null;
		
		//create an array of values
		_arrValues.push(1);
		_nextPage = parseInt(this.config.pageNumber);
		_arrValues.push(--_nextPage);
		_nextPage = parseInt(this.config.pageNumber);
		_arrValues.push(++_nextPage);
		_arrValues.push(parseInt(this.totalPages));
		
		//check the configuration option
		if (this.config.showNavButtons==true) {
			//loop through the array
			for (var i=0;i<_arrIds.length;i++) {
				//get elements by their ids
				_compId = _arrIds[i];
				_compValue = _arrValues[i];
				
				//attache the events
				this._attachClickEventNavButtons(_compId,_compValue);
			}
		}
	};
	this._attachConfigMouseEvent = function(_compId) {
		var _comp = null;
		var _hoverClass = "nbNavbarConfigButtonHover";
		
		//check the configuration option
		if (this.config.showConfig==true) {
			//get elements by their ids
			_comp = document.getElementById(_compId);
			
			//check for nulls
			if (_comp==null || _comp=="undefined") {
				return;
			}
			
			//attache the events
			_comp.onmouseover = function() {
				//invoke the function handler
				if (!$("#"+_compId).hasClass(_hoverClass)) {
					$("#"+_compId).addClass(_hoverClass);
				}
			};			
			_comp.onmouseout = function() {
				//invoke the function handler
				if ($("#"+_compId).hasClass(_hoverClass)) {
					$("#"+_compId).removeClass(_hoverClass);
				}
			};			
		}
	};
	this._attachConfigClickEvent = function() {
		//declare locals
		var _buttonId = this.BUTTON_ID_CONFIG_CONFIG;
		var _configDivId = this.DIV_ID_CONFIG;
		var _button = null;
		var _buttonTop = 0;
		var _buttonLeft = 0;
		var _buttonHeight = 0;
		var _buttonWidth = 0;
		var _configWidth = 0;
		var _configHeight = 0;
		var _docHeight = 0;
		var _configTop = 0;
		var _configLeft = 0;
		var _verticalSpace = 10;
		var _horizontalSpace = 10;
		
		//check the configuration option
		if (this.config.showConfig==true) {
			//get elements by their ids
			_button = document.getElementById(_buttonId);
						
			//attache the events
			_button.onclick = function() {
				//calculate position
				_buttonTop = $("#"+_buttonId).offset().top;
				_buttonLeft = $("#"+_buttonId).offset().left;
				_buttonHeight = $("#"+_buttonId).height();
				_buttonWidth = $("#"+_buttonId).outerWidth();
				_configWidth = $("#"+_configDivId).width();
				_configHeight = $("#"+_configDivId).height();
				_docHeight = $(document).height();
				_configTop = _buttonTop+_buttonHeight+_verticalSpace;
				if (document.all) {
					if (__uiComp.config.dir=="ltr") {
						_configLeft = _buttonLeft-_configWidth;
					}
					else {
						_configLeft = _buttonLeft;
					}
				}
				else {
					if (__uiComp.config.dir=="ltr") {
						_configLeft = _buttonLeft-_configWidth;;
						if (_configLeft<0) {
							_configLeft = _buttonLeft;
						}
					}
					else {
						_configLeft = _buttonLeft;
					}
				}
				$("#"+_configDivId).css('top',_configTop);
				$("#"+_configDivId).css('left',_configLeft);
				
				//handle event
				var msg = "_buttonLeft=["+_buttonLeft+"]";
				msg += "\n_buttonTop=["+_buttonTop+"]";
				msg += "\n_buttonHeight=["+_buttonHeight+"]";
				msg += "\n_buttonWidth=["+_buttonWidth+"]";
				msg += "\n_configLeft=["+_configLeft+"]";
				msg += "\n_configWidth=["+_configWidth+"]";
				msg += "\n_configTop=["+_configTop+"]";
				msg += "\n_configHeight=["+_configHeight+"]";
				msg += "\n_docHeight=["+_docHeight+"]";
				//alert(msg);
				if ($("#"+_configDivId).css("display")=="none") {
					if ((_configTop+_configHeight)>_docHeight) {
						$("#"+_configDivId).slideUp('slow');
					}
					else {
						$("#"+_configDivId).slideDown('slow');
					}
				}
				else {
					if ((_configTop+_configHeight)>_docHeight) {
						$("#"+_configDivId).slideDown('slow');
					}
					else {
						$("#"+_configDivId).slideUp('slow');
					}
				}
			};			
		}
	};
	this._attachConfigSaveClickEvent = function() {
		var _buttonId = this.BUTTON_ID_CONFIG_SAVE;
		var _button = null;
		var _fh = null;
		
		//check the configuration option
		if (this.config.showConfig==true) {
			//get elements by their ids
			_button = document.getElementById(_buttonId);
			
			//set the function handler
			_fh = this._configSaved;
			
			//attache the events
			_button.onclick = function() {
				//invoke the function handler
				_fh();
			};
		}
	};
	this._attachConfigEvents = function() {
		//declare locals
		var _arrIds = new Array(
			this.BUTTON_ID_CONFIG_CONFIG
			,this.BUTTON_ID_CONFIG_SAVE
		);
		
		//attache events in a loop
		for (var i=0;i<_arrIds.length;i++) {
			this._attachConfigMouseEvent(_arrIds[i]);
		}
		this._attachConfigClickEvent();
		this._attachConfigSaveClickEvent();
	};
	this._alignComponent = function() {
		//declare locals
		var align = this.config.alignment;
		var alignToId = this.config.alignTo;
		var alignToComp = null;
		var alignToTop = 0;
		var alignToLeft = 0;
		var alignToHeight = 0;
		var alignToWidth = 0;
		var compTop = 0;
		var compLeft = 0;
		var compHeight = 0;
		var compWidth = 0;
		var _newTop = 0;
		var _newLeft = 0;
		
		//check if the alignTo is different than the container
		if (alignToId==null || alignToId=="" || alignToId==this.compid) {
			return;
		}
		
		//check for a valid alignToId component
		alignToComp = document.getElementById(alignToId);
		if (alignToComp==null || alignToComp=="undefined") {
			alert("NavBar(): alignTo ["+alignToId+"] is an invalid component.");
			return;
		}
		
		//init variables
		alignToHeight = $("#"+alignToId).height();
		alignToWidth = $("#"+alignToId).width();
		alignToTop = $("#"+alignToId).position().top;
		alignToLeft = $("#"+alignToId).position().left;
		compHeight = $("#"+this.compid).height();
		compWidth = $("#"+this.compid).width();
		compTop = $("#"+this.compid).position().top;
		compLeft = $("#"+this.compid).position().left;
		var msg = "alignToHeight=["+alignToHeight+"]";
		msg += "\nalignToWidth=["+alignToWidth+"]";
		msg += "\nalignToTop=["+alignToTop+"]";
		msg += "\nalignToLeft=["+alignToLeft+"]";
		msg += "\ncompHeight=["+compHeight+"]";
		msg += "\ncompWidth=["+compWidth+"]";
		msg += "\ncompTop=["+compTop+"]";
		msg += "\ncompLeft=["+compLeft+"]";
		msg += "\nalign=["+align+"]";
		//alert(msg);
		
		//check the alignment
		switch (align.toLowerCase()) {
			case "top":
				_newTop = alignToTop - compHeight;
				_newLeft = alignToLeft;
				break;
			case "bottom":
				_newTop = alignToTop + alignToHeight;
				_newLeft = alignToLeft;
				break;
			case "left":
				_newTop = alignToTop;
				_newLeft = alignToLeft - compWidth;
				break;
			case "right":
				_newTop = alignToTop;
				_newLeft = alignToLeft + alignToWidth;
				break;
		}
		
		//set the component's position
		$("#"+this.compid).css('top',_newTop);
		$("#"+this.compid).css('left',_newLeft);
		$("#"+this.compid).css('position',"absolute");
	};
	this._renderComponent = function() {
		//declare locals
		var _html = "";
		var _renderToId = this.config.renderTo;
		var _renderToComp = null;
		
		//render the component's css
		this._renderCss();
		
		//check the width's prefix
		var strWidth = this.config.width;
		if (!isNaN(strWidth)) {
			strWidth = String(strWidth);
		}
		if (strWidth.indexOf("px")==-1 && strWidth.indexOf("%")==-1) {
			strWidth = strWidth+"px";
		}
		
		//start rendering the component
		_html += "<div id=\""+this.compid+"\" dir=\""+this.config.dir+"\" style=\"width:"+strWidth+";\" class=\"nbNavbar\">";
		_html += "<table class=\"nbNavbarTable\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
		_html += "<tr>";
		
		//render the component's parts
		_html += this._renderRecordInfo();
		_html += this._renderNavButtons();
		_html += this._renderPageInfo();
		_html += this._renderPageSize();
		_html += this._renderConfigButton();
		
		//finish rendering the component
		_html += "</tr>";
		_html += "</table>";
		_html += "</div>";
		_html += this._renderConfigDiv();
		
		//render the component
		if (_renderToId==null || _renderToId=="") {
			document.write(_html);
		}
		else {
			_renderToComp = document.getElementById(_renderToId);
			if (_renderToComp!=null) {
				_renderToComp.innerHTML = _html;
			}
		}
		//$("#"+this.compid).html(_html);
		
		//align the component
		this._alignComponent();
	};
	this._attachEvents = function() {
		//invoke the correct functions
		this._attachEventPageNumChanged();
		this._attachEventPageSizeChanged();
		this._attachMouseEventsNavButtonsAll();
		this._attachClickEventNavButtonsAll();
		this._attachConfigEvents();
	};
	//define a global component instance
	var __uiComp = this;
	__uiComp._init();
};
};
