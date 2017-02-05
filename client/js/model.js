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

    return function () {
        var obj = {};

        obj.spin = function() {
            return cjs.Need().resolve(getResults())
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