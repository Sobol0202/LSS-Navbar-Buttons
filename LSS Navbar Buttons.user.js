// ==UserScript==
// @name         LSS Navbar Buttons
// @namespace    www.leitstellenspiel.de
// @version      0.9
// @description  Fügt in die Navbar AAO-Buttons ein
// @author       MissSobol
// @match        https://www.leitstellenspiel.de/missions/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    // Konfiguration der Buttons
    const buttonConfigs = [
        // Erste btn-group (btn-danger)
        {
            classname: 'btn-danger',
            buttons: [
                { icon: 'https://img.icons8.com/ios/50/000000/fire-truck.png', aaoId: 25243291, action: 'alarm' },
                { icon: 'url_zu_bild2.png', aaoId: 25243292, action: 'alarm_next' },
                { icon: 'url_zu_bild3.png', aaoId: 25243293, action: 'alarm_next_alliance' }
            ]
        },
        // Zweite btn-group (btn-warning)
        {
            classname: 'btn-warning',
            buttons: [
                { icon: 'url_zu_bild4.png', aaoId: 25243294, action: 'alarm' },
                { icon: 'url_zu_bild5.png', aaoId: 25243295, action: 'alarm_next' },
                { icon: 'url_zu_bild6.png', aaoId: 25243296, action: 'alarm_next_alliance' }
            ]
        },
        // Dritte btn-group (btn-success)
        {
            classname: 'btn-success',
            buttons: [
                { icon: 'url_zu_bild7.png', aaoId: 25243297, action: 'alarm' },
                { icon: 'url_zu_bild8.png', aaoId: 25243298, action: 'alarm_next' },
                { icon: 'url_zu_bild9.png', aaoId: 25243299, action: 'alarm_next_alliance' }
            ]
        },
        // Vierte btn-group (btn-primary)
        {
            classname: 'btn-primary',
            buttons: [
                { icon: 'url_zu_bild10.png', aaoId: 25243300, action: 'alarm' },
                { icon: 'url_zu_bild11.png', aaoId: 25243301, action: 'alarm_next' },
                { icon: 'url_zu_bild12.png', aaoId: 25243302, action: 'alarm_next_alliance' }
            ]
        }
    ];

    // Funktion zum Erstellen einer Button-Gruppe
    function createButtonGroup(classname, buttons) {
        let group = $('<div></div>').addClass('btn-group mr-2 ' + classname);
        buttons.forEach(function(button) {
            group.append(createButton(button.icon, button.aaoId, button.action));
        });
        return group;
    }

    // Funktion zum Erstellen eines Buttons
    function createButton(iconUrl, aaoId, action) {
        let button = $('<a></a>').addClass('btn btn-sm')
                                  .attr('href', '#')
                                  .attr('data-aao-id', aaoId)
                                  .attr('data-action', action)
                                  .css('background-image', 'url(' + iconUrl + ')')
                                  .css('background-size', 'cover');
        return button;
    }

    // Button-Gruppen der Navbar hinzufügen
    $('#navbar-alarm-spacer').before(
        buttonConfigs.map(buttonConfig => createButtonGroup(buttonConfig.classname, buttonConfig.buttons))
    );

    // Event Listener für die Buttons
    $(document).on('click', '.btn-group a', function(e) {
        e.preventDefault();
        let aaoId = $(this).data('aao-id');
        let action = $(this).data('action');
        if (aaoId && action) {
            $('#aao_' + aaoId).click();
            switch (action) {
                case 'alarm':
                    $('#mission_alarm_btn').click();
                    break;
                case 'alarm_next':
                    $('.alert_next').click();
                    break;
                case 'alarm_next_alliance':
                    $('.alert_next_alliance').click();
                    break;
            }
        }
    });
})();
