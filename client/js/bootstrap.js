/*/
 ///////////////////////////////////////////////////////////////////////////
 Module: bootstrap.js
 Created Date: 14 July 2016
 Author: mcattaneo

 //////////////////////////////////////////////////////////////////////////////
 //       Copyright (c) 2016.
 //////////////////////////////////////////////////////////////////////////////
 */

function boostrap(imports) {
    var BlackScreen = imports('components/black-screen/controller.js');
    var PopUp = imports('components/pop-up/controller.js');
    var config = imports('js/config.json');
    var register = imports('js/register.js');
    var audioConfig = imports('sounds/config.json');
    var JSON = imports('../server/data.json');

    return function () {
        var screenManager = cjs.navigator.screenManager({
            width: 1920,
            height: 1080,
            canvas: '#canvas',
            html: '#html',
            body: '#body'
        });

        var db = cjs.Db.staticJSONAdapter(JSON);
        db.init();
        cjs.Component.injectDatabaseProxy(db);

        var audio = cjs.Audio();
        audio.init(audioConfig);

        cjs.bus.addBus('UI');
        cjs.bus.UI.on('button-click', function (o) {});

        register(config);

        var blackScreen = BlackScreen(config);
        blackScreen.createIn(document.body);

        function showPopUp(type) {
            var popUp = PopUp(cjs.Object.extend({type: type}, config));
            popUp.createIn(document.body);
            var n = cjs.Need();
            cjs.Need([
                blackScreen.show,
                popUp.show,
                function (q, whatToDo) {
                    n.resolve(whatToDo);
                    return cjs.Need().resolve();
                },
                popUp.hide,
                function () {
                    blackScreen.hide();
                    document.body.removeChild(popUp.get().get())
                }
            ]).start();
            return n;
        }

    };
}