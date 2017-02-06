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
    var Model = imports('js/model.js');
    var JSON = imports('../server/data.json');

    return function () {

        var screenManager = cjs.navigator.screenManager({width: config.gameWidth, height: config.gameHeight, rotateOnPortrait: true});
        screenManager.centered({selector: '#slot-wrapper', width: config.gameWidth, height: config.gameHeight});
        screenManager.centered({selector: '#pop-up-wrapper', width: config.gameWidth, height: config.gameHeight});
        screenManager.top({selector: '#header-wrapper'});
        screenManager.bottom({selector: '#footer-wrapper'});
        screenManager.right({selector: '#buttons-wrapper'});
        screenManager.fullScreen({selector: '#canvas'});

        var db = cjs.Db.staticJSONAdapter(JSON);
        db.init();
        cjs.Component.injectDatabaseProxy(db);

        var model = Model(config);

        var audio = cjs.Audio();
        audio.init(audioConfig);
        cjs.bus.addBus('AUDIO');
        cjs.bus.AUDIO.on('play', function (o) {audio.play(o.type)});
        cjs.bus.AUDIO.on('stop', function (o) {audio.stop(o.type)});

        cjs.bus.addBus('UI');
        cjs.bus.UI.on('button-tap', function (o) {
            if (o.type === 'play') spin();
            if (o.type === 'stop') stop();
        });
        cjs.bus.UI.on('burger-tap', function (o) {
            header.toggleBurger(o);
            if (o.open) {
                showPopUp('change-slot').done(function (type) {
                    slot.remove();
                    slot = Slot(config);
                    slot.createIn('#slot-wrapper');
                    slot.draw(model.draw(type));
                })
            }
        });
        cjs.bus.UI.on('bet-change', function (o) {
            model.setActiveBetIndex(o.index);
        });
        cjs.bus.UI.on('audio-toggle', function (o) {
            o.checked ? audio.unmute() : audio.mute();
        });

        register(config);

        var header = Header(config);
        header.createIn('#header-wrapper');

        var footer = Footer(config);
        footer.createIn('#footer-wrapper');

        var buttons = Buttons(config);
        buttons.createIn('#buttons-wrapper');

        var blackScreen = BlackScreen(config);
        blackScreen.createIn(document.body);

        var slot = Slot(config);
        slot.createIn('#slot-wrapper');
        slot.draw(model.draw('standard'));

        function updateBalance(q,a) {
            footer.updateBalance(model.getBalance());
            return cjs.Need().resolve(a);
        }
        function updateStopButton(q,a) {
            setTimeout(buttons.showStop, 500);
            setTimeout(buttons.hideStop, 2000);
            return cjs.Need().resolve(a);
        }
        function spin() {
            return cjs.Need([
                buttons.hideSpin,
                model.spin,
                updateBalance,
                updateStopButton,
                slot.spin,
                showWinnings,
                buttons.showSpin
            ]).start();
        }
        function stop() {
            return cjs.Need([
                buttons.hideStop,
                slot.stop,
                showWinnings,
                buttons.showSpin
            ]).start();
        }
        function showWinnings(q,a) {
            return slot.showWinnings().done(function (value) {
                model.addWinnings(value);
                updateBalance()
            })
        }
        function showPopUp(type) {
            var popUp = PopUp(cjs.Object.extend({popupType: type}, config));
            var container = cjs.Node('#pop-up-wrapper');
            container.addStyle({'z-index': 4});
            popUp.createIn(container);
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
                    container.addStyle({'z-index': 0});
                    header.toggleBurger({open: false})
                    container.get().removeChild(popUp.get().get())
                }
            ]).start();
            return n;
        }

        updateBalance();
        footer.setBets(model.getBets());

    };
}