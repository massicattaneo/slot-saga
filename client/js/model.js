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
            var results = getResults();
            console.log("RESULTS: ", results.map(function (e,i) {return config.symbolsNames[activeSlot][wheels[activeSlot][i][e]];}));
            return cjs.Need().resolve({
                results: results.map(function(o) {return Math.abs(o-10)}),
                winnings: getWinnings(results)
            })
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

        obj.addWinnings = function (value) {
            balance += value;
        };

        function extractNumber(start, end) {
            return Math.floor(Math.random() * end) + start;
        }

        function getResults() {
            return [1,2,3,4,5].map(function () {
                return extractNumber(0,10);
            });
        }

        function getWinnings(array) {
            var multiplier = getMultiplier(array, 0);
            return {
                indexes: array,
                multiplier: multiplier,
                value: bets[activeBetIndex] * Math.pow(2,multiplier)
            }
        }

        function getMultiplier(array, start) {
            if (wheels[activeSlot][start][array[start]] === wheels[activeSlot][start+1][array[start+1]]) {
                return getMultiplier(array, start + 1);
            } else {
                return start + 1;
            }
        }

        return obj;
    }
}