/*/
 ///////////////////////////////////////////////////////////////////////////
 Module: controller
 Created Date: 02 January 2017
 Author: mcattaneo

 //////////////////////////////////////////////////////////////////////////////
 //       Copyright (c) 2016.
 //////////////////////////////////////////////////////////////////////////////
 */

function controller(imports) {

    var template = imports('components/footer/template.html');
    var style = imports('components/footer/style.scss');

    return function (config) {
        
        var obj = cjs.Component({
            template: template,
            style: style,
            config: config
        });

        obj.updateBalance = function (value) {
            obj.get('balance').update(value)
        };
        
        obj.setBets = function (options) {
            obj.get('dropdown').setOptions(options)    
        };

        return obj;

    }

}
