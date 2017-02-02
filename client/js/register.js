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

    var buttonC = imports('components/button/controller.js');
    var buttonT = imports('components/button/template.html');
    var buttonS = imports('components/button/style.scss');

    var burgerC = imports('components/burger/controller.js');
    var burgerT = imports('components/burger/template.html');
    var burgerS = imports('components/burger/style.scss');

    return function (config) {

        cjs.Component.registerStyleFunction('fromPixel', function (value) {
            return eval(value)+'px';
        });

        /** BUTTON **/
        cjs.Component.register({
            name: 'button',
            controller: buttonC,
            template: buttonT,
            style: buttonS,
            config: config
        });

        /** BURGER **/
        cjs.Component.register({
            name: 'burger',
            controller: burgerC,
            template: burgerT,
            style: burgerS,
            config: config
        });

    }

}