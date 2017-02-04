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

        obj.rotate = function () {
            obj.runAnimation('rotate', {time: 1000, times: 'infinite'});
        };
        
        return obj;
    }

}