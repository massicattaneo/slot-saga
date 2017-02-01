/*/
 ///////////////////////////////////////////////////////////////////////////
 Module: controller
 Created Date: 14 July 2016
 Author: mcattaneo

 //////////////////////////////////////////////////////////////////////////////
 //       Copyright (c) 2016.
 //////////////////////////////////////////////////////////////////////////////
 */

function controller(imports) {

    var template = imports('components/black-screen/template.html');
    var style = imports('components/black-screen/style.scss');

    return function (config) {
        
        var c = cjs.Component({
            template: template,
            style: style,
            config: config
        });

        c.show = function (time) {
            c.node.addStyle('show');
            return c.runAnimation('show', isNaN(time) ? 500 : time);
        };

        c.hide = function (time) {
            return c.runAnimation('hide', isNaN(time) ? 500 : time)
                .done(function() {
                c.node.removeStyle('show');
            });
        };

        c.removeCover = function (time) {
            return c.runAnimation('remove-cover', isNaN(time) ? 500 : time)
                .done(function() {
                c.node.removeStyle('cover');
            });
        };

        return c;

    }

};
