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

    var template = imports('components/pop-up/template.html');
    var style = imports('components/pop-up/style.scss');

    return function (config) {

        var types = {
            'change-slot': {
                title: config.gameName,
                text: 'SELECT A DIFFERENT SLOT TYPE:',
                buttons: [
                    {
                        text: 'FRUITS SLOT',
                        type: 'fruits',
                        useBus: false,
                        class: 'pop-up-button'
                    },
                    {
                        text: 'EGYPT SLOT',
                        type: 'egypt',
                        useBus: false,
                        class: 'pop-up-button'
                    },
                    {
                        text: 'NORMAL SLOT',
                        type: 'standard',
                        useBus: false,
                        class: 'pop-up-button'
                    }
                ]
            }
        };

        var c = cjs.Component({
            template: template,
            style: style,
            config: cjs.Object.extend(types[config.popupType], config)
        });

        var buttons = [];
        var n = cjs.Need();

        types[config.popupType].buttons.forEach(function (b, i) {
            buttons.push(cjs.Component.create('button', {config: b}));
            buttons[i].createIn(c.get('buttons').get());
            buttons[i].promise().done(function (type) {
                n.resolve(type)
            })
        });

        c.show = function () {
            c.get().addStyle('show');
            c.runAnimation('show', {time: 250});
            return n;
        };

        c.hide = function () {
            return c.runAnimation('hide', {time: 250});
        };

        return c;

    }

};
