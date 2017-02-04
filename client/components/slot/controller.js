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

    var template = imports('components/slot/template.html');
    var style = imports('components/slot/style.scss');

    return function (config) {
        
        var obj = cjs.Component({
            template: template,
            style: style,
            config: config
        });

        obj.spin = function () {
            obj.items.items.forEach(function (o) {
                o.spin();
            });
        };

        return obj;

    }

};
