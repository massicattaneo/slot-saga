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

        obj.change = function () {
            cjs.bus.UI.fire('bet-change', {index: obj.get('select').getValue()});
        };

        obj.setOptions = function (options) {
            var select = obj.get('select');
            options.forEach(function (o,i) {
                var currency = new cjs.Currency(o);
                select.appendChild(cjs.Node('<option value="'+i+'">'+ currency.format('i.ff')+'</option>'));
            })
        };

        return obj;
    }

}