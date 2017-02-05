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

        var reel;
        var reelType = config.reelType;

        function createWheel(dia, height, sides, textures) {
            reel = cjs.Node('<div></div>');
            reel.addStyle('threedee assembly');
            var sideAngle = (Math.PI / sides) * 2;
            var sideLen = dia * Math.tan(Math.PI/sides);
            for (var c = 0; c < sides; c++) {
                var x = Math.sin(sideAngle * c) * dia / 2;
                var z = Math.cos(sideAngle * c) * dia / 2;
                var ry = Math.atan2(x, z);
                // tube.appendChild(createFace(sideLen + 1, height, x, 0, z, 0, ry, 0, textures, sideLen * c, 0));
                reel.get().appendChild(createSymbol(sideLen + 1, height, x, 0, z, 0, ry, 0, textures[c]));
            }
            return reel.get();
        }

        function createSymbol(w, h, x, y, z, rx, ry, rz, image) {
            var face = document.createElement("div");
            face.className = "threedee face";
            face.style.cssText =
                "background-image: url(images/"+reelType+"/" + image + ".png); " +
                "width:" + w.toFixed(2) + "px;" +
                "height:" + h.toFixed(2) + "px;" +
                "margin-top: -" + (h / 2).toFixed(2) + "px;" +
                "margin-left: -" + (w / 2).toFixed(2) + "px;" +
                "transform: translate3d(" + x.toFixed(2) + "px," + y.toFixed(2) + "px," + z.toFixed(2) + "px)" +
                "rotateX(" + rx.toFixed(2) + "rad) rotateY(" + ry.toFixed(2) + "rad) rotateY(" + rz.toFixed(2) + "rad) rotateZ(-90deg);";
            return face;
        }

        var symbols = {
            egypt: ['a','eye','gold','j','k','mask','pyramid','q','sarcophagus','scarab','silver','sphinx','stone'],
            fruits: ['bell','cherry','grapes','lemon','orange','pear','plum','quaterfoil','strawberry','watermelon']
        };

        function oderSymbols() {

        }

        obj.draw = function (config) {
            obj.get().get().appendChild(createWheel(450, 158, symbols[reelType].length, symbols[reelType]))
        };
        
        obj.spin = function () {
            reel.runAnimation('spin-'+obj.getClassName(), 500, 'infinite', 'linear')
        };

        return obj;
    }

}