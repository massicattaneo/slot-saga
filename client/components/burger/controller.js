/*/
 ///////////////////////////////////////////////////////////////////////////
 Module: controller
 Created Date: 04 July 2016
 Author: mcattaneo

 //////////////////////////////////////////////////////////////////////////////
 //       Copyright (c) 2016.
 //////////////////////////////////////////////////////////////////////////////
 */

define(function (require) {
    var burgerTemplate = require('text!blackjack/burger/burgerTemplate.html');

    return function (config) {
        var obj = {};
        var $el;
        var open = false;

        var isActive = true;
        obj.init = function (p) {
            $el = config.parseTemplate(burgerTemplate, {});
            $(p.selector).append($el);
            $el.on('tap', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (isActive) {
                    config.dispatchEvent('burger-menu-tap', !open);
                }
            });
        };

        obj.open = function () {
            open = true;
            $el.addClass('open');
        };

        obj.close = function () {
            open = false;
            $el.removeClass('open');
        };

        obj.deactivate = function () {
            isActive = false;
            $el.css('opacity', '0.5');
        };

        obj.activate = function () {
            isActive = true;
            $el.css('opacity', '1');
        };

        obj.show = function () {
            $el.show();
        };

        obj.hide = function () {
            $el.hide();
        };

        return obj;
    }

});
