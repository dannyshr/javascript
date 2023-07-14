
function navOnClick(element) {
	//check for nulls
	if (element!=null) {
		var attValue = element.getAttribute("ref");
		var id = attValue.substr(attValue.indexOf('#') + 1);
		pgShow(id);
	}
	return false;
}

function pgShow(id) {
	var c, s, h, el = xGetElementById;
	var contentsPanelId = "contents";
	var statusPanelId = "statusBar";
	var statusPanelObj = el(statusPanelId);
	var contentsPanelObj = el(contentsPanelId);
	var message = null;
	
	xIterate('contents', 1, id,
		function(e, d) {
			xMoveTo(e, 1000, 0);
			e.style.display = 'none';
		}
	);
	c = el(id);
	c.style.display = 'block';
	c.style.height = 'auto';
	s = el('menu');
	//s.style.height = 'auto';
	h = Math.max(xHeight(contentsPanelObj), xHeight(c));
	message = "id: "+id+"\nh: " + h + "\ns: " + xHeight(s) + "\nc: " + xHeight(c);
	if (statusPanelObj!=null) {
		//statusPanelObj.innerHTML = message;
	}
	xHeight('mainApp', h);
	//xHeight(s, h);
	xHeight(c, h);
	xAniLine(c, 0, 0, 1000, 1);
}

/*
  Iterate over all elements with the same idPrefix and a sequential,
  numeric suffix beginning with start. fn is called for each element
  and passed the element and data.
*/
function xIterate(idPrefix, start, data, fn)
{
	var i = start;
	var e = xGetElementById(idPrefix + i);
	while (e) {
	    fn(e, data);
	    e = xGetElementById(idPrefix + (++i));
	}
}
