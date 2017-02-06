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

    var checkboxC = imports('components/checkbox/controller.js');
    var checkboxT = imports('components/checkbox/template.html');
    var checkboxS = imports('components/checkbox/style.scss');

    var reelC = imports('components/reel/controller.js');
    var reelT = imports('components/reel/template.html');
    var reelS = imports('components/reel/style.scss');

    var balanceC = imports('components/balance/controller.js');
    var balanceT = imports('components/balance/template.html');
    var balanceS = imports('components/balance/style.scss');

    var dropdownC = imports('components/dropdown/controller.js');
    var dropdownT = imports('components/dropdown/template.html');
    var dropdownS = imports('components/dropdown/style.scss');

    var symbolC = imports('components/symbol/controller.js');
    var symbolT = imports('components/symbol/template.html');
    var symbolS = imports('components/symbol/style.scss');

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

        /** CHECKBOX **/
        cjs.Component.register({
            name: 'checkbox',
            controller: checkboxC,
            template: checkboxT,
            style: checkboxS,
            config: config
        });

        /** REEL **/
        cjs.Component.register({
            name: 'reel',
            controller: reelC,
            template: reelT,
            style: reelS,
            config: config
        });

        /** BALANCE **/
        cjs.Component.register({
            name: 'balance',
            controller: balanceC,
            template: balanceT,
            style: balanceS,
            config: config
        });

        /** DROPDOWN **/
        cjs.Component.register({
            name: 'dropdown',
            controller: dropdownC,
            template: dropdownT,
            style: dropdownS,
            config: config
        });

        /** SYMBOL **/
        cjs.Component.register({
            name: 'symbol',
            controller: symbolC,
            template: symbolT,
            style: symbolS,
            config: config
        });

    }

}