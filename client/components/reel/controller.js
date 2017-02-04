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

        obj.spin = function () {
            obj.items.items.forEach(function (o, i) {
                setTimeout(o.rotate, (config.rotateTime/12) * i)
            });
        };

        return obj;
    }

}