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

        var canPress = true;

        obj.tap = function (e) {
            e.stopPropagation();
            e.preventDefault();
            if (canPress) {
                cjs.bus.AUDIO.fire('button-click');
                canPress = false;
                obj.runAnimation('press', {time: 200, item: 'button'}).done(function () {
                    canPress = true;
                    if (config.useBus) {
                        var param = {type: config.type};
                        cjs.bus.UI.fire('button-tap', param);
                    }
                    obj.get().fire('button-tap', param);
                });
            }
        };

        return obj;
    }

}