/*/
 ///////////////////////////////////////////////////////////////////////////
 Module: controller
 Created Date: 02 January 2017
 Author: mcattaneo

 //////////////////////////////////////////////////////////////////////////////
 //       Copyright (c) 2016.
 //////////////////////////////////////////////////////////////////////////////
 */
function controller() {

    return function (config) {
        var obj = {};

        obj.update = function (value) {
            var currency = new cjs.Currency(value);
            obj.get('value').setValue(currency.format('i.ffs'))
        };

        return obj;
    }

}