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

        obj.tap = function (e) {
            e.stopPropagation();
            e.preventDefault();
            cjs.bus.AUDIO.fire('button-click');
            if (config.useBus) {
                var param = {type: config.type};
                cjs.bus.UI.fire('button-tap', param);
            }
            setTimeout(function () {
                n.resolve(config.type);
            }, 200);
            obj.get().fire('button-tap', param);
        };

        obj.promise = function () {
            return n;
        };

        return obj;
    }

}