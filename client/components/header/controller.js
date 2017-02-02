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

    var template = imports('components/header/template.html');
    var style = imports('components/header/style.scss');

    return function (config) {
        
        var c = cjs.Component({
            template: template,
            style: style,
            config: config
        });

        return c;

    }

};
