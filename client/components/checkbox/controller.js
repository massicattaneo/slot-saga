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

        var isChecked = true;

        obj.tap =function () {
            obj.get('button').get('button')
                .removeStyle('fa-volume-up')
                .removeStyle('fa-volume-off')
                .addStyle(!isChecked ? 'fa-volume-up' : 'fa-volume-off');
            cjs.bus.UI.fire('audio-toggle', {checked: isChecked = !isChecked});
        };

        return obj;
    }

}