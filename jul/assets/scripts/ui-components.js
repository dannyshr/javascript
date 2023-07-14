/*! ui-components.js v1.0.0 | a javascript to render HTML tags | (c) Danny Shraga 2023 */
function Tag(config) {
    //declare global module variables
    let _config = {
        tagName: null,
        renderTo: null,
        children: null,
    };

    this._init = function (config) {
        //check for valid values
        if (utils.isJson(config)) {
            //loop through the items
            for (let field in config) {
                if (config.hasOwnProperty(field)) {
                    _config[field] = config[field];
                }
            }
        }
    };

    this._getDefaultClass = function() {
        //declare locals
        let retVal = "";

        //return the method's value
        return retVal;
    };

    this._getClass = function() {
        //declare locals
        let retVal = jsonUtils.getValue(_config, "class", "");

        //return the method's value
        return retVal;
    };

    this._getCss = function() {
        //declare locals
        let defaultClass = this._getDefaultClass();
        let elementClass = this._getClass();
        if (utils.isEmpty(defaultClass)) {
            defaultClass = "#" + this.getId();
        }
        else {
            if (!defaultClass.startsWith(".")) {
                defaultClass = "." + defaultClass;
            }
        }
        if (utils.isEmpty(elementClass)) {
            elementClass = "#" + this.getId();
        }
        else {
            if (!elementClass.startsWith(".")) {
                elementClass = "." + elementClass;
            }
        }
        let jsonCss = [
            {
                "cssSelector": defaultClass,
            },
        ];

        //check for a css in the configuration
        if (_config.hasOwnProperty("css")) {
            if (!utils.isArray(_config.css)) {
                _config.css = [_config.css];
            }
            _config.css[0]["cssSelector"] = elementClass;
            //add the css configuration to the returned css array
            for (let i=0; i<_config.css.length; i++) {
                jsonCss.push(_config.css[i]);
            }
        }

        //return the method's value
        return jsonCss;
    };

    this.getConfig = function() {
        //return the method's value
        return _config;
    };

    this.getId = function() {
        //declare locals
        let idPrefix = "";
        let retVal = domUtils.getElementId(_config, _config.tagName, idPrefix);

        //return the method's value
        return retVal;
    };

    this.render = function() {
        //declare locals
        let methodName = "Tag.render(): ";
        let logMessage;
        let containerId;
        let container;
        let tagId = this.getId();
        _config["id"] = tagId;
        let tagClass = this._getClass();
        let currClassName;
        let cssTagId = domUtils.getCssTagId(_config);

        //set the container
        containerId = _config.renderTo;
        if (utils.isEmpty(containerId) || containerId==="body") {
            container = document.getElementsByTagName("body")[0];
        }
        else {
            if (!utils.isInDom(containerId)) {
                logMessage = "containerId=[" + containerId + "] is NOT in DOM !!";
                console.error(methodName + logMessage);
                return;
            }
            container = utils.getFromDom(containerId);
        }

        //check for valid values
        if (container==null || container==undefined || container=="undefined") {
            logMessage = "container is null !!";
            console.error(methodName + logMessage);
            return;
        }

        //render the component's css
        let jsonCss = this._getCss();
        html5Utils.renderCss(jsonCss, cssTagId);

        //render dialog HTML node
        let tagNode = document.createElement(_config.tagName);
        html5Utils.setNodeAttributes(tagNode, _config.tagName, _config, null);
        tagNode.setAttribute("id", tagId);
        currClassName = this._getDefaultClass() + " " + tagClass;
        currClassName = currClassName.trim();
        tagNode.setAttribute("class", currClassName);

        //append the element to the container
        container.appendChild(tagNode);

        //render child elements
        html5Utils.renderChildren(_config.children, tagId, cssTagId);
    };

    //invoke the _init method
    if (config!=null && utils.isJson(config)) {
        this._init(config);
    }
    else {
        this._init(_config);
    }
};
function Row(config) {
    //declare global module variables
    let _config = {
        renderTo: null,
        children: null,
    };
    let tagName = "div";

    this._init = function (config) {
        //check for valid values
        if (utils.isJson(config)) {
            //loop through the items
            for (let field in config) {
                if (config.hasOwnProperty(field)) {
                    _config[field] = config[field];
                }
            }
        }
    };

    this._getDefaultRowClass = function() {
        //declare locals
        let retVal = "row";

        //return the method's value
        return retVal;
    };

    this._getRowClass = function() {
        //declare locals
        let retVal = jsonUtils.getValue(_config, "class", "");

        //return the method's value
        return retVal;
    };

    this._getRowCss = function() {
        //declare locals
        let defaultClass = this._getDefaultRowClass();
        let elementClass = this._getRowClass();
        let jsonCss = [
            {
                "cssSelector": "." + defaultClass,
                "float": "none",
                "margin-left": "0px",
                "margin-right": "0px",
            },
        ];

        //check for a css in the configuration
        if (_config.hasOwnProperty("css")) {
            if (!utils.isArray(_config.css)) {
                _config.css = [_config.css];
            }
            _config.css[0]["cssSelector"] = "." + elementClass;
            //add the css configuration to the returned css array
            for (let i=0; i<_config.css.length; i++) {
                jsonCss.push(_config.css[i]);
            }
        }

        //return the method's value
        return jsonCss;
    };

    this.getConfig = function() {
        //return the method's value
        return _config;
    };

    this.getId = function() {
        //declare locals
        let idPrefix = "row";
        let retVal = domUtils.getElementId(_config, tagName, idPrefix);

        //return the method's value
        return retVal;
    };

    this.render = function() {
        //declare locals
        let methodName = "Row.render(): ";
        let logMessage;
        let containerId;
        let container;
        let rowId = this.getId();
        _config["id"] = rowId;
        let rowClass = this._getRowClass();
        let currClassName;
        let cssTagId = domUtils.getCssTagId(_config);

        //set the container
        containerId = _config.renderTo;
        if (utils.isEmpty(containerId) || containerId==="body") {
            container = document.getElementsByTagName("body")[0];
        }
        else {
            if (!utils.isInDom(containerId)) {
                logMessage = "containerId=[" + containerId + "] is NOT in DOM !!";
                console.error(methodName + logMessage);
                return;
            }
            container = utils.getFromDom(containerId);
        }

        //check for valid values
        if (container==null || container==undefined || container=="undefined") {
            logMessage = "container is null !!";
            console.error(methodName + logMessage);
            return;
        }

        //render the component's css
        let jsonCss = this._getRowCss();
        html5Utils.renderCss(jsonCss, cssTagId);

        //render dialog HTML node
        let rowNode = document.createElement("div");
        html5Utils.setNodeAttributes(rowNode, tagName, _config, null);
        rowNode.setAttribute("id", rowId);
        currClassName = this._getDefaultRowClass() + " " + rowClass;
        currClassName = currClassName.trim();
        rowNode.setAttribute("class", currClassName);

        //append the element to the container
        container.appendChild(rowNode);

        //render child elements
        html5Utils.renderChildren(_config.children, rowId, cssTagId);
    };

    //invoke the _init method
    if (config!=null && utils.isJson(config)) {
        this._init(config);
    }
    else {
        this._init(_config);
    }
};
function Col(config) {
    //declare global module variables
    let _config = {
        renderTo: null,
        children: null,
    };
    let tagName = "div";

    this._init = function (config) {
        //check for valid values
        if (utils.isJson(config)) {
            //loop through the items
            for (let field in config) {
                if (config.hasOwnProperty(field)) {
                    _config[field] = config[field];
                }
            }
        }
    };

    this._getDefaultColClass = function() {
        //declare locals
        let retVal = "col";

        //return the method's value
        return retVal;
    };

    this._getColClass = function() {
        //declare locals
        let retVal = jsonUtils.getValue(_config, "class", "");

        //return the method's value
        return retVal;
    };

    this._getColCss = function() {
        //declare locals
        let defaultClass = this._getDefaultColClass();
        let elementClass = this._getColClass();
        let jsonCss = [
            {
                "cssSelector": "." + defaultClass,
                "float": "left",
            },
        ];

        //check for a css in the configuration
        if (_config.hasOwnProperty("css")) {
            if (!utils.isArray(_config.css)) {
                _config.css = [_config.css];
            }
            _config.css[0]["cssSelector"] = "." + elementClass;
            //add the css configuration to the returned css array
            for (let i=0; i<_config.css.length; i++) {
                jsonCss.push(_config.css[i]);
            }
        }

        //return the method's value
        return jsonCss;
    };

    this.getConfig = function() {
        //return the method's value
        return _config;
    };

    this.getId = function() {
        //declare locals
        let idPrefix = "col";
        let retVal = domUtils.getElementId(_config, tagName, idPrefix);

        //return the method's value
        return retVal;
    };

    this.render = function() {
        //declare locals
        let methodName = "Col.render(): ";
        let logMessage;
        let containerId;
        let container;
        let colId = this.getId();
        _config["id"] = colId;
        let colClass = this._getColClass();
        let currClassName;
        let cssTagId = domUtils.getCssTagId(_config);

        //set the container
        containerId = _config.renderTo;
        if (utils.isEmpty(containerId) || containerId==="body") {
            container = document.getElementsByTagName("body")[0];
        }
        else {
            if (!utils.isInDom(containerId)) {
                logMessage = "containerId=[" + containerId + "] is NOT in DOM !!";
                console.error(methodName + logMessage);
                return;
            }
            container = utils.getFromDom(containerId);
        }

        //check for valid values
        if (container==null || container==undefined || container=="undefined") {
            logMessage = "container is null !!";
            console.error(methodName + logMessage);
            return;
        }

        //render the component's css
        let jsonCss = this._getColCss();
        html5Utils.renderCss(jsonCss, cssTagId);

        //render dialog HTML node
        let colNode = document.createElement("div");
        html5Utils.setNodeAttributes(colNode, tagName, _config, null);
        colNode.setAttribute("id", colId);
        currClassName = this._getDefaultColClass() + " " + colClass;
        currClassName = currClassName.trim();
        colNode.setAttribute("class", currClassName);

        //append the element to the container
        container.appendChild(colNode);

        //render child elements
        html5Utils.renderChildren(_config.children, colId, cssTagId);
    };

    //invoke the _init method
    if (config!=null && utils.isJson(config)) {
        this._init(config);
    }
    else {
        this._init(_config);
    }
};
function Loader(config) {
    //declare global module variables
    let _config = {
        renderTo: null,
        loader: {id: "loader", class: "loader"},
        uiBlocker: {id: "uiBlocker", class: "uiBlocker"},
    };
    let tagName = "div";

    this._init = function(config) {
        //check for valid values
        if (utils.isJson(config)) {
            //loop through the items
            for (let field in config) {
                if (config.hasOwnProperty(field)) {
                    _config[field] = config[field];
                }
            }
        }
    };

    this._getLoaderId = function() {
        //declare locals
        let idPrefix = "loader";
        let retVal = domUtils.getElementId(_config.loader, tagName, idPrefix);

        //return the method's value
        return retVal;
    };

    this._getUiBlockerId = function() {
        //declare locals
        let idPrefix = "uiBlocker";
        let retVal = domUtils.getElementId(_config.uiBlocker, tagName, idPrefix);

        //return the method's value
        return retVal;
    };

    this._getDefaultLoaderClass = function() {
        //declare locals
        let retVal = "loader";

        //return the method's value
        return retVal;
    };

    this._getLoaderClass = function() {
        //declare locals
        let retVal = jsonUtils.getValue(_config.loader, "class", "");

        //return the method's value
        return retVal;
    };

    this._getDefaultUiBlockerClass = function() {
        //declare locals
        let retVal = "uiBlocker";

        //return the method's value
        return retVal;
    };

    this._getUiBlockerClass = function() {
        //declare locals
        let retVal = jsonUtils.getValue(_config.uiBlocker, "class", "");

        //return the method's value
        return retVal;
    };

    this._getCss = function() {
        //declare locals
        let defaultLoaderClass = this._getDefaultLoaderClass();
        let defaultUiBlockerClass = this._getDefaultUiBlockerClass();
        let loaderClass = this._getLoaderClass();
        let uiBlockerClass = this._getUiBlockerClass();
        let jsonCss = [
            { "cssSelector": ".MuiCircularProgress-root","display": "inline-block","-ms-overflow-x": "hidden","-ms-overflow-y": "hidden" },
            { "cssSelector": ".MuiCircularProgress-static","transition": "transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms" },
            { "cssSelector": ".MuiCircularProgress-indeterminate","animation": "MuiCircularProgress-keyframes-circular-rotate 1.4s linear infinite" },
            { "cssSelector": ".MuiCircularProgress-determinate","transition": "transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms" },
            { "cssSelector": ".MuiCircularProgress-colorPrimary","color": "#003f80" },
            { "cssSelector": ".MuiCircularProgress-colorSecondary","color": "#006cb2" },
            { "cssSelector": ".MuiCircularProgress-svg","display": "block" },
            { "cssSelector": ".MuiCircularProgress-circle","stroke": "currentColor" },
            { "cssSelector": ".MuiCircularProgress-circleStatic","transition": "stroke-dashoffset 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms" },
            {
                "cssSelector": ".MuiCircularProgress-circleIndeterminate",
                "animation": "MuiCircularProgress-keyframes-circular-dash 1.4s ease-in-out infinite",
                "stroke-dasharray": "80px, 200px",
                "stroke-dashoffset": "0px"
            },
            { "cssSelector": ".MuiCircularProgress-circleDeterminate","transition": "stroke-dashoffset 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms" },
            {
                "cssSelector": "@-webkit-keyframes MuiCircularProgress-keyframes-circular-rotate",
                "0%": "{ transform-origin: 50% 50%; }",
                "100%": "{ transform: rotate(360deg); }"
            },
            {
                "cssSelector": "@-webkit-keyframes MuiCircularProgress-keyframes-circular-dash",
                "0%": "{ stroke-dasharray: 1px, 200px; stroke-dashoffset: 0px; }",
                "50%": "{ stroke-dasharray: 100px, 200px; stroke-dashoffset: -15px; }",
                "100%": "{ stroke-dasharray: 100px, 200px; stroke-dashoffset: -125px; }"
            },
            { "cssSelector": ".MuiCircularProgress-circleDisableShrink","animation": "none" },
        ];
        let defaultUiBlockerCss = {
            "cssSelector": "." + defaultUiBlockerClass,
            "height": "100%",
            "width": "100%",
            "overflow-y": "hidden",
            "overflow-x": "hidden",
            "border": "1px solid transparent",
            "background-color": "darkgray",
            "padding-left": "10px",
            "padding-top": "10px",
            "opacity": "0.5",
            "position": "absolute",
            "top": "0px",
            "left": "0px",
            "display": "block",
            "z-index": "998",
        };
        let defaultLoaderCss = {
            "cssSelector": "." + defaultLoaderClass,
            "width": "200px",
            "height": "200px",
            "border": "1px solid transparent",
            "border-radius": "20px",
            "background-color": "white",
            "position": "absolute",
            "display": "block",
            "z-index": "999",
            "font-size": "30px",
            "white-space": "nowrap",
        };
        jsonCss.push(defaultUiBlockerCss);
        jsonCss.push(defaultLoaderCss);

        //check for a css in the configuration
        if (_config.hasOwnProperty("loader")) {
            if (_config.loader.hasOwnProperty("css")) {
                if (!utils.isArray(_config.loader.css)) {
                    _config.loader.css = [_config.loader.css];
                }
                _config.loader.css[0]["cssSelector"] = "." + loaderClass;
                //add the css configuration to the returned css array
                for (let i = 0; i < _config.loader.css.length; i++) {
                    jsonCss.push(_config.loader.css[i]);
                }
            }
        }
        if (_config.hasOwnProperty("uiBlocker")) {
            if (_config.uiBlocker.hasOwnProperty("css")) {
                if (!utils.isArray(_config.uiBlocker.css)) {
                    _config.uiBlocker.css = [_config.uiBlocker.css];
                }
                _config.uiBlocker.css[0]["cssSelector"] = "." + uiBlockerClass;
                //add the css configuration to the returned css array
                for (let i = 0; i < _config.uiBlocker.css.length; i++) {
                    jsonCss.push(_config.uiBlocker.css[i]);
                }
            }
        }

        //return the method's value
        return jsonCss;
    };

    this.getConfig = function() {
        //return the method's value
        return _config;
    };

    this.geId = function() {
        //return the method's value
        return this._getLoaderId();
    };

    this.show = function() {
        //declare locals
        let loaderId = this._getLoaderId();
        let uiBlockerId = this._getUiBlockerId();

        //check for valid values
        if (utils.isInDom(uiBlockerId)) {
            let uiblockerElem = document.getElementById(uiBlockerId);
            uiblockerElem.style.display = "block";
        }
        if (utils.isInDom(loaderId)) {
            let loaderElem = document.getElementById(loaderId);
            loaderElem.style.display = "block";
        }
    };

    this.hide = function() {
        //declare locals
        let loaderId = this._getLoaderId();
        let uiBlockerId = this._getUiBlockerId();

        //check for valid values
        if (utils.isInDom(loaderId)) {
            let loaderElem = document.getElementById(loaderId);
            loaderElem.style.display = "none";
        }
        if (utils.isInDom(uiBlockerId)) {
            let uiblockerElem = document.getElementById(uiBlockerId);
            uiblockerElem.style.display = "none";
        }
    };

    this.render = function() {
        //declare locals
        let methodName = "Loader.render(): ";
        let logMessage;
        let containerId;
        let container;
        let loaderId = this._getLoaderId();
        _config.id = loaderId;
        let uiBlockerId = this._getUiBlockerId();
        let cssTagId = domUtils.getCssTagId(_config);
        let html = "";

        //set the container
        containerId = _config.renderTo;
        if (utils.isEmpty(containerId) || containerId==="body") {
            container = document.getElementsByTagName("body")[0];
        }
        else {
            if (!utils.isInDom(containerId)) {
                logMessage = "containerId=[" + containerId + "] is NOT in DOM !!";
                console.error(methodName + logMessage);
                return;
            }
            container = utils.getFromDom(containerId);
        }

        //check for valid values
        if (container==null || container==undefined || container=="undefined") {
            logMessage = "container is null !!";
            console.error(methodName + logMessage);
            return;
        }

        //render the component's css
        let jsonCss = this._getCss();
        html5Utils.renderCss(jsonCss, cssTagId);

        //render the html
        html += '<div class="MuiCircularProgress-root MuiCircularProgress-colorPrimary MuiCircularProgress-indeterminate" role="progressbar" style="width: 100px; height: 100px;margin: 50px;">';
        html += '<svg class="MuiCircularProgress-svg" viewBox="22 22 44 44">';
        html += '<circle class="MuiCircularProgress-circle MuiCircularProgress-circleIndeterminate" cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6"></circle>';
        html += '</svg>';
        html += '</div>';

        //create two new nodes
        let uiBlockerNode = document.createElement(tagName);
        let loaderNode = document.createElement(tagName);
        let currClassName;

        //set the node's attributes
        html5Utils.setNodeAttributes(uiBlockerNode, tagName, _config.uiBlocker, null);
        html5Utils.setNodeAttributes(loaderNode, tagName, _config.loader, null);

        //set required attributes
        uiBlockerNode.setAttribute("id", uiBlockerId);
        uiBlockerNode.setAttribute("name", uiBlockerId);
        currClassName = this._getDefaultUiBlockerClass() + " " + this._getUiBlockerClass();
        currClassName = currClassName.trim();
        uiBlockerNode.setAttribute("class", currClassName);
        loaderNode.setAttribute("id", loaderId);
        loaderNode.setAttribute("name", loaderId);
        currClassName = this._getDefaultLoaderClass() + " " + this._getLoaderClass();
        currClassName = currClassName.trim();
        loaderNode.setAttribute("class", currClassName);

        //render the nodes' html
        loaderNode.innerHTML = html;
        uiBlockerNode.appendChild(loaderNode);
        this.hide();
        container.appendChild(uiBlockerNode);
    };

    //invoke the _init method
    if (config!=null && utils.isJson(config)) {
        this._init(config);
    }
    else {
        this._init(_config);
    }
};
function InputText(config) {
    //declare global module variables
    let _config = {
        renderTo: null,
        size: "medium",
        type:"text",
        class:"inputText",
        errorClass:"inputTextError",
        error: {class:"inputErrorContainer"},
    };
    let inputTagName = "input";
    let errorTagName = "div";

    this._init = function (config) {
        //check for valid values
        if (utils.isJson(config)) {
            //loop through the items
            for (let field in config) {
                if (config.hasOwnProperty(field)) {
                    _config[field] = config[field];
                }
            }
        }
    };

    this._getInputId = function() {
        //declare locals
        let idPrefix = "txt";
        let retVal = domUtils.getElementId(_config, inputTagName, idPrefix);

        //return the method's value
        return retVal;
    };

    this._getDefaultInputClass = function() {
        //declare locals
        let retVal = "inputText";

        //return the method's value
        return retVal;
    };

    this._getInputClass = function() {
        //declare locals
        let retVal = jsonUtils.getValue(_config, "class", "");

        //return the method's value
        return retVal;
    };

    this.getErrorClass = function() {
        //declare locals
        let defaultValue = "inputError";
        let retVal = jsonUtils.getValue(_config, "errorClass", defaultValue);

        //return the method's value
        return retVal;
    };

    this._getDefaultErrorContainerClass = function() {
        //declare locals
        let retVal = "inputErrorContainer";

        //return the method's value
        return retVal;
    };

    this._getErrorContainerClass = function() {
        //declare locals
        let retVal = jsonUtils.getValue(_config.error, "class", "");

        //return the method's value
        return retVal;
    };

    this._getInputCss = function() {
        //declare locals
        let defaultInputClass = this._getDefaultInputClass();
        let inputClass = this._getInputClass();
        let errorClass = this.getErrorClass();
        let jsonCss = [
            {
                "cssSelector": "." + defaultInputClass + ", ." + defaultInputClass + ":focus, ." + errorClass + ", ." + errorClass + ":focus",
                "height": "50px",
                "padding-left": "10px",
                "direction": "ltr",
                "font-size": "18px",
                "font-weight": "400",
                "text-align": "left",
                "border-left": "none",
                "border-right": "none",
                "border-top": "none",
                "outline": "0px none",
                "border-top-left-radius": "10px",
                "border-top-right-radius": "10px",
                "background-color": "rgba(0,0,0,0.06)",
            },
            { "cssSelector": "." + defaultInputClass + "\"","border-bottom": "1px solid #666666","color": "rgba(0,0,0,0.87)" },
            { "cssSelector": "." + defaultInputClass + ":focus","border-bottom": "2px solid #0000ff","box-shadow": "5px 5px 10px #000000" },
            { "cssSelector": "." + errorClass + ", ." + errorClass + ":focus","border-bottom": "1px solid #ff0000","color": "#ff0000" },
            { "cssSelector": "." + errorClass + ":focus","border-bottom": "2px solid #ff0000" },
            { "cssSelector": "." + defaultInputClass + "Small","width": "100px" },
            { "cssSelector": "." + defaultInputClass + "Medium","width": "200px" },
            { "cssSelector": "." + defaultInputClass + "Wide","width": "380px" },
        ];

        //check for a css in the configuration
        if (_config.hasOwnProperty("css")) {
            if (!utils.isArray(_config.css)) {
                _config.css = [_config.css];
            }
            _config.css[0]["cssSelector"] = "." + inputClass;
            //add the css configuration to the returned css array
            for (let i=0; i<_config.css.length; i++) {
                jsonCss.push(_config.css[i]);
            }
        }

        //return the method's value
        return jsonCss;
    };

    this._getErrorCss = function() {
        //declare locals
        let defaultErrorContainerClass = this._getDefaultErrorContainerClass();
        let errorContainerClass = this._getErrorContainerClass();
        let jsonCss = [
            {
                "cssSelector": "." + defaultErrorContainerClass,
                "height": "30px",
                "padding-top": "5px",
                "padding-left": "0px",
                "display": "block",
                "visibility": "hidden",
                "border": "1px solid transparent",
                "color": "red",
                "font-weight": "normal",
                "font-size": "16px",
                "text-align": "center",
            }
        ];

        //check for a css in the configuration
        if (_config.hasOwnProperty("error")) {
            if (_config.error.hasOwnProperty("css")) {
                if (!utils.isArray(_config.error.css)) {
                    _config.error.css = [_config.error.css];
                }
                _config.css[0]["cssSelector"] = "." + errorContainerClass;
                //add the css configuration to the returned css array
                for (let i = 0; i < _config.error.css.length; i++) {
                    jsonCss.push(_config.error.css[i]);
                }
            }
        }

        //return the method's value
        return jsonCss;
    };

    this.getConfig = function() {
        //return the method's value
        return _config;
    };

    this.geId = function() {
        //return the method's value
        return this._getInputId();
    };

    this.getErrorId = function() {
        //declare locals
        let idSuffix = "_Error";
        let inputId = this._getInputId();
        let retVal = inputId + idSuffix;

        //return the method's value
        return retVal;
    };

    this.render = function() {
        //declare locals
        let methodName = "InputText.render(): ";
        let logMessage;
        let containerId;
        let container;
        let inputSizeClass = null;
        let inputId = this._getInputId();
        _config.id = inputId;
        let errorId = this.getErrorId();
        let inputClass = this._getInputClass();
        let errorContainerClass = this._getErrorContainerClass();
        let cssTagId = domUtils.getCssTagId(_config);
        let errorClass = this.getErrorClass();

        //set the container
        containerId = _config.renderTo;
        if (utils.isEmpty(containerId) || containerId==="body") {
            container = document.getElementsByTagName("body")[0];
        }
        else {
            if (!utils.isInDom(containerId)) {
                logMessage = "containerId=[" + containerId + "] is NOT in DOM !!";
                console.error(methodName + logMessage);
                return;
            }
            container = utils.getFromDom(containerId);
        }

        //check for valid values
        if (container==null || container==undefined || container=="undefined") {
            logMessage = "container is null !!";
            console.error(methodName + logMessage);
            return;
        }

        //render the component's css
        let inputCss = this._getInputCss();
        let errorCss = this._getErrorCss();
        html5Utils.renderCss(inputCss, cssTagId);
        html5Utils.renderCss(errorCss, cssTagId);

        //set defaults if necessary
        let inputType = jsonUtils.getValue(_config, "type", "text");
        let inputSize = jsonUtils.getValue(_config, "size", "medium");

        //set the element's class
        if (inputSize.toLowerCase()==="small") {
            inputSizeClass = inputClass + "Small";
        }
        else if (inputSize.toLowerCase()==="medium") {
            inputSizeClass = inputClass + "Medium";
        }
        else if (inputSize.toLowerCase()==="wide") {
            inputSizeClass = inputClass + "Wide";
        }
        else {
            inputSizeClass = inputClass + "Medium";
        }

        //create new elements
        let wrapperNode = document.createElement("div");
        let inputNode = document.createElement(inputTagName);
        let errorContainerNode = document.createElement(errorTagName);
        let currClassName;

        //render all other attributes
        html5Utils.setNodeAttributes(inputNode, inputTagName, _config, null);
        html5Utils.setNodeAttributes(errorContainerNode, errorTagName, _config.error, null);

        //set the element's attributes
        inputNode.setAttribute("id", inputId);
        inputNode.setAttribute("name", inputId);
        inputNode.setAttribute("type", inputType);
        currClassName = this._getDefaultInputClass();
        if (!utils.isEmpty(inputClass)) {
            currClassName += " " + inputClass;
        }
        if (!utils.isEmpty(inputSizeClass)) {
            currClassName += " " + inputSizeClass;
        }
        currClassName = currClassName.trim();
        inputNode.setAttribute("class", currClassName);
        inputNode.setAttribute("aria-describedby", errorId);
        domUtils.setErrorId(inputNode, errorId);
        domUtils.setErrorClass(inputNode, errorClass);

        errorContainerNode.setAttribute("id", errorId);
        currClassName = this._getDefaultErrorContainerClass() + " " + errorContainerClass;
        currClassName = currClassName.trim();
        errorContainerNode.setAttribute("class", currClassName);

        //append the elements to the container
        wrapperNode.appendChild(inputNode);
        container.appendChild(wrapperNode);
        container.appendChild(errorContainerNode);
    };

    this.setError = function(errorMessage) {
        //declare locals
        let inputId = this._getInputId();
        let errorId = this.getErrorId();
        let errorClass = this.getErrorClass();

        //check for valid values
        if (utils.isInDom(inputId)) {
            //set the elem's class
            let allClasses = utils.getFromDom(inputId).getAttribute("class");
            let arrClasses = utils.string2array(allClasses, " ");
            if (!utils.isInArray(errorClass, arrClasses)) {
                allClasses += " " + errorClass;
                utils.getFromDom(inputId).setAttribute("class", allClasses);
            }
            if (utils.isInDom(errorId)) {
                utils.getFromDom(errorId).innerHTML = errorMessage;
                utils.getFromDom(errorId).style.display = "block";
                utils.getFromDom(errorId).style.visibility = "visible";
            }
        }
    };

    this.clearError = function() {
        //declare locals
        let inputId = this._getInputId();
        let errorId = this.getErrorId();
        let errorClass = this.getErrorClass();

        //check for valid values
        if (utils.isInDom(inputId)) {
            //set the elem's class
            let allClasses = utils.getFromDom(inputId).getAttribute("class");
            let arrClasses = utils.string2array(allClasses, " ");
            if (utils.isInArray(errorClass, arrClasses)) {
                let index = utils.indexOf(errorClass, arrClasses);
                let arrNew = [];
                for (let i=0; i<arrClasses.length; i++) {
                    if (i!=index) {
                        arrNew.push(arrClasses[i]);
                    }
                }
                allClasses = utils.array2string(arrNew, " ");
                utils.getFromDom(inputId).setAttribute("class", allClasses);
            }
            if (utils.isInDom(errorId)) {
                utils.getFromDom(errorId).innerHTML = "";
                utils.getFromDom(errorId).style.display = "block";
                utils.getFromDom(errorId).style.visibility = "hidden";
            }
        }
    };

    //invoke the _init method
    if (config!=null && utils.isJson(config)) {
        this._init(config);
    }
    else {
        this._init(_config);
    }
};
function Dialog(config) {
    //declare global module variables
    let _config = {
        renderTo: null,
        movable: true,
        closeable: true,
        closeButton: {tagName: "div", text: "x", children: null},
        header: {tagName: "div", text: "Header", children: null},
        body: {tagName: "div", text: "Body", children: null},
        footer: {tagName: "div", text: "Footer", children: null},
    };
    let tagName = "div";

    this._init = function (config) {
        //check for valid values
        if (utils.isJson(config)) {
            //loop through the items
            for (let field in config) {
                if (config.hasOwnProperty(field)) {
                    _config[field] = config[field];
                }
            }
        }
    };

    this._getDialogId = function() {
        //declare locals
        let idPrefix = "dialog";
        let retVal = domUtils.getElementId(_config, tagName, idPrefix);

        //return the method's value
        return retVal;
    };

    this._getDefaultDialogClass = function() {
        //declare locals
        let retVal = "dialog";

        //return the method's value
        return retVal;
    };

    this._getDialogClass = function() {
        //declare locals
        let retVal = jsonUtils.getValue(_config, "class", "");

        //return the method's value
        return retVal;
    };

    this._getDialogCss = function() {
        //declare locals
        let defaultClass = this._getDefaultDialogClass();
        let elementClass = this._getDialogClass();
        let jsonCss = [
            {
                "cssSelector": "." + defaultClass,
                "display": "block",
                "position": "absolute",
                "top": "0px",
                "left": "0px",
                "border": "1px solid transparent",
                "background-color": "#ffffff",
                "box-shadow": "5px 5px 20px #666666",
                "border-radius": "30px",
            },
            {
                "cssSelector": ".verticalSpacer",
                "width": "100%",
                "height": "10px",
                "float": "none",
            }
        ];

        //check for a css in the configuration
        if (_config.hasOwnProperty("css")) {
            if (!utils.isArray(_config.css)) {
                _config.css = [_config.css];
            }
            _config.css[0]["cssSelector"] = "." + elementClass;
            //add the css configuration to the returned css array
            for (let i=0; i<_config.css.length; i++) {
                jsonCss.push(_config.css[i]);
            }
        }

        //return the method's value
        return jsonCss;
    };

    this._getHeaderId = function() {
        //declare locals
        let idPrefix = "dialogHeader";
        let retVal = domUtils.getElementId(_config.header, tagName, idPrefix);

        //return the method's value
        return retVal;
    };

    this._getDefaultHeaderClass = function() {
        //declare locals
        let retVal = "dialogHeader";

        //return the method's value
        return retVal;
    };

    this._getHeaderClass = function() {
        //declare locals
        let retVal = jsonUtils.getValue(_config.header, "class", "");

        //return the method's value
        return retVal;
    };

    this._getHeaderCss = function() {
        //declare locals
        let defaultClass = this._getDefaultHeaderClass();
        let elementClass = this._getHeaderClass();
        let jsonCss = [
            {
                "cssSelector": "." + defaultClass,
                "height": "90px",
                "padding-top": "10px",
                "color": "#666666",
                "font-weight": "bold",
                "font-size": "30px",
                "text-align": "center",
            }
        ];

        //check for a css in the configuration
        if (_config.header.hasOwnProperty("css")) {
            if (!utils.isArray(_config.header.css)) {
                _config.header.css = [_config.header.css];
            }
            _config.header.css[0]["cssSelector"] = "." + elementClass;
            //add the css configuration to the returned css array
            for (let i=0; i<_config.header.css.length; i++) {
                jsonCss.push(_config.header.css[i]);
            }
        }

        //return the method's value
        return jsonCss;
    };

    this._getCloseButtonId = function() {
        //declare locals
        let idPrefix = "dialogCloseButton";
        let retVal = domUtils.getElementId(_config.closeButton, tagName, idPrefix);

        //return the method's value
        return retVal;
    };

    this._getDefaultCloseButtonClass = function() {
        //declare locals
        let retVal = "dialogCloseButton";

        //return the method's value
        return retVal;
    };

    this._getCloseButtonClass = function() {
        //declare locals
        let retVal = jsonUtils.getValue(_config.closeButton, "class", "");

        //return the method's value
        return retVal;
    };

    this._getCloseButtonCss = function() {
        //declare locals
        let defaultClass = this._getDefaultCloseButtonClass();
        let elementClass = this._getCloseButtonClass();
        let jsonCss = [
            {
                "cssSelector": "." + defaultClass,
                "float": "right",
                "width": "16px",
                "cursor": "pointer",
                "color": "red",
                "border": "1px solid transparent",
                "margin-right": "0px",
                "padding-right": "20px",
                "border-radius": "17px",
            }
        ];

        //check for a css in the configuration
        if (_config.closeButton.hasOwnProperty("css")) {
            if (!utils.isArray(_config.closeButton.css)) {
                _config.closeButton.css = [_config.closeButton.css];
            }
            _config.closeButton.css[0]["cssSelector"] = "." + elementClass;
            //add the css configuration to the returned css array
            for (let i=0; i<_config.closeButton.css.length; i++) {
                jsonCss.push(_config.closeButton.css[i]);
            }
        }

        //return the method's value
        return jsonCss;
    };

    this._getBodyId = function() {
        //declare locals
        let idPrefix = "dialogBody";
        let retVal = domUtils.getElementId(_config.body, tagName, idPrefix);

        //return the method's value
        return retVal;
    };

    this._getDefaultBodyClass = function() {
        //declare locals
        let retVal = "dialogBody";

        //return the method's value
        return retVal;
    };

    this._getBodyClass = function() {
        //declare locals
        let retVal = jsonUtils.getValue(_config.body, "class", "");

        //return the method's value
        return retVal;
    };

    this._getBodyCss = function() {
        //declare locals
        let defaultClass = this._getDefaultBodyClass();
        let elementClass = this._getBodyClass();
        let jsonCss = [
            {
                "cssSelector": "." + defaultClass,
                "height": "240px",
                "padding-top": "10px",
                "color": "#666666",
                "font-weight": "bold",
                "font-size": "30px",
                "text-align": "center",
            }
        ];

        //check for a css in the configuration
        if (_config.body.hasOwnProperty("css")) {
            if (!utils.isArray(_config.body.css)) {
                _config.body.css = [_config.body.css];
            }
            _config.body.css[0]["cssSelector"] = "." + elementClass;
            //add the css configuration to the returned css array
            for (let i=0; i<_config.body.css.length; i++) {
                jsonCss.push(_config.body.css[i]);
            }
        }

        //return the method's value
        return jsonCss;
    };

    this._getFooterId = function() {
        //declare locals
        let idPrefix = "dialogFooter";
        let retVal = domUtils.getElementId(_config.footer, tagName, idPrefix);

        //return the method's value
        return retVal;
    };

    this._getDefaultFooterClass = function() {
        //declare locals
        let retVal = "dialogFooter";

        //return the method's value
        return retVal;
    };

    this._getFooterClass = function() {
        //declare locals
        let retVal = jsonUtils.getValue(_config.footer, "class", "");

        //return the method's value
        return retVal;
    };

    this._getFooterCss = function() {
        //declare locals
        let defaultClass = this._getDefaultFooterClass();
        let elementClass = this._getFooterClass();
        let jsonCss = [
            {
                "cssSelector": "." + defaultClass,
                "height": "50px",
                "padding-top": "10px",
                "color": "#666666",
                "font-weight": "bold",
                "font-size": "16px",
                "text-align": "center",
            }
        ];

        //check for a css in the configuration
        if (_config.footer.hasOwnProperty("css")) {
            if (!utils.isArray(_config.footer.css)) {
                _config.footer.css = [_config.footer.css];
            }
            _config.footer.css[0]["cssSelector"] = "." + elementClass;
            //add the css configuration to the returned css array
            for (let i=0; i<_config.footer.css.length; i++) {
                jsonCss.push(_config.footer.css[i]);
            }
        }

        //return the method's value
        return jsonCss;
    };

    this.getConfig = function() {
        //return the method's value
        return _config;
    };

    this.geId = function() {
        //return the method's value
        return this._getDialogId();
    };

    this.show = function() {
        let dialogId = _config.id;
        if (utils.isInDom(dialogId)) {
            let elem = utils.getFromDom(dialogId);
            elem.style.display = "block";
        }
    };

    this.hide = function() {
        let dialogId = _config.id;
        if (utils.isInDom(dialogId)) {
            let elem = utils.getFromDom(dialogId);
            elem.style.display = "none";
        }
    };

    this.render = function() {
        //declare locals
        let methodName = "Dialog.render(): ";
        let logMessage;
        let containerId;
        let container;
        let dialogId = this._getDialogId();
        _config["id"] = dialogId;
        let currClassName;
        let dialogClass = this._getDialogClass();
        let headerId = this._getHeaderId();
        let headerClass = this._getHeaderClass();
        let closeButtonId = this._getCloseButtonId();
        let closeButtonClass = this._getCloseButtonClass();
        let bodyId = this._getBodyId();
        let bodyClass = this._getBodyClass();
        let footerId = this._getFooterId();
        let footerClass = this._getFooterClass();
        let cssTagId = domUtils.getCssTagId(_config);

        //set the container
        containerId = _config.renderTo;
        if (utils.isEmpty(containerId) || containerId==="body") {
            container = document.getElementsByTagName("body")[0];
        }
        else {
            if (!utils.isInDom(containerId)) {
                logMessage = "containerId=[" + containerId + "] is NOT in DOM !!";
                console.error(methodName + logMessage);
                return;
            }
            container = utils.getFromDom(containerId);
        }

        //check for valid values
        if (container==null || container==undefined || container=="undefined") {
            logMessage = "container is null !!";
            console.error(methodName + logMessage);
            return;
        }

        //render the component's css
        let jsonCss = this._getDialogCss();
        html5Utils.renderCss(jsonCss, cssTagId);
        jsonCss = this._getHeaderCss();
        html5Utils.renderCss(jsonCss, cssTagId);
        jsonCss = this._getBodyCss();
        html5Utils.renderCss(jsonCss, cssTagId);
        jsonCss = this._getFooterCss();
        html5Utils.renderCss(jsonCss, cssTagId);

        //render dialog HTML node
        let dialogNode = document.createElement("div");
        html5Utils.setNodeAttributes(dialogNode, tagName, _config, null);
        dialogNode.setAttribute("id", dialogId);
        currClassName = this._getDefaultDialogClass() + " " + dialogClass;
        currClassName = currClassName.trim();
        dialogNode.setAttribute("class", currClassName);
        if (_config.movable==true) {
            dialogNode.setAttribute("draggable", "true");
        }

        //render dialog header HTML node
        let headerNode = document.createElement("div");
        html5Utils.setNodeAttributes(headerNode, tagName, _config.header, null);
        headerNode.setAttribute("id", headerId);
        currClassName = this._getDefaultHeaderClass() + " " + headerClass;
        currClassName = currClassName.trim();
        headerNode.setAttribute("class", currClassName);
        if (_config.closeable==true) {
            //render dialog header close button HTML node
            jsonCss = this._getCloseButtonCss();
            html5Utils.renderCss(jsonCss, cssTagId);
            let closeButtonNode = document.createElement("div");
            html5Utils.setNodeAttributes(closeButtonNode, tagName, _config.closeButton, null);
            closeButtonNode.setAttribute("id", closeButtonId);
            currClassName = this._getDefaultCloseButtonClass() + " " + closeButtonClass;
            currClassName = currClassName.trim();
            closeButtonNode.setAttribute("class", currClassName);
            let hideDialogFH = this.hide;
            closeButtonNode.addEventListener("click", hideDialogFH);
            headerNode.appendChild(closeButtonNode);
        }

        //render dialog body HTML node
        let bodyNode = document.createElement("div");
        html5Utils.setNodeAttributes(bodyNode, tagName, _config.body, null);
        bodyNode.setAttribute("id", bodyId);
        currClassName = this._getDefaultBodyClass() + " " + bodyClass;
        currClassName = currClassName.trim();
        bodyNode.setAttribute("class", currClassName);

        //render dialog footer HTML node
        let footerNode = document.createElement("div");
        html5Utils.setNodeAttributes(footerNode, tagName, _config.footer, null);
        footerNode.setAttribute("id", footerId);
        currClassName = this._getDefaultFooterClass() + " " + footerClass;
        currClassName = currClassName.trim();
        footerNode.setAttribute("class", currClassName);

        //render a vertical spacer HTML node
        let verticalSpacerNode1 = document.createElement("div");
        verticalSpacerNode1.setAttribute("class", "verticalSpacer");
        let verticalSpacerNode2 = document.createElement("div");
        verticalSpacerNode2.setAttribute("class", "verticalSpacer");

        //append the element to the container
        dialogNode.appendChild(headerNode);
        dialogNode.appendChild(verticalSpacerNode1);
        dialogNode.appendChild(bodyNode);
        dialogNode.appendChild(verticalSpacerNode2);
        dialogNode.appendChild(footerNode);
        container.appendChild(dialogNode);

        //render child elements
        html5Utils.renderChildren(_config.header.children, headerId, cssTagId);
        html5Utils.renderChildren(_config.body.children, bodyId, cssTagId);
        html5Utils.renderChildren(_config.footer.children, footerId, cssTagId);
    };

    //invoke the _init method
    if (config!=null && utils.isJson(config)) {
        this._init(config);
    }
    else {
        this._init(_config);
    }
};
function CollapsiblePanel(config) {
    //declare global module variables
    let _config = {
        tagName: "div",
        renderTo: null,
        dataAttributes: {state: "data-state",alignment:"data-alignment",handlePosition:"data-handle-position",panelHeight:"data-panel-height",panelWidth:"data-panel-width",handleHeight:"data-handle-height",handleWidth:"data-handle-width"},
        children: null,
        alignment: "left",
        siblingNodeId: null,
        handle: {tagName: "div", text: "", class: "handle", position: "center", height: 0, width: 0, button: {}, children: null},
        body: {tagName: "div", class: "collapsibleBody", children: null},
        onCollapseCallback: null,
        onExpandCallback: null,
        state: "expanded",
    };

    this._init = function (config) {
        //check for valid values
        if (utils.isJson(config)) {
            //loop through the items
            for (let field in config) {
                if (config.hasOwnProperty(field)) {
                    _config[field] = config[field];
                }
            }
        }
    };

    this._getAlignment = function() {
        //declare locals
        let defaultValue = "left";
        let retVal;

        //get the value from the config
        if (_config.hasOwnProperty("alignment")) {
            if (utils.isString(_config.alignment)) {
                retVal = _config.alignment.toLowerCase();
            }
            else {
                retVal = defaultValue;
            }
        }
        else {
            retVal = defaultValue;
        }

        //check the value
        switch (retVal) {
            case "left":
            case "right":
            case "top":
            case "bottom":
                break
            default:
                retVal = defaultValue;
                break;
        }

        //return the method's value
        return retVal;
    };

    this._getState = function() {
        //declare locals
        let defaultValue = "expanded";
        let retVal;

        //get the value from the config
        if (_config.hasOwnProperty("state")) {
            if (utils.isString(_config.state)) {
                retVal = _config.state.toLowerCase();
            }
            else {
                retVal = defaultValue;
            }
        }
        else {
            retVal = defaultValue;
        }

        //check the value
        switch (retVal) {
            case "collapsed":
            case "expanded":
                break
            default:
                retVal = defaultValue;
                break;
        }

        //return the method's value
        return retVal;
    };

    this._getHandlePosition = function() {
        //declare locals
        let defaultValue = "center";
        let alignment = this._getAlignment();
        let retVal;

        //get the value from the config
        if (_config.hasOwnProperty("handle")) {
            if (_config.handle.hasOwnProperty("position")) {
                if (utils.isString(_config.handle.position)) {
                    retVal = _config.handle.position.toLowerCase();
                }
                else {
                    retVal = defaultValue;
                }
            }
            else {
                retVal = defaultValue;
            }
        }
        else {
            retVal = defaultValue;
        }

        //check the value
        switch (retVal) {
            case "center":
            case "left":
            case "right":
            case "top":
            case "bottom":
                break
            default:
                retVal = defaultValue;
                break;
        }

        //return the method's value
        return retVal;
    };

    this._getPanelHeight = function() {
        //declare locals
        let defaultValue = 0;
        let retVal = jsonUtils.getConfigHeight(_config, defaultValue);

        //return the method's value
        return retVal;
    };

    this._getPanelWidth = function() {
        //declare locals
        let defaultValue = 0;
        let retVal = jsonUtils.getConfigWidth(_config, defaultValue);

        //return the method's value
        return retVal;
    };

    this._getHandleHeight = function() {
        //declare locals
        let alignment = this._getAlignment();
        let defaultValue = (alignment=="left" || alignment=="right" ? 100 : 20);
        let retVal = jsonUtils.getConfigHeight(_config.handle, defaultValue);

        //return the method's value
        return retVal;
    };

    this._getHandleWidth = function() {
        //declare locals
        let alignment = this._getAlignment();
        let defaultValue = (alignment=="left" || alignment=="right" ? 20 : 100);
        let retVal = jsonUtils.getConfigWidth(_config.handle, defaultValue);

        //return the method's value
        return retVal;
    };

    this._getClassDefault = function() {
        //declare locals
        let retVal = "collapsible";
        let alignment = this._getAlignment();

        retVal = retVal + "_" + alignment;

        //return the method's value
        return retVal;
    };

    this._getClass = function() {
        //declare locals
        let defaultClass = this._getClassDefault();
        let retVal = jsonUtils.getValue(_config, "class", defaultClass);

        //return the method's value
        return retVal;
    };

    this._getCss = function() {
        //declare locals
        let defaultClass = this._getClassDefault();
        let elementClass = this._getClass();
        if (utils.isEmpty(defaultClass)) {
            defaultClass = "#" + this.getId();
        }
        else {
            if (!defaultClass.startsWith(".")) {
                defaultClass = "." + defaultClass;
            }
        }
        if (utils.isEmpty(elementClass)) {
            elementClass = "#" + this.getId();
        }
        else {
            if (!elementClass.startsWith(".")) {
                elementClass = "." + elementClass;
            }
        }
        let alignment = this._getAlignment();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
                "border": "1px solid transparent",
                //"position": "absolute",
            },
        ];
        //jsonCss[0][alignment] = "0px";

        //check for a css in the configuration
        if (_config.hasOwnProperty("css")) {
            if (!utils.isArray(_config.css)) {
                _config.css = [_config.css];
            }
            _config.css[0]["cssSelector"] = elementClass;
            //add the css configuration to the returned css array
            for (let i=0; i<_config.css.length; i++) {
                for (let field in _config.css[i]) {
                    if (_config.css[i].hasOwnProperty(field)) {
                        if (field.toLowerCase()=="position" || field.toLowerCase()=="left" || field.toLowerCase()=="right"
                            || field.toLowerCase()=="bottom" || field.toLowerCase()=="top") {
                            continue;
                        }
                        jsonCss[0][field] = _config.css[i][field];
                    }
                }
            }
            if (!_config.css.hasOwnProperty("background-color")) {
                jsonCss[0]["background-color"] = "inherit";
            }
        }
        else {
            jsonCss[0]["background-color"] = "inherit";
        }

        //return the method's value
        return jsonCss;
    };

    this._getBodyClassDefault = function() {
        //declare locals
        let retVal = "collapsibleBody";
        let alignment = this._getAlignment();

        retVal = retVal + "_" + alignment;

        //return the method's value
        return retVal;
    };

    this._getBodyClass = function() {
        //declare locals
        let defaultClass = this._getBodyClassDefault();
        let retVal = jsonUtils.getValue(_config.body, "class", defaultClass);

        //return the method's value
        return retVal;
    };

    this._getBodyCss = function() {
        //declare locals
        let idSuffix = "_body";
        let defaultClass = this._getBodyClassDefault();
        let elementClass = this._getBodyClass();
        if (utils.isEmpty(defaultClass)) {
            defaultClass = "#" + this.getId() + idSuffix;
        }
        else {
            if (!defaultClass.startsWith(".")) {
                defaultClass = "." + defaultClass;
            }
        }
        if (utils.isEmpty(elementClass)) {
            elementClass = "#" + this.getId() + idSuffix;
        }
        else {
            if (!elementClass.startsWith(".")) {
                elementClass = "." + elementClass;
            }
        }
        let alignment = this._getAlignment();
        let jsonCss = [
            {
                "cssSelector": ".collapsibleBody",
                "position": "absolute",
            },
            {
                "cssSelector": defaultClass,
            },
        ];
        jsonCss[1][alignment] = "0px";

        //check for a css in the configuration
        if (_config.hasOwnProperty("body")) {
            if (_config.body.hasOwnProperty("css")) {
                if (!utils.isArray(_config.body.css)) {
                    _config.body.css = [_config.body.css];
                }
                _config.body.css[0]["cssSelector"] = elementClass;
                //add the css configuration to the returned css array
                for (let i=0; i<_config.body.css.length; i++) {
                    jsonCss.push(_config.body.css[i]);
                }
                if (!_config.body.css.hasOwnProperty("background-color")) {
                    jsonCss[0]["background-color"] = "inherit";
                }
            }
            else {
                jsonCss[0]["background-color"] = "inherit";
            }
        }
        else {
            jsonCss[0]["background-color"] = "inherit";
        }

        //return the method's value
        return jsonCss;
    };

    this._getHandleClassDefault = function() {
        //declare locals
        let retVal = "collapsibleHandle";
        let alignment = this._getAlignment();

        retVal = retVal + "_" + alignment;

        //return the method's value
        return retVal;
    };

    this._getHandleClass = function() {
        //declare locals
        let defaultClass = this._getHandleClassDefault();
        let retVal = jsonUtils.getValue(_config.handle, "class", defaultClass);

        //return the method's value
        return retVal;
    };

    this._getHandleCss = function() {
        //declare locals
        let idSuffix = "_handle";
        let defaultClass = this._getHandleClassDefault();
        let elementClass = this._getHandleClass();
        if (utils.isEmpty(defaultClass)) {
            defaultClass = "#" + this.getId() + idSuffix;
        }
        else {
            if (!defaultClass.startsWith(".")) {
                defaultClass = "." + defaultClass;
            }
        }
        if (utils.isEmpty(elementClass)) {
            elementClass = "#" + this.getId() + idSuffix;
        }
        else {
            if (!elementClass.startsWith(".")) {
                elementClass = "." + elementClass;
            }
        }
        let alignment = this._getAlignment();
        let px = "px";
        let handleHeight = this._getHandleHeight();
        let handleWidth = this._getHandleWidth();
        let panelHeight = this._getPanelHeight();
        let panelWidth = this._getPanelWidth();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
                "height": handleHeight + px,
                "width": handleWidth + px,
            },
            {
                "cssSelector": ".collapsibleHandle",
                "position": "absolute",
                "border": "1px solid #000000",
                "outline": "0px none",
                "z-index": "1",
            },
            {
                "cssSelector": ".handleText",
            },
        ];
        if (alignment=="left" || alignment=="right") {
            jsonCss[2]["cssSelector"] = ".handleTextVertical";
            jsonCss[2]["direction"] = "ltr";
            jsonCss[2]["padding-left"] = "10px";
            jsonCss[2]["padding-top"] = "50px";
        }
        else if (alignment=="bottom" || alignment=="top") {
            jsonCss[2]["cssSelector"] = ".handleTextHorizontal";
            jsonCss[2]["float"] = "left";
            jsonCss[2]["direction"] = "ltr";
            jsonCss[2]["padding-left"] = "10px";
            jsonCss[2]["padding-top"] = "5px";
        }
        switch (alignment) {
            case "left":
                jsonCss[0][alignment] = panelWidth + px;
                jsonCss[0]["border-bottom-right-radius"] = "10px";
                jsonCss[0]["border-top-right-radius"] = "10px";
                break;
            case "right":
                jsonCss[0][alignment] = panelWidth + px;
                jsonCss[0]["border-bottom-left-radius"] = "10px";
                jsonCss[0]["border-top-left-radius"] = "10px";
                break;
            case "bottom":
                jsonCss[0][alignment] = panelHeight + px;
                jsonCss[0]["border-top-left-radius"] = "10px";
                jsonCss[0]["border-top-right-radius"] = "10px";
                break;
            case "top":
                jsonCss[0][alignment] = panelHeight + px;
                jsonCss[0]["border-bottom-left-radius"] = "10px";
                jsonCss[0]["border-bottom-right-radius"] = "10px";
                break;
            default:
                break;
        }

        //check for a css in the configuration
        if (_config.hasOwnProperty("handle")) {
            if (_config.handle.hasOwnProperty("css")) {
                if (!utils.isArray(_config.handle.css)) {
                    _config.handle.css = [_config.handle.css];
                }
                _config.handle.css[0]["cssSelector"] = elementClass;
                //add the css configuration to the returned css array
                for (let i=0; i<_config.handle.css.length; i++) {
                    jsonCss.push(_config.handle.css[i]);
                }
                if (!_config.handle.css.hasOwnProperty("background-color")) {
                    jsonCss[1]["background-color"] = "inherit";
                }
            }
            else {
                jsonCss[1]["background-color"] = "inherit";
            }
        }
        else {
            jsonCss[1]["background-color"] = "inherit";
        }

        //return the method's value
        return jsonCss;
    };

    this._getHandleButtonClassDefault = function() {
        //declare locals
        let retVal = "collapsibleHandleButton";
        let alignment = this._getAlignment();

        retVal = retVal + "_" + alignment;

        //return the method's value
        return retVal;
    };

    this._getHandleButtonClass = function() {
        //declare locals
        let defaultClass = this._getHandleButtonClassDefault();
        let retVal = jsonUtils.getValue(_config.handle.button, "class", defaultClass);

        //return the method's value
        return retVal;
    };

    this._getHandleButtonCss = function() {
        //declare locals
        let idSuffix = "_handleButton";
        let defaultIdValue = this.getId() + idSuffix;
        let alignment = this._getAlignment();
        let defaultClass = uiCompsUtils.fixCssSelector(this._getHandleButtonClassDefault(), defaultIdValue);
        let elementClass = uiCompsUtils.fixCssSelector(this._getHandleButtonClass(), defaultIdValue);
        let jsonCss = [
            {
                "cssSelector": ".collapsibleHandleButton",
                "cursor": "pointer",
                "border-radius": "25px",
                "border": "1px solid #000000",
                "height": "25px",
                "width": "25px",
            },
            {
                "cssSelector": defaultClass,
            },
            /*
            {
                "cssSelector": "@keyframes rotateItem",
                "from": "{ transform: none; }",
                "to": "{ transform: rotate(180deg); }",
            },
            {
                "cssSelector": "@keyframes unRotateItem",
                "from": "{ transform: rotate(180deg); }",
                "to": "{ transform: none; }",
            },

             */
            {
                "cssSelector": ".icon",
                "background-color": "transparent",
            },
            {
                "cssSelector": ".icon:hover",
                "box-shadow": "2px 2px 10px #666666",
            },
        ];
        switch (alignment) {
            case "left":
            case "right":
                jsonCss[1]["margin-top"] = "10px";
                jsonCss[1]["margin-left"] = "2px";
                break;
            case "bottom":
            case "top":
                jsonCss[1]["margin-left"] = "10px";
                jsonCss[1]["margin-top"] = "2px";
                jsonCss[1]["float"] = "left";
                break;
            default:
                break;
        }

        //check for a css in the configuration
        if (_config.hasOwnProperty("handle")) {
            if (_config.handle.hasOwnProperty("button")) {
                if (_config.handle.button.hasOwnProperty("css")) {
                    if (!utils.isArray(_config.handle.button.css)) {
                        _config.handle.button.css = [_config.handle.button.css];
                    }
                    _config.handle.button.css[0]["cssSelector"] = elementClass;
                    //add the css configuration to the returned css array
                    for (let i=0; i<_config.handle.button.css.length; i++) {
                        jsonCss[0].push(_config.handle.button.css[i]);
                    }
                }
            }
        }

        //return the method's value
        return jsonCss;
    };

    this._getHandleButtonIcon = function() {
        //declare locals
        let alignment = _config.alignment;
        let retVal;

        //check the state
        if (_config.state=="expanded") {
            //check the alignment
            switch (alignment) {
                case "left":
                    retVal = "&#60;";
                    break
                case "right":
                    retVal = "&#62;";
                    break
                case "bottom":
                    retVal = "&#8744;";
                    break
                case "top":
                    retVal = "&#8743;";
                    break
                default:
                    break;
            }
        }
        else if (_config.state=="collapsed") {
            //check the alignment
            switch (alignment) {
                case "left":
                    retVal = "&#62;";
                    break
                case "right":
                    retVal = "&#60;";
                    break
                case "bottom":
                    retVal = "&#8743;";
                    break
                case "top":
                    retVal = "&#8744;";
                    break
                default:
                    break;
            }
        }

        //return the method's value
        return retVal;
    };

    this._getHandleId = function() {
        //declare locals
        let idPrefix = "collapsibleHandle";
        let idSuffix = "_handle";
        let retVal;

        //check the config
        if (_config.hasOwnProperty("handle")) {
            retVal = domUtils.getElementId(_config.handle, idPrefix, idPrefix);
            //retVal += idSuffix;
        }
        else {
            retVal = this.getId() + idSuffix;
        }

        //return the method's value
        return retVal;
    };

    this._getHandleButtonId = function() {
        //declare locals
        let idPrefix = "collapsibleHandleButton";
        let idSuffix = "_handleButton";
        let retVal;

        //check the config
        if (_config.hasOwnProperty("handle")) {
            if (_config.handle.hasOwnProperty("button")) {
                retVal = domUtils.getElementId(_config.handle.button, "button", idPrefix);
            }
            else {
                retVal = this.getId() + idSuffix;
            }
        }
        else {
            retVal = this.getId() + idSuffix;
        }

        //return the method's value
        return retVal;
    };

    this._getBodyId = function() {
        //declare locals
        let idPrefix = "collapsibleBody";
        let idSuffix = "_body";
        let retVal;

        //check for an id
        if (_config.hasOwnProperty("body")) {
            retVal = domUtils.getElementId(_config.body, idPrefix, idPrefix);
            retVal += idSuffix;
        }
        else {
            retVal = this.getId() + idSuffix;
        }

        //return the method's value
        return retVal;
    };

    this.getConfig = function() {
        //return the method's value
        return _config;
    };

    this.getId = function() {
        //declare locals
        let idPrefix = "collapsible";
        let retVal = domUtils.getElementId(_config, idPrefix, idPrefix);

        //check for an id
        if (_config.hasOwnProperty("id")) {
            retVal = _config.id;
        }
        else {
            if (_config.hasOwnProperty("body")) {
                if (_config.body.hasOwnProperty("id")) {
                    retVal = _config.body.id;
                }
            }
        }

        //return the method's value
        return retVal;
    };

    this.toggle = function(buttonIconFH) {
        //declare locals
        let pxSuffix = "px";
        let animationDuration = 1000; //in milliseconds
        let elemId = _config.id;
        let buttonId = _config.handle.button.id;
        let currState = _config.state;
        let newState;
        let alignment;
        let panelHeight;
        let panelWidth;
        let handleHeight;
        let handleWidth;
        let panelNode;
        let panelHandleNode;
        let panelHandleId;
        let panelBodyNode;
        let panelBodyId;
        let buttonNode;
        let centerPanelId;
        let centerPanelWidth = 0;
        let centerPanelHeight = 0;

        //check for valid values
        if (!utils.isInDom(elemId)) {
            return;
        }

        //get the html nodes
        panelNode = utils.getFromDom(elemId);
        buttonNode = utils.getFromDom(buttonId);
        panelBodyNode = panelNode.firstChild;
        panelHandleNode = panelBodyNode.nextSibling;
        panelBodyId = panelBodyNode.id;
        panelHandleId = panelHandleNode.id;

        //get the node's attributes
        alignment = panelNode.getAttribute(_config.dataAttributes.alignment);
        panelHeight = parseInt(panelNode.getAttribute(_config.dataAttributes.panelHeight));
        panelWidth = parseInt(panelNode.getAttribute(_config.dataAttributes.panelWidth));
        handleHeight = parseInt(panelNode.getAttribute(_config.dataAttributes.handleHeight));
        handleWidth = parseInt(panelNode.getAttribute(_config.dataAttributes.handleWidth));

        //set the new state according to the current state
        if (currState == "collapsed") {
            newState = "expanded";
        }
        else {
            newState = "collapsed";
        }
        _config.state = newState;
        panelNode.setAttribute(_config.dataAttributes.state, newState);
        panelBodyNode.setAttribute(_config.dataAttributes.state, newState);

        let arrIds = [elemId, panelBodyId];
        centerPanelId = panelNode.parentNode.children[1].id;
        centerPanelWidth = parseInt(domUtils.getWidth(centerPanelId));

        //perform animations according to the new state
        if (newState=="collapsed") {
            buttonNode.animate([{"transform": "none"},{"transform": "rotate(180deg)"}], animationDuration);
            buttonNode.innerHTML = buttonIconFH();
            for (let i=0; i<arrIds.length; i++) {
                switch (alignment) {
                    case "left":
                    case "right":
                        utils.getFromDom(arrIds[i]).animate({
                            "width": "0px",
                            "min-width": "0px",
                        }, animationDuration );
                        if (alignment=="left") {
                            utils.getFromDom(panelHandleId).animate( {
                                "left": "0p",
                            }, animationDuration);
                        }
                        else {
                            utils.getFromDom(panelHandleId).animate( {
                                "right": "0p",
                            }, animationDuration);
                        }
                        break;
                    case "bottom":
                    case "top":
                        utils.getFromDom(arrIds[i]).animate({
                            "height": "0px",
                            "min-height": "0px",
                        }, animationDuration );
                        if (alignment=="bottom") {
                            utils.getFromDom(panelHandleId).animate( {
                                "bottom": "0" + pxSuffix,
                            }, animationDuration);
                        }
                        else {
                            utils.getFromDom(panelHandleId).animate( {
                                "top": "0" + pxSuffix,
                            }, animationDuration);
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        else {
            buttonNode.animate([{"transform": "rotate(180deg)"},{"transform": "none"}], animationDuration);
            buttonNode.innerHTML = buttonIconFH();
            for (let i=0; i<arrIds.length; i++) {
                switch (alignment) {
                    case "left":
                    case "right":
                        utils.getFromDom(arrIds[i]).animate({
                            "width": panelWidth+pxSuffix,
                            "min-width": panelWidth+pxSuffix,
                        }, animationDuration );
                        if (alignment=="left") {
                            utils.getFromDom(panelHandleId).animate( {
                                "left": panelWidth + pxSuffix,
                            }, animationDuration);
                        }
                        else {
                            utils.getFromDom(panelHandleId).animate( {
                                "right": panelWidth + pxSuffix,
                            }, animationDuration);
                        }
                        break;
                    case "bottom":
                    case "top":
                        utils.getFromDom(arrIds[i]).animate({
                            "height": panelHeight+pxSuffix,
                            "min-height": panelHeight+pxSuffix,
                        }, animationDuration );
                        if (alignment=="bottom") {
                            utils.getFromDom(panelHandleId).animate( {
                                "bottom": panelHeight + pxSuffix,
                            }, animationDuration);
                        }
                        else {
                            utils.getFromDom(panelHandleId).animate( {
                                "top": panelHeight + pxSuffix,
                            }, animationDuration);
                        }
                        break;
                    default:
                        break;
                }
            }
        }

       //check the new state
        if (newState == "collapsed") {
            //invoke the callback
            if (utils.isFunction(_config.onCollapseCallback)) {
                setTimeout(function () {
                    _config.onCollapseCallback(elemId, newState);
                }, animationDuration);
            }
            else if (utils.isString(_config.onCollapseCallback)) {
                setTimeout(function() {
                    eval(_config.onCollapseCallback + "('" + elemId + "','" + newState + "')");
                }, animationDuration);
            }
        }
        else if (newState == "expanded") {
            //invoke the callback
            if (utils.isFunction(_config.onExpandCallback)) {
                setTimeout(function () {
                    _config.onExpandCallback(elemId, newState);
                }, animationDuration);
            }
            else if (utils.isString(_config.onExpandCallback)) {
                setTimeout(function() {
                    eval(_config.onExpandCallback + "('" + elemId + "','" + newState + "')");
                }, animationDuration);
            }
        }
    };

    this.render = function() {
        //declare locals
        let methodName = "CollapsiblePanel.render(): ";
        let logMessage;
        let containerId;
        let container;
        let elemId = this.getId();
        let handleId = this._getHandleId();
        let handleButtonId = this._getHandleButtonId();
        let bodyId = this._getBodyId();
        let compState  = this._getState();
        let alignment = this._getAlignment();
        let handlePosition = this._getHandlePosition();
        _config.id = elemId;
        _config.tagName = "div";
        _config.handle.id = handleId;
        _config.body.id = bodyId;
        _config.handle.button.id = handleButtonId;
        _config.state = compState;
        _config.alignment = alignment;
        _config.handle.position = handlePosition;
        let elemClass = this._getClass();
        let bodyClass = this._getBodyClass();
        let handleClass = this._getHandleClass();
        let handleButtonClass = this._getHandleButtonClass();
        let currClassName;
        let handleText = "";
        let cssTagId = domUtils.getCssTagId(_config);
        let direction = uiCompsUtils.getConfigDirection(_config);
        let floatValue = (direction=="ltr") ? "float: left;" : "float: right;";

        //set the container
        containerId = _config.renderTo;
        if (utils.isEmpty(containerId) || containerId==="body") {
            container = document.getElementsByTagName("body")[0];
        }
        else {
            if (!utils.isInDom(containerId)) {
                logMessage = "containerId=[" + containerId + "] is NOT in DOM !!";
                console.error(methodName + logMessage);
                return;
            }
            container = utils.getFromDom(containerId);
        }

        //check for valid values
        if (container==null || container==undefined || container=="undefined") {
            logMessage = "container is null !!";
            console.error(methodName + logMessage);
            return;
        }

        //render the component's css
        let jsonCss = this._getCss();
        html5Utils.renderCss(jsonCss, cssTagId);
        jsonCss = this._getBodyCss();
        html5Utils.renderCss(jsonCss, cssTagId);
        jsonCss = this._getHandleCss();
        html5Utils.renderCss(jsonCss, cssTagId);
        jsonCss = this._getHandleButtonCss();
        html5Utils.renderCss(jsonCss, cssTagId);

        //render the panel node
        let defaultClass = this._getClassDefault();
        if (utils.isString(defaultClass) && utils.isString(elemClass) && defaultClass.toLowerCase().trim()==elemClass.toLowerCase().trim()) {
            currClassName = elemClass;
        }
        else {
            currClassName =  defaultClass + " " + elemClass;
        }
        currClassName = currClassName.trim();
        let panelNode = document.createElement(_config.tagName);
        html5Utils.setNodeAttributes(panelNode, _config.tagName, _config, null);
        panelNode.setAttribute("id", elemId);
        panelNode.setAttribute("class", currClassName + " collapsible");
        panelNode.setAttribute(_config.dataAttributes.state, _config.state);
        panelNode.setAttribute(_config.dataAttributes.alignment, _config.alignment);
        panelNode.setAttribute(_config.dataAttributes.handlePosition, _config.handle.position);

        //render the panel's handle node
        let handleRowId = handleId+"Row";
        let handleRow = document.createElement(_config.tagName);
        handleRow.setAttribute("id", handleRowId);

        let defaultHandleClass = this._getHandleClassDefault();
        if (utils.isString(defaultHandleClass) && utils.isString(handleClass) && defaultHandleClass.toLowerCase().trim()==handleClass.toLowerCase().trim()) {
            currClassName = handleClass;
        }
        else {
            currClassName =  defaultHandleClass + " " + handleClass;
        }
        currClassName = currClassName.trim();
        let handleNode = document.createElement(_config.tagName);
        html5Utils.setNodeAttributes(handleNode, _config.tagName, _config.handle, ["text"]);
        handleNode.setAttribute("id", handleId);
        handleNode.setAttribute("class", currClassName + " collapsibleHandle");
        handleNode.setAttribute("style", "height:" + this._getHandleHeight() + "px;width:" + this._getHandleWidth() + "px;");

        //render the handle's button node
        let defaultHandleButtonClass = this._getHandleButtonClassDefault();
        if (utils.isString(defaultHandleButtonClass) && utils.isString(handleButtonClass) && defaultHandleButtonClass.toLowerCase().trim()==handleButtonClass.toLowerCase().trim()) {
            currClassName = handleButtonClass;
        }
        else {
            currClassName =  defaultHandleButtonClass + " " + handleButtonClass;
        }
        currClassName = currClassName.trim();
        let buttonTagName = "button";
        let buttonIcon = this._getHandleButtonIcon();
        let handleButtonNode = document.createElement(buttonTagName);
        html5Utils.setNodeAttributes(handleButtonNode, buttonTagName, _config.handle.button, null);
        handleButtonNode.setAttribute("id", handleButtonId);
        handleButtonNode.setAttribute("class", currClassName + " icon collapsibleHandleButton");
        handleButtonNode.setAttribute("style", floatValue);
        let buttonIconFH = this._getHandleButtonIcon;
        let toggleFH = this.toggle;
        handleButtonNode.addEventListener("click", function() {
            toggleFH(buttonIconFH);
        });
        handleButtonNode.innerHTML = buttonIcon;

        //render the handle's children node
        let handleChildrenNodeId = handleId + "_Children";
        let handleChildrenNode = document.createElement(_config.tagName);
        handleChildrenNode.setAttribute("id", handleChildrenNodeId);
        if (_config.alignment=="bottom" || _config.alignment=="top") {
            handleChildrenNode.setAttribute("class", "handleTextHorizontal");
        }
        else {
            handleChildrenNode.setAttribute("class", "handleTextVertical");
        }
        if (utils.isString(_config.handle.text)) {
            handleChildrenNode.innerHTML = _config.handle.text;
        }
        handleNode.appendChild(handleButtonNode);
        handleNode.appendChild(handleChildrenNode);
        //handleRow.appendChild(handleNode);

        //render the panel's body node
        let bodyNode = document.createElement(_config.tagName);
        html5Utils.setNodeAttributes(bodyNode, _config.tagName, _config.body, null);
        let defaultBodyClass = this._getBodyClassDefault();
        if (utils.isString(defaultBodyClass) && utils.isString(bodyClass) && defaultBodyClass.toLowerCase().trim()==bodyClass.toLowerCase().trim()) {
            currClassName = bodyClass;
        }
        else {
            currClassName =  defaultBodyClass + " " + bodyClass;
        }
        currClassName = currClassName.trim();
        bodyNode.setAttribute("id", bodyId);
        bodyNode.setAttribute("class", currClassName + " collapsibleBody");

        //set the panel's children
        //panelNode.appendChild(handleRow);
        panelNode.appendChild(bodyNode);
        panelNode.appendChild(handleNode);

        //append the element to the container
        //container.appendChild(handleRow);
        container.appendChild(panelNode);

        //set the node's visual attributes
        let elemOrigHeight = domUtils.getHeight(elemId);
        let elemOrigWidth = domUtils.getWidth(elemId);
        let handleHeight = domUtils.getHeight(handleId);
        let handleWidth = domUtils.getWidth(handleId);
        domUtils.setAttributeValue(elemId, _config.dataAttributes.panelHeight, elemOrigHeight);
        domUtils.setAttributeValue(elemId, _config.dataAttributes.panelWidth, elemOrigWidth);
        domUtils.setAttributeValue(elemId, _config.dataAttributes.handleHeight, handleHeight);
        domUtils.setAttributeValue(elemId, _config.dataAttributes.handleWidth, handleWidth);
        //domUtils.setAttributeValue(elemId, "style", "height:0px;min-height:0px;width:0px;min-width:0px;");
        switch (_config.alignment) {
            case "left":
            case "right":
                if (_config.state=="expanded") {
                    bodyNode.setAttribute("style", "height:" + (elemOrigHeight-handleHeight) + "px;width:" + elemOrigWidth + "px;");
                }
                else {
                    bodyNode.setAttribute("style", "height:" + (elemOrigHeight-handleHeight) + "px;width:0px;");
                }
                break;
            case "bottom":
            case "top":
                if (_config.state=="expanded") {
                    bodyNode.setAttribute("style", "height:" + elemOrigHeight + "px;width:" + elemOrigWidth + "px;");
                }
                else {
                    bodyNode.setAttribute("style", "height:0px;width:" + elemOrigWidth + "px;");
                }
                break;
            default:
                break;
        }

        //render child elements
        html5Utils.renderChildren(_config.handle.children, handleChildrenNodeId, cssTagId);
        html5Utils.renderChildren(_config.body.children, bodyId, cssTagId);
    };

    //invoke the _init method
    if (config!=null && utils.isJson(config)) {
        this._init(config);
    }
    else {
        this._init(_config);
    }
};

function Autocomplete(config) {
    //declare global module variables
    let _config = {
        id: "",
        renderTo: null,
        options: {data: null, valueFieldName: null, tooltipFieldName: null, displayFields: null},
        state: "closed",
        direction: "ltr",
        animationDuration: 500,
        multiple: false,
        allowSort: false,
        closeOnSelect: true,
        numOpenItems: 4,
        searchMode: "startswith",
        typeMode: "filter",
        placeholder: "placeholder",
        input: {id: "", "class": "", css: {}},
        splitter: {display: true, "class": "splitter", css: {}},
        button: {id: "", "class": "", css: {}, animate: false, animationDuration: 500, hoverClass: "",focusClass: "", style: "", icon: {id: "", css: {}, style: "color:#0000ff;font-size:30px;font-weight: 900;transform: rotate(-40deg);", openIcon: "&#9906", closeIcon: "&#9906"}},
        list: {id: "", "class": "", css: {}, animate: true, animationDuration: 500, header:{id: "", display: "none", fields: null, sortButton: {"class":"", css: {}, tooltip: "click here to resort the data", ascIcon: "", descIcon: ""}, children: null}, body: {id: "", "class": "", css: {}, item: {"class": "", css: {}, fields: null, children: null}, children: null}, children: null},
        item: {"class": "listItem", css: {}, children: null,},
        match: {"class": "match",css: {}},
        resultsPanel: {id: "", display: false, alignment: "bottom", "class": "", css: {}, text: "", itemWord: "item", itemsWord: "items", children: null,},
        selectedPanel: {
            id: "",
            display: false,
            alignment: "top", "class": "", css: {},
            header: {
                id: "",
                display: false,
                "class":"",
                css: {},
                text: "",
                clearAllButton: {display: false, "class":"", css: {}, icon: "", tooltip: "click here to clear all selected items"},
                selectAllButton: {display: false, "class":"", css: {}, icon: "", tooltip: "click here to select all items"},
                children: null,
            },
            body: {id: "", "class":"", css: {}, children: null,},
            selectedItem: {"class": "", css: {}, closeButton: {"class": "", css: {}, icon: "x"}, children: null,},
            children: null,
        },
        onchange: null,
        children: null,
    };
    let isClosed = true;
    let matchingItemsCounter = 0;
    let currentFocus = -1;
    let defaultItemHeight = 30;
    let currentInputValue = "";
    let selectedValues = [];
    let sortOrderDefault = "asc";
    let currentSortOrder = null;
    let uiConfig = {
        id: "",
        style: "",
        cssTagId: "",
        displayAsAutocomplete: false,
        items: [
            { configPath: "", type: "text", label: "Configuration property path: ", tooltip: "set a component's configuration property", defaultValue: "", },
            { configPath: "options.data", type: "text", label: "Data list: ", tooltip: "select the component's data list", invokeEval: true, },
            { configPath: "options.valueFieldName", type: "text", label: "Data list value field name: ", tooltip: "select the data list's value field name", defaultValue: _config.options.valueFieldName, },
            { configPath: "options.tooltipFieldName", type: "text", label: "Data list tooltip field name: ", tooltip: "select the data list's tooltip field name", defaultValue: _config.options.tooltipFieldName, },
            { configPath: "options.displayFields", type: "text", label: "Data list display fields: ", tooltip: "a comma separated list of fields names to display", defaultValue: _config.options.displayFields, },
            { configPath: "multiple", type: "checkbox", label: "Multiple ? ", tooltip: "check to change the component's multiple selection configuration", },
            { configPath: "allowSort", type: "checkbox", label: "Allow sort ? ", tooltip: "check to enable/disable the sorting of the the component's data", },
            { configPath: "list.header.sortButton.ascIcon", type: "list", label: "Sort asc icon: ", tooltip: "change the component's list header's ascending sort button icon", list: "html5Symbols", defaultValue: "8593" },
            { configPath: "list.header.sortButton.descIcon", type: "list", label: "Sort desc icon: ", tooltip: "change the component's list header's descending sort button icon", list: "html5Symbols", defaultValue: "8595" },
            { configPath: "state", type: "list", label: "State: ", tooltip: "select the component's state", list: "autocompleteStateModeList", defaultValue: "closed", },
            { configPath: "searchMode", type: "list", label: "Search mode: ", tooltip: "select the component's search mode", list: "autocompleteSearchModeList", defaultValue: "startswith", },
            { configPath: "typeMode", type: "list", label: "Type mode: ", tooltip: "select the component's typing mode", list: "autocompleteTypeModeList", defaultValue: "filter", },
            { configPath: "direction", type: "list", label: "Direction: ", tooltip: "select the component's direction", list: "autocompleteDirectionModeList", defaultValue: "ltr", },
            { configPath: "placeholder", type: "text", label: "Placeholder: ", tooltip: "select the component's placeholder", defaultValue: "placeholder", },
            { configPath: "splitter.display", type: "checkbox", label: "Show splitter ? ", tooltip: "check to show/hide the component's splitter", defaultValue: true },
            { configPath: "numOpenItems", type: "number", label: "Number of open items: ", tooltip: "change the component's number of displayed items when its open", event: "oninput", min: 2, max: 20, defaultValue: 4, },
            { configPath: "style.background-color", type: "color", label: "Background color: ", tooltip: "change the component's background color", defaultValue: "#cccccc", event: "oninput", },
            { configPath: "style.color", type: "color", label: "Color: ", tooltip: "change the component's font color", defaultValue: "#000000", event: "oninput", },
            { configPath: "style.font-family", type: "list", label: "Font family: ", tooltip: "select the component's font family", list: "fontFamilyList", defaultValue: "Arial, sans-serif", },
            { configPath: "style.font-size", type: "numberWithUnits", label: "Font size: ", tooltip: "change the component's font size", units: "px", event: "oninput", min: 5, max: 50, defaultValue: 16, },
            { configPath: "button.animate", type: "checkbox", label: "Animate button ? ", tooltip: "check to enable/disable the component's button animation", },
            { configPath: "button.animationDuration", type: "number", label: "Button animation duration: ", tooltip: "change the component button's animation duration in milliseconds", event: "oninput", min: 500, max: 2500, defaultValue: 500, },
            { configPath: "button.hoverClass", type: "text", label: "Button hoverClass: ", tooltip: "change the component button's hover class on mouseover and mouseout events", },
            { configPath: "button.focusClass", type: "text", label: "Button focusClass: ", tooltip: "change the component button's focus class on focus and blur events", },
            { configPath: "button.style", type: "text", label: "Button style: ", tooltip: "change the component button's style", },
            { configPath: "button.icon.style.color", type: "color", label: "Button icon color: ", tooltip: "change the component button icon's color", defaultValue: "#0000ff", event: "oninput", },
            { configPath: "button.icon.style.font-size", type: "numberWithUnits", label: "Button icon size: ", tooltip: "change the component button icon's size", units: "px", event: "oninput", min: 5, max: 50, defaultValue: 30, },
            { configPath: "button.icon.style", type: "text", label: "Button icon style: ", tooltip: "change the component button icon's style", defaultValue: "font-weight: 900;transform: rotate(-40deg);", },
            { configPath: "button.icon.openIcon", type: "list", label: "Button open icon: ", tooltip: "change the component button's open icon", list: "html5Symbols", defaultValue: "9906", },
            { configPath: "button.icon.closeIcon", type: "list", label: "Button close icon: ", tooltip: "change the component button's close icon", list: "html5Symbols", defaultValue: "9906", },
            { configPath: "list.header.display", type: "checkbox", label: "Show list header ? ", tooltip: "check to enable/disable the component's list header", defaultValue: false },
            { configPath: "list.animate", type: "checkbox", label: "Animate list ? ", tooltip: "check to enable/disable the component's list animation", defaultValue: true },
            { configPath: "list.animationDuration", type: "number", label: "List animation duration: ", tooltip: "change the component list's animation duration in milliseconds", event: "oninput", min: 500, max: 2500, defaultValue: 500, },
            { configPath: "resultsPanel.display", type: "checkbox", label: "Show results panel ? ", tooltip: "check to show/hide the component's results panel", },
            { configPath: "resultsPanel.alignment", type: "list", label: "Results panel alignment: ", tooltip: "change the component's results panel alignment", list: "autocompletePanelAlignmentList", defaultValue: "bottom", },
            { configPath: "resultsPanel.text", type: "text", label: "Results panel text: ", tooltip: "change the component's results panel text", defaultValue: "Found # {item} of ## {items} for {search}", },
            { configPath: "resultsPanel.itemWord", type: "text", label: "Results panel item word: ", tooltip: "change the component's results panel single item word", defaultValue: "item", },
            { configPath: "resultsPanel.itemsWord", type: "text", label: "Results panel items word: ", tooltip: "change the component's results panel plural items word", defaultValue: "items", },
            { configPath: "selectedPanel.display", type: "checkbox", label: "Show selected panel ? ", tooltip: "check to show/hide the component's selected panel", },
            { configPath: "selectedPanel.alignment", type: "list", label: "Selected panel alignment: ", tooltip: "change the component's selected panel alignment", list: "autocompletePanelAlignmentList", defaultValue: "top", },
            { configPath: "selectedPanel.header.display", type: "checkbox", label: "Show selected panel header ? ", tooltip: "check to show/hide the component's selected panel header", },
            { configPath: "selectedPanel.header.text", type: "text", label: "Selected panel text: ", tooltip: "change the component's selected panel header text", defaultValue: "Selected # {item} of ## {items}", },
            { configPath: "selectedPanel.header.clearAllButton.display", type: "checkbox", label: "Show ClearAll button ? ", tooltip: "check to show/hide the component's selected panel 'clear all' button", },
            { configPath: "selectedPanel.header.clearAllButton.icon", type: "list", label: "ClearAll button icon: ", tooltip: "change the component's selected panel ClearAll button icon", list: "html5Symbols", defaultValue: "10008", },
            { configPath: "selectedPanel.header.clearAllButton.tooltip", type: "text", label: "ClearAll button tooltip: ", tooltip: "change the component's selected panel ClearAll button tooltip", defaultValue: "click here to clear all selected items", },
            { configPath: "selectedPanel.header.selectAllButton.display", type: "checkbox", label: "Show SelectAll button ? ", tooltip: "check to show/hide the component's selected panel 'select all' button", },
            { configPath: "selectedPanel.header.selectAllButton.icon", type: "list", label: "SelectAll button icon: ", tooltip: "change the component's selected panel SelectAll button icon", list: "html5Symbols", defaultValue: "10004", },
            { configPath: "selectedPanel.header.selectAllButton.tooltip", type: "text", label: "SelectAll button tooltip: ", tooltip: "change the component's selected panel SelectAll button tooltip", defaultValue: "click here to select all items", },
            { configPath: "selectedPanel.selectedItem.closeButton.icon", type: "text", label: "Selected item close button icon: ", tooltip: "change the component's selected panel selected item close button icon", defaultValue: "x", },
        ],
    };

    /**
     * declare component functions
     * */

    function _getAlignment(config) {
        //declare locals
        let defaultValue = "top";
        let retVal = defaultValue;

        //get the value from the config
        if (utils.isEmpty(config)) {
            return retVal;
        }
        if (config.hasOwnProperty("alignment")) {
            if (utils.isString(config.alignment)) {
                retVal = config.alignment.toLowerCase();
            }
        }

        //check the value
        switch (retVal) {
            case "top":
            case "bottom":
                break
            default:
                retVal = defaultValue;
                break;
        }

        //return the method's value
        return retVal;
    }

    function _getPlaceholder() {
        //declare locals
        let defaultValue = "";
        let retVal = defaultValue;

        //get the value from the config
        if (_config.hasOwnProperty("placeholder")) {
            if (utils.isString(_config.placeholder)) {
                retVal = _config.placeholder.toLowerCase();
            }
        }
        else if (_config.hasOwnProperty("input")) {
            if (_config.input.hasOwnProperty("placeholder")) {
                if (utils.isString(_config.input.placeholder)) {
                    retVal = _config.input.placeholder.toLowerCase();
                }
            }
        }

        //return the method's value
        return retVal;
    }

    function _getSearchMode() {
        //declare locals
        let defaultValue = "startswith";
        let retVal = defaultValue;

        //get the value from the config
        if (_config.hasOwnProperty("searchMode")) {
            if (utils.isString(_config.searchMode)) {
                retVal = _config.searchMode.toLowerCase();
            }
        }

        //check the value
        switch (retVal) {
            case "startswith":
            case "contains":
            case "endswith":
                break
            default:
                retVal = defaultValue;
                break;
        }

        //return the method's value
        return retVal;
    }

    function _getInputId() {
        //declare locals
        let idSuffix = "_input";
        let retVal = null;

        //check for an id from the config
        if (_config.hasOwnProperty("input")) {
            if (_config.input.hasOwnProperty("id")) {
                if (!utils.isEmpty(_config.input.id)) {
                    retVal = _config.input.id;
                }
            }
        }
        if (utils.isEmpty(retVal)) {
            retVal = _config.id + idSuffix;
        }

        //return the method's value
        return retVal;
    }

    function _getInputClassDefault() {
        //declare locals
        let retVal = "comboInput";

        //return the method's value
        return retVal;
    }

    function _getInputClass() {
        //declare locals
        let defaultClass = _getInputClassDefault();
        let retVal = jsonUtils.getValue(_config.input, "class", defaultClass);

        //return the method's value
        return retVal;
    }

    function _getInputCss() {
        //declare locals
        let defaultClass = _getInputClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
                "color": "inherit",
                "font-size": "inherit",
                "font-family": "inherit",
            },
            {
                "cssSelector": defaultClass+"::placeholder",
                "color": "inherit",
                "font-size": "inherit",
                "font-family": "inherit",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.input, defaultClass, _config.input.id);

        //return the method's value
        return jsonCss;
    };

    function _getButtonId() {
        //declare locals
        let idSuffix = "_button";
        let retVal = null;

        //check for an id from the config
        if (_config.hasOwnProperty("button")) {
            if (_config.button.hasOwnProperty("id")) {
                if (!utils.isEmpty(_config.button.id)) {
                    retVal = _config.button.id;
                }
            }
        }
        if (utils.isEmpty(retVal)) {
            retVal = _config.id + idSuffix;
        }

        //return the method's value
        return retVal;
    }

    function _getButtonClassDefault() {
        //declare locals
        let retVal = "comboButton";

        //return the method's value
        return retVal;
    }

    function _getButtonClass() {
        //declare locals
        let defaultClass = _getButtonClassDefault();
        let retVal = jsonUtils.getValue(_config.button, "class", defaultClass);

        //return the method's value
        return retVal;
    }

    function _getButtonCss() {
        //declare locals
        let defaultClass = _getButtonClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
                "height": "30px",
                "width": "30px",
                "border-radius": "1px",
                "cursor": "pointer",
            },
            {
                "cssSelector": defaultClass+"-hover",
                "box-shadow": "5px 5px 10px #666666",
            },
            {
                "cssSelector": defaultClass+"-focus",
                "box-shadow": "5px 5px 10px #666666",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.button, defaultClass, _getButtonId());

        //return the method's value
        return jsonCss;
    };

    function _getClassDefault() {
        //declare locals
        let retVal = "autocomplete";

        //return the method's value
        return retVal;
    }

    function _getClass() {
        //declare locals
        let defaultClass = _getClassDefault();
        let retVal = jsonUtils.getValue(_config, "class", defaultClass);

        //return the method's value
        return retVal;
    }

    function _getCss() {
        //declare locals
        let defaultClass = _getClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
                "border-top-left-radius": "6px",
                "border-top-right-radius": "6px",
                "border-bottom": "2px solid #ef850b",
                "background-color": "#cccccc",
            },
            {
                "cssSelector": defaultClass+"-focused",
                "box-shadow": "5px 5px 10px #666666",
                "border-bottom": "3px solid #ef850b",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config, defaultClass, _config.id);

        //return the method's value
        return jsonCss;
    };

    function _getItemClassDefault() {
        //declare locals
        let retVal = "listItem";

        //return the method's value
        return retVal;
    }

    function _getItemClass() {
        //declare locals
        let defaultClass = _getItemClassDefault();
        let retVal = jsonUtils.getValue(_config.item, "class", defaultClass);

        //return the method's value
        return retVal;
    }

    function _getItemCss() {
        //declare locals
        let defaultClass = _getItemClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
                "height": "30px",
                "width": "100%",
                "cursor": "pointer",
                "border-bottom": "1px solid #d4d4d4",
            },
            {
                "cssSelector": defaultClass+":hover",
                "background-color": "#aaaaaa",
            },
            {
                "cssSelector": defaultClass+"-hover",
                "background-color": "#aaaaaa",
            },
            {
                "cssSelector": defaultClass+"-icon",
                "height": "100%",
            },
            {
                "cssSelector": defaultClass+"-checkbox",
            },
            {
                "cssSelector": defaultClass+"-header",
                "height": "30px",
                "width": "100%",
                "border-bottom": "1px solid #d4d4d4",
            },
            {
                "cssSelector": defaultClass+"-field",
                "width": "100px",
                "height": "100%",
                "border-right": "1px solid #d4d4d4",
                "padding-top": "6px",
                "white-space": "nowrap",
                "overflow": "hidden",
                "text-overflow": "ellipsis",
            },
            {
                "cssSelector": defaultClass+"-headerfield",
                "width": "100px",
                "height": "100%",
                "font-size": "16px",
                "font-weight": "600",
                "color": "#000000",
                "background-color": "#cccccc",
                "border-right": "1px solid #d4d4d4",
                "padding-top": "6px",
                "white-space": "nowrap",
                "overflow": "hidden",
                "text-overflow": "ellipsis",
            },
            {
                "cssSelector": defaultClass+"-sortButton",
                "background-color": "transparent",
                "outline": "none",
                "border": "none",
                "cursor": "pointer",
            },
            {
                "cssSelector": defaultClass+"-sortButton-hover",
                "box-shadow": "5px 5px 10px #666666",
            },
            {
                "cssSelector": defaultClass+"-sortButton-focus",
                "box-shadow": "5px 5px 10px #666666",
            },
            {
                "cssSelector": defaultClass+"-colseparator",
                "height": "100%",
                "margin-left": "5px",
                "margin-right": "5px",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.item, defaultClass, null);

        //return the method's value
        return jsonCss;
    };

    function _getMatchClassDefault() {
        //declare locals
        let retVal = "match";

        //return the method's value
        return retVal;
    }

    function _getMatchClass() {
        //declare locals
        let defaultClass = _getMatchClassDefault();
        let retVal = jsonUtils.getValue(_config.match, "class", defaultClass);

        //return the method's value
        return retVal;
    }

    function _getMatchCss() {
        //declare locals
        let defaultClass = _getMatchClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
                "background-color": "#cccccc",
                "font-weight": "bold",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.match, defaultClass, null);

        //return the method's value
        return jsonCss;
    };

    function _getListPanelId() {
        //declare locals
        let idSuffix = "_list";
        let retVal = null;

        //check for an id from the config
        if (_config.hasOwnProperty("list")) {
            if (_config.list.hasOwnProperty("id")) {
                if (!utils.isEmpty(_config.list.id)) {
                    retVal = _config.list.id;
                }
            }
        }
        if (utils.isEmpty(retVal)) {
            retVal = _config.id + idSuffix;
        }

        //return the method's value
        return retVal;
    }

    function _getListBodyId() {
        //declare locals
        let idSuffix = "_listBody";
        let retVal = _config.id + idSuffix;

        //return the method's value
        return retVal;
    }

    function _getListBodyCss() {
        //declare locals
        let jsonCss = [
            {
                "cssSelector": ".listBody",
            },
        ];

        //return the method's value
        return jsonCss;
    };

    function _getListPanelClassDefault() {
        //declare locals
        let retVal = "list";

        //return the method's value
        return retVal;
    }

    function _getListPanelClass() {
        //declare locals
        let defaultClass = _getListPanelClassDefault();
        let retVal = jsonUtils.getValue(_config.list, "class", defaultClass);

        //return the method's value
        return retVal;
    }

    function _getListPanelCss() {
        //declare locals
        let defaultClass = _getListPanelClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
                "border-bottom-left-radius": "6px",
                "border-bottom-right-radius": "6px",
                "background-color": "#ffffff",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.list, defaultClass, _config.list.id);

        //return the method's value
        return jsonCss;
    };

    function _getResultsPanelId() {
        //declare locals
        let idSuffix = "_resultsPanel";
        let retVal = null;

        //check for an id from the config
        if (_config.hasOwnProperty("resultsPanel")) {
            if (_config.resultsPanel.hasOwnProperty("id")) {
                if (!utils.isEmpty(_config.resultsPanel.id)) {
                    retVal = _config.resultsPanel.id;
                }
            }
        }
        if (utils.isEmpty(retVal)) {
            retVal = _config.id + idSuffix;
        }

        //return the method's value
        return retVal;
    }

    function _getResultsPanelClassDefault() {
        //declare locals
        let retVal = "resultsPanel";

        //return the method's value
        return retVal;
    }

    function _getResultsPanelClass() {
        //declare locals
        let defaultClass = _getResultsPanelClassDefault();
        let retVal = jsonUtils.getValue(_config.resultsPanel, "class", defaultClass);

        //return the method's value
        return retVal;
    }

    function _getResultsPanelCss() {
        //declare locals
        let defaultClass = _getResultsPanelClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
                "height": "30px",
                "background-color": "#cccccc",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.resultsPanel, defaultClass, _config.resultsPanel.id);

        //return the method's value
        return jsonCss;
    };

    function _getSelectedPanelBodyId() {
        //declare locals
        let idSuffix = "_body";
        let retVal = null;

        //check for an id from the config
        if (_config.selectedPanel.hasOwnProperty("body")) {
            if (_config.selectedPanel.body.hasOwnProperty("id")) {
                if (!utils.isEmpty(_config.selectedPanel.body.id)) {
                    retVal = _config.selectedPanel.body.id;
                }
            }
        }
        if (utils.isEmpty(retVal)) {
            retVal = _config.selectedPanel.id + idSuffix;
        }

        //return the method's value
        return retVal;
    }

    function _getSelectedPanelBodyClassDefault() {
        //declare locals
        let retVal = "selectedPanelBody";

        //return the method's value
        return retVal;
    }

    function _getSelectedPanelBodyClass() {
        //declare locals
        let defaultClass = _getSelectedPanelBodyClassDefault();
        let retVal = jsonUtils.getValue(_config.selectedPanel.body, "class", defaultClass);

        //return the method's value
        return retVal;
    }

    function _getSelectedPanelBodyCss() {
        //declare locals
        let defaultClass = _getSelectedPanelBodyClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
                "height": "50px",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.selectedPanel.body, defaultClass, _config.selectedPanel.body.id);

        //return the method's value
        return jsonCss;
    };

    function _getSelectedPanelId() {
        //declare locals
        let idSuffix = "_selectedPanel";
        let retVal = null;

        //check for an id from the config
        if (_config.hasOwnProperty("selectedPanel")) {
            if (_config.selectedPanel.hasOwnProperty("id")) {
                if (!utils.isEmpty(_config.selectedPanel.id)) {
                    retVal = _config.selectedPanel.id;
                }
            }
        }
        if (utils.isEmpty(retVal)) {
            retVal = _config.id + idSuffix;
        }

        //return the method's value
        return retVal;
    }

    function _getSelectedPanelClassDefault() {
        //declare locals
        let retVal = "selectedPanel";

        //return the method's value
        return retVal;
    }

    function _getSelectedPanelClass() {
        //declare locals
        let defaultClass = _getSelectedPanelClassDefault();
        let retVal = jsonUtils.getValue(_config.selectedPanel, "class", defaultClass);

        //return the method's value
        return retVal;
    }

    function _getSelectedPanelCss() {
        //declare locals
        let defaultClass = _getSelectedPanelClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
                "background-color": "#cccccc",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.selectedPanel, defaultClass, _config.selectedPanel.id);

        //return the method's value
        return jsonCss;
    };

    function _getSelectedPanelHeaderClassDefault() {
        //declare locals
        let retVal = "selectedPanelHeader";

        //return the method's value
        return retVal;
    }

    function _getSelectedPanelHeaderId() {
        //declare locals
        let idSuffix = "_header";
        let retVal = null;

        //check for an id from the config
        if (_config.selectedPanel.hasOwnProperty("header")) {
            if (_config.selectedPanel.header.hasOwnProperty("id")) {
                if (!utils.isEmpty(_config.selectedPanel.header.id)) {
                    retVal = _config.selectedPanel.header.id;
                }
            }
        }
        if (utils.isEmpty(retVal)) {
            retVal = _config.selectedPanel.id + idSuffix;
        }

        //return the method's value
        return retVal;
    }

    function _getSelectedPanelHeaderClass() {
        //declare locals
        let defaultClass = _getSelectedPanelHeaderClassDefault();
        let retVal = jsonUtils.getValue(_config.selectedPanel.header, "class", defaultClass);

        //return the method's value
        return retVal;
    }

    function _getSelectedPanelHeaderCss() {
        //declare locals
        let defaultClass = _getSelectedPanelHeaderClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
                "height": "30px",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.selectedPanel.header, defaultClass, _config.selectedPanel.header.id);

        //return the method's value
        return jsonCss;
    };

    function _getSelectedPanelClearAllButtonClassDefault() {
        //declare locals
        let retVal = "selectedPanelButtonClearAll";

        //return the method's value
        return retVal;
    }

    function _getSelectedPanelClearAllButtonClass() {
        //declare locals
        let defaultClass = _getSelectedPanelClearAllButtonClassDefault();
        let retVal = jsonUtils.getValue(_config.selectedPanel.header.clearAllButton, "class", defaultClass);

        //return the method's value
        return retVal;
    }

    function _getSelectedPanelClearAllButtonCss() {
        //declare locals
        let defaultClass = _getSelectedPanelClearAllButtonClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
                "cursor": "pointer",
                "border-radius": "14px",
                "width": "25px",
                "height": "25px",
                "outline": "1px solid transparent",
                "border": "none",
                "color": "red",
            },
            {
                "cssSelector": defaultClass+":hover, " + defaultClass+":focus",
                "box-shadow": "5px 5px 10px #666666",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.selectedPanel.header.clearAllButton, defaultClass, _config.selectedPanel.header.clearAllButton.id);

        //return the method's value
        return jsonCss;
    };

    function _getSelectedPanelSelectAllButtonClassDefault() {
        //declare locals
        let retVal = "selectedPanelButtonSelectAll";

        //return the method's value
        return retVal;
    }

    function _getSelectedPanelSelectAllButtonClass() {
        //declare locals
        let defaultClass = _getSelectedPanelSelectAllButtonClassDefault();
        let retVal = jsonUtils.getValue(_config.selectedPanel.header.selectAllButton, "class", defaultClass);

        //return the method's value
        return retVal;
    }

    function _getSelectedPanelSelectAllButtonCss() {
        //declare locals
        let defaultClass = _getSelectedPanelSelectAllButtonClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
                "cursor": "pointer",
                "border-radius": "14px",
                "width": "25px",
                "height": "25px",
                "outline": "1px solid transparent",
                "border": "none",
                "color": "forestgreen",
            },
            {
                "cssSelector": defaultClass+":hover," + defaultClass+":focus",
                "box-shadow": "5px 5px 10px #666666",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.selectedPanel.header.selectAllButton, defaultClass, _config.selectedPanel.header.selectAllButton.id);

        //return the method's value
        return jsonCss;
    };

    function _getSelectedItemDefaultClass() {
        //declare locals
        let retVal = "selectedItem";

        //return the method's value
        return retVal;
    }

    function _getSelectedItemClass() {
        //declare locals
        let defaultClass = _getSelectedItemDefaultClass();
        let retVal = jsonUtils.getValue(_config.selectedPanel.selectedItem, "class", defaultClass);

        //return the method's value
        return retVal;
    }

    function _getSelectedItemCss() {
        //declare locals
        let defaultClass = _getSelectedItemDefaultClass();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
                "background-color": "lightskyblue",
                "font-size": "12px",
                "border-radius": "8px",
            },
            {
                "cssSelector": defaultClass+"-match",
                "background-color": "lightyellow",
                "font-weight": "900",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.selectedPanel.selectedItem, defaultClass, null);

        //return the method's value
        return jsonCss;
    };

    function _getSelectedItemCloseButtonDefaultClass() {
        //declare locals
        let retVal = "selectedItemCloseButton";

        //return the method's value
        return retVal;
    }

    function _getSelectedItemCloseButtonClass() {
        //declare locals
        let defaultClass = _getSelectedItemCloseButtonDefaultClass();
        let retVal = jsonUtils.getValue(_config.selectedPanel.selectedItem.closeButton, "class", defaultClass);

        //return the method's value
        return retVal;
    }

    function _getSelectedItemCloseButtonCss() {
        //declare locals
        let defaultClass = _getSelectedItemCloseButtonDefaultClass();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
                "cursor": "pointer",
                "font-size": "9px",
                "height": "10px",
                "width": "10px",
            },
            {
                "cssSelector": defaultClass+"-hover",
                "box-shadow": "5px 5px 10px #666666",
                "background-color": "#eeeeee",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.selectedPanel.selectedItem.closeButton, defaultClass, null);

        //return the method's value
        return jsonCss;
    };

    function _getComponentBackgroundColor() {
        let elemNode;
        let retVal = "inherit";

        if (utils.isInDom(_config.id)) {
            elemNode = utils.getFromDom(_config.id);
            retVal = elemNode.style["background-color"];
            if (utils.isEmpty(retVal)) {
                retVal = getComputedStyle(elemNode).backgroundColor;
            }
        }

        //return the method's value
        return retVal;
    }

    function _getListItemCheckboxWidth() {
        let retVal = 30;
        return retVal;
    }

    function _getListScrollbarWidth() {
        let retVal = 18;
        return retVal;
    }

    function _getListSortButtonWidth() {
        let retVal = 30;
        return retVal;
    }

    function _getListItemHeaderWidth(fieldsHeaders, index) {
        let cbWidth = _getListItemCheckboxWidth();
        let scrollBarWidth = _getListScrollbarWidth();
        let sortButtonWidth = _getListScrollbarWidth();
        let widthCalc;

        if (_config.multiple) {
            if (_config.allowSort) {
                widthCalc = "((100% - "+sortButtonWidth+"px - "+cbWidth+"px - "+scrollBarWidth+"px) / "+fieldsHeaders.length+")";
            }
            else {
                widthCalc = "((100% - "+cbWidth+"px - "+scrollBarWidth+"px) / "+fieldsHeaders.length+")";
            }
        }
        else {
            if (_config.allowSort) {
                widthCalc = "((100% - "+sortButtonWidth+"px - "+scrollBarWidth+"px) / "+fieldsHeaders.length+")";
            }
            else {
                widthCalc = "((100% - "+scrollBarWidth+"px) / "+fieldsHeaders.length+")";
            }
        }

        if (fieldsHeaders.length==1 || (index>0 && index==(fieldsHeaders.length-1))) {
            widthCalc = "(" + widthCalc + " + " + scrollBarWidth + "px)";
        }
        widthCalc = "calc" + widthCalc + ";";

        return widthCalc;
    }

    function _getListItemHeight() {
        let elemNode = document.getElementsByClassName(_getItemClass());
        let itemHeight = (utils.isEmpty(elemNode) ? defaultItemHeight : (elemNode.length==0 ? defaultItemHeight : parseInt(getComputedStyle(elemNode[0]).height)));

        return itemHeight;
    }

    function _getListHeight() {
        let methodName = "_getListHeight(): ";
        let itemHeight = _getListItemHeight();
        let numOpenItems = parseInt(_config.numOpenItems);
        let listHeight = (itemHeight*numOpenItems);
        let totalHeight = listHeight;
        let borderWidth;
        if (matchingItemsCounter < numOpenItems) {
            totalHeight = (matchingItemsCounter*itemHeight);
        }
        if (uiCompsUtils.show(_config.list.header)) {
            totalHeight += itemHeight;
        }
        if (!uiCompsUtils.show(_config.resultsPanel)) {
            borderWidth = parseInt(utils.getFromDom(_config.list.id).style["border-bottom-width"]);
            totalHeight -= borderWidth;
        }
        totalHeight = (totalHeight==0 ? totalHeight : totalHeight-1);
        console.debug(methodName + "itemHeight=["+itemHeight+"] numOpenItems=["+numOpenItems+"] totalHeight=["+totalHeight+"] borderWidth=["+borderWidth+"] list.header.display=["+_config.list.header.display+"]");

        //return the method's value
        return totalHeight;
    }

    function _getListAnimationHeight() {
        let methodName = "_getListAnimationHeight(): ";
        let itemHeight = _getListItemHeight();
        let numOpenItems = parseInt(_config.numOpenItems);
        let listHeight = (itemHeight*numOpenItems);
        let totalHeight = listHeight;
        if (matchingItemsCounter < numOpenItems) {
            totalHeight = (matchingItemsCounter*itemHeight);
        }
        if (uiCompsUtils.show(_config.list.header)) {
            totalHeight += itemHeight;
        }
        if (uiCompsUtils.show(_config.resultsPanel)) {
            let resultsPanelHeight = getComputedStyle(utils.getFromDom(_config.resultsPanel.id)).height;
            resultsPanelHeight = parseInt(resultsPanelHeight);
            totalHeight += resultsPanelHeight;
        }
        if (uiCompsUtils.show(_config.selectedPanel)) {
            let selectedPanelHeight = getComputedStyle(utils.getFromDom(_config.selectedPanel.id)).height;
            selectedPanelHeight = parseInt(selectedPanelHeight);
            totalHeight += selectedPanelHeight;
        }
        totalHeight = (totalHeight==0 ? totalHeight : totalHeight-1)
        console.debug(methodName + "totalHeight=["+totalHeight+"]");

        //return the method's value
        return totalHeight;
    }

    function _closeList() {
        let listId = _config.list.id;
        let listContainerNode = document.getElementById(listId);
        let listBodyId = _getListBodyId();
        let listBodyNode = document.getElementById(listBodyId);
        let inputNode = document.getElementById(_config.input.id);
        let buttonIconId = _getButtonIconId();
        let buttonIconNode = document.getElementById(buttonIconId);
        isClosed = true;
        let buttonIcon = _getButtonIcon();
        if (!utils.isEmpty(listBodyNode)) {
            if (listContainerNode.style.display=="block") {
                if (_config.button.animate) {
                    buttonIconNode.animate([{"transform": "rotate(180deg)"},{"transform": "none"}], _config.button.animationDuration);
                }
                if (_config.list.animate) {
                    listBodyNode.animate({"height":"0px"}, _config.list.animationDuration);
                    listContainerNode.animate({"height":"0px"}, _config.list.animationDuration);
                }

                setTimeout(function() {
                    buttonIconNode.innerHTML = buttonIcon;
                    listContainerNode.style.display = "none";
                    isClosed = true;
                    _config.state = "closed";
                    console.debug("_closeList(): _config.state=["+_config.state+"]");
                }, _config.list.animationDuration);
            }
        }
        if (!utils.isEmpty(inputNode)) {
            //focus on the input
            inputNode.focus();
        }
    }

    function _getButtonIconId() {
        //declare locals
        let idSuffix = "_buttonIcon";
        let retVal = null;

        //check for an id from the config
        if (_config.hasOwnProperty("button")) {
            if (_config.button.hasOwnProperty("icon")) {
                if (_config.button.icon.hasOwnProperty("id")) {
                    if (!utils.isEmpty(_config.button.icon.id)) {
                        retVal = _config.button.icon.id;
                    }
                }
            }
        }
        if (utils.isEmpty(retVal)) {
            retVal = _config.id + idSuffix;
        }

        //return the method's value
        return retVal;
    }

    function _getButtonIconCss() {
        //declare locals
        let defaultClass = "icon";
        let jsonCss = [
            {
                "cssSelector": defaultClass,
                "font-size": "16px",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.button.icon, defaultClass, _config.button.icon.id);

        //return the method's value
        return jsonCss;
    };

    function _getButtonIcon() {
        //declare locals
        let closeIcon;
        let openIcon;

        //get the value from the config
        if (_config.hasOwnProperty("button") && _config.button.hasOwnProperty("icon") && _config.button.icon.hasOwnProperty("openIcon")) {
            openIcon = _config.button.icon.openIcon;
        }
        if (_config.hasOwnProperty("button") && _config.button.hasOwnProperty("icon") && _config.button.icon.hasOwnProperty("closeIcon")) {
            closeIcon = _config.button.icon.closeIcon;
        }
        if (!utils.isString(closeIcon)) {
            closeIcon = "&#9650";
        }
        if (!utils.isString(openIcon)) {
            openIcon = "&#9660";
        }

        if (isClosed) {
            return openIcon;
        }
        return closeIcon;
    }

    function _getButtonIconSort(sortOrder) {
        //declare locals
        let currSortOrder = _getSortOrder(sortOrder);
        let icon;

        //check for valid values
        if (currSortOrder==sortOrderDefault) {
            if (_config.hasOwnProperty("list") && _config.list.hasOwnProperty("header") && _config.list.header.hasOwnProperty("sortButton") && _config.list.header.sortButton.hasOwnProperty("ascIcon")) {
                icon = _config.list.header.sortButton.ascIcon;
            }
            if (!utils.isString(icon)) {
                icon = "<span style=\"color: #ff0000\">Z</span>&#8595;<span style=\"color: #0000ff\">A</span>";
            }
        }
        else {
            if (_config.hasOwnProperty("list") && _config.list.hasOwnProperty("header") && _config.list.header.hasOwnProperty("sortButton") && _config.list.header.sortButton.hasOwnProperty("descIcon")) {
                icon = _config.list.header.sortButton.descIcon;
            }
            if (!utils.isString(icon)) {
                icon = "<span style=\"color: #0000ff\">A</span>&#8593;<span style=\"color: #ff0000\">Z</span>";
            }
        }

        return icon;
    }

    function _focusOnMainInput() {
        let inputNode = document.getElementById(_config.input.id);
        inputNode.focus();
    }

    function _clearAllSelected() {
        if (_config.multiple && uiCompsUtils.show(_config.selectedPanel)) {
            let methodName = "_clearAllSelected(): ";
            console.debug(methodName + "started...");
            //clear the selected values array
            selectedValues = [];

            //re-render the list
            _renderListItems();

            //get the selected panel's body node
            let selectedPanelBodyNode = utils.getFromDom(_config.selectedPanel.body.id);
            selectedPanelBodyNode.innerHTML = "";

            //update the header text
            _updateSelectedPanelHeaderText();
        }

        //refocus on the input
        _focusOnMainInput();
    }

    function _getListItemFieldsHeaders(listItem) {
        //declare locals
        let fieldsHeaders = _config.list.header.fields;
        let retVal = fieldsHeaders;

        //check for a string or json type
        if (utils.isEmpty(fieldsHeaders) || (utils.isArray(fieldsHeaders) && fieldsHeaders.length<1)) {
            if (utils.isString(listItem)) {
                fieldsHeaders = [_config.options.valueFieldName];
                retVal = fieldsHeaders;
            }
            else if (utils.isJson(listItem)) {
                fieldsHeaders = _config.options.displayFields;
                if (utils.isEmpty(fieldsHeaders) || (utils.isArray(fieldsHeaders) && fieldsHeaders.length < 1)) {
                    fieldsHeaders = [_config.options.valueFieldName];
                }
                retVal = fieldsHeaders;
            }
        }

        //check the value of the fields names
        if (!utils.isString(fieldsHeaders) && !utils.isArray(fieldsHeaders)) {
            return null;
        }
        if (utils.isString(fieldsHeaders)) {
            retVal = utils.string2array(fieldsHeaders);
        }

        //return the method's value
        return retVal;
    }

    function _getListItemFieldsNames(listItem) {
        //declare locals
        let fieldsNames = _config.list.body.item.fields;
        let retVal = fieldsNames;

        //check for a string or json type
        if (utils.isString(listItem)) {
            fieldsNames = [_config.options.valueFieldName];
            retVal = fieldsNames;
        }
        else if (utils.isJson(listItem)) {
            if (utils.isEmpty(fieldsNames) || (utils.isArray(fieldsNames) && fieldsNames.length<1)) {
                fieldsNames = _config.options.displayFields;
                if (utils.isEmpty(fieldsNames) || (utils.isArray(fieldsNames) && fieldsNames.length<1)) {
                    fieldsNames = [];
                    for (let field in listItem) {
                        if (listItem.hasOwnProperty(field)) {
                            fieldsNames.push(field);
                        }
                    }
                }
                retVal = fieldsNames;
            }
        }

        //check the value of the fields names
        if (!utils.isString(fieldsNames) && !utils.isArray(fieldsNames)) {
            return null;
        }
        if (utils.isString(fieldsNames)) {
            retVal = utils.string2array(fieldsNames);
        }

        //return the method's value
        return retVal;
    }

    function _getListItemNodes() {
        let listBodyId = _config.list.body.id;
        let listComp;
        let tmpNodes;
        let currTmpNode;
        let listItemNodes;

        //check if the item exists on the DOM
        if (utils.isInDom(listBodyId)) {
            listComp = utils.getFromDom(listBodyId);
            tmpNodes = listComp.getElementsByTagName("div");
        }

        /*a function to classify an item as "active":*/
        if (!tmpNodes) {
            return null;
        }

        //loop through the items and remove unwanted nodes
        listItemNodes = [];
        for (let i=0; i<tmpNodes.length; i++) {
            currTmpNode = tmpNodes[i];
            if (currTmpNode.classList.contains("listItem")) {
                listItemNodes.push(currTmpNode);
            }
        }

        //return the method's value
        return listItemNodes;
    }

    function _addActive() {
        let listItemNodes = _getListItemNodes();

        //check for valid values
        if (listItemNodes==null) {
            return;
        }

        //remove the active class from all the nodes
        _removeActive();
        if (currentFocus<0) {
            currentFocus = 0;
        }
        if (currentFocus>=matchingItemsCounter) {
            currentFocus = matchingItemsCounter-1;
        }

        //add the active class to the focused node
        listItemNodes[currentFocus].classList.add(_getItemClass()+"-hover");
    }

    function _getId() {
        //declare locals
        let idPrefix = "combo";
        let idSuffix = "_combo";
        let retVal = domUtils.getElementId(_config, idPrefix, idPrefix);

        //check for an id
        if (_config.hasOwnProperty("id")) {
            if (!utils.isEmpty(_config.id)) {
                retVal = _config.id;
            }
        }
        else {
            if (_config.hasOwnProperty("input")) {
                if (_config.input.hasOwnProperty("id")) {
                    if (!utils.isEmpty(_config.input.id)) {
                        retVal = _config.input.id + idSuffix;
                    }
                }
            }
        }

        //return the method's value
        return retVal;
    }

    function _getIndexByValue() {
        let methodName = "_getIndexByValue(): ";
        let typeMode = _getTypeMode();
        let currDataItem;
        let inputNode;
        let inputValue;
        let index = -1;
        let numItemsFound = 0;
        let found;

        //check for the correct type mode
        if (typeMode=="focusonfirst") {
            //get the input node's value
            inputNode = document.getElementById(_config.input.id);
            inputValue = inputNode.value.trim();

            //check for a valid value
            if (utils.isEmpty(inputValue)) {
                return index;
            }

            //loop through the data items
            for (let i = 0; i < _config.options.data.length; i++) {
                //get the current item
                currDataItem = _config.options.data[i];
                found = false;

                //check for a match
                found = _isMatch(currDataItem);

                //check the found flag
                if (found) {
                    if (index==-1) {
                        index = i;
                    }
                    numItemsFound++;
                }
            }
            console.debug(methodName + "index=["+index+"] for inputValue=["+inputValue+"]");

            //update the results panel's text
            _updateResultsPanelText(numItemsFound);
        }

        //return the method's value
        return index;
    }

    function _getMatchDataItemDecorated(dataItem) {
        //declare locals
        let matchStartIndex = -1;
        let decoratedItem = {};
        let inputValue = utils.getFromDom(_config.input.id).value;
        let currFieldValue;
        let decoratedFieldValue;
        let currFieldMatch;
        let fieldsNames = _getListItemFieldsNames(dataItem);

        //check for valid values
        if (utils.isEmpty(inputValue)) {
            return dataItem;
        }
        if (!utils.isJson(dataItem)) {
            return dataItem;
        }
        if (utils.isEmpty(fieldsNames)) {
            return dataItem;
        }

        //loop through the item's fields
        for (let i=0; i<fieldsNames.length; i++) {
            let field = fieldsNames[i];
            if (dataItem.hasOwnProperty(field)) {
                //get the current field's value
                currFieldValue = dataItem[field];
                decoratedFieldValue = null;

                //check for a match
                currFieldMatch = _isMatch(currFieldValue);

                //get the match start index
                matchStartIndex = _getMatchStartIndex(dataItem[field]);

                //check for a match in the current field
                if (currFieldMatch) {
                    decoratedFieldValue = currFieldValue.substring(0, matchStartIndex) + '<span class="' + _getMatchClass() + '">' + currFieldValue.substring(matchStartIndex, inputValue.length) + '</span>';
                    if (currFieldValue.length>inputValue.length) {
                        decoratedFieldValue += currFieldValue.substring(matchStartIndex + inputValue.length);
                    }
                    decoratedItem[field] = decoratedFieldValue;
                }
                else {
                    decoratedItem[field] = currFieldValue;
                }
            }
        }

        //return the method's value
        return decoratedItem;
    }

    function _getMatchStartIndex(dataItem) {
        //declare locals
        let matchStartIndex = -1;
        let inputValue = utils.getFromDom(_config.input.id).value;
        let searchMode = _getSearchMode();

        //check for valid values
        if (!utils.isString(dataItem)) {
            return matchStartIndex;
        }
        if (utils.isEmpty(inputValue)) {
            return matchStartIndex;
        }

        //check for a match
        if (searchMode.toLowerCase()=="startswith") {
            if (dataItem.toLowerCase().startsWith(inputValue.toLowerCase())) {
                matchStartIndex = 0;
            }
        }
        else if (searchMode.toLowerCase()=="endswith") {
            if (dataItem.toLowerCase().endsWith(inputValue.toLowerCase())) {
                matchStartIndex = dataItem.toLowerCase().indexOf(inputValue.toLowerCase());
            }
        }
        else if (searchMode.toLowerCase()=="contains") {
            if (dataItem.toLowerCase().indexOf(inputValue.toLowerCase())!=-1) {
                matchStartIndex = dataItem.toLowerCase().indexOf(inputValue.toLowerCase());
            }
        }

        //return the method's value
        return matchStartIndex;
    }

    function _getListByName(listName) {
        let list = eval(listName);
        return list;
    }

    function _getSortOrder(sortOrder) {
        let tmpSortOrder = sortOrder;

        //check for a valid sort order
        if (!utils.isString(tmpSortOrder)) {
            tmpSortOrder = sortOrderDefault;
        }
        tmpSortOrder = tmpSortOrder.toLowerCase();
        if (tmpSortOrder!="asc" && tmpSortOrder!="desc") {
            tmpSortOrder = sortOrderDefault;
        }
        return tmpSortOrder;
    }

    function _getState() {
        //declare locals
        let defaultValue = "closed";
        let retVal = defaultValue;

        //get the value from the config
        if (_config.hasOwnProperty("state")) {
            if (utils.isString(_config.state)) {
                retVal = _config.state.toLowerCase();
            }
        }

        //check the value
        switch (retVal) {
            case "open":
            case "closed":
                break
            default:
                retVal = defaultValue;
                break;
        }

        //return the method's value
        return retVal;
    }

    function _getTypeMode() {
        //declare locals
        let defaultValue = "filter";
        let retVal = defaultValue;

        //get the value from the config
        if (_config.hasOwnProperty("typeMode")) {
            if (utils.isString(_config.typeMode)) {
                retVal = _config.typeMode.toLowerCase();
            }
        }

        //check the value
        switch (retVal) {
            case "filter":
            case "focusonfirst":
                break
            default:
                retVal = defaultValue;
                break;
        }

        //return the method's value
        return retVal;
    }

    function _handleCompBlur() {
        let focusedClass = _getClassDefault() + "-focused";
        utils.getFromDom(_config.id).classList.remove(focusedClass);
    }

    function _handleCompFocus() {
        let focusedClass = _getClassDefault() + "-focused";
        utils.getFromDom(_config.id).classList.add(focusedClass);
    }

    function _handleInput(event) {
        //declare locals
        let typeMode = _getTypeMode();

        //check the type mode
        if (typeMode=="filter") {
            _renderListItems();
            let listBodyId = _getListBodyId();
            let listComp = document.getElementById(listBodyId);
            currentFocus = -1;
            listComp.scrollTop = 0;
        }
        else if (typeMode=="focusonfirst") {
            _renderListItems();

            //get the list's body node
            let listBodyId = _getListBodyId();
            let listComp = document.getElementById(listBodyId);

            //get the item's height
            let itemHeight = _getListItemHeight();
            let numItemsForScroll = parseInt(_config.numOpenItems);

            //set the focus on the first match
            let index = _getIndexByValue();
            currentFocus = index;
            _addActive();

            //scroll to the focus
            if (currentFocus<numItemsForScroll) {
                listComp.scrollTop = 0;
            }
            else {
                listComp.scrollTop = (currentFocus*itemHeight);
            }
        }

        //do the following for all type modes
        let inputNode = document.getElementById(_config.input.id);
        let inputValue = inputNode.value.trim();
        if (!utils.isEmpty(inputValue)) {
            if (isClosed) {
                _openList();
            }
        }
    }

    function _handleKeyDown(event) {
        let numItemsForScroll = parseInt(_config.numOpenItems);
        let listItemNodes = _getListItemNodes();

        //check the pressed key
        if (event.key == "Escape") {
            if (!isClosed) {
                _closeList();
            }
        }
        if (event.key == "ArrowDown") {
            if (isClosed) {
                _openList();
            }
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            if (currentFocus>=matchingItemsCounter) {
                currentFocus = matchingItemsCounter-1;
            }
            //scroll down
            _scrollByFocus(event, "down");
        }
        else if (event.key == "ArrowUp") { //up
            if (isClosed) {
                _openList();
            }
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            if (currentFocus<0) {
                currentFocus = 0;
            }
            //scroll up
            _scrollByFocus(event, "up");
        }
        if (event.key == "PageDown") {
            if (!isClosed) {
                currentFocus += numItemsForScroll;
                if (currentFocus>=matchingItemsCounter) {
                    currentFocus = matchingItemsCounter-1;
                }
                //scroll down
                _scrollByFocus(event, "down");
            }
        }
        if (event.key == "PageUp") {
            if (!isClosed) {
                currentFocus -= numItemsForScroll;
                if (currentFocus<0) {
                    currentFocus = 0;
                }
                //scroll up
                _scrollByFocus(event, "up");
            }
        }
        if (event.key == "Home") {
            if (!isClosed) {
                currentFocus = 0;
                //scroll down
                _scrollByFocus(event, "up");
            }
        }
        if (event.key == "End") {
            if (!isClosed) {
                currentFocus = matchingItemsCounter-1;
                //scroll up
                _scrollByFocus(event, "down");
            }
        }
        if (event.key == " ") {
            if (!isClosed) {
                if (currentFocus>-1) {
                    event.preventDefault();
                }
                if (currentFocus>-1 && currentFocus<matchingItemsCounter) {
                    //click on the "focused" item
                    if (listItemNodes!=null) {
                        if (_config.multiple) {
                            listItemNodes[currentFocus].children[1].click();
                        }
                        else {
                            listItemNodes[currentFocus].children[0].click();
                        }
                    }
                }
            }
        }
        else if (event.key == "Enter") {
            //If the ENTER key is pressed, prevent the form from being submitted
            event.preventDefault();
            if (isClosed) {
                _openList();
            }
            else {
                if (currentFocus>-1 && currentFocus<matchingItemsCounter) {
                    //click on the "focused" item
                    if (listItemNodes!=null) {
                        if (_config.multiple) {
                            listItemNodes[currentFocus].children[1].click();
                        }
                        else {
                            listItemNodes[currentFocus].children[0].click();
                        }
                    }
                }
            }
        }

        //refocus on the input
        _focusOnMainInput();
    }

    function _invokeOnChangeHandler() {
        //invoke the onchange function handler
        if (!utils.isEmpty(_config.onchange)) {
            let currValue = (_config.multiple ? selectedValues : (selectedValues.length<1 ? utils.getFromDom(_config.input.id).value : selectedValues[0]));
            if (utils.isString(_config.onchange)) {
                eval(_config.onchange + "('" + currValue + "')");
            }
            else if (utils.isFunction(_config.onchange)) {
                _config.onchange(currValue);
            }
        }
    }

    function _isMatch(dataItem) {
        //declare locals
        let match = false;
        let inputValue = utils.getFromDom(_config.input.id).value;
        let searchMode = _getSearchMode();
        let fieldsNames = _getListItemFieldsNames(dataItem);
        let field;
        let fieldValue;

        //check for valid values
        if (utils.isEmpty(inputValue)) {
            return true;
        }
        if (utils.isEmpty(fieldsNames)) {
            return true;
        }
        if (utils.isEmpty(dataItem)) {
            return false;
        }

        //check for a match
        if (searchMode.toLowerCase()=="startswith") {
            if (utils.isJson(dataItem)) {
                for (let i=0; i<fieldsNames.length; i++) {
                    field = fieldsNames[i];
                    if (dataItem.hasOwnProperty(field)) {
                        fieldValue = dataItem[field];
                        if (utils.isArray(fieldValue)) {
                            for (let j=0; j<fieldValue.length; i++) {
                                if (fieldValue[j].toLowerCase().startsWith(inputValue.toLowerCase())) {
                                    match = true;
                                    break;
                                }
                            }
                            if (match==true) {
                                break;
                            }
                        }
                        else {
                            fieldValue = String(fieldValue);
                            if (fieldValue.toLowerCase().startsWith(inputValue.toLowerCase())) {
                                match = true;
                                break;
                            }
                        }
                    }
                }
            }
            else if (utils.isArray(dataItem)) {
                for (let i=0; i<dataItem.length; i++) {
                    if (dataItem[i].toLowerCase().startsWith(inputValue.toLowerCase())) {
                        match = true;
                        break;
                    }
                }
            }
            else {
                dataItem = String(dataItem);
                if (dataItem.toLowerCase().startsWith(inputValue.toLowerCase())) {
                    match = true;
                }
            }
        }
        else if (searchMode.toLowerCase()=="endswith") {
            if (utils.isJson(dataItem)) {
                for (let i = 0; i < fieldsNames.length; i++) {
                    field = fieldsNames[i];
                    if (dataItem.hasOwnProperty(field)) {
                        fieldValue = dataItem[field];
                        if (utils.isArray(fieldValue)) {
                            for (let j=0; j<fieldValue.length; i++) {
                                if (fieldValue[j].toLowerCase().endsWith(inputValue.toLowerCase())) {
                                    match = true;
                                    break;
                                }
                            }
                            if (match==true) {
                                break;
                            }
                        }
                        else {
                            fieldValue = String(fieldValue);
                            if (fieldValue.toLowerCase().endsWith(inputValue.toLowerCase())) {
                                match = true;
                                break;
                            }
                        }
                    }
                }
            }
            else if (utils.isArray(dataItem)) {
                for (let i=0; i<dataItem.length; i++) {
                    if (dataItem[i].toLowerCase().endsWith(inputValue.toLowerCase())) {
                        match = true;
                        break;
                    }
                }
            }
            else {
                dataItem = String(dataItem);
                if (dataItem.toLowerCase().endsWith(inputValue.toLowerCase())) {
                    match = true;
                }
            }
        }
        else if (searchMode.toLowerCase()=="contains") {
            if (utils.isJson(dataItem)) {
                for (let i=0; i<fieldsNames.length; i++) {
                    field = fieldsNames[i];
                    if (dataItem.hasOwnProperty(field)) {
                        fieldValue = dataItem[field];
                        if (utils.isArray(fieldValue)) {
                            for (let j=0; j<fieldValue.length; i++) {
                                if (fieldValue[j].toLowerCase().indexOf(inputValue.toLowerCase())!=-1) {
                                    match = true;
                                    break;
                                }
                            }
                            if (match==true) {
                                break;
                            }
                        }
                        else {
                            fieldValue = String(fieldValue);
                            if (fieldValue.toLowerCase().indexOf(inputValue.toLowerCase())!=-1) {
                                match = true;
                                break;
                            }
                        }
                    }
                }
            }
            else if (utils.isArray(dataItem)) {
                for (let i=0; i<dataItem.length; i++) {
                    if (dataItem[i].toLowerCase().indexOf(inputValue.toLowerCase())!=-1) {
                        match = true;
                        break;
                    }
                }
            }
            else {
                dataItem = String(dataItem);
                if (dataItem.toLowerCase().indexOf(inputValue.toLowerCase())!=-1) {
                    match = true;
                }
            }
        }

        //return the method's value
        return match;
    }

    function _openList() {
        let listId = _config.list.id;
        let listContainerNode = document.getElementById(listId);
        let listBodyId = _getListBodyId();
        let listBodyNode = document.getElementById(listBodyId);
        let inputNode = document.getElementById(_config.input.id);
        let buttonIconId = _getButtonIconId();
        let buttonIconNode = document.getElementById(buttonIconId);
        let listItemHeight = _getListItemHeight();
        let listHeight = _getListHeight();
        let animationHeight = _getListAnimationHeight();
        isClosed = false;
        let buttonIcon = _getButtonIcon();
        if (uiCompsUtils.show(_config.list.header)) {
            listHeight -= listItemHeight;
        }
        if (!utils.isEmpty(listBodyNode)) {
            if (listContainerNode.style.display==null || listContainerNode.style.display==undefined || listContainerNode.style.display=="" || listContainerNode.style.display=="none") {
                domUtils.setStyle(listBodyId, "height:0px");
                domUtils.setStyle(listId, "height:0px");
                listContainerNode.style.display = "block";
                if (_config.button.animate) {
                    buttonIconNode.animate([{"transform": "none"},{"transform": "rotate(180deg)"}], _config.button.animationDuration);
                }
                if (_config.list.animate) {
                    listBodyNode.animate({"height":listHeight+"px"},_config.list.animationDuration);
                    listContainerNode.animate({"height":animationHeight+"px"},_config.list.animationDuration);
                }

                setTimeout(function() {
                    buttonIconNode.innerHTML = buttonIcon;
                    isClosed = false;
                    _config.state = "open";
                    domUtils.setStyle(listBodyId, "height:"+listHeight+"px");
                    domUtils.setStyle(listId, "height:"+animationHeight+"px");
                    console.debug("_openList(): listContainerHeight=["+animationHeight+"] listBodyHeight=["+listHeight+"] _config.state=["+_config.state+"] list.header.display=["+_config.list.header.display+"]");
                }, _config.list.animationDuration);
            }
        }
        if (!utils.isEmpty(inputNode)) {
            //focus on the input
            inputNode.focus();
        }
    }

    function _removeActive() {
        let listItemNodes = _getListItemNodes();

        //check for valid values
        if (listItemNodes==null) {
            return;
        }

        //loop through the nodes and remove the active class
        for (let i = 0; i < listItemNodes.length; i++) {
            listItemNodes[i].classList.remove(_getItemClass()+"-hover");
        }
    }

    function _removeSelectedValue(selectedValue) {
        let methodName = "_removeSelectedValue(): ";
        let selectionNodeId = "selItem_"+selectedValue;
        let selectionNode;
        let inputNode = document.getElementById(_config.input.id);
        let selectedPanel = utils.getFromDom(_config.selectedPanel.body.id);
        let checkboxId = "cb_"+selectedValue;
        let checkboxNode;

        //check if the item exists in the array
        if (!utils.isString(selectedValue)) {
            return;
        }
        console.debug(methodName + "selectedValue=["+selectedValue+"]");

        //update the header text
        _updateSelectedPanelHeaderText();

        //get the check box node if exists
        if (utils.isInDom(checkboxId)) {
            checkboxNode = utils.getFromDom(checkboxId)
            //uncheck the checkbox
            checkboxNode.checked = false;
        }
        if (uiCompsUtils.show(_config.selectedPanel)) {
            if (utils.isInDom(selectionNodeId)) {
                //get the node
                selectionNode = utils.getFromDom(selectionNodeId);
                //remove the node from the selectionPanel
                selectedPanel.removeChild(selectionNode);
            }
        }

        //clear the input if necessary
        if (!_config.multiple) {
            inputNode.value = "";
            _renderListItems();
        }

        //refocus on the input
        _focusOnMainInput();
    }

    function _render() {
        //declare locals
        let methodName = "Autocomplete._render(): ";
        let parentNode = uiCompsUtils.getRenderTo(_config);
        let logMessage;
        let containerId;
        let container;
        let elemId = _getId();
        _config.tagName = "div";
        _config.id = elemId;
        let inputId = _getInputId();
        let buttonId = _getButtonId();
        let listPanelId = _getListPanelId();
        let listBodyId = _getListBodyId();
        let resultsPanelId = _getResultsPanelId();
        let selectedPanelId = _getSelectedPanelId();
        _config.input.id = inputId;
        _config.button.id = buttonId;
        let buttonIconId = _getButtonIconId();
        _config.button.icon.id = buttonIconId;
        _config.list.id = listPanelId;
        _config.list.body.id = listBodyId;
        _config.resultsPanel.id = resultsPanelId;
        _config.selectedPanel.id = selectedPanelId;
        let selectedPanelHeaderId = _getSelectedPanelHeaderId();
        let selectedPanelBodyId = _getSelectedPanelBodyId();
        _config.selectedPanel.header.id = selectedPanelHeaderId;
        _config.selectedPanel.body.id = selectedPanelBodyId;
        let buttonIcon = _getButtonIcon();
        let elemClass = _getClass();
        let inputClass = _getInputClass();
        let buttonClass = _getButtonClass();
        let listPanelClass = _getListPanelClass();
        let resultsPanelClass = _getResultsPanelClass();
        let selectedPanelClass = _getSelectedPanelClass();
        let selectedPanelHeaderClass = _getSelectedPanelHeaderClass();
        let selectedPanelBodyClass = _getSelectedPanelBodyClass();
        let defaultClass;
        let currClassName;
        let cssTagId = domUtils.getCssTagId(_config);
        let direction = uiCompsUtils.getConfigDirection(_config);
        _config.direction = direction;
        let floatValue = (direction=="ltr") ? "float: left;" : "float: right;";
        let floatValueOposite = (direction=="ltr") ? "float: right;" : "float: left;";
        let marginValue = (direction=="ltr" ? "margin-right: 5px;" : "margin-left: 5px;");
        let buttonPaddingValue = (direction=="ltr" ? "padding-right: 30px;" : "padding-left: 30px;");
        let paddingValue = (direction=="ltr" ? "padding-left: 6px;" : "padding-right: 6px;");

        //remove the component if it exists in the DOM
        uiCompsUtils.removeChildNode(parentNode, _config.id);

        //set the container
        containerId = _config.renderTo;
        if (utils.isEmpty(containerId) || containerId === "body") {
            container = document.getElementsByTagName("body")[0];
        } else {
            if (!utils.isInDom(containerId)) {
                logMessage = "containerId=[" + containerId + "] is NOT in DOM !!";
                console.error(methodName + logMessage);
                return;
            }
            container = utils.getFromDom(containerId);
        }

        //check for valid values
        if (container == null || container == undefined || container == "undefined") {
            logMessage = "container is null !!";
            console.error(methodName + logMessage);
            return;
        }

        //render the component's css
        let jsonCss = _getCss();
        html5Utils.renderCss(jsonCss, cssTagId);
        jsonCss = _getInputCss();
        html5Utils.renderCss(jsonCss, cssTagId);
        jsonCss = _getButtonCss();
        html5Utils.renderCss(jsonCss, cssTagId);
        jsonCss = _getButtonIconCss();
        html5Utils.renderCss(jsonCss, cssTagId);
        jsonCss = _getListPanelCss();
        html5Utils.renderCss(jsonCss, cssTagId);
        jsonCss = _getListBodyCss();
        html5Utils.renderCss(jsonCss, cssTagId);
        jsonCss = _getItemCss();
        html5Utils.renderCss(jsonCss, cssTagId);
        jsonCss = _getMatchCss();
        html5Utils.renderCss(jsonCss, cssTagId);
        if (uiCompsUtils.show(_config.resultsPanel)) {
            jsonCss = _getResultsPanelCss();
            html5Utils.renderCss(jsonCss, cssTagId);
        }
        if (uiCompsUtils.show(_config.selectedPanel)) {
            jsonCss = _getSelectedPanelCss();
            html5Utils.renderCss(jsonCss, cssTagId);
            if (uiCompsUtils.show(_config.selectedPanel.header)) {
                jsonCss = _getSelectedPanelHeaderCss();
                html5Utils.renderCss(jsonCss, cssTagId);
                if (uiCompsUtils.show(_config.selectedPanel.header.selectAllButton)) {
                    jsonCss = _getSelectedPanelSelectAllButtonCss();
                    html5Utils.renderCss(jsonCss, cssTagId);
                }
                if (uiCompsUtils.show(_config.selectedPanel.header.clearAllButton)) {
                    jsonCss = _getSelectedPanelClearAllButtonCss();
                    html5Utils.renderCss(jsonCss, cssTagId);
                }
            }
            jsonCss = _getSelectedPanelBodyCss();
            html5Utils.renderCss(jsonCss, cssTagId);
            jsonCss = _getSelectedItemCss();
            html5Utils.renderCss(jsonCss, cssTagId);
            jsonCss = _getSelectedItemCloseButtonCss();
            html5Utils.renderCss(jsonCss, cssTagId);
        }

        //render the wrapper node
        defaultClass = _getClassDefault();
        currClassName = uiCompsUtils.getMergedClass(defaultClass, elemClass);
        let wrapperNode = document.createElement(_config.tagName);
        html5Utils.setNodeAttributes(wrapperNode, _config.tagName, _config, null);
        wrapperNode.setAttribute("id", elemId);
        wrapperNode.setAttribute("class", currClassName);
        domUtils.setStyle(wrapperNode, "direction: "+direction+";position: relative;display: inline-block;outline: none");

        //render the input node
        defaultClass = _getInputClassDefault();
        currClassName = uiCompsUtils.getMergedClass(defaultClass, inputClass);
        let inputNode = document.createElement("input");
        html5Utils.setNodeAttributes(inputNode, "input", _config.input, null);
        inputNode.setAttribute("id", inputId);
        inputNode.setAttribute("class", currClassName);
        domUtils.setStyle(inputNode, "padding: 10px;border: none;outline: none;background-color: transparent;width: 100%;color: inherit; font-size: inherit, font-family: inherit;");
        inputNode.setAttribute("placeholder", _getPlaceholder());
        if (!utils.isEmpty(currentInputValue)) {
            inputNode.setAttribute("value", currentInputValue);
        }
        inputNode.addEventListener("focus", function() {
            _handleCompFocus();
        });
        inputNode.addEventListener("blur", function() {
            _handleCompBlur();
        });
        inputNode.addEventListener("input", function(e) {
            _handleInput(e);
        });
        inputNode.addEventListener("keydown", function(e) {
            _handleKeyDown(e);
        });
        inputNode.addEventListener("change", function () {
            //invoke the onchange function handler
            _invokeOnChangeHandler();
        });
        let inputWrapperNode = document.createElement(_config.tagName);
        domUtils.setStyle(inputWrapperNode, floatValue+"width: calc(100% - 46px);");
        inputWrapperNode.appendChild(inputNode);

        let splitterNode = document.createElement(_config.tagName);
        html5Utils.setNodeAttributes(splitterNode, _config.tagName, _config.splitter, null);
        domUtils.setStyle(splitterNode, floatValue+marginValue+"width:5px;background-color:transparent;color:#aaaaaa;font-size:28px;");
        splitterNode.innerHTML = "|";

        //render the button node
        defaultClass = _getButtonClassDefault();
        currClassName = uiCompsUtils.getMergedClass(defaultClass, buttonClass);
        let buttonNode = document.createElement("button");
        html5Utils.setNodeAttributes(buttonNode, "button", _config.button, null);
        buttonNode.setAttribute("id", buttonId);
        buttonNode.setAttribute("class", currClassName);
        buttonNode.setAttribute("type", "button");
        domUtils.setStyle(buttonNode, marginValue+"border: none;outline: none;background-color: transparent;margin-top: -3px;");
        buttonNode.addEventListener("click", function() {
            _toggleList();
        });
        if (!utils.isEmpty(_config.button.hoverClass)) {
            buttonNode.addEventListener("mouseover", function() {
                this.classList.add(_config.button.hoverClass);
            });
            buttonNode.addEventListener("mouseout", function() {
                this.classList.remove(_config.button.hoverClass);
            });
        }
        buttonNode.addEventListener("focus", function() {
            _handleCompFocus();
            if (!utils.isEmpty(_config.button.focusClass)) {
                this.classList.add(_config.button.focusClass);
            }
        });
        buttonNode.addEventListener("blur", function() {
            _handleCompBlur();
            if (!utils.isEmpty(_config.button.focusClass)) {
                this.classList.remove(_config.button.focusClass);
            }
        });
        let iconColor = getComputedStyle(buttonNode).color;
        let iconNode = uiCompsUtils.createIconNode(buttonIconId, buttonIcon, iconColor);
        //html5Utils.setNodeAttributes(iconNode, iconNode.tagName, _config.button.icon, null);
        domUtils.setStyle(iconNode, _config.button.icon.style);
        buttonNode.appendChild(iconNode);

        let buttonWrapperNode = document.createElement(_config.tagName);
        domUtils.setStyle(buttonWrapperNode, floatValueOposite);
        buttonWrapperNode.appendChild(buttonNode);

        //render the list panel node
        defaultClass = _getListPanelClassDefault();
        currClassName = uiCompsUtils.getMergedClass(defaultClass, listPanelClass);
        let listPanelNode = document.createElement(_config.tagName);
        html5Utils.setNodeAttributes(listPanelNode, _config.tagName, _config.list, null);
        listPanelNode.setAttribute("id", listPanelId);
        listPanelNode.setAttribute("class", currClassName);
        domUtils.setStyle(listPanelNode, "position: absolute;border-width: 2px; border-style: solid; border-top: none; outline: none;z-index: 999;top: 105%;left: 0px;right: 0px;width: 100%;display: none;");

        let fieldsNames;
        let fieldsHeaders;
        let listItemHeaderRowWrapperNode;
        let listItemHeaderNode
        let listItemHeaderTextNode
        let listItemHeaderSortNode
        let sortButtonHoverClassName = _getItemClass()+"_sortButton-hover";
        let sortButtonFocusClassName = _getItemClass()+"_sortButton-focus";

        //get the fields names and headers
        if (utils.isEmpty(_config.options.valueFieldName)) {
            _config.options.valueFieldName = "value";
        }
        fieldsNames = _getListItemFieldsNames(_config.options.data[0]);
        fieldsHeaders = _getListItemFieldsHeaders(_config.options.data[0]);
        if (utils.isEmpty(fieldsHeaders) || !utils.isArray(fieldsHeaders) || fieldsHeaders.length!=fieldsNames.length) {
            fieldsHeaders = fieldsNames;
        }

        //render the list's header fields
        if (uiCompsUtils.show(_config.list.header)) {
            let cbWidth = _getListItemCheckboxWidth();
            listItemHeaderRowWrapperNode = document.createElement("div");
            listItemHeaderRowWrapperNode.setAttribute("class", _getItemClass()+"-header");
            listItemHeaderRowWrapperNode.setAttribute("style", "width: 100%;");
            if (_config.multiple) {
                listItemHeaderNode = document.createElement("div");
                listItemHeaderNode.setAttribute("style", floatValue+"width: "+cbWidth+"px;");
                listItemHeaderNode.setAttribute("class", _getItemClass()+"-headerfield");
                listItemHeaderNode.innerHTML = "";
                listItemHeaderRowWrapperNode.appendChild(listItemHeaderNode);
            }

            for (let j=0; j<fieldsHeaders.length; j++) {
                let fieldHeader = fieldsHeaders[j];
                //render the current column node
                let widthCalc = _getListItemHeaderWidth(fieldsHeaders, j);
                listItemHeaderNode = document.createElement("div");
                listItemHeaderNode.setAttribute("style", floatValue+paddingValue+"width: " + widthCalc);
                listItemHeaderNode.setAttribute("class", _getItemClass()+"-headerfield");
                listItemHeaderTextNode = document.createElement("div");
                listItemHeaderTextNode.setAttribute("style", floatValue);
                listItemHeaderTextNode.setAttribute("title", fieldHeader);
                listItemHeaderTextNode.innerHTML = fieldHeader;
                listItemHeaderNode.appendChild(listItemHeaderTextNode);
                if (_config.allowSort) {
                    listItemHeaderSortNode = document.createElement("button");
                    listItemHeaderSortNode.setAttribute("id", fieldHeader+"_sort");
                    listItemHeaderSortNode.setAttribute("type", "button");
                    html5Utils.setNodeAttributes(listItemHeaderSortNode, listItemHeaderSortNode.tagName, _config.list.header.sortButton, null);
                    listItemHeaderSortNode.setAttribute("style", floatValue);
                    listItemHeaderSortNode.setAttribute("class", _getItemClass()+"-sortButton");
                    listItemHeaderSortNode.addEventListener("mouseover", function () {
                        this.classList.add(sortButtonHoverClassName);
                    });
                    listItemHeaderSortNode.addEventListener("mouseout", function () {
                        this.classList.remove(sortButtonHoverClassName);
                    });
                    listItemHeaderSortNode.addEventListener("focus", function () {
                        this.classList.add(sortButtonFocusClassName);
                    });
                    listItemHeaderSortNode.addEventListener("blur", function () {
                        this.classList.remove(sortButtonFocusClassName);
                    });
                    listItemHeaderSortNode.addEventListener("click", function () {
                        let currField = this.id.substring(0, this.id.indexOf("_sort"));
                        if (currentSortOrder=="asc") {
                            currentSortOrder = "desc";
                        }
                        else {
                            currentSortOrder = "asc";
                        }
                        _sort(currentSortOrder, currField);
                        let currButtonIcon = _getButtonIconSort(currentSortOrder);
                        this.innerHTML = currButtonIcon;
                        _renderListItems();
                    });
                    listItemHeaderSortNode.innerHTML = _getButtonIconSort(currentSortOrder);
                    listItemHeaderNode.appendChild(listItemHeaderSortNode);
                }
                listItemHeaderRowWrapperNode.appendChild(listItemHeaderNode);
            }
            listPanelNode.appendChild(listItemHeaderRowWrapperNode);
        }

        let listBodyNode = document.createElement(_config.tagName);
        listBodyNode.setAttribute("id", listBodyId);
        listBodyNode.setAttribute("class", "listBody");
        domUtils.setStyle(listBodyNode, "overflow-x: hidden;overflow-y: auto;display: block;");

        //declare two optional nodes
        let resultsPanelNode;
        let selectedPanelNode;
        let selectedPanelHeaderNode;
        let selectedPanelBodyNode;

        //render the results panel node
        if (uiCompsUtils.show(_config.resultsPanel)) {
            defaultClass = _getResultsPanelClassDefault();
            currClassName = uiCompsUtils.getMergedClass(defaultClass, resultsPanelClass);
            resultsPanelNode = document.createElement(_config.tagName);
            html5Utils.setNodeAttributes(resultsPanelNode, _config.tagName, _config.resultsPanel, null);
            resultsPanelNode.setAttribute("id", resultsPanelId);
            resultsPanelNode.setAttribute("class", currClassName);
            domUtils.setStyle(resultsPanelNode, "width: 100%;padding-top: 5px;");
            let inputResultsNode = document.createElement("input");
            inputResultsNode.setAttribute("type", "text");
            inputResultsNode.setAttribute("readonly", "readonly");
            inputResultsNode.setAttribute("value", "");
            domUtils.setStyle(inputResultsNode, "padding-left: 5px;padding-right: 5px;width: 99%; outline: none; border: none;background-color: inherit; color: inherit; font-family: inherit; font-size: inherit; font-weight: inherit;text-overflow: ellipsis;");
            resultsPanelNode.innerHTML = "";
            resultsPanelNode.appendChild(inputResultsNode);
        }

        //render the selected panel node
        if (uiCompsUtils.show(_config.selectedPanel)) {
            let selectedPanelHeaderTextNodeOrigWidth = 95;
            let selectedPanelButtonWidth = 25;
            let selectedPanelAllButtonsWidth = 0;
            defaultClass = _getSelectedPanelClassDefault();
            currClassName = uiCompsUtils.getMergedClass(defaultClass, selectedPanelClass);
            selectedPanelNode = document.createElement(_config.tagName);
            html5Utils.setNodeAttributes(selectedPanelNode, _config.tagName, _config.selectedPanel, null);
            selectedPanelNode.setAttribute("id", selectedPanelId);
            selectedPanelNode.setAttribute("class", currClassName);
            domUtils.setStyle(selectedPanelNode, "padding-left: 5px;padding-right: 5px;width: 100%;padding-top: 5px;");
            if (uiCompsUtils.show(_config.selectedPanel.header)) {
                selectedPanelHeaderNode = document.createElement(_config.tagName);
                html5Utils.setNodeAttributes(selectedPanelHeaderNode, _config.tagName, _config.selectedPanel.header, null);
                defaultClass = _getSelectedPanelHeaderClassDefault();
                currClassName = uiCompsUtils.getMergedClass(defaultClass, selectedPanelHeaderClass);
                selectedPanelHeaderNode.setAttribute("id", selectedPanelHeaderId);
                selectedPanelHeaderNode.setAttribute("class", currClassName);
                let selectedPanelHeaderTextNode = document.createElement("input");
                let headerText = "Selected # {items} of ##";
                selectedPanelHeaderTextNode.setAttribute("id", selectedPanelHeaderId+"_txt");
                selectedPanelHeaderTextNode.setAttribute("type", "text");
                selectedPanelHeaderTextNode.setAttribute("readonly", "readonly");
                if (utils.isString(_config.selectedPanel.header.text)) {
                    headerText = _config.selectedPanel.header.text;
                }
                headerText = _resolveExpression(headerText,_config.resultsPanel.itemWord,_config.resultsPanel.itemsWord,selectedValues.length,_config.options.data.length);
                selectedPanelHeaderTextNode.setAttribute("value", headerText);
                selectedPanelHeaderTextNode.setAttribute("title", headerText);
                domUtils.setStyle(selectedPanelHeaderTextNode, "width:"+selectedPanelHeaderTextNodeOrigWidth+"%; outline: none; border: none;background-color: inherit; color: inherit; font-family: inherit; font-size: inherit; font-weight: inherit;text-overflow: ellipsis;");
                selectedPanelHeaderNode.innerHTML = "";
                selectedPanelHeaderNode.appendChild(selectedPanelHeaderTextNode);
                if (uiCompsUtils.show(_config.selectedPanel.header.clearAllButton)) {
                    let buttonNodeClearAll = document.createElement("button");
                    html5Utils.setNodeAttributes(buttonNodeClearAll, _config.tagName, _config.selectedPanel.header.clearAllButton, null);
                    defaultClass = _getSelectedPanelClearAllButtonClassDefault();
                    currClassName = uiCompsUtils.getMergedClass(defaultClass, _getSelectedPanelClearAllButtonClass());
                    buttonNodeClearAll.setAttribute("class", currClassName);
                    buttonNodeClearAll.setAttribute("type", "button");
                    domUtils.setStyle(buttonNodeClearAll, "margin-right:4px;");
                    buttonNodeClearAll.innerHTML = "&#10008";
                    if (_config.selectedPanel.header.clearAllButton.hasOwnProperty("icon")) {
                        if (utils.isString(_config.selectedPanel.header.clearAllButton.icon)) {
                            buttonNodeClearAll.innerHTML = _config.selectedPanel.header.clearAllButton.icon;
                        }
                    }
                    buttonNodeClearAll.addEventListener("click", function () {
                        _clearAllSelected();
                    });
                    selectedPanelHeaderNode.appendChild(buttonNodeClearAll);
                    selectedPanelAllButtonsWidth += selectedPanelButtonWidth;
                    selectedPanelHeaderTextNode.style.width = "calc("+selectedPanelHeaderTextNodeOrigWidth+"% - "+selectedPanelAllButtonsWidth+"px)";
                }
                if (uiCompsUtils.show(_config.selectedPanel.header.selectAllButton)) {
                    let buttonNodeSelectAll = document.createElement("button");
                    html5Utils.setNodeAttributes(buttonNodeSelectAll, _config.tagName, _config.selectedPanel.header.selectAllButton, null);
                    defaultClass = _getSelectedPanelSelectAllButtonClassDefault();
                    currClassName = uiCompsUtils.getMergedClass(defaultClass, _getSelectedPanelSelectAllButtonClass());
                    buttonNodeSelectAll.setAttribute("class", currClassName);
                    buttonNodeSelectAll.setAttribute("type", "button");
                    domUtils.setStyle(buttonNodeSelectAll, "margin-right:4px;");
                    buttonNodeSelectAll.innerHTML = "&#10004";
                    if (_config.selectedPanel.header.selectAllButton.hasOwnProperty("icon")) {
                        if (utils.isString(_config.selectedPanel.header.selectAllButton.icon)) {
                            buttonNodeSelectAll.innerHTML = _config.selectedPanel.header.selectAllButton.icon;
                        }
                    }
                    buttonNodeSelectAll.addEventListener("click", function () {
                        _selectAll();
                    });
                    selectedPanelHeaderNode.appendChild(buttonNodeSelectAll);
                    selectedPanelAllButtonsWidth += selectedPanelButtonWidth;
                    selectedPanelHeaderTextNode.style.width = "calc("+selectedPanelHeaderTextNodeOrigWidth+"% - "+selectedPanelAllButtonsWidth+"px)";
                }
                selectedPanelNode.appendChild(selectedPanelHeaderNode);
            }
            selectedPanelBodyNode = document.createElement(_config.tagName);
            html5Utils.setNodeAttributes(selectedPanelBodyNode, _config.tagName, _config.selectedPanel.body, null);
            defaultClass = _getSelectedPanelBodyClassDefault();
            currClassName = uiCompsUtils.getMergedClass(defaultClass, selectedPanelBodyClass);
            selectedPanelBodyNode.setAttribute("id", selectedPanelBodyId);
            selectedPanelBodyNode.setAttribute("class", currClassName);
            domUtils.setStyle(selectedPanelBodyNode, "width:100%;overflow-x:hidden;overflow-y:auto;");
            selectedPanelNode.appendChild(selectedPanelBodyNode);

            //check for the showResults panel
            if (uiCompsUtils.show(_config.resultsPanel)) {
                if (_getAlignment(_config.resultsPanel)=="top" && _getAlignment(_config.selectedPanel)=="top") {
                    listPanelNode.appendChild(resultsPanelNode);
                    listPanelNode.appendChild(selectedPanelNode);
                    listPanelNode.appendChild(listBodyNode);
                }
                else {
                    if (_getAlignment(_config.resultsPanel)=="top") {
                        listPanelNode.appendChild(resultsPanelNode);
                        listPanelNode.appendChild(listBodyNode);
                        listPanelNode.appendChild(selectedPanelNode);
                    }
                    else if (_getAlignment(_config.selectedPanel)=="top") {
                        listPanelNode.appendChild(selectedPanelNode);
                        listPanelNode.appendChild(listBodyNode);
                        listPanelNode.appendChild(resultsPanelNode);
                    }
                    else {
                        listPanelNode.appendChild(listBodyNode);
                        listPanelNode.appendChild(selectedPanelNode);
                        listPanelNode.appendChild(resultsPanelNode);
                    }
                }
            }
            else {
                //check the component's alignment
                if (_getAlignment(_config.selectedPanel)=="top") {
                    listPanelNode.appendChild(selectedPanelNode);
                    listPanelNode.appendChild(listBodyNode);
                }
                else {
                    listPanelNode.appendChild(listBodyNode);
                    listPanelNode.appendChild(selectedPanelNode);
                }
            }
        }
        else if (uiCompsUtils.show(_config.resultsPanel)) {
            //check the component's alignment
            if (_getAlignment(_config.resultsPanel)=="top") {
                listPanelNode.appendChild(resultsPanelNode);
                listPanelNode.appendChild(listBodyNode);
            }
            else {
                listPanelNode.appendChild(listBodyNode);
                listPanelNode.appendChild(resultsPanelNode);
            }
        }
        else {
            listPanelNode.appendChild(listBodyNode);
        }

        //append the element to the container
        wrapperNode.appendChild(inputWrapperNode);
        if (uiCompsUtils.show(_config.splitter)) {
            wrapperNode.appendChild(splitterNode);
        }
        wrapperNode.appendChild(buttonWrapperNode);
        wrapperNode.appendChild(listPanelNode);
        container.appendChild(wrapperNode);

        //set other attributes for some DOM nodes
        listPanelNode.style["border-color"] = _getComponentBackgroundColor();

        //render child elements
        if (uiCompsUtils.show(_config.resultsPanel)) {
            html5Utils.renderChildren(_config.resultsPanel.children, _config.resultsPanel.id, cssTagId);
        }
        if (uiCompsUtils.show(_config.selectedPanel)) {
            html5Utils.renderChildren(_config.selectedPanel.children, _config.selectedPanel.id, cssTagId);
            //set the selectedPanel's height dynamically
            let currHeight;
            let paddings = 10;
            if (uiCompsUtils.show(_config.selectedPanel.header)) {
                currHeight = parseInt(getComputedStyle(selectedPanelBodyNode).height)+ parseInt(getComputedStyle(selectedPanelHeaderNode).height)+paddings+"px";
            }
            else {
                currHeight = parseInt(getComputedStyle(selectedPanelBodyNode).height)+paddings+"px";
            }
            if (!utils.isEmpty(currHeight)) {
                selectedPanelNode.style.height = currHeight;
            }
        }

        //render the list items
        _renderListItems();

        //render the component's state (open or closed - default is closed)
        if (_getState()=="open") {
            _openList();
        }

        //render the selected items
        if (!_config.multiple) {
            //reset the array
            selectedValues = [];
        }
        if (utils.isArray(selectedValues) && selectedValues.length>0) {
            for (let i=0; i<selectedValues.length; i++) {
                _renderSelectedValue(selectedValues[i]);
            }
        }
    }

    function _renderListItems() {
        let methodName = "_renderListItems(): ";
        let direction = uiCompsUtils.getConfigDirection(_config);
        let listBodyId = _getListBodyId();
        let fieldsNames = _config.list.body.item.fields;
        let inputNode;
        let listBody;
        let isMatch;
        let renderLine;
        let listItem;
        let checkboxWrapperNode;
        let checkboxNode;
        let checkboxWidth = _getListItemCheckboxWidth();
        let listItemRowWrapperNode;
        let hiddenInputNode;
        let listItemFieldNode
        let currDataItem;
        let valueFieldName;
        let valueFieldValue;
        let tooltipFieldName;
        let tooltipFieldValue;
        let currDataItemDecoratedMatch;
        let matchStartIndex;
        let inputValue;
        let currHeight;
        let paddingValue;
        let floatValue;
        if (direction=="ltr") {
            paddingValue = "padding-left: 6px;";
            floatValue = "float: left;";
        }
        else {
            paddingValue = "padding-right: 6px;";
            floatValue = "float: right;";
        }
        matchingItemsCounter = 0;

        //check for valid values
        if (utils.isEmpty(_config.options)) {
            console.error(methodName + "_config.options is empty or null !!");
            return;
        }
        if (!utils.isJson(_config.options)) {
            console.error(methodName + "_config.options is NOT a valid json !!");
            return;
        }
        if (!_config.options.hasOwnProperty("data")) {
            console.error(methodName + "_config.options.data is missing !!");
            return;
        }
        if (utils.isEmpty(_config.options.data)) {
            console.error(methodName + "_config.options.data is empty or null !!");
            return;
        }
        if (!utils.isArray(_config.options.data)) {
            console.error(methodName + "_config.options.data is NOT a valid array !!");
            return;
        }
        if (_config.options.data.length<1) {
            console.error(methodName + "_config.options.data has no items !!");
            return;
        }
        if (!utils.isInDom(_config.input.id)) {
            console.error(methodName + "_config.input.id=["+_config.input.id+"] is NOT in DOM !!");
            return;
        }
        if (!utils.isInDom(_config.list.id)) {
            console.error(methodName + "_config.list.id=["+_config.list.id+"] is NOT in DOM !!");
            return;
        }
        if (!utils.isInDom(listBodyId)) {
            console.error(methodName + "listBodyId=["+listBodyId+"] is NOT in DOM !!");
            return;
        }

        //get the input node's value
        inputNode = document.getElementById(_config.input.id);
        inputValue = inputNode.value.trim();
        currentInputValue = inputValue;

        //get the component's type mode
        let typeMode = _getTypeMode();

        //empty the list's body
        listBody = document.getElementById(listBodyId);
        listBody.innerHTML = "";

        //set the fields names
        if (utils.isEmpty(_config.options.valueFieldName)) {
            _config.options.valueFieldName = "value";
        }
        fieldsNames = _getListItemFieldsNames(_config.options.data[0]);

        /*for each item in the array...*/
        for (let i = 0; i < _config.options.data.length; i++) {
            //get the current item
            currDataItem = _config.options.data[i];
            valueFieldValue = null;
            matchStartIndex = -1;
            isMatch = false;
            renderLine = false;
            currDataItemDecoratedMatch = null;

            //check for a string or a json
            if (utils.isString(currDataItem)) {
                valueFieldName = "value";
                valueFieldValue = currDataItem;
                currDataItem = {};
                currDataItem[valueFieldName] = valueFieldValue;
            }
            else if (utils.isJson(currDataItem)) {
                valueFieldName = jsonUtils.getName(currDataItem, _config.options.valueFieldName);
                if (currDataItem.hasOwnProperty(valueFieldName)) {
                    valueFieldValue = currDataItem[valueFieldName];
                }
                tooltipFieldName = jsonUtils.getName(currDataItem, _config.options.tooltipFieldName);
                if (currDataItem.hasOwnProperty(tooltipFieldName) && utils.isString(currDataItem[tooltipFieldName])) {
                    tooltipFieldValue = currDataItem[tooltipFieldName];
                }
            }
            else {
                continue;
            }

            //check for valid values
            if (utils.isEmpty(valueFieldName) || utils.isEmpty(valueFieldValue)) {
                continue;
            }

            //check for a match
            isMatch = _isMatch(currDataItem);
            if (isMatch) {
                //get the current data item decorated
                currDataItemDecoratedMatch = _getMatchDataItemDecorated(currDataItem);
                renderLine = true;
            }
            else {
                currDataItemDecoratedMatch = currDataItem;
            }

            //check the type mode
            if (typeMode=="focusonfirst") {
                renderLine = true;
            }

            /*check if the item is a match:*/
            if (renderLine) {
                matchingItemsCounter++;
                /*create a DIV element for each matching element:*/
                listItem = document.createElement("div");
                /*make the matching letters bold:*/
                listItem.setAttribute("class", _getItemClass());
                listItem.setAttribute("style", "");
                listItem.innerHTML = "";

                //render a checkbox node for multiple selection configuration
                if (_config.multiple) {
                    checkboxWrapperNode = document.createElement("div");
                    checkboxWrapperNode.setAttribute("class", _getItemClass()+"-checkbox");
                    checkboxWrapperNode.setAttribute("style", floatValue+paddingValue+"padding-top: 5px;width: "+checkboxWidth+"px;height: 100%;");
                    checkboxNode = document.createElement("input");
                    checkboxNode.setAttribute("id", "cb_"+valueFieldValue);
                    checkboxNode.setAttribute("type", "checkbox");
                    //checkboxNode.setAttribute("class", _getItemClass()+"-checkbox");
                    checkboxNode.setAttribute("style", "position: relative;");
                    checkboxNode.setAttribute("value", valueFieldValue);
                    if (utils.isInArray(valueFieldValue, selectedValues)) {
                        checkboxNode.setAttribute("checked", "checked");
                    }
                    checkboxNode.addEventListener("change", function () {
                        _toggleSelectedItem(this.value, !this.checked);
                    });
                    checkboxWrapperNode.appendChild(checkboxNode)
                    listItem.appendChild(checkboxWrapperNode);
                }

                //create a wrapper node
                listItemRowWrapperNode = document.createElement("div");
                if (utils.isString(tooltipFieldValue)) {
                    listItemRowWrapperNode.setAttribute("title", tooltipFieldValue);
                }
                if (_config.multiple) {
                    listItemRowWrapperNode.setAttribute("style", floatValue+"height: 100%;width: calc(100% - "+checkboxWidth+"px);");
                }
                else {
                    listItemRowWrapperNode.setAttribute("style", floatValue+"height: 100%;width: 100%;");
                }

                //render a hidden input node for each line
                hiddenInputNode = document.createElement("input");
                hiddenInputNode.setAttribute("id", "txt_"+valueFieldValue);
                hiddenInputNode.setAttribute("type", "hidden");
                hiddenInputNode.setAttribute("value", valueFieldValue);
                listItemRowWrapperNode.appendChild(hiddenInputNode);

                //render the list's fields
                for (let j=0; j<fieldsNames.length; j++) {
                    let field = fieldsNames[j];
                    if (currDataItemDecoratedMatch.hasOwnProperty(field)) {
                        //render the current column node
                        listItemFieldNode = document.createElement("div");
                        listItemFieldNode.setAttribute("style", floatValue+paddingValue+"width: calc(100% / " + fieldsNames.length + ");");
                        listItemFieldNode.setAttribute("class", _getItemClass()+"-field");
                        listItemFieldNode.setAttribute("title", currDataItemDecoratedMatch[field]);
                        listItemFieldNode.innerHTML = currDataItemDecoratedMatch[field];
                        listItemRowWrapperNode.appendChild(listItemFieldNode);
                    }
                }

                //add a 'click' event listener on the row wrapper node
                listItemRowWrapperNode.addEventListener("click", function(e) {
                    let selectedValue;
                    let cbChecked = false;

                    //add a selection item
                    if (_config.multiple) {
                        selectedValue = this.parentNode.getElementsByTagName("input")[1].value;
                        cbChecked = utils.getFromDom("cb_"+selectedValue).checked;
                    }
                    else {
                        selectedValue = this.parentNode.getElementsByTagName("input")[0].value;
                    }

                    _toggleSelectedItem(selectedValue, cbChecked);

                    /*insert the value for the autocomplete text field:*/
                    if (!_config.multiple) {
                        inputNode.value = selectedValue;
                    }

                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    if (!_config.multiple && _config.closeOnSelect) {
                        _closeList();
                    }

                    //invoke the onchange function handler
                    _invokeOnChangeHandler();
                });

                //add the wrapper node to the list item node
                listItem.appendChild(listItemRowWrapperNode);
                listBody.appendChild(listItem);
            }
        }

        //update the results panel's text
        _updateResultsPanelText(matchingItemsCounter);

        //set the list's height
        let listItemHeight = _getListItemHeight();
        let listHeight = _getListHeight();
        if (uiCompsUtils.show(_config.list.header)) {
            listHeight -= listItemHeight;
        }
        listBody.style.height = listHeight + "px";
        domUtils.setStyle(_config.list.id, "height:"+_getListAnimationHeight()+"px");
        console.debug(methodName + "matchingItemsCounter=["+matchingItemsCounter+"]");
    }

    function _renderSelectedValue(selectedValue) {
        //declare locals
        let methodName = "_renderSelectedValue(): ";
        let selectedPanel;
        let selectionNode;
        let selectionTextNode;
        let removeButtonNode;
        let direction = uiCompsUtils.getConfigDirection(_config);
        let floatValue = (direction=="ltr") ? "float: left;" : "float: right;";
        let floatValueOposite = (direction=="ltr") ? "float: right;" : "float: left;";
        let paddingValue = (direction=="ltr") ? "padding-left: 5px;" : "padding-right: 5px;";
        let removeButtonPaddingValue = (direction=="ltr") ? "padding-left: 2px;" : "padding-right: 2px;";
        let marginValue = (direction=="ltr") ? "margin-right: 5px;" : "margin-left: 5px;";
        let checkboxId = "cb_"+selectedValue;
        let checkboxNode;

        //update the header text
        _updateSelectedPanelHeaderText();
        console.debug(methodName + "selectedValue=["+selectedValue+"]");

        //get the check box node if exists
        if (utils.isInDom(checkboxId)) {
            checkboxNode = utils.getFromDom(checkboxId)
            //uncheck the checkbox
            checkboxNode.checked = true;
        }
        if (uiCompsUtils.show(_config.selectedPanel)) {
            selectedPanel = utils.getFromDom(_config.selectedPanel.body.id);

            //generate a new selection node
            selectionNode = document.createElement(_config.tagName);
            selectionNode.setAttribute("id", "selItem_"+selectedValue);
            selectionNode.setAttribute("class", _getSelectedItemClass());
            selectionNode.setAttribute("style", floatValue+paddingValue+marginValue+"margin-bottom: 5px;height: 14px;width: fit-content;");
            selectionTextNode = document.createElement(_config.tagName);
            selectionTextNode.setAttribute("style", floatValue+marginValue);
            let inputNode = document.getElementById(_config.input.id);
            let inputValue = inputNode.value;

            /*
            TODO add support for a decorated selected value
            let selectedValueStyled = selectedValue;
            let matchStartIndex;

            matchStartIndex = selectedValue.toLowerCase().indexOf(inputValue.toLowerCase());
            selectedValueStyled = selectedValue.substring(0, matchStartIndex) + '<strong class="'+_getSelectedItemClass()+'-match">' + selectedValue.substring(matchStartIndex, inputValue.length) + '</strong>';
            selectedValueStyled += selectedValue.substring(inputValue.length);

             */

            selectionTextNode.innerHTML = selectedValue;
            removeButtonNode = document.createElement(_config.tagName);
            removeButtonNode.setAttribute("class", _getSelectedItemCloseButtonClass());
            removeButtonNode.setAttribute("style", floatValueOposite+removeButtonPaddingValue+"margin-left: 5px;margin-right: 5px;margin-top: 2px;border-radius: 10px;");
            removeButtonNode.setAttribute("title", "click here to remove this item from the selected items panel");
            removeButtonNode.innerHTML = "x";
            if (_config.hasOwnProperty("selectedPanel") && _config.selectedPanel.hasOwnProperty("selectedItem")
                && _config.selectedPanel.selectedItem.hasOwnProperty("closeButton") && _config.selectedPanel.selectedItem.closeButton.hasOwnProperty("icon")) {
                if (utils.isString(_config.selectedPanel.selectedItem.closeButton.icon)) {
                    removeButtonNode.innerHTML = _config.selectedPanel.selectedItem.closeButton.icon;
                }
            }
            removeButtonNode.addEventListener("click", function() {
                //remove the selected value from the selected values array and from the panel
                let currSelectedValue = this.parentNode.id.substring("selItem_".length);
                let cbChecked = null;
                if (_config.multiple) {
                    cbChecked = utils.getFromDom("cb_"+currSelectedValue).checked;
                    _toggleSelectedItem(currSelectedValue, cbChecked);
                }
                else {
                    //remove the selected value from the selected values array and from the panel
                    if (utils.isInArray(currSelectedValue, selectedValues)) {
                        if (selectedValues.length==1) {
                            selectedValues = [];
                        }
                        else {
                            let index = utils.indexOf(currSelectedValue, selectedValues);
                            selectedValues.splice(index, 1);
                        }
                        _removeSelectedValue(currSelectedValue);
                    }
                }
            });
            removeButtonNode.addEventListener("mouseover", function() {
                this.classList.add(_getSelectedItemCloseButtonClass()+"-hover");
            });
            removeButtonNode.addEventListener("mouseout", function() {
                this.classList.remove(_getSelectedItemCloseButtonClass()+"-hover");
            });
            selectionNode.appendChild(selectionTextNode);
            selectionNode.appendChild(removeButtonNode);

            if (!_config.multiple) {
                selectedPanel.innerHTML = "";
                selectedPanel.appendChild(selectionNode);
            }
            else {
                selectedPanel.appendChild(selectionNode);
            }
        }
        //focus on the main input
        _focusOnMainInput();
    }

    function _resolveExpression(expression, singleItemWord, pluralItemWord, currentCounter, totalItems) {
        //declare locals
        let textString = expression;

        //replace placeholders
        textString = textString.replace("##",totalItems);
        textString = textString.replace("#",String(currentCounter));
        if (!utils.isEmpty(singleItemWord)) {
            if (currentCounter==1) {
                textString = textString.replace("{item}",singleItemWord);
            }
            else {
                if (!utils.isEmpty(pluralItemWord)) {
                    textString = textString.replace("{item}",pluralItemWord);
                }
            }
        }
        if (!utils.isEmpty(pluralItemWord)) {
            textString = textString.replace("{items}",pluralItemWord);
        }

        //return the method's value
        return textString;
    }

    function _scrollByFocus(event, scrollDirection) {
        let listBodyId = _getListBodyId();
        let listComp = document.getElementById(listBodyId);
        let elemNode = document.getElementsByClassName(_getItemClass());
        let itemHeight = (utils.isEmpty(elemNode) ? defaultItemHeight : (elemNode.length==0 ? defaultItemHeight : parseInt(getComputedStyle(elemNode[0]).height)));
        let numItemsForScroll = parseInt(_config.numOpenItems);
        let visibleHeight = (numItemsForScroll * itemHeight);
        let focusHeight = ((currentFocus+1) * itemHeight);
        let focusVisibleDiff = focusHeight-visibleHeight;

        //check for valid values
        if (!utils.isString(scrollDirection)) {
            return;
        }
        scrollDirection = scrollDirection.trim().toLowerCase();
        if (scrollDirection!="up" && scrollDirection!="down") {
            return;
        }

        //check the direction
        if (scrollDirection=="up") {
            if (focusHeight>visibleHeight) {
                switch (event.key) {
                    case "ArrowUp":
                        listComp.scrollTop -= itemHeight;
                        break;
                    case "PageUp":
                        listComp.scrollTop -= (numItemsForScroll*itemHeight);
                        break;
                    case "Home":
                        listComp.scrollTop = 0;
                        break;
                    default:
                        break;
                }
            }
            else {
                if (currentFocus==0 && listComp.scrollTop>0) {
                    listComp.scrollTop = 0;
                }
            }
            if (listComp.scrollTop<=0) {
                listComp.scrollTop = 0;
            }
            /*and and make the current item more visible:*/
            _addActive();
        }
        else if (scrollDirection=="down") {
            //scroll down
            if (focusVisibleDiff>0) {
                switch (event.key) {
                    case "ArrowDown":
                        listComp.scrollTop += itemHeight;
                        break;
                    case "PageDown":
                        listComp.scrollTop += (numItemsForScroll*itemHeight);
                        break;
                    case "End":
                        listComp.scrollTop += (matchingItemsCounter*itemHeight);
                        break;
                    default:
                        break;
                }
            }
            if (listComp.scrollTop>=(matchingItemsCounter*itemHeight)) {
                listComp.scrollTop = (matchingItemsCounter*itemHeight);
            }
            /*and and make the current item more visible:*/
            _addActive();
        }
        //console.info("event.key=["+event.key+"] event.keyCode=["+event.keyCode+"] itemHeight=["+itemHeight+"] numItemsForScroll=["+numItemsForScroll+"] visibleHeight=["+visibleHeight+"] matchingItemsCounter=["+matchingItemsCounter+"] listComp.scrollTop=["+listComp.scrollTop+"] currentFocus=["+currentFocus+"] focusHeight=["+focusHeight+"] focusVisibleDiff=["+focusVisibleDiff+"]");
    }

    function _selectAll() {
        //check for the multiple flag
        if (_config.multiple && uiCompsUtils.show(_config.selectedPanel)) {
            let methodName = "_selectAll(): ";
            console.debug(methodName + "started...");
            //clear the selected values array
            selectedValues = [];

            //get the list item nodes
            let listComp = document.getElementById(_getListBodyId());
            let listItemNodes = _getListItemNodes();
            let currSelectedValue;

            //check for valid values
            if (listItemNodes!=null) {
                //loop through the nodes
                for (let i = 0; i < listItemNodes.length; i++) {
                    //add the current node's value to the selected values arrays
                    currSelectedValue = listItemNodes[i].getElementsByTagName("input")[1].value;
                    selectedValues[i] = currSelectedValue;
                    _renderSelectedValue(currSelectedValue);
                }
            }

            //re-render the list
            _renderListItems();
        }

        //refocus on the input
        _focusOnMainInput();
    }

    function _setConfig(config) {
        _config = jsonUtils.mergeJson(_config, config);
        _render();
    }

    function _sort(sortOrder,fieldName) {
        _config.options.data = listUtils.sort(_config.options.data, sortOrder, fieldName);
    }

    function _toggleList() {
        if (isClosed) {
            _openList();
        }
        else {
            _closeList();
        }
    }

    function _toggleSelectedItem(selectedValue, checked) {
        //declare locals
        let methodName = "_toggleSelectedItem(): ";

        //check for valid values
        if (!utils.isString(selectedValue)) {
            return;
        }

        //check the component's multiple mode
        if (_config.multiple) {
            if (utils.isEmpty(checked) || !utils.isBool(checked)) {
                return;
            }
            console.debug(methodName + "selectedValue=["+selectedValue+"] checked=["+checked+"]");
            //check the checked flag's value
            if (checked) {
                //remove the selected value from the selected values array and from the panel
                if (utils.isInArray(selectedValue, selectedValues)) {
                    if (selectedValues.length==1) {
                        selectedValues = [];
                    }
                    else {
                        let index = utils.indexOf(selectedValue, selectedValues);
                        selectedValues.splice(index, 1);
                    }
                    _removeSelectedValue(selectedValue);
                }
            }
            else {
                //add the selected value to the selected values array and to the panel
                if (!utils.isInArray(selectedValue, selectedValues)) {
                    selectedValues.push(selectedValue);
                    _renderSelectedValue(selectedValue);
                }
            }
        }
        else {
            //add the selected value to the selected values array and to the panel
            selectedValues = [];
            selectedValues.push(selectedValue);
            _renderSelectedValue(selectedValue);
        }
    }

    function _updateResultsPanelText(itemsCounter) {
        //check if the results panel is displayed
        if (uiCompsUtils.show(_config.resultsPanel)) {
            let methodName = "_updateResultsPanelText(): ";
            //get the main input node's value
            let mainInputNode = document.getElementById(_config.input.id);
            let inputValue = mainInputNode.value.trim();

            //check if the DOM node exists
            if (utils.isInDom(_config.resultsPanel.id)) {
                //get the results panel's text node
                let resultsPanel = utils.getFromDom(_config.resultsPanel.id);
                let resultsPanelTextNode = resultsPanel.getElementsByTagName("input")[0];

                //set the panel's text
                let textString = (utils.isEmpty(_config.resultsPanel.text)) ? (utils.isEmpty(inputValue) ? "Found # {items}" : "Found # {item} of ## {items} for {search}") : _config.resultsPanel.text;
                if (utils.isEmpty(inputValue)) {
                    textString = textString.replace("for {search}","");
                    textString = textString.replace("{search}","");
                }
                else {
                    textString = textString.replace("{search}","["+inputValue+"]");
                }

                //resolve the text expression
                textString = _resolveExpression(textString,_config.resultsPanel.itemWord,_config.resultsPanel.itemsWord,itemsCounter,_config.options.data.length);
                resultsPanelTextNode.title = textString;
                resultsPanelTextNode.value = textString;
                console.debug(methodName + "resultsPanelTextNode.value=["+resultsPanelTextNode.value+"]");
            }
        }
    }

    function _updateSelectedPanelHeaderText() {
        //check for a header
        if (uiCompsUtils.show(_config.selectedPanel.header)) {
            let methodName = "_updateSelectedPanelHeaderText(): ";
            let textString = (utils.isEmpty(_config.selectedPanel.header.text)) ? "Selected # {items} of ##" : _config.selectedPanel.header.text;
            textString = _resolveExpression(textString,_config.resultsPanel.itemWord,_config.resultsPanel.itemsWord,selectedValues.length,_config.options.data.length);

            //check if the DOM node exists
            let elemId = _config.selectedPanel.header.id + "_txt";
            if (utils.isInDom(elemId)) {
                let selectedPanelTextNode = utils.getFromDom(elemId);
                selectedPanelTextNode.value = textString;
                selectedPanelTextNode.title = textString;
                console.debug(methodName + "selectedPanelTextNode.value=["+selectedPanelTextNode.value+"]");
            }
        }
    }

    this.getConfig = function() {
        //return the method's value
        return _config;
    };

    this.getConfigUi = function() {
        //return the method's value
        return uiConfig;
    };

    this.getId = function() {
        //return the method's value
        return _config.id;
    };

    this.getType = function() {
        //return the method's value
        return "autocomplete";
    };

    this.getValue = function() {
        //check for valid values
        if (!utils.isArray(selectedValues)) {
            return "";
        }
        if (selectedValues.length==0 || utils.isEmpty(selectedValues[0])) {
            return "";
        }

        //return the method's value
        return (String(selectedValues[0]));
    };

    this.getValues = function() {
        //check for valid values
        if (!utils.isArray(selectedValues)) {
            return [];
        }

        //return the method's value
        return selectedValues;
    };

    this.clearAll = function() {
        _clearAllSelected();
    };

    this.selectAll = function() {
        _selectAll();
    };

    this.render = function() {
        _render();
    }

    this.setConfig = function (config) {
        _setConfig(config);
    };

    this.setConfigUi = function (configUi) {
        uiConfig = jsonUtils.mergeJson(uiConfig, configUi);
    };

    this.toggleList = function() {
        _toggleList();
    }

    //invoke the _init method
    if (config != null && utils.isJson(config)) {
        this.setConfig(config);
    }
    else {
        this.setConfig(_config);
    }
};
function Panel(config) {
    //declare global module variables
    let _config = {
        renderTo: null,
        id: "",
        class: "",
        css: {},
        direction: "ltr",
        closeable: false,
        movable: false,
        collapsible: false,
        toggleAnimationDuration: 1500,
        state: "expanded",
        children: [],
        header: {
            id: "",
            class: "",
            css: {},
            alignment: "top",
            direction: "ltr",
            icon:  { id: "", class: "", css: {}, alignment: "left", icon: "" },
            text:  { id: "", class: "", css: {}, direction: "ltr", text: "" },
            toggleButton:  {
                id: "", "class": "", css: {},
                text: "",
                icon: "",
                tooltip: "",
                iconExpand: "",
                textExpand: "",
                animate: true,
                animationDuration: 1500,
            },
            closeButton:  { 
                id: "", "class": "", css: {},
                text: "",
                icon: "",
                tooltip: "",
            },
            children: [],
        },
        body: {
            id: "",
            css: {},
            direction: "ltr",
            children: [],
        },
    };
    let _configUi = {
        id: "",
        cssTagId: "",
        items: [
            { configPath: "", type: "text", label: "Configuration property path: ", tooltip: "set a component's configuration property", defaultValue: "", },
        ]
    };
    let dataAttNamePanelHeight = "data-panel-height";
    let dataAttNamePanelWidth = "data-panel-width";
    let dataAttNameLeft = "data-pos-left";
    let dataAttNameTop = "data-pos-top";
    let dataAttNameBodyHeight = "data-body-height";
    let dataAttNameBodyWidth = "data-body-width";

    function _getPanelId() {
        //declare locals
        let idPrefix = "panel";
        let retVal = domUtils.getElementId(_config, idPrefix, idPrefix);

        //return the method's value
        return retVal;
    }

    function _getPanelHeaderId() {
        //declare locals
        let idPrefix = "panelHeader";
        let retVal = domUtils.getElementId(_config.header, idPrefix, idPrefix);

        //check for an id
        if (utils.isEmpty(retVal)) {
            retVal = _config.id + "_header";
        }

        //return the method's value
        return retVal;
    }

    function _getPanelHeaderIconId() {
        //declare locals
        let idPrefix = "panelHeaderIcon";
        let retVal = domUtils.getElementId(_config.header.icon, idPrefix, idPrefix);

        //check for an id
        if (utils.isEmpty(retVal)) {
            retVal = _config.id + "_headerIcon";
        }

        //return the method's value
        return retVal;
    }

    function _getPanelHeaderTextId() {
        //declare locals
        let idPrefix = "panelHeaderText";
        let retVal = domUtils.getElementId(_config.header.text, idPrefix, idPrefix);

        //check for an id
        if (utils.isEmpty(retVal)) {
            retVal = _config.id + "_headerText";
        }

        //return the method's value
        return retVal;
    }

    function _getPanelHeaderCloseButtonId() {
        //declare locals
        let idPrefix = "panelHeaderCloseButton";
        let retVal = domUtils.getElementId(_config.header.closeButton, idPrefix, idPrefix);

        //check for an id
        if (utils.isEmpty(retVal)) {
            retVal = _config.id + "_headerCloseButton";
        }

        //return the method's value
        return retVal;
    }

    function _getPanelHeaderToggleButtonId() {
        //declare locals
        let idPrefix = "panelHeaderToggleButton";
        let retVal = domUtils.getElementId(_config.header.toggleButton, idPrefix, idPrefix);

        //check for an id
        if (utils.isEmpty(retVal)) {
            retVal = _config.id + "_headerToggleButton";
        }

        //return the method's value
        return retVal;
    }

    function _getPanelBodyId() {
        //declare locals
        let idPrefix = "panelBody";
        let retVal = domUtils.getElementId(_config.body, idPrefix, idPrefix);

        //check for an id
        if (utils.isEmpty(retVal)) {
            retVal = _config.id + "_body";
        }

        //return the method's value
        return retVal;
    }

    function _getPanelClassDefault() {
        let retVal = "panel";
        return retVal;
    }

    function _getPanelCss() {
        //declare locals
        let defaultClass = _getPanelClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
				"border": "none",
			    "outline": "1px solid",
			    "border-radius": "10px",
			    "min-height": "30px",
			    "min-width": "30px",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config, defaultClass, _config.id);

        //return the method's value
        return jsonCss;
    }

    function _getPanelHeaderClassDefault() {
        let retVal = "panelHeader";
        return retVal;
    }

    function _getPanelHeaderCss() {
        //declare locals
        let defaultClass = _getPanelHeaderClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
				"border": "none",
            },
            {
                "cssSelector": defaultClass+"movable",
				"cursor": "grab",
            },
            {
                "cssSelector": defaultClass+"H",
			    "width": "100%",
			    "height": "30px",
                "float": "none",
            },
            {
                "cssSelector": defaultClass+"HT",
                "border-top-left-radius": "10px",
                "border-top-right-radius": "10px",
            },
            {
                "cssSelector": defaultClass+"HB",
                "border-bottom-left-radius": "10px",
                "border-bottom-right-radius": "10px",
            },
            {
                "cssSelector": defaultClass+"V",
			    "height": "100%",
			    "width": "30px",
                "float": "left",
            },
            {
                "cssSelector": defaultClass+"VL",
                "border-top-left-radius": "10px",
                "border-bottom-left-radius": "10px",
            },
            {
                "cssSelector": defaultClass+"VR",
                "border-top-right-radius": "10px",
                "border-bottom-right-radius": "10px",
            },
            {
                "cssSelector": defaultClass+"BB",
                "border-bottom": "1px solid",
            },
            {
                "cssSelector": defaultClass+"BT",
                "border-top": "1px solid",
            },
            {
                "cssSelector": defaultClass+"BR",
                "border-right": "1px solid",
            },
            {
                "cssSelector": defaultClass+"BL",
                "border-left": "1px solid",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.header, defaultClass, _config.header.id);

        //return the method's value
        return jsonCss;
    }

    function _getPanelHeaderCloseButtonClassDefault() {
        let retVal = "panelHeaderButtonClose";
        return retVal;
    }

    function _getPanelHeaderCloseButtonCss() {
        //declare locals
        let defaultClass = _getPanelHeaderCloseButtonClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
			    "border": "none",
			    "background-color": "#cccccc",
			    "outline": "0px solid",
			    "border-radius": "10px",
			    "cursor": "pointer",
			    "height": "20px",
			    "width": "20px",
			    "margin-top": "5px",
            },
            {
                "cssSelector": defaultClass+":focus",
			    "box-shadow": "5px 5px 10px #666666",
            },
            {
                "cssSelector": defaultClass+"-hover",
			    "box-shadow": "5px 5px 10px #666666",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.header.closeButton, defaultClass, _config.header.closeButton.id);

        //return the method's value
        return jsonCss;
    }

    function _getPanelHeaderToggleButtonClassDefault() {
        let retVal = "panelHeaderButtonToggle";
        return retVal;
    }

    function _getPanelHeaderToggleButtonCss() {
        //declare locals
        let defaultClass = _getPanelHeaderToggleButtonClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
			    "border": "none",
			    "background-color": "#cccccc",
			    "outline": "0px solid",
			    "border-radius": "10px",
			    "cursor": "pointer",
			    "height": "20px",
			    "width": "20px",
			    "margin-top": "4px",
            },
            {
                "cssSelector": defaultClass+":focus",
			    "box-shadow": "5px 5px 10px #666666",
            },
            {
                "cssSelector": defaultClass+"-hover",
			    "box-shadow": "5px 5px 10px #666666",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.header.toggleButton, defaultClass, _config.header.toggleButton.id);

        //return the method's value
        return jsonCss;
    }

    function _getPanelHeaderIconClassDefault() {
        let retVal = "panelHeaderIcon";
        return retVal;
    }

    function _getPanelHeaderIconCss() {
        //declare locals
        let defaultClass = _getPanelHeaderIconClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
			    "height": "20px",
			    "width": "20px",
				"padding-left": "5px",
    			"padding-right": "5px",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.header.icon, defaultClass, _config.header.icon.id);

        //return the method's value
        return jsonCss;
    }

    function _getPanelHeaderTextClassDefault() {
        let retVal = "panelHeaderText";
        return retVal;
    }

    function _getPanelHeaderTextCss() {
        //declare locals
        let defaultClass = _getPanelHeaderTextClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
				"white-space": "nowrap",
				"overflow": "hidden",
				"text-overflow": "ellipsis",
			    "padding-left": "5px",
			    "padding-right": "5px",
			    "padding-top": "4px",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.header.text, defaultClass, _config.header.text.id);

        //return the method's value
        return jsonCss;
    }

    function _getPanelBodyClassDefault() {
        let retVal = "panelBody";
        return retVal;
    }

    function _getPanelBodyCss() {
        //declare locals
        let defaultClass = _getPanelBodyClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
				"overflow-x": "auto",
				"overflow-y": "auto",
            },
            {
                "cssSelector": defaultClass+"H",
				"width": "100%",
                "float": "none",
            },
            {
                "cssSelector": defaultClass+"V",
				"height": "100%",
                "float": "left",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.body, defaultClass, _config.body.id);

        //return the method's value
        return jsonCss;
    }

    function _getState() {
        //declare locals
        let defaultState = "expanded";
        let retVal;

        //check for a valid configuration value
        if (!utils.isString(_config.state)) {
            retVal = defaultState;
        }
        if (_config.state.toLowerCase()=="expanded" || _config.state.toLowerCase()=="collapsed") {
            retVal = _config.state.toLowerCase();
        }
        else {
            retVal = defaultState;
        }

        //save the state to the configuration
        _config.state = retVal;

        //return the method's value
        return retVal;
    }

    function _render() {
        _renderPanel();
        let panelNode = utils.getFromDom(_config.id);
        let headerNode = _renderHeader();
        let bodyNode = _renderBody();
        let cssTagId = domUtils.getCssTagId(_config);
        let styleString;
        let headerContentsNodeId = _config.header.id+"_contents";

        //get the header's alignment
        let headerAlignment = uiCompsUtils.getConfigAlignment(_config.header);
        switch (headerAlignment) {
            case "bottom":
            case "right":
                panelNode.appendChild(bodyNode);
                panelNode.appendChild(headerNode);
                break;
            case "top":
            case "left":
                panelNode.appendChild(headerNode);
                panelNode.appendChild(bodyNode);
                break;
            default:
                break;
        }

        //render the icon and text nodes
        uiCompsUtils.renderIconTextNodes(_config.header, headerContentsNodeId);

        //render the hesder node's children and the body node's children
        html5Utils.renderChildren(_config.header.children, headerNode, cssTagId);
        html5Utils.renderChildren(_config.body.children, bodyNode, cssTagId);

        //fix the body node's height and width
        let headerHeight = headerNode.getBoundingClientRect().height;
        let headerWidth = headerNode.getBoundingClientRect().width;
        if (headerAlignment=="bottom" || headerAlignment=="top") {
            styleString = "height: calc(100% - " + headerHeight + "px);";
        }
        else {
            styleString = "width: calc(100% - " + headerWidth + "px);";
        }
        domUtils.setStyle(bodyNode, styleString);

        //set some style according to the header's direction (bottomToTop, or topToBottom)
        let headerContentsNode = utils.getFromDom(headerContentsNodeId);
        let buttonsWidth = 10;
        let buttonNodeClose = null;
        let buttonNodeToggle = null;
        let headerDirection = null;
        let rotateDeg = 90;
        let floatStyle = "float:"+uiCompsUtils.getFloatValue(_config)+";";
        let iconNode = null;
        let textNode = null;

        //check for a header direction
        if (jsonUtils.hasValue(_config.header, "direction")) {
            headerDirection = _config.header.direction;
            headerDirection = headerDirection.toLowerCase();
            if (headerDirection=="btt" || headerDirection=="bottomtotop") {
                rotateDeg = 270;
            }
        }

        //check for an icon node
        if (uiCompsUtils.hasIconNode(_config.header)) {
            buttonsWidth += 25;
        }

        //check for buttons nodes
        if (!utils.isEmpty(headerContentsNode)) {
            if (utils.isTrue(_config.closeable)) {
                buttonsWidth += 25;
                if (utils.isInDom(_config.header.closeButton.id)) {
                    buttonNodeClose = utils.getFromDom(_config.header.closeButton.id);
                    headerContentsNode.removeChild(buttonNodeClose);
                }
                buttonNodeClose = _renderCloseButtonNode();
                if (!utils.isEmpty(buttonNodeClose)) {
                    headerContentsNode.appendChild(buttonNodeClose);
                }
            }
            if (utils.isTrue(_config.collapsible)) {
                buttonsWidth += 25;
                if (utils.isInDom(_config.header.toggleButton.id)) {
                    buttonNodeToggle = utils.getFromDom(_config.header.toggleButton.id);
                    headerContentsNode.removeChild(buttonNodeToggle);
                }
                buttonNodeToggle = _renderToggleButtonNode();
                if (!utils.isEmpty(buttonNodeToggle)) {
                    headerContentsNode.appendChild(buttonNodeToggle);
                }
            }
        }

        //render the icon and text nodes
        uiCompsUtils.renderIconTextNodes(_config.header.closeButton);
        uiCompsUtils.renderIconTextNodes(_config.header.toggleButton);

        //set the header's icon and text node's style
        if (uiCompsUtils.hasIconNode(_config.header)) {
            iconNode = utils.getFromDom(_config.header.icon.id);
            if (!utils.isEmpty(iconNode)) {
                styleString = floatStyle;
                domUtils.setStyle(iconNode, styleString);
            }
        }
        if (uiCompsUtils.hasTextNode(_config.header)) {
            textNode = utils.getFromDom(_config.header.text.id);
            if (!utils.isEmpty(textNode)) {
                styleString = floatStyle+"padding-top:4px;width:calc(100% - " + buttonsWidth + "px)";
                domUtils.setStyle(textNode, styleString);
            }
        }

        //check the alignment
        switch (headerAlignment) {
            case "bottom":
            case "top":
                break;
            case "right":
            case "left":
                if (!utils.isEmpty(headerContentsNode)) {
                    let top = ((headerHeight-50)/2) + 10;
                    styleString = "position:relative;top:"+top+"px;left:-"+top+"px;transform: rotate("+rotateDeg+"deg);width:"+(headerHeight)+"px;height:"+(headerWidth)+"px;";
                    domUtils.setStyle(headerContentsNode, styleString);
                }
                break;
            default:
                break;
        }
    }

    function _renderPanel() {
        let parentNode = uiCompsUtils.getRenderTo(_config);
        let compId = _getPanelId();
        let compNode;
        _config.id = compId;
        let cssTagId = domUtils.getCssTagId(_config);
        _config["cssTagId"] = cssTagId;
        let defaultCompClass = _getPanelClassDefault();
        let pos;
        let leftPos;
        let topPos;

        //render the component's css
        let jsonCss;
        jsonCss = _getPanelCss();
        html5Utils.renderCss(jsonCss, cssTagId);

        //create the component's node
        compNode = document.createElement("div");

        //set all attributes for this node
        let excludeAttribues = ["icon","text"];
        html5Utils.setNodeAttributes(compNode, compNode.tagName, _config, excludeAttribues);
        
        //copy attributes from the existing DOM node to the new DOM node
        domUtils.setAttributeValue(compNode, dataAttNamePanelHeight, domUtils.getAttributeValue(_config.id, dataAttNamePanelHeight));
        domUtils.setAttributeValue(compNode, dataAttNamePanelWidth, domUtils.getAttributeValue(_config.id, dataAttNamePanelWidth));
        pos = domUtils.getStyle(_config.id, "position");
        leftPos = parseFloat(domUtils.getAttributeValue(_config.id, dataAttNameLeft));
        topPos = parseFloat(domUtils.getAttributeValue(_config.id, dataAttNameTop));
        if (!utils.isEmpty(pos)) {
            domUtils.setStyle(compNode, {"position": pos});
        }
        if (!utils.isEmpty(leftPos)) {
            domUtils.setAttributeValue(compNode, dataAttNameLeft, leftPos);
            domUtils.setStyle(compNode, {"left":String(leftPos)+"px"});
        }
        if (!utils.isEmpty(topPos)) {
            domUtils.setAttributeValue(compNode, dataAttNameTop, topPos);
            domUtils.setStyle(compNode, {"top":String(topPos)+"px"});
        }

        //remove the component if it exists in the DOM
        uiCompsUtils.removeChildNode(parentNode, _config.id);

        //set built-in attributes for this node
        compNode.setAttribute("id", compId);
        compNode.setAttribute("name", compId);
        compNode.classList.add(defaultCompClass);
        if (jsonUtils.hasValue(_config, "class") && utils.isString(_config.class)) {
            compNode.classList.add(_config.class);
        }

        //set the component's position


        parentNode.appendChild(compNode);

        //render child elements
        html5Utils.renderChildren(_config.children, _config.id, cssTagId);
    }

    function _renderHeader() {
        let parentNode = utils.getFromDom(_config.id);
        let compId = _getPanelHeaderId();
        let compNode;
        _config.header.id = compId;
        let cssTagId = domUtils.getCssTagId(_config);
        _config.header["cssTagId"] = cssTagId;
        let defaultCompClass = _getPanelHeaderClassDefault();
        let headerContentsNodeId;
        let headerContentsNode;

        //remove the component if it exists in the DOM
        uiCompsUtils.removeChildNode(parentNode, _config.header.id);

        //render the component's css
        let jsonCss;
        jsonCss = _getPanelHeaderCss();
        html5Utils.renderCss(jsonCss, cssTagId);

        //create the component's node
        compNode = document.createElement("div");
        
        //set all attributes for this node
        let excludeAttribues = ["icon","text"];
        html5Utils.setNodeAttributes(compNode, compNode.tagName, _config.header, excludeAttribues);
        
        //set built-in attributes for this node
        compNode.setAttribute("id", compId);
        compNode.setAttribute("name", compId);
        compNode.classList.add(defaultCompClass);
        if (jsonUtils.hasValue(_config, "class") && utils.isString(_config.class)) {
            compNode.classList.add(_config.class);
        }

        //check if the component is movable
        if (utils.isTrue(_config.movable)) {
            compNode.classList.add(defaultCompClass+"movable");
        }

        //get the header's alignment
        let headerAlignment = uiCompsUtils.getConfigAlignment(_config.header);
        switch (headerAlignment) {
            case "bottom":
                compNode.classList.add(defaultCompClass+"H");
                compNode.classList.add(defaultCompClass+"HB");
                compNode.classList.add(defaultCompClass+"BT");
                break;
            case "top":
                compNode.classList.add(defaultCompClass+"H");
                compNode.classList.add(defaultCompClass+"HT");
                compNode.classList.add(defaultCompClass+"BB");
                break;
            case "left":
                compNode.classList.add(defaultCompClass+"V");
                compNode.classList.add(defaultCompClass+"VL");
                compNode.classList.add(defaultCompClass+"BR");
                break;
            case "right":
                compNode.classList.add(defaultCompClass+"V");
                compNode.classList.add(defaultCompClass+"VR");
                compNode.classList.add(defaultCompClass+"BL");
                break;
            default:
                break;
        }

        //create the header's contents node
        headerContentsNodeId = compId+"_contents";
        headerContentsNode = document.createElement("div");
        headerContentsNode.setAttribute("id", headerContentsNodeId);

        //appent it to the header node
        compNode.appendChild(headerContentsNode);

        //return the method's value
        return compNode;
    }

    function _renderCloseButtonNode() {
        let parentNode = utils.getFromDom(_config.header.id);
        let compId = _getPanelHeaderCloseButtonId();
        let wrapperNode;
        let compNode;
        _config.header.closeButton.id = compId;
        let cssTagId = domUtils.getCssTagId(_config);
        _config.header.closeButton["cssTagId"] = cssTagId;
        let defaultCompClass = _getPanelHeaderCloseButtonClassDefault();
        let floatValue = uiCompsUtils.getFloatValueReversed(_config);
        let direction = uiCompsUtils.getConfigDirection(_config);
        let margin = (direction=="ltr" ? "margin-right:5px;" : "margin-left:5px;");
        let styleString = "float:"+floatValue+";"+margin;

        //remove the component if it exists in the DOM
        uiCompsUtils.removeChildNode(parentNode, _config.header.closeButton.id);

        //render the component's css
        let jsonCss;
        jsonCss = _getPanelHeaderCloseButtonCss();
        html5Utils.renderCss(jsonCss, cssTagId);

        //create the component's node
        wrapperNode = document.createElement("div");
        domUtils.setStyle(wrapperNode, styleString);
        compNode = document.createElement("button");
        
        //set all attributes for this node
        if (!utils.isString(_config.header.closeButton.tooltip)) {
            _config.header.closeButton.tooltip = "click here to close this panel";
        }
        let excludeAttribues = ["icon","text"];
        html5Utils.setNodeAttributes(compNode, compNode.tagName, _config.header.closeButton, excludeAttribues);
        
        //set built-in attributes for this node
        compNode.setAttribute("id", compId);
        compNode.setAttribute("name", compId);
        compNode.classList.add(defaultCompClass);
        if (jsonUtils.hasValue(_config.header.closeButton, "class") && utils.isString(_config.header.closeButton.class)) {
            compNode.classList.add(_config.header.closeButton.class);
        }

        //set the button's text or icon
        if (!uiCompsUtils.hasIconNode(_config.header.closeButton) && !uiCompsUtils.hasTextNode(_config.header.closeButton)) {
            _config.header.closeButton.text = {"id": compId+"_text","text":"x","style":"font-size:14px;margin-left:-4px;"};
        }

        //add the button's event handlers
        if (!utils.isTrue(_config.header.closeButton.disabled)) {
            compNode.addEventListener("mouseover", function() {
                this.classList.add(defaultCompClass+"-hover");
            });
            compNode.addEventListener("mouseout", function() {
                this.classList.remove(defaultCompClass+"-hover");
            });
        }
        compNode.addEventListener("click", function() {
            _showPanel(false);
        });
        wrapperNode.appendChild(compNode);

        //return the method's value
        return wrapperNode;
    }

    function _renderToggleButtonNode() {
        let parentNode = utils.getFromDom(_config.header.id);
        let compId = _getPanelHeaderToggleButtonId();
        let wrapperNode;
        let compNode;
        _config.header.toggleButton.id = compId;
        let cssTagId = domUtils.getCssTagId(_config);
        _config.header.toggleButton["cssTagId"] = cssTagId;
        let defaultCompClass = _getPanelHeaderToggleButtonClassDefault();
        let floatValue = uiCompsUtils.getFloatValueReversed(_config);
        let direction = uiCompsUtils.getConfigDirection(_config);
        let margin = (direction=="ltr" ? "margin-right:5px;" : "margin-left:5px;");
        let styleString = "float:"+floatValue+";"+margin;

        //remove the component if it exists in the DOM
        uiCompsUtils.removeChildNode(parentNode, _config.header.toggleButton.id);

        //render the component's css
        let jsonCss;
        jsonCss = _getPanelHeaderToggleButtonCss();
        html5Utils.renderCss(jsonCss, cssTagId);

        //create the component's node
        wrapperNode = document.createElement("div");
        domUtils.setStyle(wrapperNode, styleString);
        compNode = document.createElement("button");
        
        //set all attributes for this node
        if (!utils.isString(_config.header.toggleButton.tooltip)) {
            _config.header.toggleButton.tooltip = "click here to collapse/expand this panel";
        }
        let excludeAttribues = ["icon","text"];
        html5Utils.setNodeAttributes(compNode, compNode.tagName, _config.header.toggleButton, excludeAttribues);
        
        //set built-in attributes for this node
        compNode.setAttribute("id", compId);
        compNode.setAttribute("name", compId);
        compNode.classList.add(defaultCompClass);
        if (jsonUtils.hasValue(_config.header.toggleButton, "class") && utils.isString(_config.header.toggleButton.class)) {
            compNode.classList.add(_config.header.toggleButton.class);
        }

        //set the button's text or icon
        if (!uiCompsUtils.hasIconNode(_config.header.toggleButton) && !uiCompsUtils.hasTextNode(_config.header.toggleButton)) {
            _config.header.toggleButton.text = {"id": compId+"_text","text":"-","style":"font-size: 20px;margin-top:-5px;margin-left:-5px;"};
            _config.header.toggleButton.textExpand = "+";
            //_config.header.toggleButton.icon = {"icon":"8861","style":"font-size:22px;margin-top:-7px;margin-left:-12px;"};
            //_config.header.toggleButton.iconExpand = "8853";
        }

        //add the button's event handlers
        if (!utils.isTrue(_config.header.toggleButton.disabled)) {
            compNode.addEventListener("mouseover", function() {
                this.classList.add(defaultCompClass+"-hover");
            });
            compNode.addEventListener("mouseout", function() {
                this.classList.remove(defaultCompClass+"-hover");
            });
        }
        compNode.addEventListener("click", function() {
            _toggle();
        });
        wrapperNode.appendChild(compNode);

        //return the method's value
        return wrapperNode;
    }

    function _renderBody() {
        let parentNode = utils.getFromDom(_config.id);
        let compId = _getPanelBodyId();
        let compNode;
        _config.body.id = compId;
        let cssTagId = domUtils.getCssTagId(_config);
        _config.body["cssTagId"] = cssTagId;
        let defaultCompClass = _getPanelBodyClassDefault();

        //render the component's css
        let jsonCss;
        jsonCss = _getPanelBodyCss();
        html5Utils.renderCss(jsonCss, cssTagId);

        //create the component's node
        compNode = document.createElement("div");

        //set all attributes for this node
        let excludeAttribues = ["icon","text"];
        html5Utils.setNodeAttributes(compNode, compNode.tagName, _config.body, excludeAttribues);
        
        //copy attributes from the existing DOM node to the new DOM node
        domUtils.setAttributeValue(compNode, dataAttNameBodyHeight, domUtils.getAttributeValue(_config.body.id, dataAttNameBodyHeight));
        domUtils.setAttributeValue(compNode, dataAttNameBodyWidth, domUtils.getAttributeValue(_config.body.id, dataAttNameBodyWidth));

        //remove the component if it exists in the DOM
        uiCompsUtils.removeChildNode(parentNode, _config.body.id);

        //set built-in attributes for this node
        compNode.setAttribute("id", compId);
        compNode.setAttribute("name", compId);
        compNode.classList.add(defaultCompClass);
        if (jsonUtils.hasValue(_config.body, "class") && utils.isString(_config.body.class)) {
            compNode.classList.add(_config.body.class);
        }

        //get the header's alignment
        let headerAlignment = uiCompsUtils.getConfigAlignment(_config.header);
        switch (headerAlignment) {
            case "bottom":
            case "top":
                compNode.classList.add(defaultCompClass+"H");
                break;
            case "left":
            case "right":
                compNode.classList.add(defaultCompClass+"V");
                break;
            default:
                break;
        }

        //return the method's value
        return compNode;
    }

    function _setConfig(config) {
        _config = jsonUtils.mergeJson(_config, config);
        _render();
    }

    function _showPanel(show) {
        let display = (utils.isTrue(show) ? "block" : "none");
        let elemId = _config.id;
        let elemNode = null;

        if (utils.isInDom(elemId)) {
            elemNode = utils.getFromDom(elemId);
            if (!utils.isEmpty(elemNode)) {
                elemNode.style.display = display;
            }
        }
    }

    function _collapse() {
        //declare locals
        let buttonTextExpand = (utils.isEmpty(_config.header.toggleButton.textExpand) ? "+" : _config.header.toggleButton.textExpand);
        let buttonIconExpand = (utils.isEmpty(_config.header.toggleButton.iconExpand) ? "" : _config.header.toggleButton.iconExpand);
        let headerNode = utils.getFromDom(_config.header.id);
        let defaultHeaderClass = _getPanelHeaderClassDefault();
        let headerAlignment = uiCompsUtils.getConfigAlignment(_config.header);
        let toggleConfig = {
            state: _getState(),
            compId: _config.id,
            compBodyId: _config.body.id,
            compHeaderId: _config.header.id,
            headerAlignment: headerAlignment,
            buttonId: _config.header.toggleButton.id,
            buttonIconId: _config.header.toggleButton.icon.id,
            buttonTextId: _config.header.toggleButton.text.id,
            buttonText: buttonTextExpand,
            buttonIcon: buttonIconExpand,
            animateButton: _config.header.toggleButton.animate,
            buttonAnimationDuration: _config.header.toggleButton.animationDuration,
            animationDuration: _config.toggleAnimationDuration,
        };

        //invoke the generic collapse method
        uiCompsUtils.collapse(toggleConfig, function(newState) {
            switch (headerAlignment) {
                case "top":
                    headerNode.classList.remove(defaultHeaderClass+"BB");
                    break;
                case "bottom":
                    headerNode.classList.remove(defaultHeaderClass+"BT");
                    break;
                case "left":
                    headerNode.classList.remove(defaultHeaderClass+"BR");
                    break;
                case "right":
                    headerNode.classList.remove(defaultHeaderClass+"BL");
                    break;
            }
            _config.state = newState;
        });
    }

    function _expand() {
        //declare locals
        let buttonTextCollapse = (utils.isEmpty(_config.header.toggleButton.text.text) ? "+" : _config.header.toggleButton.text.text);
        let buttonIconCollapse = (utils.isEmpty(_config.header.toggleButton.icon.icon) ? "" : _config.header.toggleButton.icon.icon);
        let headerNode = utils.getFromDom(_config.header.id);
        let defaultHeaderClass = _getPanelHeaderClassDefault();
        let headerAlignment = uiCompsUtils.getConfigAlignment(_config.header);
        let toggleConfig = {
            state: _getState(),
            compId: _config.id,
            compBodyId: _config.body.id,
            compHeaderId: _config.header.id,
            headerAlignment: headerAlignment,
            buttonId: _config.header.toggleButton.id,
            buttonIconId: _config.header.toggleButton.icon.id,
            buttonTextId: _config.header.toggleButton.text.id,
            buttonText: buttonTextCollapse,
            buttonIcon: buttonIconCollapse,
            animateButton: _config.header.toggleButton.animate,
            buttonAnimationDuration: _config.header.toggleButton.animationDuration,
            animationDuration: _config.toggleAnimationDuration,
        };

        switch (headerAlignment) {
            case "top":
                headerNode.classList.add(defaultHeaderClass+"BB");
                break;
            case "bottom":
                headerNode.classList.add(defaultHeaderClass+"BT");
                break;
            case "left":
                headerNode.classList.add(defaultHeaderClass+"BR");
                break;
            case "right":
                headerNode.classList.add(defaultHeaderClass+"BL");
                break;
        }

        //invoke the generic collapse method
        uiCompsUtils.expand(toggleConfig, function(newState) {
            _config.state = newState;
        });
    }

    function _toggle() {
        //declare locals
        let currState = _getState();

        //check the current state
        if (currState=="expanded") {
            _collapse();
        }
        else {
            _expand();
        }
    }

    this.collapse = function() {
        _collapse();
    };

    this.expand = function() {
        _expand();
    };

    this.getConfig = function() {
        //return the method's value
        return _config;
    };

    this.getConfigUi = function() {
        //return the method's value
        return _configUi;
    };

    this.getId = function() {
        //return the method's value
        return _config.id;
    };

    this.getType = function() {
        //return the method's value
        return "panel";
    };

    this.render = function() {
        _render();
    }

    this.setConfig = function (config) {
        _setConfig(config);
    };

    this.setConfigUi = function (configUi) {
        _configUi = jsonUtils.mergeJson(_configUi, configUi);
    };

    this.toggle = function() {
        _toggle();
    };

    //invoke the _init method
    if (config != null && utils.isJson(config)) {
        this.setConfig(config);
    }
    else {
        this.setConfig(_config);
    }
};
function Icon(config) {
    //declare global module variables
    let _config = {
        renderTo: null,
        id: "",
        alignment: "left",
        children: [],
    };
    let _configUi = {
        id: "",
        cssTagId: "",
        items: [
            { configPath: "", type: "text", label: "Configuration property path: ", tooltip: "set a component's configuration property", defaultValue: "", },
        ]
    };

    function _getlId() {
        //declare locals
        let idPrefix = "icon";
        let retVal = domUtils.getElementId(_config, idPrefix, idPrefix);

        //return the method's value
        return retVal;
    }

    function _getClassDefault() {
        let retVal = "icon";
        return retVal;
    }

    function _getCss() {
        //declare locals
        let defaultClass = _getClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
			    "height": "20px",
			    "width": "20px",
                "padding-left": "5px",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config, defaultClass, _config.id);

        //return the method's value
        return jsonCss;
    }

    function _render() {
        let parentNode = uiCompsUtils.getRenderTo(_config);
        let compId = _getlId();
        let compNode;
        _config.id = compId;
        let cssTagId = domUtils.getCssTagId(_config);

        //check if the component exists
        if (utils.isInDom(compId)) {
            compNode = document.getElementById(compId);
            parentNode.removeChild(compNode);
        }

        //render the component's css
        let jsonCss = _getCss();
        html5Utils.renderCss(jsonCss, cssTagId);

        //create the component's node
        compNode = document.createElement("div");
        
        //set all attributes for this node
        html5Utils.setNodeAttributes(compNode, compNode.tagName, _config, null);
        
        //set built-in attributes for this node
        compNode.setAttribute("id", compId);
        compNode.classList.add(_getClassDefault());
        if (jsonUtils.hasValue(_config, "class") && utils.isString(_config.class)) {
            compNode.classList.add(_config.class);
        }
        parentNode.appendChild(compNode);

        //render child elements
        html5Utils.renderChildren(_config.children, _config.id, cssTagId);
    }

    function _setConfig(config) {
        _config = jsonUtils.mergeJson(_config, config);
    }

    this.getConfig = function() {
        //return the method's value
        return _config;
    };

    this.getConfigUi = function() {
        //return the method's value
        return _configUi;
    };

    this.getId = function() {
        //return the method's value
        return _config.id;
    };

    this.render = function() {
        _render();
    }

    this.setConfig = function (config) {
        _setConfig(config);
    };

    this.setConfigUi = function (configUi) {
        _configUi = jsonUtils.mergeJson(_configUi, configUi);
    };

    //invoke the _init method
    if (config != null && utils.isJson(config)) {
        _setConfig(config);
    }
    else {
        _setConfig(_config);
    }
};
function Text(config) {
    //declare global module variables
    let _config = {
        renderTo: null,
        id: "",
        children: [],
    };
    let _configUi = {
        id: "",
        cssTagId: "",
        items: [
            { configPath: "", type: "text", label: "Configuration property path: ", tooltip: "set a component's configuration property", defaultValue: "", },
        ]
    };

    function _getlId() {
        //declare locals
        let idPrefix = "text";
        let retVal = domUtils.getElementId(_config, idPrefix, idPrefix);

        //return the method's value
        return retVal;
    }

    function _getClassDefault() {
        let retVal = "text";
        return retVal;
    }

    function _getClass() {
        return uiCompsUtils.getConfigClass(_config, _getClassDefault());
    }

    function _getCss() {
        //declare locals
        let defaultClass = _getClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
				"white-space": "nowrap",
				"overflow": "hidden",
				"text-overflow": "ellipsis",
				"padding-left": "5px",
    			"padding-right": "5px",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config, defaultClass, _config.id);

        //return the method's value
        return jsonCss;
    }

    function _render() {
        let parentNode = uiCompsUtils.getRenderTo(_config);
        let compId = _getlId();
        let compNode;
        _config.id = compId;
        let cssTagId = domUtils.getCssTagId(_config);

        //check if the component exists
        if (utils.isInDom(compId)) {
            compNode = document.getElementById(compId);
            try {
                parentNode.removeChild(compNode);
            }
            catch(err) {}
        }

        //render the component's css
        let jsonCss = _getCss();
        html5Utils.renderCss(jsonCss, cssTagId);

        //create the component's node
        compNode = document.createElement("div");
        
        //set all attributes for this node
        html5Utils.setNodeAttributes(compNode, compNode.tagName, _config, null);
        
        //set built-in attributes for this node
        compNode.setAttribute("id", compId);
        compNode.classList.add(_getClassDefault());
        if (jsonUtils.hasValue(_config, "class") && utils.isString(_config.class)) {
            compNode.classList.add(_config.class);
        }
        parentNode.appendChild(compNode);

        //render child elements
        html5Utils.renderChildren(_config.children, _config.id, cssTagId);
    }

    function _setConfig(config) {
        _config = jsonUtils.mergeJson(_config, config);
    }

    this.getConfig = function() {
        //return the method's value
        return _config;
    };

    this.getConfigUi = function() {
        //return the method's value
        return _configUi;
    };

    this.getId = function() {
        //return the method's value
        return _config.id;
    };

    this.render = function() {
        _render();
    }

    this.setConfig = function (config) {
        _setConfig(config);
    };

    this.setConfigUi = function (configUi) {
        _configUi = jsonUtils.mergeJson(_configUi, configUi);
    };

    //invoke the _init method
    if (config != null && utils.isJson(config)) {
        _setConfig(config);
    }
    else {
        _setConfig(_config);
    }
};
function Button(config) {
    //declare global module variables
    let _config = {
        renderTo: null,
        id: "",
        icon: null,
        text: null,
        type: "button",
        onclick: null,
        children: [],
    };
    let _configUi = {
        id: "",
        cssTagId: "",
        items: [
            { configPath: "", type: "text", label: "Configuration property path: ", tooltip: "set a component's configuration property", defaultValue: "", },
        ]
    };

    function _getlId() {
        //declare locals
        let idPrefix = "button";
        let retVal = domUtils.getElementId(_config, idPrefix, idPrefix);

        //return the method's value
        return retVal;
    }

    function _getClassDefault() {
        let retVal = "button";
        return retVal;
    }

    function _getCss() {
        //declare locals
        let defaultClass = _getClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
                "cursor": "pointer",
            },
            { 
                "cssSelector": "." + defaultClass + ":focus",
                "box-shadow": "5px 5px 10px #666666",
            },
            { 
                "cssSelector": "." + defaultClass + "-hover",
                "box-shadow": "5px 5px 10px #666666",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config, defaultClass, _config.id);

        //return the method's value
        return jsonCss;
    }

    function _render() {
        let parentNode = uiCompsUtils.getRenderTo(_config);
        let compId = _getlId();
        let compNode;
        _config.id = compId;
        let cssTagId = domUtils.getCssTagId(_config);
        let buttonType = "type";
        let defaultClass = _getClassDefault();

        //remove the component if it exists in the DOM
        uiCompsUtils.removeChildNode(parentNode, _config.id);

        //render the component's css
        let jsonCss = _getCss();
        html5Utils.renderCss(jsonCss, cssTagId);

        //create the component's node
        compNode = document.createElement("button");
        
        //set all attributes for this node
        let excludeAttribues = ["icon","text"];
        html5Utils.setNodeAttributes(compNode, compNode.tagName, _config, excludeAttribues);
        
        //set built-in attributes for this node
        compNode.setAttribute("id", compId);
        compNode.setAttribute("name", compId);
        compNode.classList.add(defaultClass);
        if (jsonUtils.hasValue(_config, "class") && utils.isString(_config.class)) {
            compNode.classList.add(_config.class);
        }
        if (_config.hasOwnProperty("type") && (utils.isString(_config.type) && 
            (_config.type.toLowerCase()=="button" || _config.type.toLowerCase()=="reset" || _config.type.toLowerCase()=="submit"))) {
                buttonType = _config.type;
        }
        compNode.setAttribute("type", buttonType);
        if (!utils.isTrue(_config.disabled)) {
            compNode.addEventListener("mouseover", function() {
                this.classList.add(defaultClass+"-hover");
            });
            compNode.addEventListener("mouseout", function() {
                this.classList.remove(defaultClass+"-hover");
            });
        }
        parentNode.appendChild(compNode);

        //render the icon and text nodes
        uiCompsUtils.renderIconTextNodes(_config);

        //render child elements
        html5Utils.renderChildren(_config.children, _config.id, cssTagId);
    }

    function _setConfig(config) {
        //update the configuration json
        _config = jsonUtils.mergeJson(_config, config);

        //declare a node
        let compNode;

        //check the changed configuration
        if (uiCompsUtils.hasIconNode(config)) {
            if (utils.isInDom(config.icon.id)) {
                compNode = utils.getFromDom(config.icon.id); 
                html5Utils.setNodeAttributes(compNode, compNode.tagName, config.icon);
            }
            else {
                _render();
            }
        }
        if (uiCompsUtils.hasTextNode(config)) {
            if (utils.isInDom(config.text.id)) {
                compNode = utils.getFromDom(config.text.id); 
                html5Utils.setNodeAttributes(compNode, compNode.tagName, config.text);
            }
            else {
                _render();
            }
        }
        else {
            _render();
        }
    }

    this.getConfig = function() {
        //return the method's value
        return _config;
    };

    this.getConfigUi = function() {
        //return the method's value
        return _configUi;
    };

    this.getId = function() {
        //return the method's value
        return _config.id;
    };

    this.getType = function() {
        //return the method's value
        return "button";
    };

    this.render = function() {
        _render();
    }

    this.setConfig = function (config) {
        _setConfig(config);
    };

    this.setConfigUi = function (configUi) {
        _configUi = jsonUtils.mergeJson(_configUi, configUi);
    };

    //invoke the _init method
    if (config != null && utils.isJson(config)) {
        _setConfig(config);
    }
    else {
        _setConfig(_config);
    }
};
function UtilsHandle(config) {
    //declare global module variables
    let _config = {
        renderTo: null,
        id: "",
        class: "",
        css: {},
        direction: "ltr",
        closeable: false,
        movable: false,
        collapsible: false,
        toggleAnimationDuration: 1500,
        state: "expanded",
        handle: {
            id: "",
            class: "",
            css: {},
            alignment: "topleft",
            direction: "ltr",
            icon:  { id: "", class: "", css: {}, alignment: "left", icon: "" },
            text:  { id: "", class: "", css: {}, direction: "ltr", text: "" },
            toggleButton:  {
                id: "", "class": "", css: {},
                text: "",
                icon: "",
                tooltip: "",
                iconExpand: "",
                textExpand: "",
                animate: true,
                animationDuration: 1500,
            },
            closeButton:  { 
                id: "", "class": "", css: {},
                text: "",
                icon: "",
                tooltip: "",
            },
            children: [],
        },
        children: [],
    };
    let _configUi = {
        id: "",
        cssTagId: "",
        items: [
            { configPath: "", type: "text", label: "Configuration property path: ", tooltip: "set a component's configuration property", defaultValue: "", },
        ]
    };
    let dataAttNamePanelHeight = "data-panel-height";
    let dataAttNamePanelWidth = "data-panel-width";
    let dataAttNameLeft = "data-pos-left";
    let dataAttNameTop = "data-pos-top";
    let dataAttNameBodyHeight = "data-body-height";
    let dataAttNameBodyWidth = "data-body-width";

    function _getWrapperlId() {
        //declare locals
        let idPrefix = "wrapper";
        let retVal = domUtils.getElementId(_config, idPrefix, idPrefix);

        //return the method's value
        return retVal;
    }

    function _getHandleId() {
        //declare locals
        let idPrefix = "handle";
        let retVal = domUtils.getElementId(_config.handle, idPrefix, idPrefix);

        //check for an id
        if (utils.isEmpty(retVal)) {
            retVal = _config.id + "_handle";
        }

        //return the method's value
        return retVal;
    }

    function _getHandleIconId() {
        //declare locals
        let idPrefix = "handleIcon";
        let retVal = domUtils.getElementId(_config.handle.icon, idPrefix, idPrefix);

        //check for an id
        if (utils.isEmpty(retVal)) {
            retVal = _config.id + "_handleIcon";
        }

        //return the method's value
        return retVal;
    }

    function _getHandleTextId() {
        //declare locals
        let idPrefix = "handleText";
        let retVal = domUtils.getElementId(_config.handle.text, idPrefix, idPrefix);

        //check for an id
        if (utils.isEmpty(retVal)) {
            retVal = _config.id + "_handleText";
        }

        //return the method's value
        return retVal;
    }

    function _getHandleCloseButtonId() {
        //declare locals
        let idPrefix = "handleCloseButton";
        let retVal = domUtils.getElementId(_config.handle.closeButton, idPrefix, idPrefix);

        //check for an id
        if (utils.isEmpty(retVal)) {
            retVal = _config.id + "_handleCloseButton";
        }

        //return the method's value
        return retVal;
    }

    function _getPanelHeaderToggleButtonId() {
        //declare locals
        let idPrefix = "panelHeaderToggleButton";
        let retVal = domUtils.getElementId(_config.header.toggleButton, idPrefix, idPrefix);

        //check for an id
        if (utils.isEmpty(retVal)) {
            retVal = _config.id + "_headerToggleButton";
        }

        //return the method's value
        return retVal;
    }

    function _getPanelBodyId() {
        //declare locals
        let idPrefix = "panelBody";
        let retVal = domUtils.getElementId(_config.body, idPrefix, idPrefix);

        //check for an id
        if (utils.isEmpty(retVal)) {
            retVal = _config.id + "_body";
        }

        //return the method's value
        return retVal;
    }

    function _getPanelClassDefault() {
        let retVal = "panel";
        return retVal;
    }

    function _getPanelCss() {
        //declare locals
        let defaultClass = _getPanelClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
				"border": "none",
			    "outline": "1px solid",
			    "border-radius": "10px",
			    "min-height": "30px",
			    "min-width": "30px",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config, defaultClass, _config.id);

        //return the method's value
        return jsonCss;
    }

    function _getPanelHeaderClassDefault() {
        let retVal = "panelHeader";
        return retVal;
    }

    function _getPanelHeaderCss() {
        //declare locals
        let defaultClass = _getPanelHeaderClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
				"border": "none",
            },
            {
                "cssSelector": defaultClass+"movable",
				"cursor": "grab",
            },
            {
                "cssSelector": defaultClass+"H",
			    "width": "100%",
			    "height": "30px",
                "float": "none",
            },
            {
                "cssSelector": defaultClass+"HT",
                "border-top-left-radius": "10px",
                "border-top-right-radius": "10px",
            },
            {
                "cssSelector": defaultClass+"HB",
                "border-bottom-left-radius": "10px",
                "border-bottom-right-radius": "10px",
            },
            {
                "cssSelector": defaultClass+"V",
			    "height": "100%",
			    "width": "30px",
                "float": "left",
            },
            {
                "cssSelector": defaultClass+"VL",
                "border-top-left-radius": "10px",
                "border-bottom-left-radius": "10px",
            },
            {
                "cssSelector": defaultClass+"VR",
                "border-top-right-radius": "10px",
                "border-bottom-right-radius": "10px",
            },
            {
                "cssSelector": defaultClass+"BB",
                "border-bottom": "1px solid",
            },
            {
                "cssSelector": defaultClass+"BT",
                "border-top": "1px solid",
            },
            {
                "cssSelector": defaultClass+"BR",
                "border-right": "1px solid",
            },
            {
                "cssSelector": defaultClass+"BL",
                "border-left": "1px solid",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.header, defaultClass, _config.header.id);

        //return the method's value
        return jsonCss;
    }

    function _getPanelHeaderCloseButtonClassDefault() {
        let retVal = "panelHeaderButtonClose";
        return retVal;
    }

    function _getPanelHeaderCloseButtonCss() {
        //declare locals
        let defaultClass = _getPanelHeaderCloseButtonClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
			    "border": "none",
			    "background-color": "#cccccc",
			    "outline": "0px solid",
			    "border-radius": "10px",
			    "cursor": "pointer",
			    "height": "20px",
			    "width": "20px",
			    "margin-top": "5px",
            },
            {
                "cssSelector": defaultClass+":focus",
			    "box-shadow": "5px 5px 10px #666666",
            },
            {
                "cssSelector": defaultClass+"-hover",
			    "box-shadow": "5px 5px 10px #666666",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.header.closeButton, defaultClass, _config.header.closeButton.id);

        //return the method's value
        return jsonCss;
    }

    function _getPanelHeaderToggleButtonClassDefault() {
        let retVal = "panelHeaderButtonToggle";
        return retVal;
    }

    function _getPanelHeaderToggleButtonCss() {
        //declare locals
        let defaultClass = _getPanelHeaderToggleButtonClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
			    "border": "none",
			    "background-color": "#cccccc",
			    "outline": "0px solid",
			    "border-radius": "10px",
			    "cursor": "pointer",
			    "height": "20px",
			    "width": "20px",
			    "margin-top": "4px",
            },
            {
                "cssSelector": defaultClass+":focus",
			    "box-shadow": "5px 5px 10px #666666",
            },
            {
                "cssSelector": defaultClass+"-hover",
			    "box-shadow": "5px 5px 10px #666666",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.header.toggleButton, defaultClass, _config.header.toggleButton.id);

        //return the method's value
        return jsonCss;
    }

    function _getPanelHeaderIconClassDefault() {
        let retVal = "panelHeaderIcon";
        return retVal;
    }

    function _getPanelHeaderIconCss() {
        //declare locals
        let defaultClass = _getPanelHeaderIconClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
			    "height": "20px",
			    "width": "20px",
				"padding-left": "5px",
    			"padding-right": "5px",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.header.icon, defaultClass, _config.header.icon.id);

        //return the method's value
        return jsonCss;
    }

    function _getPanelHeaderTextClassDefault() {
        let retVal = "panelHeaderText";
        return retVal;
    }

    function _getPanelHeaderTextCss() {
        //declare locals
        let defaultClass = _getPanelHeaderTextClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
				"white-space": "nowrap",
				"overflow": "hidden",
				"text-overflow": "ellipsis",
			    "padding-left": "5px",
			    "padding-right": "5px",
			    "padding-top": "4px",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.header.text, defaultClass, _config.header.text.id);

        //return the method's value
        return jsonCss;
    }

    function _getPanelBodyClassDefault() {
        let retVal = "panelBody";
        return retVal;
    }

    function _getPanelBodyCss() {
        //declare locals
        let defaultClass = _getPanelBodyClassDefault();
        let jsonCss = [
            {
                "cssSelector": defaultClass,
				"overflow-x": "auto",
				"overflow-y": "auto",
            },
            {
                "cssSelector": defaultClass+"H",
				"width": "100%",
                "float": "none",
            },
            {
                "cssSelector": defaultClass+"V",
				"height": "100%",
                "float": "left",
            },
        ];

        //invoke the generic function
        jsonCss = uiCompsUtils.getMergedCss(jsonCss, _config.body, defaultClass, _config.body.id);

        //return the method's value
        return jsonCss;
    }

    function _getState() {
        //declare locals
        let defaultState = "expanded";
        let retVal;

        //check for a valid configuration value
        if (!utils.isString(_config.state)) {
            retVal = defaultState;
        }
        if (_config.state.toLowerCase()=="expanded" || _config.state.toLowerCase()=="collapsed") {
            retVal = _config.state.toLowerCase();
        }
        else {
            retVal = defaultState;
        }

        //save the state to the configuration
        _config.state = retVal;

        //return the method's value
        return retVal;
    }

    function _render() {
        _renderPanel();
        let panelNode = utils.getFromDom(_config.id);
        let headerNode = _renderHeader();
        let bodyNode = _renderBody();
        let cssTagId = domUtils.getCssTagId(_config);
        let styleString;
        let headerContentsNodeId = _config.header.id+"_contents";

        //get the header's alignment
        let headerAlignment = uiCompsUtils.getConfigAlignment(_config.header);
        switch (headerAlignment) {
            case "bottom":
            case "right":
                panelNode.appendChild(bodyNode);
                panelNode.appendChild(headerNode);
                break;
            case "top":
            case "left":
                panelNode.appendChild(headerNode);
                panelNode.appendChild(bodyNode);
                break;
            default:
                break;
        }

        //render the icon and text nodes
        uiCompsUtils.renderIconTextNodes(_config.header, headerContentsNodeId);

        //render the hesder node's children and the body node's children
        html5Utils.renderChildren(_config.header.children, headerNode, cssTagId);
        html5Utils.renderChildren(_config.body.children, bodyNode, cssTagId);

        //fix the body node's height and width
        let headerHeight = headerNode.getBoundingClientRect().height;
        let headerWidth = headerNode.getBoundingClientRect().width;
        if (headerAlignment=="bottom" || headerAlignment=="top") {
            styleString = "height: calc(100% - " + headerHeight + "px);";
        }
        else {
            styleString = "width: calc(100% - " + headerWidth + "px);";
        }
        domUtils.setStyle(bodyNode, styleString);

        //set some style according to the header's direction (bottomToTop, or topToBottom)
        let headerContentsNode = utils.getFromDom(headerContentsNodeId);
        let buttonsWidth = 10;
        let buttonNodeClose = null;
        let buttonNodeToggle = null;
        let headerDirection = null;
        let rotateDeg = 90;
        let floatStyle = "float:"+uiCompsUtils.getFloatValue(_config)+";";
        let iconNode = null;
        let textNode = null;

        //check for a header direction
        if (jsonUtils.hasValue(_config.header, "direction")) {
            headerDirection = _config.header.direction;
            headerDirection = headerDirection.toLowerCase();
            if (headerDirection=="btt" || headerDirection=="bottomtotop") {
                rotateDeg = 270;
            }
        }

        //check for an icon node
        if (uiCompsUtils.hasIconNode(_config.header)) {
            buttonsWidth += 25;
        }

        //check for buttons nodes
        if (!utils.isEmpty(headerContentsNode)) {
            if (utils.isTrue(_config.closeable)) {
                buttonsWidth += 25;
                if (utils.isInDom(_config.header.closeButton.id)) {
                    buttonNodeClose = utils.getFromDom(_config.header.closeButton.id);
                    headerContentsNode.removeChild(buttonNodeClose);
                }
                buttonNodeClose = _renderCloseButtonNode();
                if (!utils.isEmpty(buttonNodeClose)) {
                    headerContentsNode.appendChild(buttonNodeClose);
                }
            }
            if (utils.isTrue(_config.collapsible)) {
                buttonsWidth += 25;
                if (utils.isInDom(_config.header.toggleButton.id)) {
                    buttonNodeToggle = utils.getFromDom(_config.header.toggleButton.id);
                    headerContentsNode.removeChild(buttonNodeToggle);
                }
                buttonNodeToggle = _renderToggleButtonNode();
                if (!utils.isEmpty(buttonNodeToggle)) {
                    headerContentsNode.appendChild(buttonNodeToggle);
                }
            }
        }

        //render the icon and text nodes
        uiCompsUtils.renderIconTextNodes(_config.header.closeButton);
        uiCompsUtils.renderIconTextNodes(_config.header.toggleButton);

        //set the header's icon and text node's style
        if (uiCompsUtils.hasIconNode(_config.header)) {
            iconNode = utils.getFromDom(_config.header.icon.id);
            if (!utils.isEmpty(iconNode)) {
                styleString = floatStyle;
                domUtils.setStyle(iconNode, styleString);
            }
        }
        if (uiCompsUtils.hasTextNode(_config.header)) {
            textNode = utils.getFromDom(_config.header.text.id);
            if (!utils.isEmpty(textNode)) {
                styleString = floatStyle+"padding-top:4px;width:calc(100% - " + buttonsWidth + "px)";
                domUtils.setStyle(textNode, styleString);
            }
        }

        //check the alignment
        switch (headerAlignment) {
            case "bottom":
            case "top":
                break;
            case "right":
            case "left":
                if (!utils.isEmpty(headerContentsNode)) {
                    let top = ((headerHeight-50)/2) + 10;
                    styleString = "position:relative;top:"+top+"px;left:-"+top+"px;transform: rotate("+rotateDeg+"deg);width:"+(headerHeight)+"px;height:"+(headerWidth)+"px;";
                    domUtils.setStyle(headerContentsNode, styleString);
                }
                break;
            default:
                break;
        }
    }

    function _renderPanel() {
        let parentNode = uiCompsUtils.getRenderTo(_config);
        let compId = _getPanelId();
        let compNode;
        _config.id = compId;
        let cssTagId = domUtils.getCssTagId(_config);
        _config["cssTagId"] = cssTagId;
        let defaultCompClass = _getPanelClassDefault();
        let pos;
        let leftPos;
        let topPos;

        //render the component's css
        let jsonCss;
        jsonCss = _getPanelCss();
        html5Utils.renderCss(jsonCss, cssTagId);

        //create the component's node
        compNode = document.createElement("div");

        //set all attributes for this node
        let excludeAttribues = ["icon","text"];
        html5Utils.setNodeAttributes(compNode, compNode.tagName, _config, excludeAttribues);
        
        //copy attributes from the existing DOM node to the new DOM node
        domUtils.setAttributeValue(compNode, dataAttNamePanelHeight, domUtils.getAttributeValue(_config.id, dataAttNamePanelHeight));
        domUtils.setAttributeValue(compNode, dataAttNamePanelWidth, domUtils.getAttributeValue(_config.id, dataAttNamePanelWidth));
        pos = domUtils.getStyle(_config.id, "position");
        leftPos = parseFloat(domUtils.getAttributeValue(_config.id, dataAttNameLeft));
        topPos = parseFloat(domUtils.getAttributeValue(_config.id, dataAttNameTop));
        if (!utils.isEmpty(pos)) {
            domUtils.setStyle(compNode, {"position": pos});
        }
        if (!utils.isEmpty(leftPos)) {
            domUtils.setAttributeValue(compNode, dataAttNameLeft, leftPos);
            domUtils.setStyle(compNode, {"left":String(leftPos)+"px"});
        }
        if (!utils.isEmpty(topPos)) {
            domUtils.setAttributeValue(compNode, dataAttNameTop, topPos);
            domUtils.setStyle(compNode, {"top":String(topPos)+"px"});
        }

        //remove the component if it exists in the DOM
        uiCompsUtils.removeChildNode(parentNode, _config.id);

        //set built-in attributes for this node
        compNode.setAttribute("id", compId);
        compNode.setAttribute("name", compId);
        compNode.classList.add(defaultCompClass);
        if (jsonUtils.hasValue(_config, "class") && utils.isString(_config.class)) {
            compNode.classList.add(_config.class);
        }

        //set the component's position


        parentNode.appendChild(compNode);

        //render child elements
        html5Utils.renderChildren(_config.children, _config.id, cssTagId);
    }

    function _renderHeader() {
        let parentNode = utils.getFromDom(_config.id);
        let compId = _getPanelHeaderId();
        let compNode;
        _config.header.id = compId;
        let cssTagId = domUtils.getCssTagId(_config);
        _config.header["cssTagId"] = cssTagId;
        let defaultCompClass = _getPanelHeaderClassDefault();
        let headerContentsNodeId;
        let headerContentsNode;

        //remove the component if it exists in the DOM
        uiCompsUtils.removeChildNode(parentNode, _config.header.id);

        //render the component's css
        let jsonCss;
        jsonCss = _getPanelHeaderCss();
        html5Utils.renderCss(jsonCss, cssTagId);

        //create the component's node
        compNode = document.createElement("div");
        
        //set all attributes for this node
        let excludeAttribues = ["icon","text"];
        html5Utils.setNodeAttributes(compNode, compNode.tagName, _config.header, excludeAttribues);
        
        //set built-in attributes for this node
        compNode.setAttribute("id", compId);
        compNode.setAttribute("name", compId);
        compNode.classList.add(defaultCompClass);
        if (jsonUtils.hasValue(_config, "class") && utils.isString(_config.class)) {
            compNode.classList.add(_config.class);
        }

        //check if the component is movable
        if (utils.isTrue(_config.movable)) {
            compNode.classList.add(defaultCompClass+"movable");
        }

        //get the header's alignment
        let headerAlignment = uiCompsUtils.getConfigAlignment(_config.header);
        switch (headerAlignment) {
            case "bottom":
                compNode.classList.add(defaultCompClass+"H");
                compNode.classList.add(defaultCompClass+"HB");
                compNode.classList.add(defaultCompClass+"BT");
                break;
            case "top":
                compNode.classList.add(defaultCompClass+"H");
                compNode.classList.add(defaultCompClass+"HT");
                compNode.classList.add(defaultCompClass+"BB");
                break;
            case "left":
                compNode.classList.add(defaultCompClass+"V");
                compNode.classList.add(defaultCompClass+"VL");
                compNode.classList.add(defaultCompClass+"BR");
                break;
            case "right":
                compNode.classList.add(defaultCompClass+"V");
                compNode.classList.add(defaultCompClass+"VR");
                compNode.classList.add(defaultCompClass+"BL");
                break;
            default:
                break;
        }

        //create the header's contents node
        headerContentsNodeId = compId+"_contents";
        headerContentsNode = document.createElement("div");
        headerContentsNode.setAttribute("id", headerContentsNodeId);

        //appent it to the header node
        compNode.appendChild(headerContentsNode);

        //return the method's value
        return compNode;
    }

    function _renderCloseButtonNode() {
        let parentNode = utils.getFromDom(_config.header.id);
        let compId = _getPanelHeaderCloseButtonId();
        let wrapperNode;
        let compNode;
        _config.header.closeButton.id = compId;
        let cssTagId = domUtils.getCssTagId(_config);
        _config.header.closeButton["cssTagId"] = cssTagId;
        let defaultCompClass = _getPanelHeaderCloseButtonClassDefault();
        let floatValue = uiCompsUtils.getFloatValueReversed(_config);
        let direction = uiCompsUtils.getConfigDirection(_config);
        let margin = (direction=="ltr" ? "margin-right:5px;" : "margin-left:5px;");
        let styleString = "float:"+floatValue+";"+margin;

        //remove the component if it exists in the DOM
        uiCompsUtils.removeChildNode(parentNode, _config.header.closeButton.id);

        //render the component's css
        let jsonCss;
        jsonCss = _getPanelHeaderCloseButtonCss();
        html5Utils.renderCss(jsonCss, cssTagId);

        //create the component's node
        wrapperNode = document.createElement("div");
        domUtils.setStyle(wrapperNode, styleString);
        compNode = document.createElement("button");
        
        //set all attributes for this node
        if (!utils.isString(_config.header.closeButton.tooltip)) {
            _config.header.closeButton.tooltip = "click here to close this panel";
        }
        let excludeAttribues = ["icon","text"];
        html5Utils.setNodeAttributes(compNode, compNode.tagName, _config.header.closeButton, excludeAttribues);
        
        //set built-in attributes for this node
        compNode.setAttribute("id", compId);
        compNode.setAttribute("name", compId);
        compNode.classList.add(defaultCompClass);
        if (jsonUtils.hasValue(_config.header.closeButton, "class") && utils.isString(_config.header.closeButton.class)) {
            compNode.classList.add(_config.header.closeButton.class);
        }

        //set the button's text or icon
        if (!uiCompsUtils.hasIconNode(_config.header.closeButton) && !uiCompsUtils.hasTextNode(_config.header.closeButton)) {
            _config.header.closeButton.text = {"id": compId+"_text","text":"x","style":"font-size:14px;margin-left:-4px;"};
        }

        //add the button's event handlers
        if (!utils.isTrue(_config.header.closeButton.disabled)) {
            compNode.addEventListener("mouseover", function() {
                this.classList.add(defaultCompClass+"-hover");
            });
            compNode.addEventListener("mouseout", function() {
                this.classList.remove(defaultCompClass+"-hover");
            });
        }
        compNode.addEventListener("click", function() {
            _showPanel(false);
        });
        wrapperNode.appendChild(compNode);

        //return the method's value
        return wrapperNode;
    }

    function _renderToggleButtonNode() {
        let parentNode = utils.getFromDom(_config.header.id);
        let compId = _getPanelHeaderToggleButtonId();
        let wrapperNode;
        let compNode;
        _config.header.toggleButton.id = compId;
        let cssTagId = domUtils.getCssTagId(_config);
        _config.header.toggleButton["cssTagId"] = cssTagId;
        let defaultCompClass = _getPanelHeaderToggleButtonClassDefault();
        let floatValue = uiCompsUtils.getFloatValueReversed(_config);
        let direction = uiCompsUtils.getConfigDirection(_config);
        let margin = (direction=="ltr" ? "margin-right:5px;" : "margin-left:5px;");
        let styleString = "float:"+floatValue+";"+margin;

        //remove the component if it exists in the DOM
        uiCompsUtils.removeChildNode(parentNode, _config.header.toggleButton.id);

        //render the component's css
        let jsonCss;
        jsonCss = _getPanelHeaderToggleButtonCss();
        html5Utils.renderCss(jsonCss, cssTagId);

        //create the component's node
        wrapperNode = document.createElement("div");
        domUtils.setStyle(wrapperNode, styleString);
        compNode = document.createElement("button");
        
        //set all attributes for this node
        if (!utils.isString(_config.header.toggleButton.tooltip)) {
            _config.header.toggleButton.tooltip = "click here to collapse/expand this panel";
        }
        let excludeAttribues = ["icon","text"];
        html5Utils.setNodeAttributes(compNode, compNode.tagName, _config.header.toggleButton, excludeAttribues);
        
        //set built-in attributes for this node
        compNode.setAttribute("id", compId);
        compNode.setAttribute("name", compId);
        compNode.classList.add(defaultCompClass);
        if (jsonUtils.hasValue(_config.header.toggleButton, "class") && utils.isString(_config.header.toggleButton.class)) {
            compNode.classList.add(_config.header.toggleButton.class);
        }

        //set the button's text or icon
        if (!uiCompsUtils.hasIconNode(_config.header.toggleButton) && !uiCompsUtils.hasTextNode(_config.header.toggleButton)) {
            _config.header.toggleButton.text = {"id": compId+"_text","text":"-","style":"font-size: 20px;margin-top:-5px;margin-left:-5px;"};
            _config.header.toggleButton.textExpand = "+";
            //_config.header.toggleButton.icon = {"icon":"8861","style":"font-size:22px;margin-top:-7px;margin-left:-12px;"};
            //_config.header.toggleButton.iconExpand = "8853";
        }

        //add the button's event handlers
        if (!utils.isTrue(_config.header.toggleButton.disabled)) {
            compNode.addEventListener("mouseover", function() {
                this.classList.add(defaultCompClass+"-hover");
            });
            compNode.addEventListener("mouseout", function() {
                this.classList.remove(defaultCompClass+"-hover");
            });
        }
        compNode.addEventListener("click", function() {
            _toggle();
        });
        wrapperNode.appendChild(compNode);

        //return the method's value
        return wrapperNode;
    }

    function _renderBody() {
        let parentNode = utils.getFromDom(_config.id);
        let compId = _getPanelBodyId();
        let compNode;
        _config.body.id = compId;
        let cssTagId = domUtils.getCssTagId(_config);
        _config.body["cssTagId"] = cssTagId;
        let defaultCompClass = _getPanelBodyClassDefault();

        //render the component's css
        let jsonCss;
        jsonCss = _getPanelBodyCss();
        html5Utils.renderCss(jsonCss, cssTagId);

        //create the component's node
        compNode = document.createElement("div");

        //set all attributes for this node
        let excludeAttribues = ["icon","text"];
        html5Utils.setNodeAttributes(compNode, compNode.tagName, _config.body, excludeAttribues);
        
        //copy attributes from the existing DOM node to the new DOM node
        domUtils.setAttributeValue(compNode, dataAttNameBodyHeight, domUtils.getAttributeValue(_config.body.id, dataAttNameBodyHeight));
        domUtils.setAttributeValue(compNode, dataAttNameBodyWidth, domUtils.getAttributeValue(_config.body.id, dataAttNameBodyWidth));

        //remove the component if it exists in the DOM
        uiCompsUtils.removeChildNode(parentNode, _config.body.id);

        //set built-in attributes for this node
        compNode.setAttribute("id", compId);
        compNode.setAttribute("name", compId);
        compNode.classList.add(defaultCompClass);
        if (jsonUtils.hasValue(_config.body, "class") && utils.isString(_config.body.class)) {
            compNode.classList.add(_config.body.class);
        }

        //get the header's alignment
        let headerAlignment = uiCompsUtils.getConfigAlignment(_config.header);
        switch (headerAlignment) {
            case "bottom":
            case "top":
                compNode.classList.add(defaultCompClass+"H");
                break;
            case "left":
            case "right":
                compNode.classList.add(defaultCompClass+"V");
                break;
            default:
                break;
        }

        //return the method's value
        return compNode;
    }

    function _setConfig(config) {
        _config = jsonUtils.mergeJson(_config, config);
        _render();
    }

    function _showPanel(show) {
        let display = (utils.isTrue(show) ? "block" : "none");
        let elemId = _config.id;
        let elemNode = null;

        if (utils.isInDom(elemId)) {
            elemNode = utils.getFromDom(elemId);
            if (!utils.isEmpty(elemNode)) {
                elemNode.style.display = display;
            }
        }
    }

    function _collapse() {
        //declare locals
        let buttonTextExpand = (utils.isEmpty(_config.header.toggleButton.textExpand) ? "+" : _config.header.toggleButton.textExpand);
        let buttonIconExpand = (utils.isEmpty(_config.header.toggleButton.iconExpand) ? "" : _config.header.toggleButton.iconExpand);
        let headerNode = utils.getFromDom(_config.header.id);
        let defaultHeaderClass = _getPanelHeaderClassDefault();
        let headerAlignment = uiCompsUtils.getConfigAlignment(_config.header);
        let toggleConfig = {
            state: _getState(),
            compId: _config.id,
            compBodyId: _config.body.id,
            compHeaderId: _config.header.id,
            headerAlignment: headerAlignment,
            buttonId: _config.header.toggleButton.id,
            buttonIconId: _config.header.toggleButton.icon.id,
            buttonTextId: _config.header.toggleButton.text.id,
            buttonText: buttonTextExpand,
            buttonIcon: buttonIconExpand,
            animateButton: _config.header.toggleButton.animate,
            buttonAnimationDuration: _config.header.toggleButton.animationDuration,
            animationDuration: _config.toggleAnimationDuration,
        };
        
        //invoke the generic collapse method
        uiCompsUtils.collapse(toggleConfig, function(newState) {
            switch (headerAlignment) {
                case "top":
                    headerNode.classList.remove(defaultHeaderClass+"BB");
                    break;
                case "bottom":
                    headerNode.classList.remove(defaultHeaderClass+"BT");
                    break;
                case "left":
                    headerNode.classList.remove(defaultHeaderClass+"BR");
                    break;
                case "right":
                    headerNode.classList.remove(defaultHeaderClass+"BL");
                    break;
            }
            _config.state = newState;
        });
    }

    function _expand() {
        //declare locals
        let buttonTextCollapse = (utils.isEmpty(_config.header.toggleButton.text.text) ? "+" : _config.header.toggleButton.text.text);
        let buttonIconCollapse = (utils.isEmpty(_config.header.toggleButton.icon.icon) ? "" : _config.header.toggleButton.icon.icon);
        let headerNode = utils.getFromDom(_config.header.id);
        let defaultHeaderClass = _getPanelHeaderClassDefault();
        let headerAlignment = uiCompsUtils.getConfigAlignment(_config.header);
        let toggleConfig = {
            state: _getState(),
            compId: _config.id,
            compBodyId: _config.body.id,
            compHeaderId: _config.header.id,
            headerAlignment: headerAlignment,
            buttonId: _config.header.toggleButton.id,
            buttonIconId: _config.header.toggleButton.icon.id,
            buttonTextId: _config.header.toggleButton.text.id,
            buttonText: buttonTextCollapse,
            buttonIcon: buttonIconCollapse,
            animateButton: _config.header.toggleButton.animate,
            buttonAnimationDuration: _config.header.toggleButton.animationDuration,
            animationDuration: _config.toggleAnimationDuration,
        };

        switch (headerAlignment) {
            case "top":
                headerNode.classList.add(defaultHeaderClass+"BB");
                break;
            case "bottom":
                headerNode.classList.add(defaultHeaderClass+"BT");
                break;
            case "left":
                headerNode.classList.add(defaultHeaderClass+"BR");
                break;
            case "right":
                headerNode.classList.add(defaultHeaderClass+"BL");
                break;
        }

        //invoke the generic collapse method
        uiCompsUtils.expand(toggleConfig, function(newState) {
            _config.state = newState;
        });
    }

    function _toggle() {
        //declare locals
        let currState = _getState();

        //check the current state
        if (currState=="expanded") {
            _collapse();
        }
        else {
            _expand();
        }
    }

    this.collapse = function() {
        _collapse();
    };

    this.expand = function() {
        _expand();
    };

    this.getConfig = function() {
        //return the method's value
        return _config;
    };

    this.getConfigUi = function() {
        //return the method's value
        return _configUi;
    };

    this.getId = function() {
        //return the method's value
        return _config.id;
    };

    this.getType = function() {
        //return the method's value
        return "panel";
    };

    this.render = function() {
        _render();
    }

    this.setConfig = function (config) {
        _setConfig(config);
    };

    this.setConfigUi = function (configUi) {
        _configUi = jsonUtils.mergeJson(_configUi, configUi);
    };

    this.toggle = function() {
        _toggle();
    };

    //invoke the _init method
    if (config != null && utils.isJson(config)) {
        this.setConfig(config);
    }
    else {
        this.setConfig(_config);
    }
};
