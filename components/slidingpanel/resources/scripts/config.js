$(document).ready(function() {
	//declare locals
	var ATT_NAME_HANDLER_ID = "panelHandlerId";
	var compId1 = "slidingPanel1";
	var cmbHandlerPositionsId1 = "cmbHandlerPositions1";
	var cmbStatesId1 = "cmbStates1";
	var cmbPositionsId1 = "cmbPositions1";
	var cmbHandlerAlignmentsId1 = "cmbHandlerAlignments1";
	var cmbOpenEffectsId1 = "cmbOpenEffects1";
	var cmbCloseEffectsId1 = "cmbCloseEffects1";
	var slidingPanel = new SlidingPanel(compId1);
	var interfaceCompId = "interfaceDiv";
	var interfaceComp = null;
	var interfaceCompLeft = null;
	var interfaceCompTop = null;
	
	//initialize teh coponent
	slidingPanel.initPanel();
	
	//attache event handlers
	$('#'+cmbHandlerPositionsId1).change(function() {
		var _newValue=$('#'+cmbHandlerPositionsId1).val();
		slidingPanel.resetPanelHandlerPosition(_newValue);
	});
	
	$('#'+cmbStatesId1).change(function() {
		var _newValue=$('#'+cmbStatesId1).val();
		slidingPanel.resetPanelState(_newValue);
	});
	
	$('#'+cmbPositionsId1).change(function() {
		var _newValue=$('#'+cmbPositionsId1).val();
		slidingPanel.resetPanelPosition(_newValue);
	});
	
	$('#'+cmbHandlerAlignmentsId1).change(function() {
		var _newValue=$('#'+cmbHandlerAlignmentsId1).val();
		slidingPanel.resetPanelHandlerAlignment(_newValue);
	});
	
	$('#'+cmbOpenEffectsId1).change(function() {
		var _newValue=$('#'+cmbOpenEffectsId1).val();
		slidingPanel.resetPanelEffectOpen(_newValue);
	});
	
	$('#'+cmbCloseEffectsId1).change(function() {
		var _newValue=$('#'+cmbCloseEffectsId1).val();
		slidingPanel.resetPanelEffectClose(_newValue);
	});
	
	//set the interface component's position
	interfaceComp = $("#"+interfaceCompId);
	interfaceCompLeft = ((screen.availWidth/2) - (interfaceComp[0].clientWidth/2));
	interfaceCompTop = 160;
	interfaceComp.animate({"left":interfaceCompLeft+"px","top":interfaceCompTop+"px"},1000)
});
