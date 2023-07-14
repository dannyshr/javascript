$(document).ready(
	function()
	{
		// Toggle Single Portlet
		$("button.portletHeaderButtonCollapse").click(function() {
			var button = $(this);
			var isDisabled = button.attr("buttonCollapseDisabled").toLowerCase();
			if (isDisabled=="false") {
				var comp = $(this).parent("div").parent("div").parent("div").next("div");
				var state = comp.attr("state");
				if (state==null || state=='') {
					state = "expanded";
				}
				if (state.toLowerCase()=="expanded") {
					//comp.slideUp(1000);
					comp.attr("state","collapsed");
					comp.hide(1000);
				}
				else {
					comp.attr("state","expanded");
					comp.slideDown(1000);
				}
				
				return false;
			}
		});
		
		$("button.portletHeaderButtonCollapse").mouseover(function() {
			var button = $(this);
			var isDisabled = button.attr("buttonCollapseDisabled").toLowerCase();
			if (isDisabled=="false") {
				var styleClass = button.attr("buttonCollapseStyleClassHover");
				button[0].className = styleClass;
			}
		});
		
		$("button.portletHeaderButtonCollapse").mouseout(function() {
			var button = $(this);
			var isDisabled = button.attr("buttonCollapseDisabled").toLowerCase();
			if (isDisabled=="false") {
				var styleClass = button.attr("buttonCollapseStyleClass");
				button[0].className = styleClass;
			}
		});
		
		$("button.portletHeaderButtonClose").click(function() {
			var button = $(this);
			var isDisabled = button.attr("buttonCloseDisabled").toLowerCase();
			if (isDisabled=="false") {
				var comp = $(this).parent("div").parent("div").parent("div").parent("div");
				comp.hide(1000);
				return false;
			}
		});
		
		$("button.portletHeaderButtonClose").mouseover(function() {
			var button = $(this);
			var isDisabled = button.attr("buttonCloseDisabled").toLowerCase();
			if (isDisabled=="false") {
				var styleClass = button.attr("buttonCloseStyleClassHover");
				button[0].className = styleClass;
			}
		});
		
		$("button.portletHeaderButtonClose").mouseout(function() {
			var button = $(this);
			var isDisabled = button.attr("buttonCloseDisabled").toLowerCase();
			if (isDisabled=="false") {
				var styleClass = button.attr("buttonCloseStyleClass");
				button[0].className = styleClass;
			}
		});
		
		// Controls Drag + Drop
		$('#portlets td').Sortable(
			{
				accept: '_portlet',
				helperclass: 'sort_placeholder',
				opacity: 0.7,
				tolerance: 'intersect'
			}
		);
	}
);