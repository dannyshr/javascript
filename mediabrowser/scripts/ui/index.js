
jQuery(document).ready(function(){
	var opts = {
		//horizontal Dock with images expanding downwards in the vertical axis...
		align: "middle"
		//set the maximum minor axis (vertical) image dimension to 48px
		,size: 80
		,duration: 1000
		//add labels..
		,labels: "bc"
		//swap the GIF extension for PNG extension for the larger image...
		,source: function(i){ return this.src.replace(/gif$/,'png'); }
	};
	
	jQuery("#menu").jqDock(opts);
});

function goTo(url) {
	window.location.replace(url+".html");
}
