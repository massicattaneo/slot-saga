/*/
 ///////////////////////////////////////////////////////////////////////////
 Module: controller
 Created Date: 02 January 2017
 Author: mcattaneo

 //////////////////////////////////////////////////////////////////////////////
 //       Copyright (c) 2016.
 //////////////////////////////////////////////////////////////////////////////
 */
function controller() {

    return function (config) {
        var obj = {};
        var symbols = config.symbolsNames;
        var position = 0;
        var reel;
        var reelType = config.reelType;

        obj.draw = function (c) {
            obj.get().appendChild(createWheel(450, 158, c.length, orderSymbols(c)))
        };
        obj.spin = function (params) {
            return cjs.Need([
                delay(params.delay),
                preSpin,
                setStopPosition(params.stopAt),
                spinFast
            ]).start();
        };
        obj.stop = function () {
            return cjs.Need([
                stopSpin,
                setStyle
            ]).start()
        };

        function orderSymbols(c) {
            return c.map(function (index) {
                return symbols[reelType][index]
            })
        }
        function createWheel(dia, height, sides, textures) {
            reel = cjs.Node('<div></div>');
            reel.addStyle('threedee assembly');
            var sideAngle = (Math.PI / sides) * 2;
            var sideLen = dia * Math.tan(Math.PI/sides);
            for (var c = 0; c < sides; c++) {
                var x = Math.sin(sideAngle * c) * dia / 2;
                var z = Math.cos(sideAngle * c) * dia / 2;
                var ry = Math.atan2(x, z);
                reel.appendChild(createSymbol(sideLen + 1, height, x, 0, z, 0, ry, 0, textures[c]));
            }
            return reel;
        }
        function createSymbol(w, h, x, y, z, rx, ry, rz, image) {
            var symbol = cjs.Node('<div></div>');
            // var symbol = document.createElement("div");
            symbol.addStyle("threedee face");
            symbol.addStyle({
                "background-image":"url(images/"+reelType+"/" + image + ".png)",
                "width": w.toFixed(2) + "px",
                "height": + h.toFixed(2) + "px",
                "margin-top": - (h / 2).toFixed(2) + "px",
                "margin-left": - (w / 2).toFixed(2) + "px",
                "transform": "translate3d(" + x.toFixed(2) + "px," + y.toFixed(2) + "px," + z.toFixed(2) + "px) rotateX(" + rx.toFixed(2) + "rad) rotateY(" + ry.toFixed(2) + "rad) rotateY(" + rz.toFixed(2) + "rad) rotateZ(-90deg)"
            });
            return symbol;
        }
        function delay(time) {
            return function () {
                var n = cjs.Need();
                setTimeout(n.resolve, time);
                return n;
            }
        }
        function preSpin() {return reel.runAnimation('startSpin-'+position+'-' + obj.getClassName(), {time: 400, times: 1, ease: 'ease-in'})}
        function spinFast() {return reel.runAnimation('spin-' + obj.getClassName(), {time: 700, times: 3, ease: 'linear'})}
        function stopSpin() {return reel.runAnimation('stopSpin-'+position+'-' + obj.getClassName(), {time: 400, times: 1, ease: 'ease-out'})}
        function setStyle() {reel.addStyle({transform: 'rotateY('+position*36+'deg) rotateZ(0deg) rotateX(0deg)'}); return cjs.Need().resolve()}
        function setStopPosition(stop) {
            return function () {
                position = stop;
                return cjs.Need().resolve();
            }
        }

        return obj;
    }

}