define([
    'ko',
    'jquery',
    'Magento_Ui/js/modal/modal'
], function ( ko, $, modal ) {
    'use strict';

    var mixin = {
        defaults: {
            popUp: {
                element: '.order-summary-modal',
                options: {
                    'type': 'popup',
                    'responsive': true,
                    'innerScroll': true,
                    'title': 'Order Summary',
                    'trigger': 'order-summary-modal',
                    'buttons': {
                        'cancel': {
                            'text': 'Close',
                            'class': 'action secondary'
                        }
                    }
                }
            }
        },
        popUpObj: null,
        isPopUpVisible: ko.observable(false),

        getPopUp: function () {
            if (!this.popUpObj) {
                let buttons = this.popUp.options.buttons;

                this.popUp.options.buttons = [{
                    text: buttons.cancel.text,
                    class: buttons.cancel.class,
                    click: this.onClosePopUp.bind(this)
                }];

                this.popUp.options.closed = this.afterClosePopUp.bind(this);
                this.popUp.options.modalCloseBtnHandler = this.onClosePopUp.bind(this);
                this.popUp.options.keyEventHandlers = {
                    escapeKey: this.onClosePopUp.bind(this)
                };

                this.popUpObj = modal(this.popUp.options, $(this.popUp.element));
            }

            return this.popUpObj;
        },

        onClosePopUp: function () {
            this.getPopUp().closeModal();
            return this;
        },

        afterClosePopUp: function () {
            this.isPopUpVisible(false);
            return this;
        },

        viewTotalsSummary: function () {
            this.getPopUp().openModal();
            this.isPopUpVisible(true);
        }
    };

    return function (target) {
        return target.extend(mixin);
    }
});
