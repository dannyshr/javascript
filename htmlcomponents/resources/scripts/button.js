//@C Danny Shraga 2008

function Button(_elementId) {
	//declare locals
	var ATT_NAME_IMAGE = "image";
	var ATT_NAME_IMAGE_DISABLED = "imageDisabled";
	var ATT_NAME_IMAGE_HOVER = "imageHover";
	var ATT_NAME_IMAGE_POSITION = "imagePosition";
	var ATT_NAME_STYLE_CLASS = "styleClass";
	var ATT_NAME_STYLE_CLASS_BACKGROUND = "styleClassBackground";
	var ATT_NAME_STYLE_CLASS_BACKGROUND_DISABLED = "styleClassBackgroundDisabled";
	var ATT_NAME_STYLE_CLASS_BACKGROUND_HOVER = "styleClassBackgroundHover";
	var ATT_NAME_STYLE_CLASS_DISABLED = "styleClassDisabled";
	var ATT_NAME_STYLE_CLASS_HOVER = "styleClassHover";
	var ATT_NAME_STYLE_CLASS_OPAQUE = "styleClassOpaque";
	var ATT_NAME_STYLE_CLASS_TEXT = "styleClassText";
	var ATT_NAME_STYLE_CLASS_TEXT_DISABLED = "styleClassTextDisabled";
	var ATT_NAME_STYLE_CLASS_TEXT_HOVER = "styleClassTextHover";
	var IMAGE_POSITION_BOTTOM = "imagePositionBottom";
	var IMAGE_POSITION_LEFT = "imagePositionLeft";
	var IMAGE_POSITION_RIGHT = "imagePositionRight";
	var IMAGE_POSITION_TOP = "imagePositionTop";
	this.id = _elementId;
	this.buttonId = "btn" + _elementId;
	this.divId = "div" + _elementId;
	this.obj = (document.getElementById(_elementId) ? document.getElementById(_elementId) : null);
	this.disabled = (this.obj==null ? false : this.obj.disabled);
	this.mouseover=function() {
		//declare locals
		var divObj = null;
		var custObj = null;
		var styleClassBg = "";
		var styleClass = "";
		var styleClassHover = "";
		var styleClassText = "";
		var styleClassTextHover = "";
		var image = null;
		var currStyleClass = "";
		
		//check for nulls
		if (this.obj==null || this.disabled || !this.isCustomObject()) {
			return;
		}
		
		//get a reference to the custom object
		divObj = document.getElementById(this.divId);
		custObj = document.getElementById(this.buttonId);

		//get the object's attributes
		styleClassBg = this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BACKGROUND_HOVER);
		styleClass = divObj.getAttribute(ATT_NAME_STYLE_CLASS);
		styleClassHover = divObj.getAttribute(ATT_NAME_STYLE_CLASS_HOVER);
		styleClassText = divObj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT);
		styleClassTextHover = divObj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_HOVER);
		image = divObj.getAttribute(ATT_NAME_IMAGE_HOVER);

		//get the object's current styleClass
		currStyleClass = divObj.className;
		if (currStyleClass==null || currStyleClass=='') {
			currStyleClass = "";
		}

		//get the object's new styleClass
		if (currStyleClass.indexOf(styleClassHover)==-1) {
			currStyleClass = currStyleClass.replace(styleClass,styleClassHover);
		}
		if (currStyleClass.indexOf(styleClassTextHover)==-1) {
			currStyleClass = currStyleClass.replace(styleClassText,styleClassTextHover);
		}
		
		//set the customized object's new image
		if (image!=null && image!='') {
			divObj.style.backgroundImage = "url('" + image + "')";
		}
		
		//set the customized object's new styleClass
		divObj.className = currStyleClass;
		custObj.className = styleClassBg;
	};
	this.mouseout=function() {
		//declare locals
		var divObj = null;
		var custObj = null;
		var styleClassBg = "";
		var styleClass = "";
		var styleClassHover = "";
		var styleClassText = "";
		var styleClassTextHover = "";
		var image = null;
		var currStyleClass = "";
		
		//check for nulls
		if (this.obj==null || this.disabled || !this.isCustomObject()) {
			return;
		}
		
		//get a reference to the custom object
		divObj = document.getElementById(this.divId);
		custObj = document.getElementById(this.buttonId);
		
		//get the object's attributes
		styleClassBg = this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BACKGROUND);
		styleClass = divObj.getAttribute(ATT_NAME_STYLE_CLASS);
		styleClassHover = divObj.getAttribute(ATT_NAME_STYLE_CLASS_HOVER);
		styleClassText = divObj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT);
		styleClassTextHover = divObj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_HOVER);
		image = divObj.getAttribute(ATT_NAME_IMAGE);

		//get the object's current styleClass
		currStyleClass = divObj.className;
		if (currStyleClass==null || currStyleClass=='') {
			currStyleClass = "";
		}

		//get the object's new styleClass
		if (currStyleClass.indexOf(styleClassHover)!=-1) {
			currStyleClass = currStyleClass.replace(styleClassHover,styleClass);
		}
		if (currStyleClass.indexOf(styleClassTextHover)!=-1) {
			currStyleClass = currStyleClass.replace(styleClassTextHover,styleClassText);
		}
		
		//set the customized object's new image
		if (image!=null && image!='') {
			divObj.style.backgroundImage = "url('" + image + "')";
		}
		
		//set the customized object's new styleClass
		divObj.className = currStyleClass;
		custObj.className = styleClassBg;
	};
	this.disable=function(_disabled) {
		//declare locals
		var divObj = null;
		var custObj = null;
		var styleClassBg = "";
		var styleClass = "";
		var styleClassDisabled = "";
		var styleClassText = "";
		var styleClassTextDisabled = "";
		var image = null;
		var currStyleClass = "";
		
		//check for nulls
		if (this.obj==null) {
			return;
		}
		
		//set the object's mode
		this.obj.disabled = _disabled;
		this.disabled = _disabled;
		
		//check for a custom button
		if (!this.isCustomObject()) {
			return;
		}
		
		//get a reference to the custom object
		divObj = document.getElementById(this.divId);
		custObj = document.getElementById(this.buttonId);
		
		//get the object's attributes
		styleClass = divObj.getAttribute(ATT_NAME_STYLE_CLASS);
		styleClassDisabled = divObj.getAttribute(ATT_NAME_STYLE_CLASS_DISABLED);
		styleClassText = divObj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT);
		styleClassTextDisabled = divObj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_DISABLED);

		//get the object's current styleClass
		currStyleClass = divObj.className;
		if (currStyleClass==null || currStyleClass=='') {
			currStyleClass = "";
		}

		//get the object's new styleClass
		if (_disabled) {
			if (currStyleClass.indexOf(styleClassDisabled)==-1) {
				currStyleClass = currStyleClass.replace(styleClass,styleClassDisabled);
			}
			if (currStyleClass.indexOf(styleClassTextDisabled)==-1) {
				currStyleClass = currStyleClass.replace(styleClassText,styleClassTextDisabled);
			}
			styleClassBg = this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BACKGROUND_DISABLED);
			image = divObj.getAttribute(ATT_NAME_IMAGE_DISABLED);
		}
		else {
			if (currStyleClass.indexOf(styleClassDisabled)!=-1) {
				currStyleClass = currStyleClass.replace(styleClassDisabled,styleClass);
			}
			if (currStyleClass.indexOf(styleClassTextDisabled)!=-1) {
				currStyleClass = currStyleClass.replace(styleClassTextDisabled,styleClassText);
			}
			image = divObj.getAttribute(ATT_NAME_IMAGE);
			styleClassBg = this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BACKGROUND);
		}
		
		//set the customized object's new image
		if (image!=null && image!='') {
			divObj.style.backgroundImage = "url('" + image + "')";
		}
		
		//set the customized object's new styleClass
		divObj.className = currStyleClass;
		custObj.className = styleClassBg;
		
		//set the customized object's mode
		custObj.disabled = _disabled;
	};
	this.setPosition=function(_newPosition) {
		//declare locals
		var divObj = null;
		var currPosition = "";
		
		//check for nulls
		if (this.obj==null || _newPosition==null || _newPosition=='') {
			return;
		}
		
		//set the object's attributes
		this.obj.setAttribute(ATT_NAME_IMAGE_POSITION,_newPosition);
		
		//check for a custom object
		if (!this.isCustomObject()) {
			return;
		}
		
		//get a reference to the custom object
		divObj = document.getElementById(this.divId);
		
		//get the object's current styleClass
		currPosition = divObj.className;
		if (currPosition==null || currPosition=='') {
			currPosition = _newPosition;
		}
		
		//set the customized object's new styleClass
		if (currPosition.indexOf(IMAGE_POSITION_BOTTOM)!=-1) {
			currPosition = currPosition.replace(IMAGE_POSITION_BOTTOM,_newPosition);
		}
		else if (currPosition.indexOf(IMAGE_POSITION_LEFT)!=-1) {
			currPosition = currPosition.replace(IMAGE_POSITION_LEFT,_newPosition);
		}
		else if (currPosition.indexOf(IMAGE_POSITION_RIGHT)!=-1) {
			currPosition = currPosition.replace(IMAGE_POSITION_RIGHT,_newPosition);
		}
		else if (currPosition.indexOf(IMAGE_POSITION_TOP)!=-1) {
			currPosition = currPosition.replace(IMAGE_POSITION_TOP,_newPosition);
		}
		divObj.className = currPosition;
	};
	this.setOpacity=function(_opacity) {
		//declare locals
		var divObj = null;
		var currStyleClass = "";
		var styleClassOpaque = null;
		
		//check for nulls
		if (this.obj==null || _opacity==null || !this.isCustomObject()) {
			return;
		}
		
		//get a reference to the custom object
		divObj = document.getElementById(this.divId);
		
		//get the object's attributes
		styleClassOpaque = divObj.getAttribute(ATT_NAME_STYLE_CLASS_OPAQUE);
		
		//get the object's current styleClass
		currStyleClass = divObj.className;
		if (currStyleClass==null || currStyleClass=='') {
			currStyleClass = "";
		}
		
		//get the object's new styleClass
		if (_opacity) {
			if (currStyleClass.indexOf(styleClassOpaque)==-1) {
				currStyleClass = currStyleClass + " " + styleClassOpaque;
			}
		}
		else {
			if (currStyleClass.indexOf(styleClassOpaque)!=-1) {
				currStyleClass = currStyleClass.replace(" " + styleClassOpaque,"");
			}
		}
		
		//set the customized object's new styleClass
		divObj.className = currStyleClass;
	};
	this.setIcon=function(_newIcon) {
		//declare locals
		var divObj = null;
		var image = null;
		var imageDisabled = null;
		var imageHover = null;
		var iconExt = ".gif";
		var newImage = null;
		
		//check for nulls
		if (this.obj==null || _newIcon==null || _newIcon=='') {
			return;
		}
		
		//manipulate the image string
		image = _newIcon;
		if (image.lastIndexOf('.')!=-1) {
			image = image.substr(0,image.lastIndexOf('.'));
		}
		imageDisabled = image+"_dis"+iconExt;
		imageHover = image+"_hover"+iconExt;
		
		//set the object's attributes
		this.obj.setAttribute(ATT_NAME_IMAGE,image+iconExt);
		this.obj.setAttribute(ATT_NAME_IMAGE_DISABLED,imageDisabled);
		this.obj.setAttribute(ATT_NAME_IMAGE_HOVER,imageHover);
		
		//check for a custom object
		if (!this.isCustomObject()) {
			return;
		}
		
		//get a reference to the custom object
		divObj = document.getElementById(this.divId);
		
		//set the custom object's attributes
		divObj.setAttribute(ATT_NAME_IMAGE,image+iconExt);
		divObj.setAttribute(ATT_NAME_IMAGE_DISABLED,imageDisabled);
		divObj.setAttribute(ATT_NAME_IMAGE_HOVER,imageHover);
		
		//get the object's new image
		if (this.disabled) {
			newImage = "url('" + imageDisabled + "')";
		}
		else {
			newImage = "url('" + image+iconExt + "')";
		}
		
		//set the custom object's new image
		divObj.style.backgroundImage = newImage;
	};
	this.setSubmit=function(_submit) {
		//declare locals
		var custObj = null;
		var objType = null;
		
		//check for nulls
		if (this.obj==null || _submit==null) {
			return;
		}
		
		//get the object's new type
		if (_submit) {
			objType = "submit";
		}
		else {
			objType = "button";
		}
		
		//set the object's new type
		try {
			this.obj.setAttribute("type",objType);
		} catch(err) {};
	};
	this.setTitle=function(_title) {
		//declare locals
		var attName = "title";
		var custObj = null;
		
		//check for nulls
		if (this.obj==null) {
			return;
		}
		
		//check if the attribute exists
		if (_title==null || _title=='') {
			//remove the attribute
			try {
				this.obj.removeAttribute(attName);
			} catch(err) {};
		}
		else {
			//set the attribute's value
			try {
				this.obj.setAttribute(attName,_title);
			} catch(err) {};
		}
		
		//check for a custom object
		if (!this.isCustomObject()) {
			return;
		}
		
		//get a reference to the custom object
		custObj = document.getElementById(this.buttonId);
		
		//check if the attribute exists
		if (_title==null || _title=='') {
			//remove the attribute
			try {
				custObj.removeAttribute(attName);
			} catch(err) {};
		}
		else {
			//set the attribute's value
			try {
				custObj.setAttribute(attName,_title);
			} catch(err) {};
		}
	};
	this.customize=function(_customize) {
		//declare locals
		var currStyleClass = "";
		var styleClass = null;
		var styleClassBg = null;
		var styleClassBgDisabled = null;
		var styleClassBgHover = null;
		var styleClassDisabled = null;
		var styleClassHover = null;
		var styleClassOpaque = null;
		var styleClassText = null;
		var styleClassTextDisabled = null;
		var styleClassTextHover = null;
		var styleClasses = null;
		var image = null;
		var imageDisabled = null;
		var imageHover = null;
		var imagePosition = null;
		var divStyle = null;
		var objType = null;
		var custObj = null;
		var DIV = null;
		
		//check for nulls
		if (this.obj==null || _customize==null) {
			return;
		}

		//get the object's atyleClass attributes
		styleClass = this.obj.getAttribute(ATT_NAME_STYLE_CLASS);
		styleClassDisabled = this.obj.getAttribute(ATT_NAME_STYLE_CLASS_DISABLED);
		styleClassHover = this.obj.getAttribute(ATT_NAME_STYLE_CLASS_HOVER);
		styleClassOpaque = this.obj.getAttribute(ATT_NAME_STYLE_CLASS_OPAQUE);
		styleClassText = this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT);
		styleClassTextDisabled = this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_DISABLED);
		styleClassTextHover = this.obj.getAttribute(ATT_NAME_STYLE_CLASS_TEXT_HOVER);
		styleClassBg = this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BACKGROUND);
		styleClassBgDisabled = this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BACKGROUND_DISABLED);
		styleClassBgHover = this.obj.getAttribute(ATT_NAME_STYLE_CLASS_BACKGROUND_HOVER);
		
		//get the object's image
		image = this.obj.getAttribute(ATT_NAME_IMAGE);
		imageDisabled = this.obj.getAttribute(ATT_NAME_IMAGE_DISABLED);
		imageHover = this.obj.getAttribute(ATT_NAME_IMAGE_HOVER);
		imagePosition = this.obj.getAttribute(ATT_NAME_IMAGE_POSITION);
		if (this.obj.disabled) {
			divStyle = "style=\"background-image:url('" + imageDisabled + "')\"";
		}
		else {
			divStyle = "style=\"background-image:url('" + image + "')\"";
		}
		
		//build the styleClass attributes
		styleClasses = " " + ATT_NAME_STYLE_CLASS + "=\"" + styleClass + "\" ";
		styleClasses += ATT_NAME_STYLE_CLASS_DISABLED + "=\"" + styleClassDisabled + "\" ";
		styleClasses += ATT_NAME_STYLE_CLASS_HOVER + "=\"" + styleClassHover + "\" ";
		styleClasses += ATT_NAME_STYLE_CLASS_OPAQUE + "=\"" + styleClassOpaque + "\" ";
		styleClasses += ATT_NAME_STYLE_CLASS_TEXT + "=\"" + styleClassText + "\" ";
		styleClasses += ATT_NAME_STYLE_CLASS_TEXT_DISABLED + "=\"" + styleClassTextDisabled + "\" ";
		styleClasses += ATT_NAME_STYLE_CLASS_TEXT_HOVER + "=\"" + styleClassTextHover + "\" ";
		styleClasses += ATT_NAME_IMAGE + "=\"" + image + "\" ";
		styleClasses += ATT_NAME_IMAGE_DISABLED + "=\"" + imageDisabled + "\" ";
		styleClasses += ATT_NAME_IMAGE_HOVER + "=\"" + imageHover + "\" ";
		styleClasses += ATT_NAME_IMAGE_POSITION + "=\"" + imagePosition + "\" ";
		styleClasses += ATT_NAME_STYLE_CLASS_BACKGROUND + "=\"" + styleClassBg + "\" ";
		styleClasses += ATT_NAME_STYLE_CLASS_BACKGROUND_DISABLED + "=\"" + styleClassBgDisabled + "\" ";
		styleClasses += ATT_NAME_STYLE_CLASS_BACKGROUND_HOVER + "=\"" + styleClassBgHover + "\"";

		//build the custom div
		DIV = "<div id=\"" + this.divId + "\" name=\"" + this.divId + "\"" + divStyle + styleClasses + " class=\"" + styleClass + " " + imagePosition + " " + styleClassText + "\">" + this.obj.value + "</div>";
		
		//get a reference to the custom object
		custObj = document.getElementById(this.buttonId);
		if (custObj==null) {
			//create a new custom object
			custObj = document.createElement("button");
			
			//set the custom object's properties
			custObj.id = this.buttonId;
			custObj.name = this.buttonId;
			try {
				objType = this.obj.getAttribute("type");
				custObj.setAttribute("type",objType);
			} catch(err) {};
			if (this.obj.disabled) {
				custObj.className = styleClassBgDisabled;
			}
			else {
				custObj.className = styleClassBg;
			}
			if (this.obj.getAttribute("title")!=null && this.obj.getAttribute("title")!='') {
				custObj.setAttribute("title",this.obj.getAttribute("title"));
			}
			custObj.onmouseout = new Function("toggleButtonModeMouseout('" + this.id + "');");
			custObj.onmouseover = new Function("toggleButtonModeMouseover('" + this.id + "');");
			custObj.onclick = new Function("return clickCustomObject('" + this.id + "');");
			custObj.innerHTML = DIV;
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
				this.obj.parentNode.removeChild(custObj);
			}
			this.obj.style.display = "block";
		}
		
		//set the customized object's attributes
		if (this.obj.disabled) {
			this.disable(true);
		}
	};
	this.isCustomObject=function() {
		//declare locals
		var divObj = null;
		
		//check for nulls
		if (this.obj==null) {
			return false;
		}
		
		//get elements by their ids
		divObj = document.getElementById(this.divId);
		
		//check for nulls
		if (divObj==null) {
			return false;
		}
		else {
			return true;
		}
	};
};

