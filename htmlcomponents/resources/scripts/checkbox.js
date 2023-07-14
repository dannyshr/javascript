//@C Danny Shraga 2008

function Checkbox(_elementId) {
	//declare locals
	var ATT_NAME_IMAGE_OFF = "imageOff";
	var ATT_NAME_IMAGE_OFF_DISABLED = "imageOffDisabled";
	var ATT_NAME_IMAGE_OFF_HOVER = "imageOffHover";
	var ATT_NAME_IMAGE_ON = "imageOn";
	var ATT_NAME_IMAGE_ON_DISABLED = "imageOnDisabled";
	var ATT_NAME_IMAGE_ON_HOVER = "imageOnHover";
	var ATT_NAME_CHECKBOX_POSITION = "checkboxPosition";
	var ATT_NAME_STYLE_CLASS_BOX = "styleClassBox";
	var ATT_NAME_STYLE_CLASS_BOX_DISABLED = "styleClassBoxDisabled";
	var ATT_NAME_STYLE_CLASS_INNERBOX = "styleClassInnerBox";
	var ATT_NAME_STYLE_CLASS_INNERBOX_HOVER = "styleClassInnerBoxHover";
	var ATT_NAME_STYLE_CLASS_TEXT = "styleClassText";
	var ATT_NAME_STYLE_CLASS_TEXT_DISABLED = "styleClassTextDisabled";
	var ATT_NAME_STYLE_CLASS_TEXT_HOVER = "styleClassTextHover";
	var ATT_NAME_STYLE_CLASS_ICON = "styleClassIcon";
	var ATT_NAME_STYLE_CLASS_ICON_HOVER = "styleClassIconHover";
	var ATT_NAME_USE_SKIN = "useSkin";
	var IMAGES_LOCATION_DEFAULT = "resources/images";
	var IMAGES_EXT_DEFAULT = ".gif";
	var IMAGE_ON_DEFAULT = "checked";
	var IMAGE_OFF_DEFAULT = "empty";
	var STYLE_CLASS_NO_SKIN = "checkboxBox";
	var STYLE_CLASS_OFF = "checkboxOff";
	var STYLE_CLASS_OFF_DISABLED = "checkboxOffDisabled";
	var STYLE_CLASS_OFF_HOVER = "checkboxOffHover";
	var STYLE_CLASS_ON = "checkboxOn";
	var STYLE_CLASS_ON_DISABLED = "checkboxOnDisabled";
	var STYLE_CLASS_ON_HOVER = "checkboxOnHover";
	var CHECKBOX_POSITION_BOTTOM = "Bottom";
	var CHECKBOX_POSITION_LEFT = "Left";
	var CHECKBOX_POSITION_RIGHT = "Right";
	var CHECKBOX_POSITION_TOP = "Top";
	var DIV_SUFFIX = "Div";
	var BOXTD_SUFFIX = "BoxTd";
	var LABELTD_SUFFIX = "LabelTd";
	var BOX_SUFFIX = "Box";
	var LABEL_SUFFIX = "Label";
	var INNERBOX_SUFFIX = "InnerBox";
	var ICON_SUFFIX = "Icon";
	this.id = _elementId;
	this.obj = (document.getElementById(_elementId) ? document.getElementById(_elementId) : null);
	this.boxObj = (document.getElementById(_elementId+BOX_SUFFIX) ? document.getElementById(_elementId+BOX_SUFFIX) : null);
	this.labelObj = (document.getElementById(_elementId+LABEL_SUFFIX) ? document.getElementById(_elementId+LABEL_SUFFIX) : null);
	this.innerBoxObj = (document.getElementById(_elementId+INNERBOX_SUFFIX) ? document.getElementById(_elementId+INNERBOX_SUFFIX) : null);
	this.iconObj = (document.getElementById(_elementId+ICON_SUFFIX) ? document.getElementById(_elementId+ICON_SUFFIX) : null);
	this.disabled = (this.obj==null ? false : this.obj.disabled);
	this.checked = (this.obj==null ? false : this.obj.checked);
	this.mouseover=function() {
		//declare locals
		var attName = null;
		
		//check for nulls
		if (this.obj==null || this.disabled) {
			return;
		}
		
		//check for a customized object
		if (this.boxObj==null) {
			return;
		}
		
		//reset style classes for the different object's parts
		if (this.labelObj!=null) {
			this.labelObj.className = this.boxObj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_HOVER);
		}
		
		//check if skinned style class should be used
		if (this.skinIsUsed()) {
			//check for the object's mode
			if (this.checked) {
				this.boxObj.className = STYLE_CLASS_ON_HOVER;
			}
			else {
				this.boxObj.className = STYLE_CLASS_OFF_HOVER;
			}
		}
		else {
			//reset style classes for the different object's parts
			if (this.innerBoxObj!=null) {
				this.innerBoxObj.className = this.boxObj.getAttribute(ATT_NAME_STYLE_CLASS_INNERBOX_HOVER);
			}
			if (this.iconObj!=null) {
				if (this.obj.checked) {
					attName = ATT_NAME_IMAGE_ON_HOVER;
				}
				else {
					attName = ATT_NAME_IMAGE_OFF_HOVER;
				}
				this.iconObj.className = this.boxObj.getAttribute(ATT_NAME_STYLE_CLASS_ICON_HOVER);
				this.iconObj.src = this.boxObj.getAttribute(attName);
			}
		}
	};
	this.mouseout=function() {
		//declare locals
		var attName = null;
		
		//check for nulls
		if (this.obj==null || this.disabled) {
			return;
		}
		
		//check for a customized object
		if (this.boxObj==null) {
			return;
		}
		
		//reset style classes for the different object's parts
		if (this.labelObj!=null) {
			this.labelObj.className = this.boxObj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT);
		}
		
		//check if skinned style class should be used
		if (this.skinIsUsed()) {
			//check for the object's mode
			if (this.checked) {
				this.boxObj.className = STYLE_CLASS_ON;
			}
			else {
				this.boxObj.className = STYLE_CLASS_OFF;
			}
		}
		else {
			//reset style classes for the different object's parts
			if (this.innerBoxObj!=null) {
				this.innerBoxObj.className = this.boxObj.getAttribute(ATT_NAME_STYLE_CLASS_INNERBOX);
			}
			if (this.iconObj!=null) {
				if (this.obj.checked) {
					attName = ATT_NAME_IMAGE_ON;
				}
				else {
					attName = ATT_NAME_IMAGE_OFF;
				}
				this.iconObj.className = this.boxObj.getAttribute(ATT_NAME_STYLE_CLASS_ICON);
				this.iconObj.src = this.boxObj.getAttribute(attName);
			}
		}
	};
	this.click=function() {
		//declare locals
		var attName = null;
		
		//check for nulls
		if (this.obj==null || this.disabled) {
			return;
		}

		//click the object
		this.obj.click();
		
		//set the object's mode
		this.checked = this.obj.checked;
		
		//check for a customized object
		if (this.boxObj==null) {
			return;
		}
		
		//check if skinned style class should be used
		if (this.skinIsUsed()) {
			//check for the object's mode
			if (this.checked) {
				this.boxObj.className = STYLE_CLASS_ON;
			}
			else {
				this.boxObj.className = STYLE_CLASS_OFF;
			}
		}
		else {
			//reset style classes for the different object's parts
			if (this.iconObj!=null) {
				if (this.checked) {
					attName = ATT_NAME_IMAGE_ON;
				}
				else {
					attName = ATT_NAME_IMAGE_OFF;
				}
				this.iconObj.src = this.boxObj.getAttribute(attName);
			}
		}
	};
	this.disable=function(_disabled) {
		//declare locals
		var attName = null;
		
		//check for nulls
		if (this.obj==null || _disabled==null) {
			return;
		}
		
		//set the object's disabled mode
		this.obj.disabled = _disabled;
		this.disabled = _disabled;
		
		//check for a customized object
		if (this.boxObj==null) {
			return;
		}
		
		//reset style classes for the different object's parts
		//this.boxObj.disabled = this.disabled;
		if (this.labelObj!=null) {
			if (this.disabled) {
				this.labelObj.className = this.boxObj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_DISABLED);
			}
			else {
				this.labelObj.className = this.boxObj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT);
			}
		}
		
		//check if skinned style class should be used
		if (this.skinIsUsed()) {
			//check for the object's mode
			if (this.checked) {
				if (this.disabled) {
					attName = STYLE_CLASS_ON_DISABLED;
				}
				else {
					attName = STYLE_CLASS_ON;
				}
			}
			else {
				if (this.disabled) {
					attName = STYLE_CLASS_OFF_DISABLED;
				}
				else {
					attName = STYLE_CLASS_OFF;
				}
			}
			this.boxObj.className = attName;
		}
		else {
			//reset style classes for the different object's parts
			if (this.disabled) {
				this.boxObj.className = this.boxObj.getAttribute(ATT_NAME_STYLE_CLASS_BOX_DISABLED);
			}
			else {
				this.boxObj.className = this.boxObj.getAttribute(ATT_NAME_STYLE_CLASS_BOX);
			}
			if (this.iconObj!=null) {
				if (this.checked) {
					if (this.disabled) {
						attName = ATT_NAME_IMAGE_ON_DISABLED;
					}
					else {
						attName = ATT_NAME_IMAGE_ON;
					}
				}
				else {
					if (this.disabled) {
						attName = ATT_NAME_IMAGE_OFF_DISABLED;
					}
					else {
						attName = ATT_NAME_IMAGE_OFF;
					}
				}
				this.iconObj.src = this.boxObj.getAttribute(attName);
			}
		}
	};
	this.setUncheckedIcon=function(_newIcon) {
		//declare locals
		var iconExt = ".gif";
		var image = null;
		var imageDisabled = null;
		var imageHover = null;
		var attName = null;
		
		//check for nulls
		if (this.obj==null) {
			return;
		}
		
		//manipulate the image string
		image = _newIcon;
		if (image.lastIndexOf('.')!=-1) {
			image = image.substr(0,image.lastIndexOf('.'));
		}
		imageDisabled = image+"_dis"+iconExt;
		imageHover = image+"_hover"+iconExt;
		image = image+iconExt;
		
		//reset style classes for the object's parts
		this.obj.setAttribute(ATT_NAME_IMAGE_OFF,image);
		this.obj.setAttribute(ATT_NAME_IMAGE_OFF_DISABLED,imageDisabled);
		this.obj.setAttribute(ATT_NAME_IMAGE_OFF_HOVER,imageHover);
		
		//check for a customized object
		if (this.boxObj==null) {
			return;
		}
		
		//reset style classes for the customized object's parts
		this.boxObj.setAttribute(ATT_NAME_IMAGE_OFF,image);
		this.boxObj.setAttribute(ATT_NAME_IMAGE_OFF_DISABLED,imageDisabled);
		this.boxObj.setAttribute(ATT_NAME_IMAGE_OFF_HOVER,imageHover);
		
		//check if skinned style class should be used
		if (this.skinIsUsed()) {
			//set the object's new styleClass
			if (!this.checked) {
				if (this.disabled) {
					attName = STYLE_CLASS_OFF_DISABLED;
				}
				else {
					attName = STYLE_CLASS_OFF;
				}
			}
			this.boxObj.className = attName;
		}
		else {
			if (this.iconObj!=null) {
				//set the object's new icon
				if (!this.checked) {
					if (this.disabled) {
						attName = ATT_NAME_IMAGE_OFF_DISABLED;
					}
					else {
						attName = ATT_NAME_IMAGE_OFF;
					}
					this.iconObj.src = this.boxObj.getAttribute(attName);
				}
			}
		}
	};
	this.setCheckedIcon=function(_newIcon) {
		//declare locals
		var iconExt = ".gif";
		var image = null;
		var imageDisabled = null;
		var imageHover = null;
		var attName = null;
		
		//check for nulls
		if (this.obj==null) {
			return;
		}
		
		//manipulate the image string
		image = _newIcon;
		if (image.lastIndexOf('.')!=-1) {
			image = image.substr(0,image.lastIndexOf('.'));
		}
		imageDisabled = image+"_dis"+iconExt;
		imageHover = image+"_hover"+iconExt;
		image = image+iconExt;
		
		//reset style classes for the object's parts
		this.obj.setAttribute(ATT_NAME_IMAGE_ON,image);
		this.obj.setAttribute(ATT_NAME_IMAGE_ON_DISABLED,imageDisabled);
		this.obj.setAttribute(ATT_NAME_IMAGE_ON_HOVER,imageHover);
		
		//check for a customized object
		if (this.boxObj==null) {
			return;
		}
		
		//reset style classes for the customized object's parts
		this.boxObj.setAttribute(ATT_NAME_IMAGE_ON,image);
		this.boxObj.setAttribute(ATT_NAME_IMAGE_ON_DISABLED,imageDisabled);
		this.boxObj.setAttribute(ATT_NAME_IMAGE_ON_HOVER,imageHover);
		
		//check if skinned style class should be used
		if (this.skinIsUsed()) {
			//set the object's new styleClass
			if (this.checked) {
				if (this.disabled) {
					attName = STYLE_CLASS_ON_DISABLED;
				}
				else {
					attName = STYLE_CLASS_ON;
				}
			}
			this.boxObj.className = attName;
		}
		else {
			//reset style classes for the different object's parts
			if (this.iconObj!=null) {
				//set the object's new icon
				if (this.checked) {
					if (this.disabled) {
						attName = ATT_NAME_IMAGE_ON_DISABLED;
					}
					else {
						attName = ATT_NAME_IMAGE_ON;
					}
					this.iconObj.src = this.boxObj.getAttribute(attName);
				}
			}
		}
	};
	this.setLabel=function(_newLabel) {
		//check for nulls
		if (this.obj==null) {
			return;
		}
		
		//reset style classes for the different object's parts
		if (this.labelObj!=null) {
			this.labelObj.innerHTML = _newLabel;
		}
	};
	this.setTitle=function(_newTitle) {
		//declare locals
		var attName = "title";

		//check for nulls
		if (this.obj==null) {
			return;
		}
		
		//reset style classes for the different object's parts
		if (_newTitle==null || _newTitle=='') {
			this.obj.removeAttribute(attName);
		}
		else {
			this.obj.setAttribute(attName,_newTitle);
		}
		
		//check for a customized object
		if (this.boxObj==null) {
			return;
		}
		
		//set the title for the customized object
		if (_newTitle==null || _newTitle=='') {
			this.boxObj.removeAttribute(attName);
		}
		else {
			this.boxObj.setAttribute(attName,_newTitle);
		}
		if (this.labelObj!=null) {
			if (_newTitle==null || _newTitle=='') {
				this.labelObj.removeAttribute(attName);
			}
			else {
				this.labelObj.setAttribute(attName,_newTitle);
			}
		}
	};
	this.customize=function(_customize){
		//declare locals
		var custObj = null;
		var labelInnerHtml = "";
		var boxInnerHtml = "";
		var currPosition = null;
		var innerHtml = "";
		
		//check for nulls
		if (this.obj==null || _customize==null) {
			return;
		}
		
		//get a reference to the custom object
		custObj = document.getElementById(this.id+DIV_SUFFIX);
		if (custObj==null) {
			//render the object's parts
			labelInnerHtml = this.renderLabel();
			boxInnerHtml = this.renderBox();
			
			//create a new custom object
			custObj = document.createElement("div");
			custObj.id = this.id+DIV_SUFFIX;
			custObj.name = this.id+DIV_SUFFIX;
			
			//check the object's position
			if (this.obj.getAttribute(ATT_NAME_CHECKBOX_POSITION)==null || this.obj.getAttribute(ATT_NAME_CHECKBOX_POSITION)=='') {
				currPosition = CHECKBOX_POSITION_LEFT;
			}
			else {
				currPosition = this.obj.getAttribute(ATT_NAME_CHECKBOX_POSITION);
			}
			if (currPosition.toUpperCase()==CHECKBOX_POSITION_BOTTOM.toUpperCase()) {
				innerHtml = "<table class=\"checkboxTable\">";
				innerHtml += "<tr><td class=\"checkboxBottom\" id=\"" + this.id+LABELTD_SUFFIX + "\" name=\"" + this.id+LABELTD_SUFFIX + "\" >" + labelInnerHtml + "</td></tr>";
				innerHtml += "<tr><td class=\"checkboxBottom\" id=\"" + this.id+BOXTD_SUFFIX + "\" name=\"" + this.id+BOXTD_SUFFIX + "\" >" + boxInnerHtml + "</td></tr>";
				innerHtml += "</table>";
			}
			else if (currPosition.toUpperCase()==CHECKBOX_POSITION_LEFT.toUpperCase()) {
				innerHtml = "<table class=\"checkboxTable\"><tr>";
				innerHtml += "<td class=\"checkboxLeft\" id=\"" + this.id+BOXTD_SUFFIX + "\" name=\"" + this.id+BOXTD_SUFFIX + "\" >" + boxInnerHtml + "</td>";
				innerHtml += "<td class=\"checkboxLeft\" id=\"" + this.id+LABELTD_SUFFIX + "\" name=\"" + this.id+LABELTD_SUFFIX + "\" >" + labelInnerHtml + "</td>";
				innerHtml += "</tr></table>";
			}
			else if (currPosition.toUpperCase()==CHECKBOX_POSITION_RIGHT.toUpperCase()) {
				innerHtml = "<table class=\"checkboxTable\"><tr>";
				innerHtml += "<td class=\"checkboxRight\" id=\"" + this.id+LABELTD_SUFFIX + "\" name=\"" + this.id+LABELTD_SUFFIX + "\" >" + labelInnerHtml + "</td>";
				innerHtml += "<td class=\"checkboxRight\" id=\"" + this.id+BOXTD_SUFFIX + "\" name=\"" + this.id+BOXTD_SUFFIX + "\" >" + boxInnerHtml + "</td>";
				innerHtml += "</tr></table>";
			}
			if (currPosition.toUpperCase()==CHECKBOX_POSITION_TOP.toUpperCase()) {
				innerHtml = "<table class=\"checkboxTable\">";
				innerHtml += "<tr><td class=\"checkboxTop\" id=\"" + this.id+BOXTD_SUFFIX + "\" name=\"" + this.id+BOXTD_SUFFIX + "\" >" + boxInnerHtml + "</td></tr>";
				innerHtml += "<tr><td class=\"checkboxTop\" id=\"" + this.id+LABELTD_SUFFIX + "\" name=\"" + this.id+LABELTD_SUFFIX + "\" >" + labelInnerHtml + "</td></tr>";
				innerHtml += "</table>";
			}
			
			//create the object's inner HTML
			custObj.innerHTML = innerHtml;
		}
		
		//hide the real object
		if (_customize) {
			this.obj.style.display = "none";
			if (custObj!=null) {
				custObj.style.display = "block";
			}
			//add the customized object to the DOM
			this.obj.parentNode.insertBefore(custObj, this.obj);
		}
		else {
			if (custObj!=null) {
				//remove the customized object from the DOM
				try {
					this.obj.parentNode.removeChild(custObj);
				}catch(err) {};
			}
			this.obj.style.display = "block";
		}
	};
	this.renderLabel=function() {
		//declare locals
		var innerHtml = "";
		var styleClass = null;
		
		//check for nulls
		if (this.obj==null) {
			return null;
		}
		
		//get the object's attributes
		if (this.disabled) {
			//build the object's custom attributes
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_DISABLED)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_DISABLED)=='') {
				styleClass = "checkboxBoxLabelDisabled";
			}
			else {
				styleClass = this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_DISABLED);
			}
		}
		else {
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT)=='') {
				styleClass = "checkboxBoxLabel";
			}
			else {
				styleClass = this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT);
			}
		}
		
		//render the object's part
		innerHtml = "<font id=\"" + this.id+LABEL_SUFFIX + "\" name=\"" + this.id+LABEL_SUFFIX + "\" " +
					"class=\"" + styleClass + "\" " +
					"onmouseover=\"toggleCheckboxMouseover('" + this.id + "');\" " + 
					"onmouseout=\"toggleCheckboxMouseout('" + this.id + "');\" " +  
					"onclick=\"clickCheckbox('" + this.id + "');\">" + this.id + "</font>";
		
		//return the method's value
		return innerHtml;
	};
	this.renderBox=function() {
		//declare locals
		var innerHtml = "";
		var imageAttName = null;
		var customAtts = "";
		var boxStyleClass = null;
		var innerBoxStyle = "display:block";
		var skinnedStyleClass = null;
		var styleClassInnerBox = null;
		var styleClassIcon = null;
		var imageSource = null;
		
		//check for nulls
		if (this.obj==null) {
			return null;
		}
		
		//get the object's attributes
		if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_INNERBOX)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_INNERBOX)=='') {
			styleClassInnerBox = "checkboxInnerBox";
		}
		else {
			styleClassInnerBox = this.obj.getAttribute(ATT_NAME_STYLE_CLASS_INNERBOX);
		}
		if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_ICON)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_ICON)=='') {
			styleClassIcon = "checkboxInnerBox";
		}
		else {
			styleClassIcon = this.obj.getAttribute(ATT_NAME_STYLE_CLASS_ICON);
		}
		if (this.disabled) {
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BOX_DISABLED)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BOX_DISABLED)=='') {
				boxStyleClass = "checkboxBoxDisabled";
			}
			else {
				boxStyleClass = this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BOX_DISABLED);
			}
		}
		else {
			if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BOX)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BOX)=='') {
				boxStyleClass = "checkboxBox";
			}
			else {
				boxStyleClass = this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BOX);
			}
		}
		if (this.checked) {
			if (this.disabled) {
				if (this.obj.getAttribute(ATT_NAME_IMAGE_ON_DISABLED)==null || this.obj.getAttribute(ATT_NAME_IMAGE_ON_DISABLED)=='') {
					imageSource = IMAGE_ON_DEFAULT+"_dis";
				}
				else {
					imageSource = this.obj.getAttribute(ATT_NAME_IMAGE_ON_DISABLED);
				}
				skinnedStyleClass = STYLE_CLASS_ON_DISABLED;
			}
			else {
				if (this.obj.getAttribute(ATT_NAME_IMAGE_ON)==null || this.obj.getAttribute(ATT_NAME_IMAGE_ON)=='') {
					imageSource = IMAGE_ON_DEFAULT;
				}
				else {
					imageSource = this.obj.getAttribute(ATT_NAME_IMAGE_ON);
				}
				skinnedStyleClass = STYLE_CLASS_ON_DISABLED;
			}
		}
		else {
			if (this.disabled) {
				if (this.obj.getAttribute(ATT_NAME_IMAGE_OFF_DISABLED)==null || this.obj.getAttribute(ATT_NAME_IMAGE_OFF_DISABLED)=='') {
					imageSource = IMAGE_OFF_DEFAULT+"_dis";
				}
				else {
					imageSource = this.obj.getAttribute(ATT_NAME_IMAGE_OFF_DISABLED);
				}
				skinnedStyleClass = STYLE_CLASS_OFF_DISABLED;
			}
			else {
				if (this.obj.getAttribute(ATT_NAME_IMAGE_OFF)==null || this.obj.getAttribute(ATT_NAME_IMAGE_OFF)=='') {
					imageSource = IMAGE_OFF_DEFAULT;
				}
				else {
					imageSource = this.obj.getAttribute(ATT_NAME_IMAGE_OFF);
				}
				skinnedStyleClass = STYLE_CLASS_OFF;
			}
		}
		if (this.skinIsUsed()) {
			innerBoxStyle = "display:none";
		}
		else {
			skinnedStyleClass = boxStyleClass;
		}
		
		//build the object's custom attributes
		customAtts += " ";
		if (this.obj.getAttribute(ATT_NAME_IMAGE_OFF)==null || this.obj.getAttribute(ATT_NAME_IMAGE_OFF)=='') {
			customAtts += ATT_NAME_IMAGE_OFF + "=\"" + IMAGES_LOCATION_DEFAULT + "/" + IMAGE_OFF_DEFAULT + IMAGES_EXT_DEFAULT + "\" ";
		}
		else {
			customAtts += ATT_NAME_IMAGE_OFF + "=\"" + this.obj.getAttribute(ATT_NAME_IMAGE_OFF) + "\" ";
		}
		if (this.obj.getAttribute(ATT_NAME_IMAGE_OFF_DISABLED)==null || this.obj.getAttribute(ATT_NAME_IMAGE_OFF_DISABLED)=='') {
			customAtts += ATT_NAME_IMAGE_OFF_DISABLED + "=\"" + IMAGES_LOCATION_DEFAULT + "/" + IMAGE_OFF_DEFAULT+"_dis" + IMAGES_EXT_DEFAULT + "\" ";
		}
		else {
			customAtts += ATT_NAME_IMAGE_OFF_DISABLED + "=\"" + this.obj.getAttribute(ATT_NAME_IMAGE_OFF_DISABLED) + "\" ";
		}
		if (this.obj.getAttribute(ATT_NAME_IMAGE_OFF_HOVER)==null || this.obj.getAttribute(ATT_NAME_IMAGE_OFF_HOVER)=='') {
			customAtts += ATT_NAME_IMAGE_OFF_HOVER + "=\"" + IMAGES_LOCATION_DEFAULT + "/" + IMAGE_OFF_DEFAULT+"_hover" + IMAGES_EXT_DEFAULT + "\" ";
		}
		else {
			customAtts += ATT_NAME_IMAGE_OFF_HOVER + "=\"" + this.obj.getAttribute(ATT_NAME_IMAGE_OFF_HOVER) + "\" ";
		}
		if (this.obj.getAttribute(ATT_NAME_IMAGE_ON)==null || this.obj.getAttribute(ATT_NAME_IMAGE_ON)=='') {
			customAtts += ATT_NAME_IMAGE_ON + "=\"" + IMAGES_LOCATION_DEFAULT + "/" + IMAGE_ON_DEFAULT + IMAGES_EXT_DEFAULT + "\" ";
		}
		else {
			customAtts += ATT_NAME_IMAGE_ON + "=\"" + this.obj.getAttribute(ATT_NAME_IMAGE_ON) + "\" ";
		}
		if (this.obj.getAttribute(ATT_NAME_IMAGE_ON_DISABLED)==null || this.obj.getAttribute(ATT_NAME_IMAGE_ON_DISABLED)=='') {
			customAtts += ATT_NAME_IMAGE_ON_DISABLED + "=\"" + IMAGES_LOCATION_DEFAULT + "/" + IMAGE_ON_DEFAULT+"_dis" + IMAGES_EXT_DEFAULT + "\" ";
		}
		else {
			customAtts += ATT_NAME_IMAGE_ON_DISABLED + "=\"" + this.obj.getAttribute(ATT_NAME_IMAGE_ON_DISABLED) + "\" ";
		}
		if (this.obj.getAttribute(ATT_NAME_IMAGE_ON_HOVER)==null || this.obj.getAttribute(ATT_NAME_IMAGE_ON_HOVER)=='') {
			customAtts += ATT_NAME_IMAGE_ON_HOVER + "=\"" + IMAGES_LOCATION_DEFAULT + "/" + IMAGE_ON_DEFAULT+"_hover" + IMAGES_EXT_DEFAULT + "\" ";
		}
		else {
			customAtts += ATT_NAME_IMAGE_ON_HOVER + "=\"" + this.obj.getAttribute(ATT_NAME_IMAGE_ON_HOVER) + "\" ";
		}
		if (this.obj.getAttribute(ATT_NAME_CHECKBOX_POSITION)==null || this.obj.getAttribute(ATT_NAME_CHECKBOX_POSITION)=='') {
			customAtts += ATT_NAME_CHECKBOX_POSITION + "=\"" + CHECKBOX_POSITION_LEFT + "\" ";
		}
		else {
			customAtts += ATT_NAME_CHECKBOX_POSITION + "=\"" + this.obj.getAttribute(ATT_NAME_CHECKBOX_POSITION) + "\" ";
		}
		if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BOX)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BOX)=='') {
			customAtts += ATT_NAME_STYLE_CLASS_BOX + "=\"checkboxBox\" ";
		}
		else {
			customAtts += ATT_NAME_STYLE_CLASS_BOX + "=\"" + this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BOX) + "\" ";
		}
		if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BOX_DISABLED)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BOX_DISABLED)=='') {
			customAtts += ATT_NAME_STYLE_CLASS_BOX_DISABLED + "=\"checkboxBoxDisabled\" ";
		}
		else {
			customAtts += ATT_NAME_STYLE_CLASS_BOX_DISABLED + "=\"" + this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BOX_DISABLED) + "\" ";
		}
		if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_INNERBOX)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_INNERBOX)=='') {
			customAtts += ATT_NAME_STYLE_CLASS_INNERBOX + "=\"checkboxInnerBox\" ";
		}
		else {
			customAtts += ATT_NAME_STYLE_CLASS_INNERBOX + "=\"" + this.obj.getAttribute(ATT_NAME_STYLE_CLASS_INNERBOX) + "\" ";
		}
		if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_INNERBOX_HOVER)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_INNERBOX_HOVER)=='') {
			customAtts += ATT_NAME_STYLE_CLASS_INNERBOX_HOVER + "=\"checkboxInnerBoxHover\" ";
		}
		else {
			customAtts += ATT_NAME_STYLE_CLASS_INNERBOX_HOVER + "=\"" + this.obj.getAttribute(ATT_NAME_STYLE_CLASS_INNERBOX_HOVER) + "\" ";
		}

		if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT)=='') {
			customAtts += ATT_NAME_STYLE_CLASS_TEXT + "=\"checkboxBoxLabel\" ";
		}
		else {
			customAtts += ATT_NAME_STYLE_CLASS_TEXT + "=\"" + this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT) + "\" ";
		}
		if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_DISABLED)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_DISABLED)=='') {
			customAtts += ATT_NAME_STYLE_CLASS_TEXT_DISABLED + "=\"checkboxBoxLabelDisabled\" ";
		}
		else {
			customAtts += ATT_NAME_STYLE_CLASS_TEXT_DISABLED + "=\"" + this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_DISABLED) + "\" ";
		}
		if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_HOVER)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_HOVER)=='') {
			customAtts += ATT_NAME_STYLE_CLASS_TEXT_HOVER + "=\"checkboxBoxLabelHover\" ";
		}
		else {
			customAtts += ATT_NAME_STYLE_CLASS_TEXT_HOVER + "=\"" + this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_HOVER) + "\" ";
		}
		if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_ICON)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_ICON)=='') {
			customAtts += ATT_NAME_STYLE_CLASS_ICON + "=\"checkboxIcon\" ";
		}
		else {
			customAtts += ATT_NAME_STYLE_CLASS_ICON + "=\"" + this.obj.getAttribute(ATT_NAME_STYLE_CLASS_ICON) + "\" ";
		}
		if (this.obj.getAttribute(ATT_NAME_STYLE_CLASS_ICON_HOVER)==null || this.obj.getAttribute(ATT_NAME_STYLE_CLASS_ICON_HOVER)=='') {
			customAtts += ATT_NAME_STYLE_CLASS_ICON_HOVER + "=\"checkboxIconHover\" ";
		}
		else {
			customAtts += ATT_NAME_STYLE_CLASS_ICON_HOVER + "=\"" + this.obj.getAttribute(ATT_NAME_STYLE_CLASS_ICON_HOVER) + "\" ";
		}
		if (this.obj.getAttribute(ATT_NAME_USE_SKIN)==null || this.obj.getAttribute(ATT_NAME_USE_SKIN)=='') {
			customAtts += ATT_NAME_USE_SKIN + "=\"false\" ";
		}
		else {
			customAtts += ATT_NAME_USE_SKIN + "=\"" + this.obj.getAttribute(ATT_NAME_USE_SKIN) + "\" ";
		}
		
		//render the object's part
		innerHtml += "<button type=\"button\" " +  
					"id=\"" + this.id+BOX_SUFFIX + "\" " + 
					"name=\"" + this.id+BOX_SUFFIX + "\" " + 
					"class=\"" + skinnedStyleClass + "\" " + customAtts + 
					"onmouseover=\"toggleCheckboxMouseover('" + this.id + "');\" " + 
					"onmouseout=\"toggleCheckboxMouseout('" + this.id + "');\" " + 
					"onclick=\"clickCheckbox('" + this.id + "');\" >";
		innerHtml += "<div id=\"" + this.id+INNERBOX_SUFFIX + "\" " + 
					"name=\"" + this.id+INNERBOX_SUFFIX + "\" " + 
					"class=\"" + styleClassInnerBox + "\" " +
					"style=\"" + innerBoxStyle + "\" >";
		innerHtml += "<img id=\"" + this.id+ICON_SUFFIX + "\" " + 
					"name=\"" + this.id+ICON_SUFFIX + "\" " + 
					"class=\"" + styleClassIcon + "\" " +
					"src=\"" + IMAGES_LOCATION_DEFAULT + "/" + imageSource + IMAGES_EXT_DEFAULT + "\" />";
		innerHtml += "</div>";
		innerHtml += "</button>";
		
		//return the method's value
		return innerHtml;
	};
	this.setPosition=function(_newPosition) {
		//declare locals
		var divObj = null;
		var boxTdObj = null;
		var labelTdObj = null;
		var boxInnerHtml = null;
		var labelInnerHtml = null;
		var innerHtml = "";
		
		//check for nulls
		if (this.obj==null || _newPosition==null) {
			return;
		}
		
		//set the object's attribute
		this.obj.setAttribute(ATT_NAME_CHECKBOX_POSITION,_newPosition);
		
		//check for a customized object
		if (this.boxObj==null) {
			return;
		}
		
		//set the object's attribute
		this.boxObj.setAttribute(ATT_NAME_CHECKBOX_POSITION,_newPosition);
		
		//get elements by their ids
		divObj = document.getElementById(this.id+DIV_SUFFIX);
		boxTdObj = document.getElementById(this.id+BOXTD_SUFFIX);
		labelTdObj = document.getElementById(this.id+LABELTD_SUFFIX);
		
		//check for nulls
		if (divObj==null || boxTdObj==null || labelTdObj==null) {
			return;
		}
		
		//get the inner HTML of the different parts
		boxInnerHtml = boxTdObj.innerHTML;
		labelInnerHtml = labelTdObj.innerHTML;
		
		//check the new position
		if (_newPosition.toUpperCase()==CHECKBOX_POSITION_BOTTOM.toUpperCase()) {
			innerHtml = "<table class=\"checkboxTable\">";
			innerHtml += "<tr><td class=\"checkboxBottom\" id=\"" + this.id+LABELTD_SUFFIX + "\" name=\"" + this.id+LABELTD_SUFFIX + "\" >" + labelInnerHtml + "</td></tr>";
			innerHtml += "<tr><td class=\"checkboxBottom\" id=\"" + this.id+BOXTD_SUFFIX + "\" name=\"" + this.id+BOXTD_SUFFIX + "\" >" + boxInnerHtml + "</td></tr>";
			innerHtml += "</table>";
		}
		else if (_newPosition.toUpperCase()==CHECKBOX_POSITION_LEFT.toUpperCase()) {
			innerHtml = "<table class=\"checkboxTable\"><tr>";
			innerHtml += "<td class=\"checkboxLeft\" id=\"" + this.id+BOXTD_SUFFIX + "\" name=\"" + this.id+BOXTD_SUFFIX + "\" >" + boxInnerHtml + "</td>";
			innerHtml += "<td class=\"checkboxLeft\" id=\"" + this.id+LABELTD_SUFFIX + "\" name=\"" + this.id+LABELTD_SUFFIX + "\" >" + labelInnerHtml + "</td>";
			innerHtml += "</tr></table>";
		}
		else if (_newPosition.toUpperCase()==CHECKBOX_POSITION_RIGHT.toUpperCase()) {
			innerHtml = "<table class=\"checkboxTable\"><tr>";
			innerHtml += "<td class=\"checkboxRight\" id=\"" + this.id+LABELTD_SUFFIX + "\" name=\"" + this.id+LABELTD_SUFFIX + "\" >" + labelInnerHtml + "</td>";
			innerHtml += "<td class=\"checkboxRight\" id=\"" + this.id+BOXTD_SUFFIX + "\" name=\"" + this.id+BOXTD_SUFFIX + "\" >" + boxInnerHtml + "</td>";
			innerHtml += "</tr></table>";
		}
		if (_newPosition.toUpperCase()==CHECKBOX_POSITION_TOP.toUpperCase()) {
			innerHtml = "<table class=\"checkboxTable\">";
			innerHtml += "<tr><td class=\"checkboxTop\" id=\"" + this.id+BOXTD_SUFFIX + "\" name=\"" + this.id+BOXTD_SUFFIX + "\" >" + boxInnerHtml + "</td></tr>";
			innerHtml += "<tr><td class=\"checkboxTop\" id=\"" + this.id+LABELTD_SUFFIX + "\" name=\"" + this.id+LABELTD_SUFFIX + "\" >" + labelInnerHtml + "</td></tr>";
			innerHtml += "</table>";
		}
		
		//rebuild the object's HTML
		divObj.innerHTML = innerHtml;
	};
	this.setSkin=function(_useSkin) {
		//declare locals
		var innerBoxStyle = null;
		var boxStyleClass = null;
		
		//check for nulls
		if (this.obj==null || _useSkin==null) {
			return;
		}
		
		//set the object's skin mode
		this.obj.setAttribute(ATT_NAME_USE_SKIN,_useSkin);
		
		//check for a customized object
		if (this.boxObj==null) {
			return;
		}
		
		//set the object's attribute
		this.boxObj.setAttribute(ATT_NAME_USE_SKIN,_useSkin);
		
		//reset style classes for the different object's parts
		if (_useSkin) {
			innerBoxStyle = "none";
			//check the object's mode
			if (this.checked) {
				if (this.disabled) {
					boxStyleClass = STYLE_CLASS_ON_DISABLED;
				}
				else {
					boxStyleClass = STYLE_CLASS_ON;
				}
			}
			else {
				if (this.disabled) {
					boxStyleClass = STYLE_CLASS_OFF_DISABLED;
				}
				else {
					boxStyleClass = STYLE_CLASS_OFF;
				}
			}
		}
		else {
			innerBoxStyle = "block";
			boxStyleClass = STYLE_CLASS_NO_SKIN;
		}
		if (this.innerBoxObj!=null) {
			this.innerBoxObj.style.display = innerBoxStyle;
		}
		this.boxObj.className = boxStyleClass;
	};
	this.skinIsUsed=function() {
		//declare locals
		var attVal = null;
		
		//check for nulls
		if (this.obj==null) {
			return false;
		}
		
		//get the object's attribute
		try {
			attVal = this.obj.getAttribute(ATT_NAME_USE_SKIN);
		} 
		catch (err) {
			return false;
		}
		
		//check for nulls
		if (attVal==null || attVal=='') {
			return false;
		}
		
		//check for a valid value
		try {
			if (attVal.toUpperCase()=="TRUE") {
				return true;
			}
		}
		catch(err) {
			if (attVal==true) {
				return true;
			}
		}
		
		//return the method's value
		return false;
	};
};

