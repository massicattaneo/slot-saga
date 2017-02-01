/*/
 ///////////////////////////////////////////////////////////////////////////
 Module: controller
 Created Date: 14 July 2016
 Author: mcattaneo

 //////////////////////////////////////////////////////////////////////////////
 //       Copyright (c) 2016.
 //////////////////////////////////////////////////////////////////////////////
 */

function controller() {

    return function (config) {
        var obj = {};
        var n = cjs.Need();
        var useBus = config.useBus === undefined ? true : config.useBus;

        obj.change = function () {
            if (useBus) {
                cjs.bus.UI.fire('button-click', {type: config.type, id: config.id});
            }
            n.resolve(config.type);
        };

        obj.promise = function () {
            return n;
        };
        
        return obj;
    }

}