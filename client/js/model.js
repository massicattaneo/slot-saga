/*/
 ///////////////////////////////////////////////////////////////////////////
 Module: model
 Created Date: 05 January 2017
 Author: mcattaneo

 //////////////////////////////////////////////////////////////////////////////
 //       Copyright (c) 2016.
 //////////////////////////////////////////////////////////////////////////////
 */

function model() {

    return function (config) {
        var obj = {};
        var activeSlot = '';
        var wheels = config.wheelsSettings;

        obj.spin = function() {
            return cjs.Need().resolve(getResults())
        };

        obj.draw = function (type) {
            activeSlot = type;
            return {wheelsConfig: wheels[type], type: type};
        };

        function extractNumber(start, end) {
            return Math.floor(Math.random() * end) + start;
        }

        function getResults() {
            return [1,2,3,4,5].map(function () {
                return extractNumber(0,10);
            });
        }

        return obj;
    }
}