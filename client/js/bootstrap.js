/*/
 ///////////////////////////////////////////////////////////////////////////
 Module: controller
 Created Date: 04 July 2016
 Author: mcattaneo

 //////////////////////////////////////////////////////////////////////////////
 //       Copyright (c) 2016.
 //////////////////////////////////////////////////////////////////////////////
 */

function boostrap(imports) {
    var BlackScreen = imports('components/black-screen/controller.js');
    var Header = imports('components/header/controller.js');
    var Footer = imports('components/footer/controller.js');
    var Buttons = imports('components/buttons/controller.js');
    var Slot = imports('components/slot/controller.js');
    var PopUp = imports('components/pop-up/controller.js');
    var config = imports('js/config.json');
    var register = imports('js/register.js');
    var audioConfig = imports('sounds/config.json');
    var JSON = imports('../server/data.json');

    return function () {

        var screenManager = cjs.navigator.screenManager({width: config.gameWidth, height: config.gameHeight, rotateOnPortrait: true});
        screenManager.centered({selector: '#slot-wrapper', width: config.gameWidth, height: config.gameHeight});
        screenManager.top({selector: '#header-wrapper'});
        screenManager.bottom({selector: '#footer-wrapper'});
        screenManager.right({selector: '#buttons-wrapper'});
        screenManager.fullScreen({selector: '#canvas'});

        var db = cjs.Db.staticJSONAdapter(JSON);
        db.init();
        cjs.Component.injectDatabaseProxy(db);

        var audio = cjs.Audio();
        audio.init(audioConfig);
        cjs.bus.addBus('AUDIO');
        cjs.bus.AUDIO.on('button-click', function (o) {audio.play('button-click')});

        cjs.bus.addBus('UI');
        cjs.bus.UI.on('button-tap', function (o) {
            o.type === 'play' && slot.spin();
        });
        cjs.bus.UI.on('burger-tap', function (o) {
            header.toggleBurger(o);
            console.log(o);
        });
        cjs.bus.UI.on('audio-toggle', function (o) {
            o.checked ? audio.unmute() : audio.mute();
            console.log(o);
        });

        register(config);

        var header = Header(config);
        header.createIn('#header-wrapper');

        var footer = Footer(config);
        footer.createIn('#footer-wrapper');

        var buttons = Buttons(config);
        buttons.createIn('#buttons-wrapper');

        var slot = Slot(config);
        slot.createIn('#slot-wrapper');



        // var blackScreen = BlackScreen(config);
        // blackScreen.createIn(document.body);
        //
        // function showPopUp(type) {
        //     var popUp = PopUp(cjs.Object.extend({type: type}, config));
        //     popUp.createIn(document.body);
        //     var n = cjs.Need();
        //     cjs.Need([
        //         blackScreen.show,
        //         popUp.show,
        //         function (q, whatToDo) {
        //             n.resolve(whatToDo);
        //             return cjs.Need().resolve();
        //         },
        //         popUp.hide,
        //         function () {
        //             blackScreen.hide();
        //             document.body.removeChild(popUp.get().get())
        //         }
        //     ]).start();
        //     return n;
        // }

    };
}