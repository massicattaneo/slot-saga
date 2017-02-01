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

    var template = imports('components/pop-up/template.html');
    var style = imports('components/pop-up/style.scss');

    return function (config) {

        var types = {
            'delete-client': {
                title: 'BORRAR?',
                text: '¿Estás seguro de que quieres borrar este cliente?',
                buttons: [{
                    text: 'SI',
                    type: 'delete',
                    useBus: false,
                    class: 'popup'
                },{
                    text: 'NO',
                    type: 'close',
                    useBus: false,
                    class: 'popup'
                }]
            }
        };

        var c = cjs.Component({
            template: template,
            style: style,
            config: cjs.Object.extend(types[config.type], config)
        });

        var buttons = [];
        var n = cjs.Need();

        types[config.type].buttons.forEach(function (b, i) {
            buttons.push(cjs.Component.create('button', {config: b}));
            buttons[i].createIn(c.get('buttons').get());
            buttons[i].promise().done(function (type) {
                n.resolve(type)
            })
        });

        c.show = function () {
            c.get().addStyle('show');
            c.runAnimation('show', 500);
            return n;
        };

        c.hide = function () {
            return c.runAnimation('hide', 500);
        };

        return c;

    }

};