function toggleCheckboxMouseover(checkboxId) {
	//declare locals
	var checkboxObj = null;
	
	//check for nulls
	if (checkboxId==null) {
		return;
	}
	
	//create a new object instance
	checkboxObj = new Checkbox(checkboxId);
	
	//invoke the object's method
	checkboxObj.mouseover();
}

function toggleCheckboxMouseout(checkboxId) {
	//declare locals
	var checkboxObj = null;
	
	//check for nulls
	if (checkboxId==null) {
		return;
	}
	
	//create a new object instance
	checkboxObj = new Checkbox(checkboxId);
	
	//invoke the object's method
	checkboxObj.mouseout();
}

function clickCheckbox(checkboxId,click) {
	//declare locals
	var checkboxObj = null;
	var _click = false;
	
	//check for nulls
	if (checkboxId==null) {
		return;
	}
	
	//create a new object instance
	checkboxObj = new Checkbox(checkboxId);
	
	if (click) {
		_click = true;
	}

	//invoke the object's method
	checkboxObj.click(_click);
}

function disableCheckbox(checkboxId,disabled) {
	//declare locals
	var checkboxObj = null;
	
	//check for nulls
	if (checkboxId==null || disabled==null) {
		return;
	}
	
	//create a new object instance
	checkboxObj = new Checkbox(checkboxId);
	
	//invoke the object's method
	checkboxObj.disable(disabled);
}

