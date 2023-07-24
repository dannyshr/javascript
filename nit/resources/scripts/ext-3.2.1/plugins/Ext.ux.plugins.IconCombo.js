// Create user extensions namespace (Ext.ux)
Ext.ns('Ext.ux.plugins');

/**
  * Ext.ux.plugins.IconCombo Extension Class
  * @author  Danny Shraga
  * @date 05/07/2010 04:40
  * @version 1.0
  * @class Ext.ux.plugins.IconCombo
  * @extends Ext.form.ComboBox
  * @constructor
  * @param {Object} config Configuration options
  */
Ext.ux.plugins.IconCombo = function(config) {
    // call parent constructor
    Ext.ux.plugins.IconCombo.superclass.constructor.call(this, config);

    //change the parent's template
    this.tpl = config.tpl ||
    	'<tpl for="."><div class="x-combo-list-item x-icon-combo-item {' 
        + this.iconClsField 
        + '}">{' 
        + this.displayField 
        + '}</div></tpl>'
    ;
 
    this.on({
        render:{scope:this, fn:function() {
            var wrap = this.el.up('div.x-form-field-wrap');
            this.wrap.applyStyles({position:'relative'});
            this.el.addClass('x-icon-combo-input');
            this.flag = Ext.DomHelper.append(wrap, {
                tag: 'div', style:'position:absolute'
            });
        }}
    });
    
    
} // end of Ext.ux.plugins.IconCombo constructor
 
// extend
Ext.ux.plugins.IconCombo = Ext.extend(Ext.form.ComboBox, {
    setIconCls: function() {
        var rec = this.store.query(this.valueField, this.getValue()).itemAt(0);
        if(rec) {
            this.flag.className = 'x-icon-combo-icon ' + rec.get(this.iconClsField);
        }
    },
 
    setValue: function(value) {
        Ext.ux.plugins.IconCombo.superclass.setValue.call(this, value);
        this.setIconCls();
    }
 
}); // end of extend
 
// end of file
