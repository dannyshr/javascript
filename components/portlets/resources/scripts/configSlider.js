
function initSlidingMenu() {
	var width = $("#menu1").width();
	var left = null;
	if (isNaN(width)) {
		left = (screen.availWidth/2) + "px";
	}
	else {
		left = (screen.availWidth/2) - (width/2) + "px";
	}
	//alert("width: "+width+"\nleft: "+left);
	$("#menu1").animate({"left":left},500)
	
	$("#menuHandlerImage").click(function() {
		var img = $(this)[0];
		var compBody = $("#menu1_ContentsDiv");
		var state = compBody.attr("state").toLowerCase();
		var srcCollapsed = "resources/images/expand.png";
		var srcExpanded = "resources/images/collapse.png";
		
		if (state=="collapsed") {
			compBody.attr("state","expanded");
			compBody.show(1000);
			img.src = srcExpanded;
		}
		else if (state=="expanded") {
			compBody.attr("state","collapsed");
			compBody.hide(1000);
			img.src = srcCollapsed;
		}
	});
	
	$("a.linkButton").click(function() {
		var portlet = $(this).attr("portlet");
		var comp = $("#"+portlet);
		var currState = null;
		var cbComp = $(this).parents(".slidingMenuItem:first").find(".cbPortlet")[0];
		if (cbComp!=null) {
			//alert("cbComp.checked:"+cbComp.checked);
			cbComp.checked=!cbComp.checked;
		}
		//check for nulls
		if (comp!=null) {
			currState = comp.attr("state").toLowerCase();
			if (currState=="closed") {
				comp.attr("state","expanded");
				comp.show(1000);
			}
			else {
				comp.attr("state","closed");
				comp.hide(1000);
			}
		}
	});
	
	$("input.cbPortlet").click(function() {
		var portlet = $(this).attr("portlet");
		var comp = $("#"+portlet);
		var currState = null;
		
		//check for nulls
		if (comp!=null) {
			currState = comp.attr("state").toLowerCase();
			if (currState=="closed") {
				comp.attr("state","expanded");
				comp.show(1000);
			}
			else {
				comp.attr("state","closed");
				comp.hide(1000);
			}
		}
	});
	
	$("img.buttonImage").mouseover(function() {
		var button = $(this);
		
		//check for nulls
		if (button!=null) {
			button[0].className = "buttonImageHover";
		}
	});
	
	$("img.buttonImage").mouseout(function() {
		var button = $(this);
		
		//check for nulls
		if (button!=null) {
			button[0].className = "buttonImage";
		}
	});
	
	$("img.navButtonNext").click(function() {
		var compId = "menu1_slidingMenu";
		var comp = $("#"+compId)[0];
		//var buttonImg = $("img.buttonImage")[0];
		//var imgWidth = buttonImg.style.width;
		var imgWidth = 50;
		
		//check for nulls
		if (comp!=null) {
			comp.scrollLeft += imgWidth;
		}
	});
	
	$("img.navButtonPrev").click(function() {
		var compId = "menu1_slidingMenu";
		var comp = $("#"+compId)[0];
		//var buttonImg = $("img.buttonImage")[0];
		//var imgWidth = buttonImg.style.width;
		var imgWidth = 50;
		
		//check for nulls
		if (comp!=null) {
			comp.scrollLeft -= imgWidth;
		}
	});

}