function resetUncheckedIcon(checkboxId,newIcon) {
	//declare locals
	var checkboxObj = null;
	
	//check for nulls
	if (checkboxId==null || newIcon==null) {
		return;
	}
	
	//create a new object instance
	checkboxObj = new Checkbox(checkboxId);
	
	//invoke the object's method
	checkboxObj.setUncheckedIcon(newIcon);
}

function resetCheckedIcon(checkboxId,newIcon) {
	//declare locals
	var checkboxObj = null;
	
	//check for nulls
	if (checkboxId==null || newIcon==null) {
		return;
	}
	
	//create a new object instance
	checkboxObj = new Checkbox(checkboxId);
	
	//invoke the object's method
	checkboxObj.setCheckedIcon(newIcon);
}

function setCheckboxLabel(checkboxId,newLabel) {
	//declare locals
	var checkboxObj = null;
	
	//check for nulls
	if (checkboxId==null) {
		return;
	}
	
	//create a new object instance
	checkboxObj = new Checkbox(checkboxId);
	
	//invoke the object's method
	checkboxObj.setLabel(newLabel);
}

function setCheckboxTitle(checkboxId,newTitle) {
	//declare locals
	var checkboxObj = null;
	
	//check for nulls
	if (checkboxId==null) {
		return;
	}
	
	//create a new object instance
	checkboxObj = new Checkbox(checkboxId);
	
	//invoke the object's method
	checkboxObj.setTitle(newTitle);
}

function customizeCheckbox(checkboxId,customize) {
	//declare locals
	var checkboxObj = null;
	
	//check for nulls
	if (checkboxId==null || customize==null) {
		return;
	}
	
	//create a new object instance
	checkboxObj = new Checkbox(checkboxId);
	
	//invoke the object's method
	checkboxObj.customize(customize);
}

function resetCheckboxPosition(checkboxId,newPosition) {
	//declare locals
	var checkboxObj = null;
	
	//check for nulls
	if (checkboxId==null || newPosition==null) {
		return;
	}
	
	//create a new object instance
	checkboxObj = new Checkbox(checkboxId);
	
	//invoke the object's method
	checkboxObj.setPosition(newPosition);
}

function skinCheckbox(checkboxId,skinned) {
	//declare locals
	var checkboxObj = null;
	
	//check for nulls
	if (checkboxId==null || skinned==null) {
		return;
	}
	
	//create a new object instance
	checkboxObj = new Checkbox(checkboxId);
	
	//invoke the object's method
	checkboxObj.setSkin(skinned);
}
