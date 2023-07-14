
function initPortlets() {
	$("td .column").sortable({
		connectWith: "td .column" 
		,handle: ".portlet-header" 
		,scroll: false
		,tolerance: "pointer" 
		,placeholder: "ui-sortable-placeholder" 
		,cancel: ".inactivePortlet"
	});

	//add round corners
	$(".portlet")
		.find(".portlet-content")
			.addClass("ui-corner-bl ui-corner-br")
			.end();
			
	$(".portlet-header .portletHeaderButtonCollapse").mouseover(function() {
		var button = $(this);
		var isDisabled = button.attr("buttonCollapseDisabled").toLowerCase();
		if (isDisabled=="false") {
			var currStyleClass = button[0].className;
			var styleClass = button.attr("buttonCollapseStyleClassHover");
			if (currStyleClass=="portletHeaderButtonExpand" || currStyleClass=="portletHeaderButtonExpandHover") {
				styleClass = "portletHeaderButtonExpandHover";
			}
			button[0].className = styleClass;
		}
	});

	$(".portlet-header .portletHeaderButtonCollapse").mouseout(function() {
		var button = $(this);
		var isDisabled = button.attr("buttonCollapseDisabled").toLowerCase();
		if (isDisabled=="false") {
			var currStyleClass = button[0].className;
			var styleClass = button.attr("buttonCollapseStyleClass");
			if (currStyleClass=="portletHeaderButtonExpand" || currStyleClass=="portletHeaderButtonExpandHover") {
				styleClass = "portletHeaderButtonExpand";
			}
			button[0].className = styleClass;
		}
	});

	$(".portlet-header .portletHeaderButtonClose").mouseover(function() {
		var button = $(this);
		var isDisabled = button.attr("buttonCloseDisabled").toLowerCase();
		if (isDisabled=="false") {
			var styleClass = button.attr("buttonCloseStyleClassHover");
			button[0].className = styleClass;
		}
	});

	$(".portlet-header .portletHeaderButtonClose").mouseout(function() {
		var button = $(this);
		var isDisabled = button.attr("buttonCloseDisabled").toLowerCase();
		if (isDisabled=="false") {
			var styleClass = button.attr("buttonCloseStyleClass");
			button[0].className = styleClass;
		}
	});

	$(".portlet-header .portletHeaderButtonCollapse").click(function() {
		var button = $(this);
		var compParent = $(this).parents(".portlet:first");
		var comp = $(this).parents(".portlet:first").find(".portlet-content");
		var currState = compParent.attr("state").toLowerCase();
		//button[0].blur();
		var styleClass = button.attr("buttonCollapseStyleClass");
		var styleClassEx = "portletHeaderButtonExpand";

		if (currState=="collapsed") {
			compParent.attr("state","expanded");
			comp.slideDown(1000);
			button[0].className = styleClass;
		}
		else {
			compParent.attr("state","collapsed");
			comp.slideUp(1000);
			button[0].className = styleClassEx;
		}
	});

	$(".portlet-header .portletHeaderButtonClose").click(function() {
		var button = $(this);
		var compParent = $(this).parents(".portlet:first");
		var portletId = compParent.attr("id");
		var currState = compParent.attr("state").toLowerCase();
		var cbComp = $(".cbPortlet[portlet='"+portletId+"']")[0];
		if (cbComp!=null) {
			cbComp.checked = !cbComp.checked;
		}
		//button[0].blur();
		if (currState!="closed") {
			compParent.attr("state","closed");
			compParent.hide(1000);
		}
	});

	//$(".column").disableSelection();
}
