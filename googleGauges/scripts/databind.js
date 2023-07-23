// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext */
/**
 * Complex Data Binding Example by Saki
 *
 * @author    Ing. Jozef Sakáloš
 * @copyright (c) 2009, by Ing. Jozef Sakáloš
 * @date      12. February 2009
 * @version   $Id: databind.js 136 2009-02-26 09:53:42Z jozo $
 *
 * @license databind.js is licensed under the terms of the Open Source
 * LGPL 3.0 license. Commercial use is permitted to the extent that the 
 * code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 * 
 * License details: http://www.gnu.org/licenses/lgpl.html
 */
 
Ext.BLANK_IMAGE_URL = 'ext/resources/images/default/s.gif';

Ext.ns('Example');

// grid
Example.Grid = Ext.extend(Ext.grid.EditorGridPanel, {
	initComponent:function() {
		var config = {
			store:new Ext.data.SimpleStore({
				 id:0
				,fields:[
					 {name:'firstName'}
					,{name:'lastName'}
				]
				,data:[
					 ['Joe', 'Doe']
					,['John', 'Black']
					,['Sue', 'Brown']
					,['Carin', 'White']
				]
			})
//			,selModel:new Ext.grid.RowSelectionModel()
			,columns:[{
				 header:'First Name'
				,dataIndex:'firstName'
				,sortable:true
				,width:70
				,editor:new Ext.form.TextField()
			},{
				 header:'Last Name'
				,dataIndex:'lastName'
				,sortable:true
				,width:100
				,editor:new Ext.form.TextField()
			}]
			,tbar:[{
				 text:'Add Record'
				,iconCls:'icon-plus'
				,scope:this
				,handler:function() {
					var s = this.store;
					var r = new (s.recordType)({firstName:'', lastName:''});
					s.add(r);
					this.startEditing(s.indexOf(r), 0);
				}
			},{
				 text:'Unselect'
				,scope:this
				,iconCls:'icon-undo'
				,handler:function() {
					this.getSelectionModel().clearSelections();
				}
			}]
			,viewConfig:{forceFit:true}
		}; // eo config object
		// apply config
        Ext.apply(this, Ext.apply(this.initialConfig, config));

		// call parent
		Example.Grid.superclass.initComponent.apply(this, arguments);
	} // eo function initComponent
}); // eo extend
Ext.reg('examplegrid', Example.Grid);

Example.ShowPanel = Ext.extend(Ext.Panel, {
	tpl:new Ext.XTemplate(
		 '<table style="margin:20px;font-size:13px;font-family:sans-serif">'
		+'<tr><td><i>First Name:</i></td><td><b>{firstName}</b></td></tr>'
		+'<tr><td><i>Last Name:</i></td><td><b>{lastName}</b></td></tr>'
		+'</table>'
	)
	,updateBound:function(record) {
		var data = record && record.data ? record.data : {};
		this.tpl.overwrite(this.body, data);
	}
	,initComponent:function() {

		var config = {
			 afterEdit:this.updateBound
			,afterReject:this.updateBound
			,onBind:function(record) {
				this.boundRecord = record;
				this.updateBound(record);
			}
			,onUnbind:function(record) {
				this.boundRecord = null;
				this.updateBound();
			}
		}; // eo config object

		// apply config
        Ext.apply(this, Ext.apply(this.initialConfig, config));

		// call parent
		Example.ShowPanel.superclass.initComponent.apply(this, arguments);

	} // eo function initComponent
}); // eo extend
Ext.reg('exampleshowpanel', Example.ShowPanel);
 
Example.Form = Ext.extend(Ext.form.FormPanel, {

	initComponent:function() {
		var config = {
			 border:false
			,frame:true
			,defaultType:'textfield'
			,defaults:{anchor:'-20'}
			,items:[{
				 name:'firstName'
				,fieldLabel:'First Name'
			},{
				 name:'lastName'
				,fieldLabel:'Last Name'
			}]
			,onBind:function(record) {
				this.boundRecord = record;
				this.updateBound(record);
			}
			,onUnbind:function(record) {
				this.boundRecord = null;
				this.updateBound();
			}
			,afterEdit:this.updateBound
			,afterReject:this.updateBound
			,buttonAlign:'right'
			,buttons:[{
				 scope:this
				,text:'Reject'
				,iconCls:'icon-undo'
				,disabled:true
				,handler:function() {
					if(this.boundRecord) {
						this.boundRecord.reject();
						this.enableButtons();
					}
				}
			},{
				 scope:this
				,text:'Commit'
				,iconCls:'icon-ok'
				,disabled:true
				,handler:function() {
					if(this.boundRecord) {
						this.boundRecord.commit();
						this.enableButtons();
					}
				}
			}]
		}; // eo config object

		// apply config
        Ext.apply(this, Ext.apply(this.initialConfig, config));

		// call parent
		Example.Form.superclass.initComponent.apply(this, arguments);

		this.items.each(function(f) {
			f.on({
				 scope:this
				,change:function(field) {
					if(this.boundRecord) {
						this.boundRecord.set(field.name, field.getValue());	
					}
				}
			});
		}, this);

	} // eo funtion initComponent

	,updateBound:function(record) {
		this.form.loadRecord(record ? record : {data:{firstName:'', lastName:''}});
		this.enableButtons();
	}
	,enableButtons:function() {
		var enable = this.boundRecord && this.boundRecord.dirty;
		this.buttons[0].setDisabled(!enable);
		this.buttons[1].setDisabled(!enable);
	}

}); // eo extend
Ext.reg('exampleform', Example.Form);

// application main entry point
Ext.onReady(function() {
 
    var win = new Ext.Window({
         title: Ext.fly('page-title').dom.innerHTML
		,id:'win'
        ,width:640
        ,height:480
		,border:false
		,closable:false
		,layout:'border'
		,items:[{
			 xtype:'examplegrid'
			,id:'examplegrid'
			,region:'west'
			,title:'Editor Grid'
			,width:300
			,split:true
			,listeners:{
				render:function() {
					this.getSelectionModel().on({
						// selectionchange is fired too often for us, so buffer it for 10ms
						selectionchange:{buffer:10, fn:function(sm, selection) {

							// get record from either Cell of Row SelectionModel
							var record = selection && selection.record ? selection.record : null;
							if(!record && sm && sm.getSelected) {
								record = sm.getSelected();
							}

							// don't bind same record twice
							if(record && (this.boundRecord !== record)) {
//								console.log('bind', record);
								Ext.BindMgr.unbind(this.boundRecord);
								Ext.BindMgr.bind(record, ['examplepanel1', 'examplepanel2', 'exampleform']);
								this.boundRecord = record;
							}
							
							// unbind
							else if(!record) {
//								console.log('unbind');
								Ext.BindMgr.unbind(this.boundRecord);
								this.boundRecord = null;
							}
						}}
					})
				}
			}
		},{
			 layout:'border'
			,region:'center'
			,border:false
			,items:[{
				 xtype:'exampleshowpanel'
				,id:'examplepanel1'
				,region:'north'
				,title:'Show Panel 1'
				,height:140
				,split:true
			},{
				 xtype:'exampleshowpanel'
				,id:'examplepanel2'
				,region:'center'
				,title:'Show Panel 2'
			},{
				 xtype:'exampleform'
				,id:'exampleform'
				,border:false
				,region:'south'
				,title:'Form'
				,split:true
				,height:170
			}]
		}]

    });
	win.show();
 
}); // eo function onReady
 
// eof
