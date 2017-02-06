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
        
        var reels = [];
        var reelsQueues = [];
        var winnings;

        var obj = cjs.Component({
            template: template,
            style: style,
            config: config
        });

        obj.draw = function (params) {
            params.wheelsConfig.forEach(function (wheelConfig,i) {
                var reel = cjs.Component.create('reel', {config: cjs.Object.extend({reelType: params.type},config)});
                reel.createIn(obj.get('wrapper'));
                reel.get().addStyle('n' + (i+1));
                reel.draw(wheelConfig);
                reels.push(reel);
            });
        };

        obj.spin = function (q, params) {
            var n = [];
            winnings = params.winnings;
            reels.forEach(function (o,i) {
                var need = cjs.Need([
                    spin(o,i, params.results),
                    stop(o)
                ]);
                reelsQueues.push(need);
                n.push(need.start());
            });
            return cjs.Need(n).done(function () {
                reelsQueues = [];
            });
        };

        obj.stop = function () {
            reels.forEach(function (o) {
                stop(o)();
            });
            reelsQueues.forEach(function (q) {
                q.reject();
            });
            reelsQueues = [];
            return cjs.Need().resolve();
        };

        obj.showWinnings = function () {
            if (winnings.multiplier > 1) {
                var ns = [], n = cjs.Need();
                for (var i = 0; i < winnings.multiplier; i++) {
                    ns.push(reels[i].win(winnings.indexes[i], i*100));
                }
                cjs.Need(ns).done(function () {
                    n.resolve(winnings.value)
                });
                return n;
            } else {
                return cjs.Need().resolve(0);
            }
        };

        function spin(o, i, stopAt) {
            var spinDelay = 100;
            return function () {
                return o.spin({stopAt: stopAt[i], delay: i* spinDelay});
            }
        }

        function stop(o) {
            return o.stop
        }

        return obj;

    }

}
