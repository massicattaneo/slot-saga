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
        var n = cjs.Need();
        var useBus = config.useBus === undefined ? true : config.useBus;

        obj.tap = function () {
            if (useBus) {
                cjs.bus.UI.fire('button-tap', {type: config.type, id: config.id});
            }
            n.resolve(config.type);
        };

        obj.promise = function () {
            return n;
        };
        
        return obj;
    }

}