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
        var balance = 1000;
        var bets = [1,5,10,25,100];
        var activeBetIndex = 0;

        obj.spin = function() {
            balance -= bets[activeBetIndex];
            return cjs.Need().resolve(getResults())
        };

        obj.draw = function (type) {
            activeSlot = type;
            return {wheelsConfig: wheels[type], type: type};
        };

        obj.getBalance = function () {
            return balance;
        };

        obj.getBets = function () {
            return bets;
        };

        obj.setActiveBetIndex = function (index) {
            activeBetIndex = Number(index);
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