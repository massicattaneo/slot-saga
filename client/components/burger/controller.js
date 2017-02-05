/*/
 ///////////////////////////////////////////////////////////////////////////
 Module: controller
 Created Date: 04 July 2016
 Author: mcattaneo

 //////////////////////////////////////////////////////////////////////////////
 //       Copyright (c) 2016.
 //////////////////////////////////////////////////////////////////////////////
 */

function controller() {

    return function (config) {
        var obj = {};

        var isClosed = false;

        obj.tap = function (p) {
            cjs.bus.AUDIO.fire('button-click');
            cjs.bus.UI.fire('burger-tap', {open: isClosed = !isClosed});
        };

        obj.toggle = function (p) {
            isClosed = p.open;
            p.open ? obj.get().addStyle('open') : obj.get().removeStyle('open')
        };

        return obj;
    }

}