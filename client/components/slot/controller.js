/*/
 ///////////////////////////////////////////////////////////////////////////
 Module: controller
 Created Date: 02 January 2017
 Author: mcattaneo

 //////////////////////////////////////////////////////////////////////////////
 //       Copyright (c) 2016.
 //////////////////////////////////////////////////////////////////////////////
 */

function controller(imports) {

    var template = imports('components/slot/template.html');
    var style = imports('components/slot/style.scss');

    return function (config) {
        var wheelsConfig = [
            [0,1,2,3,4,5,6,7,8,9],
            [1,4,8,6,3,2,0,9,7,5],
            [5,2,3,4,7,6,9,8,0,1],
            [9,8,7,6,0,1,2,5,4,3],
            [7,3,6,4,5,2,8,1,9,0]
        ];
        
        var obj = cjs.Component({
            template: template,
            style: style,
            config: config
        });

        obj.draw = function () {
            obj.items.forEach(function (o,k,i) {
                o.draw(wheelsConfig[i]);
            });
        };

        obj.spin = function () {
            obj.items.forEach(function (o,k,i) {
                setTimeout(o.spin, 100*i);
            });
        };

        obj.stopAt = function (array) {
            obj.items.forEach(function (o,k,i) {
                o.stopAt(array[i]);
            });
        };

        return obj;

    }

};
