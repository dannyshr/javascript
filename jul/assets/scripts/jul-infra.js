/*! jul-infra.js v1.0.0 | common javascript utility functions | (c) Danny Shraga 2022 */
const utils = {
    isEmpty: function(input) {
        //check for valid values
        if (input!==undefined && input!==null) {
            if (typeof(input)=="string") {
                if (input.length<1 || input.trim().length<1 || input=="" ||  input=="undefined" ) {
                    return true;
                }
            }
            return false;
        }

        //return the method's value
        return true;
    },
    isInvalidNumber: function(input) {
        //check for valid values
        if (isNaN(input)) {
            return true;
        }
        if (parseInt(input)==-1) {
            return true;
        }

        //return the method's value
        return false;
    },
    isString: function(input) {
        //check for valid values
        if (utils.isEmpty(input)) {
            return false;
        }
        //return the method's value
        return (typeof(input)=="string" ? true : false);
    },
    isNumeric: function(input) {
        //check for valid values
        if (utils.isEmpty(input)) {
            return false;
        }
        //return the method's value
        return (typeof(input)=="number" ? true : false);
    },
    isDate: function(input) {
        //check for valid values
        if (utils.isEmpty(input)) {
            return false;
        }
        //return the method's value
        return (typeof(input)=="object" ? (typeof(input.valueOf())=="number" ? true : false) : false);
    },
    isBool: function(input) {
        //check for valid values
        if (utils.isEmpty(input)) {
            return false;
        }
        //return the method's value
        return (typeof(input)=="boolean" ? true : false);
    },
    isTrue: function(input) {
        //check for valid values
        if (utils.isEmpty(input)) {
            return false;
        }
        if (typeof(input)=="string" || typeof(input)=="boolean") {
            if (typeof(input)=="string") {
                if (input.toLowerCase()=="true") {
                    return true;
                }
            }
            else {
                return input;
            }
        }

        //return the method's value
        return false;
    },
    isJson: function(input) {
        //check for valid values
        if (utils.isEmpty(input)) {
            return false;
        }

        //return the method's value
        return ((typeof(input)=="object" && !Array.isArray(input)) ? true : false);
    },
    isArray: function(input) {
        //check for valid values
        if (utils.isEmpty(input)) {
            return false;
        }
        return Array.isArray(input);
    },
    isFunction: function(input) {
        //check for valid values
        if (utils.isEmpty(input)) {
            return false;
        }
        if (typeof(input)=="function") {
            return true;
        }
        return false;
    },
    isElementNode: function(input) {
        if (utils.isEmpty(input)) {
            return false;
        }
        if (typeof(input)=="object" && input.nodeType && input.nodeType==1) {
            return true;
        }
        return false;
    },
    isInArray: function(item, array) {
        return (utils.indexOf(item, array)==-1 ? false : true);
    },
    indexOf: function(item, array) {
        //declare locals
        let index = -1;

        //check for valid values
        if (utils.isEmpty(item)) {
            return index;
        }
        if (!utils.isString(item)) {
            return index;
        }
        if (utils.isEmpty(array)) {
            return index;
        }
        if (!utils.isArray(array)) {
            return index;
        }

        //loop through the items
        for (let i=0;i<array.length;i++) {
            //get the current item
            let currItem = array[i];

            //check for valid values
            if (utils.isEmpty(currItem)) {
                continue;
            }
            if (!utils.isString(currItem)) {
                continue;
            }

            //compare the two items
            if (item.toLowerCase()==currItem.toLowerCase()) {
                index = i;
                break;
            }
        }

        //return the method's value
        return index;
    },
    isStringArray: function(string, delimiter) {
        //declare locals
        let DEFAULT_DELIMITER = ",";

        //check for valid values
        if (utils.isEmpty(string)) {
            return false;
        }
        if (utils.isEmpty(delimiter)) {
            delimiter = DEFAULT_DELIMITER;
        }

        //return the method's value
        return (string.indexOf(delimiter)==-1 ? false : true);
    },
    isValidImageExtension: function(input) {
        //declare locals
        let validImageExtensions = [".bmp", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".tiff"];
        let isValid = false;

        //check for valid values
        if (!utils.isString(input)) {
            return false;
        }

        //loop through the extensions
        for (let i=0; i<validImageExtensions.length; i++) {
            if (input.toLowerCase().endsWith(validImageExtensions[i])) {
                isValid = true;
                break;
            }
        }

        //return the method's value
        return isValid;
    },
    array2string: function(array, delimiter) {
        //declare locals
        let DEFAULT_DELIMITER = ",";
        let retVal = "";

        //check for valid values
        if (utils.isEmpty(array)) {
            return retVal;
        }
        if (delimiter==null || delimiter==undefined) {
            delimiter = DEFAULT_DELIMITER;
        }

        if (!utils.isArray(array)) {
            if (utils.isJson(array)) {
                return utils.json2string(array, delimiter);
            }
            else {
                return new String(array);
            }
        }

        //loop through the items
        for (let i=0;i<array.length;i++) {
            if (i>0) {
                retVal += delimiter;
            }
            retVal += array[i];
        }

        //return the method's value
        return retVal;
    },
    string2array: function(string, delimiter) {
        //declare locals
        let DEFAULT_DELIMITER = ",";
        let delimiterIndex = -1;
        let retVal = null;

        //check for valid values
        if (utils.isEmpty(string)) {
            return retVal;
        }
        if (delimiter==null || delimiter==undefined) {
            delimiter = DEFAULT_DELIMITER;
        }

        //check for a delimiter
        delimiterIndex = string.indexOf(delimiter);
        if (delimiterIndex==-1) {
            if (utils.isString(string)) {
                string = string.trim();
            }
            retVal = new Array(string);
        }
        else {
            retVal = string.split(delimiter);
            //trim the array's items
            for (let i=0;i<retVal.length;i++) {
                if (utils.isString(retVal[i])) {
                    retVal[i] = retVal[i].trim();
                }
            }
        }

        //return the method's value
        return retVal;
    },
    json2string: function(json, delimiter) {
        //declare locals
        let DEFAULT_DELIMITER = ",";
        let retVal = "";

        //check for valid values
        if (utils.isEmpty(json)) {
            return retVal;
        }
        if (utils.isEmpty(delimiter)) {
            delimiter = DEFAULT_DELIMITER;
        }

        //check the object's type
        if (utils.isJson(json)) {
            let counter = 0;
            retVal += "{";
            for (let fieldName in json) {
                if (json.hasOwnProperty(fieldName)) {
                    if (counter>0) {
                        retVal += delimiter;
                    }
                    //get the current item
                    retVal += json[fieldName];
                    counter++;
                }
            }
            retVal += "}";
            return retVal;
        }
        else {
            return new String(json);
        }
    },
    getQueryString: function(url) {
        //declare locals
        let delimiter = "?";
        let index = -1;

        //check for valid values
        if (utils.isEmpty(url)) {
            url = location.href;
        }

        //check for a qs delimiter
        index = url.indexOf(delimiter);
        if (index==-1) {
            return "";
        }

        //return the method's value
        return url.substring(index+1);
    },
    getQueryStringParamValue: function(paramName) {
        //declare locals
        let methodName = "getQueryStringParamValue(): ";
        let logMessage = "";
        let itemsDelimiter = "&";
        let partsDelimiter = "=";
        let delimiterIndex = -1;
        let qs = getQueryString();
        let arrQsItems = null;
        let qsItem = null;
        let arrQsItemParts = null;
        let qsParamName = null;
        let qsParamValue = null;
        let retVal = null;

        //check for valid values
        if (utils.isEmpty(qs)) {
            logMessage = "qs is empty or null !!";
            console.error(methodName + logMessage);
            return null;
        }
        if (utils.isEmpty(paramName)) {
            logMessage = "paramName is empty or null !!";
            console.error(methodName + logMessage);
            return null;
        }

        //check for a query string delimiter
        delimiterIndex = qs.indexOf(itemsDelimiter);
        if (delimiterIndex==-1) {
            arrQsItems = new Array(qs);
        }
        else {
            arrQsItems = qs.split(itemsDelimiter);
        }

        //loop through the items
        for (let i=0;i<arrQsItems.length;i++) {
            //get the current item
            qsItem = arrQsItems[i];

            //check for a key=value delimiter
            if (qsItem.indexOf(partsDelimiter)==-1) {
                continue;
            }

            //parse it into an array of key and value
            arrQsItemParts = qsItem.split(partsDelimiter);
            qsParamName = arrQsItemParts[0];
            qsParamValue = arrQsItemParts[1];

            //check for valid  values
            if (utils.isEmpty(qsParamName)) {
                continue;
            }

            //compare the two names
            if (qsParamName.toLowerCase()==paramName.toLowerCase()) {
                retVal = qsParamValue;
                break;
            }
        }

        //return the method's value
        return retVal;
    },
    replaceAll: function(input, find, replace) {
        //declare locals
        let output = input;
        let index = -1;

        //check for valid values
        if (utils.isEmpty(output) || !utils.isString(output)) {
            return output;
        }
        if (!utils.isString(find)) {
            return output;
        }
        if (utils.isEmpty(replace)) {
            replace = "";
        }
        if (!utils.isString(replace)) {
            replace = replace + "";
        }

        //get the index of the find
        index = output.indexOf(find);

        //loop while the input has find
        while (index!=-1) {
            //replace the find string
            output = output.replace(find, replace);

            //get the next index of the find
            index = output.indexOf(find);
        }

        //return the method's value
        return output;
    },
    getCookie: function(name) {
        //declare locals
        let cookie = document.cookie;
        let delimiter = ";";
        let keyValueDelimiter = "=";
        let arrValues = null;
        let currItem = null;
        let currItemName = null;
        let currItemValue = null;
        let retVal = null;

        //check for valid values
        if (utils.isEmpty(name) || !utils.isString(name)) {
            return null;
        }
        if (utils.isEmpty(cookie)) {
            return null;
        }
        if (cookie.indexOf(delimiter)==-1) {
            arrValues = new Array(cookie);
        }
        else {
            arrValues = cookie.split(delimiter);
        }

        //loop through the array
        for (let i=0;i<arrValues.length;i++) {
            //get the current item
            currItem = arrValues[i];

            if (currItem.indexOf(keyValueDelimiter)==-1) {
                continue;
            }

            //get the current cookie's name and value
            currItemName = currItem.split(keyValueDelimiter)[0];
            currItemValue = currItem.split(keyValueDelimiter)[1];

            //compare the two names
            if (name.toLowerCase()==currItemName.toLowerCase()) {
                retVal = currItemValue;
                break;
            }
        }

        //return the method's value
        return retVal;
    },
    getRealValueFromString: function(stringValue) {
        //check for a valid string
        if (!utils.isString()) {
            return stringValue;
        }

        //check the value
        if (stringValue.toLowerCase()=="null") {
            return null;
        }
        else if (stringValue.toLowerCase()=="true" || stringValue.toLowerCase()=="false") {
            if (stringValue.toLowerCase()=="true") {
                return true;
            }
            else {
                return false;
            }
        }
        else if (isNaN(stringValue)) {
            //it is either one of: a string, a comma separated values string, a json object string
            //check for a json string
            if (stringValue.startsWith("{") && stringValue.endsWith("}")) {
                return JSON.parse(stringValue);
            }
            else if (stringValue.indexOf(",")==-1) {
                return stringValue;
            }
            else {
                return utils.string2array(stringValue);
            }
        }
        else {
            if (stringValue.indexOf(".")==-1) {
                return parseInt(stringValue);
            }
            else {
                return parseFloat(stringValue);
            }
        }
    },
    fixQuotes: function(input) {
        //declare locals
        let QUOTES = "\"";
        let find = QUOTES;
        let replace = "''";

        //return the method's value
        return utils.replaceAll(input, find, replace);
    },
    clearQuotes: function(input) {
        //declare locals
        let QUOTES = "\"";
        let find = QUOTES;
        let replace = "";

        //return the method's value
        return utils.replaceAll(input, find, replace);
    },
    isMobileOrTablet: function() {
        //declare locals
        let check = false;

        //perform the check
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substring(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);

        //return the method's value
        return check;
    },
    isInDom: function(elementId) {
        //check for valid values
        if (!utils.isString(elementId)) {
            return false;
        }

        //get the element by its id
        let elem = document.getElementById(elementId);

        //check for valid values
        if (elem==null || elem==undefined) {
            return false;
        }

        //return the method's value
        return true;
    },
    getFromDom: function (elementId) {
        //check for valid values
        if (!utils.isString(elementId)) {
            return null;
        }

        //get the element by its id
        let elem = document.getElementById(elementId);

        //check for valid values
        if (elem==null || elem==undefined) {
            return null;
        }

        //return the method's value
        return elem;
    },
    generateId: function(tagName, prefix) {
        //get the current tag count
        let numElems;
        let elems = null;

        //check for valid values
        if (!utils.isString(tagName)) {
            numElems = 0;
        }
        else {
            //get the element by its id
            elems = document.getElementsByTagName(tagName);

            //check for valid values
            if (elems==null || elems==undefined) {
                numElems = 0;
            }
            else {
                numElems = elems.length;
            }
        }

        //set the returned value
        let newId;
        numElems += 1;
        if (utils.isEmpty(prefix)) {
            if (utils.isEmpty(tagName)) {
                newId = "tag" + numElems;
            }
            else {
                newId = String(tagName) + numElems;
            }
        }
        else {
            newId = String(prefix) + numElems;
        }
        while (utils.isInDom(newId)) {
            numElems += 1;
            if (utils.isEmpty(prefix)) {
                if (utils.isEmpty(tagName)) {
                    newId = "tag" + numElems;
                }
                else {
                    newId = String(tagName) + numElems;
                }
            }
            else {
                newId = String(prefix) + numElems;
            }
        }

        //return the method's value
        return newId;
    },
    _getDatePartValue: function (date,part) {
        //declare locals
        let partValue = "";

        //check for nulls
        if (utils.isEmpty(date)) {
            return partValue;
        }
        if (utils.isEmpty(part)) {
            return partValue;
        }

        //check the part's value
        switch (part) {
            case "d":
            case "dd":
                partValue = String(date.getDate());
                break;
            case "h":
            case "hh":
            case "H":
            case "HH":
                partValue = String(date.getHours());
                break;
            case "m":
            case "mm":
                partValue = String(date.getMinutes());
                break;
            case "M":
            case "MM":
                partValue = String(date.getMonth() + 1);
                break;
            case "s":
            case "ss":
                partValue = String(date.getSeconds());
                break;
            case "S":
            case "SS":
            case "SSS":
                partValue = String(date.getMilliseconds());
                break;
            case "yyyy":
                partValue = String(date.getFullYear());
                break;
        }

        //complete the length of the value, according to the given part
        while (partValue.length<part.length) {
            partValue = "0" + partValue;
        }

        //return the method's value
        return partValue;
    },
    isValidDate: function(input) {
        //check for valid values
        if (utils.isEmpty(input) || !utils.isString(input)) {
            return false;
        }

        //try to get a formatted date
        let output = utils.formatDateString(input);

        //check for valid values
        if (utils.isEmpty(output)) {
            return false;
        }

        //return the method's value
        return true;
    },
    isValidTime: function(input) {
        //check for valid values
        if (utils.isEmpty(input) || !utils.isString(input)) {
            return false;
        }

        //try to get a formatted date
        let output = utils.formatTimeString(input);

        //check for valid values
        if (utils.isEmpty(output)) {
            return false;
        }

        //return the method's value
        return true;
    },
    isValidDateTime: function(input) {
        //check for valid values
        if (utils.isEmpty(input) || !utils.isString(input)) {
            return false;
        }

        //try to get a formatted date
        let output = utils.formatDateTimeString(input);

        //check for valid values
        if (utils.isEmpty(output)) {
            return false;
        }

        //return the method's value
        return true;
    },
    formatDateString: function(dateString) {
        //declare locals
        let dateDelimiters = [",","-","/","."];
        let dateFormatParts = ["dd","MM","yyyy"];
        let datetimeDelimiter = " ";
        let strDate;
        let dateDelimiter = null;
        let arrInputParts;
        let datePart;
        let date = null;
        let dateParts;

        //check for valid values
        if (utils.isEmpty(dateString)) {
            return null;
        }

        //convert the input into a string
        strDate = String(dateString);

        //get the date delimiter
        for (let i=0; i<dateDelimiters.length; i++) {
            if (strDate.indexOf(dateDelimiters[i])!=-1) {
                dateDelimiter = dateDelimiters[i];
                break;
            }
        }
        if (utils.isEmpty(dateDelimiter)) {
            return null;
        }

        //check for a date time delimiter
        if (strDate.indexOf(datetimeDelimiter)==-1) {
            datePart = strDate;
            //check for valid values
            if (utils.isEmpty(datePart)) {
                return null;
            }
        }
        else {
            arrInputParts = strDate.split(datetimeDelimiter);
            datePart = arrInputParts[0];
            //check for valid values
            if (utils.isEmpty(datePart)) {
                return null;
            }
        }

        //parse the date part according to the javascript default (MM, dd, YYYY)
        date = Date.parse(datePart);
        if (isNaN(date)) {
            dateParts = datePart.split(dateDelimiter);
            if (utils.isArray(dateParts) && dateParts.length==3) {
                date = Date.parse(dateParts[1] + dateDelimiter + dateParts[0] + dateDelimiter + dateParts[2]);
            }
        }

        //check for a valid date
        if (isNaN(date)) {
            return null;
        }

        //loop through the date parts
        for (let i=0;i<dateFormatParts.length;i++) {
            if (i>0) {
                datePart += dateDelimiter;
            }
            datePart += utils._getDatePartValue(date,dateFormatParts[i]);
        }

        //return the method's value
        return datePart;
    },
    formatTimeString: function(dateString) {
        //declare locals
        let timeFormatParts = ["HH","mm", "ss", "SSS"];
        let datetimeDelimiter = " ";
        let timeDelimiter = ":";
        let strDate;
        let dateDelimiter = null;
        let arrInputParts;
        let datePart;
        let timePart;
        let date = null;
        let dateParts;

        //check for valid values
        if (utils.isEmpty(dateString)) {
            return null;
        }

        //convert the input into a string
        strDate = String(dateString);

        //check for a date time delimiter
        if (strDate.indexOf(datetimeDelimiter)==-1) {
            let currDate = new Date();
            datePart = String(currDate.getDay()) + "-" + String(currDate.getMonth()+1) + "-" + String(currDate.getFullYear());
            timePart = strDate;
            //check for valid values
            if (utils.isEmpty(timePart)) {
                return null;
            }
        }
        else {
            arrInputParts = strDate.split(datetimeDelimiter);
            datePart = arrInputParts[0];
            timePart = arrInputParts[1];
            //check for valid values
            if (utils.isEmpty(datePart)) {
                return null;
            }
            if (utils.isEmpty(timePart) || (timePart.indexOf(timeDelimiter)==-1)) {
                return null;
            }
        }

        //parse the date part according to the javascript default (MM, dd, YYYY)
        date = Date.parse(datePart + datetimeDelimiter + timePart);
        if (isNaN(date)) {
            dateParts = datePart.split(dateDelimiter);
            if (utils.isArray(dateParts) && dateParts.length==3) {
                datePart = dateParts[1] + dateDelimiter + dateParts[0] + dateDelimiter + dateParts[2];
                date = Date.parse(datePart + " " + timePart);
            }
        }

        //check for a valid date
        if (isNaN(date)) {
            return null;
        }

        //loop through the time parts
        for (let i=0;i<timeFormatParts.length;i++) {
            if (i>0) {
                timePart += timeDelimiter;
            }
            timePart += utils._getDatePartValue(date,timeFormatParts[i]);
        }

        //return the method's value
        return timePart;
    },
    formatDateTimeString: function(dateString) {
        //declare locals
        let datetimeDelimiter = " ";
        let strDate;
        let arrInputParts;
        let datePart;
        let timePart;
        let formattedDate;

        //check for valid values
        if (utils.isEmpty(dateString)) {
            return null;
        }

        //convert the input into a string
        strDate = String(dateString);

        //check for a date time delimiter
        if (strDate.indexOf(datetimeDelimiter)==-1) {
            datePart = strDate;
            timePart = null;
            //check for valid values
            if (utils.isEmpty(datePart)) {
                return null;
            }
        }
        else {
            arrInputParts = strDate.split(datetimeDelimiter);
            datePart = arrInputParts[0];
            timePart = arrInputParts[1];
            //check for valid values
            if (utils.isEmpty(datePart)) {
                return null;
            }
            if (utils.isEmpty(timePart) || (timePart.indexOf(timeDelimiter)==-1)) {
                timePart = null;
            }
        }

        //format the two parts date and time
        datePart = utils.formatDateString(datePart);
        formattedDate = datePart;
        if (!utils.isEmpty(timePart)) {
            timePart = utils.formatTimeString(timePart);
            formattedDate += datetimeDelimiter + timePart;
        }

        //return the method's value
        return formattedDate;
    },
    formatDate: function (timestamp,showSeconds,showMilliseconds) {
        //declare locals
        let date = null;
        let dateDelimiter = "-";
        let timeDelimiter = ":";
        let dateFormatParts = ["dd","MM","yyyy"];
        let timeFormatParts = ["HH","mm"];
        let datePart = "";
        let timePart = "";
        let formattedDate = "";

        //check for nulls
        if (utils.isEmpty(timestamp)) {
            date = new Date();
        }
        else if (isNaN(timestamp)) {
            date = new Date();
        }
        else {
            date = new Date(timestamp);
        }

        //set defaults if necessary
        if (utils.isEmpty(showSeconds)) {
            showSeconds = false;
        }
        if (utils.isEmpty(showMilliseconds)) {
            showMilliseconds = false;
        }

        //loop through the format parts
        for (let i=0;i<dateFormatParts.length;i++) {
            if (i>0) {
                datePart += dateDelimiter;
            }
            datePart += utils.getDatePartValue(date,dateFormatParts[i]);
        }
        for (let i=0;i<timeFormatParts.length;i++) {
            if (i>0) {
                timePart += timeDelimiter;
            }
            timePart += utils.getDatePartValue(date,timeFormatParts[i]);
        }
        if (showSeconds==true) {
            timePart += timeDelimiter + utils.getDatePartValue(date,"ss");
        }
        if (showMilliseconds==true) {
            timePart += timeDelimiter + utils.getDatePartValue(date,"SSS");
        }

        //set the return value
        formattedDate = datePart + " " + timePart;

        //return the method's value
        return formattedDate;
    }
};
const listUtils = new function() {
    //declare local lists
    let eventActionList = ["validate", "ajax", "updateDom", "updateCss", "clear", "clearValidations"];
    let ajaxMethodList = ["get", "post"];
    let validationDataTypeList = ["bool","boolean","date","time","datetime","number","numeric","int","integer","float","string","array","list","object","map"];
    let validationTypeList = ["datatype","numericrange","daterange","size","length","inlist","notinlist","regexp"];
    let autocompleteStateModeList = [{label: "closed", value: "closed"}, {label: "open", value: "open"}];
    let autocompleteSearchModeList = [{label: "starts with", value: "startswith"},{label: "ends with", value: "endswith"},{label: "contains", value: "contains"}];
    let autocompleteTypeModeList = [{label: "filter", value: "filter"},{label: "focus on first", value: "focusonfirst"}];
    let autocompleteDirectionModeList = [{label: "left to right", value: "ltr"},{label: "right to left", value: "rtl"}];
    let autocompletePanelAlignmentList = [{label: "bottom", value: "bottom"}, {label: "top", value: "top"}];
    let html5Tags = [
        {tagName: "a", startTag: "<a", endTag: "><//a>", description: "Defines a hyperlink"},
        {tagName: "abbr", startTag: "<abbr", endTag: "><//abbr>", description: "Defines an abbreviation or an acronym"},
        {tagName: "address", startTag: "<address", endTag: "><//address>", description: "Defines contact information for the author/owner of a document"},
        {tagName: "area", startTag: "<area", endTag: "/>", description: "Defines an area inside an image map"},
        {tagName: "article", startTag: "<article", endTag: "><//article>", description: "Defines an article"},
        {tagName: "aside", startTag: "<aside", endTag: "><//aside>", description: "Defines content aside from the page content"},
        {tagName: "audio", startTag: "<audio", endTag: "><//audio>", description: "Defines embedded sound content"},
        {tagName: "b", startTag: "<b", endTag: "><//b>", description: "Defines bold text"},
        {tagName: "base", startTag: "<base", endTag: "/>", description: "Specifies the base URL/target for all relative URLs in a document"},
        {tagName: "bdi", startTag: "<bdi", endTag: "><//bdi>", description: "Isolates a part of text that might be formatted in a different direction from other text outside it"},
        {tagName: "bdo", startTag: "<bdo", endTag: "><//bdo>", description: "Overrides the current text direction"},
        {tagName: "blockquote", startTag: "<blockquote", endTag: "><//blockquote>", description: "Defines a section that is quoted from another source"},
        {tagName: "body", startTag: "<body", endTag: "><//body>", description: "Defines the document's body"},
        {tagName: "br", startTag: "<br", endTag: "/>", description: "Defines a single line break"},
        {tagName: "button", startTag: "<button", endTag: "><//button>", description: "Defines a clickable button"},
        {tagName: "canvas", startTag: "<canvas", endTag: "><//canvas>", description: "Used to draw graphics, on the fly, via scripting (usually JavaScript)"},
        {tagName: "caption", startTag: "<caption", endTag: "><//caption>", description: "Defines a table caption"},
        {tagName: "cite", startTag: "<cite", endTag: "><//cite>", description: "Defines the title of a work"},
        {tagName: "code", startTag: "<code", endTag: "><//code>", description: "Defines a piece of computer code"},
        {tagName: "col", startTag: "<col", endTag: "/>", description: "Specifies column properties for each column within a &lt;colgroup&gt; element "},
        {tagName: "colgroup", startTag: "<colgroup", endTag: "><//colgroup>", description: "Specifies a group of one or more columns in a table for formatting"},
        {tagName: "data", startTag: "<data", endTag: "><//data>", description: "Adds a machine-readable translation of a given content"},
        {tagName: "datalist", startTag: "<datalist", endTag: "><//datalist>", description: "Specifies a list of pre-defined options for input controls"},
        {tagName: "dd", startTag: "<dd", endTag: "><//dd>", description: "Defines a description/value of a term in a description list"},
        {tagName: "del", startTag: "<del", endTag: "><//del>", description: "Defines text that has been deleted from a document"},
        {tagName: "details", startTag: "<details", endTag: "><//details>", description: "Defines additional details that the user can view or hide"},
        {tagName: "dfn", startTag: "<dfn", endTag: "><//dfn>", description: "Specifies a term that is going to be defined within the content"},
        {tagName: "dialog", startTag: "<dialog", endTag: "><//dialog>", description: "Defines a dialog box or window"},
        {tagName: "div", startTag: "<div", endTag: "><//div>", description: "Defines a section in a document"},
        {tagName: "dl", startTag: "<dl", endTag: "><//dl>", description: "Defines a description list"},
        {tagName: "dt", startTag: "<dt", endTag: "><//dt>", description: "Defines a term/name in a description list"},
        {tagName: "em", startTag: "<em", endTag: "><//em>", description: "Defines emphasized text"},
        {tagName: "embed", startTag: "<embed", endTag: "/>", description: "Defines a container for an external application"},
        {tagName: "fieldset", startTag: "<fieldset", endTag: "><//fieldset>", description: "Groups related elements in a form"},
        {tagName: "figcaption", startTag: "<figcaption", endTag: "><//figcaption>", description: "Defines a caption for a &lt;figure&gt; element"},
        {tagName: "figure", startTag: "<figure", endTag: "><//figure>", description: "Specifies self-contained content"},
        {tagName: "footer", startTag: "<footer", endTag: "><//footer>", description: "Defines a footer for a document or section"},
        {tagName: "form", startTag: "<form", endTag: "><//form>", description: "Defines an HTML form for user input"},
        {tagName: "h1", startTag: "<h1", endTag: "><//h1>", description: "Defines HTML heading"},
        {tagName: "h2", startTag: "<h2", endTag: "><//h2>", description: "Defines HTML heading"},
        {tagName: "h3", startTag: "<h3", endTag: "><//h3>", description: "Defines HTML heading"},
        {tagName: "h4", startTag: "<h4", endTag: "><//h4>", description: "Defines HTML heading"},
        {tagName: "h5", startTag: "<h5", endTag: "><//h5>", description: "Defines HTML heading"},
        {tagName: "h6", startTag: "<h6", endTag: "><//h6>", description: "Defines HTML heading"},
        {tagName: "head", startTag: "<head", endTag: "><//head>", description: "Contains metadata/information for the document"},
        {tagName: "header", startTag: "<header", endTag: "><//header>", description: "Defines a header for a document or section"},
        {tagName: "hr", startTag: "<hr", endTag: "/>", description: "Defines a horizontal rule line"},
        {tagName: "html", startTag: "<html", endTag: "><//html>", description: "Defines the root of an HTML document"},
        {tagName: "i", startTag: "<i", endTag: "><//i>", description: "Defines a part of text in an italic mode"},
        {tagName: "iframe", startTag: "<iframe", endTag: "><//iframe>", description: "Defines an inline frame"},
        {tagName: "img", startTag: "<img", endTag: "/>", description: "Defines an image"},
        {tagName: "input", startTag: "<input", endTag: "/>", description: "Defines an input control"},
        {tagName: "ins", startTag: "<ins", endTag: "><//ins>", description: "Defines a text that has been inserted into a document"},
        {tagName: "kbd", startTag: "<kbd", endTag: "><//kbd>", description: "Defines keyboard input"},
        {tagName: "label", startTag: "<label", endTag: "><//label>", description: "Defines a label for an &lt;input&gt; element"},
        {tagName: "legend", startTag: "<legend", endTag: "><//legend>", description: "Defines a caption for a &lt;fieldset&gt; element"},
        {tagName: "li", startTag: "<li", endTag: "><//li>", description: "Defines a list item"},
        {tagName: "link", startTag: "<link", endTag: "/>", description: "Defines the relationship between a document and an external resource (most used to link to style sheets)"},
        {tagName: "main", startTag: "<main", endTag: "><//main>", description: "Specifies the main content of a document"},
        {tagName: "map", startTag: "<map", endTag: "><//map>", description: "Defines an image map"},
        {tagName: "mark", startTag: "<mark", endTag: "><//mark>", description: "Defines marked/highlighted text"},
        {tagName: "meta", startTag: "<meta", endTag: "/>", description: "Defines metadata about an HTML document"},
        {tagName: "meter", startTag: "<meter", endTag: "><//meter>", description: "Defines a scalar measurement within a known range (a gauge)"},
        {tagName: "nav", startTag: "<nav", endTag: "><//nav>", description: "Defines navigation links"},
        {tagName: "noscript", startTag: "<noscript", endTag: "><//noscript>", description: "Defines an alternate content for users that do not support client-side scripts"},
        {tagName: "object", startTag: "<object", endTag: "><//object>", description: "Defines a container for an external application"},
        {tagName: "ol", startTag: "<ol", endTag: "><//ol>", description: "Defines an ordered list"},
        {tagName: "optgroup", startTag: "<optgroup", endTag: "><//optgroup>", description: "Defines a group of related options in a drop-down list"},
        {tagName: "option", startTag: "<option", endTag: "><//option>", description: "Defines an option in a drop-down list"},
        {tagName: "output", startTag: "<output", endTag: "><//output>", description: "Defines the result of a calculation"},
        {tagName: "p", startTag: "<p", endTag: "><//p>", description: "Defines a paragraph"},
        {tagName: "param", startTag: "<param", endTag: "/>", description: "Defines a parameter for an object"},
        {tagName: "picture", startTag: "<picture", endTag: "><//picture>", description: "Defines a container for multiple image resources"},
        {tagName: "pre", startTag: "<pre", endTag: "><//pre>", description: "Defines preformatted text"},
        {tagName: "progress", startTag: "<progress", endTag: "><//progress>", description: "Represents the progress of a task"},
        {tagName: "q", startTag: "<q", endTag: "><//q>", description: "Defines a short quotation"},
        {tagName: "rp", startTag: "<rp", endTag: "><//rp>", description: "Defines what to show in browsers that do not support ruby annotations"},
        {tagName: "rt", startTag: "<rt", endTag: "><//rt>", description: "Defines an explanation/pronunciation of characters (for East Asian typography)"},
        {tagName: "ruby", startTag: "<ruby", endTag: "><//ruby>", description: "Defines a ruby annotation (for East Asian typography)"},
        {tagName: "s", startTag: "<s", endTag: "><//s>", description: "Defines text that is no longer correct"},
        {tagName: "samp", startTag: "<samp", endTag: "><//samp>", description: "Defines sample output from a computer program"},
        {tagName: "script", startTag: "<script", endTag: "><//script>", description: "Defines a client-side script"},
        {tagName: "section", startTag: "<section", endTag: "><//section>", description: "Defines a section in a document"},
        {tagName: "select", startTag: "<select", endTag: "><//select>", description: "Defines a drop-down list"},
        {tagName: "small", startTag: "<small", endTag: "><//small>", description: "Defines smaller text"},
        {tagName: "source", startTag: "<source", endTag: "/>", description: "Defines multiple media resources for media elements (&lt;video&gt; and &lt;audio&gt;)"},
        {tagName: "span", startTag: "<span", endTag: "><//span>", description: "Defines a section in a document"},
        {tagName: "strong", startTag: "<strong", endTag: "><//strong>", description: "Defines important text"},
        {tagName: "style", startTag: "<style", endTag: "><//style>", description: "Defines style information for a document"},
        {tagName: "sub", startTag: "<sub", endTag: "><//sub>", description: "Defines subscripted text"},
        {tagName: "summary", startTag: "<summary", endTag: "><//summary>", description: "Defines a visible heading for a &lt;details&gt; element"},
        {tagName: "sup", startTag: "<sup", endTag: "><//sup>", description: "Defines superscripted text"},
        {tagName: "svg", startTag: "<svg", endTag: "><//svg>", description: "Defines a container for SVG graphics"},
        {tagName: "table", startTag: "<table", endTag: "><//table>", description: "Defines a table"},
        {tagName: "tbody", startTag: "<tbody", endTag: "><//tbody>", description: "Groups the body content in a table"},
        {tagName: "td", startTag: "<td", endTag: "><//td>", description: "Defines a cell in a table"},
        {tagName: "template", startTag: "<template", endTag: "><//template>", description: "Defines a container for content that should be hidden when the page loads"},
        {tagName: "textarea", startTag: "<textarea", endTag: "><//textarea>", description: "Defines a multiline input control (text area)"},
        {tagName: "tfoot", startTag: "<tfoot", endTag: "><//tfoot>", description: "Groups the footer content in a table"},
        {tagName: "th", startTag: "<th", endTag: "><//th>", description: "Defines a header cell in a table"},
        {tagName: "thead", startTag: "<thead", endTag: "><//thead>", description: "Groups the header content in a table"},
        {tagName: "time", startTag: "<time", endTag: "><//time>", description: "Defines a specific time (or datetime)"},
        {tagName: "title", startTag: "<title", endTag: "><//title>", description: "Defines a title for the document"},
        {tagName: "tr", startTag: "<tr", endTag: "><//tr>", description: "Defines a row in a table"},
        {tagName: "track", startTag: "<track", endTag: "/>", description: "Defines text tracks for media elements (&lt;video&gt; and &lt;audio&gt;)"},
        {tagName: "u", startTag: "<u", endTag: "><//u>", description: "Defines some text that is unarticulated and styled differently from normal text"},
        {tagName: "ul", startTag: "<ul", endTag: "><//ul>", description: "Defines an unordered list"},
        {tagName: "var", startTag: "<var", endTag: "><//var>", description: "Defines a variable"},
        {tagName: "video", startTag: "<video", endTag: "><//video>", description: "Defines embedded video content"},
        {tagName: "wbr", startTag: "<wbr", endTag: "/>", description: "Defines a possible line-break"}
    ];

    let html5Attributes = [
        {attName: "id", belongsTo: ["global"], type: "string", description: "Specifies a unique id for an element"},
        {attName: "accept", belongsTo: ["input"], type: "string", description: "Specifies the types of files that the server accepts (only for type=\"file\")"},
        {attName: "accept-charset", belongsTo: ["form"], type: "charsetList", default: "UTF-8", description: "Specifies the character encodings that are to be used for the form submission"},
        {attName: "accesskey", belongsTo: ["global"], type: "string", description: "Specifies a shortcut key to activate/focus an element"},
        {attName: "action", belongsTo: ["form"], type: "string", description: "Specifies where to send the form-data when a form is submitted"},
        {attName: "alt", belongsTo: ["area", "img", "input"], type: "string", description: "Specifies an alternate text when the original element fails to display"},
        {attName: "async", belongsTo: ["script"], type: "empty", description: "Specifies that the script is executed asynchronously (only for external scripts)"},
        {attName: "autocomplete", belongsTo: ["form", "input"], type: "onOffList", default: "on", description: "Specifies whether the &lt;form&gt; or the &lt;input&gt; element should have autocomplete enabled"},
        {attName: "autofocus", belongsTo: ["button", "input", "select", "textarea"], type: "empty", description: "Specifies that the element should automatically get focus when the page loads"},
        {attName: "autoplay", belongsTo: ["audio", "video"], type: "empty", description: "Specifies that the audio/video will start playing as soon as it is ready"},
        {attName: "charset", belongsTo: ["meta", "script"], type: "charsetList", default: "UTF-8", description: "Specifies the character encoding"},
        {attName: "checked", belongsTo: ["input"], type: "empty", description: "Specifies that an &lt;input&gt; element should be pre-selected when the page loads (for type=\"checkbox\" or type=\"radio\")"},
        {attName: "cite", belongsTo: ["blockquote", "del", "ins", "q"], type: "string", description: "Specifies a URL which explains the quote/deleted/inserted text"},
        {attName: "class", belongsTo: ["global"], type: "string", description: "Specifies one or more classnames for an element (refers to a class in a style sheet)"},
        {attName: "cols", belongsTo: ["textarea"], type: "numeric", default: 20, description: "Specifies the visible width of a text area"},
        {attName: "colspan", belongsTo: ["td", "th"], type: "numeric", description: "Specifies the number of columns a table cell should span"},
        {attName: "content", belongsTo: ["meta"], type: "string", description: "Gives the value associated with the http-equiv or name attribute"},
        {attName: "contenteditable", belongsTo: ["global"], type: "boolean", description: "Specifies whether the content of an element is editable or not"},
        {attName: "controls", belongsTo: ["audio", "video"], type: "empty", description: "Specifies that audio/video controls should be displayed (such as a play/pause button etc)"},
        {attName: "coords", belongsTo: ["area"], type: "string", description: "Specifies the coordinates of the area"},
        {attName: "data", belongsTo: ["object"], type: "string", description: "Specifies the URL of the resource to be used by the object"},
        {attName: "data-", belongsTo: ["global"], type: "string", description: "Used to store custom data private to the page or application"},
        {attName: "datetime", belongsTo: ["del", "ins", "time"], type: "string", description: "Specifies the date and time"},
        {attName: "default", belongsTo: ["track"], type: "empty", description: "Specifies that the track is to be enabled if the user's preferences do not indicate that another track would be more appropriate"},
        {attName: "defer", belongsTo: ["script"], type: "empty", description: "Specifies that the script is executed when the page has finished parsing (only for external scripts)"},
        {attName: "dir", belongsTo: ["global"], type: "dirList", description: "Specifies the text direction for the content in an element"},
        {attName: "dirname", belongsTo: ["input", "textarea"], type: "dirList", description: "Specifies that the text direction will be submitted"},
        {
            attName: "disabled",
            belongsTo: ["button", "fieldset", "input", "optgroup", "option", "select", "textarea"],
            type: "empty", description: "Specifies that the specified element/group of elements should be disabled"
        },
        {attName: "download", belongsTo: ["a", "area"], type: "string", description: "Specifies that the target will be downloaded when a user clicks on the hyperlink"},
        {attName: "draggable", belongsTo: ["global"], type: "boolean", description: "Specifies whether an element is draggable or not"},
        {attName: "enctype", belongsTo: ["form"], type: "enctypeList", default: "application/x-www-form-urlencoded", description: "Specifies how the form-data should be encoded when submitting it to the server (only for method=\"post\")"},
        {attName: "for", belongsTo: ["label", "output"], type: "string", description: "Specifies which form element(s) a label/calculation is bound to"},
        {
            attName: "form",
            belongsTo: ["button", "fieldset", "input", "label", "meter", "object", "output", "select", "textarea"],
            type: "string", description: "Specifies the name of the form the element belongs to"
        },
        {attName: "formaction", belongsTo: ["button", "input"], type: "string", description: "Specifies where to send the form-data when a form is submitted. Only for type=\"submit\""},
        {attName: "headers", belongsTo: ["td", "th"], type: "string", description: "Specifies one or more headers cells a cell is related to"},
        {
            attName: "height",
            belongsTo: ["canvas", "embed", "iframe", "img", "input", "object", "video"],
            type: "number",
            default: 150, description: "Specifies the height of the element"
        },
        {attName: "hidden", belongsTo: ["global"], type: "empty", description: "Specifies that an element is not yet, or is no longer, relevant"},
        {attName: "high", belongsTo: ["meter"], type: "number", description: "Specifies the range that is considered to be a high value"},
        {attName: "href", belongsTo: ["a", "area", "base", "link"], type: "string", description: "Specifies the URL of the page the link goes to"},
        {attName: "hreflang", belongsTo: ["a", "area", "link"], type: "langList", description: "Specifies the language of the linked document"},
        {attName: "http-equiv", belongsTo: ["meta"], type: "httpHeadersList", description: "Provides an HTTP header for the information/value of the content attribute"},
        {attName: "ismap", belongsTo: ["img"], type: "empty", description: "Specifies an image as a server-side image map"},
        {attName: "kind", belongsTo: ["track"], type: "kindList", description: "Specifies the kind of text track"},
        {attName: "label", belongsTo: ["track", "option", "optgroup"], type: "string", description: "Specifies the title of the text track"},
        {attName: "lang", belongsTo: ["global"], type: "langList", description: "Specifies the language of the element's content"},
        {attName: "list", belongsTo: ["input"], type: "string", description: "Refers to a &lt;datalist&gt; element that contains pre-defined options for an &lt;input&gt; element"},
        {attName: "loop", belongsTo: ["audio", "video"], type: "empty", description: "Specifies that the audio/video will start over again, every time it is finished"},
        {attName: "low", belongsTo: ["meter"], type: "number", description: "Specifies the range that is considered to be a low value"},
        {attName: "max", belongsTo: ["input", "meter", "progress"], type: "numberOrDate", description: "Specifies the maximum value"},
        {attName: "maxlength", belongsTo: ["input", "textarea"], type: "number", default: 524288, description: "Specifies the maximum number of characters allowed in an element"},
        {attName: "media", belongsTo: ["a", "area", "link", "source", "style"], type: "mediaStringType", description: "Specifies what media/device the linked document is optimized for"},
        {attName: "method", belongsTo: ["form"], type: "methodList", description: "Specifies the HTTP method to use when sending form-data"},
        {attName: "min", belongsTo: ["input", "meter"], type: "numberOrDate", description: "Specifies a minimum value"},
        {attName: "multiple", belongsTo: ["input", "select"], type: "empty", description: "Specifies that a user can enter more than one value"},
        {attName: "muted", belongsTo: ["audio", "video"], type: "empty", description: "Specifies that the audio output of the video should be muted"},
        {
            attName: "name",
            belongsTo: ["button", "fieldset", "form", "iframe", "input", "map", "meta", "object", "output", "param", "select", "textarea"],
            type: "string", description: "Specifies the name of the element"
        },
        {attName: "novalidate", belongsTo: ["form"], type: "empty", description: "Specifies that the form should not be validated when submitted"},
        {attName: "onabort", belongsTo: ["audio", "embed", "img", "object", "video"], type: "script", description: "Script to be run on abort"},
        {attName: "onafterprint", belongsTo: ["body"], type: "script", description: "Script to be run after the document is printed"},
        {attName: "onbeforeprint", belongsTo: ["body"], type: "script", description: "Script to be run before the document is printed"},
        {attName: "onbeforeunload", belongsTo: ["body"], type: "script", description: "Script to be run when the document is about to be unloaded"},
        {attName: "onblur", belongsTo: ["allVisible"], type: "script", description: "Script to be run when the element loses focus"},
        {attName: "oncanplay", belongsTo: ["audio", "embed", "object", "video"], type: "script", description: "Script to be run when a file is ready to start playing (when it has buffered enough to begin)"},
        {attName: "oncanplaythrough", belongsTo: ["audio", "video"], type: "script", description: "Script to be run when a file can be played all the way to the end without pausing for buffering"},
        {attName: "onchange", belongsTo: ["allVisible"], type: "script", description: "Script to be run when the value of the element is changed"},
        {attName: "onclick", belongsTo: ["allVisible"], type: "script", description: "Script to be run when the element is being clicked"},
        {attName: "oncontextmenu", belongsTo: ["allVisible"], type: "script", description: "Script to be run when a context menu is triggered"},
        {attName: "oncopy", belongsTo: ["allVisible"], type: "script", description: "Script to be run when the content of the element is being copied"},
        {attName: "oncuechange", belongsTo: ["track"], type: "script", description: "Script to be run when the cue changes in a &lt;track&gt; element"},
        {attName: "oncut", belongsTo: ["allVisible"], type: "script", description: "Script to be run when the content of the element is being cut"},
        {attName: "ondblclick", belongsTo: ["allVisible"], type: "script", description: "Script to be run when the element is being double-clicked"},
        {attName: "ondrag", belongsTo: ["allVisible"], type: "script", description: "Script to be run when the element is being dragged"},
        {attName: "ondragend", belongsTo: ["allVisible"], type: "script", description: "Script to be run at the end of a drag operation"},
        {attName: "ondragenter", belongsTo: ["allVisible"], type: "script", description: "Script to be run when an element has been dragged to a valid drop target"},
        {attName: "ondragleave", belongsTo: ["allVisible"], type: "script", description: "Script to be run when an element leaves a valid drop target"},
        {attName: "ondragover", belongsTo: ["allVisible"], type: "script", description: "Script to be run when an element is being dragged over a valid drop target"},
        {attName: "ondragstart", belongsTo: ["allVisible"], type: "script", description: "Script to be run at the start of a drag operation"},
        {attName: "ondrop", belongsTo: ["allVisible"], type: "script", description: "Script to be run when dragged element is being dropped"},
        {attName: "ondurationchange", belongsTo: ["audio", "video"], type: "script", description: "Script to be run when the length of the media changes"},
        {attName: "onemptied", belongsTo: ["audio", "video"], type: "script", description: "Script to be run when something bad happens and the file is suddenly unavailable (like unexpectedly disconnects)"},
        {attName: "onended", belongsTo: ["audio", "video"], type: "script", description: "Script to be run when the media has reach the end (a useful event for messages like \"thanks for listening\")"},
        {
            attName: "onerror",
            belongsTo: ["audio", "body", "embed", "img", "object", "script", "style", "video"],
            type: "script", description: "Script to be run when an error occurs"
        },
        {attName: "onfocus", belongsTo: ["allVisible"], type: "script", description: "Script to be run when the element gets focus"},
        {attName: "onhashchange", belongsTo: ["body"], type: "script", description: "Script to be run when there has been changes to the anchor part of the a URL"},
        {attName: "oninput", belongsTo: ["allVisible"], type: "script", description: "Script to be run when the element gets user input"},
        {attName: "oninvalid", belongsTo: ["allVisible"], type: "script", description: "Script to be run when the element is invalid"},
        {attName: "onkeydown", belongsTo: ["allVisible"], type: "script", description: "Script to be run when a user is pressing a key"},
        {attName: "onkeypress", belongsTo: ["allVisible"], type: "script", description: "Script to be run when a user presses a key"},
        {attName: "onkeyup", belongsTo: ["allVisible"], type: "script", description: "Script to be run when a user releases a key"},
        {attName: "onload", belongsTo: ["body", "iframe", "img", "input", "link", "script", "style"], type: "script", description: "Script to be run when the element is finished loading"},
        {attName: "onloadeddata", belongsTo: ["audio", "video"], type: "script", description: "Script to be run when media data is loaded"},
        {attName: "onloadedmetadata", belongsTo: ["audio", "video"], type: "script", description: "Script to be run when meta data (like dimensions and duration) are loaded"},
        {attName: "onloadstart", belongsTo: ["audio", "video"], type: "script", description: "Script to be run just as the file begins to load before anything is actually loaded"},
        {attName: "onmousedown", belongsTo: ["allVisible"], type: "script", description: "Script to be run when a mouse button is pressed down on an element"},
        {attName: "onmousemove", belongsTo: ["allVisible"], type: "script", description: "Script to be run as long as the  mouse pointer is moving over an element"},
        {attName: "onmouseout", belongsTo: ["allVisible"], type: "script", description: "Script to be run when a mouse pointer moves out of an element"},
        {attName: "onmouseover", belongsTo: ["allVisible"], type: "script", description: "Script to be run when a mouse pointer moves over an element"},
        {attName: "onmouseup", belongsTo: ["allVisible"], type: "script", description: "Script to be run when a mouse button is released over an element"},
        {attName: "onmousewheel", belongsTo: ["allVisible"], type: "script", description: "Script to be run when a mouse wheel is being scrolled over an element"},
        {attName: "onoffline", belongsTo: ["body"], type: "script", description: "Script to be run when the browser starts to work offline"},
        {attName: "ononline", belongsTo: ["body"], type: "script", description: "Script to be run when the browser starts to work online"},
        {attName: "onpagehide", belongsTo: ["body"], type: "script", description: "Script to be run when a user navigates away from a page"},
        {attName: "onpageshow", belongsTo: ["body"], type: "script", description: "Script to be run when a user navigates to a page"},
        {attName: "onpaste", belongsTo: ["allVisible"], type: "script", description: "Script to be run when the user pastes some content in an element"},
        {attName: "onpause", belongsTo: ["audio", "video"], type: "script", description: "Script to be run when the media is paused either by the user or programmatically"},
        {attName: "onplay", belongsTo: ["audio", "video"], type: "script", description: "Script to be run when the media has started playing"},
        {attName: "onplaying", belongsTo: ["audio", "video"], type: "script", description: "Script to be run when the media has started playing"},
        {attName: "onpopstate", belongsTo: ["body"], type: "script", description: "Script to be run when the window's history changes"},
        {attName: "onprogress", belongsTo: ["audio", "video"], type: "script", description: "Script to be run when the browser is in the process of getting the media data"},
        {attName: "onratechange", belongsTo: ["audio", "video"], type: "script", description: "Script to be run each time the playback rate changes (like when a user switches to a slow motion or fast forward mode)"},
        {attName: "onreset", belongsTo: ["form"], type: "script", description: "Script to be run when a reset button in a form is clicked"},
        {attName: "onresize", belongsTo: ["body"], type: "script", description: "Script to be run when the browser window is being resized"},
        {attName: "onscroll", belongsTo: ["allVisible"], type: "script", description: "Script to be run when an element's scrollbar is being scrolled"},
        {attName: "onsearch", belongsTo: ["input"], type: "script", description: "Script to be run when the user writes something in a search field (for &lt;input type=\"search\"&gt;)"},
        {attName: "onseeked", belongsTo: ["audio", "video"], type: "script", description: "Script to be run when the seeking attribute is set to false indicating that seeking has ended"},
        {attName: "onseeking", belongsTo: ["audio", "video"], type: "script", description: "Script to be run when the seeking attribute is set to true indicating that seeking is active"},
        {attName: "onselect", belongsTo: ["allVisible"], type: "script", description: "Script to be run when the element gets selected"},
        {attName: "onstalled", belongsTo: ["audio", "video"], type: "script", description: "Script to be run when the browser is unable to fetch the media data for whatever reason"},
        {attName: "onstorage", belongsTo: ["body"], type: "script", description: "Script to be run when a Web Storage area is updated"},
        {attName: "onsubmit", belongsTo: ["form"], type: "script", description: "Script to be run when a form is submitted"},
        {attName: "onsuspend", belongsTo: ["audio", "video"], type: "script", description: "Script to be run when fetching the media data is stopped before it is completely loaded for whatever reason"},
        {attName: "ontimeupdate", belongsTo: ["audio", "video"], type: "script", description: "Script to be run when the playing position has changed (like when the user fast forwards to a different point in the media)"},
        {attName: "ontoggle", belongsTo: ["details"], type: "script", description: "Script to be run when the user opens or closes the &lt;details&gt; element"},
        {attName: "onunload", belongsTo: ["body"], type: "script", description: "Script to be run when a page has unloaded (or the browser window has been closed)"},
        {attName: "onvolumechange", belongsTo: ["audio", "video"], type: "script", description: "Script to be run each time the volume of a video/audio has been changed"},
        {attName: "onwaiting", belongsTo: ["audio", "video"], type: "script", description: "Script to be run when the media has paused but is expected to resume (like when the media pauses to buffer more data)"},
        {attName: "onwheel", belongsTo: ["allVisible"], type: "script", description: "Script to be run when the mouse wheel rolls up or down over an element"},
        {attName: "open", belongsTo: ["details"], type: "empty", description: "Specifies that the details should be visible (open) to the user"},
        {attName: "optimum", belongsTo: ["meter"], type: "number", description: "Specifies what value is the optimal value for the gauge"},
        {attName: "pattern", belongsTo: ["input"], type: "string", description: "Specifies a regular expression that an &lt;input&gt; element's value is checked against"},
        {attName: "placeholder", belongsTo: ["input", "textarea"], type: "string", description: "Specifies a short hint that describes the expected value of the element"},
        {attName: "poster", belongsTo: ["video"], type: "string", description: "Specifies an image to be shown while the video is downloading, or until the user hits the play button"},
        {attName: "preload", belongsTo: ["audio", "video"], type: "preloadList", description: "Specifies if and how the author thinks the audio/video should be loaded when the page loads"},
        {attName: "readonly", belongsTo: ["input", "textarea"], type: "empty", description: "Specifies that the element is read-only"},
        {attName: "rel", belongsTo: ["a", "area", "form", "link"], type: "relList", description: "Specifies the relationship between the current document and the linked document"},
        {attName: "required", belongsTo: ["input", "select", "textarea"], type: "empty", description: "Specifies that the element must be filled out before submitting the form"},
        {attName: "reversed", belongsTo: ["ol"], type: "empty", description: "Specifies that the list order should be descending (9,8,7...)"},
        {attName: "rows", belongsTo: ["textarea"], type: "number", description: "Specifies the visible number of lines in a text area"},
        {attName: "rowspan", belongsTo: ["td", "th"], type: "number", description: "Specifies the number of rows a table cell should span"},
        {attName: "sandbox", belongsTo: ["iframe"], type: "sandboxList", description: "Enables an extra set of restrictions for the content in an &lt;iframe&gt;"},
        {attName: "scope", belongsTo: ["th"], type: "scopeList", description: "Specifies whether a header cell is a header for a column, row, or group of columns or rows"},
        {attName: "selected", belongsTo: ["option"], type: "empty", description: "Specifies that an option should be pre-selected when the page loads"},
        {attName: "shape", belongsTo: ["area"], type: "shapeList", description: "Specifies the shape of the area"},
        {attName: "size", belongsTo: ["input", "select"], type: "number", description: "Specifies the width, in characters (for &lt;input&gt;) or specifies the number of visible options (for &lt;select&gt;)"},
        {attName: "sizes", belongsTo: ["img", "link", "source"], type: "string", description: "Specifies the size of the linked resource"},
        {attName: "span", belongsTo: ["col", "colgroup"], type: "number", description: "Specifies the number of columns to span"},
        {attName: "spellcheck", belongsTo: ["global"], type: "boolean", description: "Specifies whether the element is to have its spelling and grammar checked or not"},
        {
            attName: "src",
            belongsTo: ["audio", "embed", "iframe", "img", "input", "script", "source", "track", "video"],
            type: "string", description: "Specifies the URL of the media file"
        },
        {attName: "srcdoc", belongsTo: ["iframe"], type: "string", description: "Specifies the HTML content of the page to show in the &lt;iframe&gt;"},
        {attName: "srclang", belongsTo: ["track"], type: "langList", description: "Specifies the language of the track text data (required if kind=\"subtitles\")"},
        {attName: "srcset", belongsTo: ["img", "source"], type: "string", description: "Specifies the URL of the image to use in different situations"},
        {attName: "start", belongsTo: ["ol"], type: "number", description: "Specifies the start value of an ordered list"},
        {attName: "step", belongsTo: ["input"], type: "number", default: 1, description: "Specifies the legal number intervals for an input field"},
        {attName: "style", belongsTo: ["global"], type: "string", description: "Specifies an inline CSS style for an element"},
        {attName: "tabindex", belongsTo: ["global"], type: "numeric", description: "Specifies the tabbing order of an element"},
        {attName: "target", belongsTo: ["a", "area", "base", "form"], type: "targetList", description: "Specifies the target for where to open the linked document or where to submit the form"},
        {attName: "title", belongsTo: ["global"], type: "string", description: "Specifies extra information about an element"},
        {attName: "translate", belongsTo: ["global"], type: "yesNoList", description: "Specifies whether the content of an element should be translated or not"},
        {
            attName: "type",
            belongsTo: ["a", "button", "embed", "input", "link", "menu", "object", "script", "source", "style"],
            type: "typeList", description: "Specifies the type of element"
        },
        {attName: "usemap", belongsTo: ["img", "object"], type: "string", description: "Specifies an image as a client-side image map"},
        {
            attName: "value",
            belongsTo: ["button", "input", "li", "option", "meter", "progress", "param"],
            type: "string", description: "Specifies the value of the element"
        },
        {
            attName: "width",
            belongsTo: ["canvas", "embed", "iframe", "img", "input", "object", "video"],
            type: "number",
            default: 300, description: "Specifies the width of the element"
        },
        {attName: "wrap", belongsTo: ["textarea"], type: "wrapList", description: "Specifies how the text in a text area is to be wrapped when submitted in a form"}
    ];

    let onOffList = [
        {label: "on", value: "on", description: "Default. Specifies that autocomplete is on (enabled)"},
        {label: "off", value: "off", description: "Specifies that autocomplete is off (disabled)"}
    ];

    let yesNoList = [
        {label: "yes", value: "yes", description: "Specifies that the content of the element should be translated"},
        {label: "no", value: "no", description: "Specifies that the content of the element must not be translated"}
    ];

    let charsetList = [
        {label: "UTF-8", value: "UTF-8", description: ""},
        {label: "UTF-16", value: "UTF-16", description: ""},
        {label: "ISO-8859-1", value: "ISO-8859-1", description: ""},
        {label: "ISO-8859-8", value: "ISO-8859-8", description: ""},
        {label: "Windows-1252", value: "Windows-1252", description: ""}
    ];

    let dirList = [
        {label: "LeftToRight", value: "ltr", description: "Default. Left-to-right text direction"},
        {label: "RightToLeft", value: "rtl", description: "Right-to-left text direction"},
        {label: "auto", value: "auto", description: "Let the browser figure out the text direction, based on the content (only recommended if the text direction is unknown)"}
    ];

    let enctypeList = [
        {label: "application/x-www-form-urlencoded", value: "application/x-www-form-urlencoded", description: "Default. All characters are encoded before sent (spaces are converted to "+" symbols, and special characters are converted to ASCII HEX values)"},
        {label: "multipart/form-data", value: "multipart/form-data", description: "This value is necessary if the user will upload a file through the form"},
        {label: "text/plain", value: "text/plain", description: "Sends data without any encoding at all. Not recommended"},
    ];

    let httpHeadersList = [
        {label: "content-security-policy", value: "content-security-policy", description: "Specifies a content policy for the document. Example: &lt;meta http-equiv=\"content-security-policy\" content=\"default-src 'self'\"&gt;"},
        {label: "content-type", value: "content-type", description: "Specifies the character encoding for the document. Example: &lt;meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\"&gt;"},
        {label: "default-style", value: "default-style", description: "Specified the preferred style sheet to use. Example: &lt;meta http-equiv=\"default-style\" content=\"the document's preferred stylesheet\"&gt;"},
        {label: "refresh", value: "refresh", description: "Defines a time interval for the document to refresh itself. Example: &lt;meta http-equiv=\"refresh\" content=\"300\"&gt;"},
    ];

    let kindList = [
        {label: "captions", value: "captions", description: "The track defines translation of dialogue and sound effects (suitable for deaf users)"},
        {label: "chapters", value: "chapters", description: "The track defines chapter titles (suitable for navigating the media resource)"},
        {label: "descriptions", value: "descriptions", description: "The track defines a textual description of the video content (suitable for blind users)"},
        {label: "metadata", value: "metadata", description: "The track defines content used by scripts. Not visible for the user"},
        {label: "subtitles", value: "subtitles", description: "The track defines subtitles, used to display subtitles in a video"}
    ];

    let langList = [
        {label: "Abkhazian", value: "ab", description: ""},
        {label: "Afar", value: "aa", description: ""},
        {label: "Afrikaans", value: "af", description: ""},
        {label: "Akan", value: "ak", description: ""},
        {label: "Albanian", value: "sq", description: ""},
        {label: "Amharic", value: "am", description: ""},
        {label: "Arabic", value: "ar", description: ""},
        {label: "Aragonese", value: "an", description: ""},
        {label: "Armenian", value: "hy", description: ""},
        {label: "Assamese", value: "as", description: ""},
        {label: "Avaric", value: "av", description: ""},
        {label: "Avestan", value: "ae", description: ""},
        {label: "Aymara", value: "ay", description: ""},
        {label: "Azerbaijani", value: "az", description: ""},
        {label: "Bambara", value: "bm", description: ""},
        {label: "Bashkir", value: "ba", description: ""},
        {label: "Basque", value: "eu", description: ""},
        {label: "Belarusian", value: "be", description: ""},
        {label: "Bengali (Bangla)", value: "bn", description: ""},
        {label: "Bihari", value: "bh", description: ""},
        {label: "Bislama", value: "bi", description: ""},
        {label: "Bosnian", value: "bs", description: ""},
        {label: "Breton", value: "br", description: ""},
        {label: "Bulgarian", value: "bg", description: ""},
        {label: "Burmese", value: "my", description: ""},
        {label: "Catalan", value: "ca", description: ""},
        {label: "Chamorro", value: "ch", description: ""},
        {label: "Chechen", value: "ce", description: ""},
        {label: "Chichewa, Chewa, Nyanja", value: "ny", description: ""},
        {label: "Chinese", value: "zh", description: ""},
        {label: "Chinese (Simplified)", value: "zh-Hans", description: ""},
        {label: "Chinese (Traditional)", value: "zh-Hant", description: ""},
        {label: "Chuvash", value: "cv", description: ""},
        {label: "Cornish", value: "kw", description: ""},
        {label: "Corsican", value: "co", description: ""},
        {label: "Cree", value: "cr", description: ""},
        {label: "Croatian", value: "hr", description: ""},
        {label: "Czech", value: "cs", description: ""},
        {label: "Danish", value: "da", description: ""},
        {label: "Divehi, Dhivehi, Maldivian", value: "dv", description: ""},
        {label: "Dutch", value: "nl", description: ""},
        {label: "Dzongkha", value: "dz", description: ""},
        {label: "English", value: "en", description: ""},
        {label: "Esperanto", value: "eo", description: ""},
        {label: "Estonian", value: "et", description: ""},
        {label: "Ewe", value: "ee", description: ""},
        {label: "Faroese", value: "fo", description: ""},
        {label: "Fijian", value: "fj", description: ""},
        {label: "Finnish", value: "fi", description: ""},
        {label: "French", value: "fr", description: ""},
        {label: "Fula, Fulah, Pulaar, Pular", value: "ff", description: ""},
        {label: "Galician", value: "gl", description: ""},
        {label: "Gaelic (Scottish)", value: "gd", description: ""},
        {label: "Gaelic (Manx)", value: "gv", description: ""},
        {label: "Georgian", value: "ka", description: ""},
        {label: "German", value: "de", description: ""},
        {label: "Greek", value: "el", description: ""},
        {label: "Greenlandic", value: "kl", description: ""},
        {label: "Guarani", value: "gn", description: ""},
        {label: "Gujarati", value: "gu", description: ""},
        {label: "Haitian Creole", value: "ht", description: ""},
        {label: "Hausa", value: "ha", description: ""},
        {label: "Hebrew", value: "he", description: ""},
        {label: "Herero", value: "hz", description: ""},
        {label: "Hindi", value: "hi", description: ""},
        {label: "Hiri Motu", value: "ho", description: ""},
        {label: "Hungarian", value: "hu", description: ""},
        {label: "Icelandic", value: "is", description: ""},
        {label: "Ido", value: "io", description: ""},
        {label: "Igbo", value: "ig", description: ""},
        {label: "Indonesian", value: "id, in", description: ""},
        {label: "Interlingua", value: "ia", description: ""},
        {label: "Interlingue", value: "ie", description: ""},
        {label: "Inuktitut", value: "iu", description: ""},
        {label: "Inupiak", value: "ik", description: ""},
        {label: "Irish", value: "ga", description: ""},
        {label: "Italian", value: "it", description: ""},
        {label: "Japanese", value: "ja", description: ""},
        {label: "Javanese", value: "jv", description: ""},
        {label: "Kalaallisut, Greenlandic", value: "kl", description: ""},
        {label: "Kannada", value: "kn", description: ""},
        {label: "Kanuri", value: "kr", description: ""},
        {label: "Kashmiri", value: "ks", description: ""},
        {label: "Kazakh", value: "kk", description: ""},
        {label: "Khmer", value: "km", description: ""},
        {label: "Kikuyu", value: "ki", description: ""},
        {label: "Kinyarwanda (Rwanda)", value: "rw", description: ""},
        {label: "Kirundi", value: "rn", description: ""},
        {label: "Kyrgyz", value: "ky", description: ""},
        {label: "Komi", value: "kv", description: ""},
        {label: "Kongo", value: "kg", description: ""},
        {label: "Korean", value: "ko", description: ""},
        {label: "Kurdish", value: "ku", description: ""},
        {label: "Kwanyama", value: "kj", description: ""},
        {label: "Lao", value: "lo", description: ""},
        {label: "Latin", value: "la", description: ""},
        {label: "Latvian (Lettish)", value: "lv", description: ""},
        {label: "Limburgish ( Limburger)", value: "li", description: ""},
        {label: "Lingala", value: "ln", description: ""},
        {label: "Lithuanian", value: "lt", description: ""},
        {label: "Luga-Katanga", value: "lu", description: ""},
        {label: "Luganda, Ganda", value: "lg", description: ""},
        {label: "Luxembourgish", value: "lb", description: ""},
        {label: "Manx", value: "gv", description: ""},
        {label: "Macedonian", value: "mk", description: ""},
        {label: "Malagasy", value: "mg", description: ""},
        {label: "Malay", value: "ms", description: ""},
        {label: "Malayalam", value: "ml", description: ""},
        {label: "Maltese", value: "mt", description: ""},
        {label: "Maori", value: "mi", description: ""},
        {label: "Marathi", value: "mr", description: ""},
        {label: "Marshallese", value: "mh", description: ""},
        {label: "Moldavian", value: "mo", description: ""},
        {label: "Mongolian", value: "mn", description: ""},
        {label: "Nauru", value: "na", description: ""},
        {label: "Navajo", value: "nv", description: ""},
        {label: "Ndonga", value: "ng", description: ""},
        {label: "Northern Ndebele", value: "nd", description: ""},
        {label: "Nepali", value: "ne", description: ""},
        {label: "Norwegian", value: "no", description: ""},
        {label: "Norwegian bokmål", value: "nb", description: ""},
        {label: "Norwegian nynorsk", value: "nn", description: ""},
        {label: "Nuosu", value: "ii", description: ""},
        {label: "Occitan", value: "oc", description: ""},
        {label: "Ojibwe", value: "oj", description: ""},
        {label: "Old Church Slavonic, Old Bulgarian", value: "cu", description: ""},
        {label: "Oriya", value: "or", description: ""},
        {label: "Oromo (Afaan Oromo)", value: "om", description: ""},
        {label: "Ossetian", value: "os", description: ""},
        {label: "Pāli", value: "pi", description: ""},
        {label: "Pashto, Pushto", value: "ps", description: ""},
        {label: "Persian (Farsi)", value: "fa", description: ""},
        {label: "Polish", value: "pl", description: ""},
        {label: "Portuguese", value: "pt", description: ""},
        {label: "Punjabi (Eastern)", value: "pa", description: ""},
        {label: "Quechua", value: "qu", description: ""},
        {label: "Romansh", value: "rm", description: ""},
        {label: "Romanian", value: "ro", description: ""},
        {label: "Russian", value: "ru", description: ""},
        {label: "Sami", value: "se", description: ""},
        {label: "Samoan", value: "sm", description: ""},
        {label: "Sango", value: "sg", description: ""},
        {label: "Sanskrit", value: "sa", description: ""},
        {label: "Serbian", value: "sr", description: ""},
        {label: "Serbo-Croatian", value: "sh", description: ""},
        {label: "Sesotho", value: "st", description: ""},
        {label: "Setswana", value: "tn", description: ""},
        {label: "Shona", value: "sn", description: ""},
        {label: "Sichuan Yi", value: "ii", description: ""},
        {label: "Sindhi", value: "sd", description: ""},
        {label: "Sinhalese", value: "si", description: ""},
        {label: "Siswati", value: "ss", description: ""},
        {label: "Slovak", value: "sk", description: ""},
        {label: "Slovenian", value: "sl", description: ""},
        {label: "Somali", value: "so", description: ""},
        {label: "Southern Ndebele", value: "nr", description: ""},
        {label: "Spanish", value: "es", description: ""},
        {label: "Sundanese", value: "su", description: ""},
        {label: "Swahili (Kiswahili)", value: "sw", description: ""},
        {label: "Swati", value: "ss", description: ""},
        {label: "Swedish", value: "sv", description: ""},
        {label: "Tagalog", value: "tl", description: ""},
        {label: "Tahitian", value: "ty", description: ""},
        {label: "Tajik", value: "tg", description: ""},
        {label: "Tamil", value: "ta", description: ""},
        {label: "Tatar", value: "tt", description: ""},
        {label: "Telugu", value: "te", description: ""},
        {label: "Thai", value: "th", description: ""},
        {label: "Tibetan", value: "bo", description: ""},
        {label: "Tigrinya", value: "ti", description: ""},
        {label: "Tonga", value: "to", description: ""},
        {label: "Tsonga", value: "ts", description: ""},
        {label: "Turkish", value: "tr", description: ""},
        {label: "Turkmen", value: "tk", description: ""},
        {label: "Twi", value: "tw", description: ""},
        {label: "Uyghur", value: "ug", description: ""},
        {label: "Ukrainian", value: "uk", description: ""},
        {label: "Urdu", value: "ur", description: ""},
        {label: "Uzbek", value: "uz", description: ""},
        {label: "Venda", value: "ve", description: ""},
        {label: "Vietnamese", value: "vi", description: ""},
        {label: "Volapük", value: "vo", description: ""},
        {label: "Wallon", value: "wa", description: ""},
        {label: "Welsh", value: "cy", description: ""},
        {label: "Wolof", value: "wo", description: ""},
        {label: "Western Frisian", value: "fy", description: ""},
        {label: "Xhosa", value: "xh", description: ""},
        {label: "Yiddish", value: "yi, ji", description: ""},
        {label: "Yoruba", value: "yo", description: ""},
        {label: "Zhuang, Chuang", value: "za", description: ""},
        {label: "Zulu", value: "zu", description: ""}
    ];

    let mediaStringType = {device: "deviceList", operator: "operatorsList", valueName: "valueNameList", description: ""};

    let deviceList = [
        {label: "all", value: "all", description: ""},
        {label: "aural", value: "aural", description: ""},
        {label: "braille", value: "braille", description: ""},
        {label: "handheld", value: "handheld", description: ""},
        {label: "projection", value: "projection", description: ""},
        {label: "print", value: "print", description: ""},
        {label: "screen", value: "screen", description: ""},
        {label: "tty", value: "tty", description: ""},
        {label: "tv", value: "tv", description: ""}
    ];

    let operatorsList = [
        {label: "and", value: "and", description: ""},
        {label: "not", value: "not", description: ""},
        {label: "or", value: ",", description: ""}
    ];

    let orientationList = [
        {label: "portrait", value: "portrait", description: ""},
        {label: "landscape", value: "landscape", description: ""}
    ];

    let scanList = [
        {label: "progressive", value: "progressive", description: ""},
        {label: "interlace", value: "interlace", description: ""}
    ];

    let gridList = [
        {label: "1", value: "1", description: ""},
        {label: "0", value: "0", description: ""}
    ];

    let valueNameList = [
        {label: "width", value: "width", description: ""},
        {label: "max-width", value: "max-width", description: ""},
        {label: "min-width", value: "min-width", description: ""},
        {label: "height", value: "height", description: ""},
        {label: "max-height", value: "max-height", description: ""},
        {label: "min-height", value: "min-height", description: ""},
        {label: "device-width", value: "device-width", description: ""},
        {label: "max-device-width", value: "max-device-width", description: ""},
        {label: "min-device-width", value: "min-device-width", description: ""},
        {label: "device-height", value: "device-height", description: ""},
        {label: "max-device-height", value: "max-device-height", description: ""},
        {label: "min-device-height", value: "min-device-height", description: ""},
        {label: "orientation", value: "orientation", description: ""},
        {label: "aspect-ratio", value: "aspect-ratio", description: ""},
        {label: "max-aspect-ratio", value: "max-aspect-ratio", description: ""},
        {label: "min-aspect-ratio", value: "min-aspect-ratio", description: ""},
        {label: "device-aspect-ratio", value: "device-aspect-ratio", description: ""},
        {label: "max-device-aspect-ratio", value: "max-device-aspect-ratio", description: ""},
        {label: "min-device-aspect-ratio", value: "min-device-aspect-ratio", description: ""},
        {label: "color", value: "color", description: ""},
        {label: "max-color", value: "max-color", description: ""},
        {label: "min-color", value: "min-color", description: ""},
        {label: "color-index", value: "color-index", description: ""},
        {label: "max-color-index", value: "max-color-index", description: ""},
        {label: "min-color-index", value: "min-color-index", description: ""},
        {label: "monochrome", value: "monochrome", description: ""},
        {label: "max-monochrome", value: "max-monochrome", description: ""},
        {label: "min-monochrome", value: "min-monochrome", description: ""},
        {label: "resolution", value: "resolution", description: ""},
        {label: "max-resolution", value: "max-resolution", description: ""},
        {label: "min-resolution", value: "min-resolution", description: ""},
        {label: "scan", value: "scan", description: ""},
        {label: "grid", value: "grid", description: ""}
    ];

    let methodList = [
        {label: "get", value: "get", description: ""},
        {label: "post", value: "post", description: ""}
    ];

    let preloadList = [
        {label: "auto", value: "auto", description: ""},
        {label: "metadata", value: "metadata", description: ""},
        {label: "none", value: "none", description: ""}
    ];

    let relList = [
        {label: "alternate", value: "alternate", tags: ["a","area","link"], description: "Provides a link to an alternate representation of the document (i.e. print page, translated or mirror)"},
        {label: "author", value: "author", tags: ["a","area","link"], description: "Provides a link to the author of the document"},
        {label: "bookmark", value: "bookmark", tags: ["a","area"], description: "Permanent URL used for bookmarking"},
        {label: "dns-prefetch", value: "dns-prefetch", tags: ["link"], description: "Specifies that the browser should preemptively perform DNS resolution for the target resource's origin"},
        {label: "external", value: "external", tags: ["a","form"], description: "Indicates that the referenced document is not part of the same site as the current document"},
        {label: "help", value: "help", description: "Provides a link to a help document"},
        {label: "icon", value: "icon", tags: ["link"], description: "Imports an icon to represent the document"},
        {label: "license", value: "license", description: "Provides a link to licensing information for the document"},
        {label: "next", value: "next", description: "Provides a link to the next document in the series"},
        {label: "nofollow", value: "nofollow", tags: ["a","area","form"], description: "Links to an unendorsed document, like a paid link. (\"nofollow\" is used by Google, to specify that the Google search spider should not follow that link)"},
        {label: "noopener", value: "noopener", tags: ["a","form"], description: "Requires that any browsing context created by following the hyperlink must not have an opener browsing context"},
        {label: "noreferrer", value: "noreferrer", tags: ["a","area","form"], description: "Makes the referrer unknown. No referer header will be included when the user clicks the hyperlink"},
        {label: "opener", value: "opener", tags: ["form"], description: "Provides a link to the opener of the document"},
        {label: "pingback", value: "pingback", tags: ["link"], description: "Provides the address of the pingback server that handles pingbacks to the current document"},
        {label: "preconnect", value: "preconnect", tags: ["link"], description: "Specifies that the browser should preemptively connect to the target resource's origin"},
        {label: "prefetch", value: "prefetch", tags: ["area","link"], description: "Specifies that the browser should preemptively fetch and cache the target resource as it is likely to be required for a follow-up navigation"},
        {label: "preload", value: "preload", tags: ["link"], description: "Specifies that the browser agent must preemptively fetch and cache the target resource for current navigation according to the destination given by the \"as\" attribute (and the priority associated with that destination)"},
        {label: "prerender", value: "prerender", tags: ["link"], description: "Specifies that the browser should pre-render (load) the specified webpage in the background. So, if the user navigates to this page, it speeds up the page load (because the page is already loaded). Warning! This wastes the user's bandwidth! Only use prerender if you are absolutely sure that the webpage is required at some point in the user's journey"},
        {label: "prev", value: "prev", description: "Indicates that the document is a part of a series, and that the previous document in the series is the referenced document"},
        {label: "search", value: "search", description: "Provides a link to a resource that can be used to search through the current document and its related pages"},
        {label: "stylesheet", value: "stylesheet", tags: ["link"], description: "Imports a style sheet"},
        {label: "tag", value: "tag", tags: ["a","area"], description: "A tag (keyword) for the current document"}
    ];

    let sandboxList = [
        {label: "", value: "", description: ""},
        {label: "allow-forms", value: "allow-forms", description: ""},
        {label: "allow-modals", value: "allow-modals", description: ""},
        {label: "allow-orientation-lock", value: "allow-orientation-lock", description: ""},
        {label: "allow-pointer-lock", value: "allow-pointer-lock", description: ""},
        {label: "allow-popups", value: "allow-popups", description: ""},
        {label: "allow-popups-to-escape-sandbox", value: "allow-popups-to-escape-sandbox", description: ""},
        {label: "allow-presentation", value: "allow-presentation", description: ""},
        {label: "allow-same-origin", value: "allow-same-origin", description: ""},
        {label: "allow-scripts", value: "allow-scripts", description: ""},
        {label: "allow-top-navigation", value: "allow-top-navigation", description: ""},
        {label: "allow-top-navigation-by-user-activation", value: "allow-top-navigation-by-user-activation", description: ""},
    ];

    let scopeList = [
        {label: "col", value: "col", description: ""},
        {label: "row", value: "row", description: ""},
        {label: "colgroup", value: "colgroup", description: ""},
        {label: "rowgroup", value: "rowgroup", description: ""}
    ];

    let shapeList = [
        {label: "default", value: "default", description: ""},
        {label: "rect", value: "rect", description: ""},
        {label: "circle", value: "circle", description: ""},
        {label: "poly", value: "poly", description: ""}
    ];

    let targetList = [
        {label: "_blank", value: "_blank", description: ""},
        {label: "_self", value: "_self", description: ""},
        {label: "_parent", value: "_parent", description: ""},
        {label: "_top", value: "_top", description: ""}
    ];

    let typeList = [
        {label: "mediaType", value: "mediaType", tags: ["a"], description: ""},
        {label: "button", value: "button", tags: ["button"], description: ""},
        {label: "submit", value: "submit", tags: ["button"], description: ""},
        {label: "reset", value: "reset", tags: ["button"], description: ""},
        {label: "mediaType", value: "mediaType", tags: ["embed"], description: ""},
        {label: "button", value: "button", tags: ["input"], description: ""},
        {label: "checkbox", value: "checkbox", tags: ["input"], description: ""},
        {label: "color", value: "color", tags: ["input"], description: ""},
        {label: "date", value: "date", tags: ["input"], description: ""},
        {label: "datetime-local", value: "datetime-local", tags: ["input"], description: ""},
        {label: "email", value: "email", tags: ["input"], description: ""},
        {label: "file", value: "file", tags: ["input"], description: ""},
        {label: "hidden", value: "hidden", tags: ["input"], description: ""},
        {label: "image", value: "image", tags: ["input"], description: ""},
        {label: "month", value: "month", tags: ["input"], description: ""},
        {label: "number", value: "number", tags: ["input"], description: ""},
        {label: "password", value: "password", tags: ["input"], description: ""},
        {label: "radio", value: "radio", tags: ["input"], description: ""},
        {label: "range", value: "range", tags: ["input"], description: ""},
        {label: "reset", value: "reset", tags: ["input"], description: ""},
        {label: "search", value: "search", tags: ["input"], description: ""},
        {label: "submit", value: "submit", tags: ["input"], description: ""},
        {label: "tel", value: "tel", tags: ["input"], description: ""},
        {label: "text", value: "text", tags: ["input"], description: ""},
        {label: "time", value: "time", tags: ["input"], description: ""},
        {label: "url", value: "url", tags: ["input"], description: ""},
        {label: "week", value: "week", tags: ["input"], description: ""},
        {label: "mediaType", value: "mediaType", tags: ["link"], description: ""},
        {label: "list", value: "list", tags: ["menu"], description: ""},
        {label: "context", value: "context", tags: ["menu"], description: ""},
        {label: "toolbar", value: "toolbar", tags: ["menu"], description: ""},
        {label: "mediaType", value: "mediaType", tags: ["object"], description: ""},
        {label: "application/javascript", value: "application/javascript", tags: ["script"], description: ""},
        {label: "application/ecmascript", value: "application/ecmascript", tags: ["script"], description: ""},
        {label: "video/ogg", value: "video/ogg", tags: ["source"], description: ""},
        {label: "video/mp4", value: "video/mp4", tags: ["source"], description: ""},
        {label: "video/webm", value: "video/webm", tags: ["source"], description: ""},
        {label: "audio/ogg", value: "audio/ogg", tags: ["source"], description: ""},
        {label: "audio/mpeg", value: "audio/mpeg", tags: ["source"], description: ""},
        {label: "text/css", value: "mediaType", tags: ["style"], description: ""},
    ];

    let wrapList = [
        {label: "soft", value: "soft", description: ""},
        {label: "hard", value: "hard", description: ""}
    ];

    let css3Properties = [
        {
            attName: "accent-color",
            type: "colorTypesList",
            description: "Specifies an accent color for user-interface controls"
        },
        {
            attName: "align-content",
            type: "alignContentList",
            default: "stretch",
            description: "Specifies the alignment between the lines inside a flexible container when the items do not use all available space"
        },
        {
            attName: "align-items",
            type: "alignItemsList",
            default: "normal",
            description: "Specifies the alignment for items inside a flexible container"
        },
    ];

    let colorTypesList = [
        {label: "namedColor", value: "namedColor", description: ""},
        {label: "rgb", value: "rgb", description: ""},
        {label: "hex", value: "hex", description: ""},
    ];

    let alignContentList = [
        {label: "stretch", value: "stretch", description: ""},
        {label: "center", value: "center", description: ""},
        {label: "flex-start", value: "flex-start", description: ""},
        {label: "flex-end", value: "flex-end", description: ""},
        {label: "space-between", value: "space-between", description: ""},
        {label: "space-around", value: "space-around", description: ""},
        {label: "space-evenly", value: "space-evenly", description: ""},
        {label: "initial", value: "initial", description: ""},
        {label: "inherit", value: "inherit", description: ""},
    ];

    let alignItemsList = [
        {label: "normal", value: "normal", description: ""},
        {label: "stretch", value: "stretch", description: ""},
        {label: "center", value: "center", description: ""},
        {label: "flex-start", value: "flex-start", description: ""},
        {label: "flex-end", value: "flex-end", description: ""},
        {label: "start", value: "start", description: ""},
        {label: "end", value: "end", description: ""},
        {label: "baseline", value: "baseline", description: ""},
        {label: "initial", value: "initial", description: ""},
        {label: "inherit", value: "inherit", description: ""},
    ];

    let fontFamilyList = [
        {label: "Arial", value: "Arial, sans-serif", description: "Arial, sans-serif"},
        {label: "Brush Script MT", value: "'Brush Script MT', cursive", description: "'Brush Script MT', cursive"},
        {label: "Copperplate", value: "Copperplate, fantasy", description: "Copperplate, fantasy"},
        {label: "Courier", value: "Courier, monospace", description: "Courier, monospace"},
        {label: "Courier New", value: "'Courier New', monospace", description: "'Courier New', monospace"},
        {label: "Garamond", value: "Garamond, serif", description: "Garamond, serif"},
        {label: "Geneva", value: "Geneva, sans-serif", description: "Geneva, sans-serif"},
        {label: "Georgia", value: "Georgia, serif", description: "Georgia, serif"},
        {label: "Helvetica", value: "Helvetica, serif", description: "Helvetica, serif"},
        {label: "Papyrus", value: "Papyrus, fantasy", description: "Papyrus, fantasy"},
        {label: "Tahoma", value: "Tahoma, sans-serif", description: "Tahoma, sans-serif"},
        {label: "Times New Roman", value: "'Times New Roman', serif", description: "'Times New Roman', serif"},
        {label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif", description: "'Trebuchet MS', sans-serif"},
        {label: "Verdana", value: "Verdana, sans-serif", description: "Verdana, sans-serif"},
    ];

    let cssUnitsList = [
        {label: "centimeters", value: "cm", description: "centimeters"},
        {label: "millimeters", value: "mm", description: "millimeters"},
        {label: "inches", value: "in", description: "inches"},
        {label: "pixels", value: "px", description: "pixels"},
        {label: "points", value: "pt", description: "points"},
        {label: "picas", value: "pc", description: "picas"},
        {label: "font-size relative", value: "em", description: "Relative to the font-size of the element"},
        {label: "font-x-height relative", value: "ex", description: "Relative to the x-height of the current font"},
        {label: "0 relative", value: "ch", description: "Relative to the width of the \"0\""},
        {label: "root element relative", value: "rem", description: "Relative to font-size of the root element"},
        {label: "viewport-width relative", value: "vw", description: "Relative to 1% of the width of the viewport"},
        {label: "viewport-height relative", value: "vh", description: "Relative to 1% of the height of the viewport"},
        {label: "viewport-smallest relative", value: "vmin", description: "Relative to 1% of viewport's* smaller dimension"},
        {label: "viewport-largest relative", value: "vmax", description: "Relative to 1% of viewport's* larger dimension"},
        {label: "parent relative", value: "%", description: "Relative to the parent element"},
    ]

    let html5Symbols = [
        {
            "label": "left arrow",
            "icon": "&#8592;",
            "value": "8592",
            "group": "arrows",
        },
        {
            "label": "up arrow",
            "icon": "&#8593;",
            "value": "8593",
            "group": "arrows",
        },
        {
            "label": "right arrow",
            "icon": "&#8594;",
            "value": "8594",
            "group": "arrows",
        },
        {
            "label": "down arrow",
            "icon": "&#8595;",
            "value": "8595",
            "group": "arrows",
        },
        {
            "label": "left right arrow",
            "icon": "&#8596;",
            "value": "8596",
            "group": "arrows",
        },
        {
            "label": "up down arrow",
            "icon": "&#8597;",
            "value": "8597",
            "group": "arrows",
        },
        {
            "label": "north west arrow",
            "icon": "&#8598;",
            "value": "8598",
            "group": "arrows",
        },
        {
            "label": "north east arrow",
            "icon": "&#8599;",
            "value": "8599",
            "group": "arrows",
        },
        {
            "label": "south east arrow",
            "icon": "&#8600;",
            "value": "8600",
            "group": "arrows",
        },
        {
            "label": "south west arrow",
            "icon": "&#8601;",
            "value": "8601",
            "group": "arrows",
        },
        {
            "label": "left arrow with stroke",
            "icon": "&#8602;",
            "value": "8602",
            "group": "arrows",
        },
        {
            "label": "right arrow with stroke",
            "icon": "&#8603;",
            "value": "8603",
            "group": "arrows",
        },
        {
            "label": "left wave arrow",
            "icon": "&#8604;",
            "value": "8604",
            "group": "arrows",
        },
        {
            "label": "right wave arrow",
            "icon": "&#8605;",
            "value": "8605",
            "group": "arrows",
        },
        {
            "label": "left two headed arrow",
            "icon": "&#8606;",
            "value": "8606",
            "group": "arrows",
        },
        {
            "label": "up two headed arrow",
            "icon": "&#8607;",
            "value": "8607",
            "group": "arrows",
        },
        {
            "label": "right two headed arrow",
            "icon": "&#8608;",
            "value": "8608",
            "group": "arrows",
        },
        {
            "label": "down two headed arrow",
            "icon": "&#8609;",
            "value": "8609",
            "group": "arrows",
        },
        {
            "label": "left arrow with tail",
            "icon": "&#8610;",
            "value": "8610",
            "group": "arrows",
        },
        {
            "label": "right arrow with tail",
            "icon": "&#8611;",
            "value": "8611",
            "group": "arrows",
        },
        {
            "label": "left arrow from bar",
            "icon": "&#8612;",
            "value": "8612",
            "group": "arrows",
        },
        {
            "label": "up arrow from bar",
            "icon": "&#8613;",
            "value": "8613",
            "group": "arrows",
        },
        {
            "label": "right arrow from bar",
            "icon": "&#8614;",
            "value": "8614",
            "group": "arrows",
        },
        {
            "label": "down arrow from bar",
            "icon": "&#8615;",
            "value": "8615",
            "group": "arrows",
        },
        {
            "label": "up down arrow with base",
            "icon": "&#8616;",
            "value": "8616",
            "group": "arrows",
        },
        {
            "label": "left arrow with hook",
            "icon": "&#8617;",
            "value": "8617",
            "group": "arrows",
        },
        {
            "label": "right arrow with hook",
            "icon": "&#8618;",
            "value": "8618",
            "group": "arrows",
        },
        {
            "label": "left arrow with loop",
            "icon": "&#8619;",
            "value": "8619",
            "group": "arrows",
        },
        {
            "label": "right arrow with loop",
            "icon": "&#8620;",
            "value": "8620",
            "group": "arrows",
        },
        {
            "label": "left right wave arrow",
            "icon": "&#8621;",
            "value": "8621",
            "group": "arrows",
        },
        {
            "label": "left right arrow with stroke",
            "icon": "&#8622;",
            "value": "8622",
            "group": "arrows",
        },
        {
            "label": "down zigzag arrow",
            "icon": "&#8623;",
            "value": "8623",
            "group": "arrows",
        },
        {
            "label": "up arrow with tip left",
            "icon": "&#8624;",
            "value": "8624",
            "group": "arrows",
        },
        {
            "label": "up arrow with tip right",
            "icon": "&#8625;",
            "value": "8625",
            "group": "arrows",
        },
        {
            "label": "down arrow with tip left",
            "icon": "&#8626;",
            "value": "8626",
            "group": "arrows",
        },
        {
            "label": "down arrow with tip right",
            "icon": "&#8627;",
            "value": "8627",
            "group": "arrows",
        },
        {
            "label": "right arrow with corner down",
            "icon": "&#8628;",
            "value": "8628",
            "group": "arrows",
        },
        {
            "label": "down arrow with corner left",
            "icon": "&#8629;",
            "value": "8629",
            "group": "arrows",
        },
        {
            "label": "anticlockwise top semicircle arrow",
            "icon": "&#8630;",
            "value": "8630",
            "group": "arrows",
        },
        {
            "label": "clockwise top semicircle arrow",
            "icon": "&#8631;",
            "value": "8631",
            "group": "arrows",
        },
        {
            "label": "north west arrow to long bar",
            "icon": "&#8632;",
            "value": "8632",
            "group": "arrows",
        },
        {
            "label": "left arrow to bar over right arrow to bar",
            "icon": "&#8633;",
            "value": "8633",
            "group": "arrows",
        },
        {
            "label": "anticlockwise open circle arrow",
            "icon": "&#8634;",
            "value": "8634",
            "group": "arrows",
        },
        {
            "label": "clockwise open circle arrow",
            "icon": "&#8635;",
            "value": "8635",
            "group": "arrows",
        },
        {
            "label": "left harpoon with barb up",
            "icon": "&#8636;",
            "value": "8636",
            "group": "arrows",
        },
        {
            "label": "left harpoon with barb down",
            "icon": "&#8637;",
            "value": "8637",
            "group": "arrows",
        },
        {
            "label": "up harpoon with barb right",
            "icon": "&#8638;",
            "value": "8638",
            "group": "arrows",
        },
        {
            "label": "up harpoon with barb left",
            "icon": "&#8639;",
            "value": "8639",
            "group": "arrows",
        },
        {
            "label": "right harpoon with barb up",
            "icon": "&#8640;",
            "value": "8640",
            "group": "arrows",
        },
        {
            "label": "right harpoon with barb down",
            "icon": "&#8641;",
            "value": "8641",
            "group": "arrows",
        },
        {
            "label": "down harpoon with barb right",
            "icon": "&#8642;",
            "value": "8642",
            "group": "arrows",
        },
        {
            "label": "down harpoon with barb left",
            "icon": "&#8643;",
            "value": "8643",
            "group": "arrows",
        },
        {
            "label": "right arrow over left arrow",
            "icon": "&#8644;",
            "value": "8644",
            "group": "arrows",
        },
        {
            "label": "up arrow left of down arrow",
            "icon": "&#8645;",
            "value": "8645",
            "group": "arrows",
        },
        {
            "label": "left arrow over right arrow",
            "icon": "&#8646;",
            "value": "8646",
            "group": "arrows",
        },
        {
            "label": "left paired arrows",
            "icon": "&#8647;",
            "value": "8647",
            "group": "arrows",
        },
        {
            "label": "up paired arrows",
            "icon": "&#8648;",
            "value": "8648",
            "group": "arrows",
        },
        {
            "label": "right paired arrows",
            "icon": "&#8649;",
            "value": "8649",
            "group": "arrows",
        },
        {
            "label": "downards paired arrows",
            "icon": "&#8650;",
            "value": "8650",
            "group": "arrows",
        },
        {
            "label": "left harpoon over right harpoon",
            "icon": "&#8651;",
            "value": "8651",
            "group": "arrows",
        },
        {
            "label": "right harpoon over left harpoon",
            "icon": "&#8652;",
            "value": "8652",
            "group": "arrows",
        },
        {
            "label": "left double arrow with stroke",
            "icon": "&#8653;",
            "value": "8653",
            "group": "arrows",
        },
        {
            "label": "left right double arrow with stroke",
            "icon": "&#8654;",
            "value": "8654",
            "group": "arrows",
        },
        {
            "label": "right double arrow with stroke",
            "icon": "&#8655;",
            "value": "8655",
            "group": "arrows",
        },
        {
            "label": "left double arrow",
            "icon": "&#8656;",
            "value": "8656",
            "group": "arrows",
        },
        {
            "label": "up double arrow",
            "icon": "&#8657;",
            "value": "8657",
            "group": "arrows",
        },
        {
            "label": "right double arrow",
            "icon": "&#8658;",
            "value": "8658",
            "group": "arrows",
        },
        {
            "label": "down double arrow",
            "icon": "&#8659;",
            "value": "8659",
            "group": "arrows",
        },
        {
            "label": "left right double arrow",
            "icon": "&#8660;",
            "value": "8660",
            "group": "arrows",
        },
        {
            "label": "up down double arrow",
            "icon": "&#8661;",
            "value": "8661",
            "group": "arrows",
        },
        {
            "label": "north west double arrow",
            "icon": "&#8662;",
            "value": "8662",
            "group": "arrows",
        },
        {
            "label": "north east double arrow",
            "icon": "&#8663;",
            "value": "8663",
            "group": "arrows",
        },
        {
            "label": "south east double arrow",
            "icon": "&#8664;",
            "value": "8664",
            "group": "arrows",
        },
        {
            "label": "south west double arrow",
            "icon": "&#8665;",
            "value": "8665",
            "group": "arrows",
        },
        {
            "label": "left triple arrow",
            "icon": "&#8666;",
            "value": "8666",
            "group": "arrows",
        },
        {
            "label": "right triple arrow",
            "icon": "&#8667;",
            "value": "8667",
            "group": "arrows",
        },
        {
            "label": "left squiggle arrow",
            "icon": "&#8668;",
            "value": "8668",
            "group": "arrows",
        },
        {
            "label": "right squiggle arrow",
            "icon": "&#8669;",
            "value": "8669",
            "group": "arrows",
        },
        {
            "label": "up arrow with double stroke",
            "icon": "&#8670;",
            "value": "8670",
            "group": "arrows",
        },
        {
            "label": "down arrow with double stroke",
            "icon": "&#8671;",
            "value": "8671",
            "group": "arrows",
        },
        {
            "label": "left dashed arrow",
            "icon": "&#8672;",
            "value": "8672",
            "group": "arrows",
        },
        {
            "label": "up dashed arrow",
            "icon": "&#8673;",
            "value": "8673",
            "group": "arrows",
        },
        {
            "label": "right dashed arrow",
            "icon": "&#8674;",
            "value": "8674",
            "group": "arrows",
        },
        {
            "label": "down dashed arrow",
            "icon": "&#8675;",
            "value": "8675",
            "group": "arrows",
        },
        {
            "label": "left arrow to bar",
            "icon": "&#8676;",
            "value": "8676",
            "group": "arrows",
        },
        {
            "label": "right arrow to bar",
            "icon": "&#8677;",
            "value": "8677",
            "group": "arrows",
        },
        {
            "label": "right arrow to bar",
            "icon": "&#8677;",
            "value": "8677",
            "group": "arrows",
        },
        {
            "label": "left white arrow",
            "icon": "&#8678;",
            "value": "8678",
            "group": "arrows",
        },
        {
            "label": "up white arrow",
            "icon": "&#8679;",
            "value": "8679",
            "group": "arrows",
        },
        {
            "label": "right white arrow",
            "icon": "&#8680;",
            "value": "8680",
            "group": "arrows",
        },
        {
            "label": "down white arrow",
            "icon": "&#8681;",
            "value": "8681",
            "group": "arrows",
        },
        {
            "label": "up white arrow from bar",
            "icon": "&#8682;",
            "value": "8682",
            "group": "arrows",
        },
        {
            "label": "up white arrow on pedestal",
            "icon": "&#8683;",
            "value": "8683",
            "group": "arrows",
        },
        {
            "label": "up white arrow on pedestal with horizontal bar",
            "icon": "&#8684;",
            "value": "8684",
            "group": "arrows",
        },
        {
            "label": "up white arrow on pedestal with vertical bar",
            "icon": "&#8685;",
            "value": "8685",
            "group": "arrows",
        },
        {
            "label": "up white double arrow",
            "icon": "&#8686;",
            "value": "8686",
            "group": "arrows",
        },
        {
            "label": "up white double arrow on pedestal",
            "icon": "&#8687;",
            "value": "8687",
            "group": "arrows",
        },
        {
            "label": "right white arrow from wall",
            "icon": "&#8688;",
            "value": "8688",
            "group": "arrows",
        },
        {
            "label": "north west arrow to corner",
            "icon": "&#8689;",
            "value": "8689",
            "group": "arrows",
        },
        {
            "label": "south east arrow to corner",
            "icon": "&#8690;",
            "value": "8690",
            "group": "arrows",
        },
        {
            "label": "up down white arrow",
            "icon": "&#8691;",
            "value": "8691",
            "group": "arrows",
        },
        {
            "label": "right arrow with small circle",
            "icon": "&#8692;",
            "value": "8692",
            "group": "arrows",
        },
        {
            "label": "down arrow left of up arrow",
            "icon": "&#8693;",
            "value": "8693",
            "group": "arrows",
        },
        {
            "label": "three right arrows",
            "icon": "&#8694;",
            "value": "8694",
            "group": "arrows",
        },
        {
            "label": "left arrow with vertical stroke",
            "icon": "&#8695;",
            "value": "8695",
            "group": "arrows",
        },
        {
            "label": "right arrow with vertical stroke",
            "icon": "&#8696;",
            "value": "8696",
            "group": "arrows",
        },
        {
            "label": "left right arrow with vertical stroke",
            "icon": "&#8697;",
            "value": "8697",
            "group": "arrows",
        },
        {
            "label": "left arrow with double vertical stroke",
            "icon": "&#8698;",
            "value": "8698",
            "group": "arrows",
        },
        {
            "label": "right arrow with double vertical stroke",
            "icon": "&#8699;",
            "value": "8699",
            "group": "arrows",
        },
        {
            "label": "left right arrow with double vertical stroke",
            "icon": "&#8700;",
            "value": "8700",
            "group": "arrows",
        },
        {
            "label": "left open-headed arrow",
            "icon": "&#8701;",
            "value": "8701",
            "group": "arrows",
        },
        {
            "label": "right open-headed arrow",
            "icon": "&#8702;",
            "value": "8702",
            "group": "arrows",
        },
        {
            "label": "left right open-headed arrow",
            "icon": "&#8703;",
            "value": "8703",
            "group": "arrows",
        },
        {
            "label": "up quadruple arrow",
            "icon": "&#10224;",
            "value": "10224",
            "group": "arrows",
        },
        {
            "label": "down quadruple arrow",
            "icon": "&#10225;",
            "value": "10225",
            "group": "arrows",
        },
        {
            "label": "anticlockwise gapped circle arrow",
            "icon": "&#10226;",
            "value": "10226",
            "group": "arrows",
        },
        {
            "label": "clockwise gapped circle arrow",
            "icon": "&#10227;",
            "value": "10227",
            "group": "arrows",
        },
        {
            "label": "right arrow with circled plus",
            "icon": "&#10228;",
            "value": "10228",
            "group": "arrows",
        },
        {
            "label": "long left arrow",
            "icon": "&#10229;",
            "value": "10229",
            "group": "arrows",
        },
        {
            "label": "long right arrow",
            "icon": "&#10230;",
            "value": "10230",
            "group": "arrows",
        },
        {
            "label": "long left right arrow",
            "icon": "&#10231;",
            "value": "10231",
            "group": "arrows",
        },
        {
            "label": "long left double arrow",
            "icon": "&#10232;",
            "value": "10232",
            "group": "arrows",
        },
        {
            "label": "long right double arrow",
            "icon": "&#10233;",
            "value": "10233",
            "group": "arrows",
        },
        {
            "label": "long left right double arrow",
            "icon": "&#10234;",
            "value": "10234",
            "group": "arrows",
        },
        {
            "label": "long left arrow from bar",
            "icon": "&#10235;",
            "value": "10235",
            "group": "arrows",
        },
        {
            "label": "long right arrow from bar",
            "icon": "&#10236;",
            "value": "10236",
            "group": "arrows",
        },
        {
            "label": "long left double arrow from bar",
            "icon": "&#10237;",
            "value": "10237",
            "group": "arrows",
        },
        {
            "label": "long right double arrow from bar",
            "icon": "&#10238;",
            "value": "10238",
            "group": "arrows",
        },
        {
            "label": "long right squiggle arrow",
            "icon": "&#10239;",
            "value": "10239",
            "group": "arrows",
        },
        {
            "label": "right two-headed arrow with vertical stroke",
            "icon": "&#10496;",
            "value": "10496",
            "group": "arrows",
        },
        {
            "label": "right two-headed arrow with double vertical stroke",
            "icon": "&#10497;",
            "value": "10497",
            "group": "arrows",
        },
        {
            "label": "left double arrow with vertical stroke",
            "icon": "&#10498;",
            "value": "10498",
            "group": "arrows",
        },
        {
            "label": "right double arrow with vertical stroke",
            "icon": "&#10499;",
            "value": "10499",
            "group": "arrows",
        },
        {
            "label": "left right double arrow with vertical stroke",
            "icon": "&#10500;",
            "value": "10500",
            "group": "arrows",
        },
        {
            "label": "right two-headed arrow from bar",
            "icon": "&#10501;",
            "value": "10501",
            "group": "arrows",
        },
        {
            "label": "left double arrow from bar",
            "icon": "&#10502;",
            "value": "10502",
            "group": "arrows",
        },
        {
            "label": "right double arrow from bar",
            "icon": "&#10503;",
            "value": "10503",
            "group": "arrows",
        },
        {
            "label": "down arrow with horizontal stroke",
            "icon": "&#10504;",
            "value": "10504",
            "group": "arrows",
        },
        {
            "label": "up arrow with horizontal stroke",
            "icon": "&#10505;",
            "value": "10505",
            "group": "arrows",
        },
        {
            "label": "up triple arrow",
            "icon": "&#10506;",
            "value": "10506",
            "group": "arrows",
        },
        {
            "label": "down triple arrow",
            "icon": "&#10507;",
            "value": "10507",
            "group": "arrows",
        },
        {
            "label": "left double dash arrow",
            "icon": "&#10508;",
            "value": "10508",
            "group": "arrows",
        },
        {
            "label": "right double dash arrow",
            "icon": "&#10509;",
            "value": "10509",
            "group": "arrows",
        },
        {
            "label": "left triple dash arrow",
            "icon": "&#10510;",
            "value": "10510",
            "group": "arrows",
        },
        {
            "label": "right triple dash arrow",
            "icon": "&#10511;",
            "value": "10511",
            "group": "arrows",
        },
        {
            "label": "right two-headed triple dash arrow",
            "icon": "&#10512;",
            "value": "10512",
            "group": "arrows",
        },
        {
            "label": "right arrow with dotted stem",
            "icon": "&#10513;",
            "value": "10513",
            "group": "arrows",
        },
        {
            "label": "up arrow to bar",
            "icon": "&#10514;",
            "value": "10514",
            "group": "arrows",
        },
        {
            "label": "down arrow to bar",
            "icon": "&#10515;",
            "value": "10515",
            "group": "arrows",
        },
        {
            "label": "right arrow with tail with vertical stroke",
            "icon": "&#10516;",
            "value": "10516",
            "group": "arrows",
        },
        {
            "label": "right arrow with tail with double vertical stroke",
            "icon": "&#10517;",
            "value": "10517",
            "group": "arrows",
        },
        {
            "label": "right two-headed arrow with tail",
            "icon": "&#10518;",
            "value": "10518",
            "group": "arrows",
        },
        {
            "label": "right two-headed arrow with tail with vertical stroke",
            "icon": "&#10519;",
            "value": "10519",
            "group": "arrows",
        },
        {
            "label": "right two-headed arrow with tail with double vertical stroke",
            "icon": "&#10520;",
            "value": "10520",
            "group": "arrows",
        },
        {
            "label": "left arrow-tail",
            "icon": "&#10521;",
            "value": "10521",
            "group": "arrows",
        },
        {
            "label": "right arrow-tail",
            "icon": "&#10522;",
            "value": "10522",
            "group": "arrows",
        },
        {
            "label": "left double arrow-tail",
            "icon": "&#10523;",
            "value": "10523",
            "group": "arrows",
        },
        {
            "label": "right double arrow-tail",
            "icon": "&#10524;",
            "value": "10524",
            "group": "arrows",
        },
        {
            "label": "left arrow to black diamond",
            "icon": "&#10525;",
            "value": "10525",
            "group": "arrows",
        },
        {
            "label": "right arrow to black diamond",
            "icon": "&#10526;",
            "value": "10526",
            "group": "arrows",
        },
        {
            "label": "left arrow from bar to black diamond",
            "icon": "&#10527;",
            "value": "10527",
            "group": "arrows",
        },
        {
            "label": "right arrow from bar to black diamond",
            "icon": "&#10528;",
            "value": "10528",
            "group": "arrows",
        },
        {
            "label": "north west and south east arrow",
            "icon": "&#10529;",
            "value": "10529",
            "group": "arrows",
        },
        {
            "label": "north east and south west arrow",
            "icon": "&#10530;",
            "value": "10530",
            "group": "arrows",
        },
        {
            "label": "north west arrow with hook",
            "icon": "&#10531;",
            "value": "10531",
            "group": "arrows",
        },
        {
            "label": "north east arrow with hook",
            "icon": "&#10532;",
            "value": "10532",
            "group": "arrows",
        },
        {
            "label": "south east arrow with hook",
            "icon": "&#10533;",
            "value": "10533",
            "group": "arrows",
        },
        {
            "label": "south west arrow with hook",
            "icon": "&#10534;",
            "value": "10534",
            "group": "arrows",
        },
        {
            "label": "north west arrow and north east arrow",
            "icon": "&#10535;",
            "value": "10535",
            "group": "arrows",
        },
        {
            "label": "north east arrow and south east arrow",
            "icon": "&#10536;",
            "value": "10536",
            "group": "arrows",
        },
        {
            "label": "south east arrow and south west arrow",
            "icon": "&#10537;",
            "value": "10537",
            "group": "arrows",
        },
        {
            "label": "south west arrow and north west arrow",
            "icon": "&#10538;",
            "value": "10538",
            "group": "arrows",
        },
        {
            "label": "rising diagonal crossing falling diagonal",
            "icon": "&#10539;",
            "value": "10539",
            "group": "arrows",
        },
        {
            "label": "falling diagonal crossing rising diagonal",
            "icon": "&#10540;",
            "value": "10540",
            "group": "arrows",
        },
        {
            "label": "south east arrow crossing north east arrow",
            "icon": "&#10541;",
            "value": "10541",
            "group": "arrows",
        },
        {
            "label": "north east arrow crossing south east arrow",
            "icon": "&#10542;",
            "value": "10542",
            "group": "arrows",
        },
        {
            "label": "falling diagonal crossing north east arrow",
            "icon": "&#10543;",
            "value": "10543",
            "group": "arrows",
        },
        {
            "label": "rising diagonal crossing south east arrow",
            "icon": "&#10544;",
            "value": "10544",
            "group": "arrows",
        },
        {
            "label": "north east arrow crossing north west arrow",
            "icon": "&#10545;",
            "value": "10545",
            "group": "arrows",
        },
        {
            "label": "north west arrow crossing north east arrow",
            "icon": "&#10546;",
            "value": "10546",
            "group": "arrows",
        },
        {
            "label": "wave arrow pointing directly right",
            "icon": "&#10547;",
            "value": "10547",
            "group": "arrows",
        },
        {
            "label": "arrow pointing right then curving up",
            "icon": "&#10548;",
            "value": "10548",
            "group": "arrows",
        },
        {
            "label": "arrow pointing right then curving down",
            "icon": "&#10549;",
            "value": "10549",
            "group": "arrows",
        },
        {
            "label": "arrow pointing down then curving left",
            "icon": "&#10550;",
            "value": "10550",
            "group": "arrows",
        },
        {
            "label": "arrow pointing down then curving right",
            "icon": "&#10551;",
            "value": "10551",
            "group": "arrows",
        },
        {
            "label": "right-side arc clockwise arrow",
            "icon": "&#10552;",
            "value": "10552",
            "group": "arrows",
        },
        {
            "label": "left-side arc anticlockwise arrow",
            "icon": "&#10553;",
            "value": "10553",
            "group": "arrows",
        },
        {
            "label": "top arc anticlockwise arrow",
            "icon": "&#10554;",
            "value": "10554",
            "group": "arrows",
        },
        {
            "label": "bottom arc anticlockwise arrow",
            "icon": "&#10555;",
            "value": "10555",
            "group": "arrows",
        },
        {
            "label": "top arc clockwise arrow with minus",
            "icon": "&#10556;",
            "value": "10556",
            "group": "arrows",
        },
        {
            "label": "top arc anticlockwise arrow with plus",
            "icon": "&#10557;",
            "value": "10557",
            "group": "arrows",
        },
        {
            "label": "lower right semicircular clockwise arrow",
            "icon": "&#10558;",
            "value": "10558",
            "group": "arrows",
        },
        {
            "label": "lower left semicircular anticlockwise arrow",
            "icon": "&#10559;",
            "value": "10559",
            "group": "arrows",
        },
        {
            "label": "anticlockwise closed circle arrow",
            "icon": "&#10560;",
            "value": "10560",
            "group": "arrows",
        },
        {
            "label": "clockwise closed circle arrow",
            "icon": "&#10561;",
            "value": "10561",
            "group": "arrows",
        },
        {
            "label": "right arrow above short left arrow",
            "icon": "&#10562;",
            "value": "10562",
            "group": "arrows",
        },
        {
            "label": "left arrow above short right arrow",
            "icon": "&#10563;",
            "value": "10563",
            "group": "arrows",
        },
        {
            "label": "short right arrow above left arrow",
            "icon": "&#10564;",
            "value": "10564",
            "group": "arrows",
        },
        {
            "label": "right arrow with plus below",
            "icon": "&#10565;",
            "value": "10565",
            "group": "arrows",
        },
        {
            "label": "left arrow with plus below",
            "icon": "&#10566;",
            "value": "10566",
            "group": "arrows",
        },
        {
            "label": "right arrow through x",
            "icon": "&#10567;",
            "value": "10567",
            "group": "arrows",
        },
        {
            "label": "left right arrow through small circle",
            "icon": "&#10568;",
            "value": "10568",
            "group": "arrows",
        },
        {
            "label": "up two-headed arrow from small circle",
            "icon": "&#10569;",
            "value": "10569",
            "group": "arrows",
        },
        {
            "label": "left barb up right barb down harpoon",
            "icon": "&#10570;",
            "value": "10570",
            "group": "arrows",
        },
        {
            "label": "left barb down right barb up harpoon",
            "icon": "&#10571;",
            "value": "10571",
            "group": "arrows",
        },
        {
            "label": "up barb right down barb left harpoon",
            "icon": "&#10572;",
            "value": "10572",
            "group": "arrows",
        },
        {
            "label": "up barb left down barb right harpoon",
            "icon": "&#10573;",
            "value": "10573",
            "group": "arrows",
        },
        {
            "label": "left barb up right barb up harpoon",
            "icon": "&#10574;",
            "value": "10574",
            "group": "arrows",
        },
        {
            "label": "up barb right down barb right harpoon",
            "icon": "&#10575;",
            "value": "10575",
            "group": "arrows",
        },
        {
            "label": "left barb down right barb down harpoon",
            "icon": "&#10576;",
            "value": "10576",
            "group": "arrows",
        },
        {
            "label": "up barb left down barb left harpoon",
            "icon": "&#10577;",
            "value": "10577",
            "group": "arrows",
        },
        {
            "label": "left harpoon with barb up to bar",
            "icon": "&#10578;",
            "value": "10578",
            "group": "arrows",
        },
        {
            "label": "right harpoon with barb up to bar",
            "icon": "&#10579;",
            "value": "10579",
            "group": "arrows",
        },
        {
            "label": "up harpoon with barb right to bar",
            "icon": "&#10580;",
            "value": "10580",
            "group": "arrows",
        },
        {
            "label": "down harpoon with barb right to bar",
            "icon": "&#10581;",
            "value": "10581",
            "group": "arrows",
        },
        {
            "label": "left harpoon with barb down to bar",
            "icon": "&#10582;",
            "value": "10582",
            "group": "arrows",
        },
        {
            "label": "right harpoon with barb down to bar",
            "icon": "&#10583;",
            "value": "10583",
            "group": "arrows",
        },
        {
            "label": "up harpoon with barb left to bar",
            "icon": "&#10584;",
            "value": "10584",
            "group": "arrows",
        },
        {
            "label": "down harpoon with barb left to bar",
            "icon": "&#10585;",
            "value": "10585",
            "group": "arrows",
        },
        {
            "label": "left harpoon with barb up from bar",
            "icon": "&#10586;",
            "value": "10586",
            "group": "arrows",
        },
        {
            "label": "right harpoon with barb up from bar",
            "icon": "&#10587;",
            "value": "10587",
            "group": "arrows",
        },
        {
            "label": "up harpoon with barb right from bar",
            "icon": "&#10588;",
            "value": "10588",
            "group": "arrows",
        },
        {
            "label": "down harpoon with barb right from bar",
            "icon": "&#10589;",
            "value": "10589",
            "group": "arrows",
        },
        {
            "label": "left harpoon with barb down from bar",
            "icon": "&#10590;",
            "value": "10590",
            "group": "arrows",
        },
        {
            "label": "right harpoon with barb down from bar",
            "icon": "&#10591;",
            "value": "10591",
            "group": "arrows",
        },
        {
            "label": "up harpoon with barb left from bar",
            "icon": "&#10592;",
            "value": "10592",
            "group": "arrows",
        },
        {
            "label": "down harpoon with barb left from bar",
            "icon": "&#10593;",
            "value": "10593",
            "group": "arrows",
        },
        {
            "label": "left harpoon with barb up above left harpoon with barb down",
            "icon": "&#10594;",
            "value": "10594",
            "group": "arrows",
        },
        {
            "label": "up harpoon with barb left beside up harpoon with barb right",
            "icon": "&#10595;",
            "value": "10595",
            "group": "arrows",
        },
        {
            "label": "right harpoon with barb up above right harpoon with barb down",
            "icon": "&#10596;",
            "value": "10596",
            "group": "arrows",
        },
        {
            "label": "down harpoon with barb left beside down harpoon with barb right",
            "icon": "&#10597;",
            "value": "10597",
            "group": "arrows",
        },
        {
            "label": "left harpoon with barb up above right harpoon with barb up",
            "icon": "&#10598;",
            "value": "10598",
            "group": "arrows",
        },
        {
            "label": "left harpoon with barb down above right harpoon with barb down",
            "icon": "&#10599;",
            "value": "10599",
            "group": "arrows",
        },
        {
            "label": "right harpoon with barb up above left harpoon with barb up",
            "icon": "&#10600;",
            "value": "10600",
            "group": "arrows",
        },
        {
            "label": "right harpoon with barb down above left harpoon with barb down",
            "icon": "&#10601;",
            "value": "10601",
            "group": "arrows",
        },
        {
            "label": "left harpoon with barb up above long dash",
            "icon": "&#10602;",
            "value": "10602",
            "group": "arrows",
        },
        {
            "label": "left harpoon with barb down below long dash",
            "icon": "&#10603;",
            "value": "10603",
            "group": "arrows",
        },
        {
            "label": "right harpoon with barb up above long dash",
            "icon": "&#10604;",
            "value": "10604",
            "group": "arrows",
        },
        {
            "label": "right harpoon with barb down below long dash",
            "icon": "&#10605;",
            "value": "10605",
            "group": "arrows",
        },
        {
            "label": "up harpoon with barb left beside down harpoon with barb right",
            "icon": "&#10606;",
            "value": "10606",
            "group": "arrows",
        },
        {
            "label": "down harpoon with barb left beside up harpoon with barb right",
            "icon": "&#10607;",
            "value": "10607",
            "group": "arrows",
        },
        {
            "label": "right double arrow with rounded head",
            "icon": "&#10608;",
            "value": "10608",
            "group": "arrows",
        },
        {
            "label": "equals sign above right arrow",
            "icon": "&#10609;",
            "value": "10609",
            "group": "arrows",
        },
        {
            "label": "tilde operator above right arrow",
            "icon": "&#10610;",
            "value": "10610",
            "group": "arrows",
        },
        {
            "label": "left arrow above tilde operator",
            "icon": "&#10611;",
            "value": "10611",
            "group": "arrows",
        },
        {
            "label": "right arrow above tilde operator",
            "icon": "&#10612;",
            "value": "10612",
            "group": "arrows",
        },
        {
            "label": "right arrow above almost equal to",
            "icon": "&#10613;",
            "value": "10613",
            "group": "arrows",
        },
        {
            "label": "less-than above left arrow",
            "icon": "&#10614;",
            "value": "10614",
            "group": "arrows",
        },
        {
            "label": "left arrow through less-than",
            "icon": "&#10615;",
            "value": "10615",
            "group": "arrows",
        },
        {
            "label": "greater-than above right arrow",
            "icon": "&#10616;",
            "value": "10616",
            "group": "arrows",
        },
        {
            "label": "subset above right arrow",
            "icon": "&#10617;",
            "value": "10617",
            "group": "arrows",
        },
        {
            "label": "left arrow through subset",
            "icon": "&#10618;",
            "value": "10618",
            "group": "arrows",
        },
        {
            "label": "superset above left arrow",
            "icon": "&#10619;",
            "value": "10619",
            "group": "arrows",
        },
        {
            "label": "left fish tail",
            "icon": "&#10620;",
            "value": "10620",
            "group": "arrows",
        },
        {
            "label": "right fish tail",
            "icon": "&#10621;",
            "value": "10621",
            "group": "arrows",
        },
        {
            "label": "up fish tail",
            "icon": "&#10622;",
            "value": "10622",
            "group": "arrows",
        },
        {
            "label": "down fish tail",
            "icon": "&#10623;",
            "value": "10623",
            "group": "arrows",
        },
        {
            "label": "heavy wide-headed right arrow",
            "icon": "&#10132;",
            "value": "10132",
            "group": "arrows",
        },
        {
            "label": "heavy south east arrow",
            "icon": "&#10136;",
            "value": "10136",
            "group": "arrows",
        },
        {
            "label": "heavy right arrow",
            "icon": "&#10137;",
            "value": "10137",
            "group": "arrows",
        },
        {
            "label": "heavy north east arrow",
            "icon": "&#10138;",
            "value": "10138",
            "group": "arrows",
        },
        {
            "label": "drafting point right arrow",
            "icon": "&#10139;",
            "value": "10139",
            "group": "arrows",
        },
        {
            "label": "heavy round-tipped right arrow",
            "icon": "&#10140;",
            "value": "10140",
            "group": "arrows",
        },
        {
            "label": "triangle-headed right arrow",
            "icon": "&#10141;",
            "value": "10141",
            "group": "arrows",
        },
        {
            "label": "heavy triangle-headed right arrow",
            "icon": "&#10142;",
            "value": "10142",
            "group": "arrows",
        },
        {
            "label": "dashed triangle-headed right arrow",
            "icon": "&#10143;",
            "value": "10143",
            "group": "arrows",
        },
        {
            "label": "heavy dashed triangle-headed right arrow",
            "icon": "&#10144;",
            "value": "10144",
            "group": "arrows",
        },
        {
            "label": "black right arrow",
            "icon": "&#10145;",
            "value": "10145",
            "group": "arrows",
        },
        {
            "label": "three-d top-lighted right arrowhead",
            "icon": "&#10146;",
            "value": "10146",
            "group": "arrows",
        },
        {
            "label": "three-d bottom-lighted right arrowhead",
            "icon": "&#10147;",
            "value": "10147",
            "group": "arrows",
        },
        {
            "label": "black right arrowhead",
            "icon": "&#10148;",
            "value": "10148",
            "group": "arrows",
        },
        {
            "label": "heavy black curved down and right arrow",
            "icon": "&#10149;",
            "value": "10149",
            "group": "arrows",
        },
        {
            "label": "heavy black curved up and right arrow",
            "icon": "&#10150;",
            "value": "10150",
            "group": "arrows",
        },
        {
            "label": "squat black right arrow",
            "icon": "&#10151;",
            "value": "10151",
            "group": "arrows",
        },
        {
            "label": "heavy concave-pointed black right arrow",
            "icon": "&#10152;",
            "value": "10152",
            "group": "arrows",
        },
        {
            "label": "right-shaded white right arrow",
            "icon": "&#10153;",
            "value": "10153",
            "group": "arrows",
        },
        {
            "label": "left-shaded white right arrow",
            "icon": "&#10154;",
            "value": "10154",
            "group": "arrows",
        },
        {
            "label": "back-tilted shadowed white right arrow",
            "icon": "&#10155;",
            "value": "10155",
            "group": "arrows",
        },
        {
            "label": "front-tilted shadowed white right arrow",
            "icon": "&#10156;",
            "value": "10156",
            "group": "arrows",
        },
        {
            "label": "heavy lower right-shadowed white right arrow",
            "icon": "&#10157;",
            "value": "10157",
            "group": "arrows",
        },
        {
            "label": "heavy upper right-shadowed white right arrow",
            "icon": "&#10158;",
            "value": "10158",
            "group": "arrows",
        },
        {
            "label": "notched lower right-shadowed white right arrow",
            "icon": "&#10159;",
            "value": "10159",
            "group": "arrows",
        },
        {
            "label": "notched upper right-shadowed white right arrow",
            "icon": "&#10161;",
            "value": "10161",
            "group": "arrows",
        },
        {
            "label": "circled heavy white right arrow",
            "icon": "&#10162;",
            "value": "10162",
            "group": "arrows",
        },
        {
            "label": "white-feathered right arrow",
            "icon": "&#10163;",
            "value": "10163",
            "group": "arrows",
        },
        {
            "label": "black-feathered south east arrow",
            "icon": "&#10164;",
            "value": "10164",
            "group": "arrows",
        },
        {
            "label": "black-feathered right arrow",
            "icon": "&#10165;",
            "value": "10165",
            "group": "arrows",
        },
        {
            "label": "black-feathered north east arrow",
            "icon": "&#10166;",
            "value": "10166",
            "group": "arrows",
        },
        {
            "label": "heavy black-feathered south east arrow",
            "icon": "&#10167;",
            "value": "10167",
            "group": "arrows",
        },
        {
            "label": "heavy black-feathered right arrow",
            "icon": "&#10168;",
            "value": "10168",
            "group": "arrows",
        },
        {
            "label": "heavy black-feathered north east arrow",
            "icon": "&#10169;",
            "value": "10169",
            "group": "arrows",
        },
        {
            "label": "teardrop-barbed right arrow",
            "icon": "&#10170;",
            "value": "10170",
            "group": "arrows",
        },
        {
            "label": "heavy teardrop-shanked right arrow",
            "icon": "&#10171;",
            "value": "10171",
            "group": "arrows",
        },
        {
            "label": "wedge-tailed right arrow",
            "icon": "&#10172;",
            "value": "10172",
            "group": "arrows",
        },
        {
            "label": "heavy wedge-tailed right arrow",
            "icon": "&#10173;",
            "value": "10173",
            "group": "arrows",
        },
        {
            "label": "open-outlined right arrow",
            "icon": "&#10174;",
            "value": "10174",
            "group": "arrows",
        },
        {
            "label": "dollar sign",
            "icon": "&#36;",
            "value": "36",
            "group": "currency",
        },
        {
            "label": "cent sign",
            "icon": "&#162;",
            "value": "162",
            "group": "currency",
        },
        {
            "label": "pound sign",
            "icon": "&#163;",
            "value": "163",
            "group": "currency",
        },
        {
            "label": "euro sign",
            "icon": "&#8364;",
            "value": "8364",
            "group": "currency",
        },
        {
            "label": "yen sign",
            "icon": "&#165;",
            "value": "165",
            "group": "currency",
        },
        {
            "label": "indian rupee sign",
            "icon": "&#8377;",
            "value": "8377",
            "group": "currency",
        },
        {
            "label": "ruble sign",
            "icon": "&#8381;",
            "value": "8381",
            "group": "currency",
        },
        {
            "label": "yuan character, in china",
            "icon": "&#20803;",
            "value": "20803",
            "group": "currency",
        },
        {
            "label": "currency sign",
            "icon": "&#164;",
            "value": "164",
            "group": "currency",
        },
        {
            "label": "euro-currency sign",
            "icon": "&#8352;",
            "value": "8352",
            "group": "currency",
        },
        {
            "label": "colon sign",
            "icon": "&#8353;",
            "value": "8353",
            "group": "currency",
        },
        {
            "label": "cruzeiro sign",
            "icon": "&#8354;",
            "value": "8354",
            "group": "currency",
        },
        {
            "label": "french franc sign",
            "icon": "&#8355;",
            "value": "8355",
            "group": "currency",
        },
        {
            "label": "lira sign",
            "icon": "&#8356;",
            "value": "8356",
            "group": "currency",
        },
        {
            "label": "mill sign",
            "icon": "&#8357;",
            "value": "8357",
            "group": "currency",
        },
        {
            "label": "naira sign",
            "icon": "&#8358;",
            "value": "8358",
            "group": "currency",
        },
        {
            "label": "peseta sign",
            "icon": "&#8359;",
            "value": "8359",
            "group": "currency",
        },
        {
            "label": "rupee sign",
            "icon": "&#8360;",
            "value": "8360",
            "group": "currency",
        },
        {
            "label": "won sign",
            "icon": "&#8361;",
            "value": "8361",
            "group": "currency",
        },
        {
            "label": "new sheqel sign",
            "icon": "&#8362;",
            "value": "8362",
            "group": "currency",
        },
        {
            "label": "dong sign",
            "icon": "&#8363;",
            "value": "8363",
            "group": "currency",
        },
        {
            "label": "kip sign",
            "icon": "&#8365;",
            "value": "8365",
            "group": "currency",
        },
        {
            "label": "tugrik sign",
            "icon": "&#8366;",
            "value": "8366",
            "group": "currency",
        },
        {
            "label": "drachma sign",
            "icon": "&#8367;",
            "value": "8367",
            "group": "currency",
        },
        {
            "label": "german penny symbol",
            "icon": "&#8368;",
            "value": "8368",
            "group": "currency",
        },
        {
            "label": "peso sign",
            "icon": "&#8369;",
            "value": "8369",
            "group": "currency",
        },
        {
            "label": "guarani sign",
            "icon": "&#8370;",
            "value": "8370",
            "group": "currency",
        },
        {
            "label": "austral sign",
            "icon": "&#8371;",
            "value": "8371",
            "group": "currency",
        },
        {
            "label": "hryvnia sign",
            "icon": "&#8372;",
            "value": "8372",
            "group": "currency",
        },
        {
            "label": "cedi sign",
            "icon": "&#8373;",
            "value": "8373",
            "group": "currency",
        },
        {
            "label": "livre tournois sign",
            "icon": "&#8374;",
            "value": "8374",
            "group": "currency",
        },
        {
            "label": "tenge sign",
            "icon": "&#8376;",
            "value": "8376",
            "group": "currency",
        },
        {
            "label": "turkish lira sign",
            "icon": "&#8378;",
            "value": "8378",
            "group": "currency",
        },
        {
            "label": "manat sign",
            "icon": "&#8380;",
            "value": "8380",
            "group": "currency",
        },
        {
            "label": "bengali rupee mark",
            "icon": "&#2546;",
            "value": "2546",
            "group": "currency",
        },
        {
            "label": "bengali rupee sign",
            "icon": "&#2547;",
            "value": "2547",
            "group": "currency",
        },
        {
            "label": "gujarati rupee sign",
            "icon": "&#2801;",
            "value": "2801",
            "group": "currency",
        },
        {
            "label": "tamil rupee sign",
            "icon": "&#3065;",
            "value": "3065",
            "group": "currency",
        },
        {
            "label": "thai currency symbol baht",
            "icon": "&#3647;",
            "value": "3647",
            "group": "currency",
        },
        {
            "label": "khmer currency symbol riel",
            "icon": "&#6107;",
            "value": "6107",
            "group": "currency",
        },
        {
            "label": "square yuan",
            "icon": "&#13136;",
            "value": "13136",
            "group": "currency",
        },
        {
            "label": "yen character",
            "icon": "&#20870;",
            "value": "20870",
            "group": "currency",
        },
        {
            "label": "yen/yuan character variant one",
            "icon": "&#22278;",
            "value": "22278",
            "group": "currency",
        },
        {
            "label": "yen/yuan character variant two",
            "icon": "&#22286;",
            "value": "22286",
            "group": "currency",
        },
        {
            "label": "yuan character, in hong kong and taiwan",
            "icon": "&#22291;",
            "value": "22291",
            "group": "currency",
        },
        {
            "label": "yen/yuan character variant three",
            "icon": "&#22300;",
            "value": "22300",
            "group": "currency",
        },
        {
            "label": "won character",
            "icon": "&#50896;",
            "value": "50896",
            "group": "currency",
        },
        {
            "label": "rial sign",
            "icon": "&#65020;",
            "value": "65020",
            "group": "currency",
        },
        {
            "label": "fullwidth dollar sign",
            "icon": "&#65284;",
            "value": "65284",
            "group": "currency",
        },
        {
            "label": "fullwidth cent sign",
            "icon": "&#65504;",
            "value": "65504",
            "group": "currency",
        },
        {
            "label": "fullwidth pound sign",
            "icon": "&#65505;",
            "value": "65505",
            "group": "currency",
        },
        {
            "label": "fullwidth yen sign",
            "icon": "&#65509;",
            "value": "65509",
            "group": "currency",
        },
        {
            "label": "fullwidth won sign",
            "icon": "&#65510;",
            "icon": "&amp;#65510",
            "group": "currency",
        },
        {
            "label": "uppercase a",
            "icon": "&#65;",
            "value": "65",
            "group": "letters",
        },
        {
            "label": "uppercase b",
            "icon": "&#66;",
            "value": "66",
            "group": "letters",
        },
        {
            "label": "uppercase c",
            "icon": "&#67;",
            "value": "67",
            "group": "letters",
        },
        {
            "label": "uppercase d",
            "icon": "&#68;",
            "value": "68",
            "group": "letters",
        },
        {
            "label": "uppercase e",
            "icon": "&#69;",
            "value": "69",
            "group": "letters",
        },
        {
            "label": "uppercase f",
            "icon": "&#70;",
            "value": "70",
            "group": "letters",
        },
        {
            "label": "uppercase g",
            "icon": "&#71;",
            "value": "71",
            "group": "letters",
        },
        {
            "label": "uppercase h",
            "icon": "&#72;",
            "value": "72",
            "group": "letters",
        },
        {
            "label": "uppercase i",
            "icon": "&#73;",
            "value": "73",
            "group": "letters",
        },
        {
            "label": "uppercase j",
            "icon": "&#74;",
            "value": "74",
            "group": "letters",
        },
        {
            "label": "uppercase k",
            "icon": "&#75;",
            "value": "75",
            "group": "letters",
        },
        {
            "label": "uppercase l",
            "icon": "&#76;",
            "value": "76",
            "group": "letters",
        },
        {
            "label": "uppercase m",
            "icon": "&#77;",
            "value": "77",
            "group": "letters",
        },
        {
            "label": "uppercase n",
            "icon": "&#78;",
            "value": "78",
            "group": "letters",
        },
        {
            "label": "uppercase o",
            "icon": "&#79;",
            "value": "79",
            "group": "letters",
        },
        {
            "label": "uppercase p",
            "icon": "&#80;",
            "value": "80",
            "group": "letters",
        },
        {
            "label": "uppercase q",
            "icon": "&#81;",
            "value": "81",
            "group": "letters",
        },
        {
            "label": "uppercase r",
            "icon": "&#82;",
            "value": "82",
            "group": "letters",
        },
        {
            "label": "uppercase s",
            "icon": "&#83;",
            "value": "83",
            "group": "letters",
        },
        {
            "label": "uppercase t",
            "icon": "&#84;",
            "value": "84",
            "group": "letters",
        },
        {
            "label": "uppercase u",
            "icon": "&#85;",
            "value": "85",
            "group": "letters",
        },
        {
            "label": "uppercase v",
            "icon": "&#86;",
            "value": "86",
            "group": "letters",
        },
        {
            "label": "uppercase w",
            "icon": "&#87;",
            "value": "87",
            "group": "letters",
        },
        {
            "label": "uppercase x",
            "icon": "&#88;",
            "value": "88",
            "group": "letters",
        },
        {
            "label": "uppercase y",
            "icon": "&#89;",
            "value": "89",
            "group": "letters",
        },
        {
            "label": "uppercase z",
            "icon": "&#90;",
            "value": "90",
            "group": "letters",
        },
        {
            "label": "lowercase a",
            "icon": "&#97;",
            "value": "97",
            "group": "letters",
        },
        {
            "label": "lowercase b",
            "icon": "&#98;",
            "value": "98",
            "group": "letters",
        },
        {
            "label": "lowercase c",
            "icon": "&#99;",
            "value": "99",
            "group": "letters",
        },
        {
            "label": "lowercase d",
            "icon": "&#100;",
            "value": "100",
            "group": "letters",
        },
        {
            "label": "lowercase e",
            "icon": "&#101;",
            "value": "101",
            "group": "letters",
        },
        {
            "label": "lowercase f",
            "icon": "&#102;",
            "value": "102",
            "group": "letters",
        },
        {
            "label": "lowercase g",
            "icon": "&#103;",
            "value": "103",
            "group": "letters",
        },
        {
            "label": "lowercase h",
            "icon": "&#104;",
            "value": "104",
            "group": "letters",
        },
        {
            "label": "lowercase i",
            "icon": "&#105;",
            "value": "105",
            "group": "letters",
        },
        {
            "label": "lowercase j",
            "icon": "&#106;",
            "value": "106",
            "group": "letters",
        },
        {
            "label": "lowercase k",
            "icon": "&#107;",
            "value": "107",
            "group": "letters",
        },
        {
            "label": "lowercase l",
            "icon": "&#108;",
            "value": "108",
            "group": "letters",
        },
        {
            "label": "lowercase m",
            "icon": "&#109;",
            "value": "109",
            "group": "letters",
        },
        {
            "label": "lowercase n",
            "icon": "&#110;",
            "value": "110",
            "group": "letters",
        },
        {
            "label": "lowercase o",
            "icon": "&#111;",
            "value": "111",
            "group": "letters",
        },
        {
            "label": "lowercase p",
            "icon": "&#112;",
            "value": "112",
            "group": "letters",
        },
        {
            "label": "lowercase q",
            "icon": "&#113;",
            "value": "113",
            "group": "letters",
        },
        {
            "label": "lowercase r",
            "icon": "&#114;",
            "value": "114",
            "group": "letters",
        },
        {
            "label": "lowercase s",
            "icon": "&#115;",
            "value": "115",
            "group": "letters",
        },
        {
            "label": "lowercase t",
            "icon": "&#116;",
            "value": "116",
            "group": "letters",
        },
        {
            "label": "lowercase u",
            "icon": "&#117;",
            "value": "117",
            "group": "letters",
        },
        {
            "label": "lowercase v",
            "icon": "&#118;",
            "value": "118",
            "group": "letters",
        },
        {
            "label": "lowercase w",
            "icon": "&#119;",
            "value": "119",
            "group": "letters",
        },
        {
            "label": "lowercase x",
            "icon": "&#120;",
            "value": "120",
            "group": "letters",
        },
        {
            "label": "lowercase y",
            "icon": "&#121;",
            "value": "121",
            "group": "letters",
        },
        {
            "label": "lowercase z",
            "icon": "&#122;",
            "value": "122",
            "group": "letters",
        },
        {
            "label": "uppercase a with grave",
            "icon": "&#192;",
            "value": "192",
            "group": "letters",
        },
        {
            "label": "uppercase a with acute",
            "icon": "&#193;",
            "value": "193",
            "group": "letters",
        },
        {
            "label": "uppercase a with circumflex",
            "icon": "&#194;",
            "value": "194",
            "group": "letters",
        },
        {
            "label": "uppercase a with tilde",
            "icon": "&#195;",
            "value": "195",
            "group": "letters",
        },
        {
            "label": "uppercase a with umlaut",
            "icon": "&#196;",
            "value": "196",
            "group": "letters",
        },
        {
            "label": "uppercase a with ring",
            "icon": "&#197;",
            "value": "197",
            "group": "letters",
        },
        {
            "label": "uppercase ae",
            "icon": "&#198;",
            "value": "198",
            "group": "letters",
        },
        {
            "label": "uppercase c with cedilla",
            "icon": "&#199;",
            "value": "199",
            "group": "letters",
        },
        {
            "label": "uppercase e with grave",
            "icon": "&#200;",
            "value": "200",
            "group": "letters",
        },
        {
            "label": "uppercase e with acute",
            "icon": "&#201;",
            "value": "201",
            "group": "letters",
        },
        {
            "label": "uppercase e with circumflex",
            "icon": "&#202;",
            "value": "202",
            "group": "letters",
        },
        {
            "label": "uppercase e with umlaut",
            "icon": "&#203;",
            "value": "203",
            "group": "letters",
        },
        {
            "label": "uppercase l with grave",
            "icon": "&#204;",
            "value": "204",
            "group": "letters",
        },
        {
            "label": "uppercase l with acute",
            "icon": "&#205;",
            "value": "205",
            "group": "letters",
        },
        {
            "label": "uppercase l with circumflex",
            "icon": "&#206;",
            "value": "206",
            "group": "letters",
        },
        {
            "label": "uppercase l with umlaut",
            "icon": "&#207;",
            "value": "207",
            "group": "letters",
        },
        {
            "label": "uppercase eth",
            "icon": "&#208;",
            "value": "208",
            "group": "letters",
        },
        {
            "label": "uppercase n with tilde",
            "icon": "&#209;",
            "value": "209",
            "group": "letters",
        },
        {
            "label": "uppercase o with grave",
            "icon": "&#210;",
            "value": "210",
            "group": "letters",
        },
        {
            "label": "uppercase o with acute",
            "icon": "&#211;",
            "value": "211",
            "group": "letters",
        },
        {
            "label": "uppercase o with circumflex",
            "icon": "&#212;",
            "value": "212",
            "group": "letters",
        },
        {
            "label": "uppercase o with tilde",
            "icon": "&#213;",
            "value": "213",
            "group": "letters",
        },
        {
            "label": "uppercase o with umlaut",
            "icon": "&#214;",
            "value": "214",
            "group": "letters",
        },
        {
            "label": "uppercase o with slash",
            "icon": "&#216;",
            "value": "216",
            "group": "letters",
        },
        {
            "label": "uppercase u with grave",
            "icon": "&#217;",
            "value": "217",
            "group": "letters",
        },
        {
            "label": "uppercase u with acute",
            "icon": "&#218;",
            "value": "218",
            "group": "letters",
        },
        {
            "label": "uppercase u with circumflex",
            "icon": "&#219;",
            "value": "219",
            "group": "letters",
        },
        {
            "label": "uppercase u with umlaut",
            "icon": "&#220;",
            "value": "220",
            "group": "letters",
        },
        {
            "label": "uppercase y with acute",
            "icon": "&#221;",
            "value": "221",
            "group": "letters",
        },
        {
            "label": "uppercase thorn",
            "icon": "&#222;",
            "value": "222",
            "group": "letters",
        },
        {
            "label": "lowercase ess-zed",
            "icon": "&#223;",
            "value": "223",
            "group": "letters",
        },
        {
            "label": "lowercase a with grave",
            "icon": "&#224;",
            "value": "224",
            "group": "letters",
        },
        {
            "label": "lowercase a with acute",
            "icon": "&#225;",
            "value": "225",
            "group": "letters",
        },
        {
            "label": "lowercase a with circumflex",
            "icon": "&#226;",
            "value": "226",
            "group": "letters",
        },
        {
            "label": "lowercase a with tilde",
            "icon": "&#227;",
            "value": "227",
            "group": "letters",
        },
        {
            "label": "lowercase a with umlaut",
            "icon": "&#228;",
            "value": "228",
            "group": "letters",
        },
        {
            "label": "lowercase a with ring",
            "icon": "&#229;",
            "value": "229",
            "group": "letters",
        },
        {
            "label": "lowercase ae",
            "icon": "&#230;",
            "value": "230",
            "group": "letters",
        },
        {
            "label": "lowercase c with cedilla",
            "icon": "&#231;",
            "value": "231",
            "group": "letters",
        },
        {
            "label": "lowercase e with grave",
            "icon": "&#232;",
            "value": "232",
            "group": "letters",
        },
        {
            "label": "lowercase e with acute",
            "icon": "&#233;",
            "value": "233",
            "group": "letters",
        },
        {
            "label": "lowercase e with circumflex",
            "icon": "&#234;",
            "value": "234",
            "group": "letters",
        },
        {
            "label": "lowercase e with umlaut",
            "icon": "&#235;",
            "value": "235",
            "group": "letters",
        },
        {
            "label": "lowercase i with grave",
            "icon": "&#236;",
            "value": "236",
            "group": "letters",
        },
        {
            "label": "lowercase i with acute",
            "icon": "&#237;",
            "value": "237",
            "group": "letters",
        },
        {
            "label": "lowercase i with circumflex",
            "icon": "&#238;",
            "value": "238",
            "group": "letters",
        },
        {
            "label": "lowercase i with umlaut",
            "icon": "&#239;",
            "value": "239",
            "group": "letters",
        },
        {
            "label": "lowercase eth",
            "icon": "&#240;",
            "value": "240",
            "group": "letters",
        },
        {
            "label": "lowercase n with tilde",
            "icon": "&#241;",
            "value": "241",
            "group": "letters",
        },
        {
            "label": "lowercase o with grave",
            "icon": "&#242;",
            "value": "242",
            "group": "letters",
        },
        {
            "label": "lowercase o with acute",
            "icon": "&#243;",
            "value": "243",
            "group": "letters",
        },
        {
            "label": "lowercase o with circumflex",
            "icon": "&#244;",
            "value": "244",
            "group": "letters",
        },
        {
            "label": "lowercase o with tilde",
            "icon": "&#245;",
            "value": "245",
            "group": "letters",
        },
        {
            "label": "lowercase o with umlaut",
            "icon": "&#246;",
            "value": "246",
            "group": "letters",
        },
        {
            "label": "lowercase o with slash",
            "icon": "&#248;",
            "value": "248",
            "group": "letters",
        },
        {
            "label": "lowercase u with grave",
            "icon": "&#249;",
            "value": "249",
            "group": "letters",
        },
        {
            "label": "lowercase u with acute",
            "icon": "&#250;",
            "value": "250",
            "group": "letters",
        },
        {
            "label": "lowercase u with circumflex",
            "icon": "&#251;",
            "value": "251",
            "group": "letters",
        },
        {
            "label": "lowercase u with umlaut",
            "icon": "&#252;",
            "value": "252",
            "group": "letters",
        },
        {
            "label": "lowercase y with acute",
            "icon": "&#253;",
            "value": "253",
            "group": "letters",
        },
        {
            "label": "lowercase thorn",
            "icon": "&#254;",
            "value": "254",
            "group": "letters",
        },
        {
            "label": "lowercase y with umlaut",
            "icon": "&#255;",
            "value": "255",
            "group": "letters",
        },
        {
            "label": "uppercase a with macron",
            "icon": "&#256;",
            "value": "256",
            "group": "letters",
        },
        {
            "label": "lowercase a with macron",
            "icon": "&#257;",
            "value": "257",
            "group": "letters",
        },
        {
            "label": "uppercase a with breve",
            "icon": "&#258;",
            "value": "258",
            "group": "letters",
        },
        {
            "label": "lowercase a with breve",
            "icon": "&#259;",
            "value": "259",
            "group": "letters",
        },
        {
            "label": "uppercase a with ogonek",
            "icon": "&#260;",
            "value": "260",
            "group": "letters",
        },
        {
            "label": "lowercase a with ogonek",
            "icon": "&#261;",
            "value": "261",
            "group": "letters",
        },
        {
            "label": "uppercase c with acute",
            "icon": "&#262;",
            "value": "262",
            "group": "letters",
        },
        {
            "label": "lowercase c with acute",
            "icon": "&#263;",
            "value": "263",
            "group": "letters",
        },
        {
            "label": "uppercase c with circumflex",
            "icon": "&#264;",
            "value": "264",
            "group": "letters",
        },
        {
            "label": "lowercase c with circumflex",
            "icon": "&#265;",
            "value": "265",
            "group": "letters",
        },
        {
            "label": "uppercase c with dot above",
            "icon": "&#266;",
            "value": "266",
            "group": "letters",
        },
        {
            "label": "lowercase c with dot above",
            "icon": "&#267;",
            "value": "267",
            "group": "letters",
        },
        {
            "label": "uppercase c with caron",
            "icon": "&#268;",
            "value": "268",
            "group": "letters",
        },
        {
            "label": "lowercase c with caron",
            "icon": "&#269;",
            "value": "269",
            "group": "letters",
        },
        {
            "label": "uppercase d with caron",
            "icon": "&#270;",
            "value": "270",
            "group": "letters",
        },
        {
            "label": "lowercase d with caron",
            "icon": "&#271;",
            "value": "271",
            "group": "letters",
        },
        {
            "label": "uppercase d with stroke",
            "icon": "&#272;",
            "value": "272",
            "group": "letters",
        },
        {
            "label": "lowercase d with stroke",
            "icon": "&#273;",
            "value": "273",
            "group": "letters",
        },
        {
            "label": "uppercase e with macron",
            "icon": "&#274;",
            "value": "274",
            "group": "letters",
        },
        {
            "label": "lowercase e with macron",
            "icon": "&#275;",
            "value": "275",
            "group": "letters",
        },
        {
            "label": "uppercase e with breve",
            "icon": "&#276;",
            "value": "276",
            "group": "letters",
        },
        {
            "label": "lowercase e with breve",
            "icon": "&#277;",
            "value": "277",
            "group": "letters",
        },
        {
            "label": "uppercase e with dot above",
            "icon": "&#278;",
            "value": "278",
            "group": "letters",
        },
        {
            "label": "lowercase e with dot above",
            "icon": "&#279;",
            "value": "279",
            "group": "letters",
        },
        {
            "label": "uppercase e with ogonek",
            "icon": "&#280;",
            "value": "280",
            "group": "letters",
        },
        {
            "label": "lowercase e with ogonek",
            "icon": "&#281;",
            "value": "281",
            "group": "letters",
        },
        {
            "label": "uppercase e with caron",
            "icon": "&#282;",
            "value": "282",
            "group": "letters",
        },
        {
            "label": "lowercase e with caron",
            "icon": "&#283;",
            "value": "283",
            "group": "letters",
        },
        {
            "label": "uppercase g with circumflex",
            "icon": "&#284;",
            "value": "284",
            "group": "letters",
        },
        {
            "label": "lowercase g with circumflex",
            "icon": "&#285;",
            "value": "285",
            "group": "letters",
        },
        {
            "label": "uppercase g with breve",
            "icon": "&#286;",
            "value": "286",
            "group": "letters",
        },
        {
            "label": "lowercase g with breve",
            "icon": "&#287;",
            "value": "287",
            "group": "letters",
        },
        {
            "label": "uppercase g with dot above",
            "icon": "&#288;",
            "value": "288",
            "group": "letters",
        },
        {
            "label": "lowercase g with dot above",
            "icon": "&#289;",
            "value": "289",
            "group": "letters",
        },
        {
            "label": "uppercase g with cedilla",
            "icon": "&#290;",
            "value": "290",
            "group": "letters",
        },
        {
            "label": "lowercase g with cedilla",
            "icon": "&#291;",
            "value": "291",
            "group": "letters",
        },
        {
            "label": "uppercase h with circumflex",
            "icon": "&#292;",
            "value": "292",
            "group": "letters",
        },
        {
            "label": "lowercase h with circumflex",
            "icon": "&#293;",
            "value": "293",
            "group": "letters",
        },
        {
            "label": "uppercase h with stroke",
            "icon": "&#294;",
            "value": "294",
            "group": "letters",
        },
        {
            "label": "lowercase h with stroke",
            "icon": "&#295;",
            "value": "295",
            "group": "letters",
        },
        {
            "label": "uppercase i with tilde",
            "icon": "&#296;",
            "value": "296",
            "group": "letters",
        },
        {
            "label": "lowercase i with tilde",
            "icon": "&#297;",
            "value": "297",
            "group": "letters",
        },
        {
            "label": "uppercase i with macron",
            "icon": "&#298;",
            "value": "298",
            "group": "letters",
        },
        {
            "label": "lowercase i with macron",
            "icon": "&#299;",
            "value": "299",
            "group": "letters",
        },
        {
            "label": "uppercase i with breve",
            "icon": "&#300;",
            "value": "300",
            "group": "letters",
        },
        {
            "label": "lowercase i with breve",
            "icon": "&#301;",
            "value": "301",
            "group": "letters",
        },
        {
            "label": "uppercase i with ogonek",
            "icon": "&#302;",
            "value": "302",
            "group": "letters",
        },
        {
            "label": "lowercase i with ogonek",
            "icon": "&#303;",
            "value": "303",
            "group": "letters",
        },
        {
            "label": "uppercase i with dot above",
            "icon": "&#304;",
            "value": "304",
            "group": "letters",
        },
        {
            "label": "lowercase dotless i",
            "icon": "&#305;",
            "value": "305",
            "group": "letters",
        },
        {
            "label": "latin capital ligature ij",
            "icon": "&#306;",
            "value": "306",
            "group": "letters",
        },
        {
            "label": "latin small ligature ij",
            "icon": "&#307;",
            "value": "307",
            "group": "letters",
        },
        {
            "label": "uppercase j with circumflex",
            "icon": "&#308;",
            "value": "308",
            "group": "letters",
        },
        {
            "label": "lowercase j with circumflex",
            "icon": "&#309;",
            "value": "309",
            "group": "letters",
        },
        {
            "label": "uppercase k with cedilla",
            "icon": "&#310;",
            "value": "310",
            "group": "letters",
        },
        {
            "label": "lowercase k with cedilla",
            "icon": "&#311;",
            "value": "311",
            "group": "letters",
        },
        {
            "label": "lowercase kra",
            "icon": "&#312;",
            "value": "312",
            "group": "letters",
        },
        {
            "label": "uppercase l with acute",
            "icon": "&#313;",
            "value": "313",
            "group": "letters",
        },
        {
            "label": "lowercase l with acute",
            "icon": "&#314;",
            "value": "314",
            "group": "letters",
        },
        {
            "label": "uppercase l with cedilla",
            "icon": "&#315;",
            "value": "315",
            "group": "letters",
        },
        {
            "label": "lowercase l with cedilla",
            "icon": "&#316;",
            "value": "316",
            "group": "letters",
        },
        {
            "label": "uppercase l with caron",
            "icon": "&#317;",
            "value": "317",
            "group": "letters",
        },
        {
            "label": "lowercase l with caron",
            "icon": "&#318;",
            "value": "318",
            "group": "letters",
        },
        {
            "label": "uppercase l with middle dot",
            "icon": "&#319;",
            "value": "319",
            "group": "letters",
        },
        {
            "label": "lowercase l with middle dot",
            "icon": "&#320;",
            "value": "320",
            "group": "letters",
        },
        {
            "label": "uppercase l with stroke",
            "icon": "&#321;",
            "value": "321",
            "group": "letters",
        },
        {
            "label": "lowercase l with stroke",
            "icon": "&#322;",
            "value": "322",
            "group": "letters",
        },
        {
            "label": "uppercase n with acute",
            "icon": "&#323;",
            "value": "323",
            "group": "letters",
        },
        {
            "label": "lowercase n with acute",
            "icon": "&#324;",
            "value": "324",
            "group": "letters",
        },
        {
            "label": "uppercase n with cedilla",
            "icon": "&#325;",
            "value": "325",
            "group": "letters",
        },
        {
            "label": "lowercase n with cedilla",
            "icon": "&#326;",
            "value": "326",
            "group": "letters",
        },
        {
            "label": "uppercase n with caron",
            "icon": "&#327;",
            "value": "327",
            "group": "letters",
        },
        {
            "label": "lowercase n with caron",
            "icon": "&#328;",
            "value": "328",
            "group": "letters",
        },
        {
            "label": "lowercase n preceded by apostrophe",
            "icon": "&#329;",
            "value": "329",
            "group": "letters",
        },
        {
            "label": "uppercase eng",
            "icon": "&#330;",
            "value": "330",
            "group": "letters",
        },
        {
            "label": "lowercase eng",
            "icon": "&#331;",
            "value": "331",
            "group": "letters",
        },
        {
            "label": "uppercase o with macron",
            "icon": "&#332;",
            "value": "332",
            "group": "letters",
        },
        {
            "label": "lowercase o with macron",
            "icon": "&#333;",
            "value": "333",
            "group": "letters",
        },
        {
            "label": "uppercase o with breve",
            "icon": "&#334;",
            "value": "334",
            "group": "letters",
        },
        {
            "label": "lowercase o with breve",
            "icon": "&#335;",
            "value": "335",
            "group": "letters",
        },
        {
            "label": "uppercase o with double acute",
            "icon": "&#336;",
            "value": "336",
            "group": "letters",
        },
        {
            "label": "lowercase o with double acute",
            "icon": "&#337;",
            "value": "337",
            "group": "letters",
        },
        {
            "label": "uppercase ligature oe",
            "icon": "&#338;",
            "value": "338",
            "group": "letters",
        },
        {
            "label": "lowercase ligature oe",
            "icon": "&#339;",
            "value": "339",
            "group": "letters",
        },
        {
            "label": "uppercase r with acute",
            "icon": "&#340;",
            "value": "340",
            "group": "letters",
        },
        {
            "label": "lowercase r with acute",
            "icon": "&#341;",
            "value": "341",
            "group": "letters",
        },
        {
            "label": "uppercase r with cedilla",
            "icon": "&#342;",
            "value": "342",
            "group": "letters",
        },
        {
            "label": "lowercase r with cedilla",
            "icon": "&#343;",
            "value": "343",
            "group": "letters",
        },
        {
            "label": "uppercase r with caron",
            "icon": "&#344;",
            "value": "344",
            "group": "letters",
        },
        {
            "label": "lowercase r with caron",
            "icon": "&#345;",
            "value": "345",
            "group": "letters",
        },
        {
            "label": "uppercase s with acute",
            "icon": "&#346;",
            "value": "346",
            "group": "letters",
        },
        {
            "label": "lowercase s with acute",
            "icon": "&#347;",
            "value": "347",
            "group": "letters",
        },
        {
            "label": "uppercase s with circumflex",
            "icon": "&#348;",
            "value": "348",
            "group": "letters",
        },
        {
            "label": "lowercase s with circumflex",
            "icon": "&#349;",
            "value": "349",
            "group": "letters",
        },
        {
            "label": "uppercase s with cedilla",
            "icon": "&#350;",
            "value": "350",
            "group": "letters",
        },
        {
            "label": "lowercase s with cedilla",
            "icon": "&#351;",
            "value": "351",
            "group": "letters",
        },
        {
            "label": "uppercase s with caron",
            "icon": "&#352;",
            "value": "352",
            "group": "letters",
        },
        {
            "label": "lowercase s with caron",
            "icon": "&#353;",
            "value": "353",
            "group": "letters",
        },
        {
            "label": "uppercase t with cedilla",
            "icon": "&#354;",
            "value": "354",
            "group": "letters",
        },
        {
            "label": "lowercase t with cedilla",
            "icon": "&#355;",
            "value": "355",
            "group": "letters",
        },
        {
            "label": "uppercase t with caron",
            "icon": "&#356;",
            "value": "356",
            "group": "letters",
        },
        {
            "label": "lowercase t with caron",
            "icon": "&#357;",
            "value": "357",
            "group": "letters",
        },
        {
            "label": "uppercase t with stroke",
            "icon": "&#358;",
            "value": "358",
            "group": "letters",
        },
        {
            "label": "lowercase t with stroke",
            "icon": "&#359;",
            "value": "359",
            "group": "letters",
        },
        {
            "label": "uppercase u with tilde",
            "icon": "&#360;",
            "value": "360",
            "group": "letters",
        },
        {
            "label": "lowercase u with tilde",
            "icon": "&#361;",
            "value": "361",
            "group": "letters",
        },
        {
            "label": "uppercase u with macron",
            "icon": "&#362;",
            "value": "362",
            "group": "letters",
        },
        {
            "label": "lowercase u with macron",
            "icon": "&#363;",
            "value": "363",
            "group": "letters",
        },
        {
            "label": "uppercase u with breve",
            "icon": "&#364;",
            "value": "364",
            "group": "letters",
        },
        {
            "label": "lowercase u with breve",
            "icon": "&#365;",
            "value": "365",
            "group": "letters",
        },
        {
            "label": "uppercase u with ring above",
            "icon": "&#366;",
            "value": "366",
            "group": "letters",
        },
        {
            "label": "lowercase u with ring above",
            "icon": "&#367;",
            "value": "367",
            "group": "letters",
        },
        {
            "label": "uppercase u with double acute",
            "icon": "&#368;",
            "value": "368",
            "group": "letters",
        },
        {
            "label": "lowercase u with double acute",
            "icon": "&#369;",
            "value": "369",
            "group": "letters",
        },
        {
            "label": "uppercase u with ogonek",
            "icon": "&#370;",
            "value": "370",
            "group": "letters",
        },
        {
            "label": "lowercase u with ogonek",
            "icon": "&#371;",
            "value": "371",
            "group": "letters",
        },
        {
            "label": "uppercase w with circumflex",
            "icon": "&#372;",
            "value": "372",
            "group": "letters",
        },
        {
            "label": "lowercase w with circumflex",
            "icon": "&#373;",
            "value": "373",
            "group": "letters",
        },
        {
            "label": "uppercase y with circumflex",
            "icon": "&#374;",
            "value": "374",
            "group": "letters",
        },
        {
            "label": "lowercase y with circumflex",
            "icon": "&#375;",
            "value": "375",
            "group": "letters",
        },
        {
            "label": "uppercase y with diaeresis",
            "icon": "&#376;",
            "value": "376",
            "group": "letters",
        },
        {
            "label": "uppercase z with acute",
            "icon": "&#377;",
            "value": "377",
            "group": "letters",
        },
        {
            "label": "lowercase z with acute",
            "icon": "&#378;",
            "value": "378",
            "group": "letters",
        },
        {
            "label": "uppercase z with dot above",
            "icon": "&#379;",
            "value": "379",
            "group": "letters",
        },
        {
            "label": "lowercase z with dot above",
            "icon": "&#380;",
            "value": "380",
            "group": "letters",
        },
        {
            "label": "uppercase z with caron",
            "icon": "&#381;",
            "value": "381",
            "group": "letters",
        },
        {
            "label": "lowercase z with caron",
            "icon": "&#382;",
            "value": "382",
            "group": "letters",
        },
        {
            "label": "lowercase long s",
            "icon": "&#383;",
            "value": "383",
            "group": "letters",
        },
        {
            "label": "lowercase b with stroke",
            "icon": "&#384;",
            "value": "384",
            "group": "letters",
        },
        {
            "label": "uppercase b with hook",
            "icon": "&#385;",
            "value": "385",
            "group": "letters",
        },
        {
            "label": "uppercase b with topbar",
            "icon": "&#386;",
            "value": "386",
            "group": "letters",
        },
        {
            "label": "lowercase b with topbar",
            "icon": "&#387;",
            "value": "387",
            "group": "letters",
        },
        {
            "label": "uppercase tone six",
            "icon": "&#388;",
            "value": "388",
            "group": "letters",
        },
        {
            "label": "lowercase tone six",
            "icon": "&#389;",
            "value": "389",
            "group": "letters",
        },
        {
            "label": "uppercase open o",
            "icon": "&#390;",
            "value": "390",
            "group": "letters",
        },
        {
            "label": "uppercase c with hook",
            "icon": "&#391;",
            "value": "391",
            "group": "letters",
        },
        {
            "label": "lowercase c with hook",
            "icon": "&#392;",
            "value": "392",
            "group": "letters",
        },
        {
            "label": "uppercase african d",
            "icon": "&#393;",
            "value": "393",
            "group": "letters",
        },
        {
            "label": "uppercase d with hook",
            "icon": "&#394;",
            "value": "394",
            "group": "letters",
        },
        {
            "label": "uppercase d with topbar",
            "icon": "&#395;",
            "value": "395",
            "group": "letters",
        },
        {
            "label": "lowercase d with topbar",
            "icon": "&#396;",
            "value": "396",
            "group": "letters",
        },
        {
            "label": "lowercase turned delta",
            "icon": "&#397;",
            "value": "397",
            "group": "letters",
        },
        {
            "label": "uppercase reversed e",
            "icon": "&#398;",
            "value": "398",
            "group": "letters",
        },
        {
            "label": "uppercase schwa",
            "icon": "&#399;",
            "value": "399",
            "group": "letters",
        },
        {
            "label": "uppercase open e",
            "icon": "&#400;",
            "value": "400",
            "group": "letters",
        },
        {
            "label": "uppercase f with hook",
            "icon": "&#401;",
            "value": "401",
            "group": "letters",
        },
        {
            "label": "lowercase f with hook",
            "icon": "&#402;",
            "value": "402",
            "group": "letters",
        },
        {
            "label": "uppercase g with hook",
            "icon": "&#403;",
            "value": "403",
            "group": "letters",
        },
        {
            "label": "uppercase gamma",
            "icon": "&#404;",
            "value": "404",
            "group": "letters",
        },
        {
            "label": "lowercase hv",
            "icon": "&#405;",
            "value": "405",
            "group": "letters",
        },
        {
            "label": "uppercase iota",
            "icon": "&#406;",
            "value": "406",
            "group": "letters",
        },
        {
            "label": "uppercase i with stroke",
            "icon": "&#407;",
            "value": "407",
            "group": "letters",
        },
        {
            "label": "uppercase k with hook",
            "icon": "&#408;",
            "value": "408",
            "group": "letters",
        },
        {
            "label": "lowercase k with hook",
            "icon": "&#409;",
            "value": "409",
            "group": "letters",
        },
        {
            "label": "lowercase l with bar",
            "icon": "&#410;",
            "value": "410",
            "group": "letters",
        },
        {
            "label": "lowercase lambda with stroke",
            "icon": "&#411;",
            "value": "411",
            "group": "letters",
        },
        {
            "label": "uppercase turned m",
            "icon": "&#412;",
            "value": "412",
            "group": "letters",
        },
        {
            "label": "uppercase n with left hook",
            "icon": "&#413;",
            "value": "413",
            "group": "letters",
        },
        {
            "label": "lowercase n with long right leg",
            "icon": "&#414;",
            "value": "414",
            "group": "letters",
        },
        {
            "label": "uppercase o with middle tilde",
            "icon": "&#415;",
            "value": "415",
            "group": "letters",
        },
        {
            "label": "uppercase o with horn",
            "icon": "&#416;",
            "value": "416",
            "group": "letters",
        },
        {
            "label": "lowercase o with horn",
            "icon": "&#417;",
            "value": "417",
            "group": "letters",
        },
        {
            "label": "uppercase oi",
            "icon": "&#418;",
            "value": "418",
            "group": "letters",
        },
        {
            "label": "lowercase oi",
            "icon": "&#419;",
            "value": "419",
            "group": "letters",
        },
        {
            "label": "uppercase p with hook",
            "icon": "&#420;",
            "value": "420",
            "group": "letters",
        },
        {
            "label": "lowercase p with hook",
            "icon": "&#421;",
            "value": "421",
            "group": "letters",
        },
        {
            "label": "latin letter yr",
            "icon": "&#422;",
            "value": "422",
            "group": "letters",
        },
        {
            "label": "uppercase tone two",
            "icon": "&#423;",
            "value": "423",
            "group": "letters",
        },
        {
            "label": "lowercase tone two",
            "icon": "&#424;",
            "value": "424",
            "group": "letters",
        },
        {
            "label": "uppercase esh",
            "icon": "&#425;",
            "value": "425",
            "group": "letters",
        },
        {
            "label": "latin letter reversed esh loop",
            "icon": "&#426;",
            "value": "426",
            "group": "letters",
        },
        {
            "label": "lowercase t with palatal hook",
            "icon": "&#427;",
            "value": "427",
            "group": "letters",
        },
        {
            "label": "uppercase t with hook",
            "icon": "&#428;",
            "value": "428",
            "group": "letters",
        },
        {
            "label": "lowercase t with hook",
            "icon": "&#429;",
            "value": "429",
            "group": "letters",
        },
        {
            "label": "uppercase t with retroflex hook",
            "icon": "&#430;",
            "value": "430",
            "group": "letters",
        },
        {
            "label": "uppercase u with horn",
            "icon": "&#431;",
            "value": "431",
            "group": "letters",
        },
        {
            "label": "lowercase u with horn",
            "icon": "&#432;",
            "value": "432",
            "group": "letters",
        },
        {
            "label": "uppercase upsilon",
            "icon": "&#433;",
            "value": "433",
            "group": "letters",
        },
        {
            "label": "uppercase v with hook",
            "icon": "&#434;",
            "value": "434",
            "group": "letters",
        },
        {
            "label": "uppercase y with hook",
            "icon": "&#435;",
            "value": "435",
            "group": "letters",
        },
        {
            "label": "lowercase y with hook",
            "icon": "&#436;",
            "value": "436",
            "group": "letters",
        },
        {
            "label": "uppercase z with stroke",
            "icon": "&#437;",
            "value": "437",
            "group": "letters",
        },
        {
            "label": "lowercase z with stroke",
            "icon": "&#438;",
            "value": "438",
            "group": "letters",
        },
        {
            "label": "uppercase ezh",
            "icon": "&#439;",
            "value": "439",
            "group": "letters",
        },
        {
            "label": "uppercase ezh reversed",
            "icon": "&#440;",
            "value": "440",
            "group": "letters",
        },
        {
            "label": "lowercase ezh reversed",
            "icon": "&#441;",
            "value": "441",
            "group": "letters",
        },
        {
            "label": "lowercase ezh with tail",
            "icon": "&#442;",
            "value": "442",
            "group": "letters",
        },
        {
            "label": "latin letter two with stroke",
            "icon": "&#443;",
            "value": "443",
            "group": "letters",
        },
        {
            "label": "uppercase tone five",
            "icon": "&#444;",
            "value": "444",
            "group": "letters",
        },
        {
            "label": "lowercase tone five",
            "icon": "&#445;",
            "value": "445",
            "group": "letters",
        },
        {
            "label": "latin letter inverted glottal stop with stroke",
            "icon": "&#446;",
            "value": "446",
            "group": "letters",
        },
        {
            "label": "latin letter wynn",
            "icon": "&#447;",
            "value": "447",
            "group": "letters",
        },
        {
            "label": "latin letter dental click",
            "icon": "&#448;",
            "value": "448",
            "group": "letters",
        },
        {
            "label": "latin letter lateral click",
            "icon": "&#449;",
            "value": "449",
            "group": "letters",
        },
        {
            "label": "latin letter alveolar click",
            "icon": "&#450;",
            "value": "450",
            "group": "letters",
        },
        {
            "label": "latin letter retroflex click",
            "icon": "&#451;",
            "value": "451",
            "group": "letters",
        },
        {
            "label": "uppercase dz with caron",
            "icon": "&#452;",
            "value": "452",
            "group": "letters",
        },
        {
            "label": "uppercase d with small letter z with caron",
            "icon": "&#453;",
            "value": "453",
            "group": "letters",
        },
        {
            "label": "lowercase dz with caron",
            "icon": "&#454;",
            "value": "454",
            "group": "letters",
        },
        {
            "label": "uppercase lj",
            "icon": "&#455;",
            "value": "455",
            "group": "letters",
        },
        {
            "label": "uppercase l with small letter j",
            "icon": "&#456;",
            "value": "456",
            "group": "letters",
        },
        {
            "label": "lowercase lj",
            "icon": "&#457;",
            "value": "457",
            "group": "letters",
        },
        {
            "label": "uppercase nj",
            "icon": "&#458;",
            "value": "458",
            "group": "letters",
        },
        {
            "label": "uppercase n with small letter j",
            "icon": "&#459;",
            "value": "459",
            "group": "letters",
        },
        {
            "label": "lowercase nj",
            "icon": "&#460;",
            "value": "460",
            "group": "letters",
        },
        {
            "label": "uppercase a with caron",
            "icon": "&#461;",
            "value": "461",
            "group": "letters",
        },
        {
            "label": "lowercase a with caron",
            "icon": "&#462;",
            "value": "462",
            "group": "letters",
        },
        {
            "label": "uppercase i with caron",
            "icon": "&#463;",
            "value": "463",
            "group": "letters",
        },
        {
            "label": "lowercase i with caron",
            "icon": "&#464;",
            "value": "464",
            "group": "letters",
        },
        {
            "label": "uppercase o with caron",
            "icon": "&#465;",
            "value": "465",
            "group": "letters",
        },
        {
            "label": "lowercase o with caron",
            "icon": "&#466;",
            "value": "466",
            "group": "letters",
        },
        {
            "label": "uppercase u with caron",
            "icon": "&#467;",
            "value": "467",
            "group": "letters",
        },
        {
            "label": "lowercase u with caron",
            "icon": "&#468;",
            "value": "468",
            "group": "letters",
        },
        {
            "label": "uppercase u with diaeresis and macron",
            "icon": "&#469;",
            "value": "469",
            "group": "letters",
        },
        {
            "label": "lowercase u with diaeresis and macron",
            "icon": "&#470;",
            "value": "470",
            "group": "letters",
        },
        {
            "label": "uppercase u with diaeresis and acute",
            "icon": "&#471;",
            "value": "471",
            "group": "letters",
        },
        {
            "label": "lowercase u with diaeresis and acute",
            "icon": "&#472;",
            "value": "472",
            "group": "letters",
        },
        {
            "label": "uppercase u with diaeresis and caron",
            "icon": "&#473;",
            "value": "473",
            "group": "letters",
        },
        {
            "label": "lowercase u with diaeresis and caron",
            "icon": "&#474;",
            "value": "474",
            "group": "letters",
        },
        {
            "label": "uppercase u with diaeresis and grave",
            "icon": "&#475;",
            "value": "475",
            "group": "letters",
        },
        {
            "label": "lowercase u with diaeresis and grave",
            "icon": "&#476;",
            "value": "476",
            "group": "letters",
        },
        {
            "label": "lowercase turned e",
            "icon": "&#477;",
            "value": "477",
            "group": "letters",
        },
        {
            "label": "uppercase a with diaeresis and macron",
            "icon": "&#478;",
            "value": "478",
            "group": "letters",
        },
        {
            "label": "lowercase a with diaeresis and macron",
            "icon": "&#479;",
            "value": "479",
            "group": "letters",
        },
        {
            "label": "uppercase a with dot above and macron",
            "icon": "&#480;",
            "value": "480",
            "group": "letters",
        },
        {
            "label": "lowercase a with dot above and macron",
            "icon": "&#481;",
            "value": "481",
            "group": "letters",
        },
        {
            "label": "uppercase ae with macron",
            "icon": "&#482;",
            "value": "482",
            "group": "letters",
        },
        {
            "label": "lowercase ae with macron",
            "icon": "&#483;",
            "value": "483",
            "group": "letters",
        },
        {
            "label": "uppercase g with stroke",
            "icon": "&#484;",
            "value": "484",
            "group": "letters",
        },
        {
            "label": "lowercase g with stroke",
            "icon": "&#485;",
            "value": "485",
            "group": "letters",
        },
        {
            "label": "uppercase g with caron",
            "icon": "&#486;",
            "value": "486",
            "group": "letters",
        },
        {
            "label": "lowercase g with caron",
            "icon": "&#487;",
            "value": "487",
            "group": "letters",
        },
        {
            "label": "uppercase k with caron",
            "icon": "&#488;",
            "value": "488",
            "group": "letters",
        },
        {
            "label": "lowercase k with caron",
            "icon": "&#489;",
            "value": "489",
            "group": "letters",
        },
        {
            "label": "uppercase o with ogonek",
            "icon": "&#490;",
            "value": "490",
            "group": "letters",
        },
        {
            "label": "lowercase o with ogonek",
            "icon": "&#491;",
            "value": "491",
            "group": "letters",
        },
        {
            "label": "uppercase o with ogonek and macron",
            "icon": "&#492;",
            "value": "492",
            "group": "letters",
        },
        {
            "label": "lowercase o with ogonek and macron",
            "icon": "&#493;",
            "value": "493",
            "group": "letters",
        },
        {
            "label": "uppercase ezh with caron",
            "icon": "&#494;",
            "value": "494",
            "group": "letters",
        },
        {
            "label": "lowercase ezh with caron",
            "icon": "&#495;",
            "value": "495",
            "group": "letters",
        },
        {
            "label": "lowercase j with caron",
            "icon": "&#496;",
            "value": "496",
            "group": "letters",
        },
        {
            "label": "uppercase dz",
            "icon": "&#497;",
            "value": "497",
            "group": "letters",
        },
        {
            "label": "uppercase d with small letter z",
            "icon": "&#498;",
            "value": "498",
            "group": "letters",
        },
        {
            "label": "lowercase dz",
            "icon": "&#499;",
            "value": "499",
            "group": "letters",
        },
        {
            "label": "uppercase g with acute",
            "icon": "&#500;",
            "value": "500",
            "group": "letters",
        },
        {
            "label": "lowercase g with acute",
            "icon": "&#501;",
            "value": "501",
            "group": "letters",
        },
        {
            "label": "uppercase hwair",
            "icon": "&#502;",
            "value": "502",
            "group": "letters",
        },
        {
            "label": "uppercase wynn",
            "icon": "&#503;",
            "value": "503",
            "group": "letters",
        },
        {
            "label": "uppercase n with grave",
            "icon": "&#504;",
            "value": "504",
            "group": "letters",
        },
        {
            "label": "lowercase n with grave",
            "icon": "&#505;",
            "value": "505",
            "group": "letters",
        },
        {
            "label": "uppercase a with ring above and acute",
            "icon": "&#506;",
            "value": "506",
            "group": "letters",
        },
        {
            "label": "lowercase a with ring above and acute",
            "icon": "&#507;",
            "value": "507",
            "group": "letters",
        },
        {
            "label": "uppercase ae with acute",
            "icon": "&#508;",
            "value": "508",
            "group": "letters",
        },
        {
            "label": "lowercase ae with acute",
            "icon": "&#509;",
            "value": "509",
            "group": "letters",
        },
        {
            "label": "uppercase o with stroke and acute",
            "icon": "&#510;",
            "value": "510",
            "group": "letters",
        },
        {
            "label": "lowercase o with stroke and acute",
            "icon": "&#511;",
            "value": "511",
            "group": "letters",
        },
        {
            "label": "uppercase a with double grave",
            "icon": "&#512;",
            "value": "512",
            "group": "letters",
        },
        {
            "label": "lowercase a with double grave",
            "icon": "&#513;",
            "value": "513",
            "group": "letters",
        },
        {
            "label": "uppercase a with inverted breve",
            "icon": "&#514;",
            "value": "514",
            "group": "letters",
        },
        {
            "label": "lowercase a with inverted breve",
            "icon": "&#515;",
            "value": "515",
            "group": "letters",
        },
        {
            "label": "uppercase e with double grave",
            "icon": "&#516;",
            "value": "516",
            "group": "letters",
        },
        {
            "label": "lowercase e with double grave",
            "icon": "&#517;",
            "value": "517",
            "group": "letters",
        },
        {
            "label": "uppercase e with inverted breve",
            "icon": "&#518;",
            "value": "518",
            "group": "letters",
        },
        {
            "label": "lowercase e with inverted breve",
            "icon": "&#519;",
            "value": "519",
            "group": "letters",
        },
        {
            "label": "uppercase i with double grave",
            "icon": "&#520;",
            "value": "520",
            "group": "letters",
        },
        {
            "label": "lowercase i with double grave",
            "icon": "&#521;",
            "value": "521",
            "group": "letters",
        },
        {
            "label": "uppercase i with inverted breve",
            "icon": "&#522;",
            "value": "522",
            "group": "letters",
        },
        {
            "label": "lowercase i with inverted breve",
            "icon": "&#523;",
            "value": "523",
            "group": "letters",
        },
        {
            "label": "uppercase o with double grave",
            "icon": "&#524;",
            "value": "524",
            "group": "letters",
        },
        {
            "label": "lowercase o with double grave",
            "icon": "&#525;",
            "value": "525",
            "group": "letters",
        },
        {
            "label": "uppercase o with inverted breve",
            "icon": "&#526;",
            "value": "526",
            "group": "letters",
        },
        {
            "label": "lowercase o with inverted breve",
            "icon": "&#527;",
            "value": "527",
            "group": "letters",
        },
        {
            "label": "uppercase r with double grave",
            "icon": "&#528;",
            "value": "528",
            "group": "letters",
        },
        {
            "label": "lowercase r with double grave",
            "icon": "&#529;",
            "value": "529",
            "group": "letters",
        },
        {
            "label": "uppercase r with inverted breve",
            "icon": "&#530;",
            "value": "530",
            "group": "letters",
        },
        {
            "label": "lowercase r with inverted breve",
            "icon": "&#531;",
            "value": "531",
            "group": "letters",
        },
        {
            "label": "uppercase u with double grave",
            "icon": "&#532;",
            "value": "532",
            "group": "letters",
        },
        {
            "label": "lowercase u with double grave",
            "icon": "&#533;",
            "value": "533",
            "group": "letters",
        },
        {
            "label": "uppercase u with inverted breve",
            "icon": "&#534;",
            "value": "534",
            "group": "letters",
        },
        {
            "label": "lowercase u with inverted breve",
            "icon": "&#535;",
            "value": "535",
            "group": "letters",
        },
        {
            "label": "uppercase s with comma below",
            "icon": "&#536;",
            "value": "536",
            "group": "letters",
        },
        {
            "label": "lowercase s with comma below",
            "icon": "&#537;",
            "value": "537",
            "group": "letters",
        },
        {
            "label": "uppercase t with comma below",
            "icon": "&#538;",
            "value": "538",
            "group": "letters",
        },
        {
            "label": "lowercase t with comma below",
            "icon": "&#539;",
            "value": "539",
            "group": "letters",
        },
        {
            "label": "uppercase yogh",
            "icon": "&#540;",
            "value": "540",
            "group": "letters",
        },
        {
            "label": "lowercase yogh",
            "icon": "&#541;",
            "value": "541",
            "group": "letters",
        },
        {
            "label": "uppercase h with caron",
            "icon": "&#542;",
            "value": "542",
            "group": "letters",
        },
        {
            "label": "lowercase h with caron",
            "icon": "&#543;",
            "value": "543",
            "group": "letters",
        },
        {
            "label": "uppercase n with long right leg",
            "icon": "&#544;",
            "value": "544",
            "group": "letters",
        },
        {
            "label": "lowercase d with curl",
            "icon": "&#545;",
            "value": "545",
            "group": "letters",
        },
        {
            "label": "uppercase ou",
            "icon": "&#546;",
            "value": "546",
            "group": "letters",
        },
        {
            "label": "lowercase ou",
            "icon": "&#547;",
            "value": "547",
            "group": "letters",
        },
        {
            "label": "uppercase z with hook",
            "icon": "&#548;",
            "value": "548",
            "group": "letters",
        },
        {
            "label": "lowercase z with hook",
            "icon": "&#549;",
            "value": "549",
            "group": "letters",
        },
        {
            "label": "uppercase a with dot above",
            "icon": "&#550;",
            "value": "550",
            "group": "letters",
        },
        {
            "label": "lowercase a with dot above",
            "icon": "&#551;",
            "value": "551",
            "group": "letters",
        },
        {
            "label": "uppercase e with cedilla",
            "icon": "&#552;",
            "value": "552",
            "group": "letters",
        },
        {
            "label": "lowercase e with cedilla",
            "icon": "&#553;",
            "value": "553",
            "group": "letters",
        },
        {
            "label": "uppercase o with diaeresis and macron",
            "icon": "&#554;",
            "value": "554",
            "group": "letters",
        },
        {
            "label": "lowercase o with diaeresis and macron",
            "icon": "&#555;",
            "value": "555",
            "group": "letters",
        },
        {
            "label": "uppercase o with tilde and macron",
            "icon": "&#556;",
            "value": "556",
            "group": "letters",
        },
        {
            "label": "lowercase o with tilde and macron",
            "icon": "&#557;",
            "value": "557",
            "group": "letters",
        },
        {
            "label": "uppercase o with dot above",
            "icon": "&#558;",
            "value": "558",
            "group": "letters",
        },
        {
            "label": "lowercase o with dot above",
            "icon": "&#559;",
            "value": "559",
            "group": "letters",
        },
        {
            "label": "uppercase o with dot above and macron",
            "icon": "&#560;",
            "value": "560",
            "group": "letters",
        },
        {
            "label": "lowercase o with dot above and macron",
            "icon": "&#561;",
            "value": "561",
            "group": "letters",
        },
        {
            "label": "uppercase y with macron",
            "icon": "&#562;",
            "value": "562",
            "group": "letters",
        },
        {
            "label": "lowercase y with macron",
            "icon": "&#563;",
            "value": "563",
            "group": "letters",
        },
        {
            "label": "lowercase l with curl",
            "icon": "&#564;",
            "value": "564",
            "group": "letters",
        },
        {
            "label": "lowercase n with curl",
            "icon": "&#565;",
            "value": "565",
            "group": "letters",
        },
        {
            "label": "lowercase t with curl",
            "icon": "&#566;",
            "value": "566",
            "group": "letters",
        },
        {
            "label": "lowercase dotless j",
            "icon": "&#567;",
            "value": "567",
            "group": "letters",
        },
        {
            "label": "lowercase db digraph",
            "icon": "&#568;",
            "value": "568",
            "group": "letters",
        },
        {
            "label": "lowercase qp digraph",
            "icon": "&#569;",
            "value": "569",
            "group": "letters",
        },
        {
            "label": "uppercase a with stroke",
            "icon": "&#570;",
            "value": "570",
            "group": "letters",
        },
        {
            "label": "uppercase c with stroke",
            "icon": "&#571;",
            "value": "571",
            "group": "letters",
        },
        {
            "label": "lowercase c with stroke",
            "icon": "&#572;",
            "value": "572",
            "group": "letters",
        },
        {
            "label": "uppercase l with bar",
            "icon": "&#573;",
            "value": "573",
            "group": "letters",
        },
        {
            "label": "uppercase t with diagonal stroke",
            "icon": "&#574;",
            "value": "574",
            "group": "letters",
        },
        {
            "label": "lowercase s with swash tail",
            "icon": "&#575;",
            "value": "575",
            "group": "letters",
        },
        {
            "label": "lowercase z with swash tail",
            "icon": "&#576;",
            "value": "576",
            "group": "letters",
        },
        {
            "label": "uppercase glottal stop",
            "icon": "&#577;",
            "value": "577",
            "group": "letters",
        },
        {
            "label": "lowercase glottal stop",
            "icon": "&#578;",
            "value": "578",
            "group": "letters",
        },
        {
            "label": "uppercase b with stroke",
            "icon": "&#579;",
            "value": "579",
            "group": "letters",
        },
        {
            "label": "uppercase u bar",
            "icon": "&#580;",
            "value": "580",
            "group": "letters",
        },
        {
            "label": "uppercase turned v",
            "icon": "&#581;",
            "value": "581",
            "group": "letters",
        },
        {
            "label": "uppercase e with stroke",
            "icon": "&#582;",
            "value": "582",
            "group": "letters",
        },
        {
            "label": "lowercase e with stroke",
            "icon": "&#583;",
            "value": "583",
            "group": "letters",
        },
        {
            "label": "uppercase j with stroke",
            "icon": "&#584;",
            "value": "584",
            "group": "letters",
        },
        {
            "label": "lowercase j with stroke",
            "icon": "&#585;",
            "value": "585",
            "group": "letters",
        },
        {
            "label": "uppercase small q with hook tail",
            "icon": "&#586;",
            "value": "586",
            "group": "letters",
        },
        {
            "label": "lowercase q with hook tail",
            "icon": "&#587;",
            "value": "587",
            "group": "letters",
        },
        {
            "label": "uppercase r with stroke",
            "icon": "&#588;",
            "value": "588",
            "group": "letters",
        },
        {
            "label": "lowercase r with stroke",
            "icon": "&#589;",
            "value": "589",
            "group": "letters",
        },
        {
            "label": "uppercase y with stroke",
            "icon": "&#590;",
            "value": "590",
            "group": "letters",
        },
        {
            "label": "lowercase y with stroke",
            "icon": "&#591;",
            "value": "591",
            "group": "letters",
        },
        {
            "label": "lowercase turned a",
            "icon": "&#592;",
            "value": "592",
            "group": "letters",
        },
        {
            "label": "lowercase alpha",
            "icon": "&#593;",
            "value": "593",
            "group": "letters",
        },
        {
            "label": "lowercase turned alpha",
            "icon": "&#594;",
            "value": "594",
            "group": "letters",
        },
        {
            "label": "lowercase b with hook",
            "icon": "&#595;",
            "value": "595",
            "group": "letters",
        },
        {
            "label": "lowercase open o",
            "icon": "&#596;",
            "value": "596",
            "group": "letters",
        },
        {
            "label": "lowercase c with curl",
            "icon": "&#597;",
            "value": "597",
            "group": "letters",
        },
        {
            "label": "lowercase d with tail",
            "icon": "&#598;",
            "value": "598",
            "group": "letters",
        },
        {
            "label": "lowercase d with hook",
            "icon": "&#599;",
            "value": "599",
            "group": "letters",
        },
        {
            "label": "lowercase reversed e",
            "icon": "&#600;",
            "value": "600",
            "group": "letters",
        },
        {
            "label": "lowercase schwa",
            "icon": "&#601;",
            "value": "601",
            "group": "letters",
        },
        {
            "label": "lowercase schwa with hook",
            "icon": "&#602;",
            "value": "602",
            "group": "letters",
        },
        {
            "label": "lowercase open e",
            "icon": "&#603;",
            "value": "603",
            "group": "letters",
        },
        {
            "label": "lowercase reversed open e",
            "icon": "&#604;",
            "value": "604",
            "group": "letters",
        },
        {
            "label": "lowercase reversed open e with hook",
            "icon": "&#605;",
            "value": "605",
            "group": "letters",
        },
        {
            "label": "lowercase closed reversed open e",
            "icon": "&#606;",
            "value": "606",
            "group": "letters",
        },
        {
            "label": "lowercase dotless j with stroke",
            "icon": "&#607;",
            "value": "607",
            "group": "letters",
        },
        {
            "label": "lowercase g with hook",
            "icon": "&#608;",
            "value": "608",
            "group": "letters",
        },
        {
            "label": "lowercase script g",
            "icon": "&#609;",
            "value": "609",
            "group": "letters",
        },
        {
            "label": "latin letter small capital g",
            "icon": "&#610;",
            "value": "610",
            "group": "letters",
        },
        {
            "label": "lowercase gamma",
            "icon": "&#611;",
            "value": "611",
            "group": "letters",
        },
        {
            "label": "lowercase rams horn",
            "icon": "&#612;",
            "value": "612",
            "group": "letters",
        },
        {
            "label": "lowercase turned h",
            "icon": "&#613;",
            "value": "613",
            "group": "letters",
        },
        {
            "label": "lowercase h with hook",
            "icon": "&#614;",
            "value": "614",
            "group": "letters",
        },
        {
            "label": "lowercase heng with hook",
            "icon": "&#615;",
            "value": "615",
            "group": "letters",
        },
        {
            "label": "lowercase i with stroke",
            "icon": "&#616;",
            "value": "616",
            "group": "letters",
        },
        {
            "label": "lowercase iota",
            "icon": "&#617;",
            "value": "617",
            "group": "letters",
        },
        {
            "label": "latin letter small capital i",
            "icon": "&#618;",
            "value": "618",
            "group": "letters",
        },
        {
            "label": "lowercase l with middle tilde",
            "icon": "&#619;",
            "value": "619",
            "group": "letters",
        },
        {
            "label": "lowercase l with belt",
            "icon": "&#620;",
            "value": "620",
            "group": "letters",
        },
        {
            "label": "lowercase l with retroflex hook",
            "icon": "&#621;",
            "value": "621",
            "group": "letters",
        },
        {
            "label": "lowercase lezh",
            "icon": "&#622;",
            "value": "622",
            "group": "letters",
        },
        {
            "label": "lowercase turned m",
            "icon": "&#623;",
            "value": "623",
            "group": "letters",
        },
        {
            "label": "lowercase turned m with long leg",
            "icon": "&#624;",
            "value": "624",
            "group": "letters",
        },
        {
            "label": "lowercase m with hook",
            "icon": "&#625;",
            "value": "625",
            "group": "letters",
        },
        {
            "label": "lowercase n with left hook",
            "icon": "&#626;",
            "value": "626",
            "group": "letters",
        },
        {
            "label": "lowercase n with retroflex hook",
            "icon": "&#627;",
            "value": "627",
            "group": "letters",
        },
        {
            "label": "latin letter small capital n",
            "icon": "&#628;",
            "value": "628",
            "group": "letters",
        },
        {
            "label": "lowercase barred o",
            "icon": "&#629;",
            "value": "629",
            "group": "letters",
        },
        {
            "label": "latin letter small capital oe",
            "icon": "&#630;",
            "value": "630",
            "group": "letters",
        },
        {
            "label": "lowercase closed omega",
            "icon": "&#631;",
            "value": "631",
            "group": "letters",
        },
        {
            "label": "lowercase phi",
            "icon": "&#632;",
            "value": "632",
            "group": "letters",
        },
        {
            "label": "lowercase turned r",
            "icon": "&#633;",
            "value": "633",
            "group": "letters",
        },
        {
            "label": "lowercase turned r with long leg",
            "icon": "&#634;",
            "value": "634",
            "group": "letters",
        },
        {
            "label": "lowercase turned r with hook",
            "icon": "&#635;",
            "value": "635",
            "group": "letters",
        },
        {
            "label": "lowercase r with long leg",
            "icon": "&#636;",
            "value": "636",
            "group": "letters",
        },
        {
            "label": "lowercase r with tail",
            "icon": "&#637;",
            "value": "637",
            "group": "letters",
        },
        {
            "label": "lowercase r with fishhook",
            "icon": "&#638;",
            "value": "638",
            "group": "letters",
        },
        {
            "label": "lowercase reversed r with fishhook",
            "icon": "&#639;",
            "value": "639",
            "group": "letters",
        },
        {
            "label": "latin letter small capital r",
            "icon": "&#640;",
            "value": "640",
            "group": "letters",
        },
        {
            "label": "latin letter small capital inverted r",
            "icon": "&#641;",
            "value": "641",
            "group": "letters",
        },
        {
            "label": "lowercase s with hook",
            "icon": "&#642;",
            "value": "642",
            "group": "letters",
        },
        {
            "label": "lowercase esh",
            "icon": "&#643;",
            "value": "643",
            "group": "letters",
        },
        {
            "label": "lowercase dotless j with stroke and hook",
            "icon": "&#644;",
            "value": "644",
            "group": "letters",
        },
        {
            "label": "lowercase squat reversed esh",
            "icon": "&#645;",
            "value": "645",
            "group": "letters",
        },
        {
            "label": "lowercase esh with curl",
            "icon": "&#646;",
            "value": "646",
            "group": "letters",
        },
        {
            "label": "lowercase turned t",
            "icon": "&#647;",
            "value": "647",
            "group": "letters",
        },
        {
            "label": "lowercase t with retroflex hook",
            "icon": "&#648;",
            "value": "648",
            "group": "letters",
        },
        {
            "label": "lowercase u bar",
            "icon": "&#649;",
            "value": "649",
            "group": "letters",
        },
        {
            "label": "lowercase upsilon",
            "icon": "&#650;",
            "value": "650",
            "group": "letters",
        },
        {
            "label": "lowercase v with hook",
            "icon": "&#651;",
            "value": "651",
            "group": "letters",
        },
        {
            "label": "lowercase turned v",
            "icon": "&#652;",
            "value": "652",
            "group": "letters",
        },
        {
            "label": "lowercase turned w",
            "icon": "&#653;",
            "value": "653",
            "group": "letters",
        },
        {
            "label": "lowercase turned y",
            "icon": "&#654;",
            "value": "654",
            "group": "letters",
        },
        {
            "label": "latin letter small capital y",
            "icon": "&#655;",
            "value": "655",
            "group": "letters",
        },
        {
            "label": "lowercase z with retroflex hook",
            "icon": "&#656;",
            "value": "656",
            "group": "letters",
        },
        {
            "label": "lowercase z with curl",
            "icon": "&#657;",
            "value": "657",
            "group": "letters",
        },
        {
            "label": "lowercase ezh",
            "icon": "&#658;",
            "value": "658",
            "group": "letters",
        },
        {
            "label": "lowercase ezh with curl",
            "icon": "&#659;",
            "value": "659",
            "group": "letters",
        },
        {
            "label": "latin letter glottal stop",
            "icon": "&#660;",
            "value": "660",
            "group": "letters",
        },
        {
            "label": "latin letter pharyngeal voiced fricative",
            "icon": "&#661;",
            "value": "661",
            "group": "letters",
        },
        {
            "label": "latin letter inverted glottal stop",
            "icon": "&#662;",
            "value": "662",
            "group": "letters",
        },
        {
            "label": "latin letter stretched c",
            "icon": "&#663;",
            "value": "663",
            "group": "letters",
        },
        {
            "label": "latin letter bilabial click",
            "icon": "&#664;",
            "value": "664",
            "group": "letters",
        },
        {
            "label": "latin letter small capital b",
            "icon": "&#665;",
            "value": "665",
            "group": "letters",
        },
        {
            "label": "lowercase closed open e",
            "icon": "&#666;",
            "value": "666",
            "group": "letters",
        },
        {
            "label": "latin letter small capital g with hook",
            "icon": "&#667;",
            "value": "667",
            "group": "letters",
        },
        {
            "label": "latin letter small capital h",
            "icon": "&#668;",
            "value": "668",
            "group": "letters",
        },
        {
            "label": "lowercase j with crossed-tail",
            "icon": "&#669;",
            "value": "669",
            "group": "letters",
        },
        {
            "label": "lowercase turned k",
            "icon": "&#670;",
            "value": "670",
            "group": "letters",
        },
        {
            "label": "latin letter small capital l",
            "icon": "&#671;",
            "value": "671",
            "group": "letters",
        },
        {
            "label": "lowercase q with hook",
            "icon": "&#672;",
            "value": "672",
            "group": "letters",
        },
        {
            "label": "latin letter glottal stop with stroke",
            "icon": "&#673;",
            "value": "673",
            "group": "letters",
        },
        {
            "label": "latin letter reversed glottal stop with stroke",
            "icon": "&#674;",
            "value": "674",
            "group": "letters",
        },
        {
            "label": "lowercase dz digraph",
            "icon": "&#675;",
            "value": "675",
            "group": "letters",
        },
        {
            "label": "lowercase dezh digraph",
            "icon": "&#676;",
            "value": "676",
            "group": "letters",
        },
        {
            "label": "lowercase dz digraph with curl",
            "icon": "&#677;",
            "value": "677",
            "group": "letters",
        },
        {
            "label": "lowercase ts digraph",
            "icon": "&#678;",
            "value": "678",
            "group": "letters",
        },
        {
            "label": "lowercase tesh digraph",
            "icon": "&#679;",
            "value": "679",
            "group": "letters",
        },
        {
            "label": "lowercase tc digraph with curl",
            "icon": "&#680;",
            "value": "680",
            "group": "letters",
        },
        {
            "label": "lowercase feng digraph",
            "icon": "&#681;",
            "value": "681",
            "group": "letters",
        },
        {
            "label": "lowercase ls digraph",
            "icon": "&#682;",
            "value": "682",
            "group": "letters",
        },
        {
            "label": "lowercase lz digraph",
            "icon": "&#683;",
            "value": "683",
            "group": "letters",
        },
        {
            "label": "lowercase bilabial percussive",
            "icon": "&#684;",
            "value": "684",
            "group": "letters",
        },
        {
            "label": "lowercase bidental percussive",
            "icon": "&#685;",
            "value": "685",
            "group": "letters",
        },
        {
            "label": "lowercase turned h with fishhook",
            "icon": "&#686;",
            "value": "686",
            "group": "letters",
        },
        {
            "label": "lowercase turned h with fishhook and tail",
            "icon": "&#687;",
            "value": "687",
            "group": "letters",
        },
        {
            "label": "combining grave accent",
            "icon": "&#768;",
            "value": "768",
            "group": "letters",
        },
        {
            "label": "combining acute accent",
            "icon": "&#769;",
            "value": "769",
            "group": "letters",
        },
        {
            "label": "combining circumflex accent",
            "icon": "&#770;",
            "value": "770",
            "group": "letters",
        },
        {
            "label": "combining tilde",
            "icon": "&#771;",
            "value": "771",
            "group": "letters",
        },
        {
            "label": "combining macron",
            "icon": "&#772;",
            "value": "772",
            "group": "letters",
        },
        {
            "label": "combining overline",
            "icon": "&#773;",
            "value": "773",
            "group": "letters",
        },
        {
            "label": "combining breve",
            "icon": "&#774;",
            "value": "774",
            "group": "letters",
        },
        {
            "label": "combining dot above",
            "icon": "&#775;",
            "value": "775",
            "group": "letters",
        },
        {
            "label": "combining diaeresis",
            "icon": "&#776;",
            "value": "776",
            "group": "letters",
        },
        {
            "label": "combining hook above",
            "icon": "&#777;",
            "value": "777",
            "group": "letters",
        },
        {
            "label": "combining ring above",
            "icon": "&#778;",
            "value": "778",
            "group": "letters",
        },
        {
            "label": "combining double acute accent",
            "icon": "&#779;",
            "value": "779",
            "group": "letters",
        },
        {
            "label": "combining caron",
            "icon": "&#780;",
            "value": "780",
            "group": "letters",
        },
        {
            "label": "combining vertical line above",
            "icon": "&#781;",
            "value": "781",
            "group": "letters",
        },
        {
            "label": "combining double vertical line above",
            "icon": "&#782;",
            "value": "782",
            "group": "letters",
        },
        {
            "label": "combining double grave accent",
            "icon": "&#783;",
            "value": "783",
            "group": "letters",
        },
        {
            "label": "combining candrabindu",
            "icon": "&#784;",
            "value": "784",
            "group": "letters",
        },
        {
            "label": "combining inverted breve",
            "icon": "&#785;",
            "value": "785",
            "group": "letters",
        },
        {
            "label": "combining turned comma above",
            "icon": "&#786;",
            "value": "786",
            "group": "letters",
        },
        {
            "label": "combining comma above",
            "icon": "&#787;",
            "value": "787",
            "group": "letters",
        },
        {
            "label": "combining reversed comma above",
            "icon": "&#788;",
            "value": "788",
            "group": "letters",
        },
        {
            "label": "combining comma above right",
            "icon": "&#789;",
            "value": "789",
            "group": "letters",
        },
        {
            "label": "combining grave accent below",
            "icon": "&#790;",
            "value": "790",
            "group": "letters",
        },
        {
            "label": "combining acute accent below",
            "icon": "&#791;",
            "value": "791",
            "group": "letters",
        },
        {
            "label": "combining left tack below",
            "icon": "&#792;",
            "value": "792",
            "group": "letters",
        },
        {
            "label": "combining right tack below",
            "icon": "&#793;",
            "value": "793",
            "group": "letters",
        },
        {
            "label": "combining left angle above",
            "icon": "&#794;",
            "value": "794",
            "group": "letters",
        },
        {
            "label": "combining horn",
            "icon": "&#795;",
            "value": "795",
            "group": "letters",
        },
        {
            "label": "combining left half ring below",
            "icon": "&#796;",
            "value": "796",
            "group": "letters",
        },
        {
            "label": "combining up tack below",
            "icon": "&#797;",
            "value": "797",
            "group": "letters",
        },
        {
            "label": "combining down tack below",
            "icon": "&#798;",
            "value": "798",
            "group": "letters",
        },
        {
            "label": "combining plus sign below",
            "icon": "&#799;",
            "value": "799",
            "group": "letters",
        },
        {
            "label": "combining minus sign below",
            "icon": "&#800;",
            "value": "800",
            "group": "letters",
        },
        {
            "label": "combining palatalized hook below",
            "icon": "&#801;",
            "value": "801",
            "group": "letters",
        },
        {
            "label": "combining retroflex hook below",
            "icon": "&#802;",
            "value": "802",
            "group": "letters",
        },
        {
            "label": "combining dot below",
            "icon": "&#803;",
            "value": "803",
            "group": "letters",
        },
        {
            "label": "combining diaeresis below",
            "icon": "&#804;",
            "value": "804",
            "group": "letters",
        },
        {
            "label": "combining ring below",
            "icon": "&#805;",
            "value": "805",
            "group": "letters",
        },
        {
            "label": "combining comma below",
            "icon": "&#806;",
            "value": "806",
            "group": "letters",
        },
        {
            "label": "combining cedilla",
            "icon": "&#807;",
            "value": "807",
            "group": "letters",
        },
        {
            "label": "combining ogonek",
            "icon": "&#808;",
            "value": "808",
            "group": "letters",
        },
        {
            "label": "combining vertical line below",
            "icon": "&#809;",
            "value": "809",
            "group": "letters",
        },
        {
            "label": "combining bridge below",
            "icon": "&#810;",
            "value": "810",
            "group": "letters",
        },
        {
            "label": "combining inverted double arch below",
            "icon": "&#811;",
            "value": "811",
            "group": "letters",
        },
        {
            "label": "combining caron below",
            "icon": "&#812;",
            "value": "812",
            "group": "letters",
        },
        {
            "label": "combining circumflex accent below",
            "icon": "&#813;",
            "value": "813",
            "group": "letters",
        },
        {
            "label": "combining breve below",
            "icon": "&#814;",
            "value": "814",
            "group": "letters",
        },
        {
            "label": "combining inverted breve below",
            "icon": "&#815;",
            "value": "815",
            "group": "letters",
        },
        {
            "label": "combining tilde below",
            "icon": "&#816;",
            "value": "816",
            "group": "letters",
        },
        {
            "label": "combining macron below",
            "icon": "&#817;",
            "value": "817",
            "group": "letters",
        },
        {
            "label": "combining low line",
            "icon": "&#818;",
            "value": "818",
            "group": "letters",
        },
        {
            "label": "combining double low line",
            "icon": "&#819;",
            "value": "819",
            "group": "letters",
        },
        {
            "label": "combining tilde overlay",
            "icon": "&#820;",
            "value": "820",
            "group": "letters",
        },
        {
            "label": "combining short stroke overlay",
            "icon": "&#821;",
            "value": "821",
            "group": "letters",
        },
        {
            "label": "combining long stroke overlay",
            "icon": "&#822;",
            "value": "822",
            "group": "letters",
        },
        {
            "label": "combining short solidus overlay",
            "icon": "&#823;",
            "value": "823",
            "group": "letters",
        },
        {
            "label": "combining long solidus overlay",
            "icon": "&#824;",
            "value": "824",
            "group": "letters",
        },
        {
            "label": "combining right half ring below",
            "icon": "&#825;",
            "value": "825",
            "group": "letters",
        },
        {
            "label": "combining inverted bridge below",
            "icon": "&#826;",
            "value": "826",
            "group": "letters",
        },
        {
            "label": "combining square below",
            "icon": "&#827;",
            "value": "827",
            "group": "letters",
        },
        {
            "label": "combining seagull below",
            "icon": "&#828;",
            "value": "828",
            "group": "letters",
        },
        {
            "label": "combining x above",
            "icon": "&#829;",
            "value": "829",
            "group": "letters",
        },
        {
            "label": "combining vertical tilde",
            "icon": "&#830;",
            "value": "830",
            "group": "letters",
        },
        {
            "label": "combining double overline",
            "icon": "&#831;",
            "value": "831",
            "group": "letters",
        },
        {
            "label": "combining grave tone mark",
            "icon": "&#832;",
            "value": "832",
            "group": "letters",
        },
        {
            "label": "combining acute tone mark",
            "icon": "&#833;",
            "value": "833",
            "group": "letters",
        },
        {
            "label": "combining greek perispomeni",
            "icon": "&#834;",
            "value": "834",
            "group": "letters",
        },
        {
            "label": "combining greek koronis",
            "icon": "&#835;",
            "value": "835",
            "group": "letters",
        },
        {
            "label": "combining greek dialytika tonos",
            "icon": "&#836;",
            "value": "836",
            "group": "letters",
        },
        {
            "label": "combining greek ypogegrammeni",
            "icon": "&#837;",
            "value": "837",
            "group": "letters",
        },
        {
            "label": "combining bridge above",
            "icon": "&#838;",
            "value": "838",
            "group": "letters",
        },
        {
            "label": "combining equals sign below",
            "icon": "&#839;",
            "value": "839",
            "group": "letters",
        },
        {
            "label": "combining double vertical line below",
            "icon": "&#840;",
            "value": "840",
            "group": "letters",
        },
        {
            "label": "combining left angle below",
            "icon": "&#841;",
            "value": "841",
            "group": "letters",
        },
        {
            "label": "combining not tilde above",
            "icon": "&#842;",
            "value": "842",
            "group": "letters",
        },
        {
            "label": "combining homothetic above",
            "icon": "&#843;",
            "value": "843",
            "group": "letters",
        },
        {
            "label": "combining almost equal to above",
            "icon": "&#844;",
            "value": "844",
            "group": "letters",
        },
        {
            "label": "combining left right arrow below",
            "icon": "&#845;",
            "value": "845",
            "group": "letters",
        },
        {
            "label": "combining up arrow below",
            "icon": "&#846;",
            "value": "846",
            "group": "letters",
        },
        {
            "label": "combining grapheme joiner",
            "icon": "&#847;",
            "value": "847",
            "group": "letters",
        },
        {
            "label": "combining right arrowhead above",
            "icon": "&#848;",
            "value": "848",
            "group": "letters",
        },
        {
            "label": "combining left half ring above",
            "icon": "&#849;",
            "value": "849",
            "group": "letters",
        },
        {
            "label": "combining fermata",
            "icon": "&#850;",
            "value": "850",
            "group": "letters",
        },
        {
            "label": "combining x below",
            "icon": "&#851;",
            "value": "851",
            "group": "letters",
        },
        {
            "label": "combining left arrowhead below",
            "icon": "&#852;",
            "value": "852",
            "group": "letters",
        },
        {
            "label": "combining right arrowhead below",
            "icon": "&#853;",
            "value": "853",
            "group": "letters",
        },
        {
            "label": "combining right arrowhead and up arrowhead below",
            "icon": "&#854;",
            "value": "854",
            "group": "letters",
        },
        {
            "label": "combining right half ring above",
            "icon": "&#855;",
            "value": "855",
            "group": "letters",
        },
        {
            "label": "combining dot above right",
            "icon": "&#856;",
            "value": "856",
            "group": "letters",
        },
        {
            "label": "combining asterisk below",
            "icon": "&#857;",
            "value": "857",
            "group": "letters",
        },
        {
            "label": "combining double ring below",
            "icon": "&#858;",
            "value": "858",
            "group": "letters",
        },
        {
            "label": "combining zigzag above",
            "icon": "&#859;",
            "value": "859",
            "group": "letters",
        },
        {
            "label": "combining double breve below",
            "icon": "&#860;",
            "value": "860",
            "group": "letters",
        },
        {
            "label": "combining double breve",
            "icon": "&#861;",
            "value": "861",
            "group": "letters",
        },
        {
            "label": "combining double macron",
            "icon": "&#862;",
            "value": "862",
            "group": "letters",
        },
        {
            "label": "combining double macron below",
            "icon": "&#863;",
            "value": "863",
            "group": "letters",
        },
        {
            "label": "combining double tilde",
            "icon": "&#864;",
            "value": "864",
            "group": "letters",
        },
        {
            "label": "combining double inverted breve",
            "icon": "&#865;",
            "value": "865",
            "group": "letters",
        },
        {
            "label": "combining double rightwards arrow below",
            "icon": "&#866;",
            "value": "866",
            "group": "letters",
        },
        {
            "label": "combining latin small letter a",
            "icon": "&#867;",
            "value": "867",
            "group": "letters",
        },
        {
            "label": "combining latin small letter e",
            "icon": "&#868;",
            "value": "868",
            "group": "letters",
        },
        {
            "label": "combining latin small letter i",
            "icon": "&#869;",
            "value": "869",
            "group": "letters",
        },
        {
            "label": "combining latin small letter o",
            "icon": "&#870;",
            "value": "870",
            "group": "letters",
        },
        {
            "label": "combining latin small letter u",
            "icon": "&#871;",
            "value": "871",
            "group": "letters",
        },
        {
            "label": "combining latin small letter c",
            "icon": "&#872;",
            "value": "872",
            "group": "letters",
        },
        {
            "label": "combining latin small letter d",
            "icon": "&#873;",
            "value": "873",
            "group": "letters",
        },
        {
            "label": "combining latin small letter h",
            "icon": "&#874;",
            "value": "874",
            "group": "letters",
        },
        {
            "label": "combining latin small letter m",
            "icon": "&#875;",
            "value": "875",
            "group": "letters",
        },
        {
            "label": "combining latin small letter r",
            "icon": "&#876;",
            "value": "876",
            "group": "letters",
        },
        {
            "label": "combining latin small letter t",
            "icon": "&#877;",
            "value": "877",
            "group": "letters",
        },
        {
            "label": "combining latin small letter v",
            "icon": "&#878;",
            "value": "878",
            "group": "letters",
        },
        {
            "label": "combining latin small letter x",
            "icon": "&#879;",
            "value": "879",
            "group": "letters",
        },
        {
            "label": "plus sign",
            "icon": "&#43;",
            "value": "43",
            "group": "math",
        },
        {
            "label": "minus sign",
            "icon": "&#8722;",
            "value": "8722",
            "group": "math",
        },
        {
            "label": "multiplication sign",
            "icon": "&#215;",
            "value": "215",
            "group": "math",
        },
        {
            "label": "division sign",
            "icon": "&#247;",
            "value": "247",
            "group": "math",
        },
        {
            "label": "equal sign",
            "icon": "&#61;",
            "value": "61",
            "group": "math",
        },
        {
            "label": "not equal to sign",
            "icon": "&#8800;",
            "value": "8800",
            "group": "math",
        },
        {
            "label": "plus or minus sign",
            "icon": "&#177;",
            "value": "177",
            "group": "math",
        },
        {
            "label": "not sign",
            "icon": "&#172;",
            "value": "172",
            "group": "math",
        },
        {
            "label": "less-than sign",
            "icon": "&#60;",
            "value": "60",
            "group": "math",
        },
        {
            "label": "greater-than sign",
            "icon": "&#62;",
            "value": "62",
            "group": "math",
        },
        {
            "label": "equal to or less-than sign",
            "icon": "&#8924;",
            "value": "8924",
            "group": "math",
        },
        {
            "label": "equal to or greater-than sign",
            "icon": "&#8925;",
            "value": "8925",
            "group": "math",
        },
        {
            "label": "degree sign",
            "icon": "&#176;",
            "value": "176",
            "group": "math",
        },
        {
            "label": "superscript one",
            "icon": "&#185;",
            "value": "185",
            "group": "math",
        },
        {
            "label": "superscript two",
            "icon": "&#178;",
            "value": "178",
            "group": "math",
        },
        {
            "label": "superscript three",
            "icon": "&#179;",
            "value": "179",
            "group": "math",
        },
        {
            "label": "function",
            "icon": "&#402;",
            "value": "402",
            "group": "math",
        },
        {
            "label": "percent sign",
            "icon": "&#37;",
            "value": "37",
            "group": "math",
        },
        {
            "label": "per mille sign",
            "icon": "&#137;",
            "value": "137",
            "group": "math",
        },
        {
            "label": "per ten thousand sign",
            "icon": "&#8241;",
            "value": "8241",
            "group": "math",
        },
        {
            "label": "for all",
            "icon": "&#8704;",
            "value": "8704",
            "group": "math",
        },
        {
            "label": "complement",
            "icon": "&#8705;",
            "value": "8705",
            "group": "math",
        },
        {
            "label": "partial differential",
            "icon": "&#8706;",
            "value": "8706",
            "group": "math",
        },
        {
            "label": "there exists",
            "icon": "&#8707;",
            "value": "8707",
            "group": "math",
        },
        {
            "label": "there does not exist",
            "icon": "&#8708;",
            "value": "8708",
            "group": "math",
        },
        {
            "label": "empty set",
            "icon": "&#8709;",
            "value": "8709",
            "group": "math",
        },
        {
            "label": "increment",
            "icon": "&#8710;",
            "value": "8710",
            "group": "math",
        },
        {
            "label": "nabla",
            "icon": "&#8711;",
            "value": "8711",
            "group": "math",
        },
        {
            "label": "element of",
            "icon": "&#8712;",
            "value": "8712",
            "group": "math",
        },
        {
            "label": "not an element of",
            "icon": "&#8713;",
            "value": "8713",
            "group": "math",
        },
        {
            "label": "small element of",
            "icon": "&#8714;",
            "value": "8714",
            "group": "math",
        },
        {
            "label": "contains as member",
            "icon": "&#8715;",
            "value": "8715",
            "group": "math",
        },
        {
            "label": "does not contain as member",
            "icon": "&#8716;",
            "value": "8716",
            "group": "math",
        },
        {
            "label": "small contains as member",
            "icon": "&#8717;",
            "value": "8717",
            "group": "math",
        },
        {
            "label": "end of proof",
            "icon": "&#8718;",
            "value": "8718",
            "group": "math",
        },
        {
            "label": "n-ary product",
            "icon": "&#8719;",
            "value": "8719",
            "group": "math",
        },
        {
            "label": "n-ary coproduct",
            "icon": "&#8720;",
            "value": "8720",
            "group": "math",
        },
        {
            "label": "n-ary summation",
            "icon": "&#8721;",
            "value": "8721",
            "group": "math",
        },
        {
            "label": "minus-or-plus sign",
            "icon": "&#8723;",
            "value": "8723",
            "group": "math",
        },
        {
            "label": "dot plus",
            "icon": "&#8724;",
            "value": "8724",
            "group": "math",
        },
        {
            "label": "division slash",
            "icon": "&#8725;",
            "value": "8725",
            "group": "math",
        },
        {
            "label": "set minus",
            "icon": "&#8726;",
            "value": "8726",
            "group": "math",
        },
        {
            "label": "asterisk operator",
            "icon": "&#8727;",
            "value": "8727",
            "group": "math",
        },
        {
            "label": "ring operator",
            "icon": "&#8728;",
            "value": "8728",
            "group": "math",
        },
        {
            "label": "bullet operator",
            "icon": "&#8729;",
            "value": "8729",
            "group": "math",
        },
        {
            "label": "square root",
            "icon": "&#8730;",
            "value": "8730",
            "group": "math",
        },
        {
            "label": "cube root",
            "icon": "&#8731;",
            "value": "8731",
            "group": "math",
        },
        {
            "label": "fourth root",
            "icon": "&#8732;",
            "value": "8732",
            "group": "math",
        },
        {
            "label": "proportional to",
            "icon": "&#8733;",
            "value": "8733",
            "group": "math",
        },
        {
            "label": "infinity",
            "icon": "&#8734;",
            "value": "8734",
            "group": "math",
        },
        {
            "label": "right angle",
            "icon": "&#8735;",
            "value": "8735",
            "group": "math",
        },
        {
            "label": "angle",
            "icon": "&#8736;",
            "value": "8736",
            "group": "math",
        },
        {
            "label": "measured angle",
            "icon": "&#8737;",
            "value": "8737",
            "group": "math",
        },
        {
            "label": "spherical angle",
            "icon": "&#8738;",
            "value": "8738",
            "group": "math",
        },
        {
            "label": "divides",
            "icon": "&#8739;",
            "value": "8739",
            "group": "math",
        },
        {
            "label": "does not divide",
            "icon": "&#8740;",
            "value": "8740",
            "group": "math",
        },
        {
            "label": "parallel to",
            "icon": "&#8741;",
            "value": "8741",
            "group": "math",
        },
        {
            "label": "not parallel to",
            "icon": "&#8742;",
            "value": "8742",
            "group": "math",
        },
        {
            "label": "logical and",
            "icon": "&#8743;",
            "value": "8743",
            "group": "math",
        },
        {
            "label": "logical or",
            "icon": "&#8744;",
            "value": "8744",
            "group": "math",
        },
        {
            "label": "intersection",
            "icon": "&#8745;",
            "value": "8745",
            "group": "math",
        },
        {
            "label": "union",
            "icon": "&#8746;",
            "value": "8746",
            "group": "math",
        },
        {
            "label": "integral",
            "icon": "&#8747;",
            "value": "8747",
            "group": "math",
        },
        {
            "label": "double integral",
            "icon": "&#8748;",
            "value": "8748",
            "group": "math",
        },
        {
            "label": "triple integral",
            "icon": "&#8749;",
            "value": "8749",
            "group": "math",
        },
        {
            "label": "contour integral",
            "icon": "&#8750;",
            "value": "8750",
            "group": "math",
        },
        {
            "label": "surface integral",
            "icon": "&#8751;",
            "value": "8751",
            "group": "math",
        },
        {
            "label": "volume integral",
            "icon": "&#8752;",
            "value": "8752",
            "group": "math",
        },
        {
            "label": "clockwise integral",
            "icon": "&#8753;",
            "value": "8753",
            "group": "math",
        },
        {
            "label": "clockwise contour integral",
            "icon": "&#8754;",
            "value": "8754",
            "group": "math",
        },
        {
            "label": "anticlockwise contour integral",
            "icon": "&#8755;",
            "value": "8755",
            "group": "math",
        },
        {
            "label": "therefore",
            "icon": "&#8756;",
            "value": "8756",
            "group": "math",
        },
        {
            "label": "because",
            "icon": "&#8757;",
            "value": "8757",
            "group": "math",
        },
        {
            "label": "ratio",
            "icon": "&#8758;",
            "value": "8758",
            "group": "math",
        },
        {
            "label": "proportion",
            "icon": "&#8759;",
            "value": "8759",
            "group": "math",
        },
        {
            "label": "dot minus",
            "icon": "&#8760;",
            "value": "8760",
            "group": "math",
        },
        {
            "label": "excess",
            "icon": "&#8761;",
            "value": "8761",
            "group": "math",
        },
        {
            "label": "geometric proportion",
            "icon": "&#8762;",
            "value": "8762",
            "group": "math",
        },
        {
            "label": "homothetic",
            "icon": "&#8763;",
            "value": "8763",
            "group": "math",
        },
        {
            "label": "tilde operator",
            "icon": "&#8764;",
            "value": "8764",
            "group": "math",
        },
        {
            "label": "reversed tilde",
            "icon": "&#8765;",
            "value": "8765",
            "group": "math",
        },
        {
            "label": "inverted lazy s",
            "icon": "&#8766;",
            "value": "8766",
            "group": "math",
        },
        {
            "label": "sine wave",
            "icon": "&#8767;",
            "value": "8767",
            "group": "math",
        },
        {
            "label": "wreath product",
            "icon": "&#8768;",
            "value": "8768",
            "group": "math",
        },
        {
            "label": "not tilde",
            "icon": "&#8769;",
            "value": "8769",
            "group": "math",
        },
        {
            "label": "minus tilde",
            "icon": "&#8770;",
            "value": "8770",
            "group": "math",
        },
        {
            "label": "asymptotically equal to",
            "icon": "&#8771;",
            "value": "8771",
            "group": "math",
        },
        {
            "label": "not asymptotically equal to",
            "icon": "&#8772;",
            "value": "8772",
            "group": "math",
        },
        {
            "label": "approximately equal to",
            "icon": "&#8773;",
            "value": "8773",
            "group": "math",
        },
        {
            "label": "approximately but not actually equal to",
            "icon": "&#8774;",
            "value": "8774",
            "group": "math",
        },
        {
            "label": "neither approximately nor actually equal to",
            "icon": "&#8775;",
            "value": "8775",
            "group": "math",
        },
        {
            "label": "almost equal to",
            "icon": "&#8776;",
            "value": "8776",
            "group": "math",
        },
        {
            "label": "not almost equal to",
            "icon": "&#8777;",
            "value": "8777",
            "group": "math",
        },
        {
            "label": "almost equal or equal to",
            "icon": "&#8778;",
            "value": "8778",
            "group": "math",
        },
        {
            "label": "triple tilde",
            "icon": "&#8779;",
            "value": "8779",
            "group": "math",
        },
        {
            "label": "all equal to",
            "icon": "&#8780;",
            "value": "8780",
            "group": "math",
        },
        {
            "label": "equivalent to",
            "icon": "&#8781;",
            "value": "8781",
            "group": "math",
        },
        {
            "label": "geometrically equivalent to",
            "icon": "&#8782;",
            "value": "8782",
            "group": "math",
        },
        {
            "label": "difference between",
            "icon": "&#8783;",
            "value": "8783",
            "group": "math",
        },
        {
            "label": "approaches the limit",
            "icon": "&#8784;",
            "value": "8784",
            "group": "math",
        },
        {
            "label": "geometrically equal to",
            "icon": "&#8785;",
            "value": "8785",
            "group": "math",
        },
        {
            "label": "approximately equal to or the image of",
            "icon": "&#8786;",
            "value": "8786",
            "group": "math",
        },
        {
            "label": "image of or approximately equal to",
            "icon": "&#8787;",
            "value": "8787",
            "group": "math",
        },
        {
            "label": "colon equals",
            "icon": "&#8788;",
            "value": "8788",
            "group": "math",
        },
        {
            "label": "equals colon",
            "icon": "&#8789;",
            "value": "8789",
            "group": "math",
        },
        {
            "label": "ring in equal to",
            "icon": "&#8790;",
            "value": "8790",
            "group": "math",
        },
        {
            "label": "ring equal to",
            "icon": "&#8791;",
            "value": "8791",
            "group": "math",
        },
        {
            "label": "corresponds to",
            "icon": "&#8792;",
            "value": "8792",
            "group": "math",
        },
        {
            "label": "estimates",
            "icon": "&#8793;",
            "value": "8793",
            "group": "math",
        },
        {
            "label": "equiangular to",
            "icon": "&#8794;",
            "value": "8794",
            "group": "math",
        },
        {
            "label": "star equals",
            "icon": "&#8795;",
            "value": "8795",
            "group": "math",
        },
        {
            "label": "delta equal to",
            "icon": "&#8796;",
            "value": "8796",
            "group": "math",
        },
        {
            "label": "equal to by definition",
            "icon": "&#8797;",
            "value": "8797",
            "group": "math",
        },
        {
            "label": "measured by",
            "icon": "&#8798;",
            "value": "8798",
            "group": "math",
        },
        {
            "label": "questioned equal to",
            "icon": "&#8799;",
            "value": "8799",
            "group": "math",
        },
        {
            "label": "identical to",
            "icon": "&#8801;",
            "value": "8801",
            "group": "math",
        },
        {
            "label": "not identical to",
            "icon": "&#8802;",
            "value": "8802",
            "group": "math",
        },
        {
            "label": "strictly equivalent to",
            "icon": "&#8803;",
            "value": "8803",
            "group": "math",
        },
        {
            "label": "less-than or equal to",
            "icon": "&#8804;",
            "value": "8804",
            "group": "math",
        },
        {
            "label": "greater-than or equal to",
            "icon": "&#8805;",
            "value": "8805",
            "group": "math",
        },
        {
            "label": "less-than over equal to",
            "icon": "&#8806;",
            "value": "8806",
            "group": "math",
        },
        {
            "label": "greater-than over equal to",
            "icon": "&#8807;",
            "value": "8807",
            "group": "math",
        },
        {
            "label": "less-than but not equal to",
            "icon": "&#8808;",
            "value": "8808",
            "group": "math",
        },
        {
            "label": "greater-than but not equal to",
            "icon": "&#8809;",
            "value": "8809",
            "group": "math",
        },
        {
            "label": "much less-than",
            "icon": "&#8810;",
            "value": "8810",
            "group": "math",
        },
        {
            "label": "much greater-than",
            "icon": "&#8811;",
            "value": "8811",
            "group": "math",
        },
        {
            "label": "between",
            "icon": "&#8812;",
            "value": "8812",
            "group": "math",
        },
        {
            "label": "not equivalent to",
            "icon": "&#8813;",
            "value": "8813",
            "group": "math",
        },
        {
            "label": "not less-than",
            "icon": "&#8814;",
            "value": "8814",
            "group": "math",
        },
        {
            "label": "not greater-than",
            "icon": "&#8815;",
            "value": "8815",
            "group": "math",
        },
        {
            "label": "neither less-than nor equal to",
            "icon": "&#8816;",
            "value": "8816",
            "group": "math",
        },
        {
            "label": "neither greater-than nor equal to",
            "icon": "&#8817;",
            "value": "8817",
            "group": "math",
        },
        {
            "label": "less-than or equivalent to",
            "icon": "&#8818;",
            "value": "8818",
            "group": "math",
        },
        {
            "label": "greater-than or equivalent to",
            "icon": "&#8819;",
            "value": "8819",
            "group": "math",
        },
        {
            "label": "neither less-than nor equivalent to",
            "icon": "&#8820;",
            "value": "8820",
            "group": "math",
        },
        {
            "label": "neither greater-than nor equivalent to",
            "icon": "&#8821;",
            "value": "8821",
            "group": "math",
        },
        {
            "label": "less-than or greater-than",
            "icon": "&#8822;",
            "value": "8822",
            "group": "math",
        },
        {
            "label": "greater-than or less-than",
            "icon": "&#8823;",
            "value": "8823",
            "group": "math",
        },
        {
            "label": "neither less-than nor greater-than",
            "icon": "&#8824;",
            "value": "8824",
            "group": "math",
        },
        {
            "label": "neither greater-than nor less-than",
            "icon": "&#8825;",
            "value": "8825",
            "group": "math",
        },
        {
            "label": "precedes",
            "icon": "&#8826;",
            "value": "8826",
            "group": "math",
        },
        {
            "label": "succeeds",
            "icon": "&#8827;",
            "value": "8827",
            "group": "math",
        },
        {
            "label": "precedes or equal to",
            "icon": "&#8828;",
            "value": "8828",
            "group": "math",
        },
        {
            "label": "succeeds or equal to",
            "icon": "&#8829;",
            "value": "8829",
            "group": "math",
        },
        {
            "label": "precedes or equivalent to",
            "icon": "&#8830;",
            "value": "8830",
            "group": "math",
        },
        {
            "label": "succeeds or equivalent to",
            "icon": "&#8831;",
            "value": "8831",
            "group": "math",
        },
        {
            "label": "does not precede",
            "icon": "&#8832;",
            "value": "8832",
            "group": "math",
        },
        {
            "label": "does not succeed",
            "icon": "&#8833;",
            "value": "8833",
            "group": "math",
        },
        {
            "label": "subset of",
            "icon": "&#8834;",
            "value": "8834",
            "group": "math",
        },
        {
            "label": "superset of",
            "icon": "&#8835;",
            "value": "8835",
            "group": "math",
        },
        {
            "label": "not a subset of",
            "icon": "&#8836;",
            "value": "8836",
            "group": "math",
        },
        {
            "label": "not a superset of",
            "icon": "&#8837;",
            "value": "8837",
            "group": "math",
        },
        {
            "label": "subset of or equal to",
            "icon": "&#8838;",
            "value": "8838",
            "group": "math",
        },
        {
            "label": "superset of or equal to",
            "icon": "&#8839;",
            "value": "8839",
            "group": "math",
        },
        {
            "label": "neither a subset of nor equal to",
            "icon": "&#8840;",
            "value": "8840",
            "group": "math",
        },
        {
            "label": "neither a superset of nor equal to",
            "icon": "&#8841;",
            "value": "8841",
            "group": "math",
        },
        {
            "label": "subset of with not equal to",
            "icon": "&#8842;",
            "value": "8842",
            "group": "math",
        },
        {
            "label": "superset of with not equal to",
            "icon": "&#8843;",
            "value": "8843",
            "group": "math",
        },
        {
            "label": "multiset",
            "icon": "&#8844;",
            "value": "8844",
            "group": "math",
        },
        {
            "label": "multiset multiplication",
            "icon": "&#8845;",
            "value": "8845",
            "group": "math",
        },
        {
            "label": "multiset union",
            "icon": "&#8846;",
            "value": "8846",
            "group": "math",
        },
        {
            "label": "square image of",
            "icon": "&#8847;",
            "value": "8847",
            "group": "math",
        },
        {
            "label": "square original of",
            "icon": "&#8848;",
            "value": "8848",
            "group": "math",
        },
        {
            "label": "square image of or equal to",
            "icon": "&#8849;",
            "value": "8849",
            "group": "math",
        },
        {
            "label": "square original of or equal to",
            "icon": "&#8850;",
            "value": "8850",
            "group": "math",
        },
        {
            "label": "square cap",
            "icon": "&#8851;",
            "value": "8851",
            "group": "math",
        },
        {
            "label": "square cup",
            "icon": "&#8852;",
            "value": "8852",
            "group": "math",
        },
        {
            "label": "circled plus",
            "icon": "&#8853;",
            "value": "8853",
            "group": "math",
        },
        {
            "label": "circled minus",
            "icon": "&#8854;",
            "value": "8854",
            "group": "math",
        },
        {
            "label": "circled times",
            "icon": "&#8855;",
            "value": "8855",
            "group": "math",
        },
        {
            "label": "circled division slash",
            "icon": "&#8856;",
            "value": "8856",
            "group": "math",
        },
        {
            "label": "circled dot operator",
            "icon": "&#8857;",
            "value": "8857",
            "group": "math",
        },
        {
            "label": "circled ring operator",
            "icon": "&#8858;",
            "value": "8858",
            "group": "math",
        },
        {
            "label": "circled asterisk operator",
            "icon": "&#8859;",
            "value": "8859",
            "group": "math",
        },
        {
            "label": "circled equals",
            "icon": "&#8860;",
            "value": "8860",
            "group": "math",
        },
        {
            "label": "circled dash",
            "icon": "&#8861;",
            "value": "8861",
            "group": "math",
        },
        {
            "label": "squared plus",
            "icon": "&#8862;",
            "value": "8862",
            "group": "math",
        },
        {
            "label": "squared minus",
            "icon": "&#8863;",
            "value": "8863",
            "group": "math",
        },
        {
            "label": "squared times",
            "icon": "&#8864;",
            "value": "8864",
            "group": "math",
        },
        {
            "label": "squared dot operator",
            "icon": "&#8865;",
            "value": "8865",
            "group": "math",
        },
        {
            "label": "right tack",
            "icon": "&#8866;",
            "value": "8866",
            "group": "math",
        },
        {
            "label": "left tack",
            "icon": "&#8867;",
            "value": "8867",
            "group": "math",
        },
        {
            "label": "down tack",
            "icon": "&#8868;",
            "value": "8868",
            "group": "math",
        },
        {
            "label": "up tack",
            "icon": "&#8869;",
            "value": "8869",
            "group": "math",
        },
        {
            "label": "assertion",
            "icon": "&#8870;",
            "value": "8870",
            "group": "math",
        },
        {
            "label": "models",
            "icon": "&#8871;",
            "value": "8871",
            "group": "math",
        },
        {
            "label": "true",
            "icon": "&#8872;",
            "value": "8872",
            "group": "math",
        },
        {
            "label": "forces",
            "icon": "&#8873;",
            "value": "8873",
            "group": "math",
        },
        {
            "label": "triple vertical bar right turnstile",
            "icon": "&#8874;",
            "value": "8874",
            "group": "math",
        },
        {
            "label": "double vertical bar double right turnstile",
            "icon": "&#8875;",
            "value": "8875",
            "group": "math",
        },
        {
            "label": "does not prove",
            "icon": "&#8876;",
            "value": "8876",
            "group": "math",
        },
        {
            "label": "not true",
            "icon": "&#8877;",
            "value": "8877",
            "group": "math",
        },
        {
            "label": "does not force",
            "icon": "&#8878;",
            "value": "8878",
            "group": "math",
        },
        {
            "label": "negated double vertical bar double right turnstile",
            "icon": "&#8879;",
            "value": "8879",
            "group": "math",
        },
        {
            "label": "precedes under relation",
            "icon": "&#8880;",
            "value": "8880",
            "group": "math",
        },
        {
            "label": "succeeds under relation",
            "icon": "&#8881;",
            "value": "8881",
            "group": "math",
        },
        {
            "label": "normal subgroup of",
            "icon": "&#8882;",
            "value": "8882",
            "group": "math",
        },
        {
            "label": "contains as normal subgroup",
            "icon": "&#8883;",
            "value": "8883",
            "group": "math",
        },
        {
            "label": "normal subgroup of or equal to",
            "icon": "&#8884;",
            "value": "8884",
            "group": "math",
        },
        {
            "label": "contains as normal subgroup or equal to",
            "icon": "&#8885;",
            "value": "8885",
            "group": "math",
        },
        {
            "label": "original of",
            "icon": "&#8886;",
            "value": "8886",
            "group": "math",
        },
        {
            "label": "image of",
            "icon": "&#8887;",
            "value": "8887",
            "group": "math",
        },
        {
            "label": "multimap",
            "icon": "&#8888;",
            "value": "8888",
            "group": "math",
        },
        {
            "label": "hermitian conjugate matrix",
            "icon": "&#8889;",
            "value": "8889",
            "group": "math",
        },
        {
            "label": "intercalate",
            "icon": "&#8890;",
            "value": "8890",
            "group": "math",
        },
        {
            "label": "xor",
            "icon": "&#8891;",
            "value": "8891",
            "group": "math",
        },
        {
            "label": "nand",
            "icon": "&#8892;",
            "value": "8892",
            "group": "math",
        },
        {
            "label": "nor",
            "icon": "&#8893;",
            "value": "8893",
            "group": "math",
        },
        {
            "label": "right angle with arc",
            "icon": "&#8894;",
            "value": "8894",
            "group": "math",
        },
        {
            "label": "right triangle",
            "icon": "&#8895;",
            "value": "8895",
            "group": "math",
        },
        {
            "label": "n-ary logical and",
            "icon": "&#8896;",
            "value": "8896",
            "group": "math",
        },
        {
            "label": "n-ary logical or",
            "icon": "&#8897;",
            "value": "8897",
            "group": "math",
        },
        {
            "label": "n-ary intersection",
            "icon": "&#8898;",
            "value": "8898",
            "group": "math",
        },
        {
            "label": "n-ary union",
            "icon": "&#8899;",
            "value": "8899",
            "group": "math",
        },
        {
            "label": "diamond operator",
            "icon": "&#8900;",
            "value": "8900",
            "group": "math",
        },
        {
            "label": "dot operator",
            "icon": "&#8901;",
            "value": "8901",
            "group": "math",
        },
        {
            "label": "star operator",
            "icon": "&#8902;",
            "value": "8902",
            "group": "math",
        },
        {
            "label": "division times",
            "icon": "&#8903;",
            "value": "8903",
            "group": "math",
        },
        {
            "label": "bowtie",
            "icon": "&#8904;",
            "value": "8904",
            "group": "math",
        },
        {
            "label": "left normal factor semidirect product",
            "icon": "&#8905;",
            "value": "8905",
            "group": "math",
        },
        {
            "label": "right normal factor semidirect product",
            "icon": "&#8906;",
            "value": "8906",
            "group": "math",
        },
        {
            "label": "left semidirect product",
            "icon": "&#8907;",
            "value": "8907",
            "group": "math",
        },
        {
            "label": "right semidirect product",
            "icon": "&#8908;",
            "value": "8908",
            "group": "math",
        },
        {
            "label": "reversed tilde equals",
            "icon": "&#8909;",
            "value": "8909",
            "group": "math",
        },
        {
            "label": "curly logical or",
            "icon": "&#8910;",
            "value": "8910",
            "group": "math",
        },
        {
            "label": "curly logical and",
            "icon": "&#8911;",
            "value": "8911",
            "group": "math",
        },
        {
            "label": "double subset",
            "icon": "&#8912;",
            "value": "8912",
            "group": "math",
        },
        {
            "label": "double superset",
            "icon": "&#8913;",
            "value": "8913",
            "group": "math",
        },
        {
            "label": "double intersection",
            "icon": "&#8914;",
            "value": "8914",
            "group": "math",
        },
        {
            "label": "double union",
            "icon": "&#8915;",
            "value": "8915",
            "group": "math",
        },
        {
            "label": "pitchfork",
            "icon": "&#8916;",
            "value": "8916",
            "group": "math",
        },
        {
            "label": "equal and parallel to",
            "icon": "&#8917;",
            "value": "8917",
            "group": "math",
        },
        {
            "label": "less-than with dot",
            "icon": "&#8918;",
            "value": "8918",
            "group": "math",
        },
        {
            "label": "greater-than with dot",
            "icon": "&#8919;",
            "value": "8919",
            "group": "math",
        },
        {
            "label": "very much less-than",
            "icon": "&#8920;",
            "value": "8920",
            "group": "math",
        },
        {
            "label": "very much greater-than",
            "icon": "&#8921;",
            "value": "8921",
            "group": "math",
        },
        {
            "label": "less-than equal to or greater-than",
            "icon": "&#8922;",
            "value": "8922",
            "group": "math",
        },
        {
            "label": "greater-than equal to or less-than",
            "icon": "&#8923;",
            "value": "8923",
            "group": "math",
        },
        {
            "label": "equal to or precedes",
            "icon": "&#8926;",
            "value": "8926",
            "group": "math",
        },
        {
            "label": "equal to or succeeds",
            "icon": "&#8927;",
            "value": "8927",
            "group": "math",
        },
        {
            "label": "does not precede or equal",
            "icon": "&#8928;",
            "value": "8928",
            "group": "math",
        },
        {
            "label": "does not succeed or equal",
            "icon": "&#8929;",
            "value": "8929",
            "group": "math",
        },
        {
            "label": "not square image of or equal to",
            "icon": "&#8930;",
            "value": "8930",
            "group": "math",
        },
        {
            "label": "not square original of or equal to",
            "icon": "&#8931;",
            "value": "8931",
            "group": "math",
        },
        {
            "label": "square image of or not equal to",
            "icon": "&#8932;",
            "value": "8932",
            "group": "math",
        },
        {
            "label": "square original of or not equal to",
            "icon": "&#8933;",
            "value": "8933",
            "group": "math",
        },
        {
            "label": "less-than but not equivalent to",
            "icon": "&#8934;",
            "value": "8934",
            "group": "math",
        },
        {
            "label": "greater-than but not equivalent to",
            "icon": "&#8935;",
            "value": "8935",
            "group": "math",
        },
        {
            "label": "precedes but not equivalent to",
            "icon": "&#8936;",
            "value": "8936",
            "group": "math",
        },
        {
            "label": "succeeds but not equivalent to",
            "icon": "&#8937;",
            "value": "8937",
            "group": "math",
        },
        {
            "label": "not normal subgroup of",
            "icon": "&#8938;",
            "value": "8938",
            "group": "math",
        },
        {
            "label": "does not contain as normal subgroup",
            "icon": "&#8939;",
            "value": "8939",
            "group": "math",
        },
        {
            "label": "not normal subgroup of or equal to",
            "icon": "&#8940;",
            "value": "8940",
            "group": "math",
        },
        {
            "label": "does not contain as normal subgroup or equal",
            "icon": "&#8941;",
            "value": "8941",
            "group": "math",
        },
        {
            "label": "vertical ellipsis",
            "icon": "&#8942;",
            "value": "8942",
            "group": "math",
        },
        {
            "label": "midline horizontal ellipsis",
            "icon": "&#8943;",
            "value": "8943",
            "group": "math",
        },
        {
            "label": "up right diagonal ellipsis",
            "icon": "&#8944;",
            "value": "8944",
            "group": "math",
        },
        {
            "label": "down right diagonal ellipsis",
            "icon": "&#8945;",
            "value": "8945",
            "group": "math",
        },
        {
            "label": "element of with long horizontal stroke",
            "icon": "&#8946;",
            "value": "8946",
            "group": "math",
        },
        {
            "label": "element of with vertical bar at end of horizontal stroke",
            "icon": "&#8947;",
            "value": "8947",
            "group": "math",
        },
        {
            "label": "small element of with vertical bar at end of horizontal stroke",
            "icon": "&#8948;",
            "value": "8948",
            "group": "math",
        },
        {
            "label": "element of with dot above",
            "icon": "&#8949;",
            "value": "8949",
            "group": "math",
        },
        {
            "label": "element of with overbar",
            "icon": "&#8950;",
            "value": "8950",
            "group": "math",
        },
        {
            "label": "small element of with overbar",
            "icon": "&#8951;",
            "value": "8951",
            "group": "math",
        },
        {
            "label": "element of with underbar",
            "icon": "&#8952;",
            "value": "8952",
            "group": "math",
        },
        {
            "label": "element of with two horizontal strokes",
            "icon": "&#8953;",
            "value": "8953",
            "group": "math",
        },
        {
            "label": "contains with long horizontal stroke",
            "icon": "&#8954;",
            "value": "8954",
            "group": "math",
        },
        {
            "label": "contains with vertical bar at end of horizontal stroke",
            "icon": "&#8955;",
            "value": "8955",
            "group": "math",
        },
        {
            "label": "small contains with vertical bar at end of horizontal stroke",
            "icon": "&#8956;",
            "value": "8956",
            "group": "math",
        },
        {
            "label": "contains with overbar",
            "icon": "&#8957;",
            "value": "8957",
            "group": "math",
        },
        {
            "label": "small contains with overbar",
            "icon": "&#8958;",
            "value": "8958",
            "group": "math",
        },
        {
            "label": "z notation bag membership",
            "icon": "&#8959;",
            "value": "8959",
            "group": "math",
        },
        {
            "label": "superscript zero",
            "icon": "&#8304;",
            "value": "8304",
            "group": "math",
        },
        {
            "label": "superscript latin small letter i",
            "icon": "&#8305;",
            "value": "8305",
            "group": "math",
        },
        {
            "label": "superscript four",
            "icon": "&#8308;",
            "value": "8308",
            "group": "math",
        },
        {
            "label": "superscript five",
            "icon": "&#8309;",
            "value": "8309",
            "group": "math",
        },
        {
            "label": "superscript six",
            "icon": "&#8310;",
            "value": "8310",
            "group": "math",
        },
        {
            "label": "superscript seven",
            "icon": "&#8311;",
            "value": "8311",
            "group": "math",
        },
        {
            "label": "superscript eight",
            "icon": "&#8312;",
            "value": "8312",
            "group": "math",
        },
        {
            "label": "superscript nine",
            "icon": "&#8313;",
            "value": "8313",
            "group": "math",
        },
        {
            "label": "superscript plus sign",
            "icon": "&#8314;",
            "value": "8314",
            "group": "math",
        },
        {
            "label": "superscript minus",
            "icon": "&#8315;",
            "value": "8315",
            "group": "math",
        },
        {
            "label": "superscript equals sign",
            "icon": "&#8316;",
            "value": "8316",
            "group": "math",
        },
        {
            "label": "superscript left parenthesis",
            "icon": "&#8317;",
            "value": "8317",
            "group": "math",
        },
        {
            "label": "superscript right parenthesis",
            "icon": "&#8318;",
            "value": "8318",
            "group": "math",
        },
        {
            "label": "superscript latin small letter n",
            "icon": "&#8319;",
            "value": "8319",
            "group": "math",
        },
        {
            "label": "subscript zero",
            "icon": "&#8320;",
            "value": "8320",
            "group": "math",
        },
        {
            "label": "subscript one",
            "icon": "&#8321;",
            "value": "8321",
            "group": "math",
        },
        {
            "label": "subscript two",
            "icon": "&#8322;",
            "value": "8322",
            "group": "math",
        },
        {
            "label": "subscript three",
            "icon": "&#8323;",
            "value": "8323",
            "group": "math",
        },
        {
            "label": "subscript four",
            "icon": "&#8324;",
            "value": "8324",
            "group": "math",
        },
        {
            "label": "subscript five",
            "icon": "&#8325;",
            "value": "8325",
            "group": "math",
        },
        {
            "label": "subscript six",
            "icon": "&#8326;",
            "value": "8326",
            "group": "math",
        },
        {
            "label": "subscript seven",
            "icon": "&#8327;",
            "value": "8327",
            "group": "math",
        },
        {
            "label": "subscript eight",
            "icon": "&#8328;",
            "value": "8328",
            "group": "math",
        },
        {
            "label": "subscript nine",
            "icon": "&#8329;",
            "value": "8329",
            "group": "math",
        },
        {
            "label": "subscript plus sign",
            "icon": "&#8330;",
            "value": "8330",
            "group": "math",
        },
        {
            "label": "subscript minus",
            "icon": "&#8331;",
            "value": "8331",
            "group": "math",
        },
        {
            "label": "subscript equals sign",
            "icon": "&#8332;",
            "value": "8332",
            "group": "math",
        },
        {
            "label": "subscript left parenthesis",
            "icon": "&#8333;",
            "value": "8333",
            "group": "math",
        },
        {
            "label": "subscript right parenthesis",
            "icon": "&#8334;",
            "value": "8334",
            "group": "math",
        },
        {
            "label": "latin subscript small letter a",
            "icon": "&#8336;",
            "value": "8336",
            "group": "math",
        },
        {
            "label": "latin subscript small letter e",
            "icon": "&#8337;",
            "value": "8337",
            "group": "math",
        },
        {
            "label": "latin subscript small letter o",
            "icon": "&#8338;",
            "value": "8338",
            "group": "math",
        },
        {
            "label": "latin subscript small letter x",
            "icon": "&#8339;",
            "value": "8339",
            "group": "math",
        },
        {
            "label": "latin subscript small letter schwa",
            "icon": "&#8340;",
            "value": "8340",
            "group": "math",
        },
        {
            "label": "zero",
            "icon": "&#48;",
            "value": "48",
            "group": "numbers",
        },
        {
            "label": "one",
            "icon": "&#49;",
            "value": "49",
            "group": "numbers",
        },
        {
            "label": "two",
            "icon": "&#50;",
            "value": "50",
            "group": "numbers",
        },
        {
            "label": "three",
            "icon": "&#51;",
            "value": "51",
            "group": "numbers",
        },
        {
            "label": "four",
            "icon": "&#52;",
            "value": "52",
            "group": "numbers",
        },
        {
            "label": "five",
            "icon": "&#53;",
            "value": "53",
            "group": "numbers",
        },
        {
            "label": "six",
            "icon": "&#54;",
            "value": "54",
            "group": "numbers",
        },
        {
            "label": "seven",
            "icon": "&#55;",
            "value": "55",
            "group": "numbers",
        },
        {
            "label": "eight",
            "icon": "&#56;",
            "value": "56",
            "group": "numbers",
        },
        {
            "label": "nine",
            "icon": "&#57;",
            "value": "57",
            "group": "numbers",
        },
        {
            "label": "fraction one quarter",
            "icon": "&#188;",
            "value": "188",
            "group": "numbers",
        },
        {
            "label": "fraction one half",
            "icon": "&#189;",
            "value": "189",
            "group": "numbers",
        },
        {
            "label": "fraction three quarters",
            "icon": "&#190;",
            "value": "190",
            "group": "numbers",
        },
        {
            "label": "vulgar fraction one seventh",
            "icon": "&#8528;",
            "value": "8528",
            "group": "numbers",
        },
        {
            "label": "vulgar fraction one ninth",
            "icon": "&#8529;",
            "value": "8529",
            "group": "numbers",
        },
        {
            "label": "vulgar fraction one tenth",
            "icon": "&#8530;",
            "value": "8530",
            "group": "numbers",
        },
        {
            "label": "vulgar fraction one third",
            "icon": "&#8531;",
            "value": "8531",
            "group": "numbers",
        },
        {
            "label": "vulgar fraction two thirds",
            "icon": "&#8532;",
            "value": "8532",
            "group": "numbers",
        },
        {
            "label": "vulgar fraction one fifth",
            "icon": "&#8533;",
            "value": "8533",
            "group": "numbers",
        },
        {
            "label": "vulgar fraction two fifths",
            "icon": "&#8534;",
            "value": "8534",
            "group": "numbers",
        },
        {
            "label": "vulgar fraction three fifths",
            "icon": "&#8535;",
            "value": "8535",
            "group": "numbers",
        },
        {
            "label": "vulgar fraction four fifths",
            "icon": "&#8536;",
            "value": "8536",
            "group": "numbers",
        },
        {
            "label": "vulgar fraction one sixth",
            "icon": "&#8537;",
            "value": "8537",
            "group": "numbers",
        },
        {
            "label": "vulgar fraction five sixths",
            "icon": "&#8538;",
            "value": "8538",
            "group": "numbers",
        },
        {
            "label": "vulgar fraction one eighth",
            "icon": "&#8539;",
            "value": "8539",
            "group": "numbers",
        },
        {
            "label": "vulgar fraction three eighths",
            "icon": "&#8540;",
            "value": "8540",
            "group": "numbers",
        },
        {
            "label": "vulgar fraction five eighths",
            "icon": "&#8541;",
            "value": "8541",
            "group": "numbers",
        },
        {
            "label": "vulgar fraction seven eighths",
            "icon": "&#8542;",
            "value": "8542",
            "group": "numbers",
        },
        {
            "label": "fraction numerator one",
            "icon": "&#8543;",
            "value": "8543",
            "group": "numbers",
        },
        {
            "label": "roman numeral one",
            "icon": "&#8544;",
            "value": "8544",
            "group": "numbers",
        },
        {
            "label": "roman numeral two",
            "icon": "&#8545;",
            "value": "8545",
            "group": "numbers",
        },
        {
            "label": "roman numeral three",
            "icon": "&#8546;",
            "value": "8546",
            "group": "numbers",
        },
        {
            "label": "roman numeral four",
            "icon": "&#8547;",
            "value": "8547",
            "group": "numbers",
        },
        {
            "label": "roman numeral five",
            "icon": "&#8548;",
            "value": "8548",
            "group": "numbers",
        },
        {
            "label": "roman numeral six",
            "icon": "&#8549;",
            "value": "8549",
            "group": "numbers",
        },
        {
            "label": "roman numeral seven",
            "icon": "&#8550;",
            "value": "8550",
            "group": "numbers",
        },
        {
            "label": "roman numeral eight",
            "icon": "&#8551;",
            "value": "8551",
            "group": "numbers",
        },
        {
            "label": "roman numeral nine",
            "icon": "&#8552;",
            "value": "8552",
            "group": "numbers",
        },
        {
            "label": "roman numeral ten",
            "icon": "&#8553;",
            "value": "8553",
            "group": "numbers",
        },
        {
            "label": "roman numeral eleven",
            "icon": "&#8554;",
            "value": "8554",
            "group": "numbers",
        },
        {
            "label": "roman numeral twelve",
            "icon": "&#8555;",
            "value": "8555",
            "group": "numbers",
        },
        {
            "label": "roman numeral fifty",
            "icon": "&#8556;",
            "value": "8556",
            "group": "numbers",
        },
        {
            "label": "roman numeral one hundred",
            "icon": "&#8557;",
            "value": "8557",
            "group": "numbers",
        },
        {
            "label": "roman numeral five hundred",
            "icon": "&#8558;",
            "value": "8558",
            "group": "numbers",
        },
        {
            "label": "roman numeral one thousand",
            "icon": "&#8559;",
            "value": "8559",
            "group": "numbers",
        },
        {
            "label": "small roman numeral one",
            "icon": "&#8560;",
            "value": "8560",
            "group": "numbers",
        },
        {
            "label": "small roman numeral two",
            "icon": "&#8561;",
            "value": "8561",
            "group": "numbers",
        },
        {
            "label": "small roman numeral three",
            "icon": "&#8562;",
            "value": "8562",
            "group": "numbers",
        },
        {
            "label": "small roman numeral four",
            "icon": "&#8563;",
            "value": "8563",
            "group": "numbers",
        },
        {
            "label": "small roman numeral five",
            "icon": "&#8564;",
            "value": "8564",
            "group": "numbers",
        },
        {
            "label": "small roman numeral six",
            "icon": "&#8565;",
            "value": "8565",
            "group": "numbers",
        },
        {
            "label": "small roman numeral seven",
            "icon": "&#8566;",
            "value": "8566",
            "group": "numbers",
        },
        {
            "label": "small roman numeral eight",
            "icon": "&#8567;",
            "value": "8567",
            "group": "numbers",
        },
        {
            "label": "small roman numeral nine",
            "icon": "&#8568;",
            "value": "8568",
            "group": "numbers",
        },
        {
            "label": "small roman numeral ten",
            "icon": "&#8569;",
            "value": "8569",
            "group": "numbers",
        },
        {
            "label": "small roman numeral eleven",
            "icon": "&#8570;",
            "value": "8570",
            "group": "numbers",
        },
        {
            "label": "small roman numeral twelve",
            "icon": "&#8571;",
            "value": "8571",
            "group": "numbers",
        },
        {
            "label": "small roman numeral fifty",
            "icon": "&#8572;",
            "value": "8572",
            "group": "numbers",
        },
        {
            "label": "small roman numeral one hundred",
            "icon": "&#8573;",
            "value": "8573",
            "group": "numbers",
        },
        {
            "label": "small roman numeral five hundred",
            "icon": "&#8574;",
            "value": "8574",
            "group": "numbers",
        },
        {
            "label": "small roman numeral one thousand",
            "icon": "&#8575;",
            "value": "8575",
            "group": "numbers",
        },
        {
            "label": "roman numeral one thousand c d",
            "icon": "&#8576;",
            "value": "8576",
            "group": "numbers",
        },
        {
            "label": "roman numeral five thousand",
            "icon": "&#8577;",
            "value": "8577",
            "group": "numbers",
        },
        {
            "label": "roman numeral ten thousand",
            "icon": "&#8578;",
            "value": "8578",
            "group": "numbers",
        },
        {
            "label": "roman numeral reversed one hundred",
            "icon": "&#8579;",
            "value": "8579",
            "group": "numbers",
        },
        {
            "label": "latin small letter reversed c",
            "icon": "&#8580;",
            "value": "8580",
            "group": "numbers",
        },
        {
            "label": "roman numeral six late form",
            "icon": "&#8581;",
            "value": "8581",
            "group": "numbers",
        },
        {
            "label": "roman numeral fifty early form",
            "icon": "&#8582;",
            "value": "8582",
            "group": "numbers",
        },
        {
            "label": "vulgar fraction zero thirds",
            "icon": "&#8585;",
            "value": "8585",
            "group": "numbers",
        },
        {
            "label": "exclamation mark",
            "icon": "&#33;",
            "value": "33",
            "group": "punctuation",
        },
        {
            "label": "quotation mark",
            "icon": "&#34;",
            "value": "34",
            "group": "punctuation",
        },
        {
            "label": "number sign",
            "icon": "&#35;",
            "value": "35",
            "group": "punctuation",
        },
        {
            "label": "percent sign",
            "icon": "&#37;",
            "value": "37",
            "group": "punctuation",
        },
        {
            "label": "ampersand",
            "icon": "&#38;",
            "value": "38",
            "group": "punctuation",
        },
        {
            "label": "apostrophe",
            "icon": "&#39;",
            "value": "39",
            "group": "punctuation",
        },
        {
            "label": "left parenthesis",
            "icon": "&#40;",
            "value": "40",
            "group": "punctuation",
        },
        {
            "label": "right parenthesis",
            "icon": "&#41;",
            "value": "41",
            "group": "punctuation",
        },
        {
            "label": "asterisk",
            "icon": "&#42;",
            "value": "42",
            "group": "punctuation",
        },
        {
            "label": "comma",
            "icon": "&#44;",
            "value": "44",
            "group": "punctuation",
        },
        {
            "label": "period",
            "icon": "&#46;",
            "value": "46",
            "group": "punctuation",
        },
        {
            "label": "slash",
            "icon": "&#47;",
            "value": "47",
            "group": "punctuation",
        },
        {
            "label": "colon",
            "icon": "&#58;",
            "value": "58",
            "group": "punctuation",
        },
        {
            "label": "semicolon",
            "icon": "&#59;",
            "value": "59",
            "group": "punctuation",
        },
        {
            "label": "question mark",
            "icon": "&#63;",
            "value": "63",
            "group": "punctuation",
        },
        {
            "label": "at symbol",
            "icon": "&#64;",
            "value": "64",
            "group": "punctuation",
        },
        {
            "label": "left bracket",
            "icon": "&#91;",
            "value": "91",
            "group": "punctuation",
        },
        {
            "label": "backslash",
            "icon": "&#92;",
            "value": "92",
            "group": "punctuation",
        },
        {
            "label": "right bracket",
            "icon": "&#93;",
            "value": "93",
            "group": "punctuation",
        },
        {
            "label": "caret",
            "icon": "&#94;",
            "value": "94",
            "group": "punctuation",
        },
        {
            "label": "underscore",
            "icon": "&#95;",
            "value": "95",
            "group": "punctuation",
        },
        {
            "label": "grave accent",
            "icon": "&#96;",
            "value": "96",
            "group": "punctuation",
        },
        {
            "label": "left brace",
            "icon": "&#123;",
            "value": "123",
            "group": "punctuation",
        },
        {
            "label": "vertical bar",
            "icon": "&#124;",
            "value": "124",
            "group": "punctuation",
        },
        {
            "label": "right brace",
            "icon": "&#125;",
            "value": "125",
            "group": "punctuation",
        },
        {
            "label": "tilde",
            "icon": "&#126;",
            "value": "126",
            "group": "punctuation",
        },
        {
            "label": "non-breaking space",
            "icon": "&#160;",
            "value": "160",
            "group": "punctuation",
        },
        {
            "label": "inverted exclamation mark",
            "icon": "&#161;",
            "value": "161",
            "group": "punctuation",
        },
        {
            "label": "broken vertical bar",
            "icon": "&#166;",
            "value": "166",
            "group": "punctuation",
        },
        {
            "label": "section sign",
            "icon": "&#167;",
            "value": "167",
            "group": "punctuation",
        },
        {
            "label": "umlaut",
            "icon": "&#168;",
            "value": "168",
            "group": "punctuation",
        },
        {
            "label": "copyright sign",
            "icon": "&#169;",
            "value": "169",
            "group": "punctuation",
        },
        {
            "label": "feminine ordinal indicator",
            "icon": "&#170;",
            "value": "170",
            "group": "punctuation",
        },
        {
            "label": "double left-pointing angle quotation mark",
            "icon": "&#171;",
            "value": "171",
            "group": "punctuation",
        },
        {
            "label": "not sign",
            "icon": "&#172;",
            "value": "172",
            "group": "punctuation",
        },
        {
            "label": "soft hyphen",
            "icon": "&#173;",
            "value": "173",
            "group": "punctuation",
        },
        {
            "label": "registered trade mark sign",
            "icon": "&#174;",
            "value": "174",
            "group": "punctuation",
        },
        {
            "label": "spacing macron",
            "icon": "&#175;",
            "value": "175",
            "group": "punctuation",
        },
        {
            "label": "superscript two",
            "icon": "&#178;",
            "value": "178",
            "group": "punctuation",
        },
        {
            "label": "superscript three",
            "icon": "&#179;",
            "value": "179",
            "group": "punctuation",
        },
        {
            "label": "acute accent",
            "icon": "&#180;",
            "value": "180",
            "group": "punctuation",
        },
        {
            "label": "micro sign",
            "icon": "&#181;",
            "value": "181",
            "group": "punctuation",
        },
        {
            "label": "paragraph sign",
            "icon": "&#182;",
            "value": "182",
            "group": "punctuation",
        },
        {
            "label": "middle dot",
            "icon": "&#183;",
            "value": "183",
            "group": "punctuation",
        },
        {
            "label": "spacing cedilla",
            "icon": "&#184;",
            "value": "184",
            "group": "punctuation",
        },
        {
            "label": "superscript one",
            "icon": "&#185;",
            "value": "185",
            "group": "punctuation",
        },
        {
            "label": "masculine ordinal indicator",
            "icon": "&#186;",
            "value": "186",
            "group": "punctuation",
        },
        {
            "label": "double right-pointing angle quotation mark",
            "icon": "&#187;",
            "value": "187",
            "group": "punctuation",
        },
        {
            "label": "inverted question mark",
            "icon": "&#191;",
            "value": "191",
            "group": "punctuation",
        },
        {
            "label": "hyphen",
            "icon": "&#8208;",
            "value": "8208",
            "group": "punctuation",
        },
        {
            "label": "non-breaking hyphen",
            "icon": "&#8209;",
            "value": "8209",
            "group": "punctuation",
        },
        {
            "label": "figure dash",
            "icon": "&#8210;",
            "value": "8210",
            "group": "punctuation",
        },
        {
            "label": "en dash",
            "icon": "&#8211;",
            "value": "8211",
            "group": "punctuation",
        },
        {
            "label": "em dash",
            "icon": "&#8212;",
            "value": "8212",
            "group": "punctuation",
        },
        {
            "label": "horizontal bar",
            "icon": "&#8213;",
            "value": "8213",
            "group": "punctuation",
        },
        {
            "label": "double vertical line",
            "icon": "&#8214;",
            "value": "8214",
            "group": "punctuation",
        },
        {
            "label": "double low line",
            "icon": "&#8215;",
            "value": "8215",
            "group": "punctuation",
        },
        {
            "label": "left single quotation mark",
            "icon": "&#8216;",
            "value": "8216",
            "group": "punctuation",
        },
        {
            "label": "right single quotation mark",
            "icon": "&#8217;",
            "value": "8217",
            "group": "punctuation",
        },
        {
            "label": "single low-9 quotation mark",
            "icon": "&#8218;",
            "value": "8218",
            "group": "punctuation",
        },
        {
            "label": "single high-reversed-9 quotation mark",
            "icon": "&#8219;",
            "value": "8219",
            "group": "punctuation",
        },
        {
            "label": "left double quotation mark",
            "icon": "&#8220;",
            "value": "8220",
            "group": "punctuation",
        },
        {
            "label": "right double quotation mark",
            "icon": "&#8221;",
            "value": "8221",
            "group": "punctuation",
        },
        {
            "label": "double low-9 quotation mark",
            "icon": "&#8222;",
            "value": "8222",
            "group": "punctuation",
        },
        {
            "label": "double high-reversed-9 quotation mark",
            "icon": "&#8223;",
            "value": "8223",
            "group": "punctuation",
        },
        {
            "label": "dagger",
            "icon": "&#8224;",
            "value": "8224",
            "group": "punctuation",
        },
        {
            "label": "double dagger",
            "icon": "&#8225;",
            "value": "8225",
            "group": "punctuation",
        },
        {
            "label": "bullet",
            "icon": "&#8226;",
            "value": "8226",
            "group": "punctuation",
        },
        {
            "label": "triangular bullet",
            "icon": "&#8227;",
            "value": "8227",
            "group": "punctuation",
        },
        {
            "label": "one dot leader",
            "icon": "&#8228;",
            "value": "8228",
            "group": "punctuation",
        },
        {
            "label": "two dot leader",
            "icon": "&#8229;",
            "value": "8229",
            "group": "punctuation",
        },
        {
            "label": "horizontal ellipsis",
            "icon": "&#8230;",
            "value": "8230",
            "group": "punctuation",
        },
        {
            "label": "hyphenation point",
            "icon": "&#8231;",
            "value": "8231",
            "group": "punctuation",
        },
        {
            "label": "per mille sign",
            "icon": "&#8240;",
            "value": "8240",
            "group": "punctuation",
        },
        {
            "label": "per ten thousand sign",
            "icon": "&#8241;",
            "value": "8241",
            "group": "punctuation",
        },
        {
            "label": "prime",
            "icon": "&#8242;",
            "value": "8242",
            "group": "punctuation",
        },
        {
            "label": "double prime",
            "icon": "&#8243;",
            "value": "8243",
            "group": "punctuation",
        },
        {
            "label": "triple prime",
            "icon": "&#8244;",
            "value": "8244",
            "group": "punctuation",
        },
        {
            "label": "reversed prime",
            "icon": "&#8245;",
            "value": "8245",
            "group": "punctuation",
        },
        {
            "label": "reversed double prime",
            "icon": "&#8246;",
            "value": "8246",
            "group": "punctuation",
        },
        {
            "label": "reversed triple prime",
            "icon": "&#8247;",
            "value": "8247",
            "group": "punctuation",
        },
        {
            "label": "caret",
            "icon": "&#8248;",
            "value": "8248",
            "group": "punctuation",
        },
        {
            "label": "single left-pointing angle quotation mark",
            "icon": "&#8249;",
            "value": "8249",
            "group": "punctuation",
        },
        {
            "label": "single right-pointing angle quotation mark",
            "icon": "&#8250;",
            "value": "8250",
            "group": "punctuation",
        },
        {
            "label": "reference mark",
            "icon": "&#8251;",
            "value": "8251",
            "group": "punctuation",
        },
        {
            "label": "double exclamation mark",
            "icon": "&#8252;",
            "value": "8252",
            "group": "punctuation",
        },
        {
            "label": "interrobang",
            "icon": "&#8253;",
            "value": "8253",
            "group": "punctuation",
        },
        {
            "label": "overline",
            "icon": "&#8254;",
            "value": "8254",
            "group": "punctuation",
        },
        {
            "label": "undertie",
            "icon": "&#8255;",
            "value": "8255",
            "group": "punctuation",
        },
        {
            "label": "character tie",
            "icon": "&#8256;",
            "value": "8256",
            "group": "punctuation",
        },
        {
            "label": "caret insertion point",
            "icon": "&#8257;",
            "value": "8257",
            "group": "punctuation",
        },
        {
            "label": "asterism",
            "icon": "&#8258;",
            "value": "8258",
            "group": "punctuation",
        },
        {
            "label": "hyphen bullet",
            "icon": "&#8259;",
            "value": "8259",
            "group": "punctuation",
        },
        {
            "label": "fraction slash",
            "icon": "&#8260;",
            "value": "8260",
            "group": "punctuation",
        },
        {
            "label": "left square bracket with quill",
            "icon": "&#8261;",
            "value": "8261",
            "group": "punctuation",
        },
        {
            "label": "right square bracket with quill",
            "icon": "&#8262;",
            "value": "8262",
            "group": "punctuation",
        },
        {
            "label": "double question mark",
            "icon": "&#8263;",
            "value": "8263",
            "group": "punctuation",
        },
        {
            "label": "question exclamation mark",
            "icon": "&#8264;",
            "value": "8264",
            "group": "punctuation",
        },
        {
            "label": "exclamation question mark",
            "icon": "&#8265;",
            "value": "8265",
            "group": "punctuation",
        },
        {
            "label": "tironian sign et",
            "icon": "&#8266;",
            "value": "8266",
            "group": "punctuation",
        },
        {
            "label": "reversed pilcrow sign",
            "icon": "&#8267;",
            "value": "8267",
            "group": "punctuation",
        },
        {
            "label": "black left bullet",
            "icon": "&#8268;",
            "value": "8268",
            "group": "punctuation",
        },
        {
            "label": "black right bullet",
            "icon": "&#8269;",
            "value": "8269",
            "group": "punctuation",
        },
        {
            "label": "low asterisk",
            "icon": "&#8270;",
            "value": "8270",
            "group": "punctuation",
        },
        {
            "label": "reversed semicolon",
            "icon": "&#8271;",
            "value": "8271",
            "group": "punctuation",
        },
        {
            "label": "close up",
            "icon": "&#8272;",
            "value": "8272",
            "group": "punctuation",
        },
        {
            "label": "two asterisks aligned vertically",
            "icon": "&#8273;",
            "value": "8273",
            "group": "punctuation",
        },
        {
            "label": "commercial minus sign",
            "icon": "&#8274;",
            "value": "8274",
            "group": "punctuation",
        },
        {
            "label": "swung dash",
            "icon": "&#8275;",
            "value": "8275",
            "group": "punctuation",
        },
        {
            "label": "inverted undertie",
            "icon": "&#8276;",
            "value": "8276",
            "group": "punctuation",
        },
        {
            "label": "flower punctuation mark",
            "icon": "&#8277;",
            "value": "8277",
            "group": "punctuation",
        },
        {
            "label": "three dot punctuation",
            "icon": "&#8278;",
            "value": "8278",
            "group": "punctuation",
        },
        {
            "label": "quadruple prime",
            "icon": "&#8279;",
            "value": "8279",
            "group": "punctuation",
        },
        {
            "label": "four dot punctuation",
            "icon": "&#8280;",
            "value": "8280",
            "group": "punctuation",
        },
        {
            "label": "five dot punctuation",
            "icon": "&#8281;",
            "value": "8281",
            "group": "punctuation",
        },
        {
            "label": "two dot punctuation",
            "icon": "&#8282;",
            "value": "8282",
            "group": "punctuation",
        },
        {
            "label": "four dot mark",
            "icon": "&#8283;",
            "value": "8283",
            "group": "punctuation",
        },
        {
            "label": "dotted cross",
            "icon": "&#8284;",
            "value": "8284",
            "group": "punctuation",
        },
        {
            "label": "tricolon",
            "icon": "&#8285;",
            "value": "8285",
            "group": "punctuation",
        },
        {
            "label": "vertical four dots",
            "icon": "&#8286;",
            "value": "8286",
            "group": "punctuation",
        },
        {
            "label": "trade mark sign",
            "icon": "&#8482;",
            "value": "8482",
            "group": "punctuation",
        },
        {
            "label": "copyright sign",
            "icon": "&#169;",
            "value": "169",
            "group": "symbols",
        },
        {
            "label": "registered trade mark sign",
            "icon": "&#174;",
            "value": "174",
            "group": "symbols",
        },
        {
            "label": "trade mark sign",
            "icon": "&#8482;",
            "value": "8482",
            "group": "symbols",
        },
        {
            "label": "at symbol",
            "icon": "&#64;",
            "value": "64",
            "group": "symbols",
        },
        {
            "label": "paragraph sign",
            "icon": "&#182;",
            "value": "182",
            "group": "symbols",
        },
        {
            "label": "section sign",
            "icon": "&#167;",
            "value": "167",
            "group": "symbols",
        },
        {
            "label": "account of",
            "icon": "&#8448;",
            "value": "8448",
            "group": "symbols",
        },
        {
            "label": "addressed to the subject",
            "icon": "&#8449;",
            "value": "8449",
            "group": "symbols",
        },
        {
            "label": "double-struck capital c",
            "icon": "&#8450;",
            "value": "8450",
            "group": "symbols",
        },
        {
            "label": "degree celsius",
            "icon": "&#8451;",
            "value": "8451",
            "group": "symbols",
        },
        {
            "label": "centre line symbol",
            "icon": "&#8452;",
            "value": "8452",
            "group": "symbols",
        },
        {
            "label": "care of",
            "icon": "&#8453;",
            "value": "8453",
            "group": "symbols",
        },
        {
            "label": "cada una",
            "icon": "&#8454;",
            "value": "8454",
            "group": "symbols",
        },
        {
            "label": "euler constant",
            "icon": "&#8455;",
            "value": "8455",
            "group": "symbols",
        },
        {
            "label": "scruple",
            "icon": "&#8456;",
            "value": "8456",
            "group": "symbols",
        },
        {
            "label": "degree fahrenheit",
            "icon": "&#8457;",
            "value": "8457",
            "group": "symbols",
        },
        {
            "label": "script small g",
            "icon": "&#8458;",
            "value": "8458",
            "group": "symbols",
        },
        {
            "label": "script capital h",
            "icon": "&#8459;",
            "value": "8459",
            "group": "symbols",
        },
        {
            "label": "black-letter capital h",
            "icon": "&#8460;",
            "value": "8460",
            "group": "symbols",
        },
        {
            "label": "double-struck capital h",
            "icon": "&#8461;",
            "value": "8461",
            "group": "symbols",
        },
        {
            "label": "planck constant",
            "icon": "&#8462;",
            "value": "8462",
            "group": "symbols",
        },
        {
            "label": "planck constant over two pi",
            "icon": "&#8463;",
            "value": "8463",
            "group": "symbols",
        },
        {
            "label": "script capital i",
            "icon": "&#8464;",
            "value": "8464",
            "group": "symbols",
        },
        {
            "label": "black-letter capital i",
            "icon": "&#8465;",
            "value": "8465",
            "group": "symbols",
        },
        {
            "label": "script capital l",
            "icon": "&#8466;",
            "value": "8466",
            "group": "symbols",
        },
        {
            "label": "script small l",
            "icon": "&#8467;",
            "value": "8467",
            "group": "symbols",
        },
        {
            "label": "l b bar symbol",
            "icon": "&#8468;",
            "value": "8468",
            "group": "symbols",
        },
        {
            "label": "double-struck capital n",
            "icon": "&#8469;",
            "value": "8469",
            "group": "symbols",
        },
        {
            "label": "numero sign",
            "icon": "&#8470;",
            "value": "8470",
            "group": "symbols",
        },
        {
            "label": "sound recording copyright",
            "icon": "&#8471;",
            "value": "8471",
            "group": "symbols",
        },
        {
            "label": "script capital p",
            "icon": "&#8472;",
            "value": "8472",
            "group": "symbols",
        },
        {
            "label": "double-struck capital p",
            "icon": "&#8473;",
            "value": "8473",
            "group": "symbols",
        },
        {
            "label": "double-struck capital q",
            "icon": "&#8474;",
            "value": "8474",
            "group": "symbols",
        },
        {
            "label": "script capital r",
            "icon": "&#8475;",
            "value": "8475",
            "group": "symbols",
        },
        {
            "label": "black-letter capital r",
            "icon": "&#8476;",
            "value": "8476",
            "group": "symbols",
        },
        {
            "label": "double-struck capital r",
            "icon": "&#8477;",
            "value": "8477",
            "group": "symbols",
        },
        {
            "label": "prescription take",
            "icon": "&#8478;",
            "value": "8478",
            "group": "symbols",
        },
        {
            "label": "response",
            "icon": "&#8479;",
            "value": "8479",
            "group": "symbols",
        },
        {
            "label": "service mark",
            "icon": "&#8480;",
            "value": "8480",
            "group": "symbols",
        },
        {
            "label": "telephone sign",
            "icon": "&#8481;",
            "value": "8481",
            "group": "symbols",
        },
        {
            "label": "versicle",
            "icon": "&#8483;",
            "value": "8483",
            "group": "symbols",
        },
        {
            "label": "double-struck capital z",
            "icon": "&#8484;",
            "value": "8484",
            "group": "symbols",
        },
        {
            "label": "ounce sign",
            "icon": "&#8485;",
            "value": "8485",
            "group": "symbols",
        },
        {
            "label": "ohm sign",
            "icon": "&#8486;",
            "value": "8486",
            "group": "symbols",
        },
        {
            "label": "inverted ohm sign",
            "icon": "&#8487;",
            "value": "8487",
            "group": "symbols",
        },
        {
            "label": "black-letter capital z",
            "icon": "&#8488;",
            "value": "8488",
            "group": "symbols",
        },
        {
            "label": "turned greek small letter iota",
            "icon": "&#8489;",
            "value": "8489",
            "group": "symbols",
        },
        {
            "label": "kelvin sign",
            "icon": "&#8490;",
            "value": "8490",
            "group": "symbols",
        },
        {
            "label": "angstrom sign",
            "icon": "&#8491;",
            "value": "8491",
            "group": "symbols",
        },
        {
            "label": "script capital b",
            "icon": "&#8492;",
            "value": "8492",
            "group": "symbols",
        },
        {
            "label": "black-letter capital c",
            "icon": "&#8493;",
            "value": "8493",
            "group": "symbols",
        },
        {
            "label": "estimated symbol",
            "icon": "&#8494;",
            "value": "8494",
            "group": "symbols",
        },
        {
            "label": "script small e",
            "icon": "&#8495;",
            "value": "8495",
            "group": "symbols",
        },
        {
            "label": "script capital e",
            "icon": "&#8496;",
            "value": "8496",
            "group": "symbols",
        },
        {
            "label": "script capital f",
            "icon": "&#8497;",
            "value": "8497",
            "group": "symbols",
        },
        {
            "label": "turned capital f",
            "icon": "&#8498;",
            "value": "8498",
            "group": "symbols",
        },
        {
            "label": "script capital m",
            "icon": "&#8499;",
            "value": "8499",
            "group": "symbols",
        },
        {
            "label": "script small o",
            "icon": "&#8500;",
            "value": "8500",
            "group": "symbols",
        },
        {
            "label": "alef symbol",
            "icon": "&#8501;",
            "value": "8501",
            "group": "symbols",
        },
        {
            "label": "bet symbol",
            "icon": "&#8502;",
            "value": "8502",
            "group": "symbols",
        },
        {
            "label": "gimel symbol",
            "icon": "&#8503;",
            "value": "8503",
            "group": "symbols",
        },
        {
            "label": "dalet symbol",
            "icon": "&#8504;",
            "value": "8504",
            "group": "symbols",
        },
        {
            "label": "information source",
            "icon": "&#8505;",
            "value": "8505",
            "group": "symbols",
        },
        {
            "label": "rotated capital q",
            "icon": "&#8506;",
            "value": "8506",
            "group": "symbols",
        },
        {
            "label": "facsimile sign",
            "icon": "&#8507;",
            "value": "8507",
            "group": "symbols",
        },
        {
            "label": "double-struck small pi",
            "icon": "&#8508;",
            "value": "8508",
            "group": "symbols",
        },
        {
            "label": "double-struck small gamma",
            "icon": "&#8509;",
            "value": "8509",
            "group": "symbols",
        },
        {
            "label": "double-struck capital gamma",
            "icon": "&#8510;",
            "value": "8510",
            "group": "symbols",
        },
        {
            "label": "double-struck capital pi",
            "icon": "&#8511;",
            "value": "8511",
            "group": "symbols",
        },
        {
            "label": "double-struck n-ary summation",
            "icon": "&#8512;",
            "value": "8512",
            "group": "symbols",
        },
        {
            "label": "turned sans-serif capital g",
            "icon": "&#8513;",
            "value": "8513",
            "group": "symbols",
        },
        {
            "label": "turned sans-serif capital l",
            "icon": "&#8514;",
            "value": "8514",
            "group": "symbols",
        },
        {
            "label": "reversed sans-serif capital l",
            "icon": "&#8515;",
            "value": "8515",
            "group": "symbols",
        },
        {
            "label": "turned sans-serif capital y",
            "icon": "&#8516;",
            "value": "8516",
            "group": "symbols",
        },
        {
            "label": "double-struck italic capital d",
            "icon": "&#8517;",
            "value": "8517",
            "group": "symbols",
        },
        {
            "label": "double-struck italic small d",
            "icon": "&#8518;",
            "value": "8518",
            "group": "symbols",
        },
        {
            "label": "double-struck italic small e",
            "icon": "&#8519;",
            "value": "8519",
            "group": "symbols",
        },
        {
            "label": "double-struck italic small i",
            "icon": "&#8520;",
            "value": "8520",
            "group": "symbols",
        },
        {
            "label": "double-struck italic small j",
            "icon": "&#8521;",
            "value": "8521",
            "group": "symbols",
        },
        {
            "label": "property line",
            "icon": "&#8522;",
            "value": "8522",
            "group": "symbols",
        },
        {
            "label": "turned ampersand",
            "icon": "&#8523;",
            "value": "8523",
            "group": "symbols",
        },
        {
            "label": "aktieselskab",
            "icon": "&#8525;",
            "value": "8525",
            "group": "symbols",
        },
        {
            "label": "turned small f",
            "icon": "&#8526;",
            "value": "8526",
            "group": "symbols",
        },
        {
            "label": "black sun with rays",
            "icon": "&#9728;",
            "value": "9728",
            "group": "symbols",
        },
        {
            "label": "cloud",
            "icon": "&#9729;",
            "value": "9729",
            "group": "symbols",
        },
        {
            "label": "umbrella",
            "icon": "&#9730;",
            "value": "9730",
            "group": "symbols",
        },
        {
            "label": "snowman",
            "icon": "&#9731;",
            "value": "9731",
            "group": "symbols",
        },
        {
            "label": "comet",
            "icon": "&#9732;",
            "value": "9732",
            "group": "symbols",
        },
        {
            "label": "black star",
            "icon": "&#9733;",
            "value": "9733",
            "group": "symbols",
        },
        {
            "label": "white star",
            "icon": "&#9734;",
            "value": "9734",
            "group": "symbols",
        },
        {
            "label": "lightning",
            "icon": "&#9735;",
            "value": "9735",
            "group": "symbols",
        },
        {
            "label": "thunderstorm",
            "icon": "&#9736;",
            "value": "9736",
            "group": "symbols",
        },
        {
            "label": "sun",
            "icon": "&#9737;",
            "value": "9737",
            "group": "symbols",
        },
        {
            "label": "ascending node",
            "icon": "&#9738;",
            "value": "9738",
            "group": "symbols",
        },
        {
            "label": "descending node",
            "icon": "&#9739;",
            "value": "9739",
            "group": "symbols",
        },
        {
            "label": "conjunction",
            "icon": "&#9740;",
            "value": "9740",
            "group": "symbols",
        },
        {
            "label": "opposition",
            "icon": "&#9741;",
            "value": "9741",
            "group": "symbols",
        },
        {
            "label": "black telephone",
            "icon": "&#9742;",
            "value": "9742",
            "group": "symbols",
        },
        {
            "label": "white telephone",
            "icon": "&#9743;",
            "value": "9743",
            "group": "symbols",
        },
        {
            "label": "ballot box",
            "icon": "&#9744;",
            "value": "9744",
            "group": "symbols",
        },
        {
            "label": "ballot box with check",
            "icon": "&#9745;",
            "value": "9745",
            "group": "symbols",
        },
        {
            "label": "ballot box with x",
            "icon": "&#9746;",
            "value": "9746",
            "group": "symbols",
        },
        {
            "label": "saltire",
            "icon": "&#9747;",
            "value": "9747",
            "group": "symbols",
        },
        {
            "label": "white shogi piece",
            "icon": "&#9750;",
            "value": "9750",
            "group": "symbols",
        },
        {
            "label": "black shogi piece",
            "icon": "&#9751;",
            "value": "9751",
            "group": "symbols",
        },
        {
            "label": "shamrock",
            "icon": "&#9752;",
            "value": "9752",
            "group": "symbols",
        },
        {
            "label": "reversed rotated floral heart bullet",
            "icon": "&#9753;",
            "value": "9753",
            "group": "symbols",
        },
        {
            "label": "black left pointing index",
            "icon": "&#9754;",
            "value": "9754",
            "group": "symbols",
        },
        {
            "label": "black right pointing index",
            "icon": "&#9755;",
            "value": "9755",
            "group": "symbols",
        },
        {
            "label": "white left pointing index",
            "icon": "&#9756;",
            "value": "9756",
            "group": "symbols",
        },
        {
            "label": "white up pointing index",
            "icon": "&#9757;",
            "value": "9757",
            "group": "symbols",
        },
        {
            "label": "white right pointing index",
            "icon": "&#9758;",
            "value": "9758",
            "group": "symbols",
        },
        {
            "label": "white down pointing index",
            "icon": "&#9759;",
            "value": "9759",
            "group": "symbols",
        },
        {
            "label": "skull and crossbones",
            "icon": "&#9760;",
            "value": "9760",
            "group": "symbols",
        },
        {
            "label": "caution sign",
            "icon": "&#9761;",
            "value": "9761",
            "group": "symbols",
        },
        {
            "label": "radioactive sign",
            "icon": "&#9762;",
            "value": "9762",
            "group": "symbols",
        },
        {
            "label": "biohazard sign",
            "icon": "&#9763;",
            "value": "9763",
            "group": "symbols",
        },
        {
            "label": "caduceus",
            "icon": "&#9764;",
            "value": "9764",
            "group": "symbols",
        },
        {
            "label": "ankh",
            "icon": "&#9765;",
            "value": "9765",
            "group": "symbols",
        },
        {
            "label": "orthodox cross",
            "icon": "&#9766;",
            "value": "9766",
            "group": "symbols",
        },
        {
            "label": "chi rho",
            "icon": "&#9767;",
            "value": "9767",
            "group": "symbols",
        },
        {
            "label": "cross of lorraine",
            "icon": "&#9768;",
            "value": "9768",
            "group": "symbols",
        },
        {
            "label": "cross of jerusalem",
            "icon": "&#9769;",
            "value": "9769",
            "group": "symbols",
        },
        {
            "label": "star and crescent",
            "icon": "&#9770;",
            "value": "9770",
            "group": "symbols",
        },
        {
            "label": "farsi symbol",
            "icon": "&#9771;",
            "value": "9771",
            "group": "symbols",
        },
        {
            "label": "adi shakti",
            "icon": "&#9772;",
            "value": "9772",
            "group": "symbols",
        },
        {
            "label": "hammer and sickle",
            "icon": "&#9773;",
            "value": "9773",
            "group": "symbols",
        },
        {
            "label": "peace symbol",
            "icon": "&#9774;",
            "value": "9774",
            "group": "symbols",
        },
        {
            "label": "yin yang",
            "icon": "&#9775;",
            "value": "9775",
            "group": "symbols",
        },
        {
            "label": "trigram for heaven",
            "icon": "&#9776;",
            "value": "9776",
            "group": "symbols",
        },
        {
            "label": "trigram for lake",
            "icon": "&#9777;",
            "value": "9777",
            "group": "symbols",
        },
        {
            "label": "trigram for fire",
            "icon": "&#9778;",
            "value": "9778",
            "group": "symbols",
        },
        {
            "label": "trigram for thunder",
            "icon": "&#9779;",
            "value": "9779",
            "group": "symbols",
        },
        {
            "label": "trigram for wind",
            "icon": "&#9780;",
            "value": "9780",
            "group": "symbols",
        },
        {
            "label": "trigram for water",
            "icon": "&#9781;",
            "value": "9781",
            "group": "symbols",
        },
        {
            "label": "trigram for mountain",
            "icon": "&#9782;",
            "value": "9782",
            "group": "symbols",
        },
        {
            "label": "trigram for earth",
            "icon": "&#9783;",
            "value": "9783",
            "group": "symbols",
        },
        {
            "label": "wheel of dharma",
            "icon": "&#9784;",
            "value": "9784",
            "group": "symbols",
        },
        {
            "label": "white frowning face",
            "icon": "&#9785;",
            "value": "9785",
            "group": "symbols",
        },
        {
            "label": "white smiling face",
            "icon": "&#9786;",
            "value": "9786",
            "group": "symbols",
        },
        {
            "label": "black smiling face",
            "icon": "&#9787;",
            "value": "9787",
            "group": "symbols",
        },
        {
            "label": "white sun with rays",
            "icon": "&#9788;",
            "value": "9788",
            "group": "symbols",
        },
        {
            "label": "first quarter moon",
            "icon": "&#9789;",
            "value": "9789",
            "group": "symbols",
        },
        {
            "label": "last quarter moon",
            "icon": "&#9790;",
            "value": "9790",
            "group": "symbols",
        },
        {
            "label": "mercury",
            "icon": "&#9791;",
            "value": "9791",
            "group": "symbols",
        },
        {
            "label": "female sign",
            "icon": "&#9792;",
            "value": "9792",
            "group": "symbols",
        },
        {
            "label": "earth",
            "icon": "&#9793;",
            "value": "9793",
            "group": "symbols",
        },
        {
            "label": "male sign",
            "icon": "&#9794;",
            "value": "9794",
            "group": "symbols",
        },
        {
            "label": "jupiter",
            "icon": "&#9795;",
            "value": "9795",
            "group": "symbols",
        },
        {
            "label": "saturn",
            "icon": "&#9796;",
            "value": "9796",
            "group": "symbols",
        },
        {
            "label": "uranus",
            "icon": "&#9797;",
            "value": "9797",
            "group": "symbols",
        },
        {
            "label": "neptune",
            "icon": "&#9798;",
            "value": "9798",
            "group": "symbols",
        },
        {
            "label": "pluto",
            "icon": "&#9799;",
            "value": "9799",
            "group": "symbols",
        },
        {
            "label": "white chess king",
            "icon": "&#9812;",
            "value": "9812",
            "group": "symbols",
        },
        {
            "label": "white chess queen",
            "icon": "&#9813;",
            "value": "9813",
            "group": "symbols",
        },
        {
            "label": "white chess rook",
            "icon": "&#9814;",
            "value": "9814",
            "group": "symbols",
        },
        {
            "label": "white chess bishop",
            "icon": "&#9815;",
            "value": "9815",
            "group": "symbols",
        },
        {
            "label": "white chess knight",
            "icon": "&#9816;",
            "value": "9816",
            "group": "symbols",
        },
        {
            "label": "white chess pawn",
            "icon": "&#9817;",
            "value": "9817",
            "group": "symbols",
        },
        {
            "label": "black chess king",
            "icon": "&#9818;",
            "value": "9818",
            "group": "symbols",
        },
        {
            "label": "black chess queen",
            "icon": "&#9819;",
            "value": "9819",
            "group": "symbols",
        },
        {
            "label": "black chess rook",
            "icon": "&#9820;",
            "value": "9820",
            "group": "symbols",
        },
        {
            "label": "black chess bishop",
            "icon": "&#9821;",
            "value": "9821",
            "group": "symbols",
        },
        {
            "label": "black chess knight",
            "icon": "&#9822;",
            "value": "9822",
            "group": "symbols",
        },
        {
            "label": "black chess pawn",
            "icon": "&#9823;",
            "value": "9823",
            "group": "symbols",
        },
        {
            "label": "black spade suit",
            "icon": "&#9824;",
            "value": "9824",
            "group": "symbols",
        },
        {
            "label": "white heart suit",
            "icon": "&#9825;",
            "value": "9825",
            "group": "symbols",
        },
        {
            "label": "white diamond suit",
            "icon": "&#9826;",
            "value": "9826",
            "group": "symbols",
        },
        {
            "label": "black club suit",
            "icon": "&#9827;",
            "value": "9827",
            "group": "symbols",
        },
        {
            "label": "white spade suit",
            "icon": "&#9828;",
            "value": "9828",
            "group": "symbols",
        },
        {
            "label": "black heart suit",
            "icon": "&#9829;",
            "value": "9829",
            "group": "symbols",
        },
        {
            "label": "black diamond suit",
            "icon": "&#9830;",
            "value": "9830",
            "group": "symbols",
        },
        {
            "label": "white club suit",
            "icon": "&#9831;",
            "value": "9831",
            "group": "symbols",
        },
        {
            "label": "hot springs",
            "icon": "&#9832;",
            "value": "9832",
            "group": "symbols",
        },
        {
            "label": "quarter note",
            "icon": "&#9833;",
            "value": "9833",
            "group": "symbols",
        },
        {
            "label": "eighth note",
            "icon": "&#9834;",
            "value": "9834",
            "group": "symbols",
        },
        {
            "label": "beamed eighth notes",
            "icon": "&#9835;",
            "value": "9835",
            "group": "symbols",
        },
        {
            "label": "beamed sixteenth notes",
            "icon": "&#9836;",
            "value": "9836",
            "group": "symbols",
        },
        {
            "label": "music flat sign",
            "icon": "&#9837;",
            "value": "9837",
            "group": "symbols",
        },
        {
            "label": "music natural sign",
            "icon": "&#9838;",
            "value": "9838",
            "group": "symbols",
        },
        {
            "label": "music sharp sign",
            "icon": "&#9839;",
            "value": "9839",
            "group": "symbols",
        },
        {
            "label": "west syriac cross",
            "icon": "&#9840;",
            "value": "9840",
            "group": "symbols",
        },
        {
            "label": "east syriac cross",
            "icon": "&#9841;",
            "value": "9841",
            "group": "symbols",
        },
        {
            "label": "universal recycling symbol",
            "icon": "&#9842;",
            "value": "9842",
            "group": "symbols",
        },
        {
            "label": "recycling symbol for type-1 plastics",
            "icon": "&#9843;",
            "value": "9843",
            "group": "symbols",
        },
        {
            "label": "recycling symbol for type-2 plastics",
            "icon": "&#9844;",
            "value": "9844",
            "group": "symbols",
        },
        {
            "label": "recycling symbol for type-3 plastics",
            "icon": "&#9845;",
            "value": "9845",
            "group": "symbols",
        },
        {
            "label": "recycling symbol for type-4 plastics",
            "icon": "&#9846;",
            "value": "9846",
            "group": "symbols",
        },
        {
            "label": "recycling symbol for type-5 plastics",
            "icon": "&#9847;",
            "value": "9847",
            "group": "symbols",
        },
        {
            "label": "recycling symbol for type-6 plastics",
            "icon": "&#9848;",
            "value": "9848",
            "group": "symbols",
        },
        {
            "label": "recycling symbol for type-7 plastics",
            "icon": "&#9849;",
            "value": "9849",
            "group": "symbols",
        },
        {
            "label": "recycling symbol for generic materials",
            "icon": "&#9850;",
            "value": "9850",
            "group": "symbols",
        },
        {
            "label": "black universal recycling symbol",
            "icon": "&#9851;",
            "value": "9851",
            "group": "symbols",
        },
        {
            "label": "recycled paper symbol",
            "icon": "&#9852;",
            "value": "9852",
            "group": "symbols",
        },
        {
            "label": "partially-recycled paper symbol",
            "icon": "&#9853;",
            "value": "9853",
            "group": "symbols",
        },
        {
            "label": "permanent paper sign",
            "icon": "&#9854;",
            "value": "9854",
            "group": "symbols",
        },
        {
            "label": "die face-1",
            "icon": "&#9856;",
            "value": "9856",
            "group": "symbols",
        },
        {
            "label": "die face-2",
            "icon": "&#9857;",
            "value": "9857",
            "group": "symbols",
        },
        {
            "label": "die face-3",
            "icon": "&#9858;",
            "value": "9858",
            "group": "symbols",
        },
        {
            "label": "die face-4",
            "icon": "&#9859;",
            "value": "9859",
            "group": "symbols",
        },
        {
            "label": "die face-5",
            "icon": "&#9860;",
            "value": "9860",
            "group": "symbols",
        },
        {
            "label": "die face-6",
            "icon": "&#9861;",
            "value": "9861",
            "group": "symbols",
        },
        {
            "label": "white circle with dot right",
            "icon": "&#9862;",
            "value": "9862",
            "group": "symbols",
        },
        {
            "label": "white circle with two dots",
            "icon": "&#9863;",
            "value": "9863",
            "group": "symbols",
        },
        {
            "label": "black circle with white dot right",
            "icon": "&#9864;",
            "value": "9864",
            "group": "symbols",
        },
        {
            "label": "black circle with two white dots",
            "icon": "&#9865;",
            "value": "9865",
            "group": "symbols",
        },
        {
            "label": "monogram for yang",
            "icon": "&#9866;",
            "value": "9866",
            "group": "symbols",
        },
        {
            "label": "monogram for yin",
            "icon": "&#9867;",
            "value": "9867",
            "group": "symbols",
        },
        {
            "label": "digram for greater yang",
            "icon": "&#9868;",
            "value": "9868",
            "group": "symbols",
        },
        {
            "label": "digram for lesser yin",
            "icon": "&#9869;",
            "value": "9869",
            "group": "symbols",
        },
        {
            "label": "digram for lesser yang",
            "icon": "&#9870;",
            "value": "9870",
            "group": "symbols",
        },
        {
            "label": "digram for greater yin",
            "icon": "&#9871;",
            "value": "9871",
            "group": "symbols",
        },
        {
            "label": "white flag",
            "icon": "&#9872;",
            "value": "9872",
            "group": "symbols",
        },
        {
            "label": "black flag",
            "icon": "&#9873;",
            "value": "9873",
            "group": "symbols",
        },
        {
            "label": "hammer and pick",
            "icon": "&#9874;",
            "value": "9874",
            "group": "symbols",
        },
        {
            "label": "crossed swords",
            "icon": "&#9876;",
            "value": "9876",
            "group": "symbols",
        },
        {
            "label": "staff of aesculapius",
            "icon": "&#9877;",
            "value": "9877",
            "group": "symbols",
        },
        {
            "label": "scales",
            "icon": "&#9878;",
            "value": "9878",
            "group": "symbols",
        },
        {
            "label": "alembic",
            "icon": "&#9879;",
            "value": "9879",
            "group": "symbols",
        },
        {
            "label": "flower",
            "icon": "&#9880;",
            "value": "9880",
            "group": "symbols",
        },
        {
            "label": "gear",
            "icon": "&#9881;",
            "value": "9881",
            "group": "symbols",
        },
        {
            "label": "staff of hermes",
            "icon": "&#9882;",
            "value": "9882",
            "group": "symbols",
        },
        {
            "label": "atom symbol",
            "icon": "&#9883;",
            "value": "9883",
            "group": "symbols",
        },
        {
            "label": "fleur-de-lis",
            "icon": "&#9884;",
            "value": "9884",
            "group": "symbols",
        },
        {
            "label": "outlined white star",
            "icon": "&#9885;",
            "value": "9885",
            "group": "symbols",
        },
        {
            "label": "three lines converging right",
            "icon": "&#9886;",
            "value": "9886",
            "group": "symbols",
        },
        {
            "label": "three lines converging left",
            "icon": "&#9887;",
            "value": "9887",
            "group": "symbols",
        },
        {
            "label": "warning sign",
            "icon": "&#9888;",
            "value": "9888",
            "group": "symbols",
        },
        {
            "label": "doubled female sign",
            "icon": "&#9890;",
            "value": "9890",
            "group": "symbols",
        },
        {
            "label": "doubled male sign",
            "icon": "&#9891;",
            "value": "9891",
            "group": "symbols",
        },
        {
            "label": "interlocked female and male sign",
            "icon": "&#9892;",
            "value": "9892",
            "group": "symbols",
        },
        {
            "label": "male and female sign",
            "icon": "&#9893;",
            "value": "9893",
            "group": "symbols",
        },
        {
            "label": "male with stroke sign",
            "icon": "&#9894;",
            "value": "9894",
            "group": "symbols",
        },
        {
            "label": "male with stroke and male and female sign",
            "icon": "&#9895;",
            "value": "9895",
            "group": "symbols",
        },
        {
            "label": "vertical male with stroke sign",
            "icon": "&#9896;",
            "value": "9896",
            "group": "symbols",
        },
        {
            "label": "horizontal male with stroke sign",
            "icon": "&#9897;",
            "value": "9897",
            "group": "symbols",
        },
        {
            "label": "medium small white circle",
            "icon": "&#9900;",
            "value": "9900",
            "group": "symbols",
        },
        {
            "label": "marriage symbol",
            "icon": "&#9901;",
            "value": "9901",
            "group": "symbols",
        },
        {
            "label": "divorce symbol",
            "icon": "&#9902;",
            "value": "9902",
            "group": "symbols",
        },
        {
            "label": "unmarried partnership symbol",
            "icon": "&#9903;",
            "value": "9903",
            "group": "symbols",
        },
        {
            "label": "coffin",
            "icon": "&#9904;",
            "value": "9904",
            "group": "symbols",
        },
        {
            "label": "funeral urn",
            "icon": "&#9905;",
            "value": "9905",
            "group": "symbols",
        },
        {
            "label": "neuter",
            "icon": "&#9906;",
            "value": "9906",
            "group": "symbols",
        },
        {
            "label": "baseball",
            "icon": "&#9918;",
            "value": "9918",
            "group": "symbols",
        },
        {
            "label": "astronomical symbol for uranus",
            "icon": "&#9954;",
            "value": "9954",
            "group": "symbols",
        },
        {
            "label": "upper blade scissors",
            "icon": "&#9985;",
            "value": "9985",
            "group": "symbols",
        },
        {
            "label": "black scissors",
            "icon": "&#9986;",
            "value": "9986",
            "group": "symbols",
        },
        {
            "label": "lower blade scissors",
            "icon": "&#9987;",
            "value": "9987",
            "group": "symbols",
        },
        {
            "label": "white scissors",
            "icon": "&#9988;",
            "value": "9988",
            "group": "symbols",
        },
        {
            "label": "telephone location sign",
            "icon": "&#9990;",
            "value": "9990",
            "group": "symbols",
        },
        {
            "label": "tape drive",
            "icon": "&#9991;",
            "value": "9991",
            "group": "symbols",
        },
        {
            "label": "airplane",
            "icon": "&#9992;",
            "value": "9992",
            "group": "symbols",
        },
        {
            "label": "envelope",
            "icon": "&#9993;",
            "value": "9993",
            "group": "symbols",
        },
        {
            "label": "victory hand",
            "icon": "&#9996;",
            "value": "9996",
            "group": "symbols",
        },
        {
            "label": "writing hand",
            "icon": "&#9997;",
            "value": "9997",
            "group": "symbols",
        },
        {
            "label": "lower right pencil",
            "icon": "&#9998;",
            "value": "9998",
            "group": "symbols",
        },
        {
            "label": "pencil",
            "icon": "&#9999;",
            "value": "9999",
            "group": "symbols",
        },
        {
            "label": "upper right pencil",
            "icon": "&#10000;",
            "value": "10000",
            "group": "symbols",
        },
        {
            "label": "white nib",
            "icon": "&#10001;",
            "value": "10001",
            "group": "symbols",
        },
        {
            "label": "black nib",
            "icon": "&#10002;",
            "value": "10002",
            "group": "symbols",
        },
        {
            "label": "check mark",
            "icon": "&#10003;",
            "value": "10003",
            "group": "symbols",
        },
        {
            "label": "heavy check mark",
            "icon": "&#10004;",
            "value": "10004",
            "group": "symbols",
        },
        {
            "label": "multiplication x",
            "icon": "&#10005;",
            "value": "10005",
            "group": "symbols",
        },
        {
            "label": "heavy multiplication x",
            "icon": "&#10006;",
            "value": "10006",
            "group": "symbols",
        },
        {
            "label": "ballot x",
            "icon": "&#10007;",
            "value": "10007",
            "group": "symbols",
        },
        {
            "label": "heavy ballot x",
            "icon": "&#10008;",
            "value": "10008",
            "group": "symbols",
        },
        {
            "label": "outlined greek cross",
            "icon": "&#10009;",
            "value": "10009",
            "group": "symbols",
        },
        {
            "label": "heavy greek cross",
            "icon": "&#10010;",
            "value": "10010",
            "group": "symbols",
        },
        {
            "label": "open centre cross",
            "icon": "&#10011;",
            "value": "10011",
            "group": "symbols",
        },
        {
            "label": "heavy open centre cross",
            "icon": "&#10012;",
            "value": "10012",
            "group": "symbols",
        },
        {
            "label": "latin cross",
            "icon": "&#10013;",
            "value": "10013",
            "group": "symbols",
        },
        {
            "label": "shadowed white latin cross",
            "icon": "&#10014;",
            "value": "10014",
            "group": "symbols",
        },
        {
            "label": "outlined latin cross",
            "icon": "&#10015;",
            "value": "10015",
            "group": "symbols",
        },
        {
            "label": "maltese cross",
            "icon": "&#10016;",
            "value": "10016",
            "group": "symbols",
        },
        {
            "label": "star of david",
            "icon": "&#10017;",
            "value": "10017",
            "group": "symbols",
        },
        {
            "label": "four teardrop-spoked asterisk",
            "icon": "&#10018;",
            "value": "10018",
            "group": "symbols",
        },
        {
            "label": "four balloon-spoked asterisk",
            "icon": "&#10019;",
            "value": "10019",
            "group": "symbols",
        },
        {
            "label": "heavy four balloon-spoked asterisk",
            "icon": "&#10020;",
            "value": "10020",
            "group": "symbols",
        },
        {
            "label": "four club-spoked asterisk",
            "icon": "&#10021;",
            "value": "10021",
            "group": "symbols",
        },
        {
            "label": "black four pointed star",
            "icon": "&#10022;",
            "value": "10022",
            "group": "symbols",
        },
        {
            "label": "white four pointed star",
            "icon": "&#10023;",
            "value": "10023",
            "group": "symbols",
        },
        {
            "label": "stress outlined white star",
            "icon": "&#10025;",
            "value": "10025",
            "group": "symbols",
        },
        {
            "label": "circled white star",
            "icon": "&#10026;",
            "value": "10026",
            "group": "symbols",
        },
        {
            "label": "open centre black star",
            "icon": "&#10027;",
            "value": "10027",
            "group": "symbols",
        },
        {
            "label": "black centre white star",
            "icon": "&#10028;",
            "value": "10028",
            "group": "symbols",
        },
        {
            "label": "outlined black star",
            "icon": "&#10029;",
            "value": "10029",
            "group": "symbols",
        },
        {
            "label": "heavy outlined black star",
            "icon": "&#10030;",
            "value": "10030",
            "group": "symbols",
        },
        {
            "label": "pinwheel star",
            "icon": "&#10031;",
            "value": "10031",
            "group": "symbols",
        },
        {
            "label": "shadowed white star",
            "icon": "&#10032;",
            "value": "10032",
            "group": "symbols",
        },
        {
            "label": "heavy asterisk",
            "icon": "&#10033;",
            "value": "10033",
            "group": "symbols",
        },
        {
            "label": "open centre asterisk",
            "icon": "&#10034;",
            "value": "10034",
            "group": "symbols",
        },
        {
            "label": "eight spoked asterisk",
            "icon": "&#10035;",
            "value": "10035",
            "group": "symbols",
        },
        {
            "label": "eight pointed black star",
            "icon": "&#10036;",
            "value": "10036",
            "group": "symbols",
        },
        {
            "label": "eight pointed pinwheel star",
            "icon": "&#10037;",
            "value": "10037",
            "group": "symbols",
        },
        {
            "label": "six pointed black star",
            "icon": "&#10038;",
            "value": "10038",
            "group": "symbols",
        },
        {
            "label": "eight pointed rectilinear black star",
            "icon": "&#10039;",
            "value": "10039",
            "group": "symbols",
        },
        {
            "label": "heavy eight pointed rectilinear black star",
            "icon": "&#10040;",
            "value": "10040",
            "group": "symbols",
        },
        {
            "label": "twelve pointed black star",
            "icon": "&#10041;",
            "value": "10041",
            "group": "symbols",
        },
        {
            "label": "sixteen pointed asterisk",
            "icon": "&#10042;",
            "value": "10042",
            "group": "symbols",
        },
        {
            "label": "teardrop-spoked asterisk",
            "icon": "&#10043;",
            "value": "10043",
            "group": "symbols",
        },
        {
            "label": "open centre teardrop-spoked asterisk",
            "icon": "&#10044;",
            "value": "10044",
            "group": "symbols",
        },
        {
            "label": "heavy teardrop-spoked asterisk",
            "icon": "&#10045;",
            "value": "10045",
            "group": "symbols",
        },
        {
            "label": "six petalled black and white florette",
            "icon": "&#10046;",
            "value": "10046",
            "group": "symbols",
        },
        {
            "label": "black florette",
            "icon": "&#10047;",
            "value": "10047",
            "group": "symbols",
        },
        {
            "label": "white florette",
            "icon": "&#10048;",
            "value": "10048",
            "group": "symbols",
        },
        {
            "label": "eight petalled outlined black florette",
            "icon": "&#10049;",
            "value": "10049",
            "group": "symbols",
        },
        {
            "label": "circled open centre eight pointed star",
            "icon": "&#10050;",
            "value": "10050",
            "group": "symbols",
        },
        {
            "label": "heavy teardrop-spoked pinwheel asterisk",
            "icon": "&#10051;",
            "value": "10051",
            "group": "symbols",
        },
        {
            "label": "snowflake",
            "icon": "&#10052;",
            "value": "10052",
            "group": "symbols",
        },
        {
            "label": "tight trifoliate snowflake",
            "icon": "&#10053;",
            "value": "10053",
            "group": "symbols",
        },
        {
            "label": "heavy chevron snowflake",
            "icon": "&#10054;",
            "value": "10054",
            "group": "symbols",
        },
        {
            "label": "sparkle",
            "icon": "&#10055;",
            "value": "10055",
            "group": "symbols",
        },
        {
            "label": "heavy sparkle",
            "icon": "&#10056;",
            "value": "10056",
            "group": "symbols",
        },
        {
            "label": "balloon-spoked asterisk",
            "icon": "&#10057;",
            "value": "10057",
            "group": "symbols",
        },
        {
            "label": "eight teardrop-spoked propeller asterisk",
            "icon": "&#10058;",
            "value": "10058",
            "group": "symbols",
        },
        {
            "label": "heavy eight teardrop-spoked propeller asterisk",
            "icon": "&#10059;",
            "value": "10059",
            "group": "symbols",
        },
        {
            "label": "shadowed white circle",
            "icon": "&#10061;",
            "value": "10061",
            "group": "symbols",
        },
        {
            "label": "lower right drop-shadowed white square",
            "icon": "&#10063;",
            "value": "10063",
            "group": "symbols",
        },
        {
            "label": "upper right drop-shadowed white square",
            "icon": "&#10064;",
            "value": "10064",
            "group": "symbols",
        },
        {
            "label": "lower right shadowed white square",
            "icon": "&#10065;",
            "value": "10065",
            "group": "symbols",
        },
        {
            "label": "upper right shadowed white square",
            "icon": "&#10066;",
            "value": "10066",
            "group": "symbols",
        },
        {
            "label": "black diamond minus white x",
            "icon": "&#10070;",
            "value": "10070",
            "group": "symbols",
        },
        {
            "label": "light vertical bar",
            "icon": "&#10072;",
            "value": "10072",
            "group": "symbols",
        },
        {
            "label": "medium vertical bar",
            "icon": "&#10073;",
            "value": "10073",
            "group": "symbols",
        },
        {
            "label": "heavy vertical bar",
            "icon": "&#10074;",
            "value": "10074",
            "group": "symbols",
        },
        {
            "label": "heavy single turned comma quotation mark ornament",
            "icon": "&#10075;",
            "value": "10075",
            "group": "symbols",
        },
        {
            "label": "heavy single comma quotation mark ornament",
            "icon": "&#10076;",
            "value": "10076",
            "group": "symbols",
        },
        {
            "label": "heavy double turned comma quotation mark ornament",
            "icon": "&#10077;",
            "value": "10077",
            "group": "symbols",
        },
        {
            "label": "heavy double comma quotation mark ornament",
            "icon": "&#10078;",
            "value": "10078",
            "group": "symbols",
        },
        {
            "label": "curved stem paragraph sign ornament",
            "icon": "&#10081;",
            "value": "10081",
            "group": "symbols",
        },
        {
            "label": "heavy exclamation mark ornament",
            "icon": "&#10082;",
            "value": "10082",
            "group": "symbols",
        },
        {
            "label": "heavy heart exclamation mark ornament",
            "icon": "&#10083;",
            "value": "10083",
            "group": "symbols",
        },
        {
            "label": "heavy black heart",
            "icon": "&#10084;",
            "value": "10084",
            "group": "symbols",
        },
        {
            "label": "rotated heavy black heart bullet",
            "icon": "&#10085;",
            "value": "10085",
            "group": "symbols",
        },
        {
            "label": "floral heart",
            "icon": "&#10086;",
            "value": "10086",
            "group": "symbols",
        },
        {
            "label": "rotated floral heart bullet",
            "icon": "&#10087;",
            "value": "10087",
            "group": "symbols",
        },
        {
            "label": "medium left parenthesis ornament",
            "icon": "&#10088;",
            "value": "10088",
            "group": "symbols",
        },
        {
            "label": "medium right parenthesis ornament",
            "icon": "&#10089;",
            "value": "10089",
            "group": "symbols",
        },
        {
            "label": "medium flattened left parenthesis ornament",
            "icon": "&#10090;",
            "value": "10090",
            "group": "symbols",
        },
        {
            "label": "medium flattened right parenthesis ornament",
            "icon": "&#10091;",
            "value": "10091",
            "group": "symbols",
        },
        {
            "label": "medium left-pointing angle bracket ornament",
            "icon": "&#10092;",
            "value": "10092",
            "group": "symbols",
        },
        {
            "label": "medium right-pointing angle bracket ornament",
            "icon": "&#10093;",
            "value": "10093",
            "group": "symbols",
        },
        {
            "label": "heavy left-pointing angle quotation mark ornament",
            "icon": "&#10094;",
            "value": "10094",
            "group": "symbols",
        },
        {
            "label": "heavy right-pointing angle quotation mark ornament",
            "icon": "&#10095;",
            "value": "10095",
            "group": "symbols",
        },
        {
            "label": "heavy left-pointing angle bracket ornament",
            "icon": "&#10096;",
            "value": "10096",
            "group": "symbols",
        },
        {
            "label": "heavy right-pointing angle bracket ornament",
            "icon": "&#10097;",
            "value": "10097",
            "group": "symbols",
        },
        {
            "label": "light left tortoise shell bracket ornament",
            "icon": "&#10098;",
            "value": "10098",
            "group": "symbols",
        },
        {
            "label": "light right tortoise shell bracket ornament",
            "icon": "&#10099;",
            "value": "10099",
            "group": "symbols",
        },
        {
            "label": "medium left curly bracket ornament",
            "icon": "&#10100;",
            "value": "10100",
            "group": "symbols",
        },
        {
            "label": "medium right curly bracket ornament",
            "icon": "&#10101;",
            "value": "10101",
            "group": "symbols",
        },
        {
            "label": "dingbat negative circled digit one",
            "icon": "&#10102;",
            "value": "10102",
            "group": "symbols",
        },
        {
            "label": "dingbat negative circled digit two",
            "icon": "&#10103;",
            "value": "10103",
            "group": "symbols",
        },
        {
            "label": "dingbat negative circled digit three",
            "icon": "&#10104;",
            "value": "10104",
            "group": "symbols",
        },
        {
            "label": "dingbat negative circled digit four",
            "icon": "&#10105;",
            "value": "10105",
            "group": "symbols",
        },
        {
            "label": "dingbat negative circled digit five",
            "icon": "&#10106;",
            "value": "10106",
            "group": "symbols",
        },
        {
            "label": "dingbat negative circled digit six",
            "icon": "&#10107;",
            "value": "10107",
            "group": "symbols",
        },
        {
            "label": "dingbat negative circled digit seven",
            "icon": "&#10108;",
            "value": "10108",
            "group": "symbols",
        },
        {
            "label": "dingbat negative circled digit eight",
            "icon": "&#10109;",
            "value": "10109",
            "group": "symbols",
        },
        {
            "label": "dingbat negative circled digit nine",
            "icon": "&#10110;",
            "value": "10110",
            "group": "symbols",
        },
        {
            "label": "dingbat negative circled number ten",
            "icon": "&#10111;",
            "value": "10111",
            "group": "symbols",
        },
        {
            "label": "dingbat circled sans-serif digit one",
            "icon": "&#10112;",
            "value": "10112",
            "group": "symbols",
        },
        {
            "label": "dingbat circled sans-serif digit two",
            "icon": "&#10113;",
            "value": "10113",
            "group": "symbols",
        },
        {
            "label": "dingbat circled sans-serif digit three",
            "icon": "&#10114;",
            "value": "10114",
            "group": "symbols",
        },
        {
            "label": "dingbat circled sans-serif digit four",
            "icon": "&#10115;",
            "value": "10115",
            "group": "symbols",
        },
        {
            "label": "dingbat circled sans-serif digit five",
            "icon": "&#10116;",
            "value": "10116",
            "group": "symbols",
        },
        {
            "label": "dingbat circled sans-serif digit six",
            "icon": "&#10117;",
            "value": "10117",
            "group": "symbols",
        },
        {
            "label": "dingbat circled sans-serif digit seven",
            "icon": "&#10118;",
            "value": "10118",
            "group": "symbols",
        },
        {
            "label": "dingbat circled sans-serif digit eight",
            "icon": "&#10119;",
            "value": "10119",
            "group": "symbols",
        },
        {
            "label": "dingbat circled sans-serif digit nine",
            "icon": "&#10120;",
            "value": "10120",
            "group": "symbols",
        },
        {
            "label": "dingbat circled sans-serif number ten",
            "icon": "&#10121;",
            "value": "10121",
            "group": "symbols",
        },
        {
            "label": "dingbat negative circled sans-serif digit one",
            "icon": "&#10122;",
            "value": "10122",
            "group": "symbols",
        },
        {
            "label": "dingbat negative circled sans-serif digit two",
            "icon": "&#10123;",
            "value": "10123",
            "group": "symbols",
        },
        {
            "label": "dingbat negative circled sans-serif digit three",
            "icon": "&#10124;",
            "value": "10124",
            "group": "symbols",
        },
        {
            "label": "dingbat negative circled sans-serif digit four",
            "icon": "&#10125;",
            "value": "10125",
            "group": "symbols",
        },
        {
            "label": "dingbat negative circled sans-serif digit five",
            "icon": "&#10126;",
            "value": "10126",
            "group": "symbols",
        },
        {
            "label": "dingbat negative circled sans-serif digit six",
            "icon": "&#10127;",
            "value": "10127",
            "group": "symbols",
        },
        {
            "label": "dingbat negative circled sans-serif digit seven",
            "icon": "&#10128;",
            "value": "10128",
            "group": "symbols",
        },
        {
            "label": "dingbat negative circled sans-serif digit eight",
            "icon": "&#10129;",
            "value": "10129",
            "group": "symbols",
        },
        {
            "label": "dingbat negative circled sans-serif digit nine",
            "icon": "&#10130;",
            "value": "10130",
            "group": "symbols",
        },
        {
            "label": "dingbat negative circled sans-serif number ten",
            "icon": "&#10131;",
            "value": "10131",
            "group": "symbols",
        },
        {
            "label": "heavy wide-headed right arrow",
            "icon": "&#10132;",
            "value": "10132",
            "group": "symbols",
        },
        {
            "label": "heavy south east arrow",
            "icon": "&#10136;",
            "value": "10136",
            "group": "symbols",
        },
        {
            "label": "heavy right arrow",
            "icon": "&#10137;",
            "value": "10137",
            "group": "symbols",
        },
        {
            "label": "heavy north east arrow",
            "icon": "&#10138;",
            "value": "10138",
            "group": "symbols",
        },
        {
            "label": "drafting point right arrow",
            "icon": "&#10139;",
            "value": "10139",
            "group": "symbols",
        },
        {
            "label": "heavy round-tipped right arrow",
            "icon": "&#10140;",
            "value": "10140",
            "group": "symbols",
        },
        {
            "label": "triangle-headed right arrow",
            "icon": "&#10141;",
            "value": "10141",
            "group": "symbols",
        },
        {
            "label": "heavy triangle-headed right arrow",
            "icon": "&#10142;",
            "value": "10142",
            "group": "symbols",
        },
        {
            "label": "dashed triangle-headed right arrow",
            "icon": "&#10143;",
            "value": "10143",
            "group": "symbols",
        },
        {
            "label": "heavy dashed triangle-headed right arrow",
            "icon": "&#10144;",
            "value": "10144",
            "group": "symbols",
        },
        {
            "label": "black right arrow",
            "icon": "&#10145;",
            "value": "10145",
            "group": "symbols",
        },
        {
            "label": "three-d top-lighted right arrowhead",
            "icon": "&#10146;",
            "value": "10146",
            "group": "symbols",
        },
        {
            "label": "three-d bottom-lighted right arrowhead",
            "icon": "&#10147;",
            "value": "10147",
            "group": "symbols",
        },
        {
            "label": "black right arrowhead",
            "icon": "&#10148;",
            "value": "10148",
            "group": "symbols",
        },
        {
            "label": "heavy black curved down and right arrow",
            "icon": "&#10149;",
            "value": "10149",
            "group": "symbols",
        },
        {
            "label": "heavy black curved up and right arrow",
            "icon": "&#10150;",
            "value": "10150",
            "group": "symbols",
        },
        {
            "label": "squat black right arrow",
            "icon": "&#10151;",
            "value": "10151",
            "group": "symbols",
        },
        {
            "label": "heavy concave-pointed black right arrow",
            "icon": "&#10152;",
            "value": "10152",
            "group": "symbols",
        },
        {
            "label": "right-shaded white right arrow",
            "icon": "&#10153;",
            "value": "10153",
            "group": "symbols",
        },
        {
            "label": "left-shaded white right arrow",
            "icon": "&#10154;",
            "value": "10154",
            "group": "symbols",
        },
        {
            "label": "back-tilted shadowed white right arrow",
            "icon": "&#10155;",
            "value": "10155",
            "group": "symbols",
        },
        {
            "label": "front-tilted shadowed white right arrow",
            "icon": "&#10156;",
            "value": "10156",
            "group": "symbols",
        },
        {
            "label": "heavy lower right-shadowed white right arrow",
            "icon": "&#10157;",
            "value": "10157",
            "group": "symbols",
        },
        {
            "label": "heavy upper right-shadowed white right arrow",
            "icon": "&#10158;",
            "value": "10158",
            "group": "symbols",
        },
        {
            "label": "notched lower right-shadowed white right arrow",
            "icon": "&#10159;",
            "value": "10159",
            "group": "symbols",
        },
        {
            "label": "notched upper right-shadowed white right arrow",
            "icon": "&#10161;",
            "value": "10161",
            "group": "symbols",
        },
        {
            "label": "circled heavy white right arrow",
            "icon": "&#10162;",
            "value": "10162",
            "group": "symbols",
        },
        {
            "label": "white-feathered right arrow",
            "icon": "&#10163;",
            "value": "10163",
            "group": "symbols",
        },
        {
            "label": "black-feathered south east arrow",
            "icon": "&#10164;",
            "value": "10164",
            "group": "symbols",
        },
        {
            "label": "black-feathered right arrow",
            "icon": "&#10165;",
            "value": "10165",
            "group": "symbols",
        },
        {
            "label": "black-feathered north east arrow",
            "icon": "&#10166;",
            "value": "10166",
            "group": "symbols",
        },
        {
            "label": "heavy black-feathered south east arrow",
            "icon": "&#10167;",
            "value": "10167",
            "group": "symbols",
        },
        {
            "label": "heavy black-feathered right arrow",
            "icon": "&#10168;",
            "value": "10168",
            "group": "symbols",
        },
        {
            "label": "heavy black-feathered north east arrow",
            "icon": "&#10169;",
            "value": "10169",
            "group": "symbols",
        },
        {
            "label": "teardrop-barbed right arrow",
            "icon": "&#10170;",
            "value": "10170",
            "group": "symbols",
        },
        {
            "label": "heavy teardrop-shanked right arrow",
            "icon": "&#10171;",
            "value": "10171",
            "group": "symbols",
        },
        {
            "label": "wedge-tailed right arrow",
            "icon": "&#10172;",
            "value": "10172",
            "group": "symbols",
        },
        {
            "label": "heavy wedge-tailed right arrow",
            "icon": "&#10173;",
            "value": "10173",
            "group": "symbols",
        },
        {
            "label": "open-outlined right arrow",
            "icon": "&#10174;",
            "value": "10174",
            "group": "symbols",
        },
    ];

    //Let's store in a single array all the entities
    let countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
    let namedColors = ["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkgrey","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","green","greenyellow","grey","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"];

    this.getList = function (listName) {
        //declare locals
        let list = null;

        //check for valid values
        if (!utils.isString(listName)) {
            return null;
        }

        //try to evaluate the string as a variable
        try {
            list = eval(listName);
        }
        catch (error) {}

        //check for valid values
        if (listName=="_html5GroupedSymbols" && list!=null) {
            return list;
        }
        if (Array.isArray(list)) {
            return list;
        }
        else {
            return null;
        }
    };

    this.getListItem = function (list, value) {
        //check for valid values
        if (list == null) {
            return null;
        }
        if (value == null) {
            return null;
        }
        if (!utils.isString(value)) {
            return null;
        }
        if (utils.isString(list)) {
            list = listUtils.getList(list);
        }
        if (!utils.isArray()) {
            return null;
        }

        //loop through the items
        for (let i = 0; i < list.length; i++) {
            //get the current item
            let currItem = list[i];
            //check the item's value
            if (!currItem.hasOwnProperty("value")) {
                continue;
            }
            let currItemValue = String(currItem.value);
            if (currItemValue.toLowerCase() == value.toLowerCase()) {
                return currItem;
            }
        }

        //return the method's value
        return null;
    };

    this.indexOf = function (value, list) {
        //declare locals
        let index = -1;

        //check for valid values
        if (value == null) {
            return index;
        }
        if (!utils.isString(value)) {
            return index;
        }
        if (list == null) {
            return index;
        }
        if (utils.isString(list)) {
            list = listUtils.getList(list);
        }
        if (!utils.isArray()) {
            return index;
        }

        //loop through the items
        for (let i = 0; i < list.length; i++) {
            //get the current item
            let currItem = list[i];
            //check the item's value
            if (!currItem.hasOwnProperty("value")) {
                continue;
            }
            let currItemValue = String(currItem.value);
            if (currItemValue.toLowerCase() == value.toLowerCase()) {
                index = i;
                break;
            }
        }

        //return the method's value
        return index;
    };

    this.sort = function(list, sortOrder, fieldName) {
        let methodName = "listUtils.sort(): ";
        let logMessage;
        let defaultSortOrder = "asc";
        let orderBy = [];
        let currOrderByItem;
        let currOrderByItemFieldName;
        let currOrderByItemSort;

        //check for a list name string
        if (utils.isString(list)) {
            //convert the list name into a real json array
            list = listUtils.getList(list);
        }

        //check for a valid array
        if (!utils.isArray(list)) {
            logMessage = "list is NOT a valid array !!";
            console.error(methodName + logMessage);
            return list;
        }

        //set default field name if necessary
        if (!utils.isString(fieldName)) {
            fieldName = "label";
        }

        //check for a single string sortOrder or a json array sortOrder for example {field: 'field1', sort: 'asc'}
        if (utils.isString(sortOrder) && (sortOrder.toLowerCase()=="asc" || sortOrder.toLowerCase()=="desc")) {
            orderBy.push({field: fieldName, sort: sortOrder});
        }
        else if (utils.isArray(sortOrder)) {
            orderBy = sortOrder;
            //validate the array contains json items in the form of {field: 'field1', sort: 'asc'}
            let errorFound = false;
            for (let i=0;i < orderBy.length; i++) {
                currOrderByItem = orderBy[i];
                if (utils.isJson(currOrderByItem) && jsonUtils.hasField(currOrderByItem, "field") && jsonUtils.hasField(currOrderByItem, "sort")) {
                    if (utils.isString(currOrderByItem.field) && utils.isString(currOrderByItem.sort)) {
                        continue;
                    }
                }
                errorFound = true;
                break;
            }
            if (errorFound) {
                logMessage = "sortOrder is NOT a valid json array. Each array item must be in the format of {field: '', sort: ''} !!";
                console.error(methodName + logMessage);
                orderBy = [];
                orderBy.push({field: fieldName, sort: defaultSortOrder});
            }
        }
        else {
            orderBy.push({field: fieldName, sort: defaultSortOrder});
        }

        //loop through the orderBy array
        for (let i=0;i < orderBy.length; i++) {
            //get the current item
            currOrderByItem = orderBy[i];

            //get the item's fields values
            currOrderByItemFieldName = currOrderByItem.field;
            currOrderByItemSort = currOrderByItem.sort;

            //check the current sort order
            if (currOrderByItemFieldName==defaultSortOrder) {
                list.sort(function(a, b) {
                    if (isNaN(a) || isNaN(b)) {
                        if (utils.isString(a) || utils.isString(b)) {
                            return a.localeCompare(b);
                        }
                        else if (utils.isJson(a) && utils.isJson(b)) {
                            if (a.hasOwnProperty(fieldName) && b.hasOwnProperty(fieldName)) {
                                let x = a[fieldName];
                                let y = b[fieldName];
                                if (isNaN(x) || isNaN(y)) {
                                    return x.localeCompare(y);
                                }
                                else {
                                    if (typeof(x)=="string") {
                                        x = parseInt(x);
                                    }
                                    if (typeof(y)=="string") {
                                        y = parseInt(y);
                                    }
                                    return x-y;
                                }
                            }
                    }
                    }
                    else {
                        if (typeof(a)=="string") {
                            a = parseInt(a);
                        }
                        if (typeof(b)=="string") {
                            b = parseInt(b);
                        }
                        return a - b
                    }
                });
            }
            else {
                list.sort(function(a, b) {
                    if (isNaN(a) || isNaN(b)) {
                        if (utils.isString(a) || utils.isString(b)) {
                            return b.localeCompare(a);
                        }
                        else if (utils.isJson(a) && utils.isJson(b)) {
                            if (a.hasOwnProperty(fieldName) && b.hasOwnProperty(fieldName)) {
                                let x = a[fieldName];
                                let y = b[fieldName];
                                if (isNaN(x) || isNaN(y)) {
                                    return y.localeCompare(x);
                                }
                                else {
                                    if (typeof(x)=="string") {
                                        x = parseInt(x);
                                    }
                                    if (typeof(y)=="string") {
                                        y = parseInt(y);
                                    }
                                    return y-x;
                                }
                            }
                        }
                    }
                    else {
                        if (typeof(a)=="string") {
                            a = parseInt(a);
                        }
                        if (typeof(b)=="string") {
                            b = parseInt(b);
                        }
                        return b - a
                    }
                });
            }
        }

        //return the method's value
        return list;
    };
};
const jsonUtils = new function() {
    this.getItemByValue = function(jsonData, fieldName, itemValue) {
        //declare locals
        let index = jsonUtils.getItemIndex(jsonData, fieldName, itemValue);

        //check for valid values
        if (index==-1 || index>=jsonData.length) {
            return null;
        }

        //return the method's value
        return jsonData[index];
    };

    this.getItemIndex = function(jsonData, fieldName, itemValue) {
        //declare locals
        let item = null;
        let currItemValue = null;
        let retVal = -1;

        //check for valid values
        if (!utils.isArray(jsonData)) {
            return null;
        }
        if (utils.isEmpty(fieldName)) {
            return null;
        }
        if (utils.isEmpty(itemValue)) {
            return null;
        }

        //loop through the json data
        for (let i=0;i<jsonData.length;i++) {
            //get the current item
            item = jsonData[i];

            //check for a valid item
            if (!utils.isJson(item)) {
                continue;
            }
            if (!item.hasOwnProperty(fieldName)) {
                continue;
            }

            //get the item's value
            currItemValue = item[fieldName];

            //check for valid values
            if (utils.isEmpty(currItemValue)) {
                continue;
            }

            //compare the two values
            if (typeof(currItemValue)=="string") {
                if (typeof(itemValue)=="string") {
                    if (currItemValue.toLowerCase()==itemValue.toLowerCase()) {
                        retVal = i;
                        break;
                    }
                }
                else {
                    if (currItemValue.toLowerCase()==itemValue) {
                        retVal = i;
                        break;
                    }
                }
            }
            else {
                if (currItemValue==itemValue) {
                    retVal = i;
                    break;
                }
            }
        }

        //return the method's value
        return retVal;
    };

    this.array2String = function(item, arrayFieldName, arrayItemFieldName) {
        //declare locals
        let arrayDelimiter = ", ";
        let retVal = "";
        let array = null;
        let tmpArr = [];
        let arrayItem = null;
        let arrayItemValue = null;

        //check for valid values
        if (utils.isEmpty(item) || utils.isEmpty(arrayFieldName) || utils.isEmpty(arrayItemFieldName)) {
            return retVal;
        }
        if (!utils.isJson(item) || !item.hasOwnProperty(arrayFieldName)) {
            return retVal;
        }

        //get the item's value
        array = item[arrayFieldName];

        //check for valid values
        if (utils.isEmpty(array) || !utils.isArray(array)) {
            return retVal;
        }

        //loop through the items
        for (let i=0;i<array.length;i++) {
            //get the current item
            arrayItem = array[i];

            //check for valid values
            if (!arrayItem.hasOwnProperty(arrayItemFieldName)) {
                continue;
            }

            //get the item's value
            arrayItemValue = arrayItem[arrayItemFieldName];

            //check for valid values
            if (utils.isEmpty(arrayItemValue)) {
                continue;
            }

            //push the value to a temporary array
            tmpArr.push(arrayItemValue.trim());
        }

        //convert the temporary array into a simple string
        retVal = utils.array2string(tmpArr, arrayDelimiter);

        //return the method's value
        return retVal;
    };

    this.getConfigHeight = function (config, defaultValue) {
        //declare locals
        let sizeValue = 0;

        //check for valid values
        if (!utils.isJson(config)) {
            return defaultValue;
        }

        if (config.hasOwnProperty("height")) {
            if (isNaN(config.height)) {
                if (!utils.isString(config.height)) {
                    sizeValue = defaultValue;
                }
                else {
                    if (config.height.toLowerCase().indexOf("px")==-1) {
                        sizeValue = defaultValue;
                    }
                    else {
                        sizeValue = utils.replaceAll(config.height,"px","");
                        sizeValue = parseInt(sizeValue);
                    }
                }
            }
            else {
                if (utils.isString(config.height)) {
                    sizeValue = parseInt(config.height);
                }
                else {
                    sizeValue = config.height;
                }
            }
        }
        else {
            if (config.hasOwnProperty("css")) {
                if (utils.isArray(config.css)) {
                    config.css = config.css[0];
                }
                if (config.css.hasOwnProperty("height")) {
                    if (isNaN(config.css.height)) {
                        if (!utils.isString(config.css.height)) {
                            sizeValue = defaultValue;
                        } else {
                            if (config.css.height.toLowerCase().indexOf("px") == -1) {
                                sizeValue = defaultValue;
                            } else {
                                sizeValue = utils.replaceAll(config.css.height, "px", "");
                                sizeValue = parseInt(sizeValue);
                            }
                        }
                    } else {
                        if (utils.isString(config.css.height)) {
                            sizeValue = parseInt(config.css.height);
                        } else {
                            sizeValue = config.css.height;
                        }
                    }
                }
                else {
                    sizeValue = defaultValue;
                }
            }
            else {
                sizeValue = defaultValue;
            }
        }

        //return the method's value
        return sizeValue;
    };

    this.getConfigWidth = function (config, defaultValue) {
        //declare locals
        let sizeValue = 0;

        //check for valid values
        if (!utils.isJson(config)) {
            return defaultValue;
        }

        if (config.hasOwnProperty("width")) {
            if (isNaN(config.width)) {
                if (!utils.isString(config.width)) {
                    sizeValue = defaultValue;
                }
                else {
                    if (config.width.toLowerCase().indexOf("px")==-1) {
                        sizeValue = defaultValue;
                    }
                    else {
                        sizeValue = utils.replaceAll(config.width,"px","");
                        sizeValue = parseInt(sizeValue);
                    }
                }
            }
            else {
                if (utils.isString(config.width)) {
                    sizeValue = parseInt(config.width);
                }
                else {
                    sizeValue = config.width;
                }
            }
        }
        else {
            if (config.hasOwnProperty("css")) {
                if (utils.isArray(config.css)) {
                    config.css = config.css[0];
                }
                if (config.css.hasOwnProperty("width")) {
                    if (isNaN(config.css.width)) {
                        if (!utils.isString(config.css.width)) {
                            sizeValue = defaultValue;
                        } else {
                            if (config.css.width.toLowerCase().indexOf("px") == -1) {
                                sizeValue = defaultValue;
                            } else {
                                sizeValue = utils.replaceAll(config.css.width, "px", "");
                                sizeValue = parseInt(sizeValue);
                            }
                        }
                    } else {
                        if (utils.isString(config.css.width)) {
                            sizeValue = parseInt(config.css.width);
                        } else {
                            sizeValue = config.css.width;
                        }
                    }
                }
                else {
                    sizeValue = defaultValue;
                }
            }
            else {
                sizeValue = defaultValue;
            }
        }

        //return the method's value
        return sizeValue;
    };

    this.getRealName = function(json, validFieldsNames) {
        //check for valid values
        if (!utils.isJson(json)) {
            return null;
        }
        if (!utils.isArray(validFieldsNames)) {
            return null;
        }

        //loop through the fields
        for (let field in json) {
            if (json.hasOwnProperty(field)) {
                if (utils.isInArray(field, validFieldsNames)) {
                    return field;
                }
            }
        }

        //return the method's value
        return null;
    };

    this.getName = function(json, fieldName) {
        //check for valid values
        if (!utils.isJson(json)) {
            return null;
        }
        if (utils.isEmpty(fieldName) || !utils.isString(fieldName)) {
            return null;
        }

        //loop through the fields
        for (let field in json) {
            if (json.hasOwnProperty(field)) {
                if (field.toLowerCase()==fieldName.toLowerCase()) {
                    return field;
                }
            }
        }

        //return the method's value
        return null;
    };

    this.getValue = function(json, fieldName, defaultValue) {
        //declare locals
        let retVal;
        let fieldNameReal = jsonUtils.getName(json, fieldName);

        //check for valid values
        if (utils.isEmpty(fieldNameReal)) {
            if (!utils.isEmpty(defaultValue)) {
                return defaultValue;
            }
            return null;
        }

        //set the return value
        retVal = json[fieldNameReal];

        //check for valid values
        if (utils.isEmpty(retVal)) {
            if (!utils.isEmpty(defaultValue)) {
                return defaultValue;
            }
            return null;
        }

        //return the method's value
        return retVal;
    };

    this.hasField = function(json, fieldName) {
        //check for valid values
        if (!utils.isJson(json)) {
            return false;
        }
        if (utils.isEmpty(fieldName) || !utils.isString(fieldName)) {
            return false;
        }

        //loop through the fields
        for (let field in json) {
            if (json.hasOwnProperty(field)) {
                if (field.toLowerCase()==fieldName.toLowerCase()) {
                    return true;
                }
            }
        }

        //return the method's value
        return false;
    };

    this.hasValue = function(json, fieldName) {
        //check for valid values
        if (!jsonUtils.hasField(json, fieldName)) {
            return false;
        }
        if (utils.isEmpty(json[fieldName])) {
            return false;
        }

        return true;
    };

    this.expression2Json = function(origJson, expression, value) {
        //declare locals
        let _configPrefix = "_config.";
        let configPrefix = "config.";
        let partsDelimiter = ".";
        let partsDelimiterEsc = "\.";
        let arrConfigPath;
        let configPropExpression;
        let config;

        //check for valid values
        if (!utils.isString(expression)) {
            return null;
        }
        if (expression.startsWith(_configPrefix)) {
            expression = expression.substring(_configPrefix.length);
        }
        else if (expression.startsWith(configPrefix)) {
            expression = expression.substring(configPrefix.length);
        }
        if (expression.indexOf(partsDelimiter)==-1) {
            arrConfigPath = [expression];
        }
        else {
            arrConfigPath = expression.split(partsDelimiterEsc);
        }

        //build a config expression
        config = {};
        configPropExpression = "";
        if (arrConfigPath.length==1) {
            configPropExpression = '["' + arrConfigPath[0] + '"]';
        }
        else {
            for (let i=0; i<arrConfigPath.length; i++) {
                if (1>0) {
                    try {
                        eval('config' + configPropExpression + ' = {}');
                    }
                    catch (err) {}
                }
                configPropExpression += '["' + arrConfigPath[i] + '"]';
            }
        }

        try {
            if (utils.isJson(origJson) && utils.isEmpty(value)) {
                config = eval('origJson' + configPropExpression);
            }
            else {
                if (utils.isEmpty(value)) {
                    eval('config' + configPropExpression + ' = null');
                }
                else {
                    eval('config' + configPropExpression + ' = value');
                }
            }
        }
        catch (err) {}

        //return the method's value
        return config;
    };

    this.mergeJson = function(json1, ...jsons2) {
        if (!jsons2.length) {
            return json1;
        }
        const json2 = jsons2.shift();

        if (utils.isJson(json1) && utils.isJson(json2)) {
            for (const key in json2) {
                if (utils.isJson(json2[key])) {
                    if (!json1[key]) {
                        Object.assign(json1, { [key]: {} });
                    }
                    this.mergeJson(json1[key], json2[key]);
                }
                else {
                    Object.assign(json1, { [key]: json2[key] });
                }
            }
        }

        return this.mergeJson(json1, ...jsons2);
    };

};
const validationUtils = new function() {
    //declare fields names
    let _objectName = "validationUtils.";
    let validDataTypes = listUtils.getList("validationDataTypeList");
    let validValidationTypes = listUtils.getList("validationTypeList");
    let fieldNameValidations = "validations";
    let fieldNameRequired = "required";
    let fieldNameDataType = "dataType";
    let fieldNameValidationType = "validationType";
    let fieldNameErrorMessageKey = "errorMessageKey";
    let fieldNameErrorMessageParams = "errorMessageParams";
    let fieldNameMin = "min";
    let fieldNameMax = "max";
    let fieldNameValue = "value";
    let fieldNameDataValidations = "data-validations";
    let fieldNameDataRequired = "data-validation-required";
    let fieldNameDataDataType = "data-validation-dataType";
    let fieldNameDataValidationType = "data-validation-validationType";
    let fieldNameDataMin = "data-validation-min";
    let fieldNameDataMax = "data-validation-max";
    let fieldNameDataValue = "data-validation-value";
    let fieldNameDataErrorMessageKey = "data-validation-errorMessageKey";
    let fieldNameDataErrorMessageParams = "data-validation-errorMessageParams";
    let defaultValueRequired = false;
    let defaultValueDataType = "string";
    let defaultValueValidationType = "datatype";

    this.isValidDataType = function (dataType) {
        if (utils.isEmpty(dataType) || !utils.isString(dataType)) {
            return false;
        }
        if (utils.isInArray(dataType, validDataTypes)) {
            return true;
        }
        return false;
    };

    this.getValidationsFromJson = function (nodeItem, json) {
        //declare locals
        let methodName = _objectName+"getValidationsFromJson(): ";
        let message;
        let validations = null;
        let validation = null;
        let currItem;
        let realFieldName;
        let currValidations;
        let currValidation;
        let currFieldValue;
        let currValidationType;
        let currMin;
        let currMax;
        let currValidationIsValid;

        //check for valid values
        if (nodeItem == null) {
            message = "nodeItem is empty or null !!";
            console.error(methodName + message);
            return null;
        }
        if (!utils.isArray(json)) {
            if (!utils.isJson(json)) {
                message = "nodeItem NOT a valid JSON !!";
                console.error(methodName + message);
                return null;
            }
            json = [json];
        }

        //create a new array
        validations = [];

        //loop through the items
        for (let i=0; i<json.length; i++) {
            //get the current item
            currItem = json[i];

            //check for valid values
            if (!utils.isJson(currItem)) {
                message = "currItem at index=[" + i + "] is NOT a valid JSON !!";
                console.error(methodName + message);
                continue;
            }
            if (!jsonUtils.hasField(currItem, "id")) {
                message = "currItem at index=[" + i + "] is missing required id field !!";
                console.error(methodName + message);
                continue;
            }
            if (!jsonUtils.hasField(currItem, fieldNameValidations)) {
                message = "currItem at index=[" + i + "] is missing required validations field !!";
                console.error(methodName + message);
                continue;
            }

            //get the array of validations
            realFieldName = jsonUtils.getName(currItem, fieldNameValidations);
            currValidations = currItem[realFieldName];

            //check for an array
            if (!utils.isArray(currValidations)) {
                if (!utils.isJson(currValidations)) {
                    message = "currItem at index=[" + i + "] has an invalid validations field value !!";
                    console.error(methodName + message);
                    continue;
                }
                currValidations = [currValidations];
            }

            //loop through the current item's validations array
            for (let j=0; j<currValidations.length; j++) {
                //get the current item
                currValidation = currValidations[j];
                validation = {};
                currValidationIsValid = true;

                //check for valid values
                if (!utils.isJson(currValidation)) {
                    message = "validation at index=[" + j + "] of item at index=[" + i + "] is NOT a valid JSON !!";
                    console.error(methodName + message);
                    currValidationIsValid = false;
                    continue;
                }
                if (!jsonUtils.hasField(currValidation, fieldNameRequired)) {
                    validation[fieldNameRequired] = defaultValueRequired;
                }
                else {
                    realFieldName = jsonUtils.getName(currValidation, fieldNameRequired)
                    currFieldValue = currValidation[realFieldName];
                    if (!utils.isBool(currFieldValue)) {
                        if (utils.isString(currFieldValue)) {
                            if (currFieldValue.toLowerCase()=="1" || currFieldValue.toLowerCase()=="on" ||
                                currFieldValue.toLowerCase()=="true" || currFieldValue.toLowerCase()=="yes") {
                                currFieldValue = true;
                            }
                            else {
                                message = "validation at index=[" + j + "] of item at index=[" + i + "] has an invalid required field value !!";
                                console.error(methodName + message);
                                currFieldValue = false;
                            }
                        }
                        else {
                            currFieldValue = defaultValueRequired;
                        }
                    }
                    validation[fieldNameRequired] = currFieldValue;
                }
                if (!jsonUtils.hasField(currValidation, fieldNameDataType)) {
                    validation[fieldNameDataType] = defaultValueDataType;
                }
                else {
                    realFieldName = jsonUtils.getName(currValidation, fieldNameDataType)
                    currFieldValue = currValidation[realFieldName];
                    if (!utils.isString(currFieldValue)) {
                        currFieldValue = defaultValueDataType;
                    }
                    else {
                        if (!utils.isInArray(currFieldValue, validDataTypes)) {
                            currFieldValue = defaultValueDataType;
                        }
                    }
                    validation[fieldNameDataType] = currFieldValue;
                }
                if (!jsonUtils.hasField(currValidation, fieldNameValidationType)) {
                    currValidationType = defaultValueValidationType;
                    validation[fieldNameValidationType] = defaultValueValidationType;
                }
                else {
                    realFieldName = jsonUtils.getName(currValidation, fieldNameValidationType)
                    currFieldValue = currValidation[realFieldName];
                    currValidationType = currFieldValue;
                    if (!utils.isString(currFieldValue)) {
                        currValidationType = defaultValueValidationType;
                        currFieldValue = defaultValueValidationType;
                    }
                    else {
                        if (!utils.isInArray(currFieldValue, validValidationTypes)) {
                            currFieldValue = defaultValueValidationType;
                            currValidationType = defaultValueValidationType;
                        }
                    }
                    validation[fieldNameValidationType] = currFieldValue;
                }
                switch (currValidationType.toLowerCase()) {
                    case "datatype":
                        break;
                    case "numericrange":
                    case "daterange":
                    case "size":
                    case "length":
                        if (jsonUtils.hasField(currValidation, fieldNameMin) && jsonUtils.hasField(currValidation, fieldNameMax)) {
                            realFieldName = jsonUtils.getName(currValidation, fieldNameMin)
                            currMin = currValidation[realFieldName];
                            realFieldName = jsonUtils.getName(currValidation, fieldNameMax)
                            currMax = currValidation[realFieldName];
                            validation[fieldNameMin] = currMin;
                            validation[fieldNameMax] = currMax;
                        }
                        else {
                            message = "validation type=[" + currValidationType + "] at index=[" + j + "] of item at index=[" + i + "] is missing one or more of the required fields=[" + fieldNameMin + "," + fieldNameMax + "] !!";
                            console.error(methodName + message);
                            currValidationIsValid = false;
                        }
                        break;
                    case "inlist":
                    case "notinlist":
                    case "regexp":
                        if (jsonUtils.hasField(currValidation, fieldNameValue)) {
                            realFieldName = jsonUtils.getName(currValidation, fieldNameValue)
                            currFieldValue = currValidation[realFieldName];
                            if (currValidationType.toLowerCase()=="regexp") {
                                if (utils.isString(currFieldValue)) {
                                    validation[fieldNameValue] = currFieldValue;
                                }
                                else {
                                    message = "value field must be a string for validation type=[" + currValidationType + "] at index=[" + j + "] of item at index=[" + i + "] !!";
                                    console.error(methodName + message);
                                    currValidationIsValid = false;
                                }
                            }
                            else {
                                if (utils.isArray(currFieldValue)) {
                                    validation[fieldNameValue] = currFieldValue;
                                }
                                else {
                                    message = "value field must be an array for validation type=[" + currValidationType + "] at index=[" + j + "] of item at index=[" + i + "] !!";
                                    console.error(methodName + message);
                                    currValidationIsValid = false;
                                }
                            }
                        }
                        else {
                            message = "validation type=[" + currValidationType + "] at index=[" + j + "] of item at index=[" + i + "] is missing one or more of the required field=[" + fieldNameValue + "] !!";
                            console.error(methodName + message);
                            currValidationIsValid = false;
                        }
                        break;
                    default:
                        message = "validation type=[" + currValidationType + "] at index=[" + j + "] of item at index=[" + i + "] is INVALID !!";
                        console.error(methodName + message);
                        currValidationIsValid = false;
                        break;
                }
                if (jsonUtils.hasField(currValidation, fieldNameErrorMessageKey)) {
                    realFieldName = jsonUtils.getName(currValidation, fieldNameErrorMessageKey);
                    currFieldValue = currValidation[realFieldName];
                    if (!utils.isEmpty(currFieldValue) && utils.isString(currFieldValue)) {
                        validation[fieldNameErrorMessageKey] = currFieldValue;
                    }
                    else {
                        validation[fieldNameErrorMessageKey] = "";
                    }
                }
                if (jsonUtils.hasField(currValidation, fieldNameErrorMessageParams)) {
                    realFieldName = jsonUtils.getName(currValidation, fieldNameErrorMessageParams);
                    currFieldValue = currValidation[realFieldName];
                    if (utils.isArray(currFieldValue)) {
                        validation[fieldNameErrorMessageParams] = currFieldValue;
                    }
                    else {
                        if (utils.isString(currFieldValue)) {
                            currFieldValue = utils.string2array(currFieldValue);
                            validation[fieldNameErrorMessageParams] = currFieldValue;
                        }
                        else {
                            validation[fieldNameErrorMessageParams] = null;
                        }
                    }
                }
                if (currValidationIsValid) {
                    validations.push(validation);
                }
            }
        }

        //check the array's size
        if (validations.length<1) {
            validations = null;
        }

        //set the html node's attributes from the validations array
        if (utils.isArray(validations)) {
            nodeItem.setAttribute(fieldNameDataValidations, validations.length);
            //loop through the items
            for (let i=0; i<validations.length; i++) {
                //get the current item
                validation = validations[i];
                nodeItem.setAttribute(fieldNameDataRequired+(i+1), validation[fieldNameRequired]);
                nodeItem.setAttribute(fieldNameDataDataType+(i+1), validation[fieldNameDataType]);
                nodeItem.setAttribute(fieldNameDataValidationType+(i+1), validation[fieldNameValidationType]);
                if (validation[fieldNameValidationType].toLowerCase()==defaultValueValidationType.toLowerCase()) {
                    //do nothing;
                }
                if (validation[fieldNameValidationType].toLowerCase()=="regexp") {
                    nodeItem.setAttribute(fieldNameDataValue+(i+1), validation[fieldNameValue]);
                }
                else if (validation[fieldNameValidationType].toLowerCase()=="inlist" || validation[fieldNameValidationType].toLowerCase()=="notinlist") {
                    nodeItem.setAttribute(fieldNameDataValue+(i+1), utils.array2string(validation[fieldNameValue]));
                }
                else {
                    nodeItem.setAttribute(fieldNameDataMin+(i+1), validation[fieldNameMin]);
                    nodeItem.setAttribute(fieldNameDataMax+(i+1), validation[fieldNameMax]);
                }
                if (!utils.isEmpty(validation[fieldNameErrorMessageKey]) && utils.isString(validation[fieldNameErrorMessageKey])) {
                    nodeItem.setAttribute(fieldNameDataErrorMessageKey+(i+1), validation[fieldNameErrorMessageKey]);
                }
                if (!utils.isEmpty(validation[fieldNameErrorMessageParams]) && utils.isArray(validation[fieldNameErrorMessageParams])) {
                    //convert the params into a string
                    nodeItem.setAttribute(fieldNameDataErrorMessageParams+(i+1), validationUtils._messageParams2String(validation[fieldNameErrorMessageParams]));
                }
            }
        }

        //return the method's value
        return validations;
    };

    this._messageParams2String = function (messageParams) {
        //declare locals
        let retVal = "";
        let itemsDelimiter = ",";
        let keyValueDelimiter = "=";
        let nameFieldNameDefault = "name";
        let valueFieldNameDefault = "value";
        let currItem;
        let nameFieldName;
        let valueFieldName;
        let nameFieldValue;
        let valueFieldValue;
        let index = 0;

        //check for valid values
        if (!utils.isArray(messageParams)) {
            return retVal;
        }

        //loop through the items
        for (let i=0; i<messageParams.length; i++) {
            //get the current item
            currItem = messageParams[i];

            //check for valid values
            if (!utils.isJson(currItem)) {
                continue;
            }
            if (!jsonUtils.hasField(currItem, nameFieldNameDefault) || !jsonUtils.hasField(currItem, valueFieldNameDefault)) {
                continue;
            }

            //get the fields names and values
            nameFieldName = jsonUtils.getName(currItem, nameFieldNameDefault);
            valueFieldName = jsonUtils.getName(currItem, valueFieldNameDefault);
            nameFieldValue = currItem[nameFieldName];
            valueFieldValue = currItem[valueFieldName];

            //set the string
            if (index>0) {
                retVal += itemsDelimiter;
            }
            retVal += nameFieldValue + keyValueDelimiter + valueFieldValue;
            index++;
        }

        //return the method's value
        return retVal;
    };

    this._string2MessageParams = function (input) {
        //declare locals
        let messageParams = [];
        let keyValueDelimiter = "=";
        let arrInput;
        let currItem;
        let arrItemParts;

        //check for valid values
        if (!utils.isString(input)) {
            return null;
        }

        //convert the string into an array
        arrInput = utils.string2array(input);

        //loop through the items
        for (let i=0; i<arrInput.length; i++) {
            //get the current item
            currItem = arrInput[i];

            //check for valid values
            if (!utils.isString(currItem)) {
                continue;
            }
            if (currItem.indexOf(keyValueDelimiter)==-1) {
                continue;
            }

            //split the current item into a key and value parts
            arrItemParts = currItem.split(keyValueDelimiter);
            messageParams.push({name: arrItemParts[0], value: arrItemParts[1]});
        }

        //check the array's size
        if (messageParams.length<1) {
            messageParams = null;
        }

        //return the method's value
        return messageParams;
    };

    this.getValidationMessageParams = function (messageKey, elementId) {
        //declare locals
        let validations = validationUtils.getValidationsFromHtml(elementId);
        let realFieldName;
        let validationMessageKey = null;
        let messageParams = null;
        let currItem;

        //check for valid values
        if (!utils.isArray(validations)) {
            return null;
        }

        //loop through the items
        for (let i=0; i<validations.length; i++) {
            //get the current item
            currItem = validations[i];

            //check for valid values
            if (!utils.isJson(currItem)) {
                continue;
            }
            if (!jsonUtils.hasField(currItem, fieldNameErrorMessageKey) || !jsonUtils.hasField(currItem, fieldNameErrorMessageParams)) {
                continue;
            }

            //get the field's name and value
            realFieldName = jsonUtils.getName(currItem, fieldNameErrorMessageKey);
            validationMessageKey = currItem[realFieldName];

            //check if its the same message key
            if (validationMessageKey.toLowerCase()==messageKey.toLowerCase()) {
                realFieldName = jsonUtils.getName(currItem, fieldNameErrorMessageParams);
                messageParams = currItem[realFieldName];
                break;
            }
        }

        //return the method's value
        return messageParams;
    };

    this.getValidationsFromHtml = function (elementId) {
        //declare locals
        let methodName = _objectName+"getValidationsFromHtml(): ";
        let message;
        let validations = null;
        let validation = null;
        let nodeItem;
        let numItemsAttValue;
        let numItems;
        let attributeValue;

        //check for valid values
        if (!utils.isInDom(elementId)) {
            message = "elementId=[" + String(elementId) + "] is NOT in DOM !!";
            console.error(methodName + message);
            return null;
        }

        //get the node from the DOM
        nodeItem = utils.getFromDom(elementId);

        //get the number of validation items
        numItemsAttValue = nodeItem.getAttribute(fieldNameDataValidations);

        //check for valid values
        if (isNaN(numItemsAttValue)) {
            message = "attribute=[" + fieldNameDataEvents + "] must contain a numeric value in elementId=[" + elementId + "] !!";
            console.error(methodName + message);
            return null;
        }

        //parse the value into a number
        numItems = parseInt(numItemsAttValue);

        //check for valid values
        if (numItems<0) {
            message = "numItems=[" + numItems + "] must be a positive integer in elementId=[" + elementId + "] !!";
            console.error(methodName + message);
            return null;
        }

        //create new items
        validations = [];

        //loop through the items
        for (let i=0; i<numItems; i++) {
            validation = {};
            //build a validation item
            attributeValue = nodeItem.getAttribute(fieldNameDataRequired+(i+1));
            if (attributeValue!=null && attributeValue==="true") {
                validation[fieldNameRequired] = true;
            }
            else {
                validation[fieldNameRequired] = false;
            }
            validation[fieldNameDataType] = nodeItem.getAttribute(fieldNameDataDataType+(i+1));
            validation[fieldNameValidationType] = nodeItem.getAttribute(fieldNameDataValidationType+(i+1));
            if (validation[fieldNameValidationType].toLowerCase()==defaultValueValidationType.toLowerCase()) {
                //do nothing
            }
            if (validation[fieldNameValidationType].toLowerCase()=="regexp") {
                validation[fieldNameValue] = nodeItem.getAttribute(fieldNameDataValue+(i+1));
            }
            else if (validation[fieldNameValidationType].toLowerCase()=="inlist" || validation[fieldNameValidationType].toLowerCase()=="notinlist") {
                validation[fieldNameValue] = utils.string2array(nodeItem.getAttribute(fieldNameDataValue+(i+1)));
            }
            else {
                attributeValue = nodeItem.getAttribute(fieldNameDataMin+(i+1));
                if (utils.isEmpty(attributeValue) || isNaN(attributeValue)) {
                    validation[fieldNameMin] = 0;
                }
                else {
                    validation[fieldNameMin] = parseInt(attributeValue);
                }
                attributeValue = nodeItem.getAttribute(fieldNameDataMax+(i+1));
                if (utils.isEmpty(attributeValue) || isNaN(attributeValue)) {
                    validation[fieldNameMax] = 0;
                }
                else {
                    validation[fieldNameMax] = parseInt(attributeValue);
                }
            }
            if (!utils.isEmpty(nodeItem.getAttribute(fieldNameDataErrorMessageKey+(i+1)))) {
                validation[fieldNameErrorMessageKey] = nodeItem.getAttribute(fieldNameDataErrorMessageKey+(i+1));
            }
            if (!utils.isEmpty(nodeItem.getAttribute(fieldNameDataErrorMessageParams+(i+1)))) {
                //convert the string into a json array
                validation[fieldNameErrorMessageParams] = validationUtils._string2MessageParams(nodeItem.getAttribute(fieldNameDataErrorMessageParams+(i+1)));
            }

            //add the item to the array
            validations.push(validation);
        }

        //check the array's size
        if (validations.length<1) {
            validations = null;
        }

        //return the method's value
        return validations;
    };

    this.isValid = function (elementId) {
        //declare locals
        let errorMessage = validationUtils.getValidationError(elementId);

        //check for valid values
        if (errorMessage==null) {
            return true;
        }

        //return the method's value
        return false;
    };

    this.getValidationErrors = function (elementId) {
        //declare locals
        let validations = validationUtils.getValidationsFromHtml(elementId);
        let elementValue = domUtils.getUiItemValue(elementId);
        let currValidation;
        let errorMessage = null;
        let errorMessages = null;

        //check for valid values
        if (!utils.isInDom(elementId)) {
            return "element with id=[" + elementId + "] is NOT in DOM !!";
        }
        if (utils.isEmpty(validations) || !utils.isArray(validations)) {
            return null;
        }

        //create a new array
        errorMessages = [];

        //loop through the items
        for (let i=0; i<validations.length; i++) {
            //get the current item
            currValidation = validations[i];

            //get the current error message
            errorMessage = validationUtils._getValidationItemError(currValidation, elementValue);
            if (errorMessage!=null) {
                errorMessage = i18n.translate(errorMessage, elementId, null, currValidation[fieldNameErrorMessageParams]);
                errorMessages.push(errorMessage);
            }
        }

        //return the method's value
        return errorMessages;
    };

    this.getValidationError = function (elementId) {
        //declare locals
        let errorMessages = validationUtils.getValidationErrors(elementId);
        let errorMessage;

        //check for valid values
        if (utils.isEmpty(errorMessages) || !utils.isArray(errorMessages)) {
            return null;
        }
        if (errorMessages.length<1) {
            return null;
        }

        //set the return value
        errorMessage = errorMessages[0];

        //return the method's value
        return errorMessage;
    };

    this._getValidationItemError = function (validation, value) {
        //declare locals
        let errorMessage = null;
        let required;
        let datatype;
        let validationType;
        let minValue;
        let maxValue;
        let valuesList;
        let regExpPattern;
        let strValue;
        let arrValue;

        //check for valid values
        if (utils.isEmpty(validation) || !utils.isJson(validation)) {
            return null;
        }

        //get some properties from the validation object
        required = validation[fieldNameRequired];
        datatype = validation[fieldNameDataType];
        validationType = validation[fieldNameValidationType];
        minValue = validation[fieldNameMin];
        maxValue = validation[fieldNameMax];
        valuesList = validation[fieldNameValue];
        errorMessage = validation[fieldNameErrorMessageKey];

        //check the validation's required value
        if (required===true && utils.isEmpty(value)) {
            if (utils.isEmpty(errorMessage)) {
                errorMessage = "value is required but empty or null !!";
            }
            return errorMessage;
        }
        else {
            //check the validation's datatype value
            if (!validationUtils.isValidDataType(datatype, value)) {
                if (utils.isEmpty(errorMessage)) {
                    errorMessage = "value=[" + value + "] must be of type=[" + datatype + "] !!";
                }
                return errorMessage;
            }

            //check the validation's validation type value
            if (!utils.isInArray(validationType, validValidationTypes)) {
                errorMessage = "validationType=[" + validationType + "] is INVALID !!";
                return errorMessage;
            }

            //check for min and max values
            if (validationType.toLowerCase()=="length" || validationType.toLowerCase()=="numericrange" || validationType.toLowerCase()=="size") {
                if (isNaN(minValue)) {
                    errorMessage = "validation minValue=[" + minValue + "] is INVALID !!";
                    return errorMessage;
                }
                else if (isNaN(maxValue)) {
                    errorMessage = "validation maxValue=[" + maxValue + "] is INVALID !!";
                    return errorMessage;
                }
            }
            else if (validationType.toLowerCase()=="inlist" || validationType.toLowerCase()=="notinlist") {
                if (!utils.isArray(valuesList)) {
                    valuesList = [valuesList];
                }
            }
            else if (validationType.toLowerCase()=="regexp") {
                regExpPattern = validation[fieldNameValue];
                if (!utils.isString(regExpPattern)) {
                    regExpPattern = String(regExpPattern);
                }
            }

            //convert the value into a string
            strValue = String(value);

            //check the validation type
            switch (validationType.toLowerCase()) {
                case "datatype":
                    errorMessage = null;
                    break;
                case "daterange":
                    if (!validationUtils.isValidDateRange(value, minValue, maxValue)) {
                        if (utils.isEmpty(errorMessage)) {
                            errorMessage = "value=[" + strValue + "] must be a date between [" + minValue + "] and [" + maxValue + "] !!";
                        }
                    }
                    else {
                        errorMessage = null;
                    }
                    break;
                case "length":
                    if (!validationUtils.isValidLength(strValue, minValue, maxValue)) {
                        if (utils.isEmpty(errorMessage)) {
                            errorMessage = "value=[" + strValue + "] must have a length between [" + minValue + "] and [" + maxValue + "] !!";
                        }
                    }
                    else {
                        errorMessage = null;
                    }
                    break;
                case "numericrange":
                    if (!validationUtils.isValidNumericRange(value, minValue, maxValue)) {
                        if (utils.isEmpty(errorMessage)) {
                            errorMessage = "value=[" + strValue + "] must be a number between [" + minValue + "] and [" + maxValue + "] !!";
                        }
                    }
                    else {
                        errorMessage = null;
                    }
                    break;
                case "size":
                    arrValue = value;
                    if (!utils.isArray(arrValue)) {
                        if (!utils.isString(arrValue)) {
                            arrValue = [value];
                        }
                        else {
                            arrValue = utils.string2array(arrValue);
                        }
                    }
                    if (!validationUtils.isValidSize(arrValue, minValue, maxValue)) {
                        if (utils.isEmpty(errorMessage)) {
                            errorMessage = "value [size=" + arrValue.length + "] must have a size between [" + minValue + "] and [" + maxValue + "] !!";
                        }
                    }
                    else {
                        errorMessage = null;
                    }
                    break;
                case "inlist":
                    if (!utils.isInArray(value, valuesList)) {
                        if (utils.isEmpty(errorMessage)) {
                            errorMessage = "value=[" + String(value) + "] is NOT in values list=[" + String(valuesList) + "] !!";
                        }
                    }
                    else {
                        errorMessage = null;
                    }
                    break;
                case "notinlist":
                    if (utils.isInArray(value, valuesList)) {
                        if (utils.isEmpty(errorMessage)) {
                            errorMessage = "value=[" + String(value) + "] should NOT be in values list=[" + String(valuesList) + "] !!";
                        }
                    }
                    else {
                        errorMessage = null;
                    }
                    break;
                case "regexp":
                    if (!regExpPattern.test(strValue)) {
                        if (utils.isEmpty(errorMessage)) {
                            errorMessage = "value=[" + strValue + "] does NOT match regexp pattern=[" + regExpPattern + "] !!";
                        }
                    }
                    else {
                        errorMessage = null;
                    }
                    break;
                default:
                    break;
            }
        }

        //return the method's value
        return errorMessage;
    };

    this.isValidDateRange = function (value, minValue, maxValue) {
        //check for valid values
        if (!utils.isString(value) || !utils.isString(minValue) || !utils.isString(maxValue)) {
            return false;
        }
        if (value == null) {
            return false;
        }

        //get dates from the given values
        let dateValue = null;
        let minDate = null;
        let maxDate = null;
        try {
            dateValue = Date.parse(utils.formatDateTimeString(value)).getTime();
            minDate = Date.parse(utils.formatDateTimeString(minValue)).getTime();
            maxDate = Date.parse(utils.formatDateTimeString(maxValue)).getTime();
        }
        catch (err) {}
        if (dateValue==null || minDate==null || maxDate==null) {
            return false;
        }

        //validate the value
        if (dateValue>=minDate && dateValue<=maxValue) {
            return true;
        }

        //validate the value
        return false;
    };

    this.isValidNumericRange = function (value, minValue, maxValue) {
        //declare locals
        let numericValue;

        //check for valid values
        if (isNaN(value) || isNaN(minValue) || isNaN(maxValue)) {
            return false;
        }

        //parse the value as a number
        numericValue = parseInt(value);

        //validate the value
        if (numericValue >= minValue && numericValue <= maxValue) {
            return true;
        }

        //return the method's value
        return false;
    };

    this.isValidLength = function (value, minValue, maxValue) {
        //declare locals
        let strValue;

        //check for valid values
        if (isNaN(minValue) || isNaN(maxValue)) {
            return false;
        }
        strValue = value;
        if (!utils.isString(strValue)) {
            strValue = String(strValue);
        }

        //validate the value
        if (strValue.length >= minValue && strValue.length <= maxValue) {
            return true;
        }

        //return the method's value
        return false;
    };

    this.isValidSize = function (value, minValue, maxValue) {
        //declare locals
        let arrValue;

        //check for valid values
        if (isNaN(minValue) || isNaN(maxValue)) {
            return false;
        }
        arrValue = value;
        if (!utils.isArray(arrValue)) {
            if (!utils.isString(arrValue)) {
                arrValue = [value];
            }
            else {
                arrValue = utils.string2array(arrValue);
            }
        }

        //validate the value
        if (arrValue.length >= minValue && arrValue.length <= maxValue) {
            return true;
        }

        //return the method's value
        return false;
    };

    this.isValidDataType = function (datatype, value) {
        //declare locals
        let strValue;
        let arrValue;
        let jsonValue = null;
        let valid = false;

        //check for valid values
        if (!utils.isString(datatype) || !utils.isInArray(datatype, validDataTypes)) {
            return false;
        }
        if (value==null) {
            return false;
        }

        //get the value's string value
        strValue = String(value);

        //check the data type
        switch (datatype.toLowerCase()) {
            case "bool":
            case "boolean":
                if (utils.isBool(value)) {
                    valid = true;
                }
                else {
                    if (strValue.toLowerCase()=="true" || strValue.toLowerCase()=="false") {
                        valid = true;
                    }
                }
                break;
            case "number":
            case "numeric":
            case "int":
            case "integer":
            case "float":
                if (!isNaN(value)) {
                    valid = true;
                }
                break;
            case "date":
                valid = utils.isValidDate(value);
                break;
            case "time":
                valid = utils.isValidTime(value);
                break;
            case "datetime":
                valid = utils.isValidDateTime(value);
                break;
            case "string":
                valid = true;
                break;
            case "array":
            case "list":
                if (utils.isArray(value)) {
                    valid = true;
                }
                else {
                    arrValue = utils.string2array(strValue);
                    if (arrValue != null && arrValue.length && arrValue.length > 0) {
                        valid = true;
                    }
                }
                break;
            case "object":
            case "map":
                if (utils.isJson(value)) {
                    valid = true;
                }
                else {
                    try {
                        jsonValue = JSON.parse(strValue);
                    }
                    catch (err) {}
                    if (jsonValue!=null) {
                        valid = true;
                    }
                }
                break;
            default:
                break
        }

        //return the method's value
        return valid;
    };

    this.clearError = function(elementId) {
        //declare locals
        let errorId;
        let errorClass;

        //check for valid values
        if (!utils.isInDom(elementId)) {
            return;
        }

        //get the element's attributes
        errorId = domUtils.getErrorId(elementId);
        errorClass = domUtils.getErrorClass(elementId);

        //check for valid values
        if (!utils.isInDom(errorId)) {
            return;
        }
        if (!utils.isEmpty(errorClass) && !utils.isString(errorClass)) {
            return;
        }

        //check for valid values
        if (utils.isInDom(elementId)) {
            //set the elem's class
            let allClasses = utils.getFromDom(elementId).getAttribute("class");
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
                utils.getFromDom(elementId).setAttribute("class", allClasses);
            }
            if (utils.isInDom(errorId)) {
                utils.getFromDom(errorId).innerHTML = "";
                utils.getFromDom(errorId).style.display = "block";
                utils.getFromDom(errorId).style.visibility = "hidden";
            }
        }
    };


    this.isValidValidationType = function (validationType) {
        if (utils.isEmpty(validationType) || !utils.isString(validationType)) {
            return false;
        }
        if (utils.isInArray(validationType, validValidationTypes)) {
            return true;
        }
        return false;
    };

    this.setError = function(elementId, errorMessage) {
        //declare locals
        let errorId;
        let errorClass;

        //check for valid values
        if (!utils.isInDom(elementId)) {
            return;
        }

        //get the element's attributes
        errorId = domUtils.getErrorId(elementId);
        errorClass = domUtils.getErrorClass(elementId);

        //check for valid values
        if (!utils.isInDom(errorId)) {
            return;
        }
        if (!utils.isEmpty(errorClass) && !utils.isString(errorClass)) {
            return;
        }

        if (utils.isEmpty(errorMessage)) {
            errorMessage = "";
        }

        if (utils.isInDom(elementId)) {
            //set the elem's class
            let allClasses = utils.getFromDom(elementId).getAttribute("class");
            let arrClasses = utils.string2array(allClasses, " ");
            if (!utils.isInArray(errorClass, arrClasses)) {
                allClasses += " " + errorClass;
                utils.getFromDom(elementId).setAttribute("class", allClasses);
            }
            if (utils.isInDom(errorId)) {
                utils.getFromDom(errorId).innerHTML = errorMessage;
                utils.getFromDom(errorId).style.display = "block";
                utils.getFromDom(errorId).style.visibility = "visible";
            }
        }
    };

    this.clearValidations = function (idsArray) {
        //declare locals
        let elementId;

        //check for valid values
        if (utils.isEmpty(idsArray)) {
            return;
        }
        if (!utils.isArray(idsArray)) {
            if (utils.isString(idsArray)) {
                idsArray = utils.string2array(idsArray);
            }
            else {
                return;
            }
        }

        //loop through the items
        for (let i=0; i<idsArray.length; i++) {
            //get the current item
            elementId = idsArray[i];

            //check for valid values
            if (!utils.isInDom(elementId)) {
                continue;
            }

            //clear the current field
            try {
                utils.getFromDom(elementId).value = "";
            }
            catch(err) {}
            validationUtils.clearError(elementId);
        }
    };

    this.validate = function (idsArray, stopOnFirstError) {
        //declare locals
        let elementId;
        let errorMessage;
        let isValid = true;

        //check for valid values
        if (utils.isEmpty(idsArray)) {
            return false;
        }
        if (!utils.isArray(idsArray)) {
            if (utils.isString(idsArray)) {
                idsArray = utils.string2array(idsArray);
            }
            else {
                return false;
            }
        }

        //set defaults if necessary
        if (utils.isEmpty(stopOnFirstError) || !utils.isBool(stopOnFirstError)) {
            stopOnFirstError = true;
        }

        //loop through the items
        for (let i=0; i<idsArray.length; i++) {
            //get the current item
            elementId = idsArray[i];

            //check for valid values
            if (!utils.isInDom(elementId)) {
                continue;
            }

            //get the error message for this element
            errorMessage = validationUtils.getValidationError(elementId);

            //check for an error
            if (errorMessage==null) {
                validationUtils.clearError(elementId);
            }
            else {
                isValid = false;
                validationUtils.setError(elementId, errorMessage);
                if (stopOnFirstError) {
                    break;
                }
            }
        }

        //return the method's value
        return isValid;
    };
};
const animationUtils = new function() {
    function _fadeIn(nodeId, animationDuration) {
        let realNode = domUtils.getRealNode(nodeId);
        realNode.animate([{"opacity": "0"},{"opacity": "1"}], animationDuration);
    }

    function _fadeOut(nodeId, animationDuration) {
        let realNode = domUtils.getRealNode(nodeId);
        realNode.animate([{"opacity": "1"},{"opacity": "0"}], animationDuration);
    }

    this.fadeIn = function(nodeId, animationDuration) {
        _fadeIn(nodeId, animationDuration);
    };

    this.fadeOut = function(nodeId, animationDuration) {
        _fadeOut(nodeId, animationDuration);
    };
};
const domUtils = new function() {
    this.animate = function(nodeId, props, time) {
        //declare variables
        let arrProps;
        let start = new Date().getTime();
        let timer;
        let step;
        let stepValue;
        let htmlNode;
        let cssProp;
        let interval = 50;

        //check for valid values
        if(!utils.isString(nodeId) || !utils.isInDom(nodeId)) {
            return;
        }

        //get an array of css properties
        arrProps = domUtils._cssProps2Array(props);

        //check for valid values
        if (arrProps==null) {
            return;
        }

        //get the html node
        htmlNode = utils.getFromDom(nodeId);

        // start the animation interval, make it wicked fast
        timer = setInterval(function() {
            step = Math.min(1,(new Date().getTime() - start) / time)
            for (let i=0; i<arrProps.length; i++) {
                cssProp = domUtils._parseCssProperty(nodeId, arrProps[i]);
                if (cssProp==null) {
                    continue;
                }
                if (utils.isEmpty(cssProp.name) || isNaN(cssProp.value) || utils.isEmpty(cssProp.currHtmlValue) || isNaN(cssProp.currHtmlValue)) {
                    continue;
                }
                stepValue = (cssProp.currHtmlValue + step * (cssProp.value - cssProp.currHtmlValue));
                htmlNode.style[cssProp.name] = stepValue + cssProp.units;
            }
            if( step === 1) clearInterval(timer);
        }, interval);
        /*
        for (let j=0; j<arrProps.length; j++) {
            cssProp = domUtils._parseCssProperty(nodeId, arrProps[j]);
            if (cssProp==null) {
                continue;
            }
            if (utils.isEmpty(cssProp.name) || utils.isEmpty(cssProp.currHtmlValue)) {
                continue;
            }
            htmlNode.style[cssProp.name] = cssProp.currHtmlValue + cssProp.units;
        }

         */
    };

    function _addEventListener(node, eventName, eventHandler) {
        //declare locals
        let dataAttributeName = "data-hasEventListener-";
        let dataAttributeValue = null;
        let realNode = null;

        //check for valid values
        if (utils.isEmpty(node)) {
            return;
        }
        if (!utils.isString(eventName) || !utils.isFunction(eventHandler)) {
            return;
        }
        if (utils.isString(node) && utils.isInDom(node)) {
            realNode = document.getElementById(node);
        }
        else if (utils.isElementNode(node)) {
            realNode = node;
        }
        dataAttributeName += eventName;

        //check for a valid node
        if (realNode!=null) {
            if (domUtils.hasAttribute(node, dataAttributeName)) {
                dataAttributeValue = domUtils.getAttributeValue(node, dataAttributeName);
            }
            if (!utils.isTrue(dataAttributeValue)) {
                node.addEventListener(eventName, function(event) {
                    eventHandler(event);
                });
                domUtils.setAttributeValue(node, dataAttributeName, "true");
            }
        }
    }

    this._cssProps2Array = function (cssProps) {
        //declare variables
        let propsDelimiters = [",",";"];
        let delimiter = null;
        let arrProps;
        let propItem;
        let jsonItem;
        let fieldName;
        let fieldValue;

        //check for valid values
        if (utils.isEmpty(cssProps)) {
            return null;
        }
        if (!utils.isArray(cssProps)) {
            if (utils.isString(cssProps)) {
                for (let i=0; i<propsDelimiters.length; i++) {
                    if (cssProps.indexOf(propsDelimiters[i])==-1) {
                        continue;
                    }
                    delimiter = propsDelimiters[i];
                    break;
                }
                if (delimiter==null) {
                    arrProps = [cssProps];
                }
                else {
                    arrProps = utils.string2array(cssProps, delimiter);
                }
            }
            else if (utils.isJson(cssProps)) {
                arrProps = [];
                propItem = {};
                //loop through its fields
                for (let field in cssProps) {
                    if (!cssProps.hasOwnProperty(field)) {
                        continue;
                    }
                    propItem[field] = cssProps[field];
                    arrProps.push(propItem);
                }
            }
            else {
                return;
            }
        }
        else if (utils.isJson(cssProps)) {
            //loop through the items
            arrProps = [];
            //loop through its fields
            for (let i=0; i<cssProps.length; i++) {
                //get the current item
                propItem = cssProps[i];
                if (utils.isString(propItem)) {
                    for (let i=0; i<propsDelimiters.length; i++) {
                        if (propItem.indexOf(propsDelimiters[i])==-1) {
                            continue;
                        }
                        delimiter = propsDelimiters[i];
                        break;
                    }
                    if (delimiter==null) {
                        arrProps.push(propItem);
                    }
                    else {
                        arrProps.push(utils.string2array(propItem, delimiter));
                    }
                }
                else if (utils.isJson(propItem)) {
                    arrProps = [];
                    //loop through its fields
                    for (let field in propItem) {
                        if (!propItem.hasOwnProperty(field)) {
                            continue;
                        }
                        jsonItem = {};
                        fieldName = field;
                        fieldValue = propItem[field];
                        jsonItem[fieldName] = fieldValue;
                        arrProps.push(jsonItem);
                    }
                }
                else {
                    continue;
                }
            }
        }
        else {
            return null;
        }

        //return the method's value
        return arrProps;
    };

    this._parseCssProperty = function (nodeId, cssProp) {
        //declare locals
        let keyValueDelimiter = ":";
        let validUnits = html5Utils.listAsValuesArray("cssUnitsList");
        let defaultUnits = "px";
        let arrParts;
        let currPropName;
        let currPropValue = null;
        let currPropUnits = null;
        let currNodeValue = null;
        let currNodeUnits = null;
        let htmlNode;
        let retVal = null;

        //check for valid values
        if (!utils.isInDom(nodeId) || utils.isEmpty(cssProp)) {
            return null;
        }
        if (utils.isJson(cssProp)) {
            for (let field in cssProp) {
                if (!cssProp.hasOwnProperty(field)) {
                    continue;
                }
                currPropName = field;
                currPropValue = String(cssProp[currPropName]);
            }
        }
        else if (utils.isString(cssProp)) {
            if (cssProp.indexOf(keyValueDelimiter)==-1) {
                return null;
            }
            arrParts = cssProp.split(keyValueDelimiter);
            currPropName = arrParts[0].trim();
            currPropValue = arrParts[1].trim();
        }
        else {
            return null;
        }
        if (utils.isEmpty(currPropName)) {
            return null;
        }

        //get the html node
        htmlNode = utils.getFromDom(nodeId);

        //get the html node's current value
        currNodeValue = htmlNode.style[currPropName];

        //check for nulls
        if (utils.isEmpty(currNodeValue)) {
            currNodeValue = 0;
        }
        else {
            //check for non-numeric values
            if (isNaN(currNodeValue)) {
                //get the units used
                currNodeUnits = "";
                for (let i=0; i<validUnits.length; i++) {
                    if (currNodeValue.toLowerCase().indexOf(validUnits[i])!=-1) {
                        currNodeUnits = validUnits[i];
                        currNodeValue = utils.replaceAll(currNodeValue, currNodeUnits, "");
                        currNodeValue = parseInt(currNodeValue);
                        break;
                    }
                }
            }
            else {
                currNodeUnits = defaultUnits;
                currNodeValue = parseInt(currNodeValue);
            }
        }

        //check the property's value
        if (isNaN(currPropValue)) {
            //get the units used
            currPropUnits = "";
            for (let i=0; i<validUnits.length; i++) {
                if (currPropValue.toLowerCase().indexOf(validUnits[i])!=-1) {
                    currPropUnits = validUnits[i];
                    currPropValue = utils.replaceAll(currPropValue, currPropUnits, "");
                    currPropValue = parseInt(currPropValue);
                    break;
                }
            }
        }
        else {
            currPropUnits = defaultUnits;
            currPropValue = parseInt(currPropValue);
        }

        //set default property units if necessary
        if (utils.isEmpty(currPropUnits)) {
            if (!utils.isEmpty(currNodeUnits)) {
                currPropUnits = currNodeUnits;
            }
        }

        retVal = {"name": currPropName, "value": currPropValue, "units": currPropUnits, "currHtmlValue": currNodeValue};

        //return the method's value
        return retVal;
    };

    this.addEventListener = function(node, eventName, eventHandler) {
        _addEventListener(node, eventName, eventHandler);
    };

    this.getAttributeValue = function(elemId, attributeName) {
        //declare locals
        let retVal = null;
        let elem = null;
        let currAttName;
        let currAttValue;

        //check for valid values
        if (utils.isEmpty(elemId) || utils.isEmpty(attributeName)) {
            return null;
        }
        if (utils.isString(elemId) && utils.isInDom(elemId)) {
            elem = document.getElementById(elemId);
        }
        else if (utils.isElementNode(elemId)) {
            elem = elemId;
        }
        if (elem!=null && utils.isString(attributeName)) {
            //get the element's attributes node map
            const nodeMap = elem.attributes;

            //loop through the items
            for (let i=0; i<nodeMap.length; i++) {
                //get the current attribute's name and value
                currAttName = nodeMap[i].name;
                currAttValue = nodeMap[i].value;

                //check for the requested name
                if (currAttName.toLowerCase()==attributeName.toLowerCase()) {
                    retVal = currAttValue;
                    break;
                }
            }
        }

        //return the method's value
        return retVal;
    };

    this.getComponentLeftCenter = function(elementId, reduceWidth) {
        //declare locals
        let elemWidth;
        let clientWidth;
        let posLeft = -1;

        //get the element
        let elem = utils.getFromDom(elementId);

        //check for valid values
        if (elem==null) {
            return posLeft;
        }

        //get the element's height
        elemWidth = elem.width;
        if (utils.isEmpty(elemWidth)) {
            elemWidth = elem.offsetWidth;
        }

        //check for valid values
        if (utils.isEmpty(elemWidth)) {
            return posLeft;
        }
        if (!utils.isEmpty(reduceWidth) && !isNaN(reduceWidth)) {
            elemWidth = elemWidth + reduceWidth;
        }

        //get the window's height and width
        clientWidth = window.innerWidth;

        //calculate the center
        posLeft = ((clientWidth - elemWidth) / 2);

        //return the method's value
        return posLeft;
    };

    this.getComponentTopCenter = function(elementId, reduceHeight) {
        //declare locals
        let elemHeight;
        let clientHeight;
        let posTop = -1;

        //get the element
        let elem = utils.getFromDom(elementId);

        //check for valid values
        if (elem==null) {
            return posTop;
        }

        //get the element's height
        elemHeight = elem.height;
        if (utils.isEmpty(elemHeight)) {
            elemHeight = elem.offsetHeight;
        }

        //check for valid values
        if (utils.isEmpty(elemHeight)) {
            return posTop;
        }
        if (!utils.isEmpty(reduceHeight) && !isNaN(reduceHeight)) {
            elemHeight = elemHeight + reduceHeight;
        }

        //get the window's height and width
        clientHeight = window.innerHeight;

        //calculate the center
        posTop = ((clientHeight - elemHeight) / 2);

        //return the method's value
        return posTop;
    };

    this.centerComponent = function(elementId, reduceHeight, reduceWidth) {
        //declare locals
        let posLeft = -1;
        let posTop = -1;
        let units = "px";

        //get the element
        let elem = utils.getFromDom(elementId);

        //check for valid values
        if (elem==null) {
            return;
        }

        //calculate the left and top center positions
        posLeft = domUtils.getComponentLeftCenter(elementId, reduceWidth);
        posTop = domUtils.getComponentTopCenter(elementId, reduceHeight);
        console.debug("elementId=[" + elementId + "]\nposTop=[" + posTop + "]\nposLeft=[" + posLeft + "]");

        //check for valid values
        if (!utils.isInvalidNumber(posLeft)) {
            elem.style.left = posLeft + units;
        }
        if (!utils.isInvalidNumber(posTop)) {
            elem.style.top = posTop + units;
        }
    };

    this.getHeight = function (elementId, heightOnly) {
        //declare locals
        let sizeValue = 0;

        if (!utils.isInDom(elementId)) {
            return 0;
        }

        //get the html node
        let htmlNode = utils.getFromDom(elementId);

        //get the element's height and width
        sizeValue = htmlNode.height;
        if (utils.isEmpty(sizeValue)) {
            if (!utils.isEmpty(heightOnly) && utils.isBool(heightOnly) && heightOnly==true) {
                sizeValue = null;
            }
            else {
                sizeValue = htmlNode.offsetHeight;
            }
        }

        //check for valid values
        if (utils.isEmpty(sizeValue)) {
            return 0;
        }

        //return the method's value
        return sizeValue;
    };

    this.getWidth = function (elementId, widthtOnly) {
        //declare locals
        let sizeValue = 0;

        if (!utils.isInDom(elementId)) {
            return 0;
        }

        //get the html node
        let htmlNode = utils.getFromDom(elementId);

        //get the element's height and width
        sizeValue = htmlNode.width;
        if (utils.isEmpty(sizeValue)) {
            if (!utils.isEmpty(widthtOnly) && utils.isBool(widthtOnly) && widthtOnly==true) {
                sizeValue = null;
            }
            else {
                sizeValue = htmlNode.offsetWidth;
            }
        }

        //check for valid values
        if (utils.isEmpty(sizeValue)) {
            return 0;
        }

        //return the method's value
        return sizeValue;
    };

    this.getRealNode = function(nodeId) {
        let realNode = null;

        //check for valid values
        if (utils.isEmpty(nodeId)) {
            return null;
        }
        if (utils.isString(nodeId) && utils.isInDom(nodeId)) {
            realNode = document.getElementById(nodeId);
        }
        else if (utils.isElementNode(nodeId)) {
            realNode = nodeId;
        }
        return realNode;
    };

    this.getStyle = function (elemId, cssPropertyName) {
        //declare locals
        let elemNode = null;
        let cssPropertyValue = "";

        //check for valid values
        if (utils.isEmpty(elemId) || !utils.isString(cssPropertyName)) {
            return cssPropertyValue;
        }
        if (utils.isString(elemId) && utils.isInDom(elemId)) {
            elemNode = document.getElementById(elemId);
        }
        else if (utils.isElementNode(elemId)) {
            elemNode = elemId;
        }
        if (elemNode==null) {
            return cssPropertyValue;
        }

        try {
            cssPropertyValue = elemNode.style[cssPropertyName];
        }
        catch(err) {}
        if (utils.isEmpty(cssPropertyValue)) {
            cssPropertyValue = "";
        }

        //return the method's value
        return cssPropertyValue;
    };

    this.getUiItemValue = function(uiItemId) {
        //declare locals
        let retVal = null;
        let elem;
        let tagName;
        let inputType;

        //check for valid values
        if (!utils.isInDom(uiItemId)) {
            return null;
        }

        //get the element's tag name
        elem = document.getElementById(uiItemId);
        tagName = elem.tagName;

        //check for a tagName
        if (utils.isEmpty(tagName)) {
            return null;
        }

        //check the tagName
        switch(tagName.toLowerCase()) {
            case "input":
                //get the input's type attribute
                inputType = domUtils.getAttributeValue(uiItemId, "type");

                //check the input type
                if (inputType.toLowerCase()=="checkbox" || inputType.toLowerCase()=="radio") {
                    retVal = domUtils.getAttributeValue(uiItemId, "checked");
                }
                else {
                    retVal = elem.value;
                }
                break;
            case "select":
            case "textarea":
                //get the input's value
                retVal = elem.value;
                break;
            default:
                if (elem.hasOwnProperty("value")) {
                    retVal = elem.value;
                }
                break;
        }

        //return the method's value
        return retVal;
    };

    this.getCssTagId = function(config) {
        //declare locals
        let retVal;
        let styleTag = "style";
        let prefix = "cssTag";

        //check the configuration
        if (config==null) {
            retVal = utils.generateId(styleTag, prefix);
        }
        else {
            if (config.hasOwnProperty("cssTagId")) {
                retVal = config.cssTagId;
            }
            else {
                retVal = utils.generateId(styleTag, prefix);
            }
        }

        //return the method's value
        return retVal;
    };

    this.getElementId = function(config, tagName, idPrefix) {
        //declare locals
        let retVal;

        //check for valid values
        if (config==null) {
            if (utils.isEmpty(tagName) || utils.isEmpty(idPrefix)) {
                return "";
            }
            retVal = utils.generateId(tagName, idPrefix);
        }
        else {
            //check the configuration
            if (config.hasOwnProperty("id") && utils.isString(config.id)) {
                retVal = config.id;
            }
            else {
                retVal = utils.generateId(tagName, idPrefix);
            }
        }
        if (utils.isEmpty(retVal)) {
            retVal = utils.generateId(tagName, idPrefix);
        }

        //return the method's value
        return retVal;
    };

    this.changeTheme = function(linkId, theme) {
        //declare locals
        let methodName = "domUtils.changeTheme(): ";
        let message;

        //check for valid values
        if (utils.isEmpty(linkId)) {
            message = "linkId is empty or null !!";
            console.error(methodName + message);
            return;
        }
        if (!utils.isInDom(linkId)) {
            message = "linkId=[" + linkId + "] is NOT in DOM !!";
            console.error(methodName + message);
            return;
        }
        if (utils.isEmpty(theme)) {
            message = "theme is empty or null !!";
            console.error(methodName + message);
            return;
        }
        if (!utils.isString(theme)) {
            message = "theme must be a string !!";
            console.error(methodName + message);
            return;
        }
        if (theme.toLowerCase().indexOf(".css")==-1) {
            theme += ".css";
        }

        //change the href attribute of the link
        utils.getFromDom(linkId).setAttribute("href", theme);
    };

    this.getErrorClass = function(elemId) {
        //declare locals
        let attributeName = "data-error-class";
        let elem;
        let retVal = null;

        //check for valid values
        if (utils.isInDom(elemId)) {
            //get the element's html node
            elem = document.getElementById(elemId);
            try {
                retVal = elem.getAttribute(attributeName);
            }
            catch (err) {
                console.error("domUtils.getErrorClass(): Error is: " + err);
            }
        }

        //return the method's value
        return retVal;
    };

    this.getErrorId = function(elemId) {
        //declare locals
        let attributeName = "data-error-id";
        let elem;
        let retVal = null;

        //check for valid values
        if (utils.isInDom(elemId)) {
            //get the element's html node
            elem = document.getElementById(elemId);
            try {
                retVal = elem.getAttribute(attributeName);
            }
            catch (err) {
                console.error("domUtils.getErrorId(): Error is: " + err);
            }
        }

        //return the method's value
        return retVal;
    };

    this.hasAttribute = function(elemId, attributeName) {
        //declare locals
        let retVal = false;
        let elem = null;
        let currAttName;

        //check for valid values
        if (utils.isEmpty(elemId) || utils.isEmpty(attributeName)) {
            return false;
        }
        if (utils.isString(elemId) && utils.isInDom(elemId)) {
            elem = document.getElementById(elemId);
        }
        else if (utils.isElementNode(elemId)) {
            elem = elemId;
        }
        if (elem!=null && utils.isString(attributeName)) {
            //get the element's attributes node map
            const nodeMap = elem.attributes;

            //loop through the items
            for (let i=0; i<nodeMap.length; i++) {
                //get the current attribute's name and value
                currAttName = nodeMap[i].name;

                //check for the requested name
                if (currAttName.toLowerCase()==attributeName.toLowerCase()) {
                    retVal = true;
                    break;
                }
            }
        }

        //return the method's value
        return retVal;
    };

    this.setAttributeValue = function(elemId, attributeName, attributeValue) {
        //declare locals
        let elem = null;

        //check for valid values
        if (utils.isEmpty(elemId) || utils.isEmpty(attributeName)) {
            return;
        }
        if (utils.isString(elemId) && utils.isInDom(elemId)) {
            elem = document.getElementById(elemId);
        }
        else if (utils.isElementNode(elemId)) {
            elem = elemId;
        }
        if (elem!=null && utils.isString(attributeName)) {
            //fix the attribute name
            attributeName = attributeName.toLowerCase();

            //get the element's attributes node map
            switch (attributeName) {
                case "tooltip":
                    attributeName = "title";
                    break;
                case "caption":
                case "innerhtml":
                case "innertext":
                case "text":
                    attributeName = "text";
                    break;
                case "movable":
                    attributeName = "draggable";
                    break;
                default:
                    break;
            }
            try {
                if (attributeName=="text") {
                    elem.innerHTML = attributeValue;
                }
                else {
                    elem.setAttribute(attributeName, attributeValue);
                }
            }
            catch (err) {
                console.error("domUtils.setAttributeValue(): Error is: " + err);
            }
        }
    };

    this.setErrorClass = function(htmlNode, errorClass) {
        //declare locals
        let attributeName = "data-error-class";

        //check for valid values
        if (utils.isEmpty(htmlNode) || !utils.isString(errorClass)) {
            return;
        }

        //set the attribute
        try {
            htmlNode.setAttribute(attributeName, errorClass);
        }
        catch (err) {
            console.error("domUtils.setErrorClass(): Error is: " + err);
        }
    };

    this.setErrorId = function(htmlNode, errorId) {
        //declare locals
        let attributeName = "data-error-id";

        //check for valid values
        if (utils.isEmpty(htmlNode) || !utils.isString(errorId)) {
            return;
        }

        //set the attribute
        try {
            htmlNode.setAttribute(attributeName, errorId);
        }
        catch (err) {
            console.error("domUtils.setErrorId(): Error is: " + err);
        }
    };

    this.styleString2StyleJson = function (styleString) {
        //declare locals
        let itemsDelimiter = ";";
        let keyValueDelimiter = ":";
        let arrStyleAttributes;
        let currItem;
        let arrItemParts;
        let attName;
        let attValue;
        let jsonStyle;

        //check for valid values
        if (utils.isEmpty(styleString)) {
            return null;
        }
        if (!utils.isString(styleString) && !utils.isJson(styleString)) {
            return null;
        }

        //check the style value's type (String or json)
        if (utils.isString(styleString)) {
            //check for a delimiter
            if (styleString.indexOf(itemsDelimiter)==-1) {
                arrStyleAttributes = [styleString];
            }
            else {
                arrStyleAttributes = styleString.split(itemsDelimiter);
            }
            jsonStyle = {};

            //loop through the items
            for (let i=0; i<arrStyleAttributes.length; i++) {
                //get the current item
                currItem = arrStyleAttributes[i];

                //check valid values
                if (!utils.isString(currItem)) {
                    continue;
                }
                currItem = currItem.trim();

                //check valid values
                if (currItem.indexOf(keyValueDelimiter)==-1) {
                    continue;
                }

                //split the item into an array of key and value
                arrItemParts = currItem.split(keyValueDelimiter);
                if (!utils.isString(arrItemParts[0] || !utils.isString(arrItemParts[1]))) {
                    continue;
                }
                attName = arrItemParts[0].toLowerCase().trim();
                attValue = arrItemParts[1].toLowerCase().trim();

                //build the json item
                jsonStyle[attName] = attValue;
            }
        }
        else {
            jsonStyle = styleString;
        }

        //return the method's value
        return jsonStyle;
    };

    this.setStyle = function (elemId, attributeValue) {
        //declare locals
        let elemNode = null;
        let jsonStyle;

        //check for valid values
        if (utils.isEmpty(elemId) || utils.isEmpty(attributeValue)) {
            return;
        }
        if (utils.isString(elemId) && utils.isInDom(elemId)) {
            elemNode = document.getElementById(elemId);
        }
        else if (utils.isElementNode(elemId)) {
            elemNode = elemId;
        }
        if (elemNode==null || (!utils.isString(attributeValue) && !utils.isJson(attributeValue))) {
            return;
        }

        //convert the style string into a json
        jsonStyle = domUtils.styleString2StyleJson(attributeValue);

        //check for valid values
        if (!utils.isJson(jsonStyle)) {
            return;
        }

        //loop through the items
        for (let field in jsonStyle) {
            //check for valid values
            if (jsonStyle.hasOwnProperty(field) && !utils.isEmpty(jsonStyle[field])) {
                //set the element's attribute
                try {
                    elemNode.style[field] = jsonStyle[field];
                }
                catch (err) {}
            }
        }
    };

    function _setCssProps(domNode, cssProps) {
        //declare locals
        let itemsDelimiter = ";";
        let keyValueDelimiter = ":";
        let arrStyleAttributes;
        let currItem;
        let arrItemParts;
        let attName;
        let attValue;

        //check for valid values
        if (utils.isEmpty(domNode) || !utils.isString(cssProps)) {
            return;
        }

        //check for a delimiter
        if (cssProps.indexOf(itemsDelimiter)==-1) {
            arrStyleAttributes = [cssProps];
        }
        else {
            arrStyleAttributes = cssProps.split(itemsDelimiter);
        }

        //loop through the items
        for (let i=0; i<arrStyleAttributes.length; i++) {
            //get the current item
            currItem = arrStyleAttributes[i];
            currItem = currItem.trim();

            //check for a valid item
            if (currItem.indexOf(keyValueDelimiter)==-1) {
                continue;
            }

            //split the item into an array of key and value
            arrItemParts = currItem.split(keyValueDelimiter);
            attName = arrItemParts[0].toLowerCase().trim();
            attValue = arrItemParts[1].toLowerCase().trim();

            //set the element's attribute
            try {
                domNode.style[attName] = attValue;
            }
            catch (err) {}
        }
    };

    function _setCssProperty(domNode, propName, propValue) {
        //check for valid values
        if (utils.isEmpty(domNode) || !utils.isString(propName) || !utils.isString(propValue)) {
            return;
        }

        //set the element's attribute
        try {
            domNode.style[propName] = propValue;
        }
        catch (err) {}
    };

    this.css = function(selector, jsonCss, propValue) {
        //declare locals
        let nodes;
        let currNode;
        let currCssProp;

        //check for valid values
        if (!utils.isString(selector)) {
            return;
        }

        //create an array of necessary
        if (!utils.isArray(jsonCss)) {
            jsonCss = [jsonCss];
        }

        //get elements by their class name
        nodes = document.getElementsByClassName(selector);

        //check for valid values
        if (utils.isEmpty(nodes)) {
            return;
        }

        //loop through the items
        for (let i=0; i<nodes.length; i++) {
            //get the current item
            currNode = nodes[i];

            //loop through the css properties array
            for (let j=0; j<jsonCss.length; j++) {
                //get the current item
                currCssProp = jsonCss[j];

                //check for valid values
                if (!utils.isString(currCssProp) && !utils.isJson(currCssProp)) {
                    continue;
                }
                if (utils.isJson(currCssProp)) {
                    for (let prop in currCssProp) {
                        if (currCssProp.hasOwnProperty(prop)) {
                            currNode.style[prop] = currCssProp[prop];
                        }
                    }
                }
                else {
                    if (utils.isString(propValue)) {
                        _setCssProperty(currNode, currCssProp, propValue);
                    }
                    else {
                        _setCssProps(currNode, currCssProp);
                    }
                }
            }
        }
    };

};
const ajaxUtils = new function() {
    //declare globals
    let _loaderComp = null;
    let _errorContainerId = null;

    this.setLoader = function(loader) {
        ajaxUtils._loaderComp = loader;
    };

    this.setErrorId = function(errorContainerId) {
        ajaxUtils._errorContainerId = errorContainerId;
    };

    this.sendGet = function(url, onsuccess, onFailure, configOpts) {
        //declare locals
        let methodName = "sendGet(): ";
        let logMessage = "";

        //check for valid values
        if (utils.isEmpty(url)) {
            logMessage = "url is empty or null !!";
            console.error(methodName + logMessage);
            return;
        }
        logMessage = "sending ajax get to: " + url;
        console.debug(methodName + logMessage);

        //hide previous errors
        ajaxUtils.hideError();

        //show the loader
        if (ajaxUtils._loaderComp!=null) {
            ajaxUtils._loaderComp.show();
        }

        //send an ajax request
        axios.get(url, configOpts)
            .then(function (rawResponse) {
                //log the response
                let response = rawResponse.data;
                console.debug(methodName + JSON.stringify(response));

                //check the response
                if (response.hasOwnProperty("code") && (response.code != 200)) {
                    ajaxUtils.showError(response);
                }
                else {
                    //invoke the onsuccess function handler
                    if (!utils.isEmpty(onsuccess)) {
                        if (typeof(onsuccess)=="function") {
                            //invoke the onsuccess function handler
                            onsuccess(response);
                        }
                        else if (typeof(onsuccess)=="string") {
                            //invoke the onsuccess function handler
                            if (utils.isString(response)) {
                                eval(onsuccess+"('"+response+"')");
                            }
                            else {
                                eval(onsuccess+"("+response+")");
                            }
                        }
                    }
                }
                //hide the loader
                if (ajaxUtils._loaderComp!=null) {
                    ajaxUtils._loaderComp.hide();
                }
            })
            .catch(function (error)  {
                //get the response
                let response = error.response;
                let responseStr = "";

                //check for a valid response
                if (utils.isEmpty(response)) {
                    response = "responseEmpty";
                }
                if (utils.isJson(response)) {
                    responseStr = JSON.stringify(response);
                }
                else if (utils.isString(response)) {
                    responseStr = response;
                }

                //check for an onFailure function handler
                if (!utils.isEmpty(onFailure)) {
                    if (typeof(onFailure)=="function") {
                        //invoke the onFailure function handler
                        onFailure(response);
                    }
                    else if (typeof(onFailure)=="string") {
                        if (utils.isString(response)) {
                            eval(onFailure+"('"+response+"')");
                        }
                        else {
                            eval(onFailure+"("+response+")");
                        }
                    }
                }
                else {
                    //log the error
                    console.error(methodName + responseStr);
                    //show the error
                    ajaxUtils.showError(response);
                }
                //hide the loader
                if (ajaxUtils._loaderComp!=null) {
                    ajaxUtils._loaderComp.hide();
                }
            });
    };

    this.sendPost = function(url, data, onsuccess, onFailure, configOpts) {
        //declare locals
        let methodName = "sendPost(): ";
        let logMessage = "";

        //check for valid values
        if (utils.isEmpty(url)) {
            logMessage = "url is empty or null !!";
            console.error(methodName + logMessage);
            return;
        }
        logMessage = "sending ajax post to: " + url;
        console.debug(methodName + logMessage);

        //hide previous errors
        ajaxUtils.hideError();

        //show the loader
        if (ajaxUtils._loaderComp!=null) {
            ajaxUtils._loaderComp.show();
        }

        //send an ajax request
        axios.post(url, data, configOpts)
            .then(function (rawResponse) {
                //log the response
                let response = rawResponse.data;
                console.debug(methodName + JSON.stringify(response));

                //check the response
                if (response.hasOwnProperty("code") && (response.code != 200)) {
                    ajaxUtils.showError(response);
                }
                else {
                    //invoke the onsuccess function handler
                    if (!utils.isEmpty(onsuccess)) {
                        //invoke the onsuccess function handler
                        if (utils.isString(response)) {
                            eval(onsuccess+"('"+response+"')");
                        }
                        else {
                            eval(onsuccess+"("+response+")");
                        }
                    }
                }
                //hide the loader
                if (ajaxUtils._loaderComp!=null) {
                    ajaxUtils._loaderComp.hide();
                }
            })
            .catch(function (error)  {
                //get the response
                let response = error.response;
                let responseStr = "";

                //check for a valid response
                if (utils.isEmpty(response)) {
                    response = "responseEmpty";
                }
                if (utils.isJson(response)) {
                    responseStr = JSON.stringify(response);
                }
                else if (utils.isString(response)) {
                    responseStr = response;
                }

                //check for an onFailure function handler
                if (!utils.isEmpty(onFailure)) {
                    if (typeof(onFailure)=="function") {
                        //invoke the onFailure function handler
                        onFailure(response);
                    }
                    else if (typeof(onFailure)=="string") {
                        //invoke the onFailure function handler
                        if (utils.isString(response)) {
                            eval(onFailure+"('"+response+"')");
                        }
                        else {
                            eval(onFailure+"("+response+")");
                        }
                    }
                }
                else {
                    //log the error
                    console.error(methodName + responseStr);
                    //show the error
                    ajaxUtils.showError(response);
                }
                //hide the loader
                if (ajaxUtils._loaderComp!=null) {
                    ajaxUtils._loaderComp.hide();
                }
            });
    };

    this.showError = function(response) {
        //declare locals
        let containerId = ajaxUtils._errorContainerId;

        //check for valid values
        if (!utils.isInDom(containerId)) {
            return;
        }

        //get the container by its id
        let container = document.getElementById(containerId);

        //build the html from the response
        let message;
        if (utils.isString(response)) {
            message = response;
        }
        else {
            if (response.hasOwnProperty("message")) {
                message = response.message;
            }
        }

        //render the html
        container.innerHTML = message;
        container.style.display = "block";
    };

    this.hideError = function() {
        //declare locals
        let containerId = ajaxUtils._errorContainerId;

        //check for valid values
        if (!utils.isInDom(containerId)) {
            return;
        }

        //get the container by its id
        let container = document.getElementById(containerId);

        //render the html
        container.style.display = "none";
        container.innerHTML = "";
    };
};
const i18n = new function() {
    let _config = {
        bundleFile: "/assets/i18n/bundle.json",
        language: "en",
        bundles: [],
        bundle: [],
        loadBundleCallback: null,
        changeLanguageCallback: null
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
        //this._loadBundleFromFile();
    };

    this._loadBundleFromFile = function() {
        let url = _config.bundleFile;
        let onsuccess = this._loadBundleSuccess;
        let onFailure = this._loadBundleFailure;
        let configOpts = {
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            }
        };
        ajaxUtils.sendGet(url, onsuccess, onFailure, configOpts);
    };

    this._loadBundleSuccess = function(response) {
        _config.bundles = response;
        //invoke the callback
        i18n._invokeCallback(_config.loadBundleCallback);
    };

    this._loadBundleFailure = function(response) {
        let message = "An error occurred while trying to load bundle=[" + _config.bundleFile + "] !! Error is: " + response;
        console.error(message);
    };

    this._decodeParamsInValue = function(value, params) {
        //declare locals
        let _retVal = value;
        let _nameField = "name";
        let _valueField = "value";
        let _currParam = null;
        let _currParamKey = null;
        let _currParamValue = null;
        let nameField;
        let valueField;

        //check for nulls
        if (utils.isEmpty(value)) {
            return _retVal;
        }
        if (utils.isEmpty(params)) {
            return _retVal;
        }
        if (!utils.isArray(params)) {
            if (!utils.isJson(params)) {
                return _retVal;
            }
            else {
                if (!jsonUtils.hasField(params, _nameField) || !jsonUtils.hasField(params, _valueField)) {
                    return _retVal;
                }
                nameField = jsonUtils.getName(params, _nameField);
                valueField = jsonUtils.getName(params, _valueField);
                params = [{ name: params[nameField], value: params[valueField] }];
            }
        }

        //loop through the number of parameters in the value
        for (let i=0;i<params.length;i++) {
            //get the current item
            _currParam = params[i];

            //check for valid values
            if (!utils.isJson(_currParam)) {
                continue;
            }
            if (!jsonUtils.hasField(_currParam, _nameField) || !jsonUtils.hasField(_currParam, _valueField)) {
                continue;
            }

            //get the current item's fields
            nameField = jsonUtils.getName(_currParam, _nameField);
            valueField = jsonUtils.getName(_currParam, _valueField);

            //get the current item's key and value
            _currParamKey = "{" + _currParam[nameField] + "}";
            _currParamValue = _currParam[valueField];

            //replace the key with the value
            _retVal = _retVal.replace(_currParamKey,_currParamValue);
        }

        //return the method's value
        return _retVal;
    };

    this._getValidAttNameKeys = function() {
        //declare locals
        let validKeys = ["attName","attribute","attributeName"];

        //return the method's values
        return validKeys;
    };

    this._getValidKeyFieldKeys = function() {
        //declare locals
        let validKeys = ["key","param","word"];

        //return the method's values
        return validKeys;
    };

    this._invokeCallback = function(callback) {
        //invoke the callback
        if (utils.isString(callback)) {
            if (callback.indexOf(")")==-1) {
                callback += "()";
            }
            eval(callback);
        }
        else if (utils.isFunction(callback)) {
            callback();
        }
    };

    /**
     * Changes the current bundle into the new given bundle.
     * @param bundle The new bundle to use.
     */
    this.loadBundle = function(bundle) {
        _config.bundles = bundle;
        //invoke the callback
        i18n._invokeCallback(_config.loadBundleCallback);
    };

    /**
     * Changes the current language into the new given language.
     * @param language The new language to use.
     */
    this.changeLanguage = function(language) {
        //declare locals
        let methodName = "i18n.changeLanguage(): ";
        let message;
        let currItem;
        let langFieldName;
        let keyFieldName;
        let lang;
        let key;

        //check for valid values first
        if (utils.isEmpty(language)) {
            message = "language is empty or null !!";
            console.error(methodName + message);
            return message;
        }
        if (!utils.isString(language)) {
            message = "language must be a string !!";
            console.error(methodName + message);
            return message;
        }

        //check for a bundles array
        if (utils.isEmpty(_config.bundles) || !utils.isArray(_config.bundles)) {
            message = "bundles is INVALID !!";
            console.error(methodName + message);
            return message;
        }

        //clear the previous bundle
        _config.bundle = [];

        //loop through the array
        for (let i=0; i<_config.bundles.length; i++) {
            //get the current bundle
            currItem = _config.bundles[i];

            //check for valid values
            if (!utils.isJson(currItem)) {
                continue;
            }
            if (!jsonUtils.hasField(currItem, "lang") || !jsonUtils.hasField(currItem, "key")
                || (!jsonUtils.hasField(currItem, "value") && !jsonUtils.hasField(currItem, "list"))
                || !jsonUtils.hasField(currItem, "id")) {
                continue;
            }

            //get the real fields names
            langFieldName = jsonUtils.getName(currItem, "lang");
            keyFieldName = jsonUtils.getName(currItem, "key");
            lang = currItem[langFieldName];
            key = currItem[keyFieldName];

            //check for valid values
            if (!utils.isString(lang) || !utils.isString(key)) {
                continue;
            }

            //check the language
            if (lang.toLowerCase()==language.toLowerCase()) {
                _config.bundle.push(currItem);
            }
        }

        //check if the bundle was found
        if (_config.bundle.length<1) {
            _config.bundle = null;
            message = "language=[" + language + "] was NOT found in bundle file=[" + _config.bundleFile + "] !!";
            console.error(methodName + message);
            return message;
        }

        //invoke the callback
        if (utils.isString(_config.changeLanguageCallback)) {
            if (_config.changeLanguageCallback.indexOf(")")==-1) {
                _config.changeLanguageCallback += "()";
            }
            eval(_config.changeLanguageCallback);
        }
        else if (utils.isFunction(_config.changeLanguageCallback)) {
            _config.changeLanguageCallback();
        }

        //return the method's value
        return null;
    };

    /**
     * Sets a callback method to be invoked after a bundle was loaded successfully.
     * @param callback The callback function
     */
    this.setLoadBundleCallback = function(callback) {
        _config.loadBundleCallback = callback;
    };

    /**
     * Sets a callback method to be invoked after the language was chnaged successfully.
     * @param callback The callback function
     */
    this.setChangeLanguageCallback = function(callback) {
        _config.changeLanguageCallback = callback;
    };

    /**
     * Translates all the elements in the current bundle.
     */
    this.translateAll = function() {
        //declare locals
        let methodName = "i18n.translateAll(): ";
        let message;
        let validAttNameKeys = i18n._getValidAttNameKeys();
        let validKeyFieldKeys = i18n._getValidKeyFieldKeys();
        let keyField;
        let keyFieldValue;
        let currItem;
        let idField;
        let attNameField;
        let valueField;
        let listField;
        let elemId;
        let elem;
        let attName;
        let realElemId;
        let messageParams;

        //check for valid values
        if (!utils.isArray(_config.bundle)) {
            message = "bundle is INVALID !!";
            console.error(methodName + message);
            return message;
        }

        //loop through the items
        for (let i=0; i<_config.bundle.length; i++) {
            //get the current item
            currItem = _config.bundle[i];

            //check for valid values
            if (!utils.isJson(currItem)) {
                continue;
            }

            //get some fields names
            keyField = jsonUtils.getRealName(currItem, validKeyFieldKeys);
            idField = jsonUtils.getName(currItem, "id");
            valueField = jsonUtils.getName(currItem, "value");
            listField = jsonUtils.getName(currItem, "list");
            attNameField = jsonUtils.getRealName(currItem, validAttNameKeys);

            //check for valid values
            if (utils.isEmpty(keyField) || utils.isEmpty(idField) || !utils.isString(keyField) || !utils.isString(idField)) {
                continue;
            }
            if (utils.isEmpty(valueField) || !utils.isString(valueField)) {
                if (utils.isEmpty(listField) || !utils.isString(listField)) {
                    continue;
                }
            }

            //get the value of the key field
            keyFieldValue = jsonUtils.getValue(currItem, keyField, "");

            //check for valid values
            if (utils.isEmpty(keyFieldValue) || !utils.isString(keyFieldValue)) {
                continue;
            }

            //get the html element's id
            elemId = currItem[idField];

            //check for valid values
            if (!utils.isInDom(elemId)) {
                continue;
            }

            //get the html element
            elem = utils.getFromDom(elemId);

            //get the element's attribute name
            if (utils.isEmpty(attNameField)) {
                attNameField = "attName";
            }
            attName = currItem[attNameField];
            if (utils.isEmpty(attName)) {
                attName = "text";
            }

            //fix the element's id if necessary
            realElemId = elemId;
            if (elemId.toLowerCase().indexOf("_error")!=-1) {
                realElemId = utils.replaceAll(realElemId, "_Error", "");
            }

            //get the message parameters for the current message key
            messageParams = validationUtils.getValidationMessageParams(keyFieldValue, realElemId);

            //translate the message
            i18n.translate(keyFieldValue, elemId, attName, messageParams);
        }
    };

    /**
     * Returns the index of a given key and element id, in the bundle. Returns -1 if not found.
     * @param translationKey The translation key to set.
     * @param elementId The html element's id.
     */
    this.getIndexInBundle = function(translationKey, elementId) {
        //declare locals
        let validKeyFieldKeys = i18n._getValidKeyFieldKeys();
        let currItem;
        let idField;
        let keyField;
        let elemId;
        let itemKey;
        let index = -1;

        //loop through the items
        for (let i=0; i<_config.bundle.length; i++) {
            //get the current item
            currItem = _config.bundle[i];

            //check for valid values
            if (!utils.isJson(currItem)) {
                continue;
            }

            //get some fields names
            idField = jsonUtils.getName(currItem, "id");
            keyField = jsonUtils.getRealName(currItem, validKeyFieldKeys);

            //check for valid values
            if (utils.isEmpty(idField) || !utils.isString(idField)) {
                continue;
            }
            if (utils.isEmpty(keyField) || !utils.isString(keyField)) {
                continue;
            }

            //get the html element's id and the key
            elemId = currItem[idField];
            itemKey = currItem[keyField];

            //check if it is the correct element id and key
            if (elemId.toLowerCase() == elementId.toLowerCase() && itemKey.toLowerCase() == translationKey.toLowerCase()) {
                index = i;
                break;
            }
        }

        //return the method's value
        return index;
    };

    /**
     * Sets a translation key on an html element, which is translated immediately, and enables it to be translated by other language bundles.
     * @param translationKey The translation key to set.
     * @param elementId The html element's id.
     * @param attributeName The html element's attribute name.
     * @param params [optional] An array of parameters to replace within the translated message.
     */
    this.translate = function(translationKey, elementId, attributeName, params) {
        //declare locals
        let methodName = "i18n.translate(): ";
        let message;
        let validAttNameKeys = i18n._getValidAttNameKeys();
        let validKeyFieldKeys = i18n._getValidKeyFieldKeys();
        let elem;
        let currItem;
        let idField;
        let keyField;
        let attNameField;
        let valueField;
        let listField;
        let elemId;
        let attName;
        let itemValue;
        let itemIndex;
        let found = false;

        //check for valid values
        if (utils.isEmpty(translationKey)) {
            message = "translationKey is empty or null !!";
            console.error(methodName + message);
            return message;
        }
        if (!utils.isString(translationKey)) {
            message = "translationKey is NOT a valid string !!";
            console.error(methodName + message);
            return message;
        }
        if (utils.isEmpty(elementId)) {
            message = "elementId is empty or null !!";
            console.error(methodName + message);
            return message;
        }
        if (!utils.isString(elementId)) {
            message = "elementId is NOT a valid string !!";
            console.error(methodName + message);
            return message;
        }
        if (!utils.isInDom(elementId)) {
            message = "elementId is NOT in DOM !!";
            console.error(methodName + message);
            return message;
        }

        //check for a bundle
        if (!utils.isArray(_config.bundle)) {
            message = "bundle=[" + _config.bundleFile + "] is INVALID !!";
            console.error(methodName + message);
            return message;
        }

        //get the html element and set its i18n attribute
        if (utils.isEmpty(attributeName) || !utils.isString(attributeName)) {
            attributeName = "text";
        }
        elem = utils.getFromDom(elementId);

        //get the bundle index
        itemIndex = i18n.getIndexInBundle(translationKey, elementId);
        if (itemIndex==-1) {
            itemIndex = i18n.getIndexInBundle(translationKey, elementId+"_Error");
        }
        if (itemIndex!=-1) {
            //get the current item
            currItem = _config.bundle[itemIndex];

            //check for valid values
            if (utils.isJson(currItem)) {
                //get some fields names
                idField = jsonUtils.getName(currItem, "id");
                keyField = jsonUtils.getRealName(currItem, validKeyFieldKeys);
                valueField = jsonUtils.getName(currItem, "value");
                listField = jsonUtils.getName(currItem, "list");
                attNameField = jsonUtils.getRealName(currItem, validAttNameKeys);

                //check for valid values
                if (utils.isEmpty(idField) || !utils.isString(idField)) {
                    message = "idField is invalid for bundle item at index=[" + itemIndex + "] !!";
                    console.error(methodName + message);
                    return message;
                }
                if (utils.isEmpty(keyField) || !utils.isString(keyField)) {
                    message = "keyField is invalid for bundle item at index=[" + itemIndex + "] !!";
                    console.error(methodName + message);
                    return message;
                }
                if (utils.isEmpty(valueField) || !utils.isString(valueField)) {
                    if (utils.isEmpty(listField) || !utils.isString(listField)) {
                        message = "value or list field is invalid for bundle item at index=[" + itemIndex + "] !!";
                        console.error(methodName + message);
                        return message;
                    }
                }

                //get the html element's id and the key
                elemId = currItem[idField];

                //get the element's attribute name
                if (utils.isEmpty(attNameField)) {
                    attNameField = "attName";
                }
                attName = currItem[attNameField];
                if (utils.isEmpty(attName)) {
                    attName = "text";
                }

                //get the value (the translated string)
                if (currItem.hasOwnProperty("list")) {
                    itemValue = listUtils.getList(currItem[listField]);
                }
                else {
                    itemValue = currItem[valueField];
                    itemValue = i18n._decodeParamsInValue(itemValue, params);
                }
                if (currItem.hasOwnProperty("callback")) {
                    let fh = currItem.callback;
                    if (utils.isFunction(fh)) {
                        itemValue = fh(itemValue);
                    }
                    else if (utils.isString(fh)) {
                        itemValue = eval(fh+"('" + itemValue + "')");
                    }
                }

                //check the attribute's name
                switch (attName.toLowerCase()) {
                    case "caption":
                    case "innerhtml":
                    case "innertext":
                    case "text":
                        elem.innerHTML = itemValue;
                        break;
                    case "tooltip":
                        elem.setAttribute("title", itemValue);
                        break;
                    case "options":
                        let config = null;
                        if (currItem.hasOwnProperty("listConfig")) {
                            config = currItem.listConfig;
                        }
                        let selected = elem.value;
                        let optionsHtml = selectUtils.generateOptionsHtml(itemValue, selected, config);
                        elem.innerHTML = optionsHtml;
                        break;
                    case "style":
                        domUtils.setStyle(elementId, itemValue);
                        break;
                    default:
                        //set the element's attribute
                        elem.setAttribute(attName, itemValue);
                        break;
                }
                found = true;
                message = itemValue;
            }
        }

        //check if the key was found
        if (!found) {
            message = "!! String [" + translationKey + "] has NO translation for elementId=[" + elementId + "] in bundle [" + _config.bundleFile + "] !!"
            //console.error(methodName + message);
            return message;
        }

        //return the method's value
        return message;
    };

    //invoke the _init with the default configuration
    this._init(_config);
};
const selectUtils = new function() {
    this.hasOptions = function(listId) {
        //check for valid values
        if (!utils.isInDom(listId)) {
            return false;
        }

        //get the element by its id
        let elem = document.getElementById(listId);

        //check for options
        if (!elem.options) {
            return false;
        }

        //return the method's value
        return true;
    };

    this.getSize = function(listId) {
        //check for valid values
        if (!selectUtils.hasOptions(listId)) {
            return 0;
        }

        //get the element by its id
        let elem = document.getElementById(listId);

        //return the method's value
        return elem.options.length;
    };

    this.isSelected = function(listId) {
        //check for valid values
        if (!selectUtils.hasOptions(listId)) {
            return false;
        }

        //get the selected index
        let index = document.getElementById(listId).selectedIndex;

        //return the method's value
        return (index==-1 ? false : true);
    };

    this.optionExists = function(listId, value, isLabel) {
        //return the method's value
        return (selectUtils.indexOfList(listId, value, isLabel)==-1 ? false : true);
    };

    this.indexOfList = function(listId, value, isLabel) {
        //invoke the correct method
        if (isLabel==true) {
            return selectUtils.indexOfLabel(listId, value);
        }
        else {
            return selectUtils.indexOfValue(listId, value);
        }
    };

    this.indexOfValue = function(listId, value) {
        //declare locals
        let index = -1;

        //check for valid values
        if (!selectUtils.hasOptions(listId)) {
            return index;
        }
        if (utils.isEmpty(value)) {
            return index;
        }

        //get the options
        let opts = document.getElementById(listId).options;

        //loop through the items
        for (let i=0;i<opts.length;i++) {
            //get the current item
            let item = opts[i];

            //check for valid values
            if (utils.isEmpty(item.value)) {
                continue;
            }

            //compare the two values
            if (value.toLowerCase()==item.value.toLowerCase()) {
                index = i;
                break;
            }
        }

        //return the method's value
        return index;
    };

    this.indexOfLabel = function(listId, label) {
        //declare locals
        let index = -1;

        //check for valid values
        if (!selectUtils.hasOptions(listId)) {
            return index;
        }
        if (utils.isEmpty(value)) {
            return index;
        }

        //get the options
        let opts = document.getElementById(listId).options;

        //loop through the items
        for (let i=0;i<opts.length;i++) {
            //get the current item
            let item = opts[i];

            //check for valid values
            if (utils.isEmpty(item.text)) {
                continue;
            }

            //compare the two values
            if (value.toLowerCase()==item.text.toLowerCase()) {
                index = i;
                break;
            }
        }

        //return the method's value
        return index;
    };

    this.addOption = function(listId, value, text) {
        //check for valid values
        if (!utils.isInDom(listId)) {
            return;
        }

        //get the element
        let list = document.getElementById(listId);

        //create a new option
        let option = document.createElement("option");

        //set the option's attributes
        option.value = value;
        option.text = text;

        //add the option to the list
        list.add(option);
    };

    this.removeOption = function(listId, value, isLabel) {
        //check for valid values
        if (!utils.isInDom(listId)) {
            return;
        }

        //check if the option exists
        if (!selectUtils.optionExists(listId, value, isLabel)) {
            return;
        }

        //get the element
        let list = document.getElementById(listId);

        //get the option's index
        let index = -1;
        index = selectUtils.indexOfList(listId, value, isLabel);

        //remove the option
        list.remove(index);
    };

    this.updateOption = function(listId, oldValue, isLabel, newValue, newText) {
        //check for valid values
        if (!utils.isInDom(listId)) {
            return;
        }

        //check if the option exists
        if (!selectUtils.optionExists(listId, oldValue, isLabel)) {
            return;
        }

        //get the element
        let list = document.getElementById(listId);

        //get the option's index
        let index = -1;
        index = selectUtils.indexOfList(listId, oldValue, isLabel);

        //update the option
        list.options[index].value = newValue;
        list.options[index].text = newText;
    };

    this.clearList = function(listId) {
        //check for valid values
        if (!selectUtils.hasOptions(listId)) {
            return;
        }

        //get the element
        let elem = document.getElementById(listId);

        //loop through the items
        for (let i=(elem.options.length-1); i>=0; i--) {
            //remove the current item
            elem.options.remove(i);
        }
    };

    this.generateOptionsHtml = function(options, selected, config) {
        //declare locals
        let labelFieldDefault = "label";
        let valueFieldDefault = "value";
        let selectedFieldDefault = "selected";
        let html = '';
        let currItem;
        let labelField;
        let valueField;
        let selectedField;
        let labelVal;
        let valueVal;
        let selectedVal;
        let iconValue;
        let sort = false;
        let showIndex = false;
        let itemStyle = "";
        let index;

        //check for valid values
        if (utils.isString(options)) {
            options = listUtils.getList(options);
        }
        if (!utils.isArray(options)) {
            return html;
        }

        //check for configuration properties
        if (utils.isJson(config)) {
            if (config.hasOwnProperty("showIndex") && utils.isTrue(config.showIndex)) {
                showIndex = true;
            }
            if (config.hasOwnProperty("showIsortndex") && utils.isTrue(config.sort)) {
                sort = true;
            }
            if (config.hasOwnProperty("itemStyle") && utils.isString(config.itemStyle)) {
                itemStyle = trconfig.itemStyleue;
            }
        }
        if (sort==true) {
            options = listUtils.sort(options);
        }

        //loop through the items
        for (let i=0; i<options.length; i++) {
            //get the current item
            currItem = options[i];
            index = (i+1);

            //check for valid values
            if (!utils.isJson(currItem)) {
                continue;
            }

            //get the names of the label and value fields in the received json array
            if (utils.isJson(config)) {
                if (config.hasOwnProperty("labelField") && utils.isString(config.labelField)) {
                    labelField = jsonUtils.getName(currItem, config.labelField);
                }
                else {
                    labelField = jsonUtils.getName(currItem, labelFieldDefault);
                }
                if (config.hasOwnProperty("valueField") && utils.isString(config.valueField)) {
                    valueField = jsonUtils.getName(currItem, config.valueField);
                }
                else {
                    valueField = jsonUtils.getName(currItem, valueFieldDefault);
                }
                if (config.hasOwnProperty("selectedField") && utils.isString(config.selectedField)) {
                    selectedField = jsonUtils.getName(currItem, config.selectedField);
                }
                else {
                    selectedField = jsonUtils.getName(currItem, selectedFieldDefault);
                }
            }
            else {
                labelField = jsonUtils.getName(currItem, labelFieldDefault);
                valueField = jsonUtils.getName(currItem, valueFieldDefault);
                selectedField = jsonUtils.getName(currItem, selectedFieldDefault);
            }

            //check for valid values
            if (utils.isEmpty(labelField) && utils.isEmpty(valueField)) {
                continue;
            }

            //get the values
            labelVal = currItem[labelField];
            valueVal = currItem[valueField];

            //check for valid values
            if (utils.isEmpty(labelVal) && utils.isEmpty(valueVal)) {
                continue;
            }

            //generate the html
            html += '<option';
            if (utils.isEmpty(valueVal)) {
                valueVal = labelVal;
            }
            html += ' value="' + valueVal + '"';
            if (!utils.isEmpty(selected) && utils.isString(selected)) {
                if (selected.toLowerCase()==valueVal.toLowerCase()) {
                    html += ' selected="selected"';
                }
            }
            else {
                if (utils.isString(selectedField) && currItem.hasOwnProperty(selectedField)) {
                    selectedVal = currItem[selectedField];
                    if (!utils.isEmpty(selectedVal)) {
                        if (selectedVal===true || selectedVal==="true") {
                            html += ' selected="selected"';
                        }
                    }
                }
            }
            if (currItem.hasOwnProperty("description") && utils.isString(currItem.description)) {
                html += ' title="' + currItem.description + '"';
            }
            if (utils.isString(itemStyle) || (currItem.hasOwnProperty("itemStyle") && utils.isString(currItem.itemStyle))) {
                if (currItem.hasOwnProperty("itemStyle") && utils.isString(currItem.itemStyle)) {
                    html += ' style="' + currItem.itemStyle + '"';
                }
                else {
                    html += ' style="' + itemStyle + '"';
                }
            }
            html += '>';
            if (utils.isEmpty(labelVal)) {
                labelVal = valueVal;
            }
            html += labelVal;
            if (showIndex || (currItem.hasOwnProperty("showIndex") && utils.isTrue(currItem.showIndex))) {
                html += ' ' + index;
            }
            if (currItem.hasOwnProperty("icon") && utils.isString(currItem.icon)) {
                iconValue = currItem.icon;
                if (!iconValue.startsWith("data:image")) {
                    if (!iconValue.startsWith("&#")) {
                        iconValue = "&#" + iconValue;
                    }
                    html += ' ' + iconValue;
                }
            }
            html += '</option>';
        }

        //return the method's value
        return html;
    };
};
const html5Utils = new function() {
    //TODO add description to attributes
    //TODO map all css properties and values lists

    /***************************************************************************************************
     * define cssMap for rendering json to css without duplications
     ****************************************************************************************************/
    let cssMap = [];

    /***************************************************************************************************
     * define functions
     ****************************************************************************************************/

    this.getTags = function () {
        let listName = "html5Tags";
        let list  = listUtils.getList(listName);
        return list;
    };

    this.getAttributes = function () {
        let listName = "html5Attributes";
        let list  = listUtils.getList(listName);
        return list;
    };

    this.getCssProperties = function () {
        let listName = "css3Properties";
        let list  = listUtils.getList(listName);
        return list;
    };

    this.getSymbols = function () {
        let listName = "html5Symbols";
        let list  = listUtils.getList(listName);
        return list;
    };

    this.getNamedColors = function () {
        let listName = "namedColors";
        let list  = listUtils.getList(listName);
        return list;
    };

    this.getCountries = function () {
        let listName = "countries";
        let list  = listUtils.getList(listName);
        return list;
    };

    this.getTag = function (tagName) {
        //check for valid values
        if (utils.isEmpty(tagName)) {
            return null;
        }
        if (!utils.isString(tagName)) {
            return null;
        }
        let html5Tags = html5Utils.getTags();
        //loop through the items
        for (let i = 0; i < html5Tags.length; i++) {
            //get the current item
            let currItem = html5Tags[i];
            if (currItem.tagName.toLowerCase() == tagName.toLowerCase()) {
                return currItem;
            }
        }

        //return the method's value
        return null;
    };

    this.getAttribute = function (attributeName) {
        //check for valid values
        if (utils.isEmpty(attributeName)) {
            return null;
        }
        if (!utils.isString(attributeName)) {
            return null;
        }
        let html5Attributes = html5Utils.getAttributes();
        //loop through the items
        for (let i = 0; i < html5Attributes.length; i++) {
            //get the current item
            let currItem = html5Attributes[i];
            if (currItem.attName.toLowerCase() == attributeName.toLowerCase()) {
                return currItem;
            }
        }

        //return the method's value
        return null;
    };

    this.isValidAttribute = function (tagName, attributeName, attributeValue) {
        //check for valid values
        if (utils.isEmpty(tagName)) {
            return false;
        }
        if (!utils.isString(tagName)) {
            return false;
        }
        if (utils.isEmpty(attributeName)) {
            return false;
        }
        if (!utils.isString(attributeName)) {
            return false;
        }

        //get the attribute by its name
        let attribute = html5Utils.getAttribute(attributeName);

        //check for valid values
        if (attribute == null) {
            return false;
        }

        //validate the attribute against the tag, and the value
        let belongsTo = attribute.belongsTo;
        if (!utils.isInArray(tagName, belongsTo)) {
            if (belongsTo.length == 1) {
                if (belongsTo[0].toLowerCase() != "allvisible" && belongsTo[0].toLowerCase() != "global") {
                    return false;
                }
            }
            else {
                return false;
            }
        }

        //check for an empty value
        if (utils.isEmpty(attributeValue)) {
            return true;
        }

        //get the attribute's type
        let attType = attribute.type;

        //check the attribute type
        if (attType.toLowerCase().indexOf("list") == -1) {
            let retVal;
            switch (attType.toLowerCase()) {
                case "mediaStringType":
                    retVal = true;
                    break;
                case "empty":
                    retVal = true;
                case "string":
                    retVal = utils.isString(attributeValue);
                    break;
                case "number":
                case "numeric":
                    retVal = utils.isNumeric(attributeValue);
                    break;
                case "boolean":
                    retVal = utils.isBool(attributeValue);
                    break;
                case "numberOrDate":
                    retVal = utils.isNumeric(attributeValue);
                    if (!retVal) {
                        retVal = utils.isDate(attributeValue);
                    }
                    break;
                case "script":
                    retVal = utils.isFunction(attributeValue);
                    if (!retVal) {
                        retVal = utils.isString(attributeValue);
                    }
                    break;
                default:
                    retVal = false;
                    break;
            }

            //return the method's value
            return retVal;
        }
        else {
            //get the list of values
            let list = listUtils.getList(attType);
            if (list == null) {
                return false;
            }
            let listItem = listUtils.getListItem(list, attributeValue);
            if (listItem == null) {
                return false;
            }
            if (listItem.hasOwnProperty("tags")) {
                if (utils.isInArray(tagName, listItem.tags)) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return true;
            }
        }
    };

    this.getCssProperty = function (propertyName) {
        //check for valid values
        if (utils.isEmpty(propertyName)) {
            return null;
        }
        if (!utils.isString(propertyName)) {
            return null;
        }
        let css3Properties = html5Utils.getCssProperties();
        //loop through the items
        for (let i = 0; i < css3Properties.length; i++) {
            //get the current item
            let currItem = css3Properties[i];
            if (currItem.attName.toLowerCase() == propertyName.toLowerCase()) {
                return currItem;
            }
        }

        //return the method's value
        return null;
    };

    this.isValidCssProperty = function (propertyName, propertyValue) {
        //check for valid values
        if (utils.isEmpty(propertyName)) {
            return false;
        }
        if (!utils.isString(propertyName)) {
            return false;
        }

        //get the property by its name
        let property = html5Utils.getCssProperty(propertyName);

        //check for valid values
        if (property == null) {
            return true;
            //TODO fix this after mapping all css properties
            //return false;
        }

        //get the property's type
        let attType = property.type;

        //check the property type
        if (attType.toLowerCase().indexOf("list") == -1) {
            let retVal;
            switch (attType.toLowerCase()) {
                case "empty":
                    retVal = true;
                case "string":
                    retVal = utils.isString(propertyValue);
                    break;
                case "number":
                case "numeric":
                    retVal = utils.isNumeric(propertyValue);
                    break;
                case "boolean":
                    retVal = utils.isBool(propertyValue);
                    break;
                default:
                    retVal = false;
                    break;
            }

            //return the method's value
            return retVal;
        } else {
            //get the list of values
            let list = listUtils.getList(attType);
            if (list == null) {
                return false;
            }
            let listItem = listUtils.getListItem(list, propertyValue);
            if (listItem == null) {
                return false;
            } else {
                return true;
            }
        }
    };

    this.listAsValuesArray = function (listName) {
        //declare locals
        let list = listUtils.getList(listName);
        let valueFieldName = "value";
        let arrValues;
        let currItem;
        let valueFieldValue;

        //check for valid values
        if (!utils.isArray(list)) {
            return null;
        }

        //create a new array
        arrValues = [];

        //loop through the items
        for (let i=0; i<list.length; i++) {
            //get the current item
            currItem = list[i];

            //check for valid values
            if (!utils.isJson(currItem)) {
                continue;
            }
            if (!jsonUtils.hasField(currItem, valueFieldName)) {
                continue;
            }

            // the value field's value
            valueFieldValue = jsonUtils.getValue(currItem, valueFieldName);
            if (utils.isEmpty(valueFieldValue)) {
                continue;
            }

            //add the current item to the returned array
            arrValues.push(valueFieldValue);
        }

        //return the method's value
        return arrValues;
    };

    this.isInList = function (list, value) {
        //declare locals
        let listItem = listUtils.getListItem(list, value);

        //check for valid values
        if (listItem == null) {
            return false;
        }

        //return the method's value
        return true;
    };

    this.renderAttributes = function (tagName, jsonAttributes, excludeAttributes) {
        //declare locals
        let html = '';
        let tagItem;
        let hasId = false;
        let hasName = false;
        let idValue = null;
        let nameValue = null;
        let isExcluded = false;

        //check for valid values
        if (!utils.isString(tagName) || jsonAttributes == null) {
            return html;
        }

        //get the tag by its name
        tagItem = html5Utils.getTag(tagName);

        //check for valid values
        if (tagItem == null) {
            return html;
        }

        //check the attributes as a json object
        if (utils.isJson(jsonAttributes)) {
            //loop through the attributes
            for (let field in jsonAttributes) {
                if (jsonAttributes.hasOwnProperty(field)) {
                    let attName = field;
                    let attValue = jsonAttributes[field];
                    if (attName.toLowerCase() == "id") {
                        hasId = true;
                        idValue = attValue;
                    }
                    if (attName.toLowerCase() == "name") {
                        hasName = true;
                        nameValue = attValue;
                    }
                    if (html5Utils.isValidAttribute(tagName, attName, attValue)) {
                        //get the attribute by its name
                        let attribute = html5Utils.getAttribute(attName);

                        //check for valid values
                        if (attribute == null) {
                            continue;
                        }

                        //check if the current attribute should be excluded
                        if (utils.isArray(excludeAttributes)) {
                            isExcluded = utils.isInArray(attribute.attName, excludeAttributes);
                        } else {
                            isExcluded = false;
                        }
                        if (!isExcluded) {
                            if (attribute.type == "empty") {
                                html += ' ' + attribute.attName + '=\"' + attribute.attName + '\"';
                            } else {
                                html += ' ' + attribute.attName + '=\"' + attValue + '\"';
                            }
                        }
                    }
                }
            }
        }

        //check for an id and name attributes
        if (!hasId && !hasName) {
            idValue = utils.generateId(tagName);
            html += ' id=\"' + idValue + '\" name=\"' + idValue + '\"';
        } else {
            if (!hasId) {
                idValue = nameValue;
                html += ' id=\"' + idValue + '\"';
            }
            if (!hasName) {
                nameValue = idValue;
                html += ' name=\"' + nameValue + '\"';
            }
        }

        //return the method's value
        return html;
    };

    this.renderHtml = function (tagName, jsonAttributes, excludeAttributes, renderTo) {
        //declare locals
        let methodName = "html5Utils.renderHtml(): ";
        let logMessage;
        let html = '';
        let tagItem;
        let container;
        let isBody = false;
        let isExcluded = false;

        //check for valid values
        if (!utils.isString(tagName) || jsonAttributes == null) {
            return html;
        }

        //get the tag by its name
        tagItem = html5Utils.getTag(tagName);

        //check for valid values
        if (tagItem == null) {
            return html;
        }

        //check the renderTo
        if (renderTo == null || (utils.isString(renderTo) && renderTo.toLowerCase() == "body")) {
            container = document.getElementsByTagName("body")[0];
            isBody = true;
        } else {
            if (!utils.isInDom(renderTo)) {
                logMessage = "containerId=[" + renderTo + "] is NOT in DOM !!";
                console.error(methodName + logMessage);
                return html;
            }
            container = utils.getFromDom(renderTo);
        }

        //render the html into the container
        if (isBody) {
            let childNode = document.createElement(tagName);
            html5Utils.setNodeAttributes(childNode, tagName, jsonAttributes, excludeAttributes);
            container.appendChild(childNode);
        } else {
            //build the html tag and all the attributes
            html += tagItem.startTag;
            html += html5Utils.renderAttributes(tagName, jsonAttributes);
            html += tagItem.endTag;
            container.innerHTML = html;
        }
    };

    this._getCssSelector = function(cssItem) {
        //declare locals
        let validKeys = html5Utils.getValidCssSelectorKeys();
        let selectorFieldKey = null;
        let cssSelector;

        //check for valid values
        if (!utils.isJson(cssItem)) {
            return null;
        }

        //loop through the items
        for (let field in cssItem) {
            if (cssItem.hasOwnProperty(field)) {
                if (utils.isInArray(field, validKeys)) {
                    selectorFieldKey = field;
                    break;
                }
            }
        }

        //check for a selector
        if (utils.isEmpty(selectorFieldKey)) {
            return null;
        }

        //get the selector's value
        cssSelector = cssItem[selectorFieldKey];
        if (utils.isEmpty(cssSelector) || !utils.isString(cssSelector)) {
            return null;
        }
        cssSelector = utils.clearQuotes(cssSelector);

        //return the method's value
        return cssSelector;
    };

    this._getCssSelectors = function (jsonCss) {
        //declare locals
        let arrSelectors = [];
        let cssItem;
        let cssSelectorId;

        //check for valid values
        if (!utils.isArray(jsonCss)) {
            return null;
        }

        //loop through the items
        for (let i = 0; i < jsonCss.length; i++) {
            //get the current item
            cssItem = jsonCss[i];

            //check for valid values
            if (!utils.isJson(cssItem)) {
                continue;
            }

            //get the selector's value
            cssSelectorId = html5Utils._getCssSelector(cssItem);

            //check for a selector
            if (utils.isEmpty(cssSelectorId)) {
                continue;
            }

            //add the item to the returned array
            arrSelectors.push(cssSelectorId);
        }

        //check the array
        if (arrSelectors.length<1) {
            return null;
        }

        //return the method's value
        return arrSelectors;
    };

    this._renderCssItemString = function (jsonCssItem) {
        //declare locals
        let cssString = '';
        let validKeys = html5Utils.getValidCssSelectorKeys();
        let cssSelector;

        //check for valid values
        if (!utils.isJson(jsonCssItem)) {
            return cssString;
        }

        //get the selector's value
        cssSelector = html5Utils._getCssSelector(jsonCssItem);

        //check for a selector
        if (utils.isEmpty(cssSelector)) {
            return cssString;
        }

        //render the css string start
        cssString += cssSelector + " {"

        //loop through the item's properties
        for (let field in jsonCssItem) {
            if (jsonCssItem.hasOwnProperty(field)) {
                let attName = field;
                let attValue = jsonCssItem[field];

                //check for a selector
                if (utils.isInArray(attName, validKeys)) {
                    continue;
                }

                //check for a valid css attribute name and value
                if (html5Utils.isValidCssProperty(attName, attValue)) {
                    let cssProperty = html5Utils.getCssProperty(attName);
                    if (html5Utils._isSpecialCssSelector(cssSelector)) {
                        cssString += utils.clearQuotes(attName) + " " + utils.clearQuotes(attValue);
                        cssString += "\n";
                    }
                    else {
                        cssString += utils.clearQuotes(attName) + ": " + utils.clearQuotes(attValue);
                        cssString += ";";
                    }
                }
            }
        }

        //render the css string end
        cssString += "}"

        //return the method's value
        return cssString;
    };

    this.renderCssString = function (jsonCss) {
        //declare locals
        let cssString = '';
        let cssItem;
        let cssSelector;
        let counter = 0;

        //check for valid values
        if (!utils.isArray(jsonCss)) {
            return cssString;
        }

        //loop through the items
        for (let i = 0; i < jsonCss.length; i++) {
            //get the current item
            cssItem = jsonCss[i];

            //check for valid values
            if (!utils.isJson(cssItem)) {
                continue;
            }

            //get the selector's value
            cssSelector = html5Utils._getCssSelector(cssItem);

            //check for a selector
            if (utils.isEmpty(cssSelector)) {
                continue;
            }

            //render the delimiter
            if (counter>0) {
                cssString += "\n";
            }

            //render the css string for the current item
            cssString += html5Utils._renderCssItemString(cssItem);
            counter++;
        }

        //return the method's value
        return cssString;
    };

    this._isSpecialCssSelector = function(cssSelector) {
        //check for valid values
        if (utils.isEmpty(cssSelector) || (!utils.isString(cssSelector))) {
            return false;
        }
        else {
            if ((cssSelector.toLowerCase().indexOf("@keyframes")!=-1)
                || (cssSelector.toLowerCase().indexOf("@-webkit-keyframes")!=-1)) {
                return true;
            }
        }

        //return the method's value
        return false;
    };

    this._cssMapItemExists = function(cssTagId, selectorId) {
        //declare locals
        let cssMapItem = html5Utils._getCssMapItem(cssTagId);

        //check for valid values
        if (!utils.isJson(cssMapItem)) {
            return false;
        }
        if (cssMapItem.hasOwnProperty("selectors")) {
            let arrSelectors = cssMapItem.selectors;
            if (utils.isInArray(selectorId, arrSelectors)) {
                return true;
            }
        }

        //return the method's value
        return false;
    };

    this._getCssMapItem = function(cssTagId) {
        //declare locals
        let currMapItem;
        let currItemTagId;

        //check for valid values
        if (utils.isEmpty(cssTagId) || !utils.isString(cssTagId)) {
            return null;
        }
        if (cssMap.length<1) {
            return null;
        }

        //loop through the items
        for (let i=0; i<cssMap.length; i++) {
            //get the current item
            currMapItem = cssMap[i];

            //check for valid values
            if (!utils.isJson(currMapItem)) {
                continue;
            }

            //check the tag id
            if (currMapItem.hasOwnProperty("cssTagId")) {
                currItemTagId = currMapItem.cssTagId;
                if (utils.isString(currItemTagId) && currItemTagId.toLowerCase()==cssTagId.toLowerCase()) {
                    return currMapItem;
                }
            }
        }

        //return the method's value
        return null;
    };

    this._addCssItemToMap = function(cssTagId, selectorId, cssItem) {
        //declare locals
        let cssMapItem;
        let arrSelectors;
        let arrCss;
        let mapItem;

        //check for valid values
        if (utils.isEmpty(cssTagId) || utils.isEmpty(selectorId) || !utils.isString(cssTagId) || !utils.isString(selectorId)) {
            return;
        }

        //get the css map item
        cssMapItem = html5Utils._getCssMapItem(cssTagId, selectorId);

        //check for valid values
        if (utils.isJson(cssMapItem)) {
            if (cssMapItem.hasOwnProperty("selectors")) {
                arrSelectors = cssMapItem.selectors;
                if (!utils.isArray(arrSelectors)) {
                    arrSelectors = [];
                }
                if (utils.isInArray(selectorId, arrSelectors)) {
                    return;
                }
                else {
                    //add the item to the array, and update the map
                    arrSelectors.push(selectorId);
                    cssMapItem.selectors = arrSelectors;
                }
            }
            if (cssMapItem.hasOwnProperty("css")) {
                arrCss = cssMapItem.css;
                if (!utils.isArray(arrCss)) {
                    arrCss = [];
                }
                if (utils.isInArray(selectorId, arrSelectors)) {
                    return;
                }
                else {
                    //add the item to the array, and update the map
                    arrCss.push(cssItem);
                    cssMapItem.css = arrCss;
                }
            }
        }
        else {
            mapItem = { cssTagId: cssTagId, selectors: [selectorId], css: [cssItem]};
            cssMap.push(mapItem);
        }
    };

    this.renderCss = function (jsonCss, cssTagId, ignoreExisting) {
        //declare locals
        let cssItem;
        let cssItemSelector;
        let cssItemString;
        let renderStyle = false;

        //check for valid values
        if (!utils.isArray(jsonCss)) {
            return;
        }
        if (!utils.isString(cssTagId)) {
            return;
        }

        //check for an existing style tag
        if (!utils.isInDom(cssTagId)) {
            //generate a new style element
            let headNode = document.getElementsByTagName("head")[0];
            let styleNode = document.createElement("style");
            styleNode.setAttribute("id", cssTagId);
            styleNode.setAttribute("type", "text/css");
            headNode.appendChild(styleNode);
        }

        //get a reference to the style tag
        let cssTag = utils.getFromDom(cssTagId);

        //loop through the items
        for (let i = 0; i < jsonCss.length; i++) {
            //get the current item
            cssItem = jsonCss[i];

            //check for valid values
            if (!utils.isJson(cssItem)) {
                continue;
            }

            //get the selector's value
            cssItemSelector = html5Utils._getCssSelector(cssItem);

            //check for a selector
            if (utils.isEmpty(cssItemSelector)) {
                continue;
            }

            //render the css string for the current item
            cssItemString  = html5Utils._renderCssItemString(cssItem);

            //check for valid values
            if (!utils.isEmpty(cssItemString)) {
                //check if this css item string was already rendered in the past
                if (ignoreExisting===true) {
                    renderStyle = true;
                }
                else {
                    if (!html5Utils._cssMapItemExists(cssTagId, cssItemSelector)) {
                        //add it to the map and render it
                        html5Utils._addCssItemToMap(cssTagId, cssItemSelector, cssItem);
                        renderStyle = true;
                    }
                    else {
                        renderStyle = false;
                    }
                }
                if (renderStyle) {
                    //render the css string into the style tag
                    if (cssTag.styleSheet) { // Support for IE
                        cssTag.textContent += "\n" + cssItemString;
                    }
                    else { // Support for the rest
                        cssTag.appendChild(document.createTextNode(cssItemString));
                    }
                }
            }
        }
    };

    this.renderChildren = function(children, parentId, cssTagId) {
        //declare locals
        let validKeys = html5Utils.getValidComponentTypeKeys();
        let validTypes = html5Utils.getValidComponentTypes();
        let currItem;
        let compConfig;
        let currItemId;
        let compTypeKey;
        let compType;
        let tagName;
        let container = null;
        let compObj;
        let childNode;

        //check for valid values
        if (!utils.isArray(children)) {
            return;
        }
        if (utils.isEmpty(parentId)) {
            return;
        }

        //check for a valid parent
        if (utils.isString(parentId) && utils.isInDom(parentId)) {
            container = document.getElementById(parentId);
        }
        else if (utils.isElementNode(parentId)) {
            container = parentId;
        }
        if (utils.isEmpty(container)) {
            return;
        }

        //loop through the items
        for (let i = 0; i < children.length; i++) {
            //get the current item
            currItem = children[i];
            compConfig = null;
            currItemId = null;
            compType = null;
            tagName = null;
            compObj = null;
            childNode = null;

            //check for valid values
            if (!utils.isJson(currItem)) {
                continue;
            }

            //open a try block
            try {
                compConfig = currItem.getConfig();
            }
            catch (err) {}

            //check for valid values
            if (utils.isJson(compConfig)) {
                currItem = compConfig;
            }

            //get the compType field name
            compTypeKey = jsonUtils.getRealName(currItem, validKeys);
            if (utils.isEmpty(compTypeKey)) {
                tagName = jsonUtils.getValue(currItem, "tagName", null);
            }
            else {
                compType = jsonUtils.getValue(currItem, compTypeKey, null);
                if (!utils.isEmpty(compType)) {
                    if (!utils.isInArray(compType, validTypes)) {
                        console.error("compType=[" + String(compType) + "] is NOT valid !!");
                        continue;
                    }
                }
            }

            //set the child's cssTagId as the parent's
            if (!utils.isEmpty(cssTagId) && utils.isString(cssTagId)) {
                currItem["cssTagId"] = cssTagId;
            }

            //check for a component type
            if (!utils.isEmpty(compType)) {
                currItemId = currItem.id;
                if (utils.isString(parentId)) {
                    currItem["renderTo"] = parentId;
                }
                else {
                    currItem["renderTo"] = domUtils.getAttributeValue(parentId, "id");
                }
                switch (compType.toLowerCase()) {
                    case "autocomplete":
                        compObj = new Autocomplete(currItem);
                        compObj.render();
                        break;
                    case "button":
                        compObj = new Button(currItem);
                        compObj.render();
                        break;
                    case "col":
                        compObj = new Col(currItem);
                        compObj.render();
                        break;
                    case "collapsiblepanel":
                        compObj = new CollapsiblePanel(currItem);
                        compObj.render();
                        break;
                    case "dialog":
                        compObj = new Dialog(currItem);
                        compObj.render();
                        break;
                    case "icon":
                        compObj = new Icon(currItem);
                        compObj.render();
                        break;
                    case "inputtext":
                        compObj = new InputText(currItem);
                        compObj.render();
                        break;
                    case "loader":
                        compObj = new Loader(currItem);
                        compObj.render();
                        break;
                    case "panel":
                        compObj = new Panel(currItem);
                        compObj.render();
                        break;
                    case "row":
                        compObj = new Row(currItem);
                        compObj.render();
                        break;
                    case "tag":
                        compObj = new Tag(currItem);
                        compObj.render();
                        break;
                    case "text":
                        compObj = new Text(currItem);
                        compObj.render();
                        break;
                    default:
                        //do nothing
                        break;
                }
            }
            else {
                if (!utils.isEmpty(tagName)) {
                    childNode = document.createElement(tagName);

                    //render all other attributes
                    html5Utils.setNodeAttributes(childNode, tagName, currItem, null);

                    //append the element to the container
                    container.appendChild(childNode);
                }
            }
        }
    };

    this.getValidCssSelectorKeys = function() {
        //declare locals
        let validKeys = ["selector","selectorId","selectorKey","cssId", "cssKey","cssSelector"];

        //return the method's values
        return validKeys;
    };

    this.getValidComponentTypeKeys = function() {
        //declare locals
        let validKeys = ["comp","compType","component","componentType","objectType"];

        //return the method's values
        return validKeys;
    };

    this.getValidComponentTypes = function() {
        //declare locals
        let validKeys = ["loader","tag","row","col","collapsiblePanel","button","inputText","dialog","autocomplete"];

        //return the method's values
        return validKeys;
    };


    this.setNodeAttributes = function (nodeItem, tagName, jsonAttributes, excludeAttributes) {
        //declare locals
        let tagItem;
        let methodName = "html5Utils.setNodeAttributes(): ";
        let logMessage;

        //check for valid values
        if (nodeItem == null || !utils.isString(tagName) || jsonAttributes == null) {
            return;
        }

        //get the tag by its name
        tagItem = html5Utils.getTag(tagName);

        //check for valid values
        if (tagItem == null) {
            return;
        }

        //loop through the attributes
        for (let field in jsonAttributes) {
            if (jsonAttributes.hasOwnProperty(field)) {
                let attName = field;
                let attValue = jsonAttributes[field];

                //check if the current attribute should be excluded
                if (utils.isArray(excludeAttributes) && utils.isInArray(attName, excludeAttributes)) {
                    continue;
                }

                //check for a valid attribute
                if (html5Utils.isValidAttribute(tagName, attName, attValue)) {
                    let attribute = html5Utils.getAttribute(attName);
                    if (attribute.type == "empty") {
                        if (utils.isTrue(attValue)) {
                            nodeItem.setAttribute(attribute.attName, attribute.attName);
                        }
                        else {
                            //nodeItem.setAttribute(attribute.attName, "");
                        }
                    }
                    else {
                        if (attName.toLowerCase().startsWith("on")) {
                            let eventName = attName;
                            if (attName.toLowerCase().startsWith("on")) {
                                eventName = attName.substring(2);
                            }
                            let fh = null;
                            if (utils.isString(attValue)) {
                                try {
                                    fh = eval(attValue);
                                }
                                catch(err) {
                                    logMessage = err;
                                    console.error(methodName + logMessage);
                                    return;
                                }
                            }
                            else if (utils.isFunction(attValue)) {
                                fh = attValue;
                            }
                            if (fh!=null) {
                                nodeItem.addEventListener(eventName, function (event) {
                                    fh(this.value, event);
                                });
                            }
                        }
                        else {
                            if (attName.indexOf("data-")!=-1) {
                                nodeItem.setAttribute(attName, attValue);
                            }
                            else {
                                if (attName.toLowerCase()=="draggable") {
                                    uiCompsUtils.addDragAndDropListeners(nodeItem, jsonAttributes);
                                }
                                else {
                                    nodeItem.setAttribute(attribute.attName, attValue);
                                }
                            }
                        }
                    }
                }
                else {
                    if (attName.indexOf("data-")!=-1) {
                        nodeItem.setAttribute(attName, attValue);
                    }
                    else {
                        //handle special attributes
                        switch (attName.toLowerCase()) {
                            case "icon":
                                uiCompsUtils.renderIcon(nodeItem, jsonAttributes);
                                break;
                            case "tooltip":
                                nodeItem.setAttribute("title", attValue);
                                break;
                            case "caption":
                            case "innertext":
                            case "innerhtml":
                            case "text":
                                nodeItem.innerHTML = attValue;
                                break;
                            case "movable":
                            case "draggable":
                                uiCompsUtils.addDragAndDropListeners(nodeItem, jsonAttributes);
                                break;
                            case "options":
                                let optionsHtml = selectUtils.generateOptionsHtml(attValue, null);
                                nodeItem.innerHTML = optionsHtml;
                                break;
                            case "style":
                                domUtils.setStyle(nodeItem, attValue);
                                break;
                            case "events":
                                eventUtils.getEventsFromJson(nodeItem, jsonAttributes);
                                break;
                            case "validations":
                                validationUtils.getValidationsFromJson(nodeItem, jsonAttributes);
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        }

        //check for an id attribute
        if (utils.isEmpty(nodeItem.getAttribute("id"))) {
            let nodeId = utils.generateId(tagName, "");
            nodeItem.setAttribute("id", nodeId);
        }
    };

};
const eventUtils = new function() {
    //declare fields names
    let _objectName = "eventUtils.";
    let validActions = listUtils.getList("eventActionList");
    let validAjaxMethods = listUtils.getList("ajaxMethodList");
    let fieldNameEvents = "events";
    let fieldNameEventNameKeys = ["name","event","eventName"];
    let fieldNameEventActionsKeys = ["actions","eventActions"];
    let eventNamePrefix = "on";
    let _fieldNameEventName = "name";
    let _fieldNameEventActions = "actions";
    let fieldNameFor = "for";
    let fieldNameAttName = "attName";
    let fieldNameAttValue = "attValue";
    let fieldNameActionDefault = "action";
    let fieldNameActionValidateIdKeys = ["for","forId","id","domId","elemId","elementId","htmlId","nodeId","forIds","ids","domIds","elemIds","elementIds","htmlIds","nodeIds"];
    let fieldNameActionAjaxUrlDefault = "url";
    let fieldNameActionAjaxMethodDefault = "method";
    let fieldNameActionAjaxDataNamesDefault = "dataNames";
    let fieldNameActionAjaxDataValuesIdsDefault = "dataValuesIds";
    let fieldNameActionAjaxConfigDefault = "config";
    let fieldNameActionAjaxOnSuccessDefault = "onSuccess";
    let fieldNameActionAjaxOnFailureDefault = "onFailure";
    let fieldNameActionDomIdKeys = ["for","forId","id","domId","elemId","elementId","htmlId","nodeId"];
    let fieldNameActionDomAttNameKeys = ["name","key","attName","attKey","attribute","attributeName","attributeKey"];
    let fieldNameActionDomAttValueKeys = ["value","attValue","attributeValue"];
    let fieldNameDataEvents = "data-events";
    let fieldNameDataEvent = "data-event";
    let fieldNameDataEventActionsSuffix = "-actions";
    let fieldNameDataEventActionSuffix = "-action";
    let fieldNameDataEventActionForSuffix = "-for";
    let fieldNameDataEventActionDomAttNameSuffix = "-attName";
    let fieldNameDataEventActionDomAttValueSuffix = "-attValue";
    let fieldNameDataEventActionAjaxUrlSuffix = "-url";
    let fieldNameDataEventActionAjaxMethodSuffix = "-method";
    let fieldNameDataEventActionAjaxDataNamesSuffix = "-dataNames";
    let fieldNameDataEventActionAjaxDataValuesIdsSuffix = "-dataValuesIds";
    let fieldNameDataEventActionAjaxConfigSuffix = "-config";
    let fieldNameDataEventActionAjaxOnSuccessSuffix = "-onsuccess";
    let fieldNameDataEventActionAjaxOnFailureSuffix = "-onFailure";

    this.getEventsFromJson = function (nodeItem, json) {
        //declare locals
        let methodName = _objectName+"getEventsFromJson(): ";
        let message;
        let fieldNameId = "id";
        let events = null;
        let _event = null;
        let eventsNode = null;
        let eventNode = null;
        let currItem;
        let elementId;
        let action;

        //check for valid values
        if (nodeItem == null) {
            message = "nodeItem is null !!";
            console.error(methodName + message);
            return null;
        }
        if (!utils.isArray(json)) {
            if (!utils.isJson(json)) {
                message = "json is NOT a valid JSON !!";
                console.error(methodName + message);
                return null;
            }
            json = [json];
        }

        //create a new array
        events = [];

        //loop through the items
        for (let i=0; i<json.length; i++) {
            //get the current item
            currItem = json[i];

            //check for valid values
            if (!utils.isJson(currItem)) {
                message = "json item is NOT a valid JSON at index=[" + i + "] !!";
                console.error(methodName + message);
                continue;
            }
            if (!jsonUtils.hasField(currItem, fieldNameId)) {
                message = "json item is missing id attribute at index=[" + i + "] !!";
                console.error(methodName + message);
                continue;
            }
            if (!jsonUtils.hasField(currItem, fieldNameEvents)) {
                message = "json item is missing field=[" + fieldNameEvents + "] at index=[" + i + "] !!";
                console.error(methodName + message);
                continue;
            }

            //get the array of events
            eventsNode = jsonUtils.getValue(currItem, fieldNameEvents);

            //check for an array
            if (!utils.isArray(eventsNode)) {
                if (!utils.isJson(eventsNode)) {
                    message = "json item has an INVALID value for field=[" + fieldNameEvents + "] at index=[" + i + "] !!";
                    console.error(methodName + message);
                    continue;
                }
                eventsNode = [eventsNode];
            }

            //get the element's id
            elementId = jsonUtils.getValue(currItem, fieldNameId);

            //loop through the current item's events array
            for (let j=0; j<eventsNode.length; j++) {
                //get the current item
                eventNode = eventsNode[j];

                //try to get an event from the node
                _event = eventUtils._getEvent(elementId, eventNode);

                //check for valid values
                if (_event==null) {
                    message = "event is invalid at index=[" + j + "] of json item at index=[" + i + "] for elementId=[" + elementId + "] !!";
                    console.error(methodName + message);
                    continue;
                }
                events.push(_event);
            }
        }

        //check the array's size
        if (events.length<1) {
            events = null;
        }

        //set the html node's attributes from the events array
        if (utils.isArray(events)) {
            nodeItem.setAttribute(fieldNameDataEvents, events.length);
            //loop through the items
            for (let i=0; i<events.length; i++) {
                //get the current item
                _event = events[i];
                nodeItem.setAttribute(fieldNameDataEvent+(i+1), _event.name);
                nodeItem.setAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionsSuffix, _event.actions.length);
                //loop through the actions
                for (let j=0; j<_event.actions.length; j++) {
                    //get the current item
                    action = _event.actions[j];
                    nodeItem.setAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1), action[fieldNameActionDefault]);
                    if (action.hasOwnProperty(fieldNameFor) && utils.isArray(action[fieldNameFor])) {
                        nodeItem.setAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1)+fieldNameDataEventActionForSuffix, utils.array2string(action[fieldNameFor]));
                    }
                    if (action.hasOwnProperty(fieldNameFor) && utils.isString(action[fieldNameFor])) {
                        nodeItem.setAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1)+fieldNameDataEventActionForSuffix, action[fieldNameFor]);
                    }
                    if (action.hasOwnProperty(fieldNameAttName) && utils.isString(action[fieldNameAttName])) {
                        nodeItem.setAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1)+fieldNameDataEventActionDomAttNameSuffix, action[fieldNameAttName]);
                    }
                    if (action.hasOwnProperty(fieldNameAttValue)) {
                        if (utils.isEmpty(action[fieldNameAttValue])) {
                            nodeItem.setAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1)+fieldNameDataEventActionDomAttValueSuffix, "");
                        }
                        else {
                            nodeItem.setAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1)+fieldNameDataEventActionDomAttValueSuffix, action[fieldNameAttValue]);
                        }
                    }
                    if (action.hasOwnProperty(fieldNameActionAjaxUrlDefault) && utils.isString(action[fieldNameActionAjaxUrlDefault])) {
                        nodeItem.setAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1)+fieldNameDataEventActionAjaxUrlSuffix, action[fieldNameActionAjaxUrlDefault]);
                    }
                    if (action.hasOwnProperty(fieldNameActionAjaxMethodDefault) && utils.isString(action[fieldNameActionAjaxMethodDefault])) {
                        nodeItem.setAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1)+fieldNameDataEventActionAjaxMethodSuffix, action[fieldNameActionAjaxMethodDefault]);
                    }
                    if (action.hasOwnProperty(fieldNameActionAjaxDataNamesDefault) && utils.isArray(action[fieldNameActionAjaxDataNamesDefault])) {
                        nodeItem.setAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1)+fieldNameDataEventActionAjaxDataNamesSuffix, utils.array2string(action[fieldNameActionAjaxDataNamesDefault]));
                    }
                    if (action.hasOwnProperty(fieldNameActionAjaxDataValuesIdsDefault) && utils.isArray(action[fieldNameActionAjaxDataValuesIdsDefault])) {
                        nodeItem.setAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1)+fieldNameDataEventActionAjaxDataValuesIdsSuffix, utils.array2string(action[fieldNameActionAjaxDataValuesIdsDefault]));
                    }
                    if (action.hasOwnProperty(fieldNameActionAjaxConfigDefault) && utils.isJson(action[fieldNameActionAjaxConfigDefault])) {
                        nodeItem.setAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1)+fieldNameDataEventActionAjaxConfigSuffix, JSON.stringify(action[fieldNameActionAjaxConfigDefault]));
                    }
                    if (action.hasOwnProperty(fieldNameActionAjaxOnSuccessDefault) && utils.isString(action[fieldNameActionAjaxOnSuccessDefault])) {
                        nodeItem.setAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1)+fieldNameDataEventActionAjaxOnSuccessSuffix, action[fieldNameActionAjaxOnSuccessDefault]);
                    }
                    if (action.hasOwnProperty(fieldNameActionAjaxOnFailureDefault) && utils.isString(action[fieldNameActionAjaxOnFailureDefault])) {
                        nodeItem.setAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1)+fieldNameDataEventActionAjaxOnFailureSuffix, action[fieldNameActionAjaxOnFailureDefault]);
                    }
                }
            }

            //register the events
            eventUtils.registerEvents(nodeItem, events);
        }

        //return the method's value
        return events;
    };

    this.getEventsFromHtml = function (elementId) {
        //declare locals
        let methodName = _objectName+"getEventsFromHtml(): ";
        let message;
        let events = null;
        let _event = null;
        let action = null;
        let nodeItem;
        let numItemsAttValue;
        let numItems;
        let numActions;
        let attributeValue;

        //check for valid values
        if (!utils.isInDom(elementId)) {
            message = "elementId=[" + String(elementId) + "] is NOT in DOM !!";
            console.error(methodName + message);
            return null;
        }

        //get the node from the DOM
        nodeItem = utils.getFromDom(elementId);

        //get the number of event items
        numItemsAttValue = nodeItem.getAttribute(fieldNameDataEvents);

        //check for valid values
        if (isNaN(numItemsAttValue)) {
            message = "attribute=[" + fieldNameDataEvents + "] must contain a numeric value in elementId=[" + elementId + "] !!";
            console.error(methodName + message);
            return null;
        }

        //parse the value into a number
        numItems = parseInt(numItemsAttValue);

        //check for valid values
        if (numItems<0) {
            message = "numItems=[" + numItems + "] must be a positive integer in elementId=[" + elementId + "] !!";
            console.error(methodName + message);
            return null;
        }

        //create new items
        events = [];

        //loop through the items
        for (let i=0; i<numItems; i++) {
            //build an event item
            _event = {};
            attributeValue = nodeItem.getAttribute(fieldNameDataEvent+(i+1));
            if (!utils.isString(attributeValue)) {
                continue;
            }
            _event.name = attributeValue;
            numActions = nodeItem.getAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionsSuffix);
            if (isNaN(numActions)) {
                continue;
            }
            else {
                numActions = parseInt(numActions);
                if (numActions<0) {
                    continue;
                }
            }
            _event.actions = [];
            for (let j=0; j<numActions; j++) {
                //build an event item
                action = {};
                attributeValue = nodeItem.getAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1));
                if (utils.isString(attributeValue)) {
                    action[fieldNameActionDefault] = attributeValue;
                }
                attributeValue = nodeItem.getAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1)+fieldNameDataEventActionForSuffix);
                if (utils.isString(attributeValue)) {
                    if (attributeValue.indexOf(",")==-1) {
                        action[fieldNameFor] = attributeValue;
                    }
                    else {
                        attributeValue = utils.string2array(attributeValue);
                        action[fieldNameFor] = attributeValue;
                    }
                }
                attributeValue = nodeItem.getAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1)+fieldNameDataEventActionDomAttNameSuffix);
                if (utils.isString(attributeValue)) {
                    action[fieldNameAttName] = attributeValue;
                }
                attributeValue = nodeItem.getAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1)+fieldNameDataEventActionDomAttValueSuffix);
                if (utils.isEmpty(attributeValue)) {
                    action[fieldNameAttValue] = "";
                }
                else {
                    action[fieldNameAttValue] = attributeValue;
                }
                attributeValue = nodeItem.getAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1)+fieldNameDataEventActionAjaxUrlSuffix);
                if (utils.isString(attributeValue)) {
                    action[fieldNameActionAjaxUrlDefault] = attributeValue;
                }
                attributeValue = nodeItem.getAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1)+fieldNameDataEventActionAjaxMethodSuffix);
                if (utils.isString(attributeValue)) {
                    action[fieldNameActionAjaxMethodDefault] = attributeValue;
                }
                attributeValue = nodeItem.getAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1)+fieldNameDataEventActionAjaxDataNamesSuffix);
                if (utils.isString(attributeValue)) {
                    attributeValue = utils.string2array(attributeValue);
                    action[fieldNameActionAjaxDataNamesDefault] = attributeValue;
                }
                attributeValue = nodeItem.getAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1)+fieldNameDataEventActionAjaxDataValuesIdsSuffix);
                if (utils.isString(attributeValue)) {
                    attributeValue = utils.string2array(attributeValue);
                    action[fieldNameActionAjaxDataValuesIdsDefault] = attributeValue;
                }
                attributeValue = nodeItem.getAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1)+fieldNameDataEventActionAjaxConfigSuffix);
                if (utils.isString(attributeValue)) {
                    attributeValue = JSON.parse(attributeValue);
                    action[fieldNameActionAjaxConfigDefault] = attributeValue;
                }
                attributeValue = nodeItem.getAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1)+fieldNameDataEventActionAjaxOnSuccessSuffix);
                if (utils.isString(attributeValue)) {
                    action[fieldNameActionAjaxOnSuccessDefault] = attributeValue;
                }
                attributeValue = nodeItem.getAttribute(fieldNameDataEvent+(i+1)+fieldNameDataEventActionSuffix+(j+1)+fieldNameDataEventActionAjaxOnFailureSuffix);
                if (utils.isString(attributeValue)) {
                    action[fieldNameActionAjaxOnFailureDefault] = attributeValue;
                }

                //add the action item to the event's action array
                _event.actions.push(action);
            }

            //add the item to the array
            events.push(_event);
        }

        //check the array's size
        if (events.length<1) {
            events = null;
        }

        //return the method's value
        return events;
    };

    this._getEvent = function (elementId, eventNode) {
        //declare locals
        let methodName = _objectName+"_getEvent(): ";
        let message;
        let _event = null;
        let fieldNameEventName;
        let fieldNameEventActions;
        let eventName;
        let eventActions;
        let actionNode;
        let action;

        //check for valid values
        if (!utils.isJson(eventNode)) {
            message = "eventNode item is NOT a valid JSON for elementId=[" + elementId + "]!!";
            console.error(methodName + message);
            return null;
        }

        //get required fields names
        fieldNameEventName = jsonUtils.getRealName(eventNode, fieldNameEventNameKeys);
        fieldNameEventActions = jsonUtils.getRealName(eventNode, fieldNameEventActionsKeys);

        //check for valid values
        if (utils.isEmpty(fieldNameEventName) || utils.isEmpty(fieldNameEventActions)) {
            message = "eventNode item is missing required fields name or actions for elementId=[" + elementId + "] !!";
            console.error(methodName + message);
            return null;
        }

        //get required fields names
        eventName = eventNode[fieldNameEventName];
        eventActions = eventNode[fieldNameEventActions];

        //check for valid values
        if (!utils.isString(eventName) || !utils.isArray(eventActions)) {
            message = "eventNode item has empty or null values for fields name or actions for elementId=[" + elementId + "] !!";
            console.error(methodName + message);
            return null;
        }

        //set the event's name and data
        _event = {};
        _event.name = eventName;
        _event.actions = [];

        //loop through the event's data
        for (let i=0; i<eventActions.length; i++) {
            //get the current item (action)
            actionNode = eventActions[i];

            //try to get an action from the node
            action = eventUtils._getAction(elementId, eventName, actionNode);

            //check for valid values
            if (action==null) {
                message = "action is invalid at index=[" + i + "] of event=[" + eventName + "] for elementId=[" + elementId + "] !!";
                console.error(methodName + message);
                continue;
            }

            //add the action to the event data array
            _event.actions.push(action);
        }

        //return the method's value
        return _event;
    };

    this._getAction = function (elementId, eventName, actionNode) {
        //declare locals
        let methodName = _objectName+"_getAction(): ";
        let message;
        let isValid = true;
        let action = null;
        let actionName;
        let fieldNameId;
        let fieldValueId;
        let fieldNameAttName;
        let fieldValueAttName;
        let fieldNameAttValue;
        let fieldValueAttValue;
        let fieldNameReal;
        let fieldValue;

        //check for valid values
        if (!utils.isJson(actionNode)) {
            message = "actionNode is NOT a valid JSON for eventName=[" + eventName + "] of elementId=[" + elementId + "] !!";
            console.error(methodName + message);
            return null;
        }
        if (!jsonUtils.hasField(actionNode, fieldNameActionDefault)) {
            message = "actionNode is missing field=[" + fieldNameActionDefault + "] for eventName=[" + eventName + "] of elementId=[" + elementId + "] !!";
            console.error(methodName + message);
            return null;
        }

        //get the action name
        actionName = jsonUtils.getValue(actionNode, fieldNameActionDefault);

        //check for valid values
        if (!utils.isInArray(actionName, validActions)) {
            message = "actionName=[" + actionName + "] is INVALID for eventName=[" + eventName + "] of elementId=[" + elementId + "] !!";
            console.error(methodName + message);
            return null;
        }

        //create an action
        action = {};

        //check the action type
        switch (actionName.toLowerCase()) {
            case "ajax":
                action.action = "ajax";
                if (!jsonUtils.hasField(actionNode, fieldNameActionAjaxUrlDefault)) {
                    message = "actionName=[" + actionName + "] is missing field=[" + fieldNameActionAjaxUrlDefault + "] for eventName=[" + eventName + "] of elementId=[" + elementId + "] !!";
                    console.error(methodName + message);
                    isValid = false;
                }
                else {
                    fieldNameReal = jsonUtils.getName(actionNode, fieldNameActionAjaxUrlDefault);
                    fieldValue = actionNode[fieldNameReal];
                    if (!utils.isString(fieldValue)) {
                        message = fieldNameActionAjaxUrlDefault + "=[" + String(fieldValue) + "] is INVALID in actionName=[" + actionName + "] for eventName=[" + eventName + "] of elementId=[" + elementId + "] !!";
                        console.error(methodName + message);
                        isValid = false;
                    }
                    else {
                        action.url = fieldValue;
                        fieldValue = jsonUtils.getValue(actionNode, fieldNameActionAjaxMethodDefault);
                        if (utils.isInArray(fieldValue, validAjaxMethods)) {
                            action.method = fieldValue;
                        }
                        else {
                            action.method = "get";
                        }
                        fieldNameReal = jsonUtils.getName(actionNode, fieldNameActionAjaxDataNamesDefault);
                        if (!utils.isEmpty(fieldNameReal)) {
                            fieldValue = actionNode[fieldNameReal];
                            if (utils.isArray(fieldValue)) {
                                action.dataNames = fieldValue;
                            }
                            else {
                                if (utils.isString(fieldValue)) {
                                    if (fieldValue.indexOf(",")==-1) {
                                        fieldValue = [fieldValue];
                                    }
                                    else {
                                        fieldValue = utils.string2array(fieldValue);
                                    }
                                    action.dataNames = fieldValue;
                                }
                            }
                        }
                        fieldNameReal = jsonUtils.getName(actionNode, fieldNameActionAjaxDataValuesIdsDefault);
                        if (!utils.isEmpty(fieldNameReal)) {
                            fieldValue = actionNode[fieldNameReal];
                            if (utils.isArray(fieldValue)) {
                                action.dataValuesIds = fieldValue;
                            }
                            else {
                                if (utils.isString(fieldValue)) {
                                    if (fieldValue.indexOf(",")==-1) {
                                        fieldValue = [fieldValue];
                                    }
                                    else {
                                        fieldValue = utils.string2array(fieldValue);
                                    }
                                    action.dataValuesIds = fieldValue;
                                }
                            }
                        }
                        fieldNameReal = jsonUtils.getName(actionNode, fieldNameActionAjaxConfigDefault);
                        if (!utils.isEmpty(fieldNameReal)) {
                            fieldValue = actionNode[fieldNameReal];
                            action.config = fieldValue;
                        }
                        fieldNameReal = jsonUtils.getName(actionNode, fieldNameActionAjaxOnSuccessDefault);
                        if (!utils.isEmpty(fieldNameReal)) {
                            fieldValue = actionNode[fieldNameReal];
                            action.onSuccess = fieldValue;
                        }
                        fieldNameReal = jsonUtils.getName(actionNode, fieldNameActionAjaxOnFailureDefault);
                        if (!utils.isEmpty(fieldNameReal)) {
                            fieldValue = actionNode[fieldNameReal];
                            action.onFailure = fieldValue;
                        }
                    }
                }
                break;
            case "clear":
            case "clearvalidations":
            case "validate":
                if (actionName.toLowerCase()=="validate") {
                    action.action = "validate";
                }
                else {
                    action.action = "clearValidations";
                }
                fieldNameId = jsonUtils.getRealName(actionNode, fieldNameActionValidateIdKeys);
                if (!utils.isString(fieldNameId)) {
                    message = "actionName=[" + actionName + "] is missing id field for eventName=[" + eventName + "] of elementId=[" + elementId + "] !!";
                    console.error(methodName + message);
                    isValid = false;
                }
                else {
                    fieldValueId = actionNode[fieldNameId];
                    if (!utils.isString(fieldValueId) && !utils.isArray(fieldValueId)) {
                        message = fieldNameId + "=[" + String(fieldValueId) + "] is INVALID in actionName=[" + actionName + "] for eventName=[" + eventName + "] of elementId=[" + elementId + "] !!";
                        console.error(methodName + message);
                        isValid = false;
                    }
                    else {
                        if (utils.isString(fieldValueId)) {
                            if (fieldValueId.indexOf(",")==-1) {
                                fieldValueId = [fieldValueId];
                            }
                            else {
                                fieldValueId = utils.string2array(fieldValueId);
                            }
                        }
                        action.for = fieldValueId;
                    }
                }
                break;
            case "updatecss":
            case "updatedom":
                if (actionName.toLowerCase()=="updatecss") {
                    action.action = "updateCss";
                }
                else {
                    action.action = "updateDom";
                }
                fieldNameId = jsonUtils.getRealName(actionNode, fieldNameActionDomIdKeys);
                if (!utils.isString(fieldNameId)) {
                    message = "actionName=[" + actionName + "] is missing id field for eventName=[" + eventName + "] of elementId=[" + elementId + "] !!";
                    console.error(methodName + message);
                    isValid = false;
                }
                else {
                    fieldValueId = actionNode[fieldNameId];
                    if (!utils.isString(fieldValueId)) {
                        message = fieldNameId + "=[" + String(fieldValueId) + "] must be a valid string in actionName=[" + actionName + "] for eventName=[" + eventName + "] of elementId=[" + elementId + "] !!";
                        console.error(methodName + message);
                        isValid = false;
                    }
                    else {
                        action.for = fieldValueId;
                    }
                }
                fieldNameAttName = jsonUtils.getRealName(actionNode, fieldNameActionDomAttNameKeys);
                if (!utils.isString(fieldNameAttName)) {
                    message = "actionName=[" + actionName + "] is missing attribute name field for eventName=[" + eventName + "] of elementId=[" + elementId + "] !!";
                    console.error(methodName + message);
                    isValid = false;
                }
                else {
                    fieldValueAttName = actionNode[fieldNameAttName];
                    if (!utils.isString(fieldValueAttName)) {
                        message = fieldNameAttName + "=[" + String(fieldValueAttName) + "] is INVALID in actionName=[" + actionName + "] for eventName=[" + eventName + "] of elementId=[" + elementId + "] !!";
                        console.error(methodName + message);
                        isValid = false;
                    }
                    else {
                        action.attName = fieldValueAttName;
                    }
                }
                fieldNameAttValue = jsonUtils.getRealName(actionNode, fieldNameActionDomAttValueKeys);
                if (!utils.isString(fieldNameAttValue)) {
                    message = "actionName=[" + actionName + "] is missing attribute value field for eventName=[" + eventName + "] of elementId=[" + elementId + "] !!";
                    console.error(methodName + message);
                    isValid = false;
                }
                else {
                    fieldValueAttValue = actionNode[fieldNameAttValue];
                    action.attValue = fieldValueAttValue;
                }
                break;
            default:
                message = "actionName=[" + actionName + "] is INVALID for eventName=[" + eventName + "] of elementId=[" + elementId + "] !!";
                console.error(methodName + message);
                isValid = false;
                break;
        }

        //check for the valid flag
        if (!isValid) {
            return null;
        }

        //return the method's value
        return action;
    };

    this.executeActionAjax = function (action) {
        //declare locals
        let methodName = _objectName+"executeActionAjax(): ";
        let message;
        let actionName;
        let url;
        let method;
        let onsuccess;
        let onFailure;
        let configOpts;
        let dataNames;
        let dataValuesIds;
        let requestData;

        //check for valid values
        if (!utils.isJson(action)) {
            message = "action is NOT a valid JSON !!";
            console.error(methodName + message);
            return false;
        }
        if (!jsonUtils.hasField(action, fieldNameActionDefault) || !jsonUtils.hasField(action, fieldNameActionAjaxUrlDefault)
            || !jsonUtils.hasField(action, fieldNameActionAjaxMethodDefault)) {
            message = "action is missing one or more required fields=[" + fieldNameActionDefault + "," + fieldNameActionAjaxUrlDefault + "," + fieldNameActionAjaxMethodDefault + "] !!";
            console.error(methodName + message);
            return false;
        }
        actionName = jsonUtils.getValue(action, fieldNameActionDefault);
        if (!utils.isString(actionName) || actionName.toLowerCase()!="ajax") {
            message = "actionName=[" + String(actionName) + "] is NOT a valid ajax action !!";
            console.error(methodName + message);
            return false;
        }
        url = jsonUtils.getValue(action, fieldNameActionAjaxUrlDefault);
        if (!utils.isString(url)) {
            message = "url=[" + String(url) + "] must be a valid string !!";
            console.error(methodName + message);
            return false;
        }
        method = jsonUtils.getValue(action, fieldNameActionAjaxMethodDefault);
        if (!utils.isInArray(method, validAjaxMethods)) {
            message = "method=[" + String(method) + "] is NOT supported in ajax actions !!";
            console.error(methodName + message);
            return false;
        }
        configOpts = jsonUtils.getValue(action, fieldNameActionAjaxConfigDefault);
        if (!utils.isEmpty(configOpts) && !utils.isJson(configOpts)) {
            message = "configOpts must be a valid JSON in ajax actions !!";
            console.error(methodName + message);
            return false;
        }
        onFailure = jsonUtils.getValue(action, fieldNameActionAjaxOnFailureDefault);
        if (!utils.isEmpty(onFailure) && !utils.isString(onFailure)) {
            message = "onFailure=[" + String(onFailure) + "] must be a valid string !!";
            console.error(methodName + message);
            return false;
        }
        onsuccess = jsonUtils.getValue(action, fieldNameActionAjaxOnSuccessDefault);
        if (!utils.isEmpty(onsuccess) && !utils.isString(onsuccess)) {
            message = "onsuccess=[" + String(onsuccess) + "] must be a valid string !!";
            console.error(methodName + message);
            return false;
        }
        dataNames = jsonUtils.getValue(action, fieldNameActionAjaxDataNamesDefault);
        if (!utils.isArray(dataNames)) {
            message = "dataNames value must be an array in ajax actions !!";
            console.error(methodName + message);
            return false;
        }
        dataValuesIds = jsonUtils.getValue(action, fieldNameActionAjaxDataValuesIdsDefault);
        if (!utils.isArray(dataValuesIds)) {
            message = "dataValuesIds value must be an array in ajax actions !!";
            console.error(methodName + message);
            return false;
        }
        if (dataNames.length != dataValuesIds.length) {
            message = "dataNames array size=[" + dataNames.length + "] is NOT the same as dataValuesIds array size=[" + dataValuesIds.length + "] in ajax actions !!";
            console.error(methodName + message);
            return false;
        }
        requestData = {};
        for (let i=0; i<dataNames.length; i++) {
            if (utils.isInDom(dataValuesIds[i])) {
                requestData[dataNames[i]] = domUtils.getUiItemValue(dataValuesIds[i]);
            }
        }

        //execute the action
        if (method.toLowerCase()=="get") {
            ajaxUtils.sendGet(url, onsuccess, onFailure, configOpts);
        }
        else if (method.toLowerCase()=="post") {
            ajaxUtils.sendPost(url, requestData, onsuccess, onFailure, configOpts);
        }

        //return the method's value
        return true;
    };

    this.executeActionValidate = function (action) {
        //declare locals
        let methodName = _objectName+"executeActionValidate(): ";
        let message;
        let actionName;
        let ids;

        //check for valid values
        if (!utils.isJson(action)) {
            message = "action is NOT a valid JSON !!";
            console.error(methodName + message);
            return false;
        }
        if (!jsonUtils.hasField(action, fieldNameActionDefault) || !jsonUtils.hasField(action, fieldNameFor)) {
            message = "action is missing one or more required fields=[" + fieldNameActionDefault + "," + fieldNameFor + "] !!";
            console.error(methodName + message);
            return false;
        }
        actionName = jsonUtils.getValue(action, fieldNameActionDefault);
        if (!utils.isString(actionName) || actionName.toLowerCase()!="validate") {
            message = "actionName=[" + String(actionName) + "] is NOT a valid validate action !!";
            console.error(methodName + message);
            return false;
        }
        ids = jsonUtils.getValue(action, fieldNameFor);
        if (!utils.isArray(ids)) {
            if (utils.isString(ids)) {
                ids = utils.string2array(ids);
            }
        }
        if (!utils.isArray(ids)) {
            message = "ids value must be an array in ajax actions !!";
            console.error(methodName + message);
            return false;
        }

        //execute the action
        return validationUtils.validate(ids, false);
    };

    this.executeActionClearValidations = function (action) {
        //declare locals
        let methodName = _objectName+"executeActionClearValidations(): ";
        let message;
        let actionName;
        let ids;

        //check for valid values
        if (!utils.isJson(action)) {
            message = "action is NOT a valid JSON !!";
            console.error(methodName + message);
            return false;
        }
        if (!jsonUtils.hasField(action, fieldNameActionDefault) || !jsonUtils.hasField(action, fieldNameFor)) {
            message = "action is missing one or more required fields=[" + fieldNameActionDefault + "," + fieldNameFor + "] !!";
            console.error(methodName + message);
            return false;
        }
        actionName = jsonUtils.getValue(action, fieldNameActionDefault);
        if (!utils.isString(actionName) || (actionName.toLowerCase()!="clear" &&  actionName.toLowerCase()!="clearvalidations")) {
            message = "actionName=[" + String(actionName) + "] is NOT a valid clearValidations action !!";
            console.error(methodName + message);
            return false;
        }
        ids = jsonUtils.getValue(action, fieldNameFor);
        if (!utils.isArray(ids)) {
            if (utils.isString(ids)) {
                ids = utils.string2array(ids);
            }
        }
        if (!utils.isArray(ids)) {
            message = "ids value must be an array in ajax actions !!";
            console.error(methodName + message);
            return false;
        }

        //execute the action
        validationUtils.clearValidations(ids);
        return true;
    };

    this.executeActionDomUpdate = function (action) {
        //declare locals
        let methodName = _objectName+"executeActionDomUpdate(): ";
        let message;
        let actionName;
        let elementId;
        let attName;
        let attValue;

        //check for valid values
        if (!utils.isJson(action)) {
            message = "action is NOT a valid JSON !!";
            console.error(methodName + message);
            return false;
        }
        if (!jsonUtils.hasField(action, fieldNameActionDefault) || !jsonUtils.hasField(action, fieldNameFor)
            || !jsonUtils.hasField(action, fieldNameAttName) || !jsonUtils.hasField(action, fieldNameAttValue)) {
            message = "action is missing one or more required fields=[" + fieldNameActionDefault + "," + fieldNameFor + "," + fieldNameAttName + "," + fieldNameAttValue + "] !!";
            console.error(methodName + message);
            return false;
        }
        actionName = jsonUtils.getValue(action, fieldNameActionDefault);
        if (!utils.isString(actionName) || (actionName.toLowerCase()!="updatedom" && actionName.toLowerCase()!="updatecss")) {
            message = "actionName=[" + String(actionName) + "] is NOT a valid updateDom or updateCss action !!";
            console.error(methodName + message);
            return false;
        }
        elementId = jsonUtils.getValue(action, fieldNameFor);
        if (!utils.isString(elementId)) {
            message = "attribute value for=[" + String(elementId) + "] must be a valid string for updateDom action !!";
            console.error(methodName + message);
            return false;
        }
        attName = jsonUtils.getValue(action, fieldNameAttName);
        if (!utils.isString(attName)) {
            message = "attribute value attName=[" + String(attName) + "] must be a valid string for updateDom action !!";
            console.error(methodName + message);
            return false;
        }
        attValue = jsonUtils.getValue(action, fieldNameAttValue);

        //execute the action
        if (actionName.toLowerCase()=="updatecss") {
            domUtils.setStyle(elementId, attName + ":" + attValue);
        }
        else if (actionName.toLowerCase()=="updatedom") {
            domUtils.setAttributeValue(elementId, attName, attValue);
        }
        return true;
    };

    this.executeAction = function (action) {
        //declare locals
        let methodName = _objectName + "executeAction(): ";
        let message;
        let actionName;
        let retVal = false;

        //check for valid values
        if (!utils.isJson(action)) {
            message = "action is NOT a valid JSON !!";
            console.error(methodName + message);
            return false;
        }
        if (!jsonUtils.hasField(action, fieldNameActionDefault)) {
            message = "action is missing required field=[" + fieldNameActionDefault + "] !!";
            console.error(methodName + message);
            return false;
        }
        actionName = jsonUtils.getValue(action, fieldNameActionDefault);
        if (!utils.isString(actionName)) {
            message = "actionName=[" + String(actionName) + "] is NOT a valid !!";
            console.error(methodName + message);
            return false;
        }

        //check the action name
        switch (actionName.toLowerCase()) {
            case "ajax":
                retVal = eventUtils.executeActionAjax(action);
                break;
            case "clear":
            case "clearvalidations":
                retVal = eventUtils.executeActionClearValidations(action);
                break;
            case "validate":
                retVal = eventUtils.executeActionValidate(action);
                break;
            case "updatecss":
            case "updatedom":
                retVal = eventUtils.executeActionDomUpdate(action);
                break;
            default:
                retVal = false;
                break;
        }

        //return the method's value
        return retVal;
    };

    this.getActions = function (elementId, eventName) {
        //declare locals
        let events = eventUtils.getEventsFromHtml(elementId);
        let currEvent;
        let currEventName;
        let currEventActions;
        let actions = null;

        //check for valid values
        if (events==null) {
            return;
        }
        if (!utils.isString(eventName)) {
            return;
        }

        //loop through the items
        for (let i=0; i<events.length; i++) {
            //get the current item
            currEvent = events[i];

            //check for required fields
            if (!jsonUtils.hasField(currEvent, _fieldNameEventName) || !jsonUtils.hasField(currEvent, _fieldNameEventActions)) {
                continue;
            }

            //get the fields' values
            currEventName = jsonUtils.getValue(currEvent, _fieldNameEventName);
            currEventActions = jsonUtils.getValue(currEvent, _fieldNameEventActions);

            //check for valid values
            if (!utils.isString(currEventName)) {
                continue;
            }
            if (!utils.isArray(currEventActions)) {
                if (utils.isJson(currEventActions)) {
                    currEventActions = [currEventActions];
                }
            }
            if (!utils.isArray(currEventActions)) {
                continue;
            }

            //fix the event name if necessary
            eventName = eventName.toLowerCase();
            currEventName = currEventName.toLowerCase();
            if (!eventName.startsWith(eventNamePrefix)) {
                eventName = eventNamePrefix + eventName;
            }
            if (!currEventName.startsWith(eventNamePrefix)) {
                currEventName = eventNamePrefix + currEventName;
            }

            //compare the names
            if (eventName==currEventName) {
                actions = currEventActions;
                break;
            }
        }

        //return the method's value
        return actions;
    };

    this.registerEvents = function (htmlNode, events) {
        //declare locals
        let _event = null;
        let eventName = null;
        let actions = null;

        //check for valid values
        if (utils.isEmpty(htmlNode)) {
            return;
        }
        if (!utils.isArray(events)) {
            if (utils.isJson(events)) {
                events = [events];
            }
        }
        if (!utils.isArray(events)) {
            return;
        }

        //loop through the events
        for (let i=0; i<events.length; i++) {
            //get the current item
            _event = events[i];

            //check for required fields
            if (!jsonUtils.hasField(_event, _fieldNameEventName) || !jsonUtils.hasField(_event, _fieldNameEventActions)) {
                continue;
            }

            //get the fields' values
            eventName = jsonUtils.getValue(_event, _fieldNameEventName);
            actions = jsonUtils.getValue(_event, _fieldNameEventActions);

            //check for valid values
            if (!utils.isString(eventName)) {
                continue;
            }
            if (!utils.isArray(actions)) {
                if (utils.isJson(actions)) {
                    actions = [actions];
                }
            }
            if (!utils.isArray(actions)) {
                continue;
            }

            //fix the event's name if necessary
            eventName = eventName.toLowerCase();
            if (eventName.startsWith(eventNamePrefix)) {
                eventName = eventName.substring(2);
            }

            //register the event
            htmlNode.addEventListener(eventName, function() {
                let _elemId = this.id;
                let _actions = eventUtils.getActions(_elemId, eventName);
                let _actionSuccess = false;

                if (!utils.isArray(_actions)) {
                    return;
                }

                //loop through the actions
                for (let j=0; j<_actions.length; j++) {
                    //execute the current action
                    _actionSuccess = eventUtils.executeAction(_actions[j]);
                    if (!_actionSuccess) {
                        break;
                    }
                }
            });
        }
    };
};
const uiCompsUtils = new function() {
    //declare global variables
    let dragObj=null;
    let arrDraggableIds=[];
    let dataAttNameLeft = "data-pos-left";
    let dataAttNameTop = "data-pos-top";
    let dataAttNamePanelHeight = "data-panel-height";
    let dataAttNamePanelWidth = "data-panel-width";
    let dataAttNameBodyHeight = "data-body-height";
    let dataAttNameBodyWidth = "data-body-width";
    let docMouseMove=false;
    
    function _addDragAndDropListeners(htmlNode, config) {
        //declare locals
        let realNode = null;
        let objId = null;
        let itemIndex = -1;
        let isMovable = false;
        
        //check for valid values
        if (utils.isEmpty(htmlNode)) {
            return;
        }
        if (utils.isString(htmlNode) && utils.isInDom(htmlNode)) {
            realNode = document.getElementById(htmlNode);
        }
        else if (utils.isElementNode(htmlNode)) {
            realNode = htmlNode;
        }
        if (realNode==null) {
            return;
        }
        if ((jsonUtils.hasValue(config, "movable") && utils.isTrue(config.movable)) || 
            (jsonUtils.hasValue(config, "draggable") && utils.isTrue(config.draggable))) {
            isMovable = true;
        }

        //get the object's id
        if (utils.isEmpty(realNode.id)) {
            realNode.id = utils.generateId(realNode.tagName, realNode.tagName);
        }
        objId = realNode.id;

        //get the item's index in the array
        itemIndex = utils.indexOf(objId, arrDraggableIds);

        //check the movable flag
        if (!isMovable) {
            //remove the id from the array
            if (itemIndex!=-1) {
                arrDraggableIds.splice(itemIndex, 1);
            }

            //remove event listeners
            realNode.removeEventListener("mousedown", _dragMouseDownHandler);
            realNode.removeEventListener("mouseup", _dragMouseUpHandler);
            dragObj = null;
            return;
        }

        //add the node to the array if it doesn't exist
        if (itemIndex==-1) {
            arrDraggableIds.push(objId);
        }

        //set the initial values of the node's screen coordinates
        let rect = realNode.getBoundingClientRect();
        realNode.adx = rect.width; 
        realNode.ady = rect.height;

        realNode.addEventListener("mousedown", _dragMouseDownHandler);
        realNode.addEventListener("mouseup", _dragMouseUpHandler);
        
        document.onmouseup = function(e) {
            docMouseMove = false;
            if(dragObj) {
                dragObj.isDown = false;
                dragObj.style.cursor = "default";
            }
        }

        document.onmousemove = function(e) {
            if(dragObj && dragObj.isDown && docMouseMove) {
                dragObj.style.cursor = "grabbing";
                let pos = "absolute";
                let left = e.pageX -dragObj.adx+ dragObj.dx;
                let top = e.pageY -dragObj.ady+ dragObj.dy;
                dragObj.style.position = pos;
                dragObj.style.left = left + "px";
                dragObj.style.top = top + "px";
                domUtils.setAttributeValue(dragObj, dataAttNameLeft, left);
                domUtils.setAttributeValue(dragObj, dataAttNameTop, top);
            }
        }
    }

    function _dragMouseDownHandler(ev) {
        let objNode = this;
        let rect = objNode.getBoundingClientRect();
        objNode.dx = rect.left - ev.clientX;
        objNode.dy = rect.top - ev.clientY;
        objNode.isDown = true;
        docMouseMove = true;
        let zIndex = arrDraggableIds.length;
        //reset the zindex of all draggable items
        for (let i=0; i<arrDraggableIds.length; i++) {
            document.getElementById(arrDraggableIds[i]).style["z-index"] = zIndex-1;
        }
        objNode.style["z-index"] = zIndex+1;
        dragObj = objNode;
    }

    function _dragMouseUpHandler(ev) {
        let objNode = this;
        objNode.isDown = false;
        docMouseMove = false;
    }

    function _disableDocumentMouseMove() {
        docMouseMove = false;
    }

    function _addDragAndDropListeners_OLD(node, config) {
        //declare locals
        let realNode = null;
        
        //check for valid values
        if (utils.isEmpty(node) || utils.isEmpty(config)) {
            return;
        }
        if (!jsonUtils.hasValue(config, "movable") || !utils.isTrue(config.movable)) {
            return;
        }
        if (utils.isString(node) && utils.isInDom(node)) {
            realNode = document.getElementById(node);
        }
        else if (utils.isElementNode(node)) {
            realNode = node;
        }
        if (realNode==null) {
            return;
        }

        //add an event listener to the given node
        realNode.setAttribute("draggable", "true");
        realNode.addEventListener("ondragstart", function(event) {
            _drag(event);
        });

        let bodyNode = document.getElementsByTagName("body")[0];
        if (!utils.isEmpty(bodyNode)) {
            domUtils.addEventListener(bodyNode, "ondragover", function(event) {
                _allowDrop(event);
            });
            domUtils.addEventListener(bodyNode, "ondrop", function(event) {
                _drop(event);
            });
        }
    }

    function _allowDrop(eventObj) {
        eventObj.preventDefault();
    }
    
    function _collapse(config, callback) {
        //declare locals
        let methodName = "uiCompsUtils._collapse(): ";
        let _config = {
            state: "expanded",
            compId: "",
            compBodyId: "",
            compHeaderId: "",
            headerAlignment: "top",
            buttonId: "",
            buttonIconId: "",
            buttonTextId: "",
            buttonText: "",
            buttonIcon: "",
            animateButton: true,
            buttonAnimationDuration: 1500,
            animationDuration: 1500,
        };
        //merge configuration
        _config = jsonUtils.mergeJson(_config, config);
        let currState = _config.state;
        let panelNodeId = _config.compId;
        let bodyNodeId = _config.compBodyId;
        let headerNodeId = _config.compHeaderId;
        let buttonIconNodeId = _config.buttonIconId;
        let buttonTextNodeId = _config.buttonTextId;
        let headerAlignment = _config.headerAlignment;
        let newState;
        let panelNode;
        let bodyNode;
        let headerNode;
        let buttonIconNode;
        let buttonTextNode;
        let headerHeight;
        let headerWidth;
        let currBodyHeight;
        let currBodyWidth;
        let currPanelHeight;
        let currPanelWidth;
        let currPanelTop;
        let currPanelLeft;
        let destPanelTop;
        let destPanelLeft;
        let buttonText = (utils.isEmpty(_config.buttonText) ? "+" : _config.buttonText);
        let buttonIcon = (utils.isEmpty(_config.buttonIcon) ? "" : _config.buttonIcon);
        let newText;
        let newIcon;
        let textStyle;
        let defaultAnimationDurationButton = 1500;
        let animationDurationButton = _config.buttonAnimationDuration;
        let defaultAnimationDuration = 1500;
        let animationDuration = _config.animationDuration;

        //disable mousemove of drag and drop listeners
        _disableDocumentMouseMove();

        //set defaults if necessary
        if (utils.isEmpty(animationDuration)) {
            animationDuration = defaultAnimationDuration;
        }
        if (utils.isEmpty(animationDurationButton)) {
            animationDurationButton = defaultAnimationDurationButton;
        }

        //get a reference to the html nodes
        panelNode = utils.getFromDom(panelNodeId);
        bodyNode = utils.getFromDom(bodyNodeId);
        headerNode = utils.getFromDom(headerNodeId);
        buttonIconNode = utils.getFromDom(buttonIconNodeId);
        buttonTextNode = utils.getFromDom(buttonTextNodeId);

        //get the height and width of the differenet html nodes
        if (utils.isInDom(headerNodeId)) {
            headerHeight = headerNode.getBoundingClientRect().height;
            headerWidth = headerNode.getBoundingClientRect().width;
        }
        if (utils.isInDom(bodyNodeId)) {
            currBodyHeight = bodyNode.getBoundingClientRect().height;
            currBodyWidth = bodyNode.getBoundingClientRect().width;
            domUtils.setAttributeValue(bodyNode, dataAttNameBodyHeight, currBodyHeight);
            domUtils.setAttributeValue(bodyNode, dataAttNameBodyWidth, currBodyWidth);
        }
        if (utils.isInDom(panelNodeId)) {
            currPanelHeight = panelNode.getBoundingClientRect().height;
            currPanelWidth = panelNode.getBoundingClientRect().width;
            domUtils.setAttributeValue(panelNode, dataAttNamePanelHeight, currPanelHeight);
            domUtils.setAttributeValue(panelNode, dataAttNamePanelWidth, currPanelWidth);
            currPanelLeft = parseFloat(domUtils.getAttributeValue(panelNode, dataAttNameLeft));
            currPanelTop = parseFloat(domUtils.getAttributeValue(panelNode, dataAttNameTop));
            destPanelLeft = (currPanelLeft+currPanelWidth)-headerWidth;
            destPanelTop = (currPanelTop+currPanelHeight)-headerHeight;
        }

        //check the current state
        if (currState=="expanded") {
            newState = "collapsed";

            //set the button's new icon
            newIcon = buttonIcon;
            newText = buttonText;
            textStyle = "margin-top: -3px;margin-left: -7px";
            
            //check for a button icon node
            if (utils.isInDom(buttonIconNodeId)) {
                if (!isNaN(newIcon)) {
                    newIcon = "&#" + newIcon + ";";
                }
                if (utils.isTrue(_config.animateButton)) {
                    animationUtils.fadeOut(buttonIconNode, animationDurationButton);            
                    buttonIconNode.innerHTML = newIcon;
                    animationUtils.fadeIn(buttonIconNode, animationDurationButton);
                }
                else {
                    buttonIconNode.innerHTML = newIcon;
                }
            }

            //check for a button text node
            if (utils.isInDom(buttonTextNodeId)) {
                if (utils.isTrue(_config.animateButton)) {
                    animationUtils.fadeOut(buttonTextNode, animationDurationButton);          
                    buttonTextNode.innerHTML = newText;
                    domUtils.setStyle(buttonTextNode, textStyle);
                    animationUtils.fadeIn(buttonTextNode, animationDurationButton);
                }
                else {
                    buttonTextNode.innerHTML = newText;
                    domUtils.setStyle(buttonTextNode, textStyle);
                }
            }

            //perform animation
            switch (headerAlignment) {
                case "top":
                    if (utils.isInDom(bodyNodeId)) {
                        bodyNode.animate({"height": "0px"}, animationDuration);
                    }
                    if (utils.isInDom(panelNodeId)) {
                        panelNode.animate({"height": String(headerHeight)+"px"}, animationDuration+100);
                    }
                    setTimeout(function() {
                        if (utils.isInDom(bodyNodeId)) {
                            bodyNode.style.display = "none";
                            bodyNode.style.height = "0px";
                        }
                        if (utils.isInDom(panelNodeId)) {
                            panelNode.style.height = String(headerHeight)+"px";
                        }
                        //invoke the callback
                        if (utils.isFunction(callback)) {
                            callback(newState);
                        }
                    }, animationDuration);
                    break;
                case "bottom":
                    if (utils.isInDom(panelNodeId)) {
                        console.debug(methodName + "currTop=["+currPanelTop+"] destTop=["+destPanelTop+"]");
                        panelNode.animate({"top": String(destPanelTop)+"px"}, animationDuration);
                        panelNode.animate({"height": String(headerHeight)+"px"}, animationDuration+100);
                    }
                    if (utils.isInDom(bodyNodeId)) {
                        bodyNode.animate({"height": "0px"}, animationDuration+100);
                    }
                    setTimeout(function() {
                        if (utils.isInDom(bodyNodeId)) {
                            bodyNode.style.display = "none";
                            bodyNode.style.height = "0px";
                        }
                        if (utils.isInDom(panelNodeId)) {
                            panelNode.style.height = String(headerHeight)+"px";
                            panelNode.style.top = String(destPanelTop)+"px";
                        }
                        //invoke the callback
                        if (utils.isFunction(callback)) {
                            callback(newState);
                        }
                    }, animationDuration);
                    break;
                case "left":
                    if (utils.isInDom(bodyNodeId)) {
                        bodyNode.animate({"width": "0px"}, animationDuration);
                    }
                    if (utils.isInDom(panelNodeId)) {
                        panelNode.animate({"width": String(headerWidth)+"px"}, animationDuration+100);
                    }
                    setTimeout(function() {
                        if (utils.isInDom(bodyNodeId)) {
                            bodyNode.style.display = "none";
                            bodyNode.style.width = "0px";
                        }
                        if (utils.isInDom(panelNodeId)) {
                            panelNode.style.width = String(headerWidth)+"px";
                        }
                        //invoke the callback
                        if (utils.isFunction(callback)) {
                            callback(newState);
                        }
                    }, animationDuration);
                    break;
                case "right":
                    if (utils.isInDom(panelNodeId)) {
                        console.debug(methodName + "currLeft=["+currPanelLeft+"] destLeft=["+destPanelLeft+"]");
                        panelNode.animate({"left": String(destPanelLeft)+"px"}, animationDuration);
                        panelNode.animate({"width": String(headerWidth)+"px"}, animationDuration+100);
                    }
                    if (utils.isInDom(bodyNodeId)) {
                        bodyNode.animate({"width": "0px"}, animationDuration+100);
                    }
                    setTimeout(function() {
                        if (utils.isInDom(bodyNodeId)) {
                            bodyNode.style.display = "none";
                            bodyNode.style.width = "0px";
                        }
                        if (utils.isInDom(panelNodeId)) {
                            panelNode.style.width = String(headerWidth)+"px";
                            panelNode.style.left = String(destPanelLeft)+"px";
                        }
                        //invoke the callback
                        if (utils.isFunction(callback)) {
                            callback(newState);
                        }
                    }, animationDuration);
                    break;
            }
        }
    }

    function _copyNodeStyleToConfig(nodeId, config) {
        //declare locals
        let realNode = null;
        let styleValue;

        //check for valid values
        if (utils.isEmpty(nodeId)) {
            return;
        }
        if (utils.isString(nodeId) && utils.isInDom(nodeId)) {
            realNode = document.getElementById(nodeId);
        }
        else if (utils.isElementNode(nodeId)) {
            realNode = nodeId;
        }

        //check for a valid node
        if (realNode==null || !utils.isJson(config)) {
            return;
        }

        //get the node's style
        styleValue = realNode.style;

        //check the style
        if (utils.isString(styleValue)) {
            styleValue = domUtils.styleString2StyleJson(styleValue);
        }
        if (!config.hasOwnProperty("style")) {
            config["style"] = {};
        }
        config.style = styleValue;
    }

    function _drag(eventObj) {
        eventObj.dataTransfer.setData("Text", eventObj.target.id);
    }
    
    function _drop(eventObj) {
        var draggedCompId = eventObj.dataTransfer.getData("Text");
        if (utils.isInDom(draggedCompId)) {
            eventObj.target.appendChild(document.getElementById(draggedCompId));
        }
        eventObj.preventDefault();
    }
    
    function _expand(config, callback) {
        //declare locals
        let methodName = "uiCompsUtils._expand(): ";
        let _config = {
            state: "collapsed",
            compId: "",
            compBodyId: "",
            compHeaderId: "",
            headerAlignment: "top",
            buttonId: "",
            buttonIconId: "",
            buttonTextId: "",
            buttonText: "",
            buttonIcon: "",
            animateButton: true,
            buttonAnimationDuration: 1500,
            animationDuration: 1500,
        };
        //merge configuration
        _config = jsonUtils.mergeJson(_config, config);
        let currState = _config.state;
        let panelNodeId = _config.compId;
        let bodyNodeId = _config.compBodyId;
        let buttonIconNodeId = _config.buttonIconId;
        let buttonTextNodeId = _config.buttonTextId;
        let headerAlignment = _config.headerAlignment;
        let newState;
        let panelNode;
        let bodyNode;
        let buttonIconNode;
        let buttonTextNode;
        let destPanelHeight;
        let destPanelWidth;
        let currPanelTop;
        let currPanelLeft;
        let destPanelTop;
        let destPanelLeft;
        let destBodyHeight;
        let destBodyWidth;
        let buttonText = (utils.isEmpty(_config.buttonText) ? "-" : _config.buttonText);
        let buttonIcon = (utils.isEmpty(_config.buttonIcon) ? "" : _config.buttonIcon);
        let newText;
        let newIcon;
        let textStyle;
        let defaultAnimationDurationButton = 1500;
        let animationDurationButton = _config.buttonAnimationDuration;
        let defaultAnimationDuration = 1500;
        let animationDuration = _config.animationDuration;

        //disable mousemove of drag and drop listeners
        _disableDocumentMouseMove();

        //set defaults if necessary
        if (utils.isEmpty(animationDuration)) {
            animationDuration = defaultAnimationDuration;
        }
        if (utils.isEmpty(animationDurationButton)) {
            animationDurationButton = defaultAnimationDurationButton;
        }

        //get a reference to the html nodes
        panelNode = utils.getFromDom(panelNodeId);
        bodyNode = utils.getFromDom(bodyNodeId);
        buttonIconNode = utils.getFromDom(buttonIconNodeId);
        buttonTextNode = utils.getFromDom(buttonTextNodeId);

        //get the height and width of the differenet html nodes
        if (utils.isInDom(bodyNodeId)) {
            destBodyHeight = parseFloat(domUtils.getAttributeValue(bodyNode, dataAttNameBodyHeight));
            destBodyWidth = parseFloat(domUtils.getAttributeValue(bodyNode, dataAttNameBodyWidth));
            bodyNode.style.display = "block";
        }
        if (utils.isInDom(panelNodeId)) {
            destPanelHeight = parseFloat(domUtils.getAttributeValue(panelNode, dataAttNamePanelHeight));
            destPanelWidth = parseFloat(domUtils.getAttributeValue(panelNode, dataAttNamePanelWidth));
            destPanelLeft = parseFloat(domUtils.getAttributeValue(panelNode, dataAttNameLeft));
            destPanelTop = parseFloat(domUtils.getAttributeValue(panelNode, dataAttNameTop));
            currPanelLeft = parseFloat(panelNode.style.left);
            currPanelTop = parseFloat(panelNode.style.top);
        }

        //set the button's new icon
        newIcon = buttonIcon;
        newText = buttonText;
        textStyle = "margin-top: -5px;margin-left: -5px";

        //check for a button icon node
        if (utils.isInDom(buttonIconNodeId)) {
            if (!isNaN(newIcon)) {
                newIcon = "&#" + newIcon + ";";
            }
            if (utils.isTrue(_config.animateButton)) {
                animationUtils.fadeOut(buttonIconNode, animationDurationButton);            
                buttonIconNode.innerHTML = newIcon;
                animationUtils.fadeIn(buttonIconNode, animationDurationButton);
            }
            else {
                buttonIconNode.innerHTML = newIcon;
            }
        }

        //check for a button text node
        if (utils.isInDom(buttonTextNodeId)) {
            if (utils.isTrue(_config.animateButton)) {
                animationUtils.fadeOut(buttonTextNode, animationDurationButton);          
                buttonTextNode.innerHTML = newText;
                domUtils.setStyle(buttonTextNode, textStyle);
                animationUtils.fadeIn(buttonTextNode, animationDurationButton);
            }
            else {
                buttonTextNode.innerHTML = newText;
                domUtils.setStyle(buttonTextNode, textStyle);
            }
        }

        //check the current state
        if (currState=="collapsed") {
            newState = "expanded";

            //perform animation
            switch (headerAlignment) {
                case "top":
                    if (utils.isInDom(bodyNodeId)) {
                        bodyNode.animate({"height": String(destBodyHeight)+"px"}, animationDuration);
                    }
                    if (utils.isInDom(panelNodeId)) {
                        panelNode.animate({"height": String(destPanelHeight)+"px"}, animationDuration);
                    }
                    setTimeout(function() {
                        if (utils.isInDom(bodyNodeId)) {
                            bodyNode.style.height = String(destBodyHeight)+"px";
                        }
                        if (utils.isInDom(panelNodeId)) {
                            panelNode.style.height = String(destPanelHeight)+"px";
                        }
                        //invoke the callback
                        if (utils.isFunction(callback)) {
                            callback(newState);
                        }
                    }, animationDuration);
                    break;
                case "bottom":
                    if (utils.isInDom(bodyNodeId)) {
                        bodyNode.animate({"height": String(destBodyHeight)+"px"}, animationDuration);
                    }
                    if (utils.isInDom(panelNodeId)) {
                        console.debug(methodName + "currPanelTop=["+currPanelTop+"] destPanelTop=["+destPanelTop+"]");
                        panelNode.animate({"top": String(destPanelTop)+"px"}, animationDuration);
                        panelNode.animate({"height": String(destPanelHeight)+"px"}, animationDuration);
                    }
                    setTimeout(function() {
                        if (utils.isInDom(bodyNodeId)) {
                            bodyNode.style.height = String(destBodyHeight)+"px";
                        }
                        if (utils.isInDom(panelNodeId)) {
                            panelNode.style.top = String(destPanelTop)+"px";
                            panelNode.style.height = String(destPanelHeight)+"px";
                        }
                        //invoke the callback
                        if (utils.isFunction(callback)) {
                            callback(newState);
                        }
                    }, animationDuration);
                    break;
                case "left":
                    if (utils.isInDom(panelNodeId)) {
                        panelNode.animate({"width": String(destPanelWidth)+"px"}, animationDuration);
                    }
                    if (utils.isInDom(bodyNodeId)) {
                        bodyNode.animate({"width": String(destBodyWidth)+"px"}, animationDuration);
                    }
                    setTimeout(function() {
                        if (utils.isInDom(panelNodeId)) {
                            panelNode.style.width = String(destPanelWidth)+"px";
                        }
                        if (utils.isInDom(bodyNodeId)) {
                            bodyNode.style.width = String(destBodyWidth)+"px";
                        }
                        //invoke the callback
                        if (utils.isFunction(callback)) {
                            callback(newState);
                        }
                    }, animationDuration);
                    break;
                case "right":
                    if (utils.isInDom(bodyNodeId)) {
                        bodyNode.animate({"width": String(destBodyWidth)+"px"}, animationDuration);
                    }
                    if (utils.isInDom(panelNodeId)) {
                        console.debug(methodName + "currPanelLeft=["+currPanelLeft+"] destPanelLeft=["+destPanelLeft+"]");
                        panelNode.animate({"left": String(destPanelLeft)+"px"}, animationDuration);
                        panelNode.animate({"width": String(destPanelWidth)+"px"}, animationDuration);
                    }
                    setTimeout(function() {
                        if (utils.isInDom(bodyNodeId)) {
                            bodyNode.style.width = String(destBodyWidth)+"px";
                        }
                        if (utils.isInDom(panelNodeId)) {
                            panelNode.style.left = String(destPanelLeft)+"px";
                            panelNode.style.width = String(destPanelWidth)+"px";
                        }
                        //invoke the callback
                        if (utils.isFunction(callback)) {
                            callback(newState);
                        }
                    }, animationDuration);
                    break;
            }
        }
    }

    function _getBaseIconNodeConfig() {
        let config = {
            id: "", "class": "", css: {}, alignment: "left", icon: ""
        };
        return config;
    }

    function _getBaseNodeConfig() {
        let config = {
            id: "", "class": "", css: {}, direction: "ltr",
            icon: {id: "", "class": "", css: {}, alignment: "left", icon: ""},
            text: {id: "", "class": "", css: {}, direction: "ltr", text: ""},
            children: [],
        };
        return config;
    }

    function _getBaseTextNodeConfig() {
        let config = {
            id: "", "class": "", css: {}, direction: "ltr", text: ""
        };
        return config;
    }

    function _getButtonClassDefault() {
        //declare locals
        let retVal = "comboButton";

        //return the method's value
        return retVal;
    }

    function _getConfigAlignment(config) {
        //declare locals
        let defaultValue = "left";
        let retVal = defaultValue;
        
        //chec for valid values
        if (utils.isEmpty(config)) {
            return retVal;
        }

        //get the value from the config
        if (config.hasOwnProperty("alignment")) {
            if (utils.isString(config.alignment)) {
                retVal = config.alignment.toLowerCase();
            }
        }
        else if (config.hasOwnProperty("css")) {
            if (config.css.hasOwnProperty("alignment")) {
                if (utils.isString(config.css.alignment)) {
                    retVal = config.css.alignment.toLowerCase();
                }
            }
        }
        else if (config.hasOwnProperty("style")) {
            if (config.style.hasOwnProperty("alignment")) {
                if (utils.isString(config.style.alignment)) {
                    retVal = config.style.alignment.toLowerCase();
                }
            }
        }

        //check the value
        switch (retVal) {
            case "bottom":
            case "left":
            case "right":
            case "top":
                break
            default:
                retVal = defaultValue;
                break;
        }

        //return the method's value
        return retVal;
    }

    function _getConfigClass(config, defaultValue) {
        //declare locals
        let retVal = jsonUtils.getValue(config, "class", defaultValue);

        //return the method's value
        return retVal;
    }

    function _getConfigDirection(config) {
        //declare locals
        let defaultValue = "ltr";
        let retVal = defaultValue;
        
        //chec for valid values
        if (utils.isEmpty(config)) {
            return retVal;
        }
        
        //get the value from the config
        if (config.hasOwnProperty("direction")) {
            if (utils.isString(config.direction)) {
                retVal = config.direction.toLowerCase();
            }
        }
        else if (config.hasOwnProperty("css")) {
            if (config.css.hasOwnProperty("direction")) {
                if (utils.isString(config.css.direction)) {
                    retVal = config.css.direction.toLowerCase();
                }
            }
        }
        else if (config.hasOwnProperty("style")) {
            if (config.style.hasOwnProperty("direction")) {
                if (utils.isString(config.style.direction)) {
                    retVal = config.style.direction.toLowerCase();
                }
            }
        }

        //check the value
        switch (retVal) {
            case "ltr":
            case "rtl":
                break
            default:
                retVal = defaultValue;
                break;
        }

        //return the method's value
        return retVal;
    }

    this._getConfigUiInputWrapperNodeId = function (uiComp, index) {
        let configPathValueWrapperIdSuffix = "_configPathValueWrapper";
        let configUiId;
        try {
            configUiId = uiComp.getConfigUi().id;
        }
        catch (err) {}
        let retVal = configUiId+configPathValueWrapperIdSuffix+"_wrapper"+index;
        return retVal;
    };

    function _getFloatValue(config) {
        let direction = _getConfigDirection(config);
        let floatValue = (direction=="ltr" ? "left" : "right");
        return floatValue;
    }

    function _getFloatValueReversed(config) {
        let direction = _getConfigDirection(config);
        let floatValue = (direction=="ltr" ? "right" : "left");
        return floatValue;
    }

    function _getRenderTo(config) {
        let node = null;

        if (!utils.isJson(config) || !config.hasOwnProperty("renderTo")) {
            node = document.getElementsByTagName("body")[0];
        }
        else {
            if (utils.isEmpty(config.renderTo) || (utils.isString(config.renderTo) && config.renderTo.toLowerCase()=="body")) {
                node = document.getElementsByTagName("body")[0];
            }
            else {
                if (utils.isInDom(config.renderTo)) {
                    node = document.getElementById(config.renderTo);
                }
            }
        }

        return node;
    }

    function _hasIconNode(config) {
        if (jsonUtils.hasValue(config, "icon")) {
            if (utils.isString(config.icon)) {
                return true;
            }
            else if (utils.isJson(config.icon)) {
                if (jsonUtils.hasValue(config.icon, "icon")) {
                    return true;
                }
            }
        }
        return false;
    }

    function _hasTextNode(config) {
        if (jsonUtils.hasValue(config, "text")) {
            if (utils.isString(config.text)) {
                return true;
            }
            else if (utils.isJson(config.text)) {
                if (jsonUtils.hasValue(config.text, "text")) {
                    return true;
                }
            }
        }
        return false;
    }

    function _removeChildNode(parentId, childId) {
        //declare locals
        let realParentNode;
        let realChildNode;

        if (utils.isEmpty(parentId) || utils.isEmpty(childId)) {
            return;
        }
        if (utils.isString(parentId) && utils.isInDom(parentId)) {
            realParentNode = document.getElementById(parentId);
        }
        else if (utils.isElementNode(parentId)) {
            realParentNode = parentId;
        }
        if (realParentNode!=null) {
            if (utils.isString(childId) && utils.isInDom(childId)) {
                realChildNode = document.getElementById(childId);
            }
            else if (utils.isElementNode(childId)) {
                realChildNode = childId;
            }
            if (realChildNode!=null) {
                try {
                    realParentNode.removeChild(realChildNode);
                }
                catch(err) {}
            }
        }
    }

    function _renderIcon(node, config) {
        //declare locals
        let realNode = null;
        let icon;
        
        //check for valid values
        if (utils.isEmpty(node)) {
            return;
        }
        if (!jsonUtils.hasValue(config, "icon") || !utils.isString(config.icon)) {
            return;
        }
        if (utils.isString(node) && utils.isInDom(node)) {
            realNode = document.getElementById(node);
        }
        else if (utils.isElementNode(node)) {
            realNode = node;
        }
        if (realNode==null) {
            return;
        }

        //render the icon to the given node
        icon = config.icon;
        if (!isNaN(icon)) {
            realNode.innerHTML = "&#" + icon + ";";
        }
        else {
            if (icon.startsWith("data:image") || utils.isValidImageExtension(icon)) {
                realNode.innerHTML = '<img src="' + icon + '" />';
            }
            else {
                if (icon.startsWith("&#")) {
                    if (!icon.endsWith(";")) {
                        icon += ";";
                    }
                }
                realNode.innerHTML = icon;
            }
        }
    }

    function _renderIconNode(config, renderTo) {
        let compConfig = null;
        let childComp;

        if (jsonUtils.hasValue(config, "icon")) {
            if (utils.isString(config.icon)) {
                compConfig = uiCompsUtils.getBaseIconNodeConfig();
                compConfig.icon = config.icon;
                config.icon = compConfig;
            }
            else if (utils.isJson(config.icon)) {
                compConfig = config.icon;
            }
            if (!utils.isEmpty(compConfig)) {
                if (utils.isInDom(renderTo)) {
                    config.icon.renderTo = renderTo;
                }
                else {
                    config.icon.renderTo = config.id;
                }

                //remove the node from the DOM if it exists
                uiCompsUtils.removeChildNode(config.icon.renderTo, config.icon.id);
                config.icon.cssTagId = config.cssTagId;

                //render the node
                childComp = new Icon(config.icon);
                childComp.render();
                config.icon.id = childComp.getId();
            }
        }
    }

    function _renderIconTextNodes(config, renderTo) {
        let hasIcon = _hasIconNode(config);
        let hasText = _hasTextNode(config);
        if (hasText && hasIcon) {
            let iconAlignment = uiCompsUtils.getConfigAlignment(config.icon);
            _updateIconConfig(config);
            _updateTextConfig(config);
            if (iconAlignment=="left" || iconAlignment=="top") {
                _renderIconNode(config, renderTo);
                _renderTextNode(config, renderTo);
            }
            else {
                _renderTextNode(config, renderTo);
                _renderIconNode(config, renderTo);
            }
        }
        else if (hasIcon) {
            _renderIconNode(config, renderTo);
        }
        else if (hasText) {
            _renderTextNode(config, renderTo);
        }
    }

    function _renderTextNode(config, renderTo) {
        let compConfig = null;
        let childComp;

        if (jsonUtils.hasValue(config, "text")) {
            if (utils.isString(config.text)) {
                compConfig = uiCompsUtils.getBaseTextNodeConfig();
                compConfig.text = config.text;
                config.text = compConfig;
            }
            else if (utils.isJson(config.text)) {
                compConfig = config.text;
            }
            if (!utils.isEmpty(compConfig)) {
                if (utils.isInDom(renderTo)) {
                    config.text.renderTo = renderTo;
                }
                else {
                    config.text.renderTo = config.id;
                }

                
                //remove the node from the DOM if it exists
                uiCompsUtils.removeChildNode(config.text.renderTo, config.text.id);
                config.text.cssTagId = config.cssTagId;

                childComp = new Text(config.text);
                childComp.render();
                config.text.id = childComp.getId();
            }
        }
    }

    function _reRender(uiComp, htmlNode, configPropertyPath, units) {
        //declare locals
        let _configPrefix = "_config.";
        let configPrefix = "config.";
        let partsDelimiter = ".";
        let partsDelimiterEsc = "\.";
        let nodeType;
        let configParamValue;
        let arrConfigPath;
        let configPropExpression;
        let config;

        //check for valid values
        if (utils.isEmpty(uiComp)) {
            return;
        }
        if (utils.isEmpty(htmlNode)) {
            return;
        }
        if (!htmlNode.type) {
            return;
        }
        if (!utils.isString(configPropertyPath)) {
            return;
        }
        if (configPropertyPath.startsWith(_configPrefix)) {
            configPropertyPath = configPropertyPath.substring(_configPrefix.length);
        }
        else if (configPropertyPath.startsWith(configPrefix)) {
            configPropertyPath = configPropertyPath.substring(configPrefix.length);
        }
        if (configPropertyPath.indexOf(partsDelimiter)==-1) {
            arrConfigPath = [configPropertyPath];
        }
        else {
            arrConfigPath = configPropertyPath.split(partsDelimiterEsc);
        }

        //check the html node's type
        nodeType = htmlNode.type.toLowerCase()
        switch (nodeType) {
            case "color":
            case "list":
            case "number":
            case "numberwithunits":
            case "numeric":
            case "numericwithunits":
            case "text":
                configParamValue = htmlNode.value;
                if (nodeType=="numberwithunits" || nodeType=="numericwithunits") {
                    configParamValue += units;
                }
                break;
            case "checkbox":
                configParamValue = htmlNode.checked;
                break;
            default:
                break;
        }

        //build a config expression
        config = {};
        configPropExpression = "";
        for (let i=0; i<arrConfigPath.length; i++) {
            configPropExpression += "[\"" + arrConfigPath[i] + "\"]";
        }
        configPropExpression = "config" + configPropExpression + " = " + String(configParamValue);

        //update the configuration
        try {
            config = eval(configPropExpression);
            let parentNode;
            if (utils.isInDom(_config.id)) {
                let elemNode = utils.getFromDom(_config.id);
                parentNode = elemNode.parentNode;
                parentNode.removeChild(elemNode);
            }
            uiComp.setConfig(config);
            _render();
        }
        catch (err) {}
    }

    function _updateIconConfig(config) {
        if (utils.isString(config.icon)) {
            let iconConfig = uiCompsUtils.getBaseIconNodeConfig();
            iconConfig.icon = config.icon;
            config.icon = iconConfig; 
        }
        if (!jsonUtils.hasField(config.icon, "style") || utils.isEmpty(config.icon.style)) {
            config.icon["style"] = {};
        }
        if (utils.isString(config.icon.style)) {
            config.icon.style = domUtils.styleString2StyleJson(config.icon.style);
        }
        let iconAlignment = uiCompsUtils.getConfigAlignment(config.icon);
        if (iconAlignment=="left" || iconAlignment=="right") {
            config.icon["style"]["float"] = "left";
            config.icon["style"]["width"] = "20px";
            config.icon["style"]["padding-top"] = "4px";
        }
        else {
            config.icon["style"]["float"] = "none";
            config.icon["style"]["width"] = "100%";
            config.icon["style"]["padding-top"] = "0px";
        }
    }

    function _updateTextConfig(config) {
        if (utils.isString(config.text)) {
            let textConfig = uiCompsUtils.getBaseTextNodeConfig();
            textConfig.text = config.text;
            config.text = textConfig; 
        }
        if (!jsonUtils.hasField(config.text, "style") || utils.isEmpty(config.text.style)) {
            config.text["style"] = {};
        }
        if (utils.isString(config.text.style)) {
            config.text.style = domUtils.styleString2StyleJson(config.text.style);
        }
        let iconAlignment = uiCompsUtils.getConfigAlignment(config.icon);
        if (iconAlignment=="left" || iconAlignment=="right") {
            config.text["style"]["float"] = "left";
            config.text["style"]["width"] = "calc(100% - 35px)";
            config.text["style"]["padding-top"] = "4px";
        }
        else {
            config.text["style"]["float"] = "none";
            config.text["style"]["width"] = "calc(100% - 0px)";
            config.text["style"]["padding-top"] = "0px";
        }
    }

    this.addDragAndDropListeners = function(node, config) {
        _addDragAndDropListeners(node, config);
    }

    this.collapse = function(config, callback) {
        _collapse(config, callback);
    };

    this.copyNodeStyleToConfig = function(nodeId, config) {
        _copyNodeStyleToConfig(nodeId, config);
    };

    this.createIconNode = function(iconId, icon, iconColor) {
        //declare locals
        let iconNode = null;

        //check for valid values
        if (!utils.isString(iconId)) {
            return null;
        }
        if (!utils.isString(icon)) {
            return null;
        }
        
        //check for a numeric symbol icon
        if (!isNaN(icon)) {
            icon = "&#" + icon;
            icon += ";";
            iconNode = document.createElement("div");
            iconNode.innerHTML = icon;
        }
        else {
            if (icon.startsWith("&#")) {
                if (!icon.endsWith(";")) {
                    icon += ";";
                }
                iconNode = document.createElement("div");
                iconNode.innerHTML = icon;
            }
            else if (icon.startsWith("<svg")) {
                iconNode = document.createElement("div");
                iconNode.innerHTML = icon;
                if (utils.isString(iconColor)) {
                    let pathNode = iconNode.firstChild.getElementsByTagName("path");
                    if (utils.isArray(pathNode)) {
                        pathNode = pathNode[0];
                        pathNode.setAttribute("fill",iconColor);
                    }
                    else {
                        pathNode.setAttribute("fill",iconColor);
                    }
                }
            }
            else if (icon.startsWith("data:image") || utils.isValidImageExtension(icon)) {
                iconNode = document.createElement("img");
                iconNode.setAttribute("src", icon);
            }
            else {
                iconNode = document.createElement("div");
                iconNode.innerHTML = icon;
            }
            }
        iconNode.setAttribute("id", iconId);
        iconNode.setAttribute("class", "icon");

        //return the method's value
        return iconNode;
    };

    this.disableDocumentMouseMove = function() {
        _disableDocumentMouseMove();
    };

    this.expand = function(config, callback) {
        _expand(config, callback);
    };

    this.fixCssSelector = function (cssSelector, defaultValue) {
        //declare locals
        let classesDelimiter = " ";
        let arrItems;
        let strTemp = "";
        let cssSelectorFixed;

        //check for valid values
        if (utils.isEmpty(cssSelector)) {
            cssSelectorFixed = "#" + defaultValue;
        }
        else {
            arrItems = utils.string2array(cssSelector, classesDelimiter);
            for (let i=0; i<arrItems.length; i++) {
                if (i>0) {
                    strTemp += classesDelimiter;
                }
                if (!arrItems[i].startsWith(".")) {
                    arrItems[i] = "." + arrItems[i];
                }
                strTemp += arrItems[i];
            }
            cssSelectorFixed = strTemp;
        }

        //return the method's value
        return cssSelectorFixed;
    };

    this.getBaseIconNodeConfig = function() {
        return _getBaseIconNodeConfig();
    }

    this.getBaseNodeConfig = function() {
        return _getBaseNodeConfig();
    }

    this.getBaseTextNodeConfig = function() {
        return _getBaseTextNodeConfig();
    }

    this.getCollapsibleBodyId = function(panelId) {
        //declare locals
        let elemNode = null;

        //check for valid values
        if (!utils.isInDom(panelId)) {
            return null;
        }

        //get the handle's html node
        try {
            elemNode = utils.getFromDom(panelId).firstChild;
        }
        catch (err) {}

        //check for valid values
        if (elemNode==null) {
            return null;
        }

        //return the method's value
        return elemNode.id;
    }

    this.getConfigAlignment = function(config) {
        return _getConfigAlignment(config);
    }

    this.getConfigClass = function(config, defaultValue) {
        return _getConfigClass(config, defaultValue);
    }

    this.getConfigDirection = function(config) {
        return _getConfigDirection(config);
    }

    this.getConfigUiItem = function (itemValue, items) {
        let fieldName = "configPath";
        let item = null;
        let index = -1;

        //check for valid values
        if (!utils.isString(itemValue) || !utils.isArray(items) || items.length<1) {
            return item;
        }

        //get the item's index in the array
        index = jsonUtils.getItemIndex(items, fieldName, itemValue);

        //check for valid values
        if (index<0 || index>=items.length) {
            return item;
        }

        //set the return value
        item = items[index];

        //return the method's value
        return item;
    };

    this.getFloatValue = function(config) {
        return _getFloatValue(config);
    };

    this.getFloatValueReversed = function(config) {
        return _getFloatValueReversed(config);
    };

    this.getMergedClass = function(defaultClass, realClass) {
        //declare locals
        let currClassName = "";

        //check for valid values
        if (utils.isString(defaultClass) && utils.isString(realClass) && defaultClass.toLowerCase().trim() == realClass.toLowerCase().trim()) {
            currClassName = realClass;
        }
        else {
            currClassName = defaultClass + " " + realClass;
        }
        currClassName = currClassName.trim();

        //return the method's value
        return currClassName;
    };

    this.getMergedCss = function(jsonCss, config, defaultClass, elementId) {
        //declare locals
        let elementClass;
        let retCss = jsonCss;
        let currSelector;

        //check for valid values
        if (!utils.isString(defaultClass) && !utils.isString(elementId)) {
            return null;
        }
        if (utils.isEmpty(defaultClass)) {
            defaultClass = "#" + elementId;
        }
        if (!utils.isArray(retCss)) {
            if (!utils.isJson(retCss)) {
                retCss = [
                    {
                        "cssSelector": defaultClass,
                    },
                ];
            }
            else {
                retCss = [retCss];
            }
        }

        //fix the selectors
        for (let i=0; i<retCss.length; i++) {
            //get the current item
            currSelector = retCss[i]["cssSelector"];
            if (!utils.isString(currSelector)) {
                continue;
            }
            if (currSelector.indexOf(",")==-1) {
                currSelector = [currSelector];
            }
            else {
                currSelector = utils.string2array(currSelector, ",");
            }
            //loop through the array and add a selector char to it
            for (let i=0; i<currSelector.length; i++) {
                if (!currSelector[i].startsWith(".") && !currSelector[i].startsWith("#")) {
                    currSelector[i] = "." + currSelector[i];
                }
            }
            currSelector = utils.array2string(currSelector,",");
            retCss[i]["cssSelector"] = currSelector;
        }

        if (!utils.isJson(config)) {
            return retCss;
        }

        //get the element's class
        elementClass = jsonUtils.getValue(config, "class", defaultClass);
        if (utils.isEmpty(elementClass) && utils.isEmpty(elementId)) {
            return retCss;
        }
        else {
            if (utils.isEmpty(elementClass)) {
                elementClass = ["#" + elementId];
            }
            else {
                if (elementClass.indexOf(" ")==-1) {
                    elementClass = [elementClass];
                }
                else {
                    elementClass = utils.string2array(elementClass, " ");
                }
                //loop through the array and add a selector char to it
                for (let i=0; i<elementClass.length; i++) {
                    if (!elementClass[i].startsWith(".") && !elementClass[i].startsWith("#")) {
                        elementClass[i] = "." + elementClass[i];
                    }
                }
            }
        }

        //check for a css in the configuration
        if (config.hasOwnProperty("css")) {
            if (!utils.isArray(config.css)) {
                config.css = [config.css];
            }

            //calculate the loop size
            let loopSize = elementClass.length;
            if (config.css.length < loopSize) {
                loopSize = config.css.length;
            }

            //add the css configuration to the returned css array
            for (let i=0; i<loopSize; i++) {
                //set the css selector first
                config.css[i]["cssSelector"] = elementClass[i];
                if (retCss.length>i) {
                    for (let field in config.css[i]) {
                        if (config.css[i].hasOwnProperty(field)) {
                            retCss[i][field] = config.css[i][field];
                        }
                    }
                }
                else {
                    retCss.push(config.css[i]);
                }
            }
        }

        //return the method's value
        return retCss;
    };

    this.getRenderTo = function(config) {
        return _getRenderTo(config);
    }

    this.hasIconNode = function(config) {
        return _hasIconNode(config);
    }

    this.hasTextNode = function(config) {
        return _hasTextNode(config);
    }

    this.removeChildNode = function(parentId, childId) {
        _removeChildNode(parentId, childId);
    }

    this.renderConfigUi = function (uiComp, renderTo, configUiItems) {
        //declare locals
        let methodName = "uiCompUtils.renderConfigUi(): ";
        let logMessage;
        let configRowClass = "configOptionRow";
        let configRowLabelClass = "configOptionRowLabel";
        let configRowInputClass = "configOptionRowInput";
        let configPathInputClass = "configPathInput";
        let configInputClass = "configOptionInput";
        let configRowColumnsSeparatorClass = "configRowColumnsSeparator";
        let configRowSeparatorClass = "configRowSeparator";
        let configPathNameWrapperIdSuffix = "_configPathNameWrapper";
        let configPathValueWrapperIdSuffix = "_configPathValueWrapper";
        let dataAttNameItemIndex = "data-itemIndex";
        let containerId = renderTo;
        let configUiItemsEmpty = true;
        let container;
        let configUi = null;
        let configUiId;
        let htmlNode;
        let legendNode;
        let bodyNode;
        let rowNode;
        let rowSeparatorNode;
        let colSeparatorNode;
        let configPathNameInputNode;
        let labelWrapperNode;
        let labelNode;
        let inputWrapperNode;

        //check for valid values
        if (utils.isEmpty(uiComp)) {
            logMessage = "uiComp is empty or null !!";
            console.error(methodName + logMessage);
            return;
        }
        try {
            configUi = uiComp.getConfigUi();
        }
        catch (err) {}
        if (!utils.isJson(configUi)) {
            logMessage = "configUi is NOT a valid json !!";
            console.error(methodName + logMessage);
            return;
        }
        if (!jsonUtils.hasField(configUi, "items")) {
            logMessage = "configUi is missing required field=[items] !!";
            console.error(methodName + logMessage);
            return;
        }
        if (!utils.isArray(configUi.items)) {
            logMessage = "configUi items is NOT a valid array !!";
            console.error(methodName + logMessage);
            return;
        }
        if (configUi.items.length<1) {
            logMessage = "configUi has no items !!";
            console.error(methodName + logMessage);
            return;
        }
        if (utils.isEmpty(containerId) || containerId === "body") {
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
        if (container == null || container == undefined || container == "undefined") {
            logMessage = "container is null !!";
            console.error(methodName + logMessage);
            return;
        }

        //generate and id for the congiUi if necessary
        if (configUi.hasOwnProperty("id") && utils.isString(configUi.id)) {
            configUiId = configUi.id;
        }
        else {
            configUiId = utils.generateId("configUi", "configUi");
            configUi["id"] = configUiId;
            uiComp.setConfigUi(configUi);
        }

        //check the display type
        let displayAsAutocomplete = configUi.displayAsAutocomplete;

        //generate the html nodes
        htmlNode = document.createElement("fieldset");
        htmlNode.setAttribute("id", configUiId);
        if (configUi.hasOwnProperty("style")) {
            htmlNode.setAttribute("style", configUi.style);
        }
        legendNode = document.createElement("legend");
        legendNode.innerHTML = "options";
        bodyNode = document.createElement("div");
        bodyNode.setAttribute("style", "overflow-x: hidden;overflow-y: auto;width: 100%;height: 100%;");

        //render the css
        let cssTagId;
        if (configUi.hasOwnProperty("cssTagId")) {
            cssTagId = configUi.cssTagId;
        }
        if (utils.isEmpty(cssTagId)) {
            cssTagId = "uiConfig";
        }
        let jsonCss = [
            {
                "cssSelector": "."+configRowClass,
                "height": "40px",
                "width": "100%",
            },
            {
                "cssSelector": "."+configRowLabelClass,
                "height": "100%",
                "width": "250px",
                "max-width": "250px",
                "float": "left",
                "display": "inline-block",
                "white-space": "nowrap",
                "text-overflow": "ellipsis",
                "overflow": "hidden",
            },
            {
                "cssSelector": "."+configRowColumnsSeparatorClass,
                "height": "100%",
                "width": "5px",
                "float": "left",
                "display": "inline-block",
            },
            {
                "cssSelector": "."+configRowInputClass,
                "height": "100%",
                "width": "calc(98% - 250px)",
                "float": "left",
                "display": "inline-block",
            },
            {
                "cssSelector": "."+configRowSeparatorClass,
                "height": "5px",
                "width": "100%",
            },
            {
                "cssSelector": "."+configInputClass,
                "height": "30px",
                "font-size": "20px",
            },
            {
                "cssSelector": "."+configPathInputClass,
                "width": "250px",
                "height": "30px",
                "font-size": "20px",
            },
        ];
        html5Utils.renderCss(jsonCss, cssTagId);

        //check the display mode
        if (displayAsAutocomplete) {
            //render a row node
            rowNode = document.createElement("div");
            rowNode.setAttribute("class", configRowClass);

            //render the row's columns
            labelWrapperNode = document.createElement("div");
            labelWrapperNode.setAttribute("id", configUiId+configPathNameWrapperIdSuffix);
            labelWrapperNode.setAttribute("class", configRowLabelClass);

            colSeparatorNode = document.createElement("div");
            colSeparatorNode.setAttribute("class", configRowColumnsSeparatorClass);

            inputWrapperNode = document.createElement("div");
            inputWrapperNode.setAttribute("id", configUiId+configPathValueWrapperIdSuffix);
            inputWrapperNode.setAttribute("class", configRowInputClass);

            //append the current row
            rowNode.appendChild(labelWrapperNode);
            rowNode.appendChild(colSeparatorNode);
            rowNode.appendChild(inputWrapperNode);
            bodyNode.appendChild(rowNode);

            configPathNameInputNode = new Autocomplete({
                cssTagId: cssTagId,
                renderTo: configUiId+configPathNameWrapperIdSuffix,
                style: "width: 500px",
                options: {data: configUi.items, valueFieldName: "configPath", tooltipFieldName: "tooltip", displayFields: "configPath"},
                multiple: false,
                closeOnSelect: false,
                state: "open",
                numOpenItems: 4,
                searchMode: "contains",
                //typeMode: "focusonfirst",
                placeholder: "config ui property",
                onchange: function (value) {
                    let configPathValue = value;
                    let configUiItem = uiCompsUtils.getConfigUiItem(configPathValue, configUi.items);

                    //render the config ui item
                    uiCompsUtils.renderConfigUiItem(uiComp, configUiItem, inputWrapperNode, configPathValue);
                },
            });
            //configPathNameInputNode.config.id
            configPathNameInputNode.render();
        }
        else {
            if (utils.isArray(configUiItems)) {
                configUiItemsEmpty = false;
            }
            else {
                configUiItems = configUi.items;
            }
            //loop through the items
            for (let i=0; i<configUiItems.length; i++) {
                //get the current item
                let configUiItem = configUiItems[i];
                let configPathValue = configUiItem.configPath;
                let itemIndex = i;
                if (configUiItemsEmpty==false) {
                    itemIndex = jsonUtils.getItemIndex(configUi.items, "configPath", configPathValue);
                    if (itemIndex != -1) {
                        let htmlNodeId = uiCompsUtils._getConfigUiInputWrapperNodeId(uiComp, itemIndex);
                        let htmlNode = utils.getFromDom(htmlNodeId);
                        uiCompsUtils.renderConfigUiItem(uiComp, configUiItem, htmlNode, configPathValue);
                        continue;
                    }
                }
                let currItemInputIdSuffix = "_input";
                let inputWrapperNodeId = uiCompsUtils._getConfigUiInputWrapperNodeId(uiComp, itemIndex);

                //render a row separator if necessary
                if (i>0) {
                    rowSeparatorNode = document.createElement("div");
                    rowSeparatorNode.setAttribute("class", configRowSeparatorClass);
                    bodyNode.appendChild(rowSeparatorNode);
                }

                //render a row node
                rowNode = document.createElement("div");
                rowNode.setAttribute("class", configRowClass);

                //render the row's columns
                labelWrapperNode = document.createElement("div");
                labelWrapperNode.setAttribute("id", configUiId+configPathNameWrapperIdSuffix+"_wrapper"+i);
                labelWrapperNode.setAttribute("class", configRowLabelClass);
                labelWrapperNode.setAttribute("title", configUiItem.label);
                if (utils.isEmpty(configPathValue)) {
                    labelNode = document.createElement("input");
                    labelNode.setAttribute("type", "text");
                    labelNode.setAttribute("class", configPathInputClass);
                    labelNode.setAttribute(dataAttNameItemIndex, String(itemIndex));
                    labelNode.addEventListener("change", function () {
                        //get the input wrapper node
                        let index = this.getAttribute(dataAttNameItemIndex);
                        let htmlNodeId = uiCompsUtils._getConfigUiInputWrapperNodeId(uiComp, index);
                        let htmlNode = utils.getFromDom(htmlNodeId);
                        let currValue = this.value;
                        uiCompsUtils.renderConfigUiItem(uiComp, null, htmlNode, currValue);
                    });
                }
                else {
                    labelNode = document.createElement("label");
                    labelNode.setAttribute("for", inputWrapperNodeId+currItemInputIdSuffix);
                    labelNode.innerHTML = configUiItem.label;
                }
                labelWrapperNode.appendChild(labelNode);

                colSeparatorNode = document.createElement("div");
                colSeparatorNode.setAttribute("class", configRowColumnsSeparatorClass);

                inputWrapperNode = document.createElement("div");
                inputWrapperNode.setAttribute("id", inputWrapperNodeId);
                inputWrapperNode.setAttribute("class", configRowInputClass);

                //append the current row
                rowNode.appendChild(labelWrapperNode);
                rowNode.appendChild(colSeparatorNode);
                rowNode.appendChild(inputWrapperNode);
                bodyNode.appendChild(rowNode);

                //render the config ui item
                uiCompsUtils.renderConfigUiItem(uiComp, configUiItem, inputWrapperNode, configPathValue);
            }
        }

        if (configUiItemsEmpty==true) {
            //append all children
            htmlNode.appendChild(legendNode);
            htmlNode.appendChild(bodyNode);

            //render the ui
            if (utils.isInDom(configUi.id)) {
                let elemNode = utils.getFromDom(configUi.id);
                let parentNode = elemNode.parentNode;
                parentNode.removeChild(elemNode);
            }
            container.appendChild(htmlNode);
        }
    };

    this.renderConfigUiItem = function (uiComp, configUiItem, parentNode, configPathValue) {
        //declare locals
        let methodName = "uiCompUtils.renderConfigUiItem(): ";
        let logMessage;
        let requiredFieldsNames = ["type"];
        let currItemType;
        let currItemInputIdSuffix = "_input";
        let currItemInputId;
        let currItemEventName;
        let configInputClass = "configOptionInput";
        let configPathValueInputNode;
        let uiCompConfig;
        let uiCompConfigValue;

        //validate the current item
        if (utils.isEmpty(uiComp)) {
            logMessage = "uiComp is empty or null !!";
            console.error(methodName + logMessage);
            return;
        }
        if (!utils.isJson(configUiItem) && !utils.isString(configPathValue)) {
            logMessage = "configUiItem is NOT a valid json and configPathValue is empty or null !!";
            console.error(methodName + logMessage);
            return;
        }
        if (utils.isJson(configUiItem)) {
            for (let j=0; j<requiredFieldsNames.length; j++) {
                if (!jsonUtils.hasField(configUiItem, requiredFieldsNames[j])) {
                    logMessage = "configUiItem is missing required property=[" + requiredFieldsNames[j] + "] !!";
                    console.error(methodName + logMessage);
                    return;
                }
                if (utils.isEmpty(jsonUtils.getValue(configUiItem, requiredFieldsNames[j]))) {
                    logMessage = "configUiItem has property=[" + requiredFieldsNames[j] + "] with value empty or null !!";
                    console.error(methodName + logMessage);
                    return;
                }
            }
        }
        if (utils.isEmpty(parentNode)) {
            logMessage = "parentNode is empty or null !!";
            console.error(methodName + logMessage);
            return;
        }

        if (utils.isEmpty(configUiItem)) {
            configUiItem = {};
            configUiItem["configPath"] = configPathValue;
            currItemType = "text";
            if (configPathValue.toLowerCase().endsWith("background-color") || configPathValue.toLowerCase().endsWith("color")) {
                let propName;
                if (configPathValue.toLowerCase().endsWith("background-color")) {
                    propName = "background color";
                }
                else {
                    propName = "color";
                }
                currItemType = "color";
                configUiItem["tooltip"] = "select the "+propName+" to apply to the component's selected attribute";
                configUiItem["defaultValue"] = "#000000";
                configUiItem["event"] = "oninput";
            }
            if (configPathValue.toLowerCase().endsWith("font-size")) {
                currItemType = "numberwithunits";
                configUiItem["tooltip"] = "select the font size to apply to the component's selected attribute";
                configUiItem["defaultValue"] = 16;
                configUiItem["units"] = "px";
                configUiItem["min"] = 5;
                configUiItem["max"] = 50;
                configUiItem["event"] = "oninput";
            }
            if (configPathValue.toLowerCase().endsWith("font-family")) {
                currItemType = "list";
                configUiItem["tooltip"] = "select the font family to apply to the component's selected attribute";
                configUiItem["defaultValue"] = "Arial, sans-serif";
                configUiItem["list"] = "fontFamilyList";
            }
            if (configPathValue.toLowerCase().endsWith("icon.text") || configPathValue.toLowerCase().endsWith("icon")) {
                currItemType = "list";
                configUiItem["tooltip"] = "select the icon to apply to the component's selected attribute";
                configUiItem["list"] = "symbols";
            }
            configUiItem["type"] = currItemType;
            uiCompConfig = uiComp.getConfig();
            uiCompConfigValue = jsonUtils.expression2Json(uiCompConfig, configPathValue, null);
        }
        else {
            if (!utils.isEmpty(configUiItem.defaultValue)) {
                uiCompConfigValue = configUiItem.defaultValue;
            }
        }
        if (utils.isEmpty(uiCompConfigValue)) {
            uiCompConfigValue = "";
        }
        currItemType = configUiItem.type.toLowerCase();
        currItemInputId = parentNode.id + currItemInputIdSuffix;
        console.debug(methodName + "uiCompConfigValue=["+  JSON.stringify(uiCompConfigValue) +"] configPathValue=["+configPathValue+"]");

        //generate the input node
        switch (currItemType) {
            case "color":
            case "number":
            case "numberwithunits":
            case "numeric":
            case "numericwithunits":
            case "text":
            case "checkbox":
                configPathValueInputNode = document.createElement("input");
                if (currItemType=="numeric" || currItemType=="numberwithunits" || currItemType=="numericwithunits") {
                    configPathValueInputNode.setAttribute("type", "number");
                }
                else {
                    configPathValueInputNode.setAttribute("type", currItemType);
                }
                if (currItemType=="checkbox") {
                    if (uiCompConfigValue===true || uiCompConfigValue==="true") {
                        configPathValueInputNode.setAttribute("checked", "checked");
                    }
                }
                else {
                    configPathValueInputNode.setAttribute("value", uiCompConfigValue);
                }
                break;
            case "list":
            case "select":
                let optionItems;
                if (configUiItem.hasOwnProperty("list") && utils.isString(configUiItem.list)) {
                    configPathValueInputNode = document.createElement("select");
                    configPathValueInputNode.setAttribute("size", "1");
                    optionItems = selectUtils.generateOptionsHtml(configUiItem.list, uiCompConfigValue);
                    configPathValueInputNode.innerHTML = optionItems;
                }
                else if (configUiItem.hasOwnProperty("options") && utils.isArray(configUiItem.options)) {
                    configPathValueInputNode = document.createElement("select");
                    configPathValueInputNode.setAttribute("size", "1");
                    optionItems = selectUtils.generateOptionsHtml(configUiItem.options, uiCompConfigValue);
                    configPathValueInputNode.innerHTML = optionItems;
                }
                configPathValueInputNode.setAttribute("value", uiCompConfigValue);
                break;
            default:
                break;
        }
        if (configPathValueInputNode==null) {
            return;
        }

        //set the input node's attributes
        html5Utils.setNodeAttributes(configPathValueInputNode, configPathValueInputNode.tagName, configUiItem, null);

        configPathValueInputNode.setAttribute("id", currItemInputId);
        if (currItemType!="checkbox" && currItemType!="color") {
            configPathValueInputNode.setAttribute("class", configInputClass);
        }
        if (utils.isString(configUiItem.tooltip)) {
            configPathValueInputNode.setAttribute("title", configUiItem.tooltip);
        }
        if (currItemType=="numberwithunits" || currItemType=="numericwithunits" || currItemType=="number" || currItemType=="numeric") {
            configPathValueInputNode.setAttribute("style", "width: 100px;min-width: 50px;");
        }
        if (currItemType=="text" || currItemType=="list" || currItemType=="select") {
            configPathValueInputNode.setAttribute("style", "width: 100%;");
        }
        if (!configUiItem.hasOwnProperty("event") || utils.isEmpty(configUiItem.event)) {
            currItemEventName = "onchange";
        }
        else {
            currItemEventName = configUiItem.event;
        }
        if (currItemEventName.toLowerCase().startsWith("on")) {
            currItemEventName = currItemEventName.substring(2);
        }

        //add an event listener to the input node
        configPathValueInputNode.addEventListener(currItemEventName, function () {
            //declare locals
            let eventName = currItemEventName;
            let methodName = "on"+currItemEventName+"(): ";
            let logMessage;
            let realType = configUiItem.type;
            let currItemUnits = configUiItem.units;
            let currItemEval = configUiItem.invokeEval;
            let inputValue;

            //check the component's type
            if (this.type=="checkbox") {
                inputValue = this.checked;
            }
            else {
                inputValue = this.value;
            }
            if (utils.isString(realType)) {
                realType = realType.toLowerCase();
                if (realType=="numberwithunits" || realType=="numericwithunits") {
                    if (utils.isEmpty(currItemUnits)) {
                        currItemUnits = "px";
                    }
                    inputValue = this.value + currItemUnits;
                }
            }
            if (currItemEval===true || currItemEval==="true") {
                inputValue = eval(inputValue);
            }

            //create a small config json
            let currConfigPathValue = configUiItem.configPath;
            if (utils.isEmpty(currConfigPathValue)) {
                logMessage = "currConfigPathValue is empty or null !!";
                console.error(methodName + logMessage);
                return;
            }
            if (currConfigPathValue.toLowerCase().endsWith("style")) {
                inputValue = domUtils.styleString2StyleJson(inputValue);
            }
            if (currConfigPathValue.toLowerCase().endsWith("icon") && !isNaN(inputValue)) {
                inputValue = "&#" + inputValue;
            }

            //console.debug(this.id + ".on" + eventName + "(): inputValue=["+ String(inputValue) +"] currConfigPathValue=["+currConfigPathValue+"]");
            let newConfig = jsonUtils.expression2Json(null, currConfigPathValue, inputValue);
            //console.debug(this.id + ".on" + eventName + "(): newConfig=["+ JSON.stringify(newConfig)+"]");

            //open a try block
            try {
                //get the component's current config
                let currConfig = uiComp.getConfig();

                //check if the component exists
                if (currConfig!=null && currConfig.hasOwnProperty("id") && utils.isInDom(currConfig.id)) {
                    let elemNode = utils.getFromDom(currConfig.id);
                    let currParentNode = elemNode.parentNode;
                    currParentNode.removeChild(elemNode);
                }

                //re-render the component
                uiComp.setConfig(newConfig);
                uiComp.render();
            }
            catch (err) {}
        });

        parentNode.innerHTML = "";
        parentNode.appendChild(configPathValueInputNode);
    };

    this.renderIcon = function(node, config) {
        _renderIcon(node, config);
    }

    this.renderIconNode = function(config, renderTo) {
        _renderIconNode(config, renderTo);
    }

    this.renderIconTextNodes = function(config, renderTo) {
        _renderIconTextNodes(config, renderTo);
    }

    this.renderTextNode = function(config, renderTo) {
        _renderTextNode(config, renderTo);
    }

    this.setCollapsibleHandlePosition = function(panelId, headerId) {
        //declare locals
        let units = "px";
        let handleNode = null;
        let alignment;
        let handlePosition;
        let posLeft;
        let posTop;
        let headerHeight;
        let panelHeight;
        let handleHeight;
        let panelWidth;
        let handleWidth;

        //check for valid values
        if (!utils.isInDom(panelId)) {
            return;
        }

        //get the handle's html node
        try {
            handleNode = utils.getFromDom(panelId).firstChild.nextSibling;
        }
        catch (err) {}

        //check for valid values
        if (handleNode==null) {
            return;
        }

        //create a new config object
        let config = (new CollapsiblePanel({})).getConfig();

        //get attributes values
        if (utils.isEmpty(headerId) || !utils.isInDom(headerId)) {
            headerHeight = 0;
        }
        else {
            headerHeight = parseInt(domUtils.getHeight(headerId));
        }
        alignment = domUtils.getAttributeValue(panelId, config.dataAttributes.alignment);
        handlePosition = domUtils.getAttributeValue(panelId, config.dataAttributes.handlePosition);
        panelHeight = parseInt(domUtils.getAttributeValue(panelId, config.dataAttributes.panelHeight));
        handleHeight = parseInt(domUtils.getHeight(handleNode.id));
        //handleHeight = parseInt(domUtils.getAttributeValue(panelId, config.dataAttributes.handleHeight));
        panelWidth = parseInt(domUtils.getAttributeValue(panelId, config.dataAttributes.panelWidth));
        handleWidth = parseInt(domUtils.getWidth(handleNode.id));
        //handleWidth = parseInt(domUtils.getAttributeValue(panelId, config.dataAttributes.handleWidth));

        //set the style's position value
        handleNode.style.position = "absolute";

        //check the position
        switch (handlePosition) {
            case "left":
                handleNode.style.left = "0" + units;
                break
            case "right":
                handleNode.style.right = "0" + units;
                break
            case "center":
                if (alignment=="left" || alignment=="right") {
                    posTop = (panelHeight-handleHeight)/2;
                    if (!utils.isInvalidNumber(posTop)) {
                        handleNode.style.top = posTop + units;
                    }
                }
                else if (alignment=="bottom" || alignment=="top") {
                    posLeft = (panelWidth-handleWidth)/2;
                    if (!utils.isInvalidNumber(posLeft)) {
                        handleNode.style.left = posLeft + units;
                    }
                }
                break
            case "bottom":
                handleNode.style.top = ((panelHeight+headerHeight)-handleHeight) + units;
                break
            case "top":
                handleNode.style.top = headerHeight + units;
                break

        }
    };

    this.show = function(config) {
        //declare locals
        let validNames = ["display","show","render"];
        let fieldName;
        let fieldValue;
        let retVal = false;

        //check for valid values
        if (!utils.isJson(config)) {
            return false;
        }

        //get the real field names
        fieldName = jsonUtils.getRealName(config, validNames);

        //check for valid values
        if (utils.isEmpty(fieldName)) {
            return false;
        }

        //check the field's value
        fieldValue = config[fieldName];
        if (utils.isString(fieldValue)) {
            switch (fieldValue.toLowerCase()) {
                case "block":
                case "true":
                    retVal = true;
                    break;
                case "none":
                case "false":
                    retVal = false;
                    break;
                default:
                    retVal = false;
                    break;
            }
            return retVal;
        }
        else if (utils.isBool(fieldValue)) {
            return fieldValue;
        }
        else {
            return false;
        }
    }

    this.updateIconConfig = function(config) {
        _updateIconConfig(config);
    }

    this.updateTextConfig = function(config) {
        _updateTextConfig(config);
    }
};