function toggleButtonModeMouseover(buttonId) {
	//declare locals
	var buttonObj = null;
	
	//check for nulls
	if (buttonId==null) {
		return;
	}
	
	//create a new object instance
	buttonObj = new Button(buttonId);
	
	//invoke the object's method
	buttonObj.mouseover();
}

function toggleButtonModeMouseout(buttonId) {
	//declare locals
	var buttonObj = null;
	
	//check for nulls
	if (buttonId==null) {
		return;
	}
	
	//create a new object instance
	buttonObj = new Button(buttonId);
	
	//invoke the object's method
	buttonObj.mouseout();
}

function disableButton(buttonId,disabled) {
	//declare locals
	var buttonObj = null;
	
	//check for nulls
	if (buttonId==null) {
		return;
	}
	
	//create a new object instance
	buttonObj = new Button(buttonId);
	
	//invoke the object's method
	buttonObj.disable(disabled);
}

function resetImagePosition(buttonId,newPosition) {
	//declare locals
	var buttonObj = null;
	
	//check for nulls
	if (buttonId==null || newPosition==null) {
		return;
	}
	
	//create a new object instance
	buttonObj = new Button(buttonId);
	
	//invoke the object's method
	buttonObj.setPosition(newPosition);
}

function resetButtonIcon(buttonId,newIcon) {
	//declare locals
	var buttonObj = null;
	
	//check for nulls
	if (buttonId==null || newIcon==null) {
		return;
	}
	
	//create a new object instance
	buttonObj = new Button(buttonId);
	
	//invoke the object's method
	buttonObj.setIcon(newIcon);
}

