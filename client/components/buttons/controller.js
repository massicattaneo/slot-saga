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

    var template = imports('components/buttons/template.html');
    var style = imports('components/buttons/style.scss');

    return function (config) {
        
        var obj = cjs.Component({
            template: template,
            style: style,
            config: config
        });

        obj.hideSpin = function () {
            obj.get('play').get().addStyle({display: 'none'});
            return cjs.Need().resolve();
        };

        obj.showSpin = function () {
            obj.get('play').get().addStyle({display: 'block'});
            return cjs.Need().resolve();
        };

        obj.hideStop = function () {
            obj.get('stop').get().addStyle({display: 'none'});
            return cjs.Need().resolve();
        };

        obj.showStop = function () {
            obj.get('stop').get().addStyle({display: 'block'});
            return cjs.Need().resolve();
        };

        return obj;

    }

};
