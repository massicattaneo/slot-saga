/*/
 ///////////////////////////////////////////////////////////////////////////
 Module: controller
 Created Date: 04 July 2016
 Author: mcattaneo

 //////////////////////////////////////////////////////////////////////////////
 //       Copyright (c) 2016.
 //////////////////////////////////////////////////////////////////////////////
 */

function register(imports) {

    var buttonController = imports('components/button/controller.js');
    var buttonTemplate = imports('components/button/template.html');
    var buttonStyle = imports('components/button/style.scss');

    return function (config) {

        /** BUTTON **/
        cjs.Component.register({
            name: 'button',
            controller: buttonController,
            template: buttonTemplate,
            style: buttonStyle,
            config: config
        });

    }

}