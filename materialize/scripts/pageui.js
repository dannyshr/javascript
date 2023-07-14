
(function(){
	PageUi=function(config) {
		//declare class members
		this.modelsfile = config.modelsfile;
		this.modelname = config.modelname;
		this.theme = config.theme;
		this.renderto = config.renderto;
		this.models = [];
		this.uiEvent = "UiEvent";
		this.toastDisplayLength = 2000;
		this.modalAttributesMode = null;
		
		this.getModelNameComponentsTypes=function() {
			return "materialize_components";
		}
		
		this.getModalIdPleaseWait=function() {
			return "pw_modal";
		}
		
		this.getModalIdAttributes=function() {
			return "modal_component_attributes";
		}
		
		this.getTextIdModelName=function() {
			return "txt_modelname";
		}
		
		this.getListIdModels=function() {
			return "cmb_models";
		}
		
		this.getListIdComponentsTypes=function() {
			return "cmb_components_types";
		}
		
		this.getListIdComponents=function() {
			return "cmb_components";
		}
		
		this.getButtonIdModelsEdit=function() {
			return "btn_edit_model";
		}
		
		this.getButtonIdModelsDelete=function() {
			return "btn_del_model";
		}
		
		this.getButtonIdComponentAdd=function() {
			return "btn_add_component";
		}
		
		this.getButtonIdComponentEdit=function() {
			return "btn_edit_component";
		}
		
		this.getButtonIdComponentDelete=function() {
			return "btn_del_component";
		}
		
		this.load=function() {
			//declare locals
			var loadEventFailure = "LoadModelsFailed";
			var loadEventSuccess = "LoadModelsSuccess";
			var pwConfig = {"modelname":this.modelname,"type":"preloader","id":this.getModalIdPleaseWait(),"text":"Please wait...","theme":this.theme,"displayType":"spinner","classes":[]};
			var loadConfig = {"caller":this,"file":this.modelsfile,"preloaderid":this.getModalIdPleaseWait()};
			var loadEventsHandler = this.afterload;
			var uiEventsHandler = this.uiEventsHandler;
			
			//render the please wait component
	    	M.AutoInit();
			Jul.renderPleasewait(pwConfig);
			
			//initialize the UI
			Jul.init();
			
			//register to events
			Jul.getEventsManager().register(loadEventFailure,loadEventsHandler);
			Jul.getEventsManager().register(loadEventSuccess,loadEventsHandler);
			Jul.getEventsManager().register(this.uiEvent,uiEventsHandler);
			
			//load the models file
			Jul.loadModels(loadConfig);
		};
		
		this.afterload=function(eventData) {
			//declare locals
			var me = eventData.caller;

			//check for a response
			if (Jul.isEmpty(eventData.response)) {
				M.toast({"html": eventData.message,"displayLength":me.toastDisplayLength});
				return;
			}
			
			//save the response
			me.models = eventData.response;
			
			//render the UI
			Jul.renderModelByName(me.models,me.modelname,me.renderto,me.theme,me);
	    	
			//update the theme
			me.updateTheme(me.theme);
			
			//initialize the UI
			Jul.init();
		};
		
		this.addModel=function(me,event) {
			//declare locals
			var textId = me.getTextIdModelName();
			var selectId = me.getListIdModels();
			var value = Jul.getDomValue(textId);
			var evnetData = null;
			
			//check for a value
			if (!Jul.isString(value)) {
				M.toast({"html": 'Please input a model name first !!',"displayLength":me.toastDisplayLength});
				return;
			}
			
			//continue with the event
			evnetData = {"caller":me,"eventActions":[
				{ "eventAction":"AddSourceValueToTargetList","eventSourceId":textId,"eventTargetId":selectId,"eventMessage":"Model " + value + " was added successflly" }
			]};
			Jul.eventsManager.publish(me.uiEvent,evnetData);
		};
		
		this.deleteModel=function(me,event) {
			//declare locals
			var selectId = me.getListIdModels();
			var value = Jul.getDomValue(selectId);
			var evnetData = null;
			
			//check for a value
			if (!Jul.isString(value)) {
				M.toast({"html": 'Please select a model first !!',"displayLength":me.toastDisplayLength});
				return;
			}
			
			//continue with the event
			evnetData = {"caller":me,"eventActions":[
				{ "eventAction":"DeleteValueFromTargetList","eventSourceId":selectId,"eventTargetId":selectId,"eventMessage":"Model " + value + " was deleted successflly" }
				,{ "eventAction":"ToggleButtonsByListValue","eventSourceId":selectId,"buttons":[me.getButtonIdModelsEdit(),me.getButtonIdModelsDelete()] }
			]};
			Jul.eventsManager.publish(me.uiEvent,evnetData);
		};
		
		this.slideSidebar=function(event) {
			Jul.slide('side_pannel','left','2s');
		};
		
		this.collapseSidebar=function(me,event) {
			Jul.collapse('side_pannel','bottom','2',event.target);
		};
		
		this.uiEventsHandler=function(eventData) {
			//declare locals
			var me = eventData.caller;
			var item = null;
			var eventAction = null;
			var value = null;
			var json = null;
			var buttons = null;

			//check for a response
			if (Jul.isArray(eventData.eventActions)) {
				//loop through the actions
				for (var i=0;i<eventData.eventActions.length;i++) {
					//get the current item
					item = eventData.eventActions[i];
					
					//get the item's action
					eventAction = item.eventAction.toLowerCase();
					switch(eventAction) {
						case "addsourcevaluetotargetvalue":
							value = Jul.getDomValue(item.eventSourceId);
							Jul.getFromDom(item.eventTargetId).value = value;
							break;
						case "addsourcevaluetotargetlist":
							value = Jul.getDomValue(item.eventSourceId);
							json = {"label":value,"value":value};
							Jul.setListOption(item.eventTargetId,json);
							break;
						case "deletevaluefromtargetlist":
							value = Jul.getDomValue(item.eventTargetId);
							Jul.removeListOption(item.eventTargetId,value);
							break;
						case "togglebuttonsbylistvalue":
							buttons = item.buttons;
							me.toggleSelectButtonsState(item.eventSourceId,buttons);
							break;
					}
					
					//display the event's message
					if (Jul.isString(item.eventMessage)) {
						M.toast({"html": item.eventMessage,"displayLength":me.toastDisplayLength});
					}
				}
				
				//initialize the UI
				Jul.init();
			}
		};
		
		this.cmbModelsOnChange=function(me) {
			me.cmbModelsChange();
		};
		
		this.cmbModelsChange=function() {
			//declare locals
			var selectId = null;
			var buttons = null;
			
			//set values
			selectId = this.getListIdModels();
			buttons = [this.getButtonIdModelsEdit(),this.getButtonIdModelsDelete()];
			this.toggleSelectButtonsState(selectId,buttons);
		};
		
		this.cmbCompTypesOnChange=function(me) {
			me.cmbCompTypesChange();
		};
		
		this.cmbCompTypesChange=function() {
			//declare locals
			var selectId = null;
			var buttons = null;
			
			//set values
			selectId = this.getListIdComponentsTypes();
			buttons = [this.getButtonIdComponentAdd()];
			this.toggleSelectButtonsState(selectId,buttons);
		};
		
		this.cmbCompsOnChange=function(me) {
			me.cmbCompsChange();
		};
		
		this.cmbCompsChange=function() {
			//declare locals
			var selectId = null;
			var buttons = null;
			
			//set values
			selectId = this.getListIdComponents();
			buttons = [this.getButtonIdComponentEdit(),this.getButtonIdComponentDelete()];
			this.toggleSelectButtonsState(selectId,buttons);
		};
		
		this.toggleSelectButtonsState=function(selectId,buttons) {
			//declare locals
			var selectValue = Jul.getDomValue(selectId);
			var attValue = "disabled";
			var item = null;
			
			//check for valid DOM elements
			if (Jul.isInDom(selectId)) {
				//set an array if necessary
				if (!Jul.isArray(buttons) && Jul.isString(buttons)) {
					buttons = new Array(buttons);
				}
				
				//get the value from the select
				selectValue = Jul.getDomValue(selectId);
				
				//loop through the array
				for (var i=0;i<buttons.length;i++) {
					//get the current item
					item = buttons[i];
					
					//check for valid values
					if (Jul.isString(selectValue)) {
						Jul.removeClass(item,attValue);
					}
					else {
						Jul.setClass(item,attValue);
					}
				}
			}
		};
		
		this.renderAttsModalTypes=function(me) {
			var mode = "create";
			me.modalAttributesMode = mode;
			me.renderAttsModal();
		};
		
		this.renderAttsModalComps=function(me) {
			var mode = "update";
			me.modalAttributesMode = mode;
			me.renderAttsModal();
		};
		
		this.renderAttsModal=function() {
			//declare locals
			var modelname = this.getModelNameComponentsTypes();
			var modelKeyProp = Jul.getModelKey();
			var compKeyProp = Jul.getMaterializeComponentKey();
			var modalid = this.getModalIdAttributes();
			var renderto = modalid + Jul.getModalContentSuffix();
			var selectTypesId = this.getListIdComponentsTypes();
			var selectCompsId = this.getListIdComponents();
			var selectTypesValue = Jul.getDomValue(selectTypesId);
			var selectCompsValue = Jul.getDomValue(selectCompsId);
			var selectValue = null;
			var model = null;
			var comp = null;
			var mode = null;
			
			//check for valid DOM nodes
			if (!Jul.isInDom(modalid) || !Jul.isInDom(renderto)) {
				M.toast({"html": 'modalid or renderto are NOT in the DOM !!',"displayLength":this.toastDisplayLength});
				return;
			}
			if (!Jul.isString(selectTypesValue) && !Jul.isString(selectCompsValue)) {
				M.toast({"html": 'Please select a component first !!',"displayLength":this.toastDisplayLength});
				return;
			}
			
			//get the modal's work mode
			mode = this.modalAttributesMode;
			if (!Jul.isString(mode)) {
				M.toast({"html": 'mode is empty or invalid !!',"displayLength":this.toastDisplayLength});
				return;
			}
			
			//get the component's details from the list
			if (mode=="update") {
				selectValue = selectCompsValue;
				modelname = this.modelname; 
				compKeyProp = Jul.getComponentKey();
			}
			else if (mode=="create") {
				selectValue = selectTypesValue;
			}
			
			//get the model by its name
			model = Jul.getModel(modelname,this.models,modelKeyProp);
			
			//get the component
			comp = Jul.getComponent(model,selectValue,compKeyProp);
			
			//render the component's attributes as a table
			Jul.renderAttributesTable(this.models,comp,mode,renderto,modalid,this.theme);
			
			//initialize the UI
			Jul.init();
			
			//show the modal
			Jul.setModalHeader(modalid,selectValue + " Attributes");
			Jul.openModal(modalid);
		};
		
		this.renderComp=function(me) {
			//declare locals
			var modelname = me.getModelNameComponentsTypes();
			var modelKeyProp = Jul.getModelKey();
			var compKeyProp = Jul.getMaterializeComponentKey();
			var modalid = me.getModalIdAttributes();
			var renderto = modalid + Jul.getModalContentSuffix();
			var selectTypesId = me.getListIdComponentsTypes();
			var selectCompsId = me.getListIdComponents();
			var selectTypesValue = Jul.getDomValue(selectTypesId);
			var selectCompsValue = Jul.getDomValue(selectCompsId);
			var selectValue = null;
			var model = null;
			var comp = null;
			var json = null;
			var mode =  null;
			
			//check for valid values
			if (!Jul.isString(selectTypesValue) && !Jul.isString(selectCompsValue)) {
				M.toast({"html": 'Please select a component first !!',"displayLength":this.toastDisplayLength});
				return;
			}
			
			//get the modal's work mode
			mode = me.modalAttributesMode;
			if (!Jul.isString(mode)) {
				M.toast({"html": 'mode is empty or invalid !!',"displayLength":this.toastDisplayLength});
				return;
			}
			
			//get the component's details from the list
			if (mode=="update") {
				selectValue = selectCompsValue;
				modelname = me.modelname; 
				compKeyProp = Jul.getComponentKey();
			}
			else if (mode=="create") {
				selectValue = selectTypesValue;
			}
			
			//get the model by its name
			model = Jul.getModel(modelname,me.models,modelKeyProp);
			
			//get the component
			comp = Jul.getComponent(model,selectValue,compKeyProp);
			comp.modelname = modelname;
			
			//render the component
			json = Jul.attributesTable2ui(me.models,model,comp,mode);
			
			//add the component's id to the list
			me.updateModelComponents(json);
			
			//initialize the UI
			Jul.init();
			
			//hide the modal
			Jul.closeModal(modalid);
		};
		
		this.updateModelComponents=function(component) {
			//declare locals
			var models = this.models;
			var modelname = this.modelname;
			var listid = this.getListIdComponents();
			var option = null;
			
			//check for valid values
			if (!Jul.isJson(component)) {
				return;
			}
			
			//check for an old id
			if (Jul.isString(component.oldid)) {
				if (component.oldid!==component.id) {
					//remove previous item by its old id
					Jul.removeListOption(listid,component.oldid);
					//update the model's components' render to attribute
					Jul.updateModelComponents(models,modelname,"renderto",component.oldid,component.id);
				}
			}
			
			//add the component to the model
			Jul.setComp(models,modelname,component);
			
			//create a new option
			option = {"label":component.id,"value":component.id};
			
			//render the component as a new option
			Jul.setListOption(listid,option);
			this.cmbCompsChange();
		};
		
		this.deleteComp=function(me) {
			//declare locals
			var models = me.models;
			var modelname = me.modelname;
			var model = null;
			var selectId = me.getListIdComponents();
			var selectValue = Jul.getDomValue(selectId);
			var children = null;
			var confMessage = null;
			var conf = false;
			var node = null;
			var parent = null;
			
			//check for valid values
			if (!Jul.isString(selectValue)) {
				alert("Please select a component first !!");
				return;
			}
			
			//check if the DOM node exists
			if (Jul.isInDom(selectValue)) {
				children = Jul.getComponentChildrenIds(models,modelname,selectValue);
				children = Jul.array2string(children);
				confMessage = 'All child components will be deleted as well!! \n';
				if (Jul.isString(children)) {
					confMessage += '[' + children + '] \n';
				}
				confMessage += 'Are you sure you want to remove this component ?';
				conf = confirm(confMessage);
				if (conf===true) {
					node = Jul.getFromDom(selectValue);
					parent = node.parentNode;
					parent.removeChild(node);
					
					//remove the component from the model
					Jul.removeComp(models,modelname,selectValue);
					
					//remove all components which are rendered to it
					Jul.removeComponentChildren(models,modelname,selectValue);
					
					//remove the option from the list
					Jul.removeListOption(selectId,selectValue);
					Jul.getFromDom(selectId).value = "";
					me.cmbCompsChange();
					
					//initialize the UI
					Jul.init();
				}
			}
		};
		
		this.saveModel=function(me) {
			//declare locals
			alert("in saveModel()...");
		};
		
		this.updateTheme=function(newTheme) {
			//declare locals
			var nodes = ["top_pannel"];
			var themeConfig = {"oldTheme":this.theme,"newTheme":newTheme,"nodes":nodes};
			
			//update the theme
			Jul.updateTheme(themeConfig);
			
			//save the new value
			this.theme = newTheme;
		};
		
	};
}());