function customizeButton(buttonId,customize) {
	//declare locals
	var buttonObj = null;
	
	//check for nulls
	if (buttonId==null || customize==null) {
		return;
	}
	
	//create a new object instance
	buttonObj = new Button(buttonId);
	
	//invoke the object's method
	buttonObj.customize(customize);
}

function toggleButtonOpacity(buttonId,opacity) {
	//declare locals
	var buttonObj = null;
	
	//check for nulls
	if (buttonId==null || opacity==null) {
		return;
	}
	
	//create a new object instance
	buttonObj = new Button(buttonId);
	
	//invoke the object's method
	buttonObj.setOpacity(opacity);
}

function setButtonTitle(buttonId,newTitle) {
	//declare locals
	var buttonObj = null;
	
	//check for nulls
	if (buttonId==null) {
		return;
	}
	
	//create a new object instance
	buttonObj = new Button(buttonId);
	
	//invoke the object's method
	buttonObj.setTitle(newTitle);
}

function clickCustomObject(buttonId) {
	//declare locals
	var buttonObj = null;
	var retVal = false;
	
	//check for nulls
	if (buttonId==null) {
		return false;
	}
	
	//get elements by their ids
	buttonObj = document.getElementById(buttonId);
	
	//check for nulls
	if (buttonObj==null) {
		return false;
	}
	
	//click the button
	retVal = buttonObj.click();
	
	//return the method's value
	return retVal;
}

function toggleButtonSubmit(buttonId,submitMode) {
	//declare locals
	var buttonObj = null;
	
	//check for nulls
	if (buttonId==null || submitMode==null) {
		return;
	}
	
	//create a new object instance
	buttonObj = new Button(buttonId);
	
	//invoke the object's method
	buttonObj.setSubmit(submitMode);
}